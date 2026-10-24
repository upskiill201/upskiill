import React from 'react';
import { useCurrentFrame, useVideoConfig } from 'remotion';
import voData from './vo.json';
import { Stage, type Sfx } from '../../explainer/Stage';
import { Headline } from '../../explainer/Headline';
import { TopBar } from '../../explainer/TopBar';
import { PlugStrip } from '../../explainer/PlugStrip';
import { Card, Odometer, Rise, SaveTag, Stamp } from '../../explainer/Kit';
import { Chip, Phase } from '../../explainer/Blocks';
import { Cta } from '../../explainer/Cta';
import { at as atW, type VO } from '../../explainer/vo';
import { FONT, P } from '../../explainer/tokens';
import { lerp, pop, prog, spr } from '../../explainer/anim';
import type { PoseName } from '../../host/Ada';

/**
 * A9: "OpenAI did decades of math in one release" (Teyro, AI pillar, news explainer, Editorial Paper).
 * Script + sources: ./script.json (claims not confirmed on a primary source were cut).
 */
const vo = voData as unknown as VO;
const at = (w: string, n = 1) => atW(vo, w, n);
export const A9_DURATION = Math.ceil((vo.duration + 0.4) * 30);

// ---- cue times -------------------------------------------------------------
const T = {
  decades: at('decades'), one: at('one'), release: at('release,'), best: at('best'), worried: at('worried.'),
  thisWeek: at('This'), unreleased: at('unreleased'), n4000: at('4,000'), problems: at('problems.'), cracked: at('cracked'), ten: at('10%'), still: at('still'), n372: at('372'), results: at('results.'),
  ugc: at('Unique'), conj: at('Conjecture,'), scott: at('Scott'), wife: at('wife'), whole: at('whole'), toward: at('toward.'),
  openai3: at('OpenAI', 3), name: at('name'), almost: at('Almost'), prompt: at('prompt,'), three: at('three'), thinking: at('thinking'),
  but: at('But', 2), catch_: at('catch.'), half: at('half'), checked: at('checked'), nobody: at('nobody'), run: at('run'), how: at('how'), there: at('there.'),
  these: at('these'), learned: at('learned'), papers: at('papers'), shared: at('shared'), free: at('free.'), n25: at('25'), letter: at('letter'), plagiarism: at('plagiarism'), credit: at('credit.'),
  tao: at('Terence'), first: at('first'), less: at('less', 3), explaining: at('explaining'), more: at('more.'),
  because: at('Because'), sharing: at('sharing'), trains: at('trains'), takes: at('takes'), credit2: at('credit', 2), stop: at('stop'), sharing2: at('sharing', 2),
  with_: at('with'), mathematicians_: at('mathematicians', 2), medal_: at('Medal'), signed_: at('signed'),
  want: at('Want'), lesson: at('lesson'), head: at('Head'), teyro: at('Teyro.'),
};

const PLUGS = [
  { t: T.thisWeek, tag: 'WHAT' }, { t: T.openai3, tag: 'HOW' }, { t: T.but, tag: 'CATCH' }, { t: T.these - 0.1, tag: 'CREDIT' },
];

