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
 * Deterministic from the lesson's position, so a rewrite of the same lesson
 * keeps its personality and a section always reads as a ramp.
 */

import type { ImportTrack } from './rich-lesson';

export type LessonFlavor =
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
  /** Exercise kinds in order, e.g. "mcq", "findBug", "mcq (predictOutput)". */
  exercisePlan: string[];
  keyIdeas: { min: number; max: number };
  layout: LearnLayout;
  /** Tone and framing for the writer, one short paragraph. */
  brief: string;
  /** The callout tone that suits this lesson best. */
  tipTone: 'tip' | 'warning' | 'remember';
}

/** Fewest exercises (the warm-up) and most (the finale). Capped by
 *  COURSE_IMPORT_MAX_EXERCISES: more exercises means a longer answer, and
 *  the free AI tier's per-request window is the limit. */
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
// a plain scenario question for anything else.
const PLANS: Record<LessonFlavor, string[]> = {
  warmup: ['mcq', 'matchPairs', 'mcq', 'fillBlank', 'mcq', 'orderLines'],
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
  warmup: 'classic',
  story: 'classic',
  detective: 'checkEarly',
  builder: 'codeFirst',
  mythbuster: 'tipFirst',
  speed: 'checkEarly',
  boss: 'classic',
};

const TIP_TONES: Record<LessonFlavor, LessonDesign['tipTone']> = {
  warmup: 'tip',
  story: 'remember',
  detective: 'warning',
  builder: 'tip',
  mythbuster: 'warning',
  speed: 'remember',
  boss: 'tip',
};

const BRIEFS: Record<LessonFlavor, string> = {
  warmup:
    'WARM-UP lesson, the first of its section. Make the learner feel instantly capable: friendly, encouraging, very clear. Few key ideas, short ones. Easy exercises with obvious-once-you-know answers. No trick questions.',
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
  boss: 'SECTION FINALE ("boss" lesson), the last of its section. The most challenging and varied practice in the section: harder questions that make the learner apply what they learned, not just recall it. Celebratory, "you made it" energy in the summary and reflection.',
};

/**
 * The design for one lesson.
 * @param index 0-based position of the lesson in its section.
 * @param count lessons in the section.
 * @param moduleIndex 0-based section position: offsets the rotation so
 *   every section doesn't start its middle lessons the same way.
 */
export function lessonDesign(
  rawIndex: number,
  rawCount: number,
  rawModuleIndex: number,
  track: ImportTrack,
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
    ? 'warmup'
    : isLast
      ? 'boss'
      : ROTATION[(index - 1 + moduleIndex * 2) % ROTATION.length];

  // Position 0..1 through the section drives how much is asked.
  const progress = count <= 1 ? 0.5 : index / (count - 1);
  const max = maxExercises();
  // The warm-up is always the gentlest, even in a one-lesson section.
  const target = isFirst
    ? MIN_EXERCISES
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

  const keyIdeas =
    flavor === 'speed'
      ? { min: 2, max: 3 }
      : isFirst
        ? { min: 2, max: 3 }
        : flavor === 'boss' || difficulty === 'hard'
          ? { min: 3, max: 5 }
          : { min: 2, max: 4 };

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
