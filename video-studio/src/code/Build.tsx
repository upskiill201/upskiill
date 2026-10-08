import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { Eye, Wrench, ShieldCheck, Globe, Smartphone, Rocket, Sparkles, Check, Star, Heart, Music, Camera, ShoppingBag, MessageCircle, Map, CalendarDays, Wallet, Gamepad2, User } from 'lucide-react';
import { Ada } from '../components/Ada';
import { Bg } from '../components/Bg';
import { At, Art, Burst, Card, Confetti, Pill, Ring, Sparkle, Word } from '../components/fx';
import { Rays } from '../scenes/Logo';
import { NEON } from '../ai/kit';
import { CodeBg } from './Open';
import { C, FPS, body, display, mono } from '../theme';
import { easeInOut, kickPulse, out, pop, prog, rand, spr, squash } from '../lib/anim';

const clamp = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;

// 22.0 – 26.2s  "Learn the fundamentals, so you can read, fix and trust any code."
export const Fundamentals: React.FC = () => {
  const f = useCurrentFrame();
  const t = f / FPS;
  const kp = kickPulse(f);
  const BLOCKS = [
    { l: 'variables', c: C.sky, at: 22.39 }, { l: 'loops', c: C.yellow, at: 22.52 }, { l: 'functions', c: C.pink, at: 22.65 },
    { l: 'data', c: '#7CF29A', at: 22.78 }, { l: 'logic', c: C.orange, at: 22.91 }, { l: 'APIs', c: C.violet, at: 23.04 },
  ];
  const read = prog(f, 23.68, 24.1);
  const fixed = t >= 24.18;
  const trust = pop(f, 24.77, { damping: 8 });
  return (
    <AbsoluteFill>
      <Bg from={C.blueSoft} to={C.blueDeep} seed="fund" />
      <At x={960} y={110}>
        <div style={{ whiteSpace: 'nowrap' }}>
          <Word at={22.1} size={90}>Learn</Word><Word at={22.28} size={90}>the</Word><Word at={22.39} size={90} color={C.yellow}>fundamentals</Word>
        </div>
      </At>
      {/* foundation blocks */}
      {BLOCKS.map((b, i) => {
        const col = i % 3, row = Math.floor(i / 3);
        const p = spr(f, b.at, { damping: 12, stiffness: 240 });
        const [sx, sy] = squash(f, b.at + 0.12, 0.16);
        return (
          <At key={i} x={250 + col * 250} y={interpolate(p, [0, 1], [-200, 820 - row * 120], clamp)} sx={sx} sy={sy} o={f < b.at * FPS ? 0 : 1}>
            <div style={{ width: 236, height: 104, borderRadius: 24, background: b.c, boxShadow: '0 8px 0 rgba(0,0,0,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: mono, fontWeight: 700, fontSize: 34, color: C.ink }}>{b.l}</div>
          </At>
        );
      })}
      {/* read → fix → trust */}
      <At x={1330} y={560} s={pop(f, 23.1, { damping: 13 })}>
        <div style={{ width: 980, borderRadius: 30, background: '#0F1533', padding: '26px 30px', boxShadow: '0 30px 60px rgba(0,0,0,0.35)', fontFamily: mono, fontSize: 34, lineHeight: 1.7, position: 'relative' }}>
          {[
            ['function total(cart) {', '#C3CCFF'],
            fixed ? ['  return sum(cart.map(i => i.price));', '#7CF29A'] : ['  return cart.length * price;', '#FF8F84'],
            ['}', '#C3CCFF'],
          ].map(([l, c], i) => (
            <div key={i} style={{ whiteSpace: 'pre', color: c, borderRadius: 10, background: i === 1 ? (fixed ? 'rgba(34,197,94,0.18)' : `rgba(255,107,91,${0.25 * read})`) : undefined, fontSize: i === 1 && fixed ? 27 : 34 }}>{l}</div>
          ))}
          <div style={{ position: 'absolute', left: 30 + read * 640, top: 70, transform: `scale(${pop(f, 23.68)})`, opacity: fixed ? 0 : 1 }}><Eye size={70} color={NEON} /></div>
        </div>
      </At>
      {[{ l: 'Read', i: Eye, at: 23.68, x: 1050 }, { l: 'Fix', i: Wrench, at: 24.18, x: 1330 }, { l: 'Trust', i: ShieldCheck, at: 24.77, x: 1610 }].map((k, i) => {
        const Icon = k.i;
        return (
          <React.Fragment key={i}>
            <At x={k.x} y={830} s={pop(f, k.at, { damping: 8 }) * (1 + kp * 0.04)}>
              <Pill size={46} bg={i === 2 ? C.green : C.white} color={i === 2 ? '#fff' : C.navy} shadow={i === 2 ? C.greenDeep : undefined}><Icon size={46} strokeWidth={2.8} />{k.l}</Pill>
            </At>
            <Burst x={k.x} y={830} at={k.at} n={10} r={170} color={C.yellow} />
          </React.Fragment>
        );
      })}
      <At x={1600} y={330} s={trust} r={8}>
        <ShieldCheck size={150} color={C.green} fill="#fff" strokeWidth={2.4} />
      </At>
      <Ring x={1600} y={330} at={24.77} r={400} color={C.green} w={22} />
    </AbsoluteFill>
  );
};

// 26.2 – 30.3s  "Build real web and mobile apps, and ship them with AI tools."
export const Apps: React.FC = () => {
  const f = useCurrentFrame();
  const t = f / FPS;
  const kp = kickPulse(f);
  const web = spr(f, 27.02, { damping: 12 });
  const mob = spr(f, 27.4, { damping: 11 });
  const launch = prog(f, 28.52, 29.6, (x) => x * x);
  const ROWS = [0.9, 0.7, 0.8];
  return (
    <AbsoluteFill>
      <CodeBg tint="#1B2A7A" o={0.06} />
      <Rays o={0.5} speed={8} color="rgba(92,225,255,0.05)" />
      <At x={960} y={110}>
        <div style={{ whiteSpace: 'nowrap' }}>
          <Word at={26.3} size={90}>Build</Word><Word at={26.68} size={90} color={C.yellow}>real</Word><Word at={27.02} size={90}>web</Word>
          <Word at={27.28} size={90}>+</Word><Word at={27.4} size={90}>mobile</Word><Word at={27.8} size={90}>apps</Word>
        </div>
      </At>
      {/* browser */}
      <At x={720} y={590 - launch * 40} s={web} r={(1 - web) * -10}>
        <div style={{ width: 900, height: 560, borderRadius: 30, background: C.page, overflow: 'hidden', boxShadow: `0 0 0 4px ${NEON}66, 0 40px 80px rgba(0,0,0,0.45)` }}>
          <div style={{ height: 62, background: '#E3E8FA', display: 'flex', alignItems: 'center', gap: 12, padding: '0 22px' }}>
            {['#FF6B5B', '#FFC800', '#22C55E'].map((c, i) => <div key={i} style={{ width: 16, height: 16, borderRadius: 8, background: c }} />)}
            <div style={{ marginLeft: 16, flex: 1, height: 36, borderRadius: 18, background: '#fff', display: 'flex', alignItems: 'center', gap: 10, padding: '0 16px', fontFamily: body, fontWeight: 600, fontSize: 22, color: C.slate }}>
              <Globe size={22} />bookly.app
            </div>
          </div>
          <div style={{ padding: 30, display: 'flex', gap: 26 }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: display, fontWeight: 800, fontSize: 52, color: C.navy, transform: `translateY(${(1 - pop(f, 27.2)) * 40}px)` }}>Book a session</div>
              {ROWS.map((w, i) => <div key={i} style={{ height: 22, width: `${w * 100 * prog(f, 27.3 + i * 0.08, 27.6 + i * 0.08)}%`, borderRadius: 11, background: '#D6DCF5', marginTop: 20 }} />)}
              <div style={{ marginTop: 34, display: 'inline-flex', padding: '18px 40px', borderRadius: 999, background: C.blue, color: '#fff', fontFamily: display, fontWeight: 800, fontSize: 32, transform: `scale(${pop(f, 27.6)})`, boxShadow: `0 6px 0 ${C.blueDeep}` }}>Book now</div>
            </div>
            <div style={{ width: 300, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
              {Array.from({ length: 12 }).map((_, i) => <div key={i} style={{ height: 70, borderRadius: 16, background: i === 7 ? C.yellow : '#E8ECF8', transform: `scale(${pop(f, 27.3 + i * 0.03)})` }} />)}
            </div>
          </div>
        </div>
      </At>
      {/* phone */}
      <At x={1460} y={620 - launch * 40} s={mob} r={(1 - mob) * 20 + 4}>
        <div style={{ width: 330, height: 660, borderRadius: 56, background: C.ink, padding: 14, boxSizing: 'border-box', boxShadow: '0 40px 80px rgba(0,0,0,0.5)' }}>
          <div style={{ width: '100%', height: '100%', borderRadius: 44, background: C.page, overflow: 'hidden', padding: '60px 22px', boxSizing: 'border-box' }}>
            <div style={{ fontFamily: display, fontWeight: 800, fontSize: 36, color: C.navy }}>Today</div>
            {['9:00 Yoga', '11:30 Piano', '15:00 Coding'].map((l, i) => (
              <div key={i} style={{ marginTop: 18, padding: '18px 16px', borderRadius: 20, background: i === 2 ? C.blue : '#fff', color: i === 2 ? '#fff' : C.navy, fontFamily: body, fontWeight: 700, fontSize: 24,
                boxShadow: '0 5px 0 #E2E8F0', transform: `translateX(${(1 - pop(f, 27.6 + i * 0.1)) * 300}px)` }}>{l}</div>
            ))}
          </div>
        </div>
      </At>
      {/* ship it */}
      <At x={1100 + launch * 600} y={900 - launch * 1100} s={pop(f, 28.4)} r={45}>
        <Rocket size={130} color={C.yellow} fill={C.coral} strokeWidth={2} />
      </At>
      {launch > 0 && Array.from({ length: 10 }).map((_, i) => {
        const q = Math.max(0, launch - i * 0.04);
        return <div key={i} style={{ position: 'absolute', left: 1060 + q * 600 - i * 6, top: 940 - q * 1100 + i * 12, width: 30 - i * 2, height: 30 - i * 2, borderRadius: '50%', background: i % 2 ? C.yellow : '#fff', opacity: 0.8 - i * 0.07 }} />;
      })}
      <At x={480} y={940} s={pop(f, 28.52, { damping: 8 })} r={-5}>
        <Pill bg={C.green} color="#fff" size={52} shadow={C.greenDeep}><Check size={50} strokeWidth={4} />Shipped!</Pill>
      </At>
      <At x={960} y={960} s={pop(f, 29.23, { damping: 8 })} r={3}>
        <Pill bg={C.violet} color="#fff" size={52} shadow="#5F45E0"><Sparkles size={48} color={C.yellow} fill={C.yellow} />with AI tools</Pill>
      </At>
      <Burst x={960} y={960} at={29.23} n={14} r={280} color={C.yellow} />
      <Sparkle x={1700} y={250} at={28.9} size={40} />
    </AbsoluteFill>
  );
};

// 30.3 – 34.8s  "Go from your very first line of code to apps people actually use."
export const Journey: React.FC = () => {
  const f = useCurrentFrame();
  const t = f / FPS;
  const kp = kickPulse(f);
  const travel = prog(f, 31.3, 32.75, easeInOut);
  const pathD = 'M260 820 C 600 820, 700 380, 1000 420 S 1300 700, 1480 380';
  // sample the same cubic-ish path by drawing along it with dash
  const pt = (q: number) => {
    // approximate path by two cubic segments
    const cub = (p0: number[], p1: number[], p2: number[], p3: number[], u: number) => [0, 1].map((k) => (1 - u) ** 3 * p0[k] + 3 * (1 - u) ** 2 * u * p1[k] + 3 * (1 - u) * u * u * p2[k] + u ** 3 * p3[k]);
    return q < 0.5 ? cub([260, 820], [600, 820], [700, 380], [1000, 420], q * 2) : cub([1000, 420], [1300, 460], [1300, 700], [1480, 380], (q - 0.5) * 2);
  };
  const [ax, ay] = pt(travel);
  const users = [C.coral, C.green, C.pink, C.sky, C.orange, C.violet, C.yellow];
  return (
    <AbsoluteFill>
      <Bg from={C.blue} to="#3A1FB8" seed="jr" pulse={1.4} />
      <svg style={{ position: 'absolute', inset: 0 }} width={1920} height={1080}>
        <path d={pathD} fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth={30} strokeLinecap="round" />
        <path d={pathD} fill="none" stroke={C.yellow} strokeWidth={30} strokeLinecap="round" pathLength={1} strokeDasharray={`${travel} 1`} />
      </svg>
      {/* start: first line */}
      <At x={300} y={700} s={pop(f, 31.25, { damping: 8 })}>
        <div style={{ padding: '20px 30px', borderRadius: 24, background: '#0F1533', fontFamily: mono, fontSize: 38, color: '#7CF29A', boxShadow: '0 10px 0 rgba(0,0,0,0.25)' }}>print(&quot;hi&quot;)</div>
      </At>
      {/* traveller */}
      <At x={ax} y={ay} s={t > 31.25 ? 1 + kp * 0.1 : 0}>
        <div style={{ width: 70, height: 70, borderRadius: 35, background: '#fff', boxShadow: `0 0 0 12px rgba(255,200,0,0.4)` }} />
      </At>
      {/* end: an app people use */}
      <At x={1480} y={420} s={spr(f, 32.72, { damping: 10 })} r={Math.sin(t * 2) * 2}>
        <div style={{ width: 300, height: 540, borderRadius: 50, background: C.ink, padding: 12, boxSizing: 'border-box', boxShadow: '0 30px 60px rgba(0,0,0,0.4)' }}>
          <div style={{ width: '100%', height: '100%', borderRadius: 40, background: C.page, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
            <div style={{ width: 120, height: 120, borderRadius: 34, background: C.blue, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 8px 0 ${C.blueDeep}` }}><CalendarDays size={70} color="#fff" /></div>
            <div style={{ fontFamily: display, fontWeight: 800, fontSize: 36, color: C.navy }}>Your app</div>
            <div style={{ display: 'flex', gap: 4 }}>{Array.from({ length: 5 }).map((_, i) => <Star key={i} size={34} color={C.yellow} fill={C.yellow} style={{ transform: `scale(${pop(f, 33.58 + i * 0.06)})` }} />)}</div>
          </div>
        </div>
      </At>
      {users.map((c, i) => {
        const a = -2.6 + i * 0.75, R = 330;
        const p = pop(f, 33.11 + i * 0.07);
        return (
          <At key={i} x={1480 + Math.cos(a) * R} y={420 + Math.sin(a) * R * 0.85 + Math.sin(t * 3 + i) * 8} s={p}>
            <div style={{ width: 96, height: 96, borderRadius: '50%', background: c, border: '6px solid #fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><User size={52} color="#fff" /></div>
          </At>
        );
      })}
      {Array.from({ length: 8 }).map((_, i) => {
        const q = (t - 33.6 - i * 0.12) / 1.1;
        if (q < 0 || q > 1) return null;
        return <At key={i} x={1560 + (i % 4) * 30 + Math.sin(q * 6 + i) * 30} y={300 - q * 260} s={Math.sin(q * Math.PI)}><Heart size={50} color={C.coral} fill={C.coral} /></At>;
      })}
      <Ring x={1480} y={420} at={34.2} r={600} color={C.yellow} w={26} />
      <At x={700} y={130}>
        <div style={{ whiteSpace: 'nowrap' }}>
          <Word at={30.4} size={86}>From</Word><Word at={30.75} size={86}>your</Word><Word at={31.25} size={86} color={C.yellow}>first</Word><Word at={31.55} size={86}>line</Word>
        </div>
      </At>
      <At x={760} y={980}>
        <div style={{ whiteSpace: 'nowrap' }}>
          <Word at={32.32} size={80}>to</Word><Word at={32.72} size={80}>apps</Word><Word at={33.11} size={80}>people</Word><Word at={33.58} size={80} color={C.yellow}>actually</Word><Word at={34.2} size={80} color={C.yellow}>use.</Word>
        </div>
      </At>
    </AbsoluteFill>
  );
};

// 34.8 – 40.2s  "A few minutes a day, with instant feedback, streaks and leagues to keep you going."
export const HabitCode: React.FC = () => {
  const f = useCurrentFrame();
  const t = f / FPS;
  const kp = kickPulse(f);
  const streak = interpolate(t, [37.78, 38.4], [1, 128], { ...clamp, easing: easeInOut });
  return (
    <AbsoluteFill>
      <Bg from={C.blueSoft} to={C.blue} seed="hc" />
      <At x={960} y={110}>
        <div style={{ whiteSpace: 'nowrap' }}>
          <Word at={35.0} size={90}>A</Word><Word at={35.12} size={90}>few</Word><Word at={35.28} size={90} color={C.yellow}>minutes</Word><Word at={35.6} size={90}>a</Word><Word at={35.72} size={90}>day.</Word>
        </div>
      </At>
      <At x={960} y={900 + (1 - spr(f, 34.75, { damping: 12 })) * 700} s={0.9}>
        <Ada poses={[{ t: 0, p: 'open' }, { t: 36.4, p: 'pointL' }, { t: 38.4, p: 'pointR' }, { t: 39.3, p: 'cheer' }]} />
      </At>
      {/* instant feedback */}
      <At x={400} y={480} s={pop(f, 36.57)} r={-4}>
        <Card w={500} h={300} r={40} style={{ overflow: 'hidden' }}>
          <div style={{ padding: '30px 30px 0', fontFamily: mono, fontSize: 34, color: C.navy, whiteSpace: 'pre' }}>{'return a + b'}</div>
          <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 140, background: C.green, display: 'flex', alignItems: 'center', gap: 18, padding: '0 28px',
            transform: `translateY(${(1 - pop(f, 36.98)) * 150}px)`, fontFamily: display, fontWeight: 800, fontSize: 40, color: '#fff' }}>
            <div style={{ width: 64, height: 64, borderRadius: 32, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Check size={44} color={C.greenDeep} strokeWidth={4} /></div>
            Nice! +10 XP
          </div>
        </Card>
      </At>
      <Burst x={400} y={560} at={36.98} n={12} r={260} color={C.green} />
      {/* streak */}
      <At x={1520} y={360} s={pop(f, 37.78)} r={5}>
        <Card w={360} h={260} r={40} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
          <Art src="art/burn.png" size={110} style={{ transform: `scale(${1 + kp * 0.12})` }} />
          <div><div style={{ fontFamily: display, fontWeight: 800, fontSize: 84, color: C.orange, lineHeight: 1 }}>{Math.round(streak)}</div><div style={{ fontFamily: display, fontWeight: 800, fontSize: 30, color: C.navy }}>day streak</div></div>
        </Card>
      </At>
      {/* league */}
      <At x={1520} y={720} s={pop(f, 38.49)} r={-4}>
        <Card w={400} h={200} r={40} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 18 }}>
          <Art src="art/medal-1.svg" size={110} />
          <div><div style={{ fontFamily: display, fontWeight: 800, fontSize: 70, color: C.blue, lineHeight: 1 }}>#1</div><div style={{ fontFamily: display, fontWeight: 800, fontSize: 28, color: C.navy }}>Diamond League</div></div>
        </Card>
      </At>
      <Burst x={1520} y={720} at={38.49} n={12} r={250} color={C.white} />
      <At x={400} y={800} s={pop(f, 39.05, { damping: 8 })} r={-6}><Pill bg={C.yellow} color={C.ink} size={56} shadow={C.yellowDeep}>Keep going!</Pill></At>
    </AbsoluteFill>
  );
};

const APPS = [
  { i: MessageCircle, c: C.green }, { i: Music, c: C.pink }, { i: Camera, c: C.orange }, { i: ShoppingBag, c: C.coral },
  { i: Map, c: C.sky }, { i: Wallet, c: C.violet }, { i: Gamepad2, c: C.blue }, { i: CalendarDays, c: C.yellow },
];

// 40.2 – 45.9s  "In this new world, you won't just use apps. You'll build them."
export const BuildThem: React.FC = () => {
  const f = useCurrentFrame();
  const t = f / FPS;
  const kp = kickPulse(f);
  const drop = t >= 44.0;
  const blast = prog(f, 44.0, 44.6, (x) => 1 - Math.pow(1 - x, 3));
  const reform = prog(f, 44.63, 45.3, easeInOut);
  const tap = t > 42.4 && t < 42.6;
  return (
    <AbsoluteFill>
      {drop ? <AbsoluteFill style={{ background: `radial-gradient(80% 80% at 50% 50%, ${C.blueSoft}, ${C.blueDeep})` }}><Rays speed={16} /></AbsoluteFill> : <CodeBg tint="#1A2370" o={0.05} />}
      <At x={960} y={130} o={drop ? 0 : 1}>
        <div style={{ whiteSpace: 'nowrap' }}>
          <Word at={40.37} size={80}>In</Word><Word at={40.44} size={80}>this</Word><Word at={40.76} size={80} color={NEON}>new</Word><Word at={41.01} size={80} color={NEON}>world,</Word>
        </div>
      </At>
      <At x={960} y={250} o={drop ? 0 : 1}>
        <div style={{ whiteSpace: 'nowrap' }}>
          <Word at={41.7} size={72}>you</Word><Word at={41.86} size={72}>won&apos;t</Word><Word at={42.11} size={72}>just</Word><Word at={42.46} size={72} color={C.yellow}>use</Word><Word at={43.07} size={72}>apps.</Word>
        </div>
      </At>
      {/* phone home screen of apps → blasts into code → rebuilt around Ada */}
      {APPS.map((a, i) => {
        const col = i % 4, row = Math.floor(i / 4);
        const hx = 1450 + (col - 1.5) * 140, hy = 560 + (row - 0.5) * 150;
        const ang = (i / APPS.length) * Math.PI * 2;
        const bx = 960 + Math.cos(ang) * 900, by = 540 + Math.sin(ang) * 520;
        const fx = 960 + Math.cos(ang + 0.4) * 700, fy = 640 + Math.sin(ang + 0.4) * 270;
        const x = drop ? interpolate(reform, [0, 1], [interpolate(blast, [0, 1], [hx, bx]), fx]) : hx;
        const y = drop ? interpolate(reform, [0, 1], [interpolate(blast, [0, 1], [hy, by]), fy]) : hy;
        const Icon = a.i;
        const asCode = drop && reform < 0.5;
        return (
          <At key={i} x={x} y={y + Math.sin(t * 3 + i) * 6} s={pop(f, 40.5 + i * 0.05) * (drop ? 1.3 + kp * 0.08 : 1) * (tap && i === 1 ? 0.85 : 1)} r={drop ? (1 - reform) * 200 : 0}>
            {asCode ? (
              <div style={{ padding: '10px 18px', borderRadius: 16, background: '#0F1533', fontFamily: mono, fontWeight: 700, fontSize: 30, color: a.c }}>{['<App/>', 'fn()', '{ }', 'api', 'db', 'ui', '=>', '</>'][i]}</div>
            ) : (
              <div style={{ width: 112, height: 112, borderRadius: 32, background: a.c, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 0 rgba(0,0,0,0.2)' }}>
                <Icon size={60} color="#fff" strokeWidth={2.4} />
              </div>
            )}
          </At>
        );
      })}
      {!drop && <At x={1450} y={560} s={pop(f, 40.4)}><div style={{ width: 640, height: 420, borderRadius: 50, border: '6px solid rgba(255,255,255,0.18)' }} /></At>}
      <At x={drop ? 960 : 520} y={drop ? 900 : 900} s={drop ? 1.0 : 0.9} sx={squash(f, 44.0, 0.14)[0]} sy={squash(f, 44.0, 0.14)[1]}>
        <Ada poses={[{ t: 0, p: 'talk' }, { t: 42.3, p: 'pointR' }, { t: 44.0, p: 'cheer' }, { t: 45.0, p: 'fist' }]} />
      </At>
      {drop && (
        <>
          <At x={960} y={170} s={spr(f, 44.63, { damping: 7, stiffness: 260 }) * (1 + kp * 0.04)} r={-4}>
            <div style={{ fontFamily: display, fontWeight: 800, fontSize: 170, color: '#fff', letterSpacing: -3, wordSpacing: 24, whiteSpace: 'nowrap', textShadow: `0 12px 0 ${C.blueDeep}` }}>
              You&apos;ll <span style={{ color: C.yellow }}>BUILD</span> them.
            </div>
          </At>
          <Ring x={960} y={540} at={44.0} r={1000} w={44} />
          <Burst x={960} y={200} at={44.63} n={20} r={420} len={130} w={14} color={C.yellow} />
          <Confetti x={960} y={400} at={44.63} n={70} spread={1600} seed={13} />
          <Sparkle x={1600} y={420} at={45.0} size={44} color={C.yellow} />
        </>
      )}
    </AbsoluteFill>
  );
};
