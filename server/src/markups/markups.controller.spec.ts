import { Test, TestingModule } from '@nestjs/testing';
import { MarkupsController } from './markups.controller';
import { MarkupsService } from './markups.service';

describe('MarkupsController', () => {
  let controller: MarkupsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MarkupsController],
      providers: [MarkupsService],
    }).compile();

    controller = module.get<MarkupsController>(MarkupsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
