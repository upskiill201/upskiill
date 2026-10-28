/**
 * The Teyro Network client (docs/TEYRO_NETWORK_PLAN.md). Every call goes to
 * /api/network/*, which the fallback rewrite proxies to the backend — one
 * hop, no route handlers.
 */

import React from 'react';
import { useSWRConfig } from 'swr';
import { askForPhoto } from '@/lib/avatar/photoAsk';

export const NETWORK_KEYS = {
  feed: '/api/network/feed',
  buddies: '/api/network/buddies',
  suggestions: '/api/network/suggestions',
  cohort: '/api/network/cohort',
  squad: '/api/network/squad',
  duels: '/api/network/duels',
  duel: (id: string) => `/api/network/duels/${encodeURIComponent(id)}`,
  duelOptions: (buddyId: string) => `/api/network/duels/options/${encodeURIComponent(buddyId)}`,
  squadPreview: (code: string) => `/api/network/squad/preview/${encodeURIComponent(code)}`,
  timeline: (userId: string) => `/api/network/users/${encodeURIComponent(userId)}/timeline`,
};

export type ActivityType =
  | 'COURSE_STARTED'
  | 'LESSON_COMPLETED'
  | 'STREAK_MILESTONE'
  | 'ACHIEVEMENT_UNLOCKED'
  | 'COURSE_FINISHED'
  | 'WORK_SHARED';

/** One of your own past questions, answered in the feed (no XP: practice). */
export interface ReviewCardData {
  id: string;
  lessonId: string;
  lessonTitle: string;
  courseId: string;
  daysAgo: number;
  prompt: string;
  message: string | null;
  code: string | null;
  options: { id: string; text: string; why: string | null }[];
  correctOptionId: string;
  explanation: string | null;
}

export interface ActivityCardData {
  id: string;
  type: ActivityType;
  createdAt: string;
  author: { id: string; name: string; avatar: string | null; isBuddy: boolean };
  course: { id: string; title: string; slug: string | null; thumbnailUrl: string | null; enrolled: boolean } | null;
  lessonTitle: string | null;
  lessonCount: number;
  streakDays: number | null;
  achievement: { name: string; description: string | null } | null;
  /** A friend's card brought them to this course. */
  inspiredBy: { id: string; name: string } | null;
  /** WORK_SHARED: code that passed a lesson's checks. Shown as text, never run. */
  work: { language: 'python' | 'sql'; code: string } | null;
  cheerCount: number;
  cheeredByMe: boolean;
  isMine: boolean;
}

export interface NetworkFeed {
  items: ActivityCardData[];
  reviews?: ReviewCardData[];
  caughtUp: boolean;
  hasNetwork: boolean;
}

export interface NetworkPerson {
  id: string;
  name: string;
  avatar: string | null;
  streak: number;
}

export interface Buddy extends NetworkPerson {
  since: string;
  streakTogether: number;
  learnedToday: boolean;
  nudgedToday: boolean;
  canNudge: boolean;
  /** In a lesson right now (co-learning presence). */
  live?: boolean;
  liveLesson?: string | null;
}

// ── Squads ────────────────────────────────────────────────────────────────

export interface SquadMemberData {
  id: string;
  name: string;
  avatar: string | null;
  role: 'OWNER' | 'MEMBER';
  lessonsThisWeek: number;
  learnedToday: boolean;
  live: boolean;
  isMe: boolean;
}
export interface SquadData {
  id: string;
  name: string;
  inviteCode: string;
  weeklyGoal: number;
  weekStart: string;
  lessonsThisWeek: number;
  goalMet: boolean;
  isOwner: boolean;
  max: number;
  members: SquadMemberData[];
}

// Each action that shows your face to someone asks for a photo first, once
// in a while, for people without one (lib/avatar/photoAsk.ts).
export const createSquad = async (name: string, weeklyGoal: number) => {
  await askForPhoto('squad');
  return send<{ squad: SquadData }>('/api/network/squad', 'POST', { name, weeklyGoal });
};
export const joinSquad = async (code: string) => {
  await askForPhoto('squad');
  return send<{ squad: SquadData }>('/api/network/squad/join', 'POST', { code });
};
export const leaveSquad = () => send<{ squad: null }>('/api/network/squad', 'DELETE');
export const inviteToSquad = (buddyId: string) =>
  send<{ invited: boolean }>(`/api/network/squad/invite/${encodeURIComponent(buddyId)}`, 'POST');
