/**
 * The lesson builder's working copy of a lesson, and how it goes to and from
 * the server.
 *
 * Loading converts a lesson saved by the old builder (one video / audio /
 * rich-text blob + multiple choice) into the v2 shape — a Learn card deck and
 * an exercise list — so every lesson is edited the same way. Saving always
 * writes v2 blocks (lib/lesson/blocks.ts), which the player and the server
 * both understand; the old blocks are simply no longer written.
 *
 * Deepen is optional: switched off, it saves nothing and never blocks
 * publishing.
 */

/* eslint-disable @typescript-eslint/no-explicit-any -- lesson JSON from the API */

import {
  newBlockId,
  validateApply,
  validateLearnCards,
  type ApplyContent,
  type BlockIssue,
  type LearnCard,
} from '@/lib/lesson/blocks';
import { parseExercise } from '@/lib/lesson/sanitize';

export interface ReflectDraft {
  prompt: string;
  type: 'open' | 'guided';
  openConfig: {
    useStarters: boolean;
    starters: { id: string; text: string }[];
    minWordCount: number;
    required: boolean;
    peerVisibility: boolean;
    allowComments: boolean;
    allowAttachments: boolean;
  };
  guidedConfig: {
    questions: { id: string; text: string }[];
    minWordCountPerQuestion: number;
    required: boolean;
    allowAttachments: boolean;
  };
}

export interface DeepenDraft {
  enabled: boolean;
  collectionTitle: string;
  collectionDescription: string;
}

export interface ResourceDraft {
  id: string;
  title: string;
  url: string;
  type: string;
  description?: string;
}

export interface LessonDraft {
  title: string;
  shortDescription: string;
  whatYouWillLearn: string[];
  cards: LearnCard[];
  apply: ApplyContent;
  reflect: ReflectDraft;
  deepen: DeepenDraft;
}

export type BuilderPhase = 'learn' | 'apply' | 'reflect' | 'deepen';

export const DEFAULT_REFLECT: ReflectDraft = {
  prompt: '',
  type: 'open',
  openConfig: {
    useStarters: true,
    starters: [],
    minWordCount: 10,
    required: false,
    peerVisibility: false,
    allowComments: false,
    allowAttachments: false,
  },
  guidedConfig: { questions: [], minWordCountPerQuestion: 10, required: false, allowAttachments: false },
};

function blocksOf(lesson: any): Record<string, any> {
  let blocks = lesson?.contentBlocks;
  if (typeof blocks === 'string') {
    try {
      blocks = JSON.parse(blocks);
    } catch {
      blocks = {};
    }
  }
  return blocks && typeof blocks === 'object' ? blocks : {};
}

const find = (list: unknown, type: string): any =>
  Array.isArray(list) ? list.find((b: any) => b?.type === type)?.value : undefined;

const str = (v: unknown) => (typeof v === 'string' ? v : '');

/**
 * Builder cards keep what the creator typed, even half-finished — unlike the
 * learner sanitiser, nothing is dropped for being incomplete.
 */
function draftCards(raw: unknown): LearnCard[] {
  if (!Array.isArray(raw)) return [];
  return raw
    .filter((c: any) => c && typeof c === 'object' && typeof c.kind === 'string')
    .map((c: any) => ({ ...c, id: typeof c.id === 'string' && c.id ? c.id : newBlockId('card') }));
}

/** A lesson from GET /lesson/:id as a builder draft (v1 converted to v2). */
export function draftFromLesson(lesson: any): LessonDraft {
  const blocks = blocksOf(lesson);
  const wyl = find(blocks.learn, 'whatYouWillLearn');
  const v2Cards = find(blocks.learn, 'learnCards');
  const v2Apply = find(blocks.apply, 'exercises');

  let cards: LearnCard[];
  if (Array.isArray(v2Cards)) {
    cards = draftCards(v2Cards);
  } else {
    // v1: video, audio, then the reading, each becoming a card.
    cards = [];
    const video = str(find(blocks.learn, 'videoUrl'));
    const audio = str(find(blocks.learn, 'audioUrl'));
    const text = str(find(blocks.learn, 'text'));
    const seconds = Number(lesson?.estimatedDurationSeconds) || Number(lesson?.durationMinutes) * 60 || 0;
    if (video) cards.push({ id: newBlockId('card'), kind: 'video', url: video, durationSec: seconds });
    if (audio) cards.push({ id: newBlockId('card'), kind: 'audio', url: audio });
    if (text && text !== '<p><br></p>') cards.push({ id: newBlockId('card'), kind: 'text', html: text });
  }

  let apply: ApplyContent;
  if (v2Apply && typeof v2Apply === 'object') {
    apply = {
      scenario: str(v2Apply.scenario),
      items: Array.isArray(v2Apply.items)
        ? v2Apply.items.map(parseExercise).filter((e: unknown): e is ApplyContent['items'][number] => e !== null)
        : [],
    };
  } else {
    const mcq = find(blocks.apply, 'mcqActivity');
    apply = {
      scenario: str(mcq?.scenario),
      items: Array.isArray(mcq?.questions)
        ? mcq.questions.map((q: any) => ({
            id: typeof q?.id === 'string' ? q.id : newBlockId('ex'),
            kind: 'mcq' as const,
            variant: 'standard' as const,
            prompt: str(q?.questionText),
            explanation: str(q?.explanation) || undefined,
            options: Array.isArray(q?.options)
              ? q.options.map((o: any) => ({ id: String(o?.id ?? newBlockId('opt')), text: str(o?.text), misconception: str(o?.misconception) || undefined }))
              : [],
            correctOptionId: String(q?.correctOptionId ?? ''),
          }))
        : [],
    };
  }

  const reflectRaw = find(blocks.reflect, 'reflectActivity');
  const reflect: ReflectDraft = reflectRaw
    ? {
        ...DEFAULT_REFLECT,
        ...reflectRaw,
        type: reflectRaw.type === 'guided' ? 'guided' : 'open',
        openConfig: { ...DEFAULT_REFLECT.openConfig, ...(reflectRaw.openConfig ?? {}) },
        guidedConfig: { ...DEFAULT_REFLECT.guidedConfig, ...(reflectRaw.guidedConfig ?? {}) },
      }
    : DEFAULT_REFLECT;

  const deepenRaw = Array.isArray(blocks.deepen) ? find(blocks.deepen, 'deepenActivity') : blocks.deepen?.deepenActivity;
  const hasResources = Array.isArray(lesson?.resources) && lesson.resources.length > 0;
  const deepen: DeepenDraft = {
    enabled: Boolean(str(deepenRaw?.collectionTitle).trim()) || hasResources,
    collectionTitle: str(deepenRaw?.collectionTitle),
    collectionDescription: str(deepenRaw?.collectionDescription),
  };

  return {
    title: str(lesson?.title),
    shortDescription: str(lesson?.shortDescription),
    whatYouWillLearn: Array.isArray(wyl) ? wyl.map(str) : [],
    cards,
    apply,
    reflect,
    deepen,
  };
}

