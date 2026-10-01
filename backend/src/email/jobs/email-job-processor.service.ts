import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { emailConfig } from '../email.config';
import { EmailDispatchService } from '../email-dispatch.service';
import { EmailUnsubscribeService } from '../email-unsubscribe.service';
import {
  renderCheckoutAbandonedEmail,
  CheckoutAbandonedStage,
} from '../templates/conversion/checkout-abandoned.template';
import { renderAchievementUnlockedEmail } from '../templates/learning/achievement-unlocked.template';
import {
  renderLeagueResultsEmail,
  LeagueOutcome,
} from '../templates/learning/league-results.template';
import { renderStreakAtRiskEmail } from '../templates/learning/streak-at-risk.template';
import { renderWeeklySummaryEmail } from '../templates/learning/weekly-summary.template';
import { renderNewStudentEmail } from '../templates/creator/new-student.template';
import {
  renderPayoutEmail,
  PayoutStatus,
} from '../templates/creator/payout.template';
import { renderPaymentFailedEmail } from '../templates/payment/payment-failed.template';
import { renderPurchaseConfirmationEmail } from '../templates/payment/purchase-confirmation.template';
import { EmailCategory } from '../types';
import { EmailJobRow } from './email-job.repository';
import { courseUnlockState, SOCIAL_PROOF_MIN_LEARNERS } from '../../common/course-unlock.util';
import { renderCourseUnlockEmail } from '../templates/conversion/course-unlock.template';
import {
  INACTIVE_EMAIL_DAYS,
  renderInactiveEmail,
  type InactiveEmailDay,
} from '../templates/reengagement/inactive.template';
import {
  renderCreatorWeeklyDigestEmail,
  type CreatorWeeklyDigestData,
} from '../templates/creator/weekly-digest.template';
import {
  ACCESS_ENDING_DAYS,
  renderAccessEndingEmail,
  type AccessEndingDay,
} from '../templates/payment/access-ending.template';

export interface ProcessOutcome {
  sent: boolean;
  skipReason?: string;
}

/**
 * Turns a claimed EmailJobRow into an actual send. Every branch re-fetches
 * authoritative state before sending (spec §18) rather than trusting the
 * payload frozen at enqueue time — the payload is only ever used for IDs and
 * cosmetic hints, never for anything that decides eligibility.
 */
@Injectable()
export class EmailJobProcessorService {
  private readonly logger = new Logger(EmailJobProcessorService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly dispatch: EmailDispatchService,
    private readonly unsubscribe: EmailUnsubscribeService,
  ) {}

  async process(job: EmailJobRow): Promise<ProcessOutcome> {
    switch (job.eventType) {
      case 'CHECKOUT_ABANDONED_STAGE':
        return this.processCheckoutAbandoned(job);
      case 'STREAK_AT_RISK':
        return this.processStreakAtRisk(job);
      case 'WEEKLY_DIGEST_DUE':
        return this.processWeeklyDigest(job);
      case 'ACHIEVEMENT_UNLOCKED':
        return this.processAchievementUnlocked(job);
      case 'LEAGUE_SETTLED':
        return this.processLeagueResults(job);
      case 'PAYMENT_COMPLETED':
        return this.processPurchaseConfirmation(job);
      case 'PAYMENT_FAILED':
        return this.processPaymentFailed(job);
      case 'CREATOR_NEW_STUDENT':
        return this.processCreatorNewStudent(job);
      case 'PAYOUT_INITIATED':
      case 'PAYOUT_COMPLETED':
      case 'PAYOUT_FAILED':
        return this.processPayout(job);
      case 'COURSE_UNLOCK_STAGE':
        return this.processCourseUnlock(job);
      case 'REENGAGEMENT_DUE':
        return this.processReengagement(job);
      case 'CREATOR_WEEKLY_DIGEST':
        return this.processCreatorDigest(job);
      case 'ACCESS_ENDING':
        return this.processAccessEnding(job);
      default:
        this.logger.warn(`No handler for email job eventType=${job.eventType}`);
        return { sent: false, skipReason: 'NO_HANDLER' };
    }
  }

