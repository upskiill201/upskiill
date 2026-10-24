import React from 'react';
import { AbsoluteFill, Img, staticFile } from 'remotion';
import { Bike, Calendar, Car, Check, FileText, Flame, Gift, HelpCircle, Lock, Medal, ThumbsUp, Trophy, Truck, Users } from 'lucide-react';
import {
  At, Backdrop, BigText, Captions, ChapterCard, Footnote, Host, HudSeries, LoopBack, MotionProvider, Recap, SfxCue,
  SoundLayer, Split, Strike, Tag, TeyroBridge, TeyroOutro, TitleCard, Ticker, VO, cue, fmt, life, line,
  loadMotionFonts, pop, prog, revealCues, ticks, useMotion, Z, FONT, LOOKS, BRAND,
} from '../../kit';
import voJson from './vo.json';

const vo = voJson as VO;
const SLUG = 'm10-best-ai-model';
const BP = LOOKS.blueprint;
export const M10_DURATION = Math.ceil((vo.duration + 0.25) * 30);

/* ───────────── timing helpers ───────────── */
const L = (id: string) => line(vo, id);
const c = (w: string, after?: string | number, n = 1) => cue(vo, w, { n, after: typeof after === 'string' ? L(after).start : after });
const S = (id: string) => L(id).start;
const SX = 700;
const FLAME = '#F5A524';
const LAB_COL = { OpenAI: '#0EA5B7', Anthropic: '#D97757', Google: '#3D5AFE' } as const;

/* ───────────── shared bits ───────────── */
const Ov: React.FC<{ a: number; b: number; x?: number; y?: number; children: React.ReactNode }> = ({ a, b, x = 540, y = 900, children }) => {
  const { t, frame, fps } = useMotion();
  if (t < a || t >= b) return null;
  const k = life(t, frame, fps, a, b);
  return <At x={x} y={y}><div style={{ opacity: Math.min(1, k * 1.3), transform: `translateY(${(1 - Math.min(1, k)) * 24}px)` }}>{children}</div></At>;
};
const Col: React.FC<{ children: React.ReactNode; w?: number; gap?: number }> = ({ children, w = 1000, gap = 16 }) => <div style={{ width: w, display: 'flex', flexDirection: 'column', alignItems: 'center', gap }}>{children}</div>;
const Row: React.FC<{ children: React.ReactNode; gap?: number }> = ({ children, gap = 16 }) => <div style={{ display: 'flex', alignItems: 'center', gap, justifyContent: 'center' }}>{children}</div>;
const Panel: React.FC<{ at: number; w: number; children: React.ReactNode; edge?: string; pad?: number; dark?: boolean }> = ({ at, w, children, edge, pad = 26, dark }) => {
  const { look, t, frame, fps } = useMotion();
  const k = pop(frame, fps, at, { damping: 12 });
  if (k <= 0) return null;
  const ph = (t - at) % 1.6;
  const breath = t > at + 0.8 && ph < 0.35 ? Math.sin((ph / 0.35) * Math.PI) : 0;
  return (
    <div style={{ width: w, borderRadius: 28, background: dark ? '#1A1F2B' : '#FFFFFF', border: `2.5px solid ${edge ?? look.cardEdge}`, padding: pad, boxSizing: 'border-box', boxShadow: `0 18px 40px ${look.cardShadow}${breath ? `, 0 0 ${24 * breath}px ${edge ?? look.accent}66` : ''}`, transform: `scale(${k * (1 + breath * 0.012)})` }}>
      {children}
    </div>
  );
};
const Mono: React.FC<{ children: React.ReactNode; size?: number; color?: string }> = ({ children, size = 20, color }) => <span style={{ fontFamily: FONT.mono, fontWeight: 800, fontSize: size, letterSpacing: '0.1em', color: color ?? BP.inkSoft, textTransform: 'uppercase' }}>{children}</span>;
const PopIn: React.FC<{ at: number; children: React.ReactNode; damping?: number }> = ({ at, children, damping = 11 }) => {
  const { frame, fps } = useMotion();
  const k = pop(frame, fps, at, { damping });
  if (k <= 0) return null;
  return <div style={{ opacity: Math.min(1, k * 1.4), transform: `scale(${0.7 + 0.3 * k})` }}>{children}</div>;
};

/* ───────────── the hero object: the scoreboard (3 labs × 3 sizes) ───────────── */
type M = { n: string; at: () => number; price?: string; pAt?: () => number; chat?: [number, () => number]; code?: [number, () => number] };
const LABS: { lab: keyof typeof LAB_COL; models: M[] }[] = [
  { lab: 'OpenAI', models: [
    { n: 'GPT-6 Astra', at: () => c('Astra', 'c1b'), price: '$10 / $50', pAt: () => c('ten', 'c2b'), chat: [35, () => c('thirty-five', 'c4c')], code: [2, () => c('two', 'c5b')] },
    { n: 'GPT-6.1 Sol', at: () => c('Sol', 'c1b'), price: '$2 / $10', pAt: () => c('Sol', 'c2c') },
    { n: 'GPT-6 Luna', at: () => c('Luna', 'c1b'), price: '$0.10 / $0.50', pAt: () => c('cents', 'c2c') },
  ] },
  { lab: 'Anthropic', models: [
    { n: 'Claude Opus 5.5', at: () => c('Opus', 'c1b'), price: '$4 / $20', pAt: () => c('four', 'c2b'), chat: [2, () => c('Opus', 'c4c')], code: [1, () => c('one', 'c5b')] },
    { n: 'Claude Sonnet 5.5', at: () => c('Sonnet', 'c1b'), price: '$2 / $10', pAt: () => c('Sonnet', 'c2c'), code: [3, () => c('three', 'c5b')] },
    { n: 'Claude Haiku 5.5', at: () => c('Haiku', 'c1b'), price: 'from $0.10 / $0.50', pAt: () => c('cents', 'c2c') },
  ] },
  { lab: 'Google', models: [
    { n: 'Gemini 4 Argon', at: () => c('Argon', 'c1b'), price: '$2 / $10 launch', pAt: () => c('two', 'c2c'), chat: [1, () => c('Argon', 'c4a')], code: [9, () => c('nine', 'c5c')] },
    { n: 'Gemini 3.8 Flash', at: () => c('Flash', 'c1b') },
    { n: 'Flash-Lite', at: () => c('Flash-Lite', 'c1b') },
  ] },
];
const SIZES: [string, React.ReactNode, number][] = [['BIG', <Truck size={30} />, 0], ['MEDIUM', <Car size={30} />, 1], ['SMALL', <Bike size={30} />, 2]];

