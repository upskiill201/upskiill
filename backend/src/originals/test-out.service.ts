import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  JUMP_PASS_MARK,
  JUMP_QUESTIONS,
  JUMP_MIN_QUESTIONS,
  PLACEMENT_PER_UNIT,
  hasPlacementTest,
} from './originals.policy';

/**
 * Jump ahead and placement (Teyro Originals).
 *
 *   Jump ahead   any locked chapter shows "Jump here". The test is built from
 *                the Checkpoint and Unit Challenge exercises of every chapter
 *                before it. Pass (80%) and those chapters' lessons are marked
 *                tested out.
  *   Placement    courses in PLACEMENT_TRACKS (Python, ML, AI Stack, HTML & CSS) offer "I know some
 *                Python". The learner answers a few questions per chapter, in
 *                order, until they miss; they start at that chapter.
 *
 * Tested-out lessons are stored apart from completedLessons
 * (Enrollment.testedOutLessons): they unlock the map but never earn XP,
 * Coins, chests or streaks, and never count towards completion. The learner
 * can still open any of them to review.
 *
 * Grading happens in the browser, like every lesson (Write and run code runs
 * there); the server checks the claim is shaped right and the pass mark.
 * Nothing here pays out, so a false claim only skips the claimant's own
 * lessons.
 */

type RawExercise = Record<string, unknown> & { id?: unknown; kind?: unknown };

interface UnitLessons {
  id: string;
  title: string;
  lessons: { id: string; milestone: string | null; contentBlocks: unknown }[];
}

export interface TestExercise extends RawExercise {
  id: string;
}

export interface JumpTest {
  mode: 'jump';
  targetSectionId: string;
  targetTitle: string;
  /** The chapters the test covers, in order. */
  covers: { sectionId: string; title: string }[];
  passMark: number;
  exercises: TestExercise[];
}

export interface PlacementTest {
  mode: 'placement';
  /** One entry per chapter, in order. The client walks them until the learner misses. */
  units: { sectionId: string; title: string; exercises: TestExercise[] }[];
  /** Correct answers out of PLACEMENT_PER_UNIT needed to move on to the next chapter. */
  passPerUnit: number;
  /** The last chapter: where a learner who passes every tested chapter starts. */
  finalSectionId: string;
}

/** The Apply exercises stored in a lesson's contentBlocks (originals-content.ts). */
export function exercisesOf(contentBlocks: unknown): RawExercise[] {
  let blocks: any = contentBlocks;
  if (typeof blocks === 'string') {
    try {
      blocks = JSON.parse(blocks);
    } catch {
      return [];
    }
  }
  const apply = Array.isArray(blocks?.apply) ? blocks.apply : [];
  const block = apply.find((b: any) => b?.type === 'exercises');
  const items = block?.value?.items;
  return Array.isArray(items)
    ? items.filter(
        (e: unknown): e is RawExercise =>
          !!e &&
          typeof e === 'object' &&
          typeof (e as RawExercise).kind === 'string',
      )
    : [];
}

