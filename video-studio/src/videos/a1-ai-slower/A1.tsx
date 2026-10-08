import React from 'react';
import { useCurrentFrame, useVideoConfig } from 'remotion';
import voData from './vo.json';
import { Stage, type Sfx } from '../../explainer/Stage';
import { Headline } from '../../explainer/Headline';
import { TopBar } from '../../explainer/TopBar';
import { PlugStrip } from '../../explainer/PlugStrip';
import { Bar, Card, Odometer, Rise, SaveTag, Stamp } from '../../explainer/Kit';
import { Big, Chip, Label, Phase } from '../../explainer/Blocks';
import { Cta } from '../../explainer/Cta';
import { at as atW, type VO } from '../../explainer/vo';
import { FONT, P } from '../../explainer/tokens';
import { lerp, pop, prog, spr } from '../../explainer/anim';
import type { PoseName } from '../../host/Ada';

/** A1: "AI made expert coders 19% slower" (Teyro, AI pillar). Sources: ./script.json */
const vo = voData as unknown as VO;
const at = (w: string, n = 1) => atW(vo, w, n);
export const A1_DURATION = Math.ceil((vo.duration + 0.4) * 30);

const T = {
  n19: at('19'), slower: at('slower.'), thought: at('thought'), faster: at('faster.'),
  first: at('First,'), metr: at('METR'), n16: at('16'), devs: at('developers'), n246: at('246'), tasks: at('tasks'), knew: at('knew'),
  second: at('Second,'), allowed: at('allowed,'), n19b: at('19', 2), longer: at('longer.'), believed: at('believed'), n20: at('20'),
  third: at('Third,'), reviewing: at('reviewing'), fixing: at('fixing'), almost: at('almost'), quite: at('quite.'),
  finally: at('finally,'), stack: at('Stack'), almost2: at('almost', 2), number: at('number'),
  so: at('So'), rewards: at('rewards'), spot: at('spot'), almost3: at('almost.', 3),
  if_: at('If'), fix: at('fix'), bio: at('bio.'), teyro: at('Teyro.'),
};
const PLUGS = [{ t: T.first, tag: '01' }, { t: T.second, tag: '02' }, { t: T.third, tag: '03' }, { t: T.finally, tag: '04' }];

const POSES: { t: number; p: PoseName }[] = [
  { t: 0, p: 'present' }, { t: T.n19, p: 'surprise' }, { t: T.thought, p: 'shrug' },
  { t: T.first - 0.05, p: 'count1' }, { t: T.metr, p: 'pointUpL' }, { t: T.n246, p: 'open' },
  { t: T.second - 0.05, p: 'count2' }, { t: T.n19b, p: 'worried' }, { t: T.believed, p: 'think' },
  { t: T.third - 0.05, p: 'count3' }, { t: T.reviewing, p: 'pointUpL' }, { t: T.almost, p: 'shrug' },
  { t: T.finally - 0.05, p: 'count4' }, { t: T.stack, p: 'present' }, { t: T.number, p: 'pointUpL' },
  { t: T.so, p: 'talk2' }, { t: T.rewards, p: 'fist' }, { t: T.spot, p: 'pointUpL' },
  { t: T.if_, p: 'present' }, { t: T.fix + 0.4, p: 'thumbsUp' }, { t: T.bio + 0.1, p: 'wave' }, { t: T.teyro - 0.05, p: 'wink' },
];

const SFX: Sfx[] = [
  { t: 0.05, name: 'whoosh', vol: 0.22 }, ...[0, 0.12, 0.24].map((d) => ({ t: T.n19 + d, name: 'tick', vol: 0.14 })), { t: T.slower, name: 'slam', vol: 0.4 }, { t: T.faster, name: 'pop2', vol: 0.3 },
  ...PLUGS.flatMap((p) => [{ t: p.t, name: 'whoosh', vol: 0.18 }, { t: p.t + 0.25, name: 'pop', vol: 0.4 }]),
  ...[0, 0.12, 0.24].map((d) => ({ t: T.n16 + d, name: 'tick', vol: 0.13 })), ...[0, 0.12, 0.24, 0.36].map((d) => ({ t: T.n246 + d, name: 'tick', vol: 0.13 })),
  { t: T.longer, name: 'slam', vol: 0.32 }, { t: T.believed, name: 'pop2', vol: 0.28 },
  { t: T.reviewing, name: 'scan', vol: 0.18 }, { t: T.almost, name: 'slam', vol: 0.38 }, { t: T.number, name: 'pop', vol: 0.32 },
  { t: T.so + 0.2, name: 'pop', vol: 0.28 }, { t: T.rewards, name: 'levelup', vol: 0.22 }, { t: T.spot, name: 'scan', vol: 0.2 },
  { t: T.if_, name: 'whoosh', vol: 0.22 }, { t: T.fix + 0.4, name: 'success', vol: 0.28 }, { t: T.bio, name: 'notify', vol: 0.35 }, { t: T.teyro, name: 'shimmer', vol: 0.3 },
];

