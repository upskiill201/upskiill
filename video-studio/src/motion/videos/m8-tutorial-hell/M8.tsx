import React from 'react';
import { AbsoluteFill, Img, staticFile } from 'remotion';
import {
  AlertTriangle, BookOpen, Brain, Calendar, Check, Code2, Eye, Flame, Gift, GitBranch, GitCommitHorizontal, GitPullRequest, Keyboard,
  Lightbulb, Medal, PenLine, PlayCircle, Presentation, RefreshCw, Smile, Snowflake, StickyNote, Timer, Trophy, User, Users, Workflow, X, Zap,
} from 'lucide-react';
import {
  Annotation, At, Backdrop, Badge, BigText, Captions, ChapterCard, ChapterTag, Footnote, Host, HudMeter, LoopBack, MotionProvider, Recap, SfxCue,
  SoundLayer, Strike, Tag, TeyroBridge, TeyroOutro, TitleCard, Ticker, TypeLine, VO, cue, fmt, life, line,
  loadMotionFonts, pop, prog, revealCues, rnd, ticks, useMotion, Z, FONT, LOOKS, BRAND,
} from '../../kit';
import voJson from './vo.json';

const vo = voJson as VO;
const SLUG = 'm8-tutorial-hell';
const NT = LOOKS.night;
export const M8_DURATION = Math.ceil((vo.duration + 0.25) * 30);

/* ───────────── timing helpers ───────────── */
const L = (id: string) => line(vo, id);
const c = (w: string, after?: string | number, n = 1) => cue(vo, w, { n, after: typeof after === 'string' ? L(after).start : after });
const S = (id: string) => L(id).start;
const SX = 700;
const FLAME = '#FF9A3C';
const GOLD = '#F2C76B';
const WATCH = NT.accent;   // watching = blue
const WRITE = NT.good;     // writing = green

/* ───────────── shared bits ───────────── */
const Ov: React.FC<{ a: number; b: number; x?: number; y?: number; children: React.ReactNode }> = ({ a, b, x = 540, y = 900, children }) => {
  const { t, frame, fps } = useMotion();
  if (t < a || t >= b) return null;
  const k = life(t, frame, fps, a, b);
  return <At x={x} y={y}><div style={{ opacity: Math.min(1, k * 1.3), transform: `translateY(${(1 - Math.min(1, k)) * 24}px)` }}>{children}</div></At>;
};
const Col: React.FC<{ children: React.ReactNode; w?: number; gap?: number }> = ({ children, w = 1000, gap = 16 }) => <div style={{ width: w, display: 'flex', flexDirection: 'column', alignItems: 'center', gap }}>{children}</div>;
const Row: React.FC<{ children: React.ReactNode; gap?: number }> = ({ children, gap = 16 }) => <div style={{ display: 'flex', alignItems: 'center', gap }}>{children}</div>;
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
const PopIn: React.FC<{ at: number; children: React.ReactNode; damping?: number }> = ({ at, children, damping = 11 }) => {
  const { frame, fps } = useMotion();
  const k = pop(frame, fps, at, { damping });
  if (k <= 0) return null;
  return <div style={{ opacity: Math.min(1, k * 1.4), transform: `scale(${0.7 + 0.3 * k})` }}>{children}</div>;
};

/** faint drifting code glyphs: ambient motion for the dark world */
const Drift: React.FC = () => {
  const { t } = useMotion();
  const glyphs = ['{ }', '</>', ';', '( )', '=>', '#', '[ ]', '++', '//', '$'];
  return (
    <AbsoluteFill style={{ pointerEvents: 'none' }}>
      {Array.from({ length: 22 }, (_, i) => {
        const sp = 40 + rnd(i + 5) * 55;
        const y = ((rnd(i) * 1920 - t * sp) % 1920 + 1920) % 1920;
        const x = rnd(i + 11) * 1080 + Math.sin(t * 0.6 + i) * 16;
        return <div key={i} style={{ position: 'absolute', left: x, top: y, fontFamily: FONT.mono, fontWeight: 800, fontSize: 34 + rnd(i + 3) * 36, color: i % 3 ? '#3F4756' : '#2F4A3A', opacity: 0.75 }}>{glyphs[i % glyphs.length]}</div>;
      })}
    </AbsoluteFill>
  );
};

/* ───────────── the hero objects: video player + my editor ───────────── */
const Player: React.FC<{ w?: number; still?: boolean; ended?: number; title?: string; time?: string }> = ({ w = 640, still, ended, title = 'Full Coding Course', time = '40:12:07' }) => {
  const { look, t } = useMotion();
  const isEnded = ended !== undefined && t >= ended;
  const p = still ? 0.35 : isEnded ? 1 : 0.35 + ((t * 0.01) % 0.6);
  return (
    <div style={{ width: w, borderRadius: 24, background: '#FFFFFF', padding: 16, boxSizing: 'border-box', boxShadow: '0 24px 60px rgba(0,0,0,0.5)' }}>
      <div style={{ height: w * 0.42, borderRadius: 14, background: '#0E1014', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
        {!isEnded && <div style={{ position: 'absolute', left: 24, top: 22, right: 24, fontFamily: FONT.mono, fontSize: w * 0.03, color: '#86C98A', lineHeight: 1.5, textAlign: 'left', opacity: 0.8 }}>function add(a, b) {'{'}<br />&nbsp;&nbsp;return a + b<br />{'}'}</div>}
        {isEnded ? <span style={{ fontFamily: FONT.display, fontWeight: 700, fontSize: w * 0.07, color: look.inkSoft }}>↺ Replay</span> : <PlayCircle size={w * 0.16} color="#fff" style={{ opacity: 0.9 }} />}
      </div>
      <div style={{ height: 8, borderRadius: 4, background: '#E5E7EB', marginTop: 12 }}><div style={{ width: `${p * 100}%`, height: '100%', borderRadius: 4, background: '#F0614F' }} /></div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10, fontFamily: FONT.sans, fontWeight: 800, fontSize: w * 0.042, color: '#16181B' }}><span>{title}</span><span style={{ fontFamily: FONT.mono, fontWeight: 600, color: '#5D626B', fontSize: w * 0.032 }}>{time}</span></div>
    </div>
  );
};

