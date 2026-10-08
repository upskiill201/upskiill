import React from 'react';
import { Img, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { FONT, P } from './tokens';
import { pop, prog, spr } from './anim';
import { Rise, TeyLogo } from './Kit';

/**
 * The CTA block (§7): a phone showing a real Teyro screen (copy from the live pages), the CTA chip
 * ("LINK IN BIO" / "teyro.app" / "teyro.app/teach") and the Tey tile. Sits left of Ada in 'act' mode.
 */
export type Screen = 'apply' | 'bug' | 'streak' | 'studio';

const useT = () => { const frame = useCurrentFrame(); const { fps } = useVideoConfig(); return { frame, fps, t: frame / fps }; };

const Apply: React.FC<{ solveAt: number }> = ({ solveAt }) => {
  const { t } = useT();
  const done = t >= solveAt;
  return (
    <>
      <Pill text="APPLY" bg="#FFF4CC" fg="#B27B00" />
      <div style={{ fontFamily: FONT.sans, fontWeight: 700, fontSize: 30, color: P.ink, lineHeight: 1.2, marginBottom: 18 }}>Finish the function so it gives back the total:</div>
      <Code lines={['function add(a, b) {', `  ${done ? 'return a + b' : '______'}`, '}']} hi={done ? 1 : -1} />
      {['return a + b', 'print(a + b)', 'a + b = result'].map((o, i) => <Opt key={i} text={o} ok={done && i === 0} />)}
      {done && <Nice at={solveAt} />}
    </>
  );
};

const Bug: React.FC<{ solveAt: number }> = ({ solveAt }) => {
  const { t } = useT();
  const done = t >= solveAt;
  return (
    <>
      <Pill text="FIND THE BUG" bg="#FFE1DE" fg={P.red} />
      <div style={{ fontFamily: FONT.sans, fontWeight: 700, fontSize: 30, color: P.ink, lineHeight: 1.2, marginBottom: 18 }}>Which line breaks?</div>
      <Code lines={['def average(nums):', '    total = sum(nums)', `    return total / len(${done ? 'nums' : 'num'})`]} hi={2} bad={!done} />
      {['line 1', 'line 2', 'line 3'].map((o, i) => <Opt key={i} text={o} ok={done && i === 2} />)}
      {done && <Nice at={solveAt} />}
    </>
  );
};

const Streak: React.FC<{ solveAt: number }> = ({ solveAt }) => {
  const { t } = useT();
  const days = Math.round(127 + prog(t, solveAt - 0.3, solveAt + 0.2));
  return (
    <div style={{ textAlign: 'center' }}>
      <Img src={staticFile('art/burn.png')} style={{ width: 150, height: 150, objectFit: 'contain', marginTop: 10 }} />
      <div style={{ fontFamily: FONT.black, fontWeight: 800, fontSize: 92, color: '#FF9600', lineHeight: 1 }}>{days}</div>
      <div style={{ fontFamily: FONT.sans, fontWeight: 700, fontSize: 34, color: P.ink, marginBottom: 22 }}>day streak!</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 8, padding: '0 6px' }}>
        {Array.from({ length: 21 }).map((_, i) => (
          <div key={i} style={{ height: 40, borderRadius: 10, background: i === 10 ? '#DDF4FF' : '#FFE3B8', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {i === 10 && <Img src={staticFile('art/freeze.svg')} style={{ width: 28, height: 28 }} />}
          </div>
        ))}
      </div>
      <div style={{ marginTop: 18, fontFamily: FONT.mono, fontSize: 20, color: '#1CB0F6' }}>a freeze saved day 11</div>
    </div>
  );
};

const Studio: React.FC<{ solveAt: number }> = ({ solveAt }) => {
  const { t } = useT();
  const rows: [string, number][] = [['Lesson 1', 100], ['Lesson 2', 94], ['Lesson 3', 88], ['Lesson 4', 57], ['Lesson 5', 52]];
  return (
    <>
      <Pill text="TEYRO STUDIO" bg="#E8ECFF" fg="#3D5AFE" />
      <div style={{ fontFamily: FONT.sans, fontWeight: 700, fontSize: 30, color: P.ink, marginBottom: 16 }}>Where learners stop</div>
      {rows.map(([l, v], i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12, fontFamily: FONT.mono, fontSize: 18, color: P.ink }}>
          <span style={{ width: 92 }}>{l}</span>
          <div style={{ flex: 1, height: 22, borderRadius: 11, background: '#EEE' }}><div style={{ width: `${v * prog(t, solveAt - 1.2 + i * 0.1, solveAt - 0.6 + i * 0.1)}%`, height: '100%', borderRadius: 11, background: i === 3 ? P.red : '#3D5AFE' }} /></div>
          <span style={{ width: 52, textAlign: 'right' }}>{v}%</span>
        </div>
      ))}
      <div style={{ fontFamily: FONT.mono, fontSize: 17, color: P.red, margin: '6px 0 16px' }}>Lesson 4 is where most stop.</div>
      {t >= solveAt && <Rise at={solveAt}><div style={{ background: '#EAF8DD', border: '3px solid #58CC02', borderRadius: 16, padding: '14px 16px', fontFamily: FONT.sans, fontWeight: 700, fontSize: 22, color: '#2F7A00' }}>Nudge sent to 9 quiet learners<br /><span style={{ fontWeight: 500, color: P.ink, fontSize: 19 }}>"Hey Priya, lesson 4 trips everyone up. You've got this!"</span></div></Rise>}
    </>
  );
};

