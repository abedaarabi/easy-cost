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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MaterialService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let MaterialService = class MaterialService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    create(createMaterialDto) {
        return this.prisma.material.create({ data: createMaterialDto });
    }
    findAll() {
        return this.prisma.material.findMany();
    }
    findMaterialByCompanyId(companyId) {
        try {
            const list = this.prisma.material.findMany({
                where: {
                    companyId,
                },
            });
            return list;
        }
        catch (error) {
            throw new Error('not found');
        }
    }
    findOne(id) {
        return this.prisma.material.findUnique({ where: { id } });
    }
    update(id, updateMaterialDto) {
        return this.prisma.material.update({
            where: {
                id,
            },
            data: updateMaterialDto,
        });
    }
    remove(id) {
        console.log(id);
        return this.prisma.material.delete({ where: { id } });
    }
};
MaterialService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], MaterialService);
exports.MaterialService = MaterialService;
//# sourceMappingURL=material.service.js.map