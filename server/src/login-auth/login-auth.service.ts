import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as CONSTANT from './constants.api';

import admin from 'src/main';
@Injectable()
export class FirebaseAuthService {
  private getToken(authToken: string): string {
    const match = authToken.match(/^Bearer (.*)$/);
    if (!match || match.length < 2) {
      throw new UnauthorizedException(CONSTANT.INVALID_BEARER_TOKEN);
    }
    return match[1];
  }
  public async authenticate(authToken: string): Promise<any> {
    const tokenString = this.getToken(authToken);
    try {
      const decodedToken: admin.auth.DecodedIdToken = await admin
        .auth()
        .verifyIdToken(tokenString);

      const { email, uid } = decodedToken;

      return { email, uid };
    } catch (err) {
      console.log(`error while authenticate request ${err.message}`);
      throw new UnauthorizedException(err.message);
    }
  }
}
