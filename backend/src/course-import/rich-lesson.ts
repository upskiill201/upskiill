/**
 * Rich imported lessons — lesson content v2, the same format the Lesson
 * Builder makes (frontend/lib/lesson/blocks.ts ↔ lesson/lesson-blocks.util):
 *
 *   Learn    the video card, then key-idea cards, code cards (only when the
 *            transcript actually shows code), a tip, and a quick check
 *   Apply    5–12 exercises across five kinds: multiple choice (incl.
 *            predict-the-output / pick-the-better-prompt), fill in the
 *            blanks, spot the mistake, put in order, match the pairs
 *   Reflect  a prompt that ties the lesson to the learner, with starters
 *   Deepen   what to explore next
 *
 * The model returns one flat, forgiving JSON shape (a small model in JSON
 * mode treats schemas as hints). This module then builds the real blocks and
 * checks every card and exercise with the SAME validators the server runs
 * on publish. A broken exercise is dropped, not the whole lesson; only when
 * too little survives does generation fail (and retry).
 *
 * A video over 15 minutes (or of unknown length) can't be a v2 video card —
 * Teyro's bite-size rule, enforced on save. Those lessons keep the classic
 * Learn format (video + the key ideas as reading) and still get the rich
 * Apply, Reflect and Deepen. The player reads each phase independently.
 */

/* eslint-disable @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-argument -- this file normalises untyped model JSON; every value is checked before use */

import {
  exerciseProblem,
  learnCardProblem,
  MAX_VIDEO_SECONDS,
  phaseStateFromBlocks,
} from '../lesson/lesson-blocks.util';
import type { GeneratedLessonBlocks } from './lesson-content-generation.types';

export const RICH_EXERCISES_MIN = 5;
export const RICH_EXERCISES_MAX = 12;
/** Fewer valid exercises than this after checking = not a real lesson. */
export const RICH_EXERCISES_KEEP_MIN = 4;
export const KEY_IDEAS_MIN = 2;
export const KEY_IDEAS_MAX = 5;

