import { Injectable } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PrismaService } from '../prisma/prisma.service';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  // TODO inject -- ask Younes
  constructor(private prisma: PrismaService) {}

  create(createUserDto: CreateUserDto) {
    // const user = { ...createUserDto, userType: 'company' };
    return this.prisma.user.create({ data: createUserDto });
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

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.prisma.user.update({
      where: {
        id,
      },
      data: updateUserDto,
    });
  }

  remove(id: string) {
    return this.prisma.user.delete({ where: { id } });
  }
}
