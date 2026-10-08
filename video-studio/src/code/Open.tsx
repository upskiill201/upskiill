import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { Bug, Search, User, Sparkles, Code2, Terminal } from 'lucide-react';
import { Ada } from '../components/Ada';
import { At, Burst, Pill, Ring, Sparkle, Word } from '../components/fx';
import { Rays } from '../scenes/Logo';
import { NEON } from '../ai/kit';
import { C, FPS, body, display, mono } from '../theme';
import { easeInOut, kickPulse, out, pop, prog, rand, spr, squash } from '../lib/anim';

const clamp = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;
const SNIPS = [
  'const app = express();', 'export default function App() {', 'useEffect(() => load(), []);', 'SELECT * FROM bookings', 'await db.insert(user);',
  'return <Card {...props} />;', 'if (!res.ok) throw err;', 'router.get("/api/slots")', 'const [items, setItems] = useState([])', 'npm run deploy',
];
const SYN = ['#FF8FC8', '#5CE1FF', '#FFC800', '#7CF29A', '#C3CCFF'];

/** IDE backdrop: deep ink, drifting faint code. */
export const CodeBg: React.FC<{ tint?: string; o?: number }> = ({ tint = '#16205A', o = 0.09 }) => {
  const f = useCurrentFrame();
  const t = f / FPS;
  const kp = kickPulse(f);
  return (
    <AbsoluteFill style={{ background: `radial-gradient(100% 90% at 50% 40%, ${tint}, #0A0F2A)`, overflow: 'hidden' }}>
      {Array.from({ length: 22 }).map((_, i) => (
        <div key={i} style={{ position: 'absolute', left: (rand(i) * 1600 - 200 + t * (10 + rand(i + 1) * 20)) % 2100 - 100, top: i * 50, whiteSpace: 'nowrap',
          fontFamily: mono, fontSize: 30, color: SYN[i % SYN.length], opacity: o + kp * 0.03 }}>{SNIPS[i % SNIPS.length]}   {SNIPS[(i + 3) % SNIPS.length]}</div>
      ))}
      <AbsoluteFill style={{ background: 'radial-gradient(60% 60% at 50% 50%, transparent, rgba(5,8,25,0.7))' }} />
    </AbsoluteFill>
  );
};

