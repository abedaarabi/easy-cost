import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateDocumentMeasureDto } from './dto/create-document-measure.dto';
import { UpdateDocumentMeasureDto } from './dto/update-document-measure.dto';

@Injectable()
export class DocumentMeasuresService {
  constructor(private prisma: PrismaService) {}

  async create(createDocumentMeasureDto: CreateDocumentMeasureDto[]) {
    console.log(createDocumentMeasureDto);

    try {
      if (createDocumentMeasureDto?.length === 0) {
        console.log('select measure');

        return 'select measure';
      } else {
        await this.prisma.documentMeasures.deleteMany({
          where: {
            uploadFileId: createDocumentMeasureDto.at(0).uploadFileId,
            pageNumber: createDocumentMeasureDto.at(0).pageNumber,
          },
        });
        const result = await this.prisma.documentMeasures.createMany({
          data: createDocumentMeasureDto,
        });
        return result;
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  async findAllByMeasurementId(
    pageNumber: number,
    uploadFileId: string,
    projectId: string,
    // measurementId: string,
  ) {
    // const { uploadFileId, pageNumber, projectId } = docDetails;
    try {
      // const result = await this.prisma.documentMeasures.findMany();
      const result = await this.prisma.documentMeasures.findMany({
        where: {
          pageNumber: pageNumber,
          projectId: projectId,
          uploadFileId: uploadFileId,
        },
      });
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }
  findAllByDocument(docId: string) {
    console.log(docId);

    return `This action returns all documentMeasures`;
  }

  findOne(id: number) {
    return `This action returns a #${id} documentMeasure`;
  }

  update(id: number, updateDocumentMeasureDto: UpdateDocumentMeasureDto) {
    return `This action updates a #${id} documentMeasure`;
  }

  remove(id: string) {
    return this.prisma.documentMeasures.delete({
      where: { measurementId: id },
    });
  }
}
