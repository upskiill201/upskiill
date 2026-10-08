/**
 * Lesson content v2 — the building blocks creators stack into a lesson, and
 * learners play one at a time.
 *
 *   Learn   a deck of bite-size cards: explanation, code sample, video (15
 *           min max), audio, image, tip, quick check.
 *   Apply   exercises, graded instantly on the device (no code runs):
 *           multiple choice (incl. "predict the output" / "pick the better
 *           prompt"), fill in the blanks, find the bug, put in order, match.
 *   Reflect unchanged (prompt, open or guided).
 *   Deepen  OPTIONAL: resources are a bonus, never a requirement.
 *
 * Stored inside Lesson.contentBlocks as two new block types next to the v1
 * ones: `{ type: 'learnCards', value: LearnCard[] }` in `learn`, and
 * `{ type: 'exercises', value: { scenario, items: Exercise[] } }` in `apply`.
 * A lesson saved before v2 is read through the v1 blocks instead (see
 * lib/lesson/content.ts), so nothing already published changes.
 *
 * The same rules are enforced on the server (backend lesson-blocks.util.ts);
 * keep the two in step.
 */

// ─── Shared ────────────────────────────────────────────────────────────────

export const CODE_LANGUAGES = [
  'javascript',
  'typescript',
  'python',
  'html',
  'css',
  'sql',
  'bash',
  'json',
  'java',
  'kotlin',
  'swift',
  'dart',
  'plaintext',
] as const;
export type CodeLanguage = (typeof CODE_LANGUAGES)[number];

export const CODE_LANGUAGE_LABEL: Record<CodeLanguage, string> = {
  javascript: 'JavaScript',
  typescript: 'TypeScript',
  python: 'Python',
  html: 'HTML',
  css: 'CSS',
  sql: 'SQL',
  bash: 'Terminal',
  json: 'JSON',
  java: 'Java',
  kotlin: 'Kotlin',
  swift: 'Swift',
  dart: 'Dart',
  plaintext: 'Plain text',
};

/** Bite-size: a lesson video longer than this should be split up. */
export const MAX_VIDEO_SECONDS = 15 * 60;

export const LIMITS = {
  learnCards: 30,
  exercises: 20,
  options: 6,
  lines: 30,
  pairs: 8,
  blanks: 6,
  bank: 12,
  codeChars: 4000,
  textChars: 8000,
} as const;

// ─── Learn cards ───────────────────────────────────────────────────────────

export type LearnCardKind = 'text' | 'code' | 'video' | 'audio' | 'image' | 'callout' | 'check';

interface CardBase {
  id: string;
}

/**
 * A video/audio card can play just part of its file — how the course
 * importer turns one long video into several bite-size lessons without
 * re-encoding it. When set, `durationSec` is the clip's length.
 */
interface Clip {
  startSec?: number;
  endSec?: number;
}

/** "Plays 12:00–24:00" for a clipped card, or null for a whole file. */
export function clipRange(card: Clip): { startSec: number; endSec: number } | null {
  return typeof card.startSec === 'number' && typeof card.endSec === 'number' && card.endSec > card.startSec
    ? { startSec: card.startSec, endSec: card.endSec }
    : null;
}

function clipIssue(card: Clip & { kind: string; durationSec?: number }): string | null {
  if (card.startSec === undefined && card.endSec === undefined) return null;
  const range = clipRange(card);
  if (!range || range.startSec < 0) return 'This clip has an invalid start or end time.';
  if (typeof card.durationSec === 'number' && Math.abs(card.durationSec - (range.endSec - range.startSec)) > 2)
    return "This clip's length doesn't match its start and end times.";
  if (card.kind === 'video' && range.endSec - range.startSec > MAX_VIDEO_SECONDS)
    return videoTooLongMessage(range.endSec - range.startSec);
  return null;
}

