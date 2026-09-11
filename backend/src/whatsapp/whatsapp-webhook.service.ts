import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import * as crypto from 'crypto';
import { PrismaService } from '../prisma/prisma.service';
import { maskPhone, normalisePhone } from './phone.util';

interface MetaWebhookStatus {
  id?: string;
  status?: 'sent' | 'delivered' | 'read' | 'failed';
  timestamp?: string;
  errors?: { code?: number; title?: string }[];
}

interface MetaWebhookInboundMessage {
  id?: string;
  from?: string;
  timestamp?: string;
  text?: { body?: string };
  type?: string;
}

interface MetaWebhookPayload {
  entry?: {
    changes?: {
      value?: {
        statuses?: MetaWebhookStatus[];
        messages?: MetaWebhookInboundMessage[];
      };
    }[];
  }[];
}

const PROVIDER = 'WHATSAPP_META';

/**
 * Parses and processes Meta WhatsApp Cloud API webhook deliveries.
 *
 * Handles two things only, per current scope: delivery status updates
 * (sent/delivered/read/failed) matched back to a `TeyDelivery` row, and
 * store-only inbound message capture. No conversational processing, no
 * auto-reply — that's future work.
 */
@Injectable()
export class WhatsappWebhookService {
  private readonly logger = new Logger(WhatsappWebhookService.name);

  constructor(private prisma: PrismaService) {}

  /**
   * Verifies Meta's `X-Hub-Signature-256` header (HMAC-SHA256 of the raw
   * body, keyed by the app secret). Throws on any mismatch or missing
   * configuration — an unverifiable webhook must never be trusted.
   */
  verifySignature(rawBody: Buffer, signature: string | undefined): void {
    const secret = process.env.META_WHATSAPP_APP_SECRET;
    if (!secret) {
      this.logger.error(
        'WhatsApp webhook received but META_WHATSAPP_APP_SECRET is not set — rejecting.',
      );
      throw new BadRequestException(
        'Webhook verification is not configured.',
      );
    }
    if (!signature || !signature.startsWith('sha256=')) {
      throw new BadRequestException(
        'Missing or malformed X-Hub-Signature-256 header.',
      );
    }

    const received = signature.slice('sha256='.length);
    const expected = crypto
      .createHmac('sha256', secret)
      .update(rawBody)
      .digest('hex');

    const a = Buffer.from(expected, 'hex');
    const b = Buffer.from(received, 'hex');
    if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) {
      throw new BadRequestException('WhatsApp webhook signature mismatch.');
    }
  }

  /**
   * Processes an already-signature-verified payload. Always resolves — a
   * processing failure is logged and swallowed rather than surfaced as a 5xx,
   * so a transient DB blip doesn't trigger Meta's retry storm. Only a failed
   * signature check (in the controller, before this is called) should ever
   * produce a non-2xx response.
   */
  async handleWebhookPayload(payload: MetaWebhookPayload): Promise<void> {
    try {
      for (const entry of payload.entry ?? []) {
        for (const change of entry.changes ?? []) {
          const value = change.value ?? {};
          for (const status of value.statuses ?? []) {
            await this.processStatus(status);
          }
          for (const message of value.messages ?? []) {
            await this.processInboundMessage(message);
          }
        }
      }
    } catch (err) {
      this.logger.error(
        `[WhatsApp Webhook] Failed to process payload: ${(err as Error).message}`,
      );
    }
  }

  private async processStatus(status: MetaWebhookStatus): Promise<void> {
    if (!status.id || !status.status) return;

    const isNew = await this.claimWebhookEvent(status.id, `status.${status.status}`);
    if (!isNew) return;

    const at = status.timestamp
      ? new Date(Number(status.timestamp) * 1000)
      : new Date();

    try {
      if (status.status === 'delivered') {
        await this.prisma.teyDelivery.updateMany({
          where: { providerMessageId: status.id },
          data: { deliveredAt: at },
        });
      } else if (status.status === 'read') {
        // Narrow column update only — deliberately NOT calling
        // TeyDeliveryService.markOpened's full side-effect path, to avoid
        // double-counting if the learner also opens via the deep link.
        await this.prisma.teyDelivery.updateMany({
          where: { providerMessageId: status.id, openedAt: null },
          data: { openedAt: at },
        });
      } else if (status.status === 'failed') {
        await this.prisma.teyDelivery.updateMany({
          where: { providerMessageId: status.id },
          data: { status: 'FAILED' },
        });
        const reason = status.errors?.[0]?.title ?? 'unknown';
        this.logger.warn(
          `[WhatsApp Webhook] Message ${status.id} failed: ${reason}`,
        );
      }
      // 'sent' — no column to update yet, nothing to do.
    } catch (err) {
      this.logger.error(
        `[WhatsApp Webhook] Failed to apply status ${status.status} for ${status.id}: ${(err as Error).message}`,
      );
    }
  }

  private async processInboundMessage(
    message: MetaWebhookInboundMessage,
  ): Promise<void> {
    if (!message.id || !message.from) return;

    const isNew = await this.claimWebhookEvent(message.id, 'message.inbound');
    if (!isNew) return;

    const phone = normalisePhone(`+${message.from}`);
    const user = phone
      ? await this.prisma.user
          .findFirst({ where: { whatsappPhone: phone }, select: { id: true } })
          .catch(() => null)
      : null;

    try {
      await this.prisma.whatsappInboundMessage.create({
        data: {
          waMessageId: message.id,
          fromPhone: phone ?? message.from,
          userId: user?.id,
          body: message.text?.body,
          rawPayload: message as unknown as object,
        },
      });
      this.logger.log(
        `[WhatsApp Webhook] Stored inbound message from ${maskPhone(phone ?? message.from)}`,
      );
    } catch (err) {
      this.logger.error(
        `[WhatsApp Webhook] Failed to store inbound message ${message.id}: ${(err as Error).message}`,
      );
    }
  }

  /**
   * Idempotency ledger shared with Stripe/Mesomb (`processed_webhook_events`).
   * Meta retries webhook deliveries on anything but a fast 2xx, so every
   * (message id, event kind) pair is claimed exactly once.
   */
  private async claimWebhookEvent(
    eventId: string,
    eventType: string,
  ): Promise<boolean> {
    try {
      await this.prisma.processedWebhookEvent.create({
        data: { provider: PROVIDER, eventId: `${eventId}:${eventType}`, eventType },
      });
      return true;
    } catch {
      return false;
    }
  }
}
