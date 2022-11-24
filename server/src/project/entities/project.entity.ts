import { ApiProperty } from '@nestjs/swagger';
import { Project } from 'node_modules/@prisma/client';

export class ProjectEntity implements Project {
  @ApiProperty()
  id: string;
  @ApiProperty()
  projectName: string;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  userId: string;
  @ApiProperty()
  workByhour: number;
  @ApiProperty()
  companyId: string;
}
