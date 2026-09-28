/**
 * Server-side rules for lesson content v2 — the Learn card deck
 * (`{ type: 'learnCards' }`) and Apply exercises (`{ type: 'exercises' }`).
 *
 * Mirrors frontend/lib/lesson/blocks.ts (validateLearnCards /
 * validateExercise). Keep the two in step: the builder shows these messages
 * inline, and the server enforces them so a hand-crafted request can't
 * publish a 40-minute video or an exercise with no right answer.
 *
 * v1 lessons (videoUrl / text / mcqActivity blocks) are untouched: for them
 * `phaseStateFromBlocks` returns null and the client's completion flags stand.
 */

/* eslint-disable @typescript-eslint/no-explicit-any -- validating untyped creator JSON */

/** Bite-size: a lesson video longer than this should be split up. */
export const MAX_VIDEO_SECONDS = 15 * 60;

const LIMITS = { learnCards: 30, exercises: 20, options: 6, lines: 30, pairs: 8, blanks: 6 };
const BLANK_RE = /\[\[(\d+)\]\]/g;

const blank = (s: unknown) => typeof s !== 'string' || !s.trim();

function findBlock(list: unknown, type: string): any {
  return Array.isArray(list) ? list.find((b: any) => b?.type === type) : undefined;
}

export function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = Math.round(seconds % 60);
  return `${m}:${String(s).padStart(2, '0')}`;
}

/** Hard limits that reject a SAVE (not just a publish). */
export function learnSaveErrors(learnBlocks: unknown): string[] {
  const cards = findBlock(learnBlocks, 'learnCards')?.value;
  if (!Array.isArray(cards)) return [];
  const errors: string[] = [];
  if (cards.length > LIMITS.learnCards) {
    errors.push(`A lesson can have up to ${LIMITS.learnCards} Learn cards. Split it into two lessons.`);
  }
  for (const c of cards) {
    if (c?.kind === 'video' && typeof c.durationSec === 'number' && c.durationSec > MAX_VIDEO_SECONDS) {
      errors.push(
        `A video is ${formatDuration(c.durationSec)} long. Teyro lessons are bite-size: keep each video under 15 minutes by splitting it across lessons or cards.`,
      );
    }
  }
  return errors;
}

export function applySaveErrors(applyBlocks: unknown): string[] {
  const items = findBlock(applyBlocks, 'exercises')?.value?.items;
  if (!Array.isArray(items)) return [];
  return items.length > LIMITS.exercises ? [`Up to ${LIMITS.exercises} exercises per lesson.`] : [];
}

export function learnCardProblem(c: any): string | null {
  switch (c?.kind) {
    case 'text':
      return blank(String(c.html ?? '').replace(/<[^>]*>/g, '')) ? 'An explanation card is empty.' : null;
    case 'code':
      return blank(c.code) ? 'A code card has no code.' : null;
    case 'video':
      if (blank(c.url)) return 'A video card has no video.';
      if (typeof c.durationSec !== 'number' || c.durationSec <= 0) return 'A video card is missing its length. Upload it again.';
      return c.durationSec > MAX_VIDEO_SECONDS ? 'A video is over 15 minutes.' : null;
    case 'audio':
      return blank(c.url) ? 'An audio card has no audio.' : null;
    case 'image':
      if (blank(c.url)) return 'An image card has no image.';
      return blank(c.alt) ? 'An image is missing its description.' : null;
    case 'callout':
      return blank(c.text) ? 'A tip card is empty.' : null;
    case 'check': {
      const options = Array.isArray(c.options) ? c.options : [];
      if (blank(c.question)) return 'A quick check has no question.';
      if (options.filter((o: unknown) => !blank(o)).length < 2) return 'A quick check needs at least 2 answers.';
      return blank(options[c.correctIndex]) ? 'A quick check has no right answer marked.' : null;
    }
    default:
      return 'A Learn card has an unknown type.';
  }
}

export function exerciseProblem(e: any): string | null {
  if (blank(e?.prompt)) return 'An exercise has no question.';
  switch (e?.kind) {
    case 'mcq': {
      const options = Array.isArray(e.options) ? e.options : [];
      if (options.filter((o: any) => !blank(o?.text)).length < 2) return 'A multiple-choice exercise needs at least 2 answers.';
      if (options.length > LIMITS.options) return `Multiple choice allows up to ${LIMITS.options} answers.`;
      if (!options.some((o: any) => o?.id === e.correctOptionId && !blank(o?.text))) return 'A multiple-choice exercise has no right answer marked.';
      if (e.variant === 'predictOutput' && blank(e.code)) return 'A predict-the-output exercise has no code.';
      return null;
    }
    case 'fillBlank': {
      const markers = Array.from(String(e.template ?? '').matchAll(BLANK_RE));
      const blanks = Array.isArray(e.blanks) ? e.blanks : [];
      if (markers.length === 0) return 'A fill-in exercise has no blanks.';
      if (markers.length !== blanks.length || blanks.length > LIMITS.blanks) return 'Every blank needs an answer.';
      if (blanks.some((b: any) => !Array.isArray(b?.answers) || b.answers.every(blank))) return 'Every blank needs an answer.';
      return null;
    }
    case 'findBug': {
      const lines = Array.isArray(e.lines) ? e.lines : [];
      if (lines.filter((l: unknown) => !blank(l)).length < 2) return 'A find-the-bug exercise needs at least 2 lines.';
      return blank(lines[e.bugLine]) ? 'A find-the-bug exercise has no line marked.' : null;
    }
    case 'orderLines': {
      const lines = Array.isArray(e.lines) ? e.lines : [];
      if (lines.filter((l: unknown) => !blank(l)).length < 3) return 'An ordering exercise needs at least 3 lines.';
      return lines.length > LIMITS.lines ? `Ordering allows up to ${LIMITS.lines} lines.` : null;
    }
    case 'matchPairs': {
      const pairs = Array.isArray(e.pairs) ? e.pairs : [];
      if (pairs.length < 3 || pairs.length > LIMITS.pairs) return `A matching exercise needs 3 to ${LIMITS.pairs} pairs.`;
      return pairs.some((p: any) => blank(p?.left) || blank(p?.right)) ? 'A matching exercise has an empty side.' : null;
    }
    default:
      return 'An exercise has an unknown type.';
  }
}

/**
 * Completion of the v2 phases, computed from the blocks themselves.
 * `null` for a phase still using v1 blocks (the client's flag stands).
 */
export function phaseStateFromBlocks(blocks: Record<string, unknown>): {
  learn: { complete: boolean; errors: string[] } | null;
  apply: { complete: boolean; errors: string[] } | null;
} {
  const cards = findBlock(blocks.learn, 'learnCards')?.value;
  const items = findBlock(blocks.apply, 'exercises')?.value?.items;

  let learn: { complete: boolean; errors: string[] } | null = null;
  if (Array.isArray(cards)) {
    const errors = [...learnSaveErrors(blocks.learn)];
    if (cards.length === 0) errors.push('Add at least one Learn card.');
    for (const c of cards) {
      const p = learnCardProblem(c);
      if (p && !errors.includes(p)) errors.push(p);
    }
    learn = { complete: errors.length === 0, errors };
  }

  let apply: { complete: boolean; errors: string[] } | null = null;
  if (Array.isArray(items)) {
    const errors = [...applySaveErrors(blocks.apply)];
    if (items.length === 0) errors.push('Add at least one exercise.');
    for (const e of items) {
      const p = exerciseProblem(e);
      if (p && !errors.includes(p)) errors.push(p);
    }
    apply = { complete: errors.length === 0, errors };
  }

  return { learn, apply };
}