export type LearnCard =
  | (CardBase & { kind: 'text'; html: string })
  | (CardBase & { kind: 'code'; language: CodeLanguage; code: string; caption?: string })
  | (CardBase & { kind: 'video'; url: string; durationSec: number; caption?: string } & Clip)
  | (CardBase & { kind: 'audio'; url: string; durationSec?: number; caption?: string } & Clip)
  | (CardBase & { kind: 'image'; url: string; alt: string; caption?: string })
  | (CardBase & { kind: 'callout'; tone: 'tip' | 'warning' | 'remember'; text: string })
  | (CardBase & {
      kind: 'check';
      question: string;
      options: string[];
      correctIndex: number;
      explanation?: string;
    });

// ─── Exercises ─────────────────────────────────────────────────────────────

export type ExerciseKind = 'mcq' | 'fillBlank' | 'findBug' | 'orderLines' | 'matchPairs';

/** How a multiple-choice question is framed to the learner and the creator. */
export type McqVariant = 'standard' | 'predictOutput' | 'pickPrompt';

interface ExerciseBase {
  id: string;
  /** The instruction or question, e.g. "What does this print?". */
  prompt: string;
  /** Shown after answering — why the answer is right. */
  explanation?: string;
}

export interface McqOption {
  id: string;
  text: string;
  /** Why someone might pick this wrong answer — shown if they do. */
  misconception?: string;
}

export interface McqExercise extends ExerciseBase {
  kind: 'mcq';
  variant: McqVariant;
  /** Code shown above the options (predict-the-output, "what's wrong here"). */
  code?: string;
  language?: CodeLanguage;
  options: McqOption[];
  correctOptionId: string;
}

/**
 * Fill in the blanks. `template` holds the text or code with `[[1]]`,
 * `[[2]]`… where the blanks go; each blank lists its accepted answers.
 * The learner taps words from the bank (every accepted first answer, plus
 * the creator's distractors, shuffled).
 */
export interface FillBlankExercise extends ExerciseBase {
  kind: 'fillBlank';
  language?: CodeLanguage;
  template: string;
  blanks: { id: string; answers: string[] }[];
  distractors: string[];
}

/** Tap the line with the mistake (code, or an AI answer split into lines). */
export interface FindBugExercise extends ExerciseBase {
  kind: 'findBug';
  language?: CodeLanguage;
  lines: string[];
  bugLine: number;
  /** The corrected line, shown after answering. */
  fix?: string;
}

/** Put the lines in the right order (code, or the steps of a workflow). */
export interface OrderLinesExercise extends ExerciseBase {
  kind: 'orderLines';
  language?: CodeLanguage;
  /** In the CORRECT order; the player shuffles them. */
  lines: string[];
}

/** Match each term to its meaning. */
export interface MatchPairsExercise extends ExerciseBase {
  kind: 'matchPairs';
  pairs: { id: string; left: string; right: string }[];
}

export type Exercise =
  | McqExercise
  | FillBlankExercise
  | FindBugExercise
  | OrderLinesExercise
  | MatchPairsExercise;

export interface ApplyContent {
  scenario: string;
  items: Exercise[];
}

// ─── Learner responses + grading (pure) ────────────────────────────────────

export type ExerciseResponse =
  | { kind: 'mcq'; optionId: string }
  | { kind: 'fillBlank'; filled: (string | null)[] }
  | { kind: 'findBug'; line: number }
  | { kind: 'orderLines'; order: number[] }
  | { kind: 'matchPairs'; matches: Record<string, string>; /** A term tapped, waiting for its match (UI only). */ pendingLeft?: string };

/** Blank markers in a fill-in template: `[[1]]`, `[[2]]`… */
export const BLANK_RE = /\[\[(\d+)\]\]/g;

const norm = (s: string) => s.trim().replace(/\s+/g, ' ');

