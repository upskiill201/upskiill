import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CourseCreationService } from '../course-creation/course-creation.service';
import { AddLessonResourceDto } from '../lesson/dto/update-lesson.dto';
import {
  AuthenticatedUser,
  CourseTreeResult,
  CourseTreeSpec,
  CourseTreeLessonSpec,
} from '../course-creation/course-creation.types';
import {
  CourseImportWithFilesAndModules,
  WITH_FILES_AND_MODULES,
} from './course-import-summary.util';
import { APPLY_QUESTIONS_MAX, APPLY_QUESTIONS_MIN } from './lesson-content-generation.types';

export interface CreateCourseFromImportInput {
  title: string;
  category: string;
  creatorTimeWeekly?: string;
}

/** DriveFileCategory -> LessonResource.type. Free-text field on the Lesson
 *  side (no shared enum), so this only needs to be a reasonable label, not
 *  an exhaustive mapping — 'other'-category files never reach here (they're
 *  SKIPPED at upload time, never given a storageUrl). */
const RESOURCE_TYPE_BY_CATEGORY: Record<string, string> = {
  video: 'video',
  document: 'pdf',
  presentation: 'pptx',
  image: 'pdf',
};

type ImportLesson = CourseImportWithFilesAndModules['modules'][number]['lessons'][number];

/**
 * Builds and then incrementally extends the real course for an import.
 *
 * The incremental part is the reason this is not a one-shot operation. A
 * 100+ video course takes hours to import, and waiting for all of it before
 * any of it is usable is the thing this whole feature exists to avoid. So
 * this can be called repeatedly against the same import:
 *
 *   first call  -> creates the course and writes whatever lessons are ready
 *   later calls -> append newly-finished lessons into that SAME course
 *
 * Two rules make that safe:
 *
 * 1. Only fully-validated lessons are ever written. A video still uploading
 *    or transcribing has no lesson row in the real course at all, so there
 *    is nothing half-built for a learner to open — and nothing for
 *    assessCourseReadiness() to reject, which is what would otherwise make
 *    a partially-imported course unpublishable.
 *
 * 2. Once the course is live, later lessons are added as DRAFTS. Publishing
 *    them is a human decision through the normal review workflow; the
 *    importer never makes unreviewed AI content learner-visible.
 */
@Injectable()
export class CourseImportPublishService {
  private readonly logger = new Logger(CourseImportPublishService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly courseCreation: CourseCreationService,
  ) {}

  async createCourse(
    user: AuthenticatedUser,
    importId: string,
    input: CreateCourseFromImportInput,
  ): Promise<{ courseId: string; result: CourseTreeResult; appended: boolean }> {
    const found = await this.findOwned(user.id, importId);

    return found.createdCourseId
      ? this.appendToExistingCourse(user, found, found.createdCourseId)
      : this.createNewCourse(user, found, input);
  }

  // ── First batch ────────────────────────────────────────────────────────

  private async createNewCourse(
    user: AuthenticatedUser,
    found: CourseImportWithFilesAndModules,
    input: CreateCourseFromImportInput,
  ): Promise<{ courseId: string; result: CourseTreeResult; appended: boolean }> {
    const publishable = this.publishableModules(found);
    if (publishable.length === 0) {
      throw new BadRequestException(
        'No lessons have finished generating and passed validation yet — there is nothing to build a course from.',
      );
    }

    const spec: CourseTreeSpec = {
      course: {
        title: input.title,
        category: input.category,
        creatorTimeWeekly: input.creatorTimeWeekly,
      },
      sections: publishable.map(({ module, lessons }) => ({
        title: module.title,
        // A brand new course is not live yet, so its lessons are published
        // as part of the build — the admin reviews the whole course before
        // it ever reaches a learner.
        lessons: lessons.map((l) => this.toLessonSpec(found, l, true)),
      })),
    };

    const result = await this.courseCreation.createFullCourseTree(
      user.id,
      user,
      spec,
    );

    if (result.status === 'failed' || !result.courseId) {
      throw new BadRequestException(
        `Course creation failed: ${result.error ?? 'unknown error'}`,
      );
    }

    // Claim the course id FIRST, before recording the per-lesson links.
    //
    // Ordering matters here. The course now exists in the database, but
    // nothing yet connects it back to this import. If the process died or
    // the database blipped between those two facts, a retry would take the
    // "no createdCourseId" branch and build an entire SECOND course. Writing
    // this first means the worst case is a retry that appends the missing
    // links to the right course, rather than one that duplicates the course.
    await this.prisma.courseImport.update({
      where: { id: found.id },
      data: { createdCourseId: result.courseId, status: 'COURSE_CREATED' },
    });

    // Then the per-lesson links, so a later batch can tell what it already
    // wrote. A failure here is recoverable: the append path skips lessons
    // that already carry a createdLessonId and re-adds only the rest.
    await this.recordCreatedIds(found, publishable, result);

    return { courseId: result.courseId, result, appended: false };
  }

