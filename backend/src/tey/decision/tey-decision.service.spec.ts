import type { LearnerStateSnapshot } from '../contracts/tey-state.types';
import type { TeyLocalNow } from '../state/local-time.util';
import { TeyDecisionService } from './tey-decision.service';
import { jitterSeconds, localTimeToday } from './rules';

const now = (hour: number, minute = 0): TeyLocalNow => ({
  date: '2026-09-04',
  minutesOfDay: hour * 60 + minute,
  hour,
  offsetMinutes: -60, // Africa/Lagos
  timezone: 'Africa/Lagos',
});

const learner = (
  over: Partial<LearnerStateSnapshot> = {},
): LearnerStateSnapshot => ({
  userId: 'u1',
  streakDays: 12,
  longestStreak: 30,
  lastStreakEarnedAt: new Date('2026-09-03T18:00:00Z'),
  freezesAvailable: 0,
  localDate: '2026-09-04',
  todayXp: 0,
  todayLessons: 0,
  dailyGoalXp: 20,
  todayGoalCompleted: false,
  weeklyLessons: 5,
  weeklyXp: 120,
  streakState: 'STREAK_AT_RISK',
  engagementState: 'ACTIVE',
  courseState: 'IN_PROGRESS',
  performanceState: 'STABLE',
  target: { type: 'LESSON', courseId: 'c1', sectionIndex: 1, lessonId: 'l3' },
  currentCourseId: 'c1',
  currentCourseTitle: 'Digital Marketing',
  currentLessonId: 'l3',
  courseProgressPct: 62,
  usualHourLocal: 19,
  usualHourSamples: 10,
  lastActivityAt: new Date('2026-09-03T18:00:00Z'),
  daysSinceLastActivity: 1,
  consecutiveIgnoredNudges: 0,
  ...over,
});