const Scoreboard: React.FC = () => {
  const { look, t, frame, fps } = useMotion();
  const chatFrom = S('c4a'), flip = c('flips', 'c5a');
  const mode: 'build' | 'chat' | 'code' = t < chatFrom ? 'build' : t < flip ? 'chat' : 'code';
  const flipK = prog(t, flip - 0.2, flip + 0.35);
  const vehicles = t >= c('truck', 'c1c') - 0.1;
  return (
    <div style={{ width: 990 }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 10 }}>
        <div style={{ width: 164 }}>{mode !== 'build' && <PopIn at={mode === 'chat' ? chatFrom : flip}><div style={{ padding: '6px 10px', borderRadius: 10, background: mode === 'chat' ? look.accent : look.accent2, color: '#fff', fontFamily: FONT.mono, fontWeight: 800, fontSize: 18, textAlign: 'center' }}>{mode === 'chat' ? 'ARENA · CHAT' : 'ARENA · CODE'}</div></PopIn>}</div>
        {SIZES.map(([s, ic, i]) => (
          <div key={s} style={{ width: 272, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 8, opacity: prog(t, c('three', 'c1a') + i * 0.1, c('three', 'c1a') + 0.3 + i * 0.1), color: look.inkSoft }}>
            {vehicles && <span style={{ color: look.ink, transform: `scale(${1 + (t >= c(['truck', 'car', 'scooter'][i], 'c1c') && t < c(['truck', 'car', 'scooter'][i], 'c1c') + 0.4 ? 0.3 : 0)})` }}>{ic}</span>}
            <Mono size={20} color={look.ink}>{s}</Mono>
          </div>
        ))}
      </div>
      {LABS.map(({ lab, models }) => (
        <div key={lab} style={{ display: 'flex', alignItems: 'center', marginTop: 12 }}>
          <div style={{ width: 164, display: 'flex', alignItems: 'center', gap: 8 }}><div style={{ width: 14, height: 14, borderRadius: 7, background: LAB_COL[lab] }} /><span style={{ fontFamily: FONT.display, fontWeight: 700, fontSize: 24, color: look.ink }}>{lab}</span></div>
          {models.map((m, i) => {
            const at = m.at();
            const k = pop(frame, fps, at, { damping: 12 });
            const rank = mode === 'chat' ? m.chat : mode === 'code' ? m.code : undefined;
            const rAt = rank ? rank[1]() : 0;
            const rk = rank && t >= rAt ? pop(frame, fps, rAt, { damping: 9 }) : 0;
            const ranked = mode === 'build' || !!rank;
            const win = rank && rank[0] === 1 && t >= rAt;
            const bad = rank && rank[0] > 10 && t >= rAt;
            const edge = win ? look.good : bad ? look.problem : LAB_COL[lab];
            const priceOn = m.pAt && t >= m.pAt();
            const pk = priceOn ? pop(frame, fps, m.pAt!(), { damping: 10 }) : 0;
            const pulseQ = m.n === 'GPT-6 Astra' && t >= c('bad', 'back') - 0.3 && t < flip;
            return (
              <div key={m.n} style={{ width: 260, height: 150, marginRight: 12, position: 'relative', borderRadius: 20, background: look.card, border: `3px solid ${edge}`, boxShadow: win ? `0 0 26px ${look.good}88` : bad ? `0 0 22px ${look.problem}66` : `0 8px 20px ${look.cardShadow}`, padding: '14px 16px', boxSizing: 'border-box', opacity: Math.min(1, k * 1.4) * (ranked ? 1 : 0.38), transform: `scale(${(0.8 + 0.2 * k) * (pulseQ ? 1 + Math.sin(t * 8) * 0.03 : 1)}) rotateY(${mode === 'code' ? Math.sin(flipK * Math.PI) * 90 : 0}deg)` }}>
                <div style={{ fontFamily: FONT.sans, fontWeight: 800, fontSize: 25, color: look.ink, lineHeight: 1.1, paddingRight: rank ? 56 : 0 }}>{m.n}</div>
                {priceOn && <div style={{ marginTop: 10, fontFamily: FONT.mono, fontWeight: 800, fontSize: m.price!.length > 14 ? 17 : 22, color: look.accent, transform: `scale(${pk})`, transformOrigin: 'left center' }}>{m.price}</div>}
                {rank && rk > 0 && (
                  <div style={{ position: 'absolute', right: -14, top: -16, minWidth: 64, height: 64, padding: '0 10px', boxSizing: 'border-box', borderRadius: 32, background: win ? look.good : bad ? look.problem : look.ink, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: FONT.display, fontWeight: 700, fontSize: 30, transform: `scale(${rk})`, boxShadow: '0 6px 16px rgba(0,0,0,0.25)' }}>#{rank[0]}</div>
                )}
                {m.n === 'Gemini 4 Argon' && mode === 'chat' && t >= c('preliminary', 'c4b') && <div style={{ position: 'absolute', left: 14, bottom: 12, display: 'flex', gap: 6 }}><Tag at={c('preliminary', 'c4b')} text="preliminary" size={15} tone="problem" />{t >= c("can't", 'c4b') && <PopIn at={c("can't", 'c4b')}><Lock size={22} color={look.problem} /></PopIn>}</div>}
                {pulseQ && <div style={{ position: 'absolute', right: 10, bottom: 8 }}><HelpCircle size={36} color={look.problem} /></div>}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

/* ───────────── chapter visuals ───────────── */
const HundredX: React.FC = () => {
  const { look, t } = useMotion();
  const h = c('hundred', 'h2');
  const card = (n: string, p: string, at: number, big: boolean) => (
    <PopIn at={at}><div style={{ width: 360, padding: '22px 20px', borderRadius: 24, background: '#fff', border: `3px solid ${LAB_COL.OpenAI}`, textAlign: 'center', boxShadow: `0 12px 28px ${look.cardShadow}` }}>
      <div style={{ fontFamily: FONT.sans, fontWeight: 800, fontSize: 34, color: look.ink }}>{n}</div>
      <div style={{ fontFamily: FONT.display, fontWeight: 700, fontSize: big ? 84 : 64, color: big ? look.problem : look.good, marginTop: 6 }}>{p}</div>
      <Mono size={16}>per 1M input tokens</Mono>
    </div></PopIn>
  );
  return (
    <Col gap={22}>
      <Row gap={30}>{card('GPT-6 Astra', '$10', c('top', 'h2'), true)}{card('GPT-6 Luna', '$0.10', c('smallest', 'h2'), false)}</Row>
      {t >= h && <Ticker keys={[{ t: 0, v: 1 }, { t: h, v: 100, dur: 0.9 }]} format={(v) => `${Math.round(v)}×`} style={{ fontFamily: FONT.display, fontWeight: 700, fontSize: 170, color: look.accent, lineHeight: 1, transformOrigin: 'center' }} />}
      <Footnote at={c('top', 'h2')} width={900} text="OpenAI API docs, Models · checked Oct 10, 2026" />
    </Col>
  );
};

const BlindTest: React.FC = () => {
  const { look, t, frame, fps } = useMotion();
  const ask = c('ask', 'c3b'), hidden = c('hidden', 'c3b'), vote = c('vote', 'c3b'), votes = c('Thousands', 'c3b');
  const box = (n: string, txt: string, win: boolean) => (
    <div style={{ width: 420, height: 230, borderRadius: 22, background: '#fff', border: `3px solid ${win && t >= vote ? look.good : look.cardEdge}`, padding: 20, boxSizing: 'border-box', position: 'relative', boxShadow: win && t >= vote ? `0 0 24px ${look.good}66` : `0 10px 24px ${look.cardShadow}` }}>
      <Mono size={20} color={look.ink}>{n}</Mono>
      <div style={{ marginTop: 10, fontFamily: FONT.sans, fontSize: 26, color: look.inkSoft, lineHeight: 1.35 }}>{txt}</div>
      {win && t >= vote && <div style={{ position: 'absolute', right: 16, bottom: 14, transform: `scale(${pop(frame, fps, vote, { damping: 9 })})` }}><ThumbsUp size={44} color={look.good} /></div>}
    </div>
  );
  return (
    <Col gap={20}>
      {t >= ask - 0.2 && <PopIn at={ask - 0.2}><div style={{ padding: '14px 24px', borderRadius: 18, background: look.ink, color: '#fff', fontFamily: FONT.sans, fontWeight: 700, fontSize: 32 }}>"Explain recursion to a 10-year-old"</div></PopIn>}
      {t >= hidden && <Row gap={20}><PopIn at={hidden}>{box('Model A · hidden', 'Imagine a set of nesting dolls…', true)}</PopIn><PopIn at={hidden + 0.15}>{box('Model B · hidden', 'Recursion is when a function…', false)}</PopIn></Row>}
      {t >= votes && (
        <PopIn at={votes}><Row gap={18}>
          <Ticker keys={[{ t: 0, v: 0 }, { t: votes, v: 4892, dur: 1.0 }]} format={fmt.int} style={{ fontFamily: FONT.display, fontWeight: 700, fontSize: 80, color: look.accent }} />
          <span style={{ fontFamily: FONT.sans, fontWeight: 700, fontSize: 30, color: look.ink }}>votes →</span>
          <span style={{ fontFamily: FONT.display, fontWeight: 700, fontSize: 80, color: look.good }}><Ticker keys={[{ t: 0, v: 1000 }, { t: c('score', 'c3b'), v: 1525, dur: 0.8 }]} format={fmt.int} /></span>
        </Row></PopIn>
      )}
      <Footnote at={votes} width={900} text="arena.ai · blind pairwise votes · e.g. Gemini 4 Argon: 4,892 votes, score 1525" />
    </Col>
  );
};

/** score with its ± error bar, on a shared axis */
const ErrorBars: React.FC<{ rows: { name: string; score: number; err: number; price: string; at: number; col: string }[]; min: number; max: number; overlapAt?: number }> = ({ rows, min, max, overlapAt }) => {
  const { look, t } = useMotion();
  const W = 620, x = (v: number) => ((v - min) / (max - min)) * W;
  return (
    <div style={{ width: 920, display: 'flex', flexDirection: 'column', gap: 22, transform: 'scale(1.12)', margin: '30px 0' }}>
      {rows.map((r) => {
        const k = prog(t, r.at, r.at + 0.7);
        return (
          <div key={r.name} style={{ display: 'flex', alignItems: 'center', gap: 16, opacity: k > 0 ? 1 : 0.15 }}>
            <div style={{ width: 280 }}><div style={{ fontFamily: FONT.sans, fontWeight: 800, fontSize: 28, color: look.ink }}>{r.name}</div><Mono size={17} color={look.accent}>{r.price}</Mono></div>
            <div style={{ position: 'relative', width: W, height: 60 }}>
              <div style={{ position: 'absolute', left: 0, right: 0, top: 29, height: 2, background: look.cardEdge }} />
              <div style={{ position: 'absolute', left: x(r.score - r.err), width: x(r.score + r.err) - x(r.score - r.err), top: 18, height: 24, borderRadius: 12, background: `${r.col}33`, border: `2px solid ${r.col}`, opacity: k }} />
              <div style={{ position: 'absolute', left: x(min + (r.score - min) * k) - 12, top: 18, width: 24, height: 24, borderRadius: 12, background: r.col }} />
              <div style={{ position: 'absolute', left: x(r.score) + 22, top: -6, fontFamily: FONT.mono, fontWeight: 800, fontSize: 22, color: r.col, opacity: k }}>{r.score}±{r.err}</div>
            </div>
          </div>
        );
      })}
      {overlapAt !== undefined && t >= overlapAt && <PopIn at={overlapAt}><div style={{ alignSelf: 'center', padding: '10px 22px', borderRadius: 16, background: `${look.good}22`, border: `2.5px solid ${look.good}`, fontFamily: FONT.display, fontWeight: 700, fontSize: 36, color: look.good }}>bars overlap = a statistical tie</div></PopIn>}
    </div>
  );
};

/* ───────────── the Teyro section ───────────── */
const TeyroHeader: React.FC<{ at: number }> = ({ at }) => {
  const { look, frame, fps } = useMotion();
  const k = pop(frame, fps, at, { damping: 11 });
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 20, transform: `scale(${k})` }}>
      <div style={{ width: 120, height: 120, borderRadius: 34, overflow: 'hidden', boxShadow: '0 12px 40px rgba(61,90,254,0.45)' }}><Img src={staticFile('tey-tile.png')} style={{ width: '100%', height: '100%' }} /></div>
      <div>
        <div style={{ fontFamily: FONT.display, fontWeight: 700, fontSize: 84, color: look.ink, lineHeight: 1 }}>Teyro</div>
        <div style={{ fontFamily: FONT.sans, fontWeight: 650, fontSize: 28, color: look.inkSoft, marginTop: 6, whiteSpace: 'nowrap' }}>Put AI to work, then build with it.</div>
      </div>
    </div>
  );
};

const TrackCard: React.FC = () => {
  const { t } = useMotion();
  const items: [string, number][] = [['Use AI tools', c('use', 'ty2')], ['Build AI agents', c('build', 'ty2')], ['Create automations', c('create', 'ty2')]];
  return (
    <Panel at={S('ty2')} w={880} edge={BRAND.blue}>
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
  const opts = ['Astra', 'Opus 5.5', 'Haiku 5.5'];
  return (
    <Panel at={S('ty3')} w={900} edge={BRAND.blue}>
      <div style={{ display: 'flex', gap: 10 }}>
        {steps.map((s, i) => { const at = st + i * 0.15; const on = t >= at; return <div key={s} style={{ flex: 1, padding: '10px 0', textAlign: 'center', borderRadius: 14, background: on ? BRAND.blue : '#EEF2FF', color: on ? '#fff' : BRAND.blue, fontFamily: FONT.sans, fontWeight: 800, fontSize: 25, transform: `scale(${on && t < at + 0.3 ? 1.08 : 1})` }}>{i + 1} {s}</div>; })}
      </div>
      <div style={{ marginTop: 18, display: 'flex', alignItems: 'center', gap: 10 }}><Mono size={18} color={BRAND.blue}>Apply</Mono><Mono size={16} color="#94A3B8">· a few minutes</Mono></div>
      <div style={{ fontFamily: FONT.sans, fontWeight: 700, fontSize: 30, color: '#16181B', marginTop: 4 }}>You need to sort 50,000 emails cheaply. Which model?</div>
      <div style={{ display: 'flex', gap: 12, marginTop: 14 }}>
        {opts.map((o) => { const sel = o === 'Haiku 5.5' && t >= pick; return <div key={o} style={{ flex: 1, padding: '14px 0', textAlign: 'center', borderRadius: 14, border: `2.5px solid ${sel ? (t >= right ? '#1F9D55' : BRAND.blue) : '#E2E8F0'}`, background: sel ? (t >= right ? '#E9F7EF' : '#EEF2FF') : '#fff', fontFamily: FONT.mono, fontWeight: 800, fontSize: 26, color: '#16181B' }}>{o}</div>; })}
      </div>
      {t >= right && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 14, padding: '12px 16px', borderRadius: 14, background: '#E9F7EF', transform: `scale(${pop(frame, fps, right, { damping: 10 })})` }}>
          <Check size={30} color="#1F9D55" strokeWidth={3} /><span style={{ flex: 1, fontFamily: FONT.sans, fontWeight: 800, fontSize: 28, color: '#1F9D55' }}>Nice! That's right.</span><span style={{ fontFamily: FONT.display, fontWeight: 700, fontSize: 34, color: '#F5A524' }}>+10 XP</span>
        </div>
      )}
    </Panel>
  );
};

const HabitCard: React.FC = () => {
  const { look, t, frame, fps } = useMotion();
  const fr = c('freeze', 'ty4'), gr = c('grows', 'ty4');
  const tiers: [string, string][] = [['Bronze', '#C98A55'], ['Silver', '#94A3B8'], ['Gold', '#E0A82E'], ['Sapphire', '#3D7BFF'], ['Diamond', '#36B5D8']];
  const up = prog(t, c('Bronze', 'ty4'), c('Diamond', 'ty4') + 0.3);
  const qa = c('quests', 'ty4'), chest = c('chests', 'ty4'), fr2 = c('friends', 'ty4');
  const flick = 1 + Math.sin(t * 9) * 0.04;
  return (
    <Panel at={S('ty4')} w={920}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
        <Flame size={84} color={FLAME} fill={`${FLAME}55`} style={{ transform: `scale(${flick})` }} />
        <div><Ticker keys={[{ t: 0, v: 14 }, { t: gr, v: 21, dur: 1.0 }]} format={fmt.int} style={{ fontFamily: FONT.display, fontWeight: 700, fontSize: 76, color: look.ink, lineHeight: 1 }} /><Mono size={17} color={FLAME}>day streak</Mono></div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 6, marginLeft: 'auto' }}>
          {Array.from({ length: 14 }, (_, i) => { const frozen = i === 8; const on = frozen ? t >= fr : true; return <div key={i} style={{ width: 34, height: 34, borderRadius: 9, background: frozen ? (on ? '#6FA8FF' : '#E2E8F0') : `${FLAME}${i > 11 && t < gr ? '33' : 'CC'}`, transform: `scale(${frozen && t >= fr && t < fr + 0.5 ? 1.3 : 1})`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 18 }}>{frozen && on ? '❄' : ''}</div>; })}
        </div>
      </div>
      {t >= c('Weekly', 'ty4') - 0.1 && (
        <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
          {tiers.map(([n, col], i) => { const on = up >= i / (tiers.length - 1) - 0.01; return <div key={n} style={{ flex: 1, padding: '6px 0', textAlign: 'center', borderRadius: 12, border: `2px solid ${col}`, background: on ? `${col}26` : 'transparent', display: 'flex', flexDirection: 'column', alignItems: 'center' }}><Medal size={24} color={col} /><span style={{ fontFamily: FONT.mono, fontWeight: 800, fontSize: 14, color: on ? col : '#94A3B8' }}>{n.toUpperCase()}</span></div>; })}
        </div>
      )}
      {t >= qa - 0.1 && (
        <div style={{ display: 'flex', gap: 14, marginTop: 16, alignItems: 'center' }}>
          <div style={{ flex: 1 }}>
            {[['Earn 50 XP', 50], ['Finish 3 lessons', 3]].map(([name, max], i) => { const k = prog(t, qa + i * 0.15, qa + 0.6 + i * 0.15); return <div key={name as string} style={{ marginTop: i ? 8 : 0 }}><div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: FONT.sans, fontWeight: 700, fontSize: 21, color: look.ink }}><span>{name}</span><span style={{ fontFamily: FONT.mono, color: FLAME }}>{Math.round((max as number) * k)} / {max}</span></div><div style={{ height: 12, borderRadius: 6, background: '#E2E8F0', marginTop: 4 }}><div style={{ width: `${k * 100}%`, height: '100%', borderRadius: 6, background: FLAME }} /></div></div>; })}
          </div>
          {t >= chest - 0.1 && <div style={{ transform: `scale(${pop(frame, fps, chest - 0.1, { damping: 9 })})` }}><Gift size={70} color={look.accent} /></div>}
          {t >= fr2 && <PopIn at={fr2}><Row gap={6}><Users size={34} color={look.accent2} />{['K', 'D', 'P'].map((x, i) => <div key={x} style={{ width: 38, height: 38, borderRadius: 19, background: ['#86C98A', '#6FA8FF', '#B79CFF'][i], color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: FONT.sans, fontWeight: 800, fontSize: 18 }}>{x}</div>)}</Row></PopIn>}
        </div>
      )}
    </Panel>
  );
};

