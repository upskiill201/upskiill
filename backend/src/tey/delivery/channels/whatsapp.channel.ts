import { Injectable } from '@nestjs/common';
import type {
  TeyChannel,
  TeyChannelResult,
  TeyMessage,
} from './channel.interface';

/**
 * WhatsApp — the seam, not the implementation.
 *
 * Registered so the delivery service is genuinely multi-channel rather than
 * push-with-an-interface-bolted-on, but permanently unavailable until a real
 * integration lands.
 *
 * A warning for whoever picks this up: the existing `whatsapp` module is
 * Baileys, an UNOFFICIAL WhatsApp Web client used for OTP. Sending bulk
 * proactive engagement messages through it risks the number being banned,
 * which would take OTP verification — and therefore signup — down with it.
 * Phase 6 means the Meta Cloud API (or a BSP): approved message templates, the
 * 24-hour session window, and per-message billing. That is a separate project,
 * and "we already have WhatsApp" must not be allowed to shortcut it.
 */
@Injectable()
export class WhatsAppChannel implements TeyChannel {
  readonly id = 'WHATSAPP' as const;

  isAvailableFor(): Promise<boolean> {
    return Promise.resolve(false);
  }

  send(): Promise<TeyChannelResult> {
    return Promise.resolve({
      status: 'FAILED',
      error: 'WhatsApp delivery is not implemented (see whatsapp.channel.ts)',
    });
  }
}
