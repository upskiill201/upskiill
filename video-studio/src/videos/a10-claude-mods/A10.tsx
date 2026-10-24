import React from 'react';
import { useCurrentFrame, useVideoConfig } from 'remotion';
import voData from './vo.json';
import { Stage, type Sfx } from '../../explainer/Stage';
import { Headline } from '../../explainer/Headline';
import { TopBar } from '../../explainer/TopBar';
import { PlugStrip } from '../../explainer/PlugStrip';
import { Card, Rise, SaveTag, Stamp, Tick } from '../../explainer/Kit';
import { Chip, Phase } from '../../explainer/Blocks';
import { Cta } from '../../explainer/Cta';
import { at as atW, type VO } from '../../explainer/vo';
import { FONT, P } from '../../explainer/tokens';
import { lerp, pop, prog, spr } from '../../explainer/anim';
import type { PoseName } from '../../host/Ada';

/**
 * A10: "Claude Code can now rewrite itself" (Teyro, AI pillar, news explainer, Editorial Paper).
 * Topic: Claude Code mods (Oct 2026). Script + sources: ./script.json. Facts from code.claude.com mods docs.
 */
const vo = voData as unknown as VO;
const at = (w: string, n = 1) => atW(vo, w, n);
export const A10_DURATION = Math.ceil((vo.duration + 0.4) * 30);

// ---- cue times -------------------------------------------------------------
const T = {
  rewrite: at('rewrite'), someones: at("someone's"), doom: at('Doom'),
  last: at('Last'), shipped: at('shipped'), mods: at('mods'), change1: at('change'), everything: at('everything'), spinner: at('spinner'), prompts: at('prompts.'),
  under: at('Under'), events: at('events.'), sending: at('Sending'), running: at('Running', 2), even: at('Even'), drawing: at('drawing'),
  mod: at('mod'), typescript: at('TypeScript'), sits: at('sits'), watch: at('watch'), change2: at('change', 2), answer: at('answer'), never: at('never'), runs: at('runs.'),
  anthropics: at("Anthropic's"), blast: at('Blast'), risky: at('risky'), delete_: at('delete'), wipe: at('wipe.'), token: at('Token'), forecast: at('forecast'), context: at('context.'),
  you2: at('You', 2), ask: at('Ask'), git: at('Git'), loads: at('loads'), ends: at('ends.'),
  catch_: at('catch?'), mods2: at('Mods', 2), sandboxed: at('sandboxed,'), bad: at('bad'), api: at('API'), keys: at('keys.'),
  and5: at('And', 5), diff: at('diff'), already2: at('already', 2), mod3: at('mod', 3),
  events2: at('events', 2), shows_: at('shows'), branch_: at('branch,'), read_: at('read'),
  want: at('Want'), lesson: at('lesson'), head: at('Head'), teyro: at('Teyro.'),
};

const PLUGS = [
  { t: T.under, tag: 'EVENTS' }, { t: T.mod - 0.15, tag: 'MOD' }, { t: T.anthropics, tag: 'EXAMPLES' }, { t: T.catch_ - 0.2, tag: 'CATCH' },
];

