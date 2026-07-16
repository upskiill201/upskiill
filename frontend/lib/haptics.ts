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

export function playHaptic(type: 'success' | 'warning' | 'error' | 'light' | 'medium' | 'heavy' | 'selection' | number | number[]) {
  if (typeof window === 'undefined') return;

  if (hapticsInstance) {
    try {
      if (typeof type === 'number') {
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
          medium: 15,
          heavy: 25,
          selection: 5,
        };
        const pattern = vibrationDurations[type as keyof typeof vibrationDurations] || 10;
        navigator.vibrate(pattern);
      }
    } catch (err) {
      console.warn('navigator.vibrate failed:', err);
    }
  }
}
