import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 7. Chat with Tey: one step at a time. */
const lesson: OriginalLesson = {
  key: 'l07',
  title: 'One step at a time',
  summary: 'The plan has five steps. Hazel says "do all five". Step 2 breaks, and steps 3 to 5 are built on top of the break. Tey shows her the rhythm that keeps a build clean: do one, check one.',
  minutes: 11,
  outcomes: [
    'Build a plan one step at a time',
    'Check each step before the next',
    'Say "stop after step N"',
  ],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: 'Hazel\'s plan: 1) the form, 2) save pledges, 3) total and "to go", 4) the thermometer bar, 5) biggest three pledges.', replies: ['And she said "do all five"?'] },
        { tey: 'She did. Step 2 had a bug: pledges vanished on refresh. Steps 3, 4 and 5 were built on top of it, so all of them looked broken. Where would you start fixing?', replies: ['No idea.', 'Step 2?'] },
        { tey: 'Exactly the problem: with five changes at once, you can\'t tell which one broke it. Now the rhythm: "Do step 1 only, then stop." Check it. Then "Now step 2, then stop." Check. And so on.', replies: ['Isn\'t that slower?'] },
        { tey: 'Each step takes a minute longer. But when something breaks, you know exactly which step did it, and only one small thing needs fixing. Overall, it\'s much faster.', replies: ['What does "check" mean here?'] },
        { tey: 'Do what the step promised. Step 1: can you type a name and amount? Step 2: add one, refresh the page, is it still there? Small, quick tests.', replies: ['Do one, check one.'] },
      ],
    },
    {
      kind: 'code',
      language: 'plaintext',
      code: 'Do step 2 only: save each pledge so it\'s still there after I refresh the page.\nThen stop and tell me how to check it.',
      caption: 'Hazel\'s step-by-step message.',
    },
  ],
  apply: {
    scenario: 'Five steps, one at a time.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why is "do all five steps" risky?',
        options: [
          { text: 'It costs extra money', why: 'The issue is finding what broke.' },
          { text: 'If something breaks, you can\'t tell which step caused it' },
          { text: 'The AI can only count to three', why: 'It can count. You can\'t check five changes at once.' },
        ],
        answer: 1,
      },
      {
        kind: 'orderLines',
        prompt: 'The rhythm, in order.',
        lines: ['Ask for one step', 'It builds that step and stops', 'Check that step yourself', 'Ask for the next step'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each step to its quick check.',
        pairs: [
          ['1. The form', 'Can I type a name and amount?'],
          ['2. Save pledges', 'Still there after a refresh?'],
          ['3. The total', 'Do $50 + $200 show $250?'],
          ['4. The bar', 'Is it about a third full at $6,000?'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Hazel\'s message.',
        template: 'Do step 3 [[1]], then [[2]] and tell me how to check it.',
        blanks: [['only'], ['stop']],
        distractors: ['and more', 'continue'],
      },
      {
        kind: 'chatReply',
        from: 'benny',
        message: 'Step 1 works! Let\'s do steps 2 to 5 now, all at once.',
        prompt: 'Hazel\'s reply?',
        options: [
          { text: 'Okay, all four.', why: 'Back to not knowing which one broke.' },
          { text: 'Step 2 now. Then we check it. Then step 3.' },
          { text: 'Let\'s skip checking, it\'s going well.', why: 'Going well is the best time to keep checking.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'The rhythm in four words: "Do one, ..."',
        answers: ['check one', 'do one check one', 'do one, check one'],
        placeholder: '... one',
      },
      {
        kind: 'findBug',
        prompt: 'Which step check is too weak?',
        lines: [
          'Step 1: type a name and amount, press Add.',
          'Step 2: add a pledge, refresh, it\'s still there.',
          'Step 3: it looks about right.',
        ],
        bug: 2,
        fix: 'Step 3: add $50 and $200, the total shows $250.',
        explanation: '"About right" can\'t catch a wrong number. Use real numbers.',
      },
      {
        kind: 'sortGroups',
        prompt: 'Good step size, or too big?',
        groups: ['Good size', 'Too big'],
        items: [
          { text: 'Add the form', group: 0 },
          { text: 'Build the whole page', group: 1 },
          { text: 'Show the total', group: 0 },
          { text: 'Add saving, the bar, and a leaderboard', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Step 2 fails its check. What should Hazel do?',
        options: [
          { text: 'Fix step 2 before starting step 3' },
          { text: 'Move on to step 3 and hope', why: 'Step 3 will be built on the bug.' },
          { text: 'Delete the project', why: 'Only one small step needs fixing.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Review: which message keeps the change small and clear?',
        options: [
          { text: 'Do step 4 only: a gold bar that fills up as the total grows toward $18,000. Stop after.' },
          { text: 'Do the thermometer and whatever else', why: '"Whatever else" invites surprises.' },
          { text: 'Make step 4 nice', why: 'Vague, and no stop.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'When you do a big job in one go (cleaning, packing, an assignment), how do you find what went wrong? How could "do one, check one" help?',
  },
  deepen: {
    title: 'On your computer: step by step',
    summary: 'Take your plan. Ask for step 1 only, then stop. Check it. Then step 2 only. Keep going one step at a time. Note each step\'s check in your brief.md.',
  },
  notes: 'Incremental development; localStorage-style saving discussed in plain words. No tool-specific facts.',
};

export default lesson;
