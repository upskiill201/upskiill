import React from 'react';
import { spring } from 'remotion';
import { EASE_IO, lerp, prog, useMotion } from './time';
import { Z } from './theme';

/**
 * The Motion Explainer series host: an ORIGINAL character (never the reference cartoon, §3.6).
 * Working name "Remi" (rename freely in HOST_NAME), a young guy, matching the male narrator (founder, 2026-10-09): coral beanie with a pompom, thick round
 * glasses, Teyro-blue bomber over a white </> tee, charcoal cargos, white high-tops, a tablet in one hand.
 * Flat vector with dark cartoon outlines so it sits in any of the four looks.
 *
 * Like the reference host it is a brand anchor, not an actor: idle stance, blinks, lip-sync,
 * a few arm poses. It enters for the hook, chapter openers, explain/math moments and the recap,
 * and leaves the stage for big visuals.
 */
export const HOST_NAME = 'Remi';

const INK = '#1B1E27', SKIN = '#B7794B', SKIN_D = '#9C6338', BLUSH = '#E58A6E';
const BEANIE = '#FF7A45', BEANIE_D = '#E25F2C', JACKET = '#3D5AFE', JACKET_D = '#2E46D6', TEE = '#FFFFFF';
const PANTS = '#2B2F3A', PANTS_D = '#22252E', HAIR = '#1E1A2E', SHOE = '#FFFFFF', SHOE_ACC = '#3D5AFE';
const SW = 5; // outline width

export type HostHand = 'fist' | 'point' | 'open';
export type HostPose = { up: number; fore: number; hand: HostHand; tilt?: number; brow?: number; smile?: number; look?: [number, number] };
/** Arm angles for the stage-side arm (degrees, 0 = hanging down, negative = towards the stage on the right). */
export const HOST_POSES = {
  idle: { up: -8, fore: 6, hand: 'fist', smile: 0.6 },
  explain: { up: -28, fore: -112, hand: 'open', tilt: -3, brow: 0.3, smile: 0.7 },
  point: { up: -84, fore: -8, hand: 'point', tilt: -4, brow: 0.5, smile: 0.8, look: [7, -1] },
  pointUp: { up: -140, fore: -12, hand: 'point', tilt: -3, brow: 0.7, smile: 0.8, look: [6, -7] },
  wave: { up: -150, fore: 18, hand: 'open', tilt: 5, brow: 0.6, smile: 1 },
  think: { up: 28, fore: 150, hand: 'fist', tilt: 6, brow: 0.5, smile: 0.25, look: [5, -6] },
  wow: { up: -40, fore: -60, hand: 'open', tilt: 0, brow: 1, smile: 0.1 },
} satisfies Record<string, HostPose>;
export type HostPoseName = keyof typeof HOST_POSES;

const Hand: React.FC<{ kind: HostHand }> = ({ kind }) => (
  <g>
    {kind === 'point' && <rect x={-7} y={10} width={14} height={40} rx={7} fill={SKIN} stroke={INK} strokeWidth={SW - 1} />}
    {kind === 'open' && [-26, -9, 9, 26].map((a, i) => <rect key={i} x={-6} y={8} width={12} height={34} rx={6} fill={SKIN} stroke={INK} strokeWidth={SW - 1.5} transform={`rotate(${a})`} />)}
    <circle r={23} fill={SKIN} stroke={INK} strokeWidth={SW} />
  </g>
);

