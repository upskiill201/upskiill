/**
 * Shop catalogue — item definitions live in code (mirroring
 * MONTHLY_QUEST_MILESTONES and BADGE_REGISTRY), never in the DB.
 *
 * Why code and not a table: every item's *effect* is code anyway, so a DB
 * catalogue would only ever be half the truth and would need an admin CRUD
 * surface to stay in sync — exactly the enterprise bloat the solo-operator
 * rule rejects. The DB stores only what is per-user and cannot be derived:
 * what you own, what you have equipped, what just unlocked (`user_shop_items`,
 * `user_shop_unlocks`, `user_shop_state`).
 *
 * Currency note: prices are COINS only — the platform currency is strictly
 * coins, never gems (CLAUDE.md §8).
 */

import type { LeagueTier } from '@prisma/client';

// ─── Rarity ──────────────────────────────────────────────────────────────────

export type ShopRarity = 'COMMON' | 'RARE' | 'EPIC' | 'LEGENDARY';

/**
 * Rarity is the economy's price ladder, not just a colour. Each tier is a
 * different *kind* of goal: COMMON is an impulse buy off a couple of lessons,
 * RARE is a few days of play, EPIC is a week-plus, LEGENDARY is a season.
 * Keeping the bands apart is what stops coins pooling with nothing to chase.
 */
export const RARITY_ORDER: Record<ShopRarity, number> = {
  COMMON: 0,
  RARE: 1,
  EPIC: 2,
  LEGENDARY: 3,
};

export const RARITY_BANDS: Record<ShopRarity, { min: number; max: number }> = {
  COMMON: { min: 80, max: 350 },
  RARE: { min: 350, max: 900 },
  EPIC: { min: 900, max: 2000 },
  LEGENDARY: { min: 2000, max: 6000 },
};

// ─── Categories ──────────────────────────────────────────────────────────────

export type ShopCategory =
  | 'POWER_UP'
  | 'CHEST'
  | 'FRAME'
  | 'BACKGROUND'
  | 'CELEBRATION_FX'
  | 'XP_FX';

/** Categories whose items are worn, not consumed — one purchase, owned forever. */
export const COSMETIC_CATEGORIES: ShopCategory[] = [
  'FRAME',
  'BACKGROUND',
  'CELEBRATION_FX',
  'XP_FX',
];

/** The equip slot a cosmetic occupies — one equipped item per slot. */
export type CosmeticSlot = 'FRAME' | 'BACKGROUND' | 'CELEBRATION_FX' | 'XP_FX';

export function cosmeticSlotFor(category: ShopCategory): CosmeticSlot | null {
  return COSMETIC_CATEGORIES.includes(category)
    ? (category as CosmeticSlot)
    : null;
}

// ─── Unlock rules ────────────────────────────────────────────────────────────

/**
 * What a learner must *do* before an item can even be bought. This is the
 * spine of the whole economy: coins alone should never buy the best things,
 * or the shop degrades into a grind counter. Learning gates the catalogue,
 * coins gate the purchase.
 */
export type UnlockRule =
  | { type: 'ALWAYS' }
  | { type: 'LEVEL'; level: number }
  | { type: 'STREAK'; days: number }
  | { type: 'LESSONS'; count: number }
  | { type: 'COURSES'; count: number }
  | { type: 'XP'; amount: number }
  | { type: 'LEAGUE'; tier: LeagueTier }
  | { type: 'COLLECTION'; collectionId: string }
  | { type: 'PURCHASES'; count: number };

export const LEAGUE_ORDER: LeagueTier[] = [
  'BRONZE',
  'SILVER',
  'GOLD',
  'SAPPHIRE',
  'RUBY',
  'EMERALD',
  'AMETHYST',
  'PEARL',
  'DIAMOND',
  'DIAMOND_TOURNAMENT',
];

// ─── Effects ─────────────────────────────────────────────────────────────────

