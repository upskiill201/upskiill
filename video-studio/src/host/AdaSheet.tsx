import React from 'react';
import { AbsoluteFill } from 'remotion';
import { Ada, POSES, type PoseName } from './Ada';
import { Grain } from './Grain';

/** Every pose on one sheet, for checking Ada v2 at a glance (render as a still). */
export const AdaPoseSheet: React.FC = () => {
  const names = Object.keys(POSES) as PoseName[];
  return (
    <AbsoluteFill style={{ background: '#F0EEEA', display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', padding: 30, gap: 10 }}>
      {names.map((p) => (
        <div key={p} style={{ position: 'relative', height: 440, overflow: 'hidden', borderRadius: 16, background: '#E6E3DD' }}>
          <div style={{ position: 'absolute', left: '50%', bottom: -60, transform: 'translateX(-50%)' }}>
            <Ada poses={[{ t: 0, p }]} scale={0.42} />
          </div>
          <div style={{ position: 'absolute', top: 10, left: 14, font: '600 26px monospace', color: '#121933' }}>{p}</div>
        </div>
      ))}
    </AbsoluteFill>
  );
};

/**
 * Ada at the reference host's measured positions (docs §4.3), 1080×1920.
 * Ada's head centre sits at about (300, 300) of her 600×900 artboard, and the head is ~300 px wide.
 */
export const placeAda = (frameW: number, frameH: number, headX: number, headY: number, headWidthPct: number) => {
  const scale = (headWidthPct * frameW) / 300;
  // Artboard is rendered from viewBox -60,-120 → head centre at (360, 420) in rendered px before scaling.
  return { scale, left: headX * frameW - 360 * scale, top: headY * frameH - 420 * scale };
};

const Frame: React.FC<{ label: string; bg: string; hx: number; hy: number; hw: number; pose: PoseName; ink?: string }> = ({ label, bg, hx, hy, hw, pose, ink = '#121933' }) => {
  const { scale, left, top } = placeAda(1080, 1920, hx, hy, hw);
  return (
    <div style={{ position: 'relative', width: 1080, height: 1920, background: bg, overflow: 'hidden', flex: 'none' }}>
      <div style={{ position: 'absolute', top: 130, left: 130, font: '600 30px monospace', color: ink, opacity: 0.6 }}>// 01 — topic</div>
      <div style={{ position: 'absolute', top: 270, left: 130, right: 130, font: '700 84px sans-serif', color: ink, lineHeight: 1.08 }}>{label}</div>
      <div style={{ position: 'absolute', left, top }}><Ada poses={[{ t: 0, p: pose }]} scale={scale} /></div>
    </div>
  );
};

/** Three placements side by side (scaled down): Editorial hook, Editorial items, Dark. */
export const AdaPlacement: React.FC = () => (
  <AbsoluteFill style={{ background: '#222', flexDirection: 'row', gap: 40, alignItems: 'center', justifyContent: 'center' }}>
    <div style={{ display: 'flex', gap: 60, transform: 'scale(0.55)', transformOrigin: 'center' }}>
      <Frame label="Editorial hook: head (69%, 78%), 30% wide" bg="#F0EEEA" hx={0.69} hy={0.78} hw={0.30} pose="wave" />
      <Frame label="Editorial items: head (85%, 91%), 18% wide" bg="#F0EEEA" hx={0.85} hy={0.91} hw={0.18} pose="pointUpL" />
      <Frame label="Dark: head (72%, 84%), 25% wide" bg="#171928" hx={0.72} hy={0.84} hw={0.25} pose="present" ink="#FFFFFF" />
    </div>
  </AbsoluteFill>
);

/** 10 s animated check: pose springs, blinks, Zzz, sweat, wink. Silent (no lip data). */
const DEMO: { t: number; p: PoseName }[] = [
  { t: 0, p: 'idle' }, { t: 0.6, p: 'wave' }, { t: 1.5, p: 'pointUpL' }, { t: 2.3, p: 'count1' }, { t: 2.8, p: 'count2' },
  { t: 3.3, p: 'count3' }, { t: 3.8, p: 'count4' }, { t: 4.5, p: 'present' }, { t: 5.3, p: 'surprise' }, { t: 6.0, p: 'worried' },
  { t: 6.8, p: 'blindfold' }, { t: 7.6, p: 'sleep' }, { t: 8.6, p: 'thumbsUp' }, { t: 9.3, p: 'wink' },
];
export const AdaDemo: React.FC<{ sticker?: boolean; grain?: boolean }> = ({ sticker = true, grain = true }) => {
  const { scale, left, top } = placeAda(1080, 1920, 0.69, 0.78, 0.30);
  return (
    <AbsoluteFill style={{ background: '#F0EEEA' }}>
      <div style={{ position: 'absolute', left, top }}><Ada poses={DEMO} scale={scale} sticker={sticker} /></div>
      {grain && <Grain />}
    </AbsoluteFill>
  );
};
