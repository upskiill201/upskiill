import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 5. Checkpoint 1: lessons 1–4, plus review. */
const lesson: OriginalLesson = {
  key: 'l05',
  title: 'Checkpoint: Miracle pays up',
  summary: 'Miracle sends GH₵50 with a voice note: "Fine, you win. Well, I win. You found it." Check what you know: leaks vs choices, subscriptions, fees and big-line cuts.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Sort leaks from choices', 'Find savings in subscriptions, fees and big lines'],
  learn: [
    {
      kind: 'story',
      title: 'The bet, settled',
      beats: [
        { speaker: 'miracle', text: 'GH₵50 sent. It goes straight in the jar, yes?' },
        { speaker: 'kofi', text: 'Split rule. GH₵25 to the jar, GH₵25 to... the jar. I\'m serious about this laptop.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 1: the leak hunt.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Leak or choice?',
        groups: ['Leak', 'Choice'],
        items: [
          { text: 'Unused app subscription', group: 0 },
          { text: 'A planned weekly treat', group: 1 },
          { text: 'Late fee from forgetting', group: 0 },
          { text: 'Drinks with the team', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'A data add-on used twice last month. Keep, swap or cancel?',
        options: [
          { text: 'Keep', why: 'Twice isn\'t worth paying monthly for.' },
          { text: 'Cancel' },
          { text: 'Upgrade', why: 'The opposite of what the evidence says.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: '10 cash-outs at GH₵3 each. Total fees?',
        answers: ['30', 'GH₵30', '30 cedis'],
        placeholder: 'A number',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each fee to its fix.',
        pairs: [
          ['Many small cash-outs', 'One planned cash-out a week'],
          ['Paying friends one by one', 'Settle up weekly'],
          ['Late fees', 'Phone reminders'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Where to start.',
        template: 'Start with your three [[1]] lines, not your small [[2]].',
        blanks: [['biggest'], ['joys']],
        distractors: ['smallest', 'loans'],
      },
      {
        kind: 'chatReply',
        from: 'yaw',
        message: 'My three streaming apps might be useful someday.',
        prompt: 'Kofi\'s best reply?',
        options: [
          { text: 'Keep them all.', why: '"Someday" costs every month.' },
          { text: 'Keep the one you used this month. Cancel the rest; you can rejoin any day.' },
          { text: 'Cancel everything, including the one you use.', why: 'The used one may be worth it.' },
        ],
        answer: 1,
      },
      {
        kind: 'mcq',
        prompt: 'Why did the big-lines approach save more than cutting small things?',
        options: [
          { text: 'Big lines are always wasteful', why: 'They\'re often needs. A small trim adds up.' },
          { text: 'Luck', why: 'Maths.' },
          { text: 'A small percentage of a big line is more money than all of a small line' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Which cut is the misery cut?',
        lines: [
          'Cancel the unused music app.',
          'Shared weekly market trip.',
          'Never see friends again.',
        ],
        bug: 2,
        fix: 'See friends in free or cheaper ways.',
        explanation: 'Cutting people out costs more than it saves.',
      },
      {
        kind: 'mcq',
        prompt: 'Review, Chapter 1: what\'s the weekly target for GH₵1,600 in 8 weeks, starting from GH₵0?',
        options: [
          { text: 'GH₵200' },
          { text: 'GH₵160', why: '1,600 ÷ 8 = 200.' },
          { text: 'GH₵800', why: 'That\'s for 2 weeks.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        prompt: 'Review, Chapter 1: what comes before saving for the laptop?',
        options: [
          { text: 'A loan', why: 'Never.' },
          { text: 'A new phone', why: 'Not a priority.' },
          { text: 'A starter emergency fund' },
        ],
        answer: 2,
      },
      {
        kind: 'orderLines',
        prompt: 'Order the leak hunt.',
        lines: ['Scroll three months', 'List repeat costs', 'Sort leaks and choices', 'Plug leaks', 'Trim choices gently'],
      },
    ],
  },
  reflect: {
    prompt: 'What\'s the biggest leak you\'ve found so far? Have you plugged it yet?',
    starters: ['My biggest leak is...', 'I plugged it / I\'ll plug it by...'],
  },
  notes: 'Checkpoint for Chapter 2 lessons 1–4 with two Chapter 1 review items. Miracle\'s GH₵50 goes into the jar (included in "about GH₵850" by week 4).',
};

export default lesson;
