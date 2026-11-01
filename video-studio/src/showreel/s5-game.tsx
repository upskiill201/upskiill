import React from 'react';
import { BookOpen, Check, Crown, Target } from 'lucide-react';
import { AbsoluteFill, Img } from 'remotion';
import { BODY, C, DISPLAY, E, Q, img, k, kick, last, lerp, rand, shake, sp } from './lib';
import { Burst, Confetti, Odo, Shock, Smear, Words, pop } from './fx';

const FIRE = '#FF9600';

// ════════════════════════════════════════════════════════════════════════════
// 28–34 s  The game layer: streak → daily quests → chest → league climb.
// ════════════════════════════════════════════════════════════════════════════
export const SGame: React.FC<{ t: number }> = ({ t }) => {
  const enter = k(t, 28.0, 28.3, E.outExpo);
  const exit = k(t, 33.82, 34.0, E.inExpo);
  const phaseB = k(t, 29.85, 30.2, E.inOutCubic); // streak → quests
  const chestOn = t >= 31.75 && t < 33.1;
  const leagueIn = sp(t, 32.85, { damping: 16, stiffness: 150, mass: 0.8 });
  const sh = shake(t, [[Q.streak, 0.5], [Q.chest, 0.9], [Q.promoted, 0.4]]);
  const coins = 338 + Q.coins.filter((c) => t >= c + 0.35).length * 2.5;
  const warm = 1 - phaseB;
  return (
    <AbsoluteFill style={{ overflow: 'hidden' }}>
      <AbsoluteFill style={{ background: `radial-gradient(80% 80% at 50% 40%, ${mixc('#FFF1DC', '#EEF4FF', 1 - warm)} 0%, ${mixc('#FFE2BC', '#DCE6FB', 1 - warm)} 100%)` }} />
      <AbsoluteFill style={{ background: `radial-gradient(40% 40% at 38% 45%, rgba(255,150,0,${0.25 * warm + kick(t, 8) * 0.12 * warm}), transparent)` }} />
      <Smear amt={(1 - enter) * 60 + exit * 60} id="gamex" style={{ transform: `translateX(${(1 - enter) * 1700 - exit * 2400}px) translate(${sh.x}px, ${sh.y}px) rotate(${sh.r}deg)` }}>
        {/* ── streak ── */}
        {phaseB < 1 && <Streak t={t} out={phaseB} />}
        {/* ── stat bar ── */}
        <StatBar t={t} coins={coins} />
        {/* ── quests ── */}
        {t >= 29.9 && t < 31.8 && <Quests t={t} />}
        {/* ── chest ── */}
        {chestOn && <Chest t={t} />}
        {/* ── league ── */}
        {t >= 32.8 && (
          <>
            <div style={{ position: 'absolute', left: 110, top: 380, width: 760 }}>
              <Words t={t} text="Climb the weekly league." at={32.9} size={108} color={C.ink} stagger={0.06} lineHeight={1.05} hi={{ 3: C.blue }} />
            </div>
            <League t={t} p={leagueIn} />
          </>
        )}
      </Smear>
    </AbsoluteFill>
  );
};

const mixc = (a: string, b: string, p: number) => {
  const pa = [1, 3, 5].map((i) => parseInt(a.slice(i, i + 2), 16)), pb = [1, 3, 5].map((i) => parseInt(b.slice(i, i + 2), 16));
  return '#' + pa.map((v, i) => Math.round(lerp(v, pb[i], p)).toString(16).padStart(2, '0')).join('');
};

