import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { PrismaService } from '../../prisma/prisma.service';
import { NotificationsService, type CreateNotificationInput } from '../../notification/notification.service';
import { EmailJobRepository } from '../../email/jobs/email-job.repository';
import { resolveFocusCourseIds } from '../../common/focus-course.util';
import {
  COMMUNITY_INBOX_TYPE,
  communityCopy,
  communityPostUrl,
  firstName,
  type CommunityKind,
} from '../../tey/notify/community.copy';
import { TeyNotifyService } from '../../tey/notify/tey-notify.service';
import { CommunityService } from '../community.service';
import {
  CommentCreatedEvent,
  ContentLikedEvent,
  PostCreatedEvent,
} from '../events/community.events';

/** Hard cap so an announcement in a huge community can't explode the fan-out. */
const MAX_FANOUT = 500;
/** How many notifications are built at once during a fan-out. */
const FANOUT_CONCURRENCY = 10;
/**
 * A reply only becomes an email if it is still unread this long after it
 * happened: someone who is in the app already saw it, and does not need it
 * twice.
 */
const EMAIL_DELAY_MS = 20 * 60_000;

interface CourseContext {
  courseId: string;
  courseName: string;
  /** The course's creator administers the community; their rows go to the studio bell. */
  creatorId: string | null;
}

/**
 * Community activity → notifications.
 *
 * Learners are notified for their FOCUS course only (common/focus-course.util):
 * a reply, comment or mention from a course they are not focused on does not
 * ring, push or email them, and neither does a new post or announcement there.
 * Everything goes out in Tey's voice (tey/notify/community.copy) through the
 * Tey notify hub, so it gets the same bell row, push gate (preferences, quiet
 * hours, daily cap) and delivery ledger as every other Tey event.
 *
 * The course creator is not a "learner" here: their replies, likes and
 * mentions keep going to the studio bell exactly as before.
 */
@Injectable()
export class CommunityListener {
  private readonly logger = new Logger(CommunityListener.name);

  constructor(
    private prisma: PrismaService,
    private notifications: NotificationsService,
    private communityService: CommunityService,
    private hub: TeyNotifyService,
    private emailJobs: EmailJobRepository,
  ) {}

  /**
   * Enrollment no longer seats anyone.
   *
   * Learners now join their course community after their SECOND completed
   * lesson (CommunityService.seatAfterSecondLesson, called synchronously from
   * completeLesson so the response can carry the welcome moment). Seating at
   * enrollment filled communities with people who had never opened the course
   * and made member counts meaningless.
   *
   * Access is unaffected: anyone holding an enrollment or entitlement is still
   * seated lazily by assertMember the moment they open the community
   * themselves — this only changes when the seat is created *for* them.
   */

  @OnEvent('community.post.created', { async: true })
  async handlePostCreated(event: PostCreatedEvent) {
    try {
      const ctx = await this.courseContext(event.communityId);
      if (!ctx) return;
      const actor = await this.actorName(event.authorId);
      const mentioned = new Set(event.mentionedUserIds);

      // 1. Mentions always notify (when the course is the mentioned person's
      //    focus), even inside regular posts.
      if (event.mentionedUserIds.length > 0) {
        await this.notifyMentions({
          ctx,
          mentionedUserIds: event.mentionedUserIds,
          communityId: event.communityId,
          actorId: event.authorId,
          actor,
          postId: event.postId,
          sourceId: event.postId,
          excerpt: event.title ?? event.excerpt,
        });
      }

      // 2. Everyone else in the community whose focus is this course hears
      //    that a classmate posted. Announcements and challenges are the
      //    creator speaking to the class; a plain post is the throttled kind.
      const announcement = event.postType === 'ANNOUNCEMENT' || event.postType === 'CHALLENGE';
      const kind: CommunityKind = announcement ? 'COMMUNITY_ANNOUNCEMENT' : 'COMMUNITY_POST';
      const members = await this.prisma.communityMembership.findMany({
        where: { communityId: event.communityId },
        select: { userId: true },
        take: MAX_FANOUT,
      });
      const candidates = members
        .map((m) => m.userId)
        .filter((id) => id !== event.authorId && id !== ctx.creatorId && !mentioned.has(id));
      const recipients = await this.inFocus(candidates, ctx.courseId);
      if (recipients.length === 0) return;

      const copy = communityCopy({
        kind,
        actor,
        excerpt: event.excerpt,
        courseName: ctx.courseName,
        headline: event.title ?? undefined,
        challenge: event.postType === 'CHALLENGE',
        seed: event.postId,
      });
      await inChunks(recipients, FANOUT_CONCURRENCY, (userId) =>
        this.hub.notify({
          userId,
          kind,
          actorId: event.authorId,
          title: copy.title,
          body: copy.body,
          url: communityPostUrl(ctx.courseId, event.postId),
          dedupeKey: `post:${event.postId}`,
          tag: `community-${ctx.courseId}`,
          inbox: {
            type: COMMUNITY_INBOX_TYPE[kind],
            entityType: 'POST',
            entityId: announcement ? event.postId : event.communityId,
            // A busy community is one row a day ("latest post"), not one per post.
            collapseDaily: !announcement,
          },
        }),
      );
    } catch (err) {
      this.logger.error('community.post.created handler failed', err as Error);
    }
  }

