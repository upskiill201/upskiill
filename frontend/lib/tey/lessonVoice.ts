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
 *
 * Every pool here has at least 3 members. `pickFromPool` excludes the last
 * two distinct picks per key, so a 2-line pool degrades to "either one, no
 * memory" — three is the floor for the dedupe to actually do anything.
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
  "You made it to the end. Let's see if it landed.",
];

const INTO_REFLECT = [
  "Questions done. Now the part that actually makes it stick.",
  "Nice. Slow down for a second — what did you just learn?",
  "Quiz's over. This next bit is where it actually sinks in.",
];

function intoReflectPerfect(total: number): string[] {
  return [
    `${total} for ${total}. I'm updating my notes on you.`,
    `Perfect run — ${total} out of ${total}. Show-off.`,
    `Not one miss. ${total} out of ${total}. Noted.`,
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
    `Streak's broken at ${brokenStreak}. Doesn't erase it — go again.`,
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
  ["Alright, next one up.", "Same deal as always — go at your pace."],
];

const WELCOME_REVIEW_VARIANTS: string[][] = [
  ["Back for another round?", "Let's see if it stuck."],
  ["You've done this one before.", "Let's find out how well."],
  ["Round two.", "No pressure — you already know this."],
  ["Revisiting this one, huh.", "Good instinct. Let's go again."],
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

// ─── Map: progress acknowledgment ("you're doing well") ────────────────────
//
// Fires the instant the learner lands back on the section map, BEFORE the
// anticipation glow/reveal sequence even starts — this is deliberately the
// first thing Tey says, separate from (and earlier than) the "here's what's
// next" unlock line below. It answers "how am I doing," not "what's new" —
// the two together are the two-beat narrative: acknowledge the effort, then
// reveal the reward. Framed by real progress meaning, not a bare number.

function progressLines(completed: number, total: number): string[] {
  const fraction = total > 0 ? completed / total : 0;
  const remaining = total - completed;

  if (completed >= total && total > 0) {
    return [
      `That's every lesson in this section. All ${total} of them.`,
      `Section cleared — all ${total} lessons. Look at that.`,
      `${total} for ${total} in this section. Done and done.`,
    ];
  }
  if (fraction >= 0.66) {
    return [
      `${completed} of ${total} now — just ${remaining} left to close this section out.`,
      `That's ${completed} of ${total}. You're basically through it.`,
      `${remaining} to go and this section's finished. You're close.`,
    ];
  }
  if (fraction >= 0.34) {
    return [
      `${completed} of ${total} — you're properly into this section now.`,
      `That's ${completed} down, ${remaining} to go. Good pace.`,
      `Halfway-ish. ${completed} of ${total} lessons done.`,
    ];
  }
  return [
    `Lesson done — that's ${completed} of ${total} in this section.`,
    `${completed} of ${total} now. Good start.`,
    `That's one more in the bank. ${completed} of ${total} so far.`,
  ];
}

/**
 * @param completed lessons completed in this section so far (post-completion count)
 * @param total     lessons in this section
 */
export function pickLessonProgressLine(completed: number, total: number): string {
  const bucket =
    total > 0 && completed >= total
      ? 'done'
      : total > 0 && completed / total >= 0.66
        ? 'late'
        : total > 0 && completed / total >= 0.34
          ? 'mid'
          : 'early';
  return pickFromPool(progressLines(completed, total), `lesson:progress:${bucket}`);
}

// ─── Map node unlock ────────────────────────────────────────────────────────

const NODE_UNLOCK_FIRST = [
  "First one's unlocked. Let's go. 🚀",
  "Right, the path's open. Off we go.",
  "There it is. First lesson's live.",
];

const NODE_UNLOCK_MID = [
  "Next one's open. Keep the run going.",
  "Unlocked. Whenever you're ready.",
  "Onward — the next one's waiting.",
];

const NODE_UNLOCK_FINAL = [
  "Last one. Let's finish this properly.",
  "Final stretch. Make it count.",
  "The last lesson in this section just opened up.",
];

/** Fires when a lesson node on the section map unlocks (the reveal peak — the
 *  second beat, after pickLessonProgressLine has already acknowledged the
 *  effort). */
export function pickNodeUnlockLine(kind: 'first' | 'mid' | 'final'): string {
  if (kind === 'first') return pickFromPool(NODE_UNLOCK_FIRST, 'lesson:node-unlock:first');
  if (kind === 'final') return pickFromPool(NODE_UNLOCK_FINAL, 'lesson:node-unlock:final');
  return pickFromPool(NODE_UNLOCK_MID, 'lesson:node-unlock:mid');
}

// A lesson the learner has actually reached in sequence, but that sits behind
// the paywall — celebrating an "unlock" here would be theater over a door
// that's still shut. This is the honest version: acknowledges it's reached,
// points at what actually opens it, without faking a payoff.
const READY_TO_UNLOCK = [
  "That one's reached — just needs unlocking to open.",
  "You're there. That lesson's just behind the subscription.",
  "Next one's ready and waiting — unlock the course to get in.",
];

/** Fires when the reveal-peak node is sequence-reached but still paywalled. */
export function pickLessonReadyToUnlockLine(): string {
  return pickFromPool(READY_TO_UNLOCK, 'lesson:node-unlock:paywalled');
}
