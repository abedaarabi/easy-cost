import { Module } from '@nestjs/common';

import { UserController } from './user.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserService } from './user.service';
import { ProjectMaterialModule } from 'src/project-material/project-material.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [
    PrismaModule,
    ProjectMaterialModule,
    ConfigModule.forRoot({
      envFilePath: ['.env.development.local', '.env.development'],
    }),
  ],
})
export class UserModule {}
