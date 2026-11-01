import React from 'react';
import { BookOpen, Check, CheckCircle2, Clock, Code2, Lightbulb, Lock, MousePointer2, Star, Target, Telescope, X, Zap, type LucideIcon } from 'lucide-react';
import { AbsoluteFill, interpolate, Img } from 'remotion';
import { BODY, C, DISPLAY, E, MONO, Q, img, k, last, lerp, rand, shake, sp } from './lib';
import { Burst, Confetti, Odo, Shock, Smear, Words, pop } from './fx';
import { LightBg } from './common';

// ════════════════════════════════════════════════════════════════════════════
// 20–22 s  The course path (rebuilt from the dashboard): lessons check off on the beat.
// ════════════════════════════════════════════════════════════════════════════
const NODES = [0, 1, 2, 3, 4, 5].map((i) => ({ x: 960 + [0, -150, -40, 150, 40, -130][i], y: -i * 270 }));
const LESSONS = ['git init', 'git status', 'git add', 'git commit'];
const MINS = ['7 min', '8 min', '9 min', '11 min'];

export const SPath: React.FC<{ t: number }> = ({ t }) => {
  const scroll = interpolate(t, [20, 20.25, 21.75, 22], [0, 40, 820, 900], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: E.inOutCubic });
  const exit = k(t, 21.8, 22.0, E.inExpo);
  const road = NODES.map((n, i) => (i === 0 ? `M${n.x} ${n.y + 400}` : '') + ` S ${NODES[i].x + (i % 2 ? -90 : 90)} ${n.y + 135}, ${n.x} ${n.y}`).join(' ');
  const done = last(t, Q.path);
  const enter = k(t, 20.0, 20.3, E.outExpo);
  return (
    <AbsoluteFill style={{ background: '#DFF3D2', overflow: 'hidden' }}>
      <Smear amt={exit * 50} id="pathy" vertical style={{ transform: `translateY(${exit * -1300}px)` }}>
        {/* meadow */}
        <div style={{ position: 'absolute', inset: 0, transform: `translateY(${scroll * 0.6}px)` }}>
          {Array.from({ length: 16 }).map((_, i) => {
            const x = rand(i, 4) * 1920, y = -900 + rand(i, 8) * 2000;
            return <div key={i} style={{ position: 'absolute', left: x, top: y, width: 220 + rand(i, 2) * 260, height: 90 + rand(i, 3) * 60, borderRadius: '50%', background: '#CDEBBF' }} />;
          })}
        </div>
        <div style={{ position: 'absolute', inset: 0, transform: `translateY(${scroll}px)` }}>
          {Array.from({ length: 12 }).map((_, i) => <Tree key={i} x={1240 + rand(i, 5) * 600} y={-900 + i * 170 + rand(i, 7) * 60} s={0.8 + rand(i, 9) * 0.5} />)}
          <svg width={1920} height={1080} style={{ position: 'absolute', left: 0, top: 760, overflow: 'visible' }}>
            <path d={road} fill="none" stroke="#E3C27E" strokeWidth={96} strokeLinecap="round" />
            <path d={road} fill="none" stroke="#F6E2B0" strokeWidth={78} strokeLinecap="round" />
            <path d={road} fill="none" stroke="#FFF3D1" strokeWidth={8} strokeLinecap="round" strokeDasharray="4 34" />
          </svg>
          {NODES.map((n, i) => <PathNode key={i} t={t} i={i} x={n.x} y={n.y + 760} done={i <= done} at={Q.path[i]} />)}
          {/* lesson cards, from the real Unit 2 */}
          {LESSONS.map((name, i) => {
            const p = sp(t, Q.path[i] + 0.04, { damping: 13, stiffness: 190, mass: 0.7 });
            if (p <= 0) return null;
            const n = NODES[i];
            return (
              <div key={name} style={{ position: 'absolute', left: n.x + 110, top: n.y + 760 - 56, transform: `translateX(${(1 - p) * -60}px) scale(${0.6 + p * 0.4})`, transformOrigin: '0 50%', opacity: Math.min(1, p * 2), display: 'flex', alignItems: 'center', gap: 18, padding: '16px 26px 16px 18px', borderRadius: 22, background: '#fff', boxShadow: '0 14px 36px rgba(30,80,20,0.18)', border: `2px solid ${C.border}` }}>
                <div style={{ width: 52, height: 52, borderRadius: 14, background: C.greenBg, display: 'grid', placeItems: 'center' }}><Check size={32} color={C.greenDark} strokeWidth={3.5} /></div>
                <div>
                  <div style={{ fontFamily: MONO, fontWeight: 700, fontSize: 32, color: C.ink }}>{name}</div>
                  <div style={{ fontFamily: BODY, fontSize: 20, color: C.text2 }}>{MINS[i]} · Video</div>
                </div>
                <div style={{ marginLeft: 8, display: 'flex', alignItems: 'center', gap: 4, fontFamily: DISPLAY, fontWeight: 800, fontSize: 26, color: '#B07800' }}><Img src={img('xp-bolt.svg')} width={30} />+10 XP</div>
              </div>
            );
          })}
        </div>
        {/* unit banner */}
        <div style={{ position: 'absolute', left: 560, top: 48, width: 800, height: 120, borderRadius: 26, background: C.green, boxShadow: `0 8px 0 ${C.greenDark}`, display: 'flex', alignItems: 'center', padding: '0 34px', transform: `translateY(${(1 - enter) * -200}px)`, boxSizing: 'border-box' }}>
          <div>
            <div style={{ fontFamily: DISPLAY, fontWeight: 800, fontSize: 22, letterSpacing: '0.12em', color: '#E9FFD6' }}>UNIT 2</div>
            <div style={{ fontFamily: DISPLAY, fontWeight: 800, fontSize: 42, color: '#fff' }}>2 - Git Fundamentals</div>
          </div>
          <div style={{ marginLeft: 'auto', fontFamily: DISPLAY, fontWeight: 800, fontSize: 30, color: '#fff', background: 'rgba(0,0,0,0.14)', borderRadius: 16, padding: '10px 18px' }}><Odo value={Math.max(0, done + 1) + 3} size={30} />/22</div>
        </div>
        {/* headline */}
        <div style={{ position: 'absolute', left: 90, top: 330 }}>
          <div style={{ transform: `scale(${pop(t, 20.0)})`, transformOrigin: '0 100%' }}>
            <Odo value={k(t, 20.0, 21.2, E.outCubic) * 57} size={250} color={C.ink} />
          </div>
          <Words t={t} text="bite-sized lessons." at={20.25} size={84} color={C.ink} stagger={0.08} style={{ width: 520, marginTop: 6 }} hi={{ 0: C.greenDark }} />
        </div>
      </Smear>
    </AbsoluteFill>
  );
};

