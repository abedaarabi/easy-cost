import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { json } from 'stream/consumers';
import { CreateMarkupDto } from './dto/create-markup.dto';
import { UpdateMarkupDto } from './dto/update-markup.dto';

@Injectable()
export class MarkupsService {
  constructor(private prisma: PrismaService) {}

  async create(createMarkupDto: CreateMarkupDto) {
    console.log({ createMarkupDto });

    try {
      if (
        !createMarkupDto.uploadFileId ||
        !createMarkupDto.markupsString ||
        !createMarkupDto.pageNumber
      ) {
        console.log('Select markups');

        return 'Select markups';
      }
      if (createMarkupDto.uploadFileId) {
        await this.prisma.markups.deleteMany({
          where: {
            pageNumber: createMarkupDto.pageNumber,
            projectId: createMarkupDto.projectId,
            uploadFileId: createMarkupDto.uploadFileId,
          },
        });
      }
      return this.prisma.markups.create({ data: createMarkupDto });
    } catch (error) {
      return error;
    }
  }

  async findAll(createMarkupDto: UpdateMarkupDto) {
    try {
      // const result = await this.prisma.documentMeasures.findMany();
      const result = await this.prisma.markups.findFirst({
        where: {
          pageNumber: createMarkupDto.pageNumber,
          projectId: createMarkupDto.projectId,
          uploadFileId: createMarkupDto.uploadFileId,
        },
      });
      console.log({ result });
      return result;
    } catch (error) {
      throw new Error(error);
    }
    return `This action returns all markups`;
  }

  findOne(id: number) {
    return `This action returns a #${id} markup`;
  }

  update(id: number, updateMarkupDto: UpdateMarkupDto) {
    return `This action updates a #${id} markup`;
  }

  remove(id: number) {
    return `This action removes a #${id} markup`;
  }
}

const baseSVG =
  '<svg xmlns="http://www.w3.org/2000/svg" version="1.1" baseProfile="full" layer-order-id="markups-svg" style="position:absolute; left:0; top:0; transform:scale(1,-1); -ms-transform:scale(1,-1); -webkit-transform:scale(1,-1); -moz-transform:scale(1,-1); -o-transform:scale(1,-1); transformOrigin:0, 0; -ms-transformOrigin:0, 0; -webkit-transformOrigin:0, 0; -moz-transformOrigin:0, 0; -o-transformOrigin:0, 0; " width="411" height="695" viewBox="0.04023131334191632 -16.30593719421205 33.06944274902344 55.92034912110353" pointer-events="none" cursor="default"><metadata><markup_document xmlns="http://www.w3.org/1999/xhtml" data-model-version="4"></markup_document></metadata></svg>';
