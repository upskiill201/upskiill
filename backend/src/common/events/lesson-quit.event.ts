/** Fired by CourseService.recordLessonQuit when a lesson is left unfinished. */
export const LESSON_QUIT_EVENT = 'lesson.quit';

export interface LessonQuitEvent {
  userId: string;
  courseId: string;
  lessonId: string;
  /** Where they stopped, as the player reports it (learn:2:5, apply:<id>, …). */
  step: string;
  /** How far through the lesson, 0–100, when the player knows. */
  progressPct?: number;
}
