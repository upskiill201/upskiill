import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { PrismaService } from '../../prisma/prisma.service';
import { NotificationsService } from '../../notification/notification.service';
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
   * Seats a learner in the course community the moment they enroll —
   * emitted from course/orders/payment enrollment sites.
   */
  @OnEvent('enrollment.created', { async: true })
  async handleEnrollmentCreated(payload: { userId: string; courseId: string }) {
    await this.communityService.joinCourseCommunity(payload.courseId, payload.userId);
  }

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

      await this.notifications.createMany(
        recipients.map((r) => ({
          userId: r.userId,
          actorId: event.authorId,
          type: r.type,
          entityType: 'POST',
          entityId: event.postId,
          title: event.excerpt.slice(0, 80),
          body: r.type === 'REPLY' ? 'replied to your comment' : 'commented on your post',
        })),
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
      await this.notifications.createMany([
        {
          userId: event.ownerId,
          actorId: event.actorId,
          type: event.entityType === 'POST' ? 'POST_LIKE' : 'COMMENT_LIKE',
          entityType: event.entityType === 'POST' ? 'POST' : 'COMMENT',
          entityId: event.entityId,
          title: event.excerpt.slice(0, 80),
          body: 'liked your ' + (event.entityType === 'POST' ? 'post' : 'comment'),
        },
      ]);
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
    await this.notifications.createMany(
      valid.map((m) => ({
        userId: m.userId,
        actorId,
        type: 'MENTION',
        entityType: 'POST',
        entityId: postId,
        title: excerpt.slice(0, 80),
        body: 'mentioned you',
      })),
    );
  }
}
