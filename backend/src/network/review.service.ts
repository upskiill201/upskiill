import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { REVIEW_MAX_DAYS, REVIEW_MIN_DAYS, REVIEWS_PER_FEED } from './network.constants';

const DAY_MS = 86_400_000;

export interface ReviewCard {
  id: string;
  lessonId: string;
  lessonTitle: string;
  courseId: string;
  daysAgo: number;
  prompt: string;
  /** Chat-reply questions show the message being replied to. */
  message: string | null;
  /** Predict-the-output questions show the code. */
  code: string | null;
  options: { id: string; text: string; why: string | null }[];
  correctOptionId: string;
  explanation: string | null;
}

type Question = Omit<ReviewCard, 'id' | 'lessonId' | 'lessonTitle' | 'courseId' | 'daysAgo'> & { qid: string };

const str = (v: unknown) => (typeof v === 'string' && v.trim() ? v.trim() : null);

/**
 * Multiple-choice questions out of a lesson's Apply phase, in either shape:
 * v2 `exercises` items (kind 'mcq') or the older `mcqActivity` block.
 */
export function questionsFromBlocks(contentBlocks: unknown): Question[] {
  const apply = (contentBlocks as { apply?: unknown } | null)?.apply;
  if (!Array.isArray(apply)) return [];
  const out: Question[] = [];
  const push = (q: any, prompt: string | null) => {
    const options = Array.isArray(q?.options)
      ? q.options
          .filter((o: any) => str(o?.id) && str(o?.text))
          .map((o: any) => ({ id: String(o.id), text: String(o.text), why: str(o.misconception) }))
      : [];
    if (!prompt || options.length < 2 || !options.some((o: { id: string }) => o.id === q?.correctOptionId)) return;
    out.push({
      qid: String(q.id ?? out.length),
      prompt,
      message: str(q.message),
      code: q.variant === 'predictOutput' ? str(q.code) : null,
      options,
      correctOptionId: String(q.correctOptionId),
      explanation: str(q.explanation),
    });
  };
  for (const block of apply as any[]) {
    if (block?.type === 'exercises' && Array.isArray(block.value?.items)) {
      for (const e of block.value.items) if (e?.kind === 'mcq') push(e, str(e.prompt));
    } else if (block?.type === 'mcqActivity' && Array.isArray(block.value?.questions)) {
      for (const q of block.value.questions) push(q, str(q.questionText) ?? str(q.prompt));
    }
  }
  return out;
}

/** Stable per learner per day, so a refresh doesn't reshuffle the questions. */
function hash(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619);
  return h >>> 0;
}

/**
 * Review cards for the feed: a question from a lesson you finished a while
 * ago, answered right there. Recalling something beats re-reading it, and
 * spacing makes it stick — so lessons "due" around 1, 3, 7, 14 and 30 days
 * after you finished them come first. No XP, no Coins: it's practice.
 *
 * One query: the learner's recently finished lessons with their content.
 */
@Injectable()
export class ReviewService {
  constructor(private readonly prisma: PrismaService) {}

  async due(userId: string, now = new Date(), count = REVIEWS_PER_FEED): Promise<ReviewCard[]> {
    const rows = await this.prisma.$queryRaw<
      { lessonId: string; title: string; courseId: string; completedAt: Date; contentBlocks: unknown }[]
    >(Prisma.sql`
      SELECT p."lessonId", l.title, s."courseId", p."completedAt", l."contentBlocks"
      FROM user_lesson_progress p
      JOIN course_lessons l ON l.id = p."lessonId"
      JOIN course_sections s ON s.id = l."sectionId"
      WHERE p."userId" = ${userId} AND p.status = 'completed'
        AND p."completedAt" BETWEEN ${new Date(now.getTime() - REVIEW_MAX_DAYS * DAY_MS)}
                                AND ${new Date(now.getTime() - REVIEW_MIN_DAYS * DAY_MS)}
      ORDER BY p."completedAt" DESC
      LIMIT 40`);

    const day = now.toISOString().slice(0, 10);
    const DUE = [1, 3, 7, 14, 30];
    const ranked = rows
      .map((r) => {
        const daysAgo = Math.round((now.getTime() - r.completedAt.getTime()) / DAY_MS);
        const nearest = Math.min(...DUE.map((d) => Math.abs(d - daysAgo)));
        return { r, daysAgo, score: nearest + (hash(`${userId}:${day}:${r.lessonId}`) % 100) / 1000 };
      })
      .sort((a, b) => a.score - b.score);

    const cards: ReviewCard[] = [];
    for (const { r, daysAgo } of ranked) {
      if (cards.length >= count) break;
      const qs = questionsFromBlocks(r.contentBlocks);
      if (qs.length === 0) continue;
      const q = qs[hash(`${userId}:${day}:${r.lessonId}:q`) % qs.length];
      const { qid, ...rest } = q;
      cards.push({ id: `${r.lessonId}:${qid}`, lessonId: r.lessonId, lessonTitle: r.title, courseId: r.courseId, daysAgo, ...rest });
    }
    return cards;
  }
}
