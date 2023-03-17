import { Test, TestingModule } from '@nestjs/testing';
import { AwsController } from './aws.controller';
import { AwsService } from './aws.service';

describe('AwsController', () => {
  let controller: AwsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AwsController],
      providers: [AwsService],
    }).compile();

    controller = module.get<AwsController>(AwsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
