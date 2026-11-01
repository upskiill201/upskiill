import React from 'react';
import { FaGithub } from 'react-icons/fa';
import { BookOpen, Clock, Layers } from 'lucide-react';
import { AbsoluteFill, Img } from 'remotion';
import { BODY, C, DISPLAY, E, MONO, Q, img, k, kick, lerp, shake, sp } from './lib';
import { Burst, Confetti, Flash, Shock, Words, pop } from './fx';
import { ActionsMark, AppIcon, GitMark, LightBg } from './common';

export const ACTIONS_GRAD = 'linear-gradient(90deg, #C084FC 0%, #8B7BFF 50%, #3D7BFF 100%)';

/** The three marks from the course art, as standalone animatable tiles. */
export const Tile: React.FC<{ kind: 0 | 1 | 2; size: number; t: number; draw?: number }> = ({ kind, size, draw = 1 }) => {
  const bg = kind === 0 ? 'linear-gradient(145deg,#FF6A4D,#E8412A)' : kind === 1 ? 'linear-gradient(145deg,#1F2430,#0D1117)' : 'linear-gradient(145deg,#2E8BFF,#1452F0)';
  return (
    <div style={{ width: size, height: size, borderRadius: size * 0.24, background: bg, display: 'grid', placeItems: 'center', boxShadow: `0 ${size * 0.12}px ${size * 0.3}px rgba(4,10,40,0.45), inset 0 2px 0 rgba(255,255,255,0.25)`, border: kind === 1 ? '2px solid #2B3245' : 'none' }}>
      {kind === 0 && <GitMark size={size * 0.62} color="#fff" />}
      {kind === 1 && <FaGithub size={size * 0.62} color="#fff" />}
      {kind === 2 && <ActionsMark size={size * 0.66} draw={draw} />}
    </div>
  );
};

// ════════════════════════════════════════════════════════════════════════════
// 16–18 s  DROP. The Teyro icon slams in; Git, GitHub and Actions orbit it.
// ════════════════════════════════════════════════════════════════════════════
export const SDrop: React.FC<{ t: number }> = ({ t }) => {
  const s = sp(t, Q.drop, { damping: 10, stiffness: 190, mass: 0.8 });
  const lift = sp(t, Q.headline, { damping: 15, stiffness: 150, mass: 0.8 });
  const sh = shake(t, [[Q.drop, 1.3], [Q.headline, 0.25]]);
  const kk = kick(t, 8);
  const iconS = lerp(3.4, 1, s) * lerp(1, 0.62, lift) * (1 + kk * 0.05);
  const iconY = lerp(500, 300, lift);
  const blur = (1 - k(t, Q.drop, Q.drop + 0.16)) * 26;
  const wipe = k(t, 17.82, 18.06, E.inExpo);
  const orbitIn = k(t, Q.drop + 0.1, Q.drop + 0.7, E.outExpo);
  return (
    <AbsoluteFill style={{ overflow: 'hidden' }}>
      <AbsoluteFill style={{ background: `radial-gradient(70% 80% at 50% 45%, #3A97FF 0%, ${C.blue} 45%, ${C.blueDeep} 100%)` }} />
      <AbsoluteFill style={{ background: 'repeating-conic-gradient(from 0deg at 50% 46%, rgba(255,255,255,0.075) 0deg 7deg, transparent 7deg 18deg)', transform: `rotate(${t * 14}deg) scale(${1.6 + kk * 0.06})`, opacity: 0.9 }} />
      <AbsoluteFill style={{ transform: `translate(${sh.x}px, ${sh.y}px) rotate(${sh.r}deg)` }}>
        {/* orbiting marks: back half first, icon, then front half */}
        {[0, 1, 2].map((i) => <Orbit key={'b' + i} t={t} i={i} front={false} cy={iconY} grow={orbitIn} lift={lift} />)}
        <div style={{ position: 'absolute', left: 960 - 180, top: iconY - 180, width: 360, height: 360, transform: `scale(${iconS}) rotate(${(1 - s) * -16}deg)`, filter: blur > 0.5 ? `blur(${blur}px)` : undefined }}>
          <AppIcon size={360} src={img('app-icon.png')} glow={Math.exp(-(t - Q.drop) * 3)} />
        </div>
        {[0, 1, 2].map((i) => <Orbit key={'f' + i} t={t} i={i} front cy={iconY} grow={orbitIn} lift={lift} />)}
        <Shock t={t} at={Q.drop} x={960} y={500} r={900} color="#fff" width={26} dur={0.8} />
        <Shock t={t} at={Q.drop + 0.08} x={960} y={500} r={650} color="#fff" width={12} dur={0.7} />
        <Shock t={t} at={Q.drop + 0.16} x={960} y={500} r={420} color={C.gold} width={10} dur={0.6} />
        <Burst t={t} at={Q.drop} x={960} y={500} n={22} dist={620} colors={['#fff', C.gold, '#BFE0FF']} len={140} thick={10} dur={0.7} />
        <div style={{ position: 'absolute', top: 560, left: 0, right: 0 }}>
          <Words t={t} text="Learn it all on Teyro." at={Q.headline} out={17.62} size={124} align="center" stagger={0.065} hi={{ 4: C.gold }} />
        </div>
      </AbsoluteFill>
      <Flash t={t} at={Q.drop} peak={1} dur={0.3} />
      {/* light page rises with a curved edge */}
      {wipe > 0 && <div style={{ position: 'absolute', left: -600, right: -600, top: lerp(1250, -900, wipe), height: 2600, borderRadius: '50% 50% 0 0', background: C.page }} />}
    </AbsoluteFill>
  );
};

