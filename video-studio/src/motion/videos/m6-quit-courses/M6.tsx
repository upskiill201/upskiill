import React from 'react';
import { AbsoluteFill, Img, staticFile } from 'remotion';
import { Check, Coffee, Coins, Flag, Flame, Gamepad2, Gift, Heart, Lock, Medal, MessageCircle, PlayCircle, ShoppingBag, Snowflake, Trophy, User, Users, Zap } from 'lucide-react';
import {
  At, Backdrop, Badge, BigText, Captions, ChapterCard, Footnote, Host, HudSeries, LoopBack, MotionProvider, Recap, SfxCue,
  SoundLayer, Split, Strike, Tag, TeyroBridge, TeyroOutro, TitleCard, Ticker, VO, cue, fmt, life, line,
  loadMotionFonts, pop, prog, revealCues, rnd, ticks, useMotion, Z, FONT, LOOKS, BRAND,
} from '../../kit';
import voJson from './vo.json';

const vo = voJson as VO;
const SLUG = 'm6-quit-courses';
const NT = LOOKS.night;
export const M6_DURATION = Math.ceil((vo.duration + 0.25) * 30);

/* ───────────── timing helpers ───────────── */
const L = (id: string) => line(vo, id);
const c = (w: string, after?: string | number, n = 1) => cue(vo, w, { n, after: typeof after === 'string' ? L(after).start : after });
const S = (id: string) => L(id).start;
const SX = 700;
const FLAME = '#FF9A3C';
const GOLD = '#F2C76B';

/* ───────────── shared bits ───────────── */
const Ov: React.FC<{ a: number; b: number; x?: number; y?: number; children: React.ReactNode }> = ({ a, b, x = 540, y = 900, children }) => {
  const { t, frame, fps } = useMotion();
  if (t < a || t >= b) return null;
  const k = life(t, frame, fps, a, b);
  return <At x={x} y={y}><div style={{ opacity: Math.min(1, k * 1.3), transform: `translateY(${(1 - Math.min(1, k)) * 24}px)` }}>{children}</div></At>;
};
const Col: React.FC<{ children: React.ReactNode; w?: number; gap?: number }> = ({ children, w = 1000, gap = 16 }) => <div style={{ width: w, display: 'flex', flexDirection: 'column', alignItems: 'center', gap }}>{children}</div>;
/** a card that pops on `at` and gently breathes (ambient motion for the QA near-still gate) */
const Panel: React.FC<{ at: number; w: number; children: React.ReactNode; light?: boolean; edge?: string; pad?: number; style?: React.CSSProperties }> = ({ at, w, children, light, edge, pad = 26, style }) => {
  const { look, t, frame, fps } = useMotion();
  const k = pop(frame, fps, at, { damping: 12 });
  if (k <= 0) return null;
  const ph = (t - at) % 1.6;
  const breath = t > at + 0.8 && ph < 0.35 ? Math.sin((ph / 0.35) * Math.PI) : 0;
  return (
    <div style={{ width: w, borderRadius: 28, background: light ? '#FFFFFF' : 'rgba(36,39,45,0.96)', border: `2.5px solid ${edge ?? (light ? '#E2E8F0' : look.cardEdge)}`, padding: pad, boxSizing: 'border-box', boxShadow: `0 20px 50px rgba(0,0,0,0.45)${breath ? `, 0 0 ${28 * breath}px ${edge ?? BRAND.blue}88` : ''}`, transform: `scale(${k * (1 + breath * 0.012)})`, ...style }}>
      {children}
    </div>
  );
};
const Mono: React.FC<{ children: React.ReactNode; size?: number; color?: string }> = ({ children, size = 20, color }) => <span style={{ fontFamily: FONT.mono, fontWeight: 800, fontSize: size, letterSpacing: '0.1em', color: color ?? NT.inkSoft, textTransform: 'uppercase' }}>{children}</span>;

/** faint drifting glyphs: ambient motion for the dark world */
const Drift: React.FC = () => {
  const { t } = useMotion();
  const glyphs = ['+10', '★', '◆', '♥', '⚡', '●', '▲', '✦'];
  return (
    <AbsoluteFill style={{ pointerEvents: 'none' }}>
      {Array.from({ length: 24 }, (_, i) => {
        const sp = 50 + rnd(i + 5) * 60;
        const y = ((rnd(i) * 1920 - t * sp) % 1920 + 1920) % 1920;
        const x = rnd(i + 11) * 1080 + Math.sin(t * 0.7 + i) * 18;
        return <div key={i} style={{ position: 'absolute', left: x, top: y, fontFamily: FONT.mono, fontWeight: 800, fontSize: 40 + rnd(i + 3) * 40, color: i % 3 ? '#4A5468' : '#5A4A38', opacity: 0.7 }}>{glyphs[i % glyphs.length]}</div>;
      })}
    </AbsoluteFill>
  );
};

/* ───────────── HOOK: frame 0 = cover ───────────── */
const BuyButton: React.FC<{ still?: boolean }> = ({ still }) => {
  const { look, t } = useMotion();
  const wob = still ? 0 : Math.sin(t * 3) * 3;
  return (
    <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 26 }}>
      <div style={{ width: 640, borderRadius: 26, background: '#FFFFFF', padding: '22px 26px', boxSizing: 'border-box', boxShadow: '0 24px 60px rgba(0,0,0,0.5)', transform: `rotate(${wob * 0.2}deg)` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ width: 120, height: 76, borderRadius: 12, background: '#1F2A44', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><PlayCircle size={42} color="#fff" /></div>
          <div>
            <div style={{ fontFamily: FONT.sans, fontWeight: 800, fontSize: 30, color: '#16181B' }}>Complete Coding Bootcamp</div>
            <div style={{ fontFamily: FONT.mono, fontSize: 19, color: '#5D626B', marginTop: 4 }}>214 videos · 40+ hours</div>
          </div>
        </div>
        <div style={{ marginTop: 18, height: 74, borderRadius: 16, background: '#A435F0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: FONT.sans, fontWeight: 800, fontSize: 32, color: '#fff' }}>Buy course · $49.99</div>
      </div>
      <div style={{ position: 'absolute', right: -40, top: 40, padding: '10px 30px', border: `8px solid ${look.problem}`, borderRadius: 16, color: look.problem, fontFamily: FONT.display, fontWeight: 700, fontSize: 96, letterSpacing: '0.04em', transform: 'rotate(-12deg)', background: 'rgba(22,24,27,0.85)' }}>STOP</div>
    </div>
  );
};

/** 100 people, 97 grey out on "finish" */
const People: React.FC = () => {
  const { look, t } = useMotion();
  const out = c('finish', 'h2');
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(10, 1fr)', gap: 10, width: 820 }}>
      {Array.from({ length: 100 }, (_, i) => {
        const keep = i === 23 || i === 57 || i === 88;
        const k = prog(t, out + (i % 10) * 0.04, out + 0.4 + (i % 10) * 0.04);
        const col = keep ? look.good : `rgba(${Math.round(240 - 150 * k)},${Math.round(240 - 150 * k)},${Math.round(236 - 150 * k)},${1 - 0.6 * k})`;
        return <User key={i} size={64} color={col} strokeWidth={2.6} />;
      })}
    </div>
  );
};

/* ───────────── chapter visuals ───────────── */
const CoursePlayer: React.FC = () => {
  const { look, t } = useMotion();
  const flag = c('finish', 'c1a'), nobody = c('nobody', 'c1a');
  return (
    <Panel at={S('c1a')} w={900}>
      <div style={{ height: 300, borderRadius: 18, background: '#0E1014', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
        <PlayCircle size={110} color={look.inkFaint} />
        <div style={{ position: 'absolute', left: 18, top: 14 }}><Mono size={18}>Lesson 1 of 214</Mono></div>
        <div style={{ position: 'absolute', right: 18, top: 14 }}><Mono size={18} color={look.warm}>{t >= c('hours', 'c1a') ? '40h 12m' : ''}</Mono></div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginTop: 20 }}>
        <div style={{ flex: 1, height: 16, borderRadius: 8, background: '#3A3E46', position: 'relative' }}>
          <div style={{ width: '2%', height: '100%', borderRadius: 8, background: look.accent }} />
        </div>
        <div style={{ opacity: prog(t, flag, flag + 0.3), transform: `scale(${0.6 + 0.4 * prog(t, flag, flag + 0.3)})` }}><Flag size={40} color={look.good} /></div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10 }}><Mono size={18}>2% complete</Mono>{t >= nobody && <span style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: FONT.mono, fontSize: 19, color: look.inkSoft }}><MessageCircle size={20} />0 people noticed</span>}</div>
    </Panel>
  );
};

