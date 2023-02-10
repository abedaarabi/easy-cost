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
  location: string;
  @ApiProperty()
  companyId: string;
  @ApiProperty()
  isActive: boolean;
}
