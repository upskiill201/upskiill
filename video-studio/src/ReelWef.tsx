import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { C, FPS } from './theme';
import { setReel } from './lib/data';
import { BarWipe, Flash, Iris } from './components/fx';
import { GlitchWipe, NEON, NIGHT } from './ai/kit';
import { Stat39, Stat59, Ready } from './wef/Stats';
import { MeetWef } from './wef/MeetWef';
import { Learn, Practise, StayRelevant } from './wef/Solution';
import { LaunchWef } from './wef/LaunchWef';
import { EndWef } from './wef/EndWef';

const EndW: React.FC = () => <EndWef kicker="Stay relevant" />;

// 45s: WEF Future of Jobs 2025 → Teyro as the way to stay relevant.
const SCENES: { from: number; to: number; C: React.FC }[] = [
  { from: 0, to: 7.3, C: Stat39 },
  { from: 7.3, to: 12.85, C: Stat59 },
  { from: 12.85, to: 17.25, C: Ready },
  { from: 17.25, to: 19.3, C: MeetWef },
  { from: 19.3, to: 25.1, C: Learn },
  { from: 25.1, to: 29.4, C: Practise },
  { from: 29.4, to: 36.95, C: StayRelevant },
  { from: 36.95, to: 40.0, C: LaunchWef },
  { from: 40.0, to: 45.1, C: EndW },
];

export const ReelWef: React.FC = () => {
  setReel('wef');
  const t = useCurrentFrame() / FPS;
  return (
    <AbsoluteFill style={{ background: NIGHT, overflow: 'hidden' }}>
      {SCENES.filter((s) => t >= s.from && t < s.to).map((s) => <s.C key={s.from} />)}
      <GlitchWipe mid={7.3} colors={[C.coral, C.violet, NIGHT, C.yellow]} />
      <Iris mid={12.85} x={960} y={500} color={NIGHT} dur={0.3} />
      <Iris mid={17.25} x={1700} y={300} color={C.blueDeep} dur={0.28} />
      <Iris mid={19.3} x={960} y={450} color={C.blueDeep} dur={0.3} />
      <BarWipe mid={25.1} colors={[C.yellow, C.white, C.blue, C.violet]} />
      <GlitchWipe mid={29.4} colors={[NEON, C.blue, NIGHT, C.violet]} />
      <BarWipe mid={36.95} colors={[C.coral, C.yellow, C.white, C.blue]} angle={10} />
      <Iris mid={40.0} x={960} y={560} color={C.blueDeep} dur={0.3} />
    </AbsoluteFill>
  );
};
