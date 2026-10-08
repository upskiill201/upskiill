import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { Code2, Sparkles, Flag } from 'lucide-react';
import { Ada } from '../components/Ada';
import { Bg } from '../components/Bg';
import { At, Burst, Card, Pill, Ring, Sparkle, Word } from '../components/fx';
import { C, FPS, body, display } from '../theme';
import { easeInOut, kickPulse, out, pop, prog, smear, spr, squash } from '../lib/anim';

// 0 – 7.45s  "Hey, I'm Ada! Want to finally learn coding or AI… and actually finish this time?"
export const Hook: React.FC = () => {
  const f = useCurrentFrame();
  const t = f / FPS;
  const kp = kickPulse(f);

  // opening: dot → bloom
  const dot = pop(f, 0.08);
  const bloom = prog(f, 0.22, 0.62, (x) => 1 - Math.pow(1 - x, 4));

  // Ada: rises from the floor, then glides left with a smear
  const rise = spr(f, 0.3, { damping: 10, stiffness: 150 });
  const [sqx, sqy] = squash(f, 0.62, 0.16);
  const glide = prog(f, 1.78, 2.2, easeInOut);
  const glideV = (prog(f + 1, 1.78, 2.2, easeInOut) - glide) * 420;
  const adaX = interpolate(glide, [0, 1], [960, 500]);
  // suck-in for the transition
  const suck = prog(f, 7.05, 7.45, (x) => x * x * x);

  const adaPoses = [
    { t: 0, p: 'idle' }, { t: 0.55, p: 'wave' }, { t: 1.75, p: 'talk' }, { t: 3.0, p: 'pointR' },
    { t: 4.6, p: 'talk2' }, { t: 5.0, p: 'shrug' }, { t: 6.4, p: 'think' },
  ];

  const tileBob = (i: number) => Math.sin(t * 3 + i) * 8 - kp * 10;
  const tilesOut = prog(f, 4.85, 5.15, (x) => x * x);
  const barShake = t > 5.4 && t < 6.6 ? Math.sin(t * 70) * 6 * (1 - (t - 5.4) / 1.2) : 0;

  return (
    <AbsoluteFill style={{ background: C.blueDeep }}>
      <AbsoluteFill style={{ clipPath: `circle(${bloom * 1300}px at 960px 540px)`, transform: `scale(${1 - suck * 0.6}) rotate(${suck * -25}deg)`, opacity: 1 - suck * 0.3 }}>
        <Bg from={C.blueSoft} to={C.blue} seed="hook" />
        {/* Ada */}
        <At x={adaX} y={900 + (1 - rise) * 900} sx={sqx / smear(glideV, 0.004)} sy={sqy * smear(glideV, 0.004)} s={1.08}>
          <Ada poses={adaPoses} />
        </At>

        {/* "Hey, I'm Ada!" */}
        <AbsoluteFill style={{ opacity: out(f, 1.72) }}>
          <At x={1400} y={250} r={-4}>
            <div style={{ textAlign: 'left' }}>
              <Word at={0.6} size={96} tilt={-12}>Hey,</Word>
              <Word at={0.89} size={96} tilt={8}>I&apos;m</Word>
            </div>
          </At>
          <At x={1430} y={500} s={pop(f, 1.15)} r={-6}>
            <Pill bg={C.yellow} color={C.ink} size={130} shadow={C.yellowDeep}>Ada!</Pill>
          </At>
          <Burst x={1430} y={500} at={1.15} n={14} r={240} len={80} color={C.white} />
          <Sparkle x={1660} y={390} at={1.25} size={36} />
          <Sparkle x={1210} y={600} at={1.35} size={26} />
        </AbsoluteFill>

        {/* "Want to finally learn …" */}
        <AbsoluteFill style={{ opacity: out(f, 4.8) }}>
          <At x={1290} y={250}>
            <div style={{ whiteSpace: 'nowrap' }}>
              <Word at={2.05} size={78}>Want</Word><Word at={2.17} size={78}>to</Word>
              <Word at={2.38} size={78} color={C.yellow}>finally</Word><Word at={2.77} size={78}>learn</Word>
            </div>
          </At>
        </AbsoluteFill>
        {[
          { at: 3.05, x: 1030, label: 'Coding', icon: <Code2 size={110} strokeWidth={3} />, bg: C.yellow, edge: C.yellowDeep, fg: C.ink, r: -6 },
          { at: 3.9, x: 1570, label: 'AI', icon: <Sparkles size={110} strokeWidth={3} />, bg: C.white, edge: '#C9D2FF', fg: C.blue, r: 6 },
        ].map((tl, i) => (
          <At key={i} x={tl.x} y={560 + tileBob(i) - tilesOut * 900} s={pop(f, tl.at)} r={tl.r * (1 - tilesOut * 3)}>
            <Card w={380} h={360} bg={tl.bg} edge={tl.edge} r={48} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 18, color: tl.fg }}>
              {tl.icon}
              <div style={{ fontFamily: display, fontWeight: 800, fontSize: 84, letterSpacing: -3 }}>{tl.label}</div>
            </Card>
          </At>
        ))}
        <At x={1300} y={560 - tilesOut * 900} s={pop(f, 3.58)} o={1}>
          <div style={{ fontFamily: display, fontWeight: 800, fontSize: 64, color: C.white, opacity: 0.85 }}>or</div>
        </At>
        <Burst x={1030} y={560} at={3.05} color={C.yellow} r={260} />
        <Burst x={1570} y={560} at={3.9} color={C.white} r={260} />

        {/* "…and actually FINISH this time?" */}
        <AbsoluteFill style={{ opacity: t < 7.0 ? 1 : 0 }}>
          <At x={1300} y={300} s={1}>
            <div style={{ whiteSpace: 'nowrap' }}>
              <Word at={5.03} size={74}>and</Word><Word at={5.28} size={74}>actually</Word>
            </div>
          </At>
          <At x={1300} y={445} s={pop(f, 5.92, { damping: 8 })} r={-3}>
            <div style={{ fontFamily: display, fontWeight: 800, fontSize: 180, color: C.white, letterSpacing: -8, lineHeight: 1, textShadow: `0 10px 0 ${C.blueDeep}` }}>
              finish<span style={{ color: C.yellow }}>.</span>
            </div>
          </At>
          <Burst x={1300} y={445} at={5.92} n={16} r={360} len={90} color={C.yellow} />
          {/* stuck progress bar: the course you never finished */}
          <At x={1300 + barShake} y={680} s={pop(f, 5.2)}>
            <Card w={660} h={150} r={34} style={{ padding: '26px 34px', boxSizing: 'border-box' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: body, fontWeight: 700, fontSize: 28, color: C.slate }}>
                <span>Your last online course</span>
                <span style={{ color: C.coral }}>{Math.round(interpolate(t, [5.2, 5.7], [0, 12], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }))}%</span>
              </div>
              <div style={{ marginTop: 22, height: 34, borderRadius: 999, background: '#E8ECF8', overflow: 'hidden', position: 'relative' }}>
                <div style={{ width: `${interpolate(t, [5.2, 5.7], [0, 12], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })}%`, height: '100%', background: C.coral, borderRadius: 999 }} />
                <div style={{ position: 'absolute', right: 16, top: 2, color: C.slate, opacity: 0.6 }}><Flag size={30} /></div>
              </div>
            </Card>
          </At>
          <At x={1700} y={330} s={pop(f, 6.55, { damping: 7 })} r={interpolate(pop(f, 6.55), [0, 1], [-60, 12])}>
            <div style={{ fontFamily: display, fontWeight: 800, fontSize: 220, color: C.yellow, textShadow: `0 10px 0 ${C.yellowDeep}` }}>?</div>
          </At>
        </AbsoluteFill>
      </AbsoluteFill>

      {/* opening dot */}
      {bloom < 1 && (
        <At x={960} y={540} s={dot * (1 + bloom * 3)} o={1 - bloom}>
          <div style={{ width: 70, height: 70, borderRadius: '50%', background: C.yellow }} />
        </At>
      )}
      <Ring x={960} y={540} at={0.22} r={700} color={C.yellow} w={26} />
    </AbsoluteFill>
  );
};
