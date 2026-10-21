import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 5. Checkpoint 1: lessons 1–4. */
const lesson: OriginalLesson = {
  key: 'l05',
  title: 'Checkpoint: skimmable documents',
  summary: 'Page one, scanning, message headings and formatting. A quick check before Zanele rebuilds the board report.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Write message headings', 'Format for scanning'],
  learn: [
    {
      kind: 'story',
      title: 'Saturday morning',
      beats: [
        { speaker: 'zanele', text: 'I read only my headings out loud to Remi. He said, "So roll it out everywhere?" Exactly.' },
        { speaker: 'achieng', text: 'Then the headings work. Now cut the twelve pages to one.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 1: skimmable documents.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Label or message heading?',
        groups: ['Label', 'Message'],
        items: [
          { text: '"Background"', group: 0 },
          { text: '"Saturday dispatch cut refunds by a third"', group: 1 },
          { text: '"Findings"', group: 0 },
          { text: '"Lagos could gain the most"', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What do people mostly read when scanning?',
        options: [
          { text: 'First lines, headings and the left edge' },
          { text: 'Footnotes', why: 'Rarely read.' },
          { text: 'Every word', why: 'They scan.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the content to the best format.',
        pairs: [
          ['Comparing three depots', 'Table'],
          ['Steps to roll out', 'Numbered list'],
          ['The recommendation', 'A box'],
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Nielsen estimated people read at most about 20% to what percentage of web-page words?',
        answers: ['28', '28%'],
        placeholder: 'A number',
      },
      {
        kind: 'chatReply',
        from: 'remi',
        message: 'My report headings are "Part 1", "Part 2", "Part 3".',
        prompt: "Zanele\'s best reply?",
        options: [
          { text: 'Ask "so what?" for each part, and make the answer the heading. Then people can read just the headings.' },
          { text: 'Perfect, keep them.', why: 'They say nothing.' },
          { text: 'Remove all headings.', why: 'Make them say something.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Formatting rule.',
        template: 'Enough [[1]], but no [[2]].',
        blanks: [['formatting'], ['more']],
        distractors: ['words', 'less'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line in this report plan is a mistake?',
        lines: [
          'Page 1: recommendation in a box.',
          'Message headings for every section.',
          'Bold every sentence on page 2.',
          'Method in the appendix.',
        ],
        bug: 2,
        fix: 'Bold one or two key facts.',
        explanation: 'Everything bold means nothing stands out.',
      },
      {
        kind: 'mcq',
        prompt: 'What\'s the "so what?" test for?',
        options: [
          { text: 'Turning label headings into message headings' },
          { text: 'Checking spelling', why: 'For headings.' },
          { text: 'Choosing fonts', why: 'For headings.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many seconds does Mrs Achieng say a board paper gets?',
        answers: ['90', 'ninety'],
        placeholder: 'A number',
      },
      {
        kind: 'orderLines',
        prompt: 'Order how to make a document skimmable.',
        lines: ['Put the point on page one', 'Write message headings', 'Front-load each section', 'Format the key facts', 'Move detail to an appendix'],
      },
    ],
  },
  reflect: {
    prompt: 'Read only the headings of something you wrote to a friend. What did they understand?',
    starters: ['They understood...'],
  },
  notes: 'Checkpoint for Chapter 4 lessons 1-4.',
};

export default lesson;
