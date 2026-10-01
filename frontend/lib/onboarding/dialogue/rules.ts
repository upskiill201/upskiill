/**
 * Tey's onboarding copy deck.
 *
 * Voice reference: `backend/src/tey/ai/tey-personality.ts` — playful,
 * a little theatrical, quietly caring. "Short, punchy, instantly readable…
 * Simple words. No jargon." Tey teases the task, the streak, the situation.
 * Tey NEVER teases the learner as a person.
 *
 * Writing rules for this file:
 *  - Plain everyday words. Many learners read English as a second language,
 *    and all of them read this on a phone. No idioms ("move the needle",
 *    "pick a lane", "scroll abyss") — they read as noise to anyone who
 *    doesn't already know them.
 *  - One or two short sentences per beat.
 *  - In the speech bubble, the BIG line (`ack`, or `prompt` on steps with no
 *    ack) is the question itself. The small line (`prompt`) is a hint.
 *    Never bury the question in the small line under a filler opener.
 *  - `react` lines appear in the bottom bar next to Continue, so they must
 *    fit there: aim for under ~70 characters.
 *
 * Hard rules, enforced by `__tests__/dialogue.test.ts`:
 *  1. Every (slot, step) pair that is used must have a priority-0 catch-all,
 *     so a beat can never resolve to nothing.
 *  2. Any rule on `barriers` or `prior-attempt` must use a pose from
 *     SUPPORTIVE_POSES. Someone admitting they struggle gets warmth, not a
 *     smirk.
 *  3. Any rule whose `lines` contain `{name}` must supply `linesWithoutName`,
 *     so the name budget always has somewhere to fall back to.
 *  4. No line may promise mastery in a guaranteed timeframe, or claim Teyro
 *     eliminates a barrier. We help with things; we don't cure them.
 *
 * Priority convention:
 *   0   catch-all for the step
 *   10  keyed on one answer (category, or the value just tapped)
 *   20  keyed on two answers
 *   30  keyed on three or more
 */

import type { DialogueRule } from './types';
import { ALWAYS } from './types';
import type { OnboardingAnswersV2 } from '../types';
import { hasBarrier, hasGoal, primaryInterest } from '../types';

const isCoding = (a: OnboardingAnswersV2) => a.category === 'coding';
const isAi = (a: OnboardingAnswersV2) => a.category === 'ai';
const interestIs = (id: string) => (a: OnboardingAnswersV2) => primaryInterest(a) === id;
const levelIs = (id: string) => (a: OnboardingAnswersV2) => a.experienceLevel === id;

