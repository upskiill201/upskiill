import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { PrismaService } from '../prisma/prisma.service';
import { CommunityService } from './community.service';
import { CommentCreatedEvent, ContentLikedEvent } from './events/community.events';
import { XpAwardedEvent } from '../league/events/xp-awarded.event';
import { CreateCommentDto, UpdateCommentDto } from './dto/community.dto';
import { extractMentionIds } from './post.service';

const COMMENT_XP = 5;
const COMMENT_COINS = 2;
const MAX_PAID_COMMENTS_PER_DAY = 5;
export const COMMUNITY_COMMENT_SOURCE = 'COMMUNITY_COMMENT';

@Injectable()
export class CommentService {
  constructor(
    private prisma: PrismaService,
    private communityService: CommunityService,
    private eventEmitter: EventEmitter2,
  ) {}

  /** Top-level comments paginated; each carries its ACTIVE replies nested. */
  async listComments(
    postId: string,
    viewer: { id: string; role?: string },
    opts: { page?: number; pageSize?: number } = {},
  ) {
    const post = await this.prisma.post.findUnique({
      where: { id: postId },
      select: { id: true, communityId: true, status: true },
    });
    if (!post || post.status === 'REMOVED') throw new NotFoundException('Post not found.');
    await this.communityService.assertMember(post.communityId!, viewer.id, viewer.role);

    const page = Math.max(1, opts.page ?? 1);
    const pageSize = Math.min(50, Math.max(1, opts.pageSize ?? 20));
    const where = { postId, parentId: null, status: 'ACTIVE' };

    const [total, comments] = await Promise.all([
      this.prisma.comment.count({ where }),
      this.prisma.comment.findMany({
        where,
        orderBy: { createdAt: 'asc' },
        skip: (page - 1) * pageSize,
        take: pageSize,
        include: {
          user: {
            select: {
              id: true,
              fullName: true,
              avatarUrl: true,
              studentProfile: { select: { streakDays: true } },
            },
          },
          replies: {
            where: { status: 'ACTIVE' },
            orderBy: { createdAt: 'asc' },
            include: {
              user: {
                select: {
                  id: true,
                  fullName: true,
                  avatarUrl: true,
                  studentProfile: { select: { streakDays: true } },
                },
              },
            },
          },
        },
      }),
    ]);

    const allIds = comments.flatMap((c) => [c.id, ...c.replies.map((r) => r.id)]);
    const likedSet = await this.resolveViewerLikes(viewer.id, allIds);

    return {
      total,
      page,
      pageSize,
      comments: comments.map((c) => this.serializeComment(c, likedSet)),
    };
  }

  async addComment(
    postId: string,
    author: { id: string; role?: string },
    dto: CreateCommentDto,
  ) {
    const post = await this.getOpenPost(postId);
    const { isModerator } = await this.communityService.assertMember(
      post.communityId!,
      author.id,
      author.role,
    );
    if (post.isLocked && !isModerator) {
      throw new ForbiddenException('Comments are closed on this post.');
    }

    // Replies attach only to top-level comments (one thread level).
    let parentAuthorId: string | null = null;
    if (dto.parentId) {
      const parent = await this.prisma.comment.findUnique({
        where: { id: dto.parentId },
        select: { id: true, postId: true, parentId: true, userId: true, status: true },
      });
      if (!parent || parent.postId !== postId || parent.status !== 'ACTIVE') {
        throw new BadRequestException('Invalid comment to reply to.');
      }
      if (parent.parentId) {
        throw new BadRequestException('Replies to replies should target the original comment.');
      }
      parentAuthorId = parent.userId;
    }

    const result = await this.prisma.$transaction(async (tx) => {
      const comment = await tx.comment.create({
        data: {
          postId,
          userId: author.id,
          parentId: dto.parentId ?? null,
          contentText: dto.contentText,
        },
        include: {
          user: {
            select: {
              id: true,
              fullName: true,
              avatarUrl: true,
              studentProfile: { select: { streakDays: true } },
            },
          },
        },
      });
      await Promise.all([
        tx.post.update({
          where: { id: postId },
          data: {
            commentCount: { increment: 1 },
            lastActivityAt: new Date(),
          },
        }),
        ...(dto.parentId
          ? [] // reply counts ride on the post's total; per-parent counts are derived
          : []),
      ]);

      const xpAwarded = await this.awardXpWithCap(
        tx,
        author.id,
        COMMUNITY_COMMENT_SOURCE,
        COMMENT_XP,
        COMMENT_COINS,
        MAX_PAID_COMMENTS_PER_DAY,
      );
      return { comment, xpAwarded };
    });

    this.eventEmitter.emit(
      'community.comment.created',
      new CommentCreatedEvent(
        result.comment.id,
        postId,
        author.id,
        post.userId,
        parentAuthorId,
        dto.contentText.slice(0, 140),
        extractMentionIds(dto.contentText),
      ),
    );

    // Credit the weekly league standings (async, non-blocking).
    if (result.xpAwarded.xp > 0) {
      this.eventEmitter.emit(
        'xp.awarded',
        new XpAwardedEvent(author.id, result.xpAwarded.xp, 'COMMUNITY_COMMENT'),
      );
    }

    return {
      ...this.serializeComment(result.comment as any),
      xpAwarded: result.xpAwarded,
    };
  }

