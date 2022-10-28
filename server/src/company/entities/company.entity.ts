import { ApiProperty } from '@nestjs/swagger';
import { Company } from '@prisma/client';
export class CompanyEntity implements Company {
  id: string;
  createdAt: Date;
  @ApiProperty()
  name: string;
  @ApiProperty()
  country: string;
  @ApiProperty()
  logo: string;
}
