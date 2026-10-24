import React from 'react';
import { Audio, Sequence, staticFile, useVideoConfig } from 'remotion';

/**
 * Audio layer (§4): voice + ducked ambient bed (both prepared by pipeline/motion/*) + SFX cues.
 * SFX library: public/motion/sfx/<name>.mp3, generated once with ElevenLabs by pipeline/motion/sfx.mjs.
 */
export const SFX_NAMES = ['tick', 'pop', 'whoosh', 'riser', 'boom', 'error', 'success', 'count', 'type', 'shatter', 'swoosh', 'glitch', 'chime'] as const;
export type SfxName = (typeof SFX_NAMES)[number];
export type SfxCue = { t: number; s: SfxName; v?: number };

/** Default per-sound levels relative to the voice (the voice always wins). */
const LEVEL: Record<SfxName, number> = { tick: 0.35, pop: 0.4, whoosh: 0.3, riser: 0.32, boom: 0.55, error: 0.35, success: 0.38, count: 0.25, type: 0.25, shatter: 0.45, swoosh: 0.28, glitch: 0.3, chime: 0.35 };

export const SoundLayer: React.FC<{ slug: string; sfx: SfxCue[]; bed?: boolean; bedVolume?: number }> = ({ slug, sfx, bed = true, bedVolume = 1 }) => {
  const { fps } = useVideoConfig();
  return (
    <>
      <Audio src={staticFile(`motion/videos/${slug}/vo.wav`)} />
      {bed && <Audio src={staticFile(`motion/videos/${slug}/bed.wav`)} volume={bedVolume} />}
      {sfx.map((c, i) => (
        <Sequence key={i} from={Math.max(0, Math.round(c.t * fps))} layout="none">
          <Audio src={staticFile(`motion/sfx/${c.s}.mp3`)} volume={(c.v ?? 1) * LEVEL[c.s]} />
        </Sequence>
      ))}
    </>
  );
};

/** Standard cue pack for chapter cards / big statements: riser into it, boom on it. */
export const revealCues = (at: number): SfxCue[] => [{ t: Math.max(0, at - 0.75), s: 'riser' }, { t: at, s: 'boom' }];
/** Tick on every pop-in time in the list. */
export const ticks = (times: number[], s: SfxName = 'tick'): SfxCue[] => times.map((t) => ({ t, s }));
