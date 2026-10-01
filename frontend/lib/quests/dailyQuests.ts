/**
 * Daily Quests — three a day (easy, medium, hard), each with a chest.
 * (Renamed from "Daily Missions" to Duolingo's term; the API path stays
 * /v2/missions so nothing on the server had to move.)
 */

export interface DailyQuest {
  id: string;
  title: string;
  objectiveType: string;
  difficulty?: 'easy' | 'medium' | 'hard' | string;
  currentProgress: number;
  targetValue: number;
  status?: string;
  isCompleted?: boolean;
  isClaimed?: boolean;
  reward: { type: string; amount: number };
}

export interface DailyQuestsPayload {
  date?: string;
  resetAt?: string;
  missions: DailyQuest[];
}

export const dailyQuestsKey = () => `/api/v2/missions/today?timezoneOffset=${new Date().getTimezoneOffset()}`;

export const isDone = (q: DailyQuest) =>
  Boolean(q.isCompleted || q.status === 'COMPLETED' || q.status === 'CLAIMED' || q.currentProgress >= q.targetValue);
export const isClaimed = (q: DailyQuest) => Boolean(q.isClaimed || q.status === 'CLAIMED');
export const rewardKind = (q: DailyQuest): 'XP' | 'COINS' => (q.reward.type === 'XP' ? 'XP' : 'COINS');

export interface ClaimResult {
  claimedReward: { type: string; amount: number };
  userBalances?: { xp?: number; coins?: number };
  allMissionsClaimed?: boolean;
}

/** Opens a quest's chest — the server pays, and says what it paid. */
export async function claimQuest(id: string): Promise<ClaimResult> {
  const res = await fetch(`/api/v2/missions/${id}/claim?timezoneOffset=${new Date().getTimezoneOffset()}`, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body?.message || 'Could not open this chest.');
  }
  return res.json();
}

/** Time left today, Duolingo-style: "7 hours", "42 minutes". */
export function timeLeftToday(now = new Date(), resetAt?: string): string {
  const end = resetAt ? new Date(resetAt) : new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
  const mins = Math.max(0, Math.round((end.getTime() - now.getTime()) / 60000));
  if (mins >= 120) return `${Math.floor(mins / 60)} hours`;
  if (mins >= 60) return '1 hour';
  return `${Math.max(1, mins)} minutes`;
}
