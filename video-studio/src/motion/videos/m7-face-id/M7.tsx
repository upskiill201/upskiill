import React from 'react';
import { AbsoluteFill, Img, staticFile } from 'remotion';
import { Check, Coins, EyeOff, Flame, Gift, ImageOff, Lock, Medal, ShieldCheck, ShoppingBag, Trophy, Unlock, Users, X, Zap } from 'lucide-react';
import {
  At, Backdrop, Badge, BigText, Captions, ChapterCard, Footnote, Host, HudJourney, LoopBack, MotionProvider, Recap, SfxCue,
  SoundLayer, Tag, TeyroBridge, TeyroOutro, TitleCard, Ticker, VO, cue, fmt, life, line,
  loadMotionFonts, pop, prog, revealCues, rnd, ticks, useMotion, Z, FONT, LOOKS, BRAND,
} from '../../kit';
import voJson from './vo.json';

const vo = voJson as VO;
const SLUG = 'm7-face-id';
const N = LOOKS.neon;
export const M7_DURATION = Math.ceil((vo.duration + 0.25) * 30);

/* ───────────── timing helpers ───────────── */
const L = (id: string) => line(vo, id);
const c = (w: string, after?: string | number, n = 1) => cue(vo, w, { n, after: typeof after === 'string' ? L(after).start : after });
const S = (id: string) => L(id).start;
const SX = 700;
const IR = '#FF4D6D';      // infrared dots
const GOLD = '#F2C76B';

const Ov: React.FC<{ a: number; b: number; x?: number; y?: number; children: React.ReactNode }> = ({ a, b, x = 540, y = 1250, children }) => {
  const { t, frame, fps } = useMotion();
  if (t < a || t >= b) return null;
  const k = life(t, frame, fps, a, b);
  return <At x={x} y={y}><div style={{ opacity: Math.min(1, k * 1.3), transform: `translateY(${(1 - Math.min(1, k)) * 24}px)` }}>{children}</div></At>;
};
const Col: React.FC<{ children: React.ReactNode; w?: number; gap?: number }> = ({ children, w = 1000, gap = 14 }) => <div style={{ width: w, display: 'flex', flexDirection: 'column', alignItems: 'center', gap }}>{children}</div>;
const Mono: React.FC<{ children: React.ReactNode; size?: number; color?: string }> = ({ children, size = 20, color }) => <span style={{ fontFamily: FONT.mono, fontWeight: 800, fontSize: size, letterSpacing: '0.1em', color: color ?? N.inkSoft, textTransform: 'uppercase' }}>{children}</span>;

/* ───────────── the face: a cloud of infrared dots with real depth ───────────── */
const RX = 190, RY = 250, STEP = 21;
type Dot = { x: number; y: number; d: number; i: number };
const DOTS: Dot[] = (() => {
  const out: Dot[] = []; let i = 0;
  for (let y = -RY; y <= RY; y += STEP) for (let x = -RX; x <= RX; x += STEP) {
    const e = (x / RX) ** 2 + (y / RY) ** 2;
    if (e > 1) continue;
    const g = (cx: number, cy: number, s: number) => Math.exp(-((x - cx) ** 2 + (y - cy) ** 2) / (2 * s * s));
    const d = Math.max(0, Math.min(1, 0.55 * (1 - e) + 0.55 * g(0, 20, 34) - 0.32 * g(-72, -48, 28) - 0.32 * g(72, -48, 28) + 0.12 * g(0, -150, 70)));
    out.push({ x, y, d, i: i++ });
  }
  return out;
})();
/** mesh neighbours, computed once (not per frame) */
const RIGHT: number[] = DOTS.map((dt) => DOTS.findIndex((o) => o.y === dt.y && o.x === dt.x + STEP));
const DOWN: number[] = DOTS.map((dt) => DOTS.findIndex((o) => o.x === dt.x && o.y === dt.y + STEP));
const depthCol = (d: number) => {
  const stops: [number, [number, number, number]][] = [[0, [57, 198, 217]], [0.45, [155, 92, 255]], [0.75, [224, 64, 200]], [1, [255, 154, 60]]];
  for (let k = 1; k < stops.length; k++) if (d <= stops[k][0]) {
    const [a, ca] = stops[k - 1], [b, cb] = stops[k]; const u = (d - a) / (b - a);
    return `rgb(${ca.map((v, j) => Math.round(v + (cb[j] - v) * u)).join(',')})`;
  }
  return 'rgb(255,154,60)';
};

