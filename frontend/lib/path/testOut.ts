/**
 * Jump ahead and placement (Teyro Originals), the page side. The server
 * builds the tests from each chapter's Checkpoint and Unit Challenge
 * exercises and records the result (backend/src/originals/test-out.service.ts);
 * the browser grades, exactly like a lesson (Write and run code runs here).
 *
 * Passing marks the earlier lessons "tested out": open on the map, never
 * counted as done, no XP, Coins, chests or streaks.
 */

import { sanitizeExercises } from '@/lib/lesson/sanitize';
import type { Exercise } from '@/lib/lesson/blocks';

/** Mirrors PLACEMENT_TRACKS in backend/src/originals/originals.policy.ts. */
export const PLACEMENT_TRACKS = ['python-for-beginners', 'machine-learning-for-beginners', 'the-ai-stack', 'html-css-for-beginners', 'working-with-ai-coding-agents', 'get-hired-get-ahead'] as const;

export function hasPlacementTest(trackSlug: string | null | undefined): boolean {
  return !!trackSlug && (PLACEMENT_TRACKS as readonly string[]).includes(trackSlug);
}

export interface JumpTest {
  mode: 'jump';
  targetSectionId: string;
  targetTitle: string;
  covers: { sectionId: string; title: string }[];
  passMark: number;
  exercises: Exercise[];
}

export interface PlacementUnit {
  sectionId: string;
  title: string;
  exercises: Exercise[];
}

export interface PlacementTest {
  mode: 'placement';
  units: PlacementUnit[];
  passPerUnit: number;
  /** The last chapter, where passing every tested chapter lands. */
  finalSectionId: string;
}

export interface TestOutResult {
  passed: boolean;
  testedOut: number;
  targetSectionId: string;
  firstLessonId?: string | null;
}

export const jumpTestKey = (courseId: string, sectionId: string) =>
  `/api/originals/courses/${courseId}/jump/${encodeURIComponent(sectionId)}`;
export const placementTestKey = (courseId: string) => `/api/originals/courses/${courseId}/placement`;

/** Loose server JSON: every field is checked before use. */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Raw = any;

/** Server JSON → a test the player can run (unknown or broken exercises dropped). */
export function readJumpTest(raw: Raw): JumpTest {
  return {
    mode: 'jump',
    targetSectionId: String(raw?.targetSectionId ?? ''),
    targetTitle: String(raw?.targetTitle ?? ''),
    covers: Array.isArray(raw?.covers) ? raw.covers : [],
    passMark: typeof raw?.passMark === 'number' ? raw.passMark : 0.8,
    exercises: sanitizeExercises(raw?.exercises),
  };
}

export function readPlacementTest(raw: Raw): PlacementTest {
  const units: PlacementUnit[] = (Array.isArray(raw?.units) ? raw.units : []).map((u: Raw) => ({
    sectionId: String(u?.sectionId ?? ''),
    title: String(u?.title ?? ''),
    exercises: sanitizeExercises(u?.exercises),
  }));
  return {
    mode: 'placement',
    units,
    passPerUnit: typeof raw?.passPerUnit === 'number' ? raw.passPerUnit : 2,
    finalSectionId: String(raw?.finalSectionId ?? ''),
  };
}

/** Did the learner pass a Jump ahead test? */
export function jumpPassed(correct: number, total: number, passMark: number): boolean {
  return total > 0 && correct / total >= passMark;
}

/**
 * Placement, one chapter at a time. After each chapter's questions: keep
 * going if they got at least passPerUnit right, otherwise stop. Returns the
 * index of the chapter they should start at (0 = the beginning), or null
 * while the walk isn't finished.
 *
 * `results[i]` is the number right in chapter i, for chapters answered so far.
 * The chapter after the last tested one is where a learner who passes
 * everything lands.
 */
export function placementStart(results: number[], test: Pick<PlacementTest, 'units' | 'passPerUnit'>): number | null {
  for (let i = 0; i < results.length; i++) {
    const need = Math.min(test.passPerUnit, test.units[i]?.exercises.length ?? 0);
    if (results[i] < need) return i;
  }
  return results.length >= test.units.length ? test.units.length : null;
}

export async function submitTestOut(
  courseId: string,
  body: { mode: 'jump' | 'placement'; targetSectionId: string; correct: number; total: number },
): Promise<TestOutResult> {
  // Recording a result needs an enrolment; enrolling is idempotent.
  await fetch(`/api/courses/${courseId}/enroll`, { method: 'POST', credentials: 'include' });
  const res = await fetch(`/api/originals/courses/${courseId}/test-out`, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`test-out ${res.status}`);
  return (await res.json()) as TestOutResult;
}

/** Where the test screen lives. */
export function jumpHref(courseId: string, sectionId: string): string {
  return `/learn/${courseId}/test?section=${encodeURIComponent(sectionId)}`;
}
export function placementHref(courseId: string): string {
  return `/learn/${courseId}/test?placement=1`;
}
