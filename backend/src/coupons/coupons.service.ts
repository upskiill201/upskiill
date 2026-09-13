import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AccessPlan, Coupon, CouponDiscountType, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { generatePublicId } from '../earnings/crypto.util';
import { calculateCoursePricingLadder } from '../course/pricing-engine';

/**
 * Coupons & Discounts engine.
 *
 * Thin layer applied AFTER the pricing ladder (course/pricing-engine.ts)
 * resolves a plan's base price — this service never recomputes pricing
 * itself, it only decides whether/how much to discount a price handed to it.
 *
 * `quote()` backs BOTH the public validate endpoint (speculative, no
 * side-effects) and the authoritative re-check inside
 * PaymentService.subscribeCourse() (the actual charge path) — one function,
 * not two divergent implementations. It never touches `successfulRedemptions`;
 * only PaymentService.grantCourseAccess()'s atomic increment finalizes a
 * redemption, inside the same DB transaction as the entitlement grant.
 *
 * MUST NEVER import PaymentModule — same DI-cycle rule EarningsService
 * documents for itself (Payment depends on Coupons/Earnings, never reverse).
 */

// Minimum charge floor: Stripe's own USD minimum is $0.50; MeSomb already
// floors per-currency via localAmountFromUsd's Math.ceil rounding. A single
// USD constant here is correct because the ladder/quote layer is USD-only.
const MIN_CHARGE_USD = 0.5;

export type CouponDerivedStatus =
  | 'SCHEDULED'
  | 'ACTIVE'
  | 'PAUSED'
  | 'DISABLED'
  | 'ARCHIVED'
  | 'EXPIRED'
  | 'USAGE_LIMIT_REACHED';

export type CouponInvalidReason =
  | 'NOT_FOUND'
  | 'EXPIRED'
  | 'NOT_STARTED'
  | 'USAGE_LIMIT_REACHED'
  | 'DISABLED'
  | 'PAUSED'
  | 'PLAN_NOT_ELIGIBLE'
  | 'COURSE_NOT_ELIGIBLE'
  | 'BELOW_MINIMUM_CHARGE'
  | 'COUPONS_DISABLED';

export interface CouponQuoteValid {
  valid: true;
  couponId: string;
  discountAmountUsd: number;
  originalPriceUsd: number;
  finalPriceUsd: number;
  currency: 'USD';
  appliedPlan: AccessPlan;
  discountType: CouponDiscountType;
  discountValue: number;
  couponCode: string;
}

export interface CouponQuoteInvalid {
  valid: false;
  reason: CouponInvalidReason;
}

export type CouponQuoteResult = CouponQuoteValid | CouponQuoteInvalid;

export interface CreateCouponInput {
  code: string;
  internalName?: string;
  discountType: CouponDiscountType;
  discountValue: number;
  courseIds: string[];
  plans: AccessPlan[];
  startsAt?: Date;
  expiresAt?: Date | null;
  maxRedemptions?: number | null;
}

export interface UpdateCouponInput {
  internalName?: string;
  discountType?: CouponDiscountType;
  discountValue?: number;
  courseIds?: string[];
  plans?: AccessPlan[];
  startsAt?: Date;
  expiresAt?: Date | null;
  maxRedemptions?: number | null;
}

function normalizeCode(raw: string): string {
  return raw.trim().toUpperCase();
}

@Injectable()
export class CouponsService {
  constructor(private readonly prisma: PrismaService) {}

  /** Lazily seeds the singleton settings row — mirrors the lazy-seed pattern
   *  EarningsService uses for CreatorEarningsAgreement defaults. */
  async getPlatformSettings() {
    const existing = await this.prisma.platformSettings.findUnique({
      where: { id: 'singleton' },
    });
    if (existing) return existing;
    return this.prisma.platformSettings.upsert({
      where: { id: 'singleton' },
      create: { id: 'singleton' },
      update: {},
    });
  }

  /** EXPIRED and USAGE_LIMIT_REACHED are facts derivable from data, not
   *  states a human sets — computed here at read time so every response
   *  (creator, admin, payment) is consistent without re-deriving it. */
  deriveCouponStatus(
    coupon: Pick<Coupon, 'state' | 'expiresAt' | 'maxRedemptions' | 'successfulRedemptions'>,
  ): CouponDerivedStatus {
    if (coupon.state === 'DISABLED') return 'DISABLED';
    if (coupon.state === 'ARCHIVED') return 'ARCHIVED';
    if (coupon.state === 'PAUSED') return 'PAUSED';
    if (coupon.expiresAt && coupon.expiresAt < new Date()) return 'EXPIRED';
    if (
      coupon.maxRedemptions !== null &&
      coupon.successfulRedemptions >= coupon.maxRedemptions
    ) {
      return 'USAGE_LIMIT_REACHED';
    }
    if (coupon.state === 'SCHEDULED') return 'SCHEDULED';
    return 'ACTIVE';
  }

