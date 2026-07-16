/**
 * hooks/useOnboardingPreload.js
 *
 * Preloads the next onboarding step's image while the user is on the current step.
 * Uses a simple `new Image(); img.src = path` browser preload pattern.
 *
 * Usage (do NOT wire into any component yet — pending review):
 *
 *   import { useOnboardingPreload } from '@/hooks/useOnboardingPreload';
 *
 *   // Inside a step component, e.g. step 5:
 *   useOnboardingPreload('/User onbarding Assets/Step_6_mascot.webp');
 *
 * Suggested call sites (one per step component, for the NEXT step's primary image):
 *   Step 0  → preload Step_7_tey_verified_state.webp  (used in step 0 itself; skip or preload step 1 if it gains an image)
 *   Step 3  → preload Tey_step4_mobile.webp + Tey_step4_desktop.webp
 *   Step 4  → preload Step_5_mobile_mascot.webp + step_5_desktop_mascot.webp
 *   Step 5  → preload Step_6_mascot.webp
 *   Step 6  → preload Step_7_tey_verified_state.webp
 *   Step 7  → preload Step_8_mascot_Mobile.webp + Step_8_mascot_desktop.webp
 *   Step 8  → preload Tey_step_9_img.webp
 *   Step 9  → preload Step_10_image.webp
 *   Step 10 → preload Step_11_image_mobile.webp + Step_11_image_desktop.webp
 *   Step 11 → preload Step_12_image_mobile.webp + Step_12_image_desktop.webp
 *   Step 12 → preload Step-13_img.webp
 *   Step 13 → preload Step_14_image_mobile.webp + Step_14_image_desktop.webp
 *   Step 14 → preload step_15_image_mobile.webp + step_15_image_desktop.webp
 */

import { useEffect } from 'react';

/**
 * Preloads one or more image paths using the browser's native Image preload mechanism.
 *
 * @param {string | string[]} paths - A single path or array of paths to preload.
 */
export function useOnboardingPreload(paths) {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const normalised = Array.isArray(paths) ? paths : [paths];

    normalised.forEach((src) => {
      if (!src) return;
      const img = new Image();
      img.src = src;
    });
  }, [paths]);
}
