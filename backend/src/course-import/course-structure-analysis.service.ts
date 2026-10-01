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

/** A file the transaction below needs — only the fields actually used. */
interface UploadedFile {
  id: string;
  category: string;
  driveFileName: string;
  sectionFolderId: string | null;
  sectionFolderName: string | null;
}

/**
 * Deterministic file -> Learn/Apply/Reflect/Deepen lesson grouping — no AI
 * involved in this step (spec §11: "Use deterministic logic first"). Every
 * uploaded video becomes one lesson; a non-video file is attached to the
 * video that immediately precedes it within the same section, in Drive's
 * natural order (a PDF right after "01 Intro.mp4" is almost always that
 * lesson's handout).
 *
 * One module per Drive section folder (a course root's direct subfolders —
 * see GoogleDriveService#walkFolder and CourseImportFile#sectionFolderId).
 * A flat course with no subfolders — the only structure this was originally
 * tested against — still produces exactly one module, named after the
 * course itself; that behavior is unchanged. Files sitting loose in the
 * course root (no section folder) alongside real sections land in that same
 * course-named module rather than being dropped.
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
    const hasAnyVideo = uploaded.some((f) => f.category === 'video');
    if (!hasAnyVideo) {
      throw new BadRequestException(
        'No uploaded videos to build lessons from.',
      );
    }

    const sections = groupBySection(uploaded, courseImport.sourceDriveFolderName);

    await this.prisma.$transaction(async (tx) => {
      let moduleOrderIndex = 0;
      for (const section of sections) {
        if (section.videos.length === 0) continue; // e.g. a section folder with only handouts, no videos

        const courseModule = await tx.courseImportModule.create({
          data: {
            importId,
            title: section.title,
            orderIndex: moduleOrderIndex,
          },
        });
        moduleOrderIndex += 1;

        await tx.courseImportLesson.createMany({
          data: section.videos.map((video, index) => ({
            moduleId: courseModule.id,
            title: cleanLessonTitle(video.driveFileName),
            orderIndex: index,
            primaryFileId: video.id,
            resourceFileIds: section.resourcesByVideoId.get(video.id) ?? [],
          })),
        });
      }

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

interface SectionGroup<T> {
  title: string;
  videos: T[];
  resourcesByVideoId: Map<string, string[]>;
}

/** Groups uploaded files by their Drive section folder, preserving each
 *  section's first-appearance order (which is already correct — Drive's
 *  natural-sort walk visits a section's own files together before moving to
 *  the next section). Files with no section (sectionFolderId null — a flat
 *  course, or something loose in the course root) all fall into one group
 *  named after the course itself, matching the original single-module
 *  behavior when there are no real sections at all. */
function groupBySection<T extends UploadedFile>(
  files: T[],
  courseTitle: string,
): SectionGroup<T>[] {
  const order: (string | null)[] = [];
  const buckets = new Map<string | null, T[]>();
  for (const file of files) {
    // `sectionFolderId` is optional on DriveFile (undefined) and nullable on
    // the Prisma row (null) — normalize both to the same bucket key so a
    // root-level file always lands in the "course title" section.
    const key = file.sectionFolderId ?? null;
    if (!buckets.has(key)) {
      buckets.set(key, []);
      order.push(key);
    }
    buckets.get(key)!.push(file);
  }

  return order.map((key) => {
    const sectionFiles = buckets.get(key)!;
    const title =
      key === null ? courseTitle : sectionFiles[0].sectionFolderName!;

    // Attach each non-video to the nearest PRECEDING video within this
    // section only — a resource right after entering a new section must
    // never attach to the previous section's last video.
    const resourcesByVideoId = new Map<string, string[]>();
    const videos: T[] = [];
    let currentVideoId: string | null = null;
    for (const file of sectionFiles) {
      if (file.category === 'video') {
        currentVideoId = file.id;
        resourcesByVideoId.set(file.id, []);
        videos.push(file);
      } else if (currentVideoId) {
        resourcesByVideoId.get(currentVideoId)!.push(file.id);
      }
      // A resource with no preceding video in its own section is silently
      // dropped from lesson grouping today — same known gap as before,
      // just now scoped correctly per section instead of globally.
    }

    return { title, videos, resourcesByVideoId };
  });
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
