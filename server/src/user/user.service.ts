import { Injectable } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ProjectMaterialService } from '../project-material/project-material.service';
import { PrismaService } from '../prisma/prisma.service';
import * as admin from 'firebase-admin';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  // TODO inject -- ask Younes
  constructor(
    private prisma: PrismaService,
    private m: ProjectMaterialService,
  ) {}

  create(createUserDto: CreateUserDto) {
    try {
      // const user = { ...createUserDto, userType: 'company' };
      return this.prisma.user.create({
        data: createUserDto,
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  findAll() {
    return this.prisma.user.findMany();
  }

  findUserByCompanyId(companyId: string) {
    try {
      const list = this.prisma.user.findMany({
        where: {
          companyId,
        },
      });
      console.log(list, 'list');

      return list;
    } catch (error) {
      throw new Error('not found');
    }
  }

  findUniqueByEmail(email: string) {
    return this.prisma.user.findMany({
      where: {
        email,
      },
    });
  }

  findOne(id: string) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  update(userId: string, updateUserDto: UpdateUserDto) {
    return this.prisma.user.update({
      where: {
        id: userId,
      },
      data: updateUserDto,
    });
  }

  remove(id: string) {
    return this.prisma.user.delete({ where: { id } });
  }
}
