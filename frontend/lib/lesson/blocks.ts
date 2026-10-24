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
  'c',
  'bash',
  'json',
  'java',
  'kotlin',
  'swift',
  'dart',
  'plaintext',
] as const;
export type CodeLanguage = (typeof CODE_LANGUAGES)[number];

/** Languages the in-browser code runner can run (lib/code): Python (Pyodide), SQL (SQLite via sql.js), C (xcc, public/c) and JavaScript (a sandboxed page). */
export type RunLanguage = 'python' | 'sql' | 'c' | 'javascript';

export const CODE_LANGUAGE_LABEL: Record<CodeLanguage, string> = {
  javascript: 'JavaScript',
  typescript: 'TypeScript',
  python: 'Python',
  html: 'HTML',
  css: 'CSS',
  sql: 'SQL',
  c: 'C',
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
  // 30, not 20: a Teyro Originals Checkpoint / Unit Challenge runs 25–30
  // exercises (docs/ORIGINALS_PLAYBOOK.md §5).
  exercises: 30,
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
    })
  | RichLearnCard;

// ─── Rich Learn formats (Teyro Originals, docs/ORIGINALS_PLAYBOOK.md §4) ──
//
// Written as course files (originals/), not in the Lesson Builder, so they
// aren't in LearnCardKind (the builder's "add card" menu). The player plays
// them for any course. None of them cost hearts: interactive ones only have
// to be finished before Continue.

/** The shared Originals cast (docs/originals/CAST.md). */
export const CAST_IDS = ['ada', 'remi', 'lucia', 'arjun', 'grace', 'kofi', 'miracle', 'clinton', 'david', 'efua', 'asante', 'brian', 'zanele', 'achieng', 'kamau', 'felix', 'pauline', 'emeka', 'wanjiku', 'jayden', 'priya', 'femi', 'diego', 'marta', 'sofia', 'tomas', 'carmen', 'njeri', 'kavya', 'joel', 'bisi', 'chidi', 'halima', 'folake', 'emmanuel', 'yaw', 'juno', 'walt', 'leo', 'dana', 'nora', 'mags', 'rafa', 'wes', 'ines', 'hal', 'tomoko', 'mateus', 'lars'] as const;
export type CastId = (typeof CAST_IDS)[number];
export const CAST_NAMES: Record<CastId, string> = {
  ada: 'Ada',
  remi: 'Remi',
  lucia: 'Lucía',
  arjun: 'Arjun',
  grace: 'Grace',
  kofi: 'Kofi',
  miracle: 'Miracle',
  clinton: 'Clinton',
  david: 'David',
  efua: 'Efua',
  asante: 'Mrs Asante',
  brian: 'Brian',
  zanele: 'Zanele',
  achieng: 'Mrs Achieng',
  kamau: 'Mr Kamau',
  felix: 'Felix',
  pauline: 'Pauline',
  emeka: 'Emeka',
  wanjiku: 'Wanjiku',
  jayden: 'Jayden',
  priya: 'Priya',
  femi: 'Femi',
  diego: 'Diego',
  marta: 'Marta',
  sofia: 'Sofía',
  tomas: 'Tomás',
  carmen: 'Carmen',
  njeri: 'Njeri',
  kavya: 'Kavya',
  joel: 'Joel',
  bisi: 'Bisi',
  chidi: 'Chidi',
  halima: 'Halima',
  folake: 'Folake',
  emmanuel: 'Emmanuel',
  yaw: 'Yaw',
  juno: 'Juno',
  walt: 'Walt',
  leo: 'Leo',
  dana: 'Dana',
  ines: 'Ines',
  hal: 'Hal',
  tomoko: 'Tomoko',
  mateus: 'Mateus',
  lars: 'Lars',
  nora: 'Nora',
  mags: 'Mags',
  rafa: 'Rafa',
  wes: 'Wes',
};

/** Who says a story line: the narrator (Tey's voice-over), Tey, or a cast member. */
export type StorySpeaker = 'narrator' | 'tey' | CastId;

