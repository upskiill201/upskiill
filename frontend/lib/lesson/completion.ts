/**
 * What a finished lesson means beyond the lesson, read from the server's
 * complete-lesson response. Every number is the server's.
 *
 * The payoff plays inside the lesson player (components/lesson/outro):
 * lesson complete → streak → daily quests → unit/course complete. This file
 * turns the response into what those screens need, plus the one milestone
 * that stays a full celebration scene: being welcomed into the course
 * community.
 */

import type { CelebrationScene } from '@/context/CelebrationContext';

/* eslint-disable @typescript-eslint/no-explicit-any -- server payload */

export interface UnitSummary {
  sectionId: string;
  sectionIndex: number;
  unitLabel: string;
  title: string;
  lessonsCompleted: number;
  lessonsTotal: number;
  bonusXp: number;
  /** This was the course's last unit. */
  courseComplete: boolean;
  courseTitle: string;
  sectionsCompleted: number;
  sectionsTotal: number;
  courseLessonsCompleted: number;
  courseLessonsTotal: number;
  /** Index of the unit that just opened, when there is one. */
  nextSectionIndex: number | null;
}

/** The unit this lesson finished, if it was the unit's last. */
export function unitSummary(data: any): UnitSummary | null {
  const sc = data?.sectionCompletion;
  if (!sc?.section) return null;
  return {
    sectionId: sc.section.id,
    sectionIndex: sc.section.index,
    unitLabel: `Unit ${sc.section.index + 1}`,
    title: sc.section.title,
    lessonsCompleted: sc.section.lessonsCompleted,
    lessonsTotal: sc.section.lessonsTotal,
    bonusXp: sc.rewards?.bonusXp ?? 0,
    courseComplete: Boolean(sc.isFinalSection || !sc.nextSection),
    courseTitle: sc.course.title,
    sectionsCompleted: sc.course.sectionsCompleted,
    sectionsTotal: sc.course.sectionsTotal,
    courseLessonsCompleted: sc.course.lessonsCompleted,
    courseLessonsTotal: sc.course.lessonsTotal,
    nextSectionIndex: sc.nextSection ? sc.nextSection.index : null,
  };
}

/**
 * Saves the unit's real numbers for the section map's chest, which replays
 * them later (the bonus XP was already paid at this completion).
 */
export function stashSectionChest(data: any, streakFallback: number) {
  const sc = data?.sectionCompletion;
  if (!sc?.section) return;
  try {
    localStorage.setItem(
      `teyro_section_chest_${sc.section.id}`,
      JSON.stringify({
        courseTitle: sc.course.title,
        sectionTitle: sc.section.title,
        sectionIndexLabel: `UNIT ${sc.section.index + 1}`,
        sectionProgress: {
          lessonsCompleted: sc.section.lessonsCompleted,
          lessonsTotal: sc.section.lessonsTotal,
          ...(sc.section.activitiesTotal > 0 && {
            activitiesCompleted: sc.section.activitiesCompleted,
            activitiesTotal: sc.section.activitiesTotal,
          }),
        },
        results: {
          xpEarned: typeof data.xpEarned === 'number' ? data.xpEarned : 0,
          bonusXp: sc.rewards.bonusXp,
          coinsEarned: typeof data.coinsEarned === 'number' ? data.coinsEarned : 0,
          streakDays: data.newStreakDays ?? streakFallback,
        },
        savedAt: Date.now(),
      }),
    );
  } catch {
    // Storage full/blocked — the chest falls back to an honest toast.
  }
}

/** Seated in the course community on their second lesson — once. */
export function communityScene(data: any, onEnter: (courseId: string) => void): CelebrationScene | null {
  const cu = data?.communityUnlock;
  if (!cu) return null;
  return {
    kind: 'COMMUNITY_WELCOME',
    communityId: cu.communityId,
    courseId: cu.courseId,
    name: cu.name,
    courseTitle: cu.courseTitle,
    thumbnailUrl: cu.thumbnailUrl ?? null,
    memberCount: cu.memberCount,
    postCount: cu.postCount,
    instructor: cu.instructor ?? null,
    members: cu.members ?? [],
    samplePost: cu.samplePost ?? null,
    onEnter: () => onEnter(cu.courseId),
    dedupeKey: `community-welcome-${cu.communityId}`,
  };
}
