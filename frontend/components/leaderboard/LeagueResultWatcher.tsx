'use client';

/**
 * LeagueResultWatcher — mounted once at the app root. Checks (once per
 * session) for every unseen weekly league settlement and queues each as a
 * full-page LEAGUE celebration scene, oldest first. A learner who was away
 * for two settlements sees both, in order, instead of only the most recent
 * (the old `/pending-result` endpoint only ever returned one). Each result is
 * acknowledged server-side only after its own scene is advanced, so a
 * refresh mid-scene replays it rather than losing it.
 */

import React, { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useCelebration, type CelebrationScene } from '@/context/CelebrationContext';
import { useGamification } from '@/context/GamificationContext';
import { pickLeagueResultMessage, pickLeagueResultSubhead, type LeagueResultOutcome } from '@/lib/leaderboard/teyMessages';
import { getLeagueMeta, type LeagueTier } from '@/lib/leagues';

interface PendingResultRow {
  rank: number;
  userId: string;
  name: string;
  avatarUrl: string | null;
  weeklyXp: number;
  isMe: boolean;
}

interface PendingResult {
  weekStart: string;
  league: LeagueTier;
  toTier: LeagueTier;
  rank: number | null;
  totalXp: number;
  outcome: 'PROMOTED' | 'DEMOTED' | 'STAYED' | 'CHAMPION' | 'TOURNAMENT_EXIT' | 'INACTIVE_DEMOTED';
  finalStandings: PendingResultRow[];
}

function ack(weekStart: string) {
  void fetch('/api/leagues/me/ack-result', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ weekStart }),
  });
}

export default function LeagueResultWatcher() {
  const { celebrate } = useCelebration();
  const { profileLoaded, isLoading } = useGamification();
  const router = useRouter();
  const checkedRef = useRef(false);

  useEffect(() => {
    // Mounted at the app root (not just /dashboard) so this always runs once
    // per session, regardless of which route the learner lands on first.
    // Gated on a loaded profile so logged-out visitors never pay for the
    // pending-results fetch.
    if (!profileLoaded || isLoading) return;
    if (checkedRef.current) return;
    checkedRef.current = true;

    (async () => {
      try {
        const res = await fetch('/api/leagues/me/pending-results', { credentials: 'include' });
        if (!res.ok) return;
        const { results } = (await res.json()) as { results: PendingResult[] };
        if (!results?.length) return;

        const scenes: CelebrationScene[] = [];
        for (const result of results) {
          // STAYED weeks don't warrant a full-page takeover — mark seen quietly.
          if (result.outcome === 'STAYED' || result.outcome === 'TOURNAMENT_EXIT') {
            ack(result.weekStart);
            continue;
          }

          const outcome = result.outcome as LeagueResultOutcome;
          const toLeagueName = getLeagueMeta(result.toTier).name;
          const fromLeagueName = getLeagueMeta(result.league).name;
          const resultCtx = {
            leagueName: toLeagueName,
            fromLeagueName,
            totalXp: result.totalXp,
            rank: result.rank,
          };
          scenes.push({
            kind: 'LEAGUE',
            outcome,
            fromTier: result.league,
            toTier: result.toTier,
            rank: result.rank,
            totalXp: result.totalXp,
            weekStart: result.weekStart,
            teyLine: pickLeagueResultMessage(outcome, resultCtx),
            teySubhead: pickLeagueResultSubhead(outcome, resultCtx),
            finalStandings: result.finalStandings.map((r) => ({
              userId: r.userId,
              name: r.name,
              avatarUrl: r.avatarUrl,
              rank: r.rank,
              isMe: r.isMe,
            })),
            dedupeKey: `league-result-${result.weekStart}`,
            onComplete: () => {
              ack(result.weekStart);
              router.refresh();
            },
          });
        }

        if (scenes.length) celebrate(scenes);
      } catch {
        // League celebration is best-effort — never block the dashboard.
      }
    })();
  }, [celebrate, router, profileLoaded, isLoading]);

  return null;
}
