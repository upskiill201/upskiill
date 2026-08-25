import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

// ─── Achievement Registry (Duolingo-style milestone collection) ─────────────
//
// Achievements are their OWN reward — a medal/trophy collection on the profile,
// never a currency payout. XP and Coins are granted by actions (lessons,
// missions, streaks); achievements unlock automatically when the underlying
// metric crosses a tier target and are then part of the student's permanent
// collection. There is deliberately NO reward attached to any tier.
//
// Each badge is a ladder of named tiers over one live metric (Wildfire I→V).
// Every tier is one collectible achievement tile on the profile grid.

export type BadgeId =
  | 'wildfire'
  | 'sage'
  | 'champion'
  | 'sharpshooter'
  | 'explorer'
  | 'marathon';

export interface BadgeTier {
  level: number;
  /** Metric value that unlocks this tier. */
  target: number;
  /** Display name of this individual achievement — one collection tile. */
  name: string;
  description: string;
}

export interface BadgeDef {
  id: BadgeId;
  title: string;
  category: string;
  /** Brand color of the medal artwork (frontend renders glyph + medallion). */
  badgeBg: string;
  tiers: BadgeTier[];
}

export const BADGE_REGISTRY: BadgeDef[] = [
  {
    id: 'wildfire',
    title: 'Wildfire',
    category: 'Streak',
    badgeBg: '#FF4B4B',
    tiers: [
      { level: 1, target: 3, name: 'Spark', description: 'Reach a 3-day streak' },
      { level: 2, target: 7, name: 'On Fire', description: 'Reach a 7-day streak' },
      { level: 3, target: 14, name: 'Blaze', description: 'Reach a 14-day streak' },
      { level: 4, target: 30, name: 'Wildfire', description: 'Reach a 30-day streak' },
      { level: 5, target: 50, name: 'Inferno', description: 'Reach a 50-day streak' },
    ],
  },
  {
    id: 'sage',
    title: 'Sage',
    category: 'XP',
    badgeBg: '#22C55E',
    tiers: [
      { level: 1, target: 100, name: 'Apprentice', description: 'Earn 100 XP' },
      { level: 2, target: 250, name: 'Scholar', description: 'Earn 250 XP' },
      { level: 3, target: 500, name: 'Sage', description: 'Earn 500 XP' },
      { level: 4, target: 1000, name: 'Mentor', description: 'Earn 1,000 XP' },
      { level: 5, target: 2500, name: 'Luminary', description: 'Earn 2,500 XP' },
    ],
  },
  {
    id: 'champion',
    title: 'Champion',
    category: 'Lessons',
    badgeBg: '#8B5CF6',
    tiers: [
      { level: 1, target: 1, name: 'First Step', description: 'Complete your first lesson' },
      { level: 2, target: 5, name: 'Warming Up', description: 'Complete 5 lessons' },
      { level: 3, target: 10, name: 'Getting Serious', description: 'Complete 10 lessons' },
      { level: 4, target: 25, name: 'Unstoppable', description: 'Complete 25 lessons' },
      { level: 5, target: 50, name: 'Legend', description: 'Complete 50 lessons' },
    ],
  },
  {
    id: 'sharpshooter',
    title: 'Sharpshooter',
    category: 'Accuracy',
    badgeBg: '#0172FD',
    tiers: [
      { level: 1, target: 10, name: 'Sharpshooter', description: 'Answer 10 questions correctly on the first try' },
      { level: 2, target: 25, name: 'Marksman', description: 'Answer 25 questions correctly on the first try' },
      { level: 3, target: 75, name: 'Deadshot', description: 'Answer 75 questions correctly on the first try' },
    ],
  },
  {
    id: 'explorer',
    title: 'Explorer',
    category: 'Courses',
    badgeBg: '#F59E0B',
    tiers: [
      { level: 1, target: 1, name: 'Explorer', description: 'Enroll in your first course' },
      { level: 2, target: 3, name: 'Trailblazer', description: 'Enroll in 3 courses' },
      { level: 3, target: 6, name: 'Pathfinder', description: 'Enroll in 6 courses' },
      { level: 4, target: 10, name: 'Globetrotter', description: 'Enroll in 10 courses' },
    ],
  },
  {
    id: 'marathon',
    title: 'Marathon',
    category: 'Consistency',
    badgeBg: '#EC4899',
    tiers: [
      { level: 1, target: 7, name: 'Warm-Up', description: 'Study on 7 different days' },
      { level: 2, target: 30, name: 'Marathoner', description: 'Study on 30 different days' },
      { level: 3, target: 100, name: 'Relentless', description: 'Study on 100 different days' },
    ],
  },
];

