/**
 * Onboarding catalog — the single registry of what Teyro teaches at launch.
 *
 * Labels, learner-facing copy, and the mapping from a Teyro learning track to
 * the strings that actually appear in `Course.category` all live here. No
 * component, dialogue rule, or API caller may hardcode a category string.
 *
 * Launch scope is Coding and AI. Adding a third category later is one entry in
 * `CATEGORIES` plus a member of `LearningCategory` — nothing else changes.
 *
 * `courseCategories` is deliberately a list of the *existing* free-text
 * `Course.category` values (there is no Category model; `admin-courses.service.ts`
 * derives the live set with a DISTINCT). A track with no live courses is a
 * normal, expected state — the completion screen says so rather than
 * inventing one.
 */

import type {
  AiInterest,
  CodingInterest,
  ExperienceLevel,
  LearningBarrier,
  LearningCategory,
  LearningGoal,
  LearningInterest,
  PreferredTime,
  PriorAttempt,
} from './types';

export interface InterestOption<T extends string = LearningInterest> {
  id: T;
  label: string;
  description: string;
  /** Rendered smaller / lower than the headline interests. */
  secondary?: boolean;
}

export interface CategoryDefinition {
  id: LearningCategory;
  label: string;
  /** Card copy on the category step. */
  description: string;
  /** Used inside sentences: "what part of {noun} are you most excited about?" */
  noun: string;
  interests: InterestOption[];
  /** Live `Course.category` values that belong to this track, best match first. */
  courseCategories: string[];
}

const EXPLORING_COPY = {
  label: "I'm not sure yet",
  description: "That's okay! We'll figure it out together.",
  secondary: true,
} as const;

const CODING_INTERESTS: InterestOption<CodingInterest>[] = [
  {
    id: 'web-development',
    label: 'Web Development',
    description: 'Build websites and web apps.',
  },
  {
    id: 'mobile-development',
    label: 'Mobile App Development',
    description: 'Build apps for Android and iPhone.',
  },
  {
    id: 'programming-fundamentals',
    label: 'Programming Fundamentals',
    description: 'Learn how code works and how to solve problems with it.',
  },
  {
    id: 'software-development',
    label: 'Software Development',
    description: 'Build real software, APIs and projects.',
  },
  { id: 'exploring', ...EXPLORING_COPY },
];

const AI_INTERESTS: InterestOption<AiInterest>[] = [
  {
    id: 'use-tools',
    label: 'Use AI Tools',
    description: 'Use AI to work faster, create and research.',
  },
  {
    id: 'build-agents',
    label: 'Build AI Agents',
    description: 'Build AI helpers that do tasks for you.',
  },
  {
    id: 'automations',
    label: 'Create Automations',
    description: 'Make repetitive tasks run by themselves.',
  },
  { id: 'exploring', ...EXPLORING_COPY },
];

export const CATEGORIES: Record<LearningCategory, CategoryDefinition> = {
  coding: {
    id: 'coding',
    label: 'Coding',
    description: 'Write code, build projects and bring your ideas to life.',
    noun: 'coding',
    interests: CODING_INTERESTS,
    courseCategories: ['Coding', 'Development', 'IT & Software'],
  },
  ai: {
    id: 'ai',
    label: 'AI',
    description: 'Use AI tools, build AI agents and automate your work.',
    noun: 'AI',
    interests: AI_INTERESTS,
    courseCategories: ['AI', 'Artificial Intelligence', 'Data Science'],
  },
};

export const CATEGORY_LIST: CategoryDefinition[] = [CATEGORIES.coding, CATEGORIES.ai];

// ─── Label lookups ───────────────────────────────────────────────────────────
// Everything user-facing resolves through these. Raw ids never reach a screen.

export function categoryLabel(id: LearningCategory | undefined): string {
  return id ? CATEGORIES[id].label : '';
}

export function interestOption(
  category: LearningCategory | undefined,
  id: LearningInterest | undefined,
): InterestOption | undefined {
  if (!category || !id) return undefined;
  return CATEGORIES[category].interests.find((i) => i.id === id);
}

export function interestLabel(
  category: LearningCategory | undefined,
  id: LearningInterest | undefined,
): string {
  return interestOption(category, id)?.label ?? '';
}

export function interestOptionsFor(category: LearningCategory | undefined): InterestOption[] {
  return category ? CATEGORIES[category].interests : [];
}

// ─── Remaining option sets ───────────────────────────────────────────────────

