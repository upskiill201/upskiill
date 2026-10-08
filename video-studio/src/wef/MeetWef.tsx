import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { At, Art, Burst, Confetti, Ring, Word } from '../components/fx';
import { LogoTile, Rays } from '../scenes/Logo';
import { NEON } from '../ai/kit';
import { C, FPS } from '../theme';
import { kickPulse, pop, prog, spr, squash } from '../lib/anim';

// 17.6 – 20.05s  "Meet Teyro." — the drop
export const MeetWef: React.FC = () => {
  const f = useCurrentFrame();
  const t = f / FPS;
  const kp = kickPulse(f);
  const pre = pop(f, 17.65, { damping: 14, stiffness: 160 });
  const slam = t >= 18 ? spr(f, 18.0, { damping: 8, stiffness: 260, mass: 0.7 }) : 0;
  const [sx, sy] = squash(f, 18.0, 0.22);
  const scale = interpolate(pre, [0, 1], [0, 0.42]) + slam * 0.58 + kp * 0.03;
  const orbit = ['art/xp-bolt.svg', 'art/boost-coin.svg', 'art/heart.svg', 'art/chest-gold.svg', 'art/freeze.svg', 'art/medal-1.svg'];
  return (
    <AbsoluteFill style={{ background: `radial-gradient(80% 80% at 50% 45%, ${C.blueSoft}, ${C.blueDeep})`, overflow: 'hidden' }}>
      <Rays o={prog(f, 17.9, 18.2)} speed={16} />
      <At x={960} y={170} o={t < 18.0 ? 1 : Math.max(0, 1 - (t - 18.0) * 6)}><Word at={17.54} size={88}>Meet</Word></At>
      {orbit.map((src, i) => {
        const p = t >= 18 ? spr(f, 18.0 + i * 0.03, { damping: 12, stiffness: 120 }) : 0;
        const a = i * 1.05 + t * 0.6, R = 420 * p;
        return <At key={i} x={960 + Math.cos(a) * R * 1.25} y={450 + Math.sin(a) * R * 0.62} s={p * (0.9 + kp * 0.12)} r={Math.sin(t * 3 + i) * 12}><Art src={src} size={130} /></At>;
      })}
      <Ring x={960} y={450} at={18.0} r={900} w={40} />
      <Ring x={960} y={450} at={18.08} r={700} w={22} color={NEON} />
      <Burst x={960} y={450} at={18.0} n={18} r={330} len={140} w={14} color={C.yellow} />
      <At x={960} y={450} s={scale} sx={sx} sy={sy} r={interpolate(pre, [0, 1], [-40, -8]) + slam * 8}><LogoTile size={440} /></At>
      <Confetti x={960} y={450} at={18.0} n={60} spread={1400} seed={5} />
      <At x={960} y={830}>
        <div style={{ whiteSpace: 'nowrap' }}>
          <Word at={18.4} size={70}>The</Word><Word at={18.48} size={70}>fun</Word><Word at={18.56} size={70}>way</Word><Word at={18.64} size={70}>to</Word><Word at={18.72} size={70} color={C.yellow}>finish</Word>
        </div>
      </At>
      <At x={960} y={925}>
        <div style={{ whiteSpace: 'nowrap' }}>
          <Word at={18.85} size={70}>learning</Word><Word at={18.93} size={70} color={C.yellow}>coding</Word><Word at={19.01} size={70}>and</Word><Word at={19.09} size={70} color={C.yellow}>AI.</Word>
        </div>
      </At>
    </AbsoluteFill>
  );
};

