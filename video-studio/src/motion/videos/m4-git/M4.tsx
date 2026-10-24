import React from 'react';
import { AbsoluteFill, Easing } from 'remotion';
import { Bot, Check, Coffee, FileCode, Folder, GitBranch, GitCommitHorizontal, GitMerge, GitPullRequest, Globe, Laptop, User } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import {
  At, Backdrop, Badge, BigText, Captions, ChapterCard, Checklist, Footnote, Host, HudSeries, LoopBack, MotionProvider, Recap, SfxCue,
  SoundLayer, Tag, TeyroBridge, TeyroOutro, TitleCard, Ticker, VO, Wire, World, camAt, cue, fmt, life, line,
  loadMotionFonts, pop, prog, revealCues, rnd, ticks, useMotion, Z, FONT, LOOKS,
} from '../../kit';
import voJson from './vo.json';

const vo = voJson as VO;
const SLUG = 'm4-git';
const NT = LOOKS.night;
export const M4_DURATION = Math.ceil((vo.duration + 0.25) * 30);

/* ───────────── timing helpers ───────────── */
const L = (id: string) => line(vo, id);
const c = (w: string, after?: string | number, n = 1) => cue(vo, w, { n, after: typeof after === 'string' ? L(after).start : after });
const S = (id: string) => L(id).start;
const OY = 1240;
const SX = 700;
const SIDE = (z: number, cx = 0) => cx - (Z.sideCx - 540) / z;

/* stations, left → right: laptop → GitHub → robot → live */
const X_LAP = 0, X_HUB = 1000, X_BOT = 2000, X_LIVE = 2900;
const WORLD_AT = c('follow', 'h4');
const GIT_C = '#F05133';       // Git orange (accent for "Git")
const HUB_C = '#B79CFF';       // GitHub purple-ish (accent for "GitHub")

/* commits on the laptop's graph (main lane y=250, branch lane y=170) */
const COMMITS: { x: number; lane: 0 | 1; at: number; id: string }[] = [
  { x: -220, lane: 0, at: c('snapshot', 'c2a'), id: '3f9a1c2' },
  { x: -110, lane: 0, at: c('Each', 'c2b'), id: '8b7d0e4' },
  { x: 0, lane: 0, at: c('commit', 'c2c'), id: 'c41e9aa' },
  { x: 110, lane: 1, at: c('parallel', 'c3a'), id: 'e02b7f1' },
  { x: 220, lane: 0, at: c('merges', 'c5b'), id: '91d3c5e' },
  { x: 330, lane: 0, at: c('Commit', 't1'), id: 'a7f20b3' },
];
const laneY = (l: 0 | 1) => (l ? 200 : 285);

/* ───────────── frame 0 = cover: GIT ≠ GITHUB ───────────── */
const Versus: React.FC<{ still?: boolean }> = ({ still }) => {
  const { look, t, frame, fps } = useMotion();
  const gitHot = !still && t >= S('h2') && t < S('h3');
  const hubHot = !still && t >= S('h3') && t < S('h4');
  const ver = still ? 0 : [c('remembers', 'h2'), c('every', 'h2'), c('version', 'h2')].filter((x) => t >= x).length;
  const team = still ? 0 : [c('whole', 'h3'), c('team', 'h3'), c('work', 'h3')].filter((x) => t >= x).length;
  const neq = still ? 1 : frame === 0 ? 1 : pop(frame, fps, 0.2, { damping: 9 });
  const tile = (hot: boolean, col: string, icon: React.ReactNode, name: string, sub: string, extra: React.ReactNode) => (
    <div style={{ width: 380, height: 430, borderRadius: 34, background: look.card, border: `3px solid ${hot ? col : look.cardEdge}`, boxShadow: hot ? `0 0 50px ${col}55` : `0 18px 40px ${look.cardShadow}`, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '34px 20px', boxSizing: 'border-box', transform: `scale(${hot ? 1.05 + 0.015 * Math.sin(t * 6) : 1}) translateY(${still ? 0 : Math.sin(t * 2.4 + (col === GIT_C ? 0 : 1.6)) * 8}px)` }}>
      <div style={{ color: col }}>{icon}</div>
      <div style={{ fontFamily: FONT.display, fontWeight: 700, fontSize: 64, color: look.ink, marginTop: 10 }}>{name}</div>
      <div style={{ fontFamily: FONT.mono, fontWeight: 700, fontSize: 21, letterSpacing: '0.12em', color: col, marginTop: 4 }}>{sub}</div>
      <div style={{ marginTop: 22 }}>{extra}</div>
    </div>
  );
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 22 }}>
      {tile(gitHot, GIT_C, <Laptop size={96} strokeWidth={1.8} />, 'Git', 'ON YOUR LAPTOP',
        <div style={{ display: 'flex', gap: 10 }}>{['v1', 'v2', 'v3'].map((v, i) => <div key={v} style={{ padding: '8px 14px', borderRadius: 12, border: `2px solid ${GIT_C}`, fontFamily: FONT.mono, fontWeight: 800, fontSize: 24, color: look.ink, opacity: i < ver ? 1 : 0.18, transform: `scale(${i < ver ? 1 : 0.9})` }}>{v}</div>)}</div>)}
      <div style={{ fontFamily: FONT.display, fontWeight: 700, fontSize: 120, color: look.problem, transform: `scale(${neq})` }}>≠</div>
      {tile(hubHot, HUB_C, <FaGithub size={96} />, 'GitHub', 'A WEBSITE',
        <div style={{ display: 'flex', gap: 10 }}>{[0, 1, 2].map((i) => <div key={i} style={{ width: 52, height: 52, borderRadius: 26, background: i < team ? NT.ramp[i] : 'transparent', border: `2px solid ${NT.ramp[i]}`, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: i < team ? 1 : 0.25 }}><User size={28} color="#fff" /></div>)}</div>)}
    </div>
  );
};

