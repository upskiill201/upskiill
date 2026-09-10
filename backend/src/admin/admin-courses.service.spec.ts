import {
  BadRequestException,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { AdminCoursesService } from './admin-courses.service';

/**
 * The invariant that matters most here: publish/unpublish must NOT
 * reimplement CourseService's quality gate — they call straight into it.
 * These tests assert the pass-through (right args, right isAdmin override)
 * and that a failure there (e.g. the "still a draft" gate) is never
 * silently swallowed or logged as a successful admin action.
 */
function makeService(courseOverrides: Record<string, unknown> = {}) {
  const auditCreate = jest.fn().mockResolvedValue({ id: 'log1' });
  const courseUpdate = jest.fn().mockResolvedValue({});

  const prisma = {
    course: {
      findUnique: jest
        .fn()
        .mockResolvedValue({ published: true, featured: false }),
      findMany: jest.fn().mockResolvedValue([]),
      count: jest.fn().mockResolvedValue(0),
      update: courseUpdate,
      ...courseOverrides,
    },
    enrollment: { count: jest.fn().mockResolvedValue(0) },
    earningsTransaction: {
      aggregate: jest.fn().mockResolvedValue({
        _sum: { netMinor: 0, creatorAmountMinor: 0, teyroAmountMinor: 0 },
        _count: { _all: 0 },
      }),
    },
    adminAuditLog: {
      create: auditCreate,
      findMany: jest.fn().mockResolvedValue([]),
    },
    $transaction: jest.fn((ops: unknown[]) => Promise.all(ops)),
  };

  const courseService = {
    publishCourse: jest.fn().mockResolvedValue({ published: true }),
    unpublishCourse: jest.fn().mockResolvedValue({ published: false }),
  };

  const courseReview = {
    startReview: jest.fn().mockResolvedValue({ reviewStatus: 'UNDER_REVIEW' }),
    requestChanges: jest
      .fn()
      .mockResolvedValue({ reviewStatus: 'CHANGES_REQUESTED' }),
    approve: jest.fn().mockResolvedValue({ reviewStatus: 'APPROVED' }),
    reject: jest.fn().mockResolvedValue({ reviewStatus: 'REJECTED' }),
    historyForAdmin: jest.fn().mockResolvedValue([]),
  };

  return {
    svc: new AdminCoursesService(
      prisma as never,
      courseService as never,
      courseReview as never,
    ),
    prisma,
    courseService,
    courseReview,
    auditCreate,
  };
}

describe('AdminCoursesService — publish', () => {
  it('delegates to CourseService.publishCourse with isAdmin=true, not a reimplemented check', async () => {
    const { svc, courseService } = makeService();
    await svc.publish('admin1', 'course1');
    expect(courseService.publishCourse).toHaveBeenCalledWith(
      'admin1',
      'course1',
      true,
    );
  });

  it('writes an audit row only after a successful publish', async () => {
    const { svc, auditCreate } = makeService();
    await svc.publish('admin1', 'course1');
    expect(auditCreate).toHaveBeenCalledWith({
      data: expect.objectContaining({ action: 'ADMIN_PUBLISHED_COURSE' }), // eslint-disable-line @typescript-eslint/no-unsafe-assignment -- expect.objectContaining() is typed `any` in @types/jest
    });
  });

  it('propagates the quality-gate rejection without logging a fake success', async () => {
    const { svc, courseService, auditCreate } = makeService();
    courseService.publishCourse.mockRejectedValue(
      new BadRequestException('This course is not ready to be published.'),
    );

    await expect(svc.publish('admin1', 'course1')).rejects.toThrow(
      BadRequestException,
    );
    expect(auditCreate).not.toHaveBeenCalled();
  });

  it('propagates an ownership/not-found failure from CourseService untouched', async () => {
    const { svc, courseService } = makeService();
    courseService.publishCourse.mockRejectedValue(
      new ForbiddenException('nope'),
    );
    await expect(svc.publish('admin1', 'course1')).rejects.toThrow(
      ForbiddenException,
    );
  });
});

describe('AdminCoursesService — unpublish', () => {
  it('delegates to CourseService.unpublishCourse with isAdmin=true', async () => {
    const { svc, courseService } = makeService();
    await svc.unpublish('admin1', 'course1');
    expect(courseService.unpublishCourse).toHaveBeenCalledWith(
      'admin1',
      'course1',
      true,
    );
  });
});

describe('AdminCoursesService — feature', () => {
  it('refuses to feature a draft (unpublished) course', async () => {
    const { svc } = makeService({
      findUnique: jest
        .fn()
        .mockResolvedValue({ published: false, featured: false }),
    });
    await expect(svc.feature('admin1', 'course1')).rejects.toThrow(
      BadRequestException,
    );
  });

  it('refuses to double-feature', async () => {
    const { svc } = makeService({
      findUnique: jest
        .fn()
        .mockResolvedValue({ published: true, featured: true }),
    });
    await expect(svc.feature('admin1', 'course1')).rejects.toThrow(
      BadRequestException,
    );
  });

  it('404s on an unknown course', async () => {
    const { svc } = makeService({
      findUnique: jest.fn().mockResolvedValue(null),
    });
    await expect(svc.feature('admin1', 'ghost')).rejects.toThrow(
      NotFoundException,
    );
  });

  it('features a published, not-yet-featured course and logs it', async () => {
    const { svc, auditCreate } = makeService();
    const result = await svc.feature('admin1', 'course1');
    expect(result).toEqual({ featured: true });
    expect(auditCreate).toHaveBeenCalledWith({
      data: expect.objectContaining({ action: 'ADMIN_FEATURED_COURSE' }), // eslint-disable-line @typescript-eslint/no-unsafe-assignment -- expect.objectContaining() is typed `any` in @types/jest
    });
  });
});

describe('AdminCoursesService — unfeature', () => {
  it('refuses to unfeature a course that is not featured', async () => {
    const { svc } = makeService({
      findUnique: jest.fn().mockResolvedValue({ featured: false }),
    });
    await expect(svc.unfeature('admin1', 'course1')).rejects.toThrow(
      BadRequestException,
    );
  });

  it('unfeatures a featured course and logs it', async () => {
    const { svc, auditCreate } = makeService({
      findUnique: jest.fn().mockResolvedValue({ featured: true }),
    });
    const result = await svc.unfeature('admin1', 'course1');
    expect(result).toEqual({ featured: false });
    expect(auditCreate).toHaveBeenCalledWith({
      data: expect.objectContaining({ action: 'ADMIN_UNFEATURED_COURSE' }), // eslint-disable-line @typescript-eslint/no-unsafe-assignment -- expect.objectContaining() is typed `any` in @types/jest
    });
  });
});

describe('AdminCoursesService — list', () => {
  it('caps pageSize at 100', async () => {
    const { svc, prisma } = makeService();
    await svc.list({ pageSize: '99999' });
    expect(prisma.course.findMany).toHaveBeenCalledWith(
      expect.objectContaining({ take: 100 }),
    );
  });

  it('filters by published/unpublished status', async () => {
    const { svc, prisma } = makeService();
    await svc.list({ status: 'published' });
    expect(prisma.course.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- expect.objectContaining() is typed `any` in @types/jest
        where: expect.objectContaining({ published: true }),
      }),
    );
  });

  it('rejects an unknown reviewStatus filter', async () => {
    const { svc } = makeService();
    await expect(svc.list({ reviewStatus: 'PENDING' })).rejects.toThrow(
      BadRequestException,
    );
  });

  it('sorts the review queue oldest-submission-first when sortBy=review', async () => {
    const { svc, prisma } = makeService();
    await svc.list({ reviewStatus: 'SUBMITTED', sortBy: 'review' });
    expect(prisma.course.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- expect.objectContaining() is typed `any` in @types/jest
        where: expect.objectContaining({ reviewStatus: 'SUBMITTED' }),
        orderBy: { submittedForReviewAt: 'asc' },
      }),
    );
  });
});

