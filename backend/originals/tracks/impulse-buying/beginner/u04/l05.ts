import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 5. Checkpoint 1: lessons 1–4, plus review. */
const lesson: OriginalLesson = {
  key: 'l05',
  title: 'Checkpoint: the list',
  summary: '2 a.m. Kofi and Yaw have every debt on one sheet of paper. It\'s the first time Yaw has seen the whole number written down. Check what you know: helping a friend, pay later, comparison and group spending.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Explain how pay later works and where it goes wrong', 'Handle social and group pressure'],
  learn: [
    {
      kind: 'story',
      title: 'One sheet',
      beats: [
        { speaker: 'yaw', text: 'Seeing it all on one page is worse. And somehow better.' },
        { speaker: 'kofi', text: 'You can\'t fix what you can\'t see. Mum\'s rule. Well, my rule now.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 1: everyone\'s buying it.',
    items: [
      {
        kind: 'mcq',
        prompt: 'A friend in debt asks to borrow your savings. What usually helps most?',
        options: [
          { text: 'Giving them all your savings', why: 'It often removes the push to change and puts you at risk.' },
          { text: 'Saying no to the loan, and yes to helping make a plan' },
          { text: 'Ignoring them', why: 'They need someone in their corner.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'GH₵800 on pay later in 4 payments. Each payment?',
        answers: ['200', 'GH₵200', '200 cedis'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Pay-later risk, or not?',
        groups: ['Risk', 'Not a risk'],
        items: [
          { text: 'Stacking several plans', group: 0 },
          { text: 'Missing a payment', group: 0 },
          { text: 'Paying full price with money you have', group: 1 },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each idea to its example.',
        pairs: [
          ['Social comparison', '"Everyone back home has new sneakers"'],
          ['Stacking', 'Nine payments across three apps'],
          ['People line', 'GH₵30 a month for gifts'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'yaw',
        message: 'The team wants a GH₵150 dinner for the end of season. I can\'t.',
        prompt: 'Kofi\'s best reply?',
        options: [
          { text: 'Put it on pay later.', why: 'That\'s how GH₵2,900 happened.' },
          { text: 'Just don\'t go.', why: 'A cheaper plan keeps him with the team.' },
          { text: 'Suggest a hall cookout now, before it\'s booked. I bet half the team would be relieved.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'Pay later is...',
        template: 'Pay later is still [[1]].',
        blanks: [['borrowing', 'debt', 'a loan']],
        distractors: ['free', 'saving'],
      },
      {
        kind: 'findBug',
        prompt: 'Which belief is the comparison trap?',
        lines: [
          'My friends post their best moments.',
          'Their posts don\'t show their debts.',
          'If everyone has it, I need it too.',
        ],
        bug: 2,
        fix: 'What I need depends on my life, not their posts.',
        explanation: 'That\'s keeping up with a highlight reel.',
      },
      {
        kind: 'mcq',
        prompt: 'Review, Chapter 3: a "was GH₵900" label is a...',
        options: [
          { text: 'An anchor' },
          { text: 'A decoy', why: 'A decoy is a third option. This is an anchor.' },
          { text: 'A guarantee', why: 'It\'s a seller\'s claim.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        prompt: 'Review, Chapter 2: what is the habit loop?',
        options: [
          { text: 'Buy, regret, return', why: 'A common pattern, but not the loop.' },
          { text: 'Save, spend, save', why: 'Not the habit loop.' },
          { text: 'Cue, routine, reward' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Review, Chapter 3: restaurant GH₵120 vs cookout GH₵30. Saving per person?',
        answers: ['90', 'GH₵90', '90 cedis'],
        placeholder: 'A number',
      },
      {
        kind: 'orderLines',
        prompt: 'Order the first steps out of debt.',
        lines: ['Stop new borrowing', 'List every debt on one page', 'Check what can be returned', 'Make a plan'],
      },
    ],
  },
  reflect: {
    prompt: 'If you have any debts, have you ever written them all on one page? What would it show?',
    starters: ['If I wrote them down...', 'I think it would show...'],
  },
  notes: 'Checkpoint for Chapter 4 lessons 1–4 with Chapter 2 and 3 review.',
};

export default lesson;
