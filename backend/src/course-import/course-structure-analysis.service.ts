import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CourseImportSummary } from './course-import.types';
import {
  WITH_FILES_AND_MODULES,
  toCourseImportSummary,
} from './course-import-summary.util';
import { extractableKind } from './document-text';
import { lessonRowsForFile } from './lesson-plan';
import { cleanDriveFileName } from '../google-drive/google-drive.types';

/** A file the planning below needs — only the fields actually used. */
export interface UploadedFile {
  id: string;
  category: string;
  driveFileName: string;
  mimeType: string;
  storageKey: string | null;
  sectionFolderId: string | null;
  sectionFolderName: string | null;
  durationMs: bigint | number | null;
  transcriptSegments?: Prisma.JsonValue | null;
}

/** Media a lesson is built around: transcribed, then played as its card. */
const MEDIA = new Set(['video', 'audio']);
/** Names that mark a document as a handout for a lesson, never a lesson of
 *  its own ("Exercise files.pdf", "Starter code.zip", "Slides - Intro"). */
const HANDOUT_NAME =
  /\b(resources?|starter|solutions?|exercises?|slides?|cheat ?sheets?|handouts?|projects?|assets?|worksheets?|templates?|downloads?|source ?code|transcripts?)\b/i;

export interface PlannedLesson {
  primary: UploadedFile;
  /** 'media' = video/audio lesson; 'reading' = built from a document. */
  kind: 'media' | 'reading';
  resourceFileIds: string[];
}

export interface PlannedSection {
  title: string;
  lessons: PlannedLesson[];
}

/**
 * Deterministic file -> lesson grouping — no AI involved in this step (spec
 * §11: "Use deterministic logic first"):
 *
 * - Every uploaded video or audio file becomes a lesson (a long one becomes
 *   several "Part N" lessons when the rows are written).
 * - Every other file is a resource of the media lesson right before it in
 *   its section, in Drive's natural order (a PDF right after "01 Intro.mp4"
 *   is almost always that lesson's handout). Files before a section's first
 *   video belong to its first lesson. Images become Learn image cards,
 *   everything else a Deepen download.
 * - A section with no video or audio at all is a reading section: each
 *   readable document (PDF, DOCX, TXT, Google Doc) that isn't named like a
 *   handout becomes a reading lesson, built from its text.
 * - A section left with only handouts gives them to the previous section's
 *   last lesson (or the next section's first), instead of dropping them.
 *
 * One module per Drive section folder (a course root's direct subfolders);
 * a flat course with no subfolders is one module named after the course.
 */
export function planCourseStructure(
  files: UploadedFile[],
  courseTitle: string,
): PlannedSection[] {
  const sections = groupBySection(files, courseTitle).map(
    ({ title, files: sectionFiles }) => ({
      title,
      ...planSection(sectionFiles),
    }),
  );

  // Handouts from sections that produced no lesson go to the nearest one.
  for (const [i, section] of sections.entries()) {
    if (section.lessons.length > 0 || section.loose.length === 0) continue;
    const before = sections
      .slice(0, i)
      .reverse()
      .find((s) => s.lessons.length > 0);
    const after = sections.slice(i + 1).find((s) => s.lessons.length > 0);
    const target = before
      ? before.lessons[before.lessons.length - 1]
      : after?.lessons[0];
    target?.resourceFileIds.push(...section.loose.map((f) => f.id));
  }

  return sections
    .filter((s) => s.lessons.length > 0)
    .map(({ title, lessons }) => ({ title, lessons }));
}

function planSection(files: UploadedFile[]): {
  lessons: PlannedLesson[];
  /** Files with no lesson to attach to in this section. */
  loose: UploadedFile[];
} {
  const hasMedia = files.some((f) => MEDIA.has(f.category));
  const isLessonSource = (f: UploadedFile) =>
    hasMedia
      ? MEDIA.has(f.category)
      : f.category === 'document' &&
        !HANDOUT_NAME.test(cleanDriveFileName(f.driveFileName)) &&
        extractableKind(f.storageKey, f.mimeType) !== null;

  const lessons: PlannedLesson[] = [];
  const beforeFirst: string[] = [];
  for (const file of files) {
    if (isLessonSource(file)) {
      lessons.push({
        primary: file,
        kind: hasMedia ? 'media' : 'reading',
        // A reading lesson offers its own document as a download too.
        resourceFileIds: hasMedia ? [] : [file.id],
      });
    } else if (lessons.length > 0) {
      lessons[lessons.length - 1].resourceFileIds.push(file.id);
    } else {
      beforeFirst.push(file.id);
    }
  }

  if (lessons.length === 0) {
    return { lessons, loose: files };
  }
  lessons[0].resourceFileIds.unshift(...beforeFirst);
  return { lessons, loose: [] };
}

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
    const sections = planCourseStructure(
      uploaded,
      courseImport.sourceDriveFolderName,
    );
    if (sections.length === 0) {
      throw new BadRequestException(
        'No uploaded videos, audio or readable documents to build lessons from.',
      );
    }

    await this.prisma.$transaction(async (tx) => {
      for (const [moduleOrderIndex, section] of sections.entries()) {
        const courseModule = await tx.courseImportModule.create({
          data: {
            importId,
            title: section.title,
            orderIndex: moduleOrderIndex,
          },
        });

        const rows: Prisma.CourseImportLessonCreateManyInput[] = [];
        for (const lesson of section.lessons) {
          rows.push(
            ...lessonRowsForFile(lesson.primary, {
              moduleId: courseModule.id,
              title: cleanLessonTitle(lesson.primary.driveFileName),
              orderIndex: rows.length,
              resourceFileIds: lesson.resourceFileIds,
            }),
          );
        }
        await tx.courseImportLesson.createMany({ data: rows });
      }

      // Reading lessons wait on their document's text, extracted by the
      // same claim queue that transcribes videos.
      const readingFileIds = sections.flatMap((s) =>
        s.lessons.filter((l) => l.kind === 'reading').map((l) => l.primary.id),
      );
      if (readingFileIds.length > 0) {
        await tx.courseImportFile.updateMany({
          where: {
            id: { in: readingFileIds },
            transcriptStatus: 'NOT_APPLICABLE',
          },
          data: { transcriptStatus: 'PENDING' },
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
  files: T[];
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
    return {
      title: key === null ? courseTitle : sectionFiles[0].sectionFolderName!,
      files: sectionFiles,
    };
  });
}

/** "Copy of 01. Introduction (Telegram@TechZoneX).mp4" -> "Introduction" */
export function cleanLessonTitle(rawFileName: string): string {
  // "Copy of …" and anything stuck on after the extension go first.
  const fileName = cleanDriveFileName(rawFileName);
  // A real extension only: a Google Doc has none, and "v1.2" isn't one.
  let title = fileName.trim().replace(/\.[a-z][a-z0-9]{0,4}$/i, '');
  title = title.replace(/^copy of\s+/i, ''); // Drive's "make a copy" prefix
  title = title.replace(/^(lesson\s*)?\d+\s*[.\-):]?\s*/i, ''); // leading numbering
  title = title.replace(/\s*\([^)]*\)\s*$/, ''); // trailing "(Telegram@...)" etc.
  title = title.trim();
  return title || fileName;
}
