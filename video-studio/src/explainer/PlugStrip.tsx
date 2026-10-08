import React from 'react';
import { useCurrentFrame, useVideoConfig } from 'remotion';
import { FONT, P } from './tokens';
import { pop, prog, spr } from './anim';

/**
 * The persistent "n/4" progress object from reference C: a power strip whose sockets fill as each
 * item drops in on a cable. Position it with x/y/scale; animate those from the parent to move it.
 */
export const PlugStrip: React.FC<{
  label: string;            // e.g. "RESEARCH"
  plugs: { t: number; tag: string; color?: string }[];  // drop-in times + a short tag on each plug
  x: number; y: number; scale?: number; appear?: number;
}> = ({ label, plugs, x, y, scale = 1, appear = 0 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const n = plugs.filter((p) => t >= p.t + 0.25).length;
  const enter = spr(frame, fps, appear, { damping: 13, stiffness: 160 });
  const W = 730, Hh = 150, sock = 104, gap = 22, x0 = 210;
  return (
    <div style={{ position: 'absolute', left: x, top: y, width: W, height: Hh, transform: `scale(${scale * (0.85 + 0.15 * enter)})`, transformOrigin: 'left top', opacity: enter }}>
      {/* cables + plugs (behind the strip body so the plug sits "in" the socket) */}
      {plugs.map((p, i) => {
        const drop = spr(frame, fps, p.t, { damping: 13, stiffness: 150, mass: 1 });
        const cx = x0 + i * (sock + gap) + sock / 2;
        const seatedY = 18, fromY = -520;
        const py = fromY + (seatedY - fromY) * drop;
        if (drop <= 0) return null;
        return (
          <React.Fragment key={i}>
            <div style={{ position: 'absolute', left: cx - 4, top: py - 900, width: 8, height: 900, background: '#1D1F26', borderRadius: 4 }} />
            <div style={{ position: 'absolute', left: cx - 30, top: py - 70, width: 60, height: 92, borderRadius: 12, background: '#22252D', boxShadow: '0 4px 0 #0E0F13' }}>
              <div style={{ position: 'absolute', left: 8, right: 8, top: 10, height: 30, borderRadius: 6, background: p.color ?? P.red, color: '#fff', fontFamily: FONT.mono, fontWeight: 700, fontSize: 15, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{p.tag}</div>
            </div>
          </React.Fragment>
        );
      })}
      {/* strip body */}
      <div style={{ position: 'absolute', inset: 0, top: 22, height: 128, borderRadius: 30, background: P.card, border: `4px solid ${P.ink}`, boxShadow: `0 8px 0 ${P.ink}` }}>
        <div style={{ position: 'absolute', left: 26, top: 22, fontFamily: FONT.mono, fontSize: 19, color: P.ink, display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ width: 16, height: 16, borderRadius: 8, background: n ? P.red : '#BBB', display: 'inline-block' }} />{label}
        </div>
        <div style={{ position: 'absolute', left: 30, top: 58, fontFamily: FONT.mono, fontSize: 32, fontWeight: 700, color: n ? P.red : P.inkSoft }}>
          <span style={{ display: 'inline-block', transform: `scale(${n ? 0.8 + 0.2 * pop(frame, fps, plugs[n - 1].t + 0.25) : 1})` }}>{n}</span>/{plugs.length}
        </div>
        {plugs.map((p, i) => {
          const lit = t >= p.t + 0.25;
          const flash = lit ? 1 - prog(t, p.t + 0.25, p.t + 0.9) : 0;
          return (
            <div key={i} style={{ position: 'absolute', left: x0 + i * (sock + gap), top: 12, width: sock, height: sock, borderRadius: 22, background: lit ? '#2A2D36' : '#F3F1ED', border: `4px solid ${P.ink}`, boxShadow: flash ? `0 0 ${40 * flash}px ${P.red}` : 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
              {!lit && [0, 1].map((k) => <div key={k} style={{ width: 12, height: 34, borderRadius: 4, background: P.ink }} />)}
            </div>
          );
        })}
      </div>
    </div>
  );
};
