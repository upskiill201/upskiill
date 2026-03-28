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

  // Bind to Render.com's dynamic port variable and open all proxy interfaces
  await app.listen(process.env.PORT || 3001, '0.0.0.0');
}
bootstrap();
