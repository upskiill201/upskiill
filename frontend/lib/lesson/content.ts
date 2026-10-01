/**
 * What a lesson contains, read once from its `contentBlocks`, and how far
 * through it a learner is.
 *
 * Pure functions — the lesson player's screens render from these, and the
 * tests pin the rules (no fake questions, a broken video never traps anyone,
 * progress only ever moves forward).
 */

/* eslint-disable @typescript-eslint/no-explicit-any -- contentBlocks is creator JSON */

import type { Exercise, LearnCard } from './blocks';
import { sanitizeExercises, sanitizeLearnCards } from './sanitize';

export type LessonPhase = 'learn' | 'apply' | 'reflect' | 'deepen';

export const PHASE_ORDER: LessonPhase[] = ['learn', 'apply', 'reflect', 'deepen'];

export const PHASE_LABEL: Record<LessonPhase, string> = {
  learn: 'Learn',
  apply: 'Apply',
  reflect: 'Reflect',
  deepen: 'Deepen',
};

/** Each phase keeps its own colour — the four-step shape stays visible. */
export const PHASE_COLOR: Record<LessonPhase, string> = {
  learn: 'var(--color-brand)',
  apply: 'var(--lesson-correct)',
  reflect: 'var(--brand-purple)',
  deepen: 'var(--warning)',
};

export interface QuizOption {
  id: string;
  text: string;
  misconception?: string;
}

export interface QuizQuestion {
  id: string;
  questionText: string;
  options: QuizOption[];
  correctOptionId: string;
  explanation?: string;
}

export interface LessonResource {
  id: string;
  title?: string | null;
  originalName?: string | null;
  description?: string | null;
  type?: string | null;
  storageUrl: string;
  sizeBytes?: number | null;
}

export interface LessonContent {
  learn: {
    videoUrl: string | null;
    audioUrl: string | null;
    textHtml: string;
    whatYouWillLearn: string[];
    description: string | null;
    /** v2 card deck (lib/lesson/blocks.ts); null for a lesson built before v2. */
    cards: LearnCard[] | null;
  };
  apply: {
    scenario: string;
    /** Every exercise, v2 or converted from v1 multiple choice. */
    exercises: Exercise[];
    /** @deprecated v1 view: the multiple-choice exercises only. */
    questions: QuizQuestion[];
  };
  reflect: {
    prompt: string;
    type: 'open' | 'guided';
    minWords: number;
    starters: string[];
    guidedQuestions: string[];
    minWordsPerQuestion: number;
  };
  deepen: {
    title: string;
    description: string;
  };
  resources: LessonResource[];
}

function blocksOf(raw: any): Record<string, any> {
  let blocks = raw?.contentBlocks;
  if (typeof blocks === 'string') {
    try {
      blocks = JSON.parse(blocks);
    } catch {
      blocks = {};
    }
  }
  return blocks && typeof blocks === 'object' ? blocks : {};
}

function findBlock(list: unknown, type: string): any {
  return Array.isArray(list) ? list.find((b: any) => b?.type === type) : undefined;
}

const nonEmpty = (v: unknown): string | null =>
  typeof v === 'string' && v.trim() !== '' ? v : null;

