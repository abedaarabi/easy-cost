import { Test, TestingModule } from '@nestjs/testing';
import { DocumentMeasuresService } from './document-measures.service';

describe('DocumentMeasuresService', () => {
  let service: DocumentMeasuresService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DocumentMeasuresService],
    }).compile();

    service = module.get<DocumentMeasuresService>(DocumentMeasuresService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
