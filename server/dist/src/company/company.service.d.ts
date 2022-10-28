import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
export declare class CompanyService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createCompanyDto: CreateCompanyDto): import(".prisma/client").Prisma.Prisma__CompanyClient<import(".prisma/client").Company, never>;
    findAll(): import(".prisma/client").PrismaPromise<import(".prisma/client").Company[]>;
    findOne(id: string): Promise<import(".prisma/client").Company>;
    update(id: string, updateCompanyDto: UpdateCompanyDto): import(".prisma/client").Prisma.Prisma__CompanyClient<import(".prisma/client").Company, never>;
    remove(id: string): import(".prisma/client").Prisma.Prisma__CompanyClient<import(".prisma/client").Company, never>;
}
