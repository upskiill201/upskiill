import {
  BadRequestException,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { CertificateService } from './certificate.service';

function makeDb(
  user: Record<string, unknown> = {
    fullName: 'codeking99',
    certificateName: 'Ada Okafor',
    certificateNameConfirmedAt: new Date('2026-10-01T00:00:00Z'),
    certificateNameCorrectedAt: null,
  },
) {
  const certs: any[] = [];
  const changes: any[] = [];
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
      findFirst: jest.fn(
        async ({ where }) =>
          certs.filter((c) => c.userId === where.userId).at(-1) ?? null,
      ),
      count: jest.fn(
        async ({ where }) =>
          certs.filter((c) => c.userId === where.userId).length,
      ),
      update: jest.fn(async ({ where, data }) => {
        const row = certs.find((c) => c.id === where.id);
        Object.assign(row, data);
        return row;
      }),
      create: jest.fn(async ({ data }) => {
        const row = {
          id: `cert-${certs.length + 1}`,
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
    user: {
      findUnique: jest.fn(async () => ({ ...user })),
      update: jest.fn(async ({ data }) => Object.assign(user, data)),
    },
    certificateNameChange: {
      create: jest.fn(async ({ data }) => {
        changes.push(data);
        return data;
      }),
    },
    $transaction: jest.fn(async (ops: Promise<unknown>[]) => Promise.all(ops)),
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
  return { prisma, certs, changes, enrollments, user };
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

describe('CertificateService — certificate names', () => {
  const finished = {
    completedLessons: ['l1', 'l2', 'l3'],
    testedOutLessons: [],
  };
  const fresh = () => ({
    fullName: 'codeking99',
    certificateName: null,
    certificateNameConfirmedAt: null,
    certificateNameCorrectedAt: null,
  });

  it('issues nothing until the learner confirms a real name', async () => {
    const { prisma, enrollments, certs } = makeDb(fresh());
    enrollments.set('c1', finished);
    const service = new CertificateService(prisma);

    expect(await service.forCourse('u1', 'c1')).toEqual({
      status: 'NAME_REQUIRED',
    });
    expect(await service.mine('u1')).toEqual([]);
    expect(certs).toHaveLength(0);
    expect(await service.nameState('u1')).toMatchObject({
      name: null,
      suggested: 'codeking99',
      canEdit: true,
      held: 0,
      earnedUnclaimed: 1,
    });
  });

  it('confirming a name issues waiting certificates with it, and logs it', async () => {
    const { prisma, enrollments, certs, changes } = makeDb(fresh());
    enrollments.set('c1', finished);
    const service = new CertificateService(prisma);

    const state = await service.setName('u1', '  ADA   OKAFOR ');
    expect(state).toMatchObject({
      name: 'Ada Okafor',
      held: 1,
      earnedUnclaimed: 0,
      canEdit: true,
    });
    expect(state.editableUntil).not.toBeNull();
    expect(certs[0].data).toMatchObject({
      learnerName: 'Ada Okafor',
      nameConfirmed: true,
    });
    expect(changes).toEqual([
      { userId: 'u1', oldName: null, newName: 'Ada Okafor', source: 'LEARNER' },
    ]);
  });

  it('rejects names that cannot go on a certificate', async () => {
    const service = new CertificateService(makeDb(fresh()).prisma);
    for (const bad of [
      '',
      'Ada',
      'codeking99 x',
      'Ada 🙂 Okafor',
      'Teyro learner',
    ])
      await expect(service.setName('u1', bad)).rejects.toBeInstanceOf(
        BadRequestException,
      );
  });

  it('allows one correction, reprints held certificates, then locks', async () => {
    const { prisma, enrollments, certs } = makeDb({
      fullName: 'codeking99',
      certificateName: 'Ada Okafr',
      certificateNameConfirmedAt: new Date(Date.now() - 60_000),
      certificateNameCorrectedAt: null,
    });
    enrollments.set('c1', finished);
    const service = new CertificateService(prisma);
    const issued = await service.forCourse('u1', 'c1');
    if (issued.status !== 'ISSUED') throw new Error('expected ISSUED');

    const corrected = await service.setName('u1', 'Ada Okafor');
    expect(corrected).toMatchObject({
      name: 'Ada Okafor',
      canEdit: false,
      editableUntil: null,
    });
    expect(certs[0].code).toBe(issued.certificate.code);
    expect(certs[0].data.learnerName).toBe('Ada Okafor');

    await expect(
      service.setName('u1', 'Ada Okafor-Bello'),
    ).rejects.toBeInstanceOf(ForbiddenException);
    // Support can still change it.
    await expect(
      service.setNameBySupport('u1', 'Ada Okafor-Bello'),
    ).resolves.toMatchObject({ name: 'Ada Okafor-Bello' });
    expect(certs[0].data.learnerName).toBe('Ada Okafor-Bello');
  });

  it('closes the correction window after 7 days', async () => {
    const { prisma } = makeDb({
      fullName: 'Ada',
      certificateName: 'Ada Okafor',
      certificateNameConfirmedAt: new Date(Date.now() - 8 * 86_400_000),
      certificateNameCorrectedAt: null,
    });
    const service = new CertificateService(prisma);
    expect(await service.nameState('u1')).toMatchObject({ canEdit: false });
    await expect(service.setName('u1', 'Ada Bello')).rejects.toBeInstanceOf(
      ForbiddenException,
    );
  });

  it('asks learners with old certificates to confirm the printed name', async () => {
    const { prisma, enrollments, certs, user } = makeDb(fresh());
    enrollments.set('c1', finished);
    const service = new CertificateService(prisma);
    // A certificate issued before this step existed, printed with the profile name.
    Object.assign(user, { certificateName: null });
    certs.push({
      id: 'old',
      userId: 'u1',
      courseId: 'c1',
      code: 'OLDCODE2',
      data: { learnerName: 'Ada O.' },
      issuedAt: new Date(),
      completedAt: new Date(),
      revokedAt: null,
    });
    expect(await service.nameState('u1')).toMatchObject({
      name: null,
      suggested: 'Ada O.',
      held: 1,
      earnedUnclaimed: 0,
    });
    await service.setName('u1', 'Ada Okafor');
    expect(certs[0].data).toEqual({
      learnerName: 'Ada Okafor',
      nameConfirmed: true,
    });
  });
});
