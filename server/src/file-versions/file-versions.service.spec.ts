import { Test, TestingModule } from '@nestjs/testing';
import { FileVersionsService } from './file-versions.service';

describe('FileVersionsService', () => {
  let service: FileVersionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FileVersionsService],
    }).compile();

    service = module.get<FileVersionsService>(FileVersionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
