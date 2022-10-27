import { ApiProperty } from '@nestjs/swagger';

export class CreateCompanyDto {
  id: string;
  createdAt: Date;
  @ApiProperty()
  name: string;
  @ApiProperty()
  country: string;
  @ApiProperty()
  logo: string;
}
