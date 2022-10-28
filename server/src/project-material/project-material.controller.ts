import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProjectMaterialService } from './project-material.service';
import { CreateProjectMaterialDto } from './dto/create-project-material.dto';
import { UpdateProjectMaterialDto } from './dto/update-project-material.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('project-material')
@ApiTags('project-material')
export class ProjectMaterialController {
  constructor(
    private readonly projectMaterialService: ProjectMaterialService,
  ) {}

  @Post()
  create(@Body() createProjectMaterialDto: CreateProjectMaterialDto) {
    return this.projectMaterialService.create(createProjectMaterialDto);
  }

  @Get()
  findAll() {
    return this.projectMaterialService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectMaterialService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProjectMaterialDto: UpdateProjectMaterialDto,
  ) {
    return this.projectMaterialService.update(id, updateProjectMaterialDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projectMaterialService.remove(id);
  }
}
