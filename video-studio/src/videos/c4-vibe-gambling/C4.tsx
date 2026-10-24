import React from 'react';
import { Img, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import voData from './vo.json';
import { Stage, type Sfx } from '../../explainer/Stage';
import { Headline } from '../../explainer/Headline';
import { TopBar } from '../../explainer/TopBar';
import { Card, Odometer, Rise, SaveTag, Stamp, TeyLogo, Tick } from '../../explainer/Kit';
import { Big, Chip, Label } from '../../explainer/Blocks';
import { Cta } from '../../explainer/Cta';
import { at as atW, type VO } from '../../explainer/vo';
import { FONT, P } from '../../explainer/tokens';
import { pop, prog } from '../../explainer/anim';
import type { PoseName } from '../../host/Ada';

/**
 * C4: "Vibe coding without the basics is just gambling" (Teyro, product ad, reference-B structure):
 * Editorial slot machine + survey receipts → hard cut to Dark Tech at "Now picture…" → spotting the
 * bug, practice, streak → reveal → features → CTA.
 */
const vo = voData as unknown as VO;
const at = (w: string, n = 1) => atW(vo, w, n);
export const C4_DURATION = Math.ceil((vo.duration + 0.4) * 30);

const T = {
  gambling: at('gambling.'), type: at('type'), regen: at('regenerate,'), again: at('again,'), hope: at('hope'), works: at('works.'),
  devs: at('Developers'), stack: at('Stack'), y2026: at('2026'), half: at('half'), trust: at('trust'), check: at('check'),
  last: at('last'), p45: at('45'), debugging: at('debugging'), longer: at('longer.'),
  now: at('Now'), reading: at('reading'), spotting: at('spotting'), bug: at('bug'), seconds: at('seconds.'),
  know: at('know', 2), every: at('every'), does: at('does,'), practised: at('practised'), yesterday: at('yesterday.'),
  write: at('write'), fix: at('fix'), minutes: at('minutes'), instant: at('instant'), answer: at('answer.', 2),
  and3: at('And', 4), tomorrow: at('tomorrow,'), streak: at('streak'),
  thats: at("That's"), teyro: at('Teyro.'),
  short: at('Short'), path: at('path'), free: at('free'),
  stop: at('Stop'), dice: at('dice.'), go: at('Go'), dot: at('dot'),
};
const DARK = T.now - 0.05;

const POSES: { t: number; p: PoseName }[] = [
  { t: 0, p: 'present' }, { t: T.gambling - 0.1, p: 'shrug' },
  { t: T.regen - 0.1, p: 'pointUpL' }, { t: T.again, p: 'worried' }, { t: T.hope, p: 'think' },
  { t: T.devs, p: 'talk2' }, { t: T.half - 0.05, p: 'open' }, { t: T.check, p: 'thumbsUp' },
  { t: T.p45 - 0.05, p: 'worried' }, { t: T.longer, p: 'sleep' },
  { t: T.now - 0.05, p: 'surprise' }, { t: T.spotting, p: 'pointUpL' }, { t: T.seconds, p: 'fist' },
  { t: T.know, p: 'present' }, { t: T.yesterday, p: 'thumbsUp' },
  { t: T.write - 0.1, p: 'pointUpL' }, { t: T.instant, p: 'cheer' },
  { t: T.tomorrow - 0.1, p: 'talk' }, { t: T.streak, p: 'fist' },
  { t: T.thats - 0.05, p: 'open' }, { t: T.short - 0.05, p: 'count1' }, { t: T.path - 0.1, p: 'count2' }, { t: T.free - 0.1, p: 'count3' },
  { t: T.stop - 0.05, p: 'shrug' }, { t: T.go, p: 'wave' }, { t: T.go + 1.2, p: 'wink' },
];

// ---------- the slot machine ----------
const SYMS = ['BUG', 'WORKS', 'CRASH', '404', 'NaN', 'undefined', '???'];
type Spin = { a: number; stop: number; land: [string, string, string] };
const SPINS: Spin[] = [
  { a: -0.6, stop: T.gambling - 0.35, land: ['BUG', 'WORKS', 'CRASH'] },
  { a: T.regen, stop: T.regen + 0.35, land: ['WORKS', '404', 'BUG'] },
  { a: T.again, stop: T.again + 0.3, land: ['WORKS', 'WORKS', 'NaN'] },
  { a: T.hope, stop: T.works - 0.1, land: ['WORKS', 'WORKS', 'undefined'] },
];

const SFX: Sfx[] = [
  ...[0, 0.18, 0.36].map((d) => ({ t: SPINS[0].stop + d, name: 'tick', vol: 0.3 })), { t: T.gambling, name: 'slam', vol: 0.34 },
  ...SPINS.slice(1).flatMap((s) => [{ t: s.a, name: 'swish', vol: 0.24 }, ...[0, 0.12, 0.24].map((d) => ({ t: s.stop + d, name: 'tick', vol: 0.28 }))]),
  { t: T.works + 0.15, name: 'glitch', vol: 0.22 },
  { t: T.devs, name: 'swish', vol: 0.22 }, { t: T.half, name: 'pop', vol: 0.32 }, { t: T.check, name: 'success', vol: 0.22 },
  { t: T.last - 0.1, name: 'swish', vol: 0.22 }, { t: T.p45, name: 'pop', vol: 0.32 }, { t: T.longer, name: 'slam', vol: 0.3 },
  { t: DARK, name: 'datawhoosh', vol: 0.35 }, { t: T.spotting, name: 'scan', vol: 0.25 }, { t: T.bug, name: 'blip', vol: 0.3 }, { t: T.seconds, name: 'pop2', vol: 0.3 },
  ...[T.every, T.does, T.yesterday].map((t) => ({ t, name: 'pop', vol: 0.22 })),
  { t: T.fix, name: 'typing', vol: 0.18 }, { t: T.instant, name: 'success', vol: 0.28 },
  { t: T.tomorrow, name: 'coin', vol: 0.25 }, { t: T.streak, name: 'notify', vol: 0.28 },
  { t: T.thats, name: 'power', vol: 0.3 }, { t: T.teyro, name: 'shimmer', vol: 0.35 },
  ...[T.short, T.path, T.free].map((t) => ({ t, name: 'pop2', vol: 0.3 })),
  { t: T.stop, name: 'swish', vol: 0.24 }, { t: T.go, name: 'notify', vol: 0.35 },
];

const useT = () => { const frame = useCurrentFrame(); const { fps } = useVideoConfig(); return { frame, fps, t: frame / fps }; };

const Reel: React.FC<{ i: number }> = ({ i }) => {
  const { frame, fps, t } = useT();
  const s = [...SPINS].reverse().find((x) => t >= x.a) ?? SPINS[0];
  const stopAt = s.stop + i * 0.12;
  const cell = 150;
  const spinning = t < stopAt;
  const sym = s.land[i];
  const good = sym === 'WORKS';
  const p = spinning ? 0 : pop(frame, fps, stopAt);
  return (
    <div style={{ width: 196, height: cell, borderRadius: 18, background: '#FFFDF8', border: `4px solid ${P.ink}`, overflow: 'hidden', position: 'relative', boxShadow: 'inset 0 14px 18px rgba(0,0,0,0.12), inset 0 -14px 18px rgba(0,0,0,0.12)' }}>
      {spinning ? (
        <div style={{ position: 'absolute', left: 0, right: 0, top: -(((t - s.a) * 16 + i * 2.3) % SYMS.length) * cell, filter: 'blur(2px)' }}>
          {[...SYMS, ...SYMS].map((x, k) => <div key={k} style={{ height: cell, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: FONT.mono, fontWeight: 800, fontSize: 34, color: P.inkSoft }}>{x}</div>)}
        </div>
      ) : (
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${0.6 + 0.4 * p})`, fontFamily: FONT.mono, fontWeight: 800, fontSize: sym.length > 6 ? 28 : 38, color: good ? P.green : P.red }}>{sym}</div>
      )}
    </div>
  );
};

const SlotMachine: React.FC = () => {
  const { t } = useT();
  const attempt = SPINS.filter((s) => t >= s.a).length;
  const pulls = SPINS.slice(1).map((s) => prog(t, s.a - 0.15, s.a) * (1 - prog(t, s.a + 0.05, s.a + 0.35)));
  const lever = Math.max(0, ...pulls);
  return (
    <Card x={90} y={590} w={780} h={600} inAt={-0.35} outAt={T.devs + 0.05} header="vibe_coding.exe" tag="REGENERATE">
      <div style={{ position: 'absolute', left: 36, top: 92, width: 640, height: 210, borderRadius: 26, background: P.ink, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14 }}>
        {[0, 1, 2].map((i) => <Reel key={i} i={i} />)}
      </div>
      {/* lever */}
      <div style={{ position: 'absolute', left: 700, top: 120, width: 18, height: 170, borderRadius: 9, background: '#B9B4AA', transformOrigin: '50% 100%', transform: `scaleY(${1 - 1.6 * lever})` }} />
      <div style={{ position: 'absolute', left: 683, top: 92 + 160 * lever, width: 52, height: 52, borderRadius: 26, background: P.red, border: `4px solid ${P.ink}` }} />
      <div style={{ position: 'absolute', left: 36, top: 336, right: 36, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Label size={28}>prompt: "make my login work"</Label>
      </div>
      <div style={{ position: 'absolute', left: 36, top: 400, display: 'flex', gap: 16, alignItems: 'center' }}>
        <Chip text={`attempt #${attempt}`} tone="ink" />
        {t >= T.works - 0.1 && <Rise at={T.works}><Chip text="almost right…" tone="red" /></Rise>}
      </div>
      <Stamp text="gambling" at={T.gambling} outAt={T.regen - 0.1} x={190} y={140} size={92} />
    </Card>
  );
};

// ---------- survey receipts ----------
const TrustCard: React.FC = () => {
  const { t } = useT();
  return (
    <Card x={90} y={590} w={900} h={820} inAt={T.devs - 0.35} outAt={T.last} header="stack overflow · developer survey" tag="2026">
      <div style={{ position: 'absolute', left: 60, top: 100, display: 'grid', gridTemplateColumns: 'repeat(10, 64px)', gap: 12 }}>
        {Array.from({ length: 10 }).map((_, i) => {
          const lit = i < 5 && t > T.half + i * 0.06;
          return <svg key={i} width="64" height="84" viewBox="0 0 90 110"><circle cx="45" cy="30" r="24" fill={lit ? P.red : '#C9C5BD'} /><path d="M8 108 Q8 62 45 62 Q82 62 82 108 Z" fill={lit ? P.red : '#C9C5BD'} /></svg>;
        })}
      </div>
      <div style={{ position: 'absolute', left: 60, top: 230 }}><Odometer to={48} a={T.stack} b={T.half + 0.2} size={150} suffix="%" /></div>
      <Rise at={T.trust} style={{ position: 'absolute', left: 60, top: 450, right: 60 }}><Big size={56}>trust AI only when they can</Big></Rise>
      <Rise at={T.check} style={{ position: 'absolute', left: 60, top: 530, display: 'flex', gap: 20, alignItems: 'center' }}>
        <Tick at={T.check} size={70} /><Big size={84} serif color={P.red}>check the answer</Big>
      </Rise>
      <Rise at={T.check + 0.3} style={{ position: 'absolute', left: 60, top: 680 }}><Chip text="only 16% trust it with most tasks" tone="soft" size={26} /></Rise>
    </Card>
  );
};

const DebugCard: React.FC = () => {
  const { t } = useT();
  const errs = ['TypeError: cannot read "price"', 'Error: 401 Unauthorized', 'Warning: each child needs a key', 'TypeError: undefined is not a function'];
  const mins = Math.floor(prog(t, T.debugging, T.longer + 0.4) * 167) + 12;
  return (
    <Card x={90} y={590} w={900} h={820} inAt={T.last - 0.35} outAt={DARK} header="stack overflow · developer survey" tag="2025">
      <div style={{ position: 'absolute', left: 60, top: 96 }}><Odometer to={45} a={T.last} b={T.p45 + 0.3} size={150} suffix="%" /></div>
      <Rise at={T.debugging} style={{ position: 'absolute', left: 60, top: 300, right: 60 }}><Big size={52}>say debugging AI code takes</Big></Rise>
      <Rise at={T.longer} style={{ position: 'absolute', left: 60, top: 365 }}><Big size={90} serif color={P.red}>longer</Big></Rise>
      <div style={{ position: 'absolute', left: 60, right: 60, top: 500, height: 200, borderRadius: 18, background: P.ink, padding: '18px 22px', fontFamily: FONT.mono, fontSize: 22, color: '#FF8A80', lineHeight: 1.6 }}>
        {errs.map((e, i) => t > T.last + i * 0.45 && <div key={i}>{e}</div>)}
      </div>
      <div style={{ position: 'absolute', right: 60, top: 120 }}><Chip text={`debugging ${Math.floor(mins / 60)}h ${String(mins % 60).padStart(2, '0')}m`} tone="red" /></div>
    </Card>
  );
};

// ---------- Dark Tech (outcomes) ----------
const DarkCard: React.FC<{ inAt: number; outAt: number; header: string; children: React.ReactNode }> = ({ inAt, outAt, header, children }) => (
  <Card x={90} y={590} w={900} h={860} inAt={inAt} outAt={outAt} header={header} dark>{children}</Card>
);

const CODE = ['function total(items) {', '  let sum = 0;', '  for (let i = 0; i <= items.length; i++) {', '    sum += items[i].price;', '  }', '  return sum;', '}'];
const CodeBlock: React.FC<{ lines: string[]; bugLine?: number; bugOn?: boolean; scanA?: number; scanB?: number; fixed?: boolean }> = ({ lines, bugLine = -1, bugOn, scanA, scanB, fixed }) => {
  const { t } = useT();
  const scan = scanA !== undefined && scanB !== undefined && t > scanA && t < scanB + 0.3 ? prog(t, scanA, scanB) : -1;
  return (
    <div style={{ position: 'relative', background: '#0B0D18', borderRadius: 20, padding: '22px 26px', fontFamily: FONT.mono, fontSize: 27, lineHeight: 1.7, color: '#E6E6E6', whiteSpace: 'pre', fontVariantLigatures: 'none', border: '1.5px solid rgba(255,255,255,0.1)' }}>
      {scan >= 0 && <div style={{ position: 'absolute', left: 0, right: 0, top: 22 + scan * (lines.length - 1) * 46, height: 46, background: `${P.blue}33`, borderTop: `2px solid ${P.blue}` }} />}
      {lines.map((l, i) => {
        const bad = i === bugLine && bugOn;
        const shown = i === bugLine && fixed ? l.replace('<=', '<') : l;
        return <div key={i} style={{ position: 'relative', background: bad ? 'rgba(254,73,26,0.25)' : fixed && i === bugLine ? 'rgba(124,227,139,0.18)' : undefined, borderRadius: 8, color: bad ? '#FFB4A3' : fixed && i === bugLine ? '#7CE38B' : undefined }}>{shown}</div>;
      })}
    </div>
  );
};

const SpotBug: React.FC = () => {
  const { t } = useT();
  const secs = Math.min(3, Math.floor(prog(t, T.spotting, T.seconds) * 3) + (t > T.spotting ? 1 : 0));
  return (
    <DarkCard inAt={T.now - 0.2} outAt={T.know - 0.05} header="ai_wrote_this.js">
      <div style={{ position: 'absolute', left: 40, right: 40, top: 90 }}>
        <CodeBlock lines={CODE} bugLine={2} bugOn={t >= T.bug} scanA={T.spotting} scanB={T.bug} />
      </div>
      <Rise at={T.bug} style={{ position: 'absolute', left: 40, top: 520, display: 'flex', gap: 16 }}>
        <Chip text={<span style={{ fontVariantLigatures: 'none' }}>{'bug: <= runs one step too far'}</span>} tone="red" size={28} />
      </Rise>
      <Rise at={T.seconds} style={{ position: 'absolute', left: 40, top: 620, display: 'flex', alignItems: 'center', gap: 20 }}>
        <Big size={110} color={P.blue}>0:0{Math.max(1, secs)}</Big><Label size={30} color="rgba(255,255,255,0.7)">to spot it</Label>
      </Rise>
    </DarkCard>
  );
};

const KnowLines: React.FC = () => {
  const notes: [string, string, number][] = [
    ['let sum = 0;', 'start at zero', T.every],
    ['for (… i < items.length …)', 'go through each item', T.every + 0.35],
    ['sum += items[i].price;', 'add up each price', T.does - 0.1],
    ['return sum;', 'give back the total', T.does + 0.2],
  ];
  return (
    <DarkCard inAt={T.know - 0.35} outAt={T.write - 0.1} header="you · reading AI code">
      <div style={{ position: 'absolute', left: 40, right: 40, top: 96, display: 'flex', flexDirection: 'column', gap: 16 }}>
        <Rise at={T.know}><Label size={26} color="rgba(255,255,255,0.6)">every line, in plain words:</Label></Rise>
        {notes.map(([code, note, a], i) => (
          <Rise key={i} at={a}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 18, background: 'rgba(255,255,255,0.06)', borderRadius: 18, padding: '16px 20px' }}>
              <Tick at={a + 0.15} size={44} />
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: FONT.mono, fontSize: 25, color: '#E6E6E6' }}>{code}</div>
                <div style={{ fontFamily: FONT.sans, fontSize: 30, color: P.blue, fontWeight: 700 }}>{note}</div>
              </div>
            </div>
          </Rise>
        ))}
      </div>
      <Rise at={T.yesterday} style={{ position: 'absolute', left: 40, top: 700 }}><Chip text="practised yesterday: loops" tone="blue" /></Rise>
    </DarkCard>
  );
};

