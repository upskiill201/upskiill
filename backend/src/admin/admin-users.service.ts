import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AccountStatus, Prisma, Role } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

const MAX_PAGE_SIZE = 100;
const DEFAULT_PAGE_SIZE = 25;
const HISTORY_LIMIT = 20;

export interface ListUsersQuery {
  page?: string;
  pageSize?: string;
  search?: string;
  role?: string;
  accountStatus?: string;
  sortBy?: string;
  sortDir?: string;
}

const SORTABLE_FIELDS = new Set([
  'createdAt',
  'lastActiveAt',
  'lastLoginAt',
  'fullName',
]);

/**
 * Backend for /admin/users — list, detail, and the one write action this
 * phase ships (suspend/unsuspend). Deliberately does NOT touch XP/coins/
 * hearts: those live across three not-quite-synced sources of truth
 * (StudentProfile, UserStats, GemTransaction) and the only existing helper
 * that writes them (gamification.service#grantTestReward) is a test-only
 * shortcut that skips the transaction ledger — not safe to build a real
 * admin action on top of without a closer look at that reconciliation.
 * Suspend/unsuspend is safe because AccountStatus is a single field with one
 * source of truth.
 */
@Injectable()
export class AdminUsersService {
  constructor(private readonly prisma: PrismaService) {}

  async list(query: ListUsersQuery) {
    const page = Math.max(1, parseInt(query.page ?? '1', 10) || 1);
    const pageSize = Math.min(
      MAX_PAGE_SIZE,
      Math.max(
        1,
        parseInt(query.pageSize ?? String(DEFAULT_PAGE_SIZE), 10) ||
          DEFAULT_PAGE_SIZE,
      ),
    );

    const where: Prisma.UserWhereInput = {};

    if (query.search?.trim()) {
      const term = query.search.trim();
      where.OR = [
        { fullName: { contains: term, mode: 'insensitive' } },
        { email: { contains: term, mode: 'insensitive' } },
      ];
    }

    if (query.role) {
      if (!(query.role in Role)) {
        throw new BadRequestException(`Unknown role: ${query.role}`);
      }
      where.role = query.role as Role;
    }

    if (query.accountStatus) {
      if (!(query.accountStatus in AccountStatus)) {
        throw new BadRequestException(
          `Unknown account status: ${query.accountStatus}`,
        );
      }
      where.accountStatus = query.accountStatus as AccountStatus;
    }

    const sortBy = SORTABLE_FIELDS.has(query.sortBy ?? '')
      ? query.sortBy!
      : 'createdAt';
    const sortDir = query.sortDir === 'asc' ? 'asc' : 'desc';

    const [items, total] = await Promise.all([
      this.prisma.user.findMany({
        where,
        select: {
          id: true,
          fullName: true,
          email: true,
          role: true,
          accountStatus: true,
          avatarUrl: true,
          createdAt: true,
          lastActiveAt: true,
          lastLoginAt: true,
          hasStudentAccess: true,
          hasCreatorAccess: true,
        },
        orderBy: { [sortBy]: sortDir },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      this.prisma.user.count({ where }),
    ]);

    return { items, total, page, pageSize };
  }

  async detail(id: string) {
    const account = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        fullName: true,
        email: true,
        role: true,
        accountStatus: true,
        avatarUrl: true,
        createdAt: true,
        emailVerifiedAt: true,
        isVerified: true,
        lastLoginAt: true,
        lastActiveAt: true,
        loginCount: true,
        failedLoginAttempts: true,
        accountLockedUntil: true,
        whatsappVerified: true,
        hasStudentAccess: true,
        hasCreatorAccess: true,
      },
    });
    if (!account) throw new NotFoundException('User not found');

