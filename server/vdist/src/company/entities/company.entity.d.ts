import { Company } from 'node_modules/@prisma/client';
export declare class CompanyEntity implements Company {
    id: string;
    createdAt: Date;
    name: string;
    country: string;
    logo: string;
}
