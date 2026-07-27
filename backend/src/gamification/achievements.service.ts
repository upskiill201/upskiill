import { Injectable, BadRequestException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

// --- Badge Registry ---

export type BadgeId = "wildfire" | "sage" | "champion" | "sharpshooter" | "explorer" | "marathon";

export interface BadgeTier {
  level: number;
  target: number;
  description: string;
  xpReward: number;
  rewardType?: 'XP' | 'COINS' | 'FREEZE';
  rewardVal?: number;
}

export interface BadgeDef {
  id: BadgeId;
  title: string;
  category?: string;
  iconSrc: string | null;
  badgeBg: string;
  tiers: BadgeTier[];
}

export const BADGE_REGISTRY: BadgeDef[] = [
  {
    id: "wildfire",
    title: "Wildfire",
    category: "Streak",
    iconSrc: "/Icons/burn.png",
    badgeBg: "#FF4B4B",
    tiers: [
      { level: 1, target: 3,  description: "Reach a 3-day streak",  xpReward: 20, rewardType: 'XP', rewardVal: 20 },
      { level: 2, target: 7,  description: "Reach a 7-day streak",  xpReward: 30, rewardType: 'COINS', rewardVal: 40 },
      { level: 3, target: 14, description: "Reach a 14-day streak", xpReward: 50, rewardType: 'FREEZE', rewardVal: 1 },
      { level: 4, target: 30, description: "Reach a 30-day streak", xpReward: 75, rewardType: 'COINS', rewardVal: 100 },
      { level: 5, target: 50, description: "Reach a 50-day streak", xpReward: 100, rewardType: 'COINS', rewardVal: 150 },
    ],
  },
  {
    id: "sage",
    title: "Sage",
    category: "XP",
    iconSrc: "/Icons/gem.png",
    badgeBg: "#22C55E",
    tiers: [
      { level: 1, target: 100,  description: "Earn 100 XP",   xpReward: 20, rewardType: 'XP', rewardVal: 20 },
      { level: 2, target: 250,  description: "Earn 250 XP",   xpReward: 30, rewardType: 'COINS', rewardVal: 50 },
      { level: 3, target: 500,  description: "Earn 500 XP",   xpReward: 50, rewardType: 'COINS', rewardVal: 100 },
      { level: 4, target: 1000, description: "Earn 1,000 XP", xpReward: 75, rewardType: 'COINS', rewardVal: 150 },
      { level: 5, target: 2500, description: "Earn 2,500 XP", xpReward: 100, rewardType: 'COINS', rewardVal: 250 },
    ],
  },
  {
    id: "champion",
    title: "Champion",
    category: "Lessons",
    iconSrc: null,
    badgeBg: "#8B5CF6",
    tiers: [
      { level: 1, target: 1,  description: "Complete 1 lesson",   xpReward: 20, rewardType: 'COINS', rewardVal: 20 },
      { level: 2, target: 5,  description: "Complete 5 lessons",  xpReward: 30, rewardType: 'COINS', rewardVal: 30 },
      { level: 3, target: 10, description: "Complete 10 lessons", xpReward: 50, rewardType: 'COINS', rewardVal: 50 },
      { level: 4, target: 25, description: "Complete 25 lessons", xpReward: 75, rewardType: 'COINS', rewardVal: 75 },
      { level: 5, target: 50, description: "Complete 50 lessons", xpReward: 100, rewardType: 'COINS', rewardVal: 100 },
    ],
  },
  {
    id: "sharpshooter",
    title: "Sharpshooter",
    category: "Quiz",
    iconSrc: null,
    badgeBg: "#0172FD",
    tiers: [
      { level: 1, target: 1,  description: "Get 100% on 1 quiz",    xpReward: 20, rewardType: 'XP', rewardVal: 20 },
      { level: 2, target: 5,  description: "Get 100% on 5 quizzes", xpReward: 30, rewardType: 'COINS', rewardVal: 30 },
      { level: 3, target: 15, description: "Get 100% on 15 quizzes", xpReward: 50, rewardType: 'COINS', rewardVal: 50 },
    ],
  },
];

@Injectable()
export class AchievementsService {
  constructor(private prisma: PrismaService) {}

  async getAchievements(userId: string) {
    const profile = await this.prisma.studentProfile.upsert({
      where: { userId },
      create: { userId },
      update: {},
    });

    const enrollments = await this.prisma.enrollment.findMany({
      where: { userId },
      select: { completedLessons: true },
    });
    const completedLessonsCount = enrollments.reduce((sum, e) => {
      const arr = Array.isArray(e.completedLessons) ? (e.completedLessons as string[]) : [];
      return sum + arr.length;
    }, 0);

    const userAchievements = await this.prisma.userAchievement.findMany({
      where: { userId },
    });
    const unlockedMap = new Set(
      userAchievements.map((ua) => `${ua.achievementId}_${ua.tier}`)
    );

    const streak = profile.streakDays || 0;
    const xp = profile.xp || 0;

    const result = BADGE_REGISTRY.map((badge) => {
      let currentMetricVal = 0;
      if (badge.id === "wildfire") currentMetricVal = streak;
      else if (badge.id === "sage") currentMetricVal = xp;
      else if (badge.id === "champion") currentMetricVal = completedLessonsCount;
      else if (badge.id === "sharpshooter") currentMetricVal = Math.min(completedLessonsCount, 1);

      let currentTier = 1;
      let isUnlocked = false;

      for (const t of badge.tiers) {
        if (unlockedMap.has(`${badge.id}_${t.level}`)) {
          currentTier = t.level;
          isUnlocked = true;
        }
      }

      const nextTierObj = badge.tiers.find((t) => !unlockedMap.has(`${badge.id}_${t.level}`)) || badge.tiers[badge.tiers.length - 1];

      return {
        id: badge.id,
        title: badge.title,
        category: badge.category || "General",
        icon: badge.iconSrc || "🏆",
        iconSrc: badge.iconSrc,
        badgeBg: badge.badgeBg,
        currentMetricVal,
        targetVal: nextTierObj.target,
        currentTier: isUnlocked ? currentTier : 1,
        maxTier: badge.tiers.length,
        nextReward: `${nextTierObj.xpReward} XP`,
        desc: nextTierObj.description,
        isCompleted: isUnlocked && currentTier === badge.tiers.length,
        tiers: badge.tiers.map((t) => ({
          level: t.level,
          target: t.target,
          description: t.description,
          xpReward: t.xpReward,
          isUnlocked: unlockedMap.has(`${badge.id}_${t.level}`),
        })),
      };
    });

    return { achievements: result };
  }

  async getUserAchievements(userId: string) {
    return this.getAchievements(userId);
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

    const unlockedMap = new Set(
      user.userAchievements.map((ua) => `${ua.achievementId}_${ua.tier}`)
    );

    const newlyUnlocked: any[] = [];

    for (const badge of BADGE_REGISTRY) {
      let val = 0;
      if (badge.id === "wildfire") val = streak;
      else if (badge.id === "sage") val = xp;
      else if (badge.id === "champion") val = completedLessonCount;

      for (const t of badge.tiers) {
        const key = `${badge.id}_${t.level}`;
        if (!unlockedMap.has(key) && val >= t.target) {
          await this.prisma.userAchievement.create({
            data: {
              userId,
              achievementId: badge.id,
              tier: t.level,
            },
          });

          await this.prisma.studentProfile.update({
            where: { userId },
            data: { xp: { increment: t.xpReward } },
          });

          newlyUnlocked.push({
            achievementId: badge.id,
            title: badge.title,
            tier: t.level,
            reward: `${t.xpReward} XP`,
          });
        }
      }
    }

    return newlyUnlocked;
  }

  async claimAchievementReward(userId: string, badgeId: string, level: number) {
    const existing = await this.prisma.userAchievement.findFirst({
      where: { userId, achievementId: badgeId, tier: level },
    });

    if (!existing) {
      throw new BadRequestException("Achievement tier not yet unlocked.");
    }

    const badge = BADGE_REGISTRY.find((b) => b.id === badgeId);
    if (!badge) {
      throw new BadRequestException("Badge not found.");
    }

    const tierObj = badge.tiers.find((t) => t.level === level);
    if (!tierObj) {
      throw new BadRequestException("Tier not found.");
    }

    const profile = await this.prisma.studentProfile.update({
      where: { userId },
      data: { xp: { increment: tierObj.xpReward } },
    });

    return {
      success: true,
      badgeId,
      tier: level,
      xpAwarded: tierObj.xpReward,
      newXpTotal: profile.xp,
    };
  }

  async claimTierReward(userId: string, badgeId: string, level: number) {
    return this.claimAchievementReward(userId, badgeId, level);
  }
}
