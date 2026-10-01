import { Injectable, Logger } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { EmailCategory } from './types';

export interface CreateLogInput {
  userId?: string;
  email: string;
  templateKey: string;
  category: EmailCategory;
  idempotencyKey: string;
  metadata?: Record<string, unknown>;
}

/** Prisma's P2002 unique-constraint-violation code. */
const UNIQUE_VIOLATION = 'P2002';

@Injectable()
export class EmailLogService {
  private readonly logger = new Logger(EmailLogService.name);

  constructor(private readonly prisma: PrismaService) {}

  /**
   * Reserves the idempotency slot for this send. Returns null if a row for
   * this idempotencyKey already exists — the caller must treat that as
   * "already handled, do not send again". The uniqueness is a DB constraint
   * (email_logs_idempotencyKey_key), so this is race-safe across processes:
   * two workers racing to send the same logical email both attempt this
   * insert, exactly one succeeds.
   */
  async reserve(input: CreateLogInput): Promise<{ id: string } | null> {
    try {
      const row = await this.prisma.emailLog.create({
        data: {
          userId: input.userId,
          email: input.email,
          templateKey: input.templateKey,
          category: input.category,
          idempotencyKey: input.idempotencyKey,
          status: 'SENDING',
          metadata: input.metadata as Prisma.InputJsonValue,
        },
        select: { id: true },
      });
      return row;
    } catch (err) {
      if (
        err instanceof Prisma.PrismaClientKnownRequestError &&
        err.code === UNIQUE_VIOLATION
      ) {
        return null;
      }
      throw err;
    }
  }

  async markSent(id: string, providerMessageId: string): Promise<void> {
    await this.prisma.emailLog.update({
      where: { id },
      data: { status: 'SENT', providerMessageId, sentAt: new Date() },
    });
  }

  async markFailed(id: string, error: string): Promise<void> {
    await this.prisma.emailLog.update({
      where: { id },
      data: {
        status: 'FAILED',
        error: error.slice(0, 500),
        failedAt: new Date(),
      },
    });
  }

  async markSkipped(input: CreateLogInput, skipReason: string): Promise<void> {
    try {
      await this.prisma.emailLog.create({
        data: {
          userId: input.userId,
          email: input.email,
          templateKey: input.templateKey,
          category: input.category,
          idempotencyKey: input.idempotencyKey,
          status: 'SKIPPED',
          skipReason,
          metadata: input.metadata as Prisma.InputJsonValue,
        },
      });
    } catch (err) {
      if (
        err instanceof Prisma.PrismaClientKnownRequestError &&
        err.code === UNIQUE_VIOLATION
      )
        return;
      this.logger.error('Failed to record skipped email', err as Error);
    }
  }

  // ── Webhook tracking (spec §23) ───────────────────────────────────────────
  async markDelivered(providerMessageId: string): Promise<void> {
    await this.prisma.emailLog.updateMany({
      where: { providerMessageId },
      data: { deliveredAt: new Date() },
    });
  }

  async markOpened(providerMessageId: string): Promise<void> {
    await this.prisma.emailLog.updateMany({
      where: { providerMessageId, openedAt: null },
      data: { openedAt: new Date() },
    });
  }

  async markClicked(providerMessageId: string): Promise<void> {
    await this.prisma.emailLog.updateMany({
      where: { providerMessageId, clickedAt: null },
      data: { clickedAt: new Date() },
    });
  }

  async markBounced(providerMessageId: string, reason: string): Promise<void> {
    await this.prisma.emailLog.updateMany({
      where: { providerMessageId },
      data: {
        status: 'FAILED',
        error: reason.slice(0, 500),
        failedAt: new Date(),
      },
    });
  }
}
