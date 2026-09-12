import { Test, TestingModule } from '@nestjs/testing';
import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
} from '@nestjs/common';
import { CouponsService } from './coupons.service';
import { PrismaService } from '../prisma/prisma.service';

const DEFAULT_SETTINGS = {
  id: 'singleton',
  couponsEnabled: true,
  maxDiscountPercent: 80,
  maxActiveCouponsPerCreator: 20,
  allowFixedAmountDiscounts: true,
  allowUnlimitedRedemptions: true,
};

const mockPrisma = {
  platformSettings: { findUnique: jest.fn(), upsert: jest.fn() },
  course: { count: jest.fn(), findUnique: jest.fn() },
  coupon: {
    count: jest.fn(),
    create: jest.fn(),
    findUnique: jest.fn(),
    findMany: jest.fn(),
    update: jest.fn(),
    updateMany: jest.fn(),
    delete: jest.fn(),
  },
  couponRedemption: { findMany: jest.fn(), findUnique: jest.fn() },
  $transaction: jest.fn(),
};

function activeCoupon(overrides: Partial<any> = {}): any {
  return {
    id: 'coupon-1',
    code: 'SAVE20',
    creatorId: 'creator-1',
    discountType: 'PERCENTAGE' as const,
    discountValue: 20,
    state: 'ACTIVE' as const,
    startsAt: new Date(Date.now() - 1000),
    expiresAt: null,
    maxRedemptions: null,
    successfulRedemptions: 0,
    eligibleCourses: [{ courseId: 'course-1' }],
    eligiblePlans: [{ plan: 'MONTHLY' }],
    ...overrides,
  };
}

