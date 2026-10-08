import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { google, drive_v3 } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';
import type { Readable } from 'stream';
import { PrismaService } from '../prisma/prisma.service';
import { decryptJson, encryptJson } from '../earnings/crypto.util';
import {
  ConnectionStatus,
  DriveFile,
  FolderPreview,
  NATIVE_EXPORTS,
  categorize,
} from './google-drive.types';
import { needsParts, partCountFor } from '../course-import/lesson-parts';

const SCOPES = ['https://www.googleapis.com/auth/drive.readonly'];

/** Native Google formats (Docs/Sheets/Slides/Drawings/...) have no fixed
 *  binary content — `files.get(alt:'media')` 403s on them. Docs, Slides and
 *  Sheets are exported instead (see NATIVE_EXPORTS); the rest are skipped
 *  with an honest reason rather than crashing. */
export function isGoogleNativeFormat(mimeType: string): boolean {
  return (
    mimeType.startsWith('application/vnd.google-apps.') &&
    mimeType !== 'application/vnd.google-apps.folder'
  );
}

// Drive's own directed-graph model allows a folder to (rarely, via "Add to
// Drive" shares) appear under more than one ancestor — a naive recursive walk
// on a maliciously or accidentally cyclic share graph could recurse forever.
// This bound is generous for any real course structure (course -> module ->
// lesson is depth 3) while still terminating.
const MAX_WALK_DEPTH = 8;

interface DriveFileListEntry {
  id?: string | null;
  name?: string | null;
  mimeType?: string | null;
  size?: string | null;
  modifiedTime?: string | null;
  videoMediaMetadata?: { durationMillis?: string | null } | null;
}

function mapEntry(
  entry: DriveFileListEntry,
  section: { id: string; name: string } | null,
): DriveFile {
  const mimeType = entry.mimeType ?? 'application/octet-stream';
  return {
    id: entry.id ?? '',
    name: entry.name ?? 'Untitled',
    mimeType,
    category: categorize(mimeType, entry.name ?? ''),
    sizeBytes: entry.size ? Number(entry.size) : undefined,
    durationMs: entry.videoMediaMetadata?.durationMillis
      ? Number(entry.videoMediaMetadata.durationMillis)
      : undefined,
    modifiedTime: entry.modifiedTime ?? undefined,
    sectionFolderId: section?.id,
    sectionFolderName: section?.name,
  };
}

/**
 * Google Drive integration for the AI Course Importer. OAuth (connect/
 * disconnect/token refresh) plus read-only folder browsing and deterministic
 * analysis. Does not create, modify, or generate any Teyro course content —
 * that's CourseCreationService's job (see ../course-creation), fed by later
 * phases once file processing/transcription/AI generation exist.
 */
@Injectable()
export class GoogleDriveService {
  private readonly logger = new Logger(GoogleDriveService.name);

  constructor(private readonly prisma: PrismaService) {}

  private requireEnv(name: string): string {
    const value = process.env[name];
    if (!value) {
      throw new Error(
        `${name} must be set to use the Google Drive integration.`,
      );
    }
    return value;
  }

  private oauthClient(): OAuth2Client {
    return new google.auth.OAuth2(
      this.requireEnv('GOOGLE_DRIVE_CLIENT_ID'),
      this.requireEnv('GOOGLE_DRIVE_CLIENT_SECRET'),
      this.requireEnv('GOOGLE_DRIVE_REDIRECT_URI'),
    );
  }

  /** Full-page redirect target for "Connect Google Drive". `state` is an
   *  opaque CSRF token the controller mints and verifies on callback. */
  getAuthUrl(state: string): string {
    return this.oauthClient().generateAuthUrl({
      access_type: 'offline',
      // Forces Google to reissue a refresh_token even for a user who
      // connected before — without this, reconnecting after a disconnect
      // silently returns no refresh_token and the connection can't be stored.
      prompt: 'consent',
      scope: SCOPES,
      state,
    });
  }

