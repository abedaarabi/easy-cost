import { ApiProperty } from '@nestjs/swagger';
import { UploadFile } from '@prisma/client';

export class AwsEntity implements UploadFile {
  @ApiProperty()
  id: string;
  createdAt: Date;
  @ApiProperty()
  fileName: string;
  @ApiProperty()
  projectId: string;
}