export function squadLink(origin: string, code: string) {
  return `${origin}/dashboard/network?squad=${encodeURIComponent(code)}`;
}

// ── Duels ─────────────────────────────────────────────────────────────────

export type DuelStatus = 'CHALLENGER_TURN' | 'OPPONENT_TURN' | 'DONE' | 'EXPIRED' | 'DECLINED';
export interface DuelSummary {
  id: string;
  status: DuelStatus;
  myTurn: boolean;
  lessonTitle: string;
  other: { id: string; name: string };
  myScore: number | null;
  theirScore: number | null;
}
export interface DuelQuestion {
  id: string;
  prompt: string;
  message: string | null;
  code: string | null;
  options: { id: string; text: string }[];
  /** Present once you've answered. */
  mine?: string | null;
  correct?: string;
  theirs?: string | null;
  explanation?: string | null;
}
export interface DuelData {
  id: string;
  status: DuelStatus;
  myTurn: boolean;
  lessonTitle: string;
  opponent: { id: string; name: string; avatar: string | null };
  expiresAt: string;
  myScore: number | null;
  theirScore: number | null;
  total: number;
  questions: DuelQuestion[];
}

export const createDuel = async (buddyId: string, lessonId: string) => {
  await askForPhoto('duel');
  return send<{ id: string }>('/api/network/duels', 'POST', { buddyId, lessonId });
};
export const answerDuel = (id: string, answers: Record<string, string>) =>
  send<DuelData>(`/api/network/duels/${encodeURIComponent(id)}/answers`, 'POST', { answers });

// ── Co-learning presence ──────────────────────────────────────────────────

export interface LiveBuddy {
  id: string;
  name: string | null;
  avatar: string | null;
  lessonTitle: string | null;
}
export const pingPresence = (lessonId: string) =>
  send<{ learningToo: LiveBuddy[] }>('/api/network/presence', 'POST', { lessonId });
export function leavePresence() {
  void fetch('/api/network/presence', { method: 'DELETE', credentials: 'include', keepalive: true }).catch(() => undefined);
}

export interface BuddiesPayload {
  buddies: Buddy[];
  incoming: (NetworkPerson & { requestedAt: string })[];
  outgoing: (NetworkPerson & { requestedAt: string })[];
  max: number;
  meLearnedToday: boolean;
}

export interface Suggestion extends NetworkPerson {
  reason: string;
  courseId: string;
}

export type BuddyStatus = 'SELF' | 'NONE' | 'OUTGOING' | 'INCOMING' | 'BUDDIES';
export interface Relation {
  status: BuddyStatus;
  streakTogether: number;
}

