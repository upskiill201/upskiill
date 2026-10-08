import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { Sparkles, User, Route, Zap } from 'lucide-react';
import { Ada } from '../components/Ada';
import { At, Burst, Pill, Ring, Sparkle, Word } from '../components/fx';
import { NEON, NeonBg } from './kit';
import { C, FPS, display } from '../theme';
import { easeInOut, kickPulse, out, pop, prog, rand, spr } from '../lib/anim';

const COLS = 8, ROWS = 4;
const LIT = new Set([3, 10, 13, 20, 27]);

// 8.3 – 13.9s  "The people who stay relevant? The ones who know how to use AI."
export const Relevant: React.FC = () => {
  const f = useCurrentFrame();
  const t = f / FPS;
  const kp = kickPulse(f);
  const dim = prog(f, 10.54, 11.2);
  const rise = spr(f, 12.42, { damping: 10, stiffness: 150 });
  const sweep = prog(f, 9.0, 10.4, easeInOut);

  return (
    <AbsoluteFill>
      <NeonBg hue="#141B4E" speed={20} />
      {/* searchlight */}
      <div style={{ position: 'absolute', left: 1180 + Math.sin(sweep * Math.PI * 2) * 450 - 260, top: -200, width: 520, height: 1400,
        background: 'linear-gradient(180deg, rgba(255,255,255,0.18), transparent 80%)', clipPath: 'polygon(40% 0, 60% 0, 100% 100%, 0 100%)', opacity: 1 - dim }} />
      <At x={1180} y={150}>
        <div style={{ whiteSpace: 'nowrap' }}>
          <Word at={8.73} size={88} until={10.45}>Who</Word><Word at={9.32} size={88} until={10.45}>stays</Word>
          <Word at={9.71} size={88} color={C.yellow} until={10.45}>relevant?</Word>
        </div>
      </At>
      <At x={1180} y={150}>
        <div style={{ whiteSpace: 'nowrap' }}>
          <Word at={11.14} size={88}>The</Word><Word at={11.14} size={88}>ones</Word><Word at={11.44} size={88}>who</Word>
          <Word at={12.42} size={88} color={NEON} style={{ textShadow: `0 0 26px ${NEON}` }}>use</Word><Word at={13.03} size={88} color={NEON} style={{ textShadow: `0 0 26px ${NEON}` }}>AI.</Word>
        </div>
      </At>
      {/* the crowd */}
      {Array.from({ length: COLS * ROWS }).map((_, i) => {
        const col = i % COLS, row = Math.floor(i / COLS);
        const lit = LIT.has(i);
        const p = pop(f, 8.73 + (col + row) * 0.035);
        const x = 680 + col * 140 + (row % 2) * 30;
        const y = 380 + row * 160 - (lit ? rise * 70 : dim * 20);
        const glow = lit ? prog(f, 10.54 + (i % 5) * 0.06, 10.9 + (i % 5) * 0.06) : 0;
        return (
          <At key={i} x={x} y={y + Math.sin(t * 2 + i) * 4} s={p * (lit ? 1 + glow * 0.18 + kp * 0.05 : 1 - dim * 0.15)} z={lit ? 5 : 1}>
            <div style={{ position: 'relative', width: 110, height: 110, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: lit && glow > 0 ? C.blue : `rgba(255,255,255,${0.16 - dim * 0.1})`, border: `4px solid ${lit && glow > 0 ? NEON : 'rgba(255,255,255,0.2)'}`,
              boxShadow: lit ? `0 0 ${40 * glow}px ${NEON}` : 'none', opacity: lit ? 1 : 1 - dim * 0.55 }}>
              <User size={62} color={lit && glow > 0 ? '#fff' : 'rgba(255,255,255,0.7)'} strokeWidth={2.4} />
              {lit && glow > 0 && <Sparkles size={40} color={C.yellow} fill={C.yellow} style={{ position: 'absolute', right: -12, top: -14, transform: `scale(${glow})` }} />}
            </div>
          </At>
        );
      })}
      {[...LIT].map((i) => <Burst key={i} x={680 + (i % COLS) * 140 + (Math.floor(i / COLS) % 2) * 30} y={380 + Math.floor(i / COLS) * 160} at={12.42} n={8} r={110} len={34} w={6} color={NEON} />)}
      <At x={330} y={880} s={0.95}>
        <Ada poses={[{ t: 0, p: 'think' }, { t: 10.54, p: 'talk' }, { t: 12.3, p: 'pointUpR' }]} />
      </At>
    </AbsoluteFill>
  );
};

