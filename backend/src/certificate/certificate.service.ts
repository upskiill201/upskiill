import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { randomBytes } from 'crypto';
import { PrismaService } from '../prisma/prisma.service';

/**
 * Course completion certificates.
 *
 * Works for every course, including ones published long before certificates
 * existed: there is no per-course setup and no backfill job. A certificate is
 * issued the first time an eligible learner asks for it (their certificate
 * list, the course-complete screen, or the course page), and eligibility is
 * read from what they really did — every published lesson in
 * Enrollment.completedLessons. Lessons skipped by a Jump ahead / placement
 * test (testedOutLessons) never count, by design.
 *
 * The numbers printed on the certificate are a snapshot taken at issue, so a
 * course that later gains lessons doesn't change a certificate already
 * earned. `code` is the public credential ID behind teyro.app/c/<code>.
 */

// No 0/O/1/I — credential IDs get read aloud and typed into the verify page.
const CODE_ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
const MAX_SKILLS = 4;

function newCode(): string {
  const bytes = randomBytes(8);
  let out = '';
  for (let i = 0; i < 8; i++)
    out += CODE_ALPHABET[bytes[i] % CODE_ALPHABET.length];
  return out;
}

function ids(raw: Prisma.JsonValue | null | undefined): Set<string> {
  return new Set(
    Array.isArray(raw)
      ? raw.filter((x): x is string => typeof x === 'string')
      : [],
  );
}

/** What's printed on a certificate. */
export interface CertificateData {
  learnerName: string;
  courseTitle: string;
  courseSlug: string;
  isOriginal: boolean;
  category: string | null;
  chapters: number;
  lessons: number;
  /** Minutes the learner actually spent in the course's lessons (falls back to the lessons' durations). */
  minutes: number;
  /** XP earned in this course (0 when the course predates per-course XP). */
  xp: number;
  /** The learner's best streak at issue. */
  bestStreak: number;
  skills: string[];
  signer: { name: string; title: string };
}

export interface CertificateView {
  code: string;
  courseId: string;
  issuedAt: string;
  completedAt: string;
  revoked: boolean;
  data: CertificateData;
}

export type CourseCertificateStatus =
  | { status: 'ISSUED'; certificate: CertificateView }
  | { status: 'IN_PROGRESS'; lessonsDone: number; lessonsTotal: number };

type Row = {
  code: string;
  courseId: string;
  data: Prisma.JsonValue;
  issuedAt: Date;
  completedAt: Date;
  revokedAt: Date | null;
};

function view(row: Row): CertificateView {
  return {
    code: row.code,
    courseId: row.courseId,
    issuedAt: row.issuedAt.toISOString(),
    completedAt: row.completedAt.toISOString(),
    revoked: Boolean(row.revokedAt),
    data: row.data as unknown as CertificateData,
  };
}

