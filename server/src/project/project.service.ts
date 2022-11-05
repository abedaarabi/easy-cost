import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Injectable()
export class ProjectService {
  constructor(private prisma: PrismaService) {}

  create(createCompanyDto: CreateProjectDto) {
    return this.prisma.project.create({ data: createCompanyDto });
  }

  findAll() {
    return this.prisma.project.findMany();
  }
  projectsByCompanyId(companyId: string) {
    try {
      const list = this.prisma.project.findMany({
        where: {
          companyId,
        },
      });
      return list;
    } catch (error) {
      throw new Error('not found');
    }
  }

  async findOne(id: string) {
    return this.prisma.project.findUnique({ where: { id } });
  }

  update(id: string, updateProjectDto: UpdateProjectDto) {
    return this.prisma.project.update({
      where: {
        id,
      },
      data: updateProjectDto,
    });
  }

  remove(id: string) {
    console.log(id);

    return this.prisma.project.delete({ where: { id } });
  }
}
