import React from 'react';
import { useCurrentFrame, useVideoConfig } from 'remotion';
import voData from './vo.json';
import { Stage, type Sfx } from '../../explainer/Stage';
import { Headline } from '../../explainer/Headline';
import { TopBar } from '../../explainer/TopBar';
import { Card, Rise, SaveTag, Stamp, Tick } from '../../explainer/Kit';
import { Chip } from '../../explainer/Blocks';
import { Cta } from '../../explainer/Cta';
import { at as atW, type VO } from '../../explainer/vo';
import { FONT, P } from '../../explainer/tokens';
import { lerp, pop, prog, spr } from '../../explainer/anim';
import type { PoseName } from '../../host/Ada';

/**
 * C13: "Behind the tap #2: tap to pay" (Teyro, Coding pillar, value list with 6 stops, Editorial Paper).
 * Script + sources: ./script.json. Card/token numbers on screen are illustrative, never real.
 */
const vo = voData as unknown as VO;
const at = (w: string, n = 1) => atW(vo, w, n);
export const C13_DURATION = Math.ceil((vo.duration + 0.4) * 30);

// ---- cue times -------------------------------------------------------------
const S = [1, 2, 3, 4, 5, 6].map((n) => at('Stop', n));
const T = {
  six: at('Six'), two: at('Two'), zero: at('zero'), moved: at('moved.'),
  face: at('Face'), separate: at('separate'), vault: at('vault'), cant: at("can't"),
  vault2: at('vault', 2), not: at('Not'), standin: at('stand-in'), signs: at('signs'), purchase: at('purchase,'), copy: at('copy'), dead: at('dead.'),
  nfc: at('NFC'), four: at('four'), touch: at('touch'),
  reads: at('reads'), first: at('first'), sees: at('sees'), passes: at('passes'),
  swaps: at('swaps'), real: at('real'), ai: at('AI'), n500: at('500'), signals: at('signals'), ms: at('millisecond.'),
  fraud: at('fraud'), balance: at('balance,'), yes: at('yes.'), beep: at('Beep.'), coffee: at("Coffee's"),
  but: at('But', 2), moved2: at('moved', 2), promise: at('promise.'), later: at('later,'), batch: at('batch'), settlement: at('settlement.'),
  rest_: at('rest'), stop6_: at('Stop', 6), checks_: at('checks'),
  want: at('Want'), lesson: at('lesson'), head: at('Head'), teyro: at('Teyro.'),
};
const BEEP_REAL = 1.9; // ≈ real-world seconds from tap to beep (shown as approximate)

const POSES: { t: number; p: PoseName }[] = [
  { t: 0, p: 'present' }, { t: T.six - 0.05, p: 'count1' }, { t: T.two - 0.05, p: 'count2' }, { t: T.zero - 0.05, p: 'surprise' },
  { t: S[0] - 0.05, p: 'count1' }, { t: T.face, p: 'pointUpL' }, { t: T.vault, p: 'present' }, { t: T.cant, p: 'shrug' },
  { t: S[1] - 0.05, p: 'count2' }, { t: T.not, p: 'think' }, { t: T.standin, p: 'pointUpL' }, { t: T.copy, p: 'talk2' }, { t: T.dead - 0.05, p: 'fist' },
  { t: S[2] - 0.05, p: 'count3' }, { t: T.four - 0.05, p: 'pointUpL' }, { t: T.touch, p: 'thumbsUp' },
  { t: S[3] - 0.05, p: 'count4' }, { t: T.first, p: 'pointUpL' }, { t: T.passes, p: 'present' },
  { t: S[4] - 0.05, p: 'open' }, { t: T.swaps, p: 'pointUpL' }, { t: T.n500 - 0.05, p: 'surprise' }, { t: T.ms, p: 'fist' },
  { t: S[5] - 0.05, p: 'present' }, { t: T.fraud, p: 'think' }, { t: T.yes - 0.05, p: 'thumbsUp' }, { t: T.beep, p: 'cheer' },
  { t: T.but - 0.05, p: 'surprise' }, { t: T.promise, p: 'wink' }, { t: T.later, p: 'pointUpL' }, { t: T.batch, p: 'sleep' },
  { t: T.want - 0.05, p: 'present' }, { t: T.lesson - 0.1, p: 'count1' }, { t: T.head, p: 'pointUpL' }, { t: T.teyro - 0.05, p: 'wink' },
];