const Tree: React.FC<{ x: number; y: number; s: number }> = ({ x, y, s }) => (
  <div style={{ position: 'absolute', left: x, top: y, transform: `scale(${s})` }}>
    <div style={{ position: 'absolute', left: 30, top: 70, width: 16, height: 40, borderRadius: 6, background: '#8A5A2B' }} />
    <div style={{ width: 76, height: 84, borderRadius: '50%', background: '#4CAF2E', boxShadow: 'inset -10px -12px 0 #3E9A24' }} />
  </div>
);

const PathNode: React.FC<{ t: number; i: number; x: number; y: number; done: boolean; at?: number }> = ({ t, i, x, y, done, at }) => {
  const current = i === 4;
  const hit = done && at !== undefined ? Math.exp(-(t - at) * 6) : 0;
  const top = done || current ? C.green : '#E5E7EB', lip = done || current ? C.greenDark : '#C9CED6';
  const ck = done && at !== undefined ? pop(t, at) : 0;
  return (
    <>
      <div style={{ position: 'absolute', left: x - 70, top: y - 70, width: 140, height: 140, transform: `scale(${1 + hit * 0.25}) translateY(${-hit * 18}px)` }}>
        <div style={{ position: 'absolute', inset: 0, top: 12, borderRadius: '50%', background: lip }} />
        <div style={{ position: 'absolute', inset: 0, bottom: 12, borderRadius: '50%', background: top, display: 'grid', placeItems: 'center', boxShadow: current ? `0 0 0 ${10 + Math.sin(t * 8) * 4}px rgba(88,204,2,0.25)` : undefined }}>
          {done ? <div style={{ transform: `scale(${ck})` }}><Check size={72} color="#fff" strokeWidth={4} /></div> : current ? <Star size={64} color="#fff" fill="#fff" /> : <Lock size={52} color="#AAB2BF" strokeWidth={2.6} />}
        </div>
        <div style={{ position: 'absolute', left: 26, top: 14, width: 40, height: 16, borderRadius: 8, background: 'rgba(255,255,255,0.35)', transform: 'rotate(-20deg)' }} />
      </div>
      {at !== undefined && <Shock t={t} at={at} x={x} y={y} r={220} color={C.green} width={12} dur={0.5} />}
      {at !== undefined && <Burst t={t} at={at} x={x} y={y} n={12} dist={240} colors={[C.gold, '#fff', C.green]} len={46} thick={8} dur={0.45} seed={i + 2} />}
    </>
  );
};

