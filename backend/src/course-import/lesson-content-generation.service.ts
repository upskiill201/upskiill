import { Injectable, Logger } from '@nestjs/common';
import { z } from 'zod';
import { AiConfigService } from '../tey/ai/ai-config.service';
import { AiBudgetService } from '../tey/ai/ai-budget.service';
import { parseStructured } from '../tey/ai/structured-output';
import { CourseImportError } from './course-import-error';
import {
  buildRichLesson,
  RICH_LESSON_JSON_SCHEMA,
  RichLessonError,
  richSystemPrompt,
  type ImportTrack,
  type LessonImage,
  type LessonMedia,
  type RichBuildResult,
} from './rich-lesson';

/**
 * Sized for a small free-tier provider (Groq gpt-oss-20b in JSON mode):
 * transcript + prompt + output must stay inside its per-request/per-minute
 * token window (8k tokens a minute on the free tier, counted as prompt +
 * max output). ~10.5k characters of speech is ~2.7k tokens (the whole of a
 * typical 5-15 minute lesson), the instructions ~1.3k, and 3.8k of output
 * fits a full rich lesson (cards + 8 exercises): ~7.8k in total.
 */
const DEFAULT_MAX_TRANSCRIPT_CHARS = 10_500;
/** Raise COURSE_IMPORT_MAX_TRANSCRIPT_CHARS (and the provider's limits)
 *  when generation moves to a paid tier with a bigger window. */
const MAX_TRANSCRIPT_CHARS = (() => {
  const n = Number(process.env.COURSE_IMPORT_MAX_TRANSCRIPT_CHARS);
  return Number.isFinite(n) && n >= 2_000
    ? Math.floor(n)
    : DEFAULT_MAX_TRANSCRIPT_CHARS;
})();
const GENERATION_TIMEOUT_MS = 90_000;
const MAX_OUTPUT_TOKENS = 3_800;
/** One retry on a weak or malformed answer: cheaper than a failed lesson. */
const CONTENT_ATTEMPTS = 2;

export interface LessonGenerationInput {
  courseTitle: string;
  lessonTitle: string;
  videoUrl: string;
  transcript: string | null;
  resourceNames: string[];
  /** Coding / AI shape the exercise kinds; null for anything else. */
  track?: ImportTrack;
  /** From Google Drive's metadata; decides video card vs classic Learn. */
  videoDurationSec?: number | null;
  /** Audio lesson or reading lesson instead of a video lesson. */
  mediaKind?: 'video' | 'audio' | 'none';
  /** One part of a long file: plays [startSec, endSec), and `transcript`
   *  is already that part's slice. */
  part?: { index: number; count: number; startSec: number; endSec: number };
  /** Images handed out with the lesson, shown as Learn image cards. */
  images?: LessonImage[];
}

@Injectable()
export class LessonContentGenerationService {
  private readonly logger = new Logger(LessonContentGenerationService.name);

  constructor(
    private readonly aiConfig: AiConfigService,
    private readonly budget: AiBudgetService,
  ) {}

