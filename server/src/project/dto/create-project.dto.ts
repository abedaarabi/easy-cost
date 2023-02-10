import { ApiProperty } from '@nestjs/swagger';
export class CreateProjectDto {
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
