/**
 * Shop rotation — which items are stocked today, this week, and during events.
 *
 * Rotation is *derived*, never stored: a seeded PRNG keyed on the calendar day
 * produces the same shelf for every learner and for every request on that day,
 * so there is no rotation table to write, no cron to miss, and no drift between
 * two servers. Change the day, change the shop.
 */

import {
  SHOP_EVENTS,
  SHOP_ITEMS,
  RARITY_ORDER,
  type ShopEventDef,
  type ShopItemDef,
} from './shop.registry';

// ─── Deterministic PRNG ──────────────────────────────────────────────────────

/** FNV-1a — a stable string hash (Math.random would defeat the whole design). */
function hashSeed(key: string): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < key.length; i++) {
    h ^= key.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
}

/** mulberry32 — small, fast, good enough for shelf shuffling. */
function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Fisher–Yates against a seeded stream — same seed, same order, always. */
function seededShuffle<T>(items: T[], seed: string): T[] {
  const rand = mulberry32(hashSeed(seed));
  const out = [...items];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

// ─── Calendar keys ───────────────────────────────────────────────────────────

/**
 * The learner's local calendar day. `timezoneOffset` is JS
 * `Date.getTimezoneOffset()` (minutes *behind* UTC), matching what the rest of
 * the gamification stack already sends up.
 */
export function dayKey(now: Date, timezoneOffset = 0): string {
  const local = new Date(now.getTime() - timezoneOffset * 60_000);
  return local.toISOString().slice(0, 10);
}

/** ISO-8601 week key, e.g. "2026-W36" — the weekly special's rotation unit. */
export function weekKey(now: Date, timezoneOffset = 0): string {
  const local = new Date(now.getTime() - timezoneOffset * 60_000);
  const d = new Date(
    Date.UTC(local.getUTCFullYear(), local.getUTCMonth(), local.getUTCDate()),
  );
  // Thursday of the current week decides the ISO year.
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  const week = Math.ceil(
    ((d.getTime() - yearStart.getTime()) / 86_400_000 + 1) / 7,
  );
  return `${d.getUTCFullYear()}-W${String(week).padStart(2, '0')}`;
}

/** Milliseconds until the learner's local midnight — powers the shop countdown. */
export function msUntilNextDay(now: Date, timezoneOffset = 0): number {
  const local = new Date(now.getTime() - timezoneOffset * 60_000);
  const nextMidnight = Date.UTC(
    local.getUTCFullYear(),
    local.getUTCMonth(),
    local.getUTCDate() + 1,
    0,
    0,
    0,
    0,
  );
  return nextMidnight - local.getTime();
}

/** Milliseconds until the weekly special rolls over (next ISO Monday, local). */
export function msUntilNextWeek(now: Date, timezoneOffset = 0): number {
  const local = new Date(now.getTime() - timezoneOffset * 60_000);
  const dayNum = local.getUTCDay() || 7; // Mon=1 … Sun=7
  const daysUntilMonday = 8 - dayNum;
  const nextMonday = Date.UTC(
    local.getUTCFullYear(),
    local.getUTCMonth(),
    local.getUTCDate() + daysUntilMonday,
    0,
    0,
    0,
    0,
  );
  return nextMonday - local.getTime();
}

// ─── Events ──────────────────────────────────────────────────────────────────

/** Is `now` inside the event's month/day window? Handles new-year wrap. */
function isEventLive(event: ShopEventDef, now: Date): boolean {
  const month = now.getUTCMonth() + 1;
  const day = now.getUTCDate();
  const asNum = month * 100 + day;
  const start = event.start.month * 100 + event.start.day;
  const end = event.end.month * 100 + event.end.day;
  // A window like Dec 15 → Jan 2 wraps the year boundary.
  return start <= end
    ? asNum >= start && asNum <= end
    : asNum >= start || asNum <= end;
}

export function getActiveEvent(now: Date): ShopEventDef | null {
  return SHOP_EVENTS.find((e) => isEventLive(e, now)) ?? null;
}

/**
 * Event pricing. Prestige and grant-only items never discount — the whole
 * point of a 4,000-coin Legendary is that it costs 4,000 coins.
 */
export function priceFor(
  item: ShopItemDef,
  event: ShopEventDef | null,
): {
  price: number;
  basePrice: number;
  discountPercent: number;
} {
  const base = item.price;
  if (!event || event.discountPercent <= 0 || item.prestige || item.grantOnly) {
    return { price: base, basePrice: base, discountPercent: 0 };
  }
  const price = Math.max(
    1,
    Math.round((base * (100 - event.discountPercent)) / 100),
  );
  return { price, basePrice: base, discountPercent: event.discountPercent };
}

// ─── Stock ───────────────────────────────────────────────────────────────────

/** Items that are never rotated out — the shop's spine. */
export function stockedAlways(): ShopItemDef[] {
  return SHOP_ITEMS.filter((i) => i.alwaysStocked && !i.grantOnly);
}

const DAILY_ROTATION_SIZE = 4;

/**
 * Today's rotating shelf. Drawn from `rotatable` items only, so the staples
 * (hearts, freezes, chests) stay buyable every day — a learner who breaks a
 * streak must never find Streak Repair rotated out.
 */
export function getDailyRotation(
  key: string,
  event: ShopEventDef | null,
): ShopItemDef[] {
  const pool = SHOP_ITEMS.filter(
    (i) =>
      i.rotatable && !i.grantOnly && (!i.eventId || i.eventId === event?.id),
  );
  return seededShuffle(pool, `daily:${key}`).slice(0, DAILY_ROTATION_SIZE);
}

/**
 * This week's special — always the good stuff. Drawn from RARE and above so
 * the weekly slot is a genuine reason to save rather than another Common.
 */
export function getWeeklySpecial(
  key: string,
  event: ShopEventDef | null,
): ShopItemDef | null {
  const pool = SHOP_ITEMS.filter(
    (i) =>
      !i.grantOnly &&
      !i.prestige &&
      RARITY_ORDER[i.rarity] >= RARITY_ORDER.RARE &&
      (!i.eventId || i.eventId === event?.id),
  );
  const picked = seededShuffle(pool, `weekly:${key}`)[0];
  return picked ?? null;
}

/** Extra coins off the weekly special, on top of any event discount. */
export const WEEKLY_SPECIAL_DISCOUNT_PERCENT = 25;

export function weeklySpecialPrice(
  item: ShopItemDef,
  event: ShopEventDef | null,
): number {
  const { price } = priceFor(item, event);
  if (item.prestige || item.grantOnly) return price;
  return Math.max(
    1,
    Math.round((price * (100 - WEEKLY_SPECIAL_DISCOUNT_PERCENT)) / 100),
  );
}

/** Event-exclusive items, only while their window is open. */
export function getEventItems(event: ShopEventDef | null): ShopItemDef[] {
  if (!event) return [];
  return SHOP_ITEMS.filter((i) => i.eventId === event.id);
}
