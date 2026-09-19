import { Injectable, Logger } from '@nestjs/common';
import { AiConfigService } from '../tey/ai/ai-config.service';
import { AiBudgetService } from '../tey/ai/ai-budget.service';
import { parseStructured } from '../tey/ai/structured-output';
import {
  AI_LESSON_CONTENT_JSON_SCHEMA,
  AiLessonContentSchema,
  COURSE_GENERATION_SYSTEM_PROMPT,
  GeneratedLessonBlocks,
  mapToLessonBlocks,
} from './lesson-content-generation.types';

/** Keeps a huge transcript from either blowing the model's context or
 *  dominating the cost of a single lesson — a course video's substance is
 *  rarely concentrated past the first ~15k characters of spoken content. */
const MAX_TRANSCRIPT_CHARS = 15_000;
const GENERATION_TIMEOUT_MS = 60_000;
const MAX_OUTPUT_TOKENS = 2048;

export interface LessonGenerationInput {
  courseTitle: string;
  lessonTitle: string;
  videoUrl: string;
  transcript: string | null;
  resourceNames: string[];
}

@Injectable()
export class LessonContentGenerationService {
  private readonly logger = new Logger(LessonContentGenerationService.name);

  constructor(
    private readonly aiConfig: AiConfigService,
    private readonly budget: AiBudgetService,
  ) {}

  async generate(input: LessonGenerationInput): Promise<GeneratedLessonBlocks> {
    if (!input.transcript || input.transcript.trim().length < 20) {
      throw new Error(
        'No usable transcript for this lesson yet — refusing to generate content without a source to ground it in.',
      );
    }

    // Guards against a runaway import (or a retry loop) racking up an
    // unbounded bill — see AiBudgetService#checkCourseImport's doc comment
    // for why this is separate from the Tey nudge system's own budget check.
    const decision = await this.budget.checkCourseImport();
    if (!decision.allow) {
      throw new Error(
        `Course-import AI budget reached for today (${decision.reason}) — raise COURSE_IMPORT_AI_DAILY_BUDGET_USD/COURSE_IMPORT_AI_MAX_CALLS_PER_DAY or wait until tomorrow.`,
      );
    }

    // Not aiConfig.resolve() — that primary/fallback pair is shared with the
    // live Tey nudge system. See resolveForCourseImport()'s doc comment.
    const resolved = await this.aiConfig.resolveForCourseImport();
    if (!resolved) {
      throw new Error(
        'No active Gemini provider configured for course import — activate the Gemini row on /admin/ai first.',
      );
    }

    const userMessage = buildUserPrompt(input);
    const result = await resolved.provider.complete({
      system: COURSE_GENERATION_SYSTEM_PROMPT,
      messages: [{ role: 'user', content: userMessage }],
      maxOutputTokens: MAX_OUTPUT_TOKENS,
      temperature: 0.4,
      timeoutMs: GENERATION_TIMEOUT_MS,
      jsonSchema: AI_LESSON_CONTENT_JSON_SCHEMA as unknown as Record<
        string,
        unknown
      >,
    });

    await this.budget.record(
      resolved.providerId,
      'COURSE_IMPORT',
      result.usage,
      {
        inputCostPer1k: resolved.inputCostPer1k,
        outputCostPer1k: resolved.outputCostPer1k,
      },
    );

    const parsed = parseStructured(result.text, AiLessonContentSchema);
    if (!parsed.ok) {
      // Visibility into what a provider actually sent, not just that it
      // failed — a schema mismatch is meaningless to debug from the reason
      // code alone, and this has already surfaced real behavior
      // differences between providers (e.g. Gemini's native responseSchema
      // vs. an OpenAI-compatible provider's much looser json_object mode).
      this.logger.warn(
        `Lesson generation schema mismatch (${parsed.reason}) from ${resolved.provider.kind}/${resolved.provider.model}. Raw response: ${(result.text ?? '').slice(0, 2000)}`,
      );
      throw new Error(`AI returned invalid lesson content (${parsed.reason}).`);
    }

    return mapToLessonBlocks(parsed.value, input.videoUrl);
  }
}

function buildUserPrompt(input: LessonGenerationInput): string {
  const transcript = input.transcript!.slice(0, MAX_TRANSCRIPT_CHARS);
  const truncatedNote =
    input.transcript!.length > MAX_TRANSCRIPT_CHARS
      ? '\n[transcript truncated]'
      : '';
  const resources =
    input.resourceNames.length > 0
      ? `\nAttached resources: ${input.resourceNames.join(', ')}`
      : '';

  return `Course: ${input.courseTitle}
Lesson: ${input.lessonTitle}${resources}

Transcript of this lesson's video:
"""
${transcript}${truncatedNote}
"""`;
}
