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

// exercises: 30 so a Teyro Originals Checkpoint (25–30 exercises) fits.
const LIMITS = { learnCards: 30, exercises: 30, options: 6, lines: 30, pairs: 8, blanks: 6, bank: 12 };
const RICH = { beats: 14, choiceOptions: 4, turns: 10, replies: 3, steps: 8, notes: 6, hotspots: 8, statements: 6, stdin: 10, checks: 8, labParts: 6, labReplies: 8 };
const CAST = ['ada', 'remi', 'lucia', 'arjun', 'grace', 'kofi', 'miracle', 'clinton', 'david', 'efua', 'asante', 'brian', 'zanele', 'achieng', 'kamau', 'felix', 'pauline', 'emeka', 'wanjiku', 'jayden', 'priya', 'femi', 'diego', 'marta', 'sofia', 'tomas', 'carmen', 'njeri', 'kavya', 'joel', 'bisi', 'chidi', 'halima', 'folake', 'emmanuel', 'yaw', 'juno', 'walt', 'leo', 'dana', 'hazel', 'benny', 'ruth'];
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

/**
 * A video/audio card may play only part of its file (`startSec`–`endSec`):
 * how a long imported video becomes several bite-size lessons without
 * re-encoding. `durationSec` must then be the clip's length, so the 15-minute
 * rule above can't be dodged by clipping a long file with a short duration.
 */
function clipProblem(c: any): string | null {
  if (c.startSec === undefined && c.endSec === undefined) return null;
  const { startSec, endSec } = c;
  if (typeof startSec !== 'number' || typeof endSec !== 'number' || startSec < 0 || endSec <= startSec) {
    return 'A clip has an invalid start or end time.';
  }
  if (typeof c.durationSec === 'number' && Math.abs(c.durationSec - (endSec - startSec)) > 2) {
    return "A clip's length doesn't match its start and end times.";
  }
  if (c.kind === 'video' && endSec - startSec > MAX_VIDEO_SECONDS) return 'A video is over 15 minutes.';
  return null;
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
      if (c.durationSec > MAX_VIDEO_SECONDS) return 'A video is over 15 minutes.';
      return clipProblem(c);
    case 'audio':
      return blank(c.url) ? 'An audio card has no audio.' : clipProblem(c);
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
      return richLearnCardProblem(c);
  }
}

/**
 * Teyro Originals Learn formats (story, chat, reading page, walkthrough,
 * before/after, tap to explore, myth or fact). Mirrors richLearnCardIssue
 * in frontend/lib/lesson/blocks.ts; they're written as course files
 * (docs/ORIGINALS_PLAYBOOK.md §4), not in the Lesson Builder.
 */
