import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { MessageSquare, Image, Code2, Mic, Video, Bot, Sparkles, Briefcase, Megaphone, Palette, Headphones, LineChart, PenTool, Calculator } from 'lucide-react';
import { Ada } from '../components/Ada';
import { At, Burst, Pill, Ring, Sparkle, Word } from '../components/fx';
import { NEON, NeonBg } from './kit';
import { C, FPS, body, display } from '../theme';
import { easeInOut, kickPulse, out, pop, prog, rand, smear, spr, squash } from '../lib/anim';

const TOOLS = [
  { i: MessageSquare, l: 'Chat' }, { i: Image, l: 'Images' }, { i: Code2, l: 'Code' }, { i: Mic, l: 'Voice' },
  { i: Video, l: 'Video' }, { i: Bot, l: 'Agents' }, { i: Sparkles, l: 'Copilots' },
];
const JOBS = [
  { i: Megaphone, l: 'Marketing' }, { i: Palette, l: 'Design' }, { i: Headphones, l: 'Support' },
  { i: LineChart, l: 'Sales' }, { i: Calculator, l: 'Finance' }, { i: PenTool, l: 'Writing' },
];

// 0 – 8.3s  "Hey, it's Ada! AI is moving fast. Like, really fast. And the way we work is changing with it."
export const Open: React.FC = () => {
  const f = useCurrentFrame();
  const t = f / FPS;
  const kp = kickPulse(f);

  // scan-line reveal of Ada
  const scan = prog(f, 0.15, 0.75, easeInOut);
  const glide = prog(f, 1.75, 2.15, easeInOut);
  const adaX = interpolate(glide, [0, 1], [960, 330]);
  const [sqx, sqy] = squash(f, 0.75, 0.12);

  // tool stream accelerates
  const speed = interpolate(t, [2.0, 3.2, 4.0, 5.4], [500, 1300, 1300, 3200], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  let dist = 0; // integrate speed analytically-ish by sampling
  for (let k = 2.0; k < t; k += 1 / FPS) dist += interpolate(k, [2.0, 3.2, 4.0, 5.4], [500, 1300, 1300, 3200], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }) / FPS;
  const streamOut = prog(f, 5.7, 6.0, (x) => x * x);

  return (
    <AbsoluteFill>
      <NeonBg speed={40 + (t > 2 ? speed / 10 : 0)} />
      {/* speed streaks */}
      {t > 2.2 && t < 6.1 && Array.from({ length: 26 }).map((_, i) => {
        const y = 80 + rand(i) * 920;
        const x = 1920 - ((dist * (0.8 + rand(i + 3)) + rand(i + 7) * 1920) % 2600);
        return <div key={i} style={{ position: 'absolute', left: x, top: y, width: 80 + speed * 0.12, height: 4, borderRadius: 2, background: i % 3 ? 'rgba(255,255,255,0.35)' : NEON, opacity: 0.7 }} />;
      })}

      {/* tool cards racing past */}
      {t > 2.0 && t < 6.1 && (
        <AbsoluteFill style={{ opacity: 1 - streamOut }}>
          {TOOLS.concat(TOOLS).map((tl, i) => {
            const lane = i % 3;
            const x = 2100 - ((dist * (1 + lane * 0.18) + i * 380) % 2700);
            const Icon = tl.i;
            const stretch = smear(speed / 60, 0.012);
            return (
              <At key={i} x={x + 400} y={330 + lane * 210} sx={stretch} sy={1 / Math.sqrt(stretch)} r={-3 + lane * 3}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 18, padding: '22px 34px', borderRadius: 28, background: lane === 1 ? C.blue : 'rgba(30,40,110,0.9)',
                  border: `3px solid ${NEON}55`, color: C.white, fontFamily: display, fontWeight: 800, fontSize: 46, whiteSpace: 'nowrap' }}>
                  <Icon size={52} color={NEON} strokeWidth={2.6} />{tl.l}
                </div>
              </At>
            );
          })}
        </AbsoluteFill>
      )}

      {/* AI is moving fast */}
      <At x={1150} y={150} o={out(f, 5.75)}>
        <div style={{ whiteSpace: 'nowrap' }}>
          <Word at={2.0} size={110} color={NEON} style={{ textShadow: `0 0 30px ${NEON}` }}>AI</Word>
          <Word at={2.48} size={110}>is</Word><Word at={2.7} size={110}>moving</Word><Word at={3.2} size={110} tilt={-10}>fast.</Word>
        </div>
      </At>
      <At x={1180} y={940} s={pop(f, 4.63, { damping: 7 })} r={-5 + Math.sin(t * 40) * (t > 4.6 && t < 5.8 ? 2 : 0)} o={out(f, 5.75)}>
        <Pill bg={C.yellow} color={C.ink} size={84} shadow={C.yellowDeep}>really fast.</Pill>
      </At>

      {/* the way we work is changing */}
      {t > 5.85 && (
        <>
          <At x={1180} y={150}>
            <div style={{ whiteSpace: 'nowrap' }}>
              <Word at={6.26} size={76}>the</Word><Word at={6.36} size={76}>way</Word><Word at={6.53} size={76}>we</Word>
              <Word at={6.7} size={76} color={C.yellow}>work</Word><Word at={7.01} size={76}>is</Word><Word at={7.17} size={76} color={NEON}>changing.</Word>
            </div>
          </At>
          {JOBS.map((j, i) => {
            const col = i % 3, row = Math.floor(i / 3);
            const inP = pop(f, 5.95 + i * 0.06);
            const flipAt = 6.7 + i * 0.125;
            const fp = prog(f, flipAt, flipAt + 0.3, easeInOut);
            const front = fp < 0.5;
            const Icon = j.i;
            return (
              <At key={i} x={830 + col * 330} y={430 + row * 300} s={inP * (1 + (fp > 0.5 ? kp * 0.05 : 0))}>
                <div style={{ width: 290, height: 250, borderRadius: 34, transform: `perspective(900px) rotateY(${fp * 180}deg)`,
                  background: front ? 'rgba(255,255,255,0.1)' : C.blue, border: `3px solid ${front ? 'rgba(255,255,255,0.2)' : NEON}`,
                  boxShadow: front ? 'none' : `0 0 40px ${NEON}55`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ transform: front ? undefined : 'scaleX(-1)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, color: C.white }}>
                    <div style={{ position: 'relative' }}>
                      {front ? <Briefcase size={70} color="rgba(255,255,255,0.6)" strokeWidth={2.2} /> : <Icon size={70} color={C.white} strokeWidth={2.4} />}
                      {!front && <Sparkles size={38} color={C.yellow} fill={C.yellow} style={{ position: 'absolute', right: -34, top: -22 }} />}
                    </div>
                    <span style={{ fontFamily: display, fontWeight: 800, fontSize: 38 }}>{j.l}</span>
                    <span style={{ fontFamily: body, fontWeight: 700, fontSize: 22, color: front ? 'rgba(255,255,255,0.5)' : NEON }}>{front ? 'the old way' : 'with AI'}</span>
                  </div>
                </div>
              </At>
            );
          })}
        </>
      )}

      {/* Ada */}
      <AbsoluteFill style={{ clipPath: `inset(${(1 - scan) * 100}% 0 0 0)` }}>
        <At x={adaX} y={880} s={1.0} sx={sqx} sy={sqy}>
          <Ada poses={[{ t: 0, p: 'wave' }, { t: 1.8, p: 'talk' }, { t: 4.0, p: 'shrug' }, { t: 5.9, p: 'pointR' }]} />
        </At>
      </AbsoluteFill>
      {scan > 0 && scan < 1 && <div style={{ position: 'absolute', left: 0, right: 0, top: 1080 * (1 - scan), height: 6, background: NEON, boxShadow: `0 0 30px ${NEON}` }} />}
      <AbsoluteFill style={{ opacity: out(f, 1.7) }}>
        <At x={1330} y={420} s={pop(f, 0.7)} r={-6}>
          <Pill bg={NEON} color={C.ink} size={96} shadow="#2FA8D8">Hey, it&apos;s Ada!</Pill>
        </At>
        <Burst x={1330} y={420} at={1.25} n={14} r={300} color={NEON} />
        <Sparkle x={1640} y={330} at={1.3} size={36} />
      </AbsoluteFill>
      <Ring x={960} y={540} at={0.15} r={800} color={NEON} w={20} />
    </AbsoluteFill>
  );
};
