import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CourseCreationService } from '../course-creation/course-creation.service';
import { AddLessonResourceDto } from '../lesson/dto/update-lesson.dto';
import {
  AuthenticatedUser,
  CourseTreeResult,
  CourseTreeSpec,
} from '../course-creation/course-creation.types';
import {
  CourseImportWithFilesAndModules,
  WITH_FILES_AND_MODULES,
} from './course-import-summary.util';

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

/**
 * Phase 5: hands a READY_FOR_REVIEW import's successfully-generated lessons
 * to CourseCreationService, producing a real (DRAFT) Course/Section/Lesson
 * tree. Deliberately only includes lessons whose generation actually
 * succeeded — a course import with some FAILED lessons still produces a
 * usable draft course for the ones that worked, matching Phase 4's own
 * partial-failure stance (spec §36).
 */
@Injectable()
export class CourseImportPublishService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly courseCreation: CourseCreationService,
  ) {}

  async createCourse(
    user: AuthenticatedUser,
    importId: string,
    input: CreateCourseFromImportInput,
  ): Promise<{ courseId: string; result: CourseTreeResult }> {
    const found = await this.findOwned(user.id, importId);

    if (found.status !== 'READY_FOR_REVIEW') {
      throw new BadRequestException(
        'This import must finish generating (every lesson generated or failed) before a course can be created.',
      );
    }
    if (found.createdCourseId) {
      throw new BadRequestException(
        'A course has already been created from this import.',
      );
    }

    const filesById = new Map(found.files.map((f) => [f.id, f]));

    const modulesWithGeneratedLessons = found.modules
      .map((m) => ({
        module: m,
        lessons: m.lessons.filter((l) => l.status === 'GENERATED'),
      }))
      .filter((m) => m.lessons.length > 0);

    if (modulesWithGeneratedLessons.length === 0) {
      throw new BadRequestException(
        'No lessons finished generating successfully — nothing to create a course from.',
      );
    }

    const spec: CourseTreeSpec = {
      course: {
        title: input.title,
        category: input.category,
        creatorTimeWeekly: input.creatorTimeWeekly,
      },
      sections: modulesWithGeneratedLessons.map(({ module, lessons }) => ({
        title: module.title,
        lessons: lessons.map((lesson) => ({
          title: lesson.title,
          content: {
            description: lesson.description ?? undefined,
            learnBlocks: (lesson.learnBlocks as unknown[] | null) ?? undefined,
            applyBlocks: (lesson.applyBlocks as unknown[] | null) ?? undefined,
            reflectBlocks:
              (lesson.reflectBlocks as unknown[] | null) ?? undefined,
            deepenBlocks: (lesson.deepenBlocks as unknown[] | null) ?? undefined,
            publish: true,
          },
          resources: ((lesson.resourceFileIds as string[] | null) ?? [])
            .map((fileId) => filesById.get(fileId))
            .filter(
              (f): f is NonNullable<typeof f> => !!f && !!f.storageUrl,
            )
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
        })),
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

    await this.prisma.courseImport.update({
      where: { id: importId },
      data: { createdCourseId: result.courseId, status: 'COURSE_CREATED' },
    });

    return { courseId: result.courseId, result };
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