describe('AdminCoursesService — review decisions (thin wrapper over CourseReviewService)', () => {
  it('startReview delegates and writes an AdminAuditLog row', async () => {
    const { svc, courseReview, auditCreate } = makeService();
    const result = await svc.startReview('admin1', 'c1');
    expect(result).toEqual({ reviewStatus: 'UNDER_REVIEW' });
    expect(courseReview.startReview).toHaveBeenCalledWith('c1', 'admin1');
    expect(auditCreate).toHaveBeenCalledWith({
      data: expect.objectContaining({ action: 'ADMIN_STARTED_COURSE_REVIEW' }), // eslint-disable-line @typescript-eslint/no-unsafe-assignment -- expect.objectContaining() is typed `any` in @types/jest
    });
  });

  it('requestChanges delegates with the feedback text and audits it as the reason', async () => {
    const { svc, courseReview, auditCreate } = makeService();
    await svc.requestChanges('admin1', 'c1', 'Fix lesson 2', 'looked rushed');
    expect(courseReview.requestChanges).toHaveBeenCalledWith(
      'c1',
      'admin1',
      'Fix lesson 2',
      'looked rushed',
    );
    expect(auditCreate).toHaveBeenCalledWith({
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- expect.objectContaining() is typed `any` in @types/jest
      data: expect.objectContaining({
        action: 'ADMIN_REQUESTED_COURSE_CHANGES',
        reason: 'Fix lesson 2',
      }),
    });
  });

  it('approveReview delegates and audits', async () => {
    const { svc, courseReview, auditCreate } = makeService();
    const result = await svc.approveReview('admin1', 'c1');
    expect(result).toEqual({ reviewStatus: 'APPROVED' });
    expect(courseReview.approve).toHaveBeenCalledWith(
      'c1',
      'admin1',
      undefined,
    );
    expect(auditCreate).toHaveBeenCalledWith({
      data: expect.objectContaining({ action: 'ADMIN_APPROVED_COURSE' }), // eslint-disable-line @typescript-eslint/no-unsafe-assignment -- expect.objectContaining() is typed `any` in @types/jest
    });
  });

  it('rejectReview delegates with the reason and audits it', async () => {
    const { svc, courseReview, auditCreate } = makeService();
    await svc.rejectReview('admin1', 'c1', 'Policy violation');
    expect(courseReview.reject).toHaveBeenCalledWith(
      'c1',
      'admin1',
      'Policy violation',
      undefined,
    );
    expect(auditCreate).toHaveBeenCalledWith({
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- expect.objectContaining() is typed `any` in @types/jest
      data: expect.objectContaining({
        action: 'ADMIN_REJECTED_COURSE',
        reason: 'Policy violation',
      }),
    });
  });
});
