'use client';

/**
 * LeagueResultWatcher — mounted once in the dashboard layout. Checks (once per
 * session) whether last week's league settlement hasn't been surfaced yet and,
 * if so, queues the full-page LEAGUE celebration scene. The result is
 * acknowledged server-side only after the scene is advanced, so a refresh
 * mid-scene replays it rather than losing it.
 */

import React, { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useCelebration } from '@/context/CelebrationContext';
import type { LeagueTier } from '@/lib/leagues';

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

export default function LeagueResultWatcher() {
  const { celebrate } = useCelebration();
  const router = useRouter();
  const checkedRef = useRef(false);

  useEffect(() => {
    if (checkedRef.current) return;
    checkedRef.current = true;

    (async () => {
      try {
        const res = await fetch('/api/leagues/me/pending-result', { credentials: 'include' });
        if (!res.ok) return;
        const { result } = (await res.json()) as { result: PendingResult | null };
        if (!result) return;

        // STAYED weeks don't warrant a full-page takeover — mark seen quietly.
        if (result.outcome === 'STAYED' || result.outcome === 'TOURNAMENT_EXIT') {
          void fetch('/api/leagues/me/ack-result', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ weekStart: result.weekStart }),
          });
          return;
        }

        celebrate({
          kind: 'LEAGUE',
          outcome: result.outcome,
          fromTier: result.league,
          toTier: result.toTier,
          rank: result.rank,
          totalXp: result.totalXp,
          weekStart: result.weekStart,
          finalStandings: result.finalStandings.map((r) => ({
            userId: r.userId,
            name: r.name,
            avatarUrl: r.avatarUrl,
            rank: r.rank,
            isMe: r.isMe,
          })),
          dedupeKey: `league-result-${result.weekStart}`,
          onComplete: () => {
            void fetch('/api/leagues/me/ack-result', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              credentials: 'include',
              body: JSON.stringify({ weekStart: result.weekStart }),
            });
            router.refresh();
          },
        });
      } catch {
        // League celebration is best-effort — never block the dashboard.
      }
    })();
  }, [celebrate, router]);

  return null;
}
