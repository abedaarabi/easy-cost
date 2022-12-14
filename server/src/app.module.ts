import { Module } from '@nestjs/common';
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

@Module({
  imports: [
    PrismaModule,
    UserModule,
    MaterialModule,
    CompanyModule,
    ProjectModule,
    ProjectMaterialModule,
    InvitedUserModule,
    TableCustomFieldsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
