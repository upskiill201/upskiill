/**
 * Seeds the CodeCraft AI provider (https://codecraftapi.com) — a fully
 * OpenAI-compatible aggregator, so this rides the existing
 * OpenAiCompatibleAdapter unchanged. No new adapter, no schema change.
 *
 *   CODECRAFT_API_KEY=... [CODECRAFT_MODEL=...] npx ts-node scripts/seed-tey-ai-codecraft.ts
 *
 * Upsert-only and refuses to run in production, per CLAUDE.md section 7.
 * Seeded INACTIVE: an operator switches it on from /admin once they have
 * tested the connection, so a seed run can never start spending money.
 *
 * Env vars here are seed-time-only convenience — the key itself is encrypted
 * into TeyAiProviderConfig.encryptedApiKey and never read from env again at
 * runtime, matching every other provider (see seed-tey-ai.ts for Gemini).
 */
import { PrismaClient } from '@prisma/client';
import { encryptJson } from '../src/earnings/crypto.util';

const prisma = new PrismaClient();

const CODECRAFT_BASE_URL = 'https://codecraftapi.com/v1';
const DEFAULT_MODEL = 'claude-opus-4.8';

async function main() {
  if (process.env.NODE_ENV === 'production') {
    throw new Error('Refusing to seed in production.');
  }

  const apiKey = process.env.CODECRAFT_API_KEY;
  if (!apiKey) {
    throw new Error(
      'CODECRAFT_API_KEY is required. Get a key at https://codecraftapi.com/register',
    );
  }
  const model = process.env.CODECRAFT_MODEL || DEFAULT_MODEL;

  const { encryptedData, keyVersion } = encryptJson({ apiKey });

  const row = await prisma.teyAiProviderConfig.upsert({
    where: { name: 'codecraft-default' },
    create: {
      name: 'codecraft-default',
      kind: 'OPENAI_COMPATIBLE',
      baseUrl: CODECRAFT_BASE_URL,
      model,
      encryptedApiKey: encryptedData,
      keyVersion,
      keyTail: apiKey.slice(-4),
      // Off by default. Enable from /admin after testing the connection.
      isActive: false,
      isFallback: false,
      maxOutputTokens: 400,
      temperature: 0.8,
      timeoutMs: 8000,
      // Unknown real pricing until confirmed — left at 0 rather than guessed,
      // so cost reporting doesn't silently mislead. Update from /admin once
      // CodeCraft's actual per-model rate is known.
      inputCostPer1k: 0,
      outputCostPer1k: 0,
      dailyBudgetUsd: 1.0,
    },
    update: {
      baseUrl: CODECRAFT_BASE_URL,
      model,
      encryptedApiKey: encryptedData,
      keyVersion,
      keyTail: apiKey.slice(-4),
    },
  });

  console.log(
    `Seeded provider "${row.name}" (${row.model}), active=${row.isActive}`,
  );
  console.log('Enable it at /admin once the connection test passes.');
}

main()
  .catch((err) => {
    console.error(err.message);
    process.exit(1);
  })
  .finally(() => void prisma.$disconnect());
