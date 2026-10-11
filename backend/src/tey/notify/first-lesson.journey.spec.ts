import { FirstLessonJourney, FIRST_LESSON_JOURNEY, firstLessonPush } from './first-lesson.journey';
import { FIRST_LESSON_EMAIL, FIRST_LESSON_PUSH, nextStep, stepOffset } from '../../common/nag-cadence';

jest.mock('../../common/first-lesson.util', () => ({
  firstLessonState: jest.fn().mockResolvedValue({ eligible: true }),
}));

const HOUR = 3_600_000;
const DAY = 24 * HOUR;

function build() {
  const used = new Set<string>();
  const prisma: any = {
    teyScheduledAction: {
      findFirst: jest.fn().mockResolvedValue(null),
      findUnique: jest.fn(({ where }: any) => Promise.resolve(used.has(where.dedupeKey) ? { id: 'x' } : null)),
    },
    emailJob: {
      findFirst: jest.fn().mockResolvedValue(null),
      findUnique: jest.fn(({ where }: any) => Promise.resolve(used.has(where.dedupeKey) ? { id: 'x' } : null)),
    },
    user: { findUnique: jest.fn().mockResolvedValue({ timezone: 'UTC', timezoneOffsetMinutes: 0 }) },
  };
  const actions: any = { upsertIntent: jest.fn((_u: string, i: any) => used.add(i.dedupeKey)) };
  const emailJobs: any = { enqueue: jest.fn((j: any) => used.add(j.dedupeKey)) };
  const journey = new FirstLessonJourney(prisma, actions, {} as any, emailJobs);
  return { journey, prisma, actions, emailJobs, used };
}

describe('nag cadence', () => {
  it('never runs out before a year', () => {
    expect(stepOffset(FIRST_LESSON_PUSH, 150)).not.toBeNull();
    const start = new Date('2026-01-01T00:00:00Z');
    expect(nextStep(FIRST_LESSON_PUSH, start, new Date(start.getTime() + 300 * DAY))).not.toBeNull();
    expect(nextStep(FIRST_LESSON_PUSH, start, new Date(start.getTime() + 400 * DAY))).toBeNull();
  });

  it('pushes daily for two weeks, then every other day', () => {
    const offs = Array.from({ length: 20 }, (_, i) => stepOffset(FIRST_LESSON_PUSH, i)! / DAY);
    expect(offs.slice(0, 2).map((d) => Math.round(d * 24))).toEqual([3, 22]);
    expect(offs[3] - offs[2]).toBeCloseTo(1);
    expect(offs[19] - offs[18]).toBeCloseTo(2);
  });

  it('emails thick early, then weekly, then fortnightly', () => {
    const offs = Array.from({ length: 14 }, (_, i) => stepOffset(FIRST_LESSON_EMAIL, i)! / DAY);
    expect(offs[7] - offs[6]).toBeCloseTo(7);
    expect(offs[13] - offs[12]).toBeCloseTo(14);
  });
});

describe('FirstLessonJourney.topUp', () => {
  it('a fresh enrolment queues the first push (3h) and the welcome email (15 min)', async () => {
    const { journey, actions, emailJobs } = build();
    const now = new Date('2026-10-11T10:00:00Z');
    expect(await journey.topUp('u1', 'c1', now, now)).toBe(2);
    expect(actions.upsertIntent.mock.calls[0][1]).toMatchObject({
      ruleId: FIRST_LESSON_JOURNEY,
      dedupeKey: `${FIRST_LESSON_JOURNEY}:u1:c1:1`,
    });
    expect(emailJobs.enqueue.mock.calls[0][0]).toMatchObject({ dedupeKey: 'learning.first-lesson:u1:c1:0', payload: { stage: 0 } });
  });

  it('only ever keeps one step of each pending', async () => {
    const { journey, prisma, actions, emailJobs } = build();
    prisma.teyScheduledAction.findFirst.mockResolvedValue({ id: 'p' });
    prisma.emailJob.findFirst.mockResolvedValue({ id: 'e' });
    expect(await journey.topUp('u1', 'c1', new Date(), new Date())).toBe(0);
    expect(actions.upsertIntent).not.toHaveBeenCalled();
    expect(emailJobs.enqueue).not.toHaveBeenCalled();
  });

  it('after a step is used, the next one comes, never a repeat', async () => {
    const { journey, used, actions } = build();
    const start = new Date('2026-10-01T10:00:00Z');
    used.add(`${FIRST_LESSON_JOURNEY}:u1:c1:1`);
    await journey.topUp('u1', 'c1', start, new Date(start.getTime() + 3 * HOUR));
    expect(actions.upsertIntent.mock.calls[0][1].dedupeKey).toBe(`${FIRST_LESSON_JOURNEY}:u1:c1:2`);
  });

  it('a late start (enrolled weeks ago) picks up at the current rung, with no burst', async () => {
    const { journey, actions, emailJobs } = build();
    const start = new Date('2026-09-01T10:00:00Z');
    const now = new Date(start.getTime() + 30 * DAY);
    await journey.topUp('u1', 'c1', start, now);
    expect(actions.upsertIntent).toHaveBeenCalledTimes(1);
    expect(actions.upsertIntent.mock.calls[0][1].dueAt.getTime()).toBeGreaterThanOrEqual(now.getTime() - HOUR);
    expect(emailJobs.enqueue).toHaveBeenCalledTimes(1);
    expect(emailJobs.enqueue.mock.calls[0][0].payload.stage).toBe('nag');
  });
});

describe('firstLessonPush', () => {
  const info = {
    course: { id: 'c1', title: 'Git Basics', instructorName: 'Team' },
    lesson: { id: 'l1', title: 'Introduction', minutes: 4, sectionIndex: 0 },
    totalLessons: 12,
    lessonPath: '/learn/c1/section/0?lesson=l1',
  };

  it('never claims to be the last nudge, and never leaves a placeholder unfilled', () => {
    for (let stage = 1; stage < 40; stage++) {
      const { title, body } = firstLessonPush(stage, info, 'Tutul');
      expect(`${title} ${body}`).not.toMatch(/\{|\}|last nudge|stop asking/i);
    }
  });
});
