import {
  BadRequestException,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { CourseReviewService } from './course-review.service';

/**
 * The invariants this file exists to pin down:
 *  - a course can't be edited while SUBMITTED/UNDER_REVIEW (the race the
 *    whole feature is built to prevent — approving version A while the
 *    creator silently ships version B)
 *  - editing an APPROVED course reopens it to DRAFT rather than leaving a
 *    stale approval attached to changed content
 *  - submission is blocked unless the course structurally passes the same
 *    gate publishCourse uses
 *  - every review decision requires the right starting state, and
 *    request-changes/reject require real feedback/reason text
 *  - a rejected course that was live comes down immediately
 */
function makeService(courseOverrides: Record<string, unknown> = {}) {
  const courseUpdate = jest.fn().mockResolvedValue({});
  const reviewCreate = jest.fn().mockResolvedValue({ id: 'rev1' });
  const createMany = jest.fn().mockResolvedValue(undefined);

  const prisma = {
    course: {
      findUnique: jest.fn().mockResolvedValue({ reviewStatus: 'DRAFT' }),
      update: courseUpdate,
      ...courseOverrides,
    },
    courseReview: {
      create: reviewCreate,
      findMany: jest.fn().mockResolvedValue([]),
    },
    $transaction: jest.fn((ops: unknown[]) => Promise.all(ops)),
  };

  const notifications = { createMany };

  return {
    svc: new CourseReviewService(prisma as never, notifications as never),
    prisma,
    courseUpdate,
    reviewCreate,
    createMany,
  };
}

describe('CourseReviewService — assertEditableAndReopen', () => {
  it.each(['SUBMITTED', 'UNDER_REVIEW'])(
    'refuses an edit while the course is %s',
    async (status) => {
      const { svc } = makeService({
        findUnique: jest.fn().mockResolvedValue({ reviewStatus: status }),
      });
      await expect(svc.assertEditableAndReopen('c1')).rejects.toThrow(
        ForbiddenException,
      );
    },
  );

  it.each(['DRAFT', 'CHANGES_REQUESTED', 'REJECTED'])(
    'allows an edit and does nothing extra when the course is %s',
    async (status) => {
      const { svc, courseUpdate, reviewCreate } = makeService({
        findUnique: jest.fn().mockResolvedValue({ reviewStatus: status }),
      });
      await svc.assertEditableAndReopen('c1');
      expect(courseUpdate).not.toHaveBeenCalled();
      expect(reviewCreate).not.toHaveBeenCalled();
    },
  );

  it('silently reopens an APPROVED course to DRAFT instead of leaving a stale approval', async () => {
    const { svc, courseUpdate, reviewCreate } = makeService({
      findUnique: jest.fn().mockResolvedValue({ reviewStatus: 'APPROVED' }),
    });
    await svc.assertEditableAndReopen('c1');

    expect(courseUpdate).toHaveBeenCalledWith({
      where: { id: 'c1' },
      data: { reviewStatus: 'DRAFT' },
    });
    expect(reviewCreate).toHaveBeenCalledWith({
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- expect.objectContaining() is typed `any` in @types/jest
      data: expect.objectContaining({
        action: 'REOPENED',
        reviewerId: null,
        previousStatus: 'APPROVED',
        newStatus: 'DRAFT',
      }),
    });
  });

  it('does nothing when the course does not exist (lets the caller 404 instead)', async () => {
    const { svc, courseUpdate } = makeService({
      findUnique: jest.fn().mockResolvedValue(null),
    });
    await expect(svc.assertEditableAndReopen('ghost')).resolves.toBeUndefined();
    expect(courseUpdate).not.toHaveBeenCalled();
  });
});

const readyCourse = {
  instructorId: 'creator1',
  reviewStatus: 'DRAFT',
  title: 'My Course',
  sections: [
    { title: 'Intro', lessons: [{ title: 'Welcome', status: 'published' }] },
  ],
};

describe('CourseReviewService — submitForReview', () => {
  it('rejects a course that fails the structural readiness gate', async () => {
    const { svc } = makeService({
      findUnique: jest.fn().mockResolvedValue({ ...readyCourse, sections: [] }),
    });
    await expect(svc.submitForReview('c1', 'creator1')).rejects.toThrow(
      /isn't ready to submit/,
    );
  });

  it('refuses a non-owner', async () => {
    const { svc } = makeService({
      findUnique: jest.fn().mockResolvedValue(readyCourse),
    });
    await expect(svc.submitForReview('c1', 'someone-else')).rejects.toThrow(
      ForbiddenException,
    );
  });

  it.each(['SUBMITTED', 'UNDER_REVIEW'])(
    'refuses a duplicate submission while already %s',
    async (status) => {
      const { svc } = makeService({
        findUnique: jest
          .fn()
          .mockResolvedValue({ ...readyCourse, reviewStatus: status }),
      });
      await expect(svc.submitForReview('c1', 'creator1')).rejects.toThrow(
        BadRequestException,
      );
    },
  );

  it('refuses to resubmit an already-approved course', async () => {
    const { svc } = makeService({
      findUnique: jest
        .fn()
        .mockResolvedValue({ ...readyCourse, reviewStatus: 'APPROVED' }),
    });
    await expect(svc.submitForReview('c1', 'creator1')).rejects.toThrow(
      BadRequestException,
    );
  });

  it('submits a ready DRAFT course and notifies the creator', async () => {
    const { svc, courseUpdate, reviewCreate, createMany } = makeService({
      findUnique: jest.fn().mockResolvedValue(readyCourse),
    });
    const result = await svc.submitForReview('c1', 'creator1');

    expect(result).toEqual({ reviewStatus: 'SUBMITTED' });
    expect(courseUpdate).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { id: 'c1' },
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- expect.objectContaining() is typed `any` in @types/jest
        data: expect.objectContaining({ reviewStatus: 'SUBMITTED' }),
      }),
    );
    expect(reviewCreate).toHaveBeenCalledWith({
      data: expect.objectContaining({ action: 'SUBMITTED', reviewerId: null }), // eslint-disable-line @typescript-eslint/no-unsafe-assignment -- expect.objectContaining() is typed `any` in @types/jest
    });
    expect(createMany).toHaveBeenCalledWith([
      expect.objectContaining({
        userId: 'creator1',
        type: 'COURSE_SUBMITTED_FOR_REVIEW',
      }),
    ]);
  });

  it('allows resubmission from CHANGES_REQUESTED', async () => {
    const { svc } = makeService({
      findUnique: jest.fn().mockResolvedValue({
        ...readyCourse,
        reviewStatus: 'CHANGES_REQUESTED',
      }),
    });
    await expect(svc.submitForReview('c1', 'creator1')).resolves.toEqual({
      reviewStatus: 'SUBMITTED',
    });
  });
});

