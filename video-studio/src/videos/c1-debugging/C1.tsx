import React from 'react';
import { useCurrentFrame, useVideoConfig } from 'remotion';
import voData from './vo.json';
import { Stage, type Sfx } from '../../explainer/Stage';
import { Headline } from '../../explainer/Headline';
import { TopBar } from '../../explainer/TopBar';
import { PlugStrip } from '../../explainer/PlugStrip';
import { Card, Rise, SaveTag, Tick } from '../../explainer/Kit';
import { Big, Checklist, Chip, Label } from '../../explainer/Blocks';
import { Cta } from '../../explainer/Cta';
import { at as atW, type VO } from '../../explainer/vo';
import { FONT, P } from '../../explainer/tokens';
import { lerp, pop, prog, spr } from '../../explainer/anim';
import type { PoseName } from '../../host/Ada';

/** C1: "4 debugging moves seniors use" (Teyro, Coding pillar). Sources: ./script.json */
const vo = voData as unknown as VO;
const at = (w: string, n = 1) => atW(vo, w, n);
export const C1_DURATION = Math.ceil((vo.duration + 0.4) * 30);

const T = {
  seniors: at('seniors'), never: at('never'),
  first: at('First,'), bisect: at('bisect.'), good: at('good'), bad: at('bad'), searches: at('searches'), halves: at('halves'), broke: at('broke'),
  second: at('Second,'), logpoints: at('logpoints'), right: at('Right-click'), logs: at('logs'), without: at('without'),
  third: at('Third,'), conditional: at('conditional'), pauses: at('pauses'), true_: at('true,'), item: at('item'), thousand: at('thousand.'),
  finally: at('finally,'), rubber: at('rubber'), explain: at('Explain'), bug: at('bug'), before: at('before'),
  save: at('Save'), breaks: at('breaks.'),
  if_: at('If'), bio: at('bio.'), teyro: at('Teyro.'),
};
const PLUGS = [{ t: T.first, tag: '01' }, { t: T.second, tag: '02' }, { t: T.third, tag: '03' }, { t: T.finally, tag: '04' }];

const POSES: { t: number; p: PoseName }[] = [
  { t: 0, p: 'count4' }, { t: T.never - 0.1, p: 'shrug' },
  { t: T.first - 0.05, p: 'count1' }, { t: T.good, p: 'pointUpL' }, { t: T.searches, p: 'think' }, { t: T.broke, p: 'surprise' },
  { t: T.second - 0.05, p: 'count2' }, { t: T.right, p: 'pointUpL' }, { t: T.without, p: 'thumbsUp' },
  { t: T.third - 0.05, p: 'count3' }, { t: T.pauses, p: 'present' }, { t: T.item, p: 'pointUpL' },
  { t: T.finally - 0.05, p: 'count4' }, { t: T.explain, p: 'talk2' }, { t: T.bug, p: 'surprise' },
  { t: T.save, p: 'pointUpL' },
  { t: T.if_, p: 'present' }, { t: T.bio + 0.1, p: 'wave' }, { t: T.teyro - 0.05, p: 'wink' },
];

const SFX: Sfx[] = [
  { t: 0.05, name: 'whoosh', vol: 0.22 }, { t: T.never, name: 'slam', vol: 0.35 },
  ...PLUGS.flatMap((p) => [{ t: p.t, name: 'whoosh', vol: 0.18 }, { t: p.t + 0.25, name: 'pop', vol: 0.4 }]),
  ...[0, 0.35, 0.7, 1.05, 1.4].map((d) => ({ t: T.searches + d, name: 'blip', vol: 0.2 })), { t: T.broke, name: 'slam', vol: 0.35 },
  { t: T.right, name: 'blip', vol: 0.3 }, { t: T.logs, name: 'typing', vol: 0.18 },
  { t: T.pauses, name: 'tick', vol: 0.2 }, { t: T.item, name: 'slam', vol: 0.3 },
  { t: T.explain, name: 'pop2', vol: 0.25 }, { t: T.bug, name: 'success', vol: 0.3 },
  { t: T.save, name: 'pop', vol: 0.3 },
  { t: T.if_, name: 'whoosh', vol: 0.22 }, { t: T.if_ + 1.2, name: 'success', vol: 0.25 }, { t: T.bio, name: 'notify', vol: 0.35 }, { t: T.teyro, name: 'shimmer', vol: 0.3 },
];