describe('TeyDecisionService', () => {
  let service: TeyDecisionService;

  beforeEach(() => {
    service = new TeyDecisionService();
  });

  const ids = (s: LearnerStateSnapshot, n: TeyLocalNow) =>
    service.evaluate(s, n).map((i) => i.ruleId);

  describe('evaluate', () => {
    it('plans nothing once today is done', () => {
      // The single most important negative case: a learner who has already
      // studied should hear nothing at all.
      expect(
        ids(
          learner({
            todayGoalCompleted: true,
            todayLessons: 2,
            daysSinceLastActivity: 0,
          }),
          now(12),
        ),
      ).toEqual([]);
    });

    it('plans a streak nudge for a learner mid-streak with work left', () => {
      expect(ids(learner(), now(12))).toContain('STREAK_AT_RISK');
    });

    it('stages the two streak nudges rather than collapsing them', () => {
      // 20:30 and 22:00 are two stages of the same evening, not rivals. If
      // CRITICAL suppressed AT_RISK, the at-risk nudge would never fire for a
      // learner with no freeze — precisely the learner it exists for.
      const plans = ids(
        learner({ streakDays: 40, freezesAvailable: 0 }),
        now(12),
      );
      expect(plans).toContain('STREAK_AT_RISK');
      expect(plans).toContain('STREAK_CRITICAL');
      // The stakes-free version of the same message is suppressed, though.
      expect(plans).not.toContain('DAILY_GOAL_INCOMPLETE');
    });

    it('leaves a learner mid-streak to the streak rules alone', () => {
      // Studying yesterday and not yet today is what a daily habit looks like.
      // Win-back copy aimed at someone on a 12-day run reads as if Tey has not
      // been paying attention.
      const plans = ids(
        learner({ streakDays: 12, daysSinceLastActivity: 1 }),
        now(12),
      );
      expect(plans).not.toContain('INACTIVE_RETURN');
      expect(plans).toContain('STREAK_AT_RISK');
    });

    it('does not claim a streak is critical when a freeze would save it', () => {
      // Crying wolf here devalues every future CRITICAL.
      const plans = ids(learner({ freezesAvailable: 1 }), now(12));
      expect(plans).not.toContain('STREAK_CRITICAL');
      expect(plans).toContain('STREAK_AT_RISK');
    });

    it('uses the plain daily nudge when there is no streak at stake', () => {
      const plans = ids(
        learner({
          streakDays: 0,
          streakState: 'NO_STREAK',
          engagementState: 'ACTIVE',
          daysSinceLastActivity: 0,
        }),
        now(12),
      );
      expect(plans).toContain('DAILY_GOAL_INCOMPLETE');
      expect(plans).not.toContain('STREAK_AT_RISK');
    });

    it('never nudges a learner who has not started -- that is onboarding work', () => {
      const plans = ids(
        learner({
          streakDays: 0,
          engagementState: 'NEW',
          daysSinceLastActivity: null,
          lastActivityAt: null,
        }),
        now(12),
      );
      expect(plans).toEqual([]);
    });

    it('stops chasing a learner who is long gone', () => {
      // Past the last rung of the ladder, silence is the feature.
      expect(
        ids(
          learner({
            streakDays: 0,
            daysSinceLastActivity: 60,
            engagementState: 'DORMANT',
          }),
          now(12),
        ),
      ).toEqual([]);
    });

    it('hands a lapsed learner to the win-back ladder, not the daily nudge', () => {
      // DAILY_GOAL_INCOMPLETE has no escalation ladder and so no way to stop.
      // Anyone away a day or more belongs to INACTIVE_RETURN, which does.
      const plans = ids(
        learner({
          streakDays: 0,
          daysSinceLastActivity: 2,
          engagementState: 'COOLING_DOWN',
        }),
        now(9),
      );
      expect(plans).not.toContain('DAILY_GOAL_INCOMPLETE');
      expect(plans).toContain('INACTIVE_RETURN');
    });

    it('plans a win-back at each rung of the ladder', () => {
      for (const days of [1, 3, 7]) {
        const plans = ids(
          learner({
            streakDays: 0,
            daysSinceLastActivity: days,
            engagementState: 'COOLING_DOWN',
          }),
          now(9),
        );
        expect(plans).toContain('INACTIVE_RETURN');
      }
    });

    it('plans nothing once the window for today has already passed', () => {
      // Late at night everything either expired or hands over to CRITICAL.
      const plans = ids(
        learner({
          streakDays: 0,
          engagementState: 'ACTIVE',
          daysSinceLastActivity: 0,
        }),
        now(23, 45),
      );
      expect(plans).not.toContain('DAILY_GOAL_INCOMPLETE');
    });

    it('survives a rule that throws', () => {
      const rules = require('./rules');
      const spy = jest
        .spyOn(rules.TEY_RULES[0], 'plan')
        .mockImplementation(() => {
          throw new Error('boom');
        });

      // A broken rule must not silence every other nudge.
      expect(() => service.evaluate(learner(), now(12))).not.toThrow();
      spy.mockRestore();
    });
  });

  describe('revalidate (spec section 10)', () => {
    it('skips when the learner completed the goal after scheduling', () => {
      // Scheduled at 20:00, learner studies at 21:00, fires at 22:00 -> nothing.
      const result = service.revalidate(
        'STREAK_AT_RISK',
        learner({ todayGoalCompleted: true, todayLessons: 1 }),
        now(22),
      );

      expect(result.relevant).toBe(false);
      expect(result.skipReason).toBe('NO_LONGER_RELEVANT');
      expect(result.context).toBeUndefined();
    });

    it('proceeds and builds a full context when still warranted', () => {
      const result = service.revalidate('STREAK_AT_RISK', learner(), now(21));

      expect(result.relevant).toBe(true);
      expect(result.context).toMatchObject({
        v: 1,
        reason: 'STREAK_AT_RISK',
        urgency: 'HIGH',
        target: { type: 'LESSON', lessonId: 'l3' },
      });
      // The facts the AI layer will later be handed as trusted input.
      expect(result.context!.facts.streakDays).toBe(12);
      expect(result.context!.facts.courseTitle).toBe('Digital Marketing');
    });

    it('skips a CRITICAL once the learner has acquired a freeze', () => {
      const result = service.revalidate(
        'STREAK_CRITICAL',
        learner({ freezesAvailable: 1 }),
        now(22),
      );
      expect(result.relevant).toBe(false);
    });

    it('skips an action whose rule no longer exists', () => {
      const result = service.revalidate(
        'RULE_FROM_A_PAST_DEPLOY',
        learner(),
        now(20),
      );
      expect(result.relevant).toBe(false);
      expect(result.skipReason).toBe('UNKNOWN_RULE');
    });

    it('fails closed when a rule throws', () => {
      const rules = require('./rules');
      const spy = jest
        .spyOn(rules.TEY_RULES_BY_ID.get('STREAK_AT_RISK'), 'stillRelevant')
        .mockImplementation(() => {
          throw new Error('boom');
        });

      // When in doubt, do not interrupt the learner.
      const result = service.revalidate('STREAK_AT_RISK', learner(), now(20));
      expect(result.relevant).toBe(false);
      expect(result.skipReason).toBe('RULE_ERROR');
      spy.mockRestore();
    });
  });

  describe('context shape', () => {
    it('carries a Rive state that nothing consumes yet', () => {
      // Phase 7 preparation costs one field and is the whole point of shipping
      // TeyContext before the mascot exists.
      const ctx = service.revalidate(
        'STREAK_AT_RISK',
        learner(),
        now(21),
      ).context!;
      expect(ctx.teyState).toBe('STREAK_AT_RISK');
    });

    it('escalates tone only after repeated ignored nudges', () => {
      const calm = service.revalidate(
        'STREAK_AT_RISK',
        learner(),
        now(21),
      ).context!;
      const teased = service.revalidate(
        'STREAK_AT_RISK',
        learner({ consecutiveIgnoredNudges: 3 }),
        now(21),
      ).context!;

      expect(calm.tone).toBe('URGENT_PLAYFUL');
      expect(teased.tone).toBe('PLAYFUL_PASSIVE_AGGRESSIVE');
    });

    it('never turns passive-aggressive at the eleventh hour', () => {
      // At this point the goal is to help, not to score points.
      const ctx = service.revalidate(
        'STREAK_CRITICAL',
        learner({ consecutiveIgnoredNudges: 9 }),
        now(22),
      ).context!;
      expect(ctx.tone).toBe('URGENT_PLAYFUL');
    });

    it('welcomes a long-absent learner rather than scolding them', () => {
      const ctx = service.revalidate(
        'INACTIVE_RETURN',
        learner({ streakDays: 0, daysSinceLastActivity: 7 }),
        now(19),
      ).context!;
      expect(ctx.tone).toBe('WARM_WELCOME');
      expect(ctx.teyState).toBe('WELCOME_BACK');
    });
  });
});

describe('scheduling helpers', () => {
  it('resolves a local wall-clock hour to the right instant', () => {
    // 20:30 in Lagos (UTC+1) is 19:30Z.
    const due = localTimeToday(now(12), 20, 30);
    expect(due.toISOString()).toBe('2026-09-04T19:30:00.000Z');
  });

  it('spreads learners across the peak hour, but stably per learner', () => {
    // Everyone's "20:30 local" lands in a handful of instants once a timezone
    // has enough learners. Jitter flattens that without drifting between runs.
    expect(jitterSeconds('u1')).toBe(jitterSeconds('u1'));
    expect(jitterSeconds('u1')).toBeLessThan(900);
    expect(jitterSeconds('u1')).not.toBe(jitterSeconds('some-other-user'));
  });
});
