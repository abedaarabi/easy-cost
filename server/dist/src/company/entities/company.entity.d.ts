import { Company } from '@prisma/client';
export declare class CompanyEntity implements Company {
    id: string;
    createdAt: Date;
    name: string;
    country: string;
    logo: string;
}
