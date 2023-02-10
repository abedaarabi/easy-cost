import { ApiProperty } from '@nestjs/swagger';
import { Decimal } from '@prisma/client/runtime';
import { ProjectMaterial } from 'node_modules/@prisma/client';
export class ProjectMaterialEntity implements ProjectMaterial {
  @ApiProperty()
  id: string;
  @ApiProperty()
  materialId: string;
  @ApiProperty()
  projectId: string;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  quantity: Decimal;
}
