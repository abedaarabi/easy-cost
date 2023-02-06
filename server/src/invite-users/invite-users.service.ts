import { Injectable } from '@nestjs/common';
import { CreateInviteUserDto } from './dto/create-invite-user.dto';
import { UpdateInviteUserDto } from './dto/update-invite-user.dto';

@Injectable()
export class InviteUsersService {
  create(createInviteUserDto: CreateInviteUserDto) {
    return 'This action adds a new inviteUser';
  }

  findAll() {
    return `This action returns all inviteUsers`;
  }

  findOne(id: number) {
    return `This action returns a #${id} inviteUser`;
  }

  update(id: number, updateInviteUserDto: UpdateInviteUserDto) {
    return `This action updates a #${id} inviteUser`;
  }

  remove(id: number) {
    return `This action removes a #${id} inviteUser`;
  }
}
