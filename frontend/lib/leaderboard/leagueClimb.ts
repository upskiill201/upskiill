/**
 * "You moved up to #4!" — the league beat of the screens after a lesson.
 *
 * Compares the board read when the lesson opened with the board after the
 * lesson's XP landed, and decides whether there's a league moment to show:
 *
 *   joined   — this lesson's XP put the learner on this week's board
 *   up       — they climbed (and who they passed, by name)
 *   zone     — same rank, but they're now in the promotion zone
 *
 * No movement → null, and the screen is skipped (a lesson that changed
 * nothing on the board shouldn't pretend it did). Pure, so it's tested.
 */

import type { LeagueTier } from '@/lib/leagues';

export interface BoardRow {
  rank: number;
  userId: string;
  name: string;
  avatarUrl: string | null;
  weeklyXp: number;
  isMe: boolean;
  league?: LeagueTier;
}

export interface Board {
  weekStart: string;
  league: LeagueTier;
  joined: boolean;
  myRank: number | null;
  promotionCutoff: number | null;
  demotionStartRank: number | null;
  shared?: boolean;
  standings: BoardRow[];
}

export interface Climb {
  kind: 'joined' | 'up' | 'zone';
  league: LeagueTier;
  fromRank: number | null;
  toRank: number;
  /** Names of the learners passed, closest first. */
  passed: string[];
  /** Rows to draw, in the NEW order, around the learner. */
  rows: BoardRow[];
  /** Where each of those rows stood before (userId → old rank). */
  previousRank: Record<string, number>;
  myXpBefore: number;
  myXpAfter: number;
  inPromotion: boolean;
  /** The next person up, and how much XP it takes to pass them. */
  nextUp: { name: string; xpToPass: number } | null;
  shared: boolean;
}

const WINDOW = 2;

export function computeClimb(before: Board | null, after: Board | null): Climb | null {
  if (!after?.joined || after.myRank === null) return null;
  const me = after.standings.find((r) => r.isMe);
  if (!me) return null;

  const sameWeek = before?.weekStart === after.weekStart;
  const wasOn = Boolean(sameWeek && before?.joined && before.myRank !== null);
  const fromRank = wasOn ? before!.myRank : null;
  const toRank = after.myRank;
  const inPromotion = after.promotionCutoff !== null && toRank <= after.promotionCutoff;
  const wasInPromotion =
    wasOn && before!.promotionCutoff !== null && (before!.myRank ?? Infinity) <= before!.promotionCutoff;

  let kind: Climb['kind'] | null = null;
  if (!wasOn) kind = 'joined';
  else if (fromRank !== null && toRank < fromRank) kind = 'up';
  else if (inPromotion && !wasInPromotion) kind = 'zone';
  if (!kind) return null;

  const previousRank: Record<string, number> = {};
  for (const r of (sameWeek ? before?.standings : undefined) ?? []) previousRank[r.userId] = r.rank;

  // Passed = people now below me who were above me before.
  const passed =
    kind === 'up' && fromRank !== null
      ? after.standings
          .filter((r) => !r.isMe && r.rank > toRank && (previousRank[r.userId] ?? Infinity) < fromRank)
          .sort((a, b) => a.rank - b.rank)
          .map((r) => r.name)
      : [];

  const lo = Math.max(1, toRank - WINDOW);
  const hi = Math.max(toRank + WINDOW, lo + WINDOW * 2);
  const rows = after.standings.filter((r) => r.rank >= lo && r.rank <= hi);

  const above = after.standings.find((r) => r.rank === toRank - 1);
  const beforeMe = sameWeek ? before?.standings.find((r) => r.isMe) : undefined;

  return {
    kind,
    league: after.league,
    fromRank,
    toRank,
    passed,
    rows,
    previousRank,
    myXpBefore: beforeMe?.weeklyXp ?? 0,
    myXpAfter: me.weeklyXp,
    inPromotion,
    nextUp: above ? { name: above.name, xpToPass: Math.max(1, above.weeklyXp - me.weeklyXp + 1) } : null,
    shared: Boolean(after.shared),
  };
}

/** "You passed Amara", "You passed Amara and Kofi", "You passed Amara and 3 others". */
export function passedLine(names: string[]): string | null {
  if (names.length === 0) return null;
  const first = (n: string) => n.split(' ')[0];
  if (names.length === 1) return `You passed ${first(names[0])}!`;
  if (names.length === 2) return `You passed ${first(names[0])} and ${first(names[1])}!`;
  return `You passed ${first(names[0])} and ${names.length - 1} others!`;
}