async function send<T>(path: string, method: 'POST' | 'DELETE', body?: unknown): Promise<T> {
  const res = await fetch(path, {
    method,
    credentials: 'include',
    headers: body ? { 'Content-Type': 'application/json' } : undefined,
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    // The API's error filter wraps it: { success: false, error: { message } }.
    const body = data as { message?: string | string[]; error?: { message?: string | string[] } };
    const msg = body.error?.message ?? body.message;
    throw new Error(Array.isArray(msg) ? msg[0] : msg || 'Something went wrong. Try again.');
  }
  return data as T;
}

export const cheerActivity = (id: string) =>
  send<{ cheered: boolean; cheerCount: number }>(`/api/network/activities/${encodeURIComponent(id)}/cheer`, 'POST');

/** Ask — or accept when they already asked. */
export const requestBuddy = async (userId: string, courseId?: string, opts: { askPhoto?: boolean } = {}) => {
  if (opts.askPhoto !== false) await askForPhoto('buddy');
  return send<Relation>(`/api/network/buddies/${encodeURIComponent(userId)}`, 'POST', courseId ? { courseId } : {});
};

/** Decline, cancel or un-buddy. */
export const removeBuddy = (userId: string) => send<Relation>(`/api/network/buddies/${encodeURIComponent(userId)}`, 'DELETE');

export const nudgeBuddy = (userId: string) =>
  send<{ nudged: boolean }>(`/api/network/buddies/${encodeURIComponent(userId)}/nudge`, 'POST');

/**
 * Refreshes every view a buddy change touches. Must use the provider-bound
 * mutate (useSWRConfig): the app's SWR cache is a custom persisted provider,
 * and the global `mutate` export only reaches the default cache.
 */
export function useRefreshNetwork() {
  const { mutate } = useSWRConfig();
  return React.useCallback(
    (userId?: string) =>
      Promise.all(
        [
          NETWORK_KEYS.buddies,
          NETWORK_KEYS.suggestions,
          NETWORK_KEYS.feed,
          NETWORK_KEYS.cohort,
          NETWORK_KEYS.squad,
          NETWORK_KEYS.duels,
          ...(userId ? [NETWORK_KEYS.timeline(userId)] : []),
        ].map((k) =>
          mutate(k),
        ),
      ),
    [mutate],
  );
}

export interface MatchResult {
  person: { id: string; name: string; avatar: string | null };
  course: { id: string; title: string };
  reasons: string[];
  relation: Relation;
}

/** Share code that just passed a lesson's checks. */
export const shareWork = (input: { lessonId: string; language: 'python' | 'sql'; code: string }) =>
  send<{ shared: boolean; activityId: string }>('/api/network/share', 'POST', input);

/** Ask about a lesson: the community composer, as a question linked to it. */
export function askAboutLessonHref(courseId: string, lessonId: string, lessonTitle: string) {
  const q = new URLSearchParams({ compose: '1', lesson: lessonId, lessonTitle });
  return `/dashboard/community/${encodeURIComponent(courseId)}?${q.toString()}`;
}

/** "Find me a study buddy" — the server picks the best match and asks them. */
export const findBuddyMatch = async () => {
  await askForPhoto('match');
  return send<MatchResult>('/api/network/match', 'POST');
};

export interface CohortMember {
  id: string;
  name: string;
  avatar: string | null;
  progress: number;
  lessonsThisWeek: number;
  rank: number;
  isMe: boolean;
}
export interface CohortPayload {
  course: { id: string; title: string } | null;
  members: CohortMember[];
}

// ── Card telemetry (network_events) ────────────────────────────────────────
// Impressions and taps are batched and flushed every few seconds, on tab
// hide, and immediately for a tap that navigates away. `keepalive` lets the
// last batch survive the navigation. The server only accepts card ids and
// reads author/course itself, so nothing here can fake attribution.

type CardEvent = { kind: 'IMPRESSION' | 'CTA' | 'PROFILE_OPEN'; activityId: string; position?: number };
const queue: CardEvent[] = [];
const seenThisPage = new Set<string>();
let timer: ReturnType<typeof setTimeout> | null = null;

function flush() {
  if (timer) {
    clearTimeout(timer);
    timer = null;
  }
  if (queue.length === 0) return;
  const events = queue.splice(0, 50);
  void fetch('/api/network/events', {
    method: 'POST',
    credentials: 'include',
    keepalive: true,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ events }),
  }).catch(() => undefined);
}

if (typeof window !== 'undefined') {
  window.addEventListener('pagehide', flush);
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') flush();
  });
}

export function trackCard(e: CardEvent) {
  if (e.kind === 'IMPRESSION') {
    // One impression per card per page view.
    if (seenThisPage.has(e.activityId)) return;
    seenThisPage.add(e.activityId);
  }
  queue.push(e);
  if (e.kind !== 'IMPRESSION' || queue.length >= 20) flush();
  else if (!timer) timer = setTimeout(flush, 4000);
}

/** The link a learner shares: lands the friend on the inviter's card, in that course. */
export function inviteLink(origin: string, userId: string, courseId?: string | null) {
  const q = new URLSearchParams({ invite: userId });
  if (courseId) q.set('course', courseId);
  return `${origin}/dashboard/network?${q.toString()}`;
}

export function timeAgo(iso: string): string {
  const s = Math.max(0, (Date.now() - new Date(iso).getTime()) / 1000);
  if (s < 60) return 'just now';
  if (s < 3600) return `${Math.floor(s / 60)}m`;
  if (s < 86400) return `${Math.floor(s / 3600)}h`;
  return `${Math.floor(s / 86400)}d`;
}
