import { Easing, interpolate, spring } from 'remotion';
import { reel } from './data';
import { FPS } from '../theme';

export const s = (sec: number) => Math.round(sec * FPS);
export const BEAT = 0.5;

const clamp = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;

/** 0→1 progress between two times (seconds), eased. */
export const prog = (f: number, a: number, b: number, ease: (t: number) => number = Easing.bezier(0.22, 1, 0.36, 1)) =>
  interpolate(f / FPS, [a, b], [0, 1], { ...clamp, easing: ease });

export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/** Juicy spring that starts at time `at` (seconds). */
export const spr = (f: number, at: number, cfg: { damping?: number; stiffness?: number; mass?: number } = {}) =>
  spring({ frame: f - at * FPS, fps: FPS, config: { damping: 12, stiffness: 170, mass: 0.9, ...cfg } });

/** Pop-in scale with overshoot; 0 before `at`. */
export const pop = (f: number, at: number, cfg?: { damping?: number; stiffness?: number; mass?: number }) =>
  f < at * FPS ? 0 : spr(f, at, { damping: 9, stiffness: 210, mass: 0.7, ...cfg });

/** Pop-out to 0 at `at`. */
export const out = (f: number, at: number, dur = 0.22) =>
  1 - interpolate(f / FPS, [at, at + dur], [0, 1], { ...clamp, easing: Easing.in(Easing.back(2.2)) });

/** Pulse that decays after every kick (0..1). */
export const kickPulse = (f: number, decay = 9) => {
  const t = f / FPS;
  let last = -9;
  for (const k of reel().kicks) { if (k <= t) last = k; else break; }
  return Math.exp(-(t - last) * decay);
};

/** Squash & stretch for an element landing at `at`. Returns [sx, sy]. */
export const squash = (f: number, at: number, amt = 0.28): [number, number] => {
  const t = f / FPS - at;
  if (t < 0) return [1, 1];
  const w = Math.exp(-t * 7) * Math.cos(t * 26) * amt;
  return [1 + w, 1 - w];
};

/** Smear stretch for fast moves, driven by velocity (px/frame). */
export const smear = (v: number, k = 0.012) => 1 + Math.min(0.6, Math.abs(v) * k);

/** Deterministic pseudo-random. */
export const rand = (i: number) => {
  const x = Math.sin(i * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
};

export const easeOutBack = Easing.out(Easing.back(1.7));
export const easeInOut = Easing.bezier(0.65, 0, 0.35, 1);
export const easeOut = Easing.bezier(0.16, 1, 0.3, 1);
export const easeIn = Easing.bezier(0.7, 0, 0.84, 0);
