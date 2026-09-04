import { Test } from '@nestjs/testing';
import { z } from 'zod';
import { PrismaService } from '../../prisma/prisma.service';
import { LearnerStateService } from '../state/learner-state.service';
import { AiConfigService } from './ai-config.service';
import { AiBudgetService } from './ai-budget.service';
import { ToolRegistry, TEY_TOOLS, zodToJsonSchema } from './tools/tool-registry';
import {
  NudgeCopySchema,
  parseStructured,
  ConversationReplySchema,
} from './structured-output';
import { buildNudgeSystemPrompt } from './tey-personality';
import type { TeyContext } from '../contracts/tey-context.types';

const REAL_KEY = 'sk-live-abcdefghijklmnop1234';

describe('AI secret handling', () => {
  /**
   * The property that matters: a key an admin types in can never come back
   * out. Enforced by AiConfigService.toView destructuring the ciphertext away,
   * rather than by every endpoint remembering to omit it.
   */
  it('never returns the key or the ciphertext from a provider view', () => {
    const view = AiConfigService.toView({
      id: 'p1',
      name: 'gemini',
      kind: 'GEMINI',
      model: 'gemini-2.0-flash',
      baseUrl: null,
      keyTail: REAL_KEY.slice(-4),
      isActive: true,
      isFallback: false,
      maxOutputTokens: 400,
      temperature: 0.8,
      timeoutMs: 8000,
      inputCostPer1k: 0,
      outputCostPer1k: 0,
      dailyBudgetUsd: 1,
      lastTestAt: null,
      lastTestOk: null,
      lastTestError: null,
    });

    const serialized = JSON.stringify(view);
    expect(serialized).not.toContain(REAL_KEY);
    expect(serialized).not.toContain('sk-live');
    expect(serialized).not.toContain('encryptedApiKey');
    expect(view).not.toHaveProperty('encryptedApiKey');

    // Only the tail survives, and only masked.
    expect(view.apiKeyMasked).toContain('1234');
    expect(view.apiKeyMasked).not.toBe(REAL_KEY);
  });

  it('round-trips a key through the shared earnings crypto envelope', () => {
    // Reusing that envelope means one crypto implementation to audit and one
    // production fail-fast on a missing EARNINGS_ENC_KEY.
    const { encryptJson, decryptJson } = require('../../earnings/crypto.util');
    const { encryptedData } = encryptJson({ apiKey: REAL_KEY });

    expect(encryptedData).not.toContain(REAL_KEY);
    expect(encryptedData.startsWith('v1:')).toBe(true);
    expect(decryptJson<{ apiKey: string }>(encryptedData).apiKey).toBe(REAL_KEY);
  });
});

