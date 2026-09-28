/** Shapes from backend/src/community/community-admin.service.ts. */

import type { Face } from '@/lib/creator/studio';

export interface ManagedCommunity {
  id: string;
  name: string;
  description: string | null;
  members: number;
  course: { id: string; title: string; category: string | null; thumbnailUrl: string | null; published: boolean };
  postsThisWeek: number;
  unanswered: number;
  muted: number;
}

export interface QueuePost {
  id: string;
  postType: string;
  title: string | null;
  excerpt: string;
  imageCount: number;
  isPinned: boolean;
  isLocked: boolean;
  likeCount: number;
  commentCount: number;
  createdAt: string;
  lastActivityAt: string;
  author: Face & { isCreator: boolean };
  lesson: { id: string; title: string } | null;
  answeredByYou: boolean;
}

export interface QueuePayload {
  tab: string;
  total: number;
  page: number;
  pageSize: number;
  posts: QueuePost[];
}

export interface Member {
  id: string;
  fullName: string;
  avatarUrl: string | null;
  username: string | null;
  streakDays: number;
  level: number;
  isCreator: boolean;
  joinedAt: string;
  mutedUntil: string | null;
}

export interface MembersPayload {
  total: number;
  page: number;
  pageSize: number;
  members: Member[];
}

export const POST_TYPE_LABEL: Record<string, string> = {
  QUESTION: 'Question',
  TIP: 'Tip',
  WIN: 'Win',
  RESOURCE: 'Resource',
  DISCUSSION: 'Discussion',
  POLL: 'Poll',
  ANNOUNCEMENT: 'Announcement',
  CHALLENGE: 'Challenge',
  GENERAL: 'Post',
  PROGRESS: 'Progress',
  MILESTONE: 'Milestone',
  ACHIEVEMENT: 'Achievement',
};

/** Post types with their own illustrated badge in public/art/posts. */
export const POST_ART = new Set(['ANNOUNCEMENT', 'CHALLENGE', 'DISCUSSION', 'POLL', 'QUESTION', 'RESOURCE', 'TIP', 'WIN']);
