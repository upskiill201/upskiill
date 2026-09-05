/**
 * End-to-end smoke test for the shop economy against the REAL database.
 * Creates a throwaway user, exercises every path, then deletes it (cascade
 * removes every row it created).
 *
 * Run: npx ts-node --transpile-only <this file>
 */

import { PrismaClient } from '@prisma/client';
import { ShopService } from '../src/shop/shop.service';

const prisma = new PrismaClient();
const shop = new ShopService(prisma as any);

let pass = 0;
let fail = 0;

function check(label: string, condition: boolean, detail?: unknown) {
  if (condition) {
    pass++;
    console.log(`  PASS  ${label}`);
  } else {
    fail++;
    console.log(`  FAIL  ${label}${detail !== undefined ? ` → ${JSON.stringify(detail)}` : ''}`);
  }
}

async function expectReject(label: string, fn: () => Promise<unknown>, expectFragment: string) {
  try {
    await fn();
    check(label, false, 'expected a rejection, got success');
  } catch (e: any) {
    const msg = String(e?.message ?? e);
    check(`${label} (${msg.slice(0, 60)})`, msg.toLowerCase().includes(expectFragment.toLowerCase()), msg);
  }
}

async function main() {
  const stamp = Date.now();
  const email = `shop-smoke-${stamp}@teyro.test`;

  const user = await prisma.user.create({
    data: {
      email,
      fullName: 'Shop Smoke Test',
      role: 'STUDENT',
      // Never a real credential — this row exists for seconds and is deleted
      // in the finally block below.
      password: 'smoke-test-not-a-real-credential',
      studentProfile: {
        create: { coins: 5000, xp: 900, streakDays: 10, longestStreak: 10, lives: 2, maxLives: 5 },
      },
    },
    include: { studentProfile: true },
  });
  const userId = user.id;
  console.log(`\nTest user ${userId} — 5000 coins, 900 XP (level 10), 10-day streak, 2/5 hearts\n`);

  try {
    // ── 1. Catalogue ────────────────────────────────────────────────────────
    console.log('1. Catalogue');
    const catalog = await shop.getCatalog(userId, 0);
    check('loads with a coin balance', catalog.coins === 5000, catalog.coins);
    check('has featured items', catalog.featured.length > 0);
    check('has a daily rotation', catalog.dailyRotation.items.length > 0);
    check('has a weekly special', catalog.weeklySpecial !== null);
    check('has 3 collections', catalog.collections.length === 3);
    check('has 3 chests', catalog.chests.length === 3);
    check('produced goals', catalog.goals.length > 0, catalog.goals.map((g) => g.label));
    check('produced recommendations', catalog.recommendations.length > 0);
    check(
      'recommends a heart refill while hearts are low',
      catalog.recommendations.some((r) => r.item.id === 'REFILL_HEARTS'),
      catalog.recommendations.map((r) => r.item.id),
    );

    const legend = catalog.categories
      .flatMap((c) => c.items)
      .find((i) => i.id === 'FRAME_LEGEND');
    check('30-day frame is locked at a 10-day streak', legend?.unlock.unlocked === false);
    check('…and reports partial progress', legend?.unlock.percent === 33, legend?.unlock.percent);
    check('…and stays visible while locked', legend !== undefined);

    // Checked HERE, before any purchase: that first getCatalog ran the very
    // first syncUnlocks, which is the backfill path. A learner arriving with a
    // 10-day streak and level 10 already qualifies for plenty, and none of it
    // should be announced as "new".
    const pendingAtStart = await shop.getPendingUnlocks(userId);
    check(
      'backfill announces nothing they earned before the shop existed',
      pendingAtStart.length === 0,
      pendingAtStart.map((p) => p.item.id),
    );
    const backfilled = await prisma.userShopState.findUnique({ where: { userId } });
    check('…and stamped the backfill', backfilled?.unlocksBackfilledAt != null);
    const alreadySeen = await prisma.userShopUnlock.count({
      where: { userId, seenAt: { not: null } },
    });
    check('…recording prior unlocks as already seen', alreadySeen > 0, alreadySeen);

    // ── 2. Purchase ─────────────────────────────────────────────────────────
    // Prices are asserted against the CATALOGUE, not a hardcoded number: an
    // event may be live (Back to School, Winter…), and the discount is
    // supposed to apply. Hardcoding 120 here would fail every September.
    const heartsListed = catalog.categories
      .flatMap((c) => c.items)
      .find((i) => i.id === 'REFILL_HEARTS')!;
    console.log(
      `\n2. Purchase (Refill Hearts @ ${heartsListed.price}${
        heartsListed.discountPercent > 0
          ? ` — ${heartsListed.discountPercent}% off ${heartsListed.basePrice}`
          : ''
      })`,
    );
    const buy = await shop.purchase(userId, 'REFILL_HEARTS', `smoke-hearts-${stamp}`);
    check(
      'debited exactly the listed price',
      buy.coins === 5000 - heartsListed.price,
      { charged: 5000 - buy.coins, listed: heartsListed.price },
    );
    check('refilled hearts to full', buy.lives === 5, buy.lives);
    check('charged the discounted price, not the base', buy.price === heartsListed.price, buy.price);

    console.log('\n3. Idempotency (replay the same key)');
    const replay = await shop.purchase(userId, 'REFILL_HEARTS', `smoke-hearts-${stamp}`);
    check('flagged as a replay', replay.replayed === true);
    check('did NOT charge twice', replay.coins === 5000 - heartsListed.price, replay.coins);

    // ── 4. Guards ───────────────────────────────────────────────────────────
    console.log('\n4. Guards');
    await expectReject(
      'rejects buying hearts when already full',
      () => shop.purchase(userId, 'REFILL_HEARTS', `smoke-full-${stamp}`),
      'already full',
    );
    await expectReject(
      'rejects a locked item',
      () => shop.purchase(userId, 'FRAME_LEGEND', `smoke-locked-${stamp}`),
      '30-day streak',
    );
    await expectReject(
      'rejects a grant-only collection reward',
      () => shop.purchase(userId, 'FRAME_SUPERNOVA', `smoke-grant-${stamp}`),
      'only be earned',
    );
    await expectReject(
      'rejects an unknown item',
      () => shop.purchase(userId, 'NOT_A_REAL_ITEM', `smoke-bogus-${stamp}`),
      'invalid',
    );

    // ── 5. Freeze mirrors into UserInventory (the old split bug) ────────────
    console.log('\n5. Streak Freeze (200) — the source-of-truth fix');
    const beforeFreeze = await prisma.studentProfile.findUnique({ where: { userId } });
    const freezeBuy = await shop.purchase(userId, 'STREAK_FREEZE', `smoke-freeze-${stamp}`);
    check(
      'incremented streakFreezeBank',
      freezeBuy.streakFreezeBank === (beforeFreeze!.streakFreezeBank + 1),
      { before: beforeFreeze!.streakFreezeBank, after: freezeBuy.streakFreezeBank },
    );
    const invRow = await prisma.userInventory.findUnique({
      where: { userId_itemType: { userId, itemType: 'FREEZE' } },
    });
    check('ALSO mirrored into UserInventory (was invisible before)', (invRow?.quantity ?? 0) >= 1, invRow?.quantity);

    // ── 6. Timed boost ──────────────────────────────────────────────────────
    console.log('\n6. XP Boost — does it actually multiply?');
    const noBoost = await shop.getActiveMultipliers(userId);
    check('no multiplier before buying', noBoost.xp === 1 && noBoost.coins === 1, noBoost);
    await shop.purchase(userId, 'XP_BOOST_2X', `smoke-boost-${stamp}`);
    const withBoost = await shop.getActiveMultipliers(userId);
    check('2x XP multiplier is live', withBoost.xp === 2, withBoost);
    check('coin multiplier untouched', withBoost.coins === 1, withBoost);

    // ── 7. Cosmetic purchase + equip ────────────────────────────────────────
    console.log('\n7. Cosmetic buy → equip → swap');
    await shop.purchase(userId, 'FRAME_EMBER', `smoke-ember-${stamp}`);
    await shop.purchase(userId, 'FRAME_FROST', `smoke-frost-${stamp}`);
    await shop.equip(userId, 'FRAME_EMBER', true);
    let loadout = await shop.getLoadout(userId);
    check('ember equipped in the FRAME slot', loadout.loadout.FRAME === 'FRAME_EMBER', loadout.loadout);
    check('art token resolved for the client', loadout.art.FRAME === 'frame-ember', loadout.art);

    await shop.equip(userId, 'FRAME_FROST', true);
    loadout = await shop.getLoadout(userId);
    check('equipping frost swapped out ember (one per slot)', loadout.loadout.FRAME === 'FRAME_FROST', loadout.loadout);
    const equippedCount = await prisma.userShopItem.count({ where: { userId, equipped: true } });
    check('exactly one item equipped', equippedCount === 1, equippedCount);

    await expectReject(
      'rejects equipping something not owned',
      () => shop.equip(userId, 'FRAME_CHAMPION', true),
      'do not own',
    );
    await expectReject(
      'rejects equipping a power-up',
      () => shop.equip(userId, 'REFILL_HEARTS', true),
      'not something you can equip',
    );

    // ── 8. Chest ────────────────────────────────────────────────────────────
    console.log('\n8. Mystery Chest (Bronze, 250)');
    const coinsBeforeChest = (await prisma.studentProfile.findUnique({ where: { userId } }))!.coins;
    const chestListed = (await shop.getCatalog(userId, 0)).chests.find(
      (c) => c.tier === 'BRONZE',
    )!.item!;
    const chest = await shop.openChest(userId, 'CHEST_BRONZE', `smoke-chest-${stamp}`);
    const gotSomething = chest.reward.coins > 0 || chest.reward.item !== null;
    check('never empty-handed', gotSomething, chest.reward);
    check('cleared the 40-coin floor', chest.reward.coins >= 40, chest.reward.coins);
    check(
      'balance = before − price + payout',
      chest.coins === coinsBeforeChest - chestListed.price + chest.reward.coins,
      {
        before: coinsBeforeChest,
        price: chestListed.price,
        after: chest.coins,
        payout: chest.reward.coins,
      },
    );
    console.log(
      `        rolled: ${chest.reward.item ? `${chest.reward.item.name} (${chest.reward.rarity})` : 'coins only'} +${chest.reward.coins}`,
    );
    await expectReject(
      'rejects re-opening with the same key',
      () => shop.openChest(userId, 'CHEST_BRONZE', `smoke-chest-${stamp}`),
      'already opened',
    );

    // ── 9. Unlocks ──────────────────────────────────────────────────────────
    console.log('\n9. Unlock detection');
    // The purchases above crossed the "buy 3 shop items" and "buy 5 shop
    // items" thresholds — those SHOULD announce, and prove purchase-driven
    // unlocks fire without any explicit trigger.
    const fromBuying = await shop.getPendingUnlocks(userId);
    check(
      'buying things unlocked purchase-gated items',
      fromBuying.some((p) => p.item.id === 'BG_STUDIO_SET'),
      fromBuying.map((p) => p.item.id),
    );
    await shop.markUnlocksSeen(userId, fromBuying.map((p) => p.item.id));

    // Crossing a NEW threshold is what should announce.
    await prisma.studentProfile.update({ where: { userId }, data: { streakDays: 30, longestStreak: 30 } });
    const afterStreak = await shop.syncUnlocks(userId);
    check('a 30-day streak unlocks the Legend frame', afterStreak.includes('FRAME_LEGEND'), afterStreak);
    check('never announces ALWAYS-unlocked items', !afterStreak.includes('REFILL_HEARTS'));

    const pending = await shop.getPendingUnlocks(userId);
    check('the new unlock reaches the engine', pending.some((p) => p.item.id === 'FRAME_LEGEND'));
    check('the engine gets the price with it', (pending[0]?.item.price ?? 0) > 0, pending[0]?.item.price);
    check('at most 3 takeovers queued at once', pending.length <= 3, pending.length);

    // Setting the streak to 30 crosses BOTH the 14-day backdrop and the
    // 30-day frame, so more can be waiting than the 3-per-moment cap shows.
    // Drain it: each pass marks what it was given and asks again, and it must
    // reach empty rather than re-serving the same rows forever.
    let drained = 0;
    let batch = await shop.getPendingUnlocks(userId);
    while (batch.length > 0 && drained < 10) {
      await shop.markUnlocksSeen(userId, batch.map((p) => p.item.id));
      drained++;
      batch = await shop.getPendingUnlocks(userId);
    }
    check('marking seen drains the queue to empty', batch.length === 0, batch.length);
    check('…without looping forever', drained < 10, drained);

    // ── 10. Insufficient funds ──────────────────────────────────────────────
    console.log('\n10. Insufficient funds');
    await prisma.studentProfile.update({ where: { userId }, data: { coins: 10 } });
    await expectReject(
      'rejects a purchase it cannot afford',
      () => shop.purchase(userId, 'FRAME_LEGEND', `smoke-poor-${stamp}`),
      'not enough coins',
    );
    const stillTen = await prisma.studentProfile.findUnique({ where: { userId } });
    check('balance untouched after a failed purchase', stillTen!.coins === 10, stillTen!.coins);

    // ── 11. Collection ──────────────────────────────────────────────────────
    console.log('\n11. Collection completion');
    await prisma.studentProfile.update({ where: { userId }, data: { coins: 20000, xp: 5000 } });
    const spaceCatalog = await shop.getCatalog(userId, 0);
    const space = spaceCatalog.collections.find((c) => c.id === 'SPACE')!;
    for (const member of space.items) {
      if (!member.owned) await shop.purchase(userId, member.id, `smoke-space-${member.id}-${stamp}`);
    }
    const afterBuying = await shop.getCatalog(userId, 0);
    const spaceNow = afterBuying.collections.find((c) => c.id === 'SPACE')!;
    check('collection reports complete', spaceNow.complete === true, `${spaceNow.ownedCount}/${spaceNow.totalCount}`);
    check('…and claimable', spaceNow.claimable === true);

    const claim = await shop.claimCollection(userId, 'SPACE');
    check('paid the collection reward', claim.rewardCoins === 500, claim.rewardCoins);
    check('granted the exclusive item', claim.rewardItem?.id === 'FRAME_SUPERNOVA', claim.rewardItem?.id);
    const supernova = await prisma.userShopItem.findUnique({
      where: { userId_itemId: { userId, itemId: 'FRAME_SUPERNOVA' } },
    });
    check('exclusive item is actually owned', (supernova?.quantity ?? 0) === 1);
    await expectReject(
      'rejects double-claiming',
      () => shop.claimCollection(userId, 'SPACE'),
      'already claimed',
    );

    // ── 12. Daily visit ─────────────────────────────────────────────────────
    console.log('\n12. Daily visit reward');
    const visit1 = await shop.registerVisit(userId, 0);
    check('first visit pays', visit1.rewarded === true, visit1);
    const visit2 = await shop.registerVisit(userId, 0);
    check('second visit same day pays nothing', visit2.rewarded === false, visit2);

    // ── 13. Inventory ───────────────────────────────────────────────────────
    console.log('\n13. Inventory');
    const inv = await shop.getInventory(userId);
    check('lists owned items', inv.items.length > 0, inv.items.length);
    check('reports the equipped loadout', inv.loadout.FRAME !== null, inv.loadout);
    check('reports the active boost', inv.activeBoosts.length === 1, inv.activeBoosts);
  } finally {
    await prisma.user.delete({ where: { id: userId } });
    console.log(`\nCleaned up test user ${userId}`);
  }

  console.log(`\n${'='.repeat(50)}\n  ${pass} passed, ${fail} failed\n${'='.repeat(50)}\n`);
  await prisma.$disconnect();
  process.exit(fail > 0 ? 1 : 0);
}

main().catch(async (e) => {
  console.error('\nSMOKE RUN CRASHED:\n', e);
  await prisma.$disconnect();
  process.exit(1);
});
