import React from 'react';
import { useCurrentFrame, useVideoConfig } from 'remotion';
import voData from './vo.json';
import { Stage, type Sfx } from '../../explainer/Stage';
import { Headline } from '../../explainer/Headline';
import { TopBar } from '../../explainer/TopBar';
import { PlugStrip } from '../../explainer/PlugStrip';
import { Bar, Card, Odometer, Rise, SaveTag, Stamp, TeyLogo, Tick } from '../../explainer/Kit';
import { at as atW, type VO } from '../../explainer/vo';
import { FONT, P } from '../../explainer/tokens';
import { lerp, pop, prog, spr } from '../../explainer/anim';
import type { PoseName } from '../../host/Ada';

/**
 * L1: "Rereading is the worst way to study" (Teyro, Learning pillar, value list, Editorial Paper).
 * Script + sources: ./script.json. Every cue is a spoken word, so visuals stay locked to the VO.
 */
const vo = voData as unknown as VO;
const at = (w: string, n = 1) => atW(vo, w, n);
export const L1_DURATION = Math.ceil((vo.duration + 0.4) * 30);

// ---- cue times -------------------------------------------------------------
const T = {
  worst: at('worst'), four: at('four'), first: at('First,'), y2006: at('2006.'), reread: at('reread'), tested: at('tested'),
  oneWeek: at('One', 2), testers: at('testers'), sixty: at('sixty-one'), rereaders: at('rereaders?'), forty: at('Forty.'),
  second: at('Second,'), more: at('more'), rereading2: at('Rereading', 2), familiar: at('familiar.'), your: at('Your', 2), ive: at("I've"), for_: at('for'), iKnow: at('I'),
  third: at('Third,'), n118: at('118'), studies: at('studies'), practice: at('practice'), again1: at('again'), again2: at('again', 2),
  finally: at('finally,'), feedback: at('feedback.'), when: at('When'), checked: at('checked'), right: at('right'), benefit: at('benefit'), doubled: at('doubled.'),
  so: at('So'), close: at('close'), quiz: at('quiz'), check: at('check'), away: at('away.'),
  if_: at('If'), lessons: at('lessons'), app: at('app'), bio: at('bio.'), called: at('called'), teyro: at('Teyro.'),
};
const END = vo.duration;

const PLUGS = [
  { t: T.y2006, tag: '01' }, { t: T.second, tag: '02' }, { t: T.third, tag: '03' }, { t: T.finally, tag: '04' },
];

const POSES: { t: number; p: PoseName }[] = [
  { t: 0, p: 'present' }, { t: T.worst - 0.05, p: 'shrug' }, { t: T.four - 0.05, p: 'count4' },
  { t: T.first - 0.05, p: 'count1' }, { t: T.y2006, p: 'pointUpL' }, { t: T.reread - 0.1, p: 'present' }, { t: T.oneWeek - 0.05, p: 'think' },
  { t: T.sixty - 0.05, p: 'pointUpL' }, { t: T.forty - 0.08, p: 'surprise' },
  { t: T.second - 0.05, p: 'count2' }, { t: T.more, p: 'talk2' }, { t: T.rereading2, p: 'present' }, { t: T.familiar, p: 'pointUpL' },
  { t: T.your - 0.05, p: 'think' }, { t: T.for_, p: 'shrug' },
  { t: T.third - 0.05, p: 'count3' }, { t: T.n118, p: 'surprise' }, { t: T.practice, p: 'pointUpL' }, { t: T.again1, p: 'fist' },
  { t: T.finally - 0.05, p: 'count4' }, { t: T.checked, p: 'pointUpL' }, { t: T.right, p: 'thumbsUp' }, { t: T.benefit - 0.1, p: 'present' }, { t: T.doubled, p: 'cheer' },
  { t: T.close - 0.05, p: 'count1' }, { t: T.quiz - 0.05, p: 'count2' }, { t: T.check - 0.05, p: 'count3' },
  { t: T.if_, p: 'present' }, { t: T.app - 0.1, p: 'pointUpL' }, { t: T.bio + 0.15, p: 'wave' }, { t: T.teyro - 0.05, p: 'wink' },
];