const POSES: { t: number; p: PoseName }[] = [
  { t: 0, p: 'present' }, { t: T.rewrite - 0.05, p: 'pointUpL' }, { t: T.someones, p: 'talk2' }, { t: T.doom - 0.05, p: 'surprise' },
  { t: T.last - 0.05, p: 'count1' }, { t: T.shipped, p: 'pointUpL' }, { t: T.everything, p: 'open' }, { t: T.spinner, p: 'pointUpL' },
  { t: T.under - 0.05, p: 'think' }, { t: T.sending - 0.05, p: 'count1' }, { t: T.running - 0.05, p: 'count2' }, { t: T.even - 0.05, p: 'count3' },
  { t: T.mod - 0.1, p: 'present' }, { t: T.typescript, p: 'pointUpL' }, { t: T.watch - 0.05, p: 'count1' }, { t: T.change2 - 0.05, p: 'count2' }, { t: T.answer - 0.05, p: 'count3' }, { t: T.never, p: 'fist' },
  { t: T.anthropics - 0.05, p: 'pointUpL' }, { t: T.delete_ - 0.05, p: 'worried' }, { t: T.wipe, p: 'shrug' }, { t: T.token - 0.05, p: 'pointUpL' }, { t: T.forecast, p: 'present' },
  { t: T.you2 - 0.05, p: 'chill' }, { t: T.ask, p: 'talk' }, { t: T.git, p: 'pointUpL' }, { t: T.ends - 0.05, p: 'thumbsUp' },
  { t: T.catch_ - 0.1, p: 'think' }, { t: T.sandboxed - 0.05, p: 'worried' }, { t: T.api - 0.1, p: 'surprise' },
  { t: T.and5 - 0.05, p: 'open' }, { t: T.diff, p: 'pointUpL' }, { t: T.mod3 - 0.05, p: 'thumbsUp' },
  { t: T.want - 0.05, p: 'present' }, { t: T.lesson - 0.1, p: 'count1' }, { t: T.head, p: 'pointUpL' }, { t: T.teyro - 0.05, p: 'wink' },
];

const SFX: Sfx[] = [
  { t: 0.05, name: 'whoosh', vol: 0.22 }, { t: T.rewrite, name: 'swish', vol: 0.25 }, { t: T.doom, name: 'slam', vol: 0.4 },
  ...PLUGS.flatMap((p) => [{ t: p.t, name: 'whoosh', vol: 0.18 }, { t: p.t + 0.25, name: 'pop', vol: 0.4 }]),
  { t: T.mods, name: 'shimmer', vol: 0.22 }, { t: T.spinner, name: 'pop2', vol: 0.25 }, { t: T.prompts, name: 'pop2', vol: 0.25 },
  ...[T.sending, T.running, T.drawing].map((t) => ({ t, name: 'blip', vol: 0.28 })),
  { t: T.typescript, name: 'pop2', vol: 0.25 }, ...[T.watch, T.change2, T.answer].map((t) => ({ t, name: 'pop', vol: 0.3 })), { t: T.never, name: 'slam', vol: 0.32 },
  { t: T.delete_, name: 'notify', vol: 0.3 }, { t: T.wipe, name: 'pop2', vol: 0.25 }, { t: T.forecast, name: 'shimmer', vol: 0.2 },
  { t: T.ask, name: 'swish', vol: 0.2 }, { t: T.ends, name: 'success', vol: 0.3 },
  { t: T.sandboxed, name: 'slam', vol: 0.35 }, { t: T.api, name: 'notify', vol: 0.3 },
  { t: T.diff, name: 'pop2', vol: 0.28 }, { t: T.mod3, name: 'success', vol: 0.25 },
  { t: T.want, name: 'whoosh', vol: 0.22 }, { t: T.head, name: 'notify', vol: 0.35 }, { t: T.teyro, name: 'shimmer', vol: 0.3 },
];

const useT = () => { const frame = useCurrentFrame(); const { fps } = useVideoConfig(); return { frame, fps, t: frame / fps }; };
const typed = (text: string, t: number, a: number, b: number) => text.slice(0, Math.round(text.length * prog(t, a, b, (x) => x)));

const DARK = '#16181D', MUTE = '#8A8F9C', CLAY = '#D97757';

/** A Claude Code–style terminal body (stylised recreation). */
const Term: React.FC<{ top?: number; bottom?: number; children: React.ReactNode }> = ({ top = 70, bottom = 30, children }) => (
  <div style={{ position: 'absolute', left: 30, right: 30, top, bottom, borderRadius: 18, background: DARK, padding: '24px 28px', fontFamily: FONT.mono, fontSize: 28, lineHeight: 1.5, color: '#E6E6E6', overflow: 'hidden' }}>{children}</div>
);
const PromptBox: React.FC<{ text: string; y: number }> = ({ text, y }) => (
  <div style={{ position: 'absolute', left: 28, right: 28, top: y, border: '2px solid #3A3D46', borderRadius: 12, padding: '12px 18px', fontSize: 26, color: '#E6E6E6' }}>
    <span style={{ color: MUTE }}>&gt; </span>{text}
  </div>
);

