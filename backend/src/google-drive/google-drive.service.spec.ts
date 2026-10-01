import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { GoogleDriveService } from './google-drive.service';
import { PrismaService } from '../prisma/prisma.service';
import { decryptJson, encryptJson } from '../earnings/crypto.util';

const mockOAuth2Instance = {
  generateAuthUrl: jest.fn(),
  getToken: jest.fn(),
  setCredentials: jest.fn(),
  revokeToken: jest.fn(),
  on: jest.fn(),
};

const mockDriveFilesList = jest.fn();
const mockDriveFilesGet = jest.fn();
const mockDriveAboutGet = jest.fn();

jest.mock('googleapis', () => ({
  google: {
    auth: {
      OAuth2: jest.fn(() => mockOAuth2Instance),
    },
    drive: jest.fn(() => ({
      files: { list: mockDriveFilesList, get: mockDriveFilesGet },
      about: { get: mockDriveAboutGet },
    })),
  },
}));

function refreshTokenRow(overrides: Record<string, unknown> = {}) {
  return {
    encryptedRefreshToken: encryptJson({ refreshToken: 'refresh-123' })
      .encryptedData,
    accessToken: null,
    accessTokenExpiresAt: null,
    googleAccountEmail: 'founder@teyro.app',
    connectedAt: new Date('2026-09-18T00:00:00.000Z'),
    ...overrides,
  };
}

