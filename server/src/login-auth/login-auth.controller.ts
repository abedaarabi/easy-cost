import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Request } from 'express';
import * as CONSTANT from './constants.api';

import * as admin from 'firebase-admin';
import { FirebaseAuthService } from './login-auth.service';
import { UserDTO } from './login-auth-dto';
import { RequestModel } from 'src/middleware/auth.middleware';

@ApiTags('user-auth')
@Controller('user-auth')
export class UserController {
  constructor(private authService: FirebaseAuthService) {}

  @Post()
  @ApiOkResponse({ schema: { example: { isAuthenticate: true, status: 200 } } })
  public async createUser(
    @Req() req: Request,
    @Body() userDto: UserDTO,
  ): Promise<any> {
    const { displayName, password, email, role } = userDto;

    try {
      const { uid } = await admin.auth().createUser({
        displayName,
        password,
        email,
      });
      return admin.auth().setCustomUserClaims(uid, { role });
      return { uid };
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }
  @Get('p')
  @ApiOkResponse({ schema: { example: { isAuthenticate: true, status: 200 } } })
  public async gerProducts(
    @Req() req: RequestModel,
    @Body() userDto: UserDTO,
  ): Promise<any> {
    return '[123]';
  }
}
