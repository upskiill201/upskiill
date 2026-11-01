import { BaseEmailData, RenderedEmail } from '../../types';
import { ctaButton, paragraph, renderLayout, safeName } from '../shared';

export interface WeeklySummaryData extends BaseEmailData {
  xpEarned: number;
  lessonsCompleted: number;
  currentStreak: number;
  /** Omit any section whose underlying data doesn't exist — spec §16 "only include metrics that actually exist". */
  leagueResult?: { tier: string; outcome: 'PROMOTED' | 'STAYED' | 'DEMOTED' };
  /** Their study buddies' week (network/circle-week.ts); omitted with no buddies. */
  circle?: {
    buddies: number;
    buddyLessons: number;
    top: { name: string; lessons: number } | null;
    inspired: number;
  };
  continueUrl: string;
}

function circleSection(c: NonNullable<WeeklySummaryData['circle']>): string {
  const lines: string[] = [
    `Your ${c.buddies === 1 ? 'study buddy' : `${c.buddies} study buddies`} finished ${c.buddyLessons} ${c.buddyLessons === 1 ? 'lesson' : 'lessons'} this week.`,
  ];
  if (c.top) lines.push(`${c.top.name} led with ${c.top.lessons}.`);
  if (c.inspired > 0) {
    lines.push(`And ${c.inspired} ${c.inspired === 1 ? 'person' : 'people'} started a course because of you.`);
  }
  return paragraph(lines.join(' '));
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
    ${data.circle ? circleSection(data.circle) : ''}
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
