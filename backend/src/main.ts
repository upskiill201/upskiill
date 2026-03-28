import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Enable CORS so the React Frontend running on localhost:3000 can communicate with us
  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true,
  });

  // Enable Validation Pipes to parse and scrub incoming DTO JSON streams
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
  }));

  await app.listen(4000);
}
bootstrap();
