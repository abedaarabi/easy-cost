import { Test, TestingModule } from '@nestjs/testing';
import { FileVersionsController } from './file-versions.controller';
import { FileVersionsService } from './file-versions.service';

describe('FileVersionsController', () => {
  let controller: FileVersionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FileVersionsController],
      providers: [FileVersionsService],
    }).compile();

    controller = module.get<FileVersionsController>(FileVersionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
