import React from 'react';
import { Img, staticFile } from 'remotion';
import { FONT, W, Z } from './theme';
import { EASE_IO, lerp, pop, prog, useMotion } from './time';

/**
 * The live HUD (§2.5): something at the top counts, moves or fills for the whole video.
 * It carries the chapter label and the always-on Teyro tile (§6.3).
 */

/* ───────────── animated numbers ───────────── */
export type Key = { t: number; v: number; dur?: number };
/** Value at time t: eases from the previous key to the next over `dur` (default 0.7 s). */
export const valueAt = (keys: Key[], t: number) => {
  let v = keys[0]?.v ?? 0;
  for (let i = 1; i < keys.length; i++) {
    const k = keys[i]; if (t <= k.t) break;
    v = lerp(v, k.v, prog(t, k.t, k.t + (k.dur ?? 0.7), EASE_IO));
  }
  return v;
};
export const fmt = {
  int: (v: number) => Math.round(v).toLocaleString('en-US'),
  compact: (v: number) => v >= 1e9 ? `${+(v / 1e9).toFixed(1)}B` : v >= 1e6 ? `${+(v / 1e6).toFixed(1)}M` : v >= 1e4 ? `${Math.round(v / 1e3)}K` : Math.round(v).toLocaleString('en-US'),
  usd: (v: number) => v === 0 ? '$0' : v < 0.1 ? `$${v.toFixed(4)}` : `$${v.toFixed(2)}`,
  pct: (v: number) => `${Math.round(v)}%`,
  ms: (v: number) => `${Math.round(v)} ms`,
};
export const Ticker: React.FC<{ keys: Key[]; format?: (v: number) => string; style?: React.CSSProperties }> = ({ keys, format = fmt.int, style }) => {
  const { t } = useMotion();
  // little bump on every change, so counting reads as an event
  const last = [...keys].reverse().find((k) => t >= k.t);
  const bump = last && last !== keys[0] ? 1 - prog(t, last.t, last.t + 0.35) : 0;
  return <span style={{ fontVariantNumeric: 'tabular-nums', display: 'inline-block', transform: `scale(${1 + bump * 0.06})`, transformOrigin: 'left center', ...style }}>{format(valueAt(keys, t))}</span>;
};

/* ───────────── frame ───────────── */
export const HudFrame: React.FC<{ children: React.ReactNode; height?: number }> = ({ children, height = 132 }) => {
  const { look, frame, fps } = useMotion();
  const k = pop(frame, fps, 0.05, { damping: 18 });
  const skin: React.CSSProperties = look.dark
    ? { background: look.name === 'neon' ? 'rgba(13,16,32,0.88)' : 'rgba(36,39,45,0.95)', border: `1.5px solid ${look.cardEdge}`, boxShadow: `0 14px 40px ${look.cardShadow}` }
    : { background: '#FFFFFF', border: `1.5px solid ${look.cardEdge}`, boxShadow: `0 10px 30px ${look.cardShadow}` };
  return (
    <div style={{ position: 'absolute', left: Z.gutter, width: W - Z.gutter * 2, top: Z.hudTop, height, borderRadius: 26, ...skin, opacity: k, transform: `translateY(${(1 - k) * -30}px)`, overflow: 'hidden', display: 'flex', alignItems: 'stretch' }}>
      {children}
    </div>
  );
};

/** Always-on Teyro tile (series watermark). `pulseAt` = times to pulse it (e.g. the mid bridge). */
export const TeyroTile: React.FC<{ size?: number; pulseAt?: number[] }> = ({ size = 64, pulseAt = [] }) => {
  const { t } = useMotion();
  const p = Math.max(0, ...pulseAt.map((a) => (t >= a && t < a + 0.8 ? Math.sin(((t - a) / 0.8) * Math.PI) : 0)));
  return (
    <div style={{ width: size, height: size, borderRadius: size * 0.28, overflow: 'hidden', flexShrink: 0, boxShadow: `0 0 ${p * 40}px rgba(61,90,254,${0.3 + p * 0.6})`, transform: `scale(${1 + p * 0.18})` }}>
      <Img src={staticFile('tey-tile.png')} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
    </div>
  );
};

const Mono: React.FC<{ children: React.ReactNode; size?: number; color?: string; weight?: number; style?: React.CSSProperties }> = ({ children, size = 22, color, weight = 600, style }) => {
  const { look } = useMotion();
  return <span style={{ fontFamily: FONT.mono, fontSize: size, fontWeight: weight, letterSpacing: '0.08em', textTransform: 'uppercase', color: color ?? look.inkSoft, ...style }}>{children}</span>;
};

