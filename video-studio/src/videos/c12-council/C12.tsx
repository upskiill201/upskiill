import React from 'react';
import { useCurrentFrame, useVideoConfig } from 'remotion';
import voData from './vo.json';
import { Stage, type Sfx } from '../../explainer/Stage';
import { Headline } from '../../explainer/Headline';
import { TopBar } from '../../explainer/TopBar';
import { PlugStrip } from '../../explainer/PlugStrip';
import { Card, Odometer, Rise, SaveTag, Stamp, TeyLogo, Tick } from '../../explainer/Kit';
import { Checklist, Chip, Phase } from '../../explainer/Blocks';
import { at as atW, type VO } from '../../explainer/vo';
import { FONT, P } from '../../explainer/tokens';
import { lerp, pop, prog, spr } from '../../explainer/anim';
import type { PoseName } from '../../host/Ada';

/**
 * C12: "18 great minds argue about your idea" (Teyro, AI pillar, single-tool walkthrough, Editorial Paper).
 * Topic: the open-source Council of High Intelligence plugin. Script + sources: ./script.json.
 * CTA is a comment keyword (founder decision 2026-10-09); the DM points to Teyro's AI track.
 */
const vo = voData as unknown as VO;
const at = (w: string, n = 1) => atW(vo, w, n);
export const C12_DURATION = Math.ceil((vo.duration + 0.4) * 30);

// ---- cue times -------------------------------------------------------------
const T = {
  yes: at('yes'), idea: at('idea'), have: at('have.'), so: at('So'), eighteen: at('eighteen'), minds: at('minds'), tear: at('tear'), apart: at('apart.'),
  its: at("It's"), open: at('open-source'), plugin: at('plugin'), council: at('Council'), intel: at('Intelligence,'), four: at('four'), stars: at('stars'), github: at('GitHub.'),
  type: at('Type'), slash: at('slash'), question: at('question,'), goes: at('goes'), panel: at('panel'), socrates: at('Socrates,'), feynman: at('Feynman,'), charlie: at('Charlie'), munger: at('Munger.'),
  each: at('Each'), blind: at('blind'), first: at('first,'), nobody: at('nobody'), loudest: at('loudest'),
  then1: at('Then'), cross: at('cross-examine'), socrates2: at('Socrates', 2), attacks: at('attacks'), assumptions: at('assumptions.'),
  munger2: at('Munger', 2), asks: at('asks'), fail: at('fail.'), kahneman: at('Kahneman'), hunts: at('hunts'), bias: at('bias'), see: at('see.'),
  then2: at('Then', 2), verdict: at('verdict:'), unresolved: at('unresolved,'), split: at('split,'), kill: at('kill'), next: at('next'), step: at('step.'),
  one: at('One', 3), always: at('always'), yes2: at('yes', 2), eighteen2: at('eighteen', 2), wont: at("won't."),
  eachOther: at('other.'), andSend: at('and', 5),
  comment: at('Comment'), keyword: at('council', 3), send: at('send'), learn: at('learn'), ai2: at('AI', 2), tools: at('tools'), this_: at('this.'),
};

const PLUGS = [
  { t: T.slash, tag: 'ASK' }, { t: T.each, tag: 'BLIND' }, { t: T.then1, tag: 'DEBATE' }, { t: T.then2, tag: 'VERDICT' },
];

const POSES: { t: number; p: PoseName }[] = [
  { t: 0, p: 'present' }, { t: T.yes - 0.05, p: 'thumbsUp' }, { t: T.have, p: 'shrug' }, { t: T.eighteen - 0.05, p: 'surprise' }, { t: T.tear, p: 'fist' },
  { t: T.its - 0.05, p: 'pointUpL' }, { t: T.council, p: 'present' }, { t: T.four - 0.05, p: 'surprise' }, { t: T.github, p: 'thumbsUp' },
  { t: T.type - 0.05, p: 'count1' }, { t: T.slash, p: 'pointUpL' }, { t: T.panel, p: 'present' }, { t: T.socrates, p: 'pointUpL' }, { t: T.charlie, p: 'talk2' },
  { t: T.each - 0.05, p: 'count2' }, { t: T.blind - 0.05, p: 'blindfold' }, { t: T.nobody, p: 'shrug' }, { t: T.loudest, p: 'worried' },
  { t: T.then1 - 0.05, p: 'count3' }, { t: T.cross, p: 'fist' }, { t: T.socrates2, p: 'pointUpL' }, { t: T.munger2, p: 'think' }, { t: T.fail - 0.05, p: 'surprise' },
  { t: T.kahneman, p: 'pointUpL' }, { t: T.bias - 0.05, p: 'think' },
  { t: T.then2 - 0.05, p: 'count4' }, { t: T.verdict, p: 'present' }, { t: T.kill - 0.05, p: 'pointUpL' }, { t: T.next, p: 'thumbsUp' },
  { t: T.one - 0.05, p: 'talk' }, { t: T.yes2 - 0.05, p: 'shrug' }, { t: T.eighteen2 - 0.05, p: 'fist' },
  { t: T.comment - 0.05, p: 'pointUpL' }, { t: T.send, p: 'present' }, { t: T.tools - 0.1, p: 'wink' },
];