const POSES: { t: number; p: PoseName }[] = [
  { t: 0, p: 'present' }, { t: T.decades - 0.05, p: 'surprise' }, { t: T.best, p: 'talk2' }, { t: T.worried - 0.1, p: 'worried' },
  { t: T.thisWeek - 0.05, p: 'count1' }, { t: T.unreleased, p: 'pointUpL' }, { t: T.cracked, p: 'think' }, { t: T.n372 - 0.05, p: 'surprise' },
  { t: T.ugc - 0.05, p: 'pointUpL' }, { t: T.scott, p: 'talk' }, { t: T.whole, p: 'open' },
  { t: T.openai3 - 0.05, p: 'count2' }, { t: T.name, p: 'shrug' }, { t: T.prompt - 0.1, p: 'count1' }, { t: T.three, p: 'pointUpL' },
  { t: T.but - 0.05, p: 'count3' }, { t: T.half - 0.05, p: 'worried' }, { t: T.nobody, p: 'shrug' }, { t: T.how, p: 'think' },
  { t: T.these - 0.15, p: 'count4' }, { t: T.free - 0.1, p: 'open' }, { t: T.n25 - 0.05, p: 'pointUpL' }, { t: T.plagiarism, p: 'worried' },
  { t: T.tao - 0.05, p: 'talk2' }, { t: T.less, p: 'pointUpL' }, { t: T.explaining, p: 'thumbsUp' },
  { t: T.because - 0.05, p: 'think' }, { t: T.stop - 0.05, p: 'worried' },
  { t: T.want - 0.05, p: 'present' }, { t: T.lesson - 0.1, p: 'count1' }, { t: T.head, p: 'pointUpL' }, { t: T.teyro - 0.05, p: 'wink' },
];

const SFX: Sfx[] = [
  { t: 0.05, name: 'whoosh', vol: 0.22 }, ...[0, 0.1, 0.2, 0.3, 0.4, 0.5].map((d) => ({ t: T.decades + d, name: 'tick', vol: 0.13 })), { t: T.release, name: 'slam', vol: 0.4 },
  { t: T.worried, name: 'pop2', vol: 0.3 },
  ...PLUGS.flatMap((p) => [{ t: p.t, name: 'whoosh', vol: 0.18 }, { t: p.t + 0.25, name: 'pop', vol: 0.4 }]),
  ...[0, 0.12, 0.24, 0.36].map((d) => ({ t: T.n4000 + d, name: 'tick', vol: 0.13 })), { t: T.ten, name: 'blip', vol: 0.28 }, { t: T.n372, name: 'levelup', vol: 0.25 },
  { t: T.conj, name: 'slam', vol: 0.35 }, { t: T.whole, name: 'shimmer', vol: 0.2 },
  { t: T.name, name: 'slam', vol: 0.3 }, { t: T.prompt, name: 'pop2', vol: 0.28 }, ...[0, 0.15, 0.3].map((d) => ({ t: T.three + d, name: 'tick', vol: 0.14 })),
  { t: T.half, name: 'blip', vol: 0.28 }, { t: T.nobody, name: 'power', vol: 0.2 }, { t: T.how, name: 'pop2', vol: 0.25 },
  ...[0, 0.15, 0.3].map((d) => ({ t: T.papers + d, name: 'swish', vol: 0.14 })), { t: T.free, name: 'pop2', vol: 0.28 },
  ...Array.from({ length: 8 }, (_, i) => ({ t: T.n25 + i * 0.06, name: 'tick', vol: 0.11 })), { t: T.plagiarism, name: 'slam', vol: 0.35 },
  { t: T.less, name: 'whoosh', vol: 0.22 }, { t: T.explaining, name: 'success', vol: 0.28 },
  { t: T.trains, name: 'swish', vol: 0.2 }, { t: T.stop, name: 'slam', vol: 0.35 },
  { t: T.want, name: 'whoosh', vol: 0.22 }, { t: T.head, name: 'notify', vol: 0.35 }, { t: T.teyro, name: 'shimmer', vol: 0.3 },
];

const useT = () => { const frame = useCurrentFrame(); const { fps } = useVideoConfig(); return { frame, fps, t: frame / fps }; };

