import { InvitedUser } from '@prisma/client';
export declare class InvitedUserEntity implements InvitedUser {
    id: string;
    createdAt: Date;
    companyId: string;
    userId: string;
    projectId: string;
    token: string;
}
