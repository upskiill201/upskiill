import React from 'react';
import { ArrowRight, Code2, Smartphone, Sparkles, TrendingUp, Zap } from 'lucide-react';
import { AbsoluteFill, Img } from 'remotion';
import { BODY, C, DISPLAY, E, Q, img, k, kick, lerp, shake, sp } from './lib';
import { Burst, Confetti, Flash, Shock, Smear, Words, pop } from '../showreel/fx';
import { AppIcon, LightBg, NightBg } from '../showreel/common';
import { BlueStage } from './a2-meet';
import { PCOLS, gridPos } from './a1-problem';
import { Person } from './kit';

// ════════════════════════════════════════════════════════════════════════════
// 62–66 s  The callback: the same 20 learners. This time every one of them lights up,
// and the bar that was stuck at 12 % runs to the end.
// ════════════════════════════════════════════════════════════════════════════
export const SBack: React.FC<{ t: number }> = ({ t }) => {
  const enter = k(t, 62.0, 62.35, E.outExpo);
  const fill = 0.12 + Math.pow(k(t, 64.0, 65.95, E.linear), 2.2) * 0.88;
  const done = t >= Q.complete;
  const sh = shake(t, [[65.0, 0.15], [65.5, 0.25], [65.75, 0.35]]);
  return (
    <AbsoluteFill>
      <LightBg t={t} />
      <AbsoluteFill style={{ transform: `translateX(${(1 - enter) * 1600}px) translate(${sh.x}px, ${sh.y}px)` }}>
        <div style={{ position: 'absolute', left: 110, top: 150, width: 820 }}>
          <Words t={t} text="Most people quit online courses." at={Q.back + 0.04} size={78} color={C.text2} stagger={0.05} lineHeight={1.08} />
          <div style={{ marginTop: 26 }}><Words t={t} text="Teyro learners come back." at={Q.back2} size={104} color={C.ink} stagger={0.07} lineHeight={1.02} hi={{ 0: C.blue, 3: C.blue }} /></div>
        </div>
        {/* the bar from the opening */}
        <div style={{ position: 'absolute', left: 110, top: 720, width: 780, opacity: k(t, 63.6, 63.9) }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: DISPLAY, fontWeight: 800, fontSize: 30, color: C.text2, marginBottom: 14 }}>
            <span>Your course</span><span style={{ color: fill > 0.99 ? C.greenDark : C.blue }}>{Math.round(fill * 100)}% complete</span>
          </div>
          <div style={{ height: 44, borderRadius: 22, background: '#E2E8F0', overflow: 'hidden' }}>
            <div style={{ width: `${fill * 100}%`, height: '100%', borderRadius: 22, background: `linear-gradient(90deg, ${C.blue}, ${C.green})`, position: 'relative' }}>
              <div style={{ position: 'absolute', left: 14, right: 14, top: 8, height: 10, borderRadius: 5, background: 'rgba(255,255,255,0.35)' }} />
            </div>
          </div>
        </div>
        {Array.from({ length: 20 }).map((_, i) => {
          const p = gridPos(i), at = Q.lightUp[i];
          const s = pop(t, 62.1 + i * 0.025, true);
          const on = t >= at;
          const hit = on ? Math.exp(-(t - at) * 6) : 0;
          return <Person key={i} x={p.x} y={p.y + 40} color={PCOLS[i % 10]} grey={on ? 0 : 1} scale={s * (1 + hit * 0.2)} glow={on ? 0.5 + hit * 0.5 : 0} flame={on ? pop(t, at + 0.03) : 0} seed={i} />;
        })}
        {Q.lightUp.map((at, i) => { const p = gridPos(i); return <Shock key={i} t={t} at={at} x={p.x} y={p.y + 80} r={110} color={PCOLS[i % 10]} width={6} dur={0.4} />; })}
      </AbsoluteFill>
      {done && <Flash t={t} at={Q.complete} peak={0.9} dur={0.25} />}
    </AbsoluteFill>
  );
};

