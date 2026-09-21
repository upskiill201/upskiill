import {
  BadRequestException,
  Controller,
  Get,
  Headers,
  HttpCode,
  Logger,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import * as crypto from 'crypto';
import { Request } from 'express';
import { emailConfig } from './email.config';
import { EmailLogService } from './email-log.service';
import { EmailPreferenceService } from './email-preference.service';
import {
  EmailUnsubscribeService,
  UnsubscribeScope,
} from './email-unsubscribe.service';
import { CheckoutIntentService } from './checkout-intent.service';

const CATEGORY_TO_FIELD: Record<Exclude<UnsubscribeScope, 'ALL'>, string> = {
  MARKETING: 'marketingOptOut',
  STREAK: 'streakRemindersOptOut',
  DIGEST: 'weeklyDigestOptOut',
  LEAGUE: 'leagueEmailsOptOut',
  REENGAGEMENT: 'reengagementOptOut',
};

const PAGE_STYLE = `font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;max-width:480px;margin:60px auto;padding:0 20px;color:#0f172a;`;

/**
 * Unsubscribe / preferences links don't require a logged-in session (spec
 * §18 "not require the user to be logged in unless intentionally
 * designed that way") — the signed token IS the auth. No frontend page
 * exists for this yet, so these are minimal server-rendered pages; see
 * docs/email-system.md §Known limitations.
 */
@Controller('email')
export class EmailController {
  private readonly logger = new Logger(EmailController.name);

  constructor(
    private readonly unsubscribe: EmailUnsubscribeService,
    private readonly preferences: EmailPreferenceService,
    private readonly checkoutIntents: CheckoutIntentService,
    private readonly logs: EmailLogService,
  ) {}

  @Get('unsubscribe')
  async unsubscribeOneClick(@Query('token') token: string): Promise<string> {
    const payload = this.requireToken(token);

    if (payload.scope === 'ALL') {
      await this.preferences.unsubscribeAll(payload.userId);
      await this.checkoutIntents.stopRecoveryForUser(
        payload.userId,
        'USER_UNSUBSCRIBED',
      );
    } else {
      await this.preferences.setCategory(
        payload.userId,
        CATEGORY_TO_FIELD[payload.scope] as never,
        true,
      );
      if (payload.scope === 'MARKETING') {
        await this.checkoutIntents.stopRecoveryForUser(
          payload.userId,
          'USER_UNSUBSCRIBED',
        );
      }
    }

    return this.page(
      'Unsubscribed',
      `
      <p>You're unsubscribed. You won't get this kind of email from Teyro again.</p>
      <p style="margin-top:24px;"><a href="${emailConfig.appUrl}/api/email/preferences?token=${encodeURIComponent(token)}" style="color:#0172FD;">Manage all preferences</a></p>
    `,
    );
  }

  @Get('preferences')
  async preferencesPage(@Query('token') token: string): Promise<string> {
    const payload = this.requireToken(token);
    const current = await this.getPreferenceSnapshot(payload.userId);

    const rows = (
      Object.keys(CATEGORY_TO_FIELD) as Array<Exclude<UnsubscribeScope, 'ALL'>>
    )
      .map((scope) => {
        const field = CATEGORY_TO_FIELD[scope];
        const isOff = current[field];
        return `<tr>
          <td style="padding:10px 0;">${LABELS[scope]}</td>
          <td style="padding:10px 0;text-align:right;">
            <a href="${emailConfig.appUrl}/api/email/preferences/toggle?token=${encodeURIComponent(token)}&scope=${scope}" style="color:#0172FD;">
              ${isOff ? 'Turn back on' : 'Turn off'}
            </a>
          </td>
        </tr>`;
      })
      .join('');

    return this.page(
      'Email preferences',
      `
      <p>Security and account emails always stay on — everything else here is optional.</p>
      <table style="width:100%;border-collapse:collapse;margin-top:16px;">${rows}</table>
      <p style="margin-top:24px;"><a href="${emailConfig.appUrl}/api/email/unsubscribe?token=${encodeURIComponent(token)}" style="color:#94a3b8;">Unsubscribe from everything</a></p>
    `,
    );
  }

  @Get('preferences/toggle')
  async togglePreference(
    @Query('token') token: string,
    @Query('scope') scope: string,
  ): Promise<string> {
    const payload = this.requireToken(token);
    const field = CATEGORY_TO_FIELD[scope as Exclude<UnsubscribeScope, 'ALL'>];
    if (!field) throw new BadRequestException('Unknown preference category');

    const current = await this.getPreferenceSnapshot(payload.userId);
    await this.preferences.setCategory(
      payload.userId,
      field as never,
      !current[field],
    );

    return this.preferencesPage(token);
  }

  // ── Resend webhook (spec §23) ─────────────────────────────────────────────
  @Post('webhooks/resend')
  @HttpCode(200)
  async resendWebhook(
    @Req() req: Request & { rawBody?: Buffer },
    @Headers('svix-id') svixId: string,
    @Headers('svix-timestamp') svixTimestamp: string,
    @Headers('svix-signature') svixSignature: string,
  ): Promise<{ received: true }> {
    const secret = process.env.RESEND_WEBHOOK_SECRET;
    const rawBody = req.rawBody?.toString('utf8');

    if (!secret || !rawBody) {
      this.logger.warn(
        '[Email] resend webhook skipped: no signing secret configured or no raw body captured',
      );
      return { received: true };
    }

    if (
      !this.verifySvixSignature(
        rawBody,
        svixId,
        svixTimestamp,
        svixSignature,
        secret,
      )
    ) {
      this.logger.warn('[Email] resend webhook signature verification failed');
      return { received: true };
    }

    let event: {
      type: string;
      data: { email_id: string; [k: string]: unknown };
    };
    try {
      event = JSON.parse(rawBody) as typeof event;
    } catch {
      return { received: true };
    }

    const messageId = event.data?.email_id;
    if (!messageId) return { received: true };

    // Idempotent by construction: each handler is a conditional UPDATE keyed
    // on providerMessageId, so a re-delivered webhook is a harmless no-op.
    switch (event.type) {
      case 'email.delivered':
        await this.logs.markDelivered(messageId);
        break;
      case 'email.opened':
        await this.logs.markOpened(messageId);
        break;
      case 'email.clicked':
        await this.logs.markClicked(messageId);
        break;
      case 'email.bounced':
      case 'email.complained':
        await this.logs.markBounced(messageId, event.type);
        break;
      default:
        break;
    }
    return { received: true };
  }

  private verifySvixSignature(
    body: string,
    id: string,
    timestamp: string,
    signatureHeader: string,
    secret: string,
  ): boolean {
    if (!id || !timestamp || !signatureHeader) return false;
    const secretBytes = Buffer.from(secret.replace(/^whsec_/, ''), 'base64');
    const signedContent = `${id}.${timestamp}.${body}`;
    const expected = crypto
      .createHmac('sha256', secretBytes)
      .update(signedContent)
      .digest('base64');

    return signatureHeader.split(' ').some((part) => {
      const sig = part.split(',')[1];
      if (!sig) return false;
      const a = Buffer.from(sig);
      const b = Buffer.from(expected);
      return a.length === b.length && crypto.timingSafeEqual(a, b);
    });
  }

  private requireToken(token: string): {
    userId: string;
    scope: UnsubscribeScope;
  } {
    const payload = token ? this.unsubscribe.verifyToken(token) : null;
    if (!payload)
      throw new BadRequestException('This link is invalid or has expired.');
    return payload;
  }

  private async getPreferenceSnapshot(
    userId: string,
  ): Promise<Record<string, boolean>> {
    // Read through the preference service's own Prisma access isn't exposed;
    // reuse setCategory's upsert semantics by reading the same table shape.
    return this.preferences.readAllFlags(userId);
  }

  private page(title: string, bodyHtml: string): string {
    return `<!DOCTYPE html><html><head><meta charset="utf-8"><title>${title} · Teyro</title></head>
    <body style="${PAGE_STYLE}"><h1 style="font-size:22px;">${title}</h1>${bodyHtml}</body></html>`;
  }
}

const LABELS: Record<Exclude<UnsubscribeScope, 'ALL'>, string> = {
  MARKETING: 'Marketing & conversion emails',
  STREAK: 'Streak reminders',
  DIGEST: 'Weekly summary',
  LEAGUE: 'League results',
  REENGAGEMENT: 'Re-engagement emails',
};
