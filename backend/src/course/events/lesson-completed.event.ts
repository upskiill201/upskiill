export class LessonCompletedEvent {
  constructor(
    public readonly userId: string,
    public readonly lessonId: string,
    public readonly courseId: string,
    public readonly isFirstCompletion: boolean,
    public readonly completedAt: Date = new Date(),
    public readonly timezoneOffsetMinutes: number = 0,
  ) {}
}