export interface StoryBeat {
  speaker: StorySpeaker;
  text: string;
}

/** A decision in a story: no wrong answers that cost hearts, but every option has a consequence. */
export interface StoryChoice {
  prompt: string;
  options: { text: string; outcome: string; best?: boolean }[];
}

export interface WalkthroughStep {
  title: string;
  body: string;
  code?: string;
  language?: CodeLanguage;
}

export type RichLearnCard =
  /** A proper article page that scrolls (not split into small cards). */
  | (CardBase & { kind: 'reading'; title?: string; html: string })
  /** A short scene with the cast, optionally ending in a decision. */
  | (CardBase & { kind: 'story'; title?: string; beats: StoryBeat[]; choice?: StoryChoice })
  /** Tey teaches in a chat thread; the learner taps a reply to move it along. */
  | (CardBase & { kind: 'chat'; turns: { tey: string; replies?: string[] }[] })
  /** A worked example revealed one step at a time. */
  | (CardBase & { kind: 'steps'; title?: string; steps: WalkthroughStep[] })
  /** A bad and a good version side by side, with what changed. */
  | (CardBase & {
      kind: 'compare';
      title?: string;
      before: { label?: string; text: string };
      after: { label?: string; text: string };
      notes: string[];
    })
  /** A real artefact with tappable phrases that reveal explanations. */
  | (CardBase & { kind: 'explore'; title?: string; text: string; hotspots: { phrase: string; note: string }[] })
  /** Quick-fire: is each statement a myth or a fact? */
  | (CardBase & { kind: 'myth'; statements: { text: string; isFact: boolean; explain: string }[] })
  /**
   * Prompt Lab: add parts to a starting prompt and send it to a practice AI.
   * No real AI call (Phase One): the reply is the authored one whose `uses`
   * is the largest set of the picked parts (see promptLabReply). Done once
   * the `goal` reply comes back.
   */
  | (CardBase & {
      kind: 'promptLab';
      title?: string;
      task: string;
      base: string;
      parts: { label: string; text: string }[];
      replies: { uses: number[]; text: string; note: string }[];
      goal: number;
    })
  /**
   * Try it live: runnable, editable Python in the learner's browser
   * (lib/code). Done once it has run without an error. `stdin` feeds input();
   * `challenge` is a nudge to change the code and run it again.
   */
  | (CardBase & {
      kind: 'tryIt';
      /** Python unless it says SQL or JavaScript. */
      language?: RunLanguage;
      title?: string;
      code: string;
      caption?: string;
      challenge?: string;
      stdin?: string[];
      /** Meant to fail (an errors lesson): done on any run, error or not. */
      expectError?: boolean;
      /** SQL: the practice database the code runs against (public/sql/db); empty when absent. */
      database?: string;
      /** JavaScript: the practice page (HTML) the code runs on, shown live; console only when absent. */
      page?: string;
      /** JavaScript: what localStorage holds before the first run. */
      storage?: Record<string, string>;
    });

export type RichLearnCardKind = RichLearnCard['kind'];
export const RICH_LEARN_KINDS: readonly RichLearnCardKind[] = ['reading', 'story', 'chat', 'steps', 'compare', 'explore', 'myth', 'promptLab', 'tryIt'];

export const RICH_LIMITS = {
  readingChars: 12000,
  beats: 14,
  choiceOptions: 4,
  turns: 10,
  replies: 3,
  steps: 8,
  notes: 6,
  hotspots: 8,
  statements: 6,
  /** Lines of input() fed to a program. */
  stdin: 10,
  /** Hidden checks on a Write and run exercise. */
  checks: 8,
  /** Prompt Lab parts and authored replies. */
  labParts: 6,
  labReplies: 8,
} as const;

/**
 * The Prompt Lab reply for a set of picked parts: the most specific reply
 * whose parts were all picked (ties: the first written). Falls back to the
 * bare-prompt reply (uses: []).
 */
