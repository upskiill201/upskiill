/**
 * Where this lesson sits on the learner's journey, read from the home path
 * the player already has cached (GET /courses/:id/path).
 *
 * Every motivating moment in a lesson leans on it:
 *  - the start screen ("Lesson 5 of 10 · 2 to the Checkpoint");
 *  - the quit sheet ("finish to unlock Lesson 6");
 *  - the finish ("chapter 6/10 filled, Lesson 6 unlocked, here's what's in it").
 *
 * Research behind it: people speed up as a goal gets close (goal-gradient;
 * Kivetz, Urminsky & Zheng 2006), and progress they can see makes them more
 * likely to finish (endowed progress; Nunes & Drèze 2006). A lesson that only
 * knows about itself can't use either. This one knows the chapter.
 *
 * Pure: no React, no fetch. Tests pin the rules.
 */

import type { LearningPath, PathLesson } from '@/hooks/useCourse';
import type { LessonMilestone } from '@/lib/originals';

export type JourneyNodeState = 'done' | 'current' | 'locked';

export interface JourneyNode {
  id: string;
  title: string;
  state: JourneyNodeState;
  milestone: LessonMilestone | null;
}

export interface NextLesson {
  id: string;
  title: string;
  summary: string | null;
  sectionIndex: number;
  milestone: LessonMilestone | null;
  /** Opening it starts a new chapter. */
  newChapter: boolean;
  chapterTitle: string;
  marker: string | null;
  /** Behind the paywall for this learner. */
  locked: boolean;
  xp: number | null;
  minutes: number | null;
}

export type GoalKind = 'checkpoint' | 'challenge' | 'chapterEnd';

export interface ChapterGoal {
  kind: GoalKind;
  /** "Checkpoint", "Unit Challenge", "End of chapter". */
  label: string;
  /** Lessons still to finish to reach it, counting the goal lesson itself. */
  lessonsAway: number;
}

export interface LessonJourney {
  sectionIndex: number;
  chapterTitle: string;
  /** Originals: "5 weeks to go", "Caller 2: Arjun"… */
  marker: string | null;
  /** 1-based position of this lesson in its chapter. */
  lessonNumber: number;
  lessonsInChapter: number;
  /** Finished in this chapter before this lesson (this one excluded). */
  doneBefore: number;
  nodes: JourneyNode[];
  /** The lesson after this one, across chapters; null at the very end. */
  next: NextLesson | null;
  /** The nearest milestone ahead, counted as if THIS lesson is finished. */
  goal: ChapterGoal | null;
  /** This is the chapter's last lesson. */
  endsChapter: boolean;
  /** This is the course's last lesson. */
  endsCourse: boolean;
  courseDone: number;
  courseTotal: number;
  milestone: LessonMilestone | null;
}

const MILESTONE_GOAL: Record<LessonMilestone, { kind: GoalKind; label: string }> = {
  CHECKPOINT: { kind: 'checkpoint', label: 'Checkpoint' },
  UNIT_CHALLENGE: { kind: 'challenge', label: 'Unit Challenge' },
};

function isLocked(path: LearningPath, l: PathLesson): boolean {
  if (path.access?.hasAccess) return false;
  if (l.isFreePreview) return false;
  return !(path.access?.freePreviewLessonIds ?? []).includes(l.id);
}

export function lessonJourney(path: LearningPath | null | undefined, lessonId: string): LessonJourney | null {
  if (!path?.sections?.length) return null;
  const sectionIndex = path.sections.findIndex((s) => s.lessons.some((l) => l.id === lessonId));
  if (sectionIndex < 0) return null;
  const section = path.sections[sectionIndex];
  const index = section.lessons.findIndex((l) => l.id === lessonId);
  const done = new Set(path.completedLessons ?? []);
  done.delete(lessonId);

  const nodes: JourneyNode[] = section.lessons.map((l, i) => ({
    id: l.id,
    title: l.title,
    state: i === index ? 'current' : done.has(l.id) ? 'done' : 'locked',
    milestone: l.milestone ?? null,
  }));

  // The next lesson: the rest of this chapter, then the next chapter's first.
  let next: NextLesson | null = null;
  const after = section.lessons[index + 1];
  if (after) {
    next = {
      id: after.id,
      title: after.title,
      summary: after.shortDescription,
      sectionIndex,
      milestone: after.milestone ?? null,
      newChapter: false,
      chapterTitle: section.title,
      marker: section.marker ?? null,
      locked: isLocked(path, after),
      xp: after.xpReward,
      minutes: after.durationMinutes,
    };
  } else {
    for (let s = sectionIndex + 1; s < path.sections.length && !next; s++) {
      const first = path.sections[s].lessons[0];
      if (!first) continue;
      next = {
        id: first.id,
        title: first.title,
        summary: first.shortDescription,
        sectionIndex: s,
        milestone: first.milestone ?? null,
        newChapter: true,
        chapterTitle: path.sections[s].title,
        marker: path.sections[s].marker ?? null,
        locked: isLocked(path, first),
        xp: first.xpReward,
        minutes: first.durationMinutes,
      };
    }
  }

  // The nearest milestone after this lesson; else the chapter's end.
  let goal: ChapterGoal | null = null;
  for (let i = index + 1; i < section.lessons.length; i++) {
    const m = section.lessons[i].milestone;
    if (m) {
      goal = { ...MILESTONE_GOAL[m], lessonsAway: i - index };
      break;
    }
  }
  if (!goal && index < section.lessons.length - 1) {
    goal = { kind: 'chapterEnd', label: 'End of chapter', lessonsAway: section.lessons.length - 1 - index };
  }

  const all = path.sections.flatMap((s) => s.lessons);
  const lastSectionWithLessons = path.sections.map((s) => s.lessons.length > 0).lastIndexOf(true);

  return {
    sectionIndex,
    chapterTitle: section.title,
    marker: section.marker ?? null,
    lessonNumber: index + 1,
    lessonsInChapter: section.lessons.length,
    doneBefore: section.lessons.filter((l) => done.has(l.id)).length,
    nodes,
    next,
    goal,
    endsChapter: index === section.lessons.length - 1,
    endsCourse: index === section.lessons.length - 1 && sectionIndex === lastSectionWithLessons,
    courseDone: all.filter((l) => done.has(l.id)).length,
    courseTotal: all.length,
    milestone: section.lessons[index].milestone ?? null,
  };
}

/** "2 lessons to the Checkpoint", "Next up: the Unit Challenge". */
export function goalLine(goal: ChapterGoal | null): string | null {
  if (!goal) return null;
  if (goal.lessonsAway <= 1) return goal.kind === 'chapterEnd' ? 'Next lesson ends the chapter' : `Next up: the ${goal.label}`;
  const n = goal.lessonsAway;
  return goal.kind === 'chapterEnd' ? `${n} lessons to the end of the chapter` : `${n} lessons to the ${goal.label}`;
}
