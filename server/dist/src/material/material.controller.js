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
exports.MaterialController = void 0;
const common_1 = require("@nestjs/common");
const material_service_1 = require("./material.service");
const create_material_dto_1 = require("./dto/create-material.dto");
const update_material_dto_1 = require("./dto/update-material.dto");
const swagger_1 = require("@nestjs/swagger");
const material_entity_1 = require("./entities/material.entity");
function delay(ms) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, ms);
    });
}
let MaterialController = class MaterialController {
    constructor(materialService) {
        this.materialService = materialService;
    }
    create(createMaterialDto) {
        console.log(createMaterialDto);
        return this.materialService.create(createMaterialDto);
    }
    findAll() {
        return this.materialService.findAll();
    }
    findOne(id) {
        return this.materialService.findOne(id);
    }
    async findMaterialByCompanyId(companyId) {
        return this.materialService.findMaterialByCompanyId(companyId);
    }
    update(id, updateMaterialDto) {
        return this.materialService.update(id, updateMaterialDto);
    }
    remove(id) {
        return this.materialService.remove(id);
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_material_dto_1.CreateMaterialDto]),
    __metadata("design:returntype", void 0)
], MaterialController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOkResponse)({
        description: 'The record has been successfully created.',
        type: material_entity_1.MaterialEntity,
        isArray: true,
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], MaterialController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOkResponse)({
        description: 'The record has been successfully created.',
        type: material_entity_1.MaterialEntity,
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MaterialController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)('materialByCompany/:companyId'),
    (0, swagger_1.ApiOkResponse)({
        description: 'The record has been successfully created.',
        type: material_entity_1.MaterialEntity,
        isArray: true,
    }),
    __param(0, (0, common_1.Param)('companyId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MaterialController.prototype, "findMaterialByCompanyId", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOkResponse)({
        description: 'The record has been successfully created.',
        type: material_entity_1.MaterialEntity,
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_material_dto_1.UpdateMaterialDto]),
    __metadata("design:returntype", void 0)
], MaterialController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiOkResponse)({
        description: 'The record has been successfully created.',
        type: material_entity_1.MaterialEntity,
    }),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MaterialController.prototype, "remove", null);
MaterialController = __decorate([
    (0, common_1.Controller)('material'),
    (0, swagger_1.ApiTags)('Material'),
    __metadata("design:paramtypes", [material_service_1.MaterialService])
], MaterialController);
exports.MaterialController = MaterialController;
//# sourceMappingURL=material.controller.js.map