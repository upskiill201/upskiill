import React, { createContext, useContext } from 'react';
import { Easing, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { LOOKS, Look } from './theme';

/** Timing data written by pipeline/motion/voice.mjs → src/motion/videos/<slug>/vo.json */
export type Word = { w: string; s: number; e: number; line: string; accent: boolean; brk: boolean };
export type VO = {
  fps: number; duration: number; pace: number;
  words: Word[];
  lines: { id: string; start: number; end: number; text: string; chapter?: string }[];
  lip: { amp: number[]; vis: string };
};

const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9'%$.-]/g, '').replace(/[.]+$/, '');

/**
 * Cue = start (or end) of the n-th spoken occurrence of `word` (1-based).
 * Pass `after` (seconds) to search only after that time, which avoids counting earlier occurrences by hand.
 * Throws on a typo so cues never silently drift.
 */
export const cue = (vo: VO, word: string, opts: { n?: number; after?: number; end?: boolean } = {}): number => {
  const target = norm(word); const n = opts.n ?? 1; let k = 0;
  for (const w of vo.words) {
    if (opts.after !== undefined && w.s < opts.after) continue;
    if (norm(w.w) === target && ++k === n) return opts.end ? w.e : w.s;
  }
  throw new Error(`cue "${word}" #${n}${opts.after !== undefined ? ` after ${opts.after}s` : ''} not found in the voice-over`);
};
export const line = (vo: VO, id: string) => {
  const l = vo.lines.find((x) => x.id === id);
  if (!l) throw new Error(`line "${id}" not found in vo.json`);
  return l;
};

/* ───────────── easing helpers (snappy bursts, §2.6) ───────────── */
const clamp = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;
export const EASE_OUT = Easing.bezier(0.16, 1, 0.3, 1);      // the "snap": fast in, long settle
export const EASE_IO = Easing.bezier(0.65, 0, 0.35, 1);      // camera moves
/** 0→1 between a and b seconds */
export const prog = (t: number, a: number, b: number, ease = EASE_OUT) => interpolate(t, [a, b], [0, 1], { ...clamp, easing: ease });
/** Pop with a little overshoot, starting at `at` seconds. */
export const pop = (frame: number, fps: number, at: number, cfg: { damping?: number; stiffness?: number; mass?: number } = {}) =>
  frame < at * fps ? 0 : spring({ frame: frame - at * fps, fps, config: { damping: 11, stiffness: 260, mass: 0.6, ...cfg } });
/** Presence 0..1 for something shown in [a, b): pop in at a, quick fade out ending at b. */
export const life = (t: number, frame: number, fps: number, a: number, b = Infinity) =>
  Math.min(pop(frame, fps, a, { damping: 15 }), b === Infinity ? 1 : 1 - prog(t, b - 0.18, b, Easing.in(Easing.cubic)));
export const lerp = (a: number, b: number, k: number) => a + (b - a) * k;
/** Deterministic pseudo-random 0..1 */
export const rnd = (i: number) => { const x = Math.sin(i * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); };

/* ───────────── per-video context ───────────── */
type Ctx = { look: Look; vo: VO };
const MotionCtx = createContext<Ctx>({ look: LOOKS.blueprint, vo: { fps: 30, duration: 10, pace: 3.5, words: [], lines: [], lip: { amp: [], vis: '' } } });
export const MotionProvider: React.FC<{ look: Look['name']; vo: VO; children: React.ReactNode }> = ({ look, vo, children }) =>
  React.createElement(MotionCtx.Provider, { value: { look: LOOKS[look], vo } }, children);
/** Everything a kit component needs: look tokens, vo timings, current time. */
export const useMotion = () => {
  const { look, vo } = useContext(MotionCtx);
  const frame = useCurrentFrame(); const { fps } = useVideoConfig();
  return { look, vo, frame, fps, t: frame / fps };
};