const Orbit: React.FC<{ t: number; i: number; front: boolean; cy: number; grow: number; lift: number }> = ({ t, i, front, cy, grow, lift }) => {
  const a = t * 1.5 + (i * Math.PI * 2) / 3;
  const depth = Math.sin(a);
  if ((depth > 0) !== front) return null;
  const rx = lerp(120, lerp(560, 640, lift), grow), ry = lerp(40, 150, grow);
  const x = 960 + Math.cos(a) * rx, y = cy + depth * ry - lift * 20;
  const sc = (0.72 + (depth + 1) * 0.22) * grow;
  return (
    <div style={{ position: 'absolute', left: x - 80, top: y - 80, transform: `scale(${sc}) rotate(${Math.cos(a) * 10}deg)`, filter: depth < 0 ? `blur(${(-depth) * 3}px) brightness(0.85)` : undefined }}>
      <Tile kind={i as 0 | 1 | 2} size={160} t={t} />
    </div>
  );
};

// ════════════════════════════════════════════════════════════════════════════
// 18–20 s  The course card, assembled from its parts. FREE stamps on the beat.
// ════════════════════════════════════════════════════════════════════════════
const CMDS = ['git init', 'git add .', 'git commit -m "Initial commit"', 'git push'];
export const SCourse: React.FC<{ t: number }> = ({ t }) => {
  const card = sp(t, 17.95, { damping: 16, stiffness: 150, mass: 0.8 });
  const press = t >= Q.press && t < Q.press + 0.12;
  const dive = k(t, 19.84, 20.0, E.inExpo);
  const BX = 1310, BY = 812; // button centre
  const zoom = 1 + dive * 18;
  const sh = shake(t, [[Q.free, 0.55]]);
  return (
    <AbsoluteFill style={{ overflow: 'hidden' }}>
      <LightBg t={t} />
      <AbsoluteFill style={{ transformOrigin: '0 0', transform: `translate(${BX}px, ${BY}px) scale(${zoom}) translate(${-BX}px, ${-BY}px) translate(${sh.x}px, ${sh.y}px)` }}>
        <div style={{ position: 'absolute', left: 150, top: 170, width: 1620, height: 740, borderRadius: 40, background: '#fff', border: `2px solid ${C.border}`, boxShadow: '0 40px 100px rgba(23,42,120,0.14)', transform: `translateY(${(1 - card) * 300}px) scale(${0.9 + card * 0.1})`, opacity: Math.min(1, card * 2) }} />
        {/* art panel, rebuilt from the course thumbnail */}
        <div style={{ position: 'absolute', left: 200, top: 220, width: 700, height: 640, borderRadius: 30, overflow: 'hidden', background: 'radial-gradient(90% 70% at 80% 20%, #2B2A9E 0%, #12134F 45%, #090B2E 100%)', transform: `scale(${pop(t, 18.0, true)})` }}>
          <svg width={700} height={640} style={{ position: 'absolute', inset: 0 }}>
            <ellipse cx={350} cy={190} rx={290} ry={90} fill="none" stroke="#5B6BFF" strokeWidth={3} opacity={0.6} pathLength={1} strokeDasharray={1} strokeDashoffset={1 - k(t, 18.0, 18.6)} />
          </svg>
          {[0, 1, 2].map((i) => {
            const p = sp(t, 17.98 + i * 0.07, { damping: 11, stiffness: 180, mass: 0.7 });
            const bob = Math.sin(t * 3 + i * 1.7) * 8;
            return <div key={i} style={{ position: 'absolute', left: 95 + i * 190, top: 100 + bob + (1 - p) * -260, transform: `scale(${p}) rotate(${(1 - p) * (i - 1) * 30}deg)` }}><Tile kind={i as 0 | 1 | 2} size={150} t={t} draw={k(t, 18.1, 18.8, E.linear)} /></div>;
          })}
          <div style={{ position: 'absolute', left: 50, right: 50, top: 330, height: 260, borderRadius: 22, background: 'rgba(5,8,30,0.75)', border: '2px solid #2E3590', padding: '22px 30px', boxSizing: 'border-box' }}>
            {CMDS.map((c, i) => {
              const a = 18.1 + i * 0.25, n = Math.floor(k(t, a, a + 0.22, E.linear) * c.length);
              return (
                <div key={i} style={{ fontFamily: MONO, fontSize: 28, height: 52, color: '#E8ECFF', whiteSpace: 'pre' }}>
                  <span style={{ color: '#5B6BFF' }}>{i + 1}  </span><span style={{ color: '#F472B6' }}>{c.slice(0, Math.min(n, 3))}</span>{c.slice(3, n)}
                </div>
              );
            })}
          </div>
        </div>
        {/* text column */}
        <div style={{ position: 'absolute', left: 970, top: 230, width: 740 }}>
          <div style={{ fontFamily: DISPLAY, fontWeight: 800, fontSize: 24, letterSpacing: '0.12em', color: C.blue, opacity: k(t, 18.0, 18.2) }}>CODING · BEGINNER</div>
          <div style={{ marginTop: 14 }}>
            <Words t={t} text="Learn Git, GitHub, and GitHub Actions" at={18.0} size={78} color={C.ink} stagger={0.05} lineHeight={1.06} hi={{ 4: ACTIONS_GRAD, 5: ACTIONS_GRAD }} />
          </div>
          <div style={{ marginTop: 22, fontFamily: BODY, fontSize: 27, lineHeight: 1.45, color: C.text2, opacity: k(t, 18.3, 18.6), transform: `translateY(${(1 - k(t, 18.3, 18.6)) * 16}px)` }}>Manage code, collaborate on projects, and automate your development workflow.</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, marginTop: 30 }}>
            <Chip t={t} at={Q.chips[0]} icon={<BookOpen size={26} />} text="57 lessons" />
            <Chip t={t} at={Q.chips[1]} icon={<Layers size={26} />} text="5 units" />
            <Chip t={t} at={Q.chips[2]} icon={<Clock size={26} />} text="6h 7m" />
            <Chip t={t} at={Q.chips[3]} icon={<Img src={img('xp-bolt.svg')} width={30} />} text="Up to 820 XP" gold />
          </div>
        </div>
        {/* START LEARNING FREE */}
        {t >= 19.45 && (
          <div style={{ position: 'absolute', left: BX - 380, top: BY - 50, width: 760, height: 100, transform: `scale(${pop(t, 19.45)})` }}>
            <div style={{ position: 'absolute', inset: 0, top: 10, borderRadius: 22, background: C.greenDark }} />
            <div style={{ position: 'absolute', inset: 0, bottom: press ? 0 : 10, top: press ? 10 : 0, borderRadius: 22, background: C.green, display: 'grid', placeItems: 'center', fontFamily: DISPLAY, fontWeight: 800, fontSize: 36, letterSpacing: '0.06em', color: '#fff' }}>START LEARNING FREE</div>
          </div>
        )}
        {/* FREE COURSE stamp */}
        <Stamp t={t} />
        <Confetti t={t} at={Q.free} x={830} y={250} n={44} spread={1000} />
      </AbsoluteFill>
      <AbsoluteFill style={{ background: '#DFF3D2', opacity: k(t, 19.9, 20.0) }} />
    </AbsoluteFill>
  );
};

