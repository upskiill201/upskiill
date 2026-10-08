import React from 'react';
import { Img, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { FONT, P } from './tokens';
import { lerp, pop, prog, spr } from './anim';

const useT = () => { const frame = useCurrentFrame(); const { fps } = useVideoConfig(); return { frame, fps, t: frame / fps }; };

/**
 * A white "UI card" (README / plugin-page style from the references): mono header row, springs in at
 * `inAt`, slides/fades out at `outAt`. Children are absolutely positioned inside.
 */
export const Card: React.FC<{
  x: number; y: number; w: number; h: number; inAt: number; outAt?: number;
  header?: string; tag?: string; tilt?: number; dark?: boolean; children?: React.ReactNode;
}> = ({ x, y, w, h, inAt, outAt = Infinity, header, tag, tilt = 0, dark, children }) => {
  const { frame, fps, t } = useT();
  const enter = spr(frame, fps, inAt, { damping: 14, stiffness: 170 });
  const leave = prog(t, outAt - 0.25, outAt);
  if (enter <= 0 || leave >= 1) return null;
  return (
    <div style={{
      position: 'absolute', left: x, top: y, width: w, height: h, borderRadius: 26,
      background: dark ? P.navyCard : P.card, border: dark ? '1.5px solid rgba(255,255,255,0.12)' : `3px solid ${P.ink}`,
      boxShadow: dark ? '0 20px 60px rgba(0,0,0,0.5)' : `0 10px 0 ${P.ink}, 0 24px 50px rgba(0,0,0,0.10)`,
      transform: `translateY(${(1 - enter) * 80 - leave * 60}px) scale(${0.9 + 0.1 * enter}) rotate(${tilt}deg)`,
      opacity: Math.min(enter, 1 - leave), overflow: 'hidden',
    }}>
      {header && (
        <div style={{ position: 'absolute', left: 28, right: 28, top: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontFamily: FONT.mono, fontSize: 21, color: dark ? 'rgba(255,255,255,0.6)' : P.inkSoft }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}><span style={{ width: 13, height: 13, borderRadius: 7, background: P.red, display: 'inline-block' }} />{header}</span>
          {tag && <span style={{ background: P.red, color: '#fff', borderRadius: 999, padding: '4px 14px', fontSize: 18, fontWeight: 700 }}>{tag}</span>}
        </div>
      )}
      {children}
    </div>
  );
};

/** Odometer digits rolling from `from` to `to` between times a→b (reference: stars/installs/line counts). */
export const Odometer: React.FC<{ to: number; from?: number; a: number; b: number; size?: number; suffix?: string; color?: string; box?: boolean }> =
  ({ to, from = 0, a, b, size = 96, suffix = '', color = P.ink, box = true }) => {
    const { t } = useT();
    const v = lerp(from, to, prog(t, a, b));
    const digits = String(Math.max(Math.round(to), 1)).length;
    const h = size * 1.15;
    return (
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: box ? 6 : 0, fontFamily: FONT.black, fontWeight: 800, fontSize: size, color, lineHeight: `${h}px` }}>
        {Array.from({ length: digits }).map((_, i) => {
          const place = 10 ** (digits - 1 - i);
          // real odometer: only the last digit rolls smoothly; higher digits turn over as the one below passes 9
          const d = place === 1 ? v % 10 : (Math.floor(v / place) % 10) + Math.min(1, Math.max(0, (v % place) - (place - 1)));
          return (
            <div key={i} style={{ height: h, width: size * 0.66, overflow: 'hidden', position: 'relative', borderRadius: box ? 10 : 0, background: box ? '#F3F1ED' : 'transparent', border: box ? `3px solid ${P.ink}` : 'none' }}>
              <div style={{ position: 'absolute', left: 0, right: 0, top: -d * h, textAlign: 'center' }}>
                {Array.from({ length: 11 }).map((__, k) => <div key={k} style={{ height: h }}>{k % 10}</div>)}
              </div>
            </div>
          );
        })}
        {suffix && <span style={{ marginLeft: 8 }}>{suffix}</span>}
      </div>
    );
  };

