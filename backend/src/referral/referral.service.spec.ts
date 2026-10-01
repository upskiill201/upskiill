import { BadRequestException } from '@nestjs/common';
import { REFERRAL_CAP, REFERRAL_REWARD, ReferralService } from './referral.service';

function makeDb() {
  const codes = new Map<string, string>(); // userId → code
  const users = new Map<string, { createdAt: Date; fullName: string }>();
  const referrals: any[] = [];
  const profiles = new Map<string, { coins: number; xp: number; lastLessonCompletedAt: Date | null }>();
  const ledger: any[] = [];
  const notifications: any[] = [];

  const prisma: any = {
    referralCode: {
      findUnique: jest.fn(async ({ where }) => {
        if (where.userId) return codes.has(where.userId) ? { userId: where.userId, code: codes.get(where.userId) } : null;
        for (const [userId, code] of codes) if (code === where.code) return { userId, code };
        return null;
      }),
      create: jest.fn(async ({ data }) => (codes.set(data.userId, data.code), data)),
    },
    user: { findUnique: jest.fn(async ({ where }) => users.get(where.id) ?? null) },
    referral: {
      findUnique: jest.fn(async ({ where }) => referrals.find((r) => r.referredId === where.referredId) ?? null),
      findMany: jest.fn(async () => []),
      count: jest.fn(async ({ where }) => referrals.filter((r) => r.referrerId === where.referrerId && r.status === where.status).length),
      create: jest.fn(async ({ data }) => {
        if (referrals.some((r) => r.referredId === data.referredId)) throw new Error('unique');
        const row = { id: `r${referrals.length + 1}`, status: 'PENDING', createdAt: new Date(), ...data };
        referrals.push(row);
        return row;
      }),
      updateMany: jest.fn(async ({ where, data }) => {
        const r = referrals.find((x) => x.id === where.id && x.status === where.status);
        if (!r) return { count: 0 };
        Object.assign(r, data);
        return { count: 1 };
      }),
    },
    studentProfile: {
      findUnique: jest.fn(async ({ where }) => profiles.get(where.userId) ?? null),
      upsert: jest.fn(async ({ where, update }) => {
        const p = profiles.get(where.userId) ?? { coins: 0, xp: 0, lastLessonCompletedAt: null };
        p.coins += update.coins.increment;
        p.xp += update.xp.increment;
        profiles.set(where.userId, p);
        return p;
      }),
    },
    rewardTransaction: { createMany: jest.fn(async ({ data }) => ledger.push(...data)) },
    notification: { create: jest.fn(async ({ data }) => (notifications.push(data), data)) },
    $transaction: jest.fn(async (fn: (tx: unknown) => unknown) => fn(prisma)),
  };
  return { prisma, codes, users, referrals, profiles, ledger, notifications };
}

const events = { emit: jest.fn() };

describe('ReferralService', () => {
  it('gives each learner one stable code', async () => {
    const { prisma } = makeDb();
    const svc = new ReferralService(prisma, events as any);
    const a = await svc.codeFor('u1');
    expect(a).toMatch(/^[A-Z2-9]{8}$/);
    expect(await svc.codeFor('u1')).toBe(a);
  });

  it('pays both sides once, when the friend finishes a lesson — not at sign-up', async () => {
    const { prisma, users, profiles, notifications } = makeDb();
    const svc = new ReferralService(prisma, events as any);
    const code = await svc.codeFor('inviter');
    users.set('friend', { createdAt: new Date(), fullName: 'Kemi Adeyemi' });

    expect(await svc.claim('friend', code.toLowerCase())).toEqual({ status: 'CLAIMED' });
    expect(profiles.get('inviter')).toBeUndefined(); // nothing yet

    await svc.onLessonCompleted({ userId: 'friend' } as any);
    expect(profiles.get('inviter')).toMatchObject({ coins: REFERRAL_REWARD.coins, xp: REFERRAL_REWARD.xp });
    expect(profiles.get('friend')).toMatchObject({ coins: REFERRAL_REWARD.coins, xp: REFERRAL_REWARD.xp });
    expect(notifications[0].title).toBe('Kemi joined Teyro with your invite');

    // A second lesson pays nothing more.
    await svc.onLessonCompleted({ userId: 'friend' } as any);
    expect(profiles.get('inviter')!.coins).toBe(REFERRAL_REWARD.coins);
  });

  it("won't let you invite yourself", async () => {
    const { prisma, users } = makeDb();
    const svc = new ReferralService(prisma, events as any);
    const code = await svc.codeFor('me');
    users.set('me', { createdAt: new Date(), fullName: 'Me' });
    await expect(svc.claim('me', code)).rejects.toBeInstanceOf(BadRequestException);
  });

  it('only new learners can claim a code', async () => {
    const { prisma, users } = makeDb();
    const svc = new ReferralService(prisma, events as any);
    const code = await svc.codeFor('inviter');
    users.set('old', { createdAt: new Date(Date.now() - 30 * 86400e3), fullName: 'Old Timer' });
    await expect(svc.claim('old', code)).rejects.toThrow(/new learners/);
  });

  it('claims only once per learner', async () => {
    const { prisma, users } = makeDb();
    const svc = new ReferralService(prisma, events as any);
    const a = await svc.codeFor('a');
    const b = await svc.codeFor('b');
    users.set('friend', { createdAt: new Date(), fullName: 'F' });
    await svc.claim('friend', a);
    expect(await svc.claim('friend', b)).toEqual({ status: 'ALREADY_CLAIMED' });
  });

  it('stops paying the inviter past the cap (the friend still gets theirs)', async () => {
    const { prisma, users, referrals, profiles } = makeDb();
    const svc = new ReferralService(prisma, events as any);
    const code = await svc.codeFor('inviter');
    for (let i = 0; i < REFERRAL_CAP; i++) referrals.push({ id: `old${i}`, referrerId: 'inviter', referredId: `x${i}`, status: 'REWARDED' });
    users.set('late', { createdAt: new Date(), fullName: 'Late Friend' });
    await svc.claim('late', code);
    await svc.reward('late');
    expect(profiles.get('late')!.coins).toBe(REFERRAL_REWARD.coins);
    expect(profiles.get('inviter')).toBeUndefined();
  });
});