/** What actually happens when the item is bought (power-ups) or equipped (cosmetics). */
export type ShopEffect =
  | { kind: 'REFILL_HEARTS' }
  | { kind: 'GRANT_FREEZE'; amount: number }
  | { kind: 'REPAIR_STREAK' }
  | { kind: 'XP_MULTIPLIER'; multiplier: number; minutes: number }
  | { kind: 'COIN_MULTIPLIER'; multiplier: number; minutes: number }
  /** Banked charges spent by the lesson player (retry, perfect-run shield). */
  | { kind: 'CHARGES'; charges: number }
  | { kind: 'FREEZE_CAPACITY'; delta: number }
  | { kind: 'CHEST'; tier: ChestTier }
  | { kind: 'COSMETIC'; slot: CosmeticSlot };

export type ChestTier = 'BRONZE' | 'SILVER' | 'GOLD';

// ─── Item definition ─────────────────────────────────────────────────────────

export interface ShopItemDef {
  id: string;
  name: string;
  description: string;
  category: ShopCategory;
  rarity: ShopRarity;
  /** Base price in coins, before any event discount. */
  price: number;
  effect: ShopEffect;
  unlock: UnlockRule;
  /** Theme set this item belongs to, if any (drives collection completion). */
  collectionId?: string;
  /**
   * Visual token the frontend resolves to a gradient/animation. Kept as an
   * opaque key so art can change without a migration.
   */
  art: string;
  /** Stack cap for consumables. Undefined = no cap. */
  maxStorage?: number;
  /** Cosmetics and permanent upgrades: buyable exactly once. */
  oneTime?: boolean;
  /** Eligible for the daily rotation pool (staples stay pinned instead). */
  rotatable?: boolean;
  /** Always visible even when locked — the thing you save toward for weeks. */
  prestige?: boolean;
  /** Purchasable only while this event window is live. */
  eventId?: string;
  /** Never purchasable — granted by completing a collection. */
  grantOnly?: boolean;
  /** Staples pinned to their category regardless of rotation. */
  alwaysStocked?: boolean;
}

// ─── Collections ─────────────────────────────────────────────────────────────

export interface ShopCollectionDef {
  id: string;
  name: string;
  description: string;
  /** Coins paid out the first time every member item is owned. */
  rewardCoins: number;
  /** Exclusive item granted on completion — the real prize. */
  rewardItemId: string;
  accent: string;
}

export const SHOP_COLLECTIONS: ShopCollectionDef[] = [
  {
    id: 'SPACE',
    name: 'Space Collection',
    description: 'Deep-field blues and a comet trail on every XP gain.',
    rewardCoins: 500,
    rewardItemId: 'FRAME_SUPERNOVA',
    accent: '#6C8CFF',
  },
  {
    id: 'GAMER',
    name: 'Gamer Collection',
    description: 'Arcade neon, pixel bursts and a combo counter finish.',
    rewardCoins: 500,
    rewardItemId: 'FRAME_ARCADE_GOLD',
    accent: '#A855F7',
  },
  {
    id: 'CREATOR',
    name: 'Creator Collection',
    description: 'Studio lighting for learners who also teach.',
    rewardCoins: 600,
    rewardItemId: 'FRAME_DIRECTORS_CUT',
    accent: '#F59E0B',
  },
];

// ─── Events ──────────────────────────────────────────────────────────────────

export interface ShopEventDef {
  id: string;
  name: string;
  /** Short line shown on the event banner. */
  tagline: string;
  /** Inclusive month/day window, evaluated in UTC. Wraps across new year. */
  start: { month: number; day: number };
  end: { month: number; day: number };
  /** Percentage off every non-prestige item while live (0 = no discount). */
  discountPercent: number;
  accent: string;
}

