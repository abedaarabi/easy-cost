import { UserType } from '@prisma/client';
export declare class CreateUserDto {
    name: string;
    email: string;
    userType: UserType;
    companyId: string;
    userId?: string;
    id: string;
}