const CODE_LANGUAGES = [
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
type CodeLanguage = (typeof CODE_LANGUAGES)[number];

export type ImportTrack = 'Coding' | 'AI' | null;

/* ── what the model is asked for ─────────────────────────────────────── */

/**
 * The exercise plan, in order. A small model told "aim for 7-10" wrote 4-5
 * (live run, 2026-09-28); told the exact list, it follows it. Easy first,
 * one of every kind, then a second round of the kinds that suit the track.
 */
export const EXERCISE_PLAN: Record<'Coding' | 'AI' | 'other', string[]> = {
  Coding: [
    'mcq (predictOutput)',
    'mcq',
    'fillBlank',
    'findBug',
    'orderLines',
    'matchPairs',
    'mcq (predictOutput)',
    'fillBlank',
  ],
  AI: [
    'mcq (pickPrompt)',
    'mcq',
    'fillBlank',
    'orderLines',
    'findBug',
    'matchPairs',
    'mcq (pickPrompt)',
    'fillBlank',
  ],
  other: [
    'mcq',
    'mcq',
    'fillBlank',
    'orderLines',
    'findBug',
    'matchPairs',
    'mcq',
    'fillBlank',
  ],
};

export function richSystemPrompt(track: ImportTrack): string {
  const plan = EXERCISE_PLAN[track ?? 'other'];
  const kinds =
    track === 'Coding'
      ? `- mcq (variant "standard", or "predictOutput" with "code": what does this code print/return?)
- fillBlank: "template" is code with [[1]], [[2]] where the missing pieces go; "answers" lists the missing piece for each blank in order; "distractors" 2-4 wrong pieces
- findBug: "lines" 3-10 lines of code, exactly one wrong; "bugLine" is its 1-based number; "fix" is the corrected line
- orderLines: "lines" 3-8 lines of code in the CORRECT order
- matchPairs: "pairs" 3-6 of {"left","right"} (term ↔ meaning, syntax ↔ effect)`
      : track === 'AI'
        ? `- mcq (variant "standard", or "pickPrompt": options are prompts, the right one gets the better result)
- fillBlank: "template" is a prompt or sentence with [[1]], [[2]] for missing words; "answers" in order; "distractors" 2-4
- findBug: "lines" 3-10 steps or lines of an AI answer/workflow, exactly one wrong; "bugLine" is its 1-based number; "fix" the corrected line
- orderLines: "lines" 3-8 workflow steps in the CORRECT order
- matchPairs: "pairs" 3-6 of {"left","right"} (tool ↔ what it does, term ↔ meaning)`
        : `- mcq (variant "standard"): a practical scenario question
- fillBlank: "template" is a sentence with [[1]], [[2]] for key terms; "answers" in order; "distractors" 2-4
- findBug: "lines" 3-10 steps or statements, exactly one wrong; "bugLine" is its 1-based number; "fix" the corrected one
- orderLines: "lines" 3-8 steps of a process in the CORRECT order
- matchPairs: "pairs" 3-6 of {"left","right"} (term ↔ meaning)`;

  return `You are Teyro's lesson writer. Turn ONE lesson video's transcript into a rich, hands-on Teyro lesson.

Rules:
- The transcript is the only source. Never invent facts, code, tools or numbers it doesn't support.
- Keep the instructor's voice ("I'll show you…" stays first person). Never write "the instructor says".
- Short and punchy: learners do this in a few minutes on a phone.
- Code only if the transcript really shows or describes code. Otherwise return "codeSamples": [] and write NO code or pseudo-code anywhere, including exercises.
- Every exercise must be answerable using ONLY what this lesson teaches, by someone who just watched it. Never ask about people, brands, shows or examples beyond exactly what the transcript says about them, and never ask the learner to guess.
- Every exercise must have exactly one defensible answer. In "findBug", exactly ONE line is wrong and every other line must be correct according to the transcript.
- Never number or bullet the "lines" of findBug/orderLines ("1.", "-"): they are shuffled, and numbers would give the answer away.

Return ONE JSON object with exactly these fields:
- "summary": 1-3 sentences (20-500 chars), what this lesson gives the learner.
- "whatYouWillLearn": ${2}-${5} short outcomes (each under 120 chars).
- "keyIdeas": ${KEY_IDEAS_MIN}-${KEY_IDEAS_MAX} items {"heading" (under 70 chars), "body" (40-600 chars, one idea, plain text)} in teaching order.
- "codeSamples": 0-3 items {"language" (one of ${CODE_LANGUAGES.join(', ')}), "code" (under 1500 chars), "caption"}.
- "tip": {"tone": "tip" | "warning" | "remember", "text" (under 280 chars)} — the gotcha or shortcut worth remembering.
- "quickCheck": {"question", "options" (3 short answers), "correctIndex" (0-based), "explanation"} — checks the main idea.
- "scenario": one sentence setting up the practice (under 240 chars), or "".
- "exercises": EXACTLY ${plan.length} items, with these kinds in this order: ${plan.map((k, i) => `${i + 1}) ${k}`).join(', ')}. Each tests a different point from the lesson; if the transcript is short, test the same idea from a new angle rather than skipping one. ONLY practice items go here: the reflection is its own field below, never an exercise. That's AT LEAST 3 different kinds, easy first. EVERY item, whatever its kind, has "kind", "prompt" (the instruction, under 240 chars) and "explanation" (why the answer is right, under 280 chars). Kinds:
${kinds}
  mcq items also have "options" (3-4 short answers) and "correctIndex" (0-based). Exactly one right answer; wrong ones plausible, never "all of the above".
  Blanks are written EXACTLY as [[1]], [[2]] — never ___ or [blank]. Example: {"kind":"fillBlank","prompt":"Fill in the blanks.","template":"Cut on [[1]] so the edit feels [[2]].","answers":["movement","invisible"],"distractors":["silence","faster"],"explanation":"Movement hides the cut."}
- "reflectPrompt": asks the learner to apply the lesson to their own work or plan an action (under 300 chars). Never "what did you learn?".
- "reflectStarters": 2-3 sentence starters (under 60 chars each).
- "deepenTitle" (under 80 chars) and "deepenSummary" (under 300 chars): a concrete next step or deeper technique.

Return ONLY the JSON object. No markdown.`;
}