  // ── Later batches ──────────────────────────────────────────────────────

  private async appendToExistingCourse(
    user: AuthenticatedUser,
    found: CourseImportWithFilesAndModules,
    courseId: string,
  ): Promise<{ courseId: string; result: CourseTreeResult; appended: boolean }> {
    const course = await this.prisma.course.findUnique({
      where: { id: courseId },
      select: { id: true, published: true },
    });
    if (!course) {
      throw new NotFoundException(
        'The course this import created no longer exists.',
      );
    }

    // Anything already carrying a createdLessonId was written by an earlier
    // call and is skipped — this is what makes repeat calls idempotent.
    const pending = this.publishableModules(found, { onlyUnwritten: true });
    if (pending.length === 0) {
      throw new BadRequestException(
        'Every lesson that has finished generating is already in the course. Nothing new to add yet.',
      );
    }

    // A live course must not gain learner-visible lessons without review.
    const publishLessons = !course.published;
    const sections: CourseTreeResult['sections'] = [];

    for (const { module, lessons } of pending) {
      const lessonSpecs = lessons.map((l) =>
        this.toLessonSpec(found, l, publishLessons),
      );

      if (module.createdSectionId) {
        // Section already exists in the real course — add into it by id.
        // Matching on title instead would fork a duplicate section the
        // moment anyone renamed it in Course Builder.
        const created: CourseTreeResult['sections'][number] = {
          sectionId: module.createdSectionId,
          title: module.title,
          status: 'created',
          lessons: [],
        };
        for (const [i, spec] of lessonSpecs.entries()) {
          const lessonResult = await this.courseCreation.createLessonWithContent(
            user.id,
            module.createdSectionId,
            user,
            spec,
          );
          created.lessons.push(lessonResult);
          if (lessonResult.lessonId) {
            await this.markLessonWritten(lessons[i].id, lessonResult.lessonId);
          }
        }
        sections.push(created);
      } else {
        const sectionResult = await this.courseCreation.createModuleWithLessons(
          user.id,
          courseId,
          user,
          { title: module.title, lessons: lessonSpecs },
        );
        sections.push(sectionResult);
        if (sectionResult.sectionId) {
          await this.prisma.courseImportModule.update({
            where: { id: module.id },
            data: { createdSectionId: sectionResult.sectionId },
          });
          for (const [i, lessonResult] of sectionResult.lessons.entries()) {
            if (lessonResult.lessonId) {
              await this.markLessonWritten(lessons[i].id, lessonResult.lessonId);
            }
          }
        }
      }
    }

    this.logger.log(
      `Appended ${pending.reduce((n, p) => n + p.lessons.length, 0)} lesson(s) to course ${courseId} as ${publishLessons ? 'published' : 'drafts'}.`,
    );

    return {
      courseId,
      result: { courseId, status: 'created', sections },
      appended: true,
    };
  }

  // ── Eligibility ────────────────────────────────────────────────────────

  /**
   * A lesson is only eligible to be written into the real course once its
   * generated content actually holds up. "Generation finished" is not the
   * same as "safe to show a learner" — this is the gate that keeps a
   * malformed lesson out of a course that may already be live.
   */
  private isPublishable(lesson: ImportLesson): boolean {
    if (lesson.status !== 'GENERATED') return false;

    const learn = lesson.learnBlocks as unknown[] | null;
    const apply = lesson.applyBlocks as unknown[] | null;
    const reflect = lesson.reflectBlocks as unknown[] | null;
    const deepen = lesson.deepenBlocks as unknown[] | null;

    if (!learn?.length || !apply?.length || !reflect?.length || !deepen?.length) {
      return false;
    }

    // The video is the Learn step; a lesson without one is a shell.
    const hasVideo = learn.some(
      (b) =>
        (b as { type?: string }).type === 'videoUrl' &&
        !!(b as { value?: string }).value,
    );
    if (!hasVideo) return false;

    // Hard product rule, re-checked here rather than trusted from
    // generation time: this is the last point before content reaches a real
    // course, and a course that is already published cannot afford an
    // Apply step with the wrong number of questions.
    const questions = (
      apply[0] as { value?: { questions?: unknown[] } } | undefined
    )?.value?.questions;
    if (!Array.isArray(questions)) return false;
    if (
      questions.length < APPLY_QUESTIONS_MIN ||
      questions.length > APPLY_QUESTIONS_MAX
    ) {
      this.logger.warn(
        `Lesson "${lesson.title}" has ${questions.length} Apply questions (allowed ${APPLY_QUESTIONS_MIN}-${APPLY_QUESTIONS_MAX}) — withheld from the course.`,
      );
      return false;
    }

    return true;
  }

