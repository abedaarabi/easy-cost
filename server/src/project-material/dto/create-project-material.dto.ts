import { ApiProperty } from '@nestjs/swagger';

export class CreateProjectMaterialDto {
  @ApiProperty()
  id: string;
  @ApiProperty()
  materialId: string;
  @ApiProperty()
  projectId: string;
  createdAt: Date;
  @ApiProperty()
  profit: number;
}
