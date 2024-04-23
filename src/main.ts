import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const doc = /*html*/`<h2> A backend service for Generate and share Ai Images. </h1>
  <ol>
    <li>Generate Image from Differnt model</li>
    <li>Save Image For your showcase</li>
    <li>Like, share and comment like a sociel media</li>
    <li>Create Yor Own group of image</li>
  </ol>
  <h3>Thise platfrom is poowerd by:-</h3>
  <ol class="tech">
    <li>Nest jS</li>
    <li>Prisma ORM</li>
    <li>Cloudinary</li>
    <li>MongoDB</li>
  </ol>
  `
  const config = new DocumentBuilder()
    .setTitle('Fusion AI server 2.0')
    .setDescription(doc)
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const app = await NestFactory.create(AppModule);
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
  await app.listen(3000);
}
bootstrap();
