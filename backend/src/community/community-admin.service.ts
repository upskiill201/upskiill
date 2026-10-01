import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CommunityService } from './community.service';

export type QueueTab = 'questions' | 'recent' | 'pinned' | 'announcements';
const QUEUE_TABS: QueueTab[] = ['questions', 'recent', 'pinned', 'announcements'];
export const MUTE_DAYS = [1, 7, 30] as const;

const DAY_MS = 24 * 60 * 60 * 1000;

/**
 * The creator runs their course community from the studio: questions that
 * still need their answer, everything recent, pinned posts, members (with a
 * mute for the rare bad actor) and the About text. Pin, lock, remove, reply
 * and announcements reuse the community's own endpoints, which already
 * treat the creator as the admin.
 *
 * Every method checks the caller moderates THIS community (the course's
 * creator, or a platform admin).
 */
@Injectable()
export class CommunityAdminService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly communities: CommunityService,
  ) {}

  /** Every community the creator runs, with what needs them. */
  async listManaged(creatorId: string) {
    const rows = await this.prisma.community.findMany({
      where: { course: { instructorId: creatorId } },
      select: {
        id: true,
        name: true,
        description: true,
        memberCount: true,
        course: { select: { id: true, title: true, category: true, thumbnailUrl: true, published: true } },
      },
      orderBy: { memberCount: 'desc' },
    });
    const weekAgo = new Date(Date.now() - 7 * DAY_MS);
    return Promise.all(
      rows.map(async (c) => {
        const [postsThisWeek, unanswered, muted] = await Promise.all([
          this.prisma.post.count({ where: { communityId: c.id, status: 'ACTIVE', createdAt: { gte: weekAgo } } }),
          this.prisma.post.count({ where: this.unansweredWhere(c.id, creatorId) }),
          this.prisma.communityMembership.count({ where: { communityId: c.id, mutedUntil: { gt: new Date() } } }),
        ]);
        return {
          id: c.id,
          name: c.name,
          description: c.description,
          members: c.memberCount,
          course: c.course,
          postsThisWeek,
          unanswered,
          muted,
        };
      }),
    );
  }

  /** A moderation list. `questions` = questions without the creator's reply, oldest waiting first. */
  async queue(user: { id: string; role?: string }, communityId: string, tab: string, page = 1) {
    await this.communities.assertModerator(communityId, user.id, user.role);
    const creatorId = (await this.communities.creatorIdOf(communityId)) ?? user.id;
    const which: QueueTab = (QUEUE_TABS as string[]).includes(tab) ? (tab as QueueTab) : 'questions';
    const pageSize = 20;
    const where: Prisma.PostWhereInput =
      which === 'questions'
        ? this.unansweredWhere(communityId, creatorId)
        : which === 'pinned'
          ? { communityId, status: 'ACTIVE', isPinned: true }
          : which === 'announcements'
            ? { communityId, status: 'ACTIVE', postType: { in: ['ANNOUNCEMENT', 'CHALLENGE'] } }
            : { communityId, status: 'ACTIVE' };
    const [total, posts] = await Promise.all([
      this.prisma.post.count({ where }),
      this.prisma.post.findMany({
        where,
        orderBy: which === 'questions' ? { createdAt: 'asc' } : { createdAt: 'desc' },
        skip: (Math.max(1, page) - 1) * pageSize,
        take: pageSize,
        select: {
          id: true,
          postType: true,
          title: true,
          contentText: true,
          images: true,
          isPinned: true,
          isLocked: true,
          likeCount: true,
          commentCount: true,
          createdAt: true,
          lastActivityAt: true,
          user: { select: { id: true, fullName: true, avatarUrl: true } },
          lesson: { select: { id: true, title: true } },
          comments: { where: { userId: creatorId, status: 'ACTIVE' }, select: { id: true }, take: 1 },
        },
      }),
    ]);
    return {
      tab: which,
      total,
      page,
      pageSize,
      posts: posts.map((p) => ({
        id: p.id,
        postType: p.postType,
        title: p.title,
        excerpt: p.contentText.slice(0, 280),
        imageCount: p.images?.length ?? 0,
        isPinned: p.isPinned,
        isLocked: p.isLocked,
        likeCount: p.likeCount,
        commentCount: p.commentCount,
        createdAt: p.createdAt,
        lastActivityAt: p.lastActivityAt,
        author: { ...p.user, isCreator: p.user.id === creatorId },
        lesson: p.lesson,
        answeredByYou: p.comments.length > 0,
      })),
    };
  }

  /** Members with their community level, newest first; muted ones flagged. */
  async members(
    user: { id: string; role?: string },
    communityId: string,
    opts: { search?: string; filter?: string; page?: number },
  ) {
    await this.communities.assertModerator(communityId, user.id, user.role);
    const pageSize = 30;
    const page = Math.max(1, opts.page ?? 1);
    const search = opts.search?.trim().slice(0, 60);
    const where: Prisma.CommunityMembershipWhereInput = {
      communityId,
      ...(opts.filter === 'muted' ? { mutedUntil: { gt: new Date() } } : {}),
      ...(search ? { user: { fullName: { contains: search, mode: 'insensitive' } } } : {}),
    };
    const [total, rows] = await Promise.all([
      this.prisma.communityMembership.count({ where }),
      this.prisma.communityMembership.findMany({
        where,
        orderBy: [{ role: 'asc' }, { joinedAt: 'desc' }],
        skip: (page - 1) * pageSize,
        take: pageSize,
        select: {
          role: true,
          joinedAt: true,
          mutedUntil: true,
          // PRIVACY PROJECTION — identity only, never contact details
          user: {
            select: {
              id: true,
              fullName: true,
              avatarUrl: true,
              profile: { select: { username: true } },
              studentProfile: { select: { streakDays: true } },
            },
          },
        },
      }),
    ]);
    const levels = await this.communities.levelsFor(
      communityId,
      rows.map((r) => r.user.id),
    );
    const now = Date.now();
    return {
      total,
      page,
      pageSize,
      members: rows.map((r) => ({
        id: r.user.id,
        fullName: r.user.fullName,
        avatarUrl: r.user.avatarUrl,
        username: r.user.profile?.username ?? null,
        streakDays: r.user.studentProfile?.streakDays ?? 0,
        level: levels.get(r.user.id) ?? 1,
        isCreator: r.role === 'ADMIN',
        joinedAt: r.joinedAt,
        mutedUntil: r.mutedUntil && r.mutedUntil.getTime() > now ? r.mutedUntil : null,
      })),
    };
  }

  /** Pause a member's posting for 1, 7 or 30 days; `days: null` lifts it. */
  async mute(user: { id: string; role?: string }, communityId: string, memberId: string, days: number | null) {
    await this.communities.assertModerator(communityId, user.id, user.role);
    if (days !== null && !(MUTE_DAYS as readonly number[]).includes(days)) {
      throw new BadRequestException('Mute for 1, 7 or 30 days.');
    }
    const membership = await this.prisma.communityMembership.findUnique({
      where: { userId_communityId: { userId: memberId, communityId } },
      select: { role: true },
    });
    if (!membership) throw new NotFoundException('Member not found.');
    if (membership.role === 'ADMIN') throw new BadRequestException("The creator can't be muted.");
    const mutedUntil = days === null ? null : new Date(Date.now() + days * DAY_MS);
    await this.prisma.communityMembership.update({
      where: { userId_communityId: { userId: memberId, communityId } },
      data: { mutedUntil },
    });
    // Their cached access carries the old membership row; drop it so the
    // mute (or its lifting) applies to their very next post.
    this.communities.forgetAccess(communityId, memberId);
    return { id: memberId, mutedUntil };
  }

  /** The community's About text. */
  async update(user: { id: string; role?: string }, communityId: string, description: string) {
    await this.communities.assertModerator(communityId, user.id, user.role);
    const updated = await this.prisma.community.update({
      where: { id: communityId },
      data: { description: description.trim() || null },
      select: { id: true, description: true },
    });
    return updated;
  }

  private unansweredWhere(communityId: string, creatorId: string): Prisma.PostWhereInput {
    return {
      communityId,
      postType: 'QUESTION',
      status: 'ACTIVE',
      userId: { not: creatorId },
      createdAt: { gte: new Date(Date.now() - 60 * DAY_MS) },
      comments: { none: { userId: creatorId, status: 'ACTIVE' } },
    };
  }
}
