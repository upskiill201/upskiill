import { resolveFocusCourseId, resolveFocusCourseIds, setFocusCourse } from './focus-course.util';

function db(opts: {
  profiles?: Array<{ userId: string; focusCourseId: string | null }>;
  enrollments?: Array<{ userId: string; courseId: string }>; // newest first
}) {
  return {
    studentProfile: {
      findMany: jest.fn().mockResolvedValue(opts.profiles ?? []),
      updateMany: jest.fn().mockResolvedValue({ count: 1 }),
    },
    enrollment: {
      findMany: jest.fn().mockResolvedValue(opts.enrollments ?? []),
      findUnique: jest.fn(),
    },
  };
}

describe('focus course', () => {
  it('uses the course the learner chose, when still enrolled', async () => {
    const prisma = db({
      profiles: [{ userId: 'u1', focusCourseId: 'b' }],
      enrollments: [
        { userId: 'u1', courseId: 'a' },
        { userId: 'u1', courseId: 'b' },
      ],
    });
    expect(await resolveFocusCourseId(prisma as never, 'u1')).toBe('b');
  });

  it('falls back to the most recently active enrolment when nothing was chosen', async () => {
    const prisma = db({
      profiles: [{ userId: 'u1', focusCourseId: null }],
      enrollments: [
        { userId: 'u1', courseId: 'a' },
        { userId: 'u1', courseId: 'b' },
      ],
    });
    expect(await resolveFocusCourseId(prisma as never, 'u1')).toBe('a');
  });

  it('ignores a choice the learner is no longer enrolled in', async () => {
    const prisma = db({
      profiles: [{ userId: 'u1', focusCourseId: 'gone' }],
      enrollments: [{ userId: 'u1', courseId: 'a' }],
    });
    expect(await resolveFocusCourseId(prisma as never, 'u1')).toBe('a');
  });

  it('is null for a learner with no courses, and resolves many at once', async () => {
    const prisma = db({
      profiles: [{ userId: 'u2', focusCourseId: 'x' }],
      enrollments: [
        { userId: 'u2', courseId: 'x' },
        { userId: 'u3', courseId: 'y' },
      ],
    });
    const map = await resolveFocusCourseIds(prisma as never, ['u1', 'u2', 'u3']);
    expect(map.get('u1')).toBeNull();
    expect(map.get('u2')).toBe('x');
    expect(map.get('u3')).toBe('y');
  });

  it('only lets an enrolled course become the focus', async () => {
    const prisma = db({});
    prisma.enrollment.findUnique.mockResolvedValueOnce(null);
    expect(await setFocusCourse(prisma as never, 'u1', 'c')).toBe(false);
    expect(prisma.studentProfile.updateMany).not.toHaveBeenCalled();

    prisma.enrollment.findUnique.mockResolvedValueOnce({ id: 'e' });
    expect(await setFocusCourse(prisma as never, 'u1', 'c')).toBe(true);
    expect(prisma.studentProfile.updateMany).toHaveBeenCalledWith({
      where: { userId: 'u1' },
      data: { focusCourseId: 'c' },
    });
  });
});
