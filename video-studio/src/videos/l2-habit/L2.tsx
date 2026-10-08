import React from 'react';
import { useCurrentFrame, useVideoConfig } from 'remotion';
import voData from './vo.json';
import { Stage, type Sfx } from '../../explainer/Stage';
import { Headline } from '../../explainer/Headline';
import { TopBar } from '../../explainer/TopBar';
import { PlugStrip } from '../../explainer/PlugStrip';
import { Card, Odometer, Rise, SaveTag, Stamp } from '../../explainer/Kit';
import { Big, Checklist, Chip, DrawPath, Label, Phase } from '../../explainer/Blocks';
import { Cta } from '../../explainer/Cta';
import { at as atW, type VO } from '../../explainer/vo';
import { FONT, P } from '../../explainer/tokens';
import { lerp, pop, prog, spr } from '../../explainer/anim';
import type { PoseName } from '../../host/Ada';

/** L2: "It doesn't take 21 days to build a habit" (Teyro, Learning pillar). Sources: ./script.json */
const vo = voData as unknown as VO;
const at = (w: string, n = 1) => atW(vo, w, n);
export const L2_DURATION = Math.ceil((vo.duration + 0.4) * 30);

const T = {
  days: at('days'), habit: at('habit.'), actually: at('actually'),
  first: at('First,'), plastic: at('plastic'), y1960: at('1960s,'), describing: at('describing'), adjust: at('adjust'), never: at('never'),
  second: at('Second,'), ucl: at('UCL'), n96: at('96'), n18: at('18'), n254: at('254'), typical: at('typical'), n66: at('66.'),
  third: at('Third,'), missing: at('missing'), kept: at('kept'),
  finally: at('finally,'), most: at('most'), same: at('same'), perfect: at('perfect.'),
  so: at('So'), pick: at('Pick'), keep: at('keep'), forgive: at('forgive'),
  thats: at("That's"), freezes: at('freezes'), go: at('Go'), teyro: at('Teyro.', 2),
};
const PLUGS = [{ t: T.first, tag: '01' }, { t: T.second, tag: '02' }, { t: T.third, tag: '03' }, { t: T.finally, tag: '04' }];

const POSES: { t: number; p: PoseName }[] = [
  { t: 0, p: 'present' }, { t: T.days, p: 'shrug' }, { t: T.actually - 0.3, p: 'think' },
  { t: T.first - 0.05, p: 'count1' }, { t: T.plastic, p: 'pointUpL' }, { t: T.describing, p: 'talk2' }, { t: T.never - 0.1, p: 'surprise' },
  { t: T.second - 0.05, p: 'count2' }, { t: T.n96, p: 'pointUpL' }, { t: T.n18, p: 'open' }, { t: T.n66 - 0.1, p: 'pointUpL' },
  { t: T.third - 0.05, p: 'count3' }, { t: T.missing, p: 'worried' }, { t: T.kept, p: 'thumbsUp' },
  { t: T.finally - 0.05, p: 'count4' }, { t: T.most, p: 'present' }, { t: T.perfect - 0.1, p: 'shrug' },
  { t: T.pick - 0.05, p: 'count1' }, { t: T.keep - 0.05, p: 'count2' }, { t: T.forgive - 0.05, p: 'count3' },
  { t: T.thats, p: 'present' }, { t: T.freezes, p: 'pointUpL' }, { t: T.go, p: 'wave' }, { t: T.teyro - 0.05, p: 'wink' },
];