const useT = () => { const frame = useCurrentFrame(); const { fps } = useVideoConfig(); return { frame, fps, t: frame / fps }; };

const HookCard: React.FC = () => (
  <Card x={100} y={600} w={640} h={420} inAt={0} outAt={T.first + 0.05} header="terminal" tilt={-2}>
    <div style={{ position: 'absolute', left: 30, right: 30, top: 74, bottom: 30, background: '#16181D', borderRadius: 18, padding: '22px 26px', fontFamily: FONT.mono, fontSize: 26, lineHeight: 1.6, color: '#E6E6E6' }}>
      <div>$ npm test</div>
      <div style={{ color: '#FF8A80' }}>✗ 1 failing</div>
      <div style={{ color: '#9A9DA6' }}>TypeError: cannot read 'price'</div>
      <div style={{ color: '#9A9DA6' }}>  at checkout.js:42</div>
    </div>
  </Card>
);

const BisectCard: React.FC = () => {
  const { t } = useT();
  const N = 16, badIdx = 11;
  // halving steps: [lo, hi] ranges shown over time
  const steps: [number, number][] = [[0, 15], [8, 15], [8, 11], [10, 11], [11, 11]];
  const k = Math.min(steps.length - 1, Math.floor(prog(t, T.searches, T.broke) * steps.length));
  const [lo, hi] = steps[k];
  return (
    <Card x={90} y={590} w={900} h={860} inAt={T.first - 0.35} outAt={T.second + 0.05} header="git bisect">
      <div style={{ position: 'absolute', left: 50, top: 100, background: '#16181D', borderRadius: 18, padding: '18px 24px', fontFamily: FONT.mono, fontSize: 26, color: '#E6E6E6', lineHeight: 1.6 }}>
        <div>$ git bisect start</div>
        <Rise at={T.good - 0.1}><div>$ git bisect <span style={{ color: '#7CE38B' }}>good</span> v1.2</div></Rise>
        <Rise at={T.bad - 0.1}><div>$ git bisect <span style={{ color: '#FF8A80' }}>bad</span> HEAD</div></Rise>
      </div>
      <div style={{ position: 'absolute', left: 50, right: 50, top: 340, display: 'flex', gap: 8 }}>
        {Array.from({ length: N }).map((_, i) => {
          const inRange = t >= T.searches && i >= lo && i <= hi;
          const found = t >= T.broke && i === badIdx;
          const isGood = t >= T.good && i === 0, isBad = t >= T.bad && i === N - 1;
          return (
            <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 40, height: 40, borderRadius: 20, background: found ? P.red : isGood ? P.green : isBad ? P.red : inRange ? P.ink : '#D8D4CC', transform: `scale(${found ? 1.4 : 1})`, boxShadow: found ? `0 0 24px ${P.red}` : 'none' }} />
              <div style={{ width: 4, height: 30, background: '#D8D4CC' }} />
            </div>
          );
        })}
      </div>
      <Rise at={T.searches + 0.2} style={{ position: 'absolute', left: 50, top: 470 }}><Chip text={`checking ${hi - lo + 1} commits`} tone="soft" /></Rise>
      <Rise at={T.broke} style={{ position: 'absolute', left: 50, top: 580 }}><Big size={64} color={P.red}>a3f9c2 broke it</Big></Rise>
      <Rise at={T.broke + 0.2} style={{ position: 'absolute', left: 50, top: 680 }}><Label size={26}>16 commits → found in 4 checks</Label></Rise>
    </Card>
  );
};