  private publishableModules(
    found: CourseImportWithFilesAndModules,
    opts: { onlyUnwritten?: boolean } = {},
  ) {
    return found.modules
      .map((module) => ({
        module,
        lessons: module.lessons.filter(
          (l) =>
            this.isPublishable(l) &&
            (!opts.onlyUnwritten || !l.createdLessonId),
        ),
      }))
      .filter((m) => m.lessons.length > 0);
  }

  // ── Mapping ────────────────────────────────────────────────────────────

  private toLessonSpec(
    found: CourseImportWithFilesAndModules,
    lesson: ImportLesson,
    publish: boolean,
  ): CourseTreeLessonSpec {
    // Built once per import rather than once per lesson: this runs for every
    // lesson in a course that may hold 100+ files, and rebuilding the map
    // each time would make it quadratic for no reason.
    const filesById = this.filesById(found);
    return {
      title: lesson.title,
      content: {
        description: lesson.description ?? undefined,
        learnBlocks: (lesson.learnBlocks as unknown[] | null) ?? undefined,
        applyBlocks: (lesson.applyBlocks as unknown[] | null) ?? undefined,
        reflectBlocks: (lesson.reflectBlocks as unknown[] | null) ?? undefined,
        deepenBlocks: (lesson.deepenBlocks as unknown[] | null) ?? undefined,
        publish,
      },
      resources: ((lesson.resourceFileIds as string[] | null) ?? [])
        .map((fileId) => filesById.get(fileId))
        .filter((f): f is NonNullable<typeof f> => !!f && !!f.storageUrl)
        .map(
          (f): AddLessonResourceDto => ({
            type: RESOURCE_TYPE_BY_CATEGORY[f.category] ?? 'link',
            title: f.driveFileName,
            storageUrl: f.storageUrl!,
            sizeBytes: f.sizeBytes ? Number(f.sizeBytes) : undefined,
            originalName: f.driveFileName,
            category: 'Reference',
          }),
        ),
    };
  }

  /** Memoised per import instance — `found` is re-fetched on each call to
   *  createCourse, so the cache key is the object itself. */
  private fileMapCache = new WeakMap<
    CourseImportWithFilesAndModules,
    Map<string, CourseImportWithFilesAndModules['files'][number]>
  >();

  private filesById(found: CourseImportWithFilesAndModules) {
    const cached = this.fileMapCache.get(found);
    if (cached) return cached;
    const map = new Map(found.files.map((f) => [f.id, f]));
    this.fileMapCache.set(found, map);
    return map;
  }

  private async markLessonWritten(
    importLessonId: string,
    createdLessonId: string,
  ): Promise<void> {
    await this.prisma.courseImportLesson.update({
      where: { id: importLessonId },
      data: { createdLessonId, addedToCourseAt: new Date() },
    });
  }

  private async recordCreatedIds(
    found: CourseImportWithFilesAndModules,
    publishable: ReturnType<CourseImportPublishService['publishableModules']>,
    result: CourseTreeResult,
  ): Promise<void> {
    for (const [i, { module, lessons }] of publishable.entries()) {
      const sectionResult = result.sections[i];
      if (!sectionResult?.sectionId) continue;

      await this.prisma.courseImportModule.update({
        where: { id: module.id },
        data: { createdSectionId: sectionResult.sectionId },
      });

      for (const [j, lesson] of lessons.entries()) {
        const lessonId = sectionResult.lessons[j]?.lessonId;
        if (lessonId) await this.markLessonWritten(lesson.id, lessonId);
      }
    }
  }

  private async findOwned(
    userId: string,
    importId: string,
  ): Promise<CourseImportWithFilesAndModules> {
    const found = await this.prisma.courseImport.findFirst({
      where: { id: importId, createdById: userId },
      include: WITH_FILES_AND_MODULES,
    });
    if (!found) throw new NotFoundException('Import not found.');
    return found;
  }
}
