import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CourseImportSummary } from './course-import.types';
import {
  WITH_FILES_AND_MODULES,
  toCourseImportSummary,
} from './course-import-summary.util';

/**
 * Deterministic file -> Learn/Apply/Reflect/Deepen lesson grouping — no AI
 * involved in this step (spec §11: "Use deterministic logic first"). Every
 * uploaded video becomes one lesson; a non-video file is attached to the
 * video that immediately precedes it in Drive's natural order (a PDF right
 * after "01 Intro.mp4" is almost always that lesson's handout).
 *
 * Always produces exactly one module. Phase 3's folder walk already
 * flattens Drive subfolders, so there is no subfolder boundary left to
 * split modules on — see CourseImportModule's schema doc comment. This is
 * the honest, tested behavior for the flat, sequentially-numbered course
 * structure this was built against, not a placeholder for something smarter
 * that silently never arrived.
 */
@Injectable()
export class CourseStructureAnalysisService {
  constructor(private readonly prisma: PrismaService) {}

  async analyze(
    userId: string,
    importId: string,
  ): Promise<CourseImportSummary> {
    const courseImport = await this.prisma.courseImport.findFirst({
      where: { id: importId, createdById: userId },
      include: {
        files: { orderBy: { orderIndex: 'asc' } },
        modules: { select: { id: true } },
      },
    });
    if (!courseImport) throw new NotFoundException('Import not found.');
    if (courseImport.modules.length > 0) {
      throw new BadRequestException('This import has already been analyzed.');
    }
    if (courseImport.status !== 'READY_FOR_GENERATION') {
      throw new BadRequestException(
        'Files must finish uploading before the course structure can be analyzed.',
      );
    }

    const uploaded = courseImport.files.filter((f) => f.status === 'UPLOADED');
    const videos = uploaded.filter((f) => f.category === 'video');
    if (videos.length === 0) {
      throw new BadRequestException(
        'No uploaded videos to build lessons from.',
      );
    }

    // Attach each non-video upload to the nearest PRECEDING video, in
    // Drive's own order — the only ordering signal a flat file list gives us.
    const resourcesByVideoId = new Map<string, string[]>();
    let currentVideoId: string | null = null;
    for (const file of uploaded) {
      if (file.category === 'video') {
        currentVideoId = file.id;
        resourcesByVideoId.set(file.id, []);
      } else if (currentVideoId) {
        resourcesByVideoId.get(currentVideoId)!.push(file.id);
      }
      // A resource with no preceding video is silently dropped from lesson
      // grouping today — it stays visible in the file list either way, just
      // not attached to a lesson. Flagging that loudly is future work.
    }

    await this.prisma.$transaction(async (tx) => {
      const courseModule = await tx.courseImportModule.create({
        data: {
          importId,
          title: courseImport.sourceDriveFolderName,
          orderIndex: 0,
        },
      });
      await tx.courseImportLesson.createMany({
        data: videos.map((video, index) => ({
          moduleId: courseModule.id,
          title: cleanLessonTitle(video.driveFileName),
          orderIndex: index,
          primaryFileId: video.id,
          resourceFileIds: resourcesByVideoId.get(video.id) ?? [],
        })),
      });
      await tx.courseImport.update({
        where: { id: importId },
        data: { status: 'GENERATING_CONTENT' },
      });
    });

    const withModules = await this.prisma.courseImport.findFirstOrThrow({
      where: { id: importId },
      include: WITH_FILES_AND_MODULES,
    });

    return toCourseImportSummary(withModules);
  }
}

/** "Copy of 01. Introduction (Telegram@TechZoneX).mp4" -> "Introduction" */
export function cleanLessonTitle(fileName: string): string {
  let title = fileName.replace(/\.[^/.]+$/, ''); // strip extension
  title = title.replace(/^copy of\s+/i, ''); // Drive's "make a copy" prefix
  title = title.replace(/^(lesson\s*)?\d+\s*[.\-):]?\s*/i, ''); // leading numbering
  title = title.replace(/\s*\([^)]*\)\s*$/, ''); // trailing "(Telegram@...)" etc.
  title = title.trim();
  return title || fileName;
}