/* ───────────── world parts ───────────── */
const LaptopStation: React.FC = () => {
  const { look, t, frame, fps } = useMotion();
  const k = pop(frame, fps, WORLD_AT, { damping: 13 });
  const coffee = c('Spill', 'c4a');
  const wet = t >= coffee && t < c('push', 'c4b');
  const shake = t >= coffee && t < coffee + 0.5 ? Math.sin(t * 80) * 10 * (1 - prog(t, coffee, coffee + 0.5)) : 0;
  const mess = t < S('c2a');
  const files: [string, number][] = [['index.html', WORLD_AT + 0.2], ['final.html', c('Final', 'c1a')], ['final2.html', c('two', 'c1a')], ['final_REALLY_final.html', c('final', 'c1a', 3)]];
  const q = t >= c('Which', 'c1a');
  const fixed = t >= c('fix', 't1');
  return (
    <At x={X_LAP} y={-70}>
      <div style={{ transform: `translateX(${shake}px) scale(${k})`, position: 'relative' }}>
        <div style={{ width: 560, height: 330, borderRadius: '22px 22px 6px 6px', background: '#0E1014', border: `10px solid #2B2F36`, boxSizing: 'border-box', overflow: 'hidden', boxShadow: `0 0 0 2px ${look.cardEdge}` }}>
          {mess ? (
            <div style={{ padding: '18px 22px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontFamily: FONT.mono, fontSize: 19, fontWeight: 800, color: look.inkSoft, letterSpacing: '0.1em' }}><Folder size={22} color={look.warm} />MY-SITE</div>
              {files.map(([f, at]) => {
                const fk = pop(frame, fps, at, { damping: 12 });
                return <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 12, fontFamily: FONT.mono, fontSize: 25, fontWeight: 700, color: look.ink, opacity: fk, transform: `translateX(${(1 - Math.min(1, fk)) * -20}px)` }}><FileCode size={24} color={look.accent} />{f}{q && f !== 'index.html' && <span style={{ color: look.problem, fontWeight: 800 }}>?</span>}</div>;
              })}
            </div>
          ) : (
            <div style={{ padding: '16px 20px', fontFamily: FONT.mono, fontSize: 25, lineHeight: 1.65 }}>
              <div style={{ color: look.inkFaint, fontSize: 18, letterSpacing: '0.1em' }}>index.html</div>
              <div><span style={{ color: '#7FB0FF' }}>&lt;h1&gt;</span><span style={{ color: look.ink, textDecoration: fixed ? 'none' : `wavy underline ${look.problem}` }}>{fixed ? 'Hello' : 'Helo'} world</span><span style={{ color: '#7FB0FF' }}>&lt;/h1&gt;</span></div>
              <div><span style={{ color: '#7FB0FF' }}>&lt;p&gt;</span><span style={{ color: look.inkSoft }}>My first site</span><span style={{ color: '#7FB0FF' }}>&lt;/p&gt;</span></div>
              <div style={{ color: look.inkFaint }}>…<span style={{ display: 'inline-block', width: 3, height: 26, marginLeft: 4, background: look.accent, verticalAlign: 'middle', opacity: Math.floor(t * 2.4) % 2 ? 0 : 1 }} /></div>
            </div>
          )}
          {wet && <div style={{ position: 'absolute', left: 120, top: 70, width: 300, height: 180, borderRadius: '45% 55% 50% 40%', background: '#6B3F1E', opacity: 0.85 * prog(t, coffee, coffee + 0.4), transform: `scale(${prog(t, coffee, coffee + 0.4)})` }} />}
        </div>
        <div style={{ width: 640, height: 26, marginLeft: -40, borderRadius: '0 0 18px 18px', background: '#3A3F48' }} />
        <div style={{ position: 'absolute', left: -40, top: -46, display: 'flex', alignItems: 'center', gap: 8, fontFamily: FONT.mono, fontWeight: 800, fontSize: 20, letterSpacing: '0.12em', color: GIT_C }}><Laptop size={24} />YOUR LAPTOP · GIT</div>
      </div>
    </At>
  );
};

const CommitGraph: React.FC = () => {
  const { look, t, frame, fps } = useMotion();
  const first = COMMITS[0].at;
  if (t < first - 0.1) return null;
  const dim = 1 - 0.85 * (prog(t, S('c6a'), S('c6a') + 0.4) - prog(t, S('c7a') - 0.3, S('c7a')));
  const branchAt = c('branch', 'c3a', 2);
  const jump = t >= c('Jump', 'c2b') && t < S('c2c');
  const shown = COMMITS.filter((cm) => t >= cm.at);
  const last = shown[shown.length - 1];
  const head = jump ? COMMITS[0] : last;
  return (
    <div style={{ opacity: dim }}>
      <Wire pts={[[-260, laneY(0)], [Math.max(-200, ...shown.filter((x) => x.lane === 0).map((x) => x.x)), laneY(0)]]} at={first} drawDur={0.3} width={5} />
      {t >= branchAt && <Wire pts={[[0, laneY(0)], [55, laneY(1)], [165, laneY(1)]]} at={branchAt} drawDur={0.5} width={5} tone={t >= c('merges', 'c5b') ? 'good' : 'normal'} />}
      {t >= c('merges', 'c5b') && <Wire pts={[[165, laneY(1)], [220, laneY(0)]]} at={c('merges', 'c5b')} drawDur={0.3} width={5} tone="good" />}
      {shown.map((cm) => {
        const k = pop(frame, fps, cm.at, { damping: 10 });
        const isHead = cm === head;
        const col = cm.lane ? look.accent2 : GIT_C;
        return (
          <At key={cm.id} x={cm.x} y={laneY(cm.lane)} z={2}>
            <div style={{ width: 40, height: 40, borderRadius: 20, background: isHead ? col : look.bg, border: `5px solid ${col}`, boxShadow: isHead ? `0 0 ${18 + 14 * Math.sin(t * 5)}px ${col}` : 'none', transform: `scale(${k * (isHead ? 1 + 0.08 * Math.sin(t * 5) : 1)})` }} />
            {isHead && <div style={{ position: 'absolute', left: 20, top: -34, transform: 'translateX(-50%)', fontFamily: FONT.mono, fontWeight: 800, fontSize: 16, color: col, whiteSpace: 'nowrap' }}>{cm.id}</div>}
          </At>
        );
      })}
      {t >= branchAt && <At x={250} y={laneY(1)}><Tag at={branchAt} text="experiment" size={17} /></At>}
      <At x={-330} y={laneY(0)}><div style={{ fontFamily: FONT.mono, fontWeight: 800, fontSize: 18, color: look.inkSoft, opacity: prog(t, first, first + 0.3) }}>main</div></At>
    </div>
  );
};

