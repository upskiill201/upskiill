import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Unit 7 · Lesson 12 — explaining numbers to non-numbers people. */
const lesson: OriginalLesson = {
  key: 'l12',
  title: 'Explaining numbers to non-numbers people',
  summary: 'Carmen is a marketer, not an analyst. The same numbers can confuse or convince. AI helps Ada turn a table into three plain sentences.',
  minutes: 12,
  outcomes: [
    'Explain numbers in plain words',
    'Lead with what the numbers mean',
    'Use comparisons people can picture',
  ],
  learn: [
    {
      kind: 'compare',
      title: 'Same data, two explanations',
      before: {
        label: 'Numbers-first',
        text: '"Completed transactions increased from n=400 to n=600 (+50% WoW cumulative), with a failure rate of 4.2% (σ=1.1), median ticket 98 GHS."',
      },
      after: {
        label: 'Meaning-first',
        text: '"Shops are using the app more every week: payments grew by half in four weeks, to 600 a week. Only about 1 in 25 payments fails. A typical payment is about 100 GHS, like a day\'s fabric order."',
      },
      notes: [
        'Start with what it means: "shops are using it more".',
        'Use words like "half" and "1 in 25" instead of jargon.',
        'A comparison people can picture makes a number stick.',
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Meaning first, then the number in plain words, then a comparison people can picture. Ask AI: "Explain this table to a busy marketer in three sentences."',
    },
  ],
  apply: {
    scenario: 'Ada prepares to explain the numbers to Carmen.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What should come first when explaining numbers to Carmen?',
        options: [
          { text: 'What the numbers mean' },
          { text: 'The exact sample size', why: 'Detail can come after.' },
          { text: 'The standard deviation', why: 'Jargon first loses her.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Plain words, or jargon?',
        groups: ['Plain', 'Jargon'],
        items: [
          { text: '"About 1 in 25 payments fails"', group: 0 },
          { text: '"Failure rate 4.2%, σ=1.1"', group: 1 },
          { text: '"Payments grew by half"', group: 0 },
          { text: '"+50% WoW cumulative"', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which request gets the clearest explanation?',
        options: [
          { text: 'Explain this table.', why: 'No audience or length.' },
          { text: 'Explain this table to a busy marketing director in three plain sentences: what it means, the key numbers in everyday words, and one comparison she can picture. Don\'t change any figures.' },
          { text: 'Make it sound impressive.', why: 'Clear, not impressive.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'About 4% of payments fail. That\'s about 1 in how many? (number)',
        answers: ['25'],
        placeholder: 'A number',
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'What does "4.2% failure rate" mean in normal words?',
        prompt: 'Best reply from Ada?',
        options: [
          { text: 'About 1 in every 25 payments doesn\'t go through, and most of those work on the second try.' },
          { text: 'It\'s 4.2%.', why: 'Same words, no meaning.' },
          { text: 'It\'s complicated.', why: 'It can be said simply.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the tip.',
        template: '[[1]] first, then the number in plain words, then a [[2]] people can picture.',
        blanks: [['Meaning'], ['comparison']],
        distractors: ['Jargon', 'formula'],
      },
      {
        kind: 'findBug',
        prompt: 'Which sentence for Carmen is still too technical?',
        lines: [
          'Shops are using the app more every week.',
          'Payments grew by half in four weeks.',
          'The n=600 cohort shows a 4.2% failure rate (σ=1.1).',
          'A typical payment is about 100 GHS.',
        ],
        bug: 2,
        fix: 'About 1 in 25 payments fails.',
        explanation: 'n, cohort and σ mean nothing to most readers.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the number to a plain version.',
        pairs: [
          ['+50%', 'Grew by half'],
          ['4%', 'About 1 in 25'],
          ['Median 98 GHS', 'A typical payment is about 100 GHS'],
        ],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Ada\'s opening line.',
        tiles: ['Shops', 'are', 'using', 'it', 'more', 'every', 'week'],
        distractors: ['n=600'],
      },
      {
        kind: 'orderLines',
        prompt: 'Order Ada\'s three sentences.',
        lines: ['What it means', 'The key numbers in plain words', 'A comparison she can picture'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Should Ada let the AI change this?',
        groups: ['Fine to change', 'Never change'],
        items: [
          { text: 'The wording', group: 0 },
          { text: 'The figures', group: 1 },
          { text: 'The order of sentences', group: 0 },
          { text: 'What was counted', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why add "don\'t change any figures" to the request?',
        options: [
          { text: 'Simplifying can accidentally round or change numbers' },
          { text: 'AI hates numbers', why: 'It\'s about accidental changes.' },
          { text: 'No reason', why: 'Simplifying can shift figures.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Pick a number you report often. How would you say it to someone who hates numbers?',
    starters: ['The number:', 'In plain words:'],
  },
  deepen: { title: 'Try it today', summary: 'Ask AI to explain one of your tables to "a busy manager in three sentences". Check no figure changed.' },
  notes: 'Natural frequencies ("1 in 25") are often easier to understand than percentages (Gigerenzer & Hoffrage, 1995). Figures fictional.',
};

export default lesson;
