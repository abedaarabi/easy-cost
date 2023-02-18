import { Module } from '@nestjs/common';
import { FirebaseAuthService } from './login-auth.service';
import { UserController } from './login-auth.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [UserController],
  providers: [FirebaseAuthService],
  exports: [FirebaseAuthService],
  imports: [PrismaModule],
})
export class LoginAuthModule {}
