import { emailConfig } from '../../email.config';
import { RenderedEmail } from '../../types';
import {
  ctaButton,
  escapeHtml,
  renderLayout,
  safeName,
  smallMuted,
  teySignOff,
} from '../shared';

export interface VerificationEmailData {
  firstName: string;
  code: string;
  role?: string;
}

/** Behavior preserved from the original email.service.ts::sendVerificationEmail
 *  (magic link + 6-digit code, 10-minute expiry, student/creator copy split). */
export function renderVerificationEmail(
  data: VerificationEmailData,
): RenderedEmail {
  const appUrl = emailConfig.appUrl;
  const name = safeName(data.firstName);
  const teyImageUrl = `${appUrl}/User%20onbarding%20Assets/Tey_welcome.PNG`;
  const isCreator =
    data.role === 'INSTRUCTOR' || data.role?.toLowerCase() === 'creator';
  const magicLink = `${appUrl}/verify-email?token=${encodeURIComponent(data.code)}`;

  const subject = isCreator
    ? `Hey ${data.firstName ? name : 'there'}! Confirm your Teyro Creator Account 👀`
    : `Hey ${data.firstName ? name : 'there'}! Is this really your email? 👀`;

  const headline = isCreator
    ? `Before we unlock your <strong>Creator Studio</strong>, I just need to make sure this email belongs to you.`
    : `Before we unlock your <strong>learning adventure</strong>, I just need to make sure this email belongs to you.`;

  const bodyHtml = `
    <div style="text-align:center;margin-bottom:8px;">
      <img src="${teyImageUrl}" alt="Tey" width="120" style="margin:0 auto;display:block;" />
    </div>
    <p style="font-size:16px;line-height:1.6;color:#475569;margin:16px 0;">Hey ${name}! 👋</p>
    <p style="font-size:16px;line-height:1.6;color:#475569;margin:0 0 16px;">It's Tey here.</p>
    <p style="font-size:16px;line-height:1.6;color:#475569;margin:0 0 24px;">${headline}</p>
    ${ctaButton(isCreator ? 'Verify Creator Account' : 'Verify Account & Start Learning', magicLink)}
    ${smallMuted('Or enter this 6-digit verification code on the verification screen:')}
    <div style="text-align:center;margin:20px 0;">
      <span style="display:inline-block;background-color:#f1f5f9;border:2px dashed #0172FD;color:#0172FD;font-family:monospace;font-size:32px;font-weight:800;letter-spacing:6px;padding:12px 28px;border-radius:12px;">
        ${escapeHtml(data.code)}
      </span>
    </div>
    ${smallMuted('This link &amp; code expire in 10 minutes.')}
    ${teySignOff()}
  `;

  return {
    subject,
    html: renderLayout({
      bodyHtml,
      preheader: 'Verify your Teyro account',
    }),
  };
}