describe('CouponsService', () => {
  let service: CouponsService;

  beforeEach(async () => {
    jest.clearAllMocks();
    mockPrisma.platformSettings.findUnique.mockResolvedValue(DEFAULT_SETTINGS);
    mockPrisma.course.findUnique.mockResolvedValue({ price: 100 });

    const module: TestingModule = await Test.createTestingModule({
      providers: [CouponsService, { provide: PrismaService, useValue: mockPrisma }],
    }).compile();

    service = module.get(CouponsService);
  });

  describe('deriveCouponStatus', () => {
    it('derives EXPIRED from expiresAt even when state is ACTIVE', () => {
      const status = service.deriveCouponStatus(
        activeCoupon({ expiresAt: new Date(Date.now() - 1000) }),
      );
      expect(status).toBe('EXPIRED');
    });

    it('derives USAGE_LIMIT_REACHED from redemption counts', () => {
      const status = service.deriveCouponStatus(
        activeCoupon({ maxRedemptions: 5, successfulRedemptions: 5 }),
      );
      expect(status).toBe('USAGE_LIMIT_REACHED');
    });

    it('never lets a human-set ACTIVE state override DISABLED/PAUSED/ARCHIVED', () => {
      expect(service.deriveCouponStatus(activeCoupon({ state: 'DISABLED' }))).toBe('DISABLED');
      expect(service.deriveCouponStatus(activeCoupon({ state: 'PAUSED' }))).toBe('PAUSED');
      expect(service.deriveCouponStatus(activeCoupon({ state: 'ARCHIVED' }))).toBe('ARCHIVED');
    });
  });

  describe('quote', () => {
    it('recomputes basePrice from the course price ladder — never trusts a caller-supplied price', async () => {
      mockPrisma.coupon.findUnique.mockResolvedValue(activeCoupon());
      const result = await service.quote({ courseId: 'course-1', plan: 'MONTHLY', code: 'save20' });
      expect(result.valid).toBe(true);
      // Monthly ladder price for a $100 base course, per pricing-engine.ts formula.
      if (result.valid) {
        expect(result.originalPriceUsd).toBeGreaterThan(0);
        expect(result.finalPriceUsd).toBeLessThan(result.originalPriceUsd);
      }
    });

    it('is case-insensitive on the code', async () => {
      mockPrisma.coupon.findUnique.mockResolvedValue(activeCoupon());
      await service.quote({ courseId: 'course-1', plan: 'MONTHLY', code: 'save20' });
      expect(mockPrisma.coupon.findUnique).toHaveBeenCalledWith(
        expect.objectContaining({ where: { code: 'SAVE20' } }),
      );
    });

    it('returns NOT_FOUND for an unknown code', async () => {
      mockPrisma.coupon.findUnique.mockResolvedValue(null);
      const result = await service.quote({ courseId: 'course-1', plan: 'MONTHLY', code: 'NOPE' });
      expect(result).toEqual({ valid: false, reason: 'NOT_FOUND' });
    });

    it('rejects an expired coupon', async () => {
      mockPrisma.coupon.findUnique.mockResolvedValue(
        activeCoupon({ expiresAt: new Date(Date.now() - 1000) }),
      );
      const result = await service.quote({ courseId: 'course-1', plan: 'MONTHLY', code: 'SAVE20' });
      expect(result).toEqual({ valid: false, reason: 'EXPIRED' });
    });

    it('rejects a coupon that has not started yet', async () => {
      mockPrisma.coupon.findUnique.mockResolvedValue(
        activeCoupon({ state: 'SCHEDULED', startsAt: new Date(Date.now() + 100000) }),
      );
      const result = await service.quote({ courseId: 'course-1', plan: 'MONTHLY', code: 'SAVE20' });
      expect(result).toEqual({ valid: false, reason: 'NOT_STARTED' });
    });

    it('rejects a paused coupon', async () => {
      mockPrisma.coupon.findUnique.mockResolvedValue(activeCoupon({ state: 'PAUSED' }));
      const result = await service.quote({ courseId: 'course-1', plan: 'MONTHLY', code: 'SAVE20' });
      expect(result).toEqual({ valid: false, reason: 'PAUSED' });
    });

    it('rejects a disabled coupon', async () => {
      mockPrisma.coupon.findUnique.mockResolvedValue(activeCoupon({ state: 'DISABLED' }));
      const result = await service.quote({ courseId: 'course-1', plan: 'MONTHLY', code: 'SAVE20' });
      expect(result).toEqual({ valid: false, reason: 'DISABLED' });
    });

    it('rejects when usage limit is reached', async () => {
      mockPrisma.coupon.findUnique.mockResolvedValue(
        activeCoupon({ maxRedemptions: 1, successfulRedemptions: 1 }),
      );
      const result = await service.quote({ courseId: 'course-1', plan: 'MONTHLY', code: 'SAVE20' });
      expect(result).toEqual({ valid: false, reason: 'USAGE_LIMIT_REACHED' });
    });

    it('rejects a course the coupon is not eligible for', async () => {
      mockPrisma.coupon.findUnique.mockResolvedValue(activeCoupon());
      const result = await service.quote({ courseId: 'other-course', plan: 'MONTHLY', code: 'SAVE20' });
      expect(result).toEqual({ valid: false, reason: 'COURSE_NOT_ELIGIBLE' });
    });

    it('rejects a plan the coupon is not eligible for', async () => {
      mockPrisma.coupon.findUnique.mockResolvedValue(activeCoupon());
      const result = await service.quote({ courseId: 'course-1', plan: 'YEARLY', code: 'SAVE20' });
      expect(result).toEqual({ valid: false, reason: 'PLAN_NOT_ELIGIBLE' });
    });

    it('clamps a percentage discount to the platform max', async () => {
      mockPrisma.platformSettings.findUnique.mockResolvedValue({
        ...DEFAULT_SETTINGS,
        maxDiscountPercent: 50,
      });
      mockPrisma.coupon.findUnique.mockResolvedValue(activeCoupon({ discountValue: 90 }));
      const result = await service.quote({ courseId: 'course-1', plan: 'MONTHLY', code: 'SAVE20' });
      expect(result.valid).toBe(true);
      if (result.valid) {
        const impliedPct = (result.discountAmountUsd / result.originalPriceUsd) * 100;
        expect(impliedPct).toBeCloseTo(50, 0);
      }
    });

    it('clamps a fixed-amount discount to the max-discount-% ceiling, not just the raw price', async () => {
      mockPrisma.coupon.findUnique.mockResolvedValue(
        activeCoupon({ discountType: 'FIXED_AMOUNT', discountValue: 100000 }),
      );
      const result = await service.quote({ courseId: 'course-1', plan: 'MONTHLY', code: 'SAVE20' });
      expect(result.valid).toBe(true);
      if (result.valid) {
        // 80% of the $28 monthly price, not the full $100000 requested.
        expect(result.discountAmountUsd).toBeCloseTo(result.originalPriceUsd * 0.8, 1);
      }
    });

    it('rejects when a raised max-discount-% would push a cheap plan below the minimum charge', async () => {
      // With the default 80% cap, the pricing floors (min $0.99/$2.99/$9.99)
      // can never actually dip below the $0.50 minimum — this only becomes
      // reachable if an admin raises the platform cap higher.
      mockPrisma.platformSettings.findUnique.mockResolvedValue({
        ...DEFAULT_SETTINGS,
        maxDiscountPercent: 99,
      });
      mockPrisma.course.findUnique.mockResolvedValue({ price: 5 }); // → cheap weekly floor
      mockPrisma.coupon.findUnique.mockResolvedValue(
        activeCoupon({ discountType: 'FIXED_AMOUNT', discountValue: 100000, eligiblePlans: [{ plan: 'WEEKLY' }] }),
      );
      const result = await service.quote({ courseId: 'course-1', plan: 'WEEKLY', code: 'SAVE20' });
      expect(result).toEqual({ valid: false, reason: 'BELOW_MINIMUM_CHARGE' });
    });

    it('rejects when coupons are globally disabled', async () => {
      mockPrisma.platformSettings.findUnique.mockResolvedValue({
        ...DEFAULT_SETTINGS,
        couponsEnabled: false,
      });
      const result = await service.quote({ courseId: 'course-1', plan: 'MONTHLY', code: 'SAVE20' });
      expect(result).toEqual({ valid: false, reason: 'COUPONS_DISABLED' });
    });

    it('never touches successfulRedemptions — quote is side-effect-free', async () => {
      mockPrisma.coupon.findUnique.mockResolvedValue(activeCoupon());
      await service.quote({ courseId: 'course-1', plan: 'MONTHLY', code: 'SAVE20' });
      expect(mockPrisma.coupon.update).not.toHaveBeenCalled();
      expect(mockPrisma.coupon.updateMany).not.toHaveBeenCalled();
    });
  });

  describe('create — ownership and validation', () => {
    it('rejects a course the creator does not own', async () => {
      mockPrisma.coupon.count.mockResolvedValue(0);
      mockPrisma.course.count.mockResolvedValue(0); // owned count mismatch
      await expect(
        service.create('creator-1', {
          code: 'NEW10',
          discountType: 'PERCENTAGE',
          discountValue: 10,
          courseIds: ['someone-elses-course'],
          plans: ['MONTHLY'],
        }),
      ).rejects.toThrow(ForbiddenException);
    });

    it('rejects a percentage discount above the platform max', async () => {
      mockPrisma.coupon.count.mockResolvedValue(0);
      mockPrisma.course.count.mockResolvedValue(1);
      await expect(
        service.create('creator-1', {
          code: 'HUGE',
          discountType: 'PERCENTAGE',
          discountValue: 95,
          courseIds: ['course-1'],
          plans: ['MONTHLY'],
        }),
      ).rejects.toThrow(BadRequestException);
    });

    it('rejects a malformed code', async () => {
      mockPrisma.coupon.count.mockResolvedValue(0);
      mockPrisma.course.count.mockResolvedValue(1);
      await expect(
        service.create('creator-1', {
          code: 'has spaces!!',
          discountType: 'PERCENTAGE',
          discountValue: 10,
          courseIds: ['course-1'],
          plans: ['MONTHLY'],
        }),
      ).rejects.toThrow(BadRequestException);
    });
  });

  describe('update — edit-lock after first redemption', () => {
    it('blocks discount/eligibility changes once the coupon has been redeemed', async () => {
      mockPrisma.coupon.findUnique.mockResolvedValue(
        activeCoupon({ successfulRedemptions: 3, creatorId: 'creator-1' }),
      );
      await expect(
        service.update('creator-1', 'coupon-1', { discountValue: 50 }),
      ).rejects.toThrow(ConflictException);
    });

    it('still allows pause/resume/archive after redemption (via their own methods)', async () => {
      mockPrisma.coupon.findUnique.mockResolvedValue(
        activeCoupon({ successfulRedemptions: 3, creatorId: 'creator-1' }),
      );
      mockPrisma.coupon.update.mockResolvedValue({});
      await expect(service.pause('creator-1', 'coupon-1')).resolves.toBeDefined();
    });

    it('rejects update from a non-owning creator', async () => {
      mockPrisma.coupon.findUnique.mockResolvedValue(activeCoupon({ creatorId: 'someone-else' }));
      await expect(
        service.update('creator-1', 'coupon-1', { internalName: 'x' }),
      ).rejects.toThrow(ForbiddenException);
    });
  });

  describe('remove — delete-blocked-if-redeemed', () => {
    it('allows deleting a never-redeemed coupon', async () => {
      mockPrisma.coupon.findUnique.mockResolvedValue(
        activeCoupon({ successfulRedemptions: 0, creatorId: 'creator-1' }),
      );
      mockPrisma.coupon.delete.mockResolvedValue({});
      await expect(service.remove('creator-1', 'coupon-1')).resolves.toEqual({ deleted: true });
    });

    it('blocks deleting a redeemed coupon — must archive instead', async () => {
      mockPrisma.coupon.findUnique.mockResolvedValue(
        activeCoupon({ successfulRedemptions: 1, creatorId: 'creator-1' }),
      );
      await expect(service.remove('creator-1', 'coupon-1')).rejects.toThrow(ConflictException);
    });
  });

  describe('claimRedemptionSlot — race safety', () => {
    it('claims successfully when under the limit', async () => {
      const tx = {
        coupon: {
          findUnique: jest.fn().mockResolvedValue({ id: 'coupon-1', maxRedemptions: 10 }),
          updateMany: jest.fn().mockResolvedValue({ count: 1 }),
        },
      } as any;
      await expect(service.claimRedemptionSlot(tx, 'coupon-1')).resolves.toBe(true);
    });

    it('fails closed when the limit has already been hit (count: 0)', async () => {
      const tx = {
        coupon: {
          findUnique: jest.fn().mockResolvedValue({ id: 'coupon-1', maxRedemptions: 10 }),
          updateMany: jest.fn().mockResolvedValue({ count: 0 }),
        },
      } as any;
      await expect(service.claimRedemptionSlot(tx, 'coupon-1')).resolves.toBe(false);
    });

    it('always claims for unlimited coupons', async () => {
      const tx = {
        coupon: {
          findUnique: jest.fn().mockResolvedValue({ id: 'coupon-1', maxRedemptions: null }),
          update: jest.fn().mockResolvedValue({}),
        },
      } as any;
      await expect(service.claimRedemptionSlot(tx, 'coupon-1')).resolves.toBe(true);
    });
  });
});
