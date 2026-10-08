import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { C, FPS } from './theme';
import { setReel } from './lib/data';
import { BarWipe, Flash, Iris } from './components/fx';
import { GlitchWipe, NEON, NIGHT } from './ai/kit';
import { Open } from './ai/Open';
import { Relevant, Shortcut } from './ai/Relevant';
import { Meet, Prompt, AgentRun, Strip } from './ai/Skills';
import { Habit, Payoff } from './ai/Payoff';
import { NotifyAI } from './ai/NotifyAI';
import { Launch } from './scenes/Launch';
import { End } from './scenes/End';

const EndAI: React.FC = () => <End kicker="The AI track" />;

const SCENES: { from: number; to: number; C: React.FC }[] = [
  { from: 0, to: 8.3, C: Open },
  { from: 8.3, to: 13.9, C: Relevant },
  { from: 13.9, to: 17.6, C: Shortcut },
  { from: 17.6, to: 20.05, C: Meet },
  { from: 20.05, to: 24.05, C: Prompt },
  { from: 24.05, to: 28.15, C: AgentRun },
  { from: 28.15, to: 33.65, C: Strip },
  { from: 33.65, to: 39.25, C: Habit },
  { from: 39.25, to: 44.0, C: Payoff },
  { from: 44.0, to: 49.85, C: Launch },
  { from: 49.85, to: 54.0, C: NotifyAI },
  { from: 54.0, to: 60.1, C: EndAI },
];

export const ReelAI: React.FC = () => {
  setReel('ai');
  const t = useCurrentFrame() / FPS;
  return (
    <AbsoluteFill style={{ background: NIGHT, overflow: 'hidden' }}>
      {SCENES.filter((s) => t >= s.from && t < s.to).map((s) => <s.C key={s.from} />)}
      <GlitchWipe mid={8.3} />
      <BarWipe mid={13.9} colors={[NEON, C.blue, C.violet, NIGHT]} />
      <Iris mid={17.6} x={1700} y={300} color={C.blueDeep} dur={0.28} />
      <Iris mid={20.05} x={960} y={450} color={NIGHT} dur={0.3} />
      <GlitchWipe mid={24.05} colors={[C.violet, NEON, NIGHT, C.blue]} />
      <GlitchWipe mid={28.15} colors={[NEON, NIGHT, C.blue, C.violet]} dur={0.3} />
      <BarWipe mid={33.65} colors={[C.yellow, C.white, C.blue, C.blueSoft]} />
      <Iris mid={39.25} x={960} y={600} color={NIGHT} dur={0.32} />
      <Flash at={42.0} dur={0.4} />
      <Flash at={44.0} dur={0.45} />
      <BarWipe mid={49.85} colors={[C.blue, C.yellow, C.violet, C.white]} angle={-8} />
      <Iris mid={54.0} x={1260} y={640} color={C.blueDeep} dur={0.3} />
    </AbsoluteFill>
  );
};