describe('CourseReviewService — admin decisions', () => {
  it('startReview only accepts a SUBMITTED course', async () => {
    const { svc } = makeService({
      findUnique: jest.fn().mockResolvedValue({ reviewStatus: 'DRAFT' }),
    });
    await expect(svc.startReview('c1', 'admin1')).rejects.toThrow(
      BadRequestException,
    );
  });

  it('startReview moves SUBMITTED to UNDER_REVIEW', async () => {
    const { svc, courseUpdate } = makeService({
      findUnique: jest.fn().mockResolvedValue({ reviewStatus: 'SUBMITTED' }),
    });
    const result = await svc.startReview('c1', 'admin1');
    expect(result).toEqual({ reviewStatus: 'UNDER_REVIEW' });
    expect(courseUpdate).toHaveBeenCalledWith(
      expect.objectContaining({
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- expect.objectContaining() is typed `any` in @types/jest
        data: expect.objectContaining({
          reviewStatus: 'UNDER_REVIEW',
          reviewedBy: 'admin1',
        }),
      }),
    );
  });

  it('requestChanges requires non-empty feedback', async () => {
    const { svc } = makeService({
      findUnique: jest.fn().mockResolvedValue({ reviewStatus: 'UNDER_REVIEW' }),
    });
    await expect(svc.requestChanges('c1', 'admin1', '')).rejects.toThrow(
      BadRequestException,
    );
    await expect(svc.requestChanges('c1', 'admin1', '   ')).rejects.toThrow(
      BadRequestException,
    );
  });

  it.each(['DRAFT', 'CHANGES_REQUESTED', 'APPROVED', 'REJECTED'])(
    'requestChanges/approve refuse a course not awaiting a decision (%s)',
    async (status) => {
      const { svc } = makeService({
        findUnique: jest
          .fn()
          .mockResolvedValue({ reviewStatus: status, instructorId: 'c1' }),
      });
      await expect(
        svc.requestChanges('c1', 'admin1', 'fix it'),
      ).rejects.toThrow(BadRequestException);
      await expect(svc.approve('c1', 'admin1')).rejects.toThrow(
        BadRequestException,
      );
    },
  );

  it('requestChanges notifies the creator with the feedback text', async () => {
    const { svc, createMany } = makeService({
      findUnique: jest.fn().mockResolvedValue({
        reviewStatus: 'UNDER_REVIEW',
        instructorId: 'creator1',
        title: 'X',
      }),
    });
    await svc.requestChanges('c1', 'admin1', 'Fix lesson 3');
    expect(createMany).toHaveBeenCalledWith([
      expect.objectContaining({
        userId: 'creator1',
        type: 'COURSE_CHANGES_REQUIRED',
      }),
    ]);
  });

  it('approve moves SUBMITTED or UNDER_REVIEW to APPROVED and notifies the creator', async () => {
    const { svc, courseUpdate, createMany } = makeService({
      findUnique: jest.fn().mockResolvedValue({
        reviewStatus: 'SUBMITTED',
        instructorId: 'creator1',
        title: 'X',
      }),
    });
    const result = await svc.approve('c1', 'admin1');
    expect(result).toEqual({ reviewStatus: 'APPROVED' });
    expect(courseUpdate).toHaveBeenCalledWith(
      expect.objectContaining({
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- expect.objectContaining() is typed `any` in @types/jest
        data: expect.objectContaining({ reviewStatus: 'APPROVED' }),
      }),
    );
    expect(createMany).toHaveBeenCalledWith([
      expect.objectContaining({ type: 'COURSE_APPROVED' }),
    ]);
  });

  it('reject requires a reason', async () => {
    const { svc } = makeService({
      findUnique: jest.fn().mockResolvedValue({ reviewStatus: 'UNDER_REVIEW' }),
    });
    await expect(svc.reject('c1', 'admin1', '')).rejects.toThrow(
      BadRequestException,
    );
  });

  it('reject refuses to re-reject an already-rejected course', async () => {
    const { svc } = makeService({
      findUnique: jest.fn().mockResolvedValue({ reviewStatus: 'REJECTED' }),
    });
    await expect(svc.reject('c1', 'admin1', 'reason')).rejects.toThrow(
      BadRequestException,
    );
  });

  it('reject takes down an already-published course', async () => {
    const { svc, courseUpdate } = makeService({
      findUnique: jest.fn().mockResolvedValue({
        reviewStatus: 'APPROVED',
        published: true,
        instructorId: 'creator1',
        title: 'X',
      }),
    });
    await svc.reject('c1', 'admin1', 'Policy violation');
    expect(courseUpdate).toHaveBeenCalledWith(
      expect.objectContaining({
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- expect.objectContaining() is typed `any` in @types/jest
        data: expect.objectContaining({
          reviewStatus: 'REJECTED',
          published: false,
        }),
      }),
    );
  });

  it('reject leaves an unpublished course unpublished (no spurious field write)', async () => {
    const { svc, courseUpdate } = makeService({
      findUnique: jest.fn().mockResolvedValue({
        reviewStatus: 'SUBMITTED',
        published: false,
        instructorId: 'creator1',
        title: 'X',
      }),
    });
    await svc.reject('c1', 'admin1', 'Bad content');
    const calls = courseUpdate.mock.calls as {
      data: Record<string, unknown>;
    }[][];
    expect(calls[0][0].data).not.toHaveProperty('published');
  });

  it('404s every admin action on an unknown course', async () => {
    const { svc } = makeService({
      findUnique: jest.fn().mockResolvedValue(null),
    });
    await expect(svc.startReview('ghost', 'admin1')).rejects.toThrow(
      NotFoundException,
    );
    await expect(svc.approve('ghost', 'admin1')).rejects.toThrow(
      NotFoundException,
    );
    await expect(svc.reject('ghost', 'admin1', 'reason')).rejects.toThrow(
      NotFoundException,
    );
  });
});
