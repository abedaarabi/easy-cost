import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTableCustomFieldDto } from './dto/create-table-custom-field.dto';
import { UpdateTableCustomFieldDto } from './dto/update-table-custom-field.dto';

@Injectable()
export class TableCustomFieldsService {
  constructor(private prisma: PrismaService) {}

  create(createTableCustomFieldDto: CreateTableCustomFieldDto) {
    return this.prisma.tableCustomFields.create({
      data: createTableCustomFieldDto,
    });
  }

  findAll() {
    return this.prisma.tableCustomFields.findMany();
  }

  findCustomFieldsByProjectId(id: string) {
    console.log(id, '$$$$');

    return this.prisma.tableCustomFields.findMany({
      where: {
        projectId: id,
      },
    });
  }

  findOne(id: string) {
    return this.prisma.tableCustomFields.findUnique({ where: { id } });
  }

  update(id: string, updateTableCustomFieldDto: UpdateTableCustomFieldDto) {
    return this.prisma.tableCustomFields.update({
      where: {
        id,
      },
      data: updateTableCustomFieldDto,
    });
  }

  remove(id: string) {
    return this.prisma.tableCustomFields.delete({ where: { id } });
  }
}
