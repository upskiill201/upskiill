/**
 * What Tey says on every onboarding v3 screen. The app talks TO the learner:
 * their name, their goal, the course they picked. Tey's voice (founder):
 * cheeky, warm, a little mischievous, never corporate.
 *
 * Each line comes with a pose so Tey's face matches his words, and the pose
 * family picks the reaction sound (lib/audio/onboardingAudio.ts).
 */

import type { TeyPose } from '@/lib/onboarding/types';
import { POSE_FAMILY, type Beat } from '@/lib/onboarding/dialogue/types';
import { goalById } from '@/lib/onboarding/goals';
import type { AnswersV3, StepId } from './flow';

const beat = (text: string, pose: TeyPose): Beat => ({ text, pose, poseFamily: POSE_FAMILY[pose] });

function first(name?: string) {
  const n = name?.trim().split(/\s+/)[0];
  return n || null;
}

/** The question / statement Tey makes on a step. */
export function lineFor(
  step: StepId,
  a: AnswersV3,
  extra: { courseTitle?: string; minutes?: number; lessonMinutes?: number } = {},
): Beat | null {
  const name = first(a.name);
  const goal = goalById(a.goal);
  switch (step) {
    case 'intro':
      return beat("Hi! I'm Tey. A few quick questions, then you'll learn something real today.", 'greeting');
    case 'name':
      return beat('First things first. What should I call you?', 'curious');
    case 'goal':
      return beat(name ? `Nice to meet you, ${name}! What do you want to achieve?` : 'What do you want to achieve?', 'excited');
    case 'category':
      return beat(goal ? `To ${goal.phrase}, where do you want to start?` : 'What do you want to learn?', 'thinking');
    case 'course':
      return beat("Pick your course. You'll play its first lesson in a minute.", 'curious');
    case 'experience':
      return beat(extra.courseTitle ? `How much do you already know about ${extra.courseTitle}?` : 'How much do you already know?', 'thinking');
    case 'situation':
      return beat("What's going on for you right now?", 'supportive');
    case 'source':
      return beat('Quick one: how did you hear about Teyro?', 'curious');
    case 'daily':
      return beat(name ? `${name}, how much time can you give me a day?` : 'How much time can you give me a day?', 'encouraging');
    case 'projection':
      return beat("Here's what that adds up to.", 'excited');
    case 'reminder-time':
      return beat("When should I nudge you? I'm very good at nudging.", 'mischievous');
    case 'commit':
      return beat('Make it official. Hold the button to commit.', 'encouraging');
    case 'lesson-intro':
      return beat(
        extra.lessonMinutes
          ? `Your first lesson. About ${extra.lessonMinutes} minutes, and mistakes are free this time, I promise.`
          : 'Your first lesson. Mistakes are free this time, I promise.',
        'excited',
      );
    case 'save':
      return beat(
        name ? `${name}, you did it! Let's save your progress so it's here tomorrow.` : "You did it! Let's save your progress.",
        'celebrating',
      );
    case 'install':
      return beat(
        name ? `Last thing, ${name}: keep me close so I can nudge you at your time.` : 'Last thing: keep me close so I can nudge you at your time.',
        'supportive',
      );
    default:
      return null;
  }
}

/** Tey's instant reaction to a tap, before Continue. */
export function reactionFor(step: StepId, value: string, a: AnswersV3): Beat | null {
  const name = first(a.name);
  switch (step) {
    case 'goal': {
      const g = goalById(value);
      return g ? beat(`${g.label}. Love it. Let's make it happen${name ? `, ${name}` : ''}.`, 'excited') : null;
    }
    case 'category':
      return beat(`${value}! Good pick.`, 'excited');
    case 'course':
      return beat('Ooh, a good one. You start this today.', 'celebrating');
    case 'experience':
      return value === 'new'
        ? beat("Perfect. Everyone starts somewhere and I'll start right there with you.", 'supportive')
        : value === 'some'
          ? beat("Nice, we'll move quickly through what you know.", 'encouraging')
          : beat("Ooh, a pro. I'll try to keep up.", 'mischievous');
    case 'situation':
      return value === 'job-hunting' || value === 'career-change'
        ? beat("Then let's get you job-ready, one small lesson at a time.", 'encouraging')
        : beat("Got it. I'll keep that in mind.", 'supportive');
    case 'source':
      return value === 'friend' ? beat('Tell your friend I said hi!', 'mischievous') : beat('Thanks! Good to know.', 'excited');
    case 'daily':
      return value === '5'
        ? beat('Small and steady wins. Love it.', 'encouraging')
        : value === '10'
          ? beat('The sweet spot for building a habit.', 'excited')
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
