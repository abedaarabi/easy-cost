import { Module } from '@nestjs/common';
import { InvitedUserService } from './invited-user.service';
import { InvitedUserController } from './invited-user.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [InvitedUserController],
  providers: [InvitedUserService],
  imports: [PrismaModule],
})
export class InvitedUserModule {}