/** Shape hint for providers that accept one (Gemini). Deliberately loose. */
export const RICH_LESSON_JSON_SCHEMA = {
  type: 'object',
  properties: {
    summary: { type: 'string' },
    whatYouWillLearn: { type: 'array', items: { type: 'string' } },
    keyIdeas: {
      type: 'array',
      items: {
        type: 'object',
        properties: { heading: { type: 'string' }, body: { type: 'string' } },
        required: ['heading', 'body'],
      },
    },
    codeSamples: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          language: { type: 'string' },
          code: { type: 'string' },
          caption: { type: 'string' },
        },
        required: ['code'],
      },
    },
    tip: {
      type: 'object',
      properties: { tone: { type: 'string' }, text: { type: 'string' } },
      required: ['text'],
    },
    quickCheck: {
      type: 'object',
      properties: {
        question: { type: 'string' },
        options: { type: 'array', items: { type: 'string' } },
        correctIndex: { type: 'integer' },
        explanation: { type: 'string' },
      },
      required: ['question', 'options', 'correctIndex'],
    },
    scenario: { type: 'string' },
    exercises: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          kind: { type: 'string' },
          prompt: { type: 'string' },
          explanation: { type: 'string' },
          variant: { type: 'string' },
          code: { type: 'string' },
          language: { type: 'string' },
          options: { type: 'array', items: { type: 'string' } },
          correctIndex: { type: 'integer' },
          template: { type: 'string' },
          answers: { type: 'array', items: { type: 'string' } },
          distractors: { type: 'array', items: { type: 'string' } },
          lines: { type: 'array', items: { type: 'string' } },
          bugLine: { type: 'integer' },
          fix: { type: 'string' },
          pairs: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                left: { type: 'string' },
                right: { type: 'string' },
              },
              required: ['left', 'right'],
            },
          },
        },
        required: ['kind', 'prompt'],
      },
    },
    reflectPrompt: { type: 'string' },
    reflectStarters: { type: 'array', items: { type: 'string' } },
    deepenTitle: { type: 'string' },
    deepenSummary: { type: 'string' },
  },
  required: [
    'summary',
    'whatYouWillLearn',
    'keyIdeas',
    'exercises',
    'reflectPrompt',
    'deepenTitle',
    'deepenSummary',
  ],
} as const;

/* ── building the lesson ─────────────────────────────────────────────── */

export class RichLessonError extends Error {
  constructor(message: string) {
    super(message);
  }
}

export interface RichBuildResult extends GeneratedLessonBlocks {
  stats: {
    learnCards: number;
    exercises: number;
    kinds: string[];
    dropped: string[];
    classicLearn: boolean;
  };
}

const s = (v: unknown, max: number): string =>
  typeof v === 'string' ? v.trim().replace(/\s+\n/g, '\n').slice(0, max) : '';
const list = (v: unknown, maxItems: number, maxLen: number): string[] =>
  Array.isArray(v)
    ? v
        .map((x) => s(x, maxLen))
        .filter(Boolean)
        .slice(0, maxItems)
    : [];
/** Lines a learner reorders or picks from. Models number them ("1. …",
 *  "2) …", "- …"); in an ordering exercise the numbers survive the shuffle
 *  and give the answer away. Strip them when EVERY line carries a marker, so
 *  one real code line that happens to start with "-" is left alone. */
const LIST_MARKER = /^\s*(?:\d{1,2}[.)]|[-*•])\s+/;
const exerciseLines = (
  v: unknown,
  maxItems: number,
  maxLen: number,
): string[] => {
  const raw = list(v, maxItems, maxLen);
  return raw.length > 1 && raw.every((l) => LIST_MARKER.test(l))
    ? raw.map((l) => l.replace(LIST_MARKER, '').trim()).filter(Boolean)
    : raw;
};
const esc = (t: string) =>
  t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const paragraphs = (t: string) =>
  t
    .split(/\n\s*\n|\n/)
    .map((p) => p.trim())
    .filter(Boolean)
    .map((p) => `<p>${esc(p)}</p>`)
    .join('');
