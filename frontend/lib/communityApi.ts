/**
 * Typed client access to the Course Community / Feed / Notification APIs.
 * All calls go through same-origin /api proxies that forward the auth cookie.
 */

import { extractErrorMessage } from './apiError';

export interface CommunityAuthor {
  id: string;
  fullName: string;
  avatarUrl: string | null;
  streakDays: number;
}

export interface CommunityAttachment {
  id: string;
  url: string;
  filename: string;
  mimeType?: string | null;
  sizeBytes?: number | null;
}

export interface CommunityPost {
  id: string;
  postType: string;
  title: string | null;
  contentText: string;
  images: string[];
  isPinned: boolean;
  isLocked: boolean;
  likeCount: number;
  commentCount: number;
  viewCount?: number;
  editedAt?: string | null;
  lastActivityAt?: string;
  createdAt: string;
  author: CommunityAuthor;
  lesson: { id: string; title: string } | null;
  attachments: CommunityAttachment[];
  poll: { options: Array<{ id: string; text: string; voteCount: number }>; myOptionId: string | null } | null;
  likedByMe: boolean;
  userId: string;
  /**
   * Most recent distinct commenters (newest first, up to 5) and when the last
   * comment landed — the "who is in this thread" facepile and the
   * "New comment 2h ago" line. Only present on list responses.
   */
  commenters?: Array<{ id: string; fullName: string; avatarUrl: string | null }>;
  lastCommentAt?: string | null;
}

export interface FeedItem {
  /** Short human label for why this post surfaced ("Community win"). */
  reason: string;
  /** Structured reason — drives the pill's icon and tint in the UI. */
  reasonKind: 'announcement' | 'unanswered' | 'win' | 'active' | 'course' | 'general';
  likedByMe: boolean;
  /**
   * The full card shape, identical to a community post — the feed and the
   * community render the SAME <PostCard />. `contentText` is a server-side
   * 280-char slice (the feed never ships whole post bodies); `excerpt` is the
   * same string, kept for older callers.
   */
  post: CommunityPost & { excerpt: string };
  community: {
    id: string;
    name: string;
    courseId: string | null;
    courseTitle: string | null;
    courseSlug: string | null;
    courseThumbnailUrl: string | null;
  };
}

export interface AppNotification {
  id: string;
  type: string;
  entityType?: string | null;
  entityId?: string | null;
  title?: string | null;
  body?: string | null;
  isRead: boolean;
  createdAt: string;
  actor?: { id: string; fullName: string; avatarUrl: string | null } | null;
  /**
   * Where tapping this row should go. Set by Tey at send time (already
   * validated against the learner's real progress); null for community rows,
   * which resolve their destination client-side.
   */
  deepLink?: string | null;
  /**
   * Where tapping this row goes, resolved server-side when the list is built
   * (comment → its post → its course). Null when the target was deleted or the
   * viewer lost access. The bell used to resolve this itself on click, which
   * put two API round trips between the tap and the page.
   */
  url?: string | null;
}

async function jsonFetch<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    credentials: 'include',
    ...init,
    headers: {
      ...(init?.body ? { 'Content-Type': 'application/json' } : {}),
      ...init?.headers,
    },
  });
  const data = await res.json().catch(() => ({}));
  // Unwraps the HttpExceptionFilter envelope ({ error: { message } }) — throwing
  // the raw object here rendered as "[object Object]" in error banners.
  if (!res.ok) throw new Error(extractErrorMessage(data, res.status));
  return data as T;
}

// ─── Communities ─────────────────────────────────────────────────────────────

export interface CommunityOverview {
  id: string;
  name: string;
  description: string | null;
  memberCount: number;
  course: {
    id: string;
    title: string;
    slug: string;
    thumbnailUrl: string | null;
    instructorId: string;
    instructor: { id: string; fullName: string; avatarUrl: string | null } | null;
  } | null;
  stats: { totalPosts: number; totalMembers: number };
  myMembership: { role: string; joinedAt: string | null };
  isModerator: boolean;
  membersPreview: Array<CommunityAuthor & { isCreator: boolean }>;
}

export const getCommunityByCourse = (courseId: string) =>
  jsonFetch<CommunityOverview>(`/api/community/course/${courseId}`);

export interface MyCommunity {
  id: string;
  name: string;
  memberCount: number;
  totalPosts: number;
  isModerator: boolean;
  course: {
    id: string;
    title: string;
    thumbnailUrl: string | null;
    instructorId: string;
  } | null;
}

