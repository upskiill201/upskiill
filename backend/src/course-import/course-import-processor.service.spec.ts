import { Test, TestingModule } from '@nestjs/testing';
import { CourseImportProcessorService } from './course-import-processor.service';
import { PrismaService } from '../prisma/prisma.service';
import { GoogleDriveService } from '../google-drive/google-drive.service';
import { R2StorageService } from '../storage/r2-storage.service';

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
  };
  let googleDrive: { downloadFile: jest.Mock };
  let r2: { uploadStream: jest.Mock };

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
    };
    googleDrive = { downloadFile: jest.fn() };
    r2 = { uploadStream: jest.fn() };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CourseImportProcessorService,
        { provide: PrismaService, useValue: prisma },
        { provide: GoogleDriveService, useValue: googleDrive },
        { provide: R2StorageService, useValue: r2 },
      ],
    }).compile();

    service = module.get(CourseImportProcessorService);
  });

  it('does nothing beyond reaping when nothing is claimable', async () => {
    prisma.$queryRaw.mockResolvedValue([]); // claimBatch returns no rows

    const summary = await service.tick();

    expect(summary).toEqual({ claimed: 0, uploaded: 0, failed: 0 });
    expect(prisma.courseImportFile.findMany).not.toHaveBeenCalled();
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

  it('isolates a failed file: it is marked FAILED and does not stop the rest of the batch', async () => {
    prisma.$queryRaw.mockResolvedValue([{ id: 'row-1' }, { id: 'row-2' }]);
    prisma.courseImportFile.findMany.mockResolvedValue([
      {
        id: 'row-1',
        importId: 'import-1',
        driveFileId: 'vid-1',
        driveFileName: 'a.mp4',
        mimeType: 'video/mp4',
        import: { createdById: 'user-1', status: 'PROCESSING_FILES' },
      },
      {
        id: 'row-2',
        importId: 'import-1',
        driveFileId: 'vid-2',
        driveFileName: 'b.mp4',
        mimeType: 'video/mp4',
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
});
