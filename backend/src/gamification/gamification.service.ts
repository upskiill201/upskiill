import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class GamificationService {
  constructor(private prisma: PrismaService) {}

  /**
   * Returns the student's current gamification state.
   * Creates a StudentProfile with defaults (30 XP starter grant) if one doesn't exist.
   * Reconciles daily streak resets (with auto-consume freezes) and daily quests reset.
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
    if (profile.lastActiveAt) {
      const lastActiveStr = this.getLocalDayString(profile.lastActiveAt, timezoneOffsetMinutes);
      const diffDays = this.getDaysDiff(todayStr, lastActiveStr);

      if (diffDays > 1) {
        // Missed a day! Check if they have a streak freeze banked
        if (profile.streakFreezeBank > 0) {
          // Consume 1 freeze
          updatedFields.streakFreezeBank = profile.streakFreezeBank - 1;
          
          // "Cheat" the lastActiveAt timestamp to yesterday midnight UTC to maintain the streak
          const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);
          updatedFields.lastActiveAt = yesterday;
          
          console.log(`[Gamification] Streak freeze consumed for user ${userId}. Streak maintained at ${profile.streakDays} days.`);
        } else {
          // No freeze left — streak resets to 0
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

    // Save profile updates if any changed
    if (Object.keys(updatedFields).length > 0) {
      profile = await this.prisma.studentProfile.update({
        where: { userId },
        data: updatedFields,
      });
    }

    return this.buildResponse(profile);
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
   * Alternative refill: refilling lives using 100 XP points.
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

    // Quest config
    const rewards: Record<string, number> = {
      'daily-study': 10,
      'daily-lesson': 20,
      'daily-consistent': 10,
    };

    const xpReward = rewards[questId] || 10;
    completed.push(questId);

    // Any quest claim counts as an XP-earning activity to update/increment the streak
    const now = new Date();
    const todayStr = this.getLocalDayString(now, timezoneOffsetMinutes);
    let newStreak = profile.streakDays;

    if (profile.lastActiveAt) {
      const lastActiveStr = this.getLocalDayString(profile.lastActiveAt, timezoneOffsetMinutes);
      const diffDays = this.getDaysDiff(todayStr, lastActiveStr);

      if (diffDays === 1) {
        newStreak = profile.streakDays + 1;
      } else if (diffDays === 0) {
        // Already active today
        newStreak = profile.streakDays || 1;
      } else {
        // Reset/start new streak
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

    return this.buildResponse(updated);
  }

  // ─── Private Helpers ────────────────────────────────────────────────────────

  /**
   * Converts a date to client local calendar day string (YYYY-MM-DD).
   */
  private getLocalDayString(utcDate: Date, timezoneOffsetMinutes: number): string {
    // client timezoneOffsetMinutes: positive if behind UTC, negative if ahead
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
    const livesRestored = Math.floor(hoursElapsed / 4); // 1 life per 4 hours

    const newLives = Math.min(profile.lives + livesRestored, profile.maxLives);
    return { lives: newLives };
  }

  /**
   * Builds the formatted API payload.
   */
  private buildResponse(profile: {
    xp: number;
    streakDays: number;
    lives: number;
    maxLives: number;
    livesLastLostAt: Date | null;
    streakFreezeBank: number;
    completedQuests: any;
  }) {
    let livesRefillAt: string | null = null;

    if (profile.livesLastLostAt && profile.lives < profile.maxLives) {
      const lostAt = new Date(profile.livesLastLostAt).getTime();
      const msElapsed = Date.now() - lostAt;
      const hoursElapsed = msElapsed / (1000 * 60 * 60);
      const nextRefillHour = (Math.floor(hoursElapsed / 4) + 1) * 4;
      const nextRefillMs = lostAt + nextRefillHour * 60 * 60 * 1000;
      livesRefillAt = new Date(nextRefillMs).toISOString();
    }

    return {
      xp: profile.xp,
      streakDays: profile.streakDays,
      lives: profile.lives,
      maxLives: profile.maxLives,
      streakFreezeBank: profile.streakFreezeBank,
      completedQuests: Array.isArray(profile.completedQuests) ? profile.completedQuests : [],
      livesRefillAt,
    };
  }
}
