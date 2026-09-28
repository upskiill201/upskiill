/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call -- tests inspect untyped lesson JSON */
import { Test, TestingModule } from '@nestjs/testing';
import { LessonContentGenerationService } from './lesson-content-generation.service';
import { AiConfigService } from '../tey/ai/ai-config.service';
import { AiBudgetService } from '../tey/ai/ai-budget.service';
import { editingLessonOutput } from '../../test/fixtures/rich-lesson';

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

  it('builds a rich lesson from a good answer and records the usage', async () => {
    provider.complete.mockResolvedValue(
      reply(JSON.stringify(editingLessonOutput())),
    );
    const r = await service.generate(INPUT);
    expect(r.description).toContain('composition');
    expect((r.learnBlocks[0] as { type: string }).type).toBe('learnCards');
    expect(r.stats.exercises).toBe(6);
    expect(provider.complete).toHaveBeenCalledTimes(1);
    expect(budget.record).toHaveBeenCalledWith(
      'provider-1',
      'COURSE_IMPORT',
      { inputTokens: 1, outputTokens: 1 },
      { inputCostPer1k: 0, outputCostPer1k: 0 },
    );
  });

  it('keeps each request small enough for a free-tier provider, with low reasoning on gpt-oss', async () => {
    provider.complete.mockResolvedValue(
      reply(JSON.stringify(editingLessonOutput())),
    );
    await service.generate({ ...INPUT, transcript: 'x'.repeat(40_000) });
    const req = provider.complete.mock.calls[0][0];
    expect(req.reasoningEffort).toBe('low');
    expect(req.maxOutputTokens).toBeLessThanOrEqual(3800);
    expect(req.messages[0].content.length).toBeLessThan(11_500);
  });

  it('does not ask non-reasoning models for a reasoning effort', async () => {
    provider.model = 'gemini-3.6-flash';
    provider.complete.mockResolvedValue(
      reply(JSON.stringify(editingLessonOutput())),
    );
    await service.generate(INPUT);
    expect(provider.complete.mock.calls[0][0].reasoningEffort).toBeUndefined();
  });

  it('retries once, telling the model what was wrong, when the first answer is unusable', async () => {
    const weak = editingLessonOutput();
    weak.exercises = weak.exercises.slice(0, 2);
    provider.complete
      .mockResolvedValueOnce(reply(JSON.stringify(weak)))
      .mockResolvedValueOnce(reply(JSON.stringify(editingLessonOutput())));
    const r = await service.generate(INPUT);
    expect(r.stats.exercises).toBe(6);
    expect(provider.complete).toHaveBeenCalledTimes(2);
    const second = provider.complete.mock.calls[1][0].messages;
    expect(second[1].content).toContain('usable exercises');
    expect(budget.checkCourseImport).toHaveBeenCalledTimes(2);
  });

  it('fails the lesson (retryable code) after two unusable answers', async () => {
    provider.complete.mockResolvedValue(
      reply('Sorry, here is some prose instead of JSON.'),
    );
    await expect(service.generate(INPUT)).rejects.toMatchObject({
      code: 'AI_INVALID_JSON',
    });
    expect(provider.complete).toHaveBeenCalledTimes(2);
  });

  // Found in a live run: Groq rejects malformed JSON-mode output with a 400.
  it('retries when the provider itself rejects the JSON (json_validate_failed)', async () => {
    provider.complete
      .mockRejectedValueOnce(
        new Error('400 {"error":{"code":"json_validate_failed"}}'),
      )
      .mockResolvedValueOnce(reply(JSON.stringify(editingLessonOutput())));
    const r = await service.generate(INPUT);
    expect(r.stats.exercises).toBe(6);
    expect(provider.complete).toHaveBeenCalledTimes(2);
  });

  it('does not swallow other provider errors', async () => {
    provider.complete.mockRejectedValue(new Error('401 invalid api key'));
    await expect(service.generate(INPUT)).rejects.toThrow('invalid api key');
    expect(provider.complete).toHaveBeenCalledTimes(1);
  });

  it('passes the track into the prompt', async () => {
    provider.complete.mockResolvedValue(
      reply(JSON.stringify(editingLessonOutput())),
    );
    await service.generate({ ...INPUT, track: 'Coding' });
    const req = provider.complete.mock.calls[0][0];
    expect(req.system).toContain('predictOutput');
    expect(req.messages[0].content).toContain('Track: Coding');
  });
});
