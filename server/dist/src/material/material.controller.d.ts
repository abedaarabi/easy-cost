import { MaterialService } from './material.service';
import { CreateMaterialDto } from './dto/create-material.dto';
import { UpdateMaterialDto } from './dto/update-material.dto';
import { Material } from '@prisma/client';
export declare class MaterialController {
    private readonly materialService;
    constructor(materialService: MaterialService);
    create(createMaterialDto: CreateMaterialDto): import(".prisma/client").Prisma.Prisma__MaterialClient<Material, never>;
    findAll(): import(".prisma/client").PrismaPromise<Material[]>;
    findOne(id: string): import(".prisma/client").Prisma.Prisma__MaterialClient<Material, never>;
    findMaterialByCompanyId(companyId: string): Promise<Material[]>;
    update(id: string, updateMaterialDto: UpdateMaterialDto): import(".prisma/client").Prisma.Prisma__MaterialClient<Material, never>;
    remove(id: string): import(".prisma/client").Prisma.Prisma__MaterialClient<Material, never>;
}
