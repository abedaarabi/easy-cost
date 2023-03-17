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
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AwsService } from './aws.service';
import { CreateAwDto } from './dto/create-aw.dto';
import { UpdateAwDto } from './dto/update-aw.dto';
import { Express } from 'express';
import { ConfigService } from '@nestjs/config';

@Controller('api')
export class AwsController {
  constructor(
    private readonly awsService: AwsService,
    private configService: ConfigService,
  ) {}

  @UseInterceptors(FileInterceptor('file'))
  @Post('/:id/upload-file')
  async addImageToRecipe(
    @UploadedFile() file: Express.Multer.File,
    @Param('id') id: string,
    @Request() req,
  ) {
    console.log(file);

    return await this.awsService.uploadFile(file, id);
    return {
      tt: this.configService.get<string>('S3_REGION') || 'eu-west-2',
      yy: this.configService.get<string>('S3_BUCKET') || 'eu-west-2',
      fileName: file.originalname,
    };
    // const { sub: email } = req.user;
    // await this.recipeService.addFileTorecipe(file, id, email);
  }
  @Post()
  create(@Body() createAwDto: CreateAwDto) {
    return this.awsService.create(createAwDto);
  }

  @Get()
  findAll() {
    return this.awsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.awsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAwDto: UpdateAwDto) {
    return this.awsService.update(+id, updateAwDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.awsService.remove(+id);
  }
}
