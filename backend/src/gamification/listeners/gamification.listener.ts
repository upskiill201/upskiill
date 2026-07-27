import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { LessonCompletedEvent } from '../../course/events/lesson-completed.event';
import { GamificationService } from '../gamification.service';
import { AchievementsService } from '../../achievements/achievements.service';

@Injectable()
export class GamificationListener {
  private readonly logger = new Logger(GamificationListener.name);

  constructor(
    private readonly gamificationService: GamificationService,
    private readonly achievementsService: AchievementsService,
  ) {}

  @OnEvent('lesson.completed', { async: true })
  async handleLessonCompleted(event: LessonCompletedEvent) {
    this.logger.log(
      `[Event] Received lesson.completed for user ${event.userId}, lesson ${event.lessonId}`,
    );

    if (!event.isFirstCompletion) {
      this.logger.log(
        `[Event] Lesson ${event.lessonId} was re-completed by user ${event.userId}. Anti-abuse check skipped rewards.`,
      );
      return;
    }

    try {
      // Check and award achievements
      const newlyUnlocked = await this.achievementsService.checkAndAwardAchievements(
        event.userId,
      );

      if (newlyUnlocked.length > 0) {
        this.logger.log(
          `[Event] User ${event.userId} unlocked ${newlyUnlocked.length} new achievements!`,
        );
      }
    } catch (err) {
      this.logger.error(
        `[Event Error] Failed processing gamification listener for user ${event.userId}`,
        err,
      );
    }
  }
}
