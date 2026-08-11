import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AchievementsService } from '../gamification/achievements.service';
import { GamificationService } from '../gamification/gamification.service';

@Injectable()
export class HomeService {
  constructor(
    private prisma: PrismaService,
    private achievementsService: AchievementsService,
    private gamificationService: GamificationService,
  ) {}

  async getHomeDashboard(userId: string, timezoneOffsetMinutes = 0) {
    const [user, statsResult, achievementsResult] = await Promise.all([
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
    ]);

    const profile = user?.studentProfile;
    const enrollments = user?.enrollments || [];

    const todayStr = new Date().toISOString().split('T')[0];
    const lastLessonStr = profile?.lastLessonCompletedAt
      ? new Date(profile.lastLessonCompletedAt).toISOString().split('T')[0]
      : null;
    const hasLessonToday = lastLessonStr === todayStr;

    // 1. Continue Learning Hero
    const currentEnrollment = enrollments[0] || null;
    const continueLearning = currentEnrollment
      ? {
          courseId: currentEnrollment.course.id,
          title: currentEnrollment.course.title,
          shortDescription: currentEnrollment.course.shortDescription || currentEnrollment.course.subtitle,
          progressPct: currentEnrollment.progress || 0,
          completedLessonsCount: Array.isArray(currentEnrollment.completedLessons)
            ? (currentEnrollment.completedLessons as string[]).length
            : 0,
          totalLessonsCount: currentEnrollment.course.sections.reduce(
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

    // 3. Today's Missions
    const todaysMissions = [
      {
        id: 'm1',
        title: 'Complete 1 lesson',
        progress: hasLessonToday ? 1 : 0,
        target: 1,
        rewardXp: 10,
        rewardCoins: 5,
        completed: hasLessonToday,
      },
      {
        id: 'm2',
        title: 'Maintain your streak',
        progress: (statsResult.streakDays || 0) > 0 ? 1 : 0,
        target: 1,
        rewardXp: 10,
        rewardCoins: 5,
        completed: (statsResult.streakDays || 0) > 0,
      },
      {
        id: 'm3',
        title: 'Learn for 10 minutes',
        progress: hasLessonToday ? 10 : 4,
        target: 10,
        unit: 'min',
        rewardXp: 10,
        rewardCoins: 5,
        completed: hasLessonToday,
      },
    ];

    // 4. Mystery Chest Card
    const mysteryChest = {
      unlocked: hasLessonToday,
      claimed: false,
      progressText: hasLessonToday ? '1 / 1 Lesson' : '0 / 1 Lesson',
    };

    // 5. Weekly Progress & Heatmap
    const weeklyProgress = {
      weekRange: 'Current Week',
      learningDaysCount: hasLessonToday ? 4 : 3,
      totalDays: 7,
      pct: hasLessonToday ? 57 : 43,
      heatmap: [true, true, true, hasLessonToday, false, false, false],
    };

    // 6. Next Achievement
    const nextAchievement = achievementsResult.achievements.find((a) => !a.isCompleted) || achievementsResult.achievements[0];

    // 7. Almost There Card
    const xpInLevel = statsResult.xpInCurrentLevel || 0;
    const targetXp = 100;
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
      completedLessons: Array.isArray(e.completedLessons) ? (e.completedLessons as string[]).length : 0,
      totalLessons: e.course.sections.reduce((acc, s) => acc + s.lessons.length, 0) || 1,
    }));

    // 9. Learning Stats
    const learningStats = {
      lessonsCompleted: enrollments.reduce((acc, e) => acc + (Array.isArray(e.completedLessons) ? e.completedLessons.length : 0), 0),
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

    // 11. Weekly Lucky Spin
    const weeklyLuckySpin = {
      canSpin: (statsResult.streakDays || 0) >= 3,
      resetCountdown: '2d 12h',
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