    const [studentProfile, activity, economy, adminHistory] = await Promise.all(
      [
        this.prisma.studentProfile.findUnique({
          where: { userId: id },
          select: {
            xp: true,
            coins: true,
            gems: true,
            streakDays: true,
            longestStreak: true,
            lives: true,
            maxLives: true,
            leagueTier: true,
            dailyGoalXp: true,
          },
        }),
        this.prisma.learningEvent.findMany({
          where: { userId: id },
          orderBy: { createdAt: 'desc' },
          take: HISTORY_LIMIT,
          select: {
            eventType: true,
            entityType: true,
            entityId: true,
            createdAt: true,
          },
        }),
        this.prisma.gemTransaction.findMany({
          where: { userId: id },
          orderBy: { createdAt: 'desc' },
          take: HISTORY_LIMIT,
          select: { type: true, amount: true, source: true, createdAt: true },
        }),
        this.prisma.adminAuditLog.findMany({
          where: { entityType: 'User', entityId: id },
          orderBy: { createdAt: 'desc' },
          take: HISTORY_LIMIT,
        }),
      ],
    );

    return {
      account,
      learning: studentProfile,
      activity,
      economy,
      adminHistory,
      journey: await this.journey(id),
    };
  }

  /**
   * Everything needed to answer "why hasn't this person started?" in one
   * place: what they told onboarding, whether we can reach them at all, every
   * course and lesson they touched (opened, quit where, finished), and every
   * nudge and email: sent, blocked (and why), or still scheduled.
   */
  private async journey(id: string) {
    const [onboarding, pushDevices, prefs, emailPrefs, enrollments, nudges, emails, upcomingEmails, upcomingNudges] =
      await Promise.all([
        this.prisma.onboardingSession.findUnique({
          where: { userId: id },
          select: { onboardingComplete: true, completedAt: true, currentStep: true, answers: true },
        }),
        this.prisma.pushSubscription.findMany({
          where: { userId: id },
          select: {
            platform: true, isActive: true, createdAt: true,
            lastUsedAt: true, failureCount: true, userAgent: true,
          },
          orderBy: { createdAt: 'desc' },
        }),
        this.prisma.teyNotificationPrefs.findUnique({
          where: { userId: id },
          select: { pushEnabled: true, dailyReminders: true, preferredHour: true },
        }),
        this.prisma.emailPreference.findUnique({ where: { userId: id } }),
        this.prisma.enrollment.findMany({
          where: { userId: id },
          orderBy: { createdAt: 'desc' },
          select: {
            createdAt: true,
            progress: true,
            completedLessons: true,
            course: { select: { id: true, title: true } },
          },
        }),
        this.prisma.teyDelivery.findMany({
          where: { userId: id },
          orderBy: { sentAt: 'desc' },
          take: 30,
          select: {
            ruleId: true, channel: true, status: true, skipReason: true,
            title: true, body: true, sentAt: true, openedAt: true,
            action: { select: { skipReason: true } },
          },
        }),
        this.prisma.emailLog.findMany({
          where: { userId: id },
          orderBy: { createdAt: 'desc' },
          take: 30,
          select: { templateKey: true, status: true, skipReason: true, createdAt: true, sentAt: true, openedAt: true, clickedAt: true },
        }),
        this.prisma.emailJob.findMany({
          where: { userId: id, status: 'PENDING' },
          orderBy: { dueAt: 'asc' },
          take: 15,
          select: { templateKey: true, dueAt: true },
        }),
        this.prisma.teyScheduledAction.findMany({
          where: { userId: id, status: 'PENDING' },
          orderBy: { dueAt: 'asc' },
          take: 15,
          select: { ruleId: true, dueAt: true },
        }),
      ]);

    const reachUser = await this.prisma.user.findUnique({
      where: { id },
      select: { pwaInstalledAt: true, pwaLastSeenAt: true, notificationPermission: true, reachAskRequestedAt: true, reachAskShownAt: true },
    });
    const courseIds = enrollments.map((e) => e.course.id);
    const [lessons, progress] = await Promise.all([
      this.prisma.lesson.findMany({
        where: { status: 'published', section: { courseId: { in: courseIds } } },
        orderBy: [{ section: { orderIndex: 'asc' } }, { orderIndex: 'asc' }],
        select: { id: true, title: true, section: { select: { courseId: true } } },
      }),
      this.prisma.userLessonProgress.findMany({
        where: { userId: id, lesson: { section: { courseId: { in: courseIds } } } },
        select: {
          lessonId: true, openCount: true, quitCount: true, lastStepId: true,
          progressPercentage: true, startedAt: true, completedAt: true,
        },
      }),
    ]);
    const byLesson = new Map(progress.map((p) => [p.lessonId, p]));

    const courses = enrollments.map((e) => {
      const list = lessons.filter((l) => l.section.courseId === e.course.id);
      const done = Array.isArray(e.completedLessons) ? e.completedLessons.length : 0;
      const touched = list
        .map((l, i) => ({ number: i + 1, title: l.title, ...byLesson.get(l.id) }))
        .filter((l) => l.openCount !== undefined);
      const first = list[0] ? byLesson.get(list[0].id) : undefined;
      return {
        id: e.course.id,
        title: e.course.title,
        enrolledAt: e.createdAt,
        progress: Math.round(e.progress ?? 0),
        lessonsDone: done,
        totalLessons: list.length,
        firstLesson: list[0]?.title ?? null,
        stage: done > 0 ? 'LEARNING' : first?.openCount ? 'OPENED_NOT_FINISHED' : 'NOT_STARTED',
        lessons: touched,
      };
    });

    const answers = (onboarding?.answers ?? {}) as Record<string, unknown>;
    const optOuts = emailPrefs
      ? Object.entries(emailPrefs)
          .filter(([k, v]) => k.endsWith('OptOut') && v === true)
          .map(([k]) => k.replace(/OptOut$/, ''))
      : [];

    return {
      onboarding: {
        complete: onboarding?.onboardingComplete ?? false,
        completedAt: onboarding?.completedAt ?? null,
        reachedStep: onboarding?.currentStep ?? null,
        skipped: !onboarding,
        track: answers.category ?? null,
        goals: answers.goals ?? null,
        experience: answers.experienceLevel ?? null,
        dailyMinutes: answers.dailyCommitment ?? null,
        preferredTime: answers.preferredTime ?? null,
        barriers: answers.barriers ?? null,
        notifications: answers.notifications ?? null,
      },
      reach: {
        pushDevices: pushDevices.filter((d) => d.isActive).length,
        devices: pushDevices.map(({ userAgent, ...d }) => ({ ...d, device: describeDevice(userAgent) })),
        installed: !!reachUser?.pwaInstalledAt || pushDevices.some((d) => d.isActive && d.platform === 'ios-standalone'),
        installedAt: reachUser?.pwaInstalledAt ?? null,
        appLastOpenedAt: reachUser?.pwaLastSeenAt ?? null,
        permission: reachUser?.notificationPermission ?? null,
        askRequestedAt: reachUser?.reachAskRequestedAt ?? null,
        askShownAt: reachUser?.reachAskShownAt ?? null,
        pushEnabled: prefs?.pushEnabled ?? true,
        dailyReminders: prefs?.dailyReminders ?? true,
        preferredHour: prefs?.preferredHour ?? null,
        emailOptOuts: optOuts,
      },
      courses,
      nudges: nudges.map(({ action, ...n }) => ({ ...n, skipReason: n.skipReason ?? action?.skipReason ?? null })),
      emails,
      upcoming: [
        ...upcomingEmails.map((j) => ({ kind: 'EMAIL', key: j.templateKey, dueAt: j.dueAt })),
        ...upcomingNudges.map((a) => ({ kind: 'PUSH', key: a.ruleId, dueAt: a.dueAt })),
      ].sort((x, y) => x.dueAt.getTime() - y.dueAt.getTime()),
    };
  }

  async suspend(actorId: string, id: string, reason: string) {
    if (!reason?.trim()) {
      throw new BadRequestException(
        'A written reason is required to suspend an account',
      );
    }
    if (id === actorId) {
      throw new BadRequestException('You cannot suspend your own account');
    }

    const user = await this.prisma.user.findUnique({
      where: { id },
      select: { accountStatus: true },
    });
    if (!user) throw new NotFoundException('User not found');
    if (user.accountStatus === 'SUSPENDED') {
      throw new BadRequestException('This account is already suspended');
    }

    await this.prisma.$transaction([
      this.prisma.user.update({
        where: { id },
        data: { accountStatus: 'SUSPENDED' },
      }),
      this.prisma.adminAuditLog.create({
        data: {
          actorId,
          action: 'ADMIN_SUSPENDED_USER',
          entityType: 'User',
          entityId: id,
          reason: reason.trim(),
          meta: { previousStatus: user.accountStatus },
        },
      }),
    ]);

    return { accountStatus: 'SUSPENDED' as const };
  }

  async unsuspend(actorId: string, id: string, reason?: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: { accountStatus: true },
    });
    if (!user) throw new NotFoundException('User not found');
    if (user.accountStatus !== 'SUSPENDED') {
      throw new BadRequestException('This account is not suspended');
    }

    await this.prisma.$transaction([
      this.prisma.user.update({
        where: { id },
        data: { accountStatus: 'ACTIVE' },
      }),
      this.prisma.adminAuditLog.create({
        data: {
          actorId,
          action: 'ADMIN_UNSUSPENDED_USER',
          entityType: 'User',
          entityId: id,
          reason: reason?.trim() || null,
          meta: { previousStatus: user.accountStatus },
        },
      }),
    ]);

    return { accountStatus: 'ACTIVE' as const };
  }

  /**
   * Clears the automatic 5-failed-attempts lockout early (auth.service.ts —
   * a wrong password 5 times sets accountStatus=LOCKED + accountLockedUntil
   * for 15 minutes, and clears itself on the learner's next successful
   * login). This is a distinct state from SUSPENDED: it's not an admin
   * punishment, it's a self-service security timeout that normally resolves
   * on its own — this action exists only for the rare case someone needs
   * back in before the 15 minutes are up.
   */
  async unlock(actorId: string, id: string, reason?: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: { accountStatus: true },
    });
    if (!user) throw new NotFoundException('User not found');
    if (user.accountStatus !== 'LOCKED') {
      throw new BadRequestException('This account is not locked');
    }

    await this.prisma.$transaction([
      this.prisma.user.update({
        where: { id },
        data: {
          accountStatus: 'ACTIVE',
          accountLockedUntil: null,
          failedLoginAttempts: 0,
        },
      }),
      this.prisma.adminAuditLog.create({
        data: {
          actorId,
          action: 'ADMIN_UNLOCKED_USER',
          entityType: 'User',
          entityId: id,
          reason: reason?.trim() || null,
          meta: { previousStatus: user.accountStatus },
        },
      }),
    ]);

    return { accountStatus: 'ACTIVE' as const };
  }
}

/** "Chrome on Android", "Safari on iPhone"… from a stored user agent. */
function describeDevice(ua: string | null): string {
  if (!ua) return 'Unknown device';
  const os = /iPhone/.test(ua) ? 'iPhone' : /iPad/.test(ua) ? 'iPad' : /Android/.test(ua) ? 'Android' : /Windows/.test(ua) ? 'Windows' : /Mac OS X/.test(ua) ? 'Mac' : /Linux/.test(ua) ? 'Linux' : 'Unknown OS';
  const browser = /Claude\//.test(ua)
    ? 'Claude desktop app'
    : /Edg\//.test(ua)
      ? 'Edge'
      : /SamsungBrowser/.test(ua)
        ? 'Samsung Internet'
        : /Firefox\//.test(ua)
          ? 'Firefox'
          : /CriOS|Chrome\//.test(ua)
            ? 'Chrome'
            : /Safari\//.test(ua)
              ? 'Safari'
              : 'Browser';
  return `${browser} on ${os}`;
}
