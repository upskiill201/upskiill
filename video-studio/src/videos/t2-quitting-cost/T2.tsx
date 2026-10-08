import React from 'react';
import { Img, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import voData from './vo.json';
import { Stage, type Sfx } from '../../explainer/Stage';
import { Headline } from '../../explainer/Headline';
import { TopBar } from '../../explainer/TopBar';
import { Card, Rise, TeyLogo } from '../../explainer/Kit';
import { Big, Chip, Label } from '../../explainer/Blocks';
import { Cta } from '../../explainer/Cta';
import { at as atW, type VO } from '../../explainer/vo';
import { FONT, P } from '../../explainer/tokens';
import { pop, prog } from '../../explainer/anim';
import type { PoseName } from '../../host/Ada';

/**
 * T2: "Students quitting is costing you money" (Teyro Teach, product ad, reference-B structure):
 * Editorial pain → hard cut to Dark Tech at "Now picture…" → outcomes → reveal → features → CTA.
 */
const vo = voData as unknown as VO;
const at = (w: string, n = 1) => atW(vo, w, n);
export const T2_DURATION = Math.ceil((vo.duration + 0.4) * 30);

const T = {
  quitting: at('quitting'), money: at('money'), month: at('month.'),
  most: at('Most'), finish: at('finish'), studies: at('studies,'), one: at('one'), twenty: at('twenty'), quits: at('quits'), again: at('again.'),
  now: at('Now'), open: at('open'),
  streak: at('streak'), missing: at('missing'), losing: at('losing'),
  race: at('race'), leagues: at('leagues.'),
  see: at('see'), stop: at('stop,'), nudge: at('nudge'), tap: at('tap.'),
  subscribe: at('subscribe,'), paid: at('paid'), learning: at('learning.'),
  thats: at("That's"), teyro: at('Teyro.'),
  seventy: at('seventy'), free: at('free,'), camera: at('camera.'),
  go: at('Go'),
};
const DARK = T.now - 0.05;

const POSES: { t: number; p: PoseName }[] = [
  { t: 0, p: 'present' }, { t: T.quitting, p: 'worried' }, { t: T.month - 0.1, p: 'shrug' },
  { t: T.most, p: 'talk2' }, { t: T.one - 0.05, p: 'count1' }, { t: T.quits, p: 'worried' },
  { t: T.now - 0.05, p: 'surprise' }, { t: T.open, p: 'present' },
  { t: T.streak - 0.1, p: 'pointUpL' }, { t: T.losing, p: 'worried' }, { t: T.race, p: 'fist' },
  { t: T.see, p: 'pointUpL' }, { t: T.nudge, p: 'thumbsUp' }, { t: T.subscribe, p: 'present' }, { t: T.paid, p: 'cheer' },
  { t: T.thats - 0.05, p: 'open' }, { t: T.seventy - 0.05, p: 'count1' }, { t: T.free - 0.1, p: 'count2' }, { t: T.camera - 0.15, p: 'count3' },
  { t: T.go, p: 'wave' }, { t: T.go + 1.2, p: 'wink' },
];

const SFX: Sfx[] = [
  { t: 0.05, name: 'whoosh', vol: 0.22 }, { t: T.quitting, name: 'glitch', vol: 0.2 }, { t: T.month, name: 'slam', vol: 0.32 },
  { t: T.most, name: 'swish', vol: 0.22 }, { t: T.one, name: 'pop', vol: 0.35 }, { t: T.quits, name: 'glitch', vol: 0.2 }, { t: T.again, name: 'slam', vol: 0.32 },
  { t: DARK, name: 'datawhoosh', vol: 0.35 }, { t: T.open, name: 'shimmer', vol: 0.25 },
  { t: T.streak, name: 'coin', vol: 0.25 }, { t: T.race, name: 'pop2', vol: 0.3 }, { t: T.leagues, name: 'levelup', vol: 0.22 },
  { t: T.stop, name: 'blip', vol: 0.25 }, { t: T.nudge, name: 'notify', vol: 0.3 }, ...[0, 0.5, 1.0, 1.5].map((d) => ({ t: T.paid + d * 0.4, name: 'coin', vol: 0.22 })),
  { t: T.thats, name: 'power', vol: 0.3 }, { t: T.teyro, name: 'shimmer', vol: 0.35 },
  ...[T.seventy, T.free, T.camera].map((t) => ({ t, name: 'pop2', vol: 0.3 })), { t: T.go, name: 'notify', vol: 0.35 },
];

const useT = () => { const frame = useCurrentFrame(); const { fps } = useVideoConfig(); return { frame, fps, t: frame / fps }; };

// ---------- Editorial (pain) ----------
const RevenueHook: React.FC = () => {
  const { t } = useT();
  const bars = [100, 72, 51, 38, 27, 19, 14, 11];
  return (
    <Card x={100} y={600} w={660} h={440} inAt={0} outAt={T.most + 0.05} header="course_revenue" tilt={-2}>
      <div style={{ position: 'absolute', left: 40, right: 40, bottom: 70, height: 250, display: 'flex', alignItems: 'flex-end', gap: 16 }}>
        {bars.map((v, i) => <div key={i} style={{ flex: 1, height: `${v * prog(t, 0.2 + i * 0.12, 0.5 + i * 0.12)}%`, borderRadius: 8, background: i === 0 ? P.ink : P.red, opacity: 0.35 + 0.65 * (v / 100) }} />)}
      </div>
      <div style={{ position: 'absolute', left: 40, bottom: 24, right: 40, display: 'flex', justifyContent: 'space-between' }}><Label size={22}>month 1</Label><Label size={22}>month 8</Label></div>
    </Card>
  );
};

const PainCard: React.FC = () => {
  const { frame, fps, t } = useT();
  return (
    <Card x={90} y={590} w={900} h={860} inAt={T.most - 0.35} outAt={DARK} header="online course completion" tag="~4–5% finish">
      <div style={{ position: 'absolute', left: 70, top: 110, display: 'grid', gridTemplateColumns: 'repeat(5, 130px)', gap: 24 }}>
        {Array.from({ length: 20 }).map((_, i) => {
          const winner = i === 7;
          const lit = winner && t > T.one;
          const fade = !winner ? prog(t, T.studies + i * 0.04, T.studies + 0.3 + i * 0.04) : 0;
          const p = winner ? pop(frame, fps, T.one) : 0;
          return (
            <div key={i} style={{ display: 'flex', justifyContent: 'center', opacity: 1 - 0.7 * fade, transform: `scale(${lit ? 1 + 0.25 * Math.min(1, p) : 1})` }}>
              <svg width="90" height="110" viewBox="0 0 90 110"><circle cx="45" cy="30" r="24" fill={lit ? P.red : '#2B3A55'} /><path d="M8 108 Q8 62 45 62 Q82 62 82 108 Z" fill={lit ? P.red : '#2B3A55'} /></svg>
            </div>
          );
        })}
      </div>
      <Rise at={T.one} style={{ position: 'absolute', left: 70, top: 600 }}><Big size={70}>1 in 20 finished</Big></Rise>
      <Rise at={T.quits} style={{ position: 'absolute', left: 70, top: 700, display: 'flex', gap: 16, alignItems: 'center' }}>
        <Chip text="quit" tone="soft" /><Big size={46}>→</Big><Chip text="$0 / month, forever" tone="red" />
      </Rise>
    </Card>
  );
};

// ---------- Dark Tech (outcomes) ----------
const OutcomeCard: React.FC<{ inAt: number; outAt: number; header: string; children: React.ReactNode }> = ({ inAt, outAt, header, children }) => (
  <Card x={90} y={590} w={900} h={860} inAt={inAt} outAt={outAt} header={header} dark>{children}</Card>
);

const OpenDaily: React.FC = () => {
  const { t } = useT();
  return (
    <OutcomeCard inAt={T.now} outAt={T.streak - 0.3} header="your course · this week">
      <div style={{ position: 'absolute', left: 60, right: 60, top: 120, display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 14 }}>
        {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => {
          const on = prog(t, T.open + i * 0.08, T.open + 0.2 + i * 0.08);
          return <div key={i} style={{ height: 150, borderRadius: 20, background: `rgba(78,165,255,${0.15 + 0.6 * on})`, border: '2px solid rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: FONT.mono, fontSize: 34, color: '#fff' }}>{d}</div>;
        })}
      </div>
      <Rise at={T.open + 0.3} style={{ position: 'absolute', left: 60, top: 360 }}><Big size={74} color="#fff">opened every day</Big></Rise>
    </OutcomeCard>
  );
};

const StreakOutcome: React.FC = () => (
  <OutcomeCard inAt={T.streak - 0.35} outAt={T.race - 0.2} header="streaks">
    <Rise at={T.streak} style={{ position: 'absolute', left: 0, right: 0, top: 110, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 24 }}>
      <Img src={staticFile('art/burn.png')} style={{ width: 220, height: 220, objectFit: 'contain' }} /><Big size={190} color="#FF9600">31</Big>
    </Rise>
    <Rise at={T.losing} style={{ position: 'absolute', left: 60, right: 60, top: 470 }}>
      <div style={{ background: 'rgba(255,255,255,0.08)', borderRadius: 22, padding: '24px 30px', fontFamily: FONT.sans, fontSize: 40, color: '#fff' }}>Keep your 31-day streak alive!<br /><span style={{ color: 'rgba(255,255,255,0.6)', fontSize: 32 }}>One quick lesson is all it takes.</span></div>
    </Rise>
  </OutcomeCard>
);

const LeagueOutcome: React.FC = () => {
  const rows: [string, string][] = [['Kemi A.', '1,180 XP'], ['Daniel O.', '1,065 XP'], ['Priya S.', '940 XP'], ['Tunde B.', '905 XP']];
  return (
    <OutcomeCard inAt={T.race - 0.35} outAt={T.see - 0.2} header="weekly league">
      <div style={{ position: 'absolute', left: 60, right: 60, top: 110, display: 'flex', flexDirection: 'column', gap: 16 }}>
        {rows.map(([n, xp], i) => (
          <Rise key={i} at={T.race + i * 0.12}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 22, background: i === 0 ? 'rgba(78,165,255,0.25)' : 'rgba(255,255,255,0.06)', borderRadius: 20, padding: '22px 26px', fontFamily: FONT.sans, fontSize: 40, color: '#fff' }}>
              <span style={{ fontFamily: FONT.black, fontWeight: 800, width: 50 }}>{i + 1}</span><span style={{ flex: 1 }}>{n}</span><span style={{ fontFamily: FONT.mono, fontSize: 30, color: P.blue }}>{xp}</span>
            </div>
          </Rise>
        ))}
      </div>
      <Rise at={T.leagues} style={{ position: 'absolute', left: 60, top: 640 }}><Chip text="Bronze → Diamond" tone="blue" /></Rise>
    </OutcomeCard>
  );
};