type FaceMode = { fire: number; depth: number; mesh: number; tilt: number; beard?: number; eyesClosed?: boolean; dim?: number };
const Face: React.FC<{ m: FaceMode; scale?: number; hue?: string }> = ({ m, scale = 1, hue }) => {
  const { t } = useMotion();
  const W = 2 * RX + 120, H = 2 * RY + 120;
  const sin = Math.sin(m.tilt);
  const P = (dt: Dot) => ({ x: dt.x + dt.d * sin * 70 + W / 2, y: dt.y + H / 2 });
  return (
    <svg width={W * scale} height={H * scale} viewBox={`0 0 ${W} ${H}`} style={{ overflow: 'visible', filter: m.fire > 0 ? 'drop-shadow(0 0 5px rgba(255,77,109,0.55))' : undefined }}>
      {/* outline + features, faint, so the dots read as a face */}
      <ellipse cx={W / 2 + sin * 20} cy={H / 2} rx={RX + 8} ry={RY + 10} fill="none" stroke={hue ?? '#3B4270'} strokeWidth={3} opacity={0.8 - 0.5 * m.fire * (m.dim ?? 1)} />
      {[-72, 72].map((ex) => (m.eyesClosed
        ? <path key={ex} d={`M ${W / 2 + ex - 26 + sin * 25} ${H / 2 - 48} q 26 14 52 0`} stroke="#9AA3C7" strokeWidth={5} fill="none" />
        : <ellipse key={ex} cx={W / 2 + ex + sin * 25} cy={H / 2 - 48} rx={24} ry={12} fill="none" stroke="#9AA3C7" strokeWidth={4} opacity={0.7} />))}
      <path d={`M ${W / 2 + sin * 45} ${H / 2 - 20} l -18 60 l 24 4`} stroke="#9AA3C7" strokeWidth={4} fill="none" opacity={0.6} />
      <path d={`M ${W / 2 - 50 + sin * 30} ${H / 2 + 110} q 50 30 100 0`} stroke="#9AA3C7" strokeWidth={4} fill="none" opacity={0.6} />
      {/* mesh between neighbours (the depth map) */}
      {m.mesh > 0 && DOTS.map((dt, di) => {
        const right = RIGHT[di] >= 0 ? DOTS[RIGHT[di]] : undefined;
        const down = DOWN[di] >= 0 ? DOTS[DOWN[di]] : undefined;
        const p = P(dt);
        return (
          <g key={`m${dt.i}`} opacity={m.mesh * 0.55}>
            {right && <line x1={p.x} y1={p.y} x2={P(right).x} y2={P(right).y} stroke={depthCol(dt.d)} strokeWidth={1.6} />}
            {down && <line x1={p.x} y1={p.y} x2={P(down).x} y2={P(down).y} stroke={depthCol(dt.d)} strokeWidth={1.6} />}
          </g>
        );
      })}
      {/* the dots: fire in waves from the top */}
      {DOTS.map((dt) => {
        const wave = (dt.y + RY) / (2 * RY);
        const on = Math.max(0, Math.min(1, (m.fire - wave * 0.7) / 0.3));
        if (on <= 0) return null;
        const p = P(dt);
        const twinkle = 0.75 + 0.25 * Math.sin(t * 6 + dt.i * 1.7);
        const col = m.depth > 0 ? depthCol(dt.d) : IR;
        const r = (2.6 + m.depth * dt.d * 3.4) * on;
        return <circle key={dt.i} cx={p.x} cy={p.y} r={r} fill={col} opacity={on * twinkle} />;
      })}
      {(m.beard ?? 0) > 0 && <path d={`M ${W / 2 - 150} ${H / 2 + 60} q 150 ${200 * (m.beard ?? 0)} 300 0`} fill="#5A4A6E" opacity={0.75 * (m.beard ?? 0)} />}
    </svg>
  );
};

/* ───────────── face state over time ───────────── */
const faceAt = (t: number): FaceMode => {
  const fire = prog(t, c('fires', 'c1a'), c('face', 'c1a') + 0.3);
  const depth = prog(t, c('distance', 'c2a') - 0.2, c('distance', 'c2a') + 0.6);
  const mesh = prog(t, c('builds', 'c2b'), c('shape', 'c2b') + 0.3);
  const tiltOn = t >= c('builds', 'c2b') && t < S('c2c') + 1.5;
  const tilt = tiltOn ? Math.sin((t - c('builds', 'c2b')) * 1.6) * 0.9 : Math.sin(t * 0.6) * 0.12;
  const beard = t >= c('beard', 'c5c') ? prog(t, c('beard', 'c5c'), c('beard', 'c5c') + 0.8) : 0;
  const dark = t >= c('total', 'c1b') && t < S('c2a') ? 1 : 0;
  return { fire, depth, mesh, tilt, beard: t < S('t1') ? beard : 0, eyesClosed: t >= c('closed', 'c5c') && t < c('checks', 'c5c') + 0.6, dim: dark ? 0.2 : 1 };
};

/* ───────────── hook (frame 0 = cover) ───────────── */
const TwinCover: React.FC<{ still?: boolean }> = ({ still }) => {
  const { t } = useMotion();
  const m: FaceMode = { fire: 1, depth: 1, mesh: 0.6, tilt: still ? 0.2 : Math.sin(t * 1.4) * 0.4 };
  const m2: FaceMode = { ...m, tilt: still ? -0.2 : -Math.sin(t * 1.4) * 0.4 };
  const q = still ? 1 : 1 + 0.08 * Math.sin(t * 5);
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
      <Face m={m} scale={0.62} />
      <div style={{ fontFamily: FONT.display, fontWeight: 700, fontSize: 150, color: GOLD, transform: `scale(${q})`, textShadow: `0 0 40px ${GOLD}` }}>?</div>
      <Face m={m2} scale={0.62} hue="#5B4A8A" />
    </div>
  );
};

