import { phaseStateFromBlocks } from '../lesson/lesson-blocks.util';
import { CHECKPOINT_EVERY } from './originals.policy';
import type {
  AuthoredCard,
  AuthoredCardKind,
  OriginalLesson,
  OriginalLevel,
  OriginalTrackDef,
  OriginalUnit,
} from './originals-authoring.types';
import { buildContentBlocks, keys } from './originals-content';

/**
 * Checks a written Original against docs/ORIGINALS_PLAYBOOK.md before it can
 * be loaded.
 *
 *   error    the loader refuses to write: it would break a lesson, a rule
 *            the product depends on (checkpoint positions, the free-lesson
 *            paywall), or a brand hard stop (emoji, "gems").
 *   warning  a playbook target missed (lesson length, exercise mix, format
 *            variety). Loads, but the quality checklist isn't met yet.
 */

export interface LintIssue {
  level: 'error' | 'warning';
  where: string;
  message: string;
}

const EMOJI = /\p{Extended_Pictographic}/u;
const GEMS = /\bgems?\b/i;
const STALE_OPENER = /in this lesson,? (you will|you'll|we will|we'll) learn/i;

/** Formats that don't count as a lesson's "main" teaching format. */
const SUPPORTING: AuthoredCardKind[] = ['callout', 'check', 'image', 'code', 'tryIt'];

/** The format a lesson mainly teaches in: its first non-supporting card, else "cards". */
export function mainFormat(lesson: OriginalLesson): string {
  const first = lesson.learn.find((c) => !SUPPORTING.includes(c.kind));
  if (!first) return 'cards';
  // Plain explanation cards are the classic card deck.
  return first.kind === 'text' ? 'cards' : first.kind;
}

/** All learner-visible strings in a lesson, for the brand checks. */
function visibleText(lesson: OriginalLesson): string[] {
  const out: string[] = [lesson.title, lesson.summary, ...lesson.outcomes, lesson.reflect.prompt, ...(lesson.reflect.starters ?? [])];
  const walk = (v: unknown) => {
    if (typeof v === 'string') out.push(v);
    else if (Array.isArray(v)) v.forEach(walk);
    else if (v && typeof v === 'object') Object.values(v).forEach(walk);
  };
  walk(lesson.learn);
  walk(lesson.apply);
  if (lesson.deepen) walk(lesson.deepen);
  return out;
}

