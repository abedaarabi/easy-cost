import { ApiProperty } from '@nestjs/swagger';
import { markups } from '@prisma/client';

export class MarkupEntities implements markups {
  @ApiProperty()
  id: string;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  pageNumber: number;
  @ApiProperty()
  markupsString: string;
  @ApiProperty()
  projectId: string;
  @ApiProperty()
  uploadFileId: string;
}
