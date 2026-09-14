/**
 * Lesson Audio — the in-lesson feedback bank.
 *
 * Built on the same synthesis primitives as `celebrationAudio.ts` (see
 * `./synth`) so the sounds a learner hears *during* a lesson and the ones they
 * hear in the celebration scenes afterwards belong to one sonic world. Every
 * function is a silent no-op when audio is muted or SFX are disabled.
 *
 * ── The ladder ────────────────────────────────────────────────────────────
 * The single idea this file exists to serve: advancing a phase plays a note,
 * and that note climbs by one pentatonic degree each time.
 *
 *     Learn → Apply      C5
 *     Apply → Reflect    D5
 *     Reflect → Deepen   E5
 *     Deepen → finish    G5   ← resolves
 *
 * A learner never consciously notices this. After a few lessons their ear has
 * learned the sequence anyway, and the final note lands as "done" a full beat
 * before the celebration screen says so. That is the difference between a
 * sound playing and a step feeling unlocked — so if these four frequencies
 * ever need changing, change them together and keep them ascending.
 *
 * The same ladder shape is reused for the Apply combo (consecutive correct
 * answers climb it) so the association compounds instead of competing.
 */

import { PENTATONIC, getBus, scheduleNoise, scheduleSparkleDust, scheduleTone, shouldPlay } from './synth';
import { getComboTier } from '../lesson/comboTier';

/** The four phase-advance notes, in order. Indexed by `PHASE_ORDER`. */
const LADDER = [
  PENTATONIC[0], // C5  — into Apply
  PENTATONIC[1], // D5  — into Reflect
  PENTATONIC[2], // E5  — into Deepen
  PENTATONIC[3], // G5  — finishing the lesson
];

// ─── The three-beat phase unlock ────────────────────────────────────────────

/**
 * Beat 1 — the step behind you seals shut.
 * Low, short, woody. Deliberately not musical: it is punctuation, not melody,
 * so it never competes with the ladder note that follows it.
 */
export function playPhaseSeal() {
  const bus = getBus();
  if (!bus || !shouldPlay('phaseSeal')) return;
  scheduleTone(bus, { freq: 196, dur: 0.16, type: 'sine', gain: 0.16, slideTo: 130 });
  scheduleNoise(bus, { dur: 0.1, gain: 0.05, filterFrom: 900, filterTo: 400, q: 1.8 });
}

/**
 * Beat 2 — the progress line travels to the next step.
 * A rising filtered sweep. Its 0.34s duration is tuned to the CSS width
 * transition on the stepper's active line; if that timing changes, change this
 * too or the sound and the motion come apart.
 */
export function playPhaseTravel() {
  const bus = getBus();
  if (!bus || !shouldPlay('phaseTravel')) return;
  scheduleNoise(bus, { dur: 0.34, gain: 0.07, filterFrom: 600, filterTo: 3200, q: 1.5 });
}

/**
 * Beat 3 — the next step unlocks. This is the ladder note.
 *
 * @param stepIndex 0 = into Apply, 1 = into Reflect, 2 = into Deepen,
 *                  3 = finishing. Clamped, so an out-of-range call still
 *                  makes a sensible sound rather than throwing.
 */
export function playPhaseUnlock(stepIndex: number) {
  const bus = getBus();
  if (!bus || !shouldPlay(`phaseUnlock:${stepIndex}`)) return;

  const i = Math.max(0, Math.min(stepIndex, LADDER.length - 1));
  const freq = LADDER[i];
  const isFinal = i === LADDER.length - 1;

  // Mallet body + octave shimmer — the house "something good happened" texture.
  scheduleTone(bus, { freq, dur: 0.3, type: 'triangle', gain: 0.17 });
  scheduleTone(bus, { freq: freq * 2, at: 0.015, dur: 0.16, type: 'sine', gain: 0.06 });

  // The last rung resolves: a fifth above lands under it so the step reads as
  // an arrival rather than one more note in the sequence.
  if (isFinal) {
    scheduleTone(bus, { freq: freq * 1.5, at: 0.1, dur: 0.34, type: 'triangle', gain: 0.1 });
    scheduleTone(bus, { freq: freq / 2, at: 0.02, dur: 0.36, type: 'sine', gain: 0.08 });
  }
}

// ─── Apply feedback ─────────────────────────────────────────────────────────

// Tier 5 (combo 6+) rotates between two light variations so a long run
// doesn't play the exact same sound over and over. Module-level so the "last
// pick" persists across calls without threading state through the caller.
let lastTier5Variant = -1;
function pickTier5Variant(): 0 | 1 {
  const next = lastTier5Variant === 0 ? 1 : lastTier5Variant === 1 ? 0 : Math.round(Math.random());
  lastTier5Variant = next;
  return next as 0 | 1;
}

