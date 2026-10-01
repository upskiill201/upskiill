/**
 * What Tey says to a creator, step by step.
 *
 * Same contract as the learner's dialogue engine (a Beat carries its pose and
 * pose family, so line, animation and reaction sound can't drift apart), but
 * written as plain functions: the creator flow is short enough that a rule
 * table would be ceremony.
 *
 *   lineFor      the step's own line: the question, worded from what Tey
 *                already knows (name, track, type…).
 *   reactionFor  fires the instant an option is tapped, in the footer.
 *
 * No emojis — Tey's lines are words.
 */

import type { Beat } from '@/lib/onboarding/dialogue/types';
import { POSE_FAMILY } from '@/lib/onboarding/dialogue/types';
import type { TeyPose } from '@/lib/onboarding/types';
import { trackLabel } from '@/lib/creator/categories';
import type { CreatorAnswers } from './catalog';
import { weeksToFirstCourse } from './catalog';
import type { CreatorStepId } from './steps';

function beat(text: string, pose: TeyPose): Beat {
  return { text, pose, poseFamily: POSE_FAMILY[pose] };
}

const hi = (a: CreatorAnswers) => (a.name ? `, ${a.name}` : '');

export function lineFor(step: CreatorStepId, a: CreatorAnswers): Beat {
  const track = trackLabel(a.track) || 'your subject';
  switch (step) {
    case 'welcome':
      return beat("Hi, I'm Tey! Let's set up your Teyro studio. It takes about two minutes.", 'greeting');
    case 'name':
      return beat('First things first. What should learners call you?', 'curious');
    case 'type':
      return beat(`Nice to meet you${hi(a)}! Which of these sounds most like you?`, 'excited');
    case 'track':
      return beat('What will you teach? Teyro is all about Coding and AI right now.', 'curious');
    case 'topics':
      return beat(`Which parts of ${track} do you know best? Pick all that fit.`, 'thinking');
    case 'experience':
      return beat('How much teaching have you done so far?', 'curious');
    case 'audience':
      return a.creatorType === 'content-creator'
        ? beat('How big is your audience today, across every platform?', 'curious')
        : beat('Do you already have people who follow your work?', 'curious');
    case 'existing':
      return beat('What do you already have that we could build on?', 'thinking');
    case 'goal':
      return beat('And what matters most to you about teaching on Teyro?', 'encouraging');
    case 'time':
      return beat('How much time can you give your course each week?', 'thinking');
    case 'plan':
      return beat(`Here's your plan${hi(a)}. I made it from everything you told me.`, 'celebrating');
    case 'account':
      return beat("Almost done! Let's save your plan so it's waiting in your studio.", 'encouraging');
    case 'profile':
      return beat("Now let's make your creator profile. This is what learners see.", 'excited');
    case 'ready':
      return beat(
        `Your studio is ready${hi(a)}! At your pace, your first ${track} course could be live in about ${weeksToFirstCourse(a.weeklyHours)} ${weeksToFirstCourse(a.weeklyHours) === 1 ? 'week' : 'weeks'}.`,
        'celebrating',
      );
  }
}

/** Tey's reaction to an answer just picked (`pending` is the new value). */
export function reactionFor(step: CreatorStepId, pending: Partial<CreatorAnswers>): Beat | null {
  switch (step) {
    case 'name':
      return pending.name ? beat(`${pending.name}! Great name for a teacher.`, 'excited') : null;
    case 'type':
      switch (pending.creatorType) {
        case 'course-creator':
          return beat("A pro! You'll love how Teyro keeps learners finishing.", 'excited');
        case 'content-creator':
          return beat('Your viewers are going to love learning this way.', 'excited');
        case 'teacher':
          return beat('Teachers make the best courses. You already know how people learn.', 'encouraging');
        case 'mentor':
          return beat("Now your advice can reach way more people.", 'encouraging');
        case 'engineer':
          return beat('Real-world experience is exactly what learners want.', 'excited');
        case 'new-creator':
          return beat("Everyone starts somewhere. I'll show you the way.", 'supportive');
        default:
          return null;
      }
    case 'track':
      if (pending.track === 'coding') return beat('Coding! Learners here want to build real things.', 'excited');
      if (pending.track === 'ai') return beat('AI! Everyone wants to learn it right now.', 'excited');
      return null;
    case 'topics': {
      const n = pending.topics?.length ?? 0;
      if (n === 0) return null;
      if (n >= 3) return beat("That's a lot of expertise! Let's start with one course.", 'celebrating');
      return beat('Learners picked these too. Good match!', 'excited');
    }
    case 'experience':
      return pending.experience === 'first-time'
        ? beat("Perfect. Teyro's lesson method does the heavy lifting.", 'supportive')
        : beat("You'll feel right at home in the lesson builder.", 'encouraging');
    case 'audience':
      return pending.audience === 'none'
        ? beat('No problem. Learners find courses on Teyro every day.', 'supportive')
        : beat('Bring them along! They can join with your link.', 'excited');
    case 'existing': {
      const picks = pending.existing ?? [];
      if (picks.length === 0) return null;
      if (picks.includes('nothing-yet')) return beat("A fresh start. We'll build it together, lesson by lesson.", 'supportive');
      return beat("Great, that'll give you a head start.", 'excited');
    }
    case 'goal':
      switch (pending.goal) {
        case 'earn':
          return beat("Let's get you paid for what you know.", 'excited');
        case 'audience':
          return beat('Teyro will put your course in front of new learners.', 'excited');
        case 'impact':
          return beat('Same! Getting people to the finish line is what Teyro is for.', 'celebrating');
        case 'community':
          return beat('Every course gets its own community. You run it.', 'excited');
        default:
          return null;
      }
    case 'time':
      return pending.weeklyHours === '1-2'
        ? beat('Small steps add up. One lesson a week is plenty.', 'supportive')
        : beat("That's a great pace!", 'excited');
    default:
      return null;
  }
}
