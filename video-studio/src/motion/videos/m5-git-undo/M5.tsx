import React from 'react';
import { AbsoluteFill } from 'remotion';
import { Archive, FileCode, Folder, GitBranch, GitCommitHorizontal, RotateCcw, Trash2, Undo2, User } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import {
  At, Backdrop, Badge, BigText, Captions, ChapterCard, Footnote, Host, HudSeries, LoopBack, MotionProvider, Recap, SfxCue,
  SoundLayer, Split, Strike, Tag, TeyroBridge, TeyroOutro, TitleCard, VO, World, camAt, cue, fmt, life, line,
  loadMotionFonts, pop, prog, revealCues, rnd, ticks, useMotion, Z, FONT, LOOKS,
} from '../../kit';
import voJson from './vo.json';

const vo = voJson as VO;
const SLUG = 'm5-git-undo';
const NT = LOOKS.night;
export const M5_DURATION = Math.ceil((vo.duration + 0.25) * 30);

/* ───────────── timing helpers ───────────── */
const L = (id: string) => line(vo, id);
const c = (w: string, after?: string | number, n = 1) => cue(vo, w, { n, after: typeof after === 'string' ? L(after).start : after });
const S = (id: string) => L(id).start;
const OY = 1250;
const SX = 700;
const SIDE = (z: number, cx = 0) => cx - (Z.sideCx - 540) / z;

const GIT_C = '#F05133';
const HUB_C = '#B79CFF';
const WORLD_AT = S('c1a') - 0.2;

/* three Git areas (world x) + GitHub */
const AX = [-340, 0, 340];
const AREAS: [string, string][] = [['WORKING', 'your edits'], ['STAGING', 'git add'], ['COMMITS', 'saved forever']];
const X_HUB = 1060;

/* ───────────── state timeline (what sits where, when) ───────────── */
const T = {
  commit1: c('commit', 'c1a'), forgot: c('forgot', 'c1a'), typo: c('typo', 'c1a'),
  addCss: c('add', 'c1b'), amend: c('amend', 'c1b'),
  reset: c('reset', 'c1c'), disappears: c('disappears', 'c1d'), ready: c('ready', 'c1d'),
  addNotes: c('add', 'c2a'), unstage: c('comes', 'c2b'), safe2: c('safe', 'c2b'),
  recommit: S('c3a') - 0.1, broken: c('broken', 'c3a'), restore: c('restore', 'c3b'), thrown: c('thrown', 'c3b'), back3: c('goes', 'c3b'),
  never: c('never', 'c3c'), stash: c('stash', 'c3c'), later: c('later', 'c3c'),
  hub: c('GitHub', 'c3d'), team: c('team', 'c3d'),
  bad: c('bad', 'c4a'), noReset: c('reset', 'c4b'), rewrite: c('Rewrite', 'c4b'), revert: c('revert', 'c4c'), adds: c('adds', 'c4c'), opposite: c('opposite', 'c4c'), safe4: c('Safe', 'c4c'),
  deleted: c('deleted', 'c5a'), reflog: c('reflog', 'c5b'), find: c('find', 'c5c'), rescue: c('branch', 'c5c'),
};

type FileId = 'app.js' | 'style.css' | 'notes.txt';
/** area index for a file at time t (null = clean / not shown) */
const fileArea = (f: FileId, t: number): { a: number; tone?: 'problem' | 'good' | 'warn' } | null => {
  if (f === 'app.js') {
    if (t < T.commit1) return { a: 1 };
    if (t < T.disappears) return null;
    if (t < T.recommit) return { a: 1, tone: t >= T.ready ? 'good' : undefined };
    if (t < T.broken) return null;
    if (t < T.restore) return { a: 0, tone: 'problem' };
    if (t < T.back3 + 0.6) return { a: 0, tone: t >= T.back3 ? 'good' : 'problem' };
    return null;
  }
  if (f === 'style.css') {
    if (t < T.forgot) return null;
    if (t < T.addCss) return { a: 0, tone: 'warn' };
    if (t < T.amend) return { a: 1 };
    if (t < T.disappears) return null;
    if (t < T.recommit) return { a: 1, tone: t >= T.ready ? 'good' : undefined };
    return null;
  }
  // notes.txt
  if (t < S('c2a')) return null;
  if (t < T.addNotes) return { a: 0 };
  if (t < T.unstage) return { a: 1, tone: 'problem' };
  if (t < S('c3a')) return { a: 0, tone: t >= T.safe2 ? 'good' : undefined };
  if (t >= c('Not', 'c3c') && t < T.stash - 0.1) return { a: 0, tone: 'warn' };   // unsure about these edits
  if (t >= T.stash - 0.1 && t < T.later) return null;          // tucked into the stash
  if (t >= T.later && t < S('c3d')) return { a: 0, tone: 'good' };
  return null;
};

