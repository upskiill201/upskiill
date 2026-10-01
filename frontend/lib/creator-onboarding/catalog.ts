/**
 * Creator onboarding — the answers and their options.
 *
 * Every question here earns its place: each answer is either written to the
 * creator's Profile on sign-up (backend `hydrateFromOnboarding`), shapes the
 * plan Tey reveals, or both. Ids are kebab-case and closed unions, validated
 * again on the server.
 */

import type { CreatorTrack } from '@/lib/creator/categories';

export type CreatorType =
  | 'course-creator'
  | 'content-creator'
  | 'teacher'
  | 'mentor'
  | 'engineer'
  | 'new-creator';

export type TeachingExperience = 'first-time' | 'some' | 'experienced' | 'pro';

export type AudienceSize = 'none' | 'under-1k' | '1k-10k' | '10k-100k' | '100k-plus';

export type ExistingContent = 'videos' | 'full-course' | 'notes' | 'community' | 'nothing-yet';

export type CreatorGoal = 'earn' | 'audience' | 'impact' | 'community';

export type WeeklyHours = '1-2' | '3-5' | '6-10' | '10-plus';

export interface CreatorAnswers {
  name?: string;
  creatorType?: CreatorType;
  track?: CreatorTrack;
  /** Learner interest ids for the chosen track (lib/creator/categories). */
  topics?: string[];
  experience?: TeachingExperience;
  audience?: AudienceSize;
  existing?: ExistingContent[];
  goal?: CreatorGoal;
  weeklyHours?: WeeklyHours;
}

export interface CreatorOption<T extends string> {
  id: T;
  label: string;
  description?: string;
  /** Rendered apart and quieter. */
  secondary?: boolean;
}

export const CREATOR_TYPE_OPTIONS: CreatorOption<CreatorType>[] = [
  { id: 'course-creator', label: 'Course creator', description: "I've made or sold courses before." },
  { id: 'content-creator', label: 'YouTuber or content creator', description: 'I teach through videos and posts.' },
  { id: 'teacher', label: 'Teacher or lecturer', description: 'I teach in a school, bootcamp or university.' },
  { id: 'mentor', label: 'Mentor or coach', description: 'I guide people one-on-one or in small groups.' },
  { id: 'engineer', label: 'Working engineer', description: 'I build this stuff for a living.' },
  { id: 'new-creator', label: "I'm just starting out", description: 'This will be my first time teaching online.', secondary: true },
];

export const EXPERIENCE_OPTIONS: CreatorOption<TeachingExperience>[] = [
  { id: 'first-time', label: 'This is my first time', description: "I know my stuff, I haven't taught it yet." },
  { id: 'some', label: "I've taught a little", description: 'Workshops, tutorials or helping friends.' },
  { id: 'experienced', label: "I've taught a lot", description: 'Classes, cohorts or a course or two.' },
  { id: 'pro', label: 'Teaching is my job', description: 'I teach full-time or run a teaching business.' },
];

export const AUDIENCE_OPTIONS: CreatorOption<AudienceSize>[] = [
  { id: 'none', label: 'No audience yet', description: "That's fine: Teyro brings the learners." },
  { id: 'under-1k', label: 'Under 1,000 followers' },
  { id: '1k-10k', label: '1,000 to 10,000' },
  { id: '10k-100k', label: '10,000 to 100,000' },
  { id: '100k-plus', label: 'Over 100,000' },
];

export const EXISTING_CONTENT_OPTIONS: CreatorOption<ExistingContent>[] = [
  { id: 'videos', label: 'Recorded videos', description: 'Tutorials, YouTube videos or recorded classes.' },
  { id: 'full-course', label: 'A full course', description: 'Already on Udemy, Teachable or my own site.' },
  { id: 'notes', label: 'Notes, slides or PDFs', description: 'Written material I teach from.' },
  { id: 'community', label: 'A community', description: 'A WhatsApp, Telegram, Discord or Skool group.' },
  { id: 'nothing-yet', label: "Nothing yet, I'm starting fresh", secondary: true },
];

export const GOAL_OPTIONS: CreatorOption<CreatorGoal>[] = [
  { id: 'earn', label: 'Earn from what I know', description: 'Turn my skills into income.' },
  { id: 'audience', label: 'Grow my audience', description: 'Reach learners I can’t reach today.' },
  { id: 'impact', label: 'Help people learn', description: 'Get more people to actually finish.' },
  { id: 'community', label: 'Build a community', description: 'A group of learners that grows with me.' },
];

export const WEEKLY_HOURS_OPTIONS: CreatorOption<WeeklyHours>[] = [
  { id: '1-2', label: '1 to 2 hours', description: 'A little at a time, alongside everything else.' },
  { id: '3-5', label: '3 to 5 hours', description: 'A steady side project.' },
  { id: '6-10', label: '6 to 10 hours', description: 'A serious commitment.' },
  { id: '10-plus', label: 'More than 10 hours', description: 'This is my main thing.' },
];

/** Lessons a creator can realistically finish per week at each commitment. */
export const LESSONS_PER_WEEK: Record<WeeklyHours, number> = {
  '1-2': 1,
  '3-5': 2,
  '6-10': 4,
  '10-plus': 6,
};

/** A first course on Teyro: short enough to ship, long enough to matter. */
export const FIRST_COURSE_LESSONS = 8;

export function weeksToFirstCourse(hours: WeeklyHours | undefined): number {
  const perWeek = LESSONS_PER_WEEK[hours ?? '3-5'];
  return Math.max(1, Math.ceil(FIRST_COURSE_LESSONS / perWeek));
}

export function optionLabel<T extends string>(options: CreatorOption<T>[], id: T | undefined): string {
  return options.find((o) => o.id === id)?.label ?? '';
}

/**
 * Default creator revenue share (backend EarningsService: every new
 * agreement starts STANDARD at 70%; FOUNDING is admin-granted).
 */
export const DEFAULT_CREATOR_SHARE_PCT = 70;
