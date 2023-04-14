import { PartialType } from '@nestjs/swagger';
import { CreateMarkupDto } from './create-markup.dto';

export class UpdateMarkupDto extends PartialType(CreateMarkupDto) {}
