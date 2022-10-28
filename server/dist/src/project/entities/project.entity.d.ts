import { Project } from '@prisma/client';
export declare class ProjectEntity implements Project {
    id: string;
    projectName: string;
    createdAt: Date;
    userId: string;
    workByhour: number;
    companyId: string;
}
