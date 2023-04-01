import { Module } from '@nestjs/common';
import { DocumentMeasuresService } from './document-measures.service';
import { DocumentMeasuresController } from './document-measures.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [DocumentMeasuresController],
  providers: [DocumentMeasuresService],
  imports: [PrismaModule],
})
export class DocumentMeasuresModule {}