export const SHOP_EVENTS: ShopEventDef[] = [
  {
    id: 'HALLOWEEN',
    name: 'Teyro Halloween',
    tagline: 'Spooky drops and 15% off the whole shop.',
    start: { month: 10, day: 24 },
    end: { month: 11, day: 2 },
    discountPercent: 15,
    accent: '#F97316',
  },
  {
    id: 'BACK_TO_SCHOOL',
    name: 'Back to School',
    tagline: 'Fresh-start gear for a fresh term.',
    start: { month: 9, day: 1 },
    end: { month: 9, day: 14 },
    discountPercent: 10,
    accent: '#22C55E',
  },
  {
    id: 'CREATOR_WEEK',
    name: 'Creator Week',
    tagline: 'A week for the people who teach what they learn.',
    start: { month: 11, day: 10 },
    end: { month: 11, day: 17 },
    discountPercent: 10,
    accent: '#F59E0B',
  },
  {
    id: 'WINTER',
    name: 'Winter Festival',
    tagline: 'Frost cosmetics and 20% off — the year’s biggest sale.',
    start: { month: 12, day: 15 },
    end: { month: 1, day: 2 },
    discountPercent: 20,
    accent: '#38BDF8',
  },
  {
    id: 'ANNIVERSARY',
    name: 'Teyro Anniversary',
    tagline: 'One more year of learning out loud.',
    start: { month: 3, day: 1 },
    end: { month: 3, day: 8 },
    discountPercent: 15,
    accent: '#3D5AFE',
  },
];

// ─── The catalogue ───────────────────────────────────────────────────────────

