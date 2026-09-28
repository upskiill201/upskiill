/**
 * Progress calculation and step access.
 *
 * Every learner walks all 14 steps — branching changes a step's content, not
 * the flow length — so progress is a straight ratio and is never misleading.
 * If a future change introduces a genuinely skipped step, `stepsForJourney`
 * is the one place to make progress reflect that learner's real journey
 * rather than the maximum.
 */

import { STEP_DEFINITIONS, TOTAL_ONBOARDING_STEPS, type StepDefinition } from './steps';
import type { OnboardingAnswersV2 } from './types';

/**
 * The steps THIS learner will actually see. Optional steps still count: they
 * are shown and skippable, not absent, so including them keeps the bar from
 * jumping when someone skips one.
 */
export function stepsForJourney(answers: OnboardingAnswersV2): StepDefinition[] {
  // `answers` is unused today because no step is conditionally absent. It
  // stays in the signature as the single place to filter if that changes, so
  // progress would reflect that learner's real journey rather than the max.
  void answers;
  return STEP_DEFINITIONS;
}

export function totalStepsFor(answers: OnboardingAnswersV2): number {
  return stepsForJourney(answers).length;
}

/** 0–100, clamped. The final step reads 100 before the completion screen loads. */
export function progressFor(stepNumber: number, answers?: OnboardingAnswersV2): number {
  const total = answers ? totalStepsFor(answers) : TOTAL_ONBOARDING_STEPS;
  if (total <= 0) return 0;
  return Math.min(100, Math.max(0, (stepNumber / total) * 100));
}

/**
 * URL-skip guard: a learner may reach any step up to one past their furthest
 * completed step. Step 1 is always reachable.
 *
 * Mirrors the guard in `useOnboardingSession`, kept here so it is unit
 * testable without a router.
 */
export function furthestAllowedStep(completedSteps: number[]): number {
  return completedSteps.length > 0 ? Math.max(...completedSteps) + 1 : 1;
}

export function isStepAccessible(stepNumber: number, completedSteps: number[]): boolean {
  if (stepNumber <= 1) return true;
  return stepNumber <= furthestAllowedStep(completedSteps);
}
