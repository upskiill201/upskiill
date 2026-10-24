import React from 'react';
import { Easing } from 'remotion';
import { FONT } from './theme';
import { life, pop, prog, useMotion } from './time';

/**
 * Building blocks. Every block takes `at` (appear) and optional `until` (leave), in seconds,
 * and pops in with a snappy overshoot on its cue word (§2.6, §2.7).
 */
type Timed = { at: number; until?: number };
const usePresence = ({ at, until }: Timed) => { const m = useMotion(); return { ...m, k: life(m.t, m.frame, m.fps, at, until) }; };
const popStyle = (k: number, from: 'up' | 'down' | 'scale' = 'scale'): React.CSSProperties => ({
  opacity: Math.min(1, k * 1.4),
  transform: from === 'scale' ? `scale(${0.85 + 0.15 * k})` : `translateY(${(1 - k) * (from === 'up' ? 40 : -40)}px)`,
});

/** Card: the workhorse container (component boxes, data cards, code cards). `state` recolours it on cue. */
export const Card: React.FC<Timed & {
  w?: number; h?: number; title?: string; icon?: React.ReactNode; sub?: string;
  states?: { t: number; tone: 'normal' | 'problem' | 'good' | 'accent' }[];
  pad?: number; children?: React.ReactNode; from?: 'up' | 'down' | 'scale'; style?: React.CSSProperties;
}> = ({ w, h, title, icon, sub, states = [], pad = 26, children, from = 'scale', style, ...tm }) => {
  const { look, t, k } = usePresence(tm);
  if (k <= 0) return null;
  const st = [...states].reverse().find((s) => t >= s.t);
  const tone = st?.tone ?? 'normal';
  const flash = st ? 1 - prog(t, st.t, st.t + 0.5) : 0;
  const edge = tone === 'problem' ? look.problem : tone === 'good' ? look.good : tone === 'accent' ? look.accent : look.cardEdge;
  const fill = tone === 'problem' ? (look.dark ? `${look.problem}22` : '#FDECEE') : tone === 'good' ? (look.dark ? `${look.good}1F` : '#E9F7EF') : look.card;
  return (
    <div style={{
      width: w, height: h, background: fill, border: `${tone === 'normal' ? 1.5 : 2.5}px solid ${edge}`, borderRadius: 22,
      boxShadow: `0 14px 34px ${look.cardShadow}${flash > 0 ? `, 0 0 ${40 * flash}px ${edge}` : ''}`, padding: pad, boxSizing: 'border-box',
      transform: `${popStyle(k, from).transform} scale(${1 + flash * 0.04})`, opacity: popStyle(k, from).opacity, ...style,
    }}>
      {(title || icon) && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          {icon && <div style={{ color: tone === 'normal' ? look.accent : edge, display: 'flex' }}>{icon}</div>}
          {title && <div style={{ fontFamily: FONT.display, fontWeight: 700, fontSize: 34, color: tone === 'problem' ? look.problem : look.ink, letterSpacing: '0.01em', textTransform: 'uppercase' }}>{title}</div>}
        </div>
      )}
      {sub && <div style={{ fontFamily: FONT.mono, fontSize: 20, color: look.inkSoft, marginTop: 6, letterSpacing: '0.04em' }}>{sub}</div>}
      {children}
    </div>
  );
};

/** Small tag / chip ("1 TOKEN", "WHOLE WORD", "DUPLICATE"). */
export const Tag: React.FC<Timed & { text: string; tone?: 'accent' | 'problem' | 'good' | 'muted'; size?: number; solid?: boolean }> =
  ({ text, tone = 'accent', size = 20, solid = false, ...tm }) => {
    const { look, k } = usePresence(tm);
    if (k <= 0) return null;
    const c = tone === 'problem' ? look.problem : tone === 'good' ? look.good : tone === 'muted' ? look.inkSoft : look.accent;
    return (
      <span style={{ display: 'inline-flex', alignItems: 'center', padding: `${size * 0.35}px ${size * 0.7}px`, borderRadius: size * 0.6, border: `2px solid ${c}`, background: solid ? c : (look.dark ? `${c}22` : '#fff'), color: solid ? '#fff' : c, fontFamily: FONT.mono, fontWeight: 700, fontSize: size, letterSpacing: '0.08em', textTransform: 'uppercase', whiteSpace: 'nowrap', ...popStyle(k) }}>
        {text}
      </span>
    );
  };

