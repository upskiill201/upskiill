import React from 'react';
import { Img, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import voData from './vo.json';
import { Stage, type Sfx } from '../../explainer/Stage';
import { Headline } from '../../explainer/Headline';
import { TopBar } from '../../explainer/TopBar';
import { Card, Rise, SaveTag, Stamp, Tick } from '../../explainer/Kit';
import { Big, Chip, Label } from '../../explainer/Blocks';
import { Cta } from '../../explainer/Cta';
import { at as atW, type VO } from '../../explainer/vo';
import { FONT, P } from '../../explainer/tokens';
import { lerp, pop, prog, spr } from '../../explainer/anim';
import type { PoseName } from '../../host/Ada';

/**
 * C6: "Don't trust that red heart" (Teyro, Coding pillar, "Behind the tap" format).
 * One evolving slow-motion lab (phone ⇄ server + a live ms clock) for the 4 steps, then the speed rule
 * (save card), the name + Meta's docs, an airplane-mode challenge (comment card) and the CTA.
 * Timings on the clock are illustrative and labelled as such. Sources: ./script.json
 */
const vo = voData as unknown as VO;
const at = (w: string, n = 1) => atW(vo, w, n);
export const C6_DURATION = Math.ceil((vo.duration + 0.4) * 30);

const T = {
  dont: at("Don't"), lying: at('lying'), heres: at("Here's"), firstSec: at('first'), tap: at('tap.'),
  first: at('First,', 2), zero: at('zero'), ms: at('milliseconds,'), red2: at('red', 2), asked: at('asked'), server1: at('server.'),
  second: at('Second,', 2), tiny: at('tiny'), leaves: at('leaves'), saying: at('saying'), travels: at('travels'), server2: at('server', 2), while_: at('while'), scrolling: at('scrolling.'),
  third: at('Third,'), msg2: at('message', 2), fails: at('fails,'), lose: at('lose'), signal: at('signal,'), rolls: at('rolls'), tries: at('tries'),
  finally: at('finally,'), why: at('why?'), tenth: at('tenth'), instant: at('instant,'), trip: at('trip'), longer: at('longer.'), guesses: at('guesses'), succeed: at('succeed.'),
  full: at('full'), three: at('three'), tenth2: at('tenth', 2), one: at('one'), flow: at('flow,'), ten: at('ten'), attention: at('attention.'),
  optimistic: at('optimistic'), metas: at("Meta's"), like2: at('Like', 2), example: at('example.'),
  tryIt: at('Try'), airplane: at('airplane'), tap2: at('tap', 2), like3: at('Like', 3), watch: at('watch'), does: at('does.'),
  if_: at('If', 2), bio: at('bio.'), teyro: at('Teyro.'),
};
const LAB_OUT = T.finally + 0.05;
const PLUGS = [{ t: T.first, tag: '0ms' }, { t: T.second, tag: 'send' }, { t: T.third, tag: 'fail' }, { t: T.finally, tag: 'why' }];

const POSES: { t: number; p: PoseName }[] = [
  { t: 0, p: 'worried' }, { t: T.lying - 0.1, p: 'pointUpL' }, { t: T.heres, p: 'think' }, { t: T.tap - 0.1, p: 'present' },
  { t: T.first - 0.05, p: 'count1' }, { t: T.zero, p: 'surprise' }, { t: T.asked, p: 'shrug' },
  { t: T.second - 0.05, p: 'count2' }, { t: T.travels, p: 'pointUpL' }, { t: T.scrolling, p: 'chill' },
  { t: T.third - 0.05, p: 'count3' }, { t: T.lose, p: 'worried' }, { t: T.rolls, p: 'pointUpL' }, { t: T.tries, p: 'thumbsUp' },
  { t: T.finally - 0.05, p: 'count4' }, { t: T.why, p: 'think' }, { t: T.tenth, p: 'pointUpL' }, { t: T.guesses, p: 'wink' },
  { t: T.full, p: 'present' }, { t: T.tenth2 - 0.05, p: 'count1' }, { t: T.one - 0.05, p: 'count2' }, { t: T.ten - 0.05, p: 'count3' }, { t: T.attention, p: 'sleep' },
  { t: T.optimistic - 0.1, p: 'open' }, { t: T.metas, p: 'pointUpL' }, { t: T.example, p: 'thumbsUp' },
  { t: T.tryIt, p: 'fist' }, { t: T.airplane, p: 'pointUpL' }, { t: T.watch, p: 'surprise' },
  { t: T.if_, p: 'present' }, { t: T.bio + 0.1, p: 'wave' }, { t: T.teyro - 0.05, p: 'wink' },
];

const SFX: Sfx[] = [
  { t: 0.05, name: 'heartbeat', vol: 0.25 }, { t: T.lying, name: 'slam', vol: 0.34 }, { t: T.heres, name: 'datawhoosh', vol: 0.25 }, { t: T.tap, name: 'blip', vol: 0.3 },
  ...PLUGS.flatMap((p) => [{ t: p.t, name: 'whoosh', vol: 0.16 }, { t: p.t + 0.25, name: 'pop', vol: 0.32 }]),
  { t: T.zero, name: 'pop2', vol: 0.4 }, { t: T.asked, name: 'tick', vol: 0.25 },
  { t: T.leaves, name: 'swish', vol: 0.28 }, ...[0, 0.5, 1.0, 1.5, 2.0].map((d) => ({ t: T.leaves + d, name: 'tick', vol: 0.14 })), { t: T.server2 + 0.1, name: 'success', vol: 0.28 }, { t: T.while_, name: 'swish', vol: 0.18 },
  { t: T.msg2, name: 'swish', vol: 0.25 }, { t: T.lose, name: 'glitch', vol: 0.3 }, { t: T.rolls, name: 'blip', vol: 0.3 }, { t: T.tries, name: 'notify', vol: 0.22 },
  { t: T.tenth, name: 'pop', vol: 0.3 }, { t: T.trip, name: 'scan', vol: 0.2 }, { t: T.guesses, name: 'shimmer', vol: 0.28 },
  ...[T.tenth2, T.one, T.ten].map((t) => ({ t, name: 'pop2', vol: 0.32 })), { t: T.three, name: 'pop', vol: 0.25 },
  { t: T.optimistic, name: 'power', vol: 0.25 }, { t: T.like2, name: 'coin', vol: 0.25 },
  { t: T.airplane, name: 'blip', vol: 0.3 }, { t: T.like3, name: 'pop2', vol: 0.35 }, { t: T.watch, name: 'heartbeat', vol: 0.25 },
  { t: T.if_, name: 'whoosh', vol: 0.22 }, { t: T.if_ + 1.2, name: 'success', vol: 0.25 }, { t: T.bio, name: 'notify', vol: 0.35 }, { t: T.teyro, name: 'shimmer', vol: 0.3 },
];

const useT = () => { const frame = useCurrentFrame(); const { fps } = useVideoConfig(); return { frame, fps, t: frame / fps }; };

const HEART = 'M12 21s-7.5-4.6-10-9.3C.5 8.4 2.3 4 6.3 4c2.3 0 3.9 1.4 5.7 3.4C13.8 5.4 15.4 4 17.7 4c4 0 5.8 4.4 4.3 7.7C19.5 16.4 12 21 12 21z';
const PLANE = 'M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z';
const Heart: React.FC<{ on: boolean; size: number; popAt?: number }> = ({ on, size, popAt }) => {
  const { frame, fps } = useT();
  const p = popAt !== undefined && on ? pop(frame, fps, popAt) : 1;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" style={{ transform: `scale(${0.6 + 0.4 * Math.min(p, 1.3)})`, flex: 'none' }}>
      <path d={HEART} fill={on ? '#FF3040' : 'none'} stroke={on ? '#FF3040' : P.ink} strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );
};
const Bars: React.FC<{ n: number; plane?: boolean }> = ({ n, plane }) => plane ? (
  <svg width="30" height="30" viewBox="0 0 24 24"><path d={PLANE} fill={P.ink} /></svg>
) : (
  <div style={{ display: 'flex', alignItems: 'flex-end', gap: 3, height: 24 }}>
    {[0, 1, 2, 3].map((i) => <div key={i} style={{ width: 6, height: 7 + i * 5, borderRadius: 2, background: i < n ? P.ink : '#CFCAC0' }} />)}
    {n === 0 && <span style={{ fontFamily: FONT.mono, fontSize: 18, color: P.red, marginLeft: 6, fontWeight: 700 }}>no signal</span>}
  </div>
);

