import { Test, TestingModule } from '@nestjs/testing';
import { CommunityService } from './community.service';
import { PrismaService } from '../prisma/prisma.service';
import { levelForPoints, pointsToNextLevel, COMMUNITY_LEVELS } from './community-levels';

/**
 * Covers the two pieces of genuinely new logic behind the Leaderboards tab
 * and the second-lesson join: ranking/level derivation on top of the scored
 * rows, and the one-shot seating that returns the welcome payload.
 *
 * The point *arithmetic* itself lives in SQL (four windowed UNION branches),
 * so these tests fix the shape of what comes back out of it rather than
 * re-implementing the sum in JS.
 */
describe('CommunityService — leaderboards & second-lesson seating', () => {
  let service: CommunityService;
  let prisma: Record<string, any>;

  const communityId = 'comm-1';
  const courseId = 'course-1';

  beforeEach(async () => {
    prisma = {
      $queryRaw: jest.fn(),
      community: {
        findUnique: jest.fn(),
        update: jest.fn().mockResolvedValue({}),
      },
      communityMembership: {
        findUnique: jest.fn(),
        upsert: jest.fn().mockResolvedValue({ role: 'MEMBER' }),
        count: jest.fn().mockResolvedValue(4),
        findMany: jest.fn().mockResolvedValue([]),
      },
      post: {
        findFirst: jest.fn().mockResolvedValue(null),
        count: jest.fn().mockResolvedValue(0),
      },
      enrollment: { findUnique: jest.fn() },
      courseAccessEntitlement: { findFirst: jest.fn() },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [CommunityService, { provide: PrismaService, useValue: prisma }],
    }).compile();

    service = module.get<CommunityService>(CommunityService);
  });

  afterEach(() => jest.clearAllMocks());

  // ── Level ladder ─────────────────────────────────────────────────────────

  describe('level ladder', () => {
    it('places a zero-point member on the entry rung', () => {
      expect(levelForPoints(0).level).toBe(1);
      expect(pointsToNextLevel(0)).toBe(COMMUNITY_LEVELS[1].minPoints);
    });

    it('takes the highest rung a total clears, not the nearest', () => {
      // 64 is one short of Helper (65) — it must stay Regular (20), not round up.
      expect(levelForPoints(64).name).toBe('Regular');
      expect(levelForPoints(65).name).toBe('Helper');
      expect(pointsToNextLevel(64)).toBe(1);
    });

    it('reports no next rung once the ladder is topped out', () => {
      const top = COMMUNITY_LEVELS[COMMUNITY_LEVELS.length - 1];
      expect(levelForPoints(top.minPoints + 5_000).level).toBe(top.level);
      expect(pointsToNextLevel(top.minPoints)).toBeNull();
    });
  });

  // ── Board shaping ────────────────────────────────────────────────────────

  describe('getLeaderboard', () => {
    const scoredRows = [
      { userId: 'u1', fullName: 'Ada', avatarUrl: null, isCreator: true, streakDays: 9, points: 120 },
      { userId: 'u2', fullName: 'Bo', avatarUrl: null, isCreator: false, streakDays: 2, points: 80 },
      { userId: 'u3', fullName: 'Cy', avatarUrl: null, isCreator: false, streakDays: 0, points: 30 },
    ];

    it('ranks rows in returned order and finds the caller in the board', async () => {
      prisma.$queryRaw.mockResolvedValue(scoredRows);

      const board = await service.getLeaderboard(communityId, 'u2', { window: '7d' });

      expect(board.window).toBe('7d');
      expect(board.entries.map((e) => e.rank)).toEqual([1, 2, 3]);
      expect(board.entries[0].userId).toBe('u1');
      expect(board.me).toEqual({ rank: 2, points: 80 });
    });

    it('reports an unscored caller as unranked rather than omitting them', async () => {
      prisma.$queryRaw.mockResolvedValue(scoredRows);

      const board = await service.getLeaderboard(communityId, 'nobody');

      expect(board.me).toEqual({ rank: null, points: 0 });
    });

    it('truncates the board but still reports the true scored-member count', async () => {
      prisma.$queryRaw.mockResolvedValue(scoredRows);

      const board = await service.getLeaderboard(communityId, 'u1', { limit: 3 });

      // limit is clamped to a floor of 3, so this is the smallest real board.
      expect(board.entries).toHaveLength(3);
      expect(board.scoredMembers).toBe(3);
    });

    it('defaults to the 30-day window', async () => {
      prisma.$queryRaw.mockResolvedValue([]);
      const board = await service.getLeaderboard(communityId, 'u1');
      expect(board.window).toBe('30d');
      expect(board.entries).toEqual([]);
    });
  });

  describe('getLeaderboardBundle', () => {
    it('folds members with no points back in as level 1', async () => {
      prisma.communityMembership.findUnique.mockResolvedValue({ role: 'MEMBER' });
      prisma.community.findUnique.mockResolvedValue({
        id: communityId,
        courseId,
        course: { id: courseId, instructorId: 'creator-1' },
      });
      prisma.communityMembership.count.mockResolvedValue(10);
      // Board queries return nobody; the distribution query returns 2 scorers.
      prisma.$queryRaw.mockImplementation((q: unknown) => {
        const sql = JSON.stringify(q);
        if (sql.includes('HAVING')) return Promise.resolve([]);
        return Promise.resolve([
          { userId: 'u1', points: 300 }, // Mentor (155)
          { userId: 'u2', points: 3 }, // still Newcomer
        ]);
      });

      const bundle = await service.getLeaderboardBundle(communityId, 'u9');

      const byLevel = Object.fromEntries(bundle.levels.map((l) => [l.level, l.memberPct]));
      // 8 unscored + u2 = 9 of 10 on level 1; u1 alone on level 5.
      expect(byLevel[1]).toBe(90);
      expect(byLevel[5]).toBe(10);
      // A viewer with no points sits at the bottom of their own ladder.
      expect(bundle.me).toMatchObject({ points: 0, level: 1, levelName: 'Newcomer' });
    });
  });

  // ── Second-lesson seating ────────────────────────────────────────────────

  describe('seatAfterSecondLesson', () => {
    const communityRow = {
      id: communityId,
      name: 'Digital Marketing Mastery',
      memberCount: 3,
      course: {
        id: courseId,
        title: 'Digital Marketing Mastery',
        thumbnailUrl: null,
        instructor: { id: 'creator-1', fullName: 'Ada', avatarUrl: null },
      },
    };

    it('does nothing on the first lesson', async () => {
      const result = await service.seatAfterSecondLesson(courseId, 'learner-1', 1);

      expect(result).toBeNull();
      expect(prisma.community.findUnique).not.toHaveBeenCalled();
      expect(prisma.communityMembership.upsert).not.toHaveBeenCalled();
    });

    it('seats the learner on the second lesson and returns the welcome payload', async () => {
      prisma.community.findUnique
        .mockResolvedValueOnce(communityRow) // lookup
        .mockResolvedValueOnce({ memberCount: 4 }); // refreshed count after seating
      prisma.communityMembership.findUnique.mockResolvedValue(null);
      prisma.communityMembership.findMany.mockResolvedValue([
        { user: { id: 'u1', fullName: 'Bo', avatarUrl: null } },
      ]);
      prisma.post.count.mockResolvedValue(7);

      const result = await service.seatAfterSecondLesson(courseId, 'learner-1', 2);

      expect(prisma.communityMembership.upsert).toHaveBeenCalled();
      expect(result).toMatchObject({
        communityId,
        courseId,
        courseTitle: 'Digital Marketing Mastery',
        memberCount: 4,
        postCount: 7,
      });
      expect(result?.members).toHaveLength(1);
    });

    it('is a one-shot: an already-seated learner gets no second welcome', async () => {
      prisma.community.findUnique.mockResolvedValue(communityRow);
      prisma.communityMembership.findUnique.mockResolvedValue({ id: 'm1' });

      const result = await service.seatAfterSecondLesson(courseId, 'learner-1', 9);

      expect(result).toBeNull();
      expect(prisma.communityMembership.upsert).not.toHaveBeenCalled();
    });

    it('returns null for a course with no community instead of throwing', async () => {
      prisma.community.findUnique.mockResolvedValue(null);

      await expect(service.seatAfterSecondLesson(courseId, 'learner-1', 2)).resolves.toBeNull();
    });

    it('never lets a seating failure break lesson completion', async () => {
      prisma.community.findUnique.mockRejectedValue(new Error('db down'));

      await expect(service.seatAfterSecondLesson(courseId, 'learner-1', 2)).resolves.toBeNull();
    });
  });
});