  async handleCallback(
    userId: string,
    code: string,
  ): Promise<{ email: string }> {
    const client = this.oauthClient();
    const { tokens } = await client.getToken(code);
    if (!tokens.refresh_token) {
      throw new BadRequestException(
        'Google did not return a refresh token. Remove Teyro from myaccount.google.com/permissions and try connecting again.',
      );
    }
    client.setCredentials(tokens);

    const drive = google.drive({ version: 'v3', auth: client });
    const about = await drive.about.get({ fields: 'user' });
    const email = about.data.user?.emailAddress ?? 'unknown';

    const { encryptedData, keyVersion } = encryptJson({
      refreshToken: tokens.refresh_token,
    });

    await this.prisma.googleDriveConnection.upsert({
      where: { userId },
      create: {
        userId,
        googleAccountEmail: email,
        encryptedRefreshToken: encryptedData,
        keyVersion,
        accessToken: tokens.access_token ?? undefined,
        accessTokenExpiresAt: tokens.expiry_date
          ? new Date(tokens.expiry_date)
          : undefined,
        scope: tokens.scope ?? SCOPES.join(' '),
      },
      update: {
        googleAccountEmail: email,
        encryptedRefreshToken: encryptedData,
        keyVersion,
        accessToken: tokens.access_token ?? undefined,
        accessTokenExpiresAt: tokens.expiry_date
          ? new Date(tokens.expiry_date)
          : undefined,
        scope: tokens.scope ?? SCOPES.join(' '),
      },
    });

    this.logger.log(`Google Drive connected for user ${userId} (${email})`);
    return { email };
  }

  async getStatus(userId: string): Promise<ConnectionStatus> {
    const connection = await this.prisma.googleDriveConnection.findUnique({
      where: { userId },
    });
    if (!connection) return { connected: false };
    return {
      connected: true,
      email: connection.googleAccountEmail,
      connectedAt: connection.connectedAt.toISOString(),
    };
  }

  async disconnect(userId: string): Promise<void> {
    const connection = await this.prisma.googleDriveConnection.findUnique({
      where: { userId },
    });
    if (!connection) return;

    try {
      const { refreshToken } = decryptJson<{ refreshToken: string }>(
        connection.encryptedRefreshToken,
      );
      const client = this.oauthClient();
      // Best-effort: Teyro's own record is deleted regardless of whether
      // Google's revoke call succeeds (e.g. token already invalid).
      await client.revokeToken(refreshToken).catch((err) => {
        this.logger.warn(
          `Drive token revoke failed for user ${userId}: ${(err as Error).message}`,
        );
      });
    } finally {
      await this.prisma.googleDriveConnection.delete({ where: { userId } });
    }
  }

  private async getAuthorizedClient(userId: string): Promise<OAuth2Client> {
    const connection = await this.prisma.googleDriveConnection.findUnique({
      where: { userId },
    });
    if (!connection) {
      throw new NotFoundException(
        'Google Drive is not connected for this account.',
      );
    }
    const { refreshToken } = decryptJson<{ refreshToken: string }>(
      connection.encryptedRefreshToken,
    );

    const client = this.oauthClient();
    client.setCredentials({
      refresh_token: refreshToken,
      access_token: connection.accessToken ?? undefined,
      expiry_date: connection.accessTokenExpiresAt?.getTime(),
    });

    // The googleapis client refreshes the access token transparently when it
    // has expired, as long as a refresh_token is set. Persist whatever it
    // hands back so the NEXT call doesn't have to round-trip Google's token
    // endpoint too — best-effort; a caching failure must never fail the
    // caller's actual Drive request.
    client.on('tokens', (tokens) => {
      if (!tokens.access_token) return;
      this.prisma.googleDriveConnection
        .update({
          where: { userId },
          data: {
            accessToken: tokens.access_token,
            accessTokenExpiresAt: tokens.expiry_date
              ? new Date(tokens.expiry_date)
              : undefined,
          },
        })
        .catch((err) =>
          this.logger.warn(
            `Drive token cache update failed: ${(err as Error).message}`,
          ),
        );
    });

    return client;
  }

  private async driveClient(userId: string): Promise<drive_v3.Drive> {
    const auth = await this.getAuthorizedClient(userId);
    return google.drive({ version: 'v3', auth });
  }

