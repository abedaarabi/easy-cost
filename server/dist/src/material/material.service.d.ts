import { PrismaService } from 'src/prisma/prisma.service';
import { CreateMaterialDto } from './dto/create-material.dto';
import { UpdateMaterialDto } from './dto/update-material.dto';
export declare class MaterialService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createMaterialDto: CreateMaterialDto): import(".prisma/client").Prisma.Prisma__MaterialClient<import(".prisma/client").Material, never>;
    findAll(): import(".prisma/client").PrismaPromise<import(".prisma/client").Material[]>;
    findMaterialByCompanyId(companyId: string): import(".prisma/client").PrismaPromise<import(".prisma/client").Material[]>;
    findOne(id: string): import(".prisma/client").Prisma.Prisma__MaterialClient<import(".prisma/client").Material, never>;
    update(id: string, updateMaterialDto: UpdateMaterialDto): import(".prisma/client").Prisma.Prisma__MaterialClient<import(".prisma/client").Material, never>;
    remove(id: string): import(".prisma/client").Prisma.Prisma__MaterialClient<import(".prisma/client").Material, never>;
}
