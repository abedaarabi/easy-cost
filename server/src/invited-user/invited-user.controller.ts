import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Headers,
  Req,
} from '@nestjs/common';
import { InvitedUserService } from './invited-user.service';
import { CreateInvitedUserDto } from './dto/create-invited-user.dto';
import { UpdateInvitedUserDto } from './dto/update-invited-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { RequestModel } from 'src/middleware/auth.middleware';

@Controller('invited-user')
@ApiTags('invited-user')
export class InvitedUserController {
  constructor(private readonly invitedUserService: InvitedUserService) {}

  @Post()
  create(
    @Body() createInvitedUserDto: CreateInvitedUserDto,
    @Headers('authorization') authorization: string,
    @Req() req: RequestModel,
  ) {
    const { companyId, uid: userId } = req.user;
    console.log({ createInvitedUserDto, companyId });

    return this.invitedUserService.create(
      createInvitedUserDto,
      companyId,
      userId,
    );
  }

  @Get()
  findAll() {
    return this.invitedUserService.findAll();
  }

  @Get(':id')
  findOne(
    @Param('id') id: string,
    @Headers('authorization') authorization: string,
  ) {
    return this.invitedUserService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateInvitedUserDto: UpdateInvitedUserDto,
  ) {
    return this.invitedUserService.update(id, updateInvitedUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.invitedUserService.remove(id);
  }
}
