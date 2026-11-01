import { BadRequestException, ConflictException, Injectable, Logger, NotFoundException, Optional } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Cron } from '@nestjs/schedule';
import { PrismaService } from '../../prisma/prisma.service';
import { generatePublicId } from '../../earnings/crypto.util';
import { proPoolSharePct } from '../pro.config';
import { computePool, monthBounds } from './pool-math';

/**
 * The monthly Teyro Pro creator pool (math: pool-math.ts).
 *
 *   draft    computeRun(month) works a finished month out from pro_invoices
 *            and pro_learning_minutes and stores it as a DRAFT run with one
 *            allocation per creator course. Running it again makes a new
 *            revision and supersedes the older draft. A monthly cron does it
 *            on the 8th when PRO_POOL_CRON=true (refunds have mostly landed).
 *   post     postRun(id) is the admin's "approve": it writes POOL_SHARE
 *            ledger rows, so the money shows in each creator's earnings and
 *            balance. A revision of an already-posted month posts only the
 *            difference (either sign), never the whole amount again, and the
 *            ledger's unique (provider, type, reference) makes a double post
 *            impossible.
 *
 * Creators hear about it through `pro.pool.posted` (studio bell + push).
 */

export const POOL_PROVIDER = 'TEYRO_PRO';

const monthKey = (d: Date) => d.toISOString().slice(0, 7);

export function parseMonth(value: string): Date {
  if (!/^\d{4}-(0[1-9]|1[0-2])$/.test(value)) throw new BadRequestException('Month must look like 2026-10.');
  const [y, m] = value.split('-').map(Number);
  return new Date(Date.UTC(y, m - 1, 1));
}

export interface PoolPostedEvent {
  month: string;
  revision: number;
  creators: { creatorId: string; amountMinor: number; deltaMinor: number }[];
}

@Injectable()
export class ProPoolService {
  private readonly logger = new Logger(ProPoolService.name);

  constructor(
    private readonly prisma: PrismaService,
    @Optional() private readonly events?: EventEmitter2,
  ) {}

  /** Work a finished month out and store it as a new DRAFT revision. */
  async computeRun(anyDayInMonth: Date) {
    const { start, end } = monthBounds(anyDayInMonth);
    if (end.getTime() > Date.now()) throw new BadRequestException('That month has not finished yet.');

    const [invoices, minutes] = await Promise.all([
      this.prisma.proInvoice.findMany({
        where: { periodStart: { lt: end }, periodEnd: { gt: start }, amountPaidMinor: { gt: 0 } },
        select: {
          userId: true,
          amountPaidMinor: true,
          taxMinor: true,
          feeMinor: true,
          amountRefundedMinor: true,
          amountDisputedMinor: true,
          periodStart: true,
          periodEnd: true,
        },
      }),
      this.prisma.proLearningMinute.findMany({
        where: { completedAt: { gte: start, lt: end } },
        select: { userId: true, courseId: true, creatorId: true, isOriginal: true, seconds: true, completedAt: true },
      }),
    ]);

    const result = computePool({
      monthStart: start,
      monthEnd: end,
      sharePct: proPoolSharePct(),
      invoices: invoices.map((i) => ({
        userId: i.userId,
        netMinor: i.amountPaidMinor - i.taxMinor - i.feeMinor - i.amountRefundedMinor - i.amountDisputedMinor,
        periodStart: i.periodStart,
        periodEnd: i.periodEnd,
      })),
      minutes,
    });

    return this.prisma.$transaction(async (tx) => {
      // One computation at a time per month.
      await tx.$executeRaw`SELECT pg_advisory_xact_lock(hashtext(${`pro-pool:${monthKey(start)}`}))`;
      const last = await tx.proPoolRun.findFirst({ where: { month: start }, orderBy: { revision: 'desc' }, select: { revision: true } });
      await tx.proPoolRun.updateMany({ where: { month: start, status: 'DRAFT' }, data: { status: 'SUPERSEDED' } });
      return tx.proPoolRun.create({
        data: {
          month: start,
          revision: (last?.revision ?? 0) + 1,
          status: 'DRAFT',
          sharePct: result.sharePct,
          recognizedRevenueMinor: result.recognizedRevenueMinor,
          creatorPoolMinor: result.creatorPoolMinor,
          allocatedToCreatorsMinor: result.allocatedToCreatorsMinor,
          retainedOriginalsMinor: result.retainedOriginalsMinor,
          unallocatedMinor: result.unallocatedMinor,
          totalSeconds: result.totalSeconds,
          learners: result.learners,
          summary: { invoices: invoices.length, minuteRows: minutes.length, courses: result.allocations.length },
          allocations: {
            create: result.allocations.map((a) => ({
              creatorId: a.creatorId,
              courseId: a.courseId,
              seconds: a.seconds,
              learners: a.learners,
              amountMinor: a.amountMinor,
            })),
          },
        },
        include: { allocations: true },
      });
    });
  }