  // ── Conversion: abandoned checkout sequence ───────────────────────────────
  private async processCheckoutAbandoned(
    job: EmailJobRow,
  ): Promise<ProcessOutcome> {
    const payload = job.payload as {
      checkoutIntentId: string;
      stage: CheckoutAbandonedStage;
    } | null;
    if (!payload?.checkoutIntentId)
      return { sent: false, skipReason: 'BAD_PAYLOAD' };

    if (!emailConfig.abandonedCheckoutEnabled)
      return { sent: false, skipReason: 'FEATURE_DISABLED' };

    const intent = await this.prisma.checkoutIntent.findUnique({
      where: { id: payload.checkoutIntentId },
      include: { user: { select: { id: true, email: true, fullName: true } } },
    });
    if (!intent) return { sent: false, skipReason: 'INTENT_NOT_FOUND' };

    // Re-check state: the whole safety story for spec §13 lives here.
    if (intent.status !== 'STARTED') {
      return { sent: false, skipReason: `INTENT_STATUS_${intent.status}` };
    }
    if (intent.recoveryStoppedAt) {
      return {
        sent: false,
        skipReason: intent.recoveryStoppedReason || 'RECOVERY_STOPPED',
      };
    }
    // A later stage already went out for this intent (e.g. stages queued
    // out of order after a restart) — don't send an earlier one now.
    if (intent.recoveryStage >= payload.stage) {
      return { sent: false, skipReason: 'STAGE_ALREADY_SENT' };
    }

    const course = await this.prisma.course.findUnique({
      where: { id: intent.courseId },
      select: {
        title: true,
        shortDescription: true,
        slug: true,
        instructor: { select: { fullName: true } },
      },
    });
    if (!course) return { sent: false, skipReason: 'COURSE_NOT_FOUND' };

    const templateKey = `conversion.checkout-abandoned-${payload.stage}`;
    const courseUrl = `${emailConfig.appUrl}/courses/${course.slug}`;
    const checkoutUrl = `${courseUrl}?checkout=1&campaign=${intent.campaignId}&checkoutId=${intent.id}`;

    const outcome = await this.dispatch.dispatch({
      userId: intent.userId,
      email: intent.user.email,
      templateKey,
      category: EmailCategory.CONVERSION,
      idempotencyKey: `${templateKey}:${intent.id}`,
      metadata: {
        checkoutIntentId: intent.id,
        courseId: intent.courseId,
        campaignId: intent.campaignId,
      },
      preferenceOptions: undefined,
      render: () =>
        renderCheckoutAbandonedEmail({
          firstName: intent.user.fullName?.split(' ')[0] || '',
          stage: payload.stage,
          courseName: course.title,
          creatorName: course.instructor?.fullName || 'the creator',
          shortDescription: course.shortDescription || undefined,
          checkoutUrl,
          courseUrl,
          unsubscribeUrl: this.unsubscribe.buildUnsubscribeUrl(
            intent.userId,
            'MARKETING',
          ),
          preferencesUrl: this.unsubscribe.buildPreferencesUrl(intent.userId),
        }),
    });

    if (outcome.sent) {
      await this.prisma.checkoutIntent.update({
        where: { id: intent.id },
        data: {
          recoveryStage: payload.stage,
          lastRecoveryEmailAt: new Date(),
          ...(payload.stage >= 4
            ? {
                recoveryStoppedAt: new Date(),
                recoveryStoppedReason: 'SEQUENCE_EXHAUSTED',
              }
            : {}),
        },
      });
      return { sent: true };
    }
    return { sent: false, skipReason: outcome.reason };
  }

  /**
   * True when Tey's push is live for this person and category — delivery
   * switched on, a device subscribed, and their push settings allow it. The
   * email fallbacks step aside for them, so nobody gets the same nudge twice.
   */
  private async pushReaches(
    userId: string,
    category: 'streakReminders' | 'reengagement',
  ): Promise<boolean> {
    if (process.env.TEY_DELIVERY_ENABLED !== 'true') return false;
    if (process.env.TEY_PUSH_ENABLED === 'false') return false;
    const [devices, prefs] = await Promise.all([
      this.prisma.pushSubscription.count({ where: { userId, isActive: true } }),
      this.prisma.teyNotificationPrefs.findUnique({
        where: { userId },
        select: { pushEnabled: true, streakReminders: true, reengagement: true },
      }),
    ]);
    if (devices === 0) return false;
    if (!prefs) return true; // schema defaults: everything on
    return prefs.pushEnabled && prefs[category];
  }

