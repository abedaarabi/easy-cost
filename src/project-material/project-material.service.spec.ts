import { Test, TestingModule } from '@nestjs/testing';
import { ProjectMaterialService } from './project-material.service';

describe('ProjectMaterialService', () => {
  let service: ProjectMaterialService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProjectMaterialService],
    }).compile();

    service = module.get<ProjectMaterialService>(ProjectMaterialService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
