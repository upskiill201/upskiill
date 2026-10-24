import React from 'react';
import { Easing } from 'remotion';
import { FONT } from './theme';
import { lerp, pop, prog, rnd, useMotion } from './time';

/* ───────────── Wire with flowing packets (ambient motion between events, §2.6) ───────────── */
/** Polyline wire in local px. Packets flow from start to end while `flow` windows are active. */
export const Wire: React.FC<{
  pts: [number, number][]; at: number; drawDur?: number;
  flow?: { from: number; to: number; rate?: number; color?: string }[];
  tone?: 'normal' | 'problem' | 'good'; width?: number; dashed?: boolean;
}> = ({ pts, at, drawDur = 0.45, flow = [], tone = 'normal', width = 4, dashed }) => {
  const { look, t } = useMotion();
  if (t < at) return null;
  const segs = pts.slice(1).map((p, i) => Math.hypot(p[0] - pts[i][0], p[1] - pts[i][1]));
  const len = segs.reduce((a, b) => a + b, 0);
  const d = 'M' + pts.map((p) => p.join(' ')).join(' L');
  const draw = prog(t, at, at + drawDur, Easing.inOut(Easing.cubic));
  const col = tone === 'problem' ? look.problem : tone === 'good' ? look.good : look.dark ? look.inkFaint : '#9AA3AD';
  const pointAt = (u: number): [number, number] => {
    let dist = u * len;
    for (let i = 0; i < segs.length; i++) {
      if (dist <= segs[i]) { const k = dist / segs[i]; return [lerp(pts[i][0], pts[i + 1][0], k), lerp(pts[i][1], pts[i + 1][1], k)]; }
      dist -= segs[i];
    }
    return pts[pts.length - 1];
  };
  const dots: React.ReactNode[] = [];
  flow.forEach((f, fi) => {
    if (t < f.from || draw < 1) return;
    const rate = f.rate ?? 2.2; const speed = 520; // px/s
    const life = len / speed;
    const n = Math.ceil((Math.min(t, f.to) - f.from) * rate);
    for (let i = 0; i < n; i++) {
      const born = f.from + i / rate; const u = (t - born) / life;
      if (u < 0 || u > 1) continue;
      const [x, y] = pointAt(u);
      dots.push(<circle key={`${fi}-${i}`} cx={x} cy={y} r={width * 2.1} fill={f.color ?? look.accent2} />);
    }
  });
  return (
    <svg style={{ position: 'absolute', left: 0, top: 0, overflow: 'visible' }} width={1} height={1}>
      <path d={d} fill="none" stroke={col} strokeWidth={width} strokeLinejoin="round" strokeLinecap="round" strokeDasharray={dashed ? '10 10' : `${len}`} strokeDashoffset={dashed ? 0 : len * (1 - draw)} opacity={dashed ? draw : 1} />
      {dots}
    </svg>
  );
};

