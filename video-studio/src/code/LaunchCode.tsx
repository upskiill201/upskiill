import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { FaApple, FaAndroid, FaGlobe } from 'react-icons/fa';
import { Bg } from '../components/Bg';
import { At, Burst, Card, Confetti, Pill, Ring, Sparkle, Word } from '../components/fx';
import { Rays } from '../scenes/Logo';
import { C, FPS, body, display } from '../theme';
import { kickPulse, pop, prog, spr, squash } from '../lib/anim';

const MONTHS = ['JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV'];

// 44 – 49.85s  "And it launches this November! Free to start, on iPhone, Android and web."
export const LaunchCode: React.FC = () => {
  const f = useCurrentFrame();
  const t = f / FPS;
  const kp = kickPulse(f);
  const clamp = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;

  // flip-calendar: months riffle by, landing on NOV exactly on "November"
  const flipT = interpolate(t, [46.05, 47.12], [0, MONTHS.length - 1], { ...clamp, easing: (x) => 1 - Math.pow(1 - x, 2.2) });
  const idx = Math.floor(flipT);
  const flipFrac = flipT - idx;
  const land = squash(f, 47.12, 0.2);
  const cal = spr(f, 46, { damping: 10, stiffness: 180 });
  const up = prog(f, 47.75, 48.1); // calendar lifts to make room

  const devices = [
    { at: 48.55, icon: FaApple, label: 'iPhone', c: C.ink },
    { at: 48.9, icon: FaAndroid, label: 'Android', c: C.greenDeep },
    { at: 49.25, icon: FaGlobe, label: 'Web', c: C.blue },
  ];

  return (
    <AbsoluteFill>
      <Bg from={C.blueSoft} to={C.blueDeep} seed="launch" pulse={1.5} />
      <Rays o={0.9} speed={18} />
      <AbsoluteFill style={{ transform: `translateY(${-up * 70}px) scale(${1 - up * 0.14})`, transformOrigin: '50% 30%' }}>
        <At x={960} y={130} s={1}>
          <div style={{ whiteSpace: 'nowrap' }}>
            <Word at={46.3} size={80}>Launching</Word><Word at={46.85} size={80}>this</Word>
          </div>
        </At>
        {/* calendar */}
        <At x={960} y={520} s={cal * (1 + kp * 0.03)} sx={land[0]} sy={land[1]} r={(1 - cal) * -20}>
          <div style={{ width: 640, height: 560, borderRadius: 60, background: C.white, boxShadow: `0 16px 0 #C9D2FF, 0 50px 90px rgba(10,15,70,0.4)`, overflow: 'hidden', position: 'relative', perspective: 1400 }}>
            <div style={{ height: 150, background: C.coral, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 120 }}>
              {[0, 1].map((i) => <div key={i} style={{ width: 34, height: 70, borderRadius: 17, background: '#fff', marginTop: -60, boxShadow: '0 6px 0 rgba(0,0,0,0.15)' }} />)}
            </div>
            <div style={{ position: 'absolute', top: 150, left: 0, right: 0, bottom: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ fontFamily: display, fontWeight: 800, fontSize: 210, color: idx >= MONTHS.length - 1 ? C.blue : C.navy, letterSpacing: -8, lineHeight: 1,
                transform: `rotateX(${idx < MONTHS.length - 1 ? flipFrac * 90 : 0}deg)`, transformOrigin: '50% 0%' }}>
                {MONTHS[Math.min(idx, MONTHS.length - 1)]}
              </div>
              <div style={{ fontFamily: display, fontWeight: 800, fontSize: 64, color: C.slate, marginTop: 6 }}>2026</div>
            </div>
          </div>
        </At>
        <Ring x={960} y={520} at={47.12} r={1000} color={C.yellow} w={40} />
        <Burst x={960} y={520} at={47.12} n={20} r={420} len={130} w={14} color={C.yellow} />
        <Confetti x={960} y={400} at={47.12} n={60} spread={1500} seed={21} />
        {/* Free to start stamp */}
        <At x={1490} y={430} s={pop(f, 47.73, { damping: 7, stiffness: 300 }) * (1 + kp * 0.04)} r={14}>
          <div style={{ padding: '22px 40px', borderRadius: 30, border: `10px solid ${C.green}`, background: C.white, fontFamily: display, fontWeight: 800, fontSize: 78, color: C.greenDeep, whiteSpace: 'nowrap', boxShadow: `0 12px 0 ${C.greenDeep}` }}>
            FREE to start
          </div>
        </At>
        <Burst x={1490} y={430} at={47.73} n={12} r={330} color={C.green} />
      </AbsoluteFill>

      {/* devices */}
      {devices.map((d, i) => {
        const p = pop(f, d.at);
        const Icon = d.icon;
        const x = 960 + (i - 1) * 380;
        return (
          <React.Fragment key={i}>
            <At x={x} y={900 + Math.sin(t * 3 + i) * 6 - kp * 6} s={p} r={(1 - p) * 30}>
              <Card w={320} h={150} r={40} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 22 }}>
                <Icon size={70} color={d.c} />
                <span style={{ fontFamily: display, fontWeight: 800, fontSize: 54, color: C.navy }}>{d.label}</span>
              </Card>
            </At>
            <Burst x={x} y={900} at={d.at} n={10} r={230} color={C.white} />
          </React.Fragment>
        );
      })}
      <Sparkle x={300} y={300} at={47.3} size={50} />
      <Sparkle x={1650} y={700} at={47.5} size={40} color={C.yellow} />
      <div style={{ display: 'none', fontFamily: body }} />
    </AbsoluteFill>
  );
};
