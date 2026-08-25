/**
 * Request/response contracts for the Students feature. The ONLY identity
 * shape allowed in any payload is StudentIdentity — no email, phone,
 * WhatsApp, address or payment field may ever appear in this file's types.
 */

import type { LearnerSegment } from './engagement.config';

export interface StudentIdentity {
  /** Opaque cuid. UI displays a short form; it reveals nothing personal. */
  id: string;
  fullName: string;
  username: string | null;
  avatarUrl: string | null;
}

export type CourseCompletionStatus = 'NOT_STARTED' | 'IN_PROGRESS' | 'NEAR_DONE' | 'COMPLETED';

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
  status: CourseCompletionStatus;
  /** Where-they-stopped callout: the next lesson after the learner's frontier. */
  stoppedAtLessonTitle: string | null;
}

export type AttentionReason =
  | 'GONE_QUIET'
  | 'STUCK_LESSON'
  | 'FAILING_QUIZ'
  | 'ALMOST_THERE';

export interface LearnerRosterRow extends StudentIdentity {
  segment: LearnerSegment;
  firstEnrolledAt: string;
  lastActivityAt: string | null;
  daysSinceActive: number | null;
  coursesCount: number;
  /** Most recently active of their courses with this creator. */
  primaryCourseTitle: string | null;
  completedLessons: number;
  totalLessons: number;
  progressPct: number; // cross-course weighted (Σ completed / Σ published)
  xpPlatform: number; // XP is platform-level on Teyro — labeled as such in UI
  streakDays: number;
  longestStreak: number;
  avgQuizScore: number | null;
  needsAttentionReasons: AttentionReason[];
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
    completionRatePct: number; // share of learners who finished ≥1 course
    avgLearningMinutesPerLearner: number;
    avgQuizScore: number | null;
    avgStreakDays: number;
    learnersWithAttention: number;
  };
  topCourses: { courseId: string; title: string; learners: number }[];
  bestRetentionCourses: {
    courseId: string;
    title: string;
    learners: number;
    activeRatePct: number;
  }[];
  enrollmentTrend: { date: string; count: number }[]; // trailing 30d
  xpNote: string;
}

export interface StudentsRosterPayload {
  total: number;
  page: number;
  pageSize: number;
  summary: Record<LearnerSegment, number>;
  students: LearnerRosterRow[];
}

export interface AttentionContext {
  courseTitle?: string;
  lessonTitle?: string;
  daysQuiet?: number;
  attempts?: number;
  quizScore?: number;
  progressPct?: number;
}

export type AttentionItem = LearnerRosterRow & {
  context: AttentionContext;
};

export interface NeedsAttentionPayload {
  groups: Record<AttentionReason, AttentionItem[]>;
  totalFlagged: number;
}

/* ── rule-based insight cards ───────────────────────────────────────────── */

export interface StudentsInsightCard {
  id: string;
  kind: 'win' | 'watch' | 'risk';
  /** Icon key resolved by the shared INSIGHT_ICONS map on the frontend. */
  icon: 'trending-up' | 'alert-triangle' | 'alarm-clock' | 'play-circle' | 'star';
  title: string;
  body: string;
}

export interface StudentsInsightsPayload {
  insights: StudentsInsightCard[];
}

/* ── per-student detail ─────────────────────────────────────────────────── */

export interface BehaviorMetrics {
  lessonsPerWeek: number; // trailing window ÷ weeks
  activeDaysPerWeek: number;
  avgSessionMinutes: number; // per ACTIVE DAY (session proxy — daily rollups only)
  consistencyPct: number; // active days / eligible days, trailing window
  daysSinceLastActivity: number | null;
  paceTrend: 'UP' | 'DOWN' | 'FLAT';
  paceChangePct: number;
  weekdayHeat: { label: string; count: number }[]; // Mon-first
  hourBuckets: { label: string; count: number }[]; // approximate/UTC — learner tz not stored
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
  kind:
    | 'ENROLLED'
    | 'STARTED'
    | 'LESSON_COMPLETED'
    | 'QUIZ_RESULT'
    | 'COURSE_COMPLETED'
    | 'STOPPED';
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
  identity: StudentIdentity;
  segment: LearnerSegment;
  platformJoinedAt: string;
  firstEnrolledAt: string;
  lastActivityAt: string | null;
  totals: {
    lessonsCompleted: number; // across this creator's courses
    learningTimeMinutes: number; // exact — UserLessonProgress.timeSpentSeconds
    avgSessionMinutes: number;
    currentStreakDays: number;
    longestStreakDays: number;
    xpPlatform: number;
    /** Not collected yet anywhere on Teyro → always null today (honest empty state). */
    goalsAndInterests: null;
  };
  behavior: BehaviorMetrics;
  courses: LearnerCourseSummary[];
  lessons: { rows: LessonBehaviorRow[]; truncated: boolean };
  performance: {
    quizTimeline: QuizPoint[];
    improvementTrendPct: number | null;
    strongLessons: { title: string; courseTitle: string; score: number }[];
    struggledLessons: {
      title: string;
      courseTitle: string;
      attempts: number | null;
      minutes: number | null;
    }[];
  };
  journey: { events: JourneyEvent[]; truncated: boolean };
  feedback: FeedbackItem[];
}
