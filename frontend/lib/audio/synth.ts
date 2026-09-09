/**
 * Shared Web Audio synthesis primitives.
 *
 * Extracted from `celebrationAudio.ts` when `lessonAudio.ts` needed the same
 * oscillator/noise scheduling, so the two banks share one implementation
 * instead of drifting apart.
 *
 * Everything routes through `soundManager.getSynthBus()`, which returns `null`
 * when the user has muted audio or disabled SFX — so every sound built on
 * these helpers is automatically a silent no-op under those settings, and no
 * caller needs its own mute check. Never construct an `AudioContext` directly:
 * browsers cap them at roughly six per page.
 *
 * Sound design language (Duolingo-style), kept consistent across both banks:
 *  - Mallet/marimba tones: sine + triangle blend, fast attack, exponential decay
 *  - Major pentatonic pitch sets, so any random combination stays consonant
 *  - Rising sequences for reward/progress, descending minor for loss moments
 */

import soundManager from './soundManager';

export type SynthBus = { ctx: AudioContext; output: GainNode };

export interface ToneOptions {
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
  /** Detune in cents */
  detune?: number;
}

export interface NoiseOptions {
  at?: number;
  dur?: number;
  gain?: number;
  filterFrom?: number;
  filterTo?: number;
  q?: number;
}

/** C5 D5 E5 G5 A5 C6 D6 E6 — the shared pitch ladder for progress sounds. */
export const PENTATONIC = [523.25, 587.33, 659.25, 783.99, 880.0, 1046.5, 1174.66, 1318.51];

/** The bus, or `null` when muted / SFX off / audio unavailable. */
export function getBus(): SynthBus | null {
  return soundManager.getSynthBus();
}

export function scheduleTone(bus: SynthBus, opts: ToneOptions) {
  const { ctx, output } = bus;
  const { freq, at = 0, dur = 0.18, type = 'sine', gain = 0.2, slideTo, detune = 0 } = opts;

  const t0 = ctx.currentTime + at;

  const osc = ctx.createOscillator();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, t0);
  if (detune) osc.detune.setValueAtTime(detune, t0);
  if (slideTo !== undefined) {
    osc.frequency.exponentialRampToValueAtTime(Math.max(1, slideTo), t0 + dur);
  }

  const env = ctx.createGain();
  env.gain.setValueAtTime(0.0001, t0);
  env.gain.exponentialRampToValueAtTime(gain, t0 + 0.012);
  env.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);

  osc.connect(env);
  env.connect(output);
  osc.start(t0);
  osc.stop(t0 + dur + 0.05);
}

export function scheduleNoise(bus: SynthBus, opts: NoiseOptions) {
  const { ctx, output } = bus;
  const { at = 0, dur = 0.25, gain = 0.15, filterFrom = 4000, filterTo, q = 0.8 } = opts;

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
  filter.frequency.setValueAtTime(filterFrom, t0);
  if (filterTo !== undefined) {
    filter.frequency.exponentialRampToValueAtTime(Math.max(40, filterTo), t0 + dur);
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

/** High shimmer tail — layered under the biggest moments. */
export function scheduleSparkleDust(bus: SynthBus, startAt: number) {
  for (let i = 0; i < 5; i++) {
    scheduleTone(bus, {
      freq: 1567.98 + Math.random() * 1046.5,
      at: startAt + i * 0.06,
      dur: 0.1,
      type: 'sine',
      gain: 0.045,
    });
  }
}

// ─── Overlap guard ──────────────────────────────────────────────────────────
// These one-shots have no cooldown of their own (unlike soundManager.play()'s
// registry-based cooldownMs), so the same sound can get called twice within a
// few ms from redundant callers. One shared guard across every bank built on
// these primitives.

const SOUND_COOLDOWN_MS = 150;
const lastPlayedAt = new Map<string, number>();

/**
 * Returns true (and records the call) the first time `name` is invoked within
 * the cooldown window; false on a redundant call that should be skipped.
 *
 * Deliberately not applied to sounds that are *meant* to fire in rapid
 * succession (per-index ticks, chimes) — those pass their index into the name
 * or skip the guard entirely.
 */
export function shouldPlay(name: string, cooldownMs = SOUND_COOLDOWN_MS): boolean {
  const now = Date.now();
  const last = lastPlayedAt.get(name) ?? 0;
  if (now - last < cooldownMs) return false;
  lastPlayedAt.set(name, now);
  return true;
}
