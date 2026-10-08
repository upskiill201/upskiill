import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { Ada } from '../components/Ada';
import { Bg } from '../components/Bg';
import { At, Art, Burst, Card, Confetti, Pill, Ring, Sparkle, Word } from '../components/fx';
import { Rays } from './Logo';
import { C, FPS, body, display } from '../theme';
import { easeInOut, kickPulse, pop, prog, spr, squash } from '../lib/anim';

const clamp = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;

const Rolling: React.FC<{ value: number; size: number; color: string }> = ({ value, size, color }) => {
  // odometer-style digits: each digit column scrolls
  const str = String(Math.floor(value)).padStart(3, ' ');
  const frac = value - Math.floor(value);
  return (
    <div style={{ display: 'flex', fontFamily: display, fontWeight: 800, fontSize: size, color, height: size * 1.05, overflow: 'hidden', lineHeight: 1.05, letterSpacing: -size * 0.04 }}>
      {str.split('').map((ch, i) => {
        const isLast = i === str.length - 1;
        const d = ch === ' ' ? null : +ch;
        if (d === null) return <span key={i} style={{ width: size * 0.1 }} />;
        const off = isLast ? frac : 0;
        return (
          <div key={i} style={{ transform: `translateY(${-off * size * 1.05}px)` }}>
            <div>{d}</div><div>{(d + 1) % 10}</div>
          </div>
        );
      })}
    </div>
  );
};

