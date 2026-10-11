import { FirstLessonJourney, FIRST_LESSON_JOURNEY } from './first-lesson.journey';

jest.mock('../../common/first-lesson.util', () => ({
  firstLessonState: jest.fn().mockResolvedValue({ eligible: true }),
}));

const HOUR = 3_600_000;

function build() {
  const prisma: any = {
    teyScheduledAction: { findUnique: jest.fn().mockResolvedValue(null), findFirst: jest.fn().mockResolvedValue(null) },
    user: { findUnique: jest.fn().mockResolvedValue({ timezone: 'UTC', timezoneOffsetMinutes: 0 }) },
    enrollment: { findMany: jest.fn() },
  };
  const actions: any = { upsertIntent: jest.fn() };
  const emailJobs: any = { enqueue: jest.fn() };
  const journey = new FirstLessonJourney(prisma, actions, {} as any, emailJobs);
  return { journey, prisma, actions, emailJobs };
}

describe('FirstLessonJourney.start', () => {
  it('queues the whole ladder for a fresh enrolment', async () => {
    const { journey, actions, emailJobs } = build();
    const now = new Date('2026-10-11T10:00:00Z');
    expect(await journey.start('u1', 'c1', now, now)).toBe(true);
    expect(actions.upsertIntent).toHaveBeenCalledTimes(4);
    expect(emailJobs.enqueue).toHaveBeenCalledTimes(4);
    expect(actions.upsertIntent.mock.calls[0][1].ruleId).toBe(FIRST_LESSON_JOURNEY);
  });

  it('a late start skips what is already past, but still welcomes someone who joined today', async () => {
    const { journey, actions, emailJobs } = build();
    const enrolled = new Date('2026-10-11T08:00:00Z');
    const now = new Date(enrolled.getTime() + 10 * HOUR);
    await journey.start('u1', 'c1', enrolled, now);
    // push at +3h is gone; +22h, day 3, day 6 remain
    expect(actions.upsertIntent).toHaveBeenCalledTimes(3);
    const stages = emailJobs.enqueue.mock.calls.map((c: any[]) => c[0].payload.stage);
    expect(stages).toEqual([0, 1, 2, 3]);
    expect(emailJobs.enqueue.mock.calls[0][0].dueAt.getTime()).toBeGreaterThanOrEqual(now.getTime());
  });

  it('never starts twice', async () => {
    const { journey, prisma, actions } = build();
    prisma.teyScheduledAction.findFirst.mockResolvedValue({ id: 'x' });
    expect(await journey.start('u1', 'c1', new Date(), new Date())).toBe(false);
    expect(actions.upsertIntent).not.toHaveBeenCalled();
  });
});