const LogpointCard: React.FC = () => {
  const { frame, fps, t } = useT();
  const menu = pop(frame, fps, T.right);
  const code = ['function total(items) {', '  let sum = 0', '  for (const i of items)', '    sum += i.price', '  return sum', '}'];
  return (
    <Card x={90} y={590} w={900} h={860} inAt={T.second - 0.35} outAt={T.third + 0.05} header="chrome devtools · sources">
      <div style={{ position: 'absolute', left: 40, right: 40, top: 90, background: '#1E1F24', borderRadius: 18, padding: '18px 0', fontFamily: FONT.mono, fontSize: 28, lineHeight: 1.7, color: '#E6E6E6' }}>
        {code.map((l, i) => (
          <div key={i} style={{ display: 'flex', whiteSpace: 'pre' }}>
            <span style={{ width: 70, textAlign: 'right', paddingRight: 18, color: i === 3 && t > T.logs ? '#fff' : '#777', background: i === 3 && t > T.logs ? '#D97706' : 'transparent', borderRadius: '0 8px 8px 0' }}>{i + 12}</span>
            <span>{l}</span>
          </div>
        ))}
      </div>
      {menu > 0 && t < T.logs && (
        <div style={{ position: 'absolute', left: 110, top: 330, transform: `scale(${menu})`, transformOrigin: 'left top', background: '#fff', border: `3px solid ${P.ink}`, borderRadius: 14, padding: '10px 0', fontFamily: FONT.sans, fontSize: 28, boxShadow: '0 12px 30px rgba(0,0,0,0.2)' }}>
          {['Add breakpoint', 'Add conditional breakpoint…', 'Add logpoint…'].map((x, i) => <div key={i} style={{ padding: '8px 26px', background: i === 2 ? '#E8ECFF' : 'transparent', fontWeight: i === 2 ? 700 : 500 }}>{x}</div>)}
        </div>
      )}
      <Rise at={T.logs} style={{ position: 'absolute', left: 40, right: 40, top: 520 }}>
        <div style={{ background: '#16181D', borderRadius: 16, padding: '18px 24px', fontFamily: FONT.mono, fontSize: 26, color: '#E6E6E6', lineHeight: 1.6 }}>
          <div style={{ color: '#9A9DA6' }}>Console</div>
          <div>i.price → 4.99</div><div>i.price → 12.00</div><div style={{ color: '#FF8A80' }}>i.price → undefined</div>
        </div>
      </Rise>
      <Rise at={T.without} style={{ position: 'absolute', left: 40, top: 760 }}><Chip text="no console.log added to your code" tone="ink" /></Rise>
    </Card>
  );
};

const ConditionalCard: React.FC = () => {
  const { t } = useT();
  const n = Math.round(prog(t, T.item - 0.2, T.thousand + 0.3) * 7342);
  return (
    <Card x={90} y={590} w={900} h={860} inAt={T.third - 0.35} outAt={T.finally + 0.05} header="conditional breakpoint">
      <Rise at={T.conditional} style={{ position: 'absolute', left: 50, right: 50, top: 100 }}>
        <div style={{ border: `3px solid ${P.ink}`, borderRadius: 18, padding: '20px 26px', fontFamily: FONT.mono, fontSize: 30 }}>
          <Label size={22}>Line 15: pause only if…</Label>
          <div style={{ marginTop: 10, color: '#D97706', fontWeight: 700 }}>i.price === undefined</div>
        </div>
      </Rise>
      <div style={{ position: 'absolute', left: 50, right: 50, top: 330, display: 'flex', alignItems: 'baseline', gap: 16 }}>
        <Label size={30}>items checked</Label>
        <Big size={80}>{Math.min(n, 7342).toLocaleString()}</Big><Label size={30}>/ 10,000</Label>
      </div>
      <div style={{ position: 'absolute', left: 50, right: 50, top: 470, display: 'grid', gridTemplateColumns: 'repeat(25, 1fr)', gap: 4 }}>
        {Array.from({ length: 200 }).map((_, i) => {
          const hit = i === 146;
          const shown = prog(t, T.pauses + i * 0.006, T.pauses + 0.2 + i * 0.006);
          return <div key={i} style={{ height: 22, borderRadius: 4, background: hit && t > T.item ? P.red : '#D8D4CC', opacity: shown, transform: `scale(${hit && t > T.item ? 1.6 : 1})` }} />;
        })}
      </div>
      <Rise at={T.item} style={{ position: 'absolute', left: 50, top: 720 }}><Chip text="paused on the one bad item" tone="red" /></Rise>
    </Card>
  );
};

