import { continueRender, delayRender, Easing, spring, staticFile } from 'remotion';
import cues from './cues.json';
import kicksJson from './kicks.json';

export const Q = cues;
/** Kick times the beat pulses follow; another film (src/intro) swaps in its own with setKicks(). */
let KICKS: number[] = kicksJson;
export const setKicks = (times: number[]) => { KICKS = times; };
export const FPS = 60;
export const W = 1920, H = 1080;

// ── fonts (local woff2: google-fonts times out in headless renders on this machine) ──
const FONTS: [string, string, string][] = [
  ['Plus Jakarta Sans', 'jakarta.woff2', '100 900'],
  ['JetBrains Mono', 'mono.woff2', '100 900'],
  ['Inter', 'inter.woff2', '100 900'],
];
if (typeof document !== 'undefined') {
  const h = delayRender('showreel fonts');
  Promise.all(FONTS.map(([fam, file, weight]) => new FontFace(fam, `url(${staticFile('fonts/' + file)}) format('woff2')`, { weight }).load().then((f) => document.fonts.add(f))))
    .then(() => continueRender(h))
    .catch((e) => { console.error(e); continueRender(h); });
}
export const DISPLAY = "'Plus Jakarta Sans', sans-serif";
export const MONO = "'JetBrains Mono', monospace";
export const BODY = "'Inter', sans-serif";

// ── palette: the live product's tokens (globals.css) + the course art ──
export const C = {
  night: '#050817',
  night2: '#0B1030',
  ink: '#071233',
  blue: '#0172FD',
  blueDark: '#0060D9',
  blueDeep: '#0050B3',
  indigo: '#6352FF',
  brand: '#3D5AFE',
  purple: '#9333EA',
  violet: '#A78BFA',
  green: '#58CC02',
  greenDark: '#46A302',
  greenBg: '#D7FFB8',
  gold: '#FFC800',
  goldDark: '#E0A800',
  red: '#FF4B4B',
  orange: '#F59E0B',
  git: '#F05033',
  cyan: '#22D3EE',
  page: '#F5F7FB',
  card: '#FFFFFF',
  border: '#E2E8F0',
  text2: '#64748B',
  muted: '#94A3B8',
  ghGreen: '#238636',
  ghPurple: '#8957E5',
};

// ── time ──
export const clamp = (x: number, a = 0, b = 1) => Math.max(a, Math.min(b, x));
export const lerp = (a: number, b: number, p: number) => a + (b - a) * p;
export const mix = lerp;
/** 0→1 between a and b with an easing */
export const k = (t: number, a: number, b: number, ease: (x: number) => number = E.outCubic) => ease(clamp((t - a) / (b - a)));
export const E = {
  linear: (x: number) => x,
  outCubic: Easing.out(Easing.cubic),
  inCubic: Easing.in(Easing.cubic),
  inOutCubic: Easing.inOut(Easing.cubic),
  outExpo: (x: number) => (x >= 1 ? 1 : 1 - Math.pow(2, -10 * x)),
  inExpo: (x: number) => (x <= 0 ? 0 : Math.pow(2, 10 * x - 10)),
  inOutExpo: (x: number) => (x <= 0 ? 0 : x >= 1 ? 1 : x < 0.5 ? Math.pow(2, 20 * x - 10) / 2 : (2 - Math.pow(2, -20 * x + 10)) / 2),
  outBack: (x: number) => { const c1 = 2.2, c3 = c1 + 1; return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2); },
  inBack: (x: number) => { const c1 = 1.9; return (c1 + 1) * x * x * x - c1 * x * x; },
  outQuint: (x: number) => 1 - Math.pow(1 - x, 5),
  inQuint: (x: number) => x * x * x * x * x,
};
/** Springy 0→1 (with overshoot) starting at `at` seconds. */
export const sp = (t: number, at: number, cfg: { damping?: number; stiffness?: number; mass?: number } = {}) =>
  t < at ? 0 : spring({ frame: (t - at) * FPS, fps: FPS, config: { damping: 11, stiffness: 170, mass: 0.7, ...cfg } });
/** Snappy spring with little overshoot. */
export const snap = (t: number, at: number) => sp(t, at, { damping: 18, stiffness: 260, mass: 0.6 });
/** Decaying envelope from the most recent of `times` (music-locked pulses). */
export const env = (t: number, times: number[], decay = 9) => {
  let v = 0;
  for (const ti of times) if (ti <= t) v = Math.max(v, Math.exp(-(t - ti) * decay));
  return v;
};
export const kick = (t: number, decay = 10) => env(t, KICKS, decay);
/** Index of the last cue ≤ t (−1 if none). */
export const last = (t: number, times: number[]) => { let i = -1; times.forEach((x, j) => { if (x <= t) i = j; }); return i; };
/** Deterministic noise. */
export const rand = (i: number, s = 1) => { const x = Math.sin(i * 127.1 + s * 311.7) * 43758.5453; return x - Math.floor(x); };
/** Screen shake from impacts: [time, strength]. */
export const shake = (t: number, hits: [number, number][], seed = 1) => {
  let x = 0, y = 0, r = 0;
  for (const [at, s] of hits) {
    if (t < at) continue;
    const d = Math.exp(-(t - at) * 9) * s;
    if (d < 0.01) continue;
    const f = (t - at) * 60;
    x += Math.sin(f * 1.7 + seed) * 22 * d; y += Math.cos(f * 2.3 + seed * 2) * 16 * d; r += Math.sin(f * 1.1 + seed * 3) * 0.8 * d;
  }
  return { x, y, r };
};
export const img = (f: string) => staticFile('showreel/' + f);
