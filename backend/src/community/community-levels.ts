/**
 * Community levels — the Skool-style ladder shown on the Leaderboards tab.
 *
 * Points are *earned inside a course community* (see CommunityService.
 * getLeaderboard for the scoring formula) and are deliberately separate from
 * platform XP: XP measures learning, community points measure showing up for
 * other learners. A learner can be level 9 in XP and level 1 here.
 *
 * Thresholds are cumulative all-time points and grow roughly 3–4x per rung,
 * so the top rungs stay rare enough to be worth chasing.
 */
export interface CommunityLevel {
  level: number;
  name: string;
  /** Cumulative all-time community points required to reach this level. */
  minPoints: number;
  /** What reaching this level unlocks, or null for the entry rung. */
  unlocks: string | null;
}

export const COMMUNITY_LEVELS: readonly CommunityLevel[] = [
  { level: 1, name: 'Newcomer', minPoints: 0, unlocks: null },
  { level: 2, name: 'Contributor', minPoints: 5, unlocks: 'Post images and polls' },
  { level: 3, name: 'Regular', minPoints: 20, unlocks: 'Attach files to posts' },
  { level: 4, name: 'Helper', minPoints: 65, unlocks: 'Helper badge on your posts' },
  { level: 5, name: 'Mentor', minPoints: 155, unlocks: 'Mentor badge on your posts' },
  { level: 6, name: 'Veteran', minPoints: 515, unlocks: 'Pin one post of your own' },
  { level: 7, name: 'Champion', minPoints: 2015, unlocks: 'Champion frame on your avatar' },
  { level: 8, name: 'Elite', minPoints: 8015, unlocks: 'Elite frame on your avatar' },
  { level: 9, name: 'Legend', minPoints: 33015, unlocks: 'Legend frame on your avatar' },
] as const;

export const MAX_COMMUNITY_LEVEL = COMMUNITY_LEVELS[COMMUNITY_LEVELS.length - 1].level;

/** Highest rung whose threshold the given all-time point total clears. */
export function levelForPoints(points: number): CommunityLevel {
  let current = COMMUNITY_LEVELS[0];
  for (const rung of COMMUNITY_LEVELS) {
    if (points >= rung.minPoints) current = rung;
    else break;
  }
  return current;
}

/** Points still needed for the next rung — null once the ladder is topped out. */
export function pointsToNextLevel(points: number): number | null {
  const next = COMMUNITY_LEVELS.find((r) => points < r.minPoints);
  return next ? next.minPoints - points : null;
}
