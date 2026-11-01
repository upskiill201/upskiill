import React from 'react';
import { FaGitAlt } from 'react-icons/fa';
import { AbsoluteFill, Img } from 'remotion';
import { C, kick } from './lib';

type CSS = React.CSSProperties;

/** Night stage: deep navy, a perspective dot floor drifting toward camera, glows that breathe on the kick. */
export const NightBg: React.FC<{ t: number; hue?: string; hue2?: string; floor?: boolean; speed?: number }> = ({ t, hue = C.blue, hue2 = C.indigo, floor = true, speed = 60 }) => {
  const kk = kick(t, 7);
  return (
    <AbsoluteFill style={{ background: `radial-gradient(120% 90% at 50% 0%, ${C.night2} 0%, ${C.night} 60%)`, overflow: 'hidden' }}>
      <div style={{ position: 'absolute', left: -300 + Math.sin(t * 0.6) * 120, top: -380, width: 1300, height: 1100, borderRadius: '50%', background: `radial-gradient(closest-side, ${hue}${hex(0.32 + kk * 0.18)}, transparent)`, filter: 'blur(20px)' }} />
      <div style={{ position: 'absolute', right: -360 + Math.cos(t * 0.5) * 140, bottom: -420, width: 1300, height: 1100, borderRadius: '50%', background: `radial-gradient(closest-side, ${hue2}${hex(0.28 + kk * 0.14)}, transparent)`, filter: 'blur(20px)' }} />
      {floor && (
        <div style={{ position: 'absolute', left: -960, right: -960, bottom: -300, height: 900, transform: 'perspective(700px) rotateX(68deg)', transformOrigin: '50% 0%',
          backgroundImage: `radial-gradient(circle, rgba(140,170,255,${0.35 + kk * 0.25}) 2px, transparent 2.6px)`, backgroundSize: '56px 56px', backgroundPosition: `0px ${(t * speed) % 56}px`,
          maskImage: 'linear-gradient(to bottom, transparent, black 40%, black)', WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 45%)' }} />
      )}
    </AbsoluteFill>
  );
};
const hex = (a: number) => Math.round(Math.max(0, Math.min(1, a)) * 255).toString(16).padStart(2, '0');
export const alpha = (c: string, a: number) => c + hex(a);

/** Light product stage (the app's --bg-section page) with soft brand blobs. */
export const LightBg: React.FC<{ t: number; tint?: string; tint2?: string; base?: string }> = ({ t, tint = '#DCE8FF', tint2 = '#E9E4FF', base = C.page }) => (
  <AbsoluteFill style={{ background: base, overflow: 'hidden' }}>
    <div style={{ position: 'absolute', left: -200 + Math.sin(t * 0.7) * 80, top: -300, width: 1100, height: 900, borderRadius: '50%', background: `radial-gradient(closest-side, ${tint}, transparent)` }} />
    <div style={{ position: 'absolute', right: -260, bottom: -360 + Math.cos(t * 0.6) * 80, width: 1200, height: 1000, borderRadius: '50%', background: `radial-gradient(closest-side, ${tint2}, transparent)` }} />
    <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle, rgba(7,18,51,0.07) 2px, transparent 2.5px)', backgroundSize: '48px 48px', backgroundPosition: `${(t * 18) % 48}px ${(t * 10) % 48}px` }} />
  </AbsoluteFill>
);

/** The Git mark (Font Awesome's git-alt glyph, react-icons/fa). */
export const GitMark: React.FC<{ size: number; style?: CSS; color?: string }> = ({ size, style, color = C.git }) => <FaGitAlt size={size} color={color} style={style} />;

/** GitHub Actions mark as drawn on the course art: a play node feeding a check-marked flow. */
export const ActionsMark: React.FC<{ size: number; color?: string; draw?: number }> = ({ size, color = '#fff', draw = 1 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" stroke={color} strokeWidth={6} strokeLinecap="round" strokeLinejoin="round">
    <circle cx="26" cy="24" r="14" pathLength={1} strokeDasharray="1" strokeDashoffset={1 - Math.min(1, draw * 3)} />
    <path d="M22 17 L33 24 L22 31 Z" fill={color} stroke="none" opacity={Math.min(1, draw * 3)} />
    <path d="M26 38 V60 a10 10 0 0 0 10 10 H44" pathLength={1} strokeDasharray="1" strokeDashoffset={1 - clamp((draw - 0.25) * 3)} />
    <circle cx="56" cy="70" r="12" pathLength={1} strokeDasharray="1" strokeDashoffset={1 - clamp((draw - 0.4) * 3)} />
    <path d="M50 70 l4 4 l8 -8" pathLength={1} strokeDasharray="1" strokeDashoffset={1 - clamp((draw - 0.55) * 3)} />
    <path d="M68 70 H76" opacity={clamp((draw - 0.6) * 3)} />
    <circle cx="86" cy="70" r="10" pathLength={1} strokeDasharray="1" strokeDashoffset={1 - clamp((draw - 0.7) * 3)} />
  </svg>
);
const clamp = (x: number) => Math.max(0, Math.min(1, x));

/** The app icon, as the logo. */
export const AppIcon: React.FC<{ size: number; src: string; style?: CSS; glow?: number }> = ({ size, src, style, glow = 0 }) => (
  // No clip mask, box-shadow or filter here: on the GPU renderer those made a scaled icon
  // render as pink noise on some frames. The PNG has its own transparent rounded corners,
  // and the shadow and glow are plain gradient layers.
  <div style={{ position: 'relative', width: size, height: size, ...style }}>
    {glow > 0.01 && <div style={{ position: 'absolute', inset: -size * 0.45, borderRadius: '50%', background: `radial-gradient(closest-side, rgba(255,255,255,${glow * 0.7}), rgba(255,255,255,0))` }} />}
    <div style={{ position: 'absolute', left: size * 0.04, right: size * 0.04, top: size * 0.14, bottom: -size * 0.1, borderRadius: size * 0.3, background: 'radial-gradient(closest-side, rgba(3,20,80,0.35), rgba(3,20,80,0))' }} />
    <Img src={src} style={{ position: 'relative', width: '100%', height: '100%', display: 'block' }} />
  </div>
);
