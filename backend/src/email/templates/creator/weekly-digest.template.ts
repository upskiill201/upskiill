import { BaseEmailData, RenderedEmail } from '../../types';
import {
  bulletList,
  clip,
  ctaButton,
  escapeHtml,
  paragraph,
  renderLayout,
  safeName,
  smallMuted,
  statRow,
  teySays,
  teySignOff,
} from '../shared';

export interface CreatorWeeklyDigestData extends BaseEmailData {
  weekLabel: string;
  sales: number;
  revenueUsd: number;
  newLearners: number;
  lessonsCompleted: number;
  courseFinishes: number;
  /** Learner questions in their communities still waiting for an answer. */
  unansweredQuestions: number;
  /** Best course of the week by new learners, when there was one. */
  topCourse?: { title: string; newLearners: number };
  studioUrl: string;
  communityUrl: string;
}

/**
 * The creator's Monday note from Tey: last week in four numbers, the one
 * thing worth doing today (answer the waiting questions), and a nudge to
 * keep the course alive. Numbers are the week's real ledger totals.
 */
export function renderCreatorWeeklyDigestEmail(
  data: CreatorWeeklyDigestData,
): RenderedEmail {
  const name = safeName(data.firstName);
  const good = data.sales > 0 || data.newLearners > 0 || data.courseFinishes > 0;
  const highlights: string[] = [];
  if (data.topCourse && data.topCourse.newLearners > 0) {
    highlights.push(
      `<strong>${escapeHtml(clip(data.topCourse.title))}</strong> brought in ${data.topCourse.newLearners} new ${data.topCourse.newLearners === 1 ? 'learner' : 'learners'}.`,
    );
  }
  if (data.courseFinishes > 0) {
    highlights.push(
      `${data.courseFinishes} ${data.courseFinishes === 1 ? 'learner' : 'learners'} finished a course of yours. That’s the whole point.`,
    );
  }

  const questions =
    data.unansweredQuestions > 0
      ? `
        ${paragraph(`<strong>${data.unansweredQuestions} ${data.unansweredQuestions === 1 ? 'question is' : 'questions are'} waiting for you.</strong> A quick answer from you is what keeps a stuck learner going.`)}
        ${ctaButton('Answer questions', data.communityUrl)}
      `
      : ctaButton('Open your studio', data.studioUrl);

  const bodyHtml = `
    ${teySays(good ? `Good week, ${name}.` : `Here’s your week, ${name}.`)}
    ${smallMuted(escapeHtml(data.weekLabel))}
    ${statRow([
      { label: data.sales === 1 ? 'sale' : 'sales', value: String(data.sales) },
      { label: 'earned', value: `$${data.revenueUsd.toFixed(2)}` },
      { label: 'new learners', value: String(data.newLearners) },
      { label: 'lessons done', value: String(data.lessonsCompleted) },
    ])}
    ${bulletList(highlights)}
    ${questions}
    ${teySignOff()}
  `;

  return {
    subject: good
      ? `Your week: ${data.newLearners} new ${data.newLearners === 1 ? 'learner' : 'learners'}, ${data.sales} ${data.sales === 1 ? 'sale' : 'sales'}`
      : 'Your studio this week',
    html: renderLayout({
      bodyHtml,
      preheader:
        data.unansweredQuestions > 0
          ? `${data.unansweredQuestions} learner questions are waiting for you`
          : 'Last week in your studio, in four numbers',
      unsubscribeUrl: data.unsubscribeUrl,
      preferencesUrl: data.preferencesUrl,
    }),
  };
}
