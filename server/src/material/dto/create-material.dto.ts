import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, MinLength } from 'class-validator';
export class CreateMaterialDto {
  @ApiProperty()
  id: string;
  @ApiProperty()
  materialName: string;
  @ApiProperty()
  unit: string;
  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  userId: string;
  @ApiProperty()
  co2e: number;
  @ApiProperty()
  companyId: string;
  @ApiProperty()
  hourPerQuantity: number;
  @ApiProperty()
  price: number;
}
