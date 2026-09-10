import { Test, TestingModule } from '@nestjs/testing';
import { LeagueService } from './league.service';
import { PrismaService } from '../prisma/prisma.service';
import {
  demoteTier,
  getWeekEndDate,
  getUtcWeekStart,
  outcomeNewTier,
  promoteTier,
  resolveOutcome,
} from './league.config';

// ─── Pure ladder mechanics (league.config) ───────────────────────────────────

describe('League ladder mechanics', () => {
  describe('resolveOutcome', () => {
    it('promotes Bronze top 20 and never demotes Bronze', () => {
      expect(resolveOutcome('BRONZE', 20, 30).outcome).toBe('PROMOTED');
      expect(resolveOutcome('BRONZE', 21, 30).outcome).toBe('STAYED');
      expect(resolveOutcome('BRONZE', 30, 30).outcome).toBe('STAYED'); // no demotion zone
    });

    it('promotes Silver top 15', () => {
      expect(resolveOutcome('SILVER', 15, 30).outcome).toBe('PROMOTED');
      expect(resolveOutcome('SILVER', 16, 30).outcome).toBe('STAYED');
    });

    it('promotes Gold→Pearl top 10', () => {
      expect(resolveOutcome('GOLD', 10, 30).outcome).toBe('PROMOTED');
      expect(resolveOutcome('GOLD', 11, 30).outcome).toBe('STAYED');
      expect(resolveOutcome('PEARL', 10, 30).outcome).toBe('PROMOTED');
    });

    it('demotes the bottom 5 of a full-size cohort', () => {
      const bottom = resolveOutcome('SILVER', 26, 30); // 30 - 5 + 1
      expect(bottom.outcome).toBe('DEMOTED');
      expect(bottom.newTier).toBe('BRONZE');
      expect(resolveOutcome('SILVER', 25, 30).outcome).toBe('STAYED');
    });

    it('caps promotion at the top 3 in tiny cohorts', () => {
      // 8 members < MIN_COHORT_FOR_DEMOTION — only the top 3 promote, and the
      // last place just stays (no demotion zone in tiny cohorts).
      expect(resolveOutcome('SILVER', 3, 8).outcome).toBe('PROMOTED');
      expect(resolveOutcome('SILVER', 4, 8).outcome).toBe('STAYED');
      expect(resolveOutcome('GOLD', 7, 8).outcome).toBe('STAYED');
      expect(resolveOutcome('SILVER', 8, 8).outcome).toBe('STAYED');
    });

    it('sends Diamond top 10 to the Tournament', () => {
      const result = resolveOutcome('DIAMOND', 10, 30);
      expect(result.outcome).toBe('PROMOTED');
      expect(result.newTier).toBe('DIAMOND_TOURNAMENT');
      expect(resolveOutcome('DIAMOND', 11, 30).outcome).toBe('STAYED');
    });

    it('crowns the tournament top 3 and returns everyone to Diamond', () => {
      expect(resolveOutcome('DIAMOND_TOURNAMENT', 1, 30)).toEqual({
        outcome: 'CHAMPION',
        newTier: 'DIAMOND',
      });
      expect(resolveOutcome('DIAMOND_TOURNAMENT', 3, 30).outcome).toBe('CHAMPION');
      expect(resolveOutcome('DIAMOND_TOURNAMENT', 4, 30)).toEqual({
        outcome: 'TOURNAMENT_EXIT',
        newTier: 'DIAMOND',
      });
    });
  });

  describe('ladder movement', () => {
    it('walks the ladder in both directions with hard floors/ceilings', () => {
      expect(promoteTier('BRONZE')).toBe('SILVER');
      expect(promoteTier('DIAMOND')).toBe('DIAMOND_TOURNAMENT');
      expect(promoteTier('DIAMOND_TOURNAMENT')).toBe('DIAMOND_TOURNAMENT'); // ceiling
      expect(demoteTier('DIAMOND_TOURNAMENT')).toBe('DIAMOND');
      expect(demoteTier('BRONZE')).toBe('BRONZE'); // floor
    });

    it('maps outcomes to the tier the member lands in', () => {
      expect(outcomeNewTier('PROMOTED', 'GOLD')).toBe('SAPPHIRE');
      expect(outcomeNewTier('DEMOTED', 'GOLD')).toBe('SILVER');
      expect(outcomeNewTier('INACTIVE_DEMOTED', 'SILVER')).toBe('BRONZE');
      expect(outcomeNewTier('CHAMPION', 'DIAMOND_TOURNAMENT')).toBe('DIAMOND');
      expect(outcomeNewTier('STAYED', 'RUBY')).toBe('RUBY');
    });
  });

  describe('UTC weeks', () => {
    it('snaps any date to its Monday', () => {
      // 2024-01-01 was a Monday.
      expect(getUtcWeekStart(new Date('2024-01-01T00:00:00Z'))).toBe('2024-01-01');
      expect(getUtcWeekStart(new Date('2024-01-03T15:34:00Z'))).toBe('2024-01-01'); // Wed
      expect(getUtcWeekStart(new Date('2024-01-07T23:59:00Z'))).toBe('2024-01-01'); // Sun
      expect(getUtcWeekStart(new Date('2024-01-08T00:00:00Z'))).toBe('2024-01-08'); // next Mon
    });

    it('ends a week exactly at the next Monday 00:00 UTC', () => {
      expect(getWeekEndDate('2024-01-01')).toEqual(new Date('2024-01-08T00:00:00.000Z'));
    });
  });
});

