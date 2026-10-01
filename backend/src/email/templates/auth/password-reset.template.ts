import { emailConfig } from '../../email.config';
import { RenderedEmail } from '../../types';
import {
  ctaButton,
  renderLayout,
  safeName,
  smallMuted,
  teySignOff,
} from '../shared';

export interface PasswordResetEmailData {
  firstName: string;
  token: string;
  /** Preserved routing: STUDENT -> /reset-password, others -> /creator/reset-password. */
  role?: string;
}

export function renderPasswordResetEmail(
  data: PasswordResetEmailData,
): RenderedEmail {
  const appUrl = emailConfig.appUrl;
  const isStudent = !data.role || data.role === 'STUDENT';
  const resetUrl = isStudent
    ? `${appUrl}/reset-password?token=${data.token}`
    : `${appUrl}/creator/reset-password?token=${data.token}`;
  const name = safeName(data.firstName);

  const bodyHtml = `
    <div style="font-size:32px;margin-bottom:16px;text-align:center;">👋</div>
    <p style="font-size:16px;line-height:1.6;color:#0f172a;font-weight:700;margin:0 0 8px;text-align:center;">Hey! It's Tey.</p>
    <p style="font-size:15px;line-height:1.6;color:#64748b;margin:0 0 24px;text-align:center;">
      Forgot your password, ${name}? No big deal.
    </p>
    <p style="font-size:15px;line-height:1.6;color:#64748b;margin:0 0 8px;text-align:center;">
      Tap below to set a new one, then come back — we've got lessons waiting.
    </p>
    ${ctaButton('Reset Password', resetUrl)}
    ${smallMuted("This link expires in 30 minutes. Didn't ask for this? You can safely ignore it — nothing changes until you use the link.")}
    <div style="text-align:center;">
      ${teySignOff()}
    </div>
  `;

  return {
    subject: "Hey! It's Tey. 👋 Reset your password!",
    html: renderLayout({ bodyHtml, preheader: 'Reset your Teyro password' }),
  };
}
