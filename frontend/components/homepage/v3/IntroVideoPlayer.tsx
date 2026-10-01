'use client';

import { useState } from 'react';
import { Play } from 'lucide-react';
import v from './IntroVideo.module.css';

/**
 * Click-to-play: the page loads one thumbnail, not YouTube's player, until the
 * visitor presses play. The embed uses youtube-nocookie and related videos off.
 */
export default function IntroVideoPlayer({ videoId }: { videoId: string }) {
  const [playing, setPlaying] = useState(false);
  const [thumb, setThumb] = useState('maxresdefault');

  return (
    <div className={v.frame}>
      <div className={v.screen}>
        {playing ? (
          <iframe
            className={v.iframe}
            src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
            title="Teyro introduction video"
            allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
            allowFullScreen
          />
        ) : (
          <button type="button" className={v.poster} onClick={() => setPlaying(true)} aria-label="Play the Teyro introduction video">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`https://i.ytimg.com/vi/${videoId}/${thumb}.jpg`}
              alt=""
              className={v.thumb}
              loading="lazy"
              onError={() => thumb !== 'hqdefault' && setThumb('hqdefault')}
              // YouTube serves a 120px grey placeholder (not a 404) when maxres is missing.
              onLoad={(e) => {
                if (thumb === 'maxresdefault' && e.currentTarget.naturalWidth <= 200) setThumb('hqdefault');
              }}
            />
            <span className={v.play} aria-hidden="true">
              <Play size={34} strokeWidth={3} fill="currentColor" />
            </span>
          </button>
        )}
      </div>
    </div>
  );
}
