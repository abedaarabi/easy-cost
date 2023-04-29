import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Headers,
} from '@nestjs/common';
import { FileVersionsService } from './file-versions.service';
import { CreateFileVersionDto } from './dto/create-file-version.dto';
import { UpdateFileVersionDto } from './dto/update-file-version.dto';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

@Controller('file-versions')
@ApiTags('file versions')
export class FileVersionsController {
  constructor(private readonly fileVersionsService: FileVersionsService) {}

  @Post()
  create(@Body() createFileVersionDto: CreateFileVersionDto) {
    return this.fileVersionsService.create(createFileVersionDto);
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'The record has been successfully created.',
    type: CreateFileVersionDto,
    isArray: true,
  })
  findAll(
    @Headers('authorization') authorization: string,
    @Param('id') id: string,
  ) {
    console.log({ id });

    return this.fileVersionsService.findAll(id);
  }

  @Get(':id/single')
  @ApiOkResponse({
    description: 'The record has been successfully created.',
    type: CreateFileVersionDto,
    isArray: false,
  })
  findOne(
    @Param('id') id: string,
    @Headers('authorization') authorization: string,
  ) {
    return this.fileVersionsService.findOne(id);
  }

  @Patch(':id')
  @ApiOkResponse({
    description: 'The record has been successfully created.',
    type: CreateFileVersionDto,
    isArray: false,
  })
  update(
    @Param('id') id: string,
    @Headers('authorization') authorization: string,

    @Body() updateFileVersionDto: UpdateFileVersionDto,
  ) {
    return this.fileVersionsService.update(id, updateFileVersionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.fileVersionsService.remove(id);
  }
}
