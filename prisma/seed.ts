import { faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
async function main() {
  await prisma.user.deleteMany();
  await prisma.material.deleteMany();
  await prisma.project.deleteMany();

  for (let i = 0; i < 100; i++) {
    await prisma.user.create({
      data: {
        name: faker.company.name(),
        materialName: {
          create: {
            materialName: faker.animal.fish(),
            price: Number(faker.finance.amount(5, 10, 0)),
            supplier: faker.address.cityName(),
          },
        },
        projectName: {
          create: {
            projectName: faker.name.jobArea(),
          },
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
