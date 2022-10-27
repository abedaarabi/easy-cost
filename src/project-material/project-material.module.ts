import { Module } from '@nestjs/common';
import { ProjectMaterialService } from './project-material.service';
import { ProjectMaterialController } from './project-material.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [ProjectMaterialController],
  providers: [ProjectMaterialService],
  imports: [PrismaModule],
})
export class ProjectMaterialModule {}
