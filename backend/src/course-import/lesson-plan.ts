/**
 * Which import lessons a media file becomes: one lesson, or — for a video or
 * audio over 15 minutes — "Part 1 of N" lessons that each play a clip of it
 * (see lesson-parts.ts).
 *
 * Planned twice on purpose. Structure analysis plans from Drive's reported
 * length; when transcription finishes it plans again with the real length
 * and Whisper's segments, so boundaries land on pauses and a video Drive had
 * no length for still gets split. The re-plan only touches lessons that
 * haven't started generating — content already written is never moved.
 */

import { Prisma } from '@prisma/client';
import {
  asSegments,
  partTitle,
  planParts,
  type LessonPart,
} from './lesson-parts';

/** "Intro to React (Part 2 of 3)" -> "Intro to React". */
export function baseLessonTitle(title: string): string {
  return title.replace(/\s*\(Part \d+ of \d+\)\s*$/, '');
}

export interface MediaFileForPlan {
  id: string;
  durationMs: bigint | number | null;
  transcriptSegments?: Prisma.JsonValue | null;
}

export function partsForFile(file: MediaFileForPlan): LessonPart[] {
  const durationSec =
    file.durationMs !== null && file.durationMs !== undefined
      ? Number(file.durationMs) / 1000
      : null;
  return planParts(durationSec, asSegments(file.transcriptSegments));
}

/** Lesson rows for one media file, starting at `orderIndex`. Resources ride
 *  on the first lesson only, so a split video doesn't repeat its handouts. */
export function lessonRowsForFile(
  file: MediaFileForPlan,
  base: {
    moduleId: string;
    title: string;
    orderIndex: number;
    resourceFileIds: string[];
  },
): Prisma.CourseImportLessonCreateManyInput[] {
  const parts = partsForFile(file);
  if (parts.length === 0) {
    return [
      {
        moduleId: base.moduleId,
        title: base.title,
        orderIndex: base.orderIndex,
        primaryFileId: file.id,
        resourceFileIds: base.resourceFileIds,
      },
    ];
  }
  return parts.map((part, i) => ({
    moduleId: base.moduleId,
    title: partTitle(base.title, part),
    orderIndex: base.orderIndex + i,
    primaryFileId: file.id,
    resourceFileIds: i === 0 ? base.resourceFileIds : [],
    clipStartSec: part.startSec,
    clipEndSec: part.endSec,
    partIndex: part.index,
    partCount: part.count,
  }));
}

/**
 * Re-plans one file's lessons after transcription. Returns how many lessons
 * the file now has, or null when nothing was (or could safely be) changed.
 */
export async function replanFileLessons(
  tx: Prisma.TransactionClient,
  file: MediaFileForPlan,
): Promise<number | null> {
  const lessons = await tx.courseImportLesson.findMany({
    where: { primaryFileId: file.id },
    orderBy: { orderIndex: 'asc' },
  });
  if (lessons.length === 0) return null; // not analyzed yet — analysis plans
  if (lessons.some((l) => l.status !== 'PENDING' || l.createdLessonId)) {
    return null;
  }

  const first = lessons[0];
  const parts = partsForFile(file);
  const wanted = Math.max(parts.length, 1);

  if (wanted === lessons.length) {
    // Same shape: just move the boundaries (or confirm a whole-file lesson).
    for (const [i, lesson] of lessons.entries()) {
      const part = parts[i];
      await tx.courseImportLesson.update({
        where: { id: lesson.id },
        data: part
          ? {
              clipStartSec: part.startSec,
              clipEndSec: part.endSec,
              partIndex: part.index,
              partCount: part.count,
            }
          : {
              clipStartSec: null,
              clipEndSec: null,
              partIndex: null,
              partCount: null,
            },
      });
    }
    return wanted;
  }

  // Different count: replace this file's rows and make room in the module.
  const resourceFileIds = lessons.flatMap(
    (l) => (l.resourceFileIds as string[] | null) ?? [],
  );
  await tx.courseImportLesson.deleteMany({
    where: { id: { in: lessons.map((l) => l.id) } },
  });
  await tx.courseImportLesson.updateMany({
    where: {
      moduleId: first.moduleId,
      orderIndex: { gt: lessons[lessons.length - 1].orderIndex },
    },
    data: { orderIndex: { increment: wanted - lessons.length } },
  });
  await tx.courseImportLesson.createMany({
    data: lessonRowsForFile(file, {
      moduleId: first.moduleId,
      title: baseLessonTitle(first.title),
      orderIndex: first.orderIndex,
      resourceFileIds,
    }),
  });
  return wanted;
}
