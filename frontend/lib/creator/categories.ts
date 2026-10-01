/**
 * Creator-side course tracks — Teyro launches with Coding and AI only.
 *
 * One list for every creator surface (onboarding, the create-course wizard,
 * the builder's setup form, the studio profile). Topics are the learner
 * catalog's interests, so what a creator says they teach lines up exactly
 * with what learners said they want to learn.
 *
 * `Course.category` stays free text on the backend. New courses store the
 * track label ("Coding" / "AI"); older strings ("Programming & Development",
 * "Development", "AI & Machine Learning"…) are mapped back to a track for
 * display by `normalizeCourseCategory`.
 */

import { CATEGORIES, type InterestOption } from '@/lib/onboarding/catalog';
import type { LearningCategory } from '@/lib/onboarding/types';

export type CreatorTrack = LearningCategory;

export interface CreatorTrackDefinition {
  id: CreatorTrack;
  /** The value written to `Course.category`. */
  label: string;
  description: string;
  /** Topics a creator can teach — learner interest ids, minus "not sure yet". */
  topics: InterestOption[];
}

const CREATOR_DESCRIPTIONS: Record<CreatorTrack, string> = {
  coding: 'Web, mobile, programming fundamentals and real software.',
  ai: 'AI tools, AI agents and automations people can use at work.',
};

export const CREATOR_TRACKS: Record<CreatorTrack, CreatorTrackDefinition> = {
  coding: {
    id: 'coding',
    label: CATEGORIES.coding.label,
    description: CREATOR_DESCRIPTIONS.coding,
    topics: CATEGORIES.coding.interests.filter((i) => i.id !== 'exploring'),
  },
  ai: {
    id: 'ai',
    label: CATEGORIES.ai.label,
    description: CREATOR_DESCRIPTIONS.ai,
    topics: CATEGORIES.ai.interests.filter((i) => i.id !== 'exploring'),
  },
};

export const CREATOR_TRACK_LIST: CreatorTrackDefinition[] = [CREATOR_TRACKS.coding, CREATOR_TRACKS.ai];

export function isCreatorTrack(value: unknown): value is CreatorTrack {
  return value === 'coding' || value === 'ai';
}

export function trackLabel(id: CreatorTrack | null | undefined): string {
  return id ? CREATOR_TRACKS[id].label : '';
}

export function topicLabel(track: CreatorTrack | null | undefined, topicId: string): string {
  if (!track) return '';
  return CREATOR_TRACKS[track].topics.find((t) => t.id === topicId)?.label ?? '';
}

// Checked in order; AI first so "AI & Machine Learning" never lands on Coding
// through a generic "development"/"engineering" word.
const AI_PATTERN = /\b(ai|a\.i\.|artificial intelligence|machine learning|ml|data science|llm|agents?|automations?)\b/i;
const CODING_PATTERN =
  /\b(coding|code|programming|development|developer|software|web|mobile|apps?|it|engineering|javascript|python)\b/i;

/**
 * Maps any stored `Course.category` string to a launch track, or null when it
 * belongs to neither (legacy Design/Music/… courses).
 */
export function normalizeCourseCategory(category: string | null | undefined): CreatorTrack | null {
  if (!category) return null;
  const value = category.trim();
  if (!value) return null;
  const lower = value.toLowerCase();
  if (lower === 'coding') return 'coding';
  if (lower === 'ai') return 'ai';
  if (AI_PATTERN.test(value)) return 'ai';
  if (CODING_PATTERN.test(value)) return 'coding';
  return null;
}
