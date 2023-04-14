import { ApiProperty } from '@nestjs/swagger';
import { Decimal } from '@prisma/client/runtime';
import { Material } from 'node_modules/@prisma/client';
// Prisma defined the type when we create the db User table
export class MaterialEntity implements Material {
  @ApiProperty()
  price: Decimal;
  @ApiProperty()
  hourPerQuantity: Decimal;

  @ApiProperty()
  id: string;
  @ApiProperty()
  materialName: string;
  @ApiProperty()
  unit: string;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  pricePerHour: Decimal;
  @ApiProperty()
  userId: string;
  @ApiProperty()
  co2e: Decimal;
  @ApiProperty()
  companyId: string;
}
