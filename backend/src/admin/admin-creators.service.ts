import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AccountStatus, Prisma, VerificationStatus } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { EarningsService } from '../earnings/earnings.service';

const MAX_PAGE_SIZE = 100;
const DEFAULT_PAGE_SIZE = 25;
const HISTORY_LIMIT = 20;
const ACTIVE_WINDOW_DAYS = 30;
const DAY_MS = 86_400_000;

export interface ListCreatorsQuery {
  page?: string;
  pageSize?: string;
  search?: string;
  accountStatus?: string;
  verificationStatus?: string;
  courses?: 'has' | 'none' | 'published';
  activity?: 'active' | 'inactive';
  sortBy?: 'newest' | 'oldest' | 'mostCourses' | 'recentlyActive';
}

/**
 * Backend for /admin/creators. A "creator" is any User with
 * hasCreatorAccess=true (the canonical flag auth.service.ts sets the moment
 * someone becomes an INSTRUCTOR) — NOT every creator has an InstructorProfile
 * row yet, so every read here treats that relation as optional.
 *
 * Deliberately does NOT introduce a second "creator status": suspending a
 * creator IS suspending the underlying User (AdminUsersService#suspend) —
 * the frontend calls that existing endpoint directly. This service only adds
 * genuinely new capability: read models, and verify/unverify (there was no
 * prior mutation path for InstructorProfile.verificationStatus at all).
 *
 * "Featured creator" is deliberately NOT implemented — no field for it
 * exists anywhere in the schema (only the per-course Course.featured does),
 * and adding one was explicitly deferred rather than bolted on for a UI that
 * has no discovery surface to consume it yet.
 */