function lintLesson(
  track: OriginalTrackDef,
  level: OriginalLevel,
  unit: OriginalUnit,
  lesson: OriginalLesson,
  position: number,
  push: (level: LintIssue['level'], message: string) => void,
) {
  // ── Server rules: the same checks publishing runs ──────────────────────
  const blocks = buildContentBlocks(lesson, keys.lesson(track, level, unit, lesson), track.runner);
  const state = phaseStateFromBlocks(blocks);
  for (const e of [...(state.learn?.errors ?? []), ...(state.apply?.errors ?? [])]) push('error', e);

  // Things the server parser would silently accept but are authoring mistakes.
  for (const ex of lesson.apply.items) {
    if ((ex.kind === 'mcq' || ex.kind === 'chatReply') && !ex.options[ex.answer]) push('error', `"${ex.prompt}": answer index ${ex.answer} has no option.`);
    if (ex.kind === 'findBug' && !ex.lines[ex.bug]) push('error', `"${ex.prompt}": bug index ${ex.bug} has no line.`);
    if (ex.kind === 'sortGroups' && ex.items.some((it) => !ex.groups[it.group])) push('error', `"${ex.prompt}": an item points at a group that doesn't exist.`);
    // Two cards with the same text look identical, so the matching is ambiguous.
    if (ex.kind === 'matchPairs') {
      for (const side of [0, 1] as const) {
        const texts = ex.pairs.map((p) => p[side].trim().toLowerCase());
        if (new Set(texts).size !== texts.length) push('error', `"${ex.prompt}": two ${side ? 'right' : 'left'}-hand cards say the same thing.`);
      }
    }
    // The player ignores case and punctuation (blocks.ts normalizeTyped), so
    // an answer made only of symbols, like "[?]", can never be typed right.
    if (ex.kind === 'typeAnswer' && ex.answers.some((a) => !/[\p{L}\p{N}]/u.test(a))) {
      push('error', `"${ex.prompt}": an accepted answer has no letters or digits, so it can never match.`);
    }
  }
  for (const c of lesson.learn) {
    if (c.kind === 'check' && !c.options[c.answer]) push('error', `Quick check "${c.question}": answer index ${c.answer} has no option.`);
    // Prompt Lab: picking exactly the goal reply's parts must bring the goal
    // back (the player picks the most specific reply, ties to the first), and
    // the bare prompt must not already finish it.
    if (c.kind === 'promptLab' && c.replies[c.goal]) {
      const replyFor = (picked: Set<number>) => {
        let best = -1;
        c.replies.forEach((r, i) => {
          if (r.uses.every((u) => picked.has(u)) && (best < 0 || r.uses.length > c.replies[best].uses.length)) best = i;
        });
        return best;
      };
      if (replyFor(new Set(c.replies[c.goal].uses)) !== c.goal) push('error', `Prompt Lab "${c.task}": the goal reply can never come back.`);
      if (c.replies[c.goal].uses.length === 0) push('error', `Prompt Lab "${c.task}": the bare prompt already reaches the goal.`);
    }
  }

  // ── Structure ───────────────────────────────────────────────────────────
  if (lesson.title.length > 100) push('error', 'Title is over 100 characters.');
  if (lesson.summary.length > 300) push('error', 'Summary is over 300 characters.');
  if (lesson.outcomes.length < 2 || lesson.outcomes.length > 5) push('error', 'Write 2 to 5 outcomes.');
  if (!lesson.reflect.prompt.trim()) push('error', 'Reflect needs a prompt.');

  const isCheckpointSlot = position % CHECKPOINT_EVERY === 0;
  if (isCheckpointSlot && !lesson.milestone) push('error', `Lesson ${position} must be a Checkpoint (every ${CHECKPOINT_EVERY}th lesson is).`);
  if (!isCheckpointSlot && lesson.milestone) push('error', `Only every ${CHECKPOINT_EVERY}th lesson is a Checkpoint; lesson ${position} isn't.`);

  // ── Playbook targets ────────────────────────────────────────────────────
  if (lesson.minutes < 10 || lesson.minutes > 15) push('warning', `${lesson.minutes} minutes; lessons should take 10–15.`);

  const n = lesson.apply.items.length;
  // Founder 2026-10-14: 10 exercises is enough; up to 20 (30 in a Checkpoint) is the ceiling.
  const [min, max] = lesson.milestone ? [10, 30] : [10, 20];
  if (n < min || n > max) push('warning', `${n} exercises; aim for ${min}–${max}${lesson.milestone ? ' in a Checkpoint' : ''}.`);

  const kinds = lesson.apply.items.map((e) => e.kind);
  const distinct = new Set(kinds).size;
  if (distinct < 4) push('warning', `Only ${distinct} exercise type(s); use at least 4.`);
  for (let i = 2; i < kinds.length; i++) {
    if (kinds[i] === kinds[i - 1] && kinds[i] === kinds[i - 2]) {
      push('warning', `Three "${kinds[i]}" exercises in a row (#${i - 1}–#${i + 1}).`);
      break;
    }
  }

  if (lesson.learn.length === 0 && !lesson.milestone) push('error', 'Learn has no cards.');

  // Playbook §7: every coding lesson has real code to run, from lesson 1.
  if (track.category === 'Coding') {
    const runs = lesson.learn.some((c) => c.kind === 'tryIt') || lesson.apply.items.some((e) => e.kind === 'writeCode');
    if (!runs) push('warning', 'A coding lesson with no Try it live card and no Write and run exercise.');
    if (!lesson.milestone && !lesson.apply.items.some((e) => e.kind === 'writeCode')) {
      push('warning', 'No Write and run exercise: learners should write some code in every lesson.');
    }
  }

  // ── Brand hard stops ────────────────────────────────────────────────────
  const text = visibleText(lesson);
  if (text.some((t) => EMOJI.test(t))) push('error', 'Contains an emoji. Use the lesson engine\'s icons and callouts instead.');
  if (text.some((t) => GEMS.test(t))) push('error', 'Says "gems". The currency is always "Coins".');
  if (text.some((t) => STALE_OPENER.test(t))) push('warning', 'Opens with "In this lesson you will learn". Open on a hook instead.');
}

