import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { C, FPS } from './theme';
import { setReel } from './lib/data';
import { BarWipe, Flash, Iris } from './components/fx';
import { GlitchWipe, NEON, NIGHT } from './ai/kit';
import { CodeOpen, Check, You } from './code/Open';
import { MeetCode } from './code/MeetCode';
import { Fundamentals, Apps, Journey, HabitCode, BuildThem } from './code/Build';
import { LaunchCode } from './code/LaunchCode';
import { NotifyAI } from './ai/NotifyAI';
import { End } from './scenes/End';

const EndCode: React.FC = () => <End kicker="The coding track" />;

const SCENES: { from: number; to: number; C: React.FC }[] = [
  { from: 0, to: 9.9, C: CodeOpen },
  { from: 9.9, to: 15.2, C: Check },
  { from: 15.2, to: 19.35, C: You },
  { from: 19.35, to: 22.0, C: MeetCode },
  { from: 22.0, to: 26.2, C: Fundamentals },
  { from: 26.2, to: 30.3, C: Apps },
  { from: 30.3, to: 34.8, C: Journey },
  { from: 34.8, to: 40.2, C: HabitCode },
  { from: 40.2, to: 45.9, C: BuildThem },
  { from: 45.9, to: 49.85, C: LaunchCode },
  { from: 49.85, to: 54.0, C: NotifyAI },
  { from: 54.0, to: 60.1, C: EndCode },
];

export const ReelCode: React.FC = () => {
  setReel('code');
  const t = useCurrentFrame() / FPS;
  return (
    <AbsoluteFill style={{ background: NIGHT, overflow: 'hidden' }}>
      {SCENES.filter((s) => t >= s.from && t < s.to).map((s) => <s.C key={s.from} />)}
      <GlitchWipe mid={9.9} colors={[C.coral, C.violet, NIGHT, NEON]} />
      <Iris mid={15.2} x={960} y={500} color={C.blueDeep} dur={0.3} />
      <Iris mid={19.35} x={1480} y={520} color={C.yellow} dur={0.28} />
      <Iris mid={22.0} x={960} y={450} color={C.blueDeep} dur={0.3} />
      <BarWipe mid={26.2} colors={[NEON, C.blue, C.violet, NIGHT]} />
      <GlitchWipe mid={30.3} colors={[C.yellow, C.blue, C.violet, C.white]} dur={0.3} />
      <BarWipe mid={34.8} colors={[C.yellow, C.white, C.blue, C.blueSoft]} />
      <Iris mid={40.2} x={960} y={600} color={NIGHT} dur={0.32} />
      <Flash at={44.0} dur={0.4} />
      <BarWipe mid={45.9} colors={[C.coral, C.yellow, C.white, C.blue]} angle={10} />
      <BarWipe mid={49.85} colors={[C.blue, C.yellow, C.violet, C.white]} angle={-8} />
      <Iris mid={54.0} x={1260} y={640} color={C.blueDeep} dur={0.3} />
    </AbsoluteFill>
  );
};
