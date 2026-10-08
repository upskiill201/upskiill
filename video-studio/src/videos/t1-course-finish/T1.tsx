import React from 'react';
import { Img, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import voData from './vo.json';
import { Stage, type Sfx } from '../../explainer/Stage';
import { Headline } from '../../explainer/Headline';
import { TopBar } from '../../explainer/TopBar';
import { PlugStrip } from '../../explainer/PlugStrip';
import { Bar, Card, Rise, SaveTag, Tick } from '../../explainer/Kit';
import { Big, Chip, DrawPath, Label } from '../../explainer/Blocks';
import { Cta } from '../../explainer/Cta';
import { at as atW, type VO } from '../../explainer/vo';
import { FONT, P } from '../../explainer/tokens';
import { lerp, pop, prog, spr } from '../../explainer/anim';
import type { PoseName } from '../../host/Ada';

/** T1: "4 things every coding course needs so students finish" (Teyro Teach). Sources: ./script.json */
const vo = voData as unknown as VO;
const at = (w: string, n = 1) => atW(vo, w, n);
export const T1_DURATION = Math.ceil((vo.duration + 0.4) * 30);

const T = {
  finish: at('finish.'),
  first: at('First,'), short: at('short'), compared: at('compared'), longer: at('longer'), fewer: at('fewer'),
  second: at('Second,'), checked: at('checked'), testing: at('Testing'), beats: at('beats'), feedback: at('feedback'), doubles: at('doubles'),
  third: at('Third,'), explain: at('explain'), own: at('own'), understood: at('understood.'),
  finally: at('finally,'), tomorrow: at('tomorrow.'), habits: at('Habits'), most: at('most'), streaks: at('streaks'), reminders: at('reminders'),
  so: at('So', 3), studio: at('Studio,'), four: at('four', 2), learn: at('learn,'), apply: at('apply,'), reflect: at('reflect,'), deepen: at('deepen.'),
  if_: at('If'), seventy: at('seventy'), go: at('Go'),
};
const PLUGS = [{ t: T.first, tag: '01' }, { t: T.second, tag: '02' }, { t: T.third, tag: '03' }, { t: T.finally, tag: '04' }];

const POSES: { t: number; p: PoseName }[] = [
  { t: 0, p: 'count4' }, { t: T.finish - 0.3, p: 'present' },
  { t: T.first - 0.05, p: 'count1' }, { t: T.compared, p: 'pointUpL' }, { t: T.fewer, p: 'shrug' },
  { t: T.second - 0.05, p: 'count2' }, { t: T.checked, p: 'thumbsUp' }, { t: T.feedback, p: 'pointUpL' },
  { t: T.third - 0.05, p: 'count3' }, { t: T.explain, p: 'talk2' }, { t: T.understood - 0.2, p: 'think' },
  { t: T.finally - 0.05, p: 'count4' }, { t: T.habits, p: 'present' }, { t: T.streaks, p: 'pointUpL' },
  { t: T.so, p: 'open' }, { t: T.learn - 0.05, p: 'count1' }, { t: T.apply - 0.05, p: 'count2' }, { t: T.reflect - 0.05, p: 'count3' }, { t: T.deepen - 0.05, p: 'count4' },
  { t: T.if_, p: 'present' }, { t: T.seventy, p: 'cheer' }, { t: T.go, p: 'wave' }, { t: T.go + 1.1, p: 'wink' },
];

const SFX: Sfx[] = [
  { t: 0.05, name: 'whoosh', vol: 0.22 }, { t: T.finish, name: 'pop2', vol: 0.28 },
  ...PLUGS.flatMap((p) => [{ t: p.t, name: 'whoosh', vol: 0.18 }, { t: p.t + 0.25, name: 'pop', vol: 0.4 }]),
  { t: T.fewer, name: 'slam', vol: 0.3 }, { t: T.checked, name: 'success', vol: 0.28 }, { t: T.doubles, name: 'levelup', vol: 0.22 },
  { t: T.explain, name: 'typing', vol: 0.2 }, { t: T.tomorrow, name: 'notify', vol: 0.3 }, { t: T.streaks, name: 'coin', vol: 0.22 },
  ...[T.learn, T.apply, T.reflect, T.deepen].map((t) => ({ t, name: 'pop2', vol: 0.3 })), { t: T.so + 0.3, name: 'pop', vol: 0.28 },
  { t: T.if_, name: 'whoosh', vol: 0.22 }, { t: T.seventy, name: 'coin', vol: 0.3 }, { t: T.go, name: 'notify', vol: 0.35 }, { t: T.go + 1.1, name: 'shimmer', vol: 0.3 },
];

const useT = () => { const frame = useCurrentFrame(); const { fps } = useVideoConfig(); return { frame, fps, t: frame / fps }; };

const HookCard: React.FC = () => {
  const { t } = useT();
  const left = Math.round(100 - prog(t, 0.3, T.finish) * 88);
  return (
    <Card x={100} y={600} w={640} h={440} inAt={0} outAt={T.first + 0.05} header="your_course · learners" tilt={-2}>
      <div style={{ position: 'absolute', left: 36, right: 36, top: 84, display: 'grid', gridTemplateColumns: 'repeat(10, 1fr)', gap: 10 }}>
        {Array.from({ length: 30 }).map((_, i) => <div key={i} style={{ height: 40, borderRadius: 20, background: i < left * 0.3 ? '#2B3A55' : '#E3DFD8' }} />)}
      </div>
      <div style={{ position: 'absolute', left: 36, bottom: 36, display: 'flex', alignItems: 'baseline', gap: 14 }}>
        <Big size={86} color={P.red}>{left}%</Big><Label size={28}>still going</Label>
      </div>
    </Card>
  );
};

const LengthCard: React.FC = () => (
  <Card x={90} y={590} w={900} h={860} inAt={T.first - 0.35} outAt={T.second + 0.05} header="online courses compared" tag="Jordan 2015">
    <svg width="800" height="560" viewBox="0 0 800 560" style={{ position: 'absolute', left: 50, top: 110 }}>
      <path d="M60 500 H780 M60 500 V30" stroke={P.ink} strokeWidth="5" />
      <DrawPath d="M80 80 C 260 160, 420 330, 760 440" a={T.compared} b={T.fewer + 0.3} stroke={P.red} width={12} len={900} />
      <text x="780" y="545" textAnchor="end" fontFamily="JetBrains Mono" fontSize="26" fill={P.inkSoft}>longer course →</text>
      <text x="20" y="40" fontFamily="JetBrains Mono" fontSize="26" fill={P.inkSoft}>% who finished</text>
    </svg>
    <Rise at={T.longer} style={{ position: 'absolute', right: 70, top: 470 }}><Chip text="longer" tone="ink" /></Rise>
    <Rise at={T.fewer} style={{ position: 'absolute', right: 70, top: 560 }}><Chip text="fewer finish" tone="red" /></Rise>
    <Rise at={T.short} style={{ position: 'absolute', left: 140, top: 140 }}><Chip text="short lessons" tone="green" /></Rise>
  </Card>
);

const CheckCard: React.FC = () => (
  <Card x={90} y={590} w={900} h={860} inAt={T.second - 0.35} outAt={T.third + 0.05} header="checked instantly">
    <Rise at={T.checked - 0.2} style={{ position: 'absolute', left: 60, right: 60, top: 100 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', border: `4px solid ${P.green}`, background: '#E9F7EE', borderRadius: 22, padding: '24px 30px', fontFamily: FONT.mono, fontSize: 38, color: P.ink }}>
        return total / len(nums)<Tick at={T.checked} size={60} />
      </div>
    </Rise>
    <div style={{ position: 'absolute', left: 60, right: 60, top: 300, display: 'flex', flexDirection: 'column', gap: 34 }}>
      <Bar label="REREADING" pct={40} a={T.testing} b={T.beats} color="#9A9DA6" width={640} />
      <Bar label="TESTING YOURSELF" pct={61} a={T.beats - 0.2} b={T.beats + 0.3} color={P.red} width={640} />
    </div>
    <Rise at={T.doubles} style={{ position: 'absolute', left: 60, top: 640, display: 'flex', alignItems: 'baseline', gap: 20 }}>
      <Chip text="+ feedback" tone="ink" /><Big size={100} color={P.red}>×1.9</Big>
    </Rise>
  </Card>
);

const ReflectCard: React.FC = () => {
  const { t } = useT();
  const text = 'A loop runs the same code for every item in a list.';
  const n = Math.floor(prog(t, T.own - 0.5, T.understood) * text.length);
  return (
    <Card x={90} y={590} w={900} h={860} inAt={T.third - 0.35} outAt={T.finally + 0.05} header="reflect">
      <div style={{ position: 'absolute', left: 60, right: 60, top: 110 }}>
        <Rise at={T.explain - 0.1}><Big size={58}>Explain it in your own words:</Big></Rise>
        <div style={{ marginTop: 34, minHeight: 240, border: `4px solid ${P.ink}`, borderRadius: 22, padding: '26px 30px', fontFamily: FONT.sans, fontSize: 44, color: P.ink, lineHeight: 1.3 }}>
          {text.slice(0, n)}<span style={{ opacity: Math.floor(t * 2) % 2 ? 1 : 0 }}>|</span>
        </div>
        <Rise at={T.understood} style={{ marginTop: 30 }}><Chip text="now you know you know it" tone="red" /></Rise>
      </div>
    </Card>
  );
};

const ComeBackCard: React.FC = () => {
  const { frame, fps } = useT();
  const n = pop(frame, fps, T.finally + 0.2);
  return (
    <Card x={90} y={590} w={900} h={860} inAt={T.finally - 0.35} outAt={T.so + 0.05} header="a reason to come back">
      <div style={{ position: 'absolute', left: 60, right: 60, top: 100, transform: `translateY(${(1 - n) * -60}px)`, opacity: n }}>
        <div style={{ display: 'flex', gap: 22, alignItems: 'center', background: '#F3F1ED', borderRadius: 26, padding: '24px 28px' }}>
          <Img src={staticFile('tey-tile.png')} style={{ width: 90, height: 90, borderRadius: 20 }} />
          <div style={{ fontFamily: FONT.sans, fontSize: 36, color: P.ink, lineHeight: 1.25 }}><b>Keep your 9-day streak alive!</b><br /><span style={{ color: P.inkSoft }}>One quick lesson is all it takes.</span></div>
        </div>
      </div>
      <Rise at={T.streaks - 0.1} style={{ position: 'absolute', left: 0, right: 0, top: 360, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 20 }}>
        <Img src={staticFile('art/burn.png')} style={{ width: 170, height: 170, objectFit: 'contain' }} /><Big size={140} color="#FF9600">9</Big>
      </Rise>
      <Rise at={T.most} style={{ position: 'absolute', left: 60, top: 620 }}><Chip text="habits = showing up most days" tone="ink" /></Rise>
    </Card>
  );
};

const StepsCard: React.FC = () => {
  const { frame, fps } = useT();
  const steps: [string, string, number][] = [['Learn', 'one idea', T.learn], ['Apply', 'checked instantly', T.apply], ['Reflect', 'own words', T.reflect], ['Deepen', 'go further', T.deepen]];
  return (
    <Card x={90} y={640} w={900} h={700} inAt={T.so - 0.35} outAt={T.if_ + 0.05} header="every lesson in teyro studio" tag="save it">
      <div style={{ position: 'absolute', left: 50, right: 50, top: 110, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 22 }}>
        {steps.map(([name, sub, a], i) => {
          const p = pop(frame, fps, a - 0.05);
          return (
            <div key={i} style={{ height: 230, borderRadius: 24, border: `4px solid ${p > 0.5 ? P.red : P.line}`, background: p > 0.5 ? '#FFF6F4' : '#FAF8F5', padding: '26px 28px', transform: `scale(${0.92 + 0.08 * Math.min(1, p)})` }}>
              <Label size={24}>0{i + 1}</Label>
              <Big size={64} color={p > 0.5 ? P.red : P.ink}>{name}</Big>
              <div style={{ marginTop: 8 }}><Label size={26}>{sub}</Label></div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};

export const T1: React.FC = () => {
  const { frame, fps, t } = useT();
  const tuck = spr(frame, fps, T.first - 0.1, { damping: 15, stiffness: 120 });
  const ctaHide = prog(t, T.if_ - 0.1, T.if_ + 0.3);
  return (
    <Stage slug="t1-course-finish" vo={vo} poses={POSES} sfx={SFX}
      modes={[{ t: 0, mode: 'hook' }, { t: T.first - 0.1, mode: 'items' }, { t: T.if_ - 0.1, mode: 'act' }]}>
      <TopBar
        chapters={[{ t: 0, label: '// 00 — courses people finish' }, { t: T.first, label: '// 01 — short lessons' }, { t: T.second, label: '// 02 — instant checks' },
          { t: T.third, label: '// 03 — explain it back' }, { t: T.finally, label: '// 04 — come back tomorrow' }, { t: T.so, label: '// 05 — four steps' }, { t: T.if_, label: '// 06 — teach on teyro' }]}
        counter={{ label: 'MUST-HAVES', total: 4, ticks: PLUGS.map((p) => p.t + 0.25) }}
      />
      <Headline vo={vo} />
      <HookCard />
      <div style={{ opacity: 1 - ctaHide }}>
        <PlugStrip label="MUST-HAVES" plugs={PLUGS} appear={T.finish - 0.3} x={lerp(80, 60, tuck)} y={lerp(1080, 1620, tuck)} scale={lerp(0.82, 0.78, tuck)} />
      </div>
      <LengthCard />
      <CheckCard />
      <ReflectCard />
      <ComeBackCard />
      <StepsCard />
      <SaveTag at={T.so + 0.3} x={680} y={560} outAt={T.if_} />
      <Cta from={T.if_} screen="studio" solveAt={T.seventy} chip={{ at: T.go, text: 'teyro.app/teach' }} logoAt={T.go + 1.1} />
    </Stage>
  );
};
