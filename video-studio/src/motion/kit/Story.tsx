import React from 'react';
import { AbsoluteFill, Img, staticFile } from 'remotion';
import { BRAND, FONT, W, Z } from './theme';
import { EASE_IO, pop, prog, useMotion } from './time';

/**
 * Story scaffolding: title card (frame 0 = cover), chapter cards, recap, punchline,
 * the Teyro mid bridge + outro, and the loop back to frame 0 (§2.2, §2.4, §2.10, §6).
 */

/** Frame 0: topic title + kicker over a miniature of the whole world (pass it as children). Holds until `until`. */
export const TitleCard: React.FC<{ title: string[]; kicker?: string; until: number; children?: React.ReactNode; titleSize?: number; align?: 'left' | 'center'; top?: number }> =
  ({ title, kicker = 'EXPLAINED', until, children, titleSize = 132, align = 'center', top = 300 }) => {
    const { look, t, frame, fps } = useMotion();
    const out = 1 - prog(t, until - 0.25, until + 0.15);
    if (out <= 0) return null;
    const kk = pop(frame, fps, 0.35, { damping: 14 });
    return (
      <AbsoluteFill style={{ opacity: out }}>
        <div style={{ position: 'absolute', left: Z.gutter + 10, right: Z.gutter + 10, top, textAlign: align }}>
          {title.map((l, i) => {
            const k = frame === 0 ? 1 : pop(frame, fps, i * 0.08, { damping: 13 });   // frame 0 already reads (it's the cover)
            return <div key={i} style={{ fontFamily: FONT.display, fontWeight: 700, fontSize: titleSize, lineHeight: 0.95, letterSpacing: '-0.035em', color: look.ink, transform: `translateY(${(1 - k) * 30}px)` }}>{l}</div>;
          })}
          <div style={{ marginTop: 22, fontFamily: FONT.mono, fontWeight: 700, fontSize: 30, letterSpacing: '0.42em', color: look.accent2 === look.accent ? look.accent : look.problem, opacity: frame === 0 ? 1 : kk }}>{kicker}</div>
        </div>
        <div style={{ position: 'absolute', left: 0, right: 0, top: top + title.length * titleSize + 120, bottom: 1920 - Z.stageBottom - 40, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {children}
        </div>
      </AbsoluteFill>
    );
  };

/** Big chapter card: giant numeral + name, slams in with a boom (R2 "7 · APPLICATION", R3 "PRE-TRAINING"). */
export const ChapterCard: React.FC<{ at: number; until: number; n?: string; title: string; sub?: string; color?: string; x?: number; y?: number; size?: number }> =
  ({ at, until, n, title, sub, color, x = Z.gutter + 10, y = Z.stageTop - 10, size = 150 }) => {
    const { look, t, frame, fps } = useMotion();
    if (t < at || t >= until) return null;
    const k = pop(frame, fps, at, { damping: 10, stiffness: 300 });
    const out = 1 - prog(t, until - 0.2, until);
    const c = color ?? look.accent;
    return (
      <div style={{ position: 'absolute', left: x, top: y, display: 'flex', alignItems: 'flex-end', gap: 22, opacity: Math.min(out, k * 1.5), transform: `scale(${0.8 + 0.2 * k})`, transformOrigin: 'left bottom' }}>
        {n && <div style={{ fontFamily: FONT.display, fontWeight: 700, fontSize: size, lineHeight: 0.8, color: c, textShadow: look.dark ? `0 0 40px ${c}88` : 'none' }}>{n}</div>}
        <div style={{ paddingBottom: 8 }}>
          {n && <div style={{ fontFamily: FONT.mono, fontSize: 20, letterSpacing: '0.3em', color: look.inkSoft }}>{sub ?? 'CHAPTER'}</div>}
          <div style={{ fontFamily: FONT.display, fontWeight: 700, fontSize: n ? 56 : size * 0.7, color: look.ink, letterSpacing: n ? '0.06em' : '-0.03em', textTransform: 'uppercase', borderBottom: n ? `4px solid ${c}` : 'none', lineHeight: 1 }}>{title}</div>
        </div>
      </div>
    );
  };

/** Recap: numbered pins appear one per spoken point (R1 map / R3 roadmap re-lit, §2.10). */
export const Recap: React.FC<{ items: { text: string; at: number }[]; width?: number; title?: string; titleAt?: number }> = ({ items, width = 900, title = 'RECAP', titleAt }) => {
  const { look, t, frame, fps } = useMotion();
  const first = titleAt ?? items[0]?.at ?? 0;
  if (t < first - 0.2) return null;
  return (
    <div style={{ width }}>
      <div style={{ fontFamily: FONT.mono, fontSize: 24, fontWeight: 800, letterSpacing: '0.2em', color: look.inkSoft, marginBottom: 22, opacity: prog(t, first - 0.2, first + 0.1) }}>{title}</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {items.map((it, i) => {
          const k = pop(frame, fps, it.at, { damping: 13 });
          const active = t >= it.at && (i === items.length - 1 || t < items[i + 1].at);
          return (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 20, opacity: k > 0 ? (active ? 1 : 0.62) : 0, transform: `translateX(${(1 - k) * -40}px)` }}>
              <div style={{ width: 58, height: 58, borderRadius: 29, background: k > 0 ? look.accent : 'transparent', border: `3px solid ${look.accent}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: FONT.mono, fontWeight: 800, fontSize: 28, color: '#fff', flexShrink: 0, boxShadow: active ? `0 0 24px ${look.accent}88` : 'none' }}>{i + 1}</div>
              <div style={{ flex: 1, background: look.card, border: `1.5px solid ${active ? look.accent : look.cardEdge}`, borderRadius: 18, padding: '16px 22px', fontFamily: FONT.sans, fontWeight: 650, fontSize: 36, color: look.ink, boxShadow: `0 8px 22px ${look.cardShadow}` }}>{it.text}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

/** Punchline card: the one reframing sentence, key word last, set big (§2.10). Optional strikethrough word. */
export const Punchline: React.FC<{ at: number; until: number; lead: string; strike?: { word: string; at: number }; payoff: string; payoffAt: number; size?: number }> =
  ({ at, until, lead, strike, payoff, payoffAt, size = 104 }) => {
    const { look, t, frame, fps } = useMotion();
    if (t < at || t >= until) return null;
    const k = pop(frame, fps, at, { damping: 14 }); const out = 1 - prog(t, until - 0.25, until);
    const s = strike ? prog(t, strike.at, strike.at + 0.3) : 0;
    const p = pop(frame, fps, payoffAt, { damping: 9, stiffness: 280 });
    return (
      <div style={{ position: 'absolute', left: Z.gutter + 20, right: Z.gutter + 20, top: Z.stageTop + 120, opacity: Math.min(out, k), background: look.card, border: `1.5px solid ${look.cardEdge}`, borderRadius: 30, padding: '44px 48px', boxShadow: `0 20px 50px ${look.cardShadow}` }}>
        <div style={{ fontFamily: FONT.sans, fontWeight: 600, fontSize: 40, color: look.inkSoft }}>{lead}</div>
        {strike && (
          <div style={{ position: 'relative', display: 'inline-block', fontFamily: FONT.display, fontWeight: 700, fontSize: size * 0.8, color: s > 0 ? look.inkFaint : look.ink, marginTop: 6 }}>
            {strike.word}
            <div style={{ position: 'absolute', left: -6, top: '55%', height: 9, width: `calc(${s * 100}% + 12px)`, background: look.problem, borderRadius: 4 }} />
          </div>
        )}
        <div style={{ fontFamily: FONT.display, fontWeight: 700, fontSize: size, lineHeight: 1, color: look.accent, letterSpacing: '-0.03em', marginTop: 10, transform: `scale(${0.6 + 0.4 * p})`, transformOrigin: 'left center', opacity: Math.min(1, p * 1.5) }}>{payoff}</div>
      </div>
    );
  };

/* ───────────── Teyro: mid bridge + outro (§6). Facts only from live teyro.app pages. ───────────── */
const Wordmark: React.FC<{ size?: number; color?: string }> = ({ size = 44, color }) => (
  <span style={{ fontFamily: FONT.display, fontWeight: 700, fontSize: size, letterSpacing: '-0.02em', color: color ?? BRAND.navy }}>Teyro</span>
);

/**
 * Mid bridge (one, 3–5 s, right after a cliffhanger): the world dims a little and a compact
 * Teyro card rises, then everything returns. `chips` = 2–3 facts from the live site.
 */
export const TeyroBridge: React.FC<{ at: number; until: number; line: string; chips: string[]; chipTimes?: number[]; beats?: number[] }> = ({ at, until, line, chips, chipTimes, beats = [] }) => {
  const { look, t, frame, fps } = useMotion();
  if (t < at - 0.1 || t >= until + 0.1) return null;
  const k = pop(frame, fps, at, { damping: 14 }); const out = 1 - prog(t, until - 0.25, until, EASE_IO);
  const v = Math.min(k, out);
  // keep it moving (QA: no still > 2.5 s): chips land on their spoken words, the tile pulses,
  // and the whole card hops on each chip / beat (small chips alone don't register as motion)
  const pulse = 1 + Math.max(0, Math.sin((t - at) * 4)) * 0.05;
  const hop = [...(chipTimes ?? []), ...beats].reduce((a, b) => {
    const d = t - b; return d < 0 || d > 0.5 ? a : a + Math.sin(d * Math.PI * 4) * Math.exp(-d * 7) * 26;
  }, 0);
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ background: look.dark ? 'rgba(0,0,0,0.45)' : 'rgba(237,241,243,0.6)', opacity: v }} />
      <div style={{ position: 'absolute', left: 80, right: 80, top: 760, transform: `translateY(${(1 - v) * 80 - hop}px) scale(${1 + hop / 900})`, opacity: v, background: '#FFFFFF', borderRadius: 34, padding: '34px 38px', boxShadow: '0 30px 80px rgba(31,42,68,0.35)', border: `3px solid ${BRAND.blue}` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <div style={{ width: 92, height: 92, borderRadius: 26, overflow: 'hidden', transform: `scale(${pulse})`, boxShadow: `0 0 ${(pulse - 1) * 600}px rgba(61,90,254,0.6)` }}><Img src={staticFile('tey-tile.png')} style={{ width: '100%', height: '100%' }} /></div>
          <div>
            <Wordmark size={54} />
            <div style={{ fontFamily: FONT.sans, fontWeight: 600, fontSize: 30, color: '#64748B', marginTop: 2 }}>{line}</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 12, marginTop: 24, flexWrap: 'wrap' }}>
          {chips.map((c, i) => {
            const ck = pop(frame, fps, chipTimes?.[i] ?? at + 0.25 + i * 0.12);
            return <span key={c} style={{ padding: '10px 18px', borderRadius: 14, background: '#EEF2FF', color: BRAND.blue, fontFamily: FONT.sans, fontWeight: 700, fontSize: 28, transform: `scale(${ck})` }}>{c}</span>;
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};

/** Outro ask (one, 4–6 s, after the punchline): phone card with teyro.app + the spoken ask on screen. */
export const TeyroOutro: React.FC<{ at: number; until: number; headline: string; ask: string; url?: string }> = ({ at, until, headline, ask, url = 'teyro.app' }) => {
  const { t, frame, fps } = useMotion();
  if (t < at || t >= until) return null;
  const k = pop(frame, fps, at, { damping: 15 }); const out = 1 - prog(t, until - 0.25, until);
  const ak = pop(frame, fps, at + 0.6);
  return (
    <AbsoluteFill style={{ opacity: Math.min(k, out), alignItems: 'center' }}>
      <div style={{ position: 'absolute', top: 470, width: 560, height: 820, borderRadius: 70, background: '#0E1220', padding: 18, boxShadow: '0 40px 90px rgba(0,0,0,0.4)', transform: `translateY(${(1 - k) * 120}px) rotate(${(1 - k) * -4}deg)` }}>
        <div style={{ width: '100%', height: '100%', borderRadius: 54, background: '#F5F7FB', overflow: 'hidden', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ marginTop: 34, padding: '12px 26px', borderRadius: 18, background: '#fff', border: '1.5px solid #E2E8F0', fontFamily: FONT.mono, fontSize: 26, color: '#1F2A44', fontWeight: 700 }}>{url}</div>
          <div style={{ width: 170, height: 170, borderRadius: 46, overflow: 'hidden', marginTop: 70, boxShadow: '0 20px 50px rgba(61,90,254,0.35)' }}><Img src={staticFile('tey-tile.png')} style={{ width: '100%', height: '100%' }} /></div>
          <div style={{ marginTop: 26 }}><Wordmark size={72} /></div>
          <div style={{ marginTop: 18, padding: '0 46px', textAlign: 'center', fontFamily: FONT.sans, fontWeight: 700, fontSize: 36, lineHeight: 1.2, color: '#1F2A44' }}>{headline}</div>
        </div>
      </div>
      <div style={{ position: 'absolute', top: 1330, padding: '18px 34px', borderRadius: 22, background: BRAND.blue, color: '#fff', fontFamily: FONT.sans, fontWeight: 800, fontSize: 42, transform: `scale(${ak})`, boxShadow: '0 16px 40px rgba(61,90,254,0.45)' }}>{ask}</div>
    </AbsoluteFill>
  );
};

/** Loop: in the last `dur` seconds, crossfade back to the opening composition so the replay is seamless (§2.10). */
export const LoopBack: React.FC<{ from: number; dur?: number; children: React.ReactNode }> = ({ from, dur = 0.5, children }) => {
  const { t } = useMotion();
  if (t < from) return null;
  return <AbsoluteFill style={{ opacity: prog(t, from, from + dur, EASE_IO) }}>{children}</AbsoluteFill>;
};

export const Fit: React.FC<{ w?: number; children: React.ReactNode }> = ({ w = W, children }) => <div style={{ width: w, display: 'flex', justifyContent: 'center' }}>{children}</div>;
