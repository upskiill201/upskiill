/**
 * Leaderboard Engine — event detection.
 *
 * Pure, framework-free diffing of two `/leagues/me` reads. This is the single
 * place that decides "did anything worth celebrating just happen" and, if
 * several things technically changed at once, which ONE takes priority (per
 * product spec: never stack competing full-page moments for a single diff).
 *
 * Zone thresholds come straight from the same payload the backend already
 * computes (`promotionCutoff` / `demotionStartRank` from
 * `backend/src/league/league.service.ts`), so "am I in the zone" is never
 * re-derived or guessed client-side.
 */

import type { LeagueTier } from '@/lib/leagues';

export type ZoneStatus = 'PROMOTION' | 'SAFE' | 'DEMOTION';

export interface StandingRow {
  rank: number;
  userId: string;
  name: string;
  avatarUrl: string | null;
  weeklyXp: number;
  isMe: boolean;
}

/** What we fetch from `/api/leagues/me`. */
export interface MyLeaderboard {
  weekStart: string;
  league: LeagueTier;
  joined: boolean;
  myRank: number | null;
  promotionCutoff: number | null;
  demotionStartRank: number | null;
  standings: StandingRow[];
}

/** What we persist to localStorage between checks. */
export interface LeaderboardSnapshot {
  weekStart: string;
  /** Derived from `standings.find(s => s.isMe).userId` — lets a snapshot left
   * behind by a different account on the same device be detected and
   * discarded rather than diffed against. */
  myUserId: string | null;
  joined: boolean;
  myRank: number | null;
  league: LeagueTier;
  promotionCutoff: number | null;
  demotionStartRank: number | null;
  standings: { userId: string; name: string; avatarUrl: string | null; rank: number }[];
}

export function toSnapshot(data: MyLeaderboard): LeaderboardSnapshot {
  return {
    weekStart: data.weekStart,
    myUserId: data.standings.find((s) => s.isMe)?.userId ?? null,
    joined: data.joined,
    myRank: data.myRank,
    league: data.league,
    promotionCutoff: data.promotionCutoff,
    demotionStartRank: data.demotionStartRank,
    standings: data.standings.map((s) => ({
      userId: s.userId,
      name: s.name,
      avatarUrl: s.avatarUrl,
      rank: s.rank,
    })),
  };
}

export function computeZone(
  rank: number | null,
  promotionCutoff: number | null,
  demotionStartRank: number | null,
): ZoneStatus {
  if (rank === null) return 'SAFE';
  if (promotionCutoff !== null && rank <= promotionCutoff) return 'PROMOTION';
  if (demotionStartRank !== null && rank >= demotionStartRank) return 'DEMOTION';
  return 'SAFE';
}

/** How close (in positions) to the promotion line counts as "close" — a
 * transition INTO this band fires CLOSE_TO_PROMOTION once, not on every poll
 * while hovering inside it. */
const CLOSE_TO_PROMOTION_BAND = 2;

/** A rank change of at least this many places is a "big jump," not a regular
 * one — matches the product spec's "significant jump" examples (3 places). */
const BIG_JUMP_THRESHOLD = 3;

export type LeaderboardEventType =
  | 'REACHED_FIRST'
  | 'ENTERED_PROMOTION_ZONE'
  | 'ESCAPED_DEMOTION_ZONE'
  | 'ENTERED_DEMOTION_ZONE'
  | 'EXITED_PROMOTION_ZONE'
  | 'CLOSE_TO_PROMOTION'
  | 'BIG_JUMP_UP'
  | 'BIG_JUMP_DOWN'
  | 'PASSED_RIVAL'
  | 'PASSED_BY_RIVAL'
  | 'JOINED';

export interface LeaderboardEvent {
  type: LeaderboardEventType;
  weekStart: string;
  league: LeagueTier;
  myRank: number;
  prevRank: number | null;
  deltaPositions: number;
  promotionCutoff: number | null;
  demotionStartRank: number | null;
  rivalName?: string;
  rivalUserId?: string;
}