  /* ─── creator CRUD ────────────────────────────────────────────────────── */

  private async assertOwnsCourses(creatorId: string, courseIds: string[]) {
    if (courseIds.length === 0) {
      throw new BadRequestException('A coupon must apply to at least one course');
    }
    const owned = await this.prisma.course.count({
      where: { id: { in: courseIds }, instructorId: creatorId },
    });
    if (owned !== courseIds.length) {
      throw new ForbiddenException('You can only apply coupons to courses you own');
    }
  }

  private validateDiscountShape(
    discountType: CouponDiscountType,
    discountValue: number,
  ) {
    if (!Number.isFinite(discountValue) || discountValue <= 0) {
      throw new BadRequestException('discountValue must be a positive number');
    }
    if (discountType === 'PERCENTAGE' && discountValue > 100) {
      throw new BadRequestException('Percentage discount cannot exceed 100%');
    }
  }

  /** A PERCENTAGE coupon at exactly 100 (fully free) is the one value allowed
   *  to exceed maxDiscountPercent — and only when the platform has opted in.
   *  Every other percentage is still capped normally. */
  private assertPercentAllowed(
    discountType: CouponDiscountType,
    discountValue: number,
    settings: { maxDiscountPercent: number; allowFreeCoupons: boolean },
  ) {
    if (discountType !== 'PERCENTAGE' || discountValue <= settings.maxDiscountPercent) return;
    const isFullyFree = discountValue === 100;
    if (isFullyFree && settings.allowFreeCoupons) return;
    throw new BadRequestException(
      isFullyFree
        ? 'Free (100%) coupons are not currently allowed on Teyro'
        : `Discount cannot exceed ${settings.maxDiscountPercent}%`,
    );
  }

