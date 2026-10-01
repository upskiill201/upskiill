import { Injectable, Logger, Optional } from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { PrismaService } from '../prisma/prisma.service';
import { NotificationsService } from './notification.service';
import { EnrollmentCreatedEvent } from '../common/events/enrollment-created.event';
import { LessonCompletedEvent } from '../course/events/lesson-completed.event';
import { PostCreatedEvent } from '../community/events/community.events';

/**
 * The creator's side of the inbox: the moments a creator wants to hear about
 * in the studio bell. Every row is typed STUDIO_* (see scopeWhere) and
 * carries a studio deep link, so it never shows in the learner bell.
 *
 *   STUDIO_NEW_LEARNERS   one row per course per UTC day, counting up
 *   STUDIO_SALE           a paid purchase of one of their courses
 *   STUDIO_COURSE_FINISHED a learner finished the whole course
 *   STUDIO_QUESTION       a learner asked in the course community
 *   STUDIO_PAYOUT         a payout moved (processing / paid / failed)
 *
 * Handlers never throw: a failed notice must not fail the action behind it.
 */

interface PaymentCompletedPayload {
  userId: string;
  courseId: string;
  amountUsd: number;
  transactionId?: string;
  instructorId: string;
}

const DAY_MS = 86_400_000;
const utcDayStart = (d = new Date()) =>
  new Date(Math.floor(d.getTime() / DAY_MS) * DAY_MS);
const first = (name?: string | null) =>
  (name ?? '').trim().split(/\s+/)[0] || 'A learner';

@Injectable()
export class StudioNotificationsListener {
  private readonly logger = new Logger(StudioNotificationsListener.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly notifications: NotificationsService,
    @Optional() private readonly events?: EventEmitter2,
  ) {}

  /**
   * Hands the moment to Tey's notification hub for a push. This listener
   * keeps writing its own inbox rows (with their counting-up logic); the hub
   * only decides whether the creator's phone should buzz — their settings,
   * quiet hours, and a throttle so a busy launch day isn't forty pings.
   */
  private relay(
    userId: string,
    kind: string,
    title: string,
    body: string,
    url: string,
    dedupeKey: string,
  ) {
    this.events?.emit('studio.notified', { userId, kind, title, body, url, dedupeKey });
  }

  /**
   * enrollment.created fires on every enroll call (it's idempotent for the
   * community seat), so only a row created in the last few minutes counts,
   * and each course gets one daily row that counts up instead of a ping per
   * learner.
   */
  @OnEvent('enrollment.created', { async: true })
  async onEnrollment(event: EnrollmentCreatedEvent) {
    try {
      const enrollment = await this.prisma.enrollment.findUnique({
        where: {
          userId_courseId: { userId: event.userId, courseId: event.courseId },
        },
        select: {
          createdAt: true,
          course: { select: { id: true, title: true, instructorId: true } },
        },
      });
      if (
        !enrollment ||
        Date.now() - enrollment.createdAt.getTime() > 5 * 60_000
      )
        return;
      const course = enrollment.course;
      if (course.instructorId === event.userId) return;

      const since = utcDayStart();
      const count = await this.prisma.enrollment.count({
        where: {
          courseId: course.id,
          createdAt: { gte: since },
          userId: { not: course.instructorId },
        },
      });
      const learner = await this.prisma.user.findUnique({
        where: { id: event.userId },
        select: { fullName: true },
      });
      const title =
        count <= 1
          ? `${first(learner?.fullName)} joined ${course.title}`
          : `${count} new learners joined ${course.title} today`;
      const body =
        count <= 1
          ? 'Say hi in your community to welcome them.'
          : `Latest: ${first(learner?.fullName)}.`;

      this.relay(
        course.instructorId,
        'STUDIO_NEW_LEARNERS',
        title,
        count <= 1 ? 'Say hi so they feel welcome. First impressions stick.' : body,
        `/creator/students?course=${course.id}`,
        `STUDIO_NEW_LEARNERS:${course.id}:${event.userId}`,
      );

      const existing = await this.prisma.notification.findFirst({
        where: {
          userId: course.instructorId,
          type: 'STUDIO_NEW_LEARNERS',
          entityId: course.id,
          createdAt: { gte: since },
        },
        select: { id: true },
      });
      if (existing) {
        await this.prisma.notification.update({
          where: { id: existing.id },
          data: {
            title,
            body,
            actorId: event.userId,
            isRead: false,
            createdAt: new Date(),
          },
        });
        return;
      }
      await this.notifications.createMany([
        {
          userId: course.instructorId,
          actorId: event.userId,
          type: 'STUDIO_NEW_LEARNERS',
          entityType: 'Course',
          entityId: course.id,
          title,
          body,
          deepLink: `/creator/students?course=${course.id}`,
        },
      ]);
    } catch (err) {
      this.logger.warn(`enrollment notice failed: ${(err as Error).message}`);
    }
  }