const BADGE_MAP = new Map<string, BadgeDef>(BADGE_REGISTRY.map((b) => [b.id, b]));

/** Shape of one unseen (unlocked but not yet viewed) achievement tier. */
export interface UnseenAchievement {
  badgeId: BadgeId;
  badgeTitle: string;
  category: string;
  tier: number;
  tierName: string;
  maxTier: number;
  description: string;
  badgeBg: string;
  unlockedAt: string;
}

@Injectable()
export class AchievementsService {
  constructor(private prisma: PrismaService) {}

  // ─── Metrics ────────────────────────────────────────────────────────────────

  /**
   * Computes the live value of every badge metric from real data:
   * - wildfire:     current day streak (StudentProfile)
   * - sage:         lifetime XP (StudentProfile)
   * - champion:     distinct lessons completed across all enrollments
   * - sharpshooter: step questions answered correctly on the first attempt
   * - explorer:     courses enrolled in
   * - marathon:     distinct calendar days with recorded study activity
   */
  private async loadMetrics(userId: string) {
    const profile = await this.prisma.studentProfile.upsert({
      where: { userId },
      create: { userId },
      update: {},
    });

    const [enrollments, firstTryCorrect, daysStudied] = await Promise.all([
      this.prisma.enrollment.findMany({
        where: { userId },
        select: { completedLessons: true },
      }),
      this.prisma.userStepAttempt.count({
        where: { userId, isCorrect: true, attemptNumber: 1 },
      }),
      this.prisma.userDailyActivity.count({ where: { userId } }),
    ]);

    const completedLessonSet = new Set<string>();
    for (const e of enrollments) {
      if (Array.isArray(e.completedLessons)) {
        for (const id of e.completedLessons as string[]) completedLessonSet.add(id);
      }
    }

    return {
      wildfire: profile.streakDays || 0,
      sage: profile.xp || 0,
      champion: completedLessonSet.size,
      sharpshooter: firstTryCorrect,
      explorer: enrollments.length,
      marathon: daysStudied,
      longestStreak: profile.longestStreak || 0,
    };
  }

  // ─── Unlock evaluation ──────────────────────────────────────────────────────

  /**
   * Evaluates every badge tier against live metrics and records unlocks.
   * The achievement itself IS the reward — unlocking only creates the
   * UserAchievement row; nothing is credited anywhere.
   */
  async checkAndAwardAchievements(userId: string) {
    const metrics = await this.loadMetrics(userId);

    const existing = await this.prisma.userAchievement.findMany({
      where: { userId },
      select: { achievementId: true, tier: true },
    });
    const haveKeys = new Set(existing.map((u) => `${u.achievementId}_${u.tier}`));

    const toCreate: { userId: string; achievementId: string; tier: number }[] = [];
    for (const badge of BADGE_REGISTRY) {
      const val = metrics[badge.id] ?? 0;
      for (const t of badge.tiers) {
        if (val >= t.target && !haveKeys.has(`${badge.id}_${t.level}`)) {
          toCreate.push({ userId, achievementId: badge.id, tier: t.level });
        }
      }
    }
    if (toCreate.length === 0) return [];

    // skipDuplicates makes concurrent evaluations race-safe (unique index on
    // userId+achievementId+tier) without throwing P2002.
    await this.prisma.userAchievement.createMany({ data: toCreate, skipDuplicates: true });

    const after = await this.prisma.userAchievement.findMany({
      where: { userId },
      select: { achievementId: true, tier: true },
    });
    const afterKeys = new Set(after.map((u) => `${u.achievementId}_${u.tier}`));

    return toCreate
      .filter((c) => afterKeys.has(`${c.achievementId}_${c.tier}`))
      .map((c) => {
        const badge = BADGE_MAP.get(c.achievementId)!;
        const tier = badge.tiers.find((t) => t.level === c.tier)!;
        return {
          achievementId: badge.id as BadgeId,
          title: badge.title,
          tier: c.tier,
          name: tier.name,
          description: tier.description,
        };
      });
  }

  // ─── Reads ──────────────────────────────────────────────────────────────────

