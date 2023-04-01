import { ApiProperty } from '@nestjs/swagger';

export class CreateAwDto {
  @ApiProperty()
  id: string;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  fileName: string;
  @ApiProperty()
  urlPath: string;
  @ApiProperty()
  projectId: string;
  @ApiProperty()
  size: number;
}
