/**
 * Tey's voice inside the lesson player — the lines that fire as a learner
 * moves Learn → Apply → Reflect → Deepen, plus the reactions to a run of
 * correct answers and to getting one wrong.
 *
 * Two rules carried over from the other voice files, both load-bearing:
 *
 * 1. Lines reference the real thing that just happened (which phase, how many
 *    in a row, whether they actually finished the video) — never a generic
 *    "keep going!". Same standard as `analyticsVoice.ts`.
 *
 * 2. Tey teases the task, never the learner. The wrong-answer pool in
 *    particular is the one place in the lesson where someone is most likely to
 *    quit, so those lines reassure and point forward. Nothing in here calls
 *    the learner slow, wrong, or bad at this.
 *    Tone reference: `backend/src/tey/ai/tey-personality.ts`.
 *
 * Tey speaks at moments and then gets out of the way — he is not a persistent
 * narrator. `tey-personality.ts` is explicit that nagging kills the character:
 * say the dramatic thing once, then stop.
 */

import { pickFromPool } from './pool';

// ─── Phase unlocks ──────────────────────────────────────────────────────────

const INTO_APPLY = [
  "Alright, you got through it. Let's see what actually stuck 👀",
  'Reading is the easy part. Now you try.',
  "Theory's done. Prove it.",
];

const INTO_APPLY_AFTER_VIDEO = [
  'You watched the whole thing. Respect. Now the hard bit.',
  'Full video, no skipping. Okay. Questions time.',
];

const INTO_REFLECT = [
  "Questions done. Now the part that actually makes it stick.",
  "Nice. Slow down for a second — what did you just learn?",
];

function intoReflectPerfect(total: number): string[] {
  return [
    `${total} for ${total}. I'm updating my notes on you.`,
    `Perfect run — ${total} out of ${total}. Show-off.`,
  ];
}

const INTO_DEEPEN = [
  "This next part is the one most people skip. Not you though. Right? ...Right?",
  "Reflection done. Everything past here is bonus — the good kind.",
  "You could stop here. I wouldn't, but you could.",
];

/**
 * @param phase        the phase being unlocked
 * @param watchedVideo whether the Learn phase actually had a video they finished
 * @param perfectRun   correct-answer count when they cleared Apply without a miss
 */
export function pickPhaseUnlockLine(
  phase: 'apply' | 'reflect' | 'deepen',
  opts: { watchedVideo?: boolean; perfectRun?: number } = {}
): string {
  if (phase === 'apply') {
    return opts.watchedVideo
      ? pickFromPool(INTO_APPLY_AFTER_VIDEO, 'lesson:unlock:apply:video')
      : pickFromPool(INTO_APPLY, 'lesson:unlock:apply');
  }
  if (phase === 'reflect') {
    return opts.perfectRun && opts.perfectRun >= 2
      ? pickFromPool(intoReflectPerfect(opts.perfectRun), 'lesson:unlock:reflect:perfect')
      : pickFromPool(INTO_REFLECT, 'lesson:unlock:reflect');
  }
  return pickFromPool(INTO_DEEPEN, 'lesson:unlock:deepen');
}

// ─── Apply reactions ────────────────────────────────────────────────────────

function comboLines(combo: number): string[] {
  return [
    `${combo} in a row. I'm watching this closely.`,
    `${combo} straight. Okay, you've clearly done the reading.`,
    `That's ${combo}. Don't get cocky.`,
  ];
}

/** Fires on a run of consecutive correct answers (3+). */
export function pickComboLine(combo: number): string {
  return pickFromPool(comboLines(combo), 'lesson:combo');
}

/**
 * A wrong answer. Reassures and points forward — never mocks.
 * A broken run gets its own pool so losing a streak isn't silently the same
 * as a first-try miss.
 */
const WRONG_FIRST = [
  "Not it — but you're circling the right idea. Go again.",
  "Nope. Read it once more, you'll see it.",
  "Close. Try the other one.",
];

