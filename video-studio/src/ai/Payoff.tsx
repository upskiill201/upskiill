import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { BookOpen, User, Clock } from 'lucide-react';
import { Ada } from '../components/Ada';
import { Bg } from '../components/Bg';
import { At, Art, Burst, Card, Confetti, Pill, Ring, Sparkle, Word } from '../components/fx';
import { Rays } from '../scenes/Logo';
import { NEON, NeonBg } from './kit';
import { C, FPS, body, display } from '../theme';
import { easeInOut, kickPulse, pop, prog, spr, squash } from '../lib/anim';

const clamp = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;

// 33.65 – 39.25s  "A few minutes a day, with streaks, leagues and friends to keep you going."
export const Habit: React.FC = () => {
  const f = useCurrentFrame();
  const t = f / FPS;
  const kp = kickPulse(f);
  const streak = interpolate(t, [36.04, 36.9], [1, 128], { ...clamp, easing: easeInOut });
  const friends = [{ n: 'K', c: C.coral }, { n: 'D', c: C.green }, { n: 'P', c: C.pink }, { n: 'T', c: C.sky }];
  return (
    <AbsoluteFill>
      <Bg from={C.blueSoft} to={C.blue} seed="habit" />
      <At x={960} y={110}>
        <div style={{ whiteSpace: 'nowrap' }}>
          <Word at={34.3} size={90}>A</Word><Word at={34.42} size={90}>few</Word>
          <Word at={34.59} size={90} color={C.yellow}>minutes</Word><Word at={34.98} size={90}>a</Word><Word at={35.12} size={90}>day.</Word>
        </div>
      </At>
      <At x={1530} y={115} s={pop(f, 34.59)} r={Math.sin(t * 6) * 6}><Clock size={90} color={C.yellow} strokeWidth={3} /></At>
      <At x={960} y={900 + (1 - spr(f, 33.6, { damping: 12 })) * 700} s={0.92}>
        <Ada poses={[{ t: 0, p: 'open' }, { t: 35.8, p: 'talk' }, { t: 37.6, p: 'cheer' }]} />
      </At>
      {/* streak */}
      <At x={360} y={520} s={pop(f, 36.04)} r={-5 + Math.sin(t * 2.4) * 2}>
        <Card w={380} h={380} r={44} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <Art src="art/burn.png" size={140} style={{ transform: `scale(${1 + kp * 0.12})`, transformOrigin: '50% 90%' }} />
          <div style={{ fontFamily: display, fontWeight: 800, fontSize: 110, color: C.orange, lineHeight: 1 }}>{Math.round(streak)}</div>
          <div style={{ fontFamily: display, fontWeight: 800, fontSize: 38, color: C.navy }}>day streak!</div>
        </Card>
      </At>
      <Burst x={360} y={520} at={36.04} n={12} r={260} color={C.yellow} />
      {/* league */}
      <At x={1560} y={470} s={pop(f, 36.59)} r={5 + Math.sin(t * 2.1) * 2}>
        <Card w={420} h={300} r={44} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
          <Art src="art/medal-1.svg" size={120} />
          <div style={{ fontFamily: display, fontWeight: 800, fontSize: 70, color: C.blue, lineHeight: 1 }}>#1</div>
          <div style={{ fontFamily: display, fontWeight: 800, fontSize: 34, color: C.navy }}>Diamond League</div>
        </Card>
      </At>
      <Burst x={1560} y={470} at={36.59} n={12} r={260} color={C.white} />
      {/* friends */}
      <At x={1560} y={830} s={pop(f, 37.15)}>
        <div style={{ display: 'flex' }}>
          {friends.map((fr, i) => (
            <div key={i} style={{ width: 120, height: 120, borderRadius: '50%', background: fr.c, border: '7px solid #fff', marginLeft: i ? -26 : 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: display, fontWeight: 800, fontSize: 54, color: '#fff',
              transform: `translateY(${Math.sin(t * 5 + i) * 8 - kp * 8}px) scale(${pop(f, 37.15 + i * 0.06)})` }}>{fr.n}</div>
          ))}
        </div>
      </At>
      {Array.from({ length: 8 }).map((_, i) => {
        const q = (t - 37.3 - i * 0.12) / 1.2;
        if (q < 0 || q > 1) return null;
        return <At key={i} x={1480 + (i % 4) * 50 + Math.sin(q * 6 + i) * 30} y={760 - q * 330} s={Math.sin(q * Math.PI)}><Art src="art/heart.svg" size={60} /></At>;
      })}
      <At x={360} y={840} s={pop(f, 37.63, { damping: 8 })} r={-6}>
        <Pill bg={C.yellow} color={C.ink} size={56} shadow={C.yellowDeep}>Keep going!</Pill>
      </At>
      <Sparkle x={620} y={330} at={36.2} size={36} />
    </AbsoluteFill>
  );
};

