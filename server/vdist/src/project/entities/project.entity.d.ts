import { Project } from 'node_modules/@prisma/client';
export declare class ProjectEntity implements Project {
    id: string;
    projectName: string;
    createdAt: Date;
    userId: string;
    workByhour: number;
    companyId: string;
}