  @OnEvent('community.comment.created', { async: true })
  async handleCommentCreated(event: CommentCreatedEvent) {
    try {
      const post = await this.prisma.post.findUnique({
        where: { id: event.postId },
        select: { communityId: true },
      });
      const ctx = post?.communityId ? await this.courseContext(post.communityId) : null;
      if (!ctx) return;

      const targets: Array<{ userId: string; kind: 'COMMUNITY_REPLY' | 'COMMUNITY_COMMENT'; legacy: string }> = [];
      if (event.parentAuthorId && event.parentAuthorId !== event.authorId) {
        targets.push({ userId: event.parentAuthorId, kind: 'COMMUNITY_REPLY', legacy: 'REPLY' });
      }
      // On replies the post author still hears about it once (unless they were
      // the replier or are already getting the REPLY).
      if (
        !event.parentAuthorId &&
        event.postAuthorId !== event.authorId &&
        event.postAuthorId !== event.parentAuthorId
      ) {
        targets.push({ userId: event.postAuthorId, kind: 'COMMUNITY_COMMENT', legacy: 'COMMENT' });
      }

      const creatorRows = targets.filter((t) => t.userId === ctx.creatorId);
      const learners = targets.filter((t) => t.userId !== ctx.creatorId);
      const actor = await this.actorName(event.authorId);

      // The course creator keeps the studio bell, unchanged.
      await this.deliverToCreator(
        creatorRows.map((t) => ({
          userId: t.userId,
          actorId: event.authorId,
          type: t.legacy,
          entityType: 'POST',
          entityId: event.postId,
          title: event.excerpt.slice(0, 80),
          body: t.legacy === 'REPLY' ? 'replied to your comment' : 'commented on your post',
        })),
        ctx,
        event.postId,
      );

      const focused = new Set(await this.inFocus(learners.map((t) => t.userId), ctx.courseId));
      for (const t of learners) {
        if (!focused.has(t.userId)) continue;
        const copy = communityCopy({
          kind: t.kind,
          actor,
          excerpt: event.excerpt,
          courseName: ctx.courseName,
          seed: event.commentId,
        });
        await this.hub.notify({
          userId: t.userId,
          kind: t.kind,
          actorId: event.authorId,
          title: copy.title,
          body: copy.body,
          url: communityPostUrl(ctx.courseId, event.postId),
          dedupeKey: `comment:${event.commentId}`,
          // Its own device tag per conversation: two threads must not replace
          // each other on the lock screen.
          tag: `community-${event.postId}`,
          inbox: { type: COMMUNITY_INBOX_TYPE[t.kind], entityType: 'POST', entityId: event.postId },
        });
        await this.queueEmail(t.userId, ctx.courseId, event.postId, t.kind);
      }

      if (event.mentionedUserIds.length > 0) {
        await this.notifyMentions({
          ctx,
          mentionedUserIds: event.mentionedUserIds,
          communityId: post!.communityId!,
          actorId: event.authorId,
          actor,
          postId: event.postId,
          sourceId: event.commentId,
          excerpt: event.excerpt,
        });
      }
    } catch (err) {
      this.logger.error('community.comment.created handler failed', err as Error);
    }
  }

  @OnEvent('community.content.liked', { async: true })
  async handleContentLiked(event: ContentLikedEvent) {
    try {
      const postId =
        event.entityType === 'POST'
          ? event.entityId
          : ((
              await this.prisma.comment.findUnique({ where: { id: event.entityId }, select: { postId: true } })
            )?.postId ?? null);
      if (!postId) return;
      const post = await this.prisma.post.findUnique({
        where: { id: postId },
        select: { communityId: true },
      });
      const ctx = post?.communityId ? await this.courseContext(post.communityId) : null;
      if (!ctx) return;

      const row: CreateNotificationInput = {
        userId: event.ownerId,
        actorId: event.actorId,
        type: event.entityType === 'POST' ? 'POST_LIKE' : 'COMMENT_LIKE',
        entityType: event.entityType === 'POST' ? 'POST' : 'COMMENT',
        entityId: event.entityId,
        title: event.excerpt.slice(0, 80),
        body: 'liked your ' + (event.entityType === 'POST' ? 'post' : 'comment'),
      };
      if (event.ownerId === ctx.creatorId) {
        await this.deliverToCreator([row], ctx, postId);
        return;
      }
      // A like is a quiet bell row — never a push or an email — and, like
      // everything else here, only for the focus course.
      if ((await this.inFocus([event.ownerId], ctx.courseId)).length === 0) return;
      await this.notifications.createMany([row]);
    } catch (err) {
      this.logger.error('community.content.liked handler failed', err as Error);
    }
  }

