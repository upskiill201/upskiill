/**
 * Unit tests for the onboarding personalization engine.
 *
 * These cover the parts that decide what a learner sees. The engine is pure
 * and synchronous, so all of it is testable without a DOM or a router.
 */

import { invalidateDownstream, pruneInvalidInterests, toggleBarrier, toggleInterest, toggleValue } from '../branching';
import { COMMITMENT_OPTIONS, dailyGoalXpFor, recommendedCommitment } from '../commitment';
import { migrateAnswers } from '../migrate';
import { buildPathSummary } from '../pathSummary';
import { preferredHourFor, toAnalyticsProperties, toProfilePreferences } from '../preferences';
import { furthestAllowedStep, isStepAccessible, progressFor } from '../progress';
import {
  canAdvance,
  isOnboardingComplete,
  isValidName,
  STEP_DEFINITIONS,
  stepByNumber,
  TOTAL_ONBOARDING_STEPS,
} from '../steps';
import type { OnboardingAnswersV2 } from '../types';

const complete: OnboardingAnswersV2 = {
  name: 'Ada',
  category: 'ai',
  goals: ['build-projects'],
  interests: ['build-agents'],
  experienceLevel: 'beginner',
  dailyCommitment: '10',
  preferredTime: 'evening',
};

describe('step definitions', () => {
  it('keeps TOTAL_STEPS at 14 so the progress bar contract stays in sync with steps.ts', () => {
    expect(TOTAL_ONBOARDING_STEPS).toBe(14);
  });

  it('numbers steps 1..14 with no gaps or duplicates', () => {
    const numbers = STEP_DEFINITIONS.map((s) => s.number).sort((a, b) => a - b);
    expect(numbers).toEqual(Array.from({ length: 14 }, (_, i) => i + 1));
  });

  it('puts the account step before every step that needs an authenticated user', () => {
    // The push subscription and badge claim are JWT-guarded, so sign-up
    // cannot drift later than the reminders step.
    const account = STEP_DEFINITIONS.find((s) => s.id === 'account')!;
    const reminders = STEP_DEFINITIONS.find((s) => s.id === 'reminders')!;
    expect(account.number).toBeLessThan(reminders.number);
  });
});

describe('required-answer validation', () => {
  it('blocks Continue on a required step with no answer', () => {
    expect(canAdvance(stepByNumber(3)!, {})).toBe(false);
    expect(canAdvance(stepByNumber(3)!, { category: 'coding' })).toBe(true);
  });

  it('always allows Continue on an optional step', () => {
    const priorAttempt = stepByNumber(7)!;
    const barriers = stepByNumber(8)!;
    expect(priorAttempt.optional).toBe(true);
    expect(canAdvance(priorAttempt, {})).toBe(true);
    expect(canAdvance(barriers, {})).toBe(true);
  });

  it('requires at least one selection on multi-select steps', () => {
    expect(canAdvance(stepByNumber(4)!, { goals: [] })).toBe(false);
    expect(canAdvance(stepByNumber(4)!, { goals: ['career'] })).toBe(true);
  });

  it('only reports onboarding complete when every required answer is present', () => {
    expect(isOnboardingComplete(complete)).toBe(true);
    const missing = { ...complete };
    delete missing.dailyCommitment;
    expect(isOnboardingComplete(missing)).toBe(false);
  });

  it('validates display names without rejecting real ones', () => {
    expect(isValidName('Ada')).toBe(true);
    expect(isValidName("O'Brien-Smith")).toBe(true);
    expect(isValidName('李雷')).toBe(true);
    expect(isValidName('   ')).toBe(false);
    expect(isValidName(undefined)).toBe(false);
    expect(isValidName('x'.repeat(41))).toBe(false);
  });
});

