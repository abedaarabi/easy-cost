import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  UseFilters,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
  Headers,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { UserEntity } from './entities/user.entity';
import { User } from '@prisma/client';
import { RequestModel } from 'src/middleware/auth.middleware';
import { RolesGuard } from 'src/middleware/auth.guard';
import { Roles } from 'src/middleware/role.decorator';
import { PrismaClientExceptionFilter } from 'src/prisma-client-exception/prisma-client-exception.filter';

enum Role {
  Admin = 'CompanyAdmin',
}

@Controller('user')
@ApiTags('User')
// @UsePipes(
//   new ValidationPipe({
//     whitelist: true,
//     transform: true,
//   }),
// )
// @UseGuards(RolesGuard)
@UseFilters(PrismaClientExceptionFilter)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOkResponse({
    description: 'The record has been successfully created.',
    type: CreateUserDto,
    isArray: false,
  })
  create(@Body() createUserDto: CreateUserDto) {
    console.log(createUserDto);

    return this.userService.create(createUserDto);
  }

  // @Get()
  // @Roles(Role.Admin)
  // @ApiCreatedResponse({ type: UserEntity, isArray: true })
  // findAll(@Req() req: RequestModel, @Headers() authorization?: string) {
  //   return this.userService.findAll();
  // }

  @Get('userByCompany/')
  // @Roles(Role.Admin)
  @ApiOkResponse({
    description: 'The record has been successfully created.',
    type: UserEntity,
    isArray: true,
  })
  findUserByCompanyId(
    // @Param('companyId') companyId: string,
    @Req() req: RequestModel,
    @Headers('authorization') authorization: string,
  ): Promise<User[]> {
    console.log(req.user, 'req');

    return this.userService.findUserByCompanyId(req.user.companyId);
  }

  @Get('email/:email')
  @ApiCreatedResponse({ type: UserEntity })
  async findUnique(
    @Param('email') email: string,
    @Headers('authorization') authorization: string,
  ) {
    const user = await this.userService.findUniqueByEmail(email);
    if (!user) {
      throw new NotFoundException(`user with name: ${email} is not found`);
    }
    return user;
  }

  @Get(':id')
  @ApiCreatedResponse({ type: UserEntity })
  async findOne(
    @Param('id') id: string,
    @Headers('authorization') authorization: string,
  ) {
    const user = await this.userService.findOne(id);
    if (!user) {
      throw new NotFoundException(`user with id: ${id} is not found`);
    }
    return user;
  }

  @Patch(':id')
  @ApiOkResponse({
    description: 'The record has been successfully created.',
    type: UserEntity,
  })
  @ApiCreatedResponse({ type: UserEntity })
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Headers('authorization') authorization: string,
  ) {
    console.log(updateUserDto);

    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @ApiCreatedResponse({ type: UserEntity })
  @ApiOkResponse({
    description: 'The record has been successfully created.',
    type: UserEntity,
  })
  remove(
    @Param('id') id: string,
    @Headers('authorization') authorization: string,
  ) {
    return this.userService.remove(id);
  }
}
