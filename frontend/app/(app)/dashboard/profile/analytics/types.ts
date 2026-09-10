/** Response shapes from backend `learner-analytics` module — kept in sync by hand (no shared codegen in this repo). */

export type HeroState = 'new' | 'inactive' | 'improving' | 'active';
export type MomentumState = 'rising' | 'strong' | 'steady' | 'slowing' | 'stalled';
export type LearningDnaArchetype =
  | 'consistent_learner'
  | 'sprinter'
  | 'night_learner'
  | 'weekend_warrior'
  | 'steady_builder'
  | 'fast_climber'
  | 'insufficient_data';
export type InsightId = 'consistency' | 'day_of_week_preference' | 'improvement_trend' | 'skill_neglect';
export type NextBestMoveAction =
  | 'protect_streak'
  | 'resume_after_break'
  | 'finish_course'
  | 'practice_weak_area'
  | 'beat_record'
  | 'keep_momentum'
  | 'start_learning';
export type SkillStatus = 'growing' | 'slowing' | 'inactive' | 'completed';

export interface Snapshot {
  daysActive: number;
  lessonsCompleted: number;
  timeSpentSeconds: number;
  xpEarned: number;
  streakDays: number;
  monthDaysActive: number;
}

export interface WeeklyGoal {
  metric: 'xp';
  current: number;
  target: number;
  daysActive: number;
}

export interface SkillMapEntry {
  courseId: string;
  title: string;
  thumbnailUrl: string | null;
  progressPercentage: number;
  status: SkillStatus;
}

export interface LearningBalanceEntry {
  courseId: string;
  title: string;
  percentage: number;
}

export interface LearningDna {
  archetype: LearningDnaArchetype;
  mostActiveDay: string | null;
  mostActiveTimeBlock: 'morning' | 'afternoon' | 'evening' | 'night' | null;
  avgSessionMinutes: number | null;
  consistencyPct: number | null;
}

export interface Improvement {
  hasEnoughData: boolean;
  fromPct?: number;
  toPct?: number;
}

export interface AreaToImprove {
  type: 'low_score' | 'stale_course';
  courseId?: string;
  courseTitle?: string;
  avgScore?: number;
  idleDays?: number;
}

export interface Insight {
  id: InsightId;
  priority: number;
  data: Record<string, string | number>;
}

export interface NextBestMove {
  action: NextBestMoveAction;
  courseId?: string;
  courseTitle?: string;
  data: Record<string, string | number>;
}

export interface PersonalRecords {
  longestStreakDays: number;
  bestXpDay: { date: string; value: number } | null;
  bestLessonsDay: { date: string; value: number } | null;
  bestTimeDay: { date: string; seconds: number } | null;
  hasAnyRecord: boolean;
}

export interface DashboardResponse {
  heroState: HeroState;
  snapshot: Snapshot;
  momentum: { state: MomentumState; score: number; daysSinceLastActive: number | null };
  weeklyGoal: WeeklyGoal;
  skillMap: SkillMapEntry[];
  learningBalance: LearningBalanceEntry[];
  learningDna: LearningDna;
  improvement: Improvement;
  areasToImprove: AreaToImprove[];
  insights: Insight[];
  nextBestMove: NextBestMove;
  records: PersonalRecords;
}

export interface HeatmapDay {
  date: string;
  lessonsCompleted: number;
  xpEarned: number;
  timeSpentSeconds: number;
  intensity: 0 | 1 | 2 | 3 | 4;
}

export interface HeatmapResponse {
  days: HeatmapDay[];
  mostActiveMonth: { month: string; daysActive: number } | null;
}

export type ActivityPeriod = '7d' | '30d' | '3m' | 'all';
export type ActivityMetric = 'xp' | 'time' | 'lessons' | 'activity';

export interface ActivityResponse {
  period: ActivityPeriod;
  metric: ActivityMetric;
  points: Array<{ date: string; value: number }>;
}
