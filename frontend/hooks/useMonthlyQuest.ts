'use client';

import { useEffect, useState } from 'react';
import useSWR from 'swr';
import { fetcher } from '@/lib/swr';
import {
  monthlyQuestKey,
  fetchQuestHistory,
  QUEST_REFRESH_EVENT,
  type MonthlyQuest,
  type QuestHistoryEntry,
} from '@/lib/monthlyQuest';

/**
 * Shared data hook for the Monthly Quest surfaces (dashboard card, sidebar
 * widget, quests page).
 *
 * Reads through the same SWR cache key `lib/monthlyQuest.ts`'s
 * `fetchCurrentQuest()` already writes to via `dedupeInFlight` + `mutate` —
 * MonthlyQuestCard and MonthlyQuestWidget are mounted together on every
 * dashboard load, and used to each run their own `useState`/`useEffect`
 * fetch, so both re-flashed loading and re-fetched on every mount even
 * though the network call was already deduped. Reading via `useSWR` instead
 * means a revisit paints from cache immediately, and both widgets (plus the
 * /dashboard/quests page) share one cache entry.
 */
export function useMonthlyQuest(options: { withHistory?: boolean } = {}) {
  const { withHistory = false } = options;
  const { data: quest, error: swrError, isLoading, mutate } = useSWR<MonthlyQuest>(
    monthlyQuestKey(),
    fetcher,
  );

  // History is cosmetic and only used by the /dashboard/quests page — kept
  // as a plain local fetch rather than folded into the shared cache key.
  const [history, setHistory] = useState<QuestHistoryEntry[]>([]);
  useEffect(() => {
    if (!withHistory) return;
    fetchQuestHistory()
      .then(setHistory)
      .catch(() => setHistory([]));
  }, [withHistory]);

  useEffect(() => {
    const handleRefresh = () => void mutate();
    window.addEventListener(QUEST_REFRESH_EVENT, handleRefresh);
    window.addEventListener('lesson:completed', handleRefresh);
    return () => {
      window.removeEventListener(QUEST_REFRESH_EVENT, handleRefresh);
      window.removeEventListener('lesson:completed', handleRefresh);
    };
  }, [mutate]);

  return {
    quest: quest ?? null,
    history,
    loading: isLoading,
    error: swrError ? (swrError.message || 'Something went wrong loading your quest.') : null,
    refresh: mutate,
  };
}