const Chip: React.FC<{ t: number; at: number; icon: React.ReactNode; text: string; gold?: boolean }> = ({ t, at, icon, text, gold }) => {
  const p = pop(t, at);
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 22px', borderRadius: 16, background: gold ? '#FFF6D6' : '#F1F5FB', border: `2px solid ${gold ? '#FFD84D' : C.border}`, color: gold ? '#B07800' : C.ink, fontFamily: DISPLAY, fontWeight: 700, fontSize: 28, transform: `scale(${p}) translateY(${(1 - p) * 20}px)`, opacity: Math.min(1, p * 2) }}>
      <span style={{ display: 'flex', color: gold ? '#B07800' : C.text2 }}>{icon}</span>{text}
    </div>
  );
};

const Stamp: React.FC<{ t: number }> = ({ t }) => {
  if (t < Q.free) return null;
  const p = sp(t, Q.free, { damping: 9, stiffness: 260, mass: 0.7 });
  return (
    <>
      <div style={{ position: 'absolute', left: 540, top: 168, transform: `scale(${lerp(2.6, 1, p)}) rotate(-9deg)`, opacity: Math.min(1, p * 3), padding: '18px 34px', borderRadius: 18, background: C.green, border: '6px solid #fff', boxShadow: `0 18px 40px rgba(70,163,2,0.45), 0 10px 0 ${C.greenDark}`, fontFamily: DISPLAY, fontWeight: 800, fontSize: 46, letterSpacing: '0.06em', color: '#fff', whiteSpace: 'nowrap' }}>FREE COURSE</div>
      <Shock t={t} at={Q.free} x={730} y={215} r={420} color={C.green} width={16} />
      <Burst t={t} at={Q.free} x={730} y={215} n={14} dist={320} colors={[C.green, C.gold, '#fff']} />
    </>
  );
};
