import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CouponsService } from '../coupons/coupons.service';

const MAX_PAGE_SIZE = 100;
const DEFAULT_PAGE_SIZE = 25;

export interface ListCouponsQuery {
  page?: string;
  pageSize?: string;
  search?: string;
  state?: string;
  creatorId?: string;
}

/**
 * Backend for /admin/coupons — platform-wide view, following the exact
 * list/detail/action shape of AdminCoursesService. Reuses CouponsService's
 * deriveCouponStatus() and getPlatformSettings() rather than re-deriving
 * coupon status or duplicating the settings singleton logic.
 *
 * Disable is admin-only and terminal — the creator cannot reactivate a
 * disabled coupon (see CouponsService.resume()). Pause/archive here mirror
 * the creator-facing actions but are audited as admin actions, and unlike
 * the creator flow do not require ownership (any admin can act on any
 * creator's coupon).
 */
@Injectable()
export class AdminCouponsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly coupons: CouponsService,
  ) {}

  async list(query: ListCouponsQuery) {
    const page = Math.max(1, parseInt(query.page ?? '1', 10) || 1);
    const pageSize = Math.min(
      MAX_PAGE_SIZE,
      Math.max(1, parseInt(query.pageSize ?? String(DEFAULT_PAGE_SIZE), 10) || DEFAULT_PAGE_SIZE),
    );

    const where: Prisma.CouponWhereInput = {};
    if (query.search?.trim()) {
      const term = query.search.trim();
      where.OR = [
        { code: { contains: term, mode: 'insensitive' } },
        { internalName: { contains: term, mode: 'insensitive' } },
        { creator: { fullName: { contains: term, mode: 'insensitive' } } },
        { creator: { email: { contains: term, mode: 'insensitive' } } },
      ];
    }
    if (query.creatorId) where.creatorId = query.creatorId;

    const [items, total] = await Promise.all([
      this.prisma.coupon.findMany({
        where,
        include: {
          creator: { select: { id: true, fullName: true, email: true } },
          eligibleCourses: { include: { course: { select: { id: true, title: true } } } },
          eligiblePlans: true,
          _count: { select: { redemptions: true } },
        },
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      this.prisma.coupon.count({ where }),
    ]);

    const withStatus = items.map((c) => ({ ...c, derivedStatus: this.coupons.deriveCouponStatus(c) }));
    const filtered = query.state
      ? withStatus.filter((c) => c.derivedStatus === query.state)
      : withStatus;

    return { items: filtered, total, page, pageSize };
  }

  async detail(id: string) {
    const coupon = await this.prisma.coupon.findUnique({
      where: { id },
      include: {
        creator: { select: { id: true, fullName: true, email: true } },
        eligibleCourses: { include: { course: { select: { id: true, title: true } } } },
        eligiblePlans: true,
      },
    });
    if (!coupon) throw new NotFoundException('Coupon not found');

    // Student privacy: redemption history exposes only what's needed to
    // audit usage — never email/phone/payment method. displayName comes from
    // a join, not from any payment record.
    const redemptions = await this.prisma.couponRedemption.findMany({
      where: { couponId: id },
      include: { coupon: false },
      orderBy: { createdAt: 'desc' },
      take: 200,
    });
    const studentIds = [...new Set(redemptions.map((r) => r.userId))];
    const students = await this.prisma.user.findMany({
      where: { id: { in: studentIds } },
      select: { id: true, fullName: true },
    });
    const nameById = new Map(students.map((s) => [s.id, s.fullName]));

    return {
      ...coupon,
      derivedStatus: this.coupons.deriveCouponStatus(coupon),
      redemptions: redemptions.map((r) => ({
        id: r.id,
        publicId: r.publicId,
        studentName: nameById.get(r.userId) ?? 'Unknown student',
        courseId: r.courseId,
        plan: r.plan,
        originalPriceUsd: r.originalPriceUsd,
        discountAmountUsd: r.discountAmountUsd,
        finalPriceUsd: r.finalPriceUsd,
        outcome: r.outcome,
        createdAt: r.createdAt,
      })),
    };
  }

  async disable(actorId: string, id: string, reason: string) {
    if (!reason?.trim()) {
      throw new BadRequestException('A reason is required to disable a coupon');
    }
    const coupon = await this.prisma.coupon.findUnique({ where: { id } });
    if (!coupon) throw new NotFoundException('Coupon not found');

    await this.prisma.$transaction([
      this.prisma.coupon.update({
        where: { id },
        data: {
          state: 'DISABLED',
          disabledByAdminId: actorId,
          disabledReason: reason.trim(),
          disabledAt: new Date(),
        },
      }),
      this.prisma.adminAuditLog.create({
        data: {
          actorId,
          action: 'ADMIN_DISABLED_COUPON',
          entityType: 'Coupon',
          entityId: id,
          reason: reason.trim(),
          meta: { previousState: coupon.state, code: coupon.code },
        },
      }),
    ]);

    return { state: 'DISABLED' as const };
  }

  async pause(actorId: string, id: string) {
    const coupon = await this.prisma.coupon.findUnique({ where: { id } });
    if (!coupon) throw new NotFoundException('Coupon not found');

    await this.prisma.$transaction([
      this.prisma.coupon.update({ where: { id }, data: { state: 'PAUSED' } }),
      this.prisma.adminAuditLog.create({
        data: {
          actorId,
          action: 'ADMIN_PAUSED_COUPON',
          entityType: 'Coupon',
          entityId: id,
          meta: { previousState: coupon.state, code: coupon.code },
        },
      }),
    ]);

    return { state: 'PAUSED' as const };
  }

  async archive(actorId: string, id: string) {
    const coupon = await this.prisma.coupon.findUnique({ where: { id } });
    if (!coupon) throw new NotFoundException('Coupon not found');

    await this.prisma.$transaction([
      this.prisma.coupon.update({ where: { id }, data: { state: 'ARCHIVED' } }),
      this.prisma.adminAuditLog.create({
        data: {
          actorId,
          action: 'ADMIN_ARCHIVED_COUPON',
          entityType: 'Coupon',
          entityId: id,
          meta: { previousState: coupon.state, code: coupon.code },
        },
      }),
    ]);

    return { state: 'ARCHIVED' as const };
  }

  async analytics() {
    const [totalCoupons, activeCoupons, redemptions] = await Promise.all([
      this.prisma.coupon.count(),
      this.prisma.coupon.count({ where: { state: 'ACTIVE' } }),
      this.prisma.couponRedemption.findMany({
        where: { outcome: 'APPLIED' },
        select: { originalPriceUsd: true, discountAmountUsd: true, finalPriceUsd: true, creatorSharePctSnapshot: true },
      }),
    ]);
    const grossUsd = redemptions.reduce((s, r) => s + r.originalPriceUsd, 0);
    const discountUsd = redemptions.reduce((s, r) => s + r.discountAmountUsd, 0);
    const netUsd = redemptions.reduce((s, r) => s + r.finalPriceUsd, 0);
    const creatorEarningsUsd = redemptions.reduce(
      (s, r) => s + (r.finalPriceUsd * r.creatorSharePctSnapshot) / 100,
      0,
    );
    return {
      totalCoupons,
      activeCoupons,
      totalRedemptions: redemptions.length,
      grossUsd,
      discountUsd,
      netUsd,
      creatorEarningsUsd,
      teyroEarningsUsd: netUsd - creatorEarningsUsd,
    };
  }

  async getSettings() {
    return this.coupons.getPlatformSettings();
  }

  async updateSettings(
    actorId: string,
    patch: {
      couponsEnabled?: boolean;
      maxDiscountPercent?: number;
      maxActiveCouponsPerCreator?: number;
      allowFixedAmountDiscounts?: boolean;
      allowUnlimitedRedemptions?: boolean;
    },
  ) {
    if (
      patch.maxDiscountPercent !== undefined &&
      (patch.maxDiscountPercent < 1 || patch.maxDiscountPercent > 100)
    ) {
      throw new BadRequestException('maxDiscountPercent must be between 1 and 100');
    }
    await this.coupons.getPlatformSettings(); // ensure the singleton row exists
    const updated = await this.prisma.platformSettings.update({
      where: { id: 'singleton' },
      data: { ...patch, updatedByAdminId: actorId },
    });
    await this.prisma.adminAuditLog.create({
      data: {
        actorId,
        action: 'ADMIN_UPDATED_COUPON_SETTINGS',
        entityType: 'PlatformSettings',
        entityId: 'singleton',
        meta: patch,
      },
    });
    return updated;
  }
}
