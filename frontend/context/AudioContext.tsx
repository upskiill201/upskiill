'use client';

import React, { createContext, useContext, useEffect, useState, useCallback, useMemo } from 'react';
import soundManager, { AUDIO_SETTINGS_STORAGE_KEY, CategoryVolumes } from '@/lib/audio/soundManager';
import { SoundId, SoundConfig } from '@/lib/audio/soundRegistry';
import { AppAudioEvent, emitAudioEvent } from '@/lib/audio/audioEvents';

// Re-exported from soundManager rather than declared here, so the surfaces
// outside this provider that hydrate the same preferences (see
// hydrateSoundPreferences — /start is the first) cannot drift onto a
// different key.
const STORAGE_KEY = AUDIO_SETTINGS_STORAGE_KEY;

export interface AudioContextType {
  isMuted: boolean;
  isSfxEnabled: boolean;
  isMusicEnabled: boolean;
  volumes: CategoryVolumes;
  registry: Record<SoundId, SoundConfig>;
  toggleMute: () => void;
  setSfxEnabled: (enabled: boolean) => void;
  setMusicEnabled: (enabled: boolean) => void;
  setVolume: (category: keyof CategoryVolumes, value: number) => void;
  updateSoundConfig: (id: SoundId, updates: Partial<SoundConfig>) => void;
  play: (id: SoundId, override?: Partial<SoundConfig>) => Promise<void>;
  emitEvent: (event: AppAudioEvent) => Promise<void>;
  stopAll: () => void;
  resetToDefault: () => void;
  exportConfigJson: () => string;
  importConfigJson: (json: string) => boolean;
}

const AudioContext = createContext<AudioContextType | null>(null);

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMuted, setIsMuted] = useState(false);
  const [isSfxEnabled, setIsSfxEnabled] = useState(true);
  const [isMusicEnabled, setIsMusicEnabled] = useState(true);
  const [volumes, setVolumesState] = useState<CategoryVolumes>(soundManager.getVolumes());
  const [registry, setRegistryState] = useState<Record<SoundId, SoundConfig>>(soundManager.getRegistry());

  // Restore audio settings from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        soundManager.importConfigJson(saved);
        setIsMuted(soundManager.getMuted());
        setIsSfxEnabled(soundManager.getSfxEnabled());
        setIsMusicEnabled(soundManager.getMusicEnabled());
        setVolumesState(soundManager.getVolumes());
        setRegistryState(soundManager.getRegistry());
      }
    } catch (e) {
      console.warn('[AudioContext] Failed to load saved audio preferences:', e);
    }

    // Preload UI sounds on first user interaction
    const handleFirstInteraction = () => {
      void soundManager.preload();
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
    };

    window.addEventListener('click', handleFirstInteraction);
    window.addEventListener('keydown', handleFirstInteraction);
    window.addEventListener('touchstart', handleFirstInteraction);

    return () => {
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
    };
  }, []);

  const saveSettings = useCallback(() => {
    try {
      const json = soundManager.exportConfigJson();
      localStorage.setItem(STORAGE_KEY, json);
    } catch {}
  }, []);

  const toggleMute = useCallback(() => {
    const nextMuted = !isMuted;
    soundManager.mute(nextMuted);
    setIsMuted(nextMuted);
    saveSettings();
  }, [isMuted, saveSettings]);

  const setSfxEnabled = useCallback((enabled: boolean) => {
    soundManager.setSfxEnabled(enabled);
    setIsSfxEnabled(enabled);
    saveSettings();
  }, [saveSettings]);

  const setMusicEnabled = useCallback((enabled: boolean) => {
    soundManager.setMusicEnabled(enabled);
    setIsMusicEnabled(enabled);
    saveSettings();
  }, [saveSettings]);

  const setVolume = useCallback((category: keyof CategoryVolumes, value: number) => {
    soundManager.setVolume(category, value);
    setVolumesState(soundManager.getVolumes());
    saveSettings();
  }, [saveSettings]);

  const updateSoundConfig = useCallback((id: SoundId, updates: Partial<SoundConfig>) => {
    soundManager.updateSoundConfig(id, updates);
    setRegistryState(soundManager.getRegistry());
    saveSettings();
  }, [saveSettings]);

  const play = useCallback(async (id: SoundId, override?: Partial<SoundConfig>) => {
    await soundManager.play(id, override);
  }, []);

  const emitEvent = useCallback(async (event: AppAudioEvent) => {
    await emitAudioEvent(event);
  }, []);

  const stopAll = useCallback(() => {
    soundManager.stopAll();
  }, []);

  const resetToDefault = useCallback(() => {
    soundManager.resetRegistry();
    soundManager.mute(false);
    soundManager.setSfxEnabled(true);
    soundManager.setMusicEnabled(true);
    setIsMuted(false);
    setIsSfxEnabled(true);
    setIsMusicEnabled(true);
    setVolumesState(soundManager.getVolumes());
    setRegistryState(soundManager.getRegistry());
    saveSettings();
  }, [saveSettings]);

  const exportConfigJson = useCallback(() => {
    return soundManager.exportConfigJson();
  }, []);

  const importConfigJson = useCallback((jsonStr: string) => {
    const success = soundManager.importConfigJson(jsonStr);
    if (success) {
      setIsMuted(soundManager.getMuted());
      setIsSfxEnabled(soundManager.getSfxEnabled());
      setIsMusicEnabled(soundManager.getMusicEnabled());
      setVolumesState(soundManager.getVolumes());
      setRegistryState(soundManager.getRegistry());
      saveSettings();
    }
    return success;
  }, [saveSettings]);

  // PERF: memoized. An inline object literal here produced a new context
  // value on every render of this provider, which re-renders every consumer
  // beneath it whether or not the underlying state actually changed.
  const value = useMemo(
    () => ({
      isMuted,
      isSfxEnabled,
      isMusicEnabled,
      volumes,
      registry,
      toggleMute,
      setSfxEnabled,
      setMusicEnabled,
      setVolume,
      updateSoundConfig,
      play,
      emitEvent,
      stopAll,
      resetToDefault,
      exportConfigJson,
      importConfigJson,
    }),
    [
    isMuted,
    isSfxEnabled,
    isMusicEnabled,
    volumes,
    registry,
    toggleMute,
    setSfxEnabled,
    setMusicEnabled,
    setVolume,
    updateSoundConfig,
    play,
    emitEvent,
    stopAll,
    resetToDefault,
    exportConfigJson,
    importConfigJson,
    ]
  );

  return (
    <AudioContext.Provider value={value}>
      {children}
    </AudioContext.Provider>
  );
};

export const useAudioContext = () => {
  const ctx = useContext(AudioContext);
  if (!ctx) {
    throw new Error('useAudioContext must be used within an AudioProvider');
  }
  return ctx;
};
