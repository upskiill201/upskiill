/**
 * UI Sound Bank — synthesized (WebAudio) Duolingo-style sounds for interface actions.
 *
 * Every sound is composed from oscillators + noise at play time (no audio files),
 * and routes through the central SoundManager's sfx gain node so the existing
 * mute / sfx-toggle / volume settings apply automatically. When audio is muted
 * or unavailable every function is a silent no-op.
 *
 * Sound design language (Duolingo-style, shared with celebrationAudio.ts):
 *  - Mallet/marimba tones: sine fundamental + soft octave harmonic,
 *    fast attack (~10ms), exponential decay
 *  - "Pop" actions get a short pitch slide; upward = forward/confirm,
 *    downward = back/dismiss
 *  - Errors stay low and round — a gentle bonk, never harsh or buzzy
 */

import { SoundId } from './soundRegistry';
import soundManager from './soundManager';

interface SynthBus {
  ctx: AudioContext;
  output: GainNode;
  /** Optional global pitch multiplier (registry speed knob), default 1 */
  pitch?: number;
}

interface ToneOptions {
  freq: number;
  /** Start offset in seconds from now */
  at?: number;
  /** Duration in seconds */
  dur?: number;
  type?: OscillatorType;
  /** 0..1 peak gain */
  gain?: number;
  /** Glide target frequency (portamento) */
  slideTo?: number;
}

/** One enveloped oscillator note on the synth bus. */
function scheduleTone(bus: SynthBus, opts: ToneOptions) {
  const { ctx, output, pitch = 1 } = bus;
  const {
    freq,
    at = 0,
    dur = 0.12,
    type = 'sine',
    gain = 0.15,
    slideTo,
  } = opts;

  const t0 = ctx.currentTime + at;

  const osc = ctx.createOscillator();
  osc.type = type;
  osc.frequency.setValueAtTime(freq * pitch, t0);
  if (slideTo !== undefined) {
    osc.frequency.exponentialRampToValueAtTime(Math.max(1, slideTo * pitch), t0 + dur);
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

/** Filtered noise burst — used for airy menu swishes. */
function scheduleNoise(
  bus: SynthBus,
  opts: { at?: number; dur?: number; gain?: number; filterFrom?: number; filterTo?: number; q?: number }
) {
  const { ctx, output, pitch = 1 } = bus;
  const {
    at = 0,
    dur = 0.2,
    gain = 0.06,
    filterFrom = 1000,
    filterTo,
    q = 1.2,
  } = opts;

  const t0 = ctx.currentTime + at;

  const bufferSize = Math.max(1, Math.floor(ctx.sampleRate * dur));
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = Math.random() * 2 - 1;
  }

  const src = ctx.createBufferSource();
  src.buffer = buffer;

  const filter = ctx.createBiquadFilter();
  filter.type = 'bandpass';
  filter.frequency.setValueAtTime(filterFrom * pitch, t0);
  if (filterTo !== undefined) {
    filter.frequency.exponentialRampToValueAtTime(Math.max(40, filterTo * pitch), t0 + dur);
  }
  filter.Q.value = q;

  const env = ctx.createGain();
  env.gain.setValueAtTime(0.0001, t0);
  env.gain.exponentialRampToValueAtTime(gain, t0 + 0.02);
  env.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);

  src.connect(filter);
  filter.connect(env);
  env.connect(output);
  src.start(t0);
  src.stop(t0 + dur + 0.05);
}

// ─── Recipes (one per SoundId) ───────────────────────────────────────────────

/** Continue / primary CTA — warm rising pop, confident but soft. */
function playButtonPrimary(bus: SynthBus) {
  scheduleTone(bus, { freq: 587.33, dur: 0.09, type: 'sine', gain: 0.35, slideTo: 783.99 }); // D5 → G5
  scheduleTone(bus, { freq: 1174.66, at: 0.01, dur: 0.05, type: 'triangle', gain: 0.09 }); // octave shimmer
}

/** Back / cancel / skip — the mirror of Continue: descending pop, slightly rounder. */
function playButtonSecondary(bus: SynthBus) {
  scheduleTone(bus, { freq: 659.25, dur: 0.1, type: 'sine', gain: 0.3, slideTo: 440 }); // E5 → A4
  scheduleTone(bus, { freq: 1318.51, at: 0.008, dur: 0.04, type: 'triangle', gain: 0.07 });
}

/** Selection / chip tap — woody mallet tick, quick and light. */
function playSelection(bus: SynthBus) {
  scheduleTone(bus, { freq: 987.77, dur: 0.07, type: 'sine', gain: 0.33 }); // B5
  scheduleTone(bus, { freq: 1975.53, dur: 0.045, type: 'triangle', gain: 0.11 });
}

/** General success confirm — two-note rising chime with sparkle tail. */
function playSuccessConfirm(bus: SynthBus) {
  scheduleTone(bus, { freq: 783.99, at: 0, dur: 0.12, type: 'sine', gain: 0.3 }); // G5
  scheduleTone(bus, { freq: 1046.5, at: 0.08, dur: 0.26, type: 'sine', gain: 0.34 }); // C6
  scheduleTone(bus, { freq: 2093, at: 0.09, dur: 0.16, type: 'triangle', gain: 0.09 });
}

