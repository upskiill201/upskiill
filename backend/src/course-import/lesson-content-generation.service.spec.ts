/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-return -- tests inspect untyped lesson JSON */
import { Test, TestingModule } from '@nestjs/testing';
import { LessonContentGenerationService } from './lesson-content-generation.service';
import { AiConfigService } from '../tey/ai/ai-config.service';
import { AiBudgetService } from '../tey/ai/ai-budget.service';
import { editingLessonOutput } from '../../test/fixtures/rich-lesson';
import { REVIEW_SYSTEM_PROMPT } from './exercise-review';

const reply = (text: string) => ({
  text,
  toolCalls: [],
  usage: { inputTokens: 1, outputTokens: 1 },
  model: 'x',
  finishReason: 'stop',
});

const INPUT = {
  courseTitle: 'Video Editing',
  lessonTitle: 'Composition',
  videoUrl: 'https://cdn.example/v.mp4',
  transcript: 'Composition is where the eye lands. '.repeat(20),
  resourceNames: ['Composition cheat sheet.pdf'],
  track: null,
  videoDurationSec: 422,
};

describe('LessonContentGenerationService (rich lessons)', () => {
  let service: LessonContentGenerationService;
  let aiConfig: { resolveForCourseImport: jest.Mock };
  let budget: { checkCourseImport: jest.Mock; record: jest.Mock };
  let provider: { complete: jest.Mock; model: string; kind: string };

  beforeEach(async () => {
    provider = {
      complete: jest.fn(),
      model: 'openai/gpt-oss-20b',
      kind: 'OPENAI_COMPATIBLE',
    };
    aiConfig = {
      resolveForCourseImport: jest.fn().mockResolvedValue({
        provider,
        providerId: 'provider-1',
        inputCostPer1k: 0,
        outputCostPer1k: 0,
      }),
    };
    budget = {
      checkCourseImport: jest.fn().mockResolvedValue({ allow: true }),
      record: jest.fn().mockResolvedValue(undefined),
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LessonContentGenerationService,
        { provide: AiConfigService, useValue: aiConfig },
        { provide: AiBudgetService, useValue: budget },
      ],
    }).compile();
    service = module.get(LessonContentGenerationService);
  });

  it('refuses to generate without a usable transcript, never calling the AI provider', async () => {
    await expect(
      service.generate({ ...INPUT, transcript: 'too short' }),
    ).rejects.toThrow('No usable transcript');
    expect(aiConfig.resolveForCourseImport).not.toHaveBeenCalled();
  });

  it('refuses when the course-import AI budget has been reached, never calling the provider', async () => {
    budget.checkCourseImport.mockResolvedValue({
      allow: false,
      reason: 'COURSE_IMPORT_BUDGET',
    });
    await expect(service.generate(INPUT)).rejects.toThrow(
      'Course-import AI budget reached',
    );
    expect(aiConfig.resolveForCourseImport).not.toHaveBeenCalled();
    expect(provider.complete).not.toHaveBeenCalled();
  });

  it('fails clearly when no AI provider is configured', async () => {
    aiConfig.resolveForCourseImport.mockResolvedValue(null);
    await expect(service.generate(INPUT)).rejects.toThrow(
      'No active AI provider configured',
    );
  });

  /** Scripts the provider: the writer's replies in order (the last one
   *  repeats), and the answer checker's reply (all pass by default). */
  function script(
    writer: (string | Error)[],
    checker: unknown = { items: [] },
  ) {
    const queue = [...writer];
    provider.complete.mockImplementation((req: { system: string }) => {
      if (req.system === REVIEW_SYSTEM_PROMPT) {
        const v: unknown =
          typeof checker === 'function'
            ? (checker as () => unknown)()
            : checker;
        if (v instanceof Error) return Promise.reject(v);
        return Promise.resolve(
          reply(typeof v === 'string' ? v : JSON.stringify(v)),
        );
      }
      const next = queue.length > 1 ? queue.shift()! : queue[0];
      return next instanceof Error
        ? Promise.reject(next)
        : Promise.resolve(reply(next));
    });
  }
  const isChecker = (c: any[]) => c[0].system === REVIEW_SYSTEM_PROMPT;
  const writerCalls = () =>
    provider.complete.mock.calls.filter((c) => !isChecker(c));
  const checkerCalls = () => provider.complete.mock.calls.filter(isChecker);
  const good = () => JSON.stringify(editingLessonOutput());

  it('builds a rich lesson from a good answer and records the usage', async () => {
    script([good()]);
    const r = await service.generate(INPUT);
    expect(r.description).toContain('composition');
    expect((r.learnBlocks[0] as { type: string }).type).toBe('learnCards');
    expect(r.stats.exercises).toBe(6);
    expect(writerCalls()).toHaveLength(1);
    expect(checkerCalls()).toHaveLength(1);
    expect(budget.record).toHaveBeenCalledWith(
      'provider-1',
      'COURSE_IMPORT',
      { inputTokens: 1, outputTokens: 1 },
      { inputCostPer1k: 0, outputCostPer1k: 0 },
    );
  });

  it('keeps each request small enough for a free-tier provider, with low reasoning on gpt-oss', async () => {
    script([good()]);
    await service.generate({ ...INPUT, transcript: 'x'.repeat(40_000) });
    const req = provider.complete.mock.calls[0][0];
    expect(req.reasoningEffort).toBe('low');
    expect(req.maxOutputTokens).toBeLessThanOrEqual(3800);
    expect(req.messages[0].content.length).toBeLessThan(11_500);
    const check = checkerCalls()[0][0];
    expect(check.messages[0].content.length).toBeLessThan(16_000);
  });

  it('does not ask non-reasoning models for a reasoning effort', async () => {
    provider.model = 'gemini-3.6-flash';
    script([good()]);
    await service.generate(INPUT);
    expect(provider.complete.mock.calls[0][0].reasoningEffort).toBeUndefined();
    expect(checkerCalls()[0][0].reasoningEffort).toBeUndefined();
  });

  it('retries once, telling the model what was wrong, when the first answer is unusable', async () => {
    const weak = editingLessonOutput();
    // Four of six multiple-choice questions with no right answer marked.
    const mcq = editingLessonOutput().exercises[0];
    weak.exercises = [
      mcq,
      editingLessonOutput().exercises[5],
      ...Array.from({ length: 4 }, () => ({ ...mcq, correctIndex: 9 })),
    ];
    script([JSON.stringify(weak), good()]);
    const r = await service.generate(INPUT);
    expect(r.stats.exercises).toBe(6);
    expect(writerCalls()).toHaveLength(2);
    const second = writerCalls()[1][0].messages;
    expect(second[1].content).toContain('exercises were usable');
  });

  it('fails the lesson (retryable code) after two unusable answers', async () => {
    script(['Sorry, here is some prose instead of JSON.']);
    await expect(service.generate(INPUT)).rejects.toMatchObject({
      code: 'AI_INVALID_JSON',
    });
    expect(provider.complete).toHaveBeenCalledTimes(2);
  });

  // Found in a live run: Groq rejects malformed JSON-mode output with a 400.
  it('retries when the provider itself rejects the JSON (json_validate_failed)', async () => {
    script([
      new Error('400 {"error":{"code":"json_validate_failed"}}'),
      good(),
    ]);
    const r = await service.generate(INPUT);
    expect(r.stats.exercises).toBe(6);
    expect(writerCalls()).toHaveLength(2);
  });

  it('does not swallow other provider errors', async () => {
    script([new Error('401 invalid api key')]);
    await expect(service.generate(INPUT)).rejects.toThrow('invalid api key');
    expect(provider.complete).toHaveBeenCalledTimes(1);
  });

  it('passes the track into the prompt', async () => {
    script([good()]);
    await service.generate({ ...INPUT, track: 'Coding' });
    const req = provider.complete.mock.calls[0][0];
    expect(req.system).toContain('predictOutput');
    expect(req.messages[0].content).toContain('Track: Coding');
  });

  describe('the answer checker', () => {
    it('solves multiple choice blind: the sheet never shows the answer key', async () => {
      script([good()]);
      await service.generate(INPUT);
      const sheet: string = checkerCalls()[0][0].messages[0].content;
      expect(sheet).toContain('#1 multiple choice');
      expect(sheet).toContain('A) The focal point');
      expect(sheet).not.toMatch(/correct|answer key/i);
      // Fill-ins are judged with their intended answer shown.
      expect(sheet).toContain('[[1]] = third');
    });

    it('drops a question whose marked answer the checker disagrees with, and an unclear one', async () => {
      script([good()], {
        items: [
          { n: '1', answer: 'B', clear: true }, // the key says A
          { n: '2', correct: true, clear: false, problem: 'vague' },
          { n: '6', answer: 'A', clear: true },
          { n: 'Q', answer: 'B', clear: true },
        ],
      });
      const r = await service.generate(INPUT);
      expect(r.stats.exercises).toBe(4);
      expect(r.stats.dropped.join(' ')).toContain(
        'checker answered B, the key says A',
      );
      expect(r.stats.dropped.join(' ')).toContain('unclear (vague)');
      const ids = (
        r.applyBlocks[0] as { value: { items: { id: string }[] } }
      ).value.items.map((e) => e.id);
      expect(ids).not.toContain('ex_0');
      expect(ids).not.toContain('ex_1');
      // The quick check's key (B) matched: it stays.
      const cards = (r.learnBlocks[0] as { value: { kind: string }[] }).value;
      expect(cards.some((c) => c.kind === 'check')).toBe(true);
    });

    it('drops a quick check the checker answers differently', async () => {
      script([good()], { items: [{ n: 'Q', answer: 'A' }] });
      const r = await service.generate(INPUT);
      const cards = (r.learnBlocks[0] as { value: { kind: string }[] }).value;
      expect(cards.some((c) => c.kind === 'check')).toBe(false);
      expect(r.stats.exercises).toBe(6);
    });

    it('rewrites the lesson, with the reasons, when too many questions fail', async () => {
      let checks = 0;
      script([good()], () =>
        ++checks === 1
          ? {
              items: ['1', '2', '3', '4', '5'].map((n) => ({
                n,
                answer: 'none',
                correct: false,
              })),
            }
          : { items: [] },
      );
      const r = await service.generate(INPUT);
      expect(writerCalls()).toHaveLength(2);
      expect(writerCalls()[1][0].messages[1].content).toContain(
        'answer checker rejected',
      );
      expect(r.stats.exercises).toBe(6);
    });

    it('keeps what passed on the last try rather than failing the lesson', async () => {
      script([good()], {
        items: ['1', '2', '3', '4', '5'].map((n) => ({ n, correct: false })),
      });
      const r = await service.generate(INPUT);
      expect(writerCalls()).toHaveLength(2);
      expect(r.stats.exercises).toBe(1);
    });

    it('waits out a rate limit instead of losing the written lesson', async () => {
      let checks = 0;
      script([good()], () =>
        ++checks === 1
          ? new Error(
              'OpenAI-compatible request failed (429): Rate limit reached. Please try again in 10ms.',
            )
          : { items: [] },
      );
      const r = await service.generate(INPUT);
      expect(checkerCalls()).toHaveLength(2);
      expect(r.stats.exercises).toBe(6);
    });

    it('keeps the lesson as written when the checker never answers usefully', async () => {
      script([good()], 'not json');
      const r = await service.generate(INPUT);
      expect(r.stats.exercises).toBe(6);
      expect(checkerCalls()).toHaveLength(3);
    });

    it('gives an intro lesson no Apply step and nothing to check', async () => {
      const intro = editingLessonOutput();
      intro.lessonKind = 'intro';
      intro.practicePoints = [];
      intro.exercises = [];
      intro.quickCheck = null;
      intro.scenario = '';
      script([JSON.stringify(intro)]);
      const r = await service.generate(INPUT);
      expect(r.applyBlocks).toEqual([]);
      expect(r.stats.exercises).toBe(0);
      expect(checkerCalls()).toHaveLength(0);
    });
  });
});