const Streak: React.FC<{ t: number; out: number }> = ({ t, out }) => {
  const f = sp(t, Q.streak, { damping: 9, stiffness: 160, mass: 0.8 });
  const days = Q.days.reduce((s, d) => s + k(t, d, d + 0.16, E.outCubic), 0);
  const flick = 1 + Math.sin(t * 23) * 0.03 + kick(t, 10) * 0.06;
  const DAYS = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  // the flame flies up into the stat bar
  const fx = lerp(600, 718, out), fy = lerp(430, 90, out), fs = lerp(1, 0.17, out);
  return (
    <>
      <div style={{ position: 'absolute', top: 70, left: 0, right: 0, opacity: 1 - out }}>
        <Words t={t} text="Keep your streak alive." at={Q.streak + 0.02} out={29.8} size={96} color={C.ink} align="center" stagger={0.06} hi={{ 2: FIRE }} />
      </div>
      <div style={{ position: 'absolute', left: fx - 170, top: fy - 190, width: 340, height: 380, transform: `scale(${f * fs}) rotate(${(1 - f) * -25}deg)` }}>
        <div style={{ position: 'absolute', inset: -60, borderRadius: '50%', background: `radial-gradient(closest-side, rgba(255,170,0,${0.55 * (1 - out)}), transparent)`, transform: `scale(${flick * 1.1})` }} />
        <Img src={img('burn.png')} style={{ width: '100%', height: '100%', objectFit: 'contain', transform: `scaleY(${flick}) scaleX(${2 - flick})`, transformOrigin: '50% 100%' }} />
      </div>
      <div style={{ position: 'absolute', left: 820, top: 250, opacity: 1 - out * 1.5, transform: `translateY(${out * 80}px)` }}>
        <Odo value={days} size={300} color={FIRE} />
        <div style={{ fontFamily: DISPLAY, fontWeight: 800, fontSize: 64, color: '#C46A00', marginTop: -20 }}>day streak</div>
      </div>
      <div style={{ position: 'absolute', left: 960 - 7 * 70, top: 770, display: 'flex', gap: 30, opacity: 1 - out * 1.5, transform: `translateY(${out * 120}px)` }}>
        {DAYS.map((d, i) => {
          const on = t >= Q.days[i];
          const p = on ? pop(t, Q.days[i]) : 0;
          return (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 110, height: 110, borderRadius: '50%', background: on ? FIRE : '#FFFFFF', border: `5px solid ${on ? '#E07A00' : '#F1D9BB'}`, display: 'grid', placeItems: 'center', transform: `scale(${on ? 0.8 + p * 0.2 : 0.9})`, boxShadow: on ? `0 0 ${30 * Math.exp(-(t - Q.days[i]) * 4)}px ${FIRE}` : undefined }}>
                {on && <div style={{ transform: `scale(${p})` }}><Check size={60} color="#fff" strokeWidth={4} /></div>}
              </div>
              <span style={{ fontFamily: DISPLAY, fontWeight: 800, fontSize: 30, color: on ? '#C46A00' : '#C9A985' }}>{d}</span>
            </div>
          );
        })}
      </div>
      {Q.days.map((d, i) => <Burst key={i} t={t} at={d} x={960 - 7 * 70 + i * 140 + 55} y={825} n={8} dist={130} colors={[FIRE, C.gold]} len={30} thick={6} dur={0.35} seed={i} />)}
    </>
  );
};

const StatBar: React.FC<{ t: number; coins: number }> = ({ t, coins }) => {
  const p = sp(t, Q.statbar, { damping: 14, stiffness: 170, mass: 0.7 });
  if (t < Q.statbar - 0.05) return null;
  const coinHit = Q.coins.reduce((m, c) => Math.max(m, t >= c + 0.35 ? Math.exp(-(t - c - 0.35) * 10) : 0), 0);
  const items: [string, React.ReactNode, string][] = [
    ['burn.png', <Odo key="s" value={7} size={40} color={FIRE} />, FIRE],
    ['Coin.png', <Odo key="c" value={coins} size={40} color="#D99A00" />, '#D99A00'],
    ['gem.png', <Odo key="x" value={478} size={40} color="#1899D6" />, '#1899D6'],
    ['heart.png', <Odo key="h" value={5} size={40} color={C.red} />, C.red],
  ];
  return (
    <div style={{ position: 'absolute', left: 560, top: 40, width: 800, height: 104, borderRadius: 999, background: '#fff', boxShadow: '0 16px 40px rgba(23,42,120,0.14)', display: 'flex', alignItems: 'center', justifyContent: 'space-around', transform: `translateY(${(1 - p) * -180}px)` }}>
      {items.map(([src, val], i) => (
        <div key={src} style={{ display: 'flex', alignItems: 'center', gap: 12, transform: `scale(${pop(t, Q.statbar + 0.06 * i) * (i === 1 ? 1 + coinHit * 0.25 : 1)})` }}>
          <Img src={img(src)} width={52} height={52} style={{ objectFit: 'contain' }} />{val}
        </div>
      ))}
    </div>
  );
};

