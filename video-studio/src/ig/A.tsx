import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { MessageSquare, Image, Code2, Mic, Video, Bot, Sparkles, Briefcase, Megaphone, Palette, Headphones, LineChart, PenTool, Calculator, User, Route, Zap } from 'lucide-react';
import { Ada } from '../components/Ada';
import { At, Art, Burst, Confetti, Pill, Ring, Sparkle, Word } from '../components/fx';
import { LogoTile, Rays } from '../scenes/Logo';
import { NEON, NeonBg } from '../ai/kit';
import { C, FPS, body, display } from '../theme';
import { easeInOut, kickPulse, out, pop, prog, rand, smear, spr, squash } from '../lib/anim';

// Vertical 1080×1920. Key content lives in y≈250–1500 (Reels UI covers the top bar and the bottom caption area).
export const AX = 540, AY = 1580;
const clamp = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;

const Line: React.FC<{ y: number; children: React.ReactNode; o?: number }> = ({ y, children, o = 1 }) => (
  <At x={540} y={y} o={o}><div style={{ whiteSpace: 'nowrap', textAlign: 'center' }}>{children}</div></At>
);

const TOOLS = [
  { i: MessageSquare, l: 'Chat' }, { i: Image, l: 'Images' }, { i: Code2, l: 'Code' }, { i: Mic, l: 'Voice' },
  { i: Video, l: 'Video' }, { i: Bot, l: 'Agents' }, { i: Sparkles, l: 'Copilots' },
];
const JOBS = [
  { i: Megaphone, l: 'Marketing' }, { i: Palette, l: 'Design' }, { i: Headphones, l: 'Support' },
  { i: LineChart, l: 'Sales' }, { i: Calculator, l: 'Finance' }, { i: PenTool, l: 'Writing' },
];

