import { ProjectMaterialService } from './project-material.service';
import { CreateProjectMaterialDto } from './dto/create-project-material.dto';
import { UpdateProjectMaterialDto } from './dto/update-project-material.dto';
export declare class ProjectMaterialController {
    private readonly projectMaterialService;
    constructor(projectMaterialService: ProjectMaterialService);
    create(createProjectMaterialDto: CreateProjectMaterialDto): import(".prisma/client").Prisma.Prisma__ProjecMaterialClient<import(".prisma/client").ProjecMaterial, never>;
    findAll(): import(".prisma/client").PrismaPromise<import(".prisma/client").ProjecMaterial[]>;
    findOne(id: string): Promise<import(".prisma/client").ProjecMaterial>;
    update(id: string, updateProjectMaterialDto: UpdateProjectMaterialDto): import(".prisma/client").Prisma.Prisma__ProjecMaterialClient<import(".prisma/client").ProjecMaterial, never>;
    remove(id: string): import(".prisma/client").Prisma.Prisma__ProjecMaterialClient<import(".prisma/client").ProjecMaterial, never>;
}