// ════════════════════════════════════════════════════════════════════════════
// 66–70 s  Course complete. What finishing gets you (homepage copy).
// ════════════════════════════════════════════════════════════════════════════
const OUT = [
  { icon: Code2, col: C.blue, text: 'From your first line to real apps.' },
  { icon: Sparkles, col: C.purple, text: 'Put AI to work, then build with it.' },
  { icon: TrendingUp, col: C.greenDark, text: 'Keep up as work keeps changing.' },
];
export const SComplete: React.FC<{ t: number }> = ({ t }) => {
  const stamp = sp(t, Q.complete, { damping: 9, stiffness: 240, mass: 0.7 });
  const lift = sp(t, Q.outcomes[0] - 0.1, { damping: 15, stiffness: 150, mass: 0.8 });
  const sh = shake(t, [[Q.complete, 1.0]]);
  const exit = k(t, 69.75, 70.0, E.inExpo);
  return (
    <AbsoluteFill>
      <LightBg t={t} tint="#D9F2C8" tint2="#DCE8FF" />
      <AbsoluteFill style={{ background: 'repeating-conic-gradient(from 0deg at 50% 40%, rgba(88,204,2,0.08) 0deg 7deg, transparent 7deg 18deg)', transform: `rotate(${t * 12}deg) scale(1.6)` }} />
      <Smear amt={exit * 60} id="cmpy" vertical style={{ transform: `translate(${sh.x}px, ${sh.y - exit * 1300}px)` }}>
        {/* the medal */}
        <div style={{ position: 'absolute', left: 960 - 170, top: lerp(250, 110, lift) - 170, width: 340, height: 340, transform: `scale(${lerp(2.4, 1, stamp) * lerp(1, 0.6, lift)}) rotate(${(1 - stamp) * -20}deg)`, display: 'grid', placeItems: 'center' }}>
          <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: `radial-gradient(circle at 35% 30%, #8BE33A, ${C.green} 55%, ${C.greenDark})`, boxShadow: `0 16px 0 #3F8F00, 0 40px 80px rgba(70,163,2,0.45)` }} />
          <Img src={img('trophy.png')} width={190} style={{ position: 'relative' }} />
        </div>
        <div style={{ position: 'absolute', top: lerp(470, 300, lift), left: 0, right: 0 }}>
          <Words t={t} text="Course complete!" at={Q.complete + 0.05} out={Q.outcomes[0] - 0.2} size={140} color={C.greenDark} align="center" stagger={0.08} />
        </div>
        {t >= Q.outcomes[0] - 0.2 && (
          <div style={{ position: 'absolute', top: 300, left: 0, right: 0 }}>
            <Words t={t} text="The skill you start is the skill you finish." at={Q.outcomes[0] - 0.15} size={84} color={C.ink} align="center" stagger={0.05} hi={{ 3: C.blue, 8: C.greenDark }} style={{ padding: '0 120px' }} />
          </div>
        )}
        {OUT.map((o, i) => {
          const s = sp(t, Q.outcomes[i], { damping: 10, stiffness: 190, mass: 0.7 });
          const Icon = o.icon;
          return (
            <div key={i} style={{ position: 'absolute', left: 130 + i * 565, top: 600, width: 530, height: 230, borderRadius: 36, background: '#fff', border: `3px solid ${C.border}`, boxShadow: '0 30px 70px rgba(23,42,120,0.14)', display: 'flex', alignItems: 'center', gap: 26, padding: '0 34px', boxSizing: 'border-box', transform: `translateY(${(1 - s) * 400}px) rotate(${(1 - s) * (i - 1) * 10}deg)`, opacity: Math.min(1, s * 2) }}>
              <div style={{ width: 110, height: 110, flexShrink: 0, borderRadius: 30, background: o.col, display: 'grid', placeItems: 'center', boxShadow: 'inset 0 -6px 0 rgba(0,0,0,0.18)' }}><Icon size={62} color="#fff" strokeWidth={2.4} /></div>
              <span style={{ fontFamily: DISPLAY, fontWeight: 800, fontSize: 40, lineHeight: 1.12, color: C.ink }}>{o.text}</span>
            </div>
          );
        })}
        <Shock t={t} at={Q.complete} x={960} y={250} r={900} color={C.green} width={24} dur={0.8} />
        <Shock t={t} at={Q.complete + 0.08} x={960} y={250} r={600} color={C.gold} width={12} dur={0.7} />
        <Burst t={t} at={Q.complete} x={960} y={250} n={22} dist={600} colors={[C.green, C.gold, '#fff']} len={130} thick={10} dur={0.7} />
        <Confetti t={t} at={Q.complete} x={960} y={250} n={80} spread={1500} dur={2.4} size={22} />
      </Smear>
    </AbsoluteFill>
  );
};

