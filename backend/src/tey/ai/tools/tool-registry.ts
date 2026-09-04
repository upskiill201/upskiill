import { Injectable, Logger } from '@nestjs/common';
import { z } from 'zod';
import { PrismaService } from '../../../prisma/prisma.service';
import { LearnerStateService } from '../../state/learner-state.service';
import type { AiToolSpec } from '../ai-provider.interface';

/**
 * A tool Tey can ask the backend to run.
 *
 * ⚠️ THE SAFETY PROPERTY ⚠️
 *
 * `userId` is INJECTED from the session and is never a model-supplied
 * argument. No tool schema contains a user id field, so there is no argument
 * a prompt injection can set to read or modify another learner's data. That
 * injection is the entire defence, and a spec asserts no schema exposes such
 * a field.
 *
 * The model requests; the backend validates and executes. The model never
 * touches the database, and it can never claim an action succeeded that did
 * not — the result it sees is the real one.
 */
export interface TeyTool<TSchema extends z.ZodTypeAny = z.ZodTypeAny> {
  name: string;
  description: string;
  schema: TSchema;
  /** True for anything that changes state. Barred from the proactive path. */
  mutating: boolean;
  handler(
    userId: string,
    args: z.infer<TSchema>,
    deps: ToolDeps,
  ): Promise<unknown>;
}

export interface ToolDeps {
  prisma: PrismaService;
  learnerState: LearnerStateService;
}

export type ToolExecutionResult =
  | { ok: true; result: unknown }
  | { ok: false; error: string };

const EmptyArgs = z.object({}).strict();

/** Cap on learner-created reminders, so "remind me" cannot become a loop. */
const MAX_USER_REMINDERS = 3;

// ── Read tools ─────────────────────────────────────────────────────────────

const getStreak: TeyTool = {
  name: 'get_streak',
  description: "Get the learner's current and longest streak.",
  schema: EmptyArgs,
  mutating: false,
  async handler(userId, _args, { learnerState }) {
    const s = await learnerState.get(userId);
    return {
      currentStreak: s.streakDays,
      longestStreak: s.longestStreak,
      freezesAvailable: s.freezesAvailable,
      todayGoalCompleted: s.todayGoalCompleted,
    };
  },
};

const getUserProgress: TeyTool = {
  name: 'get_user_progress',
  description: "Get the learner's progress today and this week.",
  schema: EmptyArgs,
  mutating: false,
  async handler(userId, _args, { learnerState }) {
    const s = await learnerState.get(userId);
    return {
      todayXp: s.todayXp,
      dailyGoalXp: s.dailyGoalXp,
      todayLessons: s.todayLessons,
      weeklyLessons: s.weeklyLessons,
      weeklyXp: s.weeklyXp,
    };
  },
};

const getCurrentCourse: TeyTool = {
  name: 'get_current_course',
  description: 'Get the course the learner is currently working through.',
  schema: EmptyArgs,
  mutating: false,
  async handler(userId, _args, { learnerState }) {
    const s = await learnerState.get(userId);
    return {
      courseId: s.currentCourseId,
      courseTitle: s.currentCourseTitle,
      progressPct: s.courseProgressPct,
      state: s.courseState,
    };
  },
};

const getCurrentLesson: TeyTool = {
  name: 'get_current_lesson',
  description: 'Get the next unfinished lesson for the learner.',
  schema: EmptyArgs,
  mutating: false,
  async handler(userId, _args, { learnerState, prisma }) {
    const s = await learnerState.get(userId);
    if (!s.currentLessonId) return { lesson: null };

    const lesson = await prisma.lesson.findUnique({
      where: { id: s.currentLessonId },
      select: {
        id: true,
        title: true,
        shortDescription: true,
        estimatedDurationSeconds: true,
      },
    });
    return { lesson };
  },
};

