import React from 'react';
import { FONT, LOOKS, pop, prog, rnd, useMotion } from '../../kit';

const N = LOOKS.neon;
/** Layer colours: index by OSI layer number (7 = top, orange … 1 = bottom, teal). */
export const LAYER_COL: Record<number, string> = { 7: '#FF9A3C', 6: '#FF5E7E', 5: '#E040C8', 4: '#9B5CFF', 3: '#5B7CFF', 2: '#3B9BFF', 1: '#39C6D9' };
export const LAYER_NAME: Record<number, string> = { 7: 'Application', 6: 'Presentation', 5: 'Session', 4: 'Transport', 3: 'Network', 2: 'Data link', 1: 'Physical' };

/* ───────────── the jollof photo (original illustration) ───────────── */
export const Jollof: React.FC<{ size?: number; scramble?: number; style?: React.CSSProperties }> = ({ size = 220, scramble = 0, style }) => {
  const grains = Array.from({ length: 70 }, (_, i) => {
    const a = rnd(i) * Math.PI * 2, r = Math.sqrt(rnd(i + 50)) * 62;
    return { x: 100 + Math.cos(a) * r * 1.15, y: 104 + Math.sin(a) * r * 0.82, rot: rnd(i + 9) * 180 };
  });
  return (
    <div style={{ position: 'relative', width: size, height: size, borderRadius: size * 0.08, overflow: 'hidden', background: '#2A1B14', ...style }}>
      <svg viewBox="0 0 200 200" width={size} height={size}>
        <rect width="200" height="200" fill="#3A2418" />
        <rect y="140" width="200" height="60" fill="#5A3A22" />
        <ellipse cx="100" cy="108" rx="92" ry="74" fill="#F3EEE6" />
        <ellipse cx="100" cy="108" rx="80" ry="62" fill="#E7DFD2" />
        <ellipse cx="100" cy="104" rx="70" ry="52" fill="#D9461E" />
        {grains.map((g, i) => <ellipse key={i} cx={g.x} cy={g.y} rx={4.2} ry={1.8} fill={i % 3 ? '#F26A2E' : '#C2361A'} transform={`rotate(${g.rot} ${g.x} ${g.y})`} />)}
        {[[70, 92], [128, 120], [96, 128], [118, 84]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r={3.4} fill="#5DBB46" />)}
        {[[148, 92, 20], [156, 116, -10], [140, 136, 30]].map(([x, y, r], i) => <ellipse key={i} cx={x} cy={y} rx={13} ry={8} fill="#F2B233" stroke="#C67B12" strokeWidth={2} transform={`rotate(${r} ${x} ${y})`} />)}
        <path d="M44 120 q-6 -26 18 -30 q20 -2 22 16 q2 16 -16 22 l-8 10 q-6 4 -10 -2 z" fill="#8A4A1E" stroke="#5E2F10" strokeWidth={2} />
        <rect x="46" y="134" width="6" height="16" rx="3" fill="#F3EEE6" transform="rotate(30 49 142)" />
      </svg>
      {scramble > 0 && (
        <svg viewBox="0 0 20 20" width={size} height={size} style={{ position: 'absolute', inset: 0, opacity: scramble }} preserveAspectRatio="none">
          {Array.from({ length: 400 }, (_, i) => <rect key={i} x={i % 20} y={Math.floor(i / 20)} width={1} height={1} fill={`hsl(${rnd(i * 3) * 360},${30 + rnd(i) * 50}%,${20 + rnd(i + 7) * 50}%)`} />)}
        </svg>
      )}
    </div>
  );
};