const SFX: Sfx[] = [
  { t: 0.05, name: 'whoosh', vol: 0.22 }, { t: T.worst, name: 'slam', vol: 0.45 }, { t: T.four, name: 'pop', vol: 0.3 },
  ...PLUGS.flatMap((p) => [{ t: p.t, name: 'whoosh', vol: 0.18 }, { t: p.t + 0.25, name: 'pop', vol: 0.4 }]),
  { t: T.first + 0.05, name: 'swish', vol: 0.22 }, { t: T.oneWeek, name: 'tick', vol: 0.18 }, { t: T.oneWeek + 0.18, name: 'tick', vol: 0.18 },
  ...[0, 0.12, 0.24, 0.36].map((d) => ({ t: T.sixty + d, name: 'tick', vol: 0.14 })), { t: T.forty, name: 'pop2', vol: 0.3 },
  { t: T.second + 0.05, name: 'swish', vol: 0.22 }, { t: T.more, name: 'power', vol: 0.18 }, { t: T.familiar, name: 'shimmer', vol: 0.2 }, { t: T.for_, name: 'slam', vol: 0.32 },
  { t: T.third + 0.05, name: 'swish', vol: 0.22 }, ...[0, 0.15, 0.3, 0.45].map((d) => ({ t: T.n118 + d, name: 'tick', vol: 0.13 })),
  ...[0, 0.18, 0.36, 0.5, 0.64, 0.78].map((d) => ({ t: T.again1 + d, name: 'pop2', vol: 0.18 })),
  { t: T.finally + 0.05, name: 'swish', vol: 0.22 }, { t: T.checked, name: 'blip', vol: 0.3 }, { t: T.right, name: 'success', vol: 0.32 }, { t: T.doubled, name: 'levelup', vol: 0.28 },
  { t: T.so, name: 'swish', vol: 0.22 }, { t: T.so + 0.2, name: 'pop', vol: 0.3 }, ...[T.close, T.quiz, T.check].map((t) => ({ t: t + 0.1, name: 'pop2', vol: 0.3 })),
  { t: T.if_, name: 'whoosh', vol: 0.22 }, { t: T.lessons + 0.6, name: 'success', vol: 0.25 }, { t: T.bio, name: 'notify', vol: 0.35 }, { t: T.teyro, name: 'shimmer', vol: 0.3 },
];

// ---- small visuals ---------------------------------------------------------
const useT = () => { const frame = useCurrentFrame(); const { fps } = useVideoConfig(); return { frame, fps, t: frame / fps }; };

const NotesHook: React.FC = () => {
  const { t } = useT();
  const loops = Math.min(3, 1 + Math.floor(prog(t, 0.3, 1.3) * 2.99));
  return (
    <Card x={100} y={600} w={620} h={410} inAt={0} outAt={T.four + 0.1} header="my_notes.txt" tilt={-3}>
      <div style={{ position: 'absolute', left: 36, right: 36, top: 80 }}>
        {[0.92, 0.78, 0.86, 0.64, 0.8].map((w, i) => (
          <div key={i} style={{ position: 'relative', height: 26, width: `${w * 100}%`, marginBottom: 22, borderRadius: 8, background: '#E7E3DC' }}>
            {i % 2 === 0 && <div style={{ position: 'absolute', inset: '-4px -6px', background: P.yellowHi, opacity: 0.7, borderRadius: 6, width: `${prog(t, 0.2 + i * 0.15, 0.6 + i * 0.15) * 100}%` }} />}
          </div>
        ))}
      </div>
      <div style={{ position: 'absolute', right: 26, bottom: 22, fontFamily: FONT.mono, fontSize: 24, color: P.inkSoft, display: 'flex', alignItems: 'center', gap: 8 }}>
        <svg width="30" height="30" viewBox="0 0 30 30" style={{ transform: `rotate(${t * 360}deg)` }}><path d="M25 15 A10 10 0 1 1 15 5" stroke={P.inkSoft} strokeWidth="3.5" fill="none" strokeLinecap="round" /><path d="M15 1 L20 5 L15 9" stroke={P.inkSoft} strokeWidth="3.5" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
        read again ×{loops}
      </div>
    </Card>
  );
};

