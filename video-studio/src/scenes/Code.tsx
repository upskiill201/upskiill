import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { Check, Plus } from 'lucide-react';
import { Bg } from '../components/Bg';
import { At, Art, Burst, Card, Confetti, Pill, Ring, Sparkle, Word } from '../components/fx';
import { C, FPS, body, display, mono } from '../theme';
import { easeInOut, kickPulse, out, pop, prog, spr, squash } from '../lib/anim';

type Tok = [string, string];
const LINES: Tok[][] = [
  [['// my first line of code', '#7C89B8']],
  [['function ', '#FF8FC8'], ['add', C.sky], ['(a, b) {', '#E6EAFF']],
  [['  return ', '#FF8FC8'], ['a + b', C.yellow]],
  [['}', '#E6EAFF']],
];
const cursorLine = (n: number) => { let b = n; for (let i = 0; i < LINES.length; i++) { const c = LINES[i].reduce((m, [x]) => m + x.length, 0); if (b < c) return i; b -= c + 3; } return LINES.length - 1; };
const TYPE_START = 16.85, CPS = 34; // chars per second

// 16.6 – 21.5s  "Write your first line of code… then your first real app."
export const Code: React.FC = () => {
  const f = useCurrentFrame();
  const t = f / FPS;
  const kp = kickPulse(f);
  const typed = Math.max(0, (t - TYPE_START) * CPS);

  const ed = spr(f, 16.62, { damping: 13, stiffness: 150 });
  const shove = prog(f, 19.15, 19.65, easeInOut); // editor makes room for the phone
  const ph = spr(f, 19.4, { damping: 11, stiffness: 140 });
  const [psx, psy] = squash(f, 19.75, 0.12);

  let budget = typed;
  const tasks = [
    { at: 20.05, label: 'Learn functions' },
    { at: 20.46, label: 'Build to-do app' },
    { at: 20.88, label: 'Ship it!' },
  ];
  const correct = pop(f, 18.55, { damping: 9 });

  return (
    <AbsoluteFill>
      <Bg from={C.violet} to="#4B33C9" seed="code" />
      <At x={960} y={110} o={out(f, 19.05)}>
        <div style={{ whiteSpace: 'nowrap' }}>
          <Word at={16.9} size={80}>Write</Word><Word at={17.15} size={80}>your</Word>
          <Word at={17.39} size={80} color={C.yellow}>first</Word><Word at={17.71} size={80}>line</Word>
          <Word at={17.95} size={80}>of</Word><Word at={18.14} size={80}>code</Word>
        </div>
      </At>

      {/* editor */}
      <At x={interpolate(shove, [0, 1], [960, 640])} y={560 + (1 - ed) * 900} s={interpolate(shove, [0, 1], [1, 0.82])} r={interpolate(shove, [0, 1], [0, -4]) + (1 - ed) * 10}>
        <Card w={1000} h={560} bg={C.ink} edge="#070B1A" r={36} style={{ overflow: 'hidden' }}>
          <div style={{ height: 70, background: '#1B2348', display: 'flex', alignItems: 'center', gap: 14, padding: '0 28px' }}>
            {['#FF6B5B', '#FFC800', '#22C55E'].map((c, i) => <div key={i} style={{ width: 22, height: 22, borderRadius: '50%', background: c, transform: `scale(${pop(f, 16.75 + i * 0.05)})` }} />)}
            <div style={{ marginLeft: 22, fontFamily: mono, fontSize: 24, color: '#9AA6D6', background: C.ink, padding: '10px 20px', borderRadius: '12px 12px 0 0', marginTop: 14 }}>lesson.js</div>
          </div>
          <div style={{ padding: '30px 40px', fontFamily: mono, fontWeight: 500, fontSize: 44, lineHeight: 1.55 }}>
            {LINES.map((line, li) => {
              const lineChars = line.reduce((n, [s]) => n + s.length, 0);
              const shown = Math.min(lineChars, Math.floor(budget));
              budget -= lineChars + 3; // small pause at each newline
              let left = shown;
              const done = shown >= lineChars;
              const showCursor = typed > 0 && !done && cursorLine(typed) === li;
              return (
                <div key={li} style={{ display: 'flex', whiteSpace: 'pre', minHeight: 68 }}>
                  <span style={{ color: '#46507A', width: 60 }}>{li + 1}</span>
                  {line.map(([s, c], k) => {
                    const take = Math.max(0, Math.min(s.length, left));
                    left -= s.length;
                    return <span key={k} style={{ color: c }}>{s.slice(0, take)}</span>;
                  })}
                  {(showCursor || (li === LINES.length - 1 && done)) && (
                    <span style={{ width: 22, height: 52, marginTop: 8, background: C.yellow, opacity: Math.floor(t * 4) % 2 ? 1 : 0.2 }} />
                  )}
                </div>
              );
            })}
          </div>
          {/* instant feedback */}
          <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 110, background: C.green, transform: `translateY(${(1 - correct) * 120}px)`,
            display: 'flex', alignItems: 'center', gap: 20, padding: '0 36px', color: C.white, fontFamily: display, fontWeight: 800, fontSize: 44 }}>
            <div style={{ width: 64, height: 64, borderRadius: '50%', background: C.white, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Check size={44} color={C.greenDeep} strokeWidth={4} />
            </div>
            Nice! That&apos;s right.
          </div>
        </Card>
      </At>
      <At x={interpolate(shove, [0, 1], [1360, 1000])} y={interpolate(shove, [0, 1], [830, 780])} s={pop(f, 18.75, { damping: 8 })} r={-6}>
        <Pill bg={C.yellow} color={C.ink} size={56} shadow={C.yellowDeep}><Art src="art/xp-bolt.svg" size={62} />+10 XP</Pill>
      </At>
      <Burst x={1360} y={830} at={18.75} n={12} r={180} color={C.yellow} />

      {/* phone: your first real app */}
      {t > 19.3 && (
        <>
          <At x={1420} y={560 + (1 - ph) * 1000} r={(1 - ph) * 30 + Math.sin(t * 2) * 1.5} sx={psx} sy={psy}>
            <div style={{ width: 430, height: 860, borderRadius: 70, background: C.ink, padding: 18, boxSizing: 'border-box', boxShadow: '0 40px 80px rgba(10,10,40,0.45)' }}>
              <div style={{ width: '100%', height: '100%', borderRadius: 54, background: C.page, overflow: 'hidden', position: 'relative' }}>
                <div style={{ position: 'absolute', left: '50%', top: 14, width: 120, height: 34, borderRadius: 20, background: C.ink, transform: 'translateX(-50%)' }} />
                <div style={{ padding: '80px 34px 0', fontFamily: display, fontWeight: 800, fontSize: 48, color: C.navy }}>My tasks</div>
                <div style={{ padding: '6px 34px 22px', fontFamily: body, fontWeight: 600, fontSize: 24, color: C.slate }}>Today</div>
                {tasks.map((tk, i) => {
                  const inP = pop(f, 19.75 + i * 0.1);
                  const ck = pop(f, tk.at, { damping: 9 });
                  return (
                    <div key={i} style={{ margin: '0 26px 20px', background: C.white, borderRadius: 26, padding: '24px 22px', display: 'flex', alignItems: 'center', gap: 20,
                      boxShadow: '0 6px 0 #E2E8F0', transform: `translateX(${(1 - inP) * 400}px) scale(${1 + (ck > 0 && ck < 1.05 ? (1 - ck) * 0.08 : 0)})` }}>
                      <div style={{ width: 54, height: 54, borderRadius: 18, border: `5px solid ${ck > 0.3 ? C.green : '#CBD5E1'}`, background: ck > 0.3 ? C.green : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', boxSizing: 'border-box' }}>
                        <Check size={34} color="#fff" strokeWidth={4.5} style={{ transform: `scale(${ck})` }} />
                      </div>
                      <span style={{ fontFamily: body, fontWeight: 700, fontSize: 30, color: ck > 0.3 ? C.slate : C.navy, textDecoration: ck > 0.5 ? 'line-through' : 'none' }}>{tk.label}</span>
                    </div>
                  );
                })}
                <div style={{ position: 'absolute', right: 34, bottom: 44, width: 104, height: 104, borderRadius: 34, background: C.blue, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 8px 0 ${C.blueDeep}`, transform: `scale(${pop(f, 20.2) * (1 + kp * 0.08)})` }}>
                  <Plus size={56} color="#fff" strokeWidth={3.5} />
                </div>
              </div>
            </div>
          </At>
          {tasks.map((tk, i) => <Burst key={i} x={1250} y={430 + i * 124} at={tk.at} n={8} r={120} len={40} w={8} color={C.green} />)}
          <At x={1420} y={110 + 0}>
            <div style={{ whiteSpace: 'nowrap' }} />
          </At>
          <At x={interpolate(shove, [0, 1], [960, 600])} y={960} s={1}>
            <div style={{ whiteSpace: 'nowrap' }}>
              <Word at={19.24} size={78}>then</Word><Word at={19.6} size={78}>your</Word><Word at={20.05} size={78}>first</Word>
              <Word at={20.46} size={78} color={C.yellow}>real</Word><Word at={20.88} size={78} color={C.yellow}>app.</Word>
            </div>
          </At>
          <Ring x={1420} y={560} at={20.88} r={700} color={C.yellow} w={26} />
          <Confetti x={1420} y={420} at={20.88} n={46} spread={1100} seed={7} />
          <Sparkle x={1660} y={220} at={21.0} size={44} color={C.yellow} />
        </>
      )}
    </AbsoluteFill>
  );
};