const HubStation: React.FC = () => {
  const { look, t, frame, fps } = useMotion();
  const at = c('push', 'c4b') - 0.4;
  const k = pop(frame, fps, at, { damping: 12 });
  if (k <= 0) return null;
  const team = c('teammates', 'c4b');
  const ten = c('ten', 'c4d');
  const n = t >= ten ? 10 : t >= team ? 3 : 0;
  const pr = t >= S('c5a') && t < S('c6a');
  return (
    <>
      <At x={X_HUB} y={-70}>
        <div style={{ width: 560, height: 360, borderRadius: 40, background: look.card, border: `3px solid ${HUB_C}`, boxShadow: `0 0 ${36 + 20 * Math.sin(t * 3)}px ${HUB_C}44`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12, transform: `scale(${k})` }}>
          <FaGithub size={92} color={look.ink} />
          <div style={{ fontFamily: FONT.display, fontWeight: 700, fontSize: 44, color: look.ink }}>github.com</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: FONT.mono, fontSize: 22, fontWeight: 700, color: look.inkSoft }}>kemi / my-site<span style={{ color: HUB_C }}>· {COMMITS.filter((cm) => t >= cm.at).length} commits</span></div>
          {pr && <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 14px', borderRadius: 12, background: t >= c('merges', 'c5b') ? '#8957E5' : '#238636', color: '#fff', fontFamily: FONT.mono, fontWeight: 800, fontSize: 20 }}>{t >= c('merges', 'c5b') ? <GitMerge size={22} /> : <GitPullRequest size={22} />}{t >= c('merges', 'c5b') ? 'MERGED' : 'PULL REQUEST · OPEN'}</div>}
        </div>
      </At>
      {Array.from({ length: n }, (_, i) => {
        const a = (i / Math.max(1, n)) * Math.PI * 2 - Math.PI / 2;
        const r = n > 3 ? 330 : 310;
        const ak = pop(frame, fps, (n > 3 ? ten : team) + i * 0.06, { damping: 12 });
        return (
          <At key={i} x={X_HUB + Math.cos(a) * r * 1.05} y={-70 + Math.sin(a) * r * 0.72} z={3}>
            <div style={{ width: 62, height: 62, borderRadius: 31, background: NT.ramp[i % NT.ramp.length], display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${ak})`, boxShadow: '0 6px 16px rgba(0,0,0,0.4)' }}><User size={32} color="#fff" /></div>
          </At>
        );
      })}
    </>
  );
};

const BotStation: React.FC = () => {
  const { look, t, frame, fps } = useMotion();
  const at = S('c7a') - 0.3;
  const k = pop(frame, fps, at, { damping: 12 });
  if (k <= 0) return null;
  const awake = t >= c('robot', 'c7a');
  const steps: [string, number, number][] = [['install', c('installs', 'c7b'), c('project', 'c7b')], ['run tests', c('runs', 'c7b'), c('passes', 'c7b')], ['deploy', c('puts', 'c7b'), c('live', 'c7b')]];
  const j = t >= S('t1') ? Math.max(0, Math.min(1, prog(t, c('robot', 't1'), c('robot', 't1') + 0.6))) : 1;
  return (
    <At x={X_BOT} y={-70}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 34, transform: `scale(${k})` }}>
        <div style={{ width: 230, height: 230, borderRadius: 50, background: awake ? `${look.accent}22` : look.card, border: `4px solid ${awake ? look.accent : look.cardEdge}`, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: awake ? `0 0 ${30 + 20 * Math.sin(t * 6)}px ${look.accent}66` : 'none' }}>
          <Bot size={150} color={awake ? look.accent : look.inkFaint} strokeWidth={1.6} style={{ transform: `translateY(${awake ? Math.sin(t * 5) * 6 : 0}px)` }} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ fontFamily: FONT.mono, fontWeight: 800, fontSize: 20, letterSpacing: '0.12em', color: look.inkSoft }}>GITHUB ACTIONS</div>
          {steps.map(([s, a, b]) => {
            const run = t >= a && t < b, done = t >= b && j > 0;
            return (
              <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 12, width: 290, padding: '12px 16px', borderRadius: 14, background: look.card, border: `2px solid ${done ? look.good : run ? look.warm : look.cardEdge}`, fontFamily: FONT.mono, fontWeight: 800, fontSize: 25, color: look.ink }}>
                {done ? <Check size={26} color={look.good} strokeWidth={3} /> : <div style={{ width: 22, height: 22, borderRadius: 11, border: `3px solid ${run ? look.warm : look.inkFaint}`, borderTopColor: 'transparent', transform: `rotate(${run ? t * 720 : 0}deg)` }} />}{s}
              </div>
            );
          })}
        </div>
      </div>
    </At>
  );
};

const LiveStation: React.FC = () => {
  const { look, t, frame, fps } = useMotion();
  const at = c('live', 'c7b') - 0.3;
  const k = pop(frame, fps, at, { damping: 11 });
  if (k <= 0) return null;
  const fixed = t < S('t1') || t >= c('live', 't1');
  const pulse = t >= c('live', 't1') && t < c('live', 't1') + 0.8 ? Math.sin(prog(t, c('live', 't1'), c('live', 't1') + 0.8) * Math.PI) : 0;
  return (
    <At x={X_LIVE} y={-70}>
      <div style={{ position: 'relative', width: 560, borderRadius: 22, background: '#fff', overflow: 'hidden', boxShadow: `0 20px 50px rgba(0,0,0,0.5), 0 0 ${pulse * 60}px ${look.good}`, transform: `scale(${k * (1 + pulse * 0.05)})` }}>
        <div style={{ height: 50, background: '#E9ECF1', display: 'flex', alignItems: 'center', gap: 8, padding: '0 16px' }}>
          {['#F0614F', '#F2C76B', '#86C98A'].map((col) => <div key={col} style={{ width: 14, height: 14, borderRadius: 7, background: col }} />)}
          <div style={{ marginLeft: 12, flex: 1, height: 30, borderRadius: 8, background: '#fff', display: 'flex', alignItems: 'center', gap: 8, padding: '0 12px', fontFamily: FONT.mono, fontSize: 18, color: '#5D626B' }}><Globe size={16} />kemi.github.io</div>
        </div>
        <div style={{ padding: '40px 30px', fontFamily: FONT.display, fontWeight: 700, fontSize: 64, color: '#16181B' }}>{fixed ? 'Hello world' : 'Helo world'}</div>
        <div style={{ position: 'absolute', right: 20, bottom: 20 }}><Badge at={at + 0.2} text="LIVE" tone="good" /></div>
      </div>
    </At>
  );
};

/** wires between stations, with packets on push / robot / deploy and on the final journey */
const Track: React.FC = () => {
  const { look } = useMotion();
  const y = -70;
  return (
    <>
      <Wire pts={[[X_LAP + 330, y], [X_HUB - 290, y]]} at={c('push', 'c4b') - 0.4} drawDur={0.5} width={5} dashed flow={[{ from: c('push', 'c4b') + 1.5, to: 999, rate: 1.1, color: '#6B7280' }, { from: c('push', 'c4b'), to: c('GitHub', 'c4b') + 0.6, rate: 4, color: GIT_C }, { from: c('Push', 't1'), to: c('Push', 't1') + 0.7, rate: 4, color: GIT_C }]} />
      <Wire pts={[[X_HUB - 290, y + 40], [X_LAP + 330, y + 40]]} at={c('pull', 'c4b')} drawDur={0.4} width={4} dashed flow={[{ from: c('pull', 'c4b'), to: c('pull', 'c4b') + 1.0, rate: 4, color: HUB_C }]} />
      <Wire pts={[[X_HUB + 290, y], [X_BOT - 300, y]]} at={c('push', 'c7a') - 0.2} drawDur={0.5} width={5} dashed flow={[{ from: c('robot', 'c7a') + 1.0, to: 999, rate: 1.1, color: '#6B7280' }, { from: c('push', 'c7a'), to: c('robot', 'c7a') + 0.5, rate: 4, color: look.accent }, { from: c('robot', 't1') - 0.4, to: c('robot', 't1') + 0.3, rate: 4, color: look.accent }]} />
      <Wire pts={[[X_BOT + 300, y], [X_LIVE - 290, y]]} at={c('puts', 'c7b')} drawDur={0.4} width={5} dashed flow={[{ from: c('live', 'c7b') + 0.8, to: 999, rate: 1.1, color: '#6B7280' }, { from: c('puts', 'c7b'), to: c('live', 'c7b') + 0.5, rate: 4, color: look.good }, { from: c('approves', 't1'), to: c('live', 't1') + 0.3, rate: 4, color: look.good }]} />
    </>
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

/** a terminal / code card whose rows pop on their cue words */
const Term: React.FC<{ title: string; rows: [React.ReactNode, number][]; w?: number; note?: string }> = ({ title, rows, w = 860, note }) => {
  const { look, t, frame, fps } = useMotion();
  return (
    <div style={{ width: w, background: '#0E1014', border: `1.5px solid ${look.cardEdge}`, borderRadius: 20, overflow: 'hidden', boxShadow: `0 14px 34px ${look.cardShadow}` }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 18px', borderBottom: `1.5px solid ${look.cardEdge}`, fontFamily: FONT.mono, fontWeight: 800, fontSize: 17, letterSpacing: '0.1em', color: look.inkSoft }}>
        {title}<span style={{ flex: 1 }} />{note && <span style={{ fontWeight: 600, color: look.inkFaint }}>{note}</span>}
      </div>
      <div style={{ padding: '12px 20px', display: 'flex', flexDirection: 'column', gap: 6 }}>
        {rows.map(([r, at], i) => {
          const k = pop(frame, fps, at, { damping: 14 });
          return <div key={i} style={{ fontFamily: FONT.mono, fontSize: 25, fontWeight: 600, color: look.ink, opacity: k > 0 ? Math.min(1, k * 1.4) : 0.1, whiteSpace: 'pre', background: t >= at && t < at + 0.5 ? 'rgba(255,255,255,0.08)' : 'transparent', borderRadius: 6 }}>{r}</div>;
        })}
      </div>
    </div>
  );
};
const Y: React.FC<{ c: string; children: React.ReactNode }> = ({ c: col, children }) => <span style={{ color: col }}>{children}</span>;

const Conflict: React.FC = () => {
  const { look, t } = useMotion();
  const pick = c('pick', 'c6c'), del = c('delete', 'c6c'), again = c('commit', 'c6c');
  const struck = (on: boolean) => ({ textDecoration: on ? 'line-through' : 'none', opacity: on ? 0.35 : 1 });
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
      <Term title="index.html · CONFLICT" w={600} rows={[
        [<span style={struck(t >= del)}><Y c={look.problem}>{'<<<<<<< yours'}</Y></span>, c('Two', 'c6a')],
        [<span style={{ background: t >= pick ? `${look.good}33` : 'transparent', borderRadius: 4 }}>{'<h1>Hello world</h1>'}</span>, c('people', 'c6a')],
        [<span style={struck(t >= del)}><Y c={look.problem}>{'======='}</Y></span>, c('edit', 'c6a')],
        [<span style={struck(t >= pick)}>{'<h1>Hi world</h1>'}</span>, c('same', 'c6a')],
        [<span style={struck(t >= del)}><Y c={look.problem}>{'>>>>>>> teammate'}</Y></span>, c('line', 'c6a')],
      ]} />
      <div style={{ display: 'flex', gap: 12 }}>
        {t < again ? <Badge at={c('merge', 'c6b')} text="MERGE CONFLICT" /> : <Badge at={again} text="RESOLVED ✓" tone="good" />}
      </div>
    </div>
  );
};

/* ───────────── camera ───────────── */
const CAM = (t: number) => camAt([
  { t: 0, x: SIDE(0.95, X_LAP), y: 40, z: 0.95 },
  { t: S('c2a') - 0.2, x: X_LAP, y: 60, z: 1.15, dur: 1.0 },
  { t: c('push', 'c4b') - 0.5, x: (X_LAP + X_HUB) / 2, y: 0, z: 0.62, dur: 1.0 },
  { t: c('teammates', 'c4b') - 0.3, x: X_HUB, y: -70, z: 0.95, dur: 0.9 },
  { t: c('ten', 'c4d') - 0.3, x: X_HUB, y: -70, z: 0.82, dur: 0.6 },
  { t: S('c5a') - 0.1, x: X_HUB, y: -40, z: 1.0, dur: 0.8 },
  { t: S('c6a') - 0.1, x: SIDE(1.0, X_LAP), y: 60, z: 1.0, dur: 1.2 },
  { t: S('c7a') - 0.2, x: (X_HUB + X_BOT) / 2, y: -40, z: 0.6, dur: 1.1 },
  { t: c('robot', 'c7a') - 0.2, x: X_BOT + 60, y: -60, z: 0.95, dur: 0.9 },
  { t: c('puts', 'c7b') - 0.2, x: (X_BOT + X_LIVE) / 2, y: -60, z: 0.62, dur: 0.9 },
  { t: c('live', 'c7b'), x: X_LIVE, y: -60, z: 1.0, dur: 0.8 },
  { t: S('c7c') + 0.2, x: X_BOT + 60, y: -60, z: 0.95, dur: 0.9 },
  { t: S('t1') - 0.1, x: X_LAP, y: 40, z: 0.85, dur: 0.9 },
  { t: c('Push', 't1') - 0.15, x: X_HUB, y: -40, z: 0.85, dur: 0.6 },
  { t: c('robot', 't1') - 0.2, x: X_BOT + 60, y: -40, z: 0.85, dur: 0.6 },
  { t: c('teammate', 't1') - 0.2, x: X_HUB, y: -40, z: 0.85, dur: 0.5 },
  { t: c('And', 't1') - 0.1, x: X_LIVE, y: -40, z: 0.95, dur: 0.6 },
  { t: S('cav') - 0.1, x: SIDE(0.62, X_LAP + 150), y: 40, z: 0.62, dur: 1.1 },
], t);

const CHAPTERS: [string, string, string][] = [['c1a', '01', 'The mess'], ['c2a', '02', 'Commit'], ['c3a', '03', 'Branch'], ['c4a', '04', 'GitHub'], ['c5a', '05', 'Pull request'], ['c6a', '06', 'The trap'], ['c7a', '07', 'GitHub Actions']];

/* ───────────── scene ───────────── */
const Scene: React.FC = () => {
  loadMotionFonts();
  const { look, t, frame, fps } = useMotion();
  const cam0 = CAM(t);
  // slow breathing drift so the dark world never sits fully still between events (QA near-still gate)
  const cam = { ...cam0, x: cam0.x + Math.sin(t * 1.1) * 14 / cam0.z, y: cam0.y + Math.sin(t * 0.8 + 1) * 9 / cam0.z };
  const br = L('bridge');
  const end = vo.duration + 0.25;
  const worldOn = prog(t, WORLD_AT - 0.2, WORLD_AT + 0.3)
    * (1 - 0.88 * prog(t, S('recap') - 0.3, S('recap') + 0.2))
    * (1 - prog(t, S('punch') - 0.3, S('punch')));

  return (
    <AbsoluteFill>
      <Backdrop cam={cam} />
      <Drift />

      {worldOn > 0.001 && (
        <AbsoluteFill style={{ opacity: worldOn }}>
          <World cam={cam} centerY={780}>
            <Track />
            <LaptopStation />
            <CommitGraph />
            <HubStation />
            <BotStation />
            <LiveStation />
          </World>
        </AbsoluteFill>
      )}

      {/* ── HUD: series + commit counter + workflow chips ── */}
      <HudSeries series="Git vs GitHub" pulseTeyro={[br.start, S('cta')]}
        chapters={[{ t: 0, text: 'the difference' }, { t: S('h4'), text: 'one line of code' }, ...CHAPTERS.map(([id, n, name]) => ({ t: S(id), text: `${n} · ${name}` })), { t: S('t1'), text: 'the journey' }, { t: S('recap'), text: 'recap' }]}
        counter={{ unit: 'commits', icon: <GitCommitHorizontal size={26} color={NT.accent2} />, format: fmt.int, keys: [{ t: 0, v: 0 }, ...COMMITS.map((cm, i) => ({ t: cm.at, v: i + 1, dur: 0.3 }))] }}
        chips={[{ label: 'Commit', t: COMMITS[0].at }, { label: 'Branch', t: c('branch', 'c3a', 2) }, { label: 'Push', t: c('push', 'c4b') }, { label: 'Pull', t: c('pull', 'c4b') }, { label: 'PR', t: c('Pull', 'c5a') }, { label: 'Actions', t: c('Actions', 'c7a') }, { label: 'Live', t: c('live', 'c7b') }]} />

      {/* ── HOOK (frame 0 = cover): the exact difference ── */}
      <TitleCard title={['GIT vs GITHUB']} kicker="THE EXACT DIFFERENCE" until={S('h4')} titleSize={118} top={420}><Versus /></TitleCard>
      <Ov a={c('remembers', 'h2')} b={S('h3')} y={1330}><Tag at={c('remembers', 'h2')} text="remembers every version" size={28} /></Ov>
      <Ov a={c('online', 'h3')} b={S('h4')} y={1330}><Tag at={c('online', 'h3')} text="history online · whole team" size={28} /></Ov>

      {/* ── chapter cards ── */}
      {CHAPTERS.map(([id, n, name]) => <ChapterCard key={id} at={S(id)} until={S(id) + 2.6} n={n} title={name} sub="STEP" size={100} y={400} color={id === 'c6a' ? look.problem : id === 'c7a' ? look.good : look.accent} />)}

      {/* ── 01 the mess (Remi on) ── */}
      <Ov a={c('Which', 'c1a')} b={S('c2a')} x={SX} y={1170}><Badge at={c('Which', 'c1a')} text="WHICH ONE WORKS?" /></Ov>

      {/* ── 02 commit ── */}
      <Ov a={c('save', 'c2a')} b={S('c2b')}><Tag at={c('save', 'c2a')} text="save point" size={32} solid /></Ov>
      <Ov a={c('message', 'c2b')} b={S('c2c')}>
        <Col>
          <Term title="git log" rows={[[<><Y c={NT.warm}>commit</Y> c41e9aa3f2d8b6e01…</>, c('ID', 'c2b')], [<>    fix homepage title</>, c('message', 'c2b')]]} />
          <Footnote at={c('forty', 'c2b')} text="every commit ID is a 40-character SHA-1 · Pro Git · example ID" />
        </Col>
      </Ov>
      <Ov a={c('commit', 'c2c')} b={S('c3a')}>
        <Col>
          <Tag at={c('commit', 'c2c')} text="commit = snapshot" size={32} solid />
          <Footnote at={c('two', 'c2c')} text="Git: created 2005 by the Linux kernel community (Linus Torvalds) · Pro Git" />
        </Col>
      </Ov>

      {/* ── 03 branch ── */}
      <Ov a={c('risky', 'c3a')} b={S('c3b')}><Tag at={c('risky', 'c3a')} text="try it without breaking main" size={28} /></Ov>
      <Ov a={c('tiny', 'c3b')} b={S('c4a')}>
        <Col>
          <Term title=".git/refs/heads/experiment" w={720} rows={[[<>e02b7f1c9a4d…<Y c={NT.inkFaint}>⏎</Y></>, c('tiny', 'c3b')]]} />
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}><Badge at={c('bytes', 'c3b')} text="41 BYTES" tone="good" /><Footnote at={c('bytes', 'c3b')} width={460} align="left" text="40 characters + a newline · Pro Git" /></div>
        </Col>
      </Ov>

      {/* ── 04 GitHub ── */}
      <Ov a={c('Spill', 'c4a')} b={S('c4b')}><Badge at={c('gone', 'c4a')} text="HISTORY GONE" icon={<Coffee size={24} />} /></Ov>
      <Ov a={c('push', 'c4b')} b={S('c4c')}>
        <Term title="terminal" w={640} rows={[[<><Y c={NT.good}>$</Y> git push</>, c('push', 'c4b')], [<><Y c={NT.good}>$</Y> git pull</>, c('pull', 'c4b')]]} />
      </Ov>
      <Ov a={S('c4c')} b={S('c4d')}>
        <Col>
          <Ticker keys={[{ t: 0, v: 0 }, { t: c('hundred', 'c4c'), v: 180000000, dur: 1.0 }]} format={(v) => `${fmt.int(v)}+`} style={{ fontFamily: FONT.display, fontWeight: 700, fontSize: 88, color: HUB_C, transformOrigin: 'center' }} />
          <div style={{ fontFamily: FONT.mono, fontWeight: 800, fontSize: 22, letterSpacing: '0.16em', color: look.inkSoft }}>DEVELOPERS ON GITHUB</div>
          <Footnote at={c('developers', 'c4c')} text="GitHub Octoverse 2025" />
        </Col>
      </Ov>
      <Ov a={c('ten', 'c4d')} b={br.start + 0.1}><Col><BigText at={c('wrecking', 'c4d')} lines={['WHO STOPS THEM?']} size={76} align="center" color={look.problem} /></Col></Ov>

      {/* ── Teyro mid bridge ── */}
      <TeyroBridge at={br.start} until={S('back') + 0.2} line="Learn Git, GitHub and GitHub Actions" chips={['Free course', 'Git → GitHub Actions', 'A few minutes a day']}
        chipTimes={[c('free', 'bridge'), c('course', 'bridge'), c('Teyro', 'bridge')]} beats={[c('Quick', 'bridge'), c('Actions', 'bridge'), c('Okay', 'back')]} />

      {/* ── 05 pull request ── */}
      <Ov a={c('directly', 'c5a')} b={S('c5b')}><Tag at={c('ask', 'c5a')} text="ask first" size={34} solid /></Ov>
      <Ov a={S('c5b')} b={S('c6a')}>
        <div style={{ width: 860, borderRadius: 20, background: look.card, border: `1.5px solid ${look.cardEdge}`, padding: '18px 22px', boxShadow: `0 14px 34px ${look.cardShadow}` }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontFamily: FONT.sans, fontWeight: 700, fontSize: 30, color: look.ink }}><GitPullRequest size={30} color={look.good} />Fix homepage title <span style={{ color: look.inkFaint, fontWeight: 600 }}>#12</span></div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 8, fontFamily: FONT.mono, fontSize: 20, color: look.inkSoft }}><GitBranch size={20} />experiment → main</div>
          <div style={{ display: 'flex', gap: 12, marginTop: 14, alignItems: 'center' }}>
            <Tag at={c('check', 'c5b')} text="review requested" size={18} tone="muted" />
            <Tag at={c('comments', 'c5b')} text="“looks good”" size={18} />
            <Badge at={c('merges', 'c5b')} text="MERGED" tone="accent" icon={<GitMerge size={20} />} />
          </div>
        </div>
      </Ov>

      {/* ── 06 the trap (Remi on) ── */}
      <Ov a={c('Two', 'c6a')} b={S('c7a')} x={SX} y={1080}><Conflict /></Ov>
      <Ov a={c('scary', 'c6c')} b={c('pick', 'c6c')} x={SX} y={1380}><Tag at={c("isn't", 'c6c')} text="not scary" size={24} tone="good" /></Ov>

      {/* ── 07 GitHub Actions ── */}
      <Ov a={c('robot', 'c7a')} b={S('c7b')}><Tag at={c('robot', 'c7a')} text="runs on every push" size={30} solid /></Ov>
      <Ov a={S('c7c')} b={S('c7d')}>
        <Col>
          <Term title=".github/workflows/deploy.yml" note="example" w={760} rows={[
            [<><Y c="#7FB0FF">on</Y>: push</>, c('steps', 'c7c')], [<><Y c="#7FB0FF">jobs</Y>:</>, c('once', 'c7c')], [<>  test-and-deploy:</>, c('small', 'c7c')],
            [<>    - run: npm install</>, c('file', 'c7c')], [<>    - run: npm test</>, c('folder', 'c7c')], [<>    - run: npm run deploy</>, c('workflows', 'c7c')],
          ]} />
        </Col>
      </Ov>
      <Ov a={S('c7d')} b={S('t1')}>
        <Col>
          <BigText at={c('CI', 'c7d')} lines={['CI / CD']} size={110} align="center" color={look.good} />
          <div style={{ display: 'flex', gap: 14 }}><Tag at={c('Test', 'c7d')} text="test everything" size={26} /><Tag at={c('Ship', 'c7d')} text="ship automatically" size={26} tone="good" solid /></div>
          <Footnote at={c('call', 'c7d')} text="GitHub Docs: Actions is a CI/CD platform to automate build, test and deployment" />
        </Col>
      </Ov>

      {/* ── the journey: one line of code, laptop → live ── */}
      <Ov a={c('fix', 't1')} b={S('cav')} y={1150}>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center', width: 980 }}>
          {([['fix typo', 'fix'], ['commit', 'Commit'], ['push', 'Push'], ['pull request', 'Open'], ['robot tests', 'robot'], ['approved', 'teammate'], ['LIVE', 'live']] as [string, string][]).map(([txt, w], i) => (
            <Tag key={txt} at={c(w, 't1')} text={`${i + 1} ${txt}`} size={25} tone={w === 'live' ? 'good' : 'accent'} solid={w === 'live'} />
          ))}
        </div>
      </Ov>

      {/* ── caveat + recap (Remi on) ── */}
      <Ov a={S('cav')} b={S('recap')} x={SX} y={1170}>
        <Checklist width={560} size={28} items={[{ text: 'day one: commits', at: c('commits', 'cav'), check: c('commits', 'cav') + 0.3 }, { text: 'the rest comes fast', at: c('rest', 'cav'), check: c('fast', 'cav') }]} />
      </Ov>
      <At x={SX} y={960}>
        {t < S('punch') && (
          <div style={{ opacity: 1 - prog(t, S('punch') - 0.25, S('punch')) }}>
            <Recap width={580} titleAt={S('recap')} items={[
              { text: 'Git remembers', at: c('Git', 'recap') }, { text: 'GitHub shares', at: c('GitHub', 'recap') }, { text: 'Branches keep it safe', at: c('Branches', 'recap') },
              { text: 'PRs get it reviewed', at: c('Pull', 'recap') }, { text: 'Actions test + ship', at: c('Actions', 'recap') },
            ]} />
          </div>
        )}
      </At>

      {/* ── punchline ── */}
      {t >= S('punch') && t < S('cta') && (
        <AbsoluteFill style={{ opacity: 1 - prog(t, S('cta') - 0.2, S('cta')) }}>
          <At x={540} y={820} w={1040}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
              {([['GIT SAVES IT.', c('Git', 'punch'), GIT_C], ['GITHUB SHARES IT.', c('GitHub', 'punch'), HUB_C], ["THAT'S THE DIFFERENCE.", c('difference', 'punch'), look.ink]] as [string, number, string][]).map(([txt, at, col]) => {
                const k = pop(frame, fps, at, { damping: 10 });
                return <div key={txt} style={{ fontFamily: FONT.display, fontWeight: 700, fontSize: txt.length > 16 ? 76 : 100, lineHeight: 1.08, letterSpacing: '-0.03em', color: col, transform: `scale(${k})`, opacity: Math.min(1, k * 1.5), whiteSpace: 'nowrap' }}>{txt}</div>;
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
          <div style={{ position: 'absolute', left: Z.gutter + 10, right: Z.gutter + 10, top: 420, textAlign: 'center' }}>
            <div style={{ fontFamily: FONT.display, fontWeight: 700, fontSize: 118, lineHeight: 0.95, letterSpacing: '-0.035em', color: NT.ink }}>GIT vs GITHUB</div>
            <div style={{ marginTop: 22, fontFamily: FONT.mono, fontWeight: 700, fontSize: 30, letterSpacing: '0.42em', color: NT.problem }}>THE EXACT DIFFERENCE</div>
          </div>
          <div style={{ position: 'absolute', left: 0, right: 0, top: 420 + 118 + 120, bottom: 1920 - Z.stageBottom - 40, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Versus still /></div>
        </AbsoluteFill>
      </LoopBack>

      {/* ── host + captions ── */}
      <Host on={[[S('h4'), S('c2a') - 0.2], [S('c6a'), S('c7a') - 0.2], [S('cav'), S('punch') - 0.1]]}
        poses={[
          { t: 0, p: 'wave' }, { t: c('follow', 'h4'), p: 'point' }, { t: S('c1a'), p: 'explain' }, { t: c('Final', 'c1a'), p: 'point' }, { t: c('Which', 'c1a'), p: 'think' },
          { t: S('c6a'), p: 'wow' }, { t: c('Two', 'c6a'), p: 'point' }, { t: S('c6b'), p: 'explain' }, { t: c('scary', 'c6c'), p: 'think' }, { t: c("isn't", 'c6c'), p: 'point' },
          { t: S('cav'), p: 'explain' }, { t: S('recap'), p: 'point' }, { t: c('Actions', 'recap'), p: 'wow' },
        ]} />
      <Captions hideBetween={[[br.start, S('back') + 0.2]]} />
    </AbsoluteFill>
  );
};

/* ───────────── sound design ───────────── */
const SFX: SfxCue[] = [
  { t: 0.05, s: 'boom' }, { t: c('Git', 'h1'), s: 'pop' }, { t: c('GitHub', 'h1'), s: 'pop' },
  { t: S('h2'), s: 'swoosh' }, ...ticks([c('remembers', 'h2'), c('every', 'h2'), c('version', 'h2')]),
  { t: S('h3'), s: 'swoosh' }, ...ticks([c('whole', 'h3'), c('team', 'h3'), c('work', 'h3')], 'pop'),
  { t: WORLD_AT, s: 'whoosh' },
  ...CHAPTERS.flatMap(([id]) => revealCues(S(id)).map((x) => ({ ...x, v: 0.55 }))),
  ...ticks([c('Final', 'c1a'), c('two', 'c1a'), c('final', 'c1a', 3)], 'pop'), { t: c('Which', 'c1a'), s: 'error', v: 0.6 },
  { t: S('c2a') - 0.2, s: 'whoosh', v: 0.6 }, ...ticks(COMMITS.map((cm) => cm.at), 'pop'), { t: c('save', 'c2a'), s: 'chime', v: 0.5 },
  { t: c('ID', 'c2b'), s: 'type', v: 0.5 }, { t: c('Jump', 'c2b'), s: 'swoosh' },
  { t: c('branch', 'c3a', 2), s: 'swoosh' }, { t: c('bytes', 'c3b'), s: 'success', v: 0.6 },
  { t: c('Spill', 'c4a'), s: 'shatter' }, { t: c('gone', 'c4a'), s: 'error' },
  { t: c('push', 'c4b') - 0.5, s: 'whoosh' }, { t: c('push', 'c4b'), s: 'swoosh' }, { t: c('pull', 'c4b'), s: 'swoosh' }, { t: c('teammates', 'c4b'), s: 'pop' },
  { t: c('hundred', 'c4c'), s: 'count' }, { t: c('ten', 'c4d'), s: 'pop' }, { t: c('wrecking', 'c4d'), s: 'error' },
  { t: S('bridge'), s: 'chime' }, { t: S('back'), s: 'whoosh', v: 0.6 },
  { t: c('ask', 'c5a'), s: 'pop' }, ...ticks([c('check', 'c5b'), c('comments', 'c5b')]), { t: c('merges', 'c5b'), s: 'success' },
  { t: S('c6a') - 0.1, s: 'whoosh', v: 0.6 }, ...ticks(['Two', 'people', 'edit', 'same', 'line'].map((w) => c(w, 'c6a'))), { t: c('merge', 'c6b'), s: 'error' },
  { t: c('pick', 'c6c'), s: 'tick' }, { t: c('delete', 'c6c'), s: 'swoosh' }, { t: c('commit', 'c6c'), s: 'success' },
  { t: S('c7a') - 0.2, s: 'whoosh', v: 0.6 }, { t: c('robot', 'c7a'), s: 'riser', v: 0.5 }, { t: c('robot', 'c7a') + 0.6, s: 'pop' },
  ...ticks([c('installs', 'c7b'), c('runs', 'c7b')]), { t: c('passes', 'c7b'), s: 'success', v: 0.6 }, { t: c('live', 'c7b'), s: 'chime' },
  { t: S('c7c'), s: 'type', v: 0.5 }, { t: c('CI', 'c7d'), s: 'boom', v: 0.6 }, { t: c('Ship', 'c7d'), s: 'swoosh' },
  { t: S('t1') - 0.1, s: 'whoosh' }, ...ticks(['fix', 'Commit', 'Push', 'Open', 'robot', 'teammate'].map((w) => c(w, 't1')), 'pop'), { t: c('live', 't1'), s: 'success' },
  { t: c('commits', 'cav'), s: 'success', v: 0.5 }, { t: c('fast', 'cav'), s: 'success', v: 0.5 },
  ...revealCues(S('recap')).map((x) => ({ ...x, v: 0.5 })), ...ticks(['Git', 'GitHub', 'Branches', 'Pull', 'Actions'].map((w) => c(w, 'recap')), 'pop'),
  { t: c('Git', 'punch'), s: 'boom', v: 0.6 }, { t: c('GitHub', 'punch'), s: 'boom', v: 0.6 }, { t: c('difference', 'punch'), s: 'boom', v: 0.8 },
  { t: S('cta'), s: 'whoosh' }, { t: S('cta') + 0.6, s: 'pop' },
];

export const M4: React.FC = () => (
  <MotionProvider look="night" vo={vo}>
    <Scene />
    <SoundLayer slug={SLUG} sfx={SFX} />
  </MotionProvider>
);

