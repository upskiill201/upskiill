import { Test, TestingModule } from '@nestjs/testing';
import { LessonContentGenerationService } from './lesson-content-generation.service';
import { AiConfigService } from '../tey/ai/ai-config.service';
import { AiBudgetService } from '../tey/ai/ai-budget.service';
import {
  AI_LESSON_CONTENT_JSON_SCHEMA,
  APPLY_QUESTIONS_MAX,
  APPLY_QUESTIONS_MIN,
  COURSE_GENERATION_SYSTEM_PROMPT,
} from './lesson-content-generation.types';

function buildApplyQuestions(count: number) {
  return Array.from({ length: count }, (_, i) => ({
    questionText: `Which opener creates the most tension in example ${i + 1}?`,
    options: [
      'Hi everyone, today we will talk about pricing',
      'I lost $10,000 pricing this wrong.',
    ],
    correctOptionIndex: 1,
    explanation: 'Specific stakes create tension in the first second.',
  }));
}

const validAiOutput = {
  description:
    "In this lesson I'll show you how to write a hook that stops the scroll in the first second.",
  whatYouWillLearn: [
    'Write a scroll-stopping hook',
    'Avoid the 3 most common openers',
  ],
  applyQuestions: buildApplyQuestions(APPLY_QUESTIONS_MIN),
  reflectPrompt: 'Write a hook for your next video using what you learned.',
  deepenTitle: 'Hook templates',
  deepenSummary: '10 proven openers you can adapt to your own videos.',
};

