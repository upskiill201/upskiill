import React from 'react';
import { AbsoluteFill, interpolate } from 'remotion';
import { C, E, MONO, Q, k, kick, last, lerp, sp } from './lib';
import { Burst, Flash, Shock, Words, pop } from './fx';
import { NightBg } from './common';

const GRAD = 'linear-gradient(90deg, #C084FC 0%, #818CF8 45%, #3D8BFF 100%)';

// ════════════════════════════════════════════════════════════════════════════
// 0–4 s  "$ git init" → the cursor collapses into the first commit.
// ════════════════════════════════════════════════════════════════════════════
export const SInit: React.FC<{ t: number }> = ({ t }) => {
  const text = 'git init';
  const n = last(t, Q.type) + 1;
  const CW = 0.6 * 104; // JetBrains Mono advance at 104px
  const lineX = 960 - (2 + text.length) * CW / 2;
  // anticipation: the line squashes into the cursor, the cursor rounds into a dot
  const squash = k(t, Q.enter, Q.init - 0.02, E.inBack);
  const curX0 = lineX + (2 + n) * CW;
  const dotFly = k(t, Q.init, Q.init + 0.5, E.outExpo);
  const exit = k(t, 3.68, 3.98, E.inOutCubic);
  const dotX = lerp(lerp(curX0 + CW * 0.45, 960, squash), 380, exit);
  const dotY = lerp(lerp(548, 700, dotFly), 640, exit);
  const born = t >= Q.init;
  const blink = t < Q.type[0] ? (Math.floor(t * 4) % 2 === 0 ? 1 : 0.15) : t < Q.enter ? 1 : 1;
  const cw = lerp(CW * 0.9, 64, squash), ch = lerp(104, 64, squash), cr = lerp(6, 32, squash);
  const dotS = born ? 0.6 + pop(t, Q.init) * 0.4 + kick(t, 12) * 0.12 : 1;
  const pre = Math.max(0, 1 - k(t, 3.2, 3.68));
  const boot = 'Initialized empty Git repository in ~/my-project/.git/';
  const bootN = Math.floor(k(t, Q.init + 0.08, Q.init + 0.55, E.linear) * boot.length);
  const camZ = 1 + k(t, 0, Q.enter, E.linear) * 0.08 - k(t, Q.init, Q.init + 0.6, E.outExpo) * 0.08 + kick(t, 9) * 0.015;

  return (
    <AbsoluteFill>
      <NightBg t={t} floor={t > 1.9} />
      <AbsoluteFill style={{ transform: `scale(${camZ})` }}>
        {/* terminal line */}
        {!born && (
          <div style={{ position: 'absolute', left: lineX, top: 548 - 62, height: 124, display: 'flex', alignItems: 'center', fontFamily: MONO, fontSize: 104, fontWeight: 700, transform: `scaleX(${1 - squash})`, transformOrigin: `${curX0 - lineX}px 50%`, opacity: 1 - squash * 0.4 }}>
            <span style={{ color: C.blue, width: CW * 2 }}>$</span>
            {Array.from(text).map((c, i) => {
              const p = i < n ? sp(t, Q.type[i], { damping: 10, stiffness: 320, mass: 0.5 }) : 0;
              return (
                <span key={i} style={{ width: CW, display: 'inline-block', textAlign: 'center', color: i < 3 ? '#F472B6' : '#E8ECFF', transform: `translateY(${(1 - p) * 30}px) scale(${0.4 + p * 0.6})`, opacity: Math.min(1, p * 2), textShadow: `0 0 ${24 * (1 - Math.min(1, (t - (Q.type[i] ?? 0)) * 4))}px #fff` }}>{c}</span>
              );
            })}
          </div>
        )}
        {/* cursor → commit dot */}
        <div style={{
          position: 'absolute', left: dotX - cw / 2, top: dotY - ch / 2, width: cw, height: ch, borderRadius: cr,
          background: born ? C.night : '#E8ECFF', border: born ? `10px solid ${C.blue}` : 'none', boxSizing: 'border-box',
          opacity: born ? 1 : blink, transform: `scale(${dotS})`,
          boxShadow: born ? `0 0 ${40 + kick(t, 8) * 60}px ${C.blue}, inset 0 0 0 6px ${C.night}` : `0 0 ${30 * squash}px #fff`,
        }}>
          {born && <div style={{ position: 'absolute', inset: 8, borderRadius: '50%', background: '#fff' }} />}
        </div>
        <Shock t={t} at={Q.init} x={960} y={548} r={700} color={C.blue} width={18} dur={0.8} />
        <Shock t={t} at={Q.init + 0.06} x={960} y={548} r={420} color="#fff" width={8} dur={0.6} />
        <Burst t={t} at={Q.init} x={960} y={548} n={18} dist={420} colors={['#fff', C.blue, '#C084FC']} len={110} thick={7} />
        {/* boot line */}
        {born && (
          <div style={{ position: 'absolute', top: 790, left: 0, right: 0, textAlign: 'center', fontFamily: MONO, fontSize: 28, color: '#7D8BB8', opacity: pre }}>
            {boot.slice(0, bootN)}<span style={{ opacity: bootN < boot.length ? 1 : 0 }}>▍</span>
          </div>
        )}
        {/* headline */}
        <div style={{ position: 'absolute', top: 228, left: 0, right: 0 }}>
          <Words t={t} text="Every project" at={Q.title[1]} out={3.72} size={132} align="center" stagger={0.07} />
        </div>
        <div style={{ position: 'absolute', top: 384, left: 0, right: 0 }}>
          <Words t={t} text="starts with one commit." at={Q.title[2]} out={3.76} size={132} align="center" stagger={0.07} hi={{ 2: GRAD, 3: GRAD }} />
        </div>
      </AbsoluteFill>
      <Flash t={t} at={Q.init} peak={0.35} dur={0.25} />
    </AbsoluteFill>
  );
};