const useT = () => { const frame = useCurrentFrame(); const { fps } = useVideoConfig(); return { frame, fps, t: frame / fps }; };

const HookCard: React.FC = () => (
  <Card x={100} y={600} w={640} h={440} inAt={0} outAt={T.first + 0.05} header="stopwatch" tilt={-2}>
    <div style={{ position: 'absolute', left: 40, top: 90, display: 'flex', alignItems: 'baseline', gap: 6 }}>
      <Big size={150} color={P.red}>+</Big><Odometer to={19} a={T.n19 - 0.1} b={T.slower} size={130} box={false} color={P.red} /><Big size={110} color={P.red}>%</Big>
    </div>
    <div style={{ position: 'absolute', left: 44, top: 270 }}><Label size={28}>time on each task, with AI</Label></div>
    <Rise at={T.faster - 0.1} style={{ position: 'absolute', left: 40, top: 330 }}><Chip text="what they felt: faster" tone="soft" /></Rise>
  </Card>
);

const StudyCard: React.FC = () => (
  <Card x={90} y={590} w={900} h={860} inAt={T.first - 0.35} outAt={T.second + 0.05} header="study · METR" tag="randomised trial">
    <div style={{ position: 'absolute', left: 60, top: 100 }}>
      <Rise at={T.n16 - 0.1}><div style={{ display: 'flex', alignItems: 'center', gap: 24 }}><Odometer to={16} a={T.n16 - 0.1} b={T.n16 + 0.4} size={96} /><Label size={30}>experienced<br />developers</Label></div></Rise>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(8, 64px)', gap: 12, marginTop: 30 }}>
        {Array.from({ length: 16 }).map((_, i) => (
          <Rise key={i} at={T.devs + i * 0.03}><div style={{ width: 64, height: 64, borderRadius: 32, background: i % 3 ? '#2B3A55' : P.ink, border: `4px solid ${P.paper}` }} /></Rise>
        ))}
      </div>
    </div>
    <div style={{ position: 'absolute', left: 60, top: 470 }}>
      <Rise at={T.n246 - 0.1}><div style={{ display: 'flex', alignItems: 'center', gap: 24 }}><Odometer to={246} a={T.n246 - 0.1} b={T.tasks} size={96} /><Label size={30}>real tasks</Label></div></Rise>
      <Rise at={T.knew - 0.6} style={{ marginTop: 34 }}><Chip text="in code they already knew well" tone="ink" /></Rise>
    </div>
  </Card>
);

const TimeCard: React.FC = () => (
  <Card x={90} y={590} w={900} h={860} inAt={T.second - 0.35} outAt={T.third + 0.05} header="time per task">
    <div style={{ position: 'absolute', left: 60, right: 60, top: 110, display: 'flex', flexDirection: 'column', gap: 48 }}>
      <Bar label="AI NOT ALLOWED" pct={70} a={T.allowed - 0.4} b={T.allowed + 0.2} color="#9A9DA6" width={640} value={<Label size={30}>100%</Label>} />
      <Bar label="AI ALLOWED · measured" pct={83} a={T.n19b - 0.2} b={T.longer} color={P.red} width={640} value={<Big size={52} color={P.red}>+19%</Big>} />
      <div style={{ opacity: prog(useCurrentFrame() / 30, T.believed - 0.2, T.believed + 0.1) }}>
        <Bar label="AI ALLOWED · what they believed" pct={56} a={T.believed} b={T.n20 + 0.3} color="#7CC8A0" width={640} value={<Big size={52} color={P.green}>−20%</Big>} />
      </div>
    </div>
    <Rise at={T.n20 + 0.3} style={{ position: 'absolute', left: 60, bottom: 60 }}><Big serif color={P.red} size={64}>they felt faster. they weren't.</Big></Rise>
  </Card>
);

const ReviewCard: React.FC = () => {
  const { t } = useT();
  const lines = ['const total = items.reduce(', '  (sum, i) => sum + i.price, 0)', 'if (total > limit) {', '  applyDiscount(total * 0.1)', '}'];
  return (
    <Card x={90} y={590} w={900} h={860} inAt={T.third - 0.35} outAt={T.finally + 0.05} header="ai suggestion" tag="review">
      <div style={{ position: 'absolute', left: 50, right: 50, top: 100, background: '#16181D', borderRadius: 22, padding: '30px 34px', fontFamily: FONT.mono, fontSize: 32, lineHeight: 1.6, color: '#E6E6E6' }}>
        {lines.map((l, i) => {
          const bad = i === 3;
          const scanned = t > T.reviewing + i * 0.25;
          return <div key={i} style={{ whiteSpace: 'pre', color: bad && t > T.almost ? '#FF8A80' : scanned ? '#9BE7A6' : '#E6E6E6', background: bad && t > T.almost ? 'rgba(224,53,43,0.25)' : 'transparent', borderRadius: 6 }}>{l}</div>;
        })}
      </div>
      <div style={{ position: 'absolute', left: 50, top: 470, display: 'flex', gap: 18 }}>
        <Rise at={T.reviewing}><Chip text="review" tone="ink" /></Rise>
        <Rise at={T.fixing}><Chip text="fix" tone="ink" /></Rise>
        <Rise at={T.fixing + 0.4}><Chip text="review again" tone="soft" /></Rise>
      </div>
      <Stamp text="almost right" at={T.almost} x={190} y={600} size={68} />
    </Card>
  );
};

