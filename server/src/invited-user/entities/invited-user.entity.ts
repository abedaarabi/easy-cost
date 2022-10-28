import { ApiProperty } from '@nestjs/swagger';
import { InvitedUser } from '@prisma/client';
import { MinLength } from 'class-validator';
export class InvitedUserEntity implements InvitedUser {
  id: string;

  createdAt: Date;
  @ApiProperty()
  @MinLength(5)
  companyId: string;
  @ApiProperty()
  @MinLength(5)
  userId: string;
  @MinLength(5)
  @ApiProperty()
  projectId: string;
  @MinLength(5)
  @ApiProperty()
  token: string;
}
