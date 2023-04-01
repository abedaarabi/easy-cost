import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { MaterialModule } from './material/material.module';
import { CompanyModule } from './company/company.module';
import { ProjectModule } from './project/project.module';
import { ProjectMaterialModule } from './project-material/project-material.module';
import { InvitedUserModule } from './invited-user/invited-user.module';
import { TableCustomFieldsModule } from './table-custom-fields/table-custom-fields.module';
import { LoginAuthModule } from './login-auth/login-auth.module';
import { AuthMiddleware } from './middleware/auth.middleware';
import { AwsModule } from './aws/aws.module';
import { ConfigModule } from '@nestjs/config';
import { DocumentMeasuresModule } from './document-measures/document-measures.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.development.local', '.env.development'],
    }),
    PrismaModule,
    UserModule,
    MaterialModule,
    CompanyModule,
    ProjectModule,
    ProjectMaterialModule,
    InvitedUserModule,
    TableCustomFieldsModule,
    InvitedUserModule,
    LoginAuthModule,
    AwsModule,
    DocumentMeasuresModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude({ path: '/api/:id/upload-file', method: RequestMethod.ALL })
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
