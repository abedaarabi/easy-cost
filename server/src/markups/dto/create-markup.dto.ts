import { ApiProperty } from '@nestjs/swagger';

export class CreateMarkupDto {
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
  filesVersionId: string;
}