function richLearnCardProblem(c: any): string | null {
  const list = (v: unknown) => (Array.isArray(v) ? v : []);
  switch (c?.kind) {
    case 'reading':
      return blank(String(c.html ?? '').replace(/<[^>]*>/g, '')) ? 'A reading page is empty.' : null;
    case 'story': {
      const beats = list(c.beats);
      if (beats.filter((b: any) => !blank(b?.text)).length === 0) return 'A story has no lines.';
      if (beats.length > RICH.beats) return `A story can have up to ${RICH.beats} lines.`;
      if (beats.some((b: any) => b?.speaker !== 'narrator' && b?.speaker !== 'tey' && !CAST.includes(b?.speaker)))
        return 'A story line has an unknown speaker.';
      if (c.choice) {
        const options = list(c.choice.options);
        if (blank(c.choice.prompt)) return "A story's decision has no question.";
        if (options.length < 2 || options.length > RICH.choiceOptions) return `A story decision needs 2 to ${RICH.choiceOptions} options.`;
        if (options.some((o: any) => blank(o?.text) || blank(o?.outcome))) return 'A story decision option is missing its text or outcome.';
      }
      return null;
    }
    case 'chat': {
      const turns = list(c.turns);
      if (turns.length === 0 || turns.some((t: any) => blank(t?.tey))) return 'A chat turn has no message from Tey.';
      if (turns.length > RICH.turns) return `A chat can have up to ${RICH.turns} turns.`;
      return turns.some((t: any) => list(t?.replies).length > RICH.replies) ? `Up to ${RICH.replies} replies per chat turn.` : null;
    }
    case 'steps': {
      const steps = list(c.steps);
      if (steps.length < 2 || steps.length > RICH.steps) return `A walkthrough needs 2 to ${RICH.steps} steps.`;
      return steps.some((s: any) => blank(s?.title) || blank(s?.body)) ? 'A walkthrough step is missing its title or explanation.' : null;
    }
    case 'compare': {
      const notes = list(c.notes);
      if (blank(c.before?.text) || blank(c.after?.text)) return 'A before/after is missing a version.';
      if (notes.length === 0) return 'A before/after needs at least one note on what changed.';
      return notes.length > RICH.notes ? `A before/after allows up to ${RICH.notes} notes.` : null;
    }
    case 'explore': {
      const hotspots = list(c.hotspots);
      if (blank(c.text)) return 'A tap-to-explore card has no text.';
      if (hotspots.length === 0 || hotspots.length > RICH.hotspots) return `A tap-to-explore card needs 1 to ${RICH.hotspots} hotspots.`;
      if (hotspots.some((h: any) => blank(h?.phrase) || blank(h?.note))) return 'A hotspot is missing its phrase or note.';
      return hotspots.some((h: any) => !String(c.text).includes(h.phrase)) ? "A hotspot's phrase isn't in the text." : null;
    }
    case 'myth': {
      const statements = list(c.statements);
      if (statements.length < 2 || statements.length > RICH.statements) return `Myth or Fact needs 2 to ${RICH.statements} statements.`;
      return statements.some((s: any) => blank(s?.text) || blank(s?.explain) || typeof s?.isFact !== 'boolean')
        ? 'A Myth or Fact statement is missing its text, answer or explanation.'
        : null;
    }
    case 'promptLab': {
      const parts = list(c.parts);
      const replies = list(c.replies);
      if (blank(c.task) || blank(c.base)) return 'A Prompt Lab is missing its task or starting prompt.';
      if (parts.length < 2 || parts.length > RICH.labParts) return `A Prompt Lab needs 2 to ${RICH.labParts} prompt parts.`;
      if (parts.some((p: any) => blank(p?.label) || blank(p?.text))) return 'A Prompt Lab part is missing its label or text.';
      if (replies.length < 2 || replies.length > RICH.labReplies) return `A Prompt Lab needs 2 to ${RICH.labReplies} replies.`;
      if (replies.some((r: any) => blank(r?.text) || blank(r?.note))) return 'A Prompt Lab reply is missing its text or note.';
      if (replies.some((r: any) => list(r?.uses).some((u: any) => !Number.isInteger(u) || u < 0 || u >= parts.length)))
        return 'A Prompt Lab reply uses a part that does not exist.';
      if (!replies.some((r: any) => list(r?.uses).length === 0)) return 'A Prompt Lab needs a reply for the bare prompt (uses: []).';
      return Number.isInteger(c.goal) && c.goal >= 0 && c.goal < replies.length ? null : 'A Prompt Lab has no goal reply marked.';
    }
    case 'tryIt':
      if (blank(c.code)) return 'A Try it live card has no code.';
      if (c.language !== undefined && !RUN_LANGUAGES.includes(c.language)) return 'A Try it live card must be Python or SQL.';
      return list(c.stdin).length > RICH.stdin ? `Try it live allows up to ${RICH.stdin} lines of input.` : null;
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
      if (e.variant === 'chat' && blank(e.message)) return 'A chat-reply exercise has no message to reply to.';
      if (e.character !== undefined && !CAST.includes(e.character)) return 'A chat-reply exercise names an unknown character.';
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
    case 'tapBuild': {
      const tiles = Array.isArray(e.tiles) ? e.tiles : [];
      const distractors = Array.isArray(e.distractors) ? e.distractors : [];
      if (tiles.filter((t: unknown) => !blank(t)).length < 2) return 'A tap-to-build exercise needs at least 2 tiles.';
      return tiles.length + distractors.length > LIMITS.bank ? `Tap to build allows up to ${LIMITS.bank} tiles.` : null;
    }
    case 'typeAnswer': {
      const answers = Array.isArray(e.answers) ? e.answers : [];
      return answers.every(blank) ? 'A type-the-answer exercise has no accepted answer.' : null;
    }
    case 'sortGroups': {
      const groups = Array.isArray(e.groups) ? e.groups : [];
      const items = Array.isArray(e.items) ? e.items : [];
      if (groups.length < 2 || groups.length > 3) return 'A sorting exercise needs 2 or 3 groups.';
      if (groups.some((g: any) => blank(g?.label))) return 'A sorting group has no name.';
      if (items.length < 3 || items.length > LIMITS.pairs) return `A sorting exercise needs 3 to ${LIMITS.pairs} items.`;
      const ids = new Set(groups.map((g: any) => g?.id));
      return items.some((it: any) => blank(it?.text) || !ids.has(it?.groupId)) ? 'A sorting item has no text or group.' : null;
    }
    case 'writeCode': {
      const checks = Array.isArray(e.checks) ? e.checks : [];
      if (!RUN_LANGUAGES.includes(e.language)) return 'A Write and run exercise must be Python or SQL.';
      if (blank(e.solution)) return 'A Write and run exercise has no solution.';
      if (checks.length === 0 || checks.length > RICH.checks) return `A Write and run exercise needs 1 to ${RICH.checks} checks.`;
      if (Array.isArray(e.stdin) && e.stdin.length > RICH.stdin) return `Write and run allows up to ${RICH.stdin} lines of input.`;
      return checks.map(codeCheckProblem).find((p: string | null) => p !== null) ?? null;
    }
    default:
      return 'An exercise has an unknown type.';
  }
}

/** The in-browser runners (frontend lib/code): Python (Pyodide) and SQL (SQLite via sql.js). */
const RUN_LANGUAGES: unknown[] = ['python', 'sql'];

/** One hidden check on a Write and run exercise. Mirrors codeCheckIssue in the frontend. */
function codeCheckProblem(c: any): string | null {
  if (blank(c?.message)) return 'A code check has no message for the learner.';
  const tests = [c.outputIncludes, c.outputEquals, c.expr, c.codeIncludes].filter((t) => t !== undefined);
  if (tests.length !== 1) return 'A code check must test exactly one thing.';
  return blank(tests[0]) ? 'A code check has nothing to test.' : null;
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
