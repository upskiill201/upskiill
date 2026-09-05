/**
 * Catalogue invariants. These are the rules the economy quietly depends on —
 * a broken one does not throw at boot, it just silently makes the shop unfair
 * (an item nobody can buy, a collection that can never complete, a Legendary
 * priced like a Common), so they are asserted rather than assumed.
 */

import {
  RARITY_BANDS,
  SHOP_COLLECTIONS,
  SHOP_EVENTS,
  SHOP_ITEMS,
  collectionMembers,
  cosmeticSlotFor,
  getShopItem,
} from './shop.registry';
import {
  getActiveEvent,
  getDailyRotation,
  getWeeklySpecial,
  priceFor,
  weekKey,
  dayKey,
  weeklySpecialPrice,
} from './shop.rotation';
import { evaluateUnlock, type LearnerMetrics } from './shop.unlocks';
import { CHEST_TIERS, rollChest } from './shop.chests';

const newLearner: LearnerMetrics = {
  level: 1,
  xp: 30,
  streakDays: 0,
  longestStreak: 0,
  lessonsCompleted: 0,
  coursesCompleted: 0,
  leagueTier: 'BRONZE',
  purchaseCount: 0,
  completedCollections: [],
};

const veteran: LearnerMetrics = {
  level: 25,
  xp: 9000,
  streakDays: 90,
  longestStreak: 90,
  lessonsCompleted: 200,
  coursesCompleted: 5,
  leagueTier: 'DIAMOND',
  purchaseCount: 40,
  completedCollections: ['SPACE', 'GAMER', 'CREATOR'],
};

