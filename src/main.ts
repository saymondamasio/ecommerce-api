import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import rawBodyMiddleware from './payments/middlewares/raw-body.middleware';

// const whitelist = ['example.com', 'api.example.com'];

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.enableCors({
    origin: configService.get('APP_WEB_URL'),
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });
  // app.enableCors({
  //   origin: function (origin, callback) {
  //     if (!origin || whitelist.indexOf(origin) !== -1) {
  //       callback(null, true);
  //     } else {
  //       callback(new Error('Not allowed by CORS'));
  //     }
  //   },
  // });
  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());
  const config = new DocumentBuilder()
    .setTitle('Ecommerce')
    .setDescription('Uma API para ecommerce')
    .setVersion('1.0')
    .addTag('ecommerce')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.use(rawBodyMiddleware());

  await app.listen(configService.get('PORT') || 3333);
  console.log(`🚀🚀 Application is running on: ${await app.getUrl()}`);
}
bootstrap();
