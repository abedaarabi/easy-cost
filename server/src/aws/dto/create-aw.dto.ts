import { ApiProperty } from '@nestjs/swagger';

export class CreateAwDto {
  @ApiProperty()
  id: string;
  createdAt: Date;
  @ApiProperty()
  fileName: string;
  @ApiProperty()
  projectId: string;
}
