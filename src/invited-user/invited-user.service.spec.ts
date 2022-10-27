import { Test, TestingModule } from '@nestjs/testing';
import { InvitedUserService } from './invited-user.service';

describe('InvitedUserService', () => {
  let service: InvitedUserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InvitedUserService],
    }).compile();

    service = module.get<InvitedUserService>(InvitedUserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
