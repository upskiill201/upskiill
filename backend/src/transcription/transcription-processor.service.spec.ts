import { Test, TestingModule } from '@nestjs/testing';
import { TranscriptionProcessorService } from './transcription-processor.service';
import { PrismaService } from '../prisma/prisma.service';
import { GroqWhisperTranscriptionService } from './groq-whisper-transcription.service';
import { HeavyTransferLockService } from '../course-import/heavy-transfer-lock.service';
import { CourseImportError } from '../course-import/course-import-error';

interface UpdateCall {
  where: { id: string };
  data: Record<string, unknown>;
}

function updateCallsFor(mock: jest.Mock): UpdateCall[] {
  const calls = mock.mock.calls as unknown as UpdateCall[][];
  return calls.map(([call]) => call);
}

describe('TranscriptionProcessorService', () => {
  let service: TranscriptionProcessorService;
  let prisma: {
    $queryRaw: jest.Mock;
    $executeRaw: jest.Mock;
    courseImportFile: { findMany: jest.Mock; update: jest.Mock };
  };
  let transcription: { transcribe: jest.Mock };
  let heavyTransferLock: HeavyTransferLockService;

  beforeEach(async () => {
    prisma = {
      $queryRaw: jest.fn().mockResolvedValue([]),
      $executeRaw: jest.fn().mockResolvedValue(0),
      courseImportFile: { findMany: jest.fn(), update: jest.fn() },
    };
    transcription = { transcribe: jest.fn() };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TranscriptionProcessorService,
        { provide: PrismaService, useValue: prisma },
        { provide: GroqWhisperTranscriptionService, useValue: transcription },
        HeavyTransferLockService,
      ],
    }).compile();

    service = module.get(TranscriptionProcessorService);
    heavyTransferLock = module.get(HeavyTransferLockService);
  });

  it('does nothing beyond reaping when nothing is claimable', async () => {
    const summary = await service.tick();
    expect(summary).toEqual({ claimed: 0, transcribed: 0, failed: 0 });
    expect(prisma.courseImportFile.findMany).not.toHaveBeenCalled();
  });

  it('skips the tick entirely (no claim) when the heavy-transfer lock is already held', async () => {
    // e.g. CourseImportProcessorService currently holds it.
    heavyTransferLock.tryAcquire();

    const summary = await service.tick();

    expect(summary).toEqual({ claimed: 0, transcribed: 0, failed: 0 });
    expect(prisma.$queryRaw).not.toHaveBeenCalled();
  });

  it('transcribes a claimed video and stores the result', async () => {
    prisma.$queryRaw.mockResolvedValue([{ id: 'row-1' }]);
    prisma.courseImportFile.findMany.mockResolvedValue([
      {
        id: 'row-1',
        driveFileName: '01 Intro.mp4',
        storageUrl: 'https://cdn.example/vid.mp4',
        import: { status: 'GENERATING_CONTENT' },
      },
    ]);
    transcription.transcribe.mockResolvedValue({
      text: 'Welcome to the course.',
    });

    const summary = await service.tick();

    expect(transcription.transcribe).toHaveBeenCalledWith(
      'https://cdn.example/vid.mp4',
    );
    const row1Update = updateCallsFor(prisma.courseImportFile.update).find(
      (c) => c.where.id === 'row-1',
    );
    expect(row1Update?.data).toMatchObject({
      transcriptStatus: 'TRANSCRIBED',
      transcript: 'Welcome to the course.',
      transcriptError: null,
    });
    expect(summary).toEqual({ claimed: 1, transcribed: 1, failed: 0 });
  });

  it('isolates a failed transcription without crashing the batch, recording the real error', async () => {
    prisma.$queryRaw.mockResolvedValue([{ id: 'row-1' }]);
    prisma.courseImportFile.findMany.mockResolvedValue([
      {
        id: 'row-1',
        driveFileName: 'a.mp4',
        storageUrl: 'https://cdn.example/a.mp4',
        transcriptAttempts: 3, // already at MAX_AUTO_ATTEMPTS — no retries left
        import: { status: 'GENERATING_CONTENT' },
      },
    ]);
    transcription.transcribe.mockRejectedValue(
      new Error('Gemini transcription request failed (HTTP 429)'),
    );

    const summary = await service.tick();

    expect(summary).toEqual({ claimed: 1, transcribed: 0, failed: 1 });
    const row1Update = updateCallsFor(prisma.courseImportFile.update).find(
      (c) => c.where.id === 'row-1',
    );
    expect(row1Update?.data).toMatchObject({
      transcriptStatus: 'FAILED',
      transcriptError: 'Gemini transcription request failed (HTTP 429)',
    });
  });

  it('retries automatically (stays PENDING, not FAILED) when a transient failure leaves attempts remaining', async () => {
    prisma.$queryRaw.mockResolvedValue([{ id: 'row-1' }]);
    prisma.courseImportFile.findMany.mockResolvedValue([
      {
        id: 'row-1',
        driveFileName: 'a.mp4',
        storageUrl: 'https://cdn.example/a.mp4',
        transcriptAttempts: 1, // claimBatch already incremented this; 2 retries left
        import: { status: 'GENERATING_CONTENT' },
      },
    ]);
    transcription.transcribe.mockRejectedValue(
      new Error(
        'Gemini request failed (503): model overloaded, try again later',
      ),
    );

    await service.tick();

    const row1Update = updateCallsFor(prisma.courseImportFile.update).find(
      (c) => c.where.id === 'row-1',
    );
    expect(row1Update?.data).toMatchObject({
      transcriptStatus: 'PENDING',
      transcriptError: 'Gemini request failed (503): model overloaded, try again later',
    });
  });

  it('gives up immediately on a terminal failure, even with attempts to spare', async () => {
    prisma.$queryRaw.mockResolvedValue([{ id: 'row-1' }]);
    prisma.courseImportFile.findMany.mockResolvedValue([
      {
        id: 'row-1',
        driveFileName: 'a.mp4',
        storageUrl: 'https://cdn.example/a.mp4',
        transcriptAttempts: 1, // 2 retries left, deliberately unused
        import: { status: 'GENERATING_CONTENT' },
      },
    ]);
    // A stale/incorrect storage URL: the object is not coming back, so
    // retrying twice more only delays the admin finding out.
    transcription.transcribe.mockRejectedValue(
      new CourseImportError(
        'STORAGE_OBJECT_NOT_FOUND',
        'Could not download video for transcription (HTTP 404).',
      ),
    );

    await service.tick();

    const row1Update = updateCallsFor(prisma.courseImportFile.update).find(
      (c) => c.where.id === 'row-1',
    );
    expect(row1Update?.data).toMatchObject({
      transcriptStatus: 'FAILED',
      transcriptErrorCode: 'STORAGE_OBJECT_NOT_FOUND',
    });
  });

  it('records the error code alongside the message for the admin UI', async () => {
    prisma.$queryRaw.mockResolvedValue([{ id: 'row-1' }]);
    prisma.courseImportFile.findMany.mockResolvedValue([
      {
        id: 'row-1',
        driveFileName: 'a.mp4',
        storageUrl: 'https://cdn.example/a.mp4',
        transcriptAttempts: 1,
        import: { status: 'GENERATING_CONTENT' },
      },
    ]);
    transcription.transcribe.mockRejectedValue(
      new CourseImportError('TRANSCRIPTION_RATE_LIMIT', 'slow down'),
    );

    await service.tick();

    const row1Update = updateCallsFor(prisma.courseImportFile.update).find(
      (c) => c.where.id === 'row-1',
    );
    expect(row1Update?.data).toMatchObject({
      transcriptStatus: 'PENDING', // rate limits are retryable
      transcriptErrorCode: 'TRANSCRIPTION_RATE_LIMIT',
      transcriptError: 'slow down',
    });
  });

  it('refuses to transcribe a file with no storage URL yet, without ever calling Gemini', async () => {
    prisma.$queryRaw.mockResolvedValue([{ id: 'row-1' }]);
    prisma.courseImportFile.findMany.mockResolvedValue([
      {
        id: 'row-1',
        driveFileName: 'a.mp4',
        storageUrl: null,
        import: { status: 'GENERATING_CONTENT' },
      },
    ]);

    const summary = await service.tick();

    expect(transcription.transcribe).not.toHaveBeenCalled();
    expect(summary.failed).toBe(1);
    const row1Update = updateCallsFor(prisma.courseImportFile.update).find(
      (c) => c.where.id === 'row-1',
    );
    expect(row1Update?.data.transcriptError).toContain('must finish uploading');
  });

  it('marks a file FAILED instead of transcribing once its import has been cancelled', async () => {
    prisma.$queryRaw.mockResolvedValue([{ id: 'row-1' }]);
    prisma.courseImportFile.findMany.mockResolvedValue([
      {
        id: 'row-1',
        driveFileName: 'a.mp4',
        storageUrl: 'https://cdn.example/a.mp4',
        import: { status: 'CANCELLED' },
      },
    ]);

    await service.tick();

    expect(transcription.transcribe).not.toHaveBeenCalled();
    const row1Update = updateCallsFor(prisma.courseImportFile.update).find(
      (c) => c.where.id === 'row-1',
    );
    expect(row1Update?.data).toMatchObject({
      transcriptStatus: 'FAILED',
      transcriptError: 'Import was cancelled.',
    });
  });
});
