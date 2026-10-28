/**
 * Profile photos and Teyro characters (founder, 2026-10-28).
 *
 * A drawn character is stored in the same avatarUrl field as a photo, as a
 * site path the frontend draws (frontend/lib/avatar/avatar.ts). Only a real
 * uploaded photo counts as "has a photo": the one-time Coins thank-you, the
 * network's small preference for real faces, and the day-2 reminder all key
 * off it.
 */

export const BUILT_AVATAR_MARK = '/avatars/v1/';

export function isPhoto(url: string | null | undefined): boolean {
  return !!url && /^https?:\/\//i.test(url) && !url.includes(BUILT_AVATAR_MARK);
}

/** One-time Coins for adding a real profile photo. */
export const PHOTO_REWARD_COINS = 20;

/** The day-2 photo reminder goes out this many hours after signup… */
export const PHOTO_NUDGE_AFTER_HOURS = 24;
/** …and never to anyone older than this (no back-filling the whole user base). */
export const PHOTO_NUDGE_BEFORE_HOURS = 72;
export const PHOTO_NUDGE_BATCH = 200;

export const REPORT_REASONS = ['inappropriate', 'not-a-person', 'impersonation', 'other'] as const;
export type ReportReason = (typeof REPORT_REASONS)[number];

/** Pushes and inbox rows this module writes. */
export const AVATAR_INBOX = {
  PHOTO_NUDGE: 'TEY_PROFILE_PHOTO',
  PHOTO_REMOVED: 'TEY_PROFILE_PHOTO_REMOVED',
} as const;
