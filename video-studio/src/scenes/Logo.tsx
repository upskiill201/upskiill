import React from 'react';
import { AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame } from 'remotion';
import { At, Art, Burst, Confetti, Ring, Sparkle, Word } from '../components/fx';
import { C, FPS, display } from '../theme';
import { kickPulse, pop, prog, spr, squash } from '../lib/anim';

/** Rotating sunburst rays. */
export const Rays: React.FC<{ color?: string; n?: number; speed?: number; o?: number; x?: number; y?: number }> = ({
  color = 'rgba(255,255,255,0.07)', n = 18, speed = 8, o = 1, x = 960, y = 540,
}) => {
  const f = useCurrentFrame();
  const rot = (f / FPS) * speed;
  return (
    <svg style={{ position: 'absolute', left: x - 1600, top: y - 1600, width: 3200, height: 3200, opacity: o, transform: `rotate(${rot}deg)` }} viewBox="-1600 -1600 3200 3200">
      {Array.from({ length: n }).map((_, i) => {
        const a0 = (i / n) * Math.PI * 2, a1 = a0 + Math.PI / n;
        return <path key={i} d={`M0 0 L${Math.cos(a0) * 1600} ${Math.sin(a0) * 1600} L${Math.cos(a1) * 1600} ${Math.sin(a1) * 1600} Z`} fill={color} />;
      })}
    </svg>
  );
};

export const LogoTile: React.FC<{ size: number }> = ({ size }) => (
  <div style={{ width: size, height: size, borderRadius: size * 0.22, overflow: 'hidden', boxShadow: `0 ${size * 0.05}px 0 rgba(15,25,90,0.45), 0 ${size * 0.12}px ${size * 0.3}px rgba(10,15,60,0.45)` }}>
    <Img src={staticFile('logo.png')} style={{ width: '100%', height: '100%', display: 'block' }} />
  </div>
);

// 7.45 – 10s  "Meet Teyro." — the drop
export const Logo: React.FC = () => {
  const f = useCurrentFrame();
  const t = f / FPS;
  const kp = kickPulse(f);
  const pre = pop(f, 7.55, { damping: 14, stiffness: 160 });
  const slam = t >= 8 ? spr(f, 8.0, { damping: 8, stiffness: 260, mass: 0.7 }) : 0;
  const [sx, sy] = squash(f, 8.0, 0.22);
  const scale = interpolate(pre, [0, 1], [0, 0.42]) + slam * 0.58 + kp * 0.03;
  const rot = interpolate(pre, [0, 1], [-40, -8]) + slam * 8;
  const orbit = [
    { src: 'art/xp-bolt.svg', a: 0 }, { src: 'art/boost-coin.svg', a: 1.1 }, { src: 'art/heart.svg', a: 2.2 },
    { src: 'art/chest-gold.svg', a: 3.2 }, { src: 'art/freeze.svg', a: 4.2 }, { src: 'art/medal-1.svg', a: 5.2 },
  ];
  const zoomOut = prog(f, 8.0, 10, (x) => x);
  return (
    <AbsoluteFill style={{ background: `radial-gradient(80% 80% at 50% 45%, ${C.blueSoft}, ${C.blueDeep})`, overflow: 'hidden' }}>
      <Rays o={prog(f, 7.9, 8.2)} speed={14} />
      <AbsoluteFill style={{ transform: `scale(${1.08 - zoomOut * 0.08})` }}>
        <At x={960} y={170} s={1} o={t < 8.0 ? 1 : Math.max(0, 1 - (t - 8.0) * 6)}>
          <Word at={7.29} size={88}>Meet</Word>
        </At>
        {/* orbiting game art, flung out by the drop */}
        {orbit.map((o, i) => {
          const p = t >= 8 ? spr(f, 8.0 + i * 0.03, { damping: 12, stiffness: 120 }) : 0;
          const a = o.a + t * 0.6;
          const R = 420 * p;
          return (
            <At key={i} x={960 + Math.cos(a) * R * 1.25} y={450 + Math.sin(a) * R * 0.62} s={p * (0.9 + kp * 0.12)} r={Math.sin(t * 3 + i) * 12}>
              <Art src={o.src} size={130} />
            </At>
          );
        })}
        <Ring x={960} y={450} at={8.0} r={900} w={40} color={C.white} />
        <Ring x={960} y={450} at={8.08} r={700} w={22} color={C.yellow} />
        <Burst x={960} y={450} at={8.0} n={18} r={330} len={140} w={14} color={C.yellow} />
        <At x={960} y={450} s={scale} sx={sx} sy={sy} r={rot}>
          <LogoTile size={440} />
        </At>
        <Confetti x={960} y={450} at={8.0} n={60} spread={1400} />
        <At x={960} y={810} s={1}>
          <div style={{ whiteSpace: 'nowrap', textAlign: 'center' }}>
            <Word at={8.45} size={68}>The</Word><Word at={8.53} size={68}>fun</Word><Word at={8.61} size={68}>way</Word>
            <Word at={8.69} size={68}>to</Word><Word at={8.77} size={68} color={C.yellow}>finish</Word>
          </div>
        </At>
        <At x={960} y={900}>
          <div style={{ whiteSpace: 'nowrap', textAlign: 'center' }}>
            <Word at={8.95} size={68}>learning</Word><Word at={9.05} size={68}>coding</Word><Word at={9.13} size={68}>and</Word>
            <Word at={9.21} size={68}>AI.</Word>
          </div>
        </At>
        <Sparkle x={1210} y={260} at={8.3} size={40} />
        <Sparkle x={700} y={640} at={8.6} size={30} />
        <Sparkle x={1260} y={640} at={9.1} size={34} color={C.yellow} />
        <div style={{ position: 'absolute', fontFamily: display }} />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
