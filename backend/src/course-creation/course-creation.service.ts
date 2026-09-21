import { Injectable, Logger } from '@nestjs/common';
import { CourseService } from '../course/course.service';
import { LessonService } from '../lesson/lesson.service';
import { assessCourseReadiness } from '../course/course-readiness.util';
import {
  AddLessonResourceDto,
  FullSaveLessonDto,
} from '../lesson/dto/update-lesson.dto';
import {
  AuthenticatedUser,
  CourseTreeLessonSpec,
  CourseTreeResult,
  CourseTreeSectionSpec,
  CourseTreeSpec,
  CreateCourseDraftInput,
  CreateLessonInput,
  CreateModuleInput,
  LessonContentInput,
  LessonCreationResult,
  SectionCreationResult,
  errorMessage,
} from './course-creation.types';

/**
 * CourseCreationService — the single programmatic entry point for building a
 * course tree (course → section → lesson → Learn/Apply/Reflect/Deepen →
 * resources), shared by every non-interactive caller (currently: the AI
 * Course Importer; future: bulk tooling, tests).
 *
 * This is deliberately a thin facade over CourseService/LessonService, not a
 * reimplementation. It calls the exact same methods the manual Course
 * Builder's controllers call, so an imported course is byte-for-byte
 * indistinguishable from a manually created one — same validation, same
 * optimistic locking, same review-lock (`assertEditableAndReopen`), same
 * `contentBlocks` shape. Manual builder behavior is untouched.
 */
@Injectable()
export class CourseCreationService {
  private readonly logger = new Logger(CourseCreationService.name);

  constructor(
    private readonly courseService: CourseService,
    private readonly lessonService: LessonService,
  ) {}

  createCourseDraft(userId: string, input: CreateCourseDraftInput) {
    return this.courseService.createCourse(userId, input);
  }

  createModule(userId: string, courseId: string, input: CreateModuleInput) {
    return this.courseService.createSection(
      userId,
      courseId,
      input.title,
      input.goal,
    );
  }

  createLesson(userId: string, sectionId: string, input: CreateLessonInput) {
    return this.courseService.createLesson(
      userId,
      sectionId,
      input.title,
      input.lessonType,
    );
  }

  attachResource(
    lessonId: string,
    resource: AddLessonResourceDto,
    user: AuthenticatedUser,
  ) {
    return this.lessonService.addLessonResource(lessonId, resource, user);
  }

  /**
   * Writes Learn/Apply/Reflect/Deepen + metadata in one call via
   * LessonService#fullSave / #fullSaveAndPublish — the same batched path the
   * production Lesson Builder prefers over four sequential phase saves,
   * which also sidesteps having to track the lesson's incrementing
   * `version` across multiple round trips.
   */
  attachLessonContent(
    lessonId: string,
    version: number,
    content: LessonContentInput,
    user: AuthenticatedUser,
  ) {
    const dto: FullSaveLessonDto = {
      description: content.description,
      shortDescription: content.shortDescription,
      durationMinutes: content.durationMinutes,
      learnBlocks: content.learnBlocks,
      applyBlocks: content.applyBlocks,
      reflectBlocks: content.reflectBlocks,
      deepenBlocks: content.deepenBlocks,
      isLearnCompleted:
        content.isLearnCompleted ?? !!content.learnBlocks?.length,
      isApplyCompleted:
        content.isApplyCompleted ?? !!content.applyBlocks?.length,
      isReflectCompleted:
        content.isReflectCompleted ?? !!content.reflectBlocks?.length,
      isDeepenCompleted:
        content.isDeepenCompleted ?? !!content.deepenBlocks?.length,
      version,
    };

    return content.publish === false
      ? this.lessonService.fullSave(lessonId, dto, user)
      : this.lessonService.fullSaveAndPublish(lessonId, dto, user);
  }

  getCourseTree(userId: string, courseId: string) {
    return this.courseService.getFullCurriculum(userId, courseId);
  }

  /**
   * Runs the exact same readiness check `submitForReview`/`publishCourse`
   * use, so "ready to submit" here means the same thing it means everywhere
   * else in the app — never a second, drifting definition of "done."
   */
  async validateCourseDraft(
    userId: string,
    courseId: string,
  ): Promise<{ ready: boolean; errors: string[] }> {
    const sections = await this.getCourseTree(userId, courseId);
    const errors = assessCourseReadiness({
      sections: sections.map((section) => ({
        title: section.title,
        lessons: section.lessons.map((lesson) => ({
          title: lesson.title,
          status: lesson.status,
        })),
      })),
    });
    return { ready: errors.length === 0, errors };
  }

