import React from 'react';
import { Composition } from 'remotion';
import { Showreel } from './Showreel';
import { FPS, H, Q, W } from './lib';

/**
 * "Learn Git, GitHub & GitHub Actions on Teyro" — 45 s motion showreel, 16:9.
 * Own entry point so the other studios' Roots are never touched:
 *   node pipeline/showreel/music.mjs   (soundtrack + beat map)
 *   npx remotion render src/showreel/index.ts GitShowreel out/GitShowreel.mp4
 */
export const ShowreelRoot: React.FC = () => (
  <Composition id="GitShowreel" component={Showreel} durationInFrames={Q.length * FPS} fps={FPS} width={W} height={H} />
);
