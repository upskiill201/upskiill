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
  CAST_IDS,
  CODE_LANGUAGES,
  LIMITS,
  RICH_LIMITS,
  richLearnCardIssue,
  type CastId,
  type RichLearnCard,
  type StorySpeaker,
  validateExercise,
  type CodeCheck,
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

const castId = (v: unknown): CastId | undefined =>
  (CAST_IDS as readonly string[]).includes(v as string) ? (v as CastId) : undefined;
const speaker = (v: unknown): StorySpeaker => (v === 'tey' ? 'tey' : castId(v) ?? 'narrator');

/**
 * A Teyro Originals Learn card (story, chat, reading page...), parsed but
 * not validated. Null for an unknown kind.
 */
function parseRichCard(c: any, cid: string): RichLearnCard | null {
  switch (c?.kind) {
    case 'reading':
      return { id: cid, kind: 'reading', title: optStr(c.title, 200), html: str(c.html, RICH_LIMITS.readingChars) };
    case 'story':
      return {
        id: cid,
        kind: 'story',
        title: optStr(c.title, 200),
        beats: Array.isArray(c.beats)
          ? c.beats.slice(0, RICH_LIMITS.beats).map((b: any) => ({ speaker: speaker(b?.speaker), text: str(b?.text, 1000) }))
          : [],
        ...(c.choice && typeof c.choice === 'object'
          ? {
              choice: {
                prompt: str(c.choice.prompt, 300),
                options: Array.isArray(c.choice.options)
                  ? c.choice.options.slice(0, RICH_LIMITS.choiceOptions).map((o: any) => ({
                      text: str(o?.text, 300),
                      outcome: str(o?.outcome, 1000),
                      best: o?.best === true,
                    }))
                  : [],
              },
            }
          : {}),
      };
    case 'chat':
      return {
        id: cid,
        kind: 'chat',
        turns: Array.isArray(c.turns)
          ? c.turns.slice(0, RICH_LIMITS.turns).map((t: any) => ({
              tey: str(t?.tey, 1000),
              replies: strList(t?.replies, RICH_LIMITS.replies, 160).filter((r) => r.trim()),
            }))
          : [],
      };
    case 'steps':
      return {
        id: cid,
        kind: 'steps',
        title: optStr(c.title, 200),
        steps: Array.isArray(c.steps)
          ? c.steps.slice(0, RICH_LIMITS.steps).map((s: any) => ({
              title: str(s?.title, 200),
              body: str(s?.body, 1500),
              code: optStr(s?.code, LIMITS.codeChars),
              language: optLang(s?.language),
            }))
          : [],
      };
    case 'compare':
      return {
        id: cid,
        kind: 'compare',
        title: optStr(c.title, 200),
        before: { label: optStr(c.before?.label, 60), text: str(c.before?.text, 3000) },
        after: { label: optStr(c.after?.label, 60), text: str(c.after?.text, 3000) },
        notes: strList(c.notes, RICH_LIMITS.notes, 400).filter((n) => n.trim()),
      };
    case 'explore':
      return {
        id: cid,
        kind: 'explore',
        title: optStr(c.title, 200),
        text: str(c.text, 3000),
        hotspots: Array.isArray(c.hotspots)
          ? c.hotspots.slice(0, RICH_LIMITS.hotspots).map((h: any) => ({ phrase: str(h?.phrase, 200), note: str(h?.note, 600) }))
          : [],
      };
    case 'tryIt':
      return {
        id: cid,
        kind: 'tryIt',
        title: optStr(c.title, 200),
        code: str(c.code, LIMITS.codeChars),
        caption: optStr(c.caption, 300),
        challenge: optStr(c.challenge, 400),
        ...(Array.isArray(c.stdin) ? { stdin: strList(c.stdin, RICH_LIMITS.stdin, 200) } : {}),
      };
    case 'myth':
      return {
        id: cid,
        kind: 'myth',
        statements: Array.isArray(c.statements)
          ? c.statements.slice(0, RICH_LIMITS.statements).map((s: any) => ({
              text: str(s?.text, 300),
              isFact: s?.isFact === true,
              explain: str(s?.explain, 800),
            }))
          : [],
      };
    default:
      return null;
  }
}

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
      default: {
        const rich = parseRichCard(c, cid);
        if (rich && richLearnCardIssue(rich) === null) out.push(rich);
        break;
      }
    }
  });
  return out;
}

/** Parses one exercise, or null when its kind is unknown. Does NOT validate. */
export function parseExercise(e: any, i: number): Exercise | null {
  const base = { id: id(e?.id, `ex_${i}`), prompt: str(e?.prompt, 500), explanation: optStr(e?.explanation, 1500) };
  switch (e?.kind) {
    case 'mcq': {
      const variant: McqVariant =
        e.variant === 'predictOutput' || e.variant === 'pickPrompt' || e.variant === 'chat' ? e.variant : 'standard';
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
        character: castId(e.character),
        message: optStr(e.message, 1000),
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
    case 'tapBuild':
      return {
        ...base,
        kind: 'tapBuild',
        language: optLang(e.language),
        tiles: strList(e.tiles, LIMITS.bank, 120).filter((t) => t.trim()),
        distractors: strList(e.distractors, LIMITS.bank, 120).filter((t) => t.trim()),
      };
    case 'typeAnswer':
      return {
        ...base,
        kind: 'typeAnswer',
        answers: strList(e.answers, 8, 200).filter((a) => a.trim()),
        placeholder: optStr(e.placeholder, 80),
      };
    case 'sortGroups':
      return {
        ...base,
        kind: 'sortGroups',
        groups: Array.isArray(e.groups)
          ? e.groups.slice(0, 3).map((g: any, j: number) => ({ id: id(g?.id, `g${j}`), label: str(g?.label, 60) }))
          : [],
        items: Array.isArray(e.items)
          ? e.items.slice(0, LIMITS.pairs).map((it: any, j: number) => ({
              id: id(it?.id, `i${j}`),
              text: str(it?.text, 300),
              groupId: str(it?.groupId, 80),
            }))
          : [],
      };
    case 'writeCode':
      return {
        ...base,
        kind: 'writeCode',
        language: 'python',
        starter: str(e.starter, LIMITS.codeChars),
        solution: str(e.solution, LIMITS.codeChars),
        hint: optStr(e.hint, 600),
        checks: Array.isArray(e.checks) ? e.checks.slice(0, RICH_LIMITS.checks).map(parseCheck) : [],
        ...(Array.isArray(e.stdin) ? { stdin: strList(e.stdin, RICH_LIMITS.stdin, 200) } : {}),
      };
    default:
      return null;
  }
}

/** One hidden check: only the tests that are strings survive. */
function parseCheck(c: any): CodeCheck {
  const test = (v: unknown) => (typeof v === 'string' ? v.slice(0, 500) : undefined);
  return {
    message: str(c?.message, 300),
    ...(test(c?.outputIncludes) !== undefined ? { outputIncludes: test(c.outputIncludes) } : {}),
    ...(test(c?.outputEquals) !== undefined ? { outputEquals: test(c.outputEquals) } : {}),
    ...(test(c?.expr) !== undefined ? { expr: test(c.expr) } : {}),
    ...(test(c?.codeIncludes) !== undefined ? { codeIncludes: test(c.codeIncludes) } : {}),
  };
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
