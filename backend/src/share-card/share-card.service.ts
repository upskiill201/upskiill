import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { randomBytes } from 'crypto';
import { PrismaService } from '../prisma/prisma.service';
import { ReferralService } from '../referral/referral.service';
import { BADGE_REGISTRY } from '../gamification/achievements.service';
import {
  lessonMilestoneAtOrBelow,
  streakMilestoneAtOrBelow,
} from './share-card.milestones';

/**
 * Shareable milestone cards (Duolingo-style "I hit a 7-day streak" images).
 *
 *   1. The learner taps Share on a milestone → create() checks the milestone
 *      against the database and stores a snapshot of the numbers. The image
 *      (frontend /s/<slug>/image) renders ONLY that snapshot, so a card can
 *      never show a streak or rank the learner didn't earn.
 *   2. The public page /s/<slug> carries the learner's invite code, so a
 *      friend who signs up from it is a referral (paid by ReferralService
 *      when the friend finishes a lesson — the real incentive).
 *   3. markShared() pays a small one-time Coins thank-you per card, capped per
 *      day. We can't verify a post really went out, so the amount stays small
 *      and the cap stops it being farmed.
 */

export const SHARE_KINDS = [
  'STREAK',
  'LESSONS',
  'COURSE_STARTED',
  'CHAPTER_COMPLETE',
  'COURSE_COMPLETE',
  'LEAGUE',
  'ACHIEVEMENT',
] as const;
export type ShareKind = (typeof SHARE_KINDS)[number];

/** Coins paid the first time a card is shared. */
export const SHARE_REWARD_COINS = 10;
/** Rewarded shares per UTC day. Later shares still work, they just don't pay. */
export const SHARE_DAILY_REWARD_CAP = 2;

export interface CreateShareCardInput {
  kind: ShareKind;
  courseId?: string;
  sectionId?: string;
  weekStart?: string;
  badgeId?: string;
  tier?: number;
}

// Unambiguous characters only — links get read aloud and typed.
const SLUG_ALPHABET = 'abcdefghjkmnpqrstuvwxyz23456789';
function newSlug(): string {
  const bytes = randomBytes(10);
  let out = '';
  for (let i = 0; i < 10; i++)
    out += SLUG_ALPHABET[bytes[i] % SLUG_ALPHABET.length];
  return out;
}

function utcDayStart(now = new Date()): Date {
  return new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()),
  );
}

function completedIds(raw: Prisma.JsonValue | null | undefined): Set<string> {
  return new Set(
    Array.isArray(raw)
      ? raw.filter((x): x is string => typeof x === 'string')
      : [],
  );
}

type Snapshot = { milestoneKey: string; data: Record<string, unknown> };

