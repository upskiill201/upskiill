import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { PrismaService } from '../../prisma/prisma.service';
import { emailConfig } from '../email.config';
import { EmailJobRepository } from './email-job.repository';
import { INACTIVE_EMAIL_DAYS } from '../templates/reengagement/inactive.template';
import { ACCESS_ENDING_DAYS } from '../templates/payment/access-ending.template';

const PAGE_SIZE = 500;

/**
 * The two lifecycle flows that aren't triggered by a single event —
 * streak-at-risk and the weekly digest — need a scan, since nothing "fires"
 * when a streak merely sits unrenewed. Both scans only ENQUEUE jobs; sending
 * happens on the normal email_jobs worker tick, batched and re-validated
 * there (spec §16 "separate eligibility from delivery").
 *
 * Cursor-paginated rather than loading the whole table (spec §5/§16): each
 * page is a bounded query, and a page's job-creation cost doesn't grow with
 * total user count.
 */
@Injectable()
export class EmailLifecycleBatchService {
  private readonly logger = new Logger(EmailLifecycleBatchService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly jobs: EmailJobRepository,
  ) {}

  /**
   * Runs once daily. Fixed UTC hour rather than per-user local time — the
   * per-user timezone-aware "at risk" signal already exists for push
   * (tey/decision/rules/streak-at-risk.rule.ts) but reusing it here would
   * couple this system to Tey's nudge pipeline; documented as a known
   * limitation rather than silently approximated as exact.
   */
  @Cron('0 0 17 * * *', { name: 'email-streak-at-risk-scan' })
  async scheduledStreakScan(): Promise<void> {
    if (!emailConfig.schedulerEnabled || !emailConfig.streakReminderEnabled)
      return;
    try {
      const count = await this.scanStreaksAtRisk();
      this.logger.log(`streak-at-risk scan: queued=${count}`);
    } catch (err) {
      this.logger.error('Streak-at-risk scan failed', err as Error);
    }
  }

  async scanStreaksAtRisk(): Promise<number> {
    const todayStr = new Date().toISOString().slice(0, 10);
    const startOfToday = new Date(`${todayStr}T00:00:00.000Z`);

    let cursor: string | undefined;
    let queued = 0;

    for (;;) {
      const page = await this.prisma.studentProfile.findMany({
        where: {
          streakDays: { gt: 0 },
          // Reconciled snapshot: last-earned before today means today's
          // activity hasn't landed yet as of this scan.
          lastStreakEarnedAt: { lt: startOfToday },
        },
        select: { userId: true, streakDays: true },
        orderBy: { userId: 'asc' },
        take: PAGE_SIZE,
        ...(cursor ? { cursor: { userId: cursor }, skip: 1 } : {}),
      });
      if (page.length === 0) break;

      for (const row of page) {
        await this.jobs.enqueue({
          userId: row.userId,
          eventType: 'STREAK_AT_RISK',
          templateKey: 'learning.streak-at-risk',
          dueAt: new Date(),
          dedupeKey: `learning.streak-at-risk:${row.userId}:${todayStr}`,
          payload: { streakDays: row.streakDays },
        });
        queued++;
      }

      cursor = page[page.length - 1].userId;
      if (page.length < PAGE_SIZE) break;
    }
    return queued;
  }

  /**
   * The win-back email ladder: one scan a day picks out learners whose last
   * lesson was exactly 3, 7, 14 or 30 days ago. Exact-day windows mean each
   * rung is queued once, and nothing is ever queued past day 30.
   *
   * Only lapses that began around or after the activation date qualify, so
   * turning this on never mails someone "I'll stop sending these" as their
   * first email from us.
   */
  @Cron('0 0 11 * * *', { name: 'email-reengagement-scan' })
  async scheduledReengagementScan(): Promise<void> {
    if (!emailConfig.schedulerEnabled || !emailConfig.reengagementEnabled) return;
    try {
      const count = await this.scanReengagement();
      this.logger.log(`reengagement scan: queued=${count}`);
    } catch (err) {
      this.logger.error('Reengagement scan failed', err as Error);
    }
  }

  async scanReengagement(now = new Date()): Promise<number> {
    const today = Date.parse(`${utcDay(now)}T00:00:00Z`);
    const activation = emailConfig.lifecycleActivationDate.getTime();
    let queued = 0;

    for (const daysAway of INACTIVE_EMAIL_DAYS) {
      const dayStart = new Date(today - daysAway * DAY_MS);
      if (dayStart.getTime() < activation - 3 * DAY_MS) continue;
      const dayEnd = new Date(dayStart.getTime() + DAY_MS);

      let cursor: string | undefined;
      for (;;) {
        const page = await this.prisma.studentProfile.findMany({
          where: { lastLessonCompletedAt: { gte: dayStart, lt: dayEnd } },
          select: { userId: true },
          orderBy: { userId: 'asc' },
          take: PAGE_SIZE,
          ...(cursor ? { cursor: { userId: cursor }, skip: 1 } : {}),
        });
        if (page.length === 0) break;
        const lastActiveDay = utcDay(dayStart);
        for (const { userId } of page) {
          await this.jobs.enqueue({
            userId,
            eventType: 'REENGAGEMENT_DUE',
            templateKey: 'reengagement.inactive',
            dueAt: new Date(),
            dedupeKey: `reengagement.inactive:${userId}:${lastActiveDay}:${daysAway}`,
            payload: { daysAway, lastActiveDay },
          });
          queued++;
        }
        cursor = page[page.length - 1].userId;
        if (page.length < PAGE_SIZE) break;
      }
    }
    return queued;
  }

