import {
  createParamDecorator,
  ExecutionContext,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { NextFunction, Request, Response } from 'express';
import { FirebaseAuthService } from 'src/login-auth/login-auth.service';
import { PrismaService } from 'src/prisma/prisma.service';
export interface RequestModel extends Request {
  user: any;
}
@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private readonly firebaseService: FirebaseAuthService,
    private prisma: PrismaService,
  ) {}

  public async use(req: RequestModel, _: Response, next: NextFunction) {
    const { authorization } = req.headers;
    // console.log(req.headers, 'authorization');

    if (!authorization) {
      throw new HttpException(
        { message: 'missing authz header' },
        HttpStatus.BAD_REQUEST,
      );
    }
    try {
      const user = await this.firebaseService.authenticate(authorization);
      const userRole = await this.prisma.user.findUnique({
        where: { id: user.uid },
      });
      // console.log({ ...user, role: userRole.userType, ...userRole });

      req.user = { ...user, role: userRole.userType, ...userRole };
      next();
    } catch (err) {
      throw new HttpException(
        { message: 'invalid token' },
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
}