const Days: React.FC = () => {
  const { look, frame, fps } = useMotion();
  const items: [string, string, number, string][] = [['DAY 1', 'feels great', c('one', 'c1b'), look.good], ['DAY 5', 'skipped', c('five', 'c1b'), look.warm], ['DAY 12', 'forgotten', c('twelve', 'c1b'), look.inkFaint]];
  return (
    <div style={{ display: 'flex', gap: 18 }}>
      {items.map(([d, s, at, col]) => {
        const k = pop(frame, fps, at, { damping: 11 });
        return (
          <div key={d} style={{ width: 270, padding: '18px 16px', borderRadius: 22, background: 'rgba(36,39,45,0.96)', border: `2.5px solid ${col}`, textAlign: 'center', opacity: Math.min(1, k * 1.4), transform: `scale(${0.8 + 0.2 * k})` }}>
            <div style={{ fontFamily: FONT.display, fontWeight: 700, fontSize: 44, color: col }}>{d}</div>
            <div style={{ fontFamily: FONT.sans, fontWeight: 650, fontSize: 28, color: NT.ink, marginTop: 4 }}>{s}</div>
          </div>
        );
      })}
    </div>
  );
};

/** a game-style level path: nodes light up as levels are won */
const LevelPath: React.FC = () => {
  const { look, t, frame, fps } = useMotion();
  const win = c('win', 'c2a'), next = c('next', 'c2b');
  const nodes = [{ x: 0, y: 220 }, { x: 150, y: 90 }, { x: -60, y: -40 }, { x: 110, y: -170 }];
  const done = t >= win ? 1 : 0, cur = t >= next ? 1 : 0;
  return (
    <div style={{ position: 'relative', width: 520, height: 560 }}>
      <svg width={520} height={560} style={{ position: 'absolute', left: 0, top: 0 }}>
        <path d={`M ${260 + nodes[0].x} ${280 + nodes[0].y} ${nodes.slice(1).map((n) => `L ${260 + n.x} ${280 + n.y}`).join(' ')}`} fill="none" stroke="#3A3E46" strokeWidth={12} strokeDasharray="4 22" strokeLinecap="round" />
      </svg>
      {nodes.map((n, i) => {
        const k = pop(frame, fps, S('c2a') + 0.2 + i * 0.12, { damping: 11 });
        const isDone = i < done, isCur = i === cur;
        const col = isDone ? look.good : isCur ? BRAND.blue : '#3A3E46';
        return (
          <div key={i} style={{ position: 'absolute', left: 260 + n.x - 56, top: 280 + n.y - 56, width: 112, height: 112, borderRadius: 56, background: col, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: isCur ? `0 0 ${30 + 14 * Math.sin(t * 5)}px ${col}` : `0 10px 0 rgba(0,0,0,0.35)`, transform: `scale(${k * (isCur ? 1.06 : 1)})` }}>
            {isDone ? <Check size={56} color="#fff" strokeWidth={3.5} /> : isCur ? <Zap size={52} color="#fff" /> : <Lock size={44} color="#6B7280" />}
          </div>
        );
      })}
      {t >= c('few', 'c2a') && t < c('win', 'c2a') + 1.6 && <div style={{ position: 'absolute', left: 260 + nodes[0].x + 70, top: 280 + nodes[0].y - 30 }}><Tag at={c('few', 'c2a')} text="3 min" size={26} solid /></div>}
      {t >= win && <div style={{ position: 'absolute', left: 260 + nodes[0].x - 160, top: 280 + nodes[0].y - 130 - prog(t, win, win + 1.2) * 60, opacity: 1 - prog(t, win + 0.8, win + 1.4), fontFamily: FONT.display, fontWeight: 700, fontSize: 64, color: GOLD }}>+10 XP</div>}
    </div>
  );
};

const StreakFlame: React.FC<{ keys: { t: number; v: number }[]; size?: number }> = ({ keys, size = 1 }) => {
  const { t } = useMotion();
  const flick = 1 + Math.sin(t * 9) * 0.04;
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 18 * size }}>
      <Flame size={130 * size} color={FLAME} fill={`${FLAME}55`} style={{ transform: `scale(${flick})`, filter: `drop-shadow(0 0 ${20 * size}px ${FLAME})` }} />
      <div>
        <Ticker keys={keys} format={fmt.int} style={{ fontFamily: FONT.display, fontWeight: 700, fontSize: 120 * size, color: NT.ink, lineHeight: 1 }} />
        <div style={{ fontFamily: FONT.mono, fontWeight: 800, fontSize: 24 * size, letterSpacing: '0.14em', color: FLAME }}>DAY STREAK</div>
      </div>
    </div>
  );
};

