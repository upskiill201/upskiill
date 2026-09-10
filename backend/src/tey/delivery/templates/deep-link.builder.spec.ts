import type { TeyTarget } from '../../contracts/tey-state.types';
import type { TeyContext } from '../../contracts/tey-context.types';
import { buildDeepLink } from './deep-link.builder';
import { renderTemplate, inboxTypeFor, tagFor } from './message-templates';

describe('buildDeepLink', () => {
  it('targets the exact lesson, not just the course', () => {
    // The whole point of spec section 13: a push must not dump the learner on
    // the home screen and make them find their own way back.
    const url = buildDeepLink(
      { type: 'LESSON', courseId: 'c1', sectionIndex: 2, lessonId: 'l9' },
      'd1',
    );
    expect(url).toBe('/learn/c1/section/2?lesson=l9&tey=d1');
  });

  it.each<[string, TeyTarget, string]>([
    ['COURSE', { type: 'COURSE', courseId: 'c1' }, '/learn/c1?tey=d1'],
    ['STREAK', { type: 'STREAK' }, '/dashboard?tey=d1'],
    ['HOME', { type: 'HOME' }, '/dashboard?tey=d1'],
  ])('handles a %s target', (_label, target, expected) => {
    expect(buildDeepLink(target, 'd1')).toBe(expected);
  });

  it('always produces a same-origin relative path', () => {
    const targets: TeyTarget[] = [
      { type: 'LESSON', courseId: 'c', sectionIndex: 0, lessonId: 'l' },
      { type: 'COURSE', courseId: 'c' },
      { type: 'STREAK' },
      { type: 'HOME' },
    ];
    for (const t of targets) {
      const url = buildDeepLink(t, 'd1');
      expect(url.startsWith('/')).toBe(true);
      expect(url.startsWith('//')).toBe(false);
      expect(url).not.toMatch(/^https?:/);
    }
  });

  it('always carries the attribution token', () => {
    const targets: TeyTarget[] = [
      { type: 'LESSON', courseId: 'c', sectionIndex: 0, lessonId: 'l' },
      { type: 'COURSE', courseId: 'c' },
      { type: 'HOME' },
    ];
    for (const t of targets) {
      expect(buildDeepLink(t, 'abc')).toContain('tey=abc');
    }
  });

  it('escapes ids so they cannot smuggle extra query params', () => {
    const url = buildDeepLink(
      { type: 'LESSON', courseId: 'c1', sectionIndex: 0, lessonId: 'l&evil=1' },
      'd1',
    );
    expect(url).toContain('lesson=l%26evil%3D1');
    expect(url.match(/evil=1/)).toBeNull();
  });
});

describe('message templates', () => {
  const facts: TeyContext['facts'] = {
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
    hoursUntilLocalMidnight: 2,
    daysSinceLastActivity: 1,
  };

  const ctx = (over: Partial<TeyContext> = {}): TeyContext =>
    ({
      v: 1,
      reason: 'STREAK_AT_RISK',
      urgency: 'HIGH',
      learnerState: {
        engagement: 'ACTIVE',
        streak: 'STREAK_AT_RISK',
        performance: 'STABLE',
        course: 'IN_PROGRESS',
      },
      facts,
      recommendedAction: 'COMPLETE_LESSON',
      target: { type: 'HOME' },
      tone: 'URGENT_PLAYFUL',
      teyState: 'STREAK_AT_RISK',
      ignoredNudgeStreak: 0,
      ...over,
    }) as TeyContext;

  it('is deterministic for one learner on one day', () => {
    // Keeps a retry idempotent and the dry-run ledger reproducible.
    const a = renderTemplate(ctx(), 'u1', '2026-09-04');
    const b = renderTemplate(ctx(), 'u1', '2026-09-04');
    expect(a).toEqual(b);
  });

  it('varies across days so consecutive evenings do not read identically', () => {
    const days = ['2026-09-01', '2026-09-02', '2026-09-03', '2026-09-04', '2026-09-05'];
    const titles = new Set(days.map((d) => renderTemplate(ctx(), 'u1', d).title));
    expect(titles.size).toBeGreaterThan(1);
  });

  it('uses real facts rather than placeholders', () => {
    const { title, body } = renderTemplate(ctx(), 'u1', '2026-09-04');
    expect(`${title} ${body}`).toContain('12');
  });

  it('switches to teasing copy only when the tone says so', () => {
    const calm = renderTemplate(ctx(), 'u1', '2026-09-04');
    const teasing = renderTemplate(
      ctx({ tone: 'PLAYFUL_PASSIVE_AGGRESSIVE' }),
      'u1',
      '2026-09-04',
    );
    expect(teasing).not.toEqual(calm);
  });

  it('stays inside push length budgets for every reason', () => {
    // Android and iOS truncate mid-sentence past roughly these limits.
    const reasons: TeyContext['reason'][] = [
      'STREAK_AT_RISK',
      'STREAK_CRITICAL',
      'DAILY_GOAL_INCOMPLETE',
      'INACTIVE_RETURN',
      'MILESTONE',
      'STREAK_LOST',
      'LESSON_ABANDONED',
      'COURSE_NEAR_COMPLETION',
      'PROGRESS_CELEBRATION',
    ];

    for (const reason of reasons) {
      for (const day of ['2026-09-01', '2026-09-02', '2026-09-03']) {
        const { title, body } = renderTemplate(ctx({ reason }), 'u1', day);
        expect(title.length).toBeLessThanOrEqual(60);
        expect(body.length).toBeLessThanOrEqual(140);
        expect(title.length).toBeGreaterThan(0);
        expect(body.length).toBeGreaterThan(0);
      }
    }
  });

  it('copes with a learner who has no course yet', () => {
    const { body } = renderTemplate(
      ctx({ reason: 'INACTIVE_RETURN', facts: { ...facts, courseTitle: null } }),
      'u1',
      '2026-09-04',
    );
    expect(body).not.toContain('null');
    expect(body).not.toContain('undefined');
  });

  it('guilt-trips the streak, never the learner as a person', () => {
    // Tey is a dramatic, guilt-tripping owl about the STREAK — "I'm not mad,
    // I'm disappointed" is deliberately in the copy. What must never appear is
    // an attack on the learner's character, intelligence, or worth. That line
    // (streak vs. person) is the one the personality spec actually draws.
    const banned = [
      'lazy', 'pathetic', 'stupid', 'useless', 'worthless', 'idiot',
      'you never', 'always quit', 'bad at this', 'give up on you',
    ];

    const reasons: TeyContext['reason'][] = [
      'STREAK_AT_RISK',
      'STREAK_CRITICAL',
      'DAILY_GOAL_INCOMPLETE',
      'INACTIVE_RETURN',
      'MILESTONE',
    ];
    const tones: TeyContext['tone'][] = [
      'URGENT_PLAYFUL',
      'PLAYFUL_PASSIVE_AGGRESSIVE',
      'ENCOURAGING',
      'WARM_WELCOME',
    ];

    for (const reason of reasons) {
      for (const tone of tones) {
        for (const day of ['2026-09-01', '2026-09-02', '2026-09-03']) {
          const { title, body } = renderTemplate(ctx({ reason, tone }), 'u1', day);
          const text = `${title} ${body}`.toLowerCase();
          for (const word of banned) {
            expect(text).not.toContain(word);
          }
        }
      }
    }
  });

  it('namespaces inbox rows and notification tags', () => {
    expect(inboxTypeFor('STREAK_AT_RISK')).toBe('TEY_STREAK_AT_RISK');
    expect(tagFor('STREAK_AT_RISK')).toBe('tey-STREAK_AT_RISK');
  });
});
