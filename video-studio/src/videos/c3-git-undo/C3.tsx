import React from 'react';
import { useCurrentFrame, useVideoConfig } from 'remotion';
import voData from './vo.json';
import { Stage, type Sfx } from '../../explainer/Stage';
import { Headline } from '../../explainer/Headline';
import { TopBar } from '../../explainer/TopBar';
import { PlugStrip } from '../../explainer/PlugStrip';
import { Card, Odometer, Rise, SaveTag, Stamp, Tick } from '../../explainer/Kit';
import { Big, Checklist, Chip, Label, Phase } from '../../explainer/Blocks';
import { Cta } from '../../explainer/Cta';
import { at as atW, type VO } from '../../explainer/vo';
import { FONT, P } from '../../explainer/tokens';
import { lerp, pop, prog, spr } from '../../explainer/anim';
import type { PoseName } from '../../host/Ada';

/** C3: "Git can undo almost anything: 4 commands" (Teyro, Coding pillar). Sources: ./script.json */
const vo = voData as unknown as VO;
const at = (w: string, n = 1) => atW(vo, w, n);
export const C3_DURATION = Math.ceil((vo.duration + 0.4) * 30);

const T = {
  lose: at('lose'), secretly: at('secretly'), kept: at('kept'), four: at('four'), anything: at('anything.'),
  first: at('first'), reflog: at('reflog'), diary: at('diary'), branch: at('branch'), bad: at('bad'), reset: at('reset,'), find: at('find'), jump: at('jump'), back1: at('back.'),
  by: at('By'), thirty: at('thirty'), days: at('days.'),
  second: at('second'), restore: at('restore'), broke: at('Broke'), committed: at('committed?'), one: at('One'), before: at('before'), edits: at('edits.'),
  third: at('third'), stash: at('stash'), halfway: at('Halfway'), switch_: at('switch'), parks: at('parks'), pop_: at('pop'), brings: at('brings'),
  finally: at('finally,'), revert: at('revert'), pushed: at('pushed'), github: at('GitHub?'), dont: at("Don't"), history: at('history.'), revert2: at('Revert', 2), new_: at('new'), nobody: at('nobody'), breaks: at('breaks.'),
  recap: at('reflog', 2), rRestore: at('restore', 2), rStash: at('stash', 4), rRevert: at('revert', 3), undo: at('undo', 2), button: at('button.'),
  if_: at('If'), bio: at('bio.'), teyro: at('Teyro.'),
};
const PLUGS = [{ t: T.first, tag: '01' }, { t: T.second, tag: '02' }, { t: T.third, tag: '03' }, { t: T.finally, tag: '04' }];

const POSES: { t: number; p: PoseName }[] = [
  { t: 0, p: 'worried' }, { t: T.secretly - 0.1, p: 'wink' }, { t: T.four - 0.05, p: 'count4' },
  { t: T.first - 0.05, p: 'count1' }, { t: T.diary, p: 'pointUpL' }, { t: T.reset, p: 'surprise' }, { t: T.jump, p: 'thumbsUp' },
  { t: T.by, p: 'talk2' }, { t: T.thirty - 0.05, p: 'present' },
  { t: T.second - 0.05, p: 'count2' }, { t: T.broke, p: 'worried' }, { t: T.one, p: 'pointUpL' }, { t: T.before, p: 'thumbsUp' },
  { t: T.third - 0.05, p: 'count3' }, { t: T.halfway, p: 'think' }, { t: T.parks, p: 'pointUpL' }, { t: T.pop_, p: 'cheer' },
  { t: T.finally - 0.05, p: 'count4' }, { t: T.pushed, p: 'worried' }, { t: T.dont, p: 'shrug' }, { t: T.revert2, p: 'pointUpL' }, { t: T.nobody, p: 'thumbsUp' },
  { t: T.recap - 0.05, p: 'present' }, { t: T.undo, p: 'fist' },
  { t: T.if_, p: 'present' }, { t: T.bio + 0.1, p: 'wave' }, { t: T.teyro - 0.05, p: 'wink' },
];

