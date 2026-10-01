import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { PrismaService } from '../../prisma/prisma.service';
import { NotificationsService, type CreateNotificationInput } from '../../notification/notification.service';
import { CommunityService } from '../community.service';
import {
  CommentCreatedEvent,
  ContentLikedEvent,
  PostCreatedEvent,
} from '../events/community.events';

/** Hard cap so an announcement in a huge community can't explode the insert. */
const MAX_FANOUT = 500;

@Injectable()
export class CommunityListener {
  private readonly logger = new Logger(CommunityListener.name);

  constructor(
    private prisma: PrismaService,
    private notifications: NotificationsService,
    private communityService: CommunityService,
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
      // 1. Announcements/challenges reach every member of the community.
      if (event.postType === 'ANNOUNCEMENT' || event.postType === 'CHALLENGE') {
        const members = await this.prisma.communityMembership.findMany({
          where: { communityId: event.communityId },
          select: { userId: true },
          take: MAX_FANOUT,
        });
        const recipients = members
          .map((m) => m.userId)
          .filter((id) => id !== event.authorId);

        await this.notifications.createMany(
          recipients.map((userId) => ({
            userId,
            actorId: event.authorId,
            type: 'ANNOUNCEMENT',
            entityType: 'POST',
            entityId: event.postId,
            title: event.title ?? event.excerpt.slice(0, 80),
            body: event.postType === 'CHALLENGE' ? 'New challenge posted' : 'New announcement',
          })),
        );
      }

      // 2. Mentions always notify, even inside regular posts.
      if (event.mentionedUserIds.length > 0) {
        await this.notifyMentions(
          event.mentionedUserIds,
          event.communityId,
          event.authorId,
          event.postId,
          event.title ?? event.excerpt,
        );
      }
    } catch (err) {
      this.logger.error('community.post.created handler failed', err as Error);
    }
  }

  @OnEvent('community.comment.created', { async: true })
  async handleCommentCreated(event: CommentCreatedEvent) {
    try {
      const recipients: Array<{ userId: string; type: string }> = [];

      if (event.parentAuthorId && event.parentAuthorId !== event.authorId) {
        recipients.push({ userId: event.parentAuthorId, type: 'REPLY' });
      }
      // On replies the post author still hears about it once (unless they were
      // the replier or are already getting the REPLY).
      if (
        !event.parentAuthorId &&
        event.postAuthorId !== event.authorId &&
        event.postAuthorId !== event.parentAuthorId
      ) {
        recipients.push({ userId: event.postAuthorId, type: 'COMMENT' });
      }

      await this.deliver(
        recipients.map((r) => ({
          userId: r.userId,
          actorId: event.authorId,
          type: r.type,
          entityType: 'POST',
          entityId: event.postId,
          title: event.excerpt.slice(0, 80),
          body: r.type === 'REPLY' ? 'replied to your comment' : 'commented on your post',
        })),
        event.postId,
      );

      if (event.mentionedUserIds.length > 0) {
        const post = await this.prisma.post.findUnique({
          where: { id: event.postId },
          select: { communityId: true },
        });
        if (post?.communityId) {
          await this.notifyMentions(
            event.mentionedUserIds,
            post.communityId,
            event.authorId,
            event.postId,
            event.excerpt,
          );
        }
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
      await this.deliver(
        [
          {
            userId: event.ownerId,
            actorId: event.actorId,
            type: event.entityType === 'POST' ? 'POST_LIKE' : 'COMMENT_LIKE',
            entityType: event.entityType === 'POST' ? 'POST' : 'COMMENT',
            entityId: event.entityId,
            title: event.excerpt.slice(0, 80),
            body: 'liked your ' + (event.entityType === 'POST' ? 'post' : 'comment'),
          },
        ],
        postId,
      );
    } catch (err) {
      this.logger.error('community.content.liked handler failed', err as Error);
    }
  }

  /** Only mention people who are actually in that community. */
  private async notifyMentions(
    mentionedUserIds: string[],
    communityId: string,
    actorId: string,
    postId: string,
    excerpt: string,
  ) {
    const valid = await this.prisma.communityMembership.findMany({
      where: { communityId, userId: { in: mentionedUserIds }, NOT: { userId: actorId } },
      select: { userId: true },
    });
    await this.deliver(
      valid.map((m) => ({
        userId: m.userId,
        actorId,
        type: 'MENTION',
        entityType: 'POST',
        entityId: postId,
        title: excerpt.slice(0, 80),
        body: 'mentioned you',
      })),
      postId,
    );
  }

  /**
   * Inside a course community the course's creator is its admin, and their
   * replies, likes and mentions belong in the studio bell, opening the post
   * in the studio's community page. Everyone else's rows go out unchanged.
   */
  private async deliver(rows: CreateNotificationInput[], postId: string | null) {
    if (rows.length === 0) return;
    const post = postId
      ? await this.prisma.post.findUnique({
          where: { id: postId },
          select: { community: { select: { courseId: true, course: { select: { instructorId: true } } } } },
        })
      : null;
    const courseId = post?.community?.courseId;
    const creatorId = post?.community?.course?.instructorId;
    await this.notifications.createMany(
      rows.map((r) =>
        creatorId && courseId && r.userId === creatorId
          ? { ...r, type: `STUDIO_${r.type}`, deepLink: `/creator/community?course=${courseId}&post=${postId}` }
          : r,
      ),
    );
  }
}
