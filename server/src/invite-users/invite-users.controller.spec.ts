import { Test, TestingModule } from '@nestjs/testing';
import { InviteUsersController } from './invite-users.controller';
import { InviteUsersService } from './invite-users.service';

describe('InviteUsersController', () => {
  let controller: InviteUsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InviteUsersController],
      providers: [InviteUsersService],
    }).compile();

    controller = module.get<InviteUsersController>(InviteUsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