describe('branching and stale-answer invalidation', () => {
  it('drops coding interests when the category switches to AI', () => {
    const coding: OnboardingAnswersV2 = {
      category: 'coding',
      interests: ['web-development'],
      goals: ['career'],
    };
    const next = invalidateDownstream({ ...coding, category: 'ai' }, 'category');
    expect(next.interests).toBeUndefined();
    // Category-agnostic answers survive the switch.
    expect(next.goals).toEqual(['career']);
  });

  it('prunes interests that do not belong to the current category', () => {
    const stale: OnboardingAnswersV2 = { category: 'ai', interests: ['web-development'] };
    expect(pruneInvalidInterests(stale).interests).toBeUndefined();
  });

  it('keeps shared interests across a category change', () => {
    // `exploring` is valid in both branches and should survive.
    const stale: OnboardingAnswersV2 = { category: 'ai', interests: ['exploring'] };
    expect(pruneInvalidInterests(stale).interests).toEqual(['exploring']);
  });

  it('leaves valid answers untouched', () => {
    const valid: OnboardingAnswersV2 = { category: 'ai', interests: ['build-agents'] };
    expect(pruneInvalidInterests(valid)).toBe(valid);
  });

  it('treats "still figuring it out" as exclusive with specific interests', () => {
    expect(toggleInterest(['build-agents', 'automations'], 'exploring')).toEqual(['exploring']);
    expect(toggleInterest(['exploring'], 'build-agents')).toEqual(['build-agents']);
  });

  it('preserves selection order so interests[0] stays the primary', () => {
    const picked = toggleInterest(toggleInterest([], 'build-agents'), 'automations');
    expect(picked[0]).toBe('build-agents');
  });

  it('deselects on a second tap', () => {
    expect(toggleInterest(['build-agents'], 'build-agents')).toEqual([]);
    expect(toggleValue(['career'], 'career')).toEqual([]);
  });

  it('treats "nothing in particular" as exclusive with real barriers', () => {
    expect(toggleBarrier(['consistency'], 'none', 'none')).toEqual(['none']);
    expect(toggleBarrier(['none'], 'consistency', 'none')).toEqual(['consistency']);
  });
});

describe('progress', () => {
  it('reports honest progress across all 14 steps', () => {
    expect(progressFor(1)).toBeCloseTo(100 / 14);
    expect(progressFor(14)).toBe(100);
  });

  it('clamps out-of-range steps instead of overflowing the bar', () => {
    expect(progressFor(0)).toBe(0);
    expect(progressFor(99)).toBe(100);
  });

  it('allows one step past the furthest completed step and no further', () => {
    expect(furthestAllowedStep([1, 2, 3])).toBe(4);
    expect(isStepAccessible(4, [1, 2, 3])).toBe(true);
    expect(isStepAccessible(5, [1, 2, 3])).toBe(false);
  });

  it('always allows step 1, even with no history', () => {
    expect(isStepAccessible(1, [])).toBe(true);
  });
});

describe('daily commitment mapping', () => {
  it('maps every option onto a backend-accepted XP tier', () => {
    // Guards against a fifth bucket: PATCH /profile/me validates
    // @IsIn([20, 50, 100, 200]) and would 400 on anything else.
    const allowed = [20, 50, 100, 200];
    expect(COMMITMENT_OPTIONS).toHaveLength(4);
    for (const option of COMMITMENT_OPTIONS) {
      expect(allowed).toContain(option.dailyGoalXp);
    }
    expect(new Set(COMMITMENT_OPTIONS.map((o) => o.dailyGoalXp)).size).toBe(4);
  });

  it('resolves XP for a chosen commitment', () => {
    expect(dailyGoalXpFor('5')).toBe(20);
    expect(dailyGoalXpFor('30')).toBe(200);
    expect(dailyGoalXpFor(undefined)).toBeUndefined();
  });

  it('never recommends the longest commitment to someone short on time', () => {
    expect(recommendedCommitment({ barriers: ['no-time'] })).toBe('5');
    expect(recommendedCommitment({ barriers: ['consistency'] })).toBe('5');
    expect(recommendedCommitment({ priorAttempt: 'stopped' })).toBe('5');
  });

  it('never recommends the 30-minute option to anyone', () => {
    const cases: OnboardingAnswersV2[] = [
      {},
      { experienceLevel: 'beginner' },
      { experienceLevel: 'experienced', goals: ['career'] },
      { barriers: ['none'] },
    ];
    for (const c of cases) {
      expect(recommendedCommitment(c)).not.toBe('30');
    }
  });
});

describe('preference serialization', () => {
  it('maps answers onto the real profile fields', () => {
    expect(toProfilePreferences(complete)).toEqual({
      dailyGoalXp: 50,
      learningTrack: 'ai',
      learningInterests: ['build-agents'],
      preferredHour: 19,
    });
  });

  it('omits keys with no answer rather than blanking existing profile values', () => {
    expect(toProfilePreferences({})).toEqual({});
  });

  it('leaves preferredHour unset for "no specific time" so the inferred habit wins', () => {
    expect(preferredHourFor('no-preference')).toBeUndefined();
    expect(toProfilePreferences({ preferredTime: 'no-preference' })).toEqual({});
  });

  it('keeps the name and self-reported barriers out of analytics properties', () => {
    const props = toAnalyticsProperties({
      ...complete,
      barriers: ['consistency', 'distracted'],
      priorAttempt: 'stopped',
    });
    const serialized = JSON.stringify(props);
    expect(serialized).not.toContain('Ada');
    expect(serialized).not.toContain('consistency');
    expect(serialized).not.toContain('stopped');
    expect(props.category).toBe('ai');
  });
});

