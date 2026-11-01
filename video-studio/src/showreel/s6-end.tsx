import React from 'react';
import { ArrowRight, GitCommitHorizontal, GitPullRequest, Workflow } from 'lucide-react';
import { AbsoluteFill } from 'remotion';
import { BODY, C, DISPLAY, E, Q, img, k, kick, lerp, rand, shake, sp } from './lib';
import { Burst, Confetti, Flash, Shock, Words } from './fx';
import { AppIcon, NightBg } from './common';

const GH_GREENS = ['#161B22', '#0E4429', '#006D32', '#26A641', '#39D353'];

// ════════════════════════════════════════════════════════════════════════════
// 34–40 s  The outcome. Back to the night stage (bookends the open); a year of
// green contribution squares fills in while the three skills land.
// ════════════════════════════════════════════════════════════════════════════
export const SOutcome: React.FC<{ t: number }> = ({ t }) => {
  const enter = k(t, 34.0, 34.4, E.outExpo);
  const implode = k(t, 39.55, 39.92, E.inExpo);
  const build = k(t, 38.0, 39.6, E.inCubic);
  const sh = shake(t, [[38.0, 0.2], [38.5, 0.25], [39.0, 0.35], [39.25, 0.45], [39.5, 0.55]]);
  const COLS = 46, ROWS = 7, CELL = 30, GAP = 8;
  const gx = 960 - (COLS * (CELL + GAP)) / 2, gy = 720;
  const hat = Math.pow(Math.max(0, Math.sin(((t - 34) / 0.25) * Math.PI)), 6) * 0.3; // 16th shimmer
  return (
    <AbsoluteFill style={{ overflow: 'hidden' }}>
      <NightBg t={t} hue="#26A641" hue2={C.indigo} speed={80 + build * 500} />
      <AbsoluteFill style={{ opacity: enter, transformOrigin: '960px 540px', transform: `scale(${lerp(1.08, 1, enter) * (1 - implode)}) translate(${sh.x}px, ${sh.y}px) rotate(${implode * 40}deg)` }}>
        {/* contribution graph */}
        <div style={{ position: 'absolute', left: gx, top: gy, transform: `perspective(1400px) rotateX(${lerp(48, 20, k(t, 34, 36, E.outCubic))}deg)`, transformOrigin: '50% 0%' }}>
          {Array.from({ length: COLS * ROWS }).map((_, n) => {
            const c = Math.floor(n / ROWS), r = n % ROWS;
            const wave = (t - 34.1) * 1.6 - (c * 0.05 + r * 0.03 + rand(n, 3) * 0.25);
            const lvl = Math.max(0, Math.min(4, Math.floor(clamp01(wave) * (1 + rand(n, 7) * 3.2) + build * 2)));
            const flick = lvl > 0 ? 1 + hat * rand(n, 9) + kick(t, 9) * 0.25 : 1;
            return <div key={n} style={{ position: 'absolute', left: c * (CELL + GAP), top: r * (CELL + GAP), width: CELL, height: CELL, borderRadius: 7, background: GH_GREENS[lvl], filter: lvl ? `brightness(${flick})` : undefined, transform: `scale(${lvl ? 0.85 + Math.min(1, wave * 3) * 0.15 : 0.85})`, boxShadow: lvl === 4 ? `0 0 14px rgba(57,211,83,${0.4 + build * 0.5})` : undefined }} />;
          })}
        </div>
        {/* headline */}
        <div style={{ position: 'absolute', top: 92, left: 0, right: 0 }}>
          <Words t={t} text="From your first commit" at={Q.outcome + 0.04} out={37.86} size={112} align="center" stagger={0.07} />
        </div>
        <div style={{ position: 'absolute', top: 226, left: 0, right: 0 }}>
          <Words t={t} text="to your first pipeline." at={Q.outcome2} out={37.9} size={112} align="center" stagger={0.07} hi={{ 2: '#39D353', 3: '#39D353' }} />
        </div>
        <div style={{ position: 'absolute', top: 150, left: 0, right: 0 }}>
          <Words t={t} text="Skills every dev team uses." at={38.0} size={120} align="center" stagger={0.07} hi={{ 3: '#7DD3FC', 4: '#7DD3FC' }} />
        </div>
        {/* the three outcomes */}
        {[
          { icon: GitCommitHorizontal, col: C.git, text: 'Track your code' },
          { icon: GitPullRequest, col: C.ghPurple, text: 'Collaborate on projects' },
          { icon: Workflow, col: C.blue, text: 'Automate your workflow' },
        ].map((p, i) => {
          const at = Q.pillars[i];
          const s = sp(t, at, { damping: 10, stiffness: 200, mass: 0.7 });
          const Icon = p.icon;
          const beat = build > 0 ? Math.exp(-((t - 38) % 0.25) * 14) * build * 0.05 : 0;
          return (
            <div key={i} style={{ position: 'absolute', left: 130 + i * 565, top: 430, width: 530, height: 190, borderRadius: 30, background: 'rgba(16,22,52,0.78)', border: `3px solid ${p.col}`, boxShadow: `0 0 ${40 * Math.exp(-Math.max(0, t - at) * 3)}px ${p.col}, 0 30px 60px rgba(0,0,0,0.4)`, display: 'flex', alignItems: 'center', gap: 26, padding: '0 34px', boxSizing: 'border-box', transform: `translateY(${(1 - s) * 260}px) rotateZ(${(1 - s) * (i - 1) * 12}deg) scale(${(0.6 + s * 0.4) * (1 + beat)})`, opacity: Math.min(1, s * 2) }}>
              <div style={{ width: 100, height: 100, flexShrink: 0, borderRadius: 26, background: p.col, display: 'grid', placeItems: 'center', boxShadow: `inset 0 -6px 0 rgba(0,0,0,0.2)` }}><Icon size={58} color="#fff" strokeWidth={2.4} /></div>
              <span style={{ fontFamily: DISPLAY, fontWeight: 800, fontSize: 44, lineHeight: 1.08, color: '#fff' }}>{p.text}</span>
            </div>
          );
        })}
        {Q.pillars.map((at, i) => <Burst key={i} t={t} at={at} x={395 + i * 565} y={430} n={10} dist={240} colors={['#fff', '#39D353']} len={40} dur={0.4} seed={i + 11} />)}
      </AbsoluteFill>
      {/* the implosion leaves one bright point */}
      {implode > 0 && <div style={{ position: 'absolute', left: 960 - 14, top: 540 - 14, width: 28, height: 28, borderRadius: '50%', background: '#fff', boxShadow: '0 0 60px 20px #7DB8FF', transform: `scale(${implode * (1 + k(t, 39.9, 40, E.inExpo) * 3)})` }} />}
    </AbsoluteFill>
  );
};
const clamp01 = (x: number) => Math.max(0, Math.min(1, x));

