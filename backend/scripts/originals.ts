/**
 * Teyro Originals loader: course files (backend/originals/**) → database.
 *
 *   npm run originals                      check every Track (no database)
 *   npm run originals -- --track ai-at-work
 *   npm run originals -- --export          + write preview JSON for /dev/originals
 *   npm run originals -- --write           + upsert into the database (as drafts)
 *   npm run originals -- --write --publish + make the courses visible to learners
 *
 * Rules (CLAUDE.md §7): upsert only, never deletes, refuses NODE_ENV=production.
 * Rows that exist in the database but not in the files are REPORTED, never
 * removed. Every id comes from the file's stable keys (originals-content.ts),
 * so re-loading after an edit updates lessons in place and keeps progress.
 *
 * Deploys publish automatically: deploy-staging.yml and deploy-production.yml
 * run `npm run originals -- --write --publish` once the new backend is up, so
 * nobody loads courses by hand (founder, 2026-10-14).
 *
 * Writes need --write; the default run only checks. The local .env points at
 * the STAGING database, so --write changes staging.
 */
import './load-env';
import { mkdirSync, writeFileSync } from 'fs';
import { join } from 'path';
import { Prisma, PrismaClient } from '@prisma/client';
import { tracks } from '../originals';
import type { OriginalTrackDef } from '../src/originals/originals-authoring.types';
import { buildContentBlocks, keys, lessonXp, stableId } from '../src/originals/originals-content';
import { lintTrack, mainFormat, type LintIssue } from '../src/originals/originals-lint';
import { hasCode, verifyTrackCode } from '../src/originals/originals-code-verify';
import { ORIGINALS_PRICING, levelLabel } from '../src/originals/originals.policy';
import { TEYRO_ACCOUNT } from '../originals/teyro-account';

const args = process.argv.slice(2);
const flag = (name: string) => args.includes(`--${name}`);
const option = (name: string) => {
  const i = args.indexOf(`--${name}`);
  return i >= 0 ? args[i + 1] : undefined;
};

const WRITE = flag('write');
const PUBLISH = flag('publish');
const EXPORT = flag('export');
const ONLY = option('track');
const AUTHOR_EMAIL = process.env.ORIGINALS_AUTHOR_EMAIL ?? 'originals@teyro.app';

function report(track: OriginalTrackDef, codeIssues: LintIssue[] = []): boolean {
  const issues = [...lintTrack(track), ...codeIssues].sort((a, b) => (a.level === b.level ? 0 : a.level === 'error' ? -1 : 1));
  const errors = issues.filter((i) => i.level === 'error');
  const warnings = issues.filter((i) => i.level === 'warning');
  const lessons = track.levels.flatMap((l) => l.units.flatMap((u) => u.lessons));

  console.log(`\n■ ${track.title} (${track.slug})`);
  for (const level of track.levels) {
    const n = level.units.reduce((a, u) => a + u.lessons.length, 0);
    console.log(
      `  Level ${level.level} · ${levelLabel(level.level)}: ${level.units.length} unit(s) written, ` +
        `${level.upcomingUnits} coming soon, ${n} lesson(s)`,
    );
    for (const unit of level.units) {
      const formats = unit.lessons.filter((l) => !l.milestone).map(mainFormat);
      console.log(`    ${unit.key} ${unit.title}: ${unit.lessons.length} lessons · formats: ${Array.from(new Set(formats)).join(', ') || '-'}`);
    }
  }
  console.log(`  ${lessons.length} lesson(s), ${errors.length} error(s), ${warnings.length} warning(s)`);
  for (const i of errors) console.log(`  ✗ ${i.where}: ${i.message}`);
  for (const i of warnings) console.log(`  ! ${i.where}: ${i.message}`);
  return errors.length === 0;
}

/** Preview bundle for the frontend's /dev/originals route (git-ignored). */
function exportPreview(track: OriginalTrackDef) {
  const dir = join(__dirname, '..', '..', 'frontend', '.originals-preview');
  mkdirSync(dir, { recursive: true });
  for (const level of track.levels) {
    if (level.units.length === 0) continue;
    const bundle = {
      track: { slug: track.slug, title: track.title, category: track.category },
      course: {
        id: stableId(keys.course(track, level)),
        slug: level.slug,
        title: level.title,
        level: level.level,
        upcomingUnits: level.upcomingUnits,
      },
      units: level.units.map((unit) => ({
        key: unit.key,
        title: unit.title,
        marker: unit.marker ?? null,
        story: unit.story ?? null,
        lessons: unit.lessons.map((lesson) => {
          const key = keys.lesson(track, level, unit, lesson);
          return {
            id: stableId(key),
            title: lesson.title,
            shortDescription: lesson.summary,
            milestone: lesson.milestone ?? null,
            durationMinutes: lesson.minutes,
            xpReward: lessonXp(lesson),
            contentBlocks: buildContentBlocks(lesson, key, track.runner),
          };
        }),
      })),
    };
    const file = join(dir, `${level.slug}.json`);
    writeFileSync(file, JSON.stringify(bundle, null, 2));
    console.log(`  → preview: frontend/.originals-preview/${level.slug}.json`);
  }
}

