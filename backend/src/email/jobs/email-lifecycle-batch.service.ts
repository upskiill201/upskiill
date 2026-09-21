import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { PrismaService } from '../../prisma/prisma.service';
import { emailConfig } from '../email.config';
import { EmailJobRepository } from './email-job.repository';

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

function mondayOf(date: Date): Date {
  const d = new Date(
    Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()),
  );
  const day = d.getUTCDay();
  const diff = (day === 0 ? -6 : 1) - day; // Sunday(0) -> back 6 days, else back to Monday
  d.setUTCDate(d.getUTCDate() + diff);
  return d;
}
