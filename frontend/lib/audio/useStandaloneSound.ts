'use client';

/**
 * Sound preferences for screens outside the (app) route group — the creator
 * portal, /start — where AudioProvider (and so useAudioContext) isn't mounted.
 *
 * Loads the saved preference on mount and persists every change to the same
 * storage key AudioProvider uses, so muting in the creator studio is still
 * muted back in the learner app, and vice versa.
 */

import { useCallback, useEffect, useState } from 'react';
import soundManager, { AUDIO_SETTINGS_STORAGE_KEY, hydrateSoundPreferences } from './soundManager';

function persist() {
  try {
    localStorage.setItem(AUDIO_SETTINGS_STORAGE_KEY, soundManager.exportConfigJson());
  } catch {
    /* storage blocked: the change still applies for this visit */
  }
}

export function useStandaloneSound(): {
  muted: boolean;
  toggleMute: () => void;
  sfxEnabled: boolean;
  setSfxEnabled: (enabled: boolean) => void;
} {
  const [muted, setMuted] = useState(false);
  const [sfxEnabled, setSfx] = useState(true);

  useEffect(() => {
    hydrateSoundPreferences();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMuted(soundManager.getMuted());
    setSfx(soundManager.getSfxEnabled());
  }, []);

  const toggleMute = useCallback(() => {
    const next = !soundManager.getMuted();
    soundManager.mute(next);
    setMuted(next);
    persist();
  }, []);

  const setSfxEnabled = useCallback((enabled: boolean) => {
    soundManager.setSfxEnabled(enabled);
    setSfx(enabled);
    persist();
  }, []);

  return { muted, toggleMute, sfxEnabled, setSfxEnabled };
}
