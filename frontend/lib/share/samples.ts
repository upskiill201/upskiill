import type { PublicShareCard } from './types';

/**
 * Sample cards for the /dev/share-cards bench. The image route serves these
 * for `sample-<kind>` slugs outside production only, so every template can be
 * checked without a database row.
 */
const base = { name: 'Ada Okafor', createdAt: '2026-10-16T10:00:00.000Z', refCode: 'SAMPLE23' };

export const SAMPLE_SHARE_CARDS: Record<string, PublicShareCard> = {
  'sample-streak': { ...base, slug: 'sample-streak', kind: 'STREAK', data: { days: 7, xp: 1240, lessons: 18, longest: 7 } },
  'sample-streak3': { ...base, slug: 'sample-streak3', kind: 'STREAK', data: { days: 3, xp: 320, lessons: 5, longest: 3 } },
  'sample-streak100': { ...base, slug: 'sample-streak100', kind: 'STREAK', data: { days: 100, xp: 18400, lessons: 142, longest: 100 } },
  'sample-lessons': {
    ...base,
    slug: 'sample-lessons',
    kind: 'LESSONS',
    data: { count: 10, courseTitle: 'Python for Beginners', xp: 1240, coins: 320, streakDays: 6 },
  },
  'sample-started': {
    ...base,
    slug: 'sample-started',
    kind: 'COURSE_STARTED',
    data: { courseTitle: 'Python for Beginners', thumbnailUrl: null, category: 'Coding', isOriginal: true },
  },
  'sample-chapter': {
    ...base,
    slug: 'sample-chapter',
    kind: 'CHAPTER_COMPLETE',
    data: { courseTitle: 'Python for Beginners', sectionTitle: 'Money maths', chapterNumber: 3, chaptersDone: 3, chaptersTotal: 8, percent: 38 },
  },
  'sample-complete': {
    ...base,
    slug: 'sample-complete',
    kind: 'COURSE_COMPLETE',
    data: { courseTitle: 'How to Lead Without Being the Boss', lessons: 48, minutes: 720, xp: 6820, completedAt: base.createdAt },
  },
  'sample-league': {
    ...base,
    slug: 'sample-league',
    kind: 'LEAGUE',
    data: { league: 'DIAMOND', rank: 1, weeklyXp: 2450, outcome: 'STAYED', cohortSize: 30, weekStart: '2026-10-12' },
  },
  'sample-promoted': {
    ...base,
    slug: 'sample-promoted',
    kind: 'LEAGUE',
    data: { league: 'GOLD', rank: 6, weeklyXp: 980, outcome: 'PROMOTED', cohortSize: 30, weekStart: '2026-10-12' },
  },
  'sample-achievement': {
    ...base,
    slug: 'sample-achievement',
    kind: 'ACHIEVEMENT',
    data: { badgeId: 'wildfire', title: 'Wildfire', tierName: 'Blaze', tier: 3, maxTier: 5, description: 'Reach a 14-day streak', badgeBg: '#FF4B4B' },
  },
};