  /**
   * The creator's Monday digest: last week's real numbers for every creator
   * with a published course. Creators with a completely empty week and
   * nothing waiting on them are skipped — an all-zeros email is noise.
   */
  @Cron('0 0 9 * * 1', { name: 'email-creator-digest-scan' })
  async scheduledCreatorDigestScan(): Promise<void> {
    if (!emailConfig.schedulerEnabled || !emailConfig.creatorDigestEnabled) return;
    try {
      const count = await this.scanCreatorDigest();
      this.logger.log(`creator digest scan: queued=${count}`);
    } catch (err) {
      this.logger.error('Creator digest scan failed', err as Error);
    }
  }

  async scanCreatorDigest(now = new Date()): Promise<number> {
    const thisWeek = mondayOf(now);
    const weekStart = new Date(thisWeek.getTime() - 7 * DAY_MS);
    const weekStartStr = utcDay(weekStart);
    const range = { gte: weekStart, lt: thisWeek };
    const label = `${weekStart.toLocaleDateString('en-US', { month: 'short', day: 'numeric', timeZone: 'UTC' })} – ${new Date(thisWeek.getTime() - DAY_MS).toLocaleDateString('en-US', { month: 'short', day: 'numeric', timeZone: 'UTC' })}`;

    const creators = await this.prisma.course.groupBy({
      by: ['instructorId'],
      where: { published: true },
    });

    let queued = 0;
    for (const { instructorId } of creators) {
      const courses = await this.prisma.course.findMany({
        where: { instructorId, published: true },
        select: { id: true, title: true },
      });
      const courseIds = courses.map((c) => c.id);

      const [sales, enrollments, lessons, finishes, unanswered] = await Promise.all([
        this.prisma.earningsTransaction.aggregate({
          where: { creatorId: instructorId, type: 'SALE', occurredAt: range },
          _count: true,
          _sum: { creatorAmountMinor: true },
        }),
        this.prisma.enrollment.groupBy({
          by: ['courseId'],
          where: { courseId: { in: courseIds }, createdAt: range, userId: { not: instructorId } },
          _count: true,
        }),
        this.prisma.courseWeeklyXp.aggregate({
          where: { courseId: { in: courseIds }, weekStartDate: weekStartStr },
          _sum: { lessonsCompleted: true },
        }),
        this.prisma.notification.count({
          where: { userId: instructorId, type: 'STUDIO_COURSE_FINISHED', createdAt: range },
        }),
        this.prisma.post.count({
          where: {
            courseId: { in: courseIds },
            postType: 'QUESTION',
            status: 'ACTIVE',
            userId: { not: instructorId },
            createdAt: { gte: new Date(now.getTime() - 30 * DAY_MS) },
            comments: { none: { userId: instructorId } },
          },
        }),
      ]);

      const newLearners = enrollments.reduce((n, e) => n + e._count, 0);
      const top = [...enrollments].sort((a, b) => b._count - a._count)[0];
      const payload = {
        weekStart: weekStartStr,
        weekLabel: label,
        sales: sales._count,
        revenueUsd: Math.max(0, (sales._sum.creatorAmountMinor ?? 0) / 100),
        newLearners,
        lessonsCompleted: lessons._sum.lessonsCompleted ?? 0,
        courseFinishes: finishes,
        unansweredQuestions: unanswered,
        topCourse: top
          ? { title: courses.find((c) => c.id === top.courseId)?.title ?? '', newLearners: top._count }
          : undefined,
      };
      const empty =
        payload.sales === 0 &&
        payload.newLearners === 0 &&
        payload.lessonsCompleted === 0 &&
        payload.unansweredQuestions === 0;
      if (empty) continue;

      await this.jobs.enqueue({
        userId: instructorId,
        eventType: 'CREATOR_WEEKLY_DIGEST',
        templateKey: 'creator.weekly-digest',
        dueAt: new Date(),
        dedupeKey: `creator.weekly-digest:${instructorId}:${weekStartStr}`,
        payload,
      });
      queued++;
    }
    return queued;
  }

  /**
   * Access-ending reminders for plans that won't renew by themselves:
   * Mobile Money (no stripeSubscriptionId — one approval per period) and card
   * plans the learner cancelled (cancelAtPeriodEnd). Queued 3 days and 1 day
   * before access ends, and once the day after. Exact-day windows mean each
   * reminder is queued once per period; renewing moves expiresAt, so the
   * processor's re-check drops anything stale.
   */
  @Cron('0 0 10 * * *', { name: 'email-access-ending-scan' })
  async scheduledAccessEndingScan(): Promise<void> {
    if (!emailConfig.schedulerEnabled || !emailConfig.accessEndingEnabled) return;
    try {
      const count = await this.scanAccessEnding();
      this.logger.log(`access-ending scan: queued=${count}`);
    } catch (err) {
      this.logger.error('Access-ending scan failed', err as Error);
    }
  }

