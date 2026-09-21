import { BaseEmailData, RenderedEmail } from '../../types';
import { ctaButton, paragraph, renderLayout, safeName } from '../shared';

export interface WeeklySummaryData extends BaseEmailData {
  xpEarned: number;
  lessonsCompleted: number;
  currentStreak: number;
  /** Omit any section whose underlying data doesn't exist — spec §16 "only include metrics that actually exist". */
  leagueResult?: { tier: string; outcome: 'PROMOTED' | 'STAYED' | 'DEMOTED' };
  continueUrl: string;
}

function statRow(label: string, value: string): string {
  return `<tr>
    <td style="padding:10px 0;font-size:15px;color:#475569;border-bottom:1px solid #f1f5f9;">${label}</td>
    <td style="padding:10px 0;font-size:15px;color:#0f172a;font-weight:700;text-align:right;border-bottom:1px solid #f1f5f9;">${value}</td>
  </tr>`;
}

export function renderWeeklySummaryEmail(
  data: WeeklySummaryData,
): RenderedEmail {
  const name = safeName(data.firstName);
  const rows = [
    statRow('XP earned', `${data.xpEarned}`),
    statRow('Lessons completed', `${data.lessonsCompleted}`),
    statRow(
      'Current streak',
      `${data.currentStreak} ${data.currentStreak === 1 ? 'day' : 'days'}`,
    ),
  ];
  if (data.leagueResult) {
    const outcomeLabel = {
      PROMOTED: 'Promoted',
      STAYED: 'Held your spot',
      DEMOTED: 'Demoted',
    }[data.leagueResult.outcome];
    rows.push(statRow('League', `${data.leagueResult.tier} — ${outcomeLabel}`));
  }

  const bodyHtml = `
    ${paragraph(`Hey ${name}. Here's what you learned this week.`)}
    <table style="width:100%;border-collapse:collapse;margin:20px 0;">${rows.join('')}</table>
    ${ctaButton('Keep going', data.continueUrl)}
  `;

  return {
    subject: "Here's what you learned this week",
    html: renderLayout({
      bodyHtml,
      preheader: `${data.xpEarned} XP, ${data.lessonsCompleted} lessons this week`,
      unsubscribeUrl: data.unsubscribeUrl,
      preferencesUrl: data.preferencesUrl,
    }),
  };
}
