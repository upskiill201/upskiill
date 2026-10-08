import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { Bot, Check, Sparkles, Zap, FileSpreadsheet, Mail, Wrench, Loader2, Users, CalendarCheck, Search, MessageSquareReply, Brain, SendHorizontal, BookOpen, User, Clock, Bell, Lock, MousePointer2 } from 'lucide-react';
import { FaApple, FaAndroid, FaGlobe } from 'react-icons/fa';
import { Ada } from '../components/Ada';
import { Bg } from '../components/Bg';
import { At, Art, Burst, Card, Confetti, Pill, Ring, Sparkle, Word } from '../components/fx';
import { LogoTile, Rays } from '../scenes/Logo';
import { Glass, NEON, NeonBg } from '../ai/kit';
import { AX, AY } from './A';
import { C, FPS, body, display, mono } from '../theme';
import { easeInOut, kickPulse, pop, prog, spr, squash } from '../lib/anim';

const clamp = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;
const Line: React.FC<{ y: number; children: React.ReactNode; o?: number }> = ({ y, children, o = 1 }) => (
  <At x={540} y={y} o={o}><div style={{ whiteSpace: 'nowrap', textAlign: 'center' }}>{children}</div></At>
);

const UPGRADES = [{ at: 20.56, l: 'Role', c: C.pink }, { at: 20.85, l: 'Context', c: C.yellow }, { at: 21.1, l: 'Format', c: '#7CF29A' }, { at: 21.35, l: 'Tone', c: C.sky }];
// 20.05 – 24.05s
export const VPrompt: React.FC = () => {
  const f = useCurrentFrame();
  const t = f / FPS;
  const RAW = 'write a launch email';
  const typed = Math.floor(interpolate(t, [20.15, 20.75], [0, RAW.length], clamp));
  const reply = prog(f, 21.86, 23.0, (x) => x);
  const dart = prog(f, 23.0, 23.46, (x) => x * x);
  return (
    <AbsoluteFill>
      <NeonBg hue="#2A1F7A" glow="rgba(123,97,255,0.25)" />
      <Line y={290}><Word at={20.1} size={104}>Master</Word></Line>
      <Line y={410}><Word at={20.56} size={104} color={NEON} style={{ textShadow: `0 0 24px ${NEON}` }}>prompting</Word></Line>
      <At x={540} y={640 + (1 - spr(f, 20.05, { damping: 13 })) * 1200}>
        <Glass w={960} h={250} style={{ padding: '28px 30px' }}>
          <div style={{ display: 'flex', gap: 12, height: 54, flexWrap: 'nowrap' }}>
            {UPGRADES.map((u, i) => {
              const p = pop(f, u.at, { damping: 8 });
              return <div key={i} style={{ transform: `scale(${p}) translateY(${(1 - Math.min(1, p)) * -60}px)`, padding: '8px 20px', borderRadius: 999, background: u.c, fontFamily: display, fontWeight: 800, fontSize: 30, color: C.ink }}>+ {u.l}</div>;
            })}
          </div>
          <div style={{ marginTop: 18, fontFamily: mono, fontWeight: 500, fontSize: 38, color: C.white, lineHeight: 1.35, width: 800 }}>
            {RAW.slice(0, typed)}
            {t > 20.75 && <span style={{ color: NEON }}>{' for my bakery, friendly, 3 bullets'.slice(0, Math.floor(interpolate(t, [20.6, 21.5], [0, 35], clamp)))}</span>}
            <span style={{ display: 'inline-block', width: 4, height: 44, marginLeft: 4, verticalAlign: -8, background: NEON, opacity: Math.floor(t * 4) % 2 ? 1 : 0.2 }} />
          </div>
          <div style={{ position: 'absolute', right: 24, bottom: 24, width: 84, height: 84, borderRadius: 26, background: t > 21.7 ? NEON : 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${t > 21.7 && t < 21.85 ? 0.85 : 1})` }}>
            <SendHorizontal size={44} color={t > 21.7 ? C.ink : '#fff'} strokeWidth={2.6} />
          </div>
        </Glass>
      </At>
      {t > 21.8 && (
        <At x={540} y={1000} s={pop(f, 21.82, { damping: 13 })}>
          <Glass w={960} h={300} glow={C.violet} style={{ padding: '26px 30px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, fontFamily: display, fontWeight: 800, fontSize: 34, color: C.white, marginBottom: 20 }}>
              <div style={{ width: 54, height: 54, borderRadius: 18, background: C.violet, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Sparkles size={32} color="#fff" /></div>
              Fresh from the oven: launch day!
            </div>
            {[0.92, 0.78, 0.86, 0.6, 0.85].map((w, i) => {
              const q = interpolate(reply, [i / 5, (i + 1) / 5], [0, 1], clamp);
              return <div key={i} style={{ height: 20, width: `${w * q * 100}%`, borderRadius: 10, marginBottom: 15, background: i % 3 === 0 ? NEON : 'rgba(255,255,255,0.35)' }} />;
            })}
          </Glass>
        </At>
      )}
      <At x={540} y={1340} s={pop(f, 22.5)}>
        <svg width={320} height={320} viewBox="-180 -180 360 360">
          {[170, 130, 90, 50].map((r, i) => <circle key={i} r={r} fill={i % 2 ? C.white : C.coral} />)}
          <circle r={18} fill={C.ink} />
        </svg>
      </At>
      <At x={interpolate(dart, [0, 1], [1200, 550])} y={interpolate(dart, [0, 1], [1000, 1330])} r={-30} s={t > 23.0 ? 1 : 0}>
        <div style={{ width: 200, height: 14, borderRadius: 7, background: C.yellow, position: 'relative' }}>
          <div style={{ position: 'absolute', left: -26, top: -13, borderRight: `30px solid ${C.ink}`, borderTop: '20px solid transparent', borderBottom: '20px solid transparent' }} />
          <div style={{ position: 'absolute', right: -10, top: -24, width: 50, height: 62, background: C.blue, clipPath: 'polygon(0 50%, 100% 0, 80% 50%, 100% 100%)' }} />
        </div>
      </At>
      <Ring x={540} y={1340} at={23.46} r={420} color={C.yellow} w={26} />
      <Burst x={540} y={1340} at={23.46} n={16} r={220} color={C.yellow} />
      <Line y={1570}><Word at={22.5} size={70}>exactly</Word><Word at={23.11} size={70}>what</Word><Word at={23.32} size={70}>you</Word><Word at={23.46} size={70} color={C.yellow}>want.</Word></Line>
    </AbsoluteFill>
  );
};

const STEPS = [
  { i: Search, l: 'Find 20 new leads', at: 25.94 }, { i: MessageSquareReply, l: 'Draft the replies', at: 26.32 },
  { i: CalendarCheck, l: 'Book the meetings', at: 26.74 }, { i: Users, l: 'Update the CRM', at: 27.14 },
];
// 24.05 – 28.15s
export const VAgent: React.FC = () => {
  const f = useCurrentFrame();
  const t = f / FPS;
  const kp = kickPulse(f);
  const core = pop(f, 24.45, { damping: 9 });
  const CY = 700;
  const parts = [{ l: 'Goal', at: 24.1, a: -2.5 }, { l: 'Tools', at: 24.45, a: -0.65 }, { l: 'Memory', at: 24.66, a: 2.5 }, { l: 'Rules', at: 25.03, a: 0.65 }];
  return (
    <AbsoluteFill>
      <NeonBg hue="#14306E" />
      <Line y={290}><Word at={24.1} size={96}>Build</Word><Word at={24.45} size={96}>your</Word><Word at={24.66} size={96}>own</Word></Line>
      <Line y={400}><Word at={25.03} size={96} color={NEON} style={{ textShadow: `0 0 24px ${NEON}` }}>AI agents</Word></Line>
      {parts.map((p, i) => {
        const fly = spr(f, p.at, { damping: 12, stiffness: 160 });
        const dock = prog(f, 25.6, 25.9, easeInOut);
        const R = interpolate(dock, [0, 1], [290, 200]);
        return (
          <At key={i} x={540 + Math.cos(p.a) * R * 1.2 * fly + (1 - fly) * (i % 2 ? 700 : -700)} y={CY + Math.sin(p.a) * R * 0.75} s={fly * (1 - dock * 0.2)}>
            <Pill size={38} bg={i % 2 ? C.violet : C.blue} color="#fff" shadow="rgba(0,0,0,0.3)" style={{ border: `3px solid ${NEON}88` }}>{p.l}</Pill>
          </At>
        );
      })}
      <At x={540} y={CY} s={core * (1 + kp * 0.06)}>
        <div style={{ width: 230, height: 230, borderRadius: '50%', background: `linear-gradient(135deg, ${C.blue}, ${C.violet})`, boxShadow: `0 0 0 14px rgba(92,225,255,0.2), 0 0 80px ${NEON}88`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Bot size={120} color="#fff" strokeWidth={2.2} />
        </div>
      </At>
      <Ring x={540} y={CY} at={25.9} r={420} color={NEON} w={22} />
      <At x={540} y={1210} s={pop(f, 25.75, { damping: 12 })}>
        <Glass w={960} h={520} style={{ padding: '26px 30px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, fontFamily: display, fontWeight: 800, fontSize: 38, color: C.white, marginBottom: 18 }}>
            <Loader2 size={42} color={NEON} style={{ transform: `rotate(${t * 400}deg)`, opacity: t < 27.3 ? 1 : 0 }} />
            {t < 27.3 ? 'Agent running…' : 'All done!'}
          </div>
          {STEPS.map((s, i) => {
            const inP = pop(f, s.at - 0.25, { damping: 13 });
            const done = pop(f, s.at + 0.15, { damping: 9 });
            const Icon = s.i;
            return (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 18, padding: '16px 18px', marginBottom: 14, borderRadius: 20,
                background: done > 0.5 ? 'rgba(34,197,94,0.22)' : 'rgba(255,255,255,0.06)', transform: `translateX(${(1 - inP) * 200}px)`, opacity: Math.min(1, inP) }}>
                <Icon size={40} color={done > 0.5 ? '#7CF29A' : NEON} />
                <span style={{ flex: 1, fontFamily: body, fontWeight: 700, fontSize: 36, color: '#fff' }}>{s.l}</span>
                <div style={{ width: 48, height: 48, borderRadius: '50%', background: C.green, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${done})` }}>
                  <Check size={32} color="#fff" strokeWidth={4} />
                </div>
              </div>
            );
          })}
        </Glass>
      </At>
      {STEPS.map((s, i) => <Burst key={i} x={980} y={1088 + i * 102} at={s.at + 0.15} n={8} r={90} len={30} w={6} color={C.green} />)}
    </AbsoluteFill>
  );
};

