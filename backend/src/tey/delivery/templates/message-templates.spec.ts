import type { TeyContext, TeyReason } from '../../contracts/tey-context.types';
import { renderTemplate } from './message-templates';

const baseFacts: TeyContext['facts'] = {
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
  hoursUntilLocalMidnight: 4,
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
    facts: baseFacts,
    recommendedAction: 'COMPLETE_LESSON',
    target: { type: 'HOME' },
    tone: 'URGENT_PLAYFUL',
    teyState: 'STREAK_AT_RISK',
    ignoredNudgeStreak: 0,
    ...over,
  }) as TeyContext;

const ALL_REASONS: TeyReason[] = [
  'STREAK_AT_RISK',
  'STREAK_CRITICAL',
  'DAILY_GOAL_INCOMPLETE',
  'INACTIVE_RETURN',
  'MILESTONE',
  'STREAK_LOST',
  'LESSON_ABANDONED',
  'COURSE_NEAR_COMPLETION',
  'PROGRESS_CELEBRATION',
  'STREAK_REPAIR_EXPIRING',
  'FIRST_LESSON',
];

/** Renders the same reason across many userIds on a fixed date, collecting
 *  every distinct title that comes back — a proxy for "does this reason have
 *  its own pool" without reaching into module internals. */
function titlesFor(reason: TeyReason, facts = baseFacts): Set<string> {
  const titles = new Set<string>();
  for (let i = 0; i < 30; i++) {
    const { title } = renderTemplate(
      ctx({ reason, facts }),
      `user-${i}`,
      '2026-09-04',
    );
    titles.add(title);
  }
  return titles;
}

describe('renderTemplate', () => {
  it('produces non-empty copy for every reason', () => {
    for (const reason of ALL_REASONS) {
      const { title, body } = renderTemplate(
        ctx({ reason }),
        'u1',
        '2026-09-04',
      );
      expect(title.length).toBeGreaterThan(0);
      expect(body.length).toBeGreaterThan(0);
    }
  });

  it('stays within the push length backstop across every reason and a spread of facts', () => {
    const factsSpread: TeyContext['facts'][] = [
      baseFacts,
      { ...baseFacts, streakDays: 1 }, // pluralization edge case
      { ...baseFacts, courseTitle: 'A'.repeat(120) }, // long course title
      { ...baseFacts, courseTitle: null },
      { ...baseFacts, weeklyLessons: 0 },
    ];
    for (const reason of ALL_REASONS) {
      for (const facts of factsSpread) {
        const { title, body } = renderTemplate(
          ctx({ reason, facts }),
          'u1',
          '2026-09-04',
        );
        expect(title.length).toBeLessThanOrEqual(60);
        expect(body.length).toBeLessThanOrEqual(140);
      }
    }
  });

  it('never renders "1 days" — every streak-day count is pluralized correctly', () => {
    const singular: TeyContext['facts'] = { ...baseFacts, streakDays: 1 };
    for (const reason of [
      'STREAK_AT_RISK',
      'STREAK_CRITICAL',
      'MILESTONE',
    ] as TeyReason[]) {
      for (let i = 0; i < 15; i++) {
        const { title, body } = renderTemplate(
          ctx({ reason, facts: singular }),
          `user-${i}`,
          '2026-09-04',
        );
        expect(`${title} ${body}`).not.toMatch(/\b1 days\b/);
      }
    }
  });

  it('gives newly-added reasons their own pool rather than reusing another reason’s', () => {
    // Before this pass, STREAK_LOST/LESSON_ABANDONED/COURSE_NEAR_COMPLETION
    // literally pointed at another reason's array by reference, so identical
    // (userId, date) pairs produced identical output. A disjoint title set
    // across 30 seeds is strong evidence that is no longer true.
    const disjointPairs: [TeyReason, TeyReason][] = [
      ['STREAK_LOST', 'INACTIVE_RETURN'],
      ['LESSON_ABANDONED', 'DAILY_GOAL_INCOMPLETE'],
      ['COURSE_NEAR_COMPLETION', 'DAILY_GOAL_INCOMPLETE'],
      ['PROGRESS_CELEBRATION', 'MILESTONE'],
    ];
    for (const [a, b] of disjointPairs) {
      const titlesA = titlesFor(a);
      const titlesB = titlesFor(b);
      const overlap = [...titlesA].filter((t) => titlesB.has(t));
      expect(overlap).toEqual([]);
    }
  });

  it('picks the teasing pool once tone has escalated, and it differs from the calm pool', () => {
    const calm = titlesFor('STREAK_AT_RISK');
    const teasedTitles = new Set<string>();
    for (let i = 0; i < 30; i++) {
      const { title } = renderTemplate(
        ctx({ reason: 'STREAK_AT_RISK', tone: 'PLAYFUL_PASSIVE_AGGRESSIVE' }),
        `user-${i}`,
        '2026-09-04',
      );
      teasedTitles.add(title);
    }
    const overlap = [...calm].filter((t) => teasedTitles.has(t));
    expect(overlap).toEqual([]);
  });

  it('is deterministic for the same learner and day', () => {
    const first = renderTemplate(ctx(), 'u1', '2026-09-04');
    const second = renderTemplate(ctx(), 'u1', '2026-09-04');
    expect(first).toEqual(second);
  });

  const render = (reason: TeyReason, facts: Partial<TeyContext['facts']>) =>
    renderTemplate(ctx({ reason, facts: { ...baseFacts, ...facts } }), 'u1', '2026-09-04');

  it('leads a broken streak with the repair when one is open — real price, real window', () => {
    for (let i = 0; i < 10; i++) {
      const { title, body } = renderTemplate(
        ctx({ reason: 'STREAK_LOST', facts: { ...baseFacts, repairLostStreak: 23, repairCostCoins: 450, repairHoursLeft: 40 } }),
        `user-${i}`,
        '2026-09-04',
      );
      expect(`${title} ${body}`).toMatch(/repair/i);
      expect(`${title} ${body}`).toMatch(/23/);
    }
  });

  it('never mentions a repair when there is none to offer', () => {
    for (let i = 0; i < 10; i++) {
      const { title, body } = renderTemplate(
        ctx({ reason: 'STREAK_LOST', facts: { ...baseFacts, repairLostStreak: 0 } }),
        `user-${i}`,
        '2026-09-04',
      );
      expect(`${title} ${body}`).not.toMatch(/repair/i);
    }
  });

  it('says the honest goodbye on day 30 of the win-back ladder', () => {
    const { title, body } = render('INACTIVE_RETURN', { daysSinceLastActivity: 30 });
    expect(title).toMatch(/don’t seem to be working/);
    expect(body).toMatch(/stop sending/);
  });

  it('only says "yesterday" when it really was yesterday', () => {
    for (let i = 0; i < 20; i++) {
      const { title } = renderTemplate(
        ctx({ reason: 'INACTIVE_RETURN', facts: { ...baseFacts, daysSinceLastActivity: 2 } }),
        `user-${i}`,
        '2026-09-04',
      );
      expect(title).not.toMatch(/yesterday/);
    }
  });

  it('calls the currency Coins, never gems', () => {
    const { title, body } = render('STREAK_REPAIR_EXPIRING', { repairLostStreak: 9, repairCostCoins: 450, repairHoursLeft: 5 });
    expect(`${title} ${body}`).toMatch(/Coins/);
    expect(`${title} ${body}`).not.toMatch(/gem/i);
  });
});
