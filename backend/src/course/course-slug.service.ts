import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { slugMatchesTitle, slugUpdateFor } from './course-slug.util';

/**
 * One-time (and idempotent) cleanup: every published course gets the clean,
 * title-based URL, its old "…-962d48" slug kept in slugHistory so existing
 * links 301 to the new one. Runs after each boot so staging and production
 * both converge without a manual script; once every course is clean it reads
 * the published list and writes nothing.
 *
 * Fire-and-forget: a failure here is logged and never blocks the app.
 */
@Injectable()
export class CourseSlugService implements OnApplicationBootstrap {
  private readonly logger = new Logger(CourseSlugService.name);

  constructor(private readonly prisma: PrismaService) {}

  onApplicationBootstrap() {
    if (process.env.NODE_ENV === 'test') return;
    void this.backfill().catch((err) => this.logger.warn(`Slug backfill skipped: ${err?.message ?? err}`));
  }

  async backfill(): Promise<number> {
    const courses = await this.prisma.course.findMany({
      where: { published: true },
      select: { id: true, slug: true, title: true, slugHistory: true },
    });
    let changed = 0;
    for (const course of courses) {
      if (slugMatchesTitle(course.slug, course.title)) continue;
      const update = await slugUpdateFor(this.prisma, course);
      if (!update) continue;
      await this.prisma.course.update({ where: { id: course.id }, data: update });
      this.logger.log(`Course ${course.id}: /courses/${course.slug} → /courses/${update.slug}`);
      changed++;
    }
    return changed;
  }
}