type Cm = { id: string; msg: string; tone?: 'problem' | 'good' | 'accent' };
const commitsAt = (t: number): Cm[] => {
  const base: Cm[] = [{ id: '1a2b3c4', msg: 'first page' }, { id: '5d6e7f8', msg: 'add header' }];
  const out = [...base];
  if (t >= T.commit1 && t < T.disappears) out.push(t < T.amend ? { id: '9f2c1aa', msg: t >= T.typo ? 'add lgoin' : 'add login', tone: t >= T.typo ? 'problem' : undefined } : { id: '4be17d0', msg: 'add login', tone: 'good' });
  if (t >= T.recommit) out.push({ id: '4be17d0', msg: 'add login' });
  if (t >= T.bad) out.push({ id: 'b4d0c0d', msg: 'bad change', tone: 'problem' });
  if (t >= T.revert) out.push({ id: '7ee2a91', msg: "Revert 'bad change'", tone: 'good' });
  if (t >= T.rescue) out.push({ id: '9c1d4aa', msg: 'rescued: finish login', tone: 'accent' });
  return out;
};

/** when each commit chip first appears (for its pop-in), local and on GitHub */
const BORN: Record<string, number> = {
  '9f2c1aa': T.commit1, '4be17d0': T.amend, 'b4d0c0d': T.bad, '7ee2a91': T.revert, '7ee2a91@hub': T.adds, '9c1d4aa': T.rescue,
  '1a2b3c4': WORLD_AT + 0.4, '5d6e7f8': WORLD_AT + 0.55, '1a2b3c4@hub': T.hub, '5d6e7f8@hub': T.hub + 0.1, '4be17d0@hub': T.hub + 0.2, 'b4d0c0d@hub': T.bad + 0.15,
};

/* ───────────── world parts ───────────── */
const AreaPanel: React.FC<{ i: number }> = ({ i }) => {
  const { look, t, frame, fps } = useMotion();
  const k = pop(frame, fps, WORLD_AT + i * 0.12, { damping: 13 });
  const col = i === 0 ? look.warm : i === 1 ? look.accent : GIT_C;
  const glow = (i === 1 && t >= T.ready && t < T.recommit) || (i === 2 && t >= T.safe4 && t < S('c5a'));
  // flash + bump when a file lands in this area (a motion burst on every move)
  const landed = FILES.some((f) => { const a = fileArea(f, t), b = fileArea(f, t - 0.3); return a?.a === i && b?.a !== i; });
  // ambient "breathing": one short glow pulse per panel every 1.5 s, staggered so a burst lands every 0.5 s
  const ph = (t + i * 0.5) % 1.5;
  const breath = t > WORLD_AT + 1 && ph < 0.35 ? Math.sin((ph / 0.35) * Math.PI) : 0;
  const bump = landed ? 1 : breath * 0.8;
  return (
    <At x={AX[i]} y={0}>
      <div style={{ width: 310, height: 470, borderRadius: 26, background: 'rgba(36,39,45,0.92)', border: `2.5px solid ${glow ? look.good : col}`, boxShadow: glow ? `0 0 36px ${look.good}55` : bump ? `0 0 34px ${col}88` : `0 18px 40px ${look.cardShadow}`, transform: `scale(${k * (1 + bump * 0.03)})`, padding: '18px 16px', boxSizing: 'border-box' }}>
        <div style={{ fontFamily: FONT.mono, fontWeight: 800, fontSize: 24, letterSpacing: '0.14em', color: col }}>{AREAS[i][0]}</div>
        <div style={{ fontFamily: FONT.mono, fontSize: 17, color: look.inkSoft, marginTop: 2 }}>{AREAS[i][1]}</div>
      </div>
    </At>
  );
};

const FILES: FileId[] = ['app.js', 'style.css', 'notes.txt'];
const Files: React.FC = () => {
  const { look, t } = useMotion();
  return (
    <>
      {FILES.map((f, fi) => {
        // smooth area transitions: average the area over the last 0.4 s, so a move reads as a slide
        const now = fileArea(f, t);
        const samples = Array.from({ length: 8 }, (_, j) => fileArea(f, t - j * 0.05)).filter(Boolean) as { a: number }[];
        if (!now && samples.length === 0) return null;
        const x = samples.reduce((s, v) => s + AX[v.a], 0) / Math.max(1, samples.length);
        const fade = now ? 1 : 0.3 * (samples.length / 8);
        const tone = now?.tone;
        const col = tone === 'problem' ? look.problem : tone === 'good' ? look.good : tone === 'warn' ? look.warm : look.cardEdge;
        return (
          <At key={f} x={x} y={-110 + fi * 92} z={3}>
            <div style={{ width: 260, height: 70, borderRadius: 16, background: tone === 'problem' ? '#3A2226' : tone === 'good' ? '#1F3326' : '#2A2E35', border: `2.5px solid ${col}`, display: 'flex', alignItems: 'center', gap: 12, padding: '0 16px', boxSizing: 'border-box', opacity: fade, fontFamily: FONT.mono, fontWeight: 800, fontSize: 26, color: look.ink, boxShadow: tone ? `0 0 20px ${col}55` : 'none' }}>
              <FileCode size={28} color={tone === 'problem' ? look.problem : look.accent} />{f}
              {tone === 'warn' && <span style={{ marginLeft: 'auto', color: look.warm }}>!</span>}
              {tone === 'problem' && <span style={{ marginLeft: 'auto', color: look.problem }}>✗</span>}
              {tone === 'good' && <span style={{ marginLeft: 'auto', color: look.good }}>✓</span>}
            </div>
          </At>
        );
      })}
    </>
  );
};