/** my editor: lines type in on their cue; a blinking cursor; can freeze over */
const Editor: React.FC<{ w?: number; lines?: [string, number][]; frozenAt?: number; still?: boolean; name?: string; grey?: number; tint?: string }> = ({ w = 760, lines = [], frozenAt, still, name = 'my-app.js', grey, tint }) => {
  const { look, t } = useMotion();
  const shown = lines.filter(([, at]) => t >= at);
  const fz = frozenAt !== undefined ? prog(t, frozenAt, frozenAt + 0.5) : 0;
  const shake = frozenAt !== undefined && t >= frozenAt && t < frozenAt + 0.45 ? Math.sin(t * 90) * 7 : 0;
  const blink = still || Math.floor(t * 2.2) % 2 === 0;
  const g = grey !== undefined && t >= grey;
  return (
    <div style={{ width: w, borderRadius: 24, background: '#0E1014', border: `2.5px solid ${fz > 0 ? '#9BE7FF' : tint ?? look.cardEdge}`, boxShadow: `0 24px 60px rgba(0,0,0,0.5)${fz > 0 ? `, 0 0 ${40 * fz}px #9BE7FF88` : ''}`, overflow: 'hidden', transform: `translateX(${shake}px)`, position: 'relative' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '14px 18px', background: '#1A1D22' }}>
        {['#F0614F', '#F2C76B', '#86C98A'].map((col) => <div key={col} style={{ width: 16, height: 16, borderRadius: 8, background: col }} />)}
        <span style={{ marginLeft: 12, fontFamily: FONT.mono, fontSize: 22, color: look.inkSoft }}>{name}</span>
      </div>
      <div style={{ padding: '18px 22px', minHeight: w * 0.3, fontFamily: FONT.mono, fontSize: w * 0.034, lineHeight: 1.6, color: g ? look.inkFaint : '#E6E8EC' }}>
        {Array.from({ length: Math.max(3, shown.length + 1) }, (_, i) => (
          <div key={i} style={{ display: 'flex', gap: 18 }}>
            <span style={{ color: look.inkFaint, width: 30, textAlign: 'right' }}>{i + 1}</span>
            <span>{shown[i]?.[0] ?? ''}{i === shown.length && blink && <span style={{ display: 'inline-block', width: w * 0.018, height: w * 0.045, background: fz > 0 ? '#9BE7FF' : look.ink, verticalAlign: 'middle' }} />}</span>
          </div>
        ))}
      </div>
      {fz > 0 && <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(160deg, rgba(155,231,255,${0.22 * fz}), rgba(155,231,255,${0.05 * fz}))` }} />}
    </div>
  );
};

/* ───────────── chapter visuals ───────────── */
const Playlist: React.FC = () => {
  const { look, t } = useMotion();
  const at = c('watched', 'h2');
  const titles = ['HTML in 4 hours', 'JavaScript full course', 'React crash course', 'Python for beginners', 'Build 10 projects'];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: 760 }}>
      {titles.map((x, i) => {
        const a = at + i * 0.22;
        if (t < a) return <div key={x} style={{ height: 64 }} />;
        const k = prog(t, a, a + 0.25);
        return (
          <div key={x} style={{ height: 64, display: 'flex', alignItems: 'center', gap: 16, padding: '0 18px', borderRadius: 16, background: 'rgba(36,39,45,0.96)', border: `2px solid ${look.cardEdge}`, opacity: k, transform: `translateX(${(1 - k) * -40}px)` }}>
            <PlayCircle size={34} color={WATCH} />
            <span style={{ flex: 1, fontFamily: FONT.sans, fontWeight: 700, fontSize: 28, color: look.ink }}>{x}</span>
            <Check size={30} color={look.inkSoft} />
          </div>
        );
      })}
    </div>
  );
};

/** follow-along: the video and my editor type the same code */
const FollowAlong: React.FC = () => {
  const { look, t } = useMotion();
  const fa = c('follow', 'c1a'), works = c('works', 'c1a'), great = c('great', 'c1a');
  return (
    <Col gap={18}>
      <div style={{ display: 'flex', gap: 20, alignItems: 'flex-start' }}>
        <Player w={420} ended={c('ends', 'c1b')} title="Tutorial" time="12:40" />
        <Editor w={500} lines={[['let total = 0', fa], ['total = add(2, 3)', fa + 0.35], ['print(total)', fa + 0.7]]} grey={c('coding', 'c1b')} />
      </div>
      {t >= works && t < S('c1b') + 0.4 && <PopIn at={works}><Row gap={14}><div style={{ padding: '10px 18px', borderRadius: 14, background: '#0E1014', fontFamily: FONT.mono, fontSize: 30, color: look.good, border: `2px solid ${look.good}` }}>output: 5 ✓</div>{t >= great && <PopIn at={great}><Smile size={70} color={GOLD} /></PopIn>}</Row></PopIn>}
    </Col>
  );
};

const VideoVsSkill: React.FC = () => {
  const { look, t, frame, fps } = useMotion();
  const v = c('video', 'c1b', 2), s = c('skill', 'c1b'), hell = c('tutorial', 'c1b');
  if (t >= hell - 0.1) {
    const k = pop(frame, fps, hell, { damping: 9 });
    const fl = 1 + Math.sin(t * 9) * 0.04;
    return (
      <Col gap={10}>
        <Flame size={150} color={look.problem} fill={`${look.problem}44`} style={{ transform: `scale(${k * fl})`, filter: `drop-shadow(0 0 30px ${look.problem})` }} />
        <div style={{ fontFamily: FONT.display, fontWeight: 700, fontSize: 120, letterSpacing: '-0.03em', color: look.problem, transform: `scale(${k})`, whiteSpace: 'nowrap' }}>TUTORIAL HELL</div>
      </Col>
    );
  }
  return (
    <Col gap={20}>
      <Editor w={760} lines={[['let total = 0', 0], ['total = add(2, 3)', 0], ['print(total)', 0]]} grey={0} still />
      <Row gap={18}>
        {t >= v && <PopIn at={v}><div style={{ padding: '14px 24px', borderRadius: 18, border: `3px solid ${WATCH}`, fontFamily: FONT.display, fontWeight: 700, fontSize: 48, color: WATCH }}>THE VIDEO ✓</div></PopIn>}
        {t >= s && <PopIn at={s}><div style={{ padding: '14px 24px', borderRadius: 18, border: `3px solid ${look.problem}`, fontFamily: FONT.display, fontWeight: 700, fontSize: 48, color: look.problem }}>THE SKILL ✗</div></PopIn>}
      </Row>
    </Col>
  );
};

/** recognise vs draw from memory */
const FaceVsDraw: React.FC = () => {
  const { look, t } = useMotion();
  const a = c('Recognising', 'c2c'), b = c('Drawing', 'c2c'), cd = c('Coding', 'c2c');
  const box = (on: boolean, col: string, icon: React.ReactNode, title: string, sub: string) => (
    <div style={{ width: 280, padding: '20px 16px', borderRadius: 22, border: `2.5px solid ${on ? col : look.cardEdge}`, background: 'rgba(36,39,45,0.96)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
      {icon}<span style={{ fontFamily: FONT.display, fontWeight: 700, fontSize: 36, color: look.ink }}>{title}</span><Mono size={18} color={col}>{sub}</Mono>
    </div>
  );
  return (
    <Col w={600} gap={20}>
      <Row gap={20}>
        {t >= a && <PopIn at={a}>{box(true, WRITE, <Smile size={90} color={look.ink} />, 'Recognise', 'easy')}</PopIn>}
        {t >= b && <PopIn at={b}>{box(true, look.problem, <PenLine size={90} color={look.ink} />, 'Draw it', 'from memory · hard')}</PopIn>}
      </Row>
      {t >= cd && <PopIn at={cd}><div style={{ fontFamily: FONT.display, fontWeight: 700, fontSize: 50, color: GOLD, textAlign: 'center', lineHeight: 1.05 }}>CODING =<br />DRAWING FROM MEMORY</div></PopIn>}
    </Col>
  );
};

/** the study board: the persistent "lab" for chapters 03, 06 and 07 */
const Lane: React.FC<{ label: string; col: string; children: React.ReactNode }> = ({ label, col, children }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '16px 18px', borderRadius: 20, background: 'rgba(36,39,45,0.96)', border: `2.5px solid ${col}` }}>
    <div style={{ width: 150, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}><User size={54} color={col} /><Mono size={17} color={col}>{label}</Mono></div>
    <div style={{ flex: 1, display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center' }}>{children}</div>
  </div>
);
const StudyGroups: React.FC = () => {
  const { look, t } = useMotion();
  const fourteen = c('fourteen', 'c3a'), three = c('three', 'c3b'), tested = c('tested', 'c3b'), notes = c('notes', 'c3b'), recall = c('recall', 'c3b');
  return (
    <div style={{ width: 960, display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Lane label="re-readers" col={WATCH}>
        {Array.from({ length: 14 }, (_, i) => { const a = c('read', 'c3a') + i * ((fourteen + 0.5 - c('read', 'c3a')) / 14); return t >= a ? <BookOpen key={i} size={46} color={WATCH} style={{ opacity: prog(t, a, a + 0.15) }} /> : null; })}
        {t >= fourteen && <span style={{ fontFamily: FONT.display, fontWeight: 700, fontSize: 48, color: WATCH, marginLeft: 6 }}>×14</span>}
      </Lane>
      {t >= S('c3b') && (
        <Lane label="testers" col={WRITE}>
          {Array.from({ length: 3 }, (_, i) => t >= three - 0.3 + i * 0.12 ? <BookOpen key={i} size={46} color={look.inkSoft} /> : null)}
          {Array.from({ length: 3 }, (_, i) => t >= tested + i * 0.15 ? <div key={`q${i}`} style={{ width: 52, height: 52, borderRadius: 12, background: `${WRITE}33`, border: `2px solid ${WRITE}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: FONT.display, fontWeight: 700, fontSize: 32, color: WRITE }}>?</div> : null)}
          {t >= notes && <span style={{ position: 'relative', marginLeft: 8 }}><StickyNote size={44} color={look.inkSoft} /><X size={44} color={look.problem} style={{ position: 'absolute', left: 0, top: 0 }} /></span>}
          {t >= recall && <PopIn at={recall}><Brain size={52} color={GOLD} /></PopIn>}
        </Lane>
      )}
    </div>
  );
};

/** a pair of result bars: blue = re-readers, green = testers */
const Bars: React.FC<{ label: string; a: [number, number]; b: [number, number]; unit?: string; flipLabel?: boolean }> = ({ label, a, b, unit = '%' }) => {
  const { look, t } = useMotion();
  const row = (name: string, v: number, at: number, col: string) => {
    if (t < at) return <div style={{ height: 96 }} />;
    const k = prog(t, at, at + 0.8);
    return (
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}><Mono size={22} color={col}>{name}</Mono><span style={{ fontFamily: FONT.display, fontWeight: 700, fontSize: 52, color: col, lineHeight: 1 }}>{Math.round(v * k)}{unit}</span></div>
        <div style={{ height: 36, borderRadius: 12, background: 'rgba(255,255,255,0.06)' }}><div style={{ width: `${v * k}%`, height: '100%', borderRadius: 12, background: col }} /></div>
      </div>
    );
  };
  return (
    <div style={{ width: 880, display: 'flex', flexDirection: 'column', gap: 18 }}>
      <Mono size={22} color={look.ink}>{label}</Mono>
      {row('re-readers', a[0], a[1], WATCH)}
      {row('testers', b[0], b[1], WRITE)}
    </div>
  );
};