/** Has the learner answered enough for CHECK to light up? */
export function isResponseComplete(ex: Exercise, r: ExerciseResponse | null): boolean {
  if (!r || r.kind !== ex.kind) return false;
  switch (r.kind) {
    case 'mcq':
      return Boolean(r.optionId);
    case 'fillBlank':
      return r.filled.length === (ex as FillBlankExercise).blanks.length && r.filled.every((f) => f !== null);
    case 'findBug':
      return r.line >= 0;
    case 'orderLines':
      return r.order.length === (ex as OrderLinesExercise).lines.length;
    case 'matchPairs':
      return Object.keys(r.matches).length === (ex as MatchPairsExercise).pairs.length;
  }
}

/** Right or wrong. Never throws; a malformed response is simply wrong. */
export function gradeExercise(ex: Exercise, r: ExerciseResponse | null): boolean {
  if (!r || r.kind !== ex.kind || !isResponseComplete(ex, r)) return false;
  switch (ex.kind) {
    case 'mcq':
      return (r as { optionId: string }).optionId === ex.correctOptionId;
    case 'fillBlank': {
      const filled = (r as { filled: (string | null)[] }).filled;
      return ex.blanks.every((b, i) => b.answers.some((a) => norm(a) === norm(filled[i] ?? '')));
    }
    case 'findBug':
      return (r as { line: number }).line === ex.bugLine;
    case 'orderLines': {
      // Compare text, not indices: two identical lines can swap places.
      const order = (r as { order: number[] }).order;
      return order.every((idx, pos) => norm(ex.lines[idx] ?? '') === norm(ex.lines[pos]));
    }
    case 'matchPairs': {
      const matches = (r as { matches: Record<string, string> }).matches;
      return ex.pairs.every((p) => matches[p.id] === p.id);
    }
  }
}

/** The word bank for a fill-in exercise, in a stable shuffled order. */
export function fillBlankBank(ex: FillBlankExercise, seed = ex.id): string[] {
  const words = [...ex.blanks.map((b) => b.answers[0] ?? ''), ...ex.distractors].filter((w) => w.trim());
  return seededShuffle(Array.from(new Set(words)), seed);
}

/**
 * A deterministic shuffle, so the same exercise shows the same order on
 * re-render (and in tests), but never the answer order when avoidable.
 */
export function seededShuffle<T>(items: T[], seed: string): T[] {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) h = Math.imul(h ^ seed.charCodeAt(i), 16777619);
  const rand = () => {
    h = Math.imul(h ^ (h >>> 15), 2246822507);
    h = Math.imul(h ^ (h >>> 13), 3266489909);
    h ^= h >>> 16;
    return (h >>> 0) / 4294967296;
  };
  const out = [...items];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  // A "shuffle" that lands on the original order gives the answer away.
  if (out.length > 1 && out.every((v, i) => v === items[i])) out.push(out.shift()!);
  return out;
}

// ─── Validation (mirrors the backend) ──────────────────────────────────────

export interface BlockIssue {
  /** Which card or exercise (its id), or null for the whole phase. */
  id: string | null;
  message: string;
}

const blank = (s: string | undefined | null) => !s || !s.trim();