/** Sticky note on the left: RULE / PROBLEM / FIX / GOAL / COST (R4 claim layer, §3.3). Swaps text on cue. */
export const Note: React.FC<{ items: { t: number; kind: 'RULE' | 'PROBLEM' | 'FIX' | 'GOAL' | 'COST' | 'NOTE'; text: string }[]; w?: number }> = ({ items, w = 300 }) => {
  const { look, t, frame, fps } = useMotion();
  const cur = [...items].reverse().find((i) => t >= i.t);
  if (!cur) return null;
  const k = pop(frame, fps, cur.t, { damping: 14 });
  const c = cur.kind === 'PROBLEM' || cur.kind === 'COST' ? look.problem : cur.kind === 'FIX' || cur.kind === 'GOAL' ? look.accent : look.inkSoft;
  return (
    <div style={{ width: w, background: look.card, border: `1.5px solid ${look.cardEdge}`, borderLeft: `6px solid ${c}`, borderRadius: 16, padding: '16px 20px', boxShadow: `0 10px 26px ${look.cardShadow}`, transform: `rotate(${-1.2 + (1 - k) * -4}deg) scale(${0.9 + 0.1 * k})`, opacity: k }}>
      <div style={{ fontFamily: FONT.mono, fontSize: 18, fontWeight: 800, letterSpacing: '0.12em', color: c }}>{cur.kind}</div>
      <div style={{ fontFamily: FONT.sans, fontSize: 30, fontWeight: 650, color: look.ink, lineHeight: 1.18, marginTop: 6 }}>{cur.text}</div>
    </div>
  );
};

/** Headline typed word-by-word in sync with the voice (R3, §2.7). Words: [text, time]. */
export const TypeLine: React.FC<{ words: [string, number][]; size?: number; color?: string; weight?: number; width?: number; align?: 'left' | 'center' }> =
  ({ words, size = 58, color, weight = 600, width = 940, align = 'left' }) => {
    const { look, t } = useMotion();
    return (
      <div style={{ width, fontFamily: FONT.display, fontSize: size, fontWeight: weight, color: color ?? look.ink, lineHeight: 1.12, letterSpacing: '-0.015em', textAlign: align }}>
        {words.map(([w, at], i) => {
          const k = prog(t, at - 0.03, at + 0.12);
          return <span key={i} style={{ opacity: 0.12 + 0.88 * k }}>{w}{' '}</span>;
        })}
      </div>
    );
  };

/** Big statement in display type ("EXPECT PARTS TO BREAK.", "90% OFF"). Pops in line by line. */
export const BigText: React.FC<Timed & { lines: string[]; size?: number; color?: string; align?: 'left' | 'center'; stagger?: number }> =
  ({ lines, size = 120, color, align = 'left', stagger = 0.12, ...tm }) => {
    const { look, frame, fps, t } = useMotion();
    const out = tm.until !== undefined ? 1 - prog(t, tm.until - 0.2, tm.until) : 1;
    if (t < tm.at || out <= 0) return null;
    return (
      <div style={{ textAlign: align, opacity: out }}>
        {lines.map((l, i) => {
          const k = pop(frame, fps, tm.at + i * stagger, { damping: 12 });
          return <div key={i} style={{ fontFamily: FONT.display, fontWeight: 700, fontSize: size, lineHeight: 0.98, letterSpacing: '-0.03em', color: color ?? look.ink, opacity: Math.min(1, k * 1.5), transform: `translateY(${(1 - k) * 50}px)` }}>{l}</div>;
        })}
      </div>
    );
  };