describe('Tool safety', () => {
  let registry: ToolRegistry;
  let prisma: any;
  let learnerState: any;

  beforeEach(async () => {
    prisma = {
      teyScheduledAction: {
        count: jest.fn().mockResolvedValue(0),
        create: jest.fn().mockResolvedValue({}),
        updateMany: jest.fn().mockResolvedValue({ count: 1 }),
      },
      lesson: { findUnique: jest.fn(), findFirst: jest.fn() },
    };
    learnerState = {
      get: jest.fn().mockResolvedValue({
        streakDays: 12,
        longestStreak: 30,
        freezesAvailable: 0,
        todayGoalCompleted: false,
        todayXp: 0,
        dailyGoalXp: 20,
        todayLessons: 0,
        weeklyLessons: 5,
        weeklyXp: 100,
        currentCourseId: 'c1',
        currentCourseTitle: 'Digital Marketing',
        currentLessonId: 'l1',
        courseProgressPct: 62,
        courseState: 'IN_PROGRESS',
        engagementState: 'ACTIVE',
      }),
    };

    const moduleRef = await Test.createTestingModule({
      providers: [
        ToolRegistry,
        { provide: PrismaService, useValue: prisma },
        { provide: LearnerStateService, useValue: learnerState },
      ],
    }).compile();

    registry = moduleRef.get(ToolRegistry);
  });

  /**
   * THE safety property. userId is injected from the session, so there is no
   * argument a prompt injection can set to reach another learner's data.
   */
  it('exposes no user-identifying field in any tool schema', () => {
    for (const tool of TEY_TOOLS) {
      const schema = zodToJsonSchema(tool.schema);
      const keys = Object.keys(
        (schema.properties as Record<string, unknown>) ?? {},
      ).map((k) => k.toLowerCase());

      for (const key of keys) {
        expect(key).not.toContain('user');
        expect(key).not.toContain('learner');
        expect(key).not.toContain('account');
      }
    }
  });

  it('ignores a model-supplied user id instead of honouring it', async () => {
    // Strict schemas reject unknown keys, so an injected `user_id` fails
    // validation rather than silently reaching a handler.
    const result = await registry.execute('victim-id', 'get_streak', {
      user_id: 'attacker-id',
    });

    expect(result.ok).toBe(false);
    // And the session id is the only one a handler ever sees.
    await registry.execute('victim-id', 'get_streak', {});
    expect(learnerState.get).toHaveBeenCalledWith('victim-id');
  });

  it('refuses mutating tools on the proactive path', async () => {
    // A nudge is composing a sentence; nothing it does should change state.
    const result = await registry.execute('u1', 'create_reminder', { hour: 21 });
    expect(result.ok).toBe(false);
    expect(prisma.teyScheduledAction.create).not.toHaveBeenCalled();
  });

  it('permits mutating tools only when explicitly allowed', async () => {
    const result = await registry.execute(
      'u1',
      'create_reminder',
      { hour: 21 },
      { allowMutating: true },
    );
    expect(result.ok).toBe(true);
    expect(prisma.teyScheduledAction.create).toHaveBeenCalled();
  });

  it('advertises read tools only by default', () => {
    const readOnly = registry.specs(false).map((t) => t.name);
    expect(readOnly).toContain('get_streak');
    expect(readOnly).not.toContain('create_reminder');
    expect(registry.specs(true).map((t) => t.name)).toContain('create_reminder');
  });

  it('validates arguments before running anything', async () => {
    const result = await registry.execute(
      'u1',
      'create_reminder',
      { hour: 99 },
      { allowMutating: true },
    );
    expect(result.ok).toBe(false);
    expect(prisma.teyScheduledAction.create).not.toHaveBeenCalled();
  });

  it('rejects an unknown tool name', async () => {
    const result = await registry.execute('u1', 'drop_all_tables', {});
    expect(result).toEqual({
      ok: false,
      error: 'Unknown tool: drop_all_tables',
    });
  });

  it('caps learner-created reminders so "remind me" cannot loop', async () => {
    prisma.teyScheduledAction.count.mockResolvedValue(3);
    const result = await registry.execute(
      'u1',
      'create_reminder',
      { hour: 21 },
      { allowMutating: true },
    );

    // Reported honestly rather than silently dropped, so the model can tell
    // the learner what actually happened.
    expect(result).toMatchObject({ ok: true, result: { created: false } });
    expect(prisma.teyScheduledAction.create).not.toHaveBeenCalled();
  });

  it('surfaces a handler failure instead of letting the model invent success', async () => {
    learnerState.get.mockRejectedValue(new Error('db down'));
    const result = await registry.execute('u1', 'get_streak', {});
    expect(result.ok).toBe(false);
  });
});

