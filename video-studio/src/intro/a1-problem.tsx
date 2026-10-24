import React from 'react';
import { Briefcase, Check, Dumbbell, Mail, MessageCircle, Package, Tv, Users, type LucideIcon } from 'lucide-react';
import { AbsoluteFill, Img } from 'remotion';
import { BODY, C, DISPLAY, E, Q, img, k, kick, last, lerp, rand, shake, sp } from './lib';
import { Burst, Flash, Odo, Shock, Smear, Words, pop } from '../showreel/fx';
import { LightBg } from '../showreel/common';
import { Notif, Person } from './kit';

const GREY = { ink: '#2A3142', dim: '#7C8494', red: '#E5484D', bg: '#E8EBF1' };

/** The muted world of Act 1: a desaturated page whose colour comes back during the turn. */
const GreyBg: React.FC<{ t: number; warm?: number }> = ({ t, warm = 0 }) => (
  <LightBg t={t} base={lerpHex(GREY.bg, '#EEF3FF', warm)} tint={lerpHex('#DADFE8', '#CFE0FF', warm)} tint2={lerpHex('#E1E4EA', '#E3DCFF', warm)} />
);
const lerpHex = (a: string, b: string, p: number) => '#' + [1, 3, 5].map((i) => Math.round(lerp(parseInt(a.slice(i, i + 2), 16), parseInt(b.slice(i, i + 2), 16), Math.max(0, Math.min(1, p)))).toString(16).padStart(2, '0')).join('');

// ════════════════════════════════════════════════════════════════════════════
// 0–4 s  HOOK — "Ever started a course… and never finished it?" The bar is stuck at 12 %.
// ════════════════════════════════════════════════════════════════════════════
export const SHook: React.FC<{ t: number }> = ({ t }) => {
  const fill = k(t, 2.0, Q.hook.stuck, E.outCubic) * 0.12;
  const stuck = t >= Q.hook.stuck;
  const sh = shake(t, [[Q.hook.stuck, 0.6]]);
  const jitter = stuck ? Math.sin(t * 50) * 3 * Math.exp(-(t - Q.hook.stuck) * 3) : 0;
  const exit = k(t, 3.72, 4.0, E.inExpo);
  return (
    <AbsoluteFill>
      <GreyBg t={t} />
      <Smear amt={exit * 60} id="hookx" style={{ transform: `translateX(${-exit * 2200}px) translate(${sh.x}px, ${sh.y}px)` }}>
        <div style={{ position: 'absolute', top: 250, left: 0, right: 0 }}>
          <Words t={t} text="Ever started a course…" at={Q.hook.l1} size={130} color={GREY.ink} align="center" stagger={0.09} />
        </div>
        <div style={{ position: 'absolute', top: 410, left: 0, right: 0 }}>
          <Words t={t} text="…and never finished it?" at={Q.hook.l2} size={130} color={GREY.ink} align="center" stagger={0.09} hi={{ 2: GREY.red }} />
        </div>
        {/* the progress bar that never moves again */}
        <div style={{ position: 'absolute', left: 460, top: 690, width: 1000, opacity: k(t, 1.8, 2.1), transform: `translateY(${(1 - k(t, 1.8, 2.2, E.outBack)) * 40}px)` }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: DISPLAY, fontWeight: 800, fontSize: 30, color: GREY.dim, marginBottom: 16 }}>
            <span>Your course</span><span style={{ color: stuck ? GREY.red : GREY.dim }}>{Math.round(fill * 100)}% complete</span>
          </div>
          <div style={{ height: 40, borderRadius: 20, background: '#D5DAE3', overflow: 'hidden' }}>
            <div style={{ width: `${fill * 100}%`, height: '100%', borderRadius: 20, background: stuck ? GREY.red : '#8C94A6', transform: `translateX(${jitter}px)` }} />
          </div>
          {stuck && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginTop: 22, fontFamily: BODY, fontSize: 26, color: GREY.dim, opacity: k(t, Q.hook.stuck + 0.1, Q.hook.stuck + 0.3) }}>
              <svg width={30} height={30} viewBox="0 0 40 40" style={{ transform: `rotate(${t * 400}deg)` }}><circle cx="20" cy="20" r="15" stroke="#C3C8D2" strokeWidth="5" fill="none" /><circle cx="20" cy="20" r="15" stroke={GREY.dim} strokeWidth="5" fill="none" strokeDasharray="25 100" strokeLinecap="round" /></svg>
              Last opened 47 days ago
            </div>
          )}
        </div>
      </Smear>
      <Flash t={t} at={Q.hook.stuck} color={GREY.red} peak={0.12} dur={0.3} />
    </AbsoluteFill>
  );
};

