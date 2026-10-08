import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { Flag, TrendingUp } from 'lucide-react';
import { Ada } from '../components/Ada';
import { At, Burst, Pill, Ring, Sparkle, Word } from '../components/fx';
import { C, FPS, body, display } from '../theme';
import { easeInOut, prog, spr } from '../lib/anim';

const CHIPS = [
  'Use AI tools', 'Build AI agents', 'Create automations', 'Web development', 'Mobile apps', 'Programming fundamentals', 'Software development',
];

// 38.45 – 44s  "Work is changing fast. Now, you get to stay ahead of it." (breakdown → riser)
export const Ahead: React.FC = () => {
  const f = useCurrentFrame();
  const t = f / FPS;
  const clamp = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;

  // conveyor rows of skills racing past (work is changing fast)
  const speed = interpolate(t, [38.5, 40.2], [300, 1300], clamp);
  const chipsOut = prog(f, 40.7, 41.1, (x) => x * x);
  // the chart
  const draw = prog(f, 40.98, 43.4, easeInOut);
  const pts = (k: number) => {
    // world: gentle slope; you: steeper climb that pulls ahead
    const x = 200 + k * 1500;
    const world = 860 - k * 260 - Math.sin(k * 9) * 18;
    const you = 900 - Math.pow(k, 1.35) * 560 - Math.sin(k * 7) * 14;
    return { x, world, you };
  };
  const N = 60;
  const path = (key: 'world' | 'you', upto: number) => {
    let d = '';
    for (let i = 0; i <= N; i++) {
      const k = (i / N) * upto;
      const p = pts(k);
      d += `${i ? 'L' : 'M'}${p.x.toFixed(1)} ${p[key].toFixed(1)} `;
    }
    return d;
  };
  const tip = pts(draw);
  const riser = prog(f, 42.2, 44, (x) => x * x);

  return (
    <AbsoluteFill style={{ background: `linear-gradient(180deg, ${C.ink}, #24307A)`, overflow: 'hidden' }}>
      <AbsoluteFill style={{ transform: `scale(${1 + riser * 0.12}) translateY(${riser * 60}px)` }}>
        {/* conveyor */}
        <AbsoluteFill style={{ opacity: 1 - chipsOut, transform: `translateY(${-chipsOut * 200}px)` }}>
          {[0, 1, 2, 3].map((row) => {
            const dir = row % 2 ? 1 : -1;
            const x = ((t - 38.4) * speed * dir) % 2400;
            return (
              <div key={row} style={{ position: 'absolute', top: 300 + row * 150, left: dir > 0 ? x - 2400 : x, display: 'flex', gap: 30, whiteSpace: 'nowrap',
                transform: `skewX(${-dir * Math.min(14, speed / 90)}deg)` }}>
                {[...CHIPS, ...CHIPS, ...CHIPS].map((c, i) => (
                  <Pill key={i} size={44} bg={(i + row) % 3 === 0 ? C.blue : 'rgba(255,255,255,0.1)'} color={C.white} shadow="rgba(0,0,0,0.25)">{c}</Pill>
                ))}
              </div>
            );
          })}
        </AbsoluteFill>
        <At x={960} y={150} o={1 - chipsOut}>
          <div style={{ whiteSpace: 'nowrap' }}>
            <Word at={38.76} size={100}>Work</Word><Word at={39.16} size={100}>is</Word>
            <Word at={39.39} size={100} color={C.sky}>changing</Word><Word at={40.12} size={100} color={C.yellow} tilt={-10}>fast.</Word>
          </div>
        </At>

        {/* chart */}
        {t > 40.8 && (
          <>
            <svg style={{ position: 'absolute', inset: 0 }} width={1920} height={1080}>
              {[0, 1, 2, 3].map((i) => <line key={i} x1={200} x2={1700} y1={300 + i * 180} y2={300 + i * 180} stroke="rgba(255,255,255,0.07)" strokeWidth={3} />)}
              <path d={path('world', draw)} stroke="rgba(255,255,255,0.35)" strokeWidth={10} fill="none" strokeDasharray="4 20" strokeLinecap="round" />
              <path d={`${path('you', draw)} L${tip.x} 1000 L200 1000 Z`} fill="url(#g)" opacity={0.35} />
              <path d={path('you', draw)} stroke={C.yellow} strokeWidth={16} fill="none" strokeLinecap="round" strokeLinejoin="round" />
              <defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={C.yellow} /><stop offset="1" stopColor={C.yellow} stopOpacity={0} /></linearGradient></defs>
            </svg>
            <At x={tip.x + 30} y={tip.world + 50} o={draw > 0.2 ? 1 : 0}>
              <span style={{ fontFamily: body, fontWeight: 700, fontSize: 30, color: 'rgba(255,255,255,0.55)' }}>the way work changes</span>
            </At>
            {/* Ada rides the tip of her line */}
            <At x={tip.x} y={tip.you - 150} s={0.36 * spr(f, 40.98, { damping: 11 })} r={-6}>
              <Ada poses={[{ t: 0, p: 'pointUpR' }, { t: 42.4, p: 'cheer' }]} bob={0.4} />
            </At>
            <At x={tip.x + 110} y={tip.you - 70} s={spr(f, 42.41, { damping: 9 })} r={8}>
              <Flag size={90} color={C.yellow} fill={C.yellow} strokeWidth={2.4} />
            </At>
            <At x={600} y={170}>
              <div style={{ whiteSpace: 'nowrap' }}>
                <Word at={41.0} size={92}>Now,</Word><Word at={41.56} size={92}>you</Word><Word at={42.17} size={92}>stay</Word>
              </div>
            </At>
            <At x={700} y={330} s={spr(f, 42.41, { damping: 9 })} r={-4}>
              <Pill size={100} bg={C.yellow} color={C.ink} shadow={C.yellowDeep}><TrendingUp size={96} strokeWidth={3} />ahead</Pill>
            </At>
            <Burst x={700} y={330} at={42.41} n={14} r={300} color={C.yellow} />
            <Ring x={tip.x} y={tip.you} at={42.41} r={400} color={C.yellow} />
            <Sparkle x={1500} y={180} at={42.9} size={40} color={C.yellow} />
          </>
        )}
      </AbsoluteFill>
      {/* riser streaks */}
      {riser > 0 && Array.from({ length: 24 }).map((_, i) => {
        const x = (i * 83) % 1920;
        const y = ((i * 397 + t * 2600) % 1400) - 200;
        return <div key={i} style={{ position: 'absolute', left: x, top: 1080 - y, width: 6, height: 140 * riser + 20, borderRadius: 3, background: 'rgba(255,255,255,0.5)', opacity: riser }} />;
      })}
      <AbsoluteFill style={{ background: C.white, opacity: interpolate(t, [43.75, 44.0], [0, 1], clamp) }} />
      <div style={{ display: 'none', fontFamily: display }} />
    </AbsoluteFill>
  );
};
