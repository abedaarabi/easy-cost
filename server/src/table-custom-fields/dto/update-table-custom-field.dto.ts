import { PartialType } from '@nestjs/swagger';
import { CreateTableCustomFieldDto } from './create-table-custom-field.dto';

export class UpdateTableCustomFieldDto extends PartialType(
  CreateTableCustomFieldDto,
) {}
