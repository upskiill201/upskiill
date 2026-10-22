import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Unit 7 · Lesson 16 — from numbers to a decision. */
const lesson: OriginalLesson = {
  key: 'l16',
  title: 'From numbers to a decision',
  summary: 'Numbers don\'t decide anything. People do. Ada learns to turn the pilot data into a clear "so what" and a recommendation Carmen can act on.',
  minutes: 12,
  outcomes: [
    'Turn numbers into a "so what"',
    'Link the data to a decision',
    'Say what the numbers can\'t tell you',
  ],
  learn: [
    {
      kind: 'reading',
      title: 'Number, so what, now what',
      html:
        '<p>For each key number, Ada writes three lines:</p>' +
        '<ul>' +
        '<li><strong>Number:</strong> payments grew from 400 to 600 a week in four weeks.</li>' +
        '<li><strong>So what:</strong> shops are adopting the app faster than planned.</li>' +
        '<li><strong>Now what:</strong> recommend adding a second market in month 2.</li>' +
        '</ul>' +
        '<p>And one honest line: <strong>what the numbers can\'t tell us</strong>. "Four weeks can\'t tell us if shops keep using it after the novelty wears off."</p>' +
        '<p>Ask AI: <em>"Here are my four key numbers. For each, suggest a \'so what\' and a \'now what\', and tell me what this data can\'t show."</em> Then decide which suggestions you agree with.</p>',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Number, so what, now what. Plus one line on what the data can\'t tell you. AI suggests; you decide.',
    },
  ],
  apply: {
    scenario: 'Ada turns her numbers into recommendations.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Order Ada\'s three lines.',
        lines: ['Number', 'So what', 'Now what'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the line to its example.',
        pairs: [
          ['Number', 'Payments 400 to 600 a week'],
          ['So what', 'Shops adopt faster than planned'],
          ['Now what', 'Add a second market in month 2'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What can four weeks of data NOT tell Ada?',
        options: [
          { text: 'How many payments happened', why: 'The data shows that.' },
          { text: 'Whether shops keep using it after the novelty wears off' },
          { text: 'Which market is bigger', why: 'The data shows that.' },
        ],
        answer: 1,
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which request helps Ada most?',
        options: [
          { text: 'What should we decide?', why: 'Hands over the decision.' },
          { text: 'Here are my four key numbers. For each, suggest a "so what" and a "now what", and say what this data can\'t show.' },
          { text: 'Make the numbers sound great.', why: 'Spin.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Number, so what, or now what?',
        groups: ['Number', 'So what', 'Now what'],
        items: [
          { text: 'Failure rate 4%', group: 0 },
          { text: 'Payments are reliable enough for shops', group: 1 },
          { text: 'No need to delay the second market', group: 2 },
          { text: '6 shops falling for 3 weeks', group: 0 },
          { text: 'Call those 6 shops this week', group: 2 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'So the pilot is a success?',
        prompt: 'Best reply from Ada?',
        options: [
          { text: 'Totally, forever.', why: 'Too early to say forever.' },
          { text: 'Who knows.', why: 'The data says a lot already.' },
          { text: 'So far, yes: growth is ahead of plan and failures are low. Four weeks can\'t show if shops stick with it, so we should review again at week 8.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the tip.',
        template: 'Number, so [[1]], now [[2]].',
        blanks: [['what'], ['what']],
        distractors: ['why', 'never'],
      },
      {
        kind: 'findBug',
        prompt: 'Which "now what" doesn\'t follow from the numbers?',
        lines: [
          'Growth ahead of plan: add a second market in month 2',
          'Low failure rate: keep the current bank setup',
          '6 shops going quiet: call them this week',
          'Payments grew: launch in five countries next month',
        ],
        bug: 3,
        fix: 'Payments grew: plan the next market once the pilot ends.',
        explanation: 'Four weeks in one city can\'t justify five countries.',
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Ada\'s honest line.',
        tiles: ['Four', 'weeks', 'can\'t', 'tell', 'us', 'everything'],
        distractors: ['proves'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'At which week does Ada suggest reviewing again?',
        answers: ['8', 'eight', 'week 8'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Who does what?',
        groups: ['AI suggests', 'Ada decides'],
        items: [
          { text: 'Possible "so what" lines', group: 0 },
          { text: 'Which recommendation goes to Carmen', group: 1 },
          { text: 'Limits of the data', group: 0 },
          { text: 'Whether to add a second market', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why include what the data can\'t tell you?',
        options: [
          { text: 'It stops people over-reading the numbers and makes your recommendation more trusted' },
          { text: 'To look unsure', why: 'It looks careful.' },
          { text: 'It\'s optional', why: 'It\'s important.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Take one number from your work. Write its "so what" and "now what".',
    starters: ['Number:', 'So what:', 'Now what:'],
  },
  deepen: { title: 'Try it today', summary: 'For your next report, add a "now what" to each key number.' },
  notes: 'Figures fictional.',
};

export default lesson;
