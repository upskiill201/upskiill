import React from 'react';
import { AbsoluteFill, Img, staticFile } from 'remotion';
import {
  Bot, Brain, Check, CornerDownLeft, Database, Eye, EyeOff, Flame, Gift, Medal, RefreshCw, Server, Trophy, Users, Workflow, Zap,
} from 'lucide-react';
import {
  Annotation, At, Backdrop, BigText, Captions, ChapterCard, ChapterTag, Footnote, Host, HudJourney, LayerStack, LoopBack, MotionProvider, Recap, SfxCue,
  SoundLayer, Split, Strike, Tag, TeyroBridge, TeyroOutro, TitleCard, Ticker, VO, cue, fmt, life, line,
  loadMotionFonts, pop, prog, revealCues, rnd, ticks, useMotion, Z, FONT, LOOKS, BRAND,
} from '../../kit';
import voJson from './vo.json';

const vo = voJson as VO;
const SLUG = 'm9-chatgpt-enter';
const NE = LOOKS.neon;
export const M9_DURATION = Math.ceil((vo.duration + 0.25) * 30);

/* ───────────── timing helpers ───────────── */
const L = (id: string) => line(vo, id);
const c = (w: string, after?: string | number, n = 1) => cue(vo, w, { n, after: typeof after === 'string' ? L(after).start : after });
const S = (id: string) => L(id).start;
const SX = 700;
const FLAME = '#FF9A3C';
const GOLD = '#FFC857';
const PROMPT = ['Why', ' is', ' the', ' sky', ' blue', '?'];
const IDS = [10930, 382, 290, 17307, 9861, 30];   // illustrative token ids (real ones depend on the tokenizer)

/* ───────────── shared bits ───────────── */
const Ov: React.FC<{ a: number; b: number; x?: number; y?: number; children: React.ReactNode }> = ({ a, b, x = 540, y = 900, children }) => {
  const { t, frame, fps } = useMotion();
  if (t < a || t >= b) return null;
  const k = life(t, frame, fps, a, b);
  return <At x={x} y={y}><div style={{ opacity: Math.min(1, k * 1.3), transform: `translateY(${(1 - Math.min(1, k)) * 24}px)` }}>{children}</div></At>;
};
const Col: React.FC<{ children: React.ReactNode; w?: number; gap?: number }> = ({ children, w = 1000, gap = 16 }) => <div style={{ width: w, display: 'flex', flexDirection: 'column', alignItems: 'center', gap }}>{children}</div>;
const Row: React.FC<{ children: React.ReactNode; gap?: number; wrap?: boolean }> = ({ children, gap = 16, wrap }) => <div style={{ display: 'flex', alignItems: 'center', gap, flexWrap: wrap ? 'wrap' : 'nowrap', justifyContent: 'center' }}>{children}</div>;
const Panel: React.FC<{ at: number; w: number; children: React.ReactNode; light?: boolean; edge?: string; pad?: number; style?: React.CSSProperties }> = ({ at, w, children, light, edge, pad = 26, style }) => {
  const { look, t, frame, fps } = useMotion();
  const k = pop(frame, fps, at, { damping: 12 });
  if (k <= 0) return null;
  const ph = (t - at) % 1.6;
  const breath = t > at + 0.8 && ph < 0.35 ? Math.sin((ph / 0.35) * Math.PI) : 0;
  return (
    <div style={{ width: w, borderRadius: 28, background: light ? '#FFFFFF' : 'rgba(15,19,38,0.96)', border: `2.5px solid ${edge ?? (light ? '#E2E8F0' : look.cardEdge)}`, padding: pad, boxSizing: 'border-box', boxShadow: `0 20px 50px rgba(0,0,0,0.5)${breath ? `, 0 0 ${28 * breath}px ${edge ?? look.accent}88` : ''}`, transform: `scale(${k * (1 + breath * 0.012)})`, ...style }}>
      {children}
    </div>
  );
};
const Mono: React.FC<{ children: React.ReactNode; size?: number; color?: string }> = ({ children, size = 20, color }) => <span style={{ fontFamily: FONT.mono, fontWeight: 800, fontSize: size, letterSpacing: '0.1em', color: color ?? NE.inkSoft, textTransform: 'uppercase' }}>{children}</span>;
const PopIn: React.FC<{ at: number; children: React.ReactNode; damping?: number }> = ({ at, children, damping = 11 }) => {
  const { frame, fps } = useMotion();
  const k = pop(frame, fps, at, { damping });
  if (k <= 0) return null;
  return <div style={{ opacity: Math.min(1, k * 1.4), transform: `scale(${0.7 + 0.3 * k})` }}>{children}</div>;
};

/** a token chip; colour = its index on the neon ramp */
const Chip: React.FC<{ text: string; i: number; at: number; size?: number; dim?: boolean; glow?: boolean }> = ({ text, i, at, size = 44, dim, glow }) => {
  const { look, t, frame, fps } = useMotion();
  if (t < at) return null;
  const k = pop(frame, fps, at, { damping: 11 });
  const col = look.ramp[i % look.ramp.length];
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', padding: `${size * 0.18}px ${size * 0.32}px`, borderRadius: size * 0.3, background: `${col}${dim ? '14' : '2A'}`, border: `2.5px solid ${col}`, fontFamily: FONT.mono, fontWeight: 700, fontSize: size, color: dim ? look.inkFaint : look.ink, whiteSpace: 'pre', transform: `scale(${0.6 + 0.4 * k})`, opacity: Math.min(1, k * 1.5), boxShadow: glow ? `0 0 22px ${col}` : 'none' }}>
      {text.replace(/^ /, '·')}
    </span>
  );
};

/** faint drifting digits: ambient motion for the neon world (tokens → numbers) */
const Drift: React.FC = () => {
  const { t } = useMotion();
  return (
    <AbsoluteFill style={{ pointerEvents: 'none' }}>
      {Array.from({ length: 22 }, (_, i) => {
        const sp = 40 + rnd(i + 5) * 55;
        const y = ((rnd(i) * 1920 - t * sp) % 1920 + 1920) % 1920;
        const x = rnd(i + 11) * 1080 + Math.sin(t * 0.6 + i) * 16;
        return <div key={i} style={{ position: 'absolute', left: x, top: y, fontFamily: FONT.mono, fontWeight: 700, fontSize: 22 + rnd(i + 3) * 20, color: i % 3 ? '#26305E' : '#21455A', opacity: 0.45 }}>{Math.floor(rnd(i + 7) * 90000)}</div>;
      })}
    </AbsoluteFill>
  );
};