/** Every community the caller belongs to — ONE call, no per-course overviews. */
export const getMyCommunities = () =>
  jsonFetch<{ communities: MyCommunity[] }>('/api/community/my');

export const getCommunityPosts = (
  communityId: string,
  opts: { sort?: string; type?: string; lessonId?: string; page?: number } = {},
) => {
  const q = new URLSearchParams();
  if (opts.sort) q.set('sort', opts.sort);
  if (opts.type) q.set('type', opts.type);
  if (opts.lessonId) q.set('lessonId', opts.lessonId);
  if (opts.page) q.set('page', String(opts.page));
  return jsonFetch<{ total: number; page: number; pageSize: number; posts: CommunityPost[] }>(
    `/api/community/${communityId}/posts?${q.toString()}`,
  );
};

// ─── Leaderboards ────────────────────────────────────────────────────────────

export type LeaderboardWindow = '7d' | '30d' | 'all';

export interface LeaderboardEntry {
  rank: number;
  userId: string;
  fullName: string;
  avatarUrl: string | null;
  isCreator: boolean;
  streakDays: number;
  points: number;
}

export interface LeaderboardBoard {
  window: LeaderboardWindow;
  entries: LeaderboardEntry[];
  scoredMembers: number;
  me: { rank: number | null; points: number };
}

export interface CommunityLevelRung {
  level: number;
  name: string;
  minPoints: number;
  unlocks: string | null;
  /** Share of this community's members sitting at this rung. */
  memberPct: number;
}

export interface LeaderboardBundle {
  weekly: LeaderboardBoard;
  monthly: LeaderboardBoard;
  allTime: LeaderboardBoard;
  me: {
    points: number;
    level: number;
    levelName: string;
    pointsToNextLevel: number | null;
    /** 0–1 fill of the ring around the avatar. */
    levelProgress: number;
  };
  levels: CommunityLevelRung[];
}

/** All three boards + the caller's level card, in one request. */
export const getLeaderboards = (communityId: string) =>
  jsonFetch<LeaderboardBundle>(`/api/community/${communityId}/leaderboards`);

// ─── Page bootstrap ──────────────────────────────────────────────────────────

export interface CommunityBootstrap {
  community: CommunityOverview;
  posts: { total: number; page: number; pageSize: number; posts: CommunityPost[] };
  /** 30-day top 5 for the right rail; null if the board query failed. */
  leaderboard: LeaderboardBoard | null;
}

/**
 * Everything the community page needs to paint, in ONE round trip. The page
 * used to fetch the overview, then the posts, then the rail — each waiting on
 * the last, and each re-resolving the community server-side before doing any
 * work.
 */
export const getCommunityBootstrap = (
  courseId: string,
  opts: { sort?: string; type?: string; lessonId?: string } = {},
) => {
  const q = new URLSearchParams();
  if (opts.sort) q.set('sort', opts.sort);
  if (opts.type) q.set('type', opts.type);
  if (opts.lessonId) q.set('lessonId', opts.lessonId);
  const qs = q.toString();
  return jsonFetch<CommunityBootstrap>(
    `/api/community/course/${courseId}/bootstrap${qs ? `?${qs}` : ''}`,
  );
};

export interface CreatePostInput {
  postType?: string;
  title?: string;
  contentText: string;
  images?: string[];
  attachments?: Array<{ url: string; filename: string; mimeType?: string; sizeBytes?: number }>;
  pollOptions?: Array<{ text: string }>;
  lessonId?: string;
}

export const createPost = (communityId: string, input: CreatePostInput) =>
  jsonFetch<CommunityPost & { xpAwarded?: { xp: number; coins: number } }>(
    `/api/community/${communityId}/posts`,
    { method: 'POST', body: JSON.stringify(input) },
  );

export const getMembers = (communityId: string, q = '', page = 1) =>
  jsonFetch<{
    total: number;
    page: number;
    pageSize: number;
    members: Array<{ id: string; fullName: string; avatarUrl: string | null; isCreator: boolean; streakDays: number; xp: number }>;
  }>(`/api/community/${communityId}/members?page=${page}&q=${encodeURIComponent(q)}`);

// ─── Posts ───────────────────────────────────────────────────────────────────

export const getPost = (postId: string) =>
  jsonFetch<
    CommunityPost & {
      canModerate: boolean;
      community: { id: string; courseId: string | null; courseTitle: string | null } | null;
    }
  >(`/api/posts/${postId}`);

