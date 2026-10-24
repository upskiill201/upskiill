/**
 * What the learner wants to achieve: onboarding v3's first real question
 * ("the job, not the course"). The answer drives which categories come
 * first, Tey's lines, the projection, and the paywall headline ("Ada, your
 * plan to land a tech job"), so it lives in one place.
 *
 * `categories` are Course.category values, best first. They must match the
 * live catalog's categories (backend/originals tracks + creator courses).
 */

export type GoalId =
  | 'tech-job'
  | 'grow-at-work'
  | 'build-my-own'
  | 'money'
  | 'lead-team'
  | 'speak-confidently'
  | 'keep-up-ai'
  | 'stay-sharp';

export interface Goal {
  id: GoalId;
  /** The option on the goal screen. */
  label: string;
  /** Finishes "your plan to …" in the paywall headline. */
  phrase: string;
  /** Lucide icon name, resolved by the screen. */
  icon: 'Briefcase' | 'TrendingUp' | 'Rocket' | 'PiggyBank' | 'Users' | 'Mic' | 'Bot' | 'Brain';
  categories: string[];
}

export const GOALS: Goal[] = [
  {
    id: 'tech-job',
    label: 'Land a job in tech',
    phrase: 'land a job in tech',
    icon: 'Briefcase',
    categories: ['Coding', 'AI', 'Career'],
  },
  {
    id: 'grow-at-work',
    label: 'Grow in my career',
    phrase: 'grow in your career',
    icon: 'TrendingUp',
    categories: ['Career', 'Communication', 'Leadership & Management', 'AI'],
  },
  {
    id: 'build-my-own',
    label: 'Build my own thing',
    phrase: 'build your own thing',
    icon: 'Rocket',
    categories: ['Business', 'Coding', 'AI'],
  },
  {
    id: 'money',
    label: 'Get better with money',
    phrase: 'take control of your money',
    icon: 'PiggyBank',
    categories: ['Personal Finance', 'Business'],
  },
  {
    id: 'lead-team',
    label: 'Lead a team',
    phrase: 'lead a team',
    icon: 'Users',
    categories: ['Leadership & Management', 'Negotiation & Conflict', 'Communication'],
  },
  {
    id: 'speak-confidently',
    label: 'Speak with confidence',
    phrase: 'speak with confidence',
    icon: 'Mic',
    categories: ['Communication', 'Negotiation & Conflict', 'Career'],
  },
  {
    id: 'keep-up-ai',
    label: 'Keep up with AI',
    phrase: 'keep up with AI',
    icon: 'Bot',
    categories: ['AI', 'Coding'],
  },
  {
    id: 'stay-sharp',
    label: 'Keep my brain sharp',
    phrase: 'keep your brain sharp',
    icon: 'Brain',
    categories: ['Coding', 'AI', 'Personal Finance', 'Communication'],
  },
];

export function goalById(id: unknown): Goal | null {
  return GOALS.find((g) => g.id === id) ?? null;
}
