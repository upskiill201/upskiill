'use client';

/**
 * Opens a chest the learner tapped — ALWAYS through the one Rive treasure
 * chest (components/gamification/TreasureChest via the CHEST scene):
 * tap-to-open, the server decides the reward first, Rive reveals it.
 *
 * Every chest in Teyro goes through here: the daily chest, streak chests
 * (which replaced the lucky wheel), daily-quest chests and the monthly
 * challenge's milestone chests. It plays immediately, even over the screens
 * after a lesson — the learner asked for it.
 */

import { useCallback } from 'react';
import { useCelebration } from '@/context/CelebrationContext';

export interface ChestReward {
  type: string;
  amount: number;
  rarityTier?: string;
}

export function useRewardChest() {
  const { celebrate } = useCelebration();

  return useCallback(
    (opts: {
      /** Server-first claim. Omit (with chestId) for a stored chest row. */
      claim?: () => Promise<ChestReward>;
      /** A stored chest (daily or streak) — opened via /chest/:id/open. */
      chestId?: string;
      source: string;
      /** After the chest scene closes — claimed or not; re-read state. */
      onDone?: () => void;
      dedupeKey?: string;
    }) => {
      celebrate(
        {
          kind: 'CHEST',
          claim: opts.claim,
          chestId: opts.chestId,
          source: opts.source,
          dedupeKey: opts.dedupeKey,
          onComplete: opts.onDone,
        },
        { front: true, immediate: true },
      );
    },
    [celebrate],
  );
}