export function promptLabReply(replies: { uses: number[] }[], picked: ReadonlySet<number>): number {
  let best = -1;
  replies.forEach((r, i) => {
    if (!r.uses.every((u) => picked.has(u))) return;
    if (best < 0 || r.uses.length > replies[best].uses.length) best = i;
  });
  return Math.max(best, 0);
}

// ─── Exercises ─────────────────────────────────────────────────────────────

export type ExerciseKind = 'mcq' | 'fillBlank' | 'findBug' | 'orderLines' | 'matchPairs' | RichExerciseKind;

/** Exercise kinds written as Originals course files (not in the builder yet). */
export type RichExerciseKind = 'tapBuild' | 'typeAnswer' | 'sortGroups' | 'writeCode';

/** How a multiple-choice question is framed to the learner and the creator. */
export type McqVariant = 'standard' | 'predictOutput' | 'pickPrompt' | 'chat';

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
  /** Chat variant: who sent the message the learner replies to, and what it said. */
  character?: CastId;
  message?: string;
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

/**
 * Build the answer from tiles, in order: a sentence from word tiles, or a
 * line of code from token tiles. `tiles` is the answer in the CORRECT
 * order; `distractors` are extra tiles that don't belong.
 */
export interface TapBuildExercise extends ExerciseBase {
  kind: 'tapBuild';
  language?: CodeLanguage;
  tiles: string[];
  distractors: string[];
}

/** A short typed answer, matched forgivingly (case, punctuation, one typo). */
export interface TypeAnswerExercise extends ExerciseBase {
  kind: 'typeAnswer';
  /** Every accepted answer; the first is the one shown as "the answer". */
  answers: string[];
  placeholder?: string;
}

/** Put each item in the right group ("clear vs vague", "do vs don't"). */
export interface SortGroupsExercise extends ExerciseBase {
  kind: 'sortGroups';
  groups: { id: string; label: string }[];
  items: { id: string; text: string; groupId: string }[];
}

/**
 * One hidden check on a Write and run program. Checks look at what the
 * program printed and the values it left behind, never the exact wording
 * of the code, so different correct solutions pass (playbook §7).
 * Set exactly one test; `message` is what the learner sees ("Print the total").
 */
export interface CodeCheck {
  message: string;
  /** The output contains this (case and spacing don't matter). */
  outputIncludes?: string;
  /** The whole output is exactly this (spacing at the ends doesn't matter). */
  outputEquals?: string;
  /** A Python expression that's true after the program runs, e.g. `pot == 200000`. */
  expr?: string;
  /** The code uses this, e.g. `for ` or `f"` (for "use a loop" style tasks). */
  codeIncludes?: string;
}

/**
 * Write and run (Python): the learner writes code, runs it in the browser
 * as often as they like (free, no hearts), and CHECK unlocks once every
 * hidden check passes. A hint is always there; the solution appears after
 * two failed runs, and using it costs the combo, never hearts.
 */
export interface WriteCodeExercise extends ExerciseBase {
  kind: 'writeCode';
  language: RunLanguage;
  /** SQL: the practice database the code runs against (public/sql/db); empty when absent. */
  database?: string;
  /** JavaScript: the practice page (HTML) the code runs on, shown live; console only when absent. */
  page?: string;
  /** JavaScript: what localStorage holds before the code runs. */
  storage?: Record<string, string>;
  /** What the editor starts with (may be empty). */
  starter: string;
  solution: string;
  hint?: string;
  checks: CodeCheck[];
  /** Lines fed to input(), in order. */
  stdin?: string[];
}