  async create(creatorId: string, input: CreateCouponInput) {
    const settings = await this.getPlatformSettings();
    if (!settings.couponsEnabled) {
      throw new BadRequestException('Coupons are currently disabled on Teyro');
    }
    if (input.discountType === 'FIXED_AMOUNT' && !settings.allowFixedAmountDiscounts) {
      throw new BadRequestException('Fixed-amount discounts are not currently allowed');
    }
    if (
      (input.maxRedemptions === null || input.maxRedemptions === undefined) &&
      !settings.allowUnlimitedRedemptions
    ) {
      throw new BadRequestException('Unlimited-redemption coupons are not currently allowed');
    }

    const activeCount = await this.prisma.coupon.count({
      where: { creatorId, state: { in: ['ACTIVE', 'SCHEDULED', 'PAUSED'] } },
    });
    if (activeCount >= settings.maxActiveCouponsPerCreator) {
      throw new BadRequestException(
        `You've reached the maximum of ${settings.maxActiveCouponsPerCreator} active coupons`,
      );
    }

    this.validateDiscountShape(input.discountType, input.discountValue);
    this.assertPercentAllowed(input.discountType, input.discountValue, settings);

    const code = normalizeCode(input.code);
    if (!/^[A-Z0-9-]{3,32}$/.test(code)) {
      throw new BadRequestException(
        'Coupon code must be 3-32 characters: letters, numbers, and hyphens only',
      );
    }

    if (input.plans.length === 0) {
      throw new BadRequestException('A coupon must apply to at least one plan');
    }

    await this.assertOwnsCourses(creatorId, input.courseIds);

    try {
      return await this.prisma.coupon.create({
        data: {
          code,
          creatorId,
          internalName: input.internalName?.trim() || null,
          discountType: input.discountType,
          discountValue: input.discountValue,
          startsAt: input.startsAt ?? new Date(),
          state: input.startsAt && input.startsAt > new Date() ? 'SCHEDULED' : 'ACTIVE',
          expiresAt: input.expiresAt ?? null,
          maxRedemptions: input.maxRedemptions ?? null,
          eligibleCourses: { create: input.courseIds.map((courseId) => ({ courseId })) },
          eligiblePlans: { create: input.plans.map((plan) => ({ plan })) },
        },
        include: { eligibleCourses: true, eligiblePlans: true },
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2002') {
        throw new ConflictException('This coupon code is already in use');
      }
      throw e;
    }
  }

  async listMine(creatorId: string, filter?: { state?: string; courseId?: string }) {
    const where: Prisma.CouponWhereInput = { creatorId };
    if (filter?.courseId) {
      where.eligibleCourses = { some: { courseId: filter.courseId } };
    }
    const coupons = await this.prisma.coupon.findMany({
      where,
      include: { eligibleCourses: { include: { course: true } }, eligiblePlans: true },
      orderBy: { createdAt: 'desc' },
    });
    const withStatus = coupons.map((c) => ({ ...c, derivedStatus: this.deriveCouponStatus(c) }));
    return filter?.state
      ? withStatus.filter((c) => c.derivedStatus === filter.state)
      : withStatus;
  }

  private async findOwned(creatorId: string, id: string) {
    const coupon = await this.prisma.coupon.findUnique({
      where: { id },
      include: { eligibleCourses: { include: { course: true } }, eligiblePlans: true },
    });
    if (!coupon) throw new NotFoundException('Coupon not found');
    if (coupon.creatorId !== creatorId) {
      throw new ForbiddenException('You do not own this coupon');
    }
    return coupon;
  }

  async getMine(creatorId: string, id: string) {
    const coupon = await this.findOwned(creatorId, id);
    const redemptions = await this.prisma.couponRedemption.findMany({
      where: { couponId: id },
      orderBy: { createdAt: 'desc' },
      take: 100,
    });
    return {
      ...coupon,
      derivedStatus: this.deriveCouponStatus(coupon),
      redemptions,
      analytics: this.summarizeRedemptions(redemptions),
    };
  }

  private summarizeRedemptions(
    redemptions: { originalPriceUsd: number; discountAmountUsd: number; finalPriceUsd: number; creatorSharePctSnapshot: number; outcome: string }[],
  ) {
    const applied = redemptions.filter((r) => r.outcome === 'APPLIED');
    const grossUsd = applied.reduce((s, r) => s + r.originalPriceUsd, 0);
    const discountUsd = applied.reduce((s, r) => s + r.discountAmountUsd, 0);
    const netUsd = applied.reduce((s, r) => s + r.finalPriceUsd, 0);
    const creatorEarningsUsd = applied.reduce(
      (s, r) => s + (r.finalPriceUsd * r.creatorSharePctSnapshot) / 100,
      0,
    );
    return {
      redemptions: applied.length,
      grossUsd,
      discountUsd,
      netUsd,
      creatorEarningsUsd,
      teyroEarningsUsd: netUsd - creatorEarningsUsd,
    };
  }

  async update(creatorId: string, id: string, patch: UpdateCouponInput) {
    const coupon = await this.findOwned(creatorId, id);
    const locked = coupon.successfulRedemptions > 0;

    if (
      locked &&
      (patch.discountType !== undefined ||
        patch.discountValue !== undefined ||
        patch.courseIds !== undefined ||
        patch.plans !== undefined)
    ) {
      throw new ConflictException(
        'This coupon has already been redeemed — discount and eligibility can no longer be changed. Pause, archive, or create a new coupon instead.',
      );
    }

    if (patch.discountType !== undefined || patch.discountValue !== undefined) {
      const nextType = patch.discountType ?? coupon.discountType;
      const nextValue = patch.discountValue ?? coupon.discountValue;
      this.validateDiscountShape(nextType, nextValue);
      const settings = await this.getPlatformSettings();
      this.assertPercentAllowed(nextType, nextValue, settings);
    }

    if (patch.courseIds) await this.assertOwnsCourses(creatorId, patch.courseIds);

    return this.prisma.$transaction(async (tx) => {
      if (patch.courseIds) {
        await tx.couponCourse.deleteMany({ where: { couponId: id } });
        await tx.couponCourse.createMany({
          data: patch.courseIds.map((courseId) => ({ couponId: id, courseId })),
        });
      }
      if (patch.plans) {
        await tx.couponPlan.deleteMany({ where: { couponId: id } });
        await tx.couponPlan.createMany({
          data: patch.plans.map((plan) => ({ couponId: id, plan })),
        });
      }
      return tx.coupon.update({
        where: { id },
        data: {
          internalName: patch.internalName,
          discountType: patch.discountType,
          discountValue: patch.discountValue,
          startsAt: patch.startsAt,
          expiresAt: patch.expiresAt,
          maxRedemptions: patch.maxRedemptions,
        },
        include: { eligibleCourses: true, eligiblePlans: true },
      });
    });
  }

  async pause(creatorId: string, id: string) {
    await this.findOwned(creatorId, id);
    return this.prisma.coupon.update({ where: { id }, data: { state: 'PAUSED' } });
  }

  async resume(creatorId: string, id: string) {
    const coupon = await this.findOwned(creatorId, id);
    if (coupon.state === 'DISABLED') {
      throw new ForbiddenException('This coupon was disabled by Teyro and cannot be reactivated');
    }
    if (coupon.state === 'ARCHIVED') {
      throw new BadRequestException('Archived coupons cannot be resumed — create a new one');
    }
    const state = coupon.startsAt > new Date() ? 'SCHEDULED' : 'ACTIVE';
    return this.prisma.coupon.update({ where: { id }, data: { state } });
  }

  async archive(creatorId: string, id: string) {
    await this.findOwned(creatorId, id);
    return this.prisma.coupon.update({ where: { id }, data: { state: 'ARCHIVED' } });
  }

  async remove(creatorId: string, id: string) {
    const coupon = await this.findOwned(creatorId, id);
    if (coupon.successfulRedemptions > 0) {
      throw new ConflictException(
        'This coupon has redemption history and cannot be deleted — archive it instead',
      );
    }
    await this.prisma.coupon.delete({ where: { id } });
    return { deleted: true };
  }

  /* ─── the quote/validation engine ─────────────────────────────────────── */

  /**
   * Side-effect-free. Backs both `POST /coupons/validate` and the
   * authoritative re-check inside PaymentService.subscribeCourse() — never
   * touches successfulRedemptions. Only grantCourseAccess()'s atomic
   * increment (in payment.service.ts) finalizes a redemption.
   *
   * The base price is ALWAYS recomputed here from the course's own price via
   * the same pricing ladder subscribeCourse() uses — a caller-supplied price
   * is never accepted, closing off the exact class of bug this codebase has
   * already had to fix once (a client-supplied price letting someone pay
   * $0.01). This also means the public validate endpoint and the payment
   * path can never disagree about what the "before discount" price is.
   */
  async quote(input: {
    courseId: string;
    plan: AccessPlan;
    code: string;
  }): Promise<CouponQuoteResult> {
    const settings = await this.getPlatformSettings();
    if (!settings.couponsEnabled) {
      return { valid: false, reason: 'COUPONS_DISABLED' };
    }

    const course = await this.prisma.course.findUnique({
      where: { id: input.courseId },
      select: { price: true },
    });
    if (!course) return { valid: false, reason: 'NOT_FOUND' };

    const ladder = calculateCoursePricingLadder(course.price);
    const planData =
      input.plan === 'WEEKLY' ? ladder.weekly : input.plan === 'YEARLY' ? ladder.yearly : ladder.monthly;
    const basePrice = planData.price;

    const code = normalizeCode(input.code);
    const coupon = await this.prisma.coupon.findUnique({
      where: { code },
      include: { eligibleCourses: true, eligiblePlans: true },
    });
    if (!coupon) return { valid: false, reason: 'NOT_FOUND' };

    const status = this.deriveCouponStatus(coupon);
    if (status === 'DISABLED') return { valid: false, reason: 'DISABLED' };
    if (status === 'ARCHIVED') return { valid: false, reason: 'NOT_FOUND' };
    if (status === 'PAUSED') return { valid: false, reason: 'PAUSED' };
    if (status === 'EXPIRED') return { valid: false, reason: 'EXPIRED' };
    if (status === 'USAGE_LIMIT_REACHED') return { valid: false, reason: 'USAGE_LIMIT_REACHED' };
    if (status === 'SCHEDULED') return { valid: false, reason: 'NOT_STARTED' };

    if (!coupon.eligibleCourses.some((c) => c.courseId === input.courseId)) {
      return { valid: false, reason: 'COURSE_NOT_ELIGIBLE' };
    }
    if (!coupon.eligiblePlans.some((p) => p.plan === input.plan)) {
      return { valid: false, reason: 'PLAN_NOT_ELIGIBLE' };
    }

    // Clamp: max discount % (fixed amounts are converted to an effective
    // percent-of-basePrice and capped the same way), and never below $0.
    // A coupon already created at exactly 100% (fully free — only possible
    // when it passed assertPercentAllowed's allowFreeCoupons gate at create
    // time) is exempt from the maxDiscountPercent clamp here.
    let discountAmountUsd: number;
    if (coupon.discountType === 'PERCENTAGE') {
      const pct =
        coupon.discountValue === 100 ? 100 : Math.min(coupon.discountValue, settings.maxDiscountPercent);
      discountAmountUsd = (basePrice * pct) / 100;
    } else {
      const maxByPct = (basePrice * settings.maxDiscountPercent) / 100;
      discountAmountUsd = Math.min(coupon.discountValue, basePrice, maxByPct);
    }
    discountAmountUsd = Math.round(discountAmountUsd * 100) / 100;

    const finalPriceUsd = Math.round((basePrice - discountAmountUsd) * 100) / 100;

    // Reject rather than silently cap — a capped discount would make the
    // displayed price diverge unpredictably from a simple formula, and both
    // providers already enforce their own hard minimums downstream. A fully
    // free (finalPriceUsd === 0) coupon is exempt — it never reaches a
    // payment provider at all, so MIN_CHARGE_USD (their minimum chargeable
    // amount) doesn't apply to it.
    if (finalPriceUsd > 0 && finalPriceUsd < MIN_CHARGE_USD) {
      return { valid: false, reason: 'BELOW_MINIMUM_CHARGE' };
    }

    return {
      valid: true,
      couponId: coupon.id,
      discountAmountUsd,
      originalPriceUsd: basePrice,
      finalPriceUsd,
      currency: 'USD',
      appliedPlan: input.plan,
      discountType: coupon.discountType,
      discountValue: coupon.discountValue,
      couponCode: coupon.code,
    };
  }

  /**
   * A redemption already recorded for this exact (provider, providerReference)
   * charge — the signal a caller uses to skip re-claiming a slot on a
   * duplicate webhook delivery. Checked BEFORE claimRedemptionSlot so a
   * retried webhook never double-decrements the usage limit.
   */
  async findRedemptionByReference(
    tx: Prisma.TransactionClient,
    provider: 'STRIPE' | 'MESOMB' | 'MANUAL',
    providerReference: string,
  ) {
    return tx.couponRedemption.findUnique({
      where: { provider_providerReference: { provider, providerReference } },
    });
  }

  /**
   * Step 1 of redemption finalization — atomic, race-safe usage-count claim.
   * Called ONLY from PaymentService.grantCourseAccess(), inside the same
   * $transaction that writes the entitlement/subscription/order rows, and
   * BEFORE the earnings ledger entry: the ledger's discountMinor must
   * reflect whether the slot was actually claimed, not the other way round.
   * Returns false if the coupon lost the race (usage limit hit between
   * validate and pay, or the coupon vanished) — the caller then records the
   * sale as a plain, non-discounted charge instead of failing the payment
   * outright (money was already collected from the learner).
   */
  async claimRedemptionSlot(tx: Prisma.TransactionClient, couponId: string): Promise<boolean> {
    const coupon = await tx.coupon.findUnique({ where: { id: couponId } });
    if (!coupon) return false;

    if (coupon.maxRedemptions === null) {
      await tx.coupon.update({
        where: { id: couponId },
        data: { successfulRedemptions: { increment: 1 } },
      });
      return true;
    }

    const result = await tx.coupon.updateMany({
      where: { id: couponId, successfulRedemptions: { lt: coupon.maxRedemptions } },
      data: { successfulRedemptions: { increment: 1 } },
    });
    return result.count > 0;
  }

  /**
   * Step 2 — writes the immutable CouponRedemption snapshot. Only call this
   * after claimRedemptionSlot() returned true AND the EarningsTransaction for
   * this charge has been written (creatorSharePct comes from that call).
   */
  async recordRedemptionSnapshot(
    tx: Prisma.TransactionClient,
    input: {
      couponId: string;
      userId: string;
      courseId: string;
      plan: AccessPlan;
      originalPriceUsd: number;
      discountAmountUsd: number;
      finalPriceUsd: number;
      creatorSharePct: number;
      provider: 'STRIPE' | 'MESOMB' | 'MANUAL';
      providerReference: string;
      orderId?: string;
      earningsTransactionId?: string;
    },
  ) {
    const coupon = await tx.coupon.findUnique({ where: { id: input.couponId } });
    if (!coupon) return null;

    try {
      return await tx.couponRedemption.create({
        data: {
          publicId: generatePublicId('CR'),
          couponId: input.couponId,
          userId: input.userId,
          courseId: input.courseId,
          plan: input.plan,
          couponCodeSnapshot: coupon.code,
          discountTypeSnapshot: coupon.discountType,
          discountValueSnapshot: coupon.discountValue,
          originalPriceUsd: input.originalPriceUsd,
          discountAmountUsd: input.discountAmountUsd,
          finalPriceUsd: input.finalPriceUsd,
          creatorSharePctSnapshot: input.creatorSharePct,
          orderId: input.orderId,
          earningsTransactionId: input.earningsTransactionId,
          provider: input.provider,
          providerReference: input.providerReference,
        },
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2002') {
        // Duplicate webhook delivery for the same charge — already redeemed.
        return this.findRedemptionByReference(tx, input.provider, input.providerReference);
      }
      throw e;
    }
  }
}
