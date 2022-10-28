import { Material } from 'node_modules/@prisma/client';
export declare class MaterialEntity implements Material {
    companyId: string;
    unit: string;
    priceUnit: string;
    image: string;
    workByhour: number;
    id: string;
    materialName: string;
    supplier: string;
    createdAt: Date;
    price: number;
    userId: string;
}
