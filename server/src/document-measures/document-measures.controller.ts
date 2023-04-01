import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Headers,
  UseFilters,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { PrismaClientExceptionFilter } from 'src/prisma-client-exception.filter';
import { DocumentMeasuresService } from './document-measures.service';
import { CreateDocumentMeasureDto } from './dto/create-document-measure.dto';
import { UpdateDocumentMeasureDto } from './dto/update-document-measure.dto';
import { DocumentMeasureEntities } from './entities/document-measure.entity';

@Controller('document-measures')
@UseFilters(PrismaClientExceptionFilter)
@ApiTags('document-measures')
export class DocumentMeasuresController {
  constructor(
    private readonly documentMeasuresService: DocumentMeasuresService,
  ) {}

  @Post()
  @ApiOkResponse({
    description: 'The record has been successfully created.',
    type: DocumentMeasureEntities,
    isArray: true,
  })
  create(
    @Body() createDocumentMeasureDto: CreateDocumentMeasureDto[],
    @Headers('authorization') authorization: string,
  ) {
    return this.documentMeasuresService.create(createDocumentMeasureDto);
  }

  // @Get(':docId')
  // @ApiOkResponse({
  //   description: 'The record has been successfully created.',
  //   type: DocumentMeasuresService,
  //   isArray: false,
  // })
  // findAllByDocument(
  //   @Param('docId') docId: string,
  //   @Headers('authorization') authorization: string,
  // ) {
  //   return this.documentMeasuresService.findAllByDocument(docId);
  // }

  @Post('getmeasurebyid')
  @ApiOkResponse({
    description:
      'Returns all document measures for a given page number, upload file ID and project ID.',
    type: [UpdateDocumentMeasureDto],
  })
  async findAllByMeasurementId(
    // @Param('pageNumber') pageNumber: number,
    // @Param('uploadFileId') uploadFileId: string,
    // @Param('projectId') projectId: string,
    @Body() allParams: UpdateDocumentMeasureDto,
    @Headers('authorization') authorization: string,
  ): Promise<UpdateDocumentMeasureDto[]> {
    const { pageNumber, uploadFileId, projectId } = allParams;
    console.log({
      pageNumber,
      uploadFileId,
      projectId,
    });

    return await this.documentMeasuresService.findAllByMeasurementId(
      pageNumber,
      uploadFileId,
      projectId,
    );
  }
  // @Get(':pageNumber/:uploadFileId/:projectId')
  // @ApiOkResponse({
  //   description: 'The record has been successfully created.',
  //   type: UpdateDocumentMeasureDto,
  //   isArray: true,
  // })
  // findAllByMeasurementId(
  //   @Param('pageNumber') pageNumber: number,
  //   @Param('uploadFileId') uploadFileId: string,
  //   @Param('projectId') projectId: string,
  //   // @Headers('measurementId') measurementId: string,
  //   @Headers('authorization')
  //   authorization: string,
  // ) {
  //   return this.documentMeasuresService.findAllByMeasurementId(
  //     pageNumber,
  //     uploadFileId,
  //     projectId,
  //   );
  // }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.documentMeasuresService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDocumentMeasureDto: UpdateDocumentMeasureDto,
  ) {
    return this.documentMeasuresService.update(+id, updateDocumentMeasureDto);
  }
  @ApiOkResponse({
    description: 'The record has been successfully created.',
    type: UpdateDocumentMeasureDto,
    isArray: false,
  })
  @Delete(':id')
  remove(
    @Param('id') id: string,
    @Headers('authorization')
    authorization: string,
  ) {
    return this.documentMeasuresService.remove(id);
  }
}
