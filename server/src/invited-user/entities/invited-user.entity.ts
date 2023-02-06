import { ApiProperty } from '@nestjs/swagger';
import { InvitedUser } from 'node_modules/@prisma/client';
import { MinLength } from 'class-validator';
export class InvitedUserEntity implements InvitedUser {
  role: string;
  id: string;

  createdAt: Date;
  @ApiProperty()
  @MinLength(5)
  email: string;
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