/** Rows around the learner's rank — a full cohort snapshot would only ever be
 * trimmed down to this before display anyway. */
const WINDOW_RADIUS = 3;

export interface RankRow {
  userId: string;
  name: string;
  avatarUrl: string | null;
  rank: number;
  isMe: boolean;
}

export function windowAround(
  rows: { userId: string; name: string; avatarUrl: string | null; rank: number }[],
  centerRank: number,
): RankRow[] {
  const meUserId = rows.find((r) => r.rank === centerRank)?.userId;
  return rows
    .filter((r) => Math.abs(r.rank - centerRank) <= WINDOW_RADIUS)
    .map((r) => ({
      userId: r.userId,
      name: r.name,
      avatarUrl: r.avatarUrl,
      rank: r.rank,
      isMe: r.userId === meUserId,
    }));
}

function findRivalPassed(
  prevStandings: LeaderboardSnapshot['standings'],
  freshStandings: LeaderboardSnapshot['standings'],
  prevRank: number,
  freshRank: number,
): { name: string; userId: string } | null {
  // Moved up — the rival is whoever was ahead of me before and is now
  // behind, preferring whoever's now closest to my new rank.
  const rival = prevStandings
    .filter((p) => p.rank < prevRank)
    .map((p) => ({ name: p.name, userId: p.userId, newRank: freshStandings.find((f) => f.userId === p.userId)?.rank }))
    .filter((p) => p.newRank !== undefined && p.newRank > freshRank)
    .sort((a, b) => (a.newRank as number) - (b.newRank as number))[0];
  return rival ? { name: rival.name, userId: rival.userId } : null;
}

function findRivalPassedBy(
  prevStandings: LeaderboardSnapshot['standings'],
  freshStandings: LeaderboardSnapshot['standings'],
  prevRank: number,
  freshRank: number,
): { name: string; userId: string } | null {
  // Moved down — symmetric: who is now ahead of me who wasn't before.
  const rival = freshStandings
    .filter((f) => f.rank < freshRank)
    .map((f) => ({ name: f.name, userId: f.userId, prevRankOf: prevStandings.find((p) => p.userId === f.userId)?.rank }))
    .filter((f) => f.prevRankOf !== undefined && f.prevRankOf > prevRank)
    .sort((a, b) => (freshStandings.find((s) => s.userId === b.userId)?.rank ?? 0) - (freshStandings.find((s) => s.userId === a.userId)?.rank ?? 0))[0];
  return rival ? { name: rival.name, userId: rival.userId } : null;
}

/**
 * Diffs `prev` against `fresh` and returns the single highest-priority event
 * worth celebrating, or null if nothing meaningful changed (including the
 * "polled again, state identical" case — never re-fires on its own).
 */
