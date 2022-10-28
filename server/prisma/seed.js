"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var faker_1 = require("@faker-js/faker");
var client_1 = require("@prisma/client");
// import { AppModule } from 'server/src/app.module';
// import { CompanyService } from 'server/src/company/company.service';
// import { CreateCompanyDto } from 'server/src/company/dto/create-company.dto';
// import { InvitedUserService } from 'server/src/invited-user/invited-user.service';
// import { CreateMaterialDto } from 'server/src/material/dto/create-material.dto';
// import { MaterialService } from 'server/src/material/material.service';
// import { ProjectMaterialService } from 'server/src/project-material/project-material.service';
// import { CreateProjectDto } from 'server/src/project/dto/create-project.dto';
// import { ProjectService } from 'server/src/project/project.service';
// import { CreateUserDto } from 'server/src/user/dto/create-user.dto';
// import { UserService } from 'server/src/user/user.service';
var prisma = new client_1.PrismaClient();
function project() {
    return __awaiter(this, void 0, void 0, function () {
        var companyList, i;
        return __generator(this, function (_a) {
            companyList = [];
            for (i = 0; i < 12; i++) {
                companyList.push({
                    projectName: faker_1.faker.company.name(),
                    workByhour: Number(faker_1.faker.finance.amount(5, 10, 0))
                });
            }
            return [2 /*return*/, companyList];
        });
    });
}
function user() {
    return __awaiter(this, void 0, void 0, function () {
        var userList, i;
        return __generator(this, function (_a) {
            userList = [];
            for (i = 0; i < 12; i++) {
                userList.push({
                    email: faker_1.faker.internet.email(),
                    userType: 'CompanyAdmin',
                    avatar: faker_1.faker.name.jobTitle(),
                    name: faker_1.faker.company.name()
                });
            }
            return [2 /*return*/, userList];
        });
    });
}
function materials() {
    return __awaiter(this, void 0, void 0, function () {
        var materialList, i;
        return __generator(this, function (_a) {
            materialList = [];
            for (i = 0; i < 60; i++) {
                materialList.push({
                    priceUnit: 'dkk',
                    unit: 'area',
                    workByhour: Number(faker_1.faker.finance.amount(5, 10, 0)),
                    image: 'image- ' + faker_1.faker.address.cityName(),
                    materialName: faker_1.faker.animal.fish(),
                    price: Number(faker_1.faker.finance.amount(5, 10, 0)),
                    supplier: faker_1.faker.address.cityName()
                });
            }
            return [2 /*return*/, materialList];
        });
    });
}
// async function project() {
//   const projectList = [];
//   for (let i = 0; i < 30; i++) {
//     projectList.push({
//       projectName: faker.name.jobArea(),
//     });
//   }
//   return projectList;
// }
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var i, _a, _b;
        var _c, _d, _e, _f, _g;
        return __generator(this, function (_h) {
            switch (_h.label) {
                case 0: 
                // const app = await NestFactory.create(AppModule);
                // const companyService = app.get<CompanyService>(CompanyService);
                // const userService = app.get<UserService>(UserService);
                // const materialService = app.get<MaterialService>(MaterialService);
                // const projectService = app.get<ProjectService>(ProjectService);
                // const projectMaterialService = app.get<ProjectMaterialService>(
                //   ProjectMaterialService,
                // );
                // const invitedUserService = app.get<InvitedUserService>(InvitedUserService);
                return [4 /*yield*/, prisma.invitedUser.deleteMany()];
                case 1:
                    // const app = await NestFactory.create(AppModule);
                    // const companyService = app.get<CompanyService>(CompanyService);
                    // const userService = app.get<UserService>(UserService);
                    // const materialService = app.get<MaterialService>(MaterialService);
                    // const projectService = app.get<ProjectService>(ProjectService);
                    // const projectMaterialService = app.get<ProjectMaterialService>(
                    //   ProjectMaterialService,
                    // );
                    // const invitedUserService = app.get<InvitedUserService>(InvitedUserService);
                    _h.sent();
                    return [4 /*yield*/, prisma.projecMaterial.deleteMany()];
                case 2:
                    _h.sent();
                    return [4 /*yield*/, prisma.material.deleteMany()];
                case 3:
                    _h.sent();
                    return [4 /*yield*/, prisma.project.deleteMany()];
                case 4:
                    _h.sent();
                    return [4 /*yield*/, prisma.user.deleteMany()];
                case 5:
                    _h.sent();
                    return [4 /*yield*/, prisma.company.deleteMany()];
                case 6:
                    _h.sent();
                    i = 0;
                    _h.label = 7;
                case 7:
                    if (!(i < 10)) return [3 /*break*/, 13];
                    _b = (_a = prisma.company).create;
                    _c = {};
                    _d = {
                        country: faker_1.faker.address.country(),
                        logo: faker_1.faker.name.jobTitle(),
                        name: faker_1.faker.company.name()
                    };
                    _e = {};
                    return [4 /*yield*/, user()];
                case 8:
                    _d.User = (_e.create = _h.sent(),
                        _e);
                    _f = {};
                    return [4 /*yield*/, materials()];
                case 9:
                    _d.Material = (_f.create = _h.sent(),
                        _f);
                    _g = {};
                    return [4 /*yield*/, project()];
                case 10: return [4 /*yield*/, _b.apply(_a, [(_c.data = (_d.Project = (_g.create = _h.sent(),
                            _g),
                            _d),
                            _c)])];
                case 11:
                    _h.sent();
                    _h.label = 12;
                case 12:
                    i++;
                    return [3 /*break*/, 7];
                case 13: return [2 /*return*/];
            }
        });
    });
}
main()
    .then(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prisma.$disconnect()];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); })["catch"](function (e) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.error(e);
                return [4 /*yield*/, prisma.$disconnect()];
            case 1:
                _a.sent();
                process.exit(1);
                return [2 /*return*/];
        }
    });
}); });
