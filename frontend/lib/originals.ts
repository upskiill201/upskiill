/**
 * Teyro Originals — client mirror of backend/src/originals/originals.policy.ts.
 *
 * Display only: the server decides access. Keep the numbers in lockstep with
 * the backend file; the product decisions live in docs/ORIGINALS_PLAYBOOK.md.
 */

export const ORIGINALS_FREE_LESSONS = 5;

/** One subscription unlocks every Original. Yearly = 6 months' price. */
export const ORIGINALS_PRICING = { monthly: 9.99, yearly: 59.99 } as const;

export const LEVEL_LABELS: Record<number, string> = {
  1: 'Beginner',
  2: 'Intermediate',
  3: 'Advanced',
};

export type LessonMilestone = 'CHECKPOINT' | 'UNIT_CHALLENGE';

export interface NextLevel {
  courseId: string;
  slug: string;
  title: string;
  level: number;
  levelLabel: string;
}

/** GET /courses/:id/path → `original` (backend originals.service.ts OriginalInfo). */
export interface OriginalInfo {
  trackId: string;
  trackSlug: string;
  trackTitle: string;
  level: number;
  levelLabel: string;
  /** Published levels in the Track. */
  levelCount: number;
  /** Units written but not released yet — drawn as "coming soon". */
  upcomingUnits: number;
  /** Beginner Originals: running out of hearts never blocks the learner. */
  forgivingHearts: boolean;
  nextLevel: NextLevel | null;
}

/** Lesson completion → `levelComplete`, when the learner finished a whole level. */
export interface LevelCompletion {
  trackTitle: string;
  level: number;
  levelLabel: string;
  /** The level they were just enrolled in; null when the Track is finished. */
  next: NextLevel | null;
}

/** GET /originals — the pinned "Teyro Originals" row. */
export interface OriginalTrackSummary {
  id: string;
  slug: string;
  title: string;
  category: string;
  description: string | null;
  levels: {
    courseId: string;
    slug: string;
    title: string;
    shortDescription: string | null;
    thumbnailUrl: string | null;
    level: number;
    levelLabel: string;
    upcomingUnits: number;
    learners: number;
  }[];
}

export function levelLabel(level: number | null | undefined): string {
  return LEVEL_LABELS[level ?? 1] ?? `Level ${level}`;
}

export const MILESTONE_LABEL: Record<LessonMilestone, string> = {
  CHECKPOINT: 'Checkpoint',
  UNIT_CHALLENGE: 'Unit Challenge',
};
