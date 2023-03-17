import {
  PutObjectCommand,
  PutObjectCommandInput,
  PutObjectCommandOutput,
  S3Client,
} from '@aws-sdk/client-s3';
import { Injectable, Logger } from '@nestjs/common';
import { CreateAwDto } from './dto/create-aw.dto';
import { UpdateAwDto } from './dto/update-aw.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AwsService {
  private logger = new Logger(AwsService.name);
  private region: string;
  private s3: S3Client;

  constructor(private configService: ConfigService) {
    this.region = configService.get<string>('S3_REGION') || 'eu-west-2';
    this.s3 = new S3Client({
      region: this.region,
      credentials: {
        accessKeyId: this.configService.get<string>('S3_accessKeyId'),
        secretAccessKey: this.configService.get<string>('S3_secretAccessKey'),
      },
    });
  }

  async uploadFile(file: Express.Multer.File, key?: string): Promise<string> {
    const bucket = this.configService.get<string>('S3_BUCKET');

    const input: PutObjectCommandInput = {
      Body: file.buffer,
      Bucket: bucket,
      Key: key,
      ContentType: file.mimetype,
      ACL: 'public-read',
    };
    console.log(this.configService.get<string>('S3_accessKeyId'), '000000');

    try {
      const response: PutObjectCommandOutput = await this.s3.send(
        new PutObjectCommand(input),
      );

      if (response.$metadata.httpStatusCode === 200) {
        return `https://${bucket}.s3.${this.region}.amazonaws.com/${key}`;
      }
      throw new Error('Image not saved in s3!');
    } catch (err) {
      this.logger.error('Cannot save file to s3,', err);
      throw err;
    }
  }

  create(createAwDto: CreateAwDto) {
    return 'This action adds a new aw';
  }

  findAll() {
    return `This action returns all aws`;
  }

  findOne(id: number) {
    return `This action returns a #${id} aw`;
  }

  update(id: number, updateAwDto: UpdateAwDto) {
    return `This action updates a #${id} aw`;
  }

  remove(id: number) {
    return `This action removes a #${id} aw`;
  }
}
