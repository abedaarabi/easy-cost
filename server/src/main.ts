import * as fs from 'fs';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('Easy Cost')
    .setDescription('Easy Cost API description')
    .setVersion('1.0')
    // .addServer('http://localhost/api', 'sfdada', { port: { default: 3000 } })
    .addTag('Easy Cost')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  fs.writeFileSync('../swagger-spec.json', JSON.stringify(document));

  SwaggerModule.setup('api', app, document);

  app.enableCors();

  await app.listen(3000);
}
bootstrap();
