/**
 * Creator onboarding answers, kept in this browser until the account exists.
 *
 * Key `teyro_creator_onboarding_v2`. Nothing reaches the server before the
 * account step, which posts `toSignupPayload()` with the sign-up (or the
 * become-creator call for a signed-in learner). Sessions expire after 7 days
 * like the old flow.
 *
 * The 16-step flow stored `{ step2: { creatorType }, step3: { categories } … }`
 * under `teyro_creator_onboarding` (lib/onboarding.ts). `migrateLegacy`
 * carries over the answers that still mean something, once.
 */

import { isCreatorTrack } from '@/lib/creator/categories';
import type { AudienceSize, CreatorAnswers, CreatorType, ExistingContent } from './catalog';

export const CREATOR_ONBOARDING_KEY = 'teyro_creator_onboarding_v2';
const LEGACY_KEY = 'teyro_creator_onboarding';
const MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000;

export interface CreatorOnboardingState {
  version: 2;
  startedAt: number;
  /** Furthest step reached, for resuming. */
  furthestStep: number;
  answers: CreatorAnswers;
}

function empty(): CreatorOnboardingState {
  return { version: 2, startedAt: Date.now(), furthestStep: 1, answers: {} };
}

const LEGACY_TYPES: Record<string, CreatorType> = {
  course_creator: 'course-creator',
  youtube_educator: 'content-creator',
  coach: 'mentor',
  mentor: 'mentor',
  teacher: 'teacher',
  community_educator: 'content-creator',
  freelancer: 'engineer',
  agency_educator: 'course-creator',
};

const LEGACY_AUDIENCE: Record<string, AudienceSize> = {
  just_starting: 'none',
  under_1k: 'under-1k',
  '1k_10k': '1k-10k',
  '10k_100k': '10k-100k',
  '100k_plus': '100k-plus',
};

const LEGACY_CONTENT: Record<string, ExistingContent> = {
  full_courses: 'full-course',
  recorded_videos: 'videos',
  pdfs_resources: 'notes',
  community_group: 'community',
  nothing_yet: 'nothing-yet',
};

/** Exported for tests. */
export function migrateLegacyAnswers(legacy: Record<string, unknown>): CreatorAnswers {
  const step = (n: number) => (legacy[`step${n}`] ?? {}) as Record<string, unknown>;
  const answers: CreatorAnswers = {};

  const type = LEGACY_TYPES[String(step(2).creatorType ?? '')];
  if (type) answers.creatorType = type;

  const category = (step(3).categories as unknown[] | undefined)?.[0];
  const track = category === 'programming' ? 'coding' : category;
  if (isCreatorTrack(track)) answers.track = track;

  const audience = LEGACY_AUDIENCE[String(step(4).audienceSize ?? '')];
  if (audience) answers.audience = audience;

  const content = ((step(6).existingContent as unknown[] | undefined) ?? [])
    .map((c) => LEGACY_CONTENT[String(c)])
    .filter((c): c is ExistingContent => Boolean(c));
  if (content.length > 0) answers.existing = content;

  return answers;
}

function read(): CreatorOnboardingState | null {
  try {
    const raw = localStorage.getItem(CREATOR_ONBOARDING_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as CreatorOnboardingState;
    if (parsed?.version !== 2 || typeof parsed.answers !== 'object') return null;
    if (Date.now() - parsed.startedAt > MAX_AGE_MS) {
      localStorage.removeItem(CREATOR_ONBOARDING_KEY);
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

function write(state: CreatorOnboardingState): void {
  try {
    localStorage.setItem(CREATOR_ONBOARDING_KEY, JSON.stringify(state));
  } catch {
    // Storage full or disabled: the flow still works, it just won't resume.
  }
}

export function getCreatorOnboarding(): CreatorOnboardingState {
  if (typeof window === 'undefined') return empty();
  const current = read();
  if (current) return current;

  // One-time carry-over from the 16-step flow.
  try {
    const legacyRaw = localStorage.getItem(LEGACY_KEY);
    if (legacyRaw) {
      localStorage.removeItem(LEGACY_KEY);
      const migrated = { ...empty(), answers: migrateLegacyAnswers(JSON.parse(legacyRaw)) };
      write(migrated);
      return migrated;
    }
  } catch {
    // A corrupt legacy blob is not worth failing the page over.
  }
  return empty();
}

export function saveCreatorAnswers(answers: CreatorAnswers, furthestStep?: number): CreatorOnboardingState {
  const current = getCreatorOnboarding();
  const next: CreatorOnboardingState = {
    ...current,
    answers,
    furthestStep: Math.max(current.furthestStep, furthestStep ?? current.furthestStep),
  };
  write(next);
  return next;
}

export function clearCreatorOnboarding(): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(CREATOR_ONBOARDING_KEY);
    localStorage.removeItem(LEGACY_KEY);
  } catch {
    /* nothing to clear */
  }
}

/** What the backend's hydrateFromOnboarding reads (version 2 shape). */
export function toSignupPayload(answers: CreatorAnswers): Record<string, unknown> | null {
  const hasAny = Object.values(answers).some((v) => (Array.isArray(v) ? v.length > 0 : Boolean(v)));
  if (!hasAny) return null;
  return { version: 2, ...answers };
}
