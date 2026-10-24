import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 6. Before/After: starting at 25 vs starting at 35. */
const lesson: OriginalLesson = {
  key: 'l06',
  title: 'Start at 25 vs start at 35',
  summary: 'Two savers put away the same ₦50,000 a month until 60. One starts at 25, the other at 35. Same amount, same growth rate. Side by side, the difference is startling.',
  minutes: 11,
  outcomes: [
    'See how much starting early can matter',
    'Understand why the early years count so much',
    'Know that later is still worth it',
  ],
  learn: [
    {
      kind: 'compare',
      title: 'Same saving, different start',
      before: {
        label: 'Starts at 35',
        text: 'Saves ₦50,000 a month from 35 to 60: 25 years\nTotal put in: ₦15 million\nWith an example growth of 5% a year after inflation*\nAt 60: about ₦30 million in today\'s money',
      },
      after: {
        label: 'Starts at 25',
        text: 'Saves ₦50,000 a month from 25 to 60: 35 years\nTotal put in: ₦21 million\nWith the same example 5% a year after inflation*\nAt 60: about ₦57 million in today\'s money\n\n*An example rate for illustration, not a promise. Real returns go up and down.',
      },
      notes: [
        'The early saver put in ₦6 million more, but ends up with about ₦27 million more.',
        'That extra comes from compounding: growth on top of growth, over ten extra years.',
        'The first ten years do a huge amount of the work, because that money grows the longest.',
        'Starting at 35 (or 45, or 59) is still far better than not starting. It just needs more saving to reach the same place.',
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Money saved early has the most years to grow. Ten extra years can nearly double the result. Start as early as you can, and never think it\'s too late.',
    },
  ],
  apply: {
    scenario: 'Start early.',
    items: [
      {
        kind: 'typeAnswer',
        prompt: '₦50,000 a month for 35 years. How much is put in? (₦600,000 a year.)',
        answers: ['21000000', '21,000,000', '₦21,000,000', '₦21000000', '21 million'],
        placeholder: 'A number',
      },
      {
        kind: 'typeAnswer',
        prompt: '₦50,000 a month for 25 years. How much is put in?',
        answers: ['15000000', '15,000,000', '₦15,000,000', '₦15000000', '15 million'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'The early saver put in ₦6 million more but ended about ₦27 million ahead. Why?',
        options: [
          { text: 'They got a better rate', why: 'Same example rate.' },
          { text: 'Compounding: the early money had ten extra years to grow' },
          { text: 'Luck', why: 'Same rate, more time.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Starts at 25 or starts at 35?',
        groups: ['Starts at 25', 'Starts at 35'],
        items: [
          { text: 'About ₦57 million at 60', group: 0 },
          { text: 'About ₦30 million at 60', group: 1 },
          { text: '35 years of saving', group: 0 },
          { text: '25 years of saving', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'emmanuel',
        message: 'I\'m 27. So I\'ve already lost?',
        prompt: 'Miracle\'s best reply?',
        options: [
          { text: 'Yes, you lost.', why: 'At 27, there\'s still a long runway.' },
          { text: 'Wait until 35.', why: 'Waiting is the costly part.' },
          { text: 'Not at all. You\'re two years from 25, not ten. And starting at 35 still beats never. Start this month.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'Why early matters.',
        template: 'Money saved early has the most [[1]] to [[2]].',
        blanks: [['years', 'time'], ['grow']],
        distractors: ['fees', 'spend'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line misreads the example?',
        lines: [
          'The 5% is an example rate, not a promise.',
          'Real returns go up and down.',
          'So I\'m guaranteed ₦57 million if I start at 25.',
        ],
        bug: 2,
        fix: 'Nothing is guaranteed; the example shows the power of time.',
        explanation: 'Examples illustrate an idea. Real results vary.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each phrase to its meaning.',
        pairs: [
          ['After inflation', 'In today\'s buying power'],
          ['Example rate', 'For illustration only'],
          ['Compounding', 'Growth on top of growth'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What should someone who\'s 45 take from this?',
        options: [
          { text: 'Start now; it\'s still far better than never, and you may need to save a bit more' },
          { text: 'It\'s hopeless', why: 'Later beats never.' },
          { text: 'Take big risks to catch up', why: 'Risk-taking to "catch up" can backfire.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'About ₦57 million minus about ₦30 million. How much more does the early saver have?',
        answers: ['27000000', '27,000,000', '₦27,000,000', '₦27000000', '27 million'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'How many working years do you have before 60? What could even a small monthly amount become over that time?',
    starters: ['I have about... years', 'Even ... a month could...'],
  },
  deepen: {
    title: 'Why "after inflation"?',
    summary: 'Prices rise over time, so ₦57 million in 35 years won\'t buy what ₦57 million buys today. Using a growth rate after inflation keeps the example in today\'s money, which is easier to imagine. In countries with high inflation, the gap between the headline rate and the real rate can be large.',
  },
  notes: 'Future value of an annuity, monthly 50,000 ≈ annual 600,000, r = 5% real, annual compounding approximation: 35 yrs factor ((1.05^35 − 1)/0.05) ≈ 90.3 → ≈ ₦54.2M; with monthly contributions ≈ ₦56.8M. 25 yrs factor ≈ 47.7 → ≈ ₦28.6M (monthly ≈ ₦29.8M). Rounded to "about ₦57 million" and "about ₦30 million". Example rate only, not advice (playbook §9).',
};

export default lesson;
