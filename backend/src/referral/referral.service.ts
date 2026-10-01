import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { randomBytes } from 'crypto';
import { PrismaService } from '../prisma/prisma.service';
import { XpAwardedEvent } from '../league/events/xp-awarded.event';
import type { LessonCompletedEvent } from '../course/events/lesson-completed.event';

/**
 * Invite a friend.
 *
 *   1. Every learner has a stable code (their invite link's ?ref=).
 *   2. A new learner who arrived through a link claims it once, within a week
 *      of signing up → a PENDING referral.
 *   3. When that friend finishes their first lesson, both are paid once and
 *      the referral becomes REWARDED. Paying on a real lesson, not a sign-up,
 *      is what keeps throwaway accounts from farming coins.
 */

/** What each side earns when an invited friend finishes their first lesson. */
export const REFERRAL_REWARD = { coins: 100, xp: 100 } as const;
/** A learner can be paid for this many friends in total. */
export const REFERRAL_CAP = 50;
/** A code can only be claimed this soon after signing up. */
const CLAIM_WINDOW_MS = 7 * 24 * 60 * 60 * 1000;
// No 0/O/1/I — codes get read aloud and typed.
const ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';

function newCode(): string {
  const bytes = randomBytes(8);
  let out = '';
  for (let i = 0; i < 8; i++) out += ALPHABET[bytes[i] % ALPHABET.length];
  return out;
}

export interface ReferralSummary {
  code: string;
  reward: { coins: number; xp: number };
  cap: number;
  invited: number;
  joined: number;
  earned: { coins: number; xp: number };
  friends: {
    id: string;
    name: string;
    avatarUrl: string | null;
    status: 'PENDING' | 'REWARDED';
    joinedAt: string;
  }[];
}

@Injectable()
export class ReferralService {
  private readonly logger = new Logger(ReferralService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly events: EventEmitter2,
  ) {}

  /** The learner's code, created on first ask. */
  async codeFor(userId: string): Promise<string> {
    const existing = await this.prisma.referralCode.findUnique({ where: { userId } });
    if (existing) return existing.code;
    for (let attempt = 0; attempt < 5; attempt++) {
      try {
        const row = await this.prisma.referralCode.create({ data: { userId, code: newCode() } });
        return row.code;
      } catch {
        // A race created ours, or (vanishingly rare) the code collided — re-read, then retry.
        const again = await this.prisma.referralCode.findUnique({ where: { userId } });
        if (again) return again.code;
      }
    }
    throw new Error('Could not allocate a referral code');
  }

  async summary(userId: string): Promise<ReferralSummary> {
    const code = await this.codeFor(userId);
    const rows = await this.prisma.referral.findMany({
      where: { referrerId: userId },
      orderBy: { createdAt: 'desc' },
      take: 100,
      include: {
        referred: {
          select: { id: true, fullName: true, avatarUrl: true, profile: { select: { avatarUrl: true } } },
        },
      },
    });
    const joined = rows.filter((r) => r.status === 'REWARDED').length;
    return {
      code,
      reward: { ...REFERRAL_REWARD },
      cap: REFERRAL_CAP,
      invited: rows.length,
      joined,
      earned: { coins: joined * REFERRAL_REWARD.coins, xp: joined * REFERRAL_REWARD.xp },
      friends: rows.map((r) => ({
        id: r.referred.id,
        // First name only — this list is the referrer's, not a directory.
        name: r.referred.fullName.split(' ')[0] || 'A friend',
        avatarUrl: r.referred.avatarUrl ?? r.referred.profile?.avatarUrl ?? null,
        status: r.status === 'REWARDED' ? 'REWARDED' : 'PENDING',
        joinedAt: r.createdAt.toISOString(),
      })),
    };
  }

