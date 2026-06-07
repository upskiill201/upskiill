import { Injectable, Logger } from '@nestjs/common';
import { Resend } from 'resend';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EmailService {
  private resend: Resend;
  private readonly logger = new Logger(EmailService.name);

  constructor(private configService: ConfigService) {
    const apiKey = this.configService.get<string>('RESEND_API_KEY');
    this.resend = new Resend(apiKey);
  }

  async sendVerificationEmail(email: string, token: string) {
    // In local dev, use localhost:3001 or equivalent if needed, but we'll use frontend url
    const appUrl = this.configService.get<string>('FRONTEND_URL') || 'http://localhost:3000';
    
    // Notice: we point this to the backend verify endpoint directly so it sets the cookie!
    // We assume backend is running on process.env.API_URL or localhost:3001
    const apiUrl = this.configService.get<string>('API_URL') || 'http://localhost:3001';
    const verifyUrl = `${apiUrl}/api/auth/verify-email?token=${token}`;

    const html = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; color: #1e293b;">
        <div style="text-align: center; margin-bottom: 30px;">
          <img src="https://teyro.app/teyro-logo-blue.png" alt="Teyro Logo" width="140" style="margin: 0 auto; display: block;" />
        </div>
        <div style="background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px; padding: 40px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);">
          <h1 style="font-size: 24px; font-weight: 800; color: #0f172a; margin-top: 0; margin-bottom: 16px;">Verify your email address</h1>
          <p style="font-size: 16px; line-height: 1.6; color: #475569; margin-bottom: 32px;">
            Welcome to Teyro! You're just one step away from joining the ultimate platform for creators. Click the button below to verify your email address and enter your Creator Studio.
          </p>
          <div style="text-align: center;">
            <a href="${verifyUrl}" style="display: inline-block; background-color: #7c3aed; color: #ffffff; font-weight: 600; font-size: 16px; text-decoration: none; padding: 14px 32px; border-radius: 12px; box-shadow: 0 4px 14px rgba(124, 58, 237, 0.3);">
              Verify Email & Enter Studio
            </a>
          </div>
          <p style="font-size: 14px; color: #94a3b8; margin-top: 32px; text-align: center;">
            This link expires in 24 hours. If you didn't create an account, you can safely ignore this email.
          </p>
        </div>
      </div>
    `;

    try {
      await this.resend.emails.send({
        from: 'Teyro <noreply@teyro.app>',
        to: email,
        subject: 'Verify your Teyro account',
        html,
      });
      this.logger.log(`Verification email sent to ${email}`);
    } catch (error) {
      this.logger.error(`Failed to send verification email to ${email}`, error);
    }
  }

  async sendWelcomeEmail(email: string, onboarding: any) {
    const firstName = onboarding?.step11?.firstName || 'Creator';
    const category = onboarding?.step3?.categories?.[0] || 'your topic';
    const appUrl = this.configService.get<string>('FRONTEND_URL') || 'http://localhost:3000';
    const studioUrl = `${appUrl}/creator`;

    const html = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; color: #1e293b;">
        <div style="background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px; padding: 40px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);">
          <h1 style="font-size: 24px; font-weight: 800; color: #0f172a; margin-top: 0; margin-bottom: 24px;">You're in, ${firstName} 🎉</h1>
          <p style="font-size: 16px; line-height: 1.6; color: #475569; margin-bottom: 20px;">
            I'm thrilled to welcome you to Teyro. We built this platform because we saw too many brilliant creators struggling with clunky tools instead of focusing on what they do best: teaching ${category}.
          </p>
          <p style="font-size: 16px; line-height: 1.6; color: #475569; margin-bottom: 32px;">
            Your Creator Studio is completely set up and ready. The AI is primed, the analytics are waiting, and everything is optimized to help you deliver the best possible experience for your learners.
          </p>
          <div style="text-align: center; margin-bottom: 32px;">
            <a href="${studioUrl}" style="display: inline-block; background-color: #0f172a; color: #ffffff; font-weight: 600; font-size: 16px; text-decoration: none; padding: 14px 32px; border-radius: 12px;">
              Enter Creator Studio →
            </a>
          </div>
          <p style="font-size: 16px; line-height: 1.6; color: #475569; margin-bottom: 24px;">
            I can't wait to see what you build.
          </p>
          <p style="font-size: 16px; line-height: 1.6; color: #0f172a; font-weight: 600; margin-bottom: 8px;">
            Joel
          </p>
          <p style="font-size: 14px; color: #64748b; margin-top: 0;">
            Founder, Teyro
          </p>
          <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 32px 0;" />
          <p style="font-size: 13px; color: #94a3b8; font-style: italic;">
            P.S. I read every reply to this email. If you need anything, run into a bug, or just want to say hi, hit reply!
          </p>
        </div>
      </div>
    `;

    try {
      await this.resend.emails.send({
        from: 'Joel from Teyro <joel@teyro.app>',
        to: email,
        subject: `You're in, ${firstName} 🎉 Your Creator Studio is ready`,
        html,
      });
      this.logger.log(`Welcome email sent to ${email}`);
    } catch (error) {
      this.logger.error(`Failed to send welcome email to ${email}`, error);
    }
  }
}