export const DIALOGUE_RULES: DialogueRule[] = [
  // ══ STEP 1 — WELCOME ══════════════════════════════════════════════════════
  {
    slot: 'prompt',
    step: 'welcome',
    when: ALWAYS,
    priority: 0,
    pose: 'greeting',
    lines: [
      "Hi there! I'm Tey. I'll help you learn real skills, a few minutes a day.",
      "Hey! I'm Tey, your learning buddy. Let's get you set up.",
    ],
  },
  {
    // Resume — they've been here before, don't re-introduce yourself.
    slot: 'prompt',
    step: 'welcome',
    when: (a) => Boolean(a.name),
    priority: 10,
    pose: 'greeting',
    lines: ["Welcome back, {name}! Let's pick up where we left off."],
    linesWithoutName: ["Welcome back! Let's pick up where we left off."],
  },

  // ══ STEP 2 — NAME ═════════════════════════════════════════════════════════
  {
    slot: 'prompt',
    step: 'name',
    when: ALWAYS,
    priority: 0,
    pose: 'curious',
    lines: ['First things first. What should I call you?'],
  },
  {
    slot: 'prompt',
    step: 'name',
    when: (a) => Boolean(a.name),
    priority: 10,
    pose: 'curious',
    lines: ['Should I call you {name}? Or something else?'],
    linesWithoutName: ['Is this the name you want me to use?'],
  },
  {
    slot: 'react',
    step: 'name',
    when: ALWAYS,
    priority: 0,
    pose: 'excited',
    lines: ['Nice to meet you, {name}!', '{name}! Great name.'],
    linesWithoutName: ['Nice to meet you!'],
  },

  // ══ STEP 3 — CATEGORY ═════════════════════════════════════════════════════
  {
    slot: 'prompt',
    step: 'category',
    when: ALWAYS,
    priority: 0,
    pose: 'curious',
    lines: ['So {name}, what do you want to learn?', 'Okay {name}, what should we learn first?'],
    linesWithoutName: ['So, what do you want to learn first?'],
  },
  {
    slot: 'react',
    step: 'category',
    when: isCoding,
    priority: 10,
    pose: 'mischievous',
    lines: ["Coding! Let's turn you into a developer.", 'Coding! Great pick. It\'s useful everywhere.'],
  },
  {
    slot: 'react',
    step: 'category',
    when: isAi,
    priority: 10,
    pose: 'excited',
    lines: ["AI! Ooh, now we're talking.", "AI! Great pick. It's changing everything."],
  },
  {
    slot: 'react',
    step: 'category',
    when: ALWAYS,
    priority: 0,
    pose: 'excited',
    lines: ['Great pick!'],
  },

  // ══ STEP 4 — GOALS ════════════════════════════════════════════════════════
  {
    slot: 'ack',
    step: 'goals',
    when: isCoding,
    priority: 10,
    pose: 'curious',
    lines: ['Coding it is! Why do you want to learn it?'],
  },
  {
    slot: 'ack',
    step: 'goals',
    when: isAi,
    priority: 10,
    pose: 'curious',
    lines: ['AI it is! What do you want to use it for?'],
  },
  {
    slot: 'ack',
    step: 'goals',
    when: ALWAYS,
    priority: 0,
    pose: 'curious',
    lines: ['Why do you want to learn this?'],
  },
  {
    slot: 'prompt',
    step: 'goals',
    when: ALWAYS,
    priority: 0,
    pose: 'curious',
    lines: ['Pick as many as you like.'],
  },
  {
    slot: 'react',
    step: 'goals',
    when: (a) => hasGoal(a, 'build-projects'),
    priority: 10,
    pose: 'excited',
    lines: ['Your own projects? I love that.'],
  },
  {
    slot: 'react',
    step: 'goals',
    when: (a) => hasGoal(a, 'career'),
    priority: 10,
    pose: 'excited',
    lines: ["A better job? Let's work toward it together."],
  },
  {
    slot: 'react',
    step: 'goals',
    when: (a) => hasGoal(a, 'freelance'),
    priority: 10,
    pose: 'excited',
    lines: ['Freelancing! We\'ll focus on skills people pay for.'],
  },
  {
    slot: 'react',
    step: 'goals',
    when: (a) => hasGoal(a, 'startup'),
    priority: 10,
    pose: 'mischievous',
    lines: ['Your own business? Bold. I like it.'],
  },
  {
    slot: 'react',
    step: 'goals',
    when: (a) => hasGoal(a, 'automate'),
    priority: 10,
    pose: 'mischievous',
    lines: ['Less boring work? Best reason ever.'],
  },
  {
    slot: 'react',
    step: 'goals',
    when: (a) => hasGoal(a, 'explore'),
    priority: 10,
    pose: 'curious',
    lines: ["Just curious? That's a great reason too."],
  },
  {
    slot: 'react',
    step: 'goals',
    when: ALWAYS,
    priority: 0,
    pose: 'curious',
    lines: ['Got it!'],
  },

  // ══ STEP 5 — INTERESTS (the branch) ═══════════════════════════════════════
  {
    slot: 'ack',
    step: 'interests',
    when: isCoding,
    priority: 10,
    pose: 'thinking',
    lines: ['Which part of coding sounds most fun to you?'],
  },
  {
    slot: 'ack',
    step: 'interests',
    when: isAi,
    priority: 10,
    pose: 'thinking',
    lines: ['What do you want to do with AI?'],
  },
  {
    slot: 'ack',
    step: 'interests',
    when: ALWAYS,
    priority: 0,
    pose: 'thinking',
    lines: ['What are you most excited to learn?'],
  },
  {
    slot: 'prompt',
    step: 'interests',
    when: ALWAYS,
    priority: 0,
    pose: 'thinking',
    lines: ['Pick one or more.'],
  },
  {
    slot: 'react',
    step: 'interests',
    when: interestIs('build-agents'),
    priority: 10,
    pose: 'excited',
    lines: ['AI agents! AI that does the work for you. Love it.'],
  },
  {
    slot: 'react',
    step: 'interests',
    when: interestIs('automations'),
    priority: 10,
    pose: 'mischievous',
    lines: ['Automations! Set it up once, never do it by hand again.'],
  },
  {
    slot: 'react',
    step: 'interests',
    when: interestIs('use-tools'),
    priority: 10,
    pose: 'excited',
    lines: ['Smart! Most people only use a tiny bit of what AI can do.'],
  },
  {
    slot: 'react',
    step: 'interests',
    when: interestIs('web-development'),
    priority: 10,
    pose: 'excited',
    lines: ['The web! Build something and share it with the world.'],
  },
  {
    slot: 'react',
    step: 'interests',
    when: interestIs('mobile-development'),
    priority: 10,
    pose: 'excited',
    lines: ['Apps! Something that lives right in your pocket.'],
  },
  {
    slot: 'react',
    step: 'interests',
    when: interestIs('programming-fundamentals'),
    priority: 10,
    pose: 'mischievous',
    lines: ['The basics first. Smart! It makes everything else easier.'],
  },
  {
    slot: 'react',
    step: 'interests',
    when: interestIs('software-development'),
    priority: 10,
    pose: 'excited',
    lines: ['Real software! Things that actually run.'],
  },
  {
    slot: 'react',
    step: 'interests',
    when: interestIs('exploring'),
    priority: 10,
    pose: 'encouraging',
    lines: ["No rush! We'll figure it out together."],
  },
  {
    slot: 'react',
    step: 'interests',
    when: ALWAYS,
    priority: 0,
    pose: 'excited',
    lines: ['Great choice!'],
  },

  // ══ STEP 6 — EXPERIENCE ═══════════════════════════════════════════════════
  {
    slot: 'ack',
    step: 'experience',
    when: (a) => Boolean(primaryInterest(a)) && primaryInterest(a) !== 'exploring',
    priority: 10,
    pose: 'curious',
    lines: ['{interest}, nice! How much do you already know?', '{interest} it is! Where are you starting from?'],
  },
  {
    slot: 'ack',
    step: 'experience',
    when: ALWAYS,
    priority: 0,
    pose: 'curious',
    lines: ['How much do you already know?'],
  },
  {
    slot: 'prompt',
    step: 'experience',
    when: ALWAYS,
    priority: 0,
    pose: 'curious',
    lines: ['No wrong answers. It just helps me pick where to start.'],
  },
  {
    slot: 'react',
    step: 'experience',
    when: levelIs('beginner'),
    priority: 10,
    pose: 'encouraging',
    lines: [
      "Starting from zero? Perfect. We'll go step by step.",
      'Brand new? Great! Everyone starts somewhere.',
    ],
  },
  {
    slot: 'react',
    step: 'experience',
    when: levelIs('tried-a-little'),
    priority: 10,
    pose: 'supportive',
    lines: ["You've tried a bit already? We'll build on that."],
  },
  {
    slot: 'react',
    step: 'experience',
    when: levelIs('basics'),
    priority: 10,
    pose: 'curious',
    lines: ['You know the basics. We can move faster!'],
  },
  {
    slot: 'react',
    step: 'experience',
    when: levelIs('experienced'),
    priority: 10,
    pose: 'excited',
    lines: ["Nice! I'll skip the easy stuff.", "Experienced! Then we'll go deeper."],
  },
  {
    slot: 'react',
    step: 'experience',
    when: ALWAYS,
    priority: 0,
    pose: 'encouraging',
    lines: ['Got it! Now I know where to start.'],
  },

  // ══ STEP 7 — PRIOR ATTEMPT (optional) ═════════════════════════════════════
  // Tone rule 2 applies to every rule below: SUPPORTIVE_POSES only.
  {
    slot: 'ack',
    step: 'prior-attempt',
    when: levelIs('beginner'),
    priority: 10,
    pose: 'supportive',
    lines: ['Is this your first time trying to learn this?'],
  },
  {
    slot: 'ack',
    step: 'prior-attempt',
    when: (a) => a.experienceLevel === 'experienced' || a.experienceLevel === 'basics',
    priority: 10,
    pose: 'supportive',
    lines: ['How has learning this gone for you so far?'],
  },
  {
    slot: 'ack',
    step: 'prior-attempt',
    when: ALWAYS,
    priority: 0,
    pose: 'supportive',
    lines: ['Have you tried learning this before?'],
  },
  {
    slot: 'prompt',
    step: 'prior-attempt',
    when: ALWAYS,
    priority: 0,
    pose: 'supportive',
    lines: ['You can skip this one if you like.'],
  },
  {
    slot: 'react',
    step: 'prior-attempt',
    when: (a) => a.priorAttempt === 'stopped',
    priority: 10,
    pose: 'supportive',
    lines: [
      "That happens to almost everyone. Let's make this time different.",
      "Totally normal! It's usually the plan, not you. Let's make a better one.",
    ],
  },
  {
    slot: 'react',
    step: 'prior-attempt',
    when: (a) => a.priorAttempt === 'still-learning',
    priority: 10,
    pose: 'encouraging',
    lines: ["Already learning! I'll help you keep going."],
  },
  {
    slot: 'react',
    step: 'prior-attempt',
    when: (a) => a.priorAttempt === 'self-taught-a-little',
    priority: 10,
    pose: 'encouraging',
    lines: ['You taught yourself? That takes real effort!'],
  },
  {
    slot: 'react',
    step: 'prior-attempt',
    when: (a) => a.priorAttempt === 'first-time',
    priority: 10,
    pose: 'encouraging',
    lines: ["Your first time! Let's make it a good one."],
  },
  {
    slot: 'react',
    step: 'prior-attempt',
    when: (a) => a.priorAttempt === 'skipped',
    priority: 10,
    pose: 'supportive',
    lines: ['No problem. Moving on!'],
  },
  {
    slot: 'react',
    step: 'prior-attempt',
    when: ALWAYS,
    priority: 0,
    pose: 'supportive',
    lines: ['Thanks for telling me.'],
  },

  // ══ STEP 8 — BARRIERS (optional) ══════════════════════════════════════════
  {
    slot: 'ack',
    step: 'barriers',
    when: (a) => a.priorAttempt === 'stopped',
    priority: 10,
    pose: 'supportive',
    lines: ['What made it hard to keep going last time?'],
  },
  {
    slot: 'ack',
    step: 'barriers',
    when: ALWAYS,
    priority: 0,
    pose: 'supportive',
    lines: ['What usually gets in the way when you learn?'],
  },
  {
    slot: 'prompt',
    step: 'barriers',
    when: ALWAYS,
    priority: 0,
    pose: 'supportive',
    lines: ['Pick all that apply. No judgment here!'],
  },
  {
    slot: 'react',
    step: 'barriers',
    when: (a) => hasBarrier(a, 'consistency'),
    priority: 10,
    pose: 'supportive',
    lines: ["Super common! A little every day helps a lot. That's how Teyro works."],
  },
  {
    slot: 'react',
    step: 'barriers',
    when: (a) => hasBarrier(a, 'distracted'),
    priority: 10,
    pose: 'supportive',
    lines: ["Phones are built to grab your attention. I'll make learning worth yours."],
  },
  {
    slot: 'react',
    step: 'barriers',
    when: (a) => hasBarrier(a, 'no-time'),
    priority: 10,
    pose: 'supportive',
    lines: ["Then we'll keep it short. A few minutes still counts!"],
  },
  {
    slot: 'react',
    step: 'barriers',
    when: (a) => hasBarrier(a, 'boring'),
    priority: 10,
    pose: 'supportive',
    lines: ["If I ever bore you, that's on me. I'll keep it fun."],
  },
  {
    slot: 'react',
    step: 'barriers',
    when: (a) => hasBarrier(a, 'what-next'),
    priority: 10,
    pose: 'encouraging',
    lines: ["I'll always show you what's next. No guessing."],
  },
  {
    slot: 'react',
    step: 'barriers',
    when: (a) => hasBarrier(a, 'hard-concepts'),
    priority: 10,
    pose: 'supportive',
    lines: ["Hard stuff is hard for everyone. We'll take it in small steps."],
  },
  {
    slot: 'react',
    step: 'barriers',
    when: (a) => hasBarrier(a, 'accountability'),
    priority: 10,
    pose: 'encouraging',
    lines: ["I can help with that. I'll check in on you!"],
  },
  {
    slot: 'react',
    step: 'barriers',
    when: (a) => hasBarrier(a, 'none'),
    priority: 10,
    pose: 'encouraging',
    lines: ["Nice! Let's keep it that way."],
  },
  {
    slot: 'react',
    step: 'barriers',
    when: ALWAYS,
    priority: 0,
    pose: 'supportive',
    lines: ["Thanks. I'll keep that in mind."],
  },

  // ══ STEP 9 — COMMITMENT ═══════════════════════════════════════════════════
  // The ack here is drawn straight from step 8 — the clearest proof in the
  // whole flow that the previous answer went somewhere.
  {
    slot: 'ack',
    step: 'commitment',
    when: (a) => hasBarrier(a, 'no-time'),
    priority: 20,
    pose: 'encouraging',
    lines: ["You said time's tight, so let's start small. How much time per day?"],
  },
  {
    slot: 'ack',
    step: 'commitment',
    when: (a) => hasBarrier(a, 'consistency'),
    priority: 10,
    pose: 'encouraging',
    lines: ['Small and steady wins. How much time can you give each day?'],
  },
  {
    slot: 'ack',
    step: 'commitment',
    when: ALWAYS,
    priority: 0,
    pose: 'encouraging',
    lines: ['How much time can you give each day?', "What's your daily learning goal?"],
  },
  {
    slot: 'prompt',
    step: 'commitment',
    when: ALWAYS,
    priority: 0,
    pose: 'encouraging',
    lines: ['Pick one you can keep, even on a busy day.'],
  },
  {
    slot: 'react',
    step: 'commitment',
    when: (a) => a.dailyCommitment === '5',
    priority: 10,
    pose: 'encouraging',
    lines: ['5 minutes! Easy to fit into any day.', 'Small and steady. I like it.'],
  },
  {
    slot: 'react',
    step: 'commitment',
    when: (a) => a.dailyCommitment === '10',
    priority: 10,
    pose: 'excited',
    lines: ['10 minutes! The sweet spot.'],
  },
  {
    slot: 'react',
    step: 'commitment',
    when: (a) => a.dailyCommitment === '20',
    priority: 10,
    pose: 'excited',
    lines: ["20 minutes! Now that's a real session."],
  },
  {
    slot: 'react',
    step: 'commitment',
    when: (a) => a.dailyCommitment === '30',
    priority: 10,
    pose: 'mischievous',
    lines: ["30 minutes?! Okay, I see you. I'll hold you to it."],
  },
  {
    slot: 'react',
    step: 'commitment',
    when: ALWAYS,
    priority: 0,
    pose: 'encouraging',
    lines: ['Great goal!'],
  },

  // ══ STEP 10 — PREFERRED TIME ══════════════════════════════════════════════
  {
    slot: 'ack',
    step: 'preferred-time',
    when: (a) => Boolean(a.dailyCommitment),
    priority: 10,
    pose: 'curious',
    lines: ['{commitment} a day. When works best for you?', "When's the best time for your {commitment}?"],
  },
  {
    slot: 'ack',
    step: 'preferred-time',
    when: ALWAYS,
    priority: 0,
    pose: 'curious',
    lines: ['When do you want to learn?'],
  },
  {
    slot: 'prompt',
    step: 'preferred-time',
    when: ALWAYS,
    priority: 0,
    pose: 'curious',
    lines: ["Pick the time you're most likely to show up."],
  },
  {
    slot: 'react',
    step: 'preferred-time',
    when: (a) => a.preferredTime === 'morning',
    priority: 10,
    pose: 'excited',
    lines: ['Mornings! Get it done before the day gets busy.'],
  },
  {
    slot: 'react',
    step: 'preferred-time',
    when: (a) => a.preferredTime === 'afternoon',
    priority: 10,
    pose: 'excited',
    lines: ['Afternoons! A great way to beat the midday slump.'],
  },
  {
    slot: 'react',
    step: 'preferred-time',
    when: (a) => a.preferredTime === 'evening',
    priority: 10,
    pose: 'excited',
    lines: ['Evenings! A nice way to end the day.'],
  },
  {
    slot: 'react',
    step: 'preferred-time',
    when: (a) => a.preferredTime === 'no-preference',
    priority: 10,
    pose: 'curious',
    lines: ["Flexible! I'll learn your rhythm as we go."],
  },
  {
    slot: 'react',
    step: 'preferred-time',
    when: ALWAYS,
    priority: 0,
    pose: 'curious',
    lines: ['Got it!'],
  },

  // ══ PATH REVEAL ═══════════════════════════════════════════════════════════
  // The plan itself is composed by `pathSummary.ts`; this is the lead-in.
  {
    slot: 'reveal',
    step: 'path-reveal',
    when: ALWAYS,
    priority: 0,
    pose: 'excited',
    lines: ["Ta-da! I made you a plan. Here's how we'll do this."],
  },

  // ══ REVIEW ══════════════════════════════════════════════════════
  {
    slot: 'prompt',
    step: 'review',
    when: ALWAYS,
    priority: 0,
    pose: 'curious',
    lines: ['Did I get everything right?', "Here's what I know about you. Anything to change?"],
  },

  // ══ ACCOUNT ═════════════════════════════════════════════════════
  {
    slot: 'ack',
    step: 'account',
    when: ALWAYS,
    priority: 0,
    pose: 'excited',
    lines: [
      "Last step! Save your progress so it's here tomorrow.",
      "Let's save your plan so you don't lose it.",
    ],
  },

  // ══ REMINDERS ═══════════════════════════════════════════════════
  {
    slot: 'ack',
    step: 'reminders',
    when: (a) => hasBarrier(a, 'consistency') && Boolean(a.preferredTime) && a.preferredTime !== 'no-preference',
    priority: 30,
    pose: 'encouraging',
    lines: ['You said consistency is the hard part. Want me to remind you in the {time}?'],
  },
  {
    slot: 'ack',
    step: 'reminders',
    when: (a) => hasBarrier(a, 'consistency') || hasBarrier(a, 'accountability'),
    priority: 20,
    pose: 'encouraging',
    lines: ['You said sticking with it is hard. Want me to send you reminders?'],
  },
  {
    slot: 'ack',
    step: 'reminders',
    when: (a) => Boolean(a.preferredTime) && a.preferredTime !== 'no-preference',
    priority: 10,
    pose: 'curious',
    lines: ['Want a quick reminder in the {time}?'],
  },
  {
    slot: 'ack',
    step: 'reminders',
    when: ALWAYS,
    priority: 0,
    pose: 'curious',
    lines: ["Want me to remind you when it's time to learn?"],
  },
  {
    slot: 'prompt',
    step: 'reminders',
    when: ALWAYS,
    priority: 0,
    pose: 'curious',
    lines: ['Totally up to you. Teyro works either way.'],
  },
  {
    slot: 'react',
    step: 'reminders',
    when: (a) => a.notifications?.enabled === true,
    priority: 10,
    pose: 'excited',
    lines: ["Done! I'll only remind you when it matters."],
  },
  {
    slot: 'react',
    step: 'reminders',
    when: ALWAYS,
    priority: 0,
    pose: 'idle',
    lines: ['No problem. You know where to find me.'],
  },

  // ══ COMPLETION ════════════════════════════════════════════════════════════
  {
    slot: 'reveal',
    step: 'completion',
    when: interestIs('build-agents'),
    priority: 10,
    pose: 'celebrating',
    lines: ["You're in, {name}! Let's build AI that does the work for you."],
    linesWithoutName: ["You're in! Let's build AI that does the work for you."],
  },
  {
    slot: 'reveal',
    step: 'completion',
    when: interestIs('automations'),
    priority: 10,
    pose: 'celebrating',
    lines: ["You're in, {name}! Let's make the boring stuff run itself."],
    linesWithoutName: ["You're in! Let's make the boring stuff run itself."],
  },
  {
    slot: 'reveal',
    step: 'completion',
    when: interestIs('use-tools'),
    priority: 10,
    pose: 'celebrating',
    lines: ["You're in, {name}! Let's make AI work for you."],
    linesWithoutName: ["You're in! Let's make AI work for you."],
  },
  {
    slot: 'reveal',
    step: 'completion',
    when: isCoding,
    priority: 5,
    pose: 'celebrating',
    lines: ["You're in, {name}! Time to write some code."],
    linesWithoutName: ["You're in! Time to write some code."],
  },
  {
    slot: 'reveal',
    step: 'completion',
    when: ALWAYS,
    priority: 0,
    pose: 'celebrating',
    lines: ["You're in, {name}! Let's start learning."],
    linesWithoutName: ["You're in! Let's start learning."],
  },
];
