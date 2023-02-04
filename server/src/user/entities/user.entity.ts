import { ApiProperty } from '@nestjs/swagger';
import { User, UserType } from '@prisma/client';
// Prisma defined the type when we create the db User table
export class UserEntity implements User {
  @ApiProperty()
  email: string;
  // @ApiProperty()
  // avatar: string;
  @ApiProperty()
  userType: UserType;
  @ApiProperty()
  companyId: string;
  @ApiProperty()
  id: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  userId: string;
  //   @ApiProperty()
  createdAt: Date;
}
