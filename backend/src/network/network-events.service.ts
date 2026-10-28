import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import type { ActivityMeta } from './network-feed.service';
import {
  ATTRIBUTION_ENROL_HOURS,
  ATTRIBUTION_LESSON_HOURS,
  CLIENT_EVENT_KINDS,
  type ClientEventKind,
  type ServerEventKind,
} from './network.constants';

export interface ClientEvent {
  kind: ClientEventKind;
  activityId: string;
  position?: number;
}

/**
 * The network's event log (`network_events`) — what the ranking learns from
 * and what "started because of you" is attributed from.
 *
 * Trust boundary: the browser may only report what it alone can see
 * (IMPRESSION, CTA, PROFILE_OPEN), and only as card ids. Author and course
 * are always read from the card on the server, never taken from the client.
 * Outcomes that matter (a cheer, a lesson, an enrolment) are written here by
 * the server, from domain events — a client can't claim it inspired anyone.
 */
@Injectable()
export class NetworkEventsService {
  private readonly logger = new Logger(NetworkEventsService.name);

  constructor(private readonly prisma: PrismaService) {}

  async recordClient(userId: string, events: ClientEvent[]) {
    const clean = events.filter((e) => CLIENT_EVENT_KINDS.has(e.kind)).slice(0, 50);
    if (clean.length === 0) return { recorded: 0 };
    const cards = await this.prisma.activityFeed.findMany({
      where: { id: { in: [...new Set(clean.map((e) => e.activityId))] } },
      select: { id: true, userId: true, metadata: true },
    });
    const byId = new Map(cards.map((c) => [c.id, c]));
    const data = clean.flatMap((e) => {
      const card = byId.get(e.activityId);
      if (!card || card.userId === userId) return [];
      return [
        {
          userId,
          kind: e.kind,
          activityId: card.id,
          authorId: card.userId,
          courseId: (card.metadata as ActivityMeta | null)?.courseId ?? null,
          position: Number.isInteger(e.position) && e.position! >= 0 && e.position! < 100 ? e.position! : null,
        },
      ];
    });
    if (data.length) await this.prisma.networkEvent.createMany({ data });
    return { recorded: data.length };
  }

  /** Server-side outcomes. Never throws — telemetry must not fail an action. */
  async log(input: {
    userId: string;
    kind: ServerEventKind;
    activityId?: string | null;
    authorId?: string | null;
    courseId?: string | null;
  }) {
    try {
      await this.prisma.networkEvent.create({ data: input });
    } catch (err) {
      this.logger.warn(`network event ${input.kind} failed: ${(err as Error).message}`);
    }
  }

  /**
   * Did a card bring this learner to this course? The most recent "Learn
   * this too" tap on a card for the course, within the window, by someone
   * else. Returns the tap, or null.
   */
  async lastCtaFor(userId: string, courseId: string, withinHours: number) {
    return this.prisma.networkEvent.findFirst({
      where: {
        userId,
        courseId,
        kind: 'CTA',
        authorId: { not: userId },
        createdAt: { gte: new Date(Date.now() - withinHours * 3_600_000) },
      },
      orderBy: { createdAt: 'desc' },
      select: { activityId: true, authorId: true },
    });
  }

  /** Enrolment from a card → ENROLLED_FROM_CARD, once per learner+course. */
  async attributeEnrolment(userId: string, courseId: string) {
    const tap = await this.lastCtaFor(userId, courseId, ATTRIBUTION_ENROL_HOURS);
    if (!tap?.authorId) return null;
    const already = await this.prisma.networkEvent.findFirst({
      where: { userId, courseId, kind: 'ENROLLED_FROM_CARD' },
      select: { id: true },
    });
    if (already) return null;
    await this.log({ userId, kind: 'ENROLLED_FROM_CARD', activityId: tap.activityId, authorId: tap.authorId, courseId });
    return tap.authorId;
  }

  /**
   * A lesson within hours of tapping a card for that course — the network's
   * north-star event. Once per tapped card.
   */
  async attributeLesson(userId: string, courseId: string) {
    const tap = await this.lastCtaFor(userId, courseId, ATTRIBUTION_LESSON_HOURS);
    if (!tap?.activityId) return;
    const already = await this.prisma.networkEvent.findFirst({
      where: { userId, activityId: tap.activityId, kind: 'LESSON_FROM_CARD' },
      select: { id: true },
    });
    if (!already) {
      await this.log({ userId, kind: 'LESSON_FROM_CARD', activityId: tap.activityId, authorId: tap.authorId, courseId });
    }
  }
}
