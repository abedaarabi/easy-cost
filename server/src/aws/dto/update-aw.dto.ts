import { PartialType } from '@nestjs/swagger';
import { CreateAwDto } from './create-aw.dto';

export class UpdateAwDto extends PartialType(CreateAwDto) {}
