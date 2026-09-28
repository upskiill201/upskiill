/**
 * Client → server preference serialization.
 *
 * The single contract between onboarding answers and the profile fields the
 * rest of the app actually runs on. The backend mirrors this in
 * `applyLearningPreferences` and validates every value again — this is a
 * convenience for the client, never the authority.
 *
 * Deliberately narrow. Onboarding collects more than this (barriers, prior
 * attempt) and those stay in `OnboardingSession.answers` where they belong:
 * they personalize Tey's dialogue, they are not profile settings, and they
 * are the kind of self-reported difficulty that should not be sprayed across
 * extra tables or sent to analytics.
 */

import { dailyGoalXpFor } from './commitment';
import type { LearningCategory, LearningInterest, OnboardingAnswersV2, PreferredTime } from './types';

export interface ProfilePreferences {
  /** `StudentProfile.dailyGoalXp` — one of 20 | 50 | 100 | 200. */
  dailyGoalXp?: number;
  /** `StudentProfile.learningTrack`. */
  learningTrack?: LearningCategory;
  /** `StudentProfile.learningInterests`. */
  learningInterests?: LearningInterest[];
  /** `TeyNotificationPrefs.preferredHour`, local time. */
  preferredHour?: number;
}

/**
 * Local-time hours for each window.
 *
 * `no-preference` maps to undefined on purpose: leaving `preferredHour` null
 * lets the scheduler's inferred habit (`LearnerState.usualHourLocal`) win,
 * which is better than pinning everyone who didn't care to the same hour.
 */
const PREFERRED_HOUR: Record<PreferredTime, number | undefined> = {
  morning: 8,
  afternoon: 13,
  evening: 19,
  'no-preference': undefined,
};

export function preferredHourFor(time: PreferredTime | undefined): number | undefined {
  return time ? PREFERRED_HOUR[time] : undefined;
}

/**
 * Only keys with a real value are emitted, so a partial onboarding can never
 * blank out a profile field that already holds something better.
 */
export function toProfilePreferences(answers: OnboardingAnswersV2): ProfilePreferences {
  const out: ProfilePreferences = {};

  const dailyGoalXp = dailyGoalXpFor(answers.dailyCommitment);
  if (dailyGoalXp !== undefined) out.dailyGoalXp = dailyGoalXp;

  if (answers.category) out.learningTrack = answers.category;

  if (answers.interests?.length) out.learningInterests = answers.interests;

  const preferredHour = preferredHourFor(answers.preferredTime);
  if (preferredHour !== undefined) out.preferredHour = preferredHour;

  return out;
}

/**
 * The analytics-safe projection of an answer set.
 *
 * Free-text (the name) and self-reported difficulty (barriers, prior attempt)
 * are excluded by construction rather than by remembering to strip them at
 * each call site — the brief is explicit that detailed personal learning
 * barriers must not reach an analytics provider.
 */
export function toAnalyticsProperties(answers: OnboardingAnswersV2): Record<string, unknown> {
  return {
    category: answers.category,
    primary_interest: answers.interests?.[0],
    interest_count: answers.interests?.length ?? 0,
    goal_count: answers.goals?.length ?? 0,
    experience_level: answers.experienceLevel,
    daily_commitment_minutes: answers.dailyCommitment,
    preferred_time: answers.preferredTime,
  };
}
