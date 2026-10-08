import { Prisma } from '@prisma/client';
import {
  baseLessonTitle,
  lessonRowsForFile,
  replanFileLessons,
} from './lesson-plan';

const MIN = 60_000;

function lesson(overrides: Record<string, unknown>) {
  return {
    id: 'l1',
    moduleId: 'm1',
    title: 'Deep Dive',
    orderIndex: 2,
    status: 'PENDING',
    createdLessonId: null,
    resourceFileIds: ['zip-1'],
    ...overrides,
  };
}

function fakeTx(existing: ReturnType<typeof lesson>[]) {
  return {
    courseImportLesson: {
      findMany: jest.fn().mockResolvedValue(existing),
      update: jest.fn(),
      deleteMany: jest.fn(),
      updateMany: jest.fn(),
      createMany: jest.fn(),
    },
  };
}

describe('lesson plan', () => {
  it('strips a part suffix back to the base title', () => {
    expect(baseLessonTitle('Hooks (Part 2 of 3)')).toBe('Hooks');
    expect(baseLessonTitle('Hooks')).toBe('Hooks');
  });

  it('keeps resources on the first part only', () => {
    const rows = lessonRowsForFile(
      { id: 'v1', durationMs: 30 * MIN },
      {
        moduleId: 'm1',
        title: 'Deep Dive',
        orderIndex: 0,
        resourceFileIds: ['zip-1'],
      },
    );
    expect(rows.map((r) => r.resourceFileIds)).toEqual([['zip-1'], [], []]);
  });

  it('splits a lesson once transcription reveals a long video Drive had no length for', async () => {
    const tx = fakeTx([lesson({})]);
    const count = await replanFileLessons(
      tx as unknown as Prisma.TransactionClient,
      {
        id: 'v1',
        durationMs: 30 * MIN,
      },
    );
    expect(count).toBe(3);
    expect(tx.courseImportLesson.deleteMany).toHaveBeenCalledWith({
      where: { id: { in: ['l1'] } },
    });
    // Two more lessons now: everything after it in the module moves down 2.
    expect(tx.courseImportLesson.updateMany).toHaveBeenCalledWith({
      where: { moduleId: 'm1', orderIndex: { gt: 2 } },
      data: { orderIndex: { increment: 2 } },
    });
    const [[{ data: rows }]] = tx.courseImportLesson.createMany.mock.calls as [
      [{ data: Record<string, unknown>[] }],
    ];
    expect(
      rows.map((r) => [r.title, r.orderIndex, r.clipStartSec, r.clipEndSec]),
    ).toEqual([
      ['Deep Dive (Part 1 of 3)', 2, 0, 600],
      ['Deep Dive (Part 2 of 3)', 3, 600, 1200],
      ['Deep Dive (Part 3 of 3)', 4, 1200, 1800],
    ]);
    expect(rows[0].resourceFileIds).toEqual(['zip-1']);
  });

  it('only moves boundaries when the part count is unchanged', async () => {
    const tx = fakeTx([
      lesson({ id: 'a', title: 'Deep Dive (Part 1 of 2)', partIndex: 1 }),
      lesson({
        id: 'b',
        title: 'Deep Dive (Part 2 of 2)',
        orderIndex: 3,
        partIndex: 2,
      }),
    ]);
    await replanFileLessons(tx as unknown as Prisma.TransactionClient, {
      id: 'v1',
      durationMs: 16 * MIN,
      transcriptSegments: [
        { start: 0, end: 470, text: 'one' },
        { start: 474, end: 960, text: 'two' },
      ],
    });
    expect(tx.courseImportLesson.deleteMany).not.toHaveBeenCalled();
    expect(tx.courseImportLesson.update).toHaveBeenCalledWith({
      where: { id: 'a' },
      data: { clipStartSec: 0, clipEndSec: 472, partIndex: 1, partCount: 2 },
    });
  });

  it('never re-cuts lessons that have started generating', async () => {
    const tx = fakeTx([lesson({ status: 'GENERATED' })]);
    const count = await replanFileLessons(
      tx as unknown as Prisma.TransactionClient,
      {
        id: 'v1',
        durationMs: 30 * MIN,
      },
    );
    expect(count).toBeNull();
    expect(tx.courseImportLesson.createMany).not.toHaveBeenCalled();
    expect(tx.courseImportLesson.update).not.toHaveBeenCalled();
  });
});
