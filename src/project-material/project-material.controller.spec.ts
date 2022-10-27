import { Test, TestingModule } from '@nestjs/testing';
import { ProjectMaterialController } from './project-material.controller';
import { ProjectMaterialService } from './project-material.service';

describe('ProjectMaterialController', () => {
  let controller: ProjectMaterialController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProjectMaterialController],
      providers: [ProjectMaterialService],
    }).compile();

    controller = module.get<ProjectMaterialController>(ProjectMaterialController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
