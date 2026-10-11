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

export type CourseUnlockStage = 1 | 2 | 3 | 'nag';

export interface CourseUnlockData extends BaseEmailData {
  stage: CourseUnlockStage;
  /** 'nag' only: which nag (picks the variant). */
  nag?: number;
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
    case 'nag': {
      const v = [
        {
          subject: `You stopped at the best part of ${data.courseName}`,
          pre: "That's a cliffhanger, and I hate cliffhangers.",
          head: `${name}, we need to talk about ${data.courseName}.`,
          body: `You did the free lessons of <strong>${course}</strong>, then stopped right where it gets good. ${left} ${left === 1 ? 'lesson is' : 'lessons are'} waiting, and your progress is saved.`,
        },
        {
          subject: `I'll keep asking about ${data.courseName}`,
          pre: "Every week. Until you unlock it. That's the deal.",
          head: `Hi ${name}. Me again.`,
          body: `<strong>${course}</strong> by ${creator} is still waiting where you left it. ${next[0] ? `Next up: <strong>${next[0]}</strong>.` : ''} Unlock it and these emails turn into high-fives.`,
        },
        {
          subject: 'Remember why you started?',
          pre: `${data.courseName} does.`,
          head: `${name}, quick reminder.`,
          body: `You chose <strong>${course}</strong> for a reason. ${outcomes[0] ? `Finish it and you'll be able to: ${outcomes[0]}.` : `${left} lessons stand between you and finishing it.`}`,
        },
      ][(data.nag ?? 0) % 3];
      return layout(
        v.subject,
        v.pre,
        `
        ${teySays(v.head)}
        ${paragraph(v.body)}
        ${ctaButton('Unlock the course', data.unlockUrl)}
        ${teySignOff()}
      `,
      );
    }
    case 3:
    default:
      return layout(
        `Still thinking about ${data.courseName}?`,
        'Your spot is saved. My patience is... mostly saved.',
        `
        ${teySays(`No pressure, ${name}.`)}
        ${paragraph(`You did ${data.completedLessons} ${data.completedLessons === 1 ? 'lesson' : 'lessons'} of <strong>${course}</strong>, and they’re saved right where you left them.`)}
        ${paragraph('Whenever you’re ready to see how it ends, it’s one tap away.')}
        ${ctaButton('Unlock the course', data.unlockUrl)}
        ${smallMuted('I’ll keep checking in about this course until you unlock it. That’s a promise.')}
        ${teySignOff()}
      `,
      );
  }
}