/* ───────────── variant 1: meter (R1-style running bill) ───────────── */
export type Lamp = { label: string; color: string; on: [number, number][] };
export const HudMeter: React.FC<{
  lamps: Lamp[];
  counters: { label: string; keys: Key[]; format?: (v: number) => string; align?: 'left' | 'right' }[];
  sub?: { t: number; text: string }[];          // tariff line that changes over time
  pulseTeyro?: number[];
}> = ({ lamps, counters, sub = [], pulseTeyro }) => {
  const { look, t } = useMotion();
  const subNow = [...sub].reverse().find((s) => t >= s.t);
  return (
    <HudFrame height={150}>
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 6, padding: '0 22px', borderRight: `1.5px solid ${look.cardEdge}` }}>
        {lamps.map((l) => {
          const on = l.on.some(([a, b]) => t >= a && t < b);
          return (
            <div key={l.label} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 16, height: 16, borderRadius: 8, background: on ? l.color : look.cardEdge, boxShadow: on ? `0 0 14px ${l.color}` : 'none' }} />
              <Mono size={19} color={on ? look.ink : look.inkFaint}>{l.label}</Mono>
            </div>
          );
        })}
      </div>
      {counters.map((c, i) => (
        <div key={c.label} style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: c.align === 'right' ? 'flex-end' : 'flex-start', padding: '0 24px', borderRight: i < counters.length - 1 ? `1.5px solid ${look.cardEdge}` : 'none' }}>
          <Mono size={18}>{c.label}</Mono>
          <Ticker keys={c.keys} format={c.format} style={{ fontFamily: FONT.mono, fontSize: 52, fontWeight: 700, color: look.ink, letterSpacing: '-0.02em', transformOrigin: c.align === 'right' ? 'right center' : 'left center' }} />
        </div>
      ))}
      <div style={{ display: 'flex', alignItems: 'center', padding: '0 18px 0 6px' }}><TeyroTile size={60} pulseAt={pulseTeyro} /></div>
      {subNow && <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 30, background: look.dark ? 'rgba(255,255,255,0.04)' : look.bg, display: 'flex', alignItems: 'center', padding: '0 22px' }}><Mono size={16} color={look.inkSoft}>{subNow.text}</Mono></div>}
    </HudFrame>
  );
};

/* ───────────── variant 2: journey bar (R2-style follow the object) ───────────── */
export const HudJourney: React.FC<{ from: string; to: string; progress: Key[]; title: { t: number; text: string; color?: string }[]; pulseTeyro?: number[] }> =
  ({ from, to, progress, title, pulseTeyro }) => {
    const { look, t } = useMotion();
    const p = valueAt(progress, t);
    const now = [...title].reverse().find((s) => t >= s.t);
    const sw = prog(t, now?.t ?? 0, (now?.t ?? 0) + 0.3);
    return (
      <HudFrame height={120}>
        <div style={{ flex: 1, position: 'relative', padding: '0 26px' }}>
          <div style={{ position: 'absolute', left: 26, right: 26, top: 22, display: 'flex', justifyContent: 'space-between' }}>
            <Mono size={17}>{from}</Mono>
            <span style={{ fontFamily: FONT.mono, fontSize: 22, fontWeight: 700, letterSpacing: '0.12em', color: now?.color ?? look.ink, opacity: sw, transform: `translateY(${(1 - sw) * 8}px)` }}>{now?.text.toUpperCase()}</span>
            <Mono size={17}>{to}</Mono>
          </div>
          <div style={{ position: 'absolute', left: 26, right: 26, top: 78, height: 4, borderRadius: 2, background: look.cardEdge }}>
            <div style={{ width: `${p * 100}%`, height: '100%', borderRadius: 2, background: `linear-gradient(90deg, ${look.ramp[0]}, ${look.ramp[look.ramp.length - 1]})` }} />
            <div style={{ position: 'absolute', left: `${p * 100}%`, top: -8, width: 20, height: 20, marginLeft: -10, borderRadius: 10, background: '#fff', boxShadow: `0 0 18px ${look.accent}` }} />
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', padding: '0 18px 0 0' }}><TeyroTile size={56} pulseAt={pulseTeyro} /></div>
      </HudFrame>
    );
  };