const Practice: React.FC = () => {
  const { t } = useT();
  const picked = t >= T.instant;
  return (
    <DarkCard inAt={T.write - 0.35} outAt={T.and3 - 0.05} header="today's lesson · apply">
      <div style={{ position: 'absolute', left: 40, right: 40, top: 90 }}>
        <div style={{ display: 'inline-block', background: '#FFE1DE', color: P.red, borderRadius: 999, padding: '6px 18px', fontFamily: FONT.mono, fontWeight: 700, fontSize: 22, marginBottom: 14 }}>FIX THE BUG</div>
        <CodeBlock lines={['for (let i = 0; i <= list.length; i++) {', '  total += list[i];', '}']} bugLine={0} bugOn={t >= T.fix && !picked} fixed={picked} />
      </div>
      <div style={{ position: 'absolute', left: 40, right: 40, top: 400, display: 'flex', flexDirection: 'column', gap: 14 }}>
        {['change <= to <', 'add 1 to total', 'delete the loop'].map((o, i) => {
          const ok = picked && i === 0;
          return (
            <Rise key={i} at={T.fix + i * 0.1}>
              <div style={{ border: `3px solid ${ok ? '#58CC02' : 'rgba(255,255,255,0.18)'}`, background: ok ? 'rgba(88,204,2,0.18)' : 'rgba(255,255,255,0.05)', borderRadius: 18, padding: '16px 22px', fontFamily: FONT.mono, fontSize: 28, color: '#fff', fontVariantLigatures: 'none' }}>{o}</div>
            </Rise>
          );
        })}
      </div>
      <Rise at={T.minutes} style={{ position: 'absolute', right: 40, top: 90 }}><Chip text="5 min a day" tone="blue" size={26} /></Rise>
      {picked && (
        <Rise at={T.instant} style={{ position: 'absolute', left: 0, right: 0, bottom: 0 }}>
          <div style={{ background: '#D7FFB8', color: '#58A700', padding: '30px 40px 40px', fontFamily: FONT.sans, fontWeight: 700, fontSize: 40, display: 'flex', gap: 30 }}>Nice! That's right.<span>+10 XP</span></div>
        </Rise>
      )}
    </DarkCard>
  );
};

