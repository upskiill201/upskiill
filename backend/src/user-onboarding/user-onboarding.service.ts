import { Injectable, Logger } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { PrismaService } from '../prisma/prisma.service';
import { XpAwardedEvent } from '../league/events/xp-awarded.event';
import { normalisePhone, maskPhone } from '../whatsapp/phone.util';

/** One-time reward paid by the onboarding Step 9 shape challenge. */
export const ONBOARDING_CHALLENGE_XP = 25;
export const ONBOARDING_CHALLENGE_COINS = 25;

@Injectable()
export class UserOnboardingService {
  private readonly logger = new Logger(UserOnboardingService.name);

  constructor(
    private prisma: PrismaService,
    private eventEmitter: EventEmitter2,
  ) {}

  /** Get the session for a user. Returns null if no session exists yet. */
  async getSession(userId: string) {
    return this.prisma.onboardingSession.findUnique({
      where: { userId },
    });
  }

  /**
   * Upsert the session for a user.
   * Creates a new row on first call, updates on subsequent calls.
   * Only the fields provided in the payload are written — other fields are untouched.
   */
  async upsertSession(
    userId: string,
    payload: {
      currentStep?: number;
      completedSteps?: number[];
      answers?: any;
      onboardingComplete?: boolean;
      completedAt?: Date | null;
    },
  ) {
    const now = new Date();

    const session = await this.prisma.onboardingSession.upsert({
      where: { userId },
      create: {
        userId,
        currentStep: payload.currentStep ?? 1,
        completedSteps: payload.completedSteps ?? [],
        answers: payload.answers ?? {},
        onboardingComplete: payload.onboardingComplete ?? false,
        completedAt: payload.completedAt ?? null,
      },
      update: {
        ...(payload.currentStep !== undefined && {
          currentStep: payload.currentStep,
        }),
        ...(payload.completedSteps !== undefined && {
          completedSteps: payload.completedSteps,
        }),
        ...(payload.answers !== undefined && { answers: payload.answers }),
        ...(payload.onboardingComplete !== undefined && {
          onboardingComplete: payload.onboardingComplete,
        }),
        ...(payload.completedAt !== undefined && {
          completedAt: payload.completedAt,
        }),
        updatedAt: now,
      },
    });

    // The WhatsApp step runs BEFORE sign-up, so its success lives only in the
    // client's answers until now. Bind it server-side if a verified OTP record
    // backs the claim (never trust client "verified" flags alone).
    if (payload.answers) {
      await this.reconcileWhatsappVerification(userId, payload.answers);
    }

    return session;
  }

  /**
   * Bind an anonymously-verified WhatsApp number (Step 6, pre-signup) to the
   * account that just authenticated. Only fires when:
   *  - the account isn't already verified with a number,
   *  - the whatsapp_otps row for that exact phone carries a recent
   *    `verifiedAt` stamp from the OTP service (client claims alone never bind),
   *  - no OTHER account has claimed the number first.
   * Best-effort — must never fail the session sync.
   */
  private async reconcileWhatsappVerification(userId: string, answers: any) {
    try {
      const step6 = answers?.['6'];
      const rawPhone = step6?.whatsappNumber;
      if (!rawPhone || step6?.verified !== true) return;

      const phone = normalisePhone(String(rawPhone));
      if (!phone) return;

      const user = await this.prisma.user.findUnique({
        where: { id: userId },
        select: { whatsappVerified: true, whatsappPhone: true },
      });
      if (!user || user.whatsappVerified) return;

      const otp = await this.prisma.whatsappOtp.findUnique({
        where: { phone },
      });
      if (!otp?.verifiedAt) return; // no server-side proof of verification

      // Proof must be fresh (30 days) and unclaimed by someone else. The
      // conditional updateMany is the claim: exactly one account can win.
      const thirtyDaysMs = 30 * 24 * 60 * 60 * 1000;
      if (Date.now() - otp.verifiedAt.getTime() > thirtyDaysMs) return;
      if (otp.claimedBy && otp.claimedBy !== userId) return;

      const claimed = await this.prisma.whatsappOtp.updateMany({
        where: { phone, OR: [{ claimedBy: null }, { claimedBy: userId }] },
        data: { claimedBy: userId },
      });
      if (claimed.count !== 1) return;

      await this.prisma.user.update({
        where: { id: userId },
        data: { whatsappPhone: phone, whatsappVerified: true },
      });
      this.logger.log(
        `[Onboarding] Bound anonymously-verified WhatsApp ${maskPhone(phone)} to user.`,
      );
    } catch (err: any) {
      this.logger.warn(
        `[Onboarding] WhatsApp verification reconciliation skipped: ${err?.message}`,
      );
    }
  }

  /**
   * Claim the one-time Step 9 onboarding challenge reward (25 XP + 25 coins).
   *
   * Idempotency is enforced by a PARTIAL unique index on gem_transactions
   * (userId WHERE source = 'ONBOARDING_CHALLENGE', see migration
   * 20260825120000): the ledger insert itself fails with P2002 on a duplicate
   * claim, so even concurrent double-fires pay out exactly once. The reward is
   * fixed — client-reported game performance is never trusted.
   */
  async claimChallengeReward(userId: string) {
    const result = await this.prisma.$transaction(async (tx) => {
      // Ensure the profile exists — a missing StudentProfile must never fail
      // the claim (same posture as lesson completion).
      await tx.studentProfile.upsert({
        where: { userId },
        create: { userId }, // Prisma applies schema defaults (30 XP, 50 coins, …)
        update: {},
      });

      let newlyGranted = false;
      try {
        await tx.gemTransaction.create({
          data: {
            userId,
            type: 'EARN',
            amount: ONBOARDING_CHALLENGE_COINS,
            source: 'ONBOARDING_CHALLENGE',
          },
        });
        newlyGranted = true;
      } catch (err: unknown) {
        if (
          !(
            err instanceof Prisma.PrismaClientKnownRequestError &&
            err.code === 'P2002'
          )
        ) {
          throw err;
        }
        // Unique index fired → already claimed (possibly on another device).
      }

      const balances = await tx.studentProfile.update({
        where: { userId },
        data: newlyGranted
          ? {
              xp: { increment: ONBOARDING_CHALLENGE_XP },
              coins: { increment: ONBOARDING_CHALLENGE_COINS },
            }
          : {},
        select: { xp: true, coins: true, streakDays: true },
      });

      return { newlyGranted, balances };
    });

    if (result.newlyGranted) {
      // Keeps the weekly league in sync like every other XP source.
      this.eventEmitter.emit(
        'xp.awarded',
        new XpAwardedEvent(userId, ONBOARDING_CHALLENGE_XP, 'ONBOARDING'),
      );
    }

    const { xp, coins, streakDays } = result.balances;

    return {
      alreadyClaimed: !result.newlyGranted,
      xpEarned: result.newlyGranted ? ONBOARDING_CHALLENGE_XP : 0,
      coinsEarned: result.newlyGranted ? ONBOARDING_CHALLENGE_COINS : 0,
      balances: { xp, coins, streakDays },
      // Same level math as /gamification/me so clients render one curve.
      userLevel: Math.floor(xp / 100) + 1,
      xpInCurrentLevel: xp % 100,
      xpTargetForCurrentLevel: 100,
    };
  }
}
