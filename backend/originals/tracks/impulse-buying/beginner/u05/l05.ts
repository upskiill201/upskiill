import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 5. Checkpoint 1: lessons 1–4, plus review. */
const lesson: OriginalLesson = {
  key: 'l05',
  title: 'Checkpoint: one week to go',
  summary: 'Seven days to Black Friday. Cards removed, notifications off, list written, usual price noted. Kofi\'s phone is quieter than it\'s been all year. Check what you know: the plan, the pause rule, hours and cost per use, and the phone clean-up.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Prepare for a big sale', 'Use the pause rule and value maths'],
  learn: [
    {
      kind: 'story',
      title: 'Quiet phone',
      beats: [
        { speaker: 'yaw', text: 'Your phone hasn\'t buzzed all evening.' },
        { speaker: 'kofi', text: 'Twenty minutes of settings. Best twenty minutes all year.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 1: getting ready.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'With a GH₵200 line: 24 hours or 30 days?',
        groups: ['24 hours', '30 days'],
        items: [
          { text: 'A GH₵40 cap', group: 0 },
          { text: 'A GH₵600 speaker', group: 1 },
          { text: 'A GH₵120 jersey', group: 0 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'A GH₵300 bag used 150 times. Cost per use?',
        answers: ['2', 'GH₵2', '2 cedis'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'What should a sale plan include?',
        options: [
          { text: 'A list, a price limit and the usual price' },
          { text: 'A plan to browse everything', why: 'Browsing is how tricks win.' },
          { text: 'Pay later switched on, just in case', why: 'That\'s a door left open.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each phone change to what it does.',
        pairs: [
          ['Remove saved cards', 'Adds a pause before buying'],
          ['Notifications off', 'Fewer cues'],
          ['Apps off the home screen', 'Shopping not one thumb away'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'yaw',
        message: 'There\'s a speaker on my wishlist from 30 days ago. Can I buy it?',
        prompt: 'Kofi\'s best reply?',
        options: [
          { text: 'Ask the three questions: still want it? Fits your budget from a planned line, while you\'re paying debt? Fair price?' },
          { text: 'Yes, 30 days are up.', why: 'The pause ends with questions, not an automatic yes.' },
          { text: 'Never buy speakers.', why: 'The questions decide, not a ban.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'The pause rule.',
        template: 'Small unplanned buys wait [[1]] hours; big ones wait [[2]] days.',
        blanks: [['24'], ['30']],
        distractors: ['2', '3'],
      },
      {
        kind: 'findBug',
        prompt: 'Which part of this sale plan is missing a number?',
        lines: [
          'List: interface.',
          'Usual price: GH₵880 to GH₵950.',
          'Price limit: whatever looks like a good deal.',
        ],
        bug: 2,
        fix: 'Price limit: GH₵800.',
        explanation: '"Whatever looks good" lets the anchor decide.',
      },
      {
        kind: 'mcq',
        prompt: 'Review, Chapter 4: why is pay later still borrowing?',
        options: [
          { text: 'You get the item now and owe money later' },
          { text: 'It isn\'t', why: 'You owe payments.' },
          { text: 'Because it charges high interest always', why: 'Often it doesn\'t; it\'s still a debt.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        prompt: 'Review, Chapter 3: "Was GH₵1,500" is a...',
        options: [
          { text: 'An anchor' },
          { text: 'A guarantee', why: 'It\'s a claim.' },
          { text: 'A decoy', why: 'A decoy is a third option.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Review, Chapter 2: what does the L in HALT stand for?',
        answers: ['lonely', 'loneliness'],
        placeholder: 'One word',
      },
      {
        kind: 'orderLines',
        prompt: 'Order the end of a pause.',
        lines: ['Pause ends', 'Still want it?', 'Fits the budget?', 'Fair price?', 'Buy or let go'],
      },
    ],
  },
  reflect: {
    prompt: 'What\'s your plan for the next big sale or payday? List, limit, usual price, phone set-up.',
    starters: ['List:...', 'Limit:...', 'Phone:...'],
  },
  notes: 'Checkpoint for Chapter 5 lessons 1–4 with review from Chapters 2–4.',
};

export default lesson;
