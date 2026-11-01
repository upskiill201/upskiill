/**
 * Buddy matching, pure so it can be tested: who, among classmates, would
 * make a buddy pair that lasts? (docs/TEYRO_NETWORK_PLAN.md §6)
 *
 * The things that keep a pair going: learning the same thing, at a similar
 * pace, at a similar time of day, and actually showing up.
 */

import { PHOTO_BOOST } from './network.constants';

export interface MatchCandidate {
  id: string;
  sameCourse: boolean;
  cohort: boolean;
  /** Their local offset minus mine, in minutes. */
  offsetDiffMinutes: number | null;
  /** Progress points apart in the shared course (0–100). */
  progressGap: number | null;
  /** Days since they were last active. */
  idleDays: number | null;
  /** Hours apart in their chosen reminder hour, when both set one. */
  hourGap: number | null;
  /** Accepted buddies they already have. */
  buddyCount: number;
  /** Shows a real photo (not a drawn character). */
  hasPhoto?: boolean;
}

export interface MatchScore {
  score: number;
  reasons: string[];
}

export function scoreMatch(c: MatchCandidate, maxBuddies: number): MatchScore | null {
  if (c.buddyCount >= maxBuddies) return null;
  let score = 0;
  const reasons: string[] = [];

  if (c.sameCourse) {
    score += 3;
    if (c.cohort) {
      score += 2;
      reasons.push('started the same week as you');
    } else {
      reasons.push('learning the same course');
    }
  }
  if (c.offsetDiffMinutes !== null) {
    const h = Math.abs(c.offsetDiffMinutes) / 60;
    if (h <= 2) {
      score += 2;
      reasons.push('in your time zone');
    } else if (h <= 5) score += 1;
  }
  if (c.progressGap !== null) {
    if (c.progressGap <= 15) {
      score += 2;
      reasons.push('at your pace');
    } else if (c.progressGap <= 35) score += 1;
  }
  if (c.idleDays !== null) {
    if (c.idleDays <= 3) {
      score += 2;
      reasons.push('learning this week');
    } else if (c.idleDays <= 7) score += 1;
    else score -= 2;
  } else {
    score -= 2;
  }
  if (c.hourGap !== null && c.hourGap <= 2) {
    score += 1;
    reasons.push('learns around your time');
  }
  if (c.hasPhoto) score += PHOTO_BOOST;
  // Someone with fewer buddies has more attention to give.
  score += (maxBuddies - c.buddyCount) * 0.2;
  return { score, reasons };
}
