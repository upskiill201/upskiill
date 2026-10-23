/**
 * Onboarding v3 — the flow as data (founder, 2026-10-22).
 *
 * Duolingo's shape: ask the outcome, pick a real course, play its real first
 * lesson, celebrate, THEN ask them to save it by signing up, build their plan
 * and show the paywall, then install + reminders. Every question must change
 * a later screen (the playbook's cutting rule).
 *
 * The order is the array; screens read nothing but their step id.
 */

export type StepId =
  | 'splash'
  | 'welcome'
  | 'intro'
  | 'name'
  | 'goal'
  | 'category'
  | 'course'
  | 'experience'
  | 'situation'
  | 'source'
  | 'daily'
  | 'projection'
  | 'reminder-time'
  | 'commit'
  | 'lesson-intro'
  | 'lesson'
  | 'chest'
  | 'save'
  | 'plan'
  | 'paywall'
  | 'result'
  | 'install'
  | 'enter';

export interface StepDef {
  id: StepId;
  /** Shown in the progress bar? (the splash, lesson and paywall own the screen) */
  chrome: boolean;
  /** After signup: the account exists, so leaving is safe. */
  postSignup?: boolean;
  /** Questions with an answer key must be answered to continue. */
  answerKey?: keyof AnswersV3;
}

export const STEPS: StepDef[] = [
  { id: 'splash', chrome: false },
  { id: 'welcome', chrome: false },
  { id: 'intro', chrome: true },
  { id: 'name', chrome: true, answerKey: 'name' },
  { id: 'goal', chrome: true, answerKey: 'goal' },
  { id: 'category', chrome: true, answerKey: 'category' },
  { id: 'course', chrome: true, answerKey: 'courseId' },
  { id: 'experience', chrome: true, answerKey: 'experienceLevel' },
  { id: 'situation', chrome: true, answerKey: 'situation' },
  { id: 'source', chrome: true, answerKey: 'source' },
  { id: 'daily', chrome: true, answerKey: 'dailyCommitment' },
  { id: 'projection', chrome: true },
  { id: 'reminder-time', chrome: true, answerKey: 'preferredTime' },
  { id: 'commit', chrome: true, answerKey: 'committed' },
  { id: 'lesson-intro', chrome: true },
  { id: 'lesson', chrome: false },
  { id: 'chest', chrome: false },
  { id: 'save', chrome: true },
  { id: 'plan', chrome: false, postSignup: true },
  { id: 'paywall', chrome: false, postSignup: true },
  { id: 'result', chrome: false, postSignup: true },
  // Install first, then reminders (RemindersScreen does both, Duolingo order).
  { id: 'install', chrome: true, postSignup: true },
  { id: 'enter', chrome: false, postSignup: true },
];

export const STEP_INDEX: Record<StepId, number> = Object.fromEntries(
  STEPS.map((s, i) => [s.id, i]),
) as Record<StepId, number>;

/** Where quitting would lose real progress (the lesson and its rewards). */
export const LOSS_FROM = STEP_INDEX.lesson;

export type DailyCommitment = '5' | '10' | '20' | '30';
export type PreferredTime = 'morning' | 'afternoon' | 'evening' | 'no-preference';

export interface AnswersV3 {
  name?: string;
  goal?: string;
  category?: string;
  courseId?: string;
  experienceLevel?: 'new' | 'some' | 'lots';
  situation?: string;
  source?: string;
  dailyCommitment?: DailyCommitment;
  preferredTime?: PreferredTime;
  committed?: boolean;
  lesson?: { claimToken?: string; courseId?: string; lessonId?: string; done?: boolean; timezoneOffset?: number };
  anonymousId?: string;
  installed?: boolean;
  notifications?: { enabled?: boolean; permission?: string };
}

/**
 * The progress bar starts with a head start (endowed progress: people work
 * harder to finish something already under way) and moves on every step.
 */
export function progressFor(step: StepId): number {
  const i = STEP_INDEX[step];
  const last = STEPS.length - 1;
  return Math.min(1, 0.08 + (i / last) * 0.92);
}

export const DAILY_OPTIONS: { id: DailyCommitment; label: string; minutes: number }[] = [
  { id: '5', label: 'Casual', minutes: 5 },
  { id: '10', label: 'Regular', minutes: 10 },
  { id: '20', label: 'Serious', minutes: 20 },
  { id: '30', label: 'Intense', minutes: 30 },
];

export const EXPERIENCE_OPTIONS = [
  { id: 'new', label: "I'm brand new to this" },
  { id: 'some', label: 'I know a little' },
  { id: 'lots', label: 'I know it well, I want to go deeper' },
] as const;

export const SITUATION_OPTIONS = [
  { id: 'job-hunting', label: "I'm looking for a job" },
  { id: 'new-role', label: 'I want to do better in my role' },
  { id: 'career-change', label: "I'm changing careers" },
  { id: 'side-project', label: "I'm building something on the side" },
  { id: 'studying', label: "I'm studying" },
  { id: 'curious', label: "I'm just curious" },
] as const;

export const SOURCE_OPTIONS = [
  { id: 'tiktok', label: 'TikTok' },
  { id: 'instagram', label: 'Instagram' },
  { id: 'youtube', label: 'YouTube' },
  { id: 'google', label: 'Google search' },
  { id: 'friend', label: 'A friend told me' },
  { id: 'x', label: 'X (Twitter)' },
  { id: 'linkedin', label: 'LinkedIn' },
  { id: 'app-store', label: 'App store' },
  { id: 'other', label: 'Somewhere else' },
] as const;

export const TIME_OPTIONS: { id: PreferredTime; label: string; hint: string }[] = [
  { id: 'morning', label: 'Morning', hint: 'Around 8am' },
  { id: 'afternoon', label: 'Afternoon', hint: 'Around 1pm' },
  { id: 'evening', label: 'Evening', hint: 'Around 7pm' },
  { id: 'no-preference', label: "Whenever suits me", hint: 'Tey learns your habit' },
];