const StreakTomorrow: React.FC = () => {
  const { t } = useT();
  const n = t >= T.tomorrow + 0.2 ? 32 : 31;
  return (
    <DarkCard inAt={T.and3 - 0.3} outAt={T.thats} header="streak">
      <Rise at={T.and3} style={{ position: 'absolute', left: 0, right: 0, top: 110, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 24 }}>
        <Img src={staticFile('art/burn.png')} style={{ width: 220, height: 220, objectFit: 'contain' }} /><Big size={190} color="#FF9600">{n}</Big>
      </Rise>
      <Rise at={T.tomorrow} style={{ position: 'absolute', left: 0, right: 0, top: 380, display: 'flex', justifyContent: 'center' }}><Chip text="day streak · back tomorrow" tone="blue" /></Rise>
      <Rise at={T.streak} style={{ position: 'absolute', left: 60, right: 60, top: 500 }}>
        <div style={{ background: 'rgba(255,255,255,0.08)', borderRadius: 22, padding: '24px 30px', fontFamily: FONT.sans, fontSize: 40, color: '#fff' }}>Keep your 32-day streak alive!<br /><span style={{ color: 'rgba(255,255,255,0.6)', fontSize: 32 }}>One quick lesson is all it takes.</span></div>
      </Rise>
    </DarkCard>
  );
};

