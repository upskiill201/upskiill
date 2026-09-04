import {
  DEFAULT_DAILY_GOAL_XP,
  qualifiesForDailyGoal,
} from './daily-goal.util';

/**
 * Characterization test. This helper was extracted verbatim from
 * MonthlyQuestService.evaluateProgress so the Tey intelligence layer and the
 * monthly-quest widget cannot drift apart. If these expectations change, the
 * quest card's definition of a "goal day" has changed too -- which is a product
 * decision, not a refactor.
 */
describe('qualifiesForDailyGoal', () => {
  it('requires BOTH the XP target and at least one lesson', () => {
    // The lesson clause is easy to drop when reimplementing this rule. Without
    // it, XP from a chest or a spin would silently count as a study day.
    expect(qualifiesForDailyGoal({ xpEarned: 100, lessonsCompleted: 0 }, 20)).toBe(
      false,
    );
    expect(qualifiesForDailyGoal({ xpEarned: 10, lessonsCompleted: 3 }, 20)).toBe(
      false,
    );
    expect(qualifiesForDailyGoal({ xpEarned: 20, lessonsCompleted: 1 }, 20)).toBe(
      true,
    );
  });

  it('treats the XP target as inclusive', () => {
    expect(qualifiesForDailyGoal({ xpEarned: 50, lessonsCompleted: 1 }, 50)).toBe(
      true,
    );
    expect(qualifiesForDailyGoal({ xpEarned: 49, lessonsCompleted: 1 }, 50)).toBe(
      false,
    );
  });

  it('is false when there is no activity row for the day', () => {
    expect(qualifiesForDailyGoal(null, 20)).toBe(false);
    expect(qualifiesForDailyGoal(undefined, 20)).toBe(false);
  });

  it('honours each of the configurable goal tiers', () => {
    const activity = { xpEarned: 100, lessonsCompleted: 1 };
    expect(qualifiesForDailyGoal(activity, 20)).toBe(true);
    expect(qualifiesForDailyGoal(activity, 50)).toBe(true);
    expect(qualifiesForDailyGoal(activity, 100)).toBe(true);
    expect(qualifiesForDailyGoal(activity, 200)).toBe(false);
  });

  it('defaults to the schema default of 20 XP', () => {
    expect(DEFAULT_DAILY_GOAL_XP).toBe(20);
  });
});
