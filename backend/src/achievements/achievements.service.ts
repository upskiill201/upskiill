import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

export interface AchievementDef {
  id: string;
  title: string;
  category: string;
  icon: string;
  tiers: {
    tier: number;
    reqVal: number;
    rewardType: 'XP' | 'COINS' | 'FREEZE';
    rewardVal: number;
    desc: string;
  }[];
}

export const ACHIEVEMENTS_REGISTRY: AchievementDef[] = [
  {
    id: 'wildfire',
    title: 'Wildfire',
    category: 'Streak',
    icon: '🔥',
    tiers: [
      { tier: 1, reqVal: 3, rewardType: 'XP', rewardVal: 20, desc: 'Reach a 3-day streak' },
      { tier: 2, reqVal: 7, rewardType: 'COINS', rewardVal: 40, desc: 'Reach a 7-day streak' },
      { tier: 3, reqVal: 30, rewardType: 'FREEZE', rewardVal: 1, desc: 'Reach a 30-day streak' },
      { tier: 4, reqVal: 100, rewardType: 'COINS', rewardVal: 100, desc: 'Reach a 100-day streak' },
    ],
  },
  {
    id: 'sage',
    title: 'Sage',
    category: 'XP',
    icon: '💎',
    tiers: [
      { tier: 1, reqVal: 100, rewardType: 'XP', rewardVal: 20, desc: 'Earn 100 XP' },
      { tier: 2, reqVal: 500, rewardType: 'COINS', rewardVal: 50, desc: 'Earn 500 XP' },
      { tier: 3, reqVal: 2000, rewardType: 'COINS', rewardVal: 100, desc: 'Earn 2,000 XP' },
    ],
  },
  {
    id: 'champion',
    title: 'Champion',
    category: 'Lessons',
    icon: '🏆',
    tiers: [
      { tier: 1, reqVal: 10, rewardType: 'COINS', rewardVal: 50, desc: 'Complete 10 lessons to unlock Leaderboards' },
    ],
  },
  {
    id: 'explorer',
    title: 'Explorer',
    category: 'Courses',
    icon: '🗺️',
    tiers: [
      { tier: 1, reqVal: 3, rewardType: 'COINS', rewardVal: 25, desc: 'Enroll in 3 courses' },
    ],
  },
  {
    id: 'marathon',
    title: 'Marathon',
    category: 'Lessons',
    icon: '🏃',
    tiers: [
      { tier: 1, reqVal: 100, rewardType: 'COINS', rewardVal: 100, desc: 'Complete 100 lessons' },
    ],
  },
];

@Injectable()
export class AchievementsService {
  constructor(private prisma: PrismaService) {}

  async getUserAchievements(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        studentProfile: true,
        enrollments: true,
        userAchievements: true,
      },
    });

    if (!user || !user.studentProfile) {
      return { achievements: [] };
    }

    const profile = user.studentProfile;
    const streak = profile.streakDays || 0;
    const xp = profile.xp || 0;

    // Count total unique completed lessons across all enrollments
    const completedLessonSet = new Set<string>();
    user.enrollments.forEach((e) => {
      if (Array.isArray(e.completedLessons)) {
        (e.completedLessons as string[]).forEach((id) => completedLessonSet.add(id));
      }
    });
    const completedLessonCount = completedLessonSet.size;
    const enrolledCourseCount = user.enrollments.length;

    const unlockedMap = new Set(
      user.userAchievements.map((ua) => `${ua.achievementId}_${ua.tier}`)
    );

    const result = ACHIEVEMENTS_REGISTRY.map((ach) => {
      let currentMetricVal = 0;
      if (ach.id === 'wildfire') currentMetricVal = streak;
      else if (ach.id === 'sage') currentMetricVal = xp;
      else if (ach.id === 'champion' || ach.id === 'marathon') currentMetricVal = completedLessonCount;
      else if (ach.id === 'explorer') currentMetricVal = enrolledCourseCount;

      // Find highest unlocked tier
      let currentTier = 1;
      let isUnlocked = false;

      for (const t of ach.tiers) {
        if (unlockedMap.has(`${ach.id}_${t.tier}`)) {
          currentTier = t.tier;
          isUnlocked = true;
        }
      }

      // Next tier to target
      const nextTierObj = ach.tiers.find((t) => !unlockedMap.has(`${ach.id}_${t.tier}`)) || ach.tiers[ach.tiers.length - 1];

      return {
        id: ach.id,
        title: ach.title,
        category: ach.category,
        icon: ach.icon,
        currentMetricVal,
        targetVal: nextTierObj.reqVal,
        currentTier: isUnlocked ? currentTier : 1,
        maxTier: ach.tiers.length,
        nextReward: `${nextTierObj.rewardVal} ${nextTierObj.rewardType}`,
        desc: nextTierObj.desc,
        isCompleted: isUnlocked && currentTier === ach.tiers.length,
      };
    });

    return { achievements: result };
  }

  async checkAndAwardAchievements(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        studentProfile: true,
        enrollments: true,
        userAchievements: true,
      },
    });

    if (!user || !user.studentProfile) return [];

    const profile = user.studentProfile;
    const streak = profile.streakDays || 0;
    const xp = profile.xp || 0;

    const completedLessonSet = new Set<string>();
    user.enrollments.forEach((e) => {
      if (Array.isArray(e.completedLessons)) {
        (e.completedLessons as string[]).forEach((id) => completedLessonSet.add(id));
      }
    });
    const completedLessonCount = completedLessonSet.size;
    const enrolledCourseCount = user.enrollments.length;

    const unlockedMap = new Set(
      user.userAchievements.map((ua) => `${ua.achievementId}_${ua.tier}`)
    );

    const newlyUnlocked: any[] = [];

    for (const ach of ACHIEVEMENTS_REGISTRY) {
      let val = 0;
      if (ach.id === 'wildfire') val = streak;
      else if (ach.id === 'sage') val = xp;
      else if (ach.id === 'champion' || ach.id === 'marathon') val = completedLessonCount;
      else if (ach.id === 'explorer') val = enrolledCourseCount;

      for (const t of ach.tiers) {
        const key = `${ach.id}_${t.tier}`;
        if (!unlockedMap.has(key) && val >= t.reqVal) {
          // Unlock tier!
          await this.prisma.userAchievement.create({
            data: {
              userId,
              achievementId: ach.id,
              tier: t.tier,
            },
          });

          // Award reward
          if (t.rewardType === 'COINS') {
            await this.prisma.studentProfile.update({
              where: { userId },
              data: { gems: { increment: t.rewardVal } },
            });
            await this.prisma.gemTransaction.create({
              data: { userId, type: 'EARN', amount: t.rewardVal, source: 'ACHIEVEMENT' },
            });
          } else if (t.rewardType === 'XP') {
            await this.prisma.studentProfile.update({
              where: { userId },
              data: { xp: { increment: t.rewardVal } },
            });
          } else if (t.rewardType === 'FREEZE') {
            await this.prisma.studentProfile.update({
              where: { userId },
              data: { streakFreezeBank: { increment: t.rewardVal } },
            });
          }

          newlyUnlocked.push({
            achievementId: ach.id,
            title: ach.title,
            tier: t.tier,
            reward: `${t.rewardVal} ${t.rewardType}`,
          });
        }
      }
    }

    return newlyUnlocked;
  }
}
