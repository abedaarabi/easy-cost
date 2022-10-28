import { User, UserType } from '@prisma/client';
export declare class UserEntity implements User {
    email: string;
    avatar: string;
    userType: UserType;
    companyId: string;
    id: string;
    name: string;
    createdAt: Date;
}
