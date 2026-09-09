import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AccountStatus, Prisma, Role } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

const MAX_PAGE_SIZE = 100;
const DEFAULT_PAGE_SIZE = 25;
const HISTORY_LIMIT = 20;

export interface ListUsersQuery {
  page?: string;
  pageSize?: string;
  search?: string;
  role?: string;
  accountStatus?: string;
  sortBy?: string;
  sortDir?: string;
}

const SORTABLE_FIELDS = new Set([
  'createdAt',
  'lastActiveAt',
  'lastLoginAt',
  'fullName',
]);

/**
 * Backend for /admin/users — list, detail, and the one write action this
 * phase ships (suspend/unsuspend). Deliberately does NOT touch XP/coins/
 * hearts: those live across three not-quite-synced sources of truth
 * (StudentProfile, UserStats, GemTransaction) and the only existing helper
 * that writes them (gamification.service#grantTestReward) is a test-only
 * shortcut that skips the transaction ledger — not safe to build a real
 * admin action on top of without a closer look at that reconciliation.
 * Suspend/unsuspend is safe because AccountStatus is a single field with one
 * source of truth.
 */
@Injectable()
export class AdminUsersService {
  constructor(private readonly prisma: PrismaService) {}

  async list(query: ListUsersQuery) {
    const page = Math.max(1, parseInt(query.page ?? '1', 10) || 1);
    const pageSize = Math.min(
      MAX_PAGE_SIZE,
      Math.max(
        1,
        parseInt(query.pageSize ?? String(DEFAULT_PAGE_SIZE), 10) ||
          DEFAULT_PAGE_SIZE,
      ),
    );

    const where: Prisma.UserWhereInput = {};

    if (query.search?.trim()) {
      const term = query.search.trim();
      where.OR = [
        { fullName: { contains: term, mode: 'insensitive' } },
        { email: { contains: term, mode: 'insensitive' } },
      ];
    }

    if (query.role) {
      if (!(query.role in Role)) {
        throw new BadRequestException(`Unknown role: ${query.role}`);
      }
      where.role = query.role as Role;
    }

    if (query.accountStatus) {
      if (!(query.accountStatus in AccountStatus)) {
        throw new BadRequestException(
          `Unknown account status: ${query.accountStatus}`,
        );
      }
      where.accountStatus = query.accountStatus as AccountStatus;
    }

    const sortBy = SORTABLE_FIELDS.has(query.sortBy ?? '')
      ? query.sortBy!
      : 'createdAt';
    const sortDir = query.sortDir === 'asc' ? 'asc' : 'desc';

    const [items, total] = await Promise.all([
      this.prisma.user.findMany({
        where,
        select: {
          id: true,
          fullName: true,
          email: true,
          role: true,
          accountStatus: true,
          avatarUrl: true,
          createdAt: true,
          lastActiveAt: true,
          lastLoginAt: true,
          hasStudentAccess: true,
          hasCreatorAccess: true,
        },
        orderBy: { [sortBy]: sortDir },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      this.prisma.user.count({ where }),
    ]);

    return { items, total, page, pageSize };
  }

  async detail(id: string) {
    const account = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        fullName: true,
        email: true,
        role: true,
        accountStatus: true,
        avatarUrl: true,
        createdAt: true,
        emailVerifiedAt: true,
        isVerified: true,
        lastLoginAt: true,
        lastActiveAt: true,
        loginCount: true,
        failedLoginAttempts: true,
        whatsappVerified: true,
        hasStudentAccess: true,
        hasCreatorAccess: true,
      },
    });
    if (!account) throw new NotFoundException('User not found');

    const [studentProfile, activity, economy, adminHistory] = await Promise.all(
      [
        this.prisma.studentProfile.findUnique({
          where: { userId: id },
          select: {
            xp: true,
            coins: true,
            gems: true,
            streakDays: true,
            longestStreak: true,
            lives: true,
            maxLives: true,
            leagueTier: true,
            dailyGoalXp: true,
          },
        }),
        this.prisma.learningEvent.findMany({
          where: { userId: id },
          orderBy: { createdAt: 'desc' },
          take: HISTORY_LIMIT,
          select: {
            eventType: true,
            entityType: true,
            entityId: true,
            createdAt: true,
          },
        }),
        this.prisma.gemTransaction.findMany({
          where: { userId: id },
          orderBy: { createdAt: 'desc' },
          take: HISTORY_LIMIT,
          select: { type: true, amount: true, source: true, createdAt: true },
        }),
        this.prisma.adminAuditLog.findMany({
          where: { entityType: 'User', entityId: id },
          orderBy: { createdAt: 'desc' },
          take: HISTORY_LIMIT,
        }),
      ],
    );

    return {
      account,
      learning: studentProfile,
      activity,
      economy,
      adminHistory,
    };
  }

  async suspend(actorId: string, id: string, reason: string) {
    if (!reason?.trim()) {
      throw new BadRequestException(
        'A written reason is required to suspend an account',
      );
    }
    if (id === actorId) {
      throw new BadRequestException('You cannot suspend your own account');
    }

    const user = await this.prisma.user.findUnique({
      where: { id },
      select: { accountStatus: true },
    });
    if (!user) throw new NotFoundException('User not found');
    if (user.accountStatus === 'SUSPENDED') {
      throw new BadRequestException('This account is already suspended');
    }

    await this.prisma.$transaction([
      this.prisma.user.update({
        where: { id },
        data: { accountStatus: 'SUSPENDED' },
      }),
      this.prisma.adminAuditLog.create({
        data: {
          actorId,
          action: 'ADMIN_SUSPENDED_USER',
          entityType: 'User',
          entityId: id,
          reason: reason.trim(),
          meta: { previousStatus: user.accountStatus },
        },
      }),
    ]);

    return { accountStatus: 'SUSPENDED' as const };
  }

  async unsuspend(actorId: string, id: string, reason?: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: { accountStatus: true },
    });
    if (!user) throw new NotFoundException('User not found');
    if (user.accountStatus !== 'SUSPENDED') {
      throw new BadRequestException('This account is not suspended');
    }

    await this.prisma.$transaction([
      this.prisma.user.update({
        where: { id },
        data: { accountStatus: 'ACTIVE' },
      }),
      this.prisma.adminAuditLog.create({
        data: {
          actorId,
          action: 'ADMIN_UNSUSPENDED_USER',
          entityType: 'User',
          entityId: id,
          reason: reason?.trim() || null,
          meta: { previousStatus: user.accountStatus },
        },
      }),
    ]);

    return { accountStatus: 'ACTIVE' as const };
  }
}
