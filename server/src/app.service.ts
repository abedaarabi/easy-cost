import * as ForgeSDK from 'forge-apis';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): any {
    return 'hello world';
    // const token = jwt.sign(payload, secret, options);
    // const decode = jwt.verify(token, secret);
    // console.log(decode);
    // return decode;
  }
}
