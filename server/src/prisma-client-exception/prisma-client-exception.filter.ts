// //src/prisma-client-exception.filter.ts

// //error codes: https://www.prisma.io/docs/reference/api-reference/error-reference
// import { ArgumentsHost, Catch, HttpStatus } from '@nestjs/common';
// import { BaseExceptionFilter } from '@nestjs/core';
// import { Prisma } from '@prisma/client';
// import { Response } from 'express';

// @Catch(Prisma.PrismaClientKnownRequestError)
// export class PrismaClientExceptionFilter extends BaseExceptionFilter {
//   catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
//     const ctx = host.switchToHttp();
//     const response = ctx.getResponse<Response>();
//     const message = exception.message.replace(/\n/g, '');

//     switch (exception.code) {
//       case 'P2002':
//         const status = HttpStatus.CONFLICT;
//         response.status(status).json({
//           statusCode: status,
//           message: message,
//         });
//         break;
//       case 'P2003':
//         const statusP2003 = HttpStatus.CONFLICT;
//         response.status(statusP2003).json({
//           statusCode: statusP2003,
//           message: message,
//         });
//         break;
//       case 'P2025':
//         const statusP2025 = HttpStatus.CONFLICT;
//         response.status(statusP2025).json({
//           statusCode: statusP2025,
//           message: message,
//         });
//         break;
//       case 'P2000':
//         const statusP2000 = HttpStatus.CONFLICT;
//         response.status(statusP2000).json({
//           statusCode: statusP2000,
//           message: message,
//         });
//         break;
//       case 'P2006':
//         const statusP2006 = HttpStatus.CONFLICT;
//         response.status(statusP2006).json({
//           statusCode: statusP2006,
//           message: message,
//         });
//         break;
//       case 'P2005':
//         const statusP2005 = HttpStatus.CONFLICT;
//         response.status(statusP2005).json({
//           statusCode: statusP2005,
//           message: message,
//         });
//         break;
//       // TODO catch other error codes (e.g. 'P2000' or 'P2025')
//       default:
//         // default 500 error code
//         super.catch(exception, host);
//         break;
//     }
//   }
// }

//src/prisma-client-exception.filter.ts

import { ArgumentsHost, Catch, HttpStatus } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Prisma } from '@prisma/client';
import { Response } from 'express';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter extends BaseExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    console.error(exception.message);
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const message = exception.message.replace(/\n/g, '');

    switch (exception.code) {
      case 'P2002': {
        const status = HttpStatus.CONFLICT;
        response.status(status).json({
          statusCode: status,
          message: message,
        });
        break;
      }
      default:
        // default 500 error code
        super.catch(exception, host);
        break;
    }
  }
}
