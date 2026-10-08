import React from 'react';
import { AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { Ada, type PoseName } from '../host/Ada';
import { placeAda } from '../host/AdaSheet';
import { Grain } from '../host/Grain';
import { H, P, W, loadFonts } from './tokens';
import { lerp, prog, spr } from './anim';
import type { VO } from './vo';

loadFonts();

/** Ada placements measured from the reference host (§4.3): [headX, headY, headWidth] as fractions of the frame. */
const MODES = {
  hook: [0.69, 0.78, 0.3],
  items: [0.85, 0.91, 0.18],
  act: [0.77, 0.81, 0.25],
  dark: [0.72, 0.84, 0.25],
  offscreen: [0.85, 1.25, 0.18],
} as const;
export type AdaMode = keyof typeof MODES;

export type Sfx = { t: number; name: string; vol?: number };

/**
 * The frame every explainer video sits in: background (paper, optionally flipping to Dark Tech at
 * `darkFrom`), the graphics (children), Ada at the measured placements with springy moves between
 * them, the voice-over, SFX cues and the scene-wide grain.
 */
export const Stage: React.FC<{
  slug: string; vo: VO;
  modes: { t: number; mode: AdaMode }[];
  poses: { t: number; p: PoseName }[];
  sfx?: Sfx[];
  darkFrom?: number;
  children: React.ReactNode;
}> = ({ slug, vo, modes, poses, sfx = [], darkFrom, children }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;

  let i = 0;
  for (let k = 0; k < modes.length; k++) if (modes[k].t <= t) i = k;
  const cur = MODES[modes[i].mode], prev = MODES[modes[Math.max(0, i - 1)].mode];
  const k = i === 0 ? 1 : spr(frame, fps, modes[i].t, { damping: 15, stiffness: 120, mass: 1 });
  const [hx, hy, hw] = [0, 1, 2].map((j) => lerp(prev[j], cur[j], k));
  const { scale, left, top } = placeAda(W, H, hx, hy, hw);

  const dark = darkFrom !== undefined ? prog(t, darkFrom, darkFrom + 0.12) : 0;

  return (
    <AbsoluteFill style={{ background: P.paper, overflow: 'hidden' }}>
      {dark > 0 && (
        <AbsoluteFill style={{ opacity: dark, background: `radial-gradient(900px 700px at 0% 100%, ${P.pinkGlow}33, transparent 60%), radial-gradient(900px 800px at 100% 0%, ${P.blue}33, transparent 60%), ${P.navy}` }} />
      )}
      {children}
      <div style={{ position: 'absolute', left, top }}>
        <Ada poses={poses} lip={vo.lip} scale={scale} />
      </div>
      <Grain opacity={dark > 0.5 ? 0.05 : 0.07} />
      <Audio src={staticFile(`videos/${slug}/vo.wav`)} />
      {sfx.map((s, j) => (
        <Sequence key={j} from={Math.max(0, Math.round(s.t * fps))} durationInFrames={Math.round(3 * fps)}>
          <Audio src={staticFile(`audio/sfx/${s.name}.mp3`)} volume={s.vol ?? 0.3} />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};
