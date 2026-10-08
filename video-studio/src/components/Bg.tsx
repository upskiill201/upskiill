import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import { noise2D } from '@remotion/noise';
import { FPS } from '../theme';
import { kickPulse } from '../lib/anim';

/** Living backdrop: base gradient, drifting geometric shapes, dot grid — breathes with the kick. */
export const Bg: React.FC<{
  from: string; to: string; shape?: string; dots?: string; seed?: string; pulse?: number; spin?: number;
}> = ({ from, to, shape = 'rgba(255,255,255,0.08)', dots = 'rgba(255,255,255,0.12)', seed = 'a', pulse = 1, spin = 0 }) => {
  const f = useCurrentFrame();
  const { width: VW, height: VH } = useVideoConfig();
  const t = f / FPS;
  const kp = kickPulse(f) * pulse;
  const shapes = [
    { x: 180, y: 160, r: 220, k: 'c' }, { x: 1720, y: 900, r: 280, k: 'c' }, { x: 1650, y: 140, r: 120, k: 'sq' },
    { x: 260, y: 920, r: 140, k: 'ring' }, { x: 960, y: -60, r: 170, k: 'ring' }, { x: 1180, y: 1080, r: 110, k: 'sq' },
  ];
  return (
    <AbsoluteFill style={{ background: `radial-gradient(120% 120% at 50% 40%, ${from} 0%, ${to} 100%)`, overflow: 'hidden' }}>
      <AbsoluteFill style={{
        backgroundImage: `radial-gradient(${dots} 3px, transparent 3.5px)`, backgroundSize: '56px 56px',
        backgroundPosition: `${t * 20}px ${t * 12}px`, transform: `scale(${1 + kp * 0.015})`,
        maskImage: 'radial-gradient(70% 70% at 50% 50%, transparent 30%, black 100%)',
      }} />
      {shapes.map((sh, i) => {
        const nx = noise2D(seed + i, t * 0.15, 0) * 60, ny = noise2D(seed + i, 0, t * 0.15) * 60;
        const sc = 1 + kp * 0.06;
        const rot = t * (i % 2 ? 12 : -9) + spin * t * 60;
        const common: React.CSSProperties = {
          position: 'absolute', left: (sh.x * VW) / 1920 + nx - sh.r, top: (sh.y * VH) / 1080 + ny - sh.r, width: sh.r * 2, height: sh.r * 2,
          transform: `rotate(${rot}deg) scale(${sc})`,
        };
        if (sh.k === 'c') return <div key={i} style={{ ...common, borderRadius: '50%', background: shape }} />;
        if (sh.k === 'sq') return <div key={i} style={{ ...common, borderRadius: sh.r * 0.35, background: shape }} />;
        return <div key={i} style={{ ...common, borderRadius: '50%', border: `${sh.r * 0.22}px solid ${shape}` }} />;
      })}
    </AbsoluteFill>
  );
};
