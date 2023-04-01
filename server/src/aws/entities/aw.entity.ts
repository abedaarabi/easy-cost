import { ApiProperty } from '@nestjs/swagger';
import { UploadFile } from '@prisma/client';

export class AwsEntity implements UploadFile {
  @ApiProperty()
  size: number;
  @ApiProperty()
  id: string;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  fileName: string;
  @ApiProperty()
  @ApiProperty()
  urlPath: string;
  @ApiProperty()
  projectId: string;
}
