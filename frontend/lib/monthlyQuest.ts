/**
 * Monthly Quest — shared types + API + celebration wiring.
 *
 * The backend contract lives in
 * backend/src/monthly-quest/monthly-quest.service.ts (buildCurrentPayload /
 * claimMilestone return shapes). One monthly goal: hit your daily XP goal on
 * `targetDays` days; milestones M1 / M2 / FINAL unlock at ⅓ / ⅔ / full and pay
 * coins or streak freezes.
 */

import { mutate } from 'swr';
import { dedupeInFlight } from '@/lib/in-flight';
import { fetcher } from '@/lib/swr';

// ─── Types (mirror the backend payload) ─────────────────────────────────────

export type QuestMilestoneId = 'M1' | 'M2' | 'FINAL';

export interface QuestMilestone {
  id: QuestMilestoneId;
  kind: 'INTERMEDIATE' | 'FINAL';
  label: string;
  description: string;
  requiredDays: number;
  unlocked: boolean;
  claimed: boolean;
  claimable: boolean;
  reward: { type: 'COINS' | 'FREEZE'; amount: number };
}

export interface MonthlyQuest {
  id: string;
  monthKey: string; // YYYY-MM (user-local)
  monthLabel: string; // e.g. "August 2026"
  status: 'ACTIVE' | 'COMPLETED' | 'FULLY_CLAIMED' | string;
  dailyGoalXp: number;
  targetDays: number;
  goalDays: number;
  daysInMonth: number;
  daysRemaining: number;
  progressPct: number;
  countedDays: string[];
  milestones: QuestMilestone[];
  finalReward: { type: 'COINS' | 'FREEZE'; amount: number };
  badgeId: string | null;
  endsAt: string;
}

export interface QuestHistoryEntry {
  monthKey: string;
  monthLabel: string;
  status: string;
  targetDays: number;
  goalDays: number;
  completed: boolean;
  badgeId: string | null;
  finalReward: { type: 'COINS' | 'FREEZE'; amount: number } | null;
}

export interface ClaimMilestoneResponse {
  success: boolean;
  milestoneId: QuestMilestoneId;
  claimedReward: { type: 'COINS' | 'FREEZE'; amount: number };
  userBalances: { coins: number; streakFreezeBank: number };
  quest: {
    monthKey: string;
    goalDays: number;
    targetDays: number;
    status: string;
    badgeId: string | null;
  };
}

/** Cross-component sync signal (cards, sidebar widget, watcher). */
export const QUEST_REFRESH_EVENT = 'quest:refresh';

function tzParam(): string {
  return `timezoneOffset=${new Date().getTimezoneOffset()}`;
}

/** Exported so hooks/useMonthlyQuest.ts's SWR key matches this module's writes exactly. */
export function monthlyQuestKey(): string {
  return `/api/v2/monthly-quest/current?${tzParam()}`;
}

// ─── API ────────────────────────────────────────────────────────────────────

// CORRECTION: these were previously written as `mutate(key, fetcher(key))`
// with a comment claiming SWR would dedupe them. It does not — `fetcher(key)`
// is evaluated as an argument, so the request is already in flight before
// `mutate` is called, and SWR consults its dedupe map only on `useSWR`'s
// revalidate path. The dashboard card and the sidebar widget each run their
// own useMonthlyQuest() instance, so this really did fire twice per mount,
// and three times on a lesson completion (both hooks plus QuestProgressWatcher).
//
// dedupeInFlight collapses genuinely-concurrent callers onto one request while
// still writing through to the SWR cache for anything reading it there.
export async function fetchCurrentQuest(): Promise<MonthlyQuest> {
  const endpoint = monthlyQuestKey();
  try {
    return await dedupeInFlight(endpoint, () =>
      mutate<MonthlyQuest>(endpoint, fetcher(endpoint)) as Promise<MonthlyQuest>,
    );
  } catch (err) {
    const status = (err as { status?: number })?.status;
    throw new Error(`Failed to load quest${status ? ` (${status})` : ''}`);
  }
}

export async function fetchQuestHistory(): Promise<QuestHistoryEntry[]> {
  const endpoint = `/api/v2/monthly-quest/history?${tzParam()}`;
  try {
    return await dedupeInFlight(endpoint, () =>
      mutate<QuestHistoryEntry[]>(endpoint, fetcher(endpoint)) as Promise<QuestHistoryEntry[]>,
    );
  } catch (err) {
    const status = (err as { status?: number })?.status;
    throw new Error(`Failed to load quest history${status ? ` (${status})` : ''}`);
  }
}

/**
 * Claim a milestone. Throws with the backend's message so claim flows can
 * surface ALREADY_CLAIMED / MILESTONE_NOT_REACHED instead of celebrating.
 */
export async function claimMilestoneApi(
  milestoneId: QuestMilestoneId,
): Promise<ClaimMilestoneResponse> {
  const res = await fetch(
    `/api/v2/monthly-quest/${milestoneId}/claim?${tzParam()}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    },
  );
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body?.message || 'Could not claim this milestone.');
  }
  return res.json();
}