const Pill: React.FC<{ text: string; bg: string; fg: string }> = ({ text, bg, fg }) => (
  <div style={{ display: 'inline-block', background: bg, color: fg, borderRadius: 999, padding: '6px 16px', fontFamily: FONT.mono, fontWeight: 700, fontSize: 18, marginBottom: 14 }}>{text}</div>
);
const Code: React.FC<{ lines: string[]; hi: number; bad?: boolean }> = ({ lines, hi, bad }) => (
  <div style={{ background: '#16181D', color: '#E6E6E6', borderRadius: 16, padding: '16px 18px', fontFamily: FONT.mono, fontSize: 21, lineHeight: 1.55, marginBottom: 18, whiteSpace: 'pre' }}>
    {lines.map((l, i) => <div key={i} style={{ color: i === hi ? (bad ? '#FF8A80' : '#7CE38B') : undefined }}>{l}</div>)}
  </div>
);
const Opt: React.FC<{ text: string; ok: boolean }> = ({ text, ok }) => (
  <div style={{ border: `3px solid ${ok ? '#58CC02' : '#E5E5E5'}`, background: ok ? '#EAF8DD' : '#fff', borderRadius: 16, padding: '12px 18px', fontFamily: FONT.mono, fontSize: 22, color: P.ink, marginBottom: 12 }}>{text}</div>
);
const Nice: React.FC<{ at: number }> = ({ at }) => (
  <Rise at={at} style={{ position: 'absolute', left: 0, right: 0, bottom: 0 }}>
    <div style={{ background: '#D7FFB8', color: '#58A700', padding: '24px 30px 40px', fontFamily: FONT.sans, fontWeight: 700, fontSize: 30 }}>Nice! That's right. <span style={{ float: 'right' }}>+10 XP</span></div>
  </Rise>
);

export const Cta: React.FC<{
  from: number; screen: Screen; solveAt: number;
  chip: { at: number; text: string }; logoAt: number; dark?: boolean;
}> = ({ from, screen, solveAt, chip, logoAt, dark }) => {
  const { frame, fps, t } = useT();
  if (t < from - 0.2) return null;
  const enter = spr(frame, fps, from, { damping: 14, stiffness: 150 });
  const c = pop(frame, fps, chip.at);
  const logo = pop(frame, fps, logoAt);
  const S = { apply: Apply, bug: Bug, streak: Streak, studio: Studio }[screen];
  return (
    <>
      <div style={{ position: 'absolute', left: 96, top: 590, width: 470, height: 860, borderRadius: 64, background: dark ? '#0B0D18' : P.ink, padding: 16, transform: `translateY(${(1 - enter) * 300}px) rotate(-3deg)`, opacity: enter, boxShadow: dark ? `0 0 80px ${P.blue}55` : '0 30px 60px rgba(0,0,0,0.18)' }}>
        <div style={{ width: '100%', height: '100%', borderRadius: 50, background: '#fff', overflow: 'hidden', position: 'relative', padding: '58px 30px 0' }}>
          <div style={{ height: 18, borderRadius: 9, background: '#EEE', marginBottom: 24 }}><div style={{ width: `${30 + 40 * prog(t, from, from + 1)}%`, height: '100%', borderRadius: 9, background: '#58CC02' }} /></div>
          <S solveAt={solveAt} />
        </div>
      </div>
      {c > 0 && (
        <div style={{ position: 'absolute', left: 560, top: 640, transform: `scale(${c})`, transformOrigin: 'left center', display: 'flex', alignItems: 'center', gap: 14, background: dark ? P.blue : P.red, color: '#fff', borderRadius: 999, padding: '18px 30px', fontFamily: FONT.mono, fontWeight: 700, fontSize: chip.text.length > 12 ? 30 : 34, boxShadow: `0 6px 0 ${dark ? '#000' : P.ink}`, whiteSpace: 'nowrap' }}>
          {chip.text}
          <svg width="30" height="30" viewBox="0 0 30 30"><path d="M6 24 L24 6 M10 6 H24 V20" stroke="#fff" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </div>
      )}
      {logo > 0 && <div style={{ position: 'absolute', left: 620, top: 800, transform: `scale(${logo}) rotate(6deg)` }}><TeyLogo size={190} /></div>}
    </>
  );
};
