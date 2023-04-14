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
import { MarkupsService } from './markups.service';
import { CreateMarkupDto } from './dto/create-markup.dto';
import { UpdateMarkupDto } from './dto/update-markup.dto';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { MarkupEntities } from './entities/markup.entity';

@Controller('markups')
@ApiTags('Markups')
export class MarkupsController {
  constructor(private readonly markupsService: MarkupsService) {}
  @ApiOkResponse({
    description: 'The record has been successfully created.',
    type: CreateMarkupDto,
    isArray: false,
  })
  @Post()
  create(
    @Body() createMarkupDto: CreateMarkupDto,

    @Headers('authorization') authorization: string,
  ) {
    delete createMarkupDto.id;
    delete createMarkupDto.createdAt;

    return this.markupsService.create(createMarkupDto);
  }
  @ApiOkResponse({
    description: 'The record has been successfully created.',
    type: UpdateMarkupDto,
    isArray: false,
  })
  @Post('markupsbyid')
  findAll(
    @Body() createMarkupDto: UpdateMarkupDto,
    @Headers('authorization') authorization: string,
  ) {
    console.log({ createMarkupDto });

    return this.markupsService.findAll(createMarkupDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.markupsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMarkupDto: UpdateMarkupDto) {
    return this.markupsService.update(+id, updateMarkupDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.markupsService.remove(+id);
  }
}