const QUESTS = [
  { title: 'Earn 100 XP', from: 0.2, max: 100, icon: <Img src={img('gem.png')} width={50} />, bg: '#E6F4FF' },
  { title: 'Get 5 answers right', from: 0.4, max: 5, icon: <Target size={44} color={C.green} strokeWidth={2.6} />, bg: '#E9F9E0' },
  { title: 'Complete 2 lessons', from: 0.5, max: 2, icon: <BookOpen size={44} color={C.blue} strokeWidth={2.6} />, bg: '#E6EEFF' },
];
const Quests: React.FC<{ t: number }> = ({ t }) => {
  const p = sp(t, 30.05, { damping: 15, stiffness: 160, mass: 0.8 });
  const out = k(t, 31.55, 31.8, E.inCubic);
  return (
    <>
      <div style={{ position: 'absolute', left: 460, top: 200, width: 1000, borderRadius: 36, background: '#fff', border: `2px solid ${C.border}`, boxShadow: '0 30px 80px rgba(23,42,120,0.14)', padding: '30px 44px', boxSizing: 'border-box', transform: `translateY(${(1 - p) * 500 + out * 60}px) scale(${1 - out * 0.3})`, opacity: Math.min(1, p * 2) * (1 - out) }}>
        <div style={{ fontFamily: DISPLAY, fontWeight: 800, fontSize: 44, color: C.ink, marginBottom: 10 }}>Daily Quests</div>
        {QUESTS.map((q, i) => {
          const at = Q.quests[i];
          const fill = lerp(q.from, 1, k(t, at - 0.2, at, E.inOutCubic));
          const done = t >= at;
          const hit = done ? Math.exp(-(t - at) * 6) : 0;
          const wob = !done && t > at - 0.25 ? Math.sin(t * 60) * 6 : 0;
          return (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 26, height: 150, borderTop: i ? `2px solid ${C.border}` : 'none' }}>
              <div style={{ width: 84, height: 84, borderRadius: 22, background: q.bg, display: 'grid', placeItems: 'center' }}>{q.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: DISPLAY, fontWeight: 800, fontSize: 36, color: C.ink }}>{q.title}</div>
                <div style={{ marginTop: 12, height: 34, borderRadius: 17, background: '#E9EDF3', overflow: 'hidden', position: 'relative' }}>
                  <div style={{ width: `${fill * 100}%`, height: '100%', borderRadius: 17, background: done ? C.gold : C.blue, boxShadow: `inset 0 -5px 0 ${done ? C.goldDark : C.blueDark}` }} />
                  <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', fontFamily: DISPLAY, fontWeight: 800, fontSize: 22, color: fill > 0.5 ? '#fff' : C.text2 }}>{Math.round(fill * q.max)} / {q.max}</div>
                </div>
              </div>
              <div style={{ width: 110, height: 110, position: 'relative', transform: `rotate(${wob}deg) scale(${1 + hit * 0.3})` }}>
                <Img src={img(done ? 'chest-gold.svg' : 'chest-bronze.svg')} width={110} style={{ filter: done ? undefined : 'grayscale(0.4)' }} />
                {done && <div style={{ position: 'absolute', right: -6, top: -6, width: 44, height: 44, borderRadius: '50%', background: C.green, border: '4px solid #fff', display: 'grid', placeItems: 'center', transform: `scale(${pop(t, at + 0.04)})` }}><Check size={26} color="#fff" strokeWidth={4} /></div>}
              </div>
            </div>
          );
        })}
      </div>
      {Q.quests.map((at, i) => <Burst key={i} t={t} at={at} x={1350} y={355 + i * 150} n={10} dist={170} colors={[C.gold, '#fff', C.green]} len={36} dur={0.4} seed={i + 4} />)}
      <div style={{ position: 'absolute', top: 920, left: 0, right: 0, opacity: 1 - out }}>
        <Words t={t} text="Finish quests. Open chests." at={30.25} size={76} color={C.ink} align="center" stagger={0.06} hi={{ 3: C.goldDark }} />
      </div>
    </>
  );
};