const SFX: Sfx[] = [
  { t: 0.05, name: 'whoosh', vol: 0.22 }, { t: T.yes, name: 'pop2', vol: 0.3 }, { t: T.have, name: 'pop2', vol: 0.3 },
  { t: T.so, name: 'swish', vol: 0.22 }, ...Array.from({ length: 9 }, (_, i) => ({ t: T.eighteen + i * 0.06, name: 'tick', vol: 0.12 })),
  { t: T.tear, name: 'slam', vol: 0.4 }, { t: T.apart, name: 'whoosh', vol: 0.3 },
  ...PLUGS.flatMap((p) => [{ t: p.t, name: 'whoosh', vol: 0.18 }, { t: p.t + 0.25, name: 'pop', vol: 0.4 }]),
  { t: T.open, name: 'pop2', vol: 0.25 }, { t: T.council, name: 'shimmer', vol: 0.2 }, ...[0, 0.12, 0.24, 0.36, 0.48].map((d) => ({ t: T.four + d, name: 'tick', vol: 0.14 })),
  { t: T.github, name: 'blip', vol: 0.25 }, { t: T.goes, name: 'power', vol: 0.18 },
  ...[T.socrates, T.feynman, T.charlie].map((t) => ({ t, name: 'pop2', vol: 0.28 })),
  ...[0, 0.1, 0.2, 0.3, 0.4, 0.5].map((d) => ({ t: T.each + d, name: 'pop2', vol: 0.14 })), { t: T.blind, name: 'swish', vol: 0.25 }, { t: T.loudest, name: 'slam', vol: 0.35 },
  { t: T.cross, name: 'slam', vol: 0.3 }, { t: T.attacks, name: 'pop', vol: 0.3 }, { t: T.asks, name: 'whoosh', vol: 0.25 }, { t: T.fail, name: 'pop2', vol: 0.3 },
  { t: T.hunts, name: 'swish', vol: 0.2 }, { t: T.bias, name: 'notify', vol: 0.3 },
  { t: T.verdict, name: 'shimmer', vol: 0.22 }, ...[T.unresolved, T.split, T.kill].map((t) => ({ t, name: 'blip', vol: 0.25 })), { t: T.next, name: 'success', vol: 0.3 },
  { t: T.one, name: 'swish', vol: 0.22 }, { t: T.yes2, name: 'pop2', vol: 0.25 }, { t: T.eighteen2, name: 'slam', vol: 0.4 },
  { t: T.comment, name: 'whoosh', vol: 0.22 }, ...[0, 0.07, 0.14, 0.21, 0.28].map((d) => ({ t: T.keyword + d, name: 'tick', vol: 0.12 })), { t: T.send, name: 'notify', vol: 0.35 },
  { t: T.tools, name: 'shimmer', vol: 0.3 },
];

// ---- data (from the repo README) -----------------------------------------------
const MEMBERS = ['Aristotle', 'Socrates', 'Sun Tzu', 'Lovelace', 'Aurelius', 'Machiavelli', 'Lao Tzu', 'Feynman', 'Torvalds',
  'Musashi', 'Watts', 'Karpathy', 'Sutskever', 'Kahneman', 'Meadows', 'Munger', 'Taleb', 'Rams'];
const QUESTION = 'Should I quit my job to build my app?';

// ---- small visuals ---------------------------------------------------------
const useT = () => { const frame = useCurrentFrame(); const { fps } = useVideoConfig(); return { frame, fps, t: frame / fps }; };

const typed = (text: string, t: number, a: number, b: number) => text.slice(0, Math.round(text.length * prog(t, a, b, (x) => x)));

const Term: React.FC<{ children: React.ReactNode; style?: React.CSSProperties }> = ({ children, style }) => (
  <div style={{ position: 'absolute', left: 30, right: 30, top: 70, bottom: 30, borderRadius: 18, background: '#16181D', padding: '26px 30px', fontFamily: FONT.mono, fontSize: 30, lineHeight: 1.5, color: '#E6E6E6', ...style }}>{children}</div>
);

