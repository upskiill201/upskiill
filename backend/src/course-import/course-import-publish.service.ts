import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
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
import { lessonReadiness, sectionReadiness } from './lesson-readiness';
import { cleanLessonTitle } from './course-structure-analysis.service';
import { cleanDriveFileName } from '../google-drive/google-drive.types';

export interface CreateCourseFromImportInput {
  title: string;
  category: string;
  level?: string;
  creatorTimeWeekly?: string;
}

/** LessonResource.type — a free-text label the players turn into an icon
 *  and a word ("Guide", "Slides", "Files", "Data sheet"; see DeepenStep).
 *  Read from the stored object's extension, so an exported Google Doc is a
 *  pdf and a starter zip is a zip, not everything a "pdf". */
export function resourceTypeFor(file: {
  category: string;
  storageKey: string | null;
  driveFileName: string;
}): string {
  const ext =
    (file.storageKey ?? file.driveFileName)
      .trim()
      .split('.')
      .pop()
      ?.toLowerCase() ?? '';
  if (ext === 'pdf') return 'pdf';
  if (['doc', 'docx', 'txt', 'md', 'rtf'].includes(ext)) return 'doc';
  if (['ppt', 'pptx', 'key'].includes(ext)) return 'pptx';
  if (['xls', 'xlsx', 'csv', 'tsv'].includes(ext))
    return ext === 'csv' || ext === 'tsv' ? 'csv' : 'xls';
  if (['zip', 'rar', '7z', 'tar', 'gz', 'tgz'].includes(ext)) return 'zip';
  if (['fig', 'sketch', 'psd', 'ai', 'xd'].includes(ext)) return 'design';
  if (file.category === 'video') return 'video';
  if (file.category === 'audio') return 'audio';
  if (file.category === 'image') return 'image';
  if (file.category === 'file') return 'source';
  if (file.category === 'presentation') return 'pptx';
  return 'doc';
}

/** Starter files and templates a learner works in, vs. things to read. */
const TEMPLATE_NAME =
  /\b(starter|template|boilerplate|exercise|assignment|project|worksheet)s?\b/i;

