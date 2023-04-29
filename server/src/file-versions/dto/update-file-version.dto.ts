import { PartialType } from '@nestjs/swagger';
import { CreateFileVersionDto } from './create-file-version.dto';

export class UpdateFileVersionDto extends PartialType(CreateFileVersionDto) {}
