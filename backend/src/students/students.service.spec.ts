import {
  buildJourney,
  computeBehavior,
  computeHourBuckets,
  computeLearnerStatus,
  computeNeedsAttentionReasons,
  computeQuizPerformance,
  computeStruggle,
  median,
} from './metrics';

/**
 * Pure-metric tests for the Students feature. No Prisma, no Nest — every
 * input is a fixture and Date.now() is sidestepped by constructing inputs
 * relative to the current moment.
 */

const daysAgo = (n: number) => new Date(Date.now() - n * 24 * 60 * 60 * 1000);

const baseStatusInput = () => ({
  firstEnrolledAt: daysAgo(40),
  lastActivityAt: daysAgo(0) as Date | null,
  daysSinceActive: 0 as number | null,
  streakDays: 0,
  lessonsLast7d: 0,
  courses: [{ completedCount: 3, totalPublished: 10, progressPct: 30 }],
  struggledLessonCount: 0,
  avgQuizScore: null as number | null,
  completedLessonsTotal: 3,
});

describe('computeLearnerStatus precedence', () => {
  it('COMPLETED beats everything', () => {
    const s = baseStatusInput();
    s.courses = [{ completedCount: 10, totalPublished: 10, progressPct: 100 }];
    s.daysSinceActive = 45; // long gone — but completion is the headline fact
    expect(computeLearnerStatus(s)).toBe('COMPLETED');
  });

  it('NEW while fresh AND reachable', () => {
    const s = baseStatusInput();
    s.firstEnrolledAt = daysAgo(5);
    s.completedLessonsTotal = 0;
    s.courses = [{ completedCount: 0, totalPublished: 10, progressPct: 0 }];
    s.daysSinceActive = null; // never studied yet
    expect(computeLearnerStatus(s)).toBe('NEW');
  });

  it('fresh enrollee who vanished falls through to INACTIVE framing', () => {
    const s = baseStatusInput();
    s.firstEnrolledAt = daysAgo(40); // enrolled long ago but...
    s.daysSinceActive = null; // ...never once studied
    s.completedLessonsTotal = 0;
    s.courses = [{ completedCount: 0, totalPublished: 10, progressPct: 0 }];
    expect(computeLearnerStatus(s)).toBe('INACTIVE');
  });

  it('INACTIVE at/after the quiet threshold', () => {
    const s = baseStatusInput();
    s.daysSinceActive = 30;
    expect(computeLearnerStatus(s)).toBe('INACTIVE');
  });

  it('AT_RISK between at-risk floor and inactive ceiling', () => {
    const s = baseStatusInput();
    s.daysSinceActive = 12;
    expect(computeLearnerStatus(s)).toBe('AT_RISK');
  });

  it('HIGHLY_ENGAGED via streak', () => {
    const s = baseStatusInput();
    s.streakDays = 5;
    expect(computeLearnerStatus(s)).toBe('HIGHLY_ENGAGED');
  });

  it('HIGHLY_ENGAGED via weekly volume without streak', () => {
    const s = baseStatusInput();
    s.streakDays = 0;
    s.lessonsLast7d = 6;
    expect(computeLearnerStatus(s)).toBe('HIGHLY_ENGAGED');
  });

  it('NEAR_COMPLETION when a course is >=90% but unfinished', () => {
    const s = baseStatusInput();
    s.courses = [{ completedCount: 9, totalPublished: 10, progressPct: 90 }];
    expect(computeLearnerStatus(s)).toBe('NEAR_COMPLETION');
  });

  it('STRUGGLING when repeated attempts exist', () => {
    const s = baseStatusInput();
    s.struggledLessonCount = 2;
    expect(computeLearnerStatus(s)).toBe('STRUGGLING');
  });

  it('HIGH_PERFORMER on strong quiz average with enough completions', () => {
    const s = baseStatusInput();
    s.avgQuizScore = 92;
    s.completedLessonsTotal = 4;
    expect(computeLearnerStatus(s)).toBe('HIGH_PERFORMER');
  });

  it('ACTIVE is the fallback for reachable learners', () => {
    const s = baseStatusInput();
    expect(computeLearnerStatus(s)).toBe('ACTIVE');
  });
});

