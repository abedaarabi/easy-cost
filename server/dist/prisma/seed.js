"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const faker_1 = require("@faker-js/faker");
const client_1 = require("@prisma/client");
const uuid_1 = require("uuid");
const prisma = new client_1.PrismaClient();
async function project() {
    const companyList = [];
    for (let i = 0; i < 5; i++) {
        companyList.push({
            id: (0, uuid_1.v4)(),
            projectName: faker_1.faker.company.name(),
            workByhour: Number(faker_1.faker.finance.amount(5, 10, 0)),
        });
    }
    return companyList;
}
async function users() {
    const userList = [];
    for (let i = 0; i < 4; i++) {
        userList.push({
            email: faker_1.faker.internet.email(),
            userType: 'CompanyAdmin',
            avatar: faker_1.faker.name.jobTitle(),
            name: faker_1.faker.company.name(),
        });
    }
    return userList;
}
async function materials() {
    const materialList = [];
    for (let i = 0; i < 50; i++) {
        materialList.push({
            id: (0, uuid_1.v4)(),
            priceUnit: 'dkk',
            unit: 'area',
            workByhour: Number(faker_1.faker.finance.amount(5, 10, 0)),
            image: 'image- ' + faker_1.faker.address.cityName(),
            materialName: faker_1.faker.animal.fish(),
            price: Number(faker_1.faker.finance.amount(5, 10, 0)),
            supplier: faker_1.faker.address.cityName(),
        });
    }
    return materialList;
}
async function main() {
    await prisma.invitedUser.deleteMany();
    await prisma.projecMaterial.deleteMany();
    await prisma.material.deleteMany();
    await prisma.project.deleteMany();
    await prisma.user.deleteMany();
    await prisma.company.deleteMany();
}
main()
    .then(async () => {
    await prisma.$disconnect();
})
    .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
});
//# sourceMappingURL=seed.js.map