const DuckCard: React.FC = () => {
  const { frame, fps } = useT();
  const d = pop(frame, fps, T.rubber);
  return (
    <Card x={90} y={590} w={900} h={860} inAt={T.finally - 0.35} outAt={T.save + 0.05} header="rubber duck debugging">
      <svg width="300" height="260" viewBox="0 0 300 260" style={{ position: 'absolute', left: 300, top: 110, transform: `scale(${d})` }}>
        <ellipse cx="160" cy="185" rx="120" ry="62" fill="#FFC800" stroke={P.ink} strokeWidth="6" />
        <circle cx="105" cy="110" r="62" fill="#FFC800" stroke={P.ink} strokeWidth="6" />
        <path d="M44 112 L4 124 L46 136 Z" fill="#FF9F1C" stroke={P.ink} strokeWidth="5" strokeLinejoin="round" />
        <circle cx="96" cy="96" r="9" fill={P.ink} />
      </svg>
      <div style={{ position: 'absolute', left: 60, right: 60, top: 420, display: 'flex', flexDirection: 'column', gap: 16 }}>
        {['"line 12 loops the items…"', '"line 13 adds the price…"', '"…but this item has no price."'].map((x, i) => (
          <Rise key={i} at={T.explain + i * 0.6}><div style={{ background: i === 2 ? '#FFF6F4' : '#F3F1ED', border: i === 2 ? `3px solid ${P.red}` : 'none', borderRadius: 18, padding: '16px 24px', fontFamily: FONT.sans, fontSize: 36, color: i === 2 ? P.red : P.ink, fontWeight: i === 2 ? 700 : 500 }}>{x}</div></Rise>
        ))}
      </div>
      <Rise at={T.bug} style={{ position: 'absolute', right: 60, top: 140 }}><div style={{ display: 'flex', alignItems: 'center', gap: 10 }}><Tick at={T.bug} size={60} /><Big size={44} color={P.green}>found it</Big></div></Rise>
    </Card>
  );
};

export const C1: React.FC = () => {
  const { frame, fps, t } = useT();
  const tuck = spr(frame, fps, T.first - 0.1, { damping: 15, stiffness: 120 });
  const ctaHide = prog(t, T.if_ - 0.1, T.if_ + 0.3);
  return (
    <Stage slug="c1-debugging" vo={vo} poses={POSES} sfx={SFX}
      modes={[{ t: 0, mode: 'hook' }, { t: T.first - 0.1, mode: 'items' }, { t: T.if_ - 0.1, mode: 'act' }]}>
      <TopBar
        chapters={[{ t: 0, label: '// 00 — something broke' }, { t: T.first, label: '// 01 — git bisect' }, { t: T.second, label: '// 02 — logpoints' },
          { t: T.third, label: '// 03 — conditional breakpoints' }, { t: T.finally, label: '// 04 — the duck' }, { t: T.save, label: '// 05 — save this' }, { t: T.if_, label: '// 06 — keep learning' }]}
        counter={{ label: 'MOVES', total: 4, ticks: PLUGS.map((p) => p.t + 0.25) }}
      />
      <Headline vo={vo} />
      <HookCard />
      <div style={{ opacity: 1 - ctaHide }}>
        <PlugStrip label="MOVES" plugs={PLUGS} appear={T.seniors} x={lerp(80, 60, tuck)} y={lerp(1060, 1620, tuck)} scale={lerp(0.82, 0.78, tuck)} />
      </div>
      <BisectCard />
      <LogpointCard />
      <ConditionalCard />
      <DuckCard />
      <Checklist inAt={T.save - 0.35} outAt={T.if_ + 0.05} header="4 debugging moves" tag="save it"
        items={[['git bisect', T.save], ['Logpoints', T.save + 0.25], ['Conditional breakpoints', T.save + 0.5], ['Rubber duck', T.save + 0.75]]} note="git-scm.com · developer.chrome.com" />
      <SaveTag at={T.save + 0.1} x={680} y={560} outAt={T.if_} />
      <Cta from={T.if_} screen="bug" solveAt={T.if_ + 1.2} chip={{ at: T.bio, text: 'LINK IN BIO' }} logoAt={T.teyro - 0.05} />
    </Stage>
  );
};