const SFX: Sfx[] = [
  { t: 0.05, name: 'whoosh', vol: 0.22 }, ...[0.3, 0.5, 0.7, 0.9, 1.1].map((t) => ({ t, name: 'tick', vol: 0.12 })), { t: T.actually, name: 'slam', vol: 0.42 },
  ...PLUGS.flatMap((p) => [{ t: p.t, name: 'whoosh', vol: 0.18 }, { t: p.t + 0.25, name: 'pop', vol: 0.4 }]),
  { t: T.describing, name: 'pop2', vol: 0.25 }, { t: T.never, name: 'slam', vol: 0.42 },
  ...[0, 0.12, 0.24].map((d) => ({ t: T.n96 + d, name: 'tick', vol: 0.14 })), { t: T.n18, name: 'pop2', vol: 0.28 }, { t: T.n254, name: 'pop2', vol: 0.28 }, { t: T.n66, name: 'success', vol: 0.3 },
  { t: T.missing + 0.2, name: 'glitch', vol: 0.18 }, { t: T.kept, name: 'levelup', vol: 0.22 }, { t: T.perfect, name: 'pop', vol: 0.3 },
  { t: T.so, name: 'swish', vol: 0.22 }, ...[T.pick, T.keep, T.forgive].map((t) => ({ t: t + 0.2, name: 'pop2', vol: 0.3 })), { t: T.so + 0.3, name: 'pop', vol: 0.28 },
  { t: T.thats, name: 'whoosh', vol: 0.22 }, { t: T.freezes, name: 'coin', vol: 0.25 }, { t: T.go, name: 'notify', vol: 0.35 }, { t: T.teyro, name: 'shimmer', vol: 0.3 },
];

const useT = () => { const frame = useCurrentFrame(); const { fps } = useVideoConfig(); return { frame, fps, t: frame / fps }; };

const HookCalendar: React.FC = () => {
  const { t } = useT();
  const n = Math.min(21, Math.floor(prog(t, 0.2, 1.5) * 21));
  return (
    <Card x={100} y={600} w={620} h={420} inAt={0} outAt={T.first + 0.05} header="habit_tracker" tilt={-2}>
      <div style={{ position: 'absolute', left: 34, top: 78, display: 'grid', gridTemplateColumns: 'repeat(7, 66px)', gap: 12 }}>
        {Array.from({ length: 21 }).map((_, i) => (
          <div key={i} style={{ height: 66, borderRadius: 14, border: `3px solid ${i < n ? P.ink : P.line}`, background: i < n ? '#F3F1ED' : 'transparent', fontFamily: FONT.mono, fontSize: 22, display: 'flex', alignItems: 'center', justifyContent: 'center', color: P.ink }}>
            {i < n ? '✓' : i + 1}
          </div>
        ))}
      </div>
    </Card>
  );
};

const OriginCard: React.FC = () => (
  <Card x={90} y={590} w={900} h={860} inAt={T.first - 0.35} outAt={T.second + 0.05} header="where '21 days' came from">
    <div style={{ position: 'absolute', left: 60, top: 100, display: 'flex', gap: 40, alignItems: 'center' }}>
      <Rise at={T.first + 0.15}>
        <div style={{ width: 260, height: 360, borderRadius: 14, background: '#2B3A55', color: '#fff', padding: 26, boxShadow: `10px 10px 0 ${P.ink}`, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ fontFamily: FONT.serif, fontStyle: 'italic', fontSize: 46, lineHeight: 1 }}>Psycho-Cybernetics</div>
          <div style={{ fontFamily: FONT.mono, fontSize: 22, opacity: 0.8 }}>Maxwell Maltz<br />1960</div>
        </div>
      </Rise>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
        <Rise at={T.plastic}><Chip text="a plastic surgeon" tone="ink" /></Rise>
        <Rise at={T.y1960}><Chip text="in the 1960s" tone="soft" /></Rise>
      </div>
    </div>
    <Rise at={T.describing} style={{ position: 'absolute', left: 60, right: 60, top: 520 }}>
      <div style={{ background: '#F3F1ED', borderRadius: 22, padding: '28px 34px', fontFamily: FONT.sans, fontSize: 40, color: P.ink, lineHeight: 1.25 }}>
        His patients took about <b style={{ color: P.red }}>21 days</b> to adjust after surgery.
        <Label size={22}>an observation, not an experiment</Label>
      </div>
    </Rise>
    <Stamp text="not a study" at={T.never} x={330} y={330} size={66} />
  </Card>
);