// ════════════════════════════════════════════════════════════════════════════
// 40–45 s  End card. FREE slams on the hit; the icon lands; teyro.app types itself.
// ════════════════════════════════════════════════════════════════════════════
export const SEnd: React.FC<{ t: number }> = ({ t }) => {
  const f = sp(t, Q.end, { damping: 10, stiffness: 210, mass: 0.8 });
  const shrink = sp(t, 40.92, { damping: 16, stiffness: 160, mass: 0.8 });
  const sh = shake(t, [[Q.end, 1.4], [41.25, 0.35], [Q.stinger, 0.3]]);
  const kk = kick(t, 8);
  const ab = Math.exp(-(t - Q.end) * 5) * 26; // chromatic split
  // icon: falls, squashes on landing, settles
  const fall = k(t, Q.icon, 41.25, E.inQuint);
  const land = t >= 41.25 ? sp(t, 41.25, { damping: 7, stiffness: 260, mass: 0.6 }) : 0;
  const squash = t >= 41.25 ? 1 - land : 0;
  const stretch = t < 41.25 ? fall * 0.25 : 0;
  const iconY = lerp(-320, 360, fall);
  const sting = Math.exp(-Math.max(0, t - Q.stinger) * 6) * (t >= Q.stinger ? 1 : 0);
  const url = 'teyro.app';
  const urlN = Q.url.filter((u) => t >= u).length;
  const cta = sp(t, Q.cta, { damping: 11, stiffness: 190, mass: 0.7 });
  return (
    <AbsoluteFill style={{ overflow: 'hidden' }}>
      <AbsoluteFill style={{ background: `radial-gradient(70% 80% at 50% 45%, #3A97FF 0%, ${C.blue} 45%, ${C.blueDeep} 100%)` }} />
      <AbsoluteFill style={{ background: 'repeating-conic-gradient(from 0deg at 50% 45%, rgba(255,255,255,0.07) 0deg 7deg, transparent 7deg 18deg)', transform: `rotate(${-t * 12}deg) scale(${1.6 + kk * 0.05})` }} />
      <AbsoluteFill style={{ transform: `translate(${sh.x}px, ${sh.y}px) rotate(${sh.r}deg)` }}>
        {/* FREE → shrinks into the top badge */}
        <div style={{ position: 'absolute', left: 0, right: 0, top: lerp(250, -40, shrink), textAlign: 'center', transform: `scale(${lerp(lerp(2.6, 1, f), 0.3, shrink)})`, transformOrigin: '50% 30%' }}>
          <span style={{ fontFamily: DISPLAY, fontWeight: 800, fontSize: 420, letterSpacing: '-0.05em', lineHeight: 1, color: shrink > 0.5 ? C.gold : '#fff', textShadow: `${ab}px 0 0 rgba(255,60,90,0.8), ${-ab}px 0 0 rgba(0,240,255,0.8), 0 ${20 * (1 - shrink)}px 60px rgba(0,30,120,0.4)`, opacity: Math.min(1, f * 3) }}>FREE.</span>
        </div>
        <div style={{ position: 'absolute', top: 720, left: 0, right: 0, opacity: 1 - k(t, 40.85, 41.05) }}>
          <Words t={t} text="Every lesson. Every unit." at={40.3} size={76} align="center" stagger={0.07} color="#DCEBFF" />
        </div>
        {/* app icon */}
        {t >= Q.icon && (
          <div style={{ position: 'absolute', left: 960 - 140, top: iconY - 140, width: 280, height: 280, transformOrigin: '50% 100%', transform: `scale(${(1 + squash * 0.35 - stretch * 0.4) * (1 + sting * 0.12 + kk * 0.03)}, ${(1 - squash * 0.3 + stretch) * (1 + sting * 0.12 + kk * 0.03)})` }}>
            <AppIcon size={280} src={img('app-icon.png')} glow={sting} />
          </div>
        )}
        <Shock t={t} at={41.25} x={960} y={500} r={520} color="#fff" width={14} dur={0.6} />
        {/* teyro.app */}
        {t >= Q.url[0] - 0.1 && (
          <div style={{ position: 'absolute', top: 545, left: 0, right: 0, textAlign: 'center', fontFamily: DISPLAY, fontWeight: 800, fontSize: 150, letterSpacing: '-0.04em', color: '#fff', textShadow: '0 16px 50px rgba(0,30,120,0.35)' }}>
            {Array.from(url).map((ch, i) => {
              const p = i < urlN ? sp(t, Q.url[i], { damping: 9, stiffness: 300, mass: 0.5 }) : 0;
              return <span key={i} style={{ display: 'inline-block', transform: `translateY(${(1 - p) * 60}px) scale(${p})`, opacity: Math.min(1, p * 2), color: i >= 5 ? C.gold : '#fff' }}>{ch}</span>;
            })}
            <span style={{ display: 'inline-block', width: 14, height: 130, marginLeft: 10, verticalAlign: 'middle', background: '#fff', opacity: Math.floor(t * 4) % 2 ? 0.9 : 0.15 }} />
          </div>
        )}
        {/* CTA */}
        {t >= Q.cta && (
          <div style={{ position: 'absolute', top: 790, left: 0, right: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 26 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 20, padding: '28px 50px', borderRadius: 999, background: '#fff', color: C.blueDark, fontFamily: DISPLAY, fontWeight: 800, fontSize: 44, boxShadow: `0 10px 0 #B9D3FF, 0 30px 60px rgba(0,30,120,0.35)`, transform: `scale(${cta * (1 + kk * 0.035)})` }}>
              Learn Git, GitHub &amp; GitHub Actions free
              <span style={{ display: 'flex', transform: `translateX(${Math.sin(t * Math.PI * 4) * 8}px)` }}><ArrowRight size={48} strokeWidth={3} /></span>
            </div>
            <div style={{ fontFamily: BODY, fontWeight: 600, fontSize: 30, color: '#DCEBFF', opacity: k(t, 43.0, 43.3), transform: `translateY(${(1 - k(t, 43.0, 43.3)) * 14}px)` }}>Search “Teyro” in your browser</div>
          </div>
        )}
        <Shock t={t} at={Q.end} x={960} y={470} r={1100} color="#fff" width={30} dur={0.9} />
        <Shock t={t} at={Q.end + 0.09} x={960} y={470} r={760} color={C.gold} width={14} dur={0.8} />
        <Burst t={t} at={Q.end} x={960} y={470} n={26} dist={760} colors={['#fff', C.gold, '#BFE0FF']} len={170} thick={12} dur={0.8} />
        <Confetti t={t} at={Q.end + 0.05} x={960} y={420} n={70} spread={1500} dur={2.2} size={22} />
        <Burst t={t} at={Q.stinger} x={960} y={360} n={16} dist={330} colors={['#fff', C.gold]} len={60} dur={0.5} />
        <Shock t={t} at={Q.stinger} x={960} y={360} r={360} color="#fff" width={10} dur={0.5} />
      </AbsoluteFill>
      <Flash t={t} at={Q.end} peak={1} dur={0.35} />
    </AbsoluteFill>
  );
};

