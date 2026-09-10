/**
 * The single definition of "did this learner hit today's goal?".
 *
 * Extracted from MonthlyQuestService.evaluateProgress so the Tey intelligence
 * layer and the monthly-quest widget cannot drift apart. If they disagreed, a
 * learner would get a "you haven't hit your goal" push at 8pm while the quest
 * card on their dashboard showed the day as complete — the exact class of bug
 * the four competing streak implementations already cause elsewhere.
 */

/** Fallback matching StudentProfile.dailyGoalXp's schema default. */
export const DEFAULT_DAILY_GOAL_XP = 20;

export interface DailyActivityLike {
  xpEarned: number;
  lessonsCompleted: number;
}

export function qualifiesForDailyGoal(
  activity: DailyActivityLike | null | undefined,
  dailyGoalXp: number,
): boolean {
  if (!activity) return false;
  return activity.xpEarned >= dailyGoalXp && activity.lessonsCompleted >= 1;
}
