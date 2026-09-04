import * as fs from 'fs';
import * as path from 'path';
import { Test } from '@nestjs/testing';
import { PrismaService } from '../../prisma/prisma.service';
import { StreakService } from '../../streak/streak.service';
import { LearnerStateService } from './learner-state.service';

const streakStats = (over: Partial<Record<string, unknown>> = {}) => ({
  currentStreak: 12,
  longestStreak: 30,
  lastStreakDate: '2026-09-03',
  freezesAvailable: 1,
  hasCompletedToday: false,
  isNewPersonalBest: false,
  streakSocietyUnlocked: true,
  streakStatus: 'NORMAL' as const,
  ...over,
});

describe('LearnerStateService', () => {
  let service: LearnerStateService;
  let streak: { getStreakStats: jest.Mock };
  let prisma: any;

  beforeEach(async () => {
    streak = { getStreakStats: jest.fn().mockResolvedValue(streakStats()) };

    prisma = {
      user: {
        findUnique: jest.fn().mockResolvedValue({
          timezone: 'Africa/Lagos',
          timezoneOffsetMinutes: -60,
        }),
      },
      studentProfile: {
        findUnique: jest.fn().mockResolvedValue({
          dailyGoalXp: 20,
          lastLessonCompletedAt: new Date('2026-09-03T18:00:00Z'),
          lastActiveAt: new Date('2026-09-03T18:00:00Z'),
        }),
      },
      userDailyActivity: { findUnique: jest.fn().mockResolvedValue(null) },
      userWeeklyProgress: { findUnique: jest.fn().mockResolvedValue(null) },
      userStats: {
        findUnique: jest
          .fn()
          .mockResolvedValue({ lessonsCompleted: 40, lastActivityAt: null }),
      },
      learnerState: {
        findUnique: jest.fn().mockResolvedValue(null),
        upsert: jest.fn().mockResolvedValue({}),
      },
      enrollment: { findFirst: jest.fn().mockResolvedValue(null) },
      section: { findMany: jest.fn().mockResolvedValue([]) },
    };

    const moduleRef = await Test.createTestingModule({
      providers: [
        LearnerStateService,
        { provide: PrismaService, useValue: prisma },
        { provide: StreakService, useValue: streak },
      ],
    }).compile();

    service = moduleRef.get(LearnerStateService);
  });

  describe('streak delegation (guards against a fifth implementation)', () => {
    it('copies StreakService output verbatim rather than recomputing', async () => {
      streak.getStreakStats.mockResolvedValue(
        streakStats({ currentStreak: 7, longestStreak: 41, freezesAvailable: 2 }),
      );

      const s = await service.project('u1');

      expect(s.streakDays).toBe(7);
      expect(s.longestStreak).toBe(41);
      expect(s.freezesAvailable).toBe(2);
      expect(streak.getStreakStats).toHaveBeenCalledTimes(1);
    });

    it('passes the zone-derived offset so the reconciling read uses the right day', async () => {
      await service.project('u1');
      // Africa/Lagos is UTC+1 -> -60 in the getTimezoneOffset convention.
      expect(streak.getStreakStats).toHaveBeenCalledWith('u1', -60);
    });

    it('reflects a streak StreakService reset, without second-guessing it', async () => {
      streak.getStreakStats.mockResolvedValue(
        streakStats({ currentStreak: 0, streakStatus: 'RESET', lastStreakDate: '2026-08-30' }),
      );
      const s = await service.project('u1');
      expect(s.streakDays).toBe(0);
      expect(s.streakState).toBe('STREAK_LOST');
    });
  });

  describe('daily goal', () => {
    it('is incomplete with no activity row for the local day', async () => {
      const s = await service.project('u1');
      expect(s.todayGoalCompleted).toBe(false);
      expect(s.todayXp).toBe(0);
    });

    it('is complete only when XP and lesson count both clear the bar', async () => {
      prisma.userDailyActivity.findUnique.mockResolvedValue({
        xpEarned: 30,
        lessonsCompleted: 1,
      });
      const s = await service.project('u1');
      expect(s.todayGoalCompleted).toBe(true);
      expect(s.streakState).toBe('STREAK_SAFE');
    });

    it('is incomplete when XP arrived without a lesson', async () => {
      prisma.userDailyActivity.findUnique.mockResolvedValue({
        xpEarned: 500,
        lessonsCompleted: 0,
      });
      const s = await service.project('u1');
      expect(s.todayGoalCompleted).toBe(false);
    });
  });

  describe('target resolution', () => {
    it('falls back to HOME when the learner has no enrollment', async () => {
      const s = await service.project('u1');
      expect(s.target).toEqual({ type: 'HOME' });
    });

    it('points at the first unfinished published lesson', async () => {
      prisma.enrollment.findFirst.mockResolvedValue({
        courseId: 'c1',
        progress: 45,
        completedLessons: ['l1', 'l2'],
        updatedAt: new Date(),
        course: { id: 'c1', title: 'Digital Marketing' },
      });
      prisma.section.findMany.mockResolvedValue([
        { id: 's1', lessons: [{ id: 'l1' }, { id: 'l2' }] },
        { id: 's2', lessons: [{ id: 'l3' }, { id: 'l4' }] },
      ]);

      const s = await service.project('u1');

      // sectionIndex is the ARRAY POSITION, because that is what
      // /learn/[id]/section/[sectionIndex] expects.
      expect(s.target).toEqual({
        type: 'LESSON',
        courseId: 'c1',
        sectionIndex: 1,
        lessonId: 'l3',
      });
      expect(s.courseProgressPct).toBe(45);
      expect(s.currentCourseTitle).toBe('Digital Marketing');
    });

    it('only considers published lessons', async () => {
      prisma.enrollment.findFirst.mockResolvedValue({
        courseId: 'c1',
        progress: 10,
        completedLessons: [],
        updatedAt: new Date(),
        course: { id: 'c1', title: 'X' },
      });
      await service.project('u1');
      expect(prisma.section.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          select: expect.objectContaining({
            lessons: expect.objectContaining({
              where: { status: 'published' },
            }),
          }),
        }),
      );
    });

    it('degrades LESSON -> COURSE when everything is finished', async () => {
      prisma.enrollment.findFirst.mockResolvedValue({
        courseId: 'c1',
        progress: 100,
        completedLessons: ['l1'],
        updatedAt: new Date(),
        course: { id: 'c1', title: 'X' },
      });
      prisma.section.findMany.mockResolvedValue([
        { id: 's1', lessons: [{ id: 'l1' }] },
      ]);

      const s = await service.project('u1');
      expect(s.target).toEqual({ type: 'COURSE', courseId: 'c1' });
      expect(s.courseState).toBe('COMPLETED');
    });

    it('survives a malformed completedLessons payload', async () => {
      prisma.enrollment.findFirst.mockResolvedValue({
        courseId: 'c1',
        progress: 0,
        completedLessons: null,
        updatedAt: new Date(),
        course: { id: 'c1', title: 'X' },
      });
      prisma.section.findMany.mockResolvedValue([
        { id: 's1', lessons: [{ id: 'l1' }] },
      ]);

      const s = await service.project('u1');
      expect(s.target).toMatchObject({ type: 'LESSON', lessonId: 'l1' });
    });
  });

  describe('caching', () => {
    it('projects when no row exists yet', async () => {
      await service.get('u1');
      expect(prisma.learnerState.upsert).toHaveBeenCalled();
    });

    it('re-projects when the learner local day has rolled over', async () => {
      prisma.learnerState.findUnique.mockResolvedValue({
        userId: 'u1',
        localDate: '1999-01-01',
        computedAt: new Date(),
        streakDays: 1,
        longestStreak: 1,
        lastStreakEarnedAt: null,
        freezesAvailable: 0,
        todayXp: 0,
        todayLessons: 0,
        dailyGoalXp: 20,
        todayGoalCompleted: false,
        weeklyLessons: 0,
        weeklyXp: 0,
        streakState: 'STREAK_SAFE',
        engagementState: 'ACTIVE',
        courseState: 'NEW',
        performanceState: 'STABLE',
        currentCourseId: null,
        currentSectionIndex: null,
        currentLessonId: null,
        courseProgressPct: 0,
        usualHourLocal: null,
        usualHourSamples: 0,
        lastActivityAt: null,
        consecutiveIgnoredNudges: 0,
        revision: 1,
      });

      await service.get('u1');
      expect(streak.getStreakStats).toHaveBeenCalled();
    });

    it('serves a fresh row without touching StreakService', async () => {
      const today = new Date();
      const localDate = new Intl.DateTimeFormat('en-CA', {
        timeZone: 'Africa/Lagos',
      }).format(today);

      prisma.learnerState.findUnique.mockResolvedValue({
        userId: 'u1',
        localDate,
        computedAt: today,
        streakDays: 5,
        longestStreak: 9,
        lastStreakEarnedAt: null,
        freezesAvailable: 0,
        todayXp: 40,
        todayLessons: 2,
        dailyGoalXp: 20,
        todayGoalCompleted: true,
        weeklyLessons: 4,
        weeklyXp: 90,
        streakState: 'STREAK_SAFE',
        engagementState: 'ACTIVE',
        courseState: 'IN_PROGRESS',
        performanceState: 'STABLE',
        currentCourseId: 'c1',
        currentSectionIndex: 2,
        currentLessonId: 'l9',
        courseProgressPct: 62,
        usualHourLocal: 20,
        usualHourSamples: 8,
        lastActivityAt: today,
        consecutiveIgnoredNudges: 0,
        revision: 3,
      });

      const s = await service.get('u1');

      expect(streak.getStreakStats).not.toHaveBeenCalled();
      expect(s.streakDays).toBe(5);
      expect(s.target).toEqual({
        type: 'LESSON',
        courseId: 'c1',
        sectionIndex: 2,
        lessonId: 'l9',
      });
    });
  });

  it('does not fail the caller when persisting the cache fails', async () => {
    prisma.learnerState.upsert.mockRejectedValue(new Error('db down'));
    await expect(service.project('u1')).resolves.toMatchObject({ userId: 'u1' });
  });
});