const Bust: React.FC<{ name: string; size?: number; tone?: 'ink' | 'red' }> = ({ name, size = 74, tone = 'ink' }) => (
  <div style={{ width: size, height: size, borderRadius: size / 2, flex: 'none', background: tone === 'red' ? P.red : '#2A2D36', color: '#fff', border: `3px solid ${P.ink}`,
    display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: FONT.serif, fontStyle: 'italic', fontSize: size * 0.5 }}>
    {name.split(' ').map((s) => s[0]).join('').slice(0, 2)}
  </div>
);

/** Hook: the yes-machine in a terminal. */
const YesTerm: React.FC = () => {
  const { t } = useT();
  const rows: { at: number; me: boolean; text: string }[] = [
    { at: 0, me: true, text: 'my idea: a subscription box for socks' },
    { at: T.yes - 0.1, me: false, text: "You're absolutely right! Great idea." },
    { at: T.idea - 0.1, me: true, text: 'wait, is it actually good?' },
    { at: T.have - 0.15, me: false, text: 'Absolutely! It could really work.' },
  ];
  return (
    <Card x={90} y={600} w={900} h={560} inAt={0} outAt={T.so + 0.15} header="claude — ~/my-idea" tilt={-2}>
      <Term>
        {rows.map((r, i) => t >= r.at && (
          <div key={i} style={{ display: 'flex', gap: 16, marginBottom: 18, color: r.me ? '#E6E6E6' : '#F2B8B3' }}>
            <span style={{ color: r.me ? '#8A8F9C' : P.red }}>{r.me ? '>' : '●'}</span>
            <span>{r.me ? typed(r.text, t, r.at, r.at + 0.5) : r.text}</span>
          </div>
        ))}
      </Term>
      {[T.yes, T.have].map((a, i) => <Stamp key={i} text="YES" at={a} x={680 - i * 30} y={i ? 330 : 150} size={46} rotate={-10 + i * 16} />)}
    </Card>
  );
};

/** Hook: 18 seats around your idea, then it gets torn apart. */
const Ring: React.FC = () => {
  const { frame, fps, t } = useT();
  const torn = prog(t, T.apart - 0.05, T.apart + 0.35);
  const red = t >= T.tear;
  const shake = red && torn < 1 ? Math.sin(t * 90) * 6 : 0;
  return (
    <Card x={90} y={600} w={900} h={820} inAt={T.so + 0.1} outAt={T.its + 0.05} header="council · 18 seats">
      {MEMBERS.map((m, i) => {
        const a = (i / MEMBERS.length) * Math.PI * 2 - Math.PI / 2;
        const p = pop(frame, fps, T.eighteen + i * 0.03);
        const x = 450 + Math.cos(a) * 340, y = 440 + Math.sin(a) * 300;
        return (
          <div key={m} style={{ position: 'absolute', left: x, top: y, transform: `translate(-50%,-50%) scale(${p})`, background: red ? P.red : '#fff', color: red ? '#fff' : P.ink,
            border: `3px solid ${P.ink}`, borderRadius: 12, padding: '5px 12px', fontFamily: FONT.mono, fontWeight: 700, fontSize: 20, whiteSpace: 'nowrap' }}>{m}</div>
        );
      })}
      {[-1, 1].map((side) => (
        <div key={side} style={{ position: 'absolute', left: side < 0 ? 270 : 450, top: 330, width: 180, height: 220, overflow: 'hidden',
          transform: `translate(${shake + side * torn * 90}px, ${torn * 40}px) rotate(${side * torn * 14}deg)` }}>
          <div style={{ position: 'absolute', left: side < 0 ? 0 : -180, top: 0, width: 360, height: 220, borderRadius: 120, background: P.paper, border: `4px solid ${P.ink}`,
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ fontFamily: FONT.mono, fontSize: 18, color: P.inkSoft }}>YOUR IDEA</div>
            <Odometer to={18} a={T.eighteen} b={T.minds + 0.2} size={84} box={false} color={P.red} />
          </div>
        </div>
      ))}
    </Card>
  );
};

