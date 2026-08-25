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
      this.prisma.user.findUnique({
        where: { id: userId },
        include: {
          studentProfile: true,
          enrollments: {
            include: {
              course: {
                include: {
                  sections: {
                    include: { lessons: true },
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

    const profile = user?.studentProfile;
    const enrollments = user?.enrollments || [];

    const now = new Date();
    const localMs = now.getTime() - timezoneOffsetMinutes * 60 * 1000;
    const todayStr = new Date(localMs).toISOString().split('T')[0];

    const lastLessonStr = profile?.lastLessonCompletedAt
      ? new Date(profile.lastLessonCompletedAt.getTime() - timezoneOffsetMinutes * 60 * 1000)
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
              (acc, s) => acc + s.lessons.length,
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
      totalLessons: e.course.sections.reduce((acc, s) => acc + s.lessons.length, 0) || 1,
    }));

    // 9. Learning Stats
    const learningStats = {
      lessonsCompleted: enrollments.reduce(
        (acc, e) =>
          acc + (Array.isArray(e.completedLessons) ? e.completedLessons.length : 0),
        0,
      ),
      hoursLearned: 5.8,
      xpEarned: statsResult.xp || 0,
      rankPercentile: 'Top 14%',
    };

    // 10. Friends Activity
    const friendsActivity = [
      { id: 'f1', name: 'Sarah', action: 'completed Lesson 8 in Figma UI/UX', time: '2h ago' },
      { id: 'f2', name: 'James', action: 'reached Level 4', time: '5h ago' },
      { id: 'f3', name: 'Michael', action: "completed today's mission", time: '7h ago' },
    ];

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
