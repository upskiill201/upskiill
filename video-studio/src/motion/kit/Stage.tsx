import React from 'react';
import { AbsoluteFill } from 'remotion';
import { H, W } from './theme';
import { EASE_IO, lerp, prog, rnd, useMotion } from './time';

/**
 * Backdrop for the current look. It's one continuous world: no hard cuts, ever (§2.4).
 * `cam` lets the background drift with the camera so pans feel physical.
 */
export const Backdrop: React.FC<{ cam?: Cam }> = ({ cam = { x: 0, y: 0, z: 1 } }) => {
  const { look, t } = useMotion();
  if (look.name === 'neon') {
    // perspective grid floor + horizon glow
    const off = ((t * 40 + cam.y * 0.3) % 120 + 120) % 120;
    return (
      <AbsoluteFill style={{ background: `radial-gradient(120% 60% at 50% 38%, ${look.bg2} 0%, ${look.bg} 70%)` }}>
        <div style={{ position: 'absolute', left: -W, right: -W, top: H * 0.52, height: H, perspective: 700, perspectiveOrigin: '50% 0%' }}>
          <div style={{
            position: 'absolute', inset: 0, transform: 'rotateX(72deg)', transformOrigin: '50% 0%',
            backgroundImage: `linear-gradient(${look.grid} 2px, transparent 2px), linear-gradient(90deg, ${look.grid} 2px, transparent 2px)`,
            backgroundSize: '120px 120px', backgroundPosition: `${-cam.x * 0.4}px ${off}px`,
            maskImage: 'linear-gradient(to bottom, transparent 0%, black 25%, black 100%)',
          }} />
        </div>
        <div style={{ position: 'absolute', left: 0, right: 0, top: H * 0.5, height: 4, background: `linear-gradient(90deg, transparent, ${look.accent}66, transparent)`, filter: 'blur(6px)' }} />
      </AbsoluteFill>
    );
  }
  if (look.name === 'night') {
    // dark ground, faint road-map texture, grass tufts that drift with the camera
    return (
      <AbsoluteFill style={{ background: look.bg, overflow: 'hidden' }}>
        <svg width={W} height={H} style={{ position: 'absolute' }}>
          {Array.from({ length: 70 }, (_, i) => {
            const x = ((rnd(i) * W * 1.6 - cam.x * 0.6) % (W * 1.6) + W * 1.6) % (W * 1.6) - W * 0.3;
            const y = ((rnd(i + 99) * H * 1.4 - cam.y * 0.6) % (H * 1.4) + H * 1.4) % (H * 1.4) - H * 0.2;
            const s = 0.6 + rnd(i + 7) * 0.8;
            return <path key={i} d={`M${x} ${y} l${4 * s} ${-12 * s} l${4 * s} ${12 * s} m${2 * s} 0 l${4 * s} ${-9 * s} l${4 * s} ${9 * s}`} fill="none" stroke="#3E6B45" strokeWidth={3 * s} strokeLinecap="round" opacity={0.75} />;
          })}
        </svg>
      </AbsoluteFill>
    );
  }
  // lab / blueprint: faint square grid
  const g = look.name === 'lab' ? 54 : 72;
  return (
    <AbsoluteFill style={{
      background: look.bg,
      backgroundImage: `linear-gradient(${look.grid} 1.5px, transparent 1.5px), linear-gradient(90deg, ${look.grid} 1.5px, transparent 1.5px)`,
      backgroundSize: `${g * cam.z}px ${g * cam.z}px`,
      backgroundPosition: `${-cam.x * cam.z}px ${-cam.y * cam.z}px`,
    }}>
      {look.name === 'lab' && <AbsoluteFill style={{ background: `radial-gradient(90% 60% at 50% 45%, transparent 40%, ${look.bg2} 100%)` }} />}
    </AbsoluteFill>
  );
};

/* ───────────── camera over one big world (§3.7) ───────────── */
export type Cam = { x: number; y: number; z: number };
/** Camera keyframe: at time t the frame centre looks at world point (x, y) with zoom z. Moves ease in-out over `dur`. */
export type CamKey = { t: number; x: number; y: number; z?: number; dur?: number };

export const camAt = (keys: CamKey[], t: number): Cam => {
  let cur: Cam = { x: keys[0]?.x ?? 0, y: keys[0]?.y ?? 0, z: keys[0]?.z ?? 1 };
  for (let i = 1; i < keys.length; i++) {
    const k = keys[i]; const dur = k.dur ?? 0.9;
    if (t <= k.t) break;
    const p = prog(t, k.t, k.t + dur, EASE_IO);
    cur = { x: lerp(cur.x, k.x, p), y: lerp(cur.y, k.y, p), z: lerp(cur.z, k.z ?? 1, p) };
  }
  return cur;
};

/** Renders children in world coordinates (px). World point (cam.x, cam.y) sits at the stage centre. */
export const World: React.FC<{ cam: Cam; centerY?: number; children: React.ReactNode }> = ({ cam, centerY = 880, children }) => (
  <AbsoluteFill style={{ overflow: 'hidden' }}>
    <div style={{
      position: 'absolute', left: 0, top: 0, width: 0, height: 0,
      transform: `translate(${W / 2}px, ${centerY}px) scale(${cam.z}) translate(${-cam.x}px, ${-cam.y}px)`,
      transformOrigin: '0 0',
    }}>
      {children}
    </div>
  </AbsoluteFill>
);

/** Absolutely placed block in world space (x, y = centre). */
export const At: React.FC<{ x: number; y: number; w?: number; h?: number; z?: number; style?: React.CSSProperties; children: React.ReactNode }> =
  ({ x, y, w, h, z, style, children }) => (
    <div style={{ position: 'absolute', left: x, top: y, width: w, height: h, transform: 'translate(-50%, -50%)', zIndex: z, ...style }}>{children}</div>
  );
