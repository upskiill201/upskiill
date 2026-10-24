import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 3. Compare: saying no in writing. */
const lesson: OriginalLesson = {
  key: 'l03',
  title: 'Saying no in writing',
  summary: 'Brian asks Zanele to build a weekly 12-page dashboard for every depot, starting Friday. She\'s fixing Nairobi\'s drivers. Her first reply says yes without saying yes. Her second says no clearly.',
  minutes: 12,
  outcomes: [
    'Say no clearly and kindly in writing',
    'Offer what you can do instead',
    'Avoid the vague "maybe" that means no',
  ],
  learn: [
    {
      kind: 'compare',
      title: 'Reply to Brian',
      before: {
        label: 'First draft',
        text: '"Hi Brian, thanks so much for thinking of me! I\'m quite busy at the moment with a few things, but I\'ll see what I can do and try to get something to you, hopefully soon-ish. Let me know if that works!"',
      },
      after: {
        label: 'Second draft',
        text: '"Hi Brian,\nI can\'t start the depot dashboards this Friday. Until Nairobi\'s drivers are fixed, that has to come first.\nWhat I can do: a one-page weekly summary for all three depots from 14 July, using the same headings as the board report.\nWould that work?\nZanele"',
      },
      notes: [
        'The no is in the first line, in plain words.',
        'One honest reason, not five excuses.',
        'A real alternative, with a date, and a yes/no question.',
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'A clear no: the no first, one reason, what you can do instead, and a question.',
    },
  ],
  apply: {
    scenario: 'Saying no to Brian.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What\'s the problem with the first draft?',
        options: [
          { text: 'It sounds like a yes, so Brian will expect dashboards on Friday' },
          { text: 'It\'s too short', why: 'It\'s vague, not short.' },
          { text: 'It\'s rude', why: 'It\'s polite but unclear.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Clear no or vague maybe?',
        groups: ['Clear no', 'Vague maybe'],
        items: [
          { text: '"I can\'t start this Friday."', group: 0 },
          { text: '"I\'ll see what I can do."', group: 1 },
          { text: '"What I can do instead is..."', group: 0 },
          { text: '"Hopefully soon-ish."', group: 1 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many pages did Brian want each dashboard to be?',
        answers: ['12', 'twelve'],
        placeholder: 'A number',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the part of the reply to its job.',
        pairs: [
          ['"I can\'t start this Friday."', 'The no'],
          ['"Nairobi has to come first."', 'The reason'],
          ['"A one-page weekly summary from 14 July"', 'The alternative'],
          ['"Would that work?"', 'The question'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'zanele',
        message: 'Saying no to Brian feels risky. He\'s senior to me.',
        prompt: "Mrs Achieng\'s best reply?",
        options: [
          { text: 'Then just do both.', why: 'She\'d do both badly.' },
          { text: 'A vague yes is riskier: on Friday he\'ll have nothing. A clear no with an offer lets him plan.' },
          { text: 'Don\'t reply at all.', why: 'Silence is the worst answer.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'The order.',
        template: 'The [[1]] first, one [[2]], then what you can do.',
        blanks: [['no'], ['reason']],
        distractors: ['joke', 'excuse list'],
      },
      {
        kind: 'mcq',
        prompt: 'From when does Zanele offer the weekly summary?',
        options: [
          { text: 'This Friday', why: 'That\'s what she said no to.' },
          { text: 'Next year', why: '14 July.' },
          { text: '14 July' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Which line weakens Zanele\'s no?',
        lines: [
          'I can\'t start the depot dashboards this Friday.',
          'Until Nairobi\'s drivers are fixed, that has to come first.',
          'But maybe I could squeeze it in somehow, if it\'s really important?',
          'What I can do: a one-page weekly summary from 14 July.',
        ],
        bug: 2,
        fix: 'Delete it.',
        explanation: 'It turns the clear no back into a maybe.',
      },
      {
        kind: 'orderLines',
        prompt: 'Order the second draft.',
        lines: ['The no', 'The reason', 'The alternative with a date', 'A yes/no question'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many reasons does the second draft give?',
        answers: ['1', 'one'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'Find a "maybe" you sent that really meant no. Rewrite it as a clear no with an offer.',
    starters: ['I wrote...', 'I should have written...'],
  },
  deepen: {
    title: 'No is information',
    summary: 'A clear no lets the other person plan: find someone else, change the deadline, or take your alternative. A vague maybe leaves them with nothing until it\'s too late.',
  },
  notes: 'Fictional reply to Brian. Structure (no, reason, alternative, question): common workplace-communication advice.',
};

export default lesson;
