import { Inject, Injectable, Logger } from '@nestjs/common';
import { emailConfig } from './email.config';
import { EmailLogService } from './email-log.service';
import { EmailPreferenceService } from './email-preference.service';
import {
  EMAIL_PROVIDER,
  SendEmailError,
} from './providers/email-provider.interface';
import type { EmailProvider } from './providers/email-provider.interface';
import { getTemplateMeta } from './templates/registry';
import { EmailCategory, RenderedEmail } from './types';

const DEFAULT_FROM = 'Tey from Teyro <noreply@teyro.app>';

export interface DispatchInput {
  userId?: string;
  email: string;
  templateKey: string;
  category: EmailCategory;
  /** Deterministic per logical send — see docs/email-system.md §Idempotency. */
  idempotencyKey: string;
  render: () => RenderedEmail;
  metadata?: Record<string, unknown>;
  from?: string;
  preferenceOptions?: Parameters<EmailPreferenceService['isEligible']>[2];
}

export type DispatchOutcome =
  | { sent: true; providerMessageId: string }
  | {
      sent: false;
      reason:
        | 'DISABLED'
        | 'TEMPLATE_DISABLED'
        | 'UNSUBSCRIBED'
        | 'DUPLICATE'
        | 'SEND_FAILED';
    };

/**
 * The single entrypoint every send in this system goes through — event
 * listeners, the job worker, and any remaining direct call all end up here.
 * Order matters: eligibility and dedupe happen BEFORE the (comparatively
 * expensive/slow) provider call, and the idempotency reservation happens
 * before rendering so a race can't render twice for nothing.
 */
@Injectable()
export class EmailDispatchService {
  private readonly logger = new Logger(EmailDispatchService.name);

  constructor(
    @Inject(EMAIL_PROVIDER) private readonly provider: EmailProvider,
    private readonly preferences: EmailPreferenceService,
    private readonly logs: EmailLogService,
  ) {}

  async dispatch(input: DispatchInput): Promise<DispatchOutcome> {
    const meta = getTemplateMeta(input.templateKey);
    if (!meta || !meta.enabled) {
      this.logger.warn(
        `[Email] send skipped reason=TEMPLATE_DISABLED templateKey=${input.templateKey}`,
      );
      return { sent: false, reason: 'TEMPLATE_DISABLED' };
    }

    if (!emailConfig.enabled) {
      await this.logs.markSkipped(input, 'EMAIL_DISABLED');
      return { sent: false, reason: 'DISABLED' };
    }

    if (input.userId) {
      const eligible = await this.preferences.isEligible(
        input.userId,
        input.category,
        input.preferenceOptions,
      );
      if (!eligible) {
        this.logger.log(
          `[Email] send skipped reason=UNSUBSCRIBED userId=${input.userId} templateKey=${input.templateKey}`,
        );
        await this.logs.markSkipped(input, 'UNSUBSCRIBED');
        return { sent: false, reason: 'UNSUBSCRIBED' };
      }
    }

    const reserved = await this.logs.reserve({
      userId: input.userId,
      email: input.email,
      templateKey: input.templateKey,
      category: input.category,
      idempotencyKey: input.idempotencyKey,
      metadata: input.metadata,
    });
    if (!reserved) {
      this.logger.log(
        `[Email] send skipped reason=DUPLICATE idempotencyKey=${input.idempotencyKey}`,
      );
      return { sent: false, reason: 'DUPLICATE' };
    }

    const { to, subjectPrefix } = this.resolveRecipient(input.email);

    try {
      const rendered = input.render();
      const result = await this.provider.send({
        to,
        from: input.from || DEFAULT_FROM,
        subject: `${subjectPrefix}${rendered.subject}`,
        html: rendered.html,
      });
      await this.logs.markSent(reserved.id, result.providerMessageId);
      this.logger.log(
        `[Email] sent templateKey=${input.templateKey} userId=${input.userId ?? 'n/a'} providerMessageId=${result.providerMessageId}`,
      );
      return { sent: true, providerMessageId: result.providerMessageId };
    } catch (err) {
      const message =
        err instanceof SendEmailError ? err.message : (err as Error).message;
      await this.logs.markFailed(reserved.id, message);
      this.logger.error(
        `[Email] send failed templateKey=${input.templateKey} userId=${input.userId ?? 'n/a'}: ${message}`,
      );
      // Re-throw only SendEmailError so the job worker can distinguish
      // transient (retry) from permanent (give up) — callers doing an
      // immediate fire-and-forget send should catch this themselves.
      if (err instanceof SendEmailError) throw err;
      return { sent: false, reason: 'SEND_FAILED' };
    }
  }

  /**
   * Environment safety (spec §30): outside production, every email is
   * redirected to EMAIL_TEST_RECIPIENT unless explicitly overridden, so a
   * staging deploy can never mail a real learner.
   */
  private resolveRecipient(realEmail: string): {
    to: string;
    subjectPrefix: string;
  } {
    if (
      emailConfig.mode === 'production' ||
      emailConfig.allowRealRecipientsInDev
    ) {
      return { to: realEmail, subjectPrefix: '' };
    }
    if (emailConfig.testRecipient) {
      return {
        to: emailConfig.testRecipient,
        subjectPrefix: `[to: ${realEmail}] `,
      };
    }
    // No test recipient configured and not production: still redirect to a
    // clearly-fake address rather than risk a real send from a dev machine.
    return { to: 'blackhole@teyro.app', subjectPrefix: `[to: ${realEmail}] ` };
  }
}
