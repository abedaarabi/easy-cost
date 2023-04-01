import { ApiProperty } from '@nestjs/swagger';

export class CreateDocumentMeasureDto {
  @ApiProperty()
  uploadFileId: string;
  @ApiProperty()
  measurementId: string;
  @ApiProperty()
  projectId: string;
  @ApiProperty()
  id: string;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  pageNumber: number;

  @ApiProperty()
  measureValues: string;
}
