import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AchievementsService } from '../gamification/achievements.service';
import { GamificationService } from '../gamification/gamification.service';
import { MissionsService } from '../missions/missions.service';
import { ChestService } from '../chest/chest.service';
import { ProgressService } from '../progress/progress.service';
import { SpinService } from '../spin/spin.service';

@Injectable()
export class HomeService {
  constructor(
    private prisma: PrismaService,
    private achievementsService: AchievementsService,
    private gamificationService: GamificationService,
    private missionsService: MissionsService,
    private chestService: ChestService,
    private progressService: ProgressService,
    private spinService: SpinService,
  ) {}

  async getHomeDashboard(userId: string, timezoneOffsetMinutes = 0) {
    const [
      user,
      statsResult,
      achievementsResult,
      missionsResult,
      chestResult,
      weeklyResult,
      spinResult,
    ] = await Promise.all([
      // PERF: `select`, not `include`. This previously walked
      // enrollments -> course -> sections -> lessons: true, pulling every
      // Lesson row — INCLUDING its full contentBlocks JSON — for every course
      // the learner is enrolled in, solely to call .length on the array. A
      // _count aggregate answers the same question without transferring the
      // lesson bodies cross-region. The same pattern is already done correctly
      // in auth.service.ts getMyEnrollments.
      //
      // studentProfile is NOT selected here: getMyStats() in this same
      // Promise.all already loads it.
      this.prisma.user.findUnique({
        where: { id: userId },
        select: {
          id: true,
          fullName: true,
          enrollments: {
            orderBy: { updatedAt: 'desc' },
            select: {
              progress: true,
              completedLessons: true,
              course: {
                select: {
                  id: true,
                  title: true,
                  subtitle: true,
                  shortDescription: true,
                  thumbnailUrl: true,
                  category: true,
                  sections: {
                    select: { _count: { select: { lessons: true } } },
                  },
                },
              },
            },
          },
        },
      }),
      this.gamificationService.getMyStats(userId, timezoneOffsetMinutes),
      this.achievementsService.getUserAchievements(userId),
      this.missionsService.getTodayMissions(userId, timezoneOffsetMinutes),
      this.chestService.getOrCreateTodayChest(userId, timezoneOffsetMinutes),
      this.progressService.getWeeklyProgress(userId, timezoneOffsetMinutes),
      this.spinService.getCurrentWeekSpin(userId, timezoneOffsetMinutes),
    ]);

    // getMyStats already resolved the profile; no second read of the same row.
    const profile = statsResult;
    const enrollments = user?.enrollments || [];

    const now = new Date();
    const localMs = now.getTime() - timezoneOffsetMinutes * 60 * 1000;
    const todayStr = new Date(localMs).toISOString().split('T')[0];

    // Normalised because this now reads from getMyStats() rather than the raw
    // Prisma row, and that value can arrive as an ISO string or a Date.
    const lastLessonAt = profile?.lastLessonCompletedAt
      ? new Date(profile.lastLessonCompletedAt as string | Date)
      : null;
    const lastLessonStr =
      lastLessonAt && !Number.isNaN(lastLessonAt.getTime())
        ? new Date(lastLessonAt.getTime() - timezoneOffsetMinutes * 60 * 1000)
            .toISOString()
            .split('T')[0]
        : null;
    const hasLessonToday = lastLessonStr === todayStr;

    // 1. Continue Learning Hero
    const currentEnrollment = enrollments[0] || null;
    const continueLearning = currentEnrollment
      ? {
          courseId: currentEnrollment.course.id,
          title: currentEnrollment.course.title,
          shortDescription:
            currentEnrollment.course.shortDescription || currentEnrollment.course.subtitle,
          progressPct: currentEnrollment.progress || 0,
          completedLessonsCount: Array.isArray(currentEnrollment.completedLessons)
            ? (currentEnrollment.completedLessons as string[]).length
            : 0,
          totalLessonsCount:
            currentEnrollment.course.sections.reduce(
              (acc, s) => acc + s._count.lessons,
              0,
            ) || 1,
        }
      : null;

    // 2. Momentum Card
    let momentum = {
      type: 'FINISH_LESSON',
      icon: '/Icons/burn.png',
      title: `Finish one lesson today to protect your ${statsResult.streakDays || 1}-day streak.`,
      rewardXp: 10,
      rewardCoins: 5,
    };
    if (hasLessonToday) {
      momentum = {
        type: 'MYSTERY_CHEST',
        icon: '/Tressure box.png',
        title: "One more lesson unlocks today's Mystery Chest!",
        rewardXp: 15,
        rewardCoins: 10,
      };
    }

    // 3. Today's Missions (from live MissionsService)
    const todaysMissions = missionsResult?.missions || [];

    // 4. Mystery Chest Card (from live ChestService)
    const isChestReady = chestResult?.status === 'READY_TO_OPEN';
    const isChestOpened = chestResult?.status === 'OPENED';
    const mysteryChest = {
      id: chestResult?.id,
      status: chestResult?.status || 'LOCKED',
      unlocked: isChestReady || isChestOpened,
      claimed: isChestOpened,
      progressText: isChestOpened
        ? 'Opened today!'
        : isChestReady
        ? 'Ready to open!'
        : 'Complete 1 lesson today to unlock',
    };

    // 5. Weekly Progress & Heatmap (from live ProgressService)
    const weeklyProgress = weeklyResult;

    // 6. Next Achievement
    const nextAchievement =
      achievementsResult.achievements.find((a) => !a.isCompleted) ||
      achievementsResult.achievements[0];

    // 7. Almost There Card
    const xpInLevel = statsResult.xpInCurrentLevel || 0;
    const targetXp = statsResult.xpTargetForCurrentLevel || 100;
    const almostThere = {
      title: `You're only ${Math.max(0, targetXp - xpInLevel)} XP away from Level ${(statsResult.userLevel || 1) + 1}`,
      currentXp: xpInLevel,
      targetXp,
      pct: Math.round((xpInLevel / targetXp) * 100),
    };

    // 8. Continue Learning Carousel
    const carouselCourses = enrollments.slice(0, 5).map((e) => ({
      courseId: e.course.id,
      title: e.course.title,
      category: e.course.category || 'General',
      progressPct: e.progress || 0,
      completedLessons: Array.isArray(e.completedLessons)
        ? (e.completedLessons as string[]).length
        : 0,
      totalLessons: e.course.sections.reduce((acc, s) => acc + s._count.lessons, 0) || 1,
    }));

    // 9. Learning Stats
    //
    // `hoursLearned: 5.8` and `rankPercentile: 'Top 14%'` used to be
    // hardcoded here. Shipping invented numbers on the home screen would
    // break the honesty rule this codebase states explicitly in
    // course.service.ts findOne ("every stat the page renders is computed
    // here from REAL rows ... it never invents a fallback number"), so they
    // are omitted rather than faked. Real values are available from
    // progress.service getStatsSummary (which already computes an XP
    // percentile against student_profiles.xp) if a consumer needs them —
    // wire that up rather than reinstating a constant.
    const learningStats = {
      lessonsCompleted: enrollments.reduce(
        (acc, e) =>
          acc + (Array.isArray(e.completedLessons) ? e.completedLessons.length : 0),
        0,
      ),
      xpEarned: statsResult.xp || 0,
    };

    // 10. Friends Activity
    //
    // Was a hardcoded array of three invented learners ("Sarah", "James",
    // "Michael") with invented actions and timestamps. Returning that from a
    // real endpoint would put fake people on the learner's home screen the
    // moment anything consumed it. Empty until it is backed by the social
    // graph (see the follow/followers relations on User); the client already
    // has to handle the empty case for a learner with no friends.
    const friendsActivity: Array<{
      id: string;
      name: string;
      action: string;
      time: string;
    }> = [];

    // 11. Weekly Lucky Spin (from live SpinService)
    const weeklyLuckySpin = {
      id: spinResult?.id,
      status: spinResult?.status || 'AVAILABLE',
      canSpin: spinResult?.status === 'AVAILABLE',
      resetCountdown: 'Every Monday',
    };

    return {
      success: true,
      data: {
        user: {
          id: user?.id,
          fullName: user?.fullName,
          streakDays: statsResult.streakDays,
          xp: statsResult.xp,
          coins: statsResult.coins,
          gems: statsResult.coins,
          lives: statsResult.lives,
          userLevel: statsResult.userLevel,
        },
        continueLearning,
        momentum,
        todaysMissions,
        mysteryChest,
        weeklyProgress,
        nextAchievement,
        almostThere,
        carouselCourses,
        learningStats,
        friendsActivity,
        weeklyLuckySpin,
      },
    };
  }
}