const lang = (v: unknown, fallback: CodeLanguage): CodeLanguage => {
  const l = s(v, 20).toLowerCase();
  const alias: Record<string, CodeLanguage> = {
    js: 'javascript',
    ts: 'typescript',
    py: 'python',
    shell: 'bash',
    sh: 'bash',
    terminal: 'bash',
    text: 'plaintext',
  };
  const x = alias[l] ?? l;
  return (CODE_LANGUAGES as readonly string[]).includes(x) ? x : fallback;
};
const uniq = (xs: string[]) =>
  new Set(xs.map((x) => x.toLowerCase())).size === xs.length;

/**
 * Blank styles models write instead of [[1]], [[2]]… (live runs: "______",
 * and others that left 0 recognised blanks). A style is only accepted when
 * it yields exactly as many blanks as there are answers, so a wrong guess
 * can never produce a mismatched exercise — it's dropped as before.
 */
const BLANK_STYLES: RegExp[] = [
  /\[\[\s*\d+\s*\]\]/g, // [[ 1 ]] with spaces
  /_{2,}/g, // ___
  /\{\{\s*\d*\s*\}\}/g, // {{1}} or {{}}
  /\[\s*\d+\s*\]/g, // [1]
  /[[(<]\s*blank\s*\d*\s*[\])>]/gi, // [blank] (blank) <blank> [blank 1]
];
function normaliseBlanks(template: string, answers: number): string {
  if (answers === 0) return template;
  if (Array.from(template.matchAll(/\[\[(\d+)\]\]/g)).length === answers)
    return template;
  for (const style of BLANK_STYLES) {
    const hits = template.match(style);
    if (hits && hits.length === answers) {
      let n = 0;
      return template.replace(style, () => `[[${++n}]]`);
    }
  }
  return template;
}