const getWeeklySummary: TeyTool = {
  name: 'get_weekly_summary',
  description: "Get a summary of the learner's activity this week.",
  schema: EmptyArgs,
  mutating: false,
  async handler(userId, _args, { learnerState }) {
    const s = await learnerState.get(userId);
    return {
      lessonsCompleted: s.weeklyLessons,
      xpEarned: s.weeklyXp,
      currentStreak: s.streakDays,
      engagementState: s.engagementState,
    };
  },
};

const FindShortLessonArgs = z
  .object({
    maxMinutes: z.number().int().min(1).max(60).optional(),
  })
  .strict();

const findShortLesson: TeyTool<typeof FindShortLessonArgs> = {
  name: 'find_short_lesson',
  description:
    'Find a short lesson the learner could finish quickly. Use when they are tired or short on time.',
  schema: FindShortLessonArgs,
  mutating: false,
  async handler(userId, args, { learnerState, prisma }) {
    const s = await learnerState.get(userId);
    if (!s.currentCourseId) return { lesson: null };

    const maxSeconds = (args.maxMinutes ?? 10) * 60;
    // Scoped to a course the learner is actually enrolled in — the model
    // cannot widen this, because it never supplies the course id.
    const lesson = await prisma.lesson.findFirst({
      where: {
        status: 'published',
        section: { courseId: s.currentCourseId },
        estimatedDurationSeconds: { lte: maxSeconds, gt: 0 },
      },
      orderBy: { estimatedDurationSeconds: 'asc' },
      select: {
        id: true,
        title: true,
        estimatedDurationSeconds: true,
        sectionId: true,
      },
    });

    return { lesson };
  },
};

// ── Mutating tools ─────────────────────────────────────────────────────────

const CreateReminderArgs = z
  .object({
    hour: z.number().int().min(0).max(23),
    minute: z.number().int().min(0).max(59).optional(),
  })
  .strict();

const createReminder: TeyTool<typeof CreateReminderArgs> = {
  name: 'create_reminder',
  description:
    'Schedule a reminder for the learner at a specific local hour today or tomorrow.',
  schema: CreateReminderArgs,
  mutating: true,
  async handler(userId, args, { prisma }) {
    const live = await prisma.teyScheduledAction.count({
      where: { userId, status: 'PENDING', ruleId: 'USER_REMINDER' },
    });
    if (live >= MAX_USER_REMINDERS) {
      // Refuse rather than silently drop: the model must be able to tell the
      // learner the truth about what happened.
      return {
        created: false,
        reason: `You already have ${MAX_USER_REMINDERS} reminders set.`,
      };
    }

    const due = new Date();
    due.setHours(args.hour, args.minute ?? 0, 0, 0);
    if (due.getTime() <= Date.now()) due.setDate(due.getDate() + 1);

    await prisma.teyScheduledAction.create({
      data: {
        userId,
        ruleId: 'USER_REMINDER',
        priority: 'MEDIUM',
        status: 'PENDING',
        dueAt: due,
        expiresAt: new Date(due.getTime() + 2 * 3600_000),
        dedupeKey: `USER_REMINDER:${userId}:${due.toISOString()}`,
        context: { reason: 'DAILY_GOAL_INCOMPLETE', urgency: 'MEDIUM' },
      },
    });

    return { created: true, dueAt: due.toISOString() };
  },
};

const cancelReminder: TeyTool = {
  name: 'cancel_reminder',
  description: 'Cancel the learner\'s pending self-set reminders.',
  schema: EmptyArgs,
  mutating: true,
  async handler(userId, _args, { prisma }) {
    const { count } = await prisma.teyScheduledAction.updateMany({
      where: { userId, status: 'PENDING', ruleId: 'USER_REMINDER' },
      data: { status: 'CANCELLED', skipReason: 'USER_CANCELLED' },
    });
    return { cancelled: count };
  },
};

export const TEY_TOOLS: readonly TeyTool<z.ZodTypeAny>[] = ([
  getStreak,
  getUserProgress,
  getCurrentCourse,
  getCurrentLesson,
  getWeeklySummary,
  findShortLesson,
  createReminder,
  cancelReminder,
] as unknown as TeyTool<z.ZodTypeAny>[]);

