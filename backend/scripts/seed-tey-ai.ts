/**
 * Seeds the default AI provider (Gemini free tier).
 *
 *   GEMINI_API_KEY=... npx ts-node scripts/seed-tey-ai.ts
 *
 * Upsert-only and refuses to run in production, per CLAUDE.md section 7.
 * Seeded INACTIVE: an operator switches it on from /admin once they have
 * tested the connection, so a seed run can never start spending money.
 */
import { PrismaClient } from '@prisma/client';
import { encryptJson } from '../src/earnings/crypto.util';

const prisma = new PrismaClient();

async function main() {
  if (process.env.NODE_ENV === 'production') {
    throw new Error('Refusing to seed in production.');
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error(
      'GEMINI_API_KEY is required. Get a free key at https://aistudio.google.com/apikey',
    );
  }

  const { encryptedData, keyVersion } = encryptJson({ apiKey });

  const row = await prisma.teyAiProviderConfig.upsert({
    where: { name: 'gemini-default' },
    create: {
      name: 'gemini-default',
      kind: 'GEMINI',
      // gemini-2.0-flash was retired — Google's own 404 for it points here.
      // The `update` branch below deliberately never touches this field, so
      // re-running this script on an existing row won't clobber a model an
      // admin has since corrected from /admin.
      model: 'gemini-3.6-flash',
      encryptedApiKey: encryptedData,
      keyVersion,
      keyTail: apiKey.slice(-4),
      // Off by default. Enable from /admin after testing the connection.
      isActive: false,
      isFallback: false,
      maxOutputTokens: 400,
      temperature: 0.8,
      timeoutMs: 8000,
      // Free tier — zero cost, so budget checks pass on volume rather than spend.
      inputCostPer1k: 0,
      outputCostPer1k: 0,
      dailyBudgetUsd: 1.0,
    },
    update: {
      encryptedApiKey: encryptedData,
      keyVersion,
      keyTail: apiKey.slice(-4),
    },
  });

  console.log(`Seeded provider "${row.name}" (${row.model}), active=${row.isActive}`);
  console.log('Enable it at /admin once the connection test passes.');
}

main()
  .catch((err) => {
    console.error(err.message);
    process.exit(1);
  })
  .finally(() => void prisma.$disconnect());
