import React from 'react';
import { AtSign, Bell, BellRing, Flame, Heart, LifeBuoy, LockOpen, MessageCircle, Megaphone, PartyPopper, Snowflake, Trophy, UserPlus } from 'lucide-react';
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
  FOLLOW: 'started following you',
  // From the course creator (the studio's nudge and cheer); the body is their note.
  CREATOR_NUDGE: 'sent you a nudge',
  CREATOR_CHEER: 'is cheering you on',
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
  TEY_STREAK_REPAIR_EXPIRING: 'Last chance to repair your streak',
  TEY_FIRST_LESSON: 'Your first lesson is waiting',
  TEY_STREAK_FREEZE_USED: 'A streak freeze saved your streak',
  TEY_LEAGUE_PASSED: 'Someone passed you in your league',
  TEY_LEAGUE_CLIMB: 'You climbed your league',
  TEY_LEAGUE_ENDING: 'Your league ends soon',
  TEY_LEAGUE_RESULT: 'Your league results are in',
  TEY_COURSE_UNLOCK: 'Your course is waiting for you',
};

/**
 * Tey's EVENT rows (backend tey/notify) — something happened, so the title
 * carries the news ("Sam just passed you!") and the body the detail
 * ("You're #4 now"). Reminder rows are the other way round: their body is
 * the line worth reading.
 */
const TEY_EVENT_TYPES = new Set([
  'TEY_STREAK_FREEZE_USED',
  'TEY_LEAGUE_PASSED',
  'TEY_LEAGUE_CLIMB',
  'TEY_LEAGUE_ENDING',
  'TEY_LEAGUE_RESULT',
  'TEY_COURSE_UNLOCK',
]);
const isTeyEvent = (type: string) => TEY_EVENT_TYPES.has(type);

export function phraseFor(n: AppNotification): string {
  // Tey's own rows carry a real, personality-flavored body written by
  // backend/src/tey/delivery/templates/message-templates.ts — prefer it over
  // the flat TYPE_PHRASES fallback, which used to win unconditionally and
  // silently mask that copy. TYPE_PHRASES still backstops the rare row with
  // no body at all.
  if (isTeyEvent(n.type) && n.title) return n.title;
  if (n.type.startsWith('TEY_') && n.body) return n.body;
  // System rows (a friend joined with your invite, …) carry their own
  // headline; the body is the detail line (see secondaryLine).
  if (n.type === 'SYSTEM' || n.type === 'SUPPORT_REPLY') return n.title ?? n.body ?? 'Update from Teyro';
  return TYPE_PHRASES[n.type] ?? n.body ?? 'sent you a notification';
}

/** Tey speaks for itself; community rows lead with the person who acted. */
export function isActorPhrased(type: string): boolean {
  return !type.startsWith('TEY_') && type !== 'SYSTEM' && type !== 'SUPPORT_REPLY';
}

/** The smaller line under the headline: a system row's body, else the post title. */
export function secondaryLine(n: AppNotification): string | null {
  if (n.type === 'SYSTEM' || n.type === 'SUPPORT_REPLY') return n.title ? (n.body ?? null) : null;
  if (n.type.startsWith('CREATOR_')) return n.body ?? null;
  if (isTeyEvent(n.type)) return n.body ?? null;
  return n.title ?? null;
}

export function typeIcon(type: string, size = 12): React.ReactNode {
  if (type.startsWith('TEY_LEAGUE_')) return <Trophy size={size} />;
  if (type === 'TEY_STREAK_FREEZE_USED') return <Snowflake size={size} />;
  if (type === 'TEY_COURSE_UNLOCK') return <LockOpen size={size} />;
  if (type.startsWith('TEY_')) return <Flame size={size} />;
  if (type === 'ANNOUNCEMENT') return <Megaphone size={size} />;
  if (type === 'CREATOR_NUDGE') return <BellRing size={size} />;
  if (type === 'CREATOR_CHEER') return <PartyPopper size={size} />;
  if (type === 'MENTION') return <AtSign size={size} />;
  if (type === 'POST_LIKE' || type === 'COMMENT_LIKE') return <Heart size={size} />;
  if (type === 'REPLY' || type === 'COMMENT') return <MessageCircle size={size} />;
  if (type === 'FOLLOW') return <UserPlus size={size} />;
  if (type === 'SUPPORT_REPLY') return <LifeBuoy size={size} />;
  return <Bell size={size} />;
}

/** CSS-module class name for the type chip's colour. */
export function typeChipKey(
  type: string,
): 'chipTey' | 'chipAnnouncement' | 'chipMention' | 'chipLike' | 'chipComment' | 'chipDefault' {
  if (type.startsWith('TEY_')) return 'chipTey';
  if (type === 'ANNOUNCEMENT' || type.startsWith('CREATOR_')) return 'chipAnnouncement';
  if (type === 'MENTION') return 'chipMention';
  if (type === 'POST_LIKE' || type === 'COMMENT_LIKE') return 'chipLike';
  if (type === 'REPLY' || type === 'COMMENT') return 'chipComment';
  if (type === 'FOLLOW') return 'chipMention';
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
