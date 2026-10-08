import React, { useId } from 'react';
import { spring, useCurrentFrame, useVideoConfig } from 'remotion';

/**
 * Ada v2: the host for the Teyro / Teyro Teach explainer Reels.
 * An original character (not Tey): curly puff, sunshine headband, violet hoodie with a </> badge.
 *
 * v2 matches the reference host's look (docs/SOCIAL_VIDEO_REFERENCE_ANALYSIS.md §4):
 * white sticker outline + soft drop shadow + light grain, finger hands (point, thumb,
 * open palm, counting 1-4), and the wink / sleep / worried / blindfold / surprise poses.
 * It's standalone: lip-sync comes in as a prop, and it works at any fps or frame size.
 */

export type Hand = 'fist' | 'point' | 'thumb' | 'open' | 'count1' | 'count2' | 'count3' | 'count4';
type Arm = [number, number]; // [upper, forearm] degrees; 0 = hanging straight down
export type Pose = {
  l: Arm; r: Arm;
  lh?: Hand; rh?: Hand;
  front?: 'l' | 'r' | 'both';  // force an arm in front of the body
  eyes?: 'open' | 'wink' | 'closed' | 'happy';
  mouth?: 'o';                  // surprised "o" when not talking
  brow?: number;                // -1 frown … 1 raised
  look?: [number, number];
  smile?: number;               // 0 neutral … 1 big grin (when silent)
  tilt?: number;                // head tilt degrees
  lean?: number;                // body lean degrees
  shoulders?: number;           // shrug lift px
  wiggle?: 'l' | 'r';           // waving forearm
  sweat?: boolean; blindfold?: boolean; zzz?: boolean;
};

export const POSES = {
  idle: { l: [14, -18], r: [-14, 18], smile: 0.6 },
  talk: { l: [30, 95], r: [-14, 18], lh: 'open', smile: 0.6, brow: 0.2 },
  talk2: { l: [14, -18], r: [-32, -100], rh: 'open', smile: 0.6, brow: 0.3, tilt: -3 },
  open: { l: [48, 70], r: [-48, -70], lh: 'open', rh: 'open', smile: 0.8, brow: 0.5 },
  present: { l: [78, 42], r: [-14, 18], lh: 'open', smile: 0.85, brow: 0.5, look: [-8, -2], tilt: 4 },
  wave: { l: [14, -18], r: [-150, -20], rh: 'open', smile: 1, brow: 0.6, tilt: 5, wiggle: 'r' },
  pointR: { l: [14, -18], r: [-92, -8], rh: 'point', smile: 0.9, brow: 0.5, look: [8, 0], tilt: -4 },
  pointUpR: { l: [14, -18], r: [-150, -20], rh: 'point', smile: 0.9, brow: 0.7, look: [6, -8], tilt: -3 },
  pointL: { l: [92, 8], r: [-14, 18], lh: 'point', smile: 0.9, brow: 0.5, look: [-8, 0], tilt: 4 },
  pointUpL: { l: [150, 20], r: [-14, 18], lh: 'point', smile: 0.9, brow: 0.7, look: [-6, -8], tilt: 3 },
  shrug: { l: [62, 118], r: [-62, -118], lh: 'open', rh: 'open', smile: 0.2, brow: 1, tilt: 7, shoulders: 14 },
  cheer: { l: [158, 18], r: [-158, -18], smile: 1, brow: 0.8, eyes: 'happy' },
  think: { l: [26, 125], r: [-24, -150], smile: 0.3, brow: 0.4, look: [6, -7], tilt: 6 },
  chill: { l: [150, 150], r: [-150, -150], smile: 0.9, brow: 0.2, tilt: -6, lean: -3 },
  fist: { l: [14, -18], r: [-40, -140], front: 'r', smile: 1, brow: 0.7, tilt: -2 },
  thumbsUp: { l: [14, -18], r: [-40, -140], rh: 'thumb', front: 'r', smile: 1, brow: 0.6, tilt: -3 },
  count1: { l: [14, -18], r: [-150, -20], rh: 'count1', smile: 0.8, brow: 0.6, tilt: 3 },
  count2: { l: [14, -18], r: [-150, -20], rh: 'count2', smile: 0.8, brow: 0.6, tilt: 3 },
  count3: { l: [14, -18], r: [-150, -20], rh: 'count3', smile: 0.8, brow: 0.6, tilt: 3 },
  count4: { l: [14, -18], r: [-150, -20], rh: 'count4', smile: 0.8, brow: 0.6, tilt: 3 },
  wink: { l: [14, -18], r: [-40, -140], rh: 'thumb', front: 'r', eyes: 'wink', smile: 1, brow: 0.4, tilt: -6 },
  surprise: { l: [48, 70], r: [-48, -70], lh: 'open', rh: 'open', mouth: 'o', smile: 0.2, brow: 1, tilt: 0 },
  worried: { l: [62, 118], r: [-62, -118], lh: 'open', rh: 'open', smile: -0.7, brow: 0.9, tilt: -5, shoulders: 10, sweat: true, look: [-4, 2] },
  sleep: { l: [14, -18], r: [-14, 18], eyes: 'closed', smile: 0.3, brow: -0.2, tilt: 12, lean: 3, zzz: true },
  blindfold: { l: [62, 118], r: [-62, -118], lh: 'open', rh: 'open', blindfold: true, smile: 0.5, brow: 0.6, tilt: 4, shoulders: 8 },
} satisfies Record<string, Pose>;
export type PoseName = keyof typeof POSES;

