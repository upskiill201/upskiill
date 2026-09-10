// Synthesized UI sound effects for the learn flow.
//
// Every tone routes through the central SoundManager's shared AudioContext
// (synth bus) so that:
//  1. We never leak AudioContexts — browsers cap concurrent contexts (~6) and
//     the old per-call `new AudioContext()` pattern silently killed all sound
//     after a handful of plays on the Deepen screen.
//  2. Autoplay policy is handled — the shared context resumes itself, whereas
//     fresh contexts created outside a user gesture stayed suspended forever.
//  3. The global mute / SFX toggle / volume settings apply automatically.

import soundManager from '@/lib/audio/soundManager';

type Bus = { ctx: AudioContext; output: GainNode };

function getBus(): Bus | null {
  if (typeof window === 'undefined') return null;
  return soundManager.getSynthBus();
}

/** One enveloped oscillator note on the shared synth bus. */
function playTone(
  bus: Bus,
  opts: {
    freq: number;
    at?: number;
    dur?: number;
    type?: OscillatorType;
    gain?: number;
    slideTo?: number;
  }
) {
  const { ctx, output } = bus;
  const { freq, at = 0, dur = 0.12, type = 'sine', gain = 0.15, slideTo } = opts;
  const t0 = ctx.currentTime + at;

  const osc = ctx.createOscillator();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, t0);
  if (slideTo !== undefined) {
    osc.frequency.exponentialRampToValueAtTime(Math.max(1, slideTo), t0 + dur);
  }

  const env = ctx.createGain();
  env.gain.setValueAtTime(0.0001, t0);
  env.gain.exponentialRampToValueAtTime(gain, t0 + 0.01);
  env.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);

  osc.connect(env);
  env.connect(output);
  osc.start(t0);
  osc.stop(t0 + dur + 0.05);
}

/** Mechanical tick — lucky spin wheel passing a segment. */
export const playTickSound = () => {
  const bus = getBus();
  if (!bus) return;
  playTone(bus, { freq: 800, dur: 0.05, type: 'triangle', gain: 0.12, slideTo: 100 });
};

/** Happy major-chord arpeggio — wins, unlocks, correct answers. */
export const playWinSound = () => {
  const bus = getBus();
  if (!bus) return;
  // C5 E5 G5 C6
  [523.25, 659.25, 783.99, 1046.5].forEach((freq, i) => {
    playTone(bus, { freq, at: i * 0.09, dur: i === 3 ? 0.6 : 0.35, type: 'sine', gain: 0.14 });
    playTone(bus, { freq: freq * 2, at: i * 0.09, dur: 0.18, type: 'triangle', gain: 0.04 });
  });
};

/** Short rising pop — small confirmations. */
export const playPopSound = () => {
  const bus = getBus();
  if (!bus) return;
  playTone(bus, { freq: 600, dur: 0.06, type: 'sine', gain: 0.14, slideTo: 1200 });
};

/**
 * Ascending pentatonic pop chime for sequential reward landings.
 * Safe to call in a tight loop — shares one context and respects cooldowns.
 */
export const playAscendingPopSound = (index: number = 0) => {
  const bus = getBus();
  if (!bus) return;

  // Pentatonic scale frequencies (C5, D5, E5, G5, A5, C6, D6, E6, G6, A6)
  const scale = [523.25, 587.33, 659.25, 783.99, 880.0, 1046.5, 1174.66, 1318.51, 1567.98, 1760.0];
  const baseFreq = scale[Math.min(index, scale.length - 1)];
  playTone(bus, { freq: baseFreq, dur: 0.08, type: 'sine', gain: 0.16, slideTo: baseFreq * 1.35 });
};
