import { emailConfig } from '../../email.config';
import { RenderedEmail } from '../../types';
import { renderLayout, safeName, teySignOff } from '../shared';

export interface WelcomeEmailData {
  firstName: string;
}

export function renderWelcomeEmail(data: WelcomeEmailData): RenderedEmail {
  const appUrl = emailConfig.appUrl;
  const teyImageUrl = `${appUrl}/User%20onbarding%20Assets/Tey_welcome.PNG`;
  const name = safeName(data.firstName);

  const bodyHtml = `
    <div style="text-align:center;margin-bottom:8px;">
      <img src="${teyImageUrl}" alt="Tey" width="120" style="margin:0 auto;display:block;" />
    </div>
    <p style="font-size:20px;line-height:1.6;color:#0f172a;font-weight:800;margin:16px 0 24px;text-align:center;">🎉 Awesome, ${name}!</p>
    <p style="font-size:16px;line-height:1.6;color:#475569;margin:0 0 24px;">
      Your progress, streaks, achievements, and future rewards will now be safely tied to your account.
    </p>
    <p style="font-size:16px;line-height:1.6;color:#475569;margin:0 0 32px;">
      Now let's get back to learning.
    </p>
    ${teySignOff()}
  `;

  return {
    subject: '🎉 Awesome!',
    html: renderLayout({ bodyHtml, preheader: 'Your Teyro account is ready' }),
  };
}
