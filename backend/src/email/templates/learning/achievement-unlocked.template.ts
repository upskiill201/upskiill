import { BaseEmailData, RenderedEmail } from '../../types';
import {
  ctaButton,
  escapeHtml,
  paragraph,
  renderLayout,
  safeName,
} from '../shared';

export interface AchievementUnlockedData extends BaseEmailData {
  achievementName: string;
  achievementDescription: string;
  profileUrl: string;
}

export function renderAchievementUnlockedEmail(
  data: AchievementUnlockedData,
): RenderedEmail {
  const name = safeName(data.firstName);
  const achievement = escapeHtml(data.achievementName);
  const bodyHtml = `
    ${paragraph(`Okay, look at you, ${name}.`)}
    ${paragraph(`You just unlocked <strong>${achievement}</strong>.`)}
    ${paragraph(escapeHtml(data.achievementDescription))}
    ${ctaButton('View your achievement', data.profileUrl)}
  `;

  return {
    subject: `You unlocked ${data.achievementName} 🎉`,
    html: renderLayout({
      bodyHtml,
      preheader: `New achievement: ${data.achievementName}`,
      unsubscribeUrl: data.unsubscribeUrl,
      preferencesUrl: data.preferencesUrl,
    }),
  };
}
