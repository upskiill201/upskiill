import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ConflictException,
  GoneException,
  Logger,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { XpAwardedEvent } from '../league/events/xp-awarded.event';

export type ObjectiveType = 'LESSON_COUNT' | 'XP_EARNED' | 'STREAK_ACTIVE';
export type RewardType = 'XP' | 'COINS' | 'GEMS';

@Injectable()
export class MissionsService {
  private readonly logger = new Logger(MissionsService.name);
  // Once we've confirmed the template pool is seeded, it stays seeded —
  // nothing in this codebase deletes MissionTemplate rows at runtime — so
  // there's no need to re-run the count() check on every single
  // /missions/today request for the rest of this process's lifetime.
  private templatesSeeded = false;

  constructor(
    private readonly prisma: PrismaService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  /**
   * Format Date to YYYY-MM-DD string considering user's timezone offset (in minutes)
   */
  private getLocalDayString(date: Date, timezoneOffsetMinutes = 0): string {
    const localTime = new Date(date.getTime() - timezoneOffsetMinutes * 60 * 1000);
    return localTime.toISOString().split('T')[0];
  }

  /**
   * Get reset timestamp (local midnight of next day) as a Date object
   */
  private getNextResetTimestamp(date: Date, timezoneOffsetMinutes = 0): Date {
    const localTime = new Date(date.getTime() - timezoneOffsetMinutes * 60 * 1000);
    localTime.setUTCHours(24, 0, 0, 0);
    return new Date(localTime.getTime() + timezoneOffsetMinutes * 60 * 1000);
  }

  /**
   * Ensures default mission templates pool exists in mission_templates table
   */
  private async ensureDefaultTemplates() {
    if (this.templatesSeeded) return;

    const count = await this.prisma.missionTemplate.count();
    if (count >= 6) {
      this.templatesSeeded = true;
      return;
    }

    this.logger.log('Seeding default mission templates pool...');
    const defaults = [
      {
        code: 'COMPLETE_LESSONS',
        title: 'Complete 1 lesson',
        description: 'Finish 1 interactive lesson today',
        objectiveType: 'LESSON_COUNT',
        defaultTarget: 1,
        defaultRewardType: 'XP',
        defaultRewardAmount: 20,
        difficultyTier: 'easy',
      },
      {
        code: 'EARN_XP',
        title: 'Earn 20 XP',
        description: 'Earn 20 XP from quizzes and lessons',
        objectiveType: 'XP_EARNED',
        defaultTarget: 20,
        defaultRewardType: 'COINS',
        defaultRewardAmount: 10,
        difficultyTier: 'easy',
      },
      {
        code: 'MAINTAIN_STREAK',
        title: 'Stay on your streak',
        description: 'Keep your daily learning streak active',
        objectiveType: 'STREAK_ACTIVE',
        defaultTarget: 1,
        defaultRewardType: 'COINS',
        defaultRewardAmount: 5,
        difficultyTier: 'easy',
      },
      {
        code: 'COMPLETE_2_LESSONS',
        title: 'Complete 2 lessons',
        description: 'Finish 2 interactive lessons today',
        objectiveType: 'LESSON_COUNT',
        defaultTarget: 2,
        defaultRewardType: 'XP',
        defaultRewardAmount: 35,
        difficultyTier: 'medium',
      },
      {
        code: 'EARN_50_XP',
        title: 'Earn 50 XP',
        description: 'Earn 50 XP from lessons and practice',
        objectiveType: 'XP_EARNED',
        defaultTarget: 50,
        defaultRewardType: 'COINS',
        defaultRewardAmount: 25,
        difficultyTier: 'medium',
      },
      {
        code: 'POWER_LEARNER',
        title: 'Complete 3 lessons',
        description: 'Finish 3 lessons for a major boost',
        objectiveType: 'LESSON_COUNT',
        defaultTarget: 3,
        defaultRewardType: 'COINS',
        defaultRewardAmount: 40,
        difficultyTier: 'hard',
      },
    ];

    for (const item of defaults) {
      await this.prisma.missionTemplate.upsert({
        where: { code: item.code },
        update: {
          defaultRewardType: item.defaultRewardType,
          defaultRewardAmount: item.defaultRewardAmount,
          difficultyTier: item.difficultyTier,
        },
        create: item,
      });
    }

    this.templatesSeeded = true;
  }

  /**
   * Fetch Today's Missions for user with lazy generation, anti-repeat, & dynamic target scaling
   */
  async getTodayMissions(userId: string, timezoneOffsetMinutes = 0) {
    await this.ensureDefaultTemplates();

    const now = new Date();
    const todayStr = this.getLocalDayString(now, timezoneOffsetMinutes);
    const resetAt = this.getNextResetTimestamp(now, timezoneOffsetMinutes);

    // 1. Check if a DailyMissionSet exists for today
    let missionSet = await this.prisma.dailyMissionSet.findUnique({
      where: {
        userId_missionDay: {
          userId,
          missionDay: todayStr,
        },
      },
      include: {
        missions: {
          include: { template: true },
        },
      },
    });

    // 2. Lazy generation if no mission set exists for today
    if (!missionSet || missionSet.missions.length < 3) {
      // Find past 2 days dates for Anti-Repeat rule
      const day1 = this.getLocalDayString(new Date(now.getTime() - 24 * 60 * 60 * 1000), timezoneOffsetMinutes);
      const day2 = this.getLocalDayString(new Date(now.getTime() - 48 * 60 * 60 * 1000), timezoneOffsetMinutes);

      const recentMissions = await this.prisma.userDailyMission.findMany({
        where: {
          userId,
          missionDate: { in: [day1, day2] },
        },
        select: { templateId: true },
      });

      const recentTemplateIds = Array.from(new Set(recentMissions.map((m) => m.templateId)));

      // Fetch candidate templates excluding recently used template IDs
      let availableTemplates = await this.prisma.missionTemplate.findMany({
        where: {
          isActive: true,
          ...(recentTemplateIds.length > 0 ? { id: { notIn: recentTemplateIds } } : {}),
        },
      });

      if (availableTemplates.length < 3) {
        availableTemplates = await this.prisma.missionTemplate.findMany({
          where: { isActive: true },
        });
      }

      // Anchor selection: Ensure at least 1 COMPLETE_LESSONS mission is included
      const anchorTemplate = availableTemplates.find((t) => t.objectiveType === 'LESSON_COUNT') || availableTemplates[0];
      const remainingTemplates = availableTemplates.filter((t) => t.id !== anchorTemplate.id);
      
      // Shuffle remaining templates and pick 2
      const shuffled = [...remainingTemplates].sort(() => 0.5 - Math.random());
      const selectedTemplates = [anchorTemplate, ...shuffled.slice(0, 2)];

      // Query 7-day user activity average for dynamic target scaling
      const sevenDaysAgo = this.getLocalDayString(new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000), timezoneOffsetMinutes);
      const pastActivities = await this.prisma.userDailyActivity.findMany({
        where: {
          userId,
          date: { gte: sevenDaysAgo },
        },
      });

      const avgLessons = pastActivities.length > 0
        ? pastActivities.reduce((acc, a) => acc + a.lessonsCompleted, 0) / pastActivities.length
        : 0;

      try {
        // Create or get DailyMissionSet atomically to avoid race conditions
        missionSet = await this.prisma.$transaction(async (tx) => {
          const set = await tx.dailyMissionSet.upsert({
            where: { userId_missionDay: { userId, missionDay: todayStr } },
            update: {},
            create: {
              userId,
              missionDay: todayStr,
              resetAt,
            },
          });

          for (const t of selectedTemplates) {
            // Dynamic target scaling calculation
            let scaledTarget = t.defaultTarget;
            if (t.objectiveType === 'LESSON_COUNT' && avgLessons > 1) {
              scaledTarget = Math.min(5, Math.max(t.defaultTarget, Math.round(avgLessons)));
            }

            await tx.userDailyMission.upsert({
              where: {
                userId_templateId_missionDate: {
                  userId,
                  templateId: t.id,
                  missionDate: todayStr,
                },
              },
              update: {
                dailyMissionSetId: set.id,
              },
              create: {
                userId,
                dailyMissionSetId: set.id,
                templateId: t.id,
                missionDate: todayStr,
                title: t.title,
                objectiveType: t.objectiveType,
                targetValue: scaledTarget,
                rewardType: t.defaultRewardType,
                rewardAmount: t.defaultRewardAmount,
                currentProgress: 0,
                status: 'IN_PROGRESS',
              },
            });
          }

          return tx.dailyMissionSet.findUnique({
            where: { id: set.id },
            include: {
              missions: { include: { template: true } },
            },
          });
        });
      } catch (err: any) {
        if (err?.code === 'P2002') {
          this.logger.debug(`Concurrent DailyMissionSet initialization handled for user ${userId}`);
        } else {
          this.logger.warn(`Race condition creating DailyMissionSet for user ${userId}: ${err?.message || err}`);
        }
        // Re-fetch set created by concurrent request
        missionSet = await this.prisma.dailyMissionSet.findUnique({
          where: { userId_missionDay: { userId, missionDay: todayStr } },
          include: { missions: { include: { template: true } } },
        });
      }
    }

    // 3. Catch-up evaluation: check today's user activity & student profile
    if (missionSet && missionSet.missions.length > 0) {
      // Independent reads — previously sequential.
      const [profile, todayActivity] = await Promise.all([
        this.prisma.studentProfile.findUnique({ where: { userId } }),
        this.prisma.userDailyActivity.findUnique({
          where: { userId_date: { userId, date: todayStr } },
        }),
      ]);

      // Each mission's update touches a different row with different data,
      // so they can't collapse into one query — but they don't depend on
      // each other either, so the writes are collected here and fired
      // together below instead of one sequential await per mission
      // (previously up to 3 round trips in a row for a handful of rows).
      const pendingUpdates: Array<Promise<unknown>> = [];

      for (const mission of missionSet.missions) {
        if (mission.isCompleted || mission.status === 'CLAIMED') continue;

        let updatedProgress = mission.currentProgress;

        if (mission.objectiveType === 'STREAK_ACTIVE') {
          const streakDate = profile?.lastStreakEarnedAt
            ? this.getLocalDayString(profile.lastStreakEarnedAt, timezoneOffsetMinutes)
            : null;
          const practicedToday = (todayActivity?.lessonsCompleted ?? 0) > 0 || streakDate === todayStr;
          if (practicedToday && profile && profile.streakDays > 0) {
            updatedProgress = Math.max(updatedProgress, 1);
          }
        }

        if (mission.objectiveType === 'LESSON_COUNT') {
          const activityLessons = todayActivity?.lessonsCompleted ?? 0;
          let finishedLessonToday = activityLessons > 0;
          if (!finishedLessonToday && profile?.lastLessonCompletedAt) {
            const lastLessonDay = this.getLocalDayString(profile.lastLessonCompletedAt, timezoneOffsetMinutes);
            if (lastLessonDay === todayStr) {
              finishedLessonToday = true;
            }
          }
          if (finishedLessonToday) {
            updatedProgress = Math.max(updatedProgress, Math.max(1, activityLessons));
          }
        }

        if (mission.objectiveType === 'XP_EARNED') {
          const activityXp = todayActivity?.xpEarned ?? 0;
          if (activityXp > 0) {
            updatedProgress = Math.max(updatedProgress, activityXp);
          }
        }

        const isDone = updatedProgress >= mission.targetValue || mission.isCompleted;

        if (updatedProgress !== mission.currentProgress || mission.isCompleted !== isDone) {
          const newStatus = isDone ? 'COMPLETED' : 'IN_PROGRESS';

          pendingUpdates.push(
            this.prisma.userDailyMission.update({
              where: { id: mission.id },
              data: {
                currentProgress: updatedProgress,
                isCompleted: isDone,
                status: mission.isClaimed ? 'CLAIMED' : newStatus,
                completedAt: isDone ? (mission.completedAt || now) : null,
              },
            }),
          );

          mission.currentProgress = updatedProgress;
          mission.isCompleted = isDone;
          if (!mission.isClaimed) {
            mission.status = newStatus;
          }
        }
      }

      if (pendingUpdates.length > 0) {
        await Promise.all(pendingUpdates);
      }
    }

    // 4. Return formatted payload
    const missionsList = missionSet?.missions ?? [];
    return {
      date: todayStr,
      resetAt: (missionSet?.resetAt || resetAt).toISOString(),
      missions: missionsList.map((m) => {
        const isDone = m.isCompleted || m.currentProgress >= m.targetValue;
        return {
          id: m.id,
          title: m.title,
          objectiveType: m.objectiveType,
          currentProgress: m.currentProgress,
          targetValue: m.targetValue,
          status: m.isClaimed ? 'CLAIMED' : isDone ? 'COMPLETED' : m.status || 'IN_PROGRESS',
          isCompleted: isDone,
          isClaimed: m.isClaimed,
          reward: {
            type: m.rewardType === 'GEMS' ? 'COINS' : m.rewardType,
            amount: m.rewardAmount,
          },
        };
      }),
    };
  }

