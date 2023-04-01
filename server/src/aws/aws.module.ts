import { Module } from '@nestjs/common';
import { AwsService } from './aws.service';
import { AwsController } from './aws.controller';
import { MulterModule } from '@nestjs/platform-express';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [AwsController],
  providers: [AwsService],
  imports: [
    ConfigModule,
    PrismaModule,
    // MulterModule.register({
    //   dest: './uploads', // Specify the directory to store uploaded files
    // }),
  ],
})
export class AwsModule {}
