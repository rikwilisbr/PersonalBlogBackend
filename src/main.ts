import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({whitelist:true}));

  app.use(cookieParser());

  const ORIGIN_URL = process.env.ORIGIN_URL
  const ENV = process.env.ENV

  const corsOptions: CorsOptions = {
    origin: ENV === "PRODUCTION" ? ORIGIN_URL : "http://localhost:3000",
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
  };

  app.enableCors(corsOptions);
  
  await app.listen(5000);
}
bootstrap();
