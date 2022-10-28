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
exports.ProjectMaterialController = void 0;
const common_1 = require("@nestjs/common");
const project_material_service_1 = require("./project-material.service");
const create_project_material_dto_1 = require("./dto/create-project-material.dto");
const update_project_material_dto_1 = require("./dto/update-project-material.dto");
const swagger_1 = require("@nestjs/swagger");
let ProjectMaterialController = class ProjectMaterialController {
    constructor(projectMaterialService) {
        this.projectMaterialService = projectMaterialService;
    }
    create(createProjectMaterialDto) {
        return this.projectMaterialService.create(createProjectMaterialDto);
    }
    findAll() {
        return this.projectMaterialService.findAll();
    }
    findOne(id) {
        return this.projectMaterialService.findOne(id);
    }
    update(id, updateProjectMaterialDto) {
        return this.projectMaterialService.update(id, updateProjectMaterialDto);
    }
    remove(id) {
        return this.projectMaterialService.remove(id);
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_project_material_dto_1.CreateProjectMaterialDto]),
    __metadata("design:returntype", void 0)
], ProjectMaterialController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ProjectMaterialController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProjectMaterialController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_project_material_dto_1.UpdateProjectMaterialDto]),
    __metadata("design:returntype", void 0)
], ProjectMaterialController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProjectMaterialController.prototype, "remove", null);
ProjectMaterialController = __decorate([
    (0, common_1.Controller)('project-material'),
    (0, swagger_1.ApiTags)('project-material'),
    __metadata("design:paramtypes", [project_material_service_1.ProjectMaterialService])
], ProjectMaterialController);
exports.ProjectMaterialController = ProjectMaterialController;
//# sourceMappingURL=project-material.controller.js.map