import { BaseEmailData, RenderedEmail } from '../../types';
import {
  ctaButton,
  escapeHtml,
  paragraph,
  renderLayout,
  safeName,
} from '../shared';

export type LeagueOutcome =
  | 'PROMOTED'
  | 'STAYED'
  | 'DEMOTED'
  | 'CHAMPION'
  | 'TOURNAMENT_EXIT'
  | 'INACTIVE_DEMOTED';

export interface LeagueResultsData extends BaseEmailData {
  league: string;
  outcome: LeagueOutcome;
  rank: number | null;
  leaderboardUrl: string;
}

const COPY: Record<LeagueOutcome, { subject: string; line: string }> = {
  PROMOTED: {
    subject: 'You got promoted 🎉',
    line: 'You moved up a league this week.',
  },
  CHAMPION: {
    subject: "You're the champion 🏆",
    line: 'You won the tournament.',
  },
  STAYED: {
    subject: 'Your league results are in',
    line: 'You held your spot this week.',
  },
  TOURNAMENT_EXIT: {
    subject: 'Your league results are in',
    line: "You're back in Diamond for next week.",
  },
  DEMOTED: {
    subject: 'Your league results are in',
    line: 'You moved down a league this week.',
  },
  INACTIVE_DEMOTED: {
    subject: 'Your league results are in',
    line: 'A quiet week — you moved down a league.',
  },
};

export function renderLeagueResultsEmail(
  data: LeagueResultsData,
): RenderedEmail {
  const name = safeName(data.firstName);
  const copy = COPY[data.outcome];
  const rankLine = data.rank
    ? paragraph(
        `You finished at rank ${data.rank} in ${escapeHtml(data.league)}.`,
      )
    : '';

  const bodyHtml = `
    ${paragraph(`Hey ${name}.`)}
    ${paragraph(copy.line)}
    ${rankLine}
    ${ctaButton('See your league', data.leaderboardUrl)}
  `;

  return {
    subject: copy.subject,
    html: renderLayout({
      bodyHtml,
      preheader: copy.line,
      unsubscribeUrl: data.unsubscribeUrl,
      preferencesUrl: data.preferencesUrl,
    }),
  };
}