export function classifyLeaderboardEvent(
  prev: LeaderboardSnapshot | null,
  fresh: LeaderboardSnapshot,
): LeaderboardEvent | null {
  if (!fresh.joined || fresh.myRank === null) return null;

  const freshMe = fresh.myUserId;
  const isSameAccount = prev && prev.myUserId !== null && freshMe !== null && prev.myUserId === freshMe;
  const isFreshJoin = !prev || !isSameAccount || prev.weekStart !== fresh.weekStart || !prev.joined;

  if (isFreshJoin) {
    return {
      type: 'JOINED',
      weekStart: fresh.weekStart,
      league: fresh.league,
      myRank: fresh.myRank,
      prevRank: null,
      deltaPositions: 0,
      promotionCutoff: fresh.promotionCutoff,
      demotionStartRank: fresh.demotionStartRank,
    };
  }

  if (prev!.myRank === null || fresh.myRank === prev!.myRank) return null;

  const prevRank = prev!.myRank;
  const freshRank = fresh.myRank;
  const deltaPositions = Math.abs(freshRank - prevRank);
  const movedUp = freshRank < prevRank;

  const prevZone = computeZone(prevRank, prev!.promotionCutoff, prev!.demotionStartRank);
  const freshZone = computeZone(freshRank, fresh.promotionCutoff, fresh.demotionStartRank);

  const base = {
    weekStart: fresh.weekStart,
    league: fresh.league,
    myRank: freshRank,
    prevRank,
    deltaPositions,
    promotionCutoff: fresh.promotionCutoff,
    demotionStartRank: fresh.demotionStartRank,
  };

  // Priority 1: reaching #1.
  if (freshRank === 1 && prevRank !== 1) {
    return { ...base, type: 'REACHED_FIRST' };
  }

  // Priority 2: entered the promotion zone.
  if (freshZone === 'PROMOTION' && prevZone !== 'PROMOTION') {
    return { ...base, type: 'ENTERED_PROMOTION_ZONE' };
  }

  // Priority 3: escaped the demotion zone.
  if (prevZone === 'DEMOTION' && freshZone !== 'DEMOTION') {
    return { ...base, type: 'ESCAPED_DEMOTION_ZONE' };
  }

  // Priority 4: entered the demotion zone.
  if (freshZone === 'DEMOTION' && prevZone !== 'DEMOTION') {
    return { ...base, type: 'ENTERED_DEMOTION_ZONE' };
  }

  // Priority 5: fell out of the promotion zone (still worth a soft nudge).
  if (prevZone === 'PROMOTION' && freshZone !== 'PROMOTION') {
    return { ...base, type: 'EXITED_PROMOTION_ZONE' };
  }

  // Priority 6: crossed INTO "close to promotion" — not while it's just
  // sitting there so we don't refire every poll.
  if (fresh.promotionCutoff !== null) {
    const prevDistance = prevRank - (prev!.promotionCutoff ?? fresh.promotionCutoff);
    const freshDistance = freshRank - fresh.promotionCutoff;
    const enteredCloseBand =
      freshDistance >= 1 &&
      freshDistance <= CLOSE_TO_PROMOTION_BAND &&
      !(prevDistance >= 1 && prevDistance <= CLOSE_TO_PROMOTION_BAND);
    if (enteredCloseBand && movedUp) {
      return { ...base, type: 'CLOSE_TO_PROMOTION' };
    }
  }

  // Priority 7: a big jump, regardless of a specific rival.
  if (deltaPositions >= BIG_JUMP_THRESHOLD) {
    return { ...base, type: movedUp ? 'BIG_JUMP_UP' : 'BIG_JUMP_DOWN' };
  }

  // Priority 8: regular rival crossing.
  if (movedUp) {
    const rival = findRivalPassed(prev!.standings, fresh.standings, prevRank, freshRank);
    if (!rival) return null; // no one actually crossed (e.g. a tie shuffled ranks)
    return { ...base, type: 'PASSED_RIVAL', rivalName: rival.name, rivalUserId: rival.userId };
  } else {
    const rival = findRivalPassedBy(prev!.standings, fresh.standings, prevRank, freshRank);
    if (!rival) return null;
    return { ...base, type: 'PASSED_BY_RIVAL', rivalName: rival.name, rivalUserId: rival.userId };
  }
}

// ─── "Already seen" ─────────────────────────────────────────────────────────
// The rank watcher diffs against the last snapshot it saved. When the screens
// after a lesson have just SHOWN the learner their new standing, that's the
// new baseline — so saving it here stops the watcher from announcing the
// same climb again as a notice a moment later. Also clears the tab dot.

export const LEADERBOARD_SNAPSHOT_KEY = 'teyro:leaderboard-snapshot';
export const LEAGUE_SEEN_KEY = 'teyro:league-seen';

export function markLeaderboardSeen(data: MyLeaderboard): void {
  try {
    window.localStorage.setItem(LEADERBOARD_SNAPSHOT_KEY, JSON.stringify(toSnapshot(data)));
    window.localStorage.setItem(LEAGUE_SEEN_KEY, JSON.stringify({ weekStart: data.weekStart, rank: data.myRank ?? null }));
  } catch {
    // Storage blocked — the watcher's dedupe keys still prevent repeats.
  }
}