const Panel: React.FC<{ label: string; on: number; icon: 'book' | 'quiz' }> = ({ label, on, icon }) => {
  const { frame, fps } = useT();
  const k = spr(frame, fps, on, { damping: 12, stiffness: 200 });
  return (
    <div style={{ width: 360, height: 250, borderRadius: 22, border: `4px solid ${k > 0.5 ? P.red : P.line}`, background: k > 0.5 ? '#FFF6F4' : '#FAF8F5', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 18, transform: `scale(${1 + 0.05 * k})` }}>
      <svg width="110" height="90" viewBox="0 0 110 90">
        {icon === 'book' ? (
          <g fill="none" stroke={P.ink} strokeWidth="5" strokeLinejoin="round"><path d="M55 18 Q35 6 8 10 V78 Q35 74 55 86 Q75 74 102 78 V10 Q75 6 55 18 Z" fill="#fff" /><path d="M55 18 V86" /><path d="M20 28 H44 M20 42 H44 M66 28 H90 M66 42 H90" strokeWidth="4" /></g>
        ) : (
          <g><rect x="10" y="6" width="90" height="78" rx="12" fill="#fff" stroke={P.ink} strokeWidth="5" /><text x="55" y="58" textAnchor="middle" fontFamily="Inter" fontWeight="800" fontSize="44" fill={P.red}>?</text></g>
        )}
      </svg>
      <div style={{ fontFamily: FONT.mono, fontWeight: 700, fontSize: 30, color: P.ink }}>{label}</div>
    </div>
  );
};

const StudyCard: React.FC = () => {
  const { frame, fps, t } = useT();
  const week = pop(frame, fps, T.oneWeek);
  return (
    <Card x={90} y={590} w={900} h={860} inAt={T.first} outAt={T.second + 0.05} header="study · 2006" tag="Roediger & Karpicke">
      <div style={{ position: 'absolute', left: 50, right: 50, top: 92, display: 'flex', justifyContent: 'space-between' }}>
        <Panel label="REREAD" on={T.reread} icon="book" />
        <Panel label="TESTED" on={T.tested} icon="quiz" />
      </div>
      {week > 0 && (
        <div style={{ position: 'absolute', left: 0, right: 0, top: 372, display: 'flex', justifyContent: 'center', transform: `scale(${week})` }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, background: P.ink, color: '#fff', borderRadius: 999, padding: '12px 30px', fontFamily: FONT.mono, fontSize: 30, fontWeight: 700 }}>
            DAY <Odometer to={7} from={1} a={T.oneWeek} b={T.oneWeek + 0.45} size={40} box={false} color="#fff" /> · one week later
          </div>
        </div>
      )}
      <div style={{ position: 'absolute', left: 50, right: 50, top: 480, display: 'flex', flexDirection: 'column', gap: 34, opacity: prog(t, T.testers - 0.1, T.testers + 0.2) }}>
        <Bar label="TESTED THEMSELVES · remembered" pct={61} a={T.sixty - 0.1} b={T.sixty + 0.5} color={P.red} width={560}
          value={<Odometer to={61} a={T.sixty - 0.1} b={T.sixty + 0.5} size={58} suffix="%" />} />
        <Bar label="REREAD · remembered" pct={40} a={T.forty - 0.25} b={T.forty + 0.25} color="#9A9DA6" width={560}
          value={<Odometer to={40} a={T.forty - 0.25} b={T.forty + 0.25} size={58} suffix="%" />} />
      </div>
    </Card>
  );
};

const Gauge: React.FC<{ at: number }> = ({ at }) => {
  const { frame, fps } = useT();
  const k = spr(frame, fps, at, { damping: 9, stiffness: 120 });
  const ang = -80 + 140 * k; // needle sweeps to "high"
  return (
    <svg width="380" height="230" viewBox="0 0 380 230">
      <path d="M40 200 A150 150 0 0 1 340 200" stroke="#E7E3DC" strokeWidth="34" fill="none" strokeLinecap="round" />
      <path d="M40 200 A150 150 0 0 1 340 200" stroke={P.red} strokeWidth="34" fill="none" strokeLinecap="round" strokeDasharray={`${471 * 0.86 * k} 999`} />
      <g transform={`translate(190 200) rotate(${ang})`}><rect x="-6" y="-140" width="12" height="140" rx="6" fill={P.ink} /></g>
      <circle cx="190" cy="200" r="20" fill={P.ink} />
    </svg>
  );
};