const SurveyCard: React.FC = () => (
  <Card x={90} y={590} w={900} h={860} inAt={T.finally - 0.35} outAt={T.so + 0.05} header="stack overflow developer survey">
    <div style={{ position: 'absolute', left: 60, right: 60, top: 110 }}>
      <Rise at={T.stack - 0.1}><Big size={84}>Stack Overflow</Big></Rise>
      <Rise at={T.stack + 0.5} style={{ marginTop: 10 }}><Label size={30}>developer survey · biggest frustration with AI tools</Label></Rise>
      <Rise at={T.almost2 - 0.1} style={{ marginTop: 40 }}>
        <div style={{ display: 'flex', gap: 26, alignItems: 'center', border: `4px solid ${P.red}`, borderRadius: 24, padding: '30px 34px', background: '#FFF6F4' }}>
          <Big size={110} color={P.red}>#1</Big>
          <div style={{ fontFamily: FONT.sans, fontWeight: 700, fontSize: 46, color: P.ink, lineHeight: 1.15 }}>"AI solutions that are almost right, but not quite"</div>
        </div>
      </Rise>
      <Rise at={T.number + 0.2} style={{ marginTop: 34 }}><Label size={24}>Stack Overflow Developer Survey 2025</Label></Rise>
    </div>
  </Card>
);

const RewardCard: React.FC = () => (
  <Card x={90} y={640} w={900} h={700} inAt={T.so - 0.35} outAt={T.if_ + 0.05} header="what that means" tag="save it">
    <div style={{ position: 'absolute', left: 60, right: 60, top: 110, display: 'flex', flexDirection: 'column', gap: 30 }}>
      <Rise at={T.so}><div style={{ display: 'flex', gap: 20, alignItems: 'center' }}><Chip text="AI writes" tone="soft" /><Big size={50}>→</Big><Chip text="you check" tone="ink" /></div></Rise>
      <Rise at={T.rewards}><Big size={80}>knowing how to code</Big></Rise>
      <Rise at={T.rewards + 0.3}><Big serif color={P.red} size={86}>is the edge.</Big></Rise>
      <Rise at={T.spot}><Chip text="someone has to spot the almost" tone="red" /></Rise>
    </div>
  </Card>
);

export const A1: React.FC = () => {
  const { frame, fps, t } = useT();
  const tuck = spr(frame, fps, T.first - 0.1, { damping: 15, stiffness: 120 });
  const ctaHide = prog(t, T.if_ - 0.1, T.if_ + 0.3);
  return (
    <Stage slug="a1-ai-slower" vo={vo} poses={POSES} sfx={SFX}
      modes={[{ t: 0, mode: 'hook' }, { t: T.first - 0.1, mode: 'items' }, { t: T.if_ - 0.1, mode: 'act' }]}>
      <TopBar
        chapters={[{ t: 0, label: '// 00 — the 19% problem' }, { t: T.first, label: '// 01 — the study' }, { t: T.second, label: '// 02 — the result' },
          { t: T.third, label: '// 03 — why' }, { t: T.finally, label: '// 04 — not just them' }, { t: T.so, label: '// 05 — what it means' }, { t: T.if_, label: '// 06 — learn to check' }]}
        counter={{ label: 'EVIDENCE', total: 4, ticks: PLUGS.map((p) => p.t + 0.25) }}
      />
      <Headline vo={vo} />
      <HookCard />
      <div style={{ opacity: 1 - ctaHide }}>
        <PlugStrip label="EVIDENCE" plugs={PLUGS} appear={T.faster} x={lerp(80, 60, tuck)} y={lerp(1080, 1620, tuck)} scale={lerp(0.82, 0.78, tuck)} />
      </div>
      <StudyCard />
      <TimeCard />
      <ReviewCard />
      <SurveyCard />
      <RewardCard />
      <SaveTag at={T.so + 0.3} x={680} y={560} outAt={T.if_} />
      <Cta from={T.if_} screen="bug" solveAt={T.fix + 0.4} chip={{ at: T.bio, text: 'LINK IN BIO' }} logoAt={T.teyro - 0.05} />
    </Stage>
  );
};
