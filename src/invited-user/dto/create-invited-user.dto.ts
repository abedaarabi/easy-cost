import { ApiProperty } from '@nestjs/swagger';

export class CreateInvitedUserDto {
  id: string;

  createdAt: Date;
  @ApiProperty()
  companyId: string;
  @ApiProperty()
  userId: string;
  @ApiProperty()
  projectId: string;
  @ApiProperty()
  token: string;
}
