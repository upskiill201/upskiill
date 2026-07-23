'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import soundManager from '@/lib/audio/soundManager';
import { useAudio } from '@/lib/audio/useAudio';

/**
 * BackgroundMusicManager
 *
 * Automatically manages seamless background music (UI_BG_MUSIC.mp3) playback
 * across Dashboard, Course Browsing, Lesson Player (Start, Apply, Reflect, Deepen screens),
 * Onboarding, and Audio Settings.
 *
 * Handles browser autoplay policies cleanly via first-gesture listener.
 */
export default function BackgroundMusicManager() {
  const pathname = usePathname();
  const { isMusicEnabled, isMuted } = useAudio();
  const hasUserInteracted = useRef(false);

  // Check if current route should play background music
  const isAllowedRoute =
    pathname.startsWith('/dashboard') ||
    pathname.startsWith('/learn') ||
    pathname.startsWith('/onboarding') ||
    pathname.startsWith('/audio-settings');

  useEffect(() => {
    if (!isAllowedRoute || !isMusicEnabled || isMuted) {
      soundManager.fadeOut('BACKGROUND_MUSIC', 0.8);
      return;
    }

    const startMusic = () => {
      soundManager.playLoop('BACKGROUND_MUSIC');
    };

    // If user has already interacted, start music immediately
    if (hasUserInteracted.current) {
      startMusic();
    } else {
      // First interaction handler for browser autoplay policies
      const handleFirstInteraction = () => {
        hasUserInteracted.current = true;
        startMusic();
        window.removeEventListener('click', handleFirstInteraction);
        window.removeEventListener('touchstart', handleFirstInteraction);
        window.removeEventListener('keydown', handleFirstInteraction);
      };

      window.addEventListener('click', handleFirstInteraction);
      window.addEventListener('touchstart', handleFirstInteraction);
      window.addEventListener('keydown', handleFirstInteraction);

      return () => {
        window.removeEventListener('click', handleFirstInteraction);
        window.removeEventListener('touchstart', handleFirstInteraction);
        window.removeEventListener('keydown', handleFirstInteraction);
      };
    }
  }, [pathname, isAllowedRoute, isMusicEnabled, isMuted]);

  return null;
}