  // ── Conversion: the lesson-3 unlock journey ───────────────────────────────
  private async processCourseUnlock(job: EmailJobRow): Promise<ProcessOutcome> {
    if (!job.userId) return { sent: false, skipReason: 'NO_USER' };
    const payload = job.payload as { courseId?: string; stage?: number } | null;
    const stage = payload?.stage;
    if (!payload?.courseId || (stage !== 1 && stage !== 2 && stage !== 3)) {
      return { sent: false, skipReason: 'BAD_PAYLOAD' };
    }

    // The same paywall check the push stage runs — unlocked, checking out,
    // unpublished or no longer at the wall all stop the email too.
    const state = await courseUnlockState(this.prisma, job.userId, payload.courseId);
    if (!state.eligible) return { sent: false, skipReason: state.reason };

    const user = await this.prisma.user.findUnique({
      where: { id: job.userId },
      select: { id: true, email: true, fullName: true },
    });
    if (!user) return { sent: false, skipReason: 'USER_NOT_FOUND' };

    const templateKey = `conversion.course-unlock-${stage}`;
    const outcome = await this.dispatch.dispatch({
      userId: user.id,
      email: user.email,
      templateKey,
      category: EmailCategory.CONVERSION,
      idempotencyKey: `${templateKey}:${user.id}:${payload.courseId}`,
      metadata: { courseId: payload.courseId, stage },
      render: () =>
        renderCourseUnlockEmail({
          firstName: user.fullName?.split(' ')[0] || '',
          stage,
          courseName: state.course.title,
          creatorName: state.course.instructorName,
          nextLessons: state.nextLessonTitles,
          outcomes: state.course.outcomes,
          completedLessons: state.completedLessons,
          totalLessons: state.totalLessons,
          learners:
            state.learners >= SOCIAL_PROOF_MIN_LEARNERS ? state.learners : undefined,
          unlockUrl: `${emailConfig.appUrl}/learn/${state.course.id}/unlock?campaign=unlock-${stage}`,
          unsubscribeUrl: this.unsubscribe.buildUnsubscribeUrl(user.id, 'MARKETING'),
          preferencesUrl: this.unsubscribe.buildPreferencesUrl(user.id),
        }),
    });
    return outcome.sent ? { sent: true } : { sent: false, skipReason: outcome.reason };
  }

  // ── Re-engagement: the win-back ladder ────────────────────────────────────
  private async processReengagement(job: EmailJobRow): Promise<ProcessOutcome> {
    if (!job.userId) return { sent: false, skipReason: 'NO_USER' };
    if (!emailConfig.reengagementEnabled) return { sent: false, skipReason: 'FEATURE_DISABLED' };
    const payload = job.payload as { daysAway?: number; lastActiveDay?: string } | null;
    const daysAway = payload?.daysAway as InactiveEmailDay | undefined;
    if (!daysAway || !INACTIVE_EMAIL_DAYS.includes(daysAway) || !payload?.lastActiveDay) {
      return { sent: false, skipReason: 'BAD_PAYLOAD' };
    }

    const user = await this.prisma.user.findUnique({
      where: { id: job.userId },
      select: {
        id: true,
        email: true,
        fullName: true,
        studentProfile: { select: { lastLessonCompletedAt: true, longestStreak: true } },
      },
    });
    if (!user?.studentProfile) return { sent: false, skipReason: 'NO_PROFILE' };
    // Came back since the scan queued this? Then there is nothing to win back.
    const last = user.studentProfile.lastLessonCompletedAt;
    if (!last || last.toISOString().slice(0, 10) !== payload.lastActiveDay) {
      return { sent: false, skipReason: 'LEARNER_RETURNED' };
    }

    const enrollment = await this.prisma.enrollment.findFirst({
      where: { userId: user.id },
      orderBy: { updatedAt: 'desc' },
      select: { courseId: true, progress: true, course: { select: { title: true } } },
    });

    const outcome = await this.dispatch.dispatch({
      userId: user.id,
      email: user.email,
      templateKey: 'reengagement.inactive',
      category: EmailCategory.REENGAGEMENT,
      idempotencyKey: `reengagement.inactive:${user.id}:${payload.lastActiveDay}:${daysAway}`,
      metadata: { daysAway },
      render: () =>
        renderInactiveEmail({
          firstName: user.fullName?.split(' ')[0] || '',
          daysAway,
          courseName: enrollment?.course?.title,
          courseProgressPct: enrollment ? Math.round(enrollment.progress ?? 0) : undefined,
          longestStreak: user.studentProfile!.longestStreak ?? 0,
          continueUrl: enrollment
            ? `${emailConfig.appUrl}/learn/${enrollment.courseId}`
            : `${emailConfig.appUrl}/dashboard`,
          unsubscribeUrl: this.unsubscribe.buildUnsubscribeUrl(user.id, 'REENGAGEMENT'),
          preferencesUrl: this.unsubscribe.buildPreferencesUrl(user.id),
        }),
    });
    return outcome.sent ? { sent: true } : { sent: false, skipReason: outcome.reason };
  }