/* ───────────── chat phone ───────────── */
export const Phone: React.FC<{ who: string; where: string; w?: number; photoAt?: number; sentAt?: number; recvAt?: number; heartAt?: number; glow?: string; children?: React.ReactNode }> =
  ({ who, where, w = 330, photoAt, sentAt, recvAt, heartAt, glow }) => {
    const { t, frame, fps } = useMotion();
    const h = w * 2.02;
    const pk = photoAt !== undefined ? pop(frame, fps, photoAt) : 0;
    const sk = sentAt !== undefined ? prog(t, sentAt, sentAt + 0.45) : 0;
    const rk = recvAt !== undefined ? pop(frame, fps, recvAt, { damping: 12 }) : 0;
    const hk = heartAt !== undefined ? pop(frame, fps, heartAt, { damping: 7, stiffness: 300 }) : 0;
    const s = w / 330;
    return (
      <div style={{ width: w, height: h, borderRadius: 46 * s, background: '#05060B', padding: 10 * s, boxSizing: 'border-box', boxShadow: glow ? `0 0 ${50 * s}px ${glow}, 0 0 0 ${3 * s}px ${glow}` : `0 0 0 ${2 * s}px ${N.cardEdge}` }}>
        <div style={{ position: 'relative', width: '100%', height: '100%', borderRadius: 38 * s, background: '#0F1326', overflow: 'hidden' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 * s, padding: `${26 * s}px ${18 * s}px ${14 * s}px`, borderBottom: `1.5px solid ${N.cardEdge}` }}>
            <div style={{ width: 40 * s, height: 40 * s, borderRadius: 20 * s, background: 'linear-gradient(135deg,#FF9A3C,#E040C8)' }} />
            <div>
              <div style={{ fontFamily: FONT.sans, fontWeight: 700, fontSize: 21 * s, color: '#fff' }}>{who}</div>
              <div style={{ fontFamily: FONT.mono, fontSize: 14 * s, color: N.inkSoft, letterSpacing: '0.06em' }}>{where}</div>
            </div>
          </div>
          <div style={{ padding: 16 * s, display: 'flex', flexDirection: 'column', gap: 10 * s }}>
            <div style={{ alignSelf: 'flex-start', maxWidth: '78%', background: '#1C2240', color: '#DCE1F5', borderRadius: 16 * s, padding: `${10 * s}px ${14 * s}px`, fontFamily: FONT.sans, fontSize: 18 * s }}>{recvAt !== undefined ? 'did you cook today??' : 'did you cook today??'}</div>
            <div style={{ alignSelf: 'flex-end', maxWidth: '78%', background: '#3D5AFE', color: '#fff', borderRadius: 16 * s, padding: `${10 * s}px ${14 * s}px`, fontFamily: FONT.sans, fontSize: 18 * s }}>wait for it</div>
            {(sk > 0 || rk > 0) && (
              <div style={{ alignSelf: recvAt !== undefined ? 'flex-start' : 'flex-end', position: 'relative', transform: `translateY(${(1 - Math.max(sk, rk)) * 60 * s}px) scale(${0.7 + 0.3 * Math.max(sk, rk)})`, opacity: Math.max(sk, rk) }}>
                <Jollof size={190 * s} />
                {hk > 0 && <div style={{ position: 'absolute', right: -10 * s, bottom: -12 * s, width: 44 * s, height: 44 * s, borderRadius: 22 * s, background: '#FF4D6D', display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${hk})`, boxShadow: '0 0 20px #FF4D6D' }}>
                  <svg width={24 * s} height={24 * s} viewBox="0 0 24 24"><path d="M12 21s-7-4.5-9.5-9A5.5 5.5 0 0 1 12 6a5.5 5.5 0 0 1 9.5 6C19 16.5 12 21 12 21z" fill="#fff" /></svg>
                </div>}
              </div>
            )}
          </div>
          {photoAt !== undefined && sk < 1 && (
            <div style={{ position: 'absolute', left: 14 * s, right: 14 * s, bottom: 18 * s, height: 64 * s, borderRadius: 32 * s, background: '#161B33', display: 'flex', alignItems: 'center', padding: `0 ${10 * s}px`, gap: 10 * s }}>
              <div style={{ transform: `scale(${pk})`, opacity: 1 - sk }}><Jollof size={46 * s} /></div>
              <div style={{ flex: 1 }} />
              <div style={{ width: 46 * s, height: 46 * s, borderRadius: 23 * s, background: '#3D5AFE', display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${sentAt !== undefined && t >= sentAt && t < sentAt + 0.2 ? 0.85 : 1})` }}>
                <svg width={22 * s} height={22 * s} viewBox="0 0 24 24"><path d="M3 11l18-8-8 18-2-8z" fill="#fff" /></svg>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

/* ───────────── the neon OSI stack (world space) ───────────── */
export const PLANE_W = 560, PLANE_GAP = 175;
export const planeY = (layer: number) => (7 - layer) * PLANE_GAP;
/** 7 planes, top = layer 7. `active` glows; `tags` = per-layer badge text shown on the plane's right. */
export const OsiStack: React.FC<{ at: number; active?: number; tags?: Record<number, { text: string; at: number; until?: number; tone?: 'problem' | 'good' }>; dim?: number; showNums?: boolean }> =
  ({ at, active, tags = {}, dim = 0, showNums = true }) => {
    const { t, frame, fps } = useMotion();
    const h = PLANE_W * 0.5;
    return (
      <div style={{ position: 'absolute', left: 0, top: 0 }}>
        {[7, 6, 5, 4, 3, 2, 1].map((L) => {
          const k = pop(frame, fps, at + (7 - L) * 0.07, { damping: 14 });
          if (k <= 0) return null;
          const c = LAYER_COL[L]; const on = active === L;
          const tag = tags[L]; const tk = tag && t >= tag.at && (tag.until === undefined || t < tag.until) ? pop(frame, fps, tag.at, { damping: 9, stiffness: 300 }) : 0;
          return (
            <div key={L} style={{ position: 'absolute', left: -PLANE_W / 2, top: planeY(L) - h / 2, width: PLANE_W, height: h, opacity: k * (on ? 1 : 1 - dim * 0.7), transform: `translateY(${(1 - k) * 40}px)` }}>
              <svg width={PLANE_W} height={h} viewBox={`0 0 ${PLANE_W} ${h}`} style={{ overflow: 'visible', filter: `drop-shadow(0 0 ${on ? 26 : 9}px ${c})` }}>
                <polygon points={`${PLANE_W / 2},4 ${PLANE_W - 4},${h / 2} ${PLANE_W / 2},${h - 4} 4,${h / 2}`} fill={`${c}${on ? '30' : '0E'}`} stroke={c} strokeWidth={on ? 5 : 3} />
                {/* circuit traces on the plane */}
                <path d={`M${PLANE_W * 0.32} ${h * 0.5} h${PLANE_W * 0.12} l${PLANE_W * 0.05} ${-h * 0.1} h${PLANE_W * 0.1} M${PLANE_W * 0.45} ${h * 0.62} h${PLANE_W * 0.14}`} stroke={c} strokeOpacity={0.35} strokeWidth={2} fill="none" />
              </svg>
              {showNums && <div style={{ position: 'absolute', left: -64, top: h / 2 - 26, fontFamily: FONT.display, fontWeight: 700, fontSize: 44, color: c, opacity: on ? 1 : 0.55 }}>{L}</div>}
              {tk > 0 && (
                <div style={{ position: 'absolute', left: PLANE_W - 40, top: h / 2 - 24, transform: `scale(${tk})`, transformOrigin: 'left center', padding: '8px 14px', borderRadius: 10, background: tag!.tone === 'good' ? N.good : N.problem, color: '#fff', fontFamily: FONT.mono, fontWeight: 800, fontSize: 22, letterSpacing: '0.08em', whiteSpace: 'nowrap', boxShadow: `0 0 18px ${tag!.tone === 'good' ? N.good : N.problem}` }}>{tag!.text}</div>
              )}
            </div>
          );
        })}
      </div>
    );
  };

/* ───────────── route map (illustrative, dotted) ───────────── */
export const ROUTE: { name: string; x: number; y: number }[] = [
  { name: 'LAGOS', x: 640, y: 1060 }, { name: 'ACCRA', x: 470, y: 960 }, { name: 'DAKAR', x: 250, y: 820 },
  { name: 'CANARY IS.', x: 300, y: 640 }, { name: 'LISBON', x: 330, y: 480 }, { name: 'LONDON', x: 470, y: 330 },
];
export const RouteMap: React.FC<{ at: number; until: number; drawAt: number; drawDur: number; hops: number[]; arriveAt: number }> = ({ at, until, drawAt, drawDur, hops, arriveAt }) => {
  const { t, frame, fps } = useMotion();
  if (t < at || t >= until) return null;
  const k = prog(t, at, at + 0.4); const out = 1 - prog(t, until - 0.3, until);
  const d = prog(t, drawAt, drawAt + drawDur);
  const pts = ROUTE.map((p) => `${p.x},${p.y}`).join(' ');
  const segs = ROUTE.slice(1).map((p, i) => Math.hypot(p.x - ROUTE[i].x, p.y - ROUTE[i].y)); const len = segs.reduce((a, b) => a + b, 0);
  // land-ish dot field: West Africa bulge + Iberia + Britain (stylised, not to scale)
  const land = (x: number, y: number) =>
    (y > 760 && y < 1250 && x > 200 + Math.max(0, (y - 900) * 0.15) && x < 1000 && !(y > 1080 && x > 600 && x < 820)) ||
    (y > 380 && y < 600 && x > 300 && x < 620) || (y > 200 && y < 360 && x > 420 && x < 560) || (y > 300 && y < 560 && x > 600 && x < 1000);
  const dots: React.ReactNode[] = [];
  for (let y = 180; y < 1260; y += 26) for (let x = 120; x < 1000; x += 26) if (land(x, y)) dots.push(<circle key={`${x}-${y}`} cx={x} cy={y} r={3.2} fill="#2A3366" />);
  return (
    <div style={{ position: 'absolute', inset: 0, opacity: Math.min(k, out) }}>
      <svg width={1080} height={1920} style={{ position: 'absolute', left: 0, top: 0 }}>
        {dots}
        <polyline points={pts} fill="none" stroke="#39C6D9" strokeWidth={6} strokeLinecap="round" strokeLinejoin="round" strokeDasharray={len} strokeDashoffset={len * (1 - d)} style={{ filter: 'drop-shadow(0 0 10px #39C6D9)' }} />
        {d > 0 && d < 1 && (() => { let dist = d * len, i = 0; while (i < segs.length - 1 && dist > segs[i]) { dist -= segs[i]; i++; } const u = Math.min(1, dist / segs[i]); const x = ROUTE[i].x + (ROUTE[i + 1].x - ROUTE[i].x) * u, y = ROUTE[i].y + (ROUTE[i + 1].y - ROUTE[i].y) * u; return <circle cx={x} cy={y} r={12} fill="#fff" style={{ filter: 'drop-shadow(0 0 14px #39C6D9)' }} />; })()}
        {ROUTE.map((p, i) => {
          const lit = i === 0 || (hops[i - 1] !== undefined && t >= hops[i - 1]) || (i === ROUTE.length - 1 && t >= arriveAt);
          const hk = i > 0 && hops[i - 1] !== undefined ? pop(frame, fps, hops[i - 1]) : 1;
          return (
            <g key={p.name}>
              <circle cx={p.x} cy={p.y} r={lit ? 16 : 10} fill={lit ? '#39C6D9' : '#1D2244'} stroke="#39C6D9" strokeWidth={3} style={{ filter: lit ? 'drop-shadow(0 0 12px #39C6D9)' : undefined }} />
              {lit && i > 0 && i < ROUTE.length - 1 && <circle cx={p.x} cy={p.y} r={16 + (1 - Math.min(1, hk)) * 40} fill="none" stroke="#39C6D9" strokeWidth={2} opacity={1 - Math.min(1, hk) * 0.7} />}
              <text x={p.x + 26} y={p.y + 9} fontFamily="JetBrains Mono" fontWeight={700} fontSize={26} letterSpacing="0.1em" fill={lit ? '#FFFFFF' : '#5A6390'}>{p.name}</text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

/** A small mono "network header" card (request, IP header, MAC header…). rows: [label, value, highlightAt?] */
export const HeaderCard: React.FC<{ at: number; until?: number; title: string; rows: [string, string, number?][]; w?: number; color?: string }> = ({ at, until, title, rows, w = 620, color }) => {
  const { t, frame, fps } = useMotion();
  if (t < at || (until !== undefined && t >= until)) return null;
  const k = pop(frame, fps, at, { damping: 14 });
  const out = until !== undefined ? 1 - prog(t, until - 0.2, until) : 1;
  return (
    <div style={{ width: w, background: 'rgba(15,19,38,0.95)', border: `1.5px solid ${color ?? N.cardEdge}`, borderRadius: 18, padding: '16px 22px', opacity: Math.min(k, out), transform: `translateY(${(1 - k) * 30}px)`, boxShadow: color ? `0 0 24px ${color}44` : 'none' }}>
      <div style={{ fontFamily: FONT.mono, fontSize: 17, fontWeight: 700, letterSpacing: '0.12em', color: color ?? N.inkSoft, marginBottom: 10 }}>{title}</div>
      {rows.map(([l, v, hi], i) => {
        const on = hi !== undefined && t >= hi;
        return (
          <div key={i} style={{ display: 'flex', gap: 18, fontFamily: FONT.mono, fontSize: 25, lineHeight: 1.55, borderRadius: 6, background: on ? `${color ?? N.accent}33` : 'transparent', padding: '0 6px', margin: '0 -6px' }}>
            <span style={{ width: 120, color: N.inkSoft, flexShrink: 0 }}>{l}</span><span style={{ color: on ? '#fff' : '#DCE1F5', fontWeight: on ? 700 : 500 }}>{v}</span>
          </div>
        );
      })}
    </div>
  );
};

/** Numbered packet chip (#1 … #206). */
export const Packet: React.FC<{ n: string; tone?: 'normal' | 'lost' | 'ok' | 'q'; label?: string }> = ({ n, tone = 'normal', label }) => {
  const c = tone === 'lost' ? N.problem : tone === 'ok' ? N.good : LAYER_COL[4];
  return (
    <div style={{ minWidth: 96, padding: '10px 10px 8px', borderRadius: 12, border: `2px solid ${c}`, background: tone === 'lost' ? `${N.problem}22` : `${c}1C`, textAlign: 'center', boxShadow: `0 0 12px ${c}55`, opacity: tone === 'lost' ? 0.9 : 1 }}>
      <div style={{ fontFamily: FONT.mono, fontWeight: 800, fontSize: 26, color: '#fff' }}>{tone === 'q' ? '?' : n}</div>
      {label && <div style={{ fontFamily: FONT.mono, fontSize: 13, color: N.inkSoft, letterSpacing: '0.06em', marginTop: 2 }}>{label}</div>}
    </div>
  );
};