// ---- scenes ------------------------------------------------------------------
/** Hook: Claude Code edits itself, then Doom appears inside. */
const Hook: React.FC = () => {
  const { frame, fps, t } = useT();
  const loop = prog(t, T.rewrite - 0.1, T.someones);
  const doom = spr(frame, fps, T.doom - 0.1, { damping: 13, stiffness: 160 });
  return (
    <Card x={90} y={600} w={900} h={640} inAt={0} outAt={T.last + 0.3} header="claude — ~/project">
      <Term>
        <div style={{ color: CLAY }}>✻ Claude Code</div>
        <div style={{ color: MUTE, fontSize: 24 }}>editing: ~/.claude/mods/</div>
        <svg width="300" height="190" viewBox="0 0 300 190" style={{ position: 'absolute', left: 40, top: 120, opacity: 1 - doom }}>
          <path d="M150 20 A80 80 0 1 1 70 100" stroke={CLAY} strokeWidth="10" fill="none" strokeLinecap="round" strokeDasharray="420" strokeDashoffset={420 * (1 - loop)} />
          <path d="M58 86 L70 104 L86 88" stroke={CLAY} strokeWidth="10" fill="none" strokeLinecap="round" strokeLinejoin="round" opacity={loop} />
          <text x="150" y="108" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="22" fill="#E6E6E6">rewrites itself</text>
        </svg>
        {doom > 0 && (
          <div style={{ position: 'absolute', left: 28, right: 28, top: 100, height: 300, borderRadius: 10, overflow: 'hidden', transform: `scale(${0.6 + 0.4 * doom})`, opacity: doom,
            background: 'linear-gradient(#3B1E14 0 40%, #6B2A16 40% 100%)' }}>
            {Array.from({ length: 8 }).map((_, i) => <div key={i} style={{ position: 'absolute', left: `${i * 12.5}%`, top: '40%', width: '12.5%', height: '60%', background: i % 2 ? '#7A3218' : '#5C2412', clipPath: `polygon(0 0, 100% 0, ${50 + (i - 3.5) * 8}% 100%, ${50 + (i - 3.5) * 8}% 100%)` }} />)}
            <div style={{ position: 'absolute', left: 0, right: 0, top: 54, textAlign: 'center', fontFamily: FONT.black, fontWeight: 800, fontSize: 96, letterSpacing: 8, color: '#E8352B', textShadow: '6px 6px 0 #2A0A05' }}>DOOM</div>
            <svg width="60" height="60" viewBox="0 0 60 60" style={{ position: 'absolute', left: 'calc(50% - 30px)', top: 190 }}><path d="M30 6 V24 M30 36 V54 M6 30 H24 M36 30 H54" stroke="#fff" strokeWidth="5" /></svg>
          </div>
        )}
        <PromptBox text={t < T.doom - 0.1 ? 'make yourself better' : 'while you work: deathmatch'} y={430} />
      </Term>
    </Card>
  );
};

/** i1: mods shipped; what they can change. */
const Shipped: React.FC = () => {
  const { t } = useT();
  const things: [string, number][] = [['tool calls', T.everything], ['panes + commands', T.everything + 0.35], ['the spinner', T.spinner], ['your prompts', T.prompts]];
  return (
    <Card x={90} y={600} w={900} h={820} inAt={T.last + 0.05} outAt={T.under + 0.05} header="claude code · changelog" tag="v2.1.287">
      <div style={{ position: 'absolute', left: 50, right: 50, top: 86 }}>
        <Rise at={T.shipped - 0.1}><div style={{ fontFamily: FONT.mono, fontSize: 26, color: P.inkSoft }}>new · on by default</div></Rise>
        <Rise at={T.mods - 0.1}><div style={{ fontFamily: FONT.serif, fontStyle: 'italic', fontSize: 150, color: P.red, lineHeight: 1 }}>mods</div></Rise>
        <div style={{ fontFamily: FONT.mono, fontSize: 24, color: P.inkSoft, marginTop: 20, opacity: prog(t, T.change1 - 0.2, T.change1) }}>change almost everything:</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 16 }}>
          {things.map(([s, a]) => (
            <Rise key={s} at={a - 0.1}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 18, fontFamily: FONT.sans, fontWeight: 700, fontSize: 44, color: P.ink }}><Tick at={a + 0.1} size={46} />{s}</div>
            </Rise>
          ))}
        </div>
      </div>
    </Card>
  );
};

