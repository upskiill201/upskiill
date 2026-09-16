import type { TeyReason } from '../../contracts/tey-context.types';
import { CourseNearCompletionRule } from './course-near-completion.rule';
import { DailyGoalIncompleteRule } from './daily-goal-incomplete.rule';
import { InactiveReturnRule } from './inactive-return.rule';
import { LessonAbandonedRule } from './lesson-abandoned.rule';
import { MilestoneRule } from './milestone.rule';
import { ProgressCelebrationRule } from './progress-celebration.rule';
import { StreakAtRiskRule } from './streak-at-risk.rule';
import { StreakCriticalRule } from './streak-critical.rule';
import { StreakLostRule } from './streak-lost.rule';
import type { TeyRule } from './rule.types';

/**
 * The rule registry, in descending urgency.
 *
 * Rules are code, not database rows. DB-configurable rules buy a solo operator
 * nothing and cost a config UI, a validator, and a migration path -- while
 * losing code review, git history, and type safety on the one part of the
 * system that decides whether to interrupt a person's evening.
 *
 * Order matters: TeyDecisionService resolves `supersedes` by walking this list
 * from the top, so a higher-urgency rule wins the slot.
 */
export const TEY_RULES: readonly TeyRule[] = [
  StreakCriticalRule,
  StreakAtRiskRule,
  MilestoneRule,
  CourseNearCompletionRule,
  DailyGoalIncompleteRule,
  ProgressCelebrationRule,
  InactiveReturnRule,
  StreakLostRule,
  LessonAbandonedRule,
];

export const TEY_RULES_BY_ID: ReadonlyMap<TeyReason, TeyRule> = new Map(
  TEY_RULES.map((r) => [r.id, r]),
);

export function ruleById(id: string): TeyRule | undefined {
  return TEY_RULES_BY_ID.get(id as TeyReason);
}

export * from './rule.types';