/** One model exercise → a v2 exercise, or a reason it can't be one. */
function buildExercise(
  raw: any,
  i: number,
  track: ImportTrack,
): { ok: any } | { bad: string } {
  const id = `ex_${i}`;
  const kind = s(raw?.kind, 20);
  // For these kinds the instruction is generic, and the Lesson Builder starts
  // every new one with exactly this text. A model that leaves it out has
  // still written a good exercise (live run: two fill-ins lost this way).
  // A multiple-choice question has no generic form, so it's never defaulted.
  const DEFAULT_PROMPT: Record<string, string> = {
    fillBlank: 'Fill in the blanks.',
    findBug: 'Tap the line with the mistake.',
    orderLines: 'Put these lines in the right order.',
    matchPairs: 'Match each term to what it means.',
  };
  const prompt = s(raw?.prompt, 500) || DEFAULT_PROMPT[kind] || '';
  const explanation = s(raw?.explanation, 1000) || undefined;
  const codeLang: CodeLanguage = 'plaintext';
  let ex: any;
  switch (kind) {
    case 'mcq': {
      const options = list(raw.options, 6, 300);
      const correct = Number.isInteger(raw.correctIndex)
        ? raw.correctIndex
        : -1;
      if (!uniq(options)) return { bad: 'duplicate answers' };
      let variant =
        raw.variant === 'predictOutput' || raw.variant === 'pickPrompt'
          ? raw.variant
          : 'standard';
      const code = s(raw.code, 2000);
      if (variant === 'predictOutput' && !code) variant = 'standard';
      ex = {
        id,
        kind: 'mcq',
        variant,
        prompt,
        explanation,
        ...(code ? { code, language: lang(raw.language, codeLang) } : {}),
        options: options.map((text, j) => ({ id: `${id}_o${j}`, text })),
        correctOptionId: options[correct] ? `${id}_o${correct}` : '',
      };
      break;
    }
    case 'fillBlank': {
      const answers = list(raw.answers, 6, 200);
      const template = normaliseBlanks(s(raw.template, 3000), answers.length);
      const markers = Array.from(template.matchAll(/\[\[(\d+)\]\]/g));
      if (markers.length !== answers.length)
        return {
          bad: `fill-in has ${markers.length} blanks but ${answers.length} answers`,
        };
      const distractors = list(raw.distractors, 6, 200).filter(
        (d) => !answers.some((a) => a.toLowerCase() === d.toLowerCase()),
      );
      ex = {
        id,
        kind: 'fillBlank',
        // Found in a live run: the model repeated the sentence as the prompt,
        // so the player would show the blanks twice.
        prompt:
          /\[\[\d+\]\]|_{2,}/.test(prompt) || prompt === s(raw.template, 3000)
            ? DEFAULT_PROMPT.fillBlank
            : prompt,
        explanation,
        ...(track === 'Coding'
          ? { language: lang(raw.language, codeLang) }
          : {}),
        template,
        blanks: answers.map((a, j) => ({ id: `${id}_b${j}`, answers: [a] })),
        distractors,
      };
      break;
    }
    case 'findBug': {
      const lines = exerciseLines(raw.lines, 30, 500);
      // Asked for 1-based (how people count lines); accept a 0-based answer
      // only when 1-based is impossible.
      const n = Number(raw.bugLine);
      const bugLine = Number.isInteger(n)
        ? n >= 1 && n <= lines.length
          ? n - 1
          : n === 0
            ? 0
            : -1
        : -1;
      const fix = s(raw.fix, 500);
      if (
        fix &&
        lines[bugLine] &&
        fix.toLowerCase() === lines[bugLine].toLowerCase()
      )
        return { bad: 'the fix is the same as the wrong line' };
      ex = {
        id,
        kind: 'findBug',
        prompt,
        explanation,
        ...(track === 'Coding'
          ? { language: lang(raw.language, codeLang) }
          : {}),
        lines,
        bugLine,
        ...(fix ? { fix } : {}),
      };
      break;
    }
    case 'orderLines': {
      const lines = exerciseLines(raw.lines, 30, 500);
      if (!uniq(lines)) return { bad: 'ordering has repeated lines' };
      ex = {
        id,
        kind: 'orderLines',
        prompt,
        explanation,
        ...(track === 'Coding'
          ? { language: lang(raw.language, codeLang) }
          : {}),
        lines,
      };
      break;
    }
    case 'matchPairs': {
      const pairs = Array.isArray(raw.pairs)
        ? raw.pairs
            .map((p: any, j: number) => ({
              id: `${id}_p${j}`,
              left: s(p?.left, 200),
              right: s(p?.right, 300),
            }))
            .filter((p: any) => p.left && p.right)
            .slice(0, 8)
        : [];
      if (
        !uniq(pairs.map((p: any) => p.left)) ||
        !uniq(pairs.map((p: any) => p.right))
      )
        return { bad: 'matching has repeated sides' };
      ex = { id, kind: 'matchPairs', prompt, explanation, pairs };
      break;
    }
    default:
      return { bad: `unknown kind "${kind}"` };
  }
  const problem = exerciseProblem(ex);
  return problem ? { bad: problem } : { ok: ex };
}

/**
 * Builds the lesson's blocks from the model's JSON and checks them with the
 * publish-time validators. Throws RichLessonError when the lesson isn't
 * good enough to keep (the caller retries or fails the lesson).
 */
