/**
 * The answer checker: a second pair of eyes on every imported exercise.
 *
 * Imported lessons went live with questions learners couldn't parse and,
 * worse, the wrong option marked right (founder report, 2026-10-15). The
 * writer grading its own work rubber-stamps it, so the checker works BLIND
 * where it can: it gets the transcript and each multiple-choice /
 * spot-the-mistake item WITHOUT the answer key, solves it, and we compare.
 * The kinds whose answer is the whole item (fill in, order, match) are shown
 * with their intended answer and judged: right per the transcript, and no
 * other shown choice also right. Every item is also judged for clarity.
 *
 * Disagreement drops the item. A dropped question costs the learner one
 * exercise; a wrong one costs their trust in every answer after it.
 *
 * Pure functions here; LessonContentGenerationService makes the call.
 */

/* eslint-disable @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call -- reads untyped lesson and model JSON; every value is checked before use */

import type { RichBuildResult } from './rich-lesson';

export const REVIEW_SYSTEM_PROMPT = `You check practice questions for Teyro, a learning app, against the lesson's transcript. A learner who understood the lesson must be able to answer each one, and must be marked right when they do.

For EVERY item return {"n", "answer", "correct", "clear", "problem"}:
- multiple choice: solve it yourself from the transcript; "answer" is the letter of the right option. If no option is right, or two are, answer "none".
- spot the mistake: "answer" is the number of the one wrong line. If no line is wrong, or several are, answer "none".
- fill in the blanks / put in order / match the pairs: you see the intended answer. "correct": true only if it is right according to the transcript AND nothing else shown would also be right (a word choice that also fits a blank, a second valid order, pairs that could swap).
- every item: "clear": false if a beginner who just did the lesson could misread it, if it needs knowledge the transcript doesn't give, if the wording is confusing, or if it hinges on a trick. "problem": a few words naming what's wrong, else "".
Judge only by the transcript, not by what is usually true elsewhere.

Return ONLY {"items": [...]}, one entry per item, using each item's "n".`;

export const REVIEW_JSON_SCHEMA = {
  type: 'object',
  properties: {
    items: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          n: { type: 'string' },
          answer: { type: 'string' },
          correct: { type: 'boolean' },
          clear: { type: 'boolean' },
          problem: { type: 'string' },
        },
        required: ['n'],
      },
    },
  },
  required: ['items'],
} as const;

const LETTERS = 'ABCDEF';
/** The Learn card quick check's number in the sheet. */
const CHECK_N = 'Q';

const exercisesOf = (built: RichBuildResult): any[] => {
  const block = (built.applyBlocks as any[]).find(
    (b) => b?.type === 'exercises',
  );
  return Array.isArray(block?.value?.items) ? block.value.items : [];
};
const cardsOf = (built: RichBuildResult): any[] | null => {
  const block = (built.learnBlocks as any[]).find(
    (b) => b?.type === 'learnCards',
  );
  return Array.isArray(block?.value) ? block.value : null;
};
const checkCardOf = (built: RichBuildResult) =>
  cardsOf(built)?.find((c) => c?.kind === 'check');

/** True when there's anything for the checker to look at. */
export function hasReviewableItems(built: RichBuildResult): boolean {
  return exercisesOf(built).length > 0 || !!checkCardOf(built);
}

/** Plain-text sheet of the lesson's items, without the answer key where
 *  the checker solves blind. */
export function reviewSheet(built: RichBuildResult): string {
  const out: string[] = [];
  exercisesOf(built).forEach((e, i) => {
    const n = String(i + 1);
    const code = e.code ? `\nCode:\n${e.code}` : '';
    switch (e.kind) {
      case 'mcq':
        out.push(
          `#${n} multiple choice\n${e.prompt}${code}\n${(e.options as any[])
            .map((o, j) => `${LETTERS[j]}) ${o.text}`)
            .join('\n')}`,
        );
        break;
      case 'findBug':
        out.push(
          `#${n} spot the mistake\n${e.prompt}\n${(e.lines as string[])
            .map((l, j) => `${j + 1}. ${l}`)
            .join('\n')}`,
        );
        break;
      case 'fillBlank': {
        const answers = (e.blanks as any[])
          .map((b, j) => `[[${j + 1}]] = ${b.answers?.[0] ?? ''}`)
          .join('; ');
        const others = (e.distractors as string[]) ?? [];
        out.push(
          `#${n} fill in the blanks\n${e.prompt}\nSentence: ${e.template}\nIntended: ${answers}${others.length ? `\nOther word choices shown: ${others.join(', ')}` : ''}`,
        );
        break;
      }
      case 'orderLines':
        out.push(
          `#${n} put in order\n${e.prompt}\nIntended order:\n${(
            e.lines as string[]
          )
            .map((l, j) => `${j + 1}. ${l}`)
            .join('\n')}`,
        );
        break;
      case 'matchPairs':
        out.push(
          `#${n} match the pairs\n${e.prompt}\nIntended pairs:\n${(
            e.pairs as any[]
          )
            .map((p) => `${p.left} -> ${p.right}`)
            .join('\n')}`,
        );
        break;
    }
  });
  const check = checkCardOf(built);
  if (check)
    out.push(
      `#${CHECK_N} multiple choice\n${check.question}\n${(
        check.options as string[]
      )
        .map((o, j) => `${LETTERS[j]}) ${o}`)
        .join('\n')}`,
    );
  return out.join('\n\n');
}