async function authorId(prisma: PrismaClient): Promise<string> {
  // A system author: Originals show "Made by Teyro". The password is not a
  // bcrypt hash, so nobody can ever sign in as it. Its public details live in
  // originals/teyro-account.ts and are re-applied on every load.
  const a = TEYRO_ACCOUNT;
  const user = await prisma.user.upsert({
    where: { email: AUTHOR_EMAIL },
    update: { fullName: a.fullName, avatarUrl: a.avatarUrl },
    create: {
      email: AUTHOR_EMAIL,
      fullName: a.fullName,
      avatarUrl: a.avatarUrl,
      password: '!originals-system-account',
      role: 'INSTRUCTOR',
      isVerified: true,
      hasCreatorAccess: true,
    },
    select: { id: true },
  });

  const profile = {
    creatorStatus: a.creatorStatus,
    headline: a.headline,
    tagline: a.tagline,
    bio: a.bio,
    about: a.about,
    avatarUrl: a.avatarUrl,
    location: a.location,
    languages: [...a.languages],
    primaryExpertise: a.primaryExpertise,
    skills: a.skills.map((s) => ({ ...s })),
    teachingLevels: [...a.teachingLevels],
    contentFormats: [...a.contentFormats],
    website: a.website,
    profileVisibility: 'PUBLIC',
    allowCollaboration: false,
  };
  // The username is only set when it's free, so a load never fails over it.
  const taken = await prisma.profile.findFirst({ where: { username: a.username, NOT: { userId: user.id } }, select: { id: true } });
  if (taken) console.log(`  ! username "${a.username}" belongs to another account; the Teyro profile keeps its current one`);
  const username = taken ? {} : { username: a.username };
  await prisma.profile.upsert({
    where: { userId: user.id },
    update: { ...profile, ...username },
    create: { userId: user.id, ...profile, ...username },
  });

  const instructor = {
    displayName: a.fullName,
    professionalHeadline: a.headline,
    bio: a.bio,
    avatarUrl: a.avatarUrl,
    websiteUrl: a.website,
    verificationStatus: 'VERIFIED' as const,
    profileVisibility: 'PUBLIC' as const,
    expertise: a.skills.map((s) => s.name),
    onboardingCompleted: true,
  };
  await prisma.instructorProfile.upsert({
    where: { userId: user.id },
    update: instructor,
    create: { userId: user.id, ...instructor },
  });
  return user.id;
}

