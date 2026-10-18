import { NotFoundException } from '@nestjs/common';
import { CertificateService } from './certificate.service';

function makeDb() {
  const certs: any[] = [];
  const enrollments = new Map<
    string,
    { completedLessons: string[]; testedOutLessons: string[] }
  >();
  const lessons = [
    { id: 'l1', durationMinutes: 10 },
    { id: 'l2', durationMinutes: 10 },
    { id: 'l3', durationMinutes: 10 },
  ];

  const prisma: any = {
    certificate: {
      findUnique: jest.fn(async ({ where }) => {
        if (where.code) return certs.find((c) => c.code === where.code) ?? null;
        const k = where.userId_courseId;
        return (
          certs.find(
            (c) => c.userId === k.userId && c.courseId === k.courseId,
          ) ?? null
        );
      }),
      findMany: jest.fn(async ({ where }) =>
        certs.filter((c) => c.userId === where.userId),
      ),
      create: jest.fn(async ({ data }) => {
        const row = {
          issuedAt: new Date('2026-10-18T00:00:00Z'),
          revokedAt: null,
          ...data,
        };
        certs.push(row);
        return row;
      }),
    },
    enrollment: {
      findUnique: jest.fn(
        async ({ where }) =>
          enrollments.get(where.userId_courseId.courseId) ?? null,
      ),
      findMany: jest.fn(async () =>
        [...enrollments.keys()].map((courseId) => ({ courseId })),
      ),
    },
    lesson: {
      findMany: jest.fn(async () => lessons.map(({ id }) => ({ id }))),
    },
    userCourseProgress: {
      findUnique: jest.fn(async () => ({
        completedAt: new Date('2026-10-16T09:00:00Z'),
      })),
    },
    userLessonProgress: {
      findFirst: jest.fn(async () => null),
      aggregate: jest.fn(async () => ({ _sum: { timeSpentSeconds: 5400 } })),
    },
    user: { findUnique: jest.fn(async () => ({ fullName: 'Ada Okafor' })) },
    course: {
      findUnique: jest.fn(async () => ({
        title: 'Python for Beginners',
        slug: 'python-for-beginners',
        isOriginal: true,
        category: 'Coding',
        outcomes: [
          'Write and run real Python code.',
          'Store data in variables',
          'x'.repeat(80),
        ],
        instructor: { fullName: 'Teyro' },
      })),
    },
    studentProfile: {
      findUnique: jest.fn(async () => ({ longestStreak: 30, streakDays: 4 })),
    },
    section: { findMany: jest.fn(async () => [{ lessons }, { lessons: [] }]) },
    courseWeeklyXp: {
      aggregate: jest.fn(async () => ({ _sum: { xpEarned: 640 } })),
    },
  };
  return { prisma, certs, enrollments };
}

describe('CertificateService', () => {
  it('reports progress until every published lesson is really done', async () => {
    const { prisma, enrollments } = makeDb();
    // Tested-out lessons are kept apart and never count toward a certificate.
    enrollments.set('c1', {
      completedLessons: ['l1'],
      testedOutLessons: ['l2', 'l3'],
    });
    const service = new CertificateService(prisma);
    expect(await service.forCourse('u1', 'c1')).toEqual({
      status: 'IN_PROGRESS',
      lessonsDone: 1,
      lessonsTotal: 3,
    });
  });

  it('issues once on completion, from real data, and keeps the same code', async () => {
    const { prisma, enrollments, certs } = makeDb();
    enrollments.set('c1', {
      completedLessons: ['l1', 'l2', 'l3'],
      testedOutLessons: [],
    });
    const service = new CertificateService(prisma);

    const first = await service.forCourse('u1', 'c1');
    const again = await service.forCourse('u1', 'c1');
    if (first.status !== 'ISSUED' || again.status !== 'ISSUED')
      throw new Error('expected ISSUED');

    expect(certs).toHaveLength(1);
    expect(again.certificate.code).toBe(first.certificate.code);
    expect(first.certificate.code).toMatch(/^[A-Z2-9]{8}$/);
    expect(first.certificate.completedAt).toBe('2026-10-16T09:00:00.000Z');
    expect(first.certificate.data).toMatchObject({
      learnerName: 'Ada Okafor',
      chapters: 1,
      lessons: 3,
      minutes: 90,
      xp: 640,
      bestStreak: 30,
      // Trailing full stops trimmed, over-long outcomes dropped.
      skills: ['Write and run real Python code', 'Store data in variables'],
      signer: { name: 'Teyro Originals', title: 'Course team, Teyro' },
    });
  });

  it('issues certificates a learner earned before certificates existed', async () => {
    const { prisma, enrollments } = makeDb();
    enrollments.set('done', {
      completedLessons: ['l1', 'l2', 'l3'],
      testedOutLessons: [],
    });
    enrollments.set('started', {
      completedLessons: ['l1'],
      testedOutLessons: [],
    });
    const service = new CertificateService(prisma);
    const mine = await service.mine('u1');
    expect(mine.map((c) => c.courseId)).toEqual(['done']);
  });

  it('verifies a code typed with or without the TY- prefix and dashes', async () => {
    const { prisma, enrollments } = makeDb();
    enrollments.set('c1', {
      completedLessons: ['l1', 'l2', 'l3'],
      testedOutLessons: [],
    });
    const service = new CertificateService(prisma);
    const issued = await service.forCourse('u1', 'c1');
    if (issued.status !== 'ISSUED') throw new Error('expected ISSUED');
    const code = issued.certificate.code;

    await expect(
      service.verify(`TY-${code.slice(0, 4)}-${code.slice(4)}`),
    ).resolves.toMatchObject({ code });
    await expect(service.verify(code.toLowerCase())).resolves.toMatchObject({
      code,
    });
    await expect(service.verify('nope')).rejects.toBeInstanceOf(
      NotFoundException,
    );
  });
});