describe('shop registry', () => {
  it('has no duplicate item ids', () => {
    const ids = SHOP_ITEMS.map((i) => i.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('prices every purchasable item inside its rarity band', () => {
    for (const item of SHOP_ITEMS) {
      if (item.grantOnly) continue; // granted items are priced 0 by design
      const band = RARITY_BANDS[item.rarity];
      expect({ id: item.id, price: item.price }).toEqual({
        id: item.id,
        price: expect.any(Number),
      });
      expect(item.price).toBeGreaterThanOrEqual(band.min);
      expect(item.price).toBeLessThanOrEqual(band.max);
    }
  });

  it('prices grant-only items at zero so they can never be bought', () => {
    for (const item of SHOP_ITEMS.filter((i) => i.grantOnly)) {
      expect(item.price).toBe(0);
    }
  });

  it('points every collection at a real, grant-only reward item', () => {
    for (const collection of SHOP_COLLECTIONS) {
      const reward = getShopItem(collection.rewardItemId);
      expect(reward).toBeDefined();
      expect(reward!.grantOnly).toBe(true);
      // The reward must not also be a member, or the set could never complete.
      expect(reward!.collectionId).toBeUndefined();
    }
  });

  it('gives every collection at least two obtainable members', () => {
    for (const collection of SHOP_COLLECTIONS) {
      const members = collectionMembers(collection.id);
      expect(members.length).toBeGreaterThanOrEqual(2);
      for (const member of members) {
        expect(member.grantOnly).toBeFalsy();
        // A member locked behind an event window could strand the set forever.
        expect(member.eventId).toBeUndefined();
      }
    }
  });

  it('marks every cosmetic one-time and gives it a real slot', () => {
    for (const item of SHOP_ITEMS) {
      const slot = cosmeticSlotFor(item.category);
      if (!slot) continue;
      expect(item.oneTime).toBe(true);
      expect(item.effect.kind).toBe('COSMETIC');
    }
  });

  it('leaves something buyable for a brand-new learner', () => {
    const available = SHOP_ITEMS.filter(
      (i) => !i.grantOnly && !i.eventId && evaluateUnlock(i.unlock, newLearner).unlocked,
    );
    expect(available.length).toBeGreaterThan(0);
    // …and the cheapest of them is reachable from the 50-coin starter grant
    // within a few lessons, rather than being a wall on day one.
    const cheapest = Math.min(...available.map((i) => i.price));
    expect(cheapest).toBeLessThanOrEqual(150);
  });

  it('keeps prestige items locked to a brand-new learner', () => {
    for (const item of SHOP_ITEMS.filter((i) => i.prestige)) {
      expect(evaluateUnlock(item.unlock, newLearner).unlocked).toBe(false);
    }
  });

  it('opens the whole non-event catalogue to a veteran', () => {
    const locked = SHOP_ITEMS.filter(
      (i) => !i.eventId && !evaluateUnlock(i.unlock, veteran).unlocked,
    );
    expect(locked).toEqual([]);
  });
});

describe('unlock progress', () => {
  it('reports partial progress rather than a bare boolean', () => {
    const halfway = evaluateUnlock({ type: 'LESSONS', count: 20 }, {
      ...newLearner,
      lessonsCompleted: 10,
    });
    expect(halfway.unlocked).toBe(false);
    expect(halfway.percent).toBe(50);
    expect(halfway.label).toContain('20');
  });

  it('does not confiscate a streak unlock when the streak breaks', () => {
    const broken = { ...newLearner, streakDays: 0, longestStreak: 30 };
    expect(evaluateUnlock({ type: 'STREAK', days: 30 }, broken).unlocked).toBe(true);
  });

  it('clamps progress at 100 percent', () => {
    const over = evaluateUnlock({ type: 'XP', amount: 100 }, { ...newLearner, xp: 5000 });
    expect(over.percent).toBe(100);
  });
});

describe('rotation', () => {
  const day = '2026-09-05';
  const week = '2026-W36';

  it('is deterministic for a given day', () => {
    const a = getDailyRotation(day, null).map((i) => i.id);
    const b = getDailyRotation(day, null).map((i) => i.id);
    expect(a).toEqual(b);
  });

  it('changes the shelf when the day changes', () => {
    const today = getDailyRotation(day, null).map((i) => i.id);
    const tomorrow = getDailyRotation('2026-09-06', null).map((i) => i.id);
    expect(today).not.toEqual(tomorrow);
  });

  it('never rotates a grant-only item onto the shelf', () => {
    for (let d = 1; d <= 28; d++) {
      const key = `2026-09-${String(d).padStart(2, '0')}`;
      for (const item of getDailyRotation(key, null)) {
        expect(item.grantOnly).toBeFalsy();
      }
    }
  });

  it('only ever features RARE or better as the weekly special', () => {
    for (let w = 1; w <= 52; w++) {
      const key = `2026-W${String(w).padStart(2, '0')}`;
      const special = getWeeklySpecial(key, null);
      expect(special).not.toBeNull();
      expect(['RARE', 'EPIC', 'LEGENDARY']).toContain(special!.rarity);
      expect(special!.prestige).toBeFalsy();
    }
  });

  it('discounts the weekly special below its normal price', () => {
    const special = getWeeklySpecial(week, null)!;
    expect(weeklySpecialPrice(special, null)).toBeLessThan(priceFor(special, null).price);
  });

  it('derives stable calendar keys', () => {
    expect(dayKey(new Date('2026-09-05T12:00:00Z'), 0)).toBe('2026-09-05');
    expect(weekKey(new Date('2026-09-05T12:00:00Z'), 0)).toMatch(/^2026-W\d{2}$/);
  });
});

describe('events', () => {
  it('never discounts a prestige item', () => {
    const event = SHOP_EVENTS.find((e) => e.discountPercent > 0)!;
    for (const item of SHOP_ITEMS.filter((i) => i.prestige)) {
      expect(priceFor(item, event).price).toBe(item.price);
    }
  });

  it('discounts ordinary items while an event is live', () => {
    const event = SHOP_EVENTS.find((e) => e.id === 'WINTER')!;
    const ordinary = SHOP_ITEMS.find((i) => !i.prestige && !i.grantOnly)!;
    expect(priceFor(ordinary, event).price).toBeLessThan(ordinary.price);
  });

  it('handles a window that wraps the new year', () => {
    // WINTER runs Dec 15 → Jan 2.
    expect(getActiveEvent(new Date('2026-12-20T00:00:00Z'))?.id).toBe('WINTER');
    expect(getActiveEvent(new Date('2027-01-01T00:00:00Z'))?.id).toBe('WINTER');
    expect(getActiveEvent(new Date('2026-06-01T00:00:00Z'))).toBeNull();
  });
});

describe('mystery chests', () => {
  it('never pays out nothing', () => {
    for (const tier of CHEST_TIERS) {
      for (let i = 0; i < 200; i++) {
        const roll = rollChest(tier, new Set());
        const gotSomething = roll.coins > 0 || roll.item !== null;
        expect(gotSomething).toBe(true);
      }
    }
  });

  it('always clears the tier coin floor', () => {
    for (const tier of CHEST_TIERS) {
      for (let i = 0; i < 100; i++) {
        expect(rollChest(tier, new Set()).coins).toBeGreaterThanOrEqual(tier.coinFloor);
      }
    }
  });

  it('never drops a prestige, grant-only or event item', () => {
    for (const tier of CHEST_TIERS) {
      for (let i = 0; i < 300; i++) {
        const { item } = rollChest(tier, new Set());
        if (!item) continue;
        expect(item.prestige).toBeFalsy();
        expect(item.grantOnly).toBeFalsy();
        expect(item.eventId).toBeUndefined();
      }
    }
  });

  it('substitutes coins instead of handing back a duplicate cosmetic', () => {
    const owned = new Set(SHOP_ITEMS.filter((i) => i.oneTime).map((i) => i.id));
    for (const tier of CHEST_TIERS) {
      for (let i = 0; i < 100; i++) {
        const roll = rollChest(tier, owned);
        if (roll.item) {
          // Anything still winnable must be a stackable, not an owned one-time.
          expect(roll.item.oneTime).toBeFalsy();
        } else {
          expect(roll.coins).toBeGreaterThan(0);
        }
      }
    }
  });
});
