/**
 * Branching and stale-answer invalidation.
 *
 * The rule the brief is strict about: a learner who picks Coding, answers the
 * coding interest question, goes back and switches to AI must NOT end up with
 * `web-development` attached to an AI account. Invalidation is centralised
 * here rather than sprinkled through the step components, so there is exactly
 * one place to audit when a new branching answer is added.
 */

import { interestOptionsFor } from './catalog';
import { STEP_DEFINITIONS } from './steps';
import type { AnswerKey, LearningCategory, LearningInterest, OnboardingAnswersV2 } from './types';
import { EXPLORING_INTEREST } from './types';

export { interestOptionsFor };

/** Valid interest ids for a category — the allowlist invalidation checks against. */
export function validInterestIds(category: LearningCategory | undefined): Set<string> {
  return new Set(interestOptionsFor(category).map((o) => o.id));
}

/**
 * Drops answers that no longer make sense after `changedKey` was edited.
 *
 * Returns a NEW answers object; never mutates. Safe to call on every save,
 * including when nothing actually changed.
 */
export function invalidateDownstream(
  answers: OnboardingAnswersV2,
  changedKey: AnswerKey,
): OnboardingAnswersV2 {
  const step = STEP_DEFINITIONS.find((s) => s.answerKey === changedKey);
  if (!step?.invalidates?.length) return answers;

  const next: OnboardingAnswersV2 = { ...answers };
  for (const key of step.invalidates) {
    delete next[key];
  }
  return next;
}

/**
 * Belt-and-braces: strips any interest that doesn't belong to the current
 * category, whatever route it took to get there (a resumed session written by
 * an older build, a hand-edited localStorage blob, a backend row from before
 * the v2 migration). `invalidateDownstream` handles the common path; this
 * catches everything else.
 */
export function pruneInvalidInterests(answers: OnboardingAnswersV2): OnboardingAnswersV2 {
  if (!answers.interests?.length) return answers;

  const valid = validInterestIds(answers.category);
  const kept = answers.interests.filter((i) => valid.has(i));

  if (kept.length === answers.interests.length) return answers;
  if (kept.length === 0) {
    const rest = { ...answers };
    delete rest.interests;
    return rest;
  }
  return { ...answers, interests: kept };
}

/**
 * Applies the "still figuring it out" exclusivity rule.
 *
 * `exploring` and a specific interest are contradictory answers, so selecting
 * either clears the other — in both directions. Ordering is preserved
 * otherwise, because `interests[0]` is the primary interest that drives all
 * downstream copy.
 */
export function toggleInterest(
  current: LearningInterest[] | undefined,
  id: LearningInterest,
): LearningInterest[] {
  const list = current ?? [];

  if (list.includes(id)) {
    return list.filter((i) => i !== id);
  }
  if (id === EXPLORING_INTEREST) {
    return [EXPLORING_INTEREST];
  }
  return [...list.filter((i) => i !== EXPLORING_INTEREST), id];
}

/** Generic multi-select toggle for goals and barriers. */
export function toggleValue<T extends string>(current: T[] | undefined, id: T): T[] {
  const list = current ?? [];
  return list.includes(id) ? list.filter((v) => v !== id) : [...list, id];
}

/**
 * Barrier-specific toggle: "Nothing in particular" is exclusive with the
 * actual barriers, the same way `exploring` is with interests.
 */
export function toggleBarrier<T extends string>(current: T[] | undefined, id: T, noneId: T): T[] {
  const list = current ?? [];
  if (list.includes(id)) return list.filter((v) => v !== id);
  if (id === noneId) return [noneId];
  return [...list.filter((v) => v !== noneId), id];
}
