/**
 * The home path's rules, as a pure function.
 *
 * Kept out of the component so the rules can be unit-tested and can't drift
 * into JSX conditionals:
 *
 *  - The path is LINEAR across the whole course, like Duolingo's: the first
 *    unfinished lesson (in map order) is the one current node; everything
 *    before it is done-or-skippable, everything after it is locked.
 *  - "Paywalled" is a separate gate from "locked". A lesson you've reached
 *    but haven't paid for is paywalled (tap → unlock page); a lesson you
 *    haven't reached yet is simply locked, paid or not.
 *  - A unit's chest opens only when every lesson in the unit is done.
 *  - Nothing here is invented: no filler "challenge" nodes. The old section
 *    map inserted one after every two lessons that only said "coming soon".
 *
 * This decides what the map DRAWS. The lesson route re-checks sequencing and
 * entitlement on the server, so nothing here is a security boundary.
 */

import type { LearningPath, PathLesson } from '@/hooks/useCourse';

export type NodeState = 'done' | 'current' | 'locked' | 'paywalled';

export interface PathNode {
  lesson: PathLesson;
  state: NodeState;
  /** Position within the unit, 1-based. */
  numberInUnit: number;
  /** Position across the course, 1-based. */
  number: number;
}

export interface PathUnit {
  sectionId: string;
  /** Index into the course's section list — what the lesson route expects. */
  sectionIndex: number;
  /** 1-based, counting only units that have lessons ("Unit 3"). */
  unitNumber: number;
  title: string;
  description: string | null;
  /** A CSS colour (token var). Units cycle through the palette. */
  color: string;
  nodes: PathNode[];
  doneCount: number;
  chest: 'open' | 'locked';
}

export interface PathModel {
  units: PathUnit[];
  /** The one lesson the learner should take next; null when all are done. */
  current: { lesson: PathLesson; sectionIndex: number; unitNumber: number; number: number } | null;
  totalLessons: number;
  doneCount: number;
}

/** Unit colours, cycling — token vars only, never raw hex. */
export const UNIT_COLORS = [
  'var(--success-green)',
  'var(--color-brand)',
  'var(--brand-purple)',
  'var(--warning)',
  'var(--brand-indigo)',
] as const;

export function buildPathModel(path: LearningPath): PathModel {
  const done = new Set(path.completedLessons);
  const { hasAccess, freePreviewLessonIds } = path.access;
  const free = new Set(freePreviewLessonIds);

  let number = 0;
  let doneTotal = 0;
  let current: PathModel['current'] = null;
  const units: PathUnit[] = [];

  path.sections.forEach((section, sectionIndex) => {
    // A section with no published lessons has nothing to draw — skip it, but
    // keep its sectionIndex slot so every later unit links to the right route.
    if (section.lessons.length === 0) return;
    const unitNumber = units.length + 1;

    const nodes: PathNode[] = section.lessons.map((lesson, i) => {
      number += 1;
      let state: NodeState;
      if (done.has(lesson.id)) {
        state = 'done';
        doneTotal += 1;
      } else if (!current) {
        // The first unfinished lesson is where the learner is — unless it's
        // behind the paywall, in which case it's where they'd be.
        current = { lesson, sectionIndex, unitNumber, number };
        state = hasAccess || free.has(lesson.id) ? 'current' : 'paywalled';
      } else {
        state = 'locked';
      }
      return { lesson, state, numberInUnit: i + 1, number };
    });

    const unitDone = nodes.filter((n) => n.state === 'done').length;
    units.push({
      sectionId: section.id,
      sectionIndex,
      unitNumber,
      title: section.title,
      description: section.description,
      color: UNIT_COLORS[(unitNumber - 1) % UNIT_COLORS.length],
      nodes,
      doneCount: unitDone,
      chest: unitDone === nodes.length ? 'open' : 'locked',
    });
  });

  return { units, current, totalLessons: number, doneCount: doneTotal };
}

/**
 * Duolingo's zig-zag: each node's horizontal offset, as a fraction of the
 * swing width. A smooth wave (0 → right → 0 → left) rather than alternating
 * left/right, so the path reads as one winding road.
 */
const WAVE = [0, 0.55, 0.9, 0.55, 0, -0.55, -0.9, -0.55];

export function nodeOffset(indexInUnit: number): number {
  return WAVE[indexInUnit % WAVE.length];
}