const Confidence: React.FC = () => {
  const { look, t } = useMotion();
  const at = c('confident', 'c3d');
  const row = (name: string, v: number, col: string, d: number) => {
    const k = prog(t, at + d, at + d + 0.6);
    return <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}><span style={{ width: 170 }}><Mono size={18} color={col}>{name}</Mono></span>{Array.from({ length: 7 }, (_, i) => <div key={i} style={{ width: 54, height: 30, borderRadius: 8, background: i < v * k ? col : '#3A3E46' }} />)}<span style={{ fontFamily: FONT.mono, fontWeight: 800, fontSize: 24, color: col }}>{(v * k).toFixed(1)}/7</span></div>;
  };
  return (
    <Panel at={c('more', 'c3d') - 0.2} w={880} edge={look.accent2}>
      <Col w={820} gap={12}>
        <Mono size={20} color={look.ink}>"how well will you remember it?"</Mono>
        {row('re-readers', 4.8, WATCH, 0)}
        {row('testers', 4.0, WRITE, 0.15)}
      </Col>
    </Panel>
  );
};

/** 100 students: red = failed. Lecture 34, doing the work 22. */
const Students: React.FC = () => {
  const { look, t } = useMotion();
  const lec = c('thirty-four', 'c4c'), work = c('Doing', 'c4c'), tt = c('twenty-two', 'c4c');
  const nRed = t >= tt ? 22 : t >= work ? 34 - Math.round(12 * prog(t, work, tt)) : t >= lec ? Math.round(34 * prog(t, lec, lec + 0.6)) : 0;
  const order = Array.from({ length: 100 }, (_, i) => i).sort((x, y) => rnd(x + 40) - rnd(y + 40));
  const red = new Set(order.slice(0, nRed));
  return (
    <Col gap={16}>
      <Row gap={22}>
        <div style={{ padding: '10px 22px', borderRadius: 16, border: `3px solid ${t < work ? WATCH : look.cardEdge}`, display: 'flex', alignItems: 'center', gap: 10, opacity: t < work ? 1 : 0.45 }}><Presentation size={40} color={WATCH} /><span style={{ fontFamily: FONT.display, fontWeight: 700, fontSize: 40, color: look.ink }}>lecture</span></div>
        <div style={{ padding: '10px 22px', borderRadius: 16, border: `3px solid ${t >= work ? WRITE : look.cardEdge}`, display: 'flex', alignItems: 'center', gap: 10, opacity: t >= work ? 1 : 0.45 }}><Keyboard size={40} color={WRITE} /><span style={{ fontFamily: FONT.display, fontWeight: 700, fontSize: 40, color: look.ink }}>doing the work</span></div>
      </Row>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(20, 1fr)', gap: 6, width: 860 }}>
        {Array.from({ length: 100 }, (_, i) => <User key={i} size={38} color={red.has(i) ? look.problem : '#C9CED6'} strokeWidth={2.6} />)}
      </div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 14 }}>
        <span style={{ fontFamily: FONT.display, fontWeight: 700, fontSize: 120, color: t >= work ? WRITE : look.problem, lineHeight: 1 }}>{nRed}</span>
        <span style={{ fontFamily: FONT.sans, fontWeight: 700, fontSize: 36, color: look.ink }}>in 100 failed</span>
      </div>
      <Footnote at={lec} width={860} text="Freeman et al., PNAS (2014) · meta-analysis of 225 studies of college STEM courses" />
    </Col>
  );
};

/** no feedback: the video keeps playing past my typo */
const SilentVideo: React.FC = () => {
  const { look, t } = useMotion();
  const wrong = c('wrong', 'c5a');
  return (
    <Col gap={18}>
      <Row gap={20}>
        <Player w={400} title="Tutorial" time="12:41" />
        <Editor w={480} name="app.js" lines={[['retrun a + b', S('c5a') + 0.3]]} />
      </Row>
      {t >= wrong && <PopIn at={wrong}><Row gap={12}><Eye size={44} color={look.inkSoft} /><span style={{ fontFamily: FONT.display, fontWeight: 700, fontSize: 48, color: look.inkSoft }}>no one tells you</span></Row></PopIn>}
    </Col>
  );
};
const MistakeLoop: React.FC = () => {
  const { look, t } = useMotion();
  const pr = c('practise', 'c5b'), right = c('right', 'c5b'), sec = c('seconds', 'c5b'), brk = c('breaks', 'c5b');
  return (
    <Col gap={16}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, width: 760 }}>
        {[0, 1, 2].map((i) => t >= pr + i * 0.3 ? <div key={i} style={{ padding: '10px 18px', borderRadius: 14, background: '#0E1014', fontFamily: FONT.mono, fontSize: 32, color: t >= sec ? look.problem : '#E6E8EC', border: `2px dashed ${t >= right && t < sec ? GOLD : look.cardEdge}`, opacity: prog(t, pr + i * 0.3, pr + i * 0.3 + 0.2) }}>retrun a + b {t >= right && t < sec && <span style={{ color: GOLD }}> ✓?</span>}</div> : <div key={i} style={{ height: 66 }} />)}
      </div>
      {t >= sec && <PopIn at={sec}><div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 22px', borderRadius: 18, background: `${look.problem}22`, border: `2.5px solid ${look.problem}` }}><Timer size={40} color={look.problem} /><span style={{ fontFamily: FONT.sans, fontWeight: 800, fontSize: 32, color: look.ink }}>retrun → return</span><span style={{ fontFamily: FONT.mono, fontWeight: 800, fontSize: 26, color: look.problem }}>0.4 s</span></div></PopIn>}
      {t >= brk && <PopIn at={brk}><Strike text="FOUND IN PRODUCTION" at={brk} strikeAt={brk + 0.25} size={50} /></PopIn>}
    </Col>
  );
};