  /** Approve a DRAFT: write the POOL_SHARE ledger rows (differences only on a revision). */
  async postRun(runId: string, adminId: string) {
    const outcome = await this.prisma.$transaction(async (tx) => {
      const run = await tx.proPoolRun.findUnique({ where: { id: runId }, include: { allocations: true } });
      if (!run) throw new NotFoundException('No such pool run.');
      await tx.$executeRaw`SELECT pg_advisory_xact_lock(hashtext(${`pro-pool:${monthKey(run.month)}`}))`;
      const won = await tx.proPoolRun.updateMany({
        where: { id: runId, status: 'DRAFT' },
        data: { status: 'POSTED', postedAt: new Date(), approvedBy: adminId },
      });
      if (won.count !== 1) throw new ConflictException('Only a draft can be posted, and only once.');

      const previous = await tx.proPoolRun.findFirst({
        where: { month: run.month, status: 'POSTED', id: { not: runId } },
        orderBy: { revision: 'desc' },
        include: { allocations: true },
      });
      const before = new Map((previous?.allocations ?? []).map((a) => [a.courseId, a]));
      const now = new Map(run.allocations.map((a) => [a.courseId, a]));
      const courseIds = new Set([...before.keys(), ...now.keys()]);
      const month = monthKey(run.month);
      const monthName = run.month.toLocaleDateString('en-US', { month: 'long', year: 'numeric', timeZone: 'UTC' });

      const perCreator = new Map<string, { amountMinor: number; deltaMinor: number }>();
      for (const courseId of courseIds) {
        const cur = now.get(courseId);
        const prev = before.get(courseId);
        const creatorId = (cur ?? prev)!.creatorId;
        const amount = cur?.amountMinor ?? 0;
        const delta = amount - (prev?.amountMinor ?? 0);
        const totals = perCreator.get(creatorId) ?? { amountMinor: 0, deltaMinor: 0 };
        totals.amountMinor += amount;
        totals.deltaMinor += delta;
        perCreator.set(creatorId, totals);
        if (delta === 0) continue;
        const entry = await tx.earningsTransaction.create({
          data: {
            publicId: generatePublicId('ET'),
            creatorId,
            courseId,
            type: 'POOL_SHARE',
            grossMinor: delta,
            netMinor: delta,
            currency: 'USD',
            creatorSharePct: 100,
            creatorAmountMinor: delta,
            teyroAmountMinor: 0,
            provider: POOL_PROVIDER,
            providerReference: `pool:${month}:r${run.revision}:${courseId}`,
            reason: previous ? `Teyro Pro pool, ${monthName} (revision ${run.revision})` : `Teyro Pro pool, ${monthName}`,
            metadata: { runId: run.id, month, revision: run.revision, seconds: cur?.seconds ?? 0, learners: cur?.learners ?? 0 },
          },
          select: { id: true },
        });
        if (cur) {
          await tx.proPoolAllocation.update({ where: { id: cur.id }, data: { postedDeltaMinor: delta, earningsTransactionId: entry.id } });
        }
      }
      if (previous) await tx.proPoolRun.update({ where: { id: previous.id }, data: { status: 'SUPERSEDED' } });

      return {
        event: {
          month,
          revision: run.revision,
          creators: [...perCreator.entries()].map(([creatorId, t]) => ({ creatorId, ...t })),
        } satisfies PoolPostedEvent,
        runId: run.id,
      };
    });

    this.events?.emit('pro.pool.posted', outcome.event);
    return { posted: true, runId: outcome.runId, creators: outcome.event.creators.length };
  }

  /** A creator's pool months (latest posted run each), newest first. */
  async creatorPool(creatorId: string) {
    const allocations = await this.prisma.proPoolAllocation.findMany({
      where: { creatorId, run: { status: 'POSTED' } },
      select: {
        courseId: true,
        seconds: true,
        learners: true,
        amountMinor: true,
        run: { select: { month: true, revision: true, postedAt: true, sharePct: true } },
      },
      orderBy: [{ run: { month: 'desc' } }],
      take: 400,
    });
    const courseIds = [...new Set(allocations.map((a) => a.courseId))];
    const courses = courseIds.length
      ? await this.prisma.course.findMany({ where: { id: { in: courseIds } }, select: { id: true, title: true } })
      : [];
    const titleOf = new Map(courses.map((c) => [c.id, c.title]));
    const months = new Map<
      string,
      { month: string; postedAt: Date | null; sharePct: number; amountMinor: number; seconds: number; courses: { courseId: string; title: string; seconds: number; learners: number; amountMinor: number }[] }
    >();
    for (const a of allocations) {
      const k = monthKey(a.run.month);
      const m = months.get(k) ?? { month: k, postedAt: a.run.postedAt, sharePct: a.run.sharePct, amountMinor: 0, seconds: 0, courses: [] };
      m.amountMinor += a.amountMinor;
      m.seconds += a.seconds;
      m.courses.push({ courseId: a.courseId, title: titleOf.get(a.courseId) ?? 'A course', seconds: a.seconds, learners: a.learners, amountMinor: a.amountMinor });
      months.set(k, m);
    }
    return { sharePct: proPoolSharePct(), months: [...months.values()].slice(0, 12) };
  }

  /** The 8th of each month: draft last month's pool for an admin to post. */
  @Cron('0 0 6 8 * *', { name: 'pro-pool-monthly-draft' })
  async monthlyDraft() {
    if (process.env.PRO_POOL_CRON !== 'true') return;
    const now = new Date();
    const lastMonth = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() - 1, 1));
    try {
      const exists = await this.prisma.proPoolRun.findFirst({ where: { month: lastMonth }, select: { id: true } });
      if (exists) return;
      const run = await this.computeRun(lastMonth);
      this.logger.log(`pool draft ${monthKey(lastMonth)}: ${run.creatorPoolMinor} minor, ${run.allocations.length} courses`);
    } catch (err) {
      this.logger.error(`pool draft failed: ${(err as Error).message}`);
    }
  }
}