export type Exercise =
  | McqExercise
  | FillBlankExercise
  | FindBugExercise
  | OrderLinesExercise
  | MatchPairsExercise
  | TapBuildExercise
  | TypeAnswerExercise
  | SortGroupsExercise
  | WriteCodeExercise;

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
  | { kind: 'matchPairs'; matches: Record<string, string>; /** A term tapped, waiting for its match (UI only). */ pendingLeft?: string }
  /** Indexes into tapBuildBank(), in the order tapped. */
  | { kind: 'tapBuild'; picked: number[] }
  | { kind: 'typeAnswer'; text: string }
  | { kind: 'sortGroups'; placed: Record<string, string> }
  /**
   * `passedCode` is the exact code that last passed every check (null until
   * one does): editing after a pass means running again. `failedRuns` and
   * `usedSolution` drive the hint, the solution button and the combo.
   */
  | { kind: 'writeCode'; code: string; passedCode: string | null; failedRuns: number; usedSolution: boolean };

/** Blank markers in a fill-in template: `[[1]]`, `[[2]]`… */
export const BLANK_RE = /\[\[(\d+)\]\]/g;

const norm = (s: string) => s.trim().replace(/\s+/g, ' ');

/**
 * Is the right-hand card `rightId` a correct match for `leftId`? Compares
 * text, not ids: two right cards that read the same ("You", "Chapter 1")
 * look identical to the learner, so either one counts.
 */
export function pairMatchIsRight(ex: MatchPairsExercise, leftId: string, rightId: string | undefined): boolean {
  if (!rightId) return false;
  if (rightId === leftId) return true;
  const want = ex.pairs.find((p) => p.id === leftId);
  const got = ex.pairs.find((p) => p.id === rightId);
  return Boolean(want && got && norm(want.right).toLowerCase() === norm(got.right).toLowerCase());
}

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
    case 'tapBuild':
      return r.picked.length > 0;
    case 'typeAnswer':
      return r.text.trim().length > 0;
    case 'sortGroups':
      return (ex as SortGroupsExercise).items.every((it) => Boolean(r.placed[it.id]));
    case 'writeCode':
      return r.passedCode !== null && r.passedCode === r.code;
  }
}

/** Typed answers: case, accents-insensitive punctuation and spacing don't matter. */
export function normalizeTyped(s: string): string {
  return s
    .toLowerCase()
    .normalize('NFKC')
    .replace(/[^\p{L}\p{N}\s]/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/** Edit distance, capped: we only ever ask "is it at most 1?". */
function withinOneEdit(a: string, b: string): boolean {
  if (a === b) return true;
  if (Math.abs(a.length - b.length) > 1) return false;
  let i = 0;
  let j = 0;
  let edits = 0;
  while (i < a.length && j < b.length) {
    if (a[i] === b[j]) {
      i++;
      j++;
      continue;
    }
    if (++edits > 1) return false;
    if (a.length > b.length) i++;
    else if (b.length > a.length) j++;
    else {
      i++;
      j++;
    }
  }
  return edits + (a.length - i) + (b.length - j) <= 1;
}

/**
 * A typed answer is right when it matches an accepted answer after
 * normalising, or is one typo away from one that's at least 5 characters
 * (a typo in "Paris" is fine; a typo in "API" is a different word).
 */
export function typedAnswerMatches(ex: TypeAnswerExercise, text: string): boolean {
  const got = normalizeTyped(text);
  if (!got) return false;
  return ex.answers.some((a) => {
    const want = normalizeTyped(a);
    return want === got || (want.length >= 5 && withinOneEdit(want, got));
  });
}

/** Tiles to tap for a tapBuild exercise, in a stable shuffled order. */
export function tapBuildBank(ex: TapBuildExercise, seed = ex.id): string[] {
  return seededShuffle([...ex.tiles, ...ex.distractors].filter((t) => t.trim()), seed);
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
      return ex.pairs.every((p) => pairMatchIsRight(ex, p.id, matches[p.id]));
    }
    case 'tapBuild': {
      // Compare text, not tile positions: the same word can appear twice.
      const bank = tapBuildBank(ex);
      const built = (r as { picked: number[] }).picked.map((i) => norm(bank[i] ?? ''));
      return built.length === ex.tiles.length && built.every((t, i) => t === norm(ex.tiles[i]));
    }
    case 'typeAnswer':
      return typedAnswerMatches(ex, (r as { text: string }).text);
    case 'sortGroups': {
      const placed = (r as { placed: Record<string, string> }).placed;
      return ex.items.every((it) => placed[it.id] === it.groupId);
    }
    case 'writeCode':
      // The runner already checked it: complete means every check passed.
      return true;
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
      default: {
        const msg = richLearnCardIssue(c);
        if (msg) issues.push({ id: c.id, message: msg });
      }
    }
  }
  return issues;
}

