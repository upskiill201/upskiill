export class LessonCompletedEvent {
  constructor(
    public readonly userId: string,
    public readonly lessonId: string,
    public readonly courseId: string,
    public readonly isFirstCompletion: boolean,
    public readonly completedAt: Date = new Date(),
    public readonly timezoneOffsetMinutes: number = 0,
    public readonly xpEarned: number = 10,
    public readonly streakDays: number = 1,
    public readonly isFirstStreakOfDay: boolean = false,
    public readonly timeSpentSeconds?: number,
    public readonly quizScorePct?: number,
    /** Right answers in the lesson's quiz (first try) — feeds daily quests. */
    public readonly correctAnswers?: number,
  ) {}
}
