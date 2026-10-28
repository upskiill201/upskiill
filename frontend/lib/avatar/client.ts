'use client';

/**
 * Saving a profile picture — a photo or a Teyro character — from anywhere
 * (profile, onboarding, the "add a photo" asks). One path, so every surface
 * pays the same one-time Coins and refreshes the same caches.
 */

import { useCallback } from 'react';
import { useSWRConfig } from 'swr';
import { useGamification } from '@/context/GamificationContext';
import { ME_KEY } from '@/hooks/useMe';
import { isPhoto } from './avatar';

export const PHOTO_REWARD_KEY = '/api/avatar/photo-reward';
/** Mirrors backend avatar.constants PHOTO_REWARD_COINS (shown before claiming). */
export const PHOTO_REWARD_COINS = 20;

export interface PhotoReward {
  rewarded: boolean;
  coins: number;
  balance?: number;
}

/** Sends a cropped photo to R2 (via the Next upload route) and returns its URL. */
export async function uploadPhoto(blob: Blob): Promise<string> {
  const form = new FormData();
  form.append('file', new File([blob], 'avatar.jpg', { type: blob.type || 'image/jpeg' }));
  const res = await fetch('/api/upload/avatar', { method: 'POST', body: form, credentials: 'include' });
  const data = (await res.json().catch(() => ({}))) as { url?: string; error?: string };
  if (!res.ok || !data.url) throw new Error(data.error || 'Upload failed. Try a JPG or PNG under 5MB.');
  return data.url;
}

async function patchAvatar(url: string): Promise<unknown> {
  const res = await fetch('/api/profile', {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ avatarUrl: url }),
  });
  if (!res.ok) throw new Error("That didn't save. Try again.");
  return res.json();
}

async function claimPhotoReward(): Promise<PhotoReward> {
  const res = await fetch(PHOTO_REWARD_KEY, { method: 'POST', credentials: 'include' });
  if (!res.ok) return { rewarded: false, coins: 0 };
  return (await res.json()) as PhotoReward;
}

/**
 * `save(url)` stores the new picture, pays the photo Coins when it's a real
 * photo, and refreshes everything that shows your face.
 */
export function useSaveAvatar() {
  const { mutate } = useSWRConfig();
  const { refresh } = useGamification();

  return useCallback(
    async (url: string): Promise<{ profile: unknown; reward: PhotoReward | null }> => {
      const profile = await patchAvatar(url);
      const reward = isPhoto(url) ? await claimPhotoReward() : null;
      // Your face is on the profile, the shell, the network and the rails.
      void mutate(
        (key) =>
          typeof key === 'string' &&
          (key === ME_KEY || key === '/api/profile' || key === PHOTO_REWARD_KEY || key.startsWith('/api/network')),
      );
      if (reward?.rewarded) void refresh();
      return { profile, reward };
    },
    [mutate, refresh],
  );
}
