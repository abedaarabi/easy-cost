import * as ForgeSDK from 'forge-apis';
import { Injectable } from '@nestjs/common';
const oAuth2TwoLegged = new ForgeSDK.AuthClientTwoLegged(
  '',
  '',
  ['data:read', 'data:create', 'data:write'],
  false,
);
@Injectable()
export class AppService {
  async oAuth2(): Promise<any> {
    const credentials = await oAuth2TwoLegged.authenticate();
    return credentials;
  }
  getHello(): string {
    return 'Hello World!';
  }
}