/** The gold chest from /art/items, split into body and lid so the lid can blow off. */
const Chest: React.FC<{ t: number }> = ({ t }) => {
  const inP = sp(t, 31.78, { damping: 12, stiffness: 200, mass: 0.7 });
  const open = t >= Q.chest;
  const lid = k(t, Q.chest, Q.chest + 0.5, E.outCubic);
  const shakeA = !open ? Math.sin(t * 70) * 5 * k(t, 31.8, 32.0) : 0;
  const out = k(t, 32.75, 33.05, E.inBack);
  const CXc = 960, CYc = 560;
  return (
    <>
      {open && <div style={{ position: 'absolute', left: CXc - 600, top: CYc - 600, width: 1200, height: 1200, background: 'repeating-conic-gradient(rgba(255,200,0,0.28) 0deg 10deg, transparent 10deg 24deg)', borderRadius: '50%', maskImage: 'radial-gradient(closest-side, black, transparent)', WebkitMaskImage: 'radial-gradient(closest-side, black 20%, transparent)', transform: `rotate(${t * 40}deg) scale(${k(t, Q.chest, Q.chest + 0.3, E.outBack) * (1 - out)})` }} />}
      <svg width={420} height={420} viewBox="0 0 96 96" style={{ position: 'absolute', left: CXc - 210, top: CYc - 210, overflow: 'visible', transform: `scale(${inP * (1 - out)}) rotate(${shakeA}deg)` }}>
        <g transform="translate(0 6)" fill="#8E4A1A"><rect x="12" y="40" width="72" height="40" rx="8" /></g>
        <g fill="#B5652B"><rect x="12" y="40" width="72" height="40" rx="8" /></g>
        <rect x="12" y="40" width="72" height="8" fill="#E5A400" />
        <rect x="20" y="40" width="10" height="44" rx="3" fill="#FFC800" /><rect x="66" y="40" width="10" height="44" rx="3" fill="#FFC800" />
        <g style={{ transformBox: 'fill-box', transformOrigin: '0% 100%' }} transform={`translate(${lid * -14} ${lid * -46}) rotate(${lid * -38} 12 44)`}>
          <g transform="translate(0 4)" fill="#B5652B"><path d="M12 44C12 28 24 18 48 18C72 18 84 28 84 44Z" /></g>
          <g fill="#D98E55"><path d="M12 44C12 28 24 18 48 18C72 18 84 28 84 44Z" /></g>
          <rect x="20" y="18" width="10" height="26" rx="3" fill="#FFC800" /><rect x="66" y="18" width="10" height="26" rx="3" fill="#FFC800" />
          <ellipse cx="30" cy="26" rx="8" ry="4" transform="rotate(-30 30 26)" fill="#fff" opacity="0.45" />
        </g>
        <rect x="39" y="36" width="18" height="22" rx="5" fill="#E5A400" opacity={1 - lid} /><rect x="39" y="34" width="18" height="22" rx="5" fill="#FFC800" opacity={1 - lid} />
      </svg>
      {/* coins arc into the stat bar */}
      {Q.coins.map((c, i) => {
        if (t < c || t > c + 0.4) return null;
        const p = k(t, c, c + 0.38, E.inOutCubic);
        const x = lerp(CXc + (rand(i, 2) - 0.5) * 120, 812, p), y = lerp(CYc - 40, 92, p) - Math.sin(p * Math.PI) * (260 + rand(i, 5) * 160);
        return <Img key={i} src={img('Coin.png')} width={84} style={{ position: 'absolute', left: x - 42, top: y - 42, transform: `scale(${1.3 - p * 0.7}) rotate(${p * 540}deg)` }} />;
      })}
      <Shock t={t} at={Q.chest} x={CXc} y={CYc} r={600} color={C.gold} width={22} dur={0.7} />
      <Burst t={t} at={Q.chest} x={CXc} y={CYc} n={20} dist={520} colors={[C.gold, '#fff', FIRE]} len={120} thick={10} dur={0.6} />
      <Confetti t={t} at={Q.chest + 0.03} x={CXc} y={CYc - 60} n={46} colors={[C.gold, '#FFE27A', '#fff', FIRE]} spread={1100} />
    </>
  );
};