type ImportLesson =
  CourseImportWithFilesAndModules['modules'][number]['lessons'][number];

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
  ): Promise<{
    courseId: string;
    result: CourseTreeResult;
    appended: boolean;
  }> {
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
  ): Promise<{
    courseId: string;
    result: CourseTreeResult;
    appended: boolean;
  }> {
    const publishable = this.publishableModules(found);
    if (publishable.length === 0) {
      throw new BadRequestException(
        'No section is complete yet — there is nothing to build a course from. A section goes in once every lesson in it is written (or skipped).',
      );
    }

    const spec: CourseTreeSpec = {
      course: {
        title: input.title,
        category: input.category,
        level: input.level,
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
  ): Promise<{
    courseId: string;
    result: CourseTreeResult;
    appended: boolean;
  }> {
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
    const pending = this.publishableModules(found);
    if (pending.length === 0) {
      throw new BadRequestException(
        'No new section is complete yet. Every finished section is already in the course.',
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
          const lessonResult =
            await this.courseCreation.createLessonWithContent(
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
              await this.markLessonWritten(
                lessons[i].id,
                lessonResult.lessonId,
              );
            }
          }
        }
      }
    }

    await this.reorderImportedSections(found.id, courseId);
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
   * What goes into the course now: every lesson of every section that is
   * READY (all its lessons written or skipped — see lesson-readiness), and
   * nothing from a section that is still writing or has a lesson needing
   * attention, so a learner never sees a section with lessons missing.
   * Lessons already in the course are never written twice.
   */
  private publishableModules(found: CourseImportWithFilesAndModules) {
    const filesById = this.filesById(found);
    return found.modules
      .map((module) => {
        const states = module.lessons.map((l) => lessonReadiness(l, filesById));
        return {
          module,
          lessons:
            sectionReadiness(states) === 'ready'
              ? module.lessons.filter((_, i) => states[i] === 'ready')
              : [],
        };
      })
      .filter((m) => m.lessons.length > 0);
  }

  /**
   * New sections are appended at the end of a course, so a section that
   * finished out of turn (6 held back by one lesson, 7 done first) would land
   * out of order. Put the imported sections back in Drive order, using the
   * slots they already occupy, so anything the admin added by hand keeps its
   * place. Best-effort: order is fixable in Course Builder, a failure here
   * must never fail a publish that already succeeded.
   */
  private async reorderImportedSections(importId: string, courseId: string) {
    try {
      const modules = await this.prisma.courseImportModule.findMany({
        where: { importId, createdSectionId: { not: null } },
        orderBy: { orderIndex: 'asc' },
        select: { createdSectionId: true },
      });
      const wanted = modules.map((m) => m.createdSectionId as string);
      const sections = await this.prisma.section.findMany({
        where: { courseId, id: { in: wanted } },
        select: { id: true, orderIndex: true },
      });
      const present = wanted.filter((id) => sections.some((s) => s.id === id));
      const slots = sections.map((s) => s.orderIndex).sort((a, b) => a - b);
      for (const [i, id] of present.entries()) {
        const current = sections.find((s) => s.id === id)?.orderIndex;
        if (current !== slots[i]) {
          await this.prisma.section.update({
            where: { id },
            data: { orderIndex: slots[i] },
          });
        }
      }
    } catch (err) {
      this.logger.warn(
        `Could not reorder imported sections for course ${courseId}: ${(err as Error).message}`,
      );
    }
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
    // "N min" for learners: the video (or this part's clip of it), plus ~30s
    // per exercise.
    const videoMs =
      lesson.clipStartSec !== null && lesson.clipEndSec !== null
        ? (lesson.clipEndSec - lesson.clipStartSec) * 1000
        : lesson.primaryFileId
          ? filesById.get(lesson.primaryFileId)?.durationMs
          : null;
    const applyItems = (
      ((lesson.applyBlocks as unknown[] | null) ?? []).find(
        (b) => (b as { type?: string }).type === 'exercises',
      ) as { value?: { items?: unknown[] } } | undefined
    )?.value?.items;
    const durationMinutes = videoMs
      ? Math.max(
          1,
          Math.round(
            Number(videoMs) / 60_000 +
              (Array.isArray(applyItems) ? applyItems.length * 0.5 : 0),
          ),
        )
      : undefined;
    return {
      title: lesson.title,
      content: {
        durationMinutes,
        description: lesson.description ?? undefined,
        learnBlocks: (lesson.learnBlocks as unknown[] | null) ?? undefined,
        applyBlocks: (lesson.applyBlocks as unknown[] | null) ?? undefined,
        reflectBlocks: (lesson.reflectBlocks as unknown[] | null) ?? undefined,
        deepenBlocks: (lesson.deepenBlocks as unknown[] | null) ?? undefined,
        publish,
      },
      resources: ((lesson.resourceFileIds as string[] | null) ?? [])
        .map((fileId) => filesById.get(fileId))
        // Images are already Learn image cards; everything else is a
        // Deepen download.
        .filter(
          (f): f is NonNullable<typeof f> =>
            !!f && !!f.storageUrl && f.category !== 'image',
        )
        .map((f): AddLessonResourceDto => {
          const storedName = (f.storageKey ?? '').split('/').pop() ?? '';
          const storedExt = storedName.includes('.')
            ? storedName.split('.').pop()!
            : '';
          const cleanName = cleanDriveFileName(f.driveFileName);
          const hasExt = /\.[a-z0-9]{1,5}$/i.test(cleanName);
          const originalName =
            hasExt || !storedExt ? cleanName : `${cleanName}.${storedExt}`;
          return {
            type: resourceTypeFor(f),
            title: cleanLessonTitle(f.driveFileName),
            storageUrl: f.storageUrl!,
            sizeBytes: f.sizeBytes ? Number(f.sizeBytes) : undefined,
            originalName,
            category: TEMPLATE_NAME.test(cleanName) ? 'Template' : 'Reference',
          };
        }),
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