async function write(prisma: PrismaClient, track: OriginalTrackDef, instructorId: string) {
  const trackRow = await prisma.originalTrack.upsert({
    where: { slug: track.slug },
    update: { title: track.title, category: track.category, description: track.description },
    create: { id: stableId(keys.track(track)), slug: track.slug, title: track.title, category: track.category, description: track.description },
    select: { id: true },
  });

  for (const level of track.levels) {
    if (level.units.length === 0) {
      console.log(`  - ${level.slug}: no units written yet, skipped`);
      continue;
    }
    const courseId = stableId(keys.course(track, level));
    const lessonCount = level.units.reduce((a, u) => a + u.lessons.length, 0);
    const minutes = level.units.reduce((a, u) => a + u.lessons.reduce((b, l) => b + l.minutes, 0), 0);
    const courseData = {
      title: level.title,
      subtitle: level.subtitle ?? null,
      description: level.description,
      shortDescription: level.shortDescription,
      thumbnailUrl: level.thumbnailUrl ?? null,
      // Sold only through the Originals subscription; the ladder ignores this
      // (pricing-engine isOriginal), but a non-zero price keeps every
      // "is this course paid?" check honest.
      price: ORIGINALS_PRICING.yearly,
      category: track.category,
      level: levelLabel(level.level),
      duration: `${Math.max(1, Math.round(minutes / 60))}h`,
      startingPoint: level.startingPoint,
      endOutcome: level.endOutcome,
      outcomes: level.outcomes,
      skills: level.skills,
      isOriginal: true,
      trackId: trackRow.id,
      trackLevel: level.level,
      upcomingUnits: level.upcomingUnits,
      // Reviewed in the repo (playbook checklist), not in the creator queue.
      reviewStatus: 'APPROVED' as const,
    };

    const existing = await prisma.course.findUnique({ where: { id: courseId }, select: { id: true, published: true } });
    if (existing) {
      await prisma.course.update({
        where: { id: courseId },
        data: { ...courseData, ...(PUBLISH ? { published: true } : {}) },
      });
    } else {
      await prisma.course.create({
        data: { id: courseId, slug: level.slug, instructorId, published: PUBLISH, ...courseData },
      });
    }

    let lessonsWritten = 0;
    for (const [u, unit] of level.units.entries()) {
      const sectionId = stableId(keys.unit(track, level, unit));
      await prisma.section.upsert({
        where: { id: sectionId },
        update: { title: unit.title, goal: unit.goal, description: unit.story ?? null, marker: unit.marker ?? null, orderIndex: u },
        create: { id: sectionId, courseId, title: unit.title, goal: unit.goal, description: unit.story ?? null, marker: unit.marker ?? null, orderIndex: u },
      });

      for (const [i, lesson] of unit.lessons.entries()) {
        const key = keys.lesson(track, level, unit, lesson);
        const id = stableId(key);
        const contentBlocks = buildContentBlocks(lesson, key, track.runner) as unknown as Prisma.InputJsonObject;
        const data = {
          title: lesson.title,
          shortDescription: lesson.summary,
          lessonType: 'interactive',
          orderIndex: i,
          milestone: lesson.milestone ?? null,
          durationMinutes: lesson.minutes,
          estimatedDurationSeconds: lesson.minutes * 60,
          xpReward: lessonXp(lesson),
          contentBlocks,
          stepCompletion: { learn: true, apply: true, reflect: true, deepen: true },
          status: 'published',
        };
        const row = await prisma.lesson.findUnique({ where: { id }, select: { id: true, publishedAt: true } });
        if (row) {
          await prisma.lesson.update({
            where: { id },
            data: { ...data, sectionId, version: { increment: 1 }, publishedAt: row.publishedAt ?? new Date() },
          });
        } else {
          await prisma.lesson.create({ data: { id, sectionId, ...data, publishedAt: new Date() } });
        }
        lessonsWritten += 1;
      }
    }

    // Report, never delete: rows the files no longer describe.
    const fileSections = new Set(level.units.map((u) => stableId(keys.unit(track, level, u))));
    const fileLessons = new Set(level.units.flatMap((u) => u.lessons.map((l) => stableId(keys.lesson(track, level, u, l)))));
    const dbSections = await prisma.section.findMany({
      where: { courseId },
      select: { id: true, title: true, lessons: { select: { id: true, title: true } } },
    });
    const strays = dbSections.flatMap((s) => [
      ...(fileSections.has(s.id) ? [] : [`unit "${s.title}"`]),
      ...s.lessons.filter((l) => !fileLessons.has(l.id)).map((l) => `lesson "${l.title}"`),
    ]);

    console.log(
      `  ✓ ${level.slug}: ${lessonsWritten}/${lessonCount} lesson(s) written · ` +
        `${existing?.published || PUBLISH ? 'PUBLISHED' : 'draft (admins only)'}`,
    );
    if (strays.length) console.log(`  ! In the database but not in the files (left as they are): ${strays.join(', ')}`);
  }
}

async function main() {
  if (process.env.NODE_ENV === 'production') {
    throw new Error('Refusing to load Originals with NODE_ENV=production (CLAUDE.md §7).');
  }
  if (PUBLISH && !WRITE) throw new Error('--publish only works together with --write.');

  const selected = ONLY ? tracks.filter((t) => t.slug === ONLY) : tracks;
  if (selected.length === 0) throw new Error(ONLY ? `No Track "${ONLY}".` : 'No Tracks registered in originals/index.ts.');

  let ok = true;
  for (const track of selected) {
    // Every Try it live card and Write and run solution, run in real Python (or type-checked TypeScript).
    if (hasCode(track)) console.log(`
(running the ${track.runner === 'typescript' ? 'TypeScript' : track.runner === 'html' ? 'HTML pages' : track.runner === 'react-native' ? 'React Native screens' : 'Python'} in ${track.slug}...)`);
    ok = report(track, await verifyTrackCode(track)) && ok;
  }
  if (EXPORT) selected.forEach(exportPreview);

  if (!WRITE) {
    console.log(`\n${ok ? 'All checks passed.' : 'Fix the errors above.'} (No database changes: add --write to load.)`);
    if (!ok) process.exitCode = 1;
    return;
  }
  if (!ok) {
    process.exitCode = 1;
    console.log('\nNot writing: fix the errors above first.');
    return;
  }

  const writable = selected.filter((t) => !t.devOnly);
  for (const t of selected.filter((t) => t.devOnly)) console.log(`  (skipping ${t.slug}: a /dev/originals sample, never loaded)`);
  if (writable.length === 0) return;

  const prisma = new PrismaClient();
  try {
    const instructorId = await authorId(prisma);
    for (const track of writable) await write(prisma, track, instructorId);
    console.log('\nDone.');
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});
