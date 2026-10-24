import React from 'react';
import { BookOpen, Bus, Check, CheckCircle2, Clock, Code2, Crown, Heart, Lightbulb, MessageCircle, Star, Telescope, X } from 'lucide-react';
import { AbsoluteFill, Img } from 'remotion';
import { BODY, C, DISPLAY, E, Q, img, k, kick, last, lerp, rand, sp } from './lib';
import { Burst, Confetti, Odo, Shock, Words, pop } from '../showreel/fx';
import { AppIcon } from '../showreel/common';
import { Chip, Float, Phone, mixHex } from './kit';

type R = { col: string; dark: string; tint: string; title: string; sub: string; title2?: string; sub2?: string; Screen: React.FC<{ t: number; at: number }>; Floats: React.FC<{ t: number; at: number }> };
const FIRE = '#FF9600';
const PX = 1220, PY = 540; // phone centre
const SX = PX - 235 + 15, SY = PY - 480 + 15; // screen origin in frame coordinates

// ════════════════════════════════════════════════════════════════════════════
// 28–62 s  Seven reasons you'll keep coming back. One phone; its screen navigates
// on every reason, pieces of the app float out of it.
// ════════════════════════════════════════════════════════════════════════════
export const SReasons: React.FC<{ t: number }> = ({ t }) => {
  const i = Math.max(0, last(t, Q.reasons));
  const r = REASONS[i], prev = REASONS[Math.max(0, i - 1)];
  const at = Q.reasons[i];
  const blend = i === 0 ? 1 : k(t, at, at + 0.35, E.inOutCubic);
  const tint = mixHex(prev.tint, r.tint, blend), col = mixHex(prev.col, r.col, blend);
  const kk = kick(t, 9);
  const enter = k(t, 28.0, 28.3, E.outExpo);
  const exit = k(t, 61.7, 62.0, E.inExpo);
  const second = r.title2 && t >= Q.r7.month;
  return (
    <AbsoluteFill style={{ background: tint, overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle, rgba(7,18,51,0.07) 2px, transparent 2.5px)', backgroundSize: '48px 48px', backgroundPosition: `${(t * 18) % 48}px ${(t * 10) % 48}px` }} />
      <div style={{ position: 'absolute', left: PX - 520, top: PY - 520, width: 1040, height: 1040, borderRadius: '50%', background: `radial-gradient(closest-side, ${col}55, ${col}00)`, transform: `scale(${1 + kk * 0.05 + (1 - blend) * 0.2})` }} />
      <AbsoluteFill style={{ transform: `translateX(${(1 - enter) * 1600 - exit * 2400}px)` }}>
        {/* HUD */}
        <div style={{ position: 'absolute', left: 110, top: 78 }}>
          <div style={{ fontFamily: DISPLAY, fontWeight: 800, fontSize: 24, letterSpacing: '0.14em', color: C.text2 }}>7 REASONS YOU'LL KEEP COMING BACK</div>
          <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
            {REASONS.map((x, j) => <div key={j} style={{ height: 12, width: j === i ? 90 : 36, borderRadius: 6, background: j < i ? x.col : j === i ? r.col : 'rgba(7,18,51,0.12)', transition: 'none' }} />)}
          </div>
        </div>
        {/* number + copy */}
        <div style={{ position: 'absolute', left: 104, top: 190, display: 'flex', fontFamily: DISPLAY, fontWeight: 800, fontSize: 210, letterSpacing: '-0.05em', color: r.col, lineHeight: 1 }}>
          <span>0</span>
          <span style={{ display: 'inline-block', height: 210, overflow: 'hidden' }}>
            <span style={{ display: 'flex', flexDirection: 'column', transform: `translateY(${-(i + (i === 0 ? 0 : 0)) * 210 + (1 - k(t, at, at + 0.35, E.outBack)) * 210 * (i ? 1 : 0)}px)` }}>
              {[1, 2, 3, 4, 5, 6, 7].map((n) => <span key={n} style={{ height: 210 }}>{n}</span>)}
            </span>
          </span>
        </div>
        <div style={{ position: 'absolute', left: 110, top: 430, width: 760 }}>
          {!second
            ? <Words key={'t' + i} t={t} text={r.title} at={at + 0.04} out={(Q.reasons[i + 1] ?? (r.title2 ? Q.r7.month : 61.7)) - 0.14} size={92} color={C.ink} stagger={0.06} lineHeight={1.04} />
            : <Words key="t2" t={t} text={r.title2!} at={Q.r7.month} out={61.66} size={92} color={C.ink} stagger={0.06} lineHeight={1.04} />}
        </div>
        <div style={{ position: 'absolute', left: 112, top: 690, width: 720 }}>
          {!second
            ? <Words key={'s' + i} t={t} text={r.sub} at={at + 0.3} out={(Q.reasons[i + 1] ?? (r.title2 ? Q.r7.month : 61.7)) - 0.14} size={38} color={C.text2} weight={600} stagger={0.025} lineHeight={1.3} tracking={-0.01} skew={false} />
            : <Words key="s2" t={t} text={r.sub2!} at={Q.r7.month + 0.25} out={61.66} size={38} color={C.text2} weight={600} stagger={0.025} lineHeight={1.3} tracking={-0.01} skew={false} />}
        </div>
        {/* the phone: its screen slides to the next reason */}
        <Phone x={PX} y={PY} t={t} at={28.0} tilt={Math.sin(t * 0.8) * 3}>
          {REASONS.map((x, j) => {
            const a = Q.reasons[j], nxt = Q.reasons[j + 1] ?? 99;
            if (t < a - 0.01 || t > nxt + 0.4) return null;
            const inP = j === 0 ? 1 : k(t, a, a + 0.32, E.outExpo);
            const outP = k(t, nxt, nxt + 0.32, E.outExpo);
            return (
              <div key={j} style={{ position: 'absolute', inset: 0, transform: `translateX(${(1 - inP) * 440 - outP * 160}px)`, filter: outP > 0 ? `brightness(${1 - outP * 0.3})` : undefined, boxShadow: j > 0 ? '-20px 0 40px rgba(0,0,0,0.15)' : undefined }}>
                <x.Screen t={t} at={a} />
              </div>
            );
          })}
        </Phone>
        {/* pieces of the app float in front of the phone */}
        <r.Floats t={t} at={at} />
      </AbsoluteFill>
      {/* colour wipe across the frame on every new reason */}
      {i > 0 && t < at + 0.4 && (
        <div style={{ position: 'absolute', top: -400, bottom: -400, width: 900, left: lerp(-1300, 2400, k(t, at - 0.12, at + 0.32, E.inOutCubic)), background: r.col, transform: 'skewX(-18deg)', opacity: 0.95 }} />
      )}
    </AbsoluteFill>
  );
};

/** In-phone helpers (screen space 440 × 930). */
const StatusBar: React.FC<{ dark?: boolean }> = ({ dark }) => (
  <div style={{ position: 'absolute', left: 34, right: 34, top: 18, display: 'flex', justifyContent: 'space-between', fontFamily: BODY, fontWeight: 700, fontSize: 18, color: dark ? '#fff' : C.ink }}><span>9:41</span><span>●●● ▮</span></div>
);
const Stats: React.FC<{ t: number; coins?: number; streak?: number; y?: number }> = ({ coins = 338, streak = 7, y = 70 }) => (
  <div style={{ position: 'absolute', left: 20, right: 20, top: y, display: 'flex', justifyContent: 'space-around', alignItems: 'center', fontFamily: DISPLAY, fontWeight: 800, fontSize: 24 }}>
    <span style={{ display: 'flex', alignItems: 'center', gap: 6, color: FIRE }}><Img src={img('burn.png')} width={30} />{streak}</span>
    <span style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#D99A00' }}><Img src={img('Coin.png')} width={30} /><Odo value={coins} size={24} color="#D99A00" /></span>
    <span style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#1899D6' }}><Img src={img('gem.png')} width={28} />478</span>
    <span style={{ display: 'flex', alignItems: 'center', gap: 6, color: C.red }}><Img src={img('heart.png')} width={28} />5</span>
  </div>
);
const Btn: React.FC<{ text: string; col?: string; dark?: string; down?: boolean; y: number; off?: boolean }> = ({ text, col = C.green, dark = C.greenDark, down, y, off }) => (
  <div style={{ position: 'absolute', left: 30, right: 30, top: y, height: 74 }}>
    <div style={{ position: 'absolute', inset: 0, top: 7, borderRadius: 18, background: off ? '#D3D8E0' : dark }} />
    <div style={{ position: 'absolute', inset: 0, bottom: down ? 0 : 7, top: down ? 7 : 0, borderRadius: 18, background: off ? '#E5E7EB' : col, display: 'grid', placeItems: 'center', fontFamily: DISPLAY, fontWeight: 800, fontSize: 26, letterSpacing: '0.08em', color: off ? '#AFB8C6' : '#fff' }}>{text}</div>
  </div>
);
const Tap: React.FC<{ t: number; at: number; x: number; y: number }> = ({ t, at, x, y }) => {
  if (t < at - 0.3 || t > at + 0.5) return null;
  const p = k(t, at - 0.3, at, E.outCubic), r = k(t, at, at + 0.45, E.outCubic);
  return (
    <>
      <div style={{ position: 'absolute', left: x - 34, top: y - 34 + (1 - p) * 120, width: 68, height: 68, borderRadius: '50%', background: 'rgba(7,18,51,0.25)', border: '4px solid rgba(255,255,255,0.9)', transform: `scale(${t >= at && t < at + 0.1 ? 0.8 : 1})`, opacity: 1 - r }} />
      {t >= at && <div style={{ position: 'absolute', left: x - 70 * r, top: y - 70 * r, width: 140 * r, height: 140 * r, borderRadius: '50%', border: `4px solid rgba(255,255,255,${1 - r})` }} />}
    </>
  );
};

// ── 1 · Lessons you can finish ──────────────────────────────────────────────
const S1: React.FC<{ t: number; at: number }> = ({ t }) => {
  const sweep = k(t, Q.r1.clock, Q.r1.clock + 0.7, E.outCubic);
  const NODES = [{ x: 220, y: 420 }, { x: 140, y: 540 }, { x: 250, y: 660 }, { x: 170, y: 790 }];
  return (
    <div style={{ position: 'absolute', inset: 0, background: '#DFF3D2' }}>
      <StatusBar />
      <div style={{ position: 'absolute', left: 24, right: 24, top: 70, height: 96, borderRadius: 22, background: C.green, boxShadow: `0 6px 0 ${C.greenDark}`, padding: '14px 22px', boxSizing: 'border-box' }}>
        <div style={{ fontFamily: DISPLAY, fontWeight: 800, fontSize: 16, letterSpacing: '0.12em', color: '#E9FFD6' }}>UNIT 1</div>
        <div style={{ fontFamily: DISPLAY, fontWeight: 800, fontSize: 28, color: '#fff' }}>Your first steps</div>
      </div>
      {/* today's lesson clock */}
      <div style={{ position: 'absolute', left: 120, top: 190, width: 200, height: 200, display: 'grid', placeItems: 'center' }}>
        <svg width={200} height={200} viewBox="0 0 200 200" style={{ position: 'absolute' }}>
          <circle cx={100} cy={100} r={80} fill="#fff" stroke="#CDEBBF" strokeWidth={18} />
          <circle cx={100} cy={100} r={80} fill="none" stroke={C.green} strokeWidth={18} strokeLinecap="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - sweep * 0.999} transform="rotate(-90 100 100)" />
        </svg>
        <div style={{ textAlign: 'center', fontFamily: DISPLAY, fontWeight: 800, color: C.ink, position: 'relative' }}><div style={{ fontSize: 56, lineHeight: 1 }}><Odo value={sweep * 5} size={56} color={C.ink} /></div><div style={{ fontSize: 22, color: C.text2 }}>min</div></div>
      </div>
      <svg width={440} height={930} style={{ position: 'absolute', inset: 0 }}>
        <path d="M220 420 C 120 470, 120 500, 140 540 S 260 610, 250 660 S 150 760, 170 790" stroke="#F6E2B0" strokeWidth={40} fill="none" strokeLinecap="round" />
      </svg>
      {NODES.map((n, j) => {
        const a = Q.r1.nodes[j], done = t >= a, hit = done ? Math.exp(-(t - a) * 6) : 0;
        return (
          <div key={j} style={{ position: 'absolute', left: n.x - 50, top: n.y - 50, width: 100, height: 100, transform: `scale(${1 + hit * 0.25})` }}>
            <div style={{ position: 'absolute', inset: 0, top: 9, borderRadius: '50%', background: done ? C.greenDark : '#C9CED6' }} />
            <div style={{ position: 'absolute', inset: 0, bottom: 9, borderRadius: '50%', background: done ? C.green : '#E5E7EB', display: 'grid', placeItems: 'center' }}>
              {done ? <div style={{ transform: `scale(${pop(t, a)})` }}><Check size={52} color="#fff" strokeWidth={4} /></div> : <Star size={44} color="#AAB2BF" fill="#AAB2BF" />}
            </div>
          </div>
        );
      })}
      {NODES.map((n, j) => <Burst key={j} t={t} at={Q.r1.nodes[j]} x={n.x} y={n.y} n={10} dist={130} colors={[C.gold, '#fff']} len={26} thick={6} dur={0.4} seed={j} />)}
    </div>
  );
};
const F1: React.FC<{ t: number; at: number }> = ({ t }) => {
  const bus = k(t, Q.r1.bus, Q.r1.bus + 1.15, E.inOutCubic);
  return (
    <>
      <Float t={t} at={Q.r1.clock} x={1620} y={250} seed={1} out={31.8}><Chip icon={<Clock size={36} color={C.blue} strokeWidth={2.6} />} text="5 minutes a day" /></Float>
      {Q.r1.nodes.map((a, j) => <Float key={j} t={t} at={a + 0.05} x={1580 + (j % 2) * 120} y={420 + j * 110} seed={j + 3} out={31.8}><Chip icon={<Img src={img('xp-bolt.svg')} width={34} />} text="+10 XP" color="#B07800" size={28} /></Float>)}
      {t > Q.r1.bus && t < 32.1 && (
        <div style={{ position: 'absolute', left: lerp(-360, 560, bus), top: 880 + Math.abs(Math.sin(t * 18)) * -6 }}>
          <Chip icon={<Bus size={40} color="#fff" strokeWidth={2.4} />} text="On the bus" bg={C.blue} color="#fff" />
        </div>
      )}
    </>
  );
};

// ── 2 · Practise, don't just watch ──────────────────────────────────────────
const OPTS = ['Write a message.', 'Write a 3-line thank-you note to my team. Warm and friendly.'];
const S2: React.FC<{ t: number; at: number }> = ({ t }) => {
  const sel = t >= Q.r2.select, ok = t >= Q.r2.correct;
  const sheet = sp(t, Q.r2.correct, { damping: 15, stiffness: 200, mass: 0.7 });
  const prog = 0.45 + k(t, Q.r2.xp, Q.r2.xp + 0.3, E.outBack) * 0.15;
  return (
    <div style={{ position: 'absolute', inset: 0, background: '#fff' }}>
      <StatusBar />
      <div style={{ position: 'absolute', left: 24, right: 24, top: 66, display: 'flex', alignItems: 'center', gap: 16 }}>
        <X size={30} color="#AFB8C6" strokeWidth={3} />
        <div style={{ flex: 1, height: 20, borderRadius: 10, background: '#E9EDF3', overflow: 'hidden' }}><div style={{ width: `${prog * 100}%`, height: '100%', borderRadius: 10, background: C.green }} /></div>
        <Img src={img('heart.png')} width={30} /><span style={{ fontFamily: DISPLAY, fontWeight: 800, fontSize: 24, color: C.red, marginLeft: -8 }}>5</span>
      </div>
      <div style={{ position: 'absolute', left: 30, top: 130, fontFamily: DISPLAY, fontWeight: 800, fontSize: 17, letterSpacing: '0.12em', color: C.greenDark, background: C.greenBg, borderRadius: 999, padding: '6px 16px' }}>APPLY</div>
      <div style={{ position: 'absolute', left: 30, right: 30, top: 186 }}>
        <Words t={t} text="Which prompt gets a better answer from AI?" at={32.3} size={36} color={C.ink} stagger={0.03} lineHeight={1.18} />
      </div>
      {OPTS.map((o, j) => {
        const p = pop(t, Q.r2.opts[j]);
        const pick = j === 1;
        const st = pick && ok ? 'ok' : pick && sel ? 'sel' : 'idle';
        const c = st === 'ok' ? { b: C.green, l: C.greenDark, bg: C.greenBg, tx: '#3F8F00' } : st === 'sel' ? { b: C.blue, l: C.blueDark, bg: '#E5F1FF', tx: C.blueDark } : { b: '#E5E7EB', l: '#D3D8E0', bg: '#fff', tx: C.ink };
        const down = pick && t >= Q.r2.select - 0.04 && t < Q.r2.select + 0.08;
        return (
          <div key={j} style={{ position: 'absolute', left: 30, right: 30, top: 340 + j * 150, height: j ? 160 : 110, transform: `scale(${p})`, opacity: Math.min(1, p * 2) }}>
            <div style={{ position: 'absolute', inset: 0, top: 7, borderRadius: 20, background: c.l }} />
            <div style={{ position: 'absolute', inset: 0, bottom: down ? 0 : 7, top: down ? 7 : 0, borderRadius: 20, background: c.bg, border: `3px solid ${c.b}`, padding: '0 22px', display: 'flex', alignItems: 'center', fontFamily: BODY, fontWeight: 600, fontSize: 25, lineHeight: 1.3, color: c.tx, boxSizing: 'border-box' }}>“{o}”</div>
          </div>
        );
      })}
      <Btn text="CHECK" y={790} off={!sel} down={t >= Q.r2.check - 0.04 && t < Q.r2.check + 0.08} />
      <Tap t={t} at={Q.r2.select} x={300} y={570} />
      <Tap t={t} at={Q.r2.check} x={260} y={826} />
      {ok && (
        <div style={{ position: 'absolute', left: 0, right: 0, bottom: (sheet - 1) * 300, height: 250, background: C.greenBg, padding: '26px 30px', boxSizing: 'border-box' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ width: 56, height: 56, borderRadius: '50%', background: '#fff', display: 'grid', placeItems: 'center', transform: `scale(${pop(t, Q.r2.correct + 0.05)})` }}><CheckCircle2 size={42} color={C.green} strokeWidth={3} /></div>
            <span style={{ fontFamily: DISPLAY, fontWeight: 800, fontSize: 32, color: '#3F8F00' }}>Nice! That's right.</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 14, marginLeft: 70, fontFamily: DISPLAY, fontWeight: 800, fontSize: 28, color: '#B07800', transform: `scale(${pop(t, Q.r2.xp)})`, transformOrigin: '0 50%' }}><Img src={img('xp-bolt.svg')} width={32} />+10 XP</div>
          <Btn text="CONTINUE" y={140} />
        </div>
      )}
    </div>
  );
};
const PH = [
  { n: 'Learn', c: C.blue, i: BookOpen },
  { n: 'Apply', c: C.green, i: Code2 },
  { n: 'Reflect', c: C.purple, i: Lightbulb },
  { n: 'Deepen', c: C.orange, i: Telescope },
];
const F2: React.FC<{ t: number; at: number }> = ({ t }) => (
  <>
    <Shock t={t} at={Q.r2.correct} x={PX} y={PY + 70} r={420} color={C.green} width={14} />
    <Confetti t={t} at={Q.r2.correct} x={PX} y={PY} n={30} spread={800} dur={1.3} />
    {PH.map((p, j) => {
      const Icon = p.i;
      return (
        <Float key={p.n} t={t} at={Q.r2.phases[j]} x={1680} y={250 + j * 160} seed={j} out={37.85}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 26px 14px 14px', borderRadius: 999, background: '#fff', boxShadow: '0 18px 40px rgba(16,30,90,0.16)' }}>
            <div style={{ width: 62, height: 62, borderRadius: '50%', background: p.c, display: 'grid', placeItems: 'center' }}><Icon size={34} color="#fff" strokeWidth={2.6} /></div>
            <span style={{ fontFamily: DISPLAY, fontWeight: 800, fontSize: 34, color: C.ink }}>{p.n}</span>
          </div>
        </Float>
      );
    })}
  </>
);

// ── 3 · A streak you'll protect ─────────────────────────────────────────────
const S3: React.FC<{ t: number; at: number }> = ({ t }) => {
  const lit = [...Q.r3.days, ...Q.r3.days2].reduce((s, d) => s + k(t, d, d + 0.15, E.outCubic), 0);
  const flick = 1 + Math.sin(t * 23) * 0.03 + kick(t, 10) * 0.06;
  const order = [...Q.r3.days, Q.r3.freeze, ...Q.r3.days2];
  const nudge = sp(t, Q.r3.nudge, { damping: 14, stiffness: 180, mass: 0.7 });
  return (
    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg,#FFF6EA,#FFE7C7)' }}>
      <StatusBar />
      <div style={{ position: 'absolute', left: 0, right: 0, top: 150, display: 'grid', placeItems: 'center' }}>
        <div style={{ position: 'absolute', width: 300, height: 300, borderRadius: '50%', background: `radial-gradient(closest-side, rgba(255,170,0,0.5), transparent)`, transform: `scale(${flick})` }} />
        <Img src={img('burn.png')} width={210} style={{ position: 'relative', transform: `scaleY(${flick}) scaleX(${2 - flick})`, transformOrigin: '50% 100%' }} />
      </div>
      <div style={{ position: 'absolute', left: 0, right: 0, top: 410, textAlign: 'center' }}>
        <Odo value={1 + lit} size={150} color={FIRE} />
        <div style={{ fontFamily: DISPLAY, fontWeight: 800, fontSize: 36, color: '#C46A00', marginTop: -10 }}>day streak!</div>
      </div>
      <div style={{ position: 'absolute', left: 22, right: 22, top: 680, display: 'flex', justifyContent: 'space-between' }}>
        {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, j) => {
          const a = order[j], on = t >= a, frz = j === 4;
          return (
            <div key={j} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 52, height: 52, borderRadius: '50%', background: on ? (frz ? '#84D8FF' : FIRE) : '#fff', border: `4px solid ${on ? (frz ? '#49B8F0' : '#E07A00') : '#F1D9BB'}`, display: 'grid', placeItems: 'center', transform: `scale(${on ? 0.8 + pop(t, a) * 0.2 : 0.9})` }}>
                {on && (frz ? <Img src={img('freeze.svg')} width={40} style={{ transform: `scale(${pop(t, a)})` }} /> : <Check size={30} color="#fff" strokeWidth={4} />)}
              </div>
              <span style={{ fontFamily: DISPLAY, fontWeight: 800, fontSize: 18, color: '#C9A985' }}>{d}</span>
            </div>
          );
        })}
      </div>
      {/* Teyro's reminder drops in from the top */}
      {t >= Q.r3.nudge - 0.05 && (
        <div style={{ position: 'absolute', left: 14, right: 14, top: 58 + (nudge - 1) * 260, display: 'flex', gap: 14, padding: '16px 18px', borderRadius: 26, background: 'rgba(255,255,255,0.97)', boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}>
          <AppIcon size={56} src={img('app-icon.png')} />
          <div style={{ fontFamily: BODY }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: C.text2, letterSpacing: '0.06em' }}>TEYRO · now</div>
            <div style={{ fontSize: 21, fontWeight: 800, color: C.ink }}>Keep your 7-day streak alive!</div>
            <div style={{ fontSize: 18, color: C.text2 }}>One quick lesson is all it takes.</div>
          </div>
        </div>
      )}
    </div>
  );
};
const F3: React.FC<{ t: number; at: number }> = ({ t }) => (
  <>
    <Float t={t} at={Q.r3.freeze} x={1640} y={330} seed={2} out={43.85}><Chip icon={<Img src={img('freeze.svg')} width={48} />} text="Freeze covers a busy day" size={28} /></Float>
    <Shock t={t} at={Q.r3.freeze} x={PX - 4} y={PY + 172} r={260} color="#84D8FF" width={12} dur={0.5} />
    <Float t={t} at={Q.r3.society} x={1650} y={720} seed={5} out={43.85}><Chip icon={<Img src={img('badges/wildfire.svg')} width={56} />} text="Streak Society · 7 days" size={30} color={FIRE} /></Float>
    <Burst t={t} at={Q.r3.society} x={1650} y={720} n={14} dist={260} colors={[FIRE, C.gold, '#fff']} />
  </>
);