// ════════════════════════════════════════════════════════════════════════════
// 4–8 s  Commit. Branch. Merge. — a living commit graph, camera tracking.
// ════════════════════════════════════════════════════════════════════════════
const MAIN = [0, 220, 440, 660, 880, 1100, 1320, 1540].map((x, i) => ({ x, t: 4.0 + i * 0.5, hash: ['a1f3c9e', '7bd02e4', 'c94e1a0', '3e8f6b2', 'f02a9d1', '58c1e77', 'merge', 'e6b4c03'][i] }));
const SIDE = [580, 800, 1020].map((x, i) => ({ x, t: Q.graph.side[i] }));
const MERGE = MAIN[6];
const BY = -240;

export const SGraph: React.FC<{ t: number }> = ({ t }) => {
  const camX = interpolate(t, [4, 5, 6, 7, 8], [380, 330, 0, -420, -560], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: E.inOutCubic });
  const camY = 640 + interpolate(t, [4, 5, 6.5, 7.2], [0, 60, 80, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: E.inOutCubic });
  // exit: dive into the merge node
  const dive = k(t, 7.55, 8.0, E.inExpo);
  const mx = camX + MERGE.x, my = camY;
  const zoom = 1 + dive * 26;
  const word = t < Q.graph.branch ? 0 : t < Q.graph.merge ? 1 : 2;
  const seg = (a: number, b: number) => k(t, a, b, E.outCubic);

  return (
    <AbsoluteFill>
      <NightBg t={t} speed={140} />
      <AbsoluteFill style={{ transformOrigin: "0 0", transform: `translate(${mx}px, ${my}px) scale(${zoom}) translate(${-mx}px, ${-my}px)` }}>
        <div style={{ position: 'absolute', left: camX, top: camY }}>
          <svg width={2400} height={900} viewBox="-400 -600 2400 900" style={{ position: 'absolute', left: -400, top: -600, overflow: 'visible', filter: `drop-shadow(0 0 14px ${C.blue})` }}>
            {/* main line */}
            {MAIN.slice(0, -1).map((m, i) => {
              const p = seg(m.t, m.t + 0.32);
              const nx = MAIN[i + 1].x;
              return <line key={i} x1={m.x} y1={0} x2={m.x + (nx - m.x) * p} y2={0} stroke={C.blue} strokeWidth={12} strokeLinecap="round" />;
            })}
            {/* branch out, along, and back */}
            <path d={`M440 0 C 520 0, 500 ${BY}, 580 ${BY}`} stroke={C.green} strokeWidth={12} fill="none" strokeLinecap="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - seg(Q.graph.branch, SIDE[0].t)} style={{ filter: `drop-shadow(0 0 10px ${C.green})` }} />
            {SIDE.slice(0, -1).map((s, i) => <line key={i} x1={s.x} y1={BY} x2={s.x + (SIDE[i + 1].x - s.x) * seg(s.t, s.t + 0.3)} y2={BY} stroke={C.green} strokeWidth={12} strokeLinecap="round" />)}
            <path d={`M1020 ${BY} C 1180 ${BY}, 1160 0, 1320 0`} stroke={C.green} strokeWidth={12} fill="none" strokeLinecap="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - seg(6.5, MERGE.t)} />
          </svg>
          {/* nodes */}
          {MAIN.map((m, i) => <Node key={i} t={t} at={m.t} x={m.x} y={0} color={i === 6 ? C.ghPurple : C.blue} r={i === 6 ? 44 : 30} label={i === 6 ? '' : m.hash} />)}
          {SIDE.map((s, i) => <Node key={'s' + i} t={t} at={s.t} x={s.x} y={BY} color={C.green} r={28} />)}
          <Pill t={t} at={4.08} x={-60} y={64} color={C.blue} text="main" />
          <Pill t={t} at={Q.graph.branch + 0.05} x={520} y={BY - 92} color={C.green} text="feature/login" />
          <Shock t={t} at={MERGE.t} x={MERGE.x} y={0} r={520} color={C.ghPurple} width={20} />
          <Shock t={t} at={MERGE.t + 0.07} x={MERGE.x} y={0} r={300} color="#fff" width={8} />
          <Burst t={t} at={MERGE.t} x={MERGE.x} y={0} n={16} dist={380} colors={['#fff', C.ghPurple, C.green]} len={90} />
        </div>
      </AbsoluteFill>
      {/* headline word, swapped per beat */}
      <div style={{ position: 'absolute', left: 120, top: 92, opacity: 1 - dive }}>
        {word === 0 && <Words t={t} text="Commit." at={Q.graph.commit} out={Q.graph.branch - 0.12} size={210} by="char" stagger={0.028} hi={{ 6: C.blue }} />}
        {word === 1 && <Words t={t} text="Branch." at={Q.graph.branch} out={Q.graph.merge - 0.12} size={210} by="char" stagger={0.028} hi={{ 6: C.green }} />}
        {word === 2 && <Words t={t} text="Merge." at={Q.graph.merge} size={210} by="char" stagger={0.028} hi={{ 5: C.ghPurple }} />}
      </div>
      <Flash t={t} at={MERGE.t} peak={0.25} dur={0.2} />
      {/* GitHub-dark flood as we land inside the merge node */}
      <AbsoluteFill style={{ background: '#0D1117', opacity: k(t, 7.9, 8.0) }} />
    </AbsoluteFill>
  );
};