// ════════════════════════════════════════════════════════════════════════════
// 22–24 s  Learn → Apply → Reflect → Deepen: the lesson bar fills one phase per beat.
// ════════════════════════════════════════════════════════════════════════════
const PHASES = [
  { name: 'Learn', color: C.blue, icon: BookOpen },
  { name: 'Apply', color: C.green, icon: Code2 },
  { name: 'Reflect', color: C.purple, icon: Lightbulb },
  { name: 'Deepen', color: C.orange, icon: Telescope },
];
export const SPhases: React.FC<{ t: number }> = ({ t }) => {
  const enter = k(t, 22.0, 22.3, E.outExpo);
  const exit = k(t, 23.8, 24.0, E.inExpo);
  const cur = Math.max(0, last(t, Q.phases));
  const BX = 260, BW = 1400, SW = BW / 4;
  const sh = shake(t, Q.phases.map((p) => [p, 0.22] as [number, number]));
  return (
    <AbsoluteFill>
      <LightBg t={t} base="#FFFFFF" />
      <Smear amt={(1 - enter) * 50 + exit * 50} id="phy" vertical style={{ transform: `translateY(${(1 - enter) * 1100 - exit * 1300}px) translate(${sh.x}px, ${sh.y}px)` }}>
        <div style={{ position: 'absolute', top: 150, left: 0, right: 0, textAlign: 'center', fontFamily: DISPLAY, fontWeight: 800, fontSize: 36, letterSpacing: '0.14em', color: C.text2 }}>EVERY LESSON, FOUR STEPS</div>
        <div style={{ position: 'absolute', top: 250, left: 0, right: 0 }}>
          {PHASES.map((p, i) => i === cur && <Words key={i} t={t} text={p.name} at={Q.phases[i]} out={Q.phases[i + 1] ? Q.phases[i + 1] - 0.1 : undefined} size={230} by="char" stagger={0.024} color={p.color} align="center" />)}
        </div>
        {/* the bar */}
        <div style={{ position: 'absolute', left: BX, top: 600, width: BW, height: 44, borderRadius: 22, background: '#E9EDF3', overflow: 'hidden' }}>
          {PHASES.map((p, i) => {
            const f = k(t, Q.phases[i], Q.phases[i] + 0.32, E.outExpo);
            return (
              <div key={i} style={{ position: 'absolute', left: i * SW, top: 0, width: SW * f, height: 44, background: p.color }}>
                <div style={{ position: 'absolute', left: 16, right: 16, top: 9, height: 10, borderRadius: 5, background: 'rgba(255,255,255,0.35)' }} />
              </div>
            );
          })}
          {/* sheen */}
          <div style={{ position: 'absolute', top: 0, height: 44, width: 160, left: -200 + ((t - 22) % 0.5) * 2 * (BW + 400), background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.65), transparent)', transform: 'skewX(-20deg)' }} />
        </div>
        {PHASES.map((p, i) => {
          const s = pop(t, Q.phases[i]);
          const Icon = p.icon;
          return (
            <div key={i} style={{ position: 'absolute', left: BX + i * SW, width: SW, top: 690, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, transform: `scale(${s}) translateY(${(1 - s) * 40}px)`, opacity: Math.min(1, s * 2) }}>
              <div style={{ width: 104, height: 104, borderRadius: 28, background: p.color, boxShadow: `0 8px 0 ${shade(p.color)}`, display: 'grid', placeItems: 'center' }}><Icon size={56} color="#fff" strokeWidth={2.4} /></div>
              <div style={{ fontFamily: DISPLAY, fontWeight: 800, fontSize: 40, color: C.ink }}>{p.name}</div>
            </div>
          );
        })}
        {Q.phases.map((at, i) => <Shock key={i} t={t} at={at} x={BX + i * SW + SW / 2} y={622} r={260} color={PHASES[i].color} width={10} dur={0.45} />)}
      </Smear>
    </AbsoluteFill>
  );
};
const shade = (c: string) => ({ [C.blue]: C.blueDark, [C.green]: C.greenDark, [C.purple]: '#7322C0', [C.orange]: '#C77C06' } as Record<string, string>)[c] ?? c;

