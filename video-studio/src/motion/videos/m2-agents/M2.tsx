import React from 'react';
import { AbsoluteFill, Easing } from 'remotion';
import { Brain, CalendarDays, CalendarPlus, CreditCard, FileText, Globe, Lock, MessageSquare, NotebookPen, RefreshCw, Search, Unlock, User, Wrench } from 'lucide-react';
import {
  At, Backdrop, Badge, BigText, Captions, Card, ChapterCard, Checklist, Fill, Footnote, Host, HudSeries, LimitBars, LoopBack, MotionProvider,
  Recap, SfxCue, SoundLayer, Split, Tag, TeyroBridge, TeyroOutro, TitleCard, Ticker, TypeLine, VO, Wire, World, camAt, cue, life, line,
  loadMotionFonts, pop, prog, revealCues, ticks, useMotion, Z, FONT, LOOKS,
} from '../../kit';
import voJson from './vo.json';

const vo = voJson as VO;
const SLUG = 'm2-agents';
const B = LOOKS.blueprint;
export const M2_DURATION = Math.ceil((vo.duration + 0.25) * 30);

/* ───────────── timing helpers ───────────── */
const L = (id: string) => line(vo, id);
const c = (w: string, after?: string | number, n = 1) => cue(vo, w, { n, after: typeof after === 'string' ? L(after).start : after });
const S = (id: string) => L(id).start;
const OY = 1235;                     // overlay row under the world (host off)
const SX = 700;                      // overlay centre on the side stage (host on), kept clear of the IG column
const SIDE = (z: number, cx = 0) => cx - (Z.sideCx - 540) / z;   // camera x that puts world point cx on the side stage

const WORLD_AT = c('build', 'o3');
const HUB_AT = S('c5e');
const STOP_AT = c('stop', 't4');
const GOING = c('going', 't3');
const RED_FROM = c('loop', 't1');

/* ───────────── the world: Kemi → model → tools, loop ring, memory, hub, stop ───────────── */
type ToolDef = { id: string; name: string; Icon: typeof Search; y: number; at: number; danger?: boolean };
const TOOLS: ToolDef[] = [
  { id: 'search', name: 'search_flights', Icon: Search, y: -120, at: c('search', 'c2a') },
  { id: 'read', name: 'read_calendar', Icon: CalendarDays, y: -40, at: c('read', 'c2a') },
  { id: 'add', name: 'add_event', Icon: CalendarPlus, y: 40, at: c('add', 'c2a') },
  { id: 'pay', name: 'pay', Icon: CreditCard, y: 120, at: c('Paying', 'c6a'), danger: true },
];
const RACK_X = 335, RACK_L = 220;
const CALLS: Record<string, [number, number][]> = {
  search: [[c('runs', 'c2d'), c('result', 'c2d') + 0.3], [c('search', 'c3a'), c('enough', 'c3a') + 0.3], [c('Search', 'c3b'), c('again', 'c3b') + 0.5], [c('Repeat', 'c3c'), c('Repeat', 'c3c') + 0.7], [GOING - 0.6, STOP_AT]],
  read: [[c('Check', 'c3b'), c('calendar', 'c3b') + 0.6], [c('Act', 'c3c'), c('Act', 'c3c') + 0.6], [c('three', 'c4d'), c('three', 'c4d') + 0.6], [GOING - 0.3, STOP_AT]],
  add: [[c('Observe', 'c3c'), c('Observe', 'c3c') + 0.6], [c('tools', 'c4d'), c('tools', 'c4d') + 0.6], [GOING, STOP_AT]],
  pay: [[c('yes', 'c6b') + 0.15, c('yes', 'c6b') + 1.2]],
};
const BACK: [number, number][] = [[c('result', 'c2d') - 0.3, c('result', 'c2d') + 0.6], [c('sold', 'c3a') - 0.4, c('sold', 'c3a') + 0.3], [c('reads', 'c3b') - 0.2, c('reads', 'c3b') + 0.5]];
const THINKING: [number, number][] = [[c('writes', 'c2c') - 0.4, c('writes', 'c2c') + 0.4], [c('picks', 'c3b') - 0.2, c('picks', 'c3b') + 0.6], [c('Think', 'c3c'), c('Think', 'c3c') + 0.6], [GOING, STOP_AT]];
const inAny = (t: number, w: [number, number][]) => w.some(([a, b]) => t >= a && t < b);

