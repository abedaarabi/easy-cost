import { InvitedUser } from 'node_modules/@prisma/client';
export declare class InvitedUserEntity implements InvitedUser {
    id: string;
    createdAt: Date;
    companyId: string;
    userId: string;
    projectId: string;
    token: string;
}
