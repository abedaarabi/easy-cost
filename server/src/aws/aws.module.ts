import { Module } from '@nestjs/common';
import { AwsService } from './aws.service';
import { AwsController } from './aws.controller';
import { MulterModule } from '@nestjs/platform-express';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [AwsController],
  imports: [
    ConfigModule,
    // MulterModule.register({
    //   dest: './uploads', // Specify the directory to store uploaded files
    // }),
  ],
  providers: [AwsService],
})
export class AwsModule {}
