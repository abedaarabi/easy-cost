import { ApiProperty } from '@nestjs/swagger';
import { ProjecMaterial } from 'node_modules/@prisma/client';
export class ProjectMaterialEntity implements ProjecMaterial {
  @ApiProperty()
  id: string;
  @ApiProperty()
  materialId: string;
  @ApiProperty()
  status: boolean;
  @ApiProperty()
  projectId: string;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  profit: number;
}
