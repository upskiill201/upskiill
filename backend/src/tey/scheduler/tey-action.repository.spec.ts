import { Test } from '@nestjs/testing';
import { PrismaService } from '../../prisma/prisma.service';
import { TeyActionRepository } from './tey-action.repository';

/** Reassembles a Prisma tagged-template call into inspectable SQL. */
const sqlFrom = (call: unknown[]): string => {
  const strings = (call[0] as { strings?: string[] })?.strings ?? call[0];
  return Array.isArray(strings) ? strings.join(' ? ') : String(strings);
};

describe('TeyActionRepository', () => {
  let repo: TeyActionRepository;
  let prisma: any;

  beforeEach(async () => {
    prisma = {
      $queryRaw: jest.fn().mockResolvedValue([]),
      $executeRaw: jest.fn().mockResolvedValue(0),
      teyScheduledAction: {
        upsert: jest.fn().mockResolvedValue({}),
        update: jest.fn().mockResolvedValue({}),
        updateMany: jest.fn().mockResolvedValue({ count: 0 }),
        count: jest.fn().mockResolvedValue(0),
      },
    };

    const moduleRef = await Test.createTestingModule({
      providers: [
        TeyActionRepository,
        { provide: PrismaService, useValue: prisma },
      ],
    }).compile();

    repo = moduleRef.get(TeyActionRepository);
  });

  describe('claimDue', () => {
    it('claims with FOR UPDATE SKIP LOCKED', async () => {
      // This clause is the ENTIRE multi-instance safety story: two Render
      // instances ticking at once each get a disjoint batch, with no leader
      // election and no Redis. Losing it would mean duplicate notifications.
      await repo.claimDue();
      const sql = sqlFrom(prisma.$queryRaw.mock.calls[0]);
      expect(sql).toMatch(/FOR UPDATE\s+SKIP LOCKED/);
    });

    it('only takes rows that are PENDING and actually due', async () => {
      await repo.claimDue();
      const sql = sqlFrom(prisma.$queryRaw.mock.calls[0]);
      expect(sql).toMatch(/"status"\s*=\s*'PENDING'/);
      expect(sql).toMatch(/"dueAt"\s*<=\s*NOW\(\)/);
    });

    it('orders by due time so the most overdue work drains first', async () => {
      await repo.claimDue();
      expect(sqlFrom(prisma.$queryRaw.mock.calls[0])).toMatch(
        /ORDER BY "dueAt"/,
      );
    });

    it('counts the attempt as part of the claim, not after it', async () => {
      // If the process dies mid-send, the attempt must still be recorded or a
      // poison action retries forever.
      await repo.claimDue();
      expect(sqlFrom(prisma.$queryRaw.mock.calls[0])).toMatch(
        /"attempts"\s*=\s*a\."attempts"\s*\+\s*1/,
      );
    });
  });

  describe('reapStaleClaims', () => {
    it('only touches rows stuck in CLAIMED', async () => {
      await repo.reapStaleClaims();
      const sql = sqlFrom(prisma.$executeRaw.mock.calls[0]);
      expect(sql).toMatch(/"status"\s*=\s*'CLAIMED'/);
      expect(sql).toMatch(/"claimedAt"\s*<\s*NOW\(\)/);
    });

    it('gives up on a row that has burned its attempts', async () => {
      // Otherwise a permanently broken action cycles through the queue forever,
      // competing for slots with work that could succeed.
      await repo.reapStaleClaims();
      const sql = sqlFrom(prisma.$executeRaw.mock.calls[0]);
      expect(sql).toMatch(/THEN 'FAILED' ELSE 'PENDING' END/);
    });
  });

  describe('upsertIntent', () => {
    const intent = {
      ruleId: 'STREAK_AT_RISK' as const,
      priority: 'HIGH' as const,
      dueAt: new Date('2026-09-04T19:30:00Z'),
      expiresAt: new Date('2026-09-04T21:00:00Z'),
      dedupeKey: 'STREAK_AT_RISK:u1:2026-09-04',
      contextHint: { reason: 'STREAK_AT_RISK' as const },
    };

    it('keys on dedupeKey so re-planning reschedules instead of duplicating', async () => {
      await repo.upsertIntent('u1', intent);
      expect(prisma.teyScheduledAction.upsert).toHaveBeenCalledWith(
        expect.objectContaining({ where: { dedupeKey: intent.dedupeKey } }),
      );
    });

    it('never resurrects an action that already resolved today', async () => {
      // The update must NOT touch `status`. If it did, a second projection in
      // the same evening would flip a SENT or CANCELLED row back to PENDING and
      // the learner would be nudged twice for the same thing.
      await repo.upsertIntent('u1', intent);
      const { update } = prisma.teyScheduledAction.upsert.mock.calls[0][0];
      expect(update).not.toHaveProperty('status');
    });

    it('swallows a write failure -- planning is best-effort', async () => {
      prisma.teyScheduledAction.upsert.mockRejectedValue(new Error('db down'));
      await expect(repo.upsertIntent('u1', intent)).resolves.toBeUndefined();
    });
  });

  describe('cancelPending', () => {
    it('cancels only this learner and only PENDING rows', async () => {
      await repo.cancelPending('u1', ['STREAK_AT_RISK']);
      expect(prisma.teyScheduledAction.updateMany).toHaveBeenCalledWith({
        where: {
          userId: 'u1',
          status: 'PENDING',
          ruleId: { in: ['STREAK_AT_RISK'] },
        },
        data: { status: 'CANCELLED', skipReason: 'LEARNER_ACTIVE' },
      });
    });

    it('is a no-op with no rules to cancel', async () => {
      await repo.cancelPending('u1', []);
      expect(prisma.teyScheduledAction.updateMany).not.toHaveBeenCalled();
    });
  });

  describe('markFailed', () => {
    it('backs off exponentially while attempts remain', async () => {
      await repo.markFailed('a1', 1, 'timeout');
      const { data } = prisma.teyScheduledAction.update.mock.calls[0][0];
      expect(data.status).toBe('PENDING');
      expect(data.dueAt.getTime()).toBeGreaterThan(Date.now());
    });

    it('stops retrying once attempts are exhausted', async () => {
      await repo.markFailed('a1', 3, 'timeout');
      const { data } = prisma.teyScheduledAction.update.mock.calls[0][0];
      expect(data.status).toBe('FAILED');
      expect(data).not.toHaveProperty('dueAt');
    });

    it('truncates the error so one bad message cannot bloat the row', async () => {
      await repo.markFailed('a1', 1, 'x'.repeat(5000));
      const { data } = prisma.teyScheduledAction.update.mock.calls[0][0];
      expect(data.lastError.length).toBeLessThanOrEqual(500);
    });
  });

  describe('backlogCount', () => {
    it('measures overdue pending work -- the health metric that matters', async () => {
      await repo.backlogCount();
      const { where } = prisma.teyScheduledAction.count.mock.calls[0][0];
      expect(where.status).toBe('PENDING');
      expect(where.dueAt.lt).toBeInstanceOf(Date);
    });
  });
});