const StopOutcome: React.FC = () => {
  const { t } = useT();
  const rows: [string, number][] = [['Lesson 1', 100], ['Lesson 2', 94], ['Lesson 3', 88], ['Lesson 4', 57], ['Lesson 5', 52]];
  return (
    <OutcomeCard inAt={T.see - 0.35} outAt={T.subscribe - 0.2} header="teyro studio · where learners stop">
      <div style={{ position: 'absolute', left: 60, right: 60, top: 110, display: 'flex', flexDirection: 'column', gap: 18 }}>
        {rows.map(([l, v], i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 18, fontFamily: FONT.mono, fontSize: 28, color: '#fff' }}>
            <span style={{ width: 150 }}>{l}</span>
            <div style={{ flex: 1, height: 32, borderRadius: 16, background: 'rgba(255,255,255,0.1)' }}><div style={{ width: `${v * prog(t, T.see + i * 0.08, T.see + 0.4 + i * 0.08)}%`, height: '100%', borderRadius: 16, background: i === 3 ? P.pinkGlow : P.blue }} /></div>
            <span style={{ width: 80, textAlign: 'right' }}>{v}%</span>
          </div>
        ))}
      </div>
      <Rise at={T.stop} style={{ position: 'absolute', left: 60, top: 480 }}><Chip text="lesson 4 is where most stop" tone="red" /></Rise>
      <Rise at={T.nudge} style={{ position: 'absolute', left: 60, right: 60, top: 580 }}>
        <div style={{ background: 'rgba(78,165,255,0.18)', border: `2px solid ${P.blue}`, borderRadius: 22, padding: '22px 26px', fontFamily: FONT.sans, fontSize: 32, color: '#fff' }}>
          Nudge sent to 9 quiet learners<br /><span style={{ color: 'rgba(255,255,255,0.7)' }}>"Hey Priya, lesson 4 trips everyone up. You've got this!"</span>
        </div>
      </Rise>
    </OutcomeCard>
  );
};

