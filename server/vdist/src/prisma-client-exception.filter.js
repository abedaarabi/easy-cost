"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaClientExceptionFilter = void 0;
const common_1 = require("../node_modules/@nestjs/common");
const core_1 = require("../node_modules/@nestjs/core");
const client_1 = require("../node_modules/@prisma/client/index.js");
let PrismaClientExceptionFilter = class PrismaClientExceptionFilter extends core_1.BaseExceptionFilter {
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const message = exception.message.replace(/\n/g, '');
        switch (exception.code) {
            case 'P2002':
                const status = common_1.HttpStatus.CONFLICT;
                response.status(status).json({
                    statusCode: status,
                    message: message,
                });
                break;
            case 'P2003':
                const statusP2003 = common_1.HttpStatus.CONFLICT;
                response.status(statusP2003).json({
                    statusCode: statusP2003,
                    message: message,
                });
                break;
            default:
                super.catch(exception, host);
                break;
        }
    }
};
PrismaClientExceptionFilter = __decorate([
    (0, common_1.Catch)(client_1.Prisma.PrismaClientKnownRequestError)
], PrismaClientExceptionFilter);
exports.PrismaClientExceptionFilter = PrismaClientExceptionFilter;
//# sourceMappingURL=prisma-client-exception.filter.js.map