  /**
   * Full achievement collection for the profile UI — every tier as its own
   * collectible (unlock date, seen state), live progress toward the next
   * locked tier per badge, and aggregate totals for the "X / Y unlocked" header.
   *
   * Also returns the raw live `metrics` (semantic names) so the profile's
   * Statistics row can be fed from this single call instead of recomputing
   * lessons-completed / days-studied client-side or in a second endpoint.
   */
  async getAchievements(userId: string) {
    // Lazy sync: unlocks are always up to date even if an event listener was missed.
    await this.checkAndAwardAchievements(userId);

    const [rawMetrics, unlocks] = await Promise.all([
      this.loadMetrics(userId),
      this.prisma.userAchievement.findMany({
        where: { userId },
        select: { achievementId: true, tier: true, unlockedAt: true, seenAt: true },
      }),
    ]);
    const unlockedMap = new Map(
      unlocks.map((u) => [`${u.achievementId}_${u.tier}`, u])
    );

    const achievements = BADGE_REGISTRY.map((badge) => {
      const currentMetricVal = rawMetrics[badge.id] ?? 0;

      let currentTier = 0;
      for (const t of badge.tiers) {
        if (unlockedMap.has(`${badge.id}_${t.level}`)) currentTier = Math.max(currentTier, t.level);
      }

      const nextGoal = badge.tiers.find((t) => !unlockedMap.has(`${badge.id}_${t.level}`)) ?? null;
      const maxTier = badge.tiers.length;
      const isCompleted = nextGoal === null;

      // Bar target: the next locked tier, or the final tier once completed.
      return {
        id: badge.id,
        title: badge.title,
        category: badge.category,
        badgeBg: badge.badgeBg,
        currentMetricVal,
        currentTier,
        maxTier,
        isCompleted,
        nextTarget: nextGoal ? nextGoal.target : badge.tiers[maxTier - 1].target,
        nextDescription: nextGoal ? nextGoal.description : badge.tiers[maxTier - 1].description,
        tiers: badge.tiers.map((t) => {
          const unlock = unlockedMap.get(`${badge.id}_${t.level}`);
          return {
            level: t.level,
            target: t.target,
            name: t.name,
            description: t.description,
            isUnlocked: unlock != null,
            isNew: unlock != null && unlock.seenAt == null,
            unlockedAt: unlock ? unlock.unlockedAt.toISOString() : null,
          };
        }),
      };
    });

    // Collection totals for the profile header ("12 / 25 unlocked").
    const allTiers = achievements.flatMap((a) => a.tiers);
    const totals = {
      unlocked: allTiers.filter((t) => t.isUnlocked).length,
      total: allTiers.length,
    };

    // Semantic-named live stats for the profile's Statistics row.
    const metrics = {
      currentStreak: rawMetrics.wildfire,
      longestStreak: rawMetrics.longestStreak,
      totalXp: rawMetrics.sage,
      lessonsCompleted: rawMetrics.champion,
      firstTryCorrectAnswers: rawMetrics.sharpshooter,
      coursesEnrolled: rawMetrics.explorer,
      daysStudied: rawMetrics.marathon,
    };

    return { totals, achievements, metrics };
  }

  /**
   * Unlocked-but-not-yet-seen tiers across every badge — the feed the Herald
   * notification banner is built on. Viewing the celebration scene or the
   * collection marks them seen (markAchievementsSeen).
   */
  async getUnseenAchievements(userId: string): Promise<{ unseen: UnseenAchievement[] }> {
    await this.checkAndAwardAchievements(userId);

    const unlocks = await this.prisma.userAchievement.findMany({
      where: { userId, seenAt: null },
      orderBy: [{ unlockedAt: 'asc' }, { tier: 'asc' }],
    });

    const unseen = unlocks.flatMap((u) => {
      const badge = BADGE_MAP.get(u.achievementId);
      const tier = badge?.tiers.find((t) => t.level === u.tier);
      if (!badge || !tier) return [];
      const dto: UnseenAchievement = {
        badgeId: badge.id,
        badgeTitle: badge.title,
        category: badge.category,
        tier: tier.level,
        tierName: tier.name,
        maxTier: badge.tiers.length,
        description: tier.description,
        badgeBg: badge.badgeBg,
        unlockedAt: u.unlockedAt.toISOString(),
      };
      return [dto];
    });

    return { unseen };
  }

  async getUserAchievements(userId: string) {
    return this.getAchievements(userId);
  }

  // ─── Seen tracking ──────────────────────────────────────────────────────────

  /**
   * Marks an unlocked tier as viewed — purely presentational bookkeeping so
   * Herald surfaces each unlock once. Idempotent: re-marking is a no-op.
   */
  async markAchievementSeen(userId: string, badgeId: string, level: number) {
    if (!BADGE_MAP.has(badgeId)) {
      throw new BadRequestException('Badge not found.');
    }

    const result = await this.prisma.userAchievement.updateMany({
      where: { userId, achievementId: badgeId, tier: level, seenAt: null },
      data: { seenAt: new Date() },
    });

    return { success: true, alreadySeen: result.count === 0 };
  }
}
