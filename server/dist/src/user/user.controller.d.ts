import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '@prisma/client';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    create(createUserDto: CreateUserDto): Promise<User>;
    findAll(): import(".prisma/client").PrismaPromise<User[]>;
    findUserByCompanyId(companyId: string): Promise<User[]>;
    findUnique(email: string): Promise<User[]>;
    findOne(id: string): Promise<User>;
    update(id: string, updateUserDto: UpdateUserDto): import(".prisma/client").Prisma.Prisma__UserClient<User, never>;
    remove(id: string): import(".prisma/client").Prisma.Prisma__UserClient<User, never>;
}
