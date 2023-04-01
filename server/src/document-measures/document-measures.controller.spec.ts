import { Test, TestingModule } from '@nestjs/testing';
import { DocumentMeasuresController } from './document-measures.controller';
import { DocumentMeasuresService } from './document-measures.service';

describe('DocumentMeasuresController', () => {
  let controller: DocumentMeasuresController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DocumentMeasuresController],
      providers: [DocumentMeasuresService],
    }).compile();

    controller = module.get<DocumentMeasuresController>(
      DocumentMeasuresController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