/** Strikethrough reframe: "not paying for ~~answers~~ → tokens" (§2.9). */
export const Strike: React.FC<{ text: string; at: number; strikeAt: number; replace?: string; replaceAt?: number; size?: number }> =
  ({ text, at, strikeAt, replace, replaceAt, size = 72 }) => {
    const { look, t, frame, fps } = useMotion();
    if (t < at) return null;
    const k = pop(frame, fps, at); const s = prog(t, strikeAt, strikeAt + 0.3); const r = replaceAt !== undefined ? pop(frame, fps, replaceAt) : 0;
    return (
      <div style={{ fontFamily: FONT.display, fontWeight: 700, fontSize: size, lineHeight: 1.05 }}>
        <span style={{ position: 'relative', color: s > 0 ? look.inkSoft : look.ink, opacity: k }}>
          {text}
          <span style={{ position: 'absolute', left: -6, top: '52%', height: size * 0.09, width: `calc(${s * 100}% + 12px)`, background: look.problem, borderRadius: 4 }} />
        </span>
        {replace && r > 0 && <div style={{ color: look.accent, transform: `translateY(${(1 - r) * 30}px)`, opacity: Math.min(1, r * 1.4) }}>{replace}</div>}
      </div>
    );
  };

/** Handwritten annotation with a drawn arrow (R1/R4 human touch, §3.3). Arrow drawn from text towards (dx, dy). */
export const Annotation: React.FC<Timed & { text: string; dx: number; dy: number; size?: number; color?: string; width?: number }> =
  ({ text, dx, dy, size = 40, color, width = 320, ...tm }) => {
    const { look, t, k } = usePresence(tm);
    if (k <= 0) return null;
    const draw = prog(t, tm.at + 0.1, tm.at + 0.55, Easing.inOut(Easing.cubic));
    const c = color ?? (look.dark ? '#E9E6DF' : look.ink);
    const len = Math.hypot(dx, dy) * 1.25;
    const mx = dx / 2 - dy * 0.3, my = dy / 2 + dx * 0.3; // curved
    const ang = Math.atan2(dy - my, dx - mx);
    return (
      <div style={{ position: 'relative', width, opacity: Math.min(1, k * 1.5) }}>
        <div style={{ fontFamily: FONT.hand, fontSize: size, fontWeight: 600, color: c, lineHeight: 1.0, transform: 'rotate(-3deg)' }}>{text}</div>
        <svg style={{ position: 'absolute', left: 0, top: size * 1.1, overflow: 'visible' }} width={1} height={1}>
          <path d={`M0 0 Q${mx} ${my} ${dx} ${dy}`} fill="none" stroke={c} strokeWidth={3.5} strokeLinecap="round" strokeDasharray={len} strokeDashoffset={len * (1 - draw)} />
          {draw > 0.95 && <path d={`M${dx} ${dy} l${-18 * Math.cos(ang - 0.45)} ${-18 * Math.sin(ang - 0.45)} M${dx} ${dy} l${-18 * Math.cos(ang + 0.45)} ${-18 * Math.sin(ang + 0.45)}`} stroke={c} strokeWidth={3.5} strokeLinecap="round" />}
        </svg>
      </div>
    );
  };

/** Tiny monospace source footnote (§2.8): every headline number shows where it came from. */
export const Footnote: React.FC<Timed & { text: string; width?: number; align?: 'left' | 'center' }> = ({ text, width = 900, align = 'center', ...tm }) => {
  const { look, k } = usePresence(tm);
  if (k <= 0) return null;
  return <div style={{ width, textAlign: align, fontFamily: FONT.mono, fontSize: 19, color: look.inkSoft, letterSpacing: '0.03em', opacity: k * 0.9 }}>{text}</div>;
};