// 28 – 34.6s  "And because it feels like a game, you'll keep coming back. Day after day, until you finish."
export const Game: React.FC = () => {
  const f = useCurrentFrame();
  const t = f / FPS;
  const kp = kickPulse(f);

  const jump = Math.max(0, Math.sin(Math.min(1, Math.max(0, (t - 28.0) / 0.45)) * Math.PI)) * 120;
  const [asx, asy] = squash(f, 28.45, 0.15);
  const cardsOut = prog(f, 31.45, 31.75, (x) => x * x * x);

  const streak = interpolate(t, [29.72, 30.95], [1, 128], { ...clamp, easing: easeInOut });
  // leaderboard: You climbs 4 → 1
  const rows = [
    { n: 'Kemi A.', xp: 1180, c: C.coral }, { n: 'Daniel O.', xp: 1065, c: C.green }, { n: 'Priya S.', xp: 940, c: C.pink },
  ];
  const climb = (at: number) => spr(f, at, { damping: 13, stiffness: 200 });
  const youPos = 3 - climb(30.21) - climb(30.46) - climb(30.88); // 3 → 0
  const youXp = Math.round(interpolate(t, [30.0, 30.95], [905, 1240], clamp));

  const dayStart = 31.8, dayStep = 0.125, ND = 10;
  const daysOut = prog(f, 33.1, 33.3, (x) => x * x);
  const fill = interpolate(t, [33.25, 33.92], [0, 100], { ...clamp, easing: easeInOut });
  const done = pop(f, 33.92, { damping: 8 });

  return (
    <AbsoluteFill>
      <Bg from={C.blue} to="#3A1FB8" seed="game" pulse={1.6} />
      <Rays o={0.9} speed={10} color="rgba(255,255,255,0.06)" y={700} />

      {/* headline */}
      <At x={760} y={110} o={interpolate(t, [31.4, 31.6], [1, 0], clamp)}>
        <div style={{ whiteSpace: 'nowrap' }}>
          <Word at={28.13} size={84}>it</Word><Word at={28.51} size={84}>feels</Word><Word at={28.61} size={84}>like</Word><Word at={28.91} size={84}>a</Word>
        </div>
      </At>
      <At x={1390} y={110} s={pop(f, 29.2, { damping: 7 }) * (1 + kp * 0.06)} r={-8} o={interpolate(t, [31.4, 31.6], [1, 0], clamp)}>
        <Pill bg={C.yellow} color={C.ink} size={92} shadow={C.yellowDeep}>game!</Pill>
      </At>
      <Burst x={1400} y={110} at={29.2} n={14} r={240} color={C.yellow} />

      {/* streak card */}
      <At x={380 - cardsOut * 900} y={500} s={pop(f, 29.6)} r={-5 + Math.sin(t * 2.5) * 2}>
        <Card w={420} h={420} r={44} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <Art src="art/burn.png" size={150} style={{ transform: `scale(${1 + kp * 0.12}) rotate(${Math.sin(t * 9) * 4}deg)`, transformOrigin: '50% 90%' }} />
          <Rolling value={streak} size={120} color={C.orange} />
          <div style={{ fontFamily: display, fontWeight: 800, fontSize: 40, color: C.navy, marginTop: -4 }}>day streak!</div>
        </Card>
      </At>
      <Burst x={380} y={500} at={30.95} n={14} r={300} color={C.orange} />

      {/* league card */}
      <At x={1540 + cardsOut * 900} y={510} s={pop(f, 29.9)} r={4 + Math.sin(t * 2.2) * 1.5}>
        <Card w={520} h={500} r={44} style={{ padding: '26px 28px', boxSizing: 'border-box' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, fontFamily: display, fontWeight: 800, fontSize: 40, color: C.navy }}>
            <Art src="art/medal-1.svg" size={64} /> Diamond League
          </div>
          <div style={{ position: 'relative', marginTop: 18, height: 360 }}>
            {[...rows.map((r, i) => ({ ...r, pos: i + (youPos < i + 1 ? Math.min(1, i + 1 - youPos) : 0), you: false })),
              { n: 'You', xp: youXp, c: C.blue, pos: youPos, you: true }].map((r, i) => (
              <div key={i} style={{
                position: 'absolute', left: 0, right: 0, top: r.pos * 88, height: 76, borderRadius: 22, zIndex: r.you ? 5 : 1,
                background: r.you ? C.yellow : C.page, boxShadow: r.you ? `0 6px 0 ${C.yellowDeep}` : 'none',
                display: 'flex', alignItems: 'center', gap: 16, padding: '0 18px', transform: r.you ? `scale(${1.04 + kp * 0.03})` : undefined,
              }}>
                <span style={{ fontFamily: display, fontWeight: 800, fontSize: 30, color: C.navy, width: 30 }}>{Math.round(r.pos) + 1}</span>
                <div style={{ width: 48, height: 48, borderRadius: '50%', background: r.c, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: display, fontWeight: 800, fontSize: 26 }}>{r.n[0]}</div>
                <span style={{ flex: 1, fontFamily: body, fontWeight: 700, fontSize: 30, color: C.navy }}>{r.n}</span>
                <span style={{ fontFamily: body, fontWeight: 800, fontSize: 28, color: r.you ? C.navy : C.slate }}>{r.xp.toLocaleString('en-US')} XP</span>
              </div>
            ))}
          </div>
        </Card>
      </At>
      <Burst x={1540} y={420} at={30.88} n={12} r={320} color={C.yellow} />

      {/* chest → coins */}
      <At x={420 - cardsOut * 900} y={890} s={pop(f, 30.5)} sx={squash(f, 30.88, 0.25)[0]} sy={squash(f, 30.88, 0.25)[1]}>
        <Art src="art/chest-gold.svg" size={190} />
      </At>
      {t > 30.88 && t < 32.2 && Array.from({ length: 9 }).map((_, i) => {
        const q = (t - 30.88 - i * 0.03) / 0.8;
        if (q < 0 || q > 1) return null;
        const x = interpolate(q, [0, 1], [420, 1540 + (i - 4) * 18]);
        const y = 860 - Math.sin(q * Math.PI) * (380 + i * 20) + q * -420;
        return <At key={i} x={x} y={y} s={1 - q * 0.3} r={q * 720}><Art src="art/Coin.png" size={70} /></At>;
      })}
      <At x={420 - cardsOut * 900} y={760} s={pop(f, 31.0)} r={-6}>
        <Pill bg={C.white} color={C.ink} size={40}><Art src="art/Coin.png" size={48} />+50 coins</Pill>
      </At>

      {/* Day after day: flames ignite on every 16th */}
      {t > 31.6 && (
        <>
          <At x={960} y={130} o={1 - daysOut}>
            <div style={{ whiteSpace: 'nowrap' }}>
              <Word at={31.8} size={92}>Day</Word><Word at={32.24} size={92}>after</Word><Word at={32.74} size={92} color={C.yellow}>day,</Word>
            </div>
          </At>
          <At x={960} y={330} s={1 - daysOut * 0.3} o={1 - daysOut}>
            <div style={{ display: 'flex', gap: 22 }}>
              {Array.from({ length: ND }).map((_, i) => {
                const at = dayStart + i * dayStep;
                const p = pop(f, at, { damping: 9 });
                const lit = t >= at;
                return (
                  <div key={i} style={{ width: 118, height: 140, borderRadius: 30, background: lit ? C.white : 'rgba(255,255,255,0.15)', boxShadow: lit ? '0 8px 0 #C9D2FF' : 'none',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', transform: `translateY(${-p * 12 + (lit ? 12 : 0)}px) scale(${0.8 + 0.2 * Math.min(1, p)})` }}>
                    <div style={{ transform: `scale(${p})` }}><Art src="art/burn.png" size={70} /></div>
                    <span style={{ fontFamily: display, fontWeight: 800, fontSize: 28, color: lit ? C.navy : 'rgba(255,255,255,0.5)' }}>{i + 1}</span>
                  </div>
                );
              })}
            </div>
          </At>
        </>
      )}

      {/* until you finish */}
      {t > 33.1 && (
        <>
          <At x={960} y={250} s={pop(f, 33.1)}>
            <Card w={1100} h={210} r={50} style={{ padding: '30px 44px', boxSizing: 'border-box' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: display, fontWeight: 800, fontSize: 44, color: C.navy }}>
                <span>{fill >= 100 ? 'Course complete!' : 'Your course'}</span>
                <span style={{ color: fill >= 100 ? C.greenDeep : C.blue }}>{Math.round(fill)}%</span>
              </div>
              <div style={{ marginTop: 24, height: 56, borderRadius: 999, background: '#E8ECF8', overflow: 'hidden' }}>
                <div style={{ width: `${fill}%`, height: '100%', borderRadius: 999, background: `linear-gradient(90deg, ${C.green}, #4ADE80)`, boxShadow: 'inset 0 -8px 0 rgba(0,0,0,0.08)' }} />
              </div>
            </Card>
          </At>
          <At x={1560} y={190} s={done} r={interpolate(done, [0, 1], [-90, 10])}>
            <Art src="art/medal-1.svg" size={210} />
          </At>
          <Ring x={1560} y={190} at={33.92} r={500} color={C.yellow} w={30} />
          <Confetti x={960} y={260} at={33.92} n={70} spread={1500} seed={3} />
          <Sparkle x={420} y={150} at={34.0} size={44} color={C.yellow} />
        </>
      )}

      {/* Ada in the middle of it all */}
      <At x={960} y={860 - jump + (1 - spr(f, 27.9, { damping: 11 })) * 600} s={0.88} sx={asx} sy={asy}>
        <Ada poses={[{ t: 0, p: 'cheer' }, { t: 28.0, p: 'cheer' }, { t: 29.6, p: 'talk' }, { t: 30.88, p: 'fist' }, { t: 31.7, p: 'open' }, { t: 33.85, p: 'cheer' }]} />
      </At>
      <Ring x={960} y={700} at={28.0} r={900} color={C.white} w={40} />
      <Confetti x={960} y={700} at={28.0} n={50} spread={1400} seed={11} />
    </AbsoluteFill>
  );
};