const SFX: Sfx[] = [
  { t: 0.05, name: 'glitch', vol: 0.22 }, { t: T.lose, name: 'slam', vol: 0.3 }, { t: T.secretly, name: 'shimmer', vol: 0.3 },
  ...PLUGS.flatMap((p) => [{ t: p.t, name: 'whoosh', vol: 0.18 }, { t: p.t + 0.25, name: 'pop', vol: 0.4 }]),
  { t: T.diary, name: 'typing', vol: 0.18 }, { t: T.reset, name: 'blip', vol: 0.28 }, { t: T.find, name: 'scan', vol: 0.22 }, { t: T.jump, name: 'success', vol: 0.3 },
  ...[0, 0.12, 0.24, 0.36].map((d) => ({ t: T.thirty + d, name: 'tick', vol: 0.2 })),
  { t: T.broke, name: 'glitch', vol: 0.22 }, { t: T.one, name: 'typing', vol: 0.18 }, { t: T.before, name: 'success', vol: 0.28 },
  { t: T.switch_, name: 'blip', vol: 0.28 }, { t: T.parks, name: 'swish', vol: 0.28 }, { t: T.pop_, name: 'pop2', vol: 0.32 },
  { t: T.pushed, name: 'whoosh', vol: 0.2 }, { t: T.dont, name: 'slam', vol: 0.32 }, { t: T.new_, name: 'pop', vol: 0.32 }, { t: T.nobody, name: 'success', vol: 0.26 },
  ...[T.recap, T.rRestore, T.rStash, T.rRevert].map((t) => ({ t, name: 'pop', vol: 0.28 })),
  { t: T.if_, name: 'whoosh', vol: 0.22 }, { t: T.if_ + 1.2, name: 'success', vol: 0.25 }, { t: T.bio, name: 'notify', vol: 0.35 }, { t: T.teyro, name: 'shimmer', vol: 0.3 },
];

const useT = () => { const frame = useCurrentFrame(); const { fps } = useVideoConfig(); return { frame, fps, t: frame / fps }; };

const Term: React.FC<{ children: React.ReactNode; style?: React.CSSProperties }> = ({ children, style }) => (
  <div style={{ background: '#16181D', borderRadius: 18, padding: '18px 24px', fontFamily: FONT.mono, fontSize: 26, lineHeight: 1.6, color: '#E6E6E6', whiteSpace: 'pre', ...style }}>{children}</div>
);
const C = { green: '#7CE38B', red: '#FF8A80', grey: '#9A9DA6', yellow: '#FFD166' };

// ---------- hook ----------
const COMMITS = ['add checkout page', 'fix cart total', 'login form'];
const HookCard: React.FC = () => {
  const { t } = useT();
  const gone = t >= T.lose && t < T.secretly;
  const back = t >= T.secretly;
  return (
    <Card x={100} y={600} w={660} h={460} inAt={-0.35} outAt={T.first + 0.05} header="terminal" tilt={-2}>
      <Term style={{ position: 'absolute', left: 30, right: 30, top: 74, bottom: 30 }}>
        <div>$ git reset --hard HEAD~3</div>
        <div style={{ color: C.grey }}>HEAD is now at e4b1d07</div>
        {COMMITS.map((c, i) => (
          <div key={i} style={{ color: back ? C.green : gone ? C.red : '#E6E6E6', textDecoration: gone ? 'line-through' : 'none', opacity: gone ? 0.6 : 1 }}>
            {back ? '✓ ' : gone ? '✗ ' : '• '}{c}
          </div>
        ))}
      </Term>
      {gone && <Stamp text="gone?" at={T.lose} outAt={T.secretly} x={300} y={250} size={72} />}
      {back && <Rise at={T.secretly} style={{ position: 'absolute', right: 40, bottom: 44 }}><Chip text="still in the reflog" tone="green" size={26} /></Rise>}
    </Card>
  );
};

