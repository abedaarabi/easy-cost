"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const faker_1 = require("@faker-js/faker");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function project() {
    const companyList = [];
    for (let i = 0; i < 12; i++) {
        companyList.push({
            projectName: faker_1.faker.company.name(),
            workByhour: Number(faker_1.faker.finance.amount(5, 10, 0)),
        });
    }
    return companyList;
}
async function user() {
    const userList = [];
    for (let i = 0; i < 12; i++) {
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
    for (let i = 0; i < 60; i++) {
        materialList.push({
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
    for (let i = 0; i < 10; i++) {
        await prisma.company.create({
            data: {
                country: faker_1.faker.address.country(),
                logo: faker_1.faker.name.jobTitle(),
                name: faker_1.faker.company.name(),
                User: {
                    create: await user(),
                },
                Material: {
                    create: await materials(),
                },
                Project: {
                    create: await project(),
                },
            },
        });
    }
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