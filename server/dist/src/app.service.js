"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppService = void 0;
const ForgeSDK = require("forge-apis");
const common_1 = require("@nestjs/common");
const jwt = require("jsonwebtoken");
const sg = require("@sendgrid/mail");
const oAuth2TwoLegged = new ForgeSDK.AuthClientTwoLegged('7KQ4vqb7uJFWgWYgNRnhE6T5ZDnbxPcn', 'GMgjs3ljOpfRLuMW', ['data:read', 'data:create', 'data:write'], false);
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
let AppService = class AppService {
    constructor() {
        sg.setApiKey('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');
    }
    async oAuth2() {
        const credentials = await oAuth2TwoLegged.authenticate();
        return credentials;
    }
    getHello() {
        const token = jwt.sign(payload, secret, options);
        const decode = jwt.verify(token, secret);
        console.log(decode);
        return decode;
    }
    async sendEmail() {
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
};
AppService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], AppService);
exports.AppService = AppService;
//# sourceMappingURL=app.service.js.map