// ════════════════════════════════════════════════════════════════════════════
// 70–72 s  The line from the loading screen, on the build.
// ════════════════════════════════════════════════════════════════════════════
export const SQuote: React.FC<{ t: number }> = ({ t }) => {
  const enter = k(t, 70.0, 70.3, E.outExpo);
  const implode = k(t, 71.6, 71.95, E.inExpo);
  const sh = shake(t, [[70.5, 0.15], [71.0, 0.25], [71.25, 0.35], [71.5, 0.45]]);
  return (
    <AbsoluteFill style={{ overflow: 'hidden' }}>
      <NightBg t={t} speed={300 + k(t, 70, 72) * 600} />
      <AbsoluteFill style={{ opacity: enter, transformOrigin: '960px 540px', transform: `scale(${(1 - implode) * lerp(1.06, 1, enter)}) translate(${sh.x}px, ${sh.y}px)` }}>
        <div style={{ position: 'absolute', top: 300, left: 0, right: 0 }}>
          <Words t={t} text="Every expert you admire was once a beginner who refused to quit." at={70.0} size={104} align="center" stagger={0.1} hi={{ 7: C.gold, 9: C.gold, 10: C.gold, 11: C.gold }} style={{ padding: '0 150px' }} lineHeight={1.1} />
        </div>
      </AbsoluteFill>
      {implode > 0 && <div style={{ position: 'absolute', left: 960 - 14, top: 540 - 14, width: 28, height: 28, borderRadius: '50%', background: '#fff', boxShadow: '0 0 60px 20px #7DB8FF', transform: `scale(${implode * (1 + k(t, 71.85, 72, E.inExpo) * 3)})` }} />}
    </AbsoluteFill>
  );
};

