/**
 * What Tey says on every onboarding v3 screen. The app talks TO the learner:
 * their name, their goal, the course they picked. Tey's voice (founder):
 * cheeky, warm, a little mischievous, never corporate. Plain words; the
 * question is the whole line.
 *
 * Each line comes with a pose so Tey's face matches his words, and the pose
 * family picks the reaction sound (lib/audio/onboardingAudio.ts).
 */

import type { TeyPose } from '@/lib/onboarding/types';
import { POSE_FAMILY, type Beat } from '@/lib/onboarding/dialogue/types';
import { goalById } from '@/lib/onboarding/goals';
import type { AnswersV3, StepId } from './flow';

const beat = (text: string, pose: TeyPose): Beat => ({ text, pose, poseFamily: POSE_FAMILY[pose] });

export function firstName(name?: string) {
  const n = name?.trim().split(/\s+/)[0];
  return n || null;
}

/** The question / statement Tey makes on a step. */
export function lineFor(
  step: StepId,
  a: AnswersV3,
  extra: { courseTitle?: string; topic?: string; lessonMinutes?: number } = {},
): Beat | null {
  const name = firstName(a.name);
  const topic = extra.topic ?? 'it';
  switch (step) {
    case 'intro':
      return beat("Hi there! I'm Tey. Let's find the right course and get you learning today.", 'greeting');
    case 'learn':
      return beat('What do you want to learn?', 'curious');
    case 'name':
      return beat(extra.topic ? `${extra.topic}, great choice! I'll start building your course. What should I call you?` : 'What should I call you?', 'excited');
    case 'source':
      return beat(name ? `Nice to meet you, ${name}! How did you hear about Teyro?` : 'How did you hear about Teyro?', 'curious');
    case 'goal':
      return beat(`Why are you learning ${topic}? I'll shape your course around it.`, 'thinking');
    case 'experience':
      return beat(`How much ${topic} do you already know?`, 'thinking');
    case 'daily':
      return beat(name ? `What's your daily learning goal, ${name}?` : "What's your daily learning goal?", 'encouraging');
    case 'outcome':
      return beat(extra.topic ? `Your ${extra.topic} course is taking shape. Here's what you'll get.` : "Your course is taking shape. Here's what you'll get.", 'excited');
    case 'projection':
      return beat("Here's what your daily goal adds up to.", 'excited');
    case 'reminder-time':
      return beat('When should I remind you to learn?', 'mischievous');
    case 'commit':
      return beat('Make it official. Hold the button to commit.', 'encouraging');
    case 'save':
      return beat(name ? `Great start, ${name}! Save your progress so it's here tomorrow.` : "Great start! Save your progress so it's here tomorrow.", 'celebrating');
    case 'install':
      return beat(name ? `Last thing, ${name}: keep me close so I can nudge you at your time.` : 'Last thing: keep me close so I can nudge you at your time.', 'supportive');
    default:
      return null;
  }
}

/** Tey's instant reaction to a tap, shown in the footer before Continue. */
export function reactionFor(step: StepId, value: string, a: AnswersV3): Beat | null {
  const name = firstName(a.name);
  switch (step) {
    case 'goal': {
      const g = goalById(value);
      return g ? beat(`${g.label}. Love it. I'll build your course around that${name ? `, ${name}` : ''}!`, 'excited') : null;
    }
    case 'experience':
      return value === 'new'
        ? beat("Perfect. I'll start your course from the very beginning, right there with you.", 'supportive')
        : value === 'some'
          ? beat("Nice! I'll fit your course to what you already know.", 'encouraging')
          : beat("Ooh, a pro. I'll skip you past what you know.", 'mischievous');
    case 'source':
      return value === 'friend' ? beat('Tell your friend I said hi!', 'mischievous') : beat('Thanks! Good to know.', 'excited');
    case 'daily':
      return value === '5'
        ? beat('Small and steady wins. Love it.', 'encouraging')
        : value === '10'
          ? beat('The sweet spot for building a habit!', 'excited')
          : value === '20'
            ? beat("Serious! You're going to fly.", 'excited')
            : beat('Intense! Okay, legend.', 'celebrating');
    case 'reminder-time':
      return beat("Noted. I'll be there.", 'mischievous');
    default:
      return null;
  }
}

export function teyArt(pose: TeyPose): string {
  const map: Partial<Record<TeyPose, string>> = {
    greeting: 'waving',
    curious: 'pointing',
    thinking: 'thinking',
    excited: 'cheering',
    celebrating: 'cheering',
    encouraging: 'flame',
    supportive: 'tablet',
    mischievous: 'searching',
  };
  return `/User onbarding Assets/tey/${map[pose] ?? 'welcome'}.webp`;
}

/** A short, natural name for what they're learning ("Python", "AI"). */
export function topicOf(courseTitle?: string): string | undefined {
  if (!courseTitle) return undefined;
  const t = courseTitle
    .replace(/\s*[:–—-]\s.*$/, '')
    .replace(/\b(for|from)\s+(absolute\s+)?beginners?\b.*$/i, '')
    .replace(/^(the|intro to|introduction to|learn)\s+/i, '')
    .trim();
  return t.length > 0 && t.length <= 32 ? t : courseTitle;
}
