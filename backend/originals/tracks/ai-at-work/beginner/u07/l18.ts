import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Unit 7 · Lesson 18 — reports from a table. */
const lesson: OriginalLesson = {
  key: 'l18',
  title: 'Reports from a table',
  summary: 'Ada turns her checked table into a one-page pilot report. AI drafts the words; the numbers come from the sheet, untouched.',
  minutes: 12,
  outcomes: [
    'Draft a short data report with AI',
    'Keep every number tied to the sheet',
    'Structure a report busy readers will read',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'From table to one-page report',
      steps: [
        { title: '1. Headline', body: 'One sentence: "The pilot is ahead of plan: payments grew by half in four weeks."' },
        { title: '2. Three key numbers', body: 'Each with its so what. Copy the numbers from the sheet, don\'t retype them from memory.' },
        { title: '3. One chart', body: 'The line chart of weekly payments, title as the message.' },
        { title: '4. Recommendation and limits', body: 'Now what, and what the data can\'t show yet.' },
        { title: '5. Ask AI to draft, then check', body: '"Using only this table and these notes, draft a one-page report in this structure. Don\'t change any figures." Then compare every number with the sheet.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Headline, three numbers with "so what", one chart, recommendation and limits. AI drafts the words; every number is checked against the sheet.',
    },
  ],
  apply: {
    scenario: 'Ada writes the one-page pilot report.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Order the report.',
        lines: ['Headline', 'Three key numbers', 'One chart', 'Recommendation and limits'],
      },
      {
        kind: 'mcq',
        prompt: 'Where should the numbers in the report come from?',
        options: [
          { text: 'From memory', why: 'Easy to slip.' },
          { text: 'Copied from the checked sheet' },
          { text: 'From the AI\'s draft', why: 'Check them against the sheet.' },
        ],
        answer: 1,
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which drafting request is best?',
        options: [
          { text: 'Write a report about the pilot.', why: 'It would invent details.' },
          { text: 'Using only this table and these notes, draft a one-page report: headline, three numbers with "so what", recommendation, limits. Don\'t change any figures.' },
          { text: 'Make the pilot sound amazing.', why: 'Spin.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'The sheet says 600 payments in week 4. Which draft line is wrong?',
        lines: [
          'Payments grew by half in four weeks.',
          'Week 4: 650 payments.',
          'About 1 in 25 payments fails.',
          'Recommend a second market in month 2.',
        ],
        bug: 1,
        fix: 'Week 4: 600 payments.',
        explanation: 'The AI draft changed the number. Always compare with the sheet.',
      },
      {
        kind: 'sortGroups',
        prompt: 'In the one-page report, or not?',
        groups: ['In the report', 'Leave out'],
        items: [
          { text: 'Headline sentence', group: 0 },
          { text: 'All 3,000 rows', group: 1 },
          { text: 'One line chart', group: 0 },
          { text: 'Every formula used', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'Can I forward your report to Carmen as is?',
        prompt: 'Best reply from Ada?',
        options: [
          { text: 'Probably, the AI wrote it.', why: 'She should have checked it.' },
          { text: 'Not until it\'s 20 pages.', why: 'One page is the point.' },
          { text: 'Yes: I\'ve checked every number against the sheet, and the limits are at the bottom.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the rule.',
        template: 'AI drafts the [[1]]; every [[2]] is checked against the sheet.',
        blanks: [['words'], ['number']],
        distractors: ['numbers', 'font'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the headline.',
        tiles: ['The', 'pilot', 'is', 'ahead', 'of', 'plan'],
        distractors: ['behind'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the report part to its job.',
        pairs: [
          ['Headline', 'The one thing to remember'],
          ['Chart', 'Shows the trend at a glance'],
          ['Limits', 'Stops over-reading'],
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many key numbers go in the report?',
        answers: ['3', 'three'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'AI can change this, or it must stay exact?',
        groups: ['AI can change', 'Must stay exact'],
        items: [
          { text: 'Sentence wording', group: 0 },
          { text: 'Payment counts', group: 1 },
          { text: 'Order of paragraphs', group: 0 },
          { text: 'Failure rate', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why one chart, not five?',
        options: [
          { text: 'One clear chart makes the point; five compete for attention' },
          { text: 'Charts are bad', why: 'One is good.' },
          { text: 'Five is too few', why: 'One is enough for a one-pager.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Turn a table you have into a five-part one-page report. Which number matters most?',
    starters: ['Headline:', 'The key number:'],
  },
  deepen: { title: 'Try it today', summary: 'Ask AI to draft a one-page report from a table, then check every number against the source.' },
  notes: 'Figures fictional.',
};

export default lesson;
