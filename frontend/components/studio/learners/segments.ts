/** Learner segments (backend/src/students/engagement.config.ts), as the studio shows them. */

export type Segment =
  | 'NEW'
  | 'ACTIVE'
  | 'HIGHLY_ENGAGED'
  | 'NEAR_COMPLETION'
  | 'STRUGGLING'
  | 'HIGH_PERFORMER'
  | 'AT_RISK'
  | 'INACTIVE'
  | 'COMPLETED';

export const SEGMENTS: Record<Segment, { label: string; tone: string; action: 'NUDGE' | 'CHEER' }> = {
  NEW: { label: 'New', tone: 'var(--color-brand)', action: 'CHEER' },
  HIGHLY_ENGAGED: { label: 'On fire', tone: 'var(--warning)', action: 'CHEER' },
  ACTIVE: { label: 'Active', tone: 'var(--success-green)', action: 'CHEER' },
  NEAR_COMPLETION: { label: 'Almost done', tone: 'var(--brand-purple)', action: 'CHEER' },
  STRUGGLING: { label: 'Struggling', tone: 'var(--warning)', action: 'NUDGE' },
  HIGH_PERFORMER: { label: 'Star', tone: 'var(--success-green)', action: 'CHEER' },
  AT_RISK: { label: 'Going quiet', tone: 'var(--error-red)', action: 'NUDGE' },
  INACTIVE: { label: 'Inactive', tone: 'var(--text-muted)', action: 'NUDGE' },
  COMPLETED: { label: 'Finished', tone: 'var(--brand-purple)', action: 'CHEER' },
};

export const SEGMENT_ORDER: Segment[] = [
  'AT_RISK',
  'STRUGGLING',
  'NEAR_COMPLETION',
  'NEW',
  'HIGHLY_ENGAGED',
  'ACTIVE',
  'HIGH_PERFORMER',
  'COMPLETED',
  'INACTIVE',
];

export interface RosterRow {
  id: string;
  fullName: string;
  username: string | null;
  avatarUrl: string | null;
  segment: Segment;
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
  needsAttentionReasons: string[];
}

export interface RosterPayload {
  total: number;
  page: number;
  pageSize: number;
  summary: Record<Segment, number>;
  students: RosterRow[];
}