function shuffle<T>(items: T[], rand: () => number): T[] {
  const out = items.slice();
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

/**
 * A unit's test questions: Unit Challenge first, then Checkpoints, then (only
 * if a unit has no milestones) its ordinary lessons. Ids are prefixed with the
 * lesson id so two lessons' "ex-1" never collide.
 */
export function unitPool(unit: UnitLessons): TestExercise[] {
  const rank = (m: string | null) =>
    m === 'UNIT_CHALLENGE' ? 0 : m === 'CHECKPOINT' ? 1 : 2;
  const milestones = unit.lessons.filter((l) => l.milestone);
  const source = milestones.length ? milestones : unit.lessons;
  return source
    .slice()
    .sort((a, b) => rank(a.milestone) - rank(b.milestone))
    .flatMap((l) =>
      exercisesOf(l.contentBlocks).map((e, i) => ({
        ...e,
        id: `${l.id}:${String(e.id ?? i)}`,
      })),
    );
}

/**
 * How many questions each covered unit gets: spread evenly, extra to the
 * most recent units (closest to where the learner wants to jump).
 */
export function allocate(units: number, total: number): number[] {
  if (units <= 0) return [];
  const base = Math.floor(total / units);
  const out = new Array<number>(units).fill(Math.max(1, base));
  let left = total - out.reduce((a, b) => a + b, 0);
  for (let i = units - 1; left > 0; i = (i - 1 + units) % units, left--)
    out[i] += 1;
  return out;
}

@Injectable()
export class TestOutService {
  constructor(private readonly prisma: PrismaService) {}

  private async loadCourse(idOrSlug: string) {
    const course = await this.prisma.course.findFirst({
      where: { OR: [{ id: idOrSlug }, { slug: idOrSlug }] },
      select: {
        id: true,
        published: true,
        isOriginal: true,
        track: { select: { slug: true } },
        sections: {
          orderBy: { orderIndex: 'asc' },
          select: {
            id: true,
            title: true,
            lessons: {
              where: { status: 'published' },
              orderBy: { orderIndex: 'asc' },
              select: { id: true, milestone: true, contentBlocks: true },
            },
          },
        },
      },
    });
    if (!course || !course.published)
      throw new NotFoundException('Course not found');
    if (!course.isOriginal)
      throw new BadRequestException(
        'Jump ahead is only available on Teyro Originals.',
      );
    const units: UnitLessons[] = course.sections.filter(
      (s) => s.lessons.length > 0,
    );
    return { course, units };
  }

  private async passedSet(userId: string, courseId: string) {
    const enrollment = await this.prisma.enrollment.findUnique({
      where: { userId_courseId: { userId, courseId } },
      select: { id: true, completedLessons: true, testedOutLessons: true },
    });
    const ids = (v: unknown) =>
      Array.isArray(v)
        ? v.filter((x): x is string => typeof x === 'string')
        : [];
    const completed = ids(enrollment?.completedLessons);
    const testedOut = ids(enrollment?.testedOutLessons);
    return {
      enrollment,
      completed,
      testedOut,
      passed: new Set([...completed, ...testedOut]),
    };
  }

  /** Index of the unit holding the learner's first unpassed lesson (units.length when all passed). */
  private currentUnitIndex(units: UnitLessons[], passed: Set<string>) {
    const i = units.findIndex((u) => u.lessons.some((l) => !passed.has(l.id)));
    return i === -1 ? units.length : i;
  }

  async jumpTest(
    userId: string,
    idOrSlug: string,
    sectionId: string,
    rand: () => number = Math.random,
  ): Promise<JumpTest> {
    const { course, units } = await this.loadCourse(idOrSlug);
    const target = units.findIndex((u) => u.id === sectionId);
    if (target === -1) throw new NotFoundException('Chapter not found');
    const { passed } = await this.passedSet(userId, course.id);
    if (target <= this.currentUnitIndex(units, passed)) {
      throw new ConflictException('That chapter is already open.');
    }

    const covered = units.slice(0, target);
    const counts = allocate(covered.length, JUMP_QUESTIONS);
    const exercises = covered.flatMap((u, i) =>
      shuffle(unitPool(u), rand).slice(0, counts[i]),
    );
    if (exercises.length < JUMP_MIN_QUESTIONS) {
      throw new ConflictException(
        'Not enough questions to test this chapter yet.',
      );
    }
    return {
      mode: 'jump',
      targetSectionId: units[target].id,
      targetTitle: units[target].title,
      covers: covered.map((u) => ({ sectionId: u.id, title: u.title })),
      passMark: JUMP_PASS_MARK,
      exercises,
    };
  }

  async placementTest(
    idOrSlug: string,
    rand: () => number = Math.random,
  ): Promise<PlacementTest> {
    const { course, units } = await this.loadCourse(idOrSlug);
    if (!hasPlacementTest(course.track?.slug)) {
      throw new BadRequestException('This course has no placement test.');
    }
    return {
      mode: 'placement',
      // The last chapter is where a learner who passes everything lands, so it isn't tested.
      units: units.slice(0, -1).map((u) => ({
        sectionId: u.id,
        title: u.title,
        exercises: shuffle(unitPool(u), rand).slice(0, PLACEMENT_PER_UNIT),
      })),
      passPerUnit: PLACEMENT_PER_UNIT - 1,
      finalSectionId: units[units.length - 1]?.id ?? '',
    };
  }

  /**
   * Record a passed Jump ahead test or a placement result: every lesson in the
   * chapters before the target becomes tested out (unless already completed).
   */
  async submit(
    userId: string,
    idOrSlug: string,
    body: {
      mode: 'jump' | 'placement';
      targetSectionId: string;
      correct: number;
      total: number;
    },
  ) {
    const { course, units } = await this.loadCourse(idOrSlug);
    const target = units.findIndex((u) => u.id === body.targetSectionId);
    if (target === -1) throw new NotFoundException('Chapter not found');
    if (body.correct > body.total)
      throw new BadRequestException('More right answers than questions.');

    if (body.mode === 'jump') {
      if (
        body.total < JUMP_MIN_QUESTIONS ||
        body.correct / body.total < JUMP_PASS_MARK
      ) {
        return {
          passed: false,
          testedOut: 0,
          targetSectionId: units[target].id,
        };
      }
    } else if (!hasPlacementTest(course.track?.slug)) {
      throw new BadRequestException('This course has no placement test.');
    }

    const { enrollment, completed, testedOut } = await this.passedSet(
      userId,
      course.id,
    );
    if (!enrollment) throw new ConflictException('Enrol in the course first.');

    const done = new Set(completed);
    const skip = units
      .slice(0, target)
      .flatMap((u) => u.lessons.map((l) => l.id))
      .filter((id) => !done.has(id));
    const next = Array.from(new Set([...testedOut, ...skip]));
    await this.prisma.enrollment.update({
      where: { id: enrollment.id },
      data: { testedOutLessons: next, placedAt: new Date() },
    });
    return {
      passed: true,
      testedOut: next.length - testedOut.length,
      targetSectionId: units[target].id,
      firstLessonId: units[target].lessons[0]?.id ?? null,
    };
  }
}