const ConfidenceCard: React.FC = () => {
  const { t } = useT();
  const phaseA = 1 - prog(t, T.rereading2 + 0.9, T.rereading2 + 1.2);
  const phaseB = prog(t, T.rereading2 + 0.9, T.rereading2 + 1.2) * (1 - prog(t, T.your - 0.15, T.your + 0.1));
  const phaseC = prog(t, T.your - 0.15, T.your + 0.1);
  return (
    <Card x={90} y={590} w={900} h={860} inAt={T.second - 0.35} outAt={T.third + 0.05} header="the confidence trap">
      <div style={{ position: 'absolute', inset: 0, top: 80, opacity: phaseA, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
        <div style={{ fontFamily: FONT.mono, fontSize: 28, color: P.inkSoft }}>REREADERS · how sure they felt</div>
        <Gauge at={T.more - 0.1} />
        <Rise at={T.more + 0.25}><div style={{ fontFamily: FONT.black, fontWeight: 800, fontSize: 64, color: P.red }}>HIGH</div></Rise>
        <Rise at={T.rereading2}><div style={{ fontFamily: FONT.mono, fontSize: 30, color: P.ink, background: '#F3F1ED', borderRadius: 14, padding: '12px 24px' }}>remembered after a week: <b>40%</b></div></Rise>
      </div>
      <div style={{ position: 'absolute', left: 70, right: 70, top: 120, opacity: phaseB }}>
        <div style={{ fontFamily: FONT.mono, fontSize: 26, color: P.inkSoft, marginBottom: 30 }}>page 12 · third time reading</div>
        {['The testing effect is', 'when recalling something', 'makes it stick better', 'than seeing it again.'].map((line, i) => {
          const glow = prog(t, T.familiar - 0.6 + i * 0.12, T.familiar + i * 0.12);
          return <div key={i} style={{ fontFamily: FONT.sans, fontWeight: 500, fontSize: 48, color: P.ink, marginBottom: 18, padding: '2px 10px', borderRadius: 8, background: `rgba(255,226,122,${0.85 * glow})`, display: 'inline-block' }}>{line}</div>;
        })}
        <Rise at={T.familiar + 0.1}><div style={{ marginTop: 24, fontFamily: FONT.serif, fontStyle: 'italic', fontSize: 54, color: P.red }}>"looks familiar…"</div></Rise>
      </div>
      <div style={{ position: 'absolute', inset: 0, top: 110, opacity: phaseC, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 26 }}>
        <Rise at={T.ive - 0.05}><div style={{ background: '#EDEBE7', borderRadius: 40, padding: '30px 50px', fontFamily: FONT.sans, fontWeight: 700, fontSize: 64, color: P.inkSoft }}>"I've seen this"</div></Rise>
        <Rise at={T.for_ - 0.05}><div style={{ fontFamily: FONT.black, fontWeight: 800, fontSize: 130, color: P.red, lineHeight: 1 }}>≠</div></Rise>
        <Rise at={T.iKnow - 0.05}><div style={{ background: P.red, borderRadius: 40, padding: '30px 50px', fontFamily: FONT.sans, fontWeight: 700, fontSize: 64, color: '#fff' }}>"I know this"</div></Rise>
      </div>
    </Card>
  );
};

const ReviewCard: React.FC = () => {
  const { frame, fps, t } = useT();
  const cols = 14, n = 118;
  const fill = prog(t, T.n118 - 0.1, T.studies + 0.3);
  const winners = [7, 22, 41, 58, 73, 90, 104, 115];
  return (
    <Card x={90} y={590} w={900} h={860} inAt={T.third - 0.35} outAt={T.finally + 0.05} header="review · 118 studies" tag="Adesope et al. 2017">
      <div style={{ position: 'absolute', left: 50, top: 86, display: 'flex', alignItems: 'center', gap: 20 }}>
        <Odometer to={118} a={T.n118 - 0.1} b={T.studies + 0.2} size={84} />
        <div style={{ fontFamily: FONT.mono, fontSize: 30, color: P.inkSoft, lineHeight: 1.3 }}>studies<br />compared</div>
      </div>
      <div style={{ position: 'absolute', left: 50, top: 236, display: 'grid', gridTemplateColumns: `repeat(${cols}, 48px)`, gap: 8 }}>
        {Array.from({ length: n }).map((_, i) => {
          const on = fill * n > i;
          const win = winners.indexOf(i);
          const wk = win >= 0 ? pop(frame, fps, T.again1 + win * 0.12) : 0;
          return (
            <div key={i} style={{ width: 48, height: 34, borderRadius: 7, background: wk > 0 ? P.red : on ? '#DAD6CF' : 'transparent', border: on ? 'none' : '2px dashed #DAD6CF', transform: `scale(${1 + 0.25 * wk * (1 - Math.min(1, wk))})`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {wk > 0 && <svg width="22" height="22" viewBox="0 0 22 22"><path d="M5 11 L9.5 15.5 L17 6.5" stroke="#fff" strokeWidth="3.5" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>}
            </div>
          );
        })}
      </div>
      <div style={{ position: 'absolute', left: 50, right: 50, top: 640, display: 'flex', gap: 22, alignItems: 'center' }}>
        <Rise at={T.practice}><div style={{ display: 'flex', alignItems: 'center', gap: 14, background: P.red, color: '#fff', borderRadius: 999, padding: '16px 28px', fontFamily: FONT.mono, fontWeight: 700, fontSize: 32 }}><Tick at={T.practice + 0.2} size={38} color="#fff" />PRACTICE TESTS</div></Rise>
        <Rise at={T.practice + 0.7}><div style={{ fontFamily: FONT.black, fontWeight: 800, fontSize: 40, color: P.ink }}>beat</div></Rise>
        <Rise at={T.practice + 0.9}><div style={{ background: '#EDEBE7', color: P.inkSoft, borderRadius: 999, padding: '16px 28px', fontFamily: FONT.mono, fontWeight: 700, fontSize: 32 }}>other ways</div></Rise>
      </div>
    </Card>
  );
};

const FeedbackCard: React.FC = () => {
  const { frame, fps, t } = useT();
  const quizOut = prog(t, T.benefit - 0.4, T.benefit - 0.1);
  const tap = pop(frame, fps, T.checked);
  const correct = t >= T.right;
  return (
    <Card x={90} y={590} w={900} h={860} inAt={T.finally - 0.35} outAt={T.so + 0.05} header="feedback">
      <div style={{ position: 'absolute', left: 50, right: 50, top: 92, opacity: 1 - quizOut }}>
        <Rise at={T.finally + 0.15}><div style={{ fontFamily: FONT.sans, fontWeight: 700, fontSize: 52, color: P.ink, lineHeight: 1.15, marginBottom: 34 }}>Quick check: who remembered more after a week?</div></Rise>
        {['The rereaders', 'The testers'].map((o, i) => {
          const isRight = i === 1;
          const lit = isRight && correct;
          return (
            <Rise key={i} at={T.when + i * 0.15}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderRadius: 22, border: `4px solid ${lit ? P.green : P.line}`, background: lit ? '#E9F7EE' : '#FAF8F5', padding: '26px 34px', marginBottom: 20, fontFamily: FONT.sans, fontWeight: 700, fontSize: 46, color: P.ink, transform: isRight ? `scale(${1 + 0.04 * tap * (1 - prog(t, T.checked + 0.2, T.checked + 0.5))})` : undefined }}>
                {o}{lit && <Tick at={T.right} size={56} />}
              </div>
            </Rise>
          );
        })}
        {correct && <Rise at={T.right + 0.1}><div style={{ marginTop: 10, background: P.green, color: '#fff', borderRadius: 18, padding: '20px 30px', fontFamily: FONT.sans, fontWeight: 700, fontSize: 44 }}>Nice! That's right.</div></Rise>}
      </div>
      <div style={{ position: 'absolute', left: 50, right: 50, top: 110, opacity: quizOut, display: 'flex', flexDirection: 'column', gap: 40 }}>
        <div style={{ fontFamily: FONT.mono, fontSize: 28, color: P.inkSoft }}>benefit of testing yourself</div>
        <Bar label="WITHOUT FEEDBACK · g = 0.39" pct={39 / 0.75} a={T.benefit - 0.1} b={T.benefit + 0.4} color="#9A9DA6" width={780} />
        <Bar label="WITH FEEDBACK · g = 0.73" pct={73 / 0.75} a={T.benefit + 0.3} b={T.doubled + 0.2} color={P.red} width={780} />
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Rise at={T.doubled}><div style={{ fontFamily: FONT.black, fontWeight: 800, fontSize: 120, color: P.red, lineHeight: 1 }}>×1.9</div></Rise>
        </div>
        <div style={{ fontFamily: FONT.mono, fontSize: 22, color: P.inkSoft }}>Rowland 2014 · meta-analysis</div>
      </div>
    </Card>
  );
};

const RecapCard: React.FC = () => (
  <Card x={90} y={640} w={900} h={700} inAt={T.so - 0.35} outAt={T.if_} header="do this instead" tag="4 studies">
    <div style={{ position: 'absolute', left: 54, right: 54, top: 110, display: 'flex', flexDirection: 'column', gap: 34 }}>
      {[['Close the notes', T.close], ['Quiz yourself', T.quiz], ['Check your answers right away', T.check]].map(([label, t], i) => (
        <Rise key={i} at={(t as number) - 0.05}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 26, fontFamily: FONT.sans, fontWeight: 700, fontSize: 56, color: P.ink }}>
            <div style={{ width: 70, height: 70, borderRadius: 18, background: P.ink, color: '#fff', fontFamily: FONT.mono, fontSize: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none' }}>{i + 1}</div>
            <span style={{ flex: 1 }}>{label as string}</span><Tick at={(t as number) + 0.25} size={56} />
          </div>
        </Rise>
      ))}
      <div style={{ fontFamily: FONT.mono, fontSize: 24, color: P.inkSoft, marginTop: 10 }}>Roediger & Karpicke 2006 · Adesope 2017 · Rowland 2014</div>
    </div>
  </Card>
);

const CtaPhone: React.FC = () => {
  const { frame, fps, t } = useT();
  const enter = spr(frame, fps, T.if_, { damping: 14, stiffness: 150 });
  const answered = t >= T.lessons + 0.6;
  const bio = pop(frame, fps, T.bio);
  const logo = pop(frame, fps, T.teyro - 0.05);
  return (
    <>
      <div style={{ position: 'absolute', left: 96, top: 590, width: 470, height: 860, borderRadius: 64, background: P.ink, padding: 16, transform: `translateY(${(1 - enter) * 300}px) rotate(-3deg)`, opacity: enter, boxShadow: '0 30px 60px rgba(0,0,0,0.18)' }}>
        <div style={{ width: '100%', height: '100%', borderRadius: 50, background: '#fff', overflow: 'hidden', position: 'relative', padding: '64px 30px 0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 26 }}>
            <div style={{ flex: 1, height: 18, borderRadius: 9, background: '#EEE' }}><div style={{ width: `${30 + 40 * prog(t, T.lessons, T.lessons + 0.8)}%`, height: '100%', borderRadius: 9, background: '#58CC02' }} /></div>
          </div>
          <div style={{ display: 'inline-block', background: '#FFF4CC', color: '#B27B00', borderRadius: 999, padding: '6px 16px', fontFamily: FONT.mono, fontWeight: 700, fontSize: 18, marginBottom: 14 }}>APPLY</div>
          <div style={{ fontFamily: FONT.sans, fontWeight: 700, fontSize: 30, color: P.ink, lineHeight: 1.2, marginBottom: 18 }}>Finish the function so it gives back the total:</div>
          <div style={{ background: '#16181D', color: '#E6E6E6', borderRadius: 16, padding: '16px 18px', fontFamily: FONT.mono, fontSize: 22, lineHeight: 1.5, marginBottom: 18 }}>function add(a, b) {'{'}<br />&nbsp;&nbsp;<span style={{ color: answered ? '#7CE38B' : '#777' }}>{answered ? 'return a + b' : '______'}</span><br />{'}'}</div>
          {['return a + b', 'print(a + b)', 'a + b = result'].map((o, i) => (
            <div key={i} style={{ border: `3px solid ${answered && i === 0 ? '#58CC02' : '#E5E5E5'}`, background: answered && i === 0 ? '#EAF8DD' : '#fff', borderRadius: 16, padding: '12px 18px', fontFamily: FONT.mono, fontSize: 22, color: P.ink, marginBottom: 12 }}>{o}</div>
          ))}
          {answered && <Rise at={T.lessons + 0.6} style={{ position: 'absolute', left: 0, right: 0, bottom: 0 }}><div style={{ background: '#D7FFB8', color: '#58A700', padding: '24px 30px 40px', fontFamily: FONT.sans, fontWeight: 700, fontSize: 30 }}>Nice! That's right. <span style={{ float: 'right' }}>+10 XP</span></div></Rise>}
        </div>
      </div>
      {bio > 0 && (
        <div style={{ position: 'absolute', left: 560, top: 640, transform: `scale(${bio})`, transformOrigin: 'left center', display: 'flex', alignItems: 'center', gap: 14, background: P.red, color: '#fff', borderRadius: 999, padding: '18px 30px', fontFamily: FONT.mono, fontWeight: 700, fontSize: 34, boxShadow: `0 6px 0 ${P.ink}` }}>
          LINK IN BIO
          <svg width="30" height="30" viewBox="0 0 30 30"><path d="M6 24 L24 6 M10 6 H24 V20" stroke="#fff" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </div>
      )}
      {logo > 0 && <div style={{ position: 'absolute', left: 620, top: 800, transform: `scale(${logo}) rotate(6deg)` }}><TeyLogo size={190} /></div>}
    </>
  );
};

// ---- composition ------------------------------------------------------------
export const L1: React.FC = () => {
  const { frame, fps, t } = useT();
  // the strip sits mid-frame during the hook, then tucks bottom-left for the list
  const tuck = spr(frame, fps, T.first - 0.1, { damping: 15, stiffness: 120 });
  const ctaHide = prog(t, T.if_ - 0.1, T.if_ + 0.3);
  return (
    <Stage
      slug="l1-rereading" vo={vo} poses={POSES} sfx={SFX}
      modes={[{ t: 0, mode: 'hook' }, { t: T.first - 0.1, mode: 'items' }, { t: T.your - 0.1, mode: 'act' }, { t: T.third - 0.1, mode: 'items' }, { t: T.if_ - 0.1, mode: 'act' }]}
    >
      <TopBar
        chapters={[{ t: 0, label: '// 00 — before you study' }, { t: T.first, label: '// 01 — the 2006 study' }, { t: T.second, label: '// 02 — the confidence trap' },
          { t: T.third, label: '// 03 — 118 studies' }, { t: T.finally, label: '// 04 — feedback' }, { t: T.so, label: '// 05 — do this instead' }, { t: T.if_, label: '// 06 — every day' }]}
        counter={{ label: 'RESEARCH', total: 4, ticks: PLUGS.map((p) => p.t + 0.25) }}
      />
      <Headline vo={vo} />
      <NotesHook />
      <Stamp text="worst way" at={T.worst} outAt={T.four - 0.05} x={200} y={760} size={70} />
      <div style={{ opacity: 1 - ctaHide }}>
        <PlugStrip label="RESEARCH" plugs={PLUGS} appear={T.four} x={lerp(80, 60, tuck)} y={lerp(860, 1620, tuck)} scale={lerp(0.92, 0.78, tuck)} />
      </div>
      <StudyCard />
      <ConfidenceCard />
      <ReviewCard />
      <FeedbackCard />
      <RecapCard />
      <SaveTag at={T.so + 0.2} x={680} y={560} outAt={T.if_} />
      {t >= T.if_ - 0.2 && <CtaPhone />}
    </Stage>
  );
};
export { END as L1_END };
