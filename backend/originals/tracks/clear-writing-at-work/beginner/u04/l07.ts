import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 7. Chat: what goes on a one-pager. */
const lesson: OriginalLesson = {
  key: 'l07',
  title: 'What goes on a one-pager',
  summary: 'Zanele has more than fits on one page. She asks Tey how to choose what stays, what goes to the appendix, and what goes nowhere.',
  minutes: 11,
  outcomes: [
    'Decide what earns a place on page one',
    'Use an appendix well',
    'Cut what helps nobody',
  ],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: 'For each fact, ask: does the reader need this to decide? If yes, page one. If they might want it later, appendix. If neither, cut it.', replies: ['The driver survey took me a week, though.'] },
        { tey: 'Effort isn\'t the test. One line from it on page one, "31 of 40 drivers signed up", and the full survey in Appendix C.', replies: ['What about the history of weekend operations?'] },
        { tey: 'Does the board need it to decide? Probably not. Cut it, or one sentence in the appendix if someone will ask.', replies: ['And the risks? There are six.'] },
        { tey: 'Put the main risk on page one, with what you\'ll do about it. List all six in the appendix.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Needed to decide: page one. Might want later: appendix. Neither: cut.',
    },
  ],
  apply: {
    scenario: 'Choosing what stays.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Page one, appendix, or cut?',
        groups: ['Page one', 'Appendix', 'Cut'],
        items: [
          { text: 'The recommendation', group: 0 },
          { text: 'The full driver survey', group: 1 },
          { text: 'A paragraph on the weather in April', group: 2 },
          { text: 'The cost per depot', group: 0 },
          { text: 'Weekly data tables', group: 1 },
          { text: '"I hope this report finds you well"', group: 2 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What\'s Tey\'s test for page one?',
        options: [
          { text: 'How long did it take me?', why: 'Effort isn\'t the test.' },
          { text: 'Is it interesting?', why: 'Is it needed to decide?' },
          { text: 'Does the reader need this to decide?' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many risks did Zanele list?',
        answers: ['6', 'six'],
        placeholder: 'A number',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the item to where it goes.',
        pairs: [
          ['Main risk and the plan for it', 'Page one'],
          ['All six risks', 'Appendix'],
          ['History of weekend operations', 'Cut, or one line in an appendix'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'zanele',
        message: 'It feels wrong to cut work I spent a week on.',
        prompt: "Tey\'s best reply?",
        options: [
          { text: 'Then put the whole survey on page one.', why: 'One line, plus the appendix.' },
          { text: 'You\'re not cutting it. One line on page one, the rest in the appendix. The week of work is why that one line is true.' },
          { text: 'Effort is all that matters.', why: 'The reader\'s decision matters.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Tey\'s rule.',
        template: 'Needed to decide: page [[1]]. Might want later: [[2]].',
        blanks: [['one'], ['appendix']],
        distractors: ['eleven', 'footnote'],
      },
      {
        kind: 'mcq',
        prompt: 'What should go with the main risk on page one?',
        options: [
          { text: 'What you\'ll do about it' },
          { text: 'All five other risks', why: 'Those go in the appendix.' },
          { text: 'Nothing', why: 'Say what you\'ll do.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Which line of the one-pager plan is the mistake?',
        lines: [
          'Page one: recommendation and decision.',
          'Page one: the main risk and the plan for it.',
          'Page one: all six risks in full detail.',
          'Appendix: weekly data and the driver survey.',
        ],
        bug: 2,
        fix: 'Main risk on page one; all six in the appendix.',
        explanation: 'Six risks in full won\'t fit, and they bury the main one.',
      },
      {
        kind: 'orderLines',
        prompt: 'Order how to sort each fact.',
        lines: ['Take one fact', 'Ask: needed to decide?', 'If not, might they want it later?', 'Place it or cut it'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'In which appendix is the driver survey? (one letter)',
        answers: ['C', 'Appendix C'],
        placeholder: 'A letter',
      },
    ],
  },
  reflect: {
    prompt: 'Sort the facts in a document you wrote into page one, appendix and cut. What did you cut?',
    starters: ['Page one:...', 'Cut:...'],
  },
  deepen: {
    title: 'Fewer words, same work',
    summary: 'Rogers and Lasky-Fink\'s first principle is "less is more": fewer words and fewer ideas. A short page one is the result of the work, not a shortcut around it.',
  },
  notes: 'Rogers & Lasky-Fink (2023), principle 1 (less is more). Page one / appendix / cut: a sorting heuristic, not a formal method.',
};

export default lesson;
