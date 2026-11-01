/**
 * Shareable milestone cards — the shapes shared by the share sheet (client),
 * the public page /s/[slug] and the image route /s/[slug]/image (server).
 * Every number in `data` is the server's snapshot (backend/src/share-card).
 */

export type ShareKind =
  | 'STREAK'
  | 'LESSONS'
  | 'COURSE_STARTED'
  | 'CHAPTER_COMPLETE'
  | 'COURSE_COMPLETE'
  | 'LEAGUE'
  | 'ACHIEVEMENT';

/** What the share button asks the server to snapshot. */
export interface ShareCardRequest {
  kind: ShareKind;
  courseId?: string;
  sectionId?: string;
  weekStart?: string;
  badgeId?: string;
  tier?: number;
}

export type ShareFormat = 'story' | 'square';

export const SHARE_FORMATS: Record<ShareFormat, { width: number; height: number; label: string }> = {
  story: { width: 1080, height: 1920, label: 'Story' },
  square: { width: 1080, height: 1080, label: 'Post' },
};

export interface StreakData { days: number; xp: number; lessons: number; longest: number }
export interface LessonsData { count: number; courseTitle: string; xp: number; coins: number; streakDays: number }
export interface CourseStartedData { courseTitle: string; thumbnailUrl: string | null; category: string; isOriginal: boolean }
export interface ChapterData {
  courseTitle: string;
  sectionTitle: string;
  chapterNumber: number;
  chaptersDone: number;
  chaptersTotal: number;
  percent: number;
}
export interface CourseCompleteData { courseTitle: string; lessons: number; minutes: number; xp: number; completedAt: string }
export interface LeagueData {
  league: string;
  rank: number;
  weeklyXp: number;
  outcome: string | null;
  cohortSize: number | null;
  weekStart: string;
}
export interface AchievementData {
  badgeId: string;
  title: string;
  tierName: string;
  tier: number;
  maxTier: number;
  description: string;
  badgeBg?: string;
}

/** GET /share-cards/:slug — the public snapshot behind a share link. */
export type PublicShareCard = {
  slug: string;
  name: string;
  createdAt: string;
  refCode: string | null;
} & (
  | { kind: 'STREAK'; data: StreakData }
  | { kind: 'LESSONS'; data: LessonsData }
  | { kind: 'COURSE_STARTED'; data: CourseStartedData }
  | { kind: 'CHAPTER_COMPLETE'; data: ChapterData }
  | { kind: 'COURSE_COMPLETE'; data: CourseCompleteData }
  | { kind: 'LEAGUE'; data: LeagueData }
  | { kind: 'ACHIEVEMENT'; data: AchievementData }
);

/** POST /share-cards — the learner's own card. */
export interface CreatedShareCard {
  slug: string;
  kind: ShareKind;
  data: PublicShareCard['data'];
  rewardAvailable: boolean;
  rewardCoins: number;
}

/** POST /share-cards/:slug/shared */
export type ShareReward =
  | { rewarded: true; coins: number; balance: number }
  | { rewarded: false; reason: 'ALREADY_REWARDED' | 'DAILY_CAP'; coins: 0 };

// ─── Which moments get a share button (mirrors share-card.milestones.ts) ────

const STREAK_STEPS = [3, 7, 14, 30, 50, 100, 150, 200, 250, 300, 365];
const LESSON_STEPS = [5, 10, 25, 50, 100, 150, 200, 300, 500];

export function isStreakMilestone(days: number): boolean {
  if (STREAK_STEPS.includes(days)) return true;
  return days > 365 && (days % 100 === 0 || days % 365 === 0);
}

export function isLessonMilestone(count: number): boolean {
  return LESSON_STEPS.includes(count);
}

/** Podium finishes and promotions are worth sharing; a quiet week isn't. */
export function isShareableLeague(rank: number | null | undefined, outcome: string | null | undefined): boolean {
  return (typeof rank === 'number' && rank >= 1 && rank <= 3) || outcome === 'PROMOTED' || outcome === 'CHAMPION';
}

export function shareUrl(slug: string, origin = 'https://teyro.app'): string {
  return `${origin}/s/${slug}`;
}

export function shareImagePath(slug: string, format: ShareFormat): string {
  return `/s/${slug}/image?format=${format}`;
}

const LEAGUE_NAMES: Record<string, string> = {
  BRONZE: 'Bronze',
  SILVER: 'Silver',
  GOLD: 'Gold',
  SAPPHIRE: 'Sapphire',
  RUBY: 'Ruby',
  EMERALD: 'Emerald',
  AMETHYST: 'Amethyst',
  PEARL: 'Pearl',
  DIAMOND: 'Diamond',
  DIAMOND_TOURNAMENT: 'Diamond Tournament',
};

export function leagueName(tier: string): string {
  return LEAGUE_NAMES[tier] ?? 'Teyro';
}

export function ordinal(n: number): string {
  const s = ['th', 'st', 'nd', 'rd'];
  const v = n % 100;
  return `${n}${s[(v - 20) % 10] || s[v] || s[0]}`;
}

/** One line that describes the milestone — the share text and the page title. */
export function shareHeadline(card: PublicShareCard): string {
  switch (card.kind) {
    case 'STREAK':
      return `${card.data.days}-day learning streak on Teyro`;
    case 'LESSONS':
      return `${card.data.count} lessons done in ${card.data.courseTitle}`;
    case 'COURSE_STARTED':
      return `Just started ${card.data.courseTitle} on Teyro`;
    case 'CHAPTER_COMPLETE':
      return `Finished Chapter ${card.data.chapterNumber} of ${card.data.courseTitle}`;
    case 'COURSE_COMPLETE':
      return `Finished ${card.data.courseTitle} on Teyro`;
    case 'LEAGUE':
      return card.data.rank <= 3
        ? `${ordinal(card.data.rank)} place in the ${leagueName(card.data.league)} League on Teyro`
        : `Promoted from the ${leagueName(card.data.league)} League on Teyro`;
    case 'ACHIEVEMENT':
      return `Unlocked ${card.data.title}: ${card.data.tierName} on Teyro`;
  }
}

/** Pre-filled text for the share sheet, written as the learner. */
export function shareMessage(card: Pick<PublicShareCard, 'kind' | 'data'>): string {
  const c = card as PublicShareCard;
  switch (c.kind) {
    case 'STREAK':
      return `${c.data.days} days in a row learning on Teyro. Come learn with me!`;
    case 'LESSONS':
      return `${c.data.count} lessons done in ${c.data.courseTitle} on Teyro. Join me!`;
    case 'COURSE_STARTED':
      return `I just started ${c.data.courseTitle} on Teyro. Learn it with me!`;
    case 'CHAPTER_COMPLETE':
      return `Chapter ${c.data.chapterNumber} of ${c.data.courseTitle}: done. Learning on Teyro.`;
    case 'COURSE_COMPLETE':
      return `I finished ${c.data.courseTitle} on Teyro! Start it free.`;
    case 'LEAGUE':
      return c.data.rank <= 3
        ? `${ordinal(c.data.rank)} place in my ${leagueName(c.data.league)} League this week on Teyro.`
        : `Promoted this week on Teyro. Come race me in the league!`;
    case 'ACHIEVEMENT':
      return `Just unlocked ${c.data.title} on Teyro. Learn with me!`;
  }
}