// ── 4 · Every day pays off ──────────────────────────────────────────────────
const QUESTS = [{ n: 'Earn 50 XP', m: 50 }, { n: 'Finish 3 lessons', m: 3 }, { n: 'Get 20 answers right', m: 20 }];
const S4: React.FC<{ t: number; at: number }> = ({ t }) => {
  const coins = 338 + Q.r4.coins.filter((c) => t >= c + 0.4).length * 2.5;
  return (
    <div style={{ position: 'absolute', inset: 0, background: '#F5F7FB' }}>
      <StatusBar />
      <Stats t={t} coins={coins} />
      <div style={{ position: 'absolute', left: 22, right: 22, top: 130, borderRadius: 28, background: '#fff', border: `2px solid ${C.border}`, padding: '20px 22px' }}>
        <div style={{ fontFamily: DISPLAY, fontWeight: 800, fontSize: 30, color: C.ink, marginBottom: 6 }}>Daily quests</div>
        {QUESTS.map((q, j) => {
          const a = Q.r4.quests[j], f = lerp(0.3, 1, k(t, a - 0.25, a, E.inOutCubic)), done = t >= a;
          return (
            <div key={j} style={{ padding: '16px 0', borderTop: j ? `2px solid ${C.border}` : 'none' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontFamily: DISPLAY, fontWeight: 800, fontSize: 23, color: C.ink }}>
                {q.n}
                <Img src={img(done ? 'chest-gold.svg' : 'chest-bronze.svg')} width={52} style={{ transform: `scale(${1 + (done ? Math.exp(-(t - a) * 6) * 0.4 : 0)}) rotate(${!done && t > a - 0.25 ? Math.sin(t * 60) * 6 : 0}deg)` }} />
              </div>
              <div style={{ height: 26, borderRadius: 13, background: '#E9EDF3', overflow: 'hidden', position: 'relative', marginTop: 8 }}>
                <div style={{ width: `${f * 100}%`, height: '100%', borderRadius: 13, background: done ? C.gold : C.blue }} />
                <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', fontFamily: DISPLAY, fontWeight: 800, fontSize: 16, color: '#fff' }}>{Math.round(f * q.m)} / {q.m}</div>
              </div>
            </div>
          );
        })}
      </div>
      <div style={{ position: 'absolute', left: 22, right: 22, top: 640, borderRadius: 28, background: 'linear-gradient(135deg,#2E8BFF,#1452F0)', padding: '22px 26px', display: 'flex', alignItems: 'center', gap: 18, transform: `scale(${1 + (t >= Q.r4.level ? Math.exp(-(t - Q.r4.level) * 6) * 0.08 : 0)})` }}>
        <div style={{ position: 'relative', width: 76, height: 80 }}><Img src={img('level-hex.svg')} width={76} /><div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', fontFamily: DISPLAY, fontWeight: 800, fontSize: 28, color: '#fff', paddingBottom: 6 }}>{t >= Q.r4.level ? 15 : 14}</div></div>
        <div style={{ flex: 1, fontFamily: DISPLAY, fontWeight: 800, color: '#fff' }}>
          <div style={{ fontSize: 24 }}>{t >= Q.r4.level ? 'Level 15!' : 'Level 14'}</div>
          <div style={{ height: 14, borderRadius: 7, background: 'rgba(255,255,255,0.3)', marginTop: 10, overflow: 'hidden' }}><div style={{ width: `${(t >= Q.r4.level ? 0.1 : lerp(0.7, 1, k(t, 46.4, Q.r4.level))) * 100}%`, height: '100%', background: C.gold }} /></div>
        </div>
      </div>
    </div>
  );
};
const F4: React.FC<{ t: number; at: number }> = ({ t }) => {
  const CXc = 1640, CYc = 800;
  const inP = sp(t, 45.75, { damping: 12, stiffness: 200, mass: 0.7 });
  const lid = k(t, Q.r4.chest, Q.r4.chest + 0.45, E.outCubic);
  const out = k(t, 47.8, 48.0, E.inBack);
  return (
    <>
      {t >= 45.7 && (
        <>
          {t >= Q.r4.chest && <div style={{ position: 'absolute', left: CXc - 330, top: CYc - 330, width: 660, height: 660, borderRadius: '50%', background: 'repeating-conic-gradient(rgba(255,200,0,0.4) 0deg 10deg, transparent 10deg 24deg)', WebkitMaskImage: 'radial-gradient(closest-side, black 20%, transparent)', transform: `rotate(${t * 40}deg) scale(${k(t, Q.r4.chest, Q.r4.chest + 0.3, E.outBack) * (1 - out)})` }} />}
          <svg width={300} height={300} viewBox="0 0 96 96" style={{ position: 'absolute', left: CXc - 150, top: CYc - 150, overflow: 'visible', transform: `scale(${inP * (1 - out)}) rotate(${t < Q.r4.chest ? Math.sin(t * 70) * 5 : 0}deg)` }}>
            <g transform="translate(0 6)" fill="#8E4A1A"><rect x="12" y="40" width="72" height="40" rx="8" /></g>
            <g fill="#B5652B"><rect x="12" y="40" width="72" height="40" rx="8" /></g>
            <rect x="12" y="40" width="72" height="8" fill="#E5A400" />
            <rect x="20" y="40" width="10" height="44" rx="3" fill="#FFC800" /><rect x="66" y="40" width="10" height="44" rx="3" fill="#FFC800" />
            <g transform={`translate(${lid * -12} ${lid * -42}) rotate(${lid * -36} 12 44)`}>
              <g transform="translate(0 4)" fill="#B5652B"><path d="M12 44C12 28 24 18 48 18C72 18 84 28 84 44Z" /></g>
              <g fill="#D98E55"><path d="M12 44C12 28 24 18 48 18C72 18 84 28 84 44Z" /></g>
              <rect x="20" y="18" width="10" height="26" rx="3" fill="#FFC800" /><rect x="66" y="18" width="10" height="26" rx="3" fill="#FFC800" />
            </g>
          </svg>
        </>
      )}
      {Q.r4.coins.map((c, j) => {
        if (t < c || t > c + 0.42) return null;
        const p = k(t, c, c + 0.4, E.inOutCubic);
        const x = lerp(CXc + (rand(j, 2) - 0.5) * 100, SX + 170, p), y = lerp(CYc - 40, SY + 86, p) - Math.sin(p * Math.PI) * (240 + rand(j, 5) * 120);
        return <Img key={j} src={img('Coin.png')} width={70} style={{ position: 'absolute', left: x - 35, top: y - 35, transform: `scale(${1.2 - p * 0.6}) rotate(${p * 540}deg)`, zIndex: 9 }} />;
      })}
      <Shock t={t} at={Q.r4.chest} x={CXc} y={CYc} r={420} color={C.gold} width={18} />
      <Confetti t={t} at={Q.r4.chest} x={CXc} y={CYc - 60} n={36} colors={[C.gold, '#FFE27A', '#fff', FIRE]} spread={800} />
      <Float t={t} at={Q.r4.level} x={1650} y={300} seed={3} out={47.85}><Chip icon={<Img src={img('level-hex.svg')} width={48} />} text="Level up!" color={C.blueDark} /></Float>
      <Burst t={t} at={Q.r4.level} x={1650} y={300} n={12} dist={220} colors={[C.blue, C.gold, '#fff']} />
    </>
  );
};

