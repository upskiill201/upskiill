/**
 * Every imported lesson gets its own shape and feel.
 *
 * Before this, every lesson came out the same: ~7 cards, 8 exercises in a
 * fixed order. That's a worksheet, not a game. Now each lesson in a section
 * is designed from where it sits:
 *
 *   - Difficulty ramps through the section: the first lesson is a gentle
 *     warm-up with a few easy exercises; each next one asks a little more;
 *     the last is the section finale ("boss" lesson), the hardest and most
 *     varied.
 *   - In between, lessons rotate through personalities (a story, a
 *     detective case, myth-busting, building it step by step, a speed
 *     round), so no two lessons in a row feel alike.
 *   - The personality shapes the tone the writer uses, which exercise kinds
 *     lead, how many key ideas there are, and the order of the Learn cards.
 *
 * The plan is a CEILING, not a quota (2026-10-15): the writer reads the
 * transcript, lists what it actually teaches, and writes one exercise per
 * point, up to the plan's length. A welcome video or a course outro can get
 * no Apply step at all; a dense hands-on lesson gets the full plan.
 *
 * The very first lesson of the course ('welcome') is the learner's first
 * impression: shortest, easiest, no code puzzles. The first lesson of every
 * other section ('warmup') is the next gentlest.
 *
 * Deterministic from the lesson's position, so a rewrite of the same lesson
 * keeps its personality and a section always reads as a ramp.
 */

import type { ImportTrack } from './rich-lesson';

export type LessonFlavor =
  | 'welcome'
  | 'warmup'
  | 'story'
  | 'detective'
  | 'builder'
  | 'mythbuster'
  | 'speed'
  | 'boss';

export type LearnLayout =
  /** video, key ideas (+code), images, tip, quick check */
  | 'classic'
  /** video, quick check ("what did you catch?"), key ideas, tip */
  | 'checkEarly'
  /** video, tip up front (the warning/myth), key ideas, check */
  | 'tipFirst'
  /** video, code first, then the ideas that explain it, tip, check */
  | 'codeFirst';

export interface LessonDesign {
  flavor: LessonFlavor;
  difficulty: 'easy' | 'medium' | 'hard';
  /** Exercise kinds in order, e.g. "mcq", "findBug", "mcq (predictOutput)".
   *  Its length is the MOST this lesson may get; the writer decides how many
   *  the transcript deserves (see richSystemPrompt). */
  exercisePlan: string[];
  keyIdeas: { min: number; max: number };
  layout: LearnLayout;
  /** Tone and framing for the writer, one short paragraph. */
  brief: string;
  /** The callout tone that suits this lesson best. */
  tipTone: 'tip' | 'warning' | 'remember';
}

/** The ceiling for the course's first lesson, a section's first lesson, and
 *  the lowest ceiling of a middle lesson; the finale's is the max. Capped by
 *  COURSE_IMPORT_MAX_EXERCISES: more exercises means a longer answer, and
 *  the free AI tier's per-request window is the limit. */
const WELCOME_EXERCISES = 3;
const WARMUP_EXERCISES = 4;
const MIN_EXERCISES = 5;
const DEFAULT_MAX_EXERCISES = 8;

function maxExercises(): number {
  const n = Number(process.env.COURSE_IMPORT_MAX_EXERCISES);
  return Number.isFinite(n) && n >= MIN_EXERCISES
    ? Math.min(Math.floor(n), 12)
    : DEFAULT_MAX_EXERCISES;
}

/** The rotation between the warm-up and the finale: adjacent lessons never
 *  share a personality. */
const ROTATION: LessonFlavor[] = [
  'story',
  'detective',
  'builder',
  'mythbuster',
  'speed',
];

// "X" marks the track's own variant: predictOutput (Coding), pickPrompt (AI),
// a plain scenario question for anything else. The openers stick to the
// friendliest kinds: no spot-the-mistake, no ordering puzzles.
const PLANS: Record<LessonFlavor, string[]> = {
  welcome: ['mcq', 'matchPairs', 'mcq'],
  warmup: ['mcq', 'matchPairs', 'fillBlank', 'mcq'],
  story: [
    'mcq',
    'fillBlank',
    'orderLines',
    'mcq X',
    'matchPairs',
    'mcq',
    'fillBlank',
    'findBug',
  ],
  detective: [
    'findBug',
    'mcq X',
    'findBug',
    'fillBlank',
    'orderLines',
    'findBug',
    'mcq',
    'matchPairs',
  ],
  builder: [
    'orderLines',
    'fillBlank',
    'orderLines',
    'mcq X',
    'fillBlank',
    'matchPairs',
    'findBug',
    'orderLines',
  ],
  mythbuster: [
    'mcq',
    'findBug',
    'mcq',
    'matchPairs',
    'mcq X',
    'fillBlank',
    'findBug',
    'orderLines',
  ],
  speed: [
    'mcq',
    'matchPairs',
    'mcq',
    'mcq X',
    'fillBlank',
    'matchPairs',
    'mcq',
    'mcq',
  ],
  boss: [
    'mcq X',
    'findBug',
    'orderLines',
    'fillBlank',
    'findBug',
    'matchPairs',
    'mcq X',
    'orderLines',
    'fillBlank',
    'findBug',
    'mcq',
    'matchPairs',
  ],
};

const LAYOUTS: Record<LessonFlavor, LearnLayout> = {
  welcome: 'classic',
  warmup: 'classic',
  story: 'classic',
  detective: 'checkEarly',
  builder: 'codeFirst',
  mythbuster: 'tipFirst',
  speed: 'checkEarly',
  boss: 'classic',
};