@Injectable()
export class CertificateService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * The learner's certificate for one course: the issued one, a freshly
   * issued one if they've just become eligible, or how far they have to go.
   */
  async forCourse(
    userId: string,
    courseId: string,
  ): Promise<CourseCertificateStatus> {
    const existing = await this.prisma.certificate.findUnique({
      where: { userId_courseId: { userId, courseId } },
    });
    if (existing) return { status: 'ISSUED', certificate: view(existing) };

    const progress = await this.progress(userId, courseId);
    if (!progress)
      throw new NotFoundException('You are not enrolled in this course.');
    if (progress.done < progress.total || progress.total === 0) {
      return {
        status: 'IN_PROGRESS',
        lessonsDone: progress.done,
        lessonsTotal: progress.total,
      };
    }
    return {
      status: 'ISSUED',
      certificate: await this.issue(userId, courseId),
    };
  }

  /**
   * Every certificate the learner holds — issuing any they've earned but never
   * opened (a course finished before certificates existed, or on another device).
   */
  async mine(userId: string): Promise<CertificateView[]> {
    const [held, enrollments] = await Promise.all([
      this.prisma.certificate.findMany({
        where: { userId },
        select: { courseId: true },
      }),
      this.prisma.enrollment.findMany({
        where: { userId },
        select: { courseId: true },
      }),
    ]);
    const have = new Set(held.map((c) => c.courseId));
    for (const { courseId } of enrollments) {
      if (have.has(courseId)) continue;
      const p = await this.progress(userId, courseId);
      if (p && p.total > 0 && p.done >= p.total)
        await this.issue(userId, courseId);
    }
    const rows = await this.prisma.certificate.findMany({
      where: { userId },
      orderBy: { completedAt: 'desc' },
    });
    return rows.map(view);
  }

  /** Public verification behind teyro.app/c/<code>. */
  async verify(rawCode: string): Promise<CertificateView> {
    const code = String(rawCode ?? '')
      .replace(/^TY-?/i, '')
      .replace(/-/g, '')
      .toUpperCase();
    if (!/^[A-Z0-9]{8}$/.test(code))
      throw new NotFoundException('No certificate has this ID.');
    const row = await this.prisma.certificate.findUnique({ where: { code } });
    if (!row) throw new NotFoundException('No certificate has this ID.');
    return view(row);
  }

  // ─── internals ─────────────────────────────────────────────────────────────

  /** Published lessons done vs total, or null when not enrolled. */
  private async progress(userId: string, courseId: string) {
    const enrollment = await this.prisma.enrollment.findUnique({
      where: { userId_courseId: { userId, courseId } },
      select: { completedLessons: true },
    });
    if (!enrollment) return null;
    const lessons = await this.prisma.lesson.findMany({
      where: { status: 'published', section: { courseId } },
      select: { id: true },
    });
    const done = ids(enrollment.completedLessons);
    return {
      done: lessons.filter((l) => done.has(l.id)).length,
      total: lessons.length,
    };
  }

  private async issue(
    userId: string,
    courseId: string,
  ): Promise<CertificateView> {
    const data = await this.snapshot(userId, courseId);
    const progress = await this.prisma.userCourseProgress.findUnique({
      where: { userId_courseId: { userId, courseId } },
      select: { completedAt: true },
    });
    // When they really finished — not when they first opened the certificate.
    const lastLesson = await this.prisma.userLessonProgress.findFirst({
      where: { userId, status: 'completed', lesson: { section: { courseId } } },
      orderBy: { completedAt: 'desc' },
      select: { completedAt: true },
    });
    const completedAt =
      progress?.completedAt ?? lastLesson?.completedAt ?? new Date();

    for (let attempt = 0; attempt < 4; attempt++) {
      try {
        const row = await this.prisma.certificate.create({
          data: {
            userId,
            courseId,
            code: newCode(),
            data: data as unknown as Prisma.InputJsonValue,
            completedAt,
          },
        });
        return view(row);
      } catch (e) {
        // Two tabs racing to issue the same certificate — return the winner.
        const again = await this.prisma.certificate.findUnique({
          where: { userId_courseId: { userId, courseId } },
        });
        if (again) return view(again);
        if (
          !(
            e instanceof Prisma.PrismaClientKnownRequestError &&
            e.code === 'P2002'
          )
        )
          throw e;
        // Otherwise the code collided (vanishingly rare) — try another.
      }
    }
    throw new Error('Could not allocate a certificate code');
  }

  private async snapshot(
    userId: string,
    courseId: string,
  ): Promise<CertificateData> {
    const [user, course, profile, sections, lessonTime, courseXp] =
      await Promise.all([
        this.prisma.user.findUnique({
          where: { id: userId },
          select: { fullName: true },
        }),
        this.prisma.course.findUnique({
          where: { id: courseId },
          select: {
            title: true,
            slug: true,
            isOriginal: true,
            category: true,
            outcomes: true,
            instructor: { select: { fullName: true } },
          },
        }),
        this.prisma.studentProfile.findUnique({
          where: { userId },
          select: { longestStreak: true, streakDays: true },
        }),
        this.prisma.section.findMany({
          where: { courseId },
          select: {
            lessons: {
              where: { status: 'published' },
              select: { id: true, durationMinutes: true },
            },
          },
        }),
        this.prisma.userLessonProgress.aggregate({
          where: { userId, lesson: { section: { courseId } } },
          _sum: { timeSpentSeconds: true },
        }),
        this.prisma.courseWeeklyXp.aggregate({
          where: { userId, courseId },
          _sum: { xpEarned: true },
        }),
      ]);
    if (!user || !course) throw new NotFoundException('Course not found.');

    const withLessons = sections.filter((s) => s.lessons.length > 0);
    const lessons = withLessons.flatMap((s) => s.lessons);
    const spentMinutes = Math.round(
      (lessonTime._sum.timeSpentSeconds ?? 0) / 60,
    );
    const plannedMinutes = lessons.reduce(
      (sum, l) => sum + (l.durationMinutes || 0),
      0,
    );
    const skills = (Array.isArray(course.outcomes) ? course.outcomes : [])
      .filter((o): o is string => typeof o === 'string' && o.trim().length > 0)
      .map((o) => o.trim().replace(/\.$/, ''))
      .filter((o) => o.length <= 60)
      .slice(0, MAX_SKILLS);

    return {
      learnerName: user.fullName.trim() || 'Teyro learner',
      courseTitle: course.title,
      courseSlug: course.slug,
      isOriginal: course.isOriginal,
      category:
        course.category && course.category !== 'Uncategorized'
          ? course.category
          : null,
      chapters: withLessons.length,
      lessons: lessons.length,
      minutes: spentMinutes > 0 ? spentMinutes : plannedMinutes,
      xp: courseXp._sum.xpEarned ?? 0,
      bestStreak: Math.max(
        profile?.longestStreak ?? 0,
        profile?.streakDays ?? 0,
      ),
      skills,
      signer: course.isOriginal
        ? { name: 'Teyro Originals', title: 'Course team, Teyro' }
        : { name: course.instructor.fullName, title: 'Course creator' },
    };
  }
}
