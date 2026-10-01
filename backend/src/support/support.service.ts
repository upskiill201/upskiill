import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { randomBytes } from 'crypto';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { NotificationsService } from '../notification/notification.service';
import type {
  CreateTicketDto,
  SupportAudience,
  SupportKind,
  SupportStatus,
} from './support.dto';

/**
 * Help & feedback. A learner or creator opens a conversation (feedback, an
 * idea, a bug, a question), Teyro's team answers from /admin/support, and the
 * answer lands in the bell of the app it came from:
 *
 *   LEARNER → SUPPORT_REPLY         → /dashboard/help/:id
 *   CREATOR → STUDIO_SUPPORT_REPLY  → /creator/help/:id   (studio scope)
 *
 * Every user-facing query is scoped to req.user.id; only admins see others'.
 */

const DEFAULT_SUBJECT: Record<SupportKind, string> = {
  FEEDBACK: 'Feedback',
  IDEA: 'An idea for Teyro',
  BUG: 'Something isn’t working',
  HELP: 'I need help',
  ACCOUNT: 'Account question',
  PAYMENT: 'Payments question',
  COURSE: 'Course question',
};

const ALPHABET = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
function publicId(): string {
  const bytes = randomBytes(6);
  let out = '';
  for (const b of bytes) out += ALPHABET[b % ALPHABET.length];
  return `TS-${out}`;
}

const FACE = { select: { id: true, fullName: true, avatarUrl: true } } as const;