/** The phone feed: one post with the heart + count; scrolls by `scroll` px. */
const Phone: React.FC<{ x: number; y: number; w: number; h: number; liked: boolean; popAt?: number; scroll?: number; bars?: number; plane?: boolean; tapAt?: number }> =
  ({ x, y, w, h, liked, popAt, scroll = 0, bars = 4, plane, tapAt }) => {
    const { frame, fps, t } = useT();
    const ring = tapAt !== undefined && t >= tapAt && t < tapAt + 0.6 ? prog(t, tapAt, tapAt + 0.6) : -1;
    return (
      <div style={{ position: 'absolute', left: x, top: y, width: w, height: h, borderRadius: 52, background: P.ink, padding: 12, boxShadow: '0 24px 50px rgba(0,0,0,0.18)' }}>
        <div style={{ position: 'relative', width: '100%', height: '100%', borderRadius: 42, background: '#fff', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', left: 26, right: 26, top: 18, display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontFamily: FONT.mono, fontSize: 20, color: P.ink, zIndex: 2, background: '#fff' }}>
            <span>9:41</span><Bars n={bars} plane={plane} />
          </div>
          <div style={{ position: 'absolute', left: 0, right: 0, top: 64 - scroll }}>
            {[0, 1].map((k) => (
              <div key={k} style={{ padding: '10px 20px 22px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 22, background: k ? '#7C8CF8' : '#F59E0B' }} />
                  <span style={{ fontFamily: FONT.sans, fontWeight: 700, fontSize: 24, color: P.ink }}>{k ? 'dev.daily' : 'maya.codes'}</span>
                </div>
                <div style={{ height: w * 0.62, borderRadius: 18, background: k ? 'linear-gradient(160deg,#C7D2FE,#818CF8)' : 'linear-gradient(170deg,#FDE68A,#FB923C 60%,#F43F5E)', position: 'relative', overflow: 'hidden' }}>
                  {!k && <div style={{ position: 'absolute', left: '50%', bottom: -40, width: 160, height: 160, marginLeft: -80, borderRadius: 80, background: '#FFF7D6', opacity: 0.85 }} />}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 14, position: 'relative' }}>
                  <div style={{ position: 'relative' }}>
                    <Heart on={k === 0 && liked} size={46} popAt={k === 0 ? popAt : undefined} />
                    {k === 0 && ring >= 0 && <div style={{ position: 'absolute', left: 23 - 50 * (0.4 + ring), top: 23 - 50 * (0.4 + ring), width: 100 * (0.4 + ring), height: 100 * (0.4 + ring), borderRadius: 999, border: `5px solid ${P.red}`, opacity: 1 - ring }} />}
                  </div>
                  <Img src={staticFile('art/comment.svg')} style={{ width: 40, height: 40, opacity: 0.8 }} />
                </div>
                <div style={{ fontFamily: FONT.sans, fontWeight: 700, fontSize: 24, color: P.ink, marginTop: 8 }}>{k ? '1,207' : liked ? '4,812' : '4,811'} likes</div>
              </div>
            ))}
          </div>
          {frame < 0 && null}
        </div>
      </div>
    );
  };

// ---------- the slow-motion lab (hook → step 4) ----------
const clockMs = (t: number) => {
  if (t < T.second) return 0;
  if (t < T.third) return Math.round(180 * prog(t, T.leaves, T.server2 + 0.1));
  if (t < T.msg2) return 0;
  return Math.round(1200 * prog(t, T.msg2, T.rolls));
};
const liked = (t: number) => (t < T.heres) || (t >= T.ms && t < T.rolls);
const serverLikes = (t: number) => (t >= T.server2 + 0.1 && t < T.third ? '4,812' : '4,811');

const bez = (k: number, a: number[], b: number[], c: number[], d: number[]) => {
  const u = 1 - k;
  return [0, 1].map((i) => u * u * u * a[i] + 3 * u * u * k * b[i] + 3 * u * k * k * c[i] + k * k * k * d[i]);
};
const CA = [372, 470], CB = [470, 640], CC = [520, 330], CD = [560, 300];

const Lab: React.FC = () => {
  const { frame, fps, t } = useT();
  const enter = spr(frame, fps, -0.35, { damping: 14, stiffness: 170 });
  const leave = prog(t, LAB_OUT - 0.25, LAB_OUT);
  if (leave >= 1) return null;
  const isLiked = liked(t);
  const ms = clockMs(t);
  const showClock = t >= T.firstSec;
  const branch = t >= T.third;
  // packets
  const okK = t >= T.leaves && t < T.server2 + 0.3 ? prog(t, T.leaves, T.server2 + 0.1) : -1;
  const failK = t >= T.msg2 && t < T.rolls + 0.2 ? Math.min(0.5, prog(t, T.msg2, T.lose) * 0.5) : -1;
  const failed = t >= T.lose;
  const pkt = okK >= 0 ? okK : failK;
  const [px, py] = pkt >= 0 ? bez(pkt, CA, CB, CC, CD) : [0, 0];
  const scroll = 150 * prog(t, T.while_, T.scrolling + 0.4) * (1 - prog(t, T.third, T.third + 0.4));
  const bars = t >= T.lose && t < T.tries ? 0 : 4;
  return (
    <div style={{ position: 'absolute', left: 90, top: 590, width: 900, height: 780, opacity: Math.min(enter, 1 - leave), transform: `translateY(${(1 - enter) * 80 - leave * 60}px)` }}>
      {/* cable */}
      <svg width="900" height="780" style={{ position: 'absolute', left: 0, top: 0 }}>
        <path d={`M${CA} C${CB} ${CC} ${CD}`} stroke={P.ink} strokeWidth="5" strokeDasharray="4 14" strokeLinecap="round" fill="none" opacity={0.55} />
        {failed && failK >= 0 && <g transform={`translate(${bez(0.5, CA, CB, CC, CD).join(',')})`}><circle r="34" fill={P.red} /><path d="M-13 -13 L13 13 M13 -13 L-13 13" stroke="#fff" strokeWidth="7" strokeLinecap="round" /></g>}
      </svg>
      <Phone x={0} y={60} w={380} h={720} liked={isLiked} popAt={isLiked && t > T.heres ? T.ms : undefined} scroll={scroll} bars={bars} tapAt={T.zero - 0.1} />
      {/* WARNING tape across the phone (hook) */}
      {t < T.heres && (
        <div style={{ position: 'absolute', left: -60, top: 300, width: 520, height: 70, transform: 'rotate(-14deg)', background: 'repeating-linear-gradient(45deg,#FFD400 0 36px,#16181D 36px 72px)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 20px rgba(0,0,0,0.25)', opacity: 1 - prog(t, T.heres - 0.25, T.heres) }}>
          <span style={{ background: '#FFD400', padding: '4px 22px', fontFamily: FONT.black, fontWeight: 800, fontSize: 40, letterSpacing: 4, color: P.ink }}>WARNING</span>
        </div>
      )}
      {/* rewind flash */}
      {t >= T.heres && t < T.heres + 0.5 && <div style={{ position: 'absolute', left: 0, top: 60, width: 380, height: 720, borderRadius: 52, background: '#fff', opacity: 0.8 * (1 - prog(t, T.heres, T.heres + 0.5)) }} />}
      {/* clock */}
      {showClock && (
        <div style={{ position: 'absolute', left: 500, top: 0, transform: `scale(${pop(frame, fps, T.firstSec)})`, transformOrigin: 'left top' }}>
          <Label size={20}>SLOW MOTION · illustrative</Label>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, fontFamily: FONT.mono, fontWeight: 800, color: branch && failed ? P.red : P.ink }}>
            <span style={{ fontSize: 92, letterSpacing: -2 }}>{String(ms).padStart(4, '0')}</span><span style={{ fontSize: 36 }}>ms</span>
          </div>
        </div>
      )}
      {/* server */}
      <div style={{ position: 'absolute', left: 560, top: 200, width: 320, height: 250, borderRadius: 24, background: '#fff', border: `3px solid ${P.ink}`, boxShadow: `0 8px 0 ${P.ink}` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '16px 20px', borderBottom: `2px solid ${P.line}`, fontFamily: FONT.mono, fontSize: 22, color: P.inkSoft }}>
          <span style={{ width: 14, height: 14, borderRadius: 7, background: t >= T.server2 && t < T.third ? P.green : t >= T.lose && branch ? P.red : '#F5B700' }} />server
        </div>
        <div style={{ padding: '16px 20px', fontFamily: FONT.mono, fontSize: 26, color: P.ink, lineHeight: 1.6 }}>
          <div>post 4812</div>
          <div>likes: <b>{serverLikes(t)}</b></div>
        </div>
      </div>
      {/* the packet */}
      {pkt >= 0 && (
        <div style={{ position: 'absolute', left: px - 20, top: py - 34, transform: `scale(${pop(frame, fps, okK >= 0 ? T.leaves : T.msg2)})`, opacity: failed && failK >= 0 ? 1 - prog(t, T.lose, T.lose + 0.5) : 1,
          background: failed && failK >= 0 ? P.red : P.ink, color: '#fff', borderRadius: 14, padding: '10px 16px', fontFamily: FONT.mono, fontWeight: 700, fontSize: 22, whiteSpace: 'nowrap', boxShadow: '0 8px 18px rgba(0,0,0,0.25)' }}>
          {t >= T.saying || branch ? '{ like: post 4812 }' : '{ … }'}
        </div>
      )}
      {/* captions on the lab */}
      {t >= T.lying && t < T.heres && <Rise at={T.lying} style={{ position: 'absolute', left: 560, top: 480 }}><Chip text="server: no idea yet" tone="red" size={24} /></Rise>}
      {t >= T.lying && t < T.heres && <Stamp text="not saved" at={T.lying} outAt={T.heres} x={30} y={430} size={54} />}
      {t >= T.heres && t < T.first && <Rise at={T.heres} style={{ position: 'absolute', left: 560, top: 480 }}><Chip text="rewind · tap again" tone="soft" size={24} /></Rise>}
      {t >= T.red2 && t < T.second && <Rise at={T.red2} style={{ position: 'absolute', left: 560, top: 480 }}><Chip text="screen updates first" tone="ink" size={24} /></Rise>}
      {t >= T.asked && t < T.second && <Rise at={T.asked} style={{ position: 'absolute', left: 560, top: 560 }}><Chip text="server: not asked yet" tone="red" size={24} /></Rise>}
      {t >= T.server2 + 0.1 && t < T.third && <Rise at={T.server2 + 0.1} style={{ position: 'absolute', left: 560, top: 480, display: 'flex', alignItems: 'center', gap: 12 }}><Tick at={T.server2 + 0.1} size={44} /><Chip text="saved · 180 ms later" tone="green" size={24} /></Rise>}
      {t >= T.scrolling && t < T.third && <Rise at={T.scrolling} style={{ position: 'absolute', left: 560, top: 560 }}><Label size={24}>…you already scrolled on</Label></Rise>}
      {t >= T.third && t < LAB_OUT && <Rise at={T.third} style={{ position: 'absolute', left: 560, top: 480 }}><Chip text="what if it fails?" tone="soft" size={24} /></Rise>}
      {t >= T.rolls && <Rise at={T.rolls} style={{ position: 'absolute', left: 560, top: 560 }}><Chip text="rolled back" tone="red" size={24} /></Rise>}
      {t >= T.tries && <Rise at={T.tries} style={{ position: 'absolute', left: 560, top: 640 }}><Chip text="or: retry when online" tone="ink" size={24} /></Rise>}
    </div>
  );
};