const PEOPLE = [
  { name: 'Amara', xp: 412, col: '#F59E0B' },
  { name: 'Kenji', xp: 398, col: '#10B981' },
  { name: 'Lucía', xp: 371, col: '#EC4899' },
  { name: 'Dev', xp: 340, col: '#8B5CF6' },
];
const League: React.FC<{ t: number; p: number }> = ({ t, p }) => {
  const step = Q.league.reduce((s, at) => s + k(t, at, at + 0.22, E.outBack), 0); // 0 → 3
  const youRank = 3 - step; // 3 → 0 (continuous)
  const youXp = Math.round(330 + k(t, Q.league[0] - 0.1, Q.league[2] + 0.2, E.inOutCubic) * 100);
  const crown = pop(t, Q.promoted);
  const RH = 130;
  return (
    <div style={{ position: 'absolute', left: 1000, top: 150, width: 800, height: 840, borderRadius: 36, background: '#fff', border: `2px solid ${C.border}`, boxShadow: '0 30px 80px rgba(23,42,120,0.16)', transform: `translateX(${(1 - p) * 900}px) rotate(${(1 - p) * 8}deg)`, overflow: 'hidden' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 22, padding: '34px 40px' }}>
        <Img src={img('league-gold.png')} width={110} style={{ transform: `rotate(${Math.sin(t * 4) * 5}deg) scale(${1 + crown * 0.06})` }} />
        <div>
          <div style={{ fontFamily: DISPLAY, fontWeight: 800, fontSize: 48, color: C.ink }}>Gold League</div>
          <div style={{ fontFamily: BODY, fontSize: 24, color: C.text2 }}>This week's leaderboard</div>
        </div>
      </div>
      {PEOPLE.map((u, i) => {
        // Amara, Kenji, Lucía start at 1–3 (Dev 5th); each slides down one slot as the learner passes them
        const rank = i === 3 ? 4 : i + Math.max(0, Math.min(1, i + 1 - youRank));
        return <Row key={u.name} y={rank * RH} rank={Math.round(rank) + 1} name={u.name} xp={u.xp} col={u.col} />;
      })}
      <Row y={youRank * RH} rank={Math.round(youRank) + 1} name="You" xp={youXp} col={C.blue} you crown={crown} t={t} />
    </div>
  );
};
const Row: React.FC<{ y: number; rank: number; name: string; xp: number; col: string; you?: boolean; crown?: number; t?: number }> = ({ y, rank, name, xp, col, you, crown = 0 }) => (
  <div style={{ position: 'absolute', left: 30, right: 30, top: 176 + y, height: 116, borderRadius: 24, display: 'flex', alignItems: 'center', gap: 22, padding: '0 26px', background: you ? '#E5F1FF' : 'transparent', border: you ? `4px solid ${C.blue}` : '4px solid transparent', boxShadow: you ? '0 16px 36px rgba(1,114,253,0.25)' : undefined, zIndex: you ? 2 : 1, transform: you ? `scale(${1.04 + crown * 0.04})` : undefined }}>
    <span style={{ width: 44, fontFamily: DISPLAY, fontWeight: 800, fontSize: 38, color: rank === 1 ? C.goldDark : C.text2 }}>{rank}</span>
    <div style={{ width: 70, height: 70, borderRadius: '50%', background: col, display: 'grid', placeItems: 'center', fontFamily: DISPLAY, fontWeight: 800, fontSize: 30, color: '#fff', position: 'relative' }}>
      {name[0]}
      {you && crown > 0 && <div style={{ position: 'absolute', top: -46, transform: `scale(${crown}) rotate(-12deg)` }}><Crown size={52} color={C.goldDark} fill={C.gold} strokeWidth={2} /></div>}
    </div>
    <span style={{ fontFamily: DISPLAY, fontWeight: 800, fontSize: 38, color: you ? C.blueDark : C.ink }}>{name}</span>
    <span style={{ marginLeft: 'auto', fontFamily: DISPLAY, fontWeight: 800, fontSize: 32, color: C.text2 }}>{xp} XP</span>
  </div>
);