const TinySteps: React.FC = () => {
  const { look, t } = useMotion();
  const items: [React.ReactNode, string, number][] = [[<Lightbulb size={80} color={GOLD} />, 'one idea', c('One', 'c6a')], [<Code2 size={80} color={WRITE} />, 'use it', c('Use', 'c6a')], [<Calendar size={80} color={WATCH} />, 'tomorrow', c('tomorrow', 'c6a')]];
  return (
    <Row gap={22}>
      {items.map(([ic, n, at], i) => t >= at - 0.1 ? <PopIn key={n} at={at - 0.1}><div style={{ width: 270, padding: '24px 10px', borderRadius: 24, border: `2.5px solid ${look.cardEdge}`, background: 'rgba(36,39,45,0.96)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, transform: `translateY(${Math.sin(t * 2.5 + i) * 6}px)` }}>{ic}<span style={{ fontFamily: FONT.display, fontWeight: 700, fontSize: 40, color: look.ink }}>{n}</span></div></PopIn> : <div key={n} style={{ width: 270 }} />)}
    </Row>
  );
};

/** forgetting: bars drain over a week */
const Forgetting: React.FC = () => {
  const { look, t } = useMotion();
  const half = c('half', 'c6b'), ft = c('fourteen', 'c6b');
  const row = (name: string, lost: number, at: number, col: string) => {
    const k = t >= at ? prog(t, at, at + 0.9) : 0;
    return (
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}><Mono size={22} color={col}>{name}</Mono><span style={{ fontFamily: FONT.display, fontWeight: 700, fontSize: 52, color: k > 0 ? look.problem : look.inkFaint, lineHeight: 1 }}>{k > 0 ? `−${Math.round(lost * k)}%` : ''}</span></div>
        <div style={{ height: 40, borderRadius: 12, background: `${look.problem}55`, position: 'relative', overflow: 'hidden' }}><div style={{ width: `${100 - lost * k}%`, height: '100%', borderRadius: 12, background: col }} /></div>
      </div>
    );
  };
  return (
    <Panel at={S('c6b')} w={900}>
      <Col w={840} gap={16}>
        <Row gap={10}><Calendar size={30} color={look.ink} /><Mono size={22} color={look.ink}>what they forgot in one week</Mono></Row>
        <div style={{ width: 840, display: 'flex', flexDirection: 'column', gap: 16 }}>
          {row('re-readers', 52, half, WATCH)}
          {row('testers', 14, ft, WRITE)}
        </div>
        <Footnote at={half} width={820} text="Roediger & Karpicke (2006) · proportional forgetting, Exp. 2" />
      </Col>
    </Panel>
  );
};

/** the crossover: re-reading wins at 5 min, loses at 1 week */
const Crossover: React.FC = () => {
  const { look, t } = useMotion();
  const a = S('t1'), wk = c('learning', 't3');
  const W = 820, H = 380, y = (v: number) => H - ((v - 30) / 60) * H;
  const draw = prog(t, wk - 0.2, wk + 0.8);
  const seg = (v0: number, v1: number, col: string) => <line x1={120} y1={y(v0)} x2={120 + (W - 240) * draw} y2={y(v0 + (v1 - v0) * draw)} stroke={col} strokeWidth={10} strokeLinecap="round" />;
  return (
    <svg width={W} height={H + 70} viewBox={`0 0 ${W} ${H + 70}`} style={{ overflow: 'visible' }}>
      <line x1={60} y1={H} x2={W - 40} y2={H} stroke={look.cardEdge} strokeWidth={3} />
      <text x={120} y={H + 50} textAnchor="middle" fontFamily="JetBrains Mono" fontWeight={800} fontSize={24} fill={look.inkSoft}>5 MIN</text>
      <text x={W - 120} y={H + 50} textAnchor="middle" fontFamily="JetBrains Mono" fontWeight={800} fontSize={24} fill={look.inkSoft}>1 WEEK</text>
      {t >= a && <>
        <circle cx={120} cy={y(83)} r={16 * prog(t, c('scored', 't1'), c('scored', 't1') + 0.3)} fill={WATCH} />
        <circle cx={120} cy={y(71)} r={16 * prog(t, c('scored', 't1') + 0.2, c('scored', 't1') + 0.5)} fill={WRITE} />
        {t >= c('scored', 't1') && <text x={150} y={y(83) - 14} fontFamily="Space Grotesk" fontWeight={700} fontSize={40} fill={WATCH}>83%</text>}
        {t >= c('scored', 't1') + 0.2 && <text x={150} y={y(71) + 46} fontFamily="Space Grotesk" fontWeight={700} fontSize={40} fill={WRITE}>71%</text>}
      </>}
      {draw > 0 && <>{seg(83, 40, WATCH)}{seg(71, 61, WRITE)}</>}
      {draw > 0.95 && <><text x={W - 100} y={y(40) + 14} fontFamily="Space Grotesk" fontWeight={700} fontSize={40} fill={WATCH}>40%</text><text x={W - 100} y={y(61) + 14} fontFamily="Space Grotesk" fontWeight={700} fontSize={40} fill={WRITE}>61%</text></>}
    </svg>
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
        <div style={{ fontFamily: FONT.sans, fontWeight: 650, fontSize: 28, color: NT.inkSoft, marginTop: 6 }}>Practise. Don't just watch.</div>
      </div>
    </div>
  );
};

const CourseCard: React.FC = () => {
  const { t } = useMotion();
  const at = S('ty2'), n = c('Fifty-seven', 'ty2');
  return (
    <Panel at={at} w={880} light edge={BRAND.blue}>
      <div style={{ display: 'flex', gap: 10 }}>
        <span style={{ padding: '6px 14px', borderRadius: 10, background: '#EEF2FF', color: BRAND.blue, fontFamily: FONT.mono, fontWeight: 800, fontSize: 20 }}>CODING</span>
        <span style={{ padding: '6px 14px', borderRadius: 10, background: '#E9F7EF', color: '#1F9D55', fontFamily: FONT.mono, fontWeight: 800, fontSize: 20, transform: `scale(${t >= c('free', 'ty2') && t < c('free', 'ty2') + 0.4 ? 1.15 : 1})` }}>FREE</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 18, marginTop: 18 }}>
        <div style={{ width: 96, height: 96, borderRadius: 24, background: '#1F2A44', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><GitBranch size={56} color="#fff" /></div>
        <div style={{ fontFamily: FONT.sans, fontWeight: 800, fontSize: 40, color: '#16181B', lineHeight: 1.1 }}>Learn Git, GitHub, and GitHub Actions</div>
      </div>
      <div style={{ fontFamily: FONT.sans, fontSize: 25, color: '#5D626B', marginTop: 14, lineHeight: 1.35 }}>Manage code, collaborate on projects, and automate your development workflow.</div>
      <div style={{ display: 'flex', gap: 26, marginTop: 18, alignItems: 'baseline' }}>
        <span style={{ fontFamily: FONT.display, fontWeight: 700, fontSize: 56, color: BRAND.blue }}><Ticker keys={[{ t: 0, v: 0 }, { t: n, v: 57, dur: 0.8 }]} format={fmt.int} /></span>
        <span style={{ fontFamily: FONT.mono, fontWeight: 800, fontSize: 22, color: '#5D626B' }}>LESSONS · 6H 7M</span>
      </div>
    </Panel>
  );
};

const LessonCard: React.FC = () => {
  const { t, frame, fps } = useMotion();
  const steps: [string, number][] = [['Learn', c('Learn', 'ty3')], ['Apply', c('apply', 'ty3')], ['Reflect', c('reflect', 'ty3')], ['Deepen', c('deepen', 'ty3')]];
  const typed = c('write', 'ty4'), right = c('instantly', 'ty4'), xp = c('XP', 'ty4');
  const ans = 'git commit -m "first commit"';
  const nChar = Math.round(ans.length * prog(t, typed, typed + 1.0));
  return (
    <Panel at={S('ty3')} w={900} light edge={BRAND.blue}>
      <div style={{ display: 'flex', gap: 10 }}>
        {steps.map(([s, at], i) => { const on = t >= at; return <div key={s} style={{ flex: 1, padding: '10px 0', textAlign: 'center', borderRadius: 14, background: on ? BRAND.blue : '#EEF2FF', color: on ? '#fff' : BRAND.blue, fontFamily: FONT.sans, fontWeight: 800, fontSize: 25, transform: `scale(${t >= at && t < at + 0.4 ? 1.08 : 1})` }}>{i + 1} {s}</div>; })}
      </div>
      <div style={{ marginTop: 18, display: 'flex', alignItems: 'center', gap: 10 }}><Mono size={18} color={BRAND.blue}>Apply</Mono><Mono size={16} color="#94A3B8">· a few minutes</Mono></div>
      <div style={{ fontFamily: FONT.sans, fontWeight: 700, fontSize: 28, color: '#16181B', marginTop: 4 }}>Save your staged changes with a message:</div>
      <div style={{ marginTop: 10, padding: '14px 16px', borderRadius: 14, background: '#0E1014', fontFamily: FONT.mono, fontSize: 28, color: '#E6E8EC', minHeight: 40 }}>
        <span style={{ color: '#5D626B' }}>$ </span><span style={{ color: t >= right ? '#86C98A' : '#E6E8EC' }}>{ans.slice(0, nChar)}</span>{t < right && Math.floor(t * 2.2) % 2 === 0 && <span style={{ display: 'inline-block', width: 14, height: 30, background: '#E6E8EC', verticalAlign: 'middle' }} />}
      </div>
      {t >= right && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 14, padding: '12px 16px', borderRadius: 14, background: '#E9F7EF', transform: `scale(${pop(frame, fps, right, { damping: 10 })})` }}>
          <Check size={30} color="#1F9D55" strokeWidth={3} /><span style={{ flex: 1, fontFamily: FONT.sans, fontWeight: 800, fontSize: 28, color: '#1F9D55' }}>Nice! That's right.</span>
          {t >= xp - 0.2 && <span style={{ fontFamily: FONT.display, fontWeight: 700, fontSize: 34, color: '#F5A524', transform: `scale(${pop(frame, fps, xp - 0.2, { damping: 9 })})` }}>+10 XP</span>}
        </div>
      )}
    </Panel>
  );
};

