import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { BookOpen, Code2, PenLine, Rocket, Play } from 'lucide-react';
import { Ada } from '../components/Ada';
import { Bg } from '../components/Bg';
import { At, Art, Burst, Card, Pill, Ring, Sparkle, Word } from '../components/fx';
import { C, FPS, body, display } from '../theme';
import { easeInOut, kickPulse, out, pop, prog, spr, squash } from '../lib/anim';

// 10 – 16.6s  "A few minutes a day. And you're not just watching… you're building skills you can use right away."
export const Minutes: React.FC = () => {
  const f = useCurrentFrame();
  const t = f / FPS;
  const kp = kickPulse(f);
  const clamp = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;

  // stopwatch
  const sw = pop(f, 10.1);
  const sweep = prog(f, 10.2, 11.0, easeInOut);
  const swOut = prog(f, 11.6, 11.95, (x) => x * x);
  // video player
  const vp = pop(f, 11.95, { damping: 12 });
  const slash = prog(f, 12.7, 12.95);
  const vpOut = prog(f, 13.45, 13.75, (x) => x * x * x);
  // skill tower
  const blocks = [
    { at: 13.96, label: 'Learn', icon: BookOpen, bg: C.sky, edge: '#2FA8D8' },
    { at: 14.38, label: 'Apply', icon: Code2, bg: C.yellow, edge: C.yellowDeep },
    { at: 14.76, label: 'Reflect', icon: PenLine, bg: C.pink, edge: '#E46BA8' },
    { at: 15.12, label: 'Deepen', icon: Rocket, bg: C.green, edge: C.greenDeep },
  ];
  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  const R = 150, circ = 2 * Math.PI * R;

  return (
    <AbsoluteFill>
      <Bg from="#FFFFFF" to="#DCE3FF" shape="rgba(61,90,254,0.07)" dots="rgba(61,90,254,0.14)" seed="min" />

      {/* Ada on the right, presenting */}
      <At x={1540} y={760 + (1 - spr(f, 10.0, { damping: 13 })) * 700} s={0.95}>
        <Ada poses={[{ t: 0, p: 'talk' }, { t: 10.0, p: 'talk' }, { t: 11.7, p: 'shrug' }, { t: 12.9, p: 'talk2' }, { t: 13.8, p: 'pointL' }, { t: 15.84, p: 'cheer' }]} />
      </At>

      {/* --- A few minutes a day --- */}
      <AbsoluteFill style={{ transform: `translateX(${-swOut * 1100}px) rotate(${-swOut * 20}deg)`, display: t > 12.0 ? 'none' : undefined }}>
        <At x={420} y={470} s={sw * (1 + kp * 0.03)} r={(1 - sw) * -30}>
          <svg width={420} height={460} viewBox="-210 -250 420 460">
            <rect x={-30} y={-232} width={60} height={46} rx={12} fill={C.navy} />
            <rect x={110} y={-180} width={40} height={30} rx={10} fill={C.navy} transform="rotate(40 130 -165)" />
            <circle r={200} fill={C.navy} />
            <circle r={176} fill={C.white} />
            <circle r={R} fill="none" stroke={C.blueTint} strokeWidth={46} />
            <circle r={R} fill="none" stroke={C.blue} strokeWidth={46} strokeLinecap="round"
              strokeDasharray={`${circ * sweep * 0.82} ${circ}`} transform="rotate(-90)" />
            {Array.from({ length: 12 }).map((_, i) => (
              <line key={i} x1={0} y1={-108} x2={0} y2={-92} stroke={C.navy} strokeWidth={6} strokeLinecap="round" transform={`rotate(${i * 30})`} />
            ))}
            <line x1={0} y1={0} x2={0} y2={-96} stroke={C.coral} strokeWidth={10} strokeLinecap="round" transform={`rotate(${sweep * 295})`} />
            <circle r={16} fill={C.coral} />
          </svg>
        </At>
        <At x={890} y={250}>
          <div style={{ whiteSpace: 'nowrap' }}>
            <Word at={10.0} size={110} color={C.navy}>A</Word><Word at={10.2} size={110} color={C.navy}>few</Word>
          </div>
        </At>
        <At x={900} y={440} s={pop(f, 10.36)} r={-3}>
          <Pill bg={C.blue} color={C.white} size={110} shadow={C.blueDeep}>minutes</Pill>
        </At>
        <At x={900} y={610}>
          <div style={{ whiteSpace: 'nowrap' }}>
            <Word at={10.68} size={110} color={C.navy}>a</Word><Word at={10.82} size={110} color={C.navy}>day.</Word>
          </div>
        </At>
        <At x={900} y={760}>
          <div style={{ display: 'flex', gap: 18 }}>
            {days.map((d, i) => {
              const at = 10.95 + i * 0.0625;
              const on = pop(f, at, { damping: 10 });
              return (
                <div key={i} style={{ width: 72, height: 72, borderRadius: 22, background: on > 0.5 ? C.yellow : '#E3E8FA', transform: `scale(${0.6 + on * 0.4}) translateY(${-on * 6 + (on > 0.5 ? -kp * 6 : 0)}px)`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: display, fontWeight: 800, fontSize: 30, color: C.navy, boxShadow: on > 0.5 ? `0 6px 0 ${C.yellowDeep}` : 'none' }}>
                  {d}
                </div>
              );
            })}
          </div>
        </At>
        <Burst x={420} y={470} at={11.0} n={12} r={250} color={C.blue} />
      </AbsoluteFill>

      {/* --- not just watching --- */}
      {t > 11.8 && t < 13.9 && (
        <AbsoluteFill style={{ transform: `translateY(${vpOut * 1200}px) rotate(${vpOut * 25}deg)` }}>
          <At x={720} y={470} s={vp} r={interpolate(vp, [0, 1], [12, -2])}>
            <Card w={880} h={500} bg={C.navy} edge="#0B1022" r={36} style={{ overflow: 'hidden' }}>
              <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(135deg, #2A365C, ${C.navy})`, filter: slash > 0 ? `grayscale(${slash})` : undefined }} />
              <div style={{ position: 'absolute', left: '50%', top: '45%', transform: 'translate(-50%,-50%)', width: 150, height: 150, borderRadius: '50%', background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Play size={70} color="#fff" fill="#fff" />
              </div>
              <div style={{ position: 'absolute', left: 36, right: 36, bottom: 40, height: 12, borderRadius: 6, background: 'rgba(255,255,255,0.2)' }}>
                <div style={{ width: `${interpolate(t, [12, 13.4], [8, 58], clamp)}%`, height: '100%', borderRadius: 6, background: C.coral }} />
              </div>
              <div style={{ position: 'absolute', left: 36, top: 30, fontFamily: body, fontWeight: 700, fontSize: 30, color: 'rgba(255,255,255,0.7)' }}>Lecture 14 of 96 · 47:12</div>
              <svg style={{ position: 'absolute', inset: 0 }} width={880} height={500}>
                <line x1={80} y1={440} x2={80 + 720 * slash} y2={440 - 380 * slash} stroke={C.coral} strokeWidth={34} strokeLinecap="round" />
              </svg>
            </Card>
          </At>
          <At x={720} y={830}>
            <div style={{ whiteSpace: 'nowrap' }}>
              <Word at={12.02} size={84} color={C.navy}>not</Word><Word at={12.37} size={84} color={C.navy}>just</Word>
              <Word at={12.62} size={84} color={C.coral}>watching.</Word>
            </div>
          </At>
        </AbsoluteFill>
      )}

      {/* --- building skills you can use --- */}
      {t > 13.6 && (
        <AbsoluteFill>
          <At x={700} y={120}>
            <div style={{ whiteSpace: 'nowrap' }}>
              <Word at={13.7} size={88} color={C.navy}>you&apos;re</Word><Word at={13.96} size={88} color={C.blue}>building</Word>
              <Word at={14.38} size={88} color={C.navy}>skills</Word>
            </div>
          </At>
          {blocks.map((b, i) => {
            const land = 980 - i * 150 - 90;
            const p = spr(f, b.at - 0.12, { damping: 13, stiffness: 260, mass: 0.7 });
            const y = interpolate(p, [0, 1], [-300, land], clamp);
            const [sx, sy] = squash(f, b.at, 0.18);
            const Icon = b.icon;
            const wob = Math.sin(t * 2.2 + i) * 1.5;
            return (
              <React.Fragment key={i}>
                <At x={700} y={f < (b.at - 0.12) * FPS ? -400 : y} sx={sx} sy={sy} r={wob} z={10 - i}>
                  <Card w={520 - i * 40} h={130} bg={b.bg} edge={b.edge} r={30} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 22, color: C.ink }}>
                    <Icon size={58} strokeWidth={3} />
                    <span style={{ fontFamily: display, fontWeight: 800, fontSize: 60, letterSpacing: -2 }}>{b.label}</span>
                  </Card>
                </At>
                <Burst x={700} y={land + 60} at={b.at} n={8} r={300} len={50} w={8} color={b.edge} rot={0.3} />
              </React.Fragment>
            );
          })}
          {/* Skill unlocked */}
          <At x={700} y={300 + Math.sin(t * 3) * 6} s={pop(f, 15.6, { damping: 8 })} z={20}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
              <Art src="art/level-hex.svg" size={130} />
              <Pill bg={C.ink} color={C.white} size={52} shadow="#000">Ready to use</Pill>
            </div>
          </At>
          <Ring x={700} y={300} at={15.6} r={500} color={C.yellow} w={24} />
          <Burst x={700} y={300} at={15.84} n={16} r={300} len={90} color={C.yellow} />
          <Sparkle x={980} y={220} at={15.9} size={40} color={C.yellow} />
          <Sparkle x={430} y={360} at={16.0} size={30} color={C.blue} />
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};
