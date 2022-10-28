import { Injectable } from '@nestjs/common';
import { PrismaService } from 'server/src/prisma/prisma.service';
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
    return this.prisma.company.delete({ where: { id } });
  }
}