const SFX: Sfx[] = [
  { t: 0.05, name: 'blip', vol: 0.3 }, ...[T.six, T.two, T.zero].map((t) => ({ t, name: 'pop', vol: 0.32 })),
  ...S.flatMap((t) => [{ t, name: 'whoosh', vol: 0.16 }, { t: t + 0.2, name: 'pop', vol: 0.32 }]),
  { t: T.face, name: 'blip', vol: 0.25 }, { t: T.face + 0.45, name: 'success', vol: 0.22 }, { t: T.vault, name: 'power', vol: 0.2 }, { t: T.cant, name: 'pop2', vol: 0.25 },
  { t: T.not, name: 'slam', vol: 0.3 }, { t: T.standin, name: 'shimmer', vol: 0.2 }, { t: T.signs, name: 'swish', vol: 0.22 }, { t: T.dead, name: 'slam', vol: 0.38 },
  { t: T.nfc, name: 'power', vol: 0.18 }, ...[0, 0.1, 0.2, 0.3].map((d) => ({ t: T.four + d, name: 'tick', vol: 0.13 })), { t: T.touch, name: 'blip', vol: 0.3 },
  { t: T.first, name: 'pop2', vol: 0.22 }, { t: T.sees, name: 'pop2', vol: 0.25 }, { t: T.passes, name: 'swish', vol: 0.22 },
  { t: T.swaps, name: 'swish', vol: 0.25 }, ...Array.from({ length: 8 }, (_, i) => ({ t: T.checks_ + i * 0.07, name: 'tick', vol: 0.11 })), { t: T.ms, name: 'pop', vol: 0.3 },
  { t: T.fraud, name: 'blip', vol: 0.25 }, { t: T.balance, name: 'blip', vol: 0.25 }, { t: T.yes, name: 'success', vol: 0.32 }, { t: T.beep, name: 'notify', vol: 0.45 },
  { t: T.but, name: 'slam', vol: 0.3 }, { t: T.promise, name: 'shimmer', vol: 0.22 }, { t: T.batch, name: 'whoosh', vol: 0.22 },
  { t: T.want, name: 'whoosh', vol: 0.22 }, { t: T.head, name: 'notify', vol: 0.35 }, { t: T.teyro, name: 'shimmer', vol: 0.3 },
];

const useT = () => { const frame = useCurrentFrame(); const { fps } = useVideoConfig(); return { frame, fps, t: frame / fps }; };

// ---- shared art --------------------------------------------------------------
const Phone: React.FC<{ w?: number; children?: React.ReactNode; style?: React.CSSProperties }> = ({ w = 240, children, style }) => (
  <div style={{ position: 'relative', width: w, height: w * 2, borderRadius: w * 0.17, background: P.ink, padding: w * 0.05, boxSizing: 'border-box', ...style }}>
    <div style={{ position: 'relative', width: '100%', height: '100%', borderRadius: w * 0.13, background: '#F7F6F3', overflow: 'hidden' }}>{children}</div>
  </div>
);
const Reader: React.FC<{ ok?: boolean; w?: number }> = ({ ok, w = 230 }) => (
  <div style={{ width: w, height: w * 1.25, borderRadius: 22, background: '#2A2D36', padding: 16, boxSizing: 'border-box', boxShadow: `0 8px 0 ${P.ink}` }}>
    <div style={{ height: '46%', borderRadius: 12, background: ok ? P.green : '#3E7CB1', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontFamily: FONT.mono, fontWeight: 700, fontSize: w * 0.11 }}>{ok ? '✓ APPROVED' : '$4.50'}</div>
    <svg width="100%" height="48%" viewBox="0 0 100 60"><g fill="none" stroke="#9AA0AD" strokeWidth="4" strokeLinecap="round"><path d="M40 40 Q46 30 40 20" /><path d="M50 46 Q60 30 50 14" /><path d="M60 52 Q74 30 60 8" /></g></svg>
  </div>
);
const Num: React.FC<{ text: string; color?: string; size?: number; strike?: boolean }> = ({ text, color = P.ink, size = 40, strike }) => (
  <div style={{ fontFamily: FONT.mono, fontWeight: 700, fontSize: size, color, letterSpacing: 2, textDecoration: strike ? `line-through ${P.red} 5px` : 'none' }}>{text}</div>
);
const CARD = '1234 5678 9012 3456';
const TOKEN = '4895 3307 6621 0478';

