import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, MinLength } from 'class-validator';
export class CreateMaterialDto {
  id: string;
  @IsString()
  @MinLength(2)
  @ApiProperty()
  materialName: string;
  @IsString()
  @MinLength(2)
  @ApiProperty()
  supplier: string;
  @IsNumber()
  @ApiProperty()
  price: number;
  @IsString()
  @MinLength(5)
  @ApiProperty()
  userId: string;
}
