import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class GamificationService {
  constructor(private prisma: PrismaService) {}

  /**
   * Returns the student's current gamification state.
   * Creates a StudentProfile with defaults if one doesn't exist.
   * Reconciles daily streak resets, daily quests, and daily login rewards.
   */
  async getMyStats(userId: string, timezoneOffsetMinutes = 0) {
    let profile = await this.prisma.studentProfile.upsert({
      where: { userId },
      create: { userId },
      update: {},
    });

    const now = new Date();
    const todayStr = this.getLocalDayString(now, timezoneOffsetMinutes);
    let updatedFields: any = {};

    // 1. Timezone-aware Daily Streak Check and Freeze Consumption
    const lastStreakCheckDate = profile.lastStreakEarnedAt || profile.lastActiveAt;
    if (lastStreakCheckDate) {
      const lastActiveStr = this.getLocalDayString(lastStreakCheckDate, timezoneOffsetMinutes);
      const diffDays = this.getDaysDiff(todayStr, lastActiveStr);

      if (diffDays > 1) {
        // Missed a day! Check if they have a streak freeze banked
        if (profile.streakFreezeBank > 0) {
          updatedFields.streakFreezeBank = profile.streakFreezeBank - 1;
          // Set lastStreakEarnedAt to yesterday to preserve streak
          const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);
          updatedFields.lastStreakEarnedAt = yesterday;
          console.log(`[Gamification] Streak freeze consumed for user ${userId}. Streak maintained.`);
        } else {
          updatedFields.streakDays = 0;
        }
      }
    }

    // 2. Timezone-aware Daily Quests reset
    if (profile.lastQuestResetAt) {
      const lastResetStr = this.getLocalDayString(profile.lastQuestResetAt, timezoneOffsetMinutes);
      if (todayStr !== lastResetStr) {
        updatedFields.completedQuests = [];
        updatedFields.lastQuestResetAt = now;
      }
    } else {
      updatedFields.completedQuests = [];
      updatedFields.lastQuestResetAt = now;
    }

    // 3. Lives Refill catching up with elapsed time
    const refilled = this.computeRefill(profile);
    if (refilled.lives !== profile.lives) {
      updatedFields.lives = refilled.lives;
      updatedFields.livesLastLostAt = refilled.lives >= profile.maxLives ? null : profile.livesLastLostAt;
    }

    // 4. Timezone-aware Daily Login Reward Missed-Day Verification (Freeze Protection)
    if (profile.lastRewardClaimedAt) {
      const lastClaimStr = this.getLocalDayString(profile.lastRewardClaimedAt, timezoneOffsetMinutes);
      const diffClaims = this.getDaysDiff(todayStr, lastClaimStr);

      // If they missed at least one calendar day of claiming
      if (diffClaims > 1) {
        // Does the user have a streak freeze banked to protect their reward cycle position?
        if (profile.streakFreezeBank > 0) {
          // Consume 1 freeze to protect the daily reward cycle position
          updatedFields.streakFreezeBank = (updatedFields.streakFreezeBank ?? profile.streakFreezeBank) - 1;
          
          // Set lastRewardClaimedAt to yesterday to prevent resetting the cycle
          const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);
          updatedFields.lastRewardClaimedAt = yesterday;
          console.log(`[Gamification] Streak freeze consumed to protect Daily Reward cycle for user ${userId}.`);
        } else {
          // No freeze left — cycle resets to Day 1
          updatedFields.dailyRewardCyclePosition = 1;
        }
      }
    }

    // Save profile updates if any changed
    if (Object.keys(updatedFields).length > 0) {
      profile = await this.prisma.studentProfile.update({
        where: { userId },
        data: updatedFields,
      });
    }

    return this.buildResponse(profile, timezoneOffsetMinutes);
  }

  /**
   * Deducts 1 life on wrong answer.
   */
  async loseLife(userId: string) {
    const profile = await this.prisma.studentProfile.upsert({
      where: { userId },
      create: { userId },
      update: {},
    });

    const refilled = this.computeRefill(profile);
    const newLives = Math.max(0, refilled.lives - 1);
    const now = new Date();

    const updated = await this.prisma.studentProfile.update({
      where: { userId },
      data: {
        lives: newLives,
        livesLastLostAt: newLives < profile.maxLives ? now : null,
      },
    });

    return this.buildResponse(updated);
  }

  /**
   * Manual force time-based refill endpoint.
   */
  async refillLives(userId: string) {
    const profile = await this.prisma.studentProfile.upsert({
      where: { userId },
      create: { userId },
      update: {},
    });

    const refilled = this.computeRefill(profile);

    if (refilled.lives !== profile.lives) {
      const updated = await this.prisma.studentProfile.update({
        where: { userId },
        data: {
          lives: refilled.lives,
          livesLastLostAt: refilled.lives >= profile.maxLives ? null : profile.livesLastLostAt,
        },
      });
      return this.buildResponse(updated);
    }

    return this.buildResponse(profile);
  }

  /**
   * Refilling lives using 100 XP points.
   */
  async refillLivesWithXp(userId: string) {
    const profile = await this.prisma.studentProfile.upsert({
      where: { userId },
      create: { userId },
      update: {},
    });

    if (profile.xp < 100) {
      throw new BadRequestException('Insufficient XP balance. A life refill costs 100 XP.');
    }

    const updated = await this.prisma.studentProfile.update({
      where: { userId },
      data: {
        xp: { decrement: 100 },
        lives: profile.maxLives,
        livesLastLostAt: null,
      },
    });

    return this.buildResponse(updated);
  }

  /**
   * Purchase a streak freeze card for 150 XP.
   */
  async buyStreakFreeze(userId: string) {
    const profile = await this.prisma.studentProfile.upsert({
      where: { userId },
      create: { userId },
      update: {},
    });

    if (profile.xp < 150) {
      throw new BadRequestException('Insufficient XP balance. A streak freeze costs 150 XP.');
    }

    const updated = await this.prisma.studentProfile.update({
      where: { userId },
      data: {
        xp: { decrement: 150 },
        streakFreezeBank: { increment: 1 },
      },
    });

    return this.buildResponse(updated);
  }

  /**
   * Claims a completed Daily Quest, awards XP, and triggers a daily active streak update.
   */
  async claimQuest(userId: string, questId: string, timezoneOffsetMinutes = 0) {
    const profile = await this.prisma.studentProfile.upsert({
      where: { userId },
      create: { userId },
      update: {},
    });

    const completed = Array.isArray(profile.completedQuests)
      ? (profile.completedQuests as string[])
      : [];

    if (completed.includes(questId)) {
      throw new BadRequestException('Daily quest reward already claimed today.');
    }

    const rewards: Record<string, number> = {
      'daily-study': 10,
      'daily-lesson': 20,
      'daily-consistent': 10,
    };

    const xpReward = rewards[questId] || 10;
    completed.push(questId);

    const now = new Date();
    const todayStr = this.getLocalDayString(now, timezoneOffsetMinutes);
    let newStreak = profile.streakDays;

    if (profile.lastActiveAt) {
      const lastActiveStr = this.getLocalDayString(profile.lastActiveAt, timezoneOffsetMinutes);
      const diffDays = this.getDaysDiff(todayStr, lastActiveStr);

      if (diffDays === 1) {
        newStreak = profile.streakDays + 1;
      } else if (diffDays === 0) {
        newStreak = profile.streakDays || 1;
      } else {
        newStreak = 1;
      }
    } else {
      newStreak = 1;
    }

    const updated = await this.prisma.studentProfile.update({
      where: { userId },
      data: {
        xp: { increment: xpReward },
        completedQuests: completed,
        lastQuestResetAt: now,
        lastActiveAt: now,
        streakDays: newStreak,
      },
    });

    return this.buildResponse(updated, timezoneOffsetMinutes);
  }

  /**
   * Claims the Daily Login Reward (chest).
   * Verifies timezone eligibility, applies streak freeze protection if they missed a day,
   * awards the day's XP, and updates their cycle position (1 to 7).
   */
  async claimDailyReward(userId: string, timezoneOffsetMinutes = 0) {
    const profile = await this.prisma.studentProfile.upsert({
      where: { userId },
      create: { userId },
      update: {},
    });

    const now = new Date();
    const todayStr = this.getLocalDayString(now, timezoneOffsetMinutes);

    // 1. Check eligibility
    if (profile.lastRewardClaimedAt) {
      const lastClaimStr = this.getLocalDayString(profile.lastRewardClaimedAt, timezoneOffsetMinutes);
      if (todayStr === lastClaimStr) {
        throw new BadRequestException('Daily reward already claimed today.');
      }
    }

    // 2. Resolve cycle position after potential missed day(s)
    let currentPosition = profile.dailyRewardCyclePosition;
    let newFreezeCount = profile.streakFreezeBank;
    let cheatLastClaimedDate: Date | null = null;

    if (profile.lastRewardClaimedAt) {
      const lastClaimStr = this.getLocalDayString(profile.lastRewardClaimedAt, timezoneOffsetMinutes);
      const diffClaims = this.getDaysDiff(todayStr, lastClaimStr);

      if (diffClaims > 1) {
        // Missed a day! Does freeze bank protect it?
        if (profile.streakFreezeBank > 0) {
          newFreezeCount = profile.streakFreezeBank - 1;
          // Freeze consumed — do not reset position!
          console.log(`[Gamification] Freeze consumed to protect Daily Reward claim for user ${userId}.`);
        } else {
          // Reset cycle position to 1
          currentPosition = 1;
        }
      }
    }

    // 3. Compute day's reward XP
    const rewardsMap: Record<number, number> = {
      1: 5,
      2: 10,
      3: 15,
      4: 20,
      5: 25,
      6: 30,
    };

    let xpReward = rewardsMap[currentPosition] || 5;

    // Day 7 is the Mystery Chest (randomized 50-100 XP)
    if (currentPosition === 7) {
      xpReward = Math.floor(Math.random() * (100 - 50 + 1)) + 50;
    }

    // 4. Update cycle position for next claim
    const nextPosition = currentPosition === 7 ? 1 : currentPosition + 1;

    // 5. Commit state updates
    const updated = await this.prisma.studentProfile.update({
      where: { userId },
      data: {
        xp: { increment: xpReward },
        lastRewardClaimedAt: now,
        dailyRewardCyclePosition: nextPosition,
        streakFreezeBank: newFreezeCount,
      },
    });

    return {
      ...(await this.buildResponse(updated, timezoneOffsetMinutes)),
      justClaimedXp: xpReward,
      justClaimedCycleDay: currentPosition,
    };
  }

  // ─── Private Helpers ────────────────────────────────────────────────────────

  /**
   * Converts a date to client local calendar day string (YYYY-MM-DD).
   */
  private getLocalDayString(utcDate: Date, timezoneOffsetMinutes: number): string {
    const localTime = new Date(utcDate.getTime() - timezoneOffsetMinutes * 60 * 1000);
    return `${localTime.getUTCFullYear()}-${String(localTime.getUTCMonth() + 1).padStart(2, '0')}-${String(localTime.getUTCDate()).padStart(2, '0')}`;
  }

  /**
   * Calculates difference in calendar days.
   */
  private getDaysDiff(day1: string, day2: string): number {
    const d1 = new Date(day1 + 'T00:00:00Z');
    const d2 = new Date(day2 + 'T00:00:00Z');
    return Math.round((d1.getTime() - d2.getTime()) / (1000 * 60 * 60 * 24));
  }

  /**
   * Computes how many lives should be refilled based on elapsed time.
   */
  private computeRefill(profile: { lives: number; maxLives: number; livesLastLostAt: Date | null }) {
    if (!profile.livesLastLostAt || profile.lives >= profile.maxLives) {
      return { lives: profile.lives };
    }

    const now = Date.now();
    const lostAt = new Date(profile.livesLastLostAt).getTime();
    const msElapsed = now - lostAt;
    const hoursElapsed = msElapsed / (1000 * 60 * 60);
    const livesRestored = Math.floor(hoursElapsed / 4);

    const newLives = Math.min(profile.lives + livesRestored, profile.maxLives);
    return { lives: newLives };
  }

  /**
   * Calculates milliseconds remaining until the user's next local midnight.
   */
  private getNextMidnightMs(now: Date, timezoneOffsetMinutes: number): number {
    const localTime = new Date(now.getTime() - timezoneOffsetMinutes * 60 * 1000);
    const nextDay = new Date(localTime.getTime());
    nextDay.setUTCDate(nextDay.getUTCDate() + 1);
    nextDay.setUTCHours(0, 0, 0, 0);
    const nextLocalMidnightUtc = nextDay.getTime() + timezoneOffsetMinutes * 60 * 1000;
    return Math.max(0, nextLocalMidnightUtc - now.getTime());
  }

  /**
   * Builds the formatted API payload.
   */
  private async buildResponse(
    profile: {
      xp: number;
      streakDays: number;
      lives: number;
      maxLives: number;
      livesLastLostAt: Date | null;
      streakFreezeBank: number;
      completedQuests: any;
      lastRewardClaimedAt: Date | null;
      dailyRewardCyclePosition: number;
    },
    timezoneOffsetMinutes = 0,
  ) {
    let livesRefillAt: string | null = null;

    if (profile.livesLastLostAt && profile.lives < profile.maxLives) {
      const lostAt = new Date(profile.livesLastLostAt).getTime();
      const msElapsed = Date.now() - lostAt;
      const hoursElapsed = msElapsed / (1000 * 60 * 60);
      const nextRefillHour = (Math.floor(hoursElapsed / 4) + 1) * 4;
      const nextRefillMs = lostAt + nextRefillHour * 60 * 60 * 1000;
      livesRefillAt = new Date(nextRefillMs).toISOString();
    }

    // Daily login reward eligibility and countdown
    const now = new Date();
    let isEligibleForReward = true;
    if (profile.lastRewardClaimedAt) {
      const todayStr = this.getLocalDayString(now, timezoneOffsetMinutes);
      const lastClaimStr = this.getLocalDayString(profile.lastRewardClaimedAt, timezoneOffsetMinutes);
      isEligibleForReward = todayStr !== lastClaimStr;
    }

    const nextRewardClaimInMs = this.getNextMidnightMs(now, timezoneOffsetMinutes);

    return {
      xp: profile.xp,
      streakDays: profile.streakDays,
      lives: profile.lives,
      maxLives: profile.maxLives,
      streakFreezeBank: profile.streakFreezeBank,
      completedQuests: Array.isArray(profile.completedQuests) ? profile.completedQuests : [],
      livesRefillAt,
      // Daily reward fields
      lastRewardClaimedAt: profile.lastRewardClaimedAt ? profile.lastRewardClaimedAt.toISOString() : null,
      dailyRewardCyclePosition: profile.dailyRewardCyclePosition,
      isEligibleForReward,
      nextRewardClaimInMs,
    };
  }
}
