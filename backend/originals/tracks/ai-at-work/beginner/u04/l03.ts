import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Unit 4 · Lesson 3 — checking numbers and dates. */
const lesson: OriginalLesson = {
  key: 'l03',
  title: 'Checking numbers and dates',
  summary: 'Numbers and dates are where AI slips most quietly. Five quick checks catch most of them before they reach a client.',
  minutes: 12,
  outcomes: [
    'Run five quick checks on any number',
    'Catch wrong dates and days of the week',
    'Recompute simple maths instead of trusting it',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'Five checks for any number',
      steps: [
        { title: '1. Where did it come from?', body: 'Your data, a source you opened, or the AI\'s memory? Only the first two count.' },
        { title: '2. Does it add up?', body: 'If 40% + 35% + 30% are "the three groups", that\'s 105%. Something is wrong.' },
        { title: '3. Is it the right size?', body: 'Lagos has millions of people, not thousands. A number off by a factor of ten often looks fine at a glance.' },
        { title: '4. Redo the maths', body: 'Use a calculator or spreadsheet for any sum, percentage or total the AI worked out. Don\'t trust its arithmetic.' },
        { title: '5. Check dates against a calendar', body: '"Tuesday 14 March": is the 14th really a Tuesday that year? AI often gets days of the week wrong.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Any number the AI calculated, recalculate. Any date it gives with a day of the week, check on a calendar.',
    },
  ],
  apply: {
    scenario: 'Ada is checking the numbers in the launch plan the AI drafted.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Order the five checks.',
        lines: ['Where did it come from?', 'Does it add up?', 'Is it the right size?', 'Redo the maths', 'Check dates on a calendar'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line doesn\'t add up?',
        lines: [
          'Pilot users: 1,200',
          'Active weekly: 840 (70%)',
          'Inactive: 480 (30%)',
          'Total: 1,200',
        ],
        bug: 2,
        fix: 'Inactive: 360 (30%)',
        explanation: '840 + 480 is 1,320, not 1,200. 30% of 1,200 is 360.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'What is 30% of 1,200?',
        answers: ['360'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'The AI says the three customer groups are 40%, 35% and 30%. What\'s wrong?',
        options: [
          { text: 'They add up to 105%' },
          { text: 'Nothing', why: '40 + 35 + 30 = 105.' },
          { text: 'Percentages can\'t be used', why: 'They can; these just don\'t add up.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Trust it, or recalculate?',
        groups: ['Recalculate', 'Fine to keep'],
        items: [
          { text: 'A total the AI added up', group: 0 },
          { text: 'A percentage change it worked out', group: 0 },
          { text: 'A number you typed in yourself', group: 1 },
          { text: 'A figure copied from your own spreadsheet', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'The plan says the launch call is "Tuesday 14 March". Is that right?',
        prompt: 'What should Ada do?',
        options: [
          { text: 'Check the date on a calendar before confirming, and fix the day or date if they don\'t match.' },
          { text: 'Say yes; the AI wrote it.', why: 'AI often mixes up days and dates.' },
          { text: 'Remove the day of the week only.', why: 'Check both first.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the tip.',
        template: 'Any number the AI [[1]], recalculate. Any date with a [[2]] of the week, check.',
        blanks: [['calculated'], ['day']],
        distractors: ['copied', 'month'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the check to the mistake it catches.',
        pairs: [
          ['Does it add up?', 'Groups totalling 105%'],
          ['Right size?', 'Lagos with 15,000 people'],
          ['Redo the maths', 'A wrong total'],
          ['Calendar', 'A Tuesday that is really a Wednesday'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'The AI says sign-ups grew from 200 to 300, "a 150% increase". What\'s right?',
        options: [
          { text: 'A 50% increase' },
          { text: 'A 150% increase', why: '300 is 150% of 200, but the increase is 50%.' },
          { text: 'A 100% increase', why: 'That would be 400.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Sign-ups went from 200 to 300. What is the percentage increase? (number only)',
        answers: ['50', '50%'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which request is safest for maths?',
        options: [
          { text: 'Work out the totals.', why: 'You\'d still need to check its arithmetic.' },
          { text: 'Write the spreadsheet formula for the totals, so I can calculate them myself.' },
          { text: 'Guess the totals roughly.', why: 'Guesses don\'t belong in a client plan.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Right size, or suspicious?',
        groups: ['Plausible', 'Suspicious'],
        items: [
          { text: 'A small shop with 3 staff', group: 0 },
          { text: 'A small shop with 3,000 staff', group: 1 },
          { text: 'A pilot with 1,200 users', group: 0 },
          { text: 'A pilot with 1.2 billion users', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Look at the last document where you used numbers from AI. Which of the five checks did you skip?',
    starters: ['I skipped...', 'Next time I\'ll...'],
  },
  deepen: { title: 'Try it today', summary: 'Ask AI to calculate something simple from your work, then check it in a spreadsheet. Note any difference.' },
  notes: 'All figures are fictional. Language models are known to make arithmetic and calendar errors; recalculating with a spreadsheet or calculator is standard advice.',
};

export default lesson;
