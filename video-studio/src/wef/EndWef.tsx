import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { Bell, Sparkles } from 'lucide-react';
import { Bg } from '../components/Bg';
import { At, Art, Burst, Confetti, Pill, Ring, Sparkle } from '../components/fx';
import { LogoTile, Rays } from '../scenes/Logo';
import { C, FPS, body, display } from '../theme';
import { kickPulse, pop, rand, spr, squash } from '../lib/anim';

const ANCHORS = [[170, 210], [1750, 190], [130, 600], [1800, 590], [330, 960], [1600, 970], [560, 110], [1370, 120], [1820, 900]];
const FLOAT = ['art/xp-bolt.svg', 'art/boost-coin.svg', 'art/heart.svg', 'art/chest-gold.svg', 'art/freeze.svg', 'art/medal-1.svg', 'art/level-hex.svg', 'art/Coin.png', 'art/burn.png'];

// 54 – 60s  End card: logo slam + launch line + CTA
export const EndWef: React.FC<{ kicker?: string }> = ({ kicker }) => {
  const f = useCurrentFrame();
  const t = f / FPS;
  const kp = kickPulse(f);
  const slam = spr(f, 40, { damping: 8, stiffness: 240, mass: 0.8 });
  const [sx, sy] = squash(f, 40.12, 0.2);
  const btn = squash(f, 44, 0.18);
  const drift = (t - 54) * 1;

  return (
    <AbsoluteFill>
      <Bg from={C.blueSoft} to={C.blueDeep} seed="end" pulse={1.2} />
      <Rays o={0.8} speed={6} y={380} />
      {/* drifting game art */}
      {FLOAT.map((src, i) => {
        const p = spr(f, 40.05 + i * 0.04, { damping: 14, stiffness: 90 });
        const [ax, ay] = ANCHORS[i];
        const x = 960 + (ax - 960) * p + Math.sin(t * 0.9 + i) * 18;
        const y = 360 + (ay - 360) * p + Math.sin(t * 2 + i) * 14;
        return <At key={i} x={x} y={y} s={p * (0.75 + rand(i) * 0.4)} r={Math.sin(t * 1.5 + i) * 14} o={0.95}><Art src={src} size={120} /></At>;
      })}
      <Ring x={960} y={360} at={40} r={1100} w={50} />
      <Ring x={960} y={360} at={40.1} r={800} w={26} color={C.yellow} />
      <Burst x={960} y={360} at={40} n={22} r={300} len={150} w={16} color={C.yellow} />
      <Confetti x={960} y={360} at={40} n={80} spread={1700} seed={77} />

      <At x={960} y={kicker ? 300 : 350} s={slam * (1 + kp * 0.02)} sx={sx * btn[0]} sy={sy * btn[1]} r={(1 - slam) * -25}>
        <LogoTile size={kicker ? 290 : 330} />
      </At>
      {kicker && (
        <At x={960} y={525} s={pop(f, 40.3)}>
          <Pill bg={C.ink} color={C.white} size={40} shadow="rgba(0,0,0,0.3)"><Sparkles size={38} color={C.yellow} fill={C.yellow} />{kicker}</Pill>
        </At>
      )}
      <At x={960} y={kicker ? 655 : 640} s={pop(f, 40.45)}>
        <div style={{ fontFamily: display, fontWeight: 800, fontSize: 104, color: C.white, letterSpacing: -4, whiteSpace: 'nowrap', textShadow: `0 8px 0 ${C.blueDeep}` }}>
          Launching <span style={{ color: C.yellow }}>November 2026</span>
        </div>
      </At>
      <At x={960} y={800} s={pop(f, 40.75) * (1 + kp * 0.03)} sx={btn[0]} sy={btn[1]}>
        <Pill bg={C.yellow} color={C.ink} size={58} shadow={C.yellowDeep}><Bell size={56} strokeWidth={3} />Get notified at teyro.app</Pill>
      </At>
      <At x={960} y={935} o={interpolate(t, [41.1, 41.5], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })}>
        <div style={{ fontFamily: body, fontWeight: 700, fontSize: 36, color: 'rgba(255,255,255,0.85)', whiteSpace: 'nowrap' }}>
          Free to start · iPhone, Android and web
        </div>
      </At>
      <Sparkle x={1150} y={190} at={40.4} size={46} />
      <Sparkle x={760} y={520} at={41} size={34} color={C.yellow} />
      <Sparkle x={1240} y={520} at={42} size={40} />
      <Sparkle x={1150} y={190} at={44.05} size={50} color={C.yellow} />
      {/* soft fade at the very end */}
      <AbsoluteFill style={{ background: C.ink, opacity: interpolate(t, [44.4, 45], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }) }} />
    </AbsoluteFill>
  );
};