/** Item 1: the repo. */
const Repo: React.FC = () => {
  const { t } = useT();
  return (
    <Card x={90} y={600} w={900} h={820} inAt={T.its - 0.35} outAt={T.type + 0.05} header="github.com/0xNyk" tag="MIT">
      <div style={{ position: 'absolute', left: 50, right: 50, top: 86 }}>
        <div style={{ fontFamily: FONT.mono, fontSize: 30, color: '#3D5AFE' }}>0xNyk / <b>council-of-high-intelligence</b></div>
        <div style={{ display: 'flex', gap: 16, marginTop: 30 }}>
          <Rise at={T.open - 0.05}><Chip text="OPEN SOURCE" tone="ink" size={26} /></Rise>
          <Rise at={T.plugin - 0.05}><Chip text="PLUGIN" tone="soft" size={26} /></Rise>
        </div>
        <Rise at={T.council - 0.1} style={{ marginTop: 40 }}>
          <div style={{ fontFamily: FONT.serif, fontStyle: 'italic', fontSize: 92, color: P.red, lineHeight: 1 }}>Council of<br />High Intelligence</div>
        </Rise>
        <div style={{ marginTop: 44, display: 'flex', alignItems: 'center', gap: 20, opacity: prog(t, T.four - 0.25, T.four) }}>
          <svg width="70" height="70" viewBox="0 0 24 24"><path d="M12 2l3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z" fill="#F5B400" stroke={P.ink} strokeWidth="1.2" strokeLinejoin="round" /></svg>
          <Odometer to={4600} from={0} a={T.four - 0.1} b={T.stars + 0.3} size={76} />
          <div style={{ fontFamily: FONT.mono, fontSize: 28, color: P.inkSoft }}>stars</div>
        </div>
        <div style={{ marginTop: 40, fontFamily: FONT.mono, fontSize: 22, color: P.inkSoft, opacity: prog(t, T.github - 0.2, T.github) }}>WORKS IN</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 12 }}>
          {['Claude Code', 'Codex', 'Gemini CLI', 'OpenCode'].map((h, i) => <Rise key={h} at={T.github - 0.1 + i * 0.08}><Chip text={h} tone={i ? 'soft' : 'red'} size={24} /></Rise>)}
        </div>
      </div>
    </Card>
  );
};

/** Item 1b: /council + the panel. */
const Ask: React.FC = () => {
  const { t } = useT();
  const cmd = '/council ' + QUESTION;
  const lenses: [string, string, number][] = [['Socrates', 'assumption destruction', T.socrates], ['Feynman', 'explanation + debugging', T.feynman], ['Charlie Munger', 'inversion', T.charlie]];
  return (
    <Card x={90} y={600} w={900} h={820} inAt={T.type - 0.35} outAt={T.each + 0.05} header="claude — ~/my-idea">
      <div style={{ position: 'absolute', left: 30, right: 30, top: 70, height: 250, borderRadius: 18, background: '#16181D', padding: '26px 30px', fontFamily: FONT.mono, fontSize: 32, lineHeight: 1.45, color: '#E6E6E6' }}>
        <span style={{ color: '#8A8F9C' }}>&gt; </span>
        <span style={{ color: P.red, fontWeight: 700 }}>{typed(cmd, t, T.slash, T.question + 0.4).slice(0, 8)}</span>
        <span>{typed(cmd, t, T.slash, T.question + 0.4).slice(8)}</span>
        {t < T.goes && <span style={{ opacity: Math.round(t * 3) % 2 }}>▍</span>}
        {t >= T.goes && <div style={{ color: '#7CE38B', fontSize: 26, marginTop: 10 }}>council convened · 18 members</div>}
      </div>
      <div style={{ position: 'absolute', left: 40, right: 40, top: 350, display: 'flex', flexDirection: 'column', gap: 18 }}>
        {lenses.map(([n, l, a]) => (
          <Rise key={n} at={a - 0.1}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 22, background: '#FAF8F5', border: `3px solid ${P.ink}`, borderRadius: 20, padding: '14px 22px' }}>
              <Bust name={n} size={70} tone="red" />
              <div>
                <div style={{ fontFamily: FONT.sans, fontWeight: 700, fontSize: 38, color: P.ink }}>{n}</div>
                <div style={{ fontFamily: FONT.mono, fontSize: 22, color: P.red }}>lens: {l}</div>
              </div>
            </div>
          </Rise>
        ))}
        <Rise at={T.munger}><div style={{ fontFamily: FONT.mono, fontSize: 26, color: P.inkSoft, textAlign: 'right' }}>+ 15 more minds</div></Rise>
      </div>
    </Card>
  );
};

