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
 *
 * The guard is applied per-method rather than at the class level so that
 * `callback` (the one route below that Google itself redirects the browser
 * to) can be exempted — see its own doc comment for why it must be.
 */
@Controller('admin/google-drive')
export class GoogleDriveController {
  private readonly logger = new Logger(GoogleDriveController.name);

  constructor(private readonly googleDrive: GoogleDriveService) {}

  @Get('status')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.ADMIN)
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
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.ADMIN)
  connect(@GetUser() user: AuthedUser, @Res() res: Response) {
    const statePayload: OAuthState = { userId: user.id, iat: Date.now() };
    const { encryptedData } = encryptJson(statePayload);
    const url = this.googleDrive.getAuthUrl(encryptedData);
    res.redirect(url);
  }

  /**
   * Google redirects the admin's own browser here after consent — a
   * cross-origin top-level navigation straight to this backend's own
   * domain, not through the frontend. The frontend's login cookie was never
   * set for this domain, so it can never be present here; a cookie-based
   * guard on this route cannot ever succeed in a deployed environment (only
   * "worked" locally because frontend/backend shared the `localhost`
   * hostname). Identity here comes entirely from `state` instead — it was
   * minted by `connect()` above (which IS guarded), is tamper-evident, and
   * expires after `STATE_TTL_MS`, which is the standard way an OAuth
   * callback proves who started the flow without a session cookie.
   */
  @Get('callback')
  async callback(
    @Res() res: Response,
    @Query('code') code?: string,
    @Query('state') state?: string,
    @Query('error') error?: string,
  ) {
    const frontendBase = frontendBaseUrl();
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
    if (Date.now() - statePayload.iat > STATE_TTL_MS)
      return redirectTo({ driveError: 'state_expired' });

    try {
      await this.googleDrive.handleCallback(statePayload.userId, code);
      return redirectTo({ driveConnected: '1' });
    } catch (err) {
      this.logger.error(
        `Drive OAuth callback failed for user ${statePayload.userId}: ${(err as Error).message}`,
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
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.ADMIN)
  async disconnect(@GetUser() user: AuthedUser) {
    await this.googleDrive.disconnect(user.id);
    return { ok: true };
  }

  /** One level of folder children, for the folder-browser UI. */
  @Get('folders')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.ADMIN)
  listChildren(
    @GetUser() user: AuthedUser,
    @Query('parentId') parentId?: string,
  ) {
    return this.googleDrive.listChildren(user.id, parentId);
  }

  /** Deterministic recursive summary of a selected course folder. */
  @Get('folders/:id/preview')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.ADMIN)
  getFolderPreview(@GetUser() user: AuthedUser, @Param('id') id: string) {
    return this.googleDrive.getFolderPreview(user.id, id);
  }
}

/**
 * Where the browser goes after Google's consent screen. FRONTEND_URL when
 * set; otherwise the first non-localhost entry of the CORS whitelist (the
 * deployed frontend is always in it), and only then localhost. Falling
 * straight to localhost sent production admins to a dead page after a
 * connect that had actually succeeded.
 */
export function frontendBaseUrl(): string {
  const explicit = process.env.FRONTEND_URL?.trim();
  if (explicit) return explicit.replace(/\/+$/, '');
  const deployed = (process.env.ALLOWED_ORIGINS ?? '')
    .split(',')
    .map((o) => o.trim().replace(/\/+$/, ''))
    .find((o) => /^https?:\/\//.test(o) && !/localhost|127\.0\.0\.1/.test(o));
  return deployed ?? 'http://localhost:3000';
}
