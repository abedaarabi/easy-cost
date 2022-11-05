import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ProjectEntity } from './entities/project.entity';
import { Project } from '@prisma/client';

@Controller('project')
@ApiTags('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  create(@Body() createProjectDto: CreateProjectDto) {
    return this.projectService.create(createProjectDto);
  }

  @Get()
  @ApiOkResponse({
    description: 'The record has been successfully created.',
    type: ProjectEntity,
    isArray: true,
  })
  findAll() {
    return this.projectService.findAll();
  }

  @Get('projectByCompany/:companyId')
  @ApiOkResponse({
    description: 'The record has been successfully created.',
    type: ProjectEntity,
    isArray: true,
  })
  projectsByCompanyId(
    @Param('companyId') companyId: string,
  ): Promise<Project[]> {
    return this.projectService.projectsByCompanyId(companyId);
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'The record has been successfully created.',
    type: ProjectEntity,
  })
  findOne(@Param('id') id: string) {
    return this.projectService.findOne(id);
  }

  @Patch(':id')
  @ApiOkResponse({
    description: 'The record has been successfully created.',
    type: ProjectEntity,
  })
  update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectService.update(id, updateProjectDto);
  }

  @Delete(':id')
  @ApiOkResponse({
    description: 'The record has been successfully created.',
    type: ProjectEntity,
  })
  remove(@Param('id') id: string) {
    return this.projectService.remove(id);
  }
}