/* ───────────── the hero object: the chat ───────────── */
const Chat: React.FC<{ w?: number; sentAt?: number; answer?: [string, number][]; unknownAt?: number; still?: boolean; typing?: boolean }> = ({ w = 820, sentAt, answer = [], unknownAt, still, typing }) => {
  const { look, t, frame, fps } = useMotion();
  const sent = sentAt !== undefined && t >= sentAt;
  const press = sentAt !== undefined && t >= sentAt - 0.15 && t < sentAt + 0.15;
  const sk = sent ? pop(frame, fps, sentAt!, { damping: 13 }) : 0;
  const shown = answer.filter(([, at]) => t >= at).map(([w]) => w).join('');
  const blink = still || Math.floor(t * 2.4) % 2 === 0;
  return (
    <div style={{ width: w, borderRadius: 30, background: '#0B0E1C', border: `2.5px solid ${look.cardEdge}`, padding: 22, boxSizing: 'border-box', boxShadow: `0 24px 60px rgba(0,0,0,0.6), 0 0 40px ${look.accent}33` }}>
      <div style={{ minHeight: 210, display: 'flex', flexDirection: 'column', gap: 14, justifyContent: 'flex-end' }}>
        {sent && <div style={{ alignSelf: 'flex-end', padding: '14px 22px', borderRadius: 22, background: look.accent, color: '#fff', fontFamily: FONT.sans, fontWeight: 700, fontSize: w * 0.04, transform: `translateY(${(1 - sk) * 60}px)`, opacity: sk }}>Why is the sky blue?</div>}
        {sent && (
          <div style={{ alignSelf: 'flex-start', display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 48, height: 48, borderRadius: 24, background: `${look.accent2}33`, border: `2px solid ${look.accent2}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Bot size={28} color={look.accent2} /></div>
            <div style={{ padding: '14px 22px', borderRadius: 22, background: '#161B33', color: look.ink, fontFamily: FONT.sans, fontWeight: 600, fontSize: w * 0.04, maxWidth: w * 0.75 }}>
              {shown || (typing ? '' : '…')}{(typing || shown) && blink && <span style={{ color: look.accent2 }}>▍</span>}
              {unknownAt !== undefined && t >= unknownAt && <span style={{ color: look.problem, fontWeight: 800 }}> ???</span>}
            </div>
          </div>
        )}
      </div>
      <div style={{ marginTop: 18, display: 'flex', alignItems: 'center', gap: 14, padding: '12px 14px 12px 22px', borderRadius: 20, background: '#161B33', border: `2px solid ${look.cardEdge}` }}>
        <span style={{ flex: 1, fontFamily: FONT.sans, fontSize: w * 0.04, color: sent ? look.inkFaint : look.ink }}>{sent ? 'Message ChatGPT' : 'Why is the sky blue?'}</span>
        <div style={{ width: 74, height: 64, borderRadius: 16, background: press ? '#fff' : look.accent, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${press ? 0.86 : 1})`, boxShadow: `0 0 ${press ? 40 : 16}px ${look.accent}` }}><CornerDownLeft size={36} color={press ? look.accent : '#fff'} /></div>
      </div>
    </div>
  );
};

/* ───────────── chapter visuals ───────────── */
const Chopped: React.FC = () => {
  const { look, t } = useMotion();
  const cut = c('chopped', 'c1a');
  const split = prog(t, cut, cut + 0.5);
  return (
    <Col gap={26}>
      {t < cut ? (
        <div style={{ fontFamily: FONT.mono, fontWeight: 700, fontSize: 70, color: look.ink, padding: '14px 26px', borderRadius: 20, border: `2.5px solid ${look.cardEdge}` }}>Why is the sky blue?</div>
      ) : (
        <Row gap={8 + 18 * split}>{PROMPT.map((p, i) => <Chip key={i} text={p} i={i} at={cut + i * 0.06} size={58} />)}</Row>
      )}
      {t >= cut && t < cut + 0.35 && <div style={{ width: 900, height: 6, background: '#fff', boxShadow: `0 0 30px ${look.accent2}`, opacity: 1 - prog(t, cut, cut + 0.35), marginTop: -70 }} />}
      {t >= c('words', 'c1b') && <Strike text="WORDS" at={c('words', 'c1b')} strikeAt={c('Into', 'c1b')} replace="TOKENS" replaceAt={c('tokens', 'c1b')} size={100} />}
      <Row gap={18}>
        <Tag at={c('four', 'c1b')} text="≈ 4 characters" size={34} solid />
        <Tag at={c('quarters', 'c1b')} text="≈ ¾ of a word" size={34} solid />
      </Row>
      <Footnote at={c('four', 'c1b')} width={900} text="OpenAI Help Center, 'Understanding and counting tokens' · English text, rough estimate" />
    </Col>
  );
};

const ToNumbers: React.FC = () => {
  const { look, t, frame, fps } = useMotion();
  const num = c('number', 'c2a');
  return (
    <Col gap={24}>
      {t < c('So', 'c2a') + 0.1 && <PopIn at={c("can't", 'c2a')}><Row gap={14}><Eye size={70} color={look.problem} /><span style={{ fontFamily: FONT.display, fontWeight: 700, fontSize: 60, color: look.problem }}>can't read letters</span></Row></PopIn>}
      <Row gap={10} wrap>
        {PROMPT.map((p, i) => {
          const f = prog(t, num + i * 0.08, num + 0.3 + i * 0.08);
          const col = look.ramp[i % look.ramp.length];
          return (
            <div key={i} style={{ padding: '10px 16px', borderRadius: 16, border: `2.5px solid ${col}`, background: `${col}22`, fontFamily: FONT.mono, fontWeight: 700, fontSize: 44, color: look.ink, transform: `rotateX(${Math.sin(f * Math.PI) * 80}deg)` }}>
              {f > 0.5 ? IDS[i] : p.replace(/^ /, '·')}
            </div>
          );
        })}
      </Row>
      {t >= num && <Footnote at={num + 0.3} width={880} text="example IDs · real ones depend on the tokenizer" />}
      {t >= S('c2b') && (
        <PopIn at={c('list', 'c2b')}>
          <Row gap={18}>
            <div style={{ padding: '10px 16px', borderRadius: 16, border: `2.5px solid ${look.ramp[3]}`, fontFamily: FONT.mono, fontWeight: 700, fontSize: 40, color: look.ink }}>17307</div>
            <span style={{ fontFamily: FONT.display, fontWeight: 700, fontSize: 50, color: look.inkSoft }}>→</span>
            <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
              {Array.from({ length: 16 }, (_, i) => {
                const v = Math.sin(i * 1.7 + 0.4) * 0.5 + (rnd(i + 3) - 0.5) * 0.6;
                const k = prog(t, c('list', 'c2b') + i * 0.04, c('list', 'c2b') + 0.3 + i * 0.04);
                return <div key={i} style={{ width: 20, height: 90, display: 'flex', alignItems: v > 0 ? 'flex-end' : 'flex-start', justifyContent: 'center' }}><div style={{ width: 16, height: Math.abs(v) * 90 * k, borderRadius: 4, background: v > 0 ? look.accent2 : look.accent, alignSelf: v > 0 ? 'flex-start' : 'flex-end', transform: v > 0 ? 'translateY(45px) scaleY(-1)' : 'translateY(-45px)' }} /></div>;
              })}
              <span style={{ fontFamily: FONT.mono, fontSize: 30, color: look.inkSoft }}>…</span>
            </div>
          </Row>
        </PopIn>
      )}
      {t >= c('map', 'c2b') && <MeaningMap />}
    </Col>
  );
};
const MeaningMap: React.FC = () => {
  const { look, t, frame, fps } = useMotion();
  const at = c('map', 'c2b');
  const pts: [string, number, number, number][] = [['sky', 120, 60, 3], ['cloud', 210, 30, 2], ['rain', 170, 120, 1], ['blue', 560, 70, 4], ['red', 650, 40, 0], ['green', 610, 130, 5]];
  return (
    <div style={{ position: 'relative', width: 800, height: 190, borderRadius: 22, border: `2px dashed ${look.cardEdge}` }}>
      {pts.map(([w, x, y, i], k) => {
        const p = pop(frame, fps, at + k * 0.08, { damping: 12 });
        const col = look.ramp[i % look.ramp.length];
        return <div key={w} style={{ position: 'absolute', left: x + Math.sin(t * 1.4 + k) * 5, top: y + Math.cos(t * 1.2 + k) * 4, display: 'flex', alignItems: 'center', gap: 8, transform: `scale(${p})` }}><div style={{ width: 16, height: 16, borderRadius: 8, background: col, boxShadow: `0 0 14px ${col}` }} /><span style={{ fontFamily: FONT.mono, fontWeight: 700, fontSize: 28, color: look.ink }}>{w}</span></div>;
      })}
      <div style={{ position: 'absolute', right: 14, bottom: 10 }}><Mono size={16}>meaning map (simplified)</Mono></div>
    </div>
  );
};

/** no memory: the whole chat is packed up and re-sent every turn */
const ReSend: React.FC = () => {
  const { look, t, frame, fps } = useMotion();
  const zero = c('zero', 'c3b'), whole = c('whole', 'c3b'), every = c('every', 'c3b');
  const msgs: [string, boolean][] = [['Why is the sky blue?', true], ['The sky is blue because…', false], ['And sunsets?', true], ['At sunset, light travels…', false], ['Explain like I\'m 5', true]];
  const n = t < whole ? 1 : Math.min(msgs.length, 2 + Math.floor((t - whole) / 0.45));
  const trip = (t - whole) % 1.4;
  const fly = t >= whole ? prog(trip, 0.6, 1.2) : 0;
  return (
    <Col gap={20}>
      <Row gap={30}>
        <div style={{ width: 520, display: 'flex', flexDirection: 'column', gap: 8, padding: 18, borderRadius: 22, border: `2.5px solid ${look.accent2}`, background: 'rgba(15,19,38,0.96)', transform: `translateX(${fly * 40}px) scale(${1 - fly * 0.06})` }}>
          <Mono size={16} color={look.accent2}>the whole chat · sent again</Mono>
          {msgs.slice(0, n).map(([m, me], i) => <div key={i} style={{ alignSelf: me ? 'flex-end' : 'flex-start', padding: '8px 14px', borderRadius: 14, background: me ? look.accent : '#161B33', fontFamily: FONT.sans, fontWeight: 600, fontSize: 24, color: '#fff' }}>{m}</div>)}
        </div>
        <span style={{ fontFamily: FONT.display, fontWeight: 700, fontSize: 70, color: look.accent2, opacity: 0.4 + 0.6 * fly }}>→</span>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
          <Server size={110} color={look.accent} style={{ filter: `drop-shadow(0 0 ${10 + fly * 20}px ${look.accent})` }} />
          <Mono size={18} color={look.ink}>model</Mono>
          {t >= zero && <div style={{ padding: '4px 12px', borderRadius: 10, border: `2px solid ${look.problem}`, transform: `scale(${pop(frame, fps, zero, { damping: 10 })})` }}><Mono size={18} color={look.problem}>memory: 0</Mono></div>}
        </div>
      </Row>
      {t >= every && <Tag at={every} text="every single time" size={34} tone="problem" solid />}
    </Col>
  );
};

const ContextLimit: React.FC = () => {
  const { look, t } = useMotion();
  const lim = c('forty-eight', 'c3c'), past = c('Past', 'c3c'), blind = c("can't", 'c3c');
  const fill = prog(t, S('c3c') + 0.3, lim, (x) => x);
  const over = t >= past ? prog(t, past, past + 1.2) : 0;
  return (
    <Col gap={22}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 14 }}><Ticker keys={[{ t: 0, v: 0 }, { t: c('two', 'c3c'), v: 2048, dur: 0.9 }]} format={fmt.int} style={{ fontFamily: FONT.display, fontWeight: 700, fontSize: 130, color: look.accent2, lineHeight: 1 }} /><span style={{ fontFamily: FONT.sans, fontWeight: 700, fontSize: 36, color: look.ink }}>tokens it can see</span></div>
      <div style={{ position: 'relative', width: 900, height: 90 }}>
        <div style={{ position: 'absolute', right: 0, width: 760, height: 90, borderRadius: 18, border: `3px solid ${look.accent2}`, boxShadow: `0 0 26px ${look.accent2}66` }} />
        <div style={{ position: 'absolute', left: 0, top: 0, display: 'flex', gap: 4, height: 90, alignItems: 'center', transform: `translateX(${-over * 140}px)` }}>
          {Array.from({ length: 40 }, (_, i) => { const x = i * 26 - over * 140; const outside = x < 140; return <div key={i} style={{ width: 22, height: 54, borderRadius: 5, background: look.ramp[i % look.ramp.length], opacity: i / 40 < fill + over * 0.2 ? (outside ? 0.15 : 0.9) : 0 }} />; })}
        </div>
      </div>
      {t >= blind && <PopIn at={blind}><Row gap={12}><EyeOff size={54} color={look.problem} /><span style={{ fontFamily: FONT.display, fontWeight: 700, fontSize: 52, color: look.problem }}>out of sight</span></Row></PopIn>}
      <Footnote at={lim} width={900} text="GPT-3: context window of 2,048 tokens · Brown et al. (2020) · OpenAI API docs: each request is stateless" />
    </Col>
  );
};

/** attention arcs: every token looks at every other one; "it" → "cat" */
const AttentionArcs: React.FC<{ words: string[]; focus?: number; target?: number; at: number; strongAt?: number; w?: number }> = ({ words, focus, target, at, strongAt, w = 980 }) => {
  const { look, t } = useMotion();
  const n = words.length, gap = w / n, y = 150;
  const draw = prog(t, at, at + 1.0);
  const strong = strongAt !== undefined && t >= strongAt;
  const arcs: React.ReactNode[] = [];
  for (let a = 0; a < n; a++) for (let b = a + 1; b < n; b++) {
    const isF = focus !== undefined && (a === focus || b === focus);
    if (focus !== undefined && !isF) continue;
    const isT = isF && (a === target || b === target);
    const x1 = gap * (a + 0.5), x2 = gap * (b + 0.5), h = 30 + (b - a) * 22;
    const col = isT && strong ? look.good : look.ramp[(a + b) % look.ramp.length];
    const pulse = 0.25 + 0.2 * Math.sin(t * 3 + a + b);
    arcs.push(<path key={`${a}-${b}`} d={`M${x1} ${y} Q${(x1 + x2) / 2} ${y - h * 2} ${x2} ${y}`} fill="none" stroke={col} strokeWidth={isT && strong ? 8 : 3} strokeOpacity={(isT && strong ? 1 : strong ? 0.12 : pulse) * draw} />);
  }
  return (
    <div style={{ position: 'relative', width: w, height: 230 }}>
      <svg width={w} height={y + 10} style={{ position: 'absolute', left: 0, top: 0, overflow: 'visible' }}>{arcs}</svg>
      <div style={{ position: 'absolute', left: 0, top: y + 6, width: w, display: 'flex' }}>
        {words.map((wd, i) => <div key={i} style={{ width: gap, display: 'flex', justifyContent: 'center' }}><span style={{ padding: '6px 10px', borderRadius: 12, border: `2.5px solid ${i === focus ? GOLD : i === target && strong ? look.good : look.ramp[i % look.ramp.length]}`, background: i === focus ? `${GOLD}33` : 'transparent', fontFamily: FONT.mono, fontWeight: 700, fontSize: 30, color: look.ink, opacity: prog(t, at - 0.3 + i * 0.05, at + i * 0.05) }}>{wd}</span></div>)}
      </div>
    </div>
  );
};

const PaperCard: React.FC = () => {
  const { look, t, frame, fps } = useMotion();
  const at = c('paper', 'c4c'), T = c('T', 'c4c'), tr = c('Transformer', 'c4c');
  return (
    <Col gap={24}>
      <Panel at={at - 0.3} w={760} light>
        <div style={{ fontFamily: FONT.mono, fontSize: 20, color: '#5D626B' }}>arXiv · 2017 · 8 authors</div>
        <div style={{ fontFamily: 'Georgia, serif', fontWeight: 700, fontSize: 52, color: '#16181B', marginTop: 8 }}>Attention Is All You Need</div>
        <div style={{ fontFamily: 'Georgia, serif', fontSize: 24, color: '#5D626B', marginTop: 8 }}>"…the Transformer, based solely on attention mechanisms…"</div>
      </Panel>
      {t >= T - 0.2 && (
        <Row gap={10}>
          {['G', 'P', 'T'].map((l) => { const on = l === 'T'; const k = on ? pop(frame, fps, T, { damping: 9 }) : 1; return <div key={l} style={{ width: 120, height: 130, borderRadius: 22, border: `3px solid ${on ? GOLD : look.cardEdge}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: FONT.display, fontWeight: 700, fontSize: 96, color: on ? GOLD : look.inkSoft, transform: `scale(${on ? 0.8 + 0.3 * k : 1})`, boxShadow: on ? `0 0 30px ${GOLD}88` : 'none' }}>{l}</div>; })}
          {t >= tr && <PopIn at={tr}><span style={{ fontFamily: FONT.display, fontWeight: 700, fontSize: 72, color: GOLD, marginLeft: 14 }}>= Transformer</span></PopIn>}
        </Row>
      )}
    </Col>
  );
};

const Stack: React.FC<{ at: number; n?: number; sweep?: number[]; w?: number }> = ({ at, n = 8, sweep = [], w = 440 }) => {
  const glow = sweep.flatMap((s) => Array.from({ length: n }, (_, i) => ({ i: n - 1 - i, from: s + i * 0.07, to: s + i * 0.07 + 0.35 })));
  return <LayerStack n={n} at={at} w={w} gap={34} neon glowAt={glow} />;
};

const NextToken: React.FC = () => {
  const { look, t, frame, fps } = useMotion();
  const score = c('score', 'c6a'), blue = c('blue', 'c6b'), green = c('Green', 'c6b'), picks = c('picks', 'c6b'), adds = c('adds', 'c6b');
  const rows: [string, number, number][] = [['blue', 0.78, blue], ['clear', 0.12, score + 0.3], ['grey', 0.06, score + 0.45], ['green', 0.01, green]];
  return (
    <Col gap={20}>
      <div style={{ fontFamily: FONT.mono, fontWeight: 700, fontSize: 44, color: look.ink }}>The sky is <span style={{ color: t >= adds ? look.good : look.accent2 }}>{t >= adds ? 'blue' : '___'}</span></div>
      <div style={{ width: 820, display: 'flex', flexDirection: 'column', gap: 14 }}>
        {rows.map(([w, p, at]) => {
          const k = t >= Math.min(at, score + 0.2) ? prog(t, Math.min(at, score + 0.2), Math.min(at, score + 0.2) + 0.6) : 0;
          const picked = w === 'blue' && t >= picks;
          const col = w === 'blue' ? look.good : w === 'green' ? look.problem : look.accent;
          return (
            <div key={w} style={{ display: 'flex', alignItems: 'center', gap: 16, opacity: k > 0 ? 1 : 0.15 }}>
              <span style={{ width: 130, fontFamily: FONT.mono, fontWeight: 800, fontSize: 32, color: picked ? look.good : look.ink }}>{w}</span>
              <div style={{ flex: 1, height: 34, borderRadius: 10, background: 'rgba(255,255,255,0.06)' }}><div style={{ width: `${Math.max(1.5, p * 100) * k}%`, height: '100%', borderRadius: 10, background: col, boxShadow: picked ? `0 0 20px ${col}` : 'none' }} /></div>
              {picked && <Check size={38} color={look.good} style={{ transform: `scale(${pop(frame, fps, picks, { damping: 9 })})` }} />}
            </div>
          );
        })}
      </div>
      <Footnote at={score} width={820} text="scores are illustrative" />
      {t >= c('runs', 'c6b') && <PopIn at={c('runs', 'c6b')}><Row gap={12}><RefreshCw size={56} color={look.accent2} style={{ transform: `rotate(${(t - c('runs', 'c6b')) * 300}deg)` }} /><span style={{ fontFamily: FONT.display, fontWeight: 700, fontSize: 52, color: look.accent2 }}>run it all again</span></Row></PopIn>}
    </Col>
  );
};

const TokenRun: React.FC = () => {
  const { look, t } = useMotion();
  const beats = [c('Token', 'c6c'), c('Run', 'c6c'), c('Token', 'c6c', 2), c('Run', 'c6c', 2)];
  const words = ['The', ' sky', ' is', ' blue', ' because', ' sunlight', ' scatters'];
  const n = Math.min(words.length, 4 + (t >= beats[0] ? 1 : 0) + (t >= beats[2] ? 1 : 0) + (t >= c('trip', 'c6c') ? 1 : 0));
  return (
    <Col gap={18}>
      <Row gap={8} wrap>{words.slice(0, n).map((w, i) => <Chip key={i} text={w} i={i} at={i < 4 ? S('c6c') : [beats[0], beats[2], c('trip', 'c6c')][i - 4]} size={40} glow={i === n - 1} />)}</Row>
      <Stack at={S('c6c')} n={8} sweep={[beats[1], beats[3], c('full', 'c6c')]} w={420} />
      <Mono size={22} color={look.ink}>each token = one full pass</Mono>
    </Col>
  );
};

const Streaming: React.FC = () => {
  const { look, t } = useMotion();
  const ans = ['The', ' sky', ' is', ' blue', ' because', ' sunlight', ' scatters', ' off', ' air', '…'];
  const s0 = c('streams', 'c7b');
  const wait = c('Instead', 'c7b');
  const stream: [string, number][] = ans.map((w, i) => [w, s0 + i * 0.22]);
  const spin = '◐◓◑◒'[Math.floor(t * 6) % 4];
  return (
    <Col gap={22}>
      <Split at={wait} rightAt={s0 - 0.3} w={960} h={300}
        left={{ title: 'Without streaming', tone: 'problem', body: <div style={{ fontFamily: FONT.mono, fontSize: 30, color: look.inkSoft, lineHeight: 1.5 }}>{spin} waiting…<br />then all at once</div> }}
        right={{ title: 'Streaming', tone: 'good', body: <div style={{ fontFamily: FONT.sans, fontWeight: 600, fontSize: 32, color: look.ink, lineHeight: 1.35 }}>{stream.filter(([, a]) => t >= a).map(([w]) => w).join('')}<span style={{ color: look.accent2 }}>▍</span></div> }} />
      <Footnote at={s0} width={900} text="OpenAI API docs: streaming sends output as it's generated, over server-sent events" />
    </Col>
  );
};

/* ───────────── the Teyro section (live-site visuals) ───────────── */
const TeyroHeader: React.FC<{ at: number }> = ({ at }) => {
  const { frame, fps } = useMotion();
  const k = pop(frame, fps, at, { damping: 11 });
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 20, transform: `scale(${k})` }}>
      <div style={{ width: 120, height: 120, borderRadius: 34, overflow: 'hidden', boxShadow: '0 0 50px rgba(61,90,254,0.6)' }}><Img src={staticFile('tey-tile.png')} style={{ width: '100%', height: '100%' }} /></div>
      <div>
        <div style={{ fontFamily: FONT.display, fontWeight: 700, fontSize: 84, color: '#fff', lineHeight: 1 }}>Teyro</div>
        <div style={{ fontFamily: FONT.sans, fontWeight: 650, fontSize: 28, color: NE.inkSoft, marginTop: 6, whiteSpace: 'nowrap' }}>Put AI to work, then build with it.</div>
      </div>
    </div>
  );
};

const TrackCard: React.FC = () => {
  const { t } = useMotion();
  const items: [string, number][] = [['Use AI tools', c('Use', 'ty2')], ['Build AI agents', c('build', 'ty2')], ['Create automations', c('create', 'ty2')]];
  return (
    <Panel at={S('ty2')} w={880} light edge={BRAND.blue}>
      <span style={{ padding: '6px 14px', borderRadius: 10, background: '#EEF2FF', color: BRAND.blue, fontFamily: FONT.mono, fontWeight: 800, fontSize: 20 }}>AI TRACK</span>
      <div style={{ fontFamily: FONT.sans, fontWeight: 800, fontSize: 42, color: '#16181B', marginTop: 14 }}>Put AI to work, then build with it.</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 18 }}>
        {items.map(([s, at]) => { const on = t >= at; return <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '12px 16px', borderRadius: 14, background: on ? '#EEF2FF' : '#F8FAFC', border: `2px solid ${on ? BRAND.blue : '#E2E8F0'}`, transform: `scale(${on && t < at + 0.35 ? 1.04 : 1})` }}><div style={{ width: 30, height: 30, borderRadius: 15, background: on ? BRAND.blue : '#E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{on && <Check size={20} color="#fff" strokeWidth={3} />}</div><span style={{ fontFamily: FONT.sans, fontWeight: 700, fontSize: 32, color: '#16181B' }}>{s}</span></div>; })}
      </div>
    </Panel>
  );
};

const LessonCard: React.FC = () => {
  const { t, frame, fps } = useMotion();
  const st = c('four', 'ty3');
  const steps = ['Learn', 'Apply', 'Reflect', 'Deepen'];
  const pick = c('practise', 'ty3'), right = c('instant', 'ty3');
  const opts = ['word', 'token', 'page'];
  return (
    <Panel at={S('ty3')} w={900} light edge={BRAND.blue}>
      <div style={{ display: 'flex', gap: 10 }}>
        {steps.map((s, i) => { const at = st + i * 0.15; const on = t >= at; return <div key={s} style={{ flex: 1, padding: '10px 0', textAlign: 'center', borderRadius: 14, background: on ? BRAND.blue : '#EEF2FF', color: on ? '#fff' : BRAND.blue, fontFamily: FONT.sans, fontWeight: 800, fontSize: 25, transform: `scale(${on && t < at + 0.3 ? 1.08 : 1})` }}>{i + 1} {s}</div>; })}
      </div>
      <div style={{ marginTop: 18, display: 'flex', alignItems: 'center', gap: 10 }}><Mono size={18} color={BRAND.blue}>Apply</Mono><Mono size={16} color="#94A3B8">· a few minutes</Mono></div>
      <div style={{ fontFamily: FONT.sans, fontWeight: 700, fontSize: 30, color: '#16181B', marginTop: 4 }}>A model writes its answer one ___ at a time.</div>
      <div style={{ display: 'flex', gap: 12, marginTop: 14 }}>
        {opts.map((o) => { const sel = o === 'token' && t >= pick; return <div key={o} style={{ flex: 1, padding: '14px 0', textAlign: 'center', borderRadius: 14, border: `2.5px solid ${sel ? (t >= right ? '#1F9D55' : BRAND.blue) : '#E2E8F0'}`, background: sel ? (t >= right ? '#E9F7EF' : '#EEF2FF') : '#fff', fontFamily: FONT.mono, fontWeight: 800, fontSize: 30, color: '#16181B' }}>{o}</div>; })}
      </div>
      {t >= right && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 14, padding: '12px 16px', borderRadius: 14, background: '#E9F7EF', transform: `scale(${pop(frame, fps, right, { damping: 10 })})` }}>
          <Check size={30} color="#1F9D55" strokeWidth={3} /><span style={{ flex: 1, fontFamily: FONT.sans, fontWeight: 800, fontSize: 28, color: '#1F9D55' }}>Nice! That's right.</span><span style={{ fontFamily: FONT.display, fontWeight: 700, fontSize: 34, color: '#F5A524' }}>+10 XP</span>
        </div>
      )}
    </Panel>
  );
};

const StreakCard: React.FC = () => {
  const { look, t } = useMotion();
  const fr = c('freeze', 'ty4'), gr = c('grows', 'ty4');
  const flick = 1 + Math.sin(t * 9) * 0.04;
  return (
    <Panel at={S('ty4')} w={900}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <Flame size={104} color={FLAME} fill={`${FLAME}55`} style={{ transform: `scale(${flick})`, filter: `drop-shadow(0 0 16px ${FLAME})` }} />
        <div><Ticker keys={[{ t: 0, v: 14 }, { t: gr, v: 21, dur: 1.0 }]} format={fmt.int} style={{ fontFamily: FONT.display, fontWeight: 700, fontSize: 96, color: look.ink, lineHeight: 1 }} /><div style={{ fontFamily: FONT.mono, fontWeight: 800, fontSize: 20, letterSpacing: '0.14em', color: FLAME }}>DAY STREAK</div></div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(10, 1fr)', gap: 8, marginTop: 18 }}>
        {Array.from({ length: 20 }, (_, i) => {
          const frozen = i === 10; const on = frozen ? t >= fr : true;
          return <div key={i} style={{ height: 40, borderRadius: 10, background: frozen ? (on ? '#6FA8FF' : '#2A3160') : `${FLAME}${i > 16 && t < gr ? '33' : 'CC'}`, transform: `scale(${frozen && t >= fr && t < fr + 0.5 ? 1.25 : 1})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, color: '#fff' }}>{frozen && on ? '❄' : ''}</div>;
        })}
      </div>
      {t >= fr && <div style={{ marginTop: 12 }}><Tag at={fr} text="a freeze saved day 11" size={20} /></div>}
    </Panel>
  );
};

const LeagueQuestCard: React.FC = () => {
  const { look, t, frame, fps } = useMotion();
  const tiers: [string, string][] = [['Bronze', '#C98A55'], ['Silver', '#B8C0CC'], ['Gold', '#F2C76B'], ['Sapphire', '#6FA8FF'], ['Diamond', '#9BE7FF']];
  const up = prog(t, c('Bronze', 'ty4'), c('Diamond', 'ty4') + 0.3);
  const qa = c('quests', 'ty4'), chest = c('chests', 'ty4');
  const q: [string, number][] = [['Earn 50 XP', 50], ['Finish 3 lessons', 3], ['Get 20 answers right', 20]];
  const open = prog(t, chest + 0.2, chest + 0.6);
  return (
    <Panel at={c('Weekly', 'ty4') - 0.1} w={900}>
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
                <div style={{ height: 14, borderRadius: 7, background: '#2A3160', marginTop: 4 }}><div style={{ width: `${k * 100}%`, height: '100%', borderRadius: 7, background: GOLD }} /></div>
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
  const feed: [string, string, string, number][] = [['K', 'Kemi', 'finished Unit 4', c('Friends', 'ty5')], ['D', 'Daniel', 'on a 7-lesson day', c('race', 'ty5')], ['P', 'Priya', 'joined your league', c('race', 'ty5') + 0.3]];
  const comm = c('community', 'ty5'), cheer = c('cheers', 'ty5');
  return (
    <Panel at={S('ty5')} w={900}>
      <Row gap={10}><Users size={30} color={look.accent2} /><Mono size={20} color={look.ink}>Friends</Mono></Row>
      {feed.map(([i0, n, s, at], i) => { const k = pop(frame, fps, at, { damping: 12 }); return (
        <div key={n} style={{ display: 'flex', alignItems: 'center', gap: 14, marginTop: 10, opacity: Math.min(1, k * 1.4), transform: `translateX(${(1 - Math.min(1, k)) * -30}px)` }}>
          <div style={{ width: 46, height: 46, borderRadius: 23, background: ['#86C98A', '#6FA8FF', '#B79CFF'][i], display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: FONT.sans, fontWeight: 800, fontSize: 22, color: '#fff' }}>{i0}</div>
          <span style={{ fontFamily: FONT.sans, fontWeight: 800, fontSize: 27, color: look.ink }}>{n}</span><span style={{ fontFamily: FONT.sans, fontSize: 25, color: look.inkSoft }}>{s}</span>
          <span style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 4, fontFamily: FONT.mono, fontWeight: 800, fontSize: 22, color: FLAME }}><Flame size={22} color={FLAME} />{[64, 31, 22][i]}</span>
        </div>
      ); })}
      {t >= comm && (
        <div style={{ marginTop: 16, padding: '14px 16px', borderRadius: 16, background: '#161B33', transform: `scale(${pop(frame, fps, comm, { damping: 11 })})` }}>
          <Mono size={15}>JavaScript Foundations community</Mono>
          <div style={{ fontFamily: FONT.sans, fontWeight: 700, fontSize: 26, color: look.ink, marginTop: 6 }}>Built my first to-do app today!</div>
          {t >= cheer && <div style={{ fontFamily: FONT.sans, fontSize: 21, color: look.good, marginTop: 4 }}>Kemi cheered you on</div>}
        </div>
      )}
    </Panel>
  );
};

const BuildFlow: React.FC = () => {
  const { look, t } = useMotion();
  const b = c('build', 'ty6');
  const nodes: [React.ReactNode, string, number][] = [[<Zap size={44} color={GOLD} />, 'trigger', b], [<Bot size={44} color={look.accent2} />, 'AI agent', b + 0.2], [<Check size={44} color={look.good} />, 'done', b + 0.4]];
  return (
    <Col gap={26}>
      <Strike text="I USE AI" at={S('ty6')} strikeAt={c('build', 'ty6') - 0.2} replace="I BUILD WITH IT" replaceAt={b} size={90} />
      <Row gap={14}>
        {nodes.map(([ic, n, at], i) => t >= at ? <React.Fragment key={n}><PopIn at={at}><div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, padding: '16px 20px', borderRadius: 20, border: `2.5px solid ${look.cardEdge}`, background: 'rgba(15,19,38,0.96)' }}>{ic}<Mono size={18} color={look.ink}>{n}</Mono></div></PopIn>{i < 2 && <Workflow size={30} color={look.inkSoft} />}</React.Fragment> : null)}
      </Row>
    </Col>
  );
};

