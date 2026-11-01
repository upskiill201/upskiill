import React from 'react';
import { Composition } from 'remotion';
import { Intro } from './Intro';
import { FPS, H, Q, W } from './lib';

/**
 * "Meet Teyro" — 80 s motion intro for people new to tech, 16:9.
 *   node pipeline/showreel/music-intro.mjs   (soundtrack + beat map; then loudnorm to public/intro/audio.wav)
 *   npx remotion render src/intro/index.ts TeyroIntro out/TeyroIntro.mp4
 */
export const IntroRoot: React.FC = () => (
  <Composition id="TeyroIntro" component={Intro} durationInFrames={Q.length * FPS} fps={FPS} width={W} height={H} />
);
