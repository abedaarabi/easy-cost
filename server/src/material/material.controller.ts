import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MaterialService } from './material.service';
import { CreateMaterialDto } from './dto/create-material.dto';
import { UpdateMaterialDto } from './dto/update-material.dto';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Material } from '@prisma/client';
import { MaterialEntity } from './entities/material.entity';

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
  create(@Body() createMaterialDto: CreateMaterialDto) {
    console.log(createMaterialDto);

    return this.materialService.create(createMaterialDto);
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
  findOne(@Param('id') id: string) {
    return this.materialService.findOne(id);
  }

  @Get('materialByCompany/:companyId')
  @ApiOkResponse({
    description: 'The record has been successfully created.',
    type: MaterialEntity,
    isArray: true,
  })
  async findMaterialByCompanyId(
    @Param('companyId') companyId: string,
  ): Promise<Material[]> {
    // await delay(2000);
    return this.materialService.findMaterialByCompanyId(companyId);
  }

  @Patch(':id')
  @ApiOkResponse({
    description: 'The record has been successfully created.',
    type: MaterialEntity,
  })
  update(
    @Param('id') id: string,
    @Body() updateMaterialDto: UpdateMaterialDto,
  ) {
    return this.materialService.update(id, updateMaterialDto);
  }

  @ApiOkResponse({
    description: 'The record has been successfully created.',
    type: MaterialEntity,
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.materialService.remove(id);
  }
}
