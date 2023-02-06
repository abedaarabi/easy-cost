import * as ForgeSDK from 'forge-apis';
import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import * as sg from '@sendgrid/mail';

import { readFileSync, writeFileSync } from 'fs';

const oAuth2TwoLegged = new ForgeSDK.AuthClientTwoLegged(
  '7KQ4vqb7uJFWgWYgNRnhE6T5ZDnbxPcn',
  'GMgjs3ljOpfRLuMW',
  ['data:read', 'data:create', 'data:write'],
  false,
);

const secret = 'secretKey';
const options = {
  expiresIn: '2d',
};

const payload = {
  userId: 123,
  name: 'John Doe',
  companyName: 'Art-Tek',
  userType: 'admin',
  email: 'john.doe@example.com',
  role: 'admin',
  companyId: '2sadfsfjhksdkfdsjha',
};

const html = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Example Email</title>
  </head>
  <body style="background-color: tomato">
  <div style="background-color: lightblue; padding: 20px;">
    <h1 style="color: blue; text-align: center;">Hello, World!</h1>
    <p style="color: white;">This is a sample email sent from SendGrid.</p>
    <p>your invited to project ${payload.name}.</p>
    <p><a href="http://localhost:5173/company/${payload.companyId}/sing-up">Accept Invitation</a></p>
  </div>
  </body>
</html>
`;

@Injectable()
export class AppService {
  constructor() {
    sg.setApiKey(
      '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',
    );
  }

  async oAuth2(): Promise<any> {
    const credentials = await oAuth2TwoLegged.authenticate();
    return credentials;
  }
  getHello(): any {
    const token = jwt.sign(payload, secret, options);
    const decode = jwt.verify(token, secret);

    console.log(decode);
    return decode;
  }

  async sendEmail() {
    // const html = readFileSync('/templates/email.html', 'utf-8');
    // const userName = 'Abed Doe';
    const renderedHtml = html.replace('${userName}', 'abed');
    const msg = {
      to: 'abma@moe.dk',
      from: 'abedaarabi@gmail.com',
      subject: 'Sending with SendGrid is Fun',
      text: 'and easy to do anywhere, even with Node.js',
      html: renderedHtml,
    };
    return await sg.send(msg);
  }
}