/** loss aversion: the "loss" pan outweighs the "win" pan */
const Scale: React.FC = () => {
  const { look, t } = useMotion();
  const tilt = 14 * prog(t, c('more', 'c3b'), c('more', 'c3b') + 0.6);
  return (
    <svg width={560} height={300} viewBox="-280 -60 560 300">
      <rect x={-6} y={-20} width={12} height={250} rx={6} fill="#5A616D" />
      <g transform={`rotate(${tilt})`}>
        <rect x={-230} y={-26} width={460} height={12} rx={6} fill="#8A92A0" />
        <g transform="translate(-200 0)"><line x1={0} y1={-14} x2={0} y2={60} stroke="#8A92A0" strokeWidth={4} /><rect x={-70} y={60} width={140} height={60} rx={14} fill={look.good} /><text x={0} y={100} textAnchor="middle" fontFamily="JetBrains Mono" fontWeight={800} fontSize={26} fill="#0E1014">WIN</text></g>
        <g transform="translate(200 0)"><line x1={0} y1={-14} x2={0} y2={60} stroke="#8A92A0" strokeWidth={4} /><rect x={-80} y={60} width={160} height={78} rx={14} fill={look.problem} /><text x={0} y={108} textAnchor="middle" fontFamily="JetBrains Mono" fontWeight={800} fontSize={28} fill="#fff">LOSS</text></g>
      </g>
    </svg>
  );
};