export const deletePost = (postId: string) =>
  jsonFetch<{ success: boolean }>(`/api/posts/${postId}`, { method: 'DELETE' });

export const setPostFlag = (postId: string, flag: 'pin' | 'lock', value: boolean) =>
  jsonFetch<{ id: string }>(`/api/posts/${postId}/${flag}`, {
    method: 'POST',
    body: JSON.stringify({ value }),
  });

export const togglePostLike = async (postId: string, liked: boolean) => {
  const res = await jsonFetch<{ liked: boolean; likeCount: number }>(
    `/api/posts/${postId}/like`,
    { method: liked ? 'DELETE' : 'POST' },
  );
  return res;
};

export const votePoll = (postId: string, optionId: string) =>
  jsonFetch<{ options: Array<{ id: string; text: string; voteCount: number }>; votedOptionId: string }>(
    `/api/posts/${postId}/vote`,
    { method: 'POST', body: JSON.stringify({ optionId }) },
  );

// ─── Comments ────────────────────────────────────────────────────────────────

export interface CommentNode {
  id: string;
  postId: string;
  parentId: string | null;
  contentText: string;
  likeCount: number;
  editedAt?: string | null;
  createdAt: string;
  author: CommunityAuthor;
  likedByMe: boolean;
  userId: string;
  replies?: CommentNode[];
}

export const getComments = (postId: string, page = 1) =>
  jsonFetch<{ total: number; page: number; pageSize: number; comments: CommentNode[] }>(
    `/api/posts/${postId}/comments?page=${page}`,
  );

export const addComment = (postId: string, contentText: string, parentId?: string) =>
  jsonFetch<CommentNode & { xpAwarded?: { xp: number; coins: number } }>(
    `/api/posts/${postId}/comments`,
    { method: 'POST', body: JSON.stringify({ contentText, ...(parentId ? { parentId } : {}) }) },
  );

export const deleteComment = (commentId: string) =>
  jsonFetch<{ success: boolean }>(`/api/comments/${commentId}`, { method: 'DELETE' });

/** Resolves a comment id to its post — used by the notification bell. */
export const getCommentLocation = (commentId: string) =>
  jsonFetch<{ id: string; postId: string }>(`/api/comments/${commentId}`);

export const toggleCommentLike = (commentId: string, liked: boolean) =>
  jsonFetch<{ liked: boolean; likeCount: number }>(`/api/comments/${commentId}/like`, {
    method: liked ? 'DELETE' : 'POST',
  });

// ─── Feed ────────────────────────────────────────────────────────────────────

export const getFeed = (opts: { page?: number; type?: string } = {}) => {
  const q = new URLSearchParams();
  if (opts.type && opts.type !== 'all') q.set('type', opts.type);
  q.set('page', String(opts.page ?? 1));
  return jsonFetch<{ page: number; pageSize: number; items: FeedItem[] }>(
    `/api/feed?${q.toString()}`,
  );
};

export interface DiscoverPayload {
  continueLearning: Array<{
    kind: 'continue';
    courseId: string;
    courseTitle: string;
    thumbnailUrl: string | null;
    progressPct: number;
  }>;
  questions: Array<{ postId: string; title: string; communityName: string; courseId: string | null }>;
  activeDiscussion: {
    postId: string;
    title: string;
    commentCount: number;
    likeCount: number;
    communityName: string;
    courseId: string | null;
  } | null;
}

export const getDiscover = () => jsonFetch<DiscoverPayload>('/api/feed/discover');

// ─── Notifications ───────────────────────────────────────────────────────────

export const getNotifications = (page = 1, unreadOnly = false) =>
  jsonFetch<{ total: number; items: AppNotification[] }>(
    `/api/notifications?page=${page}${unreadOnly ? '&unreadOnly=true' : ''}`,
  );

export const getUnreadCount = () =>
  jsonFetch<{ unreadCount: number }>('/api/notifications/unread-count');

export const markNotificationsRead = (ids?: string[]) =>
  jsonFetch<{ success: boolean }>('/api/notifications/mark-read', {
    method: 'POST',
    body: JSON.stringify(ids ? { ids } : {}),
  });

/** Relative time label ("3m ago") used across cards and threads. */
export function timeAgo(iso: string): string {
  const seconds = Math.max(1, Math.floor((Date.now() - new Date(iso).getTime()) / 1000));
  if (seconds < 60) return 'just now';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return new Date(iso).toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
}
