/**
 * When a lesson, and a whole section, is ready to go into the course.
 *
 * The importer publishes section by section: a section goes into the course
 * only once EVERY lesson in it is written (or deliberately skipped), so a
 * learner never sees a section with lessons missing. A lesson that can't be
 * written — it failed, its video failed to copy or transcribe, or what was
 * written didn't pass the publish checks — holds its section back until the
 * admin retries or skips it ("needs attention").
 *
 * One rule, shared by the import page (what it shows) and the publish path
 * (what it writes), so the two can never disagree.
 */

import { phaseStateFromBlocks } from '../lesson/lesson-blocks.util';
import {
  APPLY_QUESTIONS_MAX,
  APPLY_QUESTIONS_MIN,
} from './lesson-content-generation.types';
import { RICH_EXERCISES_KEEP_MIN } from './rich-lesson';

export interface ReadinessLesson {
  status: string;
  primaryFileId: string | null;
  createdLessonId: string | null;
  skippedAt?: Date | null;
  learnBlocks: unknown;
  applyBlocks: unknown;
  reflectBlocks: unknown;
  deepenBlocks: unknown;
}

export interface ReadinessFile {
  id: string;
  category: string;
  status: string;
  transcriptStatus: string;
}

export type LessonReadiness =
  /** Already written into the real course. */
  | 'added'
  /** Written, passes the checks, waiting to go in with its section. */
  | 'ready'
  /** The admin chose to leave it out. */
  | 'skipped'
  /** Can't finish on its own: retry it or skip it. */
  | 'attention'
  /** Still being copied, transcribed or written. */
  | 'working';

export type SectionReadiness =
  /** Every lesson is in the course (or skipped). */
  | 'added'
  /** Every lesson is written or skipped, and some aren't in the course yet. */
  | 'ready'
  /** At least one lesson needs a retry or a skip before it can go in. */
  | 'attention'
  /** Lessons are still being written. */
  | 'working';

/** Copying or transcription gave up on this lesson's file: retrying the
 *  lesson can't help, the file needs its own retry (or the lesson a skip). */
function fileBlocked(file: ReadinessFile | undefined): boolean {
  if (!file) return false;
  return (
    file.status === 'FAILED' ||
    file.status === 'SKIPPED' ||
    file.transcriptStatus === 'FAILED'
  );
}

export function lessonReadiness(
  lesson: ReadinessLesson,
  filesById: Map<string, ReadinessFile>,
): LessonReadiness {
  if (lesson.createdLessonId) return 'added';
  if (lesson.skippedAt) return 'skipped';
  const primary = lesson.primaryFileId
    ? filesById.get(lesson.primaryFileId)
    : undefined;
  if (lesson.status === 'GENERATED') {
    return isLessonPublishable(lesson, primary?.category === 'document')
      ? 'ready'
      : 'attention';
  }
  if (lesson.status === 'FAILED' || fileBlocked(primary)) return 'attention';
  return 'working';
}

export function sectionReadiness(states: LessonReadiness[]): SectionReadiness {
  if (states.length === 0) return 'working';
  if (states.includes('attention')) return 'attention';
  if (states.includes('working')) return 'working';
  if (states.includes('ready')) return 'ready';
  return 'added';
}

/**
 * Generated content that actually holds up — the last check before content
 * reaches a real course, which may already be live. A reading lesson (built
 * from a document) has no media card; it must have something to read.
 */
export function isLessonPublishable(
  lesson: ReadinessLesson,
  isReading = false,
): boolean {
  if (lesson.status !== 'GENERATED') return false;

  const learn = lesson.learnBlocks as unknown[] | null;
  const apply = lesson.applyBlocks as unknown[] | null;
  const reflect = lesson.reflectBlocks as unknown[] | null;
  const deepen = lesson.deepenBlocks as unknown[] | null;
  if (!learn?.length || !apply?.length || !reflect?.length || !deepen?.length) {
    return false;
  }

  // Rich (v2) lessons: the exact checks publish runs, plus the lesson's
  // source — its video or audio card, or two explanation cards to read.
  const state = phaseStateFromBlocks({ learn, apply });
  if (state.learn || state.apply) {
    const cards = (
      learn.find((b) => (b as { type?: string }).type === 'learnCards') as
        | { value?: { kind?: string }[] }
        | undefined
    )?.value;
    const kinds = Array.isArray(cards) ? cards.map((c) => c?.kind) : [];
    const hasSource =
      kinds.includes('video') ||
      kinds.includes('audio') ||
      (isReading && kinds.filter((k) => k === 'text').length >= 2) ||
      learn.some(
        (b) =>
          (b as { type?: string }).type === 'videoUrl' &&
          !!(b as { value?: string }).value,
      );
    const items = (
      apply.find((b) => (b as { type?: string }).type === 'exercises') as
        | { value?: { items?: unknown[] } }
        | undefined
    )?.value?.items;
    const count = Array.isArray(items) ? items.length : 0;
    return (
      hasSource &&
      (state.learn?.complete ?? true) &&
      (state.apply?.complete ?? false) &&
      count >= RICH_EXERCISES_KEEP_MIN &&
      count <= 20
    );
  }

  // Classic (v1) lessons from before rich generation.
  const hasVideo = learn.some(
    (b) =>
      (b as { type?: string }).type === 'videoUrl' &&
      !!(b as { value?: string }).value,
  );
  if (!hasVideo) return false;
  const questions = (
    apply[0] as { value?: { questions?: unknown[] } } | undefined
  )?.value?.questions;
  return (
    Array.isArray(questions) &&
    questions.length >= APPLY_QUESTIONS_MIN &&
    questions.length <= APPLY_QUESTIONS_MAX
  );
}