// ════════════════════════════════════════════════════════════════════════════
// 72–80 s  End card. Icon → "Start your streak today." → teyro.app becomes the button.
// ════════════════════════════════════════════════════════════════════════════
export const SEnd: React.FC<{ t: number }> = ({ t }) => {
  const s = sp(t, Q.end, { damping: 10, stiffness: 200, mass: 0.8 });
  const sh = shake(t, [[Q.end, 1.3], [Q.stinger, 0.3]]);
  const kk = kick(t, 8);
  const sting = t >= Q.stinger ? Math.exp(-(t - Q.stinger) * 6) : 0;
  const blur = (1 - k(t, Q.end, Q.end + 0.16)) * 26;
  const url = 'teyro.app';
  const urlN = Q.url.filter((u) => t >= u).length;
  const cta = sp(t, Q.cta, { damping: 12, stiffness: 190, mass: 0.7 });
  const ctaC = k(t, Q.cta, Q.cta + 0.2);
  const PILLS: [React.ReactNode, string][] = [[<Zap key="z" size={30} color={C.gold} fill={C.gold} />, 'Free to start'], [<Img key="b" src={img('burn.png')} width={30} />, 'Bite-sized lessons'], [<Smartphone key="s" size={30} color="#fff" />, 'No app store needed']];
  return (
    <AbsoluteFill style={{ overflow: 'hidden' }}>
      <BlueStage t={t} dir={-1} />
      <AbsoluteFill style={{ transform: `translate(${sh.x}px, ${sh.y}px) rotate(${sh.r}deg)` }}>
        <div style={{ position: 'absolute', left: 960 - 130, top: 250 - 130, width: 260, height: 260, transform: `scale(${lerp(3.2, 1, s) * (1 + kk * 0.03 + sting * 0.12)}) rotate(${(1 - s) * -16}deg)`, filter: blur > 0.5 ? `blur(${blur}px)` : undefined }}>
          <AppIcon size={260} src={img('app-icon.png')} glow={Math.max(sting, Math.exp(-(t - Q.end) * 3))} />
        </div>
        <div style={{ position: 'absolute', top: 430, left: 0, right: 0 }}>
          <Words t={t} text="Start your streak today." at={Q.start} size={100} align="center" stagger={0.07} hi={{ 2: C.gold }} />
        </div>
        {/* teyro.app, which becomes the button */}
        {t >= Q.url[0] - 0.05 && (
          <div style={{ position: 'absolute', top: 580, left: 0, right: 0, display: 'flex', justifyContent: 'center' }}>
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 26, padding: '14px 64px', fontFamily: DISPLAY, fontWeight: 800, fontSize: 132, letterSpacing: '-0.04em', lineHeight: 1.1 }}>
              <div style={{ position: 'absolute', inset: 0, borderRadius: 999, background: '#fff', boxShadow: `0 14px 0 #B9D3FF, 0 40px 80px rgba(0,30,120,0.35)`, transform: `scale(${cta * (1 + kk * 0.025)})` }} />
              <span style={{ position: 'relative' }}>
                {Array.from(url).map((ch, i) => {
                  const p = i < urlN ? sp(t, Q.url[i], { damping: 9, stiffness: 300, mass: 0.5 }) : 0;
                  const base = i >= 5 ? (ctaC > 0.5 ? C.blue : C.gold) : (ctaC > 0.5 ? C.blueDark : '#fff');
                  return <span key={i} style={{ display: 'inline-block', transform: `translateY(${(1 - p) * 60}px) scale(${p})`, opacity: Math.min(1, p * 2), color: base }}>{ch}</span>;
                })}
              </span>
              {t >= Q.cta && <span style={{ position: 'relative', display: 'flex', transform: `scale(${cta}) translateX(${Math.sin(t * Math.PI * 4) * 8}px)` }}><ArrowRight size={96} color={C.blueDark} strokeWidth={3.2} /></span>}
            </div>
          </div>
        )}
        <div style={{ position: 'absolute', top: 820, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 22 }}>
          {PILLS.map(([icon, text], i) => {
            const p = pop(t, Q.pills[i]);
            return <div key={text} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 28px', borderRadius: 999, background: 'rgba(255,255,255,0.16)', border: '2px solid rgba(255,255,255,0.35)', fontFamily: DISPLAY, fontWeight: 800, fontSize: 30, color: '#fff', transform: `scale(${p})`, opacity: Math.min(1, p * 2) }}>{icon}{text}</div>;
          })}
        </div>
        <div style={{ position: 'absolute', top: 930, left: 0, right: 0, textAlign: 'center', fontFamily: BODY, fontWeight: 600, fontSize: 30, color: '#DCEBFF', opacity: k(t, Q.search, Q.search + 0.3), transform: `translateY(${(1 - k(t, Q.search, Q.search + 0.3)) * 14}px)` }}>Or search “Teyro” in your browser</div>
        <Shock t={t} at={Q.end} x={960} y={250} r={1100} color="#fff" width={30} dur={0.9} />
        <Shock t={t} at={Q.end + 0.09} x={960} y={250} r={760} color={C.gold} width={14} dur={0.8} />
        <Burst t={t} at={Q.end} x={960} y={250} n={26} dist={760} colors={['#fff', C.gold, '#BFE0FF']} len={170} thick={12} dur={0.8} />
        <Confetti t={t} at={Q.end + 0.05} x={960} y={250} n={70} spread={1500} dur={2.2} size={22} />
        <Shock t={t} at={Q.cta} x={960} y={650} r={700} color="#fff" width={12} dur={0.6} />
        <Burst t={t} at={Q.stinger} x={960} y={250} n={16} dist={330} colors={['#fff', C.gold]} len={60} dur={0.5} />
        <Shock t={t} at={Q.stinger} x={960} y={250} r={360} color="#fff" width={10} dur={0.5} />
      </AbsoluteFill>
      <Flash t={t} at={Q.end} peak={1} dur={0.35} />
    </AbsoluteFill>
  );
};
