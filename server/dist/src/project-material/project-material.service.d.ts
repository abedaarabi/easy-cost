import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProjectMaterialDto } from './dto/create-project-material.dto';
import { UpdateProjectMaterialDto } from './dto/update-project-material.dto';
export declare class ProjectMaterialService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createProjectMaterialDto: CreateProjectMaterialDto): import(".prisma/client").Prisma.Prisma__ProjecMaterialClient<import(".prisma/client").ProjecMaterial, never>;
    findAll(): import(".prisma/client").PrismaPromise<import(".prisma/client").ProjecMaterial[]>;
    findByProjectId(id: string): import(".prisma/client").PrismaPromise<(import(".prisma/client").ProjecMaterial & {
        material: {
            materialName: string;
            price: number;
            workByhour: number;
            unit: string;
        };
    })[]>;
    findOne(id: string): Promise<import(".prisma/client").ProjecMaterial>;
    update(id: string, updateProjectMaterialDto: UpdateProjectMaterialDto): import(".prisma/client").Prisma.Prisma__ProjecMaterialClient<import(".prisma/client").ProjecMaterial, never>;
    remove(id: string): import(".prisma/client").Prisma.Prisma__ProjecMaterialClient<import(".prisma/client").ProjecMaterial, never>;
}