  /** A short-lived (~1 hour) Drive access token, refreshed if needed — for
   *  the transfer Worker, which downloads from Drive itself so the bytes
   *  never pass through this server. Read-only scope, like everything here. */
  async getAccessToken(userId: string): Promise<string> {
    const client = await this.getAuthorizedClient(userId);
    const { token } = await client.getAccessToken();
    if (!token) {
      throw new BadRequestException(
        'Google Drive did not issue an access token. Reconnect Drive.',
      );
    }
    return token;
  }

  /** One level of a folder's children — powers the folder-browser UI.
   *  `parentId` defaults to 'root' (My Drive). */
  async listChildren(userId: string, parentId = 'root'): Promise<DriveFile[]> {
    const drive = await this.driveClient(userId);
    const files: DriveFile[] = [];
    let pageToken: string | undefined;
    do {
      const res = await drive.files.list({
        q: `'${parentId}' in parents and trashed = false`,
        fields:
          'nextPageToken, files(id, name, mimeType, size, modifiedTime, videoMediaMetadata(durationMillis))',
        pageSize: 1000,
        orderBy: 'folder,name_natural',
        pageToken,
      });
      files.push(...(res.data.files ?? []).map((e) => mapEntry(e, null)));
      pageToken = res.data.nextPageToken ?? undefined;
    } while (pageToken);
    return files;
  }

  /** Recursively walks a folder and returns a deterministic summary — file/
   *  video/document counts, total known video duration, unsupported files.
   *  No AI, no course/module/lesson inference; that's a later phase. */
  async getFolderPreview(
    userId: string,
    folderId: string,
  ): Promise<FolderPreview> {
    const drive = await this.driveClient(userId);

    const rootMeta = await drive.files.get({
      fileId: folderId,
      fields: 'id, name, mimeType',
    });
    if (rootMeta.data.mimeType !== 'application/vnd.google-apps.folder') {
      throw new BadRequestException(
        'The selected item is not a Google Drive folder.',
      );
    }

    const allFiles = await this.walkFolder(drive, folderId, 0, null);
    const nonFolders = allFiles.filter((f) => f.category !== 'folder');

    let estimatedVideoDurationSeconds = 0;
    let videosMissingDuration = 0;
    let videosOverLimit = 0;
    let longVideoParts = 0;
    const sections = new Set<string>();
    for (const file of nonFolders) {
      if (file.category === 'document' && file.sectionFolderId) {
        // A docs-only section still becomes a module (reading lessons); a
        // section with videos is counted below either way.
        sections.add(file.sectionFolderId);
      }
      if (file.category !== 'video' && file.category !== 'audio') continue;
      sections.add(file.sectionFolderId ?? '(root)');
      if (typeof file.durationMs === 'number') {
        const seconds = file.durationMs / 1000;
        estimatedVideoDurationSeconds += Math.round(seconds);
        // Over Teyro's bite-size limit: split into parts on import.
        if (needsParts(seconds)) {
          videosOverLimit += 1;
          longVideoParts += partCountFor(seconds);
        }
      } else if (file.category === 'video') {
        videosMissingDuration += 1;
      }
    }

    return {
      folderId,
      folderName: rootMeta.data.name ?? 'Untitled folder',
      totalFiles: nonFolders.length,
      videos: nonFolders.filter((f) => f.category === 'video').length,
      audio: nonFolders.filter((f) => f.category === 'audio').length,
      documents: nonFolders.filter((f) => f.category === 'document').length,
      presentations: nonFolders.filter((f) => f.category === 'presentation')
        .length,
      images: nonFolders.filter((f) => f.category === 'image').length,
      projectFiles: nonFolders.filter((f) => f.category === 'file').length,
      unsupported: nonFolders.filter(
        (f) =>
          f.category === 'other' ||
          (isGoogleNativeFormat(f.mimeType) && !NATIVE_EXPORTS[f.mimeType]),
      ),
      estimatedVideoDurationSeconds,
      videosMissingDuration,
      videosOverLimit,
      longVideoParts,
      modules: sections.size,
    };
  }