// ════════════════════════════════════════════════════════════════════════════
// 24–28 s  Apply: a real exercise is answered on the beat → instant feedback → lesson complete.
// ════════════════════════════════════════════════════════════════════════════
const OPTS = ['git commit', 'git add .', 'git push', 'git status'];
const CX = 820, CY = 70, CW = 1000, CH = 940; // lesson card
const OPT_POS = (i: number) => ({ x: CX + 50 + (i % 2) * 460, y: CY + 410 + Math.floor(i / 2) * 150 });

export const SApply: React.FC<{ t: number }> = ({ t }) => {
  const enter = k(t, 24.0, 24.32, E.outExpo);
  const exit = k(t, 27.72, 28.0, E.inExpo);
  const selected = t >= Q.select, checked = t >= Q.check, correct = t >= Q.correct;
  const sheet = sp(t, Q.correct, { damping: 15, stiffness: 200, mass: 0.7 });
  const complete = k(t, 26.42, 26.62, E.inOutCubic);
  // cursor path: → option 2 → CHECK
  const o = OPT_POS(1);
  const c1 = k(t, 24.55, 24.95, E.inOutCubic), c2 = k(t, 25.1, 25.45, E.inOutCubic);
  const curX = lerp(lerp(1900, o.x + 300, c1), CX + CW / 2 + 120, c2), curY = lerp(lerp(1150, o.y + 70, c1), CY + CH - 80, c2);
  const pressing = (t >= Q.select - 0.04 && t < Q.select + 0.08) || (t >= Q.check - 0.04 && t < Q.check + 0.08);
  const prog = 0.62 + k(t, Q.xp + 0.15, Q.xp + 0.45, E.outBack) * 0.16;
  const sh = shake(t, [[Q.correct, 0.3]]);
  return (
    <AbsoluteFill>
      <LightBg t={t} />
      <Smear amt={(1 - enter) * 50 + exit * 70} id="apx" style={{ transform: `translateX(${(1 - enter) * 1500 - exit * 2400}px)` }}>
        {/* headline */}
        <div style={{ position: 'absolute', left: 90, top: 300, width: 680 }}>
          {t < Q.correct
            ? <Words t={t} text="Practise. Don't just watch." at={24.05} out={Q.correct - 0.15} size={104} color={C.ink} stagger={0.07} lineHeight={1.05} hi={{ 0: C.greenDark }} />
            : <Words t={t} text="Get instant feedback." at={Q.correct} size={104} color={C.ink} stagger={0.07} lineHeight={1.05} hi={{ 1: C.greenDark }} />}
        </div>
        {/* lesson card */}
        <div style={{ position: 'absolute', left: CX, top: CY, width: CW, height: CH, borderRadius: 40, background: '#fff', boxShadow: '0 40px 100px rgba(23,42,120,0.16)', border: `2px solid ${C.border}`, overflow: 'hidden', transform: `translate(${sh.x}px, ${sh.y}px)` }}>
          {/* top bar */}
          <div style={{ position: 'absolute', left: 44, right: 44, top: 40, display: 'flex', alignItems: 'center', gap: 26 }}>
            <X size={44} color="#AFB8C6" strokeWidth={3} />
            <div style={{ flex: 1, height: 26, borderRadius: 13, background: '#E9EDF3', overflow: 'hidden' }}>
              <div style={{ width: `${prog * 100}%`, height: '100%', background: C.green, borderRadius: 13, position: 'relative' }}><div style={{ position: 'absolute', left: 12, right: 12, top: 5, height: 6, borderRadius: 3, background: 'rgba(255,255,255,0.4)' }} /></div>
            </div>
            <Img src={img('heart.png')} width={44} /><span style={{ fontFamily: DISPLAY, fontWeight: 800, fontSize: 34, color: C.red, marginLeft: -16 }}>5</span>
          </div>
          {/* question */}
          <div style={{ opacity: 1 - complete, transform: `scale(${1 - complete * 0.1})` }}>
            <div style={{ position: 'absolute', left: 50, top: 130, fontFamily: DISPLAY, fontWeight: 800, fontSize: 24, letterSpacing: '0.12em', color: C.greenDark, background: C.greenBg, borderRadius: 999, padding: '8px 20px' }}>APPLY</div>
            <div style={{ position: 'absolute', left: 50, right: 50, top: 200 }}>
              <Words t={t} text="Which command stages your changes for the next commit?" at={24.15} size={52} color={C.ink} stagger={0.03} lineHeight={1.18} />
            </div>
          </div>
        </div>
        {/* options (outside the card's overflow so they can bounce) */}
        {OPTS.map((s, i) => {
          const p = OPT_POS(i), a = pop(t, 24.35 + i * 0.07);
          const isPick = i === 1;
          const state = isPick && correct ? 'ok' : isPick && selected ? 'sel' : 'idle';
          const col = state === 'ok' ? { b: C.green, l: C.greenDark, bg: C.greenBg, tx: '#3F8F00' } : state === 'sel' ? { b: C.blue, l: C.blueDark, bg: '#E5F1FF', tx: C.blueDark } : { b: '#E5E7EB', l: '#D3D8E0', bg: '#fff', tx: C.ink };
          const down = isPick && t >= Q.select - 0.04 && t < Q.select + 0.08;
          const bump = state === 'ok' ? Math.exp(-(t - Q.correct) * 6) * 0.1 : 0;
          return (
            <div key={s} style={{ position: 'absolute', left: p.x - CX + CX, top: p.y, width: 440, height: 124, transform: `scale(${a * (1 + bump)})`, opacity: (1 - complete) * Math.min(1, a * 2) }}>
              <div style={{ position: 'absolute', inset: 0, top: 8, borderRadius: 22, background: col.l }} />
              <div style={{ position: 'absolute', inset: 0, bottom: down ? 0 : 8, top: down ? 8 : 0, borderRadius: 22, background: col.bg, border: `3px solid ${col.b}`, display: 'grid', placeItems: 'center', fontFamily: MONO, fontWeight: 700, fontSize: 38, color: col.tx, boxSizing: 'border-box' }}>{s}</div>
            </div>
          );
        })}
        {/* CHECK */}
        <div style={{ position: 'absolute', left: CX + 50, top: CY + CH - 150, width: CW - 100, height: 100, opacity: 1 - complete }}>
          <div style={{ position: 'absolute', inset: 0, top: 8, borderRadius: 22, background: selected ? C.greenDark : '#D3D8E0' }} />
          <div style={{ position: 'absolute', inset: 0, bottom: t >= Q.check - 0.04 && t < Q.check + 0.08 ? 0 : 8, top: t >= Q.check - 0.04 && t < Q.check + 0.08 ? 8 : 0, borderRadius: 22, background: selected ? C.green : '#E5E7EB', display: 'grid', placeItems: 'center', fontFamily: DISPLAY, fontWeight: 800, fontSize: 36, letterSpacing: '0.08em', color: selected ? '#fff' : '#AFB8C6' }}>CHECK</div>
        </div>
        {/* feedback sheet */}
        {correct && complete < 1 && (
          <div style={{ position: 'absolute', left: CX + 2, width: CW - 4, top: CY + CH - 290 + (1 - sheet) * 300, height: 288, borderRadius: '0 0 38px 38px', background: C.greenBg, opacity: 1 - complete, padding: '34px 50px', boxSizing: 'border-box' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 22 }}>
              <div style={{ width: 76, height: 76, borderRadius: '50%', background: '#fff', display: 'grid', placeItems: 'center', transform: `scale(${pop(t, Q.correct + 0.05)})` }}><CheckCircle2 size={56} color={C.green} strokeWidth={3} /></div>
              <span style={{ fontFamily: DISPLAY, fontWeight: 800, fontSize: 56, color: '#3F8F00' }}>Nice!</span>
              <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 8, padding: '10px 22px', borderRadius: 999, background: '#fff', fontFamily: DISPLAY, fontWeight: 800, fontSize: 34, color: '#B07800', transform: `scale(${pop(t, Q.xp)})` }}><Img src={img('xp-bolt.svg')} width={40} />+10 XP</div>
            </div>
            <div style={{ marginTop: 26, height: 96, borderRadius: 22, background: C.green, boxShadow: `0 8px 0 ${C.greenDark}`, display: 'grid', placeItems: 'center', fontFamily: DISPLAY, fontWeight: 800, fontSize: 34, letterSpacing: '0.08em', color: '#fff' }}>CONTINUE</div>
          </div>
        )}
        <Shock t={t} at={Q.correct} x={OPT_POS(1).x + 220} y={OPT_POS(1).y + 60} r={360} color={C.green} width={14} />
        <Burst t={t} at={Q.correct} x={OPT_POS(1).x + 220} y={OPT_POS(1).y + 60} n={14} dist={300} colors={[C.green, C.gold, '#fff']} />
        {/* xp bolt flies to the bar */}
        {t > Q.xp && t < Q.xp + 0.5 && (() => {
          const p = k(t, Q.xp, Q.xp + 0.45, E.inOutCubic);
          const x = lerp(CX + CW - 200, CX + 44 + 70 + (CW - 300) * 0.7, p), y = lerp(CY + CH - 240, CY + 52, p) - Math.sin(p * Math.PI) * 180;
          return <Img src={img('xp-bolt.svg')} width={90} style={{ position: 'absolute', left: x - 45, top: y - 45, transform: `scale(${1.4 - p * 0.8}) rotate(${p * 360}deg)` }} />;
        })()}
        {/* lesson complete */}
        {complete > 0 && (
          <div style={{ position: 'absolute', left: CX, top: CY + 150, width: CW, opacity: complete }}>
            <Words t={t} text="Lesson complete!" at={26.45} size={92} color={C.goldDark} align="center" stagger={0.07} />
            <div style={{ display: 'flex', justifyContent: 'center', gap: 28, marginTop: 70 }}>
              <Stat t={t} at={Q.stats[0]} icon={Zap} color={C.gold} dark={C.goldDark} label="TOTAL XP" value={10} prefix="+" />
              <Stat t={t} at={Q.stats[1]} icon={Target} color={C.green} dark={C.greenDark} label="ACCURACY" value={100} suffix="%" />
              <Stat t={t} at={Q.stats[2]} icon={Clock} color={C.blue} dark={C.blueDark} label="TIME" value={5} suffix=" min" />
            </div>
          </div>
        )}
        <Confetti t={t} at={Q.stats[0]} x={CX + CW / 2} y={CY + 300} n={50} spread={1100} />
        {/* cursor */}
        {t > 24.5 && t < 25.75 && (
          <div style={{ position: 'absolute', left: curX, top: curY, transform: `scale(${pressing ? 0.82 : 1})`, opacity: 1 - k(t, 25.55, 25.75) }}>
            <MousePointer2 size={64} color="#fff" fill={C.ink} strokeWidth={2} />
          </div>
        )}
      </Smear>
    </AbsoluteFill>
  );
};

const Stat: React.FC<{ t: number; at: number; icon: LucideIcon; color: string; dark: string; label: string; value: number; prefix?: string; suffix?: string }> = ({ t, at, icon: Icon, color, dark, label, value, prefix = '', suffix = '' }) => {
  const p = pop(t, at);
  const v = Math.round(k(t, at + 0.05, at + 0.5, E.outCubic) * value);
  return (
    <div style={{ width: 270, borderRadius: 24, border: `4px solid ${color}`, background: color, transform: `scale(${p}) translateY(${(1 - p) * 60}px)`, opacity: Math.min(1, p * 2), overflow: 'hidden', boxShadow: `0 8px 0 ${dark}` }}>
      <div style={{ padding: '10px 0', textAlign: 'center', fontFamily: DISPLAY, fontWeight: 800, fontSize: 24, letterSpacing: '0.1em', color: '#fff' }}>{label}</div>
      <div style={{ background: '#fff', borderRadius: 18, padding: '26px 0', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, fontFamily: DISPLAY, fontWeight: 800, fontSize: 52, color: dark }}>
        <Icon size={44} color={color} strokeWidth={3} />{prefix}{v}{suffix}
      </div>
    </div>
  );
};
