import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import { noise2D } from '@remotion/noise';
import { C, FPS } from '../theme';
import { kickPulse, rand } from '../lib/anim';

export const NEON = '#5CE1FF';
export const NIGHT = '#0B1030';

/** Dark "AI" backdrop: perspective grid floor, drifting glow orbs, scanlines. */
export const NeonBg: React.FC<{ hue?: string; speed?: number; glow?: string }> = ({ hue = '#1A2370', speed = 40, glow = 'rgba(92,225,255,0.18)' }) => {
  const f = useCurrentFrame();
  const { width: VW, height: VH } = useVideoConfig();
  const t = f / FPS;
  const kp = kickPulse(f);
  return (
    <AbsoluteFill style={{ background: `radial-gradient(100% 90% at 50% 35%, ${hue}, ${NIGHT})`, overflow: 'hidden' }}>
      {[0, 1, 2].map((i) => (
        <div key={i} style={{
          position: 'absolute', width: 900, height: 900, borderRadius: '50%',
          left: VW * 0.26 + noise2D('o' + i, t * 0.1, 0) * VW * 0.36 - 450, top: VH * 0.28 + noise2D('p' + i, 0, t * 0.1) * VH * 0.37 - 450,
          background: `radial-gradient(circle, ${i === 1 ? 'rgba(123,97,255,0.22)' : glow}, transparent 65%)`,
          transform: `scale(${1 + kp * 0.08})`,
        }} />
      ))}
      <div style={{ position: 'absolute', left: -1000, right: -1000, top: VH * 0.6, height: 900, transform: 'perspective(600px) rotateX(62deg)', transformOrigin: '50% 0%',
        backgroundImage: `linear-gradient(rgba(92,225,255,${0.22 + kp * 0.15}) 2px, transparent 2px), linear-gradient(90deg, rgba(92,225,255,${0.22 + kp * 0.15}) 2px, transparent 2px)`,
        backgroundSize: '90px 90px', backgroundPosition: `0 ${(t * speed) % 90}px`,
        maskImage: 'linear-gradient(to bottom, transparent, black 30%, black 60%, transparent)',
      }} />
      {Array.from({ length: 30 }).map((_, i) => {
        const y = (rand(i) * VH - t * (20 + rand(i + 5) * 40)) % VH;
        return <div key={i} style={{ position: 'absolute', left: rand(i + 9) * VW, top: y < 0 ? y + VH : y, width: 4, height: 4, borderRadius: 2, background: NEON, opacity: 0.25 + rand(i + 2) * 0.4 }} />;
      })}
      <AbsoluteFill style={{ backgroundImage: 'repeating-linear-gradient(0deg, rgba(255,255,255,0.025) 0 2px, transparent 2px 5px)' }} />
    </AbsoluteFill>
  );
};

/** Horizontal slice glitch transition, fully opaque at `mid`. */
export const GlitchWipe: React.FC<{ mid: number; colors?: string[]; dur?: number }> = ({ mid, colors = [NEON, C.violet, C.blue, NIGHT], dur = 0.36 }) => {
  const f = useCurrentFrame();
  const t = f / FPS;
  if (t < mid - dur || t > mid + dur) return null;
  const n = 14;
  return (
    <AbsoluteFill style={{ pointerEvents: 'none' }}>
      {Array.from({ length: n }).map((_, i) => {
        const d = rand(i * 13) * 0.12;
        const a = (t - (mid - dur + d)) / (dur - d);           // in
        const b = (t - (mid + d * 0.5)) / (dur - d * 0.5);      // out
        let x: number;
        if (t < mid) x = a <= 0 ? -1 : Math.min(0, -1 + Math.pow(Math.min(1, a), 0.5));
        else x = b <= 0 ? 0 : Math.min(1, Math.pow(b, 2));
        const dir = i % 2 ? 1 : -1;
        const jitter = (rand(f + i) - 0.5) * 30;
        return <div key={i} style={{ position: 'absolute', top: `${(i / n) * 100}%`, height: `${100 / n + 0.3}%`, left: 0, width: '100%',
          background: colors[i % colors.length], transform: `translateX(${x * 105 * dir}%) translateX(${jitter}px)` }} />;
      })}
    </AbsoluteFill>
  );
};

/** Neon glass panel. */
export const Glass: React.FC<{ w: number; h?: number; children?: React.ReactNode; style?: React.CSSProperties; glow?: string }> = ({ w, h, children, style, glow = NEON }) => (
  <div style={{ width: w, height: h, borderRadius: 30, background: 'linear-gradient(160deg, rgba(40,52,130,0.92), rgba(16,22,64,0.94))', border: `3px solid ${glow}66`,
    boxShadow: `0 0 40px ${glow}33, 0 30px 60px rgba(0,0,0,0.4)`, position: 'relative', boxSizing: 'border-box', ...style }}>{children}</div>
);