/** buy-10 coffee card: stamps arrive faster as the free coffee gets closer */
const CoffeeCard: React.FC = () => {
  const { look, t } = useMotion();
  const a = c('Buy', 'c4a'), b = c('gradient', 'c4b');
  // accelerating stamp times: gaps shrink towards the reward
  const times = Array.from({ length: 10 }, (_, i) => a + (b - a) * (1 - Math.pow(1 - (i + 1) / 10, 0.55)));
  const n = times.filter((x) => t >= x).length;
  return (
    <Panel at={c('cards', 'c4a') - 0.2} w={860} light>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontFamily: FONT.sans, fontWeight: 800, fontSize: 34, color: '#16181B' }}><Coffee size={40} color="#7A5328" />Buy 10, get 1 free</div>
      <div style={{ display: 'flex', gap: 12, marginTop: 20 }}>
        {Array.from({ length: 10 }, (_, i) => {
          const on = i < n; const k = on ? prog(t, times[i], times[i] + 0.2) : 0;
          return <div key={i} style={{ width: 64, height: 64, borderRadius: 32, border: `3px dashed ${on ? '#7A5328' : '#C9CED6'}`, background: on ? '#B9874F' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${on ? 0.8 + 0.2 * k + (1 - k) * 0.3 : 1})` }}>{on && <Coffee size={30} color="#fff" />}</div>;
        })}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 14, fontFamily: FONT.mono, fontSize: 19, color: '#5D626B' }}><span>{n} / 10</span><span style={{ color: n >= 10 ? look.good : '#5D626B', fontWeight: 800 }}>{n >= 10 ? 'FREE COFFEE ✓' : 'gaps get shorter →'}</span></div>
    </Panel>
  );
};

const AlmostFull: React.FC = () => {
  const { look, t } = useMotion();
  const rows: [string, React.ReactNode, number, number][] = [['Quest', <Zap size={26} color={GOLD} />, c('Quests', 'c4c'), 0.9], ['Chest', <Gift size={26} color={look.accent2} />, c('Chests', 'c4c'), 0.8], ['Level', <Star />, c('Bars', 'c4c'), 0.95]];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14, width: 760 }}>
      {rows.map(([name, icon, at, v]) => {
        if (t < at) return <div key={name} style={{ height: 50 }} />;
        const k = prog(t, at, at + 0.7);
        return (
          <div key={name} style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ width: 40, display: 'flex', justifyContent: 'center' }}>{icon}</div>
            <span style={{ width: 110, fontFamily: FONT.mono, fontWeight: 800, fontSize: 22, color: look.ink }}>{name}</span>
            <div style={{ flex: 1, height: 30, borderRadius: 15, background: '#3A3E46' }}><div style={{ width: `${v * k * 100}%`, height: '100%', borderRadius: 15, background: GOLD }} /></div>
            <span style={{ width: 70, fontFamily: FONT.mono, fontWeight: 800, fontSize: 22, color: GOLD }}>{Math.round(v * k * 100)}%</span>
          </div>
        );
      })}
    </div>
  );
};
const Star: React.FC = () => <span style={{ fontSize: 26, color: GOLD }}>★</span>;

const Leaderboard: React.FC<{ rows: [string, number][]; youAt?: number; title: string; light?: boolean }> = ({ rows, youAt, title, light }) => {
  const { look, t } = useMotion();
  const ink = light ? '#16181B' : look.ink, soft = light ? '#5D626B' : look.inkSoft;
  const order = [...rows];
  if (youAt !== undefined && t >= youAt) { const i = order.findIndex(([n]) => n === 'You'); if (i > 0) { const [y] = order.splice(i, 1); order.splice(i - 1, 0, y); } }
  const cols = ['#86C98A', '#6FA8FF', '#F2C76B', '#B79CFF', '#F07A5A'];
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}><Trophy size={30} color={GOLD} /><span style={{ fontFamily: FONT.sans, fontWeight: 800, fontSize: 30, color: ink }}>{title}</span></div>
      {order.map(([name, xp], i) => (
        <div key={name} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '10px 14px', borderRadius: 14, marginTop: 6, background: name === 'You' ? `${BRAND.blue}22` : 'transparent', border: name === 'You' ? `2px solid ${BRAND.blue}` : '2px solid transparent' }}>
          <span style={{ width: 30, fontFamily: FONT.mono, fontWeight: 800, fontSize: 24, color: soft }}>{i + 1}</span>
          <div style={{ width: 44, height: 44, borderRadius: 22, background: cols[rows.findIndex(([n]) => n === name) % cols.length], display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: FONT.sans, fontWeight: 800, fontSize: 22, color: '#fff' }}>{name[0]}</div>
          <span style={{ flex: 1, fontFamily: FONT.sans, fontWeight: 700, fontSize: 27, color: ink }}>{name}</span>
          <span style={{ fontFamily: FONT.mono, fontWeight: 800, fontSize: 23, color: soft }}>{xp.toLocaleString('en-US')} XP</span>
        </div>
      ))}
    </div>
  );
};

/* ───────────── the Teyro tour (live-site visuals) ───────────── */
const TeyroHeader: React.FC<{ at: number }> = ({ at }) => {
  const { frame, fps } = useMotion();
  const k = pop(frame, fps, at, { damping: 11 });
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 20, transform: `scale(${k})` }}>
      <div style={{ width: 120, height: 120, borderRadius: 34, overflow: 'hidden', boxShadow: '0 0 50px rgba(61,90,254,0.6)' }}><Img src={staticFile('tey-tile.png')} style={{ width: '100%', height: '100%' }} /></div>
      <div>
        <div style={{ fontFamily: FONT.display, fontWeight: 700, fontSize: 84, color: '#fff', lineHeight: 1 }}>Teyro</div>
        <div style={{ fontFamily: FONT.sans, fontWeight: 650, fontSize: 28, color: NT.inkSoft, marginTop: 6 }}>learning that plays like a game</div>
      </div>
    </div>
  );
};

const LessonCard: React.FC = () => {
  const { t, frame, fps } = useMotion();
  const steps: [string, number][] = [['Learn', c('learn', 'ty2')], ['Apply', c('apply', 'ty2')], ['Reflect', c('reflect', 'ty2')], ['Deepen', c('deepen', 'ty2')]];
  const right = c('instant', 'ty2');
  return (
    <Panel at={S('ty2')} w={900} light edge={BRAND.blue}>
      <div style={{ display: 'flex', gap: 10 }}>
        {steps.map(([s, at], i) => { const on = t >= at; return <div key={s} style={{ flex: 1, padding: '10px 0', textAlign: 'center', borderRadius: 14, background: on ? BRAND.blue : '#EEF2FF', color: on ? '#fff' : BRAND.blue, fontFamily: FONT.sans, fontWeight: 800, fontSize: 25, transform: `scale(${t >= at && t < at + 0.4 ? 1.08 : 1})` }}>{i + 1} {s}</div>; })}
      </div>
      <div style={{ marginTop: 18, fontFamily: FONT.mono, fontWeight: 800, fontSize: 18, letterSpacing: '0.14em', color: BRAND.blue }}>APPLY</div>
      <div style={{ fontFamily: FONT.sans, fontWeight: 700, fontSize: 28, color: '#16181B', marginTop: 4 }}>Finish the function so it gives back the total:</div>
      <div style={{ marginTop: 10, padding: '12px 16px', borderRadius: 14, background: '#0E1014', fontFamily: FONT.mono, fontSize: 26, color: '#E6E8EC', lineHeight: 1.5 }}>function add(a, b) {'{'}<br />&nbsp;&nbsp;<span style={{ color: t >= c('code', 'ty2') ? '#86C98A' : '#5D626B' }}>{t >= c('code', 'ty2') ? 'return a + b' : '_____'}</span><br />{'}'}</div>
      {t >= right && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 14, padding: '12px 16px', borderRadius: 14, background: '#E9F7EF', transform: `scale(${pop(frame, fps, right, { damping: 10 })})` }}>
          <Check size={30} color="#1F9D55" strokeWidth={3} /><span style={{ flex: 1, fontFamily: FONT.sans, fontWeight: 800, fontSize: 28, color: '#1F9D55' }}>Nice! That's right.</span><span style={{ fontFamily: FONT.display, fontWeight: 700, fontSize: 32, color: '#F5A524' }}>+10 XP</span>
        </div>
      )}
    </Panel>
  );
};

const StreakCard: React.FC = () => {
  const { t } = useMotion();
  const fr = c('freeze', 'ty3');
  return (
    <Panel at={S('ty3')} w={900}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <StreakFlame size={0.8} keys={[{ t: 0, v: 121 }, { t: c('grows', 'ty3'), v: 128, dur: 1.0 }]} />
        <div style={{ textAlign: 'right' }}><div style={{ fontFamily: FONT.display, fontWeight: 700, fontSize: 52, color: '#F5A524' }}><Ticker keys={[{ t: 0, v: 2380 }, { t: c('XP', 'ty3'), v: 2450, dur: 0.6 }]} format={fmt.int} /></div><Mono size={18}>total XP</Mono></div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(10, 1fr)', gap: 8, marginTop: 18 }}>
        {Array.from({ length: 20 }, (_, i) => {
          const frozen = i === 10;
          const on = frozen ? t >= fr : true;
          return <div key={i} style={{ height: 40, borderRadius: 10, background: frozen ? (on ? '#6FA8FF' : '#3A3E46') : `${FLAME}${i > 16 && t < c('grows', 'ty3') ? '33' : 'CC'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${frozen && t >= fr && t < fr + 0.5 ? 1.25 : 1})` }}>{frozen && on && <Snowflake size={24} color="#fff" />}</div>;
        })}
      </div>
      {t >= fr && <div style={{ marginTop: 12 }}><Tag at={fr} text="a freeze saved day 11" size={20} /></div>}
    </Panel>
  );
};

const LeagueCard: React.FC = () => {
  const { t } = useMotion();
  const tiers: [string, string][] = [['Bronze', '#C98A55'], ['Silver', '#B8C0CC'], ['Gold', '#F2C76B'], ['Sapphire', '#6FA8FF'], ['Diamond', '#9BE7FF']];
  const up = prog(t, c('Bronze', 'ty4'), c('Diamond', 'ty4') + 0.3);
  return (
    <Panel at={S('ty4')} w={900}>
      <div style={{ display: 'flex', gap: 10, marginBottom: 16 }}>
        {tiers.map(([n, col], i) => { const on = up >= i / (tiers.length - 1) - 0.01; return <div key={n} style={{ flex: 1, padding: '8px 0', textAlign: 'center', borderRadius: 12, border: `2px solid ${col}`, background: on ? `${col}33` : 'transparent', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}><Medal size={28} color={col} /><span style={{ fontFamily: FONT.mono, fontWeight: 800, fontSize: 15, color: on ? col : '#6B7280' }}>{n.toUpperCase()}</span></div>; })}
      </div>
      <Leaderboard title="Diamond League" youAt={c('real', 'ty4')} rows={[['Kemi A.', 1180], ['You', 1240], ['Daniel O.', 1065], ['Priya S.', 940], ['Tunde B.', 905]]} />
      <div style={{ marginTop: 8 }}><Mono size={16}>real learners · no bots · weekly</Mono></div>
    </Panel>
  );
};

const RewardsCard: React.FC = () => {
  const { look, t, frame, fps } = useMotion();
  const q: [string, number, number][] = [['Earn 50 XP', 50, 50], ['Finish 3 lessons', 3, 3], ['Get 20 answers right', 20, 20]];
  const qa = c('quests', 'ty5'), chest = c('Chests', 'ty5'), shop = c('shop', 'ty5'), month = c('Monthly', 'ty5'), badge = c('badge', 'ty5');
  const open = prog(t, chest + 0.2, chest + 0.6);
  return (
    <Panel at={S('ty5')} w={940}>
      <div style={{ display: 'flex', gap: 22 }}>
        <div style={{ flex: 1.3 }}>
          <Mono size={18} color={GOLD}>Daily quests</Mono>
          {q.map(([name, v, max], i) => { const k = prog(t, qa + i * 0.15, qa + 0.6 + i * 0.15); return (
            <div key={name} style={{ marginTop: 10 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: FONT.sans, fontWeight: 700, fontSize: 22, color: look.ink }}><span>{name}</span><span style={{ fontFamily: FONT.mono, color: GOLD }}>{Math.round(v * k)} / {max}</span></div>
              <div style={{ height: 14, borderRadius: 7, background: '#3A3E46', marginTop: 4 }}><div style={{ width: `${k * 100}%`, height: '100%', borderRadius: 7, background: GOLD }} /></div>
            </div>
          ); })}
        </div>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
          <div style={{ position: 'relative', transform: `scale(${pop(frame, fps, chest, { damping: 9 })}) rotate(${open > 0 && open < 1 ? Math.sin(t * 40) * 6 : 0}deg)` }}>
            <Gift size={110} color={look.accent2} />
            {open > 0 && Array.from({ length: 8 }, (_, i) => { const a = (i / 8) * Math.PI * 2; return <div key={i} style={{ position: 'absolute', left: 40 + Math.cos(a) * 90 * open, top: 40 + Math.sin(a) * 70 * open - 40 * open, opacity: 1 - prog(t, chest + 0.9, chest + 1.6) }}><Coins size={30} color={GOLD} /></div>; })}
          </div>
          {t >= chest + 0.3 && <span style={{ fontFamily: FONT.display, fontWeight: 700, fontSize: 36, color: GOLD }}>+50 coins</span>}
        </div>
      </div>
      <div style={{ display: 'flex', gap: 14, marginTop: 18, alignItems: 'stretch' }}>
        {t >= shop - 0.1 && (
          <div style={{ flex: 1.3, display: 'flex', gap: 10, alignItems: 'center', padding: '12px 14px', borderRadius: 16, border: `2px solid ${look.cardEdge}`, transform: `scale(${pop(frame, fps, shop - 0.1, { damping: 11 })})` }}>
            <ShoppingBag size={34} color={look.accent} />
            <div style={{ display: 'flex', gap: 8 }}>
              {([[<Snowflake size={22} color="#6FA8FF" />, 'Freeze'], [<Heart size={22} color="#F0614F" />, 'Hearts']] as [React.ReactNode, string][]).map(([ic, n]) => <span key={n} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 10px', borderRadius: 10, background: '#2A2E35', fontFamily: FONT.sans, fontWeight: 700, fontSize: 21, color: look.ink }}>{ic}{n}</span>)}
            </div>
          </div>
        )}
        {t >= month - 0.1 && (
          <div style={{ flex: 1, display: 'flex', gap: 10, alignItems: 'center', padding: '12px 14px', borderRadius: 16, border: `2px solid ${GOLD}`, transform: `scale(${pop(frame, fps, month - 0.1, { damping: 11 })})` }}>
            <Medal size={38} color={GOLD} style={{ transform: `scale(${t >= badge && t < badge + 0.5 ? 1.3 : 1})` }} />
            <div><div style={{ fontFamily: FONT.sans, fontWeight: 800, fontSize: 21, color: look.ink }}>Monthly Challenge</div><div style={{ fontFamily: FONT.mono, fontSize: 15, color: look.inkSoft }}>finish → unique badge</div></div>
          </div>
        )}
      </div>
      <div style={{ marginTop: 10 }}><Mono size={15}>coins are earned, not bought</Mono></div>
    </Panel>
  );
};

const FriendsCard: React.FC = () => {
  const { look, t, frame, fps } = useMotion();
  const feed: [string, string, string, number][] = [['K', 'Kemi', 'finished Unit 4', c('Follow', 'ty6')], ['D', 'Daniel', 'on a 7-lesson day', c('race', 'ty6')], ['P', 'Priya', 'joined your league', c('streaks', 'ty6')]];
  const comm = c('community', 'ty6');
  return (
    <Panel at={S('ty6')} w={900}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}><Users size={30} color={look.accent} /><Mono size={20} color={look.ink}>Friends</Mono></div>
      {feed.map(([i0, n, s, at], i) => { const k = pop(frame, fps, at, { damping: 12 }); return (
        <div key={n} style={{ display: 'flex', alignItems: 'center', gap: 14, marginTop: 10, opacity: Math.min(1, k * 1.4), transform: `translateX(${(1 - Math.min(1, k)) * -30}px)` }}>
          <div style={{ width: 46, height: 46, borderRadius: 23, background: ['#86C98A', '#6FA8FF', '#B79CFF'][i], display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: FONT.sans, fontWeight: 800, fontSize: 22, color: '#fff' }}>{i0}</div>
          <span style={{ fontFamily: FONT.sans, fontWeight: 800, fontSize: 27, color: look.ink }}>{n}</span><span style={{ fontFamily: FONT.sans, fontSize: 25, color: look.inkSoft }}>{s}</span>
          <span style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 4, fontFamily: FONT.mono, fontWeight: 800, fontSize: 22, color: FLAME }}><Flame size={22} color={FLAME} />{[64, 31, 22][i]}</span>
        </div>
      ); })}
      {t >= comm && (
        <div style={{ marginTop: 16, padding: '14px 16px', borderRadius: 16, background: '#2A2E35', transform: `scale(${pop(frame, fps, comm, { damping: 11 })})` }}>
          <Mono size={15}>JavaScript Foundations community</Mono>
          <div style={{ fontFamily: FONT.sans, fontWeight: 700, fontSize: 26, color: look.ink, marginTop: 6 }}>Built my first to-do app today!</div>
          <div style={{ fontFamily: FONT.sans, fontSize: 21, color: look.good, marginTop: 4 }}>Kemi cheered you on</div>
        </div>
      )}
    </Panel>
  );
};

/* ───────────── scene ───────────── */
const CHAPTERS: [string, string, string][] = [['c1a', '01', 'Why you quit'], ['c2a', '02', 'Tiny levels'], ['c3a', '03', 'The streak'], ['c4a', '04', 'Progress bar'], ['c5a', '05', 'Other players'], ['c6a', '06', 'Rewards'], ['t1', '07', 'The catch']];

const Scene: React.FC = () => {
  loadMotionFonts();
  const { look, t, frame, fps } = useMotion();
  const br = L('bridge');
  const end = vo.duration + 0.25;
  const brEnd = c('AI', 'back') + 0.4;

  return (
    <AbsoluteFill>
      <Backdrop cam={{ x: Math.sin(t * 0.5) * 30, y: t * 12, z: 1 }} />
      <Drift />

      {/* ── HUD ── */}
      <HudSeries series="Why you quit" pulseTeyro={[br.start, S('ty1'), S('cta')]}
        chapters={[{ t: 0, text: "don't buy yet" }, ...CHAPTERS.map(([id, n, name]) => ({ t: S(id), text: `${n} · ${name}` })), { t: S('recap'), text: 'recap' }, { t: S('ty1'), text: 'how teyro plays' }]}
        counter={{ unit: 'game tricks', icon: <Gamepad2 size={26} color={NT.accent2} />, format: fmt.int, keys: [{ t: 0, v: 0 }, { t: S('c2a'), v: 1, dur: 0.3 }, { t: S('c3a'), v: 2, dur: 0.3 }, { t: S('c4a'), v: 3, dur: 0.3 }, { t: S('c5a'), v: 4, dur: 0.3 }, { t: S('c6a'), v: 5, dur: 0.3 }] }}
        chips={[{ label: 'Levels', t: S('c2a') }, { label: 'Streak', t: S('c3a') }, { label: 'Progress', t: S('c4a') }, { label: 'Players', t: S('c5a') }, { label: 'Rewards', t: S('c6a') }]} />

      {/* ── HOOK (frame 0 = cover) ── */}
      <TitleCard title={["DON'T BUY", 'ANOTHER COURSE']} kicker="UNTIL YOU WATCH THIS" until={S('h2')} titleSize={112} top={410}><div style={{ marginTop: 40 }}><BuyButton /></div></TitleCard>
      <Ov a={S('h2')} b={S('h3')} y={880}>
        <Col>
          <People />
          {t >= c('finish', 'h2') && <div style={{ display: 'flex', alignItems: 'baseline', gap: 16, transform: `scale(${pop(frame, fps, c('finish', 'h2'), { damping: 10 })})` }}><span style={{ fontFamily: FONT.display, fontWeight: 700, fontSize: 150, color: look.good, lineHeight: 1 }}>3%</span><span style={{ fontFamily: FONT.sans, fontWeight: 700, fontSize: 36, color: look.ink }}>finish</span></div>}
        </Col>
      </Ov>
      <Ov a={S('h3')} b={S('h4')} y={860}>
        <Col>
          <Strike text="LAZY" at={c('lazy', 'h3')} strikeAt={c('design', 'h3') - 0.15} replace="DESIGN" replaceAt={c('design', 'h3')} size={120} />
          {t >= c('games', 'h3') && <div style={{ display: 'flex', alignItems: 'center', gap: 16, transform: `scale(${pop(frame, fps, c('games', 'h3'), { damping: 10 })})` }}><Gamepad2 size={90} color={look.accent2} /><span style={{ fontFamily: FONT.display, fontWeight: 700, fontSize: 52, color: look.ink }}>games solved it</span></div>}
        </Col>
      </Ov>
      <Ov a={S('h4')} b={S('c1a')} y={860}>
        <Col>
          <BigText at={c('five', 'h4')} lines={['5 GAME TRICKS']} size={96} align="center" color={GOLD} />
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center', width: 900 }}>{['tiny levels', 'the streak', 'progress bar', 'other players', 'rewards'].map((x, i) => <Tag key={x} at={c('tricks', 'h4') + i * 0.18} text={x} size={24} />)}</div>
        </Col>
      </Ov>

      {/* ── chapter cards ── */}
      {CHAPTERS.map(([id, n, name]) => <ChapterCard key={id} at={S(id)} until={S(id) + 2.4} n={n} title={name} sub={id === 'c1a' || id === 't1' ? 'FIRST' : 'TRICK'} size={96} y={392} color={id === 'c1a' ? look.problem : id === 't1' ? look.accent2 : GOLD} />)}

      {/* ── 01 why you quit ── */}
      <Ov a={S('c1a') + 0.1} b={S('c1b')} y={900}><CoursePlayer /></Ov>
      <Ov a={S('c1b')} b={S('c1c')} y={900}><Days /></Ov>
      <Ov a={S('c1c')} b={S('c2a')} y={880}>
        <Panel at={S('c1c')} w={860} edge={look.problem}>
          <Col w={800} gap={8}>
            <Mono size={20}>Harvard + MIT · millions of learners</Mono>
            <Ticker keys={[{ t: 0, v: 0 }, { t: c('three', 'c1c'), v: 3.13, dur: 0.8 }]} format={(v) => `${v.toFixed(2)}%`} style={{ fontFamily: FONT.display, fontWeight: 700, fontSize: 150, color: look.problem, transformOrigin: 'center' }} />
            <span style={{ fontFamily: FONT.sans, fontWeight: 700, fontSize: 32, color: look.ink }}>finished their course</span>
            <Footnote at={c('finished', 'c1c')} width={780} text="Reich & Ruipérez-Valiente, Science (2019) · edX 2017–18, all participants" />
          </Col>
        </Panel>
      </Ov>

      {/* ── 02 tiny levels ── */}
      <Ov a={S('c2a') + 0.1} b={S('c3a')} y={880}>
        <Col>
          {t < c('level', 'c2a') - 0.3 ? <Strike text="40 HOURS" at={c('forty', 'c2a') - 0.3} strikeAt={c('hours', 'c2a')} size={90} /> : <div style={{ transform: 'scale(1.35)' }}><LevelPath /></div>}
        </Col>
      </Ov>

      {/* ── 03 streak ── */}
      <Ov a={S('c3a') + 0.1} b={S('c3b')} y={880}><StreakFlame size={1.5} keys={[{ t: 0, v: 1 }, { t: c('grows', 'c3a'), v: 4, dur: 1.4 }, { t: c('show', 'c3a'), v: 7, dur: 0.6 }]} /></Ov>
      <Ov a={S('c3b')} b={S('c3c')} y={880}>
        <Col>
          <Scale />
          <BigText at={c('loss', 'c3b')} lines={['LOSS AVERSION']} size={80} align="center" color={look.problem} />
          <Footnote at={c('aversion', 'c3b')} text="Kahneman & Tversky, Prospect Theory (1979)" />
        </Col>
      </Ov>
      <Ov a={S('c3c')} b={S('c4a')} y={880}>
        <Col>
          <StreakFlame size={0.7} keys={[{ t: 0, v: 7 }]} />
          {t >= c('Duolingo', 'c3c') && <Panel at={c('Duolingo', 'c3c')} w={820} edge={look.good}><Col w={760} gap={6}><Ticker keys={[{ t: 0, v: 1 }, { t: c('three', 'c3c'), v: 3.6, dur: 0.8 }]} format={(v) => `${v.toFixed(1)}×`} style={{ fontFamily: FONT.display, fontWeight: 700, fontSize: 130, color: look.good, transformOrigin: 'center' }} /><span style={{ fontFamily: FONT.sans, fontWeight: 700, fontSize: 30, color: look.ink }}>more likely to finish the course</span><Footnote at={c('course', 'c3c')} width={740} text="Duolingo blog (2022) · 7-day streak · company-reported correlation" /></Col></Panel>}
        </Col>
      </Ov>

      {/* ── 04 progress bar ── */}
      <Ov a={c('cards', 'c4a') - 0.2} b={S('c4c')} y={880}>
        <Col>
          <CoffeeCard />
          <BigText at={c('goal', 'c4b')} lines={['GOAL GRADIENT']} size={78} align="center" color={GOLD} />
          <Footnote at={c('gradient', 'c4b')} text="Kivetz, Urminsky & Zheng, Journal of Marketing Research (2006)" />
        </Col>
      </Ov>
      <Ov a={S('c4c')} b={S('c4d')} y={880}><AlmostFull /></Ov>
      <Ov a={S('c4d')} b={br.start + 0.1} y={880}>
        <div style={{ display: 'flex', gap: 18 }}>{['trick 4', 'trick 5'].map((x, i) => <div key={x} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '22px 30px', borderRadius: 22, border: `3px dashed ${GOLD}` }}><Lock size={40} color={GOLD} /><span style={{ fontFamily: FONT.display, fontWeight: 700, fontSize: 44, color: look.ink }}>{x}</span></div>)}</div>
      </Ov>

      {/* ── Teyro mid bridge ── */}
      <TeyroBridge at={br.start} until={brEnd} line="Learning that plays like a game" chips={['Streaks', 'Quests', 'Leagues']}
        chipTimes={[c('streaks', 'back'), c('quests', 'back'), c('leagues', 'back')]} beats={[c('Quick', 'bridge'), c('Teyro', 'bridge'), c('Lessons', 'back'), c('coding', 'back')]} />

      {/* ── 05 other players ── */}
      <Ov a={c('leaderboard', 'c5a') - 0.2} b={S('c6a')} y={880}>
        <Panel at={c('leaderboard', 'c5a') - 0.2} w={860}>
          <Leaderboard title="This week" youAt={c('racing', 'c5b')} rows={[['Ada', 980], ['Sam', 910], ['Lee', 870], ['You', 875], ['Joy', 640]]} />
          {t >= c('friends', 'c5b') && <div style={{ marginTop: 14, display: 'flex', alignItems: 'center', gap: 10, padding: '12px 14px', borderRadius: 14, background: '#2A2E35', transform: `scale(${pop(frame, fps, c('friends', 'c5b'), { damping: 11 })})` }}><MessageCircle size={26} color={look.accent2} /><span style={{ fontFamily: FONT.sans, fontWeight: 700, fontSize: 25, color: look.ink }}>Ada: "where were you yesterday?"</span></div>}
        </Panel>
      </Ov>

      {/* ── 06 rewards ── */}
      <Ov a={S('c6a') + 0.2} b={S('c6b')} y={880}>
        <div style={{ display: 'flex', gap: 26, alignItems: 'center' }}>
          {([[<Coins size={110} color={GOLD} />, 'coins', c('Coins', 'c6a')], [<Gift size={110} color={look.accent2} />, 'chests', c('Chests', 'c6a')], [<ShoppingBag size={110} color={look.accent} />, 'shop', c('shop', 'c6a')]] as [React.ReactNode, string, number][]).map(([ic, n, at]) => { const k = pop(frame, fps, at, { damping: 9 }); return <div key={n} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, transform: `scale(${k}) translateY(${Math.sin(t * 3 + at) * 6}px)` }}>{ic}<Mono size={22} color={look.ink}>{n}</Mono></div>; })}
        </div>
      </Ov>
      <Ov a={S('c6b')} b={S('t1')} y={880}>
        <Col>
          <Strike text="THE REWARD" at={c('reward', 'c6b')} strikeAt={c('point', 'c6b')} replace="A REASON TO COME BACK" replaceAt={c('reason', 'c6b')} size={70} />
          {t >= c('habit', 'c6b') - 0.6 && <div style={{ display: 'flex', gap: 8 }}>{Array.from({ length: 7 }, (_, i) => <div key={i} style={{ width: 70, height: 70, borderRadius: 16, background: t >= c('habit', 'c6b') - 0.6 + i * 0.1 ? look.good : '#3A3E46', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Check size={36} color="#fff" /></div>)}</div>}
        </Col>
      </Ov>

      {/* ── 07 the catch ── */}
      <Ov a={c('Most', 't1')} b={S('t2')} y={880}>
        <Split at={c('Most', 't1')} rightAt={c('good', 't1')} w={940} h={260}
          left={{ title: 'Most games', tone: 'problem', body: <div style={{ fontFamily: FONT.display, fontWeight: 700, fontSize: 52, color: look.problem }}>play forever ∞</div> }}
          right={{ title: 'A learning game', tone: 'good', body: <div style={{ fontFamily: FONT.display, fontWeight: 700, fontSize: 52, color: look.good }}>built to finish</div> }} />
      </Ov>
      <Ov a={S('t2')} b={S('cav')} y={880}>
        <div style={{ display: 'flex', gap: 14 }}>{([['write the code', c('Write', 't2')], ['fix the bug', c('Fix', 't2')], ['get it right', c('Get', 't2')]] as [string, number][]).map(([x, at]) => <Tag key={x} at={at} text={`✓ ${x}`} size={30} tone="good" solid />)}</div>
      </Ov>
      <Ov a={S('cav')} b={S('recap')} x={SX} y={1000}><Col w={600}><Strike text="NO APP LEARNS FOR YOU" at={c('app', 'cav')} strikeAt={c('show', 'cav')} replace="YOU SHOW UP" replaceAt={c('show', 'cav')} size={46} /><BigText at={c('trick', 'cav')} lines={['MAKE SHOWING', 'UP EASY.']} size={68} align="center" color={look.good} /></Col></Ov>

      {/* ── recap (Remi on) ── */}
      <At x={SX} y={930}>
        {t >= S('recap') - 0.2 && t < S('ty1') && (
          <div style={{ opacity: 1 - prog(t, S('ty1') - 0.25, S('ty1')) }}>
            <Recap width={580} titleAt={S('recap')} items={[
              { text: 'Tiny levels', at: c('Tiny', 'recap') }, { text: 'A streak', at: c('streak', 'recap') }, { text: 'A progress bar', at: c('progress', 'recap') },
              { text: 'Other players', at: c('Other', 'recap') }, { text: 'Rewards', at: c('Rewards', 'recap') },
            ]} />
          </div>
        )}
      </At>

      {/* ── the Teyro tour ── */}
      {t >= S('ty1') - 0.1 && t < S('punch') && (
        <AbsoluteFill style={{ opacity: 1 - prog(t, S('punch') - 0.25, S('punch')) }}>
          <At x={540} y={500}><TeyroHeader at={S('ty1')} /></At>
          <Ov a={S('ty2')} b={S('ty3')} y={1010}><LessonCard /></Ov>
          <Ov a={S('ty3')} b={S('ty4')} y={1000}><StreakCard /></Ov>
          <Ov a={S('ty4')} b={S('ty5')} y={1010}><LeagueCard /></Ov>
          <Ov a={S('ty5')} b={S('ty6')} y={1010}><RewardsCard /></Ov>
          <Ov a={S('ty6')} b={S('punch')} y={1010}><FriendsCard /></Ov>
        </AbsoluteFill>
      )}

      {/* ── punchline ── */}
      {t >= S('punch') && t < S('cta') && (
        <AbsoluteFill style={{ opacity: 1 - prog(t, S('cta') - 0.2, S('cta')) }}>
          <At x={540} y={820} w={1040}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
              {([['IT FEELS LIKE PLAYING.', c('feels', 'punch'), look.inkSoft, 84], ['BUT YOU FINISH.', c('finish', 'punch'), look.good, 120]] as [string, number, string, number][]).map(([txt, at, col, sz]) => {
                const k = pop(frame, fps, at, { damping: 10 });
                return <div key={txt} style={{ fontFamily: FONT.display, fontWeight: 700, fontSize: sz, lineHeight: 1.04, letterSpacing: '-0.03em', color: col, transform: `scale(${k})`, opacity: Math.min(1, k * 1.5), whiteSpace: 'nowrap' }}>{txt}</div>;
              })}
            </div>
          </At>
        </AbsoluteFill>
      )}

      {/* ── outro + loop back to the cover ── */}
      <TeyroOutro at={S('cta')} until={end - 0.45} headline="Learning that plays like a game. Free to start." ask="Search Teyro" />
      <LoopBack from={end - 0.45} dur={0.4}>
        <AbsoluteFill style={{ background: NT.bg }}>
          <Backdrop />
          <div style={{ position: 'absolute', left: Z.gutter + 10, right: Z.gutter + 10, top: 410, textAlign: 'center' }}>
            {["DON'T BUY", 'ANOTHER COURSE'].map((l) => <div key={l} style={{ fontFamily: FONT.display, fontWeight: 700, fontSize: 112, lineHeight: 0.95, letterSpacing: '-0.035em', color: NT.ink }}>{l}</div>)}
            <div style={{ marginTop: 22, fontFamily: FONT.mono, fontWeight: 700, fontSize: 30, letterSpacing: '0.42em', color: NT.problem }}>UNTIL YOU WATCH THIS</div>
          </div>
          <div style={{ position: 'absolute', left: 0, right: 0, top: 410 + 2 * 112 + 120 + 40, bottom: 1920 - Z.stageBottom - 40, display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}><BuyButton still /></div>
        </AbsoluteFill>
      </LoopBack>

      {/* ── host + captions ── */}
      <Host on={[[S('cav'), S('ty1') - 0.1]]} poses={[{ t: 0, p: 'idle' }, { t: S('cav'), p: 'explain' }, { t: c('easy', 'cav'), p: 'point' }, { t: S('recap'), p: 'point' }, { t: c('Rewards', 'recap'), p: 'wow' }]} />
      <Captions hideBetween={[[br.start, brEnd]]} />
    </AbsoluteFill>
  );
};

/* ───────────── sound design ───────────── */
const SFX: SfxCue[] = [
  { t: 0.05, s: 'boom' }, { t: c('buy', 'h1'), s: 'error', v: 0.6 },
  { t: c('finish', 'h2'), s: 'glitch', v: 0.6 }, { t: c('start', 'h2'), s: 'boom', v: 0.6 },
  { t: c('lazy', 'h3'), s: 'tick' }, { t: c('design', 'h3') - 0.15, s: 'swoosh' }, { t: c('games', 'h3'), s: 'chime', v: 0.6 },
  { t: c('five', 'h4'), s: 'boom', v: 0.6 }, ...ticks([0, 1, 2, 3, 4].map((i) => c('tricks', 'h4') + i * 0.18), 'pop'),
  ...CHAPTERS.flatMap(([id]) => revealCues(S(id)).map((x) => ({ ...x, v: 0.55 }))),
  { t: c('hours', 'c1a'), s: 'tick' }, { t: c('finish', 'c1a'), s: 'pop' }, { t: c('nobody', 'c1a'), s: 'error', v: 0.5 },
  { t: c('one', 'c1b'), s: 'success', v: 0.5 }, { t: c('five', 'c1b'), s: 'tick' }, { t: c('twelve', 'c1b'), s: 'error', v: 0.5 },
  { t: c('three', 'c1c'), s: 'count' }, { t: c('finished', 'c1c'), s: 'boom', v: 0.6 },
  { t: c('hours', 'c2a'), s: 'swoosh' }, { t: c('level', 'c2a'), s: 'pop' }, { t: c('win', 'c2a'), s: 'success' }, { t: c('next', 'c2b'), s: 'chime', v: 0.6 },
  { t: c('grows', 'c3a'), s: 'count' }, { t: c('more', 'c3b'), s: 'swoosh' }, { t: c('loss', 'c3b'), s: 'boom', v: 0.6 },
  { t: c('Duolingo', 'c3c'), s: 'pop' }, { t: c('three', 'c3c'), s: 'count' },
  ...ticks(Array.from({ length: 10 }, (_, i) => c('Buy', 'c4a') + (c('gradient', 'c4b') - c('Buy', 'c4a')) * (1 - Math.pow(1 - (i + 1) / 10, 0.55))), 'tick'),
  { t: c('goal', 'c4b'), s: 'boom', v: 0.6 }, ...ticks([c('Quests', 'c4c'), c('Chests', 'c4c'), c('Bars', 'c4c')], 'pop'), { t: c('last', 'c4d'), s: 'riser', v: 0.5 },
  { t: S('bridge'), s: 'chime' }, ...ticks([c('streaks', 'back'), c('quests', 'back'), c('leagues', 'back')], 'pop'), { t: c('Okay', 'back'), s: 'whoosh', v: 0.6 },
  { t: c('leaderboard', 'c5a'), s: 'pop' }, { t: c('racing', 'c5b'), s: 'swoosh' }, { t: c('friends', 'c5b'), s: 'pop' },
  ...ticks([c('Coins', 'c6a'), c('Chests', 'c6a'), c('shop', 'c6a')], 'pop'), { t: c('point', 'c6b'), s: 'swoosh' }, { t: c('habit', 'c6b'), s: 'success', v: 0.6 },
  { t: c('Most', 't1'), s: 'swoosh' }, { t: c('finish', 't1'), s: 'success' }, ...ticks([c('Write', 't2'), c('Fix', 't2'), c('Get', 't2')], 'pop'),
  { t: c('easy', 'cav'), s: 'chime', v: 0.6 },
  ...revealCues(S('recap')).map((x) => ({ ...x, v: 0.5 })), ...ticks(['Tiny', 'streak', 'progress', 'Other', 'Rewards'].map((w) => c(w, 'recap')), 'pop'),
  ...revealCues(S('ty1')), { t: c('Teyro', 'ty1'), s: 'chime' },
  ...ticks(['learn', 'apply', 'reflect', 'deepen'].map((w) => c(w, 'ty2')), 'pop'), { t: c('instant', 'ty2'), s: 'success' },
  { t: c('XP', 'ty3'), s: 'count' }, { t: c('grows', 'ty3'), s: 'count' }, { t: c('freeze', 'ty3'), s: 'chime', v: 0.6 },
  { t: c('Bronze', 'ty4'), s: 'riser', v: 0.5 }, { t: c('Diamond', 'ty4'), s: 'success' }, { t: c('real', 'ty4'), s: 'swoosh' },
  { t: c('quests', 'ty5'), s: 'count' }, { t: c('Chests', 'ty5'), s: 'shatter', v: 0.6 }, { t: c('Chests', 'ty5') + 0.3, s: 'chime', v: 0.6 }, { t: c('shop', 'ty5'), s: 'pop' }, { t: c('badge', 'ty5'), s: 'success', v: 0.6 },
  ...ticks([c('Follow', 'ty6'), c('race', 'ty6'), c('streaks', 'ty6')], 'pop'), { t: c('community', 'ty6'), s: 'chime', v: 0.6 },
  { t: c('feels', 'punch'), s: 'boom', v: 0.6 }, { t: c('finish', 'punch'), s: 'boom', v: 0.8 },
  { t: S('cta'), s: 'whoosh' }, { t: S('cta') + 0.6, s: 'pop' },
];

export const M6: React.FC = () => (
  <MotionProvider look="night" vo={vo}>
    <Scene />
    <SoundLayer slug={SLUG} sfx={SFX} />
  </MotionProvider>
);
