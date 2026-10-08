import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { User, GraduationCap, TrendingUp, Clock } from 'lucide-react';
import { Ada } from '../components/Ada';
import { At, Burst, Pill, Ring, Sparkle, Word } from '../components/fx';
import { Rays } from '../scenes/Logo';
import { NEON, NeonBg } from '../ai/kit';
import { C, FPS, body, display } from '../theme';
import { easeInOut, kickPulse, out, pop, prog, rand, spr, squash } from '../lib/anim';

const clamp = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;

export const Source: React.FC<{ o?: number }> = ({ o = 1 }) => (
  <div style={{ position: 'absolute', left: 60, bottom: 44, fontFamily: body, fontWeight: 600, fontSize: 24, color: 'rgba(255,255,255,0.6)', opacity: o }}>
    Source: World Economic Forum, Future of Jobs Report 2025
  </div>
);

/** 10×10 grid where `lit` cells (chosen in a ripple order) switch colour starting at `at`. */
export const Grid: React.FC<{ x: number; y: number; lit: number; at: number; dur: number; color: string; cell?: number; icon?: boolean; done?: number }> = ({ x, y, lit, at, dur, color, cell = 56, icon, done }) => {
  const f = useCurrentFrame();
  const t = f / FPS;
  const kp = kickPulse(f);
  const order = Array.from({ length: 100 }, (_, i) => i).sort((a, b) => rand(a * 7) - rand(b * 7));
  const rank = new Map(order.map((v, i) => [v, i]));
  return (
    <div style={{ position: 'absolute', left: x, top: y, display: 'grid', gridTemplateColumns: `repeat(10, ${cell}px)`, gap: cell * 0.22 }}>
      {Array.from({ length: 100 }).map((_, i) => {
        const r = rank.get(i)!;
        const on = r < lit;
        const when = at + (r / Math.max(1, lit)) * dur;
        const p = on ? pop(f, when, { damping: 9 }) : 0;
        const isOn = on && t >= when;
        const green = done !== undefined && isOn && t >= done + r * 0.006;
        const inP = pop(f, 0.15 + ((i % 10) + Math.floor(i / 10)) * 0.02, { damping: 14 });
        return (
          <div key={i} style={{ width: cell, height: cell, borderRadius: icon ? '50%' : cell * 0.28, transform: `scale(${inP * (isOn ? 1 + (1 - Math.min(1, p)) * 0.4 + kp * 0.05 : 0.85)})`,
            background: green ? C.green : isOn ? color : 'rgba(255,255,255,0.12)', boxShadow: isOn ? `0 0 ${cell * 0.4}px ${green ? C.green : color}88` : 'none',
            display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {icon && <User size={cell * 0.62} color={isOn ? '#fff' : 'rgba(255,255,255,0.45)'} strokeWidth={2.6} />}
          </div>
        );
      })}
    </div>
  );
};

// 0 – 7.3s  "The World Economic Forum says 39% of workers' core skills will change by 2030."
export const Stat39: React.FC = () => {
  const f = useCurrentFrame();
  const t = f / FPS;
  const kp = kickPulse(f);
  const n = Math.round(interpolate(t, [2.6, 3.4], [0, 39], { ...clamp, easing: easeInOut }));
  const year = Math.round(interpolate(t, [6.43, 6.95], [2025, 2030], clamp));
  return (
    <AbsoluteFill>
      <NeonBg hue="#1A1F5E" speed={25} />
      <At x={960} y={110} s={pop(f, 0.43, { damping: 13 })}>
        <Pill bg="rgba(255,255,255,0.1)" color="#fff" size={34} shadow="rgba(0,0,0,0.2)" style={{ border: '2px solid rgba(255,255,255,0.25)' }}>World Economic Forum · Future of Jobs Report 2025</Pill>
      </At>
      <At x={520} y={500} s={pop(f, 2.6, { damping: 10 }) * (1 + kp * 0.02)}>
        <div style={{ fontFamily: display, fontWeight: 800, fontSize: 340, color: C.yellow, letterSpacing: -14, lineHeight: 1, textShadow: `0 0 60px ${C.yellow}55` }}>{n}%</div>
      </At>
      <At x={520} y={720}>
        <div style={{ whiteSpace: 'nowrap' }}>
          <Word at={3.79} size={64}>of</Word><Word at={3.96} size={64}>workers&apos;</Word><Word at={4.52} size={64} color={NEON}>core</Word><Word at={4.85} size={64} color={NEON}>skills</Word>
        </div>
      </At>
      <At x={520} y={830}>
        <div style={{ whiteSpace: 'nowrap', display: 'flex', alignItems: 'center' }}>
          <Word at={5.29} size={64}>will</Word><Word at={5.5} size={64} color={C.coral}>change</Word><Word at={6.11} size={64}>by</Word>
          <span style={{ fontFamily: display, fontWeight: 800, fontSize: 64, color: '#fff', marginLeft: 10, transform: `scale(${pop(f, 6.43, { damping: 8 })})`, display: 'inline-block',
            padding: '4px 22px', borderRadius: 18, background: C.coral }}>{year}</span>
        </div>
      </At>
      <Grid x={1120} y={230} lit={39} at={3.0} dur={1.6} color={C.yellow} cell={58} />
      <At x={1440} y={940} s={pop(f, 4.7)}>
        <span style={{ fontFamily: body, fontWeight: 700, fontSize: 30, color: 'rgba(255,255,255,0.75)' }}>every square = 1% of core skills</span>
      </At>
      <Burst x={520} y={500} at={3.4} n={16} r={320} color={C.yellow} />
      <Ring x={520} y={500} at={3.4} r={500} color={C.yellow} w={22} />
      <Source />
    </AbsoluteFill>
  );
};

// 7.3 – 12.85s  "And 59 out of every 100 workers will need training to keep up."
export const Stat59: React.FC = () => {
  const f = useCurrentFrame();
  const t = f / FPS;
  const kp = kickPulse(f);
  const n = Math.round(interpolate(t, [7.46, 8.3], [0, 59], { ...clamp, easing: easeInOut }));
  return (
    <AbsoluteFill>
      <NeonBg hue="#2A1640" glow="rgba(255,107,91,0.16)" speed={25} />
      <Grid x={150} y={170} lit={59} at={7.5} dur={1.6} color={C.coral} cell={64} icon />
      <At x={1430} y={360} s={pop(f, 7.46, { damping: 10 }) * (1 + kp * 0.02)}>
        <div style={{ display: 'flex', alignItems: 'baseline', fontFamily: display, fontWeight: 800, color: '#fff', lineHeight: 1 }}>
          <span style={{ fontSize: 260, color: C.coral, letterSpacing: -10, textShadow: `0 0 60px ${C.coral}66` }}>{n}</span>
          <span style={{ fontSize: 90, color: 'rgba(255,255,255,0.75)', marginLeft: 12 }}>/100</span>
        </div>
      </At>
      <At x={1430} y={560}>
        <div style={{ whiteSpace: 'nowrap' }}><Word at={9.61} size={70}>workers</Word><Word at={10.23} size={70}>will</Word><Word at={10.8} size={70}>need</Word></div>
      </At>
      <At x={1430} y={700} s={pop(f, 11.12, { damping: 8 })} r={-4}>
        <Pill bg={C.coral} color="#fff" size={84} shadow="#C2412F"><GraduationCap size={84} strokeWidth={2.6} />training</Pill>
      </At>
      <Burst x={1430} y={700} at={11.12} n={14} r={300} color={C.coral} />
      <At x={1430} y={860}>
        <div style={{ whiteSpace: 'nowrap' }}><Word at={11.7} size={64}>to</Word><Word at={11.92} size={64}>keep</Word><Word at={12.31} size={64} color={C.yellow}>up.</Word></div>
      </At>
      <Source />
    </AbsoluteFill>
  );
};

// 12.85 – 17.25s  "So… will you be ready?  Here's how you stay ahead."
export const Ready: React.FC = () => {
  const f = useCurrentFrame();
  const t = f / FPS;
  const kp = kickPulse(f);
  const ahead = t >= 15.15;
  const bright = prog(f, 15.15, 17.2, (x) => x);
  const year = Math.round(interpolate(t, [13.3, 14.6], [2026, 2030], clamp));
  const lineP = prog(f, 15.6, 16.6, easeInOut);
  return (
    <AbsoluteFill>
      <NeonBg hue="#141B4E" speed={12} />
      <AbsoluteFill style={{ background: `radial-gradient(80% 80% at 50% 50%, ${C.blueSoft}, ${C.blueDeep})`, opacity: bright }} />
      <Rays o={bright} speed={10 + bright * 40} />
      {ahead && (
        <svg style={{ position: 'absolute', inset: 0 }} width={1920} height={1080}>
          <path d="M120 900 C 500 880, 800 700, 1100 520 S 1600 220, 1820 160" stroke={C.yellow} strokeWidth={18} fill="none" strokeLinecap="round" pathLength={1} strokeDasharray={`${lineP} 1`} />
        </svg>
      )}
      {/* spotlight on Ada */}
      <div style={{ position: 'absolute', left: 960 - 400, top: -100, width: 800, height: 1300, background: 'linear-gradient(180deg, rgba(255,255,255,0.28), transparent 85%)', clipPath: 'polygon(36% 0, 64% 0, 100% 100%, 0 100%)', opacity: 1 - bright }} />
      <At x={960} y={880 + (1 - spr(f, 12.85, { damping: 11 })) * 700} s={1} sx={squash(f, 13.2, 0.12)[0]} sy={squash(f, 13.2, 0.12)[1]}>
        <Ada poses={[{ t: 0, p: 'think' }, { t: 14.4, p: 'shrug' }, { t: 15.2, p: 'pointUpR' }, { t: 16.2, p: 'fist' }]} />
      </At>
      {!ahead && (
        <>
          <At x={960} y={140}>
            <div style={{ whiteSpace: 'nowrap' }}><Word at={13.24} size={96}>So…</Word><Word at={13.57} size={96}>will</Word><Word at={14.25} size={96} color={C.yellow}>you</Word><Word at={14.42} size={96}>be</Word><Word at={14.6} size={96}>ready?</Word></div>
          </At>
          <At x={1500} y={480} s={pop(f, 13.3)} r={Math.sin(t * 5) * 3}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 20, padding: '24px 40px', borderRadius: 34, background: 'rgba(255,255,255,0.1)', border: '3px solid rgba(255,255,255,0.25)' }}>
              <Clock size={80} color={C.yellow} style={{ transform: `rotate(${t * 360}deg)` }} />
              <span style={{ fontFamily: display, fontWeight: 800, fontSize: 96, color: '#fff' }}>{year}</span>
            </div>
          </At>
          <At x={420} y={500} s={pop(f, 14.6, { damping: 7 })} r={-12}>
            <div style={{ fontFamily: display, fontWeight: 800, fontSize: 280, color: C.yellow, textShadow: `0 12px 0 ${C.yellowDeep}` }}>?</div>
          </At>
        </>
      )}
      {ahead && (
        <>
          <At x={960} y={140}>
            <div style={{ whiteSpace: 'nowrap' }}><Word at={15.35} size={96}>Here&apos;s</Word><Word at={15.53} size={96}>how</Word><Word at={15.73} size={96}>you</Word>
              <Word at={15.85} size={96} color={C.yellow}>stay</Word><Word at={16.2} size={96} color={C.yellow}>ahead.</Word></div>
          </At>
          <At x={1700} y={300} s={pop(f, 16.2, { damping: 8 })}><TrendingUp size={140} color={C.yellow} strokeWidth={3} /></At>
          <Burst x={1700} y={300} at={16.2} n={14} r={240} color={C.yellow} />
          <Sparkle x={300} y={300} at={16.4} size={40} />
        </>
      )}
    </AbsoluteFill>
  );
};