const PaidOutcome: React.FC = () => {
  const months = ['Sep', 'Oct', 'Nov', 'Dec'];
  return (
    <OutcomeCard inAt={T.subscribe - 0.35} outAt={T.thats} header="earnings · one learner">
      <div style={{ position: 'absolute', left: 60, right: 60, top: 110, display: 'flex', flexDirection: 'column', gap: 18 }}>
        <Rise at={T.subscribe}><Label size={28} color="rgba(255,255,255,0.6)">$10/month plan · you keep 70%</Label></Rise>
        {months.map((m, i) => (
          <Rise key={i} at={T.paid + i * 0.4}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.06)', borderRadius: 18, padding: '20px 26px', fontFamily: FONT.mono, fontSize: 34, color: '#fff' }}>
              {m}<span style={{ color: '#7CE38B', fontWeight: 700 }}>+$7.00</span>
            </div>
          </Rise>
        ))}
      </div>
      <Rise at={T.learning} style={{ position: 'absolute', left: 60, top: 680 }}><Big size={60} color="#fff">paid again, every month</Big></Rise>
    </OutcomeCard>
  );
};

const Reveal: React.FC = () => {
  const { frame, fps, t } = useT();
  const p = pop(frame, fps, T.thats);
  const out = prog(t, T.seventy - 0.3, T.seventy);
  if (t < T.thats - 0.1 || out >= 1) return null;
  return (
    <div style={{ position: 'absolute', left: 0, right: 0, top: 640, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 30, opacity: 1 - out }}>
      <div style={{ position: 'absolute', top: 40, width: 640, height: 640, borderRadius: 320, background: `radial-gradient(circle, ${P.blue}88, ${P.pinkGlow}33 50%, transparent 70%)`, transform: `scale(${p * 1.2})` }} />
      <div style={{ transform: `scale(${p})` }}><TeyLogo size={300} /></div>
    </div>
  );
};

