/**
 * Help & feedback — shapes, keys and copy shared by the learner help page
 * (/dashboard/help), the creator one (/creator/help) and the admin inbox.
 * Server: backend/src/support.
 */

import { extractErrorMessage } from '@/lib/apiError';

export type SupportAudience = 'LEARNER' | 'CREATOR';
export type SupportKind = 'FEEDBACK' | 'IDEA' | 'BUG' | 'HELP' | 'ACCOUNT' | 'PAYMENT' | 'COURSE';
export type SupportStatus = 'OPEN' | 'ANSWERED' | 'CLOSED';

export interface Face {
  id: string;
  fullName: string;
  avatarUrl: string | null;
}

export interface TicketSummary {
  id: string;
  publicId: string;
  kind: SupportKind;
  subject: string;
  status: SupportStatus;
  userUnread: boolean;
  lastActivityAt: string;
  createdAt: string;
  messages: number;
  preview: { text: string; fromTeyro: boolean } | null;
}

export interface TicketMessage {
  id: string;
  fromTeyro: boolean;
  message: string;
  createdAt: string;
  author: Face | null;
}

export interface TicketThread {
  id: string;
  publicId: string;
  audience: SupportAudience;
  kind: SupportKind;
  subject: string;
  status: SupportStatus;
  mood: number | null;
  pagePath: string | null;
  createdAt: string;
  lastActivityAt: string;
  replies: TicketMessage[];
}

export const supportKeys = {
  list: (a: SupportAudience) => `/api/support/tickets?audience=${a}`,
  unread: (a: SupportAudience) => `/api/support/unread?audience=${a}`,
  thread: (id: string) => `/api/support/tickets/${encodeURIComponent(id)}`,
};

export async function supportFetch<T>(url: string): Promise<T> {
  const res = await fetch(url, { credentials: 'include', cache: 'no-store' });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(extractErrorMessage(data, res.status));
  return data as T;
}

async function send<T>(url: string, body?: unknown): Promise<T> {
  const res = await fetch(url, {
    method: 'POST',
    credentials: 'include',
    headers: body === undefined ? undefined : { 'Content-Type': 'application/json' },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    if (res.status === 429) throw new Error('You’ve sent a few messages in a row. Give it a few minutes, then try again.');
    throw new Error(extractErrorMessage(data, res.status));
  }
  return data as T;
}

export const createTicket = (body: {
  audience: SupportAudience;
  kind: SupportKind;
  subject?: string;
  message: string;
  mood?: number;
  pagePath?: string;
}) => send<{ id: string; publicId: string }>('/api/support/tickets', body);

export const replyTicket = (id: string, message: string) =>
  send<TicketThread>(`/api/support/tickets/${encodeURIComponent(id)}/replies`, { message });

export const closeTicket = (id: string) => send<{ status: 'CLOSED' }>(`/api/support/tickets/${encodeURIComponent(id)}/close`);

/* ── copy ─────────────────────────────────────────────────────────────── */

export const STATUS_LABEL: Record<SupportStatus, { label: string; tone: string }> = {
  OPEN: { label: 'Waiting for Teyro', tone: 'var(--warning)' },
  ANSWERED: { label: 'Teyro replied', tone: 'var(--success-green)' },
  CLOSED: { label: 'Solved', tone: 'var(--text-muted)' },
};

export const KIND_LABEL: Record<SupportKind, string> = {
  FEEDBACK: 'Feedback',
  IDEA: 'Idea',
  BUG: 'Problem',
  HELP: 'Question',
  ACCOUNT: 'Account',
  PAYMENT: 'Payments',
  COURSE: 'Course',
};

/** Help topics a creator picks when asking for help (each maps to a kind). */
export const CREATOR_TOPICS: { kind: SupportKind; label: string }[] = [
  { kind: 'COURSE', label: 'Course review & publishing' },
  { kind: 'PAYMENT', label: 'Earnings & payouts' },
  { kind: 'HELP', label: 'Using the Studio' },
  { kind: 'ACCOUNT', label: 'My account' },
];

export const LEARNER_TOPICS: { kind: SupportKind; label: string }[] = [
  { kind: 'HELP', label: 'Lessons & progress' },
  { kind: 'PAYMENT', label: 'Payments & subscriptions' },
  { kind: 'ACCOUNT', label: 'My account' },
  { kind: 'COURSE', label: 'A course' },
];

export const LEARNER_FAQ = [
  {
    question: 'I lost my streak. Can I get it back?',
    answer:
      'A streak freeze covers a missed day automatically if you have one equipped. If your streak broke, you can repair it for a short time after from your streak screen, using coins. Freezes and repairs are in the Shop.',
  },
  {
    question: 'I ran out of hearts. What now?',
    answer:
      'A heart comes back every 4 hours, or you can refill them all in the Shop with coins. Replaying a lesson you’ve already finished never costs hearts, so it’s a safe way to keep practising.',
  },
  {
    question: 'How do paid courses work?',
    answer:
      'The first two lessons of every paid course are free. To keep going, you subscribe monthly or yearly. You can see and manage your plan from the course page.',
  },
  {
    question: 'How do leagues work?',
    answer:
      'Every week you’re placed with other learners. The XP you earn from lessons moves you up the board. Finish near the top to move up a league; the week resets every Monday.',
  },
  {
    question: 'When can I join a course community?',
    answer: 'After you finish two lessons of a course, its community opens for you. Ask questions, share wins and cheer others on.',
  },
  {
    question: 'How do I change my daily goal or reminders?',
    answer: 'Open Settings from the menu. Your daily goal, sounds and reminder times are all there.',
  },
];

export const CREATOR_FAQ = [
  {
    question: 'How long does course review take?',
    answer:
      'Every course is checked by a Teyro reviewer before it goes live. You’ll get a notification when it’s approved or if changes are needed, with the reviewer’s notes in your course’s Review tab.',
  },
  {
    question: 'How much do I earn, and when do I get paid?',
    answer:
      'You keep 70% of every payment for your course. Each sale clears after 14 days; once $50 or more is available you can request a payout to your bank or mobile money from Earnings.',
  },
  {
    question: 'Why are my first two lessons marked FREE?',
    answer:
      'Every paid course lets learners try the first two lessons free before they subscribe. Make them your best lessons: they’re what turns a visitor into a subscriber.',
  },
  {
    question: 'How long should a video be?',
    answer:
      'A video in a lesson can be up to 15 minutes, but shorter is better. Keep each lesson to one idea, and split longer material across lessons.',
  },
  {
    question: 'Can I edit a course after it’s live?',
    answer:
      'Yes. Open the course from Courses and edit lessons in the lesson builder. While a course is waiting for review, editing is paused until the review ends.',
  },
  {
    question: 'Where do learners ask me questions?',
    answer:
      'In your course community. Unanswered questions show up on your Studio home and as a red dot on Community, so none slip through.',
  },
];