/** Problems with a rich Learn card (mirrors backend lesson-blocks.util). */
export function richLearnCardIssue(c: RichLearnCard): string | null {
  switch (c.kind) {
    case 'reading':
      return blank(c.html.replace(/<[^>]*>/g, '')) ? 'This reading page is empty.' : null;
    case 'story':
      if (c.beats.filter((b) => !blank(b.text)).length === 0) return 'This story has no lines.';
      if (c.beats.length > RICH_LIMITS.beats) return `A story can have up to ${RICH_LIMITS.beats} lines.`;
      if (c.choice) {
        if (blank(c.choice.prompt)) return "The story's decision needs a question.";
        if (c.choice.options.length < 2 || c.choice.options.length > RICH_LIMITS.choiceOptions)
          return `A story decision needs 2 to ${RICH_LIMITS.choiceOptions} options.`;
        if (c.choice.options.some((o) => blank(o.text) || blank(o.outcome))) return 'Every decision option needs its text and what happens next.';
      }
      return null;
    case 'chat':
      if (c.turns.length === 0 || c.turns.some((t) => blank(t.tey))) return 'Every chat turn needs a message from Tey.';
      if (c.turns.length > RICH_LIMITS.turns) return `A chat can have up to ${RICH_LIMITS.turns} turns.`;
      if (c.turns.some((t) => (t.replies?.length ?? 0) > RICH_LIMITS.replies)) return `Up to ${RICH_LIMITS.replies} replies per turn.`;
      return null;
    case 'steps':
      if (c.steps.length < 2 || c.steps.length > RICH_LIMITS.steps) return `A walkthrough needs 2 to ${RICH_LIMITS.steps} steps.`;
      return c.steps.some((s) => blank(s.title) || blank(s.body)) ? 'Every step needs a title and an explanation.' : null;
    case 'compare':
      if (blank(c.before.text) || blank(c.after.text)) return 'A before/after needs both versions.';
      if (c.notes.length === 0) return 'Say what changed: add at least one note.';
      return c.notes.length > RICH_LIMITS.notes ? `Up to ${RICH_LIMITS.notes} notes.` : null;
    case 'explore': {
      if (blank(c.text)) return 'Tap to explore needs the text to explore.';
      if (c.hotspots.length === 0 || c.hotspots.length > RICH_LIMITS.hotspots) return `Add 1 to ${RICH_LIMITS.hotspots} hotspots.`;
      if (c.hotspots.some((h) => blank(h.phrase) || blank(h.note))) return 'Every hotspot needs its phrase and a note.';
      return c.hotspots.some((h) => !c.text.includes(h.phrase)) ? 'Every hotspot phrase must appear in the text exactly.' : null;
    }
    case 'myth':
      if (c.statements.length < 2 || c.statements.length > RICH_LIMITS.statements) return `Myth or Fact needs 2 to ${RICH_LIMITS.statements} statements.`;
      return c.statements.some((s) => blank(s.text) || blank(s.explain)) ? 'Every statement needs its text and the explanation.' : null;
    case 'promptLab':
      if (blank(c.task) || blank(c.base)) return 'A Prompt Lab needs its task and starting prompt.';
      if (c.parts.length < 2 || c.parts.length > RICH_LIMITS.labParts) return `A Prompt Lab needs 2 to ${RICH_LIMITS.labParts} parts.`;
      if (c.parts.some((p) => blank(p.label) || blank(p.text))) return 'Every Prompt Lab part needs a label and its text.';
      if (c.replies.length < 2 || c.replies.length > RICH_LIMITS.labReplies) return `A Prompt Lab needs 2 to ${RICH_LIMITS.labReplies} replies.`;
      if (c.replies.some((r) => blank(r.text) || blank(r.note))) return 'Every Prompt Lab reply needs its text and a note.';
      if (c.replies.some((r) => r.uses.some((u) => !Number.isInteger(u) || u < 0 || u >= c.parts.length))) return 'A Prompt Lab reply uses a part that does not exist.';
      if (!c.replies.some((r) => r.uses.length === 0)) return 'Add a reply for the bare prompt (no parts).';
      return Number.isInteger(c.goal) && c.goal >= 0 && c.goal < c.replies.length ? null : 'Mark the goal reply.';
    case 'tryIt':
      if (blank(c.code)) return 'Try it live needs code to run.';
      return (c.stdin?.length ?? 0) > RICH_LIMITS.stdin ? `Up to ${RICH_LIMITS.stdin} lines of input.` : null;
  }
}

