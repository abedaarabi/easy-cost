import { ApiProperty } from '@nestjs/swagger';
import { Markups } from '@prisma/client';

export class MarkupEntities implements Markups {
  @ApiProperty()
  filesVersionId: string;
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
}