/** Item 2: everyone decides blind first. */
const Blind: React.FC = () => {
  const { frame, fps, t } = useT();
  const names = ['Socrates', 'Feynman', 'Munger', 'Kahneman', 'Sun Tzu', 'Lao Tzu'];
  const walls = prog(t, T.blind - 0.1, T.blind + 0.3);
  return (
    <Card x={90} y={600} w={900} h={820} inAt={T.each - 0.35} outAt={T.then1 + 0.05} header="round 1 · independent" tag="BLIND">
      <div style={{ position: 'absolute', left: 40, right: 40, top: 80, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 22 }}>
        {names.map((n, i) => {
          const p = pop(frame, fps, T.each + i * 0.1);
          return (
            <div key={n} style={{ transform: `scale(${p})`, height: 150, borderRadius: 18, border: `3px solid ${P.ink}`, background: '#FAF8F5', display: 'flex', alignItems: 'center', gap: 16, padding: '0 18px', position: 'relative' }}>
              <Bust name={n} size={64} />
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: FONT.sans, fontWeight: 700, fontSize: 30, color: P.ink }}>{n}</div>
                <div style={{ fontFamily: FONT.mono, fontSize: 20, color: P.inkSoft }}>position: sealed</div>
              </div>
              <svg width="56" height="42" viewBox="0 0 56 42"><rect x="2" y="2" width="52" height="38" rx="5" fill="#fff" stroke={P.ink} strokeWidth="3" /><path d="M3 4 L28 24 L53 4" fill="none" stroke={P.ink} strokeWidth="3" /><circle cx="28" cy="24" r="7" fill={P.red} /></svg>
            </div>
          );
        })}
      </div>
      {/* dividers: nobody can see anyone else's answer */}
      <div style={{ position: 'absolute', left: 448, top: 70, width: 6, height: 520 * walls, background: P.ink, borderRadius: 3 }} />
      {[0, 1].map((r) => <div key={r} style={{ position: 'absolute', left: 40, top: 241 + r * 172, width: 820 * walls, height: 6, background: P.ink, borderRadius: 3 }} />)}
      <div style={{ position: 'absolute', left: 40, right: 40, top: 660, display: 'flex', alignItems: 'center', gap: 20 }}>
        <Rise at={T.nobody - 0.1}><Chip text="LOUDEST VOICE" tone="soft" size={30} /></Rise>
        <Rise at={T.nobody + 0.2}><div style={{ fontFamily: FONT.mono, fontSize: 28, color: P.inkSoft }}>→ everyone copies</div></Rise>
      </div>
      <Stamp text="no copying" at={T.loudest} x={470} y={640} size={50} rotate={-8} />
    </Card>
  );
};