describe('GoogleDriveService', () => {
  let service: GoogleDriveService;
  let prisma: { googleDriveConnection: Record<string, jest.Mock> };
  const ORIGINAL_ENV = process.env;

  beforeEach(async () => {
    process.env = {
      ...ORIGINAL_ENV,
      GOOGLE_DRIVE_CLIENT_ID: 'client-id',
      GOOGLE_DRIVE_CLIENT_SECRET: 'client-secret',
      GOOGLE_DRIVE_REDIRECT_URI:
        'https://backend.example/admin/google-drive/callback',
    };
    jest.clearAllMocks();

    prisma = {
      googleDriveConnection: {
        findUnique: jest.fn(),
        upsert: jest.fn(),
        update: jest.fn().mockResolvedValue({}),
        delete: jest.fn(),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GoogleDriveService,
        { provide: PrismaService, useValue: prisma },
      ],
    }).compile();

    service = module.get(GoogleDriveService);
  });

  afterAll(() => {
    process.env = ORIGINAL_ENV;
  });

  describe('getAuthUrl', () => {
    it('requests offline access, forced re-consent, and the read-only Drive scope', () => {
      mockOAuth2Instance.generateAuthUrl.mockReturnValue(
        'https://accounts.google.com/o/oauth2/consent',
      );

      const url = service.getAuthUrl('state-token');

      expect(url).toBe('https://accounts.google.com/o/oauth2/consent');
      expect(mockOAuth2Instance.generateAuthUrl).toHaveBeenCalledWith({
        access_type: 'offline',
        prompt: 'consent',
        scope: ['https://www.googleapis.com/auth/drive.readonly'],
        state: 'state-token',
      });
    });

    it('refuses to run when the Drive OAuth env vars are not configured', () => {
      delete process.env.GOOGLE_DRIVE_CLIENT_ID;
      expect(() => service.getAuthUrl('state-token')).toThrow(
        'GOOGLE_DRIVE_CLIENT_ID must be set',
      );
    });
  });

  describe('handleCallback', () => {
    it('stores the refresh token encrypted and returns the connected email', async () => {
      mockOAuth2Instance.getToken.mockResolvedValue({
        tokens: {
          refresh_token: 'refresh-123',
          access_token: 'access-abc',
          expiry_date: Date.now() + 3600_000,
          scope: 'https://www.googleapis.com/auth/drive.readonly',
        },
      });
      mockDriveAboutGet.mockResolvedValue({
        data: { user: { emailAddress: 'founder@teyro.app' } },
      });

      const result = await service.handleCallback('user-1', 'auth-code');

      expect(result).toEqual({ email: 'founder@teyro.app' });
      expect(prisma.googleDriveConnection.upsert).toHaveBeenCalledTimes(1);
      const calls = prisma.googleDriveConnection.upsert.mock.calls as Array<
        [
          {
            where: { userId: string };
            create: {
              googleAccountEmail: string;
              encryptedRefreshToken: string;
            };
          },
        ]
      >;
      const [call] = calls[0];
      expect(call.where).toEqual({ userId: 'user-1' });
      expect(call.create.googleAccountEmail).toBe('founder@teyro.app');
      // The refresh token must round-trip through the same envelope
      // earnings/crypto.util.ts already uses elsewhere — never stored plain.
      expect(
        decryptJson<{ refreshToken: string }>(
          call.create.encryptedRefreshToken,
        ),
      ).toEqual({
        refreshToken: 'refresh-123',
      });
    });

    it('rejects when Google withholds the refresh token, without writing anything', async () => {
      mockOAuth2Instance.getToken.mockResolvedValue({
        tokens: { access_token: 'access-abc' },
      });

      await expect(
        service.handleCallback('user-1', 'auth-code'),
      ).rejects.toThrow(BadRequestException);
      expect(prisma.googleDriveConnection.upsert).not.toHaveBeenCalled();
    });
  });

  describe('getStatus', () => {
    it('reports not connected when nothing is stored', async () => {
      prisma.googleDriveConnection.findUnique.mockResolvedValue(null);
      await expect(service.getStatus('user-1')).resolves.toEqual({
        connected: false,
      });
    });

    it('reports the connected account, never the token', async () => {
      prisma.googleDriveConnection.findUnique.mockResolvedValue(
        refreshTokenRow(),
      );
      await expect(service.getStatus('user-1')).resolves.toEqual({
        connected: true,
        email: 'founder@teyro.app',
        connectedAt: '2026-09-18T00:00:00.000Z',
      });
    });
  });

  describe('disconnect', () => {
    it('revokes the token with Google and deletes the stored connection', async () => {
      prisma.googleDriveConnection.findUnique.mockResolvedValue(
        refreshTokenRow(),
      );
      mockOAuth2Instance.revokeToken.mockResolvedValue({});

      await service.disconnect('user-1');

      expect(mockOAuth2Instance.revokeToken).toHaveBeenCalledWith(
        'refresh-123',
      );
      expect(prisma.googleDriveConnection.delete).toHaveBeenCalledWith({
        where: { userId: 'user-1' },
      });
    });

    it('still deletes the local row even when Google refuses the revoke call', async () => {
      prisma.googleDriveConnection.findUnique.mockResolvedValue(
        refreshTokenRow(),
      );
      mockOAuth2Instance.revokeToken.mockRejectedValue(
        new Error('token already invalid'),
      );

      await service.disconnect('user-1');

      expect(prisma.googleDriveConnection.delete).toHaveBeenCalledWith({
        where: { userId: 'user-1' },
      });
    });

    it('is a no-op when nothing is connected', async () => {
      prisma.googleDriveConnection.findUnique.mockResolvedValue(null);
      await service.disconnect('user-1');
      expect(prisma.googleDriveConnection.delete).not.toHaveBeenCalled();
    });
  });

  describe('listChildren', () => {
    it('throws NotFoundException when Drive is not connected', async () => {
      prisma.googleDriveConnection.findUnique.mockResolvedValue(null);
      await expect(service.listChildren('user-1')).rejects.toThrow(
        NotFoundException,
      );
    });

    it('walks every page and categorizes each entry', async () => {
      prisma.googleDriveConnection.findUnique.mockResolvedValue(
        refreshTokenRow(),
      );
      mockDriveFilesList
        .mockResolvedValueOnce({
          data: {
            nextPageToken: 'page-2',
            files: [
              {
                id: 'f1',
                name: 'Module 1',
                mimeType: 'application/vnd.google-apps.folder',
              },
            ],
          },
        })
        .mockResolvedValueOnce({
          data: {
            files: [
              {
                id: 'f2',
                name: 'intro.mp4',
                mimeType: 'video/mp4',
                size: '1000',
              },
            ],
          },
        });

      const files = await service.listChildren('user-1', 'root');

      expect(files).toEqual([
        {
          id: 'f1',
          name: 'Module 1',
          mimeType: 'application/vnd.google-apps.folder',
          category: 'folder',
          sizeBytes: undefined,
          durationMs: undefined,
          modifiedTime: undefined,
        },
        {
          id: 'f2',
          name: 'intro.mp4',
          mimeType: 'video/mp4',
          category: 'video',
          sizeBytes: 1000,
          durationMs: undefined,
          modifiedTime: undefined,
        },
      ]);
      expect(mockDriveFilesList).toHaveBeenCalledTimes(2);
    });
  });

  describe('getFolderPreview', () => {
    it('rejects a selection that is not a folder', async () => {
      prisma.googleDriveConnection.findUnique.mockResolvedValue(
        refreshTokenRow(),
      );
      mockDriveFilesGet.mockResolvedValue({
        data: { id: 'f1', name: 'video.mp4', mimeType: 'video/mp4' },
      });

      await expect(service.getFolderPreview('user-1', 'f1')).rejects.toThrow(
        BadRequestException,
      );
    });

    it('recursively summarizes a course folder: counts by category, sums known durations, flags unsupported files', async () => {
      prisma.googleDriveConnection.findUnique.mockResolvedValue(
        refreshTokenRow(),
      );
      mockDriveFilesGet.mockResolvedValue({
        data: {
          id: 'course-1',
          name: 'How to Create Great Content',
          mimeType: 'application/vnd.google-apps.folder',
        },
      });

      // Root: 1 subfolder + 1 PDF. Subfolder: 1 video with known duration,
      // 1 video with no Drive-reported duration, 1 unsupported spreadsheet.
      mockDriveFilesList
        .mockResolvedValueOnce({
          data: {
            files: [
              {
                id: 'module-1',
                name: 'Module 1',
                mimeType: 'application/vnd.google-apps.folder',
              },
              {
                id: 'doc-1',
                name: 'syllabus.pdf',
                mimeType: 'application/pdf',
                size: '2048',
              },
            ],
          },
        })
        .mockResolvedValueOnce({
          data: {
            files: [
              {
                id: 'vid-1',
                name: '01 Intro.mp4',
                mimeType: 'video/mp4',
                videoMediaMetadata: { durationMillis: '90000' },
              },
              { id: 'vid-2', name: '02 Hooks.mp4', mimeType: 'video/mp4' },
              {
                id: 'sheet-1',
                name: 'budget.xlsx',
                mimeType: 'application/vnd.google-apps.spreadsheet',
              },
            ],
          },
        });

      const preview = await service.getFolderPreview('user-1', 'course-1');

      expect(preview).toEqual({
        folderId: 'course-1',
        folderName: 'How to Create Great Content',
        totalFiles: 4,
        videos: 2,
        documents: 1,
        presentations: 0,
        images: 0,
        unsupported: [expect.objectContaining({ id: 'sheet-1' })],
        estimatedVideoDurationSeconds: 90,
        videosMissingDuration: 1,
        videosOverLimit: 0,
        modules: 1,
      });
    });
  });
});
