'use client';

import { useAudioContext } from '@/context/AudioContext';
import { AppAudioEvent, emitAudioEvent } from './audioEvents';
import { SoundId, SoundConfig } from './soundRegistry';
import soundManager from './soundManager';

/**
 * Custom React Hook for Audio Control & Events
 *
 * Usage:
 *   const { play, emitEvent, isMuted, toggleMute } = useAudio();
 *
 *   // Play by event
 *   emitEvent('BUTTON_PRIMARY_CLICK');
 *
 *   // Play by sound ID
 *   play('SUCCESS_CONFIRM');
 */
export function useAudio() {
  try {
    return useAudioContext();
  } catch {
    // Safe fallback if component is outside AudioProvider
    return {
      isMuted: soundManager.getMuted(),
      isSfxEnabled: soundManager.getSfxEnabled(),
      isMusicEnabled: soundManager.getMusicEnabled(),
      volumes: soundManager.getVolumes(),
      registry: soundManager.getRegistry(),
      toggleMute: () => soundManager.mute(!soundManager.getMuted()),
      setSfxEnabled: (enabled: boolean) => soundManager.setSfxEnabled(enabled),
      setMusicEnabled: (enabled: boolean) => soundManager.setMusicEnabled(enabled),
      setVolume: (category: any, value: number) => soundManager.setVolume(category, value),
      updateSoundConfig: (id: SoundId, updates: Partial<SoundConfig>) => soundManager.updateSoundConfig(id, updates),
      play: (id: SoundId, override?: Partial<SoundConfig>) => soundManager.play(id, override),
      emitEvent: (event: AppAudioEvent) => emitAudioEvent(event),
      stopAll: () => soundManager.stopAll(),
      resetToDefault: () => soundManager.resetRegistry(),
      exportConfigJson: () => soundManager.exportConfigJson(),
      importConfigJson: (json: string) => soundManager.importConfigJson(json),
    };
  }
}
