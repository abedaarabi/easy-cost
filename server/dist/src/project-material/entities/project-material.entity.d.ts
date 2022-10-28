import { ProjecMaterial } from '@prisma/client';
export declare class ProjectMaterialEntity implements ProjecMaterial {
    id: string;
    materialId: string;
    projectId: string;
    createdAt: Date;
    profit: number;
}
