import React from 'react';
import { AtSign, Bell, Flame, Heart, MessageCircle, Megaphone } from 'lucide-react';
import type { AppNotification } from './communityApi';

/**
 * Shared presentation rules for a notification row — used by both the bell
 * panel and the full inbox page, so the two can't describe the same event
 * differently.
 */

/** Action phrase per type. Community rows are actor-phrased; Tey's are not. */
const TYPE_PHRASES: Record<string, string> = {
  REPLY: 'replied to your comment',
  COMMENT: 'commented on your post',
  MENTION: 'mentioned you',
  POST_LIKE: 'liked your post',
  COMMENT_LIKE: 'liked your comment',
  ANNOUNCEMENT: 'posted an announcement',
  // Tey's own rows. Without an entry here a row renders a blank line, because
  // the fallback expects an actor-phrased sentence.
  TEY_STREAK_AT_RISK: 'Your streak needs one lesson today',
  TEY_STREAK_CRITICAL: 'Last chance to save your streak',
  TEY_DAILY_GOAL_INCOMPLETE: "Today's goal is still open",
  TEY_INACTIVE_RETURN: 'Your course is waiting for you',
  TEY_MILESTONE: 'You hit a milestone',
  TEY_STREAK_LOST: 'Your streak ended — ready to start again?',
  TEY_PROGRESS_CELEBRATION: 'Nice progress this week',
  TEY_COURSE_NEAR_COMPLETION: "You're nearly done with your course",
  TEY_LESSON_ABANDONED: 'You left a lesson unfinished',
};

export function phraseFor(n: AppNotification): string {
  // Tey's own rows carry a real, personality-flavored body written by
  // backend/src/tey/delivery/templates/message-templates.ts — prefer it over
  // the flat TYPE_PHRASES fallback, which used to win unconditionally and
  // silently mask that copy. TYPE_PHRASES still backstops the rare row with
  // no body at all.
  if (n.type.startsWith('TEY_') && n.body) return n.body;
  return TYPE_PHRASES[n.type] ?? n.body ?? 'sent you a notification';
}

/** Tey speaks for itself; community rows lead with the person who acted. */
export function isActorPhrased(type: string): boolean {
  return !type.startsWith('TEY_');
}

export function typeIcon(type: string, size = 12): React.ReactNode {
  if (type.startsWith('TEY_')) return <Flame size={size} />;
  if (type === 'ANNOUNCEMENT') return <Megaphone size={size} />;
  if (type === 'MENTION') return <AtSign size={size} />;
  if (type === 'POST_LIKE' || type === 'COMMENT_LIKE') return <Heart size={size} />;
  if (type === 'REPLY' || type === 'COMMENT') return <MessageCircle size={size} />;
  return <Bell size={size} />;
}

/** CSS-module class name for the type chip's colour. */
export function typeChipKey(
  type: string,
): 'chipTey' | 'chipAnnouncement' | 'chipMention' | 'chipLike' | 'chipComment' | 'chipDefault' {
  if (type.startsWith('TEY_')) return 'chipTey';
  if (type === 'ANNOUNCEMENT') return 'chipAnnouncement';
  if (type === 'MENTION') return 'chipMention';
  if (type === 'POST_LIKE' || type === 'COMMENT_LIKE') return 'chipLike';
  if (type === 'REPLY' || type === 'COMMENT') return 'chipComment';
  return 'chipDefault';
}

export type NotificationGroup = 'Today' | 'This week' | 'Earlier';

/**
 * Bucket for the day separator. Twenty rows all reading "2d ago" are
 * impossible to scan; three labelled runs are.
 */
export function groupFor(iso: string): NotificationGroup {
  const then = new Date(iso).getTime();
  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);
  if (then >= startOfToday.getTime()) return 'Today';
  if (then >= startOfToday.getTime() - 6 * 24 * 3600 * 1000) return 'This week';
  return 'Earlier';
}
