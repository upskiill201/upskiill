import React from 'react';
import { useCurrentFrame, useVideoConfig } from 'remotion';
import { FONT, P } from './tokens';
import { prog } from './anim';
import { Card, Rise, Tick } from './Kit';

/** Shared scene blocks for the explainer videos. */

/** Numbered recap list with ticks (the "save frame", §5.6). */
export const Checklist: React.FC<{ inAt: number; outAt: number; header: string; tag?: string; items: [string, number][]; note?: string; y?: number; h?: number }> =
  ({ inAt, outAt, header, tag, items, note, y = 640, h = 700 }) => (
    <Card x={90} y={y} w={900} h={h} inAt={inAt} outAt={outAt} header={header} tag={tag}>
      <div style={{ position: 'absolute', left: 54, right: 54, top: 110, display: 'flex', flexDirection: 'column', gap: 34 }}>
        {items.map(([label, t], i) => (
          <Rise key={i} at={t - 0.05}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 26, fontFamily: FONT.sans, fontWeight: 700, fontSize: 54, color: P.ink }}>
              <div style={{ width: 70, height: 70, borderRadius: 18, background: P.ink, color: '#fff', fontFamily: FONT.mono, fontSize: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none' }}>{i + 1}</div>
              <span style={{ flex: 1 }}>{label}</span><Tick at={t + 0.25} size={56} />
            </div>
          </Rise>
        ))}
        {note && <div style={{ fontFamily: FONT.mono, fontSize: 24, color: P.inkSoft, marginTop: 10 }}>{note}</div>}
      </div>
    </Card>
  );

/** Pill chip. */
export const Chip: React.FC<{ text: React.ReactNode; tone?: 'red' | 'ink' | 'soft' | 'green' | 'blue'; size?: number }> = ({ text, tone = 'ink', size = 30 }) => {
  const bg = { red: P.red, ink: P.ink, soft: '#EDEBE7', green: P.green, blue: P.blue }[tone];
  const fg = tone === 'soft' ? P.inkSoft : '#fff';
  return <div style={{ display: 'inline-flex', alignItems: 'center', gap: 12, background: bg, color: fg, borderRadius: 999, padding: '14px 26px', fontFamily: FONT.mono, fontWeight: 700, fontSize: size, whiteSpace: 'nowrap' }}>{text}</div>;
};

/** Big serif/black statement text inside a card. */
export const Big: React.FC<{ children: React.ReactNode; color?: string; size?: number; serif?: boolean }> = ({ children, color = P.ink, size = 72, serif }) => (
  <div style={{ fontFamily: serif ? FONT.serif : FONT.black, fontStyle: serif ? 'italic' : 'normal', fontWeight: serif ? 400 : 800, fontSize: size, color, lineHeight: 1.05 }}>{children}</div>
);

/** A small label in mono. */
export const Label: React.FC<{ children: React.ReactNode; color?: string; size?: number }> = ({ children, color = P.inkSoft, size = 26 }) => (
  <div style={{ fontFamily: FONT.mono, fontSize: size, color }}>{children}</div>
);

/** Draws an SVG path progressively between a→b. */
export const DrawPath: React.FC<{ d: string; a: number; b: number; stroke: string; width?: number; len?: number; dash?: string }> = ({ d, a, b, stroke, width = 8, len = 2000, dash }) => {
  const frame = useCurrentFrame(); const { fps } = useVideoConfig();
  const k = prog(frame / fps, a, b);
  return <path d={d} stroke={stroke} strokeWidth={width} fill="none" strokeLinecap="round" strokeLinejoin="round" strokeDasharray={dash ?? `${len}`} strokeDashoffset={dash ? 0 : len * (1 - k)} opacity={dash ? k : 1} />;
};

/** Fades children in at `a` and out at `b` (phases inside one card). */
export const Phase: React.FC<{ a: number; b?: number; children: React.ReactNode; style?: React.CSSProperties }> = ({ a, b = Infinity, children, style }) => {
  const frame = useCurrentFrame(); const { fps } = useVideoConfig(); const t = frame / fps;
  const o = prog(t, a - 0.15, a + 0.1) * (1 - prog(t, b - 0.2, b));
  if (o <= 0) return null;
  return <div style={{ position: 'absolute', inset: 0, opacity: o, ...style }}>{children}</div>;
};