/** Editor window whose code streams in at `cps` chars/sec starting at `start`. */
export const Stream: React.FC<{ start: number; cps: number; lines: string[]; w: number; h: number; title?: string; size?: number; mark?: { line: number; at: number; color: string } }> = ({
  start, cps, lines, w, h, title = 'app.tsx', size = 30, mark,
}) => {
  const f = useCurrentFrame();
  const t = f / FPS;
  let budget = Math.max(0, (t - start) * cps);
  return (
    <div style={{ width: w, height: h, borderRadius: 30, background: '#0F1533', border: '3px solid rgba(92,225,255,0.35)', boxShadow: '0 30px 70px rgba(0,0,0,0.5)', overflow: 'hidden' }}>
      <div style={{ height: 58, background: '#19214A', display: 'flex', alignItems: 'center', gap: 12, padding: '0 22px' }}>
        {['#FF6B5B', '#FFC800', '#22C55E'].map((c, i) => <div key={i} style={{ width: 16, height: 16, borderRadius: 8, background: c }} />)}
        <span style={{ marginLeft: 16, fontFamily: mono, fontSize: 22, color: '#9AA6D6' }}>{title}</span>
      </div>
      <div style={{ padding: '16px 24px', fontFamily: mono, fontSize: size, lineHeight: 1.5 }}>
        {lines.map((ln, i) => {
          const take = Math.max(0, Math.min(ln.length, Math.floor(budget)));
          budget -= ln.length + 2;
          if (take <= 0 && i > 0 && budget < -(ln.length + 2)) return <div key={i} style={{ height: size * 1.5 }} />;
          const m = mark && mark.line === i && t >= mark.at;
          return (
            <div key={i} style={{ display: 'flex', whiteSpace: 'pre', height: size * 1.5, background: m ? `${mark!.color}33` : undefined, borderRadius: 8 }}>
              <span style={{ color: '#46507A', width: size * 1.6 }}>{i + 1}</span>
              <span style={{ color: SYN[i % SYN.length], textDecoration: m ? `underline wavy ${mark!.color}` : undefined }}>{ln.slice(0, take)}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const AI_CODE = [
  'export async function bookSlot(req) {', '  const { userId, slot } = req.body;', '  const taken = await db.find(slot);', '  if (taken) return conflict();',
  '  const total = cart.items.length * price;', '  await db.insert({ userId, slot });', '  await mail.confirm(userId, slot);', '  return ok({ slot, total });', '}',
];

// 0 – 9.9s  "Hey, it's Ada! Coding has changed. With today's frontier AI models, one person can build what used to take a whole team."
export const CodeOpen: React.FC = () => {
  const f = useCurrentFrame();
  const t = f / FPS;
  const kp = kickPulse(f);
  const term = pop(f, 0.05, { damping: 14 });
  const termOut = prog(f, 0.55, 0.8, (x) => x * x);
  const adaIn = spr(f, 0.6, { damping: 10, stiffness: 160 });
  const glide = prog(f, 1.75, 2.15, easeInOut);
  const changed = t >= 2.97;
  const team = (i: number) => pop(f, 8.84 + i * 0.05);
  const merge = prog(f, 9.35, 9.75, easeInOut);
  return (
    <AbsoluteFill>
      <CodeBg />
      {/* terminal boots, Ada jumps out of it */}
      <At x={960} y={540} s={term * (1 - termOut)} o={1 - termOut}>
        <div style={{ width: 640, height: 260, borderRadius: 26, background: '#0F1533', border: `3px solid ${NEON}66`, padding: 30, boxSizing: 'border-box', fontFamily: mono, fontSize: 40, color: '#7CF29A' }}>
          <Terminal size={36} color={NEON} /> {'> hello, world'.slice(0, Math.floor(interpolate(t, [0.1, 0.5], [0, 14], clamp)))}
        </div>
      </At>
      <At x={interpolate(glide, [0, 1], [960, 1560])} y={880 + (1 - adaIn) * 600} s={0.98} sx={squash(f, 0.95, 0.14)[0]} sy={squash(f, 0.95, 0.14)[1]}>
        <Ada poses={[{ t: 0, p: 'wave' }, { t: 1.8, p: 'talk' }, { t: 4.0, p: 'pointL' }, { t: 6.6, p: 'talk2' }, { t: 8.8, p: 'open' }]} />
      </At>
      <AbsoluteFill style={{ opacity: out(f, 1.7) }}>
        <At x={960} y={260} s={pop(f, 0.7)} r={-5}><Pill bg={NEON} color={C.ink} size={96} shadow="#2FA8D8">Hey, it&apos;s Ada!</Pill></At>
        <Burst x={960} y={260} at={1.25} n={14} r={300} color={NEON} />
      </AbsoluteFill>

      {/* Coding has changed */}
      <At x={720} y={150} o={out(f, 3.95)}>
        <div style={{ whiteSpace: 'nowrap' }}>
          <Word at={2.0} size={110}>Coding</Word><Word at={2.64} size={110}>has</Word>
          <Word at={2.97} size={110} color={changed ? C.yellow : '#fff'} style={{ transform: t > 2.97 && t < 3.25 ? `translateX(${(rand(f) - 0.5) * 30}px) skewX(${(rand(f + 3) - 0.5) * 30}deg)` : undefined }}>changed.</Word>
        </div>
      </At>
      {/* old way: grey monochrome code wall */}
      <At x={720} y={560} s={pop(f, 2.1, { damping: 14 })} o={1 - prog(f, 3.9, 4.1)}>
        <div style={{ width: 1000, padding: 30, borderRadius: 30, background: 'rgba(255,255,255,0.06)', fontFamily: mono, fontSize: 30, lineHeight: 1.55, color: changed ? '#C3CCFF' : 'rgba(255,255,255,0.4)' }}>
          {['for (i = 0; i < n; i++) {', '  // ...line 1 of 40,000', '  // three weeks later...', '}'].map((l, i) => <div key={i} style={{ whiteSpace: 'pre' }}>{l}</div>)}
        </div>
      </At>

      {/* frontier models: a prompt turns into a stream of code */}
      {t > 3.95 && t < 9.95 && (
        <>
          <At x={720} y={150} o={out(f, 8.7)}>
            <div style={{ whiteSpace: 'nowrap' }}>
              <Word at={4.08} size={84}>With</Word><Word at={4.45} size={84}>today&apos;s</Word><Word at={4.85} size={84} color={NEON} style={{ textShadow: `0 0 24px ${NEON}` }}>frontier</Word>
              <Word at={5.41} size={84} color={NEON} style={{ textShadow: `0 0 24px ${NEON}` }}>AI</Word>
            </div>
          </At>
          <At x={720} y={300} s={pop(f, 4.2)} o={out(f, 8.7)}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '18px 30px', borderRadius: 999, background: C.violet, fontFamily: body, fontWeight: 700, fontSize: 36, color: '#fff', boxShadow: `0 0 40px ${C.violet}` }}>
              <Sparkles size={38} color={C.yellow} fill={C.yellow} />Build a booking app with payments
            </div>
          </At>
          <At x={720} y={680} s={pop(f, 4.6, { damping: 14 })} o={out(f, 8.7)}>
            <Stream start={4.9} cps={95} lines={AI_CODE} w={1060} h={520} title="booking.ts" />
          </At>
          <At x={1560} y={300} s={pop(f, 6.62, { damping: 8 })} o={out(f, 8.6)} r={-5}>
            <Pill bg={C.yellow} color={C.ink} size={64} shadow={C.yellowDeep}><User size={60} strokeWidth={3} />One person</Pill>
          </At>
          <Burst x={1560} y={300} at={6.62} n={12} r={260} color={C.yellow} />
          {/* one person vs a whole team */}
          <At x={720} y={190}>
            <div style={{ whiteSpace: 'nowrap' }}>
              <Word at={8.84} size={88}>what</Word><Word at={8.84} size={88}>took</Word><Word at={8.9} size={88}>a</Word><Word at={9.0} size={88} color={C.yellow}>whole team.</Word>
            </div>
          </At>
          {Array.from({ length: 6 }).map((_, i) => {
            const x0 = 300 + i * 165, x = interpolate(merge, [0, 1], [x0, 1300]);
            return (
              <At key={i} x={x} y={520 + Math.sin(t * 3 + i) * 6} s={team(i) * (1 - merge * 0.6)} o={1 - merge}>
                <div style={{ width: 130, height: 130, borderRadius: '50%', background: [C.coral, C.green, C.pink, C.sky, C.orange, C.violet][i], border: '6px solid #fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <User size={70} color="#fff" />
                </div>
              </At>
            );
          })}
          <Burst x={1400} y={600} at={9.6} n={16} r={300} color={C.yellow} />
          <Ring x={1400} y={600} at={9.6} r={500} color={C.yellow} w={24} />
        </>
      )}
    </AbsoluteFill>
  );
};

// 9.9 – 15.2s  "But AI writes code fast… and someone still has to know if it's right."
export const Check: React.FC = () => {
  const f = useCurrentFrame();
  const t = f / FPS;
  const scanY = interpolate(t, [12.9, 14.0], [0, 1], { ...clamp, easing: easeInOut });
  const found = t >= 13.7;
  return (
    <AbsoluteFill>
      <CodeBg tint="#2A1640" />
      <At x={960} y={130}>
        <div style={{ whiteSpace: 'nowrap' }}>
          <Word at={10.23} size={88}>But</Word><Word at={10.39} size={88} color={NEON}>AI</Word><Word at={10.72} size={88}>writes</Word>
          <Word at={11.14} size={88}>code</Word><Word at={11.57} size={88} color={C.yellow} tilt={-12}>fast…</Word>
        </div>
      </At>
      <At x={760} y={600} s={pop(f, 10.2, { damping: 14 })}>
        <div style={{ position: 'relative' }}>
          <Stream start={10.35} cps={140} lines={AI_CODE} w={1100} h={640} title="booking.ts — AI generated" size={32} mark={{ line: 4, at: 13.7, color: C.coral }} />
          {/* magnifier scan */}
          {t > 12.85 && (
            <div style={{ position: 'absolute', left: 60 + scanY * 700, top: 90 + Math.sin(scanY * Math.PI) * 120 + scanY * 150, transform: `scale(${pop(f, 12.85)})` }}>
              <Search size={150} color="#fff" strokeWidth={2.4} />
            </div>
          )}
        </div>
      </At>
      <At x={1560} y={520} s={pop(f, 13.7, { damping: 8 })} r={6}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 18, padding: '24px 34px', borderRadius: 30, background: C.coral, color: '#fff', fontFamily: display, fontWeight: 800, fontSize: 46, boxShadow: '0 10px 0 #C2412F' }}>
          <Bug size={56} />Wrong total
        </div>
      </At>
      <At x={1560} y={700} s={pop(f, 14.05)}>
        <span style={{ fontFamily: mono, fontWeight: 700, fontSize: 30, color: '#FFB4AA' }}>price × items ≠ sum of prices</span>
      </At>
      <At x={1500} y={900} s={pop(f, 14.65, { damping: 7 })}>
        <div style={{ whiteSpace: 'nowrap' }}><Word at={12.89} size={70}>someone</Word><Word at={13.42} size={70}>has</Word><Word at={13.91} size={70}>to</Word><Word at={14.05} size={70} color={C.yellow}>know.</Word></div>
      </At>
      <Burst x={1560} y={520} at={13.7} n={12} r={250} color={C.coral} />
    </AbsoluteFill>
  );
};

// 15.2 – 19.35s  "That someone could be you. The coding track."
export const You: React.FC = () => {
  const f = useCurrentFrame();
  const t = f / FPS;
  const kp = kickPulse(f);
  const bright = prog(f, 15.4, 19.2, (x) => x);
  return (
    <AbsoluteFill>
      <CodeBg tint="#1A2370" o={0.05} />
      <AbsoluteFill style={{ background: `radial-gradient(80% 80% at 50% 50%, ${C.blueSoft}, ${C.blueDeep})`, opacity: bright * 0.9 }} />
      <Rays o={bright} speed={10 + bright * 30} />
      <div style={{ position: 'absolute', left: 960 - 420, top: -100, width: 840, height: 1300, background: 'linear-gradient(180deg, rgba(255,255,255,0.3), transparent 85%)', clipPath: 'polygon(36% 0, 64% 0, 100% 100%, 0 100%)', opacity: 1 - bright * 0.6 }} />
      <At x={960} y={880 + (1 - spr(f, 15.25, { damping: 11 })) * 700} s={1 + bright * 0.04 + kp * 0.01}>
        <Ada poses={[{ t: 0, p: 'open' }, { t: 16.3, p: 'fist' }, { t: 17.5, p: 'pointUpR' }]} />
      </At>
      <At x={960} y={130}>
        <div style={{ whiteSpace: 'nowrap' }}>
          <Word at={15.43} size={92}>That</Word><Word at={15.52} size={92}>someone</Word><Word at={15.99} size={92}>could</Word><Word at={16.29} size={92}>be</Word>
          <Word at={16.46} size={92} color={C.yellow} style={{ textShadow: `0 8px 0 ${C.yellowDeep}` }}>you.</Word>
        </div>
      </At>
      <Burst x={1380} y={130} at={16.46} n={14} r={240} color={C.yellow} />
      <At x={960} y={330} s={spr(f, 17.6, { damping: 8, stiffness: 220 }) * (1 + kp * 0.04)} r={-6}>
        <Pill bg={C.yellow} color={C.ink} size={96} shadow={C.yellowDeep}><Code2 size={92} strokeWidth={3} />Coding track</Pill>
      </At>
      <Burst x={960} y={330} at={17.6} n={18} r={380} len={110} w={14} color={C.white} />
      <Sparkle x={1780} y={400} at={17.8} size={44} color={C.yellow} />
    </AbsoluteFill>
  );
};
