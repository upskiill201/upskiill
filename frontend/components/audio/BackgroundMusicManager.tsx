'use client';

import { useEffect } from 'react';
import soundManager from '@/lib/audio/soundManager';

/**
 * BackgroundMusicManager
 *
 * Ensures background music is stopped per user request.
 */
export default function BackgroundMusicManager() {
  useEffect(() => {
    soundManager.fadeOut('BACKGROUND_MUSIC', 0.1);
  }, []);

  return null;
}