// 28.15 – 33.65s  — camera pans across three stations
export const VStrip: React.FC = () => {
  const f = useCurrentFrame();
  const t = f / FPS;
  const kp = kickPulse(f);
  const keys = [28.15, 29.45, 29.75, 31.05, 31.35];
  const pan = interpolate(t, keys, [0, 0, 1, 1, 2], { ...clamp, easing: easeInOut });
  const panV = interpolate(t + 1 / FPS, keys, [0, 0, 1, 1, 2], { ...clamp, easing: easeInOut }) - pan;
  const blur = Math.min(1, Math.abs(panV) * 25);
  const NODES = [{ i: Zap, l: 'New order' }, { i: Bot, l: 'AI sorts it' }, { i: FileSpreadsheet, l: 'Sheet updated' }, { i: Mail, l: 'Email sent' }];
  const LAYERS = [4, 5, 5, 3];
  const train = prog(f, 31.6, 33.3, (x) => x);
  return (
    <AbsoluteFill>
      <NeonBg hue="#1A2370" speed={40 + Math.abs(panV) * 3000} />
      <AbsoluteFill style={{ transform: `translateX(${-pan * 1080}px) skewX(${-panV * 300}deg)`, filter: blur > 0.05 ? `blur(${blur * 6}px)` : undefined }}>
        {/* 1. automate */}
        <div style={{ position: 'absolute', left: 0, top: 0, width: 1080, height: 1920 }}>
          <Line y={290}><Word at={28.3} size={100}>Automate</Word></Line>
          <Line y={400}><Word at={28.56} size={100}>the</Word><Word at={28.68} size={100} color={C.yellow}>busywork.</Word></Line>
          <svg style={{ position: 'absolute', inset: 0 }} width={1080} height={1920}>
            {NODES.slice(1).map((_, i) => {
              const p = prog(f, 28.45 + i * 0.18, 28.7 + i * 0.18);
              const y1 = 620 + i * 250;
              return <line key={i} x1={330} y1={y1} x2={330} y2={y1 + 250 * p} stroke={NEON} strokeWidth={8} strokeDasharray="16 14" strokeDashoffset={-t * 120} opacity={0.8} />;
            })}
          </svg>
          {NODES.map((n, i) => {
            const lit = t > 28.9 + i * 0.16;
            const Icon = n.i;
            return (
              <At key={i} x={330} y={620 + i * 250} s={pop(f, 28.35 + i * 0.12) * (lit ? 1 + kp * 0.05 : 1)}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 30, transform: 'translateX(170px)' }}>
                  <div style={{ width: 170, height: 170, borderRadius: 44, background: lit ? C.blue : 'rgba(255,255,255,0.08)', border: `4px solid ${lit ? NEON : 'rgba(255,255,255,0.2)'}`,
                    boxShadow: lit ? `0 0 50px ${NEON}77` : 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon size={84} color="#fff" strokeWidth={2.3} />
                  </div>
                  <span style={{ fontFamily: display, fontWeight: 800, fontSize: 44, color: '#fff', whiteSpace: 'nowrap', width: 340 }}>{n.l}</span>
                </div>
              </At>
            );
          })}
          {[0, 1, 2].map((k) => {
            const q = ((t - 28.9) * 1.2 + k / 3) % 1;
            return t > 28.9 ? <div key={k} style={{ position: 'absolute', left: 316, top: 620 + q * 750 - 14, width: 28, height: 28, borderRadius: 14, background: C.yellow, boxShadow: `0 0 20px ${C.yellow}` }} /> : null;
          })}
          <At x={540} y={1490} s={pop(f, 29.25, { damping: 8 })} r={-4}><Pill bg={C.green} color="#fff" size={52} shadow={C.greenDeep}><Check size={48} strokeWidth={4} />On autopilot</Pill></At>
        </div>
        {/* 2. build tools */}
        <div style={{ position: 'absolute', left: 1080, top: 0, width: 1080, height: 1920 }}>
          <Line y={290}><Word at={29.59} size={100}>Build</Word><Word at={29.9} size={100} color={C.yellow}>tools</Word></Line>
          <Line y={400}><Word at={30.33} size={100}>with</Word><Word at={30.67} size={100} color={NEON}>AI.</Word></Line>
          <At x={540} y={950} s={pop(f, 29.7, { damping: 12 })}>
            <div style={{ width: 940, height: 820, borderRadius: 34, background: C.page, overflow: 'hidden', boxShadow: `0 0 0 4px ${NEON}88, 0 40px 80px rgba(0,0,0,0.45)`, position: 'relative' }}>
              <div style={{ height: 70, background: C.navy, display: 'flex', alignItems: 'center', gap: 12, padding: '0 24px' }}>
                {['#FF6B5B', '#FFC800', '#22C55E'].map((c, i) => <div key={i} style={{ width: 18, height: 18, borderRadius: 9, background: c }} />)}
                <span style={{ marginLeft: 20, fontFamily: display, fontWeight: 800, fontSize: 32, color: '#fff' }}>Quote Builder</span>
                <Wrench size={34} color={C.yellow} style={{ marginLeft: 'auto' }} />
              </div>
              {[
                { x: 24, y: 94, w: 432, h: 170, c: C.blue, at: 30.0 }, { x: 484, y: 94, w: 432, h: 170, c: C.violet, at: 30.125 },
                { x: 24, y: 290, w: 892, h: 300, c: C.white, at: 30.25, chart: true },
                { x: 24, y: 616, w: 432, h: 180, c: C.yellow, at: 30.375 }, { x: 484, y: 616, w: 432, h: 180, c: C.green, at: 30.5 },
              ].map((b, i) => {
                const p = spr(f, b.at, { damping: 11, stiffness: 240 });
                return (
                  <div key={i} style={{ position: 'absolute', left: b.x, top: b.y, width: b.w, height: b.h, borderRadius: 22, background: b.c, transform: `translateY(${(1 - p) * -900}px)`, boxShadow: '0 6px 0 rgba(0,0,0,0.08)', overflow: 'hidden' }}>
                    {b.chart && [0.4, 0.65, 0.5, 0.8, 0.7, 0.95, 0.85].map((h, k) => (
                      <div key={k} style={{ position: 'absolute', bottom: 24, left: 50 + k * 120, width: 72, height: 240 * h * prog(f, 30.6 + k * 0.05, 30.9 + k * 0.05), borderRadius: 12, background: k % 2 ? C.blue : C.sky }} />
                    ))}
                  </div>
                );
              })}
            </div>
          </At>
          <At x={760} y={530} s={pop(f, 30.67, { damping: 8 })} r={8}><Pill bg={C.yellow} color={C.ink} size={48} shadow={C.yellowDeep}><Sparkles size={44} />Built by you</Pill></At>
        </div>
        {/* 3. training */}
        <div style={{ position: 'absolute', left: 2160, top: 0, width: 1080, height: 1920 }}>
          <Line y={290}><Word at={31.31} size={92}>Even</Word><Word at={31.85} size={92}>learn</Word><Word at={32.04} size={92}>how</Word></Line>
          <Line y={400}><Word at={32.33} size={92} color={NEON}>AI</Word><Word at={32.59} size={92}>gets</Word><Word at={32.85} size={92} color={C.yellow}>trained.</Word></Line>
          <svg style={{ position: 'absolute', inset: 0 }} width={1080} height={1920}>
            {LAYERS.slice(1).map((n, li) => Array.from({ length: LAYERS[li] }).map((_, a) => Array.from({ length: n }).map((_, b) => {
              const x1 = 180 + li * 240, x2 = x1 + 240;
              const y1 = 800 + (a - (LAYERS[li] - 1) / 2) * 120, y2 = 800 + (b - (n - 1) / 2) * 120;
              const wave = Math.max(0, Math.sin((train * 3 - li * 0.33) * Math.PI * 2));
              return <line key={`${li}-${a}-${b}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke={wave > 0.5 ? NEON : 'rgba(255,255,255,0.14)'} strokeWidth={2 + wave * 3} opacity={0.4 + wave * 0.6} />;
            })))}
          </svg>
          {LAYERS.map((n, li) => Array.from({ length: n }).map((_, k) => {
            const wave = Math.max(0, Math.sin((train * 3 - li * 0.33 + 0.1) * Math.PI * 2));
            return (
              <At key={`${li}-${k}`} x={180 + li * 240} y={800 + (k - (n - 1) / 2) * 120} s={pop(f, 31.4 + li * 0.08 + k * 0.02) * (1 + wave * 0.2)}>
                <div style={{ width: 70, height: 70, borderRadius: 35, background: wave > 0.4 ? NEON : C.blue, border: '4px solid rgba(255,255,255,0.6)', boxShadow: wave > 0.4 ? `0 0 30px ${NEON}` : 'none' }} />
              </At>
            );
          }))}
          <At x={540} y={1330} s={pop(f, 31.6)}>
            <Glass w={760} h={330} style={{ padding: 28 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontFamily: display, fontWeight: 800, fontSize: 36, color: '#fff' }}><Brain size={40} color={NEON} />Training</div>
              <svg width={700} height={170} style={{ marginTop: 10 }}>
                <path d={Array.from({ length: 40 }).map((_, i) => { const x = (i / 39) * train; return `${i ? 'L' : 'M'}${x * 690 + 4} ${14 + 140 * Math.exp(-x * 3.2) + Math.sin(i * 2.3) * 6 * (1 - x)}`; }).join(' ')}
                  stroke={C.yellow} strokeWidth={7} fill="none" strokeLinecap="round" />
              </svg>
              <div style={{ fontFamily: mono, fontWeight: 700, fontSize: 30, color: NEON }}>accuracy {Math.round(52 + train * 44)}%</div>
            </Glass>
          </At>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// 33.65 – 39.25s
export const VHabit: React.FC = () => {
  const f = useCurrentFrame();
  const t = f / FPS;
  const kp = kickPulse(f);
  const streak = interpolate(t, [36.04, 36.9], [1, 128], { ...clamp, easing: easeInOut });
  const friends = [{ n: 'K', c: C.coral }, { n: 'D', c: C.green }, { n: 'P', c: C.pink }, { n: 'T', c: C.sky }];
  return (
    <AbsoluteFill>
      <Bg from={C.blueSoft} to={C.blue} seed="vh" />
      <Line y={290}><Word at={34.3} size={100}>A</Word><Word at={34.42} size={100}>few</Word><Word at={34.59} size={100} color={C.yellow}>minutes</Word></Line>
      <Line y={400}><Word at={34.98} size={100}>a</Word><Word at={35.12} size={100}>day.</Word></Line>
      <At x={860} y={400} s={pop(f, 35.12)} r={Math.sin(t * 6) * 6}><Clock size={80} color={C.yellow} strokeWidth={3} /></At>
      <At x={290} y={720} s={pop(f, 36.04)} r={-5 + Math.sin(t * 2.4) * 2}>
        <Card w={420} h={380} r={44} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <Art src="art/burn.png" size={140} style={{ transform: `scale(${1 + kp * 0.12})`, transformOrigin: '50% 90%' }} />
          <div style={{ fontFamily: display, fontWeight: 800, fontSize: 110, color: C.orange, lineHeight: 1 }}>{Math.round(streak)}</div>
          <div style={{ fontFamily: display, fontWeight: 800, fontSize: 38, color: C.navy }}>day streak!</div>
        </Card>
      </At>
      <Burst x={290} y={720} at={36.04} n={12} r={260} color={C.yellow} />
      <At x={790} y={720} s={pop(f, 36.59)} r={5 + Math.sin(t * 2.1) * 2}>
        <Card w={420} h={380} r={44} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
          <Art src="art/medal-1.svg" size={140} />
          <div style={{ fontFamily: display, fontWeight: 800, fontSize: 90, color: C.blue, lineHeight: 1 }}>#1</div>
          <div style={{ fontFamily: display, fontWeight: 800, fontSize: 36, color: C.navy }}>Diamond League</div>
        </Card>
      </At>
      <Burst x={790} y={720} at={36.59} n={12} r={260} color={C.white} />
      <At x={540} y={1040} s={pop(f, 37.15)}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {friends.map((fr, i) => (
            <div key={i} style={{ width: 130, height: 130, borderRadius: '50%', background: fr.c, border: '7px solid #fff', marginLeft: i ? -26 : 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: display, fontWeight: 800, fontSize: 58, color: '#fff', transform: `translateY(${Math.sin(t * 5 + i) * 8 - kp * 8}px) scale(${pop(f, 37.15 + i * 0.06)})` }}>{fr.n}</div>
          ))}
          <span style={{ marginLeft: 26, fontFamily: display, fontWeight: 800, fontSize: 48, color: '#fff' }}>+ friends</span>
        </div>
      </At>
      {Array.from({ length: 8 }).map((_, i) => {
        const q = (t - 37.3 - i * 0.12) / 1.2;
        if (q < 0 || q > 1) return null;
        return <At key={i} x={380 + (i % 4) * 90 + Math.sin(q * 6 + i) * 30} y={980 - q * 330} s={Math.sin(q * Math.PI)}><Art src="art/heart.svg" size={64} /></At>;
      })}
      <At x={AX} y={AY + 40} s={1.1}><Ada poses={[{ t: 0, p: 'open' }, { t: 35.8, p: 'talk' }, { t: 37.6, p: 'cheer' }]} /></At>
      <At x={820} y={1250} s={pop(f, 37.63, { damping: 8 })} r={6}><Pill bg={C.yellow} color={C.ink} size={54} shadow={C.yellowDeep}>Keep going!</Pill></At>
    </AbsoluteFill>
  );
};

// 39.25 – 44.0s
export const VPayoff: React.FC = () => {
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
      {drop ? <AbsoluteFill style={{ background: `radial-gradient(80% 60% at 50% 50%, ${C.blueSoft}, ${C.blueDeep})` }}><Rays speed={14} x={540} y={900} /></AbsoluteFill> : <NeonBg hue="#141B4E" speed={30} />}
      <At x={540} y={800 - bookOut * 800} s={book * (1 - strike * 0.12)} r={-3 + bookOut * -20} o={1 - bookOut}>
        <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20, padding: '50px 70px', borderRadius: 44, background: 'rgba(255,255,255,0.1)', border: '3px solid rgba(255,255,255,0.25)' }}>
          <BookOpen size={130} color="rgba(255,255,255,0.8)" strokeWidth={2.2} />
          <span style={{ fontFamily: display, fontWeight: 800, fontSize: 100, color: `rgba(255,255,255,${0.95 - strike * 0.5})`, whiteSpace: 'nowrap' }}>Know about AI</span>
          <div style={{ position: 'absolute', left: 40, top: '66%', height: 18, width: `${strike * 90}%`, borderRadius: 9, background: C.coral, transform: 'rotate(-4deg)' }} />
        </div>
      </At>
      <Line y={330} o={1 - bookOut}><Word at={39.6} size={92}>You</Word><Word at={39.6} size={92}>won&apos;t</Word><Word at={39.83} size={92} color={C.coral}>just</Word></Line>
      {!drop && Array.from({ length: 12 }).map((_, i) => {
        const row = Math.floor(i / 6), col = i % 6;
        const x = 110 + col * 172 + row * 80;
        return (
          <At key={i} x={x} y={1290 + row * 170 + (1 - crowd) * 400 + Math.sin(t * 2 + i) * 5} s={crowd}>
            <div style={{ width: 120, height: 120, borderRadius: '50%', background: 'rgba(255,255,255,0.12)', border: '3px solid rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <User size={64} color="rgba(255,255,255,0.55)" />
            </div>
          </At>
        );
      })}
      {!drop && t > 41.0 && <div style={{ position: 'absolute', left: 540 - 360, top: -100, width: 720, height: 2200, background: 'linear-gradient(180deg, rgba(92,225,255,0.35), transparent 85%)', clipPath: 'polygon(38% 0, 62% 0, 100% 100%, 0 100%)', opacity: crowd }} />}
      <At x={AX} y={interpolate(rise, [0, 1], [2600, drop ? AY : AY - 120])} s={drop ? 1.15 : 1.05} sx={sx} sy={sy}>
        <Ada poses={[{ t: 0, p: 'talk' }, { t: 41.0, p: 'open' }, { t: 42.0, p: 'cheer' }]} />
      </At>
      <Line y={330} o={t > 41.0 && !drop ? 1 : 0}><Word at={41.02} size={96}>You&apos;ll</Word><Word at={41.43} size={96}>be</Word><Word at={41.5} size={96}>the</Word><Word at={41.6} size={96} color={NEON} style={{ textShadow: `0 0 26px ${NEON}` }}>one</Word></Line>
      {drop && (
        <>
          <Line y={330}><Word at={42.0} size={90}>who</Word><Word at={42.02} size={90}>can</Word><Word at={42.17} size={90} color={C.yellow}>actually</Word></Line>
          <At x={540} y={650} s={spr(f, 42.66, { damping: 7, stiffness: 260 }) * (1 + kp * 0.05)} r={-5}>
            <div style={{ fontFamily: display, fontWeight: 800, fontSize: 250, color: C.white, letterSpacing: -8, lineHeight: 1, whiteSpace: 'nowrap', textShadow: `0 14px 0 ${C.blueDeep}, 0 0 60px ${NEON}` }}>
              USE<span style={{ color: C.yellow }}> it.</span>
            </div>
          </At>
          <Ring x={540} y={650} at={42.66} r={800} w={36} />
          <Burst x={540} y={650} at={42.66} n={20} r={420} len={130} w={14} color={C.yellow} />
          <Confetti x={540} y={800} at={42.0} n={70} spread={1400} seed={9} />
          <Ring x={540} y={1100} at={42.0} r={1200} w={44} color={NEON} />
          <Sparkle x={160} y={980} at={42.8} size={44} color={C.yellow} />
        </>
      )}
    </AbsoluteFill>
  );
};

const MONTHS = ['JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV'];
// 44 – 49.85s
export const VLaunch: React.FC = () => {
  const f = useCurrentFrame();
  const t = f / FPS;
  const kp = kickPulse(f);
  const flipT = interpolate(t, [44.05, 45.3], [0, MONTHS.length - 1], { ...clamp, easing: (x) => 1 - Math.pow(1 - x, 2.2) });
  const idx = Math.floor(flipT), flipFrac = flipT - idx;
  const land = squash(f, 45.3, 0.2);
  const cal = spr(f, 44.0, { damping: 10, stiffness: 180 });
  const devices = [{ at: 47.4, icon: FaApple, label: 'iPhone', c: C.ink }, { at: 47.9, icon: FaAndroid, label: 'Android', c: C.greenDeep }, { at: 48.4, icon: FaGlobe, label: 'Web', c: C.blue }];
  return (
    <AbsoluteFill>
      <Bg from={C.blueSoft} to={C.blueDeep} seed="vl" pulse={1.5} />
      <Rays o={0.9} speed={18} x={540} y={780} />
      <Line y={300}><Word at={44.27} size={96}>It</Word><Word at={44.32} size={96}>all</Word><Word at={44.5} size={96}>launches</Word></Line>
      <At x={540} y={780} s={cal * (1 + kp * 0.03)} sx={land[0]} sy={land[1]} r={(1 - cal) * -20}>
        <div style={{ width: 720, height: 620, borderRadius: 64, background: C.white, boxShadow: `0 16px 0 #C9D2FF, 0 50px 90px rgba(10,15,70,0.4)`, overflow: 'hidden', position: 'relative', perspective: 1400 }}>
          <div style={{ height: 160, background: C.coral, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 140 }}>
            {[0, 1].map((i) => <div key={i} style={{ width: 36, height: 74, borderRadius: 18, background: '#fff', marginTop: -64 }} />)}
          </div>
          <div style={{ position: 'absolute', top: 160, left: 0, right: 0, bottom: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ fontFamily: display, fontWeight: 800, fontSize: 240, color: idx >= MONTHS.length - 1 ? C.blue : C.navy, letterSpacing: -8, lineHeight: 1,
              transform: `rotateX(${idx < MONTHS.length - 1 ? flipFrac * 90 : 0}deg)`, transformOrigin: '50% 0%' }}>{MONTHS[Math.min(idx, MONTHS.length - 1)]}</div>
            <div style={{ fontFamily: display, fontWeight: 800, fontSize: 70, color: C.slate }}>2026</div>
          </div>
        </div>
      </At>
      <Ring x={540} y={780} at={45.3} r={1100} color={C.yellow} w={40} />
      <Burst x={540} y={780} at={45.3} n={20} r={440} len={130} w={14} color={C.yellow} />
      <Confetti x={540} y={700} at={45.3} n={60} spread={1300} seed={21} />
      <At x={540} y={1200} s={pop(f, 45.93, { damping: 7, stiffness: 300 }) * (1 + kp * 0.04)} r={-6}>
        <div style={{ padding: '24px 44px', borderRadius: 32, border: `10px solid ${C.green}`, background: C.white, fontFamily: display, fontWeight: 800, fontSize: 86, color: C.greenDeep, whiteSpace: 'nowrap', boxShadow: `0 12px 0 ${C.greenDeep}` }}>FREE to start</div>
      </At>
      <Burst x={540} y={1200} at={45.93} n={12} r={360} color={C.green} />
      {devices.map((d, i) => {
        const p = pop(f, d.at);
        const Icon = d.icon;
        return (
          <At key={i} x={190 + i * 350} y={1440 + Math.sin(t * 3 + i) * 6 - kp * 6} s={p} r={(1 - p) * 30}>
            <Card w={320} h={140} r={40} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
              <Icon size={60} color={d.c} /><span style={{ fontFamily: display, fontWeight: 800, fontSize: 46, color: C.navy }}>{d.label}</span>
            </Card>
          </At>
        );
      })}
    </AbsoluteFill>
  );
};

// 49.85 – 54s
export const VNotify: React.FC = () => {
  const f = useCurrentFrame();
  const t = f / FPS;
  const kp = kickPulse(f);
  const URL = 'teyro.app';
  const typed = Math.floor(interpolate(t, [51.17, 51.95], [0, URL.length], clamp));
  const cur = prog(f, 51.85, 52.75, easeInOut);
  const click = 52.85;
  const press = t > click && t < click + 0.18 ? Math.sin(((t - click) / 0.18) * Math.PI) : 0;
  const clicked = t >= click + 0.08;
  const ring = clicked ? Math.sin((t - click) * 40) * 18 * Math.exp(-(t - click) * 4) : 0;
  const [bsx, bsy] = squash(f, click + 0.1, 0.12);
  const toast = spr(f, 53.1, { damping: 12 });
  const BY = 900;
  return (
    <AbsoluteFill>
      <Bg from="#FFFFFF" to="#D9E1FF" shape="rgba(61,90,254,0.07)" dots="rgba(61,90,254,0.14)" seed="vn" />
      <At x={540} y={330} s={pop(f, 50.0)}>
        <Card w={940} h={130} r={65} style={{ display: 'flex', alignItems: 'center', gap: 22, padding: '0 44px', boxSizing: 'border-box' }}>
          <Lock size={46} color={C.green} strokeWidth={3} />
          <span style={{ fontFamily: display, fontWeight: 800, fontSize: 68, color: C.navy }}>{URL.slice(0, typed)}
            <span style={{ display: 'inline-block', width: 6, height: 64, marginLeft: 4, background: C.blue, verticalAlign: -10, opacity: Math.floor(t * 4) % 2 ? 1 : 0.15 }} /></span>
        </Card>
      </At>
      <Line y={560} o={t < 52.9 ? 1 : 0}><Word at={50.21} size={76} color={C.navy}>Get</Word><Word at={50.31} size={76} color={C.navy}>notified</Word><Word at={50.96} size={76} color={C.navy}>at</Word></Line>
      <Line y={560} o={t >= 52.9 ? 1 : 0}><Word at={52.77} size={84} color={C.navy}>be</Word><Word at={52.96} size={84} color={C.blue}>first</Word><Word at={53.44} size={84} color={C.navy}>in!</Word></Line>
      <At x={540} y={BY} s={pop(f, 50.31, { damping: 8 }) * (1 - press * 0.08) * (1 + kp * 0.025)} sx={bsx} sy={bsy}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 28, padding: '46px 70px', borderRadius: 999, background: clicked ? C.green : C.yellow,
          boxShadow: `0 ${16 - press * 12}px 0 ${clicked ? C.greenDeep : C.yellowDeep}, 0 40px 70px rgba(20,30,90,0.25)`, transform: `translateY(${press * 12}px)`,
          fontFamily: display, fontWeight: 800, fontSize: 92, color: C.ink, whiteSpace: 'nowrap' }}>
          <Bell size={92} strokeWidth={3} style={{ transform: `rotate(${ring}deg)`, transformOrigin: '50% 10%' }} />{clicked ? "You're in!" : 'Get notified'}
        </div>
      </At>
      <At x={AX} y={AY + 80} s={1.05}><Ada poses={[{ t: 0, p: 'pointUpR' }, { t: 53.0, p: 'cheer' }]} /></At>
      <Ring x={540} y={BY} at={click + 0.08} r={700} color={C.green} w={30} />
      <Burst x={540} y={BY} at={click + 0.08} n={18} r={460} len={110} w={14} color={C.green} />
      <Confetti x={540} y={BY} at={click + 0.08} n={50} spread={1200} seed={41} />
      {t > 51.8 && t < 53.6 && (
        <At x={interpolate(cur, [0, 1], [1150, 700])} y={interpolate(cur, [0, 1], [1500, BY + 70]) + press * 10} s={1 - press * 0.15} r={-10}>
          <MousePointer2 size={120} color={C.ink} fill={C.white} strokeWidth={2.2} />
        </At>
      )}
      {t > 53.05 && (
        <At x={540} y={interpolate(toast, [0, 1], [-200, 1140])}>
          <Card w={940} h={150} r={38} style={{ display: 'flex', alignItems: 'center', gap: 24, padding: '0 28px', boxSizing: 'border-box' }}>
            <LogoTile size={100} />
            <div>
              <div style={{ fontFamily: display, fontWeight: 800, fontSize: 40, color: C.navy }}>Be first in.</div>
              <div style={{ fontFamily: body, fontWeight: 600, fontSize: 28, color: C.slate }}>One email the day the doors open.</div>
            </div>
          </Card>
        </At>
      )}
    </AbsoluteFill>
  );
};

const ANCH = [[150, 300], [930, 280], [110, 1000], [970, 980], [200, 1600], [880, 1620], [540, 200], [120, 640], [960, 640]];
const FLOAT = ['art/xp-bolt.svg', 'art/boost-coin.svg', 'art/heart.svg', 'art/chest-gold.svg', 'art/freeze.svg', 'art/medal-1.svg', 'art/level-hex.svg', 'art/Coin.png', 'art/burn.png'];
// 54 – 60s
export const VEnd: React.FC = () => {
  const f = useCurrentFrame();
  const t = f / FPS;
  const kp = kickPulse(f);
  const slam = spr(f, 54.0, { damping: 8, stiffness: 240, mass: 0.8 });
  const [sx, sy] = squash(f, 54.12, 0.2);
  const btn = squash(f, 58.0, 0.18);
  const LY = 600;
  return (
    <AbsoluteFill>
      <Bg from={C.blueSoft} to={C.blueDeep} seed="ve" pulse={1.2} />
      <Rays o={0.8} speed={6} x={540} y={LY} />
      {FLOAT.map((src, i) => {
        const p = spr(f, 54.05 + i * 0.04, { damping: 14, stiffness: 90 });
        const [ax, ay] = ANCH[i];
        return <At key={i} x={540 + (ax - 540) * p + Math.sin(t * 0.9 + i) * 16} y={LY + (ay - LY) * p + Math.sin(t * 2 + i) * 14} s={p * 0.95} r={Math.sin(t * 1.5 + i) * 14}><Art src={src} size={120} /></At>;
      })}
      <Ring x={540} y={LY} at={54.0} r={1200} w={50} />
      <Ring x={540} y={LY} at={54.1} r={900} w={26} color={C.yellow} />
      <Burst x={540} y={LY} at={54.0} n={22} r={320} len={150} w={16} color={C.yellow} />
      <Confetti x={540} y={LY} at={54.0} n={80} spread={1500} seed={77} />
      <At x={540} y={LY} s={slam * (1 + kp * 0.02)} sx={sx * btn[0]} sy={sy * btn[1]} r={(1 - slam) * -25}><LogoTile size={400} /></At>
      <At x={540} y={880} s={pop(f, 54.3)}><Pill bg={C.ink} color={C.white} size={46} shadow="rgba(0,0,0,0.3)"><Sparkles size={44} color={C.yellow} fill={C.yellow} />The AI track</Pill></At>
      <At x={540} y={1110} s={pop(f, 54.45)}>
        <div style={{ textAlign: 'center', fontFamily: display, fontWeight: 800, color: '#fff', textShadow: `0 8px 0 ${C.blueDeep}`, lineHeight: 1.05 }}>
          <div style={{ fontSize: 100, letterSpacing: -3 }}>Launching</div>
          <div style={{ fontSize: 100, letterSpacing: -4, color: C.yellow, whiteSpace: 'nowrap' }}>November 2026</div>
        </div>
      </At>
      <At x={540} y={1350} s={pop(f, 54.75) * (1 + kp * 0.03)} sx={btn[0]} sy={btn[1]}>
        <Pill bg={C.yellow} color={C.ink} size={56} shadow={C.yellowDeep}><Bell size={54} strokeWidth={3} />Get notified at teyro.app</Pill>
      </At>
      <At x={540} y={1470} o={interpolate(t, [55.1, 55.5], [0, 1], clamp)}>
        <div style={{ fontFamily: body, fontWeight: 700, fontSize: 38, color: 'rgba(255,255,255,0.88)', whiteSpace: 'nowrap' }}>Free to start · iPhone, Android and web</div>
      </At>
      <Sparkle x={820} y={430} at={54.4} size={46} />
      <Sparkle x={250} y={820} at={55.0} size={34} color={C.yellow} />
      <Sparkle x={820} y={430} at={58.05} size={50} color={C.yellow} />
      <AbsoluteFill style={{ background: C.ink, opacity: interpolate(t, [59.4, 60], [0, 1], clamp) }} />
    </AbsoluteFill>
  );
};