const TIP_TONES: Record<LessonFlavor, LessonDesign['tipTone']> = {
  welcome: 'tip',
  warmup: 'tip',
  story: 'remember',
  detective: 'warning',
  builder: 'tip',
  mythbuster: 'warning',
  speed: 'remember',
  boss: 'tip',
};

const BRIEFS: Record<LessonFlavor, string> = {
  welcome:
    "WELCOME lesson: the very FIRST lesson of the whole course, the learner's first impression of it. Its only job is to make them want lesson two. Warm and simple: what they'll be able to do by the end and why it matters, in plain words, assuming they know nothing yet. One or two short key ideas. If the lesson teaches something real, at most a few very easy questions anyone who watched can answer (an instant first win). If it's an introduction, a course tour or the author's story, write NO exercises. Never code puzzles, never jargon the lesson didn't explain.",
  warmup:
    'WARM-UP lesson, the first of its section. Ease the learner into the new topic: friendly, encouraging, very clear. Few key ideas, short ones. Only easy recall questions with obvious-once-you-know answers. No trick questions, no code puzzles. If it only introduces the section, no exercises at all is right.',
  story:
    'STORY lesson. Frame it around one relatable person or situation (a learner, a team, a real-world task) and let the key ideas unfold like a short story with a problem and a payoff. The practice "scenario" continues the same story.',
  detective:
    'DETECTIVE lesson. Frame it as a case to crack: something is broken or suspicious, and the key ideas are the clues. Lean on spotting mistakes ("Can you spot it?"). Curious, a little playful.',
  builder:
    'BUILDER lesson. Build something up piece by piece: each key idea adds one piece, and the practice assembles it (ordering steps, filling in the missing parts). Hands-on and satisfying.',
  mythbuster:
    'MYTH-BUSTER lesson. Each key idea busts a common misconception about the topic: head it "Myth: …" or "Truth: …". The tip is the most dangerous myth. Confident, surprising, a bit cheeky.',
  speed:
    'SPEED ROUND lesson. Short and punchy: few, tight key ideas, then rapid-fire quick questions and matching. Energetic, game-show feel. Every prompt short.',
  boss: 'SECTION FINALE ("boss" lesson), the last of its section. The most challenging and varied practice in the section: questions that make the learner apply what they learned, not just recall it, but always fair and clearly worded. Celebratory, "you made it" energy in the summary and reflection.',
};

/**
 * The design for one lesson.
 * @param index 0-based position of the lesson in its section.
 * @param count lessons in the section.
 * @param moduleIndex 0-based section position: offsets the rotation so
 *   every section doesn't start its middle lessons the same way.
 * @param opts.courseOpener the first lesson of the first section: the
 *   learner's first lesson of the whole course.
 */
export function lessonDesign(
  rawIndex: number,
  rawCount: number,
  rawModuleIndex: number,
  track: ImportTrack,
  opts: { courseOpener?: boolean } = {},
): LessonDesign {
  // Positions come from the database; never let a missing one break a lesson.
  const whole = (n: number, min: number) =>
    Number.isFinite(n) ? Math.max(min, Math.floor(n)) : min;
  const count = whole(rawCount, 1);
  const index = Math.min(whole(rawIndex, 0), count - 1);
  const moduleIndex = whole(rawModuleIndex, 0);
  const isFirst = index === 0;
  const isLast = count >= 3 && index === count - 1;
  const flavor: LessonFlavor = isFirst
    ? opts.courseOpener
      ? 'welcome'
      : 'warmup'
    : isLast
      ? 'boss'
      : ROTATION[(index - 1 + moduleIndex * 2) % ROTATION.length];

  // Position 0..1 through the section drives how much is asked.
  const progress = count <= 1 ? 0.5 : index / (count - 1);
  const max = maxExercises();
  // The openers are always the gentlest, even in a one-lesson section.
  const target = isFirst
    ? flavor === 'welcome'
      ? WELCOME_EXERCISES
      : WARMUP_EXERCISES
    : flavor === 'boss'
      ? max
      : Math.round(MIN_EXERCISES + progress * (max - MIN_EXERCISES));
  const difficulty: LessonDesign['difficulty'] = isFirst
    ? 'easy'
    : flavor === 'boss' || progress >= 0.67
      ? 'hard'
      : 'medium';

  const variant =
    track === 'Coding'
      ? 'mcq (predictOutput)'
      : track === 'AI'
        ? 'mcq (pickPrompt)'
        : 'mcq';
  const plan = PLANS[flavor];
  const exercisePlan = Array.from(
    { length: target },
    (_, i) => plan[i % plan.length],
  ).map((k) => (k === 'mcq X' ? variant : k));

  // A video or audio lesson already carries its teaching: the cards only
  // need the ideas worth keeping, so a light lesson may have just one.
  const keyIdeas =
    flavor === 'welcome'
      ? { min: 1, max: 2 }
      : flavor === 'speed' || isFirst
        ? { min: 1, max: 3 }
        : flavor === 'boss' || difficulty === 'hard'
          ? { min: 2, max: 5 }
          : { min: 1, max: 4 };

  return {
    flavor,
    difficulty,
    exercisePlan,
    keyIdeas,
    layout: LAYOUTS[flavor],
    brief: BRIEFS[flavor],
    tipTone: TIP_TONES[flavor],
  };
}