// ════════════════════════════════════════════════════════════════════════════
// 4–10 s  STORY — Day 1 you're all in. Then life gets busy. The course waits.
// ════════════════════════════════════════════════════════════════════════════
const NOTIFS: [LucideIcon, string, string, string][] = [
  [Briefcase, 'Work', 'Meeting moved to 8 am', '#DCE7FF'],
  [Users, 'Family', 'Dinner at ours tonight?', '#FFE4D6'],
  [MessageCircle, 'Messages', '12 new messages', '#DFF5E1'],
  [Package, 'Delivery', 'Your parcel arrives today', '#FFF1C9'],
  [Dumbbell, 'Reminder', 'Gym at 6 pm', '#F1E3FF'],
  [Tv, 'Streaming', 'New episode out now', '#FFE0E6'],
];
export const SStory: React.FC<{ t: number }> = ({ t }) => {
  const enter = k(t, 4.0, 4.3, E.outExpo);
  const busy = t >= Q.busy;
  const drain = k(t, Q.busy, Q.busy + 0.6);
  const collapse = k(t, 9.45, 10.0, E.inCubic);
  return (
    <AbsoluteFill>
      <GreyBg t={t} />
      <Smear amt={(1 - enter) * 60} id="storyx" style={{ transform: `translateX(${(1 - enter) * 1800}px)` }}>
        {/* headline */}
        <div style={{ position: 'absolute', left: 110, top: 120 }}>
          {t < Q.busy
            ? <Words t={t} text="Day 1: you're all in." at={4.02} out={Q.busy - 0.15} size={110} color={GREY.ink} stagger={0.07} hi={{ 0: C.blue, 1: C.blue }} />
            : t < Q.familiar
              ? <Words t={t} text="Then life gets busy." at={Q.busy} out={Q.familiar - 0.15} size={110} color={GREY.ink} stagger={0.07} hi={{ 3: GREY.red }} />
              : <Words t={t} text="Sound familiar?" at={Q.familiar} size={130} color={GREY.ink} stagger={0.08} />}
        </div>
        {/* calendar days: three happy ones, then the empty ones */}
        <div style={{ position: 'absolute', left: 110, top: 380, display: 'flex', gap: 26 }}>
          {Array.from({ length: 7 }).map((_, i) => {
            const at = i < 3 ? Q.days[i] : Q.busy + 0.1 + (i - 3) * 0.1;
            const p = sp(t, at, { damping: 11, stiffness: 200, mass: 0.6 });
            const done = i < 3;
            const fallP = k(t, 9.45 + i * 0.04, 10.0 + i * 0.04, E.inCubic);
            const g = done ? drain * 0.85 : 1;
            return (
              <div key={i} style={{ width: 210, height: 250, borderRadius: 30, background: '#fff', boxShadow: '0 20px 40px rgba(20,30,60,0.12)', overflow: 'hidden', transform: `scale(${p}) translateY(${fallP * fallP * 900}px) rotate(${fallP * (i % 2 ? 30 : -30)}deg)`, opacity: Math.min(1, p * 2) }}>
                <div style={{ height: 64, background: done ? lerpHex(C.blue, '#AAB1BF', g) : '#C9CED8', display: 'grid', placeItems: 'center', fontFamily: DISPLAY, fontWeight: 800, fontSize: 28, color: '#fff', letterSpacing: '0.08em' }}>DAY {i < 3 ? i + 1 : i + 2 + (i - 3) * 2}</div>
                <div style={{ height: 186, display: 'grid', placeItems: 'center' }}>
                  {done
                    ? <div style={{ width: 110, height: 110, borderRadius: '50%', background: lerpHex(C.green, '#C3C8D2', g), display: 'grid', placeItems: 'center', transform: `scale(${pop(t, at + 0.06)})` }}><Check size={70} color="#fff" strokeWidth={4} /></div>
                    : <div style={{ width: 110, height: 110, borderRadius: '50%', border: '6px dashed #D3D8E0' }} />}
                </div>
              </div>
            );
          })}
        </div>
        {Q.days.map((at, i) => <Burst key={i} t={t} at={at + 0.06} x={110 + i * 236 + 105} y={380 + 64 + 93} n={10} dist={180} colors={[C.green, C.gold, '#fff']} len={40} dur={0.4} seed={i} />)}
        {/* life piles on top */}
        {NOTIFS.map(([Icon, app, title, bg], i) => {
          const at = Q.notifs[i];
          if (t < at - 0.05) return null;
          const p = sp(t, at, { damping: 13, stiffness: 230, mass: 0.6 });
          const fallP = collapse;
          const x = 700 + (i % 3) * 230 + rand(i, 3) * 60, y = 330 + i * 92;
          return (
            <div key={i} style={{ position: 'absolute', left: x, top: y, transform: `translateX(${(1 - p) * 900}px) rotate(${(rand(i, 5) - 0.5) * 8 + fallP * (i % 2 ? 40 : -40)}deg) translateY(${fallP * fallP * 1200}px)` }}>
              <Notif icon={<Icon size={34} color={C.ink} />} iconBg={bg} app={app} title={title} width={560} />
            </div>
          );
        })}
        {/* the course's "we miss you" email */}
        {t >= Q.email - 0.05 && (
          <div style={{ position: 'absolute', left: 560, top: 470, transform: `scale(${pop(t, Q.email)}) rotate(-3deg) translateY(${collapse * collapse * 1300}px)` }}>
            <div style={{ width: 760, padding: '34px 40px', borderRadius: 32, background: '#fff', boxShadow: '0 40px 80px rgba(20,30,60,0.25)', fontFamily: BODY, border: '3px solid #E2E6EE' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, color: GREY.dim, fontSize: 24, fontWeight: 600 }}><Mail size={30} color={GREY.dim} />Inbox · unread</div>
              <div style={{ fontFamily: DISPLAY, fontWeight: 800, fontSize: 42, color: GREY.ink, marginTop: 14 }}>We miss you! Your course is waiting.</div>
              <div style={{ fontSize: 28, color: GREY.dim, marginTop: 8 }}>Pick up where you left off: Lesson 4 of 52.</div>
            </div>
          </div>
        )}
      </Smear>
    </AbsoluteFill>
  );
};