const PhoneLock: React.FC<{ openAt: number }> = ({ openAt }) => {
  const { t, frame, fps } = useMotion();
  const open = t >= openAt;
  const k = open ? pop(frame, fps, openAt, { damping: 9 }) : 1;
  return (
    <div style={{ width: 300, height: 560, borderRadius: 50, background: '#0B0E1A', border: `6px solid ${open ? N.good : '#2A3160'}`, boxShadow: open ? `0 0 50px ${N.good}88` : `0 0 30px ${N.accent}44`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 18 }}>
      <div style={{ width: 90, height: 22, borderRadius: 11, background: '#1A1F38', marginTop: -150 }} />
      <div style={{ transform: `scale(${k})` }}>{open ? <Unlock size={90} color={N.good} /> : <Lock size={90} color={N.inkSoft} />}</div>
      <Mono size={22} color={open ? N.good : N.inkSoft}>{open ? 'unlocked' : 'locked'}</Mono>
    </div>
  );
};

/* ───────────── chapter parts ───────────── */
const Vector: React.FC<{ at: number; label: string; seed: number; col?: string; w?: number }> = ({ at, label, seed, col = N.accent2, w = 820 }) => {
  const { t } = useMotion();
  const n = Math.floor(prog(t, at, at + 1.2) * 14);
  return (
    <div style={{ width: w, padding: '16px 20px', borderRadius: 20, background: N.card, border: `2px solid ${col}`, boxShadow: `0 0 26px ${col}44` }}>
      <Mono size={17} color={col}>{label}</Mono>
      <div style={{ fontFamily: FONT.mono, fontSize: 25, fontWeight: 700, color: N.ink, marginTop: 8, whiteSpace: 'nowrap', overflow: 'hidden' }}>
        [ {Array.from({ length: n }, (_, i) => ((rnd(i + seed) * 2 - 1)).toFixed(2)).join(', ')}{n < 14 ? '' : ', …'} ]
      </div>
    </div>
  );
};

const Match: React.FC = () => {
  const { look, t } = useMotion();
  const okAt = c('Unlocked', 'c4b'), badAt = c('Not', 'c4b'), again = c('again', 'c4b');
  const sim = t < okAt ? 0.4 + 0.55 * prog(t, S('c4b'), okAt) : t < badAt ? 0.95 : 0.95 - 0.6 * prog(t, badAt, badAt + 0.5);
  const good = sim > 0.85;
  return (
    <div style={{ width: 820 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}><Mono size={19}>match score</Mono><span style={{ fontFamily: FONT.display, fontWeight: 700, fontSize: 40, color: good ? look.good : look.problem }}>{Math.round(sim * 100)}%</span></div>
      <div style={{ height: 30, borderRadius: 15, background: '#1D2244', position: 'relative' }}>
        <div style={{ width: `${sim * 100}%`, height: '100%', borderRadius: 15, background: good ? look.good : look.problem }} />
        <div style={{ position: 'absolute', left: '85%', top: -10, width: 4, height: 50, background: '#fff' }} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 16, gap: 14 }}>
        {t >= okAt && t < badAt && <Badge at={okAt} text="UNLOCKED" tone="good" icon={<Unlock size={22} />} />}
        {t >= again && <Badge at={again} text="TRY AGAIN" />}
      </div>
    </div>
  );
};

const FiveMisses: React.FC = () => {
  const { look, t, frame, fps } = useMotion();
  const a = c('Five', 'c4b'), p = c('passcode', 'c4b');
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 22 }}>
      <div style={{ display: 'flex', gap: 10 }}>{Array.from({ length: 5 }, (_, i) => <div key={i} style={{ width: 54, height: 54, borderRadius: 27, background: t >= a + i * 0.12 ? look.problem : '#1D2244', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{t >= a + i * 0.12 && <X size={30} color="#fff" strokeWidth={3} />}</div>)}</div>
      {t >= p && <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 44px)', gap: 8, transform: `scale(${pop(frame, fps, p, { damping: 10 })})` }}>{[1, 2, 3, 4, 5, 6, 7, 8, 9].map((d) => <div key={d} style={{ height: 44, borderRadius: 22, border: `2px solid ${look.inkSoft}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: FONT.mono, fontWeight: 800, fontSize: 20, color: look.ink }}>{d}</div>)}</div>}
    </div>
  );
};

