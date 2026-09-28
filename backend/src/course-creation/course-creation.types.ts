import type { AddLessonResourceDto } from '../lesson/dto/update-lesson.dto';

/**
 * Mirrors LessonService's private AuthenticatedUser shape. Kept as a local
 * type (rather than importing an unexported interface) so this module has no
 * compile-time coupling to LessonService internals beyond its public API.
 */
export interface AuthenticatedUser {
  id: string;
  role?: string;
}

export interface CreateCourseDraftInput {
  title: string;
  category: string;
  /** Beginner | Intermediate | Advanced; the course default applies when unset. */
  level?: string;
  creatorTimeWeekly?: string;
}

export interface CreateModuleInput {
  title: string;
  goal?: string;
}

export interface CreateLessonInput {
  title: string;
  lessonType?: string;
}

/**
 * Everything that lands on a lesson via LessonService#fullSave /
 * #fullSaveAndPublish in one call. Block shapes intentionally mirror the
 * real Lesson Builder payload (frontend `buildSavePayload()` in
 * app/creator/courses/[id]/lesson-builder/[lessonId]/page.tsx) — e.g. learn
 * blocks are `{type: 'videoUrl'|'audioUrl'|'text'|'whatYouWillLearn', value}`
 * — so imported content renders identically to a manually built lesson.
 */
export interface LessonContentInput {
  description?: string;
  shortDescription?: string;
  durationMinutes?: number;
  learnBlocks?: unknown[];
  applyBlocks?: unknown[];
  reflectBlocks?: unknown[];
  deepenBlocks?: unknown[];
  /** Defaults to `learnBlocks.length > 0` when omitted. */
  isLearnCompleted?: boolean;
  /** Defaults to `applyBlocks.length > 0` when omitted. */
  isApplyCompleted?: boolean;
  /** Defaults to `reflectBlocks.length > 0` when omitted. */
  isReflectCompleted?: boolean;
  /** Defaults to `deepenBlocks.length > 0` when omitted. */
  isDeepenCompleted?: boolean;
  /** Publish the lesson as part of this save (default true). Set false to
   *  leave it as a draft — e.g. when content is known to be incomplete and
   *  should surface in admin review rather than pass course readiness. */
  publish?: boolean;
}

export interface CourseTreeLessonSpec extends CreateLessonInput {
  content?: LessonContentInput;
  resources?: AddLessonResourceDto[];
}

export interface CourseTreeSectionSpec extends CreateModuleInput {
  lessons: CourseTreeLessonSpec[];
}

export interface CourseTreeSpec {
  course: CreateCourseDraftInput;
  sections: CourseTreeSectionSpec[];
}

export interface LessonCreationResult {
  lessonId?: string;
  title: string;
  status: 'created' | 'failed';
  error?: string;
}

export interface SectionCreationResult {
  sectionId?: string;
  title: string;
  status: 'created' | 'failed';
  error?: string;
  lessons: LessonCreationResult[];
}

export interface CourseTreeResult {
  courseId?: string;
  status: 'created' | 'failed';
  error?: string;
  sections: SectionCreationResult[];
}

export function errorMessage(err: unknown): string {
  return err instanceof Error ? err.message : 'Unknown error';
}
