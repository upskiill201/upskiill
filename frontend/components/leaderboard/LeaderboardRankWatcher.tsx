'use client';

/**
 * LeaderboardRankWatcher — the living Leaderboard Engine. Surfaces every
 * meaningful mid-week leaderboard moment (joined, passed/passed-by a rival,
 * a big jump, entering/escaping the promotion or demotion zone, reaching #1)
 * as a full-page LEADERBOARD celebration scene.
 *
 * Unlike the original version, this does NOT only react to `lesson:completed`
 * — a rival's XP can change the learner's rank while they're idle or off on
 * another tab, so state is re-checked on:
 *   - `lesson:completed` (fastest path — the common case)
 *   - tab focus / visibility regaining (throttled)
 *   - a foreground-only poll, paused while the tab is hidden
 *   - mount (after a short delay, so it never races other boot-time scenes)
 *
 * Each check diffs the fresh read against the last snapshot via
 * `classifyLeaderboardEvent` (lib/leaderboard/leaderboardEvents.ts), which
 * returns at most one, already priority-resolved event — never stacks
 * competing full-page moments for a single state change. The snapshot is
 * always written BEFORE celebrating (mirrors QuestProgressWatcher /
 * DailyRewardWatcher) so a refresh mid-scene never replays a moment, but a
 * genuine change while the app was closed still gets its due celebration on
 * next open — the CelebrationContext queue safely serializes it behind any
 * other boot-time scene (level-up, streak, chest, quest, community welcome).
 */

import { useCallback, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { useCelebration } from '@/context/CelebrationContext';
import { useGamification } from '@/context/GamificationContext';
import {
  classifyLeaderboardEvent,
  toSnapshot,
  windowAround,
  type LeaderboardSnapshot,
  type MyLeaderboard,
} from '@/lib/leaderboard/leaderboardEvents';
import { pickLeaderboardMessage, pickLeaderboardSubhead } from '@/lib/leaderboard/teyMessages';
import { getLeagueMeta } from '@/lib/leagues';

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

/** Delay before the very first check on mount — lets other boot-time scenes
 * (level-up, streak, chest) queue first without a race. */
const MOUNT_CHECK_DELAY_MS = 4000;

/** Foreground-only poll cadence — a rival's XP can move the learner's rank
 * with no local trigger at all, so this is the catch-all. */
const POLL_INTERVAL_MS = 90_000;

/** Minimum gap between focus/visibility-triggered checks, so rapid tab
 * switching can't hammer the endpoint. */
const FOCUS_CHECK_THROTTLE_MS = 20_000;

const SNAPSHOT_KEY = 'teyro:leaderboard-snapshot';

function readSnapshot(): LeaderboardSnapshot | null {
  try {
    const raw = window.localStorage.getItem(SNAPSHOT_KEY);
    return raw ? (JSON.parse(raw) as LeaderboardSnapshot) : null;
  } catch {
    return null;
  }
}

function writeSnapshot(snapshot: LeaderboardSnapshot): void {
  try {
    window.localStorage.setItem(SNAPSHOT_KEY, JSON.stringify(snapshot));
  } catch {
    /* storage unavailable (private mode) — dedupeKeys still guard */
  }
}

async function fetchLeaderboard(): Promise<MyLeaderboard> {
  const res = await fetch('/api/leagues/me', { credentials: 'include' });
  if (!res.ok) throw new Error(`leaderboard fetch failed (${res.status})`);
  return res.json();
}

export default function LeaderboardRankWatcher() {
  const pathname = usePathname();
  const { celebrate } = useCelebration();
  const { profileLoaded, isLoading } = useGamification();
  const lastCheckedAtRef = useRef(0);
  const inFlightRef = useRef(false);

  const runCheck = useCallback(async () => {
    if (!profileLoaded || isLoading) return;
    if (inFlightRef.current) return; // never overlap two in-flight checks
    const path = pathname || window.location.pathname;
    if (SKIP_ROUTE_PREFIXES.some((p) => path.startsWith(p))) return;

    inFlightRef.current = true;
    try {
      let fresh: MyLeaderboard;
      try {
        fresh = await fetchLeaderboard();
      } catch {
        return; // logged out / network blip — nothing to celebrate
      }

      const freshSnapshot = toSnapshot(fresh);
      const prevSnapshot = readSnapshot();
      // Write BEFORE celebrating — a refresh mid-scene must never replay.
      writeSnapshot(freshSnapshot);

      const event = classifyLeaderboardEvent(prevSnapshot, freshSnapshot);
      if (!event) return;

      const beforeStandings = event.prevRank !== null && prevSnapshot ? windowAround(prevSnapshot.standings, event.prevRank) : [];
      const afterStandings = windowAround(freshSnapshot.standings, event.myRank);

      const messageCtx = {
        deltaPositions: event.deltaPositions,
        myRank: event.myRank,
        rivalName: event.rivalName,
        leagueName: getLeagueMeta(event.league).name,
      };

      celebrate({
        kind: 'LEADERBOARD',
        variant: event.type,
        league: event.league,
        myRank: event.myRank,
        deltaPositions: event.deltaPositions,
        beforeStandings,
        afterStandings,
        rivalName: event.rivalName,
        rivalUserId: event.rivalUserId,
        weekStart: event.weekStart,
        teyLine: pickLeaderboardMessage(event.type, messageCtx),
        teySubhead: pickLeaderboardSubhead(event.type, messageCtx),
        dedupeKey: `lb-${event.weekStart}-${event.type}-${event.prevRank ?? 'x'}-${event.myRank}`,
      });
    } finally {
      inFlightRef.current = false;
    }
  }, [celebrate, profileLoaded, isLoading, pathname]);

  const handleLessonCompleted = useCallback(() => {
    window.setTimeout(() => void runCheck(), LISTENER_SETTLE_MS);
  }, [runCheck]);

  const handleFocusOrVisible = useCallback(() => {
    if (document.visibilityState !== undefined && document.visibilityState !== 'visible') return;
    const now = Date.now();
    if (now - lastCheckedAtRef.current < FOCUS_CHECK_THROTTLE_MS) return;
    lastCheckedAtRef.current = now;
    void runCheck();
  }, [runCheck]);

  useEffect(() => {
    if (!profileLoaded || isLoading) return;

    const mountTimer = window.setTimeout(() => {
      lastCheckedAtRef.current = Date.now();
      void runCheck();
    }, MOUNT_CHECK_DELAY_MS);

    // Foreground-only poll: a recursive timeout (not setInterval) so a
    // backgrounded tab never piles up drift, and skips entirely while hidden.
    let pollTimer: number | null = null;
    const schedulePoll = () => {
      pollTimer = window.setTimeout(() => {
        if (document.visibilityState === 'visible') {
          lastCheckedAtRef.current = Date.now();
          void runCheck();
        }
        schedulePoll();
      }, POLL_INTERVAL_MS);
    };
    schedulePoll();

    window.addEventListener('lesson:completed', handleLessonCompleted);
    window.addEventListener('focus', handleFocusOrVisible);
    document.addEventListener('visibilitychange', handleFocusOrVisible);

    return () => {
      window.clearTimeout(mountTimer);
      if (pollTimer !== null) window.clearTimeout(pollTimer);
      window.removeEventListener('lesson:completed', handleLessonCompleted);
      window.removeEventListener('focus', handleFocusOrVisible);
      document.removeEventListener('visibilitychange', handleFocusOrVisible);
    };
  }, [handleLessonCompleted, handleFocusOrVisible, runCheck, profileLoaded, isLoading]);

  return null;
}