  /** Only mention people who are actually in that community (and focused on it). */
  private async notifyMentions(args: {
    ctx: CourseContext;
    mentionedUserIds: string[];
    communityId: string;
    actorId: string;
    actor: string;
    postId: string;
    /** The post or comment that holds the mention — keeps the dedupe exact. */
    sourceId: string;
    excerpt: string;
  }) {
    const { ctx, actorId, postId } = args;
    const valid = await this.prisma.communityMembership.findMany({
      where: { communityId: args.communityId, userId: { in: args.mentionedUserIds }, NOT: { userId: actorId } },
      select: { userId: true },
    });
    const ids = valid.map((m) => m.userId);

    const creatorRows = ids.filter((id) => id === ctx.creatorId);
    await this.deliverToCreator(
      creatorRows.map((userId) => ({
        userId,
        actorId,
        type: 'MENTION',
        entityType: 'POST',
        entityId: postId,
        title: args.excerpt.slice(0, 80),
        body: 'mentioned you',
      })),
      ctx,
      postId,
    );

    const learners = await this.inFocus(
      ids.filter((id) => id !== ctx.creatorId),
      ctx.courseId,
    );
    const copy = communityCopy({
      kind: 'COMMUNITY_MENTION',
      actor: args.actor,
      excerpt: args.excerpt,
      courseName: ctx.courseName,
      seed: args.sourceId,
    });
    for (const userId of learners) {
      await this.hub.notify({
        userId,
        kind: 'COMMUNITY_MENTION',
        actorId,
        title: copy.title,
        body: copy.body,
        url: communityPostUrl(ctx.courseId, postId),
        dedupeKey: `mention:${args.sourceId}`,
        tag: `community-${postId}`,
        inbox: { type: COMMUNITY_INBOX_TYPE.COMMUNITY_MENTION, entityType: 'POST', entityId: postId },
      });
      await this.queueEmail(userId, ctx.courseId, postId, 'COMMUNITY_MENTION');
    }
  }

  /** The course a community belongs to, and who created it. Null for a standalone community. */
  private async courseContext(communityId: string): Promise<CourseContext | null> {
    const community = await this.prisma.community.findUnique({
      where: { id: communityId },
      select: { courseId: true, course: { select: { title: true, instructorId: true } } },
    });
    if (!community?.courseId) return null;
    return {
      courseId: community.courseId,
      courseName: community.course?.title ?? 'your course',
      creatorId: community.course?.instructorId ?? null,
    };
  }

  /** Of these learners, the ones whose focus course is `courseId`. */
  private async inFocus(userIds: string[], courseId: string): Promise<string[]> {
    if (userIds.length === 0) return [];
    const focus = await resolveFocusCourseIds(this.prisma, [...new Set(userIds)]);
    return [...new Set(userIds)].filter((id) => focus.get(id) === courseId);
  }

  private async actorName(userId: string): Promise<string> {
    const user = await this.prisma.user.findUnique({ where: { id: userId }, select: { fullName: true } });
    return firstName(user?.fullName);
  }

  /**
   * The course's creator administers the community, so their replies, likes
   * and mentions belong in the studio bell, opening the post in the studio's
   * community page.
   */
  private async deliverToCreator(rows: CreateNotificationInput[], ctx: CourseContext, postId: string) {
    if (rows.length === 0) return;
    await this.notifications.createMany(
      rows.map((r) => ({
        ...r,
        type: `STUDIO_${r.type}`,
        deepLink: `/creator/community?course=${ctx.courseId}&post=${postId}`,
      })),
    );
  }

  /**
   * A direct reply or mention also becomes ONE email per learner per
   * conversation per day, sent only if it is still unread 20 minutes later
   * (email-job-processor: processCommunityActivity).
   */
  private async queueEmail(userId: string, courseId: string, postId: string, kind: CommunityKind) {
    const day = new Date().toISOString().slice(0, 10);
    await this.emailJobs.enqueue({
      userId,
      eventType: 'COMMUNITY_ACTIVITY',
      templateKey: 'learning.community-activity',
      dueAt: new Date(Date.now() + EMAIL_DELAY_MS),
      dedupeKey: `community-email:${userId}:${postId}:${day}`,
      payload: { courseId, postId, kind },
    });
  }
}

/** Run `fn` over `items`, `size` at a time. */
async function inChunks<T>(items: T[], size: number, fn: (item: T) => Promise<unknown>) {
  for (let i = 0; i < items.length; i += size) {
    await Promise.all(items.slice(i, i + size).map(fn));
  }
}
