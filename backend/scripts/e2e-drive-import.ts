/**
 * End-to-end driver for a course import. Boots the real Nest application
 * context and calls the same services the HTTP controllers call, so this
 * exercises the production code path rather than a reimplementation of it.
 *
 * Usage:
 *   npx ts-node -T scripts/e2e-drive-import.ts new <driveFolderId> <userId>
 *   npx ts-node -T scripts/e2e-drive-import.ts <importId> status
 *   npx ts-node -T scripts/e2e-drive-import.ts <importId> analyze
 *   npx ts-node -T scripts/e2e-drive-import.ts <importId> pause
 *   npx ts-node -T scripts/e2e-drive-import.ts <importId> resume
 *   npx ts-node -T scripts/e2e-drive-import.ts <importId> create-course "<title>" "<category>"
 */
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { CourseImportService } from '../src/course-import/course-import.service';
import { CourseStructureAnalysisService } from '../src/course-import/course-structure-analysis.service';
import { CourseImportPublishService } from '../src/course-import/course-import-publish.service';
import { PrismaService } from '../src/prisma/prisma.service';

async function main() {
  const [a, b, c, d] = process.argv.slice(2);

  const app = await NestFactory.createApplicationContext(AppModule, {
    logger: ['error', 'warn'],
  });

  try {
    const prisma = app.get(PrismaService);

    if (a === 'new') {
      const summary = await app
        .get(CourseImportService)
        .createImport(c, b);
      console.log('IMPORT CREATED', summary.id);
      console.log(
        JSON.stringify(
          {
            id: summary.id,
            folder: summary.sourceDriveFolderName,
            status: summary.status,
            files: summary.files.map((f) => ({
              name: f.driveFileName.trim(),
              category: f.category,
              status: f.status,
            })),
          },
          null,
          2,
        ),
      );
      return;
    }

    const importId = a;
    const command = b;
    const found = await prisma.courseImport.findUnique({
      where: { id: importId },
      select: { createdById: true, status: true },
    });
    if (!found) throw new Error(`Import ${importId} not found.`);
    const user = { id: found.createdById, role: 'ADMIN' };

    switch (command) {
      case 'status': {
        const s = await app.get(CourseImportService).getImport(user.id, importId);
        console.log(
          JSON.stringify(
            {
              status: s.status,
              pausePending: s.pausePending,
              pausedAt: s.pausedAt,
              counts: s.counts,
              createdCourseId: s.createdCourseId,
              files: s.files.map((f) => ({
                name: f.driveFileName.trim(),
                status: f.status,
                transcript: f.transcriptStatus,
              })),
              modules: s.modules.map((m) => ({
                title: m.title,
                lessons: m.lessons.map((l) => ({ title: l.title, status: l.status })),
              })),
            },
            null,
            2,
          ),
        );
        break;
      }
      case 'pause': {
        const s = await app.get(CourseImportService).pauseImport(user.id, importId);
        console.log('PAUSED:', s.status, '| pausePending =', s.pausePending);
        break;
      }
      case 'resume': {
        const s = await app.get(CourseImportService).resumeImport(user.id, importId);
        console.log('RESUMED:', s.status);
        break;
      }
      case 'analyze': {
        const result = await app
          .get(CourseStructureAnalysisService)
          .analyze(user.id, importId);
        console.log('ANALYZE OK');
        console.log(
          JSON.stringify(
            result.modules.map((m) => ({
              title: m.title,
              lessons: m.lessons.map((l) => l.title),
            })),
            null,
            2,
          ),
        );
        break;
      }
      case 'create-course': {
        const result = await app
          .get(CourseImportPublishService)
          .createCourse(user, importId, {
            title: c ?? 'Imported Course',
            category: d ?? 'Video Editing',
          });
        console.log(
          result.appended ? 'APPENDED TO COURSE' : 'CREATED COURSE',
          result.courseId,
        );
        console.log(JSON.stringify(result.result, null, 2));
        break;
      }
      default:
        throw new Error(`Unknown command: ${command}`);
    }
  } finally {
    await app.close();
  }
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('FAILED:', err?.message ?? err);
    process.exit(1);
  });
