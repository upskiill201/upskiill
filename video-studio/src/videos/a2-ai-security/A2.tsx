import React from 'react';
import { useCurrentFrame, useVideoConfig } from 'remotion';
import voData from './vo.json';
import { Stage, type Sfx } from '../../explainer/Stage';
import { Headline } from '../../explainer/Headline';
import { TopBar } from '../../explainer/TopBar';
import { PlugStrip } from '../../explainer/PlugStrip';
import { Bar, Card, Odometer, Rise, SaveTag, Stamp, Tick } from '../../explainer/Kit';
import { Big, Checklist, Chip, Label } from '../../explainer/Blocks';
import { Cta } from '../../explainer/Cta';
import { at as atW, type VO } from '../../explainer/vo';
import { FONT, P } from '../../explainer/tokens';
import { lerp, pop, prog, spr } from '../../explainer/anim';
import type { PoseName } from '../../host/Ada';

/** A2: "AI code passes security checks 56% of the time" (Teyro, AI pillar). Sources: ./script.json */
const vo = voData as unknown as VO;
const at = (w: string, n = 1) => atW(vo, w, n);
export const A2_DURATION = Math.ceil((vo.duration + 0.4) * 30);

const T = {
  runs: at('runs'), security: at('security'), n56: at('56'),
  first: at('First,'), veracode: at("Veracode's"), y2026: at('2026'), hundred: at('hundred'), models: at('models'),
  second: at('Second,'), compiled: at('compiled'), itRuns: at('runs', 2), safe: at('safe.'),
  third: at('Third,'), bigger: at('bigger'), built: at('built'), better: at('better.'),
  finally: at('finally,'), score: at('score'), year: at('year,'), smarter: at('smarter'),
  so: at('So', 2), secrets: at('secrets'), input: at('input'), who: at('who'),
  reading: at('Reading'), go: at('Go'), teyro: at('Teyro.', 2),
};
const PLUGS = [{ t: T.first, tag: '01' }, { t: T.second, tag: '02' }, { t: T.third, tag: '03' }, { t: T.finally, tag: '04' }];

const POSES: { t: number; p: PoseName }[] = [
  { t: 0, p: 'thumbsUp' }, { t: T.security - 0.1, p: 'worried' }, { t: T.n56, p: 'shrug' },
  { t: T.first - 0.05, p: 'count1' }, { t: T.veracode, p: 'pointUpL' }, { t: T.hundred, p: 'open' },
  { t: T.second - 0.05, p: 'count2' }, { t: T.compiled, p: 'thumbsUp' }, { t: T.itRuns, p: 'think' }, { t: T.safe, p: 'shrug' },
  { t: T.third - 0.05, p: 'count3' }, { t: T.bigger, p: 'pointUpL' }, { t: T.better, p: 'shrug' },
  { t: T.finally - 0.05, p: 'count4' }, { t: T.score, p: 'pointUpL' }, { t: T.smarter, p: 'surprise' },
  { t: T.secrets - 0.05, p: 'count1' }, { t: T.input - 0.05, p: 'count2' }, { t: T.who - 0.05, p: 'count3' },
  { t: T.reading, p: 'present' }, { t: T.go, p: 'wave' }, { t: T.teyro - 0.05, p: 'wink' },
];

const SFX: Sfx[] = [
  { t: 0.05, name: 'whoosh', vol: 0.22 }, { t: T.runs, name: 'success', vol: 0.25 }, { t: T.security, name: 'glitch', vol: 0.2 }, ...[0, 0.12, 0.24].map((d) => ({ t: T.n56 + d, name: 'tick', vol: 0.14 })),
  ...PLUGS.flatMap((p) => [{ t: p.t, name: 'whoosh', vol: 0.18 }, { t: p.t + 0.25, name: 'pop', vol: 0.4 }]),
  { t: T.hundred, name: 'pop2', vol: 0.25 }, { t: T.compiled, name: 'success', vol: 0.25 }, { t: T.safe, name: 'slam', vol: 0.36 },
  { t: T.bigger, name: 'pop2', vol: 0.25 }, { t: T.better, name: 'slam', vol: 0.32 }, { t: T.year, name: 'tick', vol: 0.2 }, { t: T.smarter, name: 'levelup', vol: 0.2 },
  { t: T.so + 0.2, name: 'pop', vol: 0.28 }, ...[T.secrets, T.input, T.who].map((t) => ({ t: t + 0.2, name: 'pop2', vol: 0.3 })),
  { t: T.reading, name: 'whoosh', vol: 0.22 }, { t: T.go, name: 'notify', vol: 0.35 }, { t: T.teyro, name: 'shimmer', vol: 0.3 },
];