describe('computeBehavior', () => {
  const todayKey = new Date().toISOString().slice(0, 10);
  const dayKeyOf = (offset: number) =>
    new Date(Date.parse(`${todayKey}T00:00:00Z`) - offset * 86400000).toISOString().slice(0, 10);

  it('computes weekly pace, session proxy and consistency over a full window', () => {
    const daily = Array.from({ length: 28 }, (_, i) => ({
      date: dayKeyOf(i),
      lessonsCompleted: i % 2 === 0 ? 2 : 0,
      timeSpentSeconds: i % 2 === 0 ? 1800 : 0,
      xpEarned: i % 2 === 0 ? 120 : 0,
    }));
    const b = computeBehavior({ daily, todayKey, memberSinceKey: dayKeyOf(40) });
    expect(b.lessonsPerWeek).toBe(7); // 14 lessons / 4 weeks
    expect(b.activeDaysPerWeek).toBe(3.5); // 14 active days / 4
    expect(b.avgSessionMinutes).toBe(30); // 1800s per active day
    expect(b.consistencyPct).toBe(50); // 14 of 28 eligible days (member whole window)
  });

  it('a learner who joined mid-window is not punished on consistency', () => {
    const daily = [
      { date: dayKeyOf(0), lessonsCompleted: 1, timeSpentSeconds: 600, xpEarned: 60 },
      { date: dayKeyOf(1), lessonsCompleted: 1, timeSpentSeconds: 600, xpEarned: 60 },
    ];
    const b = computeBehavior({ daily, todayKey, memberSinceKey: dayKeyOf(1) });
    expect(b.consistencyPct).toBe(100); // active both days they existed
  });

  it('flags a DOWN pace when recent half collapses', () => {
    const daily = [] as { date: string; lessonsCompleted: number; timeSpentSeconds: number; xpEarned: number }[];
    for (let i = 14; i < 28; i++) daily.push({ date: dayKeyOf(i), lessonsCompleted: 4, timeSpentSeconds: 900, xpEarned: 200 });
    daily.push({ date: dayKeyOf(0), lessonsCompleted: 1, timeSpentSeconds: 300, xpEarned: 50 });
    const b = computeBehavior({ daily, todayKey });
    expect(b.paceTrend).toBe('DOWN');
  });

  it('empty activity yields zeroed metrics without crashing', () => {
    const b = computeBehavior({ daily: [], todayKey });
    expect(b.lessonsPerWeek).toBe(0);
    expect(b.consistencyPct).toBe(0);
    expect(b.avgSessionMinutes).toBe(0);
  });
});

describe('struggle detection', () => {
  it('median handles odd/even/empty', () => {
    expect(median([])).toBeNull();
    expect(median([5])).toBe(5);
    expect(median([1, 9])).toBe(5);
    expect(median([3, 1, 2])).toBe(2);
  });

  it('flags repeated attempts', () => {
    const r = computeStruggle({ attemptsCount: 2, timeSpentSeconds: 100 }, 100);
    expect(r.struggleSpot).toBe(true);
    expect(r.struggleWhy).toContain('ATTEMPTS');
  });

  it('flags time well above the learner median', () => {
    const r = computeStruggle({ attemptsCount: 1, timeSpentSeconds: 600 }, 100);
    expect(r.struggleSpot).toBe(true);
    expect(r.struggleWhy).toContain('TIME');
  });

  it('calm rows are not struggle spots', () => {
    const r = computeStruggle({ attemptsCount: 1, timeSpentSeconds: 120 }, 100);
    expect(r.struggleSpot).toBe(false);
    expect(r.struggleWhy).toBeNull();
  });
});

describe('hour buckets', () => {
  it('buckets UTC hours into six 4h cells', () => {
    const mk = (h: number) => new Date(Date.UTC(2026, 0, 1, h, 0, 0));
    const buckets = computeHourBuckets([mk(1), mk(5), mk(5), mk(23)]);
    expect(buckets.map((b) => b.count)).toEqual([1, 2, 0, 0, 0, 1]);
  });
});