  async scanAccessEnding(now = new Date()): Promise<number> {
    const today = Date.parse(`${utcDay(now)}T00:00:00Z`);
    let queued = 0;

    for (const daysLeft of ACCESS_ENDING_DAYS) {
      const dayStart = new Date(today + daysLeft * DAY_MS);
      const dayEnd = new Date(dayStart.getTime() + DAY_MS);

      let cursor: string | undefined;
      for (;;) {
        const page = await this.prisma.courseAccessEntitlement.findMany({
          where: {
            expiresAt: { gte: dayStart, lt: dayEnd },
            // Before the end date the entitlement is still ACTIVE; the day
            // after, it may already have been swept to EXPIRED.
            status: daysLeft > 0 ? 'ACTIVE' : { in: ['ACTIVE', 'EXPIRED'] },
            OR: [{ stripeSubscriptionId: null }, { cancelAtPeriodEnd: true }],
          },
          select: { id: true, userId: true, courseId: true, expiresAt: true },
          orderBy: { id: 'asc' },
          take: PAGE_SIZE,
          ...(cursor ? { cursor: { id: cursor }, skip: 1 } : {}),
        });
        if (page.length === 0) break;

        for (const e of page) {
          const endDay = utcDay(e.expiresAt);
          await this.jobs.enqueue({
            userId: e.userId,
            eventType: 'ACCESS_ENDING',
            templateKey: 'payment.access-ending',
            dueAt: new Date(),
            dedupeKey: `payment.access-ending:${e.userId}:${e.courseId}:${endDay}:${daysLeft}`,
            payload: { courseId: e.courseId, endDay, daysLeft },
          });
          queued++;
        }

        cursor = page[page.length - 1].id;
        if (page.length < PAGE_SIZE) break;
      }
    }
    return queued;
  }

  /** Runs weekly, Monday 08:00 UTC. */
  @Cron('0 0 8 * * 1', { name: 'email-weekly-digest-scan' })
  async scheduledDigestScan(): Promise<void> {
    if (!emailConfig.schedulerEnabled || !emailConfig.weeklyDigestEnabled)
      return;
    try {
      const count = await this.scanWeeklyDigest();
      this.logger.log(`weekly-digest scan: queued=${count}`);
    } catch (err) {
      this.logger.error('Weekly digest scan failed', err as Error);
    }
  }

  async scanWeeklyDigest(): Promise<number> {
    const now = new Date();
    const weekStart = mondayOf(now);
    const weekStartStr = weekStart.toISOString().slice(0, 10);

    let cursor: string | undefined;
    let queued = 0;

    for (;;) {
      const page = await this.prisma.studentProfile.findMany({
        select: { userId: true },
        orderBy: { userId: 'asc' },
        take: PAGE_SIZE,
        ...(cursor ? { cursor: { userId: cursor }, skip: 1 } : {}),
      });
      if (page.length === 0) break;

      const userIds = page.map((r) => r.userId);

      // Batched aggregate read, not N+1 — one query for the whole page
      // rather than one per user (spec §5). CourseWeeklyXp already carries
      // both metrics per course per week; sum across the user's courses.
      const weeklyRows = await this.prisma.courseWeeklyXp.groupBy({
        by: ['userId'],
        where: { userId: { in: userIds }, weekStartDate: weekStartStr },
        _sum: { xpEarned: true, lessonsCompleted: true },
      });

      const xpByUser = new Map(
        weeklyRows.map((r) => [r.userId, r._sum.xpEarned ?? 0]),
      );
      const lessonsByUser = new Map(
        weeklyRows.map((r) => [r.userId, r._sum.lessonsCompleted ?? 0]),
      );

      for (const userId of userIds) {
        const xpEarned = xpByUser.get(userId) ?? 0;
        const lessonsCompleted = lessonsByUser.get(userId) ?? 0;
        // Nothing to report — don't send an empty digest (spec §7 "usefulness over volume").
        if (xpEarned === 0 && lessonsCompleted === 0) continue;

        await this.jobs.enqueue({
          userId,
          eventType: 'WEEKLY_DIGEST_DUE',
          templateKey: 'learning.weekly-summary',
          dueAt: new Date(),
          dedupeKey: `learning.weekly-summary:${userId}:${weekStartStr}`,
          payload: { weekStart: weekStartStr, xpEarned, lessonsCompleted },
        });
        queued++;
      }

      cursor = page[page.length - 1].userId;
      if (page.length < PAGE_SIZE) break;
    }
    return queued;
  }
}

const DAY_MS = 86_400_000;
const utcDay = (d: Date) => d.toISOString().slice(0, 10);

function mondayOf(date: Date): Date {
  const d = new Date(
    Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()),
  );
  const day = d.getUTCDay();
  const diff = (day === 0 ? -6 : 1) - day; // Sunday(0) -> back 6 days, else back to Monday
  d.setUTCDate(d.getUTCDate() + diff);
  return d;
}