/**
 * A source-level guard, not a behavioural one.
 *
 * Four competing streak implementations already exist in this codebase with
 * divergent freeze rules. The whole design of this module rests on there never
 * being a fifth, so this asserts that nothing under tey/ does its own streak
 * date arithmetic. If it fails, the fix is to delegate to StreakService -- not
 * to relax the test.
 */
describe('tey/ contains no independent streak arithmetic', () => {
  const walk = (dir: string): string[] =>
    fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
      const full = path.join(dir, e.name);
      if (e.isDirectory()) return walk(full);
      return e.isFile() && full.endsWith('.ts') ? [full] : [];
    });

  /**
   * The only files allowed to name the field at all:
   *  - contracts/tey-state.types.ts  : a type declaration, no logic
   *  - state/learner-state.service.ts: the one place that copies StreakService
   * Anywhere else, naming it means someone is about to do streak math.
   */
  const ALLOWED_TO_NAME_STREAK_FIELD = [
    'contracts/tey-state.types.ts',
    'state/learner-state.service.ts',
  ];

  it('never re-derives lastStreakEarnedAt or reimplements getDaysDiff', () => {
    const teyRoot = path.join(__dirname, '..');
    const offenders: string[] = [];

    for (const file of walk(teyRoot)) {
      if (file.endsWith('.spec.ts')) continue;
      const rel = path.relative(teyRoot, file).split(path.sep).join('/');
      const src = fs.readFileSync(file, 'utf8');
      // Strip comments so the explanatory notes in these files do not trip it.
      const code = src
        .replace(/\/\*[\s\S]*?\*\//g, '')
        .replace(/^\s*\/\/.*$/gm, '');

      if (/getDaysDiff\s*\(/.test(code)) {
        offenders.push(`${rel}: getDaysDiff`);
      }
      if (
        /lastStreakEarnedAt/.test(code) &&
        !ALLOWED_TO_NAME_STREAK_FIELD.includes(rel)
      ) {
        offenders.push(`${rel}: lastStreakEarnedAt`);
      }
    }

    expect(offenders).toEqual([]);
  });

  it('actually walks the module, so the guard cannot pass vacuously', () => {
    // An always-green guard is worse than no guard.
    const files = walk(path.join(__dirname, '..'));
    expect(files.length).toBeGreaterThan(5);
    expect(files.some((f) => f.endsWith('learner-state.service.ts'))).toBe(true);
  });
});
