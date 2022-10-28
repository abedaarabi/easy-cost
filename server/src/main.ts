import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { CompanyService } from './company/company.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // const companyService = app.get<CompanyService>(CompanyService);

  app.useGlobalPipes(new ValidationPipe());
  const config = new DocumentBuilder()
    .setTitle('Esay Cost')
    .setDescription('Easy Cost API description')
    .setVersion('1.0')
    .addTag('Easy Cost')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}
bootstrap();