@Injectable()
export class SupportService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly notifications: NotificationsService,
  ) {}

  /* ─── the user's side ─────────────────────────────────────────────── */

  async create(userId: string, dto: CreateTicketDto, userAgent?: string) {
    if (dto.audience === 'CREATOR') {
      const u = await this.prisma.user.findUnique({
        where: { id: userId },
        select: { hasCreatorAccess: true, role: true },
      });
      if (!u?.hasCreatorAccess && u?.role !== 'ADMIN')
        throw new ForbiddenException('Creator support is for creators.');
    }
    const message = dto.message.trim();
    const subject =
      dto.subject?.trim() ||
      (dto.kind === 'FEEDBACK' || dto.kind === 'IDEA'
        ? message.split('\n')[0].slice(0, 80)
        : '') ||
      DEFAULT_SUBJECT[dto.kind];

    // publicId collisions are astronomically rare; retry once on the unique index.
    for (let attempt = 0; ; attempt++) {
      try {
        const ticket = await this.prisma.supportTicket.create({
          data: {
            publicId: publicId(),
            userId,
            audience: dto.audience,
            kind: dto.kind,
            subject: subject.slice(0, 140),
            mood: dto.kind === 'FEEDBACK' ? (dto.mood ?? null) : null,
            pagePath: dto.pagePath?.slice(0, 300) ?? null,
            userAgent: userAgent?.slice(0, 300) ?? null,
            replies: { create: { authorId: userId, message } },
          },
          select: { id: true, publicId: true },
        });
        return ticket;
      } catch (err) {
        if (
          attempt === 0 &&
          err instanceof Prisma.PrismaClientKnownRequestError &&
          err.code === 'P2002'
        )
          continue;
        throw err;
      }
    }
  }

  async listMine(userId: string, audience?: SupportAudience) {
    const rows = await this.prisma.supportTicket.findMany({
      where: { userId, ...(audience ? { audience } : {}) },
      orderBy: { lastActivityAt: 'desc' },
      take: 50,
      select: {
        id: true,
        publicId: true,
        kind: true,
        subject: true,
        status: true,
        userUnread: true,
        lastActivityAt: true,
        createdAt: true,
        _count: { select: { replies: true } },
        replies: {
          orderBy: { createdAt: 'desc' },
          take: 1,
          select: { message: true, isStaff: true },
        },
      },
    });
    return rows.map(({ replies, _count, ...t }) => ({
      ...t,
      messages: _count.replies,
      preview: replies[0]
        ? {
            text: replies[0].message.slice(0, 140),
            fromTeyro: replies[0].isStaff,
          }
        : null,
    }));
  }

  async unreadCount(userId: string, audience?: SupportAudience) {
    const unread = await this.prisma.supportTicket.count({
      where: { userId, userUnread: true, ...(audience ? { audience } : {}) },
    });
    return { unread };
  }

  async getMine(userId: string, id: string) {
    const ticket = await this.findThread({ id, userId });
    if (ticket.userUnread) {
      await this.prisma.supportTicket.update({
        where: { id: ticket.id },
        data: { userUnread: false },
      });
    }
    return { ...this.present(ticket, false), userUnread: false };
  }

  async replyMine(userId: string, id: string, message: string) {
    const ticket = await this.prisma.supportTicket.findFirst({
      where: { id, userId },
      select: { id: true },
    });
    if (!ticket) throw new NotFoundException('Conversation not found');
    await this.prisma.$transaction([
      this.prisma.supportReply.create({
        data: { ticketId: id, authorId: userId, message: message.trim() },
      }),
      // A reply from the user always puts it back in the team's queue.
      this.prisma.supportTicket.update({
        where: { id },
        data: { status: 'OPEN', lastActivityAt: new Date() },
      }),
    ]);
    return this.getMine(userId, id);
  }

  async closeMine(userId: string, id: string) {
    const moved = await this.prisma.supportTicket.updateMany({
      where: { id, userId },
      data: { status: 'CLOSED', userUnread: false },
    });
    if (moved.count === 0)
      throw new NotFoundException('Conversation not found');
    return { status: 'CLOSED' as const };
  }

  /* ─── the team's side ─────────────────────────────────────────────── */

  async adminList(filter: {
    status?: SupportStatus;
    audience?: SupportAudience;
    kind?: SupportKind;
    q?: string;
  }) {
    const q = filter.q?.trim();
    const where: Prisma.SupportTicketWhereInput = {
      ...(filter.status ? { status: filter.status } : {}),
      ...(filter.audience ? { audience: filter.audience } : {}),
      ...(filter.kind ? { kind: filter.kind } : {}),
      ...(q
        ? {
            OR: [
              { publicId: { contains: q.toUpperCase() } },
              { subject: { contains: q, mode: 'insensitive' } },
              { user: { email: { contains: q, mode: 'insensitive' } } },
              { user: { fullName: { contains: q, mode: 'insensitive' } } },
            ],
          }
        : {}),
    };
    const [items, counts, moods] = await Promise.all([
      this.prisma.supportTicket.findMany({
        where,
        orderBy: { lastActivityAt: 'desc' },
        take: 100,
        select: {
          id: true,
          publicId: true,
          audience: true,
          kind: true,
          subject: true,
          status: true,
          mood: true,
          lastActivityAt: true,
          createdAt: true,
          user: FACE,
          _count: { select: { replies: true } },
        },
      }),
      Promise.all(
        (['OPEN', 'ANSWERED', 'CLOSED'] as const).map((status) =>
          this.prisma.supportTicket.count({ where: { status } }),
        ),
      ),
      this.prisma.supportTicket.aggregate({
        where: {
          mood: { not: null },
          createdAt: { gte: new Date(Date.now() - 30 * 86_400_000) },
        },
        _avg: { mood: true },
        _count: { mood: true },
      }),
    ]);
    return {
      items: items.map(({ _count, ...t }) => ({
        ...t,
        messages: _count.replies,
      })),
      counts: { OPEN: counts[0], ANSWERED: counts[1], CLOSED: counts[2] },
      mood30d: {
        avg: moods._avg.mood ? Math.round(moods._avg.mood * 10) / 10 : null,
        count: moods._count.mood,
      },
    };
  }

  async adminGet(id: string) {
    const ticket = await this.findThread({ id });
    const user = await this.prisma.user.findUnique({
      where: { id: ticket.userId },
      select: {
        id: true,
        fullName: true,
        email: true,
        avatarUrl: true,
        role: true,
        createdAt: true,
      },
    });
    return { ...this.present(ticket, true), user };
  }

  async adminReply(adminId: string, id: string, message: string) {
    const ticket = await this.prisma.supportTicket.findUnique({
      where: { id },
      select: { id: true, userId: true, audience: true, subject: true },
    });
    if (!ticket) throw new NotFoundException('Conversation not found');
    await this.prisma.$transaction([
      this.prisma.supportReply.create({
        data: {
          ticketId: id,
          authorId: adminId,
          isStaff: true,
          message: message.trim(),
        },
      }),
      this.prisma.supportTicket.update({
        where: { id },
        data: {
          status: 'ANSWERED',
          userUnread: true,
          lastActivityAt: new Date(),
        },
      }),
    ]);
    const creator = ticket.audience === 'CREATOR';
    await this.notifications.createMany([
      {
        userId: ticket.userId,
        type: creator ? 'STUDIO_SUPPORT_REPLY' : 'SUPPORT_REPLY',
        entityType: 'SupportTicket',
        entityId: `${id}:${Date.now()}`,
        title: 'Teyro Support replied',
        body: ticket.subject,
        deepLink: creator ? `/creator/help/${id}` : `/dashboard/help/${id}`,
      },
    ]);
    return this.adminGet(id);
  }

  async adminSetStatus(id: string, status: SupportStatus) {
    const moved = await this.prisma.supportTicket.updateMany({
      where: { id },
      data: { status },
    });
    if (moved.count === 0)
      throw new NotFoundException('Conversation not found');
    return { status };
  }

  /* ─── shared ──────────────────────────────────────────────────────── */

  private async findThread(where: { id: string; userId?: string }) {
    const ticket = await this.prisma.supportTicket.findFirst({
      where,
      include: {
        replies: {
          orderBy: { createdAt: 'asc' },
          select: {
            id: true,
            isStaff: true,
            message: true,
            createdAt: true,
            author: FACE,
          },
        },
      },
    });
    if (!ticket) throw new NotFoundException('Conversation not found');
    return ticket;
  }

  /** Staff names stay private to the team: users just see "Teyro Support". */
  private present(
    ticket: Awaited<ReturnType<SupportService['findThread']>>,
    forStaff: boolean,
  ) {
    const { replies, userAgent, ...rest } = ticket;
    return {
      ...rest,
      ...(forStaff ? { userAgent } : {}),
      replies: replies.map((r) => ({
        id: r.id,
        fromTeyro: r.isStaff,
        message: r.message,
        createdAt: r.createdAt,
        author: r.isStaff && !forStaff ? null : r.author,
      })),
    };
  }
}
