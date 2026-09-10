/**
 * Frontend mirror of backend/src/students/types.ts — the backend file is the
 * source of truth; keep both in sync.
 */

export type LearnerSegment =
  | 'NEW'
  | 'ACTIVE'
  | 'HIGHLY_ENGAGED'
  | 'NEAR_COMPLETION'
  | 'STRUGGLING'
  | 'HIGH_PERFORMER'
  | 'AT_RISK'
  | 'INACTIVE'
  | 'COMPLETED';

export type AttentionReason = 'GONE_QUIET' | 'STUCK_LESSON' | 'FAILING_QUIZ' | 'ALMOST_THERE';

export interface LearnerRosterRow {
  id: string;
  fullName: string;
  username: string | null;
  avatarUrl: string | null;
  segment: LearnerSegment;
  firstEnrolledAt: string;
  lastActivityAt: string | null;
  daysSinceActive: number | null;
  coursesCount: number;
  primaryCourseTitle: string | null;
  completedLessons: number;
  totalLessons: number;
  progressPct: number;
  xpPlatform: number;
  streakDays: number;
  longestStreak: number;
  avgQuizScore: number | null;
  needsAttentionReasons: AttentionReason[];
}

export interface StudentsRosterPayload {
  total: number;
  page: number;
  pageSize: number;
  summary: Record<LearnerSegment, number>;
  students: LearnerRosterRow[];
}

export interface StudentsOverviewPayload {
  isEmpty: boolean;
  kpis: {
    totalLearners: number;
    newLearners: number;
    activeLast7d: number;
    highlyEngaged: number;
    atRisk: number;
    inactive: number;
    avgProgressPct: number;
    completionRatePct: number;
    avgLearningMinutesPerLearner: number;
    avgQuizScore: number | null;
    avgStreakDays: number;
    learnersWithAttention: number;
  };
  topCourses: { courseId: string; title: string; learners: number }[];
  bestRetentionCourses: { courseId: string; title: string; learners: number; activeRatePct: number }[];
  enrollmentTrend: { date: string; count: number }[];
  xpNote: string;
}

export interface AttentionContext {
  courseTitle?: string;
  lessonTitle?: string;
  daysQuiet?: number;
  attempts?: number;
  quizScore?: number;
  progressPct?: number;
}

export type AttentionItem = LearnerRosterRow & { context: AttentionContext };

export interface NeedsAttentionPayload {
  groups: Record<AttentionReason, AttentionItem[]>;
  totalFlagged: number;
}

export interface BehaviorMetrics {
  lessonsPerWeek: number;
  activeDaysPerWeek: number;
  avgSessionMinutes: number;
  consistencyPct: number;
  daysSinceLastActivity: number | null;
  paceTrend: 'UP' | 'DOWN' | 'FLAT';
  paceChangePct: number;
  weekdayHeat: { label: string; count: number }[];
  hourBuckets: { label: string; count: number }[];
}

export interface LearnerCourseSummary {
  courseId: string;
  title: string;
  enrolledAt: string;
  lastActivityAt: string | null;
  completedLessons: number;
  totalLessons: number;
  progressPct: number;
  timeSpentMinutes: number;
  avgQuizScore: number | null;
  status: 'NOT_STARTED' | 'IN_PROGRESS' | 'NEAR_DONE' | 'COMPLETED';
  stoppedAtLessonTitle: string | null;
}

export interface LessonBehaviorRow {
  lessonId: string;
  title: string;
  sectionTitle: string;
  index: number;
  courseId: string;
  courseTitle: string;
  started: boolean;
  completed: boolean;
  completedAt: string | null;
  timeSpentMinutes: number | null;
  attempts: number | null;
  quizScore: number | null;
  passed: boolean | null;
  abandoned: boolean;
  struggleSpot: boolean;
  struggleWhy: ('ATTEMPTS' | 'TIME')[] | null;
}

export interface QuizPoint {
  completedAt: string;
  lessonTitle: string;
  score: number;
}

export interface JourneyEvent {
  at: string;
  kind: 'ENROLLED' | 'STARTED' | 'LESSON_COMPLETED' | 'QUIZ_RESULT' | 'COURSE_COMPLETED' | 'STOPPED';
  label: string;
  courseId?: string;
  courseTitle?: string;
  detail?: string;
}

export interface FeedbackItem {
  reviewId: string;
  courseTitle: string;
  rating: number;
  comment: string | null;
  createdAt: string;
}

export interface StudentDetailPayload {
  identity: { id: string; fullName: string; username: string | null; avatarUrl: string | null };
  segment: LearnerSegment;
  platformJoinedAt: string;
  firstEnrolledAt: string;
  lastActivityAt: string | null;
  totals: {
    lessonsCompleted: number;
    learningTimeMinutes: number;
    avgSessionMinutes: number;
    currentStreakDays: number;
    longestStreakDays: number;
    xpPlatform: number;
    goalsAndInterests: null;
  };
  behavior: BehaviorMetrics;
  courses: LearnerCourseSummary[];
  lessons: { rows: LessonBehaviorRow[]; truncated: boolean };
  performance: {
    quizTimeline: QuizPoint[];
    improvementTrendPct: number | null;
    strongLessons: { title: string; courseTitle: string; score: number }[];
    struggledLessons: { title: string; courseTitle: string; attempts: number | null; minutes: number | null }[];
  };
  journey: { events: JourneyEvent[]; truncated: boolean };
  feedback: FeedbackItem[];
}