// 39.25 – 44.0s  "And you won't just know about AI. You'll be the one who can actually use it."
export const Payoff: React.FC = () => {
  const f = useCurrentFrame();
  const t = f / FPS;
  const kp = kickPulse(f);
  const book = pop(f, 39.6);
  const strike = prog(f, 40.4, 40.7);
  const bookOut = prog(f, 40.85, 41.1, (x) => x * x);
  const crowd = prog(f, 41.0, 41.4);
  const drop = t >= 42.0;
  const rise = spr(f, 41.02, { damping: 11, stiffness: 120 });
  const [sx, sy] = squash(f, 42.0, 0.14);
  return (
    <AbsoluteFill>
      {drop ? (
        <AbsoluteFill style={{ background: `radial-gradient(80% 80% at 50% 50%, ${C.blueSoft}, ${C.blueDeep})` }}><Rays speed={14} /></AbsoluteFill>
      ) : <NeonBg hue="#141B4E" speed={30} />}

      {/* know about AI → crossed out */}
      <At x={960} y={480 - bookOut * 600} s={book * (1 - strike * 0.12)} r={-3 + bookOut * -20} o={1 - bookOut}>
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 30, padding: '40px 60px', borderRadius: 40, background: 'rgba(255,255,255,0.1)', border: '3px solid rgba(255,255,255,0.25)' }}>
          <BookOpen size={110} color="rgba(255,255,255,0.8)" strokeWidth={2.2} />
          <span style={{ fontFamily: display, fontWeight: 800, fontSize: 96, color: `rgba(255,255,255,${0.95 - strike * 0.5})`, whiteSpace: 'nowrap' }}>Know about AI</span>
          <div style={{ position: 'absolute', left: 30, top: '50%', height: 18, width: `${strike * 92}%`, borderRadius: 9, background: C.coral, transform: 'rotate(-4deg)' }} />
        </div>
      </At>
      <At x={960} y={150} o={1 - bookOut}>
        <div style={{ whiteSpace: 'nowrap' }}><Word at={39.6} size={80}>You</Word><Word at={39.6} size={80}>won&apos;t</Word><Word at={39.83} size={80} color={C.coral}>just</Word></div>
      </At>

      {/* the crowd, and Ada rising out of it */}
      {!drop && Array.from({ length: 14 }).map((_, i) => {
        const x = 160 + i * 128 + (i > 6 ? 130 : 0);
        return (
          <At key={i} x={x} y={900 + (1 - crowd) * 300 + Math.sin(t * 2 + i) * 5} s={crowd}>
            <div style={{ width: 104, height: 104, borderRadius: '50%', background: 'rgba(255,255,255,0.12)', border: '3px solid rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <User size={58} color="rgba(255,255,255,0.55)" />
            </div>
          </At>
        );
      })}
      {!drop && t > 41.0 && <div style={{ position: 'absolute', left: 960 - 330, top: -100, width: 660, height: 1300, background: 'linear-gradient(180deg, rgba(92,225,255,0.35), transparent 85%)', clipPath: 'polygon(38% 0, 62% 0, 100% 100%, 0 100%)', opacity: crowd }} />}
      <At x={drop ? 880 : 960} y={interpolate(rise, [0, 1], [1500, drop ? 880 : 900])} s={drop ? 1.0 : 0.9} sx={sx} sy={sy}>
        <Ada poses={[{ t: 0, p: 'talk' }, { t: 41.0, p: 'open' }, { t: 42.0, p: 'cheer' }]} />
      </At>
      <At x={960} y={150} o={t > 41.0 && !drop ? 1 : 0}>
        <div style={{ whiteSpace: 'nowrap' }}><Word at={41.02} size={84}>You&apos;ll</Word><Word at={41.43} size={84}>be</Word><Word at={41.5} size={84}>the</Word><Word at={41.6} size={84} color={NEON} style={{ textShadow: `0 0 26px ${NEON}` }}>one</Word></div>
      </At>
      {drop && (
        <>
          <At x={430} y={330}>
            <div style={{ textAlign: 'right' }}>
              <div style={{ whiteSpace: 'nowrap' }}><Word at={42.0} size={86}>who</Word><Word at={41.94 + 0.08} size={86}>can</Word></div>
              <div style={{ whiteSpace: 'nowrap' }}><Word at={42.17} size={86} color={C.yellow}>actually</Word></div>
            </div>
          </At>
          <At x={1510} y={420} s={spr(f, 42.66, { damping: 7, stiffness: 260 }) * (1 + kp * 0.05)} r={-6}>
            <div style={{ fontFamily: display, fontWeight: 800, fontSize: 200, color: C.white, letterSpacing: -8, lineHeight: 1, whiteSpace: 'nowrap', textShadow: `0 14px 0 ${C.blueDeep}, 0 0 60px ${NEON}` }}>
              USE<span style={{ color: C.yellow }}> it.</span>
            </div>
          </At>
          <Ring x={1440} y={420} at={42.66} r={800} w={36} />
          <Burst x={1440} y={420} at={42.66} n={20} r={380} len={130} w={14} color={C.yellow} />
          <Confetti x={960} y={500} at={42.0} n={70} spread={1600} seed={9} />
          <Ring x={960} y={600} at={42.0} r={1000} w={44} color={NEON} />
          <Sparkle x={300} y={700} at={42.8} size={44} color={C.yellow} />
        </>
      )}
      <div style={{ position: 'absolute', fontFamily: body }} />
    </AbsoluteFill>
  );
};
