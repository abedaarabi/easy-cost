import { ApiProperty } from '@nestjs/swagger';

export class CreateProjectMaterialDto {
  @ApiProperty()
  materialId: string;
  @ApiProperty()
  projectId: string;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  quantity: number;
}
