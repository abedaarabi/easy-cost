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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvitedUserController = void 0;
const common_1 = require("@nestjs/common");
const invited_user_service_1 = require("./invited-user.service");
const create_invited_user_dto_1 = require("./dto/create-invited-user.dto");
const update_invited_user_dto_1 = require("./dto/update-invited-user.dto");
const swagger_1 = require("@nestjs/swagger");
let InvitedUserController = class InvitedUserController {
    constructor(invitedUserService) {
        this.invitedUserService = invitedUserService;
    }
    create(createInvitedUserDto) {
        return this.invitedUserService.create(createInvitedUserDto);
    }
    findAll() {
        return this.invitedUserService.findAll();
    }
    findOne(id) {
        return this.invitedUserService.findOne(id);
    }
    update(id, updateInvitedUserDto) {
        return this.invitedUserService.update(id, updateInvitedUserDto);
    }
    remove(id) {
        return this.invitedUserService.remove(id);
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_invited_user_dto_1.CreateInvitedUserDto]),
    __metadata("design:returntype", void 0)
], InvitedUserController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], InvitedUserController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], InvitedUserController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_invited_user_dto_1.UpdateInvitedUserDto]),
    __metadata("design:returntype", void 0)
], InvitedUserController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], InvitedUserController.prototype, "remove", null);
InvitedUserController = __decorate([
    (0, common_1.Controller)('invited-user'),
    (0, swagger_1.ApiTags)('invited-user'),
    __metadata("design:paramtypes", [invited_user_service_1.InvitedUserService])
], InvitedUserController);
exports.InvitedUserController = InvitedUserController;
//# sourceMappingURL=invited-user.controller.js.map