/** Item 3: cross-examination, three lenses. */
const Debate: React.FC = () => {
  const { frame, fps, t } = useT();
  const pairs: [string, string][] = [['Socrates', 'Feynman'], ['Munger', 'Sun Tzu'], ['Kahneman', 'Lao Tzu']];
  const assumptions: [string, number][] = [['people want it', T.attacks - 0.05], ['savings will last', T.attacks + 0.25], ['I can build it fast', T.assumptions]];
  const flip = prog(t, T.asks - 0.1, T.asks + 0.35);
  const lens = prog(t, T.hunts - 0.1, T.bias);
  return (
    <Card x={90} y={600} w={900} h={820} inAt={T.then1 - 0.35} outAt={T.then2 + 0.05} header="round 2 · cross-examination">
      <Phase a={T.then1 - 0.2} b={T.socrates2}>
        <div style={{ position: 'absolute', left: 40, right: 40, top: 100, display: 'flex', flexDirection: 'column', gap: 30 }}>
          {pairs.map(([a, b], i) => {
            const p = pop(frame, fps, T.then1 + 0.1 + i * 0.15);
            return (
              <div key={a} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', transform: `scale(${Math.max(0.001, p)})` }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, width: 330 }}><Bust name={a} size={66} /><span style={{ fontFamily: FONT.sans, fontWeight: 700, fontSize: 32 }}>{a}</span></div>
                <div style={{ width: 90, height: 90, borderRadius: 45, background: P.red, color: '#fff', fontFamily: FONT.black, fontWeight: 800, fontSize: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', border: `4px solid ${P.ink}` }}>VS</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, width: 330, justifyContent: 'flex-end' }}><span style={{ fontFamily: FONT.sans, fontWeight: 700, fontSize: 32 }}>{b}</span><Bust name={b} size={66} /></div>
              </div>
            );
          })}
          <Rise at={T.eachOther}><div style={{ fontFamily: FONT.mono, fontSize: 26, color: P.red, textAlign: 'center' }}>disagreement is forced</div></Rise>
        </div>
      </Phase>
      <Phase a={T.socrates2} b={T.munger2}>
        <Lens name="Socrates" lens="assumption destruction" />
        <div style={{ position: 'absolute', left: 40, right: 40, top: 220 }}>
          <QCard />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 26 }}>
            {assumptions.map(([s, a]) => (
              <Rise key={s} at={a}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontFamily: FONT.mono, fontSize: 30, color: P.ink, background: '#F3F1ED', borderRadius: 14, padding: '12px 20px' }}>
                  <span style={{ textDecoration: t >= a + 0.25 ? `line-through ${P.red} 4px` : 'none' }}>assumes: {s}</span>
                  <span style={{ fontFamily: FONT.black, fontWeight: 800, fontSize: 38, color: P.red, transform: `scale(${pop(frame, fps, a + 0.25)})` }}>?</span>
                </div>
              </Rise>
            ))}
          </div>
        </div>
      </Phase>
      <Phase a={T.munger2} b={T.kahneman}>
        <Lens name="Charlie Munger" lens="inversion" />
        <div style={{ position: 'absolute', left: 40, right: 40, top: 220, transform: `rotate(${180 * flip}deg)`, opacity: 1 - prog(t, T.asks + 0.2, T.asks + 0.35) }}><QCard /></div>
        <div style={{ position: 'absolute', left: 40, right: 40, top: 230, opacity: prog(t, T.asks + 0.2, T.asks + 0.4) }}>
          <div style={{ fontFamily: FONT.mono, fontSize: 24, color: P.inkSoft }}>flipped upside down:</div>
          <div style={{ fontFamily: FONT.serif, fontStyle: 'italic', fontSize: 92, color: P.red, lineHeight: 1.05, marginTop: 10 }}>How would<br />this fail?</div>
          <div style={{ display: 'flex', gap: 14, marginTop: 30 }}>
            <Rise at={T.fail}><Chip text="money runs out" tone="soft" size={26} /></Rise>
            <Rise at={T.fail + 0.15}><Chip text="nobody pays" tone="soft" size={26} /></Rise>
          </div>
        </div>
      </Phase>
      <Phase a={T.kahneman} b={T.then2 + 0.1}>
        <Lens name="Daniel Kahneman" lens="cognitive bias" />
        <div style={{ position: 'absolute', left: 40, right: 40, top: 230 }}>
          <div style={{ fontFamily: FONT.mono, fontSize: 24, color: P.inkSoft, marginBottom: 14 }}>your evidence:</div>
          <div style={{ fontFamily: FONT.sans, fontWeight: 500, fontSize: 46, color: P.ink, lineHeight: 1.25 }}>
            "I asked <span style={{ background: t >= T.bias ? 'rgba(224,53,43,0.18)' : 'transparent', borderRadius: 8, padding: '0 6px' }}>5 friends</span> and they all loved it."
          </div>
          {t >= T.bias && <Rise at={T.bias}><div style={{ marginTop: 30 }}><Chip text="BIAS: you only asked people who like you" tone="red" size={24} /></div></Rise>}
        </div>
        <svg width="190" height="190" viewBox="0 0 190 190" style={{ position: 'absolute', left: lerp(560, 300, lens), top: lerp(560, 300, lens) }}>
          <circle cx="75" cy="75" r="56" fill="rgba(255,255,255,0.25)" stroke={P.ink} strokeWidth="10" />
          <path d="M116 116 L172 172" stroke={P.ink} strokeWidth="18" strokeLinecap="round" />
        </svg>
      </Phase>
    </Card>
  );
};

const Lens: React.FC<{ name: string; lens: string }> = ({ name, lens }) => (
  <div style={{ position: 'absolute', left: 40, right: 40, top: 80, display: 'flex', alignItems: 'center', gap: 20, background: '#FAF8F5', border: `3px solid ${P.ink}`, borderRadius: 20, padding: '14px 22px' }}>
    <Bust name={name} size={70} tone="red" />
    <div>
      <div style={{ fontFamily: FONT.sans, fontWeight: 700, fontSize: 38, color: P.ink }}>{name}</div>
      <div style={{ fontFamily: FONT.mono, fontSize: 22, color: P.red }}>lens: {lens}</div>
    </div>
  </div>
);

const QCard: React.FC = () => (
  <div style={{ background: '#fff', border: `3px dashed ${P.ink}`, borderRadius: 18, padding: '20px 24px' }}>
    <div style={{ fontFamily: FONT.mono, fontSize: 22, color: P.inkSoft }}>// your question</div>
    <div style={{ fontFamily: FONT.sans, fontWeight: 700, fontSize: 42, color: P.ink, lineHeight: 1.15, marginTop: 6 }}>{QUESTION}</div>
  </div>
);

