import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateInvitedUserDto } from './dto/create-invited-user.dto';
import { UpdateInvitedUserDto } from './dto/update-invited-user.dto';
import * as jwt from 'jsonwebtoken';
import * as sg from '@sendgrid/mail';

sg.setApiKey(process.env.SENDGRID);

const secret = 'secretKey';
const options = {
  expiresIn: '1m',
};

@Injectable()
export class InvitedUserService {
  constructor(private prisma: PrismaService) {}

  async create(
    createInvitedUserDto: CreateInvitedUserDto,
    companyId: string,
    userId: string,
  ) {
    const token = jwt.sign(
      { ...createInvitedUserDto, companyId },
      secret,
      options,
    );
    // console.log({ ...createInvitedUserDto, token });
    // return { ...createInvitedUserDto, token };
    // const decode = jwt.verify(token, secret) as any;

    await this.prisma.invitedUser.create({
      data: {
        token,
        companyId,
        userId,
        email: createInvitedUserDto.email,
        role: createInvitedUserDto.userType,
      },
    });

    const companyInfo = await this.prisma.company.findUnique({
      where: { id: companyId },
    });

    const html = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Example Email</title>
  </head>
  <body style="background-color: tomato">
  <div style="background-color: lightblue; padding: 20px;">
    <h1 style="color: blue; text-align: center;">Welcome to AXIOZ 360</h1>
    <p style="color: white;">This is a sample email sent from SendGrid.</p>
    <p>your invited to project ${companyInfo.name}.</p>
    <p><a href="https://easy-cost-client-production.up.railway.app/token/${token}/sing-up">Accept Invitation</a></p>
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
    console.log(sendGrid, '#####');

    return sendGrid;
  }

  findAll() {
    return this.prisma.invitedUser.findMany();
  }

  async findOne(id: string) {
    return this.prisma.invitedUser.findUnique({ where: { id } });
  }

  update(id: string, updateInvitedUserDto: UpdateInvitedUserDto) {
    return this.prisma.invitedUser.update({
      where: {
        id,
      },
      data: updateInvitedUserDto,
    });
  }

  remove(id: string) {
    return this.prisma.invitedUser.delete({ where: { id } });
  }
}