// ---------- step 4: why ----------
const LOG = (s: number) => (Math.log10(s) + 2) / 3; // 0.01 s → 0, 10 s → 1
const WhyCard: React.FC = () => {
  const { t } = useT();
  const W = 760;
  return (
    <Card x={90} y={590} w={900} h={780} inAt={T.finally - 0.35} outAt={T.full + 0.05} header="why apps guess">
      <div style={{ position: 'absolute', left: 70, top: 130, width: W }}>
        <div style={{ position: 'relative', height: 90 }}>
          <div style={{ position: 'absolute', left: 0, width: W * LOG(0.1), top: 0, height: 90, borderRadius: '16px 0 0 16px', background: '#DFF5E6', opacity: t >= T.tenth ? 1 : 0.2 }} />
          <div style={{ position: 'absolute', left: 0, right: 0, top: 88, height: 4, background: P.ink }} />
          {[0.01, 0.1, 1, 10].map((s) => (
            <div key={s} style={{ position: 'absolute', left: W * LOG(s) - 2, top: 80, width: 4, height: 24, background: P.ink }}>
              <div style={{ position: 'absolute', top: 30, left: -40, width: 80, textAlign: 'center', fontFamily: FONT.mono, fontSize: 22, color: P.inkSoft }}>{s} s</div>
            </div>
          ))}
        </div>
        <Rise at={T.tenth} style={{ position: 'absolute', left: 0, top: 160 }}><Chip text="≤ 0.1 s feels instant" tone="green" /></Rise>
        <div style={{ position: 'absolute', left: 0, top: 250 }}>
          <Label size={24}>a trip to the server (varies)</Label>
          <div style={{ marginTop: 10, height: 46, borderRadius: 12, width: W * LOG(0.6) * prog(t, T.trip, T.longer + 0.2), background: `repeating-linear-gradient(90deg, ${P.red} 0 18px, #F08A82 18px 30px)` }} />
        </div>
        <Rise at={T.longer} style={{ position: 'absolute', left: W * LOG(0.6) + 16, top: 280 }}><Big size={40} serif color={P.red}>longer</Big></Rise>
        <Rise at={T.guesses} style={{ position: 'absolute', left: 0, top: 400, display: 'flex', alignItems: 'center', gap: 20 }}>
          <Heart on size={90} popAt={T.guesses} /><Big size={60}>so it guesses:</Big>
        </Rise>
        <Rise at={T.succeed} style={{ position: 'absolute', left: 0, top: 510 }}><Big size={72} serif color={P.red}>"it'll work"</Big></Rise>
      </div>
    </Card>
  );
};

