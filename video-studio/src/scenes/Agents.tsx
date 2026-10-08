import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { Bot, Mail, FileSpreadsheet, CalendarDays, Check, Sparkles } from 'lucide-react';
import { Ada } from '../components/Ada';
import { At, Burst, Card, Flash, Pill, Ring, Sparkle, Word } from '../components/fx';
import { C, FPS, body, display } from '../theme';
import { easeInOut, kickPulse, out, pop, prog, rand, spr } from '../lib/anim';

const CX = 820, CY = 560;

// 21.5 – 28s  "Put AI to work. Build your own agents, and automate the boring parts of your job." + build into the drop
export const Agents: React.FC = () => {
  const f = useCurrentFrame();
  const t = f / FPS;
  const kp = kickPulse(f);
  const core = pop(f, 21.92, { damping: 9 });

  const sats = [
    { a: -2.6, icon: Mail, label: 'Emails', at: 23.5 },
    { a: -0.55, icon: FileSpreadsheet, label: 'Reports', at: 23.67 },
    { a: 2.75, icon: CalendarDays, label: 'Scheduling', at: 23.86 },
  ];
  const tasks = [
    { label: 'Sort the inbox', at: 25.15 },
    { label: 'Weekly report', at: 25.68 },
    { label: 'Update the sheet', at: 26.06 },
  ];
  // build: snare-roll shake + push-in, white-out into the drop
  const build = prog(f, 26.55, 27.95, (x) => x * x);
  const shake = build * 18;
  const sx = (rand(f) - 0.5) * shake, sy = (rand(f + 99) - 0.5) * shake;
  const roll = [26.6, 26.85, 27.1, 27.35, 27.5, 27.62, 27.72, 27.8, 27.87];

  return (
    <AbsoluteFill style={{ background: `radial-gradient(90% 90% at 45% 50%, #1E2A5C, ${C.ink})`, overflow: 'hidden' }}>
      {/* glowing grid floor */}
      <AbsoluteFill style={{
        backgroundImage: 'linear-gradient(rgba(108,140,255,0.13) 2px, transparent 2px), linear-gradient(90deg, rgba(108,140,255,0.13) 2px, transparent 2px)',
        backgroundSize: '80px 80px', backgroundPosition: `0 ${t * 40}px`,
        maskImage: 'radial-gradient(60% 60% at 45% 50%, black, transparent)',
      }} />
      <AbsoluteFill style={{ transform: `translate(${sx}px, ${sy}px) scale(${1 + build * 0.35})`, transformOrigin: `${CX}px ${CY}px` }}>
        <At x={CX} y={130}>
          <div style={{ whiteSpace: 'nowrap' }}>
            <Word at={21.55} size={92}>Put</Word><Word at={21.92} size={92} color={C.sky}>AI</Word>
            <Word at={22.24} size={92}>to</Word><Word at={22.43} size={92}>work.</Word>
          </div>
        </At>

        {/* data links */}
        <svg style={{ position: 'absolute', inset: 0 }} width={1920} height={1080}>
          {sats.map((s, i) => {
            const p = prog(f, s.at, s.at + 0.35);
            const x2 = CX + Math.cos(s.a) * 330, y2 = CY + Math.sin(s.a) * 300;
            return (
              <g key={i}>
                <line x1={CX} y1={CY} x2={CX + (x2 - CX) * p} y2={CY + (y2 - CY) * p} stroke="rgba(92,211,255,0.5)" strokeWidth={6} strokeDasharray="14 14" strokeDashoffset={-t * 80} />
                {p >= 1 && [0, 0.33, 0.66].map((o, k) => {
                  const q = ((t * 0.9 + o + i * 0.2) % 1);
                  return <circle key={k} cx={x2 + (CX - x2) * q} cy={y2 + (CY - y2) * q} r={9} fill={C.sky} opacity={Math.sin(q * Math.PI)} />;
                })}
              </g>
            );
          })}
        </svg>
        {sats.map((s, i) => {
          const p = pop(f, s.at + 0.2);
          const Icon = s.icon;
          return (
            <At key={i} x={CX + Math.cos(s.a) * 330} y={CY + Math.sin(s.a) * 300 + Math.sin(t * 2 + i) * 8} s={p}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 120, height: 120, borderRadius: 36, background: '#26346E', border: '4px solid rgba(92,211,255,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon size={60} color={C.sky} strokeWidth={2.6} />
                </div>
                <span style={{ fontFamily: body, fontWeight: 700, fontSize: 26, color: '#AFC0FF' }}>{s.label}</span>
              </div>
            </At>
          );
        })}

        {/* agent core */}
        <At x={CX} y={CY} s={core * (1 + kp * 0.06)}>
          <div style={{ position: 'relative', width: 260, height: 260 }}>
            <div style={{ position: 'absolute', inset: -60, borderRadius: '50%', background: 'radial-gradient(circle, rgba(92,211,255,0.45), transparent 65%)' }} />
            <svg style={{ position: 'absolute', inset: -40, transform: `rotate(${t * 60}deg)` }} width={340} height={340}>
              <circle cx={170} cy={170} r={160} fill="none" stroke={C.sky} strokeWidth={6} strokeDasharray="30 22" opacity={0.7} />
            </svg>
            <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: `linear-gradient(135deg, ${C.blue}, ${C.violet})`, boxShadow: `0 0 0 10px rgba(92,211,255,0.25)`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Bot size={130} color="#fff" strokeWidth={2.2} />
            </div>
          </div>
        </At>
        <Ring x={CX} y={CY} at={21.92} r={420} color={C.sky} w={20} />
        <At x={CX} y={CY + 230} s={pop(f, 22.94)}>
          <Pill bg={C.sky} color={C.ink} size={40} shadow="#2FA8D8"><Sparkles size={36} /> Your own agent</Pill>
        </At>

        {/* the boring parts, automated */}
        <At x={CX} y={990}>
          <div style={{ whiteSpace: 'nowrap' }}>
            <Word at={24.49} size={66}>automate</Word><Word at={25.01} size={66}>the</Word>
            <Word at={25.15} size={66} color={C.yellow}>boring</Word><Word at={25.68} size={66} color={C.yellow}>parts</Word>
          </div>
        </At>
        {tasks.map((tk, i) => {
          const inP = pop(f, 24.4 + i * 0.08);
          const done = pop(f, tk.at, { damping: 9 });
          const y = 360 + i * 150;
          return (
            <React.Fragment key={i}>
              <At x={1290 + (1 - inP) * 1100} y={y} r={done > 0 ? 0 : 2}>
                <Card w={420} h={110} bg={done > 0.4 ? C.green : '#2A3768'} edge={done > 0.4 ? C.greenDeep : '#141C3D'} r={28}
                  style={{ display: 'flex', alignItems: 'center', gap: 20, padding: '0 26px', boxSizing: 'border-box', transform: `scale(${1 + (done > 0 && done < 1 ? (1 - done) * 0.12 : 0)})` }}>
                  <div style={{ width: 54, height: 54, borderRadius: 16, background: done > 0.4 ? C.white : 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Check size={36} color={C.greenDeep} strokeWidth={4} style={{ transform: `scale(${done})` }} />
                  </div>
                  <span style={{ fontFamily: body, fontWeight: 700, fontSize: 32, color: C.white }}>{tk.label}</span>
                </Card>
              </At>
              <Burst x={1290} y={y} at={tk.at} n={10} r={220} len={50} color={C.green} />
            </React.Fragment>
          );
        })}
      </AbsoluteFill>

      {/* Ada, kicking back while the agent works */}
      <At x={1730} y={830 + (1 - spr(f, 24.9, { damping: 12 })) * 700} s={0.82}>
        <Ada poses={[{ t: 0, p: 'chill' }, { t: 26.3, p: 'fist' }]} />
      </At>

      {/* build flashes on the snare roll */}
      {roll.map((r, i) => <Flash key={i} at={r} color={i % 2 ? C.violet : C.blue} dur={0.12} max={0.25 + i * 0.05} />)}
      <AbsoluteFill style={{ background: C.white, opacity: interpolate(t, [27.6, 27.98], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: easeInOut }) }} />
    </AbsoluteFill>
  );
};