// 0 – 8.3s
export const VOpen: React.FC = () => {
  const f = useCurrentFrame();
  const t = f / FPS;
  const kp = kickPulse(f);
  const scan = prog(f, 0.15, 0.75, easeInOut);
  const [sqx, sqy] = squash(f, 0.75, 0.12);
  const speedAt = (k: number) => interpolate(k, [2.0, 3.2, 4.0, 5.4], [500, 1300, 1300, 3200], clamp);
  const speed = speedAt(t);
  let dist = 0;
  for (let k = 2.0; k < t; k += 1 / FPS) dist += speedAt(k) / FPS;
  const streamOut = prog(f, 5.7, 6.0, (x) => x * x);
  return (
    <AbsoluteFill>
      <NeonBg speed={40 + (t > 2 ? speed / 10 : 0)} />
      {t > 2.2 && t < 6.1 && Array.from({ length: 30 }).map((_, i) => {
        const y = 200 + rand(i) * 1400;
        const x = 1080 - ((dist * (0.8 + rand(i + 3)) + rand(i + 7) * 1080) % 1700);
        return <div key={i} style={{ position: 'absolute', left: x, top: y, width: 60 + speed * 0.1, height: 4, borderRadius: 2, background: i % 3 ? 'rgba(255,255,255,0.35)' : NEON, opacity: 0.7 }} />;
      })}
      {t > 2.0 && t < 6.1 && (
        <AbsoluteFill style={{ opacity: 1 - streamOut }}>
          {TOOLS.concat(TOOLS).map((tl, i) => {
            const lane = i % 3;
            const x = 1300 - ((dist * (1 + lane * 0.18) + i * 330) % 2300);
            const Icon = tl.i;
            const st = smear(speed / 60, 0.012);
            return (
              <At key={i} x={x + 300} y={800 + lane * 150} sx={st} sy={1 / Math.sqrt(st)} r={-3 + lane * 3}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '18px 30px', borderRadius: 26, background: lane === 1 ? C.blue : 'rgba(30,40,110,0.92)',
                  border: `3px solid ${NEON}55`, color: C.white, fontFamily: display, fontWeight: 800, fontSize: 44, whiteSpace: 'nowrap' }}>
                  <Icon size={48} color={NEON} strokeWidth={2.6} />{tl.l}
                </div>
              </At>
            );
          })}
        </AbsoluteFill>
      )}
      <AbsoluteFill style={{ opacity: out(f, 5.75) }}>
        <At x={540} y={360}><Word at={2.0} size={260} color={NEON} style={{ textShadow: `0 0 40px ${NEON}` }}>AI</Word></At>
        <Line y={560}><Word at={2.48} size={104}>is</Word><Word at={2.7} size={104}>moving</Word><Word at={3.2} size={104} tilt={-10}>fast.</Word></Line>
        <At x={540} y={730} s={pop(f, 4.63, { damping: 7 })} r={-5 + Math.sin(t * 40) * (t > 4.6 && t < 5.8 ? 2 : 0)}>
          <Pill bg={C.yellow} color={C.ink} size={84} shadow={C.yellowDeep}>really fast.</Pill>
        </At>
      </AbsoluteFill>
      {t > 5.85 && (
        <>
          <Line y={330}><Word at={6.26} size={84}>the</Word><Word at={6.36} size={84}>way</Word><Word at={6.53} size={84}>we</Word><Word at={6.7} size={84} color={C.yellow}>work</Word></Line>
          <Line y={440}><Word at={7.01} size={84}>is</Word><Word at={7.17} size={84} color={NEON}>changing.</Word></Line>
          {JOBS.map((j, i) => {
            const col = i % 3, row = Math.floor(i / 3);
            const inP = pop(f, 5.95 + i * 0.06);
            const fp = prog(f, 6.7 + i * 0.125, 7.0 + i * 0.125, easeInOut);
            const front = fp < 0.5;
            const Icon = j.i;
            return (
              <At key={i} x={200 + col * 340} y={690 + row * 290} s={inP * (1 + (fp > 0.5 ? kp * 0.05 : 0))}>
                <div style={{ width: 300, height: 260, borderRadius: 34, transform: `perspective(900px) rotateY(${fp * 180}deg)`,
                  background: front ? 'rgba(255,255,255,0.1)' : C.blue, border: `3px solid ${front ? 'rgba(255,255,255,0.2)' : NEON}`,
                  boxShadow: front ? 'none' : `0 0 40px ${NEON}55`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ transform: front ? undefined : 'scaleX(-1)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, color: C.white }}>
                    <div style={{ position: 'relative' }}>
                      {front ? <Briefcase size={70} color="rgba(255,255,255,0.6)" strokeWidth={2.2} /> : <Icon size={70} color={C.white} strokeWidth={2.4} />}
                      {!front && <Sparkles size={38} color={C.yellow} fill={C.yellow} style={{ position: 'absolute', right: -34, top: -22 }} />}
                    </div>
                    <span style={{ fontFamily: display, fontWeight: 800, fontSize: 40 }}>{j.l}</span>
                    <span style={{ fontFamily: body, fontWeight: 700, fontSize: 24, color: front ? 'rgba(255,255,255,0.5)' : NEON }}>{front ? 'the old way' : 'with AI'}</span>
                  </div>
                </div>
              </At>
            );
          })}
        </>
      )}
      <AbsoluteFill style={{ clipPath: `inset(${(1 - scan) * 100}% 0 0 0)` }}>
        <At x={AX} y={AY} s={1.15} sx={sqx} sy={sqy}>
          <Ada poses={[{ t: 0, p: 'wave' }, { t: 1.8, p: 'talk' }, { t: 4.0, p: 'shrug' }, { t: 5.9, p: 'pointUpR' }]} />
        </At>
      </AbsoluteFill>
      {scan > 0 && scan < 1 && <div style={{ position: 'absolute', left: 0, right: 0, top: 1920 * (1 - scan), height: 6, background: NEON, boxShadow: `0 0 30px ${NEON}` }} />}
      <AbsoluteFill style={{ opacity: out(f, 1.7) }}>
        <At x={540} y={700} s={pop(f, 0.7)} r={-6}><Pill bg={NEON} color={C.ink} size={100} shadow="#2FA8D8">Hey, it&apos;s Ada!</Pill></At>
        <Burst x={540} y={700} at={1.25} n={14} r={330} color={NEON} />
        <Sparkle x={900} y={600} at={1.3} size={40} />
      </AbsoluteFill>
      <Ring x={540} y={960} at={0.15} r={900} color={NEON} w={20} />
    </AbsoluteFill>
  );
};