// ---------- the speed rule (save card) ----------
const RuleCard: React.FC = () => {
  const { t } = useT();
  const rows: [string, string, string, number][] = [['0.1 s', 'feels instant', P.green, T.tenth2], ['1 s', 'keeps your flow', '#E0A100', T.one], ['10 s', 'attention gone', P.red, T.ten]];
  return (
    <Card x={90} y={590} w={900} h={780} inAt={T.full - 0.35} outAt={T.optimistic - 0.5} header="the 3 speed limits" tag="save it">
      <div style={{ position: 'absolute', left: 54, right: 54, top: 110, display: 'flex', flexDirection: 'column', gap: 30 }}>
        {rows.map(([n, what, c, a], i) => (
          <div key={i} style={{ opacity: t >= a - 0.05 ? 1 : 0.22, transform: `scale(${t >= a - 0.05 ? 1 : 0.97})`, transition: 'none' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 30, borderLeft: `14px solid ${c}`, background: '#F6F4F0', borderRadius: 20, padding: '26px 30px' }}>
              <span style={{ fontFamily: FONT.black, fontWeight: 800, fontSize: 92, color: c, width: 230 }}>{n}</span>
              <span style={{ fontFamily: FONT.sans, fontWeight: 700, fontSize: 50, color: P.ink }}>{what}</span>
            </div>
          </div>
        ))}
        <Rise at={T.attention}><Label size={24}>Jakob Nielsen, "Response Times: The 3 Important Limits" · nngroup.com</Label></Rise>
      </div>
    </Card>
  );
};