/* ───────────── Bar against a limit ("810 GB vs 80 GB") ───────────── */
export const LimitBars: React.FC<{ rows: { label: string; value: number; at: number; tone?: 'problem' | 'accent' | 'good'; text?: string }[]; max: number; width?: number }> = ({ rows, max, width = 880 }) => {
  const { look, t } = useMotion();
  return (
    <div style={{ width, display: 'flex', flexDirection: 'column', gap: 30 }}>
      {rows.map((r, i) => {
        if (t < r.at) return <div key={i} style={{ height: 78 }} />;
        const k = prog(t, r.at, r.at + 0.8);
        const c = r.tone === 'problem' ? look.problem : r.tone === 'good' ? look.good : look.accent;
        return (
          <div key={i}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: FONT.mono, fontSize: 22, color: look.inkSoft, letterSpacing: '0.05em', marginBottom: 10 }}>
              <span>{r.label}</span><span style={{ color: c, fontWeight: 700 }}>{r.text}</span>
            </div>
            <div style={{ height: 36, borderRadius: 10, background: look.dark ? 'rgba(255,255,255,0.06)' : look.bg2 }}>
              <div style={{ width: `${(r.value / max) * 100 * k}%`, height: '100%', borderRadius: 10, background: c }} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

/* ───────────── Growing bar chart (input tokens per message, staircase) ───────────── */
export const GrowBars: React.FC<{ values: number[]; at: number; dur?: number; width?: number; height?: number; label?: string; xLabels?: [string, string]; curve?: number }> =
  ({ values, at, dur = 2, width = 900, height = 420, label, xLabels, curve }) => {
    const { look, t } = useMotion();
    if (t < at) return null;
    const max = Math.max(...values); const bw = width / values.length;
    const shown = prog(t, at, at + dur, Easing.linear) * values.length;
    const ck = curve !== undefined ? prog(t, curve, curve + 0.8) : 0;
    return (
      <div style={{ width, background: look.card, border: `1.5px solid ${look.cardEdge}`, borderRadius: 22, padding: 24, boxShadow: `0 12px 30px ${look.cardShadow}` }}>
        {label && <div style={{ fontFamily: FONT.mono, fontSize: 18, color: look.inkSoft, letterSpacing: '0.08em', marginBottom: 12 }}>{label}</div>}
        <svg width={width - 48} height={height} viewBox={`0 0 ${width} ${height}`}>
          {values.map((v, i) => {
            const on = i < shown; const h = (v / max) * (height - 10);
            return <rect key={i} x={i * bw + 2} y={height - (on ? h : 0)} width={bw - 4} height={on ? h : 0} rx={2} fill={on ? look.accent : look.cardEdge} />;
          })}
          {ck > 0 && <path d={values.map((v, i) => `${i ? 'L' : 'M'}${i * bw + bw / 2} ${height - (v / max) * (height - 10)}`).join(' ')} fill="none" stroke={look.warm} strokeWidth={4} strokeDasharray={width * 2} strokeDashoffset={width * 2 * (1 - ck)} />}
        </svg>
        {xLabels && <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: FONT.mono, fontSize: 17, color: look.inkFaint, marginTop: 8 }}><span>{xLabels[0]}</span><span>{xLabels[1]}</span></div>}
      </div>
    );
  };

/* ───────────── Isometric box (towers, buildings, cubes) ───────────── */
/** Isometric cuboid drawn in SVG. w = width along x, d = depth, h = height (px). Colour shading is automatic. */
export const IsoBox: React.FC<{ w: number; d: number; h: number; color: string; label?: string; windows?: number; glow?: number; labelColor?: string }> =
  ({ w, d, h, color, label, windows = 0, glow = 0, labelColor = '#fff' }) => {
    const c = Math.cos(Math.PI / 6), s = 0.5;
    const ox = d * c;
    const A: [number, number] = [ox, 0], B: [number, number] = [ox + w * c, w * s], C: [number, number] = [ox + w * c - d * c, w * s + d * s], D: [number, number] = [0, d * s];
    const dn = (p: [number, number]): [number, number] => [p[0], p[1] + h];
    const P = (pts: [number, number][]) => pts.map((p) => p.join(',')).join(' ');
    const shade = (hex: string, f: number) => {
      const n = parseInt(hex.slice(1), 16); const r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255;
      const m = (v: number) => Math.max(0, Math.min(255, Math.round(v * f)));
      return `rgb(${m(r)},${m(g)},${m(b)})`;
    };
    // point on the front-left face: u along D→C, v down the height
    const fl = (u: number, v: number): [number, number] => [D[0] + u * (C[0] - D[0]), D[1] + u * (C[1] - D[1]) + v * h];
    const W2 = w * c + d * c, total = h + w * s + d * s;
    return (
      <svg width={W2} height={total} viewBox={`0 0 ${W2} ${total}`} style={{ overflow: 'visible', filter: glow ? `drop-shadow(0 0 ${glow}px ${color})` : undefined }}>
        <polygon points={P([D, C, dn(C), dn(D)])} fill={shade(color, 0.8)} />
        <polygon points={P([C, B, dn(B), dn(C)])} fill={shade(color, 0.6)} />
        <polygon points={P([A, B, C, D])} fill={shade(color, 1.1)} />
        {windows > 0 && Array.from({ length: windows }, (_, r) => Array.from({ length: 3 }, (_, q) => {
          const u0 = 0.1 + q * 0.28, u1 = u0 + 0.2, v0 = 0.08 + r * (0.86 / windows), v1 = v0 + (0.86 / windows) * 0.62;
          return <polygon key={`${r}-${q}`} points={P([fl(u0, v0), fl(u1, v0), fl(u1, v1), fl(u0, v1)])} fill={rnd(r * 7 + q) > 0.22 ? '#F2C76B' : shade(color, 0.55)} />;
        }))}
        {label && <text x={(A[0] + C[0]) / 2} y={(A[1] + C[1]) / 2 + 9} textAnchor="middle" fontFamily="JetBrains Mono" fontWeight={700} fontSize={Math.min(28, w * 0.22)} fill={labelColor} transform={`rotate(0)`}>{label}</text>}
      </svg>
    );
  };

/* ───────────── Layer stack (OSI planes / model layers), each layer can glow on cue ───────────── */
export const LayerStack: React.FC<{ n: number; at: number; w?: number; gap?: number; glowAt?: { i: number; from: number; to: number }[]; labels?: string[]; spread?: number; neon?: boolean }> =
  ({ n, at, w = 520, gap = 64, glowAt = [], labels, spread = 1, neon }) => {
    const { look, t, frame, fps } = useMotion();
    const h = w * 0.5;
    return (
      <div style={{ position: 'relative', width: w + 220, height: h + gap * (n - 1) * spread }}>
        {Array.from({ length: n }, (_, i) => {
          const k = pop(frame, fps, at + (n - 1 - i) * 0.06, { damping: 14 });
          const g = glowAt.find((x) => x.i === i && t >= x.from && t < x.to);
          const gk = g ? prog(t, g.from, g.from + 0.25) : 0;
          const col = look.ramp[i % look.ramp.length];
          return (
            <div key={i} style={{ position: 'absolute', left: 0, top: i * gap * spread, opacity: k, transform: `translateY(${(1 - k) * 40}px)` }}>
              <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} style={{ overflow: 'visible', filter: neon || gk ? `drop-shadow(0 0 ${8 + gk * 22}px ${col})` : undefined }}>
                <polygon points={`${w / 2},4 ${w - 4},${h / 2} ${w / 2},${h - 4} 4,${h / 2}`} fill={look.dark ? `${col}${gk ? '33' : '10'}` : `${col}${gk ? '40' : '22'}`} stroke={col} strokeWidth={neon ? 4 : 2.5} strokeOpacity={0.55 + 0.45 * Math.max(gk, neon ? 1 : 0.3)} />
              </svg>
              {labels?.[i] && <div style={{ position: 'absolute', left: w + 16, top: h / 2 - 16, fontFamily: FONT.mono, fontSize: 22, fontWeight: 700, letterSpacing: '0.08em', color: gk ? col : look.inkSoft }}>{labels[i]}</div>}
            </div>
          );
        })}
      </div>
    );
  };

/* ───────────── Shatter: one block breaks into N pieces on cue ("so it gets cut", §2.7) ───────────── */
export const Shatter: React.FC<{ at: number; cols?: number; rows?: number; size?: number; color?: string; spread?: number; children?: React.ReactNode }> =
  ({ at, cols = 5, rows = 4, size = 260, color, spread = 1.5 }) => {
    const { look, t } = useMotion();
    const k = prog(t, at, at + 0.7);
    const cw = size / cols, ch = size / rows;
    return (
      <div style={{ position: 'relative', width: size, height: size }}>
        {Array.from({ length: cols * rows }, (_, i) => {
          const cx = i % cols, cy = Math.floor(i / cols);
          const dx = (cx - (cols - 1) / 2) * cw * (spread - 1) * k + (rnd(i) - 0.5) * 30 * k;
          const dy = (cy - (rows - 1) / 2) * ch * (spread - 1) * k + (rnd(i + 3) - 0.5) * 30 * k;
          return <div key={i} style={{ position: 'absolute', left: cx * cw, top: cy * ch, width: cw - (k > 0 ? 6 : 0), height: ch - (k > 0 ? 6 : 0), borderRadius: k > 0 ? 8 : 0, background: color ?? look.accent, transform: `translate(${dx}px, ${dy}px) rotate(${(rnd(i + 9) - 0.5) * 20 * k}deg)`, opacity: 0.85 + 0.15 * rnd(i) }} />;
        })}
      </div>
    );
  };

/* ───────────── Status badge that slams in on a state change ("CPU 100%", "TIMEOUT", "LOST") ───────────── */
export const Badge: React.FC<{ at: number; until?: number; text: string; tone?: 'problem' | 'good' | 'accent'; icon?: React.ReactNode }> = ({ at, until, text, tone = 'problem', icon }) => {
  const { look, t, frame, fps } = useMotion();
  if (t < at || (until !== undefined && t >= until)) return null;
  const k = pop(frame, fps, at, { damping: 8, stiffness: 320 });
  const c = tone === 'problem' ? look.problem : tone === 'good' ? look.good : look.accent;
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '8px 16px', borderRadius: 12, background: c, color: '#fff', fontFamily: FONT.mono, fontWeight: 800, fontSize: 22, letterSpacing: '0.08em', transform: `scale(${k})`, boxShadow: `0 8px 24px ${c}66`, whiteSpace: 'nowrap' }}>
      {icon}{text}
    </div>
  );
};

/* ───────────── Particle cluster that fills (hidden thinking tokens, a crowd of users, requests) ───────────── */
export const Fill: React.FC<{ at: number; dur?: number; count: number; cols: number; cell?: number; color?: string; shape?: 'cube' | 'dot' }> = ({ at, dur = 1.2, count, cols, cell = 34, color, shape = 'cube' }) => {
  const { look, t } = useMotion();
  const shown = Math.floor(prog(t, at, at + dur, Easing.out(Easing.quad)) * count);
  const rows = Math.ceil(count / cols);
  return (
    <div style={{ position: 'relative', width: cols * cell, height: rows * cell }}>
      {Array.from({ length: shown }, (_, i) => (
        <div key={i} style={{ position: 'absolute', left: (i % cols) * cell, top: Math.floor(i / cols) * cell, width: cell - 6, height: cell - 6, borderRadius: shape === 'dot' ? cell : 6, border: shape === 'cube' ? `2px solid ${color ?? look.accent2}` : 'none', background: shape === 'dot' ? (color ?? look.accent2) : `${color ?? look.accent2}22` }} />
      ))}
    </div>
  );
};
