import { CourseService } from './course.service';

/**
 * The lesson player's open/quit pings (creator analytics). They only touch
 * the learner's own row for a lesson they're seated in, never a finished
 * lesson, and only accept the step shapes the player sends.
 */

function build(seated = true) {
  const prisma: any = {
    lesson: { findFirst: jest.fn().mockResolvedValue(seated ? { id: 'l1' } : null) },
    userLessonProgress: {
      upsert: jest.fn().mockResolvedValue({}),
      updateMany: jest.fn().mockResolvedValue({ count: 1 }),
    },
  };
  const service = Object.create(CourseService.prototype) as CourseService;
  (service as any).prisma = prisma;
  return { service, prisma };
}

describe('lesson pings', () => {
  it('open: creates an in-progress row once, then counts re-opens', async () => {
    const { service, prisma } = build();
    await service.recordLessonOpen('u1', 'course-1', 'l1');
    const call = prisma.userLessonProgress.upsert.mock.calls[0][0];
    expect(call.create).toMatchObject({ userId: 'u1', lessonId: 'l1', status: 'in_progress', openCount: 1 });
    expect(call.update).toEqual({ openCount: { increment: 1 } });
    // Seated = published lesson of a published course the learner is enrolled in.
    expect(prisma.lesson.findFirst.mock.calls[0][0].where.section.course).toMatchObject({
      published: true,
      enrollments: { some: { userId: 'u1' } },
    });
  });

  it('open/quit do nothing for a lesson the learner is not seated in', async () => {
    const { service, prisma } = build(false);
    await service.recordLessonOpen('u1', 'course-1', 'l1');
    await service.recordLessonQuit('u1', 'course-1', 'l1', 'reflect');
    expect(prisma.userLessonProgress.upsert).not.toHaveBeenCalled();
    expect(prisma.userLessonProgress.updateMany).not.toHaveBeenCalled();
  });

  it('quit: records where, only on an unfinished row', async () => {
    const { service, prisma } = build();
    await service.recordLessonQuit('u1', 'course-1', 'l1', 'apply:ex_2');
    expect(prisma.userLessonProgress.updateMany).toHaveBeenCalledWith({
      where: { userId: 'u1', lessonId: 'l1', completedAt: null },
      data: { quitCount: { increment: 1 }, lastStepId: 'apply:ex_2' },
    });
  });

  it.each(['learn:3:8', 'apply:abc-123', 'reflect', 'deepen'])('accepts the step %s', async (step) => {
    const { service, prisma } = build();
    await service.recordLessonQuit('u1', 'c', 'l1', step);
    expect(prisma.userLessonProgress.updateMany).toHaveBeenCalled();
  });

  it.each(['', 'learn', 'learn:x:1', 'apply:', 'apply:<script>', 'finish', 42, null])('rejects the step %p', async (step) => {
    const { service, prisma } = build();
    await service.recordLessonQuit('u1', 'c', 'l1', step);
    expect(prisma.lesson.findFirst).not.toHaveBeenCalled();
    expect(prisma.userLessonProgress.updateMany).not.toHaveBeenCalled();
  });
});