  async updateComment(
    commentId: string,
    editor: { id: string; role?: string },
    dto: UpdateCommentDto,
  ) {
    const comment = await this.getActiveComment(commentId);
    const isMod = await this.isModeratorOf(comment.post.communityId!, editor);
    if (comment.userId !== editor.id && !isMod) {
      throw new ForbiddenException('You can only edit your own comments.');
    }
    const updated = await this.prisma.comment.update({
      where: { id: commentId },
      data: { contentText: dto.contentText, editedAt: new Date() },
      include: {
        user: {
          select: {
            id: true,
            fullName: true,
            avatarUrl: true,
            studentProfile: { select: { streakDays: true } },
          },
        },
      },
    });
    return this.serializeComment(updated as any);
  }

  async deleteComment(commentId: string, deleter: { id: string; role?: string }) {
    const comment = await this.getActiveComment(commentId);
    const isMod = await this.isModeratorOf(comment.post.communityId!, deleter);
    if (comment.userId !== deleter.id && !isMod) {
      throw new ForbiddenException('You can only delete your own comments.');
    }
    await this.prisma.$transaction(async (tx) => {
      // Soft-delete the subtree so threads don't show orphaned replies.
      await tx.comment.updateMany({
        where: { OR: [{ id: commentId }, { parentId: commentId }] },
        data: { status: 'REMOVED' },
      });
      const removed = 1 + (await tx.comment.count({
        where: { parentId: commentId, status: 'REMOVED' },
      }));
      await tx.post.update({
        where: { id: comment.postId },
        data: { commentCount: { decrement: removed } },
      });
    });
    return { success: true };
  }

  /**
   * Minimal resolver so COMMENT-entity notifications can deep-link to their
   * post without exposing full comment content through the bell.
   */
  async getCommentLocation(commentId: string) {
    const comment = await this.prisma.comment.findUnique({
      where: { id: commentId },
      select: { id: true, postId: true, status: true },
    });
    if (!comment || comment.status === 'REMOVED') {
      throw new NotFoundException('Comment not found.');
    }
    return { id: comment.id, postId: comment.postId };
  }

  async likeComment(commentId: string, userId: string, userRole?: string) {
    const comment = await this.getActiveComment(commentId);
    await this.communityService.assertMember(
      comment.post.communityId!,
      userId,
      userRole,
    );

    let created = false;
    await this.prisma.$transaction(async (tx) => {
      try {
        await tx.like.create({
          data: { userId, entityType: 'COMMENT', entityId: commentId },
        });
        created = true;
      } catch {
        created = false;
      }
      if (created) {
        await tx.comment.update({
          where: { id: commentId },
          data: { likeCount: { increment: 1 } },
        });
      }
    });

    if (created && comment.userId !== userId) {
      this.eventEmitter.emit(
        'community.content.liked',
        new ContentLikedEvent(
          userId,
          comment.userId,
          'COMMENT',
          commentId,
          comment.contentText.slice(0, 100),
        ),
      );
    }
    return {
      liked: created,
      likeCount: comment.likeCount + (created ? 1 : 0),
    };
  }