/** Per-frame lip-sync at the composition fps: amp 0..1, vis = one viseme char per frame (A O E C F M X). */
export type Lip = { amp: number[]; vis: string };

/** White sticker outline (4 chained hard drop-shadows) + soft shadow. Chrome draws these fast, unlike an SVG morphology filter. */
const stickerCss = (scale: number) => {
  const o = Math.max(2, 7 * scale);
  return `drop-shadow(${o}px 0 0 #fff) drop-shadow(-${o}px 0 0 #fff) drop-shadow(0 ${o}px 0 #fff) drop-shadow(0 -${o}px 0 #fff) drop-shadow(0 ${12 * scale}px ${9 * scale}px rgba(0,0,0,0.28))`;
};

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const rand = (i: number) => { const x = Math.sin(i * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); };

const SKIN = '#A86B3C', SKIN_SHADE = '#8C5530', HAIR = '#2A1912', HAIR_HI = '#4A2E22';
const HOOD = '#7B61FF', HOOD_SHADE = '#5F45E0', YELLOW = '#FFC800', INK = '#121933';

/** Hand in forearm-local space: origin at the wrist end, +y points away from the elbow. */
const HandShape: React.FC<{ kind: Hand; side: 'l' | 'r' }> = ({ kind, side }) => {
  const m = side === 'l' ? 1 : -1; // thumb sits toward the body's centre line
  const finger = (ang: number, len: number, key: number, w = 15) => (
    <g key={key} transform={`rotate(${ang})`}>
      <rect x={-w / 2} y={6} width={w} height={len} rx={w / 2} fill={SKIN} />
      <rect x={-w / 2 + 3} y={len - 6} width={w - 6} height={7} rx={3} fill="#fff" opacity={0.18} />
    </g>
  );
  const knuckles = <path d="M-16 18 Q0 26 16 18" stroke={SKIN_SHADE} strokeWidth={4} fill="none" strokeLinecap="round" opacity={0.7} />;
  const fist = (r = 30) => (<><circle r={r} fill={SKIN} /><ellipse cx={-6} cy={-8} rx={12} ry={8} fill="#fff" opacity={0.12} /></>);
  if (kind === 'point') return (<g>{fist(28)}{finger(0, 66, 0, 17)}{knuckles}<ellipse cx={m * 24} cy={-4} rx={10} ry={15} fill={SKIN} transform={`rotate(${m * -25})`} /></g>);
  if (kind === 'thumb') return (<g>{fist(30)}<path d="M-20 -6 L20 -6 M-20 6 L20 6" stroke={SKIN_SHADE} strokeWidth={3.5} opacity={0.6} strokeLinecap="round" /><g transform={`translate(${m * 14} 8)`}>{finger(0, 52, 0, 19)}</g></g>);
  if (kind === 'open') return (
    <g>
      {[-34, -12, 10, 32].map((a, k) => finger(a, k === 0 || k === 3 ? 40 : 48, k))}
      <g transform={`rotate(${m * 78})`}><rect x={-8} y={4} width={16} height={36} rx={8} fill={SKIN} /></g>
      <ellipse rx={31} ry={33} fill={SKIN} />
      <ellipse cx={-6} cy={-8} rx={12} ry={8} fill="#fff" opacity={0.12} />
    </g>
  );
  if (kind.startsWith('count')) {
    const n = Number(kind.slice(5));
    const angs = [-26, -9, 9, 26];
    return (<g>{angs.slice(0, n).map((a, k) => finger(a, 62, k, 18))}{fist(29)}{knuckles}<ellipse cx={m * 22} cy={6} rx={10} ry={14} fill={SKIN} transform={`rotate(${m * 30})`} /></g>);
  }
  return <g>{fist()}<ellipse cx={m * 22} cy={-10} rx={11} ry={17} fill={SKIN} transform={`rotate(${m * -25})`} /></g>;
};