/* ───────────── cover (frame 0) ───────────── */
const COVER_TITLE = ['GPT-6 vs OPUS 5.5', 'vs GEMINI 4 ARGON'];
const COVER_KICKER = 'THE EXACT DIFFERENCE';
const VsCards: React.FC<{ still?: boolean }> = ({ still }) => {
  const { look, t } = useMotion();
  const cards: [string, keyof typeof LAB_COL][] = [['GPT-6 Astra', 'OpenAI'], ['Claude Opus 5.5', 'Anthropic'], ['Gemini 4 Argon', 'Google']];
  return (
    <Row gap={14}>
      {cards.map(([n, lab], i) => (
        <React.Fragment key={n}>
          <div style={{ width: 270, height: 170, borderRadius: 22, background: '#fff', border: `3.5px solid ${LAB_COL[lab]}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 6, boxShadow: `0 14px 30px ${look.cardShadow}`, transform: `translateY(${still ? 0 : Math.sin(t * 2 + i) * 5}px)` }}>
            <Mono size={18} color={LAB_COL[lab]}>{lab}</Mono>
            <span style={{ fontFamily: FONT.display, fontWeight: 700, fontSize: 32, color: look.ink, textAlign: 'center', lineHeight: 1.05 }}>{n}</span>
          </div>
          {i < 2 && <span style={{ fontFamily: FONT.display, fontWeight: 700, fontSize: 40, color: look.problem }}>vs</span>}
        </React.Fragment>
      ))}
    </Row>
  );
};

/* ───────────── scene ───────────── */
const CHAPTERS: [string, string, string][] = [['c1a', '01', 'Three sizes'], ['c2a', '02', 'The price'], ['c3a', '03', 'The test'], ['c4a', '04', 'Best at chat'], ['c5a', '05', 'Best at code'], ['c6a', '06', 'Best value'], ['t1', '07', 'The trap']];

const Scene: React.FC = () => {
  loadMotionFonts();
  const { look, t, frame, fps } = useMotion();
  const br = L('bridge');
  const end = vo.duration + 0.25;
  const brEnd = c('Okay', 'back') + 0.3;

  return (
    <AbsoluteFill>
      <Backdrop cam={{ x: Math.sin(t * 0.4) * 24, y: t * 8, z: 1 }} />

      {/* ── HUD: series bar + chapter + models counter + chips ── */}
      <HudSeries series="AI models · Oct 2026" pulseTeyro={[br.start, S('ty1'), S('cta')]}
        chapters={[{ t: 0, text: 'the exact difference' }, ...CHAPTERS.map(([id, n, name]) => ({ t: S(id), text: `${n} · ${name}` })), { t: S('picks'), text: '08 · my picks' }, { t: S('ty1'), text: 'how I learn AI' }]}
        counter={{ unit: 'models', format: fmt.int, keys: [{ t: 0, v: 3 }, { t: c('Astra', 'c1b'), v: 9, dur: 7.5 }] }}
        chips={[{ label: 'Sizes', t: S('c1a') }, { label: 'Price', t: S('c2a') }, { label: 'Chat', t: S('c4a') }, { label: 'Code', t: S('c5a') }, { label: 'Value', t: S('c6a') }, { label: 'Picks', t: S('picks') }]} />

      {/* ── HOOK (frame 0 = cover) ── */}
      <TitleCard title={COVER_TITLE} kicker={COVER_KICKER} until={S('h2')} titleSize={96} top={430}><div style={{ marginTop: 10 }}><VsCards /></div></TitleCard>
      <Ov a={S('h2')} b={S('h3')} y={900}><HundredX /></Ov>
      <Ov a={S('h3')} b={S('c1a')} x={SX} y={900}>
        <Col w={600} gap={18}>
          <PopIn at={c('best', 'h3')}><span style={{ fontFamily: FONT.display, fontWeight: 700, fontSize: 84, color: look.ink }}>the best?</span></PopIn>
          {t >= c('price', 'h3') && <PopIn at={c('price', 'h3')}><Row gap={12}><FileText size={50} color={look.accent} /><span style={{ fontFamily: FONT.sans, fontWeight: 700, fontSize: 36, color: look.ink }}>3 official price lists</span></Row></PopIn>}
          {t >= c('leaderboards', 'h3') && <PopIn at={c('leaderboards', 'h3')}><Row gap={12}><Trophy size={50} color={look.good} /><span style={{ fontFamily: FONT.sans, fontWeight: 700, fontSize: 36, color: look.ink }}>2 public leaderboards</span></Row></PopIn>}
        </Col>
      </Ov>

      {/* ── chapter cards ── */}
      {CHAPTERS.map(([id, n, name]) => <ChapterCard key={id} at={S(id)} until={S(id) + 2.2} n={n} title={name} sub="CHAPTER" size={88} y={392} color={id === 't1' ? look.problem : id === 'c4a' ? look.accent : id === 'c5a' ? look.accent2 : look.good} />)}

      {/* ── 01–02, 04–05: the scoreboard world ── */}
      <Ov a={S('c1a') + 0.2} b={S('c3a')} y={940}>
        <Col gap={16}>
          <Scoreboard />
          {t >= S('c2a') && <Footnote at={S('c2b')} width={990} text="$ per 1M tokens, input / output · official pricing pages, Oct 10 2026 · Anthropic also sells Claude Fable 5.1 above Opus ($10 / $50)" />}
        </Col>
      </Ov>
      <Ov a={S('c3a') + 0.1} b={S('c4a')} y={920}><BlindTest /></Ov>
      <Ov a={S('c4a')} b={S('c6a')} y={940}>
        <Col gap={16}>
          <Scoreboard />
          <Footnote at={S('c4a') + 0.3} width={990} text={t < c('flips', 'c5a') ? 'arena.ai Text leaderboard, Oct 10 2026 · ranks of the top setting of each model' : 'arena.ai WebDev leaderboard, Oct 10 2026'} />
        </Col>
      </Ov>

      {/* ── Teyro mid bridge ── */}
      <TeyroBridge at={br.start} until={brEnd} line="Put AI to work, then build with it." chips={['AI track', 'A few minutes a day', 'Use AI tools']}
        chipTimes={[c('AI', 'back'), c('minutes', 'back'), c('track', 'back') + 0.2]} beats={[c('Quick', 'bridge'), c('Teyro', 'bridge')]} />

      {/* ── 06 best value ── */}
      <Ov a={S('c6a') + 0.1} b={S('c6b')} y={920}>
        <Col gap={22}>
          <ErrorBars min={1740} max={1810} overlapAt={c('margin', 'c6a')} rows={[
            { name: 'GPT-6 Astra', score: 1786, err: 11, price: '$10 / $50', at: c('Sonnet', 'c6a') - 0.3, col: LAB_COL.OpenAI },
            { name: 'Sonnet 5.5', score: 1774, err: 15, price: '$2 / $10', at: c('Sonnet', 'c6a'), col: LAB_COL.Anthropic },
          ]} />
          {t >= c('fifth', 'c6a') && <PopIn at={c('fifth', 'c6a')}><span style={{ fontFamily: FONT.display, fontWeight: 700, fontSize: 90, color: look.good }}>⅕ of the price</span></PopIn>}
          <Footnote at={c('Sonnet', 'c6a')} width={900} text="arena.ai WebDev, Oct 10 2026 · gpt-6-astra-max vs claude-sonnet-5.5-xhigh" />
        </Col>
      </Ov>
      <Ov a={S('c6b')} b={S('t1')} y={920}>
        <Col gap={22}>
          <ErrorBars min={1550} max={1620} overlapAt={c('exactly', 'c6b')} rows={[
            { name: 'Haiku 5.5', score: 1587, err: 20, price: 'from $0.10 / $0.50', at: c('Haiku', 'c6b'), col: LAB_COL.Anthropic },
            { name: 'GPT-6 Luna', score: 1581, err: 7, price: '$0.10 / $0.50', at: c('Luna', 'c6b'), col: LAB_COL.OpenAI },
          ]} />
          <Footnote at={c('Haiku', 'c6b')} width={900} text="arena.ai WebDev, Oct 10 2026 · claude-haiku-5.5-high vs gpt-6-luna-max" />
        </Col>
      </Ov>

      {/* ── 07 the trap ── */}
      <Ov a={S('t1') + 0.1} b={S('t2')} y={900}>
        <Split at={c('Astra', 't1') - 0.1} rightAt={c('Argon', 't1')} w={960} h={330}
          left={{ title: 'GPT-6 Astra', tone: 'normal', body: <Col w={400} gap={8}><Row gap={12}><Mono size={22} color={look.ink}>code</Mono><span style={{ fontFamily: FONT.display, fontWeight: 700, fontSize: 80, color: look.good }}>#2</span></Row>{t >= c('thirty-five', 't1') && <Row gap={12}><Mono size={22} color={look.ink}>chat</Mono><span style={{ fontFamily: FONT.display, fontWeight: 700, fontSize: 80, color: look.problem }}>#35</span></Row>}</Col> }}
          right={{ title: 'Gemini 4 Argon', tone: 'normal', body: <Col w={400} gap={8}><Row gap={12}><Mono size={22} color={look.ink}>chat</Mono><span style={{ fontFamily: FONT.display, fontWeight: 700, fontSize: 80, color: look.good }}>#1</span></Row>{t >= c('nine', 't1') && <Row gap={12}><Mono size={22} color={look.ink}>code</Mono><span style={{ fontFamily: FONT.display, fontWeight: 700, fontSize: 80, color: look.problem }}>#9</span></Row>}</Col> }} />
      </Ov>
      <Ov a={S('t2')} b={S('picks')} y={880}>
        <div style={{ whiteSpace: 'nowrap', textAlign: 'center' }}><Strike text="WHICH IS BEST?" at={c('best', 't2')} strikeAt={c('wrong', 't2')} replace="BEST AT WHAT?" replaceAt={c('best', 't2', 2)} size={92} /></div>
      </Ov>

      {/* ── 08 my picks + caveat (Remi on) ── */}
      <At x={SX} y={930}>
        {t >= S('picks') - 0.2 && t < S('cav') && (
          <div style={{ opacity: 1 - prog(t, S('cav') - 0.25, S('cav')) }}>
            <Recap width={600} title="MY PICKS · OCT 2026" titleAt={S('picks')} items={[
              { text: 'Coding → Opus 5.5', at: c('coding', 'picks') }, { text: 'Value → Sonnet 5.5', at: c('value', 'picks') },
              { text: 'Chat → Argon (when out)', at: c('chat', 'picks') }, { text: 'Budget → Haiku / Luna', at: c('budget', 'picks') },
            ]} />
          </div>
        )}
      </At>
      <Ov a={S('cav')} b={S('ty1')} x={SX} y={930}>
        <Col w={600} gap={18}>
          <PopIn at={c('week', 'cav') - 0.3}><Row gap={12}><Calendar size={56} color={look.problem} /><span style={{ fontFamily: FONT.display, fontWeight: 700, fontSize: 46, color: look.ink }}>ranks move weekly</span></Row></PopIn>
          {t >= c('test', 'cav') && <PopIn at={c('test', 'cav')}><div style={{ padding: '16px 22px', borderRadius: 18, background: '#fff', border: `2.5px solid ${look.cardEdge}`, fontFamily: FONT.sans, fontWeight: 700, fontSize: 34, color: look.ink }}>test 2 models on <span style={{ color: look.accent }}>your</span> task</div></PopIn>}
          {t >= c('winner', 'cav') && <PopIn at={c('winner', 'cav')}><Row gap={10}><Trophy size={52} color={look.good} /><span style={{ fontFamily: FONT.display, fontWeight: 700, fontSize: 46, color: look.good }}>keep the winner</span></Row></PopIn>}
        </Col>
      </Ov>

      {/* ── the Teyro section ── */}
      {t >= S('ty1') - 0.1 && t < S('punch') && (
        <AbsoluteFill style={{ opacity: 1 - prog(t, S('punch') - 0.25, S('punch')) }}>
          <At x={540} y={510}><TeyroHeader at={S('ty1')} /></At>
          <Ov a={S('ty1') + 0.3} b={S('ty2')} y={980}><BigText at={c('skill', 'ty1') - 0.2} lines={['PICKING THE RIGHT', 'MODEL IS A SKILL']} size={76} align="center" color={look.accent} /></Ov>
          <Ov a={S('ty2')} b={S('ty3')} y={1010}><TrackCard /></Ov>
          <Ov a={S('ty3')} b={S('ty4')} y={1010}><LessonCard /></Ov>
          <Ov a={S('ty4')} b={S('punch')} y={1010}><HabitCard /></Ov>
        </AbsoluteFill>
      )}

      {/* ── punchline ── */}
      {t >= S('punch') && t < S('cta') && (
        <AbsoluteFill style={{ opacity: 1 - prog(t, S('cta') - 0.2, S('cta')) }}>
          <At x={540} y={840} w={1040}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
              {([["THERE'S NO BEST MODEL.", c('no', 'punch'), look.inkSoft, 80], ["THERE'S THE BEST MODEL", c("There's", 'punch', 2), look.ink, 80], ['FOR THE', c('for', 'punch'), look.ink, 70], ['JOB.', c('job', 'punch'), look.accent, 190]] as [string, number, string, number][]).map(([txt, at, col, sz]) => {
                const k = pop(frame, fps, at, { damping: 10 });
                return <div key={txt} style={{ fontFamily: FONT.display, fontWeight: 700, fontSize: sz, lineHeight: 1.02, letterSpacing: '-0.03em', color: col, transform: `scale(${k})`, opacity: Math.min(1, k * 1.5), whiteSpace: 'nowrap' }}>{txt}</div>;
              })}
            </div>
          </At>
        </AbsoluteFill>
      )}

      {/* ── outro + loop back to the cover ── */}
      <TeyroOutro at={S('cta')} until={end - 0.45} headline="Put AI to work, then build with it. Free to start." ask="Search Teyro · teyro.app" />
      <LoopBack from={end - 0.45} dur={0.4}>
        <AbsoluteFill style={{ background: BP.bg }}>
          <Backdrop />
          <div style={{ position: 'absolute', left: Z.gutter + 10, right: Z.gutter + 10, top: 430, textAlign: 'center' }}>
            {COVER_TITLE.map((l) => <div key={l} style={{ fontFamily: FONT.display, fontWeight: 700, fontSize: 96, lineHeight: 0.95, letterSpacing: '-0.035em', color: BP.ink }}>{l}</div>)}
            <div style={{ marginTop: 22, fontFamily: FONT.mono, fontWeight: 700, fontSize: 30, letterSpacing: '0.42em', color: BP.problem }}>{COVER_KICKER}</div>
          </div>
          <div style={{ position: 'absolute', left: 0, right: 0, top: 430 + 2 * 96 + 120, bottom: 1920 - Z.stageBottom - 40, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><div style={{ marginTop: 10 }}><VsCards still /></div></div>
        </AbsoluteFill>
      </LoopBack>

      {/* ── host + captions ── */}
      <Host on={[[S('h3'), S('c1a') - 0.1], [S('picks'), S('ty1') - 0.1]]}
        poses={[{ t: 0, p: 'idle' }, { t: S('h3'), p: 'think' }, { t: c('checked', 'h3'), p: 'explain' }, { t: c('found', 'h4'), p: 'point' },
          { t: S('picks'), p: 'explain' }, { t: c('coding', 'picks'), p: 'point' }, { t: c('budget', 'picks'), p: 'wow' }, { t: S('cav'), p: 'explain' }, { t: c('winner', 'cav'), p: 'point' }]} />
      <Captions hideBetween={[[br.start, brEnd], [end - 0.45, end + 1]]} />
    </AbsoluteFill>
  );
};

/* ───────────── sound design ───────────── */
const SFX: SfxCue[] = [
  { t: 0.05, s: 'boom' }, ...ticks([c('GPT-6', 'h1'), c('Opus', 'h1'), c('Argon', 'h1')], 'pop'),
  { t: c('top', 'h2'), s: 'pop' }, { t: c('smallest', 'h2'), s: 'pop' }, { t: c('hundred', 'h2'), s: 'count' }, { t: c('hundred', 'h2') + 0.9, s: 'boom', v: 0.6 },
  { t: c('best', 'h3'), s: 'tick' }, { t: c('price', 'h3'), s: 'pop' }, { t: c('leaderboards', 'h3'), s: 'pop' },
  ...CHAPTERS.flatMap(([id]) => revealCues(S(id)).map((x) => ({ ...x, v: 0.55 }))),
  ...ticks(['Astra', 'Sol', 'Luna', 'Opus', 'Sonnet', 'Haiku', 'Argon', 'Flash', 'Flash-Lite'].map((w) => c(w, 'c1b')), 'pop'),
  ...ticks(['truck', 'car', 'scooter'].map((w) => c(w, 'c1c')), 'tick'), { t: c('harder', 'c1c'), s: 'swoosh' },
  { t: c('ten', 'c2b'), s: 'count' }, { t: c('four', 'c2b'), s: 'count' }, { t: c('two', 'c2c'), s: 'count' }, { t: c('cents', 'c2c'), s: 'count' },
  { t: c('ask', 'c3b') - 0.2, s: 'pop' }, { t: c('hidden', 'c3b'), s: 'whoosh', v: 0.5 }, { t: c('vote', 'c3b'), s: 'success' }, { t: c('Thousands', 'c3b'), s: 'count' },
  { t: c('Argon', 'c4a'), s: 'success' }, { t: c('preliminary', 'c4b'), s: 'error', v: 0.4 }, { t: c("can't", 'c4b'), s: 'tick' },
  { t: c('Opus', 'c4c'), s: 'pop' }, { t: c('thirty-five', 'c4c'), s: 'error', v: 0.6 },
  { t: S('bridge'), s: 'chime' }, ...ticks([c('AI', 'back'), c('minutes', 'back')], 'pop'), { t: c('Okay', 'back'), s: 'whoosh', v: 0.6 }, { t: c('bad', 'back'), s: 'tick' },
  { t: c('flips', 'c5a') - 0.2, s: 'swoosh' }, { t: c('one', 'c5b'), s: 'success' }, { t: c('two', 'c5b'), s: 'pop' }, { t: c('three', 'c5b'), s: 'pop' }, { t: c('nine', 'c5c'), s: 'error', v: 0.4 },
  { t: c('Sonnet', 'c6a'), s: 'pop' }, { t: c('margin', 'c6a'), s: 'chime', v: 0.5 }, { t: c('fifth', 'c6a'), s: 'boom', v: 0.6 },
  { t: c('Haiku', 'c6b'), s: 'pop' }, { t: c('Luna', 'c6b'), s: 'pop' }, { t: c('exactly', 'c6b'), s: 'success', v: 0.6 },
  { t: c('thirty-five', 't1'), s: 'error', v: 0.5 }, { t: c('Argon', 't1'), s: 'swoosh' }, { t: c('nine', 't1'), s: 'error', v: 0.5 },
  { t: c('wrong', 't2'), s: 'swoosh' }, { t: c('best', 't2', 2), s: 'boom', v: 0.6 },
  ...revealCues(S('picks')).map((x) => ({ ...x, v: 0.5 })), ...ticks(['coding', 'value', 'chat', 'budget'].map((w) => c(w, 'picks')), 'pop'),
  { t: c('week', 'cav'), s: 'tick' }, { t: c('test', 'cav'), s: 'pop' }, { t: c('winner', 'cav'), s: 'success', v: 0.6 },
  ...revealCues(S('ty1')), { t: c('Teyro', 'ty1'), s: 'chime' },
  ...ticks([c('use', 'ty2'), c('build', 'ty2'), c('create', 'ty2')], 'pop'),
  ...ticks([0, 1, 2, 3].map((i) => c('four', 'ty3') + i * 0.15), 'pop'), { t: c('practise', 'ty3'), s: 'tick' }, { t: c('instant', 'ty3'), s: 'success' },
  { t: c('grows', 'ty4'), s: 'count' }, { t: c('freeze', 'ty4'), s: 'chime', v: 0.6 }, { t: c('Bronze', 'ty4'), s: 'riser', v: 0.5 }, { t: c('Diamond', 'ty4'), s: 'success' },
  { t: c('quests', 'ty4'), s: 'count' }, { t: c('chests', 'ty4'), s: 'shatter', v: 0.6 }, { t: c('friends', 'ty4'), s: 'pop' },
  { t: c('model', 'punch'), s: 'boom', v: 0.5 }, { t: c('job', 'punch'), s: 'boom', v: 0.8 },
  { t: S('cta'), s: 'whoosh' }, { t: S('cta') + 0.6, s: 'pop' },
];

export const M10: React.FC = () => (
  <MotionProvider look="blueprint" vo={vo}>
    <Scene />
    <SoundLayer slug={SLUG} sfx={SFX} />
  </MotionProvider>
);