// ════════════════════════════════════════════════════════════════════════════
// 10–15 s  THE STAT — 20 learners who planned to finish. 17 don't.
// ════════════════════════════════════════════════════════════════════════════
export const PCOLS = ['#3D8BFF', '#22C55E', '#F59E0B', '#EC4899', '#8B5CF6', '#06B6D4', '#EF4444', '#14B8A6', '#F97316', '#6366F1'];
/** 5 × 4 grid; the three who stay are fixed so Act 4 can find them again. */
export const STAY = [6, 13, 17];
export const gridPos = (i: number) => ({ x: 1060 + (i % 5) * 160, y: 230 + Math.floor(i / 5) * 190 });
const QUITTERS = Array.from({ length: 20 }, (_, i) => i).filter((i) => !STAY.includes(i));

export const SStat: React.FC<{ t: number }> = ({ t }) => {
  const enter = k(t, 10.0, 10.3, E.outExpo);
  const big = sp(t, Q.stat, { damping: 10, stiffness: 200, mass: 0.8 });
  const sh = shake(t, [[Q.stat, 0.9]]);
  const out = k(t, 14.7, 15.0, E.inCubic);
  return (
    <AbsoluteFill>
      <GreyBg t={t} />
      <AbsoluteFill style={{ transform: `translate(${sh.x}px, ${sh.y}px)`, opacity: enter }}>
        <div style={{ position: 'absolute', left: 110, top: 120 }}>
          <Words t={t} text="You're not alone." at={Q.alone} out={Q.stat - 0.12} size={96} color={GREY.ink} stagger={0.07} />
        </div>
        {/* the number */}
        {t >= Q.stat && (
          <div style={{ position: 'absolute', left: 100, top: 170, opacity: 1 - out }}>
            <div style={{ transform: `scale(${lerp(2.2, 1, big)})`, transformOrigin: '0% 60%', display: 'flex', alignItems: 'baseline' }}>
              <Odo value={k(t, Q.stat, Q.stat + 0.7, E.outCubic) * 85} size={330} color={GREY.red} />
              <span style={{ fontFamily: DISPLAY, fontWeight: 800, fontSize: 230, color: GREY.red, marginLeft: 8 }}>%</span>
            </div>
            <div style={{ width: 780, marginTop: 10 }}>
              <Words t={t} text="of people who planned to finish an online course… didn't." at={Q.stat + 0.35} size={54} color={GREY.ink} weight={700} stagger={0.045} lineHeight={1.18} />
            </div>
            <div style={{ marginTop: 34, fontFamily: BODY, fontSize: 21, color: GREY.dim, opacity: k(t, 13.2, 13.6), width: 760, lineHeight: 1.4 }}>
              Reich & Ruipérez-Valiente, <i>Science</i> (2019). Harvard and MIT online courses, 2017–18: 15% of learners who intended to finish did.
            </div>
          </div>
        )}
        {/* the 20 */}
        {Array.from({ length: 20 }).map((_, i) => {
          const p = gridPos(i), at = Q.people[i];
          const s = pop(t, at);
          const qi = QUITTERS.indexOf(i);
          const fallP = qi >= 0 ? k(t, Q.quit[qi], Q.quit[qi] + 0.6, E.inCubic) : 0;
          const grey = qi >= 0 ? k(t, Q.quit[qi] - 0.15, Q.quit[qi]) : 0;
          const stay = qi < 0 && t > 14.4 ? k(t, 14.4, 14.7) : 0;
          return <Person key={i} x={p.x} y={p.y} color={PCOLS[i % 10]} grey={grey} fallP={fallP} seed={i} scale={s * (1 + stay * 0.12)} glow={stay} />;
        })}
      </AbsoluteFill>
      <Flash t={t} at={Q.stat} color={GREY.red} peak={0.15} dur={0.3} />
    </AbsoluteFill>
  );
};

