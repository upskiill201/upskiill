import React from 'react';
import { useCurrentFrame } from 'remotion';
import { reel } from '../lib/data';
import { C, FPS } from '../theme';
import { kickPulse, lerp, rand, spr } from '../lib/anim';

// Ada — the reel's host. An original character (not Tey): curly puff, sunshine headband, violet hoodie.

type Arm = [number, number]; // [upper, forearm] degrees, 0 = hanging straight down
export type Pose = {
  l: Arm; r: Arm;
  brow?: number;       // -1 frown … 1 raised
  look?: [number, number];
  smile?: number;      // 0 neutral … 1 big grin (when silent)
  tilt?: number;       // head tilt degrees
  lean?: number;       // body lean degrees
  shoulders?: number;  // shrug lift px
  wiggle?: 'l' | 'r';  // waving forearm
};
export const POSES: Record<string, Pose> = {
  idle: { l: [14, -18], r: [-14, 18], smile: 0.6 },
  talk: { l: [30, 95], r: [-14, 18], smile: 0.6, brow: 0.2 },
  talk2: { l: [14, -18], r: [-32, -100], smile: 0.6, brow: 0.3, tilt: -3 },
  open: { l: [48, 70], r: [-48, -70], smile: 0.8, brow: 0.5 },
  wave: { l: [14, -18], r: [-150, -20], smile: 1, brow: 0.6, tilt: 5, wiggle: 'r' },
  pointR: { l: [14, -18], r: [-92, -8], smile: 0.9, brow: 0.5, look: [8, 0], tilt: -4 },
  pointUpR: { l: [14, -18], r: [-155, -12], smile: 0.9, brow: 0.7, look: [6, -8], tilt: -3 },
  pointL: { l: [92, 8], r: [-14, 18], smile: 0.9, brow: 0.5, look: [-8, 0], tilt: 4 },
  shrug: { l: [62, 118], r: [-62, -118], smile: 0.2, brow: 1, tilt: 7, shoulders: 14 },
  cheer: { l: [158, 18], r: [-158, -18], smile: 1, brow: 0.8, tilt: 0 },
  think: { l: [26, 125], r: [-24, -150], smile: 0.3, brow: 0.4, look: [6, -7], tilt: 6 },
  chill: { l: [150, 150], r: [-150, -150], smile: 0.9, brow: 0.2, tilt: -6, lean: -3 },
  fist: { l: [14, -18], r: [-40, -140], smile: 1, brow: 0.7, tilt: -2 },
};


const pick = (keys: { t: number; p: string }[], t: number) => {
  let i = 0;
  for (let k = 0; k < keys.length; k++) if (keys[k].t <= t) i = k;
  return i;
};

