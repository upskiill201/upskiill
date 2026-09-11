import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { MetaWhatsAppService } from '../../../whatsapp/meta/meta-whatsapp.service';
import type { TeyContext } from '../../contracts/tey-context.types';
import type {
  TeyChannel,
  TeyChannelResult,
  TeyMessage,
} from './channel.interface';

/**
 * WhatsApp — the real Meta Cloud API implementation.
 *
 * Proactive Tey messages are always outside Meta's 24-hour customer-service
 * window, so every send here goes through a pre-approved template, never a
 * free-form text message. This pass uses one generic Utility-category
 * template with a single free-text placeholder — the rendered nudge body is
 * passed as that one variable, so any reason's copy works without needing a
 * template per reason approved by Meta first.
 *
 * `tey-delivery.service.ts` only calls this for a small, deliberately-chosen
 * set of high-value situations (see `shouldAlsoSendWhatsApp`) — this channel
 * has no say in when it fires, only how a prepared message actually goes out.
 */
@Injectable()
export class WhatsAppChannel implements TeyChannel {
  readonly id = 'WHATSAPP' as const;
  private readonly logger = new Logger(WhatsAppChannel.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly meta: MetaWhatsAppService,
  ) {}

  async isAvailableFor(userId: string): Promise<boolean> {
    if (process.env.META_WHATSAPP_ENABLED !== 'true') return false;

    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { whatsappVerified: true, whatsappPhone: true },
    });
    if (!user?.whatsappVerified || !user.whatsappPhone) return false;

    // Opt-in, not opt-out: a missing prefs row means WhatsApp nudges are off.
    const prefs = await this.prisma.teyNotificationPrefs.findUnique({
      where: { userId },
      select: { whatsappEnabled: true },
    });
    return prefs?.whatsappEnabled === true;
  }

  async send(
    userId: string,
    message: TeyMessage,
    _ctx: TeyContext,
  ): Promise<TeyChannelResult> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { whatsappPhone: true },
    });
    if (!user?.whatsappPhone) {
      return { status: 'NO_TARGET' };
    }

    const templateName = process.env.META_WHATSAPP_NUDGE_TEMPLATE_NAME;
    if (!templateName) {
      this.logger.warn(
        'META_WHATSAPP_NUDGE_TEMPLATE_NAME is not configured — cannot send.',
      );
      return {
        status: 'FAILED',
        error: 'META_WHATSAPP_NUDGE_TEMPLATE_NAME not configured',
      };
    }

    try {
      const { providerMessageId } = await this.meta.sendTemplateMessage(
        user.whatsappPhone,
        templateName,
        process.env.META_WHATSAPP_NUDGE_TEMPLATE_LANGUAGE || 'en_US',
        [message.body],
      );
      return { status: 'SENT', providerMessageId };
    } catch (err) {
      return { status: 'FAILED', error: (err as Error).message };
    }
  }
}
