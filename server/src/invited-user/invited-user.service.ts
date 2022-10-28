import { Injectable } from '@nestjs/common';
import { PrismaService } from 'server/src/prisma/prisma.service';
import { CreateInvitedUserDto } from './dto/create-invited-user.dto';
import { UpdateInvitedUserDto } from './dto/update-invited-user.dto';

@Injectable()
export class InvitedUserService {
  constructor(private prisma: PrismaService) {}

  create(createInvitedUserDto: CreateInvitedUserDto) {
    return this.prisma.invitedUser.create({ data: createInvitedUserDto });
  }

  findAll() {
    return this.prisma.invitedUser.findMany();
  }

  async findOne(id: string) {
    return this.prisma.invitedUser.findUnique({ where: { id } });
  }

  update(id: string, updateInvitedUserDto: UpdateInvitedUserDto) {
    return this.prisma.invitedUser.update({
      where: {
        id,
      },
      data: updateInvitedUserDto,
    });
  }

  remove(id: string) {
    return this.prisma.invitedUser.delete({ where: { id } });
  }
}