const Node: React.FC<{ t: number; at: number; x: number; y: number; color: string; r: number; label?: string }> = ({ t, at, x, y, color, r, label }) => {
  if (t < at) return null;
  const p = pop(t, at);
  const glow = Math.exp(-(t - at) * 5);
  const chars = label ? Math.floor(k(t, at + 0.05, at + 0.32, E.linear) * label.length) : 0;
  return (
    <>
      <div style={{ position: 'absolute', left: x - r, top: y - r, width: r * 2, height: r * 2, borderRadius: '50%', background: '#0D1117', border: `${r * 0.32}px solid ${color}`, boxSizing: 'border-box', transform: `scale(${p})`, boxShadow: `0 0 ${20 + glow * 70}px ${color}` }}>
        <div style={{ position: 'absolute', inset: r * 0.22, borderRadius: '50%', background: '#fff', transform: `scale(${Math.min(1, (t - at) * 5)})` }} />
      </div>
      {label && <div style={{ position: 'absolute', left: x - 80, width: 160, top: y + r + 18, textAlign: 'center', fontFamily: MONO, fontSize: 24, color: '#8B98C9' }}>{label.slice(0, chars)}</div>}
    </>
  );
};

const Pill: React.FC<{ t: number; at: number; x: number; y: number; color: string; text: string }> = ({ t, at, x, y, color, text }) => {
  if (t < at) return null;
  const p = pop(t, at);
  return (
    <div style={{ position: 'absolute', left: x, top: y, padding: '8px 22px', borderRadius: 999, background: `${color}26`, border: `3px solid ${color}`, color: '#fff', fontFamily: MONO, fontWeight: 700, fontSize: 28, transform: `scale(${p})`, transformOrigin: '0% 50%', whiteSpace: 'nowrap' }}>{text}</div>
  );
};