// ---- scenes ------------------------------------------------------------------
/** Hook: decades of papers collapse into one release; mathematicians sweat. */
const Decades: React.FC = () => {
  const { frame, fps, t } = useT();
  const decs = ['1970s', '1980s', '1990s', '2000s', '2010s', '2020s'];
  const merge = prog(t, T.one - 0.05, T.release + 0.25);
  const box = pop(frame, fps, T.release);
  return (
    <Card x={90} y={600} w={900} h={640} inAt={0} outAt={T.thisWeek + 0.05} header="openai / math" tag="1 RELEASE">
      {decs.map((d, i) => {
        const p = pop(frame, fps, T.decades - 0.3 + i * 0.09);
        const x0 = 60 + (i % 3) * 270, y0 = 100 + Math.floor(i / 3) * 150;
        return (
          <div key={d} style={{ position: 'absolute', left: lerp(x0, 330, merge), top: lerp(y0, 160, merge), width: 240, height: 120, transform: `scale(${p * (1 - 0.6 * merge)})`, opacity: 1 - merge * 0.9,
            borderRadius: 14, border: `3px solid ${P.ink}`, background: '#FAF8F5', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 20px' }}>
            <div style={{ fontFamily: FONT.mono, fontSize: 20, color: P.inkSoft }}>papers · {d}</div>
            {[0.9, 0.7, 0.8].map((w, k) => <div key={k} style={{ height: 9, width: `${w * 100}%`, background: '#DAD6CF', borderRadius: 5, marginTop: 8 }} />)}
          </div>
        );
      })}
      {box > 0 && (
        <div style={{ position: 'absolute', left: 250, top: 120, width: 400, height: 220, transform: `scale(${box})`, borderRadius: 22, background: P.ink, color: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', boxShadow: `0 10px 0 ${P.red}` }}>
          <div style={{ fontFamily: FONT.mono, fontSize: 22, color: 'rgba(255,255,255,0.6)' }}>ONE RELEASE</div>
          <div style={{ fontFamily: FONT.black, fontWeight: 800, fontSize: 64 }}>v1.0</div>
        </div>
      )}
      <div style={{ position: 'absolute', left: 60, right: 60, top: 420, display: 'flex', justifyContent: 'space-between' }}>
        {Array.from({ length: 6 }).map((_, i) => {
          const p = pop(frame, fps, T.best + i * 0.08);
          const sweat = t >= T.worried;
          return (
            <svg key={i} width="110" height="130" viewBox="0 0 110 130" style={{ transform: `scale(${p})` }}>
              <circle cx="55" cy="55" r="46" fill="#F3F1ED" stroke={P.ink} strokeWidth="4" />
              <circle cx="40" cy="50" r="5" fill={P.ink} /><circle cx="70" cy="50" r="5" fill={P.ink} />
              {sweat ? <path d="M38 80 Q55 68 72 80" stroke={P.ink} strokeWidth="4" fill="none" strokeLinecap="round" /> : <path d="M40 76 H70" stroke={P.ink} strokeWidth="4" strokeLinecap="round" />}
              {sweat && <path d="M92 30 Q99 44 92 50 Q85 44 92 30 Z" fill={P.blue} transform={`translate(0 ${(t * 30) % 12})`} />}
              <text x="55" y="124" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="13" fill={P.inkSoft}>{sweat ? '?!' : ''}</text>
            </svg>
          );
        })}
      </div>
    </Card>
  );
};

/** 4,000 problems → <10% cracked → 372 results. One square = 10 problems. */
const Problems: React.FC = () => {
  const { frame, fps, t } = useT();
  const fill = prog(t, T.n4000 - 0.2, T.problems + 0.3);
  const cracked = new Set<number>(); for (let s = 7; cracked.size < 37;) { s = (s * 1103515245 + 12345) % 2147483648; cracked.add(s % 400); }
  return (
    <Card x={90} y={600} w={900} h={820} inAt={T.thisWeek - 0.35} outAt={T.ugc + 0.05} header="evaluation · unreleased model" tag="OCT 2026">
      <div style={{ position: 'absolute', left: 50, top: 80, display: 'flex', alignItems: 'baseline', gap: 18 }}>
        <span style={{ fontFamily: FONT.mono, fontSize: 28, color: P.inkSoft }}>~</span>
        <Odometer to={4000} a={T.n4000 - 0.1} b={T.problems + 0.2} size={70} />
        <span style={{ fontFamily: FONT.mono, fontSize: 28, color: P.inkSoft }}>open problems</span>
      </div>
      <div style={{ position: 'absolute', left: 50, top: 200, display: 'grid', gridTemplateColumns: 'repeat(25, 28px)', gap: 4 }}>
        {Array.from({ length: 400 }).map((_, i) => {
          const on = fill * 400 > i;
          const hit = cracked.has(i) && t >= T.ten - 0.1;
          return <div key={i} style={{ width: 28, height: 28, borderRadius: 5, background: hit ? P.red : on ? '#DAD6CF' : 'transparent', border: on ? 'none' : '1.5px dashed #DAD6CF', transform: hit ? `scale(${0.6 + 0.4 * pop(frame, fps, T.ten + (i % 7) * 0.04)})` : undefined }} />;
        })}
      </div>
      <div style={{ position: 'absolute', left: 50, top: 732, fontFamily: FONT.mono, fontSize: 20, color: P.inkSoft }}>1 square = 10 problems</div>
      <Rise at={T.ten - 0.05} style={{ position: 'absolute', right: 40, top: 86 }}><Chip text="< 10% cracked" tone="red" size={26} /></Rise>
      {t >= T.still && (
        <div style={{ position: 'absolute', right: 40, top: 680, transform: `scale(${pop(frame, fps, T.n372 - 0.1)})`, transformOrigin: 'right center', display: 'flex', alignItems: 'center', gap: 14, background: P.ink, borderRadius: 22, padding: '10px 24px' }}>
          <Odometer to={372} a={T.n372 - 0.1} b={T.results} size={60} box={false} color="#fff" />
          <span style={{ fontFamily: FONT.mono, fontSize: 24, color: '#fff' }}>results</span>
        </div>
      )}
    </Card>
  );
};

/** The Unique Games Conjecture + Aaronson's wife. */
const UGC: React.FC = () => {
  const { t } = useT();
  const career = prog(t, T.whole - 0.1, T.toward + 0.2);
  return (
    <Card x={90} y={600} w={900} h={820} inAt={T.ugc - 0.35} outAt={T.openai3 + 0.05} header="among the 372">
      <div style={{ position: 'absolute', left: 50, right: 50, top: 90, borderRadius: 20, border: `3px solid ${P.ink}`, background: '#FAF8F5', padding: '26px 30px' }}>
        <div style={{ fontFamily: FONT.mono, fontSize: 22, color: P.inkSoft }}>theoretical computer science</div>
        <div style={{ fontFamily: FONT.serif, fontStyle: 'italic', fontSize: 84, color: P.red, lineHeight: 1.02, marginTop: 8 }}>Unique Games<br />Conjecture</div>
        <div style={{ fontFamily: FONT.mono, fontSize: 24, color: P.ink, marginTop: 14 }}>open since 2002</div>
      </div>
      <Stamp text="proof claimed" at={T.conj} outAt={T.openai3} x={430} y={330} size={46} rotate={-9} />
      <div style={{ position: 'absolute', left: 50, right: 50, top: 470, opacity: prog(t, T.scott - 0.2, T.scott + 0.1) }}>
        <div style={{ fontFamily: FONT.mono, fontSize: 22, color: P.inkSoft }}>scottaaronson.blog · "The Mathocalypse"</div>
        <div style={{ fontFamily: FONT.sans, fontWeight: 700, fontSize: 40, color: P.ink, marginTop: 12, lineHeight: 1.2 }}>His wife worked toward it her whole career.</div>
        <div style={{ marginTop: 24, height: 44, borderRadius: 12, border: `3px solid ${P.ink}`, background: '#EEEBE6', overflow: 'hidden', position: 'relative' }}>
          <div style={{ width: `${career * 100}%`, height: '100%', background: P.red }} />
          <span style={{ position: 'absolute', right: 14, top: 6, fontFamily: FONT.mono, fontSize: 22, color: P.ink }}>a whole career</span>
        </div>
      </div>
    </Card>
  );
};

/** How: no name, one prompt, ~3 hours. */
const How: React.FC = () => {
  const { frame, fps, t } = useT();
  const clock = prog(t, T.three - 0.1, T.thinking + 0.4);
  return (
    <Card x={90} y={600} w={900} h={820} inAt={T.openai3 - 0.35} outAt={T.but + 0.05} header="the model">
      <div style={{ position: 'absolute', left: 50, right: 50, top: 90, display: 'flex', alignItems: 'center', gap: 20, fontFamily: FONT.mono, fontSize: 34, color: P.ink }}>
        name:
        <div style={{ position: 'relative', height: 60, width: 460, borderRadius: 10, background: '#F3F1ED', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, width: `${prog(t, T.name - 0.1, T.name + 0.2) * 100}%`, background: P.ink }} />
          <span style={{ position: 'absolute', left: 20, top: 10, color: '#fff', fontSize: 28, fontWeight: 700, opacity: prog(t, T.name + 0.1, T.name + 0.3) }}>UNRELEASED</span>
        </div>
      </div>
      <Rise at={T.almost - 0.1} style={{ position: 'absolute', left: 50, right: 50, top: 220 }}>
        <div style={{ borderRadius: 18, background: '#16181D', padding: '22px 26px', fontFamily: FONT.mono, fontSize: 28, color: '#E6E6E6' }}>
          <span style={{ color: P.red }}>prompt ×1</span> → <span style={{ color: '#7CE38B' }}>almost every result</span>
        </div>
      </Rise>
      <div style={{ position: 'absolute', left: 50, top: 400, display: 'flex', alignItems: 'center', gap: 40, opacity: prog(t, T.with_ - 0.2, T.with_ + 0.1) }}>
        <svg width="240" height="240" viewBox="0 0 240 240">
          <circle cx="120" cy="120" r="104" fill="#fff" stroke={P.ink} strokeWidth="8" />
          <path d={`M120 120 L120 16 A104 104 0 0 1 ${120 + 104 * Math.sin(clock * Math.PI / 2)} ${120 - 104 * Math.cos(clock * Math.PI / 2)} Z`} fill={P.redSoft} />
          <g transform={`rotate(${clock * 90} 120 120)`}><rect x="116" y="30" width="8" height="94" rx="4" fill={P.red} /></g>
          <circle cx="120" cy="120" r="12" fill={P.ink} />
        </svg>
        <div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}><span style={{ fontFamily: FONT.black, fontWeight: 800, fontSize: 120, color: P.red, lineHeight: 1 }}>~3</span><span style={{ fontFamily: FONT.sans, fontWeight: 700, fontSize: 48 }}>hours</span></div>
          <div style={{ fontFamily: FONT.mono, fontSize: 26, color: P.inkSoft }}>of thinking per result</div>
          <div style={{ fontFamily: FONT.mono, fontSize: 18, color: P.inkSoft, marginTop: 10 }}>(average, per OpenAI)</div>
        </div>
      </div>
    </Card>
  );
};

/** The catch: < half computer-checked, and a locked model. */
const Catch: React.FC = () => {
  const { frame, fps, t } = useT();
  const bar = prog(t, T.half - 0.2, T.checked + 0.3);
  return (
    <Card x={90} y={600} w={900} h={820} inAt={T.but - 0.35} outAt={T.these - 0.05} header="the catch" tag="NOT PEER REVIEWED">
      <div style={{ position: 'absolute', left: 50, right: 50, top: 90 }}>
        <div style={{ fontFamily: FONT.mono, fontSize: 24, color: P.inkSoft, marginBottom: 12 }}>main results checked by a computer (Lean)</div>
        <div style={{ height: 70, borderRadius: 16, border: `3px solid ${P.ink}`, background: '#EEEBE6', overflow: 'hidden', position: 'relative' }}>
          <div style={{ width: `${42 * bar}%`, height: '100%', background: P.green }} />
          <div style={{ position: 'absolute', left: '50%', top: -6, bottom: -6, width: 4, background: P.ink }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 12, fontFamily: FONT.mono, fontSize: 26 }}>
          <span style={{ color: P.green, fontWeight: 700 }}><Odometer to={42} a={T.half - 0.2} b={T.checked + 0.3} size={44} box={false} color={P.green} suffix="%" /></span>
          <span style={{ color: P.inkSoft }}>← half</span>
        </div>
      </div>
      <div style={{ position: 'absolute', left: 50, right: 50, top: 400, display: 'flex', alignItems: 'center', gap: 36, opacity: prog(t, T.nobody - 0.2, T.nobody + 0.1) }}>
        <div style={{ position: 'relative', width: 260, height: 260, borderRadius: 30, background: P.ink, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="120" height="140" viewBox="0 0 120 140"><path d="M28 60 V40 A32 32 0 0 1 92 40 V60" stroke="#fff" strokeWidth="12" fill="none" /><rect x="14" y="60" width="92" height="74" rx="14" fill={P.red} /></svg>
          {t >= T.how && <div style={{ position: 'absolute', right: -24, top: -24, width: 80, height: 80, borderRadius: 40, background: '#fff', border: `4px solid ${P.ink}`, fontFamily: FONT.black, fontWeight: 800, fontSize: 52, color: P.red, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${pop(frame, fps, T.how)})` }}>?</div>}
        </div>
        <div>
          <div style={{ fontFamily: FONT.sans, fontWeight: 700, fontSize: 44, color: P.ink, lineHeight: 1.15 }}>Nobody outside<br />can run it</div>
          <Rise at={T.how}><div style={{ fontFamily: FONT.mono, fontSize: 24, color: P.red, marginTop: 14 }}>so: how did it get there?</div></Rise>
        </div>
      </div>
    </Card>
  );
};

/** Credit: free papers → model; 25 Fields medalists sign a letter. */
const Credit: React.FC = () => {
  const { frame, fps, t } = useT();
  return (
    <Card x={90} y={600} w={900} h={820} inAt={T.these - 0.35} outAt={T.tao + 0.05} header="where it learned">
      <Phase a={T.these - 0.3} b={T.n25 - 0.1}>
        <div style={{ position: 'absolute', left: 50, top: 100, display: 'flex', flexDirection: 'column', gap: 16 }}>
          {['arXiv · 1998', 'arXiv · 2009', 'arXiv · 2016', 'arXiv · 2023'].map((p, i) => {
            const k = pop(frame, fps, T.papers - 0.3 + i * 0.12);
            const fly = prog(t, T.mathematicians_ + i * 0.1, T.mathematicians_ + 0.5 + i * 0.1);
            return (
              <div key={p} style={{ width: 300, height: 100, borderRadius: 14, border: `3px solid ${P.ink}`, background: '#FAF8F5', padding: '12px 18px', transform: `scale(${k}) translateX(${fly * 290}px)`, opacity: 1 - fly * 0.7, position: 'relative' }}>
                <div style={{ fontFamily: FONT.mono, fontSize: 20, color: P.inkSoft }}>{p}</div>
                <div style={{ height: 9, width: '80%', background: '#DAD6CF', borderRadius: 5, marginTop: 10 }} />
                {t >= T.free - 0.1 && <div style={{ position: 'absolute', right: -14, top: -14, transform: `scale(${pop(frame, fps, T.free - 0.1 + i * 0.05)}) rotate(8deg)`, background: P.green, color: '#fff', borderRadius: 999, padding: '4px 12px', fontFamily: FONT.mono, fontWeight: 700, fontSize: 18 }}>FREE</div>}
              </div>
            );
          })}
        </div>
        <div style={{ position: 'absolute', right: 50, top: 200, width: 260, height: 260, borderRadius: 30, background: P.ink, color: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', transform: `scale(${pop(frame, fps, T.learned - 0.1)})` }}>
          <div style={{ fontFamily: FONT.mono, fontSize: 22, color: 'rgba(255,255,255,0.6)' }}>trained</div>
          <div style={{ fontFamily: FONT.black, fontWeight: 800, fontSize: 52 }}>MODEL</div>
        </div>
      </Phase>
      <Phase a={T.n25 - 0.1} b={T.tao + 0.2}>
        <div style={{ position: 'absolute', left: 50, right: 50, top: 90 }}>
          <div style={{ fontFamily: FONT.mono, fontSize: 22, color: P.inkSoft }}>open letter · Sep 2026</div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 16, marginTop: 6 }}>
            <Odometer to={25} a={T.n25 - 0.1} b={T.medal_ + 0.2} size={96} color={P.red} box={false} />
            <span style={{ fontFamily: FONT.sans, fontWeight: 700, fontSize: 44 }}>Fields Medal winners</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(9, 1fr)', gap: 10, marginTop: 22 }}>
            {Array.from({ length: 25 }).map((_, i) => (
              <svg key={i} width="80" height="36" viewBox="0 0 80 36" style={{ transform: `scale(${pop(frame, fps, T.signed_ - 0.2 + i * 0.03)})` }}>
                <path d={`M6 ${22 + (i % 3)} q10 -${14 + (i % 4) * 2} 18 0 t18 ${-4 + (i % 5)} t18 ${3 - (i % 3)} t14 -6`} stroke={P.ink} strokeWidth="3" fill="none" strokeLinecap="round" />
              </svg>
            ))}
          </div>
          <div style={{ marginTop: 26, borderRadius: 18, background: '#FAF8F5', border: `3px solid ${P.ink}`, padding: '20px 24px', fontFamily: FONT.serif, fontStyle: 'italic', fontSize: 44, color: P.ink, lineHeight: 1.2 }}>
            "…severe attribution and{' '}
            <span style={{ color: P.red, textDecoration: t >= T.plagiarism ? `underline ${P.red} 4px` : 'none' }}>plagiarism</span> questions."
          </div>
          <Rise at={T.credit - 0.05}><div style={{ marginTop: 18, display: 'flex', gap: 12 }}><Chip text="CREDIT" tone="red" size={28} /><Chip text="CITATIONS" tone="soft" size={28} /></div></Rise>
        </div>
      </Phase>
    </Card>
  );
};

/** Tao: being first should matter less, explaining more. */
const Tao: React.FC = () => {
  const { t } = useT();
  const k = prog(t, T.less - 0.2, T.more + 0.2);
  return (
    <Card x={90} y={600} w={900} h={820} inAt={T.tao - 0.35} outAt={T.because + 0.05} header="Terence Tao · what should earn credit">
      <div style={{ position: 'absolute', left: 50, right: 50, top: 110, display: 'flex', flexDirection: 'column', gap: 50 }}>
        {[['BEING FIRST', lerp(0.9, 0.3, k), '#9A9DA6', T.first], ['EXPLAINING IT', lerp(0.3, 0.95, prog(t, T.explaining - 0.2, T.more + 0.2)), P.red, T.explaining]].map(([label, w, c, a], i) => (
          <Rise key={i} at={(a as number) - 0.2}>
            <div style={{ fontFamily: FONT.mono, fontSize: 30, fontWeight: 700, color: P.ink, marginBottom: 12 }}>{label as string}</div>
            <div style={{ height: 90, borderRadius: 18, border: `3px solid ${P.ink}`, background: '#EEEBE6', overflow: 'hidden' }}>
              <div style={{ width: `${(w as number) * 100}%`, height: '100%', background: c as string }} />
            </div>
          </Rise>
        ))}
        <Rise at={T.explaining + 0.3}><div style={{ fontFamily: FONT.serif, fontStyle: 'italic', fontSize: 58, color: P.red }}>…and building on it.</div></Rise>
      </div>
    </Card>
  );
};

/** The loop that could break open science (save frame). */
const Loop: React.FC = () => {
  const { frame, fps, t } = useT();
  const nodes: [string, number, number, number][] = [['you share your work', 450, 110, T.sharing], ['it trains a model', 760, 380, T.trains], ['the model takes credit', 450, 640, T.takes], ['people stop sharing', 140, 380, T.stop]];
  const broken = t >= T.stop;
  return (
    <Card x={90} y={600} w={900} h={820} inAt={T.because - 0.35} outAt={T.want + 0.05} header="the risk" tag="OPEN SCIENCE">
      <svg width="900" height="820" style={{ position: 'absolute', left: 0, top: 0 }}>
        <circle cx="450" cy="400" r="270" fill="none" stroke={broken ? P.red : P.line} strokeWidth="8" strokeDasharray={broken ? '30 22' : 'none'} />
      </svg>
      {nodes.map(([l, x, y, a], i) => (
        <div key={l} style={{ position: 'absolute', left: x, top: y, transform: `translate(-50%,-50%) scale(${pop(frame, fps, a - 0.1)})`, background: i === 3 ? P.red : '#fff', color: i === 3 ? '#fff' : P.ink,
          border: `3px solid ${P.ink}`, borderRadius: 18, padding: '14px 20px', fontFamily: FONT.sans, fontWeight: 700, fontSize: 30, whiteSpace: 'nowrap', boxShadow: `0 6px 0 ${P.ink}` }}>{l}</div>
      ))}
      {broken && <div style={{ position: 'absolute', left: 450, top: 400, transform: `translate(-50%,-50%) scale(${pop(frame, fps, T.stop)})`, fontFamily: FONT.black, fontWeight: 800, fontSize: 150, color: P.red, lineHeight: 1 }}>✕</div>}
    </Card>
  );
};

// ---- composition ------------------------------------------------------------
export const A9: React.FC = () => {
  const { frame, fps, t } = useT();
  const tuck = spr(frame, fps, T.thisWeek - 0.1, { damping: 15, stiffness: 120 });
  const ctaHide = prog(t, T.want - 0.1, T.want + 0.3);
  return (
    <Stage
      slug="a9-math-release" vo={vo} poses={POSES} sfx={SFX}
      modes={[{ t: 0, mode: 'hook' }, { t: T.thisWeek - 0.1, mode: 'items' }, { t: T.want - 0.1, mode: 'act' }]}
    >
      <TopBar
        chapters={[{ t: 0, label: '// 00 — one release' }, { t: T.thisWeek, label: '// 01 — what happened' }, { t: T.openai3, label: '// 02 — how' },
          { t: T.but, label: '// 03 — the catch' }, { t: T.these, label: '// 04 — the credit fight' }, { t: T.because, label: '// 05 — what\'s at stake' }, { t: T.want, label: '// 06 — learn AI' }]}
        counter={{ label: 'STORY', total: 4, ticks: PLUGS.map((p) => p.t + 0.25) }}
      />
      <Headline vo={vo} />
      <Decades />
      <div style={{ opacity: (1 - ctaHide) * prog(t, T.thisWeek - 0.1, T.thisWeek + 0.2) }}>
        <PlugStrip label="STORY" plugs={PLUGS} appear={T.thisWeek - 0.1} x={lerp(80, 60, tuck)} y={1620} scale={0.78} />
      </div>
      <Problems />
      <UGC />
      <How />
      <Catch />
      <Credit />
      <Tao />
      <Loop />
      <SaveTag at={T.because + 0.2} x={680} y={540} outAt={T.want} />
      <Cta from={T.want} screen="apply" solveAt={T.lesson + 0.2} chip={{ at: T.head, text: 'teyro.app' }} logoAt={T.teyro - 0.05} />
    </Stage>
  );
};