const useT = () => { const frame = useCurrentFrame(); const { fps } = useVideoConfig(); return { frame, fps, t: frame / fps }; };

const HookCard: React.FC = () => {
  const { frame, fps } = useT();
  const ok = pop(frame, fps, T.runs);
  return (
    <Card x={100} y={600} w={640} h={440} inAt={0} outAt={T.first + 0.05} header="ai_generated.ts" tilt={-2}>
      <div style={{ position: 'absolute', left: 36, right: 36, top: 80, display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, transform: `scale(${0.9 + 0.1 * ok})`, opacity: ok }}><Tick at={T.runs} size={50} /><Big size={52}>runs ✓</Big></div>
        <Rise at={T.security}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
            <Label size={30}>security pass rate</Label>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline' }}><Odometer to={56} a={T.n56 - 0.15} b={T.n56 + 0.35} size={120} box={false} color={P.red} /><Big size={90} color={P.red}>%</Big></div>
        </Rise>
      </div>
    </Card>
  );
};

const ReportCard: React.FC = () => (
  <Card x={90} y={590} w={900} h={860} inAt={T.first - 0.35} outAt={T.second + 0.05} header="veracode · 2026 report" tag="GenAI code security">
    <div style={{ position: 'absolute', left: 60, top: 110, display: 'flex', alignItems: 'center', gap: 22 }}>
      <Big size={100}>100+</Big><Label size={32}>AI models<br />tested</Label>
    </div>
    <div style={{ position: 'absolute', left: 60, top: 300, display: 'grid', gridTemplateColumns: 'repeat(10, 66px)', gap: 12 }}>
      {Array.from({ length: 40 }).map((_, i) => (
        <Rise key={i} at={T.hundred + i * 0.015}><div style={{ width: 66, height: 66, borderRadius: 14, background: '#2B3A55', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontFamily: FONT.mono, fontSize: 18 }}>AI</div></Rise>
      ))}
    </div>
    <Rise at={T.models + 0.3} style={{ position: 'absolute', left: 60, top: 700 }}><Chip text="same coding tasks for every model" tone="ink" /></Rise>
  </Card>
);

const RunsVsSafeCard: React.FC = () => (
  <Card x={90} y={590} w={900} h={860} inAt={T.second - 0.35} outAt={T.third + 0.05} header="runs ≠ safe">
    <div style={{ position: 'absolute', left: 60, right: 60, top: 110, display: 'flex', flexDirection: 'column', gap: 50 }}>
      <Bar label="COMPILES · nearly always" pct={98} a={T.compiled - 0.2} b={T.compiled + 0.4} color={P.green} width={640} value={<Tick at={T.compiled + 0.4} size={56} />} />
      <Bar label="PASSES SECURITY CHECKS" pct={56} a={T.itRuns - 0.1} b={T.itRuns + 0.4} color={P.red} width={640} value={<Big size={52} color={P.red}>56%</Big>} />
    </div>
    <div style={{ position: 'absolute', left: 0, right: 0, top: 520, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 30 }}>
      <Rise at={T.itRuns}><Chip text="it runs" tone="green" size={40} /></Rise>
      <Rise at={T.safe - 0.25}><Big size={110} color={P.red}>≠</Big></Rise>
      <Rise at={T.safe}><Chip text="it's safe" tone="red" size={40} /></Rise>
    </div>
  </Card>
);

