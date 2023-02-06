import { InvitedUser } from 'node_modules/@prisma/client';
export declare class InvitedUserEntity implements InvitedUser {
    role: string;
    id: string;
    createdAt: Date;
    email: string;
    companyId: string;
    userId: string;
    projectId: string;
    token: string;
}
