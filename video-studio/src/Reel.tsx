import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { C, FPS } from './theme';
import { Hook } from './scenes/Hook';
import { Logo } from './scenes/Logo';
import { Minutes } from './scenes/Minutes';
import { Code } from './scenes/Code';
import { Agents } from './scenes/Agents';
import { Game } from './scenes/Game';
import { Friends } from './scenes/Friends';
import { Ahead } from './scenes/Ahead';
import { Launch } from './scenes/Launch';
import { Notify } from './scenes/Notify';
import { End } from './scenes/End';
import { BarWipe, Flash, Iris } from './components/fx';
import { setReel } from './lib/data';

// Every cut sits on the 120 BPM grid (or on the word it belongs to) and is hidden by a transition.
const SCENES: { from: number; to: number; C: React.FC }[] = [
  { from: 0, to: 7.45, C: Hook },
  { from: 7.45, to: 10.0, C: Logo },
  { from: 10.0, to: 16.62, C: Minutes },
  { from: 16.62, to: 21.5, C: Code },
  { from: 21.5, to: 28.0, C: Agents },
  { from: 28.0, to: 34.6, C: Game },
  { from: 34.6, to: 38.45, C: Friends },
  { from: 38.45, to: 44.0, C: Ahead },
  { from: 44.0, to: 49.85, C: Launch },
  { from: 49.85, to: 54.0, C: Notify },
  { from: 54.0, to: 60.1, C: End },
];

export const Reel: React.FC = () => {
  setReel('launch');
  const t = useCurrentFrame() / FPS;
  return (
    <AbsoluteFill style={{ background: C.ink, overflow: 'hidden' }}>
      {SCENES.filter((s) => t >= s.from && t < s.to).map((s) => <s.C key={s.from} />)}
      <Iris mid={7.45} color={C.blueDeep} dur={0.3} />
      <BarWipe mid={10.0} />
      <Iris mid={16.62} x={700} y={300} color={C.violet} dur={0.32} />
      <Iris mid={21.5} x={1420} y={560} color={C.ink} dur={0.34} />
      <Flash at={28.0} dur={0.4} />
      <BarWipe mid={34.6} colors={[C.coral, C.yellow, C.white, C.orange]} angle={12} />
      <Iris mid={38.45} x={960} y={500} color={C.ink} dur={0.36} />
      <Flash at={44.0} dur={0.45} />
      <BarWipe mid={49.85} colors={[C.blue, C.yellow, C.violet, C.white]} angle={-8} />
      <Iris mid={54.0} x={1260} y={640} color={C.blueDeep} dur={0.3} />
    </AbsoluteFill>
  );
};