const ModelsCard: React.FC = () => (
  <Card x={90} y={590} w={900} h={860} inAt={T.third - 0.35} outAt={T.finally + 0.05} header="did any model do better?">
    <div style={{ position: 'absolute', left: 60, right: 60, top: 110, display: 'flex', flexDirection: 'column', gap: 40 }}>
      {[['Bigger models', T.bigger], ['Built for coding', T.built]].map(([l, a], i) => (
        <Rise key={i} at={a as number}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', border: `4px solid ${P.line}`, borderRadius: 24, padding: '34px 36px' }}>
            <Big size={60}>{l as string}</Big><Chip text="no safer" tone="soft" />
          </div>
        </Rise>
      ))}
    </div>
    <Stamp text="no better" at={T.better} x={250} y={560} size={80} />
  </Card>
);

const FlatCard: React.FC = () => {
  const { t } = useT();
  return (
    <Card x={90} y={590} w={900} h={860} inAt={T.finally - 0.35} outAt={T.so + 0.05} header="one year later">
      <svg width="800" height="520" viewBox="0 0 800 520" style={{ position: 'absolute', left: 50, top: 110 }}>
        <path d="M40 480 H780 M40 480 V30" stroke={P.line} strokeWidth="4" />
        <path d="M60 440 C 260 380, 460 200, 760 50" stroke={P.green} strokeWidth="10" fill="none" strokeLinecap="round" strokeDasharray="1000" strokeDashoffset={1000 * (1 - prog(t, T.smarter - 0.6, T.smarter + 0.4))} />
        <path d="M60 250 H760" stroke={P.red} strokeWidth="10" fill="none" strokeLinecap="round" strokeDasharray="720" strokeDashoffset={720 * (1 - prog(t, T.score, T.year + 0.3))} />
      </svg>
      <Rise at={T.year} style={{ position: 'absolute', left: 80, top: 300 }}><Chip text="security score: barely moved" tone="red" /></Rise>
      <Rise at={T.smarter} style={{ position: 'absolute', right: 70, top: 120 }}><Chip text="everything else: smarter" tone="green" /></Rise>
    </Card>
  );
};

export const A2: React.FC = () => {
  const { frame, fps, t } = useT();
  const tuck = spr(frame, fps, T.first - 0.1, { damping: 15, stiffness: 120 });
  const ctaHide = prog(t, T.reading - 0.1, T.reading + 0.3);
  return (
    <Stage slug="a2-ai-security" vo={vo} poses={POSES} sfx={SFX}
      modes={[{ t: 0, mode: 'hook' }, { t: T.first - 0.1, mode: 'items' }, { t: T.reading - 0.1, mode: 'act' }]}>
      <TopBar
        chapters={[{ t: 0, label: '// 00 — runs vs safe' }, { t: T.first, label: '// 01 — the report' }, { t: T.second, label: '// 02 — compiles ≠ secure' },
          { t: T.third, label: '// 03 — bigger isn’t safer' }, { t: T.finally, label: '// 04 — a year later' }, { t: T.so, label: '// 05 — before you ship' }, { t: T.reading, label: '// 06 — the real skill' }]}
        counter={{ label: 'FINDINGS', total: 4, ticks: PLUGS.map((p) => p.t + 0.25) }}
      />
      <Headline vo={vo} />
      <HookCard />
      <div style={{ opacity: 1 - ctaHide }}>
        <PlugStrip label="FINDINGS" plugs={PLUGS} appear={T.n56 + 0.3} x={lerp(80, 60, tuck)} y={lerp(1080, 1620, tuck)} scale={lerp(0.82, 0.78, tuck)} />
      </div>
      <ReportCard />
      <RunsVsSafeCard />
      <ModelsCard />
      <FlatCard />
      <Checklist inAt={T.so - 0.35} outAt={T.reading + 0.05} header="before you ship AI code" tag="save it"
        items={[['Where do secrets live?', T.secrets], ['What can user input do?', T.input], ['Who is allowed in?', T.who]]} note="Veracode 2026 · OWASP Top 10" />
      <SaveTag at={T.so + 0.3} x={680} y={560} outAt={T.reading} />
      <Cta from={T.reading} screen="bug" solveAt={T.reading + 1.1} chip={{ at: T.go, text: 'teyro.app' }} logoAt={T.teyro - 0.05} />
    </Stage>
  );
};
