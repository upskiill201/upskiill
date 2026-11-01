import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 5 — Checkpoint. Reviews lessons 1–4 plus Chapters 1–2. */
const lesson: OriginalLesson = {
  key: 'l05',
  title: 'Checkpoint: 31 down to 14',
  summary: 'Day 15. The launch list went from 31 "important" things to 14 musts, 6 shoulds, 4 coulds and 7 won\'t-this-time. The review checklist has 7 lines. Joel\'s last PR needed one comment. Quick check.',
  minutes: 11,
  milestone: 'CHECKPOINT',
  outcomes: ['Use quality-bar, early-check and priority tools without notes', 'Connect them to Chapters 1 and 2'],
  learn: [
    {
      kind: 'story',
      title: 'Day 15, 6:10 p.m.',
      beats: [
        { speaker: 'joel', text: 'One comment on my PR. ONE. I checked the list myself first.' },
        { speaker: 'kavya', text: 'And I showed the shipping page at 30%. Arjun changed one thing. It took me ten minutes.' },
        { speaker: 'arjun', text: 'And we\'re not building wishlists. I can\'t tell you how good that feels.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint: Day 15.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why did Joel\'s PR need only one comment?',
        options: [
          { text: 'Arjun stopped reviewing properly', why: 'Arjun reviewed. There was less to find.' },
          { text: 'He checked his own work against a bar he could finally see' },
          { text: 'Joel got lucky', why: 'It was the checklist.' },
        ],
        answer: 1,
      },
      {
        kind: 'orderLines',
        prompt: 'Put the early draft check in order.',
        lines: ['Agree it up front', 'Say what rough means', 'Ask big-picture questions only', 'Say what to keep', 'One or two changes, max'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Which Chapter 3 tool?',
        groups: ['Quality bar', 'Early check', 'Priorities'],
        items: [
          { text: '"No passwords in the code"', group: 0 },
          { text: '"Boxes and words are fine."', group: 1 },
          { text: '"Won\'t this time: wishlists"', group: 2 },
          { text: 'Must-haves vs nice-to-haves', group: 0 },
          { text: 'A sketch at 30%', group: 1 },
          { text: '14 musts', group: 2 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'kavya',
        message: 'Mr Rao\'s shop staff asked for wishlists. Should I start them?',
        prompt: 'Arjun\'s best reply?',
        options: [
          { text: 'Sure, if you have time.', why: 'That\'s how 31 musts happen.' },
          { text: 'Never mention wishlists again.', why: 'It\'s "won\'t this time", not "never".' },
          { text: 'Not this time: wishlists are on the Won\'t list. I\'ll tell Mr Rao it\'s a great idea for January.' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'A good checklist line can be ticked yes or ___. (one word)',
        answers: ['no', 'No'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'With Diwali fixed, what gives if scope grows and nobody decides?',
        options: [
          { text: 'Quality' },
          { text: 'The date', why: 'Diwali doesn\'t move.' },
          { text: 'Nothing', why: 'Something always gives.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Arjun\'s plan for Joel\'s next task. Which line breaks Chapter 3?',
        lines: [
          'Share the review checklist with the brief.',
          'Wait for the finished version, then review it all at once.',
          'Joel checks his own work against the list first.',
        ],
        bug: 1,
        fix: 'Rough version at 30%, boxes and words are fine.',
        explanation: 'Reviewing only at 100% is how two days of polish get redone.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the tool to what it means.',
        pairs: [
          ['Definition of done', 'Finished means these boxes'],
          ['Quality bar', 'Good means these lines'],
          ['MoSCoW', 'Must, should, could, won\'t'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why share the quality bar before the work?',
        options: [
          { text: 'It\'s company policy', why: 'It\'s about fairness and clarity.' },
          { text: 'After the work, it feels like moving the goalposts' },
          { text: 'It doesn\'t matter when', why: 'Timing changes everything.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Chapter 3 so far.',
        template: 'Show the [[1]]. See it [[2]]. Say what you [[3]] do.',
        blanks: [['bar', 'standard'], ['early'], ['won\'t', 'will not']],
        distractors: ['late', 'might'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Joel\'s news.',
        tiles: ['One', 'comment.', 'ONE.'],
        distractors: ['Thirty.'],
      },
    ],
  },
  reflect: {
    prompt: 'Which Chapter 3 tool would save you the most time this month: a quality bar, an early check, or a Won\'t list?',
    starters: ['The one I need is...', 'Because...'],
  },
  deepen: {
    title: 'Count the comments',
    summary: 'If you review others\' work, count how many comments you leave this week. Then share your checklist up front, and count again next week.',
  },
  notes: 'Checkpoint: reviews lessons 1–4 plus Chapters 1–2.',
};

export default lesson;
