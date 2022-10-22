import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';
// Prisma defined the type when we create the db User table
export class UserEntity implements User {
  //   @ApiProperty()
  id: string;
  @ApiProperty()
  name: string;
  //   @ApiProperty()
  createdAt: Date;
}
