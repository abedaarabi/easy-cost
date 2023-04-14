import { Module } from '@nestjs/common';
import { MarkupsService } from './markups.service';
import { MarkupsController } from './markups.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [MarkupsController],
  providers: [MarkupsService],
  imports: [PrismaModule],
})
export class MarkupsModule {}