/** Item 4: the verdict (example output). */
const Verdict: React.FC = () => {
  const { t } = useT();
  const rows: [string, string, number, boolean?][] = [
    ['UNRESOLVED', 'Will anyone pay before month 3?', T.unresolved],
    ['STILL SPLIT', 'Socrates and Munger disagree on timing', T.split],
    ['KILL CRITERIA', 'Under 20 pre-orders in 30 days → stop', T.kill],
    ['NEXT STEP', 'Get 20 pre-orders this month', T.next, true],
  ];
  return (
    <Card x={90} y={600} w={900} h={820} inAt={T.then2 - 0.35} outAt={T.one + 0.05} header="verdict · example output" tag="DISSENT KEPT">
      <Rise at={T.verdict - 0.1} style={{ position: 'absolute', left: 50, top: 80 }}>
        <div style={{ fontFamily: FONT.serif, fontStyle: 'italic', fontSize: 84, color: P.red }}>The verdict</div>
      </Rise>
      <div style={{ position: 'absolute', left: 40, right: 40, top: 200, display: 'flex', flexDirection: 'column', gap: 18 }}>
        {rows.map(([k, v, a, hot]) => (
          <Rise key={k} at={a - 0.1}>
            <div style={{ borderRadius: 18, border: `3px solid ${P.ink}`, background: hot ? P.red : '#FAF8F5', padding: '14px 22px', display: 'flex', alignItems: 'center', gap: 18 }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: FONT.mono, fontWeight: 700, fontSize: 22, color: hot ? '#fff' : P.red }}>{k}</div>
                <div style={{ fontFamily: FONT.sans, fontWeight: 700, fontSize: 34, color: hot ? '#fff' : P.ink, lineHeight: 1.2 }}>{v}</div>
              </div>
              {hot ? <Tick at={T.step} size={56} color={P.ink} /> : t >= a + 0.2 && <span style={{ fontFamily: FONT.black, fontWeight: 800, fontSize: 40, color: P.inkSoft }}>{k === 'KILL CRITERIA' ? '✕' : '?'}</span>}
            </div>
          </Rise>
        ))}
      </div>
    </Card>
  );
};

/** One AI vs eighteen. */
const OneVs18: React.FC = () => {
  const { frame, fps } = useT();
  const y = pop(frame, fps, T.yes2 - 0.05);
  const n = pop(frame, fps, T.eighteen2);
  return (
    <div style={{ position: 'absolute', left: 90, top: 1250, width: 900, display: 'flex', gap: 20 }}>
      <div style={{ flex: 1, transform: `scale(${y})`, background: '#EDEBE7', borderRadius: 22, padding: '16px 22px', fontFamily: FONT.mono, fontSize: 28, color: P.inkSoft }}>1 AI → <b style={{ color: P.ink }}>"yes!"</b></div>
      <div style={{ flex: 1, transform: `scale(${n})`, background: P.red, borderRadius: 22, padding: '16px 22px', fontFamily: FONT.mono, fontSize: 28, color: '#fff' }}>18 minds → <b>"prove it"</b></div>
    </div>
  );
};

