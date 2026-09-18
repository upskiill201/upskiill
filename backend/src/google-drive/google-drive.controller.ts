import {
  BadRequestException,
  Controller,
  Get,
  Logger,
  Param,
  Post,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import type { Response } from 'express';
import { Role } from '@prisma/client';
import { Roles } from '../auth/decorator/roles.decorator';
import { RolesGuard } from '../auth/guard/roles.guard';
import { GetUser } from '../auth/decorator/get-user.decorator';
import { decryptJson, encryptJson } from '../earnings/crypto.util';
import { GoogleDriveService } from './google-drive.service';

interface AuthedUser {
  id: string;
  role?: string;
}

interface OAuthState {
  userId: string;
  iat: number;
}

const STATE_TTL_MS = 10 * 60 * 1000; // 10 minutes — a consent screen left open longer must be restarted

/**
 * Admin-only Google Drive connect flow + read-only folder browsing for the
 * AI Course Importer. Never creates, edits, or publishes any course content
 * — see ../course-creation for that.
 */
@Controller('admin/google-drive')
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Roles(Role.ADMIN)
export class GoogleDriveController {
  private readonly logger = new Logger(GoogleDriveController.name);

  constructor(private readonly googleDrive: GoogleDriveService) {}

  @Get('status')
  getStatus(@GetUser() user: AuthedUser) {
    return this.googleDrive.getStatus(user.id);
  }

  /**
   * Full-page redirect target for a "Connect Google Drive" link/button.
   * `state` is an authenticated-encrypted (AES-256-GCM) CSRF token — no
   * server-side session store needed, and it doubles as tamper detection:
   * decryption fails outright if the value was altered in transit.
   */
  @Get('connect')
  connect(@GetUser() user: AuthedUser, @Res() res: Response) {
    const statePayload: OAuthState = { userId: user.id, iat: Date.now() };
    const { encryptedData } = encryptJson(statePayload);
    const url = this.googleDrive.getAuthUrl(encryptedData);
    res.redirect(url);
  }

  /** Google redirects the admin's own browser here after consent. */
  @Get('callback')
  async callback(
    @GetUser() user: AuthedUser,
    @Res() res: Response,
    @Query('code') code?: string,
    @Query('state') state?: string,
    @Query('error') error?: string,
  ) {
    const frontendBase = process.env.FRONTEND_URL || 'http://localhost:3000';
    const redirectTo = (params: Record<string, string>) => {
      const qs = new URLSearchParams(params).toString();
      res.redirect(`${frontendBase}/admin/courses/import?${qs}`);
    };

    if (error) return redirectTo({ driveError: error });
    if (!code || !state)
      return redirectTo({ driveError: 'missing_code_or_state' });

    let statePayload: OAuthState;
    try {
      statePayload = decryptJson<OAuthState>(state);
    } catch {
      return redirectTo({ driveError: 'invalid_state' });
    }
    if (statePayload.userId !== user.id)
      return redirectTo({ driveError: 'state_mismatch' });
    if (Date.now() - statePayload.iat > STATE_TTL_MS)
      return redirectTo({ driveError: 'state_expired' });

    try {
      await this.googleDrive.handleCallback(user.id, code);
      return redirectTo({ driveConnected: '1' });
    } catch (err) {
      this.logger.error(
        `Drive OAuth callback failed for user ${user.id}: ${(err as Error).message}`,
      );
      // Only our own explicitly-thrown, already user-safe message is passed
      // through — anything unexpected gets a generic code, per CLAUDE.md's
      // "no raw stack traces to admins" rule.
      const message =
        err instanceof BadRequestException ? err.message : 'connection_failed';
      return redirectTo({ driveError: message });
    }
  }

  @Post('disconnect')
  async disconnect(@GetUser() user: AuthedUser) {
    await this.googleDrive.disconnect(user.id);
    return { ok: true };
  }

  /** One level of folder children, for the folder-browser UI. */
  @Get('folders')
  listChildren(
    @GetUser() user: AuthedUser,
    @Query('parentId') parentId?: string,
  ) {
    return this.googleDrive.listChildren(user.id, parentId);
  }

  /** Deterministic recursive summary of a selected course folder. */
  @Get('folders/:id/preview')
  getFolderPreview(@GetUser() user: AuthedUser, @Param('id') id: string) {
    return this.googleDrive.getFolderPreview(user.id, id);
  }
}