interface Verdict {
  answer: string;
  correct: boolean | null;
  clear: boolean | null;
  problem: string;
}

function verdictsOf(reply: unknown): Map<string, Verdict> {
  const map = new Map<string, Verdict>();
  const items = (reply as any)?.items;
  if (!Array.isArray(items)) return map;
  for (const v of items) {
    const n = String(v?.n ?? '')
      .replace(/^#/, '')
      .trim()
      .toUpperCase();
    if (!n) continue;
    map.set(n, {
      answer:
        typeof v.answer === 'string' ? v.answer.trim() : String(v.answer ?? ''),
      correct: typeof v.correct === 'boolean' ? v.correct : null,
      clear: typeof v.clear === 'boolean' ? v.clear : null,
      problem: typeof v.problem === 'string' ? v.problem.slice(0, 120) : '',
    });
  }
  return map;
}

/** The checker's letter/number answer → 0-based index; null if unreadable,
 *  -1 for "none". */
function pickedIndex(answer: string, kind: 'letter' | 'number'): number | null {
  const a = answer.trim();
  if (/^none\b/i.test(a)) return -1;
  if (kind === 'letter') {
    const m = /^\(?([A-F])\)?(?:[).:\s]|$)/i.exec(a);
    return m ? m[1].toUpperCase().charCodeAt(0) - 65 : null;
  }
  const m = /^(?:line\s*)?(\d{1,2})\b/i.exec(a);
  return m ? Number(m[1]) - 1 : null;
}

/** Why the checker rejects this item, or null to keep it. Items it said
 *  nothing about are kept: the writer's own checks already passed them. */
function rejection(
  key: number | null,
  v: Verdict | undefined,
  blind: 'letter' | 'number' | null,
): string | null {
  if (!v) return null;
  if (v.clear === false) return `unclear${v.problem ? ` (${v.problem})` : ''}`;
  if (blind && key !== null) {
    const picked = pickedIndex(v.answer, blind);
    if (picked === -1)
      return `no single right answer${v.problem ? ` (${v.problem})` : ''}`;
    if (picked !== null && picked !== key) {
      const say = (i: number) =>
        blind === 'letter' ? (LETTERS[i] ?? '?') : `line ${i + 1}`;
      return `checker answered ${say(picked)}, the key says ${say(key)}`;
    }
    if (picked !== null) return null;
  }
  return v.correct === false
    ? `wrong answer${v.problem ? ` (${v.problem})` : ''}`
    : null;
}

/**
 * The lesson with every item the checker rejected taken out. An Apply step
 * left empty is removed (the player skips it); a rejected quick check just
 * leaves the Learn cards without one.
 */
export function applyReview(
  built: RichBuildResult,
  reply: unknown,
): { lesson: RichBuildResult; rejected: string[] } {
  const verdicts = verdictsOf(reply);
  const rejected: string[] = [];

  const kept = exercisesOf(built).filter((e, i) => {
    const blind =
      e.kind === 'mcq' ? 'letter' : e.kind === 'findBug' ? 'number' : null;
    const key =
      e.kind === 'mcq'
        ? (e.options as any[]).findIndex((o) => o.id === e.correctOptionId)
        : e.kind === 'findBug'
          ? e.bugLine
          : null;
    const why = rejection(key, verdicts.get(String(i + 1)), blind);
    if (why) rejected.push(`Exercise ${i + 1} (${e.kind}): ${why}`);
    return !why;
  });

  const learnBlocks = (built.learnBlocks as any[]).map((b) => {
    if (b?.type !== 'learnCards' || !Array.isArray(b.value)) return b;
    const value = b.value.filter((c: any) => {
      if (c?.kind !== 'check') return true;
      const why = rejection(c.correctIndex, verdicts.get(CHECK_N), 'letter');
      if (why) rejected.push(`Quick check: ${why}`);
      return !why;
    });
    return { ...b, value };
  });

  const applyBlocks = kept.length
    ? (built.applyBlocks as any[]).map((b) =>
        b?.type === 'exercises'
          ? { ...b, value: { ...b.value, items: kept } }
          : b,
      )
    : [];

  return {
    lesson: {
      ...built,
      learnBlocks,
      applyBlocks,
      stats: {
        ...built.stats,
        exercises: kept.length,
        kinds: Array.from(
          new Set(
            kept.map((e) =>
              e.kind === 'mcq' && e.variant !== 'standard' ? e.variant : e.kind,
            ),
          ),
        ),
        dropped: [...built.stats.dropped, ...rejected],
        learnCards:
          cardsOf({ ...built, learnBlocks } as RichBuildResult)?.length ??
          built.stats.learnCards,
      },
    },
    rejected,
  };
}
