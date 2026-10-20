import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 5. Checkpoint 1: lessons 1–4. */
const lesson: OriginalLesson = {
  key: 'l05',
  title: 'Checkpoint: options that earn',
  summary: 'One price can\'t fit everyone, the unit you charge changes behaviour, three tiers that each earn, and zone fees and extras priced to their cost. Quick check before the decoy.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Design options that each make money, without notes', 'Price a zone fee and an extra'],
  learn: [
    {
      kind: 'story',
      title: 'Esther\'s reply',
      beats: [
        { speaker: 'narrator', text: 'Clinton tells Esther about Saver: drop it at the stand, 1,400, back in two days. "Perfect," she replies. "I walk past it every morning anyway."' },
        { speaker: 'david', text: 'And it earns. Good. Next: why the middle option usually wins.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 1: options that earn.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match the option to its margin.',
        pairs: [
          ['Saver (1,400)', '275'],
          ['Standard (1,800)', '675'],
          ['Express (2,500)', '1,075'],
          ['Standard hill (2,300)', '775'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why does Saver have to cost Clinton less time?',
        options: [
          { text: 'Otherwise it\'s the same service for less, and everyone moves to it' },
          { text: 'It doesn\'t matter', why: 'It decides whether options help or hurt.' },
          { text: 'To make Esther unhappy', why: 'She\'s happy with the trade.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'A hill run costs 1,200 and carries 4 bags. What is the ride cost per bag, in FCFA?',
        answers: ['300'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Which unit is this pricing in?',
        groups: ['Per item', 'Per bag', 'Per month'],
        items: [
          { text: '150 FCFA a shirt', group: 0 },
          { text: '1,800 for up to 12 items', group: 1 },
          { text: '6,400 for four bags a month', group: 2 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'clinton',
        message: 'Let\'s add five more options: scented, folded, express-plus, weekly, and VIP.',
        prompt: "David's best reply?",
        options: [
          { text: 'Every option needs a real need and a margin, and more choice can confuse. Start with three tiers, the hill fee and ironing.' },
          { text: 'Yes, the more the better.', why: 'Too many options confuse customers.' },
          { text: 'Remove all options.', why: 'Three clear ones serve real needs.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Zones.',
        template: 'Group hill orders into one [[1]], then add a clear all-weather [[2]].',
        blanks: [['run'], ['fee']],
        distractors: ['app', 'discount'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line of this price list breaks a Chapter 3 rule?',
        lines: [
          'Saver: 1,400, you drop it at the stand.',
          'Standard: 1,800, room pickup.',
          'Express: 2,500, back the same day.',
          'Hill zone: +500 only when it rains.',
        ],
        bug: 3,
        fix: 'Hill zone: +500, rain or shine.',
        explanation: 'Rain-only fees feel unfair and unpredictable.',
      },
      {
        kind: 'mcq',
        prompt: 'Ironing: Mama Rose charges 100 extra; WashDay charges 200 extra. Is it a good extra?',
        options: [
          { text: 'Yes: cheap to add, valued before exams, and it earns 100 more' },
          { text: 'No: it loses money', why: 'It earns 100.' },
          { text: 'No: nobody irons', why: 'Regulars already pay for ironing.' },
        ],
        answer: 0,
      },
      {
        kind: 'orderLines',
        prompt: 'Order these options by price, lowest to highest.',
        lines: ['Saver: 1,400', 'Standard: 1,800', 'Standard hill: 2,300', 'Express: 2,500'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'An Express bag with ironing: 2,500 + 200. What is the price, in FCFA?',
        answers: ['2700', '2,700'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'Look at your own options. Does each match a real need, and does each make money?',
    starters: ['Option one serves...', 'It earns...'],
  },
  notes: 'Checkpoint for Chapter 3 lessons 1-4 (fictional margins: Saver 275, Standard 675, Express 1,075, Standard hill 775).',
};

export default lesson;