/** i2: everything is an event. */
const Events: React.FC = () => {
  const { frame, fps, t } = useT();
  const evs: [string, string, number][] = [['prompt sent', '"fix the failing test"', T.sending], ['tool.call', 'Bash · npm test', T.running], ['ui.render', 'Spinner · "Thinking…"', T.drawing]];
  return (
    <Card x={90} y={600} w={900} h={820} inAt={T.under - 0.35} outAt={T.mod - 0.1} header="under the hood · event stream">
      <div style={{ position: 'absolute', left: 50, top: 90, fontFamily: FONT.mono, fontSize: 26, color: P.inkSoft, opacity: prog(t, T.events - 0.2, T.events) }}>everything Claude Code does fires an event</div>
      <div style={{ position: 'absolute', left: 80, top: 150, width: 6, height: 560, background: P.line, borderRadius: 3 }} />
      <div style={{ position: 'absolute', left: 50, right: 50, top: 170, display: 'flex', flexDirection: 'column', gap: 40 }}>
        {evs.map(([name, detail, a]) => {
          const p = pop(frame, fps, a - 0.1);
          return (
            <div key={name} style={{ display: 'flex', alignItems: 'center', gap: 26, transform: `translateX(${(1 - Math.min(1, p)) * 80}px)`, opacity: Math.min(1, p) }}>
              <div style={{ width: 66, height: 66, borderRadius: 33, background: P.red, border: `4px solid ${P.ink}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none' }}>
                <svg width="30" height="36" viewBox="0 0 30 36"><path d="M18 2 L4 20 H14 L11 34 L26 14 H16 Z" fill="#fff" /></svg>
              </div>
              <div style={{ flex: 1, background: '#FAF8F5', border: `3px solid ${P.ink}`, borderRadius: 18, padding: '16px 22px' }}>
                <div style={{ fontFamily: FONT.mono, fontWeight: 700, fontSize: 34, color: P.ink }}>{name}</div>
                <div style={{ fontFamily: FONT.mono, fontSize: 24, color: P.inkSoft }}>{detail}</div>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};

/** i3: a mod sits on an event: watch / change / answer. */
const Pipeline: React.FC = () => {
  const { frame, fps, t } = useT();
  const code = ["on('tool.call', async ($, e, next) => {", '  // watch it, change it,', '  // or answer it yourself', '  return next(e)', '})'];
  const n = Math.round(code.join('\n').length * prog(t, T.typescript - 0.1, T.events2 + 0.3, (x) => x));
  let left = n;
  const outs: [string, string, number, string][] = [['WATCH', 'passes it on', T.watch, P.inkSoft], ['CHANGE', 'passes a changed copy', T.change2, '#3D5AFE'], ['ANSWER', 'original never runs', T.answer, P.red]];
  return (
    <Card x={90} y={600} w={900} h={820} inAt={T.mod - 0.35} outAt={T.anthropics + 0.05} header="hooks/register.ts" tag="MOD">
      <div style={{ position: 'absolute', left: 30, right: 30, top: 70, height: 250, borderRadius: 18, background: DARK, padding: '22px 26px', fontFamily: FONT.mono, fontSize: 25, lineHeight: 1.5, color: '#E6E6E6', whiteSpace: 'pre' }}>
        {code.map((l, i) => { const s = l.slice(0, Math.max(0, left)); left -= l.length + 1; return <div key={i} style={{ color: l.trim().startsWith('//') ? MUTE : undefined }}>{s}</div>; })}
      </div>
      <div style={{ position: 'absolute', left: 50, right: 50, top: 360, display: 'flex', flexDirection: 'column', gap: 22 }}>
        {outs.map(([k, d, a, c]) => (
          <Rise key={k} at={a - 0.1}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 22, background: '#FAF8F5', border: `3px solid ${t >= a ? c : P.line}`, borderRadius: 20, padding: '16px 24px', transform: `scale(${1 + 0.04 * Math.max(0, 1 - Math.abs(t - a - 0.15) * 4)})` }}>
              <div style={{ width: 200, fontFamily: FONT.mono, fontWeight: 700, fontSize: 36, color: c }}>{k}</div>
              <div style={{ fontFamily: FONT.sans, fontWeight: 700, fontSize: 36, color: P.ink }}>{d}</div>
            </div>
          </Rise>
        ))}
      </div>
      <Stamp text="original never runs" at={T.never} outAt={T.anthropics} x={210} y={700} size={40} rotate={-6} />
    </Card>
  );
};

/** i4: Blast Radius + Token Weather (Anthropic's sample mods). */
const Samples: React.FC = () => {
  const { frame, fps, t } = useT();
  const files = ['src/index.ts', 'src/app.tsx', 'src/api/user.ts', 'src/api/auth.ts', '+ 5 more'];
  return (
    <Card x={90} y={600} w={900} h={820} inAt={T.anthropics - 0.35} outAt={T.you2 + 0.05} header="anthropic sample mods">
      <Phase a={T.anthropics - 0.3} b={T.token - 0.05}>
        <Term>
          <div style={{ color: CLAY, fontWeight: 700 }}>blast-radius</div>
          <div style={{ marginTop: 8 }}><span style={{ color: MUTE }}>Bash</span> rm -rf ./src</div>
          {t >= T.delete_ - 0.1 && (
            <div style={{ marginTop: 18, border: '2px solid #F5B400', borderRadius: 12, padding: '14px 18px', transform: `scale(${pop(frame, fps, T.delete_ - 0.1)})`, transformOrigin: 'left top' }}>
              <div style={{ color: '#F5B400', fontWeight: 700 }}>HELD · would delete 9 files</div>
              {files.map((f, i) => <div key={f} style={{ fontSize: 23, color: '#E6E6E6', opacity: prog(t, T.shows_ + i * 0.1, T.shows_ + 0.2 + i * 0.1) }}>− {f}</div>)}
              <div style={{ display: 'flex', gap: 14, marginTop: 14 }}>
                <span style={{ background: '#3A3D46', borderRadius: 8, padding: '6px 16px', fontSize: 22 }}>Proceed</span>
                <span style={{ background: P.red, borderRadius: 8, padding: '6px 16px', fontSize: 22, color: '#fff' }}>Cancel</span>
              </div>
            </div>
          )}
        </Term>
      </Phase>
      <Phase a={T.token - 0.05} b={T.you2 + 0.1}>
        <Term>
          <div style={{ color: CLAY, fontWeight: 700 }}>token-weather</div>
          <div style={{ marginTop: 26, border: '2px solid #3A3D46', borderRadius: 12, padding: '16px 18px', display: 'flex', alignItems: 'center', gap: 20 }}>
            <svg width="70" height="50" viewBox="0 0 70 50"><path d="M18 42 H54 A12 12 0 0 0 52 18 A16 16 0 0 0 22 16 A13 13 0 0 0 18 42 Z" fill="#C9CDD6" /></svg>
            <div>
              <div style={{ fontWeight: 700 }}>cloudy · context 64%</div>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6, height: 70, marginTop: 8 }}>
                {[18, 22, 27, 31, 36, 41, 45, 50, 54, 58, 61, 64].map((v, i) => <div key={i} style={{ width: 22, height: `${v * prog(t, T.forecast - 0.2 + i * 0.04, T.forecast + 0.2 + i * 0.04)}%`, background: v > 55 ? '#F5B400' : '#4EA5FF', borderRadius: 4 }} />)}
              </div>
            </div>
          </div>
          <PromptBox text="" y={330} />
          <div style={{ position: 'absolute', left: 28, top: 410, fontSize: 20, color: MUTE }}>↑ a forecast above your prompt</div>
        </Term>
      </Phase>
    </Card>
  );
};

/** i5: ask Claude to write a mod; it loads when the turn ends. */
const AskMod: React.FC = () => {
  const { frame, fps, t } = useT();
  const ask = 'make a mod that shows my git branch above the prompt';
  const loaded = t >= T.ends - 0.05;
  return (
    <Card x={90} y={600} w={900} h={820} inAt={T.you2 - 0.35} outAt={T.catch_ + 0.05} header="claude — ~/project">
      <Term>
        <div><span style={{ color: MUTE }}>&gt; </span>{typed(ask, t, T.you2, T.branch_ + 0.2)}</div>
        {t >= T.loads - 0.3 && <Rise at={T.loads - 0.3}><div style={{ color: CLAY, marginTop: 16 }}>● Wrote ~/.claude/dev-mods/…/git-branch/</div></Rise>}
        {loaded && <Rise at={T.ends - 0.05}><div style={{ color: '#7CE38B', marginTop: 8 }}>✓ git-branch loaded · end of turn</div></Rise>}
        {loaded && (
          <div style={{ position: 'absolute', left: 28, right: 28, top: 380, display: 'flex', alignItems: 'center', gap: 12, color: '#7CE38B', fontSize: 28, transform: `scale(${pop(frame, fps, T.ends)})`, transformOrigin: 'left center' }}>
            <svg width="30" height="34" viewBox="0 0 30 34"><circle cx="8" cy="6" r="4" stroke="#7CE38B" strokeWidth="3" fill="none" /><circle cx="8" cy="28" r="4" stroke="#7CE38B" strokeWidth="3" fill="none" /><circle cx="22" cy="12" r="4" stroke="#7CE38B" strokeWidth="3" fill="none" /><path d="M8 10 V24 M22 16 Q22 22 10 25" stroke="#7CE38B" strokeWidth="3" fill="none" /></svg>
            main
          </div>
        )}
        <PromptBox text="" y={430} />
      </Term>
    </Card>
  );
};

/** i6: not sandboxed → can read your keys. */
const Danger: React.FC = () => {
  const { frame, fps, t } = useT();
  const read = prog(t, T.read_ - 0.1, T.keys);
  return (
    <Card x={90} y={600} w={900} h={820} inAt={T.catch_ - 0.35} outAt={T.and5 + 0.05} header="the catch" tag="RUNS AS YOU">
      <div style={{ position: 'absolute', left: 50, top: 100, width: 300, height: 300, borderRadius: 30, background: P.ink, color: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
        <svg width="110" height="130" viewBox="0 0 120 140"><path d={`M28 60 V40 A32 32 0 0 1 92 ${t >= T.sandboxed ? 26 : 40} V${t >= T.sandboxed ? 30 : 60}`} stroke="#fff" strokeWidth="12" fill="none" /><rect x="14" y="60" width="92" height="74" rx="14" fill={P.red} /></svg>
        <div style={{ fontFamily: FONT.mono, fontSize: 26 }}>some-mod</div>
      </div>
      <Stamp text="not sandboxed" at={T.sandboxed} x={60} y={430} size={44} rotate={-6} />
      <div style={{ position: 'absolute', right: 50, top: 120, width: 400, boxSizing: 'border-box', borderRadius: 18, background: '#FAF8F5', border: `3px solid ${P.ink}`, padding: '18px 22px', fontFamily: FONT.mono, fontSize: 24, color: P.ink, opacity: prog(t, T.bad - 0.2, T.bad) }}>
        <div style={{ color: P.inkSoft, marginBottom: 10 }}>.env</div>
        <div>DB_URL=postgres://…</div>
        <div style={{ background: `rgba(224,53,43,${0.2 * read})`, borderRadius: 6 }}>API_KEY=sk-••••••••</div>
      </div>
      <svg width="900" height="820" style={{ position: 'absolute', left: 0, top: 0 }}>
        <path d="M360 250 Q420 230 460 245" stroke={P.red} strokeWidth="8" fill="none" strokeDasharray="200" strokeDashoffset={200 * (1 - read)} strokeLinecap="round" />
      </svg>
      {t >= T.keys && <Rise at={T.keys} style={{ position: 'absolute', left: 50, right: 50, top: 560 }}><Chip text="install only from people you trust" tone="red" size={28} /></Rise>}
    </Card>
  );
};

/** i7: Claude Code's own diff view is a mod. */
const BuiltIn: React.FC = () => {
  const { t } = useT();
  const rows: [string, string][] = [['cc-plugin-diff', 'the /diff view'], ['cc-plugin-agents-md', 'loads AGENTS.md'], ['cc-plugin-sec-default', 'guards installed mods']];
  return (
    <Card x={90} y={600} w={900} h={820} inAt={T.and5 - 0.35} outAt={T.want + 0.05} header="/plugin › installed › built-in">
      <div style={{ position: 'absolute', left: 50, right: 50, top: 100, display: 'flex', flexDirection: 'column', gap: 22 }}>
        {rows.map(([n, d], i) => {
          const hot = i === 0 && t >= T.diff;
          return (
            <Rise key={n} at={T.and5 + i * 0.12}>
              <div style={{ borderRadius: 18, border: `3px solid ${P.ink}`, background: hot ? P.red : '#FAF8F5', padding: '18px 24px', color: hot ? '#fff' : P.ink }}>
                <div style={{ fontFamily: FONT.mono, fontWeight: 700, fontSize: 32 }}>{n}</div>
                <div style={{ fontFamily: FONT.sans, fontSize: 28, opacity: 0.85 }}>{d}</div>
              </div>
            </Rise>
          );
        })}
        <Rise at={T.mod3 - 0.1}><div style={{ fontFamily: FONT.serif, fontStyle: 'italic', fontSize: 64, color: P.red, marginTop: 10 }}>…all mods.</div></Rise>
      </div>
    </Card>
  );
};

// ---- composition ------------------------------------------------------------
export const A10: React.FC = () => {
  const { frame, fps, t } = useT();
  const tuck = spr(frame, fps, T.last - 0.1, { damping: 15, stiffness: 120 });
  const ctaHide = prog(t, T.want - 0.1, T.want + 0.3);
  return (
    <Stage
      slug="a10-claude-mods" vo={vo} poses={POSES} sfx={SFX}
      modes={[{ t: 0, mode: 'hook' }, { t: T.last - 0.1, mode: 'items' }, { t: T.want - 0.1, mode: 'act' }]}
    >
      <TopBar
        chapters={[{ t: 0, label: '// 00 — claude code, modded' }, { t: T.last, label: '// 01 — mods shipped' }, { t: T.under, label: '// 02 — events' },
          { t: T.mod, label: '// 03 — what a mod does' }, { t: T.anthropics, label: '// 04 — real mods' }, { t: T.you2, label: '// 05 — ask claude' },
          { t: T.catch_, label: '// 06 — the catch' }, { t: T.and5, label: '// 07 — built in' }, { t: T.want, label: '// 08 — learn it' }]}
        counter={{ label: 'MODS', total: 4, ticks: PLUGS.map((p) => p.t + 0.25) }}
      />
      <Headline vo={vo} />
      <Hook />
      <div style={{ opacity: (1 - ctaHide) * prog(t, T.last - 0.1, T.last + 0.2) }}>
        <PlugStrip label="MODS" plugs={PLUGS} appear={T.last - 0.1} x={lerp(80, 60, tuck)} y={1620} scale={0.78} />
      </div>
      <Shipped />
      <Events />
      <Pipeline />
      <Samples />
      <AskMod />
      <Danger />
      <BuiltIn />
      <SaveTag at={T.anthropics + 0.2} x={680} y={540} outAt={T.want} />
      <Cta from={T.want} screen="apply" solveAt={T.lesson + 0.2} chip={{ at: T.head, text: 'teyro.app' }} logoAt={T.teyro - 0.05} />
    </Stage>
  );
};
