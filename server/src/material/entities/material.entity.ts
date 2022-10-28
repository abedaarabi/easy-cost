import { ApiProperty } from '@nestjs/swagger';
import { Material } from 'node_modules/@prisma/client';
// Prisma defined the type when we create the db User table
export class MaterialEntity implements Material {
  @ApiProperty()
  companyId: string;
  @ApiProperty()
  unit: string;
  @ApiProperty()
  priceUnit: string;
  @ApiProperty()
  image: string;
  @ApiProperty()
  workByhour: number;
  @ApiProperty()
  id: string;
  @ApiProperty()
  materialName: string;
  @ApiProperty()
  supplier: string;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  price: number;
  @ApiProperty()
  userId: string;
}