// ---------- 1: reflog ----------
const REFLOG: [string, string, string][] = [
  ['e4b1d07', 'HEAD@{0}', 'reset: moving to HEAD~3'],
  ['9f2c8a1', 'HEAD@{1}', 'commit: add checkout page'],
  ['3d7e5b0', 'HEAD@{2}', 'commit: fix cart total'],
  ['a18c4f2', 'HEAD@{3}', 'commit: login form'],
];
const ReflogCard: React.FC = () => {
  const { t } = useT();
  return (
    <Card x={90} y={590} w={900} h={860} inAt={T.first - 0.35} outAt={T.second + 0.05} header="git reflog" tag={t >= T.by ? 'default: 30 days' : undefined}>
      <Phase a={T.first - 0.3} b={T.by}>
        <Term style={{ position: 'absolute', left: 40, right: 40, top: 90, fontSize: 24 }}>
          <div>$ git reflog</div>
          {REFLOG.map(([h, ref, msg], i) => {
            const hiBad = i === 0 && t >= T.reset, hiGood = i === 1 && t >= T.find;
            return (
              <Rise key={i} at={T.diary + i * 0.15}>
                <div style={{ background: hiBad ? 'rgba(255,138,128,0.18)' : hiGood ? 'rgba(124,227,139,0.2)' : undefined, borderRadius: 8 }}>
                  <span style={{ color: C.yellow }}>{h}</span> <span style={{ color: C.grey }}>{ref}:</span> <span style={{ color: hiBad ? C.red : hiGood ? C.green : undefined }}>{msg}</span>
                </div>
              </Rise>
            );
          })}
        </Term>
        <Rise at={T.diary + 0.3} style={{ position: 'absolute', left: 40, top: 360 }}><Label size={26}>every move your branch made, newest first</Label></Rise>
        <Rise at={T.jump - 0.1} style={{ position: 'absolute', left: 40, right: 40, top: 430 }}>
          <Term><div>$ git reset --hard HEAD@{'{1}'}</div><div style={{ color: C.grey }}>HEAD is now at 9f2c8a1 add checkout page</div></Term>
        </Rise>
        <Rise at={T.back1} style={{ position: 'absolute', left: 40, top: 620, display: 'flex', alignItems: 'center', gap: 18 }}>
          <Tick at={T.back1} size={64} /><Big size={64} color={P.green}>3 commits back</Big>
        </Rise>
      </Phase>
      <Phase a={T.by} b={T.second + 0.3}>
        <div style={{ position: 'absolute', left: 60, top: 100, display: 'flex', alignItems: 'baseline', gap: 20 }}>
          <Odometer to={30} a={T.by} b={T.thirty + 0.2} size={170} /><Big size={90} serif color={P.red}>days</Big>
        </div>
        <div style={{ position: 'absolute', left: 60, right: 60, top: 340, display: 'grid', gridTemplateColumns: 'repeat(10, 1fr)', gap: 10 }}>
          {Array.from({ length: 30 }).map((_, i) => {
            const on = prog(t, T.by + 0.3 + i * 0.05, T.by + 0.5 + i * 0.05);
            return <div key={i} style={{ height: 60, borderRadius: 12, background: on > 0.5 ? P.ink : '#EEEBE6', border: `3px solid ${P.ink}`, opacity: 0.4 + 0.6 * on }} />;
          })}
        </div>
        <Rise at={T.days} style={{ position: 'absolute', left: 60, top: 620 }}><Label size={26}>lost commits stay findable · on your machine</Label></Rise>
        <Rise at={T.days + 0.1} style={{ position: 'absolute', left: 60, top: 680 }}><Chip text="gc.reflogExpireUnreachable = 30 days" tone="soft" size={24} /></Rise>
      </Phase>
    </Card>
  );
};

// ---------- 2: restore ----------
const RestoreCard: React.FC = () => {
  const { t } = useT();
  const broken = t >= T.broke && t < T.before;
  const fixed = t >= T.before;
  const lines: [string, string][] = [['const total = items', 'const total = itms'], ['  .map(i => i.price)', '  .map(i => i.prce)'], ['  .reduce((a, b) => a + b, 0);', '  .reduce((a, b) => a + b);']];
  return (
    <Card x={90} y={590} w={900} h={860} inAt={T.second - 0.35} outAt={T.third + 0.05} header="cart.js" tag={broken ? 'modified' : undefined}>
      <Term style={{ position: 'absolute', left: 40, right: 40, top: 90, fontSize: 25 }}>
        {lines.map(([ok, bad], i) => (
          <div key={i} style={{ color: broken ? C.red : fixed ? C.green : '#E6E6E6', background: broken ? 'rgba(255,138,128,0.12)' : undefined, borderRadius: 8 }}>{broken ? '- ' : '  '}{broken ? bad : ok}</div>
        ))}
      </Term>
      <Rise at={T.committed} style={{ position: 'absolute', left: 40, top: 310 }}><Chip text="not committed yet" tone="soft" /></Rise>
      <Rise at={T.one} style={{ position: 'absolute', left: 40, right: 40, top: 410 }}>
        <Term style={{ fontSize: 34 }}><div>$ git restore <span style={{ color: C.yellow }}>cart.js</span></div></Term>
      </Rise>
      <Rise at={T.before} style={{ position: 'absolute', left: 40, top: 580, display: 'flex', alignItems: 'center', gap: 18 }}>
        <Tick at={T.before} size={64} /><Big size={56} color={P.green}>back to before your edits</Big>
      </Rise>
      <Rise at={T.edits + 0.1} style={{ position: 'absolute', left: 40, top: 700 }}><Label size={24}>unstage instead: git restore --staged cart.js</Label></Rise>
    </Card>
  );
};

