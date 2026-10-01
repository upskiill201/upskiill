import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CommunityService } from './community.service';
import { ContentLikedEvent, PostCreatedEvent } from './events/community.events';
import { XpAwardedEvent } from '../league/events/xp-awarded.event';
import {
  ALL_POST_TYPES,
  CreatePostDto,
  MODERATOR_POST_TYPES,
  UpdatePostDto,
} from './dto/community.dto';

// ─── Gamified community rewards (anti-spam daily caps) ──────────────────────
const POST_XP = 15;
const POST_COINS = 5;
const MAX_PAID_POSTS_PER_DAY = 2;
export const COMMUNITY_POST_SOURCE = 'COMMUNITY_POST';

/** Extracts `userId`s from mention tokens the composer inserts: [Name](mention:<id>) */
export function extractMentionIds(text: string): string[] {
  const ids = new Set<string>();
  const re = /\[([^\]]*)\]\(mention:([a-zA-Z0-9-]+)\)/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text)) !== null) ids.add(m[2]);
  return [...ids];
}

@Injectable()
export class PostService {
  constructor(
    private prisma: PrismaService,
    private communityService: CommunityService,
    private eventEmitter: EventEmitter2,
  ) {}

  // ── Listing ────────────────────────────────────────────────────────────────

  async listPosts(
    communityId: string,
    viewer: { id: string; role?: string },
    opts: {
      page?: number;
      pageSize?: number;
      sort?: 'new' | 'top' | 'unanswered';
      postType?: string;
      lessonId?: string;
      /**
       * Set only by callers that have ALREADY resolved the community and run
       * the access check for this viewer (the bootstrap endpoint). Re-running
       * assertMember there costs two extra sequential round trips for an
       * answer we already have.
       */
      skipAccessCheck?: boolean;
    } = {},
  ) {
    if (!opts.skipAccessCheck) {
      await this.communityService.assertMember(communityId, viewer.id, viewer.role);
    }
    const page = Math.max(1, opts.page ?? 1);
    const pageSize = Math.min(50, Math.max(1, opts.pageSize ?? 20));

    const where: Prisma.PostWhereInput = {
      communityId,
      status: 'ACTIVE',
      ...(opts.postType ? { postType: opts.postType } : {}),
      ...(opts.lessonId ? { lessonId: opts.lessonId } : {}),
      ...(opts.sort === 'unanswered' ? { commentCount: 0 } : {}),
    };

    const orderBy: Prisma.PostOrderByWithRelationInput[] =
      opts.sort === 'top'
        ? [{ likeCount: 'desc' }, { commentCount: 'desc' }, { lastActivityAt: 'desc' }]
        : [{ isPinned: 'desc' }, { lastActivityAt: 'desc' }];

    const [total, posts] = await Promise.all([
      this.prisma.post.count({ where }),
      this.prisma.post.findMany({
        where,
        orderBy,
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
          lesson: { select: { id: true, title: true } },
          pollOptions: { orderBy: { position: 'asc' } },
          attachments: true,
          _count: { select: { comments: { where: { status: 'ACTIVE' } } } },
        },
      }),
    ]);

    // These three were sequential awaits, which on a distant DB meant three
    // extra full round trips stacked behind the list itself. They share no
    // inputs beyond the post ids, so they go together.
    const postIds = posts.map((p) => p.id);
    const authorIds = [...new Set(posts.map((p) => p.userId))];
    const [viewerLikes, viewerVotes, discussion, levels, creatorId] = await Promise.all([
      this.resolveViewerLikes(viewer.id, postIds),
      this.resolveViewerVotes(viewer.id, postIds),
      this.communityService.getPostDiscussion(postIds),
      this.communityService.levelsFor(communityId, authorIds),
      this.communityService.creatorIdOf(communityId),
    ]);