/** Problems with one hidden check on a Write and run exercise (mirrors the backend). */
export function codeCheckIssue(c: CodeCheck): string | null {
  if (blank(c.message)) return 'Every check needs a message for the learner.';
  const tests = [c.outputIncludes, c.outputEquals, c.expr, c.codeIncludes].filter((t) => t !== undefined);
  if (tests.length !== 1) return 'Every check tests exactly one thing.';
  return blank(tests[0]) ? 'A check has nothing to test.' : null;
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
      if (ex.variant === 'chat' && blank(ex.message)) return 'Add the message learners are replying to.';
      return null;
    }
    case 'tapBuild':
      if (ex.tiles.filter((t) => !blank(t)).length < 2) return 'Add at least 2 tiles to build the answer from.';
      if (ex.tiles.length + ex.distractors.length > LIMITS.bank) return `Up to ${LIMITS.bank} tiles in total.`;
      return null;
    case 'typeAnswer':
      return ex.answers.every(blank) ? 'Add at least one accepted answer.' : null;
    case 'writeCode':
      if (blank(ex.solution)) return 'Add the solution.';
      if (ex.checks.length === 0 || ex.checks.length > RICH_LIMITS.checks) return `Add 1 to ${RICH_LIMITS.checks} checks.`;
      if ((ex.stdin?.length ?? 0) > RICH_LIMITS.stdin) return `Up to ${RICH_LIMITS.stdin} lines of input.`;
      return ex.checks.map(codeCheckIssue).find((m) => m !== null) ?? null;
    case 'sortGroups': {
      if (ex.groups.length < 2 || ex.groups.length > 3) return 'Sorting needs 2 or 3 groups.';
      if (ex.groups.some((g) => blank(g.label))) return 'Every group needs a name.';
      if (ex.items.length < 3 || ex.items.length > LIMITS.pairs) return `Sorting needs 3 to ${LIMITS.pairs} items.`;
      const ids = new Set(ex.groups.map((g) => g.id));
      return ex.items.some((it) => blank(it.text) || !ids.has(it.groupId)) ? 'Every item needs its text and a group.' : null;
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
    case 'tapBuild':
      return { id, kind: 'tapBuild', prompt: 'Build the answer.', tiles: ['', ''], distractors: [] };
    case 'typeAnswer':
      return { id, kind: 'typeAnswer', prompt: 'Type your answer.', answers: [''] };
    case 'writeCode':
      return { id, kind: 'writeCode', language: 'python', prompt: 'Write the code.', starter: '', solution: '', checks: [] };
    case 'sortGroups': {
      const a = newBlockId('grp');
      const b = newBlockId('grp');
      return {
        id,
        kind: 'sortGroups',
        prompt: 'Put each one in the right group.',
        groups: [
          { id: a, label: '' },
          { id: b, label: '' },
        ],
        items: [0, 1, 2].map(() => ({ id: newBlockId('item'), text: '', groupId: a })),
      };
    }
  }
}