// ---------- 3: stash ----------
const StashCard: React.FC = () => {
  const { frame, fps, t } = useT();
  const parked = prog(t, T.parks, T.parks + 0.45);
  const popped = prog(t, T.pop_, T.pop_ + 0.45);
  const y = lerp(lerp(0, 330, parked), 0, popped);
  const err = t >= T.switch_ && t < T.parks;
  return (
    <Card x={90} y={590} w={900} h={860} inAt={T.third - 0.35} outAt={T.finally + 0.05} header="git stash">
      <div style={{ position: 'absolute', left: 40, top: 96, display: 'flex', gap: 14, alignItems: 'center' }}>
        <Chip text="feature/login" tone="ink" size={26} />
        <Rise at={T.halfway}><div style={{ width: 300, height: 26, borderRadius: 13, background: '#EEEBE6', border: `3px solid ${P.ink}`, overflow: 'hidden' }}><div style={{ width: `${50 * prog(t, T.halfway, T.halfway + 0.5)}%`, height: '100%', background: P.red }} /></div></Rise>
        <Rise at={T.halfway + 0.2}><Label size={24}>half done</Label></Rise>
      </div>
      {/* your changes, moving between the desk and the shelf */}
      <div style={{ position: 'absolute', left: 40, right: 40, top: 180 + y, display: 'flex', gap: 14 }}>
        {['login.js  +42', 'form.css  +18', 'api.js  +7'].map((f, i) => (
          <div key={i} style={{ flex: 1, background: '#FFF4CC', border: `3px solid ${P.ink}`, borderRadius: 16, padding: '16px 14px', fontFamily: FONT.mono, fontSize: 22, color: P.ink, textAlign: 'center', whiteSpace: 'pre' }}>{f}</div>
        ))}
      </div>
      {err && (
        <Rise at={T.switch_} style={{ position: 'absolute', left: 40, right: 40, top: 300 }}>
          <Term style={{ fontSize: 21, whiteSpace: 'normal' }}><div>$ git switch main</div><div style={{ color: C.red }}>error: Your local changes to the following files would be overwritten</div></Term>
        </Rise>
      )}
      {/* the shelf */}
      <div style={{ position: 'absolute', left: 40, right: 40, top: 470, height: 140, borderRadius: 20, border: `3px dashed ${P.inkSoft}`, opacity: t >= T.parks - 0.2 ? 1 : 0.35 }}>
        <div style={{ position: 'absolute', left: 18, bottom: 10, fontFamily: FONT.mono, fontSize: 22, color: P.inkSoft }}>stash@{'{0}'} · parked</div>
      </div>
      <Rise at={T.parks} style={{ position: 'absolute', left: 40, top: 650 }}><Term style={{ fontSize: 30 }}><div>$ git stash</div></Term></Rise>
      <Rise at={T.pop_} style={{ position: 'absolute', left: 400, top: 650 }}><Term style={{ fontSize: 30 }}><div>$ git stash <span style={{ color: C.green }}>pop</span></div></Term></Rise>
      {t >= T.brings && <div style={{ position: 'absolute', right: 50, top: 92, transform: `scale(${pop(frame, fps, T.brings)})` }}><Tick at={T.brings} size={60} /></div>}
    </Card>
  );
};

