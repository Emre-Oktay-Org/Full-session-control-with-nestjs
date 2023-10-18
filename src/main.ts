import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ValidationPipe } from '@nestjs/common';
import * as session from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(
    session({
      secret: 'my-secret',
      resave: false,
      saveUninitialized: false,
      cookie: { maxAge: 60 * 60 * 1000, httpOnly: false, secure: false }
    }))
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
