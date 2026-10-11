import { BaseEmailData, RenderedEmail } from '../../types';
import {
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

/**
 * 0 = right after enrolling, 1 = next day, 2 = day 3, 3 = day 6 (the last),
 * 'resume' = they opened lesson 1 and left part-way.
 */
export type FirstLessonStage = 0 | 1 | 2 | 3 | 'resume';

export interface FirstLessonData extends BaseEmailData {
  stage: FirstLessonStage;
  courseName: string;
  creatorName: string;
  lessonTitle: string;
  /** Lesson 1's real length, when the course says it. */
  lessonMinutes?: number;
  totalLessons: number;
  /** Onboarding "what do you want to do with this" — first answer only. */
  goal?: string;
  /** Onboarding minutes-per-day answer. */
  dailyMinutes?: number;
  /** 'resume' only: how far into the lesson they got, 0–100. */
  progressPct?: number;
  lessonUrl: string;
}

/** Onboarding goal ids → the words a person would actually say. */
export const GOAL_PHRASE: Record<string, string> = {
  'build-projects': 'build your own projects',
  career: 'land a job in tech',
  freelance: 'start freelancing',
  startup: 'build your startup',
  automate: 'automate your work',
  explore: 'explore something new',
  'improve-skills': 'level up your skills',
};

/**
 * The first-lesson journey's emails: the gap between "enrolled" and "started"
 * is where most of Teyro's learners are lost, so each one makes lesson 1 feel
 * as small and as near as it really is — its real title, its real length,
 * one button straight into it. Everything comes from the learner's own
 * answers and the course's own data; nothing is invented.
 */
export function renderFirstLessonEmail(data: FirstLessonData): RenderedEmail {
  const name = safeName(data.firstName);
  const course = escapeHtml(clip(data.courseName));
  const creator = escapeHtml(clip(data.creatorName, 60));
  const lesson = escapeHtml(clip(data.lessonTitle, 90));
  const mins = data.lessonMinutes && data.lessonMinutes > 0 ? data.lessonMinutes : undefined;
  const length = mins ? `${mins} ${mins === 1 ? 'minute' : 'minutes'}` : 'a few minutes';
  const goal = data.goal ? GOAL_PHRASE[data.goal] : undefined;
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
    case 0:
      return layout(
        `You're in, ${data.firstName || 'friend'}. Now prove it (${length})`,
        `${data.lessonTitle}. ${length}. I'm watching.`,
        `
        ${teySays(`Welcome to the club, ${name}.`)}
        ${paragraph(`You just joined <strong>${course}</strong> by ${creator}. Bold move. Most people stop at "enroll." I'm sure you're not most people.`)}
        ${paragraph(`<strong>Lesson 1: ${lesson}</strong> · ${length}`)}
        ${goal ? paragraph(`You told me you want to ${escapeHtml(goal)}. Cute. Lesson 1 is where that stops being a wish.`) : ''}
        ${ctaButton('Start lesson 1', data.lessonUrl)}
        ${smallMuted("Finish it today and your streak starts. Don't, and I'll remember.")}
        ${teySignOff()}
      `,
      );
    case 1:
      return layout(
        `${data.lessonTitle} has been waiting a whole day`,
        `It's fine. It's not like it was looking forward to meeting you or anything.`,
        `
        ${teySays(`${name}. Hi. Remember me?`)}
        ${paragraph(`Yesterday you joined <strong>${course}</strong>. Lesson 1, <strong>${lesson}</strong>, has been sitting there ever since. Waiting. Quietly. Not judging. (A little judging.)`)}
        ${data.dailyMinutes ? paragraph(`You said you had ${data.dailyMinutes} minutes a day. Lesson 1 takes ${length}. I did the maths for you, you're welcome.`) : paragraph(`It takes ${length}. You've spent longer choosing what to watch.`)}
        ${ctaButton('Fine, start lesson 1', data.lessonUrl)}
        ${teySignOff()}
      `,
      );
    case 2:
      return layout(
        `I'm not mad about lesson 1. I'm disappointed.`,
        `Okay, a little mad. ${length}, ${data.firstName || 'friend'}.`,
        `
        ${teySays(`${name}, we need to talk.`)}
        ${paragraph(`Three days ago you enrolled in <strong>${course}</strong>. Since then, lesson 1 and I have been having a lot of conversations about you. Mostly wondering where you went.`)}
        ${paragraph(`<strong>${lesson}</strong> takes ${length}. ${goal ? `And it's step one toward being able to ${escapeHtml(goal)}. Remember that? Your words, not mine.` : `That's less time than this email took to ignore.`}`)}
        ${ctaButton('Do lesson 1 now', data.lessonUrl)}
        ${teySignOff()}
      `,
      );
    case 'resume': {
      const pct = data.progressPct && data.progressPct > 0 ? Math.min(95, Math.round(data.progressPct)) : undefined;
      return layout(
        `You left ${data.lessonTitle} halfway. I noticed.`,
        'I saved your place. Because that is the kind of robot I am.',
        `
        ${teySays(`Oh, ${name}. You were doing so well.`)}
        ${paragraph(`You opened <strong>${lesson}</strong>${pct ? ` and got ${pct}% of the way` : ''}, then just... left. Mid-lesson. Like a cliffhanger nobody asked for.`)}
        ${paragraph("Good news: I saved your exact spot. Bad news: I'm going to keep bringing it up until you finish. Your first finished lesson starts your streak.")}
        ${ctaButton('Finish what you started', data.lessonUrl)}
        ${smallMuted('Stuck on something? Tap Help in the app and tell us. A real person reads every message. Probably nicer than me.')}
        ${teySignOff()}
      `,
      );
    }
    case 3:
    default:
      return layout(
        `These emails don't seem to be working`,
        `So this is my last one about lesson 1. No hard feelings. (Some hard feelings.)`,
        `
        ${teySays(`Okay ${name}, I get the hint.`)}
        ${paragraph(`Six days ago you signed up for <strong>${course}</strong>. Lesson 1 is still untouched. I've stopped setting a place for you at dinner.`)}
        ${paragraph(`But if you're still in there somewhere: <strong>${lesson}</strong> takes ${length}. Right now. Surprise me.`)}
        ${ctaButton('Surprise Tey', data.lessonUrl)}
        ${smallMuted("This is my last email about it. I'll be fine. Your spot stays saved, unlike my dignity.")}
        ${teySignOff()}
      `,
      );
  }
}