/* ───────────── variant 3: series bar + counter + chip row (R4-style build from scratch) ───────────── */
export const HudSeries: React.FC<{
  series: string;
  chapters: { t: number; text: string }[];
  counter?: { keys: Key[]; unit: string; format?: (v: number) => string; icon?: React.ReactNode };
  chips?: { label: string; t: number }[];     // light up at t
  pulseTeyro?: number[];
}> = ({ series, chapters, counter, chips = [], pulseTeyro }) => {
  const { look, t } = useMotion();
  const now = [...chapters].reverse().find((s) => t >= s.t);
  const sw = prog(t, now?.t ?? 0, (now?.t ?? 0) + 0.3);
  return (
    <>
      <HudFrame height={96}>
        <div style={{ background: look.dark ? look.accent : '#16181D', display: 'flex', alignItems: 'center', gap: 12, padding: '0 22px' }}>
          <TeyroTile size={50} pulseAt={pulseTeyro} />
          <span style={{ fontFamily: FONT.display, fontSize: 30, fontWeight: 700, color: '#fff', letterSpacing: '0.01em' }}>{series.toUpperCase()}</span>
        </div>
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ fontFamily: FONT.mono, fontSize: 26, fontWeight: 600, letterSpacing: '0.12em', color: look.ink, opacity: sw, transform: `translateY(${(1 - sw) * 10}px)` }}>{now?.text.toUpperCase()}</span>
        </div>
        {counter && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '0 22px', borderLeft: `1.5px solid ${look.cardEdge}` }}>
            {counter.icon}
            <Ticker keys={counter.keys} format={counter.format ?? fmt.compact} style={{ fontFamily: FONT.mono, fontSize: 36, fontWeight: 700, color: look.accent2 }} />
            <Mono size={16}>{counter.unit}</Mono>
          </div>
        )}
      </HudFrame>
      {chips.length > 0 && (
        <div style={{ position: 'absolute', left: Z.gutter, width: W - Z.gutter * 2, top: Z.hudTop + 112, display: 'flex', justifyContent: 'center', gap: 10, flexWrap: 'nowrap' }}>
          {chips.map((c) => {
            const on = t >= c.t; const k = prog(t, c.t, c.t + 0.3);
            return (
              <div key={c.label} style={{ padding: '7px 13px', borderRadius: 10, border: `1.5px ${on ? 'solid' : 'dashed'} ${on ? look.accent : look.cardEdge}`, background: on ? (look.dark ? `${look.accent}22` : '#fff') : 'transparent', display: 'flex', alignItems: 'center', gap: 8, transform: `scale(${1 + Math.sin(k * Math.PI) * 0.12})` }}>
                <div style={{ width: 10, height: 10, borderRadius: 5, background: on ? look.accent : 'transparent', border: `1.5px solid ${on ? look.accent : look.inkFaint}` }} />
                <Mono size={15} color={on ? look.ink : look.inkFaint}>{c.label}</Mono>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

/* ───────────── variant 4: section label + dash progress (R3-style pipeline) ───────────── */
export const HudDashes: React.FC<{ chapters: { t: number; text: string }[]; pulseTeyro?: number[] }> = ({ chapters, pulseTeyro }) => {
  const { look, t } = useMotion();
  const idx = chapters.filter((c) => t >= c.t).length - 1;
  return (
    <div style={{ position: 'absolute', left: Z.gutter, right: Z.gutter, top: Z.hudTop, height: 70, display: 'flex', alignItems: 'center', gap: 16 }}>
      <TeyroTile size={52} pulseAt={pulseTeyro} />
      <Mono size={21} color={look.ink} weight={700}>{chapters[Math.max(0, idx)]?.text}</Mono>
      <div style={{ flex: 1 }} />
      <div style={{ display: 'flex', gap: 7 }}>
        {chapters.map((c, i) => <div key={i} style={{ width: 30, height: 5, borderRadius: 3, background: i <= idx ? look.ink : look.inkFaint, opacity: i <= idx ? 1 : 0.5 }} />)}
      </div>
    </div>
  );
};

/** Small chapter tag under the HUD ("02 TWO PRICES"), crossfades on change. */
export const ChapterTag: React.FC<{ chapters: { t: number; text: string }[]; top?: number }> = ({ chapters, top = Z.hudTop + 166 }) => {
  const { look, t } = useMotion();
  const now = [...chapters].reverse().find((s) => t >= s.t);
  if (!now) return null;
  const k = prog(t, now.t, now.t + 0.35);
  return (
    <div style={{ position: 'absolute', left: Z.gutter, top, opacity: k, transform: `translateX(${(1 - k) * -20}px)`, padding: '8px 16px', borderRadius: 12, border: `1.5px solid ${look.cardEdge}`, background: look.dark ? 'rgba(255,255,255,0.03)' : '#fff' }}>
      <Mono size={18} color={look.inkSoft} weight={700}>{now.text}</Mono>
    </div>
  );
};
