/**
 * One part of a long imported video plays only its clip: it opens at the
 * clip's start, can't be scrubbed before it, and pauses and counts as
 * watched at the clip's end — which is what unlocks Continue.
 */

import { fireEvent, render } from '@testing-library/react';
import { LearnStep } from '../steps/LearnStep';

jest.mock('../code/CodeBlock', () => ({ CodeBlock: () => null }));
jest.mock('../TeySays', () => ({ TeySays: () => null }));
jest.mock('../Lesson.module.css', () => ({}));

function renderVideo(card: { startSec?: number; endSec?: number }, onMediaEnded = jest.fn()) {
  const { container } = render(
    <LearnStep
      title="Deep Dive (Part 2 of 3)"
      card={{ kind: 'video', url: 'https://cdn.example/long.mp4', ...card }}
      index={1}
      total={4}
      points={[]}
      onMediaEnded={onMediaEnded}
    />,
  );
  const video = container.querySelector('video') as HTMLVideoElement;
  // jsdom has no media playback: give the element a settable clock.
  let t = 0;
  let paused = false;
  Object.defineProperty(video, 'currentTime', { get: () => t, set: (v: number) => (t = v), configurable: true });
  Object.defineProperty(video, 'paused', { get: () => paused, configurable: true });
  video.pause = jest.fn(() => {
    paused = true;
  });
  return { video, onMediaEnded, setTime: (v: number) => (t = v) };
}

describe('LearnStep clip playback', () => {
  it('opens a clip at its start', () => {
    const { video } = renderVideo({ startSec: 600, endSec: 1200 });
    expect(video.getAttribute('src')).toBe('https://cdn.example/long.mp4#t=600');
    fireEvent.loadedMetadata(video);
    expect(video.currentTime).toBe(600);
  });

  it('snaps a scrub before the start back to it', () => {
    const { video, setTime } = renderVideo({ startSec: 600, endSec: 1200 });
    setTime(30);
    fireEvent.seeked(video);
    expect(video.currentTime).toBe(600);
  });

  it('pauses at the end of the clip and counts it as watched', () => {
    const { video, setTime, onMediaEnded } = renderVideo({ startSec: 600, endSec: 1200 });
    setTime(900);
    fireEvent.timeUpdate(video);
    expect(onMediaEnded).not.toHaveBeenCalled();
    setTime(1199.9);
    fireEvent.timeUpdate(video);
    expect(video.pause).toHaveBeenCalled();
    expect(onMediaEnded).toHaveBeenCalledTimes(1);
  });

  it('leaves a whole-file video alone', () => {
    const { video, setTime, onMediaEnded } = renderVideo({});
    expect(video.getAttribute('src')).toBe('https://cdn.example/long.mp4#t=0.1');
    setTime(5000);
    fireEvent.timeUpdate(video);
    expect(onMediaEnded).not.toHaveBeenCalled();
  });
});
