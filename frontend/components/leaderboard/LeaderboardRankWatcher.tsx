'use client';

/**
 * LeaderboardRankWatcher — surfaces mid-week leaderboard moments (joined /
 * passed a rival / passed by a rival) as full-page LEADERBOARD celebration
 * scenes right after the learner finishes a lesson.
 *
 * Flow: the learn flow dispatches `lesson:completed` → we give the backend's
 * async league listener ~1.2s to settle (mirrors QuestProgressWatcher's
 * LISTENER_SETTLE_MS — same async chain off the same xp.awarded event),
 * re-fetch `/api/leagues/me`, and diff it against the last snapshot
 * persisted in localStorage:
 *
 *   no prior snapshot, or a fresh week/joined transition → JOINED
 *   rank improved                                        → PASSED_RIVAL
 *   rank worsened                                         → PASSED_BY_RIVAL
 *
 * The snapshot is written BEFORE celebrating, so reloads never replay old
 * moments (mirrors QuestProgressWatcher/DailyRewardWatcher). A real
 * end-of-week promotion/demotion is a separate, already-existing flow —
 * LeagueResultWatcher — untouched by this file.
 */

import { useCallback, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useCelebration, type RankRow } from '@/context/CelebrationContext';
import type { LeagueTier } from '@/lib/leagues';

/** Routes where full-page student takeovers must never appear. */
const SKIP_ROUTE_PREFIXES = [
  '/creator',
  '/onboarding',
  '/login',
  '/signup',
  '/forgot-password',
  '/reset-password',
  '/role-select',
];

/** Long enough for the backend's league listener (off the same xp.awarded
 * event as quests/missions/chests) to land. */
const LISTENER_SETTLE_MS = 1200;

const SNAPSHOT_KEY = 'teyro:leaderboard-snapshot';

/** Rows around the learner's rank — a full cohort snapshot would only ever
 * be trimmed down to this before display anyway. */
const WINDOW_RADIUS = 3;

interface StandingRow {
  rank: number;
  userId: string;
  name: string;
  avatarUrl: string | null;
  weeklyXp: number;
  isMe: boolean;
}

interface MyLeaderboard {
  weekStart: string;
  league: LeagueTier;
  joined: boolean;
  myRank: number | null;
  standings: StandingRow[];
}

interface Snapshot {
  weekStart: string;
  joined: boolean;
  myRank: number | null;
  standings: { userId: string; name: string; avatarUrl: string | null; rank: number }[];
}

function readSnapshot(): Snapshot | null {
  try {
    const raw = window.localStorage.getItem(SNAPSHOT_KEY);
    return raw ? (JSON.parse(raw) as Snapshot) : null;
  } catch {
    return null;
  }
}

function writeSnapshot(data: MyLeaderboard): void {
  try {
    window.localStorage.setItem(
      SNAPSHOT_KEY,
      JSON.stringify({
        weekStart: data.weekStart,
        joined: data.joined,
        myRank: data.myRank,
        standings: data.standings.map((s) => ({
          userId: s.userId,
          name: s.name,
          avatarUrl: s.avatarUrl,
          rank: s.rank,
        })),
      } satisfies Snapshot),
    );
  } catch {
    /* storage unavailable (private mode) — dedupeKeys still guard */
  }
}

/** Trims a full cohort's standings to a small window around a rank, for the
 * scene's AnimatedRankList (never renders the whole cohort). */