const RangeCard: React.FC = () => {
  const { frame, fps, t } = useT();
  const W = 760, pos = (d: number) => (d / 260) * W;
  const m66 = pop(frame, fps, T.n66 - 0.05);
  return (
    <Card x={90} y={590} w={900} h={860} inAt={T.second - 0.35} outAt={T.third + 0.05} header="ucl study · 96 people" tag="Lally et al. 2010">
      <div style={{ position: 'absolute', left: 60, top: 100, display: 'flex', alignItems: 'center', gap: 22 }}>
        <Odometer to={96} a={T.n96 - 0.1} b={T.n96 + 0.4} size={90} />
        <Label size={30}>people, one new<br />daily habit each</Label>
      </div>
      <div style={{ position: 'absolute', left: 70, top: 330, width: W }}>
        <Label>days until it felt automatic</Label>
        <div style={{ position: 'relative', height: 300, marginTop: 20 }}>
          <div style={{ position: 'absolute', top: 120, left: 0, width: W, height: 26, borderRadius: 13, background: '#EEEBE6', border: `3px solid ${P.ink}` }} />
          <div style={{ position: 'absolute', top: 123, left: pos(18), height: 20, borderRadius: 10, background: P.red, width: (pos(254) - pos(18)) * prog(t, T.n18, T.n254 + 0.3) }} />
          {([[18, T.n18], [254, T.n254]] as const).map(([d, a]) => {
            const p = pop(frame, fps, a);
            return p > 0 ? (
              <div key={d} style={{ position: 'absolute', left: pos(d) - 60, top: 0, width: 120, textAlign: 'center', transform: `scale(${p})` }}>
                <Big size={64}>{d}</Big>
                <div style={{ width: 6, height: 40, background: P.ink, margin: '6px auto 0' }} />
              </div>
            ) : null;
          })}
          {m66 > 0 && (
            <div style={{ position: 'absolute', left: pos(66) - 90, top: 170, width: 180, textAlign: 'center', transform: `scale(${m66})` }}>
              <div style={{ width: 6, height: 30, background: P.red, margin: '0 auto 6px' }} />
              <Big size={80} color={P.red}>66</Big>
              <Label size={22} color={P.red}>typical</Label>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

const CurveCard: React.FC = () => {
  const { frame, fps } = useT();
  const miss = pop(frame, fps, T.missing + 0.1);
  return (
    <Card x={90} y={590} w={900} h={860} inAt={T.third - 0.35} outAt={T.finally + 0.05} header="what one missed day does">
      <svg width="800" height="560" viewBox="0 0 800 560" style={{ position: 'absolute', left: 50, top: 120 }}>
        <path d="M40 520 H780 M40 520 V40" stroke={P.line} strokeWidth="4" />
        <DrawPath d="M40 500 C 160 420, 260 330, 340 280" a={T.third} b={T.missing} stroke={P.red} width={12} len={420} />
        <DrawPath d="M340 280 C 430 230, 560 150, 760 120" a={T.kept - 0.4} b={T.kept + 0.5} stroke={P.red} width={12} len={460} />
        <g transform="translate(340 280)" opacity={miss}>
          <circle r={34 * miss} fill="#fff" stroke={P.ink} strokeWidth="5" />
          <path d="M-12 -12 L12 12 M12 -12 L-12 12" stroke={P.red} strokeWidth="6" strokeLinecap="round" />
        </g>
      </svg>
      <Rise at={T.missing + 0.2} style={{ position: 'absolute', left: 250, top: 470 }}><Chip text="missed a day" tone="soft" /></Rise>
      <Rise at={T.kept} style={{ position: 'absolute', right: 60, top: 140 }}><Chip text="still building ↑" tone="red" /></Rise>
      <div style={{ position: 'absolute', left: 60, bottom: 40 }}><Label>automaticity over time</Label></div>
    </Card>
  );
};

const WeeksCard: React.FC = () => {
  const { t } = useT();
  const misses = new Set([4, 12, 19]);
  return (
    <Card x={90} y={590} w={900} h={860} inAt={T.finally - 0.35} outAt={T.so + 0.05} header="most days, same situation">
      <div style={{ position: 'absolute', left: 60, top: 100, display: 'grid', gridTemplateColumns: 'repeat(7, 100px)', gap: 14 }}>
        {Array.from({ length: 28 }).map((_, i) => {
          const on = prog(t, T.most - 0.6 + i * 0.03, T.most - 0.4 + i * 0.03);
          const miss = misses.has(i);
          return (
            <div key={i} style={{ height: 90, borderRadius: 18, background: miss ? '#F3F1ED' : P.red, opacity: 0.25 + 0.75 * on, display: 'flex', alignItems: 'center', justifyContent: 'center', color: miss ? P.inkSoft : '#fff', fontFamily: FONT.black, fontWeight: 800, fontSize: 40 }}>
              {miss ? '–' : '✓'}
            </div>
          );
        })}
      </div>
      <Rise at={T.same} style={{ position: 'absolute', left: 60, top: 560 }}><Chip text="same time · same place" tone="ink" /></Rise>
      <Rise at={T.perfect} style={{ position: 'absolute', left: 60, top: 660 }}><Big serif color={P.red} size={76}>not perfect, just most days</Big></Rise>
    </Card>
  );
};

export const L2: React.FC = () => {
  const { frame, fps, t } = useT();
  const tuck = spr(frame, fps, T.first - 0.1, { damping: 15, stiffness: 120 });
  const ctaHide = prog(t, T.thats - 0.1, T.thats + 0.3);
  return (
    <Stage slug="l2-habit" vo={vo} poses={POSES} sfx={SFX}
      modes={[{ t: 0, mode: 'hook' }, { t: T.first - 0.1, mode: 'items' }, { t: T.thats - 0.1, mode: 'act' }]}>
      <TopBar
        chapters={[{ t: 0, label: '// 00 — the 21-day myth' }, { t: T.first, label: '// 01 — where it came from' }, { t: T.second, label: '// 02 — the real number' },
          { t: T.third, label: '// 03 — missing a day' }, { t: T.finally, label: '// 04 — what matters' }, { t: T.so, label: '// 05 — do this instead' }, { t: T.thats, label: '// 06 — keep it going' }]}
        counter={{ label: 'FINDINGS', total: 4, ticks: PLUGS.map((p) => p.t + 0.25) }}
      />
      <Headline vo={vo} />
      <HookCalendar />
      <Stamp text="myth" at={T.actually} outAt={T.first} x={300} y={760} size={92} />
      <div style={{ opacity: 1 - ctaHide }}>
        <PlugStrip label="FINDINGS" plugs={PLUGS} appear={T.habit} x={lerp(80, 60, tuck)} y={lerp(1060, 1620, tuck)} scale={lerp(0.82, 0.78, tuck)} />
      </div>
      <OriginCard />
      <RangeCard />
      <CurveCard />
      <WeeksCard />
      <Checklist inAt={T.so - 0.35} outAt={T.thats + 0.05} header="do this instead" tag="save it"
        items={[['Pick a time', T.pick], ['Keep it small', T.keep], ['Forgive a missed day', T.forgive]]} note="Maltz 1960 · Lally et al. 2010 (UCL)" />
      <SaveTag at={T.so + 0.3} x={680} y={560} outAt={T.thats} />
      <Cta from={T.thats} screen="streak" solveAt={T.freezes} chip={{ at: T.go, text: 'teyro.app' }} logoAt={T.teyro - 0.05} />
    </Stage>
  );
};
