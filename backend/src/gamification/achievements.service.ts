import { Injectable, BadRequestException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

// --- Badge Registry ---

export type BadgeId = "wildfire" | "sage" | "champion" | "sharpshooter";

export interface BadgeTier {
  level: number;
  target: number;
  description: string;
  xpReward: number;
}

export interface BadgeDef {
  id: BadgeId;
  title: string;
  iconSrc: string | null;
  badgeBg: string;
  tiers: BadgeTier[];
}

export const BADGE_REGISTRY: BadgeDef[] = [
  {
    id: "wildfire",
    title: "Wildfire",
    iconSrc: "/Icons/burn.png",
    badgeBg: "#FF4B4B",
    tiers: [
      { level: 1, target: 3,  description: "Reach a 3-day streak",  xpReward: 20 },
      { level: 2, target: 7,  description: "Reach a 7-day streak",  xpReward: 30 },
      { level: 3, target: 14, description: "Reach a 14-day streak", xpReward: 50 },
      { level: 4, target: 30, description: "Reach a 30-day streak", xpReward: 75 },
      { level: 5, target: 50, description: "Reach a 50-day streak", xpReward: 100 },
    ],
  },
  {
    id: "sage",
    title: "Sage",
    iconSrc: "/Icons/gem.png",
    badgeBg: "#22C55E",
    tiers: [
      { level: 1, target: 100,  description: "Earn 100 XP",   xpReward: 20 },
      { level: 2, target: 250,  description: "Earn 250 XP",   xpReward: 30 },
      { level: 3, target: 500,  description: "Earn 500 XP",   xpReward: 50 },
      { level: 4, target: 1000, description: "Earn 1,000 XP", xpReward: 75 },
      { level: 5, target: 2500, description: "Earn 2,500 XP", xpReward: 100 },
    ],
  },
  {
    id: "champion",
    title: "Champion",
    iconSrc: null,
    badgeBg: "#8B5CF6",
    tiers: [
      { level: 1, target: 1,  description: "Complete 1 lesson",   xpReward: 20 },
      { level: 2, target: 5,  description: "Complete 5 lessons",  xpReward: 30 },
      { level: 3, target: 10, description: "Complete 10 lessons", xpReward: 50 },
      { level: 4, target: 25, description: "Complete 25 lessons", xpReward: 75 },
      { level: 5, target: 50, description: "Complete 50 lessons", xpReward: 100 },
    ],
  },
  {
    id: "sharpshooter",
    title: "Sharpshooter",
    iconSrc: null,
    badgeBg: "#0172FD",
    tiers: [
      { level: 1, target: 1,  description: "Get 100% on 1 quiz",    xpReward: 20 },
      { level: 2, target: 5,  description: "Get 100% on 5 quizzes", xpReward: 30 },
      { level: 3, target: 15, description: "Get 100% on 15 quizzes", xpReward: 50 },
    ],
  },
];

export interface AchievementEntry {
  badgeId: BadgeId;
  level: number;
  claimed: boolean;
  unlockedAt: string;
}

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

    const liveStats: Record<string, number> = {
      wildfire: profile.streakDays,
      sage: profile.xp,
      champion: completedLessonsCount,
      sharpshooter: 0,
    };

    let achievements: AchievementEntry[] = [];
    try {
      achievements = Array.isArray(profile.achievements)
        ? (profile.achievements as unknown as AchievementEntry[])
        : [];
    } catch {
      achievements = [];
    }

    const newUnlocks: AchievementEntry[] = [];
    for (const badge of BADGE_REGISTRY) {
      const statValue = liveStats[badge.id] ?? 0;
      for (const tier of badge.tiers) {
        if (statValue >= tier.target) {
          const alreadyExists = achievements.some(
            (a) => a.badgeId === badge.id && a.level === tier.level,
          );
          if (!alreadyExists) {
            newUnlocks.push({
              badgeId: badge.id,
              level: tier.level,
              claimed: false,
              unlockedAt: new Date().toISOString(),
            });
          }
        }
      }
    }

    if (newUnlocks.length > 0) {
      achievements = [...achievements, ...newUnlocks];
      await this.prisma.studentProfile.update({
        where: { userId },
        data: { achievements: achievements as unknown as any },
      });
    }

    const cards = BADGE_REGISTRY.map((badge) => {
      const statValue = liveStats[badge.id] ?? 0;

      const activeTier =
        badge.tiers.find((t) => {
          const isUnlocked = statValue >= t.target;
          const isClaimed = achievements.some(
            (a) => a.badgeId === badge.id && a.level === t.level && a.claimed,
          );
          return isUnlocked && !isClaimed;
        }) ??
        badge.tiers.find((t) => statValue < t.target) ??
        badge.tiers[badge.tiers.length - 1];

      const isUnlocked = statValue >= activeTier.target;
      const unlockedEntry = achievements.find(
        (a) => a.badgeId === badge.id && a.level === activeTier.level,
      );

      return {
        id: badge.id,
        title: badge.title,
        iconSrc: badge.iconSrc,
        badgeBg: badge.badgeBg,
        level: activeTier.level,
        current: Math.min(statValue, activeTier.target),
        target: activeTier.target,
        description: activeTier.description,
        xpReward: activeTier.xpReward,
        isUnlocked,
        isClaimed: unlockedEntry?.claimed ?? false,
        unlockedAt: unlockedEntry?.unlockedAt ?? null,
        maxLevel: badge.tiers.length,
        unlockedLevels: achievements
          .filter((a) => a.badgeId === badge.id)
          .map((a) => ({ level: a.level, claimed: a.claimed, unlockedAt: a.unlockedAt })),
      };
    });

    return { cards, stats: liveStats, completedLessonsCount };
  }

  async claimAchievementReward(userId: string, badgeId: BadgeId, level: number) {
    const profile = await this.prisma.studentProfile.upsert({
      where: { userId },
      create: { userId },
      update: {},
    });

    let achievements: AchievementEntry[] = Array.isArray(profile.achievements)
      ? (profile.achievements as unknown as AchievementEntry[])
      : [];

    const entry = achievements.find((a) => a.badgeId === badgeId && a.level === level);
    if (!entry) throw new BadRequestException("Achievement not yet unlocked.");
    if (entry.claimed) throw new BadRequestException("Achievement reward already claimed.");

    const badge = BADGE_REGISTRY.find((b) => b.id === badgeId);
    const tier = badge?.tiers.find((t) => t.level === level);
    if (!tier) throw new BadRequestException("Invalid badge or level.");

    achievements = achievements.map((a) =>
      a.badgeId === badgeId && a.level === level ? { ...a, claimed: true } : a,
    );

    const updated = await this.prisma.studentProfile.update({
      where: { userId },
      data: {
        achievements: achievements as unknown as any,
        xp: { increment: tier.xpReward },
      },
    });

    return { success: true, xpGranted: tier.xpReward, newXp: updated.xp };
  }
}
