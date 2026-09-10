import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import type { TeyContext, TeyReason, TeyTone } from '../contracts/tey-context.types';
import { TEY_RULES } from '../decision/rules';
import { TeyActionRepository } from '../scheduler/tey-action.repository';
import { renderTemplate } from '../delivery/templates/message-templates';
import { TEY_THRESHOLDS } from '../tey.constants';

const DAY_MS = 86_400_000;

/**
 * Read models for the Tey admin dashboard.
 *
 * Everything here is aggregate-first and index-backed. The state counts are a
 * groupBy over the indexed enum-ish columns on learner_state, which is what
 * makes "STREAK_AT_RISK: 342" cheap enough to put on a page that reloads.
 */
@Injectable()
export class TeyAdminService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly actions: TeyActionRepository,
  ) {}

  /** Headline numbers: what the system did, and what it chose not to do. */
  async overview() {
    const since = new Date(Date.now() - 7 * DAY_MS);

    const [
      streakStates,
      engagementStates,
      deliveryStatus,
      opened,
      converted,
      subscriptions,
      backlog,
      queue,
      learners,
    ] = await Promise.all([
      this.prisma.learnerState.groupBy({
        by: ['streakState'],
        _count: { _all: true },
      }),
      this.prisma.learnerState.groupBy({
        by: ['engagementState'],
        _count: { _all: true },
      }),
      this.prisma.teyDelivery.groupBy({
        by: ['status'],
        where: { sentAt: { gte: since } },
        _count: { _all: true },
      }),
      this.prisma.teyDelivery.count({
        where: { sentAt: { gte: since }, openedAt: { not: null } },
      }),
      this.prisma.teyDelivery.count({
        where: { sentAt: { gte: since }, convertedAt: { not: null } },
      }),
      // Reachability by platform. iOS only permits push from an installed PWA,
      // so this is the number that says how big that ceiling actually is.
      this.prisma.pushSubscription.groupBy({
        by: ['platform'],
        where: { isActive: true },
        _count: { _all: true },
      }),
      this.actions.backlogCount(),
      this.prisma.teyScheduledAction.groupBy({
        by: ['status'],
        _count: { _all: true },
      }),
      this.prisma.learnerState.count(),
    ]);

    const byStatus = Object.fromEntries(
      deliveryStatus.map((r) => [r.status, r._count._all]),
    );
    const sent = byStatus.SENT ?? 0;

    return {
      windowDays: 7,
      learners,
      states: {
        streak: this.toCounts(streakStates, 'streakState'),
        engagement: this.toCounts(engagementStates, 'engagementState'),
      },
      deliveries: {
        sent,
        suppressed: byStatus.SUPPRESSED ?? 0,
        failed: byStatus.FAILED ?? 0,
        opened,
        converted,
        // Guarded: an empty week must read 0, not NaN.
        openRate: sent > 0 ? Math.round((opened / sent) * 100) : 0,
        conversionRate: sent > 0 ? Math.round((converted / sent) * 100) : 0,
      },
      reachability: this.toCounts(subscriptions, 'platform'),
      scheduler: {
        // The health metric that actually matters: due work not yet processed.
        backlog,
        queue: Object.fromEntries(queue.map((r) => [r.status, r._count._all])),
      },
    };
  }

  /**
   * Per-rule funnel. Answers the question the dry-run period exists to answer:
   * is each rule firing at a sane volume, and does anyone act on it?
   */
  async rules() {
    const since = new Date(Date.now() - 30 * DAY_MS);

    const [scheduled, deliveries, opens] = await Promise.all([
      this.prisma.teyScheduledAction.groupBy({
        by: ['ruleId', 'status'],
        where: { createdAt: { gte: since } },
        _count: { _all: true },
      }),
      this.prisma.teyDelivery.groupBy({
        by: ['ruleId', 'status'],
        where: { sentAt: { gte: since } },
        _count: { _all: true },
      }),
      this.prisma.teyDelivery.groupBy({
        by: ['ruleId'],
        where: { sentAt: { gte: since }, openedAt: { not: null } },
        _count: { _all: true },
      }),
    ]);

    const openByRule = Object.fromEntries(
      opens.map((r) => [r.ruleId, r._count._all]),
    );

    return {
      windowDays: 30,
      rules: TEY_RULES.map((rule) => {
        const mine = scheduled.filter((r) => r.ruleId === rule.id);
        const delivered = deliveries.filter((r) => r.ruleId === rule.id);
        const sent =
          delivered.find((r) => r.status === 'SENT')?._count._all ?? 0;
        const openedCount = openByRule[rule.id] ?? 0;

        return {
          id: rule.id,
          priority: rule.priority,
          cooldownHours: rule.cooldownHours,
          supersedes: rule.supersedes,
          scheduled: mine.reduce((n, r) => n + r._count._all, 0),
          byStatus: Object.fromEntries(
            mine.map((r) => [r.status, r._count._all]),
          ),
          sent,
          suppressed:
            delivered.find((r) => r.status === 'SUPPRESSED')?._count._all ?? 0,
          opened: openedCount,
          openRate: sent > 0 ? Math.round((openedCount / sent) * 100) : 0,
        };
      }),
    };
  }

  /**
   * Why nudges did not go out.
   *
   * This is the more useful half of the picture: "we wanted to reach 400
   * learners tonight and suppressed 120" only helps if you can see which
   * 120 and why.
   */
  async suppressions() {
    const since = new Date(Date.now() - 7 * DAY_MS);
    const rows = await this.prisma.teyScheduledAction.groupBy({
      by: ['skipReason'],
      where: { skipReason: { not: null }, updatedAt: { gte: since } },
      _count: { _all: true },
      orderBy: { _count: { skipReason: 'desc' } },
    });

    return {
      windowDays: 7,
      reasons: rows.map((r) => ({
        reason: r.skipReason ?? 'UNKNOWN',
        count: r._count._all,
      })),
    };
  }

  /** Paginated delivery ledger. */
  async deliveries(opts: {
    page?: number;
    ruleId?: string;
    status?: string;
  }) {
    const page = Math.max(1, opts.page ?? 1);
    const pageSize = 25;
    const where = {
      ...(opts.ruleId ? { ruleId: opts.ruleId } : {}),
      ...(opts.status ? { status: opts.status } : {}),
    };

    const [total, items] = await Promise.all([
      this.prisma.teyDelivery.count({ where }),
      this.prisma.teyDelivery.findMany({
        where,
        orderBy: { sentAt: 'desc' },
        skip: (page - 1) * pageSize,
        take: pageSize,
        select: {
          id: true,
          ruleId: true,
          channel: true,
          priority: true,
          status: true,
          title: true,
          body: true,
          deepLink: true,
          generatedBy: true,
          sentAt: true,
          openedAt: true,
          // Deliberately no learner name or email. An operator debugging
          // notification volume does not need to read individual identities.
          userId: true,
        },
      }),
    ]);

    return { total, page, pageSize, items };
  }

  /** Pending and failed queue, for inspecting a stuck scheduler. */
  async queue(status = 'PENDING') {
    const items = await this.prisma.teyScheduledAction.findMany({
      where: { status },
      orderBy: { dueAt: 'asc' },
      take: 50,
      select: {
        id: true,
        userId: true,
        ruleId: true,
        priority: true,
        status: true,
        dueAt: true,
        expiresAt: true,
        attempts: true,
        lastError: true,
        skipReason: true,
      },
    });
    return { status, items };
  }

  async cancelAction(id: string) {
    await this.prisma.teyScheduledAction.updateMany({
      where: { id, status: 'PENDING' },
      data: { status: 'CANCELLED', skipReason: 'ADMIN_CANCELLED' },
    });
    return { success: true };
  }

  /**
   * Renders a template without sending anything, so copy can be iterated on
   * without waiting for a learner to hit the right state.
   */
  preview(reason: TeyReason, tone: TeyTone) {
    const ctx = this.sampleContext(reason, tone);
    const message = renderTemplate(ctx, 'preview-user', '2026-09-04');
    return { reason, tone, ...message, context: ctx };
  }

  /** Operational health, without building an observability platform. */
  async health() {
    const hourAgo = new Date(Date.now() - 3600_000);
    const [backlog, failedActions, failedDeliveries, lastSent, staleClaims] =
      await Promise.all([
        this.actions.backlogCount(),
        this.prisma.teyScheduledAction.count({ where: { status: 'FAILED' } }),
        this.prisma.teyDelivery.count({
          where: { status: 'FAILED', sentAt: { gte: hourAgo } },
        }),
        this.prisma.teyDelivery.findFirst({
          where: { status: 'SENT' },
          orderBy: { sentAt: 'desc' },
          select: { sentAt: true },
        }),
        this.prisma.teyScheduledAction.count({
          where: {
            status: 'CLAIMED',
            claimedAt: { lt: new Date(Date.now() - 5 * 60_000) },
          },
        }),
      ]);

    const recentErrors = await this.prisma.teyScheduledAction.findMany({
      where: { lastError: { not: null } },
      orderBy: { updatedAt: 'desc' },
      take: 10,
      select: { id: true, ruleId: true, lastError: true, updatedAt: true },
    });

    return {
      config: {
        schedulerEnabled:
          process.env.TEY_SCHEDULER_ENABLED === 'true' ||
          (process.env.TEY_SCHEDULER_ENABLED !== 'false' &&
            process.env.NODE_ENV === 'production'),
        // Dry-run is the default and worth surfacing loudly: an operator
        // wondering why nobody got a notification should see it here first.
        dryRun: process.env.TEY_DELIVERY_ENABLED !== 'true',
        pushKillSwitch: process.env.TEY_PUSH_ENABLED === 'false',
        externalTickConfigured: !!process.env.TEY_SCHEDULER_SECRET,
        vapidConfigured:
          !!process.env.VAPID_PUBLIC_KEY && !!process.env.VAPID_PRIVATE_KEY,
      },
      scheduler: { backlog, failedActions, staleClaims },
      delivery: {
        failedLastHour: failedDeliveries,
        lastSentAt: lastSent?.sentAt ?? null,
      },
      recentErrors,
      thresholds: TEY_THRESHOLDS,
    };
  }

  // ── internals ────────────────────────────────────────────────────────────

  private toCounts<T extends Record<string, unknown>>(
    rows: T[],
    key: keyof T,
  ): Record<string, number> {
    return Object.fromEntries(
      rows.map((r) => [
        String(r[key] ?? 'UNKNOWN'),
        (r as unknown as { _count: { _all: number } })._count._all,
      ]),
    );
  }

  /** Plausible context for the preview, so copy renders with real-looking facts. */
  private sampleContext(reason: TeyReason, tone: TeyTone): TeyContext {
    return {
      v: 1,
      reason,
      urgency: reason === 'STREAK_CRITICAL' ? 'CRITICAL' : 'HIGH',
      learnerState: {
        engagement: 'ACTIVE',
        streak: 'STREAK_AT_RISK',
        performance: 'STABLE',
        course: 'IN_PROGRESS',
      },
      facts: {
        streakDays: 12,
        longestStreak: 30,
        freezesAvailable: 0,
        dailyGoalXp: 20,
        todayXp: 0,
        todayLessons: 0,
        weeklyLessons: 5,
        weeklyGoal: TEY_THRESHOLDS.weeklyXpTarget,
        courseProgressPct: 62,
        courseTitle: 'Digital Marketing',
        hoursUntilLocalMidnight: 2,
        daysSinceLastActivity: 1,
      },
      recommendedAction: 'COMPLETE_LESSON',
      target: { type: 'HOME' },
      tone,
      teyState: 'STREAK_AT_RISK',
      ignoredNudgeStreak: tone === 'PLAYFUL_PASSIVE_AGGRESSIVE' ? 3 : 0,
    };
  }
}
