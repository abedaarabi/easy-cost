import { ApiProperty } from '@nestjs/swagger';

export class CreateProjectMaterialDto {
  @ApiProperty()
  id: string;
  @ApiProperty()
  materialId: string;
  @ApiProperty()
  projectId: string;
  @ApiProperty()
  createdAt?: Date;
  @ApiProperty()
  profit: number;
  @ApiProperty()
  status: boolean;
}