describe('quiz performance', () => {
  it('improvement trend compares second half vs first half', () => {
    const pts = [50, 50, 90, 90].map((score, i) => ({
      completedAt: daysAgo(10 - i),
      lessonTitle: `L${i}`,
      courseTitle: 'C',
      score,
    }));
    const r = computeQuizPerformance(pts);
    expect(r.improvementTrendPct).toBe(80); // 90 vs 50
    expect(r.timeline.length).toBe(4);
  });

  it('returns null trend below 4 data points', () => {
    const r = computeQuizPerformance([
      { completedAt: daysAgo(1), lessonTitle: 'L', courseTitle: 'C', score: 60 },
    ]);
    expect(r.improvementTrendPct).toBeNull();
  });
});

describe('needs attention reasons', () => {
  it('GONE_QUIET requires prior learning and sits inside the window', () => {
    const neverStarted = computeNeedsAttentionReasons({
      daysSinceActive: 10,
      startedLearning: false,
      stalledLessonStartedAt: null,
      failingQuizAttempts: null,
      failingQuizScore: null,
      nearCompletionPct: null,
    });
    expect(neverStarted).not.toContain('GONE_QUIET');

    const tooLong = computeNeedsAttentionReasons({
      daysSinceActive: 45,
      startedLearning: true,
      stalledLessonStartedAt: null,
      failingQuizAttempts: null,
      failingQuizScore: null,
      nearCompletionPct: null,
    });
    expect(tooLong).not.toContain('GONE_QUIET'); // inactive territory, not attention
  });

  it('STUCK_LESSON only after the stall window', () => {
    const fresh = computeNeedsAttentionReasons({
      daysSinceActive: 0,
      startedLearning: true,
      stalledLessonStartedAt: daysAgo(1),
      failingQuizAttempts: null,
      failingQuizScore: null,
      nearCompletionPct: null,
    });
    expect(fresh).not.toContain('STUCK_LESSON');

    const stale = computeNeedsAttentionReasons({
      daysSinceActive: 2,
      startedLearning: true,
      stalledLessonStartedAt: daysAgo(9),
      failingQuizAttempts: null,
      failingQuizScore: null,
      nearCompletionPct: null,
    });
    expect(stale).toContain('STUCK_LESSON');
  });

  it('FAILING_QUIZ needs both attempts and low score', () => {
    const hit = computeNeedsAttentionReasons({
      daysSinceActive: 0,
      startedLearning: true,
      stalledLessonStartedAt: null,
      failingQuizAttempts: 3,
      failingQuizScore: 40,
      nearCompletionPct: null,
    });
    expect(hit).toContain('FAILING_QUIZ');

    const passingDespiteAttempts = computeNeedsAttentionReasons({
      daysSinceActive: 0,
      startedLearning: true,
      stalledLessonStartedAt: null,
      failingQuizAttempts: 5,
      failingQuizScore: 85,
      nearCompletionPct: null,
    });
    expect(passingDespiteAttempts).not.toContain('FAILING_QUIZ');
  });

  it('ALMOST_THERE fires at the near-completion threshold', () => {
    const hit = computeNeedsAttentionReasons({
      daysSinceActive: 1,
      startedLearning: true,
      stalledLessonStartedAt: null,
      failingQuizAttempts: null,
      failingQuizScore: null,
      nearCompletionPct: 91,
    });
    expect(hit).toContain('ALMOST_THERE');
  });
});

describe('buildJourney', () => {
  it('sorts ascending and caps keeping the most recent tail', () => {
    const events = Array.from({ length: 150 }, (_, i) => ({
      at: daysAgo(200 - i),
      kind: 'LESSON_COMPLETED' as const,
      label: `Lesson ${i}`,
    }));
    const j = buildJourney(events);
    expect(j.truncated).toBe(true);
    expect(j.events.length).toBe(100);
    expect(j.events[0].label).toBe('Lesson 50'); // earliest KEPT
    const times = j.events.map((e) => Date.parse(e.at));
    expect([...times].sort((a, b) => a - b)).toEqual(times);
  });

  it('no truncation under the cap', () => {
    const j = buildJourney([{ at: daysAgo(1), kind: 'ENROLLED', label: 'Enrolled' }]);
    expect(j.truncated).toBe(false);
    expect(j.events.length).toBe(1);
  });
});
