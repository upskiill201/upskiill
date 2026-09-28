import { ForbiddenException } from '@nestjs/common';
import { CoursePulseService, lessonExercises } from './course-pulse.service';

/**
 * The creator's course pulse on a small fixture course (two units, four
 * lessons, five learners):
 *
 *   ana   finished everything, active today
 *   ben   finished lesson 1, quiet 10 days       → stalls at lesson 2
 *   cal   finished lesson 1, quiet 12 days       → stalls at lesson 2
 *   dee   enrolled 20 days ago, opened lesson 1, quit at exercise 2
 *   eve   finished lessons 1–2, on lesson 3 today → "on it now", almost done
 */

const DAY = 24 * 3600 * 1000;
const ago = (days: number) => new Date(Date.now() - days * DAY);

const apply = (ids: string[]) => [{ type: 'exercises', value: { items: ids.map((id, i) => ({ id, kind: 'mcq', variant: 'standard', prompt: `Question ${i + 1}` })) } }];

const lessons = (ids: string[]) =>
  ids.map((id) => ({
    id,
    title: `Lesson ${id}`,
    isFreePreview: false,
    estimatedDurationSeconds: 300,
    durationMinutes: 0,
    contentBlocks: { apply: apply(['x1', 'x2']) },
  }));

type Row = {
  userId: string;
  lessonId: string;
  startedAt: Date | null;
  completedAt: Date | null;
  updatedAt: Date;
  timeSpentSeconds: number;
  quizScore: number | null;
  openCount: number;
  quitCount: number;
  lastStepId: string | null;
  missedBlockIds: string[];
};
const done = (userId: string, lessonId: string, daysAgo: number, quizScore: number | null = 90, missed: string[] = []): Row => ({
  userId,
  lessonId,
  startedAt: ago(daysAgo),
  completedAt: ago(daysAgo),
  updatedAt: ago(daysAgo),
  timeSpentSeconds: 360,
  quizScore,
  openCount: 1,
  quitCount: 0,
  lastStepId: null,
  missedBlockIds: missed,
});

function build({ owner = 'creator' } = {}) {
  const rows: Row[] = [
    done('ana', 'l1', 20, 100, []),
    done('ana', 'l2', 15),
    done('ana', 'l3', 5),
    done('ana', 'l4', 0),
    done('ben', 'l1', 10, 50, ['x1']),
    done('cal', 'l1', 12, 60, []), // a pre-tracking completion: misses unknown
    { ...done('dee', 'l1', 19, null), completedAt: null, quitCount: 1, lastStepId: 'apply:x2' },
    done('eve', 'l1', 3, 80, ['x2']),
    done('eve', 'l2', 1),
    { ...done('eve', 'l3', 0, null), completedAt: null },
  ];
  const users = ['ana', 'ben', 'cal', 'dee', 'eve'].map((id) => ({
    id,
    fullName: id.toUpperCase(),
    avatarUrl: null,
    timezone: null,
    timezoneOffsetMinutes: 0,
  }));
  const prisma: any = {
    course: {
      findFirst: jest.fn().mockResolvedValue({
        id: 'c1',
        title: 'Python',
        price: 10,
        published: true,
        instructorId: owner,
        category: 'Coding',
        thumbnailUrl: null,
        community: { id: 'comm', memberCount: 4 },
      }),
    },
    section: {
      findMany: jest.fn().mockResolvedValue([
        { id: 's1', title: 'Basics', lessons: lessons(['l1', 'l2', 'l3']) },
        { id: 's2', title: 'Next', lessons: lessons(['l4']) },
      ]),
    },
    enrollment: {
      findMany: jest.fn().mockResolvedValue([
        { userId: 'ana', completedLessons: ['l1', 'l2', 'l3', 'l4'], createdAt: ago(25) },
        { userId: 'ben', completedLessons: ['l1'], createdAt: ago(14) },
        { userId: 'cal', completedLessons: ['l1'], createdAt: ago(14) },
        { userId: 'dee', completedLessons: [], createdAt: ago(20) },
        { userId: 'eve', completedLessons: ['l1', 'l2'], createdAt: ago(4) },
      ]),
    },
    userLessonProgress: { findMany: jest.fn().mockResolvedValue(rows) },
    courseAccessEntitlement: { findMany: jest.fn().mockResolvedValue([]) },
    review: { findMany: jest.fn().mockResolvedValue([]) },
    creatorNudge: { findMany: jest.fn().mockResolvedValue([]) },
    post: {
      findMany: jest.fn().mockImplementation(({ where }: any) =>
        Promise.resolve(where.postType === 'QUESTION' ? [{ id: 'q1' }, { id: 'q2' }] : []),
      ),
      count: jest.fn().mockResolvedValue(3),
    },
    user: {
      findMany: jest.fn().mockImplementation(({ where }: any) =>
        Promise.resolve(users.filter((u) => where.id.in.includes(u.id))),
      ),
    },
  };
  return { service: new CoursePulseService(prisma), prisma };
}

