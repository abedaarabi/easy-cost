import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InviteUsersService } from './invite-users.service';
import { CreateInviteUserDto } from './dto/create-invite-user.dto';
import { UpdateInviteUserDto } from './dto/update-invite-user.dto';

@Controller('invite-users')
export class InviteUsersController {
  constructor(private readonly inviteUsersService: InviteUsersService) {}

  @Post()
  create(@Body() createInviteUserDto: CreateInviteUserDto) {
    return this.inviteUsersService.create(createInviteUserDto);
  }

  @Get()
  findAll() {
    return this.inviteUsersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.inviteUsersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInviteUserDto: UpdateInviteUserDto) {
    return this.inviteUsersService.update(+id, updateInviteUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.inviteUsersService.remove(+id);
  }
}