describe('path summary', () => {
  it('is deterministic for the same answers', () => {
    expect(buildPathSummary(complete).text).toBe(buildPathSummary(complete).text);
  });

  it('produces genuinely different narratives for the three AI interests', () => {
    const texts = (['use-tools', 'build-agents', 'automations'] as const).map(
      (interest) => buildPathSummary({ ...complete, interests: [interest] }).text,
    );
    expect(new Set(texts).size).toBe(3);
  });

  it('changes register between a beginner and an experienced learner', () => {
    const beginner = buildPathSummary({ ...complete, experienceLevel: 'beginner' }).text;
    const experienced = buildPathSummary({ ...complete, experienceLevel: 'experienced' }).text;
    expect(beginner).not.toBe(experienced);
  });

  it('reflects the chosen commitment rather than a default', () => {
    expect(buildPathSummary({ ...complete, dailyCommitment: '5' }).text).toContain('5 minutes');
    expect(buildPathSummary({ ...complete, dailyCommitment: '30' }).text).toContain('30 minutes');
  });

  it('acknowledges a learner who stopped before, without guessing why', () => {
    const text = buildPathSummary({ ...complete, priorAttempt: 'stopped' }).text;
    expect(text).toContain('stopped');
    expect(text.toLowerCase()).not.toMatch(/lazy|gave up|failed|couldn't handle/);
  });

  it('never names a course, lesson or guaranteed timeframe', () => {
    for (const interest of ['use-tools', 'build-agents', 'automations', 'exploring'] as const) {
      const text = buildPathSummary({ ...complete, interests: [interest] }).text.toLowerCase();
      expect(text).not.toMatch(/\bcourse\b|\blesson\b|in (just )?\d+ (days|weeks|months)/);
    }
  });

  it('survives a half-answered bag without rendering empty fragments', () => {
    const summary = buildPathSummary({ category: 'coding' });
    expect(summary.text.length).toBeGreaterThan(0);
    expect(summary.text).not.toContain('undefined');
    expect(summary.text).not.toMatch(/\{\w+\}/);
  });

  it('only surfaces highlights backed by a real answer', () => {
    expect(buildPathSummary({}).highlights).toEqual([]);
    expect(buildPathSummary(complete).highlights).toEqual([
      { label: 'Focus', value: 'Build AI Agents' },
      { label: 'Daily goal', value: '10 min' },
      { label: 'Best time', value: 'Evening' },
    ]);
  });
});

describe('schema migration', () => {
  it('passes v2 answers through untouched', () => {
    const result = migrateAnswers({ schemaVersion: 2, answers: complete });
    expect(result.reset).toBe(false);
    expect(result.answers.category).toBe('ai');
  });

  it('discards v1 answers rather than guessing an equivalent', () => {
    // v1 keyed by step number and offered skills with no v2 counterpart.
    const result = migrateAnswers({
      schemaVersion: 1,
      answers: { '2': { skill: 'photography' }, '5': { dailyGoal: '45_min' } },
    });
    expect(result.reset).toBe(true);
    expect(result.answers).toEqual({});
  });

  it('rescues a name from a v1 blob, since re-asking is pure friction', () => {
    const result = migrateAnswers({
      schemaVersion: 1,
      answers: { '2': { skill: 'coding' }, '12': { fullName: 'Ada' } },
    });
    expect(result.reset).toBe(true);
    expect(result.answers).toEqual({ name: 'Ada' });
  });

  it('treats a versionless numeric-keyed blob as v1', () => {
    expect(migrateAnswers({ answers: { '2': { skill: 'cooking' } } }).reset).toBe(true);
  });

  it('handles an empty or absent bag without resetting', () => {
    expect(migrateAnswers(null)).toEqual({ answers: {}, reset: false });
    expect(migrateAnswers({ answers: {} })).toEqual({ answers: {}, reset: false });
  });

  it('prunes a stale interest carried in a v2 blob written by an older build', () => {
    const result = migrateAnswers({
      schemaVersion: 2,
      answers: { category: 'ai', interests: ['web-development'] },
    });
    expect(result.answers.interests).toBeUndefined();
  });
});
