import { Test, TestingModule } from '@nestjs/testing';
import { MarkupsService } from './markups.service';

describe('MarkupsService', () => {
  let service: MarkupsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MarkupsService],
    }).compile();

    service = module.get<MarkupsService>(MarkupsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
