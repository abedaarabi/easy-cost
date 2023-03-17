import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  Headers,
} from '@nestjs/common';
import { MaterialService } from './material.service';
import { CreateMaterialDto } from './dto/create-material.dto';
import { UpdateMaterialDto } from './dto/update-material.dto';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Material } from '@prisma/client';
import { MaterialEntity } from './entities/material.entity';
import { RequestModel } from 'src/middleware/auth.middleware';

function delay(ms: number) {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
}
@Controller('material')
@ApiTags('Material')
export class MaterialController {
  constructor(private readonly materialService: MaterialService) {}

  @Post()
  @ApiOkResponse({
    description: 'The record has been successfully created.',
    type: MaterialEntity,
    isArray: false,
  })
  create(
    @Body() createMaterialDto: CreateMaterialDto,
    @Headers('authorization') authorization: string,

    @Req() req: RequestModel,
  ) {
    const { companyId, uid: userId } = req.user;
    console.log({ companyId, uid: userId, createMaterialDto });

    return this.materialService.create(createMaterialDto, companyId, userId);
  }

  @Get('materialByCompany')
  @ApiOkResponse({
    description: 'The record has been successfully created.',
    type: MaterialEntity,
    isArray: true,
  })
  async findMaterialByCompanyId(
    @Req() req: RequestModel,
    @Headers('authorization') authorization: string,
  ): Promise<Material[]> {
    console.log(req.user, '22222', { authorization });

    // await delay(2000);
    return this.materialService.findMaterialByCompanyId(req.user.companyId);
  }

  @Get()
  @ApiOkResponse({
    description: 'The record has been successfully created.',
    type: MaterialEntity,
    isArray: true,
  })
  findAll() {
    return this.materialService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'The record has been successfully created.',
    type: MaterialEntity,
  })
  findOne(
    @Param('id') id: string,
    @Headers('authorization') authorization: string,
  ) {
    return this.materialService.findOne(id);
  }

  @Patch(':id')
  @ApiOkResponse({
    description: 'The record has been successfully created.',
    type: MaterialEntity,
  })
  update(
    @Param('id') id: string,
    @Body() updateMaterialDto: UpdateMaterialDto,
    @Headers('authorization') authorization: string,
  ) {
    console.log({ id, updateMaterialDto }, 'ttt');

    return this.materialService.update(id, updateMaterialDto);
  }

  @ApiOkResponse({
    description: 'The record has been successfully created.',
    type: MaterialEntity,
  })
  @Delete(':id')
  remove(
    @Param('id') id: string,
    @Headers('authorization') authorization: string,
  ) {
    return this.materialService.remove(id);
  }
}