const CommitList: React.FC<{ x: number; list: Cm[]; label?: string }> = ({ x, list, label }) => {
  const { look, frame, fps, t } = useMotion();
  const shown = list.slice(-4);
  return (
    <>
      {label && <At x={x} y={-250}><div style={{ fontFamily: FONT.mono, fontWeight: 800, fontSize: 18, color: look.inkSoft, letterSpacing: '0.1em' }}>{label}</div></At>}
      {shown.map((cm, i) => {
        const y = -130 + (shown.length - 1 - i) * 86;
        const col = cm.tone === 'problem' ? look.problem : cm.tone === 'good' ? look.good : cm.tone === 'accent' ? look.accent2 : GIT_C;
        const born = BORN[cm.id + (x === X_HUB ? '@hub' : '')] ?? BORN[cm.id] ?? -10;
        const k = t < born + 1.2 ? pop(frame, fps, born, { damping: 10 }) : 1;
        const flash = t >= born && t < born + 0.6 ? 1 - prog(t, born, born + 0.6) : 0;
        return (
          <At key={cm.id + cm.msg} x={x} y={y + 20} z={2}>
            <div style={{ width: 270, padding: '10px 14px', borderRadius: 14, background: '#1E2127', border: `2px solid ${col}`, boxSizing: 'border-box', transform: `scale(${Math.max(0.001, k)})`, boxShadow: flash ? `0 0 ${30 * flash}px ${col}` : 'none' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: FONT.mono, fontWeight: 800, fontSize: 17, color: col }}><GitCommitHorizontal size={18} />{cm.id}</div>
              <div style={{ fontFamily: FONT.sans, fontWeight: 650, fontSize: 21, color: look.ink, marginTop: 2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{cm.msg}</div>
            </div>
          </At>
        );
      })}
    </>
  );
};

const LocalCommits: React.FC = () => {
  const { t } = useMotion();
  return <CommitList x={AX[2]} list={commitsAt(t)} />;
};

const Hub: React.FC = () => {
  const { look, t, frame, fps } = useMotion();
  const k = pop(frame, fps, T.hub - 0.3, { damping: 12 });
  if (k <= 0) return null;
  // GitHub has what was pushed: up to the bad commit, then the revert once it's pushed
  const all = commitsAt(t).filter((cm) => cm.id !== '9c1d4aa');
  const pushed = all.filter((cm) => cm.id !== '7ee2a91' || t >= T.adds);
  const mismatch = t >= T.rewrite && t < T.revert;
  const team = t >= T.team ? 3 : 0;
  return (
    <>
      <At x={X_HUB} y={0}>
        <div style={{ width: 330, height: 470, borderRadius: 26, background: 'rgba(36,39,45,0.92)', border: `2.5px solid ${mismatch ? look.problem : HUB_C}`, boxShadow: `0 0 ${30 + 14 * Math.sin(t * 3)}px ${mismatch ? look.problem : HUB_C}44`, transform: `scale(${k})`, padding: '18px 16px', boxSizing: 'border-box' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontFamily: FONT.mono, fontWeight: 800, fontSize: 24, letterSpacing: '0.12em', color: HUB_C }}><FaGithub size={28} />GITHUB</div>
          <div style={{ fontFamily: FONT.mono, fontSize: 17, color: look.inkSoft, marginTop: 2 }}>{mismatch ? 'history doesn’t match ✗' : 'what your team has'}</div>
        </div>
      </At>
      <CommitList x={X_HUB} list={pushed} />
      {Array.from({ length: team }, (_, i) => (
        <At key={i} x={X_HUB - 110 + i * 110} y={290} z={3}>
          <div style={{ width: 60, height: 60, borderRadius: 30, background: NT.ramp[i], display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${pop(frame, fps, T.team + i * 0.08, { damping: 11 })})`, boxShadow: t >= c('teammates', 'c4b') && t < T.revert ? `0 0 20px ${NT.ramp[i]}` : 'none' }}><User size={32} color="#fff" /></div>
        </At>
      ))}
    </>
  );
};

const StashBox: React.FC = () => {
  const { look, t, frame, fps } = useMotion();
  if (t < T.stash - 0.2 || t >= S('c3d')) return null;
  const full = t >= T.stash && t < T.later;
  return (
    <At x={AX[0]} y={300} z={3}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 18px', borderRadius: 16, background: '#2A2E35', border: `2.5px dashed ${full ? look.accent2 : look.inkFaint}`, fontFamily: FONT.mono, fontWeight: 800, fontSize: 22, color: look.ink, transform: `scale(${pop(frame, fps, T.stash - 0.2, { damping: 12 })})` }}>
        <Archive size={26} color={look.accent2} />{full ? 'stash@{0}: notes.txt' : 'stash (empty)'}
      </div>
    </At>
  );
};

/* ───────────── hook visual (frame 0 = cover) ───────────── */
const HookArt: React.FC<{ still?: boolean }> = ({ still }) => {
  const { look, t, frame, fps } = useMotion();
  const del = still ? 1e9 : c('delete', 'h2'), save = still ? 1e9 : c("don't", 'h2');
  const fly = t >= del && t < save ? prog(t, del, del + 0.6) : t >= save ? 1 - prog(t, save, save + 0.5) : 0;
  // visible from frame 0 (it's the cover), with a bounce when "undo" is spoken
  const ua = c('undo', 'h1');
  const uk = still ? 1 : 1 + (t >= ua && t < ua + 0.5 ? 0.15 * Math.sin(prog(t, ua, ua + 0.5) * Math.PI) : 0);
  void frame; void fps;
  const big = !still && t >= save && t < save + 0.6 ? 1 + 0.12 * Math.sin(prog(t, save, save + 0.6) * Math.PI) : 1;
  return (
    <div style={{ position: 'relative', width: 900, height: 470 }}>
      <div style={{ position: 'absolute', left: 40, top: 40, width: 380, borderRadius: 18, background: '#0E1014', border: `1.5px solid ${look.cardEdge}`, padding: '16px 20px', fontFamily: FONT.mono, fontSize: 24, lineHeight: 1.6 }}>
        <div style={{ color: look.inkSoft }}>$ git push</div>
        <div style={{ color: look.problem, fontWeight: 800 }}>error: failed to push</div>
        <div style={{ color: look.problem }}>! [rejected]</div>
        <div style={{ color: look.inkFaint }}>$ <span style={{ display: 'inline-block', width: 12, height: 24, background: look.ink, verticalAlign: 'middle', opacity: Math.floor(t * 2.4) % 2 ? 0 : 1 }} /></div>
      </div>
      <div style={{ position: 'absolute', left: 120 + fly * 560, top: 290 + Math.sin(fly * Math.PI) * -120 + fly * 20, display: 'flex', flexDirection: 'column', alignItems: 'center', transform: `rotate(${fly * 25}deg) scale(${1 - fly * 0.45})`, opacity: 1 - fly * 0.3 }}>
        <Folder size={110} color={look.warm} fill={`${look.warm}33`} />
        <div style={{ fontFamily: FONT.mono, fontWeight: 800, fontSize: 22, color: look.ink }}>my-project</div>
      </div>
      <div style={{ position: 'absolute', left: 700, top: 300, color: fly > 0.5 ? look.problem : look.inkFaint }}><Trash2 size={110} /></div>
      <div style={{ position: 'absolute', left: 500, top: 70, transform: `scale(${uk * big}) rotate(-6deg)`, display: 'flex', alignItems: 'center', gap: 14, padding: '22px 34px', borderRadius: 26, background: look.good, color: '#0E1014', fontFamily: FONT.display, fontWeight: 700, fontSize: 72, boxShadow: `0 18px 0 #2E7A3A, 0 24px 50px ${look.good}55` }}>
        <Undo2 size={70} strokeWidth={3} />UNDO
      </div>
    </div>
  );
};

/** faint code glyphs drifting upward: ambient motion for the dark world (QA near-still gate) */
const Drift: React.FC = () => {
  const { t } = useMotion();
  const glyphs = ['{', '}', ';', '0', '1', '<>', '#', '+', '/', '=>'];
  return (
    <AbsoluteFill style={{ pointerEvents: 'none' }}>
      {Array.from({ length: 26 }, (_, i) => {
        const sp = 55 + rnd(i + 5) * 60;
        const y = ((rnd(i) * 1920 - t * sp) % 1920 + 1920) % 1920;
        const x = rnd(i + 11) * 1080 + Math.sin(t * 0.7 + i) * 18;
        return <div key={i} style={{ position: 'absolute', left: x, top: y, fontFamily: FONT.mono, fontWeight: 800, fontSize: 46 + rnd(i + 3) * 44, color: i % 3 ? '#4A5468' : '#5A4438', opacity: 0.75 }}>{glyphs[i % glyphs.length]}</div>;
      })}
    </AbsoluteFill>
  );
};

/* ───────────── overlays ───────────── */
const Ov: React.FC<{ a: number; b: number; x?: number; y?: number; children: React.ReactNode }> = ({ a, b, x = 540, y = OY, children }) => {
  const { t, frame, fps } = useMotion();
  if (t < a || t >= b) return null;
  const k = life(t, frame, fps, a, b);
  return <At x={x} y={y}><div style={{ opacity: Math.min(1, k * 1.3), transform: `translateY(${(1 - Math.min(1, k)) * 24}px)` }}>{children}</div></At>;
};
const Col: React.FC<{ children: React.ReactNode; w?: number }> = ({ children, w = 1000 }) => <div style={{ width: w, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>{children}</div>;

/** terminal card: each row types in on its cue word */
const Term: React.FC<{ title?: string; rows: [React.ReactNode, number][]; w?: number; size?: number }> = ({ title = 'terminal', rows, w = 820, size = 30 }) => {
  const { look, t, frame, fps } = useMotion();
  return (
    <div style={{ width: w, background: '#0E1014', border: `1.5px solid ${look.cardEdge}`, borderRadius: 20, overflow: 'hidden', boxShadow: `0 14px 34px ${look.cardShadow}` }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '9px 16px', borderBottom: `1.5px solid ${look.cardEdge}` }}>
        {['#F0614F', '#F2C76B', '#86C98A'].map((col) => <div key={col} style={{ width: 12, height: 12, borderRadius: 6, background: col }} />)}
        <span style={{ marginLeft: 8, fontFamily: FONT.mono, fontWeight: 700, fontSize: 16, letterSpacing: '0.1em', color: look.inkSoft }}>{title}</span>
      </div>
      <div style={{ padding: '14px 20px', display: 'flex', flexDirection: 'column', gap: 8 }}>
        {rows.map(([r, at], i) => {
          const k = pop(frame, fps, at, { damping: 14 });
          const typed = prog(t, at, at + 0.45);   // typewriter reveal: a short motion burst per command
          return <div key={i} style={{ fontFamily: FONT.mono, fontSize: size, fontWeight: 700, color: look.ink, opacity: k > 0 ? Math.min(1, k * 1.4) : 0.08, whiteSpace: 'pre', background: t >= at && t < at + 0.6 ? 'rgba(255,255,255,0.07)' : 'transparent', borderRadius: 6, clipPath: t >= at ? `inset(0 ${(1 - typed) * 100}% 0 0)` : 'none' }}>{r}</div>;
        })}
      </div>
    </div>
  );
};
const P: React.FC = () => <span style={{ color: NT.good }}>$ </span>;
const Y: React.FC<{ c: string; children: React.ReactNode }> = ({ c: col, children }) => <span style={{ color: col }}>{children}</span>;

/* ───────────── camera ───────────── */
const CAM = (t: number) => camAt([
  { t: 0, x: 0, y: 0, z: 0.95 },
  { t: T.hub - 0.5, x: 705, y: 0, z: 0.92, dur: 1.1 },
  { t: S('c5a') - 0.2, x: 0, y: 0, z: 0.95, dur: 1.0 },
  { t: S('t1') - 0.1, x: SIDE(0.62, 120), y: 0, z: 0.62, dur: 1.0 },
], t);

const CHAPTERS: [string, string, string][] = [['c1a', '01', 'Committed too early'], ['c2a', '02', 'Wrong file staged'], ['c3a', '03', 'Broke a file'], ['c4a', '04', 'Already pushed'], ['c5a', '05', 'Deleted a branch']];

/* ───────────── scene ───────────── */
const Scene: React.FC = () => {
  loadMotionFonts();
  const { look, t, frame, fps } = useMotion();
  const cam0 = CAM(t);
  const cam = { ...cam0, x: cam0.x + Math.sin(t * 1.1) * 12 / cam0.z, y: cam0.y + Math.sin(t * 0.8 + 1) * 8 / cam0.z };
  const br = L('bridge');
  const end = vo.duration + 0.25;
  const worldOn = prog(t, WORLD_AT - 0.1, WORLD_AT + 0.3)
    * (1 - 0.85 * prog(t, S('t1') - 0.2, S('t1') + 0.3))
    * (1 - prog(t, S('punch') - 0.3, S('punch')));
  const reflogRows: [React.ReactNode, number][] = [
    [<><P />git reflog</>, T.reflog],
    [<><Y c={NT.warm}>e02b7f1</Y> HEAD@{'{0}'}: checkout: to main</>, c('Every', 'c5c')],
    [<><Y c={NT.warm}>9c1d4aa</Y> HEAD@{'{1}'}: commit: finish login</>, c('moves', 'c5c')],
    [<><Y c={NT.warm}>3f8e2b0</Y> HEAD@{'{2}'}: commit: login form</>, c('writes', 'c5c')],
    [<><P />git branch rescued 9c1d4aa</>, T.rescue],
  ];
  const hot = t >= T.find && t < T.rescue + 1.5;

  return (
    <AbsoluteFill>
      <Backdrop cam={cam} />
      <Drift />

      {worldOn > 0.001 && (
        <AbsoluteFill style={{ opacity: worldOn }}>
          <World cam={cam} centerY={740}>
            {[0, 1, 2].map((i) => <AreaPanel key={i} i={i} />)}
            <LocalCommits />
            <Files />
            <StashBox />
            <Hub />
          </World>
        </AbsoluteFill>
      )}

      {/* ── HUD: series + oh-nos fixed + command chips ── */}
      <HudSeries series="Undo in Git" pulseTeyro={[br.start, S('cta')]}
        chapters={[{ t: 0, text: 'undo anything' }, ...CHAPTERS.map(([id, n, name]) => ({ t: S(id), text: `${n} · ${name}` })), { t: S('t1'), text: 'the rule' }, { t: S('recap'), text: 'recap' }]}
        counter={{ unit: 'oh-nos fixed', icon: <RotateCcw size={26} color={NT.good} />, format: fmt.int, keys: [{ t: 0, v: 0 }, { t: c('fixed', 'c1b'), v: 1, dur: 0.3 }, { t: T.safe2, v: 2, dur: 0.3 }, { t: c('commit', 'c3b'), v: 3, dur: 0.3 }, { t: c('everyone', 'c4c'), v: 4, dur: 0.3 }, { t: c('there', 'c5c'), v: 5, dur: 0.3 }] }}
        chips={[{ label: 'Amend', t: T.amend }, { label: 'Reset', t: T.reset }, { label: 'Restore', t: c('restore', 'c2b') }, { label: 'Stash', t: T.stash }, { label: 'Revert', t: T.revert }, { label: 'Reflog', t: T.reflog }]} />

      {/* ── HOOK (frame 0 = cover) ── */}
      <TitleCard title={['UNDO ANYTHING', 'IN GIT']} kicker="I WISH I KNEW THIS SOONER" until={S('c1a') - 0.1} titleSize={112} top={400}><HookArt /></TitleCard>
      <Ov a={c('five', 'h3')} b={S('c1a')} y={1360}>
        <div style={{ display: 'flex', gap: 12 }}>{[1, 2, 3, 4, 5].map((n, i) => <Tag key={n} at={c('five', 'h3') + i * 0.14} text={`oh-no ${n}`} size={22} tone="problem" />)}</div>
      </Ov>

      {/* ── chapter cards ── */}
      {CHAPTERS.map(([id, n, name]) => <ChapterCard key={id} at={S(id)} until={S(id) + 2.4} n={n} title={name} sub="OH-NO" size={96} y={392} color={look.problem} />)}

      {/* ── 01 committed too early ── */}
      <Ov a={T.forgot} b={S('c1b')}><div style={{ display: 'flex', gap: 14 }}><Tag at={T.forgot} text="forgot style.css" size={26} tone="problem" /><Tag at={T.typo} text="typo: 'lgoin'" size={26} tone="problem" /></div></Ov>
      <Ov a={S('c1b')} b={S('c1c')}><Term rows={[[<><P />git add style.css</>, T.addCss], [<><P />git commit <Y c={NT.warm}>--amend</Y></>, T.amend], [<><Y c={NT.good}>✓ last commit replaced</Y></>, c('fixed', 'c1b')]]} /></Ov>
      <Ov a={S('c1c')} b={S('c2a')}>
        <Col>
          <Term rows={[[<><P />git reset <Y c={NT.warm}>--soft</Y> HEAD~1</>, T.reset], [<><Y c={NT.inkSoft}># HEAD~1 = one commit back</Y></>, c('Tilde', 'c1c')], [<><Y c={NT.good}>✓ commit undone · changes still staged</Y></>, T.disappears]]} />
          <Footnote at={T.reset} text="git-scm.com/docs/git-reset · 'Undo a commit and redo'" />
        </Col>
      </Ov>

      {/* ── 02 wrong file staged ── */}
      <Ov a={T.addNotes} b={S('c2b')}><Tag at={T.addNotes} text="notes.txt wasn't ready" size={28} tone="problem" /></Ov>
      <Ov a={S('c2b')} b={S('c3a')}><Term rows={[[<><P />git restore <Y c={NT.warm}>--staged</Y> notes.txt</>, c('staged', 'c2b')], [<><Y c={NT.good}>✓ unstaged · your edits are safe</Y></>, T.unstage]]} /></Ov>

      {/* ── 03 broke a file ── */}
      <Ov a={T.broken} b={S('c3b')}><Tag at={T.broken} text="app.js is broken" size={28} tone="problem" /></Ov>
      <Ov a={S('c3b')} b={S('c3c')}><Term rows={[[<><P />git restore app.js</>, T.restore], [<><Y c={NT.good}>✓ back to your last commit</Y></>, T.back3]]} /></Ov>
      <Ov a={S('c3c')} b={S('c3d')}>
        <Col>
          <Badge at={c('Careful', 'c3c')} text="UNCOMMITTED CHANGES ARE GONE FOR GOOD" />
          {t >= T.stash - 0.1 && <Term w={760} rows={[[<><P />git stash</>, T.stash], [<><Y c={NT.inkSoft}># …later…</Y></>, c('bring', 'c3c')], [<><P />git stash pop</>, T.later]]} />}
        </Col>
      </Ov>
      <Ov a={S('c3d')} b={br.start + 0.1}><Col><BigText at={c('pulled', 'c3d')} lines={['ALREADY PUSHED?']} size={84} align="center" color={look.problem} /></Col></Ov>

      {/* ── Teyro mid bridge ── */}
      <TeyroBridge at={br.start} until={S('back') + 0.2} line="Learn Git, GitHub and GitHub Actions" chips={['Free course', 'Git → GitHub Actions', 'A few minutes a day']}
        chipTimes={[c('free', 'bridge'), c('course', 'bridge'), c('Teyro', 'bridge')]} beats={[c('Quick', 'bridge'), c('Actions', 'bridge'), c('Okay', 'back')]} />

      {/* ── 04 already pushed ── */}
      <Ov a={T.noReset} b={S('c4c')}>
        <Col>
          <Strike text="git reset" at={T.noReset} strikeAt={T.noReset + 0.3} size={64} />
          <Tag at={T.rewrite} text="rewrite shared history = chaos" size={26} tone="problem" />
          <Footnote at={T.rewrite} text="Pro Git · Rewriting History" />
        </Col>
      </Ov>
      <Ov a={S('c4c')} b={S('c5a')}>
        <Col>
          <Term rows={[[<><P />git revert <Y c={NT.warm}>b4d0c0d</Y></>, T.revert], [<><Y c={NT.good}>✓ new commit: Revert 'bad change'</Y></>, T.adds], [<><P />git push</>, T.opposite]]} />
          <div style={{ display: 'flex', gap: 12 }}><Tag at={c('delete', 'c4c')} text="deletes nothing" size={24} /><Badge at={T.safe4} text="SAFE FOR EVERYONE" tone="good" /></div>
        </Col>
      </Ov>

      {/* ── 05 deleted a branch ── */}
      <Ov a={T.deleted} b={S('c5b')}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '18px 24px', borderRadius: 20, background: '#2A2E35', border: `2.5px solid ${look.problem}` }}>
          <GitBranch size={36} color={look.problem} /><div><div style={{ fontFamily: FONT.mono, fontWeight: 800, fontSize: 28, color: look.ink, textDecoration: 'line-through' }}>feature-login</div><div style={{ fontFamily: FONT.mono, fontSize: 19, color: look.inkSoft }}>3 commits · a week of work</div></div>
          <Badge at={T.deleted + 0.2} text="DELETED" />
        </div>
      </Ov>
      <Ov a={c('secret', 'c5b')} b={S('c5c')}><Col><Tag at={c('diary', 'c5b')} text="git keeps a diary" size={30} /><BigText at={T.reflog} lines={['REFLOG']} size={110} align="center" color={look.accent2} /></Col></Ov>
      <Ov a={S('c5c')} b={S('t1')} y={OY - 20}>
        <Col>
          <div style={{ position: 'relative' }}>
            <Term title="terminal · reflog" w={860} size={26} rows={reflogRows} />
            {hot && <div style={{ position: 'absolute', left: 14, right: 14, top: 118, height: 40, borderRadius: 8, border: `3px solid ${look.good}`, boxShadow: `0 0 20px ${look.good}66` }} />}
          </div>
          {t >= S('c5d') && <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}><Tag at={c('amend', 'c5d')} text="amended commits too" size={22} /><Tag at={c('thirty', 'c5d')} text="kept 30 days by default" size={22} tone="good" solid /></div>}
          {t >= S('c5d') && <Footnote at={c('thirty', 'c5d')} text="git-scm.com/docs/git-gc · gc.reflogExpireUnreachable = 30 days" />}
        </Col>
      </Ov>

      {/* ── the rule (Remi on, side stage) ── */}
      <Ov a={c('Anything', 't1')} b={S('t2')} x={SX} y={1080}>
        <Col w={600}>
          <Split at={c('Anything', 't1')} rightAt={c('Anything', 't1', 2)} w={600} h={190}
            left={{ title: 'Committed', tone: 'good', body: <div style={{ fontFamily: FONT.display, fontWeight: 700, fontSize: 34, color: look.good }}>almost always recoverable</div> }}
            right={{ title: 'Never committed', tone: 'problem', body: <div style={{ fontFamily: FONT.display, fontWeight: 700, fontSize: 34, color: look.problem }}>likely gone forever</div> }} />
          <Footnote at={c('recovered', 't1')} width={600} text="Pro Git · Undoing Things" />
        </Col>
      </Ov>
      <Ov a={S('t2')} b={S('recap')} x={SX} y={1060}><Col w={620}><BigText at={c('commit', 't2')} lines={['COMMIT EARLY.', 'COMMIT OFTEN.']} size={72} align="center" color={look.good} /></Col></Ov>

      {/* ── recap (Remi on) ── */}
      <At x={SX} y={940}>
        {t < S('punch') && (
          <div style={{ opacity: 1 - prog(t, S('punch') - 0.25, S('punch')) }}>
            <Recap width={590} titleAt={S('recap')} items={[
              { text: 'Too early → amend', at: c('Amend', 'recap') }, { text: 'Wrong file → restore --staged', at: c('staged', 'recap') }, { text: 'Broken file → restore', at: c('Restore', 'recap', 2) },
              { text: 'Pushed → revert', at: c('Revert', 'recap') }, { text: 'Lost branch → reflog', at: c('Reflog', 'recap') },
            ]} />
          </div>
        )}
      </At>

      {/* ── punchline ── */}
      {t >= S('punch') && t < S('cta') && (
        <AbsoluteFill style={{ opacity: 1 - prog(t, S('cta') - 0.2, S('cta')) }}>
          <At x={540} y={820} w={1040}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
              {([["GIT DOESN'T PUNISH", c('Git', 'punch'), look.inkSoft], ['MISTAKES.', c('mistakes', 'punch'), look.inkSoft], ['IT NEEDS YOU', c('needs', 'punch'), look.ink], ['TO COMMIT.', c('commit', 'punch'), look.good]] as [string, number, string][]).map(([txt, at, col]) => {
                const k = pop(frame, fps, at, { damping: 10 });
                return <div key={txt} style={{ fontFamily: FONT.display, fontWeight: 700, fontSize: 92, lineHeight: 1.04, letterSpacing: '-0.03em', color: col, transform: `scale(${k})`, opacity: Math.min(1, k * 1.5), whiteSpace: 'nowrap' }}>{txt}</div>;
              })}
            </div>
          </At>
        </AbsoluteFill>
      )}

      {/* ── Teyro outro + loop back to the cover ── */}
      <TeyroOutro at={S('cta')} until={end - 0.45} headline="Learn Git, GitHub and GitHub Actions. Free." ask="Search Teyro" />
      <LoopBack from={end - 0.45} dur={0.4}>
        <AbsoluteFill style={{ background: NT.bg }}>
          <Backdrop />
          <div style={{ position: 'absolute', left: Z.gutter + 10, right: Z.gutter + 10, top: 400, textAlign: 'center' }}>
            {['UNDO ANYTHING', 'IN GIT'].map((l) => <div key={l} style={{ fontFamily: FONT.display, fontWeight: 700, fontSize: 112, lineHeight: 0.95, letterSpacing: '-0.035em', color: NT.ink }}>{l}</div>)}
            <div style={{ marginTop: 22, fontFamily: FONT.mono, fontWeight: 700, fontSize: 30, letterSpacing: '0.42em', color: NT.problem }}>I WISH I KNEW THIS SOONER</div>
          </div>
          <div style={{ position: 'absolute', left: 0, right: 0, top: 400 + 2 * 112 + 120, bottom: 1920 - Z.stageBottom - 40, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><HookArt still /></div>
        </AbsoluteFill>
      </LoopBack>

      {/* ── host + captions ── */}
      <Host on={[[S('t1'), S('punch') - 0.1]]}
        poses={[{ t: 0, p: 'idle' }, { t: S('t1'), p: 'pointUp' }, { t: c('Anything', 't1'), p: 'point' }, { t: c('Anything', 't1', 2), p: 'think' }, { t: S('t2'), p: 'wow' }, { t: S('recap'), p: 'explain' }, { t: c('Reflog', 'recap'), p: 'wow' }]} />
      <Captions hideBetween={[[br.start, S('back') + 0.2]]} />
    </AbsoluteFill>
  );
};

/* ───────────── sound design ───────────── */
const SFX: SfxCue[] = [
  { t: 0.05, s: 'boom' }, { t: c('undo', 'h1'), s: 'success', v: 0.7 },
  { t: c('panic', 'h2'), s: 'error', v: 0.5 }, { t: c('delete', 'h2'), s: 'swoosh' }, { t: c("don't", 'h2'), s: 'chime', v: 0.7 },
  ...ticks([0, 1, 2, 3, 4].map((i) => c('five', 'h3') + i * 0.14), 'pop'),
  { t: WORLD_AT, s: 'whoosh' },
  ...CHAPTERS.flatMap(([id]) => revealCues(S(id)).map((x) => ({ ...x, v: 0.55 }))),
  { t: T.commit1, s: 'pop' }, { t: T.forgot, s: 'error', v: 0.5 }, { t: T.typo, s: 'error', v: 0.5 },
  { t: T.addCss, s: 'swoosh' }, { t: T.amend, s: 'type', v: 0.6 }, { t: c('fixed', 'c1b'), s: 'success', v: 0.7 },
  { t: T.reset, s: 'type', v: 0.6 }, { t: T.disappears, s: 'swoosh' }, { t: T.ready, s: 'success', v: 0.5 },
  { t: T.addNotes, s: 'swoosh' }, { t: c('staged', 'c2b'), s: 'type', v: 0.6 }, { t: T.unstage, s: 'swoosh' }, { t: T.safe2, s: 'success', v: 0.6 },
  { t: T.recommit, s: 'pop' }, { t: T.broken, s: 'error' }, { t: T.restore, s: 'type', v: 0.6 }, { t: T.back3, s: 'success', v: 0.7 },
  { t: c('Careful', 'c3c'), s: 'error', v: 0.6 }, { t: T.stash, s: 'swoosh' }, { t: T.later, s: 'pop' },
  { t: T.hub - 0.5, s: 'whoosh' }, { t: T.team, s: 'pop' }, { t: c('pulled', 'c3d'), s: 'boom', v: 0.6 },
  { t: S('bridge'), s: 'chime' }, { t: S('back'), s: 'whoosh', v: 0.6 },
  { t: T.bad, s: 'error' }, { t: T.noReset, s: 'swoosh' }, { t: T.rewrite, s: 'glitch' },
  { t: T.revert, s: 'type', v: 0.6 }, { t: T.adds, s: 'pop' }, { t: T.opposite, s: 'swoosh' }, { t: T.safe4, s: 'success', v: 0.7 },
  { t: S('c5a') - 0.2, s: 'whoosh', v: 0.6 }, { t: T.deleted, s: 'shatter' }, { t: c('diary', 'c5b'), s: 'pop' }, { t: T.reflog, s: 'boom', v: 0.6 },
  ...ticks([c('Every', 'c5c'), c('moves', 'c5c'), c('writes', 'c5c')]), { t: T.find, s: 'tick' }, { t: T.rescue, s: 'success' },
  { t: c('thirty', 'c5d'), s: 'pop' },
  { t: S('t1') - 0.1, s: 'whoosh', v: 0.6 }, { t: c('Anything', 't1'), s: 'swoosh' }, { t: c('Anything', 't1', 2), s: 'swoosh' }, { t: c('forever', 't1'), s: 'error', v: 0.5 },
  { t: c('commit', 't2'), s: 'boom', v: 0.6 },
  ...revealCues(S('recap')).map((x) => ({ ...x, v: 0.5 })), ...ticks([c('Amend', 'recap'), c('staged', 'recap'), c('Restore', 'recap', 2), c('Revert', 'recap'), c('Reflog', 'recap')], 'pop'),
  { t: c('Git', 'punch'), s: 'boom', v: 0.6 }, { t: c('commit', 'punch'), s: 'boom', v: 0.8 },
  { t: S('cta'), s: 'whoosh' }, { t: S('cta') + 0.6, s: 'pop' },
];

export const M5: React.FC = () => (
  <MotionProvider look="night" vo={vo}>
    <Scene />
    <SoundLayer slug={SLUG} sfx={SFX} />
  </MotionProvider>
);
