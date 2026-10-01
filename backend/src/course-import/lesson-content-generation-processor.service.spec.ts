import { CourseImportError } from './course-import-error';
import { Test, TestingModule } from '@nestjs/testing';
import { LessonContentGenerationProcessorService } from './lesson-content-generation-processor.service';
import { PrismaService } from '../prisma/prisma.service';
import { LessonContentGenerationService } from './lesson-content-generation.service';

interface UpdateCall {
  where: { id: string };
  data: Record<string, unknown>;
}

function updateCallsFor(mock: jest.Mock): UpdateCall[] {
  const calls = mock.mock.calls as unknown as UpdateCall[][];
  return calls.map(([call]) => call);
}

const generated = {
  description: 'desc',
  learnBlocks: [{ type: 'videoUrl', value: 'https://cdn.example/v.mp4' }],
  applyBlocks: [{ type: 'mcqActivity', value: {} }],
  reflectBlocks: [{ type: 'reflectActivity', value: {} }],
  deepenBlocks: [{ type: 'deepenActivity', value: {} }],
};

describe('LessonContentGenerationProcessorService', () => {
  let service: LessonContentGenerationProcessorService;
  let prisma: {
    $queryRaw: jest.Mock;
    $executeRaw: jest.Mock;
    courseImportLesson: { findMany: jest.Mock; update: jest.Mock };
    courseImportFile: { findMany: jest.Mock };
    courseImport: { findUnique: jest.Mock; update: jest.Mock };
  };
  let generation: { generate: jest.Mock };

  beforeEach(async () => {
    prisma = {
      $queryRaw: jest.fn().mockResolvedValue([]),
      $executeRaw: jest.fn().mockResolvedValue(0),
      courseImportLesson: { findMany: jest.fn(), update: jest.fn() },
      courseImportFile: { findMany: jest.fn().mockResolvedValue([]) },
      courseImport: { findUnique: jest.fn(), update: jest.fn() },
    };
    generation = { generate: jest.fn() };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LessonContentGenerationProcessorService,
        { provide: PrismaService, useValue: prisma },
        { provide: LessonContentGenerationService, useValue: generation },
      ],
    }).compile();

    service = module.get(LessonContentGenerationProcessorService);
  });

  it('does nothing beyond reaping when nothing is claimable', async () => {
    const summary = await service.tick();
    expect(summary).toEqual({ claimed: 0, generated: 0, failed: 0 });
    expect(prisma.courseImportLesson.findMany).not.toHaveBeenCalled();
  });

  it('paces AI calls: right after one, the next tick claims nothing', async () => {
    const lessonRow = {
      id: 'lesson-1',
      title: 'Writing Hooks',
      primaryFileId: 'vid-1',
      resourceFileIds: [],
      attempts: 1,
      primaryFile: {
        storageUrl: 'https://cdn.example/hooks.mp4',
        transcript: 'A'.repeat(50),
        durationMs: null,
      },
      module: {
        import: {
          id: 'import-1',
          sourceDriveFolderName: 'Course',
          status: 'GENERATING_CONTENT',
        },
      },
    };
    prisma.$queryRaw.mockResolvedValue([{ id: 'lesson-1' }]);
    prisma.courseImportLesson.findMany.mockResolvedValue([lessonRow]);
    generation.generate.mockResolvedValue({
      description: 'd',
      learnBlocks: [],
      applyBlocks: [],
      reflectBlocks: [],
      deepenBlocks: [],
    });
    prisma.courseImport.findUnique.mockResolvedValue({
      status: 'GENERATING_CONTENT',
    });

    await service.tick();
    expect(generation.generate).toHaveBeenCalledTimes(1);
    const claimsBefore = prisma.$queryRaw.mock.calls.length;

    const second = await service.tick();
    expect(second).toEqual({ claimed: 0, generated: 0, failed: 0 });
    expect(generation.generate).toHaveBeenCalledTimes(1);
    // Nothing was claimed (so nothing sits CLAIMED while it waits).
    expect(prisma.$queryRaw.mock.calls.length).toBe(claimsBefore);
  });

  it('generates content for a claimed lesson and marks it GENERATED', async () => {
    prisma.$queryRaw.mockResolvedValue([{ id: 'lesson-1' }]);
    prisma.courseImportLesson.findMany.mockResolvedValue([
      {
        id: 'lesson-1',
        title: 'Writing Hooks',
        primaryFileId: 'vid-1',
        resourceFileIds: ['doc-1'],
        primaryFile: {
          storageUrl: 'https://cdn.example/hooks.mp4',
          transcript: 'A'.repeat(50),
        },
        module: {
          import: {
            id: 'import-1',
            sourceDriveFolderName: 'How to Create Great Content',
            status: 'GENERATING_CONTENT',
          },
        },
      },
    ]);
    prisma.courseImportFile.findMany.mockResolvedValue([
      { driveFileName: 'Hook Cheat Sheet.pdf' },
    ]);
    generation.generate.mockResolvedValue(generated);
    // recomputeImportStatus's own findMany call falls through to the same
    // base mock above — this test only asserts on the lesson update, not
    // the (here, irrelevant) import status transition.
    prisma.courseImport.findUnique.mockResolvedValue({
      status: 'GENERATING_CONTENT',
    });

    const summary = await service.tick();

    expect(generation.generate).toHaveBeenCalledWith({
      courseTitle: 'How to Create Great Content',
      lessonTitle: 'Writing Hooks',
      videoUrl: 'https://cdn.example/hooks.mp4',
      transcript: 'A'.repeat(50),
      resourceNames: ['Hook Cheat Sheet.pdf'],
      // No track chosen and no Drive duration on this fixture: classic Learn.
      track: null,
      videoDurationSec: null,
    });
    const update = updateCallsFor(prisma.courseImportLesson.update).find(
      (c) => c.where.id === 'lesson-1',
    );
    expect(update?.data).toMatchObject({
      status: 'GENERATED',
      description: 'desc',
    });
    expect(summary).toEqual({ claimed: 1, generated: 1, failed: 0 });
  });

  it('isolates a generation failure, recording the real error, without crashing the batch', async () => {
    prisma.$queryRaw.mockResolvedValue([{ id: 'lesson-1' }]);
    prisma.courseImportLesson.findMany.mockResolvedValue([
      {
        id: 'lesson-1',
        title: 'Writing Hooks',
        primaryFileId: 'vid-1',
        resourceFileIds: [],
        attempts: 3, // already at MAX_AUTO_ATTEMPTS — no retries left
        primaryFile: {
          storageUrl: 'https://cdn.example/hooks.mp4',
          transcript: 'A'.repeat(50),
        },
        module: {
          import: {
            id: 'import-1',
            sourceDriveFolderName: 'Course',
            status: 'GENERATING_CONTENT',
          },
        },
      },
    ]);
    generation.generate.mockRejectedValue(
      new Error(
        'AI returned invalid lesson content (SCHEMA_MISMATCH:reflectPrompt)',
      ),
    );
    prisma.courseImport.findUnique.mockResolvedValue({
      status: 'GENERATING_CONTENT',
    });

    const summary = await service.tick();

    expect(summary).toEqual({ claimed: 1, generated: 0, failed: 1 });
    const update = updateCallsFor(prisma.courseImportLesson.update).find(
      (c) => c.where.id === 'lesson-1',
    );
    expect(update?.data).toMatchObject({
      status: 'FAILED',
      error:
        'AI returned invalid lesson content (SCHEMA_MISMATCH:reflectPrompt)',
    });
  });

  it.each([
    ['AI_RATE_LIMIT', 'rate limit'],
    ['AI_BUDGET_EXCEEDED', "today's AI budget"],
  ] as const)(
    'waits (never FAILS, attempt given back) on %s, even at the attempt cap',
    async (code, words) => {
      prisma.$queryRaw.mockResolvedValue([{ id: 'lesson-1' }]);
      prisma.courseImportLesson.findMany.mockResolvedValue([
        {
          id: 'lesson-1',
          title: 'Writing Hooks',
          primaryFileId: 'vid-1',
          resourceFileIds: [],
          attempts: 3,
          primaryFile: {
            storageUrl: 'https://cdn.example/hooks.mp4',
            transcript: 'A'.repeat(50),
            durationMs: null,
          },
          module: {
            import: {
              id: 'import-1',
              sourceDriveFolderName: 'Course',
              status: 'GENERATING_CONTENT',
            },
          },
        },
      ]);
      generation.generate.mockRejectedValue(
        new CourseImportError(code, 'quota'),
      );
      prisma.courseImport.findUnique.mockResolvedValue({
        status: 'GENERATING_CONTENT',
      });

      await service.tick();

      // No FAILED write…
      const failedWrite = updateCallsFor(prisma.courseImportLesson.update).find(
        (c) => c.data?.status === 'FAILED',
      );
      expect(failedWrite).toBeUndefined();
      // …a raw PENDING write with the attempt given back and a future resume time.
      const call = prisma.$executeRaw.mock.calls.find((c: unknown[]) =>
        String((c[0] as string[]).join('?')).includes('"attempts" = GREATEST'),
      );
      expect(call).toBeDefined();
      const values = call!.slice(1);
      expect(values[0]).toBe(code);
      expect(String(values[1])).toContain(words);
      expect((values[2] as Date).getTime()).toBeGreaterThan(Date.now());
    },
  );

  it('retries automatically (stays PENDING, not FAILED) when a transient failure leaves attempts remaining', async () => {
    prisma.$queryRaw.mockResolvedValue([{ id: 'lesson-1' }]);
    prisma.courseImportLesson.findMany.mockResolvedValue([
      {
        id: 'lesson-1',
        title: 'Writing Hooks',
        primaryFileId: 'vid-1',
        resourceFileIds: [],
        attempts: 1, // claimBatch already incremented this; 2 retries left
        primaryFile: {
          storageUrl: 'https://cdn.example/hooks.mp4',
          transcript: 'A'.repeat(50),
        },
        module: {
          import: {
            id: 'import-1',
            sourceDriveFolderName: 'Course',
            status: 'GENERATING_CONTENT',
          },
        },
      },
    ]);
    generation.generate.mockRejectedValue(
      new Error('Gemini request failed (503): model overloaded'),
    );
    prisma.courseImport.findUnique.mockResolvedValue({
      status: 'GENERATING_CONTENT',
    });

    await service.tick();

    const update = updateCallsFor(prisma.courseImportLesson.update).find(
      (c) => c.where.id === 'lesson-1',
    );
    expect(update?.data).toMatchObject({
      status: 'PENDING',
      error: 'Gemini request failed (503): model overloaded',
    });
  });

  it('moves the import to READY_FOR_REVIEW once every lesson is terminal', async () => {
    prisma.$queryRaw.mockResolvedValue([{ id: 'lesson-2' }]);
    prisma.courseImportLesson.findMany.mockResolvedValueOnce([
      {
        id: 'lesson-2',
        title: 'Editing Basics',
        primaryFileId: 'vid-2',
        resourceFileIds: [],
        primaryFile: {
          storageUrl: 'https://cdn.example/edit.mp4',
          transcript: 'A'.repeat(50),
        },
        module: {
          import: {
            id: 'import-1',
            sourceDriveFolderName: 'Course',
            status: 'GENERATING_CONTENT',
          },
        },
      },
    ]);
    generation.generate.mockResolvedValue(generated);
    prisma.courseImport.findUnique.mockResolvedValue({
      status: 'GENERATING_CONTENT',
    });
    // Every lesson under the import (including this one, now updated) is terminal.
    prisma.courseImportLesson.findMany.mockResolvedValueOnce([
      { status: 'GENERATED' },
      { status: 'FAILED' },
    ]);

    await service.tick();

    expect(prisma.courseImport.update).toHaveBeenCalledWith({
      where: { id: 'import-1' },
      data: {
        status: 'READY_FOR_REVIEW',
        completedAt: expect.any(Date) as Date,
      },
    });
  });

  it('does not advance the import while lessons are still pending', async () => {
    prisma.$queryRaw.mockResolvedValue([{ id: 'lesson-2' }]);
    prisma.courseImportLesson.findMany.mockResolvedValueOnce([
      {
        id: 'lesson-2',
        title: 'Editing Basics',
        primaryFileId: 'vid-2',
        resourceFileIds: [],
        primaryFile: {
          storageUrl: 'https://cdn.example/edit.mp4',
          transcript: 'A'.repeat(50),
        },
        module: {
          import: {
            id: 'import-1',
            sourceDriveFolderName: 'Course',
            status: 'GENERATING_CONTENT',
          },
        },
      },
    ]);
    generation.generate.mockResolvedValue(generated);
    prisma.courseImport.findUnique.mockResolvedValue({
      status: 'GENERATING_CONTENT',
    });
    prisma.courseImportLesson.findMany.mockResolvedValueOnce([
      { status: 'GENERATED' },
      { status: 'PENDING' },
    ]);

    await service.tick();

    expect(prisma.courseImport.update).not.toHaveBeenCalled();
  });

  it('marks a lesson FAILED instead of generating once its import has been cancelled', async () => {
    prisma.$queryRaw.mockResolvedValue([{ id: 'lesson-1' }]);
    prisma.courseImportLesson.findMany.mockResolvedValue([
      {
        id: 'lesson-1',
        title: 'Writing Hooks',
        primaryFileId: 'vid-1',
        resourceFileIds: [],
        primaryFile: {
          storageUrl: 'https://cdn.example/hooks.mp4',
          transcript: 'A'.repeat(50),
        },
        module: {
          import: {
            id: 'import-1',
            sourceDriveFolderName: 'Course',
            status: 'CANCELLED',
          },
        },
      },
    ]);

    await service.tick();

    expect(generation.generate).not.toHaveBeenCalled();
    const update = updateCallsFor(prisma.courseImportLesson.update).find(
      (c) => c.where.id === 'lesson-1',
    );
    expect(update?.data).toMatchObject({
      status: 'FAILED',
      error: 'Import was cancelled.',
    });
  });
});
