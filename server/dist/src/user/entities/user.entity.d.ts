import { User, UserType } from '@prisma/client';
export declare class UserEntity implements User {
    email: string;
    userType: UserType;
    companyId: string;
    id: string;
    name: string;
    userId: string;
    createdAt: Date;
}