export interface Option<T extends string> {
  id: T;
  label: string;
  description?: string;
}

export const GOAL_OPTIONS: Option<LearningGoal>[] = [
  { id: 'build-projects', label: 'Build my own projects' },
  { id: 'career', label: 'Get a job or grow my career' },
  { id: 'freelance', label: 'Start freelancing' },
  { id: 'startup', label: 'Start a business' },
  { id: 'automate', label: 'Automate boring tasks' },
  { id: 'explore', label: 'Explore something new' },
  { id: 'improve-skills', label: 'Get better at what I do' },
];

/**
 * Experience descriptions are written per category rather than generated from
 * a template — "never written a line of code" and "you've maybe used ChatGPT"
 * are genuinely different starting points, not the same sentence with a noun
 * swapped.
 */
const EXPERIENCE_DESCRIPTIONS: Record<LearningCategory, Record<ExperienceLevel, string>> = {
  coding: {
    beginner: "I've never written a line of code.",
    'tried-a-little': "I've followed a tutorial or two.",
    basics: 'I can write simple programs on my own.',
    experienced: "I've built real things and want to go further.",
  },
  ai: {
    beginner: "I've maybe used ChatGPT, and that's about it.",
    'tried-a-little': "I've played with a few AI tools.",
    basics: 'I use AI tools regularly and know what they can do.',
    experienced: "I've built with AI before and want to go deeper.",
  },
};

export const EXPERIENCE_LEVELS: ExperienceLevel[] = [
  'beginner',
  'tried-a-little',
  'basics',
  'experienced',
];

const EXPERIENCE_LABELS: Record<ExperienceLevel, string> = {
  beginner: 'Complete beginner',
  'tried-a-little': "I've tried a little",
  basics: 'I know the basics',
  experienced: 'I already have some experience',
};

export function experienceOptions(
  category: LearningCategory | undefined,
): Option<ExperienceLevel>[] {
  const descriptions = EXPERIENCE_DESCRIPTIONS[category ?? 'coding'];
  return EXPERIENCE_LEVELS.map((id) => ({
    id,
    label: EXPERIENCE_LABELS[id],
    description: descriptions[id],
  }));
}

export function experienceLabel(id: ExperienceLevel | undefined): string {
  return id ? EXPERIENCE_LABELS[id] : '';
}

export const PRIOR_ATTEMPT_OPTIONS: Option<PriorAttempt>[] = [
  { id: 'stopped', label: 'Yes, but I stopped' },
  { id: 'still-learning', label: "Yes, and I'm still learning" },
  { id: 'self-taught-a-little', label: "I've learned a bit on my own" },
  { id: 'first-time', label: 'No, this is my first time' },
  { id: 'skipped', label: "I'd rather not say" },
];

export const BARRIER_OPTIONS: Option<LearningBarrier>[] = [
  { id: 'distracted', label: 'I get distracted easily' },
  { id: 'consistency', label: 'I find it hard to keep going' },
  { id: 'boring', label: 'Lessons get boring' },
  { id: 'what-next', label: "I don't know what to learn next" },
  { id: 'hard-concepts', label: 'Some topics feel too hard' },
  { id: 'no-time', label: "I don't have much time" },
  { id: 'accountability', label: 'I need someone to keep me on track' },
  { id: 'none', label: 'Nothing really' },
];

export const PREFERRED_TIME_OPTIONS: Option<PreferredTime>[] = [
  { id: 'morning', label: 'Morning' },
  { id: 'afternoon', label: 'Afternoon' },
  { id: 'evening', label: 'Evening' },
  { id: 'no-preference', label: 'No specific time' },
];

export function preferredTimeLabel(id: PreferredTime | undefined): string {
  return PREFERRED_TIME_OPTIONS.find((o) => o.id === id)?.label ?? '';
}

export function goalLabel(id: LearningGoal | undefined): string {
  return GOAL_OPTIONS.find((o) => o.id === id)?.label ?? '';
}

export function barrierLabel(id: LearningBarrier | undefined): string {
  return BARRIER_OPTIONS.find((o) => o.id === id)?.label ?? '';
}

export function priorAttemptLabel(id: PriorAttempt | undefined): string {
  return PRIOR_ATTEMPT_OPTIONS.find((o) => o.id === id)?.label ?? '';
}

/** Course categories to query for a learner's chosen track. */
export function courseCategoriesFor(category: LearningCategory | undefined): string[] {
  return category ? CATEGORIES[category].courseCategories : [];
}