// ---- route widget (progress meter, bottom-left) ------------------------------
const STOPS = ['PHONE', 'VAULT', 'READER', 'SHOP BANK', 'VISA', 'YOUR BANK'];
const Route: React.FC = () => {
  const { frame, fps, t } = useT();
  const appear = spr(frame, fps, S[0] - 0.2, { damping: 14, stiffness: 150 });
  const hide = prog(t, T.want - 0.1, T.want + 0.3);
  const n = S.filter((s) => t >= s + 0.2).length;
  // the payment dot travels stop to stop; it comes home on the beep
  const seg = t >= T.beep ? 0 : Math.max(0, n - 1);
  const x0 = 40, gap = 118;
  const real = t < S[0] ? 0 : t >= T.beep ? BEEP_REAL : BEEP_REAL * prog(t, S[0], T.beep, (x) => x);
  if (appear <= 0) return null;
  return (
    <div style={{ position: 'absolute', left: 50, top: 1500, width: 730, height: 220, opacity: appear * (1 - hide), transform: `translateY(${(1 - appear) * 40}px)` }}>
      <div style={{ position: 'absolute', inset: 0, borderRadius: 28, background: P.card, border: `4px solid ${P.ink}`, boxShadow: `0 8px 0 ${P.ink}` }} />
      <div style={{ position: 'absolute', left: 28, top: 18, right: 28, display: 'flex', justifyContent: 'space-between', fontFamily: FONT.mono, fontSize: 21, color: P.ink }}>
        <span>ROUTE · stop <b style={{ color: n ? P.red : P.inkSoft }}>{n}</b>/6</span>
        <span>real time ≈ <b style={{ color: P.red }}>{real.toFixed(2)}s</b></span>
      </div>
      <div style={{ position: 'absolute', left: x0 + 22, top: 92, width: gap * 5, height: 6, background: P.line, borderRadius: 3 }} />
      <div style={{ position: 'absolute', left: x0 + 22, top: 92, width: gap * Math.max(0, n - 1), height: 6, background: P.red, borderRadius: 3 }} />
      {STOPS.map((s, i) => {
        const lit = i < n;
        return (
          <div key={s} style={{ position: 'absolute', left: x0 + i * gap, top: 74, width: 44, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ width: 44, height: 44, borderRadius: 22, background: lit ? P.red : '#F3F1ED', border: `4px solid ${P.ink}`, transform: `scale(${lit ? 0.85 + 0.15 * pop(frame, fps, S[i] + 0.2) : 1})`, color: '#fff', fontFamily: FONT.mono, fontWeight: 700, fontSize: 20, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{i + 1}</div>
            <div style={{ marginTop: 10, fontFamily: FONT.mono, fontSize: 15, color: lit ? P.ink : P.inkSoft, whiteSpace: 'nowrap' }}>{s}</div>
          </div>
        );
      })}
      {n > 0 && <div style={{ position: 'absolute', left: x0 + 22 + seg * gap - 12, top: 83, width: 24, height: 24, borderRadius: 12, background: '#F5B400', border: `3px solid ${P.ink}`, transition: 'none' }} />}
    </div>
  );
};

// ---- scenes ------------------------------------------------------------------
const Hook: React.FC = () => {
  const { frame, fps, t } = useT();
  const tap = spr(frame, fps, 0.15, { damping: 12, stiffness: 140 });
  const stats: [string, string, number][] = [['1', 'coffee', 0.12], ['6', 'stops', T.six], ['2s', 'seconds', T.two], ['$0', 'moved', T.zero]];
  return (
    <Card x={90} y={600} w={900} h={640} inAt={0} outAt={S[0] + 0.05} header="behind the tap" tag="#2">
      <div style={{ position: 'absolute', left: 60, top: 90, display: 'flex', alignItems: 'flex-end', gap: 20 }}>
        <Phone w={150} style={{ transform: `translateX(${lerp(-60, 70, tap)}px) rotate(${lerp(-20, -6, tap)}deg)` }}>
          <div style={{ position: 'absolute', left: 12, right: 12, top: 60, height: 80, borderRadius: 12, background: 'linear-gradient(135deg,#2B2F3A,#4A4F5E)' }} />
          <div style={{ position: 'absolute', left: 0, right: 0, top: 160, textAlign: 'center', fontFamily: FONT.mono, fontSize: 14, color: P.inkSoft }}>hold near reader</div>
        </Phone>
        <Reader ok={t >= T.zero} w={200} />
      </div>
      <div style={{ position: 'absolute', left: 540, top: 90, display: 'flex', flexDirection: 'column', gap: 12 }}>
        {stats.map(([v, l, a], i) => (
          <div key={l} style={{ display: 'flex', alignItems: 'baseline', gap: 14, transform: `scale(${pop(frame, fps, a)})`, transformOrigin: 'left center' }}>
            <span style={{ fontFamily: FONT.black, fontWeight: 800, fontSize: 76, color: i === 3 ? P.red : P.ink, lineHeight: 1 }}>{v}</span>
            <span style={{ fontFamily: FONT.mono, fontSize: 26, color: P.inkSoft }}>{l}</span>
          </div>
        ))}
      </div>
    </Card>
  );
};

/** Stop 1: Face ID unlocks the secure element. */
const Stop1: React.FC = () => {
  const { frame, fps, t } = useT();
  const scan = prog(t, T.face - 0.1, T.face + 0.45);
  const ok = t >= T.face + 0.45;
  const chip = pop(frame, fps, T.separate - 0.05);
  return (
    <Card x={90} y={600} w={900} h={820} inAt={S[0] - 0.35} outAt={S[1] + 0.05} header="stop 1 · your phone">
      <div style={{ position: 'absolute', left: 70, top: 100 }}>
        <Phone w={300}>
          <svg width="160" height="160" viewBox="0 0 160 160" style={{ position: 'absolute', left: 50, top: 60 }}>
            <g stroke={ok ? P.green : P.ink} strokeWidth="8" fill="none" strokeLinecap="round"><path d="M10 40 V10 H40" /><path d="M120 10 H150 V40" /><path d="M150 120 V150 H120" /><path d="M40 150 H10 V120" /></g>
            {ok ? <path d="M50 82 L72 104 L112 60" stroke={P.green} strokeWidth="10" fill="none" strokeLinecap="round" strokeLinejoin="round" /> : <rect x="20" y={20 + 120 * scan} width="120" height="5" fill={P.red} opacity={scan > 0 && scan < 1 ? 1 : 0} />}
          </svg>
          <div style={{ position: 'absolute', left: 0, right: 0, top: 240, textAlign: 'center', fontFamily: FONT.sans, fontWeight: 700, fontSize: 26, color: ok ? P.green : P.ink }}>{ok ? 'Face ID ✓' : 'Face ID'}</div>
          {chip > 0 && (
            <div style={{ position: 'absolute', left: 60, top: 330, width: 150, height: 150, transform: `scale(${chip})`, borderRadius: 18, background: P.ink, border: `4px solid ${P.red}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
              <svg width="54" height="64" viewBox="0 0 120 140"><path d="M28 60 V40 A32 32 0 0 1 92 40 V60" stroke="#fff" strokeWidth="12" fill="none" /><rect x="14" y="60" width="92" height="74" rx="14" fill={P.red} /></svg>
              <div style={{ fontFamily: FONT.mono, fontSize: 16, color: '#fff' }}>secure element</div>
            </div>
          )}
        </Phone>
      </div>
      <div style={{ position: 'absolute', left: 440, right: 50, top: 150, display: 'flex', flexDirection: 'column', gap: 18 }}>
        <Rise at={T.vault - 0.1}><div style={{ fontFamily: FONT.serif, fontStyle: 'italic', fontSize: 86, color: P.red, lineHeight: 1 }}>a vault</div></Rise>
        {['apps', 'iOS', 'the internet'].map((s, i) => (
          <Rise key={s} at={T.rest_ + i * 0.12}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, fontFamily: FONT.mono, fontSize: 30, color: P.ink }}>
              <span style={{ width: 200 }}>{s}</span>
              <span style={{ fontFamily: FONT.black, fontWeight: 800, fontSize: 40, color: P.red, transform: `scale(${pop(frame, fps, T.cant + i * 0.08)})` }}>✕</span>
            </div>
          </Rise>
        ))}
        <Rise at={T.cant + 0.2}><div style={{ fontFamily: FONT.mono, fontSize: 24, color: P.inkSoft }}>can't read what's inside</div></Rise>
      </div>
    </Card>
  );
};

/** Stop 2: not your card number: a token; the chip signs this one purchase. */
const Stop2: React.FC = () => {
  const { frame, fps, t } = useT();
  const signed = t >= T.signs;
  return (
    <Card x={90} y={600} w={900} h={820} inAt={S[1] - 0.35} outAt={S[2] + 0.05} header="stop 2 · inside the vault" tag="TOKEN">
      <div style={{ position: 'absolute', left: 50, right: 50, top: 90 }}>
        <div style={{ fontFamily: FONT.mono, fontSize: 22, color: P.inkSoft }}>your card number</div>
        <Num text={CARD} size={46} strike={t >= T.not} />
        <Rise at={T.standin - 0.1} style={{ marginTop: 24 }}>
          <div style={{ borderRadius: 18, border: `3px solid ${P.ink}`, background: '#FAF8F5', padding: '16px 22px' }}>
            <div style={{ fontFamily: FONT.mono, fontSize: 22, color: P.red }}>stand-in (token) · works on this phone only</div>
            <Num text={TOKEN} size={46} color={P.red} />
          </div>
        </Rise>
        {signed && (
          <Rise at={T.signs} style={{ marginTop: 26 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
              {[['token', '…0478'], ['amount', '$4.50'], ['tap #', '217']].map(([k, v], i) => (
                <div key={k} style={{ borderRadius: 14, background: P.ink, color: '#fff', padding: '8px 14px', fontFamily: FONT.mono, fontSize: 21, transform: `scale(${pop(frame, fps, T.signs + i * 0.1)})` }}>{k}: <b>{v}</b></div>
              ))}
              <span style={{ fontFamily: FONT.black, fontWeight: 800, fontSize: 40 }}>→</span>
              <div style={{ borderRadius: 14, background: P.red, color: '#fff', padding: '8px 14px', fontFamily: FONT.mono, fontWeight: 700, fontSize: 21, transform: `scale(${pop(frame, fps, T.purchase)})` }}>signed: 9F27·A3C1…</div>
            </div>
          </Rise>
        )}
        {t >= T.copy - 0.1 && (
          <div style={{ marginTop: 30, position: 'relative', borderRadius: 14, border: `3px dashed ${P.inkSoft}`, padding: '12px 18px', fontFamily: FONT.mono, fontSize: 24, color: P.inkSoft, opacity: 0.8, transform: `scale(${pop(frame, fps, T.copy - 0.1)})`, transformOrigin: 'left center' }}>
            copy · replayed: 9F27·A3C1… (tap #217 again)
          </div>
        )}
      </div>
      <Stamp text="dead" at={T.dead} x={560} y={600} size={64} rotate={-10} />
    </Card>
  );
};

/** Stop 3: NFC reaches ~4 cm. */
const Stop3: React.FC = () => {
  const { frame, fps, t } = useT();
  const close = spr(frame, fps, T.touch - 0.15, { damping: 14, stiffness: 160 });
  const ruler = prog(t, T.four - 0.15, T.four + 0.4);
  return (
    <Card x={90} y={600} w={900} h={820} inAt={S[2] - 0.35} outAt={S[3] + 0.05} header="stop 3 · the reader" tag="NFC">
      <div style={{ position: 'absolute', left: 80, top: 140, transform: `translateX(${lerp(0, 130, close)}px)` }}><Phone w={190} /></div>
      <div style={{ position: 'absolute', left: 560, top: 180 }}><Reader w={240} /></div>
      <svg width="900" height="820" style={{ position: 'absolute', left: 0, top: 0 }}>
        {[0, 1, 2].map((i) => {
          const k = ((t - T.nfc) * 1.6 + i / 3) % 1;
          return t >= T.nfc - 0.1 ? <circle key={i} cx={560} cy={330} r={30 + k * 170} fill="none" stroke={P.red} strokeWidth="5" opacity={(1 - k) * 0.8} /> : null;
        })}
      </svg>
      <div style={{ position: 'absolute', left: 300, top: 600, width: 260 * ruler, height: 40, borderBottom: `5px solid ${P.ink}`, display: 'flex', alignItems: 'flex-end' }}>
        {Array.from({ length: 9 }).map((_, i) => <div key={i} style={{ position: 'absolute', left: i * 32, bottom: 0, width: 3, height: i % 2 ? 14 : 26, background: P.ink, opacity: ruler }} />)}
      </div>
      <Rise at={T.four} style={{ position: 'absolute', left: 300, top: 660 }}><div style={{ fontFamily: FONT.black, fontWeight: 800, fontSize: 72, color: P.red }}>≈ 4 cm</div></Rise>
    </Card>
  );
};

/** Stop 4: the shop's bank reads the first digits → Visa → forward. */
const Stop4: React.FC = () => {
  const { frame, fps, t } = useT();
  const fwd = prog(t, T.passes - 0.05, T.passes + 0.4);
  return (
    <Card x={90} y={600} w={900} h={820} inAt={S[3] - 0.35} outAt={S[4] + 0.05} header="stop 4 · the shop's bank">
      <div style={{ position: 'absolute', left: 50, right: 50, top: 110 }}>
        <div style={{ fontFamily: FONT.mono, fontSize: 24, color: P.inkSoft, marginBottom: 10 }}>it receives the stand-in:</div>
        <div style={{ display: 'flex', fontFamily: FONT.mono, fontWeight: 700, fontSize: 52, letterSpacing: 2 }}>
          <span style={{ background: t >= T.first ? 'rgba(224,53,43,0.18)' : 'transparent', color: t >= T.first ? P.red : P.ink, borderRadius: 8, padding: '0 6px' }}>4895 33</span>
          <span style={{ color: P.ink }}>07 6621 0478</span>
        </div>
        <Rise at={T.first + 0.2}><div style={{ fontFamily: FONT.mono, fontSize: 24, color: P.inkSoft, marginTop: 12 }}>first digits = which network</div></Rise>
        <div style={{ display: 'flex', alignItems: 'center', gap: 30, marginTop: 50 }}>
          <div style={{ transform: `scale(${pop(frame, fps, T.sees)})`, borderRadius: 18, background: P.ink, color: '#fff', padding: '16px 30px', fontFamily: FONT.mono, fontWeight: 700, fontSize: 48 }}>→ Visa network</div>
          <svg width="300" height="60" viewBox="0 0 300 60" style={{ opacity: fwd }}><path d={`M10 30 H${10 + 260 * fwd}`} stroke={P.red} strokeWidth="10" strokeLinecap="round" /><path d={`M${240 * fwd + 10} 10 L${270 * fwd + 10} 30 L${240 * fwd + 10} 50`} stroke={P.red} strokeWidth="10" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </div>
        <Rise at={T.passes + 0.4}><div style={{ marginTop: 40, fontFamily: FONT.serif, fontStyle: 'italic', fontSize: 52, color: P.ink }}>No idea it's a stand-in.</div></Rise>
      </div>
    </Card>
  );
};

/** Stop 5: Visa swaps the token back; AI checks 500+ signals in ~1 ms. */
const Stop5: React.FC = () => {
  const { t } = useT();
  const swap = prog(t, T.swaps - 0.05, T.real + 0.3);
  const fill = prog(t, T.checks_ - 0.1, T.signals + 0.3);
  const labels = ['where you are', 'time of day', 'shopped here before?', 'tap or online', 'amount'];
  return (
    <Card x={90} y={600} w={900} h={820} inAt={S[4] - 0.35} outAt={S[5] + 0.05} header="stop 5 · visa" tag="AI CHECK">
      <div style={{ position: 'absolute', left: 50, right: 50, top: 90, height: 70, overflow: 'hidden' }}>
        <div style={{ transform: `translateY(${-70 * swap}px)` }}>
          <div style={{ height: 70, display: 'flex', alignItems: 'center' }}><Num text={TOKEN} size={44} color={P.red} /></div>
          <div style={{ height: 70, display: 'flex', alignItems: 'center' }}><Num text={CARD} size={44} /></div>
        </div>
      </div>
      <Rise at={T.real} style={{ position: 'absolute', left: 50, top: 168 }}><Chip text="stand-in → your real number" tone="soft" size={22} /></Rise>
      <div style={{ position: 'absolute', left: 50, top: 250, display: 'grid', gridTemplateColumns: 'repeat(25, 22px)', gap: 5, opacity: prog(t, T.ai - 0.2, T.ai) }}>
        {Array.from({ length: 125 }).map((_, i) => <div key={i} style={{ width: 22, height: 22, borderRadius: 5, background: fill * 125 > i ? (i % 17 === 3 ? P.red : '#3D5AFE') : '#E7E3DC' }} />)}
      </div>
      <div style={{ position: 'absolute', left: 50, top: 400, fontFamily: FONT.mono, fontSize: 20, color: P.inkSoft, opacity: fill }}>500+ signals, e.g.</div>
      <div style={{ position: 'absolute', left: 50, right: 50, top: 436, display: 'flex', flexWrap: 'wrap', gap: 10 }}>
        {labels.map((l, i) => <Rise key={l} at={T.n500 + i * 0.12}><Chip text={l} tone="soft" size={22} /></Rise>)}
      </div>
      <div style={{ position: 'absolute', left: 50, right: 50, top: 600, display: 'flex', alignItems: 'center', gap: 30 }}>
        <Rise at={T.ms - 0.1}><div style={{ fontFamily: FONT.black, fontWeight: 800, fontSize: 96, color: P.red, lineHeight: 1 }}>≈1 ms</div></Rise>
        <Rise at={T.ms + 0.2}><div style={{ borderRadius: 16, border: `3px solid ${P.ink}`, padding: '10px 20px', fontFamily: FONT.mono, fontSize: 28 }}>fraud score: <b style={{ color: P.green }}>4</b> / 99</div></Rise>
      </div>
    </Card>
  );
};

/** Stop 6: your bank says yes → beep. */
const Stop6: React.FC = () => {
  const { frame, fps, t } = useT();
  const rows: [string, string, number][] = [['fraud score', '4 / 99 · low', T.fraud], ['balance', 'enough for $4.50', T.balance]];
  return (
    <Card x={90} y={600} w={900} h={820} inAt={S[5] - 0.35} outAt={T.but + 0.05} header="stop 6 · your bank">
      <Rise at={T.stop6_ + 0.05} style={{ position: 'absolute', left: 50, right: 50, top: 86 }}><div style={{ borderRadius: 16, background: P.ink, color: '#fff', padding: '14px 22px', fontFamily: FONT.mono, fontSize: 26 }}>incoming: $4.50 · Corner Café · score 4</div></Rise>
      <div style={{ position: 'absolute', left: 50, right: 50, top: 190, display: 'flex', flexDirection: 'column', gap: 18 }}>
        {rows.map(([k, v, a]) => (
          <Rise key={k} at={a - 0.1}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderRadius: 18, border: `3px solid ${P.ink}`, background: '#FAF8F5', padding: '16px 22px' }}>
              <div><div style={{ fontFamily: FONT.mono, fontSize: 22, color: P.inkSoft }}>{k}</div><div style={{ fontFamily: FONT.sans, fontWeight: 700, fontSize: 36 }}>{v}</div></div>
              <Tick at={a + 0.3} size={54} />
            </div>
          </Rise>
        ))}
      </div>
      {t >= T.yes - 0.05 && t < T.beep && <div style={{ position: 'absolute', left: 0, right: 0, top: 470, textAlign: 'center', transform: `scale(${pop(frame, fps, T.yes - 0.05)})`, fontFamily: FONT.black, fontWeight: 800, fontSize: 160, color: P.green }}>YES</div>}
      {t >= T.beep && (
        <div style={{ position: 'absolute', left: 120, right: 120, top: 360, display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
          <div style={{ transform: `scale(${pop(frame, fps, T.beep)})` }}><Reader ok w={220} /></div>
          <svg width="200" height="220" viewBox="0 0 200 220" style={{ transform: `scale(${pop(frame, fps, T.coffee)})` }}>
            <path d="M40 60 H150 L138 200 H52 Z" fill="#fff" stroke={P.ink} strokeWidth="8" strokeLinejoin="round" />
            <rect x="32" y="40" width="126" height="26" rx="8" fill={P.ink} />
            <rect x="52" y="110" width="88" height="44" fill={P.red} />
            <path d="M80 30 Q70 15 85 5 M110 30 Q100 15 115 5" stroke={P.inkSoft} strokeWidth="6" fill="none" strokeLinecap="round" />
          </svg>
        </div>
      )}
    </Card>
  );
};

/** The twist: no money moved; settlement happens later in a batch. */
const Settle: React.FC = () => {
  const { frame, fps, t } = useT();
  return (
    <Card x={90} y={600} w={900} h={820} inAt={T.but - 0.35} outAt={T.want + 0.05} header="after the beep" tag="SETTLEMENT">
      <div style={{ position: 'absolute', left: 50, right: 50, top: 100, display: 'flex', gap: 20 }}>
        {[['your account', '$1,240.00'], ['shop received', '$0.00']].map(([k, v]) => (
          <div key={k} style={{ flex: 1, borderRadius: 18, border: `3px solid ${P.ink}`, background: '#FAF8F5', padding: '16px 20px' }}>
            <div style={{ fontFamily: FONT.mono, fontSize: 22, color: P.inkSoft }}>{k}</div>
            <div style={{ fontFamily: FONT.black, fontWeight: 800, fontSize: 52 }}>{v}</div>
            <div style={{ fontFamily: FONT.mono, fontSize: 20, color: P.red, opacity: prog(t, T.moved2 - 0.1, T.moved2 + 0.1) }}>unchanged</div>
          </div>
        ))}
      </div>
      <div style={{ position: 'absolute', left: 50, top: 330, transform: `scale(${pop(frame, fps, T.promise - 0.1)}) rotate(-3deg)`, transformOrigin: 'left center', borderRadius: 18, background: '#FFF4CC', border: `3px solid ${P.ink}`, padding: '20px 26px', width: 380 }}>
        <div style={{ fontFamily: FONT.serif, fontStyle: 'italic', fontSize: 58, color: P.ink }}>IOU $4.50</div>
        <div style={{ fontFamily: FONT.mono, fontSize: 20, color: P.inkSoft }}>the beep = a promise</div>
      </div>
      <div style={{ position: 'absolute', left: 480, top: 330, width: 370, height: 300, borderRadius: 22, background: P.navy, opacity: prog(t, T.later - 0.15, T.later + 0.15), padding: 22, boxSizing: 'border-box', overflow: 'hidden' }}>
        <svg width="60" height="60" viewBox="0 0 60 60"><path d="M40 8 A24 24 0 1 0 52 44 A20 20 0 1 1 40 8 Z" fill="#F5D76E" /></svg>
        <div style={{ fontFamily: FONT.mono, fontSize: 20, color: 'rgba(255,255,255,0.7)', marginTop: 6 }}>later · one big batch</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(8, 1fr)', gap: 6, marginTop: 14 }}>
          {Array.from({ length: 32 }).map((_, i) => <div key={i} style={{ height: 22, borderRadius: 5, background: i === 13 ? P.red : P.blue, opacity: prog(t, T.batch - 0.1 + i * 0.015, T.batch + 0.1 + i * 0.015) }} />)}
        </div>
      </div>
      <Rise at={T.settlement - 0.05} style={{ position: 'absolute', left: 50, top: 680 }}><div style={{ fontFamily: FONT.serif, fontStyle: 'italic', fontSize: 80, color: P.red }}>settlement</div></Rise>
    </Card>
  );
};

// ---- composition ------------------------------------------------------------
export const C13: React.FC = () => (
  <Stage
    slug="c13-tap-to-pay" vo={vo} poses={POSES} sfx={SFX}
    modes={[{ t: 0, mode: 'hook' }, { t: S[0] - 0.1, mode: 'items' }, { t: T.want - 0.1, mode: 'act' }]}
  >
    <TopBar
      chapters={[{ t: 0, label: '// 00 — one tap' }, ...S.map((s, i) => ({ t: s, label: `// 0${i + 1} — ${['your phone', 'the vault', 'the reader', "the shop's bank", 'visa', 'your bank'][i]}` })),
        { t: T.but, label: '// 07 — the twist' }, { t: T.want, label: '// 08 — build it' }]}
      counter={{ label: 'STOPS', total: 6, ticks: S.map((s) => s + 0.2) }}
    />
    <Headline vo={vo} />
    <Hook />
    <Route />
    <Stop1 />
    <Stop2 />
    <Stop3 />
    <Stop4 />
    <Stop5 />
    <Stop6 />
    <Settle />
    <SaveTag at={T.but + 0.2} x={680} y={540} outAt={T.want} />
    <Cta from={T.want} screen="apply" solveAt={T.lesson + 0.2} chip={{ at: T.head, text: 'teyro.app' }} logoAt={T.teyro - 0.05} />
  </Stage>
);
