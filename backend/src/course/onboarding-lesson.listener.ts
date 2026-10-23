import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import {
  ONBOARDING_LESSON_SETTLED,
  type OnboardingLessonSettledEvent,
} from '../onboarding-flow/onboarding-flow.service';
import { CourseService } from './course.service';

/**
 * Onboarding v3: the lesson a learner played before signing up becomes their
 * real lesson 1. Enrolment and completion go through the same code as any
 * other lesson, so XP, coins, streak day 1, quests, leagues and the
 * first-lesson journey all behave exactly as if it was played in the app.
 */
@Injectable()
export class OnboardingLessonListener {
  private readonly logger = new Logger(OnboardingLessonListener.name);

  constructor(private readonly courses: CourseService) {}

  @OnEvent(ONBOARDING_LESSON_SETTLED, { async: true, promisify: true })
  async settle(event: OnboardingLessonSettledEvent): Promise<void> {
    try {
      await this.courses.enrollInCourse(event.userId, event.courseId);
      await this.courses.markLessonComplete(
        event.userId,
        event.courseId,
        event.lessonId,
        event.timezoneOffsetMinutes,
        false,
        event.timeSpentSeconds,
        undefined,
        event.quizScorePct,
        event.correctAnswers,
        undefined,
        { bestCombo: event.bestCombo ?? 0, hintsUsed: 0, skipped: 0 },
      );
    } catch (err) {
      this.logger.error(
        `Onboarding lesson for ${event.userId} (${event.courseId}/${event.lessonId}) did not settle: ${(err as Error).message}`,
      );
    }
  }
}
