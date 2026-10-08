import { Easing, interpolate, spring } from 'remotion';

const clamp = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;

/** Eased 0→1 between two times (seconds). */
export const prog = (t: number, a: number, b: number, ease = Easing.bezier(0.22, 1, 0.36, 1)) =>
  interpolate(t, [a, b], [0, 1], { ...clamp, easing: ease });

/** Spring 0→1 starting at `at` seconds (0 before). */
export const spr = (frame: number, fps: number, at: number, cfg: { damping?: number; stiffness?: number; mass?: number } = {}) =>
  frame < at * fps ? 0 : spring({ frame: frame - at * fps, fps, config: { damping: 12, stiffness: 170, mass: 0.9, ...cfg } });

/** Pop-in with overshoot. */
export const pop = (frame: number, fps: number, at: number) => spr(frame, fps, at, { damping: 9, stiffness: 220, mass: 0.7 });

/** 1 → 0 fade/scale-out ending at `at + dur`. */
export const out = (t: number, at: number, dur = 0.25) => 1 - prog(t, at, at + dur, Easing.in(Easing.cubic));

/** Visible between [a, b): entrance spring at a, exit at b. Returns 0..1 presence. */
export const life = (frame: number, fps: number, a: number, b: number) => {
  const t = frame / fps;
  return Math.min(spr(frame, fps, a, { damping: 14, stiffness: 180 }), out(t, b - 0.2, 0.2));
};

export const lerp = (a: number, b: number, k: number) => a + (b - a) * k;
