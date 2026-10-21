import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Unit 8 · Lesson 12 — presenting data clearly. */
const lesson: OriginalLesson = {
  key: 'l12',
  title: 'Presenting data clearly',
  summary: 'A chart that works in a report can fail on a big screen. Ada makes the founders\' data slide readable from the back of the room.',
  minutes: 12,
  outcomes: [
    'Simplify a chart for a slide',
    'Highlight the one number that matters',
    'Say the number out loud as well as show it',
  ],
  learn: [
    {
      kind: 'compare',
      title: 'The data slide, before and after',
      before: {
        label: 'Report chart on a slide',
        text: 'A line chart with 4 lines (two markets, completed, failed), small grey labels, a legend in the corner, gridlines, and every weekly value printed on the line.',
      },
      after: {
        label: 'Slide chart',
        text: 'One line: total weekly payments, 400 to 600. The last point is orange and labelled "600". No gridlines, no legend. Title: "Payments grew by half in four weeks". Ada says: "Six hundred a week, up from four hundred."',
      },
      notes: [
        'One line, not four: the founders need the story, not every detail.',
        'Highlight the number you want remembered.',
        'Say it aloud: people remember what they see and hear together.',
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'On slides: fewer lines, bigger text, one highlighted number, the message as the title, and say the number out loud.',
    },
  ],
  apply: {
    scenario: 'Ada simplifies her data slide.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Keep on the slide chart, or remove?',
        groups: ['Keep', 'Remove'],
        items: [
          { text: 'One line of total payments', group: 0 },
          { text: 'Gridlines', group: 1 },
          { text: 'A highlighted final value', group: 0 },
          { text: 'Every weekly value printed', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why say the number out loud too?',
        options: [
          { text: 'People remember better when they see and hear it together' },
          { text: 'In case the slide breaks', why: 'It\'s about memory.' },
          { text: 'No reason', why: 'Seeing plus hearing helps.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which request best simplifies the chart?',
        options: [
          { text: 'Make the chart nicer.', why: 'Vague.' },
          { text: 'This chart will be on a big screen for founders. Suggest how to simplify it to one message: which lines to keep, what to highlight, what to remove.' },
          { text: 'Add more data.', why: 'The opposite.' },
        ],
        answer: 1,
      },
      {
        kind: 'tapBuild',
        prompt: 'Build what Ada says.',
        tiles: ['Six', 'hundred', 'a', 'week,', 'up', 'from', 'four', 'hundred'],
        distractors: ['maybe'],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'Where are the failed payments? The founders might ask.',
        prompt: 'Best reply from Ada?',
        options: [
          { text: 'They\'re on a backup slide. The main slide shows growth; if they ask about failures, I\'ll switch to it.' },
          { text: 'I deleted that data.', why: 'It\'s on a backup slide.' },
          { text: 'Failures don\'t matter.', why: 'They do, as backup.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the tip.',
        template: 'Fewer [[1]], bigger text, one [[2]] number.',
        blanks: [['lines'], ['highlighted']],
        distractors: ['words', 'hidden'],
      },
      {
        kind: 'findBug',
        prompt: 'Which part of the slide chart is a problem?',
        lines: [
          'Title: "Payments grew by half in four weeks"',
          'One line of total weekly payments',
          'Axis labels in 8-point grey text',
          'The final point highlighted in orange',
        ],
        bug: 2,
        fix: 'Axis labels large enough to read from the back.',
        explanation: 'Tiny grey text vanishes on a big screen.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the report habit to the slide version.',
        pairs: [
          ['Four lines', 'One line'],
          ['Legend in the corner', 'Label the line directly'],
          ['Every value printed', 'Only the key value'],
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many lines did the original report chart have?',
        answers: ['4', 'four'],
        placeholder: 'A number',
      },
      {
        kind: 'orderLines',
        prompt: 'Order the simplification.',
        lines: ['Pick the one message', 'Keep only the line that shows it', 'Highlight the key value', 'Write the message as the title'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Main slide, or backup slide?',
        groups: ['Main', 'Backup'],
        items: [
          { text: 'Total weekly growth', group: 0 },
          { text: 'Failures by market', group: 1 },
          { text: 'The headline number', group: 0 },
          { text: 'Every shop\'s weekly count', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What does the founders\' data slide need most?',
        options: [
          { text: 'One clear message they can read from the back' },
          { text: 'All the data', why: 'Detail goes on backups.' },
          { text: '3D effects', why: 'Never.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Take a chart from a recent report. What would you remove to make it work on a slide?',
    starters: ['Remove:', 'Highlight:'],
  },
  deepen: { title: 'Try it today', summary: 'Stand at the back of a room and look at one of your slides on screen. Can you read every label?' },
  notes: 'Dual coding (seeing and hearing) supports recall (Mayer\'s multimedia principle). Figures fictional.',
};

export default lesson;
