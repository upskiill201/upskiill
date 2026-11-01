import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Unit 7 · Lesson 19 — Ada's data checklist. */
const lesson: OriginalLesson = {
  key: 'l19',
  title: 'Your data checklist',
  summary: 'Everything from Unit 7 in one checklist Ada runs before any number leaves her desk.',
  minutes: 12,
  outcomes: [
    'Use an eight-point data checklist',
    'Link each point to a lesson in this unit',
    'Run it in five minutes',
  ],
  learn: [
    {
      kind: 'text',
      html:
        '<p>Ada\'s data checklist:</p>' +
        '<ol>' +
        '<li><strong>Private:</strong> personal columns removed before any AI use.</li>' +
        '<li><strong>Original saved:</strong> a copy kept before cleaning.</li>' +
        '<li><strong>Clean:</strong> spellings, spaces, dates and text-numbers fixed; blanks flagged.</li>' +
        '<li><strong>Formulas:</strong> totals by formula, ranges cover all rows, tested on a few rows.</li>' +
        '<li><strong>Estimate:</strong> a head estimate matches the result.</li>' +
        '<li><strong>Trends:</strong> enough points, real size, no one-offs; median where a few values dominate.</li>' +
        '<li><strong>Percentages:</strong> points or percent change, said clearly.</li>' +
        '<li><strong>Words:</strong> meaning first, plain numbers, limits stated, every figure checked against the sheet.</li>' +
        '</ol>',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Private, saved, clean, formulas, estimate, trends, percentages, words. Five minutes, every time.',
    },
  ],
  apply: {
    scenario: 'Ada runs the checklist at 7am.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Order the first four points.',
        lines: ['Private', 'Original saved', 'Clean', 'Formulas'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the point to the lesson.',
        pairs: [
          ['Private', 'When data is private'],
          ['Clean', 'Cleaning messy data'],
          ['Percentages', 'Percentages without panic'],
          ['Trends', 'Spotting trends in numbers'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Passes the checklist, or fails?',
        groups: ['Passes', 'Fails'],
        items: [
          { text: 'Total by =SUM over all rows', group: 0 },
          { text: 'Total typed in', group: 1 },
          { text: '"Up 15 points (25%)"', group: 0 },
          { text: '"Up 15%" for 60% to 75%', group: 1 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which item on Ada\'s 7am check fails?',
        lines: [
          'Private: phone column removed',
          'Original: copy saved',
          'Estimate: result is 100x my head estimate, but I\'ll trust it',
          'Words: limits stated',
        ],
        bug: 2,
        fix: 'Estimate: recalculate until it matches roughly.',
        explanation: 'A 100x gap means something is wrong.',
      },
      {
        kind: 'mcq',
        prompt: 'Which point is about "meaning first, plain numbers"?',
        options: [
          { text: 'Formulas', why: 'That\'s about calculation.' },
          { text: 'Words' },
          { text: 'Clean', why: 'That\'s about data quality.' },
        ],
        answer: 1,
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'How do you make sure your numbers are always right?',
        prompt: 'Best reply from Ada?',
        options: [
          { text: 'The AI checks them.', why: 'She checks them.' },
          { text: 'I\'m just good at maths.', why: 'It\'s the checklist.' },
          { text: 'An eight-point checklist, five minutes, before any number goes out. It\'s caught three mistakes this week.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the checklist summary.',
        template: 'Private, saved, [[1]], formulas, estimate, trends, percentages, [[2]].',
        blanks: [['clean'], ['words']],
        distractors: ['pretty', 'emojis'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many points are on the checklist?',
        answers: ['8', 'eight'],
        placeholder: 'A number',
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the checklist\'s rule.',
        tiles: ['Five', 'minutes,', 'every', 'time'],
        distractors: ['sometimes'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Which point catches this?',
        groups: ['Clean', 'Formulas'],
        items: [
          { text: '"makola " with a space', group: 0 },
          { text: 'A range stopping at row 2500', group: 1 },
          { text: 'Mixed date formats', group: 0 },
          { text: 'A typed-in total', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'When should the checklist run?',
        options: [
          { text: 'Before any number leaves Ada\'s desk' },
          { text: 'Once a year', why: 'Every time.' },
          { text: 'Only for big reports', why: 'Every number that goes out.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        prompt: 'Why save the original before cleaning?',
        options: [
          { text: 'To use more storage', why: 'It\'s your safety net.' },
          { text: 'No need', why: 'Cleaning mistakes happen.' },
          { text: 'So you can always go back and check what changed' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'Which point on the checklist do you skip most? What could it cost you?',
    starters: ['I skip...', 'It could cost...'],
  },
  deepen: { title: 'Try it today', summary: 'Save the eight points as a note and run them on your next report.' },
  notes: 'Summary of Unit 7.',
};

export default lesson;
