/**
 * Onboarding v3 — the flow as data (founder, 2026-10-22; Duolingo's order
 * 2026-10-23).
 *
 *   splash → welcome → Tey → "I want to learn…" (every course) → name →
 *   how did you hear → why → how much do you know (this also picks where they
 *   start; the separate "New to it, or know some?" screen was folded into it,
 *   2026-10-27) → daily goal → what you'll get → projection → reminder time →
 *   commit →
 *     new:        first-lesson hero → 3-minute taste of lesson 1 → nice start
 *     know some:  "jump ahead" hero → placement test (ends on where you placed)
 *   → gift chest → save your progress (signup) → your plan → Pro → result →
 *   install + reminders → the app.
 *
 * Every question must change a later screen (the playbook's cutting rule).
 * The order is the array; the two lesson paths are branches of it.
 */

export type StepId =
  | 'splash'
  | 'welcome'
  | 'intro'
  | 'learn'
  | 'name'
  | 'source'
  | 'goal'
  | 'experience'
  | 'daily'
  | 'outcome'
  | 'projection'
  | 'reminder-time'
  | 'commit'
  | 'lesson-intro'
  | 'lesson'
  | 'taste-done'
  | 'placement-intro'
  | 'placement'
  | 'chest'
  | 'save'
  | 'plan'
  | 'paywall'
  | 'result'
  | 'install'
  | 'enter';

export type LessonPath = 'start' | 'placement';

export interface StepDef {
  id: StepId;
  /** Shown with the top bar (the splash, lesson, test and paywall own the screen). */
  chrome: boolean;
  /** After signup: the account exists, so leaving is safe. */
  postSignup?: boolean;
  /** Questions with an answer key must be answered to continue. */
  answerKey?: keyof AnswersV3;
  /** Only on one of the two lesson paths. */
  branch?: LessonPath;
}

export const STEPS: StepDef[] = [
  { id: 'splash', chrome: false },
  { id: 'welcome', chrome: false },
  { id: 'intro', chrome: true },
  { id: 'learn', chrome: true, answerKey: 'courseId' },
  { id: 'name', chrome: true, answerKey: 'name' },
  { id: 'source', chrome: true, answerKey: 'source' },
  { id: 'goal', chrome: true, answerKey: 'goal' },
  { id: 'experience', chrome: true, answerKey: 'experienceLevel' },
  { id: 'daily', chrome: true, answerKey: 'dailyCommitment' },
  { id: 'outcome', chrome: true },
  { id: 'projection', chrome: true },
  { id: 'reminder-time', chrome: true, answerKey: 'preferredTime' },
  { id: 'commit', chrome: true, answerKey: 'committed' },
  { id: 'lesson-intro', chrome: true, branch: 'start' },
  { id: 'lesson', chrome: false, branch: 'start' },
  { id: 'taste-done', chrome: false, branch: 'start' },
  { id: 'placement-intro', chrome: true, branch: 'placement' },
  { id: 'placement', chrome: false, branch: 'placement' },
  { id: 'chest', chrome: false },
  { id: 'save', chrome: true },
  { id: 'plan', chrome: false, postSignup: true },
  { id: 'paywall', chrome: false, postSignup: true },
  { id: 'result', chrome: false, postSignup: true },
  { id: 'install', chrome: true, postSignup: true },
  { id: 'enter', chrome: false, postSignup: true },
];

export const STEP_INDEX: Record<StepId, number> = Object.fromEntries(
  STEPS.map((s, i) => [s.id, i]),
) as Record<StepId, number>;

export const STEP_DEF: Record<StepId, StepDef> = Object.fromEntries(STEPS.map((s) => [s.id, s])) as Record<
  StepId,
  StepDef
>;

/** The steps this learner walks: the shared ones plus their lesson path. */
export function flowFor(path: LessonPath | undefined): StepDef[] {
  const p = path ?? 'start';
  return STEPS.filter((s) => !s.branch || s.branch === p);
}