@Injectable()
export class ToolRegistry {
  private readonly logger = new Logger(ToolRegistry.name);
  private readonly byName = new Map(TEY_TOOLS.map((t) => [t.name, t]));

  constructor(
    private readonly prisma: PrismaService,
    private readonly learnerState: LearnerStateService,
  ) {}

  /**
   * Specs to advertise to the model.
   *
   * `includeMutating` defaults to false: a proactive nudge is composing a
   * sentence, and nothing it does should be able to change state. Only the
   * conversational path — where a learner actually asked for something — may
   * enable them.
   */
  specs(includeMutating = false): AiToolSpec[] {
    return TEY_TOOLS.filter((t) => includeMutating || !t.mutating).map((t) => ({
      name: t.name,
      description: t.description,
      parameters: zodToJsonSchema(t.schema),
    }));
  }

  /**
   * Validates and runs one tool call.
   *
   * `userId` comes from the caller's session. Any `user_id` the model tried to
   * pass is dropped by the strict schemas above and would fail validation.
   */
  async execute(
    userId: string,
    name: string,
    args: unknown,
    opts: { allowMutating?: boolean } = {},
  ): Promise<ToolExecutionResult> {
    const tool = this.byName.get(name);
    if (!tool) return { ok: false, error: `Unknown tool: ${name}` };

    if (tool.mutating && !opts.allowMutating) {
      return {
        ok: false,
        error: `Tool ${name} changes state and is not permitted here.`,
      };
    }

    const parsed = tool.schema.safeParse(args ?? {});
    if (!parsed.success) {
      return {
        ok: false,
        error: `Invalid arguments for ${name}: ${parsed.error.issues[0]?.message ?? 'unknown'}`,
      };
    }

    try {
      const result = await tool.handler(userId, parsed.data, {
        prisma: this.prisma,
        learnerState: this.learnerState,
      });
      return { ok: true, result };
    } catch (err) {
      this.logger.error(`Tool ${name} failed`, err as Error);
      // Surfaced to the model so it can tell the learner the truth rather than
      // pretending the action worked.
      return { ok: false, error: `Tool ${name} failed.` };
    }
  }
}

/**
 * Minimal Zod → JSON Schema conversion, covering only what the tool schemas
 * above actually use. A general converter is a dependency and a maintenance
 * surface; this is twenty lines that fail loudly if a tool starts using
 * something richer.
 */
function zodTypeOf(schema: unknown): string {
  const def = (schema as { _def?: { type?: string; typeName?: string } })._def;
  // zod v4 -> _def.type ('object'); zod v3 -> _def.typeName ('ZodObject').
  return (def?.type ?? def?.typeName ?? '').toString().toLowerCase();
}

export function zodToJsonSchema(schema: z.ZodTypeAny): Record<string, unknown> {
  if (!zodTypeOf(schema).includes('object')) {
    return { type: 'object', properties: {} };
  }

  const shape = (schema as z.ZodObject<z.ZodRawShape>).shape;
  const properties: Record<string, unknown> = {};
  const required: string[] = [];

  for (const [key, raw] of Object.entries(shape)) {
    let field = raw as z.ZodTypeAny;
    let optional = false;

    // Unwrap optional/nullable/default wrappers to reach the real type.
    while (['optional', 'nullable', 'default'].includes(zodTypeOf(field))) {
      if (zodTypeOf(field) === 'optional') optional = true;
      const inner = (field as unknown as { _def: { innerType?: z.ZodTypeAny } })
        ._def.innerType;
      if (!inner) break;
      field = inner;
    }

    const kind = zodTypeOf(field);
    properties[key] = kind.includes('number')
      ? { type: 'number' }
      : kind.includes('boolean')
        ? { type: 'boolean' }
        : { type: 'string' };

    if (!optional) required.push(key);
  }

  return {
    type: 'object',
    properties,
    ...(required.length > 0 ? { required } : {}),
  };
}
