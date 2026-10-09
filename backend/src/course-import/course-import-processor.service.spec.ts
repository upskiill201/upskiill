import { Test, TestingModule } from '@nestjs/testing';
import {
  CourseImportProcessorService,
  buildObjectKey,
} from './course-import-processor.service';
import { PrismaService } from '../prisma/prisma.service';
import { GoogleDriveService } from '../google-drive/google-drive.service';
import { R2StorageService } from '../storage/r2-storage.service';
import { HeavyTransferLockService } from './heavy-transfer-lock.service';
import { CourseImportError } from './course-import-error';

interface UpdateCall {
  where: { id: string };
  data: Record<string, unknown>;
}

/** Typed view over a jest.Mock's recorded `update({where, data})` calls —
 *  avoids asserting via `expect.objectContaining` nested as an object
 *  literal property, which typescript-eslint's no-unsafe-assignment flags
 *  even though the value (an `any`-returning matcher) is exactly what Jest
 *  expects there. */
function updateCallsFor(mock: jest.Mock): UpdateCall[] {
  const calls = mock.mock.calls as unknown as UpdateCall[][];
  return calls.map(([call]) => call);
}

describe('CourseImportProcessorService', () => {
  let service: CourseImportProcessorService;
  let prisma: {
    $queryRaw: jest.Mock;
    $executeRaw: jest.Mock;
    courseImportFile: {
      findMany: jest.Mock;
      update: jest.Mock;
      groupBy: jest.Mock;
    };
    courseImport: { findUnique: jest.Mock; update: jest.Mock };
    courseImportModule: { count: jest.Mock };
  };
  let googleDrive: { downloadFile: jest.Mock; getAccessToken: jest.Mock };
  let r2: { uploadStream: jest.Mock; publicUrlFor: jest.Mock };
  let heavyTransferLock: HeavyTransferLockService;

  beforeEach(async () => {
    prisma = {
      $queryRaw: jest.fn().mockResolvedValue([]),
      $executeRaw: jest.fn().mockResolvedValue(0),
      courseImportFile: {
        findMany: jest.fn(),
        update: jest.fn(),
        groupBy: jest.fn(),
      },
      courseImport: { findUnique: jest.fn(), update: jest.fn() },
      // Not planned yet: status follows the copying, as these tests expect.
      courseImportModule: { count: jest.fn().mockResolvedValue(0) },
    };
    googleDrive = {
      downloadFile: jest.fn(),
      getAccessToken: jest.fn().mockResolvedValue('drive-access-token'),
    };
    r2 = {
      uploadStream: jest.fn(),
      publicUrlFor: jest.fn((k: string) => `https://cdn.example/${k}`),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CourseImportProcessorService,
        { provide: PrismaService, useValue: prisma },
        { provide: GoogleDriveService, useValue: googleDrive },
        { provide: R2StorageService, useValue: r2 },
        HeavyTransferLockService,
      ],
    }).compile();

    service = module.get(CourseImportProcessorService);
    heavyTransferLock = module.get(HeavyTransferLockService);
  });

  it('does nothing beyond reaping when nothing is claimable', async () => {
    prisma.$queryRaw.mockResolvedValue([]); // claimBatch returns no rows

    const summary = await service.tick();

    expect(summary).toEqual({ claimed: 0, uploaded: 0, failed: 0 });
    expect(prisma.courseImportFile.findMany).not.toHaveBeenCalled();
  });

  it('skips the tick entirely (no claim) when the heavy-transfer lock is already held', async () => {
    // e.g. TranscriptionProcessorService currently holds it.
    heavyTransferLock.tryAcquire();

    const summary = await service.tick();

    expect(summary).toEqual({ claimed: 0, uploaded: 0, failed: 0 });
    expect(prisma.$queryRaw).not.toHaveBeenCalled();
  });

  it('downloads from Drive and streams to R2, marking the file UPLOADED and recomputing the import status', async () => {
    prisma.$queryRaw.mockResolvedValue([{ id: 'row-1' }]);
    prisma.courseImportFile.findMany.mockResolvedValue([
      {
        id: 'row-1',
        importId: 'import-1',
        driveFileId: 'vid-1',
        driveFileName: '01 Intro.mp4',
        mimeType: 'video/mp4',
        import: { createdById: 'user-1', status: 'PROCESSING_FILES' },
      },
    ]);
    const fakeStream = { pipe: jest.fn() };
    googleDrive.downloadFile.mockResolvedValue({
      stream: fakeStream,
      mimeType: 'video/mp4',
    });
    r2.uploadStream.mockResolvedValue({
      key: 'course-imports/import-1/vid-1-01_Intro.mp4',
      url: 'https://cdn.example/course-imports/import-1/vid-1-01_Intro.mp4',
    });
    prisma.courseImportFile.groupBy.mockResolvedValue([
      { status: 'UPLOADED', _count: 1 },
    ]);
    prisma.courseImport.findUnique.mockResolvedValue({
      status: 'PROCESSING_FILES',
    });

    const summary = await service.tick();

    expect(googleDrive.downloadFile).toHaveBeenCalledWith('user-1', 'vid-1');
    expect(r2.uploadStream).toHaveBeenCalledWith(
      expect.stringContaining('course-imports/import-1/vid-1-'),
      fakeStream,
      'video/mp4',
    );
    const row1Update = updateCallsFor(prisma.courseImportFile.update).find(
      (c) => c.where.id === 'row-1',
    );
    expect(row1Update?.data).toMatchObject({
      status: 'UPLOADED',
      storageUrl:
        'https://cdn.example/course-imports/import-1/vid-1-01_Intro.mp4',
      error: null,
    });
    // All files terminal, at least one uploaded -> READY_FOR_GENERATION.
    expect(prisma.courseImport.update).toHaveBeenCalledWith({
      where: { id: 'import-1' },
      data: {
        status: 'READY_FOR_GENERATION',
        completedAt: expect.any(Date) as Date,
      },
    });
    expect(summary).toEqual({ claimed: 1, uploaded: 1, failed: 0 });
  });

  it('keys a junk-suffixed file by its real name and extension', () => {
    expect(
      buildObjectKey(
        'import-1',
        'vid-9',
        'Copy of 9 - Introduction.mp4 |google>|ahm7tech|or|ahm7tech.vercel.app|',
      ),
    ).toBe('course-imports/import-1/vid-9-9_-_Introduction.mp4');
  });

  it('stores an exported Google Doc under a .pdf key with the exported type', async () => {
    prisma.$queryRaw.mockResolvedValue([{ id: 'row-1' }]);
    prisma.courseImportFile.findMany.mockResolvedValue([
      {
        id: 'row-1',
        importId: 'import-1',
        driveFileId: 'gdoc-1',
        driveFileName: 'Course Notes',
        mimeType: 'application/vnd.google-apps.document',
        import: { createdById: 'user-1', status: 'PROCESSING_FILES' },
      },
    ]);
    googleDrive.downloadFile.mockResolvedValue({
      stream: { pipe: jest.fn() },
      mimeType: 'application/pdf',
    });
    r2.uploadStream.mockResolvedValue({
      key: 'k',
      url: 'https://cdn.example/k',
    });
    prisma.courseImportFile.groupBy.mockResolvedValue([
      { status: 'UPLOADED', _count: 1 },
    ]);
    prisma.courseImport.findUnique.mockResolvedValue({
      status: 'PROCESSING_FILES',
    });

    await service.tick();

    expect(r2.uploadStream).toHaveBeenCalledWith(
      'course-imports/import-1/gdoc-1-Course_Notes.pdf',
      expect.anything(),
      'application/pdf',
    );
  });

  describe('through the transfer Worker', () => {
    const env = { ...process.env };
    let fetchMock: jest.Mock;
    beforeEach(() => {
      process.env.COURSE_IMPORT_TRANSFER_URL = 'https://transfer.example/';
      process.env.COURSE_IMPORT_TRANSFER_SECRET = 'secret-123';
      fetchMock = jest.fn();
      global.fetch = fetchMock as unknown as typeof fetch;
      prisma.$queryRaw.mockResolvedValue([{ id: 'row-1' }]);
      prisma.courseImportFile.findMany.mockResolvedValue([
        {
          id: 'row-1',
          importId: 'import-1',
          driveFileId: 'vid-1',
          driveFileName: '01 Intro.mp4',
          mimeType: 'video/mp4',
          attempts: 1,
          import: { createdById: 'user-1', status: 'PROCESSING_FILES' },
        },
      ]);
      prisma.courseImportFile.groupBy.mockResolvedValue([
        { status: 'UPLOADED', _count: 1 },
      ]);
      prisma.courseImport.findUnique.mockResolvedValue({
        status: 'PROCESSING_FILES',
      });
    });
    afterEach(() => {
      process.env = { ...env };
    });
    const reply = (status: number, body: unknown) =>
      fetchMock.mockResolvedValue({
        ok: status < 400,
        status,
        json: () => Promise.resolve(body),
      });

    it('copies the file without the bytes ever passing through this server', async () => {
      reply(200, { ok: true, key: 'k', size: 10 });

      await service.tick();

      const [url, init] = fetchMock.mock.calls[0] as [string, RequestInit];
      expect(url).toBe('https://transfer.example/transfer');
      expect(init.headers).toMatchObject({
        authorization: 'Bearer secret-123',
      });
      expect(JSON.parse(init.body as string)).toMatchObject({
        driveFileId: 'vid-1',
        accessToken: 'drive-access-token',
        contentType: 'video/mp4',
      });
      expect(googleDrive.downloadFile).not.toHaveBeenCalled();
      expect(r2.uploadStream).not.toHaveBeenCalled();
      const update = updateCallsFor(prisma.courseImportFile.update).find(
        (c) => c.where.id === 'row-1',
      );
      expect(update?.data).toMatchObject({
        status: 'UPLOADED',
        storageUrl: expect.stringContaining('course-imports/import-1/vid-1-'),
      });
    });

    it('streams the file itself when the Worker hands it back', async () => {
      reply(200, { ok: false, fallback: true });
      googleDrive.downloadFile.mockResolvedValue({
        stream: {},
        mimeType: 'video/mp4',
      });
      r2.uploadStream.mockResolvedValue({
        key: 'k',
        url: 'https://cdn.example/k',
      });

      await service.tick();

      expect(googleDrive.downloadFile).toHaveBeenCalled();
      expect(r2.uploadStream).toHaveBeenCalled();
    });

    it("reports Drive's refusal with the right code, not a storage error", async () => {
      reply(502, {
        ok: false,
        error: 'Google Drive returned 404.',
        driveStatus: 404,
      });

      await service.tick();

      const update = updateCallsFor(prisma.courseImportFile.update).find(
        (c) => c.where.id === 'row-1',
      );
      expect(update?.data).toMatchObject({
        status: 'FAILED',
        errorCode: 'DRIVE_FILE_NOT_FOUND',
      });
      expect(googleDrive.downloadFile).not.toHaveBeenCalled();
    });
  });

  it('isolates a failed file: it is marked FAILED and does not stop the rest of the batch', async () => {
    prisma.$queryRaw.mockResolvedValue([{ id: 'row-1' }, { id: 'row-2' }]);
    prisma.courseImportFile.findMany.mockResolvedValue([
      {
        id: 'row-1',
        importId: 'import-1',
        driveFileId: 'vid-1',
        driveFileName: 'a.mp4',
        mimeType: 'video/mp4',
        // Already at the retry cap, so this failure is genuinely terminal
        // rather than passing only because `attempts` happened to be absent.
        attempts: 3,
        import: { createdById: 'user-1', status: 'PROCESSING_FILES' },
      },
      {
        id: 'row-2',
        importId: 'import-1',
        driveFileId: 'vid-2',
        driveFileName: 'b.mp4',
        mimeType: 'video/mp4',
        attempts: 1,
        import: { createdById: 'user-1', status: 'PROCESSING_FILES' },
      },
    ]);
    googleDrive.downloadFile
      .mockRejectedValueOnce(new Error('Drive API rate limited'))
      .mockResolvedValueOnce({
        stream: { pipe: jest.fn() },
        mimeType: 'video/mp4',
      });
    r2.uploadStream.mockResolvedValue({
      key: 'k',
      url: 'https://cdn.example/k',
    });
    prisma.courseImportFile.groupBy.mockResolvedValue([
      { status: 'UPLOADED', _count: 1 },
      { status: 'FAILED', _count: 1 },
    ]);
    prisma.courseImport.findUnique.mockResolvedValue({
      status: 'PROCESSING_FILES',
    });

    const summary = await service.tick();

    expect(summary).toEqual({ claimed: 2, uploaded: 1, failed: 1 });
    const fileUpdates = updateCallsFor(prisma.courseImportFile.update);
    expect(fileUpdates.find((c) => c.where.id === 'row-1')?.data).toMatchObject(
      {
        status: 'FAILED',
        error: 'Drive API rate limited',
      },
    );
    expect(fileUpdates.find((c) => c.where.id === 'row-2')?.data).toMatchObject(
      { status: 'UPLOADED' },
    );
  });

  it('skips a file instead of uploading it once its import has been cancelled mid-flight', async () => {
    prisma.$queryRaw.mockResolvedValue([{ id: 'row-1' }]);
    prisma.courseImportFile.findMany.mockResolvedValue([
      {
        id: 'row-1',
        importId: 'import-1',
        driveFileId: 'vid-1',
        driveFileName: 'a.mp4',
        mimeType: 'video/mp4',
        import: { createdById: 'user-1', status: 'CANCELLED' },
      },
    ]);
    prisma.courseImport.findUnique.mockResolvedValue({ status: 'CANCELLED' });

    await service.tick();

    expect(googleDrive.downloadFile).not.toHaveBeenCalled();
    const cancelledUpdate = updateCallsFor(prisma.courseImportFile.update).find(
      (c) => c.where.id === 'row-1',
    );
    expect(cancelledUpdate?.data).toMatchObject({
      status: 'SKIPPED',
      error: 'Import was cancelled.',
    });
    // recomputeImportStatus must never override a CANCELLED import.
    expect(prisma.courseImportFile.groupBy).not.toHaveBeenCalled();
    expect(prisma.courseImport.update).not.toHaveBeenCalled();
  });

  describe('transfer resilience', () => {
    function claimOneFile(attempts = 0) {
      prisma.$queryRaw.mockResolvedValue([{ id: 'row-1' }]);
      prisma.courseImportFile.findMany.mockResolvedValue([
        {
          id: 'row-1',
          importId: 'import-1',
          driveFileId: 'vid-1',
          driveFileName: 'a.mp4',
          mimeType: 'video/mp4',
          attempts,
          import: { createdById: 'user-1', status: 'PROCESSING_FILES' },
        },
      ]);
      prisma.courseImportFile.groupBy.mockResolvedValue([
        { status: 'PENDING', _count: 1 },
      ]);
      prisma.courseImport.findUnique.mockResolvedValue({
        status: 'PROCESSING_FILES',
      });
    }

    // The failure this guards against deadlocked the whole importer: a
    // stalled transfer never settles, so the `finally` that releases the
    // heavy-transfer lock never runs and nothing is ever claimed again.
    // The DB reaper cannot rescue it, because the lock is in process memory.
    it('gives up on a transfer that stops making progress instead of hanging forever', async () => {
      jest.useFakeTimers();
      try {
        claimOneFile(0);
        // A download that never settles, exactly like a half-open socket.
        googleDrive.downloadFile.mockReturnValue(new Promise(() => {}));

        const tick = service.tick();
        await jest.advanceTimersByTimeAsync(31 * 60 * 1000);
        const summary = await tick;

        expect(summary.failed).toBe(1);
        const update = updateCallsFor(prisma.courseImportFile.update).find(
          (c) => c.where.id === 'row-1',
        );
        expect(update?.data).toMatchObject({ errorCode: 'STORAGE_TIMEOUT' });
      } finally {
        jest.useRealTimers();
      }
    });

    it('releases the heavy-transfer lock after a stalled transfer, so the next tick can work', async () => {
      jest.useFakeTimers();
      try {
        claimOneFile(0);
        googleDrive.downloadFile.mockReturnValue(new Promise(() => {}));

        const tick = service.tick();
        await jest.advanceTimersByTimeAsync(31 * 60 * 1000);
        await tick;

        // Free again — a held lock here is what "importer stops forever"
        // actually looks like in production.
        expect(heavyTransferLock.tryAcquire()).toBe(true);
        heavyTransferLock.release();
      } finally {
        jest.useRealTimers();
      }
    });

    it('retries a transient transfer failure rather than stranding the file', async () => {
      claimOneFile(1); // retries still available
      googleDrive.downloadFile.mockRejectedValue(new Error('socket hang up'));

      await service.tick();

      const update = updateCallsFor(prisma.courseImportFile.update).find(
        (c) => c.where.id === 'row-1',
      );
      // PENDING, not FAILED: an overnight import must survive a 3am blip
      // without waiting for someone to click Retry in the morning.
      expect(update?.data).toMatchObject({ status: 'PENDING' });
    });

    it('stops retrying once the attempt cap is reached', async () => {
      claimOneFile(3);
      googleDrive.downloadFile.mockRejectedValue(new Error('socket hang up'));

      await service.tick();

      const update = updateCallsFor(prisma.courseImportFile.update).find(
        (c) => c.where.id === 'row-1',
      );
      expect(update?.data).toMatchObject({ status: 'FAILED' });
    });

    it('does not retry a failure that cannot succeed on another attempt', async () => {
      claimOneFile(0);
      googleDrive.downloadFile.mockRejectedValue(
        new CourseImportError('DRIVE_FILE_NOT_FOUND', 'gone from Drive'),
      );

      await service.tick();

      const update = updateCallsFor(prisma.courseImportFile.update).find(
        (c) => c.where.id === 'row-1',
      );
      expect(update?.data).toMatchObject({
        status: 'FAILED',
        errorCode: 'DRIVE_FILE_NOT_FOUND',
      });
    });
  });
});