@Injectable()
export class ShareCardService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly referrals: ReferralService,
  ) {}

  /** Verify the milestone, snapshot it, and return its (stable) public link. */
  async create(userId: string, input: CreateShareCardInput) {
    const snap = await this.snapshot(userId, input);
    const existing = await this.prisma.shareCard.findUnique({
      where: {
        userId_milestoneKey: { userId, milestoneKey: snap.milestoneKey },
      },
    });
    if (existing) return this.view(existing);

    for (let attempt = 0; attempt < 4; attempt++) {
      try {
        const row = await this.prisma.shareCard.create({
          data: {
            userId,
            slug: newSlug(),
            kind: input.kind,
            milestoneKey: snap.milestoneKey,
            data: snap.data as Prisma.InputJsonValue,
          },
        });
        return this.view(row);
      } catch (e) {
        // A double tap raced us to the same milestone — return the winner.
        const again = await this.prisma.shareCard.findUnique({
          where: {
            userId_milestoneKey: { userId, milestoneKey: snap.milestoneKey },
          },
        });
        if (again) return this.view(again);
        if (
          !(
            e instanceof Prisma.PrismaClientKnownRequestError &&
            e.code === 'P2002'
          )
        )
          throw e;
        // Otherwise the slug collided (vanishingly rare) — try another.
      }
    }
    throw new Error('Could not allocate a share link');
  }

  /** The public view behind teyro.app/s/<slug> and its image. */
  async getPublic(slug: string) {
    if (!/^[a-z0-9]{6,16}$/.test(slug)) throw new NotFoundException();
    const card = await this.prisma.shareCard.findUnique({
      where: { slug },
      include: { user: { select: { fullName: true } } },
    });
    if (!card) throw new NotFoundException();
    const refCode = await this.referrals.codeFor(card.userId).catch(() => null);
    return {
      slug: card.slug,
      kind: card.kind,
      data: card.data,
      name: card.user.fullName,
      createdAt: card.createdAt.toISOString(),
      refCode,
    };
  }

  /**
   * The learner shared (or downloaded) the card. Pays the one-time thank-you
   * when this card hasn't been paid yet and today's cap has room.
   */
  async markShared(userId: string, slug: string) {
    const card = await this.prisma.shareCard.findUnique({ where: { slug } });
    if (!card) throw new NotFoundException();
    if (card.userId !== userId) throw new ForbiddenException();

    await this.prisma.shareCard.update({
      where: { id: card.id },
      data: {
        shareCount: { increment: 1 },
        ...(card.sharedAt ? {} : { sharedAt: new Date() }),
      },
    });
    if (card.rewardedAt)
      return {
        rewarded: false as const,
        reason: 'ALREADY_REWARDED' as const,
        coins: 0,
      };

    const paidToday = await this.prisma.rewardTransaction.count({
      where: {
        userId,
        sourceType: 'SHARE_CARD',
        createdAt: { gte: utcDayStart() },
      },
    });
    if (paidToday >= SHARE_DAILY_REWARD_CAP) {
      return {
        rewarded: false as const,
        reason: 'DAILY_CAP' as const,
        coins: 0,
      };
    }

    const balance = await this.prisma.$transaction(async (tx) => {
      // Compare-and-set: two shares landing together can't both pay.
      const flipped = await tx.shareCard.updateMany({
        where: { id: card.id, rewardedAt: null },
        data: { rewardedAt: new Date() },
      });
      if (flipped.count === 0) return null;
      const profile = await tx.studentProfile.upsert({
        where: { userId },
        create: { userId, coins: SHARE_REWARD_COINS },
        update: { coins: { increment: SHARE_REWARD_COINS } },
        select: { coins: true },
      });
      await tx.rewardTransaction.create({
        data: {
          userId,
          currency: 'COINS',
          amount: SHARE_REWARD_COINS,
          sourceType: 'SHARE_CARD',
          sourceId: card.id,
          idempotencyKey: `share_card:${card.id}`,
        },
      });
      return profile.coins;
    });
    if (balance === null)
      return {
        rewarded: false as const,
        reason: 'ALREADY_REWARDED' as const,
        coins: 0,
      };
    return { rewarded: true as const, coins: SHARE_REWARD_COINS, balance };
  }

  private view(card: {
    slug: string;
    kind: string;
    data: Prisma.JsonValue;
    rewardedAt: Date | null;
  }) {
    return {
      slug: card.slug,
      kind: card.kind,
      data: card.data,
      rewardAvailable: !card.rewardedAt,
      rewardCoins: SHARE_REWARD_COINS,
    };
  }

  // ─── Snapshots: every number is read from the database here ────────────────

  private async snapshot(
    userId: string,
    input: CreateShareCardInput,
  ): Promise<Snapshot> {
    switch (input.kind) {
      case 'STREAK':
        return this.streakSnapshot(userId);
      case 'LESSONS':
        return this.lessonsSnapshot(
          userId,
          this.need(input.courseId, 'courseId'),
        );
      case 'COURSE_STARTED':
        return this.courseStartedSnapshot(
          userId,
          this.need(input.courseId, 'courseId'),
        );
      case 'CHAPTER_COMPLETE':
        return this.chapterSnapshot(
          userId,
          this.need(input.sectionId, 'sectionId'),
        );
      case 'COURSE_COMPLETE':
        return this.courseCompleteSnapshot(
          userId,
          this.need(input.courseId, 'courseId'),
        );
      case 'LEAGUE':
        return this.leagueSnapshot(userId, input.weekStart);
      case 'ACHIEVEMENT':
        return this.achievementSnapshot(
          userId,
          this.need(input.badgeId, 'badgeId'),
          input.tier ?? 1,
        );
      default:
        throw new BadRequestException('Unknown milestone.');
    }
  }

  private need(value: string | undefined, name: string): string {
    if (!value)
      throw new BadRequestException(`${name} is required for this milestone.`);
    return value;
  }

  private notYet(): never {
    throw new BadRequestException("You haven't reached this milestone yet.");
  }

  private async streakSnapshot(userId: string): Promise<Snapshot> {
    const profile = await this.prisma.studentProfile.findUnique({
      where: { userId },
      select: { streakDays: true, longestStreak: true, xp: true },
    });
    const days = streakMilestoneAtOrBelow(profile?.streakDays ?? 0);
    if (!days || !profile) this.notYet();
    const lessons = await this.prisma.userLessonProgress.count({
      where: { userId, status: 'completed' },
    });
    return {
      milestoneKey: `STREAK:${days}`,
      data: {
        days,
        xp: profile.xp,
        lessons,
        longest: Math.max(profile.longestStreak, profile.streakDays),
      },
    };
  }

  private async enrollmentWithCourse(userId: string, courseId: string) {
    const enrollment = await this.prisma.enrollment.findUnique({
      where: { userId_courseId: { userId, courseId } },
      select: {
        completedLessons: true,
        createdAt: true,
        course: {
          select: {
            id: true,
            title: true,
            thumbnailUrl: true,
            category: true,
            isOriginal: true,
          },
        },
      },
    });
    if (!enrollment)
      throw new NotFoundException('You are not enrolled in this course.');
    return enrollment;
  }

  private async lessonsSnapshot(
    userId: string,
    courseId: string,
  ): Promise<Snapshot> {
    const enrollment = await this.enrollmentWithCourse(userId, courseId);
    const count = lessonMilestoneAtOrBelow(
      completedIds(enrollment.completedLessons).size,
    );
    if (!count) this.notYet();
    const profile = await this.prisma.studentProfile.findUnique({
      where: { userId },
      select: { xp: true, coins: true, streakDays: true },
    });
    return {
      milestoneKey: `LESSONS:${courseId}:${count}`,
      data: {
        count,
        courseTitle: enrollment.course.title,
        xp: profile?.xp ?? 0,
        coins: profile?.coins ?? 0,
        streakDays: profile?.streakDays ?? 0,
      },
    };
  }

  private async courseStartedSnapshot(
    userId: string,
    courseId: string,
  ): Promise<Snapshot> {
    const { course } = await this.enrollmentWithCourse(userId, courseId);
    return {
      milestoneKey: `COURSE_STARTED:${courseId}`,
      data: {
        courseTitle: course.title,
        thumbnailUrl: course.thumbnailUrl,
        category: course.category,
        isOriginal: course.isOriginal,
      },
    };
  }

  /** Published lessons per section, in course order (empty sections dropped). */
  private async courseSections(courseId: string) {
    const sections = await this.prisma.section.findMany({
      where: { courseId },
      orderBy: [{ orderIndex: 'asc' }, { createdAt: 'asc' }],
      select: {
        id: true,
        title: true,
        lessons: {
          where: { status: 'published' },
          select: { id: true, durationMinutes: true },
        },
      },
    });
    return sections.filter((s) => s.lessons.length > 0);
  }

  private async chapterSnapshot(
    userId: string,
    sectionId: string,
  ): Promise<Snapshot> {
    const section = await this.prisma.section.findUnique({
      where: { id: sectionId },
      select: { courseId: true },
    });
    if (!section) throw new NotFoundException('Chapter not found.');
    const enrollment = await this.enrollmentWithCourse(
      userId,
      section.courseId,
    );
    const done = completedIds(enrollment.completedLessons);
    const sections = await this.courseSections(section.courseId);
    const index = sections.findIndex((s) => s.id === sectionId);
    if (index === -1) throw new NotFoundException('Chapter not found.');
    if (!sections[index].lessons.every((l) => done.has(l.id))) this.notYet();

    const chaptersDone = sections.filter((s) =>
      s.lessons.every((l) => done.has(l.id)),
    ).length;
    return {
      milestoneKey: `CHAPTER:${sectionId}`,
      data: {
        courseTitle: enrollment.course.title,
        sectionTitle: sections[index].title,
        chapterNumber: index + 1,
        chaptersDone,
        chaptersTotal: sections.length,
        percent: Math.round((chaptersDone / sections.length) * 100),
      },
    };
  }

  private async courseCompleteSnapshot(
    userId: string,
    courseId: string,
  ): Promise<Snapshot> {
    const enrollment = await this.enrollmentWithCourse(userId, courseId);
    const done = completedIds(enrollment.completedLessons);
    const lessons = (await this.courseSections(courseId)).flatMap(
      (s) => s.lessons,
    );
    if (lessons.length === 0 || !lessons.every((l) => done.has(l.id)))
      this.notYet();

    const [profile, progress] = await Promise.all([
      this.prisma.studentProfile.findUnique({
        where: { userId },
        select: { xp: true },
      }),
      this.prisma.userCourseProgress.findUnique({
        where: { userId_courseId: { userId, courseId } },
        select: { completedAt: true },
      }),
    ]);
    return {
      milestoneKey: `COURSE_COMPLETE:${courseId}`,
      data: {
        courseTitle: enrollment.course.title,
        lessons: lessons.length,
        minutes: lessons.reduce((sum, l) => sum + (l.durationMinutes || 0), 0),
        xp: profile?.xp ?? 0,
        completedAt: (progress?.completedAt ?? new Date()).toISOString(),
      },
    };
  }

  private async leagueSnapshot(
    userId: string,
    weekStart?: string,
  ): Promise<Snapshot> {
    const member = await this.prisma.leagueMember.findFirst({
      where: {
        userId,
        rank: { not: null },
        ...(weekStart ? { weekStart } : { outcome: { not: null } }),
      },
      orderBy: { weekStart: 'desc' },
      select: {
        weekStart: true,
        league: true,
        rank: true,
        weeklyXp: true,
        outcome: true,
        cohortId: true,
      },
    });
    if (!member || member.rank === null) this.notYet();
    const podium = member.rank <= 3;
    const moved =
      member.outcome === 'PROMOTED' || member.outcome === 'CHAMPION';
    if (!podium && !moved) this.notYet();
    const cohortSize = member.cohortId
      ? await this.prisma.leagueMember.count({
          where: { cohortId: member.cohortId },
        })
      : null;
    return {
      milestoneKey: `LEAGUE:${member.weekStart}`,
      data: {
        league: member.league,
        rank: member.rank,
        weeklyXp: member.weeklyXp,
        outcome: member.outcome,
        cohortSize,
        weekStart: member.weekStart,
      },
    };
  }

  private async achievementSnapshot(
    userId: string,
    badgeId: string,
    tier: number,
  ): Promise<Snapshot> {
    const badge = BADGE_REGISTRY.find((b) => b.id === badgeId);
    const tierDef = badge?.tiers.find((t) => t.level === tier);
    if (!badge || !tierDef)
      throw new NotFoundException('Achievement not found.');
    const owned = await this.prisma.userAchievement.findUnique({
      where: {
        userId_achievementId_tier: { userId, achievementId: badgeId, tier },
      },
      select: { unlockedAt: true },
    });
    if (!owned) this.notYet();
    return {
      milestoneKey: `ACHIEVEMENT:${badgeId}:${tier}`,
      data: {
        badgeId,
        title: badge.title,
        tierName: tierDef.name,
        tier,
        maxTier: badge.tiers.length,
        description: tierDef.description,
        badgeBg: badge.badgeBg,
      },
    };
  }
}
