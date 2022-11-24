import { Module } from '@nestjs/common';
import { TableCustomFieldsService } from './table-custom-fields.service';
import { TableCustomFieldsController } from './table-custom-fields.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [TableCustomFieldsController],
  providers: [TableCustomFieldsService],
  imports: [PrismaModule],
})
export class TableCustomFieldsModule {}
