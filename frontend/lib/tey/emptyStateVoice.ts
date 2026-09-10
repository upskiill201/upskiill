/**
 * Tey's voice for learner-facing empty states — the dashboard surfaces that
 * already show `TeyMascot` as the `EmptyState` icon (feed, communities, a
 * single community's post list) but paired it with one fixed description
 * string. Creator-dashboard empty states (a different `EmptyState` component
 * in `components/creator/analytics/bits.tsx`) are deliberately left in their
 * plain, professional register — that's a business tool for instructors, not
 * a learner-facing surface Tey belongs on.
 */

import { pickFromPool } from './pool';

const FEED_EMPTY = [
  'Join a course community and the best discussions, wins and announcements will gather here.',
  'Nothing here yet — join a community and this fills up fast.',
  "Quiet for now. Enroll in a course and I'll bring the feed to life.",
];

const COMMUNITIES_EMPTY = [
  "Enroll in a course and its community shows up here automatically.",
  "No communities yet — that's one enrollment away.",
  "Join a course and I'll bring the community straight here.",
];

const COMMUNITY_POSTS_LESSON_EMPTY = [
  'No discussions for this lesson yet — be the first to ask something.',
  'Nobody has asked about this lesson yet. Yours would be first.',
];

const COMMUNITY_POSTS_FILTER_EMPTY = [
  'No posts in this category yet. Yours would be the first.',
  'Empty category — for now. Change that?',
];

const COMMUNITY_POSTS_GENERAL_EMPTY = [
  'No posts yet — be the first. Ask a question or share what you are learning.',
  "It's quiet in here. Say something — a question, a win, anything.",
];

export function pickFeedEmptyLine(): string {
  return pickFromPool(FEED_EMPTY, 'empty:feed');
}

export function pickCommunitiesEmptyLine(): string {
  return pickFromPool(COMMUNITIES_EMPTY, 'empty:communities');
}

export type CommunityPostsEmptyContext = 'lesson' | 'filter' | 'general';

export function pickCommunityPostsEmptyLine(context: CommunityPostsEmptyContext): string {
  const pool =
    context === 'lesson'
      ? COMMUNITY_POSTS_LESSON_EMPTY
      : context === 'filter'
        ? COMMUNITY_POSTS_FILTER_EMPTY
        : COMMUNITY_POSTS_GENERAL_EMPTY;
  return pickFromPool(pool, `empty:community-posts-${context}`);
}
