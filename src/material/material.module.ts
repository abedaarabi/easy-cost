import { Module } from '@nestjs/common';
import { MaterialService } from './material.service';
import { MaterialController } from './material.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [MaterialController],
  providers: [MaterialService],
  imports: [PrismaModule],
})
export class MaterialModule {}