  /**
   * Builds a full course tree from a normalized spec in one call.
   *
   * Failure isolation: a failure creating a section skips only that
   * section's lessons (marked 'failed', not attempted); a failure on one
   * lesson does not abort its siblings or the course. This mirrors the
   * spec's partial-failure requirement (§24/§36) — a 30-lesson import where
   * lesson 21 fails must preserve lessons 1-20 and leave 21 individually
   * retryable via `createLesson`/`attachLessonContent`, not roll back
   * everything or silently mark the course complete.
   *
   * The course itself is always left in DRAFT (`published: false`,
   * `reviewStatus: DRAFT`) — this service never submits for review or
   * publishes; that stays a deliberate, separate admin action.
   */
  async createFullCourseTree(
    userId: string,
    user: AuthenticatedUser,
    spec: CourseTreeSpec,
  ): Promise<CourseTreeResult> {
    let course: Awaited<ReturnType<CourseService['createCourse']>>;
    try {
      course = await this.createCourseDraft(userId, spec.course);
    } catch (err) {
      this.logger.error(`Course creation failed: ${errorMessage(err)}`);
      return { status: 'failed', error: errorMessage(err), sections: [] };
    }

    const sections: SectionCreationResult[] = [];
    for (const sectionSpec of spec.sections) {
      sections.push(
        await this.createModuleWithLessons(
          userId,
          course.id,
          user,
          sectionSpec,
        ),
      );
    }

    return { courseId: course.id, status: 'created', sections };
  }

  /** Public so an incremental import can add one more section to a course
   *  that already exists, instead of only ever building a whole tree at
   *  once. Same code path as the initial build — there is deliberately no
   *  second "append" implementation to drift from this one. */
  async createModuleWithLessons(
    userId: string,
    courseId: string,
    user: AuthenticatedUser,
    sectionSpec: CourseTreeSectionSpec,
  ): Promise<SectionCreationResult> {
    let section: Awaited<ReturnType<CourseService['createSection']>>;
    try {
      section = await this.createModule(userId, courseId, sectionSpec);
    } catch (err) {
      this.logger.error(
        `Module "${sectionSpec.title}" creation failed: ${errorMessage(err)}`,
      );
      return {
        title: sectionSpec.title,
        status: 'failed',
        error: errorMessage(err),
        lessons: sectionSpec.lessons.map((lessonSpec) => ({
          title: lessonSpec.title,
          status: 'failed',
          error: 'Skipped: module creation failed',
        })),
      };
    }

    const lessons: LessonCreationResult[] = [];
    for (const lessonSpec of sectionSpec.lessons) {
      lessons.push(
        await this.createLessonWithContent(
          userId,
          section.id,
          user,
          lessonSpec,
        ),
      );
    }

    return {
      sectionId: section.id,
      title: sectionSpec.title,
      status: 'created',
      lessons,
    };
  }

  /** Public for the same reason as createModuleWithLessons: a later import
   *  batch adds lessons into a section that already exists. */
  async createLessonWithContent(
    userId: string,
    sectionId: string,
    user: AuthenticatedUser,
    lessonSpec: CourseTreeLessonSpec,
  ): Promise<LessonCreationResult> {
    // Tracked outside the try so a failure *after* creation (content save,
    // resource attach) still reports the lesson's id — the row already
    // exists, so a retry must reattach content, never recreate the lesson.
    let lessonId: string | undefined;
    try {
      const lesson = await this.createLesson(userId, sectionId, lessonSpec);
      lessonId = lesson.id;

      for (const resource of lessonSpec.resources ?? []) {
        await this.attachResource(lesson.id, resource, user);
      }

      if (lessonSpec.content) {
        await this.attachLessonContent(
          lesson.id,
          lesson.version,
          lessonSpec.content,
          user,
        );
      }

      return {
        lessonId: lesson.id,
        title: lessonSpec.title,
        status: 'created',
      };
    } catch (err) {
      this.logger.error(
        `Lesson "${lessonSpec.title}" creation failed: ${errorMessage(err)}`,
      );
      return {
        lessonId,
        title: lessonSpec.title,
        status: 'failed',
        error: errorMessage(err),
      };
    }
  }
}
