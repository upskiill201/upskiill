import { BadRequestException, ForbiddenException } from '@nestjs/common';
import {
  SHARE_DAILY_REWARD_CAP,
  SHARE_REWARD_COINS,
  ShareCardService,
} from './share-card.service';
import {
  lessonMilestoneAtOrBelow,
  streakMilestoneAtOrBelow,
} from './share-card.milestones';

function makeDb() {
  const cards: any[] = [];
  const ledger: any[] = [];
  const profiles = new Map<
    string,
    { coins: number; xp: number; streakDays: number; longestStreak: number }
  >();

  const prisma: any = {
    shareCard: {
      findUnique: jest.fn(async ({ where }) => {
        if (where.slug) return cards.find((c) => c.slug === where.slug) ?? null;
        const k = where.userId_milestoneKey;
        return (
          cards.find(
            (c) => c.userId === k.userId && c.milestoneKey === k.milestoneKey,
          ) ?? null
        );
      }),
      create: jest.fn(async ({ data }) => {
        const row = {
          id: `c${cards.length + 1}`,
          rewardedAt: null,
          sharedAt: null,
          shareCount: 0,
          createdAt: new Date(),
          ...data,
        };
        cards.push(row);
        return row;
      }),
      update: jest.fn(async ({ where, data }) => {
        const c = cards.find((x) => x.id === where.id);
        c.shareCount += 1;
        if (data.sharedAt) c.sharedAt = data.sharedAt;
        return c;
      }),
      updateMany: jest.fn(async ({ where, data }) => {
        const c = cards.find((x) => x.id === where.id && x.rewardedAt === null);
        if (!c) return { count: 0 };
        Object.assign(c, data);
        return { count: 1 };
      }),
    },
    studentProfile: {
      findUnique: jest.fn(
        async ({ where }) => profiles.get(where.userId) ?? null,
      ),
      upsert: jest.fn(async ({ where, update }) => {
        const p = profiles.get(where.userId)!;
        p.coins += update.coins.increment;
        return { coins: p.coins };
      }),
    },
    userLessonProgress: { count: jest.fn(async () => 12) },
    rewardTransaction: {
      count: jest.fn(
        async ({ where }) =>
          ledger.filter(
            (l) =>
              l.userId === where.userId && l.sourceType === where.sourceType,
          ).length,
      ),
      create: jest.fn(async ({ data }) => (ledger.push(data), data)),
    },
  };
  prisma.$transaction = jest.fn(async (fn: any) => fn(prisma));
  const referrals: any = { codeFor: jest.fn(async () => 'ABCD2345') };
  return { prisma, referrals, cards, ledger, profiles };
}

describe('share card milestones', () => {
  it('snaps a streak down to the milestone actually reached', () => {
    expect(streakMilestoneAtOrBelow(2)).toBeNull();
    expect(streakMilestoneAtOrBelow(3)).toBe(3);
    expect(streakMilestoneAtOrBelow(9)).toBe(7);
    expect(streakMilestoneAtOrBelow(101)).toBe(100);
    expect(streakMilestoneAtOrBelow(730)).toBe(730);
  });

  it('snaps a lesson count down the same way', () => {
    expect(lessonMilestoneAtOrBelow(4)).toBeNull();
    expect(lessonMilestoneAtOrBelow(11)).toBe(10);
  });
});

describe('ShareCardService', () => {
  const user = 'u1';

  function setup(streakDays = 8) {
    const db = makeDb();
    db.profiles.set(user, { coins: 50, xp: 900, streakDays, longestStreak: 8 });
    return { ...db, service: new ShareCardService(db.prisma, db.referrals) };
  }

  it('refuses a streak card before the first milestone', async () => {
    const { service } = setup(2);
    await expect(
      service.create(user, { kind: 'STREAK' }),
    ).rejects.toBeInstanceOf(BadRequestException);
  });

  it('snapshots the server streak and reuses the link for the same milestone', async () => {
    const { service, cards } = setup(8);
    const a = await service.create(user, { kind: 'STREAK' });
    const b = await service.create(user, { kind: 'STREAK' });
    expect(a.data).toMatchObject({ days: 7, xp: 900, lessons: 12 });
    expect(b.slug).toBe(a.slug);
    expect(cards).toHaveLength(1);
  });

  it('pays once per card, and only up to the daily cap', async () => {
    const { service, prisma, profiles } = setup(8);
    const slugs: string[] = [];
    for (let i = 0; i < SHARE_DAILY_REWARD_CAP + 1; i++) {
      const row = await prisma.shareCard.create({
        data: {
          userId: user,
          slug: `slug${i}xx`,
          kind: 'STREAK',
          milestoneKey: `K${i}`,
          data: {},
        },
      });
      slugs.push(row.slug);
    }

    const first = await service.markShared(user, slugs[0]);
    expect(first).toMatchObject({
      rewarded: true,
      coins: SHARE_REWARD_COINS,
      balance: 50 + SHARE_REWARD_COINS,
    });
    expect(await service.markShared(user, slugs[0])).toMatchObject({
      rewarded: false,
      reason: 'ALREADY_REWARDED',
    });

    for (let i = 1; i < SHARE_DAILY_REWARD_CAP; i++)
      await service.markShared(user, slugs[i]);
    expect(
      await service.markShared(user, slugs[SHARE_DAILY_REWARD_CAP]),
    ).toMatchObject({ rewarded: false, reason: 'DAILY_CAP' });
    expect(profiles.get(user)!.coins).toBe(
      50 + SHARE_REWARD_COINS * SHARE_DAILY_REWARD_CAP,
    );
  });

  it("won't let someone else claim the reward for a card", async () => {
    const { service } = setup(8);
    const card = await service.create(user, { kind: 'STREAK' });
    await expect(
      service.markShared('intruder', card.slug),
    ).rejects.toBeInstanceOf(ForbiddenException);
  });
});
