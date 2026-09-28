/**
 * Tey's voice for the Shop Engine's own scenes (PurchaseSuccess, ItemUnlocked,
 * CollectionComplete) — a separate scene queue from the Celebration Engine
 * (see ShopEngineContext.tsx), so it gets its own pool file rather than
 * reusing celebration keys. The paid Mystery Chest reveal reuses
 * chestVoice's reveal pool directly since the "was it rare?" reaction is the
 * same beat either way.
 */

import { pickFromPool } from './pool';

const PURCHASE_COMMON = ['Nice pickup!', "That's going straight to your collection.", 'Enjoy that one!'];
const PURCHASE_RARE = ['Ooh, good taste.', "Now that's a look.", "You're going to want to show this off."];

export function pickPurchaseLine(rarity: string): string {
  const isRare = rarity === 'RARE' || rarity === 'EPIC' || rarity === 'LEGENDARY';
  return pickFromPool(
    isRare ? PURCHASE_RARE : PURCHASE_COMMON,
    isRare ? 'shopEngine:purchase-rare' : 'shopEngine:purchase-common'
  );
}

const UNLOCK_LINES = ["Look what you unlocked!", "This one's got your name on it now.", 'Earned, not given. Nice.'];

export function pickUnlockLine(): string {
  return pickFromPool(UNLOCK_LINES, 'shopEngine:unlock');
}

const COLLECTION_COMPLETE_LINES = [
  'You cleared the whole set!',
  "Okay, that's impressive. Every piece.",
  'Nobody can buy their way to this one but you.',
];

export function pickCollectionCompleteLine(): string {
  return pickFromPool(COLLECTION_COMPLETE_LINES, 'shopEngine:collection-complete');
}
