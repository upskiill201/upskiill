import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 2. Step-by-step: the 10-minute weekly money check. */
const lesson: OriginalLesson = {
  key: 'l02',
  title: 'The 10-minute money check',
  summary: 'Sunday, 8 p.m., hall kitchen. Kofi\'s new ritual: ten minutes, five steps, every week. Here it is, step by step, so you can copy it tonight.',
  minutes: 11,
  outcomes: [
    'Run a weekly money check in about ten minutes',
    'Catch drift while it\'s still small',
    'Set up next week before it starts',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'Sunday, 8 p.m.',
      steps: [
        { title: '1. Look (2 minutes)', body: 'Open your mobile money or bank history for the last 7 days. Scroll. Don\'t judge yet.' },
        { title: '2. Sort (3 minutes)', body: 'Add the week\'s spending to your sheet\'s lines. Round to the nearest cedi; nobody needs pesewas. Use your few simple categories.' },
        { title: '3. Compare (2 minutes)', body: 'For each weekly line: under, on or over? Write one word next to each. Kofi\'s week: staples on, food out over by GH₵15, transport under, fun on.' },
        { title: '4. Adjust (2 minutes)', body: 'Over on one line? Move money from a line that\'s under. Kofi moves GH₵10 from transport and GH₵5 from fun\'s leftover. Write it down.' },
        { title: '5. Set up next week (1 minute)', body: 'Move next week\'s weekly money (GH₵205) to where you spend from. Glance at what\'s coming: a birthday, a bill, a trip.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Look, sort, compare, adjust, set up. Ten minutes a week is about 9 hours a year to stay in control of all your money.',
    },
  ],
  apply: {
    scenario: 'Kofi\'s Sunday check.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Order the five steps.',
        lines: ['Look at the week\'s history', 'Sort spending into lines', 'Compare each line to the plan', 'Adjust lines that are over', 'Set up next week'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Kofi\'s week. Under, on or over?',
        groups: ['Under', 'On', 'Over'],
        items: [
          { text: 'Transport: planned 15, spent 5', group: 0 },
          { text: 'Staples: planned 60, spent 60', group: 1 },
          { text: 'Food out: planned 110, spent 125', group: 2 },
          { text: 'Fun: planned 20, spent 20', group: 1 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Food out planned GH₵110, spent GH₵125. How much over?',
        answers: ['15', 'GH₵15', '15 cedis'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Where should the GH₵15 come from?',
        options: [
          { text: 'Savings', why: 'Use flexible lines that came in under first.' },
          { text: 'Lines that were under this week, like transport' },
          { text: 'Next week\'s food money', why: 'Borrowing from next week starts the cycle that empties week 4.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'The five steps.',
        template: 'Look, [[1]], compare, [[2]], set up.',
        blanks: [['sort'], ['adjust']],
        distractors: ['spend', 'borrow'],
      },
      {
        kind: 'chatReply',
        from: 'yaw',
        message: 'Ten minutes every Sunday? That\'s so boring.',
        prompt: 'Kofi\'s best reply?',
        options: [
          { text: 'You\'re right, I\'ll do it monthly.', why: 'Monthly checks catch drift too late.' },
          { text: 'It takes me two hours.', why: 'It shouldn\'t. Round numbers and few categories keep it to ten.' },
          { text: 'Boring is the point. Ten boring minutes beats a very exciting day 12.' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each step to its time.',
        pairs: [
          ['Look', '2 minutes'],
          ['Sort', '3 minutes'],
          ['Compare and adjust', '4 minutes'],
          ['Set up next week', '1 minute'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which habit will make the check take far too long?',
        lines: [
          'Round to the nearest cedi.',
          'Use about seven simple categories.',
          'Track every pesewa in 40 categories.',
          'Write one word per line: under, on, over.',
        ],
        bug: 2,
        fix: 'Round to cedis and keep categories few.',
        explanation: 'Too much detail turns ten minutes into an hour, and then into never.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'Ten minutes a week for 52 weeks is how many minutes?',
        answers: ['520', '520 minutes'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Why glance at next week in step 5?',
        options: [
          { text: 'To spot a birthday, bill or trip before it becomes a surprise' },
          { text: 'To spend next week\'s money early', why: 'The opposite: to protect it.' },
          { text: 'It\'s optional and pointless', why: 'One minute now saves a scramble later.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'When and where will you do your first 10-minute check? Put it in your phone now.',
    starters: ['My check will be on...', 'At...', 'Linked to...'],
  },
  deepen: {
    title: 'Make it pleasant',
    summary: 'Kofi does his check after Sunday dinner with music on. Efua does hers with tea. Pairing a dull task with something you like is one of the simplest ways to make it stick.',
  },
  notes: 'Fictional week: staples 60/60, food out 125/110, transport 5/15, fun 20/20. "Temptation bundling" (Milkman, Minson & Volpp, 2014) is the research basis for pairing tasks with treats; mentioned generally in deepen.',
};

export default lesson;