function windowAround(rows: { userId: string; name: string; avatarUrl: string | null; rank: number }[], centerRank: number): RankRow[] {
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

async function fetchLeaderboard(): Promise<MyLeaderboard> {
  const res = await fetch('/api/leagues/me', { credentials: 'include' });
  if (!res.ok) throw new Error(`leaderboard fetch failed (${res.status})`);
  return res.json();
}

export default function LeaderboardRankWatcher() {
  const pathname = usePathname();
  const { celebrate } = useCelebration();

  const handleLessonCompleted = useCallback(() => {
    const path = pathname || window.location.pathname;
    if (SKIP_ROUTE_PREFIXES.some((p) => path.startsWith(p))) return;

    window.setTimeout(async () => {
      let fresh: MyLeaderboard;
      try {
        fresh = await fetchLeaderboard();
      } catch {
        return; // logged out / network blip — nothing to celebrate
      }

      const prev = readSnapshot();
      writeSnapshot(fresh);

      if (!fresh.joined || fresh.myRank === null) return;

      // First-ever sight of a joined cohort — the one case where "first
      // sight" SHOULD celebrate (unlike quests: joining the leaderboard is
      // itself the moment, not history to sync silently).
      const isFreshJoin = !prev || prev.weekStart !== fresh.weekStart || !prev.joined;
      if (isFreshJoin) {
        celebrate({
          kind: 'LEADERBOARD',
          variant: 'JOINED',
          league: fresh.league,
          myRank: fresh.myRank,
          beforeStandings: [],
          afterStandings: windowAround(fresh.standings, fresh.myRank),
          weekStart: fresh.weekStart,
          dedupeKey: `lb-join-${fresh.weekStart}`,
        });
        return;
      }

      if (prev.myRank === null || fresh.myRank === prev.myRank) return;

      const beforeStandings = windowAround(prev.standings, prev.myRank);
      const afterStandings = windowAround(fresh.standings, fresh.myRank);

      if (fresh.myRank < prev.myRank) {
        // Moved up — the rival is whoever was ahead of me before and is now
        // behind, preferring whoever's now closest to my new rank.
        const rival = prev.standings
          .filter((p) => p.rank < prev.myRank!)
          .map((p) => ({ prevRank: p.rank, name: p.name, userId: p.userId, newRank: fresh.standings.find((f) => f.userId === p.userId)?.rank }))
          .filter((p) => p.newRank !== undefined && p.newRank > fresh.myRank!)
          .sort((a, b) => (a.newRank as number) - (b.newRank as number))[0];
        if (!rival) return; // no one actually crossed (e.g. a tie shuffled ranks)

        celebrate({
          kind: 'LEADERBOARD',
          variant: 'PASSED_RIVAL',
          league: fresh.league,
          myRank: fresh.myRank,
          beforeStandings,
          afterStandings,
          rivalName: rival.name,
          rivalUserId: rival.userId,
          weekStart: fresh.weekStart,
          dedupeKey: `lb-up-${fresh.weekStart}-${fresh.myRank}`,
        });
      } else {
        // Moved down — symmetric: who is now ahead of me who wasn't before.
        const rival = fresh.standings
          .filter((f) => f.rank < fresh.myRank!)
          .map((f) => ({ newRank: f.rank, name: f.name, userId: f.userId, prevRank: prev.standings.find((p) => p.userId === f.userId)?.rank }))
          .filter((f) => f.prevRank !== undefined && f.prevRank > prev.myRank!)
          .sort((a, b) => (b.newRank as number) - (a.newRank as number))[0];
        if (!rival) return;

        celebrate({
          kind: 'LEADERBOARD',
          variant: 'PASSED_BY_RIVAL',
          league: fresh.league,
          myRank: fresh.myRank,
          beforeStandings,
          afterStandings,
          rivalName: rival.name,
          rivalUserId: rival.userId,
          weekStart: fresh.weekStart,
          dedupeKey: `lb-down-${fresh.weekStart}-${fresh.myRank}`,
        });
      }
    }, LISTENER_SETTLE_MS);
  }, [pathname, celebrate]);

  useEffect(() => {
    // Silent catch-up on entry so cross-tab/cross-session completions never
    // replay a stale moment later.
    const syncQuietly = () => {
      const path = window.location.pathname;
      if (SKIP_ROUTE_PREFIXES.some((p) => path.startsWith(p))) return;
      fetchLeaderboard().then(writeSnapshot).catch(() => {});
    };
    const t = window.setTimeout(syncQuietly, 4000);

    window.addEventListener('lesson:completed', handleLessonCompleted);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener('lesson:completed', handleLessonCompleted);
    };
  }, [handleLessonCompleted]);

  return null;
}
