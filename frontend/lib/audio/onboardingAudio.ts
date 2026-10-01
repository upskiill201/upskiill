/**
 * Onboarding sound bank.
 *
 * Every cue is synthesised live from oscillators on the shared `SynthBus`,
 * exactly like `celebrationAudio.ts` and `lessonAudio.ts`. There are no audio
 * files in this repo and these add none: zero bytes shipped, no dependency,
 * nothing to fail on a slow connection, and it works offline.
 *
 * Three properties fall out of routing through `getBus()`:
 *  - Muted, SFX-disabled, or audio-unavailable all return `null`, so every
 *    cue here is automatically a silent no-op. No caller needs a mute check.
 *  - The AudioContext is unlocked by `soundManager` on the first user
 *    gesture, so nothing here can violate autoplay policy — the welcome cue
 *    fires on the step-1 Continue TAP, never on mount.
 *  - A throwing or blocked context is swallowed once, with no retry loop.
 *
 * Reaction cues are selected by the dialogue beat's POSE FAMILY rather than
 * hand-wired per call site, so a line, a pose and a sound can never drift
 * apart — see `playTeyReaction`.
 */

import type { PoseFamily } from '@/lib/onboarding/dialogue/types';
import { getBus, PENTATONIC, scheduleNoise, scheduleSparkleDust, scheduleTone, shouldPlay } from './synth';

/** Named cues. Components reference these, never a frequency. */
export type OnboardingCue =
  | 'welcome'
  | 'optionSelect'
  | 'continue'
  | 'back'
  | 'categoryCoding'
  | 'categoryAi'
  | 'reactionPositive'
  | 'reactionCurious'
  | 'reactionWarm'
  | 'reactionPlayful'
  | 'pathReveal'
  | 'notificationOptIn'
  | 'completion'
  | 'validationError';

/**
 * Per-cue cooldowns. The big moments get long ones so a double-tap can't
 * stack two fanfares; the tap-level cues stay short enough to feel responsive.
 */
const COOLDOWN_MS: Record<OnboardingCue, number> = {
  welcome: 1500,
  optionSelect: 60,
  continue: 120,
  back: 120,
  categoryCoding: 400,
  categoryAi: 400,
  reactionPositive: 250,
  reactionCurious: 250,
  reactionWarm: 250,
  reactionPlayful: 250,
  pathReveal: 2000,
  notificationOptIn: 600,
  completion: 3000,
  validationError: 400,
};

type CueFn = (bus: NonNullable<ReturnType<typeof getBus>>) => void;