  async generate(input: LessonGenerationInput): Promise<RichBuildResult> {
    if (!input.transcript || input.transcript.trim().length < 20) {
      throw new CourseImportError(
        'NO_TRANSCRIPT',
        'No usable transcript for this lesson yet — refusing to generate content without a source to ground it in.',
      );
    }

    // Before anything else touches the provider: a spent budget means no call.
    await this.assertBudget();

    // Not aiConfig.resolve() — that primary/fallback pair is shared with the
    // live Tey nudge system. See resolveForCourseImport()'s doc comment.
    const resolved = await this.aiConfig.resolveForCourseImport();
    if (!resolved) {
      throw new CourseImportError(
        'PROVIDER_NOT_CONFIGURED',
        'No active AI provider configured for course import — set one up under Automation → AI providers.',
      );
    }

    if (input.transcript.length > MAX_TRANSCRIPT_CHARS) {
      this.logger.warn(
        `Transcript for "${input.lessonTitle}" is ${input.transcript.length} chars — using the first ${MAX_TRANSCRIPT_CHARS}.`,
      );
    }

    const track = input.track ?? null;
    const mediaKind = input.mediaKind ?? 'video';
    const system = richSystemPrompt(
      track,
      mediaKind === 'none' ? 'document' : mediaKind,
    );
    const media: LessonMedia = {
      kind: mediaKind,
      url: input.videoUrl,
      durationSec: input.part
        ? input.part.endSec - input.part.startSec
        : (input.videoDurationSec ?? null),
      ...(input.part
        ? { startSec: input.part.startSec, endSec: input.part.endSec }
        : {}),
    };
    const user = buildUserPrompt(input);
    const isReasoningModel = /gpt-oss|^o\d/i.test(resolved.provider.model);
    let lastProblem = 'unknown';

    for (let attempt = 1; attempt <= CONTENT_ATTEMPTS; attempt++) {
      // The retry is a second paid call: it must fit the budget too.
      if (attempt > 1) await this.assertBudget();

      let result: Awaited<ReturnType<typeof resolved.provider.complete>>;
      try {
        result = await resolved.provider.complete({
          system,
          messages: [
            { role: 'user', content: user },
            ...(attempt > 1
              ? [
                  {
                    role: 'user' as const,
                    content: `Your previous answer couldn't be used: ${lastProblem}. Return the full JSON object again, following every rule.`,
                  },
                ]
              : []),
          ],
          maxOutputTokens: MAX_OUTPUT_TOKENS,
          temperature: 0.4,
          timeoutMs: GENERATION_TIMEOUT_MS,
          jsonSchema: RICH_LESSON_JSON_SCHEMA as unknown as Record<
            string,
            unknown
          >,
          ...(isReasoningModel ? { reasoningEffort: 'low' as const } : {}),
        });
      } catch (err) {
        // Groq's JSON mode rejects malformed output itself (400
        // json_validate_failed) — that's a bad answer, not a bad request:
        // retry like any other unusable reply.
        if (
          !(err instanceof Error) ||
          !err.message.includes('json_validate_failed')
        )
          throw err;
        lastProblem = 'it was not valid JSON (the provider rejected it)';
        this.logger.warn(
          `Lesson "${input.lessonTitle}" attempt ${attempt}: ${lastProblem}.`,
        );
        continue;
      }

      await this.budget.record(
        resolved.providerId,
        'COURSE_IMPORT',
        result.usage,
        {
          inputCostPer1k: resolved.inputCostPer1k,
          outputCostPer1k: resolved.outputCostPer1k,
        },
      );

      const parsed = parseStructured(
        result.text,
        z.record(z.string(), z.unknown()),
      );
      if (!parsed.ok) {
        lastProblem = `it was not a JSON object (${parsed.reason})`;
        this.logger.warn(
          `Lesson "${input.lessonTitle}" attempt ${attempt}: ${lastProblem}. Raw: ${(result.text ?? '').slice(0, 600)}`,
        );
        continue;
      }
      try {
        const built = buildRichLesson(
          parsed.value,
          media,
          track,
          input.images ?? [],
        );
        if (built.stats.dropped.length) {
          this.logger.log(
            `Lesson "${input.lessonTitle}": kept ${built.stats.exercises} exercises (${built.stats.kinds.join(', ')}), dropped ${built.stats.dropped.length}: ${built.stats.dropped.join('; ')}`,
          );
        }
        return built;
      } catch (err) {
        if (!(err instanceof RichLessonError)) throw err;
        lastProblem = err.message;
        this.logger.warn(
          `Lesson "${input.lessonTitle}" attempt ${attempt}: ${lastProblem}`,
        );
      }
    }

    throw new CourseImportError(
      lastProblem.startsWith('it was not a JSON')
        ? 'AI_INVALID_JSON'
        : 'AI_SCHEMA_INVALID',
      `AI couldn't produce a usable lesson after ${CONTENT_ATTEMPTS} tries: ${lastProblem}`.slice(
        0,
        480,
      ),
    );
  }

  /** Guards a runaway import (or a retry loop) from an unbounded bill. */
  private async assertBudget() {
    const decision = await this.budget.checkCourseImport();
    if (!decision.allow) {
      throw new CourseImportError(
        'AI_BUDGET_EXCEEDED',
        `Course-import AI budget reached for today (${decision.reason}) — raise COURSE_IMPORT_AI_DAILY_BUDGET_USD/COURSE_IMPORT_AI_MAX_CALLS_PER_DAY or wait until tomorrow.`,
      );
    }
  }
}

function buildUserPrompt(input: LessonGenerationInput): string {
  const transcript = input.transcript!.slice(0, MAX_TRANSCRIPT_CHARS);
  const truncated =
    input.transcript!.length > MAX_TRANSCRIPT_CHARS
      ? '\n[transcript continues; cover what is here]'
      : '';
  const resources =
    input.resourceNames.length > 0
      ? `\nAttached resources: ${input.resourceNames.join(', ')}`
      : '';
  const track = input.track ? `\nTrack: ${input.track}` : '';
  const part = input.part
    ? `\nThis is part ${input.part.index} of ${input.part.count} of a longer recording. Cover ONLY what this part says; don't recap earlier parts or preview later ones.`
    : '';
  const label =
    input.mediaKind === 'none'
      ? "Text of this lesson's document"
      : input.mediaKind === 'audio'
        ? "Transcript of this lesson's audio"
        : input.part
          ? 'Transcript of this part of the video'
          : "Transcript of this lesson's video";
  return `Course: ${input.courseTitle}${track}
Lesson: ${input.lessonTitle}${resources}${part}

${label}:
"""
${transcript}${truncated}
"""`;
}
