import { Test, TestingModule } from '@nestjs/testing';
import { TableCustomFieldsController } from './table-custom-fields.controller';
import { TableCustomFieldsService } from './table-custom-fields.service';

describe('TableCustomFieldsController', () => {
  let controller: TableCustomFieldsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TableCustomFieldsController],
      providers: [TableCustomFieldsService],
    }).compile();

    controller = module.get<TableCustomFieldsController>(
      TableCustomFieldsController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