const Reveal: React.FC = () => {
  const { frame, fps, t } = useT();
  const p = pop(frame, fps, T.thats);
  const o = prog(t, T.short - 0.3, T.short);
  if (t < T.thats - 0.1 || o >= 1) return null;
  return (
    <div style={{ position: 'absolute', left: 0, right: 0, top: 640, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 30, opacity: 1 - o }}>
      <div style={{ position: 'absolute', top: 40, width: 640, height: 640, borderRadius: 320, background: `radial-gradient(circle, ${P.blue}88, ${P.pinkGlow}33 50%, transparent 70%)`, transform: `scale(${p * 1.2})` }} />
      <div style={{ transform: `scale(${p})` }}><TeyLogo size={300} /></div>
    </div>
  );
};

const Features: React.FC = () => (
  <div style={{ position: 'absolute', left: 90, right: 90, top: 640, display: 'flex', flexDirection: 'column', gap: 26 }}>
    {([['short daily lessons', T.short], ['a path for your goal', T.path], ['free to start', T.free]] as const).map(([x, a], i) => (
      <Rise key={i} at={a - 0.05}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 24, background: 'rgba(255,255,255,0.07)', border: '2px solid rgba(255,255,255,0.12)', borderRadius: 26, padding: '30px 34px', fontFamily: FONT.sans, fontWeight: 700, fontSize: 52, color: '#fff' }}>
          <span style={{ width: 66, height: 66, borderRadius: 18, background: P.blue, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: FONT.mono, fontSize: 34 }}>{i + 1}</span>{x}
        </div>
      </Rise>
    ))}
  </div>
);

