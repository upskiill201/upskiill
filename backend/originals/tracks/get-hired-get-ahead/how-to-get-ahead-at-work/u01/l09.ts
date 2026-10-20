import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 3 · Chapter 1 · Lesson 9 — choosing an early win: flashy vs. useful. Before / After. */
const lesson: OriginalLesson = {
  key: 'l09',
  title: 'The right early win',
  summary: 'Clinton wants an early win. Idea one: a beautiful new dashboard for the team. Idea two: fix the bug that makes drivers tap "Confirm" three times. Ngozi\'s face tells him which one matters.',
  minutes: 11,
  outcomes: ['Choose an early win that matters to others', 'Prefer small and finished over big and impressive', 'Check the choice with your manager'],
  learn: [
    {
      kind: 'compare',
      title: 'Two early wins',
      before: { label: 'Flashy', text: 'A new dashboard with charts and dark mode. Three weeks of work, nobody asked for it, and it touches code Clinton doesn\'t fully understand yet.\n\nImpressive in a demo. But it solves no one\'s problem, and it might not get finished.' },
      after: { label: 'Useful', text: 'Fix the "tap Confirm three times" bug drivers complain about every week. Two days, clearly scoped, inside the sync service he\'s learning anyway.\n\nThe support team stops getting the same complaint. Ngozi mentions it in the team chat. Small, finished, and felt by real people.' },
      notes: [
        'A good early win solves a real problem someone already has.',
        'Small and finished beats big and impressive.',
        'Check it with your manager before you start.',
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Pick a small, real, finishable problem people already complain about. Check it with your manager first.',
    },
  ],
  apply: {
    scenario: 'Clinton chooses his early win.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why is the bug fix a better early win than the dashboard?',
        options: [
          { text: 'It solves a real problem people already have, and it can be finished' },
          { text: 'It\'s more impressive', why: 'The dashboard is more impressive; the fix matters more.' },
          { text: 'It\'s harder', why: 'It\'s smaller, real and finishable.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Good early win, or not?',
        groups: ['Good', 'Not good'],
        items: [
          { text: 'Fix a bug drivers complain about weekly', group: 0 },
          { text: 'Redesign the logo', group: 1 },
          { text: 'Speed up a slow page support uses daily', group: 0 },
          { text: 'A three-month rewrite', group: 1 },
          { text: 'Update an out-of-date setup guide', group: 0 },
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Put Clinton\'s steps in order.',
        lines: ['List problems people already complain about', 'Pick a small, finishable one', 'Check it with Ngozi', 'Finish it and share the result'],
      },
      {
        kind: 'findBug',
        prompt: 'Tap the risky choice.',
        lines: ['Two days, clearly scoped.', 'Starts a big feature without telling Ngozi.', 'Inside the code he\'s learning anyway.'],
        bug: 1,
        explanation: 'Check with your manager first. They know what matters.',
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best message to Ngozi.',
        from: 'clinton',
        message: 'How do I check my early-win idea with Ngozi?',
        options: [
          { text: '"Drivers keep tapping Confirm three times. I think I can fix it in two days. Is that a good use of my time?"' },
          { text: '"I\'m building a dashboard, OK?"', why: 'Ask, with the problem and the size.' },
          { text: 'Don\'t check, just do it.', why: 'Check first.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each feature to the right description.',
        pairs: [
          ['The dashboard', 'Impressive, unasked, might not finish'],
          ['The Confirm bug fix', 'Small, real, felt by drivers'],
          ['Updating the setup guide', 'Small, helps every new starter'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Who noticed the fix?',
        options: [
          { text: 'The support team, and Ngozi mentioned it in the team chat' },
          { text: 'Nobody', why: 'Support stopped getting the complaint.' },
          { text: 'Only Clinton', why: 'Support and Ngozi noticed.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the tip.',
        template: 'Small and [[1]] beats big and [[2]].',
        blanks: [['finished'], ['impressive']],
        distractors: ['flashy', 'boring', 'secret'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many times did drivers have to tap Confirm? (a number)',
        answers: ['3', 'three'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Felt by real people, or not?',
        groups: ['Felt', 'Not really'],
        items: [
          { text: 'Fewer support complaints', group: 0 },
          { text: 'A new colour theme nobody asked for', group: 1 },
          { text: 'Drivers tapping once', group: 0 },
          { text: 'An unused chart', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'What small problem do people around you complain about that you could fix in a few days?',
    starters: ['People complain about...', 'I could...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'List three small problems people already complain about where you work or study. Pick one and check it with someone in charge.',
  },
  notes: 'Early wins (small, real, visible) is a core idea in Watkins (2003), applied to a graduate role.',
};

export default lesson;
