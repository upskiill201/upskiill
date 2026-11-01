import React from 'react';
import { AbsoluteFill } from 'remotion';
import { C, DISPLAY, E, FPS, k, rand, sp } from './lib';

type CSS = React.CSSProperties;

/**
 * Kinetic type: every word (or letter) rises through its own mask, staggered, with an
 * optional exit. `hi` paints chosen words (by index) with a colour or a gradient.
 */
export const Words: React.FC<{
  t: number; text: string; at: number; out?: number; size: number; color?: string; weight?: number;
  stagger?: number; by?: 'word' | 'char'; hi?: Record<number, string>; style?: CSS; dur?: number;
  tracking?: number; from?: 'below' | 'above'; align?: 'left' | 'center' | 'right'; lineHeight?: number;
  skew?: boolean;
}> = ({ t, text, at, out, size, color = '#fff', weight = 800, stagger = 0.06, by = 'word', hi = {}, style, dur = 0.55, tracking = -0.045, from = 'below', align = 'left', lineHeight = 1.0, skew = true }) => {
  const parts = by === 'word' ? text.split(' ') : Array.from(text);
  const dir = from === 'below' ? 1 : -1;
  return (
    <div style={{ fontFamily: DISPLAY, fontWeight: weight, fontSize: size, color, letterSpacing: `${tracking}em`, lineHeight, display: 'flex', flexWrap: 'wrap', justifyContent: align === 'center' ? 'center' : align === 'right' ? 'flex-end' : 'flex-start', ...style }}>
      {parts.map((w, i) => {
        const p = k(t, at + i * stagger, at + i * stagger + dur, E.outExpo);
        const o = out !== undefined ? k(t, out + i * stagger * 0.5, out + i * stagger * 0.5 + 0.35, E.inCubic) : 0;
        const y = (1 - p) * 115 * dir - o * 115 * dir;
        const paint = hi[i];
        const grad = paint?.startsWith('linear');
        return (
          <span key={i} style={{ display: 'inline-block', overflow: 'hidden', padding: '0.06em 0.04em 0.12em', margin: '-0.06em 0 -0.12em', marginRight: by === 'word' ? '0.24em' : w === ' ' ? '0.24em' : 0 }}>
            <span style={{
              display: 'inline-block', transform: `translateY(${y}%) ${skew ? `skewY(${(1 - p) * 8 * dir}deg)` : ''}`,
              ...(grad ? { backgroundImage: paint, WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' } : paint ? { color: paint } : {}),
            }}>{w === ' ' ? ' ' : w}</span>
          </span>
        );
      })}
    </div>
  );
};

/** Expanding ring. */
export const Shock: React.FC<{ t: number; at: number; x: number; y: number; r?: number; color?: string; width?: number; dur?: number }> = ({ t, at, x, y, r = 500, color = '#fff', width = 10, dur = 0.7 }) => {
  if (t < at || t > at + dur) return null;
  const p = k(t, at, at + dur, E.outCubic);
  const rr = 10 + p * r;
  return <div style={{ position: 'absolute', left: x - rr, top: y - rr, width: rr * 2, height: rr * 2, borderRadius: '50%', border: `${width * (1 - p) + 0.5}px solid ${color}`, opacity: 1 - p * 0.9, pointerEvents: 'none' }} />;
};

/** Radial spark lines (motion-design "burst"), deterministic. */
export const Burst: React.FC<{ t: number; at: number; x: number; y: number; n?: number; dist?: number; colors?: string[]; len?: number; thick?: number; seed?: number; dur?: number }> = ({ t, at, x, y, n = 14, dist = 260, colors = ['#fff'], len = 70, thick = 8, seed = 1, dur = 0.55 }) => {
  if (t < at || t > at + dur) return null;
  const p = k(t, at, at + dur, E.outCubic);
  return (
    <>
      {Array.from({ length: n }).map((_, i) => {
        const a = (i / n) * Math.PI * 2 + rand(i, seed) * 0.4;
        const d = dist * (0.6 + rand(i + 9, seed) * 0.5);
        const r0 = d * p * 0.55 + 30, l = len * (1 - p) * (0.6 + rand(i + 3, seed) * 0.6);
        return <div key={i} style={{ position: 'absolute', left: x + Math.cos(a) * r0, top: y + Math.sin(a) * r0, width: l, height: thick * (1 - p * 0.6), marginTop: -thick / 2, borderRadius: thick, background: colors[i % colors.length], transform: `rotate(${a}rad)`, transformOrigin: '0 50%' }} />;
      })}
    </>
  );
};

/** Dots that fly out, arc and fade (confetti light). */
export const Confetti: React.FC<{ t: number; at: number; x: number; y: number; n?: number; colors?: string[]; spread?: number; seed?: number; dur?: number; size?: number }> = ({ t, at, x, y, n = 36, colors = [C.gold, C.green, C.blue, C.red, C.purple], spread = 700, seed = 3, dur = 1.6, size = 18 }) => {
  if (t < at || t > at + dur) return null;
  const s = t - at;
  return (
    <>
      {Array.from({ length: n }).map((_, i) => {
        const a = -Math.PI / 2 + (rand(i, seed) - 0.5) * Math.PI * 1.5;
        const v = spread * (0.5 + rand(i + 5, seed) * 0.8);
        const px = x + Math.cos(a) * v * (1 - Math.exp(-s * 3.2)) / 1.2;
        const py = y + Math.sin(a) * v * (1 - Math.exp(-s * 3.2)) / 1.2 + 520 * s * s;
        const rot = s * 720 * (rand(i + 2, seed) - 0.5) * 2;
        const fade = 1 - k(t, at + dur * 0.6, at + dur);
        const sq = rand(i + 7, seed) > 0.5;
        return <div key={i} style={{ position: 'absolute', left: px, top: py, width: size * (sq ? 1 : 0.55), height: size * (sq ? 0.55 : 1.4), background: colors[i % colors.length], borderRadius: sq ? 3 : size, transform: `rotate(${rot}deg) scaleY(${Math.cos(s * 9 + i)})`, opacity: fade }} />;
      })}
    </>
  );
};

/** Full-frame flash. */
export const Flash: React.FC<{ t: number; at: number; color?: string; dur?: number; peak?: number }> = ({ t, at, color = '#fff', dur = 0.35, peak = 0.9 }) => {
  if (t < at || t > at + dur) return null;
  return <AbsoluteFill style={{ background: color, opacity: (1 - k(t, at, at + dur, E.outCubic)) * peak, pointerEvents: 'none' }} />;
};

/** Film grain + vignette, the finishing layer. */
export const Finish: React.FC<{ t: number; dark?: boolean; vignette?: number }> = ({ t, dark = true, vignette = 0.55 }) => {
  const seed = Math.floor(t * FPS) % 8;
  return (
    <>
      <AbsoluteFill style={{ background: `radial-gradient(ellipse at 50% 50%, transparent 55%, rgba(0,0,0,${dark ? vignette : vignette * 0.25}) 100%)`, pointerEvents: 'none' }} />
      <AbsoluteFill style={{ opacity: dark ? 0.07 : 0.045, mixBlendMode: 'overlay', pointerEvents: 'none' }}>
        <svg width="100%" height="100%"><filter id={`gr${seed}`}><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed={seed} stitchTiles="stitch" /><feColorMatrix type="saturate" values="0" /></filter><rect width="100%" height="100%" filter={`url(#gr${seed})`} /></svg>
      </AbsoluteFill>
    </>
  );
};

/** Horizontal motion-blur smear for whip moves: wrap a layer, pass the blur amount. */
export const Smear: React.FC<{ amt: number; id: string; children: React.ReactNode; style?: CSS; vertical?: boolean }> = ({ amt, id, children, style, vertical }) => {
  if (amt < 0.5) return <div style={{ position: 'absolute', inset: 0, ...style }}>{children}</div>;
  return (
    <div style={{ position: 'absolute', inset: 0, filter: `url(#${id})`, ...style }}>
      <svg width="0" height="0" style={{ position: 'absolute' }}><filter id={id} x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation={vertical ? `0 ${amt}` : `${amt} 0`} /></filter></svg>
      {children}
    </div>
  );
};

/** Rolling digit odometer. */
export const Odo: React.FC<{ value: number; size: number; color?: string; weight?: number; font?: string; digits?: number }> = ({ value, size, color = '#fff', weight = 800, font = DISPLAY, digits }) => {
  const v = Math.max(0, value);
  const n = digits ?? Math.max(1, String(Math.floor(v)).length);
  const cols = [];
  for (let i = n - 1; i >= 0; i--) {
    const place = Math.pow(10, i);
    // a column rolls only while every column below it is passing 9 → 0
    const pos = (Math.floor(v / place) % 10) + clamp01((v % place) - (place - 1));
    if (i > 0 && v < place) { cols.push(null); continue; }
    cols.push(
      <span key={i} style={{ display: 'inline-block', height: size * 1.05, overflow: 'hidden', verticalAlign: 'top' }}>
        <span style={{ display: 'flex', flexDirection: 'column', transform: `translateY(${-pos * size * 1.05}px)` }}>
          {Array.from({ length: 11 }).map((_, j) => <span key={j} style={{ height: size * 1.05, lineHeight: `${size * 1.05}px` }}>{j % 10}</span>)}
        </span>
      </span>,
    );
  }
  return <span style={{ fontFamily: font, fontWeight: weight, fontSize: size, color, display: 'inline-flex', fontVariantNumeric: 'tabular-nums', letterSpacing: '-0.03em' }}>{cols}</span>;
};
const clamp01 = (x: number) => Math.max(0, Math.min(1, x));

/** Pop-in scale for UI pieces: 0 → overshoot → 1. */
export const pop = (t: number, at: number, soft = false) => sp(t, at, soft ? { damping: 14, stiffness: 150, mass: 0.8 } : { damping: 9, stiffness: 210, mass: 0.6 });
