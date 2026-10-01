'use client';

/**
 * The red dots on the tabs — Duolingo's main way of saying "something's
 * waiting for you here", without interrupting anything.
 *
 *   quests        — daily quests ready to claim, monthly milestones ready to
 *                   claim, today's chest ready to open, and unopened streak
 *                   chests (a number)
 *   leaderboards  — your rank has moved since you last looked (a dot)
 *   profile       — badges you haven't seen yet (a number)
 *
 * Reads the same SWR keys the cards and the Herald sweep already use, so
 * the dots cost almost no extra requests and update the moment those do.
 */

import { usePathname } from 'next/navigation';
import { useEffect, useSyncExternalStore } from 'react';
import useSWR from 'swr';
import { fetcher } from '@/lib/swr';
import { monthlyQuestKey, type MonthlyQuest } from '@/lib/monthlyQuest';
import { LEAGUE_SEEN_KEY } from '@/lib/leaderboard/leaderboardEvents';

/* eslint-disable @typescript-eslint/no-explicit-any -- loosely typed API payloads */

interface LeagueSeen {
  weekStart: string;
  rank: number | null;
}

function readLeagueSeen(): LeagueSeen | null {
  try {
    const raw = localStorage.getItem(LEAGUE_SEEN_KEY);
    return raw ? (JSON.parse(raw) as LeagueSeen) : null;
  } catch {
    return null;
  }
}

export interface NavBadges {
  quests: number;
  leaderboards: boolean;
  profile: number;
}

const noopSubscribe = () => () => {};

export function useNavBadges(): NavBadges {
  const pathname = usePathname() ?? '';
  // The SWR cache is pre-seeded from localStorage, so the first client render
  // can already hold data the server never had — rendering a dot there broke
  // hydration on every page. Badges appear from the second render on.
  const hydrated = useSyncExternalStore(noopSubscribe, () => true, () => false);
  const tz = new Date().getTimezoneOffset();
  const opts = { revalidateOnFocus: true, dedupingInterval: 15_000 };

  const { data: missions } = useSWR<any>(`/api/v2/missions/today?timezoneOffset=${tz}`, fetcher, opts);
  const { data: chest } = useSWR<any>('/api/chest/today', fetcher, opts);
  const { data: pending } = useSWR<any>('/api/chest/pending', fetcher, opts);
  const { data: monthly } = useSWR<MonthlyQuest>(monthlyQuestKey(), fetcher, opts);
  const { data: achievements } = useSWR<any>('/api/gamification/achievements/unseen', fetcher, opts);
  const { data: league } = useSWR<any>('/api/leagues/me', fetcher, { ...opts, dedupingInterval: 30_000 });

  const claimableQuests = Array.isArray(missions?.missions)
    ? missions.missions.filter(
        (m: any) =>
          (m.isCompleted || m.status === 'COMPLETED' || m.currentProgress >= m.targetValue) &&
          !(m.isClaimed || m.status === 'CLAIMED'),
      ).length
    : 0;
  const claimableMilestones = Array.isArray(monthly?.milestones) ? monthly.milestones.filter((m) => m.claimable).length : 0;
  const chestReady = (chest?.status === 'READY_TO_OPEN' ? 1 : 0) + (Array.isArray(pending?.chests) ? pending.chests.length : 0);

  // Looking at the leaderboard clears its dot.
  const onLeaderboard = pathname.startsWith('/dashboard/leaderboards');
  useEffect(() => {
    if (!onLeaderboard || !league?.weekStart) return;
    try {
      localStorage.setItem(LEAGUE_SEEN_KEY, JSON.stringify({ weekStart: league.weekStart, rank: league.myRank ?? null }));
    } catch {
      // Storage blocked — the dot just clears less reliably.
    }
  }, [onLeaderboard, league?.weekStart, league?.myRank]);

  let leagueMoved = false;
  if (!onLeaderboard && league?.joined && league.weekStart) {
    const seen = typeof window === 'undefined' ? null : readLeagueSeen();
    leagueMoved = !seen || seen.weekStart !== league.weekStart || seen.rank !== (league.myRank ?? null);
  }

  if (!hydrated) return { quests: 0, leaderboards: false, profile: 0 };

  return {
    quests: onQuests(pathname) ? 0 : claimableQuests + claimableMilestones + chestReady,
    leaderboards: leagueMoved,
    profile: pathname.startsWith('/dashboard/profile') ? 0 : Array.isArray(achievements?.unseen) ? achievements.unseen.length : 0,
  };
}

const onQuests = (p: string) => p.startsWith('/dashboard/quests');