describe('lessonExercises', () => {
  it('reads v2 exercises with their variant, and v1 questions as multiple choice', () => {
    expect(
      lessonExercises([{ type: 'exercises', value: { items: [{ id: 'a', kind: 'mcq', variant: 'predictOutput', prompt: 'What prints?' }, { id: 'b', kind: 'findBug', prompt: 'Spot it' }] } }]),
    ).toEqual([
      { id: 'a', kind: 'predictOutput', prompt: 'What prints?' },
      { id: 'b', kind: 'findBug', prompt: 'Spot it' },
    ]);
    expect(lessonExercises([{ type: 'mcqActivity', value: { questions: [{ id: 'q', questionText: 'Why?' }] } }])).toEqual([
      { id: 'q', kind: 'mcq', prompt: 'Why?' },
    ]);
    expect(lessonExercises(undefined)).toEqual([]);
  });
});

describe('CoursePulseService.getPulse', () => {
  it('refuses someone else’s course', async () => {
    const { service } = build({ owner: 'someone-else' });
    await expect(service.getPulse('creator', 'c1', 30, false)).rejects.toBeInstanceOf(ForbiddenException);
  });

  it('annotates the path: the stall, who is on a lesson now, and finish rates', async () => {
    const { service } = build();
    const p = await service.getPulse('creator', 'c1', 30, false);
    const path = p.path.units.flatMap((u) => u.lessons);

    expect(p.path.units.map((u) => u.lessons.length)).toEqual([3, 1]);
    expect(path.map((l) => l.isFree)).toEqual([true, true, false, false]);

    const l2 = path[1];
    expect(l2.stoppedHere).toBe(2); // ben + cal
    expect(l2.flag).toBe('drop');
    expect(l2.reached).toBe(4); // everyone but dee got past lesson 1

    const l3 = path[2];
    expect(l3.hereNowCount).toBe(1);
    expect(l3.hereNow.map((f) => f.id)).toEqual(['eve']);
    expect(l3.opened).toBe(2);
    expect(l3.finished).toBe(1);
    expect(l3.finishRatePct).toBe(50);

    const l1 = path[0];
    expect(l1.opened).toBe(5);
    expect(l1.finished).toBe(4);
    expect(l1.quits).toBe(1);
  });

  it('counts per-course totals', async () => {
    const { service } = build();
    const p = await service.getPulse('creator', 'c1', 30, false);
    expect(p.totals.learners).toBe(5);
    expect(p.totals.startedLearners).toBe(5); // dee opened a lesson
    expect(p.totals.finishedCourse).toBe(1);
    expect(p.totals.completionRatePct).toBe(20);
    expect(p.totals.newLearners.value).toBe(5);
    expect(p.community).toEqual({ id: 'comm', members: 4, postsInRange: 3, unanswered: 2 });
  });

  it('turns what needs the creator into callouts, most urgent first', async () => {
    const { service } = build();
    const p = await service.getPulse('creator', 'c1', 30, false);
    const ids = p.callouts.map((c) => c.id);
    expect(ids[0]).toBe('drop-l2');

    const quiet = p.callouts.find((c) => c.id === 'quiet')!;
    expect(quiet.action?.kind).toBe('nudge');
    expect(new Set(quiet.action?.learnerIds)).toEqual(new Set(['ben', 'cal', 'dee']));

    const almost = p.callouts.find((c) => c.id === 'almost')!;
    expect(almost.action?.learnerIds).toEqual(['eve']);

    expect(ids).toContain('questions');
  });

  it('leaves out learners the creator nudged in the last 3 days', async () => {
    const { service, prisma } = build();
    prisma.creatorNudge.findMany.mockResolvedValue([{ learnerId: 'ben', kind: 'NUDGE', createdAt: ago(1) }]);
    const p = await service.getPulse('creator', 'c1', 30, false);
    const quiet = p.callouts.find((c) => c.id === 'quiet')!;
    expect(quiet.action?.learnerIds).not.toContain('ben');
  });
});

describe('CoursePulseService.getLessonInsight', () => {
  it('counts first-try misses only from rows that can prove them, and shows where the unfinished stopped', async () => {
    const { service } = build();
    const d = await service.getLessonInsight('creator', 'c1', 'l1', false);

    // ana (100%, none missed), ben (missed x1), eve (missed x2) are evidence;
    // cal (60%, no recorded misses) predates tracking and is left out.
    expect(d.accuracy.samples).toBe(3);
    expect(d.accuracy.perfectPct).toBe(33);
    expect(d.exercises.map((e) => [e.id, e.missed, e.missRatePct])).toEqual([
      ['x1', 1, 33],
      ['x2', 1, 33],
    ]);

    expect(d.stops).toEqual([{ key: 'apply:x2', phase: 'apply', label: 'Exercise 2', order: 1002, count: 1 }]);
    expect(d.stuck.map((s: any) => [s.id, s.stoppedAt])).toEqual([['dee', 'Exercise 2']]);
    expect(d.funnel).toMatchObject({ opened: 5, finished: 4, finishRatePct: 80, stuckNow: 1, quits: 1 });
    expect(d.lesson).toMatchObject({ index: 0, total: 4, prev: null, next: { id: 'l2', title: 'Lesson l2' } });
  });
});