export function resourcesFromLesson(lesson: any): ResourceDraft[] {
  return Array.isArray(lesson?.resources)
    ? lesson.resources.map((r: any) => ({
        id: String(r.id),
        title: str(r.title) || str(r.originalName) || 'Resource',
        url: str(r.storageUrl),
        type: str(r.type) || 'link',
        description: str(r.description) || undefined,
      }))
    : [];
}

// ─── Checks ────────────────────────────────────────────────────────────────

export function reflectIssues(r: ReflectDraft): BlockIssue[] {
  const issues: BlockIssue[] = [];
  if (!r.prompt.trim()) issues.push({ id: null, message: 'Write the reflection question.' });
  if (r.type === 'guided' && r.guidedConfig.questions.filter((q) => q.text.trim()).length === 0) {
    issues.push({ id: null, message: 'Add at least one guided question.' });
  }
  return issues;
}

export function deepenIssues(d: DeepenDraft, resources: ResourceDraft[]): BlockIssue[] {
  if (!d.enabled) return [];
  const issues: BlockIssue[] = [];
  if (!d.collectionTitle.trim()) issues.push({ id: null, message: 'Give your extra resources a title, or switch Deepen off.' });
  if (resources.length === 0) issues.push({ id: null, message: 'Add at least one resource, or switch Deepen off.' });
  return issues;
}

export function phaseIssues(draft: LessonDraft, resources: ResourceDraft[]): Record<BuilderPhase, BlockIssue[]> {
  const learn = validateLearnCards(draft.cards);
  if (!draft.title.trim()) learn.unshift({ id: null, message: 'Give the lesson a title.' });
  return {
    learn,
    apply: validateApply(draft.apply),
    reflect: reflectIssues(draft.reflect),
    deepen: deepenIssues(draft.deepen, resources),
  };
}

/** Rough minutes a learner spends: media length + reading + exercises. */
export function estimateMinutes(draft: LessonDraft): number {
  let seconds = 0;
  for (const c of draft.cards) {
    if (c.kind === 'video') seconds += c.durationSec || 0;
    else if (c.kind === 'audio') seconds += c.durationSec || 60;
    else if (c.kind === 'text') seconds += Math.max(20, (c.html.replace(/<[^>]*>/g, ' ').split(/\s+/).length / 200) * 60);
    else seconds += 20;
  }
  seconds += draft.apply.items.length * 45;
  seconds += 90; // reflect
  return Math.max(1, Math.round(seconds / 60));
}

// ─── Saving ────────────────────────────────────────────────────────────────

export function savePayload(draft: LessonDraft, resources: ResourceDraft[], version: number) {
  const issues = phaseIssues(draft, resources);
  return {
    title: draft.title.trim() || 'Untitled lesson',
    shortDescription: draft.shortDescription,
    durationMinutes: estimateMinutes(draft),
    learnBlocks: [
      { type: 'whatYouWillLearn', value: draft.whatYouWillLearn.filter((w) => w.trim()) },
      { type: 'learnCards', value: draft.cards },
    ],
    applyBlocks: [{ type: 'exercises', value: draft.apply }],
    reflectBlocks: [{ type: 'reflectActivity', value: draft.reflect }],
    deepenBlocks: draft.deepen.enabled
      ? [
          {
            type: 'deepenActivity',
            value: { collectionTitle: draft.deepen.collectionTitle, collectionDescription: draft.deepen.collectionDescription },
          },
        ]
      : [],
    // The server recomputes Learn/Apply for v2 blocks; these are hints.
    isLearnCompleted: issues.learn.length === 0,
    isApplyCompleted: issues.apply.length === 0,
    isReflectCompleted: issues.reflect.length === 0,
    isDeepenCompleted: draft.deepen.enabled && issues.deepen.length === 0,
    version,
  };
}

/** A lesson as the learner player reads it — for the builder's live preview. */
export function previewLesson(draft: LessonDraft, resources: ResourceDraft[]) {
  const p = savePayload(draft, resources, 0);
  return {
    id: 'preview',
    title: draft.title || 'Untitled lesson',
    description: '',
    contentBlocks: { learn: p.learnBlocks, apply: p.applyBlocks, reflect: p.reflectBlocks, deepen: p.deepenBlocks },
    resources: resources.map((r) => ({ id: r.id, title: r.title, storageUrl: r.url, type: r.type, description: r.description })),
  };
}
