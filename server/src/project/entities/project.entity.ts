import { ApiProperty } from '@nestjs/swagger';
import { Project } from 'node_modules/@prisma/client';

export class ProjectEntity implements Project {
  id: string;
  @ApiProperty()
  projectName: string;
  createdAt: Date;
  @ApiProperty()
  userId: string;
  @ApiProperty()
  workByhour: number;
  @ApiProperty()
  companyId: string;
}