export function validateLearnCards(cards: LearnCard[]): BlockIssue[] {
  const issues: BlockIssue[] = [];
  if (cards.length === 0) issues.push({ id: null, message: 'Add at least one Learn card.' });
  if (cards.length > LIMITS.learnCards) issues.push({ id: null, message: `A lesson can have up to ${LIMITS.learnCards} Learn cards. Split it into two lessons.` });
  for (const c of cards) {
    switch (c.kind) {
      case 'text':
        if (blank(c.html.replace(/<[^>]*>/g, ''))) issues.push({ id: c.id, message: 'This explanation card is empty.' });
        break;
      case 'code':
        if (blank(c.code)) issues.push({ id: c.id, message: 'This code card has no code.' });
        break;
      case 'video':
        if (blank(c.url)) issues.push({ id: c.id, message: 'Upload a video or remove this card.' });
        else if (c.durationSec > MAX_VIDEO_SECONDS)
          issues.push({ id: c.id, message: videoTooLongMessage(c.durationSec) });
        else if (clipIssue(c)) issues.push({ id: c.id, message: clipIssue(c)! });
        break;
      case 'audio':
        if (blank(c.url)) issues.push({ id: c.id, message: 'Upload audio or remove this card.' });
        else if (clipIssue(c)) issues.push({ id: c.id, message: clipIssue(c)! });
        break;
      case 'image':
        if (blank(c.url)) issues.push({ id: c.id, message: 'Add an image or remove this card.' });
        else if (blank(c.alt)) issues.push({ id: c.id, message: 'Describe the image for learners who can’t see it.' });
        break;
      case 'callout':
        if (blank(c.text)) issues.push({ id: c.id, message: 'This tip card is empty.' });
        break;
      case 'check':
        if (blank(c.question)) issues.push({ id: c.id, message: 'The quick check needs a question.' });
        else if (c.options.filter((o) => !blank(o)).length < 2) issues.push({ id: c.id, message: 'The quick check needs at least 2 answers.' });
        else if (blank(c.options[c.correctIndex])) issues.push({ id: c.id, message: 'Mark the right answer.' });
        break;
    }
  }
  return issues;
}

export function validateExercise(ex: Exercise): string | null {
  if (blank(ex.prompt)) return 'Write the question or instruction.';
  switch (ex.kind) {
    case 'mcq': {
      const filled = ex.options.filter((o) => !blank(o.text));
      if (filled.length < 2) return 'Add at least 2 answers.';
      if (ex.options.length > LIMITS.options) return `Up to ${LIMITS.options} answers.`;
      if (!ex.options.some((o) => o.id === ex.correctOptionId && !blank(o.text))) return 'Mark the right answer.';
      if (ex.variant === 'predictOutput' && blank(ex.code)) return 'Add the code learners should read.';
      return null;
    }
    case 'fillBlank': {
      const markers = Array.from(ex.template.matchAll(BLANK_RE)).map((m) => Number(m[1]));
      if (markers.length === 0) return 'Add at least one blank.';
      if (markers.length !== ex.blanks.length) return 'Every blank needs an answer.';
      if (ex.blanks.length > LIMITS.blanks) return `Up to ${LIMITS.blanks} blanks.`;
      if (ex.blanks.some((b) => b.answers.every(blank))) return 'Every blank needs an answer.';
      return null;
    }
    case 'findBug':
      if (ex.lines.filter((l) => !blank(l)).length < 2) return 'Add at least 2 lines.';
      if (ex.bugLine < 0 || ex.bugLine >= ex.lines.length || blank(ex.lines[ex.bugLine])) return 'Mark the line with the mistake.';
      return null;
    case 'orderLines':
      if (ex.lines.filter((l) => !blank(l)).length < 3) return 'Add at least 3 lines to put in order.';
      if (ex.lines.length > LIMITS.lines) return `Up to ${LIMITS.lines} lines.`;
      return null;
    case 'matchPairs':
      if (ex.pairs.length < 3) return 'Add at least 3 pairs.';
      if (ex.pairs.length > LIMITS.pairs) return `Up to ${LIMITS.pairs} pairs.`;
      if (ex.pairs.some((p) => blank(p.left) || blank(p.right))) return 'Fill in both sides of every pair.';
      return null;
  }
}

export function validateApply(apply: ApplyContent): BlockIssue[] {
  const issues: BlockIssue[] = [];
  if (apply.items.length === 0) issues.push({ id: null, message: 'Add at least one exercise.' });
  if (apply.items.length > LIMITS.exercises) issues.push({ id: null, message: `Up to ${LIMITS.exercises} exercises per lesson.` });
  for (const ex of apply.items) {
    const msg = validateExercise(ex);
    if (msg) issues.push({ id: ex.id, message: msg });
  }
  return issues;
}

export function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = Math.round(seconds % 60);
  return `${m}:${String(s).padStart(2, '0')}`;
}