/* ───────────── Teyro game-loop dashboard ───────────── */
const Tile: React.FC<{ at: number; w?: number; children: React.ReactNode; edge?: string }> = ({ at, w = 450, children, edge }) => {
  const { t, frame, fps } = useMotion();
  const k = pop(frame, fps, at, { damping: 11 });
  if (k <= 0) return <div style={{ width: w }} />;
  const flash = t < at + 0.6 ? 1 - prog(t, at, at + 0.6) : 0;
  return <div style={{ width: w, minHeight: 190, borderRadius: 26, background: N.card, border: `2.5px solid ${edge ?? N.cardEdge}`, padding: 20, boxSizing: 'border-box', boxShadow: `0 16px 40px rgba(0,0,0,0.5)${flash ? `, 0 0 ${40 * flash}px ${edge ?? BRAND.blue}` : ''}`, transform: `scale(${k})` }}>{children}</div>;
};
const TeyroDash: React.FC = () => {
  const { look, t, frame, fps } = useMotion();
  const xp = c('XP', 'ty2'), streak = c('streak', 'ty3'), league = c('leagues', 'ty3'), diamond = c('Diamond', 'ty3'), quests = c('quests', 'ty3'), chests = c('chests', 'ty3');
  const shop = c('shop', 'ty4'), month = c('Monthly', 'ty4'), friends = c('friends', 'ty4');
  const tiers = ['#C98A55', '#B8C0CC', '#F2C76B', '#6FA8FF', '#9BE7FF'];
  const tier = Math.min(4, Math.floor(prog(t, league, diamond + 0.2) * 5));
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18 }}>
      {/* lesson + XP */}
      <Tile at={S('ty2')} w={918} edge={BRAND.blue}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <Zap size={44} color={GOLD} />
          <div style={{ flex: 1 }}><div style={{ fontFamily: FONT.sans, fontWeight: 800, fontSize: 32, color: look.ink }}>Lesson · a few minutes</div><div style={{ fontFamily: FONT.mono, fontSize: 19, color: look.inkSoft, marginTop: 4 }}>learn · apply · reflect · deepen</div></div>
          {t >= xp && <div style={{ fontFamily: FONT.display, fontWeight: 700, fontSize: 52, color: GOLD, transform: `scale(${pop(frame, fps, xp, { damping: 9 })})` }}>+10 XP</div>}
        </div>
      </Tile>
      <div style={{ display: 'flex', gap: 18 }}>
        <Tile at={streak} edge="#FF9A3C">
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}><Flame size={70} color="#FF9A3C" fill="#FF9A3C55" style={{ transform: `scale(${1 + 0.05 * Math.sin(t * 9)})` }} /><div><Ticker keys={[{ t: 0, v: 127 }, { t: streak + 0.3, v: 128, dur: 0.4 }]} format={fmt.int} style={{ fontFamily: FONT.display, fontWeight: 700, fontSize: 72, color: look.ink, lineHeight: 1 }} /><Mono size={17} color="#FF9A3C">day streak</Mono></div></div>
        </Tile>
        <Tile at={league} edge={tiers[tier]}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}><Trophy size={40} color={tiers[tier]} /><span style={{ fontFamily: FONT.sans, fontWeight: 800, fontSize: 28, color: look.ink }}>{['Bronze', 'Silver', 'Gold', 'Sapphire', 'Diamond'][tier]} League</span></div>
          <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>{tiers.map((col, i) => <div key={i} style={{ flex: 1, height: 48, borderRadius: 12, border: `2px solid ${col}`, background: i <= tier ? `${col}55` : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Medal size={26} color={col} /></div>)}</div>
        </Tile>
      </div>
      <div style={{ display: 'flex', gap: 18 }}>
        <Tile at={quests} edge={GOLD}>
          <Mono size={17} color={GOLD}>3 daily quests</Mono>
          {[0, 1, 2].map((i) => { const k = prog(t, quests + i * 0.2, quests + 0.7 + i * 0.2); return <div key={i} style={{ height: 18, borderRadius: 9, background: '#1D2244', marginTop: 12 }}><div style={{ width: `${k * 100}%`, height: '100%', borderRadius: 9, background: GOLD }} /></div>; })}
          {t >= chests && <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 14, transform: `scale(${pop(frame, fps, chests, { damping: 9 })})` }}><Gift size={40} color={look.accent2} /><span style={{ fontFamily: FONT.display, fontWeight: 700, fontSize: 34, color: GOLD }}>chest opened</span></div>}
        </Tile>
        <Tile at={shop} edge={look.accent}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}><ShoppingBag size={40} color={look.accent} /><span style={{ fontFamily: FONT.sans, fontWeight: 800, fontSize: 28, color: look.ink }}>Shop</span><span style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 6, fontFamily: FONT.mono, fontWeight: 800, fontSize: 24, color: GOLD }}><Coins size={26} color={GOLD} />340</span></div>
          {t >= month && <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 14, transform: `scale(${pop(frame, fps, month, { damping: 10 })})` }}><Medal size={34} color={GOLD} /><span style={{ fontFamily: FONT.sans, fontWeight: 700, fontSize: 24, color: look.ink }}>Monthly Challenge</span></div>}
          {t >= friends && <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 10, transform: `scale(${pop(frame, fps, friends, { damping: 10 })})` }}><Users size={30} color={look.accent2} /><span style={{ fontFamily: FONT.sans, fontWeight: 700, fontSize: 24, color: look.ink }}>race your friends</span></div>}
        </Tile>
      </div>
      <Mono size={16}>coins are earned, not bought · free to start</Mono>
    </div>
  );
};

/* ───────────── scene ───────────── */
const CHAPTERS: [string, string, string][] = [['c1a', '01', 'The dots'], ['c2a', '02', 'The depth map'], ['c3a', '03', 'The math'], ['c4a', '04', 'The match'], ['c5a', '05', 'The tricks'], ['t1', '06', 'The twin']];

