/**
 * Tey's voice for Shop blocked-reasons and purchase errors — keyed by the
 * machine-readable codes backend/src/shop/shop.service.ts now sends
 * alongside its plain-text `message`/`blockedReason`. Falls back gracefully
 * to that raw text for any code this pool doesn't recognize (near-impossible
 * states like "Unknown chest tier." aren't worth a personality pass).
 */

import { pickFromPool } from './pool';

const POOLS: Record<string, string[]> = {
  ALREADY_OWNED: ["You already own this one — no double dipping 😏", "That's already yours!"],
  LOCKED: ['Not yet — keep learning and this one\'s yours 👀', 'Soon. Very soon.'],
  HEARTS_FULL: ["Your hearts are already topped off — nothing to refill here 💙", 'Full house already!'],
  FREEZE_BANK_FULL: ["Your freeze bank is stuffed. Save some for later 🧊", "Can't fit another one in there."],
  AT_MAX: ["You're holding the max of these already.", 'No room for more of those right now.'],
  INSUFFICIENT_COINS: ["Ooh, tempting — but your coin purse says no. 😅", 'A little short! Keep earning 🪙', "Almost — a few more coins and it's yours."],
  GRANTED_BY_COLLECTION: ['Finish the collection and this one\'s free 👀'],
};

export function pickShopMessage(code: string | undefined, fallback: string): string {
  const pool = code ? POOLS[code] : undefined;
  if (!pool) return fallback;
  return pickFromPool(pool, `shop:${code}`);
}