const Mouth: React.FC<{ vis: string; amp: number; smile: number; talking: boolean }> = ({ vis, amp, smile, talking }) => {
  if (!talking || vis === 'X' || amp < 0.05) {
    const s = smile * 12;
    return <path d={`M-24 0 Q0 ${s + 4} 24 0`} fill="none" stroke={INK} strokeWidth={SW} strokeLinecap="round" />;
  }
  if (vis === 'M') return <path d="M-20 2 L20 2" stroke={INK} strokeWidth={SW + 1} strokeLinecap="round" />;
  const open = Math.min(1, 0.35 + amp * 0.9);
  const [w, h] = vis === 'O' ? [16, 22 * open] : vis === 'E' ? [26, 12 * open] : vis === 'F' ? [20, 9] : vis === 'A' ? [24, 28 * open] : [21, 18 * open];
  return (
    <g>
      <path d={`M${-w} -2 Q0 ${-4} ${w} -2 Q${w * 0.9} ${h} 0 ${h + 4} Q${-w * 0.9} ${h} ${-w} -2 Z`} fill="#5A1F22" stroke={INK} strokeWidth={SW - 1} strokeLinejoin="round" />
      {vis !== 'O' && <path d={`M${-w * 0.7} 0 L${w * 0.7} 0 L${w * 0.6} 6 L${-w * 0.6} 6 Z`} fill="#fff" />}
      {h > 14 && <ellipse cx={0} cy={h - 3} rx={w * 0.45} ry={5} fill="#E06B6B" />}
      {vis === 'F' && <path d={`M${-w} 8 Q0 2 ${w} 8`} stroke={INK} strokeWidth={SW - 1} fill="none" />}
    </g>
  );
};

/**
 * Host placed on the stage. `x` = horizontal centre, `bottom` = feet y (px), `scale` 1 ≈ 1000 px tall.
 * `on` windows: when it is on screen (slides in/out from the left). `poses`: [{t, p}] arm/face poses.
 */
