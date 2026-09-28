/**
 * Token interpolation for dialogue lines.
 *
 * Rules write `{name}`, `{interest}`, `{goal}`, `{commitment}`, `{time}`,
 * `{category}` and this resolves them against the catalog — never against raw
 * answer ids, so an internal id like `build-agents` can't leak onto a screen.
 *
 * An unresolvable token collapses to an empty string and the surrounding
 * whitespace is tidied, so a missing answer degrades to a slightly shorter
 * sentence rather than rendering literal braces at the learner.
 */

import {
  categoryLabel,
  goalLabel,
  interestLabel,
  preferredTimeLabel,
} from '../catalog';
import { commitmentOption } from '../commitment';
import type { OnboardingAnswersV2 } from '../types';
import { primaryInterest } from '../types';

export type TokenName = 'name' | 'interest' | 'goal' | 'commitment' | 'time' | 'category';

export function tokenValues(answers: OnboardingAnswersV2): Record<TokenName, string> {
  const commitment = commitmentOption(answers.dailyCommitment);
  return {
    name: answers.name?.trim() ?? '',
    interest: interestLabel(answers.category, primaryInterest(answers)),
    goal: goalLabel(answers.goals?.[0]),
    // "10 minutes" reads better mid-sentence than the card's "10 minutes a day".
    commitment: commitment ? `${commitment.minutes} minutes` : '',
    time: preferredTimeLabel(answers.preferredTime).toLowerCase(),
    category: categoryLabel(answers.category),
  };
}

const TOKEN_PATTERN = /\{(name|interest|goal|commitment|time|category)\}/g;

export function interpolate(line: string, answers: OnboardingAnswersV2): string {
  const values = tokenValues(answers);
  return tidy(line.replace(TOKEN_PATTERN, (_, token: TokenName) => values[token] ?? ''));
}

export function containsNameToken(line: string): boolean {
  return line.includes('{name}');
}

/**
 * Cleans up after an empty token: collapses doubled spaces, removes a space
 * before punctuation, and drops a now-dangling comma ("Alright , what…").
 */
function tidy(text: string): string {
  return text
    .replace(/\s+([,.!?])/g, '$1')
    .replace(/([,—])\s*([,.!?])/g, '$2')
    .replace(/\s{2,}/g, ' ')
    .trim();
}
