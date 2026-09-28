/* eslint-disable @typescript-eslint/no-explicit-any -- dev script printing untyped lesson JSON */
/**
 * Live check for rich lesson generation: takes real transcripts from the
 * database, asks the course-import AI provider for a rich lesson, and prints
 * what came out (cards, exercise kinds, anything dropped) — WITHOUT writing
 * lessons or courses. Only the normal AI usage record is written.
 *
 * Needs EARNINGS_ENC_KEY in .env (the same key the deployed backend uses) to
 * decrypt the provider's API key.
 *
 * Run: npx ts-node --transpile-only scripts/import-lesson-check.ts [count=2] [Coding|AI|-] [model]
 *   model: try another model on the SAME provider for this run only (e.g.
 *   openai/gpt-oss-120b). Nothing saved; the provider settings stay as they are.
 */

import './load-env';
import { PrismaClient } from '@prisma/client';
import { AiConfigService } from '../src/tey/ai/ai-config.service';
import { AiBudgetService } from '../src/tey/ai/ai-budget.service';
import { LessonContentGenerationService } from '../src/course-import/lesson-content-generation.service';

/** One connection: the pooler is shared with the app. */
function singleConnectionUrl(): string | undefined {
  const url = process.env.DATABASE_URL;
  if (!url) return undefined;
  return url.includes('connection_limit=') ? url.replace(/connection_limit=\d+/, 'connection_limit=1') : `${url}${url.includes('?') ? '&' : '?'}connection_limit=1`;
}

async function main() {
  const count = Math.max(1, Number(process.argv[2]) || 2);
  const track = process.argv[3] === 'Coding' || process.argv[3] === 'AI' ? process.argv[3] : null;
  const prisma = new PrismaClient({ datasources: { db: { url: singleConnectionUrl() } } });
  const modelOverride = process.argv[4];
  const aiConfig = new AiConfigService(prisma as never);
  if (modelOverride) {
    const original = aiConfig.resolveForCourseImport.bind(aiConfig);
    aiConfig.resolveForCourseImport = async () => {
      const r = await original();
      if (r) (r.provider as unknown as { model: string }).model = modelOverride;
      return r;
    };
    console.log(`Model for this run only: ${modelOverride}`);
  }
  const service = new LessonContentGenerationService(aiConfig, new AiBudgetService(prisma as never));

  const files = await prisma.courseImportFile.findMany({
    where: { transcript: { not: null }, category: 'video' },
    orderBy: { createdAt: 'desc' },
    take: count,
    select: { driveFileName: true, transcript: true, durationMs: true, storageUrl: true, import: { select: { sourceDriveFolderName: true } } },
  });
  if (files.length === 0) {
    console.log('No transcribed videos in the database to test with.');
    return prisma.$disconnect();
  }

  let ok = 0;
  for (const [i, f] of files.entries()) {
    // Same pacing as the import job: one lesson a minute fits Groq's free tier.
    if (i > 0) await new Promise((r) => setTimeout(r, 62_000));
    const started = Date.now();
    const title = f.driveFileName.trim().replace(/\.[a-z0-9]+$/i, '');
    try {
      const r = await service.generate({
        courseTitle: f.import.sourceDriveFolderName.trim(),
        lessonTitle: title,
        videoUrl: f.storageUrl ?? 'https://example.com/video.mp4',
        transcript: f.transcript,
        resourceNames: [],
        track,
        videoDurationSec: f.durationMs ? Number(f.durationMs) / 1000 : null,
      });
      ok++;
      const items = (r.applyBlocks[0] as { value: { items: Record<string, any>[] } }).value.items;
      console.log(`\n✔ ${title}  (${((Date.now() - started) / 1000).toFixed(1)}s)`);
      console.log(`  summary: ${r.description}`);
      console.log(`  learn:   ${r.stats.classicLearn ? 'classic layout (long/unknown video)' : `${r.stats.learnCards} cards`}`);
      console.log(`  apply:   ${r.stats.exercises} exercises — ${r.stats.kinds.join(', ')}`);
      items.forEach((e, i) => {
        const answer =
          e.kind === 'mcq'
            ? `✓ ${e.options.find((o: any) => o.id === e.correctOptionId)?.text}`
            : e.kind === 'fillBlank'
              ? `${e.template} → ${e.blanks.map((b: any) => b.answers[0]).join(', ')}`
              : e.kind === 'findBug'
                ? `✗ ${e.lines[e.bugLine]}`
                : e.kind === 'orderLines'
                  ? e.lines.join(' → ')
                  : e.pairs.map((p: any) => `${p.left}=${p.right}`).join('; ');
        console.log(`    ${i + 1}. [${e.kind}] ${e.prompt}
       ${answer}`);
      });
      if (r.stats.dropped.length) console.log(`  dropped: ${r.stats.dropped.join(' | ')}`);
    } catch (err) {
      console.log(`\n✘ ${title}  (${((Date.now() - started) / 1000).toFixed(1)}s): ${(err as Error).message}`);
    }
  }
  console.log(`\n${ok}/${files.length} lessons generated.`);
  await prisma.$disconnect();
}

void main();