  // ── Payment: access ending on a plan that won't renew by itself ───────────
  private async processAccessEnding(job: EmailJobRow): Promise<ProcessOutcome> {
    if (!job.userId) return { sent: false, skipReason: 'NO_USER' };
    if (!emailConfig.accessEndingEnabled) return { sent: false, skipReason: 'FEATURE_DISABLED' };
    const p = job.payload as { courseId?: string; endDay?: string; daysLeft?: number } | null;
    const daysLeft = p?.daysLeft as AccessEndingDay | undefined;
    if (!p?.courseId || !p.endDay || daysLeft === undefined || !ACCESS_ENDING_DAYS.includes(daysLeft)) {
      return { sent: false, skipReason: 'BAD_PAYLOAD' };
    }

    const [user, entitlement, course] = await Promise.all([
      this.prisma.user.findUnique({
        where: { id: job.userId },
        select: { id: true, email: true, fullName: true },
      }),
      this.prisma.courseAccessEntitlement.findUnique({
        where: { userId_courseId: { userId: job.userId, courseId: p.courseId } },
        select: { expiresAt: true, stripeSubscriptionId: true, cancelAtPeriodEnd: true },
      }),
      this.prisma.course.findUnique({ where: { id: p.courseId }, select: { id: true, title: true } }),
    ]);
    if (!user || !course || !entitlement) return { sent: false, skipReason: 'NOT_FOUND' };

    // Renewed since the scan? expiresAt moved, and there's nothing to remind.
    if (entitlement.expiresAt.toISOString().slice(0, 10) !== p.endDay) {
      return { sent: false, skipReason: 'ALREADY_RENEWED' };
    }
    // Switched back on to auto-renew (card plan un-cancelled)? Nothing to do.
    if (entitlement.stripeSubscriptionId && !entitlement.cancelAtPeriodEnd) {
      return { sent: false, skipReason: 'AUTO_RENEWS' };
    }

    const [enrollment, totalLessons] = await Promise.all([
      this.prisma.enrollment.findUnique({
        where: { userId_courseId: { userId: user.id, courseId: course.id } },
        select: { completedLessons: true },
      }),
      this.prisma.lesson.count({ where: { section: { courseId: course.id } } }),
    ]);
    const completedLessons = Array.isArray(enrollment?.completedLessons)
      ? (enrollment!.completedLessons as unknown[]).length
      : 0;
    // Finished the whole course? Don't push a renewal they don't need.
    if (totalLessons > 0 && completedLessons >= totalLessons) {
      return { sent: false, skipReason: 'COURSE_FINISHED' };
    }

    const outcome = await this.dispatch.dispatch({
      userId: user.id,
      email: user.email,
      templateKey: 'payment.access-ending',
      category: EmailCategory.PAYMENT,
      idempotencyKey: `payment.access-ending:${user.id}:${course.id}:${p.endDay}:${daysLeft}`,
      metadata: { courseId: course.id, daysLeft },
      render: () =>
        renderAccessEndingEmail({
          firstName: user.fullName?.split(' ')[0] || '',
          courseName: course.title,
          daysLeft,
          endDate: entitlement.expiresAt.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            timeZone: 'UTC',
          }),
          completedLessons,
          totalLessons,
          renewUrl: `${emailConfig.appUrl}/learn/${course.id}/unlock?renew=1&campaign=access-ending-${daysLeft}`,
          mobileMoney: !entitlement.stripeSubscriptionId,
        }),
    });
    return outcome.sent ? { sent: true } : { sent: false, skipReason: outcome.reason };
  }

  // ── Creator: the Monday digest ────────────────────────────────────────────
  private async processCreatorDigest(job: EmailJobRow): Promise<ProcessOutcome> {
    if (!job.userId) return { sent: false, skipReason: 'NO_USER' };
    if (!emailConfig.creatorDigestEnabled) return { sent: false, skipReason: 'FEATURE_DISABLED' };
    const p = job.payload as (Omit<CreatorWeeklyDigestData, 'firstName' | 'studioUrl' | 'communityUrl'> & { weekStart: string }) | null;
    if (!p?.weekStart) return { sent: false, skipReason: 'BAD_PAYLOAD' };

    const user = await this.prisma.user.findUnique({
      where: { id: job.userId },
      select: { id: true, email: true, fullName: true },
    });
    if (!user) return { sent: false, skipReason: 'USER_NOT_FOUND' };

    const outcome = await this.dispatch.dispatch({
      userId: user.id,
      email: user.email,
      templateKey: 'creator.weekly-digest',
      category: EmailCategory.DIGEST,
      idempotencyKey: `creator.weekly-digest:${user.id}:${p.weekStart}`,
      preferenceOptions: { creatorDigest: true },
      metadata: { weekStart: p.weekStart },
      render: () =>
        renderCreatorWeeklyDigestEmail({
          ...p,
          firstName: user.fullName?.split(' ')[0] || '',
          studioUrl: `${emailConfig.appUrl}/creator`,
          communityUrl: `${emailConfig.appUrl}/creator/community`,
          unsubscribeUrl: this.unsubscribe.buildUnsubscribeUrl(user.id, 'CREATOR_DIGEST'),
          preferencesUrl: this.unsubscribe.buildPreferencesUrl(user.id),
        }),
    });
    return outcome.sent ? { sent: true } : { sent: false, skipReason: outcome.reason };
  }

  // ── Learning: streak at risk ──────────────────────────────────────────────
  private async processStreakAtRisk(job: EmailJobRow): Promise<ProcessOutcome> {
    if (!job.userId) return { sent: false, skipReason: 'NO_USER' };
    if (!emailConfig.streakReminderEnabled)
      return { sent: false, skipReason: 'FEATURE_DISABLED' };

    const user = await this.prisma.user.findUnique({
      where: { id: job.userId },
      select: {
        id: true,
        email: true,
        fullName: true,
        studentProfile: {
          select: { streakDays: true, lastStreakEarnedAt: true },
        },
      },
    });
    if (!user?.studentProfile) return { sent: false, skipReason: 'NO_PROFILE' };

    // Re-verify the streak is still alive AND today's activity is still
    // missing — the learner may well have already studied since this job
    // was queued this morning.
    const streakDays = user.studentProfile.streakDays;
    if (streakDays <= 0)
      return { sent: false, skipReason: 'STREAK_ALREADY_LOST' };
    const lastEarned = user.studentProfile.lastStreakEarnedAt;
    const today = new Date().toISOString().slice(0, 10);
    if (lastEarned && lastEarned.toISOString().slice(0, 10) === today) {
      return { sent: false, skipReason: 'ALREADY_ACTIVE_TODAY' };
    }
    // Push owns the evening streak ladder for anyone it can reach; this
    // email is the fallback for everyone else. One warning, one channel.
    if (await this.pushReaches(user.id, 'streakReminders')) {
      return { sent: false, skipReason: 'PUSH_REACHES_LEARNER' };
    }

    const idempotencyKey = `learning.streak-at-risk:${user.id}:${today}`;
    const outcome = await this.dispatch.dispatch({
      userId: user.id,
      email: user.email,
      templateKey: 'learning.streak-at-risk',
      category: EmailCategory.LEARNING,
      idempotencyKey,
      preferenceOptions: { streak: true },
      metadata: { streakDays },
      render: () =>
        renderStreakAtRiskEmail({
          firstName: user.fullName?.split(' ')[0] || '',
          streakDays,
          continueUrl: `${emailConfig.appUrl}/dashboard`,
          unsubscribeUrl: this.unsubscribe.buildUnsubscribeUrl(
            user.id,
            'STREAK',
          ),
          preferencesUrl: this.unsubscribe.buildPreferencesUrl(user.id),
        }),
    });
    return outcome.sent
      ? { sent: true }
      : { sent: false, skipReason: outcome.reason };
  }

  // ── Digest: weekly summary ────────────────────────────────────────────────
  private async processWeeklyDigest(job: EmailJobRow): Promise<ProcessOutcome> {
    if (!job.userId) return { sent: false, skipReason: 'NO_USER' };
    if (!emailConfig.weeklyDigestEnabled)
      return { sent: false, skipReason: 'FEATURE_DISABLED' };

    const payload = job.payload as {
      weekStart: string;
      xpEarned: number;
      lessonsCompleted: number;
    } | null;
    const user = await this.prisma.user.findUnique({
      where: { id: job.userId },
      select: {
        id: true,
        email: true,
        fullName: true,
        studentProfile: { select: { streakDays: true } },
        leagueMembers: {
          select: { league: true, outcome: true },
          orderBy: { weekStart: 'desc' },
          take: 1,
        },
      },
    });
    if (!user?.studentProfile) return { sent: false, skipReason: 'NO_PROFILE' };

    const weekKey = payload?.weekStart || new Date().toISOString().slice(0, 10);
    const idempotencyKey = `learning.weekly-summary:${user.id}:${weekKey}`;
    const leagueResult =
      user.leagueMembers[0] && user.leagueMembers[0].outcome
        ? {
            tier: user.leagueMembers[0].league,
            outcome: this.mapDigestLeagueOutcome(user.leagueMembers[0].outcome),
          }
        : undefined;

    const outcome = await this.dispatch.dispatch({
      userId: user.id,
      email: user.email,
      templateKey: 'learning.weekly-summary',
      category: EmailCategory.DIGEST,
      idempotencyKey,
      preferenceOptions: { digest: true },
      metadata: { weekKey },
      render: () =>
        renderWeeklySummaryEmail({
          firstName: user.fullName?.split(' ')[0] || '',
          xpEarned: payload?.xpEarned ?? 0,
          lessonsCompleted: payload?.lessonsCompleted ?? 0,
          currentStreak: user.studentProfile!.streakDays,
          leagueResult,
          continueUrl: `${emailConfig.appUrl}/dashboard`,
          unsubscribeUrl: this.unsubscribe.buildUnsubscribeUrl(
            user.id,
            'DIGEST',
          ),
          preferencesUrl: this.unsubscribe.buildPreferencesUrl(user.id),
        }),
    });
    return outcome.sent
      ? { sent: true }
      : { sent: false, skipReason: outcome.reason };
  }

  private mapDigestLeagueOutcome(
    outcome: string,
  ): 'PROMOTED' | 'STAYED' | 'DEMOTED' {
    if (outcome === 'PROMOTED' || outcome === 'CHAMPION') return 'PROMOTED';
    if (
      outcome === 'DEMOTED' ||
      outcome === 'INACTIVE_DEMOTED' ||
      outcome === 'TOURNAMENT_EXIT'
    )
      return 'DEMOTED';
    return 'STAYED';
  }

  // ── Learning: achievement unlocked ────────────────────────────────────────
  private async processAchievementUnlocked(
    job: EmailJobRow,
  ): Promise<ProcessOutcome> {
    if (!job.userId) return { sent: false, skipReason: 'NO_USER' };
    if (!emailConfig.achievementEmailEnabled)
      return { sent: false, skipReason: 'FEATURE_DISABLED' };

    const payload = job.payload as {
      achievementId: string;
      tier: number;
      name: string;
      description: string;
    } | null;
    if (!payload) return { sent: false, skipReason: 'BAD_PAYLOAD' };

    const user = await this.prisma.user.findUnique({
      where: { id: job.userId },
      select: { id: true, email: true, fullName: true },
    });
    if (!user) return { sent: false, skipReason: 'USER_NOT_FOUND' };

    const idempotencyKey = `learning.achievement-unlocked:${user.id}:${payload.achievementId}:${payload.tier}`;
    const outcome = await this.dispatch.dispatch({
      userId: user.id,
      email: user.email,
      templateKey: 'learning.achievement-unlocked',
      category: EmailCategory.LEARNING,
      idempotencyKey,
      metadata: { achievementId: payload.achievementId, tier: payload.tier },
      render: () =>
        renderAchievementUnlockedEmail({
          firstName: user.fullName?.split(' ')[0] || '',
          achievementName: payload.name,
          achievementDescription: payload.description,
          profileUrl: `${emailConfig.appUrl}/dashboard/achievements`,
          unsubscribeUrl: this.unsubscribe.buildUnsubscribeUrl(
            user.id,
            'MARKETING',
          ),
          preferencesUrl: this.unsubscribe.buildPreferencesUrl(user.id),
        }),
    });
    return outcome.sent
      ? { sent: true }
      : { sent: false, skipReason: outcome.reason };
  }

  // ── Learning: league results ──────────────────────────────────────────────
  private async processLeagueResults(
    job: EmailJobRow,
  ): Promise<ProcessOutcome> {
    if (!job.userId) return { sent: false, skipReason: 'NO_USER' };
    if (!emailConfig.leagueResultsEnabled)
      return { sent: false, skipReason: 'FEATURE_DISABLED' };

    const payload = job.payload as { leagueMemberId: string } | null;
    if (!payload?.leagueMemberId)
      return { sent: false, skipReason: 'BAD_PAYLOAD' };

    const member = await this.prisma.leagueMember.findUnique({
      where: { id: payload.leagueMemberId },
      include: { user: { select: { id: true, email: true, fullName: true } } },
    });
    if (!member || !member.outcome)
      return { sent: false, skipReason: 'MEMBER_NOT_SETTLED' };

    const idempotencyKey = `learning.league-results:${member.id}`;
    const outcome = await this.dispatch.dispatch({
      userId: member.userId,
      email: member.user.email,
      templateKey: 'learning.league-results',
      category: EmailCategory.LEARNING,
      idempotencyKey,
      preferenceOptions: { league: true },
      metadata: { leagueMemberId: member.id },
      render: () =>
        renderLeagueResultsEmail({
          firstName: member.user.fullName?.split(' ')[0] || '',
          league: member.league,
          outcome: member.outcome as LeagueOutcome,
          rank: member.rank,
          leaderboardUrl: `${emailConfig.appUrl}/dashboard/league`,
          unsubscribeUrl: this.unsubscribe.buildUnsubscribeUrl(
            member.userId,
            'LEAGUE',
          ),
          preferencesUrl: this.unsubscribe.buildPreferencesUrl(member.userId),
        }),
    });
    return outcome.sent
      ? { sent: true }
      : { sent: false, skipReason: outcome.reason };
  }

  // ── Payment: purchase confirmation ────────────────────────────────────────
  private async processPurchaseConfirmation(
    job: EmailJobRow,
  ): Promise<ProcessOutcome> {
    const payload = job.payload as {
      courseId: string;
      amount: number;
      currency: string;
      transactionId?: string;
    } | null;
    if (!job.userId || !payload)
      return { sent: false, skipReason: 'BAD_PAYLOAD' };

    const [user, course] = await Promise.all([
      this.prisma.user.findUnique({
        where: { id: job.userId },
        select: { id: true, email: true, fullName: true },
      }),
      this.prisma.course.findUnique({
        where: { id: payload.courseId },
        select: {
          title: true,
          slug: true,
          instructor: { select: { fullName: true } },
        },
      }),
    ]);
    if (!user || !course) return { sent: false, skipReason: 'NOT_FOUND' };

    // Authoritative re-check: only send if access actually exists (the entitlement
    // is what the payment transaction commits, not this job's own payload).
    const entitlement = await this.prisma.courseAccessEntitlement.findUnique({
      where: {
        userId_courseId: { userId: job.userId, courseId: payload.courseId },
      },
      select: { status: true },
    });
    if (!entitlement || entitlement.status !== 'ACTIVE')
      return { sent: false, skipReason: 'NO_ACTIVE_ENTITLEMENT' };

    const outcome = await this.dispatch.dispatch({
      userId: user.id,
      email: user.email,
      templateKey: 'payment.purchase-confirmation',
      category: EmailCategory.PAYMENT,
      idempotencyKey: `payment.purchase-confirmation:${job.dedupeKey}`,
      metadata: { courseId: payload.courseId },
      render: () =>
        renderPurchaseConfirmationEmail({
          firstName: user.fullName?.split(' ')[0] || '',
          courseName: course.title,
          creatorName: course.instructor?.fullName || 'the creator',
          amount: payload.amount,
          currency: payload.currency,
          paidAt: new Date(),
          courseUrl: `${emailConfig.appUrl}/courses/${course.slug}`,
          transactionId: payload.transactionId,
        }),
    });
    return outcome.sent
      ? { sent: true }
      : { sent: false, skipReason: outcome.reason };
  }

  // ── Payment: failed ────────────────────────────────────────────────────────
  private async processPaymentFailed(
    job: EmailJobRow,
  ): Promise<ProcessOutcome> {
    const payload = job.payload as { courseId: string; reason?: string } | null;
    if (!job.userId || !payload)
      return { sent: false, skipReason: 'BAD_PAYLOAD' };

    const [user, course] = await Promise.all([
      this.prisma.user.findUnique({
        where: { id: job.userId },
        select: { id: true, email: true, fullName: true },
      }),
      this.prisma.course.findUnique({
        where: { id: payload.courseId },
        select: { title: true, slug: true },
      }),
    ]);
    if (!user || !course) return { sent: false, skipReason: 'NOT_FOUND' };

    // If the user already has active access (e.g. they retried and it
    // succeeded), this failure notice is stale — don't tell them to retry.
    const entitlement = await this.prisma.courseAccessEntitlement.findUnique({
      where: {
        userId_courseId: { userId: job.userId, courseId: payload.courseId },
      },
      select: { status: true },
    });
    if (entitlement?.status === 'ACTIVE')
      return { sent: false, skipReason: 'ALREADY_SUCCEEDED' };

    const outcome = await this.dispatch.dispatch({
      userId: user.id,
      email: user.email,
      templateKey: 'payment.failed',
      category: EmailCategory.PAYMENT,
      idempotencyKey: `payment.failed:${job.dedupeKey}`,
      metadata: { courseId: payload.courseId },
      render: () =>
        renderPaymentFailedEmail({
          firstName: user.fullName?.split(' ')[0] || '',
          courseName: course.title,
          retryUrl: `${emailConfig.appUrl}/courses/${course.slug}?checkout=1`,
          reason: payload.reason,
        }),
    });
    return outcome.sent
      ? { sent: true }
      : { sent: false, skipReason: outcome.reason };
  }

  // ── Creator: new student ──────────────────────────────────────────────────
  private async processCreatorNewStudent(
    job: EmailJobRow,
  ): Promise<ProcessOutcome> {
    const payload = job.payload as {
      courseId: string;
      instructorId: string;
    } | null;
    if (!payload) return { sent: false, skipReason: 'BAD_PAYLOAD' };

    const [instructor, course] = await Promise.all([
      this.prisma.user.findUnique({
        where: { id: payload.instructorId },
        select: { id: true, email: true, fullName: true },
      }),
      this.prisma.course.findUnique({
        where: { id: payload.courseId },
        select: { title: true, studentsCount: true },
      }),
    ]);
    if (!instructor || !course) return { sent: false, skipReason: 'NOT_FOUND' };

    const outcome = await this.dispatch.dispatch({
      userId: instructor.id,
      email: instructor.email,
      templateKey: 'creator.new-student',
      category: EmailCategory.CREATOR,
      idempotencyKey: `creator.new-student:${job.dedupeKey}`,
      metadata: { courseId: payload.courseId },
      render: () =>
        renderNewStudentEmail({
          firstName: instructor.fullName?.split(' ')[0] || '',
          courseName: course.title,
          studentsCount: course.studentsCount,
          studioUrl: `${emailConfig.appUrl}/creator/courses`,
        }),
    });
    return outcome.sent
      ? { sent: true }
      : { sent: false, skipReason: outcome.reason };
  }

  // ── Creator: payout status ────────────────────────────────────────────────
  private async processPayout(job: EmailJobRow): Promise<ProcessOutcome> {
    const payload = job.payload as { payoutId: string } | null;
    if (!payload?.payoutId) return { sent: false, skipReason: 'BAD_PAYLOAD' };

    const payout = await this.prisma.creatorPayout.findUnique({
      where: { id: payload.payoutId },
    });
    if (!payout) return { sent: false, skipReason: 'PAYOUT_NOT_FOUND' };

    // CreatorPayout has no Prisma relation to User (raw userId column only).
    const creator = await this.prisma.user.findUnique({
      where: { id: payout.userId },
      select: { id: true, email: true, fullName: true },
    });
    if (!creator) return { sent: false, skipReason: 'CREATOR_NOT_FOUND' };

    const statusMap: Record<string, PayoutStatus | undefined> = {
      PAYOUT_INITIATED: 'INITIATED',
      PAYOUT_COMPLETED: 'COMPLETED',
      PAYOUT_FAILED: 'FAILED',
    };
    const status = statusMap[job.eventType];
    if (!status) return { sent: false, skipReason: 'BAD_EVENT_TYPE' };

    // Re-check the payout is still in the state this job was queued for
    // (e.g. don't send "initiated" after it has since completed or failed).
    const currentStatusMatches: Record<PayoutStatus, string[]> = {
      INITIATED: ['PROCESSING'],
      COMPLETED: ['PAID'],
      FAILED: ['FAILED', 'REJECTED'],
    };
    if (!currentStatusMatches[status].includes(payout.status)) {
      return { sent: false, skipReason: `STATUS_MISMATCH_${payout.status}` };
    }

    const templateKey = `payout.${status.toLowerCase()}`;
    const outcome = await this.dispatch.dispatch({
      userId: creator.id,
      email: creator.email,
      templateKey,
      category: EmailCategory.CREATOR,
      idempotencyKey: `${templateKey}:${payout.id}`,
      metadata: { payoutId: payout.id },
      render: () =>
        renderPayoutEmail({
          firstName: creator.fullName?.split(' ')[0] || '',
          status,
          amount: payout.amountMinor / 100,
          currency: payout.currency,
          earningsUrl: `${emailConfig.appUrl}/creator/earnings`,
          failureReason:
            status === 'FAILED' ? payout.failureReason || undefined : undefined,
        }),
    });
    return outcome.sent
      ? { sent: true }
      : { sent: false, skipReason: outcome.reason };
  }
}