const ModelNode: React.FC = () => {
  const { look, t, frame, fps } = useMotion();
  const k = pop(frame, fps, WORLD_AT, { damping: 13 });
  const glow = inAny(t, THINKING) ? 0.55 + 0.45 * Math.sin(t * 12) : 0;
  return (
    <At x={0} y={0}>
      <div style={{ width: 250, height: 170, borderRadius: 28, background: '#fff', border: `3px solid ${look.accent}`, boxShadow: `0 14px 34px ${look.cardShadow}, 0 0 ${glow * 40}px ${look.accent}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8, transform: `scale(${k * (1 + glow * 0.03)})` }}>
        <Brain size={72} color={look.accent} strokeWidth={2} />
        <span style={{ fontFamily: FONT.mono, fontWeight: 800, fontSize: 24, letterSpacing: '0.16em', color: look.ink }}>MODEL</span>
      </div>
    </At>
  );
};

const Jar: React.FC = () => {
  const { look, t, frame, fps } = useMotion();
  const a = c('jar', 'c1b'), b = c('hands', 'c2a');
  const k = life(t, frame, fps, a, b);
  if (k <= 0) return null;
  return (
    <At x={0} y={-8}>
      <svg width={340} height={290} viewBox="0 0 340 290" style={{ opacity: Math.min(1, k * 1.4), transform: `scale(${0.9 + 0.1 * k})` }}>
        <rect x={20} y={40} width={300} height={238} rx={46} fill={`${look.accent2}10`} stroke={look.accent2} strokeWidth={5} />
        <rect x={50} y={14} width={240} height={34} rx={10} fill={look.inkSoft} />
        <path d="M60 80 Q 70 66 92 62" stroke="#fff" strokeWidth={8} strokeLinecap="round" fill="none" opacity={0.9} />
      </svg>
    </At>
  );
};

const ToolCard: React.FC<{ tool: ToolDef }> = ({ tool }) => {
  const { look, t, frame, fps } = useMotion();
  const k = pop(frame, fps, tool.at, { damping: 12 });
  if (k <= 0) return null;
  const active = inAny(t, CALLS[tool.id] ?? []);
  const red = tool.danger && t < c('yes', 'c6b');
  const trap = t >= GOING && t < STOP_AT;
  const edge = trap ? look.problem : active ? look.accent2 : red ? look.problem : look.cardEdge;
  const pulse = (tool.id !== 'pay' && t >= c('three', 'c4d') && t < c('hundred', 'c4d')) ? Math.max(0, Math.sin((t - c('three', 'c4d')) * 9)) : 0;
  return (
    <At x={RACK_X} y={tool.y}>
      <div style={{ width: 230, height: 64, borderRadius: 16, background: active ? '#EEF1FF' : '#fff', border: `${active || red ? 3 : 2}px solid ${edge}`, boxShadow: `0 8px 20px ${look.cardShadow}${active ? `, 0 0 22px ${look.accent2}66` : ''}`, display: 'flex', alignItems: 'center', gap: 10, padding: '0 14px', boxSizing: 'border-box', transform: `scale(${k * (1 + pulse * 0.06)})` }}>
        <tool.Icon size={28} color={red ? look.problem : look.accent2} strokeWidth={2.2} />
        <span style={{ fontFamily: FONT.mono, fontWeight: 700, fontSize: 21, color: look.ink }}>{tool.name}</span>
      </div>
    </At>
  );
};

const ToolWires: React.FC = () => {
  const { look, t } = useMotion();
  const trap = t >= GOING && t < STOP_AT;
  return (
    <>
      {TOOLS.map((tl) => (
        <React.Fragment key={tl.id}>
          <Wire pts={[[118, -6], [RACK_L, tl.y - 6]]} at={tl.at} drawDur={0.35} width={3.5} tone={trap ? 'problem' : 'normal'} dashed={tl.danger && t < c('yes', 'c6b')}
            flow={(CALLS[tl.id] ?? []).map(([a, b]) => ({ from: a, to: b, rate: trap ? 5 : 3, color: trap ? look.problem : look.accent2 }))} />
          {tl.id === 'search' && <Wire pts={[[RACK_L, tl.y + 8], [118, 8]]} at={tl.at} drawDur={0.35} width={2.5} flow={BACK.map(([a, b]) => ({ from: a, to: b, rate: 3, color: look.good }))} />}
        </React.Fragment>
      ))}
    </>
  );
};

const KemiBubble: React.FC = () => {
  const { look, t, frame, fps } = useMotion();
  const at = c('Kemi', 'c2c');
  const k = pop(frame, fps, at, { damping: 13 });
  if (k <= 0) return null;
  const lost = t >= c('pushed', 'c4b') && t < c('notes', 'c4c');
  return (
    <>
      <Wire pts={[[0, -222], [0, -90]]} at={at + 0.1} drawDur={0.3} width={3.5} flow={[{ from: c('asks', 'c2c'), to: c('asks', 'c2c') + 1.0, rate: 3, color: look.accent }]} />
      <At x={110} y={-262}>
        <div style={{ width: 440, padding: '14px 20px', borderRadius: 22, background: '#fff', border: `2px solid ${lost ? look.problem : look.cardEdge}`, boxShadow: `0 10px 26px ${look.cardShadow}`, display: 'flex', alignItems: 'center', gap: 14, transform: `scale(${k})`, opacity: lost ? 0.45 + 0.2 * Math.sin(t * 14) : 1 }}>
          <div style={{ width: 46, height: 46, borderRadius: 23, background: look.accent, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><User size={26} color="#fff" /></div>
          <div style={{ fontFamily: FONT.sans, fontWeight: 650, fontSize: 23, lineHeight: 1.2, color: look.ink }}>Cheapest flight to Nairobi on Friday, then add it to my calendar.</div>
        </div>
      </At>
    </>
  );
};

/** the loop ring around the model: think → act → observe, spins on every lap, goes red with no exit, stops on STOP */
const LoopRing: React.FC = () => {
  const { look, t, frame, fps } = useMotion();
  const at = c('loop', 'c3a');
  if (t < at) return null;
  const k = pop(frame, fps, at, { damping: 12 });
  const ang = 22 * (Math.min(t, STOP_AT) - at) + (t > GOING ? 380 * (Math.min(t, STOP_AT) - GOING) : 0);
  const red = t >= RED_FROM && t < STOP_AT;
  const col = t >= STOP_AT ? look.good : red ? look.problem : look.accent;
  const R = 178;
  const labels: [string, number, number, number][] = [['THINK', 0, -R, c('Think', 'c3c')], ['ACT', R * 0.866, R * 0.5, c('Act', 'c3c')], ['OBSERVE', -R * 0.866, R * 0.5, c('Observe', 'c3c')]];
  const lap = t >= GOING && t < STOP_AT ? Math.floor((ang % 360) / 120) : -1;
  return (
    <>
      <At x={0} y={0}>
        <svg width={420} height={420} viewBox="-210 -210 420 420" style={{ overflow: 'visible', opacity: Math.min(1, k * 1.3), transform: `scale(${0.8 + 0.2 * k})` }}>
          <g transform={`rotate(${ang})`}>
            <circle r={R} fill="none" stroke={col} strokeWidth={6} strokeDasharray="70 24" strokeLinecap="round" />
            {[0, 120, 240].map((a) => (
              <g key={a} transform={`rotate(${a}) translate(0 ${-R})`}><path d="M-4 -16 L14 0 L-4 16" fill="none" stroke={col} strokeWidth={7} strokeLinecap="round" strokeLinejoin="round" /></g>
            ))}
          </g>
        </svg>
      </At>
      {labels.map(([txt, x, y, when], i) => {
        const lk = pop(frame, fps, when, { damping: 11 });
        if (lk <= 0) return null;
        const hot = (t >= when && t < when + 0.6) || lap === i;
        return (
          <At key={txt} x={x} y={y} z={3}>
            <div style={{ padding: '6px 12px', borderRadius: 10, background: hot ? col : '#fff', border: `2px solid ${col}`, fontFamily: FONT.mono, fontWeight: 800, fontSize: 19, letterSpacing: '0.1em', color: hot ? '#fff' : col, transform: `scale(${lk * (hot ? 1.1 : 1)})`, whiteSpace: 'nowrap' }}>{txt}</div>
          </At>
        );
      })}
    </>
  );
};

/** context window: text blocks pile up, overflow, get pushed out, then collapse into a summary */
const BLOCKS: { label: string; at: number; out?: number; tone?: 'accent' }[] = [
  { label: "KEMI'S ASK", at: c('every', 'c3d'), out: c('pushed', 'c4b'), tone: 'accent' },
  { label: 'flights ×3', at: c('loop', 'c3d'), out: c('pushed', 'c4b') + 0.12 },
  { label: 'sold out', at: c('adds', 'c3d') },
  { label: 'compare', at: c('more', 'c3d') },
  { label: 'calendar', at: c('text', 'c3d') },
  { label: 'flights ×2', at: c('soon', 'c3d') },
  { label: 'prices', at: c('model', 'c3d') },
  { label: 'search again', at: c('Fill', 'c4b') },
  { label: 'old results', at: c('results', 'c4b') },
];
const MEM_X = -340, BOX_H = 330, BH = 40, BG = 6;
const Memory: React.FC = () => {
  const { look, t, frame, fps } = useMotion();
  const at = BLOCKS[0].at - 0.15;
  const k = pop(frame, fps, at, { damping: 14 });
  if (k <= 0) return null;
  const sumAt = c('summarise', 'c4c');
  const sk = prog(t, sumAt, sumAt + 0.5);
  const full = BLOCKS.filter((b) => t >= b.at && (b.out === undefined || t < b.out)).length >= 7;
  const forget = t >= c('forget', 'c3d') && t < c('Memory', 'c4a');
  const named = t >= c('context', 'c4a');
  let idx = 0;
  return (
    <>
      <At x={MEM_X} y={0}>
        <div style={{ position: 'relative', width: 200, height: BOX_H, borderRadius: 20, border: `3px dashed ${full && t < sumAt ? look.problem : look.inkFaint}`, background: '#ffffffaa', transform: `scale(${k})` }}>
          {t >= c('once', 'c4a') && t < sumAt && (
            <div style={{ position: 'absolute', left: -14, right: -14, top: BOX_H - 2, height: 5, background: look.problem, transform: `scaleX(${prog(t, c('once', 'c4a'), c('once', 'c4a') + 0.4)})` }} />
          )}
          {BLOCKS.map((b) => {
            if (t < b.at) return null;
            const out = b.out !== undefined ? prog(t, b.out, b.out + 0.5) : 0;
            if (out >= 1) return null;
            const i = idx++;
            const bk = pop(frame, fps, b.at, { damping: 12 });
            const y = 10 + i * (BH + BG);
            const over = y + BH > BOX_H;
            const flick = b.tone === 'accent' && forget ? 0.35 + 0.35 * Math.sin(t * 22) : 1;
            const col = b.tone === 'accent' ? look.accent : over ? look.problem : look.accent2;
            return (
              <div key={b.label} style={{ position: 'absolute', left: 14, top: y * (1 - sk) + 10 * sk, width: 172, height: BH * (1 - sk) + BH * sk, borderRadius: 10, background: `${col}${b.tone ? '30' : '1A'}`, border: `2px solid ${out > 0 ? look.problem : col}`, display: 'flex', alignItems: 'center', padding: '0 10px', boxSizing: 'border-box', fontFamily: FONT.mono, fontWeight: 700, fontSize: 16, color: look.ink, opacity: bk * flick * (1 - out) * (1 - sk), transform: `translateX(${-out * 170}px) scale(${bk})` }}>
                {b.label}
              </div>
            );
          })}
          {sk > 0 && (
            <div style={{ position: 'absolute', left: 14, top: 10, width: 172, height: BH, borderRadius: 10, background: look.accent, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: FONT.mono, fontWeight: 800, fontSize: 18, color: '#fff', transform: `scale(${pop(frame, fps, sumAt + 0.3)})` }}>SUMMARY</div>
          )}
        </div>
      </At>
      <At x={MEM_X} y={-BOX_H / 2 - 34}>
        <div style={{ fontFamily: FONT.mono, fontWeight: 800, fontSize: 19, letterSpacing: '0.1em', color: named ? look.accent : look.inkSoft, whiteSpace: 'nowrap', transform: `scale(${named ? 1 + 0.15 * (1 - prog(t, c('context', 'c4a'), c('context', 'c4a') + 0.4)) : 1})` }}>{named ? 'CONTEXT WINDOW' : 'WHAT IT CAN SEE'}</div>
      </At>
      <Wire pts={[[MEM_X + 100, 40], [-125, 40]]} at={at} drawDur={0.3} width={3} dashed />
      <Notes />
    </>
  );
};

const Notes: React.FC = () => {
  const { look, t, frame, fps } = useMotion();
  const at = c('notes', 'c4c');
  const k = pop(frame, fps, at, { damping: 12 });
  if (k <= 0) return null;
  return (
    <>
      <Wire pts={[[MEM_X + 110, 250], [-60, 95]]} at={c('read', 'c4c')} drawDur={0.35} width={3} flow={[{ from: c('read', 'c4c'), to: c('needed', 'c4c') + 1.2, rate: 3, color: look.warm }]} />
      <At x={MEM_X} y={262}>
        <div style={{ width: 230, borderRadius: 14, background: '#FFF6D6', border: `2px solid ${look.warm}`, padding: '10px 14px', boxShadow: `0 10px 22px ${look.cardShadow}`, transform: `rotate(-2deg) scale(${k})` }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: FONT.mono, fontWeight: 800, fontSize: 17, color: look.ink }}><NotebookPen size={20} color={look.warm} />NOTES</div>
          <div style={{ fontFamily: FONT.hand, fontSize: 27, lineHeight: 1.05, color: look.ink, marginTop: 4 }}>goal: cheapest flight, Fri<br />then: add to calendar</div>
        </div>
      </At>
    </>
  );
};

const Hub: React.FC = () => {
  const { look, frame, fps } = useMotion();
  const k = pop(frame, fps, HUB_AT, { damping: 11 });
  if (k <= 0) return null;
  return (
    <At x={170} y={0} z={2}>
      <div style={{ width: 52, height: 330, borderRadius: 26, background: look.accent, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 0 26px ${look.accent}66`, transform: `scaleY(${k})` }}>
        <span style={{ fontFamily: FONT.mono, fontWeight: 800, fontSize: 24, letterSpacing: '0.2em', color: '#fff', writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>MCP</span>
      </div>
    </At>
  );
};

const Guard: React.FC = () => {
  const { look, t, frame, fps } = useMotion();
  const at = c('human', 'c6b');
  const k = pop(frame, fps, at, { damping: 10 });
  if (k <= 0) return null;
  const open = t >= c('yes', 'c6b');
  const col = open ? look.good : look.warm;
  return (
    <At x={RACK_L - 22} y={102} z={3}>
      <div style={{ width: 54, height: 54, borderRadius: 27, background: col, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 0 18px ${col}`, transform: `scale(${k})` }}>
        {open ? <Unlock size={28} color="#fff" /> : <Lock size={28} color="#fff" />}
      </div>
    </At>
  );
};

const StopSign: React.FC = () => {
  const { look, frame, fps } = useMotion();
  const k = pop(frame, fps, STOP_AT, { damping: 9, stiffness: 300 });
  if (k <= 0) return null;
  const pts = Array.from({ length: 8 }, (_, i) => { const a = Math.PI / 8 + (i * Math.PI) / 4; return `${50 + 48 * Math.cos(a)},${50 + 48 * Math.sin(a)}`; }).join(' ');
  return (
    <At x={0} y={262}>
      <svg width={110} height={110} viewBox="0 0 100 100" style={{ transform: `scale(${k}) rotate(${(1 - k) * -20}deg)` }}>
        <polygon points={pts} fill={look.problem} stroke="#fff" strokeWidth={4} />
        <text x={50} y={59} textAnchor="middle" fontFamily="Space Grotesk" fontWeight={700} fontSize={26} fill="#fff">STOP</text>
      </svg>
    </At>
  );
};

const WorldTags: React.FC = () => {
  const { t } = useMotion();
  return (
    <>
      <At x={-205} y={0}><Tag at={c('text', 'c1a', 1)} until={c('check', 'c1b')} text="Text in →" size={20} /></At>
      <At x={205} y={0}><Tag at={c('text', 'c1a', 2)} until={c('check', 'c1b')} text="→ Text out" size={20} /></At>
      <At x={0} y={150}>{t < c('hands', 'c2a') && <Badge at={c('hands', 'c1b')} text="NO HANDS" />}</At>
      <At x={RACK_X} y={-170}><Tag at={c('harmless', 'c6a')} until={S('t1')} text="safe" tone="good" size={18} /></At>
      <At x={RACK_X} y={176}><Tag at={c("isn't", 'c6a')} until={c('human', 'c6b')} text="risky" tone="problem" size={18} /></At>
      <At x={RACK_X} y={176}><Badge at={c('pauses', 'c6b')} until={c('yes', 'c6b')} text="PAUSED" tone="accent" /></At>
      <At x={0} y={128}><Tag at={c('model', 't1')} until={S('recap')} text="model ✓" tone="good" size={18} /></At>
    </>
  );
};

/* ───────────── cover miniature (frame 0) = the finished world, small ───────────── */
const Mini: React.FC = () => {
  const { t } = useMotion();
  const a = t * 40;
  const P = B.accent, P2 = B.accent2;
  return (
    <svg width={920} height={560} viewBox="-460 -300 920 560">
      <rect x={-200} y={-290} width={400} height={56} rx={18} fill="#fff" stroke={B.cardEdge} strokeWidth={2} />
      <circle cx={-172} cy={-262} r={16} fill={P} />
      <rect x={-146} y={-270} width={300} height={14} rx={7} fill={B.inkFaint} />
      <line x1={0} y1={-234} x2={0} y2={-80} stroke="#9AA3AD" strokeWidth={3} />
      <g transform={`rotate(${a})`}><circle r={165} fill="none" stroke={P} strokeWidth={6} strokeDasharray="64 22" /></g>
      <rect x={-110} y={-75} width={220} height={150} rx={26} fill="#fff" stroke={P} strokeWidth={4} />
      <text x={0} y={12} textAnchor="middle" fontFamily="JetBrains Mono" fontWeight={800} fontSize={26} fill={B.ink} letterSpacing="4">MODEL</text>
      <rect x={160} y={-150} width={44} height={300} rx={22} fill={P} />
      {[-120, -40, 40, 120].map((y, i) => (
        <g key={y}><line x1={110} y1={0} x2={240} y2={y} stroke="#9AA3AD" strokeWidth={3} /><rect x={240} y={y - 26} width={200} height={52} rx={14} fill="#fff" stroke={i === 3 ? B.problem : P2} strokeWidth={3} /><rect x={260} y={y - 6} width={130} height={12} rx={6} fill={i === 3 ? B.problem : P2} opacity={0.5} /></g>
      ))}
      <rect x={-440} y={-150} width={170} height={290} rx={18} fill="none" stroke={B.inkFaint} strokeWidth={3} strokeDasharray="10 8" />
      {[0, 1, 2, 3, 4].map((i) => <rect key={i} x={-428} y={-138 + i * 46} width={146} height={36} rx={9} fill={`${P2}22`} stroke={P2} strokeWidth={2} />)}
      <polygon points={Array.from({ length: 8 }, (_, i) => { const r = Math.PI / 8 + (i * Math.PI) / 4; return `${44 * Math.cos(r)},${215 + 44 * Math.sin(r)}`; }).join(' ')} fill={B.problem} />
      <text x={0} y={224} textAnchor="middle" fontFamily="Space Grotesk" fontWeight={700} fontSize={24} fill="#fff">STOP</text>
    </svg>
  );
};
const Cover: React.FC = () => (
  <AbsoluteFill style={{ background: B.bg }}>
    <Backdrop />
    <div style={{ position: 'absolute', left: 0, right: 0, top: 360, textAlign: 'center' }}>
      <div style={{ fontFamily: FONT.display, fontWeight: 700, fontSize: 150, lineHeight: 0.95, letterSpacing: '-0.035em', color: B.ink }}>AI AGENTS</div>
      <div style={{ marginTop: 22, fontFamily: FONT.mono, fontWeight: 700, fontSize: 30, letterSpacing: '0.42em', color: B.problem }}>EXPLAINED</div>
    </div>
    <div style={{ position: 'absolute', left: 0, right: 0, top: 360 + 150 + 120 + 30, display: 'flex', justifyContent: 'center' }}><Mini /></div>
  </AbsoluteFill>
);

/* ───────────── overlays ───────────── */
/** overlay block shown in [a, b) at screen (x, y) */
const Ov: React.FC<{ a: number; b: number; x?: number; y?: number; children: React.ReactNode }> = ({ a, b, x = 540, y = OY, children }) => {
  const { t, frame, fps } = useMotion();
  if (t < a || t >= b) return null;
  const k = life(t, frame, fps, a, b);
  return <At x={x} y={y}><div style={{ opacity: Math.min(1, k * 1.3), transform: `translateY(${(1 - Math.min(1, k)) * 24}px)` }}>{children}</div></At>;
};

/** code card whose rows pop on their cue words */
const Code: React.FC<{ title: string; rows: [React.ReactNode, number][]; w?: number; icon?: React.ReactNode; note?: string }> = ({ title, rows, w = 860, icon, note }) => {
  const { look, t, frame, fps } = useMotion();
  return (
    <div style={{ width: w, background: '#fff', border: `1.5px solid ${look.cardEdge}`, borderRadius: 22, boxShadow: `0 14px 34px ${look.cardShadow}`, overflow: 'hidden' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 20px', borderBottom: `1.5px solid ${look.cardEdge}`, fontFamily: FONT.mono, fontWeight: 800, fontSize: 18, letterSpacing: '0.12em', color: look.inkSoft }}>
        {icon}{title}<span style={{ flex: 1 }} />{note && <span style={{ fontWeight: 600, letterSpacing: '0.04em', color: look.inkFaint }}>{note}</span>}
      </div>
      <div style={{ padding: '14px 22px', display: 'flex', flexDirection: 'column', gap: 8 }}>
        {rows.map(([r, at], i) => {
          const k = pop(frame, fps, at, { damping: 14 });
          const hot = t >= at && t < at + 0.5;
          return <div key={i} style={{ fontFamily: FONT.mono, fontSize: 27, fontWeight: 600, color: look.ink, opacity: k > 0 ? Math.min(1, k * 1.4) : 0.12, transform: `translateX(${(1 - Math.min(1, k)) * -16}px)`, background: hot ? `${look.highlight}` : 'transparent', borderRadius: 6, padding: '0 6px', whiteSpace: 'nowrap' }}>{r}</div>;
        })}
      </div>
    </div>
  );
};
const K: React.FC<{ children: React.ReactNode }> = ({ children }) => <span style={{ color: B.accent }}>{children}</span>;
const Str: React.FC<{ children: React.ReactNode }> = ({ children }) => <span style={{ color: B.good }}>{children}</span>;

const spread = (words: string[], a: number, b: number): [string, number][] => words.map((w, i) => [w, a + ((b - a) * i) / Math.max(1, words.length - 1)]);

/** "every app wires every tool" tangle → MCP hub */
const APPS = ['CHAT APP', 'CODE EDITOR', 'AGENT'];
const TOOLS4 = ['FLIGHTS', 'CALENDAR', 'EMAIL', 'FILES'];
const Tangle: React.FC = () => {
  const { look, t, frame, fps } = useMotion();
  const hubAt = c('USB-C', 'c5d');
  const a0 = c('wired', 'c5a'), a1 = c('hand', 'c5a') + 0.2;
  const ay = (i: number) => 70 + i * 120, ty = (j: number) => 40 + j * 100;
  const hub = t >= hubAt;
  const hk = pop(frame, fps, hubAt, { damping: 11 });
  const box = (x: number, y: number, label: string, col: string, at: number, w = 210, hot = false) => {
    const k = pop(frame, fps, at, { damping: 13 });
    return <div key={label} style={{ position: 'absolute', left: x - w / 2, top: y - 28, width: w, height: 56, borderRadius: 14, background: hot ? `${col}22` : '#fff', border: `${hot ? 3 : 2}px solid ${col}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: FONT.mono, fontWeight: 800, fontSize: 19, letterSpacing: '0.06em', color: look.ink, transform: `scale(${k})`, boxShadow: hot ? `0 0 22px ${col}88` : `0 6px 16px ${look.cardShadow}` }}>{label}</div>;
  };
  const pairs = APPS.flatMap((_, i) => TOOLS4.map((__, j) => [i, j] as [number, number]));
  return (
    <div style={{ position: 'relative', width: 880, height: 380 }}>
      <svg width={880} height={380} style={{ position: 'absolute', left: 0, top: 0 }}>
        {!hub && pairs.map(([i, j], n) => {
          const at = a0 + ((a1 - a0) * n) / pairs.length;
          const d = prog(t, at, at + 0.25);
          if (d <= 0) return null;
          const x1 = 215, y1 = ay(i), x2 = 665, y2 = ty(j);
          return <line key={n} x1={x1} y1={y1} x2={x1 + (x2 - x1) * d} y2={y1 + (y2 - y1) * d} stroke={look.problem} strokeWidth={3} opacity={0.75} />;
        })}
        {hub && [...APPS.map((_, i) => [215, ay(i)]), ...TOOLS4.map((_, j) => [665, ty(j)])].map(([x, y], n) => {
          const d = prog(t, hubAt + 0.1 + n * 0.06, hubAt + 0.4 + n * 0.06);
          const flow = t >= c('plug', 'c5d') ? ((t * 0.9 + n * 0.17) % 1) : -1;
          return (
            <g key={n}>
              <line x1={440} y1={190} x2={440 + (x - 440) * d} y2={190 + (y - 190) * d} stroke={look.good} strokeWidth={4} />
              {flow >= 0 && <circle cx={x < 440 ? x + (440 - x) * flow : 440 + (x - 440) * flow} cy={x < 440 ? y + (190 - y) * flow : 190 + (y - 190) * flow} r={7} fill={look.accent2} />}
            </g>
          );
        })}
      </svg>
      {APPS.map((a, i) => box(110, ay(i), a, look.accent, S('c5a') + 0.15 + i * 0.1))}
      {TOOLS4.map((a, j) => box(770, ty(j), a, look.accent2, S('c5a') + 0.45 + j * 0.1, 200, j === 0 && t >= c('Build', 'c5d') && t < c('any', 'c5d')))}
      {hub && <div style={{ position: 'absolute', left: 440 - 70, top: 190 - 70, width: 140, height: 140, borderRadius: 70, background: look.accent, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: FONT.mono, fontWeight: 800, fontSize: 34, color: '#fff', letterSpacing: '0.12em', transform: `scale(${hk})`, boxShadow: `0 0 34px ${look.accent}88` }}>MCP</div>}
    </div>
  );
};

/** 0.95^n compounding: 20 step dots fill while the % drops */
const Compound: React.FC = () => {
  const { look, t } = useMotion();
  const a = c('twenty', 't2'), b = c('third', 't2');
  const n = Math.floor(prog(t, a, b, Easing.linear) * 20 + (t >= b ? 1 : 0));
  return (
    <div style={{ width: 540, background: '#fff', border: `1.5px solid ${look.cardEdge}`, borderRadius: 22, padding: 22, boxShadow: `0 14px 34px ${look.cardShadow}` }}>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
        <span style={{ fontFamily: FONT.mono, fontSize: 18, fontWeight: 800, letterSpacing: '0.1em', color: look.inkSoft }}>ALL STEPS RIGHT</span>
        <Ticker keys={[{ t: 0, v: 100 }, { t: c('ninety', 't2'), v: 95, dur: 0.4 }, { t: a, v: 35.8, dur: b - a, }]} format={(v) => `${Math.round(v)}%`} style={{ fontFamily: FONT.display, fontSize: 64, fontWeight: 700, color: t >= a + 0.8 ? look.problem : look.ink }} />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(10, 1fr)', gap: 8, marginTop: 12 }}>
        {Array.from({ length: 20 }, (_, i) => <div key={i} style={{ height: 30, borderRadius: 8, background: i < n ? look.accent2 : 'transparent', border: `2px solid ${i < n ? look.accent2 : look.cardEdge}`, transform: `scale(${i === n - 1 ? 1.12 : 1})` }} />)}
      </div>
      <div style={{ fontFamily: FONT.mono, fontSize: 18, color: look.inkSoft, marginTop: 10 }}>{`step ${Math.max(1, n)} of 20 · 95% each`}</div>
    </div>
  );
};

/** cost bar that keeps growing while the loop has no exit */
const Spend: React.FC = () => {
  const { look, t } = useMotion();
  const g = prog(t, GOING - 0.4, STOP_AT, Easing.linear);
  return (
    <div style={{ width: 540 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: FONT.mono, fontSize: 20, fontWeight: 800, letterSpacing: '0.08em', color: look.problem, marginBottom: 10 }}><span>TOKENS SPENT</span><span>↑</span></div>
      <div style={{ height: 40, borderRadius: 10, background: look.bg2, overflow: 'hidden' }}><div style={{ width: `${8 + g * 92}%`, height: '100%', background: look.problem, borderRadius: 10 }} /></div>
    </div>
  );
};

const Approve: React.FC = () => {
  const { look, t, frame, fps } = useMotion();
  const yes = c('yes', 'c6b');
  const yk = t >= yes ? pop(frame, fps, yes, { damping: 9 }) : 0;
  return (
    <Card at={c('shows', 'c6b')} w={640} pad={24} title="Book this flight?" icon={<CreditCard size={34} />} sub="AGENT IS WAITING FOR KEMI">
      <div style={{ display: 'flex', gap: 16, marginTop: 18 }}>
        <div style={{ flex: 1, height: 64, borderRadius: 16, background: t >= yes ? look.good : '#fff', border: `2.5px solid ${look.good}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: FONT.sans, fontWeight: 800, fontSize: 30, color: t >= yes ? '#fff' : look.good, transform: `scale(${1 + Math.sin(Math.min(1, yk) * Math.PI) * 0.08})` }}>Yes</div>
        <div style={{ flex: 1, height: 64, borderRadius: 16, background: '#fff', border: `2.5px solid ${look.cardEdge}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: FONT.sans, fontWeight: 800, fontSize: 30, color: look.inkSoft }}>No</div>
      </div>
    </Card>
  );
};

/* ───────────── camera ───────────── */
const CAM = (t: number) => camAt([
  { t: 0, x: SIDE(1.1), y: 0, z: 1.1 },
  { t: S('c2a') - 0.1, x: 165, y: -10, z: 1.4, dur: 1.0 },
  { t: c('Kemi', 'c2c') - 0.2, x: 170, y: -75, z: 1.3, dur: 0.8 },
  { t: S('c3a') - 0.1, x: 122, y: -45, z: 1.25, dur: 0.9 },
  { t: c('every', 'c3d') - 0.15, x: 5, y: 10, z: 1.1, dur: 0.9 },
  { t: S('c4d'), x: 170, y: -20, z: 1.3, dur: 0.9 },
  { t: S('c5a'), x: 120, y: 0, z: 1.0, dur: 0.9 },
  { t: HUB_AT - 0.2, x: 165, y: -40, z: 1.3, dur: 0.8 },
  { t: S('c6a') - 0.1, x: 170, y: -50, z: 1.3, dur: 0.9 },
  { t: S('t1') - 0.1, x: SIDE(0.62, 0), y: 0, z: 0.62, dur: 1.0 },
], t);

const CHAPTERS: [string, string, string][] = [['c1a', '01', 'The brain'], ['c2a', '02', 'Tools'], ['c3a', '03', 'The loop'], ['c4a', '04', 'Memory'], ['c5a', '05', 'One plug'], ['c6a', '06', 'Guardrails'], ['t1', '07', 'The trap']];

/* ───────────── scene ───────────── */
const Scene: React.FC = () => {
  loadMotionFonts();
  const { look, t, frame, fps } = useMotion();
  const cam = CAM(t);
  const br = L('bridge');
  const worldOn = prog(t, WORLD_AT - 0.1, WORLD_AT + 0.4)
    * (1 - 0.93 * (prog(t, S('c5a') - 0.1, S('c5a') + 0.4) - prog(t, HUB_AT - 0.3, HUB_AT + 0.3)))
    * (1 - 0.88 * prog(t, S('recap') - 0.3, S('recap') + 0.2))
    * (1 - prog(t, S('punch') - 0.3, S('punch')));
  const o1Words = vo.words.filter((w) => w.line === 'o1' && w.s >= c('find', 'o1')).map((w) => [w.w, w.s] as [string, number]);

  return (
    <AbsoluteFill>
      <Backdrop cam={cam} />

      {/* ── the world ── */}
      {worldOn > 0.001 && (
        <AbsoluteFill style={{ opacity: worldOn }}>
          <World cam={cam} centerY={790}>
            <Memory />
            <LoopRing />
            <ToolWires />
            <KemiBubble />
            <ModelNode />
            <Jar />
            {TOOLS.map((tl) => <ToolCard key={tl.id} tool={tl} />)}
            <Hub />
            <Guard />
            <StopSign />
            <WorldTags />
          </World>
        </AbsoluteFill>
      )}

      {/* ── HUD: series + loop counter + component chips ── */}
      <HudSeries series="AI agents" pulseTeyro={[br.start, S('cta')]}
        chapters={[{ t: 0, text: 'explained' }, { t: S('o1'), text: "Kemi's request" }, ...CHAPTERS.map(([id, n, name]) => ({ t: S(id), text: `${n} · ${name}` })),{ t: S('recap'), text: 'Recap' }, { t: S('punch'), text: 'No magic' }]}
        counter={{ unit: 'loops', icon: <RefreshCw size={26} color={B.accent2} />, format: (v) => String(Math.round(v)), keys: [
          { t: 0, v: 0 }, { t: c('Search', 'c3b'), v: 1, dur: 0.3 }, { t: c('Compare', 'c3b'), v: 2, dur: 0.3 }, { t: c('Check', 'c3b'), v: 3, dur: 0.3 }, { t: c('Repeat', 'c3c'), v: 4, dur: 0.3 },
          { t: c('text', 'c3d'), v: 5, dur: 0.3 }, { t: c('results', 'c4b'), v: 6, dur: 0.3 }, { t: c('notes', 'c4c'), v: 7, dur: 0.3 }, { t: c('pauses', 'c6b'), v: 8, dur: 0.3 }, { t: c('yes', 'c6b'), v: 9, dur: 0.3 },
          { t: GOING - 0.3, v: 60, dur: STOP_AT - GOING + 0.3 },
        ] }}
        chips={[{ label: 'Brain', t: c('brain', 'c1a') }, { label: 'Tools', t: c('Tools', 'c2a') }, { label: 'Loop', t: c('loop', 'c3a') }, { label: 'Memory', t: c('Memory', 'c4a') }, { label: 'MCP', t: c('MCP', 'c5c') }, { label: 'Guardrails', t: c('Guardrails', 'c6a') }, { label: 'Stop', t: STOP_AT }]} />

      {/* ── title (frame 0 = cover) ── */}
      <TitleCard title={['AI AGENTS']} kicker="EXPLAINED" until={S('o1')} titleSize={150} top={360}><div style={{ marginTop: 30 }}><Mini /></div></TitleCard>

      {/* ── cold open (Remi on, side stage) ── */}
      <Ov a={S('o1')} b={c('Agent', 'o3')} x={SX} y={720}>
        <div style={{ width: 540, background: '#fff', border: `1.5px solid ${look.cardEdge}`, borderRadius: 26, padding: '20px 24px', boxShadow: `0 14px 34px ${look.cardShadow}` }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
            <div style={{ width: 50, height: 50, borderRadius: 25, background: look.accent, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><User size={28} color="#fff" /></div>
            <Tag at={c('Kemi', 'o1')} text="Kemi" size={22} />
            <span style={{ flex: 1 }} />
            {t >= c('types', 'o1') && <MessageSquare size={30} color={look.inkSoft} />}
          </div>
          <TypeLine words={o1Words} size={40} width={490} />
        </div>
      </Ov>
      <Ov a={c('chatbot', 'o2')} b={c('Agent', 'o3')} x={SX} y={1110}>
        <Split at={c('chatbot', 'o2')} rightAt={c('agent', 'o2')} w={560} h={210}
          left={{ title: 'Chatbot', tone: 'problem', body: <div style={{ fontFamily: FONT.sans, fontWeight: 600, fontSize: 26, color: look.inkSoft, lineHeight: 1.25 }}>"Here's how you could do it…"<div style={{ marginTop: 12 }}><Tag at={c('describe', 'o2')} text="describes" tone="problem" size={18} /></div></div> }}
          right={{ title: 'Agent', tone: 'good', body: <div style={{ fontFamily: FONT.sans, fontWeight: 650, fontSize: 25, color: look.ink, lineHeight: 1.35 }}>✓ searches<br />✓ compares<br />✓ adds it<div style={{ marginTop: 6 }}><Tag at={c('does', 'o2')} text="does it" tone="good" size={18} /></div></div> }} />
      </Ov>
      {t >= c('Agent', 'o3') && t < WORLD_AT + 0.3 && (
        <AbsoluteFill style={{ opacity: 1 - prog(t, WORLD_AT - 0.1, WORLD_AT + 0.3) }}>
          {([['Agent', 590, 640, 'Agent.'], ['Tools', 880, 720, 'Tools.'], ['Memory', 600, 820, 'Memory.'], ['MCP', 870, 900, 'MCP.']] as [string, number, number, string][]).map(([w, x, y]) => (
            <At key={w} x={x} y={y}><div style={{ transform: `scale(${1 - 0.5 * prog(t, c('loop', 'o3') - 0.3, c('loop', 'o3'))})`, opacity: 1 - 0.8 * prog(t, c('loop', 'o3') - 0.3, c('loop', 'o3')) }}><Tag at={c(w, 'o3')} text={w} size={44} tone={w === 'MCP' ? 'problem' : 'accent'} /></div></At>
          ))}
          {t >= c('sounds', 'o3') && t < c('loop', 'o3') && <At x={SX} y={1030}><Tag at={c('lot', 'o3')} text="a lot?" tone="muted" size={30} /></At>}
          <At x={SX} y={1080} w={600}><BigText at={c('loop', 'o3')} lines={['ONE LOOP.']} size={110} align="center" color={look.accent} /></At>
        </AbsoluteFill>
      )}

      {/* ── chapter cards ── */}
      {CHAPTERS.map(([id, n, name]) => <ChapterCard key={id} at={S(id)} until={S(id) + 3.0} n={n} title={name} sub="STEP" size={108} y={356} color={id === 't1' ? look.problem : look.accent} />)}

      {/* ── 01 the brain (Remi on, side stage) ── */}
      <Ov a={c('check', 'c1b') - 0.1} b={S('c2a')} x={SX} y={1170}>
        <Checklist width={520} size={30} items={[{ text: 'check a price', at: c('check', 'c1b'), check: c('price', 'c1b'), tone: 'problem' }, { text: 'open a calendar', at: c('open', 'c1b'), check: c('calendar', 'c1b'), tone: 'problem' }]} />
      </Ov>

      {/* ── 02 tools ── */}
      <Ov a={S('c2b')} b={c('answer', 'c2c')}>
        <Code title="ONE TOOL" icon={<Wrench size={20} />} rows={[[<><K>name:</K> <Str>"search_flights"</Str></>, c('name', 'c2b')], [<><K>description:</K> <Str>"Find flights between two</Str></>, c('description', 'c2b')], [<><Str>  cities on a date"</Str></>, c('description', 'c2b') + 0.25], [<><K>inputs:</K> from, to, date</>, c('inputs', 'c2b')]]} />
      </Ov>
      <Ov a={c('answer', 'c2c')} b={c('writes', 'c2c')}><Tag at={c('answer', 'c2c')} text="it doesn't answer…" tone="muted" size={34} /></Ov>
      <Ov a={c('writes', 'c2c')} b={c('result', 'c2d')}>
        <Code title="THE MODEL WRITES A REQUEST" rows={[[<><K>search_flights</K>(</>, c('search', 'c2c')], [<>  from: <Str>"Lagos"</Str>,</>, c('Lagos', 'c2c')], [<>  to: <Str>"Nairobi"</Str>,</>, c('Nairobi', 'c2c')], [<>  date: <Str>"Friday"</Str> )</>, c('Friday', 'c2c')]]} />
      </Ov>
      <Ov a={c('result', 'c2d')} b={c('never', 'c2d')}>
        <Code title="YOUR CODE RUNS IT" note="example data" rows={[[<><K>←</K> result: <Str>3 flights found</Str></>, c('result', 'c2d')]]} w={760} />
      </Ov>
      <Ov a={c('never', 'c2d')} b={c('tool', 'c2d')}>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          <Badge at={c('internet', 'c2d')} text="NO INTERNET" icon={<Globe size={24} />} />
          <Tag at={c('asks', 'c2d')} text="it asks" size={30} solid />
        </div>
      </Ov>
      <Ov a={c('tool', 'c2d')} b={S('c2e')}><div style={{ width: 1000 }}><BigText at={c('tool', 'c2d')} lines={['TOOL CALL']} size={104} align="center" color={look.accent} /></div></Ov>
      <Ov a={S('c2e')} b={S('c3a')} y={OY - 10}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
          <Tag at={c('descriptions', 'c2e')} text="descriptions matter" size={24} />
          <LimitBars max={100} width={800} rows={[{ label: 'TIME ON THE TOOLS', value: 100, at: c('tools', 'c2e'), tone: 'accent', text: 'more' }, { label: 'TIME ON THE PROMPT', value: 56, at: c('prompt', 'c2e'), tone: 'good', text: 'less' }]} />
          <Footnote at={c('Anthropic', 'c2e')} text="Anthropic, “Building effective agents” (Dec 2024), Appendix 2 · not to scale" />
        </div>
      </Ov>

      {/* ── 03 the loop ── */}
      <Ov a={c('search', 'c3a')} b={S('c3b')}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <Code title="RESULT" note="example" w={520} rows={[[<><K>←</K> cheapest flight</>, c('search', 'c3a') + 0.2]]} />
          <Badge at={c('sold', 'c3a')} text="SOLD OUT" />
        </div>
      </Ov>
      <Ov a={S('c3b')} b={S('c3c')}>
        <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
          <Tag at={c('reads', 'c3b')} text="reads" tone="muted" size={24} />
          <Tag at={c('Search', 'c3b')} text="1 search again" size={24} />
          <Tag at={c('Compare', 'c3b')} text="2 compare" size={24} />
          <Tag at={c('Check', 'c3b')} text="3 calendar" size={24} />
        </div>
      </Ov>
      <Ov a={S('c3c')} b={c('Anthropic', 'c3c')}>
        <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
          {([['Think', 'think'], ['Act', 'act'], ['Observe', 'observe'], ['Repeat', 'repeat ↻']] as [string, string][]).map(([w, txt]) => <Tag key={w} at={c(w, 'c3c')} text={txt} size={34} solid={w === 'Repeat'} />)}
        </div>
      </Ov>
      <Ov a={c('Anthropic', 'c3c')} b={S('c3d')} y={OY - 10}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
          <TypeLine words={spread(['“LLMs', 'using', 'tools', 'based', 'on', 'environmental', 'feedback', 'in', 'a', 'loop.”'], c('Anthropic', 'c3c'), c('loop', 'c3c'))} size={42} width={900} align="center" />
          <Footnote at={c('describes', 'c3c')} text="Anthropic, “Building effective agents” (Dec 2024)" />
        </div>
      </Ov>
      <Ov a={c('forget', 'c3d')} b={S('c4a')}><Badge at={c('forget', 'c3d')} text="IT FORGETS" /></Ov>

      {/* ── 04 memory ── */}
      <Ov a={c('read', 'c4a')} b={S('c4b')}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
          <Tag at={c('once', 'c4a')} text="a limit on what it reads" tone="problem" size={26} />
          <Tag at={c('context', 'c4a')} text="context window" size={30} solid />
        </div>
      </Ov>
      <Ov a={c('pushed', 'c4b') - 0.2} b={S('c4c')}><Badge at={c('Kemi', 'c4b')} text="WHAT DID KEMI ASK?" /></Ov>
      <Ov a={S('c4c')} b={S('c4d')}>
        <div style={{ display: 'flex', gap: 14 }}>
          <Tag at={c('notes', 'c4c')} text="keep notes" size={28} />
          <Tag at={c('summarise', 'c4c')} text="summarise" size={28} />
          <Tag at={c('read', 'c4c')} text="read back" size={28} tone="good" />
        </div>
      </Ov>
      <Ov a={S('c4d')} b={br.start + 0.1} y={OY - 20}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
          {t < c('hundred', 'c4d') ? <Tag at={c('three', 'c4d')} text="3 tools" size={34} /> : <Tag at={c('hundred', 'c4d')} text="300 tools?" tone="problem" size={34} solid />}
          {t >= c('hundred', 'c4d') && <Fill at={c('hundred', 'c4d')} dur={0.8} count={300} cols={30} cell={26} color={look.problem} />}
        </div>
      </Ov>

      {/* ── Teyro mid bridge (after the cliffhanger) ── */}
      <TeyroBridge at={br.start} until={S('back') + 0.2} line="Learn coding and AI, a few minutes a day" chips={['AI track', 'Build AI agents', 'A few minutes a day']}
        chipTimes={[c('track', 'bridge'), c('Building', 'bridge'), c('Teyro', 'bridge')]} beats={[c('Quick', 'bridge'), c('Okay', 'back')]} />

      {/* ── 05 one plug ── */}
      <Ov a={S('c5a')} b={HUB_AT} y={800}><Tangle /></Ov>
      <Ov a={c('hand', 'c5a')} b={c('November', 'c5c')} y={1130}><Badge at={c('hand', 'c5a')} text="12 CUSTOM CONNECTIONS" /></Ov>
      <Ov a={c('November', 'c5c')} b={c('USB-C', 'c5d')} y={1170}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
          <div style={{ display: 'flex', gap: 14 }}><Tag at={c('November', 'c5c')} text="Nov 2024" size={28} /><Tag at={c('open', 'c5c')} text="open standard" size={28} tone="good" /></div>
          <div style={{ width: 1000 }} /><BigText at={c('Model', 'c5c')} lines={['MODEL CONTEXT PROTOCOL']} size={58} align="center" color={look.accent} />
          <Footnote at={c('Anthropic', 'c5c')} text="anthropic.com/news/model-context-protocol · Nov 25, 2024" />
        </div>
      </Ov>
      <Ov a={c('USB-C', 'c5d')} b={HUB_AT} y={1170}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
          <Tag at={c('USB-C', 'c5d')} text="like USB-C, for AI" size={32} solid />
          <div style={{ display: 'flex', gap: 14 }}><Tag at={c('once', 'c5d')} text="build once" size={24} /><Badge at={c('plug', 'c5d')} text="7 CONNECTIONS" tone="good" /></div>
          <Footnote at={c('plug', 'c5d')} text="example: 3 apps × 4 tools = 12 custom links · with MCP, 3 + 4 = 7" />
        </div>
      </Ov>
      <Ov a={HUB_AT} b={S('c6a')}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
          <div style={{ display: 'flex', gap: 14 }}>
            <Card at={c('tools', 'c5e')} w={270} pad={18} title="Tools" icon={<Wrench size={30} />} sub="to run" />
            <Card at={c('resources', 'c5e')} w={300} pad={18} title="Resources" icon={<FileText size={30} />} sub="to read" />
            <Card at={c('prompts', 'c5e')} w={270} pad={18} title="Prompts" icon={<MessageSquare size={30} />} sub="to reuse" />
          </div>
          <Footnote at={c('server', 'c5e')} text="MCP specification 2026-07-28 · server features" />
        </div>
      </Ov>

      {/* ── 06 guardrails ── */}
      <Ov a={c('shows', 'c6b')} b={S('c6c')}><Approve /></Ov>
      <Ov a={S('c6c')} b={S('t1')} y={OY - 10}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
          <TypeLine words={spread(['“Hosts', 'must', 'obtain', 'explicit', 'user', 'consent', 'before', 'invoking', 'any', 'tool.”'], c('says', 'c6c'), c('tool', 'c6c'))} size={40} width={920} align="center" />
          <Footnote at={c('spec', 'c6c')} text="MCP specification 2026-07-28 · Security and Trust & Safety" />
        </div>
      </Ov>

      {/* ── 07 the trap (Remi on, side stage) ── */}
      <Ov a={c('loop', 't1')} b={S('t2')} x={SX} y={1150}><Badge at={c('loop', 't1')} text="THE LOOP" /></Ov>
      <Ov a={S('t2')} b={S('t3')} x={SX} y={1130}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
          <Compound />
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}><Badge at={c('third', 't2')} text="≈ 1 IN 3" /><Footnote at={c('third', 't2')} width={300} align="left" text="0.95^20 ≈ 0.36 · illustrative" /></div>
        </div>
      </Ov>
      <Ov a={S('t3')} b={S('t4')} x={SX} y={1150}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
          <Badge at={c('exit', 't3')} text="NO EXIT" />
          {t >= GOING - 0.4 && <Spend />}
        </div>
      </Ov>
      <Ov a={S('t4')} b={S('cav')} x={SX} y={1160}>
        <Checklist width={540} size={28} items={[{ text: 'check every step', at: c('check', 't4'), check: c('step', 't4') }, { text: 'stop: goal reached', at: c('Goal', 't4'), check: c('reached', 't4') }, { text: 'stop: too many turns', at: c('too', 't4'), check: c('turns', 't4') }]} />
      </Ov>
      <Ov a={S('cav')} b={S('recap')} x={SX} y={1150}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
          <Split at={c('tasks', 'cav')} rightAt={c('prompt', 'cav')} w={560} h={170}
            left={{ title: 'Agent', tone: 'normal', body: <div style={{ fontFamily: FONT.sans, fontWeight: 650, fontSize: 26, color: look.inkSoft }}>often not needed</div> }}
            right={{ title: 'One good prompt', tone: 'good', body: <div style={{ fontFamily: FONT.sans, fontWeight: 650, fontSize: 26, color: look.ink }}>often enough</div> }} />
          <Footnote at={c('enough', 'cav')} width={540} text="Anthropic, “Building effective agents” (Dec 2024)" />
        </div>
      </Ov>

      {/* ── recap (Remi on) ── */}
      <At x={SX} y={900}>
        {t < S('punch') && (
          <div style={{ opacity: 1 - prog(t, S('punch') - 0.25, S('punch')) }}>
            <Recap width={560} titleAt={S('recap')} items={[
              { text: 'A brain', at: c('brain', 'recap') }, { text: 'Tools for hands', at: c('Tools', 'recap') }, { text: 'A loop to keep going', at: c('loop', 'recap') },
              { text: 'Notes to remember', at: c('Notes', 'recap') }, { text: 'MCP to plug in', at: c('MCP', 'recap') }, { text: 'Guardrails', at: c('Guardrails', 'recap') }, { text: 'A way to stop', at: c('stop', 'recap') },
            ]} />
          </div>
        )}
      </At>

      {/* ── punchline ── */}
      {t >= S('punch') && t < S('cta') && (
        <AbsoluteFill style={{ opacity: 1 - prog(t, S('cta') - 0.2, S('cta')) }}>
          <At x={540} y={560} w={1000}><BigText at={c('No', 'punch')} lines={['NO MAGIC.']} size={120} align="center" /></At>
          <At x={540} y={950}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
              {([['A MODEL,', c('model', 'punch'), look.ink], ['SOME TOOLS,', c('tools', 'punch'), look.ink], ['AND A LOOP.', c('loop', 'punch'), look.accent]] as [string, number, string][]).map(([txt, at, col]) => {
                const k = pop(frame, fps, at, { damping: 10 });
                return <div key={txt} style={{ fontFamily: FONT.display, fontWeight: 700, fontSize: 100, lineHeight: 1.02, letterSpacing: '-0.03em', color: col, transform: `scale(${k})`, opacity: Math.min(1, k * 1.5) }}>{txt}</div>;
              })}
            </div>
          </At>
        </AbsoluteFill>
      )}

      {/* ── Teyro outro + loop back to the cover ── */}
      <TeyroOutro at={S('cta')} until={vo.duration + 0.25 - 0.45} headline="The fun way to finish learning coding and AI." ask="Search Teyro" />
      <LoopBack from={vo.duration + 0.25 - 0.45} dur={0.4}><Cover /></LoopBack>

      {/* ── host + captions ── */}
      <Host on={[[S('o1'), S('c2a') - 0.2], [S('t1'), S('punch') - 0.1]]}
        poses={[
          { t: 0, p: 'wave' }, { t: c('types', 'o1'), p: 'point' }, { t: c('chatbot', 'o2'), p: 'explain' }, { t: c('agent', 'o2'), p: 'point' },
          { t: c('Agent', 'o3'), p: 'think' }, { t: c('loop', 'o3'), p: 'wow' }, { t: c('build', 'o3'), p: 'point' },
          { t: S('c1a'), p: 'explain' }, { t: c('jar', 'c1b'), p: 'point' }, { t: c('hands', 'c1b'), p: 'think' },
          { t: S('t1'), p: 'think' }, { t: c('loop', 't1'), p: 'wow' }, { t: S('t2'), p: 'explain' }, { t: c('third', 't2'), p: 'wow' },
          { t: S('t3'), p: 'point' }, { t: c('stop', 't4'), p: 'pointUp' }, { t: S('cav'), p: 'explain' }, { t: S('recap'), p: 'point' }, { t: c('stop', 'recap'), p: 'wow' },
        ]} />
      <Captions hideBetween={[[br.start, S('back') + 0.2]]} />
    </AbsoluteFill>
  );
};

/* ───────────── sound design ───────────── */
const SFX: SfxCue[] = [
  ...revealCues(0.05),
  { t: c('Kemi', 'o1'), s: 'pop' }, { t: c('find', 'o1'), s: 'type', v: 0.6 },
  { t: c('chatbot', 'o2'), s: 'swoosh' }, { t: c('agent', 'o2'), s: 'swoosh' }, { t: c('does', 'o2'), s: 'success', v: 0.6 },
  ...ticks(['Agent', 'Tools', 'Memory', 'MCP'].map((w) => c(w, 'o3')), 'pop'), { t: c('loop', 'o3'), s: 'boom', v: 0.6 }, { t: WORLD_AT, s: 'whoosh' },
  ...CHAPTERS.flatMap(([id]) => revealCues(S(id)).map((x) => ({ ...x, v: 0.6 }))),
  ...ticks([c('text', 'c1a', 1), c('text', 'c1a', 2)]), { t: c('price', 'c1b'), s: 'error', v: 0.5 }, { t: c('calendar', 'c1b'), s: 'error', v: 0.5 }, { t: c('jar', 'c1b'), s: 'pop' }, { t: c('hands', 'c1b'), s: 'error', v: 0.6 },
  { t: S('c2a') - 0.1, s: 'whoosh', v: 0.6 }, ...ticks(TOOLS.slice(0, 3).map((x) => x.at), 'pop'),
  ...ticks([c('name', 'c2b'), c('description', 'c2b'), c('inputs', 'c2b')]),
  { t: c('Kemi', 'c2c'), s: 'pop' }, { t: c('writes', 'c2c'), s: 'type', v: 0.6 }, ...ticks([c('Lagos', 'c2c'), c('Nairobi', 'c2c'), c('Friday', 'c2c')]),
  { t: c('runs', 'c2d'), s: 'swoosh' }, { t: c('result', 'c2d'), s: 'pop' }, { t: c('internet', 'c2d'), s: 'error', v: 0.5 }, { t: c('asks', 'c2d'), s: 'tick' }, { t: c('tool', 'c2d'), s: 'boom', v: 0.6 },
  { t: c('tools', 'c2e'), s: 'count', v: 0.6 }, { t: c('prompt', 'c2e'), s: 'tick' },
  { t: c('search', 'c3a'), s: 'swoosh' }, { t: c('sold', 'c3a'), s: 'error' },
  ...ticks([c('Search', 'c3b'), c('Compare', 'c3b'), c('Check', 'c3b')], 'pop'),
  ...ticks([c('Think', 'c3c'), c('Act', 'c3c'), c('Observe', 'c3c')], 'pop'), { t: c('Repeat', 'c3c'), s: 'whoosh', v: 0.7 }, { t: c('Anthropic', 'c3c'), s: 'type', v: 0.5 },
  { t: c('every', 'c3d') - 0.15, s: 'whoosh', v: 0.6 }, ...ticks(BLOCKS.slice(0, 7).map((b) => b.at)), { t: c('forget', 'c3d'), s: 'glitch' },
  { t: c('once', 'c4a'), s: 'error', v: 0.5 }, { t: c('context', 'c4a'), s: 'pop' },
  ...ticks([c('Fill', 'c4b'), c('results', 'c4b')]), { t: c('pushed', 'c4b'), s: 'shatter', v: 0.7 }, { t: c('Kemi', 'c4b'), s: 'error', v: 0.5 },
  { t: c('notes', 'c4c'), s: 'pop' }, { t: c('summarise', 'c4c'), s: 'swoosh' }, { t: c('read', 'c4c'), s: 'success', v: 0.6 },
  { t: S('c4d'), s: 'whoosh', v: 0.6 }, { t: c('three', 'c4d'), s: 'tick' }, { t: c('hundred', 'c4d'), s: 'count' },
  { t: S('bridge'), s: 'chime' }, { t: S('back'), s: 'whoosh', v: 0.6 },
  ...ticks(Array.from({ length: 12 }, (_, n) => c('wired', 'c5a') + ((c('hand', 'c5a') + 0.2 - c('wired', 'c5a')) * n) / 12)).map((x) => ({ ...x, v: 0.5 })), { t: c('hand', 'c5a'), s: 'error' },
  { t: c('November', 'c5c'), s: 'pop' }, { t: c('Model', 'c5c'), s: 'boom', v: 0.6 },
  { t: c('USB-C', 'c5d'), s: 'success', v: 0.7 }, { t: c('plug', 'c5d'), s: 'chime', v: 0.6 },
  { t: HUB_AT, s: 'whoosh', v: 0.6 }, ...ticks([c('tools', 'c5e'), c('resources', 'c5e'), c('prompts', 'c5e')], 'pop'),
  { t: S('c6a') - 0.1, s: 'whoosh', v: 0.6 }, { t: c('harmless', 'c6a'), s: 'tick' }, { t: c('Paying', 'c6a'), s: 'error', v: 0.6 },
  { t: c('human', 'c6b'), s: 'pop' }, { t: c('pauses', 'c6b'), s: 'tick' }, { t: c('shows', 'c6b'), s: 'swoosh' }, { t: c('yes', 'c6b'), s: 'success' },
  { t: c('says', 'c6c'), s: 'type', v: 0.5 },
  { t: S('t1') - 0.1, s: 'whoosh', v: 0.6 }, { t: c('model', 't1'), s: 'tick' }, { t: c('loop', 't1'), s: 'error' },
  { t: c('ninety', 't2'), s: 'tick' }, { t: c('twenty', 't2'), s: 'count' }, { t: c('third', 't2'), s: 'error' },
  { t: c('exit', 't3'), s: 'error', v: 0.6 }, { t: GOING, s: 'riser', v: 0.6 },
  { t: c('step', 't4'), s: 'tick' }, { t: STOP_AT, s: 'boom', v: 0.7 }, { t: c('reached', 't4'), s: 'success', v: 0.6 }, { t: c('turns', 't4'), s: 'success', v: 0.6 },
  { t: c('tasks', 'cav'), s: 'swoosh' }, { t: c('prompt', 'cav'), s: 'swoosh' },
  ...revealCues(S('recap')).map((x) => ({ ...x, v: 0.5 })), ...ticks(['brain', 'Tools', 'loop', 'Notes', 'MCP', 'Guardrails', 'stop'].map((w) => c(w, 'recap')), 'pop'),
  { t: c('No', 'punch'), s: 'boom', v: 0.6 }, ...ticks([c('model', 'punch'), c('tools', 'punch')], 'pop'), { t: c('loop', 'punch'), s: 'boom', v: 0.7 },
  { t: S('cta'), s: 'whoosh' }, { t: S('cta') + 0.6, s: 'pop' },
];

export const M2: React.FC = () => (
  <MotionProvider look="blueprint" vo={vo}>
    <Scene />
    <SoundLayer slug={SLUG} sfx={SFX} />
  </MotionProvider>
);
