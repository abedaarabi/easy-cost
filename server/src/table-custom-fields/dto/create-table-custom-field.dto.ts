import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';

export class CreateTableCustomFieldDto {
  @ApiProperty()
  id: string;
  @ApiProperty()
  projectId: string;
  @ApiProperty()
  columnName: string;
  @ApiProperty()
  columnType: string;
  @ApiProperty()
  customFieldValue: Prisma.JsonValue;
}
