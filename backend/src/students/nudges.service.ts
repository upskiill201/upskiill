import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { NotificationsService } from '../notification/notification.service';
import { TeyPolicyService } from '../tey/delivery/tey-policy.service';
import { PushChannel } from '../tey/delivery/channels/push.channel';
import {
  CHEER_COOLDOWN_HOURS,
  CoursePulseService,
  NUDGE_COOLDOWN_HOURS,
} from '../analytics/course-pulse.service';

export type NudgeKind = 'NUDGE' | 'CHEER';

export interface SendNudgesInput {
  courseId: string;
  learnerIds: string[];
  kind: NudgeKind;
  /** The creator's note. `{first}` becomes each learner's first name. */
  message: string;
}

export type SkipReason = 'RECENT' | 'NOT_ENROLLED';

/**
 * A creator stepping in: a nudge for a learner who went quiet or got stuck,
 * a cheer for one who is flying. Each lands in the learner's inbox (and on
 * their phone when their reminder settings allow), opening their next lesson.
 *
 * Limits keep this from becoming spam: one nudge per learner per course every
 * 3 days, one cheer a day, 50 learners per send, and only the creator's own
 * enrolled learners.
 */
@Injectable()
export class NudgesService {
  private readonly logger = new Logger(NudgesService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly notifications: NotificationsService,
    private readonly policy: TeyPolicyService,
    private readonly push: PushChannel,
    private readonly pulse: CoursePulseService,
  ) {}

  async send(creatorId: string, input: SendNudgesInput) {
    const course = await this.prisma.course.findFirst({
      where: { id: input.courseId, instructorId: creatorId },
      select: {
        id: true,
        title: true,
        sections: {
          orderBy: { orderIndex: 'asc' },
          select: {
            lessons: { where: { status: 'published' }, orderBy: { orderIndex: 'asc' }, select: { id: true } },
          },
        },
      },
    });
    if (!course) throw new NotFoundException('Course not found');

    const ids = Array.from(new Set(input.learnerIds)).filter((id) => id !== creatorId).slice(0, 50);
    const cooldownH = input.kind === 'NUDGE' ? NUDGE_COOLDOWN_HOURS : CHEER_COOLDOWN_HOURS;
    const [enrolled, recent, creator] = await Promise.all([
      this.prisma.enrollment.findMany({
        where: { courseId: course.id, userId: { in: ids } },
        select: {
          userId: true,
          completedLessons: true,
          user: { select: { fullName: true, timezone: true, timezoneOffsetMinutes: true } },
        },
      }),
      this.prisma.creatorNudge.findMany({
        where: {
          courseId: course.id,
          kind: input.kind,
          learnerId: { in: ids },
          createdAt: { gte: new Date(Date.now() - cooldownH * 3600_000) },
        },
        select: { learnerId: true },
      }),
      this.prisma.user.findUnique({ where: { id: creatorId }, select: { fullName: true } }),
    ]);

    const enrolledIds = new Set(enrolled.map((e) => e.userId));
    const recentIds = new Set(recent.map((r) => r.learnerId));
    const skipped: { learnerId: string; reason: SkipReason }[] = [];
    for (const id of ids) {
      if (!enrolledIds.has(id)) skipped.push({ learnerId: id, reason: 'NOT_ENROLLED' });
      else if (recentIds.has(id)) skipped.push({ learnerId: id, reason: 'RECENT' });
    }
    const targets = enrolled.filter((e) => !recentIds.has(e.userId));
    if (targets.length === 0) return { sent: 0, skipped };

    const creatorName = creator?.fullName?.trim() || 'Your instructor';
    const note = input.message.trim();
    const rows = targets.map((t) => {
      const first = t.user.fullName.trim().split(/\s+/)[0] || 'there';
      return {
        learnerId: t.userId,
        message: note.replace(/\{first\}/g, first).slice(0, 280),
        deepLink: this.nextLessonLink(course, t.completedLessons),
        user: t.user,
      };
    });

    await this.prisma.creatorNudge.createMany({
      data: rows.map((r) => ({
        creatorId,
        learnerId: r.learnerId,
        courseId: course.id,
        kind: input.kind,
        message: r.message,
      })),
    });
    await this.notifications.createMany(
      rows.map((r) => ({
        userId: r.learnerId,
        actorId: creatorId,
        type: input.kind === 'NUDGE' ? 'CREATOR_NUDGE' : 'CREATOR_CHEER',
        entityType: 'course',
        entityId: course.id,
        title: null,
        body: r.message,
        deepLink: r.deepLink,
      })),
    );
    this.pulse.forgetBadges(creatorId);

    // Phones last, off the request: the inbox rows are already written.
    void this.pushAll(rows, input.kind, `${creatorName} · ${course.title}`).catch((err) =>
      this.logger.warn(`Creator push fan-out failed: ${(err as Error).message}`),
    );

    return { sent: rows.length, skipped };
  }

  /** The creator's nudges and cheers from the last 30 days, newest first. */
  async history(creatorId: string, filter: { courseId?: string; learnerId?: string }) {
    const rows = await this.prisma.creatorNudge.findMany({
      where: {
        creatorId,
        createdAt: { gte: new Date(Date.now() - 30 * 24 * 3600_000) },
        ...(filter.courseId ? { courseId: filter.courseId } : {}),
        ...(filter.learnerId ? { learnerId: filter.learnerId } : {}),
      },
      orderBy: { createdAt: 'desc' },
      take: 500,
      select: {
        id: true,
        learnerId: true,
        courseId: true,
        kind: true,
        message: true,
        createdAt: true,
        course: { select: { title: true } },
      },
    });
    return rows.map((r) => ({
      id: r.id,
      learnerId: r.learnerId,
      courseId: r.courseId,
      courseTitle: r.course.title,
      kind: r.kind as NudgeKind,
      message: r.message,
      createdAt: r.createdAt,
    }));
  }

  /** The learner's next lesson (the path's section index + lesson), else the course. */
  private nextLessonLink(
    course: { id: string; sections: { lessons: { id: string }[] }[] },
    completedLessons: unknown,
  ): string {
    const done = new Set(Array.isArray(completedLessons) ? (completedLessons as string[]) : []);
    for (let s = 0; s < course.sections.length; s++) {
      const next = course.sections[s].lessons.find((l) => !done.has(l.id));
      if (next) return `/learn/${course.id}/section/${s}?lesson=${encodeURIComponent(next.id)}`;
    }
    return `/learn/${course.id}`;
  }

  private async pushAll(
    rows: {
      learnerId: string;
      message: string;
      deepLink: string;
      user: { timezone: string | null; timezoneOffsetMinutes: number | null };
    }[],
    kind: NudgeKind,
    title: string,
  ) {
    const category = kind === 'NUDGE' ? 'reengagement' : 'milestones';
    for (const r of rows) {
      const allowed = await this.policy.allowsDirectPush({ id: r.learnerId, ...r.user }, category);
      if (!allowed) continue;
      await this.push.sendPlain(r.learnerId, {
        title,
        body: r.message,
        url: r.deepLink,
        tag: `creator-${kind.toLowerCase()}`,
        reason: `CREATOR_${kind}`,
      });
    }
  }
}