export function buildRichLesson(
  content: any,
  video: { url: string; durationSec: number | null },
  track: ImportTrack,
): RichBuildResult {
  if (!content || typeof content !== 'object')
    throw new RichLessonError('The model returned no lesson object.');
  const dropped: string[] = [];

  const summary = s(content.summary, 600);
  const outcomes = list(content.whatYouWillLearn, 5, 150);
  const ideas = (Array.isArray(content.keyIdeas) ? content.keyIdeas : [])
    .map((k: any) => ({ heading: s(k?.heading, 90), body: s(k?.body, 900) }))
    .filter((k: any) => k.body.length >= 20)
    .slice(0, KEY_IDEAS_MAX);
  if (summary.length < 20)
    throw new RichLessonError('The lesson summary is missing.');
  if (ideas.length < KEY_IDEAS_MIN)
    throw new RichLessonError(
      `Only ${ideas.length} key ideas (need ${KEY_IDEAS_MIN}).`,
    );

  const codeLang: CodeLanguage = 'plaintext';
  const codes = (Array.isArray(content.codeSamples) ? content.codeSamples : [])
    .map((c: any) => ({
      code: s(c?.code, 3500),
      language: lang(c?.language, codeLang),
      caption: s(c?.caption, 250),
    }))
    .filter((c: any) => c.code.length >= 5)
    .slice(0, 3);

  const tipText = s(content.tip?.text, 400);
  const tipTone = ['tip', 'warning', 'remember'].includes(content.tip?.tone)
    ? content.tip.tone
    : 'tip';
  const qc = content.quickCheck;
  const qcOptions = list(qc?.options, 4, 250);
  const qcIndex = Number.isInteger(qc?.correctIndex) ? qc.correctIndex : -1;

  /* Learn */
  const fitsCard =
    video.durationSec !== null &&
    video.durationSec > 0 &&
    video.durationSec <= MAX_VIDEO_SECONDS;
  let learnBlocks: unknown[];
  let learnCardCount = 0;
  if (fitsCard) {
    const cards: any[] = [
      {
        id: 'c_video',
        kind: 'video',
        url: video.url,
        durationSec: Math.round(video.durationSec as number),
      },
    ];
    ideas.forEach((k: any, i: number) => {
      cards.push({
        id: `c_idea${i}`,
        kind: 'text',
        html: `${k.heading ? `<h3>${esc(k.heading)}</h3>` : ''}${paragraphs(k.body)}`,
      });
      if (codes[i])
        cards.push({
          id: `c_code${i}`,
          kind: 'code',
          language: codes[i].language,
          code: codes[i].code,
          ...(codes[i].caption ? { caption: codes[i].caption } : {}),
        });
    });
    codes.slice(ideas.length).forEach((c: any, j: number) =>
      cards.push({
        id: `c_codex${j}`,
        kind: 'code',
        language: c.language,
        code: c.code,
        ...(c.caption ? { caption: c.caption } : {}),
      }),
    );
    if (tipText)
      cards.push({
        id: 'c_tip',
        kind: 'callout',
        tone: tipTone,
        text: tipText,
      });
    if (
      s(qc?.question, 400) &&
      qcOptions.length >= 2 &&
      qcOptions[qcIndex] &&
      uniq(qcOptions)
    ) {
      cards.push({
        id: 'c_check',
        kind: 'check',
        question: s(qc.question, 400),
        options: qcOptions,
        correctIndex: qcIndex,
        ...(s(qc.explanation, 600)
          ? { explanation: s(qc.explanation, 600) }
          : {}),
      });
    } else if (qc) {
      dropped.push('quick check (no clear right answer)');
    }
    const valid = cards.filter((c) => {
      const p = learnCardProblem(c);
      if (p) dropped.push(`Learn card: ${p}`);
      return !p;
    });
    learnCardCount = valid.length;
    learnBlocks = [
      { type: 'learnCards', value: valid },
      ...(outcomes.length
        ? [{ type: 'whatYouWillLearn', value: outcomes }]
        : []),
    ];
  } else {
    // Classic Learn: the long video plays as before, and the key ideas become
    // its reading (the player splits long reading into cards on its own).
    const reading =
      ideas
        .map(
          (k: any) =>
            `${k.heading ? `<h3>${esc(k.heading)}</h3>` : ''}${paragraphs(k.body)}`,
        )
        .join('') +
      codes
        .map(
          (c: any) =>
            `<pre><code>${esc(c.code)}</code></pre>${c.caption ? `<p>${esc(c.caption)}</p>` : ''}`,
        )
        .join('') +
      (tipText
        ? `<blockquote><p><strong>${tipTone === 'warning' ? 'Watch out' : tipTone === 'remember' ? 'Remember' : 'Tip'}:</strong> ${esc(tipText)}</p></blockquote>`
        : '');
    learnBlocks = [
      { type: 'videoUrl', value: video.url },
      { type: 'audioUrl', value: '' },
      { type: 'text', value: reading },
      { type: 'whatYouWillLearn', value: outcomes },
    ];
  }

  /* Apply */
  // Small models sometimes file the reflection under exercises. It isn't a
  // broken exercise: move it to where it belongs instead of dropping it.
  const isReflect = (e: any) => /^reflect/i.test(s(e?.kind, 30));
  const misplacedReflect = Array.isArray(content.exercises)
    ? content.exercises.find(isReflect)
    : undefined;
  const rawExercises = Array.isArray(content.exercises)
    ? content.exercises
        .filter((e: any) => !isReflect(e))
        .slice(0, RICH_EXERCISES_MAX + 3)
    : [];
  const exercises: any[] = [];
  rawExercises.forEach((raw: any, i: number) => {
    const r = buildExercise(raw, i, track);
    if ('ok' in r) exercises.push(r.ok);
    else
      dropped.push(`Exercise ${i + 1} (${s(raw?.kind, 20) || '?'}): ${r.bad}`);
  });
  const items = exercises.slice(0, RICH_EXERCISES_MAX);
  if (items.length < RICH_EXERCISES_KEEP_MIN) {
    throw new RichLessonError(
      `Only ${items.length} usable exercises (need ${RICH_EXERCISES_KEEP_MIN}). Dropped: ${dropped.slice(0, 4).join('; ')}`,
    );
  }
  const applyBlocks = [
    { type: 'exercises', value: { scenario: s(content.scenario, 300), items } },
  ];

  /* Reflect */
  const reflectPrompt =
    s(content.reflectPrompt, 400) ||
    s(misplacedReflect?.prompt, 400) ||
    'Where will you use this in your own work this week? Be specific.';
  const starters = list(content.reflectStarters, 3, 80);
  const reflectBlocks = [
    {
      type: 'reflectActivity',
      value: {
        prompt: reflectPrompt,
        type: 'open',
        openConfig: {
          useStarters: starters.length > 0,
          starters,
          minWordCount: 20,
          required: true,
          peerVisibility: false,
          allowComments: false,
          allowAttachments: false,
        },
        guidedConfig: {
          questions: [],
          minWordCountPerQuestion: 10,
          required: true,
          allowAttachments: false,
        },
      },
    },
  ];

  /* Deepen */
  const deepenBlocks = [
    {
      type: 'deepenActivity',
      value: {
        collectionTitle: s(content.deepenTitle, 100) || 'Go deeper',
        collectionDescription:
          s(content.deepenSummary, 400) || 'Take this lesson one step further.',
        resourceSettings: {
          makeRequired: false,
          trackCompletion: false,
          allowDownloads: true,
          openInNewTab: true,
        },
        recommendedNextStep: { type: 'continue' },
        showLearningPathSuggestions: false,
        learningPathSuggestions: [],
      },
    },
  ];

  // The same check publish runs. If this passes, the lesson publishes.
  const state = phaseStateFromBlocks({
    learn: learnBlocks,
    apply: applyBlocks,
  });
  const errors = [
    ...(state.learn?.errors ?? []),
    ...(state.apply?.errors ?? []),
  ];
  if (errors.length > 0)
    throw new RichLessonError(
      `Lesson failed Teyro's publish checks: ${errors.join(' ')}`,
    );

  return {
    description: summary,
    learnBlocks,
    applyBlocks,
    reflectBlocks,
    deepenBlocks,
    stats: {
      learnCards: learnCardCount,
      exercises: items.length,
      kinds: Array.from(
        new Set(
          items.map((e) =>
            e.kind === 'mcq' && e.variant !== 'standard' ? e.variant : e.kind,
          ),
        ),
      ),
      dropped,
      classicLearn: !fitsCard,
    },
  };
}
