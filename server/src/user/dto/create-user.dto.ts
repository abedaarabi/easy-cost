import { ApiProperty } from '@nestjs/swagger';
import { UserType } from '@prisma/client';
import { IsString, MinLength, IsEmail } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(3)
  @ApiProperty()
  name: string;
  @ApiProperty()
  @IsEmail()
  email: string;
  @ApiProperty()
  avatar: string;
  @ApiProperty()
  userType: UserType;
  @ApiProperty()
  companyId: string;
  @ApiProperty()
  userId?: string;
  @ApiProperty()
  id: string;
}
