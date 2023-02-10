import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProjectMaterialDto } from './dto/create-project-material.dto';
import { UpdateProjectMaterialDto } from './dto/update-project-material.dto';

@Injectable()
export class ProjectMaterialService {
  constructor(private prisma: PrismaService) {}

  create(createProjectMaterialDto: CreateProjectMaterialDto) {
    return this.prisma.projectMaterial.create({
      data: createProjectMaterialDto,
    });
  }

  findAll() {
    return this.prisma.projectMaterial.findMany();
  }
  findByProjectId(id: string) {
    return this.prisma.projectMaterial.findMany({
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
            co2e: true,
            hourPerQuantity: true,
            unit: true,
          },
        },
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.projectMaterial.findUnique({ where: { id } });
  }

  update(id: string, updateProjectMaterialDto: UpdateProjectMaterialDto) {
    return this.prisma.projectMaterial.update({
      where: {
        id,
      },
      data: updateProjectMaterialDto,
    });
  }

  remove(id: string) {
    return this.prisma.projectMaterial.delete({ where: { id } });
  }
}
