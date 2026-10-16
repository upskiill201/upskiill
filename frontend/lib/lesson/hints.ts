/**
 * Hints for the Apply step: a real nudge for every exercise kind, at the
 * moment a learner is stuck, so "I can't do this one" becomes "oh, right"
 * instead of a closed tab.
 *
 * Research behind it: learners tend to disengage when they hit an obstacle
 * they can't get past alone, and on-demand help works best when it arrives
 * right when they stall (see the hint/dropout literature, e.g. learning-
 * analytics work on quitting in educational games). So the player offers a
 * hint unprompted after a stall, as well as on tap.
 *
 * Rules every hint follows:
 *  - It's a step, never the whole answer: the learner always makes the last
 *    move(s) themselves. When a step would finish the answer, the hint is a
 *    clue instead ("starts with 'tr'").
 *  - It builds on what they already have: a right first line stays; a wrong
 *    one is corrected.
 *
 * Pure: (exercise, current response, what's already been hinted) → a hint.
 */

import {
  fillBlankBank,
  pairMatchIsRight,
  tapBuildBank,
  type Exercise,
  type ExerciseResponse,
  type FillBlankExercise,
  type FindBugExercise,
  type MatchPairsExercise,
  type McqExercise,
  type OrderLinesExercise,
  type SortGroupsExercise,
  type TapBuildExercise,
  type TypeAnswerExercise,
} from './blocks';

/** Hints per lesson. Shown as a row of bulbs. */
export const HINTS_PER_LESSON = 3;

/** Idle seconds on a question before the bulb offers itself. */
export const HINT_NUDGE_SECONDS = 25;

export interface HintMemory {
  /** MCQ options struck out. */
  eliminated: string[];
  /** Find-the-bug lines struck out. */
  eliminatedLines: number[];
  /** Clues already given on this question. */
  clues: number;
}

export const NO_HINTS: HintMemory = { eliminated: [], eliminatedLines: [], clues: 0 };

export interface Hint {
  /**
   * The response with the hint applied. undefined: leave it alone (a clue);
   * null: clear it (the pick was struck out).
   */
  response?: ExerciseResponse | null;
  memory: HintMemory;
  /** What Tey says about it. */
  line: string;
}

const norm = (s: string) => s.trim().replace(/\s+/g, ' ').toLowerCase();
const half = (n: number) => Math.max(1, Math.floor(n / 2));

function mcqHint(ex: McqExercise, r: ExerciseResponse | null, m: HintMemory): Hint | null {
  const wrong = ex.options.filter((o) => o.id !== ex.correctOptionId && !m.eliminated.includes(o.id));
  // Always leave a real choice: at least one wrong option stays.
  if (wrong.length <= 1) return null;
  const strike = wrong.slice(0, Math.min(half(wrong.length), wrong.length - 1)).map((o) => o.id);
  const picked = r?.kind === 'mcq' ? r.optionId : null;
  return {
    response: picked && strike.includes(picked) ? null : r,
    memory: { ...m, eliminated: [...m.eliminated, ...strike] },
    line: strike.length > 1 ? `I crossed out ${strike.length} wrong answers. It's one of the rest.` : 'I crossed out one wrong answer for you.',
  };
}

function findBugHint(ex: FindBugExercise, r: ExerciseResponse | null, m: HintMemory): Hint | null {
  const clean = ex.lines.map((_, i) => i).filter((i) => i !== ex.bugLine && !m.eliminatedLines.includes(i));
  if (clean.length <= 1) return null;
  const strike = clean.slice(0, Math.min(half(clean.length), clean.length - 1));
  const picked = r?.kind === 'findBug' ? r.line : null;
  return {
    response: picked !== null && strike.includes(picked) ? null : r,
    memory: { ...m, eliminatedLines: [...m.eliminatedLines, ...strike] },
    line: strike.length > 1 ? `Those ${strike.length} lines are fine. Look at the others.` : "That line's fine. Look at the others.",
  };
}

function firstLetters(answer: string): string {
  const a = answer.trim();
  return a.slice(0, a.length > 6 ? 2 : 1);
}

function fillBlankHint(ex: FillBlankExercise, r: ExerciseResponse | null, m: HintMemory): Hint | null {
  const filled: (string | null)[] =
    r?.kind === 'fillBlank' && r.filled.length === ex.blanks.length ? [...r.filled] : ex.blanks.map(() => null);
  const ok = (i: number) => ex.blanks[i].answers.some((a) => norm(a) === norm(filled[i] ?? ''));
  const target = ex.blanks.findIndex((_, i) => !ok(i));
  if (target < 0) return null;
  const rightCount = ex.blanks.filter((_, i) => ok(i)).length;
  const word = ex.blanks[target].answers[0];
  // The last blank stays theirs: a clue instead of the word.
  if (rightCount + 1 >= ex.blanks.length) {
    if (m.clues > 0) return null;
    return {
      memory: { ...m, clues: m.clues + 1 },
      line: `Blank ${target + 1} starts with "${firstLetters(word)}".`,
    };
  }
  const bank = fillBlankBank(ex);
  if (!bank.some((b) => norm(b) === norm(word))) return null;
  // Take the word back from any wrong blank it's sitting in, then place it.
  for (let i = 0; i < filled.length; i++) if (i !== target && !ok(i) && norm(filled[i] ?? '') === norm(word)) filled[i] = null;
  filled[target] = bank.find((b) => norm(b) === norm(word)) ?? word;
  return {
    response: { kind: 'fillBlank', filled },
    memory: m,
    line: `I filled blank ${target + 1} for you. The rest is yours.`,
  };
}