export function videoTooLongMessage(seconds: number): string {
  return `This video is ${formatDuration(seconds)} long. Teyro lessons are bite-size: keep each video under 15 minutes by splitting it across lessons or cards.`;
}

// ─── Track presets ─────────────────────────────────────────────────────────

export interface ExerciseTemplate {
  key: string;
  kind: ExerciseKind;
  variant?: McqVariant;
  label: string;
  description: string;
}

/** What the builder offers first, per track — the same kinds, framed for the subject. */
export const EXERCISE_TEMPLATES: Record<'coding' | 'ai', ExerciseTemplate[]> = {
  coding: [
    { key: 'predict', kind: 'mcq', variant: 'predictOutput', label: 'Predict the output', description: 'Show code, ask what it prints or returns.' },
    { key: 'fill', kind: 'fillBlank', label: 'Fill in the code', description: 'Learners complete the missing pieces of code.' },
    { key: 'bug', kind: 'findBug', label: 'Find the bug', description: 'Learners tap the line that breaks the code.' },
    { key: 'order', kind: 'orderLines', label: 'Put the code in order', description: 'Learners rebuild a snippet line by line.' },
    { key: 'mcq', kind: 'mcq', variant: 'standard', label: 'Multiple choice', description: 'A question with one right answer.' },
    { key: 'match', kind: 'matchPairs', label: 'Match the terms', description: 'Pair concepts, syntax and meanings.' },
  ],
  ai: [
    { key: 'prompt', kind: 'mcq', variant: 'pickPrompt', label: 'Pick the better prompt', description: 'Two or more prompts: which gets the better result?' },
    { key: 'fill', kind: 'fillBlank', label: 'Complete the prompt', description: 'Learners fill the missing parts of a prompt or setting.' },
    { key: 'bug', kind: 'findBug', label: 'Spot the problem', description: 'Learners tap the wrong line in an AI answer or workflow.' },
    { key: 'order', kind: 'orderLines', label: 'Order the workflow', description: 'Learners put the steps of an automation or agent in order.' },
    { key: 'mcq', kind: 'mcq', variant: 'standard', label: 'Multiple choice', description: 'A question with one right answer.' },
    { key: 'match', kind: 'matchPairs', label: 'Match the terms', description: 'Pair tools, concepts and what they do.' },
  ],
};

let idCounter = 0;
export function newBlockId(prefix: string): string {
  idCounter += 1;
  return `${prefix}_${Date.now().toString(36)}${idCounter.toString(36)}${Math.random().toString(36).slice(2, 6)}`;
}

/** A fresh, empty exercise of a template — what "Add exercise" inserts. */
export function blankExercise(t: ExerciseTemplate): Exercise {
  const id = newBlockId('ex');
  switch (t.kind) {
    case 'mcq': {
      const a = newBlockId('opt');
      return {
        id,
        kind: 'mcq',
        variant: t.variant ?? 'standard',
        prompt: t.variant === 'predictOutput' ? 'What does this code print?' : t.variant === 'pickPrompt' ? 'Which prompt will get the better result?' : '',
        ...(t.variant === 'predictOutput' ? { code: '', language: 'javascript' as CodeLanguage } : {}),
        options: [
          { id: a, text: '' },
          { id: newBlockId('opt'), text: '' },
        ],
        correctOptionId: a,
      };
    }
    case 'fillBlank':
      return { id, kind: 'fillBlank', prompt: 'Fill in the blanks.', template: '', blanks: [], distractors: [] };
    case 'findBug':
      return { id, kind: 'findBug', prompt: 'Tap the line with the mistake.', lines: ['', ''], bugLine: 0 };
    case 'orderLines':
      return { id, kind: 'orderLines', prompt: 'Put these lines in the right order.', lines: ['', '', ''] };
    case 'matchPairs':
      return {
        id,
        kind: 'matchPairs',
        prompt: 'Match each term to what it means.',
        pairs: [0, 1, 2].map(() => ({ id: newBlockId('pair'), left: '', right: '' })),
      };
  }
}
