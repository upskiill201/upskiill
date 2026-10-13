import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { hasForgivingHearts, levelLabel } from './originals.policy';

/** What the map and the player need to know about an Original. */
export interface OriginalInfo {
  trackId: string;
  trackSlug: string;
  trackTitle: string;
  level: number;
  levelLabel: string;
  /** Published levels in the Track. */
  levelCount: number;
  upcomingUnits: number;
  forgivingHearts: boolean;
  nextLevel: NextLevel | null;
}

export interface NextLevel {
  courseId: string;
  slug: string;
  title: string;
  level: number;
  levelLabel: string;
}

/** Returned from lesson completion when a learner finishes a whole level. */
export interface LevelCompletion {
  trackTitle: string;
  level: number;
  levelLabel: string;
  /** The level they were just enrolled in; null when the Track is finished. */
  next: NextLevel | null;
}

type TrackCourse = {
  trackId: string | null;
  trackLevel: number | null;
  upcomingUnits: number;
};

/**
 * Teyro Originals: Tracks of linked levels (docs/ORIGINALS_PLAYBOOK.md §3).
 * Access rules live in originals.policy.ts / originals-access.ts; this is the
 * Track-shaped reads.
 */
@Injectable()
export class OriginalsService {
  constructor(private readonly prisma: PrismaService) {}

  private async publishedLevels(trackId: string) {
    return this.prisma.course.findMany({
      where: { trackId, isOriginal: true, published: true },
      orderBy: { trackLevel: 'asc' },
      select: { id: true, slug: true, title: true, trackLevel: true },
    });
  }

  private toNextLevel(c: { id: string; slug: string; title: string; trackLevel: number | null }): NextLevel {
    const level = c.trackLevel ?? 1;
    return { courseId: c.id, slug: c.slug, title: c.title, level, levelLabel: levelLabel(level) };
  }

  /** Track/level info for one course, or null when it isn't an Original. */
  async describe(course: TrackCourse & { isOriginal: boolean }): Promise<OriginalInfo | null> {
    if (!course.isOriginal || !course.trackId) return null;
    const [track, levels] = await Promise.all([
      this.prisma.originalTrack.findUnique({
        where: { id: course.trackId },
        select: { id: true, slug: true, title: true },
      }),
      this.publishedLevels(course.trackId),
    ]);
    if (!track) return null;

    const level = course.trackLevel ?? 1;
    const next = levels.find((l) => (l.trackLevel ?? 1) > level);
    return {
      trackId: track.id,
      trackSlug: track.slug,
      trackTitle: track.title,
      level,
      levelLabel: levelLabel(level),
      levelCount: levels.length,
      upcomingUnits: course.upcomingUnits,
      forgivingHearts: hasForgivingHearts({ isOriginal: true, trackLevel: level }),
      nextLevel: next ? this.toNextLevel(next) : null,
    };
  }

  /**
   * The learner completed every published lesson of a level. Null while the
   * level still has unreleased units: catching up with what's published
   * isn't finishing the level.
   */
  async levelCompletion(course: TrackCourse): Promise<LevelCompletion | null> {
    if (!course.trackId || course.upcomingUnits > 0) return null;
    const [track, levels] = await Promise.all([
      this.prisma.originalTrack.findUnique({ where: { id: course.trackId }, select: { title: true } }),
      this.publishedLevels(course.trackId),
    ]);
    if (!track) return null;

    const level = course.trackLevel ?? 1;
    const next = levels.find((l) => (l.trackLevel ?? 1) > level);
    return {
      trackTitle: track.title,
      level,
      levelLabel: levelLabel(level),
      next: next ? this.toNextLevel(next) : null,
    };
  }

  /**
   * Every published Original, grouped by Track, for the pinned "Teyro
   * Originals" row. Public: catalogue data only.
   */
  async listTracks() {
    const tracks = await this.prisma.originalTrack.findMany({
      where: { courses: { some: { isOriginal: true, published: true } } },
      orderBy: { createdAt: 'asc' },
      select: {
        id: true,
        slug: true,
        title: true,
        category: true,
        description: true,
        courses: {
          where: { isOriginal: true, published: true },
          orderBy: { trackLevel: 'asc' },
          select: {
            id: true,
            slug: true,
            title: true,
            shortDescription: true,
            thumbnailUrl: true,
            trackLevel: true,
            upcomingUnits: true,
            _count: { select: { enrollments: true } },
          },
        },
      },
    });

    return tracks.map((t) => ({
      id: t.id,
      slug: t.slug,
      title: t.title,
      category: t.category,
      description: t.description,
      levels: t.courses.map((c) => ({
        courseId: c.id,
        slug: c.slug,
        title: c.title,
        shortDescription: c.shortDescription,
        thumbnailUrl: c.thumbnailUrl,
        level: c.trackLevel ?? 1,
        levelLabel: levelLabel(c.trackLevel),
        upcomingUnits: c.upcomingUnits,
        learners: c._count.enrollments,
      })),
    }));
  }
}
