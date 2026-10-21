import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Unit 7 · Lesson 8 — charts: which one and why. */
const lesson: OriginalLesson = {
  key: 'l08',
  title: 'Charts: which one and why',
  summary: 'The right chart makes the point in two seconds. The wrong one hides it. A quick guide to choosing, and how to ask AI for a chart that tells the truth.',
  minutes: 12,
  outcomes: [
    'Pick the right chart for the question',
    'Avoid charts that mislead',
    'Ask AI for chart advice with your question',
  ],
  learn: [
    {
      kind: 'text',
      html:
        '<table><tr><th>Question</th><th>Chart</th></tr>' +
        '<tr><td>How did it change over time?</td><td><strong>Line chart</strong></td></tr>' +
        '<tr><td>Which is bigger?</td><td><strong>Bar chart</strong> (sorted, biggest first)</td></tr>' +
        '<tr><td>What share of the whole? (2-3 parts)</td><td>A simple bar, or a pie only if there are very few parts</td></tr>' +
        '<tr><td>Is there a relationship?</td><td><strong>Scatter plot</strong></td></tr></table>' +
        '<h3>Don\'t mislead</h3>' +
        '<ul>' +
        '<li>Bar charts should start at zero, or small differences look huge.</li>' +
        '<li>One message per chart, written as the title: "Makola payments grew every week".</li>' +
        '<li>No 3D effects; they distort sizes.</li>' +
        '</ul>' +
        '<p>Ask AI: <em>"I want to show Carmen that payments grew each week in both markets. Which chart, and how should I set it up?"</em></p>',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Over time: line. Compare: sorted bar. Bars start at zero. The title is the message.',
    },
  ],
  apply: {
    scenario: 'Ada picks charts for the 9am meeting.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match the question to the chart.',
        pairs: [
          ['Change over four weeks', 'Line chart'],
          ['Which market is bigger', 'Bar chart'],
          ['Do bigger shops fail more?', 'Scatter plot'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why should bar charts start at zero?',
        options: [
          { text: 'Otherwise small differences look huge' },
          { text: 'It looks nicer', why: 'It\'s about honesty.' },
          { text: 'They shouldn\'t', why: 'Cutting the axis exaggerates.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Honest chart choice, or misleading?',
        groups: ['Honest', 'Misleading'],
        items: [
          { text: 'Bar chart starting at zero', group: 0 },
          { text: 'Bar chart starting at 590 to exaggerate 600 vs 610', group: 1 },
          { text: 'Title stating the message', group: 0 },
          { text: '3D pie chart with 9 slices', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which request gets the best chart advice?',
        options: [
          { text: 'Make a nice chart.', why: 'No question, no message.' },
          { text: 'I want to show that payments grew each week in both markets. Which chart, and how should I set it up so it\'s clear and honest?' },
          { text: 'Make it look impressive.', why: 'Impressive isn\'t honest.' },
        ],
        answer: 1,
      },
      {
        kind: 'tapBuild',
        prompt: 'Build a chart title that is the message.',
        tiles: ['Makola', 'payments', 'grew', 'every', 'week'],
        distractors: ['Chart', '1'],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'Can we make the chart start at 500 so the growth looks bigger?',
        prompt: 'Best reply from Ada?',
        options: [
          { text: 'The growth is real, so let\'s show it honestly from zero, with a title that says "up 50% in four weeks". It\'s strong as it is.' },
          { text: 'Sure.', why: 'That exaggerates.' },
          { text: 'Charts don\'t matter.', why: 'They do.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the tip.',
        template: 'Over time: [[1]]. Compare: sorted [[2]].',
        blanks: [['line'], ['bar']],
        distractors: ['pie', 'table'],
      },
      {
        kind: 'findBug',
        prompt: 'Which chart choice is wrong?',
        lines: [
          'Weekly payments over a month: line chart',
          'Payments by market: bar chart',
          'Share of 9 payment methods: 3D pie chart',
          'Shop size vs failure rate: scatter plot',
        ],
        bug: 2,
        fix: 'A sorted bar chart, no 3D.',
        explanation: 'Nine slices and 3D are hard to read and distort sizes.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which chart is best for change over time? (one word)',
        answers: ['line'],
        placeholder: 'One word',
      },
      {
        kind: 'sortGroups',
        prompt: 'Good chart habit, or bad?',
        groups: ['Good', 'Bad'],
        items: [
          { text: 'One message per chart', group: 0 },
          { text: 'Five lines in different colours, no title', group: 1 },
          { text: 'Sorting bars biggest first', group: 0 },
          { text: 'Adding 3D shadows', group: 1 },
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Order how Ada makes a chart.',
        lines: ['Decide the message', 'Pick the chart type', 'Set honest axes', 'Write the message as the title'],
      },
      {
        kind: 'mcq',
        prompt: 'When is a pie chart acceptable?',
        options: [
          { text: 'For a share of the whole with only two or three parts' },
          { text: 'For changes over time', why: 'Use a line.' },
          { text: 'For ten categories', why: 'Too many slices.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Look at a chart you made recently. What\'s its message? Would a different chart show it better?',
    starters: ['The message:', 'Better chart:'],
  },
  deepen: { title: 'Try it today', summary: 'Rewrite one chart title as the message it shows. Check the axis starts at zero if it\'s a bar.' },
  notes: 'Standard data-visualisation guidance (e.g. Cleveland & McGill, 1984; zero baseline for bar charts).',
};

export default lesson;