export function readLessonContent(lesson: any): LessonContent {
  const blocks = blocksOf(lesson);

  const text = nonEmpty(findBlock(blocks.learn, 'text')?.value);
  const wyl = findBlock(blocks.learn, 'whatYouWillLearn')?.value;

  // No fake fallback questions: a lesson without a real Apply activity skips
  // the phase rather than quizzing on unrelated content.
  const applyData = findBlock(blocks.apply, 'mcqActivity')?.value;
  const questions: QuizQuestion[] = Array.isArray(applyData?.questions)
    ? applyData.questions
        .filter((q: any) => q?.questionText && Array.isArray(q.options) && q.options.length >= 2)
        .map((q: any, i: number) => ({
          id: String(q.id ?? i),
          questionText: String(q.questionText),
          options: q.options.map((o: any, j: number) => ({
            id: String(o.id ?? j),
            text: String(o.text ?? ''),
            misconception: nonEmpty(o.misconception) ?? undefined,
          })),
          correctOptionId: String(q.correctOptionId),
          explanation: nonEmpty(q.explanation) ?? undefined,
        }))
    : [];

  // v2 blocks win when present; v1 stays readable for everything already live.
  const v2Cards = findBlock(blocks.learn, 'learnCards')?.value;
  const cards = Array.isArray(v2Cards) ? sanitizeLearnCards(v2Cards) : null;
  const v2Apply = findBlock(blocks.apply, 'exercises')?.value;
  const exercises: Exercise[] = v2Apply
    ? sanitizeExercises(v2Apply.items)
    : questions.map((q) => ({
        id: q.id,
        kind: 'mcq' as const,
        variant: 'standard' as const,
        prompt: q.questionText,
        explanation: q.explanation,
        options: q.options,
        correctOptionId: q.correctOptionId,
      }));
  const mcqQuestions: QuizQuestion[] = exercises.flatMap((e) =>
    e.kind === 'mcq'
      ? [{ id: e.id, questionText: e.prompt, options: e.options, correctOptionId: e.correctOptionId, explanation: e.explanation }]
      : [],
  );

  const reflectData = findBlock(blocks.reflect, 'reflectActivity')?.value;
  const open = reflectData?.openConfig ?? {};
  const guided = reflectData?.guidedConfig ?? {};
  const guidedQuestions: string[] = Array.isArray(guided.questions)
    ? guided.questions.map((q: any) => String(q?.text ?? q ?? '')).filter(Boolean)
    : [];

  const deepenBlocks = blocks.deepen;
  const deepenData = Array.isArray(deepenBlocks)
    ? findBlock(deepenBlocks, 'deepenActivity')?.value
    : deepenBlocks?.deepenActivity;

  return {
    learn: {
      videoUrl: nonEmpty(findBlock(blocks.learn, 'videoUrl')?.value),
      audioUrl: nonEmpty(findBlock(blocks.learn, 'audioUrl')?.value),
      // The editor's empty document is "<p><br></p>" — that is not content.
      textHtml: text && text !== '<p><br></p>' ? text : '',
      whatYouWillLearn: Array.isArray(wyl) ? wyl.filter((w: unknown) => nonEmpty(w)).map(String) : [],
      description: nonEmpty(lesson?.description),
      cards,
    },
    apply: {
      scenario: nonEmpty(v2Apply?.scenario) ?? nonEmpty(applyData?.scenario) ?? '',
      exercises,
      questions: mcqQuestions,
    },
    reflect: {
      prompt: nonEmpty(reflectData?.prompt) ?? "What's one key takeaway from this lesson?",
      type: reflectData?.type === 'guided' && guidedQuestions.length > 0 ? 'guided' : 'open',
      minWords: Number.isFinite(open.minWordCount) ? open.minWordCount : 20,
      starters:
        open.useStarters === false || !Array.isArray(open.starters)
          ? []
          : open.starters.map((s: any) => String(s?.text ?? s ?? '')).filter(Boolean),
      guidedQuestions,
      minWordsPerQuestion: Number.isFinite(guided.minWordCountPerQuestion)
        ? guided.minWordCountPerQuestion
        : 10,
    },
    deepen: {
      title: nonEmpty(deepenData?.collectionTitle) ?? 'Go deeper',
      description:
        nonEmpty(deepenData?.collectionDescription) ??
        'Hand-picked extras if you want more on this topic.',
    },
    resources: Array.isArray(lesson?.resources) ? lesson.resources : [],
  };
}

/** The phases this lesson actually has, in order. */
export function lessonPhases(content: LessonContent): LessonPhase[] {
  return content.apply.exercises.length > 0 ? PHASE_ORDER : PHASE_ORDER.filter((p) => p !== 'apply');
}

export function nextPhase(content: LessonContent, phase: LessonPhase): LessonPhase | null {
  const phases = lessonPhases(content);
  return phases[phases.indexOf(phase) + 1] ?? null;
}

export function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

/** Reflect is two taps of the bar: how it landed, then your own words. */
export const REFLECT_STEPS = 2;

/**
 * How full the top bar is, 0–1.
 *
 * Every step is one equal slice: each Learn card, each question, each
 * Reflect step, Deepen. So the bar grows on every card and every right
 * answer, the way a learner feels a lesson moving — not four big jumps.
 * Starts with a small head start: a bar at literal zero says "you've done
 * nothing" to someone who just turned up.
 */
export function lessonProgress(
  content: LessonContent,
  at: {
    phase: LessonPhase;
    /** Questions answered right (a missed one counts once it's fixed). */
    questionsDone: number;
    /** Learn cards in this lesson, and how many are behind the learner. */
    learnCards?: number;
    learnDone?: number;
    /** Reflect steps finished (0–REFLECT_STEPS). */
    reflectDone?: number;
    finished?: boolean;
  },
): number {
  if (at.finished) return 1;
  const slices: Record<LessonPhase, number> = {
    learn: Math.max(1, at.learnCards ?? 1),
    apply: content.apply.exercises.length,
    reflect: REFLECT_STEPS,
    deepen: 1,
  };
  const phases = lessonPhases(content);
  const total = phases.reduce((n, p) => n + slices[p], 0);

  let done = 0;
  for (const p of phases) {
    if (p === at.phase) break;
    done += slices[p];
  }
  if (at.phase === 'learn') done += Math.min(at.learnDone ?? 0, slices.learn);
  if (at.phase === 'apply') done += Math.min(at.questionsDone, slices.apply);
  if (at.phase === 'reflect') done += Math.min(at.reflectDone ?? 0, slices.reflect);

  return Math.max(0.04, Math.min(1, done / total));
}
