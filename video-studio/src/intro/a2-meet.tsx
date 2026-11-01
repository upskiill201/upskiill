import React from 'react';
import { Clock, Code2, Sparkles } from 'lucide-react';
import { AbsoluteFill, Img } from 'remotion';
import { C, DISPLAY, E, Q, img, k, kick, lerp, shake, sp } from './lib';
import { Burst, Flash, Shock, Smear, Words, pop } from '../showreel/fx';
import { AppIcon, LightBg } from '../showreel/common';

/** Brand-blue stage with turning rays (the drop and the end card). */
export const BlueStage: React.FC<{ t: number; dir?: number }> = ({ t, dir = 1 }) => {
  const kk = kick(t, 8);
  return (
    <>
      <AbsoluteFill style={{ background: `radial-gradient(70% 80% at 50% 42%, #3A97FF 0%, ${C.blue} 45%, ${C.blueDeep} 100%)` }} />
      <AbsoluteFill style={{ background: 'repeating-conic-gradient(from 0deg at 50% 42%, rgba(255,255,255,0.075) 0deg 7deg, transparent 7deg 18deg)', transform: `rotate(${dir * t * 13}deg) scale(${1.6 + kk * 0.06})` }} />
    </>
  );
};

// ════════════════════════════════════════════════════════════════════════════
// 20–24 s  DROP — the icon lands; the game pieces orbit it. "Meet Teyro."
// ════════════════════════════════════════════════════════════════════════════
const RING = ['burn.png', 'Coin.png', 'gem.png', 'heart.png', 'trophy.png', 'chest-gold.svg'];
export const SDrop: React.FC<{ t: number }> = ({ t }) => {
  const s = sp(t, Q.drop, { damping: 10, stiffness: 190, mass: 0.8 });
  const lift = sp(t, Q.tagline, { damping: 15, stiffness: 150, mass: 0.8 });
  const sh = shake(t, [[Q.drop, 1.3]]);
  const kk = kick(t, 8);
  const iconY = lerp(440, 300, lift);
  const iconS = lerp(3.4, 1, s) * lerp(1, 0.72, lift) * (1 + kk * 0.05);
  const blur = (1 - k(t, Q.drop, Q.drop + 0.16)) * 26;
  const orbitIn = k(t, Q.drop + 0.1, Q.drop + 0.8, E.outExpo);
  const wipe = k(t, 23.8, 24.06, E.inExpo);
  return (
    <AbsoluteFill style={{ overflow: 'hidden' }}>
      <BlueStage t={t} />
      <AbsoluteFill style={{ transform: `translate(${sh.x}px, ${sh.y}px) rotate(${sh.r}deg)` }}>
        {RING.map((f, i) => {
          const a = t * 1.3 + (i / RING.length) * Math.PI * 2;
          const depth = Math.sin(a);
          const rx = lerp(150, lerp(560, 720, lift), orbitIn), ry = lerp(40, lerp(200, 150, lift), orbitIn);
          return <Img key={f + i} src={img(f)} style={{ position: 'absolute', left: 960 + Math.cos(a) * rx - 60, top: iconY + depth * ry - 60, width: 120, height: 120, objectFit: 'contain', zIndex: depth > 0 ? 3 : 1, transform: `scale(${(0.7 + (depth + 1) * 0.22) * orbitIn})`, filter: `drop-shadow(0 12px 22px rgba(0,20,90,0.35))${depth < 0 ? ` blur(${-depth * 2.5}px)` : ''}` }} />;
        })}
        <div style={{ position: 'absolute', left: 960 - 170, top: iconY - 170, width: 340, height: 340, zIndex: 2, transform: `scale(${iconS}) rotate(${(1 - s) * -16}deg)`, filter: blur > 0.5 ? `blur(${blur}px)` : undefined }}>
          <AppIcon size={340} src={img('app-icon.png')} glow={Math.exp(-(t - Q.drop) * 3)} />
        </div>
        <Shock t={t} at={Q.drop} x={960} y={440} r={950} color="#fff" width={26} dur={0.8} />
        <Shock t={t} at={Q.drop + 0.08} x={960} y={440} r={650} color="#fff" width={12} dur={0.7} />
        <Shock t={t} at={Q.drop + 0.16} x={960} y={440} r={420} color={C.gold} width={10} dur={0.6} />
        <Burst t={t} at={Q.drop} x={960} y={440} n={24} dist={680} colors={['#fff', C.gold, '#BFE0FF']} len={150} thick={10} dur={0.75} />
        <div style={{ position: "absolute", top: 730, left: 0, right: 0, zIndex: 4 }}>
          {t < Q.tagline
            ? <Words t={t} text="Meet Teyro." at={Q.meet} out={Q.tagline - 0.12} size={170} align="center" stagger={0.09} hi={{ 1: C.gold }} />
            : <Words t={t} text="The fun way to finish learning coding and AI." at={Q.tagline} size={96} align="center" stagger={0.06} hi={{ 4: C.gold }} style={{ padding: "0 140px" }} lineHeight={1.08} />}
        </div>
        {/* hand-drawn underline under "finish" */}
        {t > Q.tagline + 0.5 && (
          <svg width={1920} height={1080} style={{ position: 'absolute', inset: 0, zIndex: 5 }}>
            <path d="M 975 834 C 1040 824, 1150 826, 1222 832" stroke={C.gold} strokeWidth={10} fill="none" strokeLinecap="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - k(t, Q.tagline + 0.5, Q.tagline + 0.85, E.outCubic)} />
          </svg>
        )}
      </AbsoluteFill>
      <Flash t={t} at={Q.drop} peak={1} dur={0.3} />
      {wipe > 0 && <div style={{ position: 'absolute', left: -600, right: -600, top: lerp(1250, -900, wipe), height: 2600, borderRadius: '50% 50% 0 0', background: C.page }} />}
    </AbsoluteFill>
  );
};