  async unlikeComment(commentId: string, userId: string, userRole?: string) {
    const comment = await this.getActiveComment(commentId);
    await this.communityService.assertMember(
      comment.post.communityId!,
      userId,
      userRole,
    );
    let removed = false;
    await this.prisma.$transaction(async (tx) => {
      const res = await tx.like.deleteMany({
        where: { userId, entityType: 'COMMENT', entityId: commentId },
      });
      removed = res.count > 0;
      if (removed) {
        await tx.comment.update({
          where: { id: commentId },
          data: { likeCount: { decrement: 1 } },
        });
      }
    });
    return { liked: false, likeCount: Math.max(0, comment.likeCount - (removed ? 1 : 0)) };
  }

  // ── Internals ──────────────────────────────────────────────────────────────

  private async getOpenPost(postId: string) {
    const post = await this.prisma.post.findUnique({ where: { id: postId } });
    if (!post || post.status === 'REMOVED') throw new NotFoundException('Post not found.');
    return post;
  }

  private async getActiveComment(commentId: string) {
    const comment = await this.prisma.comment.findUnique({
      where: { id: commentId },
      include: { post: { select: { id: true, communityId: true, userId: true } } },
    });
    if (!comment || comment.status === 'REMOVED') {
      throw new NotFoundException('Comment not found.');
    }
    return comment;
  }

  private async isModeratorOf(communityId: string, user: { id: string; role?: string }) {
    try {
      await this.communityService.assertModerator(communityId, user.id, user.role);
      return true;
    } catch {
      return false;
    }
  }

  private async resolveViewerLikes(viewerId: string, commentIds: string[]) {
    if (commentIds.length === 0) return new Set<string>();
    const likes = await this.prisma.like.findMany({
      where: { userId: viewerId, entityType: 'COMMENT', entityId: { in: commentIds } },
      select: { entityId: true },
    });
    return new Set(likes.map((l) => l.entityId));
  }

  /**
   * Same cap-gated award used by posts, kept local to avoid a circular
   * dependency between the two services.
   */
  private async awardXpWithCap(
    tx: any,
    userId: string,
    source: string,
    xp: number,
    coins: number,
    maxPerDay: number,
  ) {
    const profile = await tx.studentProfile.findUnique({
      where: { userId },
      select: { id: true },
    });
    if (!profile) return { xp: 0, coins: 0 };

    const dayStart = new Date();
    dayStart.setUTCHours(0, 0, 0, 0);
    const paidToday = await tx.gemTransaction.count({
      where: { userId, source, createdAt: { gte: dayStart } },
    });
    if (paidToday >= maxPerDay) return { xp: 0, coins: 0 };

    await Promise.all([
      tx.studentProfile.update({
        where: { userId },
        data: { xp: { increment: xp }, coins: { increment: coins } },
      }),
      tx.gemTransaction.create({
        data: { userId, type: 'EARN', amount: coins, source },
      }),
    ]);
    return { xp, coins };
  }
  private serializeComment(c: any, likedByMe?: Set<string>) {
    return {
      id: c.id,
      postId: c.postId,
      parentId: c.parentId,
      contentText: c.contentText,
      likeCount: c.likeCount,
      editedAt: c.editedAt,
      createdAt: c.createdAt,
      author: {
        id: c.user.id,
        fullName: c.user.fullName,
        avatarUrl: c.user.avatarUrl,
        streakDays: c.user.studentProfile?.streakDays ?? 0,
      },
      likedByMe: likedByMe ? likedByMe.has(c.id) : false,
      userId: c.userId,
      replies: c.replies ? c.replies.map((r: any) => this.serializeReply(r, likedByMe)) : [],
    };
  }

  private serializeReply(r: any, likedByMe?: Set<string>) {
    return {
      id: r.id,
      postId: r.postId,
      parentId: r.parentId,
      contentText: r.contentText,
      likeCount: r.likeCount,
      editedAt: r.editedAt,
      createdAt: r.createdAt,
      author: {
        id: r.user.id,
        fullName: r.user.fullName,
        avatarUrl: r.user.avatarUrl,
        streakDays: r.user.studentProfile?.streakDays ?? 0,
      },
      likedByMe: likedByMe ? likedByMe.has(r.id) : false,
      userId: r.userId,
    };
  }
}
