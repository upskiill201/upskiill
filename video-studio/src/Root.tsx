import React from 'react';
import { AbsoluteFill, Composition } from 'remotion';
import { Ada } from './components/Ada';
import { Reel } from './Reel';
import { ReelAI } from './ReelAI';
import { ReelCode } from './ReelCode';
import { ReelIG } from './ReelIG';
import { ReelWef } from './ReelWef';
import { C, FPS, H, W } from './theme';
import { AdaDemo, AdaPlacement, AdaPoseSheet } from './host/AdaSheet';
import { L1, L1_DURATION } from './videos/l1-rereading/L1';
import { L2, L2_DURATION } from './videos/l2-habit/L2';
import { A1, A1_DURATION } from './videos/a1-ai-slower/A1';
import { A2, A2_DURATION } from './videos/a2-ai-security/A2';
import { C1, C1_DURATION } from './videos/c1-debugging/C1';
import { T1, T1_DURATION } from './videos/t1-course-finish/T1';
import { T2, T2_DURATION } from './videos/t2-quitting-cost/T2';
import { C4, C4_DURATION } from './videos/c4-vibe-gambling/C4';
import { C12, C12_DURATION } from './videos/c12-council/C12';
import { A9, A9_DURATION } from './videos/a9-math-release/A9';
import { A10, A10_DURATION } from './videos/a10-claude-mods/A10';
import { C13, C13_DURATION } from './videos/c13-tap-to-pay/C13';
import { C3, C3_DURATION } from './videos/c3-git-undo/C3';
import { C6, C6_DURATION } from './videos/c6-like-button/C6';

const AdaTest: React.FC = () => (
  <AbsoluteFill style={{ background: C.blue, flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-around' }}>
    {(['wave', 'shrug', 'pointR', 'cheer'] as const).map((p) => (
      <div key={p} style={{ width: 440, height: 760, overflow: 'hidden' }}>
        <Ada poses={[{ t: 0, p }]} scale={0.75} />
      </div>
    ))}
  </AbsoluteFill>
);

export const Root: React.FC = () => (
  <>
    <Composition id="Reel" component={Reel} durationInFrames={60 * FPS} fps={FPS} width={W} height={H} />
    <Composition id="ReelAI" component={ReelAI} durationInFrames={60 * FPS} fps={FPS} width={W} height={H} />
    <Composition id="ReelCode" component={ReelCode} durationInFrames={60 * FPS} fps={FPS} width={W} height={H} />
    <Composition id="ReelIG" component={ReelIG} durationInFrames={60 * FPS} fps={FPS} width={1080} height={1920} />
    <Composition id="ReelWef" component={ReelWef} durationInFrames={45 * FPS} fps={FPS} width={W} height={H} />
    <Composition id="AdaTest" component={AdaTest} durationInFrames={600} fps={FPS} width={W} height={H} />
    {/* Social explainer format (docs/SOCIAL_VIDEO_REFERENCE_ANALYSIS.md): 1080×1920 @ 30 fps */}
    <Composition id="AdaPoseSheet" component={AdaPoseSheet} durationInFrames={1} fps={30} width={1080 * 2} height={1920} />
    <Composition id="AdaPlacement" component={AdaPlacement} durationInFrames={1} fps={30} width={1920} height={1080} />
    <Composition id="AdaDemo" component={AdaDemo} durationInFrames={300} fps={30} width={1080} height={1920} />
    {/* Explainer videos: src/videos/<slug>/ */}
    <Composition id="L1-rereading" component={L1} durationInFrames={L1_DURATION} fps={30} width={1080} height={1920} />
    <Composition id="L2-habit" component={L2} durationInFrames={L2_DURATION} fps={30} width={1080} height={1920} />
    <Composition id="A1-ai-slower" component={A1} durationInFrames={A1_DURATION} fps={30} width={1080} height={1920} />
    <Composition id="A2-ai-security" component={A2} durationInFrames={A2_DURATION} fps={30} width={1080} height={1920} />
    <Composition id="C1-debugging" component={C1} durationInFrames={C1_DURATION} fps={30} width={1080} height={1920} />
    <Composition id="T1-course-finish" component={T1} durationInFrames={T1_DURATION} fps={30} width={1080} height={1920} />
    <Composition id="T2-quitting-cost" component={T2} durationInFrames={T2_DURATION} fps={30} width={1080} height={1920} />
    <Composition id="C4-vibe-gambling" component={C4} durationInFrames={C4_DURATION} fps={30} width={1080} height={1920} />
    <Composition id="C3-git-undo" component={C3} durationInFrames={C3_DURATION} fps={30} width={1080} height={1920} />
    <Composition id="C6-like-button" component={C6} durationInFrames={C6_DURATION} fps={30} width={1080} height={1920} />
    <Composition id="C12-council" component={C12} durationInFrames={C12_DURATION} fps={30} width={1080} height={1920} />
    <Composition id="A9-math-release" component={A9} durationInFrames={A9_DURATION} fps={30} width={1080} height={1920} />
    <Composition id="A10-claude-mods" component={A10} durationInFrames={A10_DURATION} fps={30} width={1080} height={1920} />
    <Composition id="C13-tap-to-pay" component={C13} durationInFrames={C13_DURATION} fps={30} width={1080} height={1920} />
  </>
);
