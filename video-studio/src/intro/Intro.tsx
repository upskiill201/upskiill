import React from 'react';
import { AbsoluteFill, Audio, staticFile, useCurrentFrame } from 'remotion';
import { FPS, kick } from './lib';
import { Finish } from '../showreel/fx';
import { SHook, SStat, SStory, STurn } from './a1-problem';
import { SDrop, STracks } from './a2-meet';
import { SReasons } from './a3-reasons';
import { SBack, SComplete, SEnd, SQuote } from './a4-end';

/** Scenes run on absolute time so every cue in cues.json means the same second everywhere. */
const SCENES: [number, number, React.FC<{ t: number }>][] = [
  [0, 4, SHook],
  [4, 10, SStory],
  [10, 15, SStat],
  [15, 20, STurn],
  [20, 24, SDrop],
  [24, 28, STracks],
  [28, 62, SReasons],
  [62, 66, SBack],
  [66, 70, SComplete],
  [70, 72, SQuote],
  [72, 80, SEnd],
];

export const Intro: React.FC = () => {
  const t = useCurrentFrame() / FPS;
  const dark = t >= 70 && t < 72;
  const pulse = 1 + kick(t, 11) * 0.006;
  return (
    <AbsoluteFill style={{ background: '#050817' }}>
      <AbsoluteFill style={{ transform: `scale(${pulse})` }}>
        {SCENES.filter(([a, b]) => t >= a && t < b).map(([a, , S]) => <S key={a} t={t} />)}
      </AbsoluteFill>
      <Finish t={t} dark={dark} />
      <Audio src={staticFile('intro/audio.wav')} />
    </AbsoluteFill>
  );
};
