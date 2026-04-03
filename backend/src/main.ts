import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());

  // Allow Vercel (any subdomain) and localhost (any port) — blocks everything else
  const allowedOrigins: RegExp[] = [
    /^https:\/\/.*\.vercel\.app$/,
    /^http:\/\/localhost:\d+$/,
  ];

  app.enableCors({
    origin: (
      origin: string | undefined,
      callback: (err: Error | null, allow?: boolean) => void,
    ) => {
      if (!origin) {
        callback(null, true);
        return;
      }
      const allowed = allowedOrigins.some((pattern) => pattern.test(origin));
      callback(allowed ? null : new Error(`CORS blocked: ${origin}`), allowed);
    },
    credentials: true,
  });

  // Validate and strip unknown fields from incoming request bodies
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  // Render.com sets PORT dynamically; fallback to 3001 for local dev
  await app.listen(process.env.PORT ?? 3001, '0.0.0.0');
}

void bootstrap();
