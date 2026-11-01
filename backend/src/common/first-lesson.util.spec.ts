import { firstLessonState } from './first-lesson.util';

/** The first-lesson journey's target: lesson 1, or the first lesson at a placed learner's level. */
describe('firstLessonState', () => {
  let prisma: any;

  beforeEach(() => {
    prisma = {
      enrollment: {
        findUnique: jest.fn().mockResolvedValue({
          completedLessons: [],
          testedOutLessons: [],
          user: { accountStatus: 'ACTIVE' },
          course: {
            id: 'c1',
            title: 'Python for Beginners',
            published: true,
            instructorId: null,
            instructor: null,
          },
        }),
      },
      userLessonProgress: { count: jest.fn().mockResolvedValue(0) },
      section: {
        findMany: jest
          .fn()
          .mockResolvedValue([
            {
              lessons: [
                {
                  id: 'l1',
                  title: 'One',
                  durationMinutes: 10,
                  estimatedDurationSeconds: 0,
                },
              ],
            },
            {
              lessons: [
                {
                  id: 'l2',
                  title: 'Two',
                  durationMinutes: 12,
                  estimatedDurationSeconds: 0,
                },
              ],
            },
          ]),
      },
    };
  });

  it('points a new learner at lesson 1', async () => {
    const s = await firstLessonState(prisma, 'u1', 'c1');
    expect(s).toMatchObject({
      eligible: true,
      lesson: { id: 'l1', sectionIndex: 0 },
    });
  });

  it('points a placed learner at the first lesson they did not test out of', async () => {
    prisma.enrollment.findUnique.mockResolvedValue({
      ...(await prisma.enrollment.findUnique()),
      testedOutLessons: ['l1'],
    });
    const s = await firstLessonState(prisma, 'u1', 'c1');
    expect(s).toMatchObject({
      eligible: true,
      lesson: { id: 'l2', sectionIndex: 1 },
      lessonPath: '/learn/c1/section/1?lesson=l2',
    });
  });

  it('treats a learner with a really completed lesson as started', async () => {
    prisma.enrollment.findUnique.mockResolvedValue({
      ...(await prisma.enrollment.findUnique()),
      completedLessons: ['l1'],
    });
    expect(await firstLessonState(prisma, 'u1', 'c1')).toEqual({
      eligible: false,
      reason: 'STARTED',
    });
  });
});