// ── 5 · Spend your coins ────────────────────────────────────────────────────
const ITEMS = [
  { n: 'Streak Freeze', a: 'freeze.svg', p: 200, r: 'COMMON' },
  { n: 'XP Boost', a: 'boost-xp.svg', p: 150, r: 'COMMON' },
  { n: 'Refill Hearts', a: 'heart.svg', p: 120, r: 'COMMON' },
  { n: 'Streak Repair', a: 'repair.svg', p: 450, r: 'RARE' },
  { n: 'Coin Boost', a: 'boost-coin.svg', p: 380, r: 'RARE' },
  { n: 'Mystery Chest', a: 'chest-bronze.svg', p: 250, r: 'COMMON' },
];
const S5: React.FC<{ t: number; at: number }> = ({ t }) => {
  const bought = t >= Q.r5.bought;
  const bal = 620 - k(t, Q.r5.bought, Q.r5.bought + 0.4, E.outCubic) * 200;
  return (
    <div style={{ position: 'absolute', inset: 0, background: '#F5F7FB' }}>
      <StatusBar />
      <div style={{ position: 'absolute', left: 26, right: 26, top: 66, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontFamily: DISPLAY, fontWeight: 800, fontSize: 40, color: C.ink }}>Shop</span>
        <span style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 16px', borderRadius: 999, background: '#FFF6D6', fontFamily: DISPLAY, fontWeight: 800, fontSize: 26, color: '#B07800' }}><Img src={img('Coin.png')} width={30} /><Odo value={bal} size={26} color="#B07800" /></span>
      </div>
      <div style={{ position: 'absolute', left: 18, right: 18, top: 140, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
        {ITEMS.map((it, j) => {
          const p = pop(t, Q.r5.items[j]);
          const isBuy = j === 0, mystery = j === 5;
          const wig = mystery && t > Q.r5.mystery && t < Q.r5.mystery + 0.6 ? Math.sin(t * 50) * 6 : 0;
          return (
            <div key={it.n} style={{ height: 238, borderRadius: 24, background: '#fff', border: `3px solid ${isBuy && bought ? C.green : C.border}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 6, transform: `scale(${p * (isBuy && t >= Q.r5.tap - 0.04 && t < Q.r5.tap + 0.08 ? 0.95 : 1)}) rotate(${wig}deg)`, opacity: Math.min(1, p * 2), position: 'relative' }}>
              <span style={{ position: 'absolute', top: 10, left: 12, fontFamily: DISPLAY, fontWeight: 800, fontSize: 12, letterSpacing: '0.1em', color: it.r === 'RARE' ? C.blue : C.muted }}>{it.r}</span>
              <Img src={img(it.a)} width={96} />
              <span style={{ fontFamily: DISPLAY, fontWeight: 800, fontSize: 20, color: C.ink }}>{it.n}</span>
              {isBuy && bought
                ? <span style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '6px 14px', borderRadius: 999, background: C.green, color: '#fff', fontFamily: DISPLAY, fontWeight: 800, fontSize: 18, transform: `scale(${pop(t, Q.r5.bought)})` }}><Check size={18} strokeWidth={4} />Owned</span>
                : <span style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '6px 14px', borderRadius: 999, background: '#FFF6D6', color: '#B07800', fontFamily: DISPLAY, fontWeight: 800, fontSize: 18 }}><Img src={img('Coin.png')} width={20} />{it.p}</span>}
            </div>
          );
        })}
      </div>
      <Tap t={t} at={Q.r5.tap} x={110} y={260} />
    </div>
  );
};
const F5: React.FC<{ t: number; at: number }> = ({ t }) => {
  const fly = k(t, Q.r5.bought, Q.r5.bought + 0.5, E.inOutCubic);
  return (
    <>
      {t > Q.r5.bought && t < Q.r5.bought + 0.5 && <Img src={img('freeze.svg')} width={110} style={{ position: 'absolute', left: lerp(SX + 110, 1660, fly) - 55, top: lerp(SY + 260, 300, fly) - 55 - Math.sin(fly * Math.PI) * 160, transform: `rotate(${fly * 360}deg)`, zIndex: 9 }} />}
      <Float t={t} at={Q.r5.bought + 0.45} x={1660} y={300} seed={2} out={51.85}><Chip icon={<Img src={img('freeze.svg')} width={50} />} text="Streak Freeze × 1" size={30} /></Float>
      <Burst t={t} at={Q.r5.bought} x={SX + 110} y={SY + 260} n={14} dist={240} colors={[C.green, C.gold, '#fff']} />
      <Float t={t} at={Q.r5.mystery} x={1640} y={760} seed={4} out={51.85}><Chip icon={<Img src={img('chest-silver.svg')} width={52} />} text="What's inside?" color={C.purple} size={30} /></Float>
    </>
  );
};

// ── 6 · Race real learners ──────────────────────────────────────────────────
const LEAGUES = ['bronze', 'silver', 'gold', 'sapphire', 'ruby', 'emerald', 'amethyst', 'pearl', 'diamond'];
const PEOPLE = [{ n: 'Kemi A.', xp: 1180, c: '#10B981' }, { n: 'Daniel O.', xp: 1065, c: '#F59E0B' }, { n: 'Priya S.', xp: 940, c: '#EC4899' }, { n: 'Tunde B.', xp: 905, c: '#8B5CF6' }];
const S6: React.FC<{ t: number; at: number }> = ({ t }) => {
  const step = Q.r6.climb.reduce((s, a) => s + k(t, a, a + 0.22, E.outBack), 0);
  const you = 3 - step;
  const crown = pop(t, Q.r6.top);
  const RH = 104;
  const Row = ({ y, rank, n, xp, c, me }: { y: number; rank: number; n: string; xp: number; c: string; me?: boolean }) => (
    <div style={{ position: 'absolute', left: 16, right: 16, top: 250 + y, height: 90, borderRadius: 20, display: 'flex', alignItems: 'center', gap: 14, padding: '0 16px', background: me ? '#E5F1FF' : '#fff', border: `3px solid ${me ? C.blue : 'transparent'}`, zIndex: me ? 2 : 1, transform: me ? `scale(${1.03 + crown * 0.03})` : undefined, boxShadow: me ? '0 12px 26px rgba(1,114,253,0.25)' : undefined }}>
      <span style={{ width: 26, fontFamily: DISPLAY, fontWeight: 800, fontSize: 26, color: rank === 1 ? C.goldDark : C.text2 }}>{rank}</span>
      <div style={{ width: 52, height: 52, borderRadius: '50%', background: c, display: 'grid', placeItems: 'center', fontFamily: DISPLAY, fontWeight: 800, fontSize: 24, color: '#fff', position: 'relative' }}>{n[0]}{me && crown > 0 && <div style={{ position: 'absolute', top: -34, transform: `scale(${crown}) rotate(-12deg)` }}><Crown size={38} color={C.goldDark} fill={C.gold} /></div>}</div>
      <span style={{ fontFamily: DISPLAY, fontWeight: 800, fontSize: 24, color: me ? C.blueDark : C.ink }}>{n}</span>
      <span style={{ marginLeft: 'auto', fontFamily: DISPLAY, fontWeight: 800, fontSize: 20, color: C.text2 }}>{xp} XP</span>
    </div>
  );
  return (
    <div style={{ position: 'absolute', inset: 0, background: '#F5F7FB' }}>
      <StatusBar />
      <div style={{ position: 'absolute', left: 0, right: 0, top: 64, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Img src={img('league-diamond.png')} width={96} style={{ transform: `rotate(${Math.sin(t * 4) * 5}deg)` }} />
        <div style={{ fontFamily: DISPLAY, fontWeight: 800, fontSize: 32, color: C.ink }}>Diamond League</div>
        <div style={{ fontFamily: BODY, fontSize: 18, color: C.text2 }}>Top 10 reach the Tournament</div>
      </div>
      <div style={{ position: 'absolute', left: 10, right: 10, top: 244, height: RH * 3 + 12, borderRadius: 22, background: 'rgba(88,204,2,0.10)', border: '2px dashed rgba(88,204,2,0.5)' }} />
      <div style={{ position: 'absolute', left: 0, right: 0, top: 244 + RH * 3 + 20, textAlign: 'center', fontFamily: DISPLAY, fontWeight: 800, fontSize: 16, letterSpacing: '0.12em', color: C.greenDark }}>▲ PROMOTION ZONE</div>
      {PEOPLE.map((u, j) => {
        const rank = j + Math.max(0, Math.min(1, j + 1 - you));
        return <Row key={u.n} y={rank * RH + (rank >= 3 ? 40 : 0)} rank={Math.round(rank) + 1} n={u.n} xp={u.xp} c={u.c} />;
      })}
      <Row y={you * RH + (you > 2.5 ? 40 : 0)} rank={Math.round(you) + 1} n="You" xp={Math.round(880 + k(t, Q.r6.climb[0] - 0.1, Q.r6.climb[2] + 0.2) * 360)} c={C.blue} me />
    </div>
  );
};
const F6: React.FC<{ t: number; at: number }> = ({ t }) => (
  <>
    {LEAGUES.map((l, j) => {
      const a = Q.r6.badges[j];
      const p = pop(t, a);
      const reached = j === 8 && t >= Q.r6.top;
      return (
        <div key={l} style={{ position: 'absolute', left: 1600 + (j % 2) * 90, top: 940 - j * 104, width: 96, height: 96, transform: `scale(${p * (reached ? 1.25 : 1)}) rotate(${Math.sin(t * 2 + j) * 6}deg)`, opacity: k(t, 55.8, 56.0) > 0 ? 1 - k(t, 55.8, 56.0) : 1, filter: `drop-shadow(0 10px 18px rgba(0,0,0,0.18))${reached ? ' brightness(1.15)' : ''}` }}>
          <Img src={img(`league-${l}.png`)} width={96} />
        </div>
      );
    })}
    <Shock t={t} at={Q.r6.top} x={1690} y={160} r={260} color={C.cyan} width={12} />
    <Confetti t={t} at={Q.r6.top} x={PX} y={PY - 200} n={36} spread={900} />
  </>
);

// ── 7 · Learn with friends (+ monthly challenge) ────────────────────────────
const FRIENDS = [{ n: 'Kemi', d: 'finished Unit 4', s: 64, c: '#10B981' }, { n: 'Daniel', d: 'on a 7-lesson day', s: 31, c: '#F59E0B' }, { n: 'Priya', d: 'joined your league', s: 22, c: '#EC4899' }];
const S7: React.FC<{ t: number; at: number }> = ({ t }) => {
  const month = t >= Q.r7.month;
  const likes = Math.round(k(t, Q.r7.likes, Q.r7.likes + 0.9, E.outCubic) * 24);
  const post = sp(t, Q.r7.post, { damping: 14, stiffness: 170, mass: 0.7 });
  const cheer = sp(t, Q.r7.cheer, { damping: 13, stiffness: 200, mass: 0.6 });
  const ring = k(t, Q.r7.month + 0.1, Q.r7.badge, E.inOutCubic);
  const mIn = k(t, Q.r7.month, Q.r7.month + 0.3, E.outExpo);
  return (
    <div style={{ position: 'absolute', inset: 0, background: '#F5F7FB' }}>
      <StatusBar />
      <div style={{ position: 'absolute', inset: 0, transform: `translateX(${-mIn * 440}px)` }}>
        <div style={{ position: 'absolute', left: 26, top: 66, fontFamily: DISPLAY, fontWeight: 800, fontSize: 36, color: C.ink }}>Friends</div>
        {FRIENDS.map((f, j) => {
          const p = sp(t, Q.r7.friends[j], { damping: 13, stiffness: 200, mass: 0.6 });
          return (
            <div key={f.n} style={{ position: 'absolute', left: 18, right: 18, top: 126 + j * 92, height: 80, borderRadius: 20, background: '#fff', display: 'flex', alignItems: 'center', gap: 14, padding: '0 16px', transform: `translateX(${(1 - p) * 460}px)` }}>
              <div style={{ width: 50, height: 50, borderRadius: '50%', background: f.c, display: 'grid', placeItems: 'center', fontFamily: DISPLAY, fontWeight: 800, fontSize: 22, color: '#fff' }}>{f.n[0]}</div>
              <div style={{ fontFamily: BODY, fontSize: 20, color: C.ink }}><b>{f.n}</b> <span style={{ color: C.text2 }}>{f.d}</span></div>
              <span style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 4, fontFamily: DISPLAY, fontWeight: 800, fontSize: 20, color: FIRE }}><Img src={img('burn.png')} width={22} />{f.s}</span>
            </div>
          );
        })}
        {/* community post */}
        <div style={{ position: 'absolute', left: 18, right: 18, top: 420, borderRadius: 26, background: '#fff', border: `2px solid ${C.border}`, padding: '20px 22px', transform: `translateY(${(1 - post) * 600}px)` }}>
          <div style={{ fontFamily: DISPLAY, fontWeight: 800, fontSize: 15, letterSpacing: '0.1em', color: C.text2 }}>YOUR COURSE COMMUNITY</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 12 }}>
            <div style={{ width: 48, height: 48, borderRadius: '50%', background: C.blue, display: 'grid', placeItems: 'center', fontFamily: DISPLAY, fontWeight: 800, fontSize: 22, color: '#fff' }}>Y</div>
            <b style={{ fontFamily: BODY, fontSize: 21, color: C.ink }}>You</b>
            <Img src={img('posts/WIN.svg')} height={38} style={{ marginLeft: 'auto' }} />
          </div>
          <div style={{ fontFamily: DISPLAY, fontWeight: 800, fontSize: 30, color: C.ink, marginTop: 14, lineHeight: 1.2 }}>Built my first to-do app today!</div>
          <div style={{ display: 'flex', gap: 22, marginTop: 16, fontFamily: DISPLAY, fontWeight: 800, fontSize: 22, color: C.text2 }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 6, color: likes ? C.red : C.text2, transform: `scale(${1 + (likes > 0 && likes < 24 ? 0.12 : 0)})` }}><Heart size={24} fill={likes ? C.red : 'none'} color={likes ? C.red : C.text2} />{likes}</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><MessageCircle size={24} />{Math.round(k(t, Q.r7.likes + 0.3, Q.r7.likes + 1.1) * 8)}</span>
          </div>
        </div>
        {t >= Q.r7.cheer && (
          <div style={{ position: 'absolute', left: 40, right: 40, top: 760, padding: '16px 20px', borderRadius: 999, background: C.ink, color: '#fff', display: 'flex', alignItems: 'center', gap: 12, fontFamily: DISPLAY, fontWeight: 800, fontSize: 22, transform: `scale(${cheer})` }}>
            <Heart size={26} color={C.red} fill={C.red} />Kemi cheered you on
          </div>
        )}
      </div>
      {/* monthly challenge */}
      {month && (
        <div style={{ position: 'absolute', inset: 0, transform: `translateX(${(1 - mIn) * 440}px)`, background: 'linear-gradient(180deg,#FFF0F6,#F5F7FB)' }}>
          <div style={{ position: 'absolute', left: 26, top: 66, fontFamily: DISPLAY, fontWeight: 800, fontSize: 32, color: C.ink }}>Monthly challenge</div>
          <div style={{ position: 'absolute', left: 70, top: 160, width: 300, height: 300, display: 'grid', placeItems: 'center' }}>
            <svg width={300} height={300} viewBox="0 0 300 300" style={{ position: 'absolute' }}>
              <circle cx={150} cy={150} r={128} fill="none" stroke="#F3D3E2" strokeWidth={22} />
              <circle cx={150} cy={150} r={128} fill="none" stroke="#EC4899" strokeWidth={22} strokeLinecap="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - ring * 0.999} transform="rotate(-90 150 150)" />
            </svg>
            <Img src={img('badges/marathon.svg')} width={170} style={{ transform: `scale(${t >= Q.r7.badge ? 1 + Math.exp(-(t - Q.r7.badge) * 5) * 0.3 : 0.9}) rotate(${t >= Q.r7.badge ? 0 : Math.sin(t * 3) * 4}deg)`, filter: t >= Q.r7.badge ? undefined : 'grayscale(0.7) opacity(0.7)' }} />
          </div>
          <div style={{ position: 'absolute', left: 0, right: 0, top: 500, textAlign: 'center', fontFamily: DISPLAY, fontWeight: 800, fontSize: 30, color: C.ink }}>{t >= Q.r7.badge ? 'Badge earned!' : 'Hit your goal this month'}</div>
          <div style={{ position: 'absolute', left: 40, right: 40, top: 570, height: 28, borderRadius: 14, background: '#F3D3E2', overflow: 'hidden' }}><div style={{ width: `${ring * 100}%`, height: '100%', background: '#EC4899' }} /></div>
          <div style={{ position: 'absolute', left: 30, right: 30, top: 640, display: 'flex', justifyContent: 'space-around' }}>
            {['chest-bronze.svg', 'chest-silver.svg', 'chest-gold.svg'].map((c, j) => <Img key={c} src={img(c)} width={84} style={{ transform: `scale(${ring >= (j + 1) / 3 - 0.01 ? 1.15 : 0.9})`, filter: ring >= (j + 1) / 3 - 0.01 ? undefined : 'grayscale(0.8)' }} />)}
          </div>
        </div>
      )}
    </div>
  );
};
const F7: React.FC<{ t: number; at: number }> = ({ t }) => (
  <>
    {Array.from({ length: 8 }).map((_, j) => {
      const a = Q.r7.likes + j * 0.11;
      if (t < a || t > a + 0.9) return null;
      const p = k(t, a, a + 0.9, E.outCubic);
      return <div key={j} style={{ position: 'absolute', left: SX + 70 + rand(j, 3) * 120 + Math.sin(p * 8 + j) * 20, top: SY + 600 - p * 380, transform: `scale(${0.6 + p * 0.6})`, opacity: 1 - p }}><Heart size={44} color={C.red} fill={C.red} /></div>;
    })}
    <Float t={t} at={Q.r7.post + 0.2} x={1650} y={300} seed={2} out={59.85}><Chip icon={<Img src={img('community.svg')} width={48} />} text="Join after 2 lessons" size={30} /></Float>
    <Shock t={t} at={Q.r7.badge} x={PX} y={PY - 170} r={460} color="#EC4899" width={16} />
    <Burst t={t} at={Q.r7.badge} x={PX} y={PY - 170} n={18} dist={420} colors={['#EC4899', C.gold, '#fff']} />
    <Confetti t={t} at={Q.r7.badge} x={PX} y={PY - 200} n={44} spread={1000} />
    <Float t={t} at={Q.r7.badge + 0.1} x={1660} y={760} seed={6} out={61.6}><Chip icon={<Img src={img('badges/marathon.svg')} width={52} />} text="New badge" color="#DB2777" size={30} /></Float>
  </>
);

const REASONS: R[] = [
  { col: C.blue, dark: C.blueDark, tint: '#EAF2FF', title: 'Lessons you can finish.', sub: 'Bite-sized lessons you can do on a bus ride.', Screen: S1, Floats: F1 },
  { col: C.greenDark, dark: '#3F8F00', tint: '#ECF9E2', title: "Practise. Don't just watch.", sub: 'Every lesson has you use the idea straight away, with instant feedback.', Screen: S2, Floats: F2 },
  { col: FIRE, dark: '#C46A00', tint: '#FFF2E2', title: "A streak you'll protect.", sub: 'A freeze covers a busy day, so one bad day never undoes your progress.', Screen: S3, Floats: F3 },
  { col: C.goldDark, dark: '#B07800', tint: '#FFF8DC', title: 'Every day pays off.', sub: 'Three fresh quests every day, chests to open and coins to earn.', Screen: S4, Floats: F4 },
  { col: C.purple, dark: '#7322C0', tint: '#F4ECFF', title: 'Spend your coins.', sub: 'Streak freezes, XP boosts, mystery chests and more in the shop.', Screen: S5, Floats: F5 },
  { col: '#0891B2', dark: '#0E7490', tint: '#E3F7FA', title: 'Race real learners.', sub: 'Weekly leagues, from Bronze all the way to Diamond.', Screen: S6, Floats: F6 },
  { col: '#DB2777', dark: '#9D174D', tint: '#FFEBF4', title: 'Learn with friends.', sub: 'Share wins, ask questions and get cheered on.', title2: 'Win a badge every month.', sub2: 'Monthly challenges keep the fun going.', Screen: S7, Floats: F7 },
];