const Scene: React.FC = () => {
  loadMotionFonts();
  const { look, t, frame, fps } = useMotion();
  const br = L('bridge');
  const end = vo.duration + 0.25;
  const fm = faceAt(t);
  // the hero face: centre stage from chapter 1 to the twin chapter, then splits into twins
  const faceOn = prog(t, S('c1a') - 0.2, S('c1a') + 0.4) * (1 - prog(t, S('recap') - 0.3, S('recap')));
  const faceY = t < S('c3b') ? 820 : t < S('c4c') ? 640 : 760;
  const faceS = t < S('c3b') ? 1.1 : t < S('c4c') ? 0.72 : 0.9;
  const twins = (t >= c('two', 'c4c') && t < S('c5a')) || (t >= S('t1') && t < S('recap'));

  return (
    <AbsoluteFill>
      <Backdrop />

      {/* ── HUD: journey from your face to unlocked ── */}
      <HudJourney from="YOUR FACE" to="UNLOCKED" pulseTeyro={[br.start, S('ty1'), S('cta')]}
        progress={[{ t: 0, v: 0 }, { t: S('c1a'), v: 0.15 }, { t: S('c2a'), v: 0.32 }, { t: S('c3a'), v: 0.5 }, { t: S('c4a'), v: 0.68 }, { t: c('Unlocked', 'c4b'), v: 1, dur: 0.5 }, { t: c('Not', 'c4b'), v: 0.7, dur: 0.4 }, { t: S('t1'), v: 0.85 }, { t: S('recap'), v: 1 }]}
        title={[{ t: 0, text: 'your face or your twin?' }, ...CHAPTERS.map(([id, n, name]) => ({ t: S(id), text: `${n} · ${name}` })), { t: S('recap'), text: 'recap' }, { t: S('ty1'), text: 'learn ai like a game' }]} />

      {/* ── HOOK (frame 0 = cover) ── */}
      <TitleCard title={['YOUR FACE', "OR YOUR TWIN'S?"]} kicker="HOW FACE ID REALLY KNOWS" until={S('h2')} titleSize={108} top={400}><TwinCover /></TitleCard>
      <Ov a={S('h2')} b={S('c1a')} y={860}>
        <Col>
          <PhoneLock openAt={c('opens', 'h2')} />
          {t >= c('four', 'h3') && <div style={{ display: 'flex', gap: 12 }}>{['dots', 'depth', 'math', 'match'].map((x, i) => <Tag key={x} at={c('four', 'h3') + i * 0.15} text={`${i + 1} ${x}`} size={26} />)}</div>}
        </Col>
      </Ov>

      {/* ── the hero face ── */}
      {faceOn > 0.001 && (
        <At x={540} y={faceY}>
          <div style={{ opacity: faceOn, display: 'flex', alignItems: 'center', transition: 'none' }}>
            {twins
              ? <><Face m={fm} scale={faceS * 0.7} /><div style={{ fontFamily: FONT.display, fontWeight: 700, fontSize: 120, color: GOLD, transform: `scale(${1 + 0.08 * Math.sin(t * 5)})` }}>?</div><Face m={{ ...fm, tilt: -fm.tilt }} scale={faceS * 0.7} hue="#5B4A8A" /></>
              : <Face m={fm} scale={faceS} />}
          </div>
        </At>
      )}

      {/* ── chapter cards ── */}
      {CHAPTERS.map(([id, n, name]) => <ChapterCard key={id} at={S(id)} until={S(id) + 2.4} n={n} title={name} sub="STEP" size={96} y={392} color={id === 't1' ? GOLD : look.accent} />)}

      {/* ── 01 dots ── */}
      <Ov a={c('thousands', 'c1a')} b={S('c1b')}><Tag at={c('thousands', 'c1a')} text="thousands of invisible dots" size={30} solid /></Ov>
      <Ov a={S('c1b')} b={S('c2a')}>
        <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
          <Tag at={c('infrared', 'c1b')} text="infrared" size={28} tone="problem" solid />
          {t >= c('eyes', 'c1b') && <div style={{ display: 'flex', alignItems: 'center', gap: 8, transform: `scale(${pop(frame, fps, c('eyes', 'c1b'))})` }}><EyeOff size={40} color={look.inkSoft} /><Mono size={22}>invisible to you</Mono></div>}
          <Tag at={c('darkness', 'c1b')} text="works in the dark" size={26} />
        </div>
      </Ov>

      {/* ── 02 depth map ── */}
      <Ov a={c('nose', 'c2a')} b={S('c2b')}>
        <div style={{ display: 'flex', gap: 14 }}><Tag at={c('nose', 'c2a')} text="nose: closer" size={28} /><Tag at={c('eyes', 'c2a')} text="eyes: deeper" size={28} tone="muted" /></div>
      </Ov>
      <Ov a={c('depth', 'c2b')} b={S('c2c')}><BigText at={c('depth', 'c2b')} lines={['DEPTH MAP']} size={88} align="center" color={look.accent2} /></Ov>
      <Ov a={S('c2c')} b={S('c3a')}>
        <div style={{ display: 'flex', gap: 22, alignItems: 'center' }}>
          {t >= c('photo', 'c2c') && <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '16px 22px', borderRadius: 18, border: `2.5px solid ${look.problem}`, transform: `scale(${pop(frame, fps, c('photo', 'c2c'))}) skewX(-8deg)` }}><ImageOff size={40} color={look.problem} /><span style={{ fontFamily: FONT.display, fontWeight: 700, fontSize: 40, color: look.problem }}>photo = flat</span></div>}
          <Tag at={c('face', 'c2c')} text="your face = depth" size={30} tone="good" solid />
        </div>
      </Ov>

      {/* ── 03 math ── */}
      <Ov a={c('picture', 'c3a')} b={S('c3b')}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 22px', borderRadius: 18, border: `2.5px solid ${look.problem}` }}><ImageOff size={40} color={look.problem} /><span style={{ fontFamily: FONT.display, fontWeight: 700, fontSize: 40, color: look.ink, textDecoration: 'line-through' }}>no photo stored</span></div>
      </Ov>
      <Ov a={c('numbers', 'c3b') - 0.4} b={S('c3c')} y={1130}>
        <Col><Vector at={c('turns', 'c3b')} label="your face, as numbers (illustrative)" seed={7} /><Tag at={c('math', 'c3b')} text="your face = math" size={30} solid /></Col>
      </Ov>
      <Ov a={S('c3c')} b={S('c4a')} y={1130}>
        <Col>
          <div style={{ display: 'flex', alignItems: 'center', gap: 18, padding: '20px 28px', borderRadius: 24, background: N.card, border: `3px solid ${look.good}`, boxShadow: `0 0 ${30 + 14 * Math.sin(t * 4)}px ${look.good}66`, transform: `scale(${pop(frame, fps, c('locked', 'c3c'), { damping: 11 })})` }}>
            <ShieldCheck size={64} color={look.good} /><div><div style={{ fontFamily: FONT.display, fontWeight: 700, fontSize: 46, color: look.ink }}>Secure Enclave</div><Mono size={18}>a protected part of the chip</Mono></div>
          </div>
          <Badge at={c('never', 'c3c')} text="NEVER LEAVES YOUR PHONE" tone="good" />
          <Footnote at={c('leaves', 'c3c')} text="Apple Support · About Face ID advanced technology · not backed up to iCloud" />
        </Col>
      </Ov>

      {/* ── 04 match ── */}
      <Ov a={S('c4a') + 0.3} b={S('c4b')} y={1130}>
        <Col><Vector at={c('new', 'c4a')} label="new scan" seed={7} col={look.accent2} /><Vector at={c('saved', 'c4a') - 0.3} label="saved face" seed={7} col={look.good} /></Col>
      </Ov>
      <Ov a={S('c4b')} b={c('Five', 'c4b')} y={1130}><Match /></Ov>
      <Ov a={c('Five', 'c4b')} b={S('c4c')} y={1140}>
        <Col>
          <FiveMisses />
          {t >= S('c4b2') && <div style={{ display: 'flex', gap: 12 }}><Tag at={c('restart', 'c4b2')} text="after a restart" size={24} /><Tag at={c('two', 'c4b2')} text="after 48 hours" size={24} /></div>}
          <Footnote at={c('passcode', 'c4b')} text="Apple Platform Security · passcode after 5 failed attempts, a restart or 48 h" />
        </Col>
      </Ov>
      <Ov a={c('same', 'c4c')} b={br.start + 0.1} y={1260}><BigText at={c('shape', 'c4c')} lines={['SAME SHAPE?']} size={84} align="center" color={GOLD} /></Ov>

      {/* ── Teyro mid bridge ── */}
      <TeyroBridge at={br.start} until={S('back') + 0.2} line="Learn AI like a game, a few minutes a day" chips={['AI track', 'Plays like a game', 'A few minutes a day']}
        chipTimes={[c('AI', 'bridge', 2), c('track', 'bridge'), c('Teyro', 'bridge')]} beats={[c('Quick', 'bridge'), c('works', 'bridge'), c('Okay', 'back')]} />

      {/* ── 05 tricks ── */}
      <Ov a={c('photo', 'c5a') - 0.2} b={S('c5b')} y={1260}><div style={{ display: 'flex', gap: 14, alignItems: 'center' }}><Tag at={c('photo', 'c5a')} text="a photo" size={30} /><Badge at={c('Rejected', 'c5a')} text="REJECTED" /></div></Ov>
      <Ov a={S('c5b')} b={S('c5c')} y={1260}><div style={{ display: 'flex', gap: 14, alignItems: 'center' }}><Tag at={c('mask', 'c5b')} text="a mask" size={30} /><Badge at={c('fakes', 'c5b')} text="FAKE CAUGHT" /></div></Ov>
      <Ov a={S('c5c')} b={S('t1')} y={1260}>
        <Col>
          <div style={{ display: 'flex', gap: 14 }}><Tag at={c('closed', 'c5c')} text="eyes closed" size={26} tone="problem" /><Tag at={c('looking', 'c5c')} text="must be looking" size={26} tone="good" /></div>
          {t >= c('beard', 'c5c') && <div style={{ display: 'flex', gap: 14 }}><Tag at={c('beard', 'c5c')} text="new beard" size={26} /><Tag at={c('learns', 'c5c')} text="it adapts" size={26} tone="good" solid /></div>}
          <Footnote at={c('fakes', 'c5b')} text="Apple Platform Security · anti-spoofing network · attention-aware · adapts to changes" />
        </Col>
      </Ov>

      {/* ── 06 the twin ── */}
      <Ov a={c('random', 't1')} b={S('t2')} y={1220}>
        <Col>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 16 }}><span style={{ fontFamily: FONT.display, fontWeight: 700, fontSize: 64, color: look.inkSoft }}>less than 1 in</span><Ticker keys={[{ t: 0, v: 0 }, { t: c('one', 't1'), v: 1000000, dur: 0.9 }]} format={fmt.int} style={{ fontFamily: FONT.display, fontWeight: 700, fontSize: 96, color: look.good, transformOrigin: 'center' }} /></div>
          <Tag at={c('saved', 't1')} text="with one saved face" size={22} tone="muted" />
          <Footnote at={c('phone', 't1')} text="Apple Support · About Face ID advanced technology" />
        </Col>
      </Ov>
      <Ov a={S('t2')} b={S('t3')} y={1230}>
        <Col>
          <BigText at={c('higher', 't2')} lines={['HIGHER ODDS FOR']} size={70} align="center" color={GOLD} />
          <div style={{ display: 'flex', gap: 14 }}>{([['twins', 'twins'], ['siblings', 'siblings'], ['kids under 13', 'thirteen']] as [string, string][]).map(([x, w]) => <Tag key={x} at={c(w, 't2')} text={x} size={30} tone="problem" solid />)}</div>
        </Col>
      </Ov>
      <Ov a={S('t3')} b={S('recap')} y={1230}>
        <Col>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '18px 26px', borderRadius: 22, background: N.card, border: `3px solid ${look.good}`, transform: `scale(${pop(frame, fps, c('recommends', 't3'), { damping: 10 })})` }}><Lock size={50} color={look.good} /><span style={{ fontFamily: FONT.display, fontWeight: 700, fontSize: 44, color: look.ink }}>Apple: use a passcode</span></div>
          <Footnote at={c('passcode', 't3')} text="Apple Support: 'If you're concerned about this, we recommend using a passcode'" />
        </Col>
      </Ov>

      {/* ── recap (Remi on) ── */}
      <At x={SX} y={900}>
        {t >= S('recap') - 0.2 && t < S('punch') && (
          <div style={{ opacity: 1 - prog(t, S('punch') - 0.25, S('punch')) }}>
            <Recap width={580} titleAt={S('recap')} items={[
              { text: 'Thousands of dots', at: c('Thousands', 'recap') }, { text: 'A depth map', at: c('depth', 'recap') }, { text: 'Your face as math', at: c('math', 'recap') },
              { text: 'A match, every time', at: c('match', 'recap') }, { text: 'Twins: the weak spot', at: c('twin', 'recap') },
            ]} />
          </div>
        )}
      </At>

      {/* ── punchline ── */}
      {t >= S('punch') && t < S('ty1') && (
        <AbsoluteFill style={{ opacity: 1 - prog(t, S('ty1') - 0.15, S('ty1')) }}>
          <At x={540} y={820} w={1040}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
              {([["IT DOESN'T SEE YOUR FACE.", c('see', 'punch'), look.inkSoft, 70], ['IT MEASURES IT.', c('measures', 'punch'), look.accent2, 116]] as [string, number, string, number][]).map(([txt, at, col, sz]) => {
                const k = pop(frame, fps, at, { damping: 10 });
                return <div key={txt} style={{ fontFamily: FONT.display, fontWeight: 700, fontSize: sz, lineHeight: 1.05, letterSpacing: '-0.03em', color: col, transform: `scale(${k})`, opacity: Math.min(1, k * 1.5), whiteSpace: 'nowrap', textShadow: `0 0 30px ${col}66` }}>{txt}</div>;
              })}
            </div>
          </At>
        </AbsoluteFill>
      )}

      {/* ── the Teyro section: learning AI plays like a game ── */}
      {t >= S('ty1') - 0.1 && t < S('cta') && (
        <AbsoluteFill style={{ opacity: 1 - prog(t, S('cta') - 0.25, S('cta')) }}>
          <At x={540} y={520}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 20, transform: `scale(${pop(frame, fps, S('ty1'), { damping: 11 })})` }}>
              <div style={{ width: 116, height: 116, borderRadius: 32, overflow: 'hidden', boxShadow: '0 0 50px rgba(61,90,254,0.6)' }}><Img src={staticFile('tey-tile.png')} style={{ width: '100%', height: '100%' }} /></div>
              <div><div style={{ fontFamily: FONT.display, fontWeight: 700, fontSize: 82, color: '#fff', lineHeight: 1 }}>Teyro</div><div style={{ fontFamily: FONT.sans, fontWeight: 650, fontSize: 28, color: N.inkSoft, marginTop: 6 }}>learn AI like playing a game</div></div>
            </div>
          </At>
          <At x={540} y={1080}><TeyroDash /></At>
        </AbsoluteFill>
      )}

      {/* ── outro: how to find Teyro ── */}
      <TeyroOutro at={S('cta')} until={end - 0.45} headline="Learning that plays like a game. Free to start." ask="Search Teyro · teyro.app" />
      <LoopBack from={end - 0.45} dur={0.4}>
        <AbsoluteFill style={{ background: N.bg }}>
          <Backdrop />
          <div style={{ position: 'absolute', left: Z.gutter + 10, right: Z.gutter + 10, top: 400, textAlign: 'center' }}>
            {['YOUR FACE', "OR YOUR TWIN'S?"].map((l) => <div key={l} style={{ fontFamily: FONT.display, fontWeight: 700, fontSize: 108, lineHeight: 0.95, letterSpacing: '-0.035em', color: N.ink }}>{l}</div>)}
            <div style={{ marginTop: 22, fontFamily: FONT.mono, fontWeight: 700, fontSize: 30, letterSpacing: '0.42em', color: N.problem }}>HOW FACE ID REALLY KNOWS</div>
          </div>
          <div style={{ position: 'absolute', left: 0, right: 0, top: 400 + 2 * 108 + 120, bottom: 1920 - Z.stageBottom - 40, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><TwinCover still /></div>
        </AbsoluteFill>
      </LoopBack>

      {/* ── host + captions ── */}
      <Host on={[[S('recap'), S('punch') - 0.1]]} poses={[{ t: 0, p: 'idle' }, { t: S('recap'), p: 'point' }, { t: c('twin', 'recap'), p: 'wow' }]} />
      <Captions hideBetween={[[br.start, S('back') + 0.2]]} />
    </AbsoluteFill>
  );
};

