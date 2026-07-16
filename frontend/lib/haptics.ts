'use client';

import { WebHaptics } from 'web-haptics';

let hapticsInstance: any = null;

if (typeof window !== 'undefined') {
  try {
    hapticsInstance = new WebHaptics();
  } catch (err) {
    console.warn('Failed to initialize web-haptics:', err);
  }
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
 * Triggers a web haptic feedback pattern.
 * Supports built-in web-haptics presets, numbers/arrays for legacy fallback,
 * and custom Teyro-voiced haptic presets for playful/premium game feel.
 */
export function playHaptic(type: HapticType) {
  if (typeof window === 'undefined') return;

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

  if (hapticsInstance) {
    try {
      if (type === 'medium') {
        // Custom button haptic requested by the user
        hapticsInstance.trigger([
          { duration: 30 },
          { delay: 60, duration: 40, intensity: 1 },
        ]);
      } else if (type === 'teyroIncorrect') {
        // Custom wrong-position haptic requested by the user
        hapticsInstance.trigger([
          { duration: 40, intensity: 0.7 },
          { delay: 40, duration: 40, intensity: 0.7 },
          { delay: 40, duration: 40, intensity: 0.9 },
          { delay: 40, duration: 50, intensity: 0.6 },
        ]);
      } else if (type === 'teyroCelebration') {
        // Custom victory buzz haptic requested by the user
        hapticsInstance.trigger([
          { duration: 1000 },
        ], { intensity: 1 });
      } else if (typeof type === 'number') {
        if (type <= 10) {
          hapticsInstance.trigger('light');
        } else if (type <= 20) {
          hapticsInstance.trigger('medium');
        } else {
          hapticsInstance.trigger('heavy');
        }
      } else if (Array.isArray(type)) {
        hapticsInstance.trigger('buzz');
      } else {
        hapticsInstance.trigger(type);
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
