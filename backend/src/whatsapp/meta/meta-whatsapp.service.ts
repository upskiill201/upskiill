import { Injectable, Logger } from '@nestjs/common';
import { maskPhone } from '../phone.util';
import { MetaWhatsAppError, classifyMetaStatus, metaFetch } from './meta-whatsapp.types';

const SEND_TIMEOUT_MS = 15_000;
const DEFAULT_API_VERSION = 'v21.0';

interface MetaSendResponse {
  messages?: { id?: string }[];
}

/**
 * Single centralized client for the Meta WhatsApp Cloud API.
 *
 * Every WhatsApp send in the backend — OTP today, Tey nudges once the
 * WhatsApp delivery channel is wired up — must go through this service.
 * Nothing else may call the Graph API directly.
 *
 * Config is read straight from `process.env`, matching the rest of the
 * codebase (no ConfigService abstraction exists here). Uses global `fetch`
 * rather than a vendor SDK, mirroring `tey/ai`'s adapter pattern — one place
 * per external API where the wire format lives, no extra lockfile churn.
 */
@Injectable()
export class MetaWhatsAppService {
  private readonly logger = new Logger(MetaWhatsAppService.name);

  get isEnabled(): boolean {
    return process.env.META_WHATSAPP_ENABLED === 'true';
  }

  private get apiVersion(): string {
    return process.env.META_WHATSAPP_API_VERSION || DEFAULT_API_VERSION;
  }

  private get phoneNumberId(): string | undefined {
    return process.env.META_WHATSAPP_PHONE_NUMBER_ID;
  }

  private get accessToken(): string | undefined {
    return process.env.META_WHATSAPP_ACCESS_TOKEN;
  }

  private get messagesUrl(): string {
    return `https://graph.facebook.com/${this.apiVersion}/${this.phoneNumberId}/messages`;
  }

  /** Throws rather than no-ops so callers decide the fallback behaviour. */
  private assertConfigured(): void {
    if (!this.isEnabled) {
      throw new MetaWhatsAppError(
        'META_WHATSAPP_ENABLED is not set to true',
        'BAD_REQUEST',
      );
    }
    if (!this.phoneNumberId || !this.accessToken) {
      throw new MetaWhatsAppError(
        'META_WHATSAPP_PHONE_NUMBER_ID or META_WHATSAPP_ACCESS_TOKEN is not configured',
        'BAD_REQUEST',
      );
    }
  }

  /**
   * Sends a pre-approved WhatsApp template message. This is the only send
   * path usable outside Meta's 24-hour customer-service window — which
   * covers both OTP (always outside the window) and Tey's proactive nudges.
   */
  async sendTemplateMessage(
    toE164: string,
    templateName: string,
    languageCode: string,
    bodyParams: string[],
  ): Promise<{ providerMessageId: string }> {
    this.assertConfigured();

    const to = toE164.replace(/^\+/, '');
    const body = {
      messaging_product: 'whatsapp',
      to,
      type: 'template',
      template: {
        name: templateName,
        language: { code: languageCode },
        ...(bodyParams.length
          ? {
              components: [
                {
                  type: 'body',
                  parameters: bodyParams.map((text) => ({ type: 'text', text })),
                },
              ],
            }
          : {}),
      },
    };

    return this.send(toE164, body);
  }

  /**
   * Plain session text message. Only deliverable inside Meta's 24-hour
   * customer-service window (i.e. the user messaged Tey recently) — not used
   * for proactive nudges, kept for future conversational replies.
   */
  async sendTextMessage(
    toE164: string,
    text: string,
  ): Promise<{ providerMessageId: string }> {
    this.assertConfigured();

    const to = toE164.replace(/^\+/, '');
    const body = {
      messaging_product: 'whatsapp',
      to,
      type: 'text',
      text: { body: text },
    };

    return this.send(toE164, body);
  }

  private async send(
    toE164: string,
    body: Record<string, unknown>,
  ): Promise<{ providerMessageId: string }> {
    const masked = maskPhone(toE164);

    let res: Response;
    try {
      res = await metaFetch(
        this.messagesUrl,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${this.accessToken}`,
          },
          body: JSON.stringify(body),
        },
        SEND_TIMEOUT_MS,
      );
    } catch (err) {
      this.logger.error(
        `[Meta WhatsApp] Send to ${masked} failed: ${(err as Error).message}`,
      );
      throw err;
    }

    if (!res.ok) {
      const detail = await res.text().catch(() => '');
      this.logger.error(
        `[Meta WhatsApp] Send to ${masked} failed (${res.status}): ${detail.slice(0, 200)}`,
      );
      throw new MetaWhatsAppError(
        `Meta WhatsApp send failed (${res.status}): ${detail.slice(0, 200)}`,
        classifyMetaStatus(res.status),
        res.status,
      );
    }

    const json = (await res.json()) as MetaSendResponse;
    const providerMessageId = json.messages?.[0]?.id;
    if (!providerMessageId) {
      this.logger.error(
        `[Meta WhatsApp] Send to ${masked} returned 2xx with no message id`,
      );
      throw new MetaWhatsAppError(
        'Meta WhatsApp response missing message id',
        'UNKNOWN',
      );
    }

    this.logger.log(`[Meta WhatsApp] Sent to ${masked} ✅ (${providerMessageId})`);
    return { providerMessageId };
  }
}