describe('Structured output validation', () => {
  const VALID = '{"title":"Your streak is waiting","body":"One lesson does it."}';

  it('accepts well-formed JSON', () => {
    expect(parseStructured(VALID, NudgeCopySchema)).toEqual({
      ok: true,
      value: { title: 'Your streak is waiting', body: 'One lesson does it.' },
    });
  });

  it('tolerates a fenced code block', () => {
    const fenced = ['```json', VALID, '```'].join('\n');
    expect(parseStructured(fenced, NudgeCopySchema).ok).toBe(true);
  });

  it('tolerates prose around the JSON', () => {
    expect(
      parseStructured(`Sure! ${VALID} Hope that helps.`, NudgeCopySchema).ok,
    ).toBe(true);
  });

  it('applies length bounds to the TRIMMED value', () => {
    // zod checks .min()/.max() against the UNTRIMMED string, so without the
    // transform-then-pipe in structured-output.ts a padded one-character title
    // would sail through and reach a lock screen.
    const padded = JSON.stringify({ title: '  a  ', body: 'a real body here' });
    expect(parseStructured(padded, NudgeCopySchema).ok).toBe(false);
  });

  it.each([
    ['empty', ''],
    ['null', null],
    ['prose only', 'I cannot help with that.'],
    ['malformed', '{"title": '],
  ])('rejects %s', (_label, raw) => {
    expect(parseStructured(raw, NudgeCopySchema).ok).toBe(false);
  });

  it('rejects copy that blows the push length budget', () => {
    // The OS would truncate it mid-sentence; a template is strictly better.
    const result = parseStructured(
      JSON.stringify({ title: 'x'.repeat(80), body: 'ok' }),
      NudgeCopySchema,
    );
    expect(result.ok).toBe(false);
    expect((result as { reason: string }).reason).toContain('SCHEMA_MISMATCH');
  });

  it('rejects a missing field rather than filling in a default', () => {
    expect(
      parseStructured('{"title":"A perfectly fine title"}', NudgeCopySchema).ok,
    ).toBe(false);
  });

  it('validates conversation replies too', () => {
    expect(
      parseStructured(
        '{"intent":"NEEDS_ENCOURAGEMENT","response":"Let us do a short one."}',
        ConversationReplySchema,
      ).ok,
    ).toBe(true);
  });
});

describe('Tey personality prompt', () => {
  const ctx = {
    v: 1,
    reason: 'STREAK_AT_RISK',
    urgency: 'HIGH',
    learnerState: {
      engagement: 'ACTIVE',
      streak: 'STREAK_AT_RISK',
      performance: 'STABLE',
      course: 'IN_PROGRESS',
    },
    facts: {
      streakDays: 12,
      longestStreak: 30,
      freezesAvailable: 0,
      dailyGoalXp: 20,
      todayXp: 0,
      todayLessons: 0,
      weeklyLessons: 5,
      weeklyGoal: 300,
      courseProgressPct: 62,
      courseTitle: 'Digital Marketing',
      hoursUntilLocalMidnight: 3,
      daysSinceLastActivity: 1,
    },
    recommendedAction: 'COMPLETE_LESSON',
    target: { type: 'HOME' },
    tone: 'URGENT_PLAYFUL',
    teyState: 'STREAK_AT_RISK',
    ignoredNudgeStreak: 0,
  } as unknown as TeyContext;

  it('hands the model facts rather than asking it to work them out', () => {
    // Spec sections 15 and 23: the backend is the source of truth, always.
    const prompt = buildNudgeSystemPrompt(ctx);
    expect(prompt).toContain('12 days');
    expect(prompt).toContain('Digital Marketing');
    expect(prompt).toContain('These facts are TRUE');
    expect(prompt).toContain('do not invent others');
  });

  it('always carries the behavioural prohibitions', () => {
    const prompt = buildNudgeSystemPrompt(ctx);
    for (const forbidden of ['shame', 'humiliate', 'threaten', 'guilt-trip']) {
      expect(prompt).toContain(forbidden);
    }
  });

  it('states the push length limits the validator enforces', () => {
    const prompt = buildNudgeSystemPrompt(ctx);
    expect(prompt).toContain('45 characters');
    expect(prompt).toContain('120 characters');
  });

  it('mentions ignored nudges only once they have actually piled up', () => {
    expect(buildNudgeSystemPrompt(ctx)).not.toContain('have not opened');
    expect(
      buildNudgeSystemPrompt({ ...ctx, ignoredNudgeStreak: 3 }),
    ).toContain('have not opened');
  });
});

