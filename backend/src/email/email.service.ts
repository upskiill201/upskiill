import { Injectable, Logger } from '@nestjs/common';
import { Resend } from 'resend';

@Injectable()
export class EmailService {
  private resend: Resend;
  private readonly logger = new Logger(EmailService.name);

  constructor() {
    const apiKey = process.env.RESEND_API_KEY || '';
    this.resend = new Resend(apiKey);
  }

  async sendVerificationEmail(email: string, code: string, fullName?: string) {
    const appUrl = process.env.APP_URL || 'https://teyro.app';
    const name = fullName ? fullName.split(' ')[0] : 'there';
    const teyImageUrl = `${appUrl}/User%20onbarding%20Assets/Tey_welcome.PNG`;

    const html = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; color: #1e293b; background-color: #f8fafc;">
        <div style="text-align: center; margin-bottom: 24px;">
          <img src="${teyImageUrl}" alt="Tey Mascot" width="150" style="margin: 0 auto; display: block;" />
        </div>
        <div style="background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px; padding: 40px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);">
          <p style="font-size: 16px; line-height: 1.6; color: #475569; margin-top: 0; margin-bottom: 16px;">
            Hey there! 👋
          </p>
          <p style="font-size: 16px; line-height: 1.6; color: #475569; margin-bottom: 16px;">
            It’s Tey here.
          </p>
          <p style="font-size: 16px; line-height: 1.6; color: #475569; margin-bottom: 24px;">
            Before we unlock your learning adventure, I just need to make sure this email belongs to you.
          </p>
          <p style="font-size: 16px; line-height: 1.6; color: #475569; margin-bottom: 24px;">
            Enter this 6-digit code on the verification screen to unlock your journey:
          </p>
          <div style="text-align: center; margin: 32px 0;">
            <span style="display: inline-block; background-color: #f1f5f9; border: 2px dashed #0172FD; color: #0172FD; font-family: monospace; font-size: 32px; font-weight: 800; letter-spacing: 6px; padding: 12px 28px; border-radius: 12px;">
              ${code}
            </span>
          </div>
          <p style="font-size: 14px; color: #94a3b8; margin-bottom: 32px;">
            This code expires in 10 minutes.
          </p>
          <p style="font-size: 16px; line-height: 1.6; color: #0f172a; font-weight: 700; margin-bottom: 0;">
            — Tey 💙
          </p>
          <hr style="border: none; border-top: 1px solid #f1f5f9; margin: 32px 0;" />
          <p style="font-size: 13px; color: #94a3b8; text-align: center; margin-bottom: 0;">
            Didn’t create a Teyro account?<br/>
            You can safely ignore this email.
          </p>
        </div>
      </div>
    `;

    try {
      await this.resend.emails.send({
        from: 'Tey from Teyro <noreply@teyro.app>',
        to: email,
        subject: `Hey ${name}! Is this really your email? 👀`,
        html,
      });
      this.logger.log(`Verification email sent to ${email}`);
    } catch (error) {
      this.logger.error(`Failed to send verification email to ${email}`, error);
    }
  }

  async sendWelcomeEmail(email: string, onboarding: any) {
    const appUrl = process.env.APP_URL || 'https://teyro.app';
    const teyImageUrl = `${appUrl}/User%20onbarding%20Assets/Tey_welcome.PNG`;

    const html = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; color: #1e293b; background-color: #f8fafc;">
        <div style="text-align: center; margin-bottom: 24px;">
          <img src="${teyImageUrl}" alt="Tey Mascot" width="150" style="margin: 0 auto; display: block;" />
        </div>
        <div style="background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px; padding: 40px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);">
          <p style="font-size: 20px; line-height: 1.6; color: #0f172a; font-weight: 800; margin-top: 0; margin-bottom: 24px; text-align: center;">
            🎉 Awesome!
          </p>
          <p style="font-size: 16px; line-height: 1.6; color: #475569; margin-bottom: 24px;">
            Your progress, streaks, achievements, and future rewards will now be safely tied to your account.
          </p>
          <p style="font-size: 16px; line-height: 1.6; color: #475569; margin-bottom: 32px;">
            Now let’s get back to learning.
          </p>
          <p style="font-size: 16px; line-height: 1.6; color: #0f172a; font-weight: 700; margin-bottom: 0;">
            — Tey 💙
          </p>
          <hr style="border: none; border-top: 1px solid #f1f5f9; margin: 32px 0;" />
          <p style="font-size: 13px; color: #94a3b8; text-align: center; margin-bottom: 0;">
            Didn’t create a Teyro account?<br/>
            You can safely ignore this email.
          </p>
        </div>
      </div>
    `;

    try {
      await this.resend.emails.send({
        from: 'Tey from Teyro <noreply@teyro.app>',
        to: email,
        subject: `🎉 Awesome!`,
        html,
      });
      this.logger.log(`Welcome email sent to ${email}`);
    } catch (error) {
      this.logger.error(`Failed to send welcome email to ${email}`, error);
    }
  }

  async sendPasswordResetEmail(email: string, token: string, firstName?: string) {
    const appUrl = process.env.APP_URL || 'https://teyro.app';
    const resetUrl = `${appUrl}/creator/reset-password?token=${token}`;
    const name = firstName || 'there';

    const html = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; color: #1e293b;">
        <div style="text-align: center; margin-bottom: 30px;">
          <img src="https://teyro.app/teyro-logo-blue.png" alt="Teyro Logo" width="140" style="margin: 0 auto; display: block;" />
        </div>
        <div style="background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px; padding: 40px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);">
          <h1 style="font-size: 24px; font-weight: 800; color: #0f172a; margin-top: 0; margin-bottom: 24px;">Reset your password</h1>
          <p style="font-size: 16px; line-height: 1.6; color: #475569; margin-bottom: 20px;">
            Hi ${name},
          </p>
          <p style="font-size: 16px; line-height: 1.6; color: #475569; margin-bottom: 32px;">
            You requested a password reset for your Teyro creator account.
          </p>
          <div style="text-align: center; margin-bottom: 32px;">
            <a href="${resetUrl}" style="display: inline-block; background-color: #2563eb; color: #ffffff; font-weight: 600; font-size: 16px; text-decoration: none; padding: 14px 32px; border-radius: 12px; box-shadow: 0 4px 14px rgba(37, 99, 235, 0.3);">
              Reset your password
            </a>
          </div>
          <p style="font-size: 16px; line-height: 1.6; color: #475569; margin-bottom: 24px;">
            This link expires in 30 minutes and can only be used once.
          </p>
          <p style="font-size: 14px; color: #64748b; margin-top: 32px; border-top: 1px solid #e2e8f0; padding-top: 24px;">
            If you didn't request this, you can safely ignore this email. Your password won't change.
          </p>
          <p style="font-size: 14px; color: #64748b; margin-top: 8px;">
            — The Teyro team
          </p>
        </div>
      </div>
    `;

    try {
      await this.resend.emails.send({
        from: 'Teyro <noreply@teyro.app>',
        to: email,
        subject: 'Reset your Teyro password',
        html,
      });
      this.logger.log(`Password reset email sent to ${email}`);
    } catch (error) {
      this.logger.error(`Failed to send password reset email to ${email}`, error);
    }
  }
}