// ════════════════════════════════════════════════════════════════════════════
// 15–20 s  THE TURN — It's not you. What if learning felt like a game?
// The three who stayed gather; game pieces get pulled in; colour returns.
// ════════════════════════════════════════════════════════════════════════════
const ORBIT = ['burn.png', 'Coin.png', 'gem.png', 'heart.png', 'trophy.png', 'chest-gold.svg', 'xp-bolt.svg', 'freeze.svg', 'league-diamond.png', 'Coin.png'];
export const STurn: React.FC<{ t: number }> = ({ t }) => {
  const warm = k(t, 16.8, 19.6, E.inCubic);
  const gather = k(t, 15.0, 15.6, E.inOutCubic);
  const suck = k(t, 19.55, 19.95, E.inExpo);
  const sh = shake(t, [[18.0, 0.2], [18.5, 0.25], [19.0, 0.35], [19.25, 0.45], [19.5, 0.6]]);
  const kk = kick(t, 10);
  return (
    <AbsoluteFill>
      <GreyBg t={t} warm={warm} />
      <AbsoluteFill style={{ transformOrigin: '960px 640px', transform: `scale(${1 - suck}) rotate(${suck * 60}deg) translate(${sh.x}px, ${sh.y}px)` }}>
        <div style={{ position: 'absolute', top: 110, left: 0, right: 0 }}>
          {t < Q.hard && <Words t={t} text="It's not you." at={Q.notYou} out={Q.hard - 0.12} size={150} color={GREY.ink} align="center" stagger={0.08} />}
          {t >= Q.hard && t < Q.game && <Words t={t} text="Learning alone is hard to keep going." at={Q.hard} out={Q.game - 0.12} size={96} color={GREY.ink} align="center" stagger={0.055} style={{ padding: '0 160px' }} />}
          {t >= Q.game && (
            <>
              <Words t={t} text="What if learning felt like a game" at={Q.game} size={96} color={lerpHex(GREY.ink, C.ink, warm)} align="center" stagger={0.055} hi={{ 5: C.blue }} />
              <div style={{ marginTop: 6 }}><Words t={t} text="you actually wanted to play?" at={Q.game2} size={96} color={lerpHex(GREY.ink, C.ink, warm)} align="center" stagger={0.055} hi={{ 3: C.blue, 4: C.blue }} /></div>
            </>
          )}
        </div>
        {/* the three who stayed */}
        {STAY.map((idx, j) => {
          const p = gridPos(idx);
          const x = lerp(p.x, 820 + j * 140, gather), y = lerp(p.y, 680, gather) + Math.sin(t * 4 + j) * 6 * kk;
          return <Person key={idx} x={x} y={y} size={130} color={PCOLS[idx % 10]} glow={0.4 + warm * 0.6} scale={1 + kk * 0.05} seed={j} />;
        })}
        {/* the game layer, pulled in from the edges */}
        {t > Q.game && ORBIT.map((f, i) => {
          const a0 = (i / ORBIT.length) * Math.PI * 2;
          const p = k(t, Q.game + i * 0.08, 19.9, E.inCubic);
          const r = lerp(1300, 220, p), a = a0 + p * 3.2;
          return <Img key={i} src={img(f)} style={{ position: 'absolute', left: 960 + Math.cos(a) * r * 1.3 - 50, top: 680 + Math.sin(a) * r * 0.7 - 50, width: 100, height: 100, objectFit: 'contain', transform: `rotate(${p * 400}deg) scale(${0.6 + p * 0.5})`, filter: `drop-shadow(0 10px 20px rgba(0,0,0,0.2))` }} />;
        })}
      </AbsoluteFill>
      {suck > 0 && <div style={{ position: 'absolute', left: 960 - 16, top: 640 - 16, width: 32, height: 32, borderRadius: '50%', background: C.blue, boxShadow: `0 0 80px 30px ${C.blue}`, transform: `scale(${suck * (1 + k(t, 19.85, 20, E.inExpo) * 4)})` }} />}
      <Shock t={t} at={Q.notYou} x={960} y={680} r={500} color={C.blue} width={10} dur={0.7} />
    </AbsoluteFill>
  );
};
