import { MaterialService } from './material.service';
import { CreateMaterialDto } from './dto/create-material.dto';
import { UpdateMaterialDto } from './dto/update-material.dto';
export declare class MaterialController {
    private readonly materialService;
    constructor(materialService: MaterialService);
    create(createMaterialDto: CreateMaterialDto): import(".prisma/client").Prisma.Prisma__MaterialClient<import(".prisma/client").Material, never>;
    findAll(): import(".prisma/client").PrismaPromise<import(".prisma/client").Material[]>;
    findOne(id: string): import(".prisma/client").Prisma.Prisma__MaterialClient<import(".prisma/client").Material, never>;
    findMaterialByCompanyId(companyId: string): Promise<import(".prisma/client").Material[]>;
    update(id: string, updateMaterialDto: UpdateMaterialDto): import(".prisma/client").Prisma.Prisma__MaterialClient<import(".prisma/client").Material, never>;
    remove(id: string): import(".prisma/client").Prisma.Prisma__MaterialClient<import(".prisma/client").Material, never>;
}
