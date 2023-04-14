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
import { ProjectMaterialService } from './project-material.service';
import { CreateProjectMaterialDto } from './dto/create-project-material.dto';
import { UpdateProjectMaterialDto } from './dto/update-project-material.dto';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ProjectMaterialEntity } from './entities/project-material.entity';
import { RequestModel } from 'src/middleware/auth.middleware';
import { PrismaClientExceptionFilter } from 'src/prisma-client-exception/prisma-client-exception.filter';

@Controller('project-material')
@UseFilters(PrismaClientExceptionFilter)
@ApiTags('project-material')
export class ProjectMaterialController {
  constructor(
    private readonly projectMaterialService: ProjectMaterialService,
  ) {}

  @Post()
  @ApiOkResponse({
    description: 'The record has been successfully created.',
    type: ProjectMaterialEntity,
  })
  create(
    @Body() createProjectMaterialDto: CreateProjectMaterialDto,
    @Headers('authorization') authorization: string,
  ) {
    delete createProjectMaterialDto.createdAt;
    console.log({ createProjectMaterialDto });

    return this.projectMaterialService.create(createProjectMaterialDto);
  }

  @Get()
  findAll() {
    return this.projectMaterialService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'The record has been successfully created.',
    type: ProjectMaterialEntity,
  })
  findOne(
    @Param('id') id: string,
    @Headers('authorization') authorization: string,
  ) {
    return this.projectMaterialService.findOne(id);
  }

  @Get('projectMaterial/:projectId')
  @ApiOkResponse({
    description: 'The record has been successfully created.',
    type: ProjectMaterialEntity,
    isArray: true,
  })
  findByProjectId(
    @Param('projectId') id: string,
    @Req() req: RequestModel,
    @Headers('authorization') authorization: string,
  ) {
    return this.projectMaterialService.findByProjectId(id);
  }

  @Patch(':id')
  @ApiOkResponse({
    description: 'The record has been successfully created.',
    type: ProjectMaterialEntity,
  })
  update(
    @Param('id') id: string,
    @Body() updateProjectMaterialDto: UpdateProjectMaterialDto,
    @Headers('authorization') authorization: string,
  ) {
    console.log(updateProjectMaterialDto, id);

    return this.projectMaterialService.update(id, updateProjectMaterialDto);
  }

  @Delete(':id')
  @ApiOkResponse({
    description: 'The record has been successfully created.',
    type: ProjectMaterialEntity,
  })
  remove(
    @Param('id') id: string,
    @Headers('authorization') authorization: string,
  ) {
    return this.projectMaterialService.remove(id);
  }
}
