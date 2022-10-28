import { INestApplication, OnModuleInit } from 'node_modules/@nestjs/common';
import { PrismaClient } from 'node_modules/@prisma/client';
export declare class PrismaService extends PrismaClient implements OnModuleInit {
    onModuleInit(): Promise<void>;
    enableShutdownHooks(app: INestApplication): Promise<void>;
}
