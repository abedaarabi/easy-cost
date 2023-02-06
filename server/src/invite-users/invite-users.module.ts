import { Module } from '@nestjs/common';
import { InviteUsersService } from './invite-users.service';
import { InviteUsersController } from './invite-users.controller';

@Module({
  controllers: [InviteUsersController],
  providers: [InviteUsersService]
})
export class InviteUsersModule {}
