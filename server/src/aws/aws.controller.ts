import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  Request,
  ParseUUIDPipe,
  Headers,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AwsService } from './aws.service';
import { CreateAwDto } from './dto/create-aw.dto';
import { UpdateAwDto } from './dto/update-aw.dto';
import { Express } from 'express';
import { ConfigService } from '@nestjs/config';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { PrismaService } from 'src/prisma/prisma.service';
import { AwsEntity } from './entities/aw.entity';

@Controller('api')
@ApiTags('upload file')
export class AwsController {
  constructor(private readonly awsService: AwsService) {}
  @ApiOkResponse({
    description: 'The record has been successfully created.',
  })
  @UseInterceptors(FileInterceptor('file'))
  @Post(':projectId/upload-file')
  async addFileToProject(
    @UploadedFile() file: Express.Multer.File,
    @Param('projectId') projectId: string,
    @Request() req,
    @Headers('authorization') authorization: string,
  ) {
    const awsResult = await this.awsService.uploadFile(
      file,
      file.originalname,
      projectId,
    );
    console.log(awsResult);

    return awsResult;
  }
  @Get(':id/document-id')
  @ApiOkResponse({
    description: 'The record has been successfully created.',
    type: AwsEntity,
    isArray: false,
  })
  findOne(
    @Param('id') id: string,
    @Headers('authorization') authorization: string,
  ) {
    return this.awsService.findOne(id);
  }
  @Post()
  create(@Body() createAwDto: CreateAwDto) {
    return this.awsService.create(createAwDto);
  }

  @ApiOkResponse({
    description: 'The record has been successfully created.',
    type: AwsEntity,
    isArray: true,
  })
  @Get(':projectId/upload-file')
  findAllByProjectId(
    @Param('projectId') projectId: string,
    @Headers('authorization') authorization: string,
  ) {
    return this.awsService.findAllByProjectId(projectId);
  }

  @ApiOkResponse({
    description: 'The record has been successfully created.',
    type: AwsEntity,
    isArray: false,
  })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAwDto: UpdateAwDto,
    @Headers('authorization') authorization: string,
  ) {
    return this.awsService.update(id, updateAwDto);
  }
  @ApiOkResponse({
    description: 'The record has been successfully created.',
    type: AwsEntity,
    isArray: false,
  })
  @Delete(':id/')
  remove(
    @Param('id') id: string,
    @Headers('authorization') authorization: string,
  ) {
    return this.awsService.remove(id);
  }

  @Get('aws-test')
  test() {
    return this.awsService.getObjectVersion();
  }
}