const StreakFlame: React.FC<{ keys: { t: number; v: number; dur?: number }[]; size?: number }> = ({ keys, size = 1 }) => {
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

const StreakCard: React.FC = () => {
  const { t } = useMotion();
  const fr = c('freeze', 'ty5'), gr = c('grows', 'ty5');
  return (
    <Panel at={S('ty5')} w={900}>
      <StreakFlame size={0.8} keys={[{ t: 0, v: 21 }, { t: gr, v: 28, dur: 1.0 }]} />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(10, 1fr)', gap: 8, marginTop: 18 }}>
        {Array.from({ length: 20 }, (_, i) => {
          const frozen = i === 10;
          const on = frozen ? t >= fr : true;
          return <div key={i} style={{ height: 40, borderRadius: 10, background: frozen ? (on ? '#6FA8FF' : '#3A3E46') : `${FLAME}${i > 16 && t < gr ? '33' : 'CC'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${frozen && t >= fr && t < fr + 0.5 ? 1.25 : 1})` }}>{frozen && on && <Snowflake size={24} color="#fff" />}</div>;
        })}
      </div>
      {t >= fr && <div style={{ marginTop: 12 }}><Tag at={fr} text="a freeze saved day 11" size={20} /></div>}
    </Panel>
  );
};

const LeagueQuestCard: React.FC = () => {
  const { look, t, frame, fps } = useMotion();
  const tiers: [string, string][] = [['Bronze', '#C98A55'], ['Silver', '#B8C0CC'], ['Gold', '#F2C76B'], ['Sapphire', '#6FA8FF'], ['Diamond', '#9BE7FF']];
  const up = prog(t, c('Bronze', 'ty5'), c('Diamond', 'ty5') + 0.3);
  const qa = c('quests', 'ty5'), chest = c('chests', 'ty5');
  const q: [string, number][] = [['Earn 50 XP', 50], ['Finish 3 lessons', 3], ['Get 20 answers right', 20]];
  const open = prog(t, chest + 0.2, chest + 0.6);
  return (
    <Panel at={c('Weekly', 'ty5') - 0.1} w={900}>
      <Row gap={10}><Trophy size={30} color={GOLD} /><span style={{ fontFamily: FONT.sans, fontWeight: 800, fontSize: 30, color: look.ink }}>Weekly league</span></Row>
      <div style={{ display: 'flex', gap: 10, marginTop: 12 }}>
        {tiers.map(([n, col], i) => { const on = up >= i / (tiers.length - 1) - 0.01; return <div key={n} style={{ flex: 1, padding: '8px 0', textAlign: 'center', borderRadius: 12, border: `2px solid ${col}`, background: on ? `${col}33` : 'transparent', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}><Medal size={28} color={col} /><span style={{ fontFamily: FONT.mono, fontWeight: 800, fontSize: 15, color: on ? col : '#6B7280' }}>{n.toUpperCase()}</span></div>; })}
      </div>
      {t >= qa - 0.1 && (
        <div style={{ display: 'flex', gap: 22, marginTop: 20 }}>
          <div style={{ flex: 1.4 }}>
            <Mono size={18} color={GOLD}>Daily quests</Mono>
            {q.map(([name, max], i) => { const k = prog(t, qa + i * 0.15, qa + 0.6 + i * 0.15); return (
              <div key={name} style={{ marginTop: 10 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: FONT.sans, fontWeight: 700, fontSize: 22, color: look.ink }}><span>{name}</span><span style={{ fontFamily: FONT.mono, color: GOLD }}>{Math.round(max * k)} / {max}</span></div>
                <div style={{ height: 14, borderRadius: 7, background: '#3A3E46', marginTop: 4 }}><div style={{ width: `${k * 100}%`, height: '100%', borderRadius: 7, background: GOLD }} /></div>
              </div>
            ); })}
          </div>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
            {t >= chest - 0.1 && <div style={{ transform: `scale(${pop(frame, fps, chest - 0.1, { damping: 9 })}) rotate(${open > 0 && open < 1 ? Math.sin(t * 40) * 6 : 0}deg)` }}><Gift size={100} color={look.accent2} /></div>}
            {t >= chest + 0.4 && <span style={{ fontFamily: FONT.display, fontWeight: 700, fontSize: 34, color: GOLD }}>+50 coins</span>}
          </div>
        </div>
      )}
    </Panel>
  );
};

const FriendsCard: React.FC = () => {
  const { look, t, frame, fps } = useMotion();
  const feed: [string, string, string, number][] = [['K', 'Kemi', 'finished Unit 4', c('Friends', 'ty6')], ['D', 'Daniel', 'on a 7-lesson day', c('race', 'ty6')], ['P', 'Priya', 'joined your league', c('race', 'ty6') + 0.3]];
  const comm = c('community', 'ty6'), cheer = c('cheers', 'ty6');
  return (
    <Panel at={S('ty6')} w={900}>
      <Row gap={10}><Users size={30} color={look.accent} /><Mono size={20} color={look.ink}>Friends</Mono></Row>
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
          {t >= cheer && <div style={{ fontFamily: FONT.sans, fontSize: 21, color: look.good, marginTop: 4 }}>Kemi cheered you on</div>}
        </div>
      )}
    </Panel>
  );
};

