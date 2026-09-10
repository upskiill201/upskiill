/** Shapes returned by the shop API (backend/src/shop). */

import type { CosmeticSlot } from './cosmetics';

export interface UnlockStatus {
  unlocked: boolean;
  current: number;
  target: number;
  /** Requirement line for locked cards, e.g. "Reach a 7-day streak". */
  label: string;
  percent: number;
}

export interface ShopItem {
  id: string;
  name: string;
  description: string;
  category: string;
  rarity: string;
  price: number;
  basePrice: number;
  discountPercent: number;
  art: string;
  collectionId?: string;
  prestige: boolean;
  grantOnly: boolean;
  eventId?: string;
  slot: CosmeticSlot | null;
  owned: boolean;
  quantity: number;
  maxStorage?: number;
  equipped: boolean;
  soldOut: boolean;
  unlock: UnlockStatus;
  affordable: boolean;
  coinsShort: number;
  /** Null when the item is buyable; otherwise why the button is disabled. */
  blockedReason: string | null;
  /** Machine-readable twin of `blockedReason` — see `pickShopMessage` in
   * `frontend/lib/tey/shopVoice.ts`. */
  blockedReasonCode: string | null;
  activeUntil: string | null;
}

export interface ShopCollection {
  id: string;
  name: string;
  description: string;
  rewardCoins: number;
  rewardItemId: string;
  accent: string;
  items: ShopItem[];
  ownedCount: number;
  totalCount: number;
  complete: boolean;
  claimed: boolean;
  claimable: boolean;
  rewardItem: ShopItem | null;
}

export interface ShopEvent {
  id: string;
  name: string;
  tagline: string;
  discountPercent: number;
  accent: string;
}

export interface ShopGoal {
  kind: string;
  label: string;
  current: number;
  target: number;
  itemId: string | null;
}

export interface ShopChest {
  tier: 'BRONZE' | 'SILVER' | 'GOLD';
  name: string;
  accent: string;
  coinFloor: number;
  odds: { label: string; percent: number }[];
  item: ShopItem | null;
}

export interface ShopCatalog {
  coins: number;
  lives: number;
  maxLives: number;
  streakFreezeBank: number;
  freezeCap: number;
  event: ShopEvent | null;
  featured: ShopItem[];
  dailyRotation: { items: ShopItem[]; resetsInMs: number };
  weeklySpecial: { item: ShopItem; discountPercent: number; resetsInMs: number } | null;
  alwaysStocked: ShopItem[];
  categories: { category: string; items: ShopItem[] }[];
  collections: ShopCollection[];
  chests: ShopChest[];
  recommendations: { reason: string; item: ShopItem }[];
  goals: ShopGoal[];
  newUnlocks: string[];
}

export interface PurchaseResult {
  success: boolean;
  replayed: boolean;
  itemId: string;
  itemName: string;
  rarity: string;
  category: string;
  art: string;
  price: number;
  message: string;
  effect: Record<string, unknown>;
  coins: number;
  lives: number;
  maxLives: number;
  streakFreezeBank: number;
}

export interface ChestOpenResult {
  success: boolean;
  chest: { tier: string; name: string; accent: string };
  price: number;
  reward: {
    coins: number;
    substituted: boolean;
    rarity: string;
    item: {
      id: string;
      name: string;
      description: string;
      rarity: string;
      category: string;
      art: string;
      slot: CosmeticSlot | null;
    } | null;
  };
  coins: number;
  streakFreezeBank: number;
}

export interface CollectionClaimResult {
  success: boolean;
  collection: { id: string; name: string; accent: string };
  rewardCoins: number;
  rewardItem: {
    id: string;
    name: string;
    description: string;
    rarity: string;
    art: string;
    slot: CosmeticSlot | null;
  } | null;
  coins: number;
}

export interface PendingUnlock {
  unlockedAt: string;
  item: ShopItem;
}

export interface Loadout {
  loadout: Record<CosmeticSlot, string | null>;
  /** Slot → art token, so a renderer never needs the item registry. */
  art: Record<string, string | null>;
}

export interface ShopInventory {
  items: ShopItem[];
  loadout: Record<CosmeticSlot, string | null>;
  activeBoosts: { itemId: string; name: string; activeUntil: string | null }[];
  streakFreezeBank: number;
  freezeCap: number;
  coins: number;
}

export interface VisitResult {
  rewarded: boolean;
  visitStreak: number;
  reward?: number;
  coins: number;
  message: string;
}