export const Ada: React.FC<{
  poses: { t: number; p: string }[];
  talking?: boolean;
  scale?: number;
  bob?: number;
}> = ({ poses, talking = true, scale = 1, bob = 1 }) => {
  const { amp, vis } = reel();
  const f = useCurrentFrame(); // NOTE: Ada is always rendered at absolute timeline frames (no Sequence offset)
  const t = f / FPS;
  const i = pick(poses, t);
  const cur = POSES[poses[i].p];
  const prev = POSES[poses[Math.max(0, i - 1)].p];
  const p = i === 0 ? 1 : spr(f, poses[i].t, { damping: 11, stiffness: 190, mass: 0.8 });
  const mix = (a: number | undefined, b: number | undefined, d = 0) => lerp(a ?? d, b ?? d, p);
  const armMix = (a: Arm, b: Arm): Arm => [lerp(a[0], b[0], p), lerp(a[1], b[1], p)];
  const L = armMix(prev.l, cur.l), R = armMix(prev.r, cur.r);

  const a = talking ? (amp[f] ?? 0) * 0.6 + ((amp[f - 1] ?? 0) + (amp[f + 1] ?? 0)) * 0.2 : 0;
  const v = talking ? vis[f] ?? 'X' : 'X';
  const kp = kickPulse(f) * bob;
  const breathe = Math.sin(t * 2.4) * 3;

  // talking gestures: arms & head pick up energy from the voice
  const gest = a * 10 * Math.sin(t * 7.3);
  const wig = cur.wiggle ? Math.sin(t * 16) * 22 * p : 0;
  const tilt = mix(prev.tilt, cur.tilt) + a * 4 * Math.sin(t * 5.1) + Math.sin(t * 1.3) * 1.5;
  const brow = mix(prev.brow, cur.brow) + a * 0.35;
  const look: [number, number] = [mix(prev.look?.[0], cur.look?.[0]), mix(prev.look?.[1], cur.look?.[1])];
  const sh = mix(prev.shoulders, cur.shoulders);

  // blinks
  let blink = 1;
  for (let k = 0; k < 40; k++) {
    const bt = 0.9 + k * 2.9 + rand(k) * 1.4;
    const d = t - bt;
    if (d >= 0 && d < 0.13) blink = Math.abs(d - 0.065) / 0.065;
  }
  const smileBase = mix(prev.smile, cur.smile, 0.5);

  // mouth
  const open = v === 'M' ? 0.04 : Math.min(1, a * 1.25);
  const widthBy: Record<string, number> = { A: 1, O: 0.62, E: 1.15, C: 0.9, F: 0.85, M: 0.95, X: 1 };
  const mw = 44 * (widthBy[v] ?? 1) * (open > 0.1 ? 1 : 1.1);
  const mh = 6 + open * 44;

  const skin = '#A86B3C', skinShade = '#8C5530', hair = '#2A1912', hairHi = '#4A2E22';
  const hood = C.violet, hoodShade = '#5F45E0';

  const arm = (side: 'l' | 'r', ang: Arm) => {
    const sx = side === 'l' ? 186 : 414;
    const extra = side === 'l' ? gest : -gest;
    const fore = ang[1] + (cur.wiggle === side ? wig : extra * 0.6);
    return (
      <g transform={`translate(${sx} ${528 - sh}) rotate(${ang[0] + extra * 0.4})`}>
        <line x1={0} y1={0} x2={0} y2={128} stroke={hoodShade} strokeWidth={66} strokeLinecap="round" />
        <line x1={0} y1={0} x2={0} y2={124} stroke={hood} strokeWidth={58} strokeLinecap="round" />
        <g transform={`translate(0 128) rotate(${fore})`}>
          <line x1={0} y1={0} x2={0} y2={108} stroke={hood} strokeWidth={54} strokeLinecap="round" />
          <rect x={-28} y={92} width={56} height={22} rx={11} fill="#fff" opacity={0.9} />
          <g transform="translate(0 140)">
            <circle r={31} fill={skin} />
            <ellipse cx={side === 'l' ? 22 : -22} cy={-10} rx={11} ry={17} fill={skin} transform={`rotate(${side === 'l' ? -25 : 25})`} />
            <ellipse cx={-6} cy={-8} rx={12} ry={8} fill="#fff" opacity={0.12} />
          </g>
        </g>
      </g>
    );
  };

  const leftUp = L[0] > 90;
  const rightUp = R[0] < -90;

  return (
    <svg viewBox="0 0 600 900" style={{ width: 600 * scale, height: 900 * scale, overflow: 'visible' }}>
      <g transform={`translate(0 ${-kp * 7 + breathe}) rotate(${mix(prev.lean, cur.lean)} 300 900)`}>
        {/* arms behind body when hanging */}
        {!leftUp && arm('l', L)}
        {!rightUp && arm('r', R)}
        {/* body */}
        <path d="M150 560 Q160 470 300 462 Q440 470 450 560 L476 930 L124 930 Z" fill={hood} />
        <path d="M300 462 Q440 470 450 560 L476 930 L360 930 Q380 700 300 462 Z" fill={hoodShade} opacity={0.35} />
        <path d="M232 470 Q300 560 368 470 Q300 500 232 470 Z" fill={hoodShade} />
        <path d="M262 500 L254 600" stroke="#fff" strokeWidth={7} strokeLinecap="round" />
        <path d="M338 500 L346 600" stroke="#fff" strokeWidth={7} strokeLinecap="round" />
        <circle cx={254} cy={606} r={7} fill="#fff" />
        <circle cx={346} cy={606} r={7} fill="#fff" />
        {/* chest badge: </> */}
        <g transform="translate(300 690)">
          <rect x={-58} y={-34} width={116} height={68} rx={20} fill={C.yellow} />
          <rect x={-58} y={-34} width={116} height={62} rx={20} fill="#FFD84D" />
          <path d="M-22 -12 L-38 0 L-22 12 M22 -12 L38 0 L22 12 M8 -16 L-8 16" stroke={C.ink} strokeWidth={7} fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        {/* neck */}
        <path d="M268 400 L268 478 Q300 496 332 478 L332 400 Z" fill={skinShade} />
        {/* head group */}
        <g transform={`translate(0 ${-sh * 0.5}) rotate(${tilt} 300 420)`}>
          {/* hair back: curly puff */}
          <g>
            {Array.from({ length: 16 }).map((_, k) => {
              const ang = (k / 16) * Math.PI * 2;
              const rr = 168 + (k % 2) * 14;
              return <circle key={k} cx={300 + Math.cos(ang) * rr * 0.98} cy={232 + Math.sin(ang) * rr * 0.86} r={64 + (k % 3) * 8} fill={hair} />;
            })}
            <ellipse cx={300} cy={232} rx={190} ry={170} fill={hair} />
            {Array.from({ length: 9 }).map((_, k) => (
              <circle key={k} cx={190 + k * 26 + (k % 2) * 6} cy={110 + Math.abs(k - 4) * 12 + (k % 2) * 10} r={10} fill={hairHi} />
            ))}
          </g>
          {/* ears + hoops */}
          <ellipse cx={176} cy={318} rx={22} ry={30} fill={skinShade} />
          <ellipse cx={424} cy={318} rx={22} ry={30} fill={skinShade} />
          <circle cx={174} cy={360} r={15} fill="none" stroke={C.yellow} strokeWidth={6} />
          <circle cx={426} cy={360} r={15} fill="none" stroke={C.yellow} strokeWidth={6} />
          {/* face */}
          <ellipse cx={300} cy={306} rx={128} ry={142} fill={skin} />
          <path d="M300 164 Q428 170 428 306 Q428 430 300 448 Q392 400 400 300 Q404 200 300 164 Z" fill={skinShade} opacity={0.28} />
          {/* hair front: soft fringe curls */}
          <path d="M172 250 Q170 150 300 140 Q430 150 428 250 Q410 196 360 186 Q330 210 300 186 Q262 214 236 188 Q190 200 172 250 Z" fill={hair} />
          {/* headband */}
          <path d="M150 196 Q300 70 450 196" stroke={C.yellow} strokeWidth={30} fill="none" strokeLinecap="round" />
          <path d="M156 186 Q300 66 444 186" stroke="#FFE58A" strokeWidth={8} fill="none" strokeLinecap="round" opacity={0.8} />
          {/* cheeks */}
          <ellipse cx={226} cy={360} rx={26} ry={15} fill="#E0705A" opacity={0.35 + smileBase * 0.2} />
          <ellipse cx={374} cy={360} rx={26} ry={15} fill="#E0705A" opacity={0.35 + smileBase * 0.2} />
          {/* eyes */}
          {[250, 350].map((ex, k) => (
            <g key={k} transform={`translate(${ex} 300) scale(1 ${Math.max(0.08, blink)})`}>
              <ellipse rx={30} ry={35} fill="#fff" />
              <circle cx={look[0]} cy={look[1] + 3} r={20} fill="#3B2216" />
              <circle cx={look[0]} cy={look[1] + 3} r={10} fill="#120A06" />
              <circle cx={look[0] + 7} cy={look[1] - 5} r={6} fill="#fff" />
              <circle cx={look[0] - 6} cy={look[1] + 9} r={2.5} fill="#fff" opacity={0.8} />
              <path d="M-32 -16 Q0 -46 32 -16" stroke={C.ink} strokeWidth={7} fill="none" strokeLinecap="round" />
              <path d={k ? 'M28 -16 L38 -24' : 'M-28 -16 L-38 -24'} stroke={C.ink} strokeWidth={5} strokeLinecap="round" />
            </g>
          ))}
          {/* brows */}
          {[250, 350].map((ex, k) => (
            <path key={k}
              d={`M${ex - 26} ${250 - brow * 14 + (k ? 4 : 0) * (brow < 0 ? -1 : 0)} Q${ex} ${236 - brow * 20} ${ex + 26} ${250 - brow * 14}`}
              stroke={hair} strokeWidth={11} fill="none" strokeLinecap="round"
              transform={`rotate(${(k ? -1 : 1) * brow * -4} ${ex} 245)`}
            />
          ))}
          {/* nose */}
          <path d="M292 330 Q300 350 312 340" stroke={skinShade} strokeWidth={7} fill="none" strokeLinecap="round" />
          {/* mouth */}
          <g transform="translate(300 386)">
            {open < 0.08 ? (
              <path d={`M${-mw * 0.8} ${-4 - smileBase * 4} Q0 ${8 + smileBase * 18} ${mw * 0.8} ${-4 - smileBase * 4}`}
                stroke="#5A1A14" strokeWidth={8} fill={smileBase > 0.75 ? '#5A1A14' : 'none'} strokeLinecap="round" strokeLinejoin="round" />
            ) : (
              <g>
                <path d={`M${-mw} ${-6} Q0 ${-10 - smileBase * 4} ${mw} ${-6} Q${mw * 0.8} ${mh} 0 ${mh + 4} Q${-mw * 0.8} ${mh} ${-mw} ${-6} Z`} fill="#5A1A14" />
                <path d={`M${-mw * 0.72} ${-5} Q0 ${-9} ${mw * 0.72} ${-5} L${mw * 0.6} ${1 + Math.min(6, mh * 0.12)} Q0 ${3 + Math.min(7, mh * 0.14)} ${-mw * 0.6} ${1 + Math.min(6, mh * 0.12)} Z`} fill="#fff" />
                <ellipse cx={0} cy={mh - 4} rx={mw * 0.5} ry={Math.max(3, mh * 0.22)} fill="#E46A5E" />
              </g>
            )}
          </g>
        </g>
        {/* raised arms in front */}
        {leftUp && arm('l', L)}
        {rightUp && arm('r', R)}
      </g>
    </svg>
  );
};
