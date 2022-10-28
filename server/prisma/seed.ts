import { faker } from '@faker-js/faker';
import { NestFactory } from '@nestjs/core';
import { PrismaClient } from '@prisma/client';
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
const prisma = new PrismaClient();

async function project() {
  const companyList = [];
  for (let i = 0; i < 12; i++) {
    companyList.push({
      projectName: faker.company.name(),
      workByhour: Number(faker.finance.amount(5, 10, 0)),
    });
  }
  return companyList;
}
async function user() {
  const userList = [];
  for (let i = 0; i < 12; i++) {
    userList.push({
      email: faker.internet.email(),
      userType: 'CompanyAdmin',
      avatar: faker.name.jobTitle(),
      name: faker.company.name(),
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
      workByhour: Number(faker.finance.amount(5, 10, 0)),
      image: 'image- ' + faker.address.cityName(),
      materialName: faker.animal.fish(),
      price: Number(faker.finance.amount(5, 10, 0)),
      supplier: faker.address.cityName(),
    });
  }
  return materialList;
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

async function main() {
  // const app = await NestFactory.create(AppModule);
  // const companyService = app.get<CompanyService>(CompanyService);
  // const userService = app.get<UserService>(UserService);
  // const materialService = app.get<MaterialService>(MaterialService);
  // const projectService = app.get<ProjectService>(ProjectService);
  // const projectMaterialService = app.get<ProjectMaterialService>(
  //   ProjectMaterialService,
  // );
  // const invitedUserService = app.get<InvitedUserService>(InvitedUserService);
  await prisma.invitedUser.deleteMany();
  await prisma.projecMaterial.deleteMany();
  await prisma.material.deleteMany();
  await prisma.project.deleteMany();
  await prisma.user.deleteMany();
  await prisma.company.deleteMany();

  for (let i = 0; i < 10; i++) {
    await prisma.company.create({
      data: {
        country: faker.address.country(),
        logo: faker.name.jobTitle(),
        name: faker.company.name(),
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