  @OnEvent('payment.completed', { async: true })
  async onSale(payload: PaymentCompletedPayload) {
    try {
      if (!payload.instructorId || payload.instructorId === payload.userId)
        return;
      const entityId = `${payload.transactionId ?? 'tx'}:${payload.courseId}`;
      const dupe = await this.prisma.notification.findFirst({
        where: { userId: payload.instructorId, type: 'STUDIO_SALE', entityId },
        select: { id: true },
      });
      if (dupe) return;
      const [course, buyer] = await Promise.all([
        this.prisma.course.findUnique({
          where: { id: payload.courseId },
          select: { title: true },
        }),
        this.prisma.user.findUnique({
          where: { id: payload.userId },
          select: { fullName: true },
        }),
      ]);
      const amount =
        Number.isFinite(payload.amountUsd) && payload.amountUsd > 0
          ? ` · $${payload.amountUsd.toFixed(2)}`
          : '';
      await this.notifications.createMany([
        {
          userId: payload.instructorId,
          actorId: payload.userId,
          type: 'STUDIO_SALE',
          entityType: 'Sale',
          entityId,
          title: `New sale${amount}`,
          body: `${first(buyer?.fullName)} bought ${course?.title ?? 'your course'}.`,
          deepLink: '/creator/earnings',
        },
      ]);
      this.relay(
        payload.instructorId,
        'STUDIO_SALE',
        `Cha-ching! New sale${amount}`,
        `${first(buyer?.fullName)} just bought ${course?.title ?? 'your course'}. Your teaching is paying off.`,
        '/creator/earnings',
        `STUDIO_SALE:${entityId}`,
      );
    } catch (err) {
      this.logger.warn(`sale notice failed: ${(err as Error).message}`);
    }
  }

  @OnEvent('lesson.completed', { async: true })
  async onLessonCompleted(event: LessonCompletedEvent) {
    if (!event.isFirstCompletion) return;
    try {
      const enrollment = await this.prisma.enrollment.findUnique({
        where: {
          userId_courseId: { userId: event.userId, courseId: event.courseId },
        },
        select: {
          progress: true,
          course: { select: { id: true, title: true, instructorId: true } },
        },
      });
      if (!enrollment || enrollment.progress < 100) return;
      const course = enrollment.course;
      if (course.instructorId === event.userId) return;
      const entityId = `${course.id}:${event.userId}`;
      const dupe = await this.prisma.notification.findFirst({
        where: {
          userId: course.instructorId,
          type: 'STUDIO_COURSE_FINISHED',
          entityId,
        },
        select: { id: true },
      });
      if (dupe) return;
      const learner = await this.prisma.user.findUnique({
        where: { id: event.userId },
        select: { fullName: true },
      });
      await this.notifications.createMany([
        {
          userId: course.instructorId,
          actorId: event.userId,
          type: 'STUDIO_COURSE_FINISHED',
          entityType: 'Course',
          entityId,
          title: `${first(learner?.fullName)} finished ${course.title}!`,
          body: 'Send a cheer. It means a lot coming from you.',
          deepLink: `/creator/students/${event.userId}`,
        },
      ]);
      this.relay(
        course.instructorId,
        'STUDIO_COURSE_FINISHED',
        `${first(learner?.fullName)} finished your course!`,
        `Every lesson of ${course.title}, done. A cheer from you would make their day.`,
        `/creator/students/${event.userId}`,
        `STUDIO_COURSE_FINISHED:${entityId}`,
      );
    } catch (err) {
      this.logger.warn(
        `course-finished notice failed: ${(err as Error).message}`,
      );
    }
  }

