import { NestFactory } from '@nestjs/core';
import { ReservationsModule } from './reservations.module';
import { ValidationPipe } from '@nestjs/common';
import { Logger } from 'nestjs-pino';

async function bootstrap() {
  const app = await NestFactory.create(ReservationsModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalPipes(app.get(Logger));
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