export const Host: React.FC<{
  x?: number; bottom?: number; scale?: number;
  on: [number, number][];
  poses?: { t: number; p: HostPoseName }[];
  flip?: boolean;
}> = ({ x = Z.hostX, bottom = Z.hostBottom, scale = Z.hostScale, on, poses = [{ t: 0, p: 'idle' }], flip = false }) => {
  const { vo, t, frame, fps } = useMotion();
  const win = on.find(([a, b]) => t >= a - 0.4 && t < b + 0.4);
  if (!win) return null;
  const [a, b] = win;
  const inK = spring({ frame: frame - a * fps, fps, config: { damping: 14, stiffness: 160, mass: 0.8 } });
  const outK = prog(t, b - 0.05, b + 0.35, EASE_IO);
  const slide = (1 - Math.min(1, inK)) * -520 + outK * -560;
  if (t < a || (t > b + 0.35)) return null;

  // pose blending (0.28 s)
  const sorted = [...poses].sort((p, q) => p.t - q.t);
  let cur: HostPose = HOST_POSES[sorted[0].p] as HostPose;
  for (let i = 1; i < sorted.length; i++) {
    if (t < sorted[i].t) break;
    const nxt = HOST_POSES[sorted[i].p] as HostPose; const k = prog(t, sorted[i].t, sorted[i].t + 0.28, EASE_IO);
    cur = { up: lerp(cur.up, nxt.up, k), fore: lerp(cur.fore, nxt.fore, k), hand: k > 0.5 ? nxt.hand : cur.hand, tilt: lerp(cur.tilt ?? 0, nxt.tilt ?? 0, k), brow: lerp(cur.brow ?? 0, nxt.brow ?? 0, k), smile: lerp(cur.smile ?? 0.6, nxt.smile ?? 0.6, k), look: [lerp(cur.look?.[0] ?? 0, nxt.look?.[0] ?? 0, k), lerp(cur.look?.[1] ?? 0, nxt.look?.[1] ?? 0, k)] };
  }
  const amp = vo.lip.amp[frame] ?? 0; const vis = vo.lip.vis[frame] ?? 'X';
  const talking = amp > 0.04;
  const breathe = Math.sin(t * 2.1) * 2.2;
  const nod = talking ? Math.sin(t * 9) * amp * 1.6 : 0;
  const blinkCycle = (frame + 17) % 113; const blink = blinkCycle < 3 || (frame % 340 > 336);
  const brow = (cur.brow ?? 0) * -10;
  const [lx, ly] = cur.look ?? [0, 0];

  return (
    <div style={{ position: 'absolute', left: x - 210 * scale, top: bottom - 1040 * scale, width: 420 * scale, height: 1040 * scale, transform: `translateX(${slide}px) scaleX(${flip ? -1 : 1})`, filter: 'drop-shadow(0 18px 14px rgba(0,0,0,0.22))' }}>
      <svg viewBox="0 0 420 1040" width={420 * scale} height={1040 * scale} style={{ overflow: 'visible' }}>
        {/* shadow */}
        <ellipse cx={210} cy={1022} rx={150} ry={16} fill="rgba(0,0,0,0.18)" />
        {/* legs */}
        <g stroke={INK} strokeWidth={SW} strokeLinejoin="round">
          <path d="M150 630 L205 630 L200 985 L152 985 Z" fill={PANTS} />
          <path d="M215 630 L272 630 L268 985 L220 985 Z" fill={PANTS_D} />
          <rect x={150} y={760} width={22} height={60} rx={6} fill={PANTS_D} strokeWidth={SW - 2} />
          {/* high-tops */}
          <path d="M140 975 L205 975 L210 1012 Q170 1024 128 1012 Q126 990 140 975 Z" fill={SHOE} />
          <path d="M215 975 L272 975 Q292 992 296 1012 Q256 1024 214 1012 Z" fill={SHOE} />
          <path d="M140 1002 L208 1002" stroke={SHOE_ACC} strokeWidth={6} />
          <path d="M216 1002 L292 1002" stroke={SHOE_ACC} strokeWidth={6} />
        </g>
        <g transform={`translate(0 ${breathe * 0.5})`}>
          {/* back arm (holds the tablet) */}
          <g transform="translate(130 372) rotate(10)">
            <rect x={-24} y={-6} width={48} height={160} rx={24} fill={JACKET_D} stroke={INK} strokeWidth={SW} />
            <g transform="translate(0 150) rotate(-14)">
              <rect x={-22} y={-4} width={44} height={140} rx={22} fill={JACKET_D} stroke={INK} strokeWidth={SW} />
              <g transform="translate(0 140)">
                <rect x={-58} y={-30} width={84} height={120} rx={12} fill="#2A2F45" stroke={INK} strokeWidth={SW} transform="rotate(-8)" />
                <rect x={-50} y={-22} width={68} height={104} rx={7} fill="#7FA0FF" opacity={0.9} transform="rotate(-8)" />
                <circle r={22} fill={SKIN} stroke={INK} strokeWidth={SW} />
              </g>
            </g>
          </g>
          {/* torso: jacket open over a tee */}
          <path d="M122 360 Q210 330 298 360 L304 640 Q210 660 116 640 Z" fill={JACKET} stroke={INK} strokeWidth={SW} strokeLinejoin="round" />
          <path d="M178 352 L242 352 L236 640 L184 640 Z" fill={TEE} stroke={INK} strokeWidth={SW - 1} />
          <text x={210} y={470} textAnchor="middle" fontFamily="JetBrains Mono" fontWeight={800} fontSize={30} fill={JACKET}>{'</>'}</text>
          <path d="M116 620 Q210 645 304 620 L304 645 Q210 668 116 645 Z" fill={JACKET_D} stroke={INK} strokeWidth={SW - 1} />
          <path d="M168 350 L190 420 L178 352 Z M252 350 L230 420 L242 352 Z" fill={JACKET_D} stroke={INK} strokeWidth={SW - 2} strokeLinejoin="round" />
          {/* neck */}
          <rect x={186} y={296} width={48} height={60} rx={14} fill={SKIN_D} stroke={INK} strokeWidth={SW} />
          {/* head */}
          <g transform={`translate(210 200) rotate(${(cur.tilt ?? 0) + nod}) translate(-210 -200)`}>
            {/* hair twists peeking out */}
            {[[112, 206], [118, 236], [306, 206], [300, 236]].map(([hx, hy], i) => <ellipse key={i} cx={hx} cy={hy} rx={14} ry={20} fill={HAIR} stroke={INK} strokeWidth={SW - 1} />)}
            <ellipse cx={112} cy={222} rx={18} ry={22} fill={SKIN} stroke={INK} strokeWidth={SW} />
            <ellipse cx={308} cy={222} rx={18} ry={22} fill={SKIN} stroke={INK} strokeWidth={SW} />
            <ellipse cx={210} cy={214} rx={100} ry={106} fill={SKIN} stroke={INK} strokeWidth={SW} />
            {/* beanie */}
            <path d="M104 178 Q104 74 210 70 Q316 74 316 178 Z" fill={BEANIE} stroke={INK} strokeWidth={SW} strokeLinejoin="round" />
            {[150, 180, 210, 240, 270].map((rx) => <path key={rx} d={`M${rx} 80 Q${rx + (rx - 210) * 0.15} 130 ${rx + (rx - 210) * 0.2} 160`} stroke={BEANIE_D} strokeWidth={4} fill="none" />)}
            <rect x={96} y={150} width={228} height={42} rx={21} fill={BEANIE_D} stroke={INK} strokeWidth={SW} />
            <circle cx={210} cy={60} r={24} fill={BEANIE} stroke={INK} strokeWidth={SW} />
            {/* brows */}
            <path d={`M148 ${186 + brow} Q172 ${176 + brow} 196 ${186 + brow}`} stroke={HAIR} strokeWidth={9} strokeLinecap="round" fill="none" />
            <path d={`M224 ${186 + brow} Q248 ${176 + brow} 272 ${186 + brow}`} stroke={HAIR} strokeWidth={9} strokeLinecap="round" fill="none" />
            {/* eyes */}
            {[172, 248].map((ex) => blink
              ? <path key={ex} d={`M${ex - 18} 228 Q${ex} 236 ${ex + 18} 228`} stroke={INK} strokeWidth={SW} fill="none" strokeLinecap="round" />
              : <g key={ex}><ellipse cx={ex} cy={226} rx={20} ry={22} fill="#fff" /><circle cx={ex + lx} cy={228 + ly} r={10} fill={INK} /><circle cx={ex + lx + 3} cy={224 + ly} r={3} fill="#fff" /></g>)}
            {/* glasses */}
            <circle cx={172} cy={226} r={36} fill="none" stroke={INK} strokeWidth={8} />
            <circle cx={248} cy={226} r={36} fill="none" stroke={INK} strokeWidth={8} />
            <path d="M208 222 Q210 214 212 222" stroke={INK} strokeWidth={7} fill="none" />
            <path d="M136 220 L114 212 M284 220 L306 212" stroke={INK} strokeWidth={6} />
            {/* nose, cheeks */}
            <path d="M206 254 Q214 268 204 274" stroke={SKIN_D} strokeWidth={5} fill="none" strokeLinecap="round" />
            <circle cx={150} cy={270} r={14} fill={BLUSH} opacity={0.45} />
            <circle cx={270} cy={270} r={14} fill={BLUSH} opacity={0.45} />
            <g transform="translate(210 294)"><Mouth vis={vis} amp={amp} smile={cur.smile ?? 0.6} talking={talking} /></g>
          </g>
          {/* stage-side arm (poses) */}
          <g transform={`translate(290 372) rotate(${cur.up})`}>
            <rect x={-24} y={-6} width={48} height={160} rx={24} fill={JACKET} stroke={INK} strokeWidth={SW} />
            <g transform={`translate(0 150) rotate(${cur.fore})`}>
              <rect x={-22} y={-4} width={44} height={140} rx={22} fill={JACKET} stroke={INK} strokeWidth={SW} />
              <rect x={-24} y={112} width={48} height={22} rx={8} fill={JACKET_D} stroke={INK} strokeWidth={SW - 2} />
              <g transform="translate(0 150)"><Hand kind={cur.hand} /></g>
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
};