/** Red rubber stamp that slams in (reference B "NOT THE FIX", A "APPROVED"). */
export const Stamp: React.FC<{ text: string; at: number; outAt?: number; x: number; y: number; rotate?: number; size?: number; color?: string }> =
  ({ text, at, outAt = Infinity, x, y, rotate = -12, size = 64, color = P.red }) => {
    const { frame, fps, t } = useT();
    if (t < at || t >= outAt) return null;
    const s = spr(frame, fps, at, { damping: 10, stiffness: 320, mass: 0.6 });
    return (
      <div style={{ position: 'absolute', left: x, top: y, transform: `rotate(${rotate}deg) scale(${2.2 - 1.2 * s})`, opacity: Math.min(1, s * 1.4), transformOrigin: 'center',
        border: `7px solid ${color}`, borderRadius: 14, padding: '6px 22px', color, fontFamily: FONT.black, fontWeight: 800, fontSize: size, letterSpacing: 3, textTransform: 'uppercase', background: 'rgba(255,255,255,0.0)', mixBlendMode: 'multiply' }}>
        {text}
      </div>
    );
  };

/** Horizontal bar that grows to `pct` between a→b, with a label and an optional value at the end. */
export const Bar: React.FC<{ label: string; pct: number; a: number; b: number; color: string; width: number; value?: React.ReactNode; dim?: boolean }> =
  ({ label, pct, a, b, color, width, value, dim }) => {
    const { t } = useT();
    const k = prog(t, a, b);
    return (
      <div style={{ opacity: dim ? 0.45 : 1 }}>
        <div style={{ fontFamily: FONT.mono, fontSize: 24, color: P.inkSoft, marginBottom: 10 }}>{label}</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <div style={{ width, height: 54, borderRadius: 14, background: '#EEEBE6', border: `3px solid ${P.ink}`, overflow: 'hidden' }}>
            <div style={{ width: `${pct * k}%`, height: '100%', background: color }} />
          </div>
          {value}
        </div>
      </div>
    );
  };

/** Bookmark "SAVE THIS" tag: the engagement layer's save prompt (§5.6). Visual only, never spoken. */
export const SaveTag: React.FC<{ at: number; x: number; y: number; outAt?: number }> = ({ at, x, y, outAt = Infinity }) => {
  const { frame, fps, t } = useT();
  const p = pop(frame, fps, at);
  if (p <= 0 || t > outAt) return null;
  return (
    <div style={{ position: 'absolute', left: x, top: y, transform: `scale(${p}) rotate(4deg)`, transformOrigin: 'right top', display: 'flex', alignItems: 'center', gap: 12,
      background: P.ink, color: '#fff', borderRadius: 999, padding: '14px 26px', fontFamily: FONT.mono, fontWeight: 700, fontSize: 26, boxShadow: `0 6px 0 ${P.red}` }}>
      <svg width="26" height="32" viewBox="0 0 26 32"><path d="M3 2 H23 V30 L13 22 L3 30 Z" fill={P.red} stroke="#fff" strokeWidth="2.5" strokeLinejoin="round" /></svg>
      SAVE THIS
    </div>
  );
};

/** Check tick that pops at `at`. */
export const Tick: React.FC<{ at: number; size?: number; color?: string }> = ({ at, size = 46, color = P.green }) => {
  const { frame, fps } = useT();
  const p = pop(frame, fps, at);
  return (
    <svg width={size} height={size} viewBox="0 0 46 46" style={{ transform: `scale(${p})`, flex: 'none' }}>
      <circle cx="23" cy="23" r="21" fill={color} />
      <path d="M13 24 L20 31 L33 16" stroke="#fff" strokeWidth="5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

/** The Teyro "Tey" tile logo (the only approved mark for videos). */
export const TeyLogo: React.FC<{ size: number }> = ({ size }) => (
  <Img src={staticFile('tey-tile.png')} style={{ width: size, height: size, borderRadius: size * 0.22, boxShadow: '0 12px 30px rgba(0,0,0,0.18)' }} />
);

/** Slides an element in from the bottom with a spring; use for chips and options. */
export const Rise: React.FC<{ at: number; children: React.ReactNode; style?: React.CSSProperties }> = ({ at, children, style }) => {
  const { frame, fps } = useT();
  const p = spr(frame, fps, at, { damping: 13, stiffness: 190 });
  return <div style={{ opacity: p, transform: `translateY(${(1 - p) * 40}px)`, ...style }}>{children}</div>;
};
