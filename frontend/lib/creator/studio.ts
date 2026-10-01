/**
 * Creator studio data: the shapes the analytics, learners and community
 * pages read, the SWR keys they share, and the one fetcher. Server shapes
 * live in backend/src/analytics/course-pulse.service.ts,
 * backend/src/students/nudges.service.ts and
 * backend/src/community/community-admin.service.ts.
 */

import { extractErrorMessage } from '@/lib/apiError';

export async function studioFetch<T>(url: string): Promise<T> {
  const res = await fetch(url, { credentials: 'include', cache: 'no-store' });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(extractErrorMessage(data, res.status));
  return data as T;
}

export async function studioSend<T>(url: string, method: 'POST' | 'PATCH' | 'PUT' | 'DELETE', body?: unknown): Promise<T> {
  const res = await fetch(url, {
    method,
    credentials: 'include',
    headers: body === undefined ? undefined : { 'Content-Type': 'application/json' },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(extractErrorMessage(data, res.status));
  return data as T;
}

/* ── keys ─────────────────────────────────────────────────────────────── */

export const studioKeys = {
  courses: '/api/courses/instructor/me',
  pulse: (courseId: string, range: number) => `/api/analytics/courses/${encodeURIComponent(courseId)}/pulse?range=${range}`,
  lesson: (courseId: string, lessonId: string) =>
    `/api/analytics/courses/${encodeURIComponent(courseId)}/lessons/${encodeURIComponent(lessonId)}/insight`,
  badges: '/api/analytics/instructor/badges',
  home: '/api/analytics/instructor/home',
  notifications: (unreadOnly = false, pageSize = 20) =>
    `/api/notifications?scope=creator&page=1&pageSize=${pageSize}${unreadOnly ? '&unreadOnly=true' : ''}`,
  unread: '/api/notifications/unread-count?scope=creator',
  nudges: (q = '') => `/api/students/nudges${q}`,
  communities: '/api/communities/manage',
  communityPosts: (id: string, tab: string) => `/api/communities/${encodeURIComponent(id)}/manage/posts?tab=${tab}`,
  communityMembers: (id: string, search: string, filter: string) =>
    `/api/communities/${encodeURIComponent(id)}/manage/members?search=${encodeURIComponent(search)}&filter=${filter}`,
};

/* ── shapes ───────────────────────────────────────────────────────────── */

export interface Face {
  id: string;
  fullName: string;
  avatarUrl: string | null;
}

export interface StudioCourse {
  id: string;
  title: string;
  category: string | null;
  thumbnailUrl: string | null;
  published: boolean;
  _count?: { enrollments?: number };
}

export interface Stat {
  value: number;
  prev: number;
  deltaPct: number;
}

export interface PathLesson {
  id: string;
  title: string;
  index: number;
  isFree: boolean;
  estMinutes: number | null;
  reached: number;
  opened: number;
  finished: number;
  finishRatePct: number | null;
  stoppedHere: number;
  hereNow: Face[];
  hereNowCount: number;
  avgAccuracyPct: number | null;
  medianMinutes: number | null;
  quits: number;
  flag: 'drop' | 'hard' | 'slow' | null;
}

export interface Callout {
  id: string;
  tone: 'good' | 'warn' | 'bad' | 'info';
  icon: 'drop' | 'hard' | 'slow' | 'quiet' | 'almost' | 'question' | 'paywall' | 'up' | 'share' | 'new';
  title: string;
  body: string;
  action?: {
    kind: 'lesson' | 'nudge' | 'cheer' | 'community' | 'coupon' | 'share';
    label: string;
    lessonId?: string;
    learnerIds?: string[];
    faces?: Face[];
  };
}

export interface CoursePulse {
  course: {
    id: string;
    title: string;
    category: string | null;
    thumbnailUrl: string | null;
    published: boolean;
    isPaid: boolean;
    lessonCount: number;
    freeLessons: number;
  };
  range: 7 | 30 | 90;
  totals: {
    learners: number;
    newLearners: Stat;
    lessonsFinished: Stat;
    activeLearners: number;
    startedLearners: number;
    finishedCourse: number;
    completionRatePct: number;
    avgAccuracyPct: number | null;
    paidLearners: number;
    rating: { avg: number | null; count: number };
  };
  path: { units: { id: string; title: string; index: number; lessons: PathLesson[] }[] };
  callouts: Callout[];
  series: { bucketDays: number; points: { start: string; finished: number; joined: number }[] };
  when: {
    weekdays: { label: string; count: number }[];
    dayparts: { key: string; label: string; hours: string; count: number }[];
    sample: number;
  };
  reviews: { id: string; rating: number; comment: string; createdAt: string; author: Face }[];
  ratingBreakdown: { stars: number; count: number }[];
  community: { id: string; members: number; postsInRange: number; unanswered: number } | null;
}

export interface LessonInsight {
  course: { id: string; title: string; communityId: string | null };
  lesson: {
    id: string;
    title: string;
    index: number;
    unitTitle: string;
    isFree: boolean;
    estMinutes: number | null;
    total: number;
    prev: { id: string; title: string } | null;
    next: { id: string; title: string } | null;
  };
  funnel: {
    reached: number;
    opened: number;
    finished: number;
    finishRatePct: number | null;
    stuckNow: number;
    quits: number;
    reopens: number;
  };
  timing: { medianMinutes: number | null; p75Minutes: number | null; estMinutes: number | null; samples: number };
  accuracy: { avgPct: number | null; perfectPct: number | null; samples: number };
  exercises: {
    id: string;
    number: number;
    kind: string;
    prompt: string;
    attempts: number;
    missed: number;
    missRatePct: number | null;
  }[];
  stops: { key: string; phase: string; label: string; order: number; count: number }[];
  stuck: (Face & {
    openedAt: string | null;
    lastSeenAt: string;
    opens: number;
    quits: number;
    stoppedAt: string | null;
    lastNudgedAt: string | null;
  })[];
  questions: {
    id: string;
    title: string | null;
    excerpt: string;
    postType: string;
    commentCount: number;
    createdAt: string;
    author: Face;
    answeredByYou: boolean;
  }[];
}

export interface NudgeRecord {
  id: string;
  learnerId: string;
  courseId: string;
  courseTitle: string;
  kind: 'NUDGE' | 'CHEER';
  message: string;
  createdAt: string;
}

export interface Badges {
  learners: number;
  community: number;
}

/* ── studio home (backend/src/analytics/studio-home.service.ts) ───────── */

export type HomeTodoKind =
  | 'fix_review'
  | 'questions'
  | 'nudge'
  | 'publish'
  | 'continue_draft'
  | 'submit'
  | 'share'
  | 'profile'
  | 'payouts'
  | 'first_course';

export interface HomeTodo {
  id: string;
  kind: HomeTodoKind;
  tone: 'bad' | 'warn' | 'good' | 'info';
  title: string;
  body: string;
  cta: string;
  href: string;
  count?: number;
  faces?: Face[];
  courseId?: string;
}

export interface HomeCourse {
  id: string;
  title: string;
  category: string | null;
  thumbnailUrl: string | null;
  stage: 'live' | 'draft' | 'in_review' | 'changes' | 'approved' | 'rejected';
  lessons: { total: number; published: number };
  learners: number;
  newThisWeek: number;
  activeThisWeek: number;
  finishedCourse: number;
  completionPct: number;
  rating: { avg: number | null; count: number };
  waiting: { questions: number; quiet: number };
  updatedAt: string;
}

export interface HomeActivity {
  id: string;
  kind: 'joined' | 'lesson' | 'finished' | 'sale' | 'question';
  at: string;
  who: Face;
  courseId: string;
  courseTitle: string;
  detail: string | null;
  href: string;
}

export interface StudioHome {
  week: {
    newLearners: Stat;
    lessonsFinished: Stat;
    activeLearners: Stat;
    earnedMinor: Stat;
    sales: number;
    days: { day: string; lessons: number; joined: number }[];
  };
  totals: { learners: number; liveCourses: number; courses: number; rating: { avg: number | null; count: number } };
  todos: HomeTodo[];
  courses: HomeCourse[];
  activity: HomeActivity[];
  setup: { hasAvatar: boolean; hasBio: boolean; hasPayoutMethod: boolean; username: string | null };
}

/* ── studio notifications (scope=creator) ─────────────────────────────── */

export interface StudioNotification {
  id: string;
  type: string;
  title: string | null;
  body: string | null;
  isRead: boolean;
  createdAt: string;
  actor: Face | null;
  deepLink: string | null;
  url: string | null;
}

export interface NotificationPage {
  total: number;
  items: StudioNotification[];
}

export async function markStudioRead(ids?: string[]) {
  return studioSend<{ success: boolean }>('/api/notifications/mark-read', 'POST', ids ? { ids } : { scope: 'creator' });
}

export function money(minor: number): string {
  const v = minor / 100;
  return `$${v.toLocaleString(undefined, { minimumFractionDigits: v % 1 === 0 ? 0 : 2, maximumFractionDigits: 2 })}`;
}

/* ── formatting ───────────────────────────────────────────────────────── */

export const EXERCISE_KIND_LABEL: Record<string, string> = {
  mcq: 'Multiple choice',
  predictOutput: 'Predict the output',
  pickPrompt: 'Pick the better prompt',
  fillBlank: 'Fill in the blanks',
  findBug: 'Find the bug',
  orderLines: 'Put in order',
  matchPairs: 'Match the pairs',
};

export function compact(n: number): string {
  if (Math.abs(n) >= 1_000_000) return `${(n / 1_000_000).toFixed(1).replace(/\.0$/, '')}M`;
  if (Math.abs(n) >= 10_000) return `${Math.round(n / 1000)}K`;
  if (Math.abs(n) >= 1000) return `${(n / 1000).toFixed(1).replace(/\.0$/, '')}K`;
  return n.toLocaleString();
}

/** "just now", "3h ago", "2d ago", then a date. */
export function ago(iso: string | Date | null | undefined): string {
  if (!iso) return 'never';
  const t = typeof iso === 'string' ? Date.parse(iso) : iso.getTime();
  const m = Math.round((Date.now() - t) / 60000);
  if (m < 2) return 'just now';
  if (m < 60) return `${m}m ago`;
  const h = Math.round(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.round(h / 24);
  if (d < 14) return `${d}d ago`;
  return new Date(t).toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
}

export function firstName(fullName: string): string {
  return fullName.trim().split(/\s+/)[0] || fullName;
}

/** The public course page, with a coupon code riding along when given. */
export function courseShareUrl(courseId: string, code?: string): string {
  const origin = typeof window !== 'undefined' ? window.location.origin : 'https://teyro.app';
  return `${origin}/courses/${courseId}${code ? `?code=${encodeURIComponent(code)}` : ''}`;
}
