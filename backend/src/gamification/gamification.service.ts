import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { XpAwardedEvent } from '../league/events/xp-awarded.event';

@Injectable()
export class GamificationService {
  constructor(
    private prisma: PrismaService,
    private eventEmitter: EventEmitter2,
  ) {}

  /**
   * Returns the student's current gamification state.
   * Creates a StudentProfile with defaults if one doesn't exist.
   * Reconciles daily streak resets, multi-day freeze consumption, and daily login rewards.
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

    // 1. Timezone-aware Daily Streak Check and Multi-Day Freeze Consumption
    let streakStatus: 'NORMAL' | 'SAVED' | 'RESET' = 'NORMAL';
    let lostStreakCount = 0;

    if (profile.lastStreakEarnedAt && profile.streakDays > 0) {
      const lastActiveStr = this.getLocalDayString(profile.lastStreakEarnedAt, timezoneOffsetMinutes);
      const diffDays = this.getDaysDiff(todayStr, lastActiveStr);

      if (diffDays > 1) {
        const missedDays = diffDays - 1;
        const availableFreezes = profile.streakFreezeBank || 0;

        if (availableFreezes >= missedDays) {
          // Protected! Consume exact missed days of freezes
          updatedFields.streakFreezeBank = availableFreezes - missedDays;
          const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);
          updatedFields.lastStreakEarnedAt = yesterday;
          streakStatus = 'SAVED';

          // Idempotent audit log for freeze usage
          const freezeKey = `freeze_consumed:${userId}_${todayStr}_${missedDays}`;
          try {
            await this.prisma.rewardTransaction.upsert({
              where: { idempotencyKey: freezeKey },
              update: {},
              create: {
                userId,
                currency: 'FREEZE',
                amount: -missedDays,
                sourceType: 'STREAK',
                sourceId: `streak_protected_${todayStr}`,
                idempotencyKey: freezeKey,
              },
            });
          } catch (e) {
            // Ignore duplicate key race condition
          }
        } else {
          // Freeze buffer exhausted! Wipe streak
          lostStreakCount = profile.streakDays;
          updatedFields.streakDays = 0;
          updatedFields.streakFreezeBank = 0; // Exhausted
          streakStatus = 'RESET';
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

      if (diffClaims > 1) {
        const currentFreezes = updatedFields.streakFreezeBank ?? profile.streakFreezeBank;
        if (currentFreezes > 0) {
          updatedFields.streakFreezeBank = Math.max(0, currentFreezes - 1);
          const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);
          updatedFields.lastRewardClaimedAt = yesterday;
        } else {
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

    return this.buildResponse(profile, timezoneOffsetMinutes, streakStatus, lostStreakCount);
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
   * Refilling lives using 120 Coins/XP.
   */
  async refillLivesWithXp(userId: string) {
    const profile = await this.prisma.studentProfile.upsert({
      where: { userId },
      create: { userId },
      update: {},
    });

    if (profile.coins < 120 && profile.xp < 100) {
      throw new BadRequestException('Insufficient balance to refill hearts.');
    }

    const updated = await this.prisma.studentProfile.update({
      where: { userId },
      data: {
        ...(profile.coins >= 120 ? { coins: { decrement: 120 } } : { xp: { decrement: 100 } }),
        lives: profile.maxLives,
        livesLastLostAt: null,
      },
    });

    return this.buildResponse(updated);
  }

