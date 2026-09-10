/**
 * Purchasable Mystery Chest loot tables.
 *
 * Distinct from the free Daily Chest (backend/src/chest) — that one is a
 * retention hook the learner earns, this one is a *coin sink* the learner
 * chooses. Because it is bought, two rules are non-negotiable:
 *
 *  1. Never empty-handed. Every tier has a coin floor, so a bad roll is a
 *     small win rather than a loss. Paid randomness that can pay nothing
 *     reads as a scam and poisons trust in the whole economy.
 *  2. No duplicate cosmetics. Rolling a frame you already own converts to
 *     coins at the substitution rate below, so odds never quietly worsen
 *     the more you collect.
 *
 * Rolls use `crypto.randomInt` (never Math.random) — the free chest already
 * sets that precedent for anything currency-adjacent.
 */

import { randomInt } from 'crypto';
import {
  RARITY_ORDER,
  SHOP_ITEMS,
  type ChestTier,
  type ShopItemDef,
  type ShopRarity,
} from './shop.registry';

export type ChestOutcomeType = 'COINS' | 'ITEM';

export interface ChestSlotDef {
  type: ChestOutcomeType;
  weight: number;
  /** COINS outcomes: inclusive coin range. */
  coinsMin?: number;
  coinsMax?: number;
  /** ITEM outcomes: the rarity band the item is drawn from. */
  rarity?: ShopRarity;
}

export interface ChestTierDef {
  tier: ChestTier;
  itemId: string;
  name: string;
  /** Coins always paid on top of whatever the roll produced. */
  coinFloor: number;
  slots: ChestSlotDef[];
  accent: string;
}

/** Coins paid instead of a cosmetic the learner already owns. */
const DUPLICATE_SUBSTITUTION: Record<ShopRarity, number> = {
  COMMON: 150,
  RARE: 400,
  EPIC: 900,
  LEGENDARY: 2000,
};

export const CHEST_TIERS: ChestTierDef[] = [
  {
    tier: 'BRONZE',
    itemId: 'CHEST_BRONZE',
    name: 'Bronze Mystery Chest',
    coinFloor: 40,
    accent: '#B45309',
    slots: [
      { type: 'COINS', weight: 45, coinsMin: 120, coinsMax: 320 },
      { type: 'ITEM', weight: 40, rarity: 'COMMON' },
      { type: 'ITEM', weight: 15, rarity: 'RARE' },
    ],
  },
  {
    tier: 'SILVER',
    itemId: 'CHEST_SILVER',
    name: 'Silver Mystery Chest',
    coinFloor: 100,
    accent: '#64748B',
    slots: [
      { type: 'COINS', weight: 35, coinsMin: 350, coinsMax: 750 },
      { type: 'ITEM', weight: 30, rarity: 'COMMON' },
      { type: 'ITEM', weight: 30, rarity: 'RARE' },
      { type: 'ITEM', weight: 5, rarity: 'EPIC' },
    ],
  },
  {
    tier: 'GOLD',
    itemId: 'CHEST_GOLD',
    name: 'Gold Mystery Chest',
    coinFloor: 300,
    accent: '#EAB308',
    slots: [
      { type: 'COINS', weight: 25, coinsMin: 900, coinsMax: 1800 },
      { type: 'ITEM', weight: 25, rarity: 'RARE' },
      { type: 'ITEM', weight: 45, rarity: 'EPIC' },
      { type: 'ITEM', weight: 5, rarity: 'LEGENDARY' },
    ],
  },
];

export function getChestTier(tier: ChestTier): ChestTierDef | undefined {
  return CHEST_TIERS.find((t) => t.tier === tier);
}

export interface ChestRollResult {
  /** Coins credited (floor + any coin roll + duplicate substitution). */
  coins: number;
  /** The item won, if the roll produced one the learner did not already own. */
  item: ShopItemDef | null;
  /** True when an item roll was converted to coins because it was a duplicate. */
  substituted: boolean;
  /** Rarity of whatever the roll landed on — drives the reveal's rarity beat. */
  rarity: ShopRarity;
}

/**
 * Items a chest may drop: cosmetics and consumable power-ups only. Prestige,
 * grant-only and event items are excluded — a Legendary that must be *earned*
 * (a 60-day streak, a completed collection) would mean nothing if a chest
 * could hand it over for coins.
 */
function droppablePool(rarity: ShopRarity): ShopItemDef[] {
  return SHOP_ITEMS.filter(
    (i) =>
      i.rarity === rarity &&
      !i.prestige &&
      !i.grantOnly &&
      !i.eventId &&
      i.category !== 'CHEST' &&
      // A chest that drops another chest is a loop with no payoff.
      i.effect.kind !== 'CHEST',
  );
}

/**
 * Roll one chest. `ownedItemIds` lets duplicate cosmetics convert to coins;
 * consumable power-ups are always winnable (owning one is not owning enough).
 */
export function rollChest(
  tierDef: ChestTierDef,
  ownedItemIds: Set<string>,
): ChestRollResult {
  const totalWeight = tierDef.slots.reduce((sum, s) => sum + s.weight, 0);
  const roll = randomInt(0, Math.max(1, totalWeight));

  let cursor = 0;
  let slot = tierDef.slots[0];
  for (const candidate of tierDef.slots) {
    cursor += candidate.weight;
    if (roll < cursor) {
      slot = candidate;
      break;
    }
  }

  if (slot.type === 'COINS') {
    const min = slot.coinsMin ?? 100;
    const max = slot.coinsMax ?? min;
    const amount = max > min ? randomInt(min, max + 1) : min;
    return {
      coins: tierDef.coinFloor + amount,
      item: null,
      substituted: false,
      rarity: 'COMMON',
    };
  }

  const rarity = slot.rarity ?? 'COMMON';
  const pool = droppablePool(rarity);

  // Duplicates only matter for one-time cosmetics; stackables stay eligible.
  const winnable = pool.filter((i) => !(i.oneTime && ownedItemIds.has(i.id)));

  if (winnable.length === 0) {
    // Everything at this rarity is already owned — pay the substitution rate
    // rather than dropping the learner to the coin floor for a lucky roll.
    return {
      coins: tierDef.coinFloor + DUPLICATE_SUBSTITUTION[rarity],
      item: null,
      substituted: true,
      rarity,
    };
  }

  const item = winnable[randomInt(0, winnable.length)];
  return {
    coins: tierDef.coinFloor,
    item,
    substituted: false,
    rarity: item.rarity,
  };
}

/**
 * Odds copy for the chest card — learners deserve to see the table before they
 * spend. Aggregated per rarity so the card stays readable.
 */
export function chestOdds(
  tierDef: ChestTierDef,
): { label: string; percent: number }[] {
  const total = tierDef.slots.reduce((sum, s) => sum + s.weight, 0) || 1;
  const rows = tierDef.slots.map((s) => ({
    label:
      s.type === 'COINS'
        ? 'Coins'
        : `${(s.rarity ?? 'COMMON').toLowerCase()} item`,
    percent: Math.round((s.weight / total) * 100),
  }));
  return rows.sort((a, b) => b.percent - a.percent);
}

/** Highest rarity a tier can produce — shown as the chest's headline promise. */
export function bestRarity(tierDef: ChestTierDef): ShopRarity {
  return (
    tierDef.slots
      .filter((s) => s.type === 'ITEM' && s.rarity)
      .map((s) => s.rarity!)
      .sort((a, b) => RARITY_ORDER[b] - RARITY_ORDER[a])[0] ?? 'COMMON'
  );
}
