import { Test, TestingModule } from '@nestjs/testing';
import { TableCustomFieldsService } from './table-custom-fields.service';

describe('TableCustomFieldsService', () => {
  let service: TableCustomFieldsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TableCustomFieldsService],
    }).compile();

    service = module.get<TableCustomFieldsService>(TableCustomFieldsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