// ════════════════════════════════════════════════════════════════════════════
// 24–28 s  TRACKS — Coding or AI. (Copy is the homepage's.)
// ════════════════════════════════════════════════════════════════════════════
const TRACKS = [
  { name: 'Coding', line: 'From your first line to real apps.', col: C.blue, dark: C.blueDark, icon: Code2, topics: ['Web development', 'Mobile apps', 'Programming basics'] },
  { name: 'AI', line: 'Put AI to work, then build with it.', col: C.purple, dark: '#7322C0', icon: Sparkles, topics: ['Use AI tools', 'Build AI agents', 'Create automations'] },
];
export const STracks: React.FC<{ t: number }> = ({ t }) => {
  const exit = k(t, 27.7, 28.0, E.inExpo);
  return (
    <AbsoluteFill>
      <LightBg t={t} />
      <Smear amt={exit * 70} id="trx" style={{ transform: `translateX(${-exit * 2400}px)` }}>
        <div style={{ position: 'absolute', top: 70, left: 0, right: 0 }}>
          <Words t={t} text="Coding or AI. Start where you want to go." at={24.0} size={76} color={C.ink} align="center" stagger={0.05} hi={{ 0: C.blue, 2: C.purple }} />
        </div>
        {TRACKS.map((tr, i) => {
          const at = Q.tracks[i];
          const p = sp(t, at, { damping: 13, stiffness: 160, mass: 0.8 });
          const Icon = tr.icon;
          const x = 170 + i * 820;
          return (
            <div key={tr.name} style={{ position: 'absolute', left: x, top: 230, width: 760, perspective: 1600 }}>
              <div style={{ borderRadius: 40, background: '#fff', boxShadow: '0 40px 90px rgba(23,42,120,0.16)', border: `3px solid ${C.border}`, overflow: 'hidden', transform: `translateY(${(1 - p) * 500}px) rotateX(${(1 - p) * 50}deg) rotateZ(${(1 - p) * (i ? 8 : -8)}deg)`, opacity: Math.min(1, p * 2) }}>
                <div style={{ height: 230, background: `linear-gradient(135deg, ${tr.col}, ${tr.dark})`, position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', right: -60, top: -80, width: 360, height: 360, borderRadius: '50%', background: 'rgba(255,255,255,0.12)', transform: `scale(${1 + kick(t, 9) * 0.05})` }} />
                  <div style={{ position: 'absolute', left: 50, top: 50, width: 130, height: 130, borderRadius: 34, background: 'rgba(255,255,255,0.2)', display: 'grid', placeItems: 'center', transform: `rotate(${Math.sin(t * 2 + i) * 6}deg)` }}><Icon size={76} color="#fff" strokeWidth={2.2} /></div>
                  <div style={{ position: 'absolute', left: 220, top: 70, fontFamily: DISPLAY, fontWeight: 800, fontSize: 84, color: '#fff' }}>{tr.name}</div>
                </div>
                <div style={{ padding: '36px 50px 44px' }}>
                  <div style={{ fontFamily: DISPLAY, fontWeight: 800, fontSize: 44, color: C.ink, lineHeight: 1.15 }}>{tr.line}</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, marginTop: 30 }}>
                    {tr.topics.map((tp, j) => {
                      const q = pop(t, Q.topics[i * 3 + j]);
                      return <div key={tp} style={{ padding: '12px 22px', borderRadius: 999, background: i ? '#F3EBFF' : '#E5F1FF', color: tr.dark, fontFamily: DISPLAY, fontWeight: 700, fontSize: 28, transform: `scale(${q})`, opacity: Math.min(1, q * 2) }}>{tp}</div>;
                    })}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        {t >= Q.path2min - 0.05 && (
          <div style={{ position: 'absolute', top: 900, left: 0, right: 0, display: 'flex', justifyContent: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '20px 36px', borderRadius: 999, background: C.ink, color: '#fff', fontFamily: DISPLAY, fontWeight: 800, fontSize: 36, transform: `scale(${pop(t, Q.path2min)})` }}>
              <Clock size={40} color={C.gold} strokeWidth={2.6} />Your path is ready in under two minutes
            </div>
          </div>
        )}
      </Smear>
    </AbsoluteFill>
  );
};

