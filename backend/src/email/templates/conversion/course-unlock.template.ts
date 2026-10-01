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
  teySays,
  teySignOff,
} from '../shared';

export type CourseUnlockStage = 1 | 2 | 3;

export interface CourseUnlockData extends BaseEmailData {
  stage: CourseUnlockStage;
  courseName: string;
  creatorName: string;
  /** The first locked lessons, by their real titles. */
  nextLessons: string[];
  /** The course's own "what you'll learn" lines. */
  outcomes: string[];
  completedLessons: number;
  totalLessons: number;
  /** Only passed when the number means something (see SOCIAL_PROOF_MIN_LEARNERS). */
  learners?: number;
  unlockUrl: string;
}

/**
 * The lesson-3 unlock journey's emails. Three stages over a week, each built
 * only from the course's real data — its next lesson titles, its outcomes,
 * the learner's real progress. No invented deadlines, no fake discounts: the
 * persuasion is the course itself and the learner's own momentum.
 */
export function renderCourseUnlockEmail(data: CourseUnlockData): RenderedEmail {
  const name = safeName(data.firstName);
  const course = escapeHtml(clip(data.courseName));
  const creator = escapeHtml(clip(data.creatorName, 60));
  const next = data.nextLessons.map((t) => escapeHtml(clip(t, 90)));
  const outcomes = data.outcomes.map((o) => escapeHtml(clip(o, 140)));
  const left = Math.max(0, data.totalLessons - data.completedLessons);
  const layout = (subject: string, preheader: string, bodyHtml: string) => ({
    subject,
    html: renderLayout({
      bodyHtml,
      preheader,
      unsubscribeUrl: data.unsubscribeUrl,
      preferencesUrl: data.preferencesUrl,
    }),
  });

  switch (data.stage) {
    case 1:
      return layout(
        next[0] ? `Next up in ${data.courseName}: ${data.nextLessons[0]}` : `You finished the free lessons of ${data.courseName}`,
        'You finished the free part. Here’s what comes next.',
        `
        ${teySays(`Look at you, ${name}.`)}
        ${paragraph(`You finished the free lessons of <strong>${course}</strong>. That’s a real start, and I’d hate to see it stop here.`)}
        ${next.length ? paragraph('Here’s what’s waiting for you next:') : ''}
        ${bulletList(next)}
        ${ctaButton('Unlock the course', data.unlockUrl)}
        ${smallMuted('Your progress is saved. You’ll pick up exactly where you stopped.')}
        ${teySignOff()}
      `,
      );
    case 2: {
      const proof =
        data.learners !== undefined
          ? paragraph(`<strong>${data.learners} people</strong> are learning ${course} right now.`)
          : '';
      return layout(
        `${left} ${left === 1 ? 'lesson' : 'lessons'} between you and finishing ${data.courseName}`,
        `What you’ll be able to do after ${data.courseName}`,
        `
        ${teySays('Quick reminder of where this goes.')}
        ${paragraph(`You started <strong>${course}</strong> by ${creator}. Finish it, and you’ll be able to:`)}
        ${bulletList(outcomes.length ? outcomes : next)}
        ${proof}
        ${ctaButton('Keep going', data.unlockUrl)}
        ${teySignOff()}
      `,
      );
    }
    case 3:
    default:
      return layout(
        `Still thinking about ${data.courseName}?`,
        'No pressure. Your spot is saved.',
        `
        ${teySays(`No pressure, ${name}.`)}
        ${paragraph(`You did ${data.completedLessons} ${data.completedLessons === 1 ? 'lesson' : 'lessons'} of <strong>${course}</strong>, and they’re saved right where you left them.`)}
        ${paragraph('Whenever you’re ready to see how it ends, it’s one tap away.')}
        ${ctaButton('Unlock the course', data.unlockUrl)}
        ${smallMuted('This is my last email about this course. I’ll let you get on with your day.')}
        ${teySignOff()}
      `,
      );
  }
}
