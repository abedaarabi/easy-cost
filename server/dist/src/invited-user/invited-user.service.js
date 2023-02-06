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
exports.InvitedUserService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const jwt = require("jsonwebtoken");
const sg = require("@sendgrid/mail");
sg.setApiKey(process.env.SENDGRID);
const secret = 'secretKey';
const options = {
    expiresIn: '2d',
};
let InvitedUserService = class InvitedUserService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createInvitedUserDto) {
        const token = jwt.sign(createInvitedUserDto, secret, options);
        await this.prisma.invitedUser.create({
            data: Object.assign(Object.assign({}, createInvitedUserDto), { token }),
        });
        const companyInfo = await this.prisma.company.findUnique({
            where: { id: createInvitedUserDto.companyId },
        });
        console.log({ companyInfo });
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
    <p>your invited to project ${companyInfo.name}.</p>
    <p><a href="http://localhost:5173/company/${token}/sing-up">Accept Invitation</a></p>
  </div>
  </body>
</html>
`;
        const msg = {
            to: createInvitedUserDto.email,
            from: 'abedaarabi@gmail.com',
            subject: 'Invitation from Easy Cost',
            text: 'and easy to do anywhere, even with Node.js',
            html,
        };
        const sendGrid = await sg.send(msg);
        console.log(sendGrid);
        return sendGrid;
    }
    findAll() {
        return this.prisma.invitedUser.findMany();
    }
    async findOne(id) {
        return this.prisma.invitedUser.findUnique({ where: { id } });
    }
    update(id, updateInvitedUserDto) {
        return this.prisma.invitedUser.update({
            where: {
                id,
            },
            data: updateInvitedUserDto,
        });
    }
    remove(id) {
        return this.prisma.invitedUser.delete({ where: { id } });
    }
};
InvitedUserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], InvitedUserService);
exports.InvitedUserService = InvitedUserService;
//# sourceMappingURL=invited-user.service.js.map