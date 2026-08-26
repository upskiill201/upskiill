'use client';

/**
 * Shared client helpers for the achievement collection.
 */

/**
 * Records that the student viewed an unlock (celebration scene, profile
 * collection). Purely presentational bookkeeping — Herald stops surfacing the
 * unlock once it has been seen. Idempotent server-side.
 */
export async function markAchievementSeen(badgeId: string, level: number): Promise<boolean> {
  try {
    const res = await fetch('/api/gamification/achievements/mark-seen', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ badgeId, level }),
    });
    return res.ok;
  } catch {
    // Worst case Herald surfaces this unlock once more — harmless.
    return false;
  }
}

// ─── Onboarding Novice badge (step 13) ──────────────────────────────────────

export interface NoviceBadgeStatus {
  unlocked: boolean;
  seen: boolean;
}

/**
 * Server truth for the step-13 gate: has the Novice badge already been
 * unlocked AND viewed? Reads the live collection (which lazily re-evaluates
 * unlocks server-side). Returns null when the request fails — callers should
 * fall back to showing the claim CTA; the claim endpoint enforces the real
 * rule anyway.
 */
export async function fetchNoviceBadgeStatus(): Promise<NoviceBadgeStatus | null> {
  try {
    const res = await fetch('/api/gamification/achievements', {
      credentials: 'include',
    });
    if (!res.ok) return null;
    const data = await res.json();
    const novice = Array.isArray(data?.achievements)
      ? data.achievements.find((b: { id: string }) => b.id === 'novice')
      : null;
    const tier1 = novice?.tiers?.find((t: { level: number }) => t.level === 1);
    if (!tier1) return null;
    return { unlocked: tier1.isUnlocked, seen: tier1.isUnlocked && !tier1.isNew };
  } catch {
    return null;
  }
}

/** Payload returned by the claim endpoint — everything the celebration scene renders. */
export interface NoviceClaimUnlock {
  badgeId: string;
  badgeTitle: string;
  tier: number;
  maxTier: number;
  tierName: string;
  description: string;
  badgeBg: string;
  unlockedAt: string;
}

export type NoviceClaimResult =
  | { ok: true; unlock: NoviceClaimUnlock }
  | { ok: false; status?: number };

/**
 * Claims the onboarding Novice badge. Server-side the claim is metric-gated
 * (the onboarding session must show step 13 reached) and idempotent — a
 * second claim returns the same unlock. Marks the tier seen so Herald never
 * double-surfaces it.
 */
export async function claimOnboardingBadge(): Promise<NoviceClaimResult> {
  try {
    const res = await fetch('/api/gamification/achievements/claim-onboarding-badge', {
      method: 'POST',
      credentials: 'include',
    });
    if (!res.ok) return { ok: false, status: res.status };
    const unlock = (await res.json()) as NoviceClaimUnlock;
    return { ok: true, unlock };
  } catch {
    return { ok: false };
  }
}