// ─── Settlement orchestration (mocked Prisma) ────────────────────────────────

describe('LeagueService', () => {
  let service: LeagueService;
  let prisma: any;

  const makeCohort = (league: string, members: Array<{ userId: string; weeklyXp: number }>) => ({
    id: 'cohort-1',
    league,
    weekStart: '2024-01-01',
    status: 'SETTLING',
    members: members.map((m, i) => ({
      id: `member-${i}`,
      userId: m.userId,
      weeklyXp: m.weeklyXp,
      xpUpdatedAt: new Date(2024, 0, 2 + i),
    })),
  });

  beforeEach(async () => {
    prisma = {
      leagueCohort: {
        updateMany: jest.fn().mockResolvedValue({ count: 1 }),
        findUnique: jest.fn(),
        update: jest.fn().mockResolvedValue({}),
      },
      leagueMember: {
        update: jest.fn().mockResolvedValue({}),
        create: jest.fn().mockResolvedValue({}),
        createMany: jest.fn().mockResolvedValue({ count: 1 }),
        findMany: jest.fn().mockResolvedValue([]),
        findFirst: jest.fn().mockResolvedValue(null),
        findUnique: jest.fn().mockResolvedValue(null),
        groupBy: jest.fn().mockResolvedValue([]),
      },
      studentProfile: {
        findUnique: jest.fn().mockResolvedValue({ leagueTier: 'BRONZE' }),
        update: jest.fn().mockResolvedValue({}),
      },
      $transaction: jest.fn(async (cb: any) => cb(prisma)),
      $queryRaw: jest.fn().mockResolvedValue([]),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [LeagueService, { provide: PrismaService, useValue: prisma }],
    }).compile();

    service = module.get<LeagueService>(LeagueService);
  });

  describe('settleCohort', () => {
    it('ranks members, assigns outcomes and moves league tiers', async () => {
      // 3-member Silver cohort — tiny-cohort cap promotes the top 3.
      const cohort = makeCohort('SILVER', [
        { userId: 'u1', weeklyXp: 500 }, // rank 1 → PROMOTED → GOLD
        { userId: 'u2', weeklyXp: 300 }, // rank 2 → PROMOTED → GOLD
        { userId: 'u3', weeklyXp: 100 }, // rank 3 → PROMOTED → GOLD
      ]);
      prisma.leagueCohort.findUnique.mockResolvedValue(cohort);

      await service.settleCohort('cohort-1');

      expect(prisma.leagueCohort.updateMany).toHaveBeenCalledWith({
        where: { id: 'cohort-1', status: 'ACTIVE' },
        data: { status: 'SETTLING' },
      });
      expect(prisma.leagueMember.update).toHaveBeenNthCalledWith(1, {
        where: { id: 'member-0' },
        data: { rank: 1, outcome: 'PROMOTED' },
      });
      expect(prisma.leagueMember.update).toHaveBeenNthCalledWith(3, {
        where: { id: 'member-2' },
        data: { rank: 3, outcome: 'PROMOTED' },
      });
      expect(prisma.studentProfile.update).toHaveBeenCalledWith({
        where: { userId: 'u1' },
        data: { leagueTier: 'GOLD' },
      });
      expect(prisma.leagueCohort.update).toHaveBeenCalledWith({
        where: { id: 'cohort-1' },
        data: expect.objectContaining({ status: 'SETTLED' }),
      });
    });

    it('demotes the bottom of a full-size cohort and stays the middle', async () => {
      const members = Array.from({ length: 12 }, (_, i) => ({
        userId: `u${i + 1}`,
        weeklyXp: 500 - i * 10,
      }));
      prisma.leagueCohort.findUnique.mockResolvedValue(makeCohort('GOLD', members));

      await service.settleCohort('cohort-1');

      const calls = prisma.leagueMember.update.mock.calls;
      const outcomesByRank = new Map(calls.map((c: any[]) => [c[0].data.rank, c[0].data.outcome]));
      // Gold promo zone 10 in a 12-member cohort (full-size rules).
      expect(outcomesByRank.get(1)).toBe('PROMOTED');
      expect(outcomesByRank.get(10)).toBe('PROMOTED');
      // Bottom 5 (ranks 8–12) — promo takes precedence for 8–10.
      expect(outcomesByRank.get(11)).toBe('DEMOTED');
      expect(outcomesByRank.get(12)).toBe('DEMOTED');
      expect(prisma.studentProfile.update).toHaveBeenCalledWith({
        where: { userId: 'u11' },
        data: { leagueTier: 'SILVER' },
      });
    });

    it('increments tournamentWins for champions only', async () => {
      const cohort = makeCohort('DIAMOND_TOURNAMENT', [
        { userId: 'champ', weeklyXp: 900 }, // rank 1 → CHAMPION
        { userId: 'runner-up', weeklyXp: 400 }, // rank 2 → CHAMPION
        { userId: 'podium', weeklyXp: 300 }, // rank 3 → CHAMPION
        { userId: 'also-ran', weeklyXp: 100 }, // rank 4 → TOURNAMENT_EXIT
      ]);
      prisma.leagueCohort.findUnique.mockResolvedValue(cohort);

      await service.settleCohort('cohort-1');

      expect(prisma.studentProfile.update).toHaveBeenCalledWith({
        where: { userId: 'champ' },
        data: { leagueTier: 'DIAMOND', tournamentWins: { increment: 1 } },
      });
      expect(prisma.studentProfile.update).toHaveBeenCalledWith({
        where: { userId: 'also-ran' },
        data: { leagueTier: 'DIAMOND' },
      });
      const championCalls = prisma.studentProfile.update.mock.calls.filter(
        (c: any[]) => c[0].data.tournamentWins,
      );
      expect(championCalls).toHaveLength(3);
    });

    it('no-ops when another caller already claimed settlement', async () => {
      prisma.leagueCohort.updateMany.mockResolvedValue({ count: 0 });

      await service.settleCohort('cohort-1');

      expect(prisma.leagueCohort.findUnique).not.toHaveBeenCalled();
      expect(prisma.leagueMember.update).not.toHaveBeenCalled();
    });

    it('releases the settlement claim when the transaction fails', async () => {
      prisma.leagueCohort.findUnique.mockResolvedValue(
        makeCohort('GOLD', [{ userId: 'u1', weeklyXp: 10 }]),
      );
      prisma.leagueMember.update.mockRejectedValueOnce(new Error('db down'));

      await expect(service.settleCohort('cohort-1')).rejects.toThrow('db down');

      expect(prisma.leagueCohort.updateMany).toHaveBeenCalledWith({
        where: { id: 'cohort-1', status: 'SETTLING' },
        data: { status: 'ACTIVE' },
      });
    });
  });

  describe('ensureSettled — inactivity demotion', () => {
    it('drops one tier per fully-elapsed week without a membership row', async () => {
      // Latest membership 2 weeks ago; no rows since → 2 missed weeks.
      prisma.leagueMember.findFirst.mockResolvedValue({ weekStart: '2024-01-01' });
      prisma.studentProfile.findUnique
        .mockResolvedValueOnce({ leagueTier: 'GOLD' }) // week 1 demotion
        .mockResolvedValueOnce({ leagueTier: 'SILVER' }); // week 2 demotion

      await service.ensureSettled('u1', new Date('2024-01-22T12:00:00Z')); // Monday, 3 weeks later

      expect(prisma.leagueMember.createMany).toHaveBeenCalledTimes(2);
      expect(prisma.leagueMember.createMany).toHaveBeenNthCalledWith(1, {
        data: [expect.objectContaining({ weekStart: '2024-01-08', outcome: 'INACTIVE_DEMOTED' })],
        skipDuplicates: true,
      });
      expect(prisma.leagueMember.createMany).toHaveBeenNthCalledWith(2, {
        data: [expect.objectContaining({ weekStart: '2024-01-15', outcome: 'INACTIVE_DEMOTED' })],
        skipDuplicates: true,
      });
      expect(prisma.studentProfile.update).toHaveBeenNthCalledWith(1, {
        where: { userId: 'u1' },
        data: { leagueTier: 'SILVER' },
      });
      expect(prisma.studentProfile.update).toHaveBeenNthCalledWith(2, {
        where: { userId: 'u1' },
        data: { leagueTier: 'BRONZE' },
      });
    });

    it('never demotes below Bronze and stops at the current week', async () => {
      prisma.leagueMember.findFirst.mockResolvedValue({ weekStart: '2024-01-01' });
      prisma.studentProfile.findUnique.mockResolvedValue({ leagueTier: 'BRONZE' });

      await service.ensureSettled('u1', new Date('2024-01-22T12:00:00Z'));

      // Weeks 01-08 and 01-15 recorded as INACTIVE_DEMOTED, tier pinned at BRONZE.
      expect(prisma.studentProfile.update).toHaveBeenCalledTimes(2);
      expect(prisma.studentProfile.update).toHaveBeenLastCalledWith({
        where: { userId: 'u1' },
        data: { leagueTier: 'BRONZE' },
      });
    });

    it('does nothing for a user who never competed', async () => {
      prisma.leagueMember.findFirst.mockResolvedValue(null);

      await service.ensureSettled('u1', new Date('2024-01-22T12:00:00Z'));

      expect(prisma.leagueMember.createMany).not.toHaveBeenCalled();
      expect(prisma.studentProfile.update).not.toHaveBeenCalled();
    });

    it('skips weeks that already have a membership row', async () => {
      prisma.leagueMember.findFirst.mockResolvedValue({ weekStart: '2024-01-01' });
      prisma.leagueMember.findUnique.mockResolvedValue({ id: 'existing' }); // week present

      await service.ensureSettled('u1', new Date('2024-01-15T12:00:00Z'));

      expect(prisma.leagueMember.createMany).not.toHaveBeenCalled();
      expect(prisma.studentProfile.update).not.toHaveBeenCalled();
    });
  });

  describe('joinOrIncrement (via recordXp)', () => {
    it('joins the current week cohort on first XP of the week', async () => {
      prisma.leagueMember.findUnique.mockResolvedValue(null); // no membership yet
      prisma.studentProfile.findUnique.mockResolvedValue({ leagueTier: 'GOLD' });
      prisma.$queryRaw.mockResolvedValue([{ id: 'cohort-9', cohortIndex: 0 }]);

      await service.recordXp('u1', 25, new Date('2024-01-03T12:00:00Z'), 'LESSON');

      expect(prisma.leagueMember.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          userId: 'u1',
          cohortId: 'cohort-9',
          league: 'GOLD',
          weeklyXp: 25,
        }),
      });
    });

    it('increments the existing membership instead of re-joining', async () => {
      prisma.leagueMember.findUnique
        .mockResolvedValueOnce({ id: 'member-1' }) // membership exists
        .mockResolvedValue(null);
      prisma.studentProfile.findUnique.mockResolvedValue({ leagueTier: 'GOLD' });

      await service.recordXp('u1', 15, new Date('2024-01-03T12:00:00Z'), 'LESSON');

      expect(prisma.leagueMember.update).toHaveBeenCalledWith({
        where: { id: 'member-1' },
        data: { weeklyXp: { increment: 15 }, xpUpdatedAt: new Date('2024-01-03T12:00:00Z') },
      });
      expect(prisma.leagueMember.create).not.toHaveBeenCalled();
    });

    it('swallows failures so the award flow never breaks', async () => {
      prisma.leagueMember.findUnique.mockRejectedValue(new Error('db down'));

      await expect(
        service.recordXp('u1', 10, new Date('2024-01-03T12:00:00Z'), 'LESSON'),
      ).resolves.toBeUndefined();
    });
  });
});