/** CTA: comment the keyword, get a DM. */
const CommentCta: React.FC = () => {
  const { frame, fps, t } = useT();
  const enter = spr(frame, fps, T.comment, { damping: 14, stiffness: 150 });
  const kw = typed('COUNCIL', t, T.keyword - 0.05, T.keyword + 0.35);
  const posted = t >= T.andSend;
  const dm = pop(frame, fps, T.send);
  const logo = pop(frame, fps, T.tools - 0.05);
  return (
    <>
      <div style={{ position: 'absolute', left: 96, top: 590, width: 470, height: 860, borderRadius: 64, background: P.ink, padding: 16, transform: `translateY(${(1 - enter) * 300}px) rotate(-3deg)`, opacity: enter, boxShadow: '0 30px 60px rgba(0,0,0,0.18)' }}>
        <div style={{ width: '100%', height: '100%', borderRadius: 50, background: '#fff', overflow: 'hidden', position: 'relative', padding: '60px 26px 0' }}>
          <div style={{ fontFamily: FONT.sans, fontWeight: 700, fontSize: 28, color: P.ink, textAlign: 'center', marginBottom: 22 }}>Comments</div>
          {posted && (
            <Rise at={T.andSend}>
              <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 24 }}>
                <div style={{ width: 46, height: 46, borderRadius: 23, background: '#DAD6CF' }} />
                <div><div style={{ fontFamily: FONT.mono, fontSize: 18, color: P.inkSoft }}>you · now</div><div style={{ fontFamily: FONT.sans, fontWeight: 700, fontSize: 30, color: P.ink }}>COUNCIL</div></div>
              </div>
            </Rise>
          )}
          {dm > 0 && (
            <div style={{ transform: `scale(${dm})`, transformOrigin: 'left top', background: '#F3F1ED', borderRadius: 22, padding: '18px 20px', fontFamily: FONT.sans, fontSize: 26, color: P.ink, lineHeight: 1.3 }}>
              <div style={{ fontFamily: FONT.mono, fontSize: 18, color: P.red, marginBottom: 6 }}>NEW MESSAGE</div>
              Here's where to learn AI tools like this:
              <div style={{ marginTop: 10, fontFamily: FONT.mono, fontWeight: 700, fontSize: 26, color: '#3D5AFE' }}>teyro.app</div>
            </div>
          )}
          <div style={{ position: 'absolute', left: 20, right: 20, bottom: 30, height: 70, borderRadius: 35, border: '2px solid #DDD', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px', fontFamily: FONT.sans, fontSize: 28 }}>
            <span style={{ color: posted ? '#AAA' : P.ink, fontWeight: 700 }}>{posted ? 'Add a comment…' : kw || 'Add a comment…'}{!posted && kw && <span style={{ opacity: Math.round(t * 3) % 2 }}>▍</span>}</span>
            <span style={{ color: '#3D5AFE', fontWeight: 700 }}>Post</span>
          </div>
        </div>
      </div>
      <div style={{ position: 'absolute', left: 560, top: 640, transform: `scale(${pop(frame, fps, T.keyword)})`, transformOrigin: 'left center', background: P.red, color: '#fff', borderRadius: 999, padding: '18px 30px', fontFamily: FONT.mono, fontWeight: 700, fontSize: 32, boxShadow: `0 6px 0 ${P.ink}`, whiteSpace: 'nowrap' }}>
        COMMENT "COUNCIL"
      </div>
      {logo > 0 && <div style={{ position: 'absolute', left: 620, top: 800, transform: `scale(${logo}) rotate(6deg)` }}><TeyLogo size={190} /></div>}
    </>
  );
};

// ---- composition ------------------------------------------------------------
export const C12: React.FC = () => {
  const { frame, fps, t } = useT();
  const tuck = spr(frame, fps, T.its - 0.1, { damping: 15, stiffness: 120 });
  const ctaHide = prog(t, T.comment - 0.1, T.comment + 0.3);
  return (
    <Stage
      slug="c12-council" vo={vo} poses={POSES} sfx={SFX}
      modes={[{ t: 0, mode: 'hook' }, { t: T.so, mode: 'items' }, { t: T.blind - 0.1, mode: 'act' }, { t: T.then1 - 0.1, mode: 'items' }, { t: T.comment - 0.1, mode: 'act' }]}
    >
      <TopBar
        chapters={[{ t: 0, label: '// 00 — the yes-machine' }, { t: T.its, label: '// 01 — the plugin' }, { t: T.each, label: '// 02 — blind first' },
          { t: T.then1, label: '// 03 — cross-examination' }, { t: T.then2, label: '// 04 — the verdict' }, { t: T.one, label: '// 05 — recap' }, { t: T.comment, label: '// 06 — comment council' }]}
        counter={{ label: 'COUNCIL', total: 4, ticks: PLUGS.map((p) => p.t + 0.25) }}
      />
      <Headline vo={vo} />
      <YesTerm />
      <Ring />
      <div style={{ opacity: (1 - ctaHide) * prog(t, T.its, T.its + 0.3) }}>
        <PlugStrip label="COUNCIL" plugs={PLUGS} appear={T.its} x={lerp(80, 60, tuck)} y={1620} scale={0.78} />
      </div>
      <Repo />
      <Ask />
      <Blind />
      <Debate />
      <Verdict />
      <Checklist inAt={T.one - 0.35} outAt={T.comment + 0.25} header="how /council works" tag="SAVE"
        y={600} h={620}
        items={[['/council + your question', T.one], ['Everyone decides blind', T.always], ['They cross-examine', T.yes2 - 0.1], ['Verdict + next step', T.eighteen2 - 0.1]]} />
      {t >= T.one && t < T.comment && <OneVs18 />}
      <SaveTag at={T.one + 0.2} x={680} y={540} outAt={T.comment} />
      {t >= T.comment - 0.2 && <CommentCta />}
    </Stage>
  );
};
