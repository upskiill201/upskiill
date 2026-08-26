import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { rawBody: true });

  app.use(cookieParser());

  // ─── CORS ──────────────────────────────────────────────────────────────────
  // Allowed origins are set per environment via the ALLOWED_ORIGINS env var.
  // Staging:    ALLOWED_ORIGINS=https://teyro-git-staging.vercel.app,http://localhost:3000
  // Production: ALLOWED_ORIGINS=https://teyro.app
  // Local dev:  ALLOWED_ORIGINS is unset → falls back to localhost:3000
  //
  // Never use wildcard (*) — it bypasses credentials: 'include' on all clients.
  const rawOrigins = process.env.ALLOWED_ORIGINS ?? 'http://localhost:3000,http://localhost:3001';
  const allowedOrigins = rawOrigins
    .split(',')
    .map((o) => o.trim())
    .filter(Boolean);

  app.enableCors({
    origin: (
      origin: string | undefined,
      callback: (err: Error | null, allow?: boolean) => void,
    ) => {
      // Allow server-to-server calls (no origin header) and Render health checks
      if (!origin) {
        callback(null, true);
        return;
      }
      
      const isAllowedVercelPreview = origin.startsWith('https://upskiill') && origin.endsWith('.vercel.app');
      const allowed = allowedOrigins.includes(origin) || isAllowedVercelPreview;
      
      if (!allowed) {
        console.warn(`CORS blocked: ${origin}`);
      }
      callback(allowed ? null : new Error(`CORS blocked: ${origin}`), allowed);
    },
    credentials: true,
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
  });

  // ─── VALIDATION PIPE ───────────────────────────────────────────────────────
  // Strips unknown properties, throws on unexpected fields, auto-transforms types.
  // whitelist/forbidNonWhitelisted only affect class-validator DTOs — plain
  // `@Body('prop')` extractions and webhook raw bodies are untouched. All
  // student-journey payloads were swept against their DTOs before enabling
  // this (signup/login/firebase/reset/challenge-complete/checkout/OTP/
  // profile/community/lesson-builder); nested list entries carry client-side
  // `id`s, which the profile DTO now accepts explicitly.
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // ─── GLOBAL EXCEPTION FILTER ───────────────────────────────────────────────
  app.useGlobalFilters(new HttpExceptionFilter());

  // ─── HEALTH ENDPOINT ───────────────────────────────────────────────────────
  // Used by GitHub Actions to verify the backend came up cleanly after deploy.
  // GET /health → 200 OK { status: 'ok', environment: 'staging' | 'production' }
  app.getHttpAdapter().get('/health', (_req: unknown, res: { json: (body: object) => void }) => {
    res.json({
      status: 'ok',
      environment: process.env.ENVIRONMENT ?? 'development',
      timestamp: new Date().toISOString(),
    });
  });

  const port = process.env.PORT ?? 3001;
  await app.listen(port, '0.0.0.0');

  console.log(`[Bootstrap] Environment: ${process.env.ENVIRONMENT ?? 'development'}`);
  console.log(`[Bootstrap] Allowed CORS origins: ${allowedOrigins.join(', ')}`);
  console.log(`🚀 [Bootstrap] NestJS Backend is active and listening on http://localhost:${port}`);
}

void bootstrap();