export const Ada: React.FC<{
  poses: { t: number; p: PoseName }[];
  lip?: Lip;            // omit for a silent Ada
  talking?: boolean;
  scale?: number;       // 1 = 600×900 px artboard
  sticker?: boolean;    // white outline + drop shadow (reference look); cheap CSS drop-shadows
  grain?: boolean;      // per-character SVG grain; slow (~2 s/frame), prefer the scene-wide <Grain /> overlay
  frameOffset?: number; // add when rendering inside a <Sequence>
}> = ({ poses, lip, talking = true, scale = 1, sticker = true, grain = false, frameOffset = 0 }) => {
  const f = useCurrentFrame() + frameOffset;
  const { fps } = useVideoConfig();
  const t = f / fps;
  const fid = 'ada' + useId().replace(/[^a-zA-Z0-9]/g, '');

  let i = 0;
  for (let k = 0; k < poses.length; k++) if (poses[k].t <= t) i = k;
  const cur: Pose = POSES[poses[i].p];
  const prev: Pose = POSES[poses[Math.max(0, i - 1)].p];
  const p = i === 0 ? 1 : spring({ frame: f - poses[i].t * fps, fps, config: { damping: 11, stiffness: 190, mass: 0.8 } });
  const snap = p > 0.5 ? cur : prev; // discrete things (hands, eyes, props) switch halfway through the move
  const mix = (a: number | undefined, b: number | undefined, d = 0) => lerp(a ?? d, b ?? d, p);
  // arms barely overshoot, so a swinging hand never sweeps across the face mid-move
  const pa = Math.min(p, 1.03);
  const armMix = (a: Arm, b: Arm): Arm => [lerp(a[0], b[0], pa), lerp(a[1], b[1], pa)];
  const L = armMix(prev.l, cur.l), R = armMix(prev.r, cur.r);

  const amp = lip?.amp ?? [];
  const a = talking && lip ? (amp[f] ?? 0) * 0.6 + ((amp[f - 1] ?? 0) + (amp[f + 1] ?? 0)) * 0.2 : 0;
  const v = talking && lip ? lip.vis[f] ?? 'X' : 'X';
  // pose-change pop (the reference host scale-pops on every new pose)
  const popAmt = i === 0 ? 0 : Math.exp(-(t - poses[i].t) * 9) * Math.sin((t - poses[i].t) * 22) * 0.035;
  const breathe = Math.sin(t * 2.4) * 3;

  const gest = a * 10 * Math.sin(t * 7.3);
  const wig = snap.wiggle ? Math.sin(t * 16) * 22 * p : 0;
  const tilt = mix(prev.tilt, cur.tilt) + a * 4 * Math.sin(t * 5.1) + Math.sin(t * 1.3) * 1.5;
  const brow = mix(prev.brow, cur.brow) + a * 0.35;
  const look: [number, number] = [mix(prev.look?.[0], cur.look?.[0]), mix(prev.look?.[1], cur.look?.[1])];
  const sh = mix(prev.shoulders, cur.shoulders);
  const smileBase = mix(prev.smile, cur.smile, 0.5);

  let blink = 1;
  for (let k = 0; k < 40; k++) {
    const d = t - (0.9 + k * 2.9 + rand(k) * 1.4);
    if (d >= 0 && d < 0.13) blink = Math.abs(d - 0.065) / 0.065;
  }
  const eyes = snap.eyes ?? 'open';

  const open = v === 'M' ? 0.04 : Math.min(1, a * 1.25);
  const widthBy: Record<string, number> = { A: 1, O: 0.62, E: 1.15, C: 0.9, F: 0.85, M: 0.95, X: 1 };
  const mw = 44 * (widthBy[v] ?? 1) * (open > 0.1 ? 1 : 1.1);
  const mh = 6 + open * 44;

  const arm = (side: 'l' | 'r', ang: Arm) => {
    const sx = side === 'l' ? 186 : 414;
    const extra = side === 'l' ? gest : -gest;
    const fore = ang[1] + (snap.wiggle === side ? wig : extra * 0.6);
    const hand = (side === 'l' ? snap.lh : snap.rh) ?? 'fist';
    return (
      <g transform={`translate(${sx} ${528 - sh}) rotate(${ang[0] + extra * 0.4})`}>
        <line x1={0} y1={0} x2={0} y2={128} stroke={HOOD_SHADE} strokeWidth={66} strokeLinecap="round" />
        <line x1={0} y1={0} x2={0} y2={124} stroke={HOOD} strokeWidth={58} strokeLinecap="round" />
        <g transform={`translate(0 128) rotate(${fore})`}>
          <line x1={0} y1={0} x2={0} y2={108} stroke={HOOD} strokeWidth={54} strokeLinecap="round" />
          <rect x={-28} y={92} width={56} height={22} rx={11} fill="#fff" opacity={0.9} />
          <g transform="translate(0 140) scale(1.45)"><HandShape kind={hand} side={side} /></g>
        </g>
      </g>
    );
  };
  const inFront = (side: 'l' | 'r') =>
    (side === 'l' ? L[0] > 90 : R[0] < -90) || cur.front === side || cur.front === 'both';

  const eye = (ex: number, k: number) => {
    const closedHere = eyes === 'closed' || (eyes === 'wink' && k === 0);
    if (closedHere || eyes === 'happy') {
      const d = eyes === 'happy' || (eyes === 'wink') ? 'M-28 6 Q0 -22 28 6' : 'M-28 -2 Q0 20 28 -2';
      return <path key={k} transform={`translate(${ex} 300)`} d={d} stroke={INK} strokeWidth={8} fill="none" strokeLinecap="round" />;
    }
    return (
      <g key={k} transform={`translate(${ex} 300) scale(1 ${Math.max(0.08, blink)})`}>
        <ellipse rx={30} ry={35} fill="#fff" />
        <circle cx={look[0]} cy={look[1] + 3} r={20} fill="#3B2216" />
        <circle cx={look[0]} cy={look[1] + 3} r={10} fill="#120A06" />
        <circle cx={look[0] + 7} cy={look[1] - 5} r={6} fill="#fff" />
        <circle cx={look[0] - 6} cy={look[1] + 9} r={2.5} fill="#fff" opacity={0.8} />
        <path d="M-32 -16 Q0 -46 32 -16" stroke={INK} strokeWidth={7} fill="none" strokeLinecap="round" />
        <path d={k ? 'M28 -16 L38 -24' : 'M-28 -16 L-38 -24'} stroke={INK} strokeWidth={5} strokeLinecap="round" />
      </g>
    );
  };

  const sweatY = snap.sweat ? ((t * 0.7) % 1) * 40 : 0;

  return (
    <svg viewBox="-60 -120 720 1050" style={{ width: 720 * scale, height: 1050 * scale, overflow: 'visible', display: 'block', filter: sticker ? stickerCss(scale) : undefined }}>
      {grain && (
        <defs>
          <filter id={fid} x="-5%" y="-5%" width="110%" height="110%">
            <feTurbulence type="fractalNoise" baseFrequency={0.95} numOctaves={1} seed={7} result="noise" />
            <feColorMatrix in="noise" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.55 -0.3" result="grainA" />
            <feComposite in="grainA" in2="SourceAlpha" operator="in" result="grain" />
            <feMerge><feMergeNode in="SourceGraphic" /><feMergeNode in="grain" /></feMerge>
          </filter>
        </defs>
      )}
      <g filter={grain ? `url(#${fid})` : undefined}>
        <g transform={`translate(300 900) scale(${1 + popAmt}) translate(-300 -900) translate(0 ${breathe}) rotate(${mix(prev.lean, cur.lean)} 300 900)`}>
          {!inFront('l') && arm('l', L)}
          {!inFront('r') && arm('r', R)}
          {/* body */}
          <path d="M150 560 Q160 470 300 462 Q440 470 450 560 L476 930 L124 930 Z" fill={HOOD} />
          <path d="M300 462 Q440 470 450 560 L476 930 L360 930 Q380 700 300 462 Z" fill={HOOD_SHADE} opacity={0.35} />
          <path d="M232 470 Q300 560 368 470 Q300 500 232 470 Z" fill={HOOD_SHADE} />
          <path d="M262 500 L254 600" stroke="#fff" strokeWidth={7} strokeLinecap="round" />
          <path d="M338 500 L346 600" stroke="#fff" strokeWidth={7} strokeLinecap="round" />
          <circle cx={254} cy={606} r={7} fill="#fff" />
          <circle cx={346} cy={606} r={7} fill="#fff" />
          <g transform="translate(300 690)">
            <rect x={-58} y={-34} width={116} height={68} rx={20} fill={YELLOW} />
            <rect x={-58} y={-34} width={116} height={62} rx={20} fill="#FFD84D" />
            <path d="M-22 -12 L-38 0 L-22 12 M22 -12 L38 0 L22 12 M8 -16 L-8 16" stroke={INK} strokeWidth={7} fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </g>
          <path d="M268 400 L268 478 Q300 496 332 478 L332 400 Z" fill={SKIN_SHADE} />
          {/* head */}
          <g transform={`translate(0 ${-sh * 0.5}) rotate(${tilt} 300 420)`}>
            {Array.from({ length: 16 }).map((_, k) => {
              const ang = (k / 16) * Math.PI * 2, rr = 168 + (k % 2) * 14;
              return <circle key={k} cx={300 + Math.cos(ang) * rr * 0.98} cy={232 + Math.sin(ang) * rr * 0.86} r={64 + (k % 3) * 8} fill={HAIR} />;
            })}
            <ellipse cx={300} cy={232} rx={190} ry={170} fill={HAIR} />
            {Array.from({ length: 9 }).map((_, k) => (
              <circle key={k} cx={190 + k * 26 + (k % 2) * 6} cy={110 + Math.abs(k - 4) * 12 + (k % 2) * 10} r={10} fill={HAIR_HI} />
            ))}
            <ellipse cx={176} cy={318} rx={22} ry={30} fill={SKIN_SHADE} />
            <ellipse cx={424} cy={318} rx={22} ry={30} fill={SKIN_SHADE} />
            <circle cx={174} cy={360} r={15} fill="none" stroke={YELLOW} strokeWidth={6} />
            <circle cx={426} cy={360} r={15} fill="none" stroke={YELLOW} strokeWidth={6} />
            <ellipse cx={300} cy={306} rx={128} ry={142} fill={SKIN} />
            <path d="M300 164 Q428 170 428 306 Q428 430 300 448 Q392 400 400 300 Q404 200 300 164 Z" fill={SKIN_SHADE} opacity={0.28} />
            <path d="M172 250 Q170 150 300 140 Q430 150 428 250 Q410 196 360 186 Q330 210 300 186 Q262 214 236 188 Q190 200 172 250 Z" fill={HAIR} />
            <path d="M150 196 Q300 70 450 196" stroke={YELLOW} strokeWidth={30} fill="none" strokeLinecap="round" />
            <path d="M156 186 Q300 66 444 186" stroke="#FFE58A" strokeWidth={8} fill="none" strokeLinecap="round" opacity={0.8} />
            <ellipse cx={226} cy={360} rx={26} ry={15} fill="#E0705A" opacity={0.35 + smileBase * 0.2} />
            <ellipse cx={374} cy={360} rx={26} ry={15} fill="#E0705A" opacity={0.35 + smileBase * 0.2} />
            {!snap.blindfold && [250, 350].map(eye)}
            {[250, 350].map((ex, k) => (
              <path key={k}
                d={`M${ex - 26} ${250 - brow * 14} Q${ex} ${236 - brow * 20} ${ex + 26} ${250 - brow * 14}`}
                stroke={HAIR} strokeWidth={11} fill="none" strokeLinecap="round"
                transform={`rotate(${(k ? -1 : 1) * brow * -4} ${ex} 245)`} />
            ))}
            <path d="M292 330 Q300 350 312 340" stroke={SKIN_SHADE} strokeWidth={7} fill="none" strokeLinecap="round" />
            {/* blindfold over the eyes */}
            {snap.blindfold && (
              <g>
                <path d="M168 268 Q300 240 432 268 L436 330 Q300 304 164 330 Z" fill={INK} />
                <path d="M176 278 Q300 254 424 278" stroke="#fff" strokeWidth={4} opacity={0.18} fill="none" />
                <path d="M432 290 Q480 300 498 344 Q470 330 446 318 Z" fill={INK} />
                <path d="M432 300 Q470 336 470 380 Q452 350 438 326 Z" fill={INK} />
              </g>
            )}
            {/* mouth */}
            <g transform="translate(300 386)">
              {open < 0.08 ? (
                snap.mouth === 'o'
                  ? <ellipse cx={0} cy={8} rx={18} ry={24} fill="#5A1A14" />
                  : <path d={`M${-mw * 0.8} ${-4 - smileBase * 4} Q0 ${8 + smileBase * 18} ${mw * 0.8} ${-4 - smileBase * 4}`}
                    stroke="#5A1A14" strokeWidth={8} fill={smileBase > 0.75 ? '#5A1A14' : 'none'} strokeLinecap="round" strokeLinejoin="round" />
              ) : (
                <g>
                  <path d={`M${-mw} ${-6} Q0 ${-10 - smileBase * 4} ${mw} ${-6} Q${mw * 0.8} ${mh} 0 ${mh + 4} Q${-mw * 0.8} ${mh} ${-mw} ${-6} Z`} fill="#5A1A14" />
                  <path d={`M${-mw * 0.72} ${-5} Q0 ${-9} ${mw * 0.72} ${-5} L${mw * 0.6} ${1 + Math.min(6, mh * 0.12)} Q0 ${3 + Math.min(7, mh * 0.14)} ${-mw * 0.6} ${1 + Math.min(6, mh * 0.12)} Z`} fill="#fff" />
                  <ellipse cx={0} cy={mh - 4} rx={mw * 0.5} ry={Math.max(3, mh * 0.22)} fill="#E46A5E" />
                </g>
              )}
            </g>
            {snap.sweat && (
              <path transform={`translate(440 ${226 + sweatY})`} d="M0 -22 Q16 2 10 12 Q0 22 -10 12 Q-16 2 0 -22 Z" fill="#7CC8FF" stroke="#fff" strokeWidth={4} />
            )}
          </g>
          {inFront('l') && arm('l', L)}
          {inFront('r') && arm('r', R)}
        </g>
      </g>
      {/* Zzz floats outside the sticker filter so it stays crisp */}
      {snap.zzz && [0, 1, 2].map((k) => {
        const ph = (t * 0.6 + k / 3) % 1;
        return (
          <path key={k} transform={`translate(${470 + ph * 70} ${120 - ph * 150}) scale(${1.1 + ph * 1.1})`}
            d="M-14 -14 L14 -14 L-14 14 L14 14" stroke={INK} strokeWidth={7} fill="none" strokeLinecap="round" strokeLinejoin="round" opacity={Math.min(1, (1 - ph) * 1.6)} />
        );
      })}
    </svg>
  );
};
