import React from 'react';
import { Img } from 'remotion';
import { BODY, C, DISPLAY, E, img, k, lerp, sp } from './lib';

type CSS = React.CSSProperties;

/** A learner, drawn as two shapes so they can pop, fall, grey out and light up. */
export const Person: React.FC<{ x: number; y: number; size?: number; color: string; grey?: number; fallP?: number; seed?: number; scale?: number; glow?: number; flame?: number; style?: CSS }> = ({ x, y, size = 110, color, grey = 0, fallP = 0, seed = 1, scale = 1, glow = 0, flame = 0, style }) => {
  const dir = seed % 2 ? 1 : -1;
  const fy = fallP * fallP * 1100, fx = fallP * dir * 140, rot = fallP * dir * 75;
  const col = mixHex(color, '#C3C8D2', grey);
  return (
    <div style={{ position: 'absolute', left: x - size / 2, top: y - size / 2, width: size, height: size * 1.25, transform: `translate(${fx}px, ${fy}px) rotate(${rot}deg) scale(${scale})`, opacity: 1 - fallP * 0.6, transformOrigin: '50% 80%', ...style }}>
      {glow > 0 && <div style={{ position: 'absolute', inset: -size * 0.3, borderRadius: '50%', background: `radial-gradient(closest-side, ${color}${Math.round(glow * 120).toString(16).padStart(2, '0')}, transparent)` }} />}
      <div style={{ position: 'absolute', left: size * 0.3, top: 0, width: size * 0.4, height: size * 0.4, borderRadius: '50%', background: col }} />
      <div style={{ position: 'absolute', left: size * 0.12, top: size * 0.46, width: size * 0.76, height: size * 0.72, borderRadius: `${size * 0.38}px ${size * 0.38}px ${size * 0.12}px ${size * 0.12}px`, background: col }} />
      {flame > 0 && <Img src={img('burn.png')} style={{ position: 'absolute', left: size * 0.32, top: -size * 0.52, width: size * 0.36, transform: `scale(${flame})`, transformOrigin: '50% 100%' }} />}
    </div>
  );
};

export const mixHex = (a: string, b: string, p: number) => {
  if (p <= 0) return a;
  const pa = [1, 3, 5].map((i) => parseInt(a.slice(i, i + 2), 16)), pb = [1, 3, 5].map((i) => parseInt(b.slice(i, i + 2), 16));
  return '#' + pa.map((v, i) => Math.round(lerp(v, pb[i], Math.min(1, p))).toString(16).padStart(2, '0')).join('');
};

/** The phone the app lives in. Children render inside the screen (440 × 900 coordinate space). */
export const Phone: React.FC<{ x: number; y: number; t: number; at: number; children: React.ReactNode; bg?: string; tilt?: number; out?: number }> = ({ x, y, t, at, children, bg = '#F5F7FB', tilt = 0, out }) => {
  const p = sp(t, at, { damping: 15, stiffness: 140, mass: 0.9 });
  const o = out !== undefined ? k(t, out, out + 0.3, E.inBack) : 0;
  const W = 470, H = 960;
  return (
    <div style={{ position: 'absolute', left: x - W / 2, top: y - H / 2, width: W, height: H, perspective: 2000 }}>
      <div style={{ width: '100%', height: '100%', borderRadius: 72, background: '#0B1024', padding: 15, boxSizing: 'border-box', boxShadow: '0 60px 120px rgba(16,30,90,0.35), inset 0 0 0 3px #2A3150', transform: `translateY(${(1 - p) * 700 + o * 900}px) rotateY(${(1 - p) * -28 + tilt}deg) rotateZ(${(1 - p) * 6}deg)` }}>
        <div style={{ position: 'relative', width: '100%', height: '100%', borderRadius: 58, background: bg, overflow: 'hidden' }}>
          {children}
          <div style={{ position: 'absolute', left: '50%', top: 14, width: 120, height: 34, marginLeft: -60, borderRadius: 20, background: '#0B1024' }} />
        </div>
      </div>
    </div>
  );
};

/** A floating 3D chip that bobs around the phone (depth layer). */
export const Float: React.FC<{ t: number; at: number; x: number; y: number; children: React.ReactNode; seed?: number; out?: number; style?: CSS }> = ({ t, at, x, y, children, seed = 1, out, style }) => {
  const p = sp(t, at, { damping: 10, stiffness: 190, mass: 0.7 });
  if (p <= 0.001) return null;
  const o = out !== undefined ? k(t, out, out + 0.25, E.inBack) : 0;
  const bob = Math.sin(t * 2.2 + seed * 1.7) * 10;
  return (
    <div style={{ position: 'absolute', left: x, top: y + bob, transform: `translate(-50%, -50%) scale(${p * (1 - o)}) rotate(${Math.sin(t * 1.6 + seed) * 3 + (1 - p) * 20}deg)`, ...style }}>{children}</div>
  );
};

/** White rounded chip with an icon/art and a label. */
export const Chip: React.FC<{ icon?: React.ReactNode; text: React.ReactNode; color?: string; bg?: string; size?: number; style?: CSS }> = ({ icon, text, color = C.ink, bg = '#fff', size = 34, style }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: size * 0.35, padding: `${size * 0.42}px ${size * 0.75}px`, borderRadius: 999, background: bg, boxShadow: '0 18px 40px rgba(16,30,90,0.16), inset 0 -4px 0 rgba(0,0,0,0.06)', fontFamily: DISPLAY, fontWeight: 800, fontSize: size, color, whiteSpace: 'nowrap', ...style }}>
    {icon}{text}
  </div>
);

/** A phone notification card (used for life getting busy, and for Teyro's reminder). */
export const Notif: React.FC<{ icon: React.ReactNode; app: string; title: string; body?: string; width?: number; style?: CSS; iconBg?: string }> = ({ icon, app, title, body, width = 640, style, iconBg = '#E9EDF3' }) => (
  <div style={{ width, display: 'flex', gap: 22, padding: '22px 26px', borderRadius: 30, background: 'rgba(255,255,255,0.96)', boxShadow: '0 24px 50px rgba(20,30,60,0.18)', fontFamily: BODY, boxSizing: 'border-box', ...style }}>
    <div style={{ width: 64, height: 64, borderRadius: 18, background: iconBg, display: 'grid', placeItems: 'center', flexShrink: 0, overflow: 'hidden' }}>{icon}</div>
    <div style={{ minWidth: 0 }}>
      <div style={{ fontSize: 20, color: C.text2, fontWeight: 600, letterSpacing: '0.04em' }}>{app.toUpperCase()} · now</div>
      <div style={{ fontSize: 28, color: C.ink, fontWeight: 700, marginTop: 2 }}>{title}</div>
      {body && <div style={{ fontSize: 23, color: C.text2, marginTop: 4 }}>{body}</div>}
    </div>
  </div>
);
