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
  UseFilters,
  ConflictException,
} from '@nestjs/common';
import { MaterialService } from './material.service';
import { CreateMaterialDto } from './dto/create-material.dto';
import { UpdateMaterialDto } from './dto/update-material.dto';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Material } from '@prisma/client';
import { MaterialEntity } from './entities/material.entity';
import { RequestModel } from 'src/middleware/auth.middleware';
import { PrismaClientExceptionFilter } from 'src/prisma-client-exception/prisma-client-exception.filter';

function delay(ms: number) {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
}
@UseFilters(PrismaClientExceptionFilter)
@Controller('material')
@ApiTags('Material')
export class MaterialController {
  constructor(private readonly materialService: MaterialService) {}
  @Post('bulk')
  @ApiOkResponse({
    description: 'The record has been successfully created.',
    type: MaterialEntity,
    isArray: true,
  })
  createBulk(
    @Body() createMaterialDto: CreateMaterialDto[],
    @Headers('authorization') authorization: string,

    @Req() req: RequestModel,
  ) {
    const { companyId, uid: userId } = req.user;

    try {
      return this.materialService.createBulk(createMaterialDto);
    } catch (error) {
      console.log(error);

      throw new Error(error);
    }
  }
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

    try {
      return this.materialService.create(createMaterialDto, companyId, userId);
    } catch (error) {
      console.log(error);

      throw new ConflictException(error);
    }
  }

  @Get('materialByCompany')
  @ApiBearerAuth('JWT-auth')
  @ApiOkResponse({
    description: 'The record has been successfully created.',
    type: MaterialEntity,
    isArray: true,
  })
  findMaterialByCompanyId(
    @Req() req: RequestModel,
    @Headers('authorization') authorization: string,
  ): Promise<Material[]> {
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
    return this.materialService.update(id, updateMaterialDto);
  }

  @ApiOkResponse({
    description: 'The record has been successfully created.',
    type: MaterialEntity,
  })
  @ApiBearerAuth('JWT-auth')
  @Delete(':id')
  remove(
    @Param('id') id: string,
    @Headers('authorization') authorization: string,
  ) {
    return this.materialService.remove(id);
  }
}
