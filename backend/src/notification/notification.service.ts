import { Injectable, Logger } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

export interface CreateNotificationInput {
  userId: string; // recipient
  actorId?: string | null; // who triggered it
  type: string;
  entityType?: string | null;
  entityId?: string | null;
  title?: string | null;
  body?: string | null;
}

@Injectable()
export class NotificationsService {
  private readonly logger = new Logger(NotificationsService.name);

  constructor(private prisma: PrismaService) {}

  /**
   * Fans out notification rows in one insert. Never throws — a failed
   * fanout must not break the action that triggered it.
   */
  async createMany(rows: CreateNotificationInput[]): Promise<void> {
    if (rows.length === 0) return;
    try {
      // Dedupe (recipient, type, entity) — e.g. an announcement mention shouldn't double-notify
      const seen = new Set<string>();
      const unique = rows.filter((r) => {
        const key = `${r.userId}:${r.type}:${r.entityId ?? ""}`;
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      });

      await this.prisma.notification.createMany({
        data: unique.map((r) => ({
          userId: r.userId,
          actorId: r.actorId ?? null,
          type: r.type,
          entityType: r.entityType ?? null,
          entityId: r.entityId ?? null,
          title: r.title ?? null,
          body: r.body ?? null,
        })),
        skipDuplicates: true,
      });
    } catch (err) {
      this.logger.error("Notification fanout failed", err as Error);
    }
  }

  /** Paginated inbox, newest first. */
  async list(
    userId: string,
    opts: { page?: number; pageSize?: number; unreadOnly?: boolean } = {},
  ) {
    const page = Math.max(1, opts.page ?? 1);
    const pageSize = Math.min(50, Math.max(1, opts.pageSize ?? 20));
    const where = {
      userId,
      ...(opts.unreadOnly ? { isRead: false } : {}),
    };

    const [total, items] = await Promise.all([
      this.prisma.notification.count({ where }),
      this.prisma.notification.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * pageSize,
        take: pageSize,
        include: {
          actor: { select: { id: true, fullName: true, avatarUrl: true } },
        },
      }),
    ]);

    return { total, page, pageSize, items };
  }

  async getUnreadCount(userId: string): Promise<{ unreadCount: number }> {
    const unreadCount = await this.prisma.notification.count({
      where: { userId, isRead: false },
    });
    return { unreadCount };
  }

  /**
   * Marks notifications read. With `ids` → only those (must belong to the
   * caller); without → everything unread.
   */
  async markRead(userId: string, ids?: string[]): Promise<{ success: true }> {
    const where: { userId: string; isRead: boolean; id?: { in: string[] } } = {
      userId,
      isRead: false,
    };
    if (ids && ids.length > 0) where.id = { in: ids };

    await this.prisma.notification.updateMany({
      where,
      data: { isRead: true },
    });
    return { success: true };
  }
}