@Injectable()
export class AdminCreatorsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly earnings: EarningsService,
  ) {}

  async summary() {
    const since30d = new Date(Date.now() - ACTIVE_WINDOW_DAYS * DAY_MS);

    const [total, activeLast30d, withPublishedCourses, pendingVerification] =
      await Promise.all([
        this.prisma.user.count({ where: { hasCreatorAccess: true } }),
        this.prisma.user.count({
          where: { hasCreatorAccess: true, lastActiveAt: { gte: since30d } },
        }),
        this.prisma.user.count({
          where: {
            hasCreatorAccess: true,
            courses: { some: { published: true } },
          },
        }),
        this.prisma.user.count({
          where: {
            hasCreatorAccess: true,
            OR: [
              { instructorProfile: null },
              { instructorProfile: { verificationStatus: 'PENDING' } },
            ],
          },
        }),
      ]);

    return { total, activeLast30d, withPublishedCourses, pendingVerification };
  }

  async list(query: ListCreatorsQuery) {
    const page = Math.max(1, parseInt(query.page ?? '1', 10) || 1);
    const pageSize = Math.min(
      MAX_PAGE_SIZE,
      Math.max(
        1,
        parseInt(query.pageSize ?? String(DEFAULT_PAGE_SIZE), 10) ||
          DEFAULT_PAGE_SIZE,
      ),
    );

    const and: Prisma.UserWhereInput[] = [{ hasCreatorAccess: true }];

    if (query.search?.trim()) {
      const term = query.search.trim();
      and.push({
        OR: [
          { fullName: { contains: term, mode: 'insensitive' } },
          { email: { contains: term, mode: 'insensitive' } },
          {
            instructorProfile: {
              displayName: { contains: term, mode: 'insensitive' },
            },
          },
        ],
      });
    }

    if (query.accountStatus) {
      if (!(query.accountStatus in AccountStatus)) {
        throw new BadRequestException(
          `Unknown account status: ${query.accountStatus}`,
        );
      }
      and.push({ accountStatus: query.accountStatus as AccountStatus });
    }

    if (query.verificationStatus) {
      if (!(query.verificationStatus in VerificationStatus)) {
        throw new BadRequestException(
          `Unknown verification status: ${query.verificationStatus}`,
        );
      }
      and.push({
        instructorProfile: {
          verificationStatus: query.verificationStatus as VerificationStatus,
        },
      });
    }

    if (query.courses === 'has') and.push({ courses: { some: {} } });
    else if (query.courses === 'none') and.push({ courses: { none: {} } });
    else if (query.courses === 'published')
      and.push({ courses: { some: { published: true } } });

    if (query.activity === 'active' || query.activity === 'inactive') {
      const since30d = new Date(Date.now() - ACTIVE_WINDOW_DAYS * DAY_MS);
      and.push(
        query.activity === 'active'
          ? { lastActiveAt: { gte: since30d } }
          : {
              OR: [{ lastActiveAt: { lt: since30d } }, { lastActiveAt: null }],
            },
      );
    }

    const where: Prisma.UserWhereInput = { AND: and };

    const orderBy: Prisma.UserOrderByWithRelationInput =
      query.sortBy === 'oldest'
        ? { createdAt: 'asc' }
        : query.sortBy === 'mostCourses'
          ? { courses: { _count: 'desc' } }
          : query.sortBy === 'recentlyActive'
            ? { lastActiveAt: 'desc' }
            : { createdAt: 'desc' };

    const [rows, total] = await Promise.all([
      this.prisma.user.findMany({
        where,
        orderBy,
        skip: (page - 1) * pageSize,
        take: pageSize,
        select: {
          id: true,
          fullName: true,
          email: true,
          avatarUrl: true,
          accountStatus: true,
          createdAt: true,
          lastActiveAt: true,
          instructorProfile: {
            select: { displayName: true, verificationStatus: true },
          },
        },
      }),
      this.prisma.user.count({ where }),
    ]);

    const ids = rows.map((r) => r.id);

    // Two bounded queries regardless of page size — never N+1 per row.
    // Enrollments are summed from the live relation, not the denormalized
    // Course.studentsCount counter (same precedent as course.service.ts),
    // and labeled "Enrollments" (not "Students") since a learner enrolled in
    // two courses by the same creator counts twice here — see §34.
    const [courseRows, earningsAgg] = ids.length
      ? await Promise.all([
          this.prisma.course.findMany({
            where: { instructorId: { in: ids } },
            select: {
              instructorId: true,
              published: true,
              _count: { select: { enrollments: true } },
            },
          }),
          this.prisma.earningsTransaction.groupBy({
            by: ['creatorId'],
            where: { creatorId: { in: ids } },
            _sum: { creatorAmountMinor: true },
          }),
        ])
      : [[], []];

    const perCreator = new Map<
      string,
      {
        coursesCount: number;
        publishedCoursesCount: number;
        enrollmentsCount: number;
      }
    >();
    for (const c of courseRows) {
      const cur = perCreator.get(c.instructorId) ?? {
        coursesCount: 0,
        publishedCoursesCount: 0,
        enrollmentsCount: 0,
      };
      cur.coursesCount += 1;
      if (c.published) cur.publishedCoursesCount += 1;
      cur.enrollmentsCount += c._count.enrollments;
      perCreator.set(c.instructorId, cur);
    }
    const earningsById = new Map(
      earningsAgg.map((r) => [r.creatorId, r._sum.creatorAmountMinor ?? 0]),
    );

    const items = rows.map((r) => {
      const agg = perCreator.get(r.id) ?? {
        coursesCount: 0,
        publishedCoursesCount: 0,
        enrollmentsCount: 0,
      };
      return {
        id: r.id,
        fullName: r.fullName,
        email: r.email,
        avatarUrl: r.avatarUrl,
        accountStatus: r.accountStatus,
        createdAt: r.createdAt,
        lastActiveAt: r.lastActiveAt,
        displayName: r.instructorProfile?.displayName ?? null,
        verificationStatus: r.instructorProfile?.verificationStatus ?? null,
        coursesCount: agg.coursesCount,
        publishedCoursesCount: agg.publishedCoursesCount,
        enrollmentsCount: agg.enrollmentsCount,
        earningsMinor: earningsById.get(r.id) ?? 0,
      };
    });

    return { items, total, page, pageSize };
  }

  async detail(id: string) {
    const account = await this.prisma.user.findFirst({
      where: { id, hasCreatorAccess: true },
      select: {
        id: true,
        fullName: true,
        email: true,
        avatarUrl: true,
        accountStatus: true,
        createdAt: true,
        lastLoginAt: true,
        lastActiveAt: true,
        emailVerifiedAt: true,
        isVerified: true,
        whatsappVerified: true,
        instructorProfile: true,
      },
    });
    if (!account) throw new NotFoundException('Creator not found');

    const [
      profile,
      courses,
      enrollmentRows,
      ledger,
      creatorSubmissions,
      userAdminHistory,
    ] = await Promise.all([
      this.prisma.profile.findUnique({ where: { userId: id } }),
      this.prisma.course.findMany({
        where: { instructorId: id },
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          title: true,
          thumbnailUrl: true,
          category: true,
          published: true,
          reviewStatus: true,
          rating: true,
          createdAt: true,
          updatedAt: true,
          _count: { select: { enrollments: true } },
        },
      }),
      this.prisma.enrollment.findMany({
        where: { course: { instructorId: id } },
        select: { userId: true },
      }),
      // The Earnings tab's data source of truth — reused as-is, not
      // re-derived (the same ledger the standalone earnings-admin API
      // would return, just with no UI on top of it yet — see §17/§28).
      this.earnings.getAdminCreatorLedger(id).catch(() => null),
      // "Creator activity" = actions the CREATOR took (submissions,
      // resubmissions after a reopen) — reviewerId is null on those rows,
      // distinct from admin decisions (reviewerId set) which belong in
      // Administrative History instead. See §19.
      this.prisma.courseReview.findMany({
        where: { course: { instructorId: id }, reviewerId: null },
        orderBy: { createdAt: 'desc' },
        take: HISTORY_LIMIT,
        select: {
          id: true,
          action: true,
          previousStatus: true,
          newStatus: true,
          createdAt: true,
          course: { select: { id: true, title: true } },
        },
      }),
      this.prisma.adminAuditLog.findMany({
        where: { entityType: 'User', entityId: id },
        orderBy: { createdAt: 'desc' },
        take: HISTORY_LIMIT,
      }),
    ]);

    const courseIds = courses.map((c) => c.id);
    const courseAdminHistory = courseIds.length
      ? await this.prisma.adminAuditLog.findMany({
          where: { entityType: 'Course', entityId: { in: courseIds } },
          orderBy: { createdAt: 'desc' },
          take: HISTORY_LIMIT,
        })
      : [];

    const adminHistory = [...userAdminHistory, ...courseAdminHistory]
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(0, HISTORY_LIMIT);

    const totalEnrollments = enrollmentRows.length;
    const uniqueStudents = new Set(enrollmentRows.map((e) => e.userId)).size;
    const publishedCoursesCount = courses.filter((c) => c.published).length;

    return {
      account,
      profile,
      onboarding: {
        completed: account.instructorProfile?.onboardingCompleted ?? false,
      },
      summary: {
        coursesCount: courses.length,
        publishedCoursesCount,
        totalEnrollments,
        uniqueStudents,
        earningsLifetimeMinor: ledger?.balances.lifetimeEarned ?? null,
      },
      courses: courses.map((c) => {
        const { _count, ...rest } = c;
        return { ...rest, enrollments: _count.enrollments };
      }),
      earnings: ledger,
      activity: creatorSubmissions,
      adminHistory,
    };
  }

  async verify(actorId: string, id: string, reason?: string) {
    const user = await this.prisma.user.findFirst({
      where: { id, hasCreatorAccess: true },
      select: {
        fullName: true,
        instructorProfile: { select: { verificationStatus: true } },
      },
    });
    if (!user) throw new NotFoundException('Creator not found');
    if (user.instructorProfile?.verificationStatus === 'VERIFIED') {
      throw new BadRequestException('This creator is already verified');
    }

    await this.prisma.$transaction([
      this.prisma.instructorProfile.upsert({
        where: { userId: id },
        update: { verificationStatus: 'VERIFIED' },
        create: {
          userId: id,
          displayName: user.fullName,
          verificationStatus: 'VERIFIED',
        },
      }),
      this.prisma.adminAuditLog.create({
        data: {
          actorId,
          action: 'ADMIN_VERIFIED_CREATOR',
          entityType: 'User',
          entityId: id,
          reason: reason?.trim() || null,
          meta: {
            previousStatus: user.instructorProfile?.verificationStatus ?? null,
          },
        },
      }),
    ]);

    return { verificationStatus: 'VERIFIED' as const };
  }

  async unverify(actorId: string, id: string, reason?: string) {
    const user = await this.prisma.user.findFirst({
      where: { id, hasCreatorAccess: true },
      select: {
        instructorProfile: { select: { verificationStatus: true } },
      },
    });
    if (!user) throw new NotFoundException('Creator not found');
    if (user.instructorProfile?.verificationStatus !== 'VERIFIED') {
      throw new BadRequestException('This creator is not currently verified');
    }

    await this.prisma.$transaction([
      this.prisma.instructorProfile.update({
        where: { userId: id },
        data: { verificationStatus: 'PENDING' },
      }),
      this.prisma.adminAuditLog.create({
        data: {
          actorId,
          action: 'ADMIN_UNVERIFIED_CREATOR',
          entityType: 'User',
          entityId: id,
          reason: reason?.trim() || null,
          meta: { previousStatus: 'VERIFIED' },
        },
      }),
    ]);

    return { verificationStatus: 'PENDING' as const };
  }
}