  /** Metadata for a single file or folder (name/mimeType/size) — used e.g. to
   *  capture a course folder's display name when an import job is created. */
  async getFileMetadata(
    userId: string,
    fileId: string,
  ): Promise<{ id: string; name: string; mimeType: string }> {
    const drive = await this.driveClient(userId);
    const res = await drive.files.get({ fileId, fields: 'id, name, mimeType' });
    return {
      id: res.data.id ?? fileId,
      name: res.data.name ?? 'Untitled',
      mimeType: res.data.mimeType ?? 'application/octet-stream',
    };
  }

  /** Every non-folder file under a folder, recursively — the enumeration
   *  CourseImportService uses to create one CourseImportFile row per file. */
  async listAllFiles(userId: string, folderId: string): Promise<DriveFile[]> {
    const drive = await this.driveClient(userId);
    const all = await this.walkFolder(drive, folderId, 0, null);
    return all.filter((f) => f.category !== 'folder');
  }

  /** Streams a file's bytes. Native Docs/Slides/Sheets are exported (PDF /
   *  XLSX, see NATIVE_EXPORTS); other native formats throw. */
  async downloadFile(
    userId: string,
    fileId: string,
  ): Promise<{ stream: Readable; mimeType: string; sizeBytes?: number }> {
    const drive = await this.driveClient(userId);
    const meta = await drive.files.get({
      fileId,
      fields: 'id, name, mimeType, size',
    });
    const mimeType = meta.data.mimeType ?? 'application/octet-stream';
    if (isGoogleNativeFormat(mimeType)) {
      const target = NATIVE_EXPORTS[mimeType];
      if (!target) {
        throw new BadRequestException(
          `"${meta.data.name}" is a native Google file (${mimeType}) that can't be exported.`,
        );
      }
      // Drive caps an export at 10MB; past that it answers 403
      // exportSizeLimitExceeded, which surfaces as a normal file failure.
      const exported = await drive.files.export(
        { fileId, mimeType: target.mimeType },
        { responseType: 'stream' },
      );
      return {
        stream: exported.data as unknown as Readable,
        mimeType: target.mimeType,
      };
    }

    const res = await drive.files.get(
      { fileId, alt: 'media' },
      { responseType: 'stream' },
    );
    return {
      stream: res.data as unknown as Readable,
      mimeType,
      sizeBytes: meta.data.size ? Number(meta.data.size) : undefined,
    };
  }

  /**
   * @param section The first-level subfolder this walk is currently inside,
   *   or null while still at the selected course root. Deliberately stays
   *   the SAME object as recursion goes deeper than one level — a course's
   *   sections are its root's direct subfolders; anything nested further
   *   still belongs to that same section, not a new one per nesting level.
   */
  private async walkFolder(
    drive: drive_v3.Drive,
    folderId: string,
    depth: number,
    section: { id: string; name: string } | null,
  ): Promise<DriveFile[]> {
    if (depth > MAX_WALK_DEPTH) {
      this.logger.warn(
        `Drive folder walk hit max depth (${MAX_WALK_DEPTH}) under folder ${folderId} — stopping early.`,
      );
      return [];
    }

    const children: DriveFile[] = [];
    let pageToken: string | undefined;
    do {
      const res = await drive.files.list({
        q: `'${folderId}' in parents and trashed = false`,
        fields:
          'nextPageToken, files(id, name, mimeType, size, modifiedTime, videoMediaMetadata(durationMillis))',
        pageSize: 1000,
        // Same natural sort as listChildren — CourseStructureAnalysisService
        // depends on this to interleave resources with the video they
        // follow (e.g. "01 Intro.mp4" then "01 Intro - slides.pdf").
        orderBy: 'name_natural',
        pageToken,
      });
      children.push(...(res.data.files ?? []).map((e) => mapEntry(e, section)));
      pageToken = res.data.nextPageToken ?? undefined;
    } while (pageToken);

    let all = children;
    const subfolders = children.filter((f) => f.category === 'folder');
    for (const sub of subfolders) {
      // Only the root's direct children start a new section; deeper
      // subfolders inherit whatever section they're already inside.
      const childSection = section ?? { id: sub.id, name: sub.name };
      all = all.concat(
        await this.walkFolder(drive, sub.id, depth + 1, childSection),
      );
    }
    return all;
  }
}