/** Checklist that lights up item by item (useful ✓ accurate ✓ safe). */
export const Checklist: React.FC<{ items: { text: string; at: number; check?: number; tone?: 'good' | 'problem' }[]; width?: number; size?: number }> = ({ items, width = 640, size = 44 }) => {
  const { look, t, frame, fps } = useMotion();
  return (
    <div style={{ width, display: 'flex', flexDirection: 'column', gap: 18 }}>
      {items.map((it, i) => {
        const k = pop(frame, fps, it.at); const c = it.check !== undefined ? pop(frame, fps, it.check) : 0;
        const col = it.tone === 'problem' ? look.problem : look.good;
        if (k <= 0) return <div key={i} style={{ height: size * 1.9 }} />;
        return (
          <div key={i} style={{ height: size * 1.9, borderRadius: size, border: `2.5px solid ${c > 0 ? col : look.cardEdge}`, background: c > 0 ? (look.dark ? `${col}22` : `${col}14`) : look.card, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 18, opacity: Math.min(1, k * 1.4), transform: `scale(${0.9 + 0.1 * k + Math.sin(Math.min(1, c) * Math.PI) * 0.05})` }}>
            {c > 0 && <svg width={size} height={size} viewBox="0 0 24 24" style={{ transform: `scale(${c})` }}><path d={it.tone === 'problem' ? 'M6 6l12 12M18 6L6 18' : 'M4 12.5l5 5L20 6.5'} fill="none" stroke={col} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" /></svg>}
            <span style={{ fontFamily: FONT.display, fontWeight: 700, fontSize: size, letterSpacing: '0.04em', color: c > 0 ? col : look.inkSoft, textTransform: 'uppercase' }}>{it.text}</span>
          </div>
        );
      })}
    </div>
  );
};

/** Two side-by-side cards: "without vs with", "TCP vs UDP" (§2.9). */
export const Split: React.FC<Timed & { left: { title: string; tone?: 'problem' | 'good' | 'normal'; body: React.ReactNode }; right: { title: string; tone?: 'problem' | 'good' | 'normal'; body: React.ReactNode }; rightAt?: number; w?: number; h?: number }> =
  ({ left, right, rightAt, w = 960, h = 420, ...tm }) => {
    const { look, frame, fps, k } = usePresence(tm);
    if (k <= 0) return null;
    const rk = pop(frame, fps, rightAt ?? tm.at + 0.25);
    const side = (s: typeof left, kk: number) => {
      const c = s.tone === 'problem' ? look.problem : s.tone === 'good' ? look.good : look.inkSoft;
      return (
        <div style={{ flex: 1, height: h, background: look.card, border: `2px solid ${s.tone && s.tone !== 'normal' ? c : look.cardEdge}`, borderRadius: 22, padding: 24, boxSizing: 'border-box', opacity: Math.min(1, kk * 1.4), transform: `translateY(${(1 - kk) * 30}px)`, boxShadow: `0 12px 30px ${look.cardShadow}` }}>
          <div style={{ fontFamily: FONT.mono, fontSize: 20, fontWeight: 800, letterSpacing: '0.1em', color: c, textTransform: 'uppercase', marginBottom: 14 }}>{s.title}</div>
          {s.body}
        </div>
      );
    };
    return <div style={{ width: w, display: 'flex', gap: 22 }}>{side(left, k)}{rk > 0 && side(right, rk)}</div>;
  };

/** Big framed panel with a header strip ("BLUEPRINT · SOCIAL APP", version tag): fills the stage like R4 / R1 cards (§3.1). */
export const Panel: React.FC<Timed & { label: string; tag?: string; icon?: React.ReactNode; w?: number; h?: number; children?: React.ReactNode; bodyStyle?: React.CSSProperties }> =
  ({ label, tag, icon, w = 900, h = 860, children, bodyStyle, ...tm }) => {
    const { look, k } = usePresence(tm);
    if (k <= 0) return null;
    return (
      <div style={{ width: w, height: h, background: look.card, border: `1.5px solid ${look.cardEdge}`, borderRadius: 26, boxShadow: `0 18px 44px ${look.cardShadow}`, overflow: 'hidden', display: 'flex', flexDirection: 'column', ...popStyle(k, 'up') }}>
        <div style={{ height: 58, flexShrink: 0, display: 'flex', alignItems: 'center', gap: 12, padding: '0 22px', borderBottom: `1.5px solid ${look.cardEdge}` }}>
          {icon && <span style={{ display: 'flex', color: look.inkSoft }}>{icon}</span>}
          <span style={{ fontFamily: FONT.mono, fontSize: 19, fontWeight: 700, letterSpacing: '0.12em', color: look.inkSoft, textTransform: 'uppercase' }}>{label}</span>
          <span style={{ flex: 1 }} />
          {tag && <span style={{ fontFamily: FONT.mono, fontSize: 17, fontWeight: 800, color: look.accent, background: look.dark ? `${look.accent}22` : `${look.accent}14`, padding: '4px 10px', borderRadius: 8 }}>{tag}</span>}
        </div>
        <div style={{ position: 'relative', flex: 1, backgroundImage: `radial-gradient(${look.grid} 1.6px, transparent 1.6px)`, backgroundSize: '26px 26px', ...bodyStyle }}>{children}</div>
      </div>
    );
  };