const LIT = new Set([2, 8, 12, 16, 22]);
// 8.3 – 13.9s
export const VRelevant: React.FC = () => {
  const f = useCurrentFrame();
  const t = f / FPS;
  const kp = kickPulse(f);
  const dim = prog(f, 10.54, 11.2);
  const rise = spr(f, 12.42, { damping: 10, stiffness: 150 });
  const sweep = prog(f, 9.0, 10.4, easeInOut);
  return (
    <AbsoluteFill>
      <NeonBg hue="#141B4E" speed={20} />
      <div style={{ position: 'absolute', left: 540 + Math.sin(sweep * Math.PI * 2) * 300 - 260, top: -200, width: 520, height: 2400,
        background: 'linear-gradient(180deg, rgba(255,255,255,0.18), transparent 70%)', clipPath: 'polygon(40% 0, 60% 0, 100% 100%, 0 100%)', opacity: 1 - dim }} />
      <Line y={300}><Word at={8.73} size={96} until={10.45}>Who</Word><Word at={9.32} size={96} until={10.45}>stays</Word></Line>
      <Line y={410}><Word at={9.71} size={96} color={C.yellow} until={10.45}>relevant?</Word></Line>
      <Line y={300}><Word at={11.14} size={96}>The</Word><Word at={11.14} size={96}>ones</Word><Word at={11.44} size={96}>who</Word></Line>
      <Line y={410}><Word at={12.42} size={96} color={NEON} style={{ textShadow: `0 0 26px ${NEON}` }}>use</Word><Word at={13.03} size={96} color={NEON} style={{ textShadow: `0 0 26px ${NEON}` }}>AI.</Word></Line>
      {Array.from({ length: 25 }).map((_, i) => {
        const col = i % 5, row = Math.floor(i / 5);
        const lit = LIT.has(i);
        const p = pop(f, 8.73 + (col + row) * 0.035);
        const x = 160 + col * 190, y = 590 + row * 150 - (lit ? rise * 60 : dim * 18);
        const glow = lit ? prog(f, 10.54 + (i % 5) * 0.06, 10.9 + (i % 5) * 0.06) : 0;
        return (
          <At key={i} x={x} y={y + Math.sin(t * 2 + i) * 4} s={p * (lit ? 1 + glow * 0.2 + kp * 0.05 : 1 - dim * 0.15)} z={lit ? 5 : 1}>
            <div style={{ position: 'relative', width: 120, height: 120, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: lit && glow > 0 ? C.blue : `rgba(255,255,255,${0.16 - dim * 0.1})`, border: `4px solid ${lit && glow > 0 ? NEON : 'rgba(255,255,255,0.2)'}`,
              boxShadow: lit ? `0 0 ${40 * glow}px ${NEON}` : 'none', opacity: lit ? 1 : 1 - dim * 0.55 }}>
              <User size={66} color={lit && glow > 0 ? '#fff' : 'rgba(255,255,255,0.7)'} strokeWidth={2.4} />
              {lit && glow > 0 && <Sparkles size={42} color={C.yellow} fill={C.yellow} style={{ position: 'absolute', right: -12, top: -14, transform: `scale(${glow})` }} />}
            </div>
          </At>
        );
      })}
      {[...LIT].map((i) => <Burst key={i} x={160 + (i % 5) * 190} y={590 + Math.floor(i / 5) * 150} at={12.42} n={8} r={110} len={34} w={6} color={NEON} />)}
      <At x={AX} y={AY + 60} s={1.1}><Ada poses={[{ t: 0, p: 'think' }, { t: 10.54, p: 'talk' }, { t: 12.3, p: 'pointUpR' }]} /></At>
    </AbsoluteFill>
  );
};

