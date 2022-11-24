import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TableCustomFieldsService } from './table-custom-fields.service';
import { CreateTableCustomFieldDto } from './dto/create-table-custom-field.dto';
import { UpdateTableCustomFieldDto } from './dto/update-table-custom-field.dto';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { TableCustomFieldEntities } from './entities/table-custom-field.entity';

@ApiTags('table-custom-fields')
@Controller('table-custom-fields')
export class TableCustomFieldsController {
  constructor(
    private readonly tableCustomFieldsService: TableCustomFieldsService,
  ) {}

  @ApiOkResponse({
    description: 'The record has been successfully created.',
    type: TableCustomFieldEntities,
  })
  @Post()
  create(@Body() createTableCustomFieldDto: CreateTableCustomFieldDto) {
    return this.tableCustomFieldsService.create(createTableCustomFieldDto);
  }

  @ApiOkResponse({
    description: 'The record has been successfully created.',
    type: TableCustomFieldEntities,
    isArray: true,
  })
  @Get()
  findAll() {
    return this.tableCustomFieldsService.findAll();
  }
  @ApiOkResponse({
    description: 'The record has been successfully created.',
    type: TableCustomFieldEntities,
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tableCustomFieldsService.findOne(id);
  }

  @Get('fields/:projectId')
  @ApiOkResponse({
    description: 'The record has been successfully created.',
    type: TableCustomFieldEntities,
    isArray: true,
  })
  findCustomFieldsByProjectId(@Param('projectId') id: string) {
    return this.tableCustomFieldsService.findCustomFieldsByProjectId(id);
  }

  @Patch(':id')
  @ApiOkResponse({
    description: 'The record has been successfully created.',
    type: TableCustomFieldEntities,
  })
  update(
    @Param('id') id: string,
    @Body() updateTableCustomFieldDto: UpdateTableCustomFieldDto,
  ) {
    return this.tableCustomFieldsService.update(id, updateTableCustomFieldDto);
  }

  @ApiOkResponse({
    description: 'The record has been successfully created.',
    type: TableCustomFieldEntities,
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tableCustomFieldsService.remove(id);
  }
}
