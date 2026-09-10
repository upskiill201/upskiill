import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import type { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import {
  COSMETIC_CATEGORIES,
  RARITY_ORDER,
  SHOP_COLLECTIONS,
  SHOP_ITEMS,
  collectionMembers,
  cosmeticSlotFor,
  getCollection,
  getShopItem,
  isCosmetic,
  type CosmeticSlot,
  type ShopItemDef,
} from './shop.registry';

/**
 * Machine-readable reason codes for a blocked purchase or a purchase-flow
 * rejection. Additive alongside the existing human `message`/`blockedReason`
 * strings (kept for compatibility/logging) — lets the frontend render a
 * Tey-voiced line by code, falling back to the raw string for any condition
 * not covered here.
 */
export type ShopBlockReasonCode =
  | 'ALREADY_OWNED'
  | 'LOCKED'
  | 'HEARTS_FULL'
  | 'FREEZE_BANK_FULL'
  | 'AT_MAX'
  | 'INSUFFICIENT_COINS'
  | 'GRANTED_BY_COLLECTION';
import {
  dayKey,
  getActiveEvent,
  getDailyRotation,
  getEventItems,
  getWeeklySpecial,
  msUntilNextDay,
  msUntilNextWeek,
  priceFor,
  stockedAlways,
  weekKey,
  weeklySpecialPrice,
  WEEKLY_SPECIAL_DISCOUNT_PERCENT,
} from './shop.rotation';
import {
  evaluateUnlock,
  type LearnerMetrics,
  type UnlockStatus,
} from './shop.unlocks';
import { CHEST_TIERS, chestOdds, getChestTier, rollChest } from './shop.chests';

/** Base freeze cap before any Freeze Vault upgrade. Mirrors the streak logic. */
const BASE_FREEZE_CAP = 2;

/** How long after a break a streak can still be bought back. */
const STREAK_REPAIR_WINDOW_DAYS = 2;

/** Daily shop-visit reward, scaling with consecutive visits (index = streak-1). */
const VISIT_REWARD_LADDER = [10, 15, 20, 25, 30, 40, 60];

/**
 * Interactive-transaction budget for shop writes.
 *
 * Prisma's default is 5s, which is not enough here: a purchase does a dozen
 * sequential round trips inside one transaction (eligibility reads, the
 * guarded debit, the effect write, two ledger rows), and the app talks to the
 * database over a pooler. At 5s those spuriously abort under ordinary latency
 * — the money is safe, since the whole transaction rolls back, but the
 * learner sees a failed purchase for no reason. `maxWait` covers time spent
 * queueing for a connection when the pool is busy.
 */
const TX_OPTIONS = { timeout: 20_000, maxWait: 10_000 } as const;

export interface ShopItemView {
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
  /** Cosmetic slot, or null for power-ups and chests. */
  slot: CosmeticSlot | null;
  owned: boolean;
  /** Consumable stack count / charges held. */
  quantity: number;
  maxStorage?: number;
  equipped: boolean;
  /** True when a one-time item is already owned and cannot be re-bought. */
  soldOut: boolean;
  unlock: UnlockStatus;
  affordable: boolean;
  /** Coins still needed — powers "You're 200 coins away". */
  coinsShort: number;
  /** Why the buy button is disabled, or null when it is buyable. */
  blockedReason: string | null;
  /** Machine-readable twin of `blockedReason` — lets the frontend pick a
   * Tey-voiced line instead of showing the raw string, with `blockedReason`
   * itself kept as the graceful fallback when a code is unrecognized. */
  blockedReasonCode: ShopBlockReasonCode | null;
  /** Timed boosts currently running. */
  activeUntil: string | null;
}

@Injectable()
export class ShopService {
  private readonly logger = new Logger(ShopService.name);

  constructor(private prisma: PrismaService) {}

  // ═══ Metrics ═══════════════════════════════════════════════════════════════

  /**
   * Everything the unlock rules read, assembled in one pass. Deliberately a
   * handful of cheap indexed counts rather than a projection table — the shop
   * is not hot enough to justify another cache that can drift.
   */
  private async loadMetrics(userId: string): Promise<{
    metrics: LearnerMetrics;
    profile: Prisma.StudentProfileGetPayload<{}>;
    state: Prisma.UserShopStateGetPayload<{}> | null;
  }> {
    const profile = await this.prisma.studentProfile.findUnique({
      where: { userId },
    });
    if (!profile) throw new NotFoundException('Student profile not found.');

    const [lessonsCompleted, coursesCompleted, purchaseCount, state] =
      await Promise.all([
        this.prisma.userLessonProgress.count({
          where: { userId, status: 'completed' },
        }),
        this.prisma.userCourseProgress.count({
          where: { userId, status: 'completed' },
        }),
        this.prisma.shopTransaction.count({ where: { userId } }),
        this.prisma.userShopState.findUnique({ where: { userId } }),
      ]);

    const claimed = Array.isArray(state?.claimedCollections)
      ? (state!.claimedCollections as unknown[]).filter(
          (c): c is string => typeof c === 'string',
        )
      : [];

    return {
      profile,
      state,
      metrics: {
        // One level curve, matching GamificationService (flat 100 XP per level).
        level: Math.floor(profile.xp / 100) + 1,
        xp: profile.xp,
        streakDays: profile.streakDays,
        longestStreak: profile.longestStreak,
        lessonsCompleted,
        coursesCompleted,
        leagueTier: profile.leagueTier,
        purchaseCount,
        completedCollections: claimed,
      },
    };
  }

  private async loadOwned(userId: string) {
    const rows = await this.prisma.userShopItem.findMany({ where: { userId } });
    return new Map(rows.map((r) => [r.itemId, r]));
  }

  private freezeCap(state: { freezeCapacityBonus: number } | null): number {
    return BASE_FREEZE_CAP + (state?.freezeCapacityBonus ?? 0);
  }

  // ═══ Catalogue ═════════════════════════════════════════════════════════════

  /**
   * The whole shop, shaped for one learner: what is stocked today, what they
   * can afford, what is locked and how far off it is, and what to chase next.
   */
  async getCatalog(userId: string, timezoneOffset = 0) {
    const now = new Date();
    const { profile, state, metrics } = await this.loadMetrics(userId);
    const owned = await this.loadOwned(userId);

    // Newly-met requirements are recorded before the response is built, so the
    // Shop Engine can surface them on this very page load.
    const newUnlocks = await this.syncUnlocks(userId, metrics);

    const event = getActiveEvent(now);
    const today = dayKey(now, timezoneOffset);
    const week = weekKey(now, timezoneOffset);

    const toView = (item: ShopItemDef, overridePrice?: number): ShopItemView =>
      this.buildItemView(item, {
        profile,
        state,
        metrics,
        owned,
        event,
        overridePrice,
      });

    const rotationItems = getDailyRotation(today, event);
    const weeklyItem = getWeeklySpecial(week, event);
    const eventItems = getEventItems(event);

    // Featured: the weekly special first, then event exclusives, then anything
    // that just unlocked — the shop should lead with what is new to *you*.
    const featuredIds = new Set<string>();
    const featured: ShopItemView[] = [];
    const pushFeatured = (item: ShopItemDef | null, price?: number) => {
      if (!item || featuredIds.has(item.id)) return;
      featuredIds.add(item.id);
      featured.push(toView(item, price));
    };
    if (weeklyItem)
      pushFeatured(weeklyItem, weeklySpecialPrice(weeklyItem, event));
    eventItems.forEach((i) => pushFeatured(i));
    newUnlocks.forEach((id) => pushFeatured(getShopItem(id) ?? null));

    // Categories: every item the learner can see, grouped. Locked items stay
    // visible on purpose — a locked Legendary is the goal, not clutter.
    const visible = SHOP_ITEMS.filter(
      (i) => !i.eventId || i.eventId === event?.id,
    );
    const categories = [
      'POWER_UP',
      'CHEST',
      'FRAME',
      'BACKGROUND',
      'CELEBRATION_FX',
      'XP_FX',
    ].map((category) => ({
      category,
      items: visible
        .filter((i) => i.category === category)
        .map((i) => toView(i))
        .sort((a, b) => {
          // Buyable first, then by rarity, then by price.
          if (a.blockedReason === null && b.blockedReason !== null) return -1;
          if (a.blockedReason !== null && b.blockedReason === null) return 1;
          const rarity =
            RARITY_ORDER[a.rarity as keyof typeof RARITY_ORDER] -
            RARITY_ORDER[b.rarity as keyof typeof RARITY_ORDER];
          return rarity !== 0 ? rarity : a.price - b.price;
        }),
    }));

    const collections = SHOP_COLLECTIONS.map((collection) => {
      const members = collectionMembers(collection.id);
      const ownedCount = members.filter((m) => owned.has(m.id)).length;
      const claimed = metrics.completedCollections.includes(collection.id);
      const reward = getShopItem(collection.rewardItemId);
      return {
        ...collection,
        items: members.map((m) => toView(m)),
        ownedCount,
        totalCount: members.length,
        complete: ownedCount === members.length,
        claimed,
        /** Claimable exactly once, the moment the set is finished. */
        claimable: ownedCount === members.length && !claimed,
        rewardItem: reward ? toView(reward) : null,
      };
    });

    return {
      coins: profile.coins,
      lives: profile.lives,
      maxLives: profile.maxLives,
      streakFreezeBank: profile.streakFreezeBank,
      freezeCap: this.freezeCap(state),
      event: event
        ? {
            id: event.id,
            name: event.name,
            tagline: event.tagline,
            discountPercent: event.discountPercent,
            accent: event.accent,
          }
        : null,
      featured,
      dailyRotation: {
        items: rotationItems.map((i) => toView(i)),
        resetsInMs: msUntilNextDay(now, timezoneOffset),
      },
      weeklySpecial: weeklyItem
        ? {
            item: toView(weeklyItem, weeklySpecialPrice(weeklyItem, event)),
            discountPercent: WEEKLY_SPECIAL_DISCOUNT_PERCENT,
            resetsInMs: msUntilNextWeek(now, timezoneOffset),
          }
        : null,
      alwaysStocked: stockedAlways().map((i) => toView(i)),
      categories,
      collections,
      chests: CHEST_TIERS.map((tier) => {
        const item = getShopItem(tier.itemId);
        return {
          tier: tier.tier,
          name: tier.name,
          accent: tier.accent,
          coinFloor: tier.coinFloor,
          odds: chestOdds(tier),
          item: item ? toView(item) : null,
        };
      }),
      recommendations: this.buildRecommendations(visible, {
        profile,
        state,
        metrics,
        owned,
        event,
      }),
      goals: this.buildGoals(visible, {
        profile,
        state,
        metrics,
        owned,
        event,
      }),
      newUnlocks,
    };
  }

  private buildItemView(
    item: ShopItemDef,
    ctx: {
      profile: {
        coins: number;
        lives: number;
        maxLives: number;
        streakFreezeBank: number;
      };
      state: { freezeCapacityBonus: number } | null;
      metrics: LearnerMetrics;
      owned: Map<
        string,
        { quantity: number; equipped: boolean; expiresAt: Date | null }
      >;
      event: ReturnType<typeof getActiveEvent>;
      overridePrice?: number;
    },
  ): ShopItemView {
    const { profile, state, metrics, owned, event, overridePrice } = ctx;
    const pricing = priceFor(item, event);
    const price = overridePrice ?? pricing.price;
    const unlock = evaluateUnlock(item.unlock, metrics);
    const row = owned.get(item.id);
    const quantity = row?.quantity ?? 0;
    const isOwned = Boolean(row) && quantity > 0;
    const soldOut = Boolean(item.oneTime) && isOwned;
    const affordable = profile.coins >= price;

    // Ordered by what the learner most needs to know: the hard stops first,
    // then the requirement, then the price.
    let blockedReason: string | null = null;
    let blockedReasonCode: ShopBlockReasonCode | null = null;
    if (item.grantOnly) {
      blockedReason = isOwned ? null : 'Granted by completing its collection';
      blockedReasonCode = isOwned ? null : 'GRANTED_BY_COLLECTION';
    } else if (soldOut) {
      blockedReason = 'Already owned';
      blockedReasonCode = 'ALREADY_OWNED';
    } else if (!unlock.unlocked) {
      blockedReason = unlock.label;
      blockedReasonCode = 'LOCKED';
    } else if (
      item.effect.kind === 'REFILL_HEARTS' &&
      profile.lives >= profile.maxLives
    ) {
      blockedReason = 'Your hearts are already full';
      blockedReasonCode = 'HEARTS_FULL';
    } else if (
      item.effect.kind === 'GRANT_FREEZE' &&
      profile.streakFreezeBank >= this.freezeCap(state)
    ) {
      blockedReason = 'Freeze bank full';
      blockedReasonCode = 'FREEZE_BANK_FULL';
    } else if (
      item.maxStorage !== undefined &&
      item.effect.kind === 'CHARGES' &&
      quantity >= item.maxStorage
    ) {
      blockedReason = 'You are holding the maximum';
      blockedReasonCode = 'AT_MAX';
    } else if (!affordable) {
      blockedReason = `${(price - profile.coins).toLocaleString()} more coins needed`;
      blockedReasonCode = 'INSUFFICIENT_COINS';
    }

    return {
      id: item.id,
      name: item.name,
      description: item.description,
      category: item.category,
      rarity: item.rarity,
      price,
      basePrice: pricing.basePrice,
      discountPercent:
        overridePrice !== undefined && overridePrice < pricing.basePrice
          ? Math.round(
              ((pricing.basePrice - overridePrice) / pricing.basePrice) * 100,
            )
          : pricing.discountPercent,
      art: item.art,
      collectionId: item.collectionId,
      prestige: Boolean(item.prestige),
      grantOnly: Boolean(item.grantOnly),
      eventId: item.eventId,
      slot: cosmeticSlotFor(item.category),
      owned: isOwned,
      quantity,
      maxStorage: item.maxStorage,
      equipped: Boolean(row?.equipped),
      soldOut,
      unlock,
      affordable,
      coinsShort: Math.max(0, price - profile.coins),
      blockedReason,
      blockedReasonCode,
      activeUntil: row?.expiresAt ? row.expiresAt.toISOString() : null,
    };
  }

  /**
   * "Recommended for you" — three picks, each with a reason the learner can
   * verify. Rules over a model: cheap, explainable, and it cannot recommend
   * something they cannot see.
   */
  private buildRecommendations(
    items: ShopItemDef[],
    ctx: Parameters<ShopService['buildItemView']>[1],
  ): { reason: string; item: ShopItemView }[] {
    const { profile, metrics, owned } = ctx;
    const out: { reason: string; item: ShopItemView }[] = [];
    const taken = new Set<string>();

    const add = (item: ShopItemDef | undefined, reason: string) => {
      if (!item || taken.has(item.id) || out.length >= 3) return;
      const view = this.buildItemView(item, ctx);
      if (view.soldOut || !view.unlock.unlocked) return;
      taken.add(item.id);
      out.push({ reason, item: view });
    };

    // 1. Situational need beats everything — a learner one heart from empty
    //    does not want a cosmetic.
    if (profile.lives < profile.maxLives) {
      add(getShopItem('REFILL_HEARTS'), 'Your hearts are running low');
    }
    if (metrics.streakDays >= 3 && profile.streakFreezeBank === 0) {
      add(
        getShopItem('STREAK_FREEZE'),
        `Protect your ${metrics.streakDays}-day streak`,
      );
    }

    // 2. The cheapest thing they can afford right now but do not own — the
    //    "spend it while you feel it" slot.
    const affordable = items
      .filter(
        (i) =>
          !i.grantOnly &&
          !(i.oneTime && owned.has(i.id)) &&
          evaluateUnlock(i.unlock, metrics).unlocked &&
          priceFor(i, ctx.event).price <= profile.coins,
      )
      .sort((a, b) => RARITY_ORDER[b.rarity] - RARITY_ORDER[a.rarity]);
    add(affordable[0], 'The best thing you can afford today');

    // 3. Collection nudge — one item from a set they have already started.
    for (const collection of SHOP_COLLECTIONS) {
      const members = collectionMembers(collection.id);
      const have = members.filter((m) => owned.has(m.id)).length;
      if (have > 0 && have < members.length) {
        const missing = members.find((m) => !owned.has(m.id));
        add(
          missing,
          `${members.length - have} more to finish ${collection.name}`,
        );
        break;
      }
    }

    return out;
  }

  /**
   * Shop goals — the "keep learning to get it" half of the loop. One savings
   * goal (coins), one learning goal (a locked item worth chasing), and one
   * collection goal.
   */
  private buildGoals(
    items: ShopItemDef[],
    ctx: Parameters<ShopService['buildItemView']>[1],
  ): {
    kind: string;
    label: string;
    current: number;
    target: number;
    itemId: string | null;
  }[] {
    const { profile, metrics, owned } = ctx;
    const goals: {
      kind: string;
      label: string;
      current: number;
      target: number;
      itemId: string | null;
    }[] = [];

    // Savings goal: the nearest unlocked item they cannot yet afford.
    const saving = items
      .filter(
        (i) =>
          !i.grantOnly &&
          !(i.oneTime && owned.has(i.id)) &&
          evaluateUnlock(i.unlock, metrics).unlocked &&
          priceFor(i, ctx.event).price > profile.coins,
      )
      .sort(
        (a, b) => priceFor(a, ctx.event).price - priceFor(b, ctx.event).price,
      )[0];
    if (saving) {
      const price = priceFor(saving, ctx.event).price;
      goals.push({
        kind: 'SAVE',
        label: `Save ${(price - profile.coins).toLocaleString()} more coins for ${saving.name}`,
        current: profile.coins,
        target: price,
        itemId: saving.id,
      });
    }

    // Learning goal: the locked item they are closest to unlocking.
    const chasing = items
      .filter(
        (i) => !i.grantOnly && !evaluateUnlock(i.unlock, metrics).unlocked,
      )
      .map((i) => ({ item: i, unlock: evaluateUnlock(i.unlock, metrics) }))
      .sort((a, b) => b.unlock.percent - a.unlock.percent)[0];
    if (chasing) {
      goals.push({
        kind: 'UNLOCK',
        label: `${chasing.unlock.label} to unlock ${chasing.item.name}`,
        current: chasing.unlock.current,
        target: chasing.unlock.target,
        itemId: chasing.item.id,
      });
    }

    // Collection goal: the set closest to done without being done.
    const collectionGoal = SHOP_COLLECTIONS.map((c) => {
      const members = collectionMembers(c.id);
      return {
        c,
        have: members.filter((m) => owned.has(m.id)).length,
        total: members.length,
      };
    })
      .filter((g) => g.have > 0 && g.have < g.total)
      .sort((a, b) => b.have / b.total - a.have / a.total)[0];
    if (collectionGoal) {
      const remaining = collectionGoal.total - collectionGoal.have;
      goals.push({
        kind: 'COLLECTION',
        label: `Collect ${remaining} more item${remaining === 1 ? '' : 's'} to complete ${collectionGoal.c.name}`,
        current: collectionGoal.have,
        target: collectionGoal.total,
        itemId: null,
      });
    }

    return goals;
  }

  // ═══ Unlocks ═══════════════════════════════════════════════════════════════

  /**
   * Record every item whose requirement is now met. Returns only the ids that
   * were newly written, so callers can announce them.
   *
   * `ALWAYS` items are skipped — nothing "unlocks" that was never locked, and
   * announcing them would bury the real unlocks in noise on day one.
   */
  async syncUnlocks(
    userId: string,
    metrics?: LearnerMetrics,
  ): Promise<string[]> {
    const m = metrics ?? (await this.loadMetrics(userId)).metrics;

    const qualifying = SHOP_ITEMS.filter(
      (i) => i.unlock.type !== 'ALWAYS' && evaluateUnlock(i.unlock, m).unlocked,
    ).map((i) => i.id);

    // ── First reconciliation: backfill silently ───────────────────────────
    // Everything the learner ALREADY qualified for is recorded as seen. They
    // earned a 30-day streak months ago; announcing it now as "new!" would be
    // a lie, and a long-standing learner would meet a stack of full-page
    // takeovers before reaching the app. Only what they cross from here on is
    // worth interrupting them for.
    const state = await this.prisma.userShopState.findUnique({
      where: { userId },
      select: { unlocksBackfilledAt: true },
    });

    if (!state?.unlocksBackfilledAt) {
      const now = new Date();
      if (qualifying.length > 0) {
        await this.prisma.userShopUnlock.createMany({
          data: qualifying.map((itemId) => ({ userId, itemId, seenAt: now })),
          skipDuplicates: true,
        });
      }
      await this.prisma.userShopState.upsert({
        where: { userId },
        update: { unlocksBackfilledAt: now },
        create: { userId, unlocksBackfilledAt: now },
      });
      return [];
    }

    if (qualifying.length === 0) return [];

    const existing = await this.prisma.userShopUnlock.findMany({
      where: { userId, itemId: { in: qualifying } },
      select: { itemId: true },
    });
    const known = new Set(existing.map((e) => e.itemId));
    const fresh = qualifying.filter((id) => !known.has(id));
    if (fresh.length === 0) return [];

    // createMany + skipDuplicates rather than a transaction: the unique index
    // makes the write idempotent, so two concurrent requests both settle on
    // one row instead of racing.
    await this.prisma.userShopUnlock.createMany({
      data: fresh.map((itemId) => ({ userId, itemId })),
      skipDuplicates: true,
    });

    return fresh;
  }

  /** Unlocks the Shop Engine has not shown yet — its wake-up signal. */
  async getPendingUnlocks(userId: string) {
    await this.syncUnlocks(userId);
    const rows = await this.prisma.userShopUnlock.findMany({
      where: { userId, seenAt: null },
      orderBy: { unlockedAt: 'asc' },
      // Hard cap on how many takeovers one moment can produce. Finishing a
      // lesson can cross a lesson-count, an XP and a level threshold at once;
      // three full-page scenes is already a lot, and anything beyond that
      // waits for the next visit rather than becoming a queue to sit through.
      take: 3,
    });

    const { profile, state, metrics } = await this.loadMetrics(userId);
    const owned = await this.loadOwned(userId);
    const event = getActiveEvent(new Date());

    return rows
      .map((row) => {
        const item = getShopItem(row.itemId);
        if (!item) return null;
        return {
          unlockedAt: row.unlockedAt.toISOString(),
          item: this.buildItemView(item, {
            profile,
            state,
            metrics,
            owned,
            event,
          }),
        };
      })
      .filter((r): r is NonNullable<typeof r> => r !== null);
  }

  async markUnlocksSeen(userId: string, itemIds: string[]) {
    if (itemIds.length === 0) return { updated: 0 };
    const res = await this.prisma.userShopUnlock.updateMany({
      where: { userId, itemId: { in: itemIds }, seenAt: null },
      data: { seenAt: new Date() },
    });
    return { updated: res.count };
  }

  // ═══ Purchase ══════════════════════════════════════════════════════════════

  /**
   * Buy one item.
   *
   * Everything — the balance check, the debit, the grant and both audit rows —
   * happens inside a single interactive transaction, and the debit itself is a
   * conditional `updateMany` guarded on `coins >= price`. That guard is what
   * closes the check-then-act race the old endpoint had: two concurrent buys
   * cannot both pass, because the second one updates zero rows and rolls the
   * whole transaction back.
   *
   * `idempotencyKey` is the retry guard — a replayed request collides on the
   * unique index and returns the original purchase instead of charging twice.
   */
  async purchase(userId: string, itemId: string, idempotencyKey?: string) {
    const item = getShopItem(itemId);
    if (!item) throw new BadRequestException('Invalid shop item specified.');
    if (item.grantOnly) {
      throw new BadRequestException(
        `${item.name} can only be earned, not bought.`,
      );
    }

    // Replay check before doing any work — a retried request must be cheap.
    if (idempotencyKey) {
      const prior = await this.prisma.shopTransaction.findUnique({
        where: { idempotencyKey },
      });
      if (prior) {
        const profile = await this.prisma.studentProfile.findUnique({
          where: { userId },
        });
        return {
          success: true,
          replayed: true,
          message: `${item.name} already purchased.`,
          itemId: item.id,
          coins: profile?.coins ?? 0,
          gems: profile?.coins ?? 0,
          lives: profile?.lives ?? 0,
          maxLives: profile?.maxLives ?? 5,
          streakFreezeBank: profile?.streakFreezeBank ?? 0,
        };
      }
    }

    const now = new Date();
    const event = getActiveEvent(now);

    // The weekly special is discounted, and the price must be recomputed
    // server-side — a client that posts its own price is a client that sets
    // its own price.
    const weekly = getWeeklySpecial(weekKey(now, 0), event);
    const price =
      weekly?.id === item.id
        ? weeklySpecialPrice(item, event)
        : priceFor(item, event).price;

    const result = await this.prisma.$transaction(async (tx) => {
      const profile = await tx.studentProfile.findUnique({ where: { userId } });
      if (!profile) throw new NotFoundException('Student profile not found.');

      const state = await tx.userShopState.findUnique({ where: { userId } });
      const existing = await tx.userShopItem.findUnique({
        where: { userId_itemId: { userId, itemId: item.id } },
      });

      // ── Eligibility ───────────────────────────────────────────────────────
      const { metrics } = await this.metricsInTx(tx, userId, profile, state);
      const unlock = evaluateUnlock(item.unlock, metrics);
      if (!unlock.unlocked) {
        throw new BadRequestException({
          message: `${unlock.label} to unlock ${item.name}.`,
          code: 'LOCKED' satisfies ShopBlockReasonCode,
        });
      }
      if (item.oneTime && existing && existing.quantity > 0) {
        throw new BadRequestException({
          message: `You already own ${item.name}.`,
          code: 'ALREADY_OWNED' satisfies ShopBlockReasonCode,
        });
      }
      if (
        item.effect.kind === 'REFILL_HEARTS' &&
        profile.lives >= profile.maxLives
      ) {
        throw new BadRequestException({
          message: 'Your hearts are already full!',
          code: 'HEARTS_FULL' satisfies ShopBlockReasonCode,
        });
      }
      if (item.effect.kind === 'GRANT_FREEZE') {
        const cap = this.freezeCap(state);
        if (profile.streakFreezeBank >= cap) {
          throw new BadRequestException({
            message: `Maximum capacity reached! You can bank up to ${cap} Streak Freezes.`,
            code: 'FREEZE_BANK_FULL' satisfies ShopBlockReasonCode,
          });
        }
      }
      if (
        item.effect.kind === 'CHARGES' &&
        item.maxStorage !== undefined &&
        (existing?.quantity ?? 0) >= item.maxStorage
      ) {
        throw new BadRequestException({
          message: `You are already holding the maximum of ${item.maxStorage} ${item.name}.`,
          code: 'AT_MAX' satisfies ShopBlockReasonCode,
        });
      }

      // ── Debit, guarded ────────────────────────────────────────────────────
      const debited = await tx.studentProfile.updateMany({
        where: { userId, coins: { gte: price } },
        data: { coins: { decrement: price } },
      });
      if (debited.count === 0) {
        throw new BadRequestException({
          message: `Not enough Coins. You need 🪙 ${price.toLocaleString()}, but you have 🪙 ${profile.coins.toLocaleString()}.`,
          code: 'INSUFFICIENT_COINS' satisfies ShopBlockReasonCode,
        });
      }

      // ── Grant ─────────────────────────────────────────────────────────────
      const effectResult = await this.applyEffect(
        tx,
        userId,
        item,
        profile,
        state,
      );

      // ── Ledger ────────────────────────────────────────────────────────────
      await tx.gemTransaction.create({
        data: { userId, type: 'SPEND', amount: price, source: 'SHOP' },
      });
      await tx.shopTransaction.create({
        data: {
          userId,
          item: item.id,
          cost: price,
          quantity: 1,
          rarity: item.rarity,
          category: item.category,
          idempotencyKey: idempotencyKey ?? null,
        },
      });

      const updated = await tx.studentProfile.findUnique({ where: { userId } });
      return { profile: updated!, effectResult };
    }, TX_OPTIONS);

    return {
      success: true,
      replayed: false,
      itemId: item.id,
      itemName: item.name,
      rarity: item.rarity,
      category: item.category,
      art: item.art,
      price,
      message: result.effectResult.message,
      effect: result.effectResult.effect,
      coins: result.profile.coins,
      // Legacy alias: the existing GamificationContext still reads `gems` off
      // this response. Same number, kept until that field is retired.
      gems: result.profile.coins,
      lives: result.profile.lives,
      maxLives: result.profile.maxLives,
      streakFreezeBank: result.profile.streakFreezeBank,
    };
  }

  /** Metrics inside a transaction — same rules, reusing rows already loaded. */
  private async metricsInTx(
    tx: Prisma.TransactionClient,
    userId: string,
    profile: {
      xp: number;
      streakDays: number;
      longestStreak: number;
      leagueTier: any;
    },
    state: { claimedCollections: Prisma.JsonValue } | null,
  ): Promise<{ metrics: LearnerMetrics }> {
    const [lessonsCompleted, coursesCompleted, purchaseCount] =
      await Promise.all([
        tx.userLessonProgress.count({ where: { userId, status: 'completed' } }),
        tx.userCourseProgress.count({ where: { userId, status: 'completed' } }),
        tx.shopTransaction.count({ where: { userId } }),
      ]);
    const claimed = Array.isArray(state?.claimedCollections)
      ? (state!.claimedCollections as unknown[]).filter(
          (c): c is string => typeof c === 'string',
        )
      : [];
    return {
      metrics: {
        level: Math.floor(profile.xp / 100) + 1,
        xp: profile.xp,
        streakDays: profile.streakDays,
        longestStreak: profile.longestStreak,
        lessonsCompleted,
        coursesCompleted,
        leagueTier: profile.leagueTier,
        purchaseCount,
        completedCollections: claimed,
      },
    };
  }

  /**
   * Apply an item's effect. Runs inside the purchase transaction, so a failure
   * here rolls the coin debit back with it.
   */
  private async applyEffect(
    tx: Prisma.TransactionClient,
    userId: string,
    item: ShopItemDef,
    profile: {
      maxLives: number;
      lives: number;
      streakDays: number;
      longestStreak: number;
    },
    state: { freezeCapacityBonus: number } | null,
  ): Promise<{ message: string; effect: Record<string, unknown> }> {
    const effect = item.effect;

    switch (effect.kind) {
      case 'REFILL_HEARTS':
        await tx.studentProfile.update({
          where: { userId },
          data: { lives: profile.maxLives, livesLastLostAt: null },
        });
        return {
          message: 'Hearts refilled! ❤️',
          effect: { kind: 'HEARTS', lives: profile.maxLives },
        };

      case 'GRANT_FREEZE': {
        await tx.studentProfile.update({
          where: { userId },
          data: { streakFreezeBank: { increment: effect.amount } },
        });
        // Mirror into UserInventory the way the chest and monthly-quest grants
        // already do. Before this, a shop-bought freeze was invisible there.
        await tx.userInventory.upsert({
          where: { userId_itemType: { userId, itemType: 'FREEZE' } },
          update: { quantity: { increment: effect.amount } },
          create: { userId, itemType: 'FREEZE', quantity: effect.amount },
        });
        return {
          message: `+${effect.amount} Streak Freeze banked 🧊`,
          effect: { kind: 'FREEZE', amount: effect.amount },
        };
      }

      case 'REPAIR_STREAK': {
        const restored = await this.repairStreak(tx, userId, profile);
        return {
          message: `Streak repaired — you're back to ${restored} days 🔥`,
          effect: { kind: 'STREAK', days: restored },
        };
      }

      case 'XP_MULTIPLIER':
      case 'COIN_MULTIPLIER': {
        const expiresAt = new Date(Date.now() + effect.minutes * 60_000);
        await tx.userShopItem.upsert({
          where: { userId_itemId: { userId, itemId: item.id } },
          update: { quantity: { increment: 1 }, expiresAt },
          create: { userId, itemId: item.id, quantity: 1, expiresAt },
        });
        const label = effect.kind === 'XP_MULTIPLIER' ? 'XP' : 'Coins';
        return {
          message: `${effect.multiplier}× ${label} active for ${effect.minutes} minutes ⚡`,
          effect: {
            kind: 'BOOST',
            multiplier: effect.multiplier,
            minutes: effect.minutes,
            expiresAt: expiresAt.toISOString(),
          },
        };
      }

      case 'CHARGES':
        await tx.userShopItem.upsert({
          where: { userId_itemId: { userId, itemId: item.id } },
          update: { quantity: { increment: effect.charges } },
          create: { userId, itemId: item.id, quantity: effect.charges },
        });
        return {
          message: `${item.name} ready to use`,
          effect: { kind: 'CHARGES', charges: effect.charges },
        };

      case 'FREEZE_CAPACITY': {
        await tx.userShopState.upsert({
          where: { userId },
          update: { freezeCapacityBonus: { increment: effect.delta } },
          create: { userId, freezeCapacityBonus: effect.delta },
        });
        await tx.userShopItem.upsert({
          where: { userId_itemId: { userId, itemId: item.id } },
          update: { quantity: { increment: 1 } },
          create: { userId, itemId: item.id, quantity: 1 },
        });
        const cap =
          BASE_FREEZE_CAP + (state?.freezeCapacityBonus ?? 0) + effect.delta;
        return {
          message: `Freeze capacity raised to ${cap}`,
          effect: { kind: 'CAPACITY', cap },
        };
      }

      case 'CHEST':
        // Chests are bought and opened in one flow (openChest), which needs the
        // reveal choreography. Buying one through this path just banks it.
        await tx.userShopItem.upsert({
          where: { userId_itemId: { userId, itemId: item.id } },
          update: { quantity: { increment: 1 } },
          create: { userId, itemId: item.id, quantity: 1 },
        });
        return {
          message: `${item.name} added to your inventory`,
          effect: { kind: 'CHEST', tier: effect.tier },
        };

      case 'COSMETIC': {
        await tx.userShopItem.upsert({
          where: { userId_itemId: { userId, itemId: item.id } },
          update: { quantity: 1 },
          create: { userId, itemId: item.id, quantity: 1 },
        });
        return {
          message: `${item.name} unlocked — equip it from your profile`,
          effect: { kind: 'COSMETIC', slot: effect.slot },
        };
      }

      default: {
        const _never: never = effect;
        throw new BadRequestException('Unsupported item effect.');
      }
    }
  }

  /**
   * Rebuild the streak the learner lost, from their actual activity history.
   *
   * The streak counter is zeroed the moment a break is detected, so the old
   * value is gone by the time anyone buys a repair — but `user_daily_activity`
   * still holds the days themselves, which is a better source anyway: it
   * cannot be inflated, and it repairs to the truth rather than to a number
   * someone remembered.
   */
  private async repairStreak(
    tx: Prisma.TransactionClient,
    userId: string,
    profile: { streakDays: number; longestStreak: number },
  ): Promise<number> {
    const rows = await tx.userDailyActivity.findMany({
      where: { userId, lessonsCompleted: { gt: 0 } },
      orderBy: { date: 'desc' },
      take: 120,
      select: { date: true },
    });

    if (rows.length === 0) {
      throw new BadRequestException(
        'No recent activity to repair a streak from.',
      );
    }

    const days = rows.map((r) => r.date);
    const today = new Date().toISOString().slice(0, 10);
    const daysBetween = (a: string, b: string) =>
      Math.round((Date.parse(a) - Date.parse(b)) / 86_400_000);

    const gap = daysBetween(today, days[0]);
    if (gap > STREAK_REPAIR_WINDOW_DAYS) {
      throw new BadRequestException(
        `Streak Repair only works within ${STREAK_REPAIR_WINDOW_DAYS} days of the break.`,
      );
    }
    if (profile.streakDays > 0) {
      throw new BadRequestException(
        'Your streak is still going — nothing to repair.',
      );
    }

    // Walk back while each day is exactly one day before the last.
    let restored = 1;
    for (let i = 1; i < days.length; i++) {
      if (daysBetween(days[i - 1], days[i]) === 1) restored++;
      else break;
    }

    await tx.studentProfile.update({
      where: { userId },
      data: {
        streakDays: restored,
        longestStreak: Math.max(profile.longestStreak, restored),
        lastStreakEarnedAt: new Date(),
      },
    });

    return restored;
  }

  // ═══ Chests ════════════════════════════════════════════════════════════════

  /**
   * Buy-and-open in one call. Same transactional guarantees as `purchase`,
   * plus the roll itself: a chest that debits without paying out would be the
   * worst possible bug in a paid-randomness feature.
   */
  async openChest(userId: string, itemId: string, idempotencyKey?: string) {
    const item = getShopItem(itemId);
    if (!item || item.effect.kind !== 'CHEST') {
      throw new BadRequestException('That is not a chest.');
    }
    const tierDef = getChestTier(item.effect.tier);
    if (!tierDef) throw new BadRequestException('Unknown chest tier.');

    if (idempotencyKey) {
      const prior = await this.prisma.shopTransaction.findUnique({
        where: { idempotencyKey },
      });
      if (prior) {
        throw new BadRequestException('This chest was already opened.');
      }
    }

    const event = getActiveEvent(new Date());
    const price = priceFor(item, event).price;

    return this.prisma.$transaction(async (tx) => {
      const profile = await tx.studentProfile.findUnique({ where: { userId } });
      if (!profile) throw new NotFoundException('Student profile not found.');

      const state = await tx.userShopState.findUnique({ where: { userId } });
      const { metrics } = await this.metricsInTx(tx, userId, profile, state);
      const unlock = evaluateUnlock(item.unlock, metrics);
      if (!unlock.unlocked) {
        throw new BadRequestException({
          message: `${unlock.label} to unlock ${item.name}.`,
          code: 'LOCKED' satisfies ShopBlockReasonCode,
        });
      }

      const debited = await tx.studentProfile.updateMany({
        where: { userId, coins: { gte: price } },
        data: { coins: { decrement: price } },
      });
      if (debited.count === 0) {
        throw new BadRequestException({
          message: `Not enough Coins. You need 🪙 ${price.toLocaleString()}, but you have 🪙 ${profile.coins.toLocaleString()}.`,
          code: 'INSUFFICIENT_COINS' satisfies ShopBlockReasonCode,
        });
      }

      const ownedRows = await tx.userShopItem.findMany({
        where: { userId },
        select: { itemId: true, quantity: true },
      });
      const ownedIds = new Set(
        ownedRows.filter((r) => r.quantity > 0).map((r) => r.itemId),
      );

      const roll = rollChest(tierDef, ownedIds);

      if (roll.coins > 0) {
        await tx.studentProfile.update({
          where: { userId },
          data: { coins: { increment: roll.coins } },
        });
        await tx.gemTransaction.create({
          data: { userId, type: 'EARN', amount: roll.coins, source: 'SHOP' },
        });
      }

      if (roll.item) {
        const wonEffect = roll.item.effect;
        if (wonEffect.kind === 'GRANT_FREEZE') {
          await tx.studentProfile.update({
            where: { userId },
            data: { streakFreezeBank: { increment: wonEffect.amount } },
          });
          await tx.userInventory.upsert({
            where: { userId_itemType: { userId, itemType: 'FREEZE' } },
            update: { quantity: { increment: wonEffect.amount } },
            create: { userId, itemType: 'FREEZE', quantity: wonEffect.amount },
          });
        } else {
          const expiresAt =
            wonEffect.kind === 'XP_MULTIPLIER' ||
            wonEffect.kind === 'COIN_MULTIPLIER'
              ? new Date(Date.now() + wonEffect.minutes * 60_000)
              : null;
          await tx.userShopItem.upsert({
            where: { userId_itemId: { userId, itemId: roll.item.id } },
            update: {
              quantity: { increment: 1 },
              ...(expiresAt ? { expiresAt } : {}),
            },
            create: { userId, itemId: roll.item.id, quantity: 1, expiresAt },
          });
        }
      }

      await tx.shopTransaction.create({
        data: {
          userId,
          item: item.id,
          cost: price,
          quantity: 1,
          rarity: item.rarity,
          category: item.category,
          idempotencyKey: idempotencyKey ?? null,
        },
      });

      const updated = await tx.studentProfile.findUnique({ where: { userId } });

      return {
        success: true,
        chest: {
          tier: tierDef.tier,
          name: tierDef.name,
          accent: tierDef.accent,
        },
        price,
        reward: {
          coins: roll.coins,
          substituted: roll.substituted,
          rarity: roll.rarity,
          item: roll.item
            ? {
                id: roll.item.id,
                name: roll.item.name,
                description: roll.item.description,
                rarity: roll.item.rarity,
                category: roll.item.category,
                art: roll.item.art,
                slot: cosmeticSlotFor(roll.item.category),
              }
            : null,
        },
        coins: updated!.coins,
        gems: updated!.coins,
        streakFreezeBank: updated!.streakFreezeBank,
      };
    }, TX_OPTIONS);
  }

  // ═══ Inventory & loadout ═══════════════════════════════════════════════════

  async getInventory(userId: string) {
    const { profile, state, metrics } = await this.loadMetrics(userId);
    const owned = await this.loadOwned(userId);
    const event = getActiveEvent(new Date());
    const now = new Date();

    const items = [...owned.values()]
      .map((row) => {
        const def = getShopItem(row.itemId);
        if (!def || row.quantity <= 0) return null;
        return this.buildItemView(def, {
          profile,
          state,
          metrics,
          owned,
          event,
        });
      })
      .filter((i): i is ShopItemView => i !== null);

    return {
      items,
      loadout: this.loadoutFrom(owned),
      activeBoosts: items
        .filter((i) => i.activeUntil && new Date(i.activeUntil) > now)
        .map((i) => ({
          itemId: i.id,
          name: i.name,
          activeUntil: i.activeUntil,
        })),
      streakFreezeBank: profile.streakFreezeBank,
      freezeCap: this.freezeCap(state),
      coins: profile.coins,
    };
  }

  private loadoutFrom(
    owned: Map<
      string,
      { itemId?: string; equipped: boolean; quantity: number }
    >,
  ): Record<CosmeticSlot, string | null> {
    const loadout: Record<CosmeticSlot, string | null> = {
      FRAME: null,
      BACKGROUND: null,
      CELEBRATION_FX: null,
      XP_FX: null,
    };
    for (const [itemId, row] of owned) {
      if (!row.equipped || row.quantity <= 0) continue;
      const def = getShopItem(itemId);
      if (!def) continue;
      const slot = cosmeticSlotFor(def.category);
      if (slot) loadout[slot] = itemId;
    }
    return loadout;
  }

  /**
   * The equipped cosmetics for any learner — read by the profile, the
   * celebration scenes and (eventually) community/leaderboard rows. Public
   * on purpose: cosmetics are meant to be seen by other people.
   */
  async getLoadout(userId: string) {
    const rows = await this.prisma.userShopItem.findMany({
      where: { userId, equipped: true, quantity: { gt: 0 } },
      select: { itemId: true, equipped: true, quantity: true },
    });
    const owned = new Map(rows.map((r) => [r.itemId, r]));
    const loadout = this.loadoutFrom(owned);

    // Resolve to art tokens so the client never needs the registry to render.
    const art: Record<string, string | null> = {};
    for (const [slot, itemId] of Object.entries(loadout)) {
      art[slot] = itemId ? (getShopItem(itemId)?.art ?? null) : null;
    }
    return { loadout, art };
  }

  /**
   * Equipped cosmetics for many learners at once.
   *
   * A community feed or a leaderboard is a column of avatars; asking per row
   * would be one request each. This is the batched read those surfaces use.
   * Capped so a caller cannot ask for the whole user table in one go.
   */
  async getLoadouts(userIds: string[]) {
    const ids = [...new Set(userIds)].slice(0, 100);
    if (ids.length === 0) return {};

    const rows = await this.prisma.userShopItem.findMany({
      where: { userId: { in: ids }, equipped: true, quantity: { gt: 0 } },
      select: { userId: true, itemId: true },
    });

    const out: Record<string, Record<string, string | null>> = {};
    for (const id of ids) {
      out[id] = {
        FRAME: null,
        BACKGROUND: null,
        CELEBRATION_FX: null,
        XP_FX: null,
      };
    }
    for (const row of rows) {
      const def = getShopItem(row.itemId);
      if (!def) continue;
      const slot = cosmeticSlotFor(def.category);
      // Art tokens, not item ids: the client renders from these directly and
      // never needs a copy of the registry.
      if (slot) out[row.userId][slot] = def.art;
    }
    return out;
  }

  /** Equip or unequip a cosmetic. One item per slot — equipping swaps. */
  async equip(userId: string, itemId: string, equipped: boolean) {
    const item = getShopItem(itemId);
    if (!item) throw new BadRequestException('Unknown item.');
    const slot = cosmeticSlotFor(item.category);
    if (!slot)
      throw new BadRequestException(
        `${item.name} is not something you can equip.`,
      );

    const owned = await this.prisma.userShopItem.findUnique({
      where: { userId_itemId: { userId, itemId } },
    });
    if (!owned || owned.quantity <= 0) {
      throw new BadRequestException(`You do not own ${item.name}.`);
    }

    await this.prisma.$transaction(async (tx) => {
      if (equipped) {
        // Clear the slot first — "one equipped per slot" is enforced here
        // rather than by a constraint, because the slot lives in the registry.
        const slotItemIds = SHOP_ITEMS.filter(
          (i) => cosmeticSlotFor(i.category) === slot,
        ).map((i) => i.id);
        await tx.userShopItem.updateMany({
          where: { userId, itemId: { in: slotItemIds }, equipped: true },
          data: { equipped: false },
        });
      }
      await tx.userShopItem.update({
        where: { userId_itemId: { userId, itemId } },
        data: { equipped },
      });
    }, TX_OPTIONS);

    return this.getLoadout(userId);
  }

  // ═══ Collections ═══════════════════════════════════════════════════════════

  /**
   * Pay out a finished collection: coins plus the exclusive item that cannot
   * be bought at any price. This is the top of the ladder the whole catalogue
   * points at.
   */
  async claimCollection(userId: string, collectionId: string) {
    const collection = getCollection(collectionId);
    if (!collection) throw new BadRequestException('Unknown collection.');

    return this.prisma.$transaction(async (tx) => {
      const state = await tx.userShopState.findUnique({ where: { userId } });
      const claimed = Array.isArray(state?.claimedCollections)
        ? (state!.claimedCollections as unknown[]).filter(
            (c): c is string => typeof c === 'string',
          )
        : [];
      if (claimed.includes(collectionId)) {
        throw new BadRequestException('You already claimed this collection.');
      }

      const members = collectionMembers(collectionId);
      const ownedRows = await tx.userShopItem.findMany({
        where: {
          userId,
          itemId: { in: members.map((m) => m.id) },
          quantity: { gt: 0 },
        },
        select: { itemId: true },
      });
      if (ownedRows.length < members.length) {
        throw new BadRequestException(
          `Collect all ${members.length} items to claim ${collection.name}.`,
        );
      }

      await tx.studentProfile.update({
        where: { userId },
        data: { coins: { increment: collection.rewardCoins } },
      });
      await tx.gemTransaction.create({
        data: {
          userId,
          type: 'EARN',
          amount: collection.rewardCoins,
          source: 'SHOP',
        },
      });

      // Grant the exclusive reward item.
      await tx.userShopItem.upsert({
        where: { userId_itemId: { userId, itemId: collection.rewardItemId } },
        update: { quantity: 1 },
        create: { userId, itemId: collection.rewardItemId, quantity: 1 },
      });
      await tx.userShopUnlock.upsert({
        where: { userId_itemId: { userId, itemId: collection.rewardItemId } },
        update: {},
        create: { userId, itemId: collection.rewardItemId },
      });

      await tx.userShopState.upsert({
        where: { userId },
        update: { claimedCollections: [...claimed, collectionId] },
        create: { userId, claimedCollections: [collectionId] },
      });

      const profile = await tx.studentProfile.findUnique({ where: { userId } });
      const rewardItem = getShopItem(collection.rewardItemId);

      return {
        success: true,
        collection: {
          id: collection.id,
          name: collection.name,
          accent: collection.accent,
        },
        rewardCoins: collection.rewardCoins,
        rewardItem: rewardItem
          ? {
              id: rewardItem.id,
              name: rewardItem.name,
              description: rewardItem.description,
              rarity: rewardItem.rarity,
              art: rewardItem.art,
              slot: cosmeticSlotFor(rewardItem.category),
            }
          : null,
        coins: profile!.coins,
        gems: profile!.coins,
      };
    }, TX_OPTIONS);
  }

  // ═══ Daily visit reward ════════════════════════════════════════════════════

  /**
   * A small coin bonus for coming back, scaling with consecutive days. Paid at
   * most once per local day; the day string is the idempotency key, so a
   * refresh cannot farm it.
   */
  async registerVisit(userId: string, timezoneOffset = 0) {
    const today = dayKey(new Date(), timezoneOffset);

    const existing = await this.prisma.userShopState.findUnique({
      where: { userId },
    });
    if (existing?.lastVisitDay === today) {
      return {
        rewarded: false,
        visitStreak: existing.visitStreak,
        coins: 0,
        message: 'Already claimed today.',
      };
    }

    const yesterday = dayKey(new Date(Date.now() - 86_400_000), timezoneOffset);
    const continued = existing?.lastVisitDay === yesterday;
    const visitStreak = continued ? (existing?.visitStreak ?? 0) + 1 : 1;
    const reward =
      VISIT_REWARD_LADDER[
        Math.min(visitStreak, VISIT_REWARD_LADDER.length) - 1
      ] ?? VISIT_REWARD_LADDER[VISIT_REWARD_LADDER.length - 1];

    const result = await this.prisma.$transaction(async (tx) => {
      // Guarded write: if another request already stamped today, this updates
      // nothing and the visit goes unpaid rather than double-paid.
      const stamped = await tx.userShopState.upsert({
        where: { userId },
        update: {},
        create: { userId },
      });
      const claim = await tx.userShopState.updateMany({
        where: {
          userId,
          OR: [{ lastVisitDay: null }, { lastVisitDay: { not: today } }],
        },
        data: { lastVisitDay: today, visitStreak },
      });
      if (claim.count === 0) {
        return { rewarded: false, coins: stamped.visitStreak };
      }

      await tx.studentProfile.update({
        where: { userId },
        data: { coins: { increment: reward } },
      });
      await tx.gemTransaction.create({
        data: { userId, type: 'EARN', amount: reward, source: 'SHOP' },
      });
      const profile = await tx.studentProfile.findUnique({ where: { userId } });
      return { rewarded: true, coins: profile!.coins };
    }, TX_OPTIONS);

    if (!result.rewarded) {
      return {
        rewarded: false,
        visitStreak,
        coins: 0,
        message: 'Already claimed today.',
      };
    }

    return {
      rewarded: true,
      visitStreak,
      reward,
      coins: result.coins,
      gems: result.coins,
      message: `+${reward} coins for stopping by`,
    };
  }

  // ═══ Boosts (read by the reward paths) ═════════════════════════════════════

  /**
   * Live multipliers for a learner. Read by lesson completion so a purchased
   * boost actually pays — a boost that only *says* 2× is worse than no boost.
   */
  async getActiveMultipliers(
    userId: string,
  ): Promise<{ xp: number; coins: number }> {
    const now = new Date();
    const rows = await this.prisma.userShopItem.findMany({
      where: { userId, expiresAt: { gt: now }, quantity: { gt: 0 } },
      select: { itemId: true },
    });

    let xp = 1;
    let coins = 1;
    for (const row of rows) {
      const def = getShopItem(row.itemId);
      if (!def) continue;
      if (def.effect.kind === 'XP_MULTIPLIER')
        xp = Math.max(xp, def.effect.multiplier);
      if (def.effect.kind === 'COIN_MULTIPLIER')
        coins = Math.max(coins, def.effect.multiplier);
    }
    return { xp, coins };
  }

  /**
   * Spend one charge of a consumable (lesson retry, perfect-run shield).
   * Returns false when the learner has none — callers must not assume success.
   *
   * The `quantity > 0` guard lives in the WHERE clause, so two concurrent
   * calls cannot both spend the last charge.
   */
  async consumeCharge(userId: string, itemId: string): Promise<boolean> {
    const res = await this.prisma.userShopItem.updateMany({
      where: { userId, itemId, quantity: { gt: 0 } },
      data: { quantity: { decrement: 1 } },
    });
    return res.count > 0;
  }

  /** How many charges of a consumable the learner is holding. */
  async chargesHeld(userId: string, itemId: string): Promise<number> {
    const row = await this.prisma.userShopItem.findUnique({
      where: { userId_itemId: { userId, itemId } },
      select: { quantity: true },
    });
    return row?.quantity ?? 0;
  }

  /**
   * Absorb one wrong answer with a Perfect Lesson Protection charge.
   * Called by the life-loss path, so the shield just works rather than asking
   * the learner to remember they own it mid-question — the same way a streak
   * freeze spends itself.
   */
  async tryAbsorbWithShield(userId: string): Promise<boolean> {
    return this.consumeCharge(userId, 'PERFECT_SHIELD');
  }

  /**
   * Spend a power-up the learner chose to use, and apply its effect.
   *
   * Only items whose effect is CHARGES are usable this way — anything else
   * either applies at purchase (boosts, freezes) or is worn (cosmetics).
   */
  async usePowerUp(userId: string, itemId: string) {
    const item = getShopItem(itemId);
    if (!item || item.effect.kind !== 'CHARGES') {
      throw new BadRequestException('That item cannot be used here.');
    }

    return this.prisma.$transaction(async (tx) => {
      // Spend first, guarded — if this updates nothing the learner had none,
      // and no effect is applied.
      const spent = await tx.userShopItem.updateMany({
        where: { userId, itemId, quantity: { gt: 0 } },
        data: { quantity: { decrement: 1 } },
      });
      if (spent.count === 0) {
        throw new BadRequestException(`You have no ${item.name} left.`);
      }

      const profile = await tx.studentProfile.findUnique({ where: { userId } });
      if (!profile) throw new NotFoundException('Student profile not found.');

      // Lesson Retry hands back the hearts the failed attempt cost, which is
      // the whole promise on the card ("without losing the hearts you spent").
      if (itemId === 'LESSON_RETRY') {
        const updated = await tx.studentProfile.update({
          where: { userId },
          data: { lives: profile.maxLives, livesLastLostAt: null },
        });
        return {
          success: true,
          itemId,
          itemName: item.name,
          message: 'Lesson Retry used — hearts restored.',
          lives: updated.lives,
          maxLives: updated.maxLives,
          remaining: Math.max(
            0,
            (await this.chargesInTx(tx, userId, itemId)) ?? 0,
          ),
        };
      }

      return {
        success: true,
        itemId,
        itemName: item.name,
        message: `${item.name} used.`,
        lives: profile.lives,
        maxLives: profile.maxLives,
        remaining: (await this.chargesInTx(tx, userId, itemId)) ?? 0,
      };
    }, TX_OPTIONS);
  }

  private async chargesInTx(
    tx: Prisma.TransactionClient,
    userId: string,
    itemId: string,
  ): Promise<number> {
    const row = await tx.userShopItem.findUnique({
      where: { userId_itemId: { userId, itemId } },
      select: { quantity: true },
    });
    return row?.quantity ?? 0;
  }

  // ═══ Legacy compatibility ══════════════════════════════════════════════════

  /**
   * The original endpoint's contract: `{ item }` with no idempotency key,
   * returning coins/lives/streakFreezeBank. Kept so an un-updated client (or a
   * cached bundle mid-deploy) keeps working while the new shop rolls out.
   */
  async purchaseItem(userId: string, itemKey: string) {
    return this.purchase(userId, itemKey);
  }
}