export const SHOP_ITEMS: ShopItemDef[] = [
  // ══ POWER-UPS ══════════════════════════════════════════════════════════════
  {
    id: 'REFILL_HEARTS',
    name: 'Refill Hearts',
    description:
      'Get full hearts so you can worry less about making mistakes in a lesson.',
    category: 'POWER_UP',
    rarity: 'COMMON',
    price: 120,
    effect: { kind: 'REFILL_HEARTS' },
    unlock: { type: 'ALWAYS' },
    art: 'heart',
    alwaysStocked: true,
  },
  {
    id: 'STREAK_FREEZE',
    name: 'Streak Freeze',
    description: 'Keeps your streak alive for one full day of inactivity.',
    category: 'POWER_UP',
    rarity: 'COMMON',
    price: 200,
    effect: { kind: 'GRANT_FREEZE', amount: 1 },
    unlock: { type: 'ALWAYS' },
    art: 'freeze',
    maxStorage: 2,
    alwaysStocked: true,
  },
  {
    id: 'LESSON_RETRY',
    name: 'Lesson Retry',
    description:
      'Restart a lesson you fumbled without losing the hearts you spent.',
    category: 'POWER_UP',
    rarity: 'COMMON',
    price: 90,
    effect: { kind: 'CHARGES', charges: 1 },
    unlock: { type: 'ALWAYS' },
    art: 'retry',
    maxStorage: 5,
    rotatable: true,
  },
  {
    id: 'XP_BOOST_15',
    name: 'XP Boost',
    description: '1.5× XP on everything you finish for the next 15 minutes.',
    category: 'POWER_UP',
    rarity: 'COMMON',
    price: 150,
    effect: { kind: 'XP_MULTIPLIER', multiplier: 1.5, minutes: 15 },
    unlock: { type: 'LEVEL', level: 2 },
    art: 'boost-xp',
    rotatable: true,
  },
  {
    id: 'XP_BOOST_2X',
    name: '2× XP Boost',
    description: 'Double XP for 30 minutes. Stack it with a long study block.',
    category: 'POWER_UP',
    rarity: 'RARE',
    price: 400,
    effect: { kind: 'XP_MULTIPLIER', multiplier: 2, minutes: 30 },
    unlock: { type: 'LEVEL', level: 5 },
    art: 'boost-xp2',
    rotatable: true,
  },
  {
    id: 'COIN_BOOST_2X',
    name: 'Coin Boost',
    description: 'Double coins from every lesson for 30 minutes.',
    category: 'POWER_UP',
    rarity: 'RARE',
    price: 380,
    effect: { kind: 'COIN_MULTIPLIER', multiplier: 2, minutes: 30 },
    unlock: { type: 'LEVEL', level: 5 },
    art: 'boost-coin',
    rotatable: true,
  },
  {
    id: 'STREAK_REPAIR',
    name: 'Streak Repair',
    description:
      'Broke a streak you were proud of? Buy it back within 48 hours.',
    category: 'POWER_UP',
    rarity: 'RARE',
    price: 450,
    effect: { kind: 'REPAIR_STREAK' },
    unlock: { type: 'STREAK', days: 3 },
    art: 'repair',
    alwaysStocked: true,
  },
  {
    id: 'PERFECT_SHIELD',
    name: 'Perfect Lesson Protection',
    description:
      'One wrong answer stops counting — your perfect run survives it.',
    category: 'POWER_UP',
    // RARE, not EPIC: it is a single-use consumable, and EPIC pricing (900+)
    // for one saved answer would be the worst-value item in the shop.
    rarity: 'RARE',
    price: 550,
    effect: { kind: 'CHARGES', charges: 1 },
    unlock: { type: 'LESSONS', count: 10 },
    art: 'shield',
    maxStorage: 3,
    rotatable: true,
  },
  {
    id: 'FREEZE_VAULT',
    name: 'Freeze Vault',
    description:
      'Permanently raises how many Streak Freezes you can bank, by one.',
    category: 'POWER_UP',
    rarity: 'EPIC',
    price: 1200,
    effect: { kind: 'FREEZE_CAPACITY', delta: 1 },
    unlock: { type: 'STREAK', days: 7 },
    art: 'vault',
    oneTime: true,
  },

  // ══ MYSTERY CHESTS ═════════════════════════════════════════════════════════
  {
    id: 'CHEST_BRONZE',
    name: 'Bronze Mystery Chest',
    description: 'Coins, a power-up, or — if the roll is kind — a cosmetic.',
    category: 'CHEST',
    rarity: 'COMMON',
    price: 250,
    effect: { kind: 'CHEST', tier: 'BRONZE' },
    unlock: { type: 'ALWAYS' },
    art: 'chest-bronze',
    alwaysStocked: true,
  },
  {
    id: 'CHEST_SILVER',
    name: 'Silver Mystery Chest',
    description:
      'Better odds, bigger coin rolls, and a real shot at a Rare cosmetic.',
    category: 'CHEST',
    rarity: 'RARE',
    price: 600,
    effect: { kind: 'CHEST', tier: 'SILVER' },
    unlock: { type: 'LEVEL', level: 3 },
    art: 'chest-silver',
    alwaysStocked: true,
  },
  {
    id: 'CHEST_GOLD',
    name: 'Gold Mystery Chest',
    description:
      'The only chest that can drop an Epic cosmetic. Never empty-handed.',
    category: 'CHEST',
    rarity: 'EPIC',
    price: 1500,
    effect: { kind: 'CHEST', tier: 'GOLD' },
    unlock: { type: 'LEVEL', level: 8 },
    art: 'chest-gold',
    alwaysStocked: true,
  },

  // ══ PROFILE FRAMES ═════════════════════════════════════════════════════════
  {
    id: 'FRAME_EMBER',
    name: 'Ember Frame',
    description: 'A slow-burning ring for people who show up daily.',
    category: 'FRAME',
    rarity: 'COMMON',
    price: 300,
    effect: { kind: 'COSMETIC', slot: 'FRAME' },
    unlock: { type: 'ALWAYS' },
    art: 'frame-ember',
    oneTime: true,
    rotatable: true,
  },
  {
    id: 'FRAME_FROST',
    name: 'Frost Frame',
    description: 'Earned the cold way — five days without missing.',
    category: 'FRAME',
    rarity: 'COMMON',
    price: 300,
    effect: { kind: 'COSMETIC', slot: 'FRAME' },
    unlock: { type: 'STREAK', days: 5 },
    art: 'frame-frost',
    oneTime: true,
    rotatable: true,
  },
  {
    id: 'FRAME_NEBULA',
    name: 'Nebula Frame',
    description: 'Dust and starlight, drifting.',
    category: 'FRAME',
    rarity: 'RARE',
    price: 750,
    effect: { kind: 'COSMETIC', slot: 'FRAME' },
    unlock: { type: 'LEVEL', level: 6 },
    collectionId: 'SPACE',
    art: 'frame-nebula',
    oneTime: true,
    rotatable: true,
  },
  {
    id: 'FRAME_CIRCUIT',
    name: 'Circuit Frame',
    description: 'Traces that pulse when you level up.',
    category: 'FRAME',
    rarity: 'RARE',
    price: 700,
    effect: { kind: 'COSMETIC', slot: 'FRAME' },
    unlock: { type: 'LESSONS', count: 25 },
    collectionId: 'GAMER',
    art: 'frame-circuit',
    oneTime: true,
    rotatable: true,
  },
  {
    id: 'FRAME_STUDIO',
    name: 'Studio Frame',
    description: 'Key light, rim light, and a ring that says you ship things.',
    category: 'FRAME',
    rarity: 'RARE',
    price: 800,
    effect: { kind: 'COSMETIC', slot: 'FRAME' },
    unlock: { type: 'COURSES', count: 1 },
    collectionId: 'CREATOR',
    art: 'frame-studio',
    oneTime: true,
    rotatable: true,
  },
  {
    id: 'FRAME_CHAMPION',
    name: 'Champion Frame',
    description: 'Reserved for learners who have held a top league.',
    category: 'FRAME',
    rarity: 'EPIC',
    price: 1600,
    effect: { kind: 'COSMETIC', slot: 'FRAME' },
    unlock: { type: 'LEAGUE', tier: 'GOLD' },
    art: 'frame-champion',
    oneTime: true,
  },
  {
    id: 'FRAME_LEGEND',
    name: 'Legend Frame',
    description: 'Thirty days unbroken. Almost nobody wears this one.',
    category: 'FRAME',
    rarity: 'LEGENDARY',
    price: 4000,
    effect: { kind: 'COSMETIC', slot: 'FRAME' },
    unlock: { type: 'STREAK', days: 30 },
    art: 'frame-legend',
    oneTime: true,
    prestige: true,
  },

  // ══ PROFILE BACKGROUNDS ════════════════════════════════════════════════════
  {
    id: 'BG_AURORA',
    name: 'Aurora Backdrop',
    description: 'Soft northern light behind your profile card.',
    category: 'BACKGROUND',
    rarity: 'COMMON',
    price: 350,
    effect: { kind: 'COSMETIC', slot: 'BACKGROUND' },
    unlock: { type: 'ALWAYS' },
    art: 'bg-aurora',
    oneTime: true,
    rotatable: true,
  },
  {
    id: 'BG_DEEP_SPACE',
    name: 'Deep Space Backdrop',
    description: 'Long exposure of somewhere very far away.',
    category: 'BACKGROUND',
    rarity: 'RARE',
    price: 800,
    effect: { kind: 'COSMETIC', slot: 'BACKGROUND' },
    unlock: { type: 'XP', amount: 1500 },
    collectionId: 'SPACE',
    art: 'bg-deep-space',
    oneTime: true,
    rotatable: true,
  },
  {
    id: 'BG_ARCADE',
    name: 'Arcade Backdrop',
    description: 'Cabinet glow and a scanline hum.',
    category: 'BACKGROUND',
    rarity: 'RARE',
    price: 800,
    effect: { kind: 'COSMETIC', slot: 'BACKGROUND' },
    unlock: { type: 'LESSONS', count: 40 },
    collectionId: 'GAMER',
    art: 'bg-arcade',
    oneTime: true,
    rotatable: true,
  },
  {
    id: 'BG_STUDIO_SET',
    name: 'Studio Set Backdrop',
    description: 'Seamless paper, two softboxes, one very good idea.',
    category: 'BACKGROUND',
    rarity: 'RARE',
    price: 850,
    effect: { kind: 'COSMETIC', slot: 'BACKGROUND' },
    unlock: { type: 'PURCHASES', count: 3 },
    collectionId: 'CREATOR',
    art: 'bg-studio-set',
    oneTime: true,
    rotatable: true,
  },
  {
    id: 'BG_GOLDEN_HOUR',
    name: 'Golden Hour Backdrop',
    description: 'The twenty best minutes of any day.',
    category: 'BACKGROUND',
    rarity: 'EPIC',
    price: 1600,
    effect: { kind: 'COSMETIC', slot: 'BACKGROUND' },
    unlock: { type: 'STREAK', days: 14 },
    art: 'bg-golden-hour',
    oneTime: true,
  },
  {
    id: 'BG_COSMIC_TEY',
    name: 'Cosmic Tey Backdrop',
    description: 'Tey, rendered in starlight. The rarest backdrop in the shop.',
    category: 'BACKGROUND',
    rarity: 'LEGENDARY',
    price: 3500,
    effect: { kind: 'COSMETIC', slot: 'BACKGROUND' },
    unlock: { type: 'LEVEL', level: 20 },
    art: 'bg-cosmic-tey',
    oneTime: true,
    prestige: true,
  },

  // ══ CELEBRATION EFFECTS ════════════════════════════════════════════════════
  {
    id: 'FX_CONFETTI',
    name: 'Classic Confetti',
    description: 'Paper storm on every celebration screen.',
    category: 'CELEBRATION_FX',
    rarity: 'COMMON',
    price: 300,
    effect: { kind: 'COSMETIC', slot: 'CELEBRATION_FX' },
    unlock: { type: 'ALWAYS' },
    art: 'fx-confetti',
    oneTime: true,
    rotatable: true,
  },
  {
    id: 'FX_STAR_SHOWER',
    name: 'Star Shower',
    description: 'Your celebrations rain light instead of paper.',
    category: 'CELEBRATION_FX',
    rarity: 'RARE',
    price: 750,
    effect: { kind: 'COSMETIC', slot: 'CELEBRATION_FX' },
    unlock: { type: 'LEVEL', level: 7 },
    collectionId: 'SPACE',
    art: 'fx-star-shower',
    oneTime: true,
    rotatable: true,
  },
  {
    id: 'FX_PIXEL_BURST',
    name: 'Pixel Burst',
    description: '8-bit explosion, chiptune optional.',
    category: 'CELEBRATION_FX',
    rarity: 'RARE',
    price: 750,
    effect: { kind: 'COSMETIC', slot: 'CELEBRATION_FX' },
    unlock: { type: 'LESSONS', count: 30 },
    collectionId: 'GAMER',
    art: 'fx-pixel-burst',
    oneTime: true,
    rotatable: true,
  },
  {
    id: 'FX_FILM_FLASH',
    name: 'Film Flash',
    description: 'Shutter clack and a bloom of studio light.',
    category: 'CELEBRATION_FX',
    rarity: 'RARE',
    price: 800,
    effect: { kind: 'COSMETIC', slot: 'CELEBRATION_FX' },
    unlock: { type: 'PURCHASES', count: 5 },
    collectionId: 'CREATOR',
    art: 'fx-film-flash',
    oneTime: true,
    rotatable: true,
  },
  {
    id: 'FX_PHOENIX',
    name: 'Phoenix Rise',
    description: 'Sixty days unbroken. Your celebrations catch fire.',
    category: 'CELEBRATION_FX',
    rarity: 'LEGENDARY',
    price: 3800,
    effect: { kind: 'COSMETIC', slot: 'CELEBRATION_FX' },
    unlock: { type: 'STREAK', days: 60 },
    art: 'fx-phoenix',
    oneTime: true,
    prestige: true,
  },

  // ══ XP / LESSON-COMPLETE EFFECTS ═══════════════════════════════════════════
  {
    id: 'XPFX_SPARK',
    name: 'Spark Trail',
    description: 'XP numbers leave a trail of sparks as they fly.',
    category: 'XP_FX',
    rarity: 'COMMON',
    price: 280,
    effect: { kind: 'COSMETIC', slot: 'XP_FX' },
    unlock: { type: 'ALWAYS' },
    art: 'xpfx-spark',
    oneTime: true,
    rotatable: true,
  },
  {
    id: 'XPFX_COMET',
    name: 'Comet Trail',
    description: 'Every XP gain arcs across the screen like a comet.',
    category: 'XP_FX',
    rarity: 'RARE',
    price: 700,
    effect: { kind: 'COSMETIC', slot: 'XP_FX' },
    unlock: { type: 'XP', amount: 2500 },
    collectionId: 'SPACE',
    art: 'xpfx-comet',
    oneTime: true,
    rotatable: true,
  },
  {
    id: 'XPFX_COMBO',
    name: 'Combo Counter',
    description: 'Back-to-back lessons stack a visible combo multiplier.',
    category: 'XP_FX',
    rarity: 'RARE',
    price: 700,
    effect: { kind: 'COSMETIC', slot: 'XP_FX' },
    unlock: { type: 'LESSONS', count: 20 },
    collectionId: 'GAMER',
    art: 'xpfx-combo',
    oneTime: true,
    rotatable: true,
  },

  // ══ COLLECTION REWARDS (grant-only — never purchasable) ════════════════════
  {
    id: 'FRAME_SUPERNOVA',
    name: 'Supernova Frame',
    description:
      'Granted for completing the Space Collection. Cannot be bought.',
    category: 'FRAME',
    rarity: 'LEGENDARY',
    price: 0,
    effect: { kind: 'COSMETIC', slot: 'FRAME' },
    unlock: { type: 'COLLECTION', collectionId: 'SPACE' },
    art: 'frame-supernova',
    oneTime: true,
    grantOnly: true,
    prestige: true,
  },
  {
    id: 'FRAME_ARCADE_GOLD',
    name: 'Gold Cabinet Frame',
    description:
      'Granted for completing the Gamer Collection. Cannot be bought.',
    category: 'FRAME',
    rarity: 'LEGENDARY',
    price: 0,
    effect: { kind: 'COSMETIC', slot: 'FRAME' },
    unlock: { type: 'COLLECTION', collectionId: 'GAMER' },
    art: 'frame-arcade-gold',
    oneTime: true,
    grantOnly: true,
    prestige: true,
  },
  {
    id: 'FRAME_DIRECTORS_CUT',
    name: "Director's Cut Frame",
    description:
      'Granted for completing the Creator Collection. Cannot be bought.',
    category: 'FRAME',
    rarity: 'LEGENDARY',
    price: 0,
    effect: { kind: 'COSMETIC', slot: 'FRAME' },
    unlock: { type: 'COLLECTION', collectionId: 'CREATOR' },
    art: 'frame-directors-cut',
    oneTime: true,
    grantOnly: true,
    prestige: true,
  },

  // ══ EVENT-EXCLUSIVE ════════════════════════════════════════════════════════
  {
    id: 'FRAME_HAUNTED',
    name: 'Haunted Frame',
    description:
      'Only stocked during Teyro Halloween. Gone when the window closes.',
    category: 'FRAME',
    rarity: 'EPIC',
    price: 1300,
    effect: { kind: 'COSMETIC', slot: 'FRAME' },
    unlock: { type: 'ALWAYS' },
    art: 'frame-haunted',
    oneTime: true,
    eventId: 'HALLOWEEN',
  },
  {
    id: 'BG_FIRST_SNOW',
    name: 'First Snow Backdrop',
    description: 'Only stocked during the Winter Festival.',
    category: 'BACKGROUND',
    rarity: 'EPIC',
    price: 1300,
    effect: { kind: 'COSMETIC', slot: 'BACKGROUND' },
    unlock: { type: 'ALWAYS' },
    art: 'bg-first-snow',
    oneTime: true,
    eventId: 'WINTER',
  },
  {
    id: 'FX_ANNIVERSARY',
    name: 'Anniversary Sparkler',
    description: 'Only stocked during Teyro Anniversary week.',
    category: 'CELEBRATION_FX',
    rarity: 'EPIC',
    price: 1200,
    effect: { kind: 'COSMETIC', slot: 'CELEBRATION_FX' },
    unlock: { type: 'ALWAYS' },
    art: 'fx-anniversary',
    oneTime: true,
    eventId: 'ANNIVERSARY',
  },
];

// ─── Lookups ─────────────────────────────────────────────────────────────────

const ITEMS_BY_ID = new Map<string, ShopItemDef>(
  SHOP_ITEMS.map((i) => [i.id, i]),
);

export function getShopItem(id: string): ShopItemDef | undefined {
  return ITEMS_BY_ID.get(id);
}

export function getCollection(id: string): ShopCollectionDef | undefined {
  return SHOP_COLLECTIONS.find((c) => c.id === id);
}

/** Purchasable member items of a collection (the reward item is not a member). */
export function collectionMembers(collectionId: string): ShopItemDef[] {
  return SHOP_ITEMS.filter((i) => i.collectionId === collectionId);
}

export function isCosmetic(item: ShopItemDef): boolean {
  return COSMETIC_CATEGORIES.includes(item.category);
}