describe('AiBudgetService', () => {
  let service: AiBudgetService;
  let prisma: any;
  const originalEnv = { ...process.env };

  beforeEach(async () => {
    prisma = {
      teyAiUsage: {
        aggregate: jest
          .fn()
          .mockResolvedValue({ _sum: { costUsd: 0, calls: 0 } }),
        findFirst: jest.fn().mockResolvedValue(null),
        create: jest.fn().mockResolvedValue({}),
        update: jest.fn().mockResolvedValue({}),
        groupBy: jest.fn().mockResolvedValue([]),
      },
    };

    const moduleRef = await Test.createTestingModule({
      providers: [AiBudgetService, { provide: PrismaService, useValue: prisma }],
    }).compile();

    service = moduleRef.get(AiBudgetService);
    process.env.TEY_AI_ENABLED = 'true';
  });

  afterEach(() => {
    process.env = { ...originalEnv };
  });

  it('is off unless explicitly enabled', async () => {
    delete process.env.TEY_AI_ENABLED;
    await expect(service.check('NUDGE_COPY', 'u1')).resolves.toEqual({
      allow: false,
      reason: 'AI_DISABLED',
    });
    // Cheapest check first — no query when the whole layer is off.
    expect(prisma.teyAiUsage.aggregate).not.toHaveBeenCalled();
  });

  it('allows a call inside every limit', async () => {
    await expect(service.check('NUDGE_COPY', 'u1')).resolves.toEqual({
      allow: true,
    });
  });

  it('stops spending once the daily budget is reached', async () => {
    process.env.TEY_AI_DAILY_BUDGET_USD = '1';
    prisma.teyAiUsage.aggregate.mockResolvedValue({
      _sum: { costUsd: 1.5, calls: 0 },
    });
    await expect(service.check('NUDGE_COPY', 'u1')).resolves.toEqual({
      allow: false,
      reason: 'GLOBAL_BUDGET',
    });
  });

  it('caps proactive messages so a scheduler loop cannot run up a bill', async () => {
    process.env.TEY_AI_MAX_PROACTIVE_DAY = '10';
    prisma.teyAiUsage.aggregate.mockResolvedValue({
      _sum: { costUsd: 0, calls: 25 },
    });
    await expect(service.check('NUDGE_COPY', 'u1')).resolves.toEqual({
      allow: false,
      reason: 'PROACTIVE_CAP',
    });
  });

  it('computes cost from token counts and per-1k rates', async () => {
    await service.record(
      'p1',
      'NUDGE_COPY',
      { inputTokens: 1000, outputTokens: 500 },
      { inputCostPer1k: 0.01, outputCostPer1k: 0.03 },
      'u1',
    );

    const { data } = prisma.teyAiUsage.create.mock.calls[0][0];
    // 1.0 * 0.01 + 0.5 * 0.03 = 0.025
    expect(data.costUsd).toBeCloseTo(0.025, 6);
  });

  it('rolls up rather than inserting a row per call', async () => {
    prisma.teyAiUsage.findFirst.mockResolvedValue({ id: 'existing' });
    await service.record(
      'p1',
      'NUDGE_COPY',
      { inputTokens: 10, outputTokens: 5 },
      { inputCostPer1k: 0, outputCostPer1k: 0 },
      'u1',
    );

    expect(prisma.teyAiUsage.update).toHaveBeenCalled();
    expect(prisma.teyAiUsage.create).not.toHaveBeenCalled();
  });

  it('never fails the request that produced the usage', async () => {
    prisma.teyAiUsage.findFirst.mockRejectedValue(new Error('db down'));
    await expect(
      service.record(
        'p1',
        'NUDGE_COPY',
        { inputTokens: 1, outputTokens: 1 },
        { inputCostPer1k: 0, outputCostPer1k: 0 },
      ),
    ).resolves.toBeUndefined();
  });
});

describe('zodToJsonSchema', () => {
  it('marks optional fields as not required', () => {
    const schema = zodToJsonSchema(
      z.object({ hour: z.number(), minute: z.number().optional() }).strict(),
    );
    expect(schema.required).toEqual(['hour']);
    expect((schema.properties as Record<string, unknown>).minute).toEqual({
      type: 'number',
    });
  });

  it('omits `required` entirely for an empty schema', () => {
    const schema = zodToJsonSchema(z.object({}).strict());
    expect(schema).not.toHaveProperty('required');
  });
});
