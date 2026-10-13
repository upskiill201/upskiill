/**
 * TEMPLATE for one Motion Explainer. Copy this folder to src/motion/videos/<slug>/, rename the
 * component, import its vo.json, and register it in src/motion/videos/index.ts.
 *
 * The skeleton follows the reference structure (docs/MOTION_EXPLAINER_REFERENCE_ANALYSIS.md §2.4):
 *   title (frame 0 = cover) → cold open → mental model → chapters (problem → fix) → Teyro bridge
 *   → more chapters → twist → recap → punchline → Teyro outro → loop back to frame 0.
 * Rules that the QA gate checks: something new every ≤ 0.7 s, no still > 2.5 s, no hard cuts.
 * Every visual event sits on its cue word: cue(vo, 'word', { after }) (§2.7 "show the verb").
 *
 * This file is NOT registered (it imports a vo.json that only exists after pipeline/motion/voice.mjs).
 */
import React from 'react';
import { AbsoluteFill } from 'remotion';
import {
  At, Backdrop, Captions, ChapterTag, Host, HudMeter, LoopBack, MotionProvider, Punchline, Recap, SfxCue, SoundLayer,
  TeyroBridge, TeyroOutro, TitleCard, VO, World, camAt, cue, line, loadMotionFonts, revealCues, ticks, useMotion, Z,
} from '../../kit';
// import voJson from './vo.json';
// import script from './script.json';
const voJson = {} as VO; // ← replace with the import above
const SLUG = 'm0-example';

const Scene: React.FC = () => {
  loadMotionFonts();
  const { vo, t } = useMotion();
  const L = (id: string) => line(vo, id);
  const open = L('open'), br = L('bridge'), pu = L('punch'), cta = L('cta');

  // one world, one camera (§3.7): pan along the world, pull back at chapter boundaries and the recap
  const cam = camAt([
    { t: 0, x: 0, y: 0, z: 0.55 },           // title: the whole world, small (the "miniature")
    { t: open.start, x: 0, y: 0, z: 1 },     // push in for the cold open
    // { t: cue(vo, 'token?'), x: 600, y: 0 }, …
  ], t);

  // the HUD's live values (§2.5): change them on cue words
  const tokens = [{ t: 0, v: 0 } /*, { t: cue(vo, 'million'), v: 1_000_000 } */];
  const bill = [{ t: 0, v: 0 }];
  const chapters = vo.lines.filter((l, i) => l.chapter && l.chapter !== '00' && l.chapter !== 'bridge' && l.chapter !== 'end' && l.chapter !== vo.lines[i - 1]?.chapter)
    .map((l) => ({ t: l.start, text: l.chapter! }));

  const world = (
    <World cam={cam}>
      {/* the hero object lives here for the whole video, e.g. a road, a layer stack, a diagram inside <Panel> */}
      <At x={0} y={0}><div /></At>
    </World>
  );

  return (
    <AbsoluteFill>
      <Backdrop cam={cam} />
      {world}
      <HudMeter
        lamps={[{ label: 'Input', color: '#6FA8FF', on: [] }, { label: 'Output', color: '#F07A5A', on: [] }]}
        counters={[{ label: 'Tokens', keys: tokens }, { label: 'Bill', keys: bill, format: (v) => `$${v.toFixed(2)}`, align: 'right' }]}
        pulseTeyro={[br.start]}
      />
      <ChapterTag chapters={chapters} />
      <TitleCard title={['Tokens,']} kicker="EXPLAINED" until={open.start}>{/* miniature = the world at z 0.55 behind it */}</TitleCard>

      {/* chapters: one block per chapter, each on its cue words */}

      <TeyroBridge at={br.start} until={br.end} line="Learn coding and AI, a few minutes a day" chips={['Coding', 'AI', 'A few minutes a day']} />
      <At x={Z.sideCx} y={900}><Recap items={[/* { text: 'Tokens: chunks of text', at: cue(vo, 'chunks', { after: … }) } */]} width={Z.sideW} /></At>
      <Punchline at={pu.start} until={cta.start} lead="You're not paying for" strike={{ word: 'answers', at: cue(vo, 'answers', { after: pu.start }) }} payoff="tokens." payoffAt={cue(vo, 'tokens', { after: pu.start })} />
      <TeyroOutro at={cta.start} until={vo.duration - 0.5} headline="The fun way to finish learning coding and AI." ask="Search Teyro" />
      <LoopBack from={vo.duration - 0.5}><div>{/* the opening composition again, so the replay is seamless */}</div></LoopBack>

      <Host on={[[open.start, open.end + 2]]} poses={[{ t: 0, p: 'wave' }, { t: open.start + 0.6, p: 'explain' }]} />
      <Captions hideBetween={[[br.start, br.end]]} />
    </AbsoluteFill>
  );
};

const sfx = (vo: VO): SfxCue[] => [
  ...revealCues(0.05),                       // boom on the title
  ...ticks([/* every pop-in time */]),
  // { t: cue(vo, 'cut'), s: 'shatter' }, { t: cue(vo, "can't"), s: 'error' }, { t: line(vo, 'bridge').start, s: 'chime' }, …
];

export const Template: React.FC = () => (
  <MotionProvider look="night" vo={voJson}>
    <Scene />
    <SoundLayer slug={SLUG} sfx={sfx(voJson)} />
  </MotionProvider>
);
export const TEMPLATE_DURATION = Math.ceil(((voJson.duration ?? 10) + 0.2) * 30);