/**
 * A correct answer, pitched by how many you have got right in a row and
 * layered by tier (see `getComboTier` — 1 calm, 5 capped-but-varied).
 *
 * The old behaviour played one fixed arpeggio for every correct answer
 * forever, which is a fixed reinforcement schedule — it stops registering
 * fast. Climbing the ladder instead makes the fourth correct answer sound
 * different from the first, which is the whole point. Layering additional
 * harmony notes per tier (rather than just pitch) is what keeps tier 4-5
 * from just sounding "the same note, but higher."
 *
 * @param combo 1-based count of consecutive correct answers.
 */
export function playComboCorrect(combo: number) {
  const bus = getBus();
  if (!bus || !shouldPlay('comboCorrect')) return;

  const tier = getComboTier(combo);

  // Cap the climb so a long run never gets shrill — same clamp as before.
  const step = Math.max(0, Math.min(combo - 1, PENTATONIC.length - 1));
  const freq = PENTATONIC[step];

  // Tier 1: root + octave shimmer. The calm baseline, unchanged.
  const rootGain = tier >= 4 ? 0.18 : 0.16;
  scheduleTone(bus, { freq, dur: 0.2, type: 'triangle', gain: rootGain });
  scheduleTone(bus, { freq: freq * 2, at: 0.02, dur: 0.12, type: 'sine', gain: 0.055 });

  // Tier 2: a quiet high tail on top — "you're getting it," still subtle.
  if (tier === 2) {
    scheduleTone(bus, { freq: freq * 2.5, at: 0.05, dur: 0.1, type: 'sine', gain: 0.04 });
  }

  // Tier 3+: a third above turns the run itself audible, not just the answer.
  if (tier >= 3) {
    scheduleTone(bus, { freq: freq * 1.26, at: 0.07, dur: 0.2, type: 'triangle', gain: 0.09 });
  }

  // Tier 4+: add a fifth above for a fuller chord — "strong momentum."
  if (tier >= 4) {
    scheduleTone(bus, { freq: freq * 1.5, at: 0.09, dur: 0.22, type: 'triangle', gain: 0.08 });
  }

  // Tier 5: capped intensity, rotated texture so back-to-back answers on a
  // long run don't sound identical — alternates a sparkle tail on/off.
  if (tier === 5 && pickTier5Variant() === 0) {
    scheduleSparkleDust(bus, 0.12);
  }
}

/**
 * A wrong answer. Soft, brief, descending — and deliberately gentle.
 *
 * Psychological safety is what keeps someone attempting the next question, so
 * this must read as "not that one" rather than as a buzzer. It is quieter than
 * every correct-answer sound in this file, which is intentional: getting it
 * wrong should never be the loudest thing that happens.
 */
export function playAnswerWrong() {
  const bus = getBus();
  if (!bus || !shouldPlay('answerWrong')) return;
  scheduleTone(bus, { freq: 392, dur: 0.14, type: 'sine', gain: 0.1 });
  scheduleTone(bus, { freq: 329.63, at: 0.1, dur: 0.2, type: 'sine', gain: 0.085 });
}

/**
 * Tey's coach bubble appearing. A quick, bright single blip — not the ladder
 * (that's reserved for phase/combo progress), just a light "pop" so the
 * bubble's entrance is felt as well as seen. Nudged by `tone` so it doesn't
 * contradict the mascot's own entrance motion (cheer/nudge/neutral).
 */
export function playTeyPopIn(tone: 'neutral' | 'cheer' | 'nudge' = 'neutral') {
  const bus = getBus();
  if (!bus || !shouldPlay('teyPopIn')) return;
  const freq = tone === 'cheer' ? PENTATONIC[4] : tone === 'nudge' ? PENTATONIC[1] : PENTATONIC[2];
  scheduleTone(bus, { freq, dur: 0.12, type: 'sine', gain: 0.1, slideTo: freq * 1.15 });
}

// ─── Progress / gating ──────────────────────────────────────────────────────

/**
 * A gated primary button becoming available (Learn's CONTINUE, Reflect's
 * SUBMIT). A quieter cousin of Beat 3 — same family, less weight, because
 * unlocking a button is a smaller event than unlocking a phase.
 */
export function playButtonUnlock() {
  const bus = getBus();
  if (!bus || !shouldPlay('buttonUnlock')) return;
  scheduleTone(bus, { freq: PENTATONIC[2], dur: 0.16, type: 'sine', gain: 0.12 });
  scheduleTone(bus, { freq: PENTATONIC[5], at: 0.07, dur: 0.2, type: 'sine', gain: 0.09 });
}

/**
 * A quarter-mark crossing on the Learn progress bar. Very quiet — this fires
 * while a learner is reading or watching, so it marks progress without
 * demanding attention.
 *
 * @param index 0-3 for the 25/50/75/100% crossings.
 */
export function playProgressTick(index: number) {
  const bus = getBus();
  if (!bus) return;
  const freq = PENTATONIC[Math.max(0, Math.min(index, PENTATONIC.length - 1))];
  scheduleTone(bus, { freq, dur: 0.1, type: 'sine', gain: 0.06 });
}
