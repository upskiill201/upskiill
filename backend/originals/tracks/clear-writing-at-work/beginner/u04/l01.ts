import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 1. Story: twelve pages. */
const lesson: OriginalLesson = {
  key: 'l01',
  title: 'Twelve pages',
  summary: 'Brian wants a 12-page pilot report for the board. Zanele writes it: careful, complete, solid text. Mrs Achieng flicks through it in nine seconds and puts it down.',
  minutes: 11,
  outcomes: [
    'See why long documents go unread',
    'Know how board members read papers',
    'Know what this chapter covers',
  ],
  learn: [
    {
      kind: 'story',
      title: 'The board pack',
      beats: [
        { speaker: 'brian', text: 'The board needs to see real depth. Twelve pages minimum.' },
        { speaker: 'narrator', text: 'Zanele writes twelve pages: method, data, results, risks, all in paragraphs. The recommendation is on page 11.' },
        { speaker: 'achieng', text: 'The board pack has 40 documents. They read each one on a tablet the night before. Yours gets about 90 seconds.' },
        { speaker: 'zanele', text: 'So they\'ll never reach page 11.' },
        { speaker: 'achieng', text: 'They\'ll read page one, the headings, and anything in a box. Build for that.' },
        { speaker: 'tey', text: 'This chapter: how people read documents, headings that say something, formatting, and the one-pager.' },
      ],
      choice: {
        prompt: 'What should page one of the report contain?',
        options: [
          { text: 'The recommendation, the key result, the cost and the decision needed', outcome: 'Yes. If they only read page one, they still know what to decide.', best: true },
          { text: 'A history of Synergix deliveries since 2004', outcome: 'Interesting to nobody who has 90 seconds.' },
          { text: 'The table of contents', outcome: 'Useful for navigation, but it doesn\'t say anything.' },
        ],
      },
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Assume people read page one, the headings and anything highlighted. Make those carry the whole message.',
    },
  ],
  apply: {
    scenario: 'The board pack.',
    items: [
      {
        kind: 'typeAnswer',
        prompt: 'How many documents are in the board pack?',
        answers: ['40', 'forty'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'About how long will each board member spend on Zanele\'s paper?',
        options: [
          { text: 'About 90 seconds' },
          { text: 'About an hour', why: 'They have 40 documents.' },
          { text: 'About ten minutes', why: 'Mrs Achieng says about 90 seconds.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Likely to be read in 90 seconds, or not?',
        groups: ['Read', 'Probably skipped'],
        items: [
          { text: 'Page one', group: 0 },
          { text: 'The headings', group: 0 },
          { text: 'Page 11', group: 1 },
          { text: 'A long methods section', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'brian',
        message: 'If it\'s short, the board will think we didn\'t do the work.',
        prompt: "Zanele\'s best reply?",
        options: [
          { text: 'A one-page summary up front, with the full detail in an appendix. They see the depth if they want it, and the decision either way.' },
          { text: 'You\'re right, make it longer.', why: 'They won\'t read it.' },
          { text: 'Just send one line.', why: 'Summary plus appendix.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the part of the document to how it\'s read.',
        pairs: [
          ['Page one', 'Almost always read'],
          ['Headings', 'Scanned'],
          ['Appendix', 'Read only if needed'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The tip.',
        template: 'Page one, the [[1]] and anything [[2]] must carry the message.',
        blanks: [['headings'], ['highlighted', 'in a box']],
        distractors: ['footnotes', 'hidden'],
      },
      {
        kind: 'mcq',
        prompt: 'Where was the recommendation in Zanele\'s first draft?',
        options: [
          { text: 'Page 11' },
          { text: 'Page 1', why: 'That\'s where it should be.' },
          { text: 'Missing', why: 'It was there, on page 11.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Which line of the report plan is the mistake?',
        lines: [
          'Page 1: recommendation, result, cost, decision.',
          'Pages 2 to 3: key results with headings.',
          'Keep the recommendation as a surprise for the last page.',
          'Appendix: method and full data.',
        ],
        bug: 2,
        fix: 'Delete it.',
        explanation: 'Board papers aren\'t mystery novels.',
      },
      {
        kind: 'orderLines',
        prompt: 'Order what this chapter covers.',
        lines: ['How people read documents', 'Headings that say something', 'Formatting', 'The one-pager'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many pages did Brian ask for?',
        answers: ['12', 'twelve'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'Look at a long document you wrote. If someone read only page one and the headings, would they get the message?',
    starters: ['Page one says...', 'The headings say...'],
  },
  deepen: {
    title: 'Board papers',
    summary: 'Board members often read large packs quickly. Many organisations ask for a one-page summary with every board paper for exactly this reason.',
  },
  notes: 'Fictional: 40-document board pack; ~90 seconds per paper (Mrs Achieng\'s estimate, not research).',
};

export default lesson;
