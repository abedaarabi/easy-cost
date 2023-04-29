import { Module } from '@nestjs/common';
import { FileVersionsService } from './file-versions.service';
import { FileVersionsController } from './file-versions.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [FileVersionsController],
  providers: [FileVersionsService],
  imports: [PrismaModule],
})
export class FileVersionsModule {}