  /**
   * Atomic Reward Claiming Transaction with Idempotency Key
   */
  async claimMissionReward(userId: string, missionId: string, timezoneOffsetMinutes = 0) {
    const result = await this.prisma.$transaction(async (tx) => {
      const mission = await tx.userDailyMission.findUnique({
        where: { id: missionId },
        include: { dailyMissionSet: true },
      });

      if (!mission || mission.userId !== userId) {
        throw new NotFoundException({
          error: 'MISSION_NOT_FOUND',
          message: 'Mission does not exist for this user.',
        });
      }

      if (mission.isClaimed || mission.status === 'CLAIMED') {
        throw new ConflictException({
          error: 'ALREADY_CLAIMED',
          message: 'Reward for this mission has already been claimed.',
        });
      }

      const isFulfilled = mission.isCompleted || mission.currentProgress >= mission.targetValue;
      if (!isFulfilled) {
        throw new BadRequestException({
          error: 'MISSION_NOT_COMPLETED',
          message: 'Mission objective has not been fulfilled yet.',
        });
      }

      // Check expiry: check if resetAt has passed with timezone awareness
      const now = new Date();
      const todayStr = this.getLocalDayString(now, timezoneOffsetMinutes);
      const isResetAtExpired = mission.dailyMissionSet?.resetAt && now > mission.dailyMissionSet.resetAt;
      const isDateExpired = mission.missionDate && mission.missionDate < todayStr;

      if (isResetAtExpired || (!mission.dailyMissionSet?.resetAt && isDateExpired)) {
        await tx.userDailyMission.update({
          where: { id: missionId },
          data: { status: 'EXPIRED' },
        });
        throw new GoneException({
          error: 'MISSION_EXPIRED',
          message: 'This mission reward has expired.',
        });
      }

      // Structural protection: Insert RewardTransaction with unique idempotencyKey
      const idempotencyKey = `mission_claim:${missionId}`;
      try {
        await tx.rewardTransaction.create({
          data: {
            userId,
            currency: mission.rewardType === 'GEMS' ? 'COINS' : mission.rewardType,
            amount: mission.rewardAmount,
            sourceType: 'MISSION_CLAIM',
            sourceId: missionId,
            idempotencyKey,
          },
        });
      } catch (err: any) {
        if (err.code === 'P2002') {
          // Idempotency key conflict: already claimed!
          throw new ConflictException({
            error: 'ALREADY_CLAIMED',
            message: 'Reward for this mission was already claimed.',
          });
        }
        throw err;
      }

      // Update UserDailyMission status to CLAIMED
      await tx.userDailyMission.update({
        where: { id: missionId },
        data: {
          isCompleted: true,
          isClaimed: true,
          status: 'CLAIMED',
          claimedAt: now,
        },
      });

      // Update StudentProfile wallet
      let updatedProfile;
      const displayReward = mission.rewardType === 'GEMS' ? 'COINS' : mission.rewardType;

      if (displayReward === 'XP') {
        updatedProfile = await tx.studentProfile.update({
          where: { userId },
          data: { xp: { increment: mission.rewardAmount } },
        });
      } else if (displayReward === 'COINS') {
        updatedProfile = await tx.studentProfile.update({
          where: { userId },
          data: { coins: { increment: mission.rewardAmount } },
        });
      } else {
        updatedProfile = await tx.studentProfile.findUnique({ where: { userId } });
      }

      // Check if ALL missions for today are now claimed
      const totalTodayMissions = await tx.userDailyMission.count({
        where: { userId, missionDate: mission.missionDate },
      });
      const claimedTodayMissions = await tx.userDailyMission.count({
        where: { userId, missionDate: mission.missionDate, isClaimed: true },
      });

      const allMissionsClaimed = totalTodayMissions > 0 && totalTodayMissions === claimedTodayMissions;

      if (allMissionsClaimed) {
        // Award bonus 15 coins for completing all daily missions
        updatedProfile = await tx.studentProfile.update({
          where: { userId },
          data: { coins: { increment: 15 } },
        });
      }

      return {
        success: true,
        missionId,
        claimedReward: {
          type: displayReward,
          amount: mission.rewardAmount,
        },
        userBalances: {
          xp: updatedProfile?.xp ?? 0,
          coins: updatedProfile?.coins ?? 0,
          gems: updatedProfile?.gems ?? 0,
        },
        allMissionsClaimed,
      };
    });

    // Credit the weekly league standings (async, non-blocking).
    if (result.claimedReward.type === 'XP') {
      this.eventEmitter.emit(
        'xp.awarded',
        new XpAwardedEvent(userId, result.claimedReward.amount, 'MISSION'),
      );
    }

    return result;
  }

