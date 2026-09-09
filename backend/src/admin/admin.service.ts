import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

const DAY_MS = 86_400_000;

/**
 * Read models for the general Teyro Admin Center — platform-wide numbers,
 * as opposed to Tey's notification-specific overview (tey/admin).
 *
 * Everything here is a real, currently-computable aggregate. Metrics that
 * need infrastructure this module doesn't have yet (DAU/WAU/MAU, revenue,
 * retention) are deliberately left out rather than faked — the frontend
 * labels those "Data unavailable" instead of inventing a number.
 */
@Injectable()
export class AdminService {
  constructor(private readonly prisma: PrismaService) {}

  async summary() {
    const since7d = new Date(Date.now() - 7 * DAY_MS);

    const [
      totalUsers,
      newUsersLast7d,
      usersByRole,
      usersByAccountStatus,
      totalCourses,
      publishedCourses,
      totalCreators,
      creatorsByVerification,
      pendingPayouts,
    ] = await Promise.all([
      this.prisma.user.count(),
      this.prisma.user.count({ where: { createdAt: { gte: since7d } } }),
      this.prisma.user.groupBy({ by: ['role'], _count: { _all: true } }),
      this.prisma.user.groupBy({
        by: ['accountStatus'],
        _count: { _all: true },
      }),
      this.prisma.course.count(),
      this.prisma.course.count({ where: { published: true } }),
      this.prisma.instructorProfile.count(),
      this.prisma.instructorProfile.groupBy({
        by: ['verificationStatus'],
        _count: { _all: true },
      }),
      this.prisma.creatorPayout.count({
        where: { status: { in: ['REQUESTED', 'UNDER_REVIEW'] } },
      }),
    ]);

    const toRecord = (rows: { _count: { _all: number } }[], key: string) =>
      Object.fromEntries(
        rows.map((r) => [
          (r as unknown as Record<string, string>)[key],
          r._count._all,
        ]),
      );

    return {
      users: {
        total: totalUsers,
        newLast7d: newUsersLast7d,
        byRole: toRecord(usersByRole, 'role'),
        byAccountStatus: toRecord(usersByAccountStatus, 'accountStatus'),
      },
      courses: {
        total: totalCourses,
        published: publishedCourses,
      },
      creators: {
        total: totalCreators,
        byVerificationStatus: toRecord(
          creatorsByVerification,
          'verificationStatus',
        ),
      },
      payouts: {
        pendingReview: pendingPayouts,
      },
    };
  }
}