function orderHint(ex: OrderLinesExercise, r: ExerciseResponse | null, m: HintMemory): Hint | null {
  const order = r?.kind === 'orderLines' ? r.order : [];
  let k = 0;
  while (k < order.length && norm(ex.lines[order[k]] ?? '') === norm(ex.lines[k] ?? '')) k++;
  // Leave at least two lines for the learner.
  if (ex.lines.length < 3 || k + 1 > ex.lines.length - 2) return null;
  return {
    response: { kind: 'orderLines', order: Array.from({ length: k + 1 }, (_, i) => i) },
    memory: m,
    line: k === 0 ? 'I put the first one in place.' : `The first ${k + 1} are in place now.`,
  };
}

function tapBuildHint(ex: TapBuildExercise, r: ExerciseResponse | null, m: HintMemory): Hint | null {
  const bank = tapBuildBank(ex);
  const picked = r?.kind === 'tapBuild' ? r.picked : [];
  let k = 0;
  while (k < picked.length && k < ex.tiles.length && norm(bank[picked[k]] ?? '') === norm(ex.tiles[k])) k++;
  if (ex.tiles.length < 2 || k + 1 > ex.tiles.length - 1) return null;
  const used = new Set<number>();
  const next: number[] = [];
  for (let i = 0; i <= k; i++) {
    const at = bank.findIndex((b, j) => !used.has(j) && norm(b) === norm(ex.tiles[i]));
    if (at < 0) return null;
    used.add(at);
    next.push(at);
  }
  return {
    response: { kind: 'tapBuild', picked: next },
    memory: m,
    line: k === 0 ? `It starts with "${ex.tiles[0]}".` : `Here's the start: "${ex.tiles.slice(0, k + 1).join(' ')}".`,
  };
}

function matchHint(ex: MatchPairsExercise, r: ExerciseResponse | null, m: HintMemory): Hint | null {
  const matches = r?.kind === 'matchPairs' ? { ...r.matches } : {};
  // Wrong matches come apart first. Right cards that read the same count as one.
  for (const k of Object.keys(matches)) if (!pairMatchIsRight(ex, k, matches[k])) delete matches[k];
  const right = ex.pairs.filter((p) => pairMatchIsRight(ex, p.id, matches[p.id])).length;
  if (right + 1 > ex.pairs.length - 2) return null;
  const pair = ex.pairs.find((p) => !pairMatchIsRight(ex, p.id, matches[p.id]));
  if (!pair) return null;
  const taken = new Set(Object.values(matches));
  const card = ex.pairs.find((p) => !taken.has(p.id) && pairMatchIsRight(ex, pair.id, p.id));
  if (!card) return null;
  matches[pair.id] = card.id;
  return {
    response: { kind: 'matchPairs', matches },
    memory: m,
    line: `"${pair.left}" goes with "${pair.right}".`,
  };
}

function sortHint(ex: SortGroupsExercise, r: ExerciseResponse | null, m: HintMemory): Hint | null {
  const placed = r?.kind === 'sortGroups' ? { ...r.placed } : {};
  const right = ex.items.filter((it) => placed[it.id] === it.groupId).length;
  if (right + 1 > ex.items.length - 2) return null;
  const item = ex.items.find((it) => placed[it.id] !== it.groupId);
  if (!item) return null;
  placed[item.id] = item.groupId;
  const label = ex.groups.find((g) => g.id === item.groupId)?.label ?? 'its group';
  return {
    response: { kind: 'sortGroups', placed },
    memory: m,
    line: `"${item.text}" belongs in ${label}.`,
  };
}

function typeHint(ex: TypeAnswerExercise, m: HintMemory): Hint | null {
  const answer = ex.answers[0] ?? '';
  if (!answer.trim() || m.clues >= 2) return null;
  if (m.clues === 0) {
    return {
      response: { kind: 'typeAnswer', text: firstLetters(answer) },
      memory: { ...m, clues: 1 },
      line: `It starts with "${firstLetters(answer)}". ${answer.trim().length} letters in all.`,
    };
  }
  // Second clue: half the word.
  const shown = answer.trim().slice(0, Math.max(2, Math.ceil(answer.trim().length / 2)));
  if (shown.length >= answer.trim().length) return null;
  return {
    response: { kind: 'typeAnswer', text: shown },
    memory: { ...m, clues: 2 },
    line: `Nearly there: "${shown}..."`,
  };
}

/** The next hint for this question, or null when there's nothing fair left to give. */
export function nextHint(ex: Exercise, response: ExerciseResponse | null | undefined, m: HintMemory = NO_HINTS): Hint | null {
  const r = response ?? null;
  switch (ex.kind) {
    case 'mcq':
      return mcqHint(ex, r, m);
    case 'findBug':
      return findBugHint(ex, r, m);
    case 'fillBlank':
      return fillBlankHint(ex, r, m);
    case 'orderLines':
      return orderHint(ex, r, m);
    case 'tapBuild':
      return tapBuildHint(ex, r, m);
    case 'matchPairs':
      return matchHint(ex, r, m);
    case 'sortGroups':
      return sortHint(ex, r, m);
    case 'typeAnswer':
      return typeHint(ex, m);
    case 'writeCode':
      // Write and run has its own hint and solution flow.
      return ex.hint && m.clues === 0 ? { memory: { ...m, clues: 1 }, line: ex.hint } : null;
  }
}
