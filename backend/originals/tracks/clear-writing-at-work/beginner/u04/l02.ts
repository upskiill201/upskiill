import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 2. Reading: how people read on screens. */
const lesson: OriginalLesson = {
  key: 'l02',
  title: 'How people read on screens',
  summary: 'Mrs Achieng\'s "90 seconds" sounds harsh. Zanele looks up the research on how people really read screens. It\'s even less than she feared.',
  minutes: 12,
  outcomes: [
    'Know how much of a page people actually read',
    'Recognise common scanning patterns',
    'Design documents for scanning',
  ],
  learn: [
    {
      kind: 'reading',
      title: 'Scanning, not reading',
      html: '<p>The Nielsen Norman Group has studied how people read screens for decades, using eye-tracking.</p><ul><li>In a 2008 analysis, Jakob Nielsen estimated that on a typical web page, people read <strong>at most about 20% to 28% of the words</strong>.</li><li>Eye-tracking shows patterns like the <strong>F-shape</strong>: people read the first lines, then a bit of the next, then scan down the left edge.</li><li>Another common pattern is the <strong>"layer cake"</strong>: eyes jump from heading to heading, reading text only where a heading looks relevant.</li></ul><p>What this means for documents:</p><ul><li><strong>Front-load</strong> each section and each paragraph: the key point in the first sentence.</li><li><strong>Headings must carry meaning</strong>, because many readers read only them.</li><li><strong>Start lines with the important words</strong>, since the left edge gets the most attention.</li></ul><p>Board papers on tablets aren\'t web pages, but the habit is the same: people scan first, and read only what earns it.</p>',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'People scan: first lines, headings, the left edge. Put the meaning there.',
    },
  ],
  apply: {
    scenario: 'How people read.',
    items: [
      {
        kind: 'typeAnswer',
        prompt: 'Nielsen estimated people read at most about what percentage of words on a web page? (the higher number)',
        answers: ['28', '28%'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'What is the "layer cake" pattern?',
        options: [
          { text: 'Reading every word in order', why: 'That\'s rare.' },
          { text: 'Eyes jump from heading to heading, reading text only where it looks relevant' },
          { text: 'Reading only images', why: 'It\'s about headings.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Gets most attention, or less?',
        groups: ['Most attention', 'Less'],
        items: [
          { text: 'First lines', group: 0 },
          { text: 'Headings', group: 0 },
          { text: 'The ends of long lines', group: 1 },
          { text: 'Page 11', group: 1 },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the pattern to its description.',
        pairs: [
          ['F-shape', 'First lines, then down the left edge'],
          ['Layer cake', 'Heading to heading'],
          ['Front-loading', 'Key point first in each part'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'zanele',
        message: 'So people won\'t read my careful paragraphs at all?',
        prompt: "Mrs Achieng\'s best reply?",
        options: [
          { text: 'Some will, if the first sentence earns it. Put the point first, and the paragraph becomes optional detail.' },
          { text: 'Nobody reads anything, ever.', why: 'People read what earns it.' },
          { text: 'Make paragraphs longer to hold attention.', why: 'The opposite.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Design for scanning.',
        template: 'Put the [[1]] in first lines, headings and the left [[2]].',
        blanks: [['meaning', 'point'], ['edge']],
        distractors: ['footnotes', 'margin'],
      },
      {
        kind: 'mcq',
        prompt: 'Why start lines with the important words?',
        options: [
          { text: 'It looks nicer', why: 'It\'s about attention.' },
          { text: 'The left edge gets the most attention when people scan' },
          { text: 'No reason', why: 'Scanning favours the left.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Which bullet buries its key words?',
        lines: [
          'Late deliveries fell from 34% to 21%.',
          'Refunds fell by a third.',
          'After careful analysis over several weeks of collected data, it seems costs are KES 120,000 a month.',
          'Recommendation: roll out to all depots.',
        ],
        bug: 2,
        fix: 'Cost: KES 120,000 a month per depot.',
        explanation: 'The number is at the end of a long line.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'In which year was Nielsen\'s "how little do users read" analysis?',
        answers: ['2008'],
        placeholder: 'A year',
      },
      {
        kind: 'orderLines',
        prompt: 'Order how a typical reader scans a page.',
        lines: ['First lines', 'Headings', 'Down the left edge', 'Text that looks relevant'],
      },
    ],
  },
  reflect: {
    prompt: 'Open a document you wrote. Read only the first line of each paragraph. Does it still make sense?',
    starters: ['It made sense / didn\'t because...'],
  },
  deepen: {
    title: 'Scanning isn\'t laziness',
    summary: 'Scanning is a sensible strategy for busy people: find what matters, skip what doesn\'t. Writers who design for it get read.',
  },
  notes: 'Nielsen (2008), "How little do users read?" (NN/g): ~20–28% of words read on an average web page visit. Nielsen (2006), F-shaped pattern; Pernice (2017/2019), NN/g on scanning patterns incl. "layer-cake".',
};

export default lesson;
