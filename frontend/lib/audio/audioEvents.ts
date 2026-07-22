/**
 * Teyro Event-Based Audio Bus
 *
 * Components emit application-level events (e.g. `BUTTON_PRIMARY_CLICK`).
 * The audio event bus routes the event to the configured SoundId in the SoundManager.
 * This ensures components NEVER hardcode sound filenames or sound IDs directly.
 */

import { SoundId, SoundConfig } from './soundRegistry';
import { soundManager } from './soundManager';

export type AppAudioEvent =
  | 'BUTTON_PRIMARY_CLICK'
  | 'BUTTON_SECONDARY_CLICK'
  | 'SELECTION_CHANGE'
  | 'TAB_SWITCH'
  | 'TOGGLE_CHANGE'
  | 'DRAWER_TOGGLE'
  | 'ACTION_SUCCESS'
  | 'ACTION_ERROR'
  | 'QUIZ_CORRECT'
  | 'BACKGROUND_MUSIC_START'
  | 'BACKGROUND_MUSIC_STOP';

export const AUDIO_EVENT_MAP: Record<AppAudioEvent, SoundId | null> = {
  BUTTON_PRIMARY_CLICK: 'BUTTON_PRIMARY',
  BUTTON_SECONDARY_CLICK: 'BUTTON_SECONDARY',
  SELECTION_CHANGE: 'SELECTION',
  TAB_SWITCH: 'TAB_SWITCH',
  TOGGLE_CHANGE: 'TOGGLE',
  DRAWER_TOGGLE: 'MENU_OPEN_CLOSE',
  ACTION_SUCCESS: 'SUCCESS_CONFIRM',
  ACTION_ERROR: 'ERROR_SOFT',
  QUIZ_CORRECT: 'CORRECT',
  BACKGROUND_MUSIC_START: 'BACKGROUND_MUSIC',
  BACKGROUND_MUSIC_STOP: null, // Stops background music
};

/**
 * Emits an application-level audio event.
 *
 * Usage:
 *   emitAudioEvent('BUTTON_PRIMARY_CLICK');
 *   emitAudioEvent('ACTION_SUCCESS');
 *   emitAudioEvent('QUIZ_CORRECT');
 */
export async function emitAudioEvent(
  event: AppAudioEvent,
  overrideConfig?: Partial<SoundConfig>,
): Promise<void> {
  if (event === 'BACKGROUND_MUSIC_STOP') {
    soundManager.fadeOut('BACKGROUND_MUSIC', 1.0);
    return;
  }

  const soundId = AUDIO_EVENT_MAP[event];
  if (soundId) {
    await soundManager.play(soundId, overrideConfig);
  }
}
