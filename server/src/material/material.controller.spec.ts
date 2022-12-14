import { Test, TestingModule } from 'server/node_modules/@nestjs/testing';
import { MaterialController } from './material.controller';
import { MaterialService } from './material.service';

describe('MaterialController', () => {
  let controller: MaterialController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MaterialController],
      providers: [MaterialService],
    }).compile();

    controller = module.get<MaterialController>(MaterialController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
