import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import type { AiUsage } from './ai-provider.interface';

export type BudgetDecision =
  | { allow: true }
  | { allow: false; reason: string };

export type AiPurpose = 'NUDGE_COPY' | 'CONVERSATION' | 'TOOL_LOOP' | 'ADMIN_TEST';

const num = (raw: string | undefined, fallback: number) => {
  const parsed = Number(raw);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : fallback;
};

/**
 * Spend guardrails (spec section 27).
 *
 * These exist to make a runaway loop or a bad deploy cost cents rather than a
 * month of runway. Teyro is pre-revenue; an unbounded AI bill is an existential
 * bug, not a line item.
 *
 * Known and accepted limitation: the pre-flight check is read-then-write, so
 * under concurrency it can overshoot slightly. This is a guardrail, not a
 * ledger — the overshoot is bounded by (in-flight calls x cost per call),
 * which is fractions of a cent. Making it exact would mean a transaction on
 * the hot path for no practical gain.
 */
@Injectable()
export class AiBudgetService {
  private readonly logger = new Logger(AiBudgetService.name);

  constructor(private readonly prisma: PrismaService) {}

  private get limits() {
    return {
      globalDailyUsd: num(process.env.TEY_AI_DAILY_BUDGET_USD, 2),
      perUserCallsPerDay: num(process.env.TEY_AI_MAX_CALLS_PER_USER_DAY, 20),
      proactivePerDay: num(process.env.TEY_AI_MAX_PROACTIVE_DAY, 200),
    };
  }

  /** UTC day. Budgets are a business day, not a learner's local one. */
  private today(): string {
    return new Date().toISOString().slice(0, 10);
  }

  async check(
    purpose: AiPurpose,
    userId?: string | null,
  ): Promise<BudgetDecision> {
    // One switch to stop all AI spend, checked before any query.
    if (process.env.TEY_AI_ENABLED !== 'true') {
      return { allow: false, reason: 'AI_DISABLED' };
    }

    const day = this.today();
    const limits = this.limits;

    const [spendRows, proactive, perUser] = await Promise.all([
      this.prisma.teyAiUsage.aggregate({
        where: { day },
        _sum: { costUsd: true },
      }),
      purpose === 'NUDGE_COPY'
        ? this.prisma.teyAiUsage.aggregate({
            where: { day, purpose: 'NUDGE_COPY' },
            _sum: { calls: true },
          })
        : Promise.resolve(null),
      userId
        ? this.prisma.teyAiUsage.aggregate({
            where: { day, userId },
            _sum: { calls: true },
          })
        : Promise.resolve(null),
    ]);

    const spend = Number(spendRows._sum.costUsd ?? 0);
    if (spend >= limits.globalDailyUsd) {
      return { allow: false, reason: 'GLOBAL_BUDGET' };
    }

    if (proactive && (proactive._sum.calls ?? 0) >= limits.proactivePerDay) {
      return { allow: false, reason: 'PROACTIVE_CAP' };
    }

    if (perUser && (perUser._sum.calls ?? 0) >= limits.perUserCallsPerDay) {
      return { allow: false, reason: 'PER_USER_CAP' };
    }

    return { allow: true };
  }

  /**
   * Records one call. Rolls up on (day, provider, user, purpose) rather than
   * inserting a row per call, so a busy day stays a handful of rows.
   *
   * Never throws: failing to record usage must not fail the request that
   * produced it — worst case a call goes uncounted, which the next check
   * absorbs.
   */
  async record(
    providerId: string,
    purpose: AiPurpose,
    usage: AiUsage,
    rates: { inputCostPer1k: number; outputCostPer1k: number },
    userId?: string | null,
  ): Promise<void> {
    const costUsd =
      (usage.inputTokens / 1000) * rates.inputCostPer1k +
      (usage.outputTokens / 1000) * rates.outputCostPer1k;

    const day = this.today();

    try {
      // The uniqueness that makes this a rollup is a Postgres expression index
      // over COALESCE(userId, ''), which Prisma cannot address in `upsert` —
      // so find-then-write, and tolerate the rare duplicate under concurrency.
      const existing = await this.prisma.teyAiUsage.findFirst({
        where: { day, providerId, purpose, userId: userId ?? null },
        select: { id: true },
      });

      if (existing) {
        await this.prisma.teyAiUsage.update({
          where: { id: existing.id },
          data: {
            calls: { increment: 1 },
            inputTokens: { increment: usage.inputTokens },
            outputTokens: { increment: usage.outputTokens },
            costUsd: { increment: costUsd },
          },
        });
        return;
      }

      await this.prisma.teyAiUsage.create({
        data: {
          day,
          providerId,
          purpose,
          userId: userId ?? null,
          calls: 1,
          inputTokens: usage.inputTokens,
          outputTokens: usage.outputTokens,
          costUsd,
        },
      });
    } catch (err) {
      this.logger.error('Failed recording AI usage', err as Error);
    }
  }

  /** Spend and volume for the admin dashboard. */
  async summary(days = 30) {
    const since = new Date(Date.now() - days * 86_400_000)
      .toISOString()
      .slice(0, 10);

    const rows = await this.prisma.teyAiUsage.groupBy({
      by: ['day', 'purpose'],
      where: { day: { gte: since } },
      _sum: { calls: true, costUsd: true, inputTokens: true, outputTokens: true },
      orderBy: { day: 'desc' },
    });

    const todayRows = rows.filter((r) => r.day === this.today());

    return {
      limits: this.limits,
      today: {
        calls: todayRows.reduce((n, r) => n + (r._sum.calls ?? 0), 0),
        costUsd: todayRows.reduce((n, r) => n + Number(r._sum.costUsd ?? 0), 0),
      },
      byDay: rows.map((r) => ({
        day: r.day,
        purpose: r.purpose,
        calls: r._sum.calls ?? 0,
        costUsd: Number(r._sum.costUsd ?? 0),
        inputTokens: r._sum.inputTokens ?? 0,
        outputTokens: r._sum.outputTokens ?? 0,
      })),
    };
  }
}