/* ───────────── sound design ───────────── */
const SFX: SfxCue[] = [
  { t: 0.05, s: 'boom' }, { t: c("twin's", 'h1'), s: 'chime', v: 0.6 },
  { t: c('glance', 'h2'), s: 'swoosh' }, { t: c('opens', 'h2'), s: 'success' }, ...ticks([0, 1, 2, 3].map((i) => c('four', 'h3') + i * 0.15), 'pop'),
  ...CHAPTERS.flatMap(([id]) => revealCues(S(id)).map((x) => ({ ...x, v: 0.55 }))),
  { t: c('fires', 'c1a'), s: 'riser', v: 0.6 }, { t: c('thousands', 'c1a'), s: 'shatter', v: 0.5 }, { t: c('infrared', 'c1b'), s: 'pop' }, { t: c('eyes', 'c1b'), s: 'tick' }, { t: c('darkness', 'c1b'), s: 'whoosh', v: 0.5 },
  { t: c('distance', 'c2a'), s: 'swoosh' }, { t: c('nose', 'c2a'), s: 'tick' }, { t: c('eyes', 'c2a'), s: 'tick' }, { t: c('builds', 'c2b'), s: 'whoosh' }, { t: c('depth', 'c2b'), s: 'boom', v: 0.6 },
  { t: c('photo', 'c2c'), s: 'pop' }, { t: c('flat', 'c2c'), s: 'error', v: 0.5 }, { t: c('face', 'c2c'), s: 'success', v: 0.6 },
  { t: c('picture', 'c3a'), s: 'error', v: 0.5 }, { t: c('turns', 'c3b'), s: 'count' }, { t: c('math', 'c3b'), s: 'pop' }, { t: c('locked', 'c3c'), s: 'chime', v: 0.6 }, { t: c('never', 'c3c'), s: 'success', v: 0.6 },
  { t: c('new', 'c4a'), s: 'count' }, { t: c('saved', 'c4a'), s: 'tick' }, { t: c('Unlocked', 'c4b'), s: 'success' }, { t: c('again', 'c4b'), s: 'error' },
  ...ticks([0, 1, 2, 3, 4].map((i) => c('Five', 'c4b') + i * 0.12), 'tick'), { t: c('passcode', 'c4b'), s: 'pop' }, ...ticks([c('restart', 'c4b2'), c('two', 'c4b2')], 'pop'),
  { t: c('two', 'c4c'), s: 'swoosh' }, { t: c('shape', 'c4c'), s: 'boom', v: 0.6 },
  { t: S('bridge'), s: 'chime' }, { t: S('back'), s: 'whoosh', v: 0.6 },
  { t: c('photo', 'c5a'), s: 'pop' }, { t: c('Rejected', 'c5a'), s: 'error' }, { t: c('mask', 'c5b'), s: 'pop' }, { t: c('fakes', 'c5b'), s: 'error' },
  { t: c('closed', 'c5c'), s: 'tick' }, { t: c('looking', 'c5c'), s: 'success', v: 0.5 }, { t: c('beard', 'c5c'), s: 'swoosh' }, { t: c('learns', 'c5c'), s: 'success', v: 0.5 },
  { t: c('one', 't1'), s: 'count' }, { t: c('higher', 't2'), s: 'boom', v: 0.6 }, ...ticks([c('twins', 't2'), c('siblings', 't2'), c('thirteen', 't2')], 'pop'), { t: c('recommends', 't3'), s: 'chime', v: 0.6 },
  ...revealCues(S('recap')).map((x) => ({ ...x, v: 0.5 })), ...ticks(['Thousands', 'depth', 'math', 'match', 'twin'].map((w) => c(w, 'recap')), 'pop'),
  { t: c('see', 'punch'), s: 'boom', v: 0.6 }, { t: c('measures', 'punch'), s: 'boom', v: 0.8 },
  ...revealCues(S('ty1')), { t: c('XP', 'ty2'), s: 'success' },
  ...ticks([c('streak', 'ty3'), c('leagues', 'ty3'), c('Diamond', 'ty3'), c('quests', 'ty3')], 'pop'), { t: c('chests', 'ty3'), s: 'chime', v: 0.6 },
  ...ticks([c('shop', 'ty4'), c('Monthly', 'ty4'), c('friends', 'ty4')], 'pop'),
  { t: S('cta'), s: 'whoosh' }, { t: S('cta') + 0.6, s: 'pop' }, { t: c('app', 'cta2'), s: 'chime', v: 0.6 },
];

export const M7: React.FC = () => (
  <MotionProvider look="neon" vo={vo}>
    <Scene />
    <SoundLayer slug={SLUG} sfx={SFX} />
  </MotionProvider>
);
