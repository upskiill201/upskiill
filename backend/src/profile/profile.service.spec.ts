import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { ProfileService } from './profile.service';
import { PrismaService } from '../prisma/prisma.service';

describe('ProfileService (student settings)', () => {
  let service: ProfileService;
  let prisma: Record<string, any>;

  const dbUser = {
    id: 'user-1',
    email: 'student@teyro.app',
    fullName: 'Test Student',
    avatarUrl: null,
    role: 'STUDENT',
    isVerified: true,
    hasStudentAccess: true,
    hasCreatorAccess: false,
    whatsappVerified: false,
    createdAt: new Date('2026-07-01T00:00:00Z'),
    // Sensitive columns that must NEVER reach the API response
    password: '$2b$10$hashedpasswordhash',
    verifyToken: 'verify-token-secret',
    tokenExpiry: new Date(),
    failedLoginAttempts: 0,
    profile: { userId: 'user-1', username: 'teststudent', bio: 'hello' },
    studentProfile: {
      xp: 320,
      coins: 50,
      gems: 50,
      lives: 5,
      maxLives: 5,
      streakDays: 4,
      longestStreak: 6,
      dailyGoalXp: 20,
    },
  };

  const makeTx = () => ({
    user: { update: jest.fn().mockResolvedValue({}) },
    profile: {
      upsert: jest.fn().mockResolvedValue({}),
      findFirst: jest.fn().mockResolvedValue(null),
    },
    studentProfile: { upsert: jest.fn().mockResolvedValue({}) },
    instructorProfile: {
      upsert: jest.fn().mockResolvedValue({}),
      findFirst: jest.fn().mockResolvedValue(null),
    },
  });

  beforeEach(async () => {
    const tx = makeTx();

    prisma = {
      user: {
        findUnique: jest.fn().mockResolvedValue(dbUser),
        findFirst: jest.fn(),
        findMany: jest.fn().mockResolvedValue([]),
        delete: jest.fn().mockResolvedValue({}),
      },
      userFollow: {
        count: jest.fn().mockResolvedValue(3),
      },
      // Slug fallback lookup in getPublicCreatorProfile (raw SQL)
      $queryRaw: jest.fn().mockResolvedValue([]),
      $transaction: jest.fn((cb: (t: unknown) => Promise<unknown>) => cb(tx)),
      __tx: tx,
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProfileService,
        { provide: PrismaService, useValue: prisma },
      ],
    }).compile();

    service = module.get<ProfileService>(ProfileService);
  });

  describe('getMyProfile', () => {
    it('returns profile data with counts and student stats', async () => {
      const result = await service.getMyProfile('user-1');

      expect(result.email).toBe('student@teyro.app');
      expect(result.fullName).toBe('Test Student');
      expect(result.followersCount).toBe(3);
      expect(result.followingCount).toBe(3);
      expect(result.studentProfile?.dailyGoalXp).toBe(20);
    });

    it('queries with an explicit select that excludes sensitive User columns', async () => {
      await service.getMyProfile('user-1');

      const query = prisma.user.findUnique.mock.calls[0][0];

      // Security guard: an explicit select is the only thing standing between
      // the raw User row (password hash, tokens) and the API response.
      expect(query.select).toBeDefined();
      expect(query.select.password).toBeUndefined();
      expect(query.select.verifyToken).toBeUndefined();
      expect(query.select.tokenExpiry).toBeUndefined();
      expect(query.select.failedLoginAttempts).toBeUndefined();

      // Fields the settings page depends on stay available
      expect(query.select.email).toBe(true);
      expect(query.select.fullName).toBe(true);
      expect(query.select.createdAt).toBe(true);
      expect(query.select.studentProfile.select.dailyGoalXp).toBe(true);
    });

    it('throws NotFound when the user does not exist', async () => {
      prisma.user.findUnique.mockResolvedValue(null);
      await expect(service.getMyProfile('missing')).rejects.toThrow(
        'User not found',
      );
    });
  });

  describe('updateMyProfile', () => {
    it('persists dailyGoalXp onto StudentProfile inside the transaction', async () => {
      const tx = prisma.__tx;

      await service.updateMyProfile('user-1', { dailyGoalXp: 100 });

      expect(tx.studentProfile.upsert).toHaveBeenCalledWith({
        where: { userId: 'user-1' },
        create: { userId: 'user-1', dailyGoalXp: 100 },
        update: { dailyGoalXp: 100 },
      });

      // Must not leak into the creator Profile row
      const profileUpsertArgs = tx.profile.upsert.mock.calls[0][0];
      expect(profileUpsertArgs.create).not.toHaveProperty('dailyGoalXp');
      expect(profileUpsertArgs.update).not.toHaveProperty('dailyGoalXp');
    });

    it('does not touch StudentProfile when dailyGoalXp is absent', async () => {
      const tx = prisma.__tx;

      await service.updateMyProfile('user-1', { bio: 'updated bio' });

      expect(tx.studentProfile.upsert).not.toHaveBeenCalled();
      expect(tx.profile.upsert).toHaveBeenCalled();
    });

    it('updates User.fullName when provided', async () => {
      const tx = prisma.__tx;

      await service.updateMyProfile('user-1', { fullName: 'New Name' });

      expect(tx.user.update).toHaveBeenCalledWith({
        where: { id: 'user-1' },
        data: { fullName: 'New Name' },
      });
    });

    it('rejects reserved usernames', async () => {
      await expect(
        service.updateMyProfile('user-1', { username: 'admin' }),
      ).rejects.toThrow(BadRequestException);
    });

    it('surfaces a unique-constraint race as a friendly BadRequest', async () => {
      prisma.$transaction.mockRejectedValue(
        new Prisma.PrismaClientKnownRequestError('Unique constraint failed', {
          code: 'P2002',
          clientVersion: 'test',
        }),
      );

      await expect(
        service.updateMyProfile('user-1', { username: 'takenname' }),
      ).rejects.toThrow(BadRequestException);
    });

    it('rethrows non-P2002 transaction errors untouched', async () => {
      prisma.$transaction.mockRejectedValue(new Error('boom'));

      await expect(
        service.updateMyProfile('user-1', { username: 'okname' }),
      ).rejects.toThrow('boom');
    });
  });

  describe('getPublicCreatorProfile', () => {
    const makeCreator = (overrides: Record<string, any> = {}) => ({
      id: 'creator-1',
      fullName: 'Ada Lovelace',
      avatarUrl: null,
      isVerified: true,
      hasCreatorAccess: true,
      profile: {
        username: 'ada',
        headline: 'Systems Pioneer',
        bio: 'First programmer',
        about: null,
        skills: ['Math'],
        languages: ['English'],
        location: 'London',
        creatorStatus: 'founding_creator',
      },
      instructorProfile: null,
      courses: [],
      followers: [],
      _count: { followers: 0, following: 0, courses: 0 },
      ...overrides,
    });

    describe('profile visibility', () => {
      const withVisibility = (profileVisibility: string) =>
        makeCreator({ profile: { ...makeCreator().profile, profileVisibility } });

      it('hides a HIDDEN profile from everyone but its owner, as a plain 404', async () => {
        prisma.user.findFirst.mockResolvedValue(withVisibility('HIDDEN'));

        await expect(service.getPublicCreatorProfile('ada')).rejects.toThrow(NotFoundException);
        await expect(service.getPublicCreatorProfile('ada', 'someone-else')).rejects.toThrow(NotFoundException);
        await expect(service.getPublicCreatorProfile('ada', 'creator-1')).resolves.toMatchObject({ isSelf: true });
      });

      it('shows a TEYRO_ONLY profile to signed-in viewers only', async () => {
        prisma.user.findFirst.mockResolvedValue(withVisibility('TEYRO_ONLY'));

        await expect(service.getPublicCreatorProfile('ada')).rejects.toThrow(NotFoundException);
        await expect(service.getPublicCreatorProfile('ada', 'learner-9')).resolves.toMatchObject({ username: 'ada' });
      });
    });

    it('only ever queries PUBLISHED courses (drafts must not leak)', async () => {
      prisma.user.findFirst.mockResolvedValue(makeCreator());

      await service.getPublicCreatorProfile('ada');

      const query = prisma.user.findFirst.mock.calls[0][0];
      expect(query.include.courses.where).toEqual({ published: true });
    });

    it('returns null ratings and no achievements for a zero-review creator', async () => {
      const baseCourse = {
        slug: 'x',
        title: 'X',
        shortDescription: 'd',
        description: 'long',
        level: 'Beginner',
        category: 'Design',
        studentsCount: 0,
        rating: 0,
        thumbnailUrl: null,
        sections: [{ lessons: [{ id: 'l1' }, { id: 'l2' }] }],
        reviews: [],
      };
      const creator = makeCreator({
        courses: [
          { ...baseCourse, id: 'c0', _count: { enrollments: 2, reviews: 0, sections: 1 } },
          { ...baseCourse, id: 'c1', sections: [{ lessons: [] }], _count: { enrollments: 5, reviews: 0, sections: 1 } },
        ],
      });
      prisma.user.findFirst.mockResolvedValue(creator);

      const result = await service.getPublicCreatorProfile('ada');

      // First published course becomes featuredCourse; the rest are listed
      expect(result.featuredCourse.rating).toBeNull();
      expect(result.courses[0].rating).toBeNull();
      // Real learner count survives, but nothing is fabricated
      expect(result.learnersCount).toBe(7);
      expect(result.courses[0].lessonsCount).toBe(0);
      // founding_creator badge is real → the ONLY achievement
      expect(result.achievements).toEqual([
        { id: 'founding-badge', title: 'Founding Creator', icon: 'trophy', color: 'purple' },
      ]);
      expect(result.yearsOfExperience).toBeNull();
      expect(String(result.avatarUrl)).not.toContain('dicebear');
    });

    it('computes ratings from real reviews and awards Top Rated only at >= 4.5', async () => {
      const creator = makeCreator({
        profile: { ...makeCreator().profile, creatorStatus: null },
        courses: [
          {
            id: 'c1',
            slug: 'c1',
            title: 'Course One',
            level: null,
            category: null,
            studentsCount: 0,
            rating: 0,
            thumbnailUrl: null,
            sections: [{ lessons: [] }],
            reviews: [{ rating: 5 }, { rating: 4 }],
            _count: { enrollments: 1200, reviews: 2, sections: 0 },
          },
          {
            id: 'c2',
            slug: 'c2',
            title: 'Course Two',
            level: null,
            category: null,
            studentsCount: 0,
            rating: 0,
            thumbnailUrl: null,
            sections: [{ lessons: [] }],
            reviews: [],
            _count: { enrollments: 10, reviews: 0, sections: 0 },
          },
        ],
      });
      prisma.user.findFirst.mockResolvedValue(creator);

      const result = await service.getPublicCreatorProfile('ada');

      // (5+4)/2 = 4.5 → Top Rated is earned on real data (threshold >= 4.5)
      expect(result.rating).toBe(4.5);
      expect(result.featuredCourse.rating).toBe(4.5);
      expect(result.courses[0].rating).toBeNull(); // second course has no reviews
      const titles = result.achievements.map((a: any) => a.title);
      expect(titles).toContain('Top Rated');
      expect(titles).toContain('1K Learners');
      // Only 2 published courses → Prolific Creator must NOT be awarded
      expect(titles).not.toContain('Prolific Creator');
    });

    it('404s when the creator does not exist', async () => {
      prisma.user.findFirst.mockResolvedValue(null);
      prisma.user.findMany.mockResolvedValue([]);

      await expect(
        service.getPublicCreatorProfile('nobody'),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('toggleFollow', () => {
    it('throws NotFound for an unknown creator instead of an FK 500', async () => {
      prisma.user.findUnique.mockResolvedValue(null);

      await expect(
        service.toggleFollow('ghost-id', 'user-1'),
      ).rejects.toThrow(NotFoundException);
    });

    it('follows inside a transaction and returns the fresh count', async () => {
      const tx = prisma.__tx;
      tx.userFollow = {
        findUnique: jest.fn().mockResolvedValue(null),
        create: jest.fn().mockResolvedValue({}),
        delete: jest.fn(),
        count: jest.fn().mockResolvedValue(7),
      };

      const result = await service.toggleFollow('creator-1', 'user-1');

      expect(result).toEqual({ isFollowing: true, followersCount: 7 });
      expect(tx.userFollow.create).toHaveBeenCalled();
    });

    it('unfollows an existing follow', async () => {
      const tx = prisma.__tx;
      tx.userFollow = {
        findUnique: jest.fn().mockResolvedValue({ id: 'uf-1' }),
        create: jest.fn(),
        delete: jest.fn().mockResolvedValue({}),
        count: jest.fn().mockResolvedValue(2),
      };

      const result = await service.toggleFollow('creator-1', 'user-1');

      expect(result).toEqual({ isFollowing: false, followersCount: 2 });
      expect(tx.userFollow.delete).toHaveBeenCalledWith({ where: { id: 'uf-1' } });
    });
  });
});

describe('ProfileService.hydrateFromOnboarding', () => {
  let service: ProfileService;
  let prisma: Record<string, any>;

  beforeEach(async () => {
    prisma = {
      user: { findUnique: jest.fn().mockResolvedValue({ fullName: 'Ada Lovelace' }) },
      profile: { upsert: jest.fn().mockResolvedValue({}) },
      instructorProfile: { upsert: jest.fn().mockResolvedValue({}) },
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProfileService, { provide: PrismaService, useValue: prisma }],
    }).compile();
    service = module.get(ProfileService);
  });

  it('maps v2 answers onto the profile and keeps the validated set', async () => {
    await service.hydrateFromOnboarding('u1', {
      version: 2,
      name: 'Ada',
      creatorType: 'engineer',
      track: 'coding',
      topics: ['web-development', 'software-development'],
      experience: 'some',
      audience: '1k-10k',
      existing: ['videos'],
      goal: 'earn',
      weeklyHours: '3-5',
    });

    const { create } = prisma.profile.upsert.mock.calls[0][0];
    expect(create).toMatchObject({
      userId: 'u1',
      niche: 'coding',
      primaryExpertise: 'Coding',
      subCategories: ['web-development', 'software-development'],
      audienceSize: '1k-10k',
      weeklyHours: '3-5',
      launchGoal: 'earn',
    });
    expect(create.creatorOnboarding).toEqual({
      version: 2,
      creatorType: 'engineer',
      track: 'coding',
      topics: ['web-development', 'software-development'],
      experience: 'some',
      audience: '1k-10k',
      existing: ['videos'],
      goal: 'earn',
      weeklyHours: '3-5',
    });
    expect(prisma.instructorProfile.upsert).toHaveBeenCalledWith(
      expect.objectContaining({ update: { onboardingCompleted: true } }),
    );
  });

  it('drops anything outside the known v2 ids instead of storing it', async () => {
    await service.hydrateFromOnboarding('u1', {
      version: 2,
      track: 'music',
      topics: ['web-development'],
      creatorType: '<script>',
      existing: ['videos', 'hacks', 42],
      audience: 'none',
    });

    const { create } = prisma.profile.upsert.mock.calls[0][0];
    // No valid track: no niche, and topics without a track are dropped.
    expect(create.niche).toBeUndefined();
    expect(create.subCategories).toBeUndefined();
    expect(create.audienceSize).toBe('none');
    expect(create.creatorOnboarding).toMatchObject({ creatorType: null, track: null, topics: [], existing: ['videos'] });
  });

  it('still reads the retired v1 step-keyed payload', async () => {
    await service.hydrateFromOnboarding('u1', {
      step3: { categories: ['programming'] },
      step4: { audienceSize: 'under_1k' },
      step7: { biggestChallenge: 'time' },
      step12: { courseFormat: 'create' },
    });

    const { create } = prisma.profile.upsert.mock.calls[0][0];
    expect(create).toMatchObject({
      niche: 'programming',
      subCategories: ['programming'],
      audienceSize: 'under_1k',
      biggestChallenge: ['time'],
      launchGoal: 'create',
    });
    expect(create.creatorOnboarding).toBeUndefined();
    expect(prisma.instructorProfile.upsert).not.toHaveBeenCalled();
  });
});
