import React from 'react';
import { AbsoluteFill, Audio, useCurrentFrame } from 'remotion';
import { FPS, img, kick } from './lib';
import { Finish } from './fx';
import { SGraph, SInit } from './s1-git';
import { SActions, SGitHub } from './s2-github';
import { SCourse, SDrop } from './s3-teyro';
import { SApply, SPath, SPhases } from './s4-product';
import { SGame } from './s5-game';
import { SEnd, SOutcome } from './s6-end';

/** Scenes run on absolute time so every cue in cues.json means the same second everywhere. */
const SCENES: [number, number, React.FC<{ t: number }>][] = [
  [0, 4, SInit],
  [4, 8, SGraph],
  [8, 12, SGitHub],
  [12, 16, SActions],
  [16, 18, SDrop],
  [18, 20, SCourse],
  [20, 22, SPath],
  [22, 24, SPhases],
  [24, 28, SApply],
  [28, 34, SGame],
  [34, 40, SOutcome],
  [40, 45, SEnd],
];

export const Showreel: React.FC = () => {
  const t = useCurrentFrame() / FPS;
  const dark = t < 16 || (t >= 34 && t < 40);
  // the whole frame breathes with the kick
  const pulse = 1 + kick(t, 11) * 0.007;
  return (
    <AbsoluteFill style={{ background: '#050817' }}>
      <AbsoluteFill style={{ transform: `scale(${pulse})` }}>
        {SCENES.filter(([a, b]) => t >= a && t < b).map(([a, , S]) => <S key={a} t={t} />)}
      </AbsoluteFill>
      <Finish t={t} dark={dark} />
      <Audio src={img('audio.wav')} />
    </AbsoluteFill>
  );
};
