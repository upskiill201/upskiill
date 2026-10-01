import { RenderedEmail } from '../../types';
import {
  escapeHtml,
  renderLayout,
  safeName,
  smallMuted,
  teySignOff,
} from '../shared';

export interface EmailChangedData {
  firstName: string;
  newEmail: string;
  changedAt: Date;
  supportEmail?: string;
}

/** Sent to the OLD address — the security-relevant recipient — confirming a
 *  change the account owner may not have made. */
export function renderEmailChangedEmail(data: EmailChangedData): RenderedEmail {
  const when = data.changedAt.toLocaleString('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
  });
  const support = data.supportEmail || 'support@teyro.app';
  const name = safeName(data.firstName);

  const bodyHtml = `
    <p style="font-size:16px;line-height:1.6;color:#0f172a;font-weight:700;margin:0 0 16px;">Hey ${name},</p>
    <p style="font-size:16px;line-height:1.6;color:#475569;margin:0 0 16px;">
      The email address on your Teyro account was just changed to <strong>${escapeHtml(data.newEmail)}</strong>.
    </p>
    <p style="font-size:15px;line-height:1.6;color:#64748b;margin:0 0 16px;">
      This happened on ${escapeHtml(when)}.
    </p>
    <p style="font-size:15px;line-height:1.6;color:#64748b;margin:0 0 24px;">
      If this was you, no action is needed. If you didn't make this change, contact us right away at
      <a href="mailto:${escapeHtml(support)}" style="color:#0172FD;">${escapeHtml(support)}</a> so we can secure your account.
    </p>
    ${smallMuted('This is a security notice and is sent regardless of your email preferences.')}
    ${teySignOff()}
  `;

  return {
    subject: 'Your Teyro account email was changed',
    html: renderLayout({
      bodyHtml,
      preheader: 'Your account email address changed',
    }),
  };
}