export const C4: React.FC = () => {
  const { t } = useT();
  return (
    <Stage slug="c4-vibe-gambling" vo={vo} poses={POSES} sfx={SFX} darkFrom={DARK}
      modes={[{ t: 0, mode: 'hook' }, { t: T.type - 0.1, mode: 'items' }, { t: DARK, mode: 'dark' }, { t: T.thats - 0.1, mode: 'act' }, { t: T.short - 0.1, mode: 'dark' }, { t: T.stop - 0.1, mode: 'act' }]}>
      {t < DARK ? (
        <TopBar chapters={[{ t: 0, label: '// 01 — vibe coding' }, { t: T.devs, label: '// 02 — what devs say' }]} counter={{ label: 'REGENERATES', total: 3, ticks: [T.regen, T.again, T.hope] }} />
      ) : (
        <TopBar dark chapters={[{ t: DARK, label: '// 03 — picture this' }, { t: T.thats, label: '// 04 — meet teyro' }, { t: T.stop, label: '// 05 — get started' }]}
          counter={{ label: 'NO MORE GUESSING', total: 3, ticks: [T.does, T.instant, T.streak] }} />
      )}
      <Headline vo={vo} to={DARK} />
      <Headline vo={vo} from={DARK} dark />
      <SlotMachine />
      <TrustCard />
      <DebugCard />
      {t >= DARK && (
        <>
          <SpotBug />
          <KnowLines />
          <Practice />
          <StreakTomorrow />
          <Reveal />
          {t < T.stop - 0.1 && <Features />}
          <SaveTag at={T.short} outAt={T.stop - 0.1} x={700} y={175} />
          <Cta from={T.stop} screen="bug" solveAt={T.go + 0.6} chip={{ at: at('teyro', 2), text: 'teyro.app' }} logoAt={T.dot + 0.2} dark />
        </>
      )}
    </Stage>
  );
};
