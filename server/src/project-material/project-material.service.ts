import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProjectMaterialDto } from './dto/create-project-material.dto';
import { UpdateProjectMaterialDto } from './dto/update-project-material.dto';

@Injectable()
export class ProjectMaterialService {
  constructor(private prisma: PrismaService) {}

  create(createProjectMaterialDto: CreateProjectMaterialDto) {
    return this.prisma.projecMaterial.create({
      data: createProjectMaterialDto,
    });
  }

  findAll() {
    return this.prisma.projecMaterial.findMany();
  }
  findByProjectId(id: string) {
    return this.prisma.projecMaterial.findMany({
      where: {
        projectId: id,
      },
      include: {
        project: {
          select: {
            projectName: true,
          },
        },
        material: {
          select: {
            materialName: true,
            price: true,
            workByhour: true,
            unit: true,
          },
        },
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.projecMaterial.findUnique({ where: { id } });
  }

  update(id: string, updateProjectMaterialDto: UpdateProjectMaterialDto) {
    return this.prisma.projecMaterial.update({
      where: {
        id,
      },
      data: updateProjectMaterialDto,
    });
  }

  remove(id: string) {
    return this.prisma.projecMaterial.delete({ where: { id } });
  }
}
