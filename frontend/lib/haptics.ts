import { emitAudioEvent, AppAudioEvent } from '@/lib/audio/audioEvents';

let hapticsInstance: any = null;

function getHapticsInstance() {
  if (typeof window === 'undefined') return null;
  if (!hapticsInstance) {
    try {
      // Lazy load web-haptics on client side to prevent SSR/Turbopack chunk instantiation issues
      const { WebHaptics } = require('web-haptics');
      hapticsInstance = new WebHaptics();
    } catch {
      hapticsInstance = null;
    }
  }
  return hapticsInstance;
}

export type HapticType =
  | 'success'
  | 'warning'
  | 'error'
  | 'light'
  | 'medium'
  | 'heavy'
  | 'selection'
  | 'rigid'
  | 'soft'
  | 'teyroBounce'
  | 'teyroSnap'
  | 'teyroCelebration'
  | 'teyroIncorrect'
  | number
  | number[];

/**
 * Triggers a web haptic feedback pattern & audio effect synchronously.
 * Connects tactile game-feel with the Teyro Centralized Sound Engine.
 */
export function playHaptic(type: HapticType, playAudio = true) {
  if (typeof window === 'undefined') return;

  // Sync with Audio Engine
  if (playAudio) {
    let audioEvent: AppAudioEvent | null = null;
    if (type === 'medium' || type === 'heavy') audioEvent = 'BUTTON_PRIMARY_CLICK';
    else if (type === 'light' || type === 'soft' || type === 'rigid') audioEvent = 'BUTTON_SECONDARY_CLICK';
    else if (type === 'selection' || type === 'teyroBounce') audioEvent = 'SELECTION_CHANGE';
    else if (type === 'success' || type === 'teyroCelebration') audioEvent = 'QUIZ_CORRECT';
    else if (type === 'error' || type === 'teyroIncorrect' || type === 'warning') audioEvent = 'ACTION_ERROR';

    if (audioEvent) {
      void emitAudioEvent(audioEvent);
    }
  }

  // Handle Teyro Custom Macros
  if (type === 'teyroBounce') {
    playHaptic('selection');
    setTimeout(() => playHaptic('selection'), 80);
    return;
  }

  if (type === 'teyroSnap') {
    playHaptic('rigid');
    return;
  }

  const instance = getHapticsInstance();
  if (instance) {
    try {
      if (type === 'medium') {
        // Custom button haptic requested by the user
        instance.trigger([
          { duration: 30 },
          { delay: 60, duration: 40, intensity: 1 },
        ]);
      } else if (type === 'teyroIncorrect') {
        // Custom wrong-position haptic requested by the user
        instance.trigger([
          { duration: 40, intensity: 0.7 },
          { delay: 40, duration: 40, intensity: 0.7 },
          { delay: 40, duration: 40, intensity: 0.9 },
          { delay: 40, duration: 50, intensity: 0.6 },
        ]);
      } else if (type === 'teyroCelebration') {
        // Custom victory buzz haptic requested by the user
        instance.trigger([
          { duration: 1000 },
        ], { intensity: 1 });
      } else if (typeof type === 'number') {
        if (type <= 10) {
          instance.trigger('light');
        } else if (type <= 20) {
          instance.trigger('medium');
        } else {
          instance.trigger('heavy');
        }
      } else if (Array.isArray(type)) {
        instance.trigger('buzz');
      } else {
        instance.trigger(type);
      }
      return;
    } catch (e) {
      console.warn('web-haptics trigger failed, falling back to navigator.vibrate:', e);
    }
  }

  // Fallback to standard vibration API (works on Android, no-op on iOS)
  if (typeof navigator !== 'undefined' && navigator.vibrate) {
    try {
      if (typeof type === 'number' || Array.isArray(type)) {
        navigator.vibrate(type);
      } else {
        const vibrationDurations = {
          success: [50, 50, 50],
          warning: [100, 50, 100],
          error: [150, 50, 150, 50, 150],
          light: 10,
          medium: [30, 60, 40],
          heavy: 25,
          selection: 5,
          rigid: 15,
          soft: 8,
          teyroIncorrect: [40, 40, 40, 40, 40, 40, 50],
          teyroCelebration: [1000],
        };
        const pattern = vibrationDurations[type as keyof typeof vibrationDurations] || 10;
        navigator.vibrate(pattern);
      }
    } catch (err) {
      console.warn('navigator.vibrate failed:', err);
    }
  }
}
