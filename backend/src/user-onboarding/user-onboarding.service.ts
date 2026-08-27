import { Injectable, Logger } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { createHash, randomBytes } from 'crypto';
import { PrismaService } from '../prisma/prisma.service';
import { XpAwardedEvent } from '../league/events/xp-awarded.event';
import { normalisePhone, maskPhone } from '../whatsapp/phone.util';

/** One-time reward paid by the onboarding Step 9 shape challenge. */
export const ONBOARDING_CHALLENGE_XP = 25;
export const ONBOARDING_CHALLENGE_COINS = 25;

/** How long a pre-signup claim token stays redeemable after Step 9. */
export const ONBOARDING_CLAIM_TTL_DAYS = 30;

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

    // Steps 6 and 9 run BEFORE sign-up, so their successes live only in the
    // client's answers until an authenticated sync lands. Reconcile both:
    // bind the WhatsApp number if a verified OTP record backs it, and settle
    // the deferred challenge reward if a valid claim proof is present.
    // Both are best-effort and never fail the sync.
    await this.applyPreSignupAnswers(userId, payload.answers);

    return session;
  }

  /**
   * Run BOTH pre-signup reconciliations (WhatsApp binding + deferred
   * challenge reward settlement) against an account that just appeared.
   * Called from every authenticated session sync and from the signup paths.
   */
  async applyPreSignupAnswers(userId: string, answers: any): Promise<void> {
    if (!answers) return;
    await this.reconcileWhatsappVerification(userId, answers);
    await this.settlePendingChallengeReward(userId, answers);
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
   * SHA-256 of a raw claim token. The raw token exists only in the client's
   * onboarding answers — storage keeps hashes so a DB leak can't redeem them.
   */
  private hashClaimToken(raw: string): string {
    return createHash('sha256').update(raw).digest('hex');
  }

  /**
   * Ledger-level payout shared by EVERY entry path: the authenticated
   * challenge-complete endpoint, signup reconciliation, and session-sync
   * settlement. Idempotency comes from the partial unique index on
   * gem_transactions (userId WHERE source = 'ONBOARDING_CHALLENGE',
   * migration 20260825120000) — concurrent double-fires pay out exactly
   * once. The reward is fixed; client-reported performance is never trusted.
   */
  private async payoutChallengeRewardOnce(userId: string): Promise<{
    newlyGranted: boolean;
    balances: { xp: number; coins: number; streakDays: number };
  }> {
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

    return result;
  }

  /**
   * Claim the one-time Step 9 onboarding challenge reward (25 XP + 25 coins)
   * for an AUTHENTICATED user — logged-in learners playing (or replaying) the
   * challenge pay out immediately.
   */
  async claimChallengeReward(userId: string) {
    const result = await this.payoutChallengeRewardOnce(userId);
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

  /**
   * Pre-signup claim (Step 9 runs before account creation). Records intent
   * server-side and returns a single-use claim token the browser persists in
   * its onboarding answers and presents at signup. The celebration plays NOW;
   * the payout settles when an account appears carrying this token (or a
   * proven-fresh verified phone as fallback).
   *
   * Abuse posture: completing the challenge is inherently client-side, so the
   * bar here equals the authenticated endpoint's — "showed up at Step 9" —
   * but each token pays once per ACCOUNT CREATION at most (single-use token +
   * per-user ledger guard), and the endpoint is IP-throttled.
   */
  async issueAnonymousClaim(whatsappNumber?: string): Promise<{
    status: 'PENDING_SIGNUP';
    claimToken: string;
    xpEarned: number;
    coinsEarned: number;
  }> {
    const rawToken = randomBytes(32).toString('hex');
    const ttlMs = ONBOARDING_CLAIM_TTL_DAYS * 24 * 60 * 60 * 1000;
    const expiresAt = new Date(Date.now() + ttlMs);

    // Optional secondary settlement key: only a server-proven, fresh,
    // unclaimed WhatsApp verification qualifies.
    let phone: string | null = null;
    if (whatsappNumber) {
      const normalised = normalisePhone(String(whatsappNumber));
      if (normalised) {
        const otp = await this.prisma.whatsappOtp.findUnique({
          where: { phone: normalised },
        });
        if (
          otp?.verifiedAt &&
          Date.now() - otp.verifiedAt.getTime() <= ttlMs &&
          !otp.claimedBy
        ) {
          phone = normalised;
        }
      }
    }

    await this.prisma.onboardingChallengeClaim.create({
      data: { tokenHash: this.hashClaimToken(rawToken), phone, expiresAt },
    });

    return {
      status: 'PENDING_SIGNUP',
      claimToken: rawToken,
      xpEarned: ONBOARDING_CHALLENGE_XP,
      coinsEarned: ONBOARDING_CHALLENGE_COINS,
    };
  }

  /**
   * Pay the deferred pre-signup challenge reward once the account exists.
   * Called from every authenticated session sync AND from the signup paths.
   *
   * Proof precedence:
   *  1. answers['9'].claimToken — atomic single-use win on settledByUserId
   *     against an unexpired claim row;
   *  2. answers['6'] verified phone backed by a fresh whatsapp_otps row and
   *     an unexpired claim recorded for that phone.
   *
   * Double-payout-proof in every direction: the token settles exactly once
   * (UNIQUE settledByUserId via conditional updateMany), the ledger pays at
   * most once per user (partial unique index), and repeat calls no-op.
   * Best-effort — must never fail the flow that called it.
   */
  async settlePendingChallengeReward(userId: string, answers: any): Promise<void> {
    try {
      const step9 = answers?.['9'];
      if (step9?.completed !== true) return;

      const rawToken =
        typeof step9?.claimToken === 'string' ? step9.claimToken : '';
      if (rawToken) {
        const claimed = await this.prisma.onboardingChallengeClaim.updateMany({
          where: {
            tokenHash: this.hashClaimToken(rawToken),
            settledByUserId: null,
            expiresAt: { gt: new Date() },
          },
          data: { settledByUserId: userId, settledAt: new Date() },
        });
        if (claimed.count === 1) {
          await this.payoutChallengeRewardOnce(userId);
          this.logger.log(
            '[Onboarding] Settled deferred challenge reward (claim token).',
          );
          return;
        }
        // Token missing/expired/already settled → fall through to phone proof.
      }

      const step6 = answers?.['6'];
      const rawPhone = step6?.whatsappNumber;
      if (!rawPhone || step6?.verified !== true) return;
      const phone = normalisePhone(String(rawPhone));
      if (!phone) return;

      const pending = await this.prisma.onboardingChallengeClaim.findFirst({
        where: { phone, settledByUserId: null, expiresAt: { gt: new Date() } },
        orderBy: { createdAt: 'desc' },
      });
      if (!pending) return;

      const claimed = await this.prisma.onboardingChallengeClaim.updateMany({
        where: { tokenHash: pending.tokenHash, settledByUserId: null },
        data: { settledByUserId: userId, settledAt: new Date() },
      });
      if (claimed.count === 1) {
        await this.payoutChallengeRewardOnce(userId);
        this.logger.log(
          `[Onboarding] Settled deferred challenge reward (verified phone ${maskPhone(phone)}).`,
        );
      }
    } catch (err: any) {
      this.logger.warn(
        `[Onboarding] Challenge reward settlement skipped: ${err?.message}`,
      );
    }
  }
}
