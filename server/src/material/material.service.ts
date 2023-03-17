import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateMaterialDto } from './dto/create-material.dto';
import { UpdateMaterialDto } from './dto/update-material.dto';
import * as admin from 'firebase-admin';

@Injectable()
export class MaterialService {
  constructor(private prisma: PrismaService) {}

  async create(
    createMaterialDto: CreateMaterialDto,
    companyId: string,
    userId: string,
  ) {
    const validateResult = {
      unit: createMaterialDto.unit,
      co2e: Number(createMaterialDto.co2e),
      hourPerQuantity: Number(createMaterialDto.hourPerQuantity),
      materialName: createMaterialDto.materialName,
      price: Number(createMaterialDto.price),
    };

    try {
      return this.prisma.material.create({
        data: { ...validateResult, companyId, userId },
      });
    } catch (error) {
      console.log(error);

      throw new Error(error);
    }
  }

  findAll() {
    return this.prisma.material.findMany();
  }

  findMaterialByCompanyId(companyId: string) {
    try {
      const list = this.prisma.material.findMany({
        where: {
          companyId,
        },
      });
      return list;
    } catch (error) {
      throw new Error('not found');
    }
  }

  findOne(id: string) {
    return this.prisma.material.findUnique({ where: { id } });
  }

  update(id: string, updateMaterialDto: UpdateMaterialDto) {
    return this.prisma.material.update({
      where: {
        id,
      },
      data: updateMaterialDto,
    });
  }

  remove(id: string) {
    console.log(id);

    return this.prisma.material.delete({ where: { id } });
  }
}
