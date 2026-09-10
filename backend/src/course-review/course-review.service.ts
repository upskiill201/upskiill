import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Course, CourseReviewStatus } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { NotificationsService } from '../notification/notification.service';
import { assessCourseReadiness } from '../course/course-readiness.util';

const REVIEWABLE: CourseReviewStatus[] = ['SUBMITTED', 'UNDER_REVIEW'];
const LOCKED_FOR_EDITING: CourseReviewStatus[] = ['SUBMITTED', 'UNDER_REVIEW'];

/**
 * Review-specific concerns only — submission, decisions, history, and the
 * edit-lock/reopen guard. Course creation, updates, and publishing stay
 * owned by CourseService; this never reimplements them (see
 * course-readiness.util.ts, shared by both publishCourse and
 * submitForReview so "ready" means one thing everywhere).
 */
@Injectable()
export class CourseReviewService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly notifications: NotificationsService,
  ) {}

  /**
   * The guard every substantive course/lesson mutation calls before writing
   * anything. Two jobs:
   *  - While a course is SUBMITTED or UNDER_REVIEW, edits are refused
   *    outright — the version an admin is looking at right now must not
   *    change under them.
   *  - If a course is APPROVED, the edit is allowed but the approval no
   *    longer covers the (about to change) content, so it's silently
   *    reopened to DRAFT with a system-authored history row. This is what
   *    stops "approve version A, quietly ship version B" (see
   *    course-review.service.spec.ts).
   * DRAFT / CHANGES_REQUESTED / REJECTED courses are always editable as-is.
   */
  async assertEditableAndReopen(courseId: string): Promise<void> {
    const course = await this.prisma.course.findUnique({
      where: { id: courseId },
      select: { reviewStatus: true },
    });
    if (!course) return; // let the caller's own existence check report the 404

    if (LOCKED_FOR_EDITING.includes(course.reviewStatus)) {
      throw new ForbiddenException(
        "This course is currently being reviewed by Teyro and can't be edited until the review is complete.",
      );
    }

    if (course.reviewStatus === 'APPROVED') {
      await this.prisma.$transaction([
        this.prisma.course.update({
          where: { id: courseId },
          data: { reviewStatus: 'DRAFT' },
        }),
        this.prisma.courseReview.create({
          data: {
            courseId,
            reviewerId: null,
            action: 'REOPENED',
            previousStatus: 'APPROVED',
            newStatus: 'DRAFT',
            internalNote:
              'Automatic: course content was edited after approval.',
          },
        }),
      ]);
    }
  }

  // ── Creator-facing ──────────────────────────────────────────────────

  async submitForReview(courseId: string, userId: string) {
    const course = await this.prisma.course.findUnique({
      where: { id: courseId },
      include: {
        sections: {
          orderBy: { orderIndex: 'asc' },
          include: {
            lessons: {
              orderBy: { orderIndex: 'asc' },
              select: { title: true, status: true },
            },
          },
        },
      },
    });
    if (!course) throw new NotFoundException('Course not found');
    if (course.instructorId !== userId) {
      throw new ForbiddenException('You do not own this course');
    }
    if (REVIEWABLE.includes(course.reviewStatus)) {
      throw new BadRequestException('This course is already awaiting review.');
    }
    if (course.reviewStatus === 'APPROVED') {
      throw new BadRequestException(
        'This course is already approved. Publish it, or edit it to trigger a new review.',
      );
    }

    const errors = assessCourseReadiness(course);
    if (errors.length > 0) {
      throw new UnprocessableEntityException({
        message: "This course isn't ready to submit for review yet.",
        errors,
      });
    }

    const previousStatus = course.reviewStatus;
    await this.prisma.$transaction([
      this.prisma.course.update({
        where: { id: courseId },
        data: { reviewStatus: 'SUBMITTED', submittedForReviewAt: new Date() },
      }),
      this.prisma.courseReview.create({
        data: {
          courseId,
          reviewerId: null,
          action: 'SUBMITTED',
          previousStatus,
          newStatus: 'SUBMITTED',
        },
      }),
    ]);

    await this.notifications.createMany([
      {
        userId,
        type: 'COURSE_SUBMITTED_FOR_REVIEW',
        entityType: 'Course',
        entityId: courseId,
        title: 'Course submitted for review',
        body: `"${course.title}" is now in Teyro's review queue.`,
        deepLink: `/creator/courses/${courseId}/manage`,
      },
    ]);

    return { reviewStatus: 'SUBMITTED' as const };
  }

  /** Creator-visible: status + history with internal notes stripped. */
  async statusFor(courseId: string, userId: string, isAdmin = false) {
    const course = await this.prisma.course.findUnique({
      where: { id: courseId },
      select: {
        instructorId: true,
        reviewStatus: true,
        submittedForReviewAt: true,
        reviewedAt: true,
      },
    });
    if (!course) throw new NotFoundException('Course not found');
    if (course.instructorId !== userId && !isAdmin) {
      throw new ForbiddenException(
        'You do not have permission to view this course',
      );
    }

    const history = await this.prisma.courseReview.findMany({
      where: { courseId },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        action: true,
        previousStatus: true,
        newStatus: true,
        feedback: true,
        createdAt: true,
      },
    });

    return {
      reviewStatus: course.reviewStatus,
      submittedForReviewAt: course.submittedForReviewAt,
      reviewedAt: course.reviewedAt,
      history,
    };
  }

  // ── Admin-facing (called from AdminCoursesService) ──────────────────

  async startReview(courseId: string, adminId: string) {
    const course = await this.requireCourse(courseId);
    if (course.reviewStatus !== 'SUBMITTED') {
      throw new BadRequestException(
        'Only a submitted course can enter review.',
      );
    }

    await this.recordTransition(courseId, {
      reviewerId: adminId,
      action: 'STARTED_REVIEW',
      previousStatus: course.reviewStatus,
      newStatus: 'UNDER_REVIEW',
      courseData: { reviewedBy: adminId },
    });

    return { reviewStatus: 'UNDER_REVIEW' as const };
  }

  async requestChanges(
    courseId: string,
    adminId: string,
    feedback: string,
    internalNote?: string,
  ) {
    if (!feedback?.trim()) {
      throw new BadRequestException(
        'Feedback is required when requesting changes.',
      );
    }
    const course = await this.requireCourse(courseId);
    if (!REVIEWABLE.includes(course.reviewStatus)) {
      throw new BadRequestException(
        'This course is not awaiting a review decision.',
      );
    }

    await this.recordTransition(courseId, {
      reviewerId: adminId,
      action: 'CHANGES_REQUESTED',
      previousStatus: course.reviewStatus,
      newStatus: 'CHANGES_REQUESTED',
      feedback: feedback.trim(),
      internalNote: internalNote?.trim(),
      courseData: { reviewedAt: new Date(), reviewedBy: adminId },
    });

    await this.notifyCreator(
      course,
      'COURSE_CHANGES_REQUIRED',
      'Changes requested',
      `Teyro reviewed "${course.title}" and requested changes: ${feedback.trim()}`,
    );
    return { reviewStatus: 'CHANGES_REQUESTED' as const };
  }

  async approve(courseId: string, adminId: string, internalNote?: string) {
    const course = await this.requireCourse(courseId);
    if (!REVIEWABLE.includes(course.reviewStatus)) {
      throw new BadRequestException(
        'This course is not awaiting a review decision.',
      );
    }

    await this.recordTransition(courseId, {
      reviewerId: adminId,
      action: 'APPROVED',
      previousStatus: course.reviewStatus,
      newStatus: 'APPROVED',
      internalNote: internalNote?.trim(),
      courseData: { reviewedAt: new Date(), reviewedBy: adminId },
    });

    await this.notifyCreator(
      course,
      'COURSE_APPROVED',
      'Course approved',
      `"${course.title}" passed Teyro's review and is ready to publish.`,
    );
    return { reviewStatus: 'APPROVED' as const };
  }

  /**
   * Reserved for serious policy violations, not ordinary quality issues —
   * those go through requestChanges. If the course happens to be live, it
   * comes down immediately: a rejected course cannot stay published.
   */
  async reject(
    courseId: string,
    adminId: string,
    reason: string,
    internalNote?: string,
  ) {
    if (!reason?.trim()) {
      throw new BadRequestException('A reason is required to reject a course.');
    }
    const course = await this.requireCourse(courseId);
    if (course.reviewStatus === 'REJECTED') {
      throw new BadRequestException('This course is already rejected.');
    }

    await this.recordTransition(courseId, {
      reviewerId: adminId,
      action: 'REJECTED',
      previousStatus: course.reviewStatus,
      newStatus: 'REJECTED',
      feedback: reason.trim(),
      internalNote: internalNote?.trim(),
      courseData: {
        reviewedAt: new Date(),
        reviewedBy: adminId,
        ...(course.published ? { published: false } : {}),
      },
    });

    await this.notifyCreator(
      course,
      'COURSE_REJECTED',
      'Course rejected',
      `Teyro rejected "${course.title}": ${reason.trim()}`,
    );
    return { reviewStatus: 'REJECTED' as const };
  }

  /** Full history including internal notes — admin only. */
  async historyForAdmin(courseId: string) {
    return this.prisma.courseReview.findMany({
      where: { courseId },
      orderBy: { createdAt: 'desc' },
    });
  }

  private async requireCourse(courseId: string): Promise<Course> {
    const course = await this.prisma.course.findUnique({
      where: { id: courseId },
    });
    if (!course) throw new NotFoundException('Course not found');
    return course;
  }

  private async recordTransition(
    courseId: string,
    opts: {
      reviewerId: string | null;
      action:
        | 'SUBMITTED'
        | 'STARTED_REVIEW'
        | 'CHANGES_REQUESTED'
        | 'APPROVED'
        | 'REJECTED'
        | 'REOPENED';
      previousStatus: CourseReviewStatus;
      newStatus: CourseReviewStatus;
      feedback?: string;
      internalNote?: string;
      courseData?: Record<string, unknown>;
    },
  ) {
    await this.prisma.$transaction([
      this.prisma.course.update({
        where: { id: courseId },
        data: { reviewStatus: opts.newStatus, ...opts.courseData },
      }),
      this.prisma.courseReview.create({
        data: {
          courseId,
          reviewerId: opts.reviewerId,
          action: opts.action,
          previousStatus: opts.previousStatus,
          newStatus: opts.newStatus,
          feedback: opts.feedback ?? null,
          internalNote: opts.internalNote ?? null,
        },
      }),
    ]);
  }

  private async notifyCreator(
    course: Course,
    type: string,
    title: string,
    body: string,
  ) {
    await this.notifications.createMany([
      {
        userId: course.instructorId,
        type,
        entityType: 'Course',
        entityId: course.id,
        title,
        body,
        deepLink: `/creator/courses/${course.id}/manage`,
      },
    ]);
  }
}
