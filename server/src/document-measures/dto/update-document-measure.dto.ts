import { PartialType } from '@nestjs/swagger';
import { CreateDocumentMeasureDto } from './create-document-measure.dto';

export class UpdateDocumentMeasureDto extends PartialType(
  CreateDocumentMeasureDto,
) {}
