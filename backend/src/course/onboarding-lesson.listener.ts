import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import {
  ONBOARDING_LESSON_SETTLED,
  type OnboardingLessonSettledEvent,
} from '../onboarding-flow/onboarding-flow.service';
import { TestOutService } from '../originals/test-out.service';
import { CourseService } from './course.service';

/**
 * Onboarding v3: what a learner did before signing up becomes real in their
 * new account, through the same code as the app, so XP, streaks, quests,
 * leagues and the first-lesson journey behave as if it happened in the app.
 *
 *   TASTE      enrol, and lesson 1 is started (it opens at card 2 next)
 *   PLACEMENT  enrol, and the placement result places them in the course
 *   LESSON     enrol, and lesson 1 is complete (XP, streak day 1)
 */
@Injectable()
export class OnboardingLessonListener {
  private readonly logger = new Logger(OnboardingLessonListener.name);

  constructor(
    private readonly courses: CourseService,
    private readonly testOut: TestOutService,
  ) {}

  @OnEvent(ONBOARDING_LESSON_SETTLED, { async: true, promisify: true })
  async settle(event: OnboardingLessonSettledEvent): Promise<void> {
    try {
      await this.courses.enrollInCourse(event.userId, event.courseId);

      if (event.mode === 'TASTE') {
        await this.courses.recordLessonOpen(event.userId, event.courseId, event.lessonId);
        return;
      }

      if (event.mode === 'PLACEMENT') {
        if (!event.placement) return;
        await this.testOut.submit(event.userId, event.courseId, {
          mode: 'placement',
          targetSectionId: event.placement.targetSectionId,
          correct: event.placement.correct,
          total: event.placement.total,
        });
        return;
      }

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
        `Onboarding ${event.mode} for ${event.userId} (${event.courseId}/${event.lessonId}) did not settle: ${(err as Error).message}`,
      );
    }
  }
}
