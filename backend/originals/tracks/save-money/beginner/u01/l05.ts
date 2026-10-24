import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 5. Checkpoint 1: lessons 1–4. */
const lesson: OriginalLesson = {
  key: 'l05',
  title: 'Checkpoint: Efua\'s old laptop',
  summary: 'Efua drops off her old laptop: slow, loud, missing the letter Q, and it\'ll do for this semester. Check what you know: the goal, the myths, weekly targets and "small payments".',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Set a goal with a weekly target', 'Rewrite an instalment offer as a total'],
  learn: [
    {
      kind: 'story',
      title: 'No letter Q',
      beats: [
        { speaker: 'efua', text: 'It has no letter Q. Don\'t write any essays about queues.' },
        { speaker: 'kofi', text: 'Sixteen weeks. Then it goes back with a thank-you card.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 1: the goal.',
    items: [
      {
        kind: 'typeAnswer',
        prompt: 'Goal GH₵2,000, have GH₵400, 8 weeks. Weekly target?',
        answers: ['200', 'GH₵200', '200 cedis'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Myth or fact?',
        groups: ['Myth', 'Fact'],
        items: [
          { text: 'You can\'t save on a small income', group: 0 },
          { text: 'Small amounts add up', group: 1 },
          { text: 'Saving means no fun ever', group: 0 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'GH₵300 a month for 10 months is offered for a GH₵2,500 item. What\'s the extra?',
        options: [
          { text: 'GH₵300', why: '300 × 10 = 3,000. 3,000 − 2,500 = 500.' },
          { text: 'GH₵500' },
          { text: 'Nothing', why: 'GH₵500 more than cash.' },
        ],
        answer: 1,
      },
      {
        kind: 'orderLines',
        prompt: 'Order the goal steps.',
        lines: ['Name it exactly', 'Price it honestly', 'Set the date', 'Subtract what you have', 'Divide by weeks', 'Compare with what you save now'],
      },
      {
        kind: 'chatReply',
        from: 'yaw',
        message: 'Only GH₵480 a month, chale!',
        prompt: 'Kofi\'s best reply?',
        options: [
          { text: 'Deal!', why: 'He hasn\'t checked the total.' },
          { text: 'For how many months, and what\'s the total?' },
          { text: 'I hate shops.', why: 'The shop isn\'t the problem; the maths is.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'The weekly target.',
        template: '(Goal − what you have) [[1]] weeks.',
        blanks: [['÷', '/', 'divided by']],
        distractors: ['×', '+'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each wish to its goal version.',
        pairs: [
          ['"A laptop"', 'GH₵3,500 in 16 weeks'],
          ['"Some savings"', 'GH₵300 emergency fund'],
          ['"Go home sometime"', 'GH₵150 bus fare by mid-semester'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which goal is priced wrongly?',
        lines: [
          'Laptop: middle of three prices.',
          'Bus home: last semester\'s fare plus a bit.',
          'Phone: the cheapest price I saw once, at a shop that\'s closed now.',
        ],
        bug: 2,
        fix: 'Phone: the middle of three current prices.',
        explanation: 'Planning on a price you can\'t actually get leaves you short.',
      },
      {
        kind: 'mcq',
        prompt: 'Kofi\'s target is GH₵188 a week and he saves GH₵55. What does this chapter need to find?',
        options: [
          { text: 'A loan', why: 'The whole point is to avoid one.' },
          { text: 'Nothing; GH₵55 is enough', why: '16 × 55 = 880, nowhere near 3,010.' },
          { text: 'About GH₵133 a week more, or a cheaper goal, or both' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'GH₵55 a week for 16 weeks. How much?',
        answers: ['880', 'GH₵880', '880 cedis'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Review, Budgeting: why plan savings before flexible spending?',
        options: [
          { text: 'Because savings earn more early in the month', why: 'Not the reason.' },
          { text: 'Because saving "whatever is left" rarely happens' },
          { text: 'It doesn\'t matter', why: 'Order decides whether saving happens.' },
        ],
        answer: 1,
      },
    ],
  },
  reflect: {
    prompt: 'What\'s your weekly target, and how far is it from what you save now?',
    starters: ['My weekly target is...', 'I save now...', 'My gap is...'],
  },
  notes: 'Checkpoint for Chapter 1 lessons 1–4 with one Budgeting review item. Efua\'s old laptop (missing Q key) is Kofi\'s stopgap until week 16.',
};

export default lesson;
