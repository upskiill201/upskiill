'use client';

import type { CreatedShareCard, ShareCardRequest, ShareReward } from './types';

/** Calls behind the share sheet. Both go through the /api → NestJS rewrite. */

export async function createShareCard(req: ShareCardRequest): Promise<CreatedShareCard> {
  const res = await fetch('/api/share-cards', {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(req),
  });
  if (!res.ok) {
    const body = (await res.json().catch(() => null)) as { message?: string } | null;
    throw new Error(typeof body?.message === 'string' ? body.message : "Couldn't make your card. Try again.");
  }
  return (await res.json()) as CreatedShareCard;
}

export type ShareChannel = 'native' | 'download' | 'copy' | 'whatsapp' | 'x' | 'facebook' | 'linkedin';

export async function markShared(slug: string, channel: ShareChannel): Promise<ShareReward | null> {
  try {
    const res = await fetch(`/api/share-cards/${slug}/shared`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ channel }),
    });
    if (!res.ok) return null;
    const reward = (await res.json()) as ShareReward;
    // Balances changed outside GamificationContext — ask it to re-read.
    if (reward.rewarded) window.dispatchEvent(new Event('teyro:gamification-refresh'));
    return reward;
  } catch {
    return null;
  }
}
