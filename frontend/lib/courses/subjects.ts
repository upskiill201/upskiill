import type { ArtName } from '@/components/art/Art';

/**
 * The subjects Teyro teaches, as a visitor sees them: the homepage's skills
 * grid and the /courses catalogue's sections both read this list, so the two
 * never disagree.
 *
 * `Course.category` is free text. Originals store the catalogue names in
 * backend/originals/tracks ("Coding", "Personal Finance", "Leadership &
 * Management"…); creator courses store "Coding" or "AI". Data is not a
 * category of its own: SQL, data science and machine learning are filed under
 * Coding, so they're pulled out by title, because to a visitor they read as
 * their own subject.
 */

export type SubjectId =
  | 'coding'
  | 'ai'
  | 'data'
  | 'money'
  | 'leadership'
  | 'communication'
  | 'negotiation'
  | 'business'
  | 'career';

export interface Subject {
  id: SubjectId;
  /** Section and card heading. */
  title: string;
  /** Chip label, where space is tight. */
  short: string;
  sub: string;
  art: ArtName;
  /** Two real course names the homepage shows on the card. */
  examples: [string, string];
}

export const SUBJECTS: Subject[] = [
  {
    id: 'coding',
    title: 'Coding',
    short: 'Coding',
    sub: 'From your first line of Python to real mobile apps.',
    art: 'code',
    examples: ['Python for Beginners', 'Mobile Apps with React Native'],
  },
  {
    id: 'ai',
    title: 'AI',
    short: 'AI',
    sub: 'Put AI to work every day, then build with it.',
    art: 'spark',
    examples: ['AI Tools for Everyday Productivity', 'Vibe Coding: Build Apps with AI'],
  },
  {
    id: 'data',
    title: 'Data',
    short: 'Data',
    sub: 'Ask questions of real data and get real answers.',
    art: 'pie',
    examples: ['SQL and Databases for Beginners', 'Machine Learning for Beginners'],
  },
  {
    id: 'money',
    title: 'Personal finance',
    short: 'Money',
    sub: 'Budget, save and grow what you earn.',
    art: 'coins',
    examples: ['Budgeting for Beginners', 'Money Habits That Build Long-Term Wealth'],
  },
  {
    id: 'leadership',
    title: 'Leadership',
    short: 'Leadership',
    sub: 'Lead people, with or without the title.',
    art: 'mountain',
    examples: ['Leadership for Beginners', 'How to Motivate a Team'],
  },
  {
    id: 'communication',
    title: 'Communication',
    short: 'Communication',
    sub: 'Speak, write and pitch so people listen.',
    art: 'mic',
    examples: ['Speak Like a CEO', 'Clear Writing at Work'],
  },
  {
    id: 'negotiation',
    title: 'Negotiation',
    short: 'Negotiation',
    sub: 'Ask for more and handle conflict calmly.',
    art: 'bubbles',
    examples: ['Negotiation Skills for Beginners', 'How to Manage Conflict at Work'],
  },
  {
    id: 'business',
    title: 'Business',
    short: 'Business',
    sub: 'Test an idea and price it before you build.',
    art: 'briefcase',
    examples: ['How to Validate a Business Idea', 'How to Price a Product or Service'],
  },
  {
    id: 'career',
    title: 'Career',
    short: 'Career',
    sub: 'Get the job, then get ahead in it.',
    art: 'badge',
    examples: ['Acing Job Interviews', 'Corporate Jargon'],
  },
];

const DATA_TITLE = /\b(sql|databases?|data science|dataset|machine learning|analytics)\b/i;

/** The subject a course belongs to, or null when nothing fits. */
export function subjectOf(course: { category: string | null; title: string }): SubjectId | null {
  const c = (course.category ?? '').trim().toLowerCase();
  if (!c) return null;
  if (/\bai\b|artificial intelligence/.test(c)) return 'ai';
  if (/financ|money|budget|invest/.test(c)) return 'money';
  if (/lead|manag/.test(c)) return 'leadership';
  if (/negotiat|conflict/.test(c)) return 'negotiation';
  if (/communicat|speak|writ/.test(c)) return 'communication';
  if (/business|entrepreneur|startup|marketing|sales/.test(c)) return 'business';
  if (/career|job|interview/.test(c)) return 'career';
  if (/data|machine learning/.test(c)) return 'data';
  if (/cod|program|develop|software|web|mobile|engineer|python|javascript/.test(c)) {
    return DATA_TITLE.test(course.title) ? 'data' : 'coding';
  }
  return null;
}
