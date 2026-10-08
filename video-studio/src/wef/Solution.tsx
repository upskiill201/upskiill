import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { Code2, Sparkles, Megaphone, Palette, Calculator, Stethoscope, LineChart, Headphones, Check, Clock, Globe, RefreshCw } from 'lucide-react';
import { Ada } from '../components/Ada';
import { Bg } from '../components/Bg';
import { At, Art, Burst, Card, Confetti, Pill, Ring, Sparkle, Word } from '../components/fx';
import { NEON, NeonBg } from '../ai/kit';
import { Grid } from './Stats';
import { C, FPS, body, display, mono } from '../theme';
import { easeInOut, kickPulse, pop, prog, spr } from '../lib/anim';

const clamp = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;
const JOBS = [Megaphone, Palette, Calculator, Stethoscope, LineChart, Headphones];

// 19.3 – 25.1s  "Learn coding and AI, the skills reshaping every job, in just a few minutes a day."
export const Learn: React.FC = () => {
  const f = useCurrentFrame();
  const t = f / FPS;
  const kp = kickPulse(f);
  const tilesUp = prog(f, 20.9, 21.3, easeInOut);
  const ring = prog(f, 21.1, 21.6, easeInOut);
  const mins = prog(f, 23.6, 24.6, easeInOut);
  return (
    <AbsoluteFill>
      <Bg from={C.blueSoft} to={C.blueDeep} seed="learn" />
      <At x={960} y={110}>
        <div style={{ whiteSpace: 'nowrap' }}><Word at={19.3} size={92}>Learn</Word><Word at={19.61} size={92} color={C.yellow}>coding</Word><Word at={20.06} size={92}>and</Word><Word at={20.34} size={92} color={NEON}>AI</Word></div>
      </At>
      {/* the two tracks at the centre, jobs orbit and get "reshaped" */}
      {[{ at: 19.61, l: 'Coding', I: Code2, bg: C.yellow, fg: C.ink, x: -150 }, { at: 20.34, l: 'AI', I: Sparkles, bg: C.white, fg: C.blue, x: 150 }].map((tk, i) => (
        <At key={i} x={760 + tk.x * (1 - tilesUp * 0.35)} y={interpolate(tilesUp, [0, 1], [520, 560])} s={pop(f, tk.at) * (1 - tilesUp * 0.35) * (1 + kp * 0.03)} r={i ? 6 : -6}>
          <Card w={270} h={260} bg={tk.bg} edge={i ? '#C9D2FF' : C.yellowDeep} r={44} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12, color: tk.fg }}>
            <tk.I size={90} strokeWidth={3} /><span style={{ fontFamily: display, fontWeight: 800, fontSize: 64 }}>{tk.l}</span>
          </Card>
        </At>
      ))}
      {JOBS.map((J, i) => {
        const a = (i / JOBS.length) * Math.PI * 2 - Math.PI / 2 + t * 0.25;
        const R = 330 * ring;
        const reshaped = t > 21.62 + i * 0.12;
        return (
          <At key={i} x={760 + Math.cos(a) * R * 1.25} y={560 + Math.sin(a) * R * 0.95} s={ring * (reshaped ? 1.05 + kp * 0.06 : 0.9)}>
            <div style={{ position: 'relative', width: 120, height: 120, borderRadius: 36, background: reshaped ? C.violet : 'rgba(255,255,255,0.18)', border: `4px solid ${reshaped ? NEON : 'rgba(255,255,255,0.3)'}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: reshaped ? `0 0 30px ${NEON}88` : 'none' }}>
              <J size={60} color="#fff" strokeWidth={2.4} />
              {reshaped && <Sparkles size={36} color={C.yellow} fill={C.yellow} style={{ position: 'absolute', right: -14, top: -16 }} />}
            </div>
          </At>
        );
      })}
      <At x={760} y={960}>
        <div style={{ whiteSpace: 'nowrap' }}><Word at={21.0} size={62}>the</Word><Word at={21.13} size={62}>skills</Word><Word at={21.62} size={62} color={NEON}>reshaping</Word><Word at={22.35} size={62}>every</Word><Word at={22.92} size={62} color={C.yellow}>job</Word></div>
      </At>
      {/* a few minutes a day */}
      <At x={1550} y={540} s={pop(f, 23.57, { damping: 9 })}>
        <Card w={420} h={420} r={60} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
          <svg width={220} height={220} viewBox="-110 -110 220 220">
            <circle r={88} fill="none" stroke={C.blueTint} strokeWidth={26} />
            <circle r={88} fill="none" stroke={C.blue} strokeWidth={26} strokeLinecap="round" strokeDasharray={`${2 * Math.PI * 88 * mins * 0.25} 999`} transform="rotate(-90)" />
            <Clock x={-40} y={-40} width={80} height={80} color={C.navy} />
          </svg>
          <div style={{ fontFamily: display, fontWeight: 800, fontSize: 46, color: C.navy }}>a few minutes</div>
          <div style={{ fontFamily: display, fontWeight: 800, fontSize: 40, color: C.blue }}>a day</div>
        </Card>
      </At>
      <Burst x={1550} y={540} at={24.67} n={14} r={300} color={C.yellow} />
    </AbsoluteFill>
  );
};

// 25.1 – 29.4s  "Practise for real, keep your streak going, and actually finish."
export const Practise: React.FC = () => {
  const f = useCurrentFrame();
  const t = f / FPS;
  const kp = kickPulse(f);
  const streak = Math.round(interpolate(t, [26.84, 27.5], [1, 128], { ...clamp, easing: easeInOut }));
  const fill = interpolate(t, [27.98, 28.69], [0, 100], { ...clamp, easing: easeInOut });
  const cards = [
    { at: 25.1, x: 380, r: -4 }, { at: 26.43, x: 960, r: 3 }, { at: 27.78, x: 1540, r: -3 },
  ];
  return (
    <AbsoluteFill>
      <Bg from={C.blue} to="#3A1FB8" seed="pr" pulse={1.4} />
      <At x={960} y={130}>
        <div style={{ whiteSpace: 'nowrap' }}><Word at={25.1} size={72}>Practise</Word><Word at={25.54} size={72}>for</Word><Word at={25.74} size={72} color={C.yellow}>real.</Word>
          <Word at={26.43} size={72}>Keep</Word><Word at={26.84} size={72} color={C.orange}>streaks.</Word><Word at={27.98} size={72} color={C.green}>Finish.</Word></div>
      </At>
      {/* 1: real practice w/ instant feedback */}
      <At x={cards[0].x} y={560} s={pop(f, cards[0].at)} r={cards[0].r}>
        <Card w={480} h={420} r={44} style={{ overflow: 'hidden' }}>
          <div style={{ padding: '34px 34px 0', fontFamily: mono, fontSize: 36, lineHeight: 1.6, color: C.navy, whiteSpace: 'pre' }}>{'function add(a, b) {\n  return a + b\n}'}</div>
          <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 130, background: C.green, display: 'flex', alignItems: 'center', gap: 16, padding: '0 26px',
            transform: `translateY(${(1 - pop(f, 25.74)) * 140}px)`, fontFamily: display, fontWeight: 800, fontSize: 40, color: '#fff' }}>
            <div style={{ width: 62, height: 62, borderRadius: 31, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Check size={42} color={C.greenDeep} strokeWidth={4} /></div>
            Nice! +10 XP
          </div>
        </Card>
      </At>
      {/* 2: streak */}
      <At x={cards[1].x} y={560} s={pop(f, cards[1].at)} r={cards[1].r}>
        <Card w={420} h={420} r={44} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <Art src="art/burn.png" size={160} style={{ transform: `scale(${1 + kp * 0.12})`, transformOrigin: '50% 90%' }} />
          <div style={{ fontFamily: display, fontWeight: 800, fontSize: 120, color: C.orange, lineHeight: 1 }}>{streak}</div>
          <div style={{ fontFamily: display, fontWeight: 800, fontSize: 40, color: C.navy }}>day streak!</div>
        </Card>
      </At>
      {/* 3: finish */}
      <At x={cards[2].x} y={560} s={pop(f, cards[2].at)} r={cards[2].r}>
        <Card w={480} h={420} r={44} style={{ padding: '36px 34px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: display, fontWeight: 800, fontSize: 38, color: C.navy }}>
            <span>{fill >= 100 ? 'Course complete!' : 'Your course'}</span><span style={{ color: fill >= 100 ? C.greenDeep : C.blue }}>{Math.round(fill)}%</span>
          </div>
          <div style={{ marginTop: 26, height: 50, borderRadius: 999, background: '#E8ECF8', overflow: 'hidden' }}>
            <div style={{ width: `${fill}%`, height: '100%', borderRadius: 999, background: `linear-gradient(90deg, ${C.green}, #4ADE80)` }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: 26, transform: `scale(${pop(f, 28.69, { damping: 7 })})` }}><Art src="art/medal-1.svg" size={130} /></div>
        </Card>
      </At>
      <Burst x={380} y={640} at={25.74} n={12} r={280} color={C.green} />
      <Burst x={960} y={560} at={27.5} n={12} r={280} color={C.orange} />
      <Ring x={1540} y={560} at={28.69} r={500} color={C.yellow} w={26} />
      <Confetti x={1540} y={500} at={28.69} n={50} spread={1100} seed={33} />
    </AbsoluteFill>
  );
};

// 29.4 – 36.95s  "And as the world keeps changing, you keep learning. So you stay relevant, now and next."
export const StayRelevant: React.FC = () => {
  const f = useCurrentFrame();
  const t = f / FPS;
  const kp = kickPulse(f);
  const relevant = t >= 33.61;
  const TAGS = ['New AI tools', 'Automation', 'New roles', 'Agents', 'New skills'];
  return (
    <AbsoluteFill>
      <NeonBg hue="#1A2370" speed={30} />
      {/* the changing world */}
      <At x={480} y={560} s={pop(f, 29.5, { damping: 13 }) * (1 + kp * 0.03)}>
        <div style={{ width: 380, height: 380, borderRadius: '50%', background: `radial-gradient(circle at 35% 35%, ${C.blueSoft}, ${C.blueDeep})`, boxShadow: `0 0 80px ${NEON}55`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Globe size={300} color="rgba(255,255,255,0.85)" strokeWidth={1.2} style={{ transform: `rotate(${t * 30}deg)` }} />
        </div>
      </At>
      {TAGS.map((tg, i) => {
        const a = (i / TAGS.length) * Math.PI * 2 + t * 0.9;
        return (
          <At key={i} x={480 + Math.cos(a) * 330} y={560 + Math.sin(a) * 250} s={pop(f, 30.1 + i * 0.08) * (Math.sin(a) > -0.2 ? 1 : 0.8)} z={Math.sin(a) > 0 ? 5 : 0}>
            <Pill size={30} bg={i % 2 ? C.violet : C.blue} color="#fff" shadow="rgba(0,0,0,0.3)" style={{ border: `2px solid ${NEON}88` }}>{tg}</Pill>
          </At>
        );
      })}
      <At x={480} y={170}>
        <div style={{ whiteSpace: 'nowrap' }}><Word at={29.74} size={72}>the</Word><Word at={29.84} size={72}>world</Word><Word at={30.11} size={72}>keeps</Word><Word at={30.5} size={72} color={NEON}>changing,</Word></div>
      </At>
      {/* you keep learning: the skills grid from the opener turns green */}
      <Grid x={1060} y={230} lit={39} at={29.6} dur={0.01} color={C.yellow} cell={52} done={31.86} />
      <At x={1390} y={170}>
        <div style={{ whiteSpace: 'nowrap' }}><Word at={31.62} size={72}>you</Word><Word at={31.86} size={72}>keep</Word><Word at={32.17} size={72} color={C.green}>learning.</Word></div>
      </At>
      <At x={1390} y={870} s={pop(f, 32.3)} o={relevant ? 0 : 1}>
        <Pill size={40} bg={C.green} color="#fff" shadow={C.greenDeep}><RefreshCw size={38} strokeWidth={3} />Skills updated</Pill>
      </At>
      {relevant && (
        <>
          <At x={960} y={540} s={spr(f, 33.61, { damping: 8, stiffness: 220 }) * (1 + kp * 0.04)} r={-4} z={20}>
            <div style={{ padding: '30px 60px', borderRadius: 48, background: C.yellow, boxShadow: `0 14px 0 ${C.yellowDeep}, 0 40px 80px rgba(0,0,0,0.4)`, fontFamily: display, fontWeight: 800, fontSize: 130, color: C.ink, whiteSpace: 'nowrap' }}>
              Stay relevant.
            </div>
          </At>
          <Burst x={960} y={540} at={33.61} n={20} r={520} len={130} w={14} color={C.yellow} />
          <Ring x={960} y={540} at={33.61} r={900} w={36} />
          <At x={760} y={800} s={pop(f, 35.18, { damping: 8 })} z={20} r={-3}><Pill size={64} bg={C.white} color={C.navy}>Now</Pill></At>
          <At x={1160} y={800} s={pop(f, 36.23, { damping: 8 })} z={20} r={3}><Pill size={64} bg={NEON} color={C.ink} shadow="#2FA8D8">and next.</Pill></At>
          <Sparkle x={1500} y={380} at={33.8} size={44} color={C.yellow} />
        </>
      )}
      <At x={1760} y={960 + (1 - spr(f, 29.4, { damping: 12 })) * 600} s={0.62}>
        <Ada poses={[{ t: 0, p: 'talk' }, { t: 31.6, p: 'fist' }, { t: 33.6, p: 'cheer' }]} />
      </At>
    </AbsoluteFill>
  );
};