const CUES: Record<OnboardingCue, CueFn> = {
  // Bright rising third — "hello", not "achievement".
  welcome: (bus) => {
    scheduleTone(bus, { freq: PENTATONIC[0], dur: 0.16, type: 'triangle', gain: 0.16 });
    scheduleTone(bus, { freq: PENTATONIC[2], at: 0.08, dur: 0.18, type: 'sine', gain: 0.18 });
    scheduleTone(bus, { freq: PENTATONIC[4], at: 0.17, dur: 0.26, type: 'sine', gain: 0.16 });
    scheduleSparkleDust(bus, 0.22);
  },

  // Short mallet pop. Deliberately tiny — it fires on every card tap.
  optionSelect: (bus) => {
    scheduleTone(bus, { freq: PENTATONIC[3], dur: 0.09, type: 'sine', gain: 0.16 });
    scheduleTone(bus, { freq: PENTATONIC[5], dur: 0.06, type: 'triangle', gain: 0.07 });
  },

  continue: (bus) => {
    scheduleTone(bus, { freq: PENTATONIC[2], dur: 0.1, type: 'sine', gain: 0.15 });
    scheduleTone(bus, { freq: PENTATONIC[4], at: 0.05, dur: 0.14, type: 'sine', gain: 0.13 });
  },

  // Descending, soft, low gain. Going back is not a mistake and must not
  // sound like one.
  back: (bus) => {
    scheduleTone(bus, { freq: PENTATONIC[3], dur: 0.1, type: 'sine', gain: 0.1 });
    scheduleTone(bus, { freq: PENTATONIC[1], at: 0.05, dur: 0.13, type: 'sine', gain: 0.09 });
  },

  // The two categories get genuinely different timbres, not one cue with a
  // pitch shift — picking a track is the first big decision in the flow.
  categoryCoding: (bus) => {
    // Square-ish, stepped, a little mechanical.
    [0, 2, 4].forEach((i, n) => {
      scheduleTone(bus, {
        freq: PENTATONIC[i],
        at: n * 0.055,
        dur: 0.12,
        type: 'square',
        gain: 0.075,
      });
    });
    scheduleTone(bus, { freq: PENTATONIC[5], at: 0.17, dur: 0.3, type: 'triangle', gain: 0.15 });
  },
  categoryAi: (bus) => {
    // Glassy, gliding, slightly unreal.
    scheduleTone(bus, {
      freq: PENTATONIC[1],
      dur: 0.34,
      type: 'sine',
      gain: 0.16,
      slideTo: PENTATONIC[5],
    });
    scheduleTone(bus, { freq: PENTATONIC[4], at: 0.1, dur: 0.26, type: 'sine', gain: 0.1, detune: 6 });
    scheduleSparkleDust(bus, 0.16);
  },

  reactionPositive: (bus) => {
    scheduleTone(bus, { freq: PENTATONIC[4], dur: 0.11, type: 'sine', gain: 0.13 });
    scheduleTone(bus, { freq: PENTATONIC[6], at: 0.06, dur: 0.14, type: 'sine', gain: 0.11 });
  },
  // Rises and hangs — an audible question mark.
  reactionCurious: (bus) => {
    scheduleTone(bus, { freq: PENTATONIC[2], dur: 0.12, type: 'triangle', gain: 0.11 });
    scheduleTone(bus, { freq: PENTATONIC[4], at: 0.07, dur: 0.16, type: 'sine', gain: 0.1 });
  },
  // Lower, rounder, quieter. This one follows someone admitting they
  // struggle, so it must read as a nod rather than a chime.
  reactionWarm: (bus) => {
    scheduleTone(bus, { freq: PENTATONIC[1], dur: 0.2, type: 'sine', gain: 0.11 });
    scheduleTone(bus, { freq: PENTATONIC[3], at: 0.09, dur: 0.22, type: 'sine', gain: 0.08 });
  },
  reactionPlayful: (bus) => {
    scheduleTone(bus, { freq: PENTATONIC[5], dur: 0.07, type: 'triangle', gain: 0.12 });
    scheduleTone(bus, { freq: PENTATONIC[3], at: 0.05, dur: 0.07, type: 'triangle', gain: 0.1 });
    scheduleTone(bus, { freq: PENTATONIC[6], at: 0.1, dur: 0.12, type: 'sine', gain: 0.12 });
  },

  // The reveal: a sweep in, then the full pentatonic ladder.
  pathReveal: (bus) => {
    scheduleNoise(bus, { dur: 0.42, gain: 0.05, filterFrom: 500, filterTo: 6000 });
    PENTATONIC.slice(0, 6).forEach((freq, i) => {
      scheduleTone(bus, { freq, at: 0.18 + i * 0.07, dur: 0.24, type: 'sine', gain: 0.14 });
    });
    scheduleSparkleDust(bus, 0.6);
  },

  notificationOptIn: (bus) => {
    scheduleTone(bus, { freq: PENTATONIC[2], dur: 0.12, type: 'sine', gain: 0.13 });
    scheduleTone(bus, { freq: PENTATONIC[5], at: 0.09, dur: 0.2, type: 'sine', gain: 0.14 });
  },

  // The biggest cue in onboarding — but still under a second, because the
  // Start learning button must not wait on it.
  completion: (bus) => {
    [0, 2, 4, 5, 7].forEach((i, n) => {
      scheduleTone(bus, {
        freq: PENTATONIC[i],
        at: n * 0.075,
        dur: 0.3,
        type: 'triangle',
        gain: 0.16,
      });
    });
    scheduleTone(bus, { freq: PENTATONIC[7], at: 0.38, dur: 0.5, type: 'sine', gain: 0.18 });
    scheduleNoise(bus, { at: 0.34, dur: 0.5, gain: 0.05, filterFrom: 6000, filterTo: 1200 });
    scheduleSparkleDust(bus, 0.42);
  },

  // Informative, never harsh. Two soft equal tones, no dissonance, no buzz.
  validationError: (bus) => {
    scheduleTone(bus, { freq: 392.0, dur: 0.12, type: 'sine', gain: 0.1 });
    scheduleTone(bus, { freq: 349.23, at: 0.09, dur: 0.16, type: 'sine', gain: 0.09 });
  },
};

/**
 * Play a named onboarding cue.
 *
 * Never throws and never blocks: a failed cue must not stop navigation.
 */
export function playOnboardingCue(cue: OnboardingCue): void {
  try {
    if (!shouldPlay(`onboarding:${cue}`, COOLDOWN_MS[cue])) return;
    const bus = getBus();
    if (!bus) return;
    CUES[cue](bus);
  } catch {
    // Audio is decoration. A blocked or broken context is not an error the
    // learner should ever find out about.
  }
}

const REACTION_BY_FAMILY: Record<PoseFamily, OnboardingCue | null> = {
  positive: 'reactionPositive',
  curious: 'reactionCurious',
  warm: 'reactionWarm',
  playful: 'reactionPlayful',
  neutral: null,
};

/** Play the sting matching a dialogue beat's pose family. */
export function playTeyReaction(family: PoseFamily): void {
  const cue = REACTION_BY_FAMILY[family];
  if (cue) playOnboardingCue(cue);
}

/** Category selection is loud and distinct per track. */
export function playCategoryCue(category: 'coding' | 'ai'): void {
  playOnboardingCue(category === 'coding' ? 'categoryCoding' : 'categoryAi');
}
