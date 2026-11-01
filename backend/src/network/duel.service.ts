import { BadRequestException, ConflictException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { TeyNotifyService } from '../tey/notify/tey-notify.service';
import { BuddyService, firstName } from './buddy.service';
import { DUEL_QUESTIONS, DUEL_TTL_HOURS, DUELS_OPEN_MAX, INBOX } from './network.constants';
import { questionsFromBlocks } from './review.service';

type Answers = Record<string, string>;

const OPEN = ['CHALLENGER_TURN', 'OPPONENT_TURN'];

/** Pure, for tests: right answers out of the questions in play. */
export function scoreAnswers(questions: { qid: string; correctOptionId: string }[], answers: Answers): number {
  return questions.reduce((n, q) => n + (answers[q.qid] === q.correctOptionId ? 1 : 0), 0);
}

/**
 * Duels (docs/TEYRO_NETWORK_PLAN.md phase 4): a buddy challenges you on a
 * lesson you've BOTH passed — up to five of its questions, same questions for
 * both. Answers are scored here; the browser never sees which option is right
 * until it has answered. No XP and no Coins: the prize is knowing it better
 * than your friend.
 *
 * Both players must have completed the lesson, so a duel can't show anyone
 * lesson content they haven't unlocked.
 */
@Injectable()
export class DuelService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly hub: TeyNotifyService,
    private readonly buddies: BuddyService,
  ) {}

  /** Lessons you and this buddy have both passed that have questions to duel on. */
  async options(userId: string, buddyId: string) {
    await this.assertBuddies(userId, buddyId);
    const rows = await this.prisma.$queryRaw<{ lessonId: string; title: string; courseTitle: string; contentBlocks: unknown }[]>(Prisma.sql`
      SELECT l.id AS "lessonId", l.title, c.title AS "courseTitle", l."contentBlocks"
      FROM user_lesson_progress a
      JOIN user_lesson_progress b ON b."lessonId" = a."lessonId" AND b."userId" = ${buddyId} AND b.status = 'completed'
      JOIN course_lessons l ON l.id = a."lessonId"
      JOIN course_sections s ON s.id = l."sectionId"
      JOIN "Course" c ON c.id = s."courseId"
      WHERE a."userId" = ${userId} AND a.status = 'completed'
      ORDER BY GREATEST(a."completedAt", b."completedAt") DESC NULLS LAST
      LIMIT 30`);
    return {
      lessons: rows
        .map((r) => ({ lessonId: r.lessonId, title: r.title, courseTitle: r.courseTitle, questions: questionsFromBlocks(r.contentBlocks).length }))
        .filter((r) => r.questions >= 2)
        .slice(0, 12),
    };
  }

  async create(userId: string, buddyId: string, lessonId: string) {
    await this.assertBuddies(userId, buddyId);
    const [mine, theirs, lesson, open] = await Promise.all([
      this.prisma.userLessonProgress.findUnique({ where: { userId_lessonId: { userId, lessonId } }, select: { status: true } }),
      this.prisma.userLessonProgress.findUnique({ where: { userId_lessonId: { userId: buddyId, lessonId } }, select: { status: true } }),
      this.prisma.lesson.findUnique({ where: { id: lessonId }, select: { contentBlocks: true, section: { select: { courseId: true } } } }),
      this.prisma.duel.count({ where: { OR: [{ challengerId: userId }, { opponentId: userId }], status: { in: OPEN } } }),
    ]);
    if (mine?.status !== 'completed' || theirs?.status !== 'completed') {
      throw new BadRequestException('Duels are on lessons you have both finished.');
    }
    if (!lesson) throw new NotFoundException('That lesson is gone.');
    if (open >= DUELS_OPEN_MAX) throw new ConflictException('Finish one of your open duels first.');
    const qs = questionsFromBlocks(lesson.contentBlocks);
    if (qs.length < 2) throw new BadRequestException('That lesson has too few questions for a duel.');

    const picked = [...qs].sort(() => Math.random() - 0.5).slice(0, DUEL_QUESTIONS).map((q) => q.qid);
    const duel = await this.prisma.duel.create({
      data: {
        challengerId: userId,
        opponentId: buddyId,
        lessonId,
        courseId: lesson.section.courseId,
        questionIds: picked,
        expiresAt: new Date(Date.now() + DUEL_TTL_HOURS * 3_600_000),
      },
      select: { id: true },
    });
    return { id: duel.id };
  }

  /**
   * The duel as this player may see it: questions without answers while it's
   * their turn; their result (and the other's, once both played) after.
   */
  async get(userId: string, duelId: string) {
    const duel = await this.load(userId, duelId);
    const qs = await this.questions(duel.lessonId, duel.questionIds as string[]);
    const meChallenger = duel.challengerId === userId;
    const myAnswers = (meChallenger ? duel.challengerAnswers : duel.opponentAnswers) as Answers | null;
    const theirAnswers = (meChallenger ? duel.opponentAnswers : duel.challengerAnswers) as Answers | null;
    const myTurn = (duel.status === 'CHALLENGER_TURN' && meChallenger) || (duel.status === 'OPPONENT_TURN' && !meChallenger);
    const otherId = meChallenger ? duel.opponentId : duel.challengerId;
    const [other, lesson] = await Promise.all([
      this.prisma.user.findUnique({ where: { id: otherId }, select: { id: true, fullName: true, avatarUrl: true } }),
      this.prisma.lesson.findUnique({ where: { id: duel.lessonId }, select: { title: true } }),
    ]);

    return {
      id: duel.id,
      status: duel.status,
      myTurn,
      lessonTitle: lesson?.title ?? 'a lesson',
      opponent: { id: otherId, name: other?.fullName ?? 'Your buddy', avatar: other?.avatarUrl ?? null },
      expiresAt: duel.expiresAt,
      myScore: meChallenger ? duel.challengerScore : duel.opponentScore,
      theirScore: duel.status === 'DONE' ? (meChallenger ? duel.opponentScore : duel.challengerScore) : null,
      total: qs.length,
      questions: qs.map((q) => ({
        id: q.qid,
        prompt: q.prompt,
        message: q.message,
        code: q.code,
        options: q.options.map((o) => ({ id: o.id, text: o.text })),
        // Revealed only once this player has answered.
        ...(myAnswers
          ? {
              mine: myAnswers[q.qid] ?? null,
              correct: q.correctOptionId,
              theirs: duel.status === 'DONE' ? (theirAnswers?.[q.qid] ?? null) : undefined,
              explanation: q.explanation,
            }
          : {}),
      })),
    };
  }

  async submit(userId: string, duelId: string, answers: Answers) {
    const duel = await this.load(userId, duelId);
    const meChallenger = duel.challengerId === userId;
    const myTurn = (duel.status === 'CHALLENGER_TURN' && meChallenger) || (duel.status === 'OPPONENT_TURN' && !meChallenger);
    if (!myTurn) throw new ConflictException(duel.status === 'DONE' ? 'This duel is over.' : "It isn't your turn.");

    const qs = await this.questions(duel.lessonId, duel.questionIds as string[]);
    const clean: Answers = {};
    for (const q of qs) if (typeof answers[q.qid] === 'string') clean[q.qid] = answers[q.qid];
    const score = scoreAnswers(qs, clean);
    const now = new Date();

    // Conditional on status, so a double submit can't play twice.
    const moved = await this.prisma.duel.updateMany({
      where: { id: duel.id, status: duel.status },
      data: meChallenger
        ? { challengerAnswers: clean, challengerScore: score, status: 'OPPONENT_TURN' }
        : { opponentAnswers: clean, opponentScore: score, status: 'DONE', finishedAt: now },
    });
    if (moved.count === 0) throw new ConflictException('This duel already moved on.');

    const lesson = await this.prisma.lesson.findUnique({ where: { id: duel.lessonId }, select: { title: true } });
    const me = await this.prisma.user.findUnique({ where: { id: userId }, select: { fullName: true } });
    const name = firstName(me?.fullName);
    if (meChallenger) {
      await this.hub.notify({
        userId: duel.opponentId,
        kind: 'DUEL_RECEIVED',
        actorId: userId,
        title: `${name} challenged you on ${lesson?.title ?? 'a lesson'}`,
        body: `They got ${score} of ${qs.length}. Can you beat it?`,
        url: `/dashboard/network/duel/${duel.id}`,
        dedupeKey: `duel-received:${duel.id}`,
        tag: `network-duel-${duel.id}`,
        inbox: { type: INBOX.DUEL_RECEIVED, entityType: 'DUEL', entityId: duel.id },
      });
    } else {
      const theirs = duel.challengerScore ?? 0;
      const verdict = score > theirs ? `${name} beat you` : score < theirs ? `You beat ${name}` : `You and ${name} tied`;
      await this.hub.notify({
        userId: duel.challengerId,
        kind: 'DUEL_RESULT',
        actorId: userId,
        title: `${verdict}, ${theirs}–${score}`,
        body: `On ${lesson?.title ?? 'your duel'}. See which questions tripped you up.`,
        url: `/dashboard/network/duel/${duel.id}`,
        dedupeKey: `duel-result:${duel.id}`,
        tag: `network-duel-${duel.id}`,
        inbox: { type: INBOX.DUEL_RESULT, entityType: 'DUEL', entityId: duel.id },
      });
    }
    return this.get(userId, duel.id);
  }

  /** Your turn, their turn, and the last week's results. */
  async list(userId: string) {
    await this.expireOld(userId);
    const rows = await this.prisma.$queryRaw<
      {
        id: string;
        status: string;
        challengerId: string;
        challengerScore: number | null;
        opponentScore: number | null;
        lessonTitle: string;
        otherName: string | null;
        otherId: string;
        createdAt: Date;
      }[]
    >(Prisma.sql`
      SELECT d.id, d.status, d."challengerId", d."challengerScore", d."opponentScore", d."createdAt",
             l.title AS "lessonTitle",
             o.id AS "otherId", o."fullName" AS "otherName"
      FROM duels d
      JOIN course_lessons l ON l.id = d."lessonId"
      JOIN "User" o ON o.id = CASE WHEN d."challengerId" = ${userId} THEN d."opponentId" ELSE d."challengerId" END
      WHERE (d."challengerId" = ${userId} OR d."opponentId" = ${userId})
        AND (d.status IN ('CHALLENGER_TURN', 'OPPONENT_TURN')
             OR d."finishedAt" >= ${new Date(Date.now() - 7 * 86_400_000)})
      ORDER BY d."createdAt" DESC
      LIMIT 20`);
    return {
      duels: rows.map((r) => {
        const meChallenger = r.challengerId === userId;
        return {
          id: r.id,
          status: r.status,
          myTurn: (r.status === 'CHALLENGER_TURN' && meChallenger) || (r.status === 'OPPONENT_TURN' && !meChallenger),
          lessonTitle: r.lessonTitle,
          other: { id: r.otherId, name: r.otherName ?? 'Your buddy' },
          myScore: meChallenger ? r.challengerScore : r.opponentScore,
          theirScore: r.status === 'DONE' ? (meChallenger ? r.opponentScore : r.challengerScore) : null,
        };
      }),
    };
  }

  private async expireOld(userId: string) {
    await this.prisma.duel.updateMany({
      where: { OR: [{ challengerId: userId }, { opponentId: userId }], status: { in: OPEN }, expiresAt: { lt: new Date() } },
      data: { status: 'EXPIRED' },
    });
  }

  private async load(userId: string, duelId: string) {
    const duel = await this.prisma.duel.findUnique({ where: { id: duelId } });
    if (!duel) throw new NotFoundException('That duel is gone.');
    if (duel.challengerId !== userId && duel.opponentId !== userId) throw new ForbiddenException('This duel is between two other people.');
    if (OPEN.includes(duel.status) && duel.expiresAt < new Date()) {
      await this.prisma.duel.update({ where: { id: duel.id }, data: { status: 'EXPIRED' } });
      return { ...duel, status: 'EXPIRED' };
    }
    return duel;
  }

  /** The questions in play, in the duel's order, read fresh from the lesson. */
  private async questions(lessonId: string, ids: string[]) {
    const lesson = await this.prisma.lesson.findUnique({ where: { id: lessonId }, select: { contentBlocks: true } });
    const byId = new Map(questionsFromBlocks(lesson?.contentBlocks).map((q) => [q.qid, q]));
    return ids.map((id) => byId.get(id)).filter((q): q is NonNullable<typeof q> => !!q);
  }

  private async assertBuddies(userId: string, buddyId: string) {
    if (userId === buddyId) throw new BadRequestException("You can't duel yourself.");
    const ids = await this.buddies.buddyIdsOf(userId);
    if (!ids.includes(buddyId)) throw new BadRequestException('Duels are between study buddies.');
  }
}