    return {
      total,
      page,
      pageSize,
      posts: posts.map((p) =>
        this.serializePost(p, viewerLikes, viewerVotes, discussion.get(p.id), levels.get(p.userId), creatorId),
      ),
    };
  }

  async getPost(postId: string, viewer: { id: string; role?: string }) {
    const post = await this.prisma.post.findUnique({
      where: { id: postId },
      include: {
        user: {
          select: {
            id: true,
            fullName: true,
            avatarUrl: true,
            studentProfile: { select: { streakDays: true } },
          },
        },
        lesson: { select: { id: true, title: true } },
        pollOptions: { orderBy: { position: 'asc' } },
        attachments: true,
        community: {
          include: {
            course: {
              select: { id: true, title: true, slug: true, thumbnailUrl: true, instructorId: true },
            },
          },
        },
      },
    });
    if (!post || post.status === 'REMOVED') throw new NotFoundException('Post not found.');

    await this.communityService.assertMember(post.communityId!, viewer.id, viewer.role);

    // Fire-and-forget view counter
    this.prisma.post
      .update({ where: { id: postId }, data: { viewCount: { increment: 1 } } })
      .catch(() => undefined);

    const [likes, votes, isModerator, levels] = await Promise.all([
      this.resolveViewerLikes(viewer.id, [postId]),
      this.resolveViewerVotes(viewer.id, [postId]),
      this.isModeratorOf(post.communityId!, viewer),
      this.communityService.levelsFor(post.communityId!, [post.userId]),
    ]);

    return {
      ...this.serializePost(post, likes, votes, undefined, levels.get(post.userId), post.community?.course?.instructorId ?? null),
      canModerate: isModerator || post.userId === viewer.id,
      community: post.community
        ? {
            id: post.community.id,
            courseId: post.community.course?.id ?? null,
            courseTitle: post.community.course?.title ?? null,
          }
        : null,
    };
  }

  // ── Create / update / delete ───────────────────────────────────────────────

  async createPost(
    communityId: string,
    author: { id: string; role?: string },
    dto: CreatePostDto,
  ) {
    const { membership, isModerator } = await this.communityService.assertMember(
      communityId,
      author.id,
      author.role,
    );

    const postType = dto.postType ?? 'DISCUSSION';
    if (!(ALL_POST_TYPES as string[]).includes(postType)) {
      throw new BadRequestException('Invalid post type.');
    }
    if (
      (MODERATOR_POST_TYPES as readonly string[]).includes(postType) &&
      !isModerator
    ) {
      throw new ForbiddenException('Only the course creator can post announcements or challenges.');
    }
    this.communityService.assertCanWrite(membership, isModerator);

    if (postType === 'POLL') {
      if (!dto.pollOptions || dto.pollOptions.length < 2) {
        throw new BadRequestException('Polls need at least two options.');
      }
    }

    const community = await this.communityService.getCommunityById(communityId);

    // Lesson link must point at a lesson of THIS course.
    let lessonId: string | null = null;
    if (dto.lessonId) {
      const lesson = await this.prisma.lesson.findFirst({
        where: { id: dto.lessonId, section: { courseId: community.courseId! } },
        select: { id: true },
      });
      if (!lesson) throw new BadRequestException('Lesson does not belong to this course.');
      lessonId = lesson.id;
    }

    const result = await this.prisma.$transaction(async (tx) => {
      const post = await tx.post.create({
        data: {
          userId: author.id,
          communityId,
          courseId: community.courseId,
          postType,
          title: dto.title ?? null,
          contentText: dto.contentText,
          images: dto.images ?? [],
          lessonId,
          pollOptions:
            postType === 'POLL'
              ? {
                  create: (dto.pollOptions ?? []).map((o, i) => ({
                    text: o.text,
                    position: i,
                  })),
                }
              : undefined,
          attachments: dto.attachments?.length
            ? {
                create: dto.attachments.map((a) => ({
                  url: a.url,
                  filename: a.filename,
                  mimeType: a.mimeType ?? null,
                  sizeBytes: a.sizeBytes ?? null,
                })),
              }
            : undefined,
        },
        // `user` must be included — serializePost reads p.user to build the
        // author block (its absence crashed every create with
        // "Cannot read properties of undefined (reading 'id')" AFTER the tx
        // had already committed).
        include: {
          user: {
            select: {
              id: true,
              fullName: true,
              avatarUrl: true,
              studentProfile: { select: { streakDays: true } },
            },
          },
          pollOptions: { orderBy: { position: 'asc' } },
          attachments: true,
        },
      });

      const xpAwarded = await this.awardXpWithCap(tx, author.id, COMMUNITY_POST_SOURCE, POST_XP, POST_COINS, MAX_PAID_POSTS_PER_DAY);
      return { post, xpAwarded };
    });

    this.eventEmitter.emit(
      'community.post.created',
      new PostCreatedEvent(
        result.post.id,
        author.id,
        communityId,
        community.courseId,
        postType,
        result.post.title,
        result.post.contentText.slice(0, 140),
        extractMentionIds(dto.contentText),
      ),
    );

    // Credit the weekly league standings (async, non-blocking).
    if (result.xpAwarded.xp > 0) {
      this.eventEmitter.emit(
        'xp.awarded',
        new XpAwardedEvent(author.id, result.xpAwarded.xp, 'COMMUNITY_POST'),
      );
    }

    return {
      ...this.serializePost(result.post as any),
      xpAwarded: result.xpAwarded,
      myMembershipRole: membership?.role ?? 'ADMIN',
    };
  }

  async updatePost(postId: string, editor: { id: string; role?: string }, dto: UpdatePostDto) {
    const post = await this.getExistingPost(postId);
    const isMod = await this.isModeratorOf(post.communityId!, editor);
    if (post.userId !== editor.id && !isMod) {
      throw new ForbiddenException('You can only edit your own posts.');
    }

    const updated = await this.prisma.post.update({
      where: { id: postId },
      data: {
        ...(dto.title !== undefined ? { title: dto.title } : {}),
        ...(dto.contentText !== undefined ? { contentText: dto.contentText } : {}),
        ...(dto.images !== undefined ? { images: dto.images } : {}),
        editedAt: new Date(),
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
        pollOptions: { orderBy: { position: 'asc' } },
        attachments: true,
      },
    });
    return this.serializePost(updated as any);
  }

  /** Soft-delete — removed posts vanish from feeds but keep reply integrity. */
  async deletePost(postId: string, deleter: { id: string; role?: string }) {
    const post = await this.getExistingPost(postId);
    const isMod = await this.isModeratorOf(post.communityId!, deleter);
    if (post.userId !== deleter.id && !isMod) {
      throw new ForbiddenException('You can only delete your own posts.');
    }
    await this.prisma.post.update({
      where: { id: postId },
      data: { status: 'REMOVED', isPinned: false },
    });
    return { success: true };
  }

  async setPinned(postId: string, moderator: { id: string; role?: string }, value: boolean) {
    const post = await this.getExistingPost(postId);
    await this.communityService.assertModerator(post.communityId!, moderator.id, moderator.role);
    return this.prisma.post.update({
      where: { id: postId },
      data: { isPinned: value },
      select: { id: true, isPinned: true },
    });
  }

  async setLocked(postId: string, moderator: { id: string; role?: string }, value: boolean) {
    const post = await this.getExistingPost(postId);
    await this.communityService.assertModerator(post.communityId!, moderator.id, moderator.role);
    return this.prisma.post.update({
      where: { id: postId },
      data: { isLocked: value },
      select: { id: true, isLocked: true },
    });
  }

  // ── Likes & polls ──────────────────────────────────────────────────────────

  async likePost(postId: string, userId: string, userRole?: string) {
    const post = await this.getExistingPost(postId);
    await this.communityService.assertMember(post.communityId!, userId, userRole);

    // One batched round trip: a second like fails on the unique constraint
    // and rolls the counter back with it.
    let created = false;
    try {
      await this.prisma.$transaction([
        this.prisma.like.create({ data: { userId, entityType: 'POST', entityId: postId } }),
        this.prisma.post.update({ where: { id: postId }, data: { likeCount: { increment: 1 } } }),
      ]);
      created = true;
    } catch {
      created = false; // already liked
    }

    if (created && post.userId !== userId) {
      this.eventEmitter.emit(
        'community.content.liked',
        new ContentLikedEvent(
          userId,
          post.userId,
          'POST',
          postId,
          (post.title ?? post.contentText).slice(0, 100),
        ),
      );
    }
    return { liked: created, likeCount: post.likeCount + (created ? 1 : 0) };
  }

  async unlikePost(postId: string, userId: string, userRole?: string) {
    const post = await this.getExistingPost(postId);
    await this.communityService.assertMember(post.communityId!, userId, userRole);

    const removed = await this.prisma.$transaction(async (tx) => {
      const res = await tx.like.deleteMany({
        where: { userId, entityType: 'POST', entityId: postId },
      });
      if (res.count === 0) return false;
      await tx.post.update({
        where: { id: postId },
        data: { likeCount: { decrement: 1 } },
      });
      return true;
    });
    return { liked: false, likeCount: Math.max(0, post.likeCount - (removed ? 1 : 0)) };
  }

  /** Single vote per user per poll (DB-enforced); switching moves the count. */
  async votePoll(
    postId: string,
    voter: { id: string; role?: string },
    optionId: string,
  ) {
    const post = await this.getExistingPost(postId);
    await this.communityService.assertMember(post.communityId!, voter.id, voter.role);
    if (post.postType !== 'POLL') throw new BadRequestException('This post is not a poll.');
    if (post.isLocked) throw new BadRequestException('Voting is closed on this poll.');

    const option = await this.prisma.pollOption.findFirst({
      where: { id: optionId, postId },
      orderBy: { position: 'asc' },
    });
    if (!option) throw new BadRequestException('Invalid poll option.');

    return this.prisma.$transaction(async (tx) => {
      const existing = await tx.pollVote.findUnique({
        where: { postId_userId: { postId, userId: voter.id } },
      });
      if (existing?.optionId === optionId) {
        const options = await tx.pollOption.findMany({
          where: { postId },
          orderBy: { position: 'asc' },
        });
        return { options, votedOptionId: existing.optionId };
      }

      if (existing) {
        await Promise.all([
          tx.pollOption.update({
            where: { id: existing.optionId },
            data: { voteCount: { decrement: 1 } },
          }),
          tx.pollVote.update({
            where: { id: existing.id },
            data: { optionId },
          }),
        ]);
      } else {
        await tx.pollVote.create({
          data: { postId, optionId, userId: voter.id },
        });
      }
      await tx.pollOption.update({
        where: { id: optionId },
        data: { voteCount: { increment: 1 } },
      });

      const options = await tx.pollOption.findMany({
        where: { postId },
        orderBy: { position: 'asc' },
      });
      return { options, votedOptionId: optionId };
    });
  }

  // ── Internals ──────────────────────────────────────────────────────────────

  private async getExistingPost(postId: string) {
    const post = await this.prisma.post.findUnique({ where: { id: postId } });
    if (!post || post.status === 'REMOVED') throw new NotFoundException('Post not found.');
    return post;
  }

  private async isModeratorOf(
    communityId: string,
    user: { id: string; role?: string },
  ): Promise<boolean> {
    try {
      await this.communityService.assertModerator(communityId, user.id, user.role);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Awards XP + coins inside the caller's transaction, gated by a per-day cap
   * measured against today's reward rows for the given source. Returns what
   * was actually paid so the API can tell the client ("+15 XP" vs nothing).
   */
  private async awardXpWithCap(
    tx: Prisma.TransactionClient,
    userId: string,
    source: string,
    xp: number,
    coins: number,
    maxPerDay: number,
    timezoneOffsetMinutes = 0,
  ): Promise<{ xp: number; coins: number }> {
    const profile = await tx.studentProfile.findUnique({
      where: { userId },
      select: { id: true },
    });
    if (!profile) return { xp: 0, coins: 0 }; // creators without student profiles don't farm XP

    const nowMs = Date.now() - timezoneOffsetMinutes * 60 * 1000;
    const dayStart = new Date(nowMs);
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

  private async resolveViewerLikes(viewerId: string, postIds: string[]) {
    if (postIds.length === 0) return new Set<string>();
    const likes = await this.prisma.like.findMany({
      where: { userId: viewerId, entityType: 'POST', entityId: { in: postIds } },
      select: { entityId: true },
    });
    return new Set(likes.map((l) => l.entityId));
  }

  private async resolveViewerVotes(viewerId: string, postIds: string[]) {
    if (postIds.length === 0) return new Map<string, string>();
    const votes = await this.prisma.pollVote.findMany({
      where: { userId: viewerId, postId: { in: postIds } },
      select: { postId: true, optionId: true },
    });
    return new Map(votes.map((v) => [v.postId, v.optionId]));
  }

  /** Shared card shape for list/detail/create responses. */
  private serializePost(
    p: any,
    likedByMe?: Set<string>,
    myVotes?: Map<string, string>,
    discussion?: {
      lastCommentAt: Date | null;
      commenters: { id: string; fullName: string; avatarUrl: string | null }[];
    },
    /** The author's community level (Skool's number on the avatar). */
    authorLevel?: number,
    /** The course creator: their posts carry the CREATOR badge. */
    creatorId?: string | null,
  ) {
    return {
      id: p.id,
      postType: p.postType,
      title: p.title,
      contentText: p.contentText,
      images: p.images ?? [],
      isPinned: p.isPinned,
      isLocked: p.isLocked,
      editedAt: p.editedAt,
      likeCount: p.likeCount,
      commentCount:
        typeof p.commentCount === 'number'
          ? p.commentCount
          : (p._count?.comments ?? 0),
      viewCount: p.viewCount,
      lastActivityAt: p.lastActivityAt,
      createdAt: p.createdAt,
      author: {
        id: p.user?.id ?? p.userId,
        fullName: p.user?.fullName ?? 'Community member',
        avatarUrl: p.user?.avatarUrl ?? null,
        streakDays: p.user?.studentProfile?.streakDays ?? 0,
        level: authorLevel ?? 1,
        isCreator: !!creatorId && (p.user?.id ?? p.userId) === creatorId,
      },
      lesson: p.lesson ? { id: p.lesson.id, title: p.lesson.title } : null,
      attachments: p.attachments ?? [],
      poll:
        p.postType === 'POLL' && p.pollOptions
          ? {
              options: p.pollOptions.map((o: any) => ({
                id: o.id,
                text: o.text,
                voteCount: o.voteCount,
              })),
              myOptionId: myVotes?.get(p.id) ?? null,
            }
          : null,
      likedByMe: likedByMe ? likedByMe.has(p.id) : false,
      userId: p.userId,
      /** Facepile + "new comment Xh ago" line. Absent on detail/create responses. */
      commenters: discussion?.commenters ?? [],
      lastCommentAt: discussion?.lastCommentAt ?? null,
    };
  }
}
