import React from 'react';
import { useCurrentFrame, useVideoConfig } from 'remotion';
import { FONT, L, P } from './tokens';
import { pop } from './anim';

/**
 * Tiny monospace labels at the top (§5.1): the chapter on the left (`// 01 — the study`) and a live
 * counter on the right (`RESEARCH 1/4`) that ticks red the moment an item lands.
 */
export const TopBar: React.FC<{
  chapters: { t: number; label: string }[];
  counter: { label: string; total: number; ticks: number[] };
  dark?: boolean;
}> = ({ chapters, counter, dark }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const ch = [...chapters].reverse().find((c) => t >= c.t) ?? chapters[0];
  const n = counter.ticks.filter((x) => t >= x).length;
  const lastTick = counter.ticks[n - 1];
  const p = n ? pop(frame, fps, lastTick) : 1;
  const soft = dark ? 'rgba(255,255,255,0.55)' : P.inkSoft;
  return (
    <div style={{ position: 'absolute', left: L.margin, right: L.margin, top: L.topLabelY, display: 'flex', justifyContent: 'space-between', fontFamily: FONT.mono, fontSize: 25, color: soft, letterSpacing: 0.5 }}>
      <span>{ch.label}</span>
      <span>
        {counter.label}{' '}
        <span style={{ display: 'inline-block', color: n ? (dark ? P.blue : P.red) : soft, transform: `scale(${0.7 + 0.3 * p})`, fontWeight: 700 }}>{n}</span>
        /{counter.total}
      </span>
    </div>
  );
};
