/**
 * Emitted at the END of ProgressService.recordLearningActivity, once the
 * UserDailyActivity and UserWeeklyProgress rows for the day are committed.
 *
 * Why this exists instead of a second @OnEvent('lesson.completed') listener:
 * EventEmitter2 fires `{ async: true }` listeners concurrently and unawaited,
 * so a Tey listener bound to lesson.completed would race GamificationListener
 * and read today's activity row before it was written -- reporting XP one
 * lesson behind. Emitting downstream of the write removes the race
 * structurally rather than papering over it with a timeout.
 */
export class LearningActivityRecordedEvent {
  constructor(
    public readonly userId: string,
    /** YYYY-MM-DD in the learner's local zone, as used for the activity row. */
    public readonly localDate: string,
    public readonly timezoneOffsetMinutes: number,
    public readonly xpEarned: number,
    public readonly isFirstLessonToday: boolean,
    public readonly occurredAt: Date = new Date(),
  ) {}
}