  /** A newly signed-up learner claims the code they arrived with. */
  async claim(userId: string, rawCode: string) {
    const code = String(rawCode ?? '').trim().toUpperCase();
    if (!/^[A-Z0-9]{6,12}$/.test(code)) throw new BadRequestException('That invite code is not valid.');

    const [owner, me, existing] = await Promise.all([
      this.prisma.referralCode.findUnique({ where: { code } }),
      this.prisma.user.findUnique({ where: { id: userId }, select: { createdAt: true } }),
      this.prisma.referral.findUnique({ where: { referredId: userId } }),
    ]);
    if (existing) return { status: 'ALREADY_CLAIMED' as const };
    if (!owner) throw new BadRequestException('That invite code is not valid.');
    if (owner.userId === userId) throw new BadRequestException("You can't invite yourself.");
    if (!me || Date.now() - me.createdAt.getTime() > CLAIM_WINDOW_MS) {
      throw new BadRequestException('Invite codes can only be used by new learners.');
    }

    try {
      await this.prisma.referral.create({ data: { referrerId: owner.userId, referredId: userId, code } });
    } catch {
      return { status: 'ALREADY_CLAIMED' as const };
    }

    // Already finished a lesson before claiming (e.g. the claim ran late)?
    // Pay now rather than waiting for a lesson that already happened.
    const learned = await this.prisma.studentProfile.findUnique({
      where: { userId },
      select: { lastLessonCompletedAt: true },
    });
    if (learned?.lastLessonCompletedAt) await this.reward(userId);
    return { status: 'CLAIMED' as const };
  }

  @OnEvent('lesson.completed', { async: true })
  async onLessonCompleted(event: LessonCompletedEvent) {
    try {
      await this.reward(event.userId);
    } catch (e) {
      this.logger.warn(`Referral reward for ${event.userId} failed: ${String(e)}`);
    }
  }

  /**
   * Pay a PENDING referral for this (referred) learner, once. The status flip
   * is a compare-and-set inside the same transaction as the payouts, so two
   * lessons finishing at once can't pay twice.
   */
  async reward(referredId: string): Promise<boolean> {
    const pending = await this.prisma.referral.findUnique({ where: { referredId } });
    if (!pending || pending.status !== 'PENDING') return false;

    const paidSoFar = await this.prisma.referral.count({
      where: { referrerId: pending.referrerId, status: 'REWARDED' },
    });
    const payReferrer = paidSoFar < REFERRAL_CAP;
    const { coins, xp } = REFERRAL_REWARD;

    const done = await this.prisma.$transaction(async (tx) => {
      const flipped = await tx.referral.updateMany({
        where: { id: pending.id, status: 'PENDING' },
        data: { status: 'REWARDED', rewardedAt: new Date() },
      });
      if (flipped.count === 0) return false;

      const pay = async (userId: string, role: 'REFERRER' | 'REFERRED') => {
        await tx.studentProfile.upsert({
          where: { userId },
          create: { userId, coins, xp },
          update: { coins: { increment: coins }, xp: { increment: xp } },
        });
        await tx.rewardTransaction.createMany({
          data: [
            { userId, currency: 'COINS', amount: coins, sourceType: 'REFERRAL', sourceId: pending.id, idempotencyKey: `referral:${pending.id}:${role}:coins` },
            { userId, currency: 'XP', amount: xp, sourceType: 'REFERRAL', sourceId: pending.id, idempotencyKey: `referral:${pending.id}:${role}:xp` },
          ],
        });
      };
      await pay(referredId, 'REFERRED');
      if (payReferrer) await pay(pending.referrerId, 'REFERRER');
      return true;
    });
    if (!done) return false;

    // Both XP grants count toward this week's league, like any other XP.
    this.events.emit('xp.awarded', new XpAwardedEvent(referredId, xp, 'REFERRAL'));
    if (payReferrer) this.events.emit('xp.awarded', new XpAwardedEvent(pending.referrerId, xp, 'REFERRAL'));

    // Tell the inviter — this is the moment that makes them invite again.
    const friend = await this.prisma.user.findUnique({ where: { id: referredId }, select: { fullName: true } });
    const first = friend?.fullName.split(' ')[0] || 'Your friend';
    await this.prisma.notification
      .create({
        data: {
          userId: pending.referrerId,
          actorId: referredId,
          type: 'SYSTEM',
          entityType: 'REFERRAL',
          entityId: pending.id,
          title: `${first} joined Teyro with your invite`,
          body: payReferrer
            ? `They finished their first lesson. You both earned ${coins} coins and ${xp} XP.`
            : `They finished their first lesson. (You've reached the ${REFERRAL_CAP}-friend reward limit.)`,
          deepLink: '/dashboard/profile#invite',
        },
      })
      .catch(() => undefined);
    return true;
  }
}