function wrongAfterStreak(brokenStreak: number): string[] {
  return [
    `And there goes the ${brokenStreak}-run. Shake it off.`,
    `${brokenStreak} in a row, then that. Happens. Go again.`,
  ];
}

export function pickWrongAnswerLine(brokenStreak = 0): string {
  return brokenStreak >= 3
    ? pickFromPool(wrongAfterStreak(brokenStreak), 'lesson:wrong:streak')
    : pickFromPool(WRONG_FIRST, 'lesson:wrong');
}

// ─── Gating ─────────────────────────────────────────────────────────────────

const CONTINUE_UNLOCKED = [
  "Done. The next bit's open.",
  "That's the whole thing. Go on then.",
  'Unlocked. Off you go.',
];

/** Fires when a gated primary button becomes available. */
export function pickUnlockedButtonLine(): string {
  return pickFromPool(CONTINUE_UNLOCKED, 'lesson:button-unlocked');
}

// ─── Start-screen welcome ───────────────────────────────────────────────────

// Two-line beats, same mechanism as `whatsappVoice.ts`'s `pickVariant`: a
// short reaction, then the nudge into starting — picked as one atomic unit
// so a variant never mixes lines from a different one. LINE_SEP must be a
// character that never appears in the copy itself — U+2028 (line separator),
// built via fromCharCode rather than typed literally so it can't silently
// collapse to an ordinary space in an editor/copy-paste — or `.split()`
// breaks on every natural space in the text too, turning each WORD into its
// own array element (and therefore its own <p> in SpeechBubble, one word per
// line). That exact bug shipped here once; caught by screenshotting the
// rendered bubble, not by reading the code.
const LINE_SEP = String.fromCharCode(8232);

const WELCOME_FRESH_VARIANTS: string[][] = [
  ["New lesson, clean slate.", "Take your time — I'm not going anywhere."],
  ["This one's yours whenever you're ready.", "No rush. Start when it feels right."],
  ["Fresh one, just for you.", "Let's see what we've got."],
];

const WELCOME_REVIEW_VARIANTS: string[][] = [
  ["Back for another round?", "Let's see if it stuck."],
  ["You've done this one before.", "Let's find out how well."],
  ["Round two.", "No pressure — you already know this."],
];

function pickVariant(variants: string[][], key: string): string[] {
  const pool = variants.map((v) => v.join(LINE_SEP));
  return pickFromPool(pool, key).split(LINE_SEP);
}

/** Fires once when the pre-lesson start screen loads. */
export function pickLessonWelcomeLines(opts: { isReviewMode?: boolean } = {}): string[] {
  return opts.isReviewMode
    ? pickVariant(WELCOME_REVIEW_VARIANTS, 'lesson:welcome:review')
    : pickVariant(WELCOME_FRESH_VARIANTS, 'lesson:welcome:fresh');
}

// ─── Map node unlock ────────────────────────────────────────────────────────

const NODE_UNLOCK_FIRST = [
  "First one's unlocked. Let's go. 🚀",
  "Right, the path's open. Off we go.",
];

const NODE_UNLOCK_MID = [
  "Next one's open. Keep the run going.",
  "Unlocked. Whenever you're ready.",
  "Onward — the next one's waiting.",
];

const NODE_UNLOCK_FINAL = [
  "Last one. Let's finish this properly.",
  "Final stretch. Make it count.",
];

/** Fires when a lesson node on the section map unlocks. */
export function pickNodeUnlockLine(kind: 'first' | 'mid' | 'final'): string {
  if (kind === 'first') return pickFromPool(NODE_UNLOCK_FIRST, 'lesson:node-unlock:first');
  if (kind === 'final') return pickFromPool(NODE_UNLOCK_FINAL, 'lesson:node-unlock:final');
  return pickFromPool(NODE_UNLOCK_MID, 'lesson:node-unlock:mid');
}
