import { ApiProperty } from '@nestjs/swagger';
import { Prisma, TableCustomFields } from 'node_modules/@prisma/client';

export class TableCustomFieldEntities implements TableCustomFields {
  @ApiProperty()
  id: string;
  @ApiProperty()
  projectId: string;
  @ApiProperty()
  columnName: string;
  @ApiProperty()
  columnType: string;
  @ApiProperty()
  customFieldValue: any;
  //   customFieldValue: Prisma.JsonValue;
}
