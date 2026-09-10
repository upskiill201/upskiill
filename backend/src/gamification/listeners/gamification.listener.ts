import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { LessonCompletedEvent } from '../../course/events/lesson-completed.event';
import { GamificationService } from '../gamification.service';
import { AchievementsService } from '../achievements.service';
import { MissionsService } from '../../missions/missions.service';
import { MonthlyQuestService } from '../../monthly-quest/monthly-quest.service';
import { ProgressService } from '../../progress/progress.service';
import { ChestService } from '../../chest/chest.service';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class GamificationListener {
  private readonly logger = new Logger(GamificationListener.name);

  constructor(
    private readonly gamificationService: GamificationService,
    private readonly achievementsService: AchievementsService,
    private readonly missionsService: MissionsService,
    private readonly monthlyQuestService: MonthlyQuestService,
    private readonly progressService: ProgressService,
    private readonly chestService: ChestService,
    private readonly prisma: PrismaService,
  ) {}

  @OnEvent('lesson.completed', { async: true })
  async handleLessonCompleted(event: LessonCompletedEvent) {
    this.logger.log(
      `[Event] Asynchronously processing lesson.completed for user ${event.userId}, lesson ${event.lessonId}`,
    );

    if (!event.isFirstCompletion) {
      this.logger.log(
        `[Event] Lesson ${event.lessonId} was re-completed by user ${event.userId}. Skipping downstream rewards.`,
      );
      return;
    }

    const { userId, lessonId, timezoneOffsetMinutes, xpEarned, streakDays, isFirstStreakOfDay } = event;

    // 1. Advance daily missions (LESSON_COUNT, XP_EARNED, STREAK_ACTIVE)
    try {
      await this.missionsService.updateMissionProgress(userId, 'LESSON_COUNT', 1, timezoneOffsetMinutes);
      await this.missionsService.updateMissionProgress(userId, 'XP_EARNED', xpEarned || 10, timezoneOffsetMinutes);
      if (isFirstStreakOfDay) {
        await this.missionsService.updateMissionProgress(userId, 'STREAK_ACTIVE', 1, timezoneOffsetMinutes);
      }
    } catch (err) {
      this.logger.error(`[Event Error] Failed updating missions in background listener`, err);
    }

    // 2. Unlock Today's Daily Chest
    try {
      await this.chestService.unlockTodayChest(userId, timezoneOffsetMinutes);
    } catch (err) {
      this.logger.error(`[Event Error] Failed unlocking today chest in background listener`, err);
    }

    // 3. Record daily activity & weekly aggregate in ProgressService (Single source of truth)
    // Real wall-clock study time flows through so Learning Stats hours are accurate
    // (undefined falls back to the service's 300s estimate for legacy callers).
    try {
      await this.progressService.recordLearningActivity(
        userId,
        xpEarned || 10,
        timezoneOffsetMinutes,
        event.timeSpentSeconds,
      );
    } catch (err) {
      this.logger.error(`[Event Error] Failed recording learning activity`, err);
    }

    // 3b. Advance the Monthly Quest (goal-day counting). Runs after
    // recordLearningActivity — evaluateProgress reads the UserDailyActivity
    // row that step just wrote.
    try {
      await this.monthlyQuestService.evaluateProgress(userId, undefined, timezoneOffsetMinutes);
    } catch (err) {
      this.logger.error(`[Event Error] Failed evaluating monthly quest`, err);
    }

    // 4. Audit Log & Denormalized UserStats Update
    try {
      const profile = await this.prisma.studentProfile.findUnique({ where: { userId } });
      const now = new Date();

      if (profile) {
        await this.prisma.userStats.upsert({
          where: { userId },
          create: {
            userId,
            totalXp: profile.xp,
            totalCoins: profile.coins,
            currentStreak: profile.streakDays,
            longestStreak: profile.longestStreak,
            lessonsCompleted: 1,
            lastActivityAt: now,
          },
          update: {
            totalXp: profile.xp,
            totalCoins: profile.coins,
            currentStreak: profile.streakDays,
            longestStreak: profile.longestStreak,
            lessonsCompleted: { increment: 1 },
            lastActivityAt: now,
          },
        });

        await this.prisma.learningEvent.create({
          data: {
            userId,
            eventType: 'LESSON_COMPLETED',
            entityType: 'lesson',
            entityId: lessonId,
            metadata: { xp: xpEarned, coins: 5, streak: streakDays },
          },
        });

        // 3-Day streak spin milestone check
        if (isFirstStreakOfDay && streakDays > 0 && streakDays % 3 === 0) {
          await this.prisma.spinClaim.create({
            data: {
              userId,
              rewardType: 'SPIN_EARNED',
              rewardVal: 1,
            },
          });
          this.logger.log(`[Event] Awarded Lucky Wheel Spin to user ${userId} for ${streakDays}-day streak!`);
        }
      }
    } catch (err) {
      this.logger.error(`[Event Error] Failed updating stats & audit log`, err);
    }

    // 5. Check and award achievements
    try {
      const newlyUnlocked = await this.achievementsService.checkAndAwardAchievements(userId);
      if (newlyUnlocked.length > 0) {
        this.logger.log(`[Event] User ${userId} unlocked ${newlyUnlocked.length} new achievements!`);
      }
    } catch (err) {
      this.logger.error(`[Event Error] Failed processing achievements for user ${userId}`, err);
    }
  }
}