/** Gentle error alert — low rounded bonk descending, kind not punishing. */
function playErrorSoft(bus: SynthBus) {
  scheduleTone(bus, { freq: 233.08, dur: 0.14, type: 'triangle', gain: 0.28, slideTo: 196 }); // Bb3 → G3
  scheduleTone(bus, { freq: 116.54, at: 0.02, dur: 0.18, type: 'sine', gain: 0.22, slideTo: 98 });
}

/** Correct answer — the classic bright ascending pair: E5 → A5 with shimmer. */
function playCorrect(bus: SynthBus) {
  scheduleTone(bus, { freq: 659.25, at: 0, dur: 0.12, type: 'sine', gain: 0.32 });
  scheduleTone(bus, { freq: 1318.51, at: 0.005, dur: 0.07, type: 'triangle', gain: 0.09 });
  scheduleTone(bus, { freq: 880, at: 0.09, dur: 0.28, type: 'sine', gain: 0.36 });
  scheduleTone(bus, { freq: 1760, at: 0.095, dur: 0.18, type: 'triangle', gain: 0.11 });
  scheduleTone(bus, { freq: 2637, at: 0.19, dur: 0.12, type: 'sine', gain: 0.07 });
}

/** Tab switch — neutral soft blip (disabled in registry by default). */
function playTabSwitch(bus: SynthBus) {
  scheduleTone(bus, { freq: 739.99, dur: 0.06, type: 'sine', gain: 0.22, slideTo: 987.77 });
}

/** Menu / drawer open-close — airy swish into a soft landing pop. */
function playMenuOpenClose(bus: SynthBus) {
  scheduleNoise(bus, { dur: 0.12, gain: 0.12, filterFrom: 700, filterTo: 2600, q: 1.4 });
  scheduleTone(bus, { freq: 523.25, at: 0.05, dur: 0.08, type: 'sine', gain: 0.24, slideTo: 659.25 });
}

/** Toggle switch — crisp click-clack: high tick then lower tick. */
function playToggle(bus: SynthBus) {
  scheduleTone(bus, { freq: 1567.98, dur: 0.03, type: 'triangle', gain: 0.2 });
  scheduleTone(bus, { freq: 1046.5, at: 0.035, dur: 0.035, type: 'triangle', gain: 0.18 });
}

/**
 * Per-SoundId synth recipes. BACKGROUND_MUSIC intentionally has none —
 * it stays disabled in the registry.
 */
const UI_SOUND_RECIPES: Partial<Record<SoundId, (bus: SynthBus) => void>> = {
  BUTTON_PRIMARY: playButtonPrimary,
  BUTTON_SECONDARY: playButtonSecondary,
  SELECTION: playSelection,
  SUCCESS_CONFIRM: playSuccessConfirm,
  ERROR_SOFT: playErrorSoft,
  CORRECT: playCorrect,
  TAB_SWITCH: playTabSwitch,
  MENU_OPEN_CLOSE: playMenuOpenClose,
  TOGGLE: playToggle,
};

/**
 * Plays the synthesized recipe for a SoundId through the shared synth bus.
 * `volume` scales the recipe loudness (registry per-sound volume slider),
 * `speed` shifts pitch (registry speed slider).
 * Returns true when a recipe existed and was scheduled.
 */
export function playUiSound(id: SoundId, volume = 1, speed = 1): boolean {
  const recipe = UI_SOUND_RECIPES[id];
  if (!recipe) return false;

  const base = soundManager.getSynthBus();
  if (!base) return false;

  let output: GainNode = base.output;
  if (volume !== 1) {
    // Per-play scaling gain so the registry volume slider applies to recipes.
    const scaler = base.ctx.createGain();
    scaler.gain.value = Math.max(0, Math.min(1, volume));
    scaler.connect(base.output);
    output = scaler;

    // Auto-disconnect once the longest recipe has certainly finished.
    window.setTimeout(() => {
      try {
        scaler.disconnect();
      } catch {}
    }, 1500);
  }

  recipe({
    ctx: base.ctx,
    output,
    pitch: speed !== 1 ? Math.max(0.25, Math.min(4, speed)) : undefined,
  });
  return true;
}

/**
 * Ascending pentatonic pop chime for sequential reward landings.
 * Safe to call in a tight loop — shares one context and never stacks harshly.
 */
export function playPentatonicTick(index = 0) {
  const base = soundManager.getSynthBus();
  if (!base) return;

  // Pentatonic scale (C5, D5, E5, G5, A5, C6, D6, E6)
  const scale = [523.25, 587.33, 659.25, 783.99, 880.0, 1046.5, 1174.66, 1318.51];
  const baseFreq = scale[Math.min(Math.max(0, index), scale.length - 1)];
  scheduleTone(base, { freq: baseFreq, dur: 0.08, type: 'sine', gain: 0.34, slideTo: baseFreq * 1.35 });
}
