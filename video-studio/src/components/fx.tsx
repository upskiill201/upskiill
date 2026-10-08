import React from 'react';
import { AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { C, FPS, display } from '../theme';
import { easeOut, out, pop, prog, rand } from '../lib/anim';

/** Absolutely positioned, centered node. */
export const At: React.FC<{
  x: number; y: number; s?: number; sx?: number; sy?: number; r?: number; o?: number; z?: number;
  children: React.ReactNode; style?: React.CSSProperties;
}> = ({ x, y, s = 1, sx = 1, sy = 1, r = 0, o = 1, z, children, style }) => (
  <div style={{
    position: 'absolute', left: x, top: y, zIndex: z, opacity: o,
    transform: `translate(-50%, -50%) rotate(${r}deg) scale(${s * sx}, ${s * sy})`,
    ...style,
  }}>{children}</div>
);

export const Art: React.FC<{ src: string; size: number; style?: React.CSSProperties }> = ({ src, size, style }) => (
  <Img src={staticFile(src)} style={{ width: size, height: size, display: 'block', ...style }} />
);

/** Kinetic word: masked slide-up + overshoot scale. */
export const Word: React.FC<{
  at: number; children: React.ReactNode; size?: number; color?: string; weight?: number;
  until?: number; delay?: number; style?: React.CSSProperties; tilt?: number;
}> = ({ at, children, size = 120, color = C.white, weight = 800, until, style, tilt = 0 }) => {
  const f = useCurrentFrame();
  const p = pop(f, at, { damping: 11, stiffness: 230, mass: 0.6 });
  const rise = interpolate(p, [0, 1], [size * 0.9, 0]);
  const o = until !== undefined ? out(f, until) : 1;
  if (f < at * FPS) return <span style={{ display: 'inline-block', width: 0 }} />;
  return (
    <span style={{ display: 'inline-block', overflow: 'hidden', padding: `0 ${size * 0.04}px`, marginRight: size * 0.16, verticalAlign: 'bottom', lineHeight: 1.08 }}>
      <span style={{
        display: 'inline-block', fontFamily: display, fontWeight: weight, fontSize: size, color,
        letterSpacing: -size * 0.035, transform: `translateY(${rise}px) rotate(${(1 - p) * tilt}deg) scale(${0.6 + 0.4 * p * o})`,
        transformOrigin: '50% 100%', opacity: o, ...style,
      }}>{children}</span>
    </span>
  );
};

/** Radial line burst. */
export const Burst: React.FC<{ x: number; y: number; at: number; color?: string; n?: number; r?: number; len?: number; w?: number; rot?: number }> = ({
  x, y, at, color = C.yellow, n = 10, r = 120, len = 70, w = 10, rot = 0,
}) => {
  const f = useCurrentFrame();
  const t = (f / FPS - at) / 0.5;
  if (t < 0 || t > 1) return null;
  const e = easeOut(t);
  const d0 = r * 0.5 + r * e, l = len * (1 - t) * (t < 0.15 ? t / 0.15 : 1);
  return (
    <svg style={{ position: 'absolute', left: x - 400, top: y - 400, width: 800, height: 800, overflow: 'visible', pointerEvents: 'none' }}>
      {Array.from({ length: n }).map((_, i) => {
        const a = (i / n) * Math.PI * 2 + rot;
        return <line key={i} x1={400 + Math.cos(a) * d0} y1={400 + Math.sin(a) * d0} x2={400 + Math.cos(a) * (d0 + l)} y2={400 + Math.sin(a) * (d0 + l)}
          stroke={color} strokeWidth={w * (1 - t * 0.6)} strokeLinecap="round" />;
      })}
    </svg>
  );
};

/** Expanding shockwave ring. */
export const Ring: React.FC<{ x: number; y: number; at: number; color?: string; r?: number; w?: number; dur?: number }> = ({
  x, y, at, color = C.white, r = 300, w = 18, dur = 0.6,
}) => {
  const f = useCurrentFrame();
  const t = (f / FPS - at) / dur;
  if (t < 0 || t > 1) return null;
  const e = easeOut(t);
  return (
    <svg style={{ position: 'absolute', left: x - 1500, top: y - 1500, width: 3000, height: 3000, pointerEvents: 'none' }}>
      <circle cx={1500} cy={1500} r={r * e + 10} fill="none" stroke={color} strokeWidth={w * (1 - t) + 0.5} opacity={1 - t * 0.6} />
    </svg>
  );
};

/** Gravity confetti. */
export const Confetti: React.FC<{ x: number; y: number; at: number; n?: number; spread?: number; seed?: number; colors?: string[]; up?: number }> = ({
  x, y, at, n = 40, spread = 900, seed = 1, colors = [C.yellow, C.coral, C.green, C.sky, C.pink, C.white], up = 1,
}) => {
  const f = useCurrentFrame();
  const t = f / FPS - at;
  if (t < 0 || t > 2.6) return null;
  return (
    <>
      {Array.from({ length: n }).map((_, i) => {
        const a = -Math.PI / 2 + (rand(i * 3 + seed) - 0.5) * Math.PI * 1.5;
        const v = (0.55 + rand(i * 7 + seed) * 0.6) * spread * up;
        const drag = 1 - Math.exp(-t * 3.2);
        const px = x + Math.cos(a) * v * drag / 1.6;
        const py = y + Math.sin(a) * v * drag / 1.6 + 380 * t * t;
        const rot = t * (300 + rand(i + seed) * 600) * (i % 2 ? 1 : -1);
        const sz = 14 + rand(i * 11 + seed) * 16;
        const shape = i % 3;
        const o = interpolate(t, [0, 0.05, 2.0, 2.6], [0, 1, 1, 0]);
        return (
          <div key={i} style={{
            position: 'absolute', left: px, top: py, width: sz, height: shape === 0 ? sz * 0.45 : sz,
            borderRadius: shape === 1 ? '50%' : 4, background: colors[i % colors.length], opacity: o,
            transform: `translate(-50%,-50%) rotate(${rot}deg) scaleX(${Math.cos(t * 9 + i)})`,
          }} />
        );
      })}
    </>
  );
};

/** 4-point twinkle star. */
export const Sparkle: React.FC<{ x: number; y: number; at: number; size?: number; color?: string; dur?: number }> = ({
  x, y, at, size = 40, color = C.white, dur = 0.7,
}) => {
  const f = useCurrentFrame();
  const t = (f / FPS - at) / dur;
  if (t < 0 || t > 1) return null;
  const s = Math.sin(t * Math.PI);
  return (
    <svg style={{ position: 'absolute', left: x - size, top: y - size, width: size * 2, height: size * 2, transform: `rotate(${t * 90}deg) scale(${s})` }} viewBox="-50 -50 100 100">
      <path d="M0 -50 Q6 -6 50 0 Q6 6 0 50 Q-6 6 -50 0 Q-6 -6 0 -50 Z" fill={color} />
    </svg>
  );
};

/** Diagonal bar wipe that fully covers the frame at `mid`. */
export const BarWipe: React.FC<{ mid: number; colors?: string[]; dur?: number; angle?: number }> = ({
  mid, colors = [C.yellow, C.violet, C.blue, C.ink], dur = 0.62, angle = -12,
}) => {
  const f = useCurrentFrame();
  const t = f / FPS;
  if (t < mid - dur / 2 - 0.2 || t > mid + dur / 2 + 0.3) return null;
  return (
    <AbsoluteFill style={{ pointerEvents: 'none', transform: `rotate(${angle}deg) scale(2.3)` }}>
      {colors.map((c, i) => {
        const st = mid - dur / 2 + i * 0.045;
        const inP = prog(f, st, st + dur / 2, (x) => 1 - Math.pow(1 - x, 3));
        const outP = prog(f, mid + i * 0.045, mid + i * 0.045 + dur / 2, (x) => x * x * x);
        const left = interpolate(inP, [0, 1], [-110, 0]) + interpolate(outP, [0, 1], [0, 110]);
        return <div key={i} style={{ position: 'absolute', left: `${left}%`, top: `${-10 + i * 30}%`, width: '100%', height: '31%', background: c }} />;
      })}
    </AbsoluteFill>
  );
};

/** Circle iris: grows from (x,y) to cover by `mid`, then reveals by opening a hole. */
export const Iris: React.FC<{ mid: number; x?: number; y?: number; color?: string; dur?: number; reveal?: boolean }> = ({
  mid, x = 960, y = 540, color = C.blue, dur = 0.45, reveal = true,
}) => {
  const f = useCurrentFrame();
  const { width: VW, height: VH } = useVideoConfig();
  const t = f / FPS;
  if (t < mid - dur || t > mid + (reveal ? dur : 0.02)) return null;
  const R = Math.hypot(VW, VH) * 1.2;
  if (t < mid) {
    const r = R * prog(f, mid - dur, mid, (x2) => x2 * x2 * x2);
    return <svg style={{ position: 'absolute', inset: 0, width: VW, height: VH }}><circle cx={x} cy={y} r={r} fill={color} /></svg>;
  }
  const hole = R * prog(f, mid, mid + dur, (x2) => 1 - Math.pow(1 - x2, 3));
  return (
    <svg style={{ position: 'absolute', inset: 0, width: VW, height: VH }}>
      <circle cx={VW / 2} cy={VH / 2} r={(R + hole) / 2} fill="none" stroke={color} strokeWidth={Math.max(0, R - hole)} />
    </svg>
  );
};

/** Full-frame flash. */
export const Flash: React.FC<{ at: number; color?: string; dur?: number; max?: number }> = ({ at, color = C.white, dur = 0.25, max = 1 }) => {
  const f = useCurrentFrame();
  const t = (f / FPS - at) / dur;
  if (t < 0 || t > 1) return null;
  return <AbsoluteFill style={{ background: color, opacity: (1 - t) * (1 - t) * max, pointerEvents: 'none' }} />;
};

/** Rounded pill/chip. */
export const Pill: React.FC<{ bg?: string; color?: string; size?: number; children: React.ReactNode; style?: React.CSSProperties; shadow?: string }> = ({
  bg = C.white, color = C.navy, size = 34, children, style, shadow,
}) => (
  <div style={{
    display: 'inline-flex', alignItems: 'center', gap: size * 0.35, padding: `${size * 0.36}px ${size * 0.7}px`, borderRadius: 999,
    background: bg, color, fontFamily: display, fontWeight: 800, fontSize: size, whiteSpace: 'nowrap',
    boxShadow: `0 ${size * 0.18}px 0 ${shadow ?? 'rgba(18,25,51,0.18)'}`, ...style,
  }}>{children}</div>
);

/** Chunky game-style card (solid bottom edge like the site's art). */
export const Card: React.FC<{ w: number; h?: number; bg?: string; edge?: string; r?: number; children?: React.ReactNode; style?: React.CSSProperties }> = ({
  w, h, bg = C.white, edge = '#D6DCF5', r = 28, children, style,
}) => (
  <div style={{ width: w, height: h, background: bg, borderRadius: r, boxShadow: `0 10px 0 ${edge}, 0 30px 60px rgba(18,25,51,0.22)`, position: 'relative', ...style }}>{children}</div>
);
