import { ArgumentsHost } from 'node_modules/@nestjs/common';
import { BaseExceptionFilter } from 'node_modules/@nestjs/core';
import { Prisma } from 'node_modules/@prisma/client';
export declare class PrismaClientExceptionFilter extends BaseExceptionFilter {
    catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost): void;
}
