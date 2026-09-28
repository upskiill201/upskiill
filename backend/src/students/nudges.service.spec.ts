import { NotFoundException } from '@nestjs/common';
import { NudgesService } from './nudges.service';

/**
 * Creator nudges and cheers: only the creator's own enrolled learners, never
 * twice inside the cooldown, personalised per learner, and deep-linked to
 * each learner's next lesson.
 */

const course = {
  id: 'course-1',
  title: 'Python Basics',
  sections: [
    { lessons: [{ id: 'l1' }, { id: 'l2' }] },
    { lessons: [{ id: 'l3' }] },
  ],
};

function build(overrides: Partial<Record<string, jest.Mock>> = {}) {
  const prisma: any = {
    course: { findFirst: jest.fn().mockResolvedValue(course) },
    enrollment: {
      findMany: jest.fn().mockResolvedValue([
        { userId: 'ada', completedLessons: ['l1'], user: { fullName: 'Ada Lovelace', timezone: null, timezoneOffsetMinutes: null } },
        { userId: 'bo', completedLessons: ['l1', 'l2'], user: { fullName: 'Bo', timezone: null, timezoneOffsetMinutes: null } },
        { userId: 'cy', completedLessons: ['l1', 'l2', 'l3'], user: { fullName: 'Cy Young', timezone: null, timezoneOffsetMinutes: null } },
      ]),
    },
    creatorNudge: {
      findMany: jest.fn().mockResolvedValue([]),
      createMany: jest.fn().mockResolvedValue({ count: 0 }),
    },
    user: { findUnique: jest.fn().mockResolvedValue({ fullName: 'Grace Hopper' }) },
    ...overrides,
  };
  const notifications = { createMany: jest.fn().mockResolvedValue(undefined) };
  const policy = { allowsDirectPush: jest.fn().mockResolvedValue(false) };
  const push = { sendPlain: jest.fn().mockResolvedValue(true) };
  const pulse = { forgetBadges: jest.fn() };
  const service = new NudgesService(prisma, notifications as any, policy as any, push as any, pulse as any);
  return { service, prisma, notifications, policy, push, pulse };
}

describe('NudgesService.send', () => {
  it('refuses a course the caller does not own', async () => {
    const { service } = build({ course: { findFirst: jest.fn().mockResolvedValue(null) } } as any);
    await expect(
      service.send('creator-1', { courseId: 'x', learnerIds: ['ada'], kind: 'NUDGE', message: 'Hi' }),
    ).rejects.toBeInstanceOf(NotFoundException);
  });

  it('personalises {first}, links each learner to their next lesson, and writes a notification each', async () => {
    const { service, prisma, notifications, pulse } = build();
    const res = await service.send('creator-1', {
      courseId: 'course-1',
      learnerIds: ['ada', 'bo', 'cy'],
      kind: 'NUDGE',
      message: 'Hey {first}, lesson time!',
    });
    expect(res).toEqual({ sent: 3, skipped: [] });

    const rows = prisma.creatorNudge.createMany.mock.calls[0][0].data;
    expect(rows.map((r: any) => r.message)).toEqual(['Hey Ada, lesson time!', 'Hey Bo, lesson time!', 'Hey Cy, lesson time!']);

    const links = notifications.createMany.mock.calls[0][0].map((n: any) => n.deepLink);
    expect(links).toEqual([
      '/learn/course-1/section/0?lesson=l2', // Ada finished l1
      '/learn/course-1/section/1?lesson=l3', // Bo finished the first unit
      '/learn/course-1', // Cy finished everything
    ]);
    expect(notifications.createMany.mock.calls[0][0][0]).toMatchObject({
      type: 'CREATOR_NUDGE',
      actorId: 'creator-1',
      body: 'Hey Ada, lesson time!',
    });
    expect(pulse.forgetBadges).toHaveBeenCalledWith('creator-1');
  });

  it('skips learners nudged inside the cooldown and anyone not enrolled', async () => {
    const { service, prisma } = build({
      enrollment: {
        findMany: jest.fn().mockResolvedValue([
          { userId: 'ada', completedLessons: [], user: { fullName: 'Ada', timezone: null, timezoneOffsetMinutes: null } },
          { userId: 'bo', completedLessons: [], user: { fullName: 'Bo', timezone: null, timezoneOffsetMinutes: null } },
        ]),
      },
      creatorNudge: {
        findMany: jest.fn().mockResolvedValue([{ learnerId: 'bo' }]),
        createMany: jest.fn().mockResolvedValue({ count: 0 }),
      },
    } as any);
    const res = await service.send('creator-1', {
      courseId: 'course-1',
      learnerIds: ['ada', 'bo', 'stranger'],
      kind: 'NUDGE',
      message: 'Come back {first}',
    });
    expect(res.sent).toBe(1);
    expect(prisma.creatorNudge.createMany.mock.calls[0][0].data.map((r: any) => r.learnerId)).toEqual(['ada']);
    expect(res.skipped).toEqual(
      expect.arrayContaining([
        { learnerId: 'bo', reason: 'RECENT' },
        { learnerId: 'stranger', reason: 'NOT_ENROLLED' },
      ]),
    );
    const cooldownQuery = prisma.creatorNudge.findMany.mock.calls[0][0].where;
    expect(cooldownQuery.kind).toBe('NUDGE');
    // 72 hours back, give or take the test's own runtime
    expect(Date.now() - cooldownQuery.createdAt.gte.getTime()).toBeGreaterThan(71 * 3600_000);
  });

  it('uses the shorter cheer cooldown and never nudges the creator themself', async () => {
    const { service, prisma } = build();
    await service.send('ada', { courseId: 'course-1', learnerIds: ['ada', 'bo'], kind: 'CHEER', message: 'Go {first}!' });
    const where = prisma.creatorNudge.findMany.mock.calls[0][0].where;
    expect(where.learnerId.in).toEqual(['bo']);
    expect(Date.now() - where.createdAt.gte.getTime()).toBeLessThan(25 * 3600_000);
  });

  it('writes nothing when everyone is inside the cooldown', async () => {
    const { service, prisma, notifications } = build({
      creatorNudge: {
        findMany: jest.fn().mockResolvedValue([{ learnerId: 'ada' }, { learnerId: 'bo' }, { learnerId: 'cy' }]),
        createMany: jest.fn(),
      },
    } as any);
    const res = await service.send('creator-1', {
      courseId: 'course-1',
      learnerIds: ['ada', 'bo', 'cy'],
      kind: 'NUDGE',
      message: 'Hi',
    });
    expect(res.sent).toBe(0);
    expect(prisma.creatorNudge.createMany).not.toHaveBeenCalled();
    expect(notifications.createMany).not.toHaveBeenCalled();
  });

  it('pushes only to learners whose reminder settings allow it', async () => {
    const { service, policy, push } = build();
    policy.allowsDirectPush.mockImplementation(async (u: { id: string }) => u.id === 'bo');
    await service.send('creator-1', { courseId: 'course-1', learnerIds: ['ada', 'bo'], kind: 'CHEER', message: 'Nice {first}' });
    await new Promise((r) => setImmediate(r));
    expect(policy.allowsDirectPush).toHaveBeenCalledWith(expect.objectContaining({ id: 'ada' }), 'milestones');
    expect(push.sendPlain).toHaveBeenCalledTimes(1);
    expect(push.sendPlain).toHaveBeenCalledWith('bo', expect.objectContaining({ title: 'Grace Hopper · Python Basics', body: 'Nice Bo' }));
  });
});
