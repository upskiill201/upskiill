/**
 * Turns stored lesson JSON into typed v2 blocks a learner can safely play.
 *
 * contentBlocks is creator JSON: it may be half-written, from an older
 * builder, or hand-edited. Anything malformed or incomplete is dropped here
 * rather than shown broken — a learner never meets an exercise with no right
 * answer or a card with nothing on it.
 */

/* eslint-disable @typescript-eslint/no-explicit-any -- this file's job is parsing untyped JSON */

import {
  CODE_LANGUAGES,
  LIMITS,
  validateExercise,
  type CodeLanguage,
  type Exercise,
  type LearnCard,
  type McqVariant,
} from './blocks';

const str = (v: unknown, max: number = LIMITS.textChars): string =>
  typeof v === 'string' ? v.slice(0, max) : '';
const optStr = (v: unknown, max: number = LIMITS.textChars): string | undefined => {
  const s = str(v, max).trim();
  return s ? s : undefined;
};
const lang = (v: unknown): CodeLanguage =>
  (CODE_LANGUAGES as readonly string[]).includes(v as string) ? (v as CodeLanguage) : 'plaintext';
const optLang = (v: unknown): CodeLanguage | undefined =>
  (CODE_LANGUAGES as readonly string[]).includes(v as string) ? (v as CodeLanguage) : undefined;
const strList = (v: unknown, maxItems: number, maxLen: number = LIMITS.textChars): string[] =>
  Array.isArray(v) ? v.slice(0, maxItems).map((x) => str(x, maxLen)) : [];
const id = (v: unknown, fallback: string) => (typeof v === 'string' && v ? v.slice(0, 80) : fallback);
const num = (v: unknown, fallback = 0) => (typeof v === 'number' && Number.isFinite(v) ? v : fallback);

/** A clipped media card's play range (long imported videos split into parts). */
const clip = (c: any): { startSec?: number; endSec?: number } => {
  const start = num(c?.startSec, -1);
  const end = num(c?.endSec, -1);
  return start >= 0 && end > start ? { startSec: start, endSec: end } : {};
};

export function sanitizeLearnCards(raw: unknown): LearnCard[] {
  if (!Array.isArray(raw)) return [];
  const out: LearnCard[] = [];
  raw.slice(0, LIMITS.learnCards).forEach((c: any, i) => {
    const cid = id(c?.id, `card_${i}`);
    switch (c?.kind) {
      case 'text': {
        const html = str(c.html);
        if (html.replace(/<[^>]*>/g, '').trim()) out.push({ id: cid, kind: 'text', html });
        break;
      }
      case 'code': {
        const code = str(c.code, LIMITS.codeChars);
        if (code.trim()) out.push({ id: cid, kind: 'code', language: lang(c.language), code, caption: optStr(c.caption, 300) });
        break;
      }
      case 'video':
        if (str(c.url).trim()) out.push({ id: cid, kind: 'video', url: str(c.url), durationSec: num(c.durationSec), caption: optStr(c.caption, 300), ...clip(c) });
        break;
      case 'audio':
        if (str(c.url).trim()) out.push({ id: cid, kind: 'audio', url: str(c.url), durationSec: num(c.durationSec) || undefined, caption: optStr(c.caption, 300), ...clip(c) });
        break;
      case 'image':
        if (str(c.url).trim()) out.push({ id: cid, kind: 'image', url: str(c.url), alt: str(c.alt, 300), caption: optStr(c.caption, 300) });
        break;
      case 'callout': {
        const text = str(c.text, 1000);
        const tone = c.tone === 'warning' || c.tone === 'remember' ? c.tone : 'tip';
        if (text.trim()) out.push({ id: cid, kind: 'callout', tone, text });
        break;
      }
      case 'check': {
        const options = strList(c.options, LIMITS.options, 300);
        const correctIndex = num(c.correctIndex, -1);
        if (str(c.question).trim() && options.filter((o) => o.trim()).length >= 2 && options[correctIndex]?.trim()) {
          out.push({ id: cid, kind: 'check', question: str(c.question, 500), options, correctIndex, explanation: optStr(c.explanation, 1000) });
        }
        break;
      }
      default:
        break;
    }
  });
  return out;
}

/** Parses one exercise, or null when its kind is unknown. Does NOT validate. */
export function parseExercise(e: any, i: number): Exercise | null {
  const base = { id: id(e?.id, `ex_${i}`), prompt: str(e?.prompt, 500), explanation: optStr(e?.explanation, 1500) };
  switch (e?.kind) {
    case 'mcq': {
      const variant: McqVariant = e.variant === 'predictOutput' || e.variant === 'pickPrompt' ? e.variant : 'standard';
      const options = Array.isArray(e.options)
        ? e.options.slice(0, LIMITS.options).map((o: any, j: number) => ({
            id: id(o?.id, `o${j}`),
            text: str(o?.text, variant === 'pickPrompt' ? 2000 : 500),
            misconception: optStr(o?.misconception, 600),
          }))
        : [];
      return {
        ...base,
        kind: 'mcq',
        variant,
        code: optStr(e.code, LIMITS.codeChars),
        language: optLang(e.language),
        options,
        correctOptionId: str(e.correctOptionId, 80),
      };
    }
    case 'fillBlank':
      return {
        ...base,
        kind: 'fillBlank',
        language: optLang(e.language),
        template: str(e.template, LIMITS.codeChars),
        blanks: Array.isArray(e.blanks)
          ? e.blanks.slice(0, LIMITS.blanks).map((b: any, j: number) => ({
              id: id(b?.id, `b${j}`),
              answers: strList(b?.answers, 5, 200),
            }))
          : [],
        distractors: strList(e.distractors, LIMITS.bank, 200).filter((d) => d.trim()),
      };
    case 'findBug':
      return {
        ...base,
        kind: 'findBug',
        language: optLang(e.language),
        lines: strList(e.lines, LIMITS.lines, 500),
        bugLine: num(e.bugLine, -1),
        fix: optStr(e.fix, 500),
      };
    case 'orderLines':
      return { ...base, kind: 'orderLines', language: optLang(e.language), lines: strList(e.lines, LIMITS.lines, 500).filter((l) => l.trim()) };
    case 'matchPairs':
      return {
        ...base,
        kind: 'matchPairs',
        pairs: Array.isArray(e.pairs)
          ? e.pairs.slice(0, LIMITS.pairs).map((p: any, j: number) => ({
              id: id(p?.id, `p${j}`),
              left: str(p?.left, 200),
              right: str(p?.right, 300),
            }))
          : [],
      };
    default:
      return null;
  }
}

/** The exercises a learner can actually take: parsed AND complete. */
export function sanitizeExercises(raw: unknown): Exercise[] {
  if (!Array.isArray(raw)) return [];
  return raw
    .slice(0, LIMITS.exercises)
    .map(parseExercise)
    .filter((e): e is Exercise => e !== null && validateExercise(e) === null)
    .map((e) =>
      // Empty option slots from the builder are not answers.
      e.kind === 'mcq' ? { ...e, options: e.options.filter((o) => o.text.trim()) } : e,
    );
}
