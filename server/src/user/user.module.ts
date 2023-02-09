import { Module } from '@nestjs/common';

import { UserController } from './user.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserService } from './user.service';
import { ProjectMaterialModule } from 'src/project-material/project-material.module';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [PrismaModule, ProjectMaterialModule],
})
export class UserModule {}