// 13.9 – 17.6s  "So here's your shortcut: the AI track."
export const Shortcut: React.FC = () => {
  const f = useCurrentFrame();
  const t = f / FPS;
  const kp = kickPulse(f);
  // the long way: a winding maze path; the shortcut: one bright line straight to the goal
  const maze = 'M220 900 L220 700 L520 700 L520 860 L820 860 L820 560 L420 560 L420 380 L1000 380 L1000 760 L1300 760 L1300 300 L1700 300';
  const mazeDraw = prog(f, 13.95, 14.7);
  const cut = prog(f, 14.72, 15.15, (x) => 1 - Math.pow(1 - x, 4));
  const S = { x: 220, y: 900 }, G = { x: 1700, y: 300 };
  return (
    <AbsoluteFill>
      <NeonBg hue="#1B2A7A" speed={60} />
      <svg style={{ position: 'absolute', inset: 0 }} width={1920} height={1080}>
        <path d={maze} fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth={22} strokeLinejoin="round" strokeLinecap="round" pathLength={1}
          strokeDasharray={`${mazeDraw} 1`} />
        <line x1={S.x} y1={S.y} x2={S.x + (G.x - S.x) * cut} y2={S.y + (G.y - S.y) * cut} stroke={NEON} strokeWidth={26} strokeLinecap="round" style={{ filter: `drop-shadow(0 0 18px ${NEON})` }} />
        <circle cx={S.x} cy={S.y} r={28} fill={C.white} />
      </svg>
      <At x={G.x} y={G.y} s={pop(f, 14.0) * (1 + kp * 0.06)}>
        <div style={{ width: 150, height: 150, borderRadius: '50%', background: C.yellow, boxShadow: `0 0 0 16px rgba(255,200,0,0.25), 0 10px 0 ${C.yellowDeep}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Zap size={80} color={C.ink} fill={C.ink} />
        </div>
      </At>
      <At x={G.x} y={G.y + 140} s={pop(f, 14.2)}>
        <span style={{ fontFamily: display, fontWeight: 800, fontSize: 40, color: C.white }}>Relevant</span>
      </At>
      <At x={560} y={470} s={pop(f, 14.0)} o={1 - cut * 0.6}>
        <Pill size={36} bg="rgba(255,255,255,0.12)" color="rgba(255,255,255,0.75)" shadow="rgba(0,0,0,0.2)"><Route size={36} />Figuring it out alone</Pill>
      </At>
      <Ring x={G.x} y={G.y} at={15.15} r={500} color={NEON} w={26} />
      <Burst x={G.x} y={G.y} at={15.15} n={16} r={260} color={NEON} />
      <At x={960} y={150}>
        <div style={{ whiteSpace: 'nowrap' }}>
          <Word at={14.14} size={84}>So</Word><Word at={14.21} size={84}>here&apos;s</Word><Word at={14.58} size={84}>your</Word>
          <Word at={14.72} size={84} color={C.yellow}>shortcut:</Word>
        </div>
      </At>
      <At x={1060} y={640} s={spr(f, 16.27, { damping: 8, stiffness: 220 })} r={-5}>
        <Pill bg={C.blue} color={C.white} size={120} shadow="#1E2FA8" style={{ border: `5px solid ${NEON}`, boxShadow: `0 14px 0 #1E2FA8, 0 0 60px ${NEON}88` }}>
          <Sparkles size={110} color={C.yellow} fill={C.yellow} />AI track
        </Pill>
      </At>
      <Burst x={1060} y={640} at={16.27} n={18} r={420} len={110} w={14} color={C.yellow} />
      <Sparkle x={1500} y={520} at={16.4} size={44} color={C.yellow} />
    </AbsoluteFill>
  );
};
