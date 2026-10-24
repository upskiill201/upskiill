import React from 'react';
import { Composition } from 'remotion';
import { DEMO_DURATION, KitDemo } from './dev/KitDemo';
import { HostSheet } from './dev/HostSheet';
import { VIDEOS } from './videos';

/**
 * Motion Explainer compositions (separate entry point: src/motion/index.ts), so the
 * /make-videos project (src/index.ts) is never touched.
 *   npx remotion render src/motion/index.ts <CompId> out/<CompId>.mp4
 */
export const MotionRoot: React.FC = () => (
  <>
    <Composition id="M-HostSheet" component={HostSheet} durationInFrames={1} fps={30} width={1080 * 4} height={1920} />
    <Composition id="M-KitDemo" component={KitDemo} durationInFrames={DEMO_DURATION} fps={30} width={1080} height={1920} defaultProps={{ look: 'blueprint' as const }} />
    <Composition id="M-KitDemo-night" component={KitDemo} durationInFrames={DEMO_DURATION} fps={30} width={1080} height={1920} defaultProps={{ look: 'night' as const }} />
    <Composition id="M-KitDemo-neon" component={KitDemo} durationInFrames={DEMO_DURATION} fps={30} width={1080} height={1920} defaultProps={{ look: 'neon' as const }} />
    <Composition id="M-KitDemo-lab" component={KitDemo} durationInFrames={DEMO_DURATION} fps={30} width={1080} height={1920} defaultProps={{ look: 'lab' as const }} />
    {VIDEOS.map((v) => <Composition key={v.id} id={v.id} component={v.component} durationInFrames={v.durationInFrames} fps={30} width={1080} height={1920} />)}
  </>
);