/** the outcome: my own git history fills in */
const GitStory: React.FC = () => {
  const { look, t, frame, fps } = useMotion();
  const cm = c('commit', 'ty7'), pr = c('pull', 'ty7'), ac = c('Action', 'ty7');
  const node = (at: number, icon: React.ReactNode, title: string, sub: string, col: string) => {
    if (t < at - 0.1) return <div style={{ height: 112 }} />;
    const k = pop(frame, fps, at - 0.1, { damping: 11 });
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: 18, opacity: Math.min(1, k * 1.4), transform: `translateX(${(1 - Math.min(1, k)) * 40}px)` }}>
        <div style={{ width: 84, height: 84, borderRadius: 42, background: `${col}22`, border: `3px solid ${col}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{icon}</div>
        <div style={{ flex: 1, padding: '14px 20px', borderRadius: 18, background: 'rgba(36,39,45,0.96)', border: `2px solid ${look.cardEdge}` }}>
          <div style={{ fontFamily: FONT.sans, fontWeight: 800, fontSize: 32, color: look.ink }}>{title}</div>
          <div style={{ fontFamily: FONT.mono, fontSize: 21, color: col, marginTop: 2 }}>{sub}</div>
        </div>
      </div>
    );
  };
  const spin = ((t - ac) * 360) % 360;
  return (
    <div style={{ width: 880, display: 'flex', flexDirection: 'column', gap: 14 }}>
      <Row gap={14}>
        <div style={{ padding: '10px 20px', borderRadius: 16, border: `2.5px solid ${look.cardEdge}`, opacity: 0.6 }}><Mono size={22}>watched · 40h</Mono></div>
        <span style={{ fontFamily: FONT.display, fontWeight: 700, fontSize: 40, color: look.inkSoft }}>→</span>
        <div style={{ padding: '10px 20px', borderRadius: 16, border: `2.5px solid ${WRITE}`, background: `${WRITE}22`, transform: `scale(${1 + Math.sin(prog(t, S('ty7'), S('ty7') + 0.5) * Math.PI) * 0.1})` }}><Mono size={22} color={WRITE}>wrote it myself</Mono></div>
      </Row>
      {node(cm, <GitCommitHorizontal size={44} color={WRITE} />, 'first commit', 'a1f3c9e · main', WRITE)}
      {node(pr, <GitPullRequest size={44} color={look.accent2 === '#F07A5A' ? '#B79CFF' : look.accent2} />, 'Pull request #1', 'merged into main', '#B79CFF')}
      {node(ac, <Workflow size={44} color={GOLD} />, 'GitHub Action: test', t >= ac + 1.1 ? '✓ passed · runs on every push' : `running… ${'◐◓◑◒'[Math.floor(spin / 90) % 4]}`, t >= ac + 1.1 ? WRITE : GOLD)}
    </div>
  );
};

/* ───────────── title (cover) composition ───────────── */
const CoverArt: React.FC<{ still?: boolean }> = ({ still }) => {
  const { look } = useMotion();
  return (
    <div style={{ position: 'relative' }}>
      <Player w={700} still={still} />
      <div style={{ position: 'absolute', right: -50, top: 30, padding: '10px 30px', border: `8px solid ${look.problem}`, borderRadius: 16, color: look.problem, fontFamily: FONT.display, fontWeight: 700, fontSize: 96, letterSpacing: '0.04em', transform: 'rotate(-12deg)', background: 'rgba(22,24,27,0.85)' }}>STOP</div>
    </div>
  );
};

/* ───────────── scene ───────────── */
const CHAPTERS: [string, string, string][] = [['c1a', '01', 'The freeze'], ['c2a', '02', 'The illusion'], ['c3a', '03', 'The study'], ['c4a', '04', 'Do the work'], ['c5a', '05', 'Feedback'], ['c6a', '06', 'Tiny steps'], ['t1', '07', 'The trap']];
const SIDE = new Set(['c2a']);   // chapters that open while Remi is on (card sits on the side stage)

const Scene: React.FC = () => {
  loadMotionFonts();
  const { look, t, frame, fps } = useMotion();
  const br = L('bridge');
  const end = vo.duration + 0.25;
  const brEnd = c('First', 'back') - 0.05;
  const hoursKeys = [{ t: 0, v: 0 }, { t: c('forty', 'h2'), v: 40, dur: 0.9 }];
  const linesKeys = [
    { t: 0, v: 0 }, { t: c('writing', 'back'), v: 12, dur: 1.4 }, { t: c('practise', 'c5b'), v: 26, dur: 0.8 }, { t: c('Use', 'c6a'), v: 41, dur: 0.6 },
    { t: c('write', 'cav'), v: 58, dur: 0.5 }, { t: c('write', 'ty4'), v: 140, dur: 1.0 }, { t: c('flipped', 'ty7'), v: 1240, dur: 1.8 },
  ];

  return (
    <AbsoluteFill>
      <Backdrop cam={{ x: Math.sin(t * 0.5) * 30, y: t * 12, z: 1 }} />
      <Drift />

      {/* ── HUD: the running meter (watched vs written) ── */}
      <HudMeter pulseTeyro={[br.start, S('ty1'), S('cta')]}
        lamps={[{ label: 'WATCHING', color: WATCH, on: [[0, br.start]] }, { label: 'WRITING', color: WRITE, on: [[br.start, end + 1]] }]}
        counters={[{ label: 'hours watched', keys: hoursKeys, format: (v) => `${Math.round(v)}h` }, { label: 'lines I wrote', keys: linesKeys, format: fmt.int, align: 'right' }]}
        sub={[{ t: 0, text: 'mode · watching tutorials' }, { t: br.start, text: 'mode · writing code' }]} />
      <ChapterTag chapters={[{ t: 0, text: 'tutorial hell' }, ...CHAPTERS.map(([id, n, name]) => ({ t: S(id), text: `${n} · ${name}` })), { t: S('recap'), text: 'recap' }, { t: S('ty1'), text: 'how I learn now' }]} />

      {/* ── HOOK (frame 0 = cover) ── */}
      <TitleCard title={['STOP WATCHING', 'TUTORIALS']} kicker="IF YOU WANT TO LEARN TO CODE" until={S('h2')} titleSize={112} top={410}><div style={{ marginTop: 30 }}><CoverArt /></div></TitleCard>
      <Ov a={S('h2')} b={c('opened', 'h2') - 0.1} y={880}>
        <Col gap={22}>
          <Playlist />
          <PopIn at={c('forty', 'h2')}><div style={{ display: 'flex', alignItems: 'baseline', gap: 14 }}><span style={{ fontFamily: FONT.display, fontWeight: 700, fontSize: 140, color: WATCH, lineHeight: 1 }}>40h</span><span style={{ fontFamily: FONT.sans, fontWeight: 700, fontSize: 36, color: look.ink }}>watched</span></div></PopIn>
        </Col>
      </Ov>
      <Ov a={c('opened', 'h2') - 0.1} b={S('h3')} y={860}>
        <Col gap={22}>
          <Editor w={800} frozenAt={c('froze', 'h2')} />
          {t >= c('froze', 'h2') && <Badge at={c('froze', 'h2')} text="FROZEN" tone="accent" icon={<Snowflake size={30} />} />}
        </Col>
      </Ov>
      <Ov a={S('h3')} b={S('h4')} x={SX} y={880}>
        <Col w={600} gap={20}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}><span style={{ fontFamily: FONT.display, fontWeight: 700, fontSize: 150, color: look.problem, lineHeight: 1 }}>0</span><span style={{ fontFamily: FONT.sans, fontWeight: 700, fontSize: 40, color: look.ink }}>lines</span></div>
          <Strike text="YOUR BRAIN" at={c('brain', 'h3') - 0.3} strikeAt={c('method', 'h3') - 0.2} replace="THE METHOD" replaceAt={c('method', 'h3')} size={80} />
        </Col>
      </Ov>
      <Ov a={S('h4')} b={S('c1a')} x={SX} y={880}>
        <Col w={600} gap={18}>
          <Tag at={c('really', 'h4')} text="what's really going on" size={34} tone="problem" solid />
          <Tag at={c('fixed', 'h4')} text="what fixed it for me" size={34} tone="good" solid />
        </Col>
      </Ov>

      {/* ── chapter cards ── */}
      {CHAPTERS.map(([id, n, name]) => <ChapterCard key={id} at={S(id)} until={S(id) + 2.4} n={n} title={name} sub="CHAPTER" size={96} x={SIDE.has(id) ? Z.sideX0 : undefined} y={392} color={id === 'c1a' ? look.problem : id === 't1' ? look.accent2 : id === 'c3a' ? GOLD : WRITE} />)}

      {/* ── 01 the freeze ── */}
      <Ov a={S('c1a') + 0.1} b={c('learned', 'c1b') - 0.1} y={900}><FollowAlong /></Ov>
      <Ov a={c('learned', 'c1b') - 0.1} b={S('c2a')} y={900}><VideoVsSkill /></Ov>

      {/* ── 02 the illusion (Remi on) ── */}
      <Ov a={S('c2a') + 0.3} b={S('c2b')} x={SX} y={940}>
        <Col w={600} gap={18}>
          <TypeLine width={600} size={54} align="center" words={[['Why', c('why', 'c2a')], ['does', c('does', 'c2a')], ['watching', c('watching', 'c2a')], ['feel', c('feel', 'c2a')], ['like', c('like', 'c2a')], ['learning?', c('learning', 'c2a')]]} />
          <BigText at={c('familiar', 'c2a')} lines={['FAMILIAR']} size={90} align="center" color={GOLD} />
        </Col>
      </Ov>
      <Ov a={S('c2b')} b={S('c2c')} x={SX} y={940}>
        <Col w={600} gap={18}>
          <div style={{ padding: '14px 18px', borderRadius: 16, background: '#0E1014', border: `2px solid ${look.cardEdge}`, fontFamily: FONT.mono, fontSize: 30, color: '#E6E8EC' }}>for (let i = 0; i {'<'} 3; i++)</div>
          {t >= c('yeah', 'c2b') && <Annotation at={c('yeah', 'c2b')} text="yeah, I know that" dx={-40} dy={-120} size={46} width={420} />}
          <Row gap={14}>
            <Tag at={c('seeing', 'c2b')} text="seeing ✓" size={34} tone="good" solid />
            <Tag at={c('writing', 'c2b')} text="writing ?" size={34} tone="problem" solid />
          </Row>
        </Col>
      </Ov>
      <Ov a={S('c2c')} b={S('c3a')} x={SX} y={900}><FaceVsDraw /></Ov>

      {/* ── 03 the study ── */}
      <Ov a={S('c3a') + 0.2} b={S('c3c')} y={920}><StudyGroups /></Ov>
      <Ov a={S('c3c')} b={S('c3d')} y={900}>
        <Col gap={18}>
          <Row gap={12}><Calendar size={40} color={GOLD} /><span style={{ fontFamily: FONT.display, fontWeight: 700, fontSize: 52, color: GOLD }}>+7 DAYS</span></Row>
          <Bars label="what they remembered" a={[40, c('forty', 'c3c')]} b={[61, c('sixty-one', 'c3c')]} />
          <Footnote at={c('forty', 'c3c')} width={880} text="Roediger & Karpicke, Psychological Science (2006) · Exp. 2, 1-week recall" />
        </Col>
      </Ov>
      <Ov a={S('c3d')} b={S('c4a')} y={900}>
        <Col gap={20}>
          <BigText at={c('stung', 'c3d')} lines={['THE TWIST']} size={70} align="center" color={look.accent2} />
          {t >= c('more', 'c3d') - 0.2 && <Confidence />}
          {t >= c('confident', 'c3d') + 0.5 && <Annotation at={c('confident', 'c3d') + 0.5} text="felt smarter, knew less" dx={60} dy={-70} size={46} width={480} />}
        </Col>
      </Ov>

      {/* ── 04 do the work ── */}
      <Ov a={S('c4a') + 0.1} b={S('c4b')} y={900}>
        <Col gap={10}>
          <BigText at={c('Write', 'c4a')} lines={['WRITE IT.']} size={130} align="center" color={WRITE} />
          {t >= c('watch', 'c4a') && <Strike text="WATCH IT." at={c('watch', 'c4a')} strikeAt={c('watch', 'c4a') + 0.2} size={110} />}
        </Col>
      </Ov>
      <Ov a={S('c4b')} b={S('c4c')} y={900}>
        <Col gap={22}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 14 }}><Ticker keys={[{ t: 0, v: 0 }, { t: c('two', 'c4b'), v: 225, dur: 1.0 }]} format={fmt.int} style={{ fontFamily: FONT.display, fontWeight: 700, fontSize: 150, color: GOLD, lineHeight: 1 }} /><span style={{ fontFamily: FONT.sans, fontWeight: 700, fontSize: 40, color: look.ink }}>studies</span></div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(25, 1fr)', gap: 5, width: 760 }}>
            {Array.from({ length: 225 }, (_, i) => { const a = c('two', 'c4b') + (i / 225) * 1.0; return <div key={i} style={{ height: 16, borderRadius: 3, background: t >= a ? GOLD : '#2B2F35' }} />; })}
          </div>
          <Row gap={22}>
            {t >= c('lectures', 'c4b') && <PopIn at={c('lectures', 'c4b')}><Row gap={10}><Presentation size={56} color={WATCH} /><span style={{ fontFamily: FONT.display, fontWeight: 700, fontSize: 44, color: look.ink }}>lectures</span></Row></PopIn>}
            {t >= c('with', 'c4b') && <span style={{ fontFamily: FONT.mono, fontWeight: 800, fontSize: 32, color: look.inkSoft }}>vs</span>}
            {t >= c('did', 'c4b') && <PopIn at={c('did', 'c4b')}><Row gap={10}><Keyboard size={56} color={WRITE} /><span style={{ fontFamily: FONT.display, fontWeight: 700, fontSize: 44, color: look.ink }}>did the work</span></Row></PopIn>}
          </Row>
        </Col>
      </Ov>
      <Ov a={S('c4c')} b={S('c4d')} y={900}><Students /></Ov>
      <Ov a={S('c4d')} b={br.start + 0.1} y={880}>
        <Col gap={14}>
          <Strike text="WATCHING" at={c('watching', 'c4d')} strikeAt={c('Watching', 'c4d', 2)} replace="WATCHING ONLY" replaceAt={c('only', 'c4d')} size={110} />
          {t >= c('changed', 'c4d') && <PopIn at={c('changed', 'c4d')}><Row gap={14}><RefreshCw size={56} color={WRITE} style={{ transform: `rotate(${(t - c('changed', 'c4d')) * 220}deg)` }} /><span style={{ fontFamily: FONT.display, fontWeight: 700, fontSize: 50, color: WRITE }}>so I changed how I learn</span></Row></PopIn>}
        </Col>
      </Ov>

      {/* ── Teyro mid bridge ── */}
      <TeyroBridge at={br.start} until={brEnd} line="Practise. Don't just watch." chips={['Write real code', 'Within minutes', 'Free to start']}
        chipTimes={[c('writing', 'back'), c('minutes', 'back'), c('later', 'back')]} beats={[c('Quick', 'bridge'), c('switched', 'bridge'), c('Teyro', 'bridge'), c('Every', 'back')]} />

      <Ov a={brEnd} b={S('c5a')} y={880}>
        <Col gap={18}>
          <Row gap={16}><Keyboard size={70} color={WRITE} style={{ transform: `translateY(${Math.sin(t * 10) * 4}px)` }} /><Mono size={30} color={WRITE}>writing mode: on</Mono></Row>
          <BigText at={c('part', 'back')} lines={['WHAT MADE', 'IT STICK']} size={100} align="center" color={GOLD} />
        </Col>
      </Ov>

      {/* ── 05 feedback ── */}
      <Ov a={S('c5a') + 0.1} b={S('c5b')} y={900}><SilentVideo /></Ov>
      <Ov a={S('c5b')} b={S('c6a')} y={900}><MistakeLoop /></Ov>

      {/* ── 06 tiny steps ── */}
      <Ov a={S('c6a') + 0.1} b={S('c6b')} y={900}><TinySteps /></Ov>
      <Ov a={S('c6b')} b={S('c6c')} y={900}><Forgetting /></Ov>
      <Ov a={S('c6c')} b={S('t1')} y={900}>
        <Row gap={24}>
          <PopIn at={c('Pull', 'c6c')}><Brain size={130} color={GOLD} style={{ transform: `rotate(${Math.sin(t * 4) * 5}deg)` }} /></PopIn>
          {t >= c('again', 'c6c') && <PopIn at={c('again', 'c6c')}><RefreshCw size={90} color={WRITE} style={{ transform: `rotate(${(t - c('again', 'c6c')) * 240}deg)` }} /></PopIn>}
          {t >= c('stays', 'c6c') && <PopIn at={c('stays', 'c6c')}><span style={{ fontFamily: FONT.display, fontWeight: 700, fontSize: 96, color: WRITE }}>IT STAYS</span></PopIn>}
        </Row>
      </Ov>

      {/* ── 07 the trap ── */}
      <Ov a={S('t1') + 0.1} b={S('t2')} y={920}><Col gap={10}><PopIn at={c('Five', 't1')}><Row gap={12}><Timer size={54} color={GOLD} style={{ transform: `rotate(${Math.sin(t * 6) * 8}deg)` }} /><span style={{ fontFamily: FONT.display, fontWeight: 700, fontSize: 56, color: GOLD }}>5 MIN LATER</span></Row></PopIn><Mono size={24} color={look.ink}>same study</Mono><Crossover /></Col></Ov>
      <Ov a={S('t2')} b={S('t3')} y={900}>
        <Col gap={18}>
          <Row gap={14}>
            <Tag at={c('slower', 't2')} text="slower" size={44} tone="problem" solid />
            <Tag at={c('Harder', 't2')} text="harder" size={44} tone="problem" solid />
            <Tag at={c('failing', 't2')} text="like failing" size={44} tone="problem" solid />
          </Row>
          {t >= c('failing', 't2') && <PopIn at={c('failing', 't2')}><AlertTriangle size={110} color={look.problem} /></PopIn>}
        </Col>
      </Ov>
      <Ov a={S('t3')} b={S('cav')} y={920}>
        <Col gap={14}>
          <Crossover />
          <BigText at={c('desirable', 't3')} lines={['DESIRABLE DIFFICULTY']} size={74} align="center" color={GOLD} />
          <Footnote at={c('desirable', 't3')} width={880} text="Bjork (1994), cited in Roediger & Karpicke (2006)" />
        </Col>
      </Ov>
      <Ov a={S('cav')} b={S('recap')} x={SX} y={940}>
        <Col w={600} gap={14}>
          <Strike text="VIDEOS ARE USELESS" at={c('videos', 'cav')} strikeAt={c('useless', 'cav')} size={48} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: 560 }}>
            {([[<PlayCircle size={40} color={WATCH} />, 'watch for the idea', c('Watch', 'cav')], [<X size={40} color={look.problem} />, 'close it', c('close', 'cav')], [<PenLine size={40} color={WRITE} />, 'write it yourself', c('write', 'cav')]] as [React.ReactNode, string, number][]).map(([ic, txt, at]) => t >= at ? <PopIn key={txt} at={at}><div style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '12px 18px', borderRadius: 16, background: 'rgba(36,39,45,0.96)', border: `2px solid ${look.cardEdge}` }}>{ic}<span style={{ fontFamily: FONT.display, fontWeight: 700, fontSize: 40, color: look.ink }}>{txt}</span></div></PopIn> : <div key={txt} style={{ height: 68 }} />)}
          </div>
        </Col>
      </Ov>

      {/* ── recap (Remi on) ── */}
      <At x={SX} y={930}>
        {t >= S('recap') - 0.2 && t < S('ty1') && (
          <div style={{ opacity: 1 - prog(t, S('ty1') - 0.25, S('ty1')) }}>
            <Recap width={580} titleAt={S('recap')} items={[
              { text: 'Watching ≠ knowing', at: c('Watching', 'recap') }, { text: 'Recall beats re-reading', at: c('Recall', 'recap') }, { text: 'Do the work', at: c('Do', 'recap') },
              { text: 'Feedback, fast', at: c('feedback', 'recap') }, { text: 'Small steps, every day', at: c('Small', 'recap') },
            ]} />
          </div>
        )}
      </At>

      {/* ── the Teyro section ── */}
      {t >= S('ty1') - 0.1 && t < S('punch') && (
        <AbsoluteFill style={{ opacity: 1 - prog(t, S('punch') - 0.25, S('punch')) }}>
          <At x={540} y={500}><TeyroHeader at={S('ty1')} /></At>
          <Ov a={S('ty1') + 0.6} b={S('ty2')} y={980}><Editor w={760} name="how-i-learn.md" lines={[['1. learn one idea', S('ty1') + 0.6], ['2. write it myself', S('ty1') + 0.9]]} tint={WRITE} /></Ov>
          <Ov a={S('ty2')} b={S('ty3')} y={1010}><CourseCard /></Ov>
          <Ov a={S('ty3')} b={S('ty5')} y={1010}><LessonCard /></Ov>
          <Ov a={S('ty5')} b={c('Weekly', 'ty5') - 0.1} y={1000}><StreakCard /></Ov>
          <Ov a={c('Weekly', 'ty5') - 0.1} b={S('ty6')} y={1010}><LeagueQuestCard /></Ov>
          <Ov a={S('ty6')} b={S('ty7')} y={1010}><FriendsCard /></Ov>
          <Ov a={S('ty7')} b={S('punch')} y={1000}><GitStory /></Ov>
        </AbsoluteFill>
      )}

      {/* ── punchline ── */}
      {t >= S('punch') && t < S('cta') && (
        <AbsoluteFill style={{ opacity: 1 - prog(t, S('cta') - 0.2, S('cta')) }}>
          <At x={540} y={820} w={1040}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
              {([["YOU DON'T LEARN CODE", c('You', 'punch'), look.inkSoft, 76], ['BY WATCHING IT.', c('watching', 'punch'), look.inkSoft, 76], ['YOU LEARN IT BY', c('learn', 'punch', 2), look.ink, 84], ['WRITING IT.', c('writing', 'punch'), WRITE, 140]] as [string, number, string, number][]).map(([txt, at, col, sz]) => {
                const k = pop(frame, fps, at, { damping: 10 });
                return <div key={txt} style={{ fontFamily: FONT.display, fontWeight: 700, fontSize: sz, lineHeight: 1.04, letterSpacing: '-0.03em', color: col, transform: `scale(${k})`, opacity: Math.min(1, k * 1.5), whiteSpace: 'nowrap' }}>{txt}</div>;
              })}
            </div>
          </At>
        </AbsoluteFill>
      )}

      {/* ── outro + loop back to the cover ── */}
      <TeyroOutro at={S('cta')} until={end - 0.45} headline="Practise. Don't just watch. Free to start." ask="Search Teyro · teyro.app" />
      <LoopBack from={end - 0.45} dur={0.4}>
        <AbsoluteFill style={{ background: NT.bg }}>
          <Backdrop />
          <div style={{ position: 'absolute', left: Z.gutter + 10, right: Z.gutter + 10, top: 410, textAlign: 'center' }}>
            {['STOP WATCHING', 'TUTORIALS'].map((l) => <div key={l} style={{ fontFamily: FONT.display, fontWeight: 700, fontSize: 112, lineHeight: 0.95, letterSpacing: '-0.035em', color: NT.ink }}>{l}</div>)}
            <div style={{ marginTop: 22, fontFamily: FONT.mono, fontWeight: 700, fontSize: 30, letterSpacing: '0.42em', color: NT.problem }}>IF YOU WANT TO LEARN TO CODE</div>
          </div>
          <div style={{ position: 'absolute', left: 0, right: 0, top: 410 + 2 * 112 + 120, bottom: 1920 - Z.stageBottom - 40, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><div style={{ marginTop: 30 }}><CoverArt still /></div></div>
        </AbsoluteFill>
      </LoopBack>

      {/* ── host + captions ── */}
      <Host on={[[S('h3'), S('c1a') - 0.1], [S('c2a'), S('c3a') - 0.1], [S('cav'), S('ty1') - 0.1]]}
        poses={[{ t: 0, p: 'idle' }, { t: S('h3'), p: 'explain' }, { t: c('method', 'h3'), p: 'point' }, { t: S('h4'), p: 'explain' },
          { t: S('c2a'), p: 'think' }, { t: c('familiar', 'c2a'), p: 'point' }, { t: S('c2b'), p: 'explain' }, { t: c('writing', 'c2b'), p: 'point' }, { t: S('c2c'), p: 'explain' }, { t: c('Coding', 'c2c'), p: 'wow' },
          { t: S('cav'), p: 'explain' }, { t: c('write', 'cav'), p: 'point' }, { t: S('recap'), p: 'point' }, { t: c('Small', 'recap'), p: 'wow' }]} />
      <Captions hideBetween={[[br.start, brEnd], [end - 0.45, end + 1]]} />
    </AbsoluteFill>
  );
};

/* ───────────── sound design ───────────── */
const SFX: SfxCue[] = [
  { t: 0.05, s: 'boom' }, { t: c('Stop', 'h1'), s: 'error', v: 0.6 },
  ...ticks([0, 1, 2, 3, 4].map((i) => c('watched', 'h2') + i * 0.22), 'tick'), { t: c('forty', 'h2'), s: 'count' },
  { t: c('opened', 'h2'), s: 'whoosh', v: 0.6 }, { t: c('froze', 'h2'), s: 'glitch', v: 0.7 },
  { t: c('line', 'h3'), s: 'error', v: 0.5 }, { t: c('method', 'h3') - 0.2, s: 'swoosh' }, { t: c('method', 'h3'), s: 'chime', v: 0.5 },
  { t: c('really', 'h4'), s: 'pop' }, { t: c('fixed', 'h4'), s: 'pop' },
  ...CHAPTERS.flatMap(([id]) => revealCues(S(id)).map((x) => ({ ...x, v: 0.55 }))),
  ...ticks([0, 0.35, 0.7].map((d) => c('follow', 'c1a') + d), 'type'), { t: c('works', 'c1a'), s: 'success', v: 0.6 }, { t: c('great', 'c1a'), s: 'pop' },
  { t: c('ends', 'c1b'), s: 'swoosh' }, { t: c('video', 'c1b', 2), s: 'pop' }, { t: c('skill', 'c1b'), s: 'error', v: 0.5 }, { t: c('tutorial', 'c1b'), s: 'boom', v: 0.7 }, { t: c('hell', 'c1b'), s: 'glitch', v: 0.5 },
  { t: c('familiar', 'c2a'), s: 'boom', v: 0.5 }, { t: c('yeah', 'c2b'), s: 'pop' }, { t: c('seeing', 'c2b'), s: 'pop' }, { t: c('writing', 'c2b'), s: 'error', v: 0.4 },
  { t: c('Recognising', 'c2c'), s: 'pop' }, { t: c('Drawing', 'c2c'), s: 'pop' }, { t: c('Coding', 'c2c'), s: 'chime', v: 0.6 },
  { t: c('fourteen', 'c3a'), s: 'count' }, ...ticks([0, 0.15, 0.3].map((d) => c('tested', 'c3b') + d), 'pop'), { t: c('notes', 'c3b'), s: 'error', v: 0.4 }, { t: c('recall', 'c3b'), s: 'chime', v: 0.5 },
  { t: c('week', 'c3c'), s: 'whoosh', v: 0.6 }, { t: c('forty', 'c3c'), s: 'count' }, { t: c('sixty-one', 'c3c'), s: 'success' },
  { t: c('stung', 'c3d'), s: 'boom', v: 0.5 }, { t: c('confident', 'c3d'), s: 'count' },
  { t: c('Write', 'c4a'), s: 'boom', v: 0.6 }, { t: c('watch', 'c4a') + 0.2, s: 'swoosh' },
  { t: c('two', 'c4b'), s: 'count' }, { t: c('lectures', 'c4b'), s: 'pop' }, { t: c('did', 'c4b'), s: 'pop' },
  { t: c('thirty-four', 'c4c'), s: 'error', v: 0.5 }, { t: c('Doing', 'c4c'), s: 'swoosh' }, { t: c('twenty-two', 'c4c'), s: 'success' },
  { t: c('Watching', 'c4d', 2), s: 'swoosh' }, { t: c('only', 'c4d'), s: 'boom', v: 0.5 }, { t: c('changed', 'c4d'), s: 'riser', v: 0.5 },
  { t: S('bridge'), s: 'chime' }, ...ticks([c('writing', 'back'), c('minutes', 'back'), c('later', 'back')], 'pop'), { t: c('First', 'back'), s: 'whoosh', v: 0.6 }, { t: c('part', 'back'), s: 'boom', v: 0.5 }, { t: c('Five', 't1'), s: 'tick' },
  ...ticks([0.3, 0.45, 0.6].map((d) => S('c5a') + d), 'type'), { t: c('wrong', 'c5a'), s: 'error', v: 0.4 },
  ...ticks([0, 0.3, 0.6].map((d) => c('practise', 'c5b') + d), 'tick'), { t: c('seconds', 'c5b'), s: 'error', v: 0.6 }, { t: c('breaks', 'c5b') + 0.25, s: 'swoosh' },
  ...ticks([c('One', 'c6a'), c('Use', 'c6a'), c('tomorrow', 'c6a')], 'pop'),
  { t: c('half', 'c6b'), s: 'count' }, { t: c('fourteen', 'c6b'), s: 'count' }, { t: c('again', 'c6c'), s: 'whoosh', v: 0.5 }, { t: c('stays', 'c6c'), s: 'success' },
  { t: c('scored', 't1'), s: 'pop' }, ...ticks([c('slower', 't2'), c('Harder', 't2'), c('failing', 't2')], 'pop'), { t: c('failing', 't2'), s: 'error', v: 0.4 },
  { t: c('learning', 't3'), s: 'riser', v: 0.5 }, { t: c('desirable', 't3'), s: 'boom', v: 0.6 },
  { t: c('useless', 'cav'), s: 'swoosh' }, ...ticks([c('Watch', 'cav'), c('close', 'cav'), c('write', 'cav')], 'pop'),
  ...revealCues(S('recap')).map((x) => ({ ...x, v: 0.5 })), ...ticks(['Watching', 'Recall', 'Do', 'feedback', 'Small'].map((w) => c(w, 'recap')), 'pop'),
  ...revealCues(S('ty1')), { t: c('Teyro', 'ty1'), s: 'chime' },
  { t: c('free', 'ty2'), s: 'pop' }, { t: c('Fifty-seven', 'ty2'), s: 'count' },
  ...ticks(['Learn', 'apply', 'reflect', 'deepen'].map((w) => c(w, 'ty3')), 'pop'), { t: c('write', 'ty4'), s: 'type' }, { t: c('instantly', 'ty4'), s: 'success' }, { t: c('XP', 'ty4'), s: 'count' },
  { t: c('grows', 'ty5'), s: 'count' }, { t: c('freeze', 'ty5'), s: 'chime', v: 0.6 }, { t: c('Bronze', 'ty5'), s: 'riser', v: 0.5 }, { t: c('Diamond', 'ty5'), s: 'success' },
  { t: c('quests', 'ty5'), s: 'count' }, { t: c('chests', 'ty5'), s: 'shatter', v: 0.6 }, { t: c('chests', 'ty5') + 0.4, s: 'chime', v: 0.6 },
  ...ticks([c('Friends', 'ty6'), c('race', 'ty6'), c('race', 'ty6') + 0.3], 'pop'), { t: c('community', 'ty6'), s: 'chime', v: 0.6 },
  { t: c('flipped', 'ty7'), s: 'count' }, { t: c('commit', 'ty7'), s: 'pop' }, { t: c('pull', 'ty7'), s: 'pop' }, { t: c('Action', 'ty7'), s: 'tick' }, { t: c('Action', 'ty7') + 1.1, s: 'success' },
  { t: c('watching', 'punch'), s: 'boom', v: 0.5 }, { t: c('writing', 'punch'), s: 'boom', v: 0.8 },
  { t: S('cta'), s: 'whoosh' }, { t: S('cta') + 0.6, s: 'pop' },
];

export const M8: React.FC = () => (
  <MotionProvider look="night" vo={vo}>
    <Scene />
    <SoundLayer slug={SLUG} sfx={SFX} />
  </MotionProvider>
);
