import { Injectable, Logger } from '@nestjs/common';
import { Resend } from 'resend';
import { emailConfig } from '../email.config';
import {
  EmailProvider,
  SendEmailError,
  SendEmailInput,
  SendEmailResult,
} from './email-provider.interface';

/** Resend statusCodes that are worth retrying; everything else is permanent
 *  (bad address, unauthorized, validation error — retrying won't help). */
const TRANSIENT_STATUS_CODES = new Set([429, 500, 502, 503, 504]);

@Injectable()
export class ResendEmailProvider implements EmailProvider {
  private readonly resend: Resend;
  private readonly logger = new Logger(ResendEmailProvider.name);

  constructor() {
    this.resend = new Resend(emailConfig.resendApiKey);
  }

  async send(input: SendEmailInput): Promise<SendEmailResult> {
    let result: Awaited<ReturnType<Resend['emails']['send']>>;
    try {
      result = await this.resend.emails.send({
        from: input.from,
        to: input.to,
        subject: input.subject,
        html: input.html,
      });
    } catch (err) {
      // Network-level failure (timeout, DNS, etc.) — always worth retrying.
      throw new SendEmailError((err as Error).message, 'TRANSIENT');
    }

    if (result.error) {
      const statusCode =
        (result.error as { statusCode?: number | null }).statusCode ?? null;
      const kind =
        statusCode !== null && TRANSIENT_STATUS_CODES.has(statusCode)
          ? 'TRANSIENT'
          : 'PERMANENT';
      this.logger.warn(
        `Resend rejected send to ${input.to}: ${result.error.message} (status=${statusCode}, kind=${kind})`,
      );
      throw new SendEmailError(result.error.message, kind);
    }

    if (!result.data?.id) {
      throw new SendEmailError('Resend returned no message id', 'TRANSIENT');
    }

    return { providerMessageId: result.data.id };
  }
}
