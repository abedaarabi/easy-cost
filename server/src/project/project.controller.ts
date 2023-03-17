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
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ProjectEntity } from './entities/project.entity';
import { Project } from '@prisma/client';
import { RequestModel } from 'src/middleware/auth.middleware';

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

  @Get('projectByCompany/')
  @ApiOkResponse({
    description: 'The record has been successfully created.',
    type: ProjectEntity,
    isArray: true,
  })
  projectsByCompanyId(
    // @Param('companyId') companyId: string,
    @Req() req: RequestModel,
    @Headers('authorization') authorization: string,
  ): Promise<Project[]> {
    console.log(req.user);

    return this.projectService.projectsByCompanyId(req.user.companyId);
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'The record has been successfully created.',
    type: ProjectEntity,
  })
  findOne(
    @Param('id') id: string,
    @Headers('authorization') authorization: string,
  ) {
    return this.projectService.findOne(id);
  }

  @Patch(':id')
  @ApiOkResponse({
    description: 'The record has been successfully created.',
    type: ProjectEntity,
  })
  update(
    @Param('id') id: string,
    @Body() updateProjectDto: UpdateProjectDto,
    @Headers('authorization') authorization: string,
  ) {
    return this.projectService.update(id, updateProjectDto);
  }

  @Delete(':id')
  @ApiOkResponse({
    description: 'The record has been successfully created.',
    type: ProjectEntity,
  })
  remove(
    @Param('id') id: string,
    @Headers('authorization') authorization: string,
  ) {
    return this.projectService.remove(id);
  }
}
