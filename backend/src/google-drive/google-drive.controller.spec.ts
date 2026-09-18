import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException } from '@nestjs/common';
import type { Response } from 'express';
import { GoogleDriveController } from './google-drive.controller';
import { GoogleDriveService } from './google-drive.service';
import { encryptJson } from '../earnings/crypto.util';

const user = { id: 'user-1', role: 'ADMIN' };

function fakeResponse(): jest.Mocked<Pick<Response, 'redirect'>> {
  return { redirect: jest.fn() } as unknown as jest.Mocked<
    Pick<Response, 'redirect'>
  >;
}

describe('GoogleDriveController', () => {
  let controller: GoogleDriveController;
  let googleDrive: {
    getStatus: jest.Mock;
    getAuthUrl: jest.Mock;
    handleCallback: jest.Mock;
    disconnect: jest.Mock;
    listChildren: jest.Mock;
    getFolderPreview: jest.Mock;
  };
  const ORIGINAL_ENV = process.env;

  beforeEach(async () => {
    process.env = {
      ...ORIGINAL_ENV,
      FRONTEND_URL: 'https://staging.teyro.app',
    };

    googleDrive = {
      getStatus: jest.fn(),
      getAuthUrl: jest.fn(),
      handleCallback: jest.fn(),
      disconnect: jest.fn(),
      listChildren: jest.fn(),
      getFolderPreview: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [GoogleDriveController],
      providers: [{ provide: GoogleDriveService, useValue: googleDrive }],
    }).compile();

    controller = module.get(GoogleDriveController);
  });

  afterAll(() => {
    process.env = ORIGINAL_ENV;
  });

  it('connect() redirects the browser straight to the URL GoogleDriveService produces', () => {
    googleDrive.getAuthUrl.mockReturnValue(
      'https://accounts.google.com/o/oauth2/consent?...',
    );
    const res = fakeResponse();

    controller.connect(user, res as unknown as Response);

    expect(googleDrive.getAuthUrl).toHaveBeenCalledWith(expect.any(String));
    expect(res.redirect).toHaveBeenCalledWith(
      'https://accounts.google.com/o/oauth2/consent?...',
    );
  });

  describe('callback()', () => {
    const validState = () =>
      encryptJson({ userId: user.id, iat: Date.now() }).encryptedData;

    it('redirects with the error Google sent when the admin declines consent', async () => {
      const res = fakeResponse();
      await controller.callback(
        user,
        res as unknown as Response,
        undefined,
        undefined,
        'access_denied',
      );
      expect(res.redirect).toHaveBeenCalledWith(
        'https://staging.teyro.app/admin/courses/import?driveError=access_denied',
      );
      expect(googleDrive.handleCallback).not.toHaveBeenCalled();
    });

    it('redirects with missing_code_or_state when Google omits either param', async () => {
      const res = fakeResponse();
      await controller.callback(
        user,
        res as unknown as Response,
        undefined,
        validState(),
        undefined,
      );
      expect(res.redirect).toHaveBeenCalledWith(
        'https://staging.teyro.app/admin/courses/import?driveError=missing_code_or_state',
      );
    });

    it('redirects with invalid_state when the state cannot be decrypted (tampered or garbage)', async () => {
      const res = fakeResponse();
      await controller.callback(
        user,
        res as unknown as Response,
        'auth-code',
        'not-a-real-token',
        undefined,
      );
      expect(res.redirect).toHaveBeenCalledWith(
        'https://staging.teyro.app/admin/courses/import?driveError=invalid_state',
      );
      expect(googleDrive.handleCallback).not.toHaveBeenCalled();
    });

    it('redirects with state_mismatch when the state belongs to a different user', async () => {
      const res = fakeResponse();
      const state = encryptJson({
        userId: 'someone-else',
        iat: Date.now(),
      }).encryptedData;
      await controller.callback(
        user,
        res as unknown as Response,
        'auth-code',
        state,
        undefined,
      );
      expect(res.redirect).toHaveBeenCalledWith(
        'https://staging.teyro.app/admin/courses/import?driveError=state_mismatch',
      );
      expect(googleDrive.handleCallback).not.toHaveBeenCalled();
    });

    it('redirects with state_expired when the consent screen was left open too long', async () => {
      const res = fakeResponse();
      const state = encryptJson({
        userId: user.id,
        iat: Date.now() - 11 * 60 * 1000,
      }).encryptedData;
      await controller.callback(
        user,
        res as unknown as Response,
        'auth-code',
        state,
        undefined,
      );
      expect(res.redirect).toHaveBeenCalledWith(
        'https://staging.teyro.app/admin/courses/import?driveError=state_expired',
      );
      expect(googleDrive.handleCallback).not.toHaveBeenCalled();
    });

    it('completes the connection and redirects with driveConnected=1 on success', async () => {
      const res = fakeResponse();
      googleDrive.handleCallback.mockResolvedValue({
        email: 'founder@teyro.app',
      });

      await controller.callback(
        user,
        res as unknown as Response,
        'auth-code',
        validState(),
        undefined,
      );

      expect(googleDrive.handleCallback).toHaveBeenCalledWith(
        'user-1',
        'auth-code',
      );
      expect(res.redirect).toHaveBeenCalledWith(
        'https://staging.teyro.app/admin/courses/import?driveConnected=1',
      );
    });

    it('passes through a known BadRequestException message', async () => {
      const res = fakeResponse();
      googleDrive.handleCallback.mockRejectedValue(
        new BadRequestException('Google did not return a refresh token.'),
      );

      await controller.callback(
        user,
        res as unknown as Response,
        'auth-code',
        validState(),
        undefined,
      );

      expect(res.redirect).toHaveBeenCalledWith(
        'https://staging.teyro.app/admin/courses/import?driveError=Google+did+not+return+a+refresh+token.',
      );
    });

    it('never leaks an unexpected error message — generic code only', async () => {
      const res = fakeResponse();
      googleDrive.handleCallback.mockRejectedValue(
        new Error('ECONNREFUSED 10.0.0.5:443 credentials leaked here'),
      );

      await controller.callback(
        user,
        res as unknown as Response,
        'auth-code',
        validState(),
        undefined,
      );

      expect(res.redirect).toHaveBeenCalledWith(
        'https://staging.teyro.app/admin/courses/import?driveError=connection_failed',
      );
    });
  });

  it('disconnect() delegates to the service for the current user', async () => {
    googleDrive.disconnect.mockResolvedValue(undefined);
    await expect(controller.disconnect(user)).resolves.toEqual({ ok: true });
    expect(googleDrive.disconnect).toHaveBeenCalledWith('user-1');
  });

  it('listChildren() delegates with the given parentId', async () => {
    await controller.listChildren(user, 'folder-42');
    expect(googleDrive.listChildren).toHaveBeenCalledWith(
      'user-1',
      'folder-42',
    );
  });

  it('getFolderPreview() delegates with the folder id', async () => {
    await controller.getFolderPreview(user, 'folder-42');
    expect(googleDrive.getFolderPreview).toHaveBeenCalledWith(
      'user-1',
      'folder-42',
    );
  });
});
