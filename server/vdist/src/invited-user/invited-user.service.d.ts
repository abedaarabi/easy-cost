import { PrismaService } from 'src/prisma/prisma.service';
import { CreateInvitedUserDto } from './dto/create-invited-user.dto';
import { UpdateInvitedUserDto } from './dto/update-invited-user.dto';
export declare class InvitedUserService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createInvitedUserDto: CreateInvitedUserDto): import(".prisma/client").Prisma.Prisma__InvitedUserClient<import(".prisma/client").InvitedUser, never>;
    findAll(): import(".prisma/client").PrismaPromise<import(".prisma/client").InvitedUser[]>;
    findOne(id: string): Promise<import(".prisma/client").InvitedUser>;
    update(id: string, updateInvitedUserDto: UpdateInvitedUserDto): import(".prisma/client").Prisma.Prisma__InvitedUserClient<import(".prisma/client").InvitedUser, never>;
    remove(id: string): import(".prisma/client").Prisma.Prisma__InvitedUserClient<import(".prisma/client").InvitedUser, never>;
}
