/**
 * Profile-step helpers for creator onboarding: a username suggestion from the
 * creator's name and headline ideas written from their answers. The server
 * re-validates whatever is finally saved.
 */

import { trackLabel, topicLabel } from '@/lib/creator/categories';
import type { CreatorAnswers } from './catalog';

/** Profile.headline's limit (UpdateProfileDto). */
export const HEADLINE_MAX = 120;

/** "Ada Lovelace" → "adalovelace" (the server re-validates everything). */
export function suggestUsername(name: string | undefined): string {
  return (name ?? '')
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[^a-z0-9]+/g, '')
    .slice(0, 24);
}

export function headlineIdeas(a: CreatorAnswers): string[] {
  const track = trackLabel(a.track) || 'Coding';
  const topic = a.topics?.[0] ? topicLabel(a.track, a.topics[0]) : '';
  const role =
    {
      'course-creator': 'Course creator',
      'content-creator': 'Creator',
      teacher: 'Teacher',
      mentor: 'Mentor',
      engineer: a.track === 'ai' ? 'AI engineer' : 'Software engineer',
      'new-creator': `${track} enthusiast`,
    }[a.creatorType ?? 'new-creator'] ?? 'Creator';
  const ideas = [
    `${role} teaching ${track}`,
    topic ? `I teach ${topic}, one fun lesson at a time` : `${track}, one fun lesson at a time`,
    a.track === 'ai' ? 'Helping people put AI to work' : 'Helping people build real things with code',
  ];
  return Array.from(new Set(ideas)).filter((i) => i.length <= HEADLINE_MAX);
}
