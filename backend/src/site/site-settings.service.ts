import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { parseYouTubeId } from './youtube.util';

/** Site-wide content an admin edits in Teyro HQ (stored on the PlatformSettings singleton). */
@Injectable()
export class SiteSettingsService {
  constructor(private readonly prisma: PrismaService) {}

  /** Public: the video id the homepage embeds, or null when none is set. */
  async getIntroVideo(): Promise<{ videoId: string | null }> {
    const row = await this.prisma.platformSettings.findUnique({
      where: { id: 'singleton' },
      select: { introVideoUrl: true },
    });
    return { videoId: parseYouTubeId(row?.introVideoUrl) };
  }

  async getIntroVideoAdmin() {
    const row = await this.prisma.platformSettings.findUnique({
      where: { id: 'singleton' },
      select: { introVideoUrl: true, updatedAt: true },
    });
    return {
      url: row?.introVideoUrl ?? null,
      videoId: parseYouTubeId(row?.introVideoUrl),
      updatedAt: row?.updatedAt ?? null,
    };
  }

  /** An empty url removes the video (the homepage section disappears). */
  async setIntroVideo(actorId: string, rawUrl: string | null | undefined) {
    const url = (rawUrl ?? '').trim();
    if (url && !parseYouTubeId(url)) {
      throw new BadRequestException(
        'That is not a YouTube link. Paste the video link from YouTube (youtube.com/watch?v=… or youtu.be/…).',
      );
    }
    const value = url || null;
    await this.prisma.platformSettings.upsert({
      where: { id: 'singleton' },
      create: { id: 'singleton', introVideoUrl: value, updatedByAdminId: actorId },
      update: { introVideoUrl: value, updatedByAdminId: actorId },
    });
    await this.prisma.adminAuditLog.create({
      data: {
        actorId,
        action: 'ADMIN_UPDATED_INTRO_VIDEO',
        entityType: 'PlatformSettings',
        entityId: 'singleton',
        meta: { introVideoUrl: value },
      },
    });
    return this.getIntroVideoAdmin();
  }
}
