/** Shared shapes the orchestrator hands to every engine. Kept as plain types (no DTOs) to match the existing analytics.service.ts convention of inline types rather than a class-per-shape. */

export interface DailyActivityRow {
  date: string; // YYYY-MM-DD
  lessonsCompleted: number;
  xpEarned: number;
  timeSpentSeconds: number;
  streakExtended: boolean;
}

export interface CourseProgressRow {
  courseId: string;
  courseTitle: string;
  thumbnailUrl: string | null;
  status: string; // not_started | in_progress | completed | paused
  progressPercentage: number;
  startedAt: Date | null;
  completedAt: Date | null;
  lastActiveAt: Date | null;
}

export interface CompletedLessonRow {
  lessonId: string;
  lessonTitle: string;
  courseId: string | null;
  quizScore: number | null;
  timeSpentSeconds: number;
  completedAt: Date;
}

export interface LessonCompletionEvent {
  createdAt: Date;
}

export interface ProfileFacts {
  xp: number;
  streakDays: number;
  longestStreak: number;
  lastActiveAt: Date | null;
  lastLessonCompletedAt: Date | null;
  dailyGoalXp: number;
}

export type MomentumState =
  | 'rising'
  | 'strong'
  | 'steady'
  | 'slowing'
  | 'stalled';

export interface MomentumResult {
  state: MomentumState;
  score: number; // 0-100, for the progress-style indicator — not shown as a raw number to the learner
  daysSinceLastActive: number | null;
  activeDaysThisWeek: number;
  activeDaysPrevWeek: number;
}

export type LearningDnaArchetype =
  | 'consistent_learner'
  | 'sprinter'
  | 'night_learner'
  | 'weekend_warrior'
  | 'steady_builder'
  | 'fast_climber'
  | 'insufficient_data';

export interface LearningDnaResult {
  archetype: LearningDnaArchetype;
  mostActiveDay: string | null; // 'Monday' etc.
  mostActiveTimeBlock: 'morning' | 'afternoon' | 'evening' | 'night' | null;
  avgSessionMinutes: number | null;
  consistencyPct: number | null; // active days / days-since-first-activity, last 30d window
}

export type InsightId =
  | 'consistency'
  | 'day_of_week_preference'
  | 'improvement_trend'
  | 'inactivity'
  | 'skill_neglect';

export interface Insight {
  id: InsightId;
  priority: number; // higher = more important; used only to pick top N
  data: Record<string, string | number>;
}

export type NextBestMoveAction =
  | 'protect_streak'
  | 'resume_after_break'
  | 'finish_course'
  | 'practice_weak_area'
  | 'beat_record'
  | 'keep_momentum'
  | 'start_learning';

export interface NextBestMove {
  action: NextBestMoveAction;
  courseId?: string;
  courseTitle?: string;
  lessonsRemaining?: number;
  data: Record<string, string | number>;
}

export interface PersonalRecords {
  longestStreakDays: number;
  bestXpDay: { date: string; value: number } | null;
  bestLessonsDay: { date: string; value: number } | null;
  bestTimeDay: { date: string; seconds: number } | null;
  hasAnyRecord: boolean;
}