  /**
   * Event/Piggyback hook: Incremental Mission Progress Update
   * Advances active missions for today only
   */
  async updateMissionProgress(
    userId: string,
    objectiveType: ObjectiveType,
    incrementAmount: number,
    timezoneOffsetMinutes = 0,
  ) {
    const now = new Date();
    const todayStr = this.getLocalDayString(now, timezoneOffsetMinutes);

    // Filter strictly by today's date so past missions are never corrupted
    const activeMissions = await this.prisma.userDailyMission.findMany({
      where: {
        userId,
        missionDate: todayStr,
        objectiveType,
        isClaimed: false,
        status: { notIn: ['CLAIMED', 'EXPIRED'] },
      },
    });

    // Each mission is a different row with independent data — these used to
    // update one after another; since none depend on each other's result,
    // they now fire together (activeMissions is small, usually 0-2 rows).
    const updatedMissions = await Promise.all(
      activeMissions.map(async (mission) => {
        const newProgress = Math.min(
          mission.currentProgress + incrementAmount,
          mission.targetValue,
        );
        const isDone = newProgress >= mission.targetValue;
        const justCompleted = isDone && !mission.isCompleted;

        await this.prisma.userDailyMission.update({
          where: { id: mission.id },
          data: {
            currentProgress: newProgress,
            isCompleted: isDone,
            status: mission.isClaimed ? 'CLAIMED' : isDone ? 'COMPLETED' : 'IN_PROGRESS',
            completedAt: isDone ? (mission.completedAt || now) : null,
          },
        });

        return {
          userMissionId: mission.id,
          title: mission.title,
          progress: newProgress,
          target: mission.targetValue,
          status: isDone ? 'COMPLETED' : 'IN_PROGRESS',
          justCompleted,
        };
      }),
    );

    return updatedMissions;
  }
}