// ---------- 4: revert ----------
const RevertCard: React.FC = () => {
  const { t } = useT();
  const commits: [string, string, 'ok' | 'bad' | 'new'][] = [['a18c4f2', 'login form', 'ok'], ['3d7e5b0', 'fix cart total', 'ok'], ['c71e9aa', 'new pricing (bug!)', 'bad'], ['5be02d4', 'Revert "new pricing"', 'new']];
  return (
    <Card x={90} y={590} w={900} h={860} inAt={T.finally - 0.35} outAt={T.recap + 0.05} header="github · origin/main">
      <div style={{ position: 'absolute', left: 70, top: 110, width: 6, height: 520, background: '#D8D4CC' }} />
      <div style={{ position: 'absolute', left: 40, right: 40, top: 96, display: 'flex', flexDirection: 'column', gap: 26 }}>
        {commits.map(([h, msg, kind], i) => {
          const showAt = kind === 'bad' ? T.pushed : kind === 'new' ? T.new_ : T.finally + i * 0.15;
          const dot = kind === 'bad' ? P.red : kind === 'new' ? P.green : P.ink;
          return (
            <Rise key={i} at={showAt}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 22 }}>
                <div style={{ width: 66, height: 66, borderRadius: 33, background: dot, border: '5px solid #fff', boxShadow: `0 0 0 3px ${dot}`, flex: 'none' }} />
                <div style={{ flex: 1, background: kind === 'bad' ? '#FFF6F4' : kind === 'new' ? '#EAF8EF' : '#F3F1ED', border: kind === 'ok' ? 'none' : `3px solid ${dot}`, borderRadius: 18, padding: '16px 22px' }}>
                  <div style={{ fontFamily: FONT.mono, fontSize: 22, color: P.inkSoft }}>{h}{kind === 'bad' && t >= T.github ? ' · pushed' : ''}</div>
                  <div style={{ fontFamily: FONT.sans, fontWeight: 700, fontSize: 34, color: kind === 'bad' ? P.red : kind === 'new' ? P.green : P.ink }}>{msg}</div>
                </div>
              </div>
            </Rise>
          );
        })}
      </div>
      <Stamp text="no force push" at={T.dont} outAt={T.revert2} x={180} y={420} size={60} />
      <Rise at={T.revert2} style={{ position: 'absolute', left: 40, top: 640 }}><Term style={{ fontSize: 28 }}><div>$ git revert c71e9aa</div></Term></Rise>
      <Rise at={T.nobody} style={{ position: 'absolute', left: 40, top: 750, display: 'flex', alignItems: 'center', gap: 14 }}>
        <Tick at={T.nobody} size={50} /><Label size={28} color={P.ink}>history kept · teammates' work safe</Label>
      </Rise>
    </Card>
  );
};

export const C3: React.FC = () => {
  const { frame, fps, t } = useT();
  const tuck = spr(frame, fps, T.first - 0.1, { damping: 15, stiffness: 120 });
  const ctaHide = prog(t, T.if_ - 0.1, T.if_ + 0.3);
  return (
    <Stage slug="c3-git-undo" vo={vo} poses={POSES} sfx={SFX}
      modes={[{ t: 0, mode: 'hook' }, { t: T.first - 0.1, mode: 'items' }, { t: T.if_ - 0.1, mode: 'act' }]}>
      <TopBar
        chapters={[{ t: 0, label: '// 00 — lost your code?' }, { t: T.first, label: '// 01 — git reflog' }, { t: T.second, label: '// 02 — git restore' },
          { t: T.third, label: '// 03 — git stash' }, { t: T.finally, label: '// 04 — git revert' }, { t: T.recap, label: '// 05 — your undo kit' }, { t: T.if_, label: '// 06 — keep learning' }]}
        counter={{ label: 'UNDOS', total: 4, ticks: PLUGS.map((p) => p.t + 0.25) }}
      />
      <Headline vo={vo} />
      <HookCard />
      <div style={{ opacity: 1 - ctaHide }}>
        <PlugStrip label="UNDOS" plugs={PLUGS} appear={T.four} x={lerp(80, 60, tuck)} y={lerp(1100, 1620, tuck)} scale={lerp(0.82, 0.78, tuck)} />
      </div>
      <ReflogCard />
      <RestoreCard />
      <StashCard />
      <RevertCard />
      <Checklist inAt={T.recap - 0.35} outAt={T.if_ + 0.05} header="git undo kit" tag="save it"
        items={[['git reflog', T.recap], ['git restore', T.rRestore], ['git stash', T.rStash], ['git revert', T.rRevert]]} note="git-scm.com/docs" />
      <SaveTag at={T.recap + 0.1} x={680} y={560} outAt={T.if_} />
      <Cta from={T.if_} screen="bug" solveAt={T.if_ + 1.2} chip={{ at: T.bio, text: 'LINK IN BIO' }} logoAt={T.teyro - 0.05} />
    </Stage>
  );
};
