import {
  PutObjectCommand,
  PutObjectCommandInput,
  PutObjectCommandOutput,
  DeleteBucketCommand,
  DeleteObjectCommand,
  S3Client,
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
    this.region = configService.get<string>('S3_REGION') || 'eu-west-2';
    this.s3 = new S3Client({
      region: this.region,
      credentials: {
        accessKeyId: this.configService.get<string>('S3_accessKeyId'),
        secretAccessKey: this.configService.get<string>('S3_secretAccessKey'),
      },
    });
  }

  async uploadFile(
    file: Express.Multer.File,
    key: string,
    projectId: string,
  ): Promise<string> {
    const bucket = this.configService.get<string>('S3_BUCKET');

    const input: PutObjectCommandInput = {
      Body: file.buffer,
      Bucket: bucket,
      Key: key.replace(/\s/g, ''),
      ContentType: file.mimetype,
      ACL: 'public-read',
    };
    console.log(file);

    try {
      const response: PutObjectCommandOutput = await this.s3.send(
        new PutObjectCommand(input),
      );

      if (response.$metadata.httpStatusCode === 200) {
        const responseUrl = `https://${bucket}.s3.${
          this.region
        }.amazonaws.com/${key.replace(/\s/g, '')}`;

        // const dbProjectId = await this.prisma.project.findUnique({
        //   where: { id: projectId },
        // });
        const fileSize = file.size / (1024 * 1024);
        const addFileToUploadFile = await this.prisma.uploadFile.create({
          data: {
            fileName: key,
            urlPath: responseUrl,
            projectId,
            size: +fileSize.toFixed(2),
          },
        });

        console.log(addFileToUploadFile);
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
  findOne(id: number) {
    return `This action returns a #${id} aw`;
  }

  update(id: number, updateAwDto: UpdateAwDto) {
    return `This action updates a #${id} aw`;
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
}
