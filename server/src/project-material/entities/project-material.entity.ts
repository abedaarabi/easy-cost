import { ApiProperty } from '@nestjs/swagger';
import { ProjecMaterial } from 'node_modules/@prisma/client';
export class ProjectMaterialEntity implements ProjecMaterial {
  id: string;
  @ApiProperty()
  materialId: string;
  @ApiProperty()
  projectId: string;
  createdAt: Date;
  @ApiProperty()
  profit: number;
}