const Features: React.FC = () => (
  <div style={{ position: 'absolute', left: 90, right: 90, top: 640, display: 'flex', flexDirection: 'column', gap: 26 }}>
    {([['keep 70% of every payment', T.seventy], ['free to publish', T.free], ['no camera needed', T.camera]] as const).map(([x, a], i) => (
      <Rise key={i} at={a - 0.05}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 24, background: 'rgba(255,255,255,0.07)', border: '2px solid rgba(255,255,255,0.12)', borderRadius: 26, padding: '30px 34px', fontFamily: FONT.sans, fontWeight: 700, fontSize: 52, color: '#fff' }}>
          <span style={{ width: 66, height: 66, borderRadius: 18, background: P.blue, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: FONT.mono, fontSize: 34 }}>{i + 1}</span>{x}
        </div>
      </Rise>
    ))}
  </div>
);

export const T2: React.FC = () => {
  const { t } = useT();
  return (
    <Stage slug="t2-quitting-cost" vo={vo} poses={POSES} sfx={SFX} darkFrom={DARK}
      modes={[{ t: 0, mode: 'hook' }, { t: T.most - 0.1, mode: 'items' }, { t: DARK, mode: 'dark' }, { t: T.thats - 0.1, mode: 'act' }, { t: T.seventy - 0.1, mode: 'dark' }, { t: T.go - 0.1, mode: 'act' }]}>
      {t < DARK ? (
        <TopBar chapters={[{ t: 0, label: '// 01 — the hidden cost' }, { t: T.most, label: '// 02 — who finishes' }]} counter={{ label: 'FINISHED', total: 20, ticks: [T.one] }} />
      ) : (
        <TopBar dark chapters={[{ t: DARK, label: '// 03 — picture this' }, { t: T.thats, label: '// 04 — meet teyro' }, { t: T.go, label: '// 05 — get started' }]}
          counter={{ label: 'REASONS THEY RETURN', total: 4, ticks: [T.streak, T.race, T.see, T.subscribe] }} />
      )}
      <Headline vo={vo} to={DARK} />
      <Headline vo={vo} from={DARK} dark />
      <RevenueHook />
      <PainCard />
      {t >= DARK && (
        <>
          <OpenDaily />
          <StreakOutcome />
          <LeagueOutcome />
          <StopOutcome />
          <PaidOutcome />
          <Reveal />
          {t < T.go - 0.1 && <Features />}
          <Cta from={T.go} screen="studio" solveAt={T.go + 0.8} chip={{ at: T.go + 0.2, text: 'teyro.app/teach' }} logoAt={T.go + 1.2} dark />
        </>
      )}
    </Stage>
  );
};
