import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { C, FPS } from './theme';
import { setReel } from './lib/data';
import { BarWipe, Flash, Iris } from './components/fx';
import { GlitchWipe, NEON, NIGHT } from './ai/kit';
import { VOpen, VRelevant, VShortcut, VMeet } from './ig/A';
import { VPrompt, VAgent, VStrip, VHabit, VPayoff, VLaunch, VNotify, VEnd } from './ig/B';

// Instagram Reel cut of the AI-track film (1080×1920), same VO/music timeline as ReelAI.
const SCENES: { from: number; to: number; C: React.FC }[] = [
  { from: 0, to: 8.3, C: VOpen },
  { from: 8.3, to: 13.9, C: VRelevant },
  { from: 13.9, to: 17.6, C: VShortcut },
  { from: 17.6, to: 20.05, C: VMeet },
  { from: 20.05, to: 24.05, C: VPrompt },
  { from: 24.05, to: 28.15, C: VAgent },
  { from: 28.15, to: 33.65, C: VStrip },
  { from: 33.65, to: 39.25, C: VHabit },
  { from: 39.25, to: 44.0, C: VPayoff },
  { from: 44.0, to: 49.85, C: VLaunch },
  { from: 49.85, to: 54.0, C: VNotify },
  { from: 54.0, to: 60.1, C: VEnd },
];

export const ReelIG: React.FC = () => {
  setReel('ai');
  const t = useCurrentFrame() / FPS;
  return (
    <AbsoluteFill style={{ background: NIGHT, overflow: 'hidden' }}>
      {SCENES.filter((s) => t >= s.from && t < s.to).map((s) => <s.C key={s.from} />)}
      <GlitchWipe mid={8.3} />
      <BarWipe mid={13.9} colors={[NEON, C.blue, C.violet, NIGHT]} />
      <Iris mid={17.6} x={920} y={580} color={C.blueDeep} dur={0.28} />
      <Iris mid={20.05} x={540} y={860} color={NIGHT} dur={0.3} />
      <GlitchWipe mid={24.05} colors={[C.violet, NEON, NIGHT, C.blue]} />
      <GlitchWipe mid={28.15} colors={[NEON, NIGHT, C.blue, C.violet]} dur={0.3} />
      <BarWipe mid={33.65} colors={[C.yellow, C.white, C.blue, C.blueSoft]} />
      <Iris mid={39.25} x={540} y={1300} color={NIGHT} dur={0.32} />
      <Flash at={42.0} dur={0.4} />
      <Flash at={44.0} dur={0.45} />
      <BarWipe mid={49.85} colors={[C.blue, C.yellow, C.violet, C.white]} angle={-8} />
      <Iris mid={54.0} x={540} y={900} color={C.blueDeep} dur={0.3} />
    </AbsoluteFill>
  );
};
