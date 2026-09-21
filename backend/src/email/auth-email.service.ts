import { Injectable, Logger } from '@nestjs/common';
import * as crypto from 'crypto';
import { EmailDispatchService } from './email-dispatch.service';
import { renderPasswordResetEmail } from './templates/auth/password-reset.template';
import { renderVerificationEmail } from './templates/auth/verification.template';
import { renderWelcomeEmail } from './templates/auth/welcome.template';
import { EmailCategory } from './types';

/**
 * Auth's three transactional emails, migrated onto the shared dispatch
 * pipeline (eligibility [always-on for these], idempotency, provider, log)
 * while preserving exact prior behavior — magic link + 6-digit code,
 * 10-minute expiry copy, student/creator split, and the two reset routes.
 *
 * Call sites in AuthService deliberately do NOT await these — see
 * AuthService's calls: "never make a user wait for an email" applies to
 * verification/reset too, so signup/login/forgot-password return as soon as
 * the DB write commits, and the send happens immediately afterward without
 * blocking the HTTP response. A failure here is logged, never thrown.
 */
@Injectable()
export class AuthEmailService {
  private readonly logger = new Logger(AuthEmailService.name);

  constructor(private readonly dispatch: EmailDispatchService) {}

  async sendVerificationEmail(
    email: string,
    code: string,
    fullName?: string,
    role?: string,
    userId?: string,
    generationId?: string,
  ): Promise<void> {
    try {
      await this.dispatch.dispatch({
        userId,
        email,
        templateKey: 'auth.verification',
        category: EmailCategory.TRANSACTIONAL,
        idempotencyKey: `auth.verification:${userId ?? email}:${generationId ?? Date.now()}`,
        render: () =>
          renderVerificationEmail({
            firstName: fullName?.split(' ')[0] || '',
            code,
            role,
          }),
      });
    } catch (err) {
      this.logger.error(
        `Failed sending verification email to ${email}`,
        err as Error,
      );
    }
  }

  async sendWelcomeEmail(
    email: string,
    fullName: string | undefined,
    userId?: string,
  ): Promise<void> {
    try {
      await this.dispatch.dispatch({
        userId,
        email,
        templateKey: 'auth.welcome',
        category: EmailCategory.TRANSACTIONAL,
        idempotencyKey: `auth.welcome:${userId ?? email}`,
        render: () =>
          renderWelcomeEmail({ firstName: fullName?.split(' ')[0] || '' }),
      });
    } catch (err) {
      this.logger.error(
        `Failed sending welcome email to ${email}`,
        err as Error,
      );
    }
  }

  async sendPasswordResetEmail(
    email: string,
    token: string,
    firstName?: string,
    role?: string,
    userId?: string,
  ): Promise<void> {
    // Never persist raw token material, even truncated — hash it for the
    // idempotency key (spec §19/§27: no secrets in logs).
    const tokenFingerprint = crypto
      .createHash('sha256')
      .update(token)
      .digest('hex')
      .slice(0, 16);
    try {
      await this.dispatch.dispatch({
        userId,
        email,
        templateKey: 'auth.password-reset',
        category: EmailCategory.SECURITY,
        idempotencyKey: `auth.password-reset:${userId ?? email}:${tokenFingerprint}`,
        render: () =>
          renderPasswordResetEmail({ firstName: firstName || '', token, role }),
      });
    } catch (err) {
      this.logger.error(
        `Failed sending password reset email to ${email}`,
        err as Error,
      );
    }
  }
}
