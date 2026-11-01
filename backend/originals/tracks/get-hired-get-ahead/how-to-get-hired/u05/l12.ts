import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 2 · Chapter 5 · Lesson 12 — beyond salary: things worth asking for. Card deck (text). */
const lesson: OriginalLesson = {
  key: 'l12',
  title: 'Beyond the salary',
  summary: 'Miracle\'s first offer had fixed pay. She negotiated anyway, and got something that mattered more. Here are five things graduates often ask for when salary can\'t move.',
  minutes: 11,
  outcomes: ['List things to ask for besides salary', 'Choose the ones that matter to you', 'Ask for them in the same polite way'],
  learn: [
    {
      kind: 'text',
      html: '<p><strong>1. An earlier review.</strong> "Could my salary be reviewed after probation, instead of after a year?" It costs nothing today, and lets your work make the case.</p>',
    },
    {
      kind: 'text',
      html: '<p><strong>2. Learning.</strong> A training budget, a course, conference tickets, or time for certification. Miracle got a paid online course in her first month, and it changed her career.</p>',
    },
    {
      kind: 'text',
      html: '<p><strong>3. The start date.</strong> A week later to finish exams or move cities, or earlier if you need the income. Often easy for an employer to say yes to.</p>',
    },
    {
      kind: 'check',
      question: 'Njangi Pay says the salary is fixed. What could Clinton ask for instead?',
      options: ['Nothing, ever', 'A review after probation', 'Double pay next year, guaranteed'],
      answer: 1,
      explanation: 'An earlier review is a common, reasonable ask when pay is fixed.',
    },
    {
      kind: 'text',
      html: '<p><strong>4. Equipment and working setup.</strong> A suitable laptop, a phone allowance, remote days, or transport help. These can change your daily life a lot.</p>',
    },
    {
      kind: 'text',
      html: '<p><strong>5. Clarity, in writing.</strong> What\'s expected in probation, who your mentor is, what "success" looks like at six months. Not a perk, but it protects you.</p>',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Review date, learning, start date, setup, clarity. Pick the one or two that matter most. Ask the same polite way.',
    },
  ],
  apply: {
    scenario: 'Clinton looks beyond salary.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Reasonable graduate ask, or not?',
        groups: ['Reasonable', 'Not reasonable'],
        items: [
          { text: 'A review after probation', group: 0 },
          { text: 'A company car', group: 1 },
          { text: 'A training budget', group: 0 },
          { text: 'A one-week later start for exams', group: 0 },
          { text: 'Your own office with a view', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why is an earlier review a good ask?',
        options: [
          { text: 'It guarantees a raise', why: 'It guarantees a review, not a raise.' },
          { text: 'It costs nothing now, and lets your work make the case' },
          { text: 'Employers hate it', why: 'Many are happy to agree.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each ask to its category.',
        pairs: [
          ['Online course paid for', 'Learning'],
          ['Start a week later', 'Start date'],
          ['A suitable laptop', 'Setup'],
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'clinton',
        message: 'If salary is fixed, which one or two things should I ask for?',
        options: [
          { text: 'All five, at once.', why: 'Pick the one or two that matter most.' },
          { text: 'Nothing.', why: 'One or two reasonable asks are fine.' },
          { text: 'A review after probation, and a training budget to learn their payments stack.' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the unreasonable ask for a graduate.',
        lines: ['A review after probation.', 'A guaranteed promotion in three months.', 'A training budget.'],
        bug: 1,
        explanation: 'Too big a promise to ask for. A review lets your work decide.',
      },
      {
        kind: 'orderLines',
        prompt: 'Put Clinton\'s plan in order.',
        lines: ['Ask about salary first', 'If fixed, ask for a review after probation', 'Mention a training budget if it fits', 'Ask for it all in writing'],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'What did Miracle get in her first offer?',
        options: [
          { text: 'A paid online course' },
          { text: 'A car', why: 'A paid online course.' },
          { text: 'Double pay', why: 'Her pay was fixed. She got a course.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the tip.',
        template: 'Pick the one or [[1]] that matter most. Get it in [[2]].',
        blanks: [['two'], ['writing']],
        distractors: ['ten', 'secret', 'person'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many things beyond salary does Miracle list? (a number)',
        answers: ['5', 'five'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Changes daily life, or long-term growth?',
        groups: ['Daily life', 'Growth'],
        items: [
          { text: 'Transport help', group: 0 },
          { text: 'A training budget', group: 1 },
          { text: 'Remote days', group: 0 },
          { text: 'A named mentor', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'If salary were fixed in your next offer, which one or two of these would matter most to you?',
    starters: ['For me...', 'Because...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Write your top two non-salary asks, with one sentence of reason for each.',
  },
  notes: 'Common non-salary negotiation items; availability varies by company and country.',
};

export default lesson;
