import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import * as webpush from 'web-push';

export interface WebPushTarget {
  endpoint: string;
  p256dh: string;
  auth: string;
}

export type WebPushOutcome =
  /** Delivered to the push service. */
  | { kind: 'SENT' }
  /** The subscription is dead — 404/410. Delete the row. */
  | { kind: 'GONE' }
  /** Rate limited by the push service — back off, keep the subscription. */
  | { kind: 'THROTTLED' }
  | { kind: 'ERROR'; statusCode?: number; message: string };

/** Payload larger than this is rejected by push services outright. */
const MAX_PAYLOAD_BYTES = 4096;

/**
 * Thin wrapper over `web-push`.
 *
 * Web Push / VAPID rather than FCM, deliberately. FCM's web channel *is* the
 * W3C Web Push protocol with a Google endpoint in front — it adds no delivery
 * capability on the web, but it does require the firebase JS SDK client-side
 * plus a dedicated firebase-messaging-sw.js. This app has a hand-written
 * service worker chosen over next-pwa; a second SW on the same origin means
 * scope conflicts and a second cache lifecycle, which is a real regression risk
 * on a shipping PWA. When a native Android app exists, FCM becomes correct —
 * and slots in as another TeyChannel with nothing above it changing.
 */
@Injectable()
export class WebPushClient implements OnModuleInit {
  private readonly logger = new Logger(WebPushClient.name);
  private configured = false;

  onModuleInit(): void {
    const publicKey = process.env.VAPID_PUBLIC_KEY;
    const privateKey = process.env.VAPID_PRIVATE_KEY;
    const subject =
      process.env.VAPID_SUBJECT || 'mailto:support@teyro.app';

    if (!publicKey || !privateKey) {
      // Not fatal: the whole delivery path is behind TEY_DELIVERY_ENABLED, and
      // an unconfigured dev machine should boot fine.
      this.logger.warn(
        'VAPID keys not set — push delivery is unavailable. ' +
          'Generate with: npx web-push generate-vapid-keys',
      );
      return;
    }

    webpush.setVapidDetails(subject, publicKey, privateKey);
    this.configured = true;
  }

  get isConfigured(): boolean {
    return this.configured;
  }

  get publicKey(): string | null {
    return process.env.VAPID_PUBLIC_KEY ?? null;
  }

  /**
   * Sends one notification and classifies the outcome so the caller can act on
   * it. Never throws — a dead subscription is an expected, routine event, not
   * an exception.
   */
  async send(
    target: WebPushTarget,
    payload: unknown,
    ttlSeconds = 3600,
  ): Promise<WebPushOutcome> {
    if (!this.configured) {
      return { kind: 'ERROR', message: 'VAPID keys not configured' };
    }

    const body = JSON.stringify(payload);
    if (Buffer.byteLength(body, 'utf8') > MAX_PAYLOAD_BYTES) {
      return { kind: 'ERROR', message: 'Payload exceeds 4KB push limit' };
    }

    try {
      await webpush.sendNotification(
        {
          endpoint: target.endpoint,
          keys: { p256dh: target.p256dh, auth: target.auth },
        },
        body,
        // A streak reminder is worthless tomorrow morning, so let it expire
        // rather than arrive stale after a phone comes back online.
        { TTL: ttlSeconds, urgency: 'normal' },
      );
      return { kind: 'SENT' };
    } catch (err) {
      const statusCode = (err as { statusCode?: number }).statusCode;

      // 404/410: the browser dropped the subscription (uninstalled, cleared
      // site data, permission revoked). It will never work again.
      if (statusCode === 404 || statusCode === 410) return { kind: 'GONE' };
      if (statusCode === 429) return { kind: 'THROTTLED' };

      return {
        kind: 'ERROR',
        statusCode,
        message: (err as Error).message ?? 'Unknown push error',
      };
    }
  }
}
