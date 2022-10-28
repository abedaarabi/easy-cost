import { Test, TestingModule } from 'server/node_modules/@nestjs/testing';
import { InvitedUserController } from './invited-user.controller';
import { InvitedUserService } from './invited-user.service';

describe('InvitedUserController', () => {
  let controller: InvitedUserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InvitedUserController],
      providers: [InvitedUserService],
    }).compile();

    controller = module.get<InvitedUserController>(InvitedUserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
