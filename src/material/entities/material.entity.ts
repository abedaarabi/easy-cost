import { ApiProperty } from '@nestjs/swagger';
import { Material } from '@prisma/client';
// Prisma defined the type when we create the db User table
export class MaterialEntity implements Material {
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
