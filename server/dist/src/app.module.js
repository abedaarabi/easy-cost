"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const prisma_module_1 = require("./prisma/prisma.module");
const user_module_1 = require("./user/user.module");
const material_module_1 = require("./material/material.module");
const company_module_1 = require("./company/company.module");
const project_module_1 = require("./project/project.module");
const project_material_module_1 = require("./project-material/project-material.module");
const invited_user_module_1 = require("./invited-user/invited-user.module");
const table_custom_fields_module_1 = require("./table-custom-fields/table-custom-fields.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            prisma_module_1.PrismaModule,
            user_module_1.UserModule,
            material_module_1.MaterialModule,
            company_module_1.CompanyModule,
            project_module_1.ProjectModule,
            project_material_module_1.ProjectMaterialModule,
            invited_user_module_1.InvitedUserModule,
            table_custom_fields_module_1.TableCustomFieldsModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map