import {
  PutObjectCommand,
  PutObjectCommandInput,
  PutObjectCommandOutput,
  DeleteBucketCommand,
  HeadObjectCommand,
  DeleteObjectCommand,
  DeleteObjectCommandInput,
  Delete,
  GetObjectAclRequest,
  ListObjectVersionsCommand,
  S3Client,
  GetObjectCommand,
} from '@aws-sdk/client-s3';

import { Injectable, Logger } from '@nestjs/common';
import { CreateAwDto } from './dto/create-aw.dto';
import { UpdateAwDto } from './dto/update-aw.dto';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AwsService {
  private logger = new Logger(AwsService.name);
  private region: string;
  private s3: S3Client;

  constructor(
    private configService: ConfigService,
    private prisma: PrismaService,
  ) {
    this.region = configService.get<string>('S3_REGION') || 'eu-north-1';
    this.s3 = new S3Client({
      region: this.region,
      credentials: {
        accessKeyId: this.configService.get<string>('S3_accessKeyId'),
        secretAccessKey: this.configService.get<string>('S3_secretAccessKey'),
      },
    });
  }

  async getCurrentVersion(
    bucketName: string,
    objectKey: string,
  ): Promise<{ versionId: string; versionNumber: string }> {
    try {
      // Send a HEAD request to retrieve the current version of the object
      const command = new HeadObjectCommand({
        Bucket: bucketName,
        Key: objectKey,
      });
      const response = await this.s3.send(command);
      console.log(response);

      // Extract the version ID and version number of the object from the response headers
      const versionId = response.VersionId;
      const versionNumber = response.Metadata['version-number'];

      // Return an object with the version ID and version number
      return {
        versionId: versionId,
        versionNumber: versionNumber,
      };
    } catch (error) {
      if (error.name === 'NotFound') {
        // If the object doesn't exist, return a default version number of 0
        return {
          versionId: null,
          versionNumber: '0',
        };
      } else {
        // If there is some other error, re-throw the error
        throw error;
      }
    }
  }

  async uploadFile(
    file: Express.Multer.File,
    key: string,
    projectId: string,
  ): Promise<string> {
    const bucket = this.configService.get<string>('S3_BUCKET');
    console.log(bucket);
    const { versionNumber, versionId } = await this.getCurrentVersion(
      bucket,
      key,
    );
    const newVersionNumber = versionNumber
      ? parseInt(versionNumber, 10) + 1
      : 1;

    const metadata = {
      'version-number': newVersionNumber.toString(),
    };

    const input: PutObjectCommandInput = {
      Body: file.buffer,
      Bucket: bucket,
      Key: key.replace(/\s/g, ''),
      ContentType: file.mimetype,
      ACL: 'public-read',

      Metadata: metadata,
    };

    try {
      const fileName = key.replace(/\s/g, '');
      const fileSize = file.size / (1024 * 1024);
      const response: PutObjectCommandOutput = await this.s3.send(
        new PutObjectCommand(input),
      );

      if (response.$metadata.httpStatusCode === 200) {
        const { versionNumber, versionId } = await this.getCurrentVersion(
          bucket,
          key,
        );
        const responseUrl = `https://${bucket}.s3.${
          this.region
        }.amazonaws.com/${key.replace(/\s/g, '')}?versionid=${versionId}`;

        const existingFile = await this.prisma.uploadFile.findUnique({
          where: { fileName: fileName },
        });

        if (existingFile) {
          // If the file already exists, insert a new version into the "versions" table
          const newVersion = await this.prisma.filesVersion.create({
            data: {
              urlPath: responseUrl,
              projectId,
              size: +fileSize.toFixed(2),
              scale: 0.01,
              unit: 'mm',
              versionId,
              currentVersion: false,
              versionNumber: +versionNumber,
              uploadFileId: existingFile.id,
            },
          });
          console.log({ newVersion });
        } else {
          const newFile = await this.prisma.uploadFile.create({
            data: { fileName, projectId },
          });

          const newVersion = await this.prisma.filesVersion.create({
            data: {
              urlPath: responseUrl,
              projectId,
              size: +fileSize.toFixed(2),
              scale: 0.01,
              unit: 'mm',
              versionId,
              currentVersion: false,
              versionNumber: +versionNumber,
              uploadFileId: newFile.id,
            },
          });

          console.log({ newVersion, newFile });
        }

        return responseUrl;
      }
      throw new Error('File not saved in s3!');
    } catch (err) {
      this.logger.error('Cannot save file to s3,', err);
      throw err;
    }
  }

  findAllByProjectId(projectId: string) {
    return this.prisma.uploadFile.findMany({ where: { projectId: projectId } });
  }

  create(createAwDto: CreateAwDto) {
    return 'This action adds a new aw';
  }
  findOne(id: string) {
    return this.prisma.uploadFile.findUnique({ where: { id } });
  }

  update(id: string, updateAwDto: UpdateAwDto) {
    return this.prisma.uploadFile.update({
      where: { id },
      data: updateAwDto,
    });
  }

  async remove(objId: string) {
    const bucket = this.configService.get<string>('S3_BUCKET');

    try {
      const { id, fileName: key } = await this.prisma.uploadFile.findUnique({
        where: { id: objId },
      });
      console.log({ key, bucket });

      const s3DeleteResponse = await this.s3.send(
        new DeleteObjectCommand({ Bucket: bucket, Key: key }),
      );
      return s3DeleteResponse;
    } catch (error) {
      console.log(error);
    }
  }

  async getObjectVersion() {
    const headCommand = new HeadObjectCommand({
      Bucket: this.configService.get<string>('S3_BUCKET'),
      Key: 'hg.png',
    });
    const versionsResponse = await this.s3.send(headCommand);
    return versionsResponse;
    // Iterate through each version and retrieve its metadata
    // for await (const version of versionsResponse.Versions) {
    //   const getVersionCommand = new GetObjectCommand({
    //     Bucket: this.configService.get<string>('S3_BUCKET'),
    //     Key: 'g.png',
    //     VersionId: version.VersionId,
    //   });

    //   const getObjectResponse = await this.s3.send(getVersionCommand);

    //   console.log(`Version: ${version.VersionId}`);
    //   console.log(`Metadata: ${JSON.stringify(getObjectResponse.Metadata)}`);
    // }

    // const command = new GetObjectCommand({
    //   Bucket: this.configService.get<string>('S3_BUCKET'),
    //   Key: 'test2.pdf',
    // });
    // const response = await this.s3.send(command);
    // const versionId = response.VersionId;
    // const versionNumber = parseInt(versionId.split('/')[1]);
    // return {
    //   versionId: response.VersionId,
    //   versionNumber: versionNumber.toString(),
    // };
  }
}
