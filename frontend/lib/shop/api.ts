/**
 * Shop API client.
 *
 * Every call goes through the `/api/*` rewrite to NestJS (next.config.ts
 * fallback) and carries the auth cookie — never a hardcoded backend URL.
 *
 * Purchases mint an idempotency key client-side. The key is what makes a
 * retried or double-tapped purchase safe: the server collides on it and
 * returns the original result instead of charging twice.
 */

import type {
  ChestOpenResult,
  CollectionClaimResult,
  Loadout,
  PendingUnlock,
  PurchaseResult,
  ShopCatalog,
  ShopInventory,
  VisitResult,
} from './types';

/**
 * Thrown with the server's own message so the UI can show it verbatim, plus
 * an optional machine-readable `code` (see `ShopBlockReasonCode` in
 * `backend/src/shop/shop.service.ts`) the UI can use to pick a Tey-voiced
 * line instead — falling back to `message` when a code is absent or
 * unrecognized.
 */
export class ShopError extends Error {
  code?: string;
  constructor(message: string, code?: string) {
    super(message);
    this.name = 'ShopError';
    this.code = code;
  }
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`/api/shop${path}`, {
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    ...init,
  });

  const body = await res.json().catch(() => ({}));
  if (!res.ok) {
    const b = body as { message?: string | string[]; code?: string };
    throw new ShopError(
      b?.message
        ? Array.isArray(b.message)
          ? b.message[0]
          : String(b.message)
        : 'Something went wrong in the shop.',
      b?.code,
    );
  }
  return body as T;
}

/** One key per purchase attempt. crypto.randomUUID with a stable fallback. */
export function newIdempotencyKey(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
}

const tz = () => new Date().getTimezoneOffset();

export function fetchCatalog(): Promise<ShopCatalog> {
  return request<ShopCatalog>(`?timezoneOffset=${tz()}`);
}

export function fetchInventory(): Promise<ShopInventory> {
  return request<ShopInventory>('/inventory');
}

export function fetchLoadout(userId?: string): Promise<Loadout> {
  return request<Loadout>(userId ? `/loadout/${userId}` : '/loadout');
}

/**
 * Equipped cosmetics for many learners in one call — what a feed or
 * leaderboard uses instead of one request per avatar. Returns slot → art
 * token, keyed by user id.
 */
export function fetchLoadouts(
  userIds: string[],
): Promise<Record<string, Record<string, string | null>>> {
  const query = encodeURIComponent(userIds.join(','));
  return request<Record<string, Record<string, string | null>>>(`/loadouts?userIds=${query}`);
}

export function fetchPendingUnlocks(): Promise<PendingUnlock[]> {
  return request<PendingUnlock[]>('/unlocks/pending');
}

export function markUnlocksSeen(itemIds: string[]): Promise<{ updated: number }> {
  return request<{ updated: number }>('/unlocks/seen', {
    method: 'POST',
    body: JSON.stringify({ itemIds }),
  });
}

export function purchaseItem(itemId: string, idempotencyKey: string): Promise<PurchaseResult> {
  return request<PurchaseResult>('/purchase', {
    method: 'POST',
    body: JSON.stringify({ itemId, idempotencyKey }),
  });
}

export function openChest(itemId: string, idempotencyKey: string): Promise<ChestOpenResult> {
  return request<ChestOpenResult>('/chest/open', {
    method: 'POST',
    body: JSON.stringify({ itemId, idempotencyKey }),
  });
}

export async function equipItem(itemId: string, equipped: boolean): Promise<Loadout> {
  const result = await request<Loadout>('/equip', {
    method: 'POST',
    body: JSON.stringify({ itemId, equipped }),
  });
  // Drop the cached loadout so every avatar on screen re-reads it — equipping
  // a frame should change the profile immediately, not on the next reload.
  const { invalidateLoadout } = await import('./useLoadout');
  invalidateLoadout();
  return result;
}

export interface UsePowerUpResult {
  success: boolean;
  itemId: string;
  itemName: string;
  message: string;
  lives: number;
  maxLives: number;
  /** Charges left after this one was spent. */
  remaining: number;
}

/** Spend a held power-up (Lesson Retry) and apply its effect. */
export function usePowerUp(itemId: string): Promise<UsePowerUpResult> {
  return request<UsePowerUpResult>('/use', {
    method: 'POST',
    body: JSON.stringify({ itemId }),
  });
}

export function claimCollection(collectionId: string): Promise<CollectionClaimResult> {
  return request<CollectionClaimResult>(
    `/collections/${encodeURIComponent(collectionId)}/claim`,
    { method: 'POST' },
  );
}

export function registerVisit(): Promise<VisitResult> {
  return request<VisitResult>(`/visit?timezoneOffset=${tz()}`, { method: 'POST' });
}