  @OnEvent('community.post.created', { async: true })
  async onPost(event: PostCreatedEvent) {
    if (event.postType !== 'QUESTION' || !event.courseId) return;
    try {
      const course = await this.prisma.course.findUnique({
        where: { id: event.courseId },
        select: { id: true, title: true, instructorId: true },
      });
      if (!course || course.instructorId === event.authorId) return;
      const asker = await this.prisma.user.findUnique({
        where: { id: event.authorId },
        select: { fullName: true },
      });
      await this.notifications.createMany([
        {
          userId: course.instructorId,
          actorId: event.authorId,
          type: 'STUDIO_QUESTION',
          entityType: 'POST',
          entityId: event.postId,
          title: `${first(asker?.fullName)} asked a question`,
          body: (event.title || event.excerpt).slice(0, 140),
          deepLink: `/creator/community?course=${course.id}&post=${event.postId}`,
        },
      ]);
      this.relay(
        course.instructorId,
        'STUDIO_QUESTION',
        `${first(asker?.fullName)} has a question for you`,
        `“${(event.title || event.excerpt).slice(0, 90)}” — a quick answer keeps them learning.`,
        `/creator/community?course=${course.id}&post=${event.postId}`,
        `STUDIO_QUESTION:${event.postId}`,
      );
    } catch (err) {
      this.logger.warn(`question notice failed: ${(err as Error).message}`);
    }
  }

  @OnEvent('payout.transitioned', { async: true })
  async onPayout(payload: {
    payoutId: string;
    status: 'PROCESSING' | 'PAID' | 'FAILED' | 'REJECTED';
  }) {
    try {
      const payout = await this.prisma.creatorPayout.findUnique({
        where: { id: payload.payoutId },
        select: { userId: true, amountMinor: true, currency: true },
      });
      if (!payout) return;
      const amount = `$${(payout.amountMinor / 100).toFixed(2)}`;
      const copy = {
        PROCESSING: {
          title: `Payout of ${amount} is on its way`,
          body: 'We’re sending it to your payout method now.',
        },
        PAID: {
          title: `${amount} paid out`,
          body: 'Your payout has been sent. Nice work!',
        },
        FAILED: {
          title: `Payout of ${amount} didn’t go through`,
          body: 'Check your payout method, then try again.',
        },
        REJECTED: {
          title: `Payout of ${amount} was declined`,
          body: 'Open Earnings to see why.',
        },
      }[payload.status];
      if (!copy) return;
      await this.notifications.createMany([
        {
          userId: payout.userId,
          type: 'STUDIO_PAYOUT',
          entityType: 'CreatorPayout',
          entityId: `${payload.payoutId}:${payload.status}`,
          title: copy.title,
          body: copy.body,
          deepLink: '/creator/earnings',
        },
      ]);
      this.relay(
        payout.userId,
        'STUDIO_PAYOUT',
        copy.title,
        copy.body,
        '/creator/earnings',
        `STUDIO_PAYOUT:${payload.payoutId}:${payload.status}`,
      );
    } catch (err) {
      this.logger.warn(`payout notice failed: ${(err as Error).message}`);
    }
  }
}
