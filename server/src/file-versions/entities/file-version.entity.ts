import { ApiProperty } from '@nestjs/swagger';
import { FilesVersion } from '@prisma/client';

export class FileVersionEntities implements FilesVersion {
  @ApiProperty()
  currentVersion: boolean;
  @ApiProperty()
  id: string;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  projectId: string;
  @ApiProperty()
  size: number;
  @ApiProperty()
  scale: number;
  @ApiProperty()
  unit: string;
  @ApiProperty()
  versionId: string;
  @ApiProperty()
  versionNumber: number;
  @ApiProperty()
  urlPath: string;
  @ApiProperty()
  uploadFileId: string;
}
