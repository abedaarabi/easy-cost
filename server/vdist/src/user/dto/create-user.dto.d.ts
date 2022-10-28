import { UserType } from 'node_modules/@prisma/client';
export declare class CreateUserDto {
    name: string;
    email: string;
    avatar: string;
    userType: UserType;
    companyId: string;
}
