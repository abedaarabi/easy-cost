import { faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';
import { AnySrvRecord } from 'dns';

async function materials() {
  const materialList = [];
  for (let i = 0; i < 60; i++) {
    materialList.push({
      materialName: faker.animal.fish(),
      price: Number(faker.finance.amount(5, 10, 0)),
      supplier: faker.address.cityName(),
    });
  }
  return materialList;
}
async function project() {
  const projectList = [];
  for (let i = 0; i < 30; i++) {
    projectList.push({
      projectName: faker.name.jobArea(),
    });
  }
  return projectList;
}

const prisma = new PrismaClient();
async function main() {
  await prisma.user.deleteMany();
  await prisma.company.deleteMany();
  await prisma.material.deleteMany();
  await prisma.project.deleteMany();
  return;
  // for (let i = 0; i < 100; i++) {
  //   await prisma.user.create({
  //     data: {
  //       name: faker.company.name(),
  //       materialName: {
  //         create: await materials(),
  //       },
  //       projectName: {
  //         create: await project(),
  //       },
  //     },
  //   });
  // }
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
