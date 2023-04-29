import { Injectable } from '@nestjs/common';
import { CreateFileVersionDto } from './dto/create-file-version.dto';
import { UpdateFileVersionDto } from './dto/update-file-version.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FileVersionsService {
  constructor(private prisma: PrismaService) {}
  create(createFileVersionDto: CreateFileVersionDto) {
    return 'This action adds a new fileVersion';
  }

  async findAll(id: string) {
    try {
      const result = await this.prisma.filesVersion.findMany({
        where: {
          uploadFileId: id,
        },
      });
      console.log({ result });

      return result;
    } catch (error) {
      return error;
    }
  }

  findOne(id: string) {
    return this.prisma.filesVersion.findUnique({ where: { id } });
  }

  update(id: string, updateFileVersionDto: UpdateFileVersionDto) {
    console.log(updateFileVersionDto);

    return this.prisma.filesVersion.update({
      where: { id },
      data: updateFileVersionDto,
    });
  }

  remove(id: string) {
    return `This action removes a #${id} fileVersion`;
  }
}

//c5669560-37af-475d-b90a-e6042dbb2e93
