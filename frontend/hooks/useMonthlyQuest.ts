'use client';

import { useCallback, useEffect, useState } from 'react';
import {
  fetchCurrentQuest,
  fetchQuestHistory,
  QUEST_REFRESH_EVENT,
  type MonthlyQuest,
  type QuestHistoryEntry,
} from '@/lib/monthlyQuest';

/**
 * Shared data hook for the Monthly Quest surfaces (dashboard card, sidebar
 * widget, quests page). Fetches the current quest (optionally with month
 * history) and stays fresh via the `quest:refresh` / `lesson:completed`
 * window events.
 */
export function useMonthlyQuest(options: { withHistory?: boolean } = {}) {
  const { withHistory = false } = options;
  const [quest, setQuest] = useState<MonthlyQuest | null>(null);
  const [history, setHistory] = useState<QuestHistoryEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      setError(null);
      const current = await fetchCurrentQuest();
      setQuest(current);
      if (withHistory) {
        // History is cosmetic — never let it fail the page
        fetchQuestHistory()
          .then(setHistory)
          .catch(() => setHistory([]));
      }
    } catch (err: any) {
      setError(err?.message || 'Something went wrong loading your quest.');
    } finally {
      setLoading(false);
    }
  }, [withHistory]);

  useEffect(() => {
    void load();

    const handleRefresh = () => void load();

    window.addEventListener(QUEST_REFRESH_EVENT, handleRefresh);
    window.addEventListener('lesson:completed', handleRefresh);
    return () => {
      window.removeEventListener(QUEST_REFRESH_EVENT, handleRefresh);
      window.removeEventListener('lesson:completed', handleRefresh);
    };
  }, [load]);

  return { quest, history, loading, error, refresh: load };
}