// ---------- the name + Meta's docs ----------
const NameCard: React.FC = () => {
  const { t } = useT();
  const hi = prog(t, T.like2 - 0.05, T.like2 + 0.3);
  const code: [string, string][] = [['function onTapLike() {', ''], ['  showLiked(true);', '// 0 ms: paint it'], ['  sendLike(postId)', '// then ask'], ['    .catch(() => showLiked(false));', '// failed? undo'], ['}', '']];
  return (
    <Card x={90} y={590} w={900} h={780} inAt={T.optimistic - 0.5} outAt={T.tryIt + 0.05} header="optimistic UI">
      <div style={{ position: 'absolute', left: 40, right: 40, top: 86, background: '#16181D', borderRadius: 18, padding: '18px 22px', fontFamily: FONT.mono, fontSize: 25, lineHeight: 1.6, color: '#E6E6E6', whiteSpace: 'pre', fontVariantLigatures: 'none' }}>
        {code.map(([c, cm], i) => (
          <Rise key={i} at={T.optimistic + i * 0.12}><div>{c}{cm && <span style={{ color: '#7CE38B' }}>  {cm}</span>}</div></Rise>
        ))}
      </div>
      <Rise at={T.metas} style={{ position: 'absolute', left: 40, right: 40, top: 390 }}>
        <div style={{ border: `3px solid ${P.ink}`, borderRadius: 20, padding: '20px 26px', background: '#fff' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <Label size={22}>relay.dev · docs · "Optimistic updates"</Label><Chip text="by Meta" tone="ink" size={22} />
          </div>
          <div style={{ fontFamily: FONT.serif, fontStyle: 'italic', fontSize: 40, color: P.ink, lineHeight: 1.25 }}>
            "…if a user clicks the{' '}
            <span style={{ background: `linear-gradient(${P.yellowHi}, ${P.yellowHi}) no-repeat 0 85% / ${hi * 100}% 45%`, color: hi > 0.5 ? P.red : P.ink }}>"Like" button</span>
            , we would like to instantly show…"
          </div>
        </div>
      </Rise>
      <Rise at={T.example} style={{ position: 'absolute', left: 40, top: 650, display: 'flex', gap: 14 }}>
        <Chip text="react.dev: useOptimistic" tone="soft" size={24} /><Chip text="same idea" tone="green" size={24} />
      </Rise>
    </Card>
  );
};

// ---------- the challenge (comment card) ----------
const TryCard: React.FC = () => {
  const { frame, fps, t } = useT();
  const plane = t >= T.airplane + 0.15;
  const sw = prog(t, T.airplane, T.airplane + 0.25);
  const q = t >= T.watch;
  return (
    <Card x={90} y={590} w={900} h={780} inAt={T.tryIt - 0.35} outAt={T.if_ + 0.05} header="try it yourself">
      <div style={{ position: 'absolute', left: 30, top: 80, width: 340, height: 670, transform: 'scale(1)' }}>
        <Phone x={0} y={0} w={340} h={670} liked={t >= T.like3} popAt={T.like3} bars={4} plane={plane} tapAt={T.like3 - 0.1} />
        {q && <div style={{ position: 'absolute', left: 120, top: 250, transform: `scale(${pop(frame, fps, T.watch)})`, fontFamily: FONT.black, fontWeight: 800, fontSize: 200, color: P.red, textShadow: '0 6px 0 #fff' }}>?</div>}
      </div>
      <div style={{ position: 'absolute', left: 410, right: 40, top: 90, display: 'flex', flexDirection: 'column', gap: 20 }}>
        <Rise at={T.tryIt}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#F6F4F0', borderRadius: 20, padding: '20px 24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, fontFamily: FONT.sans, fontWeight: 700, fontSize: 30, color: P.ink }}>
              <svg width="40" height="40" viewBox="0 0 24 24"><path d={PLANE} fill={plane ? '#F59E0B' : P.inkSoft} /></svg>Airplane mode
            </div>
            <div style={{ width: 92, height: 54, borderRadius: 27, background: plane ? P.green : '#CFCAC0', position: 'relative' }}>
              <div style={{ position: 'absolute', top: 5, left: 5 + 38 * sw, width: 44, height: 44, borderRadius: 22, background: '#fff', boxShadow: '0 2px 6px rgba(0,0,0,0.2)' }} />
            </div>
          </div>
        </Rise>
        <Rise at={T.like3 - 0.05}><Label size={26}>2. tap Like  3. watch the heart</Label></Rise>
        {t >= T.watch - 0.1 && (
          <Rise at={T.watch}>
            <div style={{ border: `3px solid ${P.ink}`, borderRadius: 22, padding: '20px 22px', background: '#fff', boxShadow: `0 8px 0 ${P.ink}` }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontFamily: FONT.sans, fontWeight: 700, fontSize: 30, color: P.ink, marginBottom: 14 }}>
                <Img src={staticFile('art/comment.svg')} style={{ width: 40, height: 40 }} />What did YOUR app do?
              </div>
              {['A · stayed red', 'B · went grey again', 'C · showed an error'].map((o, i) => (
                <Rise key={i} at={T.watch + 0.15 + i * 0.15}>
                  <div style={{ border: `2px solid ${P.line}`, borderRadius: 14, padding: '12px 16px', marginBottom: 10, fontFamily: FONT.mono, fontSize: 25, color: P.ink }}>{o}</div>
                </Rise>
              ))}
              <Rise at={T.does}><div style={{ fontFamily: FONT.mono, fontWeight: 700, fontSize: 24, color: P.red }}>comment A, B or C + the app</div></Rise>
            </div>
          </Rise>
        )}
      </div>
    </Card>
  );
};

export const C6: React.FC = () => {
  return (
    <Stage slug="c6-like-button" vo={vo} poses={POSES} sfx={SFX}
      modes={[{ t: 0, mode: 'hook' }, { t: T.first - 0.1, mode: 'items' }, { t: T.if_ - 0.1, mode: 'act' }]}>
      <TopBar
        chapters={[{ t: 0, label: '// 00 — warning' }, { t: T.first, label: '// 01 — 0 ms' }, { t: T.second, label: '// 02 — the request' },
          { t: T.third, label: '// 03 — when it fails' }, { t: T.finally, label: '// 04 — why' }, { t: T.full, label: '// 05 — the speed rule' },
          { t: T.optimistic - 0.3, label: '// 06 — the name' }, { t: T.tryIt, label: '// 07 — try it' }, { t: T.if_, label: '// 08 — build it' }]}
        counter={{ label: 'BEHIND THE TAP', total: 4, ticks: PLUGS.map((p) => p.t + 0.25) }}
      />
      <Headline vo={vo} />
      <Lab />
      <WhyCard />
      <RuleCard />
      <SaveTag at={T.three} x={560} y={548} outAt={T.optimistic - 0.5} />
      <NameCard />
      <TryCard />
      <Cta from={T.if_} screen="apply" solveAt={T.if_ + 1.2} chip={{ at: T.bio, text: 'LINK IN BIO' }} logoAt={T.teyro - 0.05} />
    </Stage>
  );
};
