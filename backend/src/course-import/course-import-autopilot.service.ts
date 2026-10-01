import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { PrismaService } from '../prisma/prisma.service';
import { CourseStructureAnalysisService } from './course-structure-analysis.service';
import { CourseImportPublishService } from './course-import-publish.service';

/**
 * Importer autopilot. An admin who turns it on when starting an import
 * (Teyro HQ) doesn't have to come back to click through the pipeline:
 *
 *   READY_FOR_GENERATION, not yet analyzed  →  run the structure analysis
 *   READY_FOR_REVIEW, no course yet          →  build the DRAFT course with
 *                                               the title / track / level
 *                                               chosen at the start
 *
 * It only ever does what the admin's own buttons do, through the same
 * services, so every guard and validation still applies. The course lands
 * as a DRAFT and goes through normal review; appending later lessons into
 * an existing course stays manual, because that can reopen an approved one.
 *
 * If a step fails, autopilot turns itself off for that import and leaves the
 * reason in autopilotNote — the admin finishes by hand instead of the job
 * retrying the same failure every tick.
 */
@Injectable()
export class CourseImportAutopilotService {
  private readonly logger = new Logger(CourseImportAutopilotService.name);
  private running = false;

  constructor(
    private readonly prisma: PrismaService,
    private readonly analysis: CourseStructureAnalysisService,
    private readonly publish: CourseImportPublishService,
  ) {}

  @Cron('*/20 * * * * *', { name: 'course-import-autopilot' })
  async scheduledTick(): Promise<void> {
    if (this.running) return; // a slow course build must not overlap itself
    this.running = true;
    try {
      await this.tick();
    } catch (err) {
      this.logger.error('Autopilot tick failed', err as Error);
    } finally {
      this.running = false;
    }
  }

  async tick(): Promise<{ analyzed: number; built: number }> {
    let analyzed = 0;
    let built = 0;

    const toAnalyze = await this.prisma.courseImport.findMany({
      where: {
        autopilot: true,
        status: 'READY_FOR_GENERATION',
        modules: { none: {} },
      },
      select: { id: true, createdById: true },
      take: 3,
    });
    for (const imp of toAnalyze) {
      try {
        await this.analysis.analyze(imp.createdById, imp.id);
        await this.note(
          imp.id,
          'Analyzed the course structure. Writing lessons next.',
        );
        analyzed++;
        // No direct generation kick: the generation job picks these lessons
        // up within 20s, one at a time. Kicking it here could run a second
        // AI call in parallel with the job's own, which a free-tier provider
        // answers with rate-limit errors.
      } catch (err) {
        await this.stop(
          imp.id,
          `Couldn't analyze the structure: ${(err as Error).message}`,
        );
      }
    }

    const toBuild = await this.prisma.courseImport.findMany({
      where: {
        autopilot: true,
        status: 'READY_FOR_REVIEW',
        createdCourseId: null,
        courseTitle: { not: null },
        courseCategory: { not: null },
      },
      select: {
        id: true,
        createdById: true,
        courseTitle: true,
        courseCategory: true,
        courseLevel: true,
        createdBy: { select: { role: true } },
      },
      take: 2,
    });
    for (const imp of toBuild) {
      try {
        const { courseId } = await this.publish.createCourse(
          { id: imp.createdById, role: imp.createdBy.role },
          imp.id,
          {
            title: imp.courseTitle as string,
            category: imp.courseCategory as string,
            level: imp.courseLevel ?? undefined,
          },
        );
        await this.note(
          imp.id,
          `Built the draft course (${courseId}). It's ready for your review.`,
        );
        built++;
      } catch (err) {
        await this.stop(
          imp.id,
          `Couldn't build the course: ${(err as Error).message}`,
        );
      }
    }

    return { analyzed, built };
  }

  private note(id: string, text: string) {
    return this.prisma.courseImport.update({
      where: { id },
      data: { autopilotNote: text.slice(0, 500) },
    });
  }

  private async stop(id: string, reason: string) {
    this.logger.warn(`Autopilot stopped for import ${id}: ${reason}`);
    await this.prisma.courseImport.update({
      where: { id },
      data: { autopilot: false, autopilotNote: reason.slice(0, 500) },
    });
  }
}
