import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 9. Tap to explore: plain checklist v4. */
const lesson: OriginalLesson = {
  key: 'l09',
  title: 'Plain checklist v4',
  summary: 'Zanele adds the document checks to her list. Five new lines about page one, headings and formatting. Tap each one.',
  minutes: 11,
  outcomes: [
    'Add document checks to your checklist',
    'Link each check to a lesson from this chapter',
    'Use them on a real report',
  ],
  learn: [
    {
      kind: 'explore',
      title: 'Zanele\'s plain checklist v4',
      text: 'Checks 1 to 15, plus: 16. Would page one alone let them decide? 17. Do the headings tell the story on their own? 18. Does each section put its point in the first line? 19. Does the squint test show the two or three key things? 20. Is every other fact in the appendix, or cut?',
      hotspots: [
        { phrase: 'page one alone', note: 'Lessons 1 and 6: the board pack and the new page one.' },
        { phrase: 'headings tell the story', note: 'Lesson 3: message headings.' },
        { phrase: 'point in the first line', note: 'Lesson 2: people scan first lines.' },
        { phrase: 'squint test', note: 'Lesson 4: enough formatting, but no more.' },
        { phrase: 'in the appendix, or cut', note: 'Lesson 7: what goes on a one-pager.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'v4 adds: page one stands alone, message headings, first lines, the squint test, appendix or cut.',
    },
  ],
  apply: {
    scenario: 'Plain checklist v4.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match the check to the lesson.',
        pairs: [
          ['Page one alone', 'The board pack'],
          ['Headings tell the story', 'Message headings'],
          ['Squint test', 'Enough formatting'],
          ['Appendix or cut', 'What goes on a one-pager'],
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many checks are on v4 in total?',
        answers: ['20', 'twenty'],
        placeholder: 'A number',
      },
      {
        kind: 'orderLines',
        prompt: 'Order the new checks as written.',
        lines: ['Page one alone', 'Headings tell the story', 'Point in the first line', 'Squint test', 'Appendix or cut'],
      },
      {
        kind: 'mcq',
        prompt: 'Which check is new on v4?',
        options: [
          { text: 'Do the headings tell the story on their own?' },
          { text: 'Is the ask in the subject line?', why: 'That was v3.' },
          { text: 'Would a 12-year-old understand the words?', why: 'That was an earlier check.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Passes v4 or fails it?',
        groups: ['Passes', 'Fails'],
        items: [
          { text: 'Heading: "Refunds fell by a third"', group: 0 },
          { text: 'Heading: "Discussion"', group: 1 },
          { text: 'Decision in a box on page one', group: 0 },
          { text: 'Every sentence in bold', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'felix',
        message: 'Can I use your checklist on my monthly ops report?',
        prompt: "Zanele\'s best reply?",
        options: [
          { text: 'Yes. Start with 16: read only page one and ask if Mr Kamau could decide from it.' },
          { text: 'No, it\'s only for the board report.', why: 'It works for any document.' },
          { text: 'Only checks 1 to 5.', why: 'Use all of it.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Check 17.',
        template: 'Do the [[1]] tell the [[2]] on their own?',
        blanks: [['headings'], ['story']],
        distractors: ['footnotes', 'budget'],
      },
      {
        kind: 'findBug',
        prompt: 'Felix\'s report fails which check?',
        lines: [
          'Title: "Late deliveries steady at 21% in May"',
          'Box: no decision needed this month.',
          'Heading 2: "Miscellaneous"',
          'Appendix: depot-by-depot tables.',
        ],
        bug: 2,
        fix: 'Heading 2: "Two vans due for service in June"',
        explanation: '"Miscellaneous" fails check 17: it says nothing.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which check number is the squint test?',
        answers: ['19', 'nineteen'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'What should happen to a fact that fails "needed to decide"?',
        options: [
          { text: 'Move it to the appendix, or cut it' },
          { text: 'Put it in bold', why: 'Appendix or cut.' },
          { text: 'Put it on page one anyway', why: 'Page one is for deciding.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Run checks 16 to 20 on a document you\'re working on. Which one did it fail?',
    starters: ['It failed...', 'I fixed it by...'],
  },
  deepen: {
    title: 'Twenty checks',
    summary: 'Twenty checks sounds a lot. Most take seconds, and after a few weeks you stop needing the list for the ones you\'ve learned.',
  },
  notes: 'Plain checklist v4 (checks 16 to 20). Fictional Felix ops report.',
};

export default lesson;