/* ───────────── cover (frame 0) ───────────── */
const COVER_TITLE = ['NOBODY IS', 'TALKING ABOUT THIS'];
const COVER_KICKER = 'WHEN YOU PRESS ENTER';

/* ───────────── scene ───────────── */
const CHAPTERS: [string, string, string][] = [['c1a', '01', 'Chopped'], ['c2a', '02', 'Numbers'], ['c3a', '03', 'No memory'], ['c4a', '04', 'Attention'], ['c5a', '05', 'Layers'], ['c6a', '06', 'One token'], ['c7a', '07', 'Streaming'], ['t1', '08', 'The weird part']];

const Scene: React.FC = () => {
  loadMotionFonts();
  const { look, t, frame, fps } = useMotion();
  const br = L('bridge');
  const end = vo.duration + 0.25;
  const brEnd = c('Okay', 'back') + 0.3;
  const P = (id: string, v: number) => ({ t: S(id), v, dur: 0.8 });

  return (
    <AbsoluteFill>
      <Backdrop cam={{ x: Math.sin(t * 0.4) * 30, y: t * 10, z: 1 }} />
      <Drift />

      {/* ── HUD: follow the prompt, YOU → MODEL → YOU ── */}
      <HudJourney from="YOU · ENTER" to="ANSWER" pulseTeyro={[br.start, S('ty1'), S('cta')]}
        progress={[{ t: 0, v: 0 }, P('c1a', 0.08), P('c2a', 0.18), P('c3a', 0.3), P('c4a', 0.44), P('c5a', 0.56), P('c6a', 0.72), P('c7a', 0.88), P('recap', 1)]}
        title={[{ t: 0, text: 'press enter' }, { t: S('c1a'), text: 'tokenizer' }, { t: S('c2a'), text: 'token ids' }, { t: S('c3a'), text: 'the trip' }, { t: S('c4a'), text: 'attention', color: GOLD }, { t: S('c5a'), text: 'layers' }, { t: S('c6a'), text: 'next token', color: look.good }, { t: S('c7a'), text: 'streaming' }, { t: S('t1'), text: 'the weird part', color: look.problem }, { t: S('recap'), text: 'recap' }, { t: S('ty1'), text: 'how I learn AI' }]} />
      <ChapterTag top={Z.hudTop + 140} chapters={[{ t: 0, text: 'nobody talks about this' }, ...CHAPTERS.map(([id, n, name]) => ({ t: S(id), text: `${n} · ${name}` })), { t: S('recap'), text: '09 · recap' }, { t: S('ty1'), text: 'teyro' }]} />

      {/* ── HOOK (frame 0 = cover) ── */}
      <TitleCard title={COVER_TITLE} kicker={COVER_KICKER} until={S('h2')} titleSize={104} top={400}><div style={{ marginTop: 10 }}><Chat w={760} still /></div></TitleCard>
      <Ov a={S('h2')} b={S('h3')} y={880}>
        <Col gap={20}>
          <Chat w={860} sentAt={c('Enter', 'h2')} unknownAt={c('idea', 'h2')} />
          {t >= c('end', 'h2') && <PopIn at={c('end', 'h2')}><span style={{ fontFamily: FONT.display, fontWeight: 700, fontSize: 60, color: look.problem }}>how does it end? no idea.</span></PopIn>}
        </Col>
      </Ov>
      <Ov a={S('h3')} b={S('h4')} x={SX} y={880}>
        <Col w={600} gap={22}>
          <Row gap={8} wrap>{['The', ' sky', ' is', ' blue'].map((w, i) => <Chip key={i} text={w} i={i} at={c('one', 'h3') + i * 0.35} size={46} glow={t >= c('one', 'h3') + i * 0.35 && t < c('one', 'h3') + (i + 1) * 0.35} />)}</Row>
          {t >= c('next', 'h3') && <PopIn at={c('next', 'h3')}><div style={{ padding: '10px 20px', borderRadius: 14, border: `3px dashed ${look.accent2}`, fontFamily: FONT.mono, fontWeight: 700, fontSize: 44, color: look.accent2 }}>next: ?</div></PopIn>}
          <BigText at={c('only', 'h3')} lines={['ONE PIECE', 'AT A TIME']} size={70} align="center" color={GOLD} />
        </Col>
      </Ov>
      <Ov a={S('h4')} b={S('c1a')} x={SX} y={900}>
        <Col w={600} gap={12}>
          {['tokens', 'numbers', 'the trip', 'attention', 'layers', 'one token', 'streaming'].map((x, i) => <Tag key={x} at={c('everything', 'h4') + i * 0.18} text={`${i + 1} · ${x}`} size={30} solid={i % 2 === 0} />)}
        </Col>
      </Ov>

      {/* ── chapter cards ── */}
      {CHAPTERS.map(([id, n, name]) => <ChapterCard key={id} at={S(id)} until={S(id) + 2.3} n={n} title={name} sub="STEP" size={96} y={392} color={id === 't1' ? look.problem : id === 'c4a' ? GOLD : look.ramp[(+n) % look.ramp.length]} />)}

      {/* ── 01 chopped ── */}
      <Ov a={S('c1a') + 0.1} b={S('c2a')} y={920}><Chopped /></Ov>
      {/* ── 02 numbers ── */}
      <Ov a={S('c2a') + 0.1} b={S('c3a')} y={920}><ToNumbers /></Ov>
      {/* ── 03 no memory ── */}
      <Ov a={S('c3a') + 0.1} b={S('c3b')} y={900}>
        <Col gap={22}>
          <PopIn at={c('surprises', 'c3a')}><Brain size={150} color={look.accent} style={{ filter: `drop-shadow(0 0 20px ${look.accent})` }} /></PopIn>
          {t >= c('remember', 'c3a') && <Strike text="REMEMBERS YOU" at={c('remember', 'c3a')} strikeAt={c('remember', 'c3a') + 0.25} size={90} />}
        </Col>
      </Ov>
      <Ov a={S('c3b')} b={S('c3c')} y={900}><ReSend /></Ov>
      <Ov a={S('c3c')} b={S('c4a')} y={900}><ContextLimit /></Ov>
      {/* ── 04 attention ── */}
      <Ov a={S('c4a') + 0.1} b={S('c4b')} y={920}>
        <Col gap={10}><AttentionArcs words={['Why', 'is', 'the', 'sky', 'blue', '?']} at={c('Every', 'c4a')} /><Mono size={22} color={look.ink}>every token ↔ every other token</Mono></Col>
      </Ov>
      <Ov a={S('c4b')} b={S('c4c')} y={920}>
        <Col gap={14}>
          <AttentionArcs words={['the', 'cat', 'sat', 'because', 'it', 'was', 'tired']} focus={4} target={1} at={S('c4b') + 0.2} strongAt={c('cat', 'c4b', 2)} />
          {t >= c('point', 'c4b') && <Annotation at={c('point', 'c4b')} text="what does 'it' mean?" dx={80} dy={-60} size={44} width={460} />}
          <BigText at={c('Attention', 'c4b')} lines={['ATTENTION']} size={110} align="center" color={GOLD} />
        </Col>
      </Ov>
      <Ov a={S('c4c')} b={S('c5a')} y={900}><PaperCard /></Ov>
      {/* ── 05 layers ── */}
      <Ov a={S('c5a') + 0.1} b={S('bridge')} y={930}>
        <Col gap={18}>
          <Row gap={40}>
            <Stack at={c('stacks', 'c5a') - 0.3} n={9} sweep={[c('stacks', 'c5a'), c('sharpens', 'c5c')]} w={400} />
            {t >= S('c5b') && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                <PopIn at={c('ninety-six', 'c5b')}><div><Ticker keys={[{ t: 0, v: 9 }, { t: c('ninety-six', 'c5b'), v: 96, dur: 0.6 }]} format={fmt.int} style={{ fontFamily: FONT.display, fontWeight: 700, fontSize: 130, color: GOLD, lineHeight: 1 }} /><Mono size={24} color={look.ink}>layers</Mono></div></PopIn>
                {t >= c('hundred', 'c5b') && <PopIn at={c('hundred', 'c5b')}><div><Ticker keys={[{ t: 0, v: 0 }, { t: c('hundred', 'c5b'), v: 175, dur: 1.0 }]} format={(v) => `${Math.round(v)}B`} style={{ fontFamily: FONT.display, fontWeight: 700, fontSize: 110, color: look.accent2, lineHeight: 1 }} /><Mono size={24} color={look.ink}>numbers (parameters)</Mono></div></PopIn>}
              </div>
            )}
          </Row>
          <Footnote at={c('ninety-six', 'c5b')} width={900} text="GPT-3 175B: 96 layers · Brown et al., 'Language Models are Few-Shot Learners' (2020)" />
          {t >= c('written', 'c5c') && <PopIn at={c('written', 'c5c')}><div style={{ padding: '12px 26px', borderRadius: 18, border: `3px solid ${look.problem}`, fontFamily: FONT.display, fontWeight: 700, fontSize: 52, color: look.problem }}>answer: 0 words</div></PopIn>}
        </Col>
      </Ov>

      {/* ── Teyro mid bridge ── */}
      <TeyroBridge at={br.start} until={brEnd} line="Put AI to work, then build with it." chips={['AI track', 'A few minutes a day', 'Use it straight away']}
        chipTimes={[c('AI', 'bridge'), c('minutes', 'back'), c('straight', 'back')]} beats={[c('Quick', 'bridge'), c('Teyro', 'bridge'), c('learn', 'back')]} />
      <Ov a={brEnd} b={S('c6a')} y={880}><BigText at={c('first', 'back')} lines={['THE FIRST', 'WORD']} size={120} align="center" color={look.good} /></Ov>

      {/* ── 06 one token ── */}
      <Ov a={S('c6a') + 0.1} b={S('c6c')} y={930}><NextToken /></Ov>
      <Ov a={S('c6c')} b={S('c7a')} y={920}><TokenRun /></Ov>
      {/* ── 07 streaming ── */}
      <Ov a={S('c7a') + 0.1} b={S('c7b')} y={900}>
        <Col gap={18}>
          <Chat w={820} sentAt={-1} answer={['The', ' sky', ' is', ' blue'].map((w, i) => [w, c('typing', 'c7a') + i * 0.25] as [string, number])} typing />
          {t >= c('sort', 'c7a') && <Tag at={c('sort', 'c7a')} text="it kind of is typing" size={34} solid />}
        </Col>
      </Ov>
      <Ov a={S('c7b')} b={S('t1')} y={900}><Streaming /></Ov>
      {/* ── 08 the weird part ── */}
      <Ov a={S('t1') + 0.1} b={S('t2')} y={900}>
        <Col gap={20}>
          <div style={{ position: 'relative' }}><PopIn at={c('database', 't1') - 0.4}><Database size={170} color={look.inkSoft} /></PopIn>{t >= c('database', 't1') && <div style={{ position: 'absolute', left: -20, right: -20, top: '48%', height: 14, borderRadius: 7, background: look.problem, transform: `rotate(-20deg) scaleX(${prog(t, c('database', 't1'), c('database', 't1') + 0.25)})` }} />}</div>
          <Mono size={28} color={look.ink}>no stored answers</Mono>
        </Col>
      </Ov>
      <Ov a={S('t2')} b={S('t3')} y={900}>
        <Col gap={14}>
          <Strike text="LOOKING IT UP" at={c('looking', 't2')} strikeAt={c('up', 't2')} replace="PREDICTING" replaceAt={c('predicting', 't2')} size={96} />
          {t >= c('next', 't2') && <PopIn at={c('next', 't2')}><span style={{ fontFamily: FONT.display, fontWeight: 700, fontSize: 56, color: look.accent2 }}>what comes next</span></PopIn>}
        </Col>
      </Ov>
      <Ov a={S('t3')} b={S('cav')} y={900}>
        <Col gap={22}>
          <div style={{ position: 'relative' }}>
            <Panel at={c('sure', 't3') - 0.3} w={760}>
              <Row gap={14}><Bot size={44} color={look.accent2} /><span style={{ fontFamily: FONT.sans, fontWeight: 700, fontSize: 30, color: look.ink }}>Definitely. Here's the answer.</span></Row>
            </Panel>
            {t >= c('wrong', 't3') && <div style={{ position: 'absolute', right: -30, top: -70, padding: '6px 20px', border: `6px solid ${look.problem}`, borderRadius: 14, color: look.problem, fontFamily: FONT.display, fontWeight: 700, fontSize: 60, transform: `rotate(-10deg) scale(${pop(frame, fps, c('wrong', 't3'), { damping: 9 })})`, background: 'rgba(6,7,13,0.85)' }}>WRONG</div>}
          </div>
          {t >= c('OpenAI', 't3') && <PopIn at={c('OpenAI', 't3')}><div style={{ width: 820, fontFamily: 'Georgia, serif', fontStyle: 'italic', fontSize: 40, color: look.ink, textAlign: 'center' }}>"…plausible-sounding but incorrect or nonsensical answers."</div></PopIn>}
          <Footnote at={c('OpenAI', 't3')} width={820} text="OpenAI, 'Introducing ChatGPT' (2022), Limitations" />
        </Col>
      </Ov>
      <Ov a={S('cav')} b={S('recap')} x={SX} y={930}>
        <Col w={600} gap={18}>
          <Mono size={22} color={look.ink}>newer models: hidden thinking</Mono>
          <Row gap={8} wrap>{Array.from({ length: 8 }, (_, i) => <span key={i} style={{ filter: t >= c('hidden', 'cav') ? 'blur(5px)' : 'none' }}><Chip text={['so', 'first', 'check', 'light', 'waves', 'scatter', 'blue', 'short'][i]} i={i} at={c('think', 'cav') + i * 0.08} size={30} dim /></span>)}</Row>
          {t >= c('hidden', 'cav') && <PopIn at={c('hidden', 'cav')}><Row gap={10}><EyeOff size={40} color={look.inkSoft} /><Mono size={22}>you never see these</Mono></Row></PopIn>}
          {t >= c('still', 'cav') && <BigText at={c('still', 'cav')} lines={['STILL TOKENS.']} size={64} align="center" color={GOLD} />}
          <Footnote at={c('hidden', 'cav')} width={580} text="OpenAI Help Center: reasoning tokens aren't shown as answer text" />
        </Col>
      </Ov>

      {/* ── recap (Remi on) ── */}
      <At x={SX} y={930}>
        {t >= S('recap') - 0.2 && t < S('ty1') && (
          <div style={{ opacity: 1 - prog(t, S('ty1') - 0.25, S('ty1')) }}>
            <Recap width={580} titleAt={S('recap')} items={[
              { text: 'Tokens', at: c('Tokens', 'recap') }, { text: 'Numbers', at: c('Numbers', 'recap') }, { text: 'Whole chat, sent again', at: c('whole', 'recap') },
              { text: 'Attention', at: c('Attention', 'recap') }, { text: 'Layers', at: c('Layers', 'recap') }, { text: 'One token at a time', at: c('One', 'recap') }, { text: 'Streamed back', at: c('Streamed', 'recap') },
            ]} />
          </div>
        )}
      </At>

      {/* ── the Teyro section ── */}
      {t >= S('ty1') - 0.1 && t < S('punch') && (
        <AbsoluteFill style={{ opacity: 1 - prog(t, S('punch') - 0.25, S('punch')) }}>
          <At x={540} y={500}><TeyroHeader at={S('ty1')} /></At>
          <Ov a={S('ty1') + 0.3} b={S('ty2')} y={980}>
            <Col gap={16}>
              {t < c('Teyro', 'ty1') ? <Strike text="ONE VIDEO" at={c('one', 'ty1')} strikeAt={c('video', 'ty1') + 0.1} size={90} /> : <BigText at={c('Teyro', 'ty1') - 0.1} lines={['A FEW MINUTES', 'A DAY']} size={86} align="center" color={look.good} />}
            </Col>
          </Ov>
          <Ov a={S('ty2')} b={S('ty3')} y={1010}><TrackCard /></Ov>
          <Ov a={S('ty3')} b={S('ty4')} y={1010}><LessonCard /></Ov>
          <Ov a={S('ty4')} b={c('Weekly', 'ty4') - 0.1} y={1000}><StreakCard /></Ov>
          <Ov a={c('Weekly', 'ty4') - 0.1} b={S('ty5')} y={1010}><LeagueQuestCard /></Ov>
          <Ov a={S('ty5')} b={S('ty6')} y={1010}><FriendsCard /></Ov>
          <Ov a={S('ty6')} b={S('punch')} y={1000}><BuildFlow /></Ov>
        </AbsoluteFill>
      )}

      {/* ── punchline ── */}
      {t >= S('punch') && t < S('cta') && (
        <AbsoluteFill style={{ opacity: 1 - prog(t, S('cta') - 0.2, S('cta')) }}>
          <At x={540} y={830} w={1040}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
              {([["IT'S NOT LOOKING UP", c('not', 'punch'), look.inkSoft, 76], ['AN ANSWER.', c('answer', 'punch'), look.inkSoft, 76], ["IT'S PREDICTING THE NEXT", c('predicting', 'punch'), look.ink, 70], ['TOKEN.', c('token', 'punch'), GOLD, 170]] as [string, number, string, number][]).map(([txt, at, col, sz]) => {
                const k = pop(frame, fps, at, { damping: 10 });
                return <div key={txt} style={{ fontFamily: FONT.display, fontWeight: 700, fontSize: sz, lineHeight: 1.04, letterSpacing: '-0.03em', color: col, transform: `scale(${k})`, opacity: Math.min(1, k * 1.5), whiteSpace: 'nowrap', textShadow: col === GOLD ? `0 0 40px ${GOLD}88` : 'none' }}>{txt}</div>;
              })}
            </div>
          </At>
        </AbsoluteFill>
      )}

      {/* ── outro + loop back to the cover ── */}
      <TeyroOutro at={S('cta')} until={end - 0.45} headline="Put AI to work, then build with it. Free to start." ask="Search Teyro · teyro.app" />
      <LoopBack from={end - 0.45} dur={0.4}>
        <AbsoluteFill style={{ background: NE.bg }}>
          <Backdrop />
          <div style={{ position: 'absolute', left: Z.gutter + 10, right: Z.gutter + 10, top: 400, textAlign: 'center' }}>
            {COVER_TITLE.map((l) => <div key={l} style={{ fontFamily: FONT.display, fontWeight: 700, fontSize: 104, lineHeight: 0.95, letterSpacing: '-0.035em', color: NE.ink }}>{l}</div>)}
            <div style={{ marginTop: 22, fontFamily: FONT.mono, fontWeight: 700, fontSize: 30, letterSpacing: '0.42em', color: NE.problem }}>{COVER_KICKER}</div>
          </div>
          <div style={{ position: 'absolute', left: 0, right: 0, top: 400 + 2 * 104 + 120, bottom: 1920 - Z.stageBottom - 40, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><div style={{ marginTop: 10 }}><Chat w={760} still /></div></div>
        </AbsoluteFill>
      </LoopBack>

      {/* ── host + captions ── */}
      <Host on={[[S('h3'), S('c1a') - 0.1], [S('cav'), S('ty1') - 0.1]]}
        poses={[{ t: 0, p: 'idle' }, { t: S('h3'), p: 'explain' }, { t: c('next', 'h3'), p: 'point' }, { t: S('h4'), p: 'pointUp' }, { t: c('Enter', 'h4'), p: 'point' },
          { t: S('cav'), p: 'think' }, { t: c('hidden', 'cav'), p: 'explain' }, { t: c('still', 'cav'), p: 'point' }, { t: S('recap'), p: 'point' }, { t: c('Streamed', 'recap'), p: 'wow' }]} />
      <Captions hideBetween={[[br.start, brEnd], [end - 0.45, end + 1]]} />
    </AbsoluteFill>
  );
};

/* ───────────── sound design ───────────── */
const SFX: SfxCue[] = [
  { t: 0.05, s: 'boom' }, { t: c('nobody', 'h1'), s: 'riser', v: 0.4 },
  { t: c('Enter', 'h2'), s: 'pop' }, { t: c('Enter', 'h2') + 0.05, s: 'whoosh', v: 0.5 }, { t: c('idea', 'h2'), s: 'glitch', v: 0.5 },
  ...ticks([0, 1, 2, 3].map((i) => c('one', 'h3') + i * 0.35), 'pop'), { t: c('only', 'h3'), s: 'boom', v: 0.5 },
  ...ticks(Array.from({ length: 7 }, (_, i) => c('everything', 'h4') + i * 0.18), 'tick'),
  ...CHAPTERS.flatMap(([id]) => revealCues(S(id)).map((x) => ({ ...x, v: 0.55 }))),
  { t: c('chopped', 'c1a'), s: 'shatter', v: 0.7 }, { t: c('Into', 'c1b'), s: 'swoosh' }, { t: c('four', 'c1b'), s: 'pop' }, { t: c('quarters', 'c1b'), s: 'pop' },
  { t: c("can't", 'c2a'), s: 'error', v: 0.4 }, ...ticks(PROMPT.map((_, i) => c('number', 'c2a') + i * 0.08), 'tick'), { t: c('list', 'c2b'), s: 'count' }, { t: c('map', 'c2b'), s: 'chime', v: 0.5 },
  { t: c('remember', 'c3a'), s: 'error', v: 0.5 }, { t: c('zero', 'c3b'), s: 'pop' }, { t: c('whole', 'c3b'), s: 'whoosh', v: 0.6 }, { t: c('every', 'c3b'), s: 'whoosh', v: 0.5 },
  { t: c('two', 'c3c'), s: 'count' }, { t: c('Past', 'c3c'), s: 'swoosh' }, { t: c("can't", 'c3c'), s: 'error', v: 0.4 },
  { t: c('Every', 'c4a'), s: 'riser', v: 0.5 }, { t: c('point', 'c4b'), s: 'pop' }, { t: c('cat', 'c4b', 2), s: 'success' }, { t: c('Attention', 'c4b'), s: 'boom', v: 0.6 },
  { t: c('paper', 'c4c'), s: 'pop' }, { t: c('T', 'c4c'), s: 'chime', v: 0.6 }, { t: c('Transformer', 'c4c'), s: 'boom', v: 0.6 },
  { t: c('stacks', 'c5a'), s: 'riser', v: 0.5 }, { t: c('ninety-six', 'c5b'), s: 'count' }, { t: c('hundred', 'c5b'), s: 'count' }, { t: c('sharpens', 'c5c'), s: 'whoosh', v: 0.5 }, { t: c('written', 'c5c'), s: 'error', v: 0.5 },
  { t: S('bridge'), s: 'chime' }, ...ticks([c('AI', 'bridge'), c('minutes', 'back'), c('straight', 'back')], 'pop'), { t: c('Okay', 'back'), s: 'whoosh', v: 0.6 }, { t: c('first', 'back'), s: 'boom', v: 0.5 },
  { t: c('score', 'c6a'), s: 'count' }, { t: c('blue', 'c6b'), s: 'pop' }, { t: c('Green', 'c6b'), s: 'tick' }, { t: c('picks', 'c6b'), s: 'success' }, { t: c('runs', 'c6b'), s: 'whoosh', v: 0.5 },
  ...ticks([c('Token', 'c6c'), c('Token', 'c6c', 2)], 'pop'), ...ticks([c('Run', 'c6c'), c('Run', 'c6c', 2)], 'swoosh'),
  ...ticks([0, 1, 2, 3].map((i) => c('typing', 'c7a') + i * 0.25), 'type'), { t: c('Instead', 'c7b'), s: 'pop' }, ...ticks(Array.from({ length: 10 }, (_, i) => c('streams', 'c7b') + i * 0.22), 'type'),
  { t: c('database', 't1'), s: 'error', v: 0.5 }, { t: c('up', 't2'), s: 'swoosh' }, { t: c('predicting', 't2'), s: 'boom', v: 0.6 },
  { t: c('sure', 't3'), s: 'pop' }, { t: c('wrong', 't3'), s: 'error', v: 0.6 }, { t: c('OpenAI', 't3'), s: 'pop' },
  ...ticks(Array.from({ length: 8 }, (_, i) => c('think', 'cav') + i * 0.08), 'tick'), { t: c('hidden', 'cav'), s: 'swoosh' }, { t: c('still', 'cav'), s: 'chime', v: 0.5 },
  ...revealCues(S('recap')).map((x) => ({ ...x, v: 0.5 })), ...ticks(['Tokens', 'Numbers', 'whole', 'Attention', 'Layers', 'One', 'Streamed'].map((w) => c(w, 'recap')), 'pop'),
  ...revealCues(S('ty1')), { t: c('video', 'ty1'), s: 'swoosh' }, { t: c('Teyro', 'ty1'), s: 'chime' },
  ...ticks([c('Use', 'ty2'), c('build', 'ty2'), c('create', 'ty2')], 'pop'),
  ...ticks([0, 1, 2, 3].map((i) => c('four', 'ty3') + i * 0.15), 'pop'), { t: c('practise', 'ty3'), s: 'tick' }, { t: c('instant', 'ty3'), s: 'success' },
  { t: c('grows', 'ty4'), s: 'count' }, { t: c('freeze', 'ty4'), s: 'chime', v: 0.6 }, { t: c('Bronze', 'ty4'), s: 'riser', v: 0.5 }, { t: c('Diamond', 'ty4'), s: 'success' },
  { t: c('quests', 'ty4'), s: 'count' }, { t: c('chests', 'ty4'), s: 'shatter', v: 0.6 }, { t: c('chests', 'ty4') + 0.4, s: 'chime', v: 0.6 },
  ...ticks([c('Friends', 'ty5'), c('race', 'ty5'), c('race', 'ty5') + 0.3], 'pop'), { t: c('community', 'ty5'), s: 'chime', v: 0.6 },
  { t: c('build', 'ty6') - 0.2, s: 'swoosh' }, ...ticks([0, 0.2, 0.4].map((d) => c('build', 'ty6') + d), 'pop'),
  { t: c('answer', 'punch'), s: 'boom', v: 0.5 }, { t: c('token', 'punch'), s: 'boom', v: 0.8 },
  { t: S('cta'), s: 'whoosh' }, { t: S('cta') + 0.6, s: 'pop' },
];

export const M9: React.FC = () => (
  <MotionProvider look="neon" vo={vo}>
    <Scene />
    <SoundLayer slug={SLUG} sfx={SFX} />
  </MotionProvider>
);