describe('LessonContentGenerationService', () => {
  let service: LessonContentGenerationService;
  let aiConfig: { resolveForCourseImport: jest.Mock };
  let budget: { checkCourseImport: jest.Mock; record: jest.Mock };
  let provider: { complete: jest.Mock };

  beforeEach(async () => {
    provider = { complete: jest.fn() };
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
      service.generate({
        courseTitle: 'Course',
        lessonTitle: 'Lesson',
        videoUrl: 'https://cdn.example/v.mp4',
        transcript: 'too short',
        resourceNames: [],
      }),
    ).rejects.toThrow('No usable transcript');
    expect(aiConfig.resolveForCourseImport).not.toHaveBeenCalled();
  });

  it('refuses when the course-import AI budget has been reached, never calling the provider', async () => {
    budget.checkCourseImport.mockResolvedValue({
      allow: false,
      reason: 'COURSE_IMPORT_BUDGET',
    });
    await expect(
      service.generate({
        courseTitle: 'Course',
        lessonTitle: 'Lesson',
        videoUrl: 'https://cdn.example/v.mp4',
        transcript: 'A'.repeat(50),
        resourceNames: [],
      }),
    ).rejects.toThrow('Course-import AI budget reached');
    expect(aiConfig.resolveForCourseImport).not.toHaveBeenCalled();
    expect(provider.complete).not.toHaveBeenCalled();
  });

  it('fails clearly when no AI provider is configured', async () => {
    aiConfig.resolveForCourseImport.mockResolvedValue(null);
    await expect(
      service.generate({
        courseTitle: 'Course',
        lessonTitle: 'Lesson',
        videoUrl: 'https://cdn.example/v.mp4',
        transcript: 'A'.repeat(50),
        resourceNames: [],
      }),
    ).rejects.toThrow('No active Gemini provider configured');
  });

  it('never resolves through the shared primary/fallback pair used by Tey nudges', async () => {
    provider.complete.mockResolvedValue({
      text: JSON.stringify(validAiOutput),
      toolCalls: [],
      usage: { inputTokens: 1, outputTokens: 1 },
      model: 'x',
      finishReason: 'stop',
    });

    const result = await service.generate({
      courseTitle: 'How to Create Great Content',
      lessonTitle: 'Writing Hooks',
      videoUrl: 'https://cdn.example/hooks.mp4',
      transcript: 'A hook is the first 3 seconds of your video. '.repeat(5),
      resourceNames: ['Hook Cheat Sheet.pdf'],
    });

    expect(result.description).toBe(validAiOutput.description);
    expect(aiConfig.resolveForCourseImport).toHaveBeenCalled();
    expect(budget.record).toHaveBeenCalledWith(
      'provider-1',
      'COURSE_IMPORT',
      { inputTokens: 1, outputTokens: 1 },
      { inputCostPer1k: 0, outputCostPer1k: 0 },
    );
  });

  it('maps validated AI output into the real Learn/Apply/Reflect/Deepen block shapes', async () => {
    provider.complete.mockResolvedValue({
      text: JSON.stringify(validAiOutput),
      toolCalls: [],
      usage: { inputTokens: 10, outputTokens: 20 },
      model: 'gemini-2.0-flash',
      finishReason: 'stop',
    });

    const result = await service.generate({
      courseTitle: 'How to Create Great Content',
      lessonTitle: 'Writing Hooks',
      videoUrl: 'https://cdn.example/hooks.mp4',
      transcript: 'A hook is the first 3 seconds of your video. '.repeat(5),
      resourceNames: ['Hook Cheat Sheet.pdf'],
    });

    expect(result.learnBlocks).toEqual([
      { type: 'videoUrl', value: 'https://cdn.example/hooks.mp4' },
      { type: 'audioUrl', value: '' },
      { type: 'text', value: validAiOutput.description },
      { type: 'whatYouWillLearn', value: validAiOutput.whatYouWillLearn },
    ]);

    const applyValue = (
      result.applyBlocks[0] as { type: string; value: Record<string, unknown> }
    ).value;
    expect(applyValue).toMatchObject({
      passingScore: 70,
      allowRetries: true,
      difficultyLevel: 'medium',
    });
    const questions = applyValue.questions as Array<{
      options: { id: string; text: string }[];
      correctOptionId: string;
    }>;
    // correctOptionIndex 1 must map to the SECOND option's own generated id.
    expect(questions[0].correctOptionId).toBe(questions[0].options[1].id);

    const reflectValue = (
      result.reflectBlocks[0] as {
        type: string;
        value: Record<string, unknown>;
      }
    ).value;
    expect(reflectValue).toMatchObject({
      prompt: validAiOutput.reflectPrompt,
      type: 'open',
    });

    const deepenValue = (
      result.deepenBlocks[0] as { type: string; value: Record<string, unknown> }
    ).value;
    expect(deepenValue).toMatchObject({
      collectionTitle: validAiOutput.deepenTitle,
      collectionDescription: validAiOutput.deepenSummary,
    });
  });

  it('rejects malformed AI output rather than saving it', async () => {
    provider.complete.mockResolvedValue({
      text: JSON.stringify({ description: 'too short desc' }), // missing every other required field
      toolCalls: [],
      usage: { inputTokens: 1, outputTokens: 1 },
      model: 'x',
      finishReason: 'stop',
    });

    await expect(
      service.generate({
        courseTitle: 'Course',
        lessonTitle: 'Lesson',
        videoUrl: 'https://cdn.example/v.mp4',
        transcript: 'A'.repeat(50),
        resourceNames: [],
      }),
    ).rejects.toThrow('AI returned invalid lesson content');
  });

  it('rejects a response that is not JSON at all', async () => {
    provider.complete.mockResolvedValue({
      text: "Sure, here's a great lesson about hooks!",
      toolCalls: [],
      usage: { inputTokens: 1, outputTokens: 1 },
      model: 'x',
      finishReason: 'stop',
    });

    await expect(
      service.generate({
        courseTitle: 'Course',
        lessonTitle: 'Lesson',
        videoUrl: 'https://cdn.example/v.mp4',
        transcript: 'A'.repeat(50),
        resourceNames: [],
      }),
    ).rejects.toThrow('AI returned invalid lesson content');
  });

  // Hard product rule (spec §79): an Apply step carries 5-15 questions.
  // Enforced at the schema layer rather than by truncating the model's
  // output — silently dropping questions would drop real teaching content.
  describe(`Apply question count (${APPLY_QUESTIONS_MIN}-${APPLY_QUESTIONS_MAX})`, () => {
    function respondWith(questionCount: number) {
      provider.complete.mockResolvedValue({
        text: JSON.stringify({
          ...validAiOutput,
          applyQuestions: buildApplyQuestions(questionCount),
        }),
        toolCalls: [],
        usage: { inputTokens: 1, outputTokens: 1 },
        model: 'x',
        finishReason: 'stop',
      });
    }

    const generate = () =>
      service.generate({
        courseTitle: 'Course',
        lessonTitle: 'Lesson',
        videoUrl: 'https://cdn.example/v.mp4',
        transcript: 'A'.repeat(50),
        resourceNames: [],
      });

    it(`rejects ${APPLY_QUESTIONS_MIN - 1} questions (below the minimum)`, async () => {
      respondWith(APPLY_QUESTIONS_MIN - 1);
      await expect(generate()).rejects.toThrow(
        'AI returned invalid lesson content',
      );
    });

    it(`accepts exactly ${APPLY_QUESTIONS_MIN} questions`, async () => {
      respondWith(APPLY_QUESTIONS_MIN);
      const result = await generate();
      expect(
        (result.applyBlocks[0] as { value: { questions: unknown[] } }).value
          .questions,
      ).toHaveLength(APPLY_QUESTIONS_MIN);
    });

    it(`accepts exactly ${APPLY_QUESTIONS_MAX} questions`, async () => {
      respondWith(APPLY_QUESTIONS_MAX);
      const result = await generate();
      expect(
        (result.applyBlocks[0] as { value: { questions: unknown[] } }).value
          .questions,
      ).toHaveLength(APPLY_QUESTIONS_MAX);
    });

    it(`rejects ${APPLY_QUESTIONS_MAX + 1} questions (above the maximum)`, async () => {
      respondWith(APPLY_QUESTIONS_MAX + 1);
      await expect(generate()).rejects.toThrow(
        'AI returned invalid lesson content',
      );
    });

    it('tells the model the bounds in the prompt, not just in our validator', () => {
      expect(COURSE_GENERATION_SYSTEM_PROMPT).toContain(
        `between ${APPLY_QUESTIONS_MIN} and ${APPLY_QUESTIONS_MAX} Apply`,
      );
      expect(AI_LESSON_CONTENT_JSON_SCHEMA.properties.applyQuestions).toEqual(
        expect.objectContaining({
          minItems: APPLY_QUESTIONS_MIN,
          maxItems: APPLY_QUESTIONS_MAX,
        }),
      );
    });
  });

  // Same rule as the array bounds below, and learned the harder way: the
  // first version of that test only checked arrays, so string limits were
  // never covered — and a live run then failed with
  // SCHEMA_MISMATCH:reflectPrompt because the model wrote past its
  // 400-character cap, which the schema stated and the prompt did not.
  it('states every bounded string limit in the prompt, not just the schema', () => {
    const boundedStrings = Object.entries(
      AI_LESSON_CONTENT_JSON_SCHEMA.properties,
    ).filter(
      ([, schema]) =>
        (schema as { type?: string }).type === 'string' &&
        (schema as { maxLength?: number }).maxLength !== undefined,
    );

    expect(boundedStrings.length).toBeGreaterThan(0);

    const unstated = boundedStrings
      .filter(([field, schema]) => {
        const { minLength, maxLength } = schema as {
          minLength: number;
          maxLength: number;
        };
        return !COURSE_GENERATION_SYSTEM_PROMPT.includes(
          `${field} ${minLength}-${maxLength} characters`,
        );
      })
      .map(([field]) => field);

    expect(unstated).toEqual([]);
  });

  // A JSON-Schema bound alone does not hold: an OpenAI-compatible provider
  // in json_object mode treats it as a hint. Both array fields have now
  // been violated in live runs for exactly this reason (whatYouWillLearn
  // returned 6 against maxItems: 5), so every bounded array must also state
  // its limit in prose. This guards the next field somebody adds.
  it('states every bounded array limit in the prompt, not just the schema', () => {
    const boundedArrays = Object.entries(
      AI_LESSON_CONTENT_JSON_SCHEMA.properties,
    ).filter(
      ([, schema]) =>
        (schema as { type?: string }).type === 'array' &&
        (schema as { maxItems?: number }).maxItems !== undefined,
    );

    expect(boundedArrays.length).toBeGreaterThan(0);

    // Collected rather than asserted one-by-one so a failure names the
    // offending field instead of just printing "expected true".
    const unstated = boundedArrays
      .filter(([, schema]) => {
        const { minItems, maxItems } = schema as {
          minItems: number;
          maxItems: number;
        };
        return !COURSE_GENERATION_SYSTEM_PROMPT.includes(
          `between ${minItems} and ${maxItems}`,
        );
      })
      .map(([field]) => field);

    expect(unstated).toEqual([]);
  });
});