function lintUnit(
  track: OriginalTrackDef,
  level: OriginalLevel,
  unit: OriginalUnit,
  issues: LintIssue[],
) {
  const where = `${track.slug} L${level.level} ${unit.key}`;
  // Short courses (track.format === 'short') have 10-lesson units.
  const unitTarget = track.format === 'short' ? 10 : 20;
  const at = (lesson?: OriginalLesson) => (lesson ? `${where} ${lesson.key} "${lesson.title}"` : where);

  // Playbook §8a: every unit is a story chapter, shown on the map banner.
  if (!unit.story || !unit.marker) {
    issues.push({ level: 'warning', where, message: 'No story line or marker: every unit is a chapter of the level\'s story (playbook §8a).' });
  }
  if (unit.marker && unit.marker.length > 24) issues.push({ level: 'warning', where, message: 'Marker is over 24 characters; it has to fit the map banner.' });
  if (unit.story && unit.story.length > 140) issues.push({ level: 'warning', where, message: 'Story line is over 140 characters; keep it to one line on the map.' });

  if (unit.lessons.length < unitTarget) {
    issues.push({ level: 'warning', where, message: `${unit.lessons.length} lessons; a full unit has ${unitTarget} or more.` });
  }

  const seen = new Set<string>();
  unit.lessons.forEach((lesson, i) => {
    if (seen.has(lesson.key)) issues.push({ level: 'error', where: at(lesson), message: `Duplicate lesson key "${lesson.key}".` });
    seen.add(lesson.key);
    lintLesson(track, level, unit, lesson, i + 1, (lvl, message) => issues.push({ level: lvl, where: at(lesson), message }));
  });

  // The unit's last checkpoint is its Unit Challenge; every other one is a plain Checkpoint.
  const milestones = unit.lessons.filter((l) => l.milestone);
  milestones.forEach((l, i) => {
    const last = i === milestones.length - 1;
    const isComplete = unit.lessons.length >= unitTarget;
    if (last && isComplete && l.milestone !== 'UNIT_CHALLENGE') {
      issues.push({ level: 'error', where: at(l), message: "A unit's last Checkpoint is its Unit Challenge." });
    }
    if (!last && l.milestone === 'UNIT_CHALLENGE') {
      issues.push({ level: 'error', where: at(l), message: 'Only the unit\'s last Checkpoint is the Unit Challenge.' });
    }
  });

  // Format variety: no two lessons in a row with the same main format; at least 4 per unit.
  const teaching = unit.lessons.filter((l) => !l.milestone);
  for (let i = 1; i < teaching.length; i++) {
    const a = mainFormat(teaching[i - 1]);
    const b = mainFormat(teaching[i]);
    if (a === b) {
      issues.push({ level: 'warning', where: at(teaching[i]), message: `Same main Learn format ("${b}") as the lesson before it.` });
    }
  }
  const formats = new Set(teaching.map(mainFormat));
  if (teaching.length >= 4 && formats.size < 4) {
    issues.push({ level: 'warning', where, message: `Only ${formats.size} Learn format(s) across the unit; use at least 4.` });
  }
}

/** Every issue in a Track, errors first. */
export function lintTrack(track: OriginalTrackDef): LintIssue[] {
  const issues: LintIssue[] = [];
  const levels = new Set<number>();
  for (const level of track.levels) {
    const where = `${track.slug} L${level.level}`;
    if (levels.has(level.level)) issues.push({ level: 'error', where, message: `Level ${level.level} appears twice.` });
    levels.add(level.level);
    if (level.units.length === 0) issues.push({ level: 'warning', where, message: 'No units written yet: nothing to load for this level.' });
    const planned = level.units.length + level.upcomingUnits;
    if (track.format === 'short' ? planned < 5 : planned < 10) {
      const target = track.format === 'short' ? 'a short course has 5' : 'a full level has 10–15';
      issues.push({ level: 'warning', where, message: `${planned} units planned; ${target}.` });
    }
    // Lessons 1–5 are the free stretch; lesson 5 must be the first Checkpoint.
    const firstUnit = level.units[0];
    if (level.level === 1 && firstUnit && firstUnit.lessons.length < 5) {
      issues.push({ level: 'warning', where, message: 'Fewer than 5 lessons: the free stretch (lessons 1–5) isn\'t complete yet.' });
    }
    const unitKeys = new Set<string>();
    for (const unit of level.units) {
      if (unitKeys.has(unit.key)) issues.push({ level: 'error', where, message: `Duplicate unit key "${unit.key}".` });
      unitKeys.add(unit.key);
      lintUnit(track, level, unit, issues);
    }
  }
  return issues.sort((a, b) => (a.level === b.level ? 0 : a.level === 'error' ? -1 : 1));
}

/** Learn card kinds in a lesson, for reports. */
export function formatsUsed(cards: AuthoredCard[]): string[] {
  return Array.from(new Set(cards.map((c) => c.kind)));
}
