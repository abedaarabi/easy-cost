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
  workByhour: number;
  @ApiProperty()
  companyId: string;
}
