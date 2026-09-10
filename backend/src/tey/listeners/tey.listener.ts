import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { LearningActivityRecordedEvent } from '../../common/events/learning-activity-recorded.event';
import { EnrollmentCreatedEvent } from '../../common/events/enrollment-created.event';
import { TeyActivityService } from '../activity/tey-activity.service';
import { LearnerStateService } from '../state/learner-state.service';
import { TeySchedulerService } from '../scheduler/tey-scheduler.service';
import type { RecordEventInput } from '../contracts/tey-event.types';

/**
 * Server-side activity capture (spec section 5).
 *
 * Anything the backend already knows becomes an event here, not in the browser
 * -- a client-reported lesson_completed would be both untrustworthy and
 * duplicative. Every handler is individually try/caught, matching the
 * discipline in GamificationListener: telemetry must never break the action
 * that produced it.
 *
 * Note this listens to `learning.activity.recorded` rather than
 * `lesson.completed`. See LearningActivityRecordedEvent for why.
 */
@Injectable()
export class TeyListener {
  private readonly logger = new Logger(TeyListener.name);

  constructor(
    private readonly activity: TeyActivityService,
    private readonly learnerState: LearnerStateService,
    private readonly scheduler: TeySchedulerService,
  ) {}

  @OnEvent('learning.activity.recorded', { async: true })
  async handleLearningActivity(event: LearningActivityRecordedEvent) {
    const { userId, localDate, occurredAt, xpEarned, isFirstLessonToday } =
      event;

    try {
      const events: RecordEventInput[] = [
        {
          userId,
          eventType: 'lesson_completed',
          source: 'SERVER',
          props: { xpEarned },
          occurredAt,
          localDate,
        },
      ];

      // The first lesson of the local day is what extends the streak, so it is
      // the only one worth recording as a separate signal.
      if (isFirstLessonToday) {
        events.push({
          userId,
          eventType: 'streak_extended',
          source: 'SERVER',
          props: { xpEarned },
          occurredAt,
          localDate,
        });
      }

      await this.activity.record(events);
    } catch (err) {
      this.logger.error(
        'Failed recording learning activity events',
        err as Error,
      );
    }

    // Re-project so the cached state reflects the completion immediately. The
    // scheduler re-projects again before it sends anything, so a failure here
    // costs freshness, never correctness.
    try {
      const state = await this.learnerState.project(userId);

      // The learner just studied, so any pending "you have not studied" nudge
      // is now wrong. Cancelling saves the wake-up; revalidation at fire time
      // catches whatever cancelling missed.
      await this.scheduler.cancelFor(userId);

      // Re-plan from fresh state. This is what keeps the escalation ladder
      // going without a cron sweep over every learner.
      await this.scheduler.planFor(userId, state);
    } catch (err) {
      this.logger.error(
        `Failed projecting learner state for ${userId}`,
        err as Error,
      );
    }
  }

  @OnEvent('enrollment.created', { async: true })
  async handleEnrollmentCreated(event: EnrollmentCreatedEvent) {
    try {
      await this.activity.recordOne({
        userId: event.userId,
        eventType: 'course_enrolled',
        source: 'SERVER',
        entityType: 'course',
        entityId: event.courseId,
        occurredAt: new Date(),
      });
      const state = await this.learnerState.project(event.userId);
      await this.scheduler.planFor(event.userId, state);
    } catch (err) {
      this.logger.error('Failed recording enrollment event', err as Error);
    }
  }
}
