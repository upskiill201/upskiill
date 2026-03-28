import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Enable CORS dynamically to support both localhost dev and Vercel prod preview links
  app.enableCors({
    origin: true,
    credentials: true,
  });

  // Enable Validation Pipes to parse and scrub incoming DTO JSON streams
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
  }));

  await app.listen(3001);
}
bootstrap();