export function nextOf(step: StepId, path: LessonPath | undefined): StepId {
  const flow = flowFor(path);
  const i = flow.findIndex((s) => s.id === step);
  return flow[Math.min(flow.length - 1, i + 1)].id;
}

export function prevOf(step: StepId, path: LessonPath | undefined): StepId {
  const flow = flowFor(path);
  const i = flow.findIndex((s) => s.id === step);
  return flow[Math.max(0, i - 1)].id;
}

/**
 * After the lesson or test and before signup, leaving would lose what they
 * just earned, so the quit sheet steps in (and only then).
 */
const LOSS_STEPS: StepId[] = ['taste-done', 'chest', 'save'];
export function losesProgress(step: StepId): boolean {
  return LOSS_STEPS.includes(step);
}

export type DailyCommitment = '5' | '10' | '20' | '30';
export type PreferredTime = 'morning' | 'afternoon' | 'evening' | 'no-preference';

export interface PlacementResult {
  targetSectionId: string | null;
  /** 1-based chapter they start at, and its title. */
  chapter: number;
  chapterTitle: string;
  correct: number;
  total: number;
}

export interface AnswersV3 {
  name?: string;
  goal?: string;
  /** Derived from the course picked on "I want to learn…". */
  category?: string;
  courseId?: string;
  experienceLevel?: 'new' | 'some' | 'lots';
  source?: string;
  dailyCommitment?: DailyCommitment;
  preferredTime?: PreferredTime;
  committed?: boolean;
  /** Set by the experience answer: brand new starts, knowing some is placed. */
  path?: LessonPath;
  /** Said they know some or a lot (also true when that leads to lesson 1). */
  knowsSome?: boolean;
  placement?: PlacementResult;
  lesson?: {
    claimToken?: string;
    courseId?: string;
    lessonId?: string;
    done?: boolean;
    /** A taste: questions answered and right first time. */
    taste?: { questions: number; right: number; bestCombo: number };
    timezoneOffset?: number;
  };
  anonymousId?: string;
  installed?: boolean;
  notifications?: { enabled?: boolean; permission?: string };
}

/**
 * The progress bar starts with a head start (endowed progress: people work
 * harder to finish something already under way) and moves on every step.
 */
export function progressFor(step: StepId, path?: LessonPath): number {
  const flow = flowFor(path);
  const i = Math.max(0, flow.findIndex((s) => s.id === step));
  return Math.min(1, 0.08 + (i / (flow.length - 1)) * 0.92);
}

export const DAILY_OPTIONS: { id: DailyCommitment; label: string; minutes: number }[] = [
  { id: '5', label: 'Casual', minutes: 5 },
  { id: '10', label: 'Regular', minutes: 10 },
  { id: '20', label: 'Serious', minutes: 20 },
  { id: '30', label: 'Intense', minutes: 30 },
];

export const EXPERIENCE_OPTIONS = [
  { id: 'new', label: "I'm brand new to it", sub: 'Start me from the very beginning' },
  { id: 'some', label: 'I know a little', sub: "I've tried it, but I'm not confident" },
  { id: 'lots', label: 'I know it well', sub: 'I want to go deeper' },
] as const;

export const SOURCE_OPTIONS = [
  { id: 'tiktok', label: 'TikTok' },
  { id: 'instagram', label: 'Instagram' },
  { id: 'youtube', label: 'YouTube' },
  { id: 'google', label: 'Google' },
  { id: 'friend', label: 'A friend' },
  { id: 'x', label: 'X' },
  { id: 'linkedin', label: 'LinkedIn' },
  { id: 'app-store', label: 'App store' },
  { id: 'other', label: 'Other' },
] as const;

export const TIME_OPTIONS: { id: PreferredTime; label: string; hint: string; hour: number }[] = [
  { id: 'morning', label: 'Morning', hint: 'Around 8am', hour: 8 },
  { id: 'afternoon', label: 'Afternoon', hint: 'Around 1pm', hour: 13 },
  { id: 'evening', label: 'Evening', hint: 'Around 7pm', hour: 19 },
  { id: 'no-preference', label: 'Any time', hint: 'Tey learns your habit', hour: 19 },
];
