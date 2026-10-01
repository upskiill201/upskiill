/**
 * Schema migration for stored onboarding answers.
 *
 * v1 was the pre-launch flow: 15 numbered steps keyed by number
 * (`answers['2'].skill`) offering ten unrelated skills — coding, photography,
 * cooking, design, marketing, fitness, writing, business, music, other.
 *
 * v2 is Coding and AI only, keyed by name.
 *
 * MIGRATION POLICY: v1 answers are discarded, not mapped.
 *
 * That is a deliberate data-loss decision. Seven of the ten v1 skills have no
 * v2 equivalent, and the three that look mappable aren't really: v1's
 * `coding` carried no interest, no goals and a minutes-based daily goal from
 * a different option set. Guessing would produce a learner whose personalized
 * path was built on invented answers — worse than asking again, and exactly
 * the "pretending to know information the user has not provided" the brief
 * forbids. The name is the one field that survives, because it is unambiguous
 * and re-asking for it is pure friction.
 *
 * Anyone mid-v1-onboarding restarts a 15-step flow they had not finished.
 * Completed learners are unaffected: they never re-enter onboarding.
 */

import { pruneInvalidInterests } from './branching';
import { ONBOARDING_SCHEMA_VERSION, type OnboardingAnswersV2 } from './types';

/** A stored blob of unknown vintage. */
export interface StoredAnswerBag {
  schemaVersion?: number;
  /** Unknown vintage: a v1 number-keyed blob, or an already-typed v2 bag. */
  answers?: Record<string, unknown> | OnboardingAnswersV2;
}

export interface MigrationResult {
  answers: OnboardingAnswersV2;
  /** True when answers were dropped, so callers can reset step progress too. */
  reset: boolean;
}

function looksLikeV1(answers: Record<string, unknown>): boolean {
  // v1 keyed answers by step NUMBER; v2 keys them by name.
  return Object.keys(answers).some((k) => /^\d+$/.test(k));
}

/** Best-effort name rescue from a v1 blob. v1 never asked, but a resumed
 *  session may carry one from the signup step's draft. */
function rescueName(answers: Record<string, unknown>): string | undefined {
  for (const value of Object.values(answers)) {
    if (value && typeof value === 'object') {
      const candidate = (value as Record<string, unknown>).fullName ?? (value as Record<string, unknown>).name;
      if (typeof candidate === 'string' && candidate.trim()) return candidate.trim();
    }
  }
  return undefined;
}

export function migrateAnswers(stored: StoredAnswerBag | null | undefined): MigrationResult {
  const answers = (stored?.answers ?? {}) as Record<string, unknown>;

  if (stored?.schemaVersion === ONBOARDING_SCHEMA_VERSION && !looksLikeV1(answers)) {
    // Already v2 — still prune, in case a category was edited by an older
    // build that didn't invalidate interests.
    return { answers: pruneInvalidInterests(answers as OnboardingAnswersV2), reset: false };
  }

  if (Object.keys(answers).length === 0) {
    return { answers: {}, reset: false };
  }

  const name = rescueName(answers);
  return { answers: name ? { name } : {}, reset: true };
}

export function isCurrentSchema(version: number | undefined): boolean {
  return version === ONBOARDING_SCHEMA_VERSION;
}