  /**
   * Purchase a streak freeze card with max capacity enforcement (max 2, VIP max 3).
   */
  async buyStreakFreeze(userId: string) {
    const profile = await this.prisma.studentProfile.upsert({
      where: { userId },
      create: { userId },
      update: {},
    });

    const maxFreezes = profile.streakDays >= 7 ? 3 : 2;
    if (profile.streakFreezeBank >= maxFreezes) {
      throw new BadRequestException(`Maximum streak freeze capacity reached (${maxFreezes} max).`);
    }

    if (profile.coins < 200 && profile.xp < 150) {
      throw new BadRequestException('Insufficient balance to purchase a streak freeze.');
    }

    const updated = await this.prisma.studentProfile.update({
      where: { userId },
      data: {
        ...(profile.coins >= 200 ? { coins: { decrement: 200 } } : { xp: { decrement: 150 } }),
        streakFreezeBank: { increment: 1 },
      },
    });

    await this.prisma.rewardTransaction.create({
      data: {
        userId,
        currency: 'FREEZE',
        amount: 1,
        sourceType: 'SHOP',
        sourceId: 'buy_freeze',
        idempotencyKey: `buy_freeze:${userId}_${Date.now()}`,
      },
    });

    return this.buildResponse(updated);
  }

  /**
   * Repair a lost streak using 150 Coins or 100 XP.
   */
  async repairStreak(userId: string, timezoneOffsetMinutes = 0) {
    const profile = await this.prisma.studentProfile.upsert({
      where: { userId },
      create: { userId },
      update: {},
    });

    if (profile.coins < 150 && profile.xp < 100) {
      throw new BadRequestException('Insufficient balance to repair streak.');
    }

    const now = new Date();
    const restoredCount = Math.max(1, profile.longestStreak || 1);

    const updated = await this.prisma.studentProfile.update({
      where: { userId },
      data: {
        ...(profile.coins >= 150 ? { coins: { decrement: 150 } } : { xp: { decrement: 100 } }),
        streakDays: restoredCount,
        lastStreakEarnedAt: now,
      },
    });

    return this.buildResponse(updated, timezoneOffsetMinutes);
  }

