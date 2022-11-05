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
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { PrismaClientExceptionFilter } from 'src/prisma-client-exception.filter';
import { UserEntity } from './entities/user.entity';
import { User } from '@prisma/client';

@Controller('user')
@ApiTags('User')
@UseFilters(PrismaClientExceptionFilter)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOkResponse({
    description: 'The record has been successfully created.',
    type: UserEntity,
  })
  @ApiCreatedResponse({ type: UserEntity })
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.create(createUserDto);
  }

  @Get()
  @ApiCreatedResponse({ type: UserEntity, isArray: true })
  findAll() {
    return this.userService.findAll();
  }

  @Get('userByCompany/:companyId')
  @ApiOkResponse({
    description: 'The record has been successfully created.',
    type: UserEntity,
    isArray: true,
  })
  findUserByCompanyId(@Param('companyId') companyId: string): Promise<User[]> {
    return this.userService.findUserByCompanyId(companyId);
  }

  @Get('email/:email')
  @ApiCreatedResponse({ type: UserEntity })
  async findUnique(@Param('email') email: string) {
    const user = await this.userService.findUniqueByEmail(email);
    if (!user) {
      throw new NotFoundException(`user with name: ${email} is not found`);
    }
    return user;
  }

  @Get(':id')
  @ApiCreatedResponse({ type: UserEntity })
  async findOne(@Param('id') id: string) {
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
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @ApiCreatedResponse({ type: UserEntity })
  @ApiOkResponse({
    description: 'The record has been successfully created.',
    type: UserEntity,
  })
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
