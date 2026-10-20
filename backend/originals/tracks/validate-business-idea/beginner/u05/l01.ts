import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 1. Story: the first ten regulars. */
const lesson: OriginalLesson = {
  key: 'l01',
  title: 'The first ten regulars',
  summary: 'Three weekends in, Clinton has thirty different customers. Ten of them have booked more than once. David says those ten matter more than the other twenty put together.',
  minutes: 11,
  outcomes: [
    'Tell one-time customers from regulars',
    'Know why early regulars matter most',
    'Learn from regulars what to keep and fix',
  ],
  learn: [
    {
      kind: 'story',
      title: 'Thirty and ten',
      beats: [
        { speaker: 'narrator', text: 'Three weekends: 12 bags, then 19, then 23. Thirty different students have tried WashDay. Ten have booked at least twice.' },
        { speaker: 'clinton', text: 'Thirty customers! Let\'s get thirty more.' },
        { speaker: 'david', text: 'Twenty of them tried it once. Ten came back. Who do you think tells you more?' },
        { speaker: 'narrator', text: 'Clinton calls the ten regulars. Brenda: "I don\'t carry anything up that hill now." Ama: "I got my Saturday back. I went to the football." Esther: "I stopped buying extra clothes."' },
        { speaker: 'miracle', text: 'Those are the reasons WashDay exists. Ask the twenty who didn\'t return why not, too. Both lists decide what happens next.' },
        { speaker: 'tey', text: 'This last chapter is about decisions: go ahead, change, or stop. Regulars are the best evidence you\'ll get.' },
      ],
      choice: {
        prompt: 'Who should Clinton learn from first?',
        options: [
          { text: 'The ten regulars, then the twenty who didn\'t come back.', outcome: 'Right. Regulars show what works; the others show what\'s missing.', best: true },
          { text: 'Only new people who haven\'t tried it.', outcome: 'They can only guess. The thirty have real experience.' },
          { text: 'Nobody: thirty customers is proof enough.', outcome: 'Thirty is a start. Why some came back and others didn\'t is what decides the next move.' },
        ],
      },
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'One customer who comes back tells you more than three who tried once.',
    },
  ],
  apply: {
    scenario: 'Thirty customers, ten regulars.',
    items: [
      {
        kind: 'typeAnswer',
        prompt: 'Weekends of 12, 19 and 23 bags. How many bags in total?',
        answers: ['54'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Why do the ten regulars matter most?',
        options: [
          { text: 'Coming back shows WashDay really solves their problem' },
          { text: 'They spend the most on the first order', why: 'Same price; it\'s about returning.' },
          { text: 'They\'re Clinton\'s friends', why: 'Most of them are strangers.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Regular or one-time?',
        groups: ['Regular', 'One-time'],
        items: [
          { text: 'Booked all three weekends', group: 0 },
          { text: 'Tried it once, then went home for the holidays', group: 1 },
          { text: 'Booked weekends one and three', group: 0 },
          { text: 'Booked once and never replied again', group: 1 },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the regular to why she stays.',
        pairs: [
          ['Brenda', 'No carrying up the hill'],
          ['Ama', 'Got her Saturday back'],
          ['Esther', 'Stopped buying extra clothes'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'clinton',
        message: 'Why ask the twenty who left? They\'re gone.',
        prompt: "Miracle's best reply?",
        options: [
          { text: 'Their reasons are free advice: maybe the price, the timing, or the late bags. Fix those and some come back.' },
          { text: 'You\'re right, forget them.', why: 'Leavers tell you what to fix.' },
          { text: 'Beg them to come back.', why: 'Ask why first; then fix.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        prompt: 'What share of the thirty customers are regulars?',
        options: [
          { text: 'About 33%' },
          { text: '10%', why: '10 of 30 is a third.' },
          { text: '66%', why: 'That\'s the one-time share.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Two lists.',
        template: '[[1]] show what works; people who [[2]] show what\'s missing.',
        blanks: [['Regulars'], ['left']],
        distractors: ['Strangers', 'liked'],
      },
      {
        kind: 'orderLines',
        prompt: 'Order Clinton\'s week of calls.',
        lines: ['List all thirty customers', 'Mark the ten regulars', 'Call regulars: why do you stay?', 'Message the others: why not again?', 'Write both lists on the board'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line of Clinton\'s plan ignores the best evidence?',
        lines: [
          'Call the ten regulars.',
          'Ask the twenty why they didn\'t return.',
          'Spend the week posting in new groups instead.',
          'Update the evidence board.',
        ],
        bug: 2,
        fix: 'Learn from the thirty first, then grow.',
        explanation: 'New posts can wait a week; the regulars\' reasons can\'t.',
      },
      {
        kind: 'sortGroups',
        prompt: 'Reason to stay, or reason they left?',
        groups: ['Stay', 'Left'],
        items: [
          { text: '"I got my Saturday back"', group: 0 },
          { text: '"My bag came back a day late"', group: 1 },
          { text: '"No carrying up the hill"', group: 0 },
          { text: '"Went home for the holidays"', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Who would be your first "regular"? What would make them come back a second time?',
    starters: ['My first regular could be...', 'They\'d come back because...'],
  },
  deepen: {
    title: 'A few who love it',
    summary: 'Many successful businesses started with a small group who loved them, not a big group who liked them. Ten regulars who\'d hate to lose WashDay are a real foundation.',
  },
  notes: 'Fictional: weekends 12, 19, 23 bags (54 total); 30 distinct customers; 10 have booked at least twice (≈33%).',
};

export default lesson;