// 13.9 – 17.6s
export const VShortcut: React.FC = () => {
  const f = useCurrentFrame();
  const kp = kickPulse(f);
  const maze = 'M140 1460 L140 1260 L460 1260 L460 1420 L780 1420 L780 1100 L300 1100 L300 900 L900 900 L900 740 L540 740 L540 580 L920 580';
  const mazeDraw = prog(f, 13.95, 14.7);
  const cut = prog(f, 14.72, 15.15, (x) => 1 - Math.pow(1 - x, 4));
  const S = { x: 140, y: 1460 }, G = { x: 920, y: 580 };
  return (
    <AbsoluteFill>
      <NeonBg hue="#1B2A7A" speed={60} />
      <svg style={{ position: 'absolute', inset: 0 }} width={1080} height={1920}>
        <path d={maze} fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth={22} strokeLinejoin="round" strokeLinecap="round" pathLength={1} strokeDasharray={`${mazeDraw} 1`} />
        <line x1={S.x} y1={S.y} x2={S.x + (G.x - S.x) * cut} y2={S.y + (G.y - S.y) * cut} stroke={NEON} strokeWidth={28} strokeLinecap="round" style={{ filter: `drop-shadow(0 0 18px ${NEON})` }} />
        <circle cx={S.x} cy={S.y} r={30} fill={C.white} />
      </svg>
      <At x={G.x} y={G.y} s={pop(f, 14.0) * (1 + kp * 0.06)}>
        <div style={{ width: 150, height: 150, borderRadius: '50%', background: C.yellow, boxShadow: `0 0 0 16px rgba(255,200,0,0.25), 0 10px 0 ${C.yellowDeep}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Zap size={80} color={C.ink} fill={C.ink} />
        </div>
      </At>
      <At x={G.x - 20} y={G.y + 130} s={pop(f, 14.2)}><span style={{ fontFamily: display, fontWeight: 800, fontSize: 40, color: C.white }}>Relevant</span></At>
      <At x={400} y={1530} s={pop(f, 14.0)} o={1 - cut * 0.6}>
        <Pill size={34} bg="rgba(255,255,255,0.12)" color="rgba(255,255,255,0.75)" shadow="rgba(0,0,0,0.2)"><Route size={34} />Figuring it out alone</Pill>
      </At>
      <Ring x={G.x} y={G.y} at={15.15} r={500} color={NEON} w={26} />
      <Burst x={G.x} y={G.y} at={15.15} n={16} r={260} color={NEON} />
      <Line y={290}><Word at={14.14} size={92}>So</Word><Word at={14.21} size={92}>here&apos;s</Word><Word at={14.58} size={92}>your</Word></Line>
      <Line y={400}><Word at={14.72} size={92} color={C.yellow}>shortcut:</Word></Line>
      <At x={540} y={1040} s={spr(f, 16.27, { damping: 8, stiffness: 220 })} r={-5}>
        <Pill bg={C.blue} color={C.white} size={120} shadow="#1E2FA8" style={{ border: `5px solid ${NEON}`, boxShadow: `0 14px 0 #1E2FA8, 0 0 60px ${NEON}88` }}>
          <Sparkles size={110} color={C.yellow} fill={C.yellow} />AI track
        </Pill>
      </At>
      <Burst x={540} y={1040} at={16.27} n={18} r={440} len={110} w={14} color={C.yellow} />
      <Sparkle x={900} y={900} at={16.4} size={44} color={C.yellow} />
    </AbsoluteFill>
  );
};

// 17.6 – 20.05s
export const VMeet: React.FC = () => {
  const f = useCurrentFrame();
  const t = f / FPS;
  const kp = kickPulse(f);
  const pre = pop(f, 17.65, { damping: 14, stiffness: 160 });
  const slam = t >= 18 ? spr(f, 18.0, { damping: 8, stiffness: 260, mass: 0.7 }) : 0;
  const [sx, sy] = squash(f, 18.0, 0.22);
  const scale = interpolate(pre, [0, 1], [0, 0.42]) + slam * 0.58 + kp * 0.03;
  const orbit = ['art/xp-bolt.svg', 'art/boost-coin.svg', 'art/heart.svg', 'art/chest-gold.svg', 'art/freeze.svg', 'art/medal-1.svg'];
  const LY = 860;
  return (
    <AbsoluteFill style={{ background: `radial-gradient(80% 60% at 50% 45%, ${C.blueSoft}, ${C.blueDeep})`, overflow: 'hidden' }}>
      <Rays o={prog(f, 17.9, 18.2)} speed={16} x={540} y={LY} />
      <At x={540} y={420} o={t < 18.0 ? 1 : Math.max(0, 1 - (t - 18.0) * 6)}><Word at={17.74} size={110}>Meet</Word></At>
      {orbit.map((src, i) => {
        const p = t >= 18 ? spr(f, 18.0 + i * 0.03, { damping: 12, stiffness: 120 }) : 0;
        const a = i * 1.05 + t * 0.6, R = 380 * p;
        return <At key={i} x={540 + Math.cos(a) * R} y={LY + Math.sin(a) * R * 1.05} s={p * (0.95 + kp * 0.12)} r={Math.sin(t * 3 + i) * 12}><Art src={src} size={130} /></At>;
      })}
      <Ring x={540} y={LY} at={18.0} r={1000} w={40} />
      <Ring x={540} y={LY} at={18.08} r={760} w={22} color={NEON} />
      <Burst x={540} y={LY} at={18.0} n={18} r={330} len={140} w={14} color={C.yellow} />
      <At x={540} y={LY} s={scale} sx={sx} sy={sy} r={interpolate(pre, [0, 1], [-40, -8]) + slam * 8}><LogoTile size={500} /></At>
      <Confetti x={540} y={LY} at={18.0} n={60} spread={1300} seed={5} />
      <Line y={1340}><Word at={18.4} size={80}>Put</Word><Word at={18.48} size={80} color={C.yellow}>AI</Word><Word at={18.56} size={80}>to</Word><Word at={18.64} size={80}>work,</Word></Line>
      <Line y={1450}><Word at={18.9} size={80}>then</Word><Word at={18.98} size={80} color={C.yellow}>build</Word><Word at={19.06} size={80}>with</Word><Word at={19.14} size={80}>it.</Word></Line>
    </AbsoluteFill>
  );
};