  /**
   * Claims a completed Daily Quest, awards XP, and keeps streak intact.
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

    const updated = await this.prisma.studentProfile.update({
      where: { userId },
      data: {
        xp: { increment: xpReward },
        completedQuests: completed,
        lastQuestResetAt: now,
        lastActiveAt: now,
      },
    });

    // Credit the weekly league standings (async, non-blocking).
    this.eventEmitter.emit('xp.awarded', new XpAwardedEvent(userId, xpReward, 'QUEST'));

    return this.buildResponse(updated, timezoneOffsetMinutes);
  }

  /**
   * Claims the Daily Login Reward (chest).
   */
  async claimDailyReward(userId: string, timezoneOffsetMinutes = 0) {
    const profile = await this.prisma.studentProfile.upsert({
      where: { userId },
      create: { userId },
      update: {},
    });

    const now = new Date();
    const todayStr = this.getLocalDayString(now, timezoneOffsetMinutes);

    if (profile.lastRewardClaimedAt) {
      const lastClaimStr = this.getLocalDayString(profile.lastRewardClaimedAt, timezoneOffsetMinutes);
      if (todayStr === lastClaimStr) {
        throw new BadRequestException('Daily reward already claimed today.');
      }
    }

    let currentPosition = profile.dailyRewardCyclePosition || 1;
    const coinsReward = currentPosition === 7 ? 30 : 20;
    const xpReward = currentPosition === 7 ? 50 : 10;
    const nextPosition = currentPosition === 7 ? 1 : currentPosition + 1;

    const updated = await this.prisma.studentProfile.update({
      where: { userId },
      data: {
        coins: { increment: coinsReward },
        xp: { increment: xpReward },
        lastRewardClaimedAt: now,
        dailyRewardCyclePosition: nextPosition,
      },
    });

    // Credit the weekly league standings (async, non-blocking).
    this.eventEmitter.emit('xp.awarded', new XpAwardedEvent(userId, xpReward, 'DAILY_REWARD'));

    const idempotencyKey = `daily_login_claim:${userId}_${todayStr}`;
    await this.prisma.rewardTransaction.upsert({
      where: { idempotencyKey },
      update: {},
      create: {
        userId,
        currency: 'COINS',
        amount: coinsReward,
        sourceType: 'DAILY_LOGIN_REWARD',
        sourceId: `day_${currentPosition}`,
        idempotencyKey,
      },
    });

    return {
      ...(await this.buildResponse(updated, timezoneOffsetMinutes)),
      justClaimedCoins: coinsReward,
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
   * Calculates difference in calendar days based strictly on UTC calendar dates (DST immune).
   */
  private getDaysDiff(day1: string, day2: string): number {
    const [y1, m1, d1] = day1.split('-').map(Number);
    const [y2, m2, d2] = day2.split('-').map(Number);
    const utc1 = Date.UTC(y1, m1 - 1, d1);
    const utc2 = Date.UTC(y2, m2 - 1, d2);
    return Math.round((utc1 - utc2) / (1000 * 60 * 60 * 24));
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
   * Helper method to award Gems/Coins to a user and log transaction.
   */
  async grantTestReward(
    userId: string,
    dto: { coins?: number; xp?: number; hearts?: number; streak?: number },
  ) {
    const profile = await this.prisma.studentProfile.findUnique({ where: { userId } });
    if (!profile) return null;

    const updateData: any = {};
    if (dto.coins) updateData.coins = { increment: dto.coins };
    if (dto.xp) updateData.xp = { increment: dto.xp };
    if (dto.hearts) {
      updateData.lives = Math.min(profile.maxLives, profile.lives + dto.hearts);
    }
    if (dto.streak) updateData.streakDays = { increment: dto.streak };

    const updated = await this.prisma.studentProfile.update({
      where: { userId },
      data: updateData,
    });

    return this.buildResponse(updated);
  }

  /**
   * Builds the formatted API payload.
   */
  private async buildResponse(
    profile: {
      xp: number;
      streakDays: number;
      longestStreak?: number;
      gems?: number;
      coins?: number;
      lives: number;
      maxLives: number;
      livesLastLostAt: Date | null;
      streakFreezeBank: number;
      completedQuests: any;
      lastRewardClaimedAt: Date | null;
      dailyRewardCyclePosition: number;
      lastLessonCompletedAt?: Date | null;
    },
    timezoneOffsetMinutes = 0,
    streakStatus: 'NORMAL' | 'SAVED' | 'RESET' = 'NORMAL',
    lostStreakCount = 0,
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

    const now = new Date();
    let isEligibleForReward = true;
    if (profile.lastRewardClaimedAt) {
      const lastClaimStr = this.getLocalDayString(profile.lastRewardClaimedAt, timezoneOffsetMinutes);
      const todayStr = this.getLocalDayString(now, timezoneOffsetMinutes);
      isEligibleForReward = lastClaimStr !== todayStr;
    }

    const nextRewardClaimInMs = isEligibleForReward ? 0 : this.getNextMidnightMs(now, timezoneOffsetMinutes);

    return {
      xp: profile.xp,
      gems: profile.coins ?? 0,
      coins: profile.coins ?? 0,
      streakDays: profile.streakDays,
      longestStreak: Math.max(profile.longestStreak ?? 0, profile.streakDays),
      lives: profile.lives,
      maxLives: profile.maxLives,
      livesRefillAt,
      streakFreezeBank: profile.streakFreezeBank,
      streakStatus,
      lostStreakCount,
      lastLessonCompletedAt: profile.lastLessonCompletedAt ? profile.lastLessonCompletedAt.toISOString() : null,
      completedQuests: Array.isArray(profile.completedQuests) ? profile.completedQuests : [],
      lastRewardClaimedAt: profile.lastRewardClaimedAt ? profile.lastRewardClaimedAt.toISOString() : null,
      dailyRewardCyclePosition: profile.dailyRewardCyclePosition || 1,
      isEligibleForReward,
      nextRewardClaimInMs,
      userLevel: Math.floor(profile.xp / 100) + 1,
      xpInCurrentLevel: profile.xp % 100,
      xpTargetForCurrentLevel: 100,
    };
  